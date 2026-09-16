'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Category, ColorTheme } from '@/types';
import { CATEGORIES, COLOR_THEMES } from '@/data/initialData';
import { RotateCw, Heart, MapPin, Briefcase } from 'lucide-react';
import { soundFx } from '@/utils/audio';
import CategoryIcon from './CategoryIcon';
import { ParaguayFlagSvg } from './ParaguayBadge';

interface BookmarkPreviewProps {
  name: string;
  role: string;
  city: string;
  message: string;
  category: Category;
  theme: ColorTheme;
}

export default function BookmarkPreview({
  name,
  role,
  city,
  message,
  category,
  theme,
}: BookmarkPreviewProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const activeCategory = CATEGORIES[category] || CATEGORIES.valentia;
  const activeTheme = COLOR_THEMES[theme] || COLOR_THEMES.rose;

  const displayMessage = message.trim() || 'Tu mensaje inspirador para las niñas del mundo aparecerá aquí... Cada palabra que dejás suma valentía y esperanza.';
  const displayName = name.trim() || 'Tu Nombre o Firma';
  const displayRole = role.trim() || 'Tu Profesión o Rol';
  const displayCity = city.trim() || 'Paraguay';

  const handleFlip = () => {
    soundFx.playFlip();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center">
      {/* 3D Perspective Card Wrapper (Dimensions proportional to 466x700 in MUESTRA.pdf) */}
      <div className="w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[420px] perspective-1000 py-3 sm:py-4">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="relative w-full h-[560px] sm:h-[600px] lg:h-[630px] transform-style-3d cursor-pointer select-none"
          onClick={handleFlip}
          title="Hacé click para girar el señalador"
        >
          {/* ================= FRONT SIDE ================= */}
          <div
            className={`absolute inset-0 backface-hidden rounded-3xl p-6 flex flex-col justify-between border-2 shadow-2xl bookmark-shadow ${activeTheme.cardBg} ${activeTheme.borderAccent} overflow-hidden`}
          >
            {/* Top Satin Ribbon & Punch Hole */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
              <div className="w-4 h-4 rounded-full bg-[#FAF8F5] border-2 border-slate-300 shadow-inner" />
              <div
                className={`w-3.5 h-8 ${activeTheme.ribbonColor} rounded-b-sm shadow-xs -mt-1`}
              />
            </div>

            {/* Top Header info */}
            <div className="pt-5 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                <span className="font-spartan text-[10px] font-black uppercase tracking-widest text-[#733381]">
                  Palabras Que Suman
                </span>
                <span className="font-spartan text-[10px] font-bold text-slate-400">
                  G360 • APEP
                </span>
              </div>

              {/* Category Pill with SVG Icon */}
              <div className="flex items-center justify-center">
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-spartan font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-2xs ${activeCategory.colorClass}`}
                >
                  <CategoryIcon category={category} className="w-3.5 h-3.5" />
                  <span>{activeCategory.label}</span>
                </span>
              </div>
            </div>

            {/* Main Message Body */}
            <div className="my-auto py-3 text-center space-y-3 px-1">
              <p className="font-spartan text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Dedicatoria especial
              </p>
              <div className="relative">
                <span className="text-3xl font-serif text-slate-300 absolute -top-4 -left-1 select-none">
                  “
                </span>
                <p className="font-serif italic text-slate-900 text-sm sm:text-base font-medium leading-relaxed max-h-55 overflow-y-auto px-2">
                  {displayMessage}
                </p>
                <span className="text-3xl font-serif text-slate-300 absolute -bottom-6 -right-1 select-none">
                  ”
                </span>
              </div>
            </div>

            {/* Bottom Signature & Details */}
            <div className="pt-3 border-t border-slate-200/70 space-y-1.5 bg-white/40 rounded-xl p-2.5 backdrop-blur-2xs">
              <div className="flex items-center justify-between">
                <div className="truncate pr-2">
                  <p className="font-spartan text-xs font-bold text-slate-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1 truncate">
                    <Briefcase className="w-2.5 h-2.5 shrink-0" />
                    <span className="truncate">{displayRole}</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-rose-500" />
                    {displayCity}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ParaguayFlagSvg className="w-3.5 h-2 rounded-2xs" />
                  Niñas y Jóvenes de Paraguay
                </span>
                <span className="font-porceleina text-base font-bold text-[#733381]">
                  Sumando Voces
                </span>
              </div>
            </div>

            {/* Flip hint chip */}
            <div className="absolute bottom-2 right-2 opacity-60 text-[9px] flex items-center gap-1 text-slate-400">
              <RotateCw className="w-2.5 h-2.5" /> Girar
            </div>
          </div>

          {/* ================= BACK SIDE (REVERSE) ================= */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 flex flex-col justify-between border-2 shadow-2xl bookmark-shadow bg-linear-to-b from-slate-900 via-purple-950 to-slate-900 text-white border-purple-400/40 overflow-hidden`}
          >
            {/* Top Satin Ribbon & Punch Hole */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
              <div className="w-4 h-4 rounded-full bg-[#FAF8F5] border-2 border-slate-300 shadow-inner" />
              <div
                className={`w-3.5 h-8 ${activeTheme.ribbonColor} rounded-b-sm shadow-xs -mt-1`}
              />
            </div>

            <div className="pt-6 text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">
                Certificado Digital de Inspiración
              </span>
              <div className="w-8 h-0.5 bg-rose-400 mx-auto rounded-full" />
            </div>

            <div className="space-y-4 text-center my-auto px-2">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-rose-300 shadow-inner">
                <Heart className="w-6 h-6 fill-rose-400/30" />
              </div>
              <p className="font-serif text-sm font-semibold text-purple-100 leading-snug">
                “Tu voz tiene un impacto real. Este mensaje será leído por niñas
                en talleres de liderazgo y escuelas a todas las ciudades del mundo.”
              </p>
              <p className="text-[11px] text-purple-300/80">
                Alianza oficial: Fundación Género 360 & APEP Mujeres que Suman.
              </p>
            </div>

            <div className="pt-3 border-t border-purple-800/80 text-center space-y-1">
              <p className="text-[10px] text-purple-300 uppercase tracking-widest font-mono">
                EDICIÓN COLECTIVA • 2026
              </p>
              <p className="font-handwritten text-base text-rose-300">
                #MujeresQueSuman
              </p>
            </div>

            {/* Flip hint chip */}
            <div className="absolute bottom-2 right-2 opacity-60 text-[9px] flex items-center gap-1 text-purple-300">
              <RotateCw className="w-2.5 h-2.5" /> Girar al frente
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Helper Button under preview */}
      <button
        type="button"
        onClick={handleFlip}
        className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-full border border-purple-200 transition-colors"
      >
        <RotateCw className="w-3.5 h-3.5" />
        <span>Girar señalador ({isFlipped ? 'Frente' : 'Reverso'})</span>
      </button>
      <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
        Vista previa interactiva en tiempo real
      </span>
    </div>
  );
}
