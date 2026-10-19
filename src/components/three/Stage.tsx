"use client";

import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, PerspectiveCamera, PresentationControls } from "@react-three/drei";

import Laptop from "./Laptop";
import Lights from "./Lights";
import TetrisWell from "./TetrisWell";
import { RENDER } from "./sceneConfig";
import { useScrollProgress, type ScrollInfo } from "./useScrollProgress";
import { useSceneControls, type SceneControls } from "./useSceneControls";

/**
 * 무대 — 페이지 전체 뒤에 고정된 하나의 Canvas.
 *  · 노트북은 히어로 자리에 있다가 페이지와 함께 위로 스크롤되어 사라진다 (ScrollGroup)
 *  · 테트리스 우물은 카메라에 고정 — 스크롤해도 화면 아래 양옆에 붙어 있다
 */

const deg = (d: number) => (d * Math.PI) / 180;
const LOOK_AT = new THREE.Vector3(0, 0.55, 0);

function CameraRig({ controls }: { controls: SceneControls }) {
  const { camera: c } = controls;
  const el = deg(c.elevation);
  const az = deg(c.azimuth);
  const x = c.distance * Math.cos(el) * Math.sin(az);
  const y = c.distance * Math.sin(el) + LOOK_AT.y;
  const z = c.distance * Math.cos(el) * Math.cos(az);
  return (
    <PerspectiveCamera
      makeDefault
      position={[x, y, z]}
      fov={c.fov}
      near={0.1}
      far={60}
      onUpdate={(cam) => {
        cam.lookAt(LOOK_AT);
        cam.updateProjectionMatrix();
      }}
    />
  );
}

/** 페이지 스크롤만큼 위로 올라가는 그룹 — DOM 과 같은 속도로 움직여 "페이지에 붙은" 것처럼 보인다 */
function ScrollGroup({ scroll, children }: { scroll: React.RefObject<ScrollInfo>; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const upp = viewport.width / size.width;
    g.position.y = scroll.current.y * upp;
    g.visible = g.position.y < viewport.height * 1.4; // 화면 밖으로 나가면 그리지 않는다
  });
  return <group ref={ref}>{children}</group>;
}

function StageContent() {
  const controls = useSceneControls();
  const scroll = useScrollProgress();
  const { controls: rot, lights } = controls;

  return (
    <>
      <CameraRig controls={controls} />
      <Lights controls={controls} />
      <Suspense fallback={null}>
        <Environment preset={RENDER.envPreset} environmentIntensity={lights.envIntensity} />
      </Suspense>

      <ScrollGroup scroll={scroll}>
        <PresentationControls
          global={false}
          cursor={false}
          snap={rot.snap}
          speed={1.2}
          zoom={1}
          polar={[-0.25, 0.35]}
          azimuth={[-1.1, 1.1]}
          damping={rot.damping}
        >
          <Laptop controls={controls} />
        </PresentationControls>
        <ContactShadows position={[0, -0.001, 0]} opacity={0.4} scale={9} blur={2.4} far={3} resolution={1024} color="#1a2230" frames={1} />
      </ScrollGroup>

      <TetrisWell scroll={scroll} controls={controls} />
    </>
  );
}

export default function Stage() {
  return (
    <Canvas
      shadows={RENDER.shadows}
      dpr={RENDER.dpr}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: "high-performance",
      }}
      // pan-y: 세로 스와이프는 페이지 스크롤, 가로 드래그는 노트북 회전
      style={{ position: "fixed", inset: 0, zIndex: 0, touchAction: "pan-y" }}
    >
      <StageContent />
    </Canvas>
  );
}
