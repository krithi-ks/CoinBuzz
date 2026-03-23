'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import { StageBadge, RiskBadge, DirectionBadge, TrendBadge, ScoreBar } from '@/components/Badges';
import { mockCoins } from '@/lib/mockData';
import { Coin } from '@/types';
import { useParams } from 'next/navigation';
import { 
  ArrowRight, Activity, Shield, Brain, Zap, AlertTriangle, Cpu, TrendingUp
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-no-hover p-2.5 rounded-xl text-xs">
        <p className="text-white/40 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || '#a78bfa' }}>{p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};
export default function CoinDetailPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState<Coin | null>(null);

  useEffect(() => {
    if (id) {
      const found = mockCoins.find(c => c.id === id);
      setCoin(found || mockCoins[0]);
    }
  }, [id]);

  if (!coin) return null;

  const chartData = Array.from({ length: 24 }, (_, i) => ({
    h: `${i}h`,
    sentiment: coin.sentiment_timeline[i],
    mentions: Math.round(coin.mention_timeline[i] / 100),
    engagement: coin.engagement_timeline[i],
  }));

  return (
    <div className="min-h-screen bg-[#050508]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-5 space-y-5 min-w-0">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-no-hover p-5 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-purple-500/20 flex items-center justify-center text-xl font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                {coin.symbol.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2" style={{fontFamily: 'Space Grotesk'}}>
                  {coin.name} <span className="text-sm font-normal text-white/40">{coin.cashtag}</span>
                </h1>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="font-mono text-purple-400">Rank #{coin.rank}</span>
                  <span className="text-white/30">•</span>
                  <span className={coin.price_change_24h >= 0 ? 'stat-up' : 'stat-down'}>
                    ${coin.price} ({coin.price_change_24h >= 0 ? '+' : ''}{coin.price_change_24h}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-col items-end mr-4">
                <span className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Trend Score</span>
                <span className="text-3xl font-bold gradient-text-purple leading-none">{coin.trend_score.toFixed(1)}</span>
              </div>
              <StageBadge stage={coin.hype_stage} />
              <RiskBadge label={coin.risk_label} />
              <DirectionBadge direction={coin.predicted_direction} />
            </div>
          </div>

          {/* AI Explanation Card */}
          <div className="glass-no-hover p-5 rounded-2xl relative overflow-hidden border-cyan-500/30" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.05))' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-start gap-3">
              <Cpu className="text-cyan-400 mt-1 shrink-0" size={20} />
              <div>
                <h3 className="text-sm font-bold text-white mb-2">CoinBuzz Copilot Analysis</h3>
                <p className="text-sm text-white/75 leading-relaxed">{coin.explanation}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="badge badge-purple">Confidence: {coin.confidence.toFixed(1)}%</span>
                  {coin.pre_pump_signal && <span className="badge badge-purple"><Zap size={10}/> Pre-Pump Signal Active</span>}
                  {coin.manipulation_flag && <span className="badge badge-red"><AlertTriangle size={10}/> Manipulation Detected</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Scores Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard title="Authenticity Score" value={coin.authenticity_score} suffix="/100" icon={<Shield size={14} />} color="green" />
            <MetricCard title="Robustness Score" value={coin.robustness_score} suffix="/100" icon={<Activity size={14} />} color="blue" />
            <MetricCard title="Opportunity Score" value={coin.opportunity_score} suffix="/100" icon={<TrendingUp size={14} />} color="cyan" />
            <MetricCard title="Risk Score" value={coin.risk_score} suffix="/100" icon={<AlertTriangle size={14} />} color="red" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Sentiment & Timeline */}
            <div className="glass-no-hover p-4 rounded-2xl">
              <h3 className="text-sm font-semibold text-white mb-4">24h Signal Timeline</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData} margin={{ top: 5, right: 0, bottom: 0, left: -25 }}>
                  <defs>
                    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
                    <linearGradient id="e" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="h" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="sentiment" stroke="#8b5cf6" strokeWidth={2} fill="url(#s)" name="Sentiment" />
                  <Area type="monotone" dataKey="engagement" stroke="#06b6d4" strokeWidth={2} fill="url(#e)" name="Engagement" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Forensics Details */}
            <div className="glass-no-hover p-5 rounded-2xl flex flex-col justify-between">
              <h3 className="text-sm font-semibold text-white mb-4">Hype Profile</h3>
              
              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Origin Source</p>
                  <p className="text-sm text-white/80">{coin.hype_origin}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Top Narratives</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {coin.top_narratives.map(n => (
                      <span key={n} className="px-2 py-1 rounded-md bg-white/05 border border-white/10 text-xs text-white/60">{n}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Platform Split</p>
                  <div className="flex h-2 rounded-full overflow-hidden mb-1">
                    <div style={{width: `${coin.platform_split.x}%`, background: '#3b82f6'}} />
                    <div style={{width: `${coin.platform_split.reddit}%`, background: '#ff4500'}} />
                    <div style={{width: `${coin.platform_split.telegram}%`, background: '#0088cc'}} />
                    <div style={{width: `${coin.platform_split.discord}%`, background: '#5865F2'}} />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/30">
                    <span>X {coin.platform_split.x}%</span>
                    <span>Reddit {coin.platform_split.reddit}%</span>
                    <span>TG {coin.platform_split.telegram}%</span>
                    <span>Disc {coin.platform_split.discord}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/05 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Retail Trap Risk</p>
                  <div className="flex items-center gap-2 text-sm font-bold" style={{ color: coin.retail_trap_risk > 60 ? '#ef4444' : coin.retail_trap_risk > 30 ? '#f59e0b' : '#10b981' }}>
                    {coin.retail_trap_risk}%
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Decay Forecast</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white/80">
                    {coin.decay_forecast} score
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
