'use client';
import { motion } from 'framer-motion';
import { JudgeView } from '@/types';
import { CheckCircle, Shield, Zap, Eye, Star, AlertTriangle } from 'lucide-react';

interface JudgeViewSectionProps {
  data: JudgeView;
}

export default function JudgeViewSection({ data }: JudgeViewSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl border relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.05) 100%)',
        borderColor: 'rgba(139,92,246,0.3)' 
      }}
    >
      {/* Glow bg */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.8), transparent)', transform: 'translate(40%, -40%)' }} />

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Star size={14} className="text-yellow-400" />
            <span className="text-xs font-bold text-yellow-400 tracking-widest uppercase">Judge View</span>
          </div>
          <h3 className="text-lg font-bold text-white" style={{fontFamily: 'Space Grotesk'}}>{data.headline}</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold gradient-text-purple" style={{fontFamily: 'Space Grotesk'}}>{data.confidence_score.toFixed(0)}%</div>
          <div className="text-[10px] text-white/35">Confidence</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left column */}
        <div className="space-y-4">
          <div>
            <p className="section-label mb-1.5">📊 Why Trending</p>
            <p className="text-sm text-white/65 leading-relaxed">{data.why_trending}</p>
          </div>
          <div>
            <p className="section-label mb-1.5">🧬 Hype Analysis</p>
            <p className="text-sm text-white/65 leading-relaxed">{data.hype_stage_analysis}</p>
          </div>
          <div>
            <p className="section-label mb-1.5">💡 Why You Should Care</p>
            <p className="text-sm text-white/65 leading-relaxed">{data.why_user_should_care}</p>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertTriangle size={12} className="text-red-400 shrink-0" />
            <p className="text-xs text-white/55">{data.risk_notes}</p>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div>
            <p className="section-label mb-2">✅ Signals Triggered</p>
            <div className="space-y-1.5">
              {data.signals_triggered.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/65">
                  <CheckCircle size={11} className="text-green-400 shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="section-label mb-1.5">🔬 Why CoinBuzz Is Different</p>
            <p className="text-sm text-white/65 leading-relaxed">{data.why_different_from_trackers}</p>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <Zap size={14} className="text-green-400 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-green-400">Opportunity Window</p>
              <p className="text-xs text-white/55">{data.opportunity_window}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40">Hype Type:</span>
            <span className={`badge ${data.hype_type === 'Organic' ? 'badge-green' : data.hype_type === 'Manipulated' ? 'badge-red' : 'badge-orange'}`}>
              {data.hype_type}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
