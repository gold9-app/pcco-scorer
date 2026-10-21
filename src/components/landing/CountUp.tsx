"use client";

import { useEffect, useRef, useState } from "react";

/** 숫자 카운트업 — "19회" 같은 문자열에서 숫자만 0 → 값으로 센다. 뷰포트에 들어올 때 한 번 */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const m = value.match(/^([\d,]+)(.*)$/);
  const target = m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
  const suffix = m ? m[2] : value;
  const comma = !!m && m[1].includes(",");
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 900;
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / dur);
          setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return (
    <span ref={ref} className={className}>
      {m ? (comma ? n.toLocaleString("ko-KR") : n) : value}
      {m ? suffix : ""}
    </span>
  );
}
