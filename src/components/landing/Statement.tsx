/** 풀블리드 문장 — 패널 없이 화면 가득. 섹션 사이 숨 고르기 */
export default function Statement({ label, children, sub }: { label?: string; children: React.ReactNode; sub?: string }) {
  return (
    <section className="px-5 sm:px-8 py-[14svh] sm:py-[18svh]" data-reveal>
      <div className="mx-auto max-w-5xl">
        {label && <p className="mono-label">{label}</p>}
        <p className="mt-4 max-w-[18ch] text-[2.2rem] sm:text-[3.4rem] md:text-[4.4rem] font-black tracking-[-0.04em] leading-[1.05] text-ink break-keep glow-text">
          {children}
        </p>
        {sub && <p className="lead mt-7">{sub}</p>}
      </div>
    </section>
  );
}
