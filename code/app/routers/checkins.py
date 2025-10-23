from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from typing import Optional
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session, sessionmaker
from ..config import settings
from ..models import Base, Checkin
from ..services.nlp import emotion_scores, crisis_signal
import uuid

engine = create_engine(settings.database_url, future=True)
SessionLocal = sessionmaker(engine, expire_on_commit=False, future=True)
Base.metadata.create_all(engine)

router = APIRouter(prefix="/checkins", tags=["checkins"])

class CreateCheckin(BaseModel):
    text: Optional[str] = None
    emoji: Optional[str] = None
    voice_asset_id: Optional[str] = None

class Emotion(BaseModel):
    joy: float; sadness: float; anger: float; fear: float; hope: float; burnout: float

class CheckinOut(BaseModel):
    id: str
    created_at: str | None = None
    text: Optional[str] = None
    emoji: Optional[str] = None
    voice_asset_id: Optional[str] = None
    emotion: Emotion | None = None
    suggestions: list[str] = Field(default_factory=list)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("", response_model=list[CheckinOut])
def list_checkins(db: Session = Depends(get_db)):
    rows = db.execute(select(Checkin).order_by(Checkin.created_at.desc()).limit(30)).scalars().all()
    return [CheckinOut(
        id=r.id, created_at=str(r.created_at), text=r.text, emoji=r.emoji,
        voice_asset_id=r.voice_asset_id, emotion=r.emotion, suggestions=r.suggestions or []
    ) for r in rows]

@router.post("", status_code=201)
def create_checkin(payload: CreateCheckin, db: Session = Depends(get_db)):
    emo = emotion_scores(payload.text or "")
    sugg = [
        "عدّل سطرين في خطاب التقديم — خمس دقايق بس.",
        "خذ نفس عميق 4-4-6 لخمس مرات."
    ]
    row = Checkin(
        id=str(uuid.uuid4()), user_id="anon", text=payload.text, emoji=payload.emoji,
        voice_asset_id=payload.voice_asset_id, emotion=emo, suggestions=sugg
    )
    db.add(row); db.commit()
    if crisis_signal(payload.text or ""):
        # hook for helpline surfacing / admin alert
        pass
    return {}
