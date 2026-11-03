-- Salas temporárias para duelos de digitação em tempo real.
-- Escritas e leituras são feitas exclusivamente pela Edge Function.
create table if not exists public.online_rooms (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[A-Z0-9]{6}$'),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  challenge_id text not null default 'duel-1',
  status text not null default 'waiting' check (status in ('waiting', 'countdown', 'racing', 'finished', 'expired')),
  started_at timestamptz,
  winner_slot smallint check (winner_slot in (1, 2)),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '2 hours')
);
create unique index if not exists online_rooms_code_idx on public.online_rooms(code);
create index if not exists online_rooms_expiry_idx on public.online_rooms(expires_at);
create table if not exists public.online_room_players (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.online_rooms(id) on delete cascade,
  slot smallint not null check (slot in (1, 2)),
  player_name text not null check (char_length(player_name) between 2 and 24),
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  ready boolean not null default false,
  progress integer not null default 0 check (progress >= 0),
  correct integer not null default 0 check (correct >= 0),
  mistakes integer not null default 0 check (mistakes >= 0),
  last_seen_at timestamptz not null default now(),
  finished_at timestamptz,
  unique(room_id, slot)
);
create index if not exists online_room_players_room_idx on public.online_room_players(room_id, slot);
alter table public.online_rooms enable row level security;
alter table public.online_room_players enable row level security;
revoke all on table public.online_rooms from public, anon, authenticated;
revoke all on table public.online_room_players from public, anon, authenticated;
grant all on table public.online_rooms to service_role;
grant all on table public.online_room_players to service_role;
drop policy if exists "Deny public access to online rooms" on public.online_rooms;
create policy "Deny public access to online rooms" on public.online_rooms for all to anon, authenticated using (false) with check (false);
drop policy if exists "Deny public access to online room players" on public.online_room_players;
create policy "Deny public access to online room players" on public.online_room_players for all to anon, authenticated using (false) with check (false);
