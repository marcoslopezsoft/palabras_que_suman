'use client';

import React from 'react';

interface ParaguayFlagProps {
  className?: string;
  size?: number;
}

export function ParaguayFlagSvg({ className = 'w-4 h-3 rounded-2xs inline-block shadow-2xs', size = 16 }: ParaguayFlagProps) {
  return (
    <svg
      viewBox="0 0 600 360"
      className={className}
      width={size * 1.66}
      height={size}
      aria-label="Bandera de Paraguay"
    >
      <rect width="600" height="120" fill="#D52B1E" />
      <rect y="120" width="600" height="120" fill="#FFFFFF" />
      <rect y="240" width="600" height="120" fill="#0038A8" />
      {/* Central National Seal */}
      <circle cx="300" cy="180" r="30" fill="none" stroke="#D52B1E" strokeWidth="3" />
      <polygon points="300,165 304,177 316,177 307,185 310,197 300,190 290,197 293,185 284,177 296,177" fill="#F4B400" />
    </svg>
  );
}
