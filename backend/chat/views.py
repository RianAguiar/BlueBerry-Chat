from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Sala, Mensagem
from .serializers import SalaSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.core.files.storage import default_storage
from rest_framework.parsers import MultiPartParser


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
class UploadImagemAPIView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, nome):
        if not Sala.objects.filter(nome=nome).exists():
            return Response({"erro": "Sala não encontrada"}, status=404)

        arquivo = request.FILES.get("image")
        if not arquivo:
            return Response({"erro": "Nenhuma imagem enviada"}, status=400)

        if arquivo.size > 5 * 1024 * 1024:
            return Response({"erro": "Imagem muito grande (máx. 5MB)"}, status=400)

        if not arquivo.content_type.startswith("image/"):
            return Response({"erro": "Arquivo não é uma imagem"}, status=400)

        caminho = default_storage.save(f"images/{arquivo.name}", arquivo)

        return Response({
            "path": caminho,
            "url": default_storage.url(caminho)
        })