'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, ColorTheme, CommunityMessage } from '@/types';
import { PARAGUAY_CITIES, INSPIRATIONAL_PROMPTS } from '@/data/initialData';
import { saveMessage } from '@/utils/storage';
import { triggerPastelConfetti } from '@/utils/confetti';
import { soundFx } from '@/utils/audio';
import BookmarkPreview from './BookmarkPreview';
import { AlertCircle, HelpCircle, X } from 'lucide-react';

interface MessageFormProps {
  onMessageSubmitted: (newMsg: CommunityMessage) => void;
}

const CATEGORY_ITEMS: { id: Category; label: string; image: string }[] = [
  {
    id: 'valentia',
    label: 'Valentía y coraje',
    image: '/assets/elemento-14.svg',
  },
  {
    id: 'educacion',
    label: 'Educación y ciencia',
    image: '/assets/elemento-15.svg',
  },
  {
    id: 'liderazgo',
    label: 'Liderazgo y futuro',
    image: '/assets/elemento-16.svg',
  },
  {
    id: 'creatividad',
    label: 'Creatividad y arte',
    image: '/assets/elemento-19.svg',
  },
  {
    id: 'autoestima',
    label: 'Amor propio y confianza',
    image: '/assets/elemento-18.svg',
  },
  {
    id: 'sororidad',
    label: 'Serenidad y comunidad',
    image: '/assets/elemento-17.svg',
  },
];

const COLOR_SWATCHES: {
  theme: ColorTheme;
  label: string;
  image: string;
  hex: string;
}[] = [
  {
    theme: 'rose',
    label: 'Rosa',
    image: '/assets/elemento-20.svg',
    hex: '#f57185',
  },
  {
    theme: 'lavender',
    label: 'Lila Violeta',
    image: '/assets/elemento-21.svg',
    hex: '#c283be',
  },
  {
    theme: 'mint',
    label: 'Verde Menta',
    image: '/assets/elemento-22.svg',
    hex: '#32aa88',
  },
  {
    theme: 'amber',
    label: 'Amarillo Dorado',
    image: '/assets/elemento-23.svg',
    hex: '#f5be22',
  },
  {
    theme: 'lilac',
    label: 'Rosa Claro',
    image: '/assets/elemento-24.svg',
    hex: '#ee8fc2',
  },
  {
    theme: 'sky',
    label: 'Azul Celeste',
    image: '/assets/elemento-25.svg',
    hex: '#34aecf',
  },
];

