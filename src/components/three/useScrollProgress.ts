"use client";

import { useEffect, useRef } from "react";

/**
 * 스크롤 상태를 ref 로 들고 있는다 (매 프레임 읽히므로 state 가 아님).
 *  hero   0→1 : [data-hero] 구간. 입자가 흩어진다
 *  docH        : 문서 전체 높이. 본문(heroEnd → 끝)을 내리는 동안 블록이 고르게 떨어진다 (beatProgress)
 */
export interface ScrollInfo {
  y: number;
  vw: number;
  vh: number;
  heroEnd: number;
  hero: number;
  docH: number;
  pointer: { x: number; y: number };
}

export function useScrollProgress() {
  const info = useRef<ScrollInfo>({ y: 0, vw: 1, vh: 1, heroEnd: 1, hero: 0, docH: 1, pointer: { x: 0, y: 0 } });

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
      i.docH = document.documentElement.scrollHeight;
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

/**
 * i/n 번째 블록의 낙하 진행도 — 본문 스크롤 범위(heroEnd → 문서 끝)를 n 등분해 차례로 떨어진다.
 * 마지막 블록은 바닥(문서 끝)에 닿기 직전에 착지해 우물이 "딱" 완성된다.
 */
export function beatProgress(info: ScrollInfo, i: number, n: number): number {
  const range = Math.max(1, info.docH - info.vh - info.heroEnd);
  const span = info.vh * 0.45;
  const start = info.heroEnd + (i / n) * (range - span);
  return Math.min(1, Math.max(0, (info.y - start) / span));
}

export function smoothstep(v: number, a: number, b: number) {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
