from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CampaignCreate(BaseModel):
    name: str
    template: str

class CampaignResponse(BaseModel):
    id: int
    name: str
    template: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True