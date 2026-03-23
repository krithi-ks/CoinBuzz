from fastapi import APIRouter, Depends
from app.database import get_database

router = APIRouter()

@router.get("/")
async def get_alerts(severity: str = None, db = Depends(get_database)):
    query = {"severity": severity} if severity else {}
    alerts = await db.alerts.find(query).to_list(length=100)
    for a in alerts:
        if "_id" in a:
            del a["_id"]
    return {"alerts": alerts}
