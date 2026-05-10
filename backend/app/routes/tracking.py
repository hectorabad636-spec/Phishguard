from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.email_event import EmailEvent
from app.core.websocket import manager
import asyncio
import json

router = APIRouter(prefix="/track", tags=["tracking"])

@router.get("/click/{campaign_id}/{user_email}")
async def track_click(
    campaign_id: int,
    user_email: str,
    request: Request,
    db: Session = Depends(get_db)
):
    event = EmailEvent(
        campaign_id=campaign_id,
        user_email=user_email,
        event_type="click",
        ip_address=request.client.host,
        user_agent=request.headers.get("user-agent")
    )
    db.add(event)
    db.commit()

    asyncio.create_task(manager.broadcast(json.dumps({
        "type": "click",
        "email": user_email,
        "campaign_id": campaign_id,
        "ip": request.client.host
    })))

    return RedirectResponse(url=f"http://localhost:3000/landing?email={user_email}")

@router.get("/open/{campaign_id}/{user_email}")
def track_open(
    campaign_id: int,
    user_email: str,
    request: Request,
    db: Session = Depends(get_db)
):
    event = EmailEvent(
        campaign_id=campaign_id,
        user_email=user_email,
        event_type="open",
        ip_address=request.client.host,
        user_agent=request.headers.get("user-agent")
    )
    db.add(event)
    db.commit()

    return {"status": "tracked"}

@router.get("/events/{campaign_id}")
def get_events(campaign_id: int, db: Session = Depends(get_db)):
    events = db.query(EmailEvent).filter(
        EmailEvent.campaign_id == campaign_id
    ).all()
    return events