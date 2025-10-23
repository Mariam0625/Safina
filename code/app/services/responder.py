# -*- coding: utf-8 -*-
# Emirati-dialect, culture-aware response composer backed by OpenAI LLM.
# Safety: crisis-first gate; never medical/clinical claims; provide UAE helplines when needed.

from typing import Dict, Any
import json, pathlib, random
from .nlp import emotion_scores, crisis_signal
from .openai_client import client, MODEL, TIMEOUT_S

_I18N = json.loads(
    pathlib.Path(__file__).resolve().parents[1]
    .joinpath("i18n","ar-AE.emirati.json").read_text(encoding="utf-8")
)
REFRAMES = _I18N.get("reframes", [])
MICRO_ACTIONS = _I18N.get("micro_actions", [])
HELPLINES = _I18N.get("helplines_uae", [])

def _pick(xs, default=""):
    return random.choice(xs) if xs else default

def _system_prompt() -> str:
    # System prompt in Arabic with clear constraints & cultural fit
    return (
        "أنتِ «سفينة»، رفيقة رقمية لطيفة تتكلم باللهجة الإماراتية.\n"
        "المبادئ:\n"
        "1) التعاطف أولًا وباختصار؛ أسلوب دافئ وغير رسمي (عامي إماراتي).\n"
        "2) لا تشخيص ولا نصيحة طبية/نفسية/قانونية. لا وعود. لا تكلّف المستخدم فوق طاقته.\n"
        "3) قدّمي دائمًا «خطوة صغيرة» عملية ومحددة (<= جملة واحدة).\n"
        "4) لو ظهرت مؤشرات أزمة، الأولوية للسلامة وتقديم أرقام المساندة المحلية (الإمارات).\n"
        "5) احترمي الثقافة: حساسية للحياء، تجنّب اللوم، التشجيع على الرفق بالنفس، و«حبة حبة».\n"
        "المخرجات يجب أن تكون JSON سليم بالمفاتيح: reply (نص)، micro_action (نص)، helplines (قائمة اختيارية).\n"
        "اللغة: لهجة إماراتية طبيعية مع إيموجي خفيفة عند اللزوم."
    )

def _user_prompt(text: str, scores: Dict[str, float], context: Dict[str, Any]) -> str:
    # We provide minimal context for determinism; the model crafts the reply and micro action
    payload = {
        "user_text": text or "",
        "screen": context.get("screen", "checkin"),
        "emotion_scores": scores,
        "cultural_notes": {
            "tone": "Emirati dialect, kind, shame-aware, short sentences",
            "templates_hint": {
                "reframes": REFRAMES[:5],
                "micro_actions": MICRO_ACTIONS[:5]
            }
        },
        "requirements": {
            "json_schema": {"reply": "string", "micro_action": "string", "helplines": "optional list"},
            "length_limits": {"reply_max_chars": 320, "micro_action_max_chars": 120}
        }
    }
    return json.dumps(payload, ensure_ascii=False)

def _llm_json_reply(system: str, user: str) -> Dict[str, Any]:
    """
    Calls OpenAI Responses API and enforces JSON output.
    Docs: https://cookbook.openai.com/examples/responses_api/responses_example
    """
    resp = client.responses.create(
        model=MODEL,
        input=[
            {"role":"system","content":system},
            {"role":"user","content":user},
            {"role":"user","content":"أعيدي الإخراج بصيغة JSON فقط بالمفاتيح: reply, micro_action, helplines إن وُجدت."}
        ],
        timeout=TIMEOUT_S,
    )
    # Unified Responses API helper to get text:
    text = resp.output_text  # SDK flattens outputs to text
    try:
        data = json.loads(text)
        if "reply" in data and "micro_action" in data:
            return data
    except Exception:
        pass
    # Fallback: wrap raw text
    return {"reply": text.strip(), "micro_action": _pick(MICRO_ACTIONS, "خذ نفس عميق 4-4-6 لخمس مرات.")}

def respond(text: str, context: Dict[str, Any] | None = None) -> Dict[str, Any]:
    scores = emotion_scores(text or "")

    # Crisis gate first: never ask LLM to improvise here
    if crisis_signal(text or ""):
        safety_msg = (
            "كلامك مهم وخاطرك غالي علينا. لو الخاطر ثقيل جدًا، كلم شخص تثق فيه "
            "أو تواصل فورًا مع جهة مختصة. هذه أرقام ممكن تفيدك:"
        )
        return {
            "reply": safety_msg,
            "emotion": scores,
            "helplines": HELPLINES,
            "micro_action": "خذ نفس بطيء ثلاث مرات واتصل بجهة موثوقة لو احتجت."
        }

    system = _system_prompt()
    user = _user_prompt(text, scores, context or {})
    out = _llm_json_reply(system, user)

    # Attach scores for UI use (petals, etc.)
    out["emotion"] = scores
    # If LLM forgot helplines in non-crisis cases, we simply omit them.
    return out
