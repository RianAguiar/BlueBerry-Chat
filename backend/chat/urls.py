from django.urls import path
from .views import SalaAPIView, MensagensAPIView, MensagemAPIView


urlpatterns = [

    #GET               /api/sala/<nome>/                         pegar info da sala
    #POST              /api/sala/<nome>/                         entrar ou criar sala
    #DELETE            /api/sala/<nome>/                         deletar sala
    path("sala/<str:nome>/", SalaAPIView.as_view(), name="Sala"),
    
    #GET              /api/sala/<nome>/mensagens/                listar mensagens
    #POST             /api/sala/<nome>/mensagens/                enviar mensagem
    path("sala/<str:nome>/mensagens/", MensagensAPIView.as_view(), name="Mensagens"),

    #DELETE           /api/sala/<nome>/mensagens/<id>             deletar mensagem
    path("sala/<str:nome>/mensagens/<int:id>/", MensagemAPIView.as_view(), name="Mensagem"),
]

''' sala exemplo

http://127.0.0.1:8000/api/sala/projetochat/mensagens/

'''
