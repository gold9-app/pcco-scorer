"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { LAPTOP, PARTICLES } from "./sceneConfig";
import { perf } from "./perf";
import type { SceneControls } from "./useSceneControls";

/**
 * 빛 입자 — 한 번에 그리는 점 수만 개.
 *   흐름(flow)  : 클리포드 어트랙터 위의 점들이 천천히 돌며 떠다닌다 (adame 식 생성 곡선)
 *   로고(text)  : 강사 로고 "G9" 이미지의 픽셀을 샘플한다 (윤곽은 뜨겁게, 속은 옅게 · G 는 차가운 빛, 9 는 금빛)
 *   형태(form)  : 글자가 흩어졌다가(detour) 노트북 실루엣(본체 윗면·외곽선·키·트랙패드·뚜껑 외곽·화면)으로 모인다. 뚜껑 점은 셰이더에서 힌지 회전
 *   폭발(burst) : 스크롤하면 사방으로 흩어지며 사라진다 → 본문의 유리 블록이 이어받는다
 *   빛 꼬리     : 같은 지오메트리를 시간차(uTimeOffset)로 몇 번 더 그린다 (흐름 상태에서 꼬리가 생긴다)
 * 모든 자세는 Laptop 이 매 프레임 driver 에 써 넣는다 (React state 없음).
 */

export interface ParticleDriver {
  /** 뚜껑 열림각 (rad, 양수) */
  open: number;
  /** 흐름 → "G9" 글자 (0~1) */
  text: number;
  /** 글자 → (흩어졌다가) 노트북 실루엣 (0~1) */
  form: number;
  /** 흩어짐 (0~1) */
  burst: number;
  /** 노트북 root 의 월드 행렬 */
  model: THREE.Matrix4;
  /** 로고 샘플이 준비됐나 — 준비 전엔 인트로 타임라인이 멈춰 있다 (흐름만 보인다) */
  ready: boolean;
  /** 포인터 (-1~1) — 로고가 살짝 기운다 */
  pointer: THREE.Vector2;
}

export function createDriver(): ParticleDriver {
  return { open: 0, text: 0, form: 0, burst: 0, model: new THREE.Matrix4(), ready: false, pointer: new THREE.Vector2() };
}

const { width: W, depth: D, baseThickness: BT } = LAPTOP;

