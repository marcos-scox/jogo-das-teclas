-- Métricas agregadas e detalhes das fases para o ranking global.
alter table public.ranking_runs
  add column if not exists phase_details jsonb not null default '[]'::jsonb,
  add column if not exists correct_chars integer not null default 0 check (correct_chars >= 0);

alter table public.leaderboard_entries
  add column if not exists total_ppm numeric(10,2) check (total_ppm is null or total_ppm >= 0),
  add column if not exists phase_details jsonb not null default '[]'::jsonb;

comment on column public.leaderboard_entries.total_ppm is
  'PPM médio da campanha, recalculado no servidor a partir das fases concluídas e do tempo ativo total.';
comment on column public.leaderboard_entries.phase_details is
  'Métricas validadas pelo servidor para cada fase concluída da campanha.';
