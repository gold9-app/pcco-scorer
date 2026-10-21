import { contact } from "@/data/content";

/**
 * 연락하기 — 1차 전환. 전화·이메일 두 버튼 (한 번에 이어지는 링크: tel: / mailto:)
 * compact: 헤더·하단 바용 (아이콘+짧은 글), 아니면 번호·주소를 그대로 보여준다 (외워 적을 수 있게)
 */
export default function ContactCta({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a href={contact.tel} className="btn-primary min-h-[40px] px-4 text-sm">전화</a>
        <a href={contact.mailto} className="btn-ghost min-h-[40px] px-4 text-sm">이메일</a>
      </div>
    );
  }
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a href={contact.tel} className="btn-primary px-6 gap-3">
        <span className="mono-label" style={{ color: "rgba(6, 17, 15, 0.7)" }}>Tel</span>
        <span className="tabular-nums tracking-wide">{contact.phone}</span>
      </a>
      <a href={contact.mailto} className="btn-ghost px-6 gap-3">
        <span className="mono-label">Mail</span>
        <span className="tracking-wide">{contact.email}</span>
      </a>
    </div>
  );
}
