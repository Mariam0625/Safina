# -*- coding: utf-8 -*-
# Emirati-dialect, culture-aware response composer backed by OpenAI LLM.
# Safety: crisis-first gate; never medical/clinical claims; provide UAE helplines when needed.
# Bilingual, culture-aware LLM responder (Arabic Emirati default + English).

from typing import Dict, Any
import json, pathlib, random
from .nlp import emotion_scores, crisis_signal
from .openai_client import client, MODEL, TIMEOUT_S

# --- i18n helpers ------------------------------------------------------------
_I18N_CACHE: dict[str, dict] = {}

def load_i18n(locale: str) -> dict:
    """Load i18n bundle by locale with a small in-memory cache."""
    if locale in _I18N_CACHE:
        return _I18N_CACHE[locale]
    base = pathlib.Path(__file__).resolve().parents[1].joinpath("i18n")
    # map simple locale tags
    filename = "ar-AE.emirati.json" if locale.startswith("ar") else "en-US.json"
    data = json.loads(base.joinpath(filename).read_text(encoding="utf-8"))
    _I18N_CACHE[locale] = data
    return data

def _pick(xs, default=""):
    return random.choice(xs) if xs else default

# --- prompts -----------------------------------------------------------------
def system_prompt(locale: str) -> str:
    if locale.startswith("en"):
        return (
            "You are Safina, a warm, supportive companion.\n"
            "Rules:\n"
            "1) Empathy first, concise, kind tone (no therapy claims).\n"
            "2) No diagnosis/medical/legal advice; no promises; keep it light.\n"
            "3) Always offer ONE tiny, concrete micro-action (<= 1 sentence).\n"
            "4) If crisis signals appear, prioritize safety and list UAE helplines.\n"
            "5) Culturally sensitive: shame-aware, gentle, encourage small steps.\n"
            "Output must be valid JSON with keys: reply, micro_action, optional helplines."
        )
    # Arabic (Emirati) default
    return (
        "أنتِ «سفينة»، رفيقة رقمية لطيفة تتكلم باللهجة الإماراتية.\n"
        "المبادئ:\n"
        "1) التعاطف أولًا وباختصار؛ أسلوب دافئ وغير رسمي.\n"
        "2) لا تشخيص ولا نصيحة طبية/نفسية/قانونية. لا وعود.\n"
        "3) قدّمي دائمًا خطوة صغيرة عملية ومحددة (<= جملة واحدة).\n"
        "4) عند مؤشرات الأزمة، الأولوية للسلامة وذكر خطوط المساندة في الإمارات.\n"
        "5) مراعاة الثقافة: «حبة حبة»، بدون لوم.\n"
        "المخرجات JSON بالمفاتيح: reply, micro_action, helplines (اختياري)."
    )

def user_prompt(text: str, scores: Dict[str, float], locale: str, i18n: dict) -> str:
    payload = {
        "user_text": text or "",
        "locale": locale,
        "emotion_scores": scores,
        "templates_hint": {
            "reframes": i18n.get("reframes", [])[:5],
            "micro_actions": i18n.get("micro_actions", [])[:5]
        },
        "requirements": {
            "json_schema": {"reply": "string", "micro_action": "string", "helplines": "optional list"},
            "length_limits": {"reply_max_chars": 320, "micro_action_max_chars": 120}
        }
    }
    return json.dumps(payload, ensure_ascii=False)

def llm_json_reply(system: str, user: str) -> Dict[str, Any]:
    resp = client.responses.create(
        model=MODEL,
        input=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
            {"role": "user", "content": "Return JSON only with keys: reply, micro_action, helplines (optional)."}
        ],
        timeout=TIMEOUT_S,
    )
    text = resp.output_text
    try:
        data = json.loads(text)
        if "reply" in data and "micro_action" in data:
            return data
    except Exception:
        pass
    return {"reply": text.strip(), "micro_action": "Take 5 rounds of 4-4-6 breathing."}

# --- public API --------------------------------------------------------------
def respond(text: str, context: Dict[str, Any] | None = None) -> Dict[str, Any]:
    ctx = context or {}
    # default Arabic (Emirati)
    locale: str = (ctx.get("locale") or "ar-AE").lower()
    i18n = load_i18n(locale)
    helplines = i18n.get("helplines_uae", [])

    scores = emotion_scores(text or "")

    # Safety first: never send crisis content to the LLM path
    if crisis_signal(text or ""):
        if locale.startswith("en"):
            safety_msg = (
                "Your feelings matter. If things feel overwhelming, please reach out to someone you trust "
                "or contact a professional right away. These numbers in the UAE may help:"
            )
            micro = "Slow your breath 3 times and call a trusted support if needed."
        else:
            safety_msg = (
                "كلامك مهم وخاطرك غالي علينا. لو الخاطر ثقيل جدًا، كلم شخص تثق فيه "
                "أو تواصل فورًا مع جهة مختصة. هذه أرقام ممكن تفيدك:"
            )
            micro = "خذ نفس بطيء ثلاث مرات واتصل بجهة موثوقة لو احتجت."
        return {"reply": safety_msg, "emotion": scores, "helplines": helplines, "micro_action": micro}

    sys = system_prompt(locale)
    usr = user_prompt(text, scores, locale, i18n)
    out = llm_json_reply(sys, usr)
    out["emotion"] = scores
    return out
