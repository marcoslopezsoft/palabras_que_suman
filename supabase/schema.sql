-- ============================================================
-- TABLA DE MENSAJES COMUNITARIOS: PALABRAS QUE SUMAN
-- ============================================================
-- Copiá y pegá este código en Supabase -> SQL Editor -> New query -> Run

-- 1. Crear tabla de mensajes comunitarios (con soporte para Soft Delete)
create table if not exists public.community_messages (
  id text primary key,
  name text not null,
  role text not null,
  city text not null,
  message text not null,
  category text not null,
  theme text not null,
  likes integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  edition_code text,
  is_deleted boolean default false not null
);

-- Asegurar columna is_deleted si la tabla ya existía previamente
alter table public.community_messages 
  add column if not exists is_deleted boolean default false not null;

-- Índice para consultas rápidas del mural
create index if not exists idx_community_messages_visible 
  on public.community_messages (is_deleted, created_at desc);

-- 2. Habilitar seguridad de nivel de fila (Row Level Security - RLS)
alter table public.community_messages enable row level security;

-- 3. Políticas de acceso:
-- Eliminar políticas anteriores si existen para evitar duplicados
drop policy if exists "Cualquiera puede leer mensajes" on public.community_messages;
drop policy if exists "Cualquiera puede insertar un mensaje" on public.community_messages;
drop policy if exists "Cualquiera puede actualizar likes" on public.community_messages;

-- Solo se leen los mensajes que NO están marcados como eliminados (Soft Delete)
create policy "Cualquiera puede leer mensajes"
  on public.community_messages for select
  using (is_deleted = false);

-- Cualquiera puede enviar un mensaje
create policy "Cualquiera puede insertar un mensaje"
  on public.community_messages for insert
  with check (true);

-- Permite actualizar likes o marcar soft-delete
create policy "Cualquiera puede actualizar likes"
  on public.community_messages for update
  using (true)
  with check (true);

-- 4. Función SQL para incremento atómico de likes (evita condiciones de carrera)
create or replace function public.toggle_message_like(message_id text, increment_val integer)
returns integer
language plpgsql
security definer
as $$
declare
  new_likes integer;
begin
  update public.community_messages
  set likes = greatest(0, likes + increment_val)
  where id = message_id
  returning likes into new_likes;
  return coalesce(new_likes, 0);
end;
$$;

-- 5. Activar Tiempo Real (Realtime) para sincronización en vivo en el mural y tótem
alter publication supabase_realtime add table public.community_messages;
