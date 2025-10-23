from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine, select
from ..config import settings
from ..models import Base, PathwayEvent
import uuid, datetime

engine = create_engine(settings.database_url, future=True)
SessionLocal = sessionmaker(engine, expire_on_commit=False, future=True)
Base.metadata.create_all(engine)

router = APIRouter(prefix="/pathway", tags=["pathway"])

class CreateEvent(BaseModel):
    type: str
    organization: str | None = None
    title: str | None = None
    occurred_on: datetime.date
    notes: str | None = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/events")
def list_events(db: Session = Depends(get_db)):
    rows = db.execute(select(PathwayEvent).order_by(PathwayEvent.occurred_on.desc()).limit(50)).scalars().all()
    return [{
        "id": r.id, "type": r.type, "organization": r.organization, "title": r.title,
        "occurred_on": str(r.occurred_on), "notes": r.notes,
        "reframing_prompt": "وش تعلمت اليوم؟", "micro_action": "رتّب ملاحظة شكر قصيرة"
    } for r in rows]

@router.post("/events", status_code=201)
def create_event(payload: CreateEvent, db: Session = Depends(get_db)):
    row = PathwayEvent(id=str(uuid.uuid4()), user_id="anon", **payload.model_dump())
    db.add(row); db.commit()
    return {}
