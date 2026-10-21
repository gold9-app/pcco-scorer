import { learn } from "@/data/content";
import Editorial from "./Editorial";
import Stairs from "./diagrams/Stairs";

/** 무엇을 배우나 — 계단 한 장 + 단계마다 결과 한 줄. 긴 설명은 펼쳐서 */
export default function Journey() {
  return (
    <Editorial
      id="journey"
      label="What you learn"
      title={
        <>
          시키는 법에서 <em>설계하는 법</em>까지
        </>
      }
      lead={learn.lead}
    >
      <Stairs stages={learn.stages} />
      <ol className="rows mt-6">
        {learn.stages.map((st, i) => (
          <li key={st.name} className="row !py-4 grid gap-1 sm:grid-cols-[2.5rem_1fr]">
            <span className="mono-label text-accent pt-1">0{i + 1}</span>
            <div>
              <p className="cap">{st.name}</p>
              <h3 className="h3 mt-1 text-[1.125rem] sm:text-[1.25rem]">{st.result}</h3>
              <details className="more mt-2">
                <summary>자세히</summary>
                <p className="body mt-2 text-[1rem]">{st.text}</p>
              </details>
            </div>
          </li>
        ))}
      </ol>
      <p className="cap mt-6 pt-5 border-t border-white/10 break-keep">{learn.note}</p>
    </Editorial>
  );
}
