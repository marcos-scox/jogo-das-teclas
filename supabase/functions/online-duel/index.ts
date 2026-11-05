import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
const url = Deno.env.get("SUPABASE_URL")!;
const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const texts = {
  easy: "as primeiras estrelas surgem no céu e iluminam as naves que se aproximam devagar da cidade enquanto os moradores fecham as janelas e procuram um lugar seguro\nvocê prepara a defesa com calma enquanto a equipe guia cada família até o abrigo e mantém as ruas livres para todos que ainda precisam de ajuda",
  medium: "Alerta 1: as naves chegaram! A base precisa de ajuda agora. Avise a equipe e acenda os sinais de emergência.\nO painel mostra energia em 75%, escudos em 3 níveis e combustível para 12 minutos. Confira todos os dados antes de partir.\nO radar indica 18 invasores a 4 km; proteja o portão norte e acompanhe a rota A-7 pelo mapa.\nDigite cada instrução com atenção. Pressione Enter no fim deste parágrafo e prepare a defesa para o primeiro ataque!",
  hard: "os invasores chegaram pela lua. cada tecla certa dispara um tiro. mantenha a calma, olhe para a tela e digite sem pressa para proteger a base.\nO radar detectou 18 naves no setor norte; a primeira linha de defesa está a 2 km do portão.\nAtive o escudo principal em 100%, confirme a rota A-7 e informe à equipe que a evacuação começou às 21:45.\nCada erro aproxima a frota. Releia o comando, preserve a energia e mantenha uma distância segura de 30 metros.\nSua missão termina quando a última nave recua. Digite com precisão, proteja a cidade e mantenha o canal 9 aberto!"
} as const;
const cors = (req: Request) => ({ "Access-Control-Allow-Origin": req.headers.get("origin") || "*", "Access-Control-Allow-Headers": "apikey, authorization, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Content-Type": "application/json" });
const out = (req: Request, body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: cors(req) });
const fail = (req: Request, status: number, error: string) => out(req, { error }, status);
const token = () => Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, "0")).join("");
const hash = async (value: string) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))), b => b.toString(16).padStart(2, "0")).join("");
const nameOf = (value: unknown) => { if (typeof value !== "string") return null; const n = value.trim().replace(/\s+/gu, " "); return n.length >= 2 && n.length <= 24 && !/[\u0000-\u001f\u007f<>]/u.test(n) ? n : null; };
const codeOf = () => { const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; return Array.from(crypto.getRandomValues(new Uint8Array(6)), b => a[b % a.length]).join(""); };
async function state(room: any) { if (room.status === "countdown" && room.started_at && Date.parse(room.started_at) <= Date.now()) { await db.from("online_rooms").update({ status: "racing" }).eq("id", room.id).eq("status", "countdown"); room = { ...room, status: "racing" }; } const { data, error } = await db.from("online_room_players").select("slot,player_name,ready,progress,correct,mistakes,finished_at,elapsed_seconds").eq("room_id", room.id).order("slot"); if (error) throw error; return { code: room.code, difficulty: room.difficulty, status: room.status, startedAt: room.started_at, winnerSlot: room.winner_slot, text: texts[room.difficulty as keyof typeof texts], players: data || [] }; }
async function load(code: unknown, raw: unknown) { if (typeof code !== "string" || !/^[A-Z0-9]{6}$/.test(code) || typeof raw !== "string" || !/^[0-9a-f]{64}$/.test(raw)) return null; const { data: p } = await db.from("online_room_players").select("*").eq("token_hash", await hash(raw)).maybeSingle(); if (!p) return null; let { data: room } = await db.from("online_rooms").select("*").eq("id", p.room_id).eq("code", code).maybeSingle(); return room ? { room, player: p } : null; }
Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return fail(req, 405, "Use POST.");
  let body: any; try { body = await req.json(); } catch { return fail(req, 400, "JSON inválido."); }
  const action = body.action;
  if (action === "room-create") {
    if (!(body.difficulty in texts)) return fail(req, 400, "Dificuldade inválida.");
    const playerName = nameOf(body.playerName); if (!playerName) return fail(req, 400, "Informe um nome válido.");
    const raw = token(); let room: any = null;
    for (let i = 0; i < 4 && !room; i++) { const r = await db.from("online_rooms").insert({ code: codeOf(), difficulty: body.difficulty, challenge_id: "duel-1" }).select("*").single(); if (!r.error) room = r.data; }
    if (!room) return fail(req, 500, "Não foi possível criar a sala.");
    const p = await db.from("online_room_players").insert({ room_id: room.id, slot: 1, player_name: playerName, token_hash: await hash(raw) });
    if (p.error) return fail(req, 500, "Não foi possível registrar o jogador.");
    return out(req, { token: raw, slot: 1, state: await state(room) });
  }
  if (action === "room-join") {
    const code = typeof body.code === "string" ? body.code.trim().toUpperCase() : ""; const playerName = nameOf(body.playerName);
    if (!/^[A-Z0-9]{6}$/.test(code) || !playerName) return fail(req, 400, "Informe o código e um nome válido.");
    let { data: room } = await db.from("online_rooms").select("*").eq("code", code).eq("status", "waiting").gt("expires_at", new Date().toISOString()).maybeSingle();
    if (!room) return fail(req, 404, "Sala não encontrada ou já iniciada.");
    const raw = token(); const p = await db.from("online_room_players").insert({ room_id: room.id, slot: 2, player_name: playerName, token_hash: await hash(raw) });
    if (p.error) return fail(req, 409, "Essa sala já está cheia.");
    const startAt = new Date(Date.now() + 3500).toISOString();
    await db.from("online_rooms").update({ status: "countdown", started_at: startAt }).eq("id", room.id).eq("status", "waiting");
    room = { ...room, status: "countdown", started_at: startAt };
    return out(req, { token: raw, slot: 2, state: await state(room) });
  }
  const loaded = await load(body.code, body.token); if (!loaded) return fail(req, 403, "Sala inválida.");
  const { room, player } = loaded;
  if (action === "room-state") return out(req, { state: await state(room) });
  if (action === "room-ready") {
    if (room.status === "waiting") { const { data: ps } = await db.from("online_room_players").select("slot,ready").eq("room_id", room.id); if (!ps || ps.length < 2) return fail(req, 409, "Aguarde o segundo jogador entrar na sala."); await db.from("online_room_players").update({ ready: body.ready !== false }).eq("id", player.id); const { data: readyPlayers } = await db.from("online_room_players").select("ready").eq("room_id", room.id); if (readyPlayers?.length === 2 && readyPlayers.every(p => p.ready)) await db.from("online_rooms").update({ status: "countdown", started_at: new Date(Date.now() + 3500).toISOString() }).eq("id", room.id).eq("status", "waiting"); }
    return out(req, { state: await state(room) });
  }
  if (action === "room-progress" || action === "room-finish") {
    if (!(["countdown", "racing"].includes(room.status))) return fail(req, 409, "A partida ainda não começou.");
    const progress = Math.max(0, Math.min(20000, Number(body.progress) || 0)); const correct = Math.max(0, Math.min(20000, Number(body.correct) || 0)); const mistakes = Math.max(0, Math.min(20000, Number(body.mistakes) || 0));
    const now = new Date(); const elapsed = room.started_at ? Math.max(0, Math.round((now.getTime() - Date.parse(room.started_at)) / 10) / 100) : null;
    await db.from("online_room_players").update({ progress, correct, mistakes, last_seen_at: now.toISOString(), ...(action === "room-finish" ? { finished_at: now.toISOString(), elapsed_seconds: elapsed } : {}) }).eq("id", player.id);
    if (room.status === "countdown" && room.started_at && Date.parse(room.started_at) <= Date.now()) await db.from("online_rooms").update({ status: "racing" }).eq("id", room.id).eq("status", "countdown");
    if (action === "room-finish") { await db.from("online_rooms").update({ winner_slot: player.slot }).eq("id", room.id).eq("status", "racing").is("winner_slot", null); const { data: done } = await db.from("online_room_players").select("finished_at").eq("room_id", room.id); if (done?.length === 2 && done.every(p => p.finished_at)) await db.from("online_rooms").update({ status: "finished" }).eq("id", room.id).eq("status", "racing"); }
    const { data: freshRoom } = await db.from("online_rooms").select("*").eq("id", room.id).single();
    return out(req, { state: await state(freshRoom || room) });
  }
  return fail(req, 400, "Ação desconhecida.");
});
