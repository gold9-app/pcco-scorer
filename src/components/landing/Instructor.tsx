import { instructorProfile as g } from "@/data/content";
import CountUp from "./CountUp";

/** 강사 — 주장 한 줄 + 증거(직접 만들어 쓰는 것) + 숫자 */
export default function Instructor() {
  return (
    <section id="instructor" className="px-4 sm:px-6 py-8 sm:py-12 scroll-mt-20" data-reveal>
      <div className="panel mx-auto max-w-5xl p-6 sm:p-10 md:p-14 grid gap-8 md:grid-cols-[auto_1fr] md:gap-14 items-start">
        <div>
          <p className="mono-label">Instructor</p>
          <p className="mt-3 text-[4.5rem] sm:text-[6rem] leading-none font-black tracking-[-0.06em] text-ink glow-text">{g.handle}</p>
          <p className="mt-2 text-lg font-bold text-ink">{g.name}</p>
          <p className="text-sm text-ink-3">{g.role}</p>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] leading-[1.2] text-ink break-keep">{g.claim}</h2>
          {g.lines.map((l) => (
            <p key={l} className="mt-4 text-base sm:text-lg leading-relaxed text-ink-2 break-keep">
              {l}
            </p>
          ))}
          <ul className="mt-6 grid gap-2 sm:grid-cols-3" aria-label="직접 만들어 수업에 쓰는 것">
            {g.evidence.map((e) => (
              <li key={e.name} className="tile p-4">
                <p className="text-sm font-bold text-ink break-keep">{e.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-2 break-keep">{e.text}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {g.facts.map((f) => (
              <div key={f.label}>
                <dd className="text-2xl font-extrabold tracking-[-0.02em] text-ink tabular-nums">
                  <CountUp value={f.value} />
                </dd>
                <dt className="mt-0.5 text-xs text-ink-3">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
