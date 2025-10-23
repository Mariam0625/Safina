# Lightweight placeholders for emotion and safety detection tuned for Emirati Arabic.
# Will replace with a more detailed production models when ready.

from typing import Dict

EMIRATI_NEGATIVE = [
    "تعبان", "مضغوط", "مالي خلق", "زهقان", "مكتئب", "وحيد", "خايف"
]
EMIRATI_CRISIS = [
    "أذي نفسي", "انتحار", "ما أبى أعيش", "أقذي نفسي"
]

def emotion_scores(text: str) -> Dict[str, float]:
    t = text or ""
    base = {"joy":0.2,"sadness":0.2,"anger":0.1,"fear":0.1,"hope":0.3,"burnout":0.1}
    if any(w in t for w in EMIRATI_NEGATIVE):
        base["sadness"] += 0.3
        base["burnout"] += 0.2
        base["hope"] -= 0.1
    if "الحمد لله" in t:
        base["joy"] += 0.2
        base["hope"] += 0.2
    for k,v in base.items():
        base[k] = float(max(0.0, min(1.0, v)))
    return base

def crisis_signal(text: str) -> bool:
    t = text or ""
    return any(w in t for w in EMIRATI_CRISIS)
