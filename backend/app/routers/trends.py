from fastapi import APIRouter, Depends
from app.database import get_database

router = APIRouter()

@router.get("/")
async def get_trends(db = Depends(get_database)):
    coins = await db.coins.find().to_list(length=100)
    for c in coins:
        if "_id" in c:
            del c["_id"]
    
    sorted_coins = sorted(coins, key=lambda x: x["trend_score"], reverse=True)
    return {
        "top_trends": sorted_coins[:5],
        "trending_up": [c for c in coins if c.get("predicted_direction") == "Upward"],
        "pre_pump": [c for c in coins if c.get("pre_pump_signal")],
        "manipulation_flags": [c for c in coins if c.get("manipulation_flag")],
    }
