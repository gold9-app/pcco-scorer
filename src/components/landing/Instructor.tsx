import { instructorProfile as g } from "@/data/content";
import CountUp from "./CountUp";
import Editorial from "./Editorial";

/** 강사 — 주장 한 줄 + 증거(직접 만들어 쓰는 것) + 숫자 */
export default function Instructor() {
  return (
    <Editorial
      id="instructor"
      label="Instructor"
      title={
        <>
          가르치는 것을 <em>직접 만들어</em> 씁니다.
        </>
      }
      aside={
        <div>
          <p className="text-[4rem] sm:text-[5rem] leading-none font-black tracking-[-0.06em] text-ink glow-text">{g.handle}</p>
          <p className="mt-2 text-lg font-bold text-ink">{g.name}</p>
          <p className="cap">{g.role}</p>
        </div>
      }
    >
      {g.lines.map((l) => (
        <p key={l} className="body mt-0 [&+&]:mt-4">
          {l}
        </p>
      ))}
      <p className="mono-label label-ko mt-8">직접 만들어 수업에 쓰는 것</p>
      <ul className="rows mt-2" aria-label="직접 만들어 수업에 쓰는 것">
        {g.evidence.map((e) => (
          <li key={e.name} className="row !py-4 grid gap-1 sm:grid-cols-[11rem_1fr]">
            <p className="text-[1.0625rem] font-bold text-ink break-keep">{e.name}</p>
            <p className="body !max-w-none text-[1rem]">{e.text}</p>
          </li>
        ))}
      </ul>
      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6">
        {g.facts.map((f) => (
          <div key={f.label}>
            <dd className="text-3xl font-extrabold tracking-[-0.02em] text-ink tabular-nums">
              <CountUp value={f.value} />
            </dd>
            <dt className="mt-0.5 cap">{f.label}</dt>
          </div>
        ))}
      </dl>
    </Editorial>
  );
}
