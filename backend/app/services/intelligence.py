import random

class IntelligenceEngine:
    @staticmethod
    def calculate_authenticity(mentions: int, unique_users: int) -> float:
        """
        Engine 1: Hype Authenticity Engine
        Measures if hype is organic (high unique users) or bot-driven (low unique users).
        """
        if mentions == 0: return 100.0
        ratio = unique_users / mentions
        # Ideal ratio is > 0.5 for organic trends
        score = min(100.0, ratio * 180) 
        return round(score, 1)

    @staticmethod
    def calculate_robustness(platforms: list) -> float:
        """
        Engine 10: Hype Robustness Score
        Measures how easily the hype could collapse based on platform diversity.
        """
        num_platforms = len(platforms)
        # 1 platform = fragile (25), 4+ platforms = robust (100)
        score = min(100.0, num_platforms * 25)
        return float(score)

    @staticmethod
    def calculate_decay(velocity_change: float) -> float:
        """
        Engine 13: Social Decay Predictor
        Forecasts how fast interest is fading.
        """
        # If velocity is dropping (negative velocity_change), decay is higher
        if velocity_change >= 0: return 0.0
        decay = min(100.0, abs(velocity_change) * 5)
        return round(decay, 1)

    @staticmethod
    def get_hype_stage(trend_score: float, decay_score: float) -> str:
        """Determines the current stage in the 7-stage hype cycle."""
        if decay_score > 60: return "Exhaustion"
        if decay_score > 30: return "Fatigue Zone"
        if trend_score > 90: return "Viral Breakout"
        if trend_score > 70: return "Mainstream Awareness"
        if trend_score > 40: return "Early Buzz"
        if trend_score > 20: return "Hidden Gem"
        return "Pre-Buzz"

    @staticmethod
    def get_manipulation_flags(auth_score: float) -> list:
        """Analyzes authenticity score to generate specific red flags."""
        flags = []
        if auth_score < 60:
            flags.append("Suspicious account cluster activity")
        if auth_score < 40:
            flags.append("Coordinated posting burst detected")
        if auth_score < 25:
            flags.append("Late-stage exit liquidity pattern")
        return flags

    @staticmethod
    def get_forensic_verdict(auth_score: float, robust_score: float) -> str:
        """Synthesizes scores into a human-readable forensic verdict."""
        if auth_score > 80 and robust_score > 70:
            return "Highly authentic, organic trend with broad platform support."
        if auth_score < 40:
            return "High manipulation risk. Data suggests coordinated bot amplification."
        if robust_score < 30:
            return "Fragile trend. Hype is overly concentrated on a single platform."
        return "Mixed signals. Organic community amplified by secondary marketing."
