"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { perf } from "./perf";

/** 탭이 숨으면 렌더 정지 · 30fps 미만이 3초 이어지면 perf.low */
export default function PerfGuard() {
  const setFrameloop = useThree((s) => s.setFrameloop);
  const acc = useRef({ t: 0, n: 0, slowFor: 0 });

  useEffect(() => {
    const onVis = () => setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [setFrameloop]);

  useFrame((_, dt) => {
    if (perf.low) return;
    const a = acc.current;
    a.t += dt;
    a.n++;
    if (a.t >= 1) {
      const fps = a.n / a.t;
      a.slowFor = fps < 30 ? a.slowFor + a.t : 0;
      a.t = 0;
      a.n = 0;
      if (a.slowFor >= 3) perf.low = true;
    }
  });
  return null;
}
