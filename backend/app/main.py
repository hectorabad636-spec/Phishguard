from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.models import user, campaign, email_event
from app.routes import auth, campaigns, tracking
from app.core.websocket import manager
import logging
logging.basicConfig(level=logging.DEBUG)
from app.routes import auth, campaigns, tracking, reports

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
app.include_router(tracking.router)
app.include_router(reports.router)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(data)
    except:
        manager.disconnect(websocket)

@app.get("/")
def root():
    return {"status": "ok", "message": "PhishGuard API funcionando"}

@app.get("/health")
def health():
    return {"status": "healthy"}