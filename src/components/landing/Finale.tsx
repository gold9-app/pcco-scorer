"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * 마무리 카드의 그릇 — 무대(TetrisWell)가 마지막 블록을 끼워 넣으면 'well:complete' 를 쏘고,
 * 그때 카드가 떠오른다 (되돌려 올리면 'well:reset' 으로 다시 숨는다).
 * 3D 가 없는 환경(reduced-motion·WebGL 실패)에서도 글은 읽혀야 하므로 2.5초 뒤엔 그냥 보여준다.
 */
export default function Finale({ children }: { children: ReactNode }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const on = () => setShown(true);
    const off = () => setShown(false);
    window.addEventListener("well:complete", on);
    window.addEventListener("well:reset", off);
    return () => {
      window.removeEventListener("well:complete", on);
      window.removeEventListener("well:reset", off);
    };
  }, []);
  return (
    <div className="finale" data-shown={shown ? "true" : "false"}>
      {children}
    </div>
  );
}
