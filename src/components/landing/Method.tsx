import { method } from "@/data/content";
import Editorial from "./Editorial";
import Loop from "./diagrams/Loop";

/** 어떻게 진행하나 — 루프 한 장(공식 → 실행 → 고치기) + 규칙 셋 명령문. 설명은 펼쳐서 */
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
      lead={"공식 하나를 배우고, 내 재료로 실행하고, 결과를 보고 고칩니다.\n그 바퀴를 수업 안에서 돌립니다."}
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center">
        <Loop nodes={["공식", "실행", "고치기"]} center="는다" />
        <ol className="rows">
          {method.rules.map((m, i) => (
            <li key={m.title} className="row !py-4 grid gap-1 grid-cols-[3rem_1fr] items-start">
              <span className="text-3xl font-black tracking-[-0.05em] text-accent/80 tabular-nums leading-none">0{i + 1}</span>
              <div>
                <h3 className="h3 text-[1.125rem] sm:text-[1.25rem]">{m.title}</h3>
                <details className="more mt-1.5">
                  <summary>왜</summary>
                  <p className="body mt-2 text-[1rem]">{m.text}</p>
                </details>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Editorial>
  );
}
