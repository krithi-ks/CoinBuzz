import asyncio
import random
from datetime import datetime
from app.database import get_database
from app.services.intelligence import IntelligenceEngine

class DataPumper:
    def __init__(self, db):
        self.db = db
        self.engine = IntelligenceEngine()

    async def pump_all_coins(self):
        """
        Simulates a real-time data fetch and runs metrics through the intelligence engines.
        In the future, this will call Birdeye/Moralis API.
        """
        print(f"[{datetime.now().isoformat()}] Starting Data Pump...")
        
        # Get all coins from DB
        coins_cursor = self.db.coins.find({})
        coins = await coins_cursor.to_list(length=100)
        
        for coin in coins:
            # 1. Simulate new "Raw" data
            new_mentions = coin.get("social_mentions_24h", 1000) + random.randint(-50, 200)
            # Allow for lower ratio (bot activity) occasionally
            if random.random() < 0.2:
                new_unique_users = int(new_mentions * random.uniform(0.05, 0.3))
            else:
                new_unique_users = int(new_mentions * random.uniform(0.4, 0.8))
            velocity_change = random.uniform(-5.0, 10.0)
            
            # 2. Run through Intelligence Engines
            auth_score = self.engine.calculate_authenticity(new_mentions, new_unique_users)
            robust_score = self.engine.calculate_robustness(["X", "Reddit", "Telegram", "Discord"][:random.randint(2, 4)])
            decay_score = self.engine.calculate_decay(velocity_change)
            
            # Dynamic Trend Score
            trend_score = min(100.0, (auth_score * 0.4) + (robust_score * 0.3) + (random.uniform(20, 30)))
            
            # 3. Update the Database (Coins)
            await self.db.coins.update_one(
                {"id": coin["id"]},
                {
                    "$set": {
                        "social_mentions_24h": new_mentions,
                        "authenticity_score": auth_score,
                        "robustness_score": robust_score,
                        "decay_score": decay_score,
                        "trend_score": trend_score,
                        "hype_stage": self.engine.get_hype_stage(trend_score, decay_score),
                        "last_updated": datetime.now().isoformat()
                    }
                }
            )

            # 4. Update Forensics Collection
            flags = self.engine.get_manipulation_flags(auth_score)
            verdict = self.engine.get_forensic_verdict(auth_score, robust_score)
            
            await self.db.forensics.update_one(
                {"id": coin["id"]},
                {
                    "$set": {
                        "manipulation_signals": flags,
                        "forensic_verdict": verdict,
                        "concentration_index": random.uniform(20.0, 60.0),
                        "last_updated": datetime.now().isoformat()
                    }
                },
                upsert=True
            )
            
        # Update Global Metrics
        await self.db.metrics.update_one(
            {},
            {"$inc": {"social_mentions_24h": random.randint(100, 500)}},
            upsert=True
        )
        
        print(f"[{datetime.now().isoformat()}] Data Pump Complete!")

async def start_periodic_pumper():
    """Background task for periodic updates"""
    from app.database import db_client # Import here to avoid circular dependency
    db = db_client["coinbuzz"]
    pumper = DataPumper(db)
    
    while True:
        await pumper.pump_all_coins()
        await asyncio.sleep(600) # Pump every 10 minutes
