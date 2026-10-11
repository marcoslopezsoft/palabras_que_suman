'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { CommunityMessage } from '@/types';
import { CATEGORIES, COLOR_THEMES } from '@/data/initialData';
import CategoryIcon from './CategoryIcon';
import { WorldGlobeSvg } from './WorldBadge';
import { 
  X, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  MapPin, 
  Briefcase,
  Settings,
  Globe,
  Mail
} from 'lucide-react';
import { soundFx } from '@/utils/audio';
import { getWriteMessageUrl, getSiteUrl } from '@/utils/siteUrl';

interface TotemModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: CommunityMessage[];
}

const DEFAULT_WELCOME_MESSAGE: CommunityMessage = {
  id: 'totem-welcome',
  name: 'Palabras Que Suman',
  role: 'Fundación Género 360 & APEP',
  city: 'Comunidad Global',
  message:
    '¡Bienvenida a la activación! Escaneá el código QR con la cámara de tu celular para dejar tu mensaje de aliento a las niñas y verlo proyectado en esta pantalla.',
  category: 'sororidad',
  theme: 'rose',
  likes: 0,
  createdAt: new Date().toISOString(),
  editionCode: 'G360-000',
};

export default function TotemModeModal({
  isOpen,
  onClose,
  messages,
}: TotemModeModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [customQrUrl, setCustomQrUrl] = useState('');
  const [showQrConfig, setShowQrConfig] = useState(false);

  // URL por defecto del QR: toma NEXT_PUBLIC_SITE_URL o el fallback oficial de producción
  const defaultQrUrl = getWriteMessageUrl();
  const effectiveQrUrl = customQrUrl.trim() || defaultQrUrl;
  const displayList =
    messages.length > 0 ? messages : [DEFAULT_WELCOME_MESSAGE];

  useEffect(() => {
    if (!isOpen || !isPlaying || displayList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, displayList.length]);

  if (!isOpen) return null;

  const safeIndex = currentIndex < displayList.length ? currentIndex : 0;
  const currentMsg = displayList[safeIndex] || DEFAULT_WELCOME_MESSAGE;
  const activeCategory =
    CATEGORIES[currentMsg.category] || CATEGORIES.sororidad;
  const activeTheme = COLOR_THEMES[currentMsg.theme] || COLOR_THEMES.rose;

  const handleNext = () => {
    soundFx.playPop();
    setCurrentIndex((prev) => (prev + 1) % displayList.length);
  };

  const handlePrev = () => {
    soundFx.playPop();
    setCurrentIndex(
      (prev) => (prev - 1 + displayList.length) % displayList.length,
    );
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-3 sm:p-5 lg:p-6 overflow-y-auto select-none"
      style={{ minHeight: '100dvh', maxHeight: '100dvh' }}
    >
      {/* Background Animated Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-120 sm:h-120 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-120 sm:h-120 bg-rose-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3 shrink-0">
        <div className="flex items-center gap-3">
          <img
            src="/assets/elemento-32.svg"
            alt="Palabras Que Suman"
            className="h-8 sm:h-10 md:h-11 w-auto object-contain"
          />
          <span className="hidden sm:inline-block text-[11px] font-spartan font-bold uppercase tracking-wider text-purple-300/80 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
            Modo Pantalla / Tótem
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setShowQrConfig(!showQrConfig)}
            className={`p-2 sm:p-2.5 rounded-xl transition-colors cursor-pointer ${
              showQrConfig
                ? 'bg-[#733381] text-white'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="Configurar URL del Código QR"
          >
            <Settings className="w-4 h-4" />
          </button>

          {displayList.length > 1 && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isPlaying ? 'Pausar rotación' : 'Reanudar rotación'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-[#f06f42] text-white transition-colors cursor-pointer"
            title="Cerrar pantalla"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Center Stage: Interactive Bookmark + Audience QR Code (Fully Responsive in Landscape and Portrait) */}
      <main className="relative z-10 my-auto py-2 sm:py-3 flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 items-center justify-center max-w-6xl mx-auto w-full min-h-0">
        {/* Left Side (QR Code & Audience Invitation: Horizontal Banner in Portrait/Mobile, Vertical Column in Landscape) */}
        <div className="w-full lg:col-span-4 xl:col-span-4 bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 border border-white/10 font-spartan shrink-0 flex flex-col sm:flex-row lg:flex-col items-center justify-between sm:justify-center gap-2.5 sm:gap-4 lg:gap-4 text-center sm:text-left lg:text-center">
          <div className="space-y-0.5 sm:space-y-1">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#f06f42]">
              ¡Sumá tu voz ahora!
            </span>
            <h3 className="text-sm sm:text-base lg:text-xl font-black text-white uppercase tracking-tight">
              Escaneá para dejar tu mensaje
            </h3>
            <p className="hidden sm:block lg:block text-[11px] sm:text-xs text-slate-300 leading-snug font-normal font-sans pt-0.5">
              Apuntá la cámara para abrir el formulario y escribir tu dedicatoria.
            </p>
          </div>

          {/* Real Scannable QR Code Box */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center shrink-0 border-2 sm:border-4 border-white/20">
            <QRCodeSVG
              value={effectiveQrUrl}
              size={150}
              level="H"
              includeMargin={false}
              fgColor="#733381"
              className="w-full h-full max-w-full max-h-full"
              imageSettings={{
                src: '/icon.png',
                height: 32,
                width: 32,
                excavate: true,
              }}
            />
          </div>

          <div className="flex flex-col items-center sm:items-start lg:items-center gap-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-[#f8e3a4] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span>{messages.length} Mensajes sembrados</span>
            </div>
            <p className="sm:hidden text-[10px] text-slate-400 font-sans">
              Apuntá la cámara para escribir tu mensaje
            </p>
          </div>

          {/* Optional QR URL Customizer Panel */}
          <AnimatePresence>
            {showQrConfig && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full pt-2 text-left space-y-2 border-t border-white/10"
              >
                <label className="text-[11px] font-bold text-purple-300 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>Dirección Web del QR para el evento:</span>
                </label>
                <input
                  type="text"
                  value={customQrUrl}
                  onChange={(e) => setCustomQrUrl(e.target.value)}
                  placeholder={defaultQrUrl}
                  className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-hidden focus:ring-1 focus:ring-purple-400"
                />
                <div className="text-[10px] text-slate-300 flex items-center justify-between">
                  <span className="truncate">
                    Destino:{' '}
                    <strong className="text-[#f8e3a4]">{effectiveQrUrl}</strong>
                  </span>
                  {customQrUrl && (
                    <button
                      type="button"
                      onClick={() => setCustomQrUrl('')}
                      className="text-[#f06f42] hover:underline font-bold text-[10px] shrink-0 ml-2 cursor-pointer"
                    >
                      Restablecer
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side (Giant Rotating Bookmark) */}
        <div className="w-full lg:col-span-8 xl:col-span-8 flex flex-col items-center justify-center min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMsg.id}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl bg-linear-to-b from-white via-[#FAF8F5] to-white text-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-7 border-2 sm:border-4 border-purple-200/90 shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Ribbon Header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-slate-900 border-2 border-slate-300 shadow-inner" />
                <div
                  className={`w-3.5 sm:w-4 h-6 sm:h-8 ${activeTheme.ribbonColor} rounded-b-md shadow-md -mt-1`}
                />
              </div>

              {/* Category & Badge */}
              <div className="pt-2 sm:pt-3 flex items-center justify-between border-b border-slate-200 pb-2 shrink-0">
                <span
                  className={`inline-flex items-center gap-1 font-spartan text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full border shadow-2xs ${activeCategory.colorClass}`}
                >
                  <CategoryIcon
                    category={currentMsg.category}
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                  />
                  <span>{activeCategory.label}</span>
                </span>
                <span className="font-spartan text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {currentMsg.editionCode || 'G360'} • {safeIndex + 1} de{' '}
                  {displayList.length}
                </span>
              </div>

              {/* Inspiring Quote */}
              <div className="py-2.5 sm:py-4 lg:py-5 text-center space-y-1 my-auto">
                <div className="relative">
                  <span className="text-2xl sm:text-4xl font-serif text-slate-300 absolute -top-3 sm:-top-5 -left-1 select-none">
                    “
                  </span>
                  <p className="font-serif italic text-slate-900 text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-relaxed max-h-[28vh] sm:max-h-[34vh] overflow-y-auto px-2">
                    {currentMsg.message}
                  </p>
                  <span className="text-2xl sm:text-4xl font-serif text-slate-300 absolute -bottom-4 sm:-bottom-6 -right-1 select-none">
                    ”
                  </span>
                </div>
              </div>

              {/* Author Details Footer */}
              <div className="pt-2.5 sm:pt-3 border-t border-slate-200 flex items-end justify-between bg-purple-50/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 font-spartan shrink-0">
                <div className="min-w-0 pr-2">
                  <p className="text-xs sm:text-sm md:text-base font-black text-slate-900 truncate">
                    {currentMsg.name}
                  </p>
                  {currentMsg.email && (
                    <p className="text-[10px] sm:text-[11px] text-purple-700 font-medium truncate flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-[#733381] shrink-0" />
                      <span className="truncate">{currentMsg.email}</span>
                    </p>
                  )}
                  <p className="text-[11px] sm:text-xs text-[#733381] font-bold flex items-center gap-1 mt-0.5 truncate">
                    <Briefcase className="w-3 h-3 text-[#733381] shrink-0" />
                    <span className="truncate">{currentMsg.role}</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center gap-1 justify-end">
                    <MapPin className="w-3 h-3 text-[#f06f42] shrink-0" />
                    <span className="truncate max-w-[110px] sm:max-w-none">{currentMsg.city}</span>
                  </span>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 flex items-center justify-end gap-1 font-bold uppercase tracking-wider">
                    <WorldGlobeSvg className="w-3 h-3 text-[#189a72] shrink-0" />
                    <span>Palabras Que Suman</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {displayList.length > 1 && (
            <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3 shrink-0">
              <button
                onClick={handlePrev}
                className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className="font-spartan text-xs font-bold text-slate-400">
                {safeIndex + 1} / {displayList.length}
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="relative z-10 border-t border-white/10 pt-2 sm:pt-2.5 flex flex-row items-center justify-between text-[10px] sm:text-xs text-slate-400 gap-2 font-spartan shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="truncate">Fundación Género 360 & APEP Mujeres que Suman</span>
        </div>
        <p className="font-porceleina text-base sm:text-xl lg:text-2xl text-[#f8e3a4] shrink-0">
          Dejá un mensaje y llevate otro
        </p>
      </footer>
    </div>
  );
}
