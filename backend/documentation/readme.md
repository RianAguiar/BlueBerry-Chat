admin data
| USERNAME | EMAIL             | PASSWORD |
| admin    | admin@example.com | admin    |

Meu projeto consiste em um sistema de chat anônimo e prático, no qual não é necessário criar uma conta ou fazer login. Para acessar, o usuário precisa apenas informar um nickname e o nome da sala que deseja entrar na tela inicial. Caso a sala informada não exista, ela é criada automaticamente. Se a sala já existir, o sistema recupera o histórico das mensagens trocadas anteriormente pelos usuários que participaram daquela conversa. O objetivo é oferecer uma plataforma de comunicação simples, rápida e acessível, preservando o anonimato dos participantes. Stack: React, Django Rest Framework, Redis, websocket

ideias de features:

- Responder mensagens (reply).
- implementar redis
- Indicador "está digitando..."
- Mensagens do sistema, como:
    João entrou na sala.
    Maria saiu da sala.
- função de mandar imagens nas salas
- função de poder criar sub-salas
- função de poder ver quantas pessoas estão conectadas na sala
- função de colocar senha nas salas
- função de colocar foto no perfil
- função de colocar foto na sala




# 🚀 Roadmap — Chat em Tempo Real (React + Django + WebSockets + Redis)

## 📌 Objetivo

Evoluir um sistema de chat desenvolvido com **React** e **Django REST Framework** para uma aplicação de mensagens em tempo real utilizando **WebSockets**, **Django Channels** e **Redis**, seguindo uma implementação gradual.

---

# 🌐 Etapa 2 — Entender WebSockets

## Estudar

* O que é HTTP
* O que é WebSocket
* Diferenças entre ambos
* Conexão persistente
* Ciclo de vida de uma conexão

### Objetivo

Criar um pequeno exemplo onde:

Cliente envia

```
Olá
```

Servidor responde

```
Você disse: Olá
```

Sem utilizar banco de dados.

---

# ⚙️ Etapa 3 — Django Channels

## Estudar

* ASGI
* Django Channels
* Consumers
* Routing

### Implementar

```
chat/

    consumers.py

    routing.py

config/

    asgi.py
```

### Objetivo

Conseguir abrir uma conexão em:

```
ws://localhost:8000/ws/chat/
```

e trocar mensagens.

---

# ⚛️ Etapa 4 — React + WebSocket

## Estudar

* new WebSocket()
* onopen
* onmessage
* onclose
* onerror

### Implementar

Substituir:

```
POST /mensagem
```

por

```
socket.send(...)
```

Agora as mensagens passam a ser enviadas em tempo real.

---

# 👥 Etapa 5 — Salas em Tempo Real

## Estudar

* Groups
* group_add()
* group_send()
* group_discard()

### Objetivo

Cada sala possuir seu próprio grupo.

Exemplo

```
Sala Java

Sala Python

Sala React
```

Usuários de uma sala não recebem mensagens das demais.

---

# 🔴 Etapa 6 — Redis

## Estudar

* Redis
* Pub/Sub
* Channel Layer

### Objetivo

Integrar o Redis ao Django Channels.

Fluxo esperado

```
Cliente

↓

Consumer

↓

Redis

↓

Outros Consumers

↓

Clientes conectados
```

---

# 💾 Etapa 7 — Persistência das Mensagens

## Objetivo

Ao receber uma mensagem:

1. Salvar no banco.
2. Enviar para todos os usuários da sala.

Fluxo

```
Mensagem

↓

Consumer

↓

Banco de Dados

↓

Redis

↓

Usuários conectados
```

---

# 📜 Etapa 8 — Histórico

Quando um usuário entrar em uma sala:

* Buscar mensagens via REST.
* Depois iniciar o WebSocket.

Fluxo

```
Entrou na sala

↓

GET Histórico

↓

Renderizar mensagens

↓

Abrir WebSocket

↓

Receber novas mensagens
```

---

# 🟢 Etapa 9 — Usuários Online

## Implementar

* Entrou na sala
* Saiu da sala
* Quantidade de usuários online

Exemplo

```
João entrou.

Maria saiu.

5 usuários online.
```

---

# ✨ Etapa 11 — Funcionalidades Extras

## Implementar

* Indicador de "digitando..."
* Editar mensagem
* Excluir mensagem
* Responder mensagem
* Emojis
* Upload de imagens
* Upload de arquivos
* Scroll infinito

---

# 📦 Estrutura Esperada

```
frontend/
│
├── components/
├── pages/
├── hooks/
└── services/

backend/
│
├── chat/
│   ├── consumers.py
│   ├── routing.py
│   ├── models.py
│   ├── serializers.py
│   └── views.py
│
├── config/
│   ├── asgi.py
│   ├── settings.py
│   └── urls.py
│
└── manage.py
```

---

# 🧠 Arquitetura Final

```
                 React
                    │
          HTTP      │      WebSocket
            │       │          │
            ▼       │          ▼
      Django REST   │   Django Channels
            │       │          │
            └───────┴──────────┘
                    │
                  Redis
                    │
             PostgreSQL/SQLite
```

---

# 📚 Ordem de Estudos

* [ ] Revisar Django REST Framework
* [ ] Entender HTTP
* [ ] Estudar WebSockets
* [ ] Aprender ASGI
* [ ] Instalar Django Channels
* [ ] Criar Consumers
* [ ] Conectar React ao WebSocket
* [ ] Criar grupos (salas)
* [ ] Configurar Redis
* [ ] Persistir mensagens
* [ ] Implementar histórico
* [ ] Usuários online
* [ ] Autenticação
* [ ] Funcionalidades extras
* [ ] Deploy da aplicação

---

# 🎯 Objetivo Final

Construir uma aplicação de chat em tempo real utilizando boas práticas, separando responsabilidades entre a API REST e os WebSockets.

**REST**

* Gerenciamento de salas.
* Histórico de mensagens.
* Autenticação.
* Operações administrativas.

**WebSockets**

* Mensagens em tempo real.
* Usuários online.
* Indicador de digitação.
* Notificações.
* Atualizações instantâneas da interface.

Ao concluir todas as etapas, o projeto terá uma arquitetura escalável e semelhante à utilizada em aplicações modernas de comunicação em tempo real.
