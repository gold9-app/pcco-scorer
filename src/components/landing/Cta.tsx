import Link from "next/link";
import { heroContent } from "@/data/content";

/** 마지막 — 블록이 다 쌓인 자리. 그 한 칸이 당신 자리 */
export default function Cta() {
  return (
    <section id="go" className="px-4 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-24">
      <div className="panel mx-auto max-w-3xl p-6 sm:p-10 md:p-12">
        <p className="mono-label">Start</p>
        <h2 className="mt-3 text-2xl sm:text-3xl md:text-[2.15rem] font-extrabold tracking-[-0.02em] leading-[1.2] text-ink break-keep">
          마지막 한 칸은 당신 자리입니다
        </h2>
        <p className="mt-3 max-w-[42ch] text-base sm:text-lg leading-relaxed text-ink-2 break-keep">
          화면이 거의 찼습니다. 남은 한 칸에 들어오면 딱 맞습니다. 처음부터 시작해도, 진단부터 시작해도, 하루짜리 외전으로 시작해도 됩니다.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/downloads" className="btn-primary">강의 자료 받기</Link>
          <Link href="/course" className="btn-ghost">수강생 복습 페이지</Link>
          <Link href="/workbook" className="btn-ghost">실습서</Link>
        </div>
      </div>

      <footer className="panel mx-auto max-w-3xl mt-8 sm:mt-10 px-5 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-2">
        <p>{heroContent.title} — {heroContent.handle} {heroContent.instructor}</p>
        <nav className="flex gap-4">
          <Link href="/downloads" className="hover:text-ink">자료실</Link>
          <Link href="/workbook" className="hover:text-ink">실습서</Link>
          <Link href="/course" className="hover:text-ink">복습</Link>
        </nav>
      </footer>
    </section>
  );
}
