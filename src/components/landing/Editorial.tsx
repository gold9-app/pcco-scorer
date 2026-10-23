import type { ReactNode } from "react";
import { keepDots } from "@/lib/text";

/**
 * 에디토리얼 섹션 — 한 화면, 한 문장.
 * 왼쪽: 라벨 · 큰 헤드라인(H2, 핵심 구절은 <em>) · 리드 — 넓은 화면에선 스크롤 중 고정
 * 오른쪽: 내용 — 박스 안 박스 없이 행(.rows)·열(.cols3)로
 * 층위는 셋뿐: .sec-h2 · .body/.lead · .cap
 */
export default function Editorial({
  id,
  label,
  title,
  lead,
  aside,
  children,
}: {
  id?: string;
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** 리드 아래 작은 보조 요소 (버튼 등) */
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-4 sm:px-6 py-8 sm:py-12 scroll-mt-20" data-reveal>
      <div className="panel mx-auto max-w-6xl p-6 sm:p-10 md:p-14">
        <div className="ed">
          <header className="ed-left">
            {label && <p className="mono-label">{label}</p>}
            <h2 className="sec-h2 mt-3">{title}</h2>
            {lead && <p className="lead mt-5">{typeof lead === "string" ? keepDots(lead) : lead}</p>}
            {aside && <div className="mt-6">{aside}</div>}
          </header>
          <div className="ed-right min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
