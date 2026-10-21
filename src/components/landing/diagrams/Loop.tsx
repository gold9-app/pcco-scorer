/**
 * 루프 — 공식 → 실행 → 고치기 → (다시). 가운데 "두 번째 실행에서 는다".
 * 원 위에 점 3개, 화살표는 선이 그려지는 모션.
 */
export default function Loop({ nodes, center }: { nodes: string[]; center: string }) {
  const S = 320;
  const c = S / 2;
  const r = 112;
  const pts = nodes.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length;
    return { x: c + r * Math.cos(a), y: c + r * Math.sin(a), a };
  });
  const arc = (i: number) => {
    const a0 = pts[i].a + 0.42;
    const a1 = pts[(i + 1) % nodes.length].a - 0.42;
    const p0 = { x: c + r * Math.cos(a0), y: c + r * Math.sin(a0) };
    const p1 = { x: c + r * Math.cos(a1), y: c + r * Math.sin(a1) };
    return `M ${p0.x} ${p0.y} A ${r} ${r} 0 0 1 ${p1.x} ${p1.y}`;
  };
  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="loop w-full max-w-[340px] h-auto mx-auto" role="img" aria-label={`${nodes.join(" → ")} — ${center}`}>
      <defs>
        <marker id="loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
        </marker>
      </defs>
      {nodes.map((_, i) => (
        <path key={i} d={arc(i)} className="loop-arc draw" markerEnd="url(#loop-arrow)" style={{ animationDelay: `${0.2 + i * 0.35}s` }} />
      ))}
      {pts.map((p, i) => (
        <g key={nodes[i]} className="loop-node" style={{ animationDelay: `${0.1 + i * 0.35}s` }}>
          <circle cx={p.x} cy={p.y} r="34" className="loop-dot" />
          <text x={p.x} y={p.y + 5} textAnchor="middle" className="loop-label">{nodes[i]}</text>
        </g>
      ))}
      <text x={c} y={c - 6} textAnchor="middle" className="loop-center">두 번째 실행에서</text>
      <text x={c} y={c + 20} textAnchor="middle" className="loop-center loop-center-b">{center}</text>
    </svg>
  );
}
