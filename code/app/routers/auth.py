from fastapi import APIRouter
from pydantic import BaseModel
import uuid, time

router = APIRouter(prefix="/auth", tags=["auth"])

class TokenOut(BaseModel):
    access_token: str
    refresh_token: str
    user_id: str

@router.post("/anon", response_model=TokenOut)
def anon():
    # Minimal opaque tokens for demo; replace with JWT in production
    user_id = str(uuid.uuid4())
    return TokenOut(
        access_token=f"anon.{user_id}.{int(time.time())}",
        refresh_token=str(uuid.uuid4()),
        user_id=user_id
    )
