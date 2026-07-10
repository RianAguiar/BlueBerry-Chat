# criar as rotas Websockets
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/sala/<str:nome>/mensagens/', consumers.ChatConsumer.as_asgi())
]