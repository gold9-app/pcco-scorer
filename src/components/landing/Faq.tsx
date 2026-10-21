import { faqs } from "@/data/content";
import Panel from "./Panel";

/** 자주 묻는 것 — 네이티브 details 로 접고 펼친다 (키보드·스크린리더 그대로 동작) */
export default function Faq() {
  return (
    <Panel id="faq" label="FAQ" title="자주 묻는 것">
      <div className="divide-y divide-white/10">
        {faqs.map((f) => (
          <details key={f.question} className="faq group py-4 first:pt-0 last:pb-0">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base sm:text-lg font-semibold text-ink break-keep [&::-webkit-details-marker]:hidden">
              <span>{f.question}</span>
              <span aria-hidden className="faq-mark mt-1 shrink-0" />
            </summary>
            <p className="mt-3 max-w-[60ch] text-sm sm:text-base text-ink-2 leading-relaxed break-keep">{f.answer}</p>
          </details>
        ))}
      </div>
    </Panel>
  );
}
