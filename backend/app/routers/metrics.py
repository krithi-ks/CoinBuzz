from fastapi import APIRouter, Depends
from app.database import get_database

router = APIRouter()

@router.get("/overview")
async def get_metrics_overview(db = Depends(get_database)):
    metrics = await db.metrics.find_one({})
    if metrics and "_id" in metrics:
        del metrics["_id"]
    return metrics or {}
