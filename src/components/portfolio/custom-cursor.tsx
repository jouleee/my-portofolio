'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function CustomCursor() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      document.documentElement.classList.add('use-default-cursor');
    } else {
      document.documentElement.classList.remove('use-default-cursor');
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    // Check if device is mobile or touch
    const checkTouch = () => {
      const touchDevice = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(touchDevice);
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        setIsVisible(true);
        gsap.to(cursor, { scale: 1, duration: 0.15 });
      }
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      gsap.to(cursor, { scale: 0, duration: 0.15 });
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      gsap.to(cursor, { scale: 1, duration: 0.15 });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverTarget = target.closest('[data-cursor]');
      
      if (hoverTarget) {
        const type = hoverTarget.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorText('VIEW');
          gsap.to(cursor, {
            width: 80,
            height: 80,
            backgroundColor: '#ffe600',
            borderColor: 'var(--border-color)',
            borderWidth: 3,
            borderRadius: '50%',
            scale: 1,
            color: '#0f0f0f',
            duration: 0.2,
          });
        } else if (type === 'pink-view') {
          setCursorText('GO!');
          gsap.to(cursor, {
            width: 80,
            height: 80,
            backgroundColor: '#ff007a',
            borderColor: 'var(--border-color)',
            borderWidth: 3,
            borderRadius: '50%',
            scale: 1,
            color: '#ffffff',
            duration: 0.2,
          });
        } else if (type === 'pointer' || type === 'link') {
          setCursorText('');
          gsap.to(cursor, {
            width: 45,
            height: 45,
            backgroundColor: 'transparent',
            borderColor: 'var(--border-color)',
            borderWidth: 3,
            scale: 1,
            duration: 0.2,
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverTarget = target.closest('[data-cursor]');
      
      if (hoverTarget) {
        setCursorText('');
        gsap.to(cursor, {
          width: 20,
          height: 20,
          backgroundColor: '#ff007a',
          borderColor: 'transparent',
          borderWidth: 0,
          scale: 1,
          duration: 0.2,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible, isMobile, isAdmin]);

  if (isMobile || isAdmin) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-5 h-5 bg-brutalist-pink rounded-full pointer-events-none z-50 flex items-center justify-center text-[10px] font-bold text-white transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <span className="font-space-grotesk tracking-widest">{cursorText}</span>
    </div>
  );
}
