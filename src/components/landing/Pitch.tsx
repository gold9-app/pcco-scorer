import { heroContent, pitch } from "@/data/content";
import CountUp from "./CountUp";
import Editorial from "./Editorial";
import Statement from "./Statement";

/** 첫 문단 — 모토는 화면 가득(Statement), 그 아래 "지금 → 끝나면" 세 기둥 + 숫자 */
export default function Pitch() {
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
        lead="지금 하는 말이, 끝나면 하는 일로 바뀝니다. 카드에 마우스를 올리거나 눌러 보세요."
      >
        <ul className="cols3">
          {pitch.points.map((p, i) => (
            <li key={p.formula} className="flip flex flex-col min-h-[12rem]" tabIndex={0}>
              <p className="cap flex items-center justify-between">
                <span className="mono-label">0{i + 1}</span>
                <span className="flip-tag mono-label">지금</span>
              </p>
              <p className="flip-now h3 mt-4 text-ink-2">“{p.now}”</p>
              <p className="flip-after h3 mt-4">{p.after}</p>
              <p className="mt-auto pt-5 cap text-accent font-semibold">{p.formula}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 border-t border-white/10 pt-8">
          {heroContent.stats.map((s) => (
            <div key={s.label}>
              <dd className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-accent tabular-nums">
                <CountUp value={s.value} />
              </dd>
              <dt className="mt-1 cap">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Editorial>
    </>
  );
}
