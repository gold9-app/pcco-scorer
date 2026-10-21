/**
 * 성능 스위치 — 모듈 하나로 공유 (React state 아님).
 *  low : 3초 넘게 30fps 아래면 켜진다 → 입자 꼬리 끄기, 블룸 낮추기
 *  hidden : 탭이 보이지 않으면 렌더 루프를 멈춘다
 */
export const perf = { low: false };
