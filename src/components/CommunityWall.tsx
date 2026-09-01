'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CommunityMessage, Category, FilterState } from '@/types';
import { CATEGORIES } from '@/data/initialData';
import MessageCard from './MessageCard';
import MessageDetailModal from './MessageDetailModal';
import CategoryIcon from './CategoryIcon';
import { ParaguayFlagSvg } from './ParaguayBadge';
import { 
  Search, 
  Sparkles, 
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
    <section id="mural" className="py-16 md:py-24 bg-mesh-pastel relative border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span>Banco Colectivo de Mensajes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            El Mural de Señaladores que Suman
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Explorá los mensajes que mujeres líderes, científicas, artistas y docentes de todo el Paraguay han dedicado a las nuevas generaciones.
          </p>
        </div>

        {/* Filter Toolbar Container */}
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-purple-100 shadow-xl shadow-purple-900/5 space-y-5 mb-10">
          
          {/* Top Bar: Search Input, City Dropdown, Sort Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                placeholder="Buscar por palabra clave, autora, profesión o ciudad..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* City Dropdown */}
            <div className="md:col-span-3 relative">
              <MapPin className="w-4 h-4 text-rose-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={filters.city}
                onChange={(e) => {
                  soundFx.playPop();
                  setFilters((prev) => ({ ...prev, city: e.target.value }));
                }}
                className="w-full pl-10 pr-8 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all appearance-none cursor-pointer"
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
              <SlidersHorizontal className="w-4 h-4 text-purple-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={(e) => {
                  soundFx.playPop();
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value as 'recent' | 'popular' }));
                }}
                className="w-full pl-10 pr-8 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all appearance-none cursor-pointer"
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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                filters.category === 'all'
                  ? 'bg-purple-900 text-white shadow-xs scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Todas ({messages.length})</span>
            </button>

            {(Object.keys(CATEGORIES) as Category[]).map((catKey) => {
              const cat = CATEGORIES[catKey];
              const isSelected = filters.category === catKey;
              const countInCat = messages.filter((m) => m.category === catKey).length;
              return (
                <button
                  key={catKey}
                  onClick={() => handleCategoryChange(catKey)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-white border-purple-600 text-purple-950 ring-2 ring-purple-300 shadow-xs scale-105'
                      : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
                  }`}
                >
                  <CategoryIcon category={catKey} className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className="text-[10px] opacity-70 bg-slate-200/70 px-1.5 py-0.2 rounded-full">
                    {countInCat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Results Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              Mostrando <strong>{displayedMessages.length}</strong> de <strong>{filteredMessages.length}</strong> mensajes encontrados
            </span>

            {(filters.category !== 'all' || filters.city !== 'all' || filters.search) && (
              <button
                onClick={handleResetFilters}
                className="text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer filtros</span>
              </button>
            )}
          </div>

        </div>

        {/* Message Cards Grid */}
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
          <div className="bg-white/80 rounded-3xl p-12 text-center border border-purple-100 space-y-4 max-w-lg mx-auto">
            
            <h3 className="font-serif text-xl font-bold text-slate-900">
              No se encontraron mensajes con estos filtros
            </h3>
            <p className="text-sm text-slate-500">
              ¡Sé la primera persona en sembrar un mensaje en esta categoría o ciudad!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Limpiar búsqueda
              </button>
              <button
                onClick={() => {
                  soundFx.playPop();
                  scrollToElement('#escribir', -60);
                }}
                className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5"
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
              className="px-8 py-3.5 rounded-full bg-white hover:bg-purple-50 text-purple-900 font-bold text-sm border-2 border-purple-200 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto"
            >
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Cargar más mensajes ({filteredMessages.length - displayedMessages.length} restantes)</span>
            </button>
          </div>
        )}

      </div>

      {/* Message Full-View Modal */}
      <MessageDetailModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
        isLikedInitially={selectedMessage ? userLikedIds.includes(selectedMessage.id) : false}
      />
    </section>
  );
}
