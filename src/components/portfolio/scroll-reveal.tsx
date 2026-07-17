'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  className?: string;
  once?: boolean;
};

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 1.2,
  yOffset = 50,
  xOffset = 0,
  scale = 1,
  className = '',
  once = false,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: yOffset, 
        x: xOffset,
        scale: scale 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        scale: 1 
      }}
      viewport={{ once: once, margin: '-8%' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo for ultra-smooth buttery deceleration
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
