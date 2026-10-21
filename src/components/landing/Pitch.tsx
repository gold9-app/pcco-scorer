import { heroContent, pitch } from "@/data/content";
import CountUp from "./CountUp";
import Statement from "./Statement";

/** 첫 문단 — 모토는 화면 가득(Statement), 그 아래 "지금 → 끝나면" 플립 카드 셋 + 숫자 */
export default function Pitch() {
  return (
    <>
      <div id="about" className="scroll-mt-20">
        <Statement label="About" sub={pitch.lead}>
          {heroContent.motto}
        </Statement>
      </div>
      <section className="px-4 sm:px-6 pb-8 sm:pb-12" data-reveal>
        <div className="panel mx-auto max-w-5xl p-6 sm:p-10 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-[2.15rem] font-extrabold tracking-[-0.02em] leading-[1.2] text-ink break-keep">{pitch.headline}</h2>
          <p className="mt-2 text-sm text-ink-3">카드에 마우스를 올리거나 눌러 보세요 — 지금 하는 말이, 끝나면 하는 일로 바뀝니다.</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {pitch.points.map((p, i) => (
              <li key={p.formula} className="flip tile p-5 sm:p-6 flex flex-col min-h-[13rem]" tabIndex={0}>
                <div className="flex items-center justify-between">
                  <span className="mono-label">0{i + 1}</span>
                  <span className="flip-tag mono-label">지금</span>
                </div>
                <p className="flip-now mt-4 text-lg sm:text-xl font-bold leading-snug text-ink-2 break-keep">“{p.now}”</p>
                <p className="flip-after mt-4 text-lg sm:text-xl font-bold leading-snug text-ink break-keep">{p.after}</p>
                <p className="mt-auto pt-5 text-xs text-accent font-semibold tracking-wide">{p.formula}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
            {heroContent.stats.map((s) => (
              <div key={s.label}>
                <dd className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-accent tabular-nums">
                  <CountUp value={s.value} />
                </dd>
                <dt className="mt-1 text-xs sm:text-sm text-ink-3">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
