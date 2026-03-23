from fastapi import APIRouter
from app.data.mock_data import COPILOT_EXAMPLES, COINS

router = APIRouter()

@router.get("/")
def get_insights():
    return {
        "daily_briefing": "Today's meme coin market is showing strong Solana ecosystem momentum. BONK leads with high authenticity. PEPE shows organic early-buzz characteristics. SHIB manipulation signals require caution. TURBO presents a quiet pre-pump opportunity.",
        "top_opportunity": "BONK — Durable, organic, high confidence",
        "top_risk": "SHIB — Manipulation signals, retail trap risk 74%",
        "hidden_gem": "TURBO — Pre-hype, AI narrative crossover, under-noticed",
        "market_mood": "Cautiously Bullish",
        "examples": COPILOT_EXAMPLES,
    }
