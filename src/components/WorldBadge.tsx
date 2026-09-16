'use client';

import React from 'react';

interface GlobeIconProps {
  className?: string;
  size?: number;
}

export function WorldGlobeSvg({ className = 'w-4 h-4 inline-block', size = 16 }: GlobeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-label="Planeta Tierra - Niñas del Mundo"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" stroke="currentColor" />
      <path d="M2 12h20" stroke="currentColor" />
    </svg>
  );
}

// Backwards compatibility alias
export function ParaguayFlagSvg(props: GlobeIconProps) {
  return <WorldGlobeSvg {...props} />;
}

