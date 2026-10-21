import { instructorProfile as g } from "@/data/content";

/** 강사 — G9 */
export default function Instructor() {
  return (
    <section id="instructor" className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="panel mx-auto max-w-5xl p-6 sm:p-10 md:p-14 grid gap-8 md:grid-cols-[auto_1fr] md:gap-14 items-start">
        <div>
          <p className="mono-label">Instructor</p>
          <p className="mt-3 text-[4.5rem] sm:text-[6rem] leading-none font-black tracking-[-0.06em] text-ink glow-text">{g.handle}</p>
          <p className="mt-2 text-lg font-bold text-ink">{g.name}</p>
          <p className="text-sm text-ink-3">{g.role}</p>
        </div>
        <div>
          {g.lines.map((l) => (
            <p key={l} className="text-base sm:text-lg leading-relaxed text-ink-2 break-keep [&+&]:mt-4">
              {l}
            </p>
          ))}
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {g.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs text-ink-3">{f.label}</dt>
                <dd className="mt-1 text-2xl font-extrabold tracking-[-0.02em] text-ink tabular-nums">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
