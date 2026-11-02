'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent"
    >
      <motion.div
        className="h-full w-full bg-gradient-to-r from-sky-400 via-indigo-400 to-cyan-300 origin-left shadow-[0_0_12px_rgba(56,189,248,0.7)]"
        style={{ scaleX }}
      />
    </div>
  );
}
