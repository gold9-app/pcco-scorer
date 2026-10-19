/**
 * 유리 테트리스 — 뷰포트 전체를 우물로 쓴다.
 *
 * 4열 묶음은 I·O·J·L 네 조각으로 4×4 를 빈틈없이 채우는 배치(PACK4)와 그 좌우 반전을 번갈아 쓰고,
 * 남는 2열은 O 두 개로 채운다. 열 수 4·6·8 어디서나 "딱 맞게" 채워진다.
 * 좌표: col 왼→오, row 아래→위. 조각 순서 = 낙하 순서 (아래 조각이 먼저).
 */

export type Cell = [col: number, row: number];
export type Shape = "I" | "O" | "J" | "L";

export interface Piece {
  index: number;
  name: Shape;
  cells: Cell[];
  tint: string;
  tilt: number;
}

interface Proto {
  name: Shape;
  cells: Cell[];
}

// 4×4 완전 채움 (아래→위 낙하 가능 순서)
const PACK4: Proto[] = [
  { name: "I", cells: [[0, 0], [0, 1], [0, 2], [0, 3]] },
  { name: "O", cells: [[1, 0], [2, 0], [1, 1], [2, 1]] },
  { name: "J", cells: [[3, 0], [3, 1], [3, 2], [2, 2]] },
  { name: "L", cells: [[1, 2], [1, 3], [2, 3], [3, 3]] },
];
const MIRROR4: Proto[] = PACK4.map((p) => ({ name: p.name, cells: p.cells.map(([c, r]) => [3 - c, r] as Cell) }));
const TWO_O: Proto[] = [
  { name: "O", cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { name: "O", cells: [[0, 2], [1, 2], [0, 3], [1, 3]] },
];

/** 청량한 유리 틴트 — 아이스블루 · 민트 · 라일락 · 살구 */
export const TINTS = ["#bfe3f7", "#c6efe6", "#d8d6f5", "#ffd6be"];

/**
 * cols 열 × rows 행(4의 배수로 올림)을 채우는 조각 목록.
 * 띠(4행)마다 4열 묶음의 배치를 번갈아 반전시켜 같은 무늬가 반복되지 않게 한다.
 */
export function buildWell(cols: number, rows: number): Piece[] {
  const bands = Math.ceil(rows / 4);
  const groups4 = Math.floor(cols / 4);
  const rest = cols - groups4 * 4; // 0 또는 2 (cols 는 짝수 전제)
  const pieces: Piece[] = [];
  let idx = 0;

  for (let b = 0; b < bands; b++) {
    const r0 = b * 4;
    const slots: { x0: number; protos: Proto[] }[] = [];
    // 띠마다 2열 O 묶음의 위치를 좌/우로 바꿔 무늬를 깬다
    const restLeft = rest === 2 && b % 2 === 1;
    let x = restLeft ? 2 : 0;
    if (restLeft) slots.push({ x0: 0, protos: TWO_O });
    for (let g = 0; g < groups4; g++) {
      slots.push({ x0: x, protos: (g + b) % 2 === 0 ? PACK4 : MIRROR4 });
      x += 4;
    }
    if (rest === 2 && !restLeft) slots.push({ x0: x, protos: TWO_O });

    // 같은 띠 안에서는 낙하 순서를 섞어 좌→우로만 쌓이지 않게 한다 (각 묶음의 k번째 조각끼리 번갈아)
    const maxLen = Math.max(...slots.map((s) => s.protos.length));
    for (let k = 0; k < maxLen; k++) {
      for (const s of slots) {
        const p = s.protos[k];
        if (!p) continue;
        pieces.push({
          index: idx,
          name: p.name,
          cells: p.cells.map(([c, r]) => [c + s.x0, r + r0] as Cell),
          tint: TINTS[(idx * 7 + b) % TINTS.length],
          tilt: (idx % 2 === 0 ? 1 : -1) * (0.04 + (idx % 3) * 0.015),
        });
        idx++;
      }
    }
  }
  return pieces;
}

/** 검증 — 모든 칸이 한 번씩만 채워지는지 */
export function validateWell(cols: number, rows: number): boolean {
  const pieces = buildWell(cols, rows);
  const seen = new Set<string>();
  for (const p of pieces)
    for (const [c, r] of p.cells) {
      const k = `${c},${r}`;
      if (seen.has(k) || c < 0 || c >= cols || r < 0) return false;
      seen.add(k);
    }
  return seen.size === cols * Math.ceil(rows / 4) * 4;
}
