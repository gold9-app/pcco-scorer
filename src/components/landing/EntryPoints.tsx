import Link from "next/link";
import { entryPoints } from "@/data/content";
import Panel from "./Panel";

/** 나에게 맞는 시작점 — 세 사람의 말, 세 곳의 입구 */
export default function EntryPoints() {
  return (
    <Panel id="start" title="어디서 시작할까요" lead="세 사람이 세 곳에서 시작합니다. 당신은 어느 쪽에 가까운가요.">
      <ul className="divide-y divide-ink/10">
        {entryPoints.map((e) => (
          <li key={e.courseId} className="py-6 first:pt-0 last:pb-0 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-semibold leading-snug text-ink break-keep">“{e.quote}”</p>
              <p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed break-keep">{e.description}</p>
            </div>
            <Link
              href={`/course/${e.courseId}`}
              className="btn-ghost self-start sm:self-center whitespace-nowrap"
            >
              {e.start}
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
