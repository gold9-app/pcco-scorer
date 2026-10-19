"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";

import { LAPTOP } from "./sceneConfig";
import { smoothstep, type ScrollInfo } from "./useScrollProgress";
import { heroContent } from "@/data/content";
import type { SceneControls } from "./useSceneControls";

/**
 * 유리 노트북
 *   페이지가 열리면   닫힌 채 등장 → 0.6초 뒤 스스로 열리고 → 화면에 핵심 메시지. 그대로 멈춰 있다 (읽는 시간)
 *   스크롤 (hero 0→1)  0.0~0.55 뚜껑이 닫힌다 · 메시지는 0.0~0.25 사이에 사라진다
 *                      0.45~1.0 닫힌 노트북이 위로 빠져나간다 → 본문(강의 블록) 시작
 *
 * 구조:  <root> 위치·축소(뷰포트 폭)·패럴랙스
 *          ├ base
 *          └ <hinge> rotation.x = 열림각
 *              ├ lid · screen · <Html> 메시지
 */

const deg = (d: number) => (d * Math.PI) / 180;
const PAGE_BG = "#eef3f7";

interface Props {
  scroll: React.RefObject<ScrollInfo>;
  controls: SceneControls;
}

export default function Laptop({ scroll, controls }: Props) {
  const { laptop, material } = controls;
  const root = useRef<THREE.Group>(null);
  const hinge = useRef<THREE.Group>(null);
  const msg = useRef<HTMLDivElement>(null);
  const hs = useRef(0); // 부드럽게 따라가는 hero 진행도
  const intro = useRef(-laptop.introDelay); // 등장 타이머 (초). 0 이 되면 열리기 시작
  const { viewport } = useThree();

  const { width: W, depth: D, baseThickness: BT, lidThickness: LT, cornerRadius: R } = LAPTOP;
  const euler = useMemo(() => new THREE.Euler(), []);

  useFrame((_, dt) => {
    const g = root.current;
    const hg = hinge.current;
    if (!g || !hg) return;
    const info = scroll.current;

    hs.current += (info.hero - hs.current) * (1 - Math.exp(-dt * 7));
    const h = hs.current;

    // 등장: 0.6초 기다렸다가 1.4초에 걸쳐 열린다 (ease-out)
    intro.current = Math.min(1, intro.current + dt / laptop.introDuration);
    const introT = Math.max(0, intro.current);
    const openIntro = 1 - Math.pow(1 - introT, 3);

    // 뚜껑: 등장으로 열리고, 스크롤로 닫힌다
    const closeT = smoothstep(h, 0.0, 0.55);
    hg.rotation.x = -deg(laptop.openAngle) * openIntro * (1 - closeT);

    // 메시지: 뚜껑이 거의 다 열리면 나타나고, 스크롤 시작과 함께 먼저 사라진다
    if (msg.current) {
      const show = smoothstep(introT, 0.55, 0.95) * (1 - smoothstep(h, 0.0, 0.25));
      msg.current.style.opacity = show.toFixed(3);
      msg.current.style.transform = `translateY(${(1 - show) * 10}px)`;
      const aspect = viewport.width / viewport.height;
      msg.current.style.width = `${Math.round(560 * Math.min(1, aspect * 1.5))}px`;
    }

    // 자세: 뷰포트 폭에 맞춰 축소, 포인터 패럴랙스, 스크롤 후반에 위로 빠져나감
    const k = THREE.MathUtils.clamp(viewport.width / (W * 1.25), 0.38, 1);
    const exitT = smoothstep(h, 0.45, 1);
    g.scale.setScalar(k * (1 - 0.25 * exitT));
    g.position.set(0, laptop.restY * k + exitT * (viewport.height * 0.9), 0);
    euler.set(
      deg(laptop.restTiltX) + info.pointer.y * 0.03 + exitT * deg(18),
      deg(laptop.restTiltY) + info.pointer.x * 0.05,
      0
    );
    g.quaternion.setFromEuler(euler);
    g.visible = h < 0.995;
  });

  const glass = (
    <meshPhysicalMaterial
      color="#dff0fb"
      transparent
      opacity={material.opacity}
      roughness={material.roughness}
      ior={material.ior}
      clearcoat={material.clearcoat}
      clearcoatRoughness={0.08}
      envMapIntensity={1.2}
    />
  );

  return (
    <group ref={root}>
      <group name="base">
        <RoundedBox args={[W, BT, D]} radius={R} smoothness={4} position={[0, BT / 2, 0]} castShadow receiveShadow>
          {glass}
        </RoundedBox>
        <mesh position={[0, BT - 0.02, 0.12]} rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[W * 0.86, D * 0.56]} />
          <meshStandardMaterial color="#1b2430" roughness={0.9} metalness={0.1} />
        </mesh>
        <mesh position={[0, BT - 0.015, D * 0.33]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[W * 0.3, D * 0.2]} />
          <meshStandardMaterial color="#2a3542" roughness={0.6} />
        </mesh>
      </group>

      <group ref={hinge} name="hinge" position={[0, BT, -D / 2]}>
        <RoundedBox args={[W, LT, D]} radius={R} smoothness={4} position={[0, LT / 2, D / 2]} castShadow>
          {glass}
        </RoundedBox>
        <mesh name="screen" position={[0, -0.003, D / 2]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[W * 0.9, D * 0.84]} />
          <meshStandardMaterial color={PAGE_BG} emissive={PAGE_BG} emissiveIntensity={0.55} roughness={0.5} />
        </mesh>
        <Html
          transform
          position={[0, -0.006, D / 2]}
          rotation={[Math.PI / 2, 0, 0]}
          distanceFactor={2.2}
          style={{ pointerEvents: "none", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div ref={msg} style={{ width: 560, padding: "28px 36px", color: "#0f1720", opacity: 0, fontFamily: "inherit" }}>
            <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.55, marginBottom: 12 }}>{heroContent.title}</p>
            <h1 style={{ fontSize: 40, lineHeight: 1.18, fontWeight: 800, letterSpacing: "-0.02em", wordBreak: "keep-all", maxWidth: 480 }}>
              {heroContent.subtitle}
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.72, marginTop: 18, wordBreak: "keep-all", maxWidth: 440 }}>
              {heroContent.tagline}
            </p>
          </div>
        </Html>
      </group>
    </group>
  );
}
