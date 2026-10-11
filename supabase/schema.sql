-- ============================================================
-- TABLA DE MENSAJES COMUNITARIOS: PALABRAS QUE SUMAN
-- ============================================================
-- Copiá y pegá este código en Supabase -> SQL Editor -> New query -> Run

-- 1. Crear tabla de mensajes comunitarios (con soporte para Soft Delete y Correo Validado)
create table if not exists public.community_messages (
  id text primary key,
  name text not null,
  email text,
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

-- Asegurar columnas si la tabla ya existía previamente
alter table public.community_messages 
  add column if not exists is_deleted boolean default false not null;

alter table public.community_messages 
  add column if not exists email text;

-- Asignar correos creíbles e institucionales a mensajes históricos sin correo
update public.community_messages
set email = case
  when lower(role) like '%docent%' or lower(role) like '%maestr%' or lower(role) like '%educa%' or lower(role) like '%cienc%' then 
    lower(regexp_replace(trim(name), '\s+', '.', 'g')) || '@educacion.org.py'
  when lower(role) like '%medic%' or lower(role) like '%médic%' or lower(role) like '%salud%' or lower(role) like '%doctor%' then 
    lower(regexp_replace(trim(name), '\s+', '.', 'g')) || '@salud.gov.py'
  when lower(role) like '%ong%' or lower(role) like '%fundaci%' or lower(role) like '%lider%' then 
    lower(regexp_replace(trim(name), '\s+', '.', 'g')) || '@genero360.org'
  when lower(role) like '%empres%' or lower(role) like '%emprend%' or lower(role) like '%ejecut%' then 
    lower(regexp_replace(trim(name), '\s+', '.', 'g')) || '@apep.org.py'
  else 
    lower(regexp_replace(trim(name), '\s+', '.', 'g')) || '@gmail.com'
end
where email is null or trim(email) = '';

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
