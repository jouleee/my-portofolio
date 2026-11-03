'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import FloatingShapes from '@/components/portfolio/floating-shapes';
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/portfolio/icons';
import avatar8b from '@/public/images/avatar_8b.webp';

type ProfileType = {
  full_name: string;
  title: string;
  bio: string;
  years_experience?: string;
  avatar_url: string | null;
  resume_url?: string;
};

type HeroProps = {
  profile?: ProfileType;
};

export default function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax scroll setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Kinetic typography watermark in background
  const xWatermark = useTransform(smoothProgress, [0, 1], ['0%', isMobile ? '-12%' : '-22%']);
  
  // Moderate vertical parallax for avatar
  const yPhoto = useTransform(smoothProgress, [0, 1], [0, isMobile ? 35 : 75]);
  const rotatePhoto = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : -2]);
  const scalePhoto = useTransform(smoothProgress, [0, 1], [1, 0.96]);

  // Floating Status badge parallax offset
  const yBadgeStatus = useTransform(smoothProgress, [0, 1], [0, isMobile ? -25 : -65]);

  // Text content drift
  const yContent = useTransform(smoothProgress, [0, 1], [0, isMobile ? 15 : 35]);
  const opacityFade = useTransform(smoothProgress, [0, 0.95], [1, 0.2]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const name = profile?.full_name || 'Joel';
  const role = profile?.title || 'Lead Software Engineer & Full Stack Architect';
  const bio = profile?.bio || 'Building premium web experiences at the intersection of high-fidelity interaction, elegant visual design, and clean scalable code. Award-winning aesthetics meets peak performance.';

  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative min-h-[94svh] flex flex-col justify-center overflow-x-clip px-6 sm:px-10 lg:px-16 pt-10 pb-16 md:py-20 lg:py-24"
    >
      <FloatingShapes />

      {/* Background Kinetic Typography Parallax Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 inset-x-0 overflow-hidden pointer-events-none -z-10 select-none opacity-[0.035] dark:opacity-[0.045]"
      >
        <motion.div
          style={{ x: xWatermark }}
          className="whitespace-nowrap font-black font-syne text-[14vw] leading-none uppercase tracking-tighter"
        >
          JOEL • ARCHITECT • DEVELOPER • CREATIVE
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          style={{ opacity: opacityFade }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center"
        >
          {/* LEFT COLUMN: Clean 8-Bit Avatar Frame */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <motion.div
              style={{
                y: yPhoto,
                rotateZ: rotatePhoto,
                scale: scalePhoto,
              }}
              className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px]"
            >
              {/* Silky Smooth Ambient Radial Diffusion behind the avatar card */}
              <div
                aria-hidden="true"
                className="absolute -inset-8 sm:-inset-12 bg-gradient-to-tr from-sky-500/14 via-indigo-500/10 to-cyan-400/10 rounded-full blur-[90px] sm:blur-[130px] -z-10 animate-soft-breathe pointer-events-none select-none"
              />

              {/* Clean Modern Frosted Glass Frame for Avatar with Smooth Rim Glow */}
              <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-gradient-to-b from-zinc-800/40 via-zinc-900/60 to-zinc-950/85 border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_35px_rgba(56,189,248,0.06)] backdrop-blur-xl group select-none">
                {/* Subtle Retro Micro-Grid Background */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none opacity-40"
                />

                {/* The 8-Bit Avatar Image - Razor Sharp & Pixel Perfect */}
                <div className="relative w-full h-full p-4 flex items-center justify-center">
                  <Image
                    src={avatar8b}
                    alt={`${name} Avatar`}
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 340px"
                    className="object-contain p-4 z-10 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105 [image-rendering:pixelated]"
                    draggable={false}
                  />
                </div>

                {/* Subtle Bottom Vignette Gradient */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/70 via-background/20 to-transparent pointer-events-none z-15"
                />
              </div>

              {/* Parallax Floating Badge: Availability Status (Bottom-Left) */}
              <motion.div
                style={{ y: yBadgeStatus }}
                className="absolute -bottom-4 -left-3 sm:-left-5 z-20 px-3.5 py-2 rounded-2xl bg-zinc-900/90 dark:bg-zinc-950/90 backdrop-blur-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex items-center gap-2.5 select-none"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-beacon absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <div>
                  <span className="text-[10px] block font-space-grotesk text-foreground/50 uppercase tracking-wider font-semibold">Status</span>
                  <span className="text-xs font-space-grotesk font-bold text-foreground tracking-wide">
                    Available for work
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Personal Introduction (Clean, Minimal, Direct) */}
          <motion.div
            style={{ y: yContent }}
            className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-2"
          >
            {/* Direct Personal Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-syne tracking-tight text-foreground leading-[1.1] mb-3 sm:mb-4">
              Hi, I'm <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">{name}.</span>
            </h1>

            {/* Title / Role */}
            <p className="text-lg sm:text-xl md:text-2xl font-space-grotesk font-bold text-foreground/90 mb-4 sm:mb-5">
              {role}
            </p>

            {/* Introduction Paragraph */}
            <p className="text-sm sm:text-base md:text-lg font-space-grotesk text-foreground/75 leading-relaxed max-w-2xl mb-8">
              {bio}
            </p>

            {/* Primary Action Buttons & Social Links */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-7 py-3.5 rounded-full bg-foreground text-background font-space-grotesk font-bold text-xs sm:text-sm tracking-wide hover:opacity-90 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_6px_25px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
              >
                <span>View Selected Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-foreground border border-white/[0.1] font-space-grotesk font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              >
                Get In Touch
              </button>

              {/* Direct Social Links */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href="https://github.com/jouleee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-foreground/80 hover:text-foreground transition-all hover:-translate-y-0.5"
                  aria-label="GitHub profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/juliandwi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-foreground/80 hover:text-foreground transition-all hover:-translate-y-0.5"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="mailto:julian.dsatrio@gmail.com"
                  className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-foreground/80 hover:text-foreground transition-all hover:-translate-y-0.5"
                  aria-label="Send email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Cue Indicator */}
      <motion.button
        onClick={() => scrollToSection('skills')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-12 sm:mt-16 flex flex-col items-center gap-2 text-foreground/40 hover:text-foreground/80 transition-colors cursor-pointer group mx-auto"
        aria-label="Scroll to Skills & Stack"
      >
        <span className="text-[10px] uppercase font-space-grotesk tracking-widest font-semibold group-hover:tracking-wider transition-all">
          Scroll Down
        </span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.button>
    </section>
  );
}
