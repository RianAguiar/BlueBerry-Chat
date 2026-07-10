# views do django channels
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
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

    # Sair da sala
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.nome_sala, self.channel_name)



    ''' esse método é chamado automaticamente sempre que o cliente envia uma mensagem pelo WebSocket,
    onde ele pega a mensagem enviada pelo navegador e distribui essa mensagem para todos os usuarios
    conectados ao canal de comunicação'''
    async def receive(self, text_data):
        # o json.loads converte de json para dicionario python
        text_data_json = json.loads(text_data)
        mensagem = text_data_json["mensagem"]

        # Envia mensagem para todos da sala
        await self.channel_layer.group_send(
            self.nome_sala, 
            {
                "type": "chat.mensagem", 
                "mensagem": mensagem
                })



    async def chat_mensagem(self, event):
        mensagem = event["mensagem"]

        # Enviar mensagem para o websockt
        #o json.dumps() transforma um dicionário python em uma string json
        # o self.send() envia para o cliente conectado
        await self.send(text_data=json.dumps({"mensagem": mensagem}))