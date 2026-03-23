'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Send, Loader2, Zap, BookOpen, TrendingUp, Microscope } from 'lucide-react';
import { CopilotResponse } from '@/types';

const EXAMPLE_PROMPTS = [
  "Why is PEPE trending right now?",
  "Is DOGE hype organic or manipulated?",
  "Which coin has the highest retail trap risk?",
  "Compare PEPE and FLOKI for opportunity vs risk.",
  "Which coin is under-noticed but gaining conviction?",
  "What if influencer posts are removed from BONK?",
];

const MODES = [
  { id: 'beginner', label: 'Beginner', icon: BookOpen, desc: 'Simple, safe explanations' },
  { id: 'trader', label: 'Trader', icon: TrendingUp, desc: 'Signals and risk insights' },
  { id: 'research', label: 'Research', icon: Microscope, desc: 'Deep forensic analysis' },
];

interface CopilotPanelProps {
  onQuery: (prompt: string, mode: string) => Promise<CopilotResponse | null>;
}

export default function CopilotPanel({ onQuery }: CopilotPanelProps) {
  const [messages, setMessages] = useState<Array<{role: 'user'|'ai'; content: string; data?: CopilotResponse}>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('trader');

  async function handleSend(prompt?: string) {
    const text = prompt || input.trim();
    if (!text) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const res = await onQuery(text, mode);
      if (res) {
        setMessages(m => [...m, { role: 'ai', content: res.answer, data: res }]);
      }
    } finally {
      setLoading(false);
    }
  }

  const labelColors: Record<string, string> = {
    'Early Opportunity': '#10b981',
    'High Late Entry Risk': '#ef4444',
    'Watch Closely': '#f59e0b',
    'Wait for Confirmation': '#9ca3af',
    'General Briefing': '#8b5cf6',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mode selector */}
      <div className="flex gap-2 mb-4">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
              mode === m.id
                ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                : 'border-white/08 text-white/40 hover:border-white/15 hover:text-white/60'
            }`}
          >
            <m.icon size={11} />
            {m.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 min-h-[200px] max-h-[400px] pr-1">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Cpu size={32} className="mx-auto mb-3 text-purple-500/40" />
            <p className="text-sm text-white/30 mb-4">CoinBuzz Intelligence Copilot</p>
            <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
              {EXAMPLE_PROMPTS.slice(0, 4).map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p)}
                  className="text-left text-xs text-white/45 px-3 py-2 rounded-xl border border-white/06 hover:border-purple-500/25 hover:text-white/65 hover:bg-purple-500/05 transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3.5 ${msg.role === 'user' ? 'chat-user ml-8' : 'chat-ai mr-4'}`}
            >
              {msg.role === 'user' ? (
                <p className="text-sm text-white/80">{msg.content}</p>
              ) : (
                <div>
                  {msg.data && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ 
                        background: `${labelColors[msg.data.label] || '#8b5cf6'}18`,
                        color: labelColors[msg.data.label] || '#a78bfa',
                        border: `1px solid ${labelColors[msg.data.label] || '#8b5cf6'}30`
                      }}>
                        {msg.data.label}
                      </span>
                      <span className="text-xs text-white/30">Confidence: {msg.data.confidence.toFixed(0)}%</span>
                    </div>
                  )}
                  <p className="text-sm text-white/75 leading-relaxed mb-2">{msg.content}</p>
                  {msg.data && (
                    <div className="mt-2 pt-2 border-t border-white/05 space-y-1">
                      <div className="flex flex-wrap gap-1">
                        {msg.data.key_drivers?.map((d, j) => (
                          <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{d}</span>
                        ))}
                      </div>
                      {msg.data.risk_notes && (
                        <p className="text-[10px] text-white/35 mt-1">⚠ {msg.data.risk_notes}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="chat-ai p-3.5 mr-4">
            <div className="flex items-center gap-2 text-white/40">
              <Loader2 size={14} className="animate-spin" />
              <span className="text-xs">Analyzing signals...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          className="input-dark flex-1 text-sm"
          placeholder="Ask about any coin, trend, or signal..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="btn-primary px-3 py-2 disabled:opacity-40"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
