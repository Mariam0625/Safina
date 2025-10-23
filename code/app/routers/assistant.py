from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any
from ..services.responder import respond

router = APIRouter(prefix="/assistant", tags=["assistant"])

class AskIn(BaseModel):
    text: str
    context: Optional[Dict[str, Any]] = None  # e.g., {"screen":"checkin"} | {"screen":"pathway"}

@router.post("/reply")
def ai_reply(payload: AskIn):
    """
    Emirati-dialect, culturally-sensitive LLM reply + micro-action.
    Crisis-first: if high-risk text is detected, returns safety message + UAE helplines.
    """
    return respond(payload.text, payload.context or {})
