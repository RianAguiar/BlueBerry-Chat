# views do django channels
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Mensagem, Sala

class ChatConsumer(AsyncWebsocketConsumer):
    from .models import Mensagem
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):

    @database_sync_to_async
    def salvar_mensagem(self, nome_sala, username, conteudo, enviado_as):
        sala = Sala.objects.get(nome=nome_sala)
        return Mensagem.objects.create(
            sala=sala,
            username=username,
            conteudo=conteudo,
            enviado_as=enviado_as
        )
    
    @database_sync_to_async
    def buscar_mensagens(self):
        return list(
            Mensagem.objects.filter(sala__nome=self.nome_sala)
            .order_by("enviado_as")
            .values("id","username", "conteudo", "enviado_as")
        )

    async def connect(self):
        # pegando o nome da sala 
        self.nome = self.scope["url_route"]["kwargs"]["nome"]
        # criando o nome da sala
        self.nome_sala = f"{self.nome}"
        

        # Entrar na sala(o django channels chama de grupo)
        # o "channel_layer" permite que os usuarios se mantenham no mesmo canal de comunicação
        # o django channel gera automaticamente channel_name diferente para os clientes conectados
        await self.channel_layer.group_add(self.nome_sala, self.channel_name)
        await self.accept()
        historico = await self.buscar_mensagens()
        for mensagem in historico:
            mensagem["enviado_as"] = mensagem["enviado_as"].strftime("%d/%m/%Y %H:%M:%S")
            await self.send(text_data=json.dumps(mensagem))

    # Sair da sala
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.nome_sala, self.channel_name)



    ''' esse método é chamado automaticamente sempre que o cliente envia uma mensagem pelo WebSocket,
    onde ele pega a mensagem enviada pelo navegador e distribui essa mensagem para todos os usuarios
    conectados ao canal de comunicação'''
    async def receive(self, text_data):
        # o json.loads converte de json para dicionario python
        text_data_json = json.loads(text_data)
        username = text_data_json["username"]
        conteudo = text_data_json["conteudo"]
        enviado_as = text_data_json["enviado_as"]

        await self.salvar_mensagem(
        self.nome_sala,
        username,
        conteudo,
        enviado_as
    )

        # Envia mensagem para todos da sala
        await self.channel_layer.group_send(
            self.nome_sala, 
            {
                "type" : "chat.mensagem",
                "sala" : self.nome_sala,
                "username" : username,
                "conteudo": conteudo,
                "enviado_as" : enviado_as
                })

    async def chat_mensagem(self, event):
        username = event["username"]
        conteudo = event["conteudo"]
        enviado_as = event["enviado_as"] 
        

        # Enviar mensagem para o websockt
        #o json.dumps() transforma um dicionário python em uma string json
        # o self.send() envia para o cliente conectado
        await self.send(text_data=json.dumps({
                "username" : username,
                "conteudo": conteudo,
                "enviado_as" : enviado_as
            }))