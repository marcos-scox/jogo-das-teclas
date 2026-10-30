
'use strict';
(function(){

/* ===================== TEXTOS ===================== */
const FREE = [
  {id:'f1', title:'O primeiro passo', level:1, text:'Digitar bem é uma questão de prática e paciência. Coloque os dedos na fileira do meio, olhe para a tela e não para o teclado. No começo parece lento, mas cada dia de treino deixa seus dedos mais rápidos e mais precisos.'},
  {id:'f2', title:'Café da manhã', level:1, text:'A casa ainda estava em silêncio quando o cheiro do café tomou conta da cozinha. Na mesa havia pão quente, manteiga, frutas cortadas e um copo de suco de laranja. Era o melhor momento do dia para pensar com calma.'},
  {id:'f3', title:'O ritmo do mar', level:1, text:'O mar nunca fica parado. As ondas chegam devagar, molham a areia e voltam para buscar mais força. Quem observa o mar por alguns minutos aprende que tudo tem um ritmo próprio e que a pressa raramente ajuda.'},
  {id:'f4', title:'A biblioteca', level:2, text:'Na biblioteca da cidade, as estantes iam do chão ao teto. Havia livros de história, ciência, poesia e aventura, todos esperando por um leitor curioso. A bibliotecária dizia que cada livro era uma porta: bastava ter coragem para abrir e atravessar.'},
  {id:'f5', title:'Horta em casa', level:2, text:'Começar uma horta em casa é mais simples do que parece. Escolha um lugar com pelo menos quatro horas de sol, prepare a terra com adubo e comece por plantas fáceis, como cebolinha, alface e manjericão. Regue cedo ou no fim da tarde e tenha paciência: a natureza não tem pressa.'},
  {id:'f6', title:'Viagem de trem', level:2, text:'O trem saiu da estação às sete em ponto. Pela janela, a paisagem mudava a cada minuto: primeiro os prédios, depois os campos verdes, os rios largos e as pequenas cidades com suas igrejas brancas. Viajar devagar também é uma forma de chegar.'},
  {id:'f7', title:'O cérebro e o hábito', level:2, text:'Quando repetimos uma ação muitas vezes, o cérebro cria atalhos para executá-la com menos esforço. É assim que aprendemos a andar de bicicleta, dirigir ou tocar um instrumento. Com a digitação acontece o mesmo: a repetição transforma movimentos pensados em gestos automáticos.'},
  {id:'f8', title:'Bolo de cenoura', level:3, text:'Bolo simples de cenoura: bata no liquidificador 3 cenouras médias, 4 ovos e 1 xícara de óleo. Em uma tigela, misture 2 xícaras de farinha, 1 e 1/2 xícara de açúcar e 1 colher (sopa) de fermento. Junte tudo, despeje na forma untada e asse a 180 graus por cerca de 40 minutos.'},
  {id:'f9', title:'Uma breve história da escrita', level:3, text:'Há mais de 5 mil anos, na Mesopotâmia, surgiram os primeiros registros escritos: marcas feitas em placas de argila para contar grãos, animais e dívidas. Depois vieram os hieróglifos egípcios, o alfabeto fenício e, muito tempo depois, a prensa de Gutenberg (por volta de 1450), que mudou para sempre a circulação de ideias.'},
  {id:'f10', title:'O teclado QWERTY', level:3, text:'O teclado QWERTY recebeu esse nome por causa das seis primeiras letras da fileira superior. Ele foi criado no século XIX para máquinas de escrever e, curiosamente, continua sendo o padrão mais usado no mundo. No Brasil, o layout ABNT2 acrescenta a tecla Ç e teclas próprias para acentos; por isso, vale treinar com atenção!'}
];

const TIMED = [
  {id:'t1', title:'Rotina produtiva', text:'Uma rotina produtiva não depende de acordar às cinco da manhã, mas de saber o que fazer primeiro. Separe alguns minutos no início do dia para listar as três tarefas mais importantes e comece pela mais difícil. Faça pausas curtas a cada hora, beba água e evite abrir mensagens a todo instante. No fim do dia, revise o que foi feito e prepare a lista do dia seguinte.'},
  {id:'t2', title:'Água, um bem precioso', text:'Cerca de setenta por cento da superfície da Terra é coberta por água, mas apenas uma pequena parte dela é doce e está disponível para consumo. Rios, lagos e reservatórios subterrâneos abastecem cidades inteiras, plantações e indústrias. Cuidar das nascentes, evitar desperdícios e tratar o esgoto são atitudes que garantem água para as próximas gerações.'},
  {id:'t3', title:'A arte de ouvir', text:'Ouvir de verdade é mais difícil do que falar. Exige atenção, silêncio interior e vontade de entender o outro antes de responder. Muitas discussões terminariam mais cedo se cada pessoa esperasse o outro concluir o raciocínio. Experimente, na próxima conversa, fazer uma pergunta a mais e dar uma opinião a menos. Você pode se surpreender com o que vai descobrir.'},
  {id:'t4', title:'Futebol de rua', text:'Na rua de terra, dois chinelos marcavam o gol e a bola era de meia. Não havia juiz, uniforme ou placar eletrônico, mas todo mundo sabia exatamente quem estava ganhando. O jogo parava quando passava um carro e recomeçava logo depois, com a mesma alegria. Quando a noite chegava, as mães chamavam pela janela e a partida terminava sempre com a promessa de revanche no dia seguinte.'},
  {id:'t5', title:'Energia do Sol', text:'Em cerca de uma hora e meia, o Sol envia à Terra mais energia do que a humanidade consome em um ano inteiro. Os painéis solares transformam parte dessa luz em eletricidade usando células feitas de silício. No Brasil, onde há sol forte durante boa parte do ano, essa tecnologia se espalhou por casas, comércios e fazendas, reduzindo contas de luz e a dependência de outras fontes.'},
  {id:'t6', title:'A cidade à noite', text:'Quando o sol se põe, a cidade troca de roupa. As janelas dos prédios se acendem uma a uma, os bares colocam mesas na calçada e o barulho do trânsito dá lugar a conversas e risadas. Um entregador corta caminho de bicicleta, um casal escolhe onde jantar e um vigia começa seu turno. A noite tem seus próprios personagens e seu próprio ritmo.'},
  {id:'t7', title:'Aprender um idioma', text:'Aprender um novo idioma é como montar um quebra-cabeça enorme sem ver a imagem da caixa. No começo, as peças parecem soltas: palavras isoladas, regras estranhas, sons difíceis. Com o tempo, elas se encaixam, e de repente você entende uma música, uma piada ou um filme sem legenda. O segredo é praticar um pouco todos os dias, sem medo de errar.'},
  {id:'t8', title:'Aves migratórias', text:'Todos os anos, milhares de aves atravessam continentes em busca de alimento e clima favorável. Algumas espécies voam mais de dez mil quilômetros, orientando-se pelo Sol, pelas estrelas e até pelo campo magnético da Terra. Elas fazem paradas estratégicas em praias e áreas alagadas para descansar e se alimentar, e por isso proteger esses lugares é essencial para que a viagem continue.'},
  {id:'t9', title:'Primeiro emprego', text:'No primeiro dia de trabalho, Ana chegou quinze minutos antes do horário. Estava nervosa, mas tinha decidido prestar atenção em tudo e anotar o que não entendesse. Aprendeu os nomes dos colegas, descobriu onde ficava cada coisa e fez perguntas sem vergonha. Ao final da semana, percebeu que ninguém esperava que ela soubesse tudo; esperavam apenas que estivesse disposta a aprender.'},
  {id:'t10', title:'Tecnologia no bolso', text:'O celular que carregamos hoje tem mais capacidade de processamento do que os computadores usados para levar o ser humano à Lua. Com ele, pagamos contas, estudamos, conversamos com pessoas do outro lado do mundo e guardamos milhares de fotos. Usar essa ferramenta com equilíbrio, sem deixar que ela controle o nosso tempo, é um dos grandes desafios da vida moderna.'}
];

const PHASES = [
  {name:'Gosmas lunares', enemy:'slime', hp:3, max:4, color:'#7EE081',
   desc:'Lentas e moles, aguentam 3 tiros cada. Bom momento para achar o ritmo.',
   text:'os invasores chegaram pela lua. cada tecla certa dispara um tiro. mantenha a calma, olhe para a tela e digite sem pressa para proteger a base.'},
  {name:'Morcegos digitais', enemy:'bat', hp:2, max:6, color:'#B98CFF',
   desc:'Chegam em bando, mas caem com 2 tiros. Não se assuste com a quantidade.',
   text:'Os morcegos digitais voam rápido e atacam em grupo. Respire fundo e mantenha os dedos na posição inicial. Cada palavra completa enfraquece o bando e deixa a base um pouco mais segura.'},
  {name:'Frota de drones', enemy:'drone', hp:3, max:5, color:'#5ED0F0',
   desc:'Pequenos e resistentes: 3 tiros cada. O texto tem pontuação, então atenção às vírgulas.',
   text:'Alerta: uma frota de drones cruzou a barreira de energia! Eles são pequenos, mas resistentes, e só recuam diante de quem digita com precisão. Não tente correr demais; um erro agora custa caro. Concentre-se, siga o ritmo e derrube um por um.'},
  {name:'Robôs blindados', enemy:'robot', hp:4, max:4, color:'#FF9157',
   desc:'Avançam em fila e exigem 4 tiros cada. O texto tem números: atenção à fileira de cima.',
   text:'Relatório da base: 12 torres ativas, 3 em manutenção e 1 gerador funcionando com 75% da carga. Os robôs blindados avançam em fila e exigem 4 tiros cada. Comandante, a decisão é sua: segure a posição, economize energia e não deixe que eles cheguem a menos de 50 metros do portão.'},
  {name:'O Rei dos Erros', enemy:'boss', hp:0, max:1, color:'#FF5C8A',
   desc:'Um só inimigo, com uma vida para cada letra do texto. Termine o texto e ele cai.',
   text:'Atenção, último aviso: o Rei dos Erros despertou. Ele se alimenta de cada tecla trocada, de cada letra esquecida e de cada pressa sem sentido. Para vencê-lo, você vai precisar de foco total, mãos leves e olhos na tela. Lembre-se do treino: posição, ritmo e precisão. Se chegou até aqui, já provou que é capaz. Agora, termine o que começou!'}
];

const TIPS = [
  'Deixe os indicadores sobre F e J. As pequenas saliências nessas teclas guiam seus dedos sem precisar olhar.',
  'Precisão primeiro, velocidade depois. Errar menos acelera mais do que tentar correr.',
  'Use o polegar da mão que não vai digitar a próxima letra para apertar o espaço.',
  'Mantenha os punhos retos e os ombros relaxados. Tensão deixa os dedos lentos e cansa mais rápido.',
  'Dez minutos por dia rendem mais do que uma hora uma vez por semana.',
  'Travou numa tecla? Diminua o ritmo e digite a palavra inteira com calma algumas vezes.',
  'Use o dedo mínimo para Shift, Enter e Backspace, sem tirar a mão da posição inicial.',
  'Leia uma ou duas palavras à frente do cursor. Isso deixa o ritmo mais contínuo.'
];

/* ===================== UTILITÁRIOS ===================== */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const fmt = n => Math.round(n).toLocaleString('pt-BR');
const mmss = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s/60) + ':' + String(s%60).padStart(2,'0'); };
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const strip = c => c.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const secLabel = s => s < 60 ? s + ' s' : (s % 60 ? Math.floor(s/60) + ' min ' + (s%60) + ' s' : (s/60) + ' min');
const words = t => t.trim().split(/\s+/).length;

