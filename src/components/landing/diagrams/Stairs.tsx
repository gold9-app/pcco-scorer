import type React from "react";

/**
 * 계단 — 블록 3개가 아래부터 쌓인다 (뒤의 테트리스와 같은 언어). HTML 이라 글자 크기가 폰에서도 그대로.
 * 섹션이 보이면([data-in]) 아래 칸부터 차례로 켜진다.
 * 폰(≤480px)에서는 세로 칸이 66px 로 좁아 이름이 깨지므로("설계하는 / 법") 길어지는 가로 막대 셋으로 바뀐다 — globals.css .stairs
 */
export default function Stairs({ stages }: { stages: { name: string; result: string; keep: string }[] }) {
  const n = stages.length;
  return (
    <ol className="stairs" aria-label="배우는 순서">
      {stages.map((s, i) => (
        <li
          key={s.name}
          className={`stair ${i === n - 1 ? "stair-top" : ""}`}
          style={{ height: `${7 + i * 3.25}rem`, animationDelay: `${0.15 + i * 0.25}s`, ["--i" as string]: i } as React.CSSProperties}
        >
          <span className="mono-label text-accent">0{i + 1}</span>
          <span className="stair-name">{s.name}</span>
          <span className="stair-keep">{s.keep}</span>
        </li>
      ))}
    </ol>
  );
}
