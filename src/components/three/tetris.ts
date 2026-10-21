/**
 * 유리 테트리스 — 블록은 정확히 20개 (강의 19회 + 마지막 한 칸 "당신의 자리").
 *
 * 20 조각 × 4 칸 = 80 칸. 화면 비율에 맞춰 80칸 우물(20×4 · 16×5 · 10×8 · 8×10 · 4×20)을 고르고,
 * 칸 크기는 우물이 뷰포트 안에 들어오는 최대값. 아래부터 쌓여 마지막 조각이 맨 위를 "딱" 채운다.
 *
 * 좌표: col 왼→오, row 아래→위. 조각 순서 = 낙하 순서 (아래 띠가 먼저, 띠 안에서는 묶음을 번갈아).
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

/** 4×4 완전 채움 — 아래→위 낙하 가능 순서 */
const PACK4: Proto[] = [
  { name: "I", cells: [[0, 0], [0, 1], [0, 2], [0, 3]] },
  { name: "O", cells: [[1, 0], [2, 0], [1, 1], [2, 1]] },
  { name: "J", cells: [[3, 0], [3, 1], [3, 2], [2, 2]] },
  { name: "L", cells: [[1, 2], [1, 3], [2, 3], [3, 3]] },
];
const MIRROR4: Proto[] = PACK4.map((p) => ({ name: p.name, cells: p.cells.map(([c, r]) => [3 - c, r] as Cell) }));
/** 2열×4행 — O 둘 */
const TWO_O: Proto[] = [
  { name: "O", cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { name: "O", cells: [[0, 2], [1, 2], [0, 3], [1, 3]] },
];
/** 2열×2행 — O 하나 */
const ONE_O: Proto = { name: "O", cells: [[0, 0], [1, 0], [0, 1], [1, 1]] };
/** 4열×1행 — I 가로 */
const FLAT_I: Proto = { name: "I", cells: [[0, 0], [1, 0], [2, 0], [3, 0]] };

/** 블록 색 — 채도를 눌러 앞의 글을 방해하지 않게 (마지막 한 칸만 금빛) */
export const TINTS = ["#3f7fb0", "#3f9a92", "#6d66a6", "#a8705c"];

export const PIECE_COUNT = 20;
export const WELLS: [cols: number, rows: number][] = [
  [20, 4],
  [16, 5],
  [10, 8],
  [8, 10],
  [4, 20],
];

/** 뷰포트 비율(h/w)에 가장 가까운 80칸 우물 */
export function pickWell(vw: number, vh: number): [cols: number, rows: number] {
  const target = Math.log(vh / vw);
  let best = WELLS[2];
  let bestD = Infinity;
  for (const w of WELLS) {
    const d = Math.abs(Math.log(w[1] / w[0]) - target);
    if (d < bestD) {
      bestD = d;
      best = w;
    }
  }
  return best;
}

/**
 * cols × rows 를 채우는 조각 목록. rows = 4의 배수 + (0 | 1 | 2).
 * 4행 띠는 PACK4/MIRROR4 묶음(+남는 2열은 O 둘), 2행 띠는 O, 1행 띠는 I 가로 (cols 가 4의 배수일 때).
 */
export function buildWell(cols: number, rows: number): Piece[] {
  const pieces: Piece[] = [];
  let idx = 0;
  const push = (p: Proto, x0: number, r0: number, band: number) => {
    pieces.push({
      index: idx,
      name: p.name,
      cells: p.cells.map(([c, r]) => [c + x0, r + r0] as Cell),
      tint: TINTS[(idx * 7 + band) % TINTS.length],
      tilt: (idx % 2 === 0 ? 1 : -1) * (0.04 + (idx % 3) * 0.015),
    });
    idx++;
  };

  const fullBands = Math.floor(rows / 4);
  const remainder = rows - fullBands * 4;
  const groups4 = Math.floor(cols / 4);
  const rest = cols - groups4 * 4; // 0 | 2

  for (let b = 0; b < fullBands; b++) {
    const r0 = b * 4;
    const slots: { x0: number; protos: Proto[] }[] = [];
    const restLeft = rest === 2 && b % 2 === 1;
    let x = restLeft ? 2 : 0;
    if (restLeft) slots.push({ x0: 0, protos: TWO_O });
    for (let g = 0; g < groups4; g++) {
      slots.push({ x0: x, protos: (g + b) % 2 === 0 ? PACK4 : MIRROR4 });
      x += 4;
    }
    if (rest === 2 && !restLeft) slots.push({ x0: x, protos: TWO_O });
    const maxLen = Math.max(...slots.map((s) => s.protos.length));
    for (let k = 0; k < maxLen; k++) for (const s of slots) if (s.protos[k]) push(s.protos[k], s.x0, r0, b);
  }

  const r0 = fullBands * 4;
  if (remainder === 2) for (let x = 0; x < cols; x += 2) push(ONE_O, x, r0, fullBands);
  if (remainder === 1) for (let x = 0; x < cols; x += 4) push(FLAT_I, x, r0, fullBands);

  return finaleOrder(pieces, cols, rows);
}

/**
 * 피날레 순서 — 우물 한가운데에 가장 가까운 조각을 맨 마지막(당신의 자리)으로 보낸다.
 * 나머지는 아래 행부터, 같은 행이면 왼쪽부터 떨어진다. index 는 새 순서로 다시 매긴다.
 */
function finaleOrder(pieces: Piece[], cols: number, rows: number): Piece[] {
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  const centroid = (p: Piece) => {
    const c = p.cells.reduce((a, [x]) => a + x, 0) / p.cells.length;
    const r = p.cells.reduce((a, [, y]) => a + y, 0) / p.cells.length;
    return { c, r };
  };
  let last = pieces[0];
  let bestD = Infinity;
  for (const p of pieces) {
    const { c, r } = centroid(p);
    const d = Math.hypot((c - cx) / cols, (r - cy) / rows);
    if (d < bestD) {
      bestD = d;
      last = p;
    }
  }
  const rest = pieces
    .filter((p) => p !== last)
    .sort((a, b) => {
      const A = centroid(a);
      const B = centroid(b);
      return A.r - B.r || A.c - B.c;
    });
  return [...rest, last].map((p, i) => ({ ...p, index: i, tilt: (i % 2 === 0 ? 1 : -1) * (0.04 + (i % 3) * 0.015) }));
}

/** 검증 — 모든 칸이 한 번씩, 조각 수가 맞는지 */
export function validateWell(cols: number, rows: number): { ok: boolean; pieces: number; cells: number } {
  const pieces = buildWell(cols, rows);
  const seen = new Set<string>();
  let ok = true;
  for (const p of pieces)
    for (const [c, r] of p.cells) {
      const k = `${c},${r}`;
      if (seen.has(k) || c < 0 || c >= cols || r < 0 || r >= rows) ok = false;
      seen.add(k);
    }
  return { ok: ok && seen.size === cols * rows, pieces: pieces.length, cells: seen.size };
}
