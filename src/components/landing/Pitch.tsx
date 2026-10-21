import { heroContent, pitch } from "@/data/content";

/** 첫 문단 — 이 강의가 무엇인지 한 번에. 큰 모토 + 리드 + 세 기둥 + 숫자 */
export default function Pitch() {
  return (
    <section id="about" className="px-4 sm:px-6 pt-4 pb-8 sm:pb-12">
      <div className="panel mx-auto max-w-5xl p-6 sm:p-10 md:p-14">
        <p className="mono-label">About</p>
        <h2 className="mt-3 max-w-[22ch] text-3xl sm:text-4xl md:text-[3rem] font-extrabold tracking-[-0.03em] leading-[1.12] text-ink break-keep">
          {heroContent.motto}
        </h2>
        <p className="mt-6 max-w-[48ch] text-base sm:text-lg leading-relaxed text-ink-2 break-keep">{pitch.lead}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {pitch.points.map((p, i) => (
            <div key={p.title} className="tile p-5 sm:p-6">
              <p className="mono-label">0{i + 1}</p>
              <h3 className="mt-2 text-lg font-bold text-ink break-keep">{p.title}</h3>
              <p className="mt-2 text-sm sm:text-[0.95rem] leading-relaxed text-ink-2 break-keep">{p.text}</p>
            </div>
          ))}
        </div>

        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
          {heroContent.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xs text-ink-3">{s.label}</dt>
              <dd className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-accent tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
