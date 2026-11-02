'use client';

import Magnetic from '@/components/portfolio/magnetic';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/portfolio/icons';

export default function Footer() {
  const links = [
    { platform: 'Github', url: 'https://github.com/jouleee', icon: GithubIcon },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/juliandwi', icon: LinkedinIcon },
    { platform: 'Instagram', url: 'https://instagram.com/juliandwii', icon: InstagramIcon },
    { platform: 'Email', url: 'mailto:julian.dsatrio@gmail.com', icon: Mail },
  ];

  return (
    <footer className="py-16 border-t border-black/5 dark:border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left column: branding & copyright */}
        <div className="font-space-grotesk text-center md:text-left">
          <p className="text-sm sm:text-base font-bold text-foreground/80">
            © {new Date().getFullYear()} Joel.
          </p>
          <p className="text-xs text-foreground/40 mt-1.5 font-medium">
            Next.js 16 • React 19 • Tailwind CSS • Framer Motion Parallax
          </p>
        </div>

        {/* Center column: social buttons */}
        <div className="flex items-center gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Magnetic key={link.platform}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center bg-white/50 dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/10 text-foreground/80 hover:text-foreground transition-all cursor-pointer shadow-sm hover:scale-105"
                  aria-label={link.platform}
                >
                  <Icon className="w-4 h-4" />
                </a>
              </Magnetic>
            );
          })}
        </div>

        {/* Right column: back to top */}
        <div>
          <Magnetic>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center bg-white/50 dark:bg-white/[0.02] hover:bg-foreground hover:text-background text-foreground transition-all cursor-pointer shadow-sm hover:scale-105"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
