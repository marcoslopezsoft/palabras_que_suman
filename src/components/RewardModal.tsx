'use client';

import React, { useState } from 'react';
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
  RefreshCw
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
  const [step, setStep] = useState<Step>(() =>
    submittedMessage ? 'celebrate' : 'roulette',
  );
  const [currentBookmark, setCurrentBookmark] =
    useState<CollectibleBookmark | null>(() => getRandomBookmark());
  const [isSpinning, setIsSpinning] = useState(false);
  const [prevOpen, setPrevOpen] = useState(isOpen);

  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setStep(submittedMessage ? 'celebrate' : 'roulette');
      setCurrentBookmark(getRandomBookmark());
    }
  }

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
              className="text-center space-y-5 py-2"
            >
              {/* Illustration of Seedling */}
              <div className="flex justify-center">
                <img
                  src="/assets/elemento-28.svg"
                  alt="Tu voz se transforma en semilla"
                  className="h-24 sm:h-28 w-auto object-contain drop-shadow-md animate-bounce-subtle"
                />
              </div>

              <div className="space-y-1.5">
                <p className="font-porceleina text-2xl text-[#e473a1]">
                  Dejá un mensaje y llevate otro
                </p>
                <h3 className="font-spartan font-black text-2xl sm:text-3xl text-[#733381] uppercase tracking-tight leading-tight">
                  ¡TU MENSAJE YA SUMA EN EL MURAL!
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Gracias,{' '}
                  <strong className="font-bold text-slate-900 font-spartan">
                    {submittedMessage.name}
                  </strong>{' '}
                  ({submittedMessage.city}). Tu dedicatoria inspirará a niñas y
                  jóvenes de todo el mundo.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-purple-200/80 text-left space-y-1">
                <div className="flex items-center gap-2 font-spartan text-xs font-black text-[#733381] uppercase tracking-wider">
                  <Gift className="w-4 h-4 text-[#f06f42]" />
                  <span>Dinámica “Dejá un mensaje. Llevate otro.”</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Ahora es tu turno: la comunidad tiene preparado un{' '}
                  <strong className="font-bold text-[#733381]">
                    señalador digital coleccionable
                  </strong>{' '}
                  para acompañar tus lecturas y tus sueños.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleStartRoulette}
                  className="w-full py-4 px-6 rounded-2xl bg-[#f06f42] hover:bg-[#d85e33] text-white font-spartan font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#f8e3a4]" />
                  <span>DESCUBRIR MI SEÑALADOR DE REGALO</span>
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
              className="text-center space-y-5 py-2"
            >
              <div className="space-y-1">
                <p className="font-porceleina text-2xl text-[#e473a1]">
                  Un regalo intergeneracional para vos
                </p>
                <h3 className="font-spartan font-black text-2xl sm:text-3xl text-[#733381] uppercase tracking-tight">
                  COFRE DE INSPIRACIÓN
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Descubrí una frase elegida al azar para acompañar tu día, tus
                  lecturas o tu trabajo.
                </p>
              </div>

              {/* Animated Spinning Box Card with Official Bookmark Asset */}
              <div className="relative w-52 sm:w-60 h-64 mx-auto rounded-3xl bg-[#FAF8F5] border-2 border-dashed border-[#733381]/40 flex flex-col items-center justify-center p-6 shadow-inner overflow-hidden">
                <motion.div
                  animate={
                    isSpinning
                      ? {
                          rotate: [0, 15, -15, 360],
                          scale: [1, 1.15, 0.9, 1.05],
                        }
                      : { y: [0, -6, 0] }
                  }
                  transition={
                    isSpinning
                      ? { duration: 0.8, repeat: Infinity }
                      : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="flex items-center justify-center"
                >
                  <img
                    src="/assets/elemento-30.svg"
                    alt="Señalador de regalo"
                    className="h-28 w-auto object-contain drop-shadow-md"
                  />
                </motion.div>

                <p className="font-spartan text-xs font-black uppercase tracking-wider text-[#733381] mt-3">
                  {isSpinning
                    ? 'Mezclando palabras sabias...'
                    : '¿Qué mensaje te tocará hoy?'}
                </p>
                <div className="font-spartan text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                  Colección Oficial Género 360 & APEP
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDrawBookmark}
                  disabled={isSpinning}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#733381] hover:bg-[#5d2968] text-white font-spartan font-black text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-purple-900/30 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-75"
                >
                  {isSpinning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Descubriendo tu señalador...</span>
                    </>
                  ) : (
                    <>
                      <span>ABRIR MI SEÑALADOR AHORA</span>
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
                <h3 className="font-spartan font-black text-xl sm:text-2xl text-[#733381] uppercase tracking-tight">
                  ¡TU SEÑALADOR DE REGALO!
                </h3>
                <p className="font-spartan text-xs font-bold uppercase tracking-widest text-slate-500">
                  Podés descargarlo como imagen en alta calidad o compartirlo en
                  tus redes
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
                    className="font-spartan text-xs font-black uppercase tracking-wider text-[#733381] hover:text-[#f06f42] underline underline-offset-4 flex items-center justify-center gap-1.5 mx-auto cursor-pointer transition-colors"
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
