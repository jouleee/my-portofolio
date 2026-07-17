'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { adminLogout } from '@/app/actions';
import { toast } from 'sonner';
import { LayoutDashboard, FolderKanban, LogOut, ArrowLeft, Menu, X, Sparkles, Briefcase } from 'lucide-react';
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
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/dashboard/projects', icon: FolderKanban },
    { name: 'Experiences', path: '/admin/dashboard/experiences', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-300">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 border-b-[3px] border-brutalist-dark dark:border-brutalist-light bg-background z-30">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-syne font-black uppercase text-xl">
          <Sparkles className="w-5 h-5 text-brutalist-pink" />
          PORTAL
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-xl brutalist-border-thin bg-background text-foreground"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Panel */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-background border-r-[3px] border-brutalist-dark dark:border-brutalist-light flex flex-col justify-between p-6 z-20 transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Logo stamp */}
          <Link
            href="/"
            className="flex items-center gap-2 font-syne font-black uppercase text-2xl pb-6 border-b-2 border-dashed border-border-color/20"
          >
            <div className="w-8 h-8 rounded-lg bg-brutalist-yellow border-2 border-brutalist-dark flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brutalist-dark" />
            </div>
            <span>PORTAL.</span>
          </Link>

          {/* Navigation link stacks */}
          <nav className="space-y-4 font-space-grotesk">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold brutalist-border-thin shadow-[2px_2px_0px_0px_var(--border-color)] transition-all ${
                    isActive
                      ? 'bg-brutalist-pink text-white translate-x-[-1px] translate-y-[-1px] shadow-[3.5px_3.5px_0px_0px_var(--border-color)]'
                      : 'bg-background hover:bg-muted dark:hover:bg-muted/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom controls */}
        <div className="space-y-4 font-space-grotesk">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold brutalist-border-thin bg-background hover:bg-muted dark:hover:bg-muted/10 shadow-[2px_2px_0px_0px_var(--border-color)]"
          >
            <ArrowLeft className="w-5 h-5" />
            View Portfolio
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold brutalist-border-thin bg-brutalist-yellow hover:bg-brutalist-pink hover:text-white text-brutalist-dark transition-colors shadow-[2px_2px_0px_0px_#0f0f0f] cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen p-6 md:p-10 overflow-y-auto bg-muted/5">
        {children}
      </main>
    </div>
  );
}
