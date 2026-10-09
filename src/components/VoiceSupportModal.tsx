'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, AlertCircle, Smartphone, Globe, Settings, VolumeX } from 'lucide-react';
import { soundFx } from '@/utils/audio';
import { onVoiceUnsupported } from '@/utils/speech';

interface VoiceSupportModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  reason?: string;
}

export default function VoiceSupportModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  reason: controlledReason,
}: VoiceSupportModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [reason, setReason] = useState<string | undefined>(controlledReason);

  // Escuchar eventos globales disparados desde cualquier tarjeta de mensaje
  useEffect(() => {
    const unsub = onVoiceUnsupported((errReason) => {
      setReason(errReason);
      setInternalOpen(true);
    });
    return unsub;
  }, []);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  const handleClose = () => {
    soundFx.playPop();
    if (controlledOnClose) {
      controlledOnClose();
    }
    setInternalOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md"
        >
          {/* Backdrop click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-purple-200/90 my-auto space-y-6 text-slate-800"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
              aria-label="Cerrar aviso"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon & Title */}
            <div className="flex flex-col items-center text-center space-y-2 pt-2">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-[#f06f42] shadow-inner mb-1">
                <Volume2 className="w-8 h-8" />
              </div>

              <h3 className="font-porceleina text-3xl sm:text-4xl text-[#733381] uppercase tracking-wide">
                NARRADOR DE VOZ
              </h3>

              <p className="font-spartan text-xs sm:text-sm text-slate-600 font-semibold max-w-md">
                El sistema de lectura por voz de tu dispositivo no respondió o se encuentra desactivado.
              </p>
            </div>

            {/* Practical Mobile / Android Tips */}
            <div className="bg-purple-50/70 rounded-2xl p-4 sm:p-5 border border-purple-100 space-y-3.5 text-xs sm:text-sm font-spartan">
              <p className="font-bold text-[#733381] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Smartphone className="w-4 h-4 text-[#f06f42]" />
                ¿Cómo activarlo en tu celular o navegador?
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white border border-purple-200 flex items-center justify-center text-[#733381] font-bold text-xs shrink-0 mt-0.5 shadow-2xs">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Revisá el volumen multimedia:</span> Asegurate de que el volumen de audio de tu celular no esté en silencio total.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white border border-purple-200 flex items-center justify-center text-[#733381] font-bold text-xs shrink-0 mt-0.5 shadow-2xs">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Si estás en Instagram o Facebook:</span> Tocá los tres puntos (<span className="font-mono font-bold">⋮</span>) arriba a la derecha y elegí <strong className="text-[#f06f42]">"Abrir en Chrome"</strong> (los navegadores internos de redes sociales a veces bloquean el audio).
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white border border-purple-200 flex items-center justify-center text-[#733381] font-bold text-xs shrink-0 mt-0.5 shadow-2xs">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Motor de voz en Android:</span> En tu teléfono podés verificar que esté activo en <span className="text-slate-600 italic">Ajustes &gt; Accesibilidad &gt; Salida de texto a voz</span> seleccionando <em>Servicios de voz de Google</em>.
                  </div>
                </div>
              </div>
            </div>

            {/* Note about delay */}
            <div className="flex items-center gap-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-900 text-xs font-spartan">
              <AlertCircle className="w-4 h-4 text-[#f06f42] shrink-0" />
              <span>
                <strong>Nota:</strong> En algunos modelos Android el reproductor puede demorar unos segundos en cargar la voz. Verás una animación en el parlante mientras se prepara.
              </span>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#733381] hover:bg-[#5d2968] active:scale-98 text-white font-spartan font-bold text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ENTENDIDO</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

