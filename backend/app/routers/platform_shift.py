from fastapi import APIRouter
from app.data.mock_data import COINS

router = APIRouter()

@router.get("/")
def get_platform_shift():
    shifts = []
    for coin in COINS[:5]:
        ps = coin["platform_split"]
        dominant = max(ps, key=ps.get)
        shifts.append({
            "coin": coin["symbol"],
            "platform_split": ps,
            "dominant_platform": dominant,
            "shift_detected": coin["trend_score"] > 80,
            "shift_direction": f"X/Twitter → Reddit" if ps.get("reddit", 0) > 30 else "Concentrated on X/Twitter",
            "momentum_score": coin["engagement_score"],
        })
    return {"platform_shifts": shifts}
