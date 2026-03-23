from fastapi import APIRouter
from app.data.mock_data import COINS

router = APIRouter()

@router.get("/")
def get_predictions():
    predictions = []
    for coin in COINS:
        predictions.append({
            "coin": coin["symbol"],
            "predicted_direction": coin["predicted_direction"],
            "confidence": coin["confidence"],
            "hype_stage": coin["hype_stage"],
            "decay_forecast_score": coin["decay_forecast"],
            "opportunity_score": coin["opportunity_score"],
            "risk_score": coin["risk_score"],
            "pre_pump_signal": coin.get("pre_pump_signal", False),
        })
    return {"predictions": predictions}
