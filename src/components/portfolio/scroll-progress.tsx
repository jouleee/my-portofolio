'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[6px] bg-brutalist-pink z-50 origin-left border-b-2 border-brutalist-dark dark:border-brutalist-light"
      style={{ scaleX }}
    />
  );
}
