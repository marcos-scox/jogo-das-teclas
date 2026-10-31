-- Ranking global do Jogo das Teclas.
-- Escritas são feitas exclusivamente pela Edge Function usando service_role.
-- O frontend recebe apenas SELECT em leaderboard_entries.

create table if not exists public.ranking_runs (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  player_name text not null check (char_length(player_name) between 2 and 24),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  current_phase smallint not null default 0 check (current_phase between 0 and 4),
  score integer not null default 0 check (score >= 0),
  perfect_phases smallint not null default 0 check (perfect_phases between 0 and 5),
  extra_life boolean not null default false,
  status text not null default 'active' check (status in ('active', 'completed')),
  phase_started_at timestamptz,
  paused_at timestamptz,
  paused_seconds numeric(12,3) not null default 0 check (paused_seconds >= 0),
  ip_fingerprint text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists ranking_runs_ip_created_idx
  on public.ranking_runs (ip_fingerprint, created_at desc);

create table if not exists public.leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null unique references public.ranking_runs(id) on delete restrict,
  player_name text not null check (char_length(player_name) between 2 and 24),
  score integer not null check (score >= 0),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  completed_at timestamptz not null default now()
);

create index if not exists leaderboard_entries_difficulty_score_idx
  on public.leaderboard_entries (difficulty, score desc, completed_at asc);

alter table public.ranking_runs enable row level security;
alter table public.leaderboard_entries enable row level security;

revoke all on table public.ranking_runs from public, anon, authenticated;
revoke all on table public.leaderboard_entries from public, anon, authenticated;
grant all on table public.ranking_runs to service_role;
grant all on table public.leaderboard_entries to service_role;
grant select on table public.leaderboard_entries to anon, authenticated;

drop policy if exists "Deny public access to ranking sessions" on public.ranking_runs;
create policy "Deny public access to ranking sessions"
  on public.ranking_runs
  for all
  to anon, authenticated
  using (false)
  with check (false);

drop policy if exists "Public may read leaderboard" on public.leaderboard_entries;
create policy "Public may read leaderboard"
  on public.leaderboard_entries
  for select
  to anon, authenticated
  using (true);

comment on table public.ranking_runs is
  'Sessões privadas do ranking; sem acesso anon/authenticated. Alteradas somente pelo backend.';
comment on table public.leaderboard_entries is
  'Resultados globais concluídos; leitura pública, escrita apenas pela Edge Function.';
