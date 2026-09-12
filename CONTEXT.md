# CONTEXT.md — Game-Front-End

A interface do jogo: SPA em JavaScript puro, renderer WebGL2 escrito à mão, e o nginx
que serve os estáticos e faz proxy para os dois back-ends.

> Submodule de [Transcendence](https://github.com/Meia-noite-eu-te-conto/Transcendence).
> Regras transversais em `AGENTS.md` na raiz. Este projeto é **legado**: seu substituto
> é `web` em Angular (onda 4 da migração).

## Responsabilidade

- Telas: home (criar sala), lista de salas, sala de partida, sala de torneio, jogo,
  ranking.
- Desenhar o campo em WebGL2 a partir dos snapshots do servidor.
- Manter três conexões WebSocket (jogo, sala, torneio).
- Servir estáticos e fazer proxy reverso de `/api/v1/{user-session,game-core}/`.

## Stack

Nenhuma. JavaScript puro sem bundler, sem módulos ES, sem gerenciador de pacotes.
15 arquivos carregados por `<script>` no `index.html`, todos em escopo global.
Bootstrap 5.3 e bootstrap-icons por CDN. nginx com TLS autoassinado.

## Estrutura

```
nginx/
├── Dockerfile           gera certificado autoassinado no build
└── default.conf         :443, estáticos + proxy /api/v1/{user-session,game-core}/
src/
├── index.html           ★ único shell real: carrega tudo e monta o Router
├── home.html            parciais injetadas em #root por DOMRender()
├── view-rooms.html
├── watch-room.html      sala de partida
├── tournament.html
├── game.html
├── ranking.html
└── assets/
    ├── js/
    │   ├── Enums.js                cores, tipos de sala, nomes de rota
    │   ├── Generics.js             ★ fetch, cookies (na verdade localStorage), DOMRender
    │   ├── EventHandlers.js        ★ 438 linhas: classes de página + Router + WebSockets
    │   ├── Rooms.js, Ranking.js
    │   ├── components/             RoomComponent (371 l.), Pagination, Header
    │   ├── repositories/           RoomRepository (243 l.), RankingRepository, RoutesInfo
    │   └── game-front-end/         ★ o renderer WebGL2 (~1.900 linhas)
    │       ├── MVnew.js            1.197 l. — álgebra linear (mat4, vec3, lookAt...)
    │       ├── Objects.js          geometria dos objetos
    │       ├── Variables.js        estado global do renderer
    │       ├── InitAndUpdateObjects.js
    │       ├── Shaders.js, Textures.js, WebglUtils.js
    │       └── Render.js           setup(data) + render()
    ├── css/background.css
    └── icon/, img/
```

## Como funciona a navegação

Roteador próprio em `EventHandlers.js:348`. Não há mudança de URL real:

1. `DOMRender(pageName)` faz `fetch` do `.html` parcial e joga em `#root.innerHTML`.
2. `Router.navigateTo()` chama `destroy()` da página anterior e `init()` da nova.
3. Cada rota é uma classe com `init()`/`destroy()`: `PageHome`, `PageViewRooms`,
   `Ranking`, `PageMatchRoom`, `PageTournament`, `PageGame`.
4. `pushState` é chamado sempre com `window.location.href` — a URL **nunca muda**.
   O histórico é espelhado à mão em `sessionStorage` e restaurado no boot.
5. Página atual, `roomCode`, `gameId` e `userId` vivem em `localStorage`.

Um clique em qualquer lugar passa por um único listener em `document`
(`HandleEvents`), que decide o que fazer pelo `data-*` do elemento clicado.

## O renderer

`PageGame.init()` monta o estado global do WebGL (`gPong`, `gl`, `gObjects`,
`gCamera`, `gShader`, `gCtx`, `gPositions`, `doOnce`), abre o WebSocket de jogo e, a
cada mensagem `game.update`, chama `drawOnCanvas(data.game_state)` →
`setup()` + `render()`.

Pontos a entender antes de mexer:
- **Um frame desenhado por mensagem recebida.** Não há `requestAnimationFrame` no laço
  principal nem interpolação: a suavidade depende inteiramente da taxa do servidor.
- `MVnew.js` é uma biblioteca de matrizes própria (port do MV.js clássico de WebGL).
  1.197 linhas onde um sinal trocado não dá erro — dá uma cena errada.
- Tudo em escopo global, `doOnce` como guarda de inicialização.

## Integração

| Destino | Como |
| --- | --- |
| `user-session` | REST via `/api/v1/user-session/...`, header `X-User-Id` do `localStorage` |
| `game-core` | REST via `/api/v1/game-core/...` |
| WS de jogo | `wss://{host}/api/v1/game-core/games/{gameId}/{userId}/` |
| WS de sala | `wss://{host}/api/v1/user-session/ws/rooms/{code}/?userId={id}` |

Mensagens recebidas no WS de jogo: `game.update` (snapshot), `update_score`,
`game_finished`. No WS de sala: `player_list_update`, `sync_match`, `game_started`,
`delete_room`, `tournament_ended`.

Envio de input: `keydown` em `document` manda `{direction: event.key}` — **toda** tecla
pressionada vira mensagem, sem filtro e sem `keyup`.

## Como roda

Container `nginx` no compose da raiz, portas `8080:80` e `8443:443`. Em
desenvolvimento, `src/` é montado como volume em `/usr/share/nginx/html` — editar um
arquivo e recarregar a página basta, não há build.

## Armadilhas deste projeto

- **`getCookie()` não lê cookie.** Lê `localStorage.getItem('userId')`, ignorando os
  dois parâmetros que recebe. `addCookie()` tem bug: usa `itemName` (inexistente) em
  vez de `cookieName`.
- **Identidade no `localStorage`** mandada em `X-User-Id`: qualquer pessoa se passa por
  qualquer jogador.
- **Dois blocos idênticos de Bootstrap** carregados no `<head>` do `index.html`.
- **Dois listeners de `keydown`** em `PageGame.init()`: um via `this.keydownHandler` e
  outro inline. O `destroy()` remove só o primeiro — trocar de página e voltar acumula
  listener.
- **`Render.js:20`** faz `gPong.fieldWidth = fieldAttributes["height"]` e só
  sobrescreve com `width` se forem 2 jogadores: campo de 4 usa altura como largura.
- **Mapa de cor próprio** (0 verde, 1 azul, 2 amarelo, 3 rosa), divergente dos dois
  back-ends.
- **Sem reconexão de WebSocket.** `onerror` só loga e acende um ícone vermelho; quem
  cai no meio da partida fica olhando tela parada.
- **`RoomRepository.js` define os endpoints duas vezes**, em `RoutesInfo` e em
  `APIEndPoints`, com formatos diferentes.
- **`alert("Colocar um aviso de que o player saiu...")`** em produção, em dois lugares.
- **Migração incompleta de caminho absoluto para relativo.** O `Router.actions`
  usa chaves `./home.html`, `./view-rooms.html` etc., mas `RouteNames` em `Enums.js`
  e um botão de `home.html` continuavam com `/home.html` absoluto. Como
  `navigateTo()` faz `if (this.actions[newPage])` por igualdade estrita de string,
  qualquer chamador que use o caminho absoluto — inclusive `redirectHrefRoom` (rodado
  **logo após criar uma sala**) e `redirectGame` (rodado ao iniciar a partida) — troca
  o HTML da tela mas nunca executa `init()` da página nova. Efeito: WebSocket de sala
  nunca abre, "List Rooms" e "Ranking" ficam sempre vazios, sem erro visível.
  Corrigido em 2026-09-12 completando a migração para `./` em todo lugar. Confirmado
  em produção real (cluster k3s): usuário via o indicador de WS preso em
  "disconnected" após criar sala.
- **Zero testes.** Esse bug de roteamento não teria passado despercebido com um
  teste de integração simples ("criar sala → WS conecta").

## Para onde vai

`web` em Angular 20+ (standalone, signals, zoneless):

| Aqui | Vai para |
| --- | --- |
| `Router` + `DOMRender` (~90 linhas) | `@angular/router` com rotas lazy |
| `localStorage` como estado | parâmetro de rota + signals; `localStorage` só para refresh token |
| `RoomRepository`, `RankingRepository` | `core/api/` **gerado** do OpenAPI |
| `RoomComponent`, `Pagination`, `Header` | `shared/ui/` e `features/*/` |
| 3 WebSockets à mão | `core/ws/` com reconexão e backoff |
| `MVnew.js` | `lib/mat4.ts` — transcrição literal, com teste comparando a saída |
| `game-front-end/*.js` | `lib/renderer/` numa classe `PongRenderer`, fora do Angular |
| um frame por mensagem | `requestAnimationFrame` a 60 fps com interpolação entre snapshots |
| `nginx` | Traefik no edge |

**O renderer é transcrito, não reprojetado.** Reescrever WebGL não está no escopo de
nenhuma onda. Ver [convenções Angular](../docs/migration/05-convencoes-angular.md) e a
skill `angular-feature`.
