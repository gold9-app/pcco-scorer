import Link from "next/link";
import { heroContent } from "@/data/content";
import Finale from "./Finale";

/** 마지막 — 가운데 한 칸이 "딱" 들어가면 블록이 흩어지고 이 카드가 떠오른다. 그 한 칸이 당신 자리 */
export default function Cta() {
  return (
    <section id="go" className="px-4 sm:px-6 pt-[18svh] sm:pt-[22svh] pb-16 sm:pb-24 min-h-[100svh] flex flex-col justify-center">
      <Finale>
      <div className="panel finale-card mx-auto max-w-3xl p-6 sm:p-10 md:p-12">
        <p className="mono-label">Start</p>
        <h2 className="mt-3 text-2xl sm:text-3xl md:text-[2.15rem] font-extrabold tracking-[-0.02em] leading-[1.2] text-ink break-keep">
          마지막 한 칸은 당신 자리입니다
        </h2>
        <p className="mt-3 max-w-[42ch] text-base sm:text-lg leading-relaxed text-ink-2 break-keep">
          방금 들어간 한 칸처럼, 딱 맞는 자리에서 시작합니다. 처음부터여도, 진단부터여도, 하루짜리 외전이어도 됩니다.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/downloads" className="btn-primary">강의 자료 받기</Link>
          <Link href="/course" className="btn-ghost">수강생 복습 페이지</Link>
          <Link href="/workbook" className="btn-ghost">실습서</Link>
        </div>
      </div>
      </Finale>

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
