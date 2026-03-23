'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { mockNarratives, mockCoins } from '@/lib/mockData';
import { TrendingUp, Users, Map, MoveRight } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-no-hover p-2.5 rounded-xl text-xs">
        <p className="text-white/40 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || '#a78bfa' }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrendsPage() {
  const [tab, setTab] = useState('narratives');

  const engagementData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}h`,
    organic: Math.round(100 + Math.random() * 50),
    bot_suspicious: Math.round(20 + Math.random() * 30),
  }));

  const platformData = [
    { name: 'X/Twitter', value: 55, color: '#3b82f6' },
    { name: 'Reddit', value: 25, color: '#ff4500' },
    { name: 'Telegram', value: 12, color: '#0088cc' },
    { name: 'Discord', value: 8, color: '#5865F2' },
  ];

  return (
    <div className="min-h-screen bg-[#050508]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-5 space-y-5 min-w-0">
          <div>
            <h1 className="text-xl font-bold text-white mb-1" style={{fontFamily: 'Space Grotesk'}}>Trends Intelligence</h1>
            <p className="text-xs text-white/35">Macro momentum, narrative spread, and engagement quality.</p>
          </div>

          <div className="flex gap-2 border-b border-white/05 pb-3">
            {[
              { id: 'narratives', label: 'Narrative Spread', icon: Map },
              { id: 'engagement', label: 'Engagement Quality', icon: Users },
              { id: 'momentum', label: 'Momentum Shifts', icon: TrendingUp },
            ].map(t => (
              <button
                key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                  tab === t.id ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30' : 'text-white/40 hover:text-white/70 hover:bg-white/05'
                }`}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'narratives' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockNarratives.map(n => (
                  <div key={n.id} className="glass p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1">{n.theme}</h3>
                        <p className="text-[10px] text-white/40">Active for {n.age_hours}h</p>
                      </div>
                      <span className={`badge ${n.velocity === 'Accelerating' || n.velocity === 'Rising' ? 'badge-green' : 'badge-orange'}`}>
                        {n.velocity}
                      </span>
                    </div>
                    
                    <p className="text-xs text-white/60 leading-relaxed mb-4">{n.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex -space-x-2">
                        {n.coins.map(c => (
                          <div key={c} className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-[8px] font-bold text-white/80">
                            {c.substring(0,2)}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-white/40">
                        <span>{n.origin}</span>
                        <MoveRight size={10} className="text-purple-400" />
                        <span>{n.spread_to.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'engagement' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="glass-no-hover p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Organic vs Suspicious Engagement</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={engagementData} margin={{ top: 5, right: 0, bottom: 0, left: -25 }}>
                    <defs>
                      <linearGradient id="org" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="sus" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="organic" stackId="1" stroke="#10b981" fill="url(#org)" name="Organic Users" />
                    <Area type="monotone" dataKey="bot_suspicious" stackId="1" stroke="#ef4444" fill="url(#sus)" name="Suspicious Activity" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-no-hover p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Platform Origin Split (Macro)</h3>
                <div className="flex items-center h-[250px]">
                  <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                      <Pie data={platformData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                        {platformData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="w-[50%] space-y-3 pl-4 border-l border-white/05">
                    {platformData.map(p => (
                      <div key={p.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
                          <span className="text-white/60">{p.name}</span>
                        </div>
                        <span className="font-medium text-white/90">{p.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'momentum' && (
            <div className="glass p-8 text-center text-white/40">
              <TrendingUp size={32} className="mx-auto mb-3 opacity-50" />
              <p>Cross-Platform Momentum Shift data analyzing...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
