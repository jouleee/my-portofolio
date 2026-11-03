'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import SpotlightCard from '@/components/portfolio/spotlight-card';
import {
  NextjsIcon,
  ReactIcon,
  TypeScriptIcon,
  NodejsIcon,
  GoIcon,
  PythonIcon,
  FlutterIcon,
  PostgresIcon,
  DockerIcon,
  GitIcon,
} from '@/components/portfolio/tech-icons';

type TechItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

// Exactly 10 Curated Core Tech Stacks (Zero Duplicates)
// Left Column: 5 items
const LEFT_STACK: TechItem[] = [
  { name: 'Next.js', icon: NextjsIcon },
  { name: 'TypeScript', icon: TypeScriptIcon },
  { name: 'Go (Golang)', icon: GoIcon },
  { name: 'Flutter', icon: FlutterIcon },
  { name: 'Docker', icon: DockerIcon },
];

// Right Column: 5 items
const RIGHT_STACK: TechItem[] = [
  { name: 'React.js', icon: ReactIcon },
  { name: 'Node.js', icon: NodejsIcon },
  { name: 'Python', icon: PythonIcon },
  { name: 'PostgreSQL', icon: PostgresIcon },
  { name: 'Git', icon: GitIcon },
];

function TechCardItem({ item }: { item: TechItem }) {
  const Icon = item.icon;
  return (
    <SpotlightCard
      enableTilt={true}
      spotlightColor="rgba(56, 189, 248, 0.12)"
      className="w-full p-3.5 sm:p-4.5 md:p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] hover:border-white/20 backdrop-blur-xl shadow-[0_12px_28px_rgba(0,0,0,0.45)] hover:shadow-[0_18px_36px_rgba(56,189,248,0.16)] transition-all duration-300 group select-none flex flex-col items-center justify-center text-center cursor-pointer transform-gpu"
    >
      {/* Prominent Centered Icon Plaque */}
      <div className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-300 shadow-inner">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-7.5 md:h-7.5 text-foreground/90 group-hover:text-foreground transition-colors" />
      </div>

      {/* Bold Tech Stack Name */}
      <span className="font-syne font-bold text-sm sm:text-base text-foreground tracking-tight group-hover:text-sky-300 transition-colors mt-2 sm:mt-2.5 text-center">
        {item.name}
      </span>
    </SpotlightCard>
  );
}

export default function About(_props: any) {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll scrub tracking across the tall scroll track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Clamp scroll progress to prevent edge jumps during high-velocity scrolls
  const clampedProgress = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  // Spring physics tuned for fast scroll protection: responsive, calm, zero overshoot
  const smoothProgress = useSpring(clampedProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Multi-axis scroll transformations with entry (0-6%) & exit (94-100%) resting buffers
  // Cards settle into position before unpinning, so fast scrolling never snaps or cuts off
  const yLeft = useTransform(smoothProgress, [0.06, 0.94], [20, -125], { clamp: true });
  const yRight = useTransform(smoothProgress, [0.06, 0.94], [-120, 25], { clamp: true });

  // Subtle lateral drift
  const xLeft = useTransform(smoothProgress, [0.06, 0.5, 0.94], [-12, 5, -8], { clamp: true });
  const xRight = useTransform(smoothProgress, [0.06, 0.5, 0.94], [12, -5, 8], { clamp: true });

  // Subtle zoom/scale through focal zone
  const scaleLeft = useTransform(smoothProgress, [0.06, 0.5, 0.94], [0.97, 1.025, 0.97], { clamp: true });
  const scaleRight = useTransform(smoothProgress, [0.06, 0.5, 0.94], [0.97, 1.025, 0.97], { clamp: true });

  // Subtle organic floating tilt
  const rotateLeft = useTransform(smoothProgress, [0.06, 0.94], [-0.6, 0.5], { clamp: true });
  const rotateRight = useTransform(smoothProgress, [0.06, 0.94], [0.6, -0.5], { clamp: true });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative scroll-mt-28"
      // Ample scroll track for controlled, calm scroll scrubbing
      style={{ height: '240vh' }}
    >
      {/* Sticky Stage Viewport: Vertically centered in screen with ample floating-nav clearance */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-6 px-4 sm:px-6 md:px-8 overflow-hidden bg-background">
        {/* Section Header (Above Cards - Title & Body Only, Placed completely clear below navbar) */}
        <div className="text-center mb-4 sm:mb-6 max-w-xl mx-auto px-4 z-20 shrink-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-syne tracking-tight text-foreground">
            Technical Stack
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base font-space-grotesk text-foreground/60 leading-relaxed">
            Core technologies, distributed systems, and architectural foundations.
          </p>
        </div>

        {/* 2-Column Asymmetric Ticker Stage with Top & Bottom Fade Masks (Proportionally sized, never cut off) */}
        <div className="relative w-full max-w-3xl sm:max-w-4xl mx-auto h-[380px] sm:h-[420px] md:h-[450px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] px-3 sm:px-6 z-10">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start h-full">
            {/* Left Column (5 Unique Stacks, Moves UP) */}
            <motion.div
              style={{
                y: yLeft,
                x: xLeft,
                scale: scaleLeft,
                rotateZ: rotateLeft,
              }}
              className="flex flex-col gap-3.5 sm:gap-4.5 will-change-transform transform-gpu"
            >
              {LEFT_STACK.map((item) => (
                <TechCardItem key={`left-${item.name}`} item={item} />
              ))}
            </motion.div>

            {/* Right Column (5 Unique Stacks, Moves DOWN with Asymmetric Stagger) */}
            <motion.div
              style={{
                y: yRight,
                x: xRight,
                scale: scaleRight,
                rotateZ: rotateRight,
              }}
              className="flex flex-col gap-3.5 sm:gap-4.5 md:pt-10 lg:pt-14 will-change-transform transform-gpu"
            >
              {RIGHT_STACK.map((item) => (
                <TechCardItem key={`right-${item.name}`} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
