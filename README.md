# BlueBerry Chat

A practical, low-friction chat system that requires no account creation or login. Users get partial anonymity — just enter a nickname and the name of the room they want to join.

- If the room doesn't exist, it's created automatically.
- If it already exists, the full message history is retrieved for the new participant.

The goal is to provide a simple, fast and accessible communication platform while preserving participants' partial anonymity.

## Features

- No sign-up or login required
- Nickname-based partial anonymity
- Real-time messaging via WebSocket
- Message deletion function
- Reply message function
- Automatic room creation
- Persistent message history per room
- Room deletion function
- image sending 
- online users count
- Typing indicator
- Join notification ex:"Cartman has just joined"

### Index page
<p align="center">
  <img src="frontend/Documentation/IndexGif.gif" width="1000px" height="530px"/>
</p>

### Chat page
<p align="center">
  <img src="frontend/Documentation/SplitedChatGif.gif" width="1000px" height="530px"/>
</p>

## Stack

- Django Rest Framework
- Django Channels
- WebSocket
- React
- Docker
- Redis
- SQLite (Development)
- PostgreSQL (Production)
- TDD

## Architecture

```text
┌──────────────────────┐
│        React         │
│      Frontend        │
└──────────┬───────────┘
           │
      HTTP / WebSocket
           │
┌──────────▼───────────┐
│       Django         │
│                       │
│  ┌────────────────┐  │
│  │ Django REST    │  │
│  │ Framework      │  │
│  └────────────────┘  │
│                       │
│  ┌────────────────┐  │
│  │ Django Channels│  │
│  └────────────────┘  │
└───────┬───────┬───────┘
        │       │
        │       │ WebSocket
        │       │ Channel Layer
        │       ▼
        │   ┌─────────┐
        │   │  Redis  │
        │   └─────────┘
        │
        │ Persistence
        ▼
┌───────────────────┐
│    PostgreSQL     │
└───────────────────┘
```

## Infrastructure

All infrastructure is currently hosted on **free-tier services** (which is why it's a bit slow 😭):

| Service | Provider |
|---|---|
| Frontend & Backend | [Render](https://render.com/) |
| Redis | [Upstash](https://upstash.com/) |
| Database | [Supabase](https://supabase.com/) |

> Locally, this setup is replaced by a Dockerized Redis instance and SQLite — see [Installation](#-installation) below.

## Requirements

- Python 3.10+
- Node.js 18+
- Docker Desktop (with WSL2 enabled, if on Windows)

## Environment variables

Create a `.env` file inside `backend/` with at least:

```
SECRET_KEY=your-secret-key
DEBUG=True
REDIS_URL=redis://localhost:6379
DATABASE_URL=sqlite:///db.sqlite3
```

> For production, `REDIS_URL` and `DATABASE_URL` should point to your Upstash and Supabase instances instead. Adjust this list to match what `settings.py` actually reads.

## 🚀 Installation (local development)

### 1. Start Redis first (required by Django Channels)

```bash
docker pull redis
docker run --name redis-chat -p 6379:6379 -d redis
```

Make sure Docker Desktop is running before this step. To confirm the container is up:

```bash
docker ps
```

If you already created the container before, just start it again:

```bash
docker start redis-chat
```

To stop it later:

```bash
docker stop redis-chat
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
```

**Windows**
```bash
venv\Scripts\activate
```

**macOS / Linux**
```bash
source venv/bin/activate
```

### 3. Install dependencies

**Backend**
```bash
pip install -r requirements.txt
```

**Frontend**
```bash
cd frontend
npm install
```

### 4. Apply database migrations

```bash
cd backend
python manage.py migrate
```

### 5. Run the application

Start the Django server:
```bash
cd backend
python manage.py runserver
```

In a new terminal, start the React app:
```bash
cd frontend
npm run dev
```

## Optional Tools

- **SQLite Viewer** (VS Code extension)
- **WebSocket Tester:** https://hoppscotch.io/realtime/websocket

## Contributing

Issues and pull requests are welcome. Please open an issue first to discuss what you'd like to change.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Author

Made by [Rian Aguiar](https://github.com/RianAguiar)
