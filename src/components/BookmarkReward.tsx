'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { CollectibleBookmark } from '@/types';
import { CATEGORIES, COLOR_THEMES } from '@/data/initialData';
import { 
  Download, 
  Share2, 
  RotateCw, 
  Sparkles, 
  Heart, 
  Check, 
  Sun, 
  Flower2, 
  BookOpen, 
  Mountain, 
  Star,
  MapPin,
  Gift
} from 'lucide-react';
import { soundFx } from '@/utils/audio';
import { triggerHeartConfetti } from '@/utils/confetti';
import { getSiteUrl } from '@/utils/siteUrl';
import CategoryIcon from './CategoryIcon';

interface BookmarkRewardProps {
  bookmark: CollectibleBookmark;
  onDrawAnother: () => void;
  onClose: () => void;
}

export default function BookmarkReward({
  bookmark,
  onDrawAnother,
  onClose,
}: BookmarkRewardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const bookmarkRef = useRef<HTMLDivElement>(null);

  const activeCategory = CATEGORIES[bookmark.category] || CATEGORIES.valentia;
  const activeTheme = COLOR_THEMES[bookmark.theme] || COLOR_THEMES.rose;

  const handleFlip = () => {
    soundFx.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleDownload = async () => {
    if (!bookmarkRef.current) return;
    setIsDownloading(true);
    soundFx.playChime();
    triggerHeartConfetti();

    try {
      const wasFlipped = isFlipped;
      if (wasFlipped) {
        setIsFlipped(false);
        await new Promise((r) => setTimeout(r, 400));
      }

      const dataUrl = await toPng(bookmarkRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        quality: 0.95,
      });

      const link = document.createElement('a');
      link.download = `senhalador-palabras-que-suman-${bookmark.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading bookmark:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    soundFx.playPop();
    const shareText = `“${bookmark.quote}” — ${bookmark.author}. Descubrí tu señalador digital en Palabras Que Suman (Fundación Género 360 & APEP Mujeres que Suman).`;
    const shareUrl =
      typeof window !== 'undefined' &&
      !window.location.origin.includes('localhost')
        ? window.location.href
        : getSiteUrl();

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Palabras Que Suman | Mi Señalador Digital',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const renderIllustration = () => {
    switch (bookmark.illustration) {
      case 'sun':
        return <Sun className="w-7 h-7 text-amber-500" />;
      case 'flower':
        return <Flower2 className="w-7 h-7 text-rose-500" />;
      case 'sparkle':
        return <Sparkles className="w-7 h-7 text-purple-500" />;
      case 'heart':
        return <Heart className="w-7 h-7 text-rose-500 fill-rose-100" />;
      case 'book':
        return <BookOpen className="w-7 h-7 text-emerald-500" />;
      case 'mountain':
        return <Mountain className="w-7 h-7 text-sky-500" />;
      default:
        return <Star className="w-7 h-7 text-amber-400 fill-amber-100" />;
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full">
      {/* 3D Bookmark Flip Container */}
      <div className="w-full max-w-[320px] sm:max-w-[350px] perspective-1000 py-3">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="relative w-full h-[530px] sm:h-[550px] transform-style-3d cursor-pointer select-none"
          onClick={handleFlip}
        >
          {/* ================= FRONT SIDE ================= */}
          <div
            ref={bookmarkRef}
            className={`absolute inset-0 backface-hidden rounded-3xl p-6 flex flex-col justify-between border-2 shadow-2xl bookmark-shadow ${activeTheme.cardBg} ${activeTheme.borderAccent} overflow-hidden`}
          >
            {/* Top Satin Ribbon & Punch Hole */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
              <div className="w-4 h-4 rounded-full bg-[#FAF8F5] border-2 border-slate-300 shadow-inner" />
              <div className={`w-4 h-9 ${activeTheme.ribbonColor} rounded-b-md shadow-xs -mt-1`} />
            </div>

            {/* Header / Brand */}
            <div className="pt-6 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Palabras Que Suman
                </span>
                <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full">
                  Coleccionable
                </span>
              </div>

              {/* Category Pill + SVG Illustration */}
              <div className="flex items-center justify-between pt-1">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${activeCategory.colorClass}`}>
                  <CategoryIcon category={bookmark.category} className="w-3.5 h-3.5" />
                  <span>{activeCategory.label}</span>
                </span>
                <div className="p-1.5 rounded-xl bg-white/70 shadow-2xs">
                  {renderIllustration()}
                </div>
              </div>
            </div>

            {/* Main Inspiring Quote */}
            <div className="my-auto py-2 text-center space-y-3 px-1">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-rose-500">
                Un mensaje para vos
              </p>
              <div className="relative">
                <span className="text-3xl font-serif text-slate-300 absolute -top-4 -left-1 select-none">“</span>
                <p className="font-serif italic text-slate-900 text-base sm:text-lg font-bold leading-relaxed">
                  {bookmark.quote}
                </p>
                <span className="text-3xl font-serif text-slate-300 absolute -bottom-5 -right-1 select-none">”</span>
              </div>
            </div>

            {/* Signature & Author Details */}
            <div className="pt-3 border-t border-slate-200/80 space-y-2 bg-white/50 rounded-2xl p-3 backdrop-blur-2xs">
              <div className="text-center">
                <p className="font-handwritten text-xl font-bold text-slate-900 leading-tight">
                  {bookmark.author}
                </p>
                <p className="text-[11px] font-semibold text-purple-900 mt-0.5">
                  {bookmark.authorRole}
                </p>
                {bookmark.authorCity && (
                  <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    <span>{bookmark.authorCity}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-200/50">
                <span>{bookmark.edition}</span>
                <span className="font-bold text-purple-700">Género 360 & APEP</span>
              </div>
            </div>

            {/* Flip hint */}
            <div className="absolute bottom-1.5 right-2 opacity-50 text-[9px] flex items-center gap-1 text-slate-400">
              <RotateCw className="w-2.5 h-2.5" /> Girar
            </div>
          </div>

          {/* ================= BACK SIDE (REVERSE) ================= */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 flex flex-col justify-between border-2 shadow-2xl bookmark-shadow bg-gradient-to-b from-purple-950 via-slate-900 to-purple-950 text-white border-purple-400/40 overflow-hidden`}
          >
            {/* Top Satin Ribbon & Punch Hole */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
              <div className="w-4 h-4 rounded-full bg-[#FAF8F5] border-2 border-slate-300 shadow-inner" />
              <div className={`w-4 h-9 ${activeTheme.ribbonColor} rounded-b-md shadow-sm -mt-1`} />
            </div>

            <div className="pt-6 text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">
                Dedicatoria de la Comunidad
              </span>
              <div className="w-8 h-0.5 bg-rose-400 mx-auto rounded-full" />
            </div>

            <div className="space-y-4 text-center my-auto px-2">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-rose-300 shadow-inner">
                <Heart className="w-6 h-6 fill-rose-400/40" />
              </div>
              <p className="font-serif text-sm font-medium text-purple-100 leading-relaxed italic">
                “{bookmark.dedication}”
              </p>
              <p className="text-xs text-purple-300 font-semibold">
                — Fundación Género 360 & APEP Mujeres que Suman
              </p>
            </div>

            <div className="pt-3 border-t border-purple-800/80 text-center space-y-1.5">
              <p className="text-[10px] text-purple-300 uppercase tracking-widest font-mono">
                {bookmark.edition}
              </p>
              <p className="font-handwritten text-lg text-rose-300">
                #DejáUnMensajeLlevateOtro
              </p>
            </div>

            {/* Flip hint */}
            <div className="absolute bottom-1.5 right-2 opacity-50 text-[9px] flex items-center gap-1 text-purple-300">
              <RotateCw className="w-2.5 h-2.5" /> Girar
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="w-full space-y-2.5 mt-2 font-spartan">
        <div className="grid grid-cols-2 gap-2">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="py-3 px-4 rounded-xl bg-[#733381] hover:bg-[#5d2968] text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-75"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Generando...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>DESCARGAR PNG</span>
              </>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="py-3 px-4 rounded-xl bg-[#f06f42] hover:bg-[#d85e33] text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>¡COPIADO!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>COMPARTIR</span>
              </>
            )}
          </button>
        </div>

        {/* Secondary Toolbar: Flip & Draw Another */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={handleFlip}
            className="flex-1 py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>GIRAR ({isFlipped ? 'FRENTE' : 'REVERSO'})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playChime();
              onDrawAnother();
            }}
            className="flex-1 py-2.5 px-3 text-xs font-black uppercase tracking-wider text-[#733381] hover:text-[#5d2968] bg-purple-50 hover:bg-purple-100 border border-purple-200/80 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5 text-[#733381]" />
            <span>SACAR OTRO</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Volver a la experiencia
        </button>
      </div>
    </div>
  );
}
