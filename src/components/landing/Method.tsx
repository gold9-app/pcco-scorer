import { method } from "@/data/content";
import Panel from "./Panel";

/** 어떻게 진행하나 — 세 가지 약속 */
export default function Method() {
  return (
    <Panel id="method" label="Method" title="이렇게 진행합니다">
      <ol className="divide-y divide-white/10">
        {method.map((m, i) => (
          <li key={m.title} className="py-6 first:pt-0 last:pb-0 grid gap-2 sm:grid-cols-[4rem_1fr]">
            <span className="mono-label text-accent tabular-nums">0{i + 1}</span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-ink break-keep">{m.title}</h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink-2 break-keep">{m.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
