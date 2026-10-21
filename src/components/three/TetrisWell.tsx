"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { buildWell, pickWell, PIECE_COUNT } from "./tetris";
import { beatProgress, type ScrollInfo } from "./useScrollProgress";
import { PARTICLES } from "./sceneConfig";
import type { SceneControls } from "./useSceneControls";

/**
 * 빛 입자 테트리스 — 블록 20개, 전부 점으로 그린다 (히어로 입자와 같은 질감).
 *   · 칸마다 정사각 윤곽(뜨겁게) + 속(옅게)을 샘플. 조각 i 의 낙하 진행도는 uProg[i]
 *   · 본문을 내리는 동안 아래부터 차례로 떨어지고, 마지막 조각은 우물 한가운데 — "당신의 자리"(금빛)
 *   · 마지막 조각이 "딱" 맞아 들어가면 → 전부 흩어진다(burst) + window 'well:complete' → 마무리 카드가 떠오른다
 *     되돌려 올리면 다시 모인다 ('well:reset')
 */

const GOLD = "#e0b87c";

const vertex = /* glsl */ `
  #define N ${PIECE_COUNT}
  uniform float uProg[N];
  uniform float uTime, uBurst, uSize, uPixelRatio, uAlpha, uStartAbove, uTiltAmt;
  attribute vec3 aRest;
  attribute vec3 aColor;
  attribute vec2 aCenter;
  attribute float aPiece;
  attribute float aBright;
  attribute float aRand;
  attribute float aTilt;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vBright;
  mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
  void main() {
    float pr = uProg[int(aPiece + 0.5)];
    float k = 1.0 - pow(1.0 - pr, 3.0);
    // 기울어진 채 떨어져 착지하며 바로 선다
    vec2 rel = rot(aTilt * uTiltAmt * (1.0 - k)) * (aRest.xy - aCenter);
    vec3 p = vec3(aCenter + rel, aRest.z);
    p.y += uStartAbove * (1.0 - k);
    // 미세한 떨림 (살아 있는 빛)
    p += 0.006 * vec3(sin(uTime * 1.7 + aRand * 9.0), cos(uTime * 1.3 + aRand * 5.0), sin(uTime * 0.9 + aRand * 3.0));
    // 피날레 — 흩어짐
    vec3 dir = normalize(vec3(aRand - 0.5, fract(aRand * 7.31) - 0.3, fract(aRand * 13.7) - 0.5));
    float b = smoothstep(0.0, 1.0, clamp((uBurst - aRand * 0.35) / 0.65, 0.0, 1.0));
    p += dir * b * (2.0 + aRand * 3.0);
    vAlpha = uAlpha * step(0.001, pr) * (1.0 - b) * (0.45 + aBright * 0.55);
    vBright = aBright;
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.6 + aBright * 0.7) * (6.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vBright;
  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.08, r);
    a *= a;
    vec3 col = mix(vColor, vec3(1.0), vBright * 0.35);
    gl_FragColor = vec4(col * (0.5 + vBright * 0.7), a * vAlpha);
  }
`;

interface Layout {
  cols: number;
  rows: number;
  cell: number;
  x0: number;
  y0: number;
  startAbove: number;
}

function useLayout(cellScale: number, depth: number): Layout {
  const { viewport, size, camera } = useThree();
  return useMemo(() => {
    const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, depth));
    const [cols, rows] = pickWell(size.width, size.height);
    const cell = Math.min(vp.width / cols, vp.height / rows) * cellScale;
    return {
      cols,
      rows,
      cell,
      x0: -(cols * cell) / 2 + cell / 2,
      y0: -vp.height / 2 + cell / 2,
      startAbove: vp.height + cell * 2,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport.width, viewport.height, size.width, size.height, cellScale, depth, camera]);
}

/** 결정적 난수 */
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

