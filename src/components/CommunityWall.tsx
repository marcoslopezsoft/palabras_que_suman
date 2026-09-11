'use client';

import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CommunityMessage, Category, FilterState } from '@/types';
import { CATEGORIES } from '@/data/initialData';
import MessageCard from './MessageCard';
import MessageDetailModal from './MessageDetailModal';
import CategoryIcon from './CategoryIcon';
import { 
  Search, 
  MapPin, 
  BookOpen, 
  RotateCcw,
  SlidersHorizontal,
  PenLine,
  LayoutGrid
} from 'lucide-react';
import { soundFx } from '@/utils/audio';
import { scrollToElement } from './SmoothScroll';

interface CommunityWallProps {
  messages: CommunityMessage[];
  userLikedIds: string[];
}

export default function CommunityWall({
  messages,
  userLikedIds,
}: CommunityWallProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    city: 'all',
    sortBy: 'recent',
  });

  const [selectedMessage, setSelectedMessage] = useState<CommunityMessage | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredMessages = useMemo(() => {
    return messages
      .filter((msg) => {
        if (filters.category !== 'all' && msg.category !== filters.category) {
          return false;
        }
        if (filters.city !== 'all' && !msg.city.toLowerCase().includes(filters.city.toLowerCase())) {
          return false;
        }
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase();
          const matchMsg = msg.message.toLowerCase().includes(q);
          const matchName = msg.name.toLowerCase().includes(q);
          const matchRole = msg.role.toLowerCase().includes(q);
          const matchCity = msg.city.toLowerCase().includes(q);
          if (!matchMsg && !matchName && !matchRole && !matchCity) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'popular') {
          return b.likes - a.likes;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [messages, filters]);

  const displayedMessages = filteredMessages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMessages.length;

  const handleResetFilters = () => {
    soundFx.playPop();
    setFilters({
      search: '',
      category: 'all',
      city: 'all',
      sortBy: 'recent',
    });
  };

  const handleCategoryChange = (cat: Category | 'all') => {
    soundFx.playPop();
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  const availableCities = useMemo(() => {
    const set = new Set<string>();
    messages.forEach((m) => {
      if (m.city) set.add(m.city);
    });
    return Array.from(set).sort();
  }, [messages]);

  return (
    <section
      id="mural"
      className="bg-[#733381] text-white relative overflow-hidden"
    >
      {/* Paper texture overlay (elemento-34) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-repeat"
        style={{
          backgroundImage: "url('/assets/elemento-34.png')",
          backgroundSize: '650px auto',
        }}
      />

      {/* Top Organic Wavy Banner */}
      <div className="w-full -mt-1 overflow-hidden leading-none select-none relative z-10">
        <img
          src="/assets/elemento-33.svg"
          alt=""
          className="w-full h-auto object-cover min-h-[40px] md:min-h-[60px]"
        />
      </div>

      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-14 pb-20 relative z-10">
        {/* Section Header in Porceleina */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 md:mb-14">
          <h2 className="font-porceleina text-4xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase">
            EL MURAL DE SEÑALADORES QUE SUMAN
          </h2>

          <p className="text-purple-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Explorá los mensajes que mujeres líderes, científicas, artistas y
            docentes de todo el Paraguay han dedicado a las nuevas generaciones.
          </p>
        </div>

        {/* Clean White Filter Box on Purple Background */}
        <div className="bg-white text-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 mb-12">
          {/* Top Bar: Search Input, City Dropdown, Sort Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                placeholder="Buscar por palabras clave, autora o profesión..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#733381]/30 focus:border-[#733381] transition-all"
              />
              {filters.search && (
                <button
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, search: '' }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* City Dropdown */}
            <div className="md:col-span-3 relative">
              <MapPin className="w-4 h-4 text-[#e473a1] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={filters.city}
                onChange={(e) => {
                  soundFx.playPop();
                  setFilters((prev) => ({ ...prev, city: e.target.value }));
                }}
                className="w-full pl-10 pr-8 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#733381]/30 focus:border-[#733381] transition-all appearance-none cursor-pointer"
              >
                <option value="all">Todas las ciudades del país</option>
                {availableCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3 relative">
              <SlidersHorizontal className="w-4 h-4 text-[#733381] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={(e) => {
                  soundFx.playPop();
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as 'recent' | 'popular',
                  }));
                }}
                className="w-full pl-10 pr-8 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#733381]/30 focus:border-[#733381] transition-all appearance-none cursor-pointer"
              >
                <option value="recent">Más recientes</option>
                <option value="popular">Más queridos (Favoritos)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-spartan font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                filters.category === 'all'
                  ? 'bg-[#733381] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Todas ({messages.length})</span>
            </button>

            {(Object.keys(CATEGORIES) as Category[]).map((catKey) => {
              const cat = CATEGORIES[catKey];
              const isSelected = filters.category === catKey;
              const countInCat = messages.filter(
                (m) => m.category === catKey,
              ).length;
              return (
                <button
                  key={catKey}
                  onClick={() => handleCategoryChange(catKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-spartan font-bold transition-all shrink-0 flex items-center gap-1.5 border cursor-pointer ${
                    isSelected
                      ? 'bg-purple-50 border-[#733381] text-[#733381] ring-2 ring-purple-300 shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <CategoryIcon category={catKey} className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className="text-[10px] opacity-70 bg-slate-200/60 px-1.5 py-0.2 rounded-full">
                    {countInCat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Results Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span className="font-spartan font-bold">
              {displayedMessages.length} Señaladores Vistos
            </span>

            {(filters.category !== 'all' ||
              filters.city !== 'all' ||
              filters.search) && (
              <button
                onClick={handleResetFilters}
                className="text-[#733381] hover:text-[#5a2466] font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer filtros</span>
              </button>
            )}
          </div>
        </div>

        {/* Message Cards Grid on Purple Background */}
        {displayedMessages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {displayedMessages.map((msg) => (
                <MessageCard
                  key={msg.id}
                  message={msg}
                  isLikedInitially={userLikedIds.includes(msg.id)}
                  onExpand={(m) => setSelectedMessage(m)}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center text-slate-900 border border-purple-200 space-y-4 max-w-lg mx-auto shadow-xl">
            <h3 className="font-spartan text-xl font-bold text-[#733381]">
              No se encontraron mensajes con estos filtros
            </h3>
            <p className="text-sm text-slate-600">
              ¡Sé la primera persona en sembrar un mensaje en esta categoría o
              ciudad!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Limpiar búsqueda
              </button>
              <button
                onClick={() => {
                  soundFx.playPop();
                  scrollToElement('#escribir', -60);
                }}
                className="px-5 py-2 bg-[#f06f42] hover:bg-[#e25d30] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Escribir un Mensaje</span>
              </button>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center pt-12">
            <button
              onClick={() => {
                soundFx.playPop();
                setVisibleCount((prev) => prev + 8);
              }}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-purple-50 text-[#733381] font-spartan font-bold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                Cargar más señaladores (
                {filteredMessages.length - displayedMessages.length} restantes)
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Message Full-View Modal */}
      <MessageDetailModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
        isLikedInitially={
          selectedMessage ? userLikedIds.includes(selectedMessage.id) : false
        }
      />
    </section>
  );
}
