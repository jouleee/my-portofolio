'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck } from 'lucide-react';
import { ProjectType } from '@/components/portfolio/project-card';
import SpotlightCard from '@/components/portfolio/spotlight-card';

type ProjectsShowcaseProps = {
  projects: ProjectType[];
};

/**
 * Visual Frame 1: Aura Spatial Interface (3D / Spatial UI / Shaders)
 */
function AuraSpatialVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-zinc-950 via-[#070b19] to-[#040816] overflow-hidden flex items-center justify-center select-none p-4">
      {/* 3D Perspective Grid Plane */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.12)_1px,transparent_1px)] bg-[size:24px_24px] [transform:perspective(500px)_rotateX(55deg)_translateY(-10%)] origin-bottom pointer-events-none opacity-70"
      />

      {/* Holographic Concentric Rings & Core Glow */}
      <div aria-hidden="true" className="relative flex items-center justify-center">
        <div className="w-36 sm:w-44 md:w-50 aspect-square rounded-full border border-sky-400/20 animate-[spin_24s_linear_infinite] flex items-center justify-center">
          <div className="w-26 sm:w-32 md:w-38 aspect-square rounded-full border border-indigo-500/30 animate-[spin_16s_linear_infinite_reverse] flex items-center justify-center">
            <div className="w-18 sm:w-22 md:w-26 aspect-square rounded-full border border-cyan-300/40 border-dashed animate-pulse flex items-center justify-center">
              {/* Luminous Core Orb */}
              <div className="w-9 sm:w-11 aspect-square rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 blur-sm shadow-[0_0_28px_rgba(56,189,248,0.9)]" />
            </div>
          </div>
        </div>

        {/* Ambient Back-Bloom */}
        <div className="absolute inset-0 bg-sky-500/20 blur-[50px] rounded-full pointer-events-none" />
      </div>

      {/* Subtle Spatial HUD labels */}
      <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-space-grotesk font-semibold text-sky-400">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
        <span>SYS.RENDER // THREE.JS 60FPS</span>
      </div>

      <div className="absolute bottom-3 left-3 sm:bottom-3.5 sm:left-3.5 text-[9px] sm:text-[10px] font-space-grotesk text-foreground/60 flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08]">GLSL SHADERS</span>
        <span className="hidden sm:inline">12,400 PARTICLES</span>
      </div>

      <div className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 px-2 py-0.5 rounded-md bg-sky-400/10 border border-sky-400/20 text-[9px] sm:text-[10px] font-space-grotesk font-bold text-sky-300">
        WEBGL ACCELERATED
      </div>
    </div>
  );
}

/**
 * Visual Frame 2: Pulse Fintech Ecosystem (Real-Time Financial Dashboard / Analytics)
 */
function PulseFintechVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-zinc-950 via-[#03150d] to-[#020e09] overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 select-none">
      {/* Top HUD */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-emerald-500/20 text-[9px] sm:text-[10px] font-space-grotesk font-semibold text-emerald-400">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>LIVE STREAMING WEBSOCKETS</span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
          +18.42%
        </span>
      </div>

      {/* Center Simulated Financial Chart Wave */}
      <div className="relative my-auto w-full flex items-center justify-center">
        <svg
          viewBox="0 0 500 130"
          className="w-full h-20 sm:h-24 md:h-28 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d="M0 100 Q 70 35, 140 70 T 280 30 T 400 55 T 500 12 L 500 130 L 0 130 Z"
            fill="url(#pulseGradient)"
          />

          {/* Luminous Trend Line */}
          <path
            d="M0 100 Q 70 35, 140 70 T 280 30 T 400 55 T 500 12"
            stroke="url(#lineGlow)"
            strokeWidth="3"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
          />

          {/* Live Data Point Marker */}
          <circle cx="500" cy="12" r="4" fill="#34d399" className="animate-ping" />
          <circle cx="500" cy="12" r="3" fill="#10b981" />
        </svg>

        {/* Ambient Emerald Bloom */}
        <div className="absolute inset-0 bg-emerald-500/15 blur-[50px] rounded-full pointer-events-none" />
      </div>

      {/* Bottom Live Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 z-10 pt-1 border-t border-white/[0.06]">
        <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[8px] uppercase font-space-grotesk text-foreground/40 block">Volume</span>
          <span className="text-[10px] sm:text-xs font-bold font-syne text-foreground">$1,420,890</span>
        </div>
        <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[8px] uppercase font-space-grotesk text-foreground/40 block">Latency</span>
          <span className="text-[10px] sm:text-xs font-bold font-syne text-emerald-400">18ms Ultra-Fast</span>
        </div>
        <div className="hidden sm:block p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[8px] uppercase font-space-grotesk text-foreground/40 block">Auth</span>
          <span className="text-[10px] sm:text-xs font-bold font-syne text-foreground">OAuth 2.0 PKCE</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Frame 3: Nova Design System (Component System / Tokens / UI Architecture)
 */
function NovaDesignSystemVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-zinc-950 via-[#180d09] to-[#120704] overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 select-none">
      {/* Top HUD */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/20 text-[9px] sm:text-[10px] font-space-grotesk font-semibold text-amber-400">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>WCAG 2.1 AA COMPLIANT</span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
          42 TOKENS
        </span>
      </div>

      {/* Center UI Primitives Matrix Mockup */}
      <div className="relative my-auto w-full max-w-xs sm:max-w-sm mx-auto space-y-2 z-10">
        {/* Token Component Row 1: Buttons & Switch */}
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-lg bg-amber-400 text-zinc-950 font-space-grotesk font-bold text-[10px] shadow-[0_0_12px_rgba(245,158,11,0.4)]">
            Primary Button
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-foreground font-space-grotesk font-semibold text-[10px]">
            Secondary Glass
          </div>
          <div className="ml-auto w-8 h-4.5 rounded-full bg-amber-500/40 p-0.5 flex items-center justify-end border border-amber-400/40">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-300 shadow" />
          </div>
        </div>

        {/* Token Component Row 2: Color Palette Swatches */}
        <div className="grid grid-cols-4 gap-1.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-950 font-bold text-[8px] sm:text-[9px] font-space-grotesk shadow text-center">
            #f59e0b
          </div>
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 text-white font-bold text-[8px] sm:text-[9px] font-space-grotesk shadow text-center">
            #f43f5e
          </div>
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 text-white font-bold text-[8px] sm:text-[9px] font-space-grotesk shadow text-center">
            #8b5cf6
          </div>
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-600 text-zinc-950 font-bold text-[8px] sm:text-[9px] font-space-grotesk shadow text-center">
            #38bdf8
          </div>
        </div>

        {/* Token Component Row 3: Typography Specimen */}
        <div className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
          <span className="font-syne font-black text-xs sm:text-sm text-foreground tracking-tight">Aa Syne Display</span>
          <span className="text-[8px] sm:text-[9px] font-space-grotesk text-foreground/50">48px / Bold</span>
        </div>
      </div>

      {/* Ambient Amber Bloom */}
      <div className="absolute inset-0 bg-amber-500/12 blur-[50px] rounded-full pointer-events-none" />

      {/* Bottom Row */}
      <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-space-grotesk text-foreground/60 z-10 pt-1 border-t border-white/[0.06]">
        <span>npm i @nova/ui-primitives</span>
        <span className="text-amber-400 font-semibold">LOCKED DARK</span>
      </div>
    </div>
  );
}

/**
 * Renders the Visual Frame for a given project
 */
function ProjectVisualFrame({ project, index }: { project: ProjectType; index: number }) {
  // If an uploaded thumbnail exists, display the uploaded image
  if (project.thumbnail_url && project.thumbnail_url.trim().length > 0) {
    return (
      <div className="relative w-full h-full bg-zinc-950 overflow-hidden select-none">
        <Image
          src={project.thumbnail_url}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
          priority={index === 0}
        />
        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // Otherwise, render distinct high-fidelity visual frames by index / slug
  if (index === 0 || project.slug.includes('aura')) {
    return <AuraSpatialVisual />;
  }
  if (index === 1 || project.slug.includes('pulse')) {
    return <PulseFintechVisual />;
  }
  return <NovaDesignSystemVisual />;
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black font-syne text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-foreground/60 font-space-grotesk text-base">
            No projects published yet.
          </p>
        </div>
      </section>
    );
  }

  const totalProjects = Math.max(1, projects.length);

  // Parallax scroll tracking across the entire tall scroll track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Background watermark horizontal drift
  const xWatermark = useTransform(smoothProgress, [0, 1], ['5%', '-30%']);

  // Scrub position to determine active project frame with smooth dampening (immune to fast scroll tearing)
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(0.999, latest));
    const newIdx = Math.min(totalProjects - 1, Math.floor(clamped * totalProjects));
    if (newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  });

  const currentProject = projects[activeIndex] || projects[0];

  const techs = (currentProject?.project_technologies || [])
    .map((pt: any) => {
      if (typeof pt === 'string') return pt;
      if (pt?.technologies?.name) return pt.technologies.name;
      if (pt?.name) return pt.name;
      return null;
    })
    .filter((name: any): name is string => typeof name === 'string' && name.length > 0)
    .slice(0, 4);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative scroll-mt-28"
      // Height provides ample scroll scrubbing distance: 100vh per project frame
      style={{ height: `${totalProjects * 100}vh` }}
    >
      {/* Background Kinetic Typography Parallax Watermark */}
      <div
        aria-hidden="true"
        className="fixed top-1/3 inset-x-0 overflow-hidden pointer-events-none -z-10 select-none opacity-[0.03] dark:opacity-[0.04]"
      >
        <motion.div
          style={{ x: xWatermark }}
          className="whitespace-nowrap font-black font-syne text-[16vw] leading-none uppercase tracking-tighter"
        >
          PROJECTS • SELECTED WORKS • ARCHITECTURE • CODE
        </motion.div>
      </div>

      {/* Sticky Stage Viewport: Vertically centered in viewport with clearance below liquid navbar */}
      <div className="sticky top-0 h-svh flex flex-col justify-center pt-24 sm:pt-28 md:pt-30 pb-4 sm:pb-6 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="w-full max-w-5xl mx-auto flex flex-col">
          {/* Section Header: Clean title with proper clearance and zero clutter */}
          <div className="mb-3 sm:mb-4 text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-syne tracking-tight text-foreground">
              Featured Projects
            </h2>
            <p className="mt-1 text-xs sm:text-sm font-space-grotesk text-foreground/60 max-w-xl">
              Selected full-stack architectures, interactive 3D interfaces, and scalable engineering systems.
            </p>
          </div>

          {/* THE SINGLE UNIFIED SHOWCASE CARD (100% visible, perfectly proportioned, never clipped) */}
          <SpotlightCard
            enableTilt={true}
            spotlightColor="rgba(56, 189, 248, 0.14)"
            className="w-full rounded-2xl sm:rounded-3xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-4 sm:p-5 md:p-6 overflow-hidden transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">
              {/* LEFT / TOP: THE PROJECT VISUAL DISPLAY FRAME (Strictly 16:9 aspect-video) */}
              <div className="lg:col-span-7 relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-white/[0.08] shadow-[0_12px_28px_rgba(0,0,0,0.5)]">
                {/* Stack of All Project Frames with Cross-Fade Scrubbing */}
                {projects.map((proj, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <motion.div
                      key={proj.id}
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 1.03,
                        filter: isActive ? 'blur(0px)' : 'blur(4px)',
                      }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full will-change-[opacity,transform] transform-gpu"
                      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                    >
                      <ProjectVisualFrame project={proj} index={idx} />
                    </motion.div>
                  );
                })}
              </div>

              {/* RIGHT / BOTTOM: PROJECT DETAILS PANEL (Simple, clean, no badges or buttons) */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-center will-change-[opacity,transform]"
                  >
                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-syne text-foreground tracking-tight mb-2 sm:mb-3">
                      {currentProject.title}
                    </h3>

                    {/* Project Short Description */}
                    <p className="text-xs sm:text-sm lg:text-[14px] font-space-grotesk text-foreground/75 leading-relaxed mb-4 sm:mb-5 line-clamp-3 sm:line-clamp-4">
                      {currentProject.short_description}
                    </p>

                    {/* Technologies Stack Tags */}
                    {techs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {techs.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-xs font-space-grotesk font-medium text-foreground/85"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
