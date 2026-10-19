"use client";

import dynamic from "next/dynamic";
import { Leva } from "leva";
import { Loader } from "@react-three/drei";

// three.js 는 브라우저 전용 — 서버 렌더링에서 제외
const Stage = dynamic(() => import("./Stage"), { ssr: false });

/** 페이지 뒤 고정 3D 무대 + 로더 + (개발용) 조절값 패널 */
export default function GlassStage() {
  return (
    <>
      <Stage />
      <Loader
        containerStyles={{ background: "#eef3f7" }}
        barStyles={{ background: "#f08a5d", height: 3 }}
        dataStyles={{ color: "#141414", fontSize: 12, fontFamily: "inherit" }}
        dataInterpolation={(p) => `${p.toFixed(0)}%`}
      />
      {/* 조절값 패널 — "값 고정" 단계에서 제거 */}
      <Leva collapsed titleBar={{ title: "3D 조절값", filter: false }} />
    </>
  );
}
