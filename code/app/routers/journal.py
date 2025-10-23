from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine, select
from ..config import settings
from ..models import Base, JournalEntry
from ..services.nlp import emotion_scores
import uuid

engine = create_engine(settings.database_url, future=True)
SessionLocal = sessionmaker(engine, expire_on_commit=False, future=True)
Base.metadata.create_all(engine)

router = APIRouter(prefix="/journal", tags=["journal"])

class CreateJournal(BaseModel):
    text: str
    voice_asset_id: str | None = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/entries")
def list_entries(db: Session = Depends(get_db)):
    rows = db.execute(select(JournalEntry).order_by(JournalEntry.created_at.desc()).limit(50)).scalars().all()
    return [{
        "id": r.id, "created_at": str(r.created_at), "text": r.text,
        "emotion": r.emotion, "blossom_delta": r.blossom_delta
    } for r in rows]

@router.post("/entries", status_code=201)
def create_entry(payload: CreateJournal, db: Session = Depends(get_db)):
    emo = emotion_scores(payload.text)
    row = JournalEntry(
        id=str(uuid.uuid4()), user_id="anon", text=payload.text,
        voice_asset_id=payload.voice_asset_id, emotion=emo,
        blossom_delta=1 if emo.get("hope",0)>0.4 else 0
    )
    db.add(row); db.commit()
    return {}
