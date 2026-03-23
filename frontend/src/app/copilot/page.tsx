'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import CopilotPanel from '@/components/CopilotPanel';
import { api } from '@/lib/api';

export default function CopilotPage() {
  return (
    <div className="min-h-screen bg-[#050508] flex flex-col">
      <Navbar />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-5 min-w-0 flex flex-col items-center">
          <div className="w-full max-w-4xl text-center mb-6 mt-4">
            <h1 className="text-2xl font-bold text-white mb-2" style={{fontFamily: 'Space Grotesk'}}>Explainable <span className="gradient-text">AI Copilot</span></h1>
            <p className="text-sm text-white/45">Ask complex questions about meme coin hype, forensics, cross-platform spread, and risk profiles.</p>
          </div>

          <div className="w-full max-w-4xl flex-1 glass p-6 flex flex-col min-h-0">
            <CopilotPanel onQuery={(prompt, mode) => api.copilot.query(prompt, mode)} />
          </div>
        </main>
      </div>
    </div>
  );
}
