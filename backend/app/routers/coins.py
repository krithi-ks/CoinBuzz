from fastapi import APIRouter, Depends, HTTPException
from app.database import get_database

router = APIRouter()

@router.get("/")
async def get_items(db = Depends(get_database)):
    coins_cursor = db.coins.find({})
    coins = await coins_cursor.to_list(length=100)
    for coin in coins:
        if "_id" in coin: del coin["_id"]
    return coins

@router.post("/pump")
async def pump_data(db = Depends(get_database)):
    """Manual trigger to run the intelligence engines on all coins"""
    from app.services.data_pumper import DataPumper
    pumper = DataPumper(db)
    await pumper.pump_all_coins()
    return {"status": "success", "message": "Intelligence engines processed all coins."}

@router.get("/{coin_id}")
async def get_coin(coin_id: str, db = Depends(get_database)):
    coin = await db.coins.find_one({"id": coin_id.lower()})
    if not coin:
        raise HTTPException(status_code=404, detail="Coin not found")
    if "_id" in coin:
        del coin["_id"]
    return coin
