'use client';

import React from 'react';
import { soundFx } from '@/utils/audio';
import { scrollToElement } from './SmoothScroll';

export default function Footer() {
  const handleNavClick = (selector: string) => {
    soundFx.playPop();
    scrollToElement(selector, -70);
  };

  return (
    <div className="w-full relative select-none">
      {/* Top Organic Wavy Shape (ele svg-33 / Match 722) */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mb-0.5">
        <svg
          className="relative block w-full h-5 sm:h-7 md:h-10 text-[#733381]"
          viewBox="0 0 1366 50"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 33 C 80 -5, 170 0, 256 5 C 630 24, 1004 23, 1366 2 L 1366 50 L 0 50 Z"
            fill="#733381"
          />
        </svg>
      </div>

      <footer className="relative bg-[#733381] text-white pt-2 pb-10 md:pb-12 overflow-hidden">
        {/* Paper texture overlay (elemento-34) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-35 mix-blend-multiply bg-repeat"
          style={{
            backgroundImage: "url('/assets/elemento-34.png')",
            backgroundSize: '650px auto',
          }}
        />

        <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left pt-6 sm:pt-8">
            {/* Left: Logo Oficial */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('#inicio')}
                className="group focus:outline-hidden cursor-pointer"
              >
                <img
                  src="/assets/elemento-32.png"
                  alt="Palabras Que Suman"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain hover:scale-105 transition-transform"
                />
              </button>
            </div>

            {/* Center: Navigation Links in Spartan Caps */}
            <nav className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 font-spartan">
              <button
                onClick={() => handleNavClick('#escribir')}
                className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-white/90 hover:text-[#f8e3a4] transition-colors cursor-pointer"
              >
                DEJAR MENSAJE
              </button>
              <button
                onClick={() => handleNavClick('#mural')}
                className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-white/90 hover:text-[#f8e3a4] transition-colors cursor-pointer"
              >
                MURAL COLECTIVO
              </button>
              <button
                onClick={() => handleNavClick('#sobre-la-iniciativa')}
                className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-white/90 hover:text-[#f8e3a4] transition-colors cursor-pointer"
              >
                LA ALIANZA
              </button>
            </nav>

            {/* Right: Partner Organizations Logos in white */}
            <div className="flex items-center justify-center">
              <img
                src="/assets/footer-aliados.png"
                alt="género 360 y Apep"
                className="h-7 sm:h-9 md:h-10 w-auto object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Small Bottom Copyright */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-purple-200/70 gap-2 text-center sm:text-left font-spartan">
            <span>
              © 2026 Palabras Que Suman • Fundación Género 360 & APEP Mujeres que Suman.
            </span>
            <span>
              Paraguay • Activación Nacional por la Niñez y la Juventud
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
