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
  openAngle: 108,
  /** 크기 — 뷰포트 너비의 몇 %를 채울지, 높이 상한은 몇 % (둘 중 작은 쪽) */
  fillW: 0.84,
  fillH: 0.8,
  /** 휴식 자세 — 화면 가운데 살짝 아래, 내려다보이게 (본체 높이 기준 비율) */
  restY: -0.58,
  restTiltX: 14,
  restTiltY: -16,
  /** 등장 — 기다렸다가(초) 열리는 데 걸리는 시간(초) */
  introDelay: 0.35,
  introDuration: 1.2,
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
  /** 떨어질 때 기우는 정도 */
  tilt: 1,
  /** 칸 안에서 블록이 차지하는 비율 (틈) */
  gap: 0.92,
  /** 유리 — 투명 캔버스 위라 transmission 대신 opacity 로 뒤(페이지)를 비춘다 */
  opacity: 0.55,
  transmission: 0,
  thickness: 0.4,
  roughness: 0.08,
};

export const LIGHTS = {
  ambient: 0.8,
  key: 1.3,
  fill: 0.6,
  rim: 1.0,
};

export const MATERIAL = {
  /** 노트북 유리 — 투명 캔버스 위라 transmission 은 뿌옇게 날아간다 → opacity 로 비추고 clearcoat 로 반짝임 */
  opacity: 0.4,
  transmission: 0,
  thickness: 0.6,
  roughness: 0.06,
  ior: 1.45,
  clearcoat: 1,
};

export const RENDER = {
  dpr: [1, 1.5] as [number, number],
  shadows: true,
  /** 환경광 세기 (Stage 의 Lightformer 스튜디오) */
  envIntensity: 1.0,
};
