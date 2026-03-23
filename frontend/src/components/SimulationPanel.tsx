'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Play, Loader2, ArrowRight } from 'lucide-react';
import { Coin, SimulationResult } from '@/types';

interface SimulationPanelProps {
  coins: Coin[];
  onSimulate: (coinId: string, params: Record<string, number | boolean>) => Promise<SimulationResult | null>;
}

export default function SimulationPanel({ coins, onSimulate }: SimulationPanelProps) {
  const [selectedCoin, setSelectedCoin] = useState('pepe');
  const [params, setParams] = useState({
    reduce_positive_sentiment: 0,
    remove_influencer_posts: false,
    increase_spam_ratio: 0,
    reduce_unique_users: 0,
    increase_concentration: 0,
  });
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function runSim() {
    setLoading(true);
    try {
      const r = await onSimulate(selectedCoin, params);
      setResult(r);
    } finally {
      setLoading(false);
    }
  }

  function ScoreDelta({ original, simulated, label }: { original: number; simulated: number; label: string }) {
    const delta = simulated - original;
    return (
      <div className="flex items-center justify-between py-2 border-b border-white/04">
        <span className="text-xs text-white/50">{label}</span>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-white/40">{original.toFixed(1)}</span>
          <ArrowRight size={10} className="text-white/20" />
          <span className={delta > 0 ? 'stat-up' : delta < 0 ? 'stat-down' : 'text-white/60'}>
            {simulated.toFixed(1)}
          </span>
          <span className={`text-xs ${delta > 0 ? 'stat-up' : delta < 0 ? 'stat-down' : 'text-white/30'}`}>
            ({delta > 0 ? '+' : ''}{delta.toFixed(1)})
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Coin selector */}
      <div>
        <label className="section-label mb-2 block">Select Coin</label>
        <div className="flex flex-wrap gap-1.5">
          {coins.map(c => (
            <button
              key={c.id}
              onClick={() => { setSelectedCoin(c.id); setResult(null); }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                selectedCoin === c.id
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'border-white/08 text-white/40 hover:border-white/15'
              }`}
            >
              {c.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: 'reduce_positive_sentiment', label: 'Reduce Positive Sentiment', suffix: '%' },
          { key: 'increase_spam_ratio', label: 'Increase Spam Ratio', suffix: '%' },
          { key: 'reduce_unique_users', label: 'Reduce Unique Users', suffix: '%' },
          { key: 'increase_concentration', label: 'Increase Concentration', suffix: '%' },
        ].map(({ key, label, suffix }) => (
          <div key={key}>
            <div className="flex justify-between mb-1.5">
              <label className="text-xs text-white/50">{label}</label>
              <span className="text-xs text-purple-300">{(params as Record<string,number>)[key]}{suffix}</span>
            </div>
            <input
              type="range" min={0} max={50} step={5}
              value={(params as Record<string,number>)[key]}
              onChange={e => setParams(p => ({ ...p, [key]: Number(e.target.value) }))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ background: `linear-gradient(90deg, #8b5cf6 ${(params as Record<string,number>)[key]*2}%, rgba(255,255,255,0.1) ${(params as Record<string,number>)[key]*2}%)` }}
            />
          </div>
        ))}

        {/* Remove influencer toggle */}
        <div className="sm:col-span-2 flex items-center justify-between p-3 rounded-xl border border-white/06">
          <div>
            <p className="text-xs font-medium text-white/70">Remove Influencer Posts</p>
            <p className="text-[10px] text-white/35">Strips all influencer-driven engagement</p>
          </div>
          <div
            className={`toggle-track ${params.remove_influencer_posts ? 'active' : ''}`}
            onClick={() => setParams(p => ({ ...p, remove_influencer_posts: !p.remove_influencer_posts }))}
          >
            <div className="toggle-thumb" />
          </div>
        </div>
      </div>

      {/* Run button */}
      <button onClick={runSim} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
        Run What-If Simulation
      </button>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/05"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sliders size={13} className="text-purple-400" />
              <span className="text-xs font-bold text-purple-300">Simulation Results — {result.coin}</span>
            </div>

            <div className="space-y-0">
              <ScoreDelta original={result.original.trend_score} simulated={result.simulated.trend_score} label="Trend Score" />
              <ScoreDelta original={result.original.authenticity_score} simulated={result.simulated.authenticity_score} label="Authenticity" />
              <ScoreDelta original={result.original.robustness_score} simulated={result.simulated.robustness_score} label="Robustness" />
              <ScoreDelta original={result.original.opportunity_score} simulated={result.simulated.opportunity_score} label="Opportunity Score" />
            </div>

            <div className="mt-3 pt-3 border-t border-white/06">
              <p className="text-xs text-white/55 leading-relaxed">{result.summary}</p>
              {result.changes_applied.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {result.changes_applied.map((c, i) => (
                    <li key={i} className="text-[10px] text-white/35 flex items-start gap-1.5">
                      <span className="shrink-0 mt-0.5">→</span>{c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
