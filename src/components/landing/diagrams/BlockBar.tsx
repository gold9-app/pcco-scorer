/**
 * 블록 막대 — 숫자를 칸으로. 27회 → 27칸, 2,400분 → 24칸(×100분), 15개 → 15칸, 0 → 빈 칸 하나.
 * 뒤의 테트리스와 같은 언어로 "쌓인 양"을 보여준다. 섹션이 보이면 왼쪽부터 켜진다.
 */
export default function BlockBar({ cells, unit, empty = false }: { cells: number; unit?: string; empty?: boolean }) {
  const n = empty ? 1 : Math.max(1, Math.min(40, cells));
  return (
    <span className="blockbar" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={`blockbar-cell ${empty ? "blockbar-empty" : ""}`} style={{ animationDelay: `${i * 0.03}s` }} />
      ))}
      {unit && <span className="blockbar-unit">{unit}</span>}
    </span>
  );
}
