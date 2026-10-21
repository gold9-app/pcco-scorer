import { phases } from "@/data/content";
import Panel from "./Panel";

/** 어디까지 가나 — 단계 여정 (차수 번호 없이, 이름과 한 줄) */
export default function Journey() {
  const steps = phases.filter((p) => p.id !== "extra");
  const extra = phases.find((p) => p.id === "extra");
  return (
    <Panel id="journey" label="Journey" title="시키는 법에서 설계하는 법까지" lead="한 번에 다 배우지 않습니다. 단계마다 공식 하나를 몸에 붙이고, 진단으로 반을 나눠 각자의 길을 갑니다." wide>
      <ol className="grid gap-3 md:grid-cols-2">
        {steps.map((p, i) => (
          <li key={`${p.id}-${p.track ?? ""}`} className="tile p-5 sm:p-6 flex gap-4">
            <span className="mono-label text-accent tabular-nums shrink-0 pt-1">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="text-xs text-ink-3">{p.label}</p>
              <h3 className="mt-1 text-base sm:text-lg font-bold text-ink break-keep">{p.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2 break-keep">{p.oneLiner}</p>
            </div>
          </li>
        ))}
      </ol>
      {extra && (
        <p className="mt-6 text-sm text-ink-3 break-keep">
          <span className="mono-label text-accent mr-2">+</span>
          {extra.name} — {extra.oneLiner}
        </p>
      )}
    </Panel>
  );
}
