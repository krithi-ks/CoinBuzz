from fastapi import APIRouter
from app.data.mock_data import COINS

router = APIRouter()

WATCHLIST = ["doge", "pepe", "bonk", "wif", "turbo"]

@router.get("/")
def get_watchlist():
    coins = [c for c in COINS if c["id"] in WATCHLIST]
    return {"watchlist": coins}

@router.post("/{coin_id}")
def add_to_watchlist(coin_id: str):
    if coin_id not in WATCHLIST:
        WATCHLIST.append(coin_id)
    return {"message": f"{coin_id} added to watchlist", "watchlist": WATCHLIST}
