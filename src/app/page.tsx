'use client';

import React, { useState, useEffect } from 'react';
import { CommunityMessage } from '@/types';
import { 
  getStoredMessages, 
  getUserLikedIds, 
  fetchCommunityMessages, 
  subscribeToCommunityMessages 
} from '@/utils/storage';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MessageForm from '@/components/MessageForm';
import CommunityWall from '@/components/CommunityWall';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import RewardModal from '@/components/RewardModal';
import TotemModeModal from '@/components/TotemModeModal';
import { scrollToElement } from '@/components/SmoothScroll';

// Función helper para deduplicar mensajes por ID estricto y ordenar cronológicamente
const dedupeAndSortMessages = (list: CommunityMessage[]): CommunityMessage[] => {
  const map = new Map<string, CommunityMessage>();
  for (const msg of list) {
    if (!msg || !msg.id || msg.isDeleted) continue;
    const existing = map.get(msg.id);
    if (!existing) {
      map.set(msg.id, msg);
    } else {
      // Si ya existe por id, preservamos la versión con mayor cantidad de likes / más reciente
      map.set(msg.id, {
        ...existing,
        ...msg,
        likes: Math.max(existing.likes, msg.likes),
      });
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export default function HomePage() {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLikedIds, setUserLikedIds] = useState<string[]>([]);
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);
  const [isTotemOpen, setIsTotemOpen] = useState(false);
  const [lastSubmittedMessage, setLastSubmittedMessage] = useState<CommunityMessage | null>(null);

  useEffect(() => {
    // 1. Hidratación inicial (vacío si Supabase está activo, o mock local si está offline)
    setMessages(dedupeAndSortMessages(getStoredMessages()));
    setUserLikedIds(getUserLikedIds());

    // 2. Cargar mensajes globales y oficiales desde Supabase
    fetchCommunityMessages().then((remoteMsgs) => {
      setMessages((prev) => dedupeAndSortMessages([...remoteMsgs, ...prev]));
      setIsLoading(false);
    });

    // 3. Listener en Tiempo Real: cualquier mensaje sembrado en el mundo aparece sin duplicarse
    const unsubscribe = subscribeToCommunityMessages(
      (newMsg) => {
        if (newMsg.isDeleted) return;
        setMessages((prev) => dedupeAndSortMessages([newMsg, ...prev]));
      },
      (updatedMsg) => {
        setMessages((prev) => {
          if (updatedMsg.isDeleted) {
            // Soft delete en vivo: desaparece al instante de la pantalla de todos
            return prev.filter((m) => m.id !== updatedMsg.id);
          }
          return dedupeAndSortMessages([updatedMsg, ...prev]);
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleMessageSubmitted = (newMsg: CommunityMessage) => {
    setMessages((prev) => dedupeAndSortMessages([newMsg, ...prev]));
    setLastSubmittedMessage(newMsg);
    setIsRouletteOpen(true);
  };

  const handleOpenDirectRoulette = () => {
    setLastSubmittedMessage(null);
    setIsRouletteOpen(true);
  };

  const handleViewInWall = () => {
    scrollToElement('#mural', -60);
  };

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-rose-200 selection:text-rose-950">
      {/* Top Fixed Header */}
      <Navbar
        messageCount={messages.length}
        onOpenRoulette={handleOpenDirectRoulette}
        onOpenTotem={() => setIsTotemOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="grow">
        {/* 1. Hero Section: Emotional Greeting, Storytelling, Floating Bookmarks & Metrics */}
        <HeroSection
          messageCount={messages.length}
          onOpenRoulette={handleOpenDirectRoulette}
        />

        {/* 2. Message Form: Interactive Writing, Theme Selector, Live 3D Bookmark Preview */}
        <MessageForm onMessageSubmitted={handleMessageSubmitted} />

        {/* 3. Community Wall: Filterable, Searchable Grid of Bookmarks */}
        <CommunityWall
          messages={messages}
          userLikedIds={userLikedIds}
          isLoading={isLoading}
        />

        {/* 4. About the Initiative: Fundación Género 360 & APEP Mujeres que Suman */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Reward Modal (Dar y recibir flow & Bookmark Roulette) */}
      <RewardModal
        isOpen={isRouletteOpen}
        onClose={() => setIsRouletteOpen(false)}
        submittedMessage={lastSubmittedMessage}
        onViewInWall={handleViewInWall}
      />

      {/* Live Event / Totem Fullscreen Display Mode */}
      <TotemModeModal
        isOpen={isTotemOpen}
        onClose={() => setIsTotemOpen(false)}
        messages={messages}
      />
    </div>
  );
}
