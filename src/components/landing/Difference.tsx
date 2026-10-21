import { usps } from "@/data/content";
import Panel from "./Panel";

/** 이 강의가 다른 점 — 정의 목록 */
export default function Difference() {
  return (
    <Panel id="why" label="Difference" title="다른 AI 강의와 다른 점" wide>
      <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {usps.map((u) => (
          <div key={u.title}>
            <dt className="text-base sm:text-lg font-bold text-ink break-keep">{u.title}</dt>
            <dd className="mt-1.5 text-sm sm:text-base text-ink-2 leading-relaxed break-keep">{u.description}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
