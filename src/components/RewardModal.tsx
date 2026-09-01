'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CollectibleBookmark, CommunityMessage } from '@/types';
import { getRandomBookmark, saveCollectedBookmark } from '@/utils/storage';
import { triggerPastelConfetti } from '@/utils/confetti';
import { soundFx } from '@/utils/audio';
import BookmarkReward from './BookmarkReward';
import { 
  Sparkles, 
  X, 
  Gift, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw,
  MessageCircle
} from 'lucide-react';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  submittedMessage?: CommunityMessage | null;
  onViewInWall?: () => void;
}

type Step = 'celebrate' | 'roulette' | 'revealed';

export default function RewardModal({
  isOpen,
  onClose,
  submittedMessage,
  onViewInWall,
}: RewardModalProps) {
  const [step, setStep] = useState<Step>('roulette');
  const [currentBookmark, setCurrentBookmark] = useState<CollectibleBookmark | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (submittedMessage) {
        setStep('celebrate');
      } else {
        setStep('roulette');
      }
      setCurrentBookmark(getRandomBookmark());
    }
  }, [isOpen, submittedMessage]);

  const handleStartRoulette = () => {
    soundFx.playChime();
    setStep('roulette');
  };

  const handleDrawBookmark = () => {
    setIsSpinning(true);
    soundFx.playPop();

    let count = 0;
    const interval = setInterval(() => {
      setCurrentBookmark(getRandomBookmark());
      count++;
      if (count > 7) {
        clearInterval(interval);
        const finalBookmark = getRandomBookmark();
        setCurrentBookmark(finalBookmark);
        saveCollectedBookmark(finalBookmark);
        setIsSpinning(false);
        setStep('revealed');
        soundFx.playFanfare();
        triggerPastelConfetti();
      }
    }, 120);
  };

  const handleDrawAnother = () => {
    const another = getRandomBookmark(currentBookmark?.id);
    setCurrentBookmark(another);
    saveCollectedBookmark(another);
    triggerPastelConfetti();
  };

  if (!isOpen) return null;

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
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-xl bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200/80 overflow-hidden my-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          
          {/* STEP 1: Celebrate Message Sent */}
          {step === 'celebrate' && submittedMessage && (
            <motion.div
              key="celebrate"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center space-y-6 py-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-400 to-purple-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-rose-300/50">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-700 bg-purple-100/70 px-3 py-1 rounded-full">
                  ¡Mensaje Recibido con Éxito!
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Tu semilla de inspiración ya está en el Mural Colectivo
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Gracias, <span className="font-bold text-purple-900">{submittedMessage.name}</span> ({submittedMessage.city}). Tu mensaje inspirará a niñas en talleres y escuelas del Paraguay.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 p-4 rounded-2xl border border-purple-200/70 text-left space-y-1">
                <div className="flex items-center gap-2 text-xs font-extrabold text-purple-900 uppercase">
                  <Gift className="w-4 h-4 text-rose-500" />
                  <span>Dinámica “Dejá un mensaje. Llevate otro.”</span>
                </div>
                <p className="text-xs text-slate-700">
                  Ahora es tu turno: la comunidad tiene un <strong>señalador digital coleccionable</strong> para acompañar tus propias lecturas y proyectos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleStartRoulette}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-purple-300/40 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Descubrir mi Señalador de Regalo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Interactive Roulette / Mystery Box */}
          {step === 'roulette' && (
            <motion.div
              key="roulette"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center space-y-6 py-4"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-purple-800 text-xs font-bold uppercase tracking-wider">
                  <Gift className="w-3.5 h-3.5 text-purple-600" />
                  <span>Cofre de Inspiración</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
                  Sacar Señalador Digital Sorpresa
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Descubrí una frase elegida al azar para acompañar tu día, tus lecturas o tu trabajo.
                </p>
              </div>

              {/* Animated Spinning Box Card */}
              <div className="relative w-48 sm:w-56 h-64 mx-auto rounded-3xl bg-gradient-to-b from-purple-100 via-rose-50 to-amber-50 border-2 border-dashed border-purple-300 flex flex-col items-center justify-center p-6 shadow-inner overflow-hidden">
                <motion.div
                  animate={isSpinning ? { rotate: [0, 15, -15, 360], scale: [1, 1.15, 0.9, 1.05] } : { y: [0, -6, 0] }}
                  transition={isSpinning ? { duration: 0.8, repeat: Infinity } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-500 via-rose-400 to-amber-300 flex items-center justify-center text-white shadow-xl shadow-purple-300/50"
                >
                  <MessageCircle className="w-10 h-10 animate-pulse" />
                </motion.div>

                <p className="text-xs font-bold text-purple-900 mt-4">
                  {isSpinning ? 'Mezclando palabras sabias...' : '¿Qué mensaje te tocará hoy?'}
                </p>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Colección Oficial Género 360 & APEP
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDrawBookmark}
                  disabled={isSpinning}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-300/40 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-75"
                >
                  {isSpinning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Descubriendo tu señalador...</span>
                    </>
                  ) : (
                    <>
                      
                      <span>Abrir mi Señalador Ahora</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Bookmark Revealed in Full Glory */}
          {step === 'revealed' && currentBookmark && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-700 bg-purple-100/70 px-3 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Gift className="w-3 h-3 text-purple-600" />
                  <span>¡Tu Señalador Digital Coleccionable!</span>
                </span>
                <p className="text-xs text-slate-500">
                  Podés descargarlo como imagen de alta resolución o compartirlo en tus redes.
                </p>
              </div>

              <BookmarkReward
                bookmark={currentBookmark}
                onDrawAnother={handleDrawAnother}
                onClose={onClose}
              />

              {onViewInWall && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onViewInWall();
                    }}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 underline underline-offset-4 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <span>Ir a ver mi mensaje en el Mural Colectivo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}
