from fastapi import APIRouter, Query
import json, pathlib

router = APIRouter(tags=["resources", "opportunities", "stories"])

# simple in-memory cache for i18n bundles
_i18n_cache: dict[str, dict] = {}

def _load_i18n(locale: str) -> dict:
    """Load localized content; default to Arabic (ar-AE)."""
    if not locale:
        locale = "ar-AE"
    if locale in _i18n_cache:
        return _i18n_cache[locale]
    base = pathlib.Path(__file__).resolve().parents[1].joinpath("i18n")
    fname = "ar-AE.emirati.json" if locale.lower().startswith("ar") else "en-US.json"
    data = json.loads(base.joinpath(fname).read_text(encoding="utf-8"))
    _i18n_cache[locale] = data
    return data


@router.get("/resources/helplines")
def helplines(locale: str = Query("ar-AE", description="Locale, e.g. ar-AE or en-US")):
    """
    Localized helplines (UAE). Example: /resources/helplines?locale=en-US
    """
    i18n = _load_i18n(locale)
    return i18n.get("helplines_uae", [])


@router.get("/opportunities")
def opportunities(
    locale: str = Query("ar-AE", description="Locale, e.g. ar-AE or en-US"),
    location: str | None = "UAE",
    readiness: str | None = "low-pressure",
):
    """
    Localized Opportunity Radar (will swap with our real feed, this is only an example).
    """
    if locale.lower().startswith("en"):
        return [
            {
                "id": "hub71-bootcamp",
                "title": "Hub71 Founders Program",
                "org": "Hub71",
                "starts_on": "2025-02-01",
                "link": "https://hub71.com/",
                "readiness": "low-pressure",
                "location": "Abu Dhabi",
            },
            {
                "id": "khalifa-fund-ideation",
                "title": "Khalifa Fund Idea Lab for Startups",
                "org": "Khalifa Fund",
                "starts_on": "2025-03-10",
                "link": "https://khalifafund.ae/",
                "readiness": "standard",
                "location": "UAE",
            },
        ]
    # Arabic (default)
    return [
        {
            "id": "hub71-bootcamp",
            "title": "برنامج Hub71 للتأسيس",
            "org": "Hub71",
            "starts_on": "2025-02-01",
            "link": "https://hub71.com/",
            "readiness": "low-pressure",
            "location": "أبوظبي",
        },
        {
            "id": "khalifa-fund-ideation",
            "title": "مختبر أفكار للمشاريع الصغيرة – صندوق خليفة",
            "org": "Khalifa Fund",
            "starts_on": "2025-03-10",
            "link": "https://khalifafund.ae/",
            "readiness": "standard",
            "location": "الإمارات",
        },
    ]


@router.get("/stories")
def stories(
    locale: str = Query("ar-AE", description="Locale, e.g. ar-AE or en-US"),
    duration_max: int | None = None,
):
    """
    Localized inspirational stories (placeholder dataset).
    """
    if locale.lower().startswith("en"):
        return [
            {
                "id": "s1",
                "title": "From 10 Rejections to a Role at ADNOC",
                "tags": ["Hope"],
                "duration_sec": 120 if not duration_max else min(120, duration_max),
                "media_url": "",
            },
            {
                "id": "s2",
                "title": "Balancing Family and Dreams in AI",
                "tags": ["Courage"],
                "duration_sec": 90 if not duration_max else min(90, duration_max),
                "media_url": "",
            },
        ]
    # Arabic (default)
    return [
        {
            "id": "s1",
            "title": "من عشر رفضات لوظيفة في ADNOC",
            "tags": ["أمل"],
            "duration_sec": 120 if not duration_max else min(120, duration_max),
            "media_url": "",
        },
        {
            "id": "s2",
            "title": "موازنة العائلة وحلم الذكاء الاصطناعي",
            "tags": ["شجاعة"],
            "duration_sec": 90 if not duration_max else min(90, duration_max),
            "media_url": "",
        },
    ]


@router.post("/stories", status_code=202)
def submit_story(payload: dict, locale: str = Query("ar-AE")):
    """
    Submit an anonymous story (same endpoint for both languages).
    """
    return {"status": "accepted", "locale": locale}

