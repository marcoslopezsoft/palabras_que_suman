'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CommunityMessage } from '@/types';
import { CATEGORIES, COLOR_THEMES } from '@/data/initialData';
import { toggleLikeMessage } from '@/utils/storage';
import { soundFx } from '@/utils/audio';
import { triggerHeartConfetti } from '@/utils/confetti';
import CategoryIcon from './CategoryIcon';
import { 
  Heart, 
  MapPin, 
  Briefcase, 
  Volume2, 
  Maximize2, 
  Calendar 
} from 'lucide-react';

interface MessageCardProps {
  message: CommunityMessage;
  isLikedInitially?: boolean;
  onExpand: (msg: CommunityMessage) => void;
}

export default function MessageCard({
  message,
  isLikedInitially = false,
  onExpand,
}: MessageCardProps) {
  const [likes, setLikes] = useState(message.likes);
  const [isLiked, setIsLiked] = useState(isLikedInitially);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeCategory = CATEGORIES[message.category] || CATEGORIES.valentia;
  const activeTheme = COLOR_THEMES[message.theme] || COLOR_THEMES.rose;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playPop();
    const result = toggleLikeMessage(message.id);
    setLikes(result.likes);
    setIsLiked(result.isLiked);
    if (result.isLiked) {
      triggerHeartConfetti();
    }
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `${message.message}. Dejado por ${message.name}, ${message.role}, desde ${message.city}.`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const formattedDate = new Date(message.createdAt).toLocaleDateString('es-PY', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onExpand(message)}
      className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between border-2 shadow-md hover:shadow-xl transition-all cursor-pointer bookmark-shadow ${activeTheme.cardBg} ${activeTheme.borderAccent} group select-none min-h-[380px]`}
    >
      {/* Top Satin Ribbon & Punch Hole */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <div className="w-3.5 h-3.5 rounded-full bg-[#FAF8F5] border border-slate-300 shadow-inner" />
        <div
          className={`w-3 h-7 ${activeTheme.ribbonColor} rounded-b-xs shadow-2xs -mt-1 group-hover:h-8 transition-all`}
        />
      </div>

      {/* Header Info */}
      <div className="pt-3 space-y-2">
        <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
          <span
            className={`inline-flex items-center gap-1.5 font-spartan text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${activeCategory.colorClass}`}
          >
            <CategoryIcon category={message.category} className="w-3 h-3" />
            <span>{activeCategory.label}</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-400">
            {message.editionCode || 'G360'}
          </span>
        </div>
      </div>

      {/* Message Content */}
      <div className="my-auto py-3 space-y-2">
        <div className="relative">
          <span className="text-2xl font-serif text-slate-300 absolute -top-3 -left-1 select-none">
            “
          </span>
          <p className="font-serif italic text-slate-900 text-sm sm:text-base font-medium leading-relaxed line-clamp-6 px-2">
            {message.message}
          </p>
          <span className="text-2xl font-serif text-slate-300 absolute -bottom-4 -right-1 select-none">
            ”
          </span>
        </div>
      </div>

      {/* Footer / Author & Interaction Toolbar */}
      <div className="pt-3 border-t border-slate-200/70 space-y-2 bg-white/40 rounded-xl p-2.5 backdrop-blur-2xs">
        <div>
          <p className="font-spartan text-xs font-bold text-slate-900 truncate">
            {message.name}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
            <span className="truncate flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{message.role}</span>
            </span>
            <span className="shrink-0 flex items-center gap-1 font-medium text-slate-600 ml-1">
              <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
              {message.city}
            </span>
          </div>
        </div>

        {/* Action bar inside card */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-slate-400 text-xs">
          <div className="flex items-center gap-1.5 text-[10px]">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio narration button */}
            <button
              type="button"
              onClick={handleSpeak}
              className={`p-1.5 rounded-lg transition-colors ${
                isSpeaking
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-purple-100 hover:text-purple-700 text-slate-500'
              }`}
              title="Escuchar mensaje con voz"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            {/* Like button */}
            <button
              type="button"
              onClick={handleLike}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                isLiked
                  ? 'bg-rose-500 text-white shadow-xs scale-105'
                  : 'bg-white/80 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200/80'
              }`}
              title="Me suma este mensaje"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
              <span>{likes}</span>
            </button>

            {/* Expand / View detail */}
            <button
              type="button"
              onClick={() => onExpand(message)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700"
              title="Ver en grande"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
