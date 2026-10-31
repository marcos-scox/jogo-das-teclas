import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const PHASES = [
  "os invasores chegaram pela lua. cada tecla certa dispara um tiro. mantenha a calma, olhe para a tela e digite sem pressa para proteger a base.",
  "Os morcegos digitais voam rápido e atacam em grupo. Respire fundo e mantenha os dedos na posição inicial. Cada palavra completa enfraquece o bando e deixa a base um pouco mais segura.",
  "Alerta: uma frota de drones cruzou a barreira de energia! Eles são pequenos, mas resistentes, e só recuam diante de quem digita com precisão. Não tente correr demais; um erro agora custa caro. Concentre-se, siga o ritmo e derrube um por um.",
  "Relatório da base: 12 torres ativas, 3 em manutenção e 1 gerador funcionando com 75% da carga. Os robôs blindados avançam em fila e exigem 4 tiros cada. Comandante, a decisão é sua: segure a posição, economize energia e não deixe que eles cheguem a menos de 50 metros do portão.",
  "Atenção, último aviso: o Rei dos Erros despertou. Ele se alimenta de cada tecla trocada, de cada letra esquecida e de cada pressa sem sentido. Para vencê-lo, você vai precisar de foco total, mãos leves e olhos na tela. Lembre-se do treino: posição, ritmo e precisão. Se chegou até aqui, já provou que é capaz. Agora, termine o que começou!",
];
const SETTINGS = {
  easy: { seconds: 180, errorPenalty: 0, correctBonus: 0 },
  medium: { seconds: 120, errorPenalty: 5, correctBonus: 0 },
  hard: { seconds: 60, errorPenalty: 5, correctBonus: 1 },
} as const;
type Difficulty = keyof typeof SETTINGS;

