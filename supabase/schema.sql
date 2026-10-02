-- ============================================================
-- TABLA DE MENSAJES COMUNITARIOS: PALABRAS QUE SUMAN
-- ============================================================
-- Copiá y pegá este código en Supabase -> SQL Editor -> New query -> Run

-- 1. Crear tabla de mensajes comunitarios
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
  edition_code text
);

-- 2. Habilitar seguridad de nivel de fila (Row Level Security - RLS)
alter table public.community_messages enable row level security;

-- 3. Políticas de acceso (lectura y creación pública para la activación):
-- Política para permitir que cualquiera pueda leer los mensajes
create policy "Cualquiera puede leer mensajes"
  on public.community_messages for select
  using (true);

-- Política para permitir que cualquiera pueda registrar un nuevo mensaje
create policy "Cualquiera puede insertar un mensaje"
  on public.community_messages for insert
  with check (true);

-- Política para permitir actualizar los likes del mensaje
create policy "Cualquiera puede actualizar likes"
  on public.community_messages for update
  using (true)
  with check (true);

-- 4. Activar Tiempo Real (Realtime) para sincronización en vivo en el mural y tótem
alter publication supabase_realtime add table public.community_messages;
