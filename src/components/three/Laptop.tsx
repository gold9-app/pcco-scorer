"use client";

import { useEffect, useState } from "react";
import { Html, RoundedBox } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { LAPTOP } from "./sceneConfig";
import { stageStore, useStage } from "./stageStore";
import { heroContent } from "@/data/content";
import type { SceneControls } from "./useSceneControls";

/**
 * 핵심 오브젝트 — 유리 노트북 (임시 지오메트리)
 *
 *  <lift>   본체. 열리면 살짝 떠오르며 기울어진다
 *    ├ base      아래판 + 키보드·트랙패드
 *    └ <hinge>   뒷모서리 피벗. rotation.x 로 뚜껑이 열린다
 *        ├ lid     윗판 (유리)
 *        ├ screen  뚜껑 안쪽 면
 *        └ <Html>  화면 위 핵심 메시지 — 열리면 나타난다
 *
 * 닫힌 채 시작한다. 탭하면 열리고(stageStore.open), 그 순간 테트리스 첫 블록이 떨어진다.
 * Step 2 에서 GLB 로 바꿀 때도 lift / hinge 구조는 유지하고 mesh 만 교체.
 */

const deg = (d: number) => (d * Math.PI) / 180;

export default function Laptop({ controls }: { controls: SceneControls }) {
  const { laptop, spring, material } = controls;
  const { open } = useStage();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hover]);

  const lid = useSpring({
    rotX: open ? -deg(laptop.openAngle) : 0,
    config: { mass: 1, tension: spring.lidTension, friction: spring.lidFriction },
  });
  const lift = useSpring({
    posY: open ? laptop.liftHeight : 0,
    rotX: open ? deg(laptop.liftTilt) : 0,
    config: { mass: 1, tension: spring.liftTension, friction: spring.liftFriction },
  });

  const { width: W, depth: D, baseThickness: BT, lidThickness: LT, cornerRadius: R } = LAPTOP;

  const glass = (
    <meshPhysicalMaterial
      color="#ffffff"
      transmission={material.transmission}
      thickness={material.thickness}
      roughness={material.roughness}
      ior={material.ior}
      clearcoat={material.clearcoat}
      clearcoatRoughness={0.1}
    />
  );

  return (
    <a.group
      position-y={lift.posY}
      rotation-x={lift.rotX}
      onClick={(e) => {
        e.stopPropagation();
        stageStore.toggleOpen();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={() => setHover(false)}
    >
      {/* 아래판 */}
      <group name="base">
        <RoundedBox args={[W, BT, D]} radius={R} smoothness={4} position={[0, BT / 2, 0]} castShadow receiveShadow>
          {glass}
        </RoundedBox>
        <mesh position={[0, BT - 0.02, 0.12]} rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[W * 0.86, D * 0.56]} />
          <meshStandardMaterial color="#1c1d22" roughness={0.9} metalness={0.1} />
        </mesh>
        <mesh position={[0, BT - 0.015, D * 0.33]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[W * 0.3, D * 0.2]} />
          <meshStandardMaterial color="#2b2c33" roughness={0.6} />
        </mesh>
      </group>

      {/* 뚜껑 — 뒷모서리 힌지 */}
      <a.group name="hinge" position={[0, BT, -D / 2]} rotation-x={lid.rotX}>
        <RoundedBox args={[W, LT, D]} radius={R} smoothness={4} position={[0, LT / 2, D / 2]} castShadow>
          {glass}
        </RoundedBox>
        {/* 화면 — 닫히면 아래를, 열리면 정면을 본다 */}
        <mesh name="screen" position={[0, -0.003, D / 2]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[W * 0.9, D * 0.84]} />
          <meshStandardMaterial color="#f6f8fb" emissive="#ffffff" emissiveIntensity={0.35} roughness={0.35} />
        </mesh>
        {/* 핵심 메시지 — 화면 면에 붙은 HTML. 닫혀 있을 땐 뒷면이라 backface 로 숨는다 */}
        <Html
          transform
          position={[0, -0.006, D / 2]}
          rotation={[Math.PI / 2, 0, 0]}
          distanceFactor={2.2}
          style={{ pointerEvents: "none", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div
            style={{
              width: 520,
              padding: "28px 32px",
              textAlign: "center",
              color: "#141414",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(8px)",
              transition: "opacity .6s ease .35s, transform .6s ease .35s",
              fontFamily: "inherit",
            }}
          >
            <p style={{ fontSize: 13, letterSpacing: "0.22em", opacity: 0.55, marginBottom: 14 }}>
              {heroContent.title.toUpperCase()}
            </p>
            <h1 style={{ fontSize: 38, lineHeight: 1.2, fontWeight: 700, letterSpacing: "-0.01em", wordBreak: "keep-all" }}>
              {heroContent.subtitle}
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.7, marginTop: 16, wordBreak: "keep-all" }}>
              {heroContent.tagline}
            </p>
          </div>
        </Html>
      </a.group>
    </a.group>
  );
}
