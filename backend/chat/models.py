from django.db import models

class Sala(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.nome

class Mensagem(models.Model):
    sala = models.ForeignKey(Sala, related_name='mensagens', on_delete=models.CASCADE)
    username = models.CharField(max_length=50)
    conteudo = models.TextField()
    enviado_as = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.username} : {self.conteudo}'