/** 결정적 난수 — 새로고침해도 같은 그림 */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 노트북 실루엣 샘플 — 본체는 root 로컬, 뚜껑(part 1)은 힌지 로컬 (z 0→D 가 뚜껑 길이, 화면은 -y 면) */
function buildForm(n: number, rnd: () => number) {
  const pos = new Float32Array(n * 3);
  const part = new Float32Array(n);
  const bright = new Float32Array(n);
  let i = 0;
  const put = (x: number, y: number, z: number, p: number, b: number) => {
    if (i >= n) return;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
    part[i] = p;
    bright[i] = b;
    i++;
  };
  // 배분 (합 = 1)
  const q = {
    baseTop: 0.2,
    baseEdge: 0.1,
    keys: 0.17,
    trackpad: 0.05,
    lidEdge: 0.13,
    screenFill: 0.2,
    screenEdge: 0.15,
  };
  const c = (k: keyof typeof q) => Math.floor(n * q[k]);

  // 본체 윗면 — 성긴 채움
  for (let k = 0; k < c("baseTop"); k++) put((rnd() - 0.5) * W, BT + 0.004, (rnd() - 0.5) * D, 0, 0.05);
  // 본체 외곽선 (위·아래 테두리)
  for (let k = 0; k < c("baseEdge"); k++) {
    const t = rnd();
    const y = rnd() < 0.5 ? BT : 0;
    const side = Math.floor(rnd() * 4);
    if (side === 0) put(-W / 2 + t * W, y, -D / 2, 0, 0.5);
    else if (side === 1) put(-W / 2 + t * W, y, D / 2, 0, 0.5);
    else if (side === 2) put(-W / 2, y, -D / 2 + t * D, 0, 0.5);
    else put(W / 2, y, -D / 2 + t * D, 0, 0.5);
  }
  // 키보드 — 5줄 × 14칸, 키마다 작은 사각
  {
    const kbW = W * 0.78;
    const kbD = D * 0.4;
    const kbZ = -0.16;
    const per = Math.max(1, Math.floor(c("keys") / 70));
    for (let r = 0; r < 5; r++)
      for (let col = 0; col < 14; col++) {
        const cx = -kbW / 2 + (kbW / 14) * (col + 0.5);
        const cz = kbZ - kbD / 2 + (kbD / 5) * (r + 0.5);
        for (let k = 0; k < per; k++) put(cx + (rnd() - 0.5) * (kbW / 14) * 0.72, BT + 0.02, cz + (rnd() - 0.5) * (kbD / 5) * 0.66, 0, 0.35);
      }
  }
  // 트랙패드 외곽
  for (let k = 0; k < c("trackpad"); k++) {
    const tw = W * 0.34;
    const td = D * 0.22;
    const t = rnd();
    const side = Math.floor(rnd() * 4);
    const z0 = D * 0.31;
    if (side === 0) put(-tw / 2 + t * tw, BT + 0.004, z0 - td / 2, 0, 0.4);
    else if (side === 1) put(-tw / 2 + t * tw, BT + 0.004, z0 + td / 2, 0, 0.4);
    else if (side === 2) put(-tw / 2, BT + 0.004, z0 - td / 2 + t * td, 0, 0.4);
    else put(tw / 2, BT + 0.004, z0 - td / 2 + t * td, 0, 0.4);
  }
  // 뚜껑 외곽선 (힌지 로컬)
  for (let k = 0; k < c("lidEdge"); k++) {
    const t = rnd();
    const side = Math.floor(rnd() * 4);
    if (side === 0) put(-W / 2 + t * W, 0, 0.02, 1, 0.55);
    else if (side === 1) put(-W / 2 + t * W, 0, D, 1, 0.55);
    else if (side === 2) put(-W / 2, 0, t * D, 1, 0.55);
    else put(W / 2, 0, t * D, 1, 0.55);
  }
  // 화면 채움 — 가운데는 비워 메시지가 읽히게 (가장자리로 갈수록 촘촘)
  {
    const sw = W * 0.9;
    const sd = D * 0.84;
    const z0 = D / 2 + 0.01;
    for (let k = 0; k < c("screenFill"); k++) {
      const u = rnd() * 2 - 1;
      const v = rnd() * 2 - 1;
      const edge = Math.max(Math.abs(u), Math.abs(v));
      if (rnd() > edge * edge) continue;
      put(u * sw * 0.5, -0.006, z0 + v * sd * 0.5, 1, 0.2);
    }
    // 화면 테두리 — 가장 밝게
    for (let k = 0; k < c("screenEdge"); k++) {
      const t = rnd() * 2 - 1;
      const side = Math.floor(rnd() * 4);
      if (side === 0) put(t * sw * 0.5, -0.006, z0 - sd * 0.5, 1, 1);
      else if (side === 1) put(t * sw * 0.5, -0.006, z0 + sd * 0.5, 1, 1);
      else if (side === 2) put(-sw * 0.5, -0.006, z0 + t * sd * 0.5, 1, 1);
      else put(sw * 0.5, -0.006, z0 + t * sd * 0.5, 1, 1);
    }
  }
  // 남은 자리는 본체 윗면으로
  while (i < n) put((rnd() - 0.5) * W, BT + 0.004, (rnd() - 0.5) * D, 0, 0.05);
  return { pos, part, bright };
}

