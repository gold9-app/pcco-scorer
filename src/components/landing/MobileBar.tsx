"use client";

import { useEffect, useState } from "react";
import ContactCta from "./ContactCta";

/** 폰 하단 고정 연락 바 — 표지가 걷힌 뒤. 마무리 카드가 보이는 동안은 숨긴다 (겹침 방지) */
export default function MobileBar() {
  const [shown, setShown] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  useEffect(() => {
    const show = () => setShown(true);
    if (!document.body.dataset.cover) show();
    window.addEventListener("cover:gone", show);
    const end = document.getElementById("go");
    let io: IntersectionObserver | undefined;
    if (end) {
      io = new IntersectionObserver(([e]) => setAtEnd(e.isIntersecting), { threshold: 0.2 });
      io.observe(end);
    }
    return () => {
      window.removeEventListener("cover:gone", show);
      io?.disconnect();
    };
  }, []);
  return (
    <div className={`mobile-bar sm:hidden fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 ${shown && !atEnd ? "mobile-bar-in" : ""}`} aria-hidden={!shown || atEnd}>
      <div className="panel px-3 py-2 flex items-center justify-between gap-3">
        <p className="text-xs text-ink-2 break-keep">수강 문의 · 시작점 상담</p>
        <ContactCta compact />
      </div>
    </div>
  );
}
