import ContactCta from "./ContactCta";
import Editorial from "./Editorial";

/** 본문 중간의 연락 패널 — 여정을 다 본 사람이 바로 손을 뻗을 수 있게. 헤더 "연락하기" 의 목적지(#contact) */
export default function ContactBlock() {
  return (
    <div className="contact-wrap">
      <Editorial
        id="contact"
        label="Contact"
        title={
          <>
            어디서 시작할지는, <em>10분</em>이면 정해집니다
          </>
        }
        lead="지금 쓰는 AI 수준과 하고 싶은 일, 두 줄이면 됩니다. 1차·10차 진단·개인 맞춤 강의 중 맞는 시작점을 바로 알려드립니다. 기업·단체 출강도 같은 번호로."
      >
        <ContactCta className="lg:mt-2" />
      </Editorial>
    </div>
  );
}
