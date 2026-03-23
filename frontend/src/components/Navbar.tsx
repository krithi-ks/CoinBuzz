'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { 
  Zap, Bell, Search, ChevronDown, Activity
} from 'lucide-react';

export default function Navbar() {
  const { isDemo, toggleDemo } = useDemoMode();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-white/[0.06] bg-[#050508]/80 backdrop-blur-xl flex items-center px-4 gap-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 min-w-[160px]">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
          <Zap size={14} className="text-white" />
        </div>
        <span className="font-bold text-sm tracking-tight gradient-text" style={{fontFamily: 'Space Grotesk'}}>
          CoinBuzz
        </span>
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-md relative hidden sm:block">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input 
          className="input-dark pl-8 py-1.5 text-sm h-8"
          placeholder="Search coins, narratives, signals..."
        />
      </div>

      <div className="flex-1" />

      {/* Live indicator */}
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/50">
        <div className="live-dot" />
        <span>Live</span>
      </div>

      {/* Demo toggle */}
      <button 
        onClick={toggleDemo}
        className={`hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all ${
          isDemo 
            ? 'bg-purple-500/15 border-purple-500/30 text-purple-300' 
            : 'border-white/10 text-white/40 hover:border-white/20'
        }`}
      >
        <Activity size={11} />
        {isDemo ? 'Demo ON' : 'Demo OFF'}
      </button>

      {/* Nav links */}
      <nav className="hidden lg:flex items-center gap-1 text-xs">
        {[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/trends', label: 'Trends' },
          { href: '/forensics', label: 'Forensics' },
          { href: '/copilot', label: 'Copilot' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              pathname === href
                ? 'bg-purple-500/15 text-purple-300'
                : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg hover:bg-white/[0.04] transition text-white/50 hover:text-white/80">
        <Bell size={15} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
      </button>
    </header>
  );
}
