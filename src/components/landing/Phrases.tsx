import { Fragment } from "react";
import { keepDots } from "@/lib/text";

/**
 * 짧은 강조문의 의도한 줄바꿈 — 문장 안 `\n` 을 "끊어도 되는 자리"로 바꾼다.
 * 조각마다 inline-block 이라 한 줄에 다 들어가면 이어 붙고, 안 들어가면 반드시 이 자리에서 끊긴다
 * (조각 가운데에서 먼저 끊기지 않는다). 조각 하나가 줄보다 길면 그 조각 안에서만 고르게(balance) 접힌다.
 *
 * hard: 데스크톱(≥1024px)에서는 `\n` 을 지금처럼 항상 끊는다 — 웹 레이아웃은 그대로 두고 폰·태블릿만 바꿀 때.
 * 긴 본문 문단(.lead/.body)에는 쓰지 않는다 — 폰에서 짧은 줄이 늘어난다(측정: 2026-10-23). 본문은 자연 줄바꿈.
 */
export default function Phrases({ text, hard = false }: { text: string; hard?: boolean }) {
  const parts = keepDots(text).split("\n");
  if (parts.length === 1) return <>{parts[0]}</>;
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className={hard ? "phrase phrase-hard" : "phrase"}>{p}</span>
        </Fragment>
      ))}
    </>
  );
}
