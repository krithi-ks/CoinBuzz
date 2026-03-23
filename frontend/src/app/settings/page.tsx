'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { Sliders, Settings, Zap, Database, Play } from 'lucide-react';

export default function SettingsPage() {
  const { isDemo, toggleDemo } = useDemoMode();

  return (
    <div className="min-h-screen bg-[#050508]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-5 space-y-6 min-w-0 max-w-4xl mx-auto py-10">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{fontFamily: 'Space Grotesk'}}>Settings & Demo Control</h1>
            <p className="text-sm text-white/45">Configure alerts, API connects, and presentation modes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6">
              <div className="flex items-center gap-3 mb-4 text-purple-400">
                <Play size={20} />
                <h3 className="text-lg font-bold text-white">Presentation Mode</h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed mb-6">
                Enable this mode during hackathon pitches or investor demos. It simulates live, rapidly incoming data streams, animates metrics across the dashboard, and rotates high-severity alerts.
              </p>
              
              <div className="flex items-center justify-between p-4 rounded-xl border border-purple-500/20 bg-purple-500/05">
                <div>
                  <p className="text-sm font-bold text-white">Live Data Simulation</p>
                  <p className="text-xs text-white/40">Injects mock momentum to metrics</p>
                </div>
                <div onClick={toggleDemo} className={`toggle-track ${isDemo ? 'active' : ''}`}>
                  <div className="toggle-thumb" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass p-6 opacity-50 pointer-events-none">
                <div className="flex items-center gap-3 mb-4 text-cyan-400">
                  <Database size={20} />
                  <h3 className="text-lg font-bold text-white">Data Connections</h3>
                </div>
                <div className="space-y-3">
                  {['X/Twitter Enterprise API', 'Reddit Streaming API', 'Telegram Scraper (Custom)', 'On-Chain Node (Solana/Base)'].map(api => (
                    <div key={api} className="flex justify-between items-center text-xs">
                      <span className="text-white/70">{api}</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-white/40">Requires API Key</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-6 opacity-50 pointer-events-none">
                <div className="flex items-center gap-3 mb-4 text-orange-400">
                  <Zap size={20} />
                  <h3 className="text-lg font-bold text-white">Notification Webhooks</h3>
                </div>
                <div className="space-y-3 text-xs">
                  <input className="input-dark w-full" placeholder="Discord Webhook URL" disabled />
                  <input className="input-dark w-full" placeholder="Telegram Bot Token" disabled />
                  <button className="btn-secondary w-full">Save Endpoints</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
