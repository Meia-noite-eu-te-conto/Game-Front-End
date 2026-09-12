// Teste de fumaça e carga leve do front-end: só estáticos, servidos pelo
// nginx da imagem (sem backend — o proxy das APIs é feito pelo Ingress em
// produção, não pelo nginx do pod).
//
// Existe de propósito um caso NEGATIVO (path inexistente deve dar 404, não
// 200 com o index.html dentro): é a regressão exata corrigida em
// nginx/../01-configmap.yaml — troca de `try_files $uri $uri/ /index.html`
// (mascara asset ausente) para `=404`. O roteador desta SPA nunca muda a
// URL, então fallback de SPA aqui esconderia erro real de asset.
//
// Rodar localmente: k6 run -e BASE_URL=http://localhost:8080 k6/smoke.js
import http from "k6/http";
import { check } from "k6";
import { Trend } from "k6/metrics";

const BASE_URL = __ENV.BASE_URL || "http://localhost:8080";

const staticAssetDuration = new Trend("static_asset_duration", true);

export const options = {
  vus: 10,
  duration: "15s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    // Estático servido por nginx não tem desculpa para ser lento.
    static_asset_duration: ["p(95)<150"],
  },
};

const ASSETS = [
  "/",
  "/home.html",
  "/game.html",
  "/assets/js/Enums.js",
  "/assets/js/Generics.js",
  "/assets/js/EventHandlers.js",
  "/assets/js/game-front-end/MVnew.js",
  "/assets/js/repositories/RoomRepository.js",
];

export default function () {
  const path = ASSETS[Math.floor(Math.random() * ASSETS.length)];
  const res = http.get(`${BASE_URL}${path}`);
  staticAssetDuration.add(res.timings.duration);
  check(res, {
    [`${path}: 200`]: (r) => r.status === 200,
  });
}

// Roda uma vez só, fora do loop de carga: valida o caso negativo sem
// distorcer os thresholds de latência do fluxo principal.
export function setup() {
  const res = http.get(`${BASE_URL}/caminho-que-nao-existe-de-verdade`);
  check(res, {
    "asset inexistente: 404 (não 200 com index.html dentro)": (r) => r.status === 404,
  });

  const health = http.get(`${BASE_URL}/healthz`);
  check(health, {
    "/healthz: 200": (r) => r.status === 200,
  });
}
