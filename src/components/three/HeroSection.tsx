"use client";

import { ChevronDown } from "lucide-react";
import { heroContent } from "@/data/content";
import { useStage } from "./stageStore";

/**
 * 히어로 — 3D 노트북이 서 있는 첫 화면의 DOM 쪽.
 * 캔버스는 뒤(GlassStage)에 고정돼 있고, 이 섹션은 그 위에 글만 얹는다.
 * pointer-events-none 이라 탭·드래그가 캔버스로 간다.
 * 핵심 메시지는 노트북 화면 안(Laptop 의 Html)에 뜬다 — 여기엔 타이틀과 안내만.
 */
export default function HeroSection() {
  const { open } = useStage();

  return (
    <section className="pointer-events-none relative h-[100svh] min-h-[560px] w-full">
      <div className="absolute inset-0 flex flex-col justify-between px-5 py-5 sm:px-8 sm:py-7">
        <div>
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-text-muted">
            {heroContent.title}
          </p>
          <p className="text-[11px] sm:text-xs text-text-dim mt-1">강사 {heroContent.instructor}</p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <p
            className={`text-sm sm:text-base text-text-secondary break-keep max-w-sm transition-opacity duration-700 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {heroContent.motto}
          </p>
          <p className="text-[11px] sm:text-xs text-text-muted whitespace-nowrap">
            {open ? "스크롤해서 내려가기 · 드래그로 돌리기" : "노트북을 탭해서 열기"}
          </p>
        </div>
      </div>

      <div
        className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-text-dim transition-opacity duration-700 ${
          open ? "opacity-70 animate-bounce" : "opacity-0"
        }`}
      >
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}