export default function MessageForm({ onMessageSubmitted }: MessageFormProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [city, setCity] = useState('Asunción');
  const [customCity, setCustomCity] = useState('');
  const [category, setCategory] = useState<Category>('valentia');
  const [theme, setTheme] = useState<ColorTheme>('rose');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);

  const MAX_CHARS = 280;
  const remainingChars = MAX_CHARS - message.length;
  const effectiveCity = customCity.trim() || city || 'Asunción';

  const handleApplyPrompt = (promptText: string) => {
    soundFx.playPop();
    setMessage((prev) => (prev ? `${prev} ${promptText}` : promptText));
    setShowPrompts(false);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = 'Por favor, ingresá tu nombre o firma (o "Anónimo").';
    }
    if (!role.trim()) {
      errs.role = 'Contanos tu profesión, rol o pasión.';
    }
    if (!city.trim() && !customCity.trim()) {
      errs.city = 'Elegí o escribí tu ciudad en Paraguay.';
    }
    if (!message.trim()) {
      errs.message = 'Escribí tu mensaje para las niñas del mundo.';
    } else if (message.trim().length < 15) {
      errs.message = 'El mensaje debe tener al menos 15 caracteres para inspirar.';
    } else if (message.length > MAX_CHARS) {
      errs.message = `El mensaje no puede superar los ${MAX_CHARS} caracteres.`;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      soundFx.playPop();
      return;
    }

    setIsSubmitting(true);
    soundFx.playFanfare();
    triggerPastelConfetti();

    const saved = saveMessage({
      name: name.trim(),
      role: role.trim(),
      city: effectiveCity,
      message: message.trim(),
      category,
      theme,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onMessageSubmitted(saved);
      // Reset form
      setMessage('');
      setName('');
      setRole('');
      setCustomCity('');
      setErrors({});
    }, 600);
  };

  return (
    <section
      id="escribir"
      className="py-16 md:py-24 bg-[#FAF8F5] bg-paper-texture relative border-t border-purple-100/70"
    >
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
          <h2 className="font-porceleina text-4xl sm:text-5xl md:text-6xl text-[#189a72] uppercase tracking-wide leading-tight">
            ESCRIBÍ TU SEÑALADOR DE ALIENTO <br />
            PARA LAS NIÑAS DE PARAGUAY
          </h2>

          <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Tu experiencia, tu historia y tu cariño son el empujón que una niña
            necesita hoy para soñar en grande.{' '}
            <span className="text-[#f06f42] font-bold">
              Mirá en tiempo real cómo queda tu señalador digital.
            </span>
          </p>

          {/* Hand-drawn Downward Arrow */}
          <div className="pt-2 flex justify-center">
            <svg
              className="w-6 h-10 text-[#f06f42] animate-bounce"
              viewBox="0 0 24 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="35" />
              <polyline points="5 28 12 35 19 28" />
            </svg>
          </div>
        </div>

        {/* 2-Column Layout: Steps on Left, Live Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: 3 Form Steps directly on paper background */}
          <div className="lg:col-span-7 space-y-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* ================= STEP 1 ================= */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/elemento-11.svg"
                    alt="Paso 1"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
                  />
                  <h3 className="font-porceleina text-2xl sm:text-3xl text-slate-800 uppercase tracking-wide">
                    ELEGÍ <span className="text-[#f06f42]">LA CATEGORÍA</span>{' '}
                    DE TU MENSAJE
                  </h3>
                </div>

                {/* 6 Category Cards (3 columns x 2 rows) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CATEGORY_ITEMS.map((item) => {
                    const isSelected = category === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => {
                          soundFx.playPop();
                          setCategory(item.id);
                        }}
                        className={`group relative rounded-2xl overflow-hidden border-0 transition-all p-1 cursor-pointer flex flex-col items-center text-center ${
                          isSelected
                            ? 'border-[#733381] ring-3 ring-[#733381]/30 shadow-md scale-102 bg-purple-50/50'
                            : 'border-slate-200 hover:border-slate-300 hover:shadow-sm bg-white'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-full h-auto object-contain rounded-xl"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ================= STEP 2 ================= */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/elemento-12.svg"
                    alt="Paso 2"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
                  />
                  <h3 className="font-porceleina text-2xl sm:text-3xl text-slate-800 uppercase tracking-wide">
                    ELEGÍ <span className="text-[#f06f42]">EL COLOR</span> DE TU
                    SEÑALADOR
                  </h3>
                </div>

                {/* 6 Brush Stroke Swatches (3 columns x 2 rows as in MUESTRA.pdf) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md">
                  {COLOR_SWATCHES.map((swatch) => {
                    const isSelected = theme === swatch.theme;
                    return (
                      <button
                        type="button"
                        key={swatch.theme}
                        onClick={() => {
                          soundFx.playPop();
                          setTheme(swatch.theme);
                        }}
                        className={`group p-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'border-[#733381] bg-purple-50 ring-2 ring-purple-300 scale-105 shadow-sm'
                            : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                        }`}
                        title={swatch.label}
                      >
                        <img
                          src={swatch.image}
                          alt={swatch.label}
                          className="h-7 w-auto object-contain transition-transform group-hover:scale-110"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Text Inputs */}
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="block font-spartan text-xs font-bold text-slate-700">
                        Tu Nombre o Firma *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name)
                            setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="Ej: Ing. Valeria Ríos / Sofía T."
                        className={`w-full px-4 py-3 rounded-2xl border bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                            : 'border-slate-200 focus:border-[#733381] focus:ring-purple-200'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Role / Profession Input */}
                    <div className="space-y-1.5">
                      <label className="block font-spartan text-xs font-bold text-slate-700">
                        Tu Profesión / Rol / Pasión *
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                          if (errors.role)
                            setErrors((prev) => ({ ...prev, role: '' }));
                        }}
                        placeholder="Ej: Emprendedora, Docente, Médica..."
                        className={`w-full px-4 py-3 rounded-2xl border bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 transition-all ${
                          errors.role
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                            : 'border-slate-200 focus:border-[#733381] focus:ring-purple-200'
                        }`}
                      />
                      {errors.role && (
                        <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.role}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* City in Paraguay */}
                  <div className="space-y-2">
                    <label className="block font-spartan text-xs font-bold text-slate-700">
                      Ciudad en Paraguay *
                    </label>

                    {/* Quick City Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {PARAGUAY_CITIES.slice(0, 8).map((c) => {
                        const isChosen = city === c && !customCity;
                        return (
                          <button
                            type="button"
                            key={c}
                            onClick={() => {
                              soundFx.playPop();
                              setCity(c);
                              setCustomCity('');
                              if (errors.city)
                                setErrors((prev) => ({ ...prev, city: '' }));
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-[#733381] text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {c}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-1">
                      <input
                        type="text"
                        value={customCity}
                        onChange={(e) => {
                          setCustomCity(e.target.value);
                          if (e.target.value) setCity('');
                          if (errors.city)
                            setErrors((prev) => ({ ...prev, city: '' }));
                        }}
                        placeholder="O escribí otra ciudad (ej. Villarrica, Pilar, Caacupé...)"
                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-200 focus:border-[#733381] transition-all"
                      />
                    </div>
                    {errors.city && (
                      <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.city}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= STEP 3 ================= */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/elemento-13.svg"
                      alt="Paso 3"
                      className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
                    />
                    <h3 className="font-porceleina text-2xl sm:text-3xl text-slate-800 uppercase tracking-wide">
                      TU <span className="text-[#f06f42]">MENSAJE</span> PARA
                      LAS NIÑAS DEL MUNDO *
                    </h3>
                  </div>

                  {/* Lightbulb button: ¿Necesitás ideas? */}
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playPop();
                      setShowPrompts(!showPrompts);
                    }}
                    className="flex items-center gap-1.5 text-xs font-spartan font-bold text-[#f06f42] hover:text-[#e25d30] cursor-pointer"
                  >
                    <img
                      src="/assets/elemento-26.svg"
                      alt="Idea"
                      className="w-4 h-4 object-contain"
                    />
                    <span>¿Necesitás ideas?</span>
                  </button>
                </div>

                {/* Dropdown Inspiration Prompts */}
                <AnimatePresence>
                  {showPrompts && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden bg-purple-50/80 rounded-2xl p-4 border border-purple-200 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#733381]">
                        <span className="flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4" />
                          Hacé click en una pregunta para inspirarte:
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowPrompts(false)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {INSPIRATIONAL_PROMPTS.map((prompt, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => handleApplyPrompt(prompt)}
                            className="w-full text-left text-xs font-medium text-purple-950 bg-white hover:bg-purple-100/50 p-2.5 rounded-xl border border-purple-100 transition-colors shadow-2xs"
                          >
                            “{prompt}”
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Textarea with hand-drawn dark border */}
                <div className="relative">
                  <textarea
                    rows={4}
                    value={message}
                    maxLength={MAX_CHARS}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message)
                        setErrors((prev) => ({ ...prev, message: '' }));
                    }}
                    placeholder="Escribí tu mensaje para las niñas del mundo... Recordale que su voz es valiosa y que puede alcanzar lo que se proponga."
                    className={`w-full p-4 rounded-3xl border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-purple-400 transition-all leading-relaxed ${
                      errors.message ? 'border-rose-500 bg-rose-50/20' : ''
                    }`}
                  />

                  {/* Character Counter */}
                  <div className="flex items-center justify-between pt-1 px-1 text-xs">
                    <span className="text-slate-400">
                      Máximo {MAX_CHARS} caracteres
                    </span>
                    <span className="font-mono text-slate-500">
                      {remainingChars} restantes
                    </span>
                  </div>
                </div>

                {errors.message && (
                  <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}

                {/* Submit Doodle Button */}
                <div className="pt-4 flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center group transform hover:scale-103 active:scale-97 transition-all focus:outline-hidden cursor-pointer disabled:opacity-75"
                    title="Enviar mensaje y sacar señalador"
                  >
                    <img
                      src="/assets/elemento-27.svg"
                      alt="Enviar mensaje y sacar señalador"
                      className="h-14 sm:h-16 w-auto max-w-[534px] object-contain drop-shadow-md group-hover:drop-shadow-lg"
                    />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-2 font-spartan">
                    Al enviar, tu mensaje se suma al mural y desbloqueás tu
                    postal digital coleccionable.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT: Live Bookmark Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
            <div className="w-full text-center">
              <div className="mb-4">
                <h3 className="font-porceleina text-3xl sm:text-4xl text-[#733381] tracking-wide uppercase">
                  VISTA PREVIA EN VIVO
                </h3>
                <p className="font-spartan text-xs sm:text-sm text-slate-500 mt-0.5">
                  Así se verá tu señalador en el Banco de Mensajes
                </p>
              </div>

              <BookmarkPreview
                name={name}
                role={role}
                city={effectiveCity}
                message={message}
                category={category}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
