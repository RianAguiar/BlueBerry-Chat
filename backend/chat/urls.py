from django.urls import path
from .views import SalaAPIView
from .views import MensagensAPIView

urlpatterns = [
    path("sala/<str:nome>/", SalaAPIView.as_view(), name="Sala"),
    path("sala/<str:nome>/mensagens/", MensagensAPIView.as_view(), name="Mensagens"),
]

''' sala exemplo

http://127.0.0.1:8000/api/sala/projetochat/mensagens/

'''