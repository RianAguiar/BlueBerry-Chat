from django.urls import path
from .views import SalaAPIView, MensagensAPIView, ProcessarAPIView


urlpatterns = [
    # para pegar a url(nome da sala) digitada no index
    path("sala/", ProcessarAPIView.as_view(), name="Processar"),

    # entrar ou criar sala
    path("sala/<str:nome>/", SalaAPIView.as_view(), name="Sala"),
    
    # pegar as mensagens da sala
    path("sala/<str:nome>/mensagens/", MensagensAPIView.as_view(), name="Mensagens"),
]

''' sala exemplo

http://127.0.0.1:8000/api/sala/projetochat/mensagens/

'''