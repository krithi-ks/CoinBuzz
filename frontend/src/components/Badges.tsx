import { HypeStage, RiskLabel, PredictedDirection } from '@/types';

const hypeStageConfig: Record<HypeStage, { className: string; dot: string }> = {
  'Pre-Hype':      { className: 'badge-gray',   dot: '#9ca3af' },
  'Early Buzz':    { className: 'badge-cyan',   dot: '#06b6d4' },
  'Viral Breakout':{ className: 'badge-purple', dot: '#8b5cf6' },
  'Peak Hype':     { className: 'badge-blue',   dot: '#3b82f6' },
  'Fatigue Zone':  { className: 'badge-orange', dot: '#f59e0b' },
  'Cooling Phase': { className: 'badge-gray',   dot: '#6b7280' },
  'Dump Risk':     { className: 'badge-red',    dot: '#ef4444' },
};

const riskLabelConfig: Record<RiskLabel, { className: string }> = {
  'Organic':     { className: 'badge-green' },
  'Speculative': { className: 'badge-orange' },
  'Manipulated': { className: 'badge-red' },
  'Fragile':     { className: 'badge-orange' },
  'Durable':     { className: 'badge-cyan' },
  'Retail Trap': { className: 'badge-red' },
};

const directionConfig: Record<PredictedDirection, { className: string; icon: string }> = {
  'Upward':   { className: 'badge-green',  icon: '↑' },
  'Downward': { className: 'badge-red',    icon: '↓' },
  'Volatile': { className: 'badge-orange', icon: '↕' },
  'Watch':    { className: 'badge-gray',   icon: '◉' },
};

export function StageBadge({ stage }: { stage: HypeStage }) {
  const config = hypeStageConfig[stage] || hypeStageConfig['Pre-Hype'];
  return (
    <span className={`badge ${config.className}`}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: config.dot, display: 'inline-block', flexShrink: 0 }} />
      {stage}
    </span>
  );
}

export function RiskBadge({ label }: { label: RiskLabel }) {
  const config = riskLabelConfig[label] || riskLabelConfig['Speculative'];
  return <span className={`badge ${config.className}`}>{label}</span>;
}

export function DirectionBadge({ direction }: { direction: PredictedDirection }) {
  const config = directionConfig[direction] || directionConfig['Watch'];
  return (
    <span className={`badge ${config.className}`}>
      {config.icon} {direction}
    </span>
  );
}

export function TrendBadge({ score }: { score: number }) {
  const cls = score >= 85 ? 'badge-purple' : score >= 70 ? 'badge-cyan' : score >= 50 ? 'badge-orange' : 'badge-gray';
  return <span className={`badge ${cls}`}>{score.toFixed(1)}</span>;
}

export function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="score-bar">
      <div 
        className="score-bar-fill" 
        style={{ 
          width: `${value}%`, 
          background: `linear-gradient(90deg, ${color}, ${color}88)` 
        }} 
      />
    </div>
  );
}
