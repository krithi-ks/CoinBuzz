'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { Brain, Shield, Activity, Target, Network, Layers, AlertCircle, Eye, GitFork, BookOpen, Clock, Zap, MessageSquare, TrendingUp, BarChart, Crosshair } from 'lucide-react';

const ENGINES = [
  { id: 'authenticity', name: 'Hype Authenticity Engine', desc: 'Differentiates organic grassroots growth from coordinated bot rings and paid influencer campaigns.', icon: Shield, color: '#10b981' },
  { id: 'lifecycle', name: 'Lifecycle Forecasting', desc: 'Pinpoints exactly where a token sits on the 7-stage hype lifecycle, from pre-buzz to dump risk.', icon: Clock, color: '#06b6d4' },
  { id: 'retail-trap', name: 'Retail Trap Warning System', desc: 'Identifies when social metrics lag behind price action, warning users of late-stage entry danger.', icon: AlertCircle, color: '#ef4444' },
  { id: 'narrative', name: 'Narrative Translation Engine', desc: 'Extracts the core psychological narrative driving the hype rather than just counting keywords.', icon: BookOpen, color: '#8b5cf6' },
  { id: 'signal-noise', name: 'Signal-to-Noise Intelligence', desc: 'Filters out irrelevant spam and engagement farming to reveal the true signal strength.', icon: Activity, color: '#f59e0b' },
  { id: 'contradiction', name: 'Contradiction Detector', desc: 'Flags anomalies, such as high "bullish" sentiment paired with massive holder wallet sell-offs.', icon: GitFork, color: '#ef4444' },
  { id: 'cross-platform', name: 'Cross-Platform Momentum Shift', desc: 'Tracks how narratives mutate and migrate from obscure Telegram/Discord channels to mainstream X.', icon: Network, color: '#3b82f6' },
  { id: 'conviction', name: 'Community Conviction Score', desc: 'Measures the depth of holder belief based on engagement quality, not just volume.', icon: Target, color: '#10b981' },
  { id: 'causality', name: 'Event-to-Hype Causality', desc: 'Maps specific real-world or on-chain events directly to social metric spikes.', icon: Layers, color: '#8b5cf6' },
  { id: 'robustness', name: 'Hype Robustness Score', desc: 'Evaluates the fragility of the current trend—how easily could one negative event collapse the hype?', icon: Shield, color: '#06b6d4' },
  { id: 'pre-pump', name: 'Pre-Pump Detection', desc: 'Identifies quiet, deliberate accumulation patterns in both sentiment and on-chain behavior before breakouts.', icon: Zap, color: '#8b5cf6' },
  { id: 'concentration', name: 'Attention Concentration Index', desc: 'Measures whether hype relies on a few major influencers or is broadly distributed among thousands of users.', icon: Crosshair, color: '#f59e0b' },
  { id: 'decay', name: 'Social Decay Predictor', desc: 'Monitors the rate at which unique user participation is dropping, forecasting the end of the hype cycle.', icon: TrendingUp, color: '#ef4444' },
  { id: 'reliability', name: 'Source Reliability Layer', desc: 'Weighs sentiment by the historical accuracy and non-bot status of the accounts posting it.', icon: Eye, color: '#3b82f6' },
  { id: 'mutation', name: 'Narrative Mutation Tracker', desc: 'Observes how the core selling point of a token changes to sustain hype as earlier narratives fail.', icon: MessageSquare, color: '#a78bfa' },
  { id: 'forensics', name: 'Hype Forensics Master Engine', desc: 'Synthesizes all 15 sub-engines into actionable intelligence, determining overall Trend and Opportunity scores.', icon: Brain, color: '#06b6d4' },
];

export default function InnovationLabPage() {
  return (
    <div className="min-h-screen bg-[#050508]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-5 space-y-6 min-w-0">
          <div className="text-center max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-white mb-3" style={{fontFamily: 'Space Grotesk'}}>
              16 Innovation <span className="gradient-text">Engines</span>
            </h1>
            <p className="text-sm text-white/50 leading-relaxed">
              Standard trackers count mentions. CoinBuzz analyzes meaning. 
              Explore the 16 proprietary intelligence engines that power our platform's forensic analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ENGINES.map((eng, i) => (
              <motion.div
                key={eng.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="glass p-5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                     style={{ background: `radial-gradient(circle, ${eng.color}, transparent)`, transform: 'translate(30%, -30%)' }} />
                
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${eng.color}15`, border: `1px solid ${eng.color}30` }}>
                  <eng.icon size={18} style={{ color: eng.color }} />
                </div>
                
                <h3 className="font-bold text-white text-sm mb-2">{eng.name}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{eng.desc}</p>

                <div className="mt-4 pt-4 border-t border-white/05 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                    <Activity size={10} /> Live Data Active
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: eng.color, boxShadow: `0 0 8px ${eng.color}` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
