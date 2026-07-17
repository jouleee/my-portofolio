'use client';

import { useTheme } from '@/components/portfolio/theme-provider';
import { Sun, Moon, Sparkles } from 'lucide-react';
import Magnetic from '@/components/portfolio/magnetic';
import { motion } from 'framer-motion';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group font-syne font-black text-2xl uppercase tracking-tighter cursor-pointer"
          data-cursor="pointer"
        >
          <span>JOEL.</span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-space-grotesk font-bold">
          {['about', 'experience', 'projects', 'contact'].map((sec) => (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              className="text-sm uppercase tracking-wider relative py-1 cursor-pointer select-none after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brutalist-pink hover:after:w-full after:transition-all"
            >
              {Array.from(sec).map((char, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  data-cursor="pointer"
                  whileHover={{
                    y: -4,
                    scale: 1.15,
                    rotate: idx % 2 === 0 ? 6 : -6,
                    transition: { type: 'spring', stiffness: 400, damping: 8 }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </button>
          ))}
        </nav>

        {/* Theme Toggle & CTA */}
        <div className="flex items-center gap-4">
          <Magnetic>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl brutalist-border-thin bg-brutalist-light dark:bg-brutalist-dark hover:bg-brutalist-yellow dark:hover:bg-brutalist-pink transition-colors shadow-sm cursor-pointer"
              aria-label="Toggle theme"
              data-cursor="pointer"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-brutalist-dark dark:text-brutalist-light" />
              ) : (
                <Sun className="w-5 h-5 text-brutalist-dark dark:text-brutalist-light" />
              )}
            </button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
