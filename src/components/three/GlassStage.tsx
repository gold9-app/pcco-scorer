"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { Leva } from "leva";

import ScreenMessage from "./ScreenMessage";

// three.js 는 브라우저 전용 — 서버 렌더링에서 제외
const Stage = dynamic(() => import("./Stage"), { ssr: false });

// 조절값 패널은 넓은 화면(또는 ?dev)에서만 — 폰에서 검은 바가 떠 있지 않게
const subscribe = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
const getShowLeva = () => window.innerWidth >= 1024 || window.location.search.includes("dev");
const getServerShowLeva = () => false;

/** 페이지 뒤 고정 3D 무대 + (개발용) 조절값 패널. 외부 에셋이 없어 로더는 필요 없다 */
export default function GlassStage() {
  const showLeva = useSyncExternalStore(subscribe, getShowLeva, getServerShowLeva);
  return (
    <>
      <Stage />
      {/* 글 기둥 뒤를 어둡게 — 블록은 좌우 여백에서만 지나간다 */}
      <div className="stage-vignette" aria-hidden />
      <ScreenMessage />
      <Leva collapsed hidden={!showLeva} titleBar={{ title: "3D 조절값", filter: false }} />
    </>
  );
}
