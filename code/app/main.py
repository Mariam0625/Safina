from fastapi import FastAPI
from .config import settings
from .routers import auth, checkins, journal, pathway, content, assistant, blossom

app = FastAPI(title="Safina Arabic API", version="0.1.0")

app.include_router(auth.router)
app.include_router(checkins.router)
app.include_router(journal.router)
app.include_router(pathway.router)
app.include_router(content.router)
app.include_router(assistant.router)
app.include_router(blossom.router)

@app.get("/system/ping")
def ping():
    return {"status":"ok","locale":settings.locale,"dialect":settings.dialect}
