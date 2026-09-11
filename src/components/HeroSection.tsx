'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '@/utils/audio';
import { scrollToElement } from './SmoothScroll';
import { COLLECTIBLE_BOOKMARKS, COLOR_THEMES } from '@/data/initialData';

interface HeroSectionProps {
  messageCount: number;
  onOpenRoulette: () => void;
}

export default function HeroSection({ messageCount, onOpenRoulette }: HeroSectionProps) {
  const handleScrollToForm = () => {
    soundFx.playPop();
    scrollToElement('#escribir', -60);
  };

  return (
    <section
      id="inicio"
      className="relative pt-24 md:pt-32 pb-8 overflow-hidden bg-[#FAF8F5] bg-paper-texture"
    >
      {/* Container */}
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4 md:pt-8 pb-12">
          {/* Left Column: Typography & Doodle Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-5 text-left"
          >
            {/* Cursive Subtitle */}
            <p className="font-porceleina text-2xl sm:text-3xl text-[#e473a1] tracking-wide">
              Dejá un mensaje y llevate otro
            </p>

            {/* Headline in Porceleina */}
            <h1 className="font-porceleina text-4xl sm:text-6xl lg:text-7xl text-[#733381] tracking-wide uppercase leading-[1.05]">
              PALABRAS QUE TRANSFORMAN <br className="hidden sm:inline" />
              EL FUTURO DE NUESTRAS NIÑAS
            </h1>

            {/* Description Paragraph */}
            <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal">
              Conectamos a{' '}
              <strong className="font-bold text-slate-900">
                mujeres líderes y profesionales
              </strong>{' '}
              con las{' '}
              <strong className="font-bold text-slate-900">
                niñas y jóvenes
              </strong>{' '}
              del Paraguay. Escribí hoy una frase de aliento o valentía, sumala
              al banco colectivo y recibí un señalador digital coleccionable de
              regalo.
            </p>

            {/* Doodle CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {/* Button 1: Dejar mi mensaje */}
              <button
                type="button"
                onClick={handleScrollToForm}
                className="group transform hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-hidden cursor-pointer"
                title="Dejar mi mensaje"
              >
                <img
                  src="/assets/elemento-03.svg"
                  alt="Dejar mi mensaje"
                  className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm group-hover:drop-shadow-md"
                />
              </button>

              {/* Button 2: Sacar el señalador directo */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playChime();
                  onOpenRoulette();
                }}
                className="group transform hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-hidden cursor-pointer"
                title="Sacar el señalador directo"
              >
                <img
                  src="/assets/elemento-04.svg"
                  alt="Sacar el señalador directo"
                  className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm group-hover:drop-shadow-md"
                />
              </button>
            </div>
          </motion.div>

          {/* Right Column: High-Res Photo of Two Girls with Doodles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <div className="relative max-w-md lg:max-w-none w-full">
              <img
                src="/assets/elemento-05.png"
                alt="Niñas paraguayas soñando y aprendiendo con tecnología"
                className="w-full h-auto object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Ribbon / Strip: "señaladores ya hechos" */}
        <div className="py-6 border-t border-purple-100/60">
          {/* Horizontal Scrollable Bookmarks Track */}
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-none snap-x snap-mandatory">
            {COLLECTIBLE_BOOKMARKS.slice(0, 6).map((bm, index) => {
              const themeInfo = COLOR_THEMES[bm.theme] || COLOR_THEMES.rose;
              return (
                <div
                  key={bm.id || index}
                  onClick={() => {
                    soundFx.playChime();
                    onOpenRoulette();
                  }}
                  className="snap-start shrink-0 w-44 sm:w-48 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between h-64 relative group overflow-hidden"
                >
                  {/* Top Bookmark Ribbon & Hole */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#FAF8F5] border border-slate-300" />
                    <div
                      className={`w-2.5 h-6 ${themeInfo.ribbonColor} rounded-b-xs shadow-xs`}
                    />
                  </div>

                  <div className="pt-4 space-y-2">
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                      {bm.category}
                    </span>
                    <p className="font-serif italic text-xs text-slate-800 line-clamp-4 leading-snug">
                      “{bm.quote}”
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <p className="font-spartan font-bold text-[11px] text-slate-900 truncate">
                      {bm.author}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {bm.authorCity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats & Impact Bar (Delimited by Hand-Drawn Pink Lines) */}
        <div className="mt-8 mb-4 relative">
          {/* Top Hand-Drawn Pink Line */}
          <img
            src="/assets/elemento-07.svg"
            alt="separador"
            className="w-full h-auto max-h-3 object-contain select-none"
          />

          {/* Stats Inner Content */}
          <div className="py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Girl Holding Sign: 100% LIBRE Y GRATUITO */}
            <div className="shrink-0 flex items-center justify-center">
              <img
                src="/assets/elemento-08.svg"
                alt="100% Libre y Gratuito"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain hover:scale-105 transition-transform"
              />
            </div>

            {/* Stat: Mensajes Sembrados */}
            <div className="text-center md:text-left flex flex-col justify-center">
              <span className="font-spartan font-black text-4xl sm:text-5xl text-slate-900 tracking-tight">
                {messageCount > 0 ? messageCount : '123'}
              </span>
              <span className="font-spartan text-xs md:text-sm font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                Mensajes Sembrados
              </span>
            </div>

            {/* Stat: Departamentos Conectados */}
            <div className="text-center md:text-left flex flex-col justify-center">
              <span className="font-spartan font-black text-4xl sm:text-5xl text-slate-900 tracking-tight">
                32
              </span>
              <span className="font-spartan text-xs md:text-sm font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                Departamentos conectados
              </span>
            </div>

            {/* Feature 1: Llega a escuelas y talleres */}
            <div className="flex items-center gap-3 text-left">
              <img
                src="/assets/elemento-09.svg"
                alt="Escuela"
                className="w-10 h-10 object-contain shrink-0"
              />
              <span className="font-spartan text-xs md:text-sm font-bold text-slate-700 max-w-32.5 leading-snug">
                Llega a escuelas y talleres
              </span>
            </div>

            {/* Feature 2: Descargable en HD */}
            <div className="flex items-center gap-3 text-left">
              <img
                src="/assets/elemento-10.svg"
                alt="Descarga"
                className="w-10 h-10 object-contain shrink-0"
              />
              <span className="font-spartan text-xs md:text-sm font-bold text-slate-700 max-w-30 leading-snug">
                Descargable en HD
              </span>
            </div>
          </div>

          {/* Bottom Hand-Drawn Pink Line */}
          <img
            src="/assets/elemento-07.svg"
            alt="separador"
            className="w-full h-auto max-h-3 object-contain select-none rotate-180"
          />
        </div>
      </div>
    </section>
  );
}
