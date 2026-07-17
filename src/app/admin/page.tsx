'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/app/actions';
import { toast } from 'sonner';
import { Lock, Mail, Loader2, Sparkles } from 'lucide-react';
import Magnetic from '@/components/portfolio/magnetic';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        toast.success(res.simulated ? 'Welcome, Joel! (Simulation Mode)' : 'Login successful!');
        setTimeout(() => {
          router.push('/admin/dashboard');
          router.refresh();
        }, 800);
      } else {
        toast.error(res.error || 'Invalid credentials.');
      }
    } catch {
      toast.error('An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-background brutalist-border rounded-2xl p-8 brutalist-shadow-black dark:shadow-[4px_4px_0px_0px_#fdfdfc]">
        {/* Title branding */}
        <div className="text-center mb-8 font-space-grotesk">
          <h1 className="text-3xl font-black uppercase font-syne tracking-tight">Admin Portal</h1>
          <p className="text-sm font-bold text-foreground/50 mt-1 uppercase">Enter credentials to manage portfolio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email input field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase tracking-wider font-space-grotesk flex items-center gap-2">
              <Mail className="w-4 h-4 text-brutalist-pink" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@domain.com"
              className="w-full px-4 py-3 rounded-xl brutalist-border bg-background focus:bg-brutalist-yellow/10 focus:outline-none font-space-grotesk font-bold text-sm text-foreground"
            />
          </div>

          {/* Password input field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase tracking-wider font-space-grotesk flex items-center gap-2">
              <Lock className="w-4 h-4 text-brutalist-blue" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl brutalist-border bg-background focus:bg-brutalist-blue/10 focus:outline-none font-space-grotesk font-bold text-sm text-foreground"
            />
          </div>

          {/* Submit button */}
          <Magnetic>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-brutalist-yellow text-brutalist-dark brutalist-border font-syne font-black uppercase rounded-xl flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#0f0f0f] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0f0f0f] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
              data-cursor="pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Log In</span>
              )}
            </button>
          </Magnetic>
        </form>
      </div>
    </div>
  );
}
