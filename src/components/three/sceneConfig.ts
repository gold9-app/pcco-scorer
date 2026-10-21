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
  /** 크기 — 뷰포트 너비의 몇 %를 채울지 (가로/세로 화면 따로), 높이 상한은 몇 % (둘 중 작은 쪽) */
  fillW: 0.62,
  fillWPortrait: 0.8,
  fillH: 0.6,
  /** 휴식 자세 — 열린 실루엣을 가운데 맞춘 뒤 더하는 오프셋 (월드 단위) */
  restY: 0.12,
  restTiltX: 14,
  restTiltY: -16,
  /** 등장 타임라인(초) — 흐름 → "G9" 모임 → 머묾 → 흩어졌다 노트북 → 뚜껑 열림 (각 단계 길이) */
  textDelay: 0.3,
  textDuration: 1.5,
  textHold: 1.4,
  morphDuration: 1.9,
  /** 뚜껑은 노트북이 이 비율만큼 모였을 때부터 열리기 시작 */
  openAt: 0.7,
  introDuration: 1.2,
  /** 본체 치수 (입자 실루엣의 기준) */
  width: 3.0,
  depth: 2.05,
  baseThickness: 0.14,
  lidThickness: 0.09,
  cornerRadius: 0.08,
};

export const PARTICLES = {
  /** 입자 수 (폰은 절반) */
  count: 36000,
  /** 인트로 로고 (public/ 경로) · 크기(뷰포트 너비 대비 반폭, 세로 화면은 ×1.9) · 로고 두 색 (G 와 9) */
  logo: "/g9-logo.png",
  textScale: 0.2,
  logoCool: "#cfe0ff",
  logoWarm: "#f0c892",
  /** 테트리스 — 칸당 점 수 (폰은 절반) */
  perCell: 220,
  /** 점 크기 (px, dpr 1 기준) */
  size: 3.2,
  /** 전체 밝기 */
  alpha: 0.55,
  /** 흐름 상태 — 어트랙터 크기(뷰포트 긴 변 대비) · 회전 속도 */
  flowScale: 0.27,
  flowSpin: 0.05,
  /** 빛 꼬리 — 시간차 복제 수(0 = 없음) · 간격(초) */
  trailSteps: 3,
  trailGap: 0.045,
  /** 색 — 차가운 둘 + 뜨거운 하이라이트 */
  colorA: "#2fd4c4",
  colorB: "#4f9dff",
  colorHot: "#ffffff",
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
  gap: 0.9,
  /** 입자 블록 — 점 크기 · 밝기 (앞의 카드가 주인공 — 뒤는 은은하게) */
  size: 3.0,
  alpha: 0.38,
};

export const POST = {
  bloomIntensity: 1.1,
  bloomThreshold: 0.55,
  bloomRadius: 0.7,
};

export const RENDER = {
  dpr: [1, 1.5] as [number, number],
  background: "#070a0f",
};
