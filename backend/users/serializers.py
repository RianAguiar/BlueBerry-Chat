from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True) #write only serve para nunca voltar a senha do usuario na api
    class Meta:
        model = User
        fields = ['username','email','password']

    def create(self, validated_data):
        user = User.objects.create_user( # importante colocar "create_user" ao invés de só create pois criptografa a senha antes de enviar para o banco
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password'],
        )
        return user