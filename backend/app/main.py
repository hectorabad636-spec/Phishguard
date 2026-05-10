from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.models import user, campaign, email_event
from app.routes import auth, campaigns
import logging
logging.basicConfig(level=logging.DEBUG)
from app.routes import auth, campaigns, tracking

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PhishGuard API",
    description="Phishing Awareness Platform API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(campaigns.router)
app.include_router(auth.router)
app.include_router(campaigns.router)
app.include_router(tracking.router)

@app.get("/")
def root():
    return {"status": "ok", "message": "PhishGuard API funcionando"}

@app.get("/health")
def health():
    return {"status": "healthy"}

from fastapi import WebSocket
from typing import List

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(data)
    except:
        manager.disconnect(websocket)