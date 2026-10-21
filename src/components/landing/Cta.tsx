import Link from "next/link";
import { heroContent, contact } from "@/data/content";
import ContactCta from "./ContactCta";
import Finale from "./Finale";

/** 마지막 — 가운데 한 칸이 "딱" 들어가면 블록이 흩어지고 이 카드가 떠오른다. 그 한 칸이 당신 자리 → 연락하기 */
export default function Cta() {
  return (
    <section id="go" className="px-4 sm:px-6 pt-[18svh] sm:pt-[22svh] pb-16 sm:pb-24 min-h-[100svh] flex flex-col justify-center">
      <Finale>
        <div className="panel finale-card mx-auto max-w-3xl p-6 sm:p-10 md:p-12">
          <p className="mono-label">Your seat</p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-[2.4rem] font-extrabold tracking-[-0.02em] leading-[1.2] text-ink break-keep">
            마지막 한 칸은 당신 자리입니다
          </h2>
          <p className="mt-3 max-w-[42ch] text-base sm:text-lg leading-relaxed text-ink-2 break-keep">
            방금 들어간 한 칸처럼, 딱 맞는 자리에서 시작합니다. 전화든 메일이든 한 줄이면 됩니다 — 지금 쓰는 AI 수준과 하고 싶은 일.
          </p>
          <ContactCta className="mt-8" />
          <p className="mt-4 text-xs text-ink-3">
            {contact.phone} · {contact.email}
          </p>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="text-ink-3">이미 수강 중이신가요?</span>
            <Link href="/course" className="text-ink-2 hover:text-accent underline-offset-4 hover:underline">복습 페이지</Link>
            <Link href="/downloads" className="text-ink-2 hover:text-accent underline-offset-4 hover:underline">강의 자료실</Link>
            <Link href="/workbook" className="text-ink-2 hover:text-accent underline-offset-4 hover:underline">실습서</Link>
          </div>
        </div>
      </Finale>

      <footer className="panel mx-auto max-w-3xl mt-8 sm:mt-10 px-5 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-2">
        <p>{heroContent.title} — {heroContent.handle} {heroContent.instructor}</p>
        <nav className="flex gap-4">
          <a href={contact.mailto} className="hover:text-ink">{contact.email}</a>
          <Link href="/downloads" className="hover:text-ink">자료실</Link>
          <Link href="/course" className="hover:text-ink">복습</Link>
        </nav>
      </footer>
    </section>
  );
}