/** 클리포드 어트랙터 — x' = sin(a·y) + c·cos(a·x), y' = sin(b·x) + d·cos(b·y). 값 범위 약 ±2 */
function buildFlow(n: number, rnd: () => number) {
  const a = -1.4;
  const b = 1.6;
  const c = 1.0;
  const d = 0.7;
  const pos = new Float32Array(n * 3);
  let x = 0.1;
  let y = 0.1;
  for (let k = 0; k < 200; k++) {
    const nx = Math.sin(a * y) + c * Math.cos(a * x);
    y = Math.sin(b * x) + d * Math.cos(b * y);
    x = nx;
  }
  for (let i = 0; i < n; i++) {
    const nx = Math.sin(a * y) + c * Math.cos(a * x);
    y = Math.sin(b * x) + d * Math.cos(b * y);
    x = nx;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = (rnd() - 0.5) * 1.4 + 0.35 * Math.sin(x * 1.7 + y * 1.1);
  }
  return pos;
}

/**
 * 로고 샘플 — 이미지를 캔버스에 그려 배경(흰색)이 아닌 픽셀을 모은다.
 * 좌표는 캔버스 폭 기준 [-1,1] (y 는 비율 유지), 실제 크기는 uTextScale.
 * 윤곽(옆 픽셀이 배경인 점)은 bright 1, 속은 0.3. warm = 따뜻한 색(9) 여부 (0|1)
 */
export function buildLogo(n: number, rnd: () => number, img: HTMLImageElement) {
  const pos = new Float32Array(n * 3);
  const bright = new Float32Array(n);
  const warm = new Float32Array(n);
  const order = new Float32Array(n);
  const cw = 512;
  const ch = Math.round((cw * img.naturalHeight) / Math.max(1, img.naturalWidth));
  const cv = document.createElement("canvas");
  cv.width = cw;
  cv.height = ch;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { pos, bright, warm, order };
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, 0, 0, cw, ch);
  const d = ctx.getImageData(0, 0, cw, ch).data;
  const ink = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= cw || y >= ch) return false;
    const o = (y * cw + x) * 4;
    return d[o + 3] > 60 && !(d[o] > 222 && d[o + 1] > 222 && d[o + 2] > 222);
  };
  const cand: number[] = [];
  const edge: number[] = [];
  const hot: number[] = [];
  for (let y = 0; y < ch; y += 2)
    for (let x = 0; x < cw; x += 2) {
      if (!ink(x, y)) continue;
      const o = (y * cw + x) * 4;
      cand.push(x, y);
      edge.push(!ink(x - 4, y) || !ink(x + 4, y) || !ink(x, y - 4) || !ink(x, y + 4) ? 1 : 0);
      hot.push(d[o] > d[o + 2] + 25 ? 1 : 0);
    }
  const m = cand.length / 2;
  if (m === 0) return { pos, bright, warm, order };
  const edgeIdx: number[] = [];
  const innerIdx: number[] = [];
  for (let k = 0; k < m; k++) (edge[k] ? edgeIdx : innerIdx).push(k);
  // 획 순서 — 로고 중심 기준 각도로 시계 방향 스윕. 차가운 획(G) 먼저, 금빛 획(9) 이어서
  let sx = 0;
  let sy = 0;
  for (let k = 0; k < m; k++) {
    sx += cand[k * 2];
    sy += cand[k * 2 + 1];
  }
  sx /= m;
  sy /= m;
  for (let i = 0; i < n; i++) {
    // 윤곽 70% · 속 30% — 라인아트처럼 가늘게
    const pool = rnd() < 0.7 && edgeIdx.length ? edgeIdx : innerIdx.length ? innerIdx : edgeIdx;
    const k = pool[Math.floor(rnd() * pool.length)];
    const x = cand[k * 2] + (rnd() - 0.5) * 2;
    const y = cand[k * 2 + 1] + (rnd() - 0.5) * 2;
    pos[i * 3] = (x / cw - 0.5) * 2;
    pos[i * 3 + 1] = -(y / ch - 0.5) * 2 * (ch / cw);
    pos[i * 3 + 2] = (rnd() - 0.5) * 0.08;
    bright[i] = edge[k] ? 1 : 0.18;
    warm[i] = hot[k];
    const ang = (Math.atan2(y - sy, x - sx) + Math.PI * 1.5) % (Math.PI * 2); // 12시부터 시계 방향
    const sweep = ang / (Math.PI * 2);
    order[i] = hot[k] ? 0.5 + sweep * 0.5 : sweep * 0.55;
  }
  return { pos, bright, warm, order };
}

