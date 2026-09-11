'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { CommunityMessage } from '@/types';
import { CATEGORIES, COLOR_THEMES } from '@/data/initialData';
import CategoryIcon from './CategoryIcon';
import { ParaguayFlagSvg } from './ParaguayBadge';
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
  Globe
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
  city: 'Paraguay',
  message: '¡Bienvenida a la activación! Escaneá el código QR con la cámara de tu celular para dejar tu mensaje de aliento a las niñas y verlo proyectado en esta pantalla.',
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
      className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 md:p-10 overflow-hidden select-none"
    >
      {/* Background Animated Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-rose-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-4">
          <img
            src="/assets/elemento-32.svg"
            alt="Palabras Que Suman"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrConfig(!showQrConfig)}
            className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
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
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
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
            className="p-2.5 rounded-xl bg-white/10 hover:bg-[#f06f42] text-white transition-colors cursor-pointer"
            title="Cerrar pantalla"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Stage: Giant Interactive Bookmark + Live Audience QR Code */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center max-w-6xl mx-auto w-full">
        {/* Left Side (Real Scannable QR Code & Audience Invitation) */}
        <div className="lg:col-span-4 bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 text-center space-y-4 font-spartan">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#f06f42]">
              ¡Sumá tu voz ahora!
            </span>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Escaneá para dejar tu mensaje
            </h3>
          </div>

          {/* Real Scannable QR Code Box */}
          <div className="w-52 h-52 mx-auto bg-white p-3.5 rounded-3xl shadow-2xl flex flex-col items-center justify-center relative border-4 border-white/20">
            <QRCodeSVG
              value={effectiveQrUrl}
              size={172}
              level="H"
              includeMargin={false}
              fgColor="#733381"
              imageSettings={{
                src: '/icon.png',
                height: 38,
                width: 38,
                excavate: true,
              }}
            />
          </div>

          <p className="text-xs text-slate-300 leading-snug px-2 font-normal font-sans">
            Apuntá la cámara de tu celular a la pantalla para abrir el
            formulario y escribir una dedicatoria.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-[#f8e3a4] text-xs font-bold uppercase tracking-wider">
            <span>{messages.length} Mensajes sembrados</span>
          </div>

          {/* Optional QR URL Customizer Panel */}
          <AnimatePresence>
            {showQrConfig && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-2 text-left space-y-2 border-t border-white/10"
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
                <p className="text-[10px] text-slate-400 leading-tight">
                  Apunta por defecto a{' '}
                  <strong className="text-purple-200">{defaultQrUrl}</strong>{' '}
                  (configurable vía{' '}
                  <code className="text-purple-300">NEXT_PUBLIC_SITE_URL</code>
                  ).
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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
              className="w-full max-w-xl bg-linear-to-b from-white via-[#FAF8F5] to-white text-slate-900 rounded-3xl p-8 sm:p-10 border-4 border-purple-200/90 shadow-2xl relative overflow-hidden"
            >
              {/* Ribbon Header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-300 shadow-inner" />
                <div
                  className={`w-5 h-10 ${activeTheme.ribbonColor} rounded-b-md shadow-md -mt-1`}
                />
              </div>

              {/* Category & Badge */}
              <div className="pt-6 flex items-center justify-between border-b border-slate-200 pb-3">
                <span
                  className={`inline-flex items-center gap-1.5 font-spartan text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${activeCategory.colorClass}`}
                >
                  <CategoryIcon
                    category={currentMsg.category}
                    className="w-4 h-4"
                  />
                  <span>{activeCategory.label}</span>
                </span>
                <span className="font-spartan text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {currentMsg.editionCode || 'G360'} • {safeIndex + 1} de{' '}
                  {displayList.length}
                </span>
              </div>

              {/* Huge Inspiring Quote */}
              <div className="py-8 text-center space-y-3">
                <div className="relative">
                  <span className="text-4xl font-serif text-slate-300 absolute -top-5 -left-2 select-none">
                    “
                  </span>
                  <p className="font-serif italic text-slate-900 text-xl sm:text-2xl font-bold leading-relaxed">
                    {currentMsg.message}
                  </p>
                  <span className="text-4xl font-serif text-slate-300 absolute -bottom-6 -right-2 select-none">
                    ”
                  </span>
                </div>
              </div>

              {/* Author Details Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-end justify-between bg-purple-50/50 rounded-2xl p-4 font-spartan">
                <div>
                  <p className="text-base font-black text-slate-900">
                    {currentMsg.name}
                  </p>
                  <p className="text-xs text-[#733381] font-bold flex items-center gap-1 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#733381]" />
                    <span>{currentMsg.role}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#f06f42]" />
                    {currentMsg.city}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-end gap-1 font-bold uppercase tracking-wider">
                    <ParaguayFlagSvg className="w-3 h-2 rounded-2xs" />
                    <span>Palabras Que Suman</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows (shown if more than 1 message) */}
          {displayList.length > 1 && (
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="font-spartan text-xs font-bold text-slate-400">
                {safeIndex + 1} / {displayList.length}
              </span>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 font-spartan">
        <div className="flex items-center gap-2">
          <span>Fundación Género 360 & APEP Mujeres que Suman</span>
        </div>
        <p className="font-porceleina text-2xl text-[#f8e3a4]">
          Dejá un mensaje y llevate otro
        </p>
      </div>
    </div>
  );
}
