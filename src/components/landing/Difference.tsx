import { comparison as c } from "@/data/content";
import Editorial from "./Editorial";
import Phrases from "./Phrases";

/** 다른 점 — 대비표. 처음엔 4행, 나머지는 펼쳐서 */
export default function Difference() {
  const first = c.rows.slice(0, 4);
  const rest = c.rows.slice(4);
  const Row = ({ r }: { r: (typeof c.rows)[number] }) => (
    <div className="compare-row" role="row">
      <span role="cell" className="compare-l">{r.common}</span>
      <span role="cell" className="compare-r"><Phrases text={r.ours} /></span>
    </div>
  );
  return (
    <Editorial
      id="why"
      label="Difference"
      title={
        <>
          요령이 아니라, <em>공식</em>입니다
        </>
      }
      lead={"흔한 AI 강의와 나란히 놓으면\n차이가 보입니다."}
    >
      <div className="compare" role="table" aria-label="흔한 AI 강의와 이 시리즈 비교">
        <div className="compare-head" role="row">
          <span role="columnheader" className="mono-label label-ko">{c.left}</span>
          <span role="columnheader" className="mono-label label-ko text-accent">{c.right}</span>
        </div>
        {first.map((r) => (
          <Row key={r.ours} r={r} />
        ))}
        {rest.length > 0 && (
          <details className="more mt-4">
            <summary>더 보기 {rest.length}</summary>
            <div className="mt-2">
              {rest.map((r) => (
                <Row key={r.ours} r={r} />
              ))}
            </div>
          </details>
        )}
      </div>
    </Editorial>
  );
}
