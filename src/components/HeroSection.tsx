'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircleHeart, Bookmark, Heart, ArrowRight, BookOpen, ShieldCheck, Users, Gift } from 'lucide-react';
import { soundFx } from '@/utils/audio';
import { scrollToElement } from './SmoothScroll';
import { ParaguayFlagSvg } from './ParaguayBadge';
import CategoryIcon from './CategoryIcon';

interface HeroSectionProps {
  messageCount: number;
  onOpenRoulette: () => void;
}

export default function HeroSection({ messageCount, onOpenRoulette }: HeroSectionProps) {
  const handleScrollToForm = () => {
    soundFx.playPop();
    scrollToElement('#escribir', -60);
  };

  const handleScrollToWall = () => {
    soundFx.playPop();
    scrollToElement('#mural', -60);
  };

  return (
    <section id="inicio" className="relative min-h-[90vh] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-mesh-pastel bg-grid-pattern flex flex-col justify-center">
      {/* Decorative Pastel Blurred Blobs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Emotional Storytelling & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Pill Tag with Paraguay Flag SVG */}
           

            {/* Slogan & Main Title */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-2xl font-handwritten font-bold text-rose-600 tracking-wide">
                “Dejá un mensaje. Llevate otro.”
              </h2>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
                Palabras que <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-purple-700 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                  transforman el futuro
                </span>{' '}
                de nuestras niñas.
              </h1>
            </div>

            {/* Paragraph Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Conectamos a <span className="font-semibold text-purple-900">mujeres líderes y profesionales</span> con las{' '}
              <span className="font-semibold text-rose-900">niñas y jóvenes del Paraguay</span>. Escribí hoy una frase de aliento o valentía, sumala al banco colectivo y recibí un señalador digital coleccionable de regalo.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleScrollToForm}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-purple-600 to-purple-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-300/40 hover:shadow-xl hover:shadow-purple-400/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <MessageCircleHeart className="w-5 h-5 text-rose-200 group-hover:scale-110 transition-transform" />
                <span>Dejar mi Mensaje</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundFx.playChime();
                  onOpenRoulette();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-purple-900 font-bold text-sm sm:text-base border border-purple-200 shadow-xs hover:shadow-md hover:border-purple-300 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4 text-purple-600" />
                <span>Sacar Señalador Directo</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Gratuito y Libre</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-purple-500" />
                <span>Descargable en HD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Llega a Escuelas y Talleres</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Floating Bookmarks Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Background Decorative Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 sm:w-80 h-72 sm:h-80 rounded-full border border-purple-200/50 animate-pulse-glow" />
              <div className="w-96 h-96 rounded-full border border-rose-200/30 -rotate-12" />
            </div>

            {/* Stacked Interactive Bookmarks */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[460px] flex items-center justify-center">
              
              {/* Floating Bookmark 1 (Back Left - Mint) */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-8, -6, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-4 sm:-left-6 top-10 w-44 sm:w-48 bg-gradient-to-b from-emerald-50 via-white to-emerald-100/60 rounded-2xl p-4 border border-emerald-200 shadow-lg bookmark-shadow -rotate-8 transform-gpu"
              >
                <div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-300 mx-auto mb-2" />
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  <CategoryIcon category="educacion" className="w-3 h-3" />
                  <span>Educación</span>
                </span>
                <p className="font-serif italic text-xs text-slate-800 mt-2 leading-snug">
                  “La curiosidad de tu mente no tiene límites. El Paraguay te necesita.”
                </p>
                <p className="font-handwritten text-xs text-emerald-800 font-bold mt-2 text-right">
                  — Ing. Andrea B. (Asunción)
                </p>
              </motion.div>

              {/* Floating Bookmark 2 (Back Right - Amber) */}
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [9, 11, 9] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-2 sm:-right-4 bottom-8 w-44 sm:w-48 bg-gradient-to-b from-amber-50 via-white to-amber-100/60 rounded-2xl p-4 border border-amber-200 shadow-lg bookmark-shadow rotate-9 transform-gpu"
              >
                <div className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300 mx-auto mb-2" />
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                  <CategoryIcon category="valentia" className="w-3 h-3" />
                  <span>Valentía</span>
                </span>
                <p className="font-serif italic text-xs text-slate-800 mt-2 leading-snug">
                  “Empezar da miedo, pero cada paso es una victoria gigante.”
                </p>
                <p className="font-handwritten text-xs text-amber-900 font-bold mt-2 text-right">
                  — Lic. Mirtha S. (Encarnación)
                </p>
              </motion.div>

              {/* Main Featured Bookmark (Center - Lavender/Rose) */}
              <motion.div
                whileHover={{ scale: 1.03, rotate: 0 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-20 w-64 sm:w-72 bg-gradient-to-b from-rose-50/95 via-purple-50/90 to-white rounded-3xl p-6 border-2 border-rose-200/90 shadow-2xl bookmark-shadow flex flex-col justify-between"
              >
                {/* Ribbon Tag Top */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-slate-100 border-2 border-rose-300 shadow-inner" />
                  <div className="w-3 h-7 bg-rose-400 rounded-b-md shadow-xs -mt-1" />
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                    
                    <span className="text-[10px] font-bold text-slate-400">
                      G360 • APEP
                    </span>
                  </div>

                  <div className="space-y-2 text-center py-2">
                    <p className="text-xs text-rose-500 font-bold uppercase tracking-wider">
                      Para una niña soñadora
                    </p>
                    <p className="font-serif text-base sm:text-lg font-bold text-slate-900 italic leading-snug">
                      “Tu voz tiene el poder de abrir puertas que otros creían cerradas. Jamás te achiques ante un desafío.”
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-purple-100/70 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Dejada con amor por:</p>
                    <p className="text-xs font-bold text-purple-900">Mujeres que Suman</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <ParaguayFlagSvg className="w-4 h-2.5 rounded-2xs" />
                    <span className="font-handwritten text-base font-bold text-rose-600">Paraguay</span>
                  </div>
                </div>

                <button
                  onClick={handleScrollToWall}
                  className="mt-4 w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ver en el Mural Colectivo</span>
                </button>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Live Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 sm:mt-20 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-rose-100 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-rose-600 font-serif">
              {messageCount > 0 ? `+${messageCount}` : '0'}
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">
              Mensajes Sembrados
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-purple-100 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-purple-600 font-serif">
              17
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">
              Departamentos Conectados
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-emerald-100 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-serif">
              100%
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">
              Gratuito & Colectivo
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-amber-100 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-amber-600 font-serif flex items-center justify-center gap-1">
              <Users className="w-5 h-5" /> 2 Redes
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">
              Género 360 + APEP
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
