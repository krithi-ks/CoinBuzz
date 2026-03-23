# CoinBuzz: AI-Powered Crypto Trend Intelligence Platform

CoinBuzz is a high-performance full-stack intelligence platform designed to analyze, score, and forecast crypto hype cycles before they go viral. It combines proprietary social scrapers with advanced AI logic to distinguish between organic community growth and coordinated bot manipulation.

## 🚀 The 16 Innovation Engines
The heart of CoinBuzz lies in its 16 proprietary "Innovation Engines," which work together to create a 360-degree intelligence profile for every coin:
1.  **Authenticity Engine**: Distinguishes between bots and humans.
2.  **Robustness Score**: Measures trend stability across multiple platforms.
3.  **Decay Predictor**: Forecasts social interest cooling.
4.  **Signal-to-Noise Engine**: Filters out hype "noise."
5.  **Contradiction Detector**: Identifies misaligned sentiment vs. price.
6.  **Causality Mapping**: Links specific social events to price pumps.
... and 10 more advanced engines.

## 🛠️ Project Architecture
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Recharts.
- **Backend**: FastAPI (Python 3.10+), Motor (Async MongoDB).
- **Database**: MongoDB (Local or Atlas).
- **AI/ML**: Hugging Face (Sentiment Models), Custom Intelligence Logic.

## 🏃 Getting Started

### 1. Prerequisites
- **Node.js**: v18+
- **Python**: v3.10+
- **MongoDB**: Community Server (Running on localhost:27017 or remote Atlas URL).

### 2. Backend Setup
1.  `cd backend`
2.  `python -m venv venv`
3.  `source venv/bin/activate` (or `.\venv\Scripts\activate` on Windows)
4.  `pip install -r requirements.txt`
5.  `cp .env.template .env` (Add your API keys).
6.  `python main.py` or `uvicorn main:app --reload`

### 3. Frontend Setup
1.  `cd frontend`
2.  `npm install`
3.  `npm run dev`

### 4. Database Seeding
To populate your MongoDB with initial intelligence data:
1.  `python scripts/seed_db.py`

## ⚙️ How it Works (The Intelligence Cycle)
1.  **Ingestion**: Scrapers fetch raw social data from X (Twitter) and Reddit.
2.  **Analysis**: Text is processed through Hugging Face sentiment models.
3.  **Processing**: The 16 engines calculate Intelligence Scores and Forensic Verdicts.
4.  **Display**: The Dashboard and Forensics tabs render the final signals in real-time.

## 🛡️ License
Copyright (c) 2026 CoinBuzz Intelligence Team. Proprietary Software.
