import pytest
from rest_framework.test import APIClient

from chat.models import Sala


@pytest.fixture
def api_client():
    """Cliente HTTP para testar a API REST (DRF)."""
    return APIClient()


@pytest.fixture
def sala(db):
    """Uma sala já existente no banco, pronta pra usar nos testes."""
    return Sala.objects.create(nome="sala-teste")


@pytest.fixture(autouse=True)
def channel_layer_em_memoria(settings):
    """
    Em produção o projeto usa Redis como channel layer (CHANNEL_LAYERS em
    settings.py). Nos testes trocamos para o layer em memória: os testes
    passam a rodar sem precisar de um Redis real disponível (mais rápido e
    funciona em qualquer máquina/CI sem configuração extra).
    """
    settings.CHANNEL_LAYERS = {
        "default": {
            "BACKEND": "channels.layers.InMemoryChannelLayer",
        },
    }
