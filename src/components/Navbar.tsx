'use client';

import React, { useState } from 'react';
import { MessageCircleHeart, Bookmark, HeartHandshake, MonitorPlay, Menu, X, Gift } from 'lucide-react';
import { soundFx } from '@/utils/audio';
import { scrollToElement } from './SmoothScroll';

interface NavbarProps {
  messageCount: number;
  onOpenRoulette: () => void;
  onOpenTotem: () => void;
}

export default function Navbar({ messageCount, onOpenRoulette, onOpenTotem }: NavbarProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.enabled = next;
    if (next) soundFx.playPop();
  };

  const handleNavClick = (selector: string) => {
    soundFx.playPop();
    setMobileMenuOpen(false);
    scrollToElement(selector, -70);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full select-none -mb-3 sm:-mb-5 md:-mb-6">
      {/* Main purple bar with paper texture */}
      <div className="relative bg-[#733381] text-white">
        {/* Paper texture overlay (elemento-34) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-35 mix-blend-multiply bg-repeat"
          style={{
            backgroundImage: "url('/assets/elemento-34.png')",
            backgroundSize: '650px auto',
          }}
        />

        <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2">
          <div className="flex items-center justify-between">
            {/* Logo Oficial de Palabras Que Suman */}
            <button
              onClick={() => handleNavClick('#inicio')}
              className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
            >
              <img
                src="/assets/elemento-32.png"
                alt="Palabras Que Suman"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain hover:scale-105 transition-transform"
              />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 font-spartan">
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

            {/* Right Action Icons: Count, Totem Icon, Audio Icon */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Message count in coral */}
              <span className="font-spartan text-xs sm:text-sm md:text-base font-black text-[#f06f42] tracking-wide whitespace-nowrap">
                {messageCount} mensajes
              </span>

              {/* Totem mode button with original icono-totem.png */}
              <button
                onClick={() => {
                  soundFx.playPop();
                  onOpenTotem();
                }}
                className="hover:scale-110 active:scale-95 transition-transform cursor-pointer focus:outline-hidden p-1"
                title="Activar Modo Tótem para Eventos"
              >
                <img
                  src="/assets/icono-totem.png"
                  alt="Modo Tótem"
                  className="h-6 sm:h-7 md:h-8 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100"
                />
              </button>

              {/* Audio toggle button with original icono-audio.png */}
              <button
                onClick={toggleSound}
                className="hover:scale-110 active:scale-95 transition-transform cursor-pointer focus:outline-hidden p-1"
                title={soundEnabled ? 'Silenciar efectos' : 'Activar efectos'}
              >
                <img
                  src="/assets/icono-audio.png"
                  alt={soundEnabled ? 'Sonido activado' : 'Sonido desactivado'}
                  className={`h-6 sm:h-7 md:h-8 w-auto object-contain brightness-0 invert transition-opacity ${
                    soundEnabled ? 'opacity-90 hover:opacity-100' : 'opacity-40'
                  }`}
                />
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 cursor-pointer"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 p-4 bg-[#632970] rounded-2xl border border-purple-800 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-purple-700/50">
                <span className="text-xs font-spartan font-bold text-[#f8e3a4] uppercase tracking-wider">
                  Navegación
                </span>
                <span className="px-2 py-0.5 text-xs font-bold bg-white/15 text-[#f06f42] rounded-full">
                  {messageCount} mensajes
                </span>
              </div>

              <button
                onClick={() => handleNavClick('#escribir')}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-spartan font-bold text-white hover:bg-white/10 rounded-xl transition-colors text-left cursor-pointer"
              >
                <MessageCircleHeart className="w-4 h-4 text-[#f8e3a4]" />
                DEJAR MENSAJE
              </button>

              <button
                onClick={() => handleNavClick('#mural')}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-spartan font-bold text-white hover:bg-white/10 rounded-xl transition-colors text-left cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-[#f8e3a4]" />
                MURAL COLECTIVO
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRoulette();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-spartan font-bold text-white bg-[#f06f42] hover:bg-[#e25d30] rounded-xl transition-colors text-left cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                SACAR SEÑALADOR
              </button>

              <button
                onClick={() => handleNavClick('#sobre-la-iniciativa')}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-spartan font-bold text-white hover:bg-white/10 rounded-xl transition-colors text-left cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-[#f8e3a4]" />
                LA ALIANZA
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTotem();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-left pt-2 border-t border-purple-700/50 cursor-pointer"
              >
                <MonitorPlay className="w-4 h-4 text-white/50" />
                Activar Modo Tótem para Evento
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Organic Wavy Bottom Edge (SVG shape of ele svg-33 / Match 710) */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mt-0.5">
        <svg
          className="relative block w-full h-5 sm:h-7 md:h-9"
          viewBox="0 0 1366 45"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 L 1366 0 L 1366 40 C 1004 20, 630 19, 256 37 C 170 42, 80 47, 0 11 Z"
            fill="#733381"
          />
        </svg>
      </div>
    </header>
  );
}
