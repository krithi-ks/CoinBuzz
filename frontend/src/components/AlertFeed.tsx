'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert } from '@/types';

interface AlertFeedProps {
  alerts: Alert[];
  isDemo?: boolean;
}

const severityStyles = {
  critical: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', dot: '#ef4444', label: 'CRITICAL' },
  high:     { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', dot: '#f59e0b', label: 'HIGH' },
  medium:   { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)', dot: '#8b5cf6', label: 'MEDIUM' },
  low:      { bg: 'rgba(6,182,212,0.08)',  border: 'rgba(6,182,212,0.25)',  dot: '#06b6d4', label: 'LOW' },
};

function formatTime(ts: string) {
  const d = new Date(ts);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function AlertFeed({ alerts, isDemo = false }: AlertFeedProps) {
  const [visible, setVisible] = useState(alerts);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setVisible(alerts);
  }, [alerts]);

  // Demo rotation
  useEffect(() => {
    if (!isDemo) return;
    const t = setInterval(() => {
      setIdx(i => (i + 1) % alerts.length);
    }, 4000);
    return () => clearInterval(t);
  }, [isDemo, alerts.length]);

  const displayAlerts = isDemo 
    ? [...alerts.slice(idx), ...alerts.slice(0, idx)].slice(0, 5)
    : alerts.slice(0, 5);

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {displayAlerts.map((alert) => {
          const s = severityStyles[alert.severity] || severityStyles.low;
          return (
            <motion.div
              key={alert.id + idx}
              initial={{ opacity: 0, x: -12, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-xl border cursor-default"
              style={{ background: s.bg, borderColor: s.border }}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-base leading-none mt-0.5">{alert.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-white/80">{alert.coin}</span>
                    <span className="text-[10px] font-semibold" style={{ color: s.dot }}>{alert.type}</span>
                    <span className="ml-auto text-[10px] text-white/30">{formatTime(alert.timestamp)}</span>
                  </div>
                  <p className="text-xs text-white/55 leading-relaxed">{alert.message}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
