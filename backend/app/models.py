from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class CoinBase(BaseModel):
    id: str
    name: str
    symbol: str
    price: float
    price_change_24h: float
    trend_score: float
    sentiment: float
    hype_stage: str
    authenticity_score: float
    robustness_score: float
    market_cap: float
    
    sentiment_timeline: List[float]
    mention_timeline: List[int]
    engagement_timeline: List[float]
    authenticity_timeline: List[float]
    robustness_timeline: List[float]
    
    platform_split: Dict[str, int]
    top_narratives: List[str]
    explanation: str

class AlertBase(BaseModel):
    id: str
    coin: str
    type: str
    severity: str
    message: str
    timestamp: str  # Simplified as string to match mock data
    icon: str

class MetricsOverview(BaseModel):
    coins_tracked: int
    social_mentions_24h: int
    avg_sentiment_score: float
    active_alerts: int
    hype_spikes_detected: int
    prediction_accuracy: float
    manipulation_signals: int
    pre_pump_flags: int