const ALLOWED_ORIGINS = new Set([
  "https://marcos-scox.github.io",
  "http://localhost:8787",
  "http://127.0.0.1:8787",
]);
function headersFor(req: Request): HeadersInit {
  const origin = req.headers.get("origin") || "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
  if (ALLOWED_ORIGINS.has(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}
function response(req: Request, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headersFor(req), "Content-Type": "application/json; charset=utf-8" },
  });
}
function fail(req: Request, status: number, error: string): Response {
  return response(req, { error }, status);
}
function validDifficulty(value: unknown): value is Difficulty {
  return value === "easy" || value === "medium" || value === "hard";
}
function cleanName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const name = value.trim().replace(/\s+/gu, " ");
  const length = Array.from(name).length;
  if (length < 2 || length > 24 || /[\u0000-\u001f\u007f<>]/u.test(name)) return null;
  return name;
}
async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function token(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function matches(input: string, expected: string, accentsOptional: boolean): boolean {
  if (input === expected) return true;
  if (!accentsOptional) return false;
  const strip = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/gu, "");
  return strip(input) === strip(expected);
}
async function loadRun(id: unknown, rawToken: unknown) {
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/iu.test(id) || typeof rawToken !== "string" || !/^[0-9a-f]{64}$/u.test(rawToken)) {
    return { run: null, error: "Sessão inválida." };
  }
  const tokenHash = await sha256(rawToken);
  const { data, error } = await admin.from("ranking_runs").select("*").eq("id", id).eq("token_hash", tokenHash).maybeSingle();
  return { run: data, error: error?.message || (!data ? "Sessão não encontrada." : null) };
}
async function getEntry(runId: string) {
  const { data, error } = await admin.from("leaderboard_entries")
    .select("id, player_name, score, difficulty, completed_at")
    .eq("run_id", runId).maybeSingle();
  if (error) throw error;
  return data;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: headersFor(req) });
  if (req.method !== "POST") return fail(req, 405, "Use POST.");
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return fail(req, 500, "Configuração segura da função indisponível.");

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(req, 400, "JSON inválido.");
  }
  const action = body.action;

  if (action === "start") {
    if (!validDifficulty(body.difficulty)) return fail(req, 400, "Dificuldade inválida.");
    const playerName = cleanName(body.playerName);
    if (!playerName) return fail(req, 400, "Informe um nome de 2 a 24 caracteres.");

    let carriedPerfect = 0;
    let carriedExtraLife = false;
    if (body.parentRunId !== undefined || body.parentToken !== undefined) {
      const parent = await loadRun(body.parentRunId, body.parentToken);
      if (parent.error || !parent.run || parent.run.difficulty !== body.difficulty) return fail(req, 403, "A sessão anterior não pode ser validada.");
      carriedPerfect = Number(parent.run.perfect_phases || 0);
      carriedExtraLife = Boolean(parent.run.extra_life);
    }

    const forwarded = req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const fingerprint = await sha256(`${forwarded}|${req.headers.get("user-agent") || ""}`);
    const since = new Date(Date.now() - 60_000).toISOString();
    const { count, error: rateError } = await admin.from("ranking_runs")
      .select("id", { count: "exact", head: true })
      .eq("ip_fingerprint", fingerprint).gte("created_at", since);
    if (rateError) return fail(req, 500, "Não foi possível iniciar a sessão do ranking.");
    if ((count || 0) >= 5) return fail(req, 429, "Muitas tentativas em pouco tempo. Aguarde um minuto.");

    const rawToken = token();
    const { data, error } = await admin.from("ranking_runs").insert({
      token_hash: await sha256(rawToken),
      player_name: playerName,
      difficulty: body.difficulty,
      perfect_phases: carriedPerfect,
      extra_life: carriedExtraLife,
      ip_fingerprint: fingerprint,
    }).select("id").single();
    if (error) return fail(req, 500, "Não foi possível iniciar a sessão do ranking.");
    return response(req, { runId: data.id, token: rawToken });
  }

  const { run, error: loadError } = await loadRun(body.runId, body.token);
  if (loadError || !run) return fail(req, 403, loadError || "Sessão inválida.");

  if (action === "phase-begin") {
    if (run.status !== "active") return fail(req, 409, "A sessão já foi concluída.");
    // O cronômetro do jogo inicia após a contagem visual de 2,25 segundos.
    const startsAt = new Date(Date.now() + 2250).toISOString();
    const { data: started, error } = await admin.from("ranking_runs").update({
      phase_started_at: startsAt,
      paused_at: null,
      paused_seconds: 0,
    }).eq("id", run.id).eq("status", "active").eq("current_phase", run.current_phase).select("id").maybeSingle();
    if (error) return fail(req, 500, "Não foi possível iniciar a validação da fase.");
    if (!started) return fail(req, 409, "A sessão mudou antes do início da fase.");
    return response(req, { ok: true, phase: run.current_phase });
  }

  if (action === "pause") {
    if (run.status !== "active" || !run.phase_started_at) return fail(req, 409, "Não há fase ativa para pausar.");
    if (run.paused_at) return response(req, { ok: true });
    const { error } = await admin.from("ranking_runs").update({ paused_at: new Date().toISOString() })
      .eq("id", run.id).eq("status", "active").is("paused_at", null);
    if (error) return fail(req, 500, "Não foi possível pausar a validação.");
    return response(req, { ok: true });
  }

  if (action === "resume") {
    if (run.status !== "active" || !run.paused_at) return fail(req, 409, "A fase não está pausada.");
    const pauseSeconds = Math.max(0, (Date.now() - Date.parse(run.paused_at)) / 1000);
    const { error } = await admin.from("ranking_runs").update({
      paused_seconds: Number(run.paused_seconds || 0) + pauseSeconds,
      paused_at: null,
    }).eq("id", run.id).eq("status", "active").not("paused_at", "is", null);
    if (error) return fail(req, 500, "Não foi possível retomar a validação.");
    return response(req, { ok: true });
  }

  if (action !== "complete-phase") return fail(req, 400, "Ação desconhecida.");

  if (run.status === "completed") {
    const entry = await getEntry(run.id);
    return response(req, { ok: true, completed: true, score: run.score, entry });
  }
  if (!Number.isInteger(body.phase) || body.phase !== run.current_phase || run.current_phase < 0 || run.current_phase >= PHASES.length) {
    return fail(req, 409, "A sequência de fases não corresponde à sessão.");
  }
  if (!run.phase_started_at || run.paused_at) return fail(req, 409, "A fase não foi iniciada ou ainda está pausada.");
  if (typeof body.inputs !== "string" || body.inputs.length > 12_000) return fail(req, 400, "Trilha de teclas inválida.");
  if (typeof body.accentsOptional !== "boolean") return fail(req, 400, "Preferência de acentos inválida.");

  const phaseText = Array.from(PHASES[run.current_phase]);
  const typedKeys = Array.from(body.inputs);
  if (typedKeys.length > phaseText.length * 6) return fail(req, 400, "Trilha de teclas excede o limite da fase.");

  let position = 0;
  let errors = 0;
  let correct = 0;
  let streak = 0;
  let earnedPoints = 0;
  for (const key of typedKeys) {
    if (position >= phaseText.length) return fail(req, 400, "Há teclas registradas após o fim do texto.");
    if (matches(key, phaseText[position], body.accentsOptional)) {
      position++;
      correct++;
      streak++;
      earnedPoints += 10 * Math.min(4, 1 + Math.floor(streak / 20));
    } else {
      errors++;
      streak = 0;
    }
  }
  if (position !== phaseText.length) return fail(req, 400, "O texto da fase não foi concluído.");
  const defenseLimit = 5 + (run.extra_life ? 1 : 0);
  if (errors >= defenseLimit) return fail(req, 400, "A fase excedeu os pontos de defesa disponíveis.");

  const now = Date.now();
  const activeSeconds = Math.max(0, (now - Date.parse(run.phase_started_at)) / 1000 - Number(run.paused_seconds || 0));
  // Rejeita conclusões em velocidade incompatível até com digitação muito rápida.
  const minimumSeconds = Math.max(3, typedKeys.length * 0.05);
  if (activeSeconds + 0.25 < minimumSeconds) return fail(req, 400, "A conclusão foi rápida demais para validar a trilha de teclas.");

  const settings = SETTINGS[run.difficulty as Difficulty];
  const remaining = settings.seconds - activeSeconds - errors * settings.errorPenalty + correct * settings.correctBonus;
  if (remaining <= 0) return fail(req, 400, "O tempo da fase se esgotou antes da conclusão.");
  const perfectPhases = Number(run.perfect_phases || 0) + (errors === 0 ? 1 : 0);
  const extraLife = Boolean(run.extra_life) || perfectPhases >= 3;
  const phaseBonus = Math.ceil(remaining) * 10 + (defenseLimit - errors) * 100;
  const totalScore = Number(run.score || 0) + earnedPoints + phaseBonus;
  const isFinal = run.current_phase === PHASES.length - 1;

  const update = {
    score: totalScore,
    perfect_phases: perfectPhases,
    extra_life: extraLife,
    current_phase: isFinal ? run.current_phase : run.current_phase + 1,
    phase_started_at: null,
    paused_at: null,
    paused_seconds: 0,
    status: isFinal ? "completed" : "active",
    completed_at: isFinal ? new Date(now).toISOString() : null,
  };
  const { data: updated, error: updateError } = await admin.from("ranking_runs").update(update)
    .eq("id", run.id).eq("status", "active").eq("current_phase", run.current_phase)
    .eq("phase_started_at", run.phase_started_at).select("id").maybeSingle();
  if (updateError) return fail(req, 500, "Não foi possível salvar a validação da fase.");
  if (!updated) {
    const { data: latest } = await admin.from("ranking_runs").select("current_phase, score, status")
      .eq("id", run.id).maybeSingle();
    if (latest && (latest.current_phase > run.current_phase || latest.status === "completed")) {
      const entry = latest.status === "completed" ? await getEntry(run.id) : null;
      return response(req, { ok: true, completed: latest.status === "completed", score: latest.score, entry });
    }
    return fail(req, 409, "A fase já foi recebida ou a sessão mudou. Atualize o ranking ao concluir.");
  }

  if (!isFinal) return response(req, {
    ok: true,
    completed: false,
    phase: run.current_phase,
    score: totalScore,
    phaseBonus,
    remainingSeconds: Math.ceil(remaining),
    perfectPhases,
    extraLife,
  });

  // O índice UNIQUE(run_id) torna a finalização idempotente para a mesma partida.
  const { error: entryError } = await admin.from("leaderboard_entries").upsert({
    run_id: run.id,
    player_name: run.player_name,
    score: totalScore,
    difficulty: run.difficulty,
    completed_at: new Date(now).toISOString(),
  }, { onConflict: "run_id", ignoreDuplicates: true });
  if (entryError) return fail(req, 500, "A campanha foi validada, mas não foi possível gravar no ranking.");
  const entry = await getEntry(run.id);
  return response(req, { ok: true, completed: true, score: totalScore, phaseBonus, remainingSeconds: Math.ceil(remaining), perfectPhases, extraLife, entry });
});
