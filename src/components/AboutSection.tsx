'use client';

import React from 'react';
import { HeartHandshake, ArrowUpRight, Heart, Sparkles, Building2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="sobre-la-iniciativa" className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-purple-100">
      {/* Decorative Pastel Background Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            ¿Por qué <span className="bg-gradient-to-r from-purple-700 via-rose-600 to-amber-600 bg-clip-text text-transparent">Palabras Que Suman</span>?
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Una iniciativa creada en conjunto por <strong>Fundación Género 360</strong> y <strong>APEP Mujeres que Suman</strong> para tender un puente de mentoría, coraje e inspiración intergeneracional en todo el Paraguay.
          </p>
        </div>

        {/* 3 Pillars of the Impact Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-gradient-to-b from-rose-50/80 to-white rounded-3xl p-8 border border-rose-100 shadow-lg shadow-rose-900/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold font-serif text-xl shadow-md shadow-rose-300">
              1
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Tu Voz se Transforma en Semilla
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Las mujeres líderes, empresarias, científicas y docentes de nuestro país dejan un consejo o frase que les hubiera gustado escuchar cuando eran niñas.
            </p>
          </div>

          <div className="bg-gradient-to-b from-purple-50/80 to-white rounded-3xl p-8 border border-purple-100 shadow-lg shadow-purple-900/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold font-serif text-xl shadow-md shadow-purple-300">
              2
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Llega a Niñas y Aulas de Todo el País
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Los mensajes se imprimen en señaladores físicos y se entregan en escuelas públicas, bibliotecas comunitarias y talleres de robótica y liderazgo juvenil.
            </p>
          </div>

          <div className="bg-gradient-to-b from-amber-50/80 to-white rounded-3xl p-8 border border-amber-100 shadow-lg shadow-amber-900/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold font-serif text-xl shadow-md shadow-amber-300">
              3
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Te Llevás un Señalador de Regalo
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              El intercambio es recíproco: al dejar tu mensaje, desbloqueás un señalador digital coleccionable de alta resolución listo para imprimir o compartir en tus redes.
            </p>
          </div>

        </div>

        {/* The Organizations Profile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Fundación Género 360 */}
          <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-purple-800 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-400/30">
                  Organización Co-creadora
                </span>
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                  <Heart className="w-5 h-5 fill-purple-400/40" />
                </div>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-black">
                Fundación Género 360
              </h3>
              <p className="text-purple-200 text-sm sm:text-base leading-relaxed">
                Organización comprometida con el empoderamiento integral, el cierre de brechas de género en educación STEM y el fomento de liderazgos diversos y sostenibles en el Paraguay.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold text-purple-300">
                <span className="px-3 py-1 bg-white/10 rounded-lg">#IgualdadReal</span>
                <span className="px-3 py-1 bg-white/10 rounded-lg">#NiñasSTEM</span>
                <span className="px-3 py-1 bg-white/10 rounded-lg">#EducaciónParaguay</span>
              </div>
            </div>

            <div className="pt-4 border-t border-purple-800/80 flex items-center justify-between">
              <span className="text-xs text-purple-300 font-medium">
                Conocé más sobre sus programas
              </span>
              <a
                href="https://fundaciongenero360.org/home"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <span>Visitar sitio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* APEP Mujeres que Suman */}
          <div className="bg-gradient-to-br from-rose-900 via-pink-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-rose-800 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-400/30">
                  Red de Líderes Aliada
                </span>
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-black">
                APEP Mujeres que Suman
              </h3>
              <p className="text-rose-200 text-sm sm:text-base leading-relaxed">
                Asociación Paraguaya de Empresarias, Ejecutivas y Profesionales. Una comunidad pionera que agrupa a referentes del ámbito corporativo y productivo para impulsar el desarrollo económico y el mentoreo.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold text-rose-300">
                <span className="px-3 py-1 bg-white/10 rounded-lg">#MujeresQueSuman</span>
                <span className="px-3 py-1 bg-white/10 rounded-lg">#LiderazgoFemenino</span>
                <span className="px-3 py-1 bg-white/10 rounded-lg">#MentoreoAPEP</span>
              </div>
            </div>

            <div className="pt-4 border-t border-rose-800/80 flex items-center justify-between">
              <span className="text-xs text-rose-300 font-medium">
                Sumate a la red de empresarias
              </span>
              <a
                href="https://apep.org.py"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 px-4 py-2 rounded-xl transition-colors"
              >
                <span>Conocer APEP</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
