import { learn } from "@/data/content";
import Editorial from "./Editorial";

/** 무엇을 배우나 — 세 단계. 차수·반 없이 "끝나면 남는 능력"으로만 */
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
      <ol className="journey">
        {learn.stages.map((st, i) => (
          <li key={st.name} className="journey-step">
            <span className="journey-dot" aria-hidden />
            <p className="cap">
              <span className="mono-label text-accent mr-2">0{i + 1}</span>
              {st.name}
            </p>
            <h3 className="h3 mt-2">{st.result}</h3>
            <p className="body mt-2">{st.text}</p>
            <p className="cap mt-3 text-accent font-semibold">손에 남는 것 — {st.keep}</p>
          </li>
        ))}
      </ol>
      <p className="body mt-8 pt-6 border-t border-white/10 !max-w-none text-[1rem]">{learn.note}</p>
    </Editorial>
  );
}
