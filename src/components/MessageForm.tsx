'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, ColorTheme, CommunityMessage } from '@/types';
import { CATEGORIES, COLOR_THEMES, PARAGUAY_CITIES, INSPIRATIONAL_PROMPTS } from '@/data/initialData';
import { saveMessage } from '@/utils/storage';
import { triggerPastelConfetti } from '@/utils/confetti';
import { soundFx } from '@/utils/audio';
import BookmarkPreview from './BookmarkPreview';
import CategoryIcon from './CategoryIcon';
import { 
  Send, 
  Sparkles, 
  Lightbulb, 
  Check, 
  AlertCircle, 
  Palette, 
  Tag, 
  User, 
  Briefcase, 
  MapPin, 
  HelpCircle,
  X,
  Gift
} from 'lucide-react';

interface MessageFormProps {
  onMessageSubmitted: (newMsg: CommunityMessage) => void;
}

export default function MessageForm({ onMessageSubmitted }: MessageFormProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
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
      errs.message = 'Escribí unas palabras para las niñas y jóvenes.';
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
      setCity('');
      setCustomCity('');
      setErrors({});
    }, 600);
  };

  return (
    <section id="escribir" className="py-16 md:py-24 bg-white/70 backdrop-blur-md relative border-t border-purple-100/70">
      {/* Decorative blurred backgrounds */}
      <div className="absolute -top-10 left-1/4 w-72 h-72 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
          

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Escribí tu señalador de aliento para las niñas de Paraguay
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Tu experiencia, tu historia y tu cariño son el empujón que una niña necesita hoy para soñar en grande. 
            Mirá en tiempo real cómo queda tu señalador digital.
          </p>
        </div>

        {/* 2-Column Grid: Form on Left, Live Bookmark Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT: The Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-purple-100 shadow-xl shadow-purple-900/5 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-7">
              
              {/* Category Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-600" />
                  <span>1. Elegí la Categoría de tu Mensaje</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(Object.keys(CATEGORIES) as Category[]).map((catKey) => {
                    const cat = CATEGORIES[catKey];
                    const isSelected = category === catKey;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => {
                          soundFx.playPop();
                          setCategory(catKey);
                        }}
                        className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                          isSelected
                            ? `${cat.borderClass} ${cat.bgLight} shadow-sm ring-2 ring-purple-300/40`
                            : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/80 hover:border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="mb-2 p-1.5 rounded-xl bg-white/80 w-fit shadow-2xs">
                          <CategoryIcon category={catKey} className={`w-5 h-5 ${isSelected ? 'text-purple-700' : 'text-slate-500'}`} />
                        </div>
                        <div className="text-xs font-bold text-slate-800 leading-tight">
                          {cat.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Theme Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-rose-500" />
                  <span>2. Elegí el Color de tu Señalador</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {(Object.keys(COLOR_THEMES) as ColorTheme[]).map((tKey) => {
                    const t = COLOR_THEMES[tKey];
                    const isSelected = theme === tKey;
                    return (
                      <button
                        type="button"
                        key={tKey}
                        onClick={() => {
                          soundFx.playPop();
                          setTheme(tKey);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                          isSelected
                            ? 'border-purple-600 ring-2 ring-purple-400/50 scale-105 bg-white text-purple-950 shadow-xs'
                            : 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: t.hex }}
                        />
                        <span>{t.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-purple-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Information Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tu Nombre o Firma *</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder="Ej. Ing. Valeria Rivas / Sofía G."
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                        : 'border-slate-200 focus:border-purple-400 focus:ring-purple-200'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Role / Profession */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tu Profesión / Rol / Pasión *</span>
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      if (errors.role) setErrors((prev) => ({ ...prev, role: '' }));
                    }}
                    placeholder="Ej. Emprendedora, Docente, Médica"
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 transition-all ${
                      errors.role
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                        : 'border-slate-200 focus:border-purple-400 focus:ring-purple-200'
                    }`}
                  />
                  {errors.role && (
                    <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.role}
                    </p>
                  )}
                </div>
              </div>

              {/* City Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Ciudad en Paraguay *</span>
                  </span>
                  <span className="text-[11px] font-normal text-slate-400">
                    Elegí un atajo o escribí la tuya
                  </span>
                </label>

                {/* City Chips */}
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
                          if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          isChosen
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
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
                      if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                    }}
                    placeholder="O escribí otra ciudad (ej. Villarrica, Caaguazú, Pilar...)"
                    className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-hidden focus:ring-2 transition-all ${
                      errors.city
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                        : 'border-slate-200 focus:border-purple-400 focus:ring-purple-200'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-[11px] font-semibold text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>3. Tu Mensaje para las Niñas y Jóvenes *</span>
                  </label>
                  
                  {/* Creative Prompts Trigger Button */}
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playPop();
                      setShowPrompts(!showPrompts);
                    }}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-full transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
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
                      className="overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-3.5 border border-purple-200 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-purple-900">
                        <span className="flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4 text-purple-600" />
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
                            className="w-full text-left text-xs font-medium text-purple-950 bg-white/80 hover:bg-white p-2.5 rounded-xl border border-purple-100 transition-colors shadow-2xs flex items-center gap-2"
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>{prompt}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={message}
                    maxLength={MAX_CHARS}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                    }}
                    placeholder="Escribí aquí tu mensaje con el corazón... Recordale a una niña paraguaya que su voz es valiosa y que puede alcanzar lo que se proponga."
                    className={`w-full px-4 py-3.5 rounded-2xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-hidden focus:ring-2 transition-all leading-relaxed ${
                      errors.message
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                        : 'border-slate-200 focus:border-purple-400 focus:ring-purple-200'
                    }`}
                  />

                  {/* Character Counter with Progress Gauge */}
                  <div className="flex items-center justify-between pt-1 px-1 text-xs">
                    <span className="text-slate-400">
                      Máximo {MAX_CHARS} caracteres
                    </span>
                    <span
                      className={`font-bold font-mono px-2 py-0.5 rounded-full ${
                        remainingChars < 20
                          ? 'bg-rose-100 text-rose-700'
                          : remainingChars < 60
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {remainingChars} restantes
                    </span>
                  </div>
                </div>

                {errors.message && (
                  <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-purple-600 to-purple-700 hover:from-rose-600 hover:to-purple-800 text-white font-bold text-base shadow-xl shadow-purple-400/30 hover:shadow-2xl hover:shadow-purple-400/40 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sembrando tu mensaje en el mural...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 text-rose-200" />
                      <span>Enviar Mensaje & Sacar mi Señalador</span>
                      <Gift className="w-5 h-5 text-amber-200" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 mt-2.5">
                  Al enviar, tu mensaje se suma al mural y desbloqueás tu postal digital coleccionable.
                </p>
              </div>

            </form>
          </div>

          {/* RIGHT: Live 3D Bookmark Preview (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
            <div className="w-full bg-gradient-to-b from-purple-50/70 via-rose-50/50 to-white/90 rounded-3xl p-6 border border-purple-100 shadow-lg text-center">
              <div className="mb-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-700 bg-purple-100/70 px-3 py-1 rounded-full">
                  Vista Previa en Vivo
                </span>
                <p className="text-xs text-slate-500 mt-1">
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
