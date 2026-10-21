"use client";

import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, PerspectiveCamera } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import Laptop from "./Laptop";
import Lights from "./Lights";
import TetrisWell from "./TetrisWell";
import { RENDER } from "./sceneConfig";
import { useScrollProgress } from "./useScrollProgress";
import { useSceneControls } from "./useSceneControls";

/**
 * 무대 — 페이지 뒤에 고정된 하나의 Canvas. 카메라는 원점을 정면으로 본다. 어둠 속의 빛.
 *  · 히어로 구간: 빛 입자가 흐르다 노트북 실루엣으로 모이고 → 메시지 → 스크롤에 흩어진다
 *  · 본문 구간: 발광하는 유리 테트리스가 뷰포트 전체를 아래부터 채운다
 *  · 블룸이 뜨거운 점·블록 모서리를 번지게 한다
 */
function StageContent() {
  const controls = useSceneControls();
  const scroll = useScrollProgress();
  const { camera, lights, post } = controls;

  return (
    <>
      <color attach="background" args={[RENDER.background]} />
      <PerspectiveCamera makeDefault position={[0, 0, camera.distance]} fov={camera.fov} near={0.1} far={60} />
      <Lights controls={controls} />
      {/* 환경광 — 스튜디오 조명판을 즉석에서 굽는다 (외부 요청 0). 유리 블록의 반사용 */}
      <Suspense fallback={null}>
        <Environment resolution={256} environmentIntensity={lights.envIntensity}>
          <Lightformer form="rect" intensity={1.6} color="#dff6ff" position={[0, 5, -2]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
          <Lightformer form="rect" intensity={1.0} color="#35d9c8" position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[6, 5, 1]} />
          <Lightformer form="rect" intensity={1.0} color="#4f9dff" position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[6, 5, 1]} />
        </Environment>
      </Suspense>

      <Laptop scroll={scroll} controls={controls} />
      <TetrisWell scroll={scroll} controls={controls} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={post.bloomIntensity} luminanceThreshold={post.bloomThreshold} luminanceSmoothing={0.25} radius={post.bloomRadius} mipmapBlur />
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
