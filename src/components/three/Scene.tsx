"use client";

import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, PerspectiveCamera, PresentationControls } from "@react-three/drei";

import Laptop from "./Laptop";
import Lights from "./Lights";
import { RENDER } from "./sceneConfig";
import { useSceneControls, type SceneControls } from "./useSceneControls";

interface SceneProps {
  theme: "light" | "dark";
  onOpenChange?: (open: boolean) => void;
}

const deg = (d: number) => (d * Math.PI) / 180;
const LOOK_AT = new THREE.Vector3(0, 0.55, 0);

/** leva 값으로 카메라 위치를 구면좌표에서 계산. onUpdate 는 props 가 바뀔 때마다 R3F 가 호출한다 */
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
      far={50}
      onUpdate={(cam) => {
        cam.lookAt(LOOK_AT);
        cam.updateProjectionMatrix();
      }}
    />
  );
}

function SceneContent({ theme, onOpenChange }: SceneProps) {
  const controls = useSceneControls();
  const { controls: rot, lights } = controls;

  return (
    <>
      <CameraRig controls={controls} />
      <Lights controls={controls} />

      <Suspense fallback={null}>
        {/* 환경맵 — 유리 반사의 재료. public/hdr/*.hdr 이 생기면 files 로 교체 */}
        <Environment preset={RENDER.envPreset} environmentIntensity={lights.envIntensity} />
      </Suspense>

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
        <Laptop controls={controls} onOpenChange={onOpenChange} />
      </PresentationControls>

      <ContactShadows
        position={[0, -0.001, 0]}
        opacity={theme === "light" ? 0.45 : 0.6}
        scale={9}
        blur={2.4}
        far={3}
        resolution={1024}
        color={theme === "light" ? "#1a1a2e" : "#000000"}
        frames={1}
      />
    </>
  );
}

export default function Scene(props: SceneProps) {
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
      // pan-y: 모바일에서 세로 스와이프는 페이지 스크롤, 가로 드래그는 회전 (히어로가 100vh 라 세로 스크롤을 막으면 안 됨)
      style={{ position: "absolute", inset: 0, touchAction: "pan-y" }}
    >
      <SceneContent {...props} />
    </Canvas>
  );
}
