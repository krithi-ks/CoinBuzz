'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coin } from '@/types';
import { StageBadge, RiskBadge, DirectionBadge } from './Badges';
import { AlertTriangle, Zap } from 'lucide-react';

interface CoinTableProps {
  coins: Coin[];
}

function formatVolume(n: number) {
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n/1000).toFixed(0)}K`;
  return n.toString();
}

export default function CoinTable({ coins }: CoinTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Trend Score</th>
            <th>Sentiment</th>
            <th>Mentions 24h</th>
            <th>Engagement</th>
            <th>Authenticity</th>
            <th>Robustness</th>
            <th>Stage</th>
            <th>Direction</th>
            <th>Confidence</th>
            <th>Risk</th>
            <th>Flags</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, i) => (
            <motion.tr
              key={coin.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <td>
                <span className="text-white/30 text-xs font-mono">{coin.rank}</span>
              </td>
              <td>
                <Link href={`/coin/${coin.id}`} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-purple-500/20 flex items-center justify-center text-xs font-bold text-white/80">
                    {coin.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">{coin.symbol}</div>
                    <div className="text-[10px] text-white/35">{coin.cashtag}</div>
                  </div>
                </Link>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: coin.trend_score >= 85 ? '#a78bfa' : coin.trend_score >= 70 ? '#67e8f9' : '#9ca3af' }}>
                    {coin.trend_score.toFixed(1)}
                  </span>
                  <div className="score-bar">
                    <div className="score-bar-fill" style={{ width: `${coin.trend_score}%`, background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }} />
                  </div>
                </div>
              </td>
              <td>
                <span className={`text-sm font-medium ${coin.sentiment >= 75 ? 'stat-up' : coin.sentiment >= 50 ? 'text-yellow-400' : 'stat-down'}`}>
                  {coin.sentiment.toFixed(1)}%
                </span>
              </td>
              <td className="text-white/70 text-sm">{formatVolume(coin.mention_volume)}</td>
              <td>
                <span className="text-sm text-white/70">{coin.engagement_score.toFixed(1)}</span>
              </td>
              <td>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-white/60">{coin.authenticity_score.toFixed(0)}</span>
                  <div className="score-bar">
                    <div className="score-bar-fill" style={{ width: `${coin.authenticity_score}%`, background: coin.authenticity_score >= 75 ? '#10b981' : coin.authenticity_score >= 55 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-white/60">{coin.robustness_score.toFixed(0)}</span>
                  <div className="score-bar">
                    <div className="score-bar-fill" style={{ width: `${coin.robustness_score}%`, background: coin.robustness_score >= 70 ? '#06b6d4' : coin.robustness_score >= 50 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                </div>
              </td>
              <td><StageBadge stage={coin.hype_stage} /></td>
              <td><DirectionBadge direction={coin.predicted_direction} /></td>
              <td>
                <span className="text-xs text-white/60">{coin.confidence.toFixed(0)}%</span>
              </td>
              <td><RiskBadge label={coin.risk_label} /></td>
              <td>
                <div className="flex gap-1">
                  {coin.manipulation_flag && (
                    <span title="Manipulation Detected"><AlertTriangle size={12} className="text-red-400" /></span>
                  )}
                  {coin.pre_pump_signal && (
                    <span title="Pre-Pump Signal"><Zap size={12} className="text-purple-400" /></span>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
