/**
 * 성장 곡선 — x: 시키는 법 → 만드는 법 → 설계하는 법, y: 혼자 할 수 있는 일의 범위.
 * 선·점은 SVG, 글자는 HTML (폰에서도 글자 크기 그대로). 선은 그려지는 모션.
 */
export default function Curve({ points }: { points: { stage: string; after: string }[] }) {
  const W = 640;
  const H = 240;
  const padL = 24;
  const padR = 24;
  const xs = points.map((_, i) => padL + ((W - padL - padR) * (i + 0.5)) / points.length);
  const ys = [190, 125, 48];
  const path = `M ${padL} 216 C ${xs[0]} 216, ${xs[0] - 40} ${ys[0]}, ${xs[0]} ${ys[0]} S ${xs[1]} ${ys[1]}, ${xs[1]} ${ys[1]} S ${xs[2]} ${ys[2]}, ${xs[2]} ${ys[2]} S ${W - padR} 30, ${W - padR} 26`;
  return (
    <figure className="curve-wrap" aria-label={points.map((p) => `${p.stage}: ${p.after}`).join(" / ")}>
      <svg viewBox={`0 0 ${W} ${H}`} className="curve w-full h-auto" aria-hidden>
        <line x1={padL} y1="218" x2={W - padR} y2="218" className="curve-axis" />
        <path d={path} className="curve-line draw" />
        {points.map((p, i) => (
          <circle key={p.stage} cx={xs[i]} cy={ys[i]} r="7" className="curve-dot curve-pt" style={{ animationDelay: `${0.5 + i * 0.3}s` }} />
        ))}
      </svg>
      <figcaption className="curve-cap">
        {points.map((p) => (
          <span key={p.stage} className="curve-stage">{p.stage}</span>
        ))}
      </figcaption>
      <p className="cap text-right mt-1">혼자 할 수 있는 일의 범위 ↑</p>
    </figure>
  );
}
