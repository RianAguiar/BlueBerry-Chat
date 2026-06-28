from rest_framework import viewsets
from .models import Mensagem, Sala
from .serializers import MensagemSerializer, SalaSerializer

class GetMensagens(viewsets.ModelViewSet):
    queryset = Mensagem.objects.all()
    serializer_class = MensagemSerializer

class 