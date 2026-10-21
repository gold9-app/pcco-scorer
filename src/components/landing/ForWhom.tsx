import { entryPoints } from "@/data/content";
import Editorial from "./Editorial";

/** 누구를 위한 강의인가 — 대사 → 처방 한 줄(시작점 · 소요 · 첫 변화) */
export default function ForWhom() {
  return (
    <Editorial
      id="for"
      label="For whom"
      title={
        <>
          지금 이 말을 하고 있다면, <em>시작점</em>이 있습니다
        </>
      }
      lead="AI를 처음 쓰는 분부터 Claude Code를 써 본 분까지 — 세 곳 중 한 곳에서 시작합니다."
    >
      <ul className="rows">
        {entryPoints.map((e) => (
          <li key={e.courseId} className="row">
            <p className="h3">“{e.quote}”</p>
            <p className="body mt-2">{e.description}</p>
            <p className="mt-4 text-[1.0625rem] font-bold text-ink break-keep">
              <span className="text-accent">→ {e.start}</span> · {e.rx}
            </p>
          </li>
        ))}
      </ul>
    </Editorial>
  );
}
