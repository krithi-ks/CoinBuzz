'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import CoinTable from '@/components/CoinTable';
import AlertFeed from '@/components/AlertFeed';
import JudgeViewSection from '@/components/JudgeViewSection';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { mockCoins, mockAlerts, mockMetrics, mockJudgeView } from '@/lib/mockData';
import { Coin, Alert, MetricsOverview, JudgeView } from '@/types';
import { 
  Activity, Database, MessageSquare, Brain, AlertTriangle, 
  TrendingUp, Eye, Zap, BarChart2, RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
  BarChart, Bar, LineChart, Line
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

export default function DashboardPage() {
  const { isDemo } = useDemoMode();
  const [coins, setCoins] = useState<Coin[]>(mockCoins);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [metrics, setMetrics] = useState<MetricsOverview>(mockMetrics);
  const [judgeView, setJudgeView] = useState<JudgeView>(mockJudgeView);
  const [tab, setTab] = useState<'sentiment' | 'mentions' | 'engagement'>('sentiment');

  // Demo mode: animate metrics
  useEffect(() => {
    if (!isDemo) return;
    const t = setInterval(() => {
      setMetrics(m => ({
        ...m,
        social_mentions_24h: m.social_mentions_24h + Math.floor(Math.random() * 200 - 50),
        active_alerts: Math.max(20, m.active_alerts + Math.floor(Math.random() * 3 - 1)),
        hype_spikes_detected: Math.max(5, m.hype_spikes_detected + Math.floor(Math.random() * 2 - 1)),
      }));
    }, 3000);
    return () => clearInterval(t);
  }, [isDemo]);

  // Generate chart data from first coin's timelines
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    h: `${i}h`,
    sentiment: coins[1]?.sentiment_timeline[i] ?? 70,
    mentions: Math.round((coins[1]?.mention_timeline[i] ?? 3000) / 100),
    engagement: coins[1]?.engagement_timeline[i] ?? 75,
    authenticity: coins[1]?.authenticity_timeline[i] ?? 80,
  }));

  return (
    <div className="min-h-screen" style={{ background: '#050508' }}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-5 space-y-5 min-w-0">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white" style={{fontFamily: 'Space Grotesk'}}>Intelligence Dashboard</h1>
              <p className="text-xs text-white/35 mt-0.5">Real-time meme coin hype forensics and signal intelligence</p>
            </div>
            {isDemo && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10">
                <div className="live-dot" />
                <span className="text-xs text-purple-300 font-medium">Demo Mode · Live Updates</span>
              </div>
            )}
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard title="Coins Tracked" value={metrics.coins_tracked} icon={<Database size={14} />} color="purple" animate={isDemo} />
            <MetricCard title="Social Mentions 24h" value={metrics.social_mentions_24h} icon={<MessageSquare size={14} />} color="cyan" animate={isDemo} />
            <MetricCard title="Avg Sentiment Score" value={metrics.avg_sentiment_score} suffix="%" decimals={1} icon={<Brain size={14} />} color="green" animate={isDemo} />
            <MetricCard title="Active Alerts" value={metrics.active_alerts} icon={<AlertTriangle size={14} />} color="red" animate={isDemo} />
            <MetricCard title="Hype Spikes Detected" value={metrics.hype_spikes_detected} icon={<TrendingUp size={14} />} color="orange" animate={isDemo} />
            <MetricCard title="Prediction Accuracy" value={metrics.prediction_accuracy} suffix="%" decimals={1} icon={<Activity size={14} />} color="cyan" animate={isDemo} />
            <MetricCard title="Manipulation Signals" value={metrics.manipulation_signals} icon={<Eye size={14} />} color="red" animate={isDemo} />
            <MetricCard title="Pre-Pump Flags" value={metrics.pre_pump_flags} icon={<Zap size={14} />} color="purple" animate={isDemo} />
          </div>

          {/* Charts + Alerts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Chart panel */}
            <div className="lg:col-span-2 glass-no-hover p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">PEPE Signal Analysis</h3>
                  <p className="text-xs text-white/35">24h rolling window</p>
                </div>
                <div className="flex gap-1">
                  {(['sentiment','mentions','engagement'] as const).map(t => (
                    <button key={t} onClick={() => setTab(t)} className={`px-3 py-1 rounded-lg text-xs capitalize transition-all ${tab === t ? 'bg-purple-500/20 text-purple-300' : 'text-white/35 hover:text-white/60'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="h" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  {tab === 'sentiment' && (
                    <>
                      <Area type="monotone" dataKey="sentiment" stroke="#8b5cf6" strokeWidth={2} fill="url(#g1)" name="Sentiment" />
                      <Area type="monotone" dataKey="authenticity" stroke="#06b6d4" strokeWidth={1.5} fill="url(#g2)" name="Authenticity" strokeDasharray="4 2" />
                    </>
                  )}
                  {tab === 'mentions' && (
                    <Area type="monotone" dataKey="mentions" stroke="#10b981" strokeWidth={2} fill="url(#g1)" name="Mentions (×100)" />
                  )}
                  {tab === 'engagement' && (
                    <Area type="monotone" dataKey="engagement" stroke="#f59e0b" strokeWidth={2} fill="url(#g2)" name="Engagement" />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Alert Feed */}
            <div className="glass-no-hover p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Live Alerts</h3>
                <div className="flex items-center gap-1.5">
                  <div className="live-dot" />
                  <span className="text-xs text-white/35">Real-time</span>
                </div>
              </div>
              <AlertFeed alerts={alerts} isDemo={isDemo} />
            </div>
          </div>

          {/* Leaderboard */}
          <div className="glass-no-hover p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Trending Meme Coin Leaderboard</h3>
                <p className="text-xs text-white/35">Ranked by Trend Score · All intelligence metrics</p>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors px-3 py-1.5 rounded-lg border border-white/06 hover:border-white/12">
                <RefreshCw size={11} />
                Refresh
              </button>
            </div>
            <CoinTable coins={coins} />
          </div>

          {/* Watchlist + Judge View row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Watchlist */}
            <div className="glass-no-hover p-4 rounded-2xl">
              <h3 className="text-sm font-semibold text-white mb-3">Watchlist</h3>
              <div className="space-y-2.5">
                {coins.slice(0, 5).map(coin => (
                  <div key={coin.id} className="flex items-center justify-between py-2 border-b border-white/04">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/15 flex items-center justify-center text-xs font-bold text-white/70">
                        {coin.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/80">{coin.symbol}</div>
                        <div className="text-[10px] text-white/35">{coin.hype_stage}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${coin.price_change_24h >= 0 ? 'stat-up' : 'stat-down'}`}>
                        {coin.price_change_24h >= 0 ? '+' : ''}{coin.price_change_24h.toFixed(1)}%
                      </div>
                      <div className="text-[10px] text-white/35">{coin.trend_score.toFixed(0)} trend</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact bar chart */}
            <div className="glass-no-hover p-4 rounded-2xl">
              <h3 className="text-sm font-semibold text-white mb-3">Authenticity vs Robustness</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={coins.slice(0, 6).map(c => ({ name: c.symbol, auth: c.authenticity_score, robust: c.robustness_score }))} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} domain={[0,100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="auth" name="Authenticity" fill="#8b5cf6" radius={[3,3,0,0]} opacity={0.8} />
                  <Bar dataKey="robust" name="Robustness" fill="#06b6d4" radius={[3,3,0,0]} opacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Judge View */}
          <JudgeViewSection data={judgeView} />
        </main>
      </div>
    </div>
  );
}
