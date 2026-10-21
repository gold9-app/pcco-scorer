"use client";

import { useEffect, useState } from "react";
import { quotes } from "@/data/content";

/** 관통하는 문장 — 카드 여섯 장 대신 한 줄씩 천천히 바뀐다 (4초). 점을 누르면 바로 이동 */
export default function Quotes() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % quotes.length), 4000);
    return () => window.clearInterval(t);
  }, [paused]);
  return (
    <section id="quotes" className="px-5 sm:px-8 py-[12svh] sm:py-[16svh]" aria-label="관통하는 문장" data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto max-w-5xl">
        <p className="mono-label">Through-line</p>
        <div className="relative mt-5 min-h-[7.5rem] sm:min-h-[9rem]">
          {quotes.map((q, k) => (
            <p
              key={q.courseId}
              aria-hidden={k !== i}
              className={`quote-line absolute inset-x-0 top-0 max-w-[22ch] text-[1.6rem] sm:text-[2.4rem] md:text-[3rem] font-extrabold tracking-[-0.03em] leading-[1.18] text-ink break-keep ${k === i ? "quote-line-in" : ""}`}
            >
              “{q.text}”
            </p>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2" role="tablist" aria-label="문장 선택">
          {quotes.map((q, k) => (
            <button
              key={q.courseId}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={`${k + 1}번째 문장`}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-3 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
          <span className="ml-3 mono-label tabular-nums">{String(i + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
