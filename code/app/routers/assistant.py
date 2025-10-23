from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any
from ..services.responder import respond

router = APIRouter(prefix="/assistant", tags=["assistant"])

class AskIn(BaseModel):
    text: str
    # You can send locale = "ar-AE" or "en-US" (defaults to ar-AE if not provided)
    locale: Optional[str] = None
    context: Optional[Dict[str, Any]] = None  # e.g., {"screen":"checkin"}

@router.post("/reply")
def ai_reply(payload: AskIn):
    ctx = payload.context or {}
    if payload.locale:
        ctx["locale"] = payload.locale
    return respond(payload.text, ctx)
