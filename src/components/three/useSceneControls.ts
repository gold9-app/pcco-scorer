"use client";

import { useControls, folder } from "leva";
import { CAMERA, SPRING, LAPTOP, CONTROLS, LIGHTS, MATERIAL, RENDER } from "./sceneConfig";

/**
 * leva 패널 — sceneConfig 의 기본치를 초기값으로 노출.
 * 패널에서 만진 값은 저장되지 않는다. 마음에 드는 값은 sceneConfig.ts 에 옮겨 적을 것.
 */
export function useSceneControls() {
  const camera = useControls("카메라", {
    distance: { value: CAMERA.distance, min: 3, max: 12, step: 0.1 },
    elevation: { value: CAMERA.elevation, min: -10, max: 80, step: 1 },
    azimuth: { value: CAMERA.azimuth, min: -90, max: 90, step: 1 },
    fov: { value: CAMERA.fov, min: 15, max: 60, step: 1 },
  });

  const laptop = useControls("노트북", {
    openAngle: { value: LAPTOP.openAngle, min: 0, max: 150, step: 1 },
    liftHeight: { value: LAPTOP.liftHeight, min: 0, max: 0.6, step: 0.01 },
    liftTilt: { value: LAPTOP.liftTilt, min: -20, max: 20, step: 0.5 },
  });

  const spring = useControls("스프링", {
    뚜껑: folder({
      lidTension: { value: SPRING.lid.tension, min: 20, max: 400, step: 5 },
      lidFriction: { value: SPRING.lid.friction, min: 5, max: 80, step: 1 },
    }),
    떠오름: folder({
      liftTension: { value: SPRING.lift.tension, min: 20, max: 400, step: 5 },
      liftFriction: { value: SPRING.lift.friction, min: 5, max: 80, step: 1 },
    }),
  });

  const controls = useControls("드래그 회전", {
    damping: { value: CONTROLS.damping, min: 0.02, max: 0.6, step: 0.01 },
    snap: CONTROLS.snap,
  });

  const lights = useControls("조명", {
    ambient: { value: LIGHTS.ambient, min: 0, max: 3, step: 0.05 },
    key: { value: LIGHTS.key, min: 0, max: 6, step: 0.1 },
    fill: { value: LIGHTS.fill, min: 0, max: 4, step: 0.1 },
    rim: { value: LIGHTS.rim, min: 0, max: 6, step: 0.1 },
    envIntensity: { value: RENDER.envIntensity, min: 0, max: 3, step: 0.05 },
  });

  const material = useControls("재질 (임시 유리)", {
    transmission: { value: MATERIAL.transmission, min: 0, max: 1, step: 0.01 },
    thickness: { value: MATERIAL.thickness, min: 0, max: 3, step: 0.05 },
    roughness: { value: MATERIAL.roughness, min: 0, max: 1, step: 0.01 },
    ior: { value: MATERIAL.ior, min: 1, max: 2.33, step: 0.01 },
    clearcoat: { value: MATERIAL.clearcoat, min: 0, max: 1, step: 0.05 },
  });

  return { camera, laptop, spring, controls, lights, material };
}

export type SceneControls = ReturnType<typeof useSceneControls>;
