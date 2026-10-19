import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 정적 호스팅 — 빌드 결과가 out/ 에 순수 HTML·JS·CSS 로 떨어진다
  output: "export",

  // 정적 export 에서는 Next 이미지 최적화 서버가 없으므로 원본 그대로 서빙
  images: { unoptimized: true },

  // 실습서 주소(/workbook/{slug} → /workbooks/{slug}.html)는 정적 export 에서 rewrites() 가
  // 동작하지 않으므로 public/_redirects (Cloudflare Pages 규칙 파일) 가 대신 처리한다.
};

export default nextConfig;
