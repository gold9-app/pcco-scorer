import { audiences } from "@/data/content";
import Editorial from "./Editorial";
import { IconBook, IconBriefcase, IconFreelance, IconHome } from "./diagrams/Icons";

const ICONS = { worker: IconBriefcase, freelancer: IconFreelance, homemaker: IconHome, student: IconBook } as const;

/**
 * 누구를 위한 강의인가 — 4분면. 직장인(주 대상)이 큰 칸.
 * 칸마다 아이콘 + 이름 + 대사 한 줄. 예제는 펼쳐서(탭) — 호버 없음, 폰에서 같은 정보.
 */
export default function ForWhom() {
  return (
    <Editorial
      id="for"
      label="For whom"
      title={
        <>
          같은 공식,{"\n"}<em>내 일</em>에 맞춘 예제
        </>
      }
      lead={"직장인을 기준으로 설계했고,\n프리랜서·주부·학생은 같은 공식을 각자의 일로 연습합니다.\n처음 보는 분을 기준으로 진행합니다."}
    >
      <ul className="quad">
        {audiences.map((a) => {
          const Icon = ICONS[a.id as keyof typeof ICONS];
          return (
            <li key={a.id} className={`quad-cell ${a.main ? "quad-main" : ""}`}>
              <div className="flex items-center gap-3">
                <span className={`quad-icon ${a.main ? "text-accent" : "text-ink-3"}`}>
                  <Icon />
                </span>
                <p className="text-[1.0625rem] font-bold text-ink">
                  {a.name}
                  {a.main && <span className="ml-2 mono-label text-accent">주 대상</span>}
                </p>
              </div>
              <p className={`mt-3 font-bold text-ink break-keep leading-snug ${a.main ? "text-[1.25rem] sm:text-[1.5rem]" : "text-[1.0625rem]"}`}>“{a.quote}”</p>
              {a.main && <p className="body mt-3 !max-w-[44ch]">{a.after}</p>}
              <details className="more mt-4">
                <summary>{a.main ? "예제 보기" : "끝나면 · 예제"}</summary>
                <div className="mt-3">
                  {!a.main && <p className="body text-[1rem] !max-w-none">{a.after}</p>}
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {a.examples.map((x) => (
                      <li key={x} className="chip min-h-[32px] px-3 text-[0.8125rem]">{x}</li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </Editorial>
  );
}