/* ===================== ARMAZENAMENTO ===================== */
const Store = {
  key:'toque-certo:v1',
  data:{prefs:{sound:true, accents:true, timed:60}, free:{}, timed:{}, game:{best:0, phase:0}},
  load(){
    try{
      const raw = localStorage.getItem(this.key);
      if(!raw) return;
      const d = JSON.parse(raw) || {};
      this.data = {
        prefs:Object.assign({}, this.data.prefs, d.prefs || {}),
        free:Object.assign({}, d.free || {}),
        timed:Object.assign({}, d.timed || {}),
        game:Object.assign({}, this.data.game, d.game || {})
      };
    }catch(e){}
  },
  save(){ try{ localStorage.setItem(this.key, JSON.stringify(this.data)); }catch(e){} }
};
Store.load();

function sameChar(a, b){
  if(a === b) return true;
  if(!Store.data.prefs.accents) return strip(a) === strip(b);
  return false;
}

/* ===================== SOM ===================== */
const Sfx = {
  ctx:null, noise:null,
  unlock(){
    if(this.ctx){ if(this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return;
    try{
      this.ctx = new AC();
      const len = Math.floor(this.ctx.sampleRate * 0.6);
      const b = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = b.getChannelData(0);
      for(let i=0;i<len;i++) d[i] = Math.random()*2 - 1;
      this.noise = b;
    }catch(e){ this.ctx = null; }
  },
  on(){ return Store.data.prefs.sound && this.ctx && this.ctx.state === 'running'; },
  tone(f, d, type, v, f2, delay){
    if(!this.on()) return;
    const c = this.ctx, t = c.currentTime + (delay || 0);
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(f, t);
    if(f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(v || 0.04, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + d + 0.02);
  },
  burst(d, v, freq){
    if(!this.on() || !this.noise) return;
    const c = this.ctx, t = c.currentTime;
    const s = c.createBufferSource(); s.buffer = this.noise;
    const f = c.createBiquadFilter(); f.type = 'lowpass';
    f.frequency.setValueAtTime(freq, t); f.frequency.exponentialRampToValueAtTime(80, t + d);
    const g = c.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    s.connect(f); f.connect(g); g.connect(c.destination);
    s.start(t); s.stop(t + d);
  },
  shot(){ this.tone(1250, 0.05, 'square', 0.016, 520); },
  hit(){ this.tone(320, 0.04, 'triangle', 0.02, 180); },
  boom(big){ this.burst(big ? 0.9 : 0.26, big ? 0.16 : 0.08, big ? 2200 : 1400); },
  error(){ this.tone(130, 0.22, 'sawtooth', 0.05, 70); },
  tick(hi){ this.tone(hi ? 880 : 520, 0.09, 'square', 0.03); },
  clear(){ [523,659,784,1047].forEach((f,i) => this.tone(f, 0.14, 'square', 0.035, null, i*0.09)); },
  lose(){ [392,330,262,196].forEach((f,i) => this.tone(f, 0.2, 'triangle', 0.05, null, i*0.13)); }
};

/* ===================== MOTOR DE DIGITAÇÃO ===================== */
class Typer{
  constructor(view, text, opts){
    this.view = view; this.opts = opts || {};
    this.chars = Array.from(text);
    this.typed = []; this.pos = 0; this.correct = 0;
    this.keys = 0; this.wrongKeys = 0; this.misses = new Map();
    this.started = false; this.done = false; this.t0 = 0; this.tEnd = 0;
    this.lastTop = -1; this.cur = null;
    this.build();
  }
  build(){
    this.view.textContent = '';
    const inner = document.createElement('div');
    inner.className = 'tx-inner';
    const frag = document.createDocumentFragment();
    this.spans = this.chars.map(ch => {
      const s = document.createElement('span');
      s.className = ch === ' ' ? 'c sp' : 'c';
      s.textContent = ch;
      frag.appendChild(s);
      return s;
    });
    inner.appendChild(frag);
    this.view.appendChild(inner);
    this.inner = inner;
    this.setCur();
  }
  setCur(){
    if(this.cur) this.cur.classList.remove('cur');
    this.cur = (!this.done && this.pos < this.spans.length) ? this.spans[this.pos] : null;
    if(this.cur) this.cur.classList.add('cur');
    this.scroll();
  }
  scroll(){
    if(!this.spans.length) return;
    const s = this.spans[Math.min(this.pos, this.spans.length - 1)];
    const top = s.offsetTop;
    if(top === this.lastTop) return;
    this.lastTop = top;
    const lh = parseFloat(getComputedStyle(this.view).lineHeight) || 32;
    const line = Math.round((top - this.spans[0].offsetTop) / lh);
    this.inner.style.transform = 'translateY(' + (-Math.max(0, line - 1) * lh) + 'px)';
  }
  rescroll(){ this.lastTop = -1; this.scroll(); }
  input(ch){
    if(this.done || this.pos >= this.chars.length) return;
    if(!this.started){ this.started = true; this.t0 = performance.now(); if(this.opts.onStart) this.opts.onStart(); }
    const exp = this.chars[this.pos];
    const ok = sameChar(ch, exp);
    const span = this.spans[this.pos];
    this.keys++;
    if(!ok){ this.wrongKeys++; this.misses.set(exp, (this.misses.get(exp) || 0) + 1); }
    if(this.opts.strict){
      if(ok){
        if(span.classList.contains('miss')){ span.classList.remove('miss'); span.classList.add('was'); }
        span.classList.add('ok');
        this.typed.push(exp); this.correct++; this.pos++;
        this.setCur();
        if(this.opts.onCorrect) this.opts.onCorrect();
      }else{
        span.classList.remove('shake'); void span.offsetWidth;
        span.classList.add('miss', 'shake');
        if(this.opts.onWrong) this.opts.onWrong(exp, ch);
      }
    }else{
      this.typed.push(ch);
      span.classList.add(ok ? 'ok' : 'bad');
      if(ok) this.correct++;
      this.pos++;
      this.setCur();
      if(!ok && this.opts.onWrong) this.opts.onWrong(exp, ch);
    }
    if(this.opts.onUpdate) this.opts.onUpdate();
    if(this.pos >= this.chars.length) this.finish('done');
  }
  backspace(word){
    if(this.done || this.opts.strict || this.pos === 0) return;
    const rm = () => {
      this.pos--;
      const ch = this.typed.pop();
      if(sameChar(ch, this.chars[this.pos])) this.correct--;
      this.spans[this.pos].classList.remove('ok', 'bad');
    };
    if(word){
      while(this.pos > 0 && this.chars[this.pos-1] === ' ') rm();
      while(this.pos > 0 && this.chars[this.pos-1] !== ' ') rm();
    }else rm();
    this.correct = Math.max(0, this.correct);
    this.setCur();
    if(this.opts.onUpdate) this.opts.onUpdate();
  }
  elapsed(){
    if(!this.started) return 0;
    return ((this.done ? this.tEnd : performance.now()) - this.t0) / 1000;
  }
  ppm(){ const e = this.elapsed(); return e > 0 ? (this.correct / 5) / (e / 60) : 0; }
  acc(){ return this.keys ? (this.keys - this.wrongKeys) / this.keys * 100 : 100; }
  finish(reason, clampSecs){
    if(this.done) return;
    this.done = true;
    const now = performance.now();
    if(!this.started){ this.t0 = now; this.tEnd = now; }
    else this.tEnd = (clampSecs != null) ? Math.min(now, this.t0 + clampSecs * 1000) : now;
    this.setCur();
    if(this.opts.onDone) this.opts.onDone(reason);
  }
}

/* ===================== CAPTURA DE TECLADO ===================== */
const trap = $('#trap');
let composing = false;
function placeTrap(box){ if(trap.parentElement !== box) box.appendChild(trap); }
function focusTrap(){ try{ trap.focus({preventScroll:true}); }catch(e){ trap.focus(); } }
function flush(){
  const v = trap.value;
  trap.value = '';
  for(const ch of v){ if(ch !== '\n' && ch !== '\r' && ch !== '\t') routeChar(ch); }
}
trap.addEventListener('compositionstart', () => { composing = true; });
trap.addEventListener('compositionend', () => { composing = false; flush(); });
trap.addEventListener('input', e => { if(composing || e.isComposing) return; flush(); });
trap.addEventListener('keydown', e => {
  if(e.isComposing || composing) return;
  if(e.key === 'Backspace'){ e.preventDefault(); routeBack(e.ctrlKey || e.altKey || e.metaKey); }
  else if(e.key === 'Enter'){ e.preventDefault(); }
});
trap.addEventListener('focus', () => $$('.tx-box').forEach(b => b.classList.remove('blurred')));
trap.addEventListener('blur', () => {
  $$('.tx-box').forEach(b => b.classList.add('blurred'));
  if(view === 'game' && G.state === 'play') gPause();
});
$$('.tx-box').forEach(b => {
  b.addEventListener('mousedown', e => { e.preventDefault(); focusTrap(); });
  b.addEventListener('click', () => focusTrap());
});

function routeChar(ch){
  if(view === 'type' && session && session.typer) session.typer.input(ch);
  else if(view === 'game' && G.state === 'play' && G.typer) G.typer.input(ch);
}
function routeBack(word){
  if(view === 'type' && session && session.typer) session.typer.backspace(word);
}

/* ===================== TELAS ===================== */
let view = 'home';
function show(v){
  $$('.view').forEach(s => { s.hidden = s.id !== 'v-' + v; });
  view = v;
  window.scrollTo(0, 0);
}

function goHome(){
  stopTicker();
  if(view === 'game') gQuit();
  trap.blur();
  refreshHome();
  show('home');
}

function refreshHome(){
  const g = Store.data.game;
  $('#battle-meta').textContent = g.best > 0
    ? 'Recorde: ' + fmt(g.best) + ' pontos' + (g.phase >= 5 ? ', campanha vencida' : ', chegou até a fase ' + Math.min(5, g.phase + 1))
    : '5 fases e um chefão';
}

/* preferências */
function syncToggles(){
  const p = Store.data.prefs;
  const ts = $('#t-sound');
  ts.setAttribute('aria-pressed', String(!!p.sound));
  ts.textContent = p.sound ? 'Som ligado' : 'Som desligado';
  $('#t-acc').textContent = p.accents ? 'Acentos obrigatórios' : 'Acentos opcionais';
}
$('#t-sound').addEventListener('click', () => { Store.data.prefs.sound = !Store.data.prefs.sound; Store.save(); syncToggles(); Sfx.unlock(); });
$('#t-acc').addEventListener('click', () => { Store.data.prefs.accents = !Store.data.prefs.accents; Store.save(); syncToggles(); });

/* teclas do título */
function pressCap(key){
  if(!key || key.length !== 1) return;
  const k = strip(key.toLowerCase());
  $$('.cap[data-k="' + CSS.escape(k) + '"]').forEach(c => {
    c.classList.add('down');
    clearTimeout(c._t);
    c._t = setTimeout(() => c.classList.remove('down'), 140);
  });
}

/* ===================== LISTA ===================== */
let listMode = 1;
let timedSeconds = [30,60,120,180,300].includes(Store.data.prefs.timed) || (Store.data.prefs.timed >= 10 && Store.data.prefs.timed <= 600) ? Store.data.prefs.timed : 60;

function openMode(n){
  Sfx.unlock();
  if(n === 3){ startGame(); return; }
  buildList(n);
  show('list');
}

function buildList(mode){
  listMode = mode;
  const items = mode === 1 ? FREE : TIMED;
  $('#l-title').textContent = mode === 1 ? 'Modo livre' : 'Contra o relógio';
  $('#l-sub').textContent = mode === 1
    ? 'Escolha um texto. O tempo é só para você acompanhar sua velocidade; não há limite.'
    : 'Escolha o tempo e depois o texto. O relógio começa na primeira tecla, e se o texto acabar antes, o próximo entra em seguida.';
  $('#timepick').hidden = mode !== 2;
  if(mode === 2) syncTimepick();
  const lv = ['', 'Fácil', 'Médio', 'Difícil'];
  $('#tlist').innerHTML = items.map((it, i) => {
    let head = '<strong>' + esc(it.title) + '</strong>';
    if(mode === 1) head += '<span class="lvl l' + it.level + '"><span class="bars"><i></i><i></i><i></i></span>' + lv[it.level] + '</span>';
    const rec = mode === 1 ? Store.data.free[it.id] : 0;
    const meta = mode === 1
      ? '<span>' + Array.from(it.text).length + ' caracteres</span>' + (rec ? '<span class="rec">Recorde: ' + rec + ' PPM</span>' : '')
      : '<span>' + words(it.text) + ' palavras</span>';
    return '<li><button class="trow" type="button" data-i="' + i + '"><span class="tr-head">' + head + '</span><span class="tr-prev">' + esc(it.text.slice(0, 90)) + '…</span><span class="tr-meta">' + meta + '</span></button></li>';
  }).join('');
}

function syncTimepick(){
  const preset = [30,60,120,180,300].includes(timedSeconds);
  $$('#timepick .chip').forEach(c => c.setAttribute('aria-pressed', String(+c.dataset.sec === timedSeconds)));
  $('#tp-custom').classList.toggle('on', !preset);
  if(!preset){ $('#tp-min').value = Math.floor(timedSeconds / 60); $('#tp-sec').value = timedSeconds % 60; }
  const rec = Store.data.timed[String(timedSeconds)];
  const n = $('#tp-note');
  n.classList.remove('err');
  n.textContent = 'Prova de ' + secLabel(timedSeconds) + '.' + (rec ? ' Seu recorde nesse tempo: ' + rec + ' PPM.' : '');
}
$$('#timepick .chip').forEach(c => c.addEventListener('click', () => {
  timedSeconds = +c.dataset.sec;
  $('#tp-min').value = ''; $('#tp-sec').value = '';
  Store.data.prefs.timed = timedSeconds; Store.save();
  syncTimepick();
}));
function readCustom(){
  const m = parseInt($('#tp-min').value, 10) || 0;
  const s = parseInt($('#tp-sec').value, 10) || 0;
  const total = m * 60 + s;
  const n = $('#tp-note');
  if($('#tp-min').value === '' && $('#tp-sec').value === '') return;
  if(total < 10 || total > 600 || s > 59 || m < 0 || s < 0){
    n.textContent = 'Escolha um tempo entre 10 segundos e 10 minutos.';
    n.classList.add('err');
    return;
  }
  timedSeconds = total;
  Store.data.prefs.timed = timedSeconds; Store.save();
  syncTimepick();
}
$('#tp-min').addEventListener('change', readCustom);
$('#tp-sec').addEventListener('change', readCustom);

$('#tlist').addEventListener('click', e => {
  const b = e.target.closest('.trow');
  if(!b) return;
  if(listMode === 2) readCustom();
  startSession(listMode, +b.dataset.i);
});

/* ===================== SESSÃO (MODOS 1 E 2) ===================== */
let session = null;
let ticker = 0;

function buildTimed(startIdx, seconds){
  const need = Math.max(500, seconds * 16);
  let s = '';
  const segs = [];
  let i = startIdx;
  while(s.length < need){
    const t = TIMED[i % TIMED.length];
    segs.push({at: s ? s.length + 1 : 0, title: t.title});
    s = s ? s + ' ' + t.text : t.text;
    i++;
  }
  return {text: s, segs};
}

function startSession(mode, idx){
  stopTicker();
  const item = (mode === 1 ? FREE : TIMED)[idx];
  let text = item.text, segs = null;
  if(mode === 2){ const b = buildTimed(idx, timedSeconds); text = b.text; segs = b.segs; }
  session = {mode, idx, item, seconds: mode === 2 ? timedSeconds : 0, segs, lastSeg: 0};
  $('#ty-title').textContent = item.title;
  $('#s-time-l').textContent = mode === 2 ? 'Restante' : 'Tempo';
  $('#s-prog-l').textContent = mode === 2 ? 'Caracteres' : 'Progresso';
  $('#ty-hint').innerHTML = mode === 2
    ? 'O relógio de ' + secLabel(session.seconds) + ' começa na primeira tecla. <kbd>Backspace</kbd> corrige. <kbd>Esc</kbd> recomeça.'
    : 'O tempo começa na primeira tecla. <kbd>Backspace</kbd> corrige, <kbd>Ctrl</kbd> + <kbd>Backspace</kbd> apaga a palavra inteira. <kbd>Esc</kbd> recomeça.';
  show('type');
  placeTrap($('#ty-box'));
  session.typer = new Typer($('#ty-text'), text, {strict:false, onStart:startTicker, onUpdate:updStats, onDone:endSession});
  updStats();
  focusTrap();
  $('#ty-box').classList.toggle('blurred', document.activeElement !== trap);
}

function restartSession(){ if(session) startSession(session.mode, session.idx); }

function startTicker(){
  stopTicker();
  ticker = setInterval(() => {
    if(!session || !session.typer || session.typer.done){ stopTicker(); return; }
    if(session.mode === 2 && session.typer.elapsed() >= session.seconds){
      session.typer.finish('time', session.seconds);
      return;
    }
    updStats();
  }, 100);
}
function stopTicker(){ if(ticker){ clearInterval(ticker); ticker = 0; } }

function updStats(){
  if(!session || !session.typer) return;
  const t = session.typer;
  const el = t.elapsed();
  $('#s-ppm').textContent = el >= 2 ? Math.round(t.ppm()) : 0;
  $('#s-acc').textContent = Math.round(t.acc()) + '%';
  const bar = $('#ty-bar');
  if(session.mode === 1){
    const p = t.pos / t.chars.length;
    $('#s-time').textContent = mmss(el);
    $('#s-prog').textContent = Math.floor(p * 100) + '%';
    bar.style.transform = 'scaleX(' + p + ')';
  }else{
    const left = Math.max(0, session.seconds - el);
    $('#s-time').textContent = mmss(Math.ceil(left));
    $('#s-prog').textContent = fmt(t.correct);
    bar.style.transform = 'scaleX(' + (left / session.seconds) + ')';
    let k = 0;
    for(let i = 0; i < session.segs.length; i++) if(session.segs[i].at <= t.pos) k = i;
    if(k !== session.lastSeg){ session.lastSeg = k; $('#ty-title').textContent = session.segs[k].title; }
  }
}

function endSession(reason){
  stopTicker();
  updStats();
  const s = session, t = s.typer;
  const r = {
    ppm: t.ppm(), acc: t.acc(), secs: s.mode === 2 ? Math.min(t.elapsed(), s.seconds) : t.elapsed(),
    wrong: t.wrongKeys, correct: t.correct, total: t.chars.length, misses: t.misses
  };
  const ppm = Math.round(r.ppm);
  const recKey = s.mode === 1 ? s.item.id : String(s.seconds);
  const bucket = s.mode === 1 ? Store.data.free : Store.data.timed;
  const prev = bucket[recKey] || 0;
  let badge = '';
  if(ppm > prev && t.correct > 0){
    bucket[recKey] = ppm; Store.save();
    badge = prev ? 'Novo recorde' : 'Primeiro registro';
  }
  setTimeout(() => showResult(s, r, reason, badge, prev), 300);
}

function levelText(p){
  if(p < 15) return 'Começando: foque em achar as teclas sem olhar. A velocidade vem depois.';
  if(p < 30) return 'Em evolução: mantenha a precisão alta que o ritmo aparece.';
  if(p < 45) return 'Bom ritmo: já é uma digitação confortável para o dia a dia.';
  if(p < 65) return 'Rápido: você digita acima da média de quem usa o computador no trabalho.';
  return 'Excelente: velocidade de quem digita profissionalmente.';
}

function renderKeys(el, misses, limit){
  const arr = Array.from(misses.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit || 6);
  if(!arr.length){ el.innerHTML = '<p class="none">Nenhuma tecla errada. Mandou muito bem.</p>'; return; }
  el.innerHTML = arr.map(([k, n]) =>
    '<span class="pk"><span class="pk-cap' + (k === ' ' ? ' wide' : '') + '">' + (k === ' ' ? 'espaço' : esc(k)) + '</span><span class="pk-n">' + n + (n === 1 ? ' erro' : ' erros') + '</span></span>'
  ).join('');
}

function showResult(s, r, reason, badge, prev){
  const ppm = Math.round(r.ppm);
  $('#r-title').textContent = reason === 'time' ? 'Tempo esgotado' : 'Texto concluído';
  $('#r-sub').textContent = s.mode === 1 ? s.item.title : 'Prova de ' + secLabel(s.seconds) + ', começando por “' + s.item.title + '”';
  $('#r-ppm').textContent = ppm;
  $('#r-acc').textContent = (Math.round(r.acc * 10) / 10).toLocaleString('pt-BR') + '%';
  $('#r-time').textContent = mmss(r.secs);
  $('#r-wrong').textContent = fmt(r.wrong);
  $('#r-chars').textContent = s.mode === 1 ? fmt(r.correct) + ' de ' + fmt(r.total) : fmt(r.correct);
  let lvl = esc(levelText(ppm));
  if(badge) lvl += '<span class="r-badge">' + badge + (badge === 'Novo recorde' ? ' (antes: ' + prev + ' PPM)' : '') + '</span>';
  $('#r-level').innerHTML = lvl;
  renderKeys($('#r-keys'), r.misses);
  $('#r-tip').textContent = 'Dica: ' + TIPS[Math.floor(Math.random() * TIPS.length)];
  trap.blur();
  show('result');
}

/* ===================== BATALHA ===================== */
const BASE_MAX_ERRORS = 5;
const DIFFICULTIES = {
  easy:{label:'Fácil', seconds:180, errorPenalty:0, correctBonus:0},
  medium:{label:'Médio', seconds:120, errorPenalty:5, correctBonus:0},
  hard:{label:'Difícil', seconds:60, errorPenalty:5, correctBonus:1}
};
const difficulty = () => DIFFICULTIES[G.difficulty] || DIFFICULTIES.easy;
const maxErrors = () => BASE_MAX_ERRORS + (G.extraDefense ? 1 : 0);
function calculatedTimeLeft(now=performance.now()){
  const elapsed = Math.max(0, (now - G.phaseStart - G.pausedTotal) / 1000);
  return G.phaseDuration - elapsed - G.timePenalty + G.timeBonus;
}
const cv = $('#g-canvas');
const cx = cv.getContext('2d');
const G = {
  running:false, raf:0, last:0, t:0, W:0, H:0, dpr:1,
  difficulty:null, perfectPhases:0, extraDefense:false,
  state:'idle', idx:0, score:0, phaseStartScore:0, errors:0, streak:0,
  phaseDuration:180, timeLeft:180, timePenalty:0, timeBonus:0, phaseStart:0, pausedAt:0, pausedTotal:0, lastSec:-1,
  enemies:[], bullets:[], parts:[], stars:[], queue:[],
  shake:0, flash:0, recoil:0, muzzle:0, aim:0, aimDraw:0,
  countAt:0, countVal:0, charge:false, shipDead:false, lostReason:'',
  typer:null, runMisses:new Map(), newRecord:false, lastStats:null, timers:[]
};

function gResize(){
  const r = cv.getBoundingClientRect();
  if(r.width < 2 || r.height < 2) return;
  G.W = r.width; G.H = r.height;
  G.dpr = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = Math.round(G.W * G.dpr);
  cv.height = Math.round(G.H * G.dpr);
  cx.setTransform(G.dpr, 0, 0, G.dpr, 0, 0);
  const n = Math.round(G.W * G.H / 2400);
  G.stars = Array.from({length:n}, () => ({x:Math.random()*G.W, y:Math.random()*G.H, z:Math.random()*0.9 + 0.1}));
}

function geo(){
  const W = G.W, H = G.H;
  const px = Math.max(40, Math.min(80, W * 0.075));
  const rows = H >= 290 ? 4 : 3;
  const top = 16, bot = H - 22;
  const laneH = (bot - top) / rows;
  const colGap = Math.max(36, Math.min(66, W * 0.07));
  const depth = colGap * 2.6 + 24;
  const start = Math.max(px + 200, W - 30 - depth);
  const end = px + 44;
  return {px, py:H/2, rows, top, laneH, colGap, start, end};
}
function frontX(k, g){ g = g || geo(); return g.start - (g.start - g.end) * (k / maxErrors()); }
function radius(e){
  const g = geo();
  return e.boss ? Math.min(G.H * 0.26, 74, G.W * 0.16) : Math.max(12, Math.min(22, g.laneH * 0.32));
}
function slotPos(e, front, g){
  if(e.boss) return {x: front + radius(e) * 0.9, y: G.H / 2 + 6};
  const row = e.slot % g.rows, col = Math.floor(e.slot / g.rows);
  return {x: front + 14 + col * g.colGap + (row % 2) * g.colGap * 0.45, y: g.top + (row + 0.5) * g.laneH};
}
const mult = () => Math.min(4, 1 + Math.floor(G.streak / 20));

function clearTimers(){ G.timers.forEach(clearTimeout); G.timers = []; }
function later(fn, ms){ G.timers.push(setTimeout(fn, ms)); }

function startGame(){
  stopTicker();
  show('game');
  placeTrap($('#g-box'));
  gResize();
  G.difficulty = null;
  G.perfectPhases = 0; G.extraDefense = false;
  G.idx = 0; G.score = 0; G.phaseStartScore = 0; G.errors = 0;
  G.phaseDuration = DIFFICULTIES.easy.seconds; G.timeLeft = G.phaseDuration;
  G.timePenalty = 0; G.timeBonus = 0;
  G.enemies = []; G.bullets = []; G.parts = []; G.queue = [];
  G.shipDead = false; G.charge = false; G.state = 'difficulty';
  hud(); hudTime(); overlay('difficulty');
  const first = $('#g-over button');
  if(first) first.focus();
  gStartLoop();
}

function startRun(){
  G.score = 0; G.phaseStartScore = 0; G.runMisses = new Map(); G.newRecord = false;
  enterPhase(0);
}

function enterPhase(i){
  clearTimers();
  const P = PHASES[i];
  G.idx = i; G.errors = 0; G.streak = 0;
  G.charge = false; G.shipDead = false;
  G.enemies = []; G.bullets = []; G.parts = [];
  G.shake = 0; G.flash = 0;
  G.phaseDuration = difficulty().seconds; G.timeLeft = G.phaseDuration;
  G.timePenalty = 0; G.timeBonus = 0; G.lastSec = -1;
  G.phaseStartScore = G.score;
  const len = Array.from(P.text).length;
  G.queue = [];
  if(P.enemy === 'boss') G.queue = [len];
  else { let left = len; while(left > 0){ const h = Math.min(P.hp, left); G.queue.push(h); left -= h; } }
  G.typer = new Typer($('#g-text'), P.text, {strict:true, onCorrect:gCorrect, onWrong:gWrong});
  G.typer.merged = false;
  gFill();
  G.state = 'intro';
  hud(); hudTime();
  overlay('intro');
}

function gSpawn(){
  const P = PHASES[G.idx];
  const hp = G.queue.shift();
  const used = new Set(G.enemies.map(e => e.slot));
  let s = 0; while(used.has(s)) s++;
  const e = {slot:s, hp, max:hp, res:0, hit:0, seed:Math.random() * 6.28, boss:P.enemy === 'boss', type:P.enemy, x:0, y:0, dy:0};
  const g = geo();
  const p = slotPos(e, frontX(G.errors, g), g);
  e.x = G.W + radius(e) + 20 + Math.random() * 70;
  e.y = p.y; e.dy = p.y;
  G.enemies.push(e);
  return e;
}
function gFill(){
  const P = PHASES[G.idx];
  let n = G.enemies.filter(e => e.hp - e.res > 0).length;
  while(n < P.max && G.queue.length){ gSpawn(); n++; }
}

function gCorrect(){
  G.streak++;
  G.score += 10 * mult();
  if(difficulty().correctBonus){
    G.timeBonus += difficulty().correctBonus;
    G.timeLeft = calculatedTimeLeft();
    hudTime();
  }
  gFire();
  hud();
}
function gWrong(){
  if(G.state !== 'play') return;
  G.errors++; G.streak = 0;
  if(difficulty().errorPenalty) G.timePenalty += difficulty().errorPenalty;
  if(!reduced) G.shake = 0.35;
  G.flash = 1;
  Sfx.error();
  G.timeLeft = calculatedTimeLeft();
  hud(); hudTime();
  if(G.timeLeft <= 0){ G.timeLeft = 0; gLose('time'); return; }
  if(G.errors >= maxErrors()) gLose('reach');
}

function gFire(){
  let t = null;
  for(const e of G.enemies){ if(e.hp - e.res <= 0) continue; if(!t || e.x < t.x) t = e; }
  if(!t){ if(G.queue.length) t = gSpawn(); else return; }
  t.res++;
  if(t.hp - t.res <= 0) gFill();
  const g = geo();
  const ang = Math.max(-0.7, Math.min(0.7, Math.atan2(t.dy - g.py, t.x - g.px)));
  G.aim = ang;
  const nx = g.px + Math.cos(ang) * 22, ny = g.py + Math.sin(ang) * 22;
  G.bullets.push({x:nx, y:ny, px:nx, py:ny, t});
  G.recoil = 1; G.muzzle = 0.06;
  Sfx.shot();
}

function gHit(e, b){
  e.res--; e.hp--; e.hit = 0.1;
  const col = PHASES[G.idx].color;
  sparks(b.x, b.y, col, 5);
  if(e.hp <= 0){
    const i = G.enemies.indexOf(e);
    if(i >= 0) G.enemies.splice(i, 1);
    explode(e.x, e.dy, col, e.boss ? 140 : 22, e.boss ? 1.6 : 1);
    Sfx.boom(e.boss);
    if(e.boss && !reduced) G.shake = 0.7;
  }else Sfx.hit();
}

function explode(x, y, col, n, power){
  for(let i = 0; i < n; i++){
    const a = Math.random() * Math.PI * 2, sp = (40 + Math.random() * 230) * (power || 1);
    const life = 0.45 + Math.random() * 0.55;
    G.parts.push({x, y, vx:Math.cos(a) * sp, vy:Math.sin(a) * sp, life, max:life, col: Math.random() < 0.3 ? '#FFF1C9' : col, sz:2 + Math.random() * 3});
  }
  if(G.parts.length > 900) G.parts.splice(0, G.parts.length - 900);
}
function sparks(x, y, col, n){
  for(let i = 0; i < n; i++){
    const a = Math.PI + (Math.random() - 0.5) * 1.6, sp = 80 + Math.random() * 160;
    G.parts.push({x, y, vx:Math.cos(a) * sp, vy:Math.sin(a) * sp, life:0.25, max:0.25, col:'#FFF1C9', sz:2});
  }
}

function mergeMisses(){
  if(!G.typer || G.typer.merged) return;
  G.typer.merged = true;
  G.typer.misses.forEach((v, k) => G.runMisses.set(k, (G.runMisses.get(k) || 0) + v));
}

function phaseActiveSecs(){ return Math.max(0.5, (performance.now() - G.phaseStart - G.pausedTotal) / 1000); }

function saveGame(phasesDone){
  const gd = Store.data.game;
  G.newRecord = G.score > gd.best;
  if(G.newRecord) gd.best = G.score;
  gd.phase = Math.max(gd.phase || 0, phasesDone);
  Store.save();
}

function beginCountdown(){
  if(G.state !== 'intro') return;
  $('#g-over').hidden = true;
  G.state = 'count';
  G.countAt = performance.now();
  G.countVal = 4;
  focusTrap();
}

function gPause(){
  if(G.state !== 'play') return;
  G.state = 'pause';
  G.pausedAt = performance.now();
  overlay('pause');
}
function gResume(){
  if(G.state !== 'pause') return;
  G.pausedTotal += performance.now() - G.pausedAt;
  G.state = 'play';
  $('#g-over').hidden = true;
  focusTrap();
}

function gClear(){
  G.state = 'clear';
  const phaseDefenses = maxErrors();
  const perfect = G.errors === 0;
  if(perfect) G.perfectPhases++;
  const earnedDefense = !G.extraDefense && G.perfectPhases >= 3;
  if(earnedDefense) G.extraDefense = true;
  const left = Math.ceil(G.timeLeft);
  const bonus = left * 10 + (phaseDefenses - G.errors) * 100;
  G.score += bonus;
  mergeMisses();
  const t = G.typer;
  G.lastStats = {ppm:(t.correct / 5) / (phaseActiveSecs() / 60), acc:t.acc(), errors:G.errors, maxErrors:phaseDefenses, left, bonus, perfect, perfectPhases:G.perfectPhases, earnedDefense};
  hud();
  Sfx.clear();
  const last = G.idx === PHASES.length - 1;
  if(last) saveGame(5);
  later(() => { if(G.state === 'clear' && view === 'game') overlay(last ? 'win' : 'clear'); }, 900);
}

function gLose(reason){
  if(G.state !== 'play') return;
  G.state = 'lost'; G.lostReason = reason; G.charge = true;
  G.typer.finish('lost');
  mergeMisses();
  Sfx.lose();
  saveGame(G.idx);
  later(() => { if(G.state === 'lost' && view === 'game') overlay('lost'); }, 1600);
}

function gQuit(){
  clearTimers();
  gStopLoop();
  G.state = 'idle';
  G.difficulty = null; G.perfectPhases = 0; G.extraDefense = false;
  G.phaseDuration = DIFFICULTIES.easy.seconds; G.timeLeft = G.phaseDuration;
  G.timePenalty = 0; G.timeBonus = 0;
  $('#g-over').hidden = true;
}

function gAct(a){
  Sfx.unlock();
  if(a.startsWith('difficulty-')){
    const selected = a.slice('difficulty-'.length);
    if(G.state !== 'difficulty' || !DIFFICULTIES[selected]) return;
    G.difficulty = selected;
    startRun();
  }
  else if(a === 'go') beginCountdown();
  else if(a === 'next' && G.state === 'clear') enterPhase(G.idx + 1);
  else if(a === 'retry'){ G.score = G.phaseStartScore; enterPhase(G.idx); }
  else if(a === 'restart') startRun();
  else if(a === 'resume') gResume();
  else if(a === 'menu') goHome();
}
$('#g-over').addEventListener('click', e => {
  const b = e.target.closest('[data-g]');
  if(b) gAct(b.dataset.g);
});
$('#g-frame').addEventListener('mousedown', e => {
  if(e.target.closest('button') || e.target.closest('.g-over')) return;
  e.preventDefault();
  focusTrap();
});
$('#g-frame').addEventListener('click', e => {
  if(e.target.closest('button') || e.target.closest('.g-over')) return;
  focusTrap();
});

function hud(){
  const P = PHASES[G.idx];
  $('#h-phase').textContent = G.state === 'difficulty'
    ? 'Escolha a dificuldade'
    : 'Fase ' + (G.idx + 1) + ' de ' + PHASES.length + ' · ' + difficulty().label;
  $('#h-name').textContent = P.name;
  const limit = maxErrors();
  const left = Math.max(0, limit - G.errors);
  const def = $('#h-def');
  def.dataset.left = String(left);
  def.setAttribute('aria-label', left + ' de ' + limit + ' pontos de defesa restantes');
  const pips = $('.pips', def);
  if(pips.children.length !== limit) pips.innerHTML = Array.from({length:limit}, () => '<i></i>').join('');
  $$('#h-def .pips i').forEach((p, i) => p.classList.toggle('on', i < left));
  $('.l', def).textContent = G.extraDefense ? 'Defesa +1' : 'Defesa';
  $('#h-score').textContent = fmt(G.score);
  const m = mult();
  const c = $('#h-combo');
  c.textContent = 'x' + m;
  c.classList.toggle('hot', m > 1);
}
function hudTime(){
  const s = Math.ceil(G.timeLeft);
  if(s !== G.lastSec){ G.lastSec = s; $('#h-time').textContent = mmss(s); }
  const bar = $('#h-bar');
  bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, G.timeLeft / G.phaseDuration)) + ')';
  bar.classList.toggle('low', G.timeLeft < 20);
}

function overlay(kind){
  const o = $('#g-over');
  const P = PHASES[G.idx], n = G.idx + 1, total = PHASES.length;
  let h = '<div class="ov-card" role="dialog" aria-live="polite">';
  if(kind === 'difficulty'){
    h += '<p class="ov-step">Antes de começar a campanha</p><h3>Escolha a dificuldade</h3><p>A escolha fica fixa nesta partida e só muda quando você voltar ao menu principal.</p>';
    h += '<div class="difficulty-options">';
    h += '<button class="btn difficulty-option" type="button" data-g="difficulty-easy"><strong>Fácil · 3 minutos</strong><span>Sem penalidade de tempo por erro.</span></button>';
    h += '<button class="btn difficulty-option" type="button" data-g="difficulty-medium"><strong>Médio · 2 minutos</strong><span>Cada erro desconta 5 segundos.</span></button>';
    h += '<button class="btn difficulty-option" type="button" data-g="difficulty-hard"><strong>Difícil · 1 minuto</strong><span>Erro: −5 s. Tecla certa: +1 s.</span></button>';
    h += '</div><p class="ov-hint">Complete 3 fases sem erro (acumuladas, não precisam ser seguidas) para ganhar um ponto de defesa extra nas fases restantes.</p>';
  }else if(kind === 'intro'){
    h += '<p class="ov-step">Fase ' + n + ' de ' + total + '</p><h3>' + esc(P.name) + '</h3><p>' + esc(P.desc) + '</p>';
    const d = difficulty();
    const rule = G.difficulty === 'medium' ? 'Cada erro desconta 5 segundos.' : G.difficulty === 'hard' ? 'Cada erro desconta 5 segundos e cada tecla certa acrescenta 1 segundo.' : 'Os erros não alteram o cronômetro.';
    h += '<p>Dificuldade <strong>' + esc(d.label) + '</strong>: <strong>' + mmss(d.seconds) + '</strong> por fase. ' + rule + '</p>';
    if(G.idx === 0) h += '<p>Cada tecla certa dispara um tiro e o texto só avança quando você acerta. Cada erro deixa os invasores uma linha mais perto; no ' + maxErrors() + 'º erro eles alcançam sua nave.</p>';
    else h += '<p>Pontuação até aqui: <strong>' + fmt(G.score) + '</strong>. Os erros voltam a zero nesta fase.</p>';
    h += '<div class="ov-actions"><button class="btn primary" type="button" data-g="go">Começar fase ' + n + '</button></div><p class="ov-hint">Ou pressione <kbd>Enter</kbd>.</p>';
  }else if(kind === 'pause'){
    h += '<p class="ov-step">Fase ' + n + ' de ' + total + '</p><h3>Jogo pausado</h3><p>O relógio parou. Os invasores esperam por você.</p>';
    h += '<div class="ov-actions"><button class="btn primary" type="button" data-g="resume">Continuar</button><button class="btn" type="button" data-g="retry">Recomeçar a fase</button><button class="btn" type="button" data-g="menu">Sair para o menu</button></div><p class="ov-hint"><kbd>Enter</kbd> ou <kbd>Esc</kbd> continua.</p>';
  }else if(kind === 'clear'){
    const s = G.lastStats;
    h += '<p class="ov-step">Fase ' + n + ' de ' + total + ' concluída</p><h3>' + esc(P.name) + ': caminho livre!</h3>';
    h += '<dl class="ov-stats"><div><dt>PPM</dt><dd>' + Math.round(s.ppm) + '</dd></div><div><dt>Precisão</dt><dd>' + Math.round(s.acc) + '%</dd></div><div><dt>Erros</dt><dd>' + s.errors + ' de ' + s.maxErrors + '</dd></div><div><dt>Tempo sobrando</dt><dd>' + mmss(s.left) + '</dd></div><div><dt>Bônus</dt><dd>+' + fmt(s.bonus) + '</dd></div><div><dt>Pontos</dt><dd>' + fmt(G.score) + '</dd></div></dl>';
    if(s.earnedDefense) h += '<p><strong>Recompensa!</strong> Você ganhou 1 ponto de defesa extra nas fases restantes.</p>';
    else if(G.extraDefense) h += '<p>Defesa extra ativa: você tem 6 pontos de defesa nas fases restantes.</p>';
    else h += '<p>Fases sem erro acumuladas: ' + G.perfectPhases + ' de 3 para liberar defesa extra.</p>';
    h += '<p>Próxima: <strong>' + esc(PHASES[G.idx + 1].name) + '</strong>.</p>';
    h += '<div class="ov-actions"><button class="btn primary" type="button" data-g="next">Ir para a fase ' + (n + 1) + '</button><button class="btn" type="button" data-g="menu">Sair para o menu</button></div><p class="ov-hint">Ou pressione <kbd>Enter</kbd>.</p>';
  }else if(kind === 'lost'){
    const t = G.typer, pct = Math.floor(t.pos / t.chars.length * 100), falta = t.chars.length - t.pos;
    h += '<p class="ov-step">Fase ' + n + ' de ' + total + '</p><h3>' + (G.lostReason === 'time' ? 'O tempo acabou' : 'Os invasores chegaram') + '</h3>';
    h += '<p>' + (G.lostReason === 'time'
      ? 'Faltaram ' + falta + ' caracteres. Você completou ' + pct + '% do texto.'
      : 'Foram ' + maxErrors() + ' erros nesta fase. Você completou ' + pct + '% do texto.') + '</p>';
    h += '<p>Pontuação: <strong>' + fmt(G.score) + '</strong>' + (G.newRecord ? ' (novo recorde!)' : '. Recorde: ' + fmt(Store.data.game.best)) + '</p>';
    h += '<div class="ov-keys"><h4>Teclas que mais travaram você</h4><div class="keyrow" id="ov-keys"></div></div>';
    h += '<div class="ov-actions"><button class="btn primary" type="button" data-g="retry">Tentar a fase ' + n + ' de novo</button>' + (G.idx > 0 ? '<button class="btn" type="button" data-g="restart">Recomeçar da fase 1</button>' : '') + '<button class="btn" type="button" data-g="menu">Menu inicial</button></div><p class="ov-hint"><kbd>Enter</kbd> tenta de novo.</p>';
  }else if(kind === 'win'){
    const s = G.lastStats;
    h += '<p class="ov-step">5 de 5 fases</p><h3>Vitória! O Rei dos Erros caiu.</h3>';
    h += '<p>Pontuação final: <strong>' + fmt(G.score) + '</strong>' + (G.newRecord ? ' (novo recorde!)' : '. Recorde: ' + fmt(Store.data.game.best)) + '</p>';
    h += '<dl class="ov-stats"><div><dt>PPM no chefão</dt><dd>' + Math.round(s.ppm) + '</dd></div><div><dt>Precisão</dt><dd>' + Math.round(s.acc) + '%</dd></div><div><dt>Bônus final</dt><dd>+' + fmt(s.bonus) + '</dd></div></dl>';
    h += '<div class="ov-keys"><h4>Teclas que mais travaram você na campanha</h4><div class="keyrow" id="ov-keys"></div></div>';
    h += '<div class="ov-actions"><button class="btn primary" type="button" data-g="restart">Jogar de novo</button><button class="btn" type="button" data-g="menu">Menu inicial</button></div>';
  }
  h += '</div>';
  o.innerHTML = h;
  o.hidden = false;
  o.scrollTop = 0;
  const k = $('#ov-keys', o);
  if(k) renderKeys(k, G.runMisses, 6);
}

/* ---------- loop ---------- */
function gStartLoop(){
  if(G.running) return;
  G.running = true;
  G.last = performance.now();
  G.raf = requestAnimationFrame(gLoop);
}
function gStopLoop(){ G.running = false; cancelAnimationFrame(G.raf); }
function gLoop(now){
  if(!G.running) return;
  const dt = Math.min(0.05, Math.max(0, (now - G.last) / 1000));
  G.last = now;
  if(G.W < 2) gResize();
  if(G.W >= 2){ gUpdate(dt, now); gDraw(now); }
  G.raf = requestAnimationFrame(gLoop);
}

function gUpdate(dt, now){
  const paused = G.state === 'pause';
  if(!paused) G.t += dt;
  for(const s of G.stars){
    s.x -= s.z * (paused ? 0 : 18) * dt;
    if(s.x < 0){ s.x += G.W; s.y = Math.random() * G.H; }
  }
  if(G.state === 'count'){
    const el = (now - G.countAt) / 1000;
    const v = 3 - Math.floor(el / 0.75);
    if(v !== G.countVal && v > 0){ G.countVal = v; Sfx.tick(false); }
    if(el >= 2.25){
      G.state = 'play'; G.phaseStart = now; G.pausedTotal = 0; G.countVal = 0;
      Sfx.tick(true);
      focusTrap();
    }
  }
  if(G.state === 'play'){
    G.timeLeft = calculatedTimeLeft(now);
    if(G.typer.done && !G.queue.length && !G.enemies.length && !G.bullets.length){ gClear(); }
    else if(G.timeLeft <= 0){ G.timeLeft = 0; gLose('time'); }
    hudTime();
  }
  if(paused) return;

  const g = geo();
  const front = G.charge ? g.px - 30 : frontX(G.errors, g);
  const k = 1 - Math.exp(-dt * (G.charge ? 3.4 : 2.6));
  for(const e of G.enemies){
    const p = slotPos(e, front, g);
    e.x += (p.x - e.x) * k;
    e.y += (p.y - e.y) * k;
    e.dy = e.y + Math.sin(G.t * 2.2 + e.seed) * (e.boss ? 6 : 5);
    if(e.hit > 0) e.hit -= dt;
  }
  for(let i = G.bullets.length - 1; i >= 0; i--){
    const b = G.bullets[i], t = b.t;
    if(G.enemies.indexOf(t) < 0){ G.bullets.splice(i, 1); continue; }
    const dx = t.x - b.x, dy = t.dy - b.y, d = Math.hypot(dx, dy), step = 1300 * dt;
    b.px = b.x; b.py = b.y;
    if(d <= step + radius(t) * 0.6){ G.bullets.splice(i, 1); gHit(t, b); }
    else { b.x += dx / d * step; b.y += dy / d * step; }
  }
  for(let i = G.parts.length - 1; i >= 0; i--){
    const p = G.parts[i];
    p.life -= dt;
    if(p.life <= 0){ G.parts.splice(i, 1); continue; }
    p.x += p.vx * dt; p.y += p.vy * dt;
    p.vx *= 0.97; p.vy *= 0.97;
  }
  if(G.charge && !G.shipDead){
    for(const e of G.enemies){
      if(e.x - radius(e) < g.px + 16){
        G.shipDead = true;
        explode(g.px, g.py, '#FFC048', 60, 1.2);
        Sfx.boom(true);
        if(!reduced) G.shake = 0.5;
        break;
      }
    }
  }
  G.shake = Math.max(0, G.shake - dt);
  G.flash = Math.max(0, G.flash - dt * 2.5);
  G.recoil = Math.max(0, G.recoil - dt * 8);
  G.muzzle -= dt;
  G.aimDraw += (G.aim - G.aimDraw) * (1 - Math.exp(-dt * 14));
}

/* ---------- desenho ---------- */
function rr(c, x, y, w, h, r){
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}
function eye(c, x, y, r){
  c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill();
  c.fillStyle = '#14102B'; c.beginPath(); c.arc(x - r * 0.35, y, r * 0.5, 0, 7); c.fill();
}

function drawEnemy(c, e){
  const r = radius(e), t = G.t + e.seed;
  const base = PHASES[G.idx].color;
  const col = e.hit > 0.03 ? '#FFFFFF' : base;
  c.save();
  c.translate(e.x, e.dy);
  if(e.type === 'slime'){
    const sq = Math.sin(t * 6) * 0.08;
    c.scale(1 + sq, 1 - sq);
    c.fillStyle = col;
    c.beginPath();
    c.moveTo(-r, r * 0.7);
    c.bezierCurveTo(-r * 1.1, -r * 0.4, -r * 0.6, -r * 1.05, 0, -r);
    c.bezierCurveTo(r * 0.6, -r * 1.05, r * 1.1, -r * 0.4, r, r * 0.7);
    c.quadraticCurveTo(r * 0.5, r * 1.0, 0, r * 0.75);
    c.quadraticCurveTo(-r * 0.5, r * 1.0, -r, r * 0.7);
    c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,.35)';
    c.beginPath(); c.ellipse(r * 0.38, -r * 0.55, r * 0.18, r * 0.1, -0.5, 0, 7); c.fill();
    eye(c, -r * 0.36, -r * 0.18, r * 0.24); eye(c, r * 0.14, -r * 0.18, r * 0.24);
  }else if(e.type === 'bat'){
    const f = Math.sin(t * 14);
    c.fillStyle = col;
    for(const s of [-1, 1]){
      c.beginPath();
      c.moveTo(s * r * 0.3, -r * 0.1);
      c.lineTo(s * r * 1.7, -r * 0.55 - f * r * 0.6);
      c.lineTo(s * r * 1.3, r * 0.05);
      c.lineTo(s * r * 1.0, -r * 0.1 - f * r * 0.2);
      c.lineTo(s * r * 0.7, r * 0.35);
      c.closePath(); c.fill();
    }
    c.beginPath(); c.arc(0, 0, r * 0.62, 0, 7); c.fill();
    c.beginPath(); c.moveTo(-r * 0.5, -r * 0.3); c.lineTo(-r * 0.32, -r * 0.95); c.lineTo(-r * 0.1, -r * 0.5); c.fill();
    c.beginPath(); c.moveTo(r * 0.5, -r * 0.3); c.lineTo(r * 0.32, -r * 0.95); c.lineTo(r * 0.1, -r * 0.5); c.fill();
    c.fillStyle = '#FFE066';
    c.beginPath(); c.arc(-r * 0.25, -r * 0.08, r * 0.13, 0, 7); c.arc(r * 0.18, -r * 0.08, r * 0.13, 0, 7); c.fill();
  }else if(e.type === 'drone'){
    c.strokeStyle = '#D8F6FF'; c.lineWidth = 2;
    const rw = Math.abs(Math.cos(t * 30)) * r * 1.1 + 3;
    c.beginPath(); c.moveTo(0, -r * 0.6); c.lineTo(0, -r * 0.95); c.stroke();
    c.beginPath(); c.moveTo(-rw, -r * 0.98); c.lineTo(rw, -r * 0.98); c.stroke();
    c.fillStyle = col; rr(c, -r * 0.85, -r * 0.6, r * 1.7, r * 1.2, r * 0.32); c.fill();
    c.fillStyle = '#14102B'; rr(c, -r * 0.62, -r * 0.22, r * 0.95, r * 0.42, r * 0.18); c.fill();
    c.fillStyle = '#FF4D6D';
    c.beginPath(); c.arc(-r * 0.36 + Math.sin(t * 3) * r * 0.14, -r * 0.01, r * 0.13, 0, 7); c.fill();
  }else if(e.type === 'robot'){
    const st = Math.sin(t * 8) * r * 0.14;
    c.fillStyle = '#6B4636';
    c.fillRect(-r * 0.5, r * 0.55, r * 0.32, r * 0.45 + st);
    c.fillRect(r * 0.18, r * 0.55, r * 0.32, r * 0.45 - st);
    c.strokeStyle = '#FFD3BE'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(0, -r * 0.7); c.lineTo(0, -r * 1.05); c.stroke();
    c.fillStyle = (Math.sin(t * 5) > 0) ? '#FF4D6D' : '#7A2238';
    c.beginPath(); c.arc(0, -r * 1.1, r * 0.13, 0, 7); c.fill();
    c.fillStyle = col; rr(c, -r * 0.78, -r * 0.72, r * 1.56, r * 1.32, r * 0.2); c.fill();
    c.fillStyle = '#14102B'; rr(c, -r * 0.62, -r * 0.42, r * 1.24, r * 0.42, r * 0.1); c.fill();
    c.fillStyle = '#5EF0FF';
    c.fillRect(-r * 0.48, -r * 0.3, r * 0.28, r * 0.16);
    c.fillRect(r * 0.08, -r * 0.3, r * 0.28, r * 0.16);
    c.fillStyle = 'rgba(0,0,0,.25)';
    c.fillRect(-r * 0.5, r * 0.15, r * 1.0, r * 0.08);
  }else{
    const pulse = 1 + Math.sin(t * 3) * 0.03;
    c.scale(pulse, pulse);
    c.fillStyle = '#FFC048';
    c.beginPath();
    c.moveTo(-r * 0.55, -r * 0.62);
    c.lineTo(-r * 0.45, -r * 1.12); c.lineTo(-r * 0.2, -r * 0.8);
    c.lineTo(0, -r * 1.22); c.lineTo(r * 0.2, -r * 0.8);
    c.lineTo(r * 0.45, -r * 1.12); c.lineTo(r * 0.55, -r * 0.62);
    c.closePath(); c.fill();
    c.fillStyle = col;
    c.beginPath(); c.ellipse(0, 0, r, r * 0.86, 0, 0, 7); c.fill();
    c.fillStyle = 'rgba(0,0,0,.18)';
    c.beginPath(); c.ellipse(r * 0.2, r * 0.3, r * 0.7, r * 0.45, 0, 0, 7); c.fill();
    eye(c, -r * 0.38, -r * 0.18, r * 0.2); eye(c, r * 0.1, -r * 0.18, r * 0.2);
    c.strokeStyle = '#14102B'; c.lineWidth = Math.max(3, r * 0.07); c.lineCap = 'round';
    c.beginPath(); c.moveTo(-r * 0.62, -r * 0.48); c.lineTo(-r * 0.2, -r * 0.36); c.stroke();
    c.beginPath(); c.moveTo(r * 0.34, -r * 0.48); c.lineTo(-r * 0.05, -r * 0.36); c.stroke();
    c.fillStyle = '#14102B';
    c.beginPath(); c.ellipse(-r * 0.12, r * 0.32, r * 0.36, r * 0.17 + Math.abs(Math.sin(t * 4)) * r * 0.06, 0, 0, 7); c.fill();
    c.fillStyle = '#fff';
    for(let i = 0; i < 4; i++) c.fillRect(-r * 0.4 + i * r * 0.17, r * 0.18, r * 0.09, r * 0.1);
  }
  c.restore();
  if(!e.boss && e.max > 1){
    const w = r * 1.7, pw = w / e.max;
    for(let i = 0; i < e.max; i++){
      c.fillStyle = i < e.hp ? base : 'rgba(255,255,255,.14)';
      c.fillRect(e.x - w / 2 + i * pw + 1, e.dy + r + 7, pw - 2, 3);
    }
  }
}

