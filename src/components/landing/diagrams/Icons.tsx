/** 라인 아이콘 — 선 1.5px, currentColor. 대상 4분면용 */
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function IconBriefcase({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" className={className} aria-hidden {...base}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18" />
    </svg>
  );
}
export function IconFreelance({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" className={className} aria-hidden {...base}>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4M7 12l2-2 2 2 3-4 3 3" />
    </svg>
  );
}
export function IconHome({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" className={className} aria-hidden {...base}>
      <path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6" />
    </svg>
  );
}
export function IconBook({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" className={className} aria-hidden {...base}>
      <path d="M4 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H4zM20 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z" />
    </svg>
  );
}
