# Chat
My project consists of a practical, anonymous chat system that requires no account creation or login. To access it, users simply need to enter with a nickname and the name of the room they wish to join. If the specified room doesn't exist, it's created automatically, if it already exists, the system retrieves the message history from previous participants. The goal is to provide a simple, fast, and accessible communication platform while preserving the participants' anonymity.

Chat Project to improve my code skills and my stack, where i document all my evolution and project's progress

# STACK and FEATURES
Django
React
PostgreSQL
Docker
Redis
Celery
TDD

# Goals
database save messages, 
websocket authentication with jwt, 
make frontend with react, 
add redis as chennel layer, 
add celery for async tasks, 
add docker, 
switch from sqlite to postgresql

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

# 4.optionals
- SQLite Viewer(VScode extension)
WebSocket Tester:
- https://hoppscotch.io/realtime/websocket




