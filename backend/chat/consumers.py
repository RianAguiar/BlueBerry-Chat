# views do django channels
import json
from channels.generic.websocket import WebsocketConsumer

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send(text_data=json.dumps({
            'type' : 'connection_established',
            'message': "you're connected"
        }))
    
    def receive(self, text_data):
        dados = json.loads(text_data)
        mensagem = dados['mensagem']
        
        self.send(text_data=json.dumps({
            'type' : 'chat',
            'mensagem' : mensagem
        }))
    
    def disconnect(self, code):
        return super().disconnect(code)