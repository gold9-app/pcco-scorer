"use client";

import { useEffect, useRef } from "react";

/**
 * 스크롤 위치 + 섹션 앵커(data-drop) 위치를 ref 로 들고 있는다.
 * 매 프레임 읽혀야 해서 React state 가 아니라 ref — 리렌더 없이 useFrame 에서 참조한다.
 */
export interface ScrollInfo {
  /** 현재 window.scrollY (px) */
  y: number;
  /** 뷰포트 높이 (px) */
  vh: number;
  /** 뷰포트 너비 (px) */
  vw: number;
  /** data-drop 섹션들의 문서 기준 top (px), 순서대로 */
  anchors: number[];
}

export function useScrollProgress() {
  const info = useRef<ScrollInfo>({ y: 0, vh: 1, vw: 1, anchors: [] });

  useEffect(() => {
    const measure = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-drop]"));
      const scrollY = window.scrollY;
      info.current.anchors = els.map((el) => el.getBoundingClientRect().top + scrollY);
      info.current.vh = window.innerHeight;
      info.current.vw = window.innerWidth;
      info.current.y = scrollY;
    };
    const onScroll = () => {
      info.current.y = window.scrollY;
    };

    measure();
    // 폰트·이미지 로드로 레이아웃이 밀리는 경우를 위해 한 번 더
    const t = setTimeout(measure, 800);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return info;
}

/**
 * i 번째 섹션(data-drop)에 대한 낙하 진행도 0~1.
 * 섹션 top 이 뷰포트 85% 지점에 닿으면 떨어지기 시작해 0.55vh 만큼 더 내리면 착지.
 */
export function dropProgress(info: ScrollInfo, i: number): number {
  const top = info.anchors[i];
  if (top === undefined) return 0;
  const start = top - info.vh * 0.85;
  const span = info.vh * 0.55;
  return Math.min(1, Math.max(0, (info.y - start) / span));
}
