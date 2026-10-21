import { method } from "@/data/content";
import Panel from "./Panel";

/** 어떻게 진행하나 — 규칙 셋. 큰 번호 + 마침표 찍힌 명령문 + 왜 */
export default function Method() {
  return (
    <Panel id="method" label="Method" title={method.headline}>
      <ol className="grid gap-3">
        {method.rules.map((m, i) => (
          <li key={m.title} className="tile p-5 sm:p-6 grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-start">
            <span className="text-4xl sm:text-5xl font-black tracking-[-0.05em] text-accent/80 tabular-nums leading-none">0{i + 1}</span>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-[-0.02em] text-ink break-keep">{m.title}</h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink-2 break-keep">{m.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
