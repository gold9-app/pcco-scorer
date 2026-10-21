"use client";

import { useEffect, useRef, useState } from "react";
import { heroContent } from "@/data/content";

/**
 * 표지 — 로고 → 입자 → 노트북 → 메시지까지는 "한 장의 페이지". 스크롤이 아니라 클릭으로 다음(상세 소개)으로 넘어간다.
 *   · 떠 있는 동안 문서 스크롤을 잠그고 본문(main .landing-body)은 숨긴다 (body[data-cover])
 *   · 노트북 메시지가 다 뜨면(3D 가 'hero:ready') 들어가기 버튼이 나타난다
 *   · 클릭 → 'hero:enter' (3D 가 흩어진다) → 1.1초 뒤 표지가 걷히고 본문이 떠오른다
 */
export default function Cover() {
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<"cover" | "leaving" | "gone">("cover");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const onReady = () => setReady(true);
    window.addEventListener("hero:ready", onReady);
    return () => window.removeEventListener("hero:ready", onReady);
  }, []);

  useEffect(() => {
    if (phase === "gone") return;
    document.body.dataset.cover = phase;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [phase]);

  // 떠나는 중 → 1.1초 뒤 완전히 걷힌다 (타이머는 이 단계에서만 산다)
  useEffect(() => {
    if (phase === "leaving") {
      timer.current = window.setTimeout(() => setPhase("gone"), 1100);
      return () => {
        if (timer.current) window.clearTimeout(timer.current);
      };
    }
    if (phase === "gone") {
      delete document.body.dataset.cover;
      window.dispatchEvent(new CustomEvent("cover:gone"));
    }
  }, [phase]);

  const enter = () => {
    if (!ready || phase !== "cover") return;
    setPhase("leaving");
    window.dispatchEvent(new CustomEvent("hero:enter"));
  };

  if (phase === "gone") return null;

  return (
    <div
      className={`cover fixed inset-0 z-20 flex flex-col justify-between px-5 py-5 sm:px-8 sm:py-7 ${phase === "leaving" ? "cover-leaving" : ""}`}
      onClick={enter}
      role="presentation"
    >
      <div className="pointer-events-none">
        <p className="text-sm font-semibold text-ink">{heroContent.title}</p>
        <p className="text-xs text-ink-3 mt-0.5">{heroContent.handle} · {heroContent.instructor}</p>
      </div>
      {/* 화면 리더용 — 3D 안의 메시지와 같은 글 */}
      <h1 className="sr-only">{heroContent.subtitle}</h1>
      <p className="sr-only">{heroContent.tagline}</p>

      <div className="flex justify-center pb-2 sm:pb-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            enter();
          }}
          aria-hidden={!ready}
          tabIndex={ready ? 0 : -1}
          className={`cover-enter btn-ghost gap-3 px-6 min-h-[52px] text-sm sm:text-base transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <span className="scroll-dot" aria-hidden />
          강의 소개 보기
          <span aria-hidden className="text-ink-3">↓</span>
        </button>
      </div>
    </div>
  );
}
