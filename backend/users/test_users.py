from django.test import TestCase
import pytest                               # framework para testes 
from django.contrib.auth.models import User
from rest_framework.test import APIClient   # simular um usuario

@pytest.fixture
def client():
    return APIClient() # 'apiclient' simula uma requisição para api sem precisar de um server rodando

@pytest.mark.django_db # permite o teste acessar o banco de dados
def test_register_user(client): # teste de cadastrar usuario
    response = client.post('/api/users/register/', {
        'username': 'testuser',
        'email': 'test@test.com',
        'password': 'senha123'
    })
    assert response.status_code == 201 # verifica se o codigo resultado da operação é 201, ou seja: usuario cadastrado com sucesso

@pytest.mark.django_db # permite o teste acessar o banco de dados
def test_login_user(client): # teste de logar usuario
    User.objects.create_user(username='testuser', password='senha123')
    response = client.post('/api/token/', {
        'username': 'testuser',
        'password': 'senha123'
    })
    assert response.status_code == 200 # verifica se o usuario foi logado
    assert 'access' in response.data   # verifica se o token de acesso foi criado
    assert 'refresh' in response.data  # verifica se o token de refresh

    '''
    SOBRE OS TOKENS (JWT/JSON Web Token)
existem dois tipos de token : access token e refresh token

ACCESS TOKEN
o access token é a "credencial" do usuario q permite ele acessar rotas protegidas em um sistema
tem uma validade de geralmente 15 minutos, o usuario recebe outro token somente se o refresh estiver validado

REFRESH TOKEN
o refresh token serve para o usuario conseguir renovar o access token
tem uma validade de 7 dias normalmente, o usuario obtem o refresh token a partir do login
    '''