from django.contrib import admin
from .models import Mensagem, Sala


@admin.register(Sala)
class SalaAdmin(admin.ModelAdmin):
    list_display = ('nome')

@admin.register(Mensagem)
class MensagemAdmin(admin.ModelAdmin):
    list_display = ('sala','username','conteudo','enviado_em')
