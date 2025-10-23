CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  anon BOOLEAN NOT NULL DEFAULT true,
  locale TEXT DEFAULT 'ar-AE',
  dialect TEXT DEFAULT 'ar-Gulf',
  notifications_enabled BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  kind TEXT NOT NULL CHECK (kind IN ('audio','image','video')),
  storage_key TEXT NOT NULL,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  text TEXT,
  emoji TEXT,
  voice_asset_id UUID REFERENCES media_assets(id),
  emotion JSONB,
  suggestions TEXT[]
);

CREATE INDEX IF NOT EXISTS checkins_user_created_idx ON checkins (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  text TEXT NOT NULL,
  voice_asset_id UUID REFERENCES media_assets(id),
  emotion JSONB,
  blossom_delta INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS journal_user_created_idx ON journal_entries (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS pathway_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('application','interview','rejection','offer')),
  organization TEXT,
  title TEXT,
  occurred_on DATE NOT NULL,
  notes TEXT,
  reframing_prompt TEXT,
  micro_action TEXT
);

CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  earned_on DATE NOT NULL DEFAULT now()::date,
  UNIQUE (user_id, code)
);

CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  text TEXT NOT NULL,
  dialect TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  media_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  org TEXT,
  starts_on DATE,
  link TEXT,
  readiness TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS helplines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  region TEXT,
  languages TEXT[]
);
