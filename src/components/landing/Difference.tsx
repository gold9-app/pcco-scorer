import { comparison as c } from "@/data/content";
import Panel from "./Panel";

/** 다른 점 — 대비표. 왼쪽(흔한 강의)은 흐리게, 오른쪽(이 시리즈)은 틸 포인트 */
export default function Difference() {
  return (
    <Panel id="why" label="Difference" title={c.headline} wide>
      <div className="compare" role="table" aria-label="흔한 AI 강의와 이 시리즈 비교">
        <div className="compare-head" role="row">
          <span role="columnheader" className="mono-label">{c.left}</span>
          <span role="columnheader" className="mono-label text-accent">{c.right}</span>
        </div>
        {c.rows.map((r) => (
          <div key={r.ours} className="compare-row" role="row">
            <span role="cell" className="compare-l break-keep">{r.common}</span>
            <span role="cell" className="compare-r break-keep">{r.ours}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
