'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircleHeart, Bookmark, HeartHandshake, Volume2, VolumeX, MonitorPlay, Menu, X, Gift } from 'lucide-react';
import { soundFx } from '@/utils/audio';
import { scrollToElement } from './SmoothScroll';

interface NavbarProps {
  messageCount: number;
  onOpenRoulette: () => void;
  onOpenTotem: () => void;
}

export default function Navbar({ messageCount, onOpenRoulette, onOpenTotem }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-xs border-b border-purple-100/60 py-3'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Clean Typographic Branding */}
          <button
            onClick={() => handleNavClick('#inicio')}
            className="text-left group focus:outline-hidden cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif font-black tracking-tight text-xl md:text-2xl bg-gradient-to-r from-purple-900 via-rose-700 to-amber-700 bg-clip-text text-transparent">
                PALABRAS QUE SUMAN
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-purple-100/80 text-purple-700 border border-purple-200/60">
                2026
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 -mt-0.5">
              Fundación Género 360 & APEP Mujeres que Suman
            </p>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-100 shadow-xs">
            <button
              onClick={() => handleNavClick('#escribir')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircleHeart className="w-3.5 h-3.5 text-rose-500" />
              Dejar Mensaje
            </button>
            <button
              onClick={() => handleNavClick('#mural')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-purple-600 rounded-full hover:bg-purple-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-purple-500" />
              Mural Colectivo
            </button>
            <button
              onClick={() => handleNavClick('#sobre-la-iniciativa')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" />
              La Alianza
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Live Message Counter */}
            <div className="hidden sm:flex items-center gap-1.5 bg-rose-50 border border-rose-200/80 px-3 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-bold text-rose-800">
                {messageCount} Mensajes
              </span>
            </div>

            {/* Direct Roulette / Bookmark button */}
            <button
              onClick={() => {
                soundFx.playChime();
                onOpenRoulette();
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-purple-900 bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 hover:from-purple-200 hover:to-amber-200 rounded-full border border-purple-200/80 shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
              title="Sacar un señalador digital sorpresa"
            >
              <Gift className="w-3.5 h-3.5 text-purple-600" />
              <span>Sacar Señalador</span>
            </button>

            {/* Totem Mode (for events) */}
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenTotem();
              }}
              className="hidden sm:inline-flex p-2 text-slate-600 hover:text-purple-700 bg-white/80 hover:bg-purple-50 rounded-full border border-slate-200 transition-colors cursor-pointer"
              title="Modo Activación para Eventos"
            >
              <MonitorPlay className="w-4 h-4" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 text-slate-600 hover:text-purple-700 bg-white/80 hover:bg-purple-50 rounded-full border border-slate-200 transition-colors cursor-pointer"
              title={soundEnabled ? 'Silenciar efectos' : 'Activar efectos'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-purple-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-purple-700 bg-white/80 rounded-xl border border-slate-200 cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-purple-100 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Navegación
              </span>
              <span className="px-2 py-0.5 text-xs font-bold bg-rose-50 text-rose-700 rounded-full">
                {messageCount} palabras sumadas
              </span>
            </div>

            <button
              onClick={() => handleNavClick('#escribir')}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-colors text-left cursor-pointer"
            >
              <MessageCircleHeart className="w-4 h-4 text-rose-500" />
              Dejar Mensaje para una Niña
            </button>

            <button
              onClick={() => handleNavClick('#mural')}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors text-left cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-purple-500" />
              Mural Colectivo
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRoulette();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-left cursor-pointer"
            >
              <Gift className="w-4 h-4 text-purple-600" />
              Sacar Señalador Digital
            </button>

            <button
              onClick={() => handleNavClick('#sobre-la-iniciativa')}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors text-left cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-emerald-500" />
              Sobre la Alianza G360 & APEP
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTotem();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors text-left pt-2 border-t border-slate-100 cursor-pointer"
            >
              <MonitorPlay className="w-4 h-4 text-slate-400" />
              Activar Modo Tótem para Evento
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
