-- Bônus competitivos e tempo ativo por campanha.
-- Os resultados antigos permanecem com active_seconds NULL porque seu tempo não foi registrado.

alter table public.ranking_runs
  add column if not exists active_seconds numeric(12,3) not null default 0
  check (active_seconds >= 0);

alter table public.leaderboard_entries
  add column if not exists active_seconds numeric(12,3)
  check (active_seconds is null or active_seconds >= 0);

create index if not exists leaderboard_entries_competitive_order_idx
  on public.leaderboard_entries (
    difficulty,
    score desc,
    active_seconds asc nulls last,
    completed_at asc,
    id asc
  );

comment on column public.ranking_runs.active_seconds is
  'Segundos ativos acumulados na campanha, inclusive tentativas perdidas; pausas, menus e transições são excluídos.';
comment on column public.leaderboard_entries.active_seconds is
  'Tempo ativo acumulado da campanha; NULL nos registros históricos anteriores à medição.';
