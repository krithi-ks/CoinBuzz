from fastapi import FastAPI
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from app.routers import coins, metrics, trends, alerts, watchlist, insights, forensics, simulation, copilot, narratives, platform_shift, predictions, judge_view
from app.database import client

app = FastAPI(title="CoinBuzz API", version="1.0.0", description="AI-Powered Crypto Trend Intelligence Platform")

@app.on_event("startup")
async def startup_db_client():
    try:
        # Check if MongoDB is reachable
        await client.admin.command('ping')
        print("Connected to MongoDB")
        
        # Start periodic data pumper in background
        from app.services.data_pumper import start_periodic_pumper
        asyncio.create_task(start_periodic_pumper())
        print("Background data pumper started.")
        
    except Exception as e:
        print(f"Could not connect to MongoDB: {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(coins.router, prefix="/coins", tags=["Coins"])
app.include_router(metrics.router, prefix="/metrics", tags=["Metrics"])
app.include_router(trends.router, prefix="/trends", tags=["Trends"])
app.include_router(alerts.router, prefix="/alerts", tags=["Alerts"])
app.include_router(watchlist.router, prefix="/watchlist", tags=["Watchlist"])
app.include_router(insights.router, prefix="/insights", tags=["Insights"])
app.include_router(forensics.router, prefix="/forensics", tags=["Forensics"])
app.include_router(simulation.router, prefix="/simulation", tags=["Simulation"])
app.include_router(copilot.router, prefix="/copilot", tags=["Copilot"])
app.include_router(narratives.router, prefix="/narratives", tags=["Narratives"])
app.include_router(platform_shift.router, prefix="/platform-shift", tags=["Platform Shift"])
app.include_router(predictions.router, prefix="/predictions", tags=["Predictions"])
app.include_router(judge_view.router, prefix="/judge-view", tags=["Judge View"])

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "CoinBuzz API", "version": "1.0.0"}
