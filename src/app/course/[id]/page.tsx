import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";

import CourseDetail from "@/components/CourseDetail";
import { courses, phases } from "@/data/content";
import { resourceGroups } from "@/data/resources";

/**
 * 차수별 복습 페이지 — /course/{id}
 * 정적 export: generateStaticParams 가 courses[] 를 돌며 20페이지를 빌드 시 생성한다.
 * 내용은 CourseDetail(기존 컴포넌트) 그대로. 랜딩의 #course-N 앵커는 HashRedirect 가 이 주소로 보낸다.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) return {};
  const idx = courses.findIndex((c) => c.id === id);
  const label = (course as { label?: string }).label ?? `${idx + 1}차`;
  return {
    title: `${label} ${course.title} | AI 활용 실전 시리즈`,
    description: course.subtitle,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idx = courses.findIndex((c) => c.id === id);
  const course = courses[idx];
  if (!course) return null;

  const prev = idx > 0 ? courses[idx - 1] : null;
  const next = idx < courses.length - 1 ? courses[idx + 1] : null;
  const phase = phases.find((p) => p.id === course.phase && (p.track ? p.track === course.track : true));
  const hasResources = resourceGroups.some((g) => g.courseId === id);
  const labelOf = (c: (typeof courses)[number], i: number) => (c as { label?: string }).label ?? `${i + 1}차`;

  return (
    <main className="relative min-h-screen">
      {/* 상단 바 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent-primary transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            <span>전체 강의 복습</span>
          </Link>
          {phase && (
            <span className="px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-bold whitespace-nowrap">
              {phase.label} · {phase.name}
            </span>
          )}
        </div>
      </div>

      {/* 본문 — 기존 복습 컴포넌트, 기본 펼침 */}
      <CourseDetail courseId={id} defaultOpen />

      {/* 하단 — 자료실 · 이전/다음 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 space-y-6">
        {hasResources && (
          <Link
            href="/downloads"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card font-semibold text-sm hover:bg-accent-primary/10 hover:border-accent-primary transition-all min-h-[44px]"
          >
            <Download className="w-4 h-4 flex-shrink-0" />
            <span>이 강의 자료 받기 — 자료실</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Link>
        )}

        <nav className="grid sm:grid-cols-2 gap-3 sm:gap-4" aria-label="이전·다음 강의">
          {prev ? (
            <Link
              href={`/course/${prev.id}`}
              className="glass-card rounded-xl p-4 sm:p-5 hover:border-accent-primary/50 transition-all card-interactive min-h-[44px]"
            >
              <p className="text-xs text-text-muted mb-1">← 이전 · {labelOf(prev, idx - 1)}</p>
              <p className="font-semibold break-keep">{prev.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={`/course/${next.id}`}
              className="glass-card rounded-xl p-4 sm:p-5 hover:border-accent-primary/50 transition-all card-interactive text-right min-h-[44px]"
            >
              <p className="text-xs text-text-muted mb-1">다음 · {labelOf(next, idx + 1)} →</p>
              <p className="font-semibold break-keep">{next.title}</p>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
