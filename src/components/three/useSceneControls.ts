"use client";

import { useControls } from "leva";
import { CAMERA, LAPTOP, PARTICLES, TETRIS, LIGHTS, POST } from "./sceneConfig";

/** leva 패널 — sceneConfig 기본치를 노출. 마음에 드는 값은 sceneConfig.ts 에 옮겨 적는다 */
export function useSceneControls() {
  const camera = useControls("카메라", {
    distance: { value: CAMERA.distance, min: 3, max: 14, step: 0.1 },
    fov: { value: CAMERA.fov, min: 15, max: 60, step: 1 },
  });

  const laptop = useControls("노트북", {
    openAngle: { value: LAPTOP.openAngle, min: 60, max: 150, step: 1 },
    fillW: { value: LAPTOP.fillW, min: 0.3, max: 1.2, step: 0.01 },
    fillWPortrait: { value: LAPTOP.fillWPortrait, min: 0.3, max: 1.3, step: 0.01 },
    fillH: { value: LAPTOP.fillH, min: 0.3, max: 1.2, step: 0.01 },
    restY: { value: LAPTOP.restY, min: -1.5, max: 1.5, step: 0.01 },
    restTiltX: { value: LAPTOP.restTiltX, min: -10, max: 45, step: 1 },
    restTiltY: { value: LAPTOP.restTiltY, min: -60, max: 60, step: 1 },
    formDelay: { value: LAPTOP.formDelay, min: 0, max: 3, step: 0.1 },
    formDuration: { value: LAPTOP.formDuration, min: 0.5, max: 6, step: 0.1 },
    introDelay: { value: LAPTOP.introDelay, min: 0, max: 5, step: 0.1 },
    introDuration: { value: LAPTOP.introDuration, min: 0.4, max: 4, step: 0.1 },
  });

  const particles = useControls("입자", {
    size: { value: PARTICLES.size, min: 0.5, max: 10, step: 0.1 },
    alpha: { value: PARTICLES.alpha, min: 0.05, max: 1, step: 0.01 },
    flowScale: { value: PARTICLES.flowScale, min: 0.1, max: 0.6, step: 0.01 },
    flowSpin: { value: PARTICLES.flowSpin, min: -0.3, max: 0.3, step: 0.005 },
    trailGap: { value: PARTICLES.trailGap, min: 0, max: 0.2, step: 0.005 },
    colorA: PARTICLES.colorA,
    colorB: PARTICLES.colorB,
    colorHot: PARTICLES.colorHot,
  });

  const tetris = useControls("테트리스", {
    cellScale: { value: TETRIS.cellScale, min: 0.6, max: 1.4, step: 0.05 },
    depth: { value: TETRIS.depth, min: -4, max: 0.5, step: 0.1 },
    follow: { value: TETRIS.follow, min: 2, max: 20, step: 0.5 },
    tilt: { value: TETRIS.tilt, min: 0, max: 3, step: 0.1 },
    gap: { value: TETRIS.gap, min: 0.7, max: 1, step: 0.01 },
    opacity: { value: TETRIS.opacity, min: 0.1, max: 1, step: 0.02 },
    emissive: { value: TETRIS.emissive, min: 0, max: 2, step: 0.05 },
    roughness: { value: TETRIS.roughness, min: 0, max: 1, step: 0.01 },
  });

  const lights = useControls("조명", {
    ambient: { value: LIGHTS.ambient, min: 0, max: 3, step: 0.05 },
    key: { value: LIGHTS.key, min: 0, max: 6, step: 0.1 },
    fill: { value: LIGHTS.fill, min: 0, max: 4, step: 0.1 },
    rim: { value: LIGHTS.rim, min: 0, max: 6, step: 0.1 },
    envIntensity: { value: LIGHTS.envIntensity, min: 0, max: 3, step: 0.05 },
  });

  const post = useControls("후처리", {
    bloomIntensity: { value: POST.bloomIntensity, min: 0, max: 4, step: 0.05 },
    bloomThreshold: { value: POST.bloomThreshold, min: 0, max: 1, step: 0.01 },
    bloomRadius: { value: POST.bloomRadius, min: 0, max: 1, step: 0.01 },
  });

  return { camera, laptop, particles, tetris, lights, post };
}

export type SceneControls = ReturnType<typeof useSceneControls>;
