'use client';

import React from 'react';

export default function AboutSection() {
  return (
    <section
      id="sobre-la-iniciativa"
      className="relative w-full overflow-hidden"
    >
      {/* Upper Part: ¿Por qué Palabras Que Suman? */}
      <div className="py-16 md:py-24 bg-[#FAF8F5] bg-paper-texture">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 md:mb-18">
            <h2 className="font-porceleina text-4xl sm:text-5xl md:text-6xl font-normal text-[#e473a1] tracking-wide uppercase">
              ¿POR QUÉ PALABRAS QUE SUMAN?
            </h2>

            <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Una iniciativa creada en conjunto por{' '}
              <strong className="text-slate-900 font-bold">
                Fundación Género 360
              </strong>{' '}
              y{' '}
              <strong className="text-slate-900 font-bold">
                APEP Mujeres que Suman
              </strong>{' '}
              para tender un puente de mentoría, coraje e inspiración
              intergeneracional en todo el Paraguay.
            </p>
          </div>

          {/* 3 Illustrated Feature Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Feature 1: TU VOZ SE TRANSFORMA EN SEMILLA */}
            <div className="text-center flex flex-col items-center justify-between space-y-4">
              <div className="h-40 flex items-center justify-center">
                <img
                  src="/assets/elemento-28.svg"
                  alt="Tu voz se transforma en semilla"
                  className="h-32 sm:h-36 w-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-porceleina text-2xl sm:text-3xl text-slate-900 uppercase tracking-wide">
                  TU VOZ SE TRANSFORMA <br /> EN SEMILLA
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Las mujeres líderes, empresarias, científicas y docentes de
                  nuestro país dejan un consejo o frase que les hubiera gustado
                  escuchar cuando eran niñas.
                </p>
              </div>
            </div>

            {/* Feature 2: LLEGA A NIÑAS Y AULAS DE TODO EL PAÍS */}
            <div className="text-center flex flex-col items-center justify-between space-y-4">
              <div className="h-40 flex items-center justify-center">
                <img
                  src="/assets/elemento-29.svg"
                  alt="Llega a niñas y aulas de todo el país"
                  className="h-32 sm:h-36 w-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-porceleina text-2xl sm:text-3xl text-slate-900 uppercase tracking-wide">
                  LLEGA A NIÑAS Y AULAS <br /> DE TODO EL PAÍS
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Los mensajes se imprimen en señaladores físicos y se entregan
                  en escuelas públicas, bibliotecas comunitarias y talleres de
                  robótica y liderazgo juvenil.
                </p>
              </div>
            </div>

            {/* Feature 3: TE LLEVÁS UN SEÑALADOR DE REGALO */}
            <div className="text-center flex flex-col items-center justify-between space-y-4">
              <div className="h-40 flex items-center justify-center">
                <img
                  src="/assets/elemento-30.svg"
                  alt="Te llevás un señalador de regalo"
                  className="h-32 sm:h-36 w-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-porceleina text-2xl sm:text-3xl text-slate-900 uppercase tracking-wide">
                  TE LLEVÁS UN <br /> SEÑALADOR DE REGALO
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                  El intercambio es recíproco: al dejar tu mensaje, desbloqueás
                  un señalador digital coleccionable de alta resolución listo
                  para imprimir o compartir en tus redes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sketched Purple Divider Line */}
      <div className="w-full select-none pointer-events-none -my-2 z-10 relative">
        <img
          src="/assets/linea-separador-violeta.png"
          alt=""
          className="w-full h-auto max-h-4 object-cover"
        />
      </div>

      {/* Lower Part: La Alianza on Lined Notebook Paper */}
      <div className="py-16 md:py-24 bg-notebook-lines relative">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered High-Five Illustration with Flanking Partner Logos */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-14 mb-16">
          {/* Centered High-Five Illustration with Flanking Partner Logos and Plus Sign as in MUESTRA.pdf */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 mb-16">
            {/* Fundación Género 360 Logo */}
            <div className="shrink-0 flex items-center justify-center">
              <img
                src="/assets/logo-genero360.png"
                alt="Fundación Género 360"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain hover:scale-105 transition-transform"
              />
            </div>

            {/* Plus Sign */}
            <span className="font-spartan text-3xl sm:text-4xl font-black text-slate-800 select-none">
              +
            </span>

            {/* Two Women High-Five Illustration */}
            <div className="relative shrink-0">
              <img
                src="/assets/elemento-31.svg"
                alt="Alianza Género 360 y APEP"
                className="h-44 sm:h-52 md:h-60 w-auto object-contain hover:scale-105 transition-transform"
              />
            </div>

            {/* APEP Logo */}
            <div className="shrink-0 flex items-center justify-center">
              <img
                src="/assets/logo-apep.png"
                alt="APEP Mujeres que Suman"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Two Institutional Columns with VISITAR SITIO Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto text-left">
            {/* Fundación Género 360 */}
            <div className="space-y-4">
              <h4 className="font-spartan font-black text-xl sm:text-2xl text-slate-900 uppercase tracking-wide">
              <h4 className="font-porceleina text-2xl sm:text-3xl lg:text-4xl text-[#733381] uppercase tracking-wide">
                FUNDACIÓN GÉNERO 360
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Organización comprometida con el empoderamiento integral, el
                cierre de brechas de género en educación STEM y el fomento de
                liderazgos diversos y sostenibles en el Paraguay.
              </p>

              <div className="pt-2">
                <a
                  href="https://fundaciongenero360.org/home"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block transform hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Visitar sitio de Fundación Género 360"
                >
                  <img
                    src="/assets/boton-visitar-sitio.png"
                    alt="VISITAR SITIO"
                    className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm"
                    className="h-11 sm:h-12 w-auto object-contain drop-shadow-sm"
                  />
                </a>
              </div>
            </div>

            {/* APEP Mujeres que Suman */}
            <div className="space-y-4">
              <h4 className="font-spartan font-black text-xl sm:text-2xl text-slate-900 uppercase tracking-wide">
              <h4 className="font-porceleina text-2xl sm:text-3xl lg:text-4xl text-[#733381] uppercase tracking-wide">
                APEP MUJERES QUE SUMAN
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Asociación Paraguaya de Empresarias, Ejecutivas y Profesionales.
                Una comunidad pionera que agrupa a referentes del ámbito
                corporativo y productivo para impulsar el desarrollo económico y
                el mentoreo.
              </p>

              <div className="pt-2">
                <a
                  href="https://apep.org.py"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block transform hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title="Visitar sitio de APEP"
                >
                  <img
                    src="/assets/boton-visitar-sitio.png"
                    alt="VISITAR SITIO"
                    className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
