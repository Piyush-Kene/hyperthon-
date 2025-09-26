Freelancer Proposal Generator (Next.js + MERN)

Generate tailored project proposals from a job description instantly. Next.js app with an API route and Tailwind UI. Uses Google Gemini if configured; otherwise uses a high-quality template fallback. Optional MongoDB hook for saving submissions.

## Features
- Next.js 14 (App Router) with TypeScript
- Tailwind CSS styling
- API at `POST /api/generate`
- Google Gemini support via `GEMINI_API_KEY` (optional)
- Template fallback when no key is present

## Run locally (Windows PowerShell)

```powershell
cd "C:\Users\HP\Desktop\my Projects\Freelancer docs"
npm install
$env:GEMINI_API_KEY="your-key"   # optional
npm run dev
```

Open `http://localhost:3000`.

## API
- `POST /api/generate`
  - body: `{ name, title, skills[], portfolioLinks[], callToAction, style, jobDescription }`
  - response: `{ proposal, usedLLM }`

## Env
- `GEMINI_API_KEY` (optional)
- `MONGODB_URI` (optional, reserved for future persistence)
Freelancer Proposal Generator

Generate tailored project proposals from a job description instantly.

## Features
- Streamlit UI for quick drafts
- CLI for automation
- Uses OpenAI (if `OPENAI_API_KEY` set) with a high-quality offline template fallback
- Injects freelancer profile, portfolio highlights, and concise plan

## Quickstart

```bash
# Create and activate venv (Windows PowerShell)
python -m venv .venv
. .venv/Scripts/Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run Streamlit app
streamlit run app.py

# Or use CLI
python -m proposal_gen.cli --job "<paste job description>" --name "Your Name" --skills "Python, LLMs" --portfolio "link1, link2"
```

## Environment
- Set `OPENAI_API_KEY` to enable LLM generation.

## Packaging notes
This is a simple script-style project to keep things easy to run.

