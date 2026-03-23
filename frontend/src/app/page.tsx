'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Zap, TrendingUp, Shield, Brain, Activity, Search, 
  AlertTriangle, BarChart2, Target, ArrowRight, CheckCircle,
  ChevronRight, Layers, Cpu
} from 'lucide-react';

const FEATURES = [
  { icon: Brain, label: 'Hype Forensics Engine', desc: 'Identifies whether hype is organic, coordinated, early, durable, or near exhaustion with forensic precision.', color: '#8b5cf6' },
  { icon: Shield, label: 'Authenticity Intelligence', desc: 'Scores every trend for authenticity, bot contamination, concentration risk, and source reliability.', color: '#06b6d4' },
  { icon: Zap, label: 'Pre-Pump Detection', desc: 'Detects quiet accumulation patterns, rising conviction, and early breakout signals before the crowd.', color: '#3b82f6' },
  { icon: Activity, label: 'Social Decay Predictor', desc: 'Forecasts when social energy will fade, giving you a decay timeline before the market confirms it.', color: '#10b981' },
  { icon: TrendingUp, label: 'Narrative Tracking', desc: 'Tracks how narratives mutate and spread across X and Reddit with velocity and origin analysis.', color: '#f59e0b' },
  { icon: Cpu, label: 'AI Copilot', desc: 'Explainable intelligence layer — answers why a coin is trending, compares opportunities, and simulates what-if scenarios.', color: '#a78bfa' },
];

