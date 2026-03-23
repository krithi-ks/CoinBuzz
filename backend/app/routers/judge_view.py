from fastapi import APIRouter, Depends
from app.database import get_database

router = APIRouter()

@router.get("/")
async def get_judge_view(db = Depends(get_database)):
    judge_view = await db.judge_view.find_one({})
    if judge_view and "_id" in judge_view:
        del judge_view["_id"]
    return judge_view or {}
