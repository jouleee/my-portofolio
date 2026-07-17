'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/portfolio/scroll-reveal';

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

export default function Experience({ experiences }: ExperienceProps) {
  // Colorful badges for dates
  const badgeColors = [
    'bg-brutalist-pink text-white',
    'bg-brutalist-yellow text-brutalist-dark',
    'bg-brutalist-blue text-white',
    'bg-brutalist-green text-brutalist-dark',
  ];

  return (
    <section id="experience" className="py-20 md:py-32 border-b-[3px] border-brutalist-dark dark:border-brutalist-light bg-muted/10 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <ScrollReveal yOffset={30}>
          <div className="mb-16">
            <span className="text-sm font-black uppercase tracking-widest text-brutalist-pink font-space-grotesk block mb-2">
              My Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase font-syne tracking-tight">
              Work Experience
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline body */}
        <div className="relative border-l-[3px] border-brutalist-dark dark:border-brutalist-light pl-6 md:pl-10 ml-4 max-w-4xl">
          {experiences.map((exp, idx) => {
            const dateBadgeClass = badgeColors[idx % badgeColors.length];
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-8%' }}
                transition={{ 
                  duration: 1.0, 
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1] // ultra-smooth cubic-bezier deceleration
                }}
                className="relative mb-16 last:mb-0"
              >
                {/* Timeline center node */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-background brutalist-border flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-brutalist-pink" />
                </div>

                {/* Timeline Card */}
                <div className="bg-background brutalist-border rounded-xl p-6 brutalist-shadow-black hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--border-color)] transition-all duration-300">
                  {/* Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className={`px-3.5 py-1 text-xs font-black uppercase tracking-wider rounded-md brutalist-border-thin font-space-grotesk ${dateBadgeClass}`}>
                      {exp.start_date} — {exp.end_date}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/60 font-space-grotesk">
                      {exp.location}
                    </span>
                  </div>

                  {/* Titles */}
                  <h3 className="text-2xl font-black uppercase tracking-tight font-syne mb-1">
                    {exp.role}
                  </h3>
                  <h4 className="text-md font-bold uppercase tracking-wide text-brutalist-pink font-space-grotesk mb-4">
                    {exp.company}
                  </h4>

                  {/* Body description */}
                  <p className="text-sm font-space-grotesk text-foreground/80 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