function drawShip(c, g){
  const x = g.px - G.recoil * 4, y = g.py + Math.sin(G.t * 2) * 3;
  c.save();
  c.translate(x, y);
  c.rotate(G.aimDraw);
  const fl = 8 + Math.random() * 7;
  c.fillStyle = '#FF7A3D';
  c.beginPath(); c.moveTo(-15, -5); c.lineTo(-15 - fl, 0); c.lineTo(-15, 5); c.closePath(); c.fill();
  c.fillStyle = '#FFE08A';
  c.beginPath(); c.moveTo(-15, -2.5); c.lineTo(-15 - fl * 0.55, 0); c.lineTo(-15, 2.5); c.closePath(); c.fill();
  c.fillStyle = '#FFC048';
  c.beginPath(); c.moveTo(22, 0); c.lineTo(-14, -15); c.lineTo(-8, 0); c.lineTo(-14, 15); c.closePath(); c.fill();
  c.fillStyle = '#C9851A';
  c.beginPath(); c.moveTo(22, 0); c.lineTo(-8, 0); c.lineTo(-14, 15); c.closePath(); c.fill();
  c.fillStyle = '#1B1E3F';
  c.beginPath(); c.ellipse(3, -1, 6, 3.6, 0, 0, 7); c.fill();
  if(G.muzzle > 0){ c.fillStyle = '#FFF4C2'; c.beginPath(); c.arc(25, 0, 5, 0, 7); c.fill(); }
  c.restore();
}

