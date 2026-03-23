from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class SimulationRequest(BaseModel):
    coin_id: str
    reduce_positive_sentiment: Optional[float] = 0
    remove_influencer_posts: Optional[bool] = False
    increase_spam_ratio: Optional[float] = 0
    shift_platform: Optional[str] = None
    reduce_unique_users: Optional[float] = 0
    increase_concentration: Optional[float] = 0

@router.post("/run")
def run_simulation(req: SimulationRequest):
    from app.data.mock_data import COINS
    coin = next((c for c in COINS if c["id"] == req.coin_id.lower()), None)
    if not coin:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Coin not found")
    
    base_trend = coin["trend_score"]
    base_auth = coin["authenticity_score"]
    base_robust = coin["robustness_score"]
    base_stage = coin["hype_stage"]
    base_risk = coin["risk_label"]
    base_opportunity = coin["opportunity_score"]

    delta_trend = 0
    delta_auth = 0
    delta_robust = 0
    changes = []

    if req.reduce_positive_sentiment > 0:
        delta_trend -= req.reduce_positive_sentiment * 0.6
        delta_auth -= req.reduce_positive_sentiment * 0.3
        changes.append(f"Positive sentiment reduced by {req.reduce_positive_sentiment}% → Trend and authenticity dropped")

    if req.remove_influencer_posts:
        delta_trend -= 18.5
        delta_auth += 8.2
        delta_robust += 5.1
        changes.append("Influencer posts removed → Trend score drops significantly but authenticity improves as organic signal is cleaner")

    if req.increase_spam_ratio > 0:
        delta_auth -= req.increase_spam_ratio * 0.8
        delta_robust -= req.increase_spam_ratio * 0.5
        changes.append(f"Spam ratio increased by {req.increase_spam_ratio}% → Authenticity and robustness degraded")

    if req.reduce_unique_users > 0:
        delta_trend -= req.reduce_unique_users * 0.4
        delta_robust -= req.reduce_unique_users * 0.6
        changes.append(f"Unique users reduced by {req.reduce_unique_users}% → Trend fragility increases")

    if req.increase_concentration > 0:
        delta_auth -= req.increase_concentration * 0.5
        delta_robust -= req.increase_concentration * 0.4
        changes.append(f"Concentration increased by {req.increase_concentration}% → Hype becomes more fragile and manipulation-like")

    new_trend = max(0, min(100, base_trend + delta_trend))
    new_auth = max(0, min(100, base_auth + delta_auth))
    new_robust = max(0, min(100, base_robust + delta_robust))
    
    if new_trend < 40:
        new_stage = "Cooling Phase"
        new_risk = "Fragile"
        new_opportunity = max(0, base_opportunity - 30)
    elif new_trend < 60:
        new_stage = "Fatigue Zone"
        new_risk = "Speculative"
        new_opportunity = max(0, base_opportunity - 15)
    else:
        new_stage = base_stage
        new_risk = base_risk
        new_opportunity = max(0, base_opportunity + delta_trend * 0.3)

    return {
        "coin": coin["symbol"],
        "original": {
            "trend_score": base_trend,
            "authenticity_score": base_auth,
            "robustness_score": base_robust,
            "hype_stage": base_stage,
            "risk_label": base_risk,
            "opportunity_score": base_opportunity,
        },
        "simulated": {
            "trend_score": round(new_trend, 1),
            "authenticity_score": round(new_auth, 1),
            "robustness_score": round(new_robust, 1),
            "hype_stage": new_stage,
            "risk_label": new_risk,
            "opportunity_score": round(new_opportunity, 1),
        },
        "changes_applied": changes,
        "summary": f"Under these conditions, {coin['symbol']} trend score shifts from {base_trend} to {round(new_trend,1)}, with authenticity {'improving' if new_auth > base_auth else 'declining'} and robustness {'strengthening' if new_robust > base_robust else 'weakening'}.",
    }
