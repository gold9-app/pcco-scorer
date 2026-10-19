# AI 활용 실전 시리즈 — 강의 랜딩·자료실·실습서

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Cloudflare](https://img.shields.io/badge/Cloudflare_Workers-Static-F38020?logo=cloudflare)
![License](https://img.shields.io/badge/License-MIT-yellow)

AI 프롬프트 강의 시리즈(정금구)의 **강의 소개 랜딩 + 복습 섹션 + 강의 자료실 + 온라인 실습서**입니다.
서버 없이 정적 파일만으로 동작하며 Cloudflare Workers(Static Assets)에서 서빙됩니다.

## 🔗 Live

🚀 **https://pcco-landing.kumgoo0913.workers.dev**

## 📄 페이지

| 주소 | 내용 |
|---|---|
| `/` | 강의 소개 랜딩 — 1~18차 + 외전 전 차수 복습 섹션 (`src/data/content.ts` 기반) |
| `/downloads` | 강의 자료실 — 차수별 슬라이드·워크시트·실습 키트 다운로드 |
| `/workbook` | 실습서 목록 · `/workbook/{slug}` 실습서 본문 (단일 HTML) |
| `/install` | PWA 설치 안내 |

## 🛠️ 기술 스택

- **Frontend**: Next.js 16 (App Router, `output: "export"`), TypeScript 5, Tailwind CSS 4, shadcn/ui, Framer Motion
- **Hosting**: Cloudflare Workers — Static Assets 모드 (`wrangler.jsonc`), GitHub `master` 푸시 시 자동 빌드·배포
- **PWA**: 수동 구현 Service Worker (`public/sw.js`), 빌드마다 버전 자동 주입

외부 API·DB·환경 변수 **없음**. 빌드 결과물(`out/`)이 전부입니다.

> 2026-10-19 이전에는 Railway 위에서 Claude API + Supabase 기반 **AI 채점기**(`/practice`, `/host`, `/play`)를 함께 운영했습니다.
> 채점기는 제거되었으며, 마지막 상태는 git 태그 **`scorer-last`** 로 보존되어 있습니다. (`git checkout scorer-last`)

## 🚀 로컬 실행

```bash
npm install
npm run dev        # http://localhost:3000
```

### 정적 빌드 + Cloudflare 런타임으로 확인

```bash
npm run build      # out/ 생성 (postbuild 에서 sw.js 버전 주입)
npx wrangler dev   # http://127.0.0.1:8787 — _redirects 까지 실제 동작
```

## 📦 배포

`master` 브랜치에 푸시하면 Cloudflare가 자동으로 `npm run build` → `npx wrangler deploy` 를 실행합니다.
다른 브랜치에 푸시하면 미리보기 URL이 생성됩니다. 상세는 [`docs/DEPLOY.md`](docs/DEPLOY.md).

## 📂 프로젝트 구조

```
src/
  app/
    page.tsx               # 랜딩 (CourseDetail 을 차수별로 수동 마운트)
    downloads/page.tsx     # 자료실 — 빌드 시 public/downloads 실제 파일 읽어 용량 계산
    workbook/page.tsx      # 실습서 목록 — public/workbooks/{slug}.html 존재 시만 노출
    install/page.tsx       # PWA 설치 안내
    layout.tsx · globals.css
  components/
    Hero · WhatYouLearn · FrameworkCards · CourseDetail · FAQ · CTA · …   # 랜딩
    ResourceLibrary.tsx    # 자료실 UI
    WorkbookShelf.tsx      # 실습서 목록 UI
    ServiceWorkerRegister · InstallPrompt · UpdateNotification          # PWA
    ui/                    # shadcn/ui
  data/
    content.ts             # 강의 콘텐츠 (courses · frameworks · courseDetails)
    resources.ts           # 자료실 메타데이터
    workbooks.ts           # 실습서 메타데이터
public/
  _redirects               # Cloudflare 라우팅: /workbook/:slug → /workbooks/:slug
  downloads/c01~c18, x1/   # 자료실 파일 (ASCII 파일명, 다운로드 시 한글명)
  workbooks/{slug}.html    # 실습서 (자체 CSS·JS·암호화 포함 단일 HTML)
  sw.js · manifest.json · offline.html · icons/
scripts/
  inject-sw-version.ts     # postbuild — out/sw.js 에 빌드 타임스탬프 주입
  generate-icons.ts        # PWA 아이콘 생성
wrangler.jsonc             # Cloudflare Workers 설정 (assets.directory = out)
next.config.ts             # output: "export"
```

## ➕ 콘텐츠 추가

- **새 강의**: `src/data/content.ts` 의 `courses` · `frameworks` · `courseDetails` 에 추가 후, `src/app/page.tsx` 에 `<CourseDetail courseId="course-N" />` **수동 마운트** (빠뜨리기 쉬움)
- **자료실**: `public/downloads/cNN/` 에 수강생용 파일만 ASCII 이름으로 복사 → `src/data/resources.ts` 그룹 추가
- **실습서**: `public/workbooks/{slug}.html` 복사 → `src/data/workbooks.ts` 항목 추가

자세한 규칙·히스토리는 [`CLAUDE.md`](CLAUDE.md) 참고.

## 📚 문서

- [`CLAUDE.md`](CLAUDE.md) — 프로젝트 규칙 · 차수별 반영 히스토리 · 콘텐츠 추가 가이드
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — Cloudflare 배포 가이드
- `docs/DEVELOPMENT.md` · `docs/OPERATIONS.md` · `docs/*_채점_루브릭.md` · `docs/supabase_schema.sql` — **구 채점기 시절 문서** (참고용으로 보존)

## 📄 라이선스

MIT License

---

**Made with ❤️ for "AI 활용 실전 시리즈" 강의**
