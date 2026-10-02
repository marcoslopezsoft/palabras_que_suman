import { CommunityMessage, CollectibleBookmark } from '@/types';
import { INITIAL_COMMUNITY_MESSAGES, COLLECTIBLE_BOOKMARKS } from '@/data/initialData';
import { supabase, isSupabaseConfigured, messageToRow, rowToMessage, CommunityMessageRow } from '@/lib/supabase';

const STORAGE_KEY_MESSAGES = 'pqs_community_messages_clean_v2';
const STORAGE_KEY_LIKES = 'pqs_user_likes_clean_v2';
const STORAGE_KEY_COLLECTED = 'pqs_collected_bookmarks_clean_v2';

/**
 * Limpia cualquier mensaje guardado previamente en el localStorage local
 * cuando Supabase está activo, asegurando que no haya conflictos, fantasmas
 * ni mensajes que solo existen en un único navegador.
 */
export const cleanupLegacyLocalMessages = () => {
  if (typeof window !== 'undefined' && isSupabaseConfigured()) {
    try {
      localStorage.removeItem(STORAGE_KEY_MESSAGES);
    } catch {
      // Ignorar errores en navegadores restrictivos
    }
  }
};

/**
 * Obtiene los mensajes locales.
 * Si Supabase está configurado, retorna [] para no mezclar datos locales obsoletos
 * y dejar que Supabase sea la ÚNICA fuente de verdad.
 */
export const getStoredMessages = (): CommunityMessage[] => {
  if (isSupabaseConfigured()) {
    cleanupLegacyLocalMessages();
    return [];
  }

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

/**
 * Consulta los mensajes globales directamente desde Supabase.
 * Nunca cae en fallback local si Supabase está activo, evitando duplicaciones.
 */
export const fetchCommunityMessages = async (): Promise<CommunityMessage[]> => {
  if (!supabase || !isSupabaseConfigured()) {
    return getStoredMessages();
  }

  cleanupLegacyLocalMessages();

  try {
    const { data, error } = await supabase
      .from('community_messages')
      .select('*')
      .neq('is_deleted', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error.message);
      return [];
    }

    if (data) {
      return (data as CommunityMessageRow[]).map(rowToMessage);
    }

    return [];
  } catch (err) {
    console.error('Error fetching from Supabase:', err);
    return [];
  }
};

/**
 * Guarda un mensaje.
 * Si Supabase está activo: Guarda ÚNICAMENTE en la base de datos remota.
 * Si no está configurado: Modo local offline con localStorage.
 */
export const saveMessage = async (
  msg: Omit<CommunityMessage, 'id' | 'likes' | 'createdAt' | 'editionCode'>
): Promise<CommunityMessage> => {
  const newMsg: CommunityMessage = {
    ...msg,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    likes: 0,
    createdAt: new Date().toISOString(),
    editionCode: `G360-${Math.floor(100 + Math.random() * 900)}`,
    isDeleted: false,
  };

  // 1. Supabase activo: Fuente única de verdad
  if (supabase && isSupabaseConfigured()) {
    const { error } = await supabase
      .from('community_messages')
      .insert(messageToRow(newMsg));

    if (error) {
      console.error('Error al guardar mensaje en Supabase:', error);
      throw new Error(`No se pudo guardar el mensaje: ${error.message}`);
    }

    cleanupLegacyLocalMessages();
    return newMsg;
  }

  // 2. Modo Offline / Desarrollo sin credenciales
  const current = getStoredMessages();
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

/**
 * Da o quita like a un mensaje.
 * Registra el ID en localStorage para recordar el voto de este navegador,
 * y sincroniza el contador atómicamente en Supabase.
 */
export const toggleLikeMessage = (
  id: string,
  currentLikes: number = 0
): { likes: number; isLiked: boolean } => {
  if (typeof window === 'undefined') return { likes: currentLikes, isLiked: false };

  let likedIds: string[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIKES);
    if (raw) likedIds = JSON.parse(raw);
  } catch {
    likedIds = [];
  }

  const isLiked = likedIds.includes(id);
  const updatedLikes = isLiked ? likedIds.filter((x) => x !== id) : [...likedIds, id];

  try {
    localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(updatedLikes));
  } catch (e) {
    console.error(e);
  }

  const incrementVal = isLiked ? -1 : 1;
  const newLikesCount = Math.max(0, currentLikes + incrementVal);

  if (supabase && isSupabaseConfigured()) {
    // Sincronización asíncrona con Supabase
    (async () => {
      try {
        const { error: rpcError } = await supabase.rpc('toggle_message_like', {
          message_id: id,
          increment_val: incrementVal,
        });
        if (rpcError) {
          await supabase
            .from('community_messages')
            .update({ likes: newLikesCount })
            .eq('id', id);
        }
      } catch (err) {
        console.error('Failed to update likes in Supabase:', err);
      }
    })();
  } else {
    // Modo offline en navegador
    const messages = getStoredMessages();
    const updatedMessages = messages.map((m) => {
      if (m.id === id) {
        return { ...m, likes: newLikesCount };
      }
      return m;
    });

    try {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updatedMessages));
    } catch (e) {
      console.error(e);
    }
  }

  return { likes: newLikesCount, isLiked: !isLiked };
};

/**
 * Suscripción en Tiempo Real (WebSockets).
 * Recibe nuevos mensajes y actualizaciones (como likes o soft delete).
 */
export const subscribeToCommunityMessages = (
  onInsert?: (msg: CommunityMessage) => void,
  onUpdate?: (msg: CommunityMessage) => void
) => {
  const client = supabase;
  if (!client || !isSupabaseConfigured()) return () => {};

  try {
    const channel = client
      .channel('realtime_community_messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'community_messages' },
        (payload) => {
          if (onInsert && payload.new) {
            const newMsg = rowToMessage(payload.new as any);
            onInsert(newMsg);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'community_messages' },
        (payload) => {
          if (onUpdate && payload.new) {
            const updatedMsg = rowToMessage(payload.new as any);
            onUpdate(updatedMsg);
          }
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Realtime subscription error:', err);
    return () => {};
  }
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
    ? COLLECTIBLE_BOOKMARKS.filter((b) => b.id !== excludeId)
    : COLLECTIBLE_BOOKMARKS;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index] || COLLECTIBLE_BOOKMARKS[0];
};

export const saveCollectedBookmark = (bookmark: CollectibleBookmark) => {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COLLECTED);
    const list: CollectibleBookmark[] = raw ? JSON.parse(raw) : [];
    if (!list.some((b) => b.id === bookmark.id)) {
      list.push(bookmark);
      localStorage.setItem(STORAGE_KEY_COLLECTED, JSON.stringify(list));
    }
  } catch (e) {
    console.error(e);
  }
};

export const softDeleteMessage = (id: string) => {
  if (supabase && isSupabaseConfigured()) {
    (async () => {
      try {
        const { error } = await supabase
          .from('community_messages')
          .update({ is_deleted: true })
          .eq('id', id);
        if (error) {
          console.error('Error soft-deleting message in Supabase:', error);
        }
      } catch (err) {
        console.error('Failed to soft-delete in Supabase:', err);
      }
    })();
  } else {
    const current = getStoredMessages();
    const updated = current.filter((m) => m.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  }
};
