import { heroContent, pitch } from "@/data/content";
import CountUp from "./CountUp";
import Statement from "./Statement";

/** 첫 문단 — 모토는 화면 가득(Statement), 그 아래 리드 + 세 기둥 + 숫자 */
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
          <div className="grid gap-4 sm:grid-cols-3">
            {pitch.points.map((p, i) => (
              <div key={p.title} className="tile p-5 sm:p-6">
                <p className="mono-label">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-ink break-keep">{p.title}</h3>
                <p className="mt-2 text-sm sm:text-[0.95rem] leading-relaxed text-ink-2 break-keep">{p.text}</p>
              </div>
            ))}
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
            {heroContent.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-ink-3">{s.label}</dt>
                <dd className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-accent tabular-nums">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
