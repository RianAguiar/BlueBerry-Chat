from .models import Sala, Mensagem
from rest_framework import serializers

class SalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = '__all__'

class UploadImagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensagem
        fields = 'image'
        