'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingShapes from '@/components/portfolio/floating-shapes';
import Magnetic from '@/components/portfolio/magnetic';
import { ArrowDown } from 'lucide-react';
import Marquee from '@/components/portfolio/marquee';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const roles = [
    'Software Engineer',
    'Full-Stack Developer',
    'SaaS Builder',
    'Product Builder',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden py-12 md:py-24"
    >
      {/* Dynamic Background Patterns */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-30" />
      
      {/* Mouse Spotlight Glow */}
      <div
        className="absolute inset-0 -z-15 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-glow), transparent 80%)`,
        }}
      />
      <FloatingShapes />

      {/* Hero Body Content */}
      <div className="max-w-5xl mx-auto px-6 text-center flex-1 flex flex-col justify-center items-center">
        {/* Playful Category Accents */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-8 h-10 items-center"
        >
          <div className="relative overflow-hidden h-8 px-4 py-1 flex items-center justify-center rounded-full bg-brutalist-pink text-brutalist-dark brutalist-border-thin text-xs font-black uppercase tracking-widest font-space-grotesk rotate-[-2deg] select-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="inline-block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Dynamic Big Typography Header */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter mb-6 font-syne leading-none select-none"
        >
          {Array.from("I'm ").map((char, index) => (
            <motion.span
              key={`im-${index}`}
              className="inline-block"
              data-cursor="pointer"
              whileHover={{ 
                y: -12, 
                scale: 1.1,
                rotate: index % 2 === 0 ? 8 : -8,
                transition: { type: 'spring', stiffness: 300, damping: 8 } 
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          <span className="relative inline-block text-brutalist-blue dark:text-brutalist-yellow px-1">
            {Array.from("Joel").map((char, index) => (
              <motion.span
                key={`joel-${index}`}
                className="inline-block"
                data-cursor="pointer"
                whileHover={{ 
                  y: -15, 
                  scale: 1.15,
                  rotate: index % 2 === 0 ? -10 : 10,
                  transition: { type: 'spring', stiffness: 400, damping: 8 } 
                }}
              >
                {char}
              </motion.span>
            ))}
            <span className="absolute left-0 right-0 -bottom-2 h-4 overflow-hidden pointer-events-none">
              <svg
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                className="w-[200%] h-full text-brutalist-pink fill-none stroke-current stroke-[6] overflow-visible"
              >
                <motion.path
                  d="M 0 10 C 25 0, 25 20, 50 10 C 75 0, 75 20, 100 10 C 125 0, 125 20, 150 10 C 175 0, 175 20, 200 10"
                  animate={{ x: [0, '-50%'] }}
                  transition={{
                    ease: 'linear',
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </svg>
            </span>
          </span>
        </motion.h1>

        {/* Short introduction paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg md:text-2xl font-space-grotesk font-bold max-w-2xl text-center mb-10 text-foreground/95"
        >
          I'm a Software Engineer specializing in full-stack web development, enterprise applications, and scalable business systems.
        </motion.p>

        {/* CTA Buttons with Magnetic effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          <Magnetic>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 rounded-2xl bg-brutalist-yellow text-brutalist-dark font-syne font-black uppercase brutalist-border shadow-[5px_5px_0px_0px_#0f0f0f] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_#0f0f0f] transition-all cursor-pointer"
              data-cursor="pointer"
            >
              View Projects
            </button>
          </Magnetic>

          <Magnetic>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 rounded-2xl bg-background text-foreground font-syne font-black uppercase brutalist-border shadow-[5px_5px_0px_0px_var(--border-color)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_var(--border-color)] transition-all cursor-pointer"
              data-cursor="pointer"
            >
              Contact Me
            </button>
          </Magnetic>
        </motion.div>

        {/* Smooth Scroll Indicator */}
        <motion.button
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full brutalist-border-thin flex items-center justify-center bg-background text-foreground hover:bg-brutalist-pink hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to About"
          data-cursor="pointer"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}
