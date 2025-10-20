import os
import tempfile
from flask import Flask, request, jsonify, send_from_directory
import openai

# Load OpenAI API key from environment variable
openai.api_key = os.getenv("OPEN_AI_KEY")
if not openai.api_key:
    raise RuntimeError("❌ Please set your OPENAI_API_KEY environment variable.")

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'frontend.html')

@app.route('/transcribe', methods=['POST'])
def transcribe_and_reply():
    if 'file' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['file']
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        audio_file.save(tmp.name)
        temp_path = tmp.name

    try:
        # 1️⃣ Transcribe audio to Arabic text
        with open(temp_path, "rb") as f:
            transcription_response = openai.Audio.transcriptions.create(
                model="whisper-1",
                file=f,
                language="ar"
            )
        transcription = transcription_response.get("text") or str(transcription_response)

        # 2️⃣ Send text to ChatGPT for response
        chat_response = openai.Chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": " أنت مساعد مفيد. جاوب بالعربية الاماراتيه."},
                {"role": "user", "content": transcription}
            ],
            max_tokens=300
        )

        reply = chat_response.choices[0].message.content.strip()

        return jsonify({"transcription": transcription, "reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        try:
            os.remove(temp_path)
        except:
            pass

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
