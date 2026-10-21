import type { ReactNode } from "react";

/**
 * 유리 패널 — 랜딩의 모든 섹션이 쓰는 하나의 그릇.
 * 뒤에서 빛 블록이 차오르므로 패널은 어두운 유리 + 블러로 글을 지킨다.
 * 작은 모노스페이스 라벨 → 제목 → 리드 → 본문.
 */
export default function Panel({
  id,
  label,
  title,
  lead,
  wide = false,
  children,
}: {
  id?: string;
  label?: string;
  title: string;
  lead?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-4 sm:px-6 py-8 sm:py-12">
      <div className={`panel mx-auto ${wide ? "max-w-5xl" : "max-w-3xl"} p-6 sm:p-10 md:p-12`}>
        <header className="mb-8 sm:mb-10 max-w-[40ch]">
          {label && <p className="mono-label">{label}</p>}
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-[2.15rem] font-extrabold tracking-[-0.02em] leading-[1.2] break-keep text-ink">
            {title}
          </h2>
          {lead && <p className="mt-3 text-base sm:text-lg leading-relaxed text-ink-2 break-keep">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
