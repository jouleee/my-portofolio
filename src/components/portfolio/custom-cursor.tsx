'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
      setIsTouchDevice(!hasFinePointer);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);

    if (isTouchDevice) return;

    // Track coordinates directly on GPU without triggering React state re-renders
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;
    let hasMoved = false;

    // Smooth physics lerp loop running at native screen refresh rate (60/120/144fps)
    const renderLoop = () => {
      if (hasMoved) {
        // High-responsiveness lerp factor: ultra-smooth, fluid follow with zero perceptible lag
        const lerp = 0.22;
        currentX += (targetX - currentX) * lerp;
        currentY += (targetY - currentY) * lerp;

        if (dotRef.current) {
          // Direct 1:1 hardware-accelerated tracking for the center precision dot (zero delay)
          dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
        }

        if (ringRef.current) {
          // Smooth fluid follower ring
          ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMoved) {
        currentX = e.clientX;
        currentY = e.clientY;
        hasMoved = true;
      }
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect interactive elements (links, buttons, clickable elements, spotlight cards)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.closest?.(
          'a, button, [role="button"], [data-cursor], input, textarea, select, .cursor-pointer, [tabindex="0"]'
        )
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.closest?.(
          'a, button, [role="button"], [data-cursor], input, textarea, select, .cursor-pointer, [tabindex="0"]'
        )
      ) {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', checkPointer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Follower Ring - Pure clean outline ring (No blur, no shadow, no background fill) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform bg-transparent shadow-none ${
          isClicking
            ? 'w-8 h-8 border border-white/70'
            : isHovered
            ? 'w-12 h-12 border border-white/50'
            : 'w-7 h-7 border border-white/30'
        }`}
        style={{
          transition:
            'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.22s',
        }}
      />

      {/* Center Precision Dot - Clean sharp white dot (No blur, no shadow) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform bg-white shadow-none ${
          isClicking ? 'w-1.5 h-1.5 opacity-70' : isHovered ? 'w-2 h-2 opacity-90' : 'w-1.5 h-1.5 opacity-80'
        }`}
        style={{
          transition:
            'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s',
        }}
      />
    </div>
  );
}
