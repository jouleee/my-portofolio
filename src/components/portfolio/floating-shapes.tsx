'use client';

import { motion } from 'framer-motion';

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-60 dark:opacity-30">
      {/* Background Soft Blobs */}
      <div 
        className="absolute w-72 h-72 rounded-full bg-brutalist-pink blur-[80px] top-[10%] left-[-5%] animate-pulse" 
        style={{ animationDuration: '8s' }} 
      />
      <div 
        className="absolute w-80 h-80 rounded-full bg-brutalist-blue blur-[100px] bottom-[20%] right-[-10%] animate-pulse" 
        style={{ animationDuration: '12s' }} 
      />
      <div 
        className="absolute w-64 h-64 rounded-full bg-brutalist-yellow blur-[90px] top-[40%] right-[15%] animate-pulse" 
        style={{ animationDuration: '10s' }} 
      />

      {/* Playful Vector Shapes - Floating, Rotating, and Draggable */}
      <motion.div 
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.3}
        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
        whileHover={{ scale: 1.1, rotate: 45 }}
        animate={{
          y: [0, -25, 15, -10, 0],
          x: [0, 20, -15, 10, 0],
          rotate: [12, 192, 372],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[25%] left-[10%] hidden md:block pointer-events-auto cursor-grab"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="stroke-brutalist-dark dark:stroke-brutalist-light stroke-[3]">
          <rect x="5" y="5" width="30" height="30" rx="4" fill="#ffe600" />
        </svg>
      </motion.div>

      <motion.div 
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.3}
        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
        whileHover={{ scale: 1.1, rotate: -45 }}
        animate={{
          y: [0, 30, -15, 10, 0],
          x: [0, -25, 20, -10, 0],
          rotate: [-12, -192, -372],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[65%] left-[8%] hidden md:block pointer-events-auto cursor-grab"
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="stroke-brutalist-dark dark:stroke-brutalist-light stroke-[3]">
          <path d="M25 5 L45 40 L5 40 Z" fill="#0057ff" />
        </svg>
      </motion.div>

      <motion.div 
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.3}
        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        animate={{
          y: [0, -15, 25, -20, 0],
          x: [0, -20, 15, -15, 0],
          rotate: [45, 225, 405],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[15%] right-[8%] hidden md:block pointer-events-auto cursor-grab"
      >
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" className="stroke-brutalist-dark dark:stroke-brutalist-light stroke-[3]">
          <circle cx="22.5" cy="22.5" r="18" fill="#ff007a" />
        </svg>
      </motion.div>

      <motion.div 
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.3}
        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
        whileHover={{ scale: 1.1, rotate: 60 }}
        animate={{
          y: [0, 20, -20, 15, 0],
          x: [0, 25, -20, 10, 0],
          rotate: [30, 210, 390],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[25%] right-[12%] hidden md:block pointer-events-auto cursor-grab"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="stroke-brutalist-dark dark:stroke-brutalist-light stroke-[3]">
          <rect x="8" y="8" width="24" height="24" rx="2" fill="#00e575" />
        </svg>
      </motion.div>
    </div>
  );
}

