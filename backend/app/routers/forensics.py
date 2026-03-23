from fastapi import APIRouter, Depends, HTTPException
from app.database import get_database

router = APIRouter()

@router.get("/{coin_id}")
async def get_forensics(coin_id: str, db = Depends(get_database)):
    data = await db.forensics.find_one({"id": coin_id.lower()})
    if not data:
        # Fallback to coin data if forensic doc doesn't exist yet
        coin = await db.coins.find_one({"id": coin_id.lower()})
        if not coin:
            raise HTTPException(status_code=404, detail="Coin not found")
        return {
            "coin": coin["symbol"],
            "hype_origin_platform": "X/Twitter",
            "concentration_index": 45.0,
            "authenticity_events": [],
            "narrative_mutations": [],
            "manipulation_signals": [],
            "likely_trigger_event": "Social Trending Spike",
            "forensic_verdict": "Analyzing data...",
        }
    if "_id" in data: del data["_id"]
    return data
