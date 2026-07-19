# views do django channels
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Mensagem, Sala
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
#------------------- FUNÇÕES QUE ACESSAM O BANCO DE DADOS----------------------------
    @database_sync_to_async
    def delete_message_db(self, nome, id):
        Mensagem.objects.filter(sala__nome=nome, id=id).delete()
        
        

    @database_sync_to_async
    def save_message(self, nome_sala, username, conteudo, enviado_as, resposta):
        sala = Sala.objects.get(nome=nome_sala)

        resposta_obj = None
        if resposta:
            resposta_obj = Mensagem.objects.get(id=resposta)

        return Mensagem.objects.create(
            sala=sala,
            username=username,  
            conteudo=conteudo,
            enviado_as=enviado_as,
            resposta=resposta_obj
        )
    
    @database_sync_to_async
    def search_message(self):
        mensagens = (
            Mensagem.objects
            .filter(sala__nome=self.nome_sala)
            .select_related("resposta")
            .order_by("enviado_as")
        )

        historico = []

        for mensagem in mensagens:
            historico.append({
                "id": mensagem.id,
                "username": mensagem.username,
                "conteudo": mensagem.conteudo,
                "enviado_as": mensagem.enviado_as.strftime("%d/%m/%Y %H:%M"),
                "resposta": (
                    {
                        "id": mensagem.resposta.id,
                        "username": mensagem.resposta.username,
                        "conteudo": mensagem.resposta.conteudo,
                        "enviado_as": mensagem.resposta.enviado_as.strftime("%d/%m/%Y %H:%M"),
                    }
                    if mensagem.resposta
                    else None
                )
            })

        return historico
    
#------------------------------------------------------------------------------------



#--------------------------- FUNÇÕES WEBSOCKETS--------------------------------------

    async def connect(self):
        # pegando o nome da sala apartir da url
        self.nome = self.scope["url_route"]["kwargs"]["nome"]
        self.nome_sala = self.nome
        

        # Entrar na sala(o django channels chama de grupo)
        # O channel_layer é um sistema de comunicação entre consumidores.
        # O channel_layer permite que mensagens sejam enviadas para todos
        # os consumidores pertencentes ao mesmo grupo "channel_layer" permite que os usuarios se mantenham no mesmo canal de comunicação
        # o django channel gera automaticamente channel_name diferente para os clientes conectados
        await self.channel_layer.group_add(self.nome_sala, self.channel_name)
        await self.accept()
        historico = await self.search_message()

        await self.send(text_data=json.dumps({
            "tipo": "historico",
            "mensagens": historico
        }))
        await self.send(text_data=json.dumps({
        "tipo": "historico",
        "mensagens": historico
        }))



    # Sair da sala
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.nome_sala, self.channel_name)



    """
    Recebe todas as mensagens enviadas pelo cliente via WebSocket
    e executa a ação correspondente à requisição
    """
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        # ENVIAR MENSAGEM DE DIGITAÇÃO
        if text_data_json.get("type") == "typing":
            await self.channel_layer.group_send(
                self.nome_sala,
                {
                    "type": "typing.message",
                    "username": text_data_json["username"]
                })
            return

        # DELETAR MENSAGEM
        elif text_data_json.get("type") == "delete":
            await self.delete_message_db(
                self.nome_sala,
                text_data_json["id"]
            )
            await self.channel_layer.group_send(
                self.nome_sala,
                {
                    "type": "delete.message",
                    "id": text_data_json["id"]
                })
            return
        
        username = text_data_json["username"]
        conteudo = text_data_json["conteudo"]
        enviado_as = text_data_json["enviado_as"]
        resposta = text_data_json["resposta"]

        mensagem = await self.save_message(
            self.nome_sala,
            username,
            conteudo,
            enviado_as,
            resposta
        )

        resposta = None


        # ENVIAR MENSAGEM RESPOSTA
        if mensagem.resposta:
            resposta = {
                "id": mensagem.resposta.id,
                "username": mensagem.resposta.username,
                "conteudo": mensagem.resposta.conteudo,
            }

        await self.channel_layer.group_send(
            self.nome_sala,
            {
                "type": "send.message",
                "id": mensagem.id,
                "username": mensagem.username,
                "conteudo": mensagem.conteudo,
                "enviado_as": mensagem.enviado_as.strftime("%d/%m/%Y %H:%M"),
                "resposta": resposta,
            })

    async def typing_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "typing",
            "username": event["username"]
        }))

    async def send_message(self, event):
            # envia a mensagem para o cliente conectado via websocket
            #o json.dumps() transforma um dicionário python em uma string json
            # o self.send() envia para o cliente conectado
        await self.send(
            text_data=json.dumps({
                "id": event["id"],
                "username": event["username"],
                "conteudo": event["conteudo"],
                "enviado_as": event["enviado_as"],
                "resposta": event["resposta"]
            }))
    
    async def delete_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "delete",
            "id": event["id"]
        }))

#------------------------------------------------------------------------------------