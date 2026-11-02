'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminLogin } from '@/app/actions';
import { toast } from 'sonner';
import { Lock, Mail, Loader2, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await adminLogin({ email, password });
      if (res.success) {
        toast.success('Login successful! Welcome back.');
        setTimeout(() => {
          router.push('/admin/dashboard/profile');
          router.refresh();
        }, 600);
      } else {
        toast.error(res.error || 'Invalid email or password.');
      }
    } catch {
      toast.error('An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-background text-foreground overflow-hidden select-none">
      {/* Background Subtle Micro-Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-60"
      />

      {/* Ambient Radial Glowing Blooms behind the card */}
      <div
        aria-hidden="true"
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-sky-500/12 via-indigo-500/8 to-teal-400/8 blur-[120px] pointer-events-none -z-10 animate-soft-breathe"
      />

      {/* Main Glassmorphic Login Card */}
      <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/[0.08] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.65)] overflow-hidden">
        {/* Subtle Top Border Gradient Highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent pointer-events-none"
        />

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8 pt-2">
          <h1 className="text-3xl sm:text-4xl font-black font-syne text-foreground tracking-tight mb-2.5">
            Admin Access
          </h1>
          <p className="text-xs sm:text-sm font-space-grotesk text-foreground/60 leading-relaxed max-w-xs">
            Sign in with your Supabase credentials to manage content and projects.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email input field */}
          <div className="flex flex-col gap-2 group">
            <label className="text-xs font-space-grotesk font-bold uppercase tracking-wider text-foreground/70">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-4 h-4 text-foreground/40 transition-colors group-focus-within:text-sky-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@domain.com"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground font-space-grotesk text-sm outline-none transition-all placeholder:text-foreground/30"
              />
            </div>
          </div>

          {/* Password input field with Visibility Toggle */}
          <div className="flex flex-col gap-2 group">
            <label className="text-xs font-space-grotesk font-bold uppercase tracking-wider text-foreground/70">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-4 h-4 text-foreground/40 transition-colors group-focus-within:text-sky-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-sky-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-sky-400/20 text-foreground font-space-grotesk text-sm outline-none transition-all placeholder:text-foreground/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 p-1 rounded-lg text-foreground/40 hover:text-foreground/80 transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-full bg-foreground text-background font-space-grotesk font-bold text-xs sm:text-sm tracking-wide hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_6px_25px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Back Link to Home */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-space-grotesk font-medium text-foreground/50 hover:text-foreground transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
