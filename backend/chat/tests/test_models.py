import pytest
from django.db import IntegrityError

from chat.models import Mensagem, Sala


pytestmark = pytest.mark.django_db


def test_criar_sala():
    sala = Sala.objects.create(nome="geral")
    assert sala.nome == "geral"
    assert str(sala) == "geral"


def test_nome_da_sala_deve_ser_unico():
    Sala.objects.create(nome="geral")
    with pytest.raises(IntegrityError):
        Sala.objects.create(nome="geral")


def test_criar_mensagem(sala):
    mensagem = Mensagem.objects.create(
        sala=sala,
        username="ryan",
        conteudo="opa, tudo bem?",
    )
    assert mensagem.sala == sala
    assert str(mensagem) == "ryan : opa, tudo bem?"
    assert mensagem.enviado_as is not None  # auto_now_add preenche sozinho


def test_deletar_sala_apaga_mensagens_em_cascata(sala):
    Mensagem.objects.create(sala=sala, username="ryan", conteudo="msg 1")
    Mensagem.objects.create(sala=sala, username="ryan", conteudo="msg 2")

    sala.delete()

    assert Mensagem.objects.count() == 0


def test_mensagem_pode_responder_outra_mensagem(sala):
    original = Mensagem.objects.create(sala=sala, username="ana", conteudo="oi")
    resposta = Mensagem.objects.create(
        sala=sala, username="ryan", conteudo="e ai", resposta=original
    )

    assert resposta.resposta == original
    assert original.respostas.count() == 1


def test_apagar_mensagem_original_nao_apaga_a_resposta(sala):
    original = Mensagem.objects.create(sala=sala, username="ana", conteudo="oi")
    resposta = Mensagem.objects.create(
        sala=sala, username="ryan", conteudo="e ai", resposta=original
    )

    original.delete()
    resposta.refresh_from_db()

    # on_delete=SET_NULL: a resposta continua existindo, só perde a referência
    assert resposta.resposta is None

