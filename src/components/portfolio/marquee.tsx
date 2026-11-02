'use client';

import { motion } from 'framer-motion';

type MarqueeProps = {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
};

export default function Marquee({
  items,
  speed = 30,
  direction = 'left',
  className = 'bg-white/[0.02] border-y border-white/[0.08] text-foreground/80',
}: MarqueeProps) {
  const xFrom = direction === 'left' ? '0%' : '-50%';
  const xTo = direction === 'left' ? '-50%' : '0%';

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden py-4 sm:py-6 flex items-center select-none ${className}`}
    >
      <motion.div
        className="flex whitespace-nowrap gap-10 sm:gap-14 text-sm sm:text-base font-semibold uppercase tracking-widest font-space-grotesk pr-10 sm:pr-14"
        animate={{ x: [xFrom, xTo] }}
        transition={{
          ease: 'linear',
          duration: speed,
          repeat: Infinity,
        }}
      >
        {/* Render multiple items to fill wide screens */}
        {Array.from({ length: 4 }).map((_, blockIdx) => (
          <div key={blockIdx} className="flex items-center gap-10 sm:gap-14">
            {items.map((item, itemIdx) => (
              <div key={`${blockIdx}-${itemIdx}`} className="flex items-center gap-10 sm:gap-14">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.8)] inline-block" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
