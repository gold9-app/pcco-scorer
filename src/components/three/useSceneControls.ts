"use client";

import { useControls } from "leva";
import { CAMERA, LAPTOP, TETRIS, LIGHTS, MATERIAL, RENDER } from "./sceneConfig";

/** leva 패널 — sceneConfig 기본치를 노출. 마음에 드는 값은 sceneConfig.ts 에 옮겨 적는다 */
export function useSceneControls() {
  const camera = useControls("카메라", {
    distance: { value: CAMERA.distance, min: 3, max: 14, step: 0.1 },
    fov: { value: CAMERA.fov, min: 15, max: 60, step: 1 },
  });

  const laptop = useControls("노트북", {
    openAngle: { value: LAPTOP.openAngle, min: 60, max: 150, step: 1 },
    restY: { value: LAPTOP.restY, min: -2.5, max: 1, step: 0.05 },
    restTiltX: { value: LAPTOP.restTiltX, min: -10, max: 45, step: 1 },
    restTiltY: { value: LAPTOP.restTiltY, min: -60, max: 60, step: 1 },
    fillOverscan: { value: LAPTOP.fillOverscan, min: 0.9, max: 1.4, step: 0.01 },
  });

  const tetris = useControls("테트리스", {
    cellScale: { value: TETRIS.cellScale, min: 0.6, max: 1.4, step: 0.05 },
    depth: { value: TETRIS.depth, min: -4, max: 0.5, step: 0.1 },
    follow: { value: TETRIS.follow, min: 2, max: 20, step: 0.5 },
    overlap: { value: TETRIS.overlap, min: 0, max: 1.5, step: 0.05 },
    tilt: { value: TETRIS.tilt, min: 0, max: 3, step: 0.1 },
    gap: { value: TETRIS.gap, min: 0.7, max: 1, step: 0.01 },
    opacity: { value: TETRIS.opacity, min: 0.2, max: 1, step: 0.02 },
    transmission: { value: TETRIS.transmission, min: 0, max: 1, step: 0.01 },
    thickness: { value: TETRIS.thickness, min: 0, max: 2, step: 0.05 },
    roughness: { value: TETRIS.roughness, min: 0, max: 1, step: 0.01 },
  });

  const lights = useControls("조명", {
    ambient: { value: LIGHTS.ambient, min: 0, max: 3, step: 0.05 },
    key: { value: LIGHTS.key, min: 0, max: 6, step: 0.1 },
    fill: { value: LIGHTS.fill, min: 0, max: 4, step: 0.1 },
    rim: { value: LIGHTS.rim, min: 0, max: 6, step: 0.1 },
    envIntensity: { value: RENDER.envIntensity, min: 0, max: 3, step: 0.05 },
  });

  const material = useControls("노트북 유리", {
    transmission: { value: MATERIAL.transmission, min: 0, max: 1, step: 0.01 },
    thickness: { value: MATERIAL.thickness, min: 0, max: 3, step: 0.05 },
    roughness: { value: MATERIAL.roughness, min: 0, max: 1, step: 0.01 },
    ior: { value: MATERIAL.ior, min: 1, max: 2.33, step: 0.01 },
    clearcoat: { value: MATERIAL.clearcoat, min: 0, max: 1, step: 0.05 },
  });

  return { camera, laptop, tetris, lights, material };
}

export type SceneControls = ReturnType<typeof useSceneControls>;
