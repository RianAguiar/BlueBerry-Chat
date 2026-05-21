# Chat

# STACK
Django
React
JWT
PostgreSQL
Docker
Redis
Celery
TDD

# Instalação

# 1. Criar o ambiente virtual
python -m venv venv

# 2. Ativar
venv\Scripts\activate

ou

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process                                            
>> venv\Scripts\activate         

# 3. Instalar as dependências
pip install -r requirements.txt


# Estrutura Do Projeto

chat-app/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── apps/
│       └── users/
├── frontend/
│   └── (criado depois com Vite)
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
└── .env
