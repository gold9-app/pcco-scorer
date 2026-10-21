"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";

import { LAPTOP } from "./sceneConfig";
import { smoothstep, type ScrollInfo } from "./useScrollProgress";
import { screenOverlay } from "./ScreenMessage";
import type { SceneControls } from "./useSceneControls";

/**
 * 유리 노트북
 *   페이지가 열리면   닫힌 채 등장 → 잠깐 뒤 스스로 열리고 → 화면에 핵심 메시지. 그대로 멈춰 있다 (읽는 시간)
 *   스크롤 (hero 0→1)  0.0~0.55 뚜껑이 닫힌다 · 메시지는 0.0~0.25 사이에 사라진다
 *                      0.45~1.0 닫힌 노트북이 위로 빠져나간다 → 본문(강의 블록) 시작
 *
 * 구조:  <root> 위치·크기(뷰포트의 fillW/fillH)·패럴랙스
 *          ├ base   유리 셸 · 서리 낀 속판 · 키보드 우물 + 키 70개(instanced) · 트랙패드 · 스피커 · 포트 · 접지 그림자
 *          ├ hinge-bar  뒤쪽 힌지 원통
 *          └ <hinge> rotation.x = 열림각
 *              ├ lid   유리 셸 · 베젤 · 화면 · 카메라 · 뒷면 엠블럼
 *              └ <anchor> 메시지 DOM 의 기준점 — ScreenMessage 가 이 자세를 따라 그린다
 */

const deg = (d: number) => (d * Math.PI) / 180;
const SCREEN_BG = "#f4f8fb";
const DARK = "#141c26";
const DARK_2 = "#273442";

interface Props {
  scroll: React.RefObject<ScrollInfo>;
  controls: SceneControls;
}

const { width: W, depth: D, baseThickness: BT, lidThickness: LT, cornerRadius: R } = LAPTOP;

/** 키보드 — 5줄 × 14칸 + 스페이스바. 한 번에 그린다 (instancedMesh) */
const KEY_ROWS = 5;
const KEY_COLS = 14;
const KB_W = W * 0.8;
const KB_D = D * 0.42;
const KB_Z = -0.17;

function buildKeys() {
  const pitchX = KB_W / KEY_COLS;
  const pitchZ = KB_D / KEY_ROWS;
  const keys: { x: number; z: number; w: number; d: number }[] = [];
  const kw = pitchX * 0.8;
  const kd = pitchZ * 0.74;
  for (let r = 0; r < KEY_ROWS; r++) {
    const z = KB_Z - KB_D / 2 + pitchZ * (r + 0.5);
    if (r === KEY_ROWS - 1) {
      // 마지막 줄: 양 끝 3칸씩 + 가운데 스페이스바
      for (let c = 0; c < 3; c++) keys.push({ x: -KB_W / 2 + pitchX * (c + 0.5), z, w: kw, d: kd });
      for (let c = KEY_COLS - 3; c < KEY_COLS; c++) keys.push({ x: -KB_W / 2 + pitchX * (c + 0.5), z, w: kw, d: kd });
      keys.push({ x: 0, z, w: pitchX * 8 - (pitchX - kw), d: kd });
      continue;
    }
    for (let c = 0; c < KEY_COLS; c++) keys.push({ x: -KB_W / 2 + pitchX * (c + 0.5), z, w: kw, d: kd });
  }
  return keys;
}

function Keys() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const keys = useMemo(() => buildKeys(), []);
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    const o = new THREE.Object3D();
    keys.forEach((k, i) => {
      o.position.set(k.x, BT + 0.014, k.z);
      o.scale.set(k.w, 0.022, k.d);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  }, [keys]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, keys.length]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={DARK} roughness={0.55} metalness={0.05} />
    </instancedMesh>
  );
}

