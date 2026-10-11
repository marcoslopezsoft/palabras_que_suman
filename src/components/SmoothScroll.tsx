'use client';

import React, { useRef, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import type Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

// Top Scroll Progress Bar driven directly by Lenis tick events with zero React re-renders
function LenisScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useLenis((lenis) => {
    if (barRef.current) {
      const p = Math.min(Math.max(lenis.progress || 0, 0), 1);
      barRef.current.style.transform = `scaleX(${p})`;
    }
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-amber-400 origin-left shadow-xs shadow-purple-400/40 will-change-transform"
        style={{
          transform: 'scaleX(0)',
        }}
      />
    </div>
  );
}

// Global Lenis Instance Holder for non-hook anchor calls
let globalLenisInstance: Lenis | null = null;

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  const lenisOptions = {
    lerp: 0.1, // Responsive inertial momentum factor
    duration: 1.1, // Scroll transition duration in seconds
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration curve
    orientation: 'vertical' as const,
    gestureOrientation: 'vertical' as const,
    smoothWheel: true,
    wheelMultiplier: 1.0,
    syncTouch: false, // DO NOT hijack native touch scroll on mobile devices (prevents freezes & jank)
    touchMultiplier: 0,
    infinite: false,
    autoRaf: true,
  };

  return (
    <ReactLenis
      root
      options={lenisOptions}
      ref={(instance) => {
        if (instance?.lenis) {
          lenisRef.current = instance.lenis;
          globalLenisInstance = instance.lenis;
          if (typeof window !== 'undefined') {
            (window as unknown as { __lenis?: Lenis }).__lenis = instance.lenis;
          }
        }
      }}
    >
      <LenisScrollProgress />
      {children}
    </ReactLenis>
  );
}

/**
 * Helper to smoothly scroll to any element or anchor with custom offset and duration
 */
export const scrollToElement = (
  target: string | HTMLElement,
  offset: number = -70,
  duration: number = 1.4
) => {
  if (typeof window === 'undefined') return;

  const lenis = globalLenisInstance || (window as unknown as { __lenis?: Lenis }).__lenis;

  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  // Native fallback if Lenis is not yet mounted
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/**
 * Custom React Hook for programmatic Lenis smooth scroll
 */
export function useScrollTo() {
  const lenis = useLenis();

  return (target: string | HTMLElement, offset: number = -70, duration: number = 1.4) => {
    if (lenis) {
      lenis.scrollTo(target, {
        offset,
        duration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      scrollToElement(target, offset, duration);
    }
  };
}
