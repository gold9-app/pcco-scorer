"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { contact } from "@/data/content";

/**
 * 연락하기 — 1차 전환. 전화·이메일 두 버튼.
 *   폰(터치)  : 전화 = tel: 바로 발신 · 이메일 = mailto:
 *   PC(포인터): 전화 = 번호 복사(PC 는 전화를 걸 앱이 없는 경우가 많다) · 이메일 = mailto: + 주소 복사 보조 버튼
 * compact: 헤더·하단 바용 (짧은 글)
 */

const mq = "(hover: hover) and (pointer: fine)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(mq);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const getIsPointer = () => window.matchMedia(mq).matches;
const getServerIsPointer = () => false;

function useCopy() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);
  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setMsg(`${label} 복사됐습니다 — ${text}`);
    } catch {
      setMsg(`${label}: ${text}`);
    }
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(null), 2600);
  };
  return { msg, copy };
}

/** 복사 알림 — 비어 있어도 aria-live 영역은 남겨 둔다 (스크린리더가 변화를 읽도록) */
function Toast({ msg }: { msg: string | null }) {
  return msg ? (
    <p className="copy-toast" role="status" aria-live="polite">
      {msg}
    </p>
  ) : (
    <span className="sr-only" role="status" aria-live="polite" />
  );
}

export default function ContactCta({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const isPointer = useSyncExternalStore(subscribe, getIsPointer, getServerIsPointer);
  const { msg, copy } = useCopy();

  if (compact) {
    return (
      <div className={`relative flex items-center gap-2 ${className}`}>
        {isPointer ? (
          <button type="button" onClick={() => copy(contact.phone, "전화번호")} className="btn-primary min-h-[40px] px-4 text-sm">전화번호 복사</button>
        ) : (
          <a href={contact.tel} className="btn-primary min-h-[40px] px-4 text-sm">전화</a>
        )}
        <a href={contact.mailto} className="btn-ghost min-h-[40px] px-4 text-sm">이메일</a>
        <Toast msg={msg} />
      </div>
    );
  }

  return (
    <div className={`relative grid gap-3 sm:grid-cols-2 ${className}`}>
      <div>
        {isPointer ? (
          <button type="button" onClick={() => copy(contact.phone, "전화번호")} className="btn-primary w-full px-6 gap-3" title="클릭하면 번호가 복사됩니다">
            <span className="mono-label" style={{ color: "rgba(6, 17, 15, 0.7)" }}>Tel</span>
            <span className="tabular-nums tracking-wide">{contact.phone}</span>
            <span className="text-[0.8125rem] font-semibold" style={{ color: "rgba(6, 17, 15, 0.7)" }}>복사</span>
          </button>
        ) : (
          <a href={contact.tel} className="btn-primary w-full px-6 gap-3">
            <span className="mono-label" style={{ color: "rgba(6, 17, 15, 0.7)" }}>Tel</span>
            <span className="tabular-nums tracking-wide">{contact.phone}</span>
          </a>
        )}
        <p className="mt-2 cap break-keep">{isPointer ? "누르면 번호가 복사됩니다 · " : ""}{contact.telNote}</p>
      </div>
      <div>
        <a href={contact.mailto} className="btn-ghost w-full px-6 gap-3">
          <span className="mono-label">Mail</span>
          <span className="tracking-wide">{contact.email}</span>
        </a>
        <p className="mt-2 cap break-keep">
          {contact.mailNote}
          {isPointer && (
            <>
              {" · "}
              <button type="button" onClick={() => copy(contact.email, "이메일 주소")} className="copy-link">
                주소 복사
              </button>
            </>
          )}
        </p>
      </div>
      <Toast msg={msg} />
    </div>
  );
}
