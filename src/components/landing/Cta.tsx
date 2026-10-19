import Link from "next/link";
import { heroContent } from "@/data/content";

/** 마지막 — 양옆·뒤의 유리가 다 찬 자리. 버튼 둘, 그 아래 작은 푸터 */
export default function Cta() {
  return (
    <section id="go" className="px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24">
      <div className="panel mx-auto max-w-3xl p-6 sm:p-10 md:p-12">
        <h2 className="text-2xl sm:text-3xl md:text-[2.15rem] font-extrabold tracking-[-0.02em] leading-[1.2] text-ink break-keep">
          시작점을 고르셨나요
        </h2>
        <p className="mt-3 max-w-[40ch] text-base sm:text-lg leading-relaxed text-ink-2 break-keep">
          한 줄에서 시작해도, 진단에서 시작해도, 외전 하루로 시작해도 됩니다.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/downloads" className="btn-primary">강의 자료 받기</Link>
          <Link href="/course" className="btn-ghost">수강생 복습 페이지</Link>
        </div>
      </div>

      <footer className="mx-auto max-w-3xl mt-10 sm:mt-14 px-2 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-3">
        <p>{heroContent.title} — 강사 {heroContent.instructor}</p>
        <nav className="flex gap-4">
          <Link href="/downloads" className="hover:text-ink">자료실</Link>
          <Link href="/workbook" className="hover:text-ink">실습서</Link>
          <Link href="/course" className="hover:text-ink">복습</Link>
        </nav>
      </footer>
    </section>
  );
}