const vertex = /* glsl */ `
  uniform float uTime, uTimeOffset, uText, uForm, uOpen, uBurst, uSize, uPixelRatio, uAlpha, uFlowScale, uFlowSpin, uTextScale, uIsTrail;
  uniform mat4 uModel;
  uniform vec3 uHinge;
  uniform vec2 uPointer;
  attribute vec3 aFlow;
  attribute vec3 aText;
  attribute float aTextB;
  attribute float aTextW;
  attribute float aTextO;
  attribute vec3 aForm;
  attribute float aPart;
  attribute float aRand;
  attribute float aBright;
  varying float vAlpha;
  varying float vBright;
  varying float vRand;
  varying float vLogo;
  varying float vWarm;
  mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
  void main() {
    float t = uTime + uTimeOffset;
    // 흐름 — 어트랙터 점이 천천히 돌고 미세하게 떨린다
    vec3 flow = aFlow * uFlowScale;
    flow.xy = rot(t * uFlowSpin) * flow.xy;
    flow += 0.03 * vec3(sin(t * 0.9 + aRand * 6.2831), cos(t * 0.7 + aRand * 12.566), sin(t * 0.5 + aRand * 3.0));
    // 실루엣 — 뚜껑 점은 힌지 회전
    vec3 form = aForm;
    if (aPart > 0.5) {
      float c = cos(-uOpen), s = sin(-uOpen);
      form = vec3(form.x, c * form.y - s * form.z, s * form.y + c * form.z) + uHinge;
    }
    vec3 formW = (uModel * vec4(form, 1.0)).xyz;
    // 로고 — 가운데. 숨 쉬듯 아주 천천히 커졌다 작아지고, 포인터 쪽으로 살짝 기운다
    float breathe = 1.0 + 0.012 * sin(t * 0.8);
    vec3 text = vec3(aText.xy * uTextScale * breathe, aText.z);
    float tx = uPointer.y * 0.18, ty = uPointer.x * 0.22;
    text.yz = mat2(cos(tx), -sin(tx), sin(tx), cos(tx)) * text.yz;
    text.xz = mat2(cos(ty), -sin(ty), sin(ty), cos(ty)) * text.xz;
    text += 0.004 * vec3(sin(t * 1.3 + aRand * 9.0), cos(t * 1.1 + aRand * 5.0), 0.0);
    vec3 dir = normalize(vec3(aRand - 0.5, fract(aRand * 7.31) - 0.25, fract(aRand * 13.7) - 0.5));
    // 1) 흐름 → 로고. 획 순서(aTextO)대로 그려지듯 — G 먼저, 9 이어서. 오는 길은 살짝 휘어서
    float ft = smoothstep(0.0, 1.0, clamp((uText - aTextO * 0.62 - aRand * 0.08) / 0.3, 0.0, 1.0));
    vec3 p = mix(flow, text, ft);
    p += dir * sin(3.14159 * ft) * 0.25 * (0.5 + aRand);
    // 2) 글자 → 노트북. 중간에 사방으로 흩어졌다가 모인다 (detour)
    float fm = smoothstep(0.0, 1.0, clamp((uForm - aRand * 0.45) / 0.55, 0.0, 1.0));
    p = mix(p, formW, fm);
    p += dir * sin(3.14159 * fm) * (1.2 + aRand * 1.8);
    // 3) 스크롤 — 흩어져 사라진다
    float b = smoothstep(0.0, 1.0, clamp((uBurst - aRand * 0.3) / 0.7, 0.0, 1.0));
    p += dir * b * (2.5 + aRand * 3.5);
    // 얼마나 "형태"를 이루고 있나 (글자든 노트북이든) → 모이면 가늘고 옅게, 밝은 점만 또렷이
    float formed = max(ft * (1.0 - fm), fm) * (1.0 - sin(3.14159 * fm));
    float bright = aTextB * ft * (1.0 - fm) + aBright * fm;
    vAlpha = uAlpha * (1.0 - b) * mix(1.0, 0.5 + bright * 0.5, formed);
    // 로고 윤곽은 잔잔히 반짝인다
    float logoNow = ft * (1.0 - fm);
    vAlpha *= mix(1.0, 0.72 + 0.28 * sin(t * 2.6 + aRand * 40.0), logoNow * aTextB);
    // 꼬리는 형태가 잡히면 사라진다 (같은 자리에 겹쳐 밝아지는 것 방지)
    vAlpha *= mix(1.0, 1.0 - formed, uIsTrail);
    vBright = bright * formed;
    vRand = aRand;
    vLogo = ft * (1.0 - fm);
    vWarm = aTextW;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // 로고 상태에선 더 가늘게 (라인아트)
    float sz = mix(1.0, 0.5 + bright * 0.8, formed) * mix(1.0, 0.7, logoNow);
    gl_PointSize = uSize * uPixelRatio * sz * (6.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA, uColorB, uColorHot, uLogoCool, uLogoWarm;
  varying float vAlpha;
  varying float vBright;
  varying float vRand;
  varying float vLogo;
  varying float vWarm;
  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.08, r);
    a *= a;
    vec3 col = mix(uColorA, uColorB, vRand);
    // 로고 상태에선 로고 색 (G 차가운 빛 · 9 금빛), 윤곽은 흰빛으로
    col = mix(col, mix(uLogoCool, uLogoWarm, vWarm), vLogo);
    // 로고는 흰빛으로 덜 덮고, 덜 타오르게 — 두 색이 살아 있게
    col = mix(col, uColorHot, vBright * mix(0.85, 0.28, vLogo));
    float gain = mix(0.55 + vBright * 1.7, 0.75 + vBright * 0.75, vLogo);
    gl_FragColor = vec4(col * gain, a * vAlpha);
  }
`;

