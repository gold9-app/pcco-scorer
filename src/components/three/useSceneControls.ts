import { CAMERA, LAPTOP, PARTICLES, TETRIS, POST } from "./sceneConfig";

/**
 * 무대 조절값 — sceneConfig.ts 의 값을 그대로 쓴다.
 * (디자인 확정 전에는 leva 패널이 이 값을 실시간으로 바꿀 수 있었다 — 2026-10-21 "값 고정"으로 패널 제거.
 *  다시 조절하려면 sceneConfig.ts 숫자를 고치면 된다.)
 */
export function useSceneControls() {
  return { camera: CAMERA, laptop: LAPTOP, particles: PARTICLES, tetris: TETRIS, post: POST };
}

export type SceneControls = ReturnType<typeof useSceneControls>;
