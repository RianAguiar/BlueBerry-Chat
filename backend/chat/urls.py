from django.urls import path
from .views import SalaAPIView, UploadImagemAPIView


urlpatterns = [
    #GET               /api/sala/<nome>/                         pegar info da sala
    #POST              /api/sala/<nome>/                         entrar ou criar sala
    #DELETE            /api/sala/<nome>/                         deletar sala
    path("sala/<str:nome>/", SalaAPIView.as_view(), name="Sala"),
    path("sala/<str:nome>/mensagens/upload-imagem/", UploadImagemAPIView.as_view(), name="upload-imagem"),
    
]