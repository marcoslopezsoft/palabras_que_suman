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

export default function HomePage() {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [userLikedIds, setUserLikedIds] = useState<string[]>([]);
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);
  const [isTotemOpen, setIsTotemOpen] = useState(false);
  const [lastSubmittedMessage, setLastSubmittedMessage] = useState<CommunityMessage | null>(null);

  useEffect(() => {
    // 1. Instant local hydration from localStorage
    setMessages(getStoredMessages());
    setUserLikedIds(getUserLikedIds());

    // 2. Fetch fresh global messages from Supabase in the background
    fetchCommunityMessages().then((remoteMsgs) => {
      if (remoteMsgs && remoteMsgs.length > 0) {
        setMessages(remoteMsgs);
      }
    });

    // 3. Realtime listener: any message submitted anywhere appears live on screen!
    const unsubscribe = subscribeToCommunityMessages(
      (newMsg) => {
        if (newMsg.isDeleted) return;
        setMessages((prev) => {
          if (prev.some((m) => m.id === newMsg.id)) return prev;
          return [newMsg, ...prev];
        });
      },
      (updatedMsg) => {
        setMessages((prev) => {
          if (updatedMsg.isDeleted) {
            // Live soft delete: removes message instantly from the wall and totem
            return prev.filter((m) => m.id !== updatedMsg.id);
          }
          return prev.map((m) => (m.id === updatedMsg.id ? updatedMsg : m));
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleMessageSubmitted = (newMsg: CommunityMessage) => {
    setMessages((prev) => [newMsg, ...prev]);
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
