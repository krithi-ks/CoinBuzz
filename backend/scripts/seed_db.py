import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
import sys

# Add the project root to sys.path to allow imports from app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.data.mock_data import COINS, ALERTS, METRICS_OVERVIEW, NARRATIVES, JUDGE_VIEW

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = "coinbuzz"

async def seed():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    print(f"Connecting to MongoDB at {MONGODB_URL}...")
    try:
        await client.admin.command('ping')
        print("Connected successfully!")
    except Exception as e:
        print(f"Connection failed: {e}")
        return

    print("Seeding coins...")
    await db.coins.delete_many({})
    if COINS:
        await db.coins.insert_many(COINS)
    
    print("Seeding alerts...")
    await db.alerts.delete_many({})
    if ALERTS:
        await db.alerts.insert_many(ALERTS)
    
    print("Seeding metrics...")
    await db.metrics.delete_many({})
    if METRICS_OVERVIEW:
        await db.metrics.insert_one(METRICS_OVERVIEW)
    
    print("Seeding narratives...")
    await db.narratives.delete_many({})
    if NARRATIVES:
        await db.narratives.insert_many(NARRATIVES)
    
    print("Seeding judge_view...")
    await db.judge_view.delete_many({})
    if JUDGE_VIEW:
        await db.judge_view.insert_one(JUDGE_VIEW)
    
    print("Seeding copilot_examples...")
    from app.data.mock_data import COPILOT_EXAMPLES
    await db.copilot_examples.delete_many({})
    if COPILOT_EXAMPLES:
        await db.copilot_examples.insert_many(COPILOT_EXAMPLES)
    
    print("Seeding complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed())
