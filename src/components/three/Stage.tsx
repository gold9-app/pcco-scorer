"use client";

import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, PerspectiveCamera } from "@react-three/drei";

import Laptop from "./Laptop";
import Lights from "./Lights";
import TetrisWell from "./TetrisWell";
import { RENDER } from "./sceneConfig";
import { useScrollProgress } from "./useScrollProgress";
import { useSceneControls } from "./useSceneControls";

/**
 * 무대 — 페이지 뒤에 고정된 하나의 Canvas. 카메라는 원점을 정면으로 본다.
 *  · 히어로 구간: 노트북이 열리고 → 메시지 → 화면이 다가와 뷰포트를 채운다 (스크롤 연출)
 *  · 본문 구간: 유리 테트리스가 뷰포트 전체를 아래부터 채운다
 */
function StageContent() {
  const controls = useSceneControls();
  const scroll = useScrollProgress();
  const { camera, lights } = controls;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, camera.distance]} fov={camera.fov} near={0.1} far={60} />
      <Lights controls={controls} />
      {/* 환경광 — 네트워크 HDR 대신 스튜디오 조명판 4장을 즉석에서 굽는다 (외부 요청 0, 첫 프레임부터 반사) */}
      <Suspense fallback={null}>
        <Environment resolution={256} environmentIntensity={lights.envIntensity}>
          <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 5, -2]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
          <Lightformer form="rect" intensity={1.4} color="#e4f3ff" position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[6, 5, 1]} />
          <Lightformer form="rect" intensity={1.4} color="#ffffff" position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[6, 5, 1]} />
          <Lightformer form="ring" intensity={0.8} color="#bff0e6" position={[0, -5, 1]} rotation-x={-Math.PI / 2} scale={5} />
        </Environment>
      </Suspense>

      <Laptop scroll={scroll} controls={controls} />
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
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <StageContent />
    </Canvas>
  );
}
