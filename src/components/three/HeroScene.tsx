"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Leva } from "leva";
import { Loader } from "@react-three/drei";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { heroContent } from "@/data/content";

// three.js 는 브라우저 전용 — 서버 렌더링에서 제외
const Scene = dynamic(() => import("./Scene"), { ssr: false });

/**
 * 히어로 — 유리 노트북이 열리며 시작하는 첫 화면.
 * 캔버스 위에 최소한의 글만 얹는다: 타이틀 · 헤드라인 · 안내 한 줄.
 * 글 레이어는 pointer-events-none 이라 드래그·탭이 캔버스로 간다 (버튼만 예외).
 */
export default function HeroScene() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((v: boolean) => setOpen(v), []);

  const light = theme === "light";

  return (
    <section
      className={`relative h-[100svh] min-h-[560px] w-full overflow-hidden transition-colors duration-500 ${
        light ? "bg-[#f3f1ec] text-[#141414]" : "bg-[#0a0a0c] text-[#f4f2ee]"
      }`}
    >
      {/* 3D */}
      <Scene theme={theme} onOpenChange={onOpenChange} />
      <Loader
        containerStyles={{ background: light ? "#f3f1ec" : "#0a0a0c" }}
        barStyles={{ background: "#f08a5d", height: 3 }}
        dataStyles={{ color: light ? "#141414" : "#f4f2ee", fontSize: 12, fontFamily: "inherit" }}
        dataInterpolation={(p) => `${p.toFixed(0)}%`}
      />

      {/* 글 레이어 */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-5 py-5 sm:px-8 sm:py-7">
        {/* 상단 — 타이틀 · 테마 토글 */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase opacity-70">
              {heroContent.title}
            </p>
            <p className="text-[11px] sm:text-xs opacity-50 mt-1">강사 {heroContent.instructor}</p>
          </div>
          <button
            type="button"
            onClick={() => setTheme(light ? "dark" : "light")}
            aria-label={light ? "다크 배경으로" : "밝은 배경으로"}
            className={`pointer-events-auto inline-flex items-center justify-center w-11 h-11 rounded-full border transition-colors ${
              light ? "border-black/10 hover:bg-black/5" : "border-white/15 hover:bg-white/10"
            }`}
          >
            {light ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

        {/* 하단 — 헤드라인 · 안내 */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8">
          <div className="max-w-xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.2] tracking-tight break-keep">
              {heroContent.subtitle}
            </h1>
            <p className="mt-3 text-sm sm:text-base opacity-70 break-keep max-w-md">{heroContent.tagline}</p>
          </div>
          <p className="text-[11px] sm:text-xs opacity-60 whitespace-nowrap">
            {open ? "탭해서 닫기" : "탭해서 열기"} · 드래그로 돌리기
          </p>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 opacity-40 animate-bounce">
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* 조절값 패널 — "값 고정" 단계에서 제거 */}
      <Leva collapsed={false} titleBar={{ title: "3D 조절값", filter: false }} />
    </section>
  );
}
