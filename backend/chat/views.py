from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Sala, Mensagem
from .serializers import SalaSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status

# apenas para consulta
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
    
    def delete(self, request, nome):
        sala = get_object_or_404(Sala, nome=nome)
        sala.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Para mandar imagem nas mensagens
class MensagensAPIView (APIView):
    def post(self, request, nome):

        '''
        o django channels n envia arquivos binarios ent tem que fazer a requisição pela api, salvar no banco
        e passar o caminho(url) pelo django channels
        '''
        imagem = request.FILES["image"]
        mensagem = Mensagem.objects.create(
            username=request.data["username"],
            image=imagem
        )
        return Response({
            "id" : mensagem.id,
            "image" : mensagem.imagem.url
        })
        