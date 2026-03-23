'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { Database, Cpu, Network, Server, ArrowDown, Activity, Shield, Brain } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#050508] relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none blur-[100px]" style={{ background: '#8b5cf6' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none blur-[100px]" style={{ background: '#06b6d4' }} />
      
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-5 space-y-8 min-w-0 max-w-5xl mx-auto py-10">
          
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold text-white mb-3" style={{fontFamily: 'Space Grotesk'}}>Platform Architecture</h1>
            <p className="text-sm text-white/45 max-w-2xl mx-auto">
              How CoinBuzz processes raw social noise into actionable, forensic hype intelligence in real-time.
            </p>
          </div>

          <div className="relative">
            {/* Connecting lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/0 via-purple-500/30 to-cyan-500/0 -translate-x-1/2" />
            
            <div className="space-y-16 relative">
              
              {/* Layer 1: Ingestion */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050508] border border-purple-500/30 flex items-center justify-center z-10">
                  <Database size={14} className="text-purple-400" />
                </div>
                <div className="grid grid-cols-2 gap-16">
                  <div className="text-right pr-8">
                    <h3 className="text-lg font-bold text-white mb-2">1. Social Firehose Ingestion</h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Continuous streaming from X/Twitter API, Reddit streaming API, Telegram channels, and Discord servers. Tracking keywords, cashtags, and contract addresses.
                    </p>
                  </div>
                  <div className="pl-8 flex items-center gap-3">
                    {['X/Twitter', 'Reddit', 'Telegram', 'Discord'].map(p => (
                      <div key={p} className="glass px-4 py-2 text-xs text-white/60">{p}</div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Layer 2: NLP & Processing */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050508] border border-blue-500/30 flex items-center justify-center z-10">
                  <Server size={14} className="text-blue-400" />
                </div>
                <div className="grid grid-cols-2 gap-16">
                  <div className="text-right pr-8 flex flex-col items-end justify-center gap-2">
                    <div className="glass px-4 py-2 text-xs text-blue-300 border-blue-500/20">DistilRoBERTa (Sentiment)</div>
                    <div className="glass px-4 py-2 text-xs text-blue-300 border-blue-500/20">Custom Bot Detection Model</div>
                  </div>
                  <div className="pl-8">
                    <h3 className="text-lg font-bold text-white mb-2">2. Processing & NLP</h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Raw text is cleaned, deduplicated, and passed through transformer models to extract sentiment, detect bot signatures, and identify narrative shifts.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Layer 3: The 16 Engines */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050508] border border-cyan-500/30 flex items-center justify-center z-10">
                  <Activity size={14} className="text-cyan-400" />
                </div>
                <div className="grid grid-cols-2 gap-16">
                  <div className="text-right pr-8">
                    <h3 className="text-lg font-bold text-white mb-2">3. Intelligence Engines</h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                      The classified data enters 16 proprietary engines that calculate authenticity, concentration, robustness, decay rates, and cross-platform momentum.
                    </p>
                  </div>
                  <div className="pl-8 flex flex-wrap gap-2 content-center">
                    {['Forensics Engine', 'Decay Predictor', 'Authenticity Scorer', 'Pre-Pump Radar'].map(e => (
                      <div key={e} className="px-3 py-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-[10px] text-cyan-300">
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Layer 4: Copilot & Explainability */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050508] border border-emerald-500/30 flex items-center justify-center z-10">
                  <Brain size={14} className="text-emerald-400" />
                </div>
                <div className="grid grid-cols-2 gap-16">
                  <div className="text-right pr-8 flex flex-col items-end justify-center">
                    <div className="glass p-4 border-emerald-500/20 text-xs text-emerald-300 max-w-[200px] text-left">
                      "Why is BONK trending?" → "BONK is in early viral breakout. Authenticity is 88%, driven by DEX volume, with a 12-day decay forecast."
                    </div>
                  </div>
                  <div className="pl-8">
                    <h3 className="text-lg font-bold text-white mb-2">4. AI Copilot Synthesis</h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                      The raw metric matrices are fed into a specialized LLM wrapper that translates the data into human-readable explanations, risk warnings, and what-if simulations.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
