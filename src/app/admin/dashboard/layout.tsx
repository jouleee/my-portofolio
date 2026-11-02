'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { adminLogout } from '@/app/actions';
import { toast } from 'sonner';
import { FolderKanban, LogOut, ArrowLeft, Menu, X, Sparkles, Briefcase, User } from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    const res = await adminLogout();
    if (res.success) {
      toast.success('Logged out successfully.');
      router.push('/admin');
      router.refresh();
    }
  };

  const navItems = [
    { name: 'Profile & Hero', path: '/admin/dashboard/profile', icon: User },
    { name: 'Projects', path: '/admin/dashboard/projects', icon: FolderKanban },
    { name: 'Experiences', path: '/admin/dashboard/experiences', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground selection:bg-sky-500/20 selection:text-sky-300">
      {/* Background Subtle Micro-Grid */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10 opacity-70"
      />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.08] z-30 sticky top-0">
        <Link href="/admin/dashboard/profile" className="flex items-center gap-2.5 font-syne font-black text-lg tracking-tight">
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>JOEL<span className="text-sky-400">.</span>ADMIN</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground hover:bg-white/[0.08] transition-colors cursor-pointer"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Panel */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-zinc-950/85 backdrop-blur-2xl border-r border-white/[0.08] flex flex-col justify-between p-6 z-20 transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-7">
          {/* Brand Logo Header */}
          <Link
            href="/admin/dashboard/profile"
            className="flex items-center gap-3 font-syne font-black text-xl tracking-tight text-foreground pb-6 border-b border-white/[0.06] group"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.2)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="block leading-none">PORTAL<span className="text-sky-400">.</span></span>
              <span className="text-[10px] font-space-grotesk font-semibold text-foreground/40 uppercase tracking-widest block mt-1">Management Hub</span>
            </div>
          </Link>

          {/* Navigation link stacks */}
          <nav className="space-y-1.5 font-space-grotesk">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-300 border border-sky-400/30 shadow-[0_0_20px_rgba(56,189,248,0.12)]'
                      : 'text-foreground/60 hover:text-foreground hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-foreground/40'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom controls */}
        <div className="space-y-2.5 font-space-grotesk pt-4 border-t border-white/[0.06]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-foreground/60 hover:text-foreground hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-foreground/40 group-hover:-translate-x-0.5 transition-transform" />
            <span>View Portfolio</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-red-400/80 hover:text-red-300 hover:bg-red-500/10 border border-red-500/15 hover:border-red-500/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400/70" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen p-6 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
