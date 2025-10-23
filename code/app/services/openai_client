# -*- coding: utf-8 -*-
from openai import OpenAI
import os

_api_key = os.getenv("OPENAI_API_KEY")
if not _api_key:
    raise RuntimeError("OPENAI_API_KEY is not set")

client = OpenAI(api_key=_api_key)

MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")  # try "gpt-4.1" if you want higher quality
TIMEOUT_S = int(os.getenv("OPENAI_RESP_TIMEOUT_S", "30"))
