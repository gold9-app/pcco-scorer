import { entryPoints } from "@/data/content";
import Panel from "./Panel";

/** 누구를 위한 강의인가 — 세 가지 고민, 세 가지 시작점 */
export default function ForWhom() {
  return (
    <Panel id="for" label="For whom" title="이런 분을 위해 만들었습니다" lead="AI를 처음 쓰는 분부터 Claude Code를 써 본 분까지 — 지금 서 있는 자리에서 시작합니다." wide>
      <ul className="grid gap-4 md:grid-cols-3">
        {entryPoints.map((e) => (
          <li key={e.courseId} className="tile p-5 sm:p-6 flex flex-col">
            <p className="text-base sm:text-lg font-bold leading-snug text-ink break-keep">“{e.quote}”</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-2 break-keep">{e.description}</p>
            <p className="mt-auto pt-5 mono-label text-accent">{e.start}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
