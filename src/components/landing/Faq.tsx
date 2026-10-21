import { faqs } from "@/data/content";
import Panel from "./Panel";

/** 자주 묻는 것 — 답을 먼저, 굵게. 펼치면 상세 (네이티브 details: 키보드·스크린리더 그대로) */
export default function Faq() {
  return (
    <Panel id="faq" label="FAQ" title="묻기 전에, 답부터">
      <div className="divide-y divide-white/10">
        {faqs.map((f) => (
          <details key={f.question} className="faq group py-4 first:pt-0 last:pb-0">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block text-sm sm:text-base text-ink-2 break-keep">{f.question}</span>
                <span className="mt-1 block text-base sm:text-lg font-bold text-ink break-keep">{f.short}</span>
              </span>
              <span aria-hidden className="faq-mark mt-2 shrink-0" />
            </summary>
            <p className="mt-3 max-w-[60ch] text-sm sm:text-base text-ink-2 leading-relaxed break-keep">{f.answer}</p>
          </details>
        ))}
      </div>
    </Panel>
  );
}
