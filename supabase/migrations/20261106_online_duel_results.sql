-- Resultado completo do duelo: a sala só termina quando os dois jogadores terminam.
alter table public.online_room_players
  add column if not exists elapsed_seconds numeric(12,3)
  check (elapsed_seconds is null or elapsed_seconds >= 0);
comment on column public.online_room_players.elapsed_seconds is
  'Tempo decorrido desde a largada sincronizada até o jogador concluir a missão.';
