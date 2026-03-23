'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AlertFeed from '@/components/AlertFeed';
import { mockAlerts } from '@/lib/mockData';
import { AlertTriangle, Filter } from 'lucide-react';

export default function AlertsPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? mockAlerts.filter(a => a.severity === filter) : mockAlerts;

  const counts = {
    all: mockAlerts.length,
    critical: mockAlerts.filter(a => a.severity === 'critical').length,
    high: mockAlerts.filter(a => a.severity === 'high').length,
    medium: mockAlerts.filter(a => a.severity === 'medium').length,
    low: mockAlerts.filter(a => a.severity === 'low').length,
  };

  return (
    <div className="min-h-screen bg-[#050508]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-5 space-y-5 min-w-0 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white mb-1" style={{fontFamily: 'Space Grotesk'}}>Live Intelligence Alerts</h1>
              <p className="text-xs text-white/35">Real-time signals, warnings, and opportunities.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-4 border-b border-white/05 overflow-x-auto">
            <Filter size={14} className="text-white/30 mr-2" />
            <button onClick={() => setFilter(null)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${!filter ? 'bg-white/10 text-white border-white/20' : 'bg-transparent text-white/40 border-white/05 hover:bg-white/05'}`}>
              All ({counts.all})
            </button>
            <button onClick={() => setFilter('critical')} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${filter === 'critical' ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-transparent text-red-400/60 border-red-500/20 hover:bg-red-500/10'}`}>
              Critical ({counts.critical})
            </button>
            <button onClick={() => setFilter('high')} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${filter === 'high' ? 'bg-orange-500/20 text-orange-300 border-orange-500/40' : 'bg-transparent text-orange-400/60 border-orange-500/20 hover:bg-orange-500/10'}`}>
              High Risk ({counts.high})
            </button>
            <button onClick={() => setFilter('medium')} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${filter === 'medium' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-transparent text-purple-400/60 border-purple-500/20 hover:bg-purple-500/10'}`}>
              Opportunities ({counts.medium})
            </button>
          </div>

          <div className="glass-no-hover p-4">
            <AlertFeed alerts={filtered} />
          </div>
        </main>
      </div>
    </div>
  );
}