export default function Laptop({ scroll, controls }: Props) {
  const { laptop, material } = controls;
  const root = useRef<THREE.Group>(null);
  const hinge = useRef<THREE.Group>(null);
  const anchor = useRef<THREE.Group>(null);
  const hs = useRef(0); // 부드럽게 따라가는 hero 진행도
  const intro = useRef(-laptop.introDelay); // 등장 타이머 (초). 0 이 되면 열리기 시작
  const { viewport, size, camera } = useThree();

  const euler = useMemo(() => new THREE.Euler(), []);

  useFrame((_, dt) => {
    const g = root.current;
    const hg = hinge.current;
    if (!g || !hg) return;
    const info = scroll.current;

    hs.current += (info.hero - hs.current) * (1 - Math.exp(-dt * 7));
    const h = hs.current;

    // 등장: 잠깐 기다렸다가 열린다 (ease-out)
    intro.current = Math.min(1, intro.current + dt / laptop.introDuration);
    const introT = Math.max(0, intro.current);
    const openIntro = 1 - Math.pow(1 - introT, 3);

    // 뚜껑: 등장으로 열리고, 스크롤로 닫힌다
    const closeT = smoothstep(h, 0.0, 0.55);
    hg.rotation.x = -deg(laptop.openAngle) * openIntro * (1 - closeT);

    // 크기: 뷰포트 너비의 fillW(세로 화면은 fillWPortrait), 단 높이는 fillH 를 넘지 않게 (열린 뚜껑 높이 ≈ D)
    const portrait = viewport.width < viewport.height;
    const fw = portrait ? laptop.fillWPortrait : laptop.fillW;
    const k = Math.min((viewport.width * fw) / W, (viewport.height * laptop.fillH) / (D * 1.05));
    const exitT = smoothstep(h, 0.45, 1);
    g.scale.setScalar(k * (1 - 0.25 * exitT));
    // 열린 실루엣(높이 ≈ D·k)의 가운데가 화면 가운데 오도록 내린 뒤 restY 만큼 보정
    g.position.set(0, -D * k * 0.5 + laptop.restY + exitT * (viewport.height * 0.95), 0);
    euler.set(
      deg(laptop.restTiltX) + info.pointer.y * 0.03 + exitT * deg(18),
      deg(laptop.restTiltY) + info.pointer.x * 0.05,
      0
    );
    g.quaternion.setFromEuler(euler);
    g.visible = h < 0.995;

    // 메시지: 뚜껑이 거의 다 열리면 나타나고, 스크롤 시작과 함께 먼저 사라진다. 자세가 확정된 뒤 행렬을 갱신해 DOM 에 넘긴다
    if (anchor.current) {
      g.updateMatrixWorld(true);
      const show = smoothstep(introT, 0.55, 0.95) * (1 - smoothstep(h, 0.0, 0.25));
      screenOverlay.update(camera, anchor.current, size, { show, width: 480, distanceFactor: 2.2 });
    }
  });

  const glass = (
    <meshPhysicalMaterial
      color="#d6ebf8"
      transparent
      opacity={material.opacity}
      roughness={material.roughness}
      ior={material.ior}
      clearcoat={material.clearcoat}
      clearcoatRoughness={0.06}
      envMapIntensity={1.4}
    />
  );
  const frost = <meshPhysicalMaterial color="#ffffff" transparent opacity={0.55} roughness={0.4} clearcoat={0.3} depthWrite={false} />;

  return (
    <group ref={root}>
      {/* ── 본체 ───────────────────────────────── */}
      <group name="base">
        <RoundedBox args={[W, BT, D]} radius={R} smoothness={4} position={[0, BT / 2, 0]} castShadow receiveShadow>
          {glass}
        </RoundedBox>
        {/* 서리 낀 속판 — 유리 셸 안에 두께감 */}
        <RoundedBox args={[W * 0.96, BT * 0.5, D * 0.96]} radius={R * 0.7} smoothness={3} position={[0, BT * 0.5, 0]}>
          {frost}
        </RoundedBox>

        {/* 키보드 우물 + 키 */}
        <mesh position={[0, BT + 0.002, KB_Z]} rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[KB_W * 1.03, KB_D * 1.08]} />
          <meshStandardMaterial color={DARK_2} roughness={0.85} metalness={0.1} />
        </mesh>
        <Keys />

        {/* 스피커 그릴 — 키보드 양옆 */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * (W * 0.455), BT + 0.002, KB_Z]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[0.14, KB_D * 1.08]} />
            <meshStandardMaterial color={DARK_2} roughness={0.9} transparent opacity={0.85} />
          </mesh>
        ))}

        {/* 트랙패드 — 얇은 테두리 + 판 */}
        <mesh position={[0, BT + 0.0015, D * 0.31]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[W * 0.34, D * 0.23]} />
          <meshStandardMaterial color="#5b6a7a" roughness={0.5} />
        </mesh>
        <mesh position={[0, BT + 0.003, D * 0.31]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[W * 0.34 - 0.012, D * 0.23 - 0.012]} />
          <meshStandardMaterial color="#3a4858" roughness={0.35} metalness={0.15} />
        </mesh>

        {/* 왼쪽 옆면 포트 3개 */}
        {[-0.5, -0.32, -0.14].map((z) => (
          <mesh key={z} position={[-W / 2 + 0.004, BT * 0.5, z]}>
            <boxGeometry args={[0.012, 0.03, 0.09]} />
            <meshStandardMaterial color={DARK} roughness={0.6} />
          </mesh>
        ))}

        {/* 접지 그림자 — 투명 캔버스 위에서 바닥에 붙은 느낌 */}
        <ContactShadows position={[0, -0.002, 0.1]} scale={[W * 1.7, D * 1.9]} blur={2.6} opacity={0.26} far={1.4} resolution={512} frames={Infinity} />
      </group>

      {/* 힌지 원통 */}
      <mesh position={[0, BT, -D / 2 + 0.02]} rotation-z={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.045, 0.045, W * 0.88, 24]} />
        <meshStandardMaterial color="#c9d6e2" roughness={0.28} metalness={0.7} />
      </mesh>

      {/* ── 뚜껑 ───────────────────────────────── */}
      <group ref={hinge} name="hinge" position={[0, BT, -D / 2]}>
        <RoundedBox args={[W, LT, D]} radius={R} smoothness={4} position={[0, LT / 2, D / 2]} castShadow>
          {glass}
        </RoundedBox>
        {/* 베젤 (안쪽, -y 면) */}
        <mesh position={[0, -0.003, D / 2]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[W * 0.95, D * 0.92]} />
          <meshStandardMaterial color={DARK} roughness={0.5} />
        </mesh>
        {/* 화면 */}
        <mesh name="screen" position={[0, -0.006, D / 2 + 0.01]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[W * 0.9, D * 0.84]} />
          <meshStandardMaterial color={SCREEN_BG} emissive={SCREEN_BG} emissiveIntensity={0.6} roughness={0.5} />
        </mesh>
        {/* 카메라 — 화면 위쪽(힌지 반대편) */}
        <mesh position={[0, -0.008, D - 0.035]} rotation-x={Math.PI / 2}>
          <circleGeometry args={[0.012, 16]} />
          <meshStandardMaterial color="#0b1118" roughness={0.2} />
        </mesh>
        {/* 뒷면 엠블럼 — 닫혀 있을 때·뒤에서 보일 때 */}
        <mesh position={[0, LT + 0.003, D / 2]} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[0.11, 0.17, 48]} />
          <meshStandardMaterial color="#0e8c94" emissive="#0e8c94" emissiveIntensity={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, LT + 0.003, D / 2]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[0.07, 32]} />
          <meshStandardMaterial color="#0e8c94" emissive="#0e8c94" emissiveIntensity={0.5} roughness={0.3} />
        </mesh>
        {/* 메시지 DOM 기준점 (화면 면 위) */}
        <group ref={anchor} name="screen-anchor" position={[0, -0.01, D / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
    </group>
  );
}
