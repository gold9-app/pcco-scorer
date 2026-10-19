"use client";

import { useEffect, useRef } from "react";

/**
 * 스크롤 상태를 ref 로 들고 있는다 (매 프레임 읽히므로 state 가 아님).
 *  hero   0→1 : [data-hero] 구간. 노트북이 닫히며 위로 빠진다
 *  beats       : [data-beat] 섹션들의 문서 기준 top. i 번째 비트 = i 번째 블록 (강의 19 + 마지막 한 칸)
 */
export interface ScrollInfo {
  y: number;
  vw: number;
  vh: number;
  heroEnd: number;
  hero: number;
  beats: number[];
  pointer: { x: number; y: number };
}

export function useScrollProgress() {
  const info = useRef<ScrollInfo>({ y: 0, vw: 1, vh: 1, heroEnd: 1, hero: 0, beats: [], pointer: { x: 0, y: 0 } });

  useEffect(() => {
    const i = info.current;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const update = () => {
      i.y = window.scrollY;
      i.hero = clamp01(i.y / Math.max(1, i.heroEnd));
    };
    const measure = () => {
      i.vw = window.innerWidth;
      i.vh = window.innerHeight;
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      i.heroEnd = Math.max(1, (hero?.offsetHeight ?? i.vh * 1.8) - i.vh);
      const y = window.scrollY;
      i.beats = Array.from(document.querySelectorAll<HTMLElement>("[data-beat]")).map((el) => el.getBoundingClientRect().top + y);
      update();
    };
    const onPointer = (e: PointerEvent) => {
      i.pointer.x = (e.clientX / i.vw) * 2 - 1;
      i.pointer.y = (e.clientY / i.vh) * 2 - 1;
    };

    measure();
    const t = setTimeout(measure, 800);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return info;
}

/** i 번째 비트의 낙하 진행도 — 섹션 top 이 뷰포트 78% 지점에 닿으면 시작, 0.5vh 더 내리면 착지 */
export function beatProgress(info: ScrollInfo, i: number): number {
  const top = info.beats[i];
  if (top === undefined) return 0;
  const start = top - info.vh * 0.78;
  return Math.min(1, Math.max(0, (info.y - start) / (info.vh * 0.5)));
}

export function smoothstep(v: number, a: number, b: number) {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
