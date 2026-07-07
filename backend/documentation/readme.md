admin data
| USERNAME | EMAIL             | PASSWORD |
| admin    | admin@example.com | admin    |

Meu projeto consiste em um sistema de chat anônimo e prático, no qual não é necessário criar uma conta ou fazer login. Para acessar, o usuário precisa apenas informar um nickname e o nome da sala que deseja entrar na tela inicial. Caso a sala informada não exista, ela é criada automaticamente. Se a sala já existir, o sistema recupera o histórico das mensagens trocadas anteriormente pelos usuários que participaram daquela conversa. O objetivo é oferecer uma plataforma de comunicação simples, rápida e acessível, preservando o anonimato dos participantes. Stack: React, Django Rest Framework, Redis, websocket

ideias de features:

- função de excluir sala
- Responder mensagens (reply).
- implementar websockets
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

