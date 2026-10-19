"use client";

import { useEffect, useState } from "react";
import { heroContent } from "@/data/content";

/**
 * 히어로 — 스크롤 연출 구간의 DOM 쪽.
 * 높이 190svh 의 빈 구간 위에 100svh 가 sticky 로 붙어 있고, 3D 는 그 뒤(GlassStage)에서 이 구간의 진행도로 움직인다.
 * 노트북은 페이지가 열리면 스스로 열려 메시지를 보여주고, 스크롤하면 닫히며 위로 빠진다.
 * 글은 두 줄뿐: 왼쪽 위 시리즈 이름, 아래 "스크롤" 안내. 핵심 메시지는 노트북 화면 안에 뜬다.
 */
export default function HeroSection() {
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const onScroll = () => setHint(window.scrollY < 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section data-hero className="relative h-[190svh]" aria-label="소개">
      <div className="pointer-events-none sticky top-0 h-[100svh] min-h-[560px]">
        <div className="absolute inset-0 flex flex-col justify-between px-5 py-5 sm:px-8 sm:py-7">
          <div>
            <p className="text-sm font-semibold text-ink">{heroContent.title}</p>
            <p className="text-xs text-ink-3 mt-0.5">강사 {heroContent.instructor}</p>
          </div>
          <div className={`flex items-center gap-3 text-xs text-ink-3 transition-opacity duration-500 ${hint ? "opacity-100" : "opacity-0"}`}>
            <span className="scroll-dot" aria-hidden />
            <span>스크롤하면 시작합니다</span>
          </div>
        </div>
        {/* 화면 리더용 — 3D 안의 메시지와 같은 글 */}
        <h1 className="sr-only">{heroContent.subtitle}</h1>
        <p className="sr-only">{heroContent.tagline}</p>
      </div>
    </section>
  );
}
