import { entryPoints } from "@/data/content";
import Panel from "./Panel";

/** 누구를 위한 강의인가 — 지금 하는 말 → 처방 한 줄(시작점 · 소요 · 첫 변화) */
export default function ForWhom() {
  return (
    <Panel id="for" label="For whom" title="지금 이 말을 하고 있다면, 시작점이 있습니다" lead="AI를 처음 쓰는 분부터 Claude Code를 써 본 분까지 — 세 곳 중 한 곳에서 시작합니다." wide>
      <ul className="grid gap-4 md:grid-cols-3">
        {entryPoints.map((e) => (
          <li key={e.courseId} className="tile p-5 sm:p-6 flex flex-col">
            <p className="text-lg sm:text-xl font-bold leading-snug text-ink break-keep">“{e.quote}”</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-2 break-keep">{e.description}</p>
            <div className="mt-auto pt-6">
              <p className="mono-label text-accent">→ {e.start}</p>
              <p className="mt-1.5 text-sm font-semibold text-ink break-keep">{e.rx}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
