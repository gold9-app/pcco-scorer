"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { LAPTOP, PARTICLES } from "./sceneConfig";
import type { SceneControls } from "./useSceneControls";

/**
 * 빛 입자 — 한 번에 그리는 점 수만 개.
 *   흐름(flow)  : 클리포드 어트랙터 위의 점들이 천천히 돌며 떠다닌다 (adame 식 생성 곡선)
 *   형태(form)  : 노트북 실루엣(본체 윗면·외곽선·키·트랙패드·뚜껑 외곽·화면)으로 모인다. 뚜껑 점은 셰이더에서 힌지 회전
 *   폭발(burst) : 스크롤하면 사방으로 흩어지며 사라진다 → 본문의 유리 블록이 이어받는다
 *   빛 꼬리     : 같은 지오메트리를 시간차(uTimeOffset)로 몇 번 더 그린다 (흐름 상태에서 꼬리가 생긴다)
 * 모든 자세는 Laptop 이 매 프레임 driver 에 써 넣는다 (React state 없음).
 */

export interface ParticleDriver {
  /** 뚜껑 열림각 (rad, 양수) */
  open: number;
  /** 흐름 → 실루엣 (0~1) */
  form: number;
  /** 흩어짐 (0~1) */
  burst: number;
  /** 노트북 root 의 월드 행렬 */
  model: THREE.Matrix4;
}

export function createDriver(): ParticleDriver {
  return { open: 0, form: 0, burst: 0, model: new THREE.Matrix4() };
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

const vertex = /* glsl */ `
  uniform float uTime, uTimeOffset, uForm, uOpen, uBurst, uSize, uPixelRatio, uAlpha, uFlowScale, uFlowSpin;
  uniform mat4 uModel;
  uniform vec3 uHinge;
  attribute vec3 aFlow;
  attribute vec3 aForm;
  attribute float aPart;
  attribute float aRand;
  attribute float aBright;
  varying float vAlpha;
  varying float vBright;
  varying float vRand;
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
    // 모이기 — 입자마다 시차
    float f = smoothstep(0.0, 1.0, clamp((uForm - aRand * 0.45) / 0.55, 0.0, 1.0));
    vec3 p = mix(flow, formW, f);
    // 흩어짐
    vec3 dir = normalize(vec3(aRand - 0.5, fract(aRand * 7.31) - 0.25, fract(aRand * 13.7) - 0.5));
    float b = smoothstep(0.0, 1.0, clamp((uBurst - aRand * 0.3) / 0.7, 0.0, 1.0));
    p += dir * b * (2.5 + aRand * 3.5);
    // 모이면 가늘고 옅게 — 먼지가 선을 이루듯. 밝은 점(테두리·화면)만 또렷이
    vAlpha = uAlpha * (1.0 - b) * mix(1.0, 0.55 + aBright * 0.45, f);
    vBright = aBright * f;
    vRand = aRand;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * mix(1.0, 0.55 + aBright * 0.75, f) * (6.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA, uColorB, uColorHot;
  varying float vAlpha;
  varying float vBright;
  varying float vRand;
  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.08, r);
    a *= a;
    vec3 col = mix(uColorA, uColorB, vRand);
    col = mix(col, uColorHot, vBright * 0.85);
    gl_FragColor = vec4(col * (0.55 + vBright * 1.7), a * vAlpha);
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
    g.setAttribute("aForm", new THREE.BufferAttribute(form.pos, 3));
    g.setAttribute("aPart", new THREE.BufferAttribute(form.part, 1));
    g.setAttribute("aBright", new THREE.BufferAttribute(form.bright, 1));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50); // 절대 컬링되지 않게
    return g;
  }, [count]);

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
            uForm: { value: 0 },
            uOpen: { value: 0 },
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
    materials.forEach((m, i) => {
      const u = m.uniforms;
      u.uTime.value = t;
      u.uTimeOffset.value = -i * p.trailGap;
      u.uForm.value = d.form;
      u.uOpen.value = d.open;
      u.uBurst.value = d.burst;
      u.uSize.value = p.size * (i === 0 ? 1 : 0.85);
      u.uPixelRatio.value = pr;
      // 꼬리는 점점 옅게. 실루엣이 완성되면 꼬리는 사라진다 (같은 자리에 겹쳐 밝아지는 것 방지)
      u.uAlpha.value = p.alpha * (i === 0 ? 1 : 0.4 / i) * (i === 0 ? 1 : 1 - d.form);
      u.uFlowScale.value = flowScale;
      u.uFlowSpin.value = p.flowSpin;
      u.uModel.value.copy(d.model);
      (u.uColorA.value as THREE.Color).set(p.colorA);
      (u.uColorB.value as THREE.Color).set(p.colorB);
      (u.uColorHot.value as THREE.Color).set(p.colorHot);
    });
    if (group.current) group.current.visible = d.burst < 0.999;
  });

  return (
    <group ref={group} name="particles">
      {materials.map((m, i) => (
        <points key={i} geometry={geometry} material={m} frustumCulled={false} renderOrder={2} />
      ))}
    </group>
  );
}