const INNOVATIONS = [
  'Hype Authenticity Engine', 'Lifecycle Forecasting', 'Retail Trap Warning',
  'Narrative Translation Engine', 'Signal-to-Noise Intelligence', 'Contradiction Detector',
  'Cross-Platform Momentum Shift', 'Community Conviction Score', 'Event-to-Hype Causality Mapping',
  'Hype Robustness Score', 'Pre-Pump Detection', 'Attention Concentration Index',
  'Social Decay Predictor', 'Source Reliability Layer', 'Narrative Mutation Tracker', 'Hype Forensics Engine'
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Ingestion', desc: 'Continuously scans X and Reddit for mentions, engagement, and narrative signals across all major meme coins.', icon: Search },
  { step: '02', title: 'Intelligence', desc: 'NLP sentiment analysis, authenticity scoring, hype forensics, and 16 custom intelligence engines process every signal.', icon: Brain },
  { step: '03', title: 'Insights', desc: 'CoinBuzz Copilot translates raw signals into explainable, actionable intelligence — not just metrics, but meaning.', icon: Cpu },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-hero-gradient bg-grid">
      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050508]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-bold tracking-tight gradient-text text-sm" style={{fontFamily: 'Space Grotesk'}}>CoinBuzz</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/50">
            {['Features', 'How It Works', 'Innovation'].map(n => (
              <a key={n} href={`#${n.toLowerCase().replace(/ /g,'-')}`} className="hover:text-white/80 transition-colors">{n}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="btn-secondary text-sm px-4 py-1.5">Live Demo</Link>
            <Link href="/dashboard" className="btn-primary text-sm px-4 py-1.5">Launch App</Link>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none blur-3xl" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.8), transparent)' }} />
        <div className="absolute top-20 right-1/4 w-64 h-64 rounded-full opacity-15 pointer-events-none blur-3xl" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.8), transparent)' }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 text-purple-300 text-xs font-medium mb-6">
            <div className="live-dot" />
            Live Intelligence Platform · 10,000+ Coins Tracked
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight" style={{fontFamily: 'Space Grotesk'}}>
            <span className="text-white">CoinBuzz turns social</span>
            <br />
            <span className="gradient-text">media noise into</span>
            <br />
            <span className="text-white">explainable meme coin</span>
            <br />
            <span className="gradient-text">intelligence.</span>
          </h1>

          <p className="text-lg text-white/50 max-w-3xl mx-auto mb-8 leading-relaxed">
            Track sentiment, mention spikes, engagement bursts, narrative shifts, authenticity, and hype decay across X and Reddit to identify early opportunities, manipulation risk, and market-relevant meme coin signals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
              <Activity size={16} />
              Open Live Dashboard
            </Link>
            <Link href="/copilot" className="btn-secondary text-base px-8 py-3 flex items-center gap-2">
              <Cpu size={16} />
              Try AI Copilot
            </Link>
          </div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="float relative mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-purple-500/20 bg-[#0a0a12]/90 backdrop-blur-xl overflow-hidden shadow-[0_40px_120px_rgba(139,92,246,0.2)]">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/05 bg-[#060610]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4 h-5 rounded-md bg-white/04 flex items-center px-3">
                <span className="text-xs text-white/20">coinbuzz.ai/dashboard</span>
              </div>
            </div>

            {/* Preview content */}
            <div className="p-6 grid grid-cols-4 gap-3">
              {[
                { label: 'Coins Tracked', value: '10,000+', color: '#8b5cf6' },
                { label: 'Social Mentions 24h', value: '2.8M', color: '#06b6d4' },
                { label: 'Avg Sentiment', value: '74.3%', color: '#10b981' },
                { label: 'Active Alerts', value: '24', color: '#f59e0b' },
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-xl border" style={{ background: `${m.color}08`, borderColor: `${m.color}20` }}>
                  <p className="text-[10px] text-white/35 mb-1">{m.label}</p>
                  <p className="text-lg font-bold" style={{ color: m.color, fontFamily: 'Space Grotesk' }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Fake leaderboard */}
            <div className="px-6 pb-6">
              <div className="rounded-xl border border-white/05 overflow-hidden">
                <div className="grid grid-cols-5 text-[10px] text-white/30 uppercase tracking-widest px-4 py-2 bg-white/[0.02] border-b border-white/04">
                  <span>Coin</span><span>Trend Score</span><span>Sentiment</span><span>Stage</span><span>Risk</span>
                </div>
                {[
                  { symbol: 'BONK', score: '92.4', sent: '86.7%', stage: 'Viral Breakout', stageColor: '#8b5cf6', risk: 'Durable', riskColor: '#06b6d4' },
                  { symbol: 'PEPE', score: '89.1', sent: '82.3%', stage: 'Early Buzz', stageColor: '#06b6d4', risk: 'Organic', riskColor: '#10b981' },
                  { symbol: 'DOGE', score: '85.2', sent: '78.5%', stage: 'Viral Breakout', stageColor: '#8b5cf6', risk: 'Speculative', riskColor: '#f59e0b' },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-5 px-4 py-2.5 text-xs border-b border-white/03 hover:bg-white/[0.02] transition">
                    <span className="font-bold text-white/80">{row.symbol}</span>
                    <span className="font-mono" style={{ color: '#a78bfa' }}>{row.score}</span>
                    <span className="text-white/60">{row.sent}</span>
                    <span style={{ color: row.stageColor }}>{row.stage}</span>
                    <span style={{ color: row.riskColor }}>{row.risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Problem Statement ─── */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="glass p-10 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4 text-white" style={{fontFamily: 'Space Grotesk'}}>
            Standard trackers show you what's trending.
            <br /><span className="gradient-text">CoinBuzz shows you why.</span>
          </h2>
          <p className="text-white/50 leading-relaxed">
            CoinBuzz does not just detect hype — it qualifies hype, explains hype, and warns when hype becomes dangerous. 
            We perform hype forensics, not just hype tracking. We identify whether hype is early, real, durable, 
            manipulated, or near exhaustion.
          </p>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-3" style={{fontFamily: 'Space Grotesk'}}>
            Intelligence, not just <span className="gradient-text">metrics</span>
          </h2>
          <p className="text-white/45 max-w-xl mx-auto">Every feature is built to explain, qualify, and contextualize social signals — not just measure them.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="glass p-6"
            >
              <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ background: `${f.color}18` }}>
                <f.icon size={18} style={{ color: f.color }} />
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">{f.label}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-3" style={{fontFamily: 'Space Grotesk'}}>
            How <span className="gradient-text">CoinBuzz</span> works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {HOW_IT_WORKS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="glass p-6 relative"
            >
              <div className="text-5xl font-black mb-4 opacity-10 text-white" style={{fontFamily: 'Space Grotesk'}}>{s.step}</div>
              <s.icon size={20} className="mb-3 text-purple-400" />
              <h3 className="font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{s.desc}</p>
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 hidden md:block">
                  <ChevronRight size={20} className="text-purple-400/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Innovation Layer ─── */}
      <section id="innovation" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3" style={{fontFamily: 'Space Grotesk'}}>
            16 Innovation <span className="gradient-text">Engines</span>
          </h2>
          <p className="text-white/45">Every engine adds a new intelligence dimension above standard analytics.</p>
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {INNOVATIONS.map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              viewport={{ once: true }}
              className="px-4 py-2 rounded-xl border border-purple-500/20 bg-purple-500/08 text-sm font-medium text-purple-300 hover:border-purple-500/40 hover:bg-purple-500/12 transition-all cursor-default"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="p-12 rounded-3xl border border-purple-500/25" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.05))' }}>
          <h2 className="text-4xl font-black text-white mb-4" style={{fontFamily: 'Space Grotesk'}}>
            From Social Buzz to<br /><span className="gradient-text">Smarter Crypto Signals</span>
          </h2>
          <p className="text-white/50 mb-8">Start exploring real-time meme coin intelligence powered by forensics, authenticity scoring, and AI.</p>
          <Link href="/dashboard" className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2">
            <Zap size={16} />
            Launch CoinBuzz Dashboard
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/05 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Zap size={11} className="text-white" />
            </div>
            <span className="font-bold text-sm gradient-text" style={{fontFamily: 'Space Grotesk'}}>CoinBuzz</span>
          </div>
          <p className="text-xs text-white/25">From Social Buzz to Smarter Crypto Signals · AI Hype Intelligence Platform</p>
          <div className="flex gap-4 text-xs text-white/35">
            <Link href="/dashboard" className="hover:text-white/60 transition">Dashboard</Link>
            <Link href="/architecture" className="hover:text-white/60 transition">Architecture</Link>
            <Link href="/innovation" className="hover:text-white/60 transition">Innovation Lab</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
