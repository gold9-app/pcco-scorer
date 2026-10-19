"use client";

import { useEffect, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { LAPTOP } from "./sceneConfig";
import type { SceneControls } from "./useSceneControls";

/**
 * 핵심 오브젝트 — 유리 노트북 (Step 1: 임시 지오메트리)
 *
 * 구조:  <lift>  본체 전체. 열리면 살짝 떠오르며 기울어진다
 *          ├ base       아래판 + 키보드 면
 *          └ <hinge>    뒷모서리 피벗. rotation.x 로 뚜껑이 열린다
 *              ├ lid    윗판 (유리)
 *              └ screen 뚜껑 안쪽 면 (열리면 정면을 본다)
 *
 * Step 2 에서 GLB 로 교체할 때도 lift / hinge 그룹 구조는 그대로 두고 그 안의 mesh 만 바꾼다.
 */

interface LaptopProps {
  controls: SceneControls;
  onOpenChange?: (open: boolean) => void;
}

const deg = (d: number) => (d * Math.PI) / 180;

export default function Laptop({ controls, onOpenChange }: LaptopProps) {
  const { laptop, spring, material } = controls;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  // 첫 장면 — 닫힌 채 등장했다가 자동으로 열린다
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), LAPTOP.autoOpenDelay);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hover]);

  const lid = useSpring({
    rotX: open ? -deg(laptop.openAngle) : 0,
    config: { mass: spring.lidTension ? 1 : 1, tension: spring.lidTension, friction: spring.lidFriction },
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
      envMapIntensity={1}
    />
  );

  return (
    <a.group
      position-y={lift.posY}
      rotation-x={lift.rotX}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((v) => !v);
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
        {/* 키보드 면 — 유리 안에 비치는 어두운 판 */}
        <mesh position={[0, BT - 0.02, 0.12]} rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[W * 0.86, D * 0.56]} />
          <meshStandardMaterial color="#1a1a1f" roughness={0.9} metalness={0.1} />
        </mesh>
        {/* 트랙패드 */}
        <mesh position={[0, BT - 0.015, D * 0.33]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[W * 0.3, D * 0.2]} />
          <meshStandardMaterial color="#2a2a30" roughness={0.6} />
        </mesh>
      </group>

      {/* 뚜껑 — 뒷모서리 힌지 */}
      <a.group name="hinge" position={[0, BT, -D / 2]} rotation-x={lid.rotX}>
        <RoundedBox args={[W, LT, D]} radius={R} smoothness={4} position={[0, LT / 2, D / 2]} castShadow>
          {glass}
        </RoundedBox>
        {/* 화면 — 뚜껑 안쪽. 닫히면 아래를, 열리면 정면을 본다 */}
        <mesh name="screen" position={[0, -0.003, D / 2]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[W * 0.9, D * 0.84]} />
          <meshStandardMaterial color="#0b0b10" emissive="#f08a5d" emissiveIntensity={0.25} roughness={0.4} />
        </mesh>
      </a.group>
    </a.group>
  );
}
