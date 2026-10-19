/**
 * 유리 테트리스 — 블록 정의와 "딱 맞는" 배치
 *
 * 무대 양옆에 4×4 우물이 하나씩. 블록 8개(히어로 1 + 섹션 7)가 왼쪽·오른쪽으로 번갈아 떨어져
 * 마지막 CTA 에서 양쪽 다 빈칸 없이 꽉 찬다 — 핵심 메시지 "철저하게 내 것으로(딱 맞게)" 의 시각적 증명.
 *
 * 좌표: col 0~3 (왼→오), row 0~3 (아래→위). 각 블록은 아래 블록·바닥 위에 놓이는 순서로 떨어진다.
 */

export type Side = "left" | "right";
export type Cell = [col: number, row: number];

export interface Piece {
  /** 낙하 순서 (0 = 노트북 열릴 때) */
  index: number;
  side: Side;
  /** 테트로미노 이름 — 색·설명용 */
  name: "I" | "O" | "J" | "L";
  cells: Cell[];
  /** 유리 틴트 (청량한 아이스 톤) */
  tint: string;
  /** 떨어질 때 살짝 기우는 방향 */
  tilt: number;
}

// 왼쪽 4×4 — I(세로) · O · J · L 로 완벽 채움
const LEFT: Omit<Piece, "index" | "side">[] = [
  { name: "I", cells: [[0, 0], [0, 1], [0, 2], [0, 3]], tint: "#bfe9ff", tilt: 0.06 },
  { name: "O", cells: [[1, 0], [2, 0], [1, 1], [2, 1]], tint: "#c9f2ea", tilt: -0.05 },
  { name: "J", cells: [[3, 0], [3, 1], [3, 2], [2, 2]], tint: "#d9d4ff", tilt: 0.05 },
  { name: "L", cells: [[1, 2], [1, 3], [2, 3], [3, 3]], tint: "#ffd9c2", tilt: -0.04 },
];

// 오른쪽 = 왼쪽을 좌우 반전 (col → 3 - col)
const RIGHT = LEFT.map((p) => ({
  ...p,
  cells: p.cells.map(([c, r]) => [3 - c, r] as Cell),
  tilt: -p.tilt,
}));

/** 낙하 순서대로: L I → R I → L O → R O → L J → R J → L L → R L */
export const PIECES: Piece[] = LEFT.flatMap((l, i) => [
  { ...l, index: i * 2, side: "left" as const },
  { ...RIGHT[i], index: i * 2 + 1, side: "right" as const },
]);

export const WELL_COLS = 4;
export const WELL_ROWS = 4;
export const PIECE_COUNT = PIECES.length; // 8

/** 배치 검증 — 16칸이 빠짐·겹침 없이 채워지는지 (개발 중 콘솔 확인용) */
export function validatePacking(side: Side): boolean {
  const seen = new Set<string>();
  for (const p of PIECES.filter((p) => p.side === side)) {
    for (const [c, r] of p.cells) {
      const k = `${c},${r}`;
      if (seen.has(k) || c < 0 || c >= WELL_COLS || r < 0 || r >= WELL_ROWS) return false;
      seen.add(k);
    }
  }
  return seen.size === WELL_COLS * WELL_ROWS;
}