interface Props {
  driver: React.RefObject<ParticleDriver>;
  controls: SceneControls;
}

export default function Particles({ driver, controls }: Props) {
  const { size, viewport, gl } = useThree();
  const count = size.width < 768 ? Math.floor(PARTICLES.count / 2) : PARTICLES.count;

  const geometry = useMemo(() => {
    const rnd = mulberry32(20261021);
    const g = new THREE.BufferGeometry();
    const form = buildForm(count, rnd);
    const flow = buildFlow(count, rnd);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) rand[i] = rnd();
    // position 은 쓰지 않지만 three 가 요구한다
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("aFlow", new THREE.BufferAttribute(flow, 3));
    g.setAttribute("aText", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("aTextB", new THREE.BufferAttribute(new Float32Array(count), 1));
    g.setAttribute("aTextW", new THREE.BufferAttribute(new Float32Array(count), 1));
    g.setAttribute("aTextO", new THREE.BufferAttribute(new Float32Array(count), 1));
    g.setAttribute("aForm", new THREE.BufferAttribute(form.pos, 3));
    g.setAttribute("aPart", new THREE.BufferAttribute(form.part, 1));
    g.setAttribute("aBright", new THREE.BufferAttribute(form.bright, 1));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50); // 절대 컬링되지 않게
    return g;
  }, [count]);

  // 로고 이미지를 받아 샘플한다 — 준비되면 driver.ready → 인트로 시작
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.onload = () => {
      if (!alive) return;
      const logo = buildLogo(count, mulberry32(9), img);
      (geometry.getAttribute("aText") as THREE.BufferAttribute).copyArray(logo.pos).needsUpdate = true;
      (geometry.getAttribute("aTextB") as THREE.BufferAttribute).copyArray(logo.bright).needsUpdate = true;
      (geometry.getAttribute("aTextW") as THREE.BufferAttribute).copyArray(logo.warm).needsUpdate = true;
      (geometry.getAttribute("aTextO") as THREE.BufferAttribute).copyArray(logo.order).needsUpdate = true;
      driver.current.ready = true;
    };
    img.onerror = () => {
      if (alive) driver.current.ready = true; // 로고가 없어도 멈추지 않는다 (글자 단계는 비어 지나간다)
    };
    img.src = PARTICLES.logo;
    return () => {
      alive = false;
    };
  }, [geometry, count, driver]);

  const steps = PARTICLES.trailSteps + 1;
  const materials = useMemo(
    () =>
      Array.from({ length: steps }, () => {
        return new THREE.ShaderMaterial({
          vertexShader: vertex,
          fragmentShader: fragment,
          transparent: true,
          depthWrite: false,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uTime: { value: 0 },
            uTimeOffset: { value: 0 },
            uText: { value: 0 },
            uForm: { value: 0 },
            uOpen: { value: 0 },
            uTextScale: { value: 1 },
            uPointer: { value: new THREE.Vector2() },
            uIsTrail: { value: 0 },
            uBurst: { value: 0 },
            uSize: { value: PARTICLES.size },
            uPixelRatio: { value: 1 },
            uAlpha: { value: PARTICLES.alpha },
            uFlowScale: { value: 1 },
            uFlowSpin: { value: PARTICLES.flowSpin },
            uModel: { value: new THREE.Matrix4() },
            uHinge: { value: new THREE.Vector3(0, BT, -D / 2) },
            uColorA: { value: new THREE.Color(PARTICLES.colorA) },
            uColorB: { value: new THREE.Color(PARTICLES.colorB) },
            uColorHot: { value: new THREE.Color(PARTICLES.colorHot) },
            uLogoCool: { value: new THREE.Color(PARTICLES.logoCool) },
            uLogoWarm: { value: new THREE.Color(PARTICLES.logoWarm) },
          },
        });
      }),
    [steps]
  );

  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const d = driver.current;
    const t = state.clock.elapsedTime;
    const p = controls.particles;
    const flowScale = Math.max(viewport.width, viewport.height) * p.flowScale;
    const pr = gl.getPixelRatio();
    const pointerTarget = d.pointer;
    materials.forEach((m, i) => {
      const u = m.uniforms;
      u.uTime.value = t;
      u.uTimeOffset.value = -i * p.trailGap;
      u.uText.value = d.text;
      u.uForm.value = d.form;
      u.uOpen.value = d.open;
      u.uTextScale.value = viewport.width < viewport.height ? viewport.width * p.textScale * 1.9 : viewport.width * p.textScale;
      u.uIsTrail.value = i === 0 ? 0 : 1;
      (u.uPointer.value as THREE.Vector2).lerp(pointerTarget, 0.05);
      u.uBurst.value = d.burst;
      u.uSize.value = p.size * (i === 0 ? 1 : 0.85);
      u.uPixelRatio.value = pr;
      // 꼬리는 점점 옅게 (형태가 잡히면 셰이더에서 사라진다)
      u.uAlpha.value = p.alpha * (i === 0 ? 1 : 0.4 / i);
      u.uFlowScale.value = flowScale;
      u.uFlowSpin.value = p.flowSpin;
      u.uModel.value.copy(d.model);
      (u.uColorA.value as THREE.Color).set(p.colorA);
      (u.uColorB.value as THREE.Color).set(p.colorB);
      (u.uColorHot.value as THREE.Color).set(p.colorHot);
      (u.uLogoCool.value as THREE.Color).set(p.logoCool);
      (u.uLogoWarm.value as THREE.Color).set(p.logoWarm);
    });
    if (group.current) {
      group.current.visible = d.burst < 0.999;
      // 저사양: 꼬리 복제는 끈다 (첫 번째만 그린다)
      group.current.children.forEach((c, i) => {
        c.visible = i === 0 || !perf.low;
      });
    }
  });

  return (
    <group ref={group} name="particles">
      {materials.map((m, i) => (
        <points key={i} geometry={geometry} material={m} frustumCulled={false} renderOrder={2} />
      ))}
    </group>
  );
}
