'use client';

import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { soundFx } from '@/utils/audio';
import { scrollToElement } from './SmoothScroll';
import { ParaguayFlagSvg } from './ParaguayBadge';

export default function Footer() {
  const handleScrollTop = () => {
    soundFx.playPop();
    scrollToElement('#inicio', 0);
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 relative overflow-hidden border-t border-purple-900/60">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="font-serif font-black text-2xl text-white tracking-wide">
                PALABRAS QUE SUMAN
              </span>
              <p className="text-xs text-purple-300 mt-0.5">
                Dejá un mensaje. Llevate otro.
              </p>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Conectamos generaciones a través de la sabiduría colectiva. Cada mensaje es un faro de valentía y educación para las niñas y jóvenes de Paraguay.
            </p>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <ParaguayFlagSvg className="w-4 h-2.5 rounded-2xs" />
              <span><strong>Activación Nacional 2026</strong> • Asunción, Paraguay</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => {
                    soundFx.playPop();
                    scrollToElement('#inicio', -60);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFx.playPop();
                    scrollToElement('#escribir', -60);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dejar un Mensaje
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFx.playPop();
                    scrollToElement('#mural', -60);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mural Colectivo
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFx.playPop();
                    scrollToElement('#sobre-la-iniciativa', -60);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sobre la Alianza
                </button>
              </li>
            </ul>
          </div>

          {/* Institutions */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-rose-300">
              Impulsado por
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-bold text-white text-sm">Fundación Género 360</p>
                <p className="text-slate-400 mt-0.5">Empoderamiento, equidad y educación para niñas y mujeres.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-bold text-white text-sm">APEP Mujeres que Suman</p>
                <p className="text-slate-400 mt-0.5">Asociación Paraguaya de Empresarias, Ejecutivas y Profesionales.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© 2026 Palabras Que Suman. Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>para el futuro de las niñas del Paraguay.</span>
          </div>

          <button
            onClick={handleScrollTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
