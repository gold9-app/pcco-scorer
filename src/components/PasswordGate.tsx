"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { heroContent } from "@/data/content";

/**
 * 수강생 전용 페이지 잠금 — 복습(/course) · 자료실(/downloads).
 *   · 비밀번호는 평문이 아니라 SHA-256 해시로만 들어 있다 (아래 HASH). 바꾸려면 새 비밀번호의 sha256 을 넣는다.
 *   · 맞으면 이 브라우저에 30일 기억 (localStorage) — 수강생이 매번 치지 않게
 *   · 정적 사이트라 "안내문 수준의 잠금"이다: 링크를 아는 사람이 소스를 뒤지면 내용·파일은 볼 수 있다.
 *     진짜로 막아야 하는 것(실습서)은 파일 자체를 암호화한다.
 */
const HASH = "bb421fa35db885ce507b0ef5c3f23cb09c62eb378fae3641c165bdf4c0272949";
const KEY = "g9-gate";
const DAYS = 30;

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

function remembered() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const [h, exp] = raw.split(":");
    return h === HASH && Number(exp) > Date.now();
  } catch {
    return false;
  }
}

export default function PasswordGate({ title, children }: { title: string; children: React.ReactNode }) {
  const [state, setState] = useState<"checking" | "locked" | "open">("checking");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 저장된 기억은 브라우저에만 있으니 마운트 뒤에 읽는다 (서버 렌더와 어긋나지 않게 한 틱 늦춤)
    const t = window.setTimeout(() => setState(remembered() ? "open" : "locked"), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (state === "locked") input.current?.focus();
  }, [state]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = (await sha256(value.trim())) === HASH;
    if (!ok) {
      setError(true);
      setValue("");
      input.current?.focus();
      return;
    }
    try {
      localStorage.setItem(KEY, `${HASH}:${Date.now() + DAYS * 86400000}`);
    } catch {
      /* 저장 못 해도 이번 방문은 연다 */
    }
    setState("open");
  };

  if (state === "open") return <>{children}</>;
  if (state === "checking") return <div className="min-h-screen" aria-busy />;

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-16">
      <form onSubmit={submit} className="gate panel w-full max-w-sm p-7 sm:p-9" aria-labelledby="gate-title">
        <p className="text-2xl font-black tracking-[-0.06em] glow-text">{heroContent.handle}</p>
        <h1 id="gate-title" className="mt-5 text-xl font-bold tracking-tight break-keep">
          {title}
        </h1>
        <p className="mt-2 cap break-keep">강의에서 안내한 비밀번호를 입력하세요.</p>

        <label className="block mt-6">
          <span className="sr-only">비밀번호</span>
          <input
            ref={input}
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder="비밀번호"
            className={`gate-input ${error ? "gate-input-error" : ""}`}
            aria-invalid={error}
            aria-describedby={error ? "gate-error" : undefined}
          />
        </label>
        {error && (
          <p id="gate-error" role="alert" className="mt-2 text-sm" style={{ color: "#ff8a7a" }}>
            비밀번호가 맞지 않습니다
          </p>
        )}

        <button type="submit" className="btn-primary w-full mt-4 min-h-[48px]">
          열기
        </button>
        <p className="mt-5 text-center">
          <Link href="/" className="cap underline-offset-4 hover:underline hover:text-ink">
            강의 소개로 돌아가기
          </Link>
        </p>
      </form>
    </main>
  );
}
