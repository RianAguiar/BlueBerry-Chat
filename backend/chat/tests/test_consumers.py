import pytest
from channels.testing import WebsocketCommunicator

from backend.asgi import application
from chat.models import Mensagem

pytestmark = pytest.mark.django_db(transaction=True)


async def _conectar(sala_nome):
    communicator = WebsocketCommunicator(
        application, f"/ws/sala/{sala_nome}/mensagens/"
    )
    conectado, _ = await communicator.connect()
    assert conectado
    return communicator


@pytest.mark.asyncio
async def test_ao_conectar_recebe_historico_vazio(sala):
    communicator = await _conectar(sala.nome)

    resposta = await communicator.receive_json_from()
    assert resposta == {"tipo": "historico", "mensagens": []}

    await communicator.disconnect()


@pytest.mark.asyncio
async def test_ao_conectar_recebe_historico_com_mensagens_previas(sala):
    await Mensagem.objects.acreate(sala=sala, username="ana", conteudo="oi galera")

    communicator = await _conectar(sala.nome)
    resposta = await communicator.receive_json_from()

    assert resposta["tipo"] == "historico"
    assert len(resposta["mensagens"]) == 1
    assert resposta["mensagens"][0]["username"] == "ana"
    assert resposta["mensagens"][0]["conteudo"] == "oi galera"

    await communicator.disconnect()


@pytest.mark.asyncio
async def test_enviar_mensagem_e_persistida_e_broadcast_para_a_sala(sala):
    communicator = await _conectar(sala.nome)
    await communicator.receive_json_from()  # descarta o historico inicial

    await communicator.send_json_to({
        "username": "ryan",
        "conteudo": "primeira mensagem",
        "enviado_as": "2026-07-29T14:30:00",
        "resposta": None,
        "image": None,
    })

    resposta = await communicator.receive_json_from()
    assert resposta["username"] == "ryan"
    assert resposta["conteudo"] == "primeira mensagem"
    assert resposta["resposta"] is None
    assert resposta["image"] is None
    assert await Mensagem.objects.filter(conteudo="primeira mensagem").aexists()

    await communicator.disconnect()


@pytest.mark.asyncio
async def test_dois_clientes_na_mesma_sala_recebem_a_mesma_mensagem(sala):
    cliente_1 = await _conectar(sala.nome)
    cliente_2 = await _conectar(sala.nome)
    await cliente_1.receive_json_from()  # historico
    await cliente_2.receive_json_from()  # historico

    await cliente_1.send_json_to({
        "username": "ryan",
        "conteudo": "oi pra sala toda",
        "enviado_as": "2026-07-29T14:30:00",
        "resposta": None,
        "image": None,
    })

    recebida_por_1 = await cliente_1.receive_json_from()
    recebida_por_2 = await cliente_2.receive_json_from()

    assert recebida_por_1["conteudo"] == "oi pra sala toda"
    assert recebida_por_2["conteudo"] == "oi pra sala toda"

    await cliente_1.disconnect()
    await cliente_2.disconnect()


@pytest.mark.asyncio
async def test_mensagem_com_resposta_inclui_dados_da_mensagem_original(sala):
    original = await Mensagem.objects.acreate(
        sala=sala, username="ana", conteudo="pergunta"
    )

    communicator = await _conectar(sala.nome)
    await communicator.receive_json_from()  # historico

    await communicator.send_json_to({
        "username": "ryan",
        "conteudo": "resposta aqui",
        "enviado_as": "2026-07-29T14:31:00",
        "resposta": original.id,
        "image": None,
    })

    resposta = await communicator.receive_json_from()
    assert resposta["resposta"]["id"] == original.id
    assert resposta["resposta"]["username"] == "ana"

    await communicator.disconnect()


@pytest.mark.asyncio
async def test_evento_join_e_repassado_para_a_sala(sala):
    communicator = await _conectar(sala.nome)
    await communicator.receive_json_from()  # historico

    await communicator.send_json_to({"type": "join", "username": "ryan"})

    resposta = await communicator.receive_json_from()
    assert resposta == {"type": "join", "username": "ryan"}

    await communicator.disconnect()


@pytest.mark.asyncio
async def test_evento_typing_e_repassado_para_a_sala(sala):
    communicator = await _conectar(sala.nome)
    await communicator.receive_json_from()  # historico

    await communicator.send_json_to({"type": "typing", "username": "ryan"})

    resposta = await communicator.receive_json_from()
    assert resposta == {"type": "typing", "username": "ryan"}

    await communicator.disconnect()


@pytest.mark.asyncio
async def test_evento_delete_remove_mensagem_do_banco_e_avisa_a_sala(sala):
    mensagem = await Mensagem.objects.acreate(
        sala=sala, username="ana", conteudo="vou ser apagada"
    )

    communicator = await _conectar(sala.nome)
    await communicator.receive_json_from()  # historico

    await communicator.send_json_to({"type": "delete", "id": mensagem.id})

    resposta = await communicator.receive_json_from()
    assert resposta == {"type": "delete", "id": mensagem.id}
    assert not await Mensagem.objects.filter(id=mensagem.id).aexists()

    await communicator.disconnect()
