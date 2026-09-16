'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { CommunityMessage } from '@/types';
import { CATEGORIES, COLOR_THEMES } from '@/data/initialData';
import { toggleLikeMessage } from '@/utils/storage';
import { soundFx } from '@/utils/audio';
import { triggerHeartConfetti } from '@/utils/confetti';
import { getSiteUrl } from '@/utils/siteUrl';
import CategoryIcon from './CategoryIcon';
import { WorldGlobeSvg } from './WorldBadge';
import { 
  X, 
  Heart, 
  Download, 
  Share2, 
  Volume2, 
  MapPin, 
  Briefcase, 
  Check, 
  Calendar 
} from 'lucide-react';

interface MessageDetailModalProps {
  message: CommunityMessage | null;
  onClose: () => void;
  isLikedInitially?: boolean;
}

export default function MessageDetailModal({
  message,
  onClose,
  isLikedInitially = false,
}: MessageDetailModalProps) {
  const [likes, setLikes] = useState(message?.likes || 0);
  const [isLiked, setIsLiked] = useState(isLikedInitially);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!message) return null;

  const activeCategory = CATEGORIES[message.category] || CATEGORIES.valentia;
  const activeTheme = COLOR_THEMES[message.theme] || COLOR_THEMES.rose;

  const handleLike = () => {
    soundFx.playPop();
    const result = toggleLikeMessage(message.id);
    setLikes(result.likes);
    setIsLiked(result.isLiked);
    if (result.isLiked) triggerHeartConfetti();
  };

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      `${message.message}. Escrito por ${message.name}, ${message.role}, desde ${message.city}.`
    );
    utterance.lang = 'es-ES';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    soundFx.playChime();
    triggerHeartConfetti();
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, quality: 0.95 });
      const link = document.createElement('a');
      link.download = `mensaje-suman-${message.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    soundFx.playPop();
    const shareText = `“${message.message}” — ${message.name} (${message.city}). Leé más mensajes inspiradores en Palabras Que Suman.`;
    const shareUrl =
      typeof window !== 'undefined' &&
      !window.location.origin.includes('localhost')
        ? window.location.href
        : getSiteUrl();

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Palabras Que Suman | Mensaje Inspirador',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback
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

  const formattedDate = new Date(message.createdAt).toLocaleDateString('es-PY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200/80 my-auto space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Bookmark Component Captured For Download */}
        <div
          ref={cardRef}
          className={`rounded-3xl p-6 flex flex-col justify-between border-2 shadow-xl bookmark-shadow ${activeTheme.cardBg} ${activeTheme.borderAccent} relative overflow-hidden min-h-[480px]`}
        >
          {/* Top Satin Ribbon */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
            <div className="w-4 h-4 rounded-full bg-[#FAF8F5] border-2 border-slate-300 shadow-inner" />
            <div
              className={`w-4 h-8 ${activeTheme.ribbonColor} rounded-b-md shadow-xs -mt-1`}
            />
          </div>

          <div className="pt-6 space-y-2 font-spartan">
            <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#733381]">
                Palabras Que Suman
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {message.editionCode || 'G360'}
              </span>
            </div>

            <div className="flex items-center justify-center pt-1">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${activeCategory.colorClass}`}
              >
                <CategoryIcon category={message.category} className="w-4 h-4" />
                <span>{activeCategory.label}</span>
              </span>
            </div>
          </div>

          {/* Quote Body */}
          <div className="my-auto py-4 text-center space-y-2 px-2">
            <div className="relative">
              <span className="text-3xl font-serif text-slate-300 absolute -top-4 -left-1 select-none">
                “
              </span>
              <p className="font-serif italic text-slate-900 text-base sm:text-lg font-semibold leading-relaxed">
                {message.message}
              </p>
              <span className="text-3xl font-serif text-slate-300 absolute -bottom-5 -right-1 select-none">
                ”
              </span>
            </div>
          </div>

          {/* Author Details Footer */}
          <div className="pt-3 border-t border-slate-200/70 space-y-2 bg-white/50 rounded-2xl p-3 backdrop-blur-2xs font-spartan">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-slate-900">
                  {message.name}
                </p>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                  <Briefcase className="w-3 h-3 text-slate-400" />
                  <span>{message.role}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#f06f42]" />
                  {message.city}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 justify-end mt-0.5 font-sans">
                  <Calendar className="w-2.5 h-2.5" /> {formattedDate}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-200/40">
              <span className="flex items-center gap-1 font-bold text-slate-500">
                <WorldGlobeSvg className="w-3.5 h-3.5 text-[#189a72]" />
                Niñas de Todo el Mundo
              </span>
              <span className="font-bold text-[#733381]">
                Fundación Género 360 & APEP
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="space-y-2.5 font-spartan">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleLike}
              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isLiked
                  ? 'bg-[#f06f42] text-white shadow-xs'
                  : 'bg-rose-50 hover:bg-rose-100 text-[#f06f42] border border-rose-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
              <span>{likes} Me suma</span>
            </button>

            <button
              onClick={handleSpeak}
              className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isSpeaking
                  ? 'bg-[#733381] text-white'
                  : 'bg-purple-50 hover:bg-purple-100 text-[#733381] border border-purple-200'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isSpeaking ? 'Pausar' : 'Escuchar'}</span>
            </button>

            <button
              onClick={handleShare}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>¡Listo!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Compartir</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full py-3 px-4 rounded-xl bg-[#733381] hover:bg-[#5d2968] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-75"
          >
            {isDownloading ? (
              <span>Generando imagen de alta resolución...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>DESCARGAR SEÑALADOR EN PNG</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
