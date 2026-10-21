"use client";

import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import Laptop from "./Laptop";
import PerfGuard from "./PerfGuard";
import TetrisWell from "./TetrisWell";
import { RENDER } from "./sceneConfig";
import { useScrollProgress } from "./useScrollProgress";
import { useSceneControls } from "./useSceneControls";

/**
 * 무대 — 페이지 뒤에 고정된 하나의 Canvas. 카메라는 원점을 정면으로 본다. 어둠 속의 빛.
 *  · 히어로 구간: 빛 입자가 흐르다 노트북 실루엣으로 모이고 → 메시지 → 스크롤에 흩어진다
 *  · 본문 구간: 입자 테트리스가 뷰포트 전체를 아래부터 채운다 → 가운데 마지막 한 칸 → 흩어지며 끝
 *  · 빛은 전부 점(additive)이고 블룸이 뜨거운 점을 번지게 한다. 조명·환경맵 없음
 */
function StageContent() {
  const controls = useSceneControls();
  const scroll = useScrollProgress();
  const { camera, post } = controls;
  // 폰은 블룸을 절반 해상도로 (뿌옇기는 거의 같고 비용은 1/4)
  const narrow = useThree((s) => s.size.width < 768);

  return (
    <>
      <PerfGuard />
      <color attach="background" args={[RENDER.background]} />
      <PerspectiveCamera makeDefault position={[0, 0, camera.distance]} fov={camera.fov} near={0.1} far={60} />

      <Laptop scroll={scroll} controls={controls} />
      <TetrisWell scroll={scroll} controls={controls} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={post.bloomIntensity} luminanceThreshold={post.bloomThreshold} luminanceSmoothing={0.25} radius={post.bloomRadius} mipmapBlur resolutionScale={narrow ? 0.5 : 1} />
      </EffectComposer>
    </>
  );
}

export default function Stage() {
  return (
    <Canvas
      dpr={RENDER.dpr}
      gl={{
        antialias: false,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: "high-performance",
      }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <StageContent />
    </Canvas>
  );
}
