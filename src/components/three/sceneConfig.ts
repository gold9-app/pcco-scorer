/**
 * 3D 히어로 씬 — 조절값 기본치.
 * 개발 중에는 leva 패널(useSceneControls)이 이 값을 초기값으로 노출한다.
 * "값 고정" 단계에서 leva 를 제거하고 이 파일의 상수만 남긴다.
 */

export const CAMERA = {
  /** 카메라-원점 거리 */
  distance: 6.2,
  /** 위에서 내려다보는 각도 (deg). 0 = 정면, 90 = 바로 위 */
  elevation: 18,
  /** 좌우 회전 (deg) */
  azimuth: -22,
  fov: 32,
};

export const SPRING = {
  /** 뚜껑 열림/닫힘 스프링 */
  lid: { mass: 1, tension: 120, friction: 22 },
  /** 탭 시 살짝 떠오름 */
  lift: { mass: 1, tension: 170, friction: 20 },
};

export const LAPTOP = {
  /** 열렸을 때 뚜껑 각도 (deg). 0 = 닫힘 */
  openAngle: 112,
  /** 열렸을 때 본체가 떠오르는 높이 */
  liftHeight: 0.18,
  /** 열렸을 때 본체 기울기 (deg, x축) */
  liftTilt: -4,
  /** 페이지 로드 후 자동으로 열리기까지 지연 (ms) */
  autoOpenDelay: 900,
  /** 본체 치수 */
  width: 3.0,
  depth: 2.05,
  baseThickness: 0.14,
  lidThickness: 0.09,
  cornerRadius: 0.08,
};

export const CONTROLS = {
  /** 드래그 회전 감쇠 — 작을수록 빨리 멈춤 (drei PresentationControls damping) */
  damping: 0.2,
  /** 상하 회전 한계 (rad) */
  polar: [-0.25, 0.35] as [number, number],
  /** 좌우 회전 한계 (rad) */
  azimuth: [-1.1, 1.1] as [number, number],
  /** 놓으면 정면으로 복귀 */
  snap: true,
};

export const LIGHTS = {
  ambient: 0.6,
  key: 2.4,
  fill: 0.9,
  rim: 1.6,
};

export const MATERIAL = {
  /** Step 1 임시 유리 — three 내장 physical material. Step 3 에서 MeshTransmissionMaterial 로 교체 */
  transmission: 1,
  thickness: 0.6,
  roughness: 0.12,
  ior: 1.45,
  clearcoat: 1,
  opacity: 1,
};

export const RENDER = {
  dpr: [1, 1.5] as [number, number],
  shadows: true,
  /** drei Environment preset — 로컬 HDR 이 생기면 files 로 교체 */
  envPreset: "studio" as const,
  envIntensity: 1.0,
};
