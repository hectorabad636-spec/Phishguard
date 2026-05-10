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