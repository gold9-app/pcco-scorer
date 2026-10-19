import fs from "fs";
import path from "path";

/**
 * Service Worker 파일에 빌드 타임스탬프를 주입 (postbuild)
 *
 * public/sw.js 의 BUILD_TIMESTAMP_PLACEHOLDER 는 그대로 두고,
 * next build 가 out/ 으로 복사한 out/sw.js 에만 실제 값을 써 넣는다.
 * — 원본을 덮어쓰면 플레이스홀더가 사라져 다음 빌드부터 주입이 무효가 된다 (2026-10-19 발견)
 */
function injectServiceWorkerVersion() {
  const swPath = path.join(process.cwd(), "out", "sw.js");

  if (!fs.existsSync(swPath)) {
    console.error("❌ out/sw.js not found — next build (output: export) 가 먼저 실행되어야 합니다:", swPath);
    process.exit(1);
  }

  let swContent = fs.readFileSync(swPath, "utf-8");

  if (!swContent.includes("BUILD_TIMESTAMP_PLACEHOLDER")) {
    console.error("❌ public/sw.js 에 BUILD_TIMESTAMP_PLACEHOLDER 가 없습니다. 원본이 덮어써진 상태입니다.");
    process.exit(1);
  }

  const buildVersion = Date.now().toString();
  swContent = swContent.replace(/BUILD_TIMESTAMP_PLACEHOLDER/g, buildVersion);
  fs.writeFileSync(swPath, swContent, "utf-8");

  console.log(`✅ Service Worker version injected into out/sw.js: ${buildVersion}`);
}

injectServiceWorkerVersion();
