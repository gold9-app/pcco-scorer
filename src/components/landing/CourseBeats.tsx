import Link from "next/link";
import { courses } from "@/data/content";

const labelOf = (i: number) => (courses[i] as { label?: string }).label ?? `${i + 1}차`;

/**
 * 강의 19회 — 한 강의가 한 비트(data-beat), 한 비트가 유리 블록 하나.
 * 비트가 뷰포트 아래쪽에 닿으면 그 강의의 블록이 떨어져 쌓인다. 패널은 좌·우를 번갈아 놓아 리듬을 만든다.
 * 마지막 20번째 비트는 CTA (당신의 자리).
 */
export default function CourseBeats() {
  return (
    <div id="courses">
      {/* 들어가는 말 — 비트 아님 */}
      <section className="px-4 sm:px-6 pt-6 pb-10 sm:pb-16">
        <div className="panel mx-auto max-w-3xl p-6 sm:p-10 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-[2.15rem] font-extrabold tracking-[-0.02em] leading-[1.2] text-ink break-keep">
            강의 19회가 하나씩 쌓입니다
          </h2>
          <p className="mt-3 max-w-[40ch] text-base sm:text-lg leading-relaxed text-ink-2 break-keep">
            한 강의가 한 블록. 외워서 평생 쓰는 공식 하나씩입니다. 끝까지 내리면 화면이 빈틈없이 찹니다 — 마지막 한 칸만 빼고.
          </p>
        </div>
      </section>

      {courses.map((c, i) => (
        <section key={c.id} data-beat className="px-4 sm:px-6 py-[12svh] sm:py-[14svh]" aria-label={`${labelOf(i)} ${c.title}`}>
          <div className="mx-auto max-w-5xl">
            <article className={`panel beat p-6 sm:p-8 md:p-9 md:w-[52%] ${i % 2 === 1 ? "md:ml-auto" : ""}`}>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-ink tabular-nums">{labelOf(i)}</span>
                <span className="text-sm font-semibold text-accent truncate">{c.framework}</span>
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-bold leading-snug text-ink break-keep">{c.title}</h3>
              <p className="mt-3 text-base sm:text-[1.05rem] leading-relaxed text-ink break-keep">{c.heroQuote}</p>
              <p className="mt-4 text-xs sm:text-sm text-ink-3">
                {c.duration.split(" (")[0]} — {c.level.split(" (")[0]}
              </p>
              <Link href={`/course/${c.id}`} className="btn-ghost mt-5 text-sm min-h-[40px] px-4">
                복습 페이지
              </Link>
            </article>
          </div>
        </section>
      ))}
    </div>
  );
}
