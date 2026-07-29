import pytest

from chat.serializers import SalaSerializer


pytestmark = pytest.mark.django_db


def test_sala_serializer_retorna_id_e_nome(sala):
    dados = SalaSerializer(sala).data

    assert dados["id"] == sala.id
    assert dados["nome"] == "sala-teste"

