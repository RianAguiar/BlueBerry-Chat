import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter # decide qual viwe ou consumer usar dependendo do tipo de requisição sendo http ou websocket
from channels.routing import URLRouter # urlrouter faz a mesma função do "urls.py" porém para websocket
from channels.auth import AuthMiddlewareStack


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')# define qual arquivo o de configuração o django vai usar

application = ProtocolTypeRouter({ #chama o protocolotyperouter, se a requisição for http ele envia pra as views
    'http': get_asgi_application(), #  se for websocket envia a requisição para algum consumer
    
})

'''
servidores wsgi (padrao django) processa cada task por vez, já os servidores assincronos(asgi) processa varias requisições por vez
tambem o asgi tem suporte para websocket(o wsgi n tem suporte à websocket)
esse arquivo é onde configura o django para suportar o padrao asgi
'''