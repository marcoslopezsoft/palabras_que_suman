'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CommunityMessage } from '@/types';
import { CATEGORIES, COLOR_THEMES } from '@/data/initialData';
import CategoryIcon from './CategoryIcon';
import { ParaguayFlagSvg } from './ParaguayBadge';
import LogoIcon from './LogoIcon';
import { 
  X, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  MapPin,
  Briefcase
} from 'lucide-react';
import { soundFx } from '@/utils/audio';

interface TotemModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: CommunityMessage[];
}

export default function TotemModeModal({
  isOpen,
  onClose,
  messages,
}: TotemModeModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isOpen || !isPlaying || messages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, messages.length]);

  if (!isOpen) return null;

  const currentMsg = messages[currentIndex] || messages[0];
  const activeCategory = CATEGORIES[currentMsg?.category] || CATEGORIES.valentia;
  const activeTheme = COLOR_THEMES[currentMsg?.theme] || COLOR_THEMES.rose;

  const handleNext = () => {
    soundFx.playPop();
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const handlePrev = () => {
    soundFx.playPop();
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 md:p-10 overflow-hidden select-none">
      {/* Background Animated Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <LogoIcon size={44} className="w-11 h-11 drop-shadow-lg" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-xl text-white tracking-wide">
                PALABRAS QUE SUMAN
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-rose-500/80 text-white rounded-full uppercase tracking-wider animate-pulse">
                Modo Activación en Vivo
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Fundación Género 360 & APEP Mujeres que Suman • Paraguay 2026
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pausar rotación' : 'Reanudar rotación'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-rose-600 text-white transition-colors cursor-pointer"
            title="Salir de Pantalla Completa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Stage: Giant Interactive Bookmark + Live Audience QR Code */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center max-w-6xl mx-auto w-full">
        
        {/* Left Side (QR Code & Audience Invitation) */}
        <div className="lg:col-span-4 bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 text-center space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
              ¡Sumá tu voz ahora!
            </span>
            <h3 className="font-serif text-xl font-bold text-white">
              Escaneá para dejar tu mensaje
            </h3>
          </div>

          {/* Styled QR Code Box */}
          <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative group">
            {/* SVG Simulated Stylized QR */}
            <div className="w-full h-full border-4 border-slate-900 rounded-xl p-2 flex flex-col justify-between relative bg-white">
              <div className="flex justify-between">
                <div className="w-10 h-10 bg-slate-900 rounded-md p-1.5 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-xs" />
                </div>
                <div className="w-10 h-10 bg-slate-900 rounded-md p-1.5 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-xs" />
                </div>
              </div>
              <div className="text-center my-auto flex flex-col items-center justify-center">
                <LogoIcon size={34} className="w-8 h-8 mx-auto animate-pulse" />
                <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest mt-1">
                  DEJÁ TU MENSAJE
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div className="w-10 h-10 bg-slate-900 rounded-md p-1.5 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-xs" />
                </div>
                <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden shadow-2xs">
                  <ParaguayFlagSvg className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300">
            Apuntá la cámara de tu celular para escribir una dedicatoria y verla proyectada aquí.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{messages.length} Mensajes en vivo</span>
          </div>
        </div>

        {/* Right Side (Giant Rotating Bookmark) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMsg.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-xl bg-gradient-to-b from-white via-[#FAF8F5] to-white text-slate-900 rounded-3xl p-8 sm:p-10 border-4 border-purple-200/90 shadow-2xl relative overflow-hidden"
            >
              {/* Ribbon Header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-300 shadow-inner" />
                <div className={`w-5 h-10 ${activeTheme.ribbonColor} rounded-b-md shadow-md -mt-1`} />
              </div>

              {/* Category & Badge */}
              <div className="pt-6 flex items-center justify-between border-b border-slate-200 pb-3">
                <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${activeCategory.colorClass}`}>
                  <CategoryIcon category={currentMsg.category} className="w-4 h-4" />
                  <span>{activeCategory.label}</span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {currentMsg.editionCode || 'G360'} • {currentIndex + 1} de {messages.length}
                </span>
              </div>

              {/* Huge Inspiring Quote */}
              <div className="py-8 text-center space-y-3">
                <div className="relative">
                  <span className="text-4xl font-serif text-slate-300 absolute -top-5 -left-2 select-none">“</span>
                  <p className="font-serif italic text-slate-900 text-xl sm:text-2xl font-bold leading-relaxed">
                    {currentMsg.message}
                  </p>
                  <span className="text-4xl font-serif text-slate-300 absolute -bottom-6 -right-2 select-none">”</span>
                </div>
              </div>

              {/* Author Details Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-end justify-between bg-purple-50/50 rounded-2xl p-4">
                <div>
                  <p className="text-base font-bold text-slate-900">{currentMsg.name}</p>
                  <p className="text-xs text-purple-900 font-semibold flex items-center gap-1 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                    <span>{currentMsg.role}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    {currentMsg.city}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-end gap-1">
                    <ParaguayFlagSvg className="w-3 h-2 rounded-2xs" />
                    <span>Palabras Que Suman</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-xs font-semibold text-slate-400">
              {currentIndex + 1} / {messages.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Live Ticker */}
      <div className="relative z-10 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Transmisión en vivo para eventos y salas de conferencias</span>
        </div>
        <p className="font-handwritten text-base text-rose-300">
          “Dejá un mensaje. Llevate otro.”
        </p>
      </div>
    </div>
  );
}
