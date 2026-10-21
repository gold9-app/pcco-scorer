import { method } from "@/data/content";
import Editorial from "./Editorial";

/** 어떻게 진행하나 — 규칙 셋. 큰 번호 + 마침표 찍힌 명령문 + 왜 */
export default function Method() {
  return (
    <Editorial
      id="method"
      label="Method"
      title={
        <>
          강의가 아니라, <em>훈련</em>입니다
        </>
      }
      lead="세 가지 규칙으로 진행합니다. 들은 것이 아니라 남은 것으로 셉니다."
    >
      <ol className="rows">
        {method.rules.map((m, i) => (
          <li key={m.title} className="row grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-start">
            <span className="text-4xl sm:text-5xl font-black tracking-[-0.05em] text-accent/80 tabular-nums leading-none">0{i + 1}</span>
            <div>
              <h3 className="h3 text-[1.375rem] sm:text-[1.5rem]">{m.title}</h3>
              <p className="body mt-2">{m.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Editorial>
  );
}
