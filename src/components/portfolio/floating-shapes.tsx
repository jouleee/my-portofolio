'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingShapes() {
  const { scrollY } = useScroll();

  // Subtle differential parallax shifts for depth without mobile lag
  const yOrb1 = useTransform(scrollY, [0, 1000], [0, -120]);
  const yOrb2 = useTransform(scrollY, [0, 1000], [0, 80]);
  const yOrb3 = useTransform(scrollY, [0, 1000], [0, -60]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none"
    >
      {/* Subtle modern dark grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_25%,#000_70%,transparent_100%)] opacity-70" />

      {/* Top primary ambient light bloom */}
      <motion.div
        style={{ y: yOrb1 }}
        className="absolute top-[-8%] left-[15%] sm:left-[25%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-transparent blur-[90px] sm:blur-[130px] animate-pulse-glow"
      />

      {/* Secondary ambient glow */}
      <motion.div
        style={{ y: yOrb2 }}
        className="absolute top-[40%] right-[-5%] sm:right-[10%] w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full bg-gradient-to-tr from-cyan-500/8 via-blue-500/6 to-transparent blur-[80px] sm:blur-[120px] animate-ambient-float"
      />

      {/* Deep bottom subtle accent */}
      <motion.div
        style={{ y: yOrb3 }}
        className="absolute bottom-[10%] left-[-5%] sm:left-[5%] w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full bg-gradient-to-tr from-indigo-500/8 via-purple-500/5 to-transparent blur-[80px] sm:blur-[120px]"
      />
    </div>
  );
}
