'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import ScrollReveal from '@/components/portfolio/scroll-reveal';
import SpotlightCard from '@/components/portfolio/spotlight-card';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
};

type ExperienceProps = {
  experiences: Experience[];
};

function ExperienceItem({
  exp,
  idx,
  isHovered,
  onHover,
  onLeave,
}: {
  exp: Experience;
  idx: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  // Track when this specific milestone enters the user's active reading viewport
  const isInView = useInView(itemRef, {
    margin: '-18% 0px -22% 0px',
    amount: 0.25,
  });

  const isHighlighted = isInView || isHovered;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -35 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.8,
        delay: idx * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative group cursor-pointer"
    >
      {/* Horizontal connecting beam from vertical timeline to the card */}
      <div
        aria-hidden="true"
        className={`absolute top-9 -left-8 sm:-left-16 w-8 sm:w-16 h-px transition-all duration-500 pointer-events-none ${
          isHighlighted
            ? 'bg-gradient-to-r from-sky-400 via-sky-400/50 to-sky-400/10 shadow-[0_0_10px_rgba(56,189,248,0.8)]'
            : 'bg-white/[0.06]'
        }`}
      />

      {/* Timeline Node Dot (titik) positioned exactly on the vertical line */}
      <div
        className={`absolute -left-8 sm:-left-16 -translate-x-1/2 top-7 w-5 h-5 rounded-full bg-zinc-950 border-2 transition-all duration-500 flex items-center justify-center ${
          isHighlighted
            ? 'border-sky-400 scale-125 shadow-[0_0_24px_rgba(56,189,248,1)] z-20 ring-4 ring-sky-400/20'
            : 'border-white/20 z-10 group-hover:border-sky-400/70'
        }`}
      >
        {/* Soft radar pulse wave ring when actively in view */}
        {isHighlighted && (
          <span
            aria-hidden="true"
            className="absolute -inset-2.5 rounded-full border border-sky-400/60 animate-ping opacity-60 pointer-events-none"
          />
        )}
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isHighlighted
              ? 'bg-sky-400 shadow-[0_0_10px_#38bdf8] scale-110'
              : 'bg-white/30 group-hover:bg-sky-400/60'
          }`}
        />
      </div>

      {/* Luminous Ambient Back-Bloom behind highlighted card */}
      <div
        aria-hidden="true"
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-transparent blur-xl -z-10 transition-opacity duration-500 pointer-events-none ${
          isHighlighted ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Modern Minimalist Glass Card with Active Spotlight & Glow */}
      <SpotlightCard
        enableTilt={true}
        spotlightColor={isHighlighted ? 'rgba(56, 189, 248, 0.22)' : 'rgba(56, 189, 248, 0.12)'}
        className={`p-7 sm:p-9 rounded-3xl transition-all duration-500 backdrop-blur-xl ${
          isHighlighted
            ? 'bg-zinc-900/80 border border-sky-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(56,189,248,0.12)] scale-[1.01]'
            : 'bg-zinc-900/40 border border-white/[0.08] hover:border-white/20 shadow-xl'
        }`}
      >
        {/* Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 font-space-grotesk ${
              isHighlighted
                ? 'bg-sky-400/20 text-sky-300 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                : 'bg-sky-400/10 text-sky-400/80 border border-sky-400/20'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{exp.start_date} — {exp.end_date}</span>
          </span>

          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium font-space-grotesk transition-colors duration-300 ${
              isHighlighted ? 'text-foreground/75' : 'text-foreground/50'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{exp.location}</span>
          </span>
        </div>

        {/* Role & Company */}
        <h3
          className={`text-2xl sm:text-3xl font-bold font-syne tracking-tight mb-2 transition-colors duration-300 ${
            isHighlighted ? 'text-white' : 'text-foreground'
          }`}
        >
          {exp.role}
        </h3>
        <div
          className={`text-base font-semibold font-space-grotesk mb-5 flex items-center gap-2 transition-colors duration-300 ${
            isHighlighted ? 'text-sky-300' : 'text-sky-400'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>{exp.company}</span>
        </div>

        {/* Description */}
        <p
          className={`text-base font-space-grotesk leading-relaxed transition-colors duration-300 ${
            isHighlighted ? 'text-foreground/90' : 'text-foreground/70'
          }`}
        >
          {exp.description}
        </p>
      </SpotlightCard>
    </motion.div>
  );
}

export default function Experience({ experiences }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeExpId, setActiveExpId] = useState<string | null>(null);

  // Parallax scroll progress for timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 35%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const scaleY = smoothProgress;
  const xWatermark = useTransform(smoothProgress, [0, 1], ['-10%', '15%']);

  return (
    <section id="experience" className="py-16 sm:py-24 md:py-32 lg:py-36 relative overflow-hidden scroll-mt-28">
      {/* Background Parallax Watermark Text */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 inset-x-0 overflow-hidden pointer-events-none -z-10 select-none opacity-[0.03] dark:opacity-[0.04]"
      >
        <motion.div
          style={{ x: xWatermark }}
          className="whitespace-nowrap font-black font-syne text-[16vw] leading-none uppercase tracking-tighter"
        >
          EXPERIENCE • MILESTONES • CAREER • IMPACT
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <ScrollReveal yOffset={25}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-syne tracking-tight text-foreground">
              Work Experience
            </h2>
            <p className="mt-5 text-base sm:text-lg font-space-grotesk text-foreground/70 leading-relaxed">
              Milestone achievements illuminate dynamically as each experience scrolls into active view.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative pl-8 sm:pl-16 ml-3 sm:ml-8 max-w-5xl mx-auto">
          {/* Base timeline background track */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-4 bottom-4 w-[2px] bg-white/[0.08]"
          />

          {/* Dynamic Scroll-Filled Glowing Line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute left-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-sky-400 via-indigo-400 to-cyan-300 origin-top shadow-[0_0_16px_rgba(56,189,248,0.9)]"
          />

          {/* Experience Cards */}
          <div className="space-y-12 sm:space-y-16">
            {!experiences || experiences.length === 0 ? (
              <p className="text-foreground/50 font-space-grotesk py-8">
                No work experience added yet. Add experiences in the admin dashboard.
              </p>
            ) : (
              experiences.map((exp, idx) => (
                <ExperienceItem
                  key={exp.id}
                  exp={exp}
                  idx={idx}
                  isHovered={activeExpId === exp.id}
                  onHover={() => setActiveExpId(exp.id)}
                  onLeave={() => setActiveExpId(null)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
