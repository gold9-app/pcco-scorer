import { faqs } from "@/data/content";
import Editorial from "./Editorial";

/** 자주 묻는 것 — 답을 먼저, 굵게. 펼치면 상세 (네이티브 details: 키보드·스크린리더 그대로) */
export default function Faq() {
  return (
    <Editorial
      id="faq"
      label="FAQ"
      title={
        <>
          묻기 전에, <em>답부터</em>
        </>
      }
      lead="자주 묻는 여섯 가지. 한 줄 답을 먼저, 자세한 건 펼쳐서."
    >
      <div className="rows">
        {faqs.map((f) => (
          <details key={f.question} className="faq group row">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block body !max-w-none text-[1rem]">{f.question}</span>
                <span className="mt-1 block h3">{f.short}</span>
              </span>
              <span aria-hidden className="faq-mark mt-2 shrink-0" />
            </summary>
            <p className="body mt-3">{f.answer}</p>
          </details>
        ))}
      </div>
    </Editorial>
  );
}
