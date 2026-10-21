import ContactCta from "./ContactCta";

/** 본문 중간의 연락 패널 — 여정을 다 본 사람이 바로 손을 뻗을 수 있게. 헤더 "연락하기" 의 목적지(#contact) */
export default function ContactBlock() {
  return (
    <section id="contact" className="px-4 sm:px-6 py-8 sm:py-12" data-reveal>
      <div className="panel contact-panel mx-auto max-w-5xl p-6 sm:p-10 md:p-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="mono-label">Contact</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] leading-[1.2] text-ink break-keep">
            어디서 시작할지 모르겠다면, 먼저 연락 주세요
          </h2>
          <p className="mt-3 max-w-[40ch] text-base sm:text-lg leading-relaxed text-ink-2 break-keep">
            지금 쓰는 AI 수준과 하고 싶은 일을 한 줄로 보내 주시면 맞는 시작점을 알려드립니다. 기업·단체 출강도 같은 번호로.
          </p>
        </div>
        <ContactCta />
      </div>
    </section>
  );
}
