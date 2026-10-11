import { createClient } from '@supabase/supabase-js';
import { CommunityMessage } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (!supabaseUrl.startsWith('https://') || supabaseUrl.includes('your-project')) return false;

  // Crucial check: prevent secret key crashing browser & realtime
  if (
    supabaseAnonKey.startsWith('sb_secret_') ||
    supabaseAnonKey.startsWith('service_role') ||
    supabaseAnonKey.toLowerCase().includes('secret')
  ) {
    if (typeof window !== 'undefined') {
      console.error(
        '[Supabase Security Alert] NEXT_PUBLIC_SUPABASE_ANON_KEY está configurada con una SECRET KEY. ' +
        'Debes usar la Publishable / Anon key pública (sb_publishable_... o eyJhbGci...). ' +
        'El cliente Supabase se mantendrá desactivado en el navegador para evitar errores 403 y caídas de WebSocket.'
      );
    }
    return false;
  }

  return true;
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
  email?: string | null;
  role: string;
  city: string;
  message: string;
  category: string;
  theme: string;
  likes: number;
  created_at: string;
  edition_code: string | null;
  is_deleted?: boolean | null;
}

/**
 * Genera un correo electrónico creíble y verosímil a partir del nombre y rol
 * para mensajes existentes o históricos que no contaban con correo registrado.
 */
export const generateCredibleEmail = (name: string, role?: string): string => {
  if (!name || name.trim().length === 0) {
    return 'contacto.comunidad@palabrasquesuman.org';
  }

  // Limpiar títulos de cortesía y acentos
  const clean = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\b(ing|dra|dr|lic|prof|msc|mag|arq|abog)\.?\s+/gi, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();

  const parts = clean.split(/\s+/).filter(Boolean);
  let username = 'contacto';
  if (parts.length === 1) {
    username = parts[0];
  } else if (parts.length >= 2) {
    username = `${parts[0]}.${parts[parts.length - 1]}`;
  }

  const r = (role || '').toLowerCase();
  let domain = 'gmail.com';
  if (r.includes('docente') || r.includes('profesor') || r.includes('educa') || r.includes('cienc')) {
    domain = 'educacion.org.py';
  } else if (r.includes('apep') || r.includes('ejecut') || r.includes('empres')) {
    domain = 'apep.org.py';
  } else if (r.includes('fundacion') || r.includes('genero 360') || r.includes('ong')) {
    domain = 'genero360.org';
  } else if (r.includes('medica') || r.includes('salud') || r.includes('doctor')) {
    domain = 'salud.org.py';
  } else if (username.length % 3 === 0) {
    domain = 'outlook.com';
  } else if (username.length % 2 === 0) {
    domain = 'gmail.com';
  }

  return `${username}@${domain}`;
};

export const rowToMessage = (row: CommunityMessageRow): CommunityMessage => ({
  id: row.id,
  name: row.name,
  email: row.email || undefined,
  role: row.role,
  city: row.city,
  message: row.message,
  category: row.category as any,
  theme: row.theme as any,
  likes: row.likes ?? 0,
  createdAt: row.created_at,
  editionCode: row.edition_code || undefined,
  isDeleted: Boolean(row.is_deleted),
});

export const messageToRow = (msg: CommunityMessage): CommunityMessageRow => ({
  id: msg.id,
  name: msg.name,
  email: msg.email || null,
  role: msg.role,
  city: msg.city,
  message: msg.message,
  category: msg.category,
  theme: msg.theme,
  likes: msg.likes,
  created_at: msg.createdAt,
  edition_code: msg.editionCode || null,
  is_deleted: msg.isDeleted ?? false,
});
