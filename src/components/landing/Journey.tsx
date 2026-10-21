import { phases } from "@/data/content";
import Editorial from "./Editorial";

/**
 * 어디까지 가나 — 세로 타임라인. 단계마다 "끝나면 남는 것" 한 줄. 공식 칩은 펼칠 때만.
 * 진단은 갈림길: 그 아래 초급·중급이 두 갈래로 놓인다.
 */
export default function Journey() {
  const before = phases.filter((p) => p.id === "ask" || p.id === "build");
  const diag = phases.find((p) => p.id === "diagnose");
  const tracks = phases.filter((p) => p.id === "track");
  const after = phases.filter((p) => p.id === "merge");
  const extra = phases.find((p) => p.id === "extra");

  const Formulas = ({ list }: { list: string[] }) => (
    <details className="more mt-3">
      <summary>손에 남는 공식 {list.length}개</summary>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {list.map((f) => (
          <li key={f} className="chip min-h-[30px] px-3 text-[0.8125rem]">{f}</li>
        ))}
      </ul>
    </details>
  );

  const Step = ({ p, n }: { p: (typeof phases)[number]; n: string }) => (
    <li className="journey-step">
      <span className="journey-dot" aria-hidden />
      <p className="cap">
        <span className="mono-label text-accent mr-2">{n}</span>
        {p.label} · {p.range}
      </p>
      <h3 className="h3 mt-2">{p.result}</h3>
      <Formulas list={p.formulas} />
    </li>
  );

  return (
    <Editorial
      id="journey"
      label="Journey"
      title={
        <>
          강의 목록이 아니라, <em>계단</em>입니다
        </>
      }
      lead="단계마다 공식 하나를 몸에 붙이고, 진단에서 반이 갈려 각자의 길을 갑니다. 끝에 남는 건 공식 15개."
    >
      <ol className="journey">
        {before.map((p, i) => (
          <Step key={p.id} p={p} n={String(i + 1).padStart(2, "0")} />
        ))}
        {diag && (
          <li className="journey-step journey-branch">
            <span className="journey-dot journey-dot-branch" aria-hidden />
            <p className="cap">
              <span className="mono-label text-accent mr-2">03</span>
              {diag.label} · {diag.range}
            </p>
            <h3 className="h3 mt-2">{diag.result}</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {tracks.map((t) => (
                <li key={t.track} className="border-l border-accent/40 pl-4">
                  <p className="cap">↳ {t.label} · {t.range}</p>
                  <p className="mt-1.5 text-[1.0625rem] font-bold text-ink break-keep leading-snug">{t.result}</p>
                  <Formulas list={t.formulas} />
                </li>
              ))}
            </ul>
          </li>
        )}
        {after.map((p) => (
          <Step key={p.id} p={p} n="04" />
        ))}
        {extra && (
          <li className="journey-step">
            <span className="journey-dot" aria-hidden style={{ borderStyle: "dashed" }} />
            <p className="cap">
              <span className="mono-label text-accent mr-2">+</span>
              {extra.label} · {extra.range}
            </p>
            <h3 className="h3 mt-2">{extra.result}</h3>
            <p className="body mt-2">{extra.oneLiner}</p>
          </li>
        )}
      </ol>
    </Editorial>
  );
}
