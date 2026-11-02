'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger liquid glass effect as soon as user begins scrolling (> 20px)
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Introduction', id: 'intro' },
    { label: 'Stack & Focus', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 sm:top-5 z-40 w-full px-4 sm:px-8 lg:px-12 py-3 transition-all duration-300">
      <div
        className={`relative max-w-7xl mx-auto rounded-2xl sm:rounded-full px-6 sm:px-8 flex items-center justify-between transition-all duration-500 ease-out ${
          isScrolled
            ? 'py-2.5 sm:py-3 bg-zinc-950/40 backdrop-blur-3xl border border-white/[0.14] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.22),inset_0_-1px_1px_0_rgba(0,0,0,0.5),0_16px_40px_rgba(0,0,0,0.45),0_0_25px_rgba(56,189,248,0.06)]'
            : 'py-3.5 sm:py-4 bg-zinc-950/15 backdrop-blur-md border border-white/[0.04] shadow-none'
        }`}
      >
        {/* Liquid Glass Specular Surface Reflection */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 rounded-2xl sm:rounded-full bg-gradient-to-b from-white/[0.12] via-white/[0.02] to-transparent pointer-events-none transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle Chromatic Glass Refraction Sheen */}
        <div
          aria-hidden="true"
          className={`absolute -inset-px rounded-2xl sm:rounded-full bg-gradient-to-r from-sky-400/10 via-indigo-400/5 to-cyan-400/10 blur-sm pointer-events-none -z-10 transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative z-10 flex items-center gap-2 group font-syne font-black text-xl sm:text-2xl tracking-tight text-foreground cursor-pointer focus:outline-none"
          aria-label="Back to top"
        >
          <span className="relative">
            JOEL
          </span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="relative z-10 hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-4 py-2 text-xs lg:text-sm font-space-grotesk font-semibold tracking-wide text-foreground/75 hover:text-foreground hover:bg-white/[0.08] active:bg-white/[0.12] rounded-full transition-all duration-200 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Hamburger Trigger Only */}
        <div className="relative z-10 md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full border border-white/10 bg-white/[0.05] text-foreground hover:bg-white/[0.1] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Liquid Glass */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-zinc-950/70 backdrop-blur-3xl border border-white/[0.14] p-5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),0_25px_50px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-5 py-3.5 text-base font-space-grotesk font-semibold text-foreground/85 hover:text-foreground hover:bg-white/[0.08] rounded-2xl transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
