"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { courses, type Phase, type Track } from "@/data/content";
import Panel from "./Panel";

const PHASE_FILTERS: { key: Phase | "all"; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "ask", label: "1단계 시키는 법" },
  { key: "build", label: "2단계 만드는 법" },
  { key: "diagnose", label: "진단" },
  { key: "track", label: "3단계 분반" },
  { key: "merge", label: "4단계 합반" },
  { key: "extra", label: "외전" },
];
const TRACK_FILTERS: { key: Track | "all"; label: string }[] = [
  { key: "all", label: "모든 반" },
  { key: "common", label: "공통" },
  { key: "basic", label: "초급반" },
  { key: "intermediate", label: "중급반" },
  { key: "merged", label: "합반" },
];

const labelOf = (id: string) => {
  const i = courses.findIndex((c) => c.id === id);
  return (courses[i] as { label?: string }).label ?? `${i + 1}차`;
};

/** 강의 19회 — 단계·반으로 거르는 목록. 타일을 누르면 복습 페이지 */
export default function CourseIndex() {
  const [phase, setPhase] = useState<Phase | "all">("all");
  const [track, setTrack] = useState<Track | "all">("all");

  const list = useMemo(
    () => courses.filter((c) => (phase === "all" || c.phase === phase) && (track === "all" || c.track === track)),
    [phase, track]
  );

  return (
    <Panel id="courses" wide title="강의 19회, 하나씩" lead="한 강의에 외워서 평생 쓰는 공식 하나. 눌러서 그 강의의 복습 페이지로 갑니다.">
      <div className="flex flex-col gap-3 mb-6 sm:mb-8">
        <div role="group" aria-label="단계" className="flex flex-wrap gap-2">
          {PHASE_FILTERS.map((f) => (
            <button key={f.key} type="button" onClick={() => setPhase(f.key)} aria-pressed={phase === f.key} className="chip chip-toggle">
              {f.label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="반" className="flex flex-wrap gap-2">
          {TRACK_FILTERS.map((f) => (
            <button key={f.key} type="button" onClick={() => setTrack(f.key)} aria-pressed={track === f.key} className="chip chip-toggle">
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="text-ink-2">이 조합에 해당하는 강의가 없습니다. 필터를 하나 풀어보세요.</p>
      ) : (
        <ul className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <li key={c.id}>
              <Link href={`/course/${c.id}`} className="tile group block h-full p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-2xl font-extrabold tracking-tight text-ink tabular-nums">{labelOf(c.id)}</span>
                  <span className="text-xs font-semibold text-accent truncate">{c.framework}</span>
                </div>
                <h3 className="mt-3 text-base sm:text-[1.05rem] font-bold leading-snug text-ink break-keep">{c.title}</h3>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed break-keep line-clamp-3">{c.heroQuote}</p>
                <p className="mt-4 text-xs text-ink-3">{c.duration.split(" (")[0]} — {c.level.split(" (")[0]}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
