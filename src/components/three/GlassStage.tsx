"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { Leva } from "leva";
import { Loader } from "@react-three/drei";

// three.js 는 브라우저 전용 — 서버 렌더링에서 제외
const Stage = dynamic(() => import("./Stage"), { ssr: false });

// 조절값 패널은 넓은 화면(또는 ?dev)에서만 — 폰에서 검은 바가 떠 있지 않게
const subscribe = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
const getShowLeva = () => window.innerWidth >= 1024 || window.location.search.includes("dev");
const getServerShowLeva = () => false;

/** 페이지 뒤 고정 3D 무대 + 로더 + (개발용) 조절값 패널 */
export default function GlassStage() {
  const showLeva = useSyncExternalStore(subscribe, getShowLeva, getServerShowLeva);
  return (
    <>
      <Stage />
      <Loader
        containerStyles={{ background: "#eef3f7" }}
        barStyles={{ background: "#0e8c94", height: 3 }}
        dataStyles={{ color: "#141414", fontSize: 12, fontFamily: "inherit" }}
        dataInterpolation={(p) => `${p.toFixed(0)}%`}
      />
      <Leva collapsed hidden={!showLeva} titleBar={{ title: "3D 조절값", filter: false }} />
    </>
  );
}
