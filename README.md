# 🌸 Safina  
### *A Culturally Rooted AI Companion for Youth Mental Well-Being & Job-Seeking Resilience*

> “Safina” (سفينة) means **“ship”** in Arabic — a vessel that carries you through uncertainty with grace, direction, and care.

Built for Emirati and GCC youth, especially women in underserved UAE communitiees, navigating the emotional seas of career transitions, Safina offers **anonymous, voice-first, non-clinical support** that speaks your dialect, honors your values, and helps you grow — without judgment.

🏆 **Submitted to**: startAD AI for Good – MindForward Challenge (Abdullah Al Ghurair Foundation)  
🌍 **Region**: UAE & KSA  
🔐 **Privacy-first**: Zero personal data collection. 100% Arabic interface (Gulf dialect + MSA)

---

## 📜 Licensing Terms

This project is licensed under the **MIT License** for all code, models, and technical assets.

> For non-code content (documentation, design assets, personas, use cases, workshop materials), this project uses the **Creative Commons Attribution 4.0 International (CC BY 4.0)** license.

You are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

See full license details:
- [MIT License](https://choosealicense.com/licenses/mit/)
- [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)

---

## 👥 Contributors & Ownership

This project was created by the following team members as part of the startAD AI for Good competition:

- **[Mariam Alamoodi]** — API Integration, LLM & Voice AI (Arabic dialect processing, emotional inference), Back end Development
- **[Fotoun Shaqra]** — User Interface Design, Dataset Sourcing & Curation, AI/ML Development
- **[Ali Kattan]** — Business Strategy, Go-to-Market Roadmap, Sustainable Monetization, GCC Cultural-Economic Alignment
- **[Mazen Tahhan]** — Front end Development, Core Feature Ideation

*All team members contributed equally to ideation, user interviews, and solution design.*

> Special thanks to startAD, Abdullah Al Ghurair Foundation, and Google.org for supporting this initiative.

---

## 🔧 Reuse & Replication

We designed Safina to be **accessible, replicable, and extendable** for future teams, researchers, or NGOs working on youth mental well-being in the GCC.

### How to Set Up & Run (MVP Prototype)

## 🧩 Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js 18+](https://nodejs.org/)
- [Python 3.11+](https://www.python.org/)
- [OpenAI API Key](https://platform.openai.com/account/api-keys)

---

## 🚀 1. Backend Setup (FastAPI)

### Step 1 – Move to backend directory
```bash
cd code/backend
````

### Step 2 – Create and edit environment file

```bash
cp .env.example .env
```

Open `.env` in your editor and fill in your OpenAI credentials:

```env
OPENAI_API_KEY=sk-your-api-key
OPENAI_MODEL=gpt-4.1-mini
JWT_SECRET=choose_a_secure_secret
```

You can keep default values for PostgreSQL, Redis, and MinIO unless you are deploying remotely.

---

### Step 3 – Run backend services

```bash
docker compose up -d --build
```

This will start:

* FastAPI backend → [http://localhost:8000](http://localhost:8000)
* PostgreSQL → port 5432
* Redis → port 6379
* MinIO (object storage) → [http://localhost:9001](http://localhost:9001)
> (Local-only S3-compatible storage for development. Default credentials are set in `docker-compose.yml` and used only on your machine.  
  When deploying publicly, update `S3_ACCESS_KEY` and `S3_SECRET_KEY` in your `.env` with secure unique values.)

---

### Step 4 – Initialize the database

```bash
docker exec -it $(docker ps -qf name=db) \
  psql -U safina -d safina -f /srv/schema.sql
```

---

## 🎨 2. Frontend Setup

### Step 1 – Move to frontend directory

```bash
cd ../frontend
```

### Step 2 – Install dependencies

```bash
npm install
```

### Step 3 – Run development server

```bash
npm run dev
```

Frontend will run at:
👉 [http://localhost:3000](http://localhost:3000)
Make sure it connects to the backend (`http://localhost:8000`).

---

## ☁️ 3. Deployment Options

### 🅰️ Deploy on Render

1. Push your repository to GitHub.
2. Create a **PostgreSQL** service on Render.
3. Create a **Web Service** using Docker → point it to `code/backend/Dockerfile`.
4. Add your `.env` variables (OpenAI key, JWT secret, etc.).
5. Deploy the **frontend** as a static site or as a separate service.

### 🅱️ Deploy on Fly.io

1. Install Fly CLI:

```bash
brew install flyctl
```

2. Launch your backend app:

```bash
cd code/backend
flyctl launch
```

3. Add secrets:

```bash
flyctl secrets set OPENAI_API_KEY=sk-your-key JWT_SECRET=supersecret
```

4. Deploy:

```bash
flyctl deploy
```

5. Access your API at `https://safina.fly.dev`

### 🅲️ Manual VPS Deployment

1. SSH into your server.
2. Clone the repository.
3. Install Docker and Docker Compose.
4. Copy `.env` and set your secrets.
5. Run:

```bash
docker compose up -d --build
```

6. Enable HTTPS using **Caddy** or **Nginx**.

---

## 🔒 4. Security Notes

* Anonymous by design — no personal data collected.
* Always run over **HTTPS** in production.
* Keep your **OpenAI API key** and **JWT secret** private.
* Back up your PostgreSQL data regularly.
* Rotate your keys and secrets periodically.

---

## ✅ Quick Recap

```bash
# backend
cd code/backend
cp .env.example .env
docker compose up -d --build
docker exec -it $(docker ps -qf name=db) psql -U safina -d safina -f /srv/schema.sql

# frontend
cd ../frontend
npm install
npm run dev
```

Then open:

* **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **Frontend App:** [http://localhost:3000](http://localhost:3000)

---

## 🎯 Problem We Solve

Young women in the GCC face unique challenges:
- **Stigma** around expressing stress or doubt  
- **Emotional suppression** to avoid burdening families  
- **Gendered expectations** that limit career exploration (“Why not become a teacher?”)  
- **Lack of Arabic-first digital tools** that understand their cultural reality  
- **Isolation** during job searches or academic pressure  

Existing mental wellness apps are often **English-dominant, Western-framed, and feel impersonal**.

**Safina bridges this gap** with AI that speaks their **language, honors their values, and protects their privacy**.

---

## 🌟 Key Features (All in Arabic)
- **Voice Journaling** in Emirati/Gulf dialect — no typing needed  
- **Visual Journey Map**: Watch resilience grow as a flower or wave  
- **Hikaya Hub**: Animated stories from young Gulf women who’ve been there  
- **Resilience Pathway**: Track job applications + emotional milestones  
- **Localized Opportunity Radar**: Women-friendly internships, workshops, mentorship  

> The app icon, notifications, and interface are designed to be **discreet and culturally familiar** — so users can engage safely, even in shared households.
