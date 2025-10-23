from fastapi import APIRouter, Query
router = APIRouter(tags=["blossom"])

@router.get("/blossom/summary")
def blossom_summary(locale: str = Query("ar-AE")):
    # TODO: compute real stats from DB; this is a placeholder that you can adapt
    petals = [
        {"id": 1, "size": "large", "color": "bg-pink-400", "rotation": 0},
        {"id": 2, "size": "large", "color": "bg-pink-300", "rotation": 72},
        {"id": 3, "size": "medium", "color": "bg-pink-200", "rotation": 144},
        {"id": 4, "size": "small", "color": "bg-pink-100", "rotation": 216},
        {"id": 5, "size": "small", "color": "bg-gray-200", "rotation": 288},
    ]
    return {
        "petals": petals,
        "petals_count": len(petals),
        "growth_count": 7,
        "resilience_count": 3,
        "locale": locale,
    }
