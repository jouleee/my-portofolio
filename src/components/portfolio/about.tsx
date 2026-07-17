'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import TextReveal from '@/components/portfolio/text-reveal';
import ScrollReveal from '@/components/portfolio/scroll-reveal';
import avatarTransparent from '@/public/images/avatar_transparent.webp';

type Skill = {
  id: string;
  name: string;
  level: number;
  category: string;
};

type AboutProps = {
  profile: {
    full_name: string;
    title: string;
    bio: string;
    avatar_url: string | null;
  };
  skills: Skill[];
};

export default function About({ profile, skills }: AboutProps) {
  // Extract unique categories
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  // Accents for skill fill bars based on category
  const barColors: { [key: string]: string } = {
    Frontend: 'bg-brutalist-pink',
    Backend: 'bg-brutalist-blue',
    Design: 'bg-brutalist-yellow',
    Other: 'bg-brutalist-green',
  };

  return (
    <section id="about" className="py-20 md:py-32 border-b-[3px] border-brutalist-dark dark:border-brutalist-light relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <ScrollReveal yOffset={30}>
          <div className="mb-16">
            <span className="text-sm font-black uppercase tracking-widest text-brutalist-pink font-space-grotesk block mb-2">
              Who am I
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase font-syne tracking-tight">
              About Me
            </h2>
          </div>
        </ScrollReveal>

        {/* Main Grid: Avatar & Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Avatar Card (Left) */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal yOffset={45} delay={0.15} className="w-full max-w-sm">
              <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.8}
                dragTransition={{ bounceStiffness: 250, bounceDamping: 12 }}
                whileDrag={{ scale: 1.03, rotate: 2, zIndex: 30 }}
                whileHover={{ rotate: 1, scale: 1.01 }}
                className="relative w-full bg-brutalist-yellow rounded-2xl brutalist-border p-6 brutalist-shadow-black transition-[background-color,box-shadow] duration-200 cursor-grab active:cursor-grabbing pointer-events-auto"
              >
                {/* Avatar Portrait with Brutalist Grid Background */}
                <div className="relative aspect-square w-full brutalist-border rounded-xl bg-background overflow-hidden flex items-center justify-center select-none pointer-events-none">
                  <div className="absolute inset-0 opacity-15">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="grid-about" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.8" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid-about)" />
                    </svg>
                  </div>
                  
                  <Image
                    src={profile.avatar_url || avatarTransparent}
                    alt={profile.full_name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-cover z-10 select-none pointer-events-none"
                    draggable={false}
                  />
                </div>

                {/* Card Title Stamp */}
                <div className="mt-5 text-center font-space-grotesk text-brutalist-dark">
                  <h3 className="text-xl font-black uppercase">{profile.full_name}</h3>
                  <p className="text-xs font-bold text-brutalist-dark/80 mt-1 uppercase">{profile.title}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Biography Text (Right) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal yOffset={45} delay={0.25}>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 font-syne select-none">
                {"Building Software That Solves Real Business Problems".split(" ").map((word, wordIdx) => (
                  <span key={wordIdx} className="inline-block whitespace-nowrap mr-2.5">
                    {Array.from(word).map((char, charIdx) => {
                      const globalIdx = wordIdx * 8 + charIdx;
                      return (
                        <span
                          key={charIdx}
                          className="animate-text-wave"
                          style={{
                            animationDelay: `${globalIdx * 0.05}s`
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </h3>
              <TextReveal
                text={profile.bio}
                className="text-lg md:text-xl font-space-grotesk font-bold text-foreground/85 leading-relaxed"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
