import { CommunityMessage, CollectibleBookmark } from '@/types';
import { INITIAL_COMMUNITY_MESSAGES, COLLECTIBLE_BOOKMARKS } from '@/data/initialData';

const STORAGE_KEY_MESSAGES = 'pqs_community_messages_clean_v2';
const STORAGE_KEY_LIKES = 'pqs_user_likes_clean_v2';
const STORAGE_KEY_COLLECTED = 'pqs_collected_bookmarks_clean_v2';

export const getStoredMessages = (): CommunityMessage[] => {
  if (typeof window === 'undefined') return INITIAL_COMMUNITY_MESSAGES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(INITIAL_COMMUNITY_MESSAGES));
      return INITIAL_COMMUNITY_MESSAGES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_COMMUNITY_MESSAGES;
  }
};

export const saveMessage = (msg: Omit<CommunityMessage, 'id' | 'likes' | 'createdAt' | 'editionCode'>): CommunityMessage => {
  const current = getStoredMessages();
  const count = current.length + 1;
  const newMsg: CommunityMessage = {
    ...msg,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    likes: 0,
    createdAt: new Date().toISOString(),
    editionCode: `G360-${String(count).padStart(3, '0')}`,
  };

  const updated = [newMsg, ...current];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }
  return newMsg;
};

export const toggleLikeMessage = (id: string): { likes: number; isLiked: boolean } => {
  if (typeof window === 'undefined') return { likes: 0, isLiked: false };

  let likedIds: string[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIKES);
    if (raw) likedIds = JSON.parse(raw);
  } catch {
    likedIds = [];
  }

  const isLiked = likedIds.includes(id);
  const updatedLikes = isLiked ? likedIds.filter(x => x !== id) : [...likedIds, id];

  try {
    localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(updatedLikes));
  } catch (e) {
    console.error(e);
  }

  const messages = getStoredMessages();
  let newLikesCount = 0;
  const updatedMessages = messages.map(m => {
    if (m.id === id) {
      newLikesCount = isLiked ? Math.max(0, m.likes - 1) : m.likes + 1;
      return { ...m, likes: newLikesCount };
    }
    return m;
  });

  try {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updatedMessages));
  } catch (e) {
    console.error(e);
  }

  return { likes: newLikesCount, isLiked: !isLiked };
};

export const getUserLikedIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIKES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getRandomBookmark = (excludeId?: string): CollectibleBookmark => {
  const pool = excludeId 
    ? COLLECTIBLE_BOOKMARKS.filter(b => b.id !== excludeId)
    : COLLECTIBLE_BOOKMARKS;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index] || COLLECTIBLE_BOOKMARKS[0];
};

export const saveCollectedBookmark = (bookmark: CollectibleBookmark) => {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COLLECTED);
    const list: CollectibleBookmark[] = raw ? JSON.parse(raw) : [];
    if (!list.some(b => b.id === bookmark.id)) {
      list.push(bookmark);
      localStorage.setItem(STORAGE_KEY_COLLECTED, JSON.stringify(list));
    }
  } catch (e) {
    console.error(e);
  }
};
