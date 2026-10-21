"use client";

import dynamic from "next/dynamic";

import ScreenMessage from "./ScreenMessage";

// three.js 는 브라우저 전용 — 서버 렌더링에서 제외
const Stage = dynamic(() => import("./Stage"), { ssr: false });

/** 페이지 뒤 고정 3D 무대. 외부 에셋이 없어 로더는 필요 없다 */
export default function GlassStage() {
  return (
    <>
      <Stage />
      {/* 글 기둥 뒤를 어둡게 — 블록은 좌우 여백에서만 지나간다 */}
      <div className="stage-vignette" aria-hidden />
      <ScreenMessage />
    </>
  );
}