function gDraw(now){
  const c = cx, W = G.W, H = G.H, g = geo();
  c.save();
  if(G.shake > 0){ const a = G.shake * 18; c.translate((Math.random() - 0.5) * a, (Math.random() - 0.5) * a); }
  const bg = c.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0B0E2A'); bg.addColorStop(1, '#1F1548');
  c.fillStyle = bg; c.fillRect(-30, -30, W + 60, H + 60);
  c.fillStyle = 'rgba(160,150,255,.10)';
  c.beginPath(); c.arc(W * 0.86, H * 0.2, H * 0.14, 0, 7); c.fill();
  c.fillStyle = 'rgba(160,150,255,.06)';
  c.beginPath(); c.arc(W * 0.86 - H * 0.04, H * 0.2 - H * 0.03, H * 0.06, 0, 7); c.fill();
  for(const s of G.stars){
    c.globalAlpha = 0.25 + s.z * 0.7;
    c.fillStyle = '#C9CCFF';
    const sz = s.z > 0.75 ? 2 : 1;
    c.fillRect(s.x, s.y, sz, sz);
  }
  c.globalAlpha = 1;

  const zone = frontX(maxErrors(), g);
  const zg = c.createLinearGradient(0, 0, zone + 30, 0);
  zg.addColorStop(0, 'rgba(255,70,100,.20)'); zg.addColorStop(1, 'rgba(255,70,100,0)');
  c.fillStyle = zg; c.fillRect(0, 0, zone + 30, H);
  c.setLineDash([4, 7]); c.lineWidth = 1;
  for(let k = G.errors + 1; k <= maxErrors(); k++){
    const x = frontX(k, g);
    c.strokeStyle = k === maxErrors() ? 'rgba(255,92,120,.6)' : (k === G.errors + 1 ? 'rgba(255,192,72,.45)' : 'rgba(255,192,72,.18)');
    c.beginPath(); c.moveTo(x, 8); c.lineTo(x, H - 8); c.stroke();
  }
  c.setLineDash([]);

  for(const e of G.enemies) drawEnemy(c, e);

  c.lineCap = 'round';
  for(const b of G.bullets){
    const dx = b.x - b.px, dy = b.y - b.py, d = Math.hypot(dx, dy) || 1;
    const tx = b.x - dx / d * 16, ty = b.y - dy / d * 16;
    c.strokeStyle = 'rgba(255,192,72,.35)'; c.lineWidth = 6;
    c.beginPath(); c.moveTo(tx, ty); c.lineTo(b.x, b.y); c.stroke();
    c.strokeStyle = '#FFF1C9'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(tx, ty); c.lineTo(b.x, b.y); c.stroke();
  }

  if(!G.shipDead) drawShip(c, g);

  for(const p of G.parts){
    c.globalAlpha = Math.max(0, p.life / p.max);
    c.fillStyle = p.col;
    c.fillRect(p.x - p.sz / 2, p.y - p.sz / 2, p.sz, p.sz);
  }
  c.globalAlpha = 1;

  const boss = G.enemies.find(e => e.boss);
  if(boss){
    const w = Math.min(W * 0.5, 360), x = (W - w) / 2, y = 10;
    c.fillStyle = 'rgba(0,0,0,.45)'; rr(c, x - 2, y - 2, w + 4, 12, 5); c.fill();
    c.fillStyle = '#FF5C8A'; rr(c, x, y, Math.max(0, w * boss.hp / boss.max), 8, 4); c.fill();
  }

  if(G.flash > 0){
    c.fillStyle = 'rgba(255,60,90,' + (G.flash * 0.22) + ')';
    c.fillRect(-30, -30, W + 60, H + 60);
  }
  c.restore();

  let label = '';
  if(G.state === 'count') label = String(Math.max(1, G.countVal));
  else if(G.state === 'play' && now - G.phaseStart < 600) label = 'Já!';
  if(label){
    c.save();
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = '700 ' + Math.round(Math.min(H * 0.32, 96)) + 'px "Chakra Petch", system-ui, sans-serif';
    c.fillStyle = 'rgba(0,0,0,.35)'; c.fillText(label, W / 2 + 3, H / 2 + 4);
    c.fillStyle = '#FFC048'; c.fillText(label, W / 2, H / 2);
    c.restore();
  }
}

