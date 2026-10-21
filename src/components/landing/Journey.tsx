import { phases } from "@/data/content";
import Panel from "./Panel";

/**
 * 어디까지 가나 — 세로 타임라인. 단계마다 "끝나면 남는 것" 한 줄 + 손에 남는 공식 칩.
 * 진단은 갈림길: 그 아래 초급·중급이 두 갈래로 놓인다.
 */
export default function Journey() {
  const before = phases.filter((p) => p.id === "ask" || p.id === "build");
  const diag = phases.find((p) => p.id === "diagnose");
  const tracks = phases.filter((p) => p.id === "track");
  const after = phases.filter((p) => p.id === "merge");
  const extra = phases.find((p) => p.id === "extra");

  const Step = ({ p, n }: { p: (typeof phases)[number]; n: string }) => (
    <li className="journey-step">
      <span className="journey-dot" aria-hidden />
      <p className="text-xs text-ink-3">
        <span className="mono-label text-accent mr-2">{n}</span>
        {p.label} · {p.range}
      </p>
      <h3 className="mt-1.5 text-lg sm:text-xl font-bold leading-snug text-ink break-keep">{p.result}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-2 break-keep">{p.oneLiner}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="손에 남는 공식">
        {p.formulas.map((f) => (
          <li key={f} className="chip min-h-[28px] px-2.5 text-[0.72rem]">{f}</li>
        ))}
      </ul>
    </li>
  );

  return (
    <Panel id="journey" label="Journey" title="강의 목록이 아니라, 계단입니다" lead="단계마다 공식 하나를 몸에 붙이고, 진단에서 반이 갈려 각자의 길을 갑니다. 끝에 남는 건 공식 15개." wide>
      <ol className="journey">
        {before.map((p, i) => (
          <Step key={p.id} p={p} n={String(i + 1).padStart(2, "0")} />
        ))}
        {diag && (
          <li className="journey-step journey-branch">
            <span className="journey-dot journey-dot-branch" aria-hidden />
            <p className="text-xs text-ink-3">
              <span className="mono-label text-accent mr-2">03</span>
              {diag.label} · {diag.range}
            </p>
            <h3 className="mt-1.5 text-lg sm:text-xl font-bold leading-snug text-ink break-keep">{diag.result}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-2 break-keep">{diag.oneLiner}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {diag.formulas.map((f) => (
                <li key={f} className="chip min-h-[28px] px-2.5 text-[0.72rem]">{f}</li>
              ))}
            </ul>
            {/* 갈림길 — 두 반 */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {tracks.map((t) => (
                <li key={t.track} className="tile p-4 sm:p-5">
                  <p className="text-xs text-ink-3">{t.label} · {t.range}</p>
                  <h4 className="mt-1 text-base sm:text-lg font-bold leading-snug text-ink break-keep">{t.result}</h4>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {t.formulas.map((f) => (
                      <li key={f} className="chip min-h-[26px] px-2 text-[0.7rem]">{f}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        )}
        {after.map((p) => (
          <Step key={p.id} p={p} n="04" />
        ))}
      </ol>
      {extra && (
        <div className="mt-8 tile p-5 sm:p-6 grid gap-3 md:grid-cols-[auto_1fr] md:items-start">
          <p className="mono-label text-accent">+ {extra.label}</p>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-ink break-keep">{extra.result}</h3>
            <p className="mt-1 text-sm text-ink-2 break-keep">{extra.oneLiner} · {extra.range}</p>
          </div>
        </div>
      )}
    </Panel>
  );
}
