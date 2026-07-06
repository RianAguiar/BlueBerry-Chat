from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Mensagem, Sala
from .serializers import MensagemSerializer, SalaSerializer
from django.shortcuts import get_object_or_404



# apenas pra consulta
class SalaAPIView(APIView):
    def get(self,request, nome):
        try:
            sala = Sala.objects.get(nome=nome)
        except Sala.DoesNotExist:
            return Response('sala n existe')
        
        serializer = SalaSerializer(sala)
        return Response(serializer.data)
    
#Buscar sala, ver se existe, se existir envia o usuario para essa sala e resgata as mensagens enteriores,
# se n existir cria automaticamente a sala e envia o usuario para ela
    def post(self, request, nome):
        sala, criada = Sala.objects.get_or_create(nome=nome)
        return Response({
            "sala": sala.nome,
            "criada": criada,
        })

class MensagensAPIView(APIView):
    def get(self, request, nome):
        sala = Sala.objects.get(nome=nome)
        mensagens = Mensagem.objects.filter(sala=sala)
        serializer = MensagemSerializer(mensagens, many=True)
        return Response(serializer.data)
    
    def post(self, request, nome):

        # queryset de buscar(get) se a sala n existir da o erro 404(not found)
        sala = get_object_or_404(Sala, nome=nome)
        mensagem = Mensagem.objects.create(
            sala = sala,
            username = request.data.get('username'),
            conteudo = request.data.get('conteudo'),
            enviado_as = request.data.get('enviado_as'),
            )
        serializer = MensagemSerializer(mensagem)
        return Response(serializer.data, status=201)

''' Json para teste

{
    "username": "joao",
    "conteudo": "Olá, pessoal!",
    "enviado_as": "2026-07-03T22:30:00Z"
}

'''