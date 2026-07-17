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
  speed = 25,
  direction = 'left',
  className = 'bg-brutalist-yellow text-brutalist-dark',
}: MarqueeProps) {
  const xFrom = direction === 'left' ? '0%' : '-50%';
  const xTo = direction === 'left' ? '-50%' : '0%';

  return (
    <div className={`relative w-full overflow-hidden brutalist-border-thin py-5 flex items-center ${className}`}>
      <motion.div
        className="flex whitespace-nowrap gap-12 text-3xl font-black uppercase tracking-wider font-syne pr-12"
        animate={{ x: [xFrom, xTo] }}
        transition={{
          ease: 'linear',
          duration: speed,
          repeat: Infinity,
        }}
      >
        {/* Render multiple items to fill wide screens */}
        {Array.from({ length: 4 }).map((_, blockIdx) => (
          <div key={blockIdx} className="flex items-center gap-12">
            {items.map((item, itemIdx) => (
              <div key={`${blockIdx}-${itemIdx}`} className="flex items-center gap-12">
                <span>{item}</span>
                <span className="w-4 h-4 bg-brutalist-pink rounded-full border-2 border-brutalist-dark dark:border-brutalist-light inline-block shadow-sm" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
