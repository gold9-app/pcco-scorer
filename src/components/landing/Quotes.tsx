import { quotes } from "@/data/content";

/** 관통하는 문장들 — 강의마다 남는 한 줄 */
export default function Quotes() {
  return (
    <section id="quotes" className="px-4 sm:px-6 py-8 sm:py-12" aria-label="관통하는 문장">
      <ul className="mx-auto max-w-5xl grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quotes.map((q, i) => (
          <li key={q.courseId} className="panel p-6 sm:p-7">
            <p className="mono-label">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-3 text-base sm:text-lg font-bold leading-snug text-ink break-keep">“{q.text}”</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
