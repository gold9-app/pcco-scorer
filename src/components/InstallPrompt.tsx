"use client";

import { useState, useEffect } from "react";

const DISMISS_KEY = "r-pcco-install-dismissed";
const VISIT_COUNT_KEY = "r-pcco-visit-count";

/** Chromium 전용 이벤트 — 표준 타입이 없어 직접 적는다 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 이미 dismiss했거나 설치됨 확인
    if (localStorage.getItem(DISMISS_KEY) === "true") {
      return;
    }

    // 이미 설치된 경우
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    ) {
      return;
    }

    // beforeinstallprompt 이벤트 캐치
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // 방문 횟수 카운트
    const visitCount = parseInt(
      localStorage.getItem(VISIT_COUNT_KEY) || "0",
      10
    );
    const newVisitCount = visitCount + 1;
    localStorage.setItem(VISIT_COUNT_KEY, newVisitCount.toString());

    // 3번째 방문 또는 첫 방문 후 30초 후 표시
    // (효과 안에서 바로 setState 하지 않도록 한 틱 미룬다)
    let t: number | undefined;
    if (newVisitCount >= 3) {
      t = window.setTimeout(() => setShowPrompt(true), 0);
    } else if (newVisitCount === 1) {
      t = window.setTimeout(() => setShowPrompt(true), 30000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (t) window.clearTimeout(t);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setShowPrompt(false);
  };

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 sm:max-w-sm animate-in slide-in-from-bottom-4">
      <div className="panel p-4 flex items-center gap-4" role="dialog" aria-label="앱으로 설치">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/icon-192.png" alt="" width={56} height={56} className="rounded-2xl shrink-0" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-ink">G9 를 홈 화면에</p>
          <p className="cap mt-0.5 break-keep">앱처럼 바로 열립니다 — 복습·자료실·실습서</p>
          <div className="flex gap-2 mt-3">
            <button type="button" onClick={handleInstall} className="btn-primary min-h-[40px] px-4 text-sm">
              설치
            </button>
            <button type="button" onClick={handleDismiss} className="btn-ghost min-h-[40px] px-4 text-sm">
              나중에
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
