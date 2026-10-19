# Cloudflare 배포 가이드

이 사이트는 **정적 파일**(`next build` → `out/`)을 Cloudflare Workers의 Static Assets 모드로 서빙합니다.
서버 코드·환경 변수·DB 없음. GitHub `master` 푸시가 곧 배포입니다.

> 2026-10-19 Railway(Node 서버 + 채점기)에서 이관. 이전 구성은 git 태그 `scorer-last` 참고.

---

## 구성 요소

| 파일 | 역할 |
|---|---|
| `next.config.ts` | `output: "export"` · `images.unoptimized` — 순수 정적 빌드 |
| `wrangler.jsonc` | Worker 이름(`pcco-landing`) · `assets.directory = ./out` · 404 처리 |
| `public/_redirects` | `/workbook/:slug` → `/workbooks/:slug` (200 rewrite) |
| `scripts/inject-sw-version.ts` | `postbuild` — `out/sw.js` 에 빌드 타임스탬프 주입 (PWA 캐시 갱신용) |

### Cloudflare 프로젝트 설정 (Workers & Pages → pcco-landing → 설정 → 빌드)

| 항목 | 값 |
|---|---|
| 연결 저장소 | `gold9-app/pcco-scorer` |
| 프로덕션 브랜치 | `master` |
| 빌드 명령 | `npm run build` |
| 배포 명령 | `npx wrangler deploy` |
| 환경 변수 | `NODE_VERSION=22` |
| 미리보기 빌드 | 켬 — 비 master 브랜치 푸시 시 미리보기 URL 생성 |

---

## 일상 배포 흐름

```bash
git push origin master      # → Cloudflare 자동 빌드 (약 1~2분) → 배포
```

배포 확인: `https://pcco-landing.kumgoo0913.workers.dev/sw.js` 의 `BUILD_VERSION` 값이 바뀌면 새 빌드가 반영된 것.

### 미리보기 (디자인 작업 등)

```bash
git checkout -b feat/something
git push -u origin feat/something   # → 미리보기 URL (Cloudflare 배포 탭에서 확인)
```

확인 후 `master` 에 머지하면 프로덕션 반영.

---

## 로컬에서 Cloudflare 런타임으로 확인

```bash
npm run build          # out/ 생성
npx wrangler dev       # http://127.0.0.1:8787
```

`wrangler dev` 는 `_redirects` 규칙과 404 처리까지 실제 Cloudflare와 동일하게 동작하므로,
실습서 주소(`/workbook/performance`)나 자료실 다운로드를 배포 전에 검증할 때 사용.

---

## 주의사항

### `_redirects` 목적지에 `.html` 을 붙이지 말 것

Cloudflare 는 `.html` 확장자를 주소에서 자동으로 떼는 규칙이 있어, 목적지를 `/workbooks/:slug.html` 로 쓰면 **308 리다이렉트**가 발생해 주소창이 바뀐다.
`/workbooks/:slug` 로 쓰면 Cloudflare 가 `workbooks/{slug}.html` 을 알아서 찾는다. (2026-10-19 발견)

### `public/sw.js` 는 플레이스홀더를 유지할 것

`BUILD_VERSION = "BUILD_TIMESTAMP_PLACEHOLDER"` 가 원본이다. `postbuild` 가 `out/sw.js` 에만 실제 값을 쓴다.
원본에 숫자가 박혀 있으면 배포마다 PWA 캐시 이름이 안 바뀌어 설치한 사용자가 옛 화면을 보게 된다.

### 정적 export 한계

- `rewrites()` · `redirects()` · API Route · 서버 컴포넌트의 런타임 `fs` 접근 — **모두 불가** (빌드 시점 `fs` 는 가능)
- 서버 기능이 필요해지면 `wrangler.jsonc` 에 `main` 을 추가해 Worker 코드를 붙이거나, OpenNext 어댑터로 전환

### Windows 에서 `out/` 삭제가 EPERM 으로 실패할 때

`wrangler dev` 의 자식 프로세스(`workerd.exe`)가 폴더를 잡고 있는 경우. 작업 관리자에서 `workerd` 종료 후 재시도.

---

## Worker 이름·주소 변경

- `workers.dev` 서브도메인(`kumgoo0913`)은 **계정 전체** 공용 — 바꾸면 같은 계정의 다른 Worker 주소와 설치된 PWA 도 함께 바뀜
- Worker 이름(`pcco-landing`)은 이름 변경 불가 — `wrangler.jsonc` 의 `name` 을 바꾸고 Cloudflare 에서 새 프로젝트를 만든 뒤 옛 프로젝트 삭제
- 커스텀 도메인: Cloudflare 에 도메인 등록 → Worker `설정 → 도메인 및 경로` 에서 연결
