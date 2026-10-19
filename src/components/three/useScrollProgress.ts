"use client";

import { useEffect, useRef } from "react";

/**
 * 스크롤 상태를 ref 로 들고 있는다 (매 프레임 읽히므로 state 가 아님).
 *  hero    0→1 : [data-hero] 구간. 뚜껑 열림 → 메시지 → 화면이 다가와 뷰포트를 채운다
 *  content 0→1 : 히어로가 끝난 지점 → 문서 끝. 유리 테트리스가 화면을 채운다
 */
export interface ScrollInfo {
  y: number;
  vw: number;
  vh: number;
  heroEnd: number; // 히어로 스크롤 구간 길이 (px) = heroHeight - vh
  docEnd: number; // 스크롤 가능한 끝 (px) = scrollHeight - vh
  hero: number;
  content: number;
  pointer: { x: number; y: number }; // -1~1, 노트북 패럴랙스용
}

export function useScrollProgress() {
  const info = useRef<ScrollInfo>({
    y: 0, vw: 1, vh: 1, heroEnd: 1, docEnd: 1, hero: 0, content: 0, pointer: { x: 0, y: 0 },
  });

  useEffect(() => {
    const i = info.current;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const update = () => {
      i.y = window.scrollY;
      i.hero = clamp01(i.y / Math.max(1, i.heroEnd));
      i.content = clamp01((i.y - i.heroEnd) / Math.max(1, i.docEnd - i.heroEnd));
    };
    const measure = () => {
      i.vw = window.innerWidth;
      i.vh = window.innerHeight;
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      i.heroEnd = Math.max(1, (hero?.offsetHeight ?? i.vh * 2) - i.vh);
      i.docEnd = Math.max(i.heroEnd + 1, document.documentElement.scrollHeight - i.vh);
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

/** 구간 [a, b] 안에서의 0~1 (부드러운 양끝) */
export function smoothstep(v: number, a: number, b: number) {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
