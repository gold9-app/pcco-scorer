import Link from "next/link";
import { courses, phases, getPhaseCourses } from "@/data/content";
import Panel from "./Panel";

const labelOf = (id: string) => {
  const i = courses.findIndex((c) => c.id === id);
  return (courses[i] as { label?: string }).label ?? `${i + 1}차`;
};

function CourseChips({ ids }: { ids: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {ids.map((id) => (
        <li key={id}>
          <Link href={`/course/${id}`} className="chip">
            {labelOf(id)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Step({ label, name, oneLiner, ids, dashed = false }: { label: string; name: string; oneLiner: string; ids: string[]; dashed?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 sm:p-6 ${dashed ? "border border-dashed border-ink/25" : "bg-white/45 border border-white/70"}`}>
      <p className="text-sm font-semibold text-accent">{label}</p>
      <h3 className="mt-1 text-lg sm:text-xl font-bold text-ink break-keep">{name}</h3>
      <p className="mt-1.5 text-sm sm:text-base text-ink-2 leading-relaxed break-keep">{oneLiner}</p>
      <CourseChips ids={ids} />
    </div>
  );
}

/**
 * 시리즈 지도 — 진짜 순서가 있으므로 단계 번호를 쓴다.
 * 1 → 2 → 진단 → (초급 | 중급) → 4, 그리고 줄기 밖의 외전.
 */
export default function SeriesMap() {
  const byKey = (id: string, track?: string) => phases.find((p) => p.id === id && (track ? p.track === track : true))!;
  const ask = byKey("ask"), build = byKey("build"), diag = byKey("diagnose");
  const basic = byKey("track", "basic"), inter = byKey("track", "intermediate");
  const merge = byKey("merge"), extra = byKey("extra");
  const ids = (p: typeof ask) => getPhaseCourses(p.id, p.track).map((c) => c.id);

  return (
    <Panel
      id="map"
      wide
      title="한 줄기로 이어진 18회"
      lead="처음엔 문장 한 줄을 쓰는 법을 배우고, 마지막엔 에이전트 설계도를 그립니다. 중간에 진단이 있고, 진단 뒤에는 반이 갈립니다."
    >
      <ol className="space-y-3 sm:space-y-4">
        <li><Step label={ask.label} name={ask.name} oneLiner={ask.oneLiner} ids={ids(ask)} /></li>
        <li><Step label={build.label} name={build.name} oneLiner={build.oneLiner} ids={ids(build)} /></li>
        <li>
          <div className="rounded-2xl p-5 sm:p-6 bg-accent/10 border border-accent/30">
            <p className="text-sm font-semibold text-accent">{diag.label}</p>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-ink break-keep">{diag.name}</h3>
            <p className="mt-1.5 text-sm sm:text-base text-ink-2 leading-relaxed break-keep">{diag.oneLiner}</p>
            <CourseChips ids={ids(diag)} />
          </div>
        </li>
        <li className="grid gap-3 sm:gap-4 md:grid-cols-2">
          <Step label={basic.label} name={basic.name} oneLiner={basic.oneLiner} ids={ids(basic)} />
          <Step label={inter.label} name={inter.name} oneLiner={inter.oneLiner} ids={ids(inter)} />
        </li>
        <li><Step label={merge.label} name={merge.name} oneLiner={merge.oneLiner} ids={ids(merge)} /></li>
        <li><Step label={extra.label} name={extra.name} oneLiner={extra.oneLiner} ids={ids(extra)} dashed /></li>
      </ol>
    </Panel>
  );
}
