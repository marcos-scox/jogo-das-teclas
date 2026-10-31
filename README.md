# Jogo das Teclas

Jogo de treino de digitação feito com HTML, CSS e JavaScript. O projeto foi organizado em pastas e agora inclui um ranking global para as campanhas do modo Batalha.

## Acesse o jogo

Jogue online em [Jogo das Teclas](https://marcos-scox.github.io/jogo-das-teclas/).

## Como executar localmente

Para que o ranking também funcione em desenvolvimento local, inicie um servidor HTTP na pasta do projeto:

```bash
python3 -m http.server 8787
```

Depois, abra <http://localhost:8787>. O jogo continua funcionando se `index.html` for aberto diretamente, mas navegadores podem bloquear as chamadas ao Supabase nesse modo.

## Ranking Global

Antes de escolher a dificuldade, informe o nome que aparecerá na classificação. Ao concluir as cinco fases, o resultado é enviado automaticamente para o ranking correspondente: Fácil, Médio ou Difícil. A página inicial mostra os 20 melhores de cada modalidade, ordenados por pontuação decrescente; em caso de empate, aparece primeiro quem concluiu antes.

A pontuação é calculada no servidor a partir das teclas registradas, do texto oficial de cada fase, dos erros e do tempo medido pela sessão. O servidor só aceita a submissão depois da quinta fase e cada sessão pode gerar no máximo um registro. Uma partida abandonada ou que não foi validada não aparece no ranking. A tabela de resultados permite leitura pública, mas não aceita gravações diretas pelo navegador.

O ranking não exige cadastro: cada partida recebe um identificador aleatório temporário, e a sessão interna é guardada apenas no backend. O nome público é o apelido escolhido pelo jogador.

## Segurança e limites

- O navegador contém somente a URL do projeto e a chave **publishable**, que é feita para uso público. Chaves administrativas ficam exclusivamente no ambiente seguro da Edge Function e não estão no repositório.
- A tabela de sessões é privada; a tabela do ranking usa RLS e permite apenas leitura pública. A função de servidor valida a sequência das fases, reproduz a trilha de teclas e recalcula a pontuação; ela também aplica limite de início de sessões por IP.
- Isso impede inserir diretamente uma pontuação arbitrária ou publicar uma campanha incompleta. Como o jogo é entregue como site estático, não existe uma forma infalível de impedir todo bot ou cliente modificado; a validação torna a falsificação direta mais difícil, mas não equivale a uma plataforma com execução confiável no dispositivo.

## Supabase

O backend em uso é o projeto `jogo-das-teclas-ranking`, hospedado na região São Paulo (`sa-east-1`).

- Migração do banco, tabelas e políticas RLS: [`supabase/migrations/20261030_global_leaderboard.sql`](supabase/migrations/20261030_global_leaderboard.sql)
- Função de sessão e validação: [`supabase/functions/ranking-api/index.ts`](supabase/functions/ranking-api/index.ts)
- Configuração pública do cliente: [`assets/js/supabase-config.js`](assets/js/supabase-config.js)

Para referências oficiais: [chaves da API Supabase](https://supabase.com/docs/guides/getting-started/api-keys), [segurança de Edge Functions](https://supabase.com/docs/guides/functions/auth) e [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Estrutura

```text
.
├── index.html
├── README.md
├── assets/
│   ├── css/styles.css
│   └── js/
│       ├── app.js
│       └── supabase-config.js
└── supabase/
    ├── functions/ranking-api/index.ts
    └── migrations/20261030_global_leaderboard.sql
```

## Dificuldades da batalha

- **Fácil:** 3 minutos por fase, sem alteração de tempo por erro.
- **Médio:** 2 minutos por fase; cada erro desconta 5 segundos.
- **Difícil:** 1 minuto por fase; cada erro desconta 5 segundos e cada tecla correta acrescenta 1 segundo.

Após completar três fases sem erros (acumuladas, não necessariamente consecutivas), o jogador recebe um sexto ponto de defesa para as fases restantes daquela campanha. A dificuldade é escolhida antes de começar e permanece fixa até voltar ao menu principal.
