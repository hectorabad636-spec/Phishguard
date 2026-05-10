from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.campaign import Campaign
from app.schemas.campaign import CampaignCreate, CampaignResponse
from typing import List

router = APIRouter(prefix="/campaigns", tags=["campaigns"])

@router.get("/", response_model=List[CampaignResponse])
def get_campaigns(db: Session = Depends(get_db)):
    return db.query(Campaign).all()

@router.post("/", response_model=CampaignResponse)
def create_campaign(campaign: CampaignCreate, db: Session = Depends(get_db)):
    new_campaign = Campaign(
        name=campaign.name,
        template=campaign.template,
        status="draft"
    )
    db.add(new_campaign)
    db.commit()
    db.refresh(new_campaign)
    return new_campaign

@router.get("/{id}", response_model=CampaignResponse)
def get_campaign(id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaña no encontrada")
    return campaign

@router.delete("/{id}")
def delete_campaign(id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaña no encontrada")
    db.delete(campaign)
    db.commit()
    return {"message": "Campaña eliminada"}