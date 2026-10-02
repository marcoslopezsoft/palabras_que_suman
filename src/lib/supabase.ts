import { createClient } from '@supabase/supabase-js';
import { CommunityMessage } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  : null;

// Database Row mapping interface
export interface CommunityMessageRow {
  id: string;
  name: string;
  role: string;
  city: string;
  message: string;
  category: string;
  theme: string;
  likes: number;
  created_at: string;
  edition_code: string | null;
}

export const rowToMessage = (row: CommunityMessageRow): CommunityMessage => ({
  id: row.id,
  name: row.name,
  role: row.role,
  city: row.city,
  message: row.message,
  category: row.category as any,
  theme: row.theme as any,
  likes: row.likes ?? 0,
  createdAt: row.created_at,
  editionCode: row.edition_code || undefined,
});

export const messageToRow = (msg: CommunityMessage): CommunityMessageRow => ({
  id: msg.id,
  name: msg.name,
  role: msg.role,
  city: msg.city,
  message: msg.message,
  category: msg.category,
  theme: msg.theme,
  likes: msg.likes,
  created_at: msg.createdAt,
  edition_code: msg.editionCode || null,
});
