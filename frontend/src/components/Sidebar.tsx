'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, TrendingUp, AlertTriangle, Cpu, 
  FlaskConical, Search, Settings, BookOpen, Zap, GitFork, Star
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/trends', icon: TrendingUp, label: 'Trends' },
  { href: '/alerts', icon: AlertTriangle, label: 'Alerts' },
  { href: '/forensics', icon: Search, label: 'Forensics' },
  { href: '/copilot', icon: Cpu, label: 'Copilot' },
  { href: '/innovation', icon: FlaskConical, label: 'Innovation Lab' },
  { href: '/architecture', icon: GitFork, label: 'Architecture' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 border-r border-white/[0.05] py-4 flex flex-col hidden lg:flex overflow-y-auto">
      <div className="px-3 space-y-0.5">
        <p className="section-label mb-3 px-2">Navigation</p>
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`nav-link ${pathname.startsWith(href) ? 'active' : ''}`}
          >
            <Icon size={14} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto px-3">
        <div className="glass-no-hover p-3 rounded-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <Zap size={12} className="text-purple-400" />
            <span className="text-xs font-semibold text-white/70">CoinBuzz Pro</span>
          </div>
          <p className="text-[10px] text-white/35 leading-relaxed">
            Real-time intelligence, hype forensics, and AI copilot.
          </p>
        </div>
      </div>
    </aside>
  );
}
