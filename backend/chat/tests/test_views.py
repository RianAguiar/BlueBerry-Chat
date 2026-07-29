import io

import pytest
from django.urls import reverse
from PIL import Image
from rest_framework import status

from chat.models import Sala


pytestmark = pytest.mark.django_db


def _imagem_valida(nome="foto.png"):
    buffer = io.BytesIO()
    Image.new("RGB", (10, 10)).save(buffer, format="PNG")
    buffer.seek(0)
    buffer.name = nome
    return buffer


# ---------------------------- SalaAPIView -----------------------------------

class TestConsultarSala:
    def test_sala_existente_retorna_dados_serializados(self, api_client, sala):
        response = api_client.get(reverse("Sala", args=[sala.nome]))

        assert response.status_code == status.HTTP_200_OK
        assert response.data["nome"] == sala.nome

    def test_sala_inexistente_nao_da_erro_500(self, api_client):
        response = api_client.get(reverse("Sala", args=["nao-existe"]))

        # Comportamento atual da view: responde 200 com uma string de aviso
        # em vez de 404. Mantido aqui documentado pelo teste; se decidir
        # trocar para 404 no futuro, é só atualizar essa asserção.
        assert response.status_code == status.HTTP_200_OK
        assert response.data == "sala n existe"


class TestEntrarOuCriarSala:
    def test_cria_sala_quando_nao_existe(self, api_client):
        response = api_client.post(reverse("Sala", args=["nova-sala"]))

        assert response.status_code == status.HTTP_200_OK
        assert response.data == {"sala": "nova-sala", "criada": True}
        assert Sala.objects.filter(nome="nova-sala").exists()

    def test_nao_duplica_sala_que_ja_existe(self, api_client, sala):
        response = api_client.post(reverse("Sala", args=[sala.nome]))

        assert response.data == {"sala": sala.nome, "criada": False}
        assert Sala.objects.filter(nome=sala.nome).count() == 1


class TestDeletarSala:
    def test_deleta_sala_existente(self, api_client, sala):
        response = api_client.delete(reverse("Sala", args=[sala.nome]))

        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Sala.objects.filter(nome=sala.nome).exists()

    def test_deletar_sala_inexistente_retorna_404(self, api_client):
        response = api_client.delete(reverse("Sala", args=["nao-existe"]))

        assert response.status_code == status.HTTP_404_NOT_FOUND


# ------------------------- UploadImagemAPIView ------------------------------

class TestUploadImagem:
    def test_upload_em_sala_inexistente_retorna_404(self, api_client):
        arquivo = _imagem_valida()
        response = api_client.post(
            reverse("upload-imagem", args=["nao-existe"]),
            {"image": arquivo},
            format="multipart",
        )

        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.data == {"erro": "Sala não encontrada"}

    def test_upload_sem_arquivo_retorna_400(self, api_client, sala):
        response = api_client.post(
            reverse("upload-imagem", args=[sala.nome]), {}, format="multipart"
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data == {"erro": "Nenhuma imagem enviada"}

    def test_upload_arquivo_que_nao_e_imagem_retorna_400(self, api_client, sala):
        arquivo_texto = io.BytesIO(b"conteudo qualquer")
        arquivo_texto.name = "arquivo.txt"

        response = api_client.post(
            reverse("upload-imagem", args=[sala.nome]),
            {"image": arquivo_texto},
            format="multipart",
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data == {"erro": "Arquivo não é uma imagem"}

    def test_upload_arquivo_maior_que_5mb_retorna_400(self, api_client, sala):
        arquivo_grande = io.BytesIO(b"0" * (5 * 1024 * 1024 + 1))
        arquivo_grande.name = "grande.png"
        arquivo_grande.content_type = "image/png"

        response = api_client.post(
            reverse("upload-imagem", args=[sala.nome]),
            {"image": arquivo_grande},
            format="multipart",
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data == {"erro": "Imagem muito grande (máx 5MB)"}

    def test_upload_valido_retorna_path_e_url(self, api_client, sala, settings, tmp_path):
        settings.MEDIA_ROOT = tmp_path  # isola os arquivos de teste do projeto real

        response = api_client.post(
            reverse("upload-imagem", args=[sala.nome]),
            {"image": _imagem_valida()},
            format="multipart",
        )

        assert response.status_code == status.HTTP_200_OK
        assert "path" in response.data
        assert "url" in response.data
        assert (tmp_path / "images" / "foto.png").exists()
