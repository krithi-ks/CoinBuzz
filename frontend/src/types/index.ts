// CoinBuzz TypeScript Types

export type HypeStage = 
  | 'Pre-Hype' 
  | 'Early Buzz' 
  | 'Viral Breakout' 
  | 'Peak Hype' 
  | 'Fatigue Zone' 
  | 'Cooling Phase' 
  | 'Dump Risk';

export type PredictedDirection = 'Upward' | 'Downward' | 'Volatile' | 'Watch';

export type RiskLabel = 
  | 'Organic' 
  | 'Speculative' 
  | 'Manipulated' 
  | 'Fragile' 
  | 'Durable' 
  | 'Retail Trap';

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  cashtag: string;
  rank: number;
  trend_score: number;
  sentiment: number;
  mention_volume: number;
  engagement_score: number;
  authenticity_score: number;
  robustness_score: number;
  hype_stage: HypeStage;
  predicted_direction: PredictedDirection;
  confidence: number;
  risk_label: RiskLabel;
  price: number;
  price_change_24h: number;
  market_cap: number;
  opportunity_score: number;
  risk_score: number;
  hype_origin: string;
  likely_trigger: string;
  narrative: string;
  sentiment_timeline: number[];
  mention_timeline: number[];
  engagement_timeline: number[];
  authenticity_timeline: number[];
  robustness_timeline: number[];
  platform_split: Record<string, number>;
  unique_users_timeline: number[];
  top_narratives: string[];
  source_reliability: number;
  attention_concentration: number;
  decay_forecast: number;
  pre_pump_signal: boolean;
  manipulation_flag: boolean;
  retail_trap_risk: number;
  community_conviction: number;
  explanation: string;
}

export interface Alert {
  id: string;
  coin: string;
  type: string;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  icon: string;
}

export interface Narrative {
  id: string;
  theme: string;
  coins: string[];
  strength: number;
  velocity: string;
  origin: string;
  spread_to: string[];
  age_hours: number;
  description: string;
}

export interface MetricsOverview {
  coins_tracked: number;
  social_mentions_24h: number;
  avg_sentiment_score: number;
  active_alerts: number;
  hype_spikes_detected: number;
  prediction_accuracy: number;
  manipulation_signals: number;
  pre_pump_flags: number;
}

export interface ForensicsData {
  coin: string;
  hype_origin_time?: string;
  hype_origin_platform: string;
  hype_origin_account_type?: string;
  spread_sequence?: string[];
  concentration_index: number;
  concentration_verdict?: string;
  authenticity_events?: Array<{time: string; event: string; authenticity_delta: number}>;
  narrative_mutations?: Array<{time: string; narrative: string}>;
  manipulation_signals: string[];
  likely_trigger_event: string;
  decay_forecast_days?: number;
  forensic_verdict: string;
}

export interface SimulationRequest {
  coin_id: string;
  reduce_positive_sentiment?: number;
  remove_influencer_posts?: boolean;
  increase_spam_ratio?: number;
  shift_platform?: string;
  reduce_unique_users?: number;
  increase_concentration?: number;
}

export interface SimulationResult {
  coin: string;
  original: {
    trend_score: number;
    authenticity_score: number;
    robustness_score: number;
    hype_stage: string;
    risk_label: string;
    opportunity_score: number;
  };
  simulated: {
    trend_score: number;
    authenticity_score: number;
    robustness_score: number;
    hype_stage: string;
    risk_label: string;
    opportunity_score: number;
  };
  changes_applied: string[];
  summary: string;
}

export interface CopilotResponse {
  answer: string;
  confidence: number;
  label: string;
  key_drivers: string[];
  risk_notes: string;
  mode: string;
}

export interface JudgeView {
  featured_coin: string;
  headline: string;
  why_trending: string;
  hype_type: string;
  hype_stage_analysis: string;
  signals_triggered: string[];
  why_user_should_care: string;
  why_different_from_trackers: string;
  confidence_score: number;
  risk_notes: string;
  opportunity_window: string;
}

export interface DemoScenario {
  id: string;
  name: string;
  coin: string;
  description: string;
}
