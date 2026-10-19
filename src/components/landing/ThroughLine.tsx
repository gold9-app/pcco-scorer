import { courses, quotes } from "@/data/content";
import Panel from "./Panel";

const labelOf = (id: string) => {
  const i = courses.findIndex((c) => c.id === id);
  const c = courses[i] as { label?: string; title: string };
  return `${c.label ?? `${i + 1}차`} ${c.title}`;
};

/** 관통 메시지 — 1차부터 외전까지 같은 방향을 가리키는 문장들 */
export default function ThroughLine() {
  return (
    <Panel
      id="line"
      title="AI는 능력이 아니라 설계의 문제입니다"
      lead="시키는 대상만 커집니다. 문장 한 줄에서, 지침, 앱, 서비스, 그리고 에이전트까지."
    >
      <ol className="space-y-7 sm:space-y-8">
        {quotes.map((q) => (
          <li key={q.courseId} className="grid gap-1.5">
            <p className="text-xl sm:text-2xl font-bold leading-snug tracking-[-0.01em] text-ink break-keep">{q.text}</p>
            <p className="text-sm text-ink-3">{labelOf(q.courseId)}</p>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
