from fastapi import APIRouter
from app.data.mock_data import NARRATIVES

router = APIRouter()

@router.get("/")
def get_narratives():
    return {"narratives": NARRATIVES}
