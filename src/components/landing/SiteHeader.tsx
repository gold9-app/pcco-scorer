"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { heroContent, contact } from "@/data/content";
import { PIECE_COUNT } from "@/components/three/tetris";

const NAV = [
  ["#about", "소개"],
  ["#for", "대상"],
  ["#journey", "배우는 것"],
  ["#method", "방식"],
  ["#instructor", "강사"],
  ["#faq", "FAQ"],
] as const;

/**
 * 고정 헤더 — 표지가 걷힌 뒤 나타난다. G9 마크 · 섹션 앵커 · 연락하기 · 복습 · 자료실(수강생 비밀번호).
 * 아래 진행선 + "블록 n / 20" — 뒤에서 쌓이는 블록이 "읽은 만큼 채워진다"는 뜻이 되게 (TetrisWell 과 같은 식).
 */
export default function SiteHeader() {
  const [shown, setShown] = useState(false);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const show = () => setShown(true);
    if (!document.body.dataset.cover) show();
    window.addEventListener("cover:gone", show);
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProg(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("cover:gone", show);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const blocks = Math.min(PIECE_COUNT, Math.floor(prog * PIECE_COUNT + 0.02));

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-30 ${shown ? "site-header-in" : ""}`} aria-hidden={!shown}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <a href="#about" className="flex items-baseline gap-2 text-ink">
          <span className="text-xl font-black tracking-[-0.06em] glow-text">{heroContent.handle}</span>
          <span className="hidden sm:inline text-xs text-ink-3">{heroContent.title}</span>
        </a>
        <nav className="hidden md:flex items-center gap-1" aria-label="섹션">
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="px-3 py-1.5 rounded-full text-sm text-ink-2 hover:text-ink hover:bg-white/5 transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline mono-label tabular-nums" title="읽은 만큼 블록이 쌓입니다">
            {String(blocks).padStart(2, "0")} / {PIECE_COUNT}
          </span>
          {/* .btn-* 가 display 를 정하므로 반응형 숨김은 감싸는 span 에 */}
          <span className="hidden sm:inline-flex"><a href="#contact" className="btn-primary min-h-[38px] px-4 text-sm">연락하기</a></span>
          <span className="sm:hidden"><a href={contact.tel} className="btn-primary min-h-[38px] px-4 text-sm">전화</a></span>
          <span className="hidden lg:inline-flex"><Link href="/course" className="btn-ghost min-h-[38px] px-4 text-sm">복습</Link></span>
          <span className="hidden lg:inline-flex"><Link href="/downloads" className="btn-ghost min-h-[38px] px-4 text-sm">자료실</Link></span>
        </div>
      </div>
      <div className="site-progress" style={{ transform: `scaleX(${prog})` }} aria-hidden />
    </header>
  );
}
