"use client";

import { useEffect, useRef } from "react";

/**
 * 스크롤 상태를 ref 로 들고 있는다 (매 프레임 읽히므로 state 가 아님).
 *  entered     : 표지(Cover)에서 "들어가기"를 눌렀나 — 'hero:enter' 이벤트. 노트북이 흩어지고 본문이 열린다
 *  hero   0→1 : 표지 퇴장 진행도 (시간 기반, Laptop 이 entered 를 보고 부드럽게 올린다)
 *  docH        : 문서 전체 높이. 본문(heroEnd → 끝)을 내리는 동안 블록이 고르게 떨어진다 (beatProgress)
 */
export interface ScrollInfo {
  y: number;
  vw: number;
  vh: number;
  heroEnd: number;
  hero: number;
  entered: boolean;
  docH: number;
  pointer: { x: number; y: number };
}

export function useScrollProgress() {
  const info = useRef<ScrollInfo>({ y: 0, vw: 1, vh: 1, heroEnd: 0, hero: 0, entered: false, docH: 1, pointer: { x: 0, y: 0 } });

  useEffect(() => {
    const i = info.current;
    const update = () => {
      i.y = window.scrollY;
    };
    const measure = () => {
      i.vw = window.innerWidth;
      i.vh = window.innerHeight;
      // 표지는 문서 흐름 밖(fixed)이라 본문은 0 부터 시작한다. [data-hero] 가 있으면 그 높이만큼 뒤로
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      i.heroEnd = hero ? Math.max(0, hero.offsetHeight - i.vh) : 0;
      i.docH = document.documentElement.scrollHeight;
      update();
    };
    const onEnter = () => {
      i.entered = true;
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
    window.addEventListener("hero:enter", onEnter);
    return () => {
      window.removeEventListener("hero:enter", onEnter);
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
