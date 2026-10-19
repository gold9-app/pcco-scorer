/**
 * 3D 무대 — 조절값 기본치.
 * 개발 중엔 leva 패널(useSceneControls)이 이 값을 초기값으로 노출한다.
 * "값 고정" 단계에서 leva 를 제거하고 이 파일만 남긴다.
 */

export const CAMERA = {
  /** 카메라는 원점을 정면으로 본다 (z 축 위). 테트리스가 화면을 정확히 채우려면 정면이어야 한다 */
  distance: 7,
  fov: 30,
};

export const LAPTOP = {
  /** 열렸을 때 뚜껑 각도 (deg) */
  openAngle: 110,
  /** 휴식 자세 — 화면 아래쪽에 살짝 내려다보이게 */
  restY: -0.95,
  restTiltX: 16,
  restTiltY: -18,
  /** 화면이 뷰포트를 덮을 때 여유 배율 (1 = 딱 맞게, 1.08 = 8% 넘치게) */
  fillOverscan: 1.08,
  /** 본체 치수 */
  width: 3.0,
  depth: 2.05,
  baseThickness: 0.14,
  lidThickness: 0.09,
  cornerRadius: 0.08,
};

export const TETRIS = {
  /** 칸 크기 배율 (1 = 열 수에 맞춰 화면 너비를 정확히 채움) */
  cellScale: 1,
  /** 우물 깊이 (z). 음수 = 카메라에서 멀리 */
  depth: -1.2,
  /** 스크롤 스크럽 추종 속도 */
  follow: 7,
  /** 조각 사이 낙하 겹침 (0 = 하나 끝나고 다음, 0.6 = 꽤 겹침) */
  overlap: 0.5,
  /** 떨어질 때 기우는 정도 */
  tilt: 1,
  /** 칸 안에서 블록이 차지하는 비율 (틈) */
  gap: 0.92,
  /** 유리 */
  opacity: 0.82,
  transmission: 0.35,
  thickness: 0.4,
  roughness: 0.18,
};

export const LIGHTS = {
  ambient: 0.7,
  key: 2.2,
  fill: 0.9,
  rim: 1.4,
};

export const MATERIAL = {
  /** 노트북 유리 — three 내장 physical. Step 3 에서 MeshTransmissionMaterial 로 교체 */
  transmission: 1,
  thickness: 0.6,
  roughness: 0.12,
  ior: 1.45,
  clearcoat: 1,
};

export const RENDER = {
  dpr: [1, 1.5] as [number, number],
  shadows: true,
  envPreset: "studio" as const,
  envIntensity: 1.0,
};
