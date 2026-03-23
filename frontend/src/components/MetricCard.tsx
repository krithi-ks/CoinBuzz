'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  change?: number;
  icon: React.ReactNode;
  color: 'purple' | 'cyan' | 'green' | 'red' | 'orange' | 'blue';
  decimals?: number;
  animate?: boolean;
}

const colorMap = {
  purple: { bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.2)', icon: 'rgba(139,92,246,0.8)', glow: 'rgba(139,92,246,0.15)' },
  cyan: { bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)', icon: 'rgba(6,182,212,0.8)', glow: 'rgba(6,182,212,0.15)' },
  green: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', icon: 'rgba(16,185,129,0.8)', glow: 'rgba(16,185,129,0.15)' },
  red: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', icon: 'rgba(239,68,68,0.8)', glow: 'rgba(239,68,68,0.15)' },
  orange: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', icon: 'rgba(245,158,11,0.8)', glow: 'rgba(245,158,11,0.15)' },
  blue: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)', icon: 'rgba(59,130,246,0.8)', glow: 'rgba(59,130,246,0.15)' },
};

function useCountUp(target: number, duration = 1500, enabled = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) { setCount(target); return; }
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, enabled]);
  return count;
}

export default function MetricCard({ title, value, suffix = '', prefix = '', change, icon, color, decimals = 0, animate = true }: MetricCardProps) {
  const c = colorMap[color];
  const numVal = typeof value === 'number' ? value : parseFloat(String(value));
  const displayVal = useCountUp(numVal, 1400, animate && !isNaN(numVal));
  
  const formatted = isNaN(numVal) 
    ? value 
    : numVal >= 1000000 
      ? `${(displayVal / 1000000).toFixed(1)}M`
      : numVal >= 1000 
        ? `${(displayVal / 1000).toFixed(1)}K`
        : displayVal.toFixed(decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative p-4 rounded-2xl border overflow-hidden cursor-default group"
      style={{ background: 'rgba(10,10,18,0.8)', borderColor: c.border, backdropFilter: 'blur(20px)' }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      {/* Glow bg */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" 
           style={{ background: `radial-gradient(ellipse at 50% 0%, ${c.glow}, transparent 70%)` }} />
      
      <div className="relative z-10">
        {/* Icon + title */}
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs text-white/40 font-medium leading-tight">{title}</p>
          <div className="p-2 rounded-xl" style={{ background: c.bg }}>
            <div style={{ color: c.icon }}>{icon}</div>
          </div>
        </div>

        {/* Value */}
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-white tracking-tight" style={{fontFamily: 'Space Grotesk'}}>
            {prefix}{formatted}{suffix}
          </span>
        </div>

        {/* Change */}
        {change !== undefined && (
          <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${
            change > 0 ? 'stat-up' : change < 0 ? 'stat-down' : 'stat-neutral'
          }`}>
            {change > 0 ? <TrendingUp size={10} /> : change < 0 ? <TrendingDown size={10} /> : <Minus size={10} />}
            <span>{change > 0 ? '+' : ''}{change.toFixed(1)}% vs 24h</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
