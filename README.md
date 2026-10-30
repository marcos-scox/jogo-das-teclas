# Jogo das Teclas

Jogo de treino de digitação feito com HTML, CSS e JavaScript. O projeto foi organizado em pastas; a lógica e o visual do arquivo original foram preservados.

## Acesse o jogo

Jogue online em: [Jogo das Teclas](https://marcos-scox.github.io/jogo-das-teclas/).

## Como executar

Abra o arquivo `index.html` em um navegador moderno. Não é necessário instalar dependências nem iniciar um servidor.

## Estrutura

```text
.
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

## Sobre

O jogo oferece modos de treino de digitação e uma experiência de batalha com teclado. As preferências visuais e os resultados são controlados pelo próprio jogo no navegador.

## Dificuldades da batalha

- **Fácil:** 3 minutos por fase, sem alteração de tempo por erro.
- **Médio:** 2 minutos por fase; cada erro desconta 5 segundos.
- **Difícil:** 1 minuto por fase; cada erro desconta 5 segundos e cada tecla correta acrescenta 1 segundo.

Após completar três fases sem erros (acumuladas, não necessariamente consecutivas), o jogador recebe um sexto ponto de defesa para as fases restantes da partida. A dificuldade e essa recompensa são reiniciadas ao voltar ao menu principal.
