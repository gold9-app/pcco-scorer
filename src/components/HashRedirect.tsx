"use client";

import { useEffect } from "react";

/**
 * 옛 복습 앵커 호환 — /#course-11 처럼 공유된 링크를 /course/course-11 로 보낸다.
 * 서버 규칙(_redirects)은 URL 해시를 볼 수 없으므로 클라이언트에서 처리한다.
 */
export default function HashRedirect() {
  useEffect(() => {
    const m = /^#(course-\d+|extra-\d+)$/.exec(window.location.hash);
    if (m) window.location.replace(`/course/${m[1]}`);
  }, []);
  return null;
}