/* ===================== TECLADO GLOBAL E AÇÕES ===================== */
document.addEventListener('keydown', e => {
  Sfx.unlock();
  const ae = document.activeElement;
  const inTrap = ae === trap;
  const onButton = e.target && e.target.tagName === 'BUTTON';
  const onField = ae && ae !== trap && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA');
  const printable = e.key && e.key.length === 1 && !e.ctrlKey && !e.metaKey;

  if(view === 'home'){
    if(e.key === '1' || e.key === '2' || e.key === '3'){ e.preventDefault(); openMode(+e.key); return; }
    if(printable) pressCap(e.key);
    return;
  }
  if(view === 'list'){
    if(e.key === 'Escape' && !onField){ e.preventDefault(); goHome(); }
    return;
  }
  if(view === 'type'){
    if(e.key === 'Escape'){ e.preventDefault(); restartSession(); return; }
    if(!inTrap && printable && !onField) focusTrap();
    return;
  }
  if(view === 'result'){
    if(onButton) return;
    if(e.key === 'Enter'){ e.preventDefault(); if(session) startSession(session.mode, session.idx); }
    else if(e.key === 'Escape'){ e.preventDefault(); buildList(session ? session.mode : 1); show('list'); }
    return;
  }
  if(view === 'game'){
    if(e.key === 'Escape'){
      e.preventDefault();
      if(G.state === 'play') gPause();
      else if(G.state === 'pause') gResume();
      return;
    }
    if(e.key === 'Enter' && !onButton){
      e.preventDefault();
      if(G.state === 'intro') gAct('go');
      else if(G.state === 'pause') gAct('resume');
      else if(G.state === 'clear' && !$('#g-over').hidden){ if(G.idx < PHASES.length - 1) gAct('next'); }
      else if(G.state === 'lost' && !$('#g-over').hidden) gAct('retry');
      return;
    }
    if(!inTrap && printable && (G.state === 'play' || G.state === 'count')) focusTrap();
  }
});

document.addEventListener('click', e => {
  const m = e.target.closest('[data-mode]');
  if(m){ openMode(+m.dataset.mode); return; }
  const a = e.target.closest('[data-act]');
  if(!a) return;
  const act = a.dataset.act;
  if(act === 'home') goHome();
  else if(act === 'quit') goHome();
  else if(act === 'list'){ stopTicker(); trap.blur(); buildList(session ? session.mode : 1); show('list'); }
  else if(act === 'restart') restartSession();
  else if(act === 'repeat'){ if(session) startSession(session.mode, session.idx); }
});

document.addEventListener('pointerdown', () => Sfx.unlock(), {passive:true});
document.addEventListener('visibilitychange', () => { if(document.hidden && view === 'game' && G.state === 'play') gPause(); });

let resizeT = 0;
window.addEventListener('resize', () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => {
    if(view === 'game'){ gResize(); if(G.typer) G.typer.rescroll(); }
    if(view === 'type' && session && session.typer) session.typer.rescroll();
  }, 120);
});

syncToggles();
refreshHome();
})();
