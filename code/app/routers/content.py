from fastapi import APIRouter
from ..config import settings
import json, pathlib

router = APIRouter(tags=["resources","opportunities","stories"])

_I18N = json.loads(
    pathlib.Path(__file__).resolve().parents[1]
    .joinpath("i18n","ar-AE.emirati.json").read_text(encoding="utf-8")
)

@router.get("/resources/helplines")
def helplines():
    return _I18N.get("helplines_uae", [])

@router.get("/opportunities")
def opportunities(location: str | None = "UAE", readiness: str | None = "low-pressure"):
    # Placeholder; plug your real sources later
    return [
        {"id":"hub71-bootcamp","title":"برنامج Hub71 للتأسيس","org":"Hub71","starts_on":"2025-02-01",
         "link":"https://hub71.com/","readiness":"low-pressure","location":"Abu Dhabi"},
        {"id":"khalifa-fund-ideation","title":"مختبر أفكار للمشاريع الصغيرة","org":"Khalifa Fund",
         "starts_on":"2025-03-10","link":"https://khalifafund.ae/","readiness":"standard","location":"UAE"}
    ]

@router.get("/stories")
def stories(duration_max: int | None = None):
    return [
        {"id":"s1","title":"من عشر رفضات لوظيفة في ADNOC","tags":["أمل"],"duration_sec":120,"media_url":""},
        {"id":"s2","title":"موازنة العائلة وحلم الذكاء الاصطناعي","tags":["شجاعة"],"duration_sec":90,"media_url":""}
    ]

@router.post("/stories", status_code=202)
def submit_story(payload: dict):
    # Accept and queue for moderation
    return {"status":"accepted"}
