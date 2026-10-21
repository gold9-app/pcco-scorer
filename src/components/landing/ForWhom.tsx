import { audiences } from "@/data/content";
import Editorial from "./Editorial";

/**
 * 누구를 위한 강의인가 — 대상 넷. 직장인이 주 대상(첫 줄, 넓게).
 * 각 대상: 지금 하는 말 → 끝나면 하는 일 → 예제 셋
 */
export default function ForWhom() {
  const [main, ...others] = audiences;
  return (
    <Editorial
      id="for"
      label="For whom"
      title={
        <>
          같은 공식, <em>내 일</em>에 맞춘 예제
        </>
      }
      lead="직장인을 기준으로 설계했고, 프리랜서·주부·학생은 같은 공식을 각자의 일로 연습합니다. 처음 보는 분을 기준으로 진행합니다."
    >
      <div className="rows">
        <div className="row">
          <p className="cap">
            <span className="mono-label text-accent">주 대상</span> · {main.name}
          </p>
          <p className="h3 mt-2">“{main.quote}”</p>
          <p className="body mt-3 !max-w-[46ch]">{main.after}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="예제">
            {main.examples.map((x) => (
              <li key={x} className="chip min-h-[30px] px-3 text-[0.8125rem]">{x}</li>
            ))}
          </ul>
        </div>
        {others.map((a) => (
          <div key={a.id} className="row grid gap-2 sm:grid-cols-[6.5rem_1fr]">
            <p className="text-[1.0625rem] font-bold text-ink">{a.name}</p>
            <div>
              <p className="text-[1.0625rem] font-bold text-ink-2 break-keep leading-snug">“{a.quote}”</p>
              <p className="body mt-2 !max-w-[46ch] text-[1rem]">{a.after}</p>
              <p className="cap mt-2 break-keep">예: {a.examples.join(" · ")}</p>
            </div>
          </div>
        ))}
      </div>
    </Editorial>
  );
}
