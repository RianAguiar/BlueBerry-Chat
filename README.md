# Chat
My project consists of a practical, anonymous chat system that requires no account creation or login. To access it, users simply need to enter with a nickname and the name of the room they wish to join. If the specified room doesn't exist, it's created automatically, if it already exists, the system retrieves the message history from previous participants. The goal is to provide a simple, fast, and accessible communication platform while preserving the participants' anonymity.

Chat Project to improve my code skills and my stack, where i document all my evolution and project's progress

# STACK
- Django Rest Framework
- Django Channels
- Websocket
- React
- SQLite
- PostgreSQL (soon)
- Docker (soon)
- Redis (soon)
- Celery (soon)
- TDD (soon)

# installation
# 1. Make the Virtual Environment
python -m venv venv

# 2. Activating
venv\Scripts\activate

or

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process                                            
venv\Scripts\activate         

# 3. Dependencies Installation
pip install -r requirements.txt
# and
cd frontend
npm install

# 4.Run servers
cd backend
python manage.py runserver
(open another terminal)
# and
cd frontend
npm run dev

# 5.optionals
- SQLite Viewer(VScode extension)
WebSocket Tester:
- https://hoppscotch.io/realtime/websocket




