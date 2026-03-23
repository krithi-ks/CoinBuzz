'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { mockForensics, mockCoins } from '@/lib/mockData';
import { Shield, Brain, GitFork, Crosshair, TrendingUp, AlertTriangle } from 'lucide-react';
import { ForensicsData } from '@/types';

export default function ForensicsPage() {
  const [selectedCoin, setSelectedCoin] = useState('pepe');
  const data: ForensicsData | undefined = mockForensics[selectedCoin];
  const coins = mockCoins.filter(c => mockForensics[c.id]);

  return (
    <div className="min-h-screen bg-[#050508]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-5 space-y-5 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white mb-1" style={{fontFamily: 'Space Grotesk'}}>Hype Forensics Master Engine</h1>
              <p className="text-xs text-white/35">Deconstructing origin, authenticity, and manipulation.</p>
            </div>
            
            <div className="flex gap-2">
              {coins.map(c => (
                <button
                  key={c.id} onClick={() => setSelectedCoin(c.id)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    selectedCoin === c.id ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-transparent text-white/40 border-white/05 hover:bg-white/05'
                  }`}
                >
                  {c.symbol}
                </button>
              ))}
            </div>
          </div>

          {!data ? (
            <div className="glass p-12 text-center text-white/40">Select a coin to view forensic data.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Left Column */}
              <div className="space-y-5">
                {/* Forensic Verdict */}
                <div className="glass-no-hover p-6 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.05))', borderColor: 'rgba(16,185,129,0.2)' }}>
                  <div className="flex items-start gap-4">
                    <Brain className="text-emerald-400 mt-1 shrink-0" size={24} />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-2">Master Forensics Verdict</h3>
                      <p className="text-sm text-white/80 leading-relaxed mb-4">{data.forensic_verdict}</p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-500/10">
                        <div>
                          <p className="text-[10px] text-emerald-400/60 uppercase tracking-widest mb-1">Likely Trigger Event</p>
                          <p className="text-xs text-white/70">{data.likely_trigger_event}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-emerald-400/60 uppercase tracking-widest mb-1">Decay Forecast</p>
                          <p className="text-sm font-bold text-emerald-300">{data.decay_forecast_days} days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authenticity Timeline */}
                <div className="glass-no-hover p-5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield size={16} className="text-cyan-400" />
                    <h3 className="text-sm font-semibold text-white">Event-to-Hype Causality (Authenticity impact)</h3>
                  </div>
                  <div className="relative pl-4 space-y-4 border-l border-white/10 ml-2">
                    {data.authenticity_events.map((e, i) => (
                      <div key={i} className="relative">
                        <div className={`absolute -left-5 h-2 w-2 rounded-full border border-[#050508] ${e.authenticity_delta > 0 ? 'bg-green-400' : 'bg-red-400'}`} style={{ top: '6px' }} />
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-mono text-white/30">{e.time}</span>
                            <p className="text-xs text-white/70 mt-0.5">{e.event}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${e.authenticity_delta > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {e.authenticity_delta > 0 ? '+' : ''}{e.authenticity_delta} auth
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                {/* Concentration & Origin */}
                <div className="glass-no-hover p-5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Crosshair size={16} className="text-purple-400" />
                    <h3 className="text-sm font-semibold text-white">Attention Concentration & Origin</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-end mb-1">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">Concentration Index</p>
                        <p className="text-sm font-bold gradient-text-purple">{data.concentration_index}/100</p>
                      </div>
                      <div className="w-full h-1.5 bg-white/05 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${data.concentration_index}%` }} />
                      </div>
                      <p className="text-xs text-white/50">{data.concentration_verdict}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/05">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Origin Platform</p>
                        <p className="text-xs text-white/80">{data.hype_origin_platform}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Origin Account Type</p>
                        <p className="text-xs text-white/80">{data.hype_origin_account_type}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Narrative Mutations */}
                <div className="glass-no-hover p-5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <GitFork size={16} className="text-orange-400" />
                    <h3 className="text-sm font-semibold text-white">Narrative Mutation Tracker</h3>
                  </div>
                  <div className="space-y-2">
                    {data.narrative_mutations.map((m, i) => (
                      <div key={i} className="flex gap-3 text-xs glass-no-hover p-2.5 rounded-xl border-dashed">
                        <span className="font-mono text-white/30 shrink-0 mt-0.5">{m.time}</span>
                        <span className="text-white/70">{m.narrative}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warnings */}
                {data.manipulation_signals.length > 0 && (
                  <div className="glass-no-hover p-4 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                    <div className="flex items-center gap-2 mb-2 text-red-400">
                      <AlertTriangle size={14} />
                      <h4 className="text-xs font-bold uppercase tracking-wider">Manipulation Flags Detected</h4>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      {data.manipulation_signals.map((s, i) => (
                        <li key={i} className="text-xs text-red-300/80">{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
