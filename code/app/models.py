from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, DateTime, func, Boolean, ForeignKey, Text, JSON, Date
import uuid

class Base(DeclarativeBase):
    pass

def uuidpk():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=uuidpk)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
    anon: Mapped[bool] = mapped_column(Boolean, default=True)
    locale: Mapped[str] = mapped_column(String, default="ar-AE")
    dialect: Mapped[str] = mapped_column(String, default="ar-Gulf")
    notifications_enabled: Mapped[bool] = mapped_column(Boolean, default=True)

class MediaAsset(Base):
    __tablename__ = "media_assets"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=uuidpk)
    user_id: Mapped[str | None] = mapped_column(String, ForeignKey("users.id"))
    kind: Mapped[str] = mapped_column(String)
    storage_key: Mapped[str] = mapped_column(String)
    duration_ms: Mapped[int | None]
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())

class Checkin(Base):
    __tablename__ = "checkins"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=uuidpk)
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
    text: Mapped[str | None] = mapped_column(Text)
    emoji: Mapped[str | None] = mapped_column(String)
    voice_asset_id: Mapped[str | None] = mapped_column(String, ForeignKey("media_assets.id"))
    emotion: Mapped[dict | None] = mapped_column(JSON)
    suggestions: Mapped[list[str] | None] = mapped_column(JSON)

class JournalEntry(Base):
    __tablename__ = "journal_entries"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=uuidpk)
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
    text: Mapped[str] = mapped_column(Text)
    voice_asset_id: Mapped[str | None] = mapped_column(String, ForeignKey("media_assets.id"))
    emotion: Mapped[dict | None] = mapped_column(JSON)
    blossom_delta: Mapped[int] = mapped_column(default=0)

class PathwayEvent(Base):
    __tablename__ = "pathway_events"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=uuidpk)
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    type: Mapped[str] = mapped_column(String)  # application/interview/rejection/offer
    organization: Mapped[str | None] = mapped_column(String)
    title: Mapped[str | None] = mapped_column(String)
    occurred_on: Mapped[str] = mapped_column(Date)
    notes: Mapped[str | None] = mapped_column(Text)
    reframing_prompt: Mapped[str | None] = mapped_column(Text)
    micro_action: Mapped[str | None] = mapped_column(Text)

class Badge(Base):
    __tablename__ = "badges"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=uuidpk)
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    code: Mapped[str] = mapped_column(String)
    name: Mapped[str] = mapped_column(String)
    earned_on: Mapped[str] = mapped_column(Date)

class Story(Base):
    __tablename__ = "stories"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=uuidpk)
    user_id: Mapped[str | None] = mapped_column(String, ForeignKey("users.id"))
    text: Mapped[str] = mapped_column(Text)
    dialect: Mapped[str | None] = mapped_column(String)
    status: Mapped[str] = mapped_column(String, default="pending")
    media_url: Mapped[str | None] = mapped_column(String)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())

class Opportunity(Base):
    __tablename__ = "opportunities"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=uuidpk)
    title: Mapped[str] = mapped_column(String)
    org: Mapped[str | None] = mapped_column(String)
    starts_on: Mapped[str | None] = mapped_column(Date)
    link: Mapped[str | None] = mapped_column(String)
    readiness: Mapped[str | None] = mapped_column(String)
    location: Mapped[str | None] = mapped_column(String)

class Helpline(Base):
    __tablename__ = "helplines"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=uuidpk)
    name: Mapped[str] = mapped_column(String)
    phone: Mapped[str] = mapped_column(String)
    region: Mapped[str | None] = mapped_column(String)
    languages: Mapped[list[str] | None] = mapped_column(JSON)
