"use client";

import type { SceneControls } from "./useSceneControls";

/** 조명 — 키(그림자) · 필(반대편 부드럽게) · 림(뒤에서 윤곽) · 앰비언트 */
export default function Lights({ controls }: { controls: SceneControls }) {
  const { lights } = controls;
  return (
    <>
      <ambientLight intensity={lights.ambient} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={lights.key}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight position={[-5, 3, 2]} intensity={lights.fill} />
      <directionalLight position={[0, 4, -6]} intensity={lights.rim} />
    </>
  );
}
