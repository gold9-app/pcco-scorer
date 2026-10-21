"use client";

import type { SceneControls } from "./useSceneControls";

/** 조명 — 유리 블록용. 키(위에서) · 필(반대편 부드럽게) · 림(뒤에서 윤곽, 틸) · 앰비언트 */
export default function Lights({ controls }: { controls: SceneControls }) {
  const { lights } = controls;
  return (
    <>
      <ambientLight intensity={lights.ambient} />
      <directionalLight position={[4, 6, 3]} intensity={lights.key} />
      <directionalLight position={[-5, 3, 2]} intensity={lights.fill} color="#4f9dff" />
      <directionalLight position={[0, 4, -6]} intensity={lights.rim} color="#35d9c8" />
    </>
  );
}
