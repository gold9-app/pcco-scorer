import { heroContent, pitch, learn } from "@/data/content";
import CountUp from "./CountUp";
import Editorial from "./Editorial";
import Phrases from "./Phrases";
import Statement from "./Statement";
import Curve from "./diagrams/Curve";
import BlockBar from "./diagrams/BlockBar";

/** 숫자 → 칸 수 (27회 → 27, 2,400분 → 24, 15개 → 15, 0 → 빈 칸) */
function cellsOf(value: string) {
  const n = parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
  if (n === 0) return { cells: 0, unit: undefined, empty: true };
  if (n >= 1000) return { cells: Math.round(n / 100), unit: "칸 = 100분", empty: false };
  return { cells: n, unit: undefined, empty: false };
}

/**
 * 첫 문단 — 모토는 화면 가득(Statement), 그 아래 성장 곡선 한 장 + "지금 → 끝나면" 세 줄 + 숫자 블록 막대.
 * 플립(호버) 대신 그림: 폰에서도 같은 정보.
 */
export default function Pitch() {
  const points = learn.stages.map((s, i) => ({ stage: s.name, after: pitch.points[i].after }));
  return (
    <>
      <div id="about" className="scroll-mt-20">
        <Statement label="About" sub={pitch.lead}>
          {heroContent.motto}
        </Statement>
      </div>
      <Editorial
        title={
          <>
            AI는 능력이 아니라, <em>설계</em>의 문제입니다
          </>
        }
        lead={"지금 하는 말이, 끝나면 하는 일로 바뀝니다.\n세 단계를 지나며 혼자 할 수 있는 일의 범위가 넓어집니다."}
      >
        <Curve points={points} />
        <ol className="rows mt-6">
          {pitch.points.map((p, i) => (
            <li key={p.formula} className="row !py-4 grid gap-1 sm:grid-cols-[2.5rem_1fr]">
              <span className="mono-label text-accent pt-1">0{i + 1}</span>
              <div>
                <p className="cap line-through decoration-white/30">“{p.now}”</p>
                <p className="h3 mt-1 text-[1.125rem] sm:text-[1.25rem]"><Phrases text={p.after} hard /></p>
              </div>
            </li>
          ))}
        </ol>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/10 pt-8">
          {heroContent.stats.map((s) => {
            const b = cellsOf(s.value);
            return (
              <div key={s.label}>
                <dd className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-accent tabular-nums">
                  <CountUp value={s.value} />
                </dd>
                <dt className="mt-1 cap">{s.label}</dt>
                <BlockBar cells={b.cells} unit={b.unit} empty={b.empty} />
              </div>
            );
          })}
        </dl>
      </Editorial>
    </>
  );
}
