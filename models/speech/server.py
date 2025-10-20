# -*- coding: utf-8 -*-
import os
import tempfile
from flask import Flask, request, jsonify, send_from_directory
from openai import OpenAI

# Initialize OpenAI client (reads the key from environment variable)
client = OpenAI()

# Verify API key
if not os.getenv("OPENAI_API_KEY"):
    raise RuntimeError("❌ Please set your OPENAI_API_KEY environment variable.")

# Create Flask app
app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    # serve the frontend file
    return send_from_directory('.', 'frontend.html')

@app.route('/transcribe', methods=['POST'])
def transcribe_and_reply():
    # check if file was uploaded
    if 'file' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['file']

    # save audio temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        audio_file.save(tmp.name)
        temp_path = tmp.name

    try:
        # 1️⃣ Transcribe Arabic audio to text
        with open(temp_path, "rb") as f:
            transcription_response = client.audio.transcriptions.create(
                model="whisper-1",
                file=f,
                language="ar"
            )

        transcription = transcription_response.text

        # 2️⃣ Send transcription to ChatGPT for a response
        chat_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "أنت مساعد مفيد. جاوب باللهجة الإماراتية."},
                {"role": "user", "content": transcription}
            ],
            max_tokens=300
        )

        reply = chat_response.choices[0].message.content.strip()

        return jsonify({
            "transcription": transcription,
            "reply": reply
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        # clean up temp file
        try:
            os.remove(temp_path)
        except:
            pass

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