/** 우물 전체를 점으로 샘플 — 칸마다 perCell 개 (윤곽 60% · 속 40%) */
function buildGeometry(layout: Layout, gap: number, perCell: number, depth: number) {
  const { cols, rows, cell, x0, y0 } = layout;
  const pieces = buildWell(cols, rows);
  const total = pieces.reduce((a, p) => a + p.cells.length, 0) * perCell;
  const rest = new Float32Array(total * 3);
  const color = new Float32Array(total * 3);
  const center = new Float32Array(total * 2);
  const piece = new Float32Array(total);
  const bright = new Float32Array(total);
  const rand = new Float32Array(total);
  const tilt = new Float32Array(total);
  const rnd = mulberry32(80);
  const col = new THREE.Color();
  let i = 0;
  const half = (cell * gap) / 2;
  for (const p of pieces) {
    const cx = p.cells.reduce((a, [c]) => a + x0 + c * cell, 0) / p.cells.length;
    const cy = p.cells.reduce((a, [, r]) => a + y0 + r * cell, 0) / p.cells.length;
    col.set(p.index === pieces.length - 1 ? GOLD : p.tint);
    for (const [c, r] of p.cells) {
      const ccx = x0 + c * cell;
      const ccy = y0 + r * cell;
      for (let k = 0; k < perCell; k++) {
        const onEdge = rnd() < 0.6;
        let x: number;
        let y: number;
        if (onEdge) {
          const t = rnd() * 2 - 1;
          const side = Math.floor(rnd() * 4);
          x = side < 2 ? t * half : (side === 2 ? -half : half);
          y = side < 2 ? (side === 0 ? -half : half) : t * half;
        } else {
          x = (rnd() * 2 - 1) * half * 0.92;
          y = (rnd() * 2 - 1) * half * 0.92;
        }
        rest[i * 3] = ccx + x;
        rest[i * 3 + 1] = ccy + y;
        rest[i * 3 + 2] = (rnd() - 0.5) * cell * 0.25;
        color[i * 3] = col.r;
        color[i * 3 + 1] = col.g;
        color[i * 3 + 2] = col.b;
        center[i * 2] = cx;
        center[i * 2 + 1] = cy;
        piece[i] = p.index;
        bright[i] = onEdge ? 1 : 0.1;
        rand[i] = rnd();
        tilt[i] = p.tilt;
        i++;
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(total * 3), 3));
  g.setAttribute("aRest", new THREE.BufferAttribute(rest, 3));
  g.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
  g.setAttribute("aCenter", new THREE.BufferAttribute(center, 2));
  g.setAttribute("aPiece", new THREE.BufferAttribute(piece, 1));
  g.setAttribute("aBright", new THREE.BufferAttribute(bright, 1));
  g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
  g.setAttribute("aTilt", new THREE.BufferAttribute(tilt, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, depth), 50);
  return { geometry: g, count: pieces.length };
}

/** 매 프레임 uniform 쓰기 (렌더 밖의 변경 — 컴포넌트 본문에서 분리) */
function writeUniforms(
  m: THREE.ShaderMaterial,
  prog: Float32Array,
  v: { time: number; burst: number; size: number; pixelRatio: number; alpha: number; startAbove: number; tilt: number }
) {
  const u = m.uniforms;
  (u.uProg.value as Float32Array).set(prog);
  u.uTime.value = v.time;
  u.uBurst.value = v.burst;
  u.uSize.value = v.size;
  u.uPixelRatio.value = v.pixelRatio;
  u.uAlpha.value = v.alpha;
  u.uStartAbove.value = v.startAbove;
  u.uTiltAmt.value = v.tilt;
}

export default function TetrisWell({ scroll, controls }: { scroll: React.RefObject<ScrollInfo>; controls: SceneControls }) {
  const { tetris } = controls;
  const { gl, size } = useThree();
  const layout = useLayout(tetris.cellScale, tetris.depth);
  const perCell = size.width < 768 ? Math.floor(PARTICLES.perCell / 2) : PARTICLES.perCell;
  const { geometry, count } = useMemo(() => buildGeometry(layout, tetris.gap, perCell, tetris.depth), [layout, tetris.gap, perCell, tetris.depth]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uProg: { value: new Float32Array(PIECE_COUNT) },
          uTime: { value: 0 },
          uBurst: { value: 0 },
          uSize: { value: 3 },
          uPixelRatio: { value: 1 },
          uAlpha: { value: 0.6 },
          uStartAbove: { value: 5 },
          uTiltAmt: { value: 1 },
        },
      }),
    []
  );

  const prog = useRef(new Float32Array(PIECE_COUNT));
  const burst = useRef(0);
  const complete = useRef(false);

  useFrame((state, dt) => {
    const info = scroll.current;
    const pr = prog.current;
    const follow = 1 - Math.exp(-dt * tetris.follow);
    for (let i = 0; i < count; i++) {
      // 표지가 떠 있는 동안은 떨어지지 않는다
      const target = info.entered ? beatProgress(info, i, count) : 0;
      pr[i] += (target - pr[i]) * follow;
    }
    // 피날레: 마지막 조각이 들어가면 흩어진다 (되돌리면 다시 모인다)
    const done = pr[count - 1] > 0.985;
    if (done !== complete.current) {
      complete.current = done;
      window.dispatchEvent(new CustomEvent(done ? "well:complete" : "well:reset"));
    }
    burst.current += ((done ? 1 : 0) - burst.current) * (1 - Math.exp(-dt * 2.2));

    writeUniforms(material, pr, {
      time: state.clock.elapsedTime,
      burst: burst.current,
      size: tetris.size,
      pixelRatio: gl.getPixelRatio(),
      alpha: tetris.alpha,
      startAbove: layout.startAbove,
      tilt: tetris.tilt,
    });
  });

  return <points geometry={geometry} material={material} position-z={tetris.depth} frustumCulled={false} renderOrder={1} />;
}
