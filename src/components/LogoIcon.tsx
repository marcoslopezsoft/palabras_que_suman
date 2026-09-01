'use client';

import React from 'react';

interface LogoIconProps {
  className?: string;
  size?: number;
  variant?: 'gradient' | 'monochrome' | 'white';
}

export default function LogoIcon({
  className = 'w-10 h-10',
  size = 40,
  variant = 'gradient',
}: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Isotipo Palabras Que Suman"
    >
      <defs>
        {/* Main Brand Gradient (Rose -> Purple -> Amber) */}
        <linearGradient id="pqs-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Page / Wing Left Gradient */}
        <linearGradient id="pqs-left-wing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>

        {/* Page / Wing Right Gradient */}
        <linearGradient id="pqs-right-wing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>

        {/* Ribbon / Bookmark Center Gradient */}
        <linearGradient id="pqs-ribbon" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="60%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>

        {/* Subtle Shadow Filter */}
        <filter id="pqs-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#9333EA" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Background Soft Glow Disc */}
      <circle cx="50" cy="50" r="44" fill={variant === 'white' ? 'rgba(255,255,255,0.15)' : 'url(#pqs-primary-grad)'} fillOpacity={variant === 'white' ? 1 : 0.12} />

      {/* 
        SYMBOL CONCEPT:
        1. Open Book / Spreading Wings (Left & Right curves representing knowledge & education)
        2. Central Bookmark Ribbon flowing vertically 
        3. Stylized PLUS SIGN (+) in the center representing "SUMAN" (Multiplicar y sumar)
        4. Star Sparkle at the apex (Inspiration & Guidance for girls)
      */}

      {/* Left Book Page / Wing */}
      <path
        d="M50 78 C35 70, 20 72, 14 76 C14 46, 22 28, 50 36 Z"
        fill={variant === 'white' ? '#FFFFFF' : 'url(#pqs-left-wing)'}
        fillOpacity={variant === 'white' ? 0.9 : 0.85}
        filter="url(#pqs-glow)"
      />

      {/* Right Book Page / Wing */}
      <path
        d="M50 78 C65 70, 80 72, 86 76 C86 46, 78 28, 50 36 Z"
        fill={variant === 'white' ? '#FFFFFF' : 'url(#pqs-right-wing)'}
        fillOpacity={variant === 'white' ? 0.75 : 0.95}
        filter="url(#pqs-glow)"
      />

      {/* Central Bookmark Ribbon (Vertical hanging ribbon with swallowtail notch at bottom) */}
      <path
        d="M44 20 L56 20 L56 82 L50 76 L44 82 Z"
        fill={variant === 'white' ? '#FB7185' : 'url(#pqs-ribbon)'}
        filter="url(#pqs-glow)"
      />

      {/* The PLUS (+) Symbol in the core of the ribbon — representing "SUMAR" */}
      <g transform="translate(50, 48)">
        {/* Horizontal bar of the plus */}
        <rect x="-11" y="-2.5" width="22" height="5" rx="2.5" fill="#FFFFFF" />
        {/* Vertical bar of the plus */}
        <rect x="-2.5" y="-11" width="5" height="22" rx="2.5" fill="#FFFFFF" />
      </g>

      {/* Floating Sparkle / Star of Inspiration at the top */}
      <path
        d="M50 8 Q50 14 54 14 Q50 14 50 20 Q50 14 46 14 Q50 14 50 8 Z"
        fill={variant === 'white' ? '#FDE047' : '#F59E0B'}
      />
      <circle cx="50" cy="14" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}
