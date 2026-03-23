from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.database import get_database

router = APIRouter()

class CopilotQuery(BaseModel):
    prompt: str
    mode: str = "trader"  # beginner, trader, research
    coin_context: str = None

@router.post("/query")
async def query_copilot(query: CopilotQuery, db = Depends(get_database)):
    prompt_lower = query.prompt.lower()
    
    # Search in copilot_examples collection
    # Note: simple regex for demonstration; in production use better search
    # We use a placeholder for now since we'll seed this collection
    example = await db.copilot_examples.find_one({"prompt": {"$regex": prompt_lower, "$options": "i"}})
    if example:
        if "_id" in example: del example["_id"]
        # Ensure key_drivers exists
        if "key_drivers" not in example:
            example["key_drivers"] = ["Intelligence Briefing", "Market Context"]
        return {**example, "mode": query.mode}
    
    # Dynamic response based on coin mention in database
    coins_cursor = db.coins.find()
    async for coin in coins_cursor:
        if coin["symbol"].lower() in prompt_lower or coin["name"].lower() in prompt_lower:
            return {
                "answer": f"{coin['symbol']} currently shows a trend score of {coin['trend_score']} with {coin['sentiment']}% sentiment. Hype stage: {coin['hype_stage']}. {coin['explanation']}",
                "confidence": coin["confidence"],
                "label": "Watch Closely" if coin["risk_score"] > 60 else ("Early Opportunity" if coin["opportunity_score"] > 75 else "Wait for Confirmation"),
                "key_drivers": coin["top_narratives"][:3],
                "risk_notes": f"Retail trap risk: {coin['retail_trap_risk']}%. Manipulation flag: {'Active' if coin.get('manipulation_flag') else 'None'}.",
                "mode": query.mode,
            }
    
    return {
        "answer": "CoinBuzz is analyzing your query. Based on current market data, the meme coin landscape shows strong Solana ecosystem momentum with BONK leading authenticity metrics. PEPE shows organic early-buzz.",
        "confidence": 72.5,
        "label": "General Briefing",
        "key_drivers": ["Solana ecosystem growth", "Organic community sentiment", "Pre-pump signals active"],
        "risk_notes": "Overall market mood: cautiously bullish.",
        "mode": query.mode,
    }

@router.get("/briefing")
def get_daily_briefing():
    return {
        "type": "daily",
        "title": "CoinBuzz Daily Intelligence Briefing",
        "date": "2026-03-24",
        "summary": "Today's meme coin market is defined by Solana ecosystem dominance and two diverging signals: organic durability in BONK and PEPE versus retail trap conditions in SHIB and POPCAT.",
        "top_opportunity": {"coin": "BONK", "reason": "High authenticity, durable trend, low retail trap risk", "confidence": 91.3},
        "top_risk": {"coin": "SHIB", "reason": "Manipulation detected, fatigue zone, high retail trap risk", "risk_score": 71.8},
        "hidden_gem": {"coin": "TURBO", "reason": "AI narrative crossover, pre-hype, quiet accumulation", "opportunity_score": 78.3},
        "market_mood": "Cautiously Bullish",
        "key_themes": ["Solana meme season", "AI crossover narratives", "Base chain emergence", "Retail trap conditions in legacy coins"],
    }
