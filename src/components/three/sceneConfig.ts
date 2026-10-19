/**
 * 3D 히어로 씬 — 조절값 기본치.
 * 개발 중에는 leva 패널(useSceneControls)이 이 값을 초기값으로 노출한다.
 * "값 고정" 단계에서 leva 를 제거하고 이 파일의 상수만 남긴다.
 */

export const CAMERA = {
  /** 카메라-원점 거리 */
  distance: 6.4,
  /** 위에서 내려다보는 각도 (deg). 0 = 정면, 90 = 바로 위. 테트리스 기둥이 서 있게 보이려면 낮게 */
  elevation: 12,
  /** 좌우 회전 (deg) */
  azimuth: -14,
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

export const TETRIS = {
  /** 칸 크기 배율 (기본 칸은 뷰포트 여백에 맞춰 자동 계산) */
  cellScale: 1,
  /** 스크롤 스크럽을 따라가는 속도 — 클수록 즉각적 */
  follow: 7,
  /** 떨어질 때 기우는 정도 배율 */
  tilt: 1,
  /** 유리 */
  transmission: 0.95,
  thickness: 0.5,
  roughness: 0.14,
};
