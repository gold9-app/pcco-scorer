import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { courses, phases, getPhaseCourses } from "@/data/content";

export const metadata: Metadata = {
  title: "강의 복습 | AI 활용 실전 시리즈",
  description: "차수별 복습 페이지 목록 — 1차부터 개인 맞춤 강의까지",
};

/**
 * 복습 인덱스 — /course
 * 수강생용. 시리즈 지도 순서(phases[])대로 20개 강의를 나열한다.
 */
export default function CourseIndexPage() {
  const labelOf = (id: string) => {
    const i = courses.findIndex((c) => c.id === id);
    return (courses[i] as { label?: string }).label ?? `${i + 1}차`;
  };

  return (
    <main className="relative min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          <span>강의 소개로</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-3 tracking-tight text-premium break-keep">
          강의 복습
        </h1>
        <p className="text-base sm:text-lg text-text-muted mb-10 sm:mb-14 break-keep">
          들은 강의를 다시 펼칩니다. 단계 순서대로 — 1차부터 개인 맞춤 강의까지.
        </p>

        <div className="space-y-10 sm:space-y-14">
          {phases.map((phase) => {
            const list = getPhaseCourses(phase.id, phase.track);
            if (list.length === 0) return null;
            return (
              <section key={`${phase.id}-${phase.track ?? ""}`}>
                <div className="mb-4">
                  <p className="text-xs tracking-[0.2em] text-text-muted/70 font-bold">{phase.label.toUpperCase()}</p>
                  <h2 className="text-xl sm:text-2xl font-bold mt-1 break-keep">{phase.name}</h2>
                  <p className="text-sm text-text-muted mt-1 break-keep">{phase.oneLiner}</p>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {list.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/course/${c.id}`}
                        className="group block glass-card rounded-xl p-4 sm:p-5 hover:border-accent-primary/50 transition-all card-interactive min-h-[44px]"
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-accent-primary/20 text-accent-primary text-xs font-bold whitespace-nowrap">
                            {labelOf(c.id)}
                          </span>
                          <span className="text-xs text-text-muted whitespace-nowrap">{c.framework}</span>
                        </div>
                        <p className="font-semibold break-keep">{c.title}</p>
                        <p className="text-xs sm:text-sm text-text-muted mt-1 line-clamp-2 break-keep">{c.subtitle}</p>
                        <span className="inline-flex items-center gap-1 text-accent-primary text-xs font-semibold mt-3">
                          복습하기
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
