# 랜딩 리디자인 2026-10 — 전체 변경 기록

> 새 세션에서 이 프로젝트를 이어받을 때 **이 문서 하나로 "지금 어디까지, 어떻게" 를 잡을 수 있게** 쓴 기록이다.
> 짧은 요약은 `CLAUDE.md` 상단 배너와 「랜딩 리뉴얼 (2026-10-21)」 절, 배포 절차는 `docs/DEPLOY.md`.
>
> - 기간: 2026-10-19 ~ 10-21 · 브랜치 `design-3d`(31커밋) → `master` fast-forward 병합 · **실배포 완료**
> - 실주소: https://pcco-landing.kumgoo0913.workers.dev (Cloudflare Workers Static Assets, `master` 푸시 = 자동 배포)
> - 직전 상태로 돌아가는 지점: 리뉴얼 전 마지막 `master` = `f0fb954` (리뉴얼 1단계 데이터만 반영된 옛 라이트 랜딩). 채점기까지 되돌리려면 태그 `scorer-last`
> - 작업 기준 저장소: `gold9-app/pcco-scorer` (`origin`). 로컬 `D:\개발\프롬포트 채점`. `personal` 원격은 푸시하지 않는다

---

## 0. 한눈에 — 무엇이 바뀌었나

| 항목 | 전 (f0fb954) | 후 (현재 master) |
|---|---|---|
| 메인 성격 | 강의 **목록·커리큘럼** 중심(19회 차수 나열, 초급/중급 분반 설명) | **처음 보는 사람을 위한 강의 상세·판매 페이지** (차수·반 표현 0, 대상별) |
| 테마 | 라이트(아이스 화이트·유리) | **다크** `#070a0f` + 틸 `#35d9c8` + 금빛 포인트 |
| 첫 화면 | 바로 본문 | **표지**: G9 로고 입자 → 흩어짐 → 빛 입자 노트북 → 화면 메시지 → "강의 소개 보기" 클릭 |
| 배경 연출 | 없음 | 본문 스크롤에 따라 **입자 테트리스 블록 20개**가 아래부터 쌓임 → 마지막 금빛 조각이 "딱" → 흩어지며 마무리 카드 |
| 본문 | 카드 나열 | 편집(에디토리얼) 2단 + **도형**(성장 곡선·계단·4분면·루프·블록 막대) + 의도한 줄바꿈 |
| 1차 전환 | 없음 | **연락하기** T 010-4729-6929 / kumgoo0913@gmail.com — 본문 중간·마무리 카드·폰 하단 바 3곳 |
| 복습·자료실 | 공개 | **수강생 비밀번호 잠금** (30일 기억) |
| 헤더 | 없음 | 고정 헤더: 앵커 6 · 읽기 진행선 · 블록 n/20 · 연락하기 · 복습 · 자료실 |
| PWA | 이름 "AI 활용 실전 시리즈", 파란 아이콘 | 이름 **G9**, G9 로고 아이콘, 다크 설치 카드 |
| 3D 조절 패널 | — | leva 로 조절 후 **제거**, 값은 `sceneConfig.ts` 고정 |

규모: 69파일, +4,105 / −925 줄. 추가 패키지 `three`·`@react-three/fiber`·`@react-three/drei`·`@react-three/postprocessing`·`postprocessing`. 제거 `leva`(및 옛 랜딩 컴포넌트).

---

## 1. 사용자(강사)가 내린 결정 — 순서대로

이 순서가 곧 커밋 순서다. **결정은 모두 확정**이며, 되돌리려면 명시적 지시가 필요하다.

1. 노트북이 자동으로 열리지 않고 글이 안 읽힌다 → 수정. 노트북을 훨씬 키우고 디자인 업그레이드.
2. 레퍼런스 = **adame.ai** 품질. "3D 모델링한 것 같은" 노트북은 거부 → 입자(빛) 로 다시.
3. 방향 **A+B 혼합(입자 → 노트북 실루엣)**, 테마 **다크(검정+빛)**.
4. 메인은 강의 상세 페이지. 19회 커리큘럼·1차/2차 나열은 복습·자료실 몫. 인트로는 강사명 **"G9"** 입자.
5. G9 는 텍스트가 아니라 **업로드한 로고 이미지**(`public/g9-logo.png`, 459×557, 남색 G + 금색 9). 뒤의 테트리스도 입자 블록으로. 마지막에 가운데 블록이 **딱** 맞으면 입자가 흩어지고 **마무리 카드**가 페이지로.
6. 뒤 블록이 너무 화려해 글이 안 읽힘 → 가시성. **메인은 앞의 카드**.
7. 첫 로고 크기 **절반**. 로고→입자→노트북 다음은 **스크롤이 아니라 클릭**으로 — 표지와 상세 페이지가 **분리된 느낌**.
8. 로고 입자를 더 세련되게 (획 순서대로 그려짐, 라인아트, 두 색 보존).
9. 초반 디자인 확정. 페이지 안 UI/UX 업그레이드 방향 제안 → **1차 전환 = 연락하기 (T 010-4729-6929, E kumgoo0913@gmail.com)**.
10. 카드 후킹 부족 → 문장·문단 구조 개선. 사실: **27회 진행, 외전 → "개인 맞춤 강의", 총 2,400분**.
11. 가독성 나쁨(핵심이 안 보임) → 점검·계획 → 실행.
12. **N차·초급·중급 표현 전부 제거.** 대상(학생·주부·프리랜서·직장인) 기준, **메인 타깃 직장인**, 처음 보는 사람 기준.
13. **모바일 최적화 확실히** + 텍스트 대신 도표·그래프·도형 ("가시성을 통해 핵심이 시선과 생각에 박히는 게 가장 중요").
14. 문단 나눔 — 문장 중간에 끊기지 않게 **의도적 줄바꿈**.
15. 전화 버튼: PC 에서는 번호 복사 + 알림, 폰은 바로 발신 ("변경해").
16. 처음 화면이 깨져 보이는 건 dev 서버 전용 현상 — 설명으로 종결. **"3D 조절값" 패널 제거**.
17. **실배포** (`design-3d` → `master`).
18. 복습·자료실 **비밀번호 잠금**(비밀번호는 강사가 지정, 코드에는 해시만). 헤더에 **자료실** 버튼. 앱 아이콘 = G9 로고, 앱 이름 **G9**.

---

## 2. 페이지 구조

```
src/app/page.tsx
<main class="relative z-10">
  <HashRedirect/>          옛 /#course-N 링크 → /course/course-N
  <GlassStage/>            fixed 3D 무대 (Canvas + .stage-vignette + ScreenMessage)
  <Cover/>                 fixed 표지 (z-20) — 떠 있는 동안 body[data-cover]
  <SiteHeader/>            fixed 헤더 (z-30) — cover:gone 뒤 내려옴
  <RevealObserver/>        [data-reveal] 섹션 등장 관찰
  <div class="landing-body pt-14">      ← position:relative; z-index:1 (canvas 위)
    <Pitch/>               #about  Statement(관통 문장) + 지금→끝나면 3쌍 + 성장 곡선 + 숫자 4 (CountUp·BlockBar)
    <ForWhom/>             #for    4분면 — 직장인(큰 칸, 예제 4) · 프리랜서 · 주부 · 학생
    <Journey/>             #journey 계단 3단(시키는 법 → 만드는 법 → 설계하는 법) + "자세히" 접기
    <ContactBlock/>        #contact 연락하기 (1차 전환)
    <Method/>              #method  루프(공식→실행→고치기) + 규칙 3 + "왜" 접기
    <Difference/>          #difference 비교표 4행 + 더 보기 2행
    <Instructor/>          #instructor 주장 한 줄 · 근거 3(영상 자동화 공장·프롬프트 채점기·IG 아카이버) · 숫자 3
    <Quotes/>              관통 문장 6개 4초 교차
    <Faq/>                 #faq 6문답 (한 줄 답 굵게 + 펼치기)
    <Cta/>                 #go  Finale → 마무리 카드(연락 + "이미 수강 중이신가요?" 복습·자료실·실습서) + 푸터
  </div>
  <MobileBar/>             폰 하단 고정 연락 바 (#go 보이면 숨김)
</main>
```

다른 라우트: `/course`(복습 목록) · `/course/[id]`(차수 복습, `CourseDetail.tsx`) · `/downloads`(자료실) · `/workbook`(실습서) — **복습·자료실은 `layout.tsx` 에서 `PasswordGate` 로 감쌈**.

---

## 3. 3D 무대 (`src/components/three/`)

전부 **점(Points) 셰이더**다. 조명·메시 모델·외부 에셋 없음. 카메라는 원점 정면(`CAMERA.distance 7, fov 30`).

| 파일 | 역할 |
|---|---|
| `Stage.tsx` | `<Canvas>`(alpha false, bg `#070a0f`, dpr 1~1.5) + `PerfGuard` + `Laptop` + `TetrisWell` + `EffectComposer/Bloom`(좁은 화면은 `resolutionScale 0.5`) |
| `GlassStage.tsx` | Stage 를 `dynamic(ssr:false)` 로 + `.stage-vignette` + `ScreenMessage` |
| `Particles.tsx` | 입자 36,000(폰 18,000). 상태: **흐름**(Clifford 어트랙터, `buildFlow`) → **로고**(`buildLogo`: 이미지 픽셀 샘플, 윤곽 70% 라인아트, R>B+25 면 금색/아니면 쿨톤, 각도 스윕으로 획 순서 `aTextO`) → **노트북 실루엣**(`buildForm`, 뚜껑은 셰이더에서 `uOpen`·`uHinge` 로 회전) → **흩어짐**(`uBurst`, 우회 `sin(π·fm)`). 시간차 복제 3개(`uTimeOffset`, `uIsTrail`)로 빛 꼬리. `perf.low` 면 꼬리 끔 |
| `Laptop.tsx` | 자세·타이밍의 주인. 매 프레임 `driver {text, form, burst, open, model, ready, pointer}` 를 Particles 에, `screenOverlay.update()` 를 ScreenMessage 에 밀어 넣는다. 타임라인(초, 폰 ×0.75): `textDelay 0.3 → textDuration 2.0 → textHold 1.6 → morphDuration 1.9 (openAt 0.7 부터 뚜껑) → introDuration 1.2`. `openT ≥ 0.95` 에 **`hero:ready`** 발신. 크기 = 뷰포트 너비의 `fillW 0.62`(세로 화면 `fillWPortrait 0.8`), 높이 상한 `fillH 0.6`, 가운데 정렬 후 `restY 0.12` |
| `ScreenMessage.tsx` | 노트북 화면 글(`heroContent.title/subtitle/tagline`). drei `<Html>` 이 React 19 dev 에서 비는 문제 → **CSS3DRenderer 수학을 직접 구현한 DOM 오버레이** (`screenOverlay.update(camera, anchor, size, {show, width 480, distanceFactor 2.2})`) |
| `TetrisWell.tsx` + `tetris.ts` | 블록 **20개**(`PIECE_COUNT`), 칸당 점 220(폰 110, 윤곽 60%·속 40%). 열·행은 `pickWell(vw, vh)` 가 화면 비율로. 조각 i 의 낙하 진행도 = `beatProgress(info, i, 20)`(본문 스크롤 0→1 을 20등분, 아래부터). `finaleOrder` 로 **마지막 조각 = 한가운데, 금빛 `#e0b87c`**. `pr[19] > 0.985` → `uBurst` 로 흩어짐 + **`well:complete`**, 되돌리면 **`well:reset`**. 틴트 4색 무채색 계열, `alpha 0.28`(앞 카드가 주인공) |
| `Cover.tsx` | 표지. 상태 `cover → leaving → gone`. 떠 있는 동안 `body[data-cover]`(스크롤 잠금, `.landing-body` 숨김, 비네트 꺼짐, 블록 안 떨어짐). `hero:ready` 받으면 버튼 "강의 소개 보기" 등장 → 클릭(화면 아무 데나) → **`hero:enter`**(노트북 1.6초 흩어짐) → 1.1초 뒤 `gone` + **`cover:gone`**. `prefers-reduced-motion` 이면 표지 생략 |
| `useScrollProgress.ts` | 스크롤·포인터·`entered`(표지 지났는지)·`docH` 를 ref 로. `beatProgress`, `smoothstep` |
| `PerfGuard.tsx` + `perf.ts` | 탭 숨김 → `frameloop 'never'`, 보이면 `'always'`. 3초 연속 30fps 미만 → `perf.low = true`(꼬리 복제 숨김) |
| `sceneConfig.ts` | **모든 조절값**. leva 패널은 제거됨(2026-10-21 "값 고정"). `useSceneControls.ts` 는 이 값을 그대로 돌려주는 껍데기 |

**이벤트 한 줄 요약**: `hero:ready`(3D→표지 버튼) → `hero:enter`(표지→3D 흩어짐, `entered=true`) → `cover:gone`(표지→헤더·본문·비네트) … 스크롤 … `well:complete`/`well:reset`(테트리스→Finale 마무리 카드).

**코딩 규칙(React Compiler lint 때문)**: `useFrame` 안에서 React state 금지(ref 만) · `useMemo` 로 만든 material 의 uniform 쓰기는 **컴포넌트 밖 헬퍼**(`writeUniforms`) · 효과 안 동기 `setState` 금지(`setTimeout(…, 0)`) · 렌더 중 컴포넌트 정의 금지(`Toast` 는 파일 최상위).

---

## 4. 콘텐츠 데이터 (`src/data/content.ts`)

메인 본문 카피는 **전부 여기**. 컴포넌트에는 문장이 없다.

| export | 쓰는 곳 | 내용 |
|---|---|---|
| `heroContent` | Cover·ScreenMessage·Header | title "AI 활용 실전 시리즈", subtitle "철저하게 내 것으로 만드는 AI 능력", tagline(\n 포함), motto "생각을 구조화하는 사람이 AI를 지배한다", instructor "정금구", handle "G9", stats 4(27회 운영한 강의 · 2,400분 누적 강의 시간 · 15개 평생 쓰는 공식 · 0 요구하는 코딩 경험) |
| `contact` | ContactCta·Header·MobileBar | phone "010-4729-6929", tel "tel:+821047296929", email "kumgoo0913@gmail.com", mailto(제목 "[AI 활용 실전 시리즈] 수강 문의" + 본문 세 칸 템플릿), telNote, mailNote |
| `pitch` | Pitch | lead, headline, points 3 `{now, after, formula}` — "지금 하는 말 → 끝나면 하는 일" 플립 |
| `audiences` | ForWhom | 4개 `{id, name, main?, quote, after, examples[]}` — worker(main) · freelancer · homemaker · student |
| `learn` | Journey | headline, lead, stages 3 `{name, result, text, keep}`(시키는 법/만드는 법/설계하는 법, keep = 공식 3·6·6개), note |
| `method` | Method | headline "강의가 아니라, 훈련입니다", rules 3 `{title, text}` |
| `instructorProfile` | Instructor | handle·name·role·claim·lines 2·evidence 3·facts 3 |
| `comparison` | Difference | headline "요령이 아니라, 공식입니다", left "흔한 AI 강의", right "이 시리즈", rows 6 |
| `faqs` | Faq | 6개 `{question, short, answer}` |
| `quotes` | Quotes | 6문장 |
| `phases`·`courses`·`frameworks`·`courseDetails` | **/course 전용** | 차수 데이터 — 메인에서는 더 이상 쓰지 않는다. `extra-1` label "개인 맞춤 1" |

**카피 원칙**(사용자 지시): ① 처음 보는 사람 기준, 차수·반·회차 단어 금지 ② 대상별 예제(직장인 주 대상) ③ 한 카드 = 지금(취소선) → 끝나면 + 처방 한 줄 ④ 문장 안 `\n` = 의도한 줄바꿈(읽다 끊기는 자리에서만; CSS `white-space: pre-line`) ⑤ 사실 수치는 27회 · 2,400분 · 공식 15개.

`src/data/resources.ts` 의 "외전 1" 라벨도 "개인 맞춤 1" 로.

---

## 5. 디자인·가독성 시스템 (`src/app/globals.css`)

**토큰**: `--ice #070a0f`(배경) · `--ink #f2f5f9` · `--ink-2 #c6cfd8` · `--ink-3 #94a0ad` · `--accent #35d9c8` · `--accent-deep #1fb5a6` · `color-scheme: dark`. (shadcn 의 라이트 `:root` 블록이 위에 남아 있고 아래 블록이 덮어쓴다 — 지우지 말 것, `ui/` 컴포넌트가 참조.)

**층위 3개만**: `.sec-h2`(clamp 32→48px, `text-wrap: balance`, 안의 `em` 은 틸 + `white-space: nowrap`) · `.lead/.body`(17→18px, 행간 1.7, `max-width 40ch`, `pre-line`, `text-wrap: pretty`) · `.cap`(14px) · 보조 `.h3`, `.mono-label`(13px 자간).

**판·구조**: `.panel`(불투명 `#0d121a`, 28px 라운드, 블러 없음 — 블러는 폰 성능·가독성 때문에 뺌) · `Editorial.tsx` 2단(`.ed-left` sticky 제목 / `.ed-right` 내용, 등장 0.25s 지연) · `.rows/.row`(구분선 행) · `.cols3` · `.more`(접기, summary 44px) · `.stage-vignette`(중앙 기둥 뒤 어둡게, 표지 중엔 꺼짐).

**도형**(`components/landing/diagrams/`): `Curve`(성장 곡선 SVG + HTML 라벨) · `Stairs`(HTML 계단, 아래부터 켜짐) · `Loop`(원형 화살표 SVG, `.draw` 대시 애니메이션) · `BlockBar`(숫자 셀) · `Icons`(가방·프리랜서·집·책). 등장 애니메이션은 `[data-in="true"]` 에서만.

**Tailwind 4 함정**: 레이어 없는 커스텀 CSS(`.btn-*` 의 display)가 유틸리티 `hidden` 을 이긴다 → 반응형 숨김은 버튼을 `<span class="hidden lg:inline-flex">` 로 감싼다. `.landing-body { position: relative; z-index: 1 }` 가 없으면 본문이 fixed canvas 아래로 깔린다.

**모바일**: 입자 ½ · 노트북 타임라인 ×0.75 · Bloom 해상도 ½ · 터치 타깃 ≥44px(`≤639px` 버튼 48px, 표지 버튼 56px) · `≤480px` 자연 줄바꿈 · 호버 효과는 `(hover: hover)` 에서만 · `MobileBar` 하단 연락 바.

---

## 6. 연락(1차 전환) — `ContactCta.tsx`

- 3곳: 본문 중간 `#contact`(Editorial) · 마무리 카드 `#go` · 폰 하단 바(compact).
- **터치 기기**: 전화 = `tel:+821047296929`(다이얼 화면), 이메일 = `mailto:`(제목·본문 템플릿).
- **포인터 기기** `(hover: hover) and (pointer: fine)`: 전화 버튼이 `<button>` 으로 바뀌어 **번호 복사 + 알림 "전화번호 복사됐습니다 — 010-4729-6929"**(2.6초, `.copy-toast`), 설명줄 끝에 **"주소 복사"** 텍스트 버튼(`.copy-link`). 클립보드 API 실패 시 알림에 값만 표시.
- 판별은 `useSyncExternalStore(matchMedia)` — SSR 은 터치로 가정.

---

## 7. 수강생 잠금 — `PasswordGate.tsx` (2026-10-21)

- `src/app/course/layout.tsx`·`src/app/downloads/layout.tsx` 가 감싼다 → `/course`, `/course/[id]`, `/downloads` 모두. 직접 URL 도 막힘.
- 비밀번호는 코드에 **SHA-256 해시(`HASH`)만**. 현재 비밀번호는 강사가 지정한 값(채팅 기록에 있음; 문서에는 적지 않는다). 바꾸기: `printf '새비번' | sha256sum` → `HASH` 교체.
- 맞으면 localStorage `g9-gate = "<hash>:<만료 ms>"` 로 **30일 기억**. 복습에서 열면 자료실도 열림.
- 마운트 전엔 빈 화면(`checking`) → 깜빡임 없음. 틀리면 흔들림 + "비밀번호가 맞지 않습니다".
- **한계(사용자에게 고지함)**: 정적 사이트라 안내문 수준. 소스·`public/downloads/*` 직접 링크는 막지 못한다. 진짜 보호는 실습서처럼 파일 암호화.

---

## 8. 헤더·PWA

- `SiteHeader.tsx`: `cover:gone` 뒤 내려옴. 왼쪽 G9 · 가운데 앵커(소개·대상·배우는 것·방식·강사·FAQ, md↑) · 오른쪽 `블록 n/20`(sm↑) · **연락하기**(sm↑) / **전화**(폰) · **복습**·**자료실**(lg↑). 아래 1px 읽기 진행선.
- `public/manifest.json`: name/short_name **"G9"**, theme/background `#070a0f`. `layout.tsx` `appleWebApp.title "G9"`, `themeColor "#070a0f"`.
- 아이콘 `public/icons/`: `icon-192/512`, `maskable-192/512`(56% 크기), `apple-touch-icon`(180), `favicon-16/32` — `g9-logo.png` 에서 생성. **남색 G 는 어두운 배경에서 안 보여 쿨톤 `#dfe8f5` 로 바꿈**(B > R+8 픽셀), 금색 9 유지, 배경 `#070a0f`. 재생성 스크립트는 커밋 `9835376` 메시지/본 문서 §11 참고. `icon.svg` 삭제.
- `InstallPrompt.tsx`: 다크 패널 + 아이콘 + "G9 를 홈 화면에". `BeforeInstallPromptEvent` 타입 명시. `offline.html` 제목 "오프라인 - G9".
- 서비스워커(`public/sw.js`)는 그대로: 페이지 Network First, `/_next/static/`·`/icons/` Cache First, 빌드마다 `postbuild` 가 `out/sw.js` 에만 버전 주입. 기존 설치자는 "업데이트" 안내 1회.

---

## 9. 작업 방식 (원격 세션 파이프라인)

클라우드 세션은 `gold9-app` 에 **푸시할 수 없다**(프록시 거부). 그래서:

1. 클라우드 클론 `/home/claude/review` 에서 수정 → `npx tsc --noEmit && npx eslint <paths> && npm run build`
2. 커밋 → `git format-patch -1 --stdout HEAD > /mnt/user-data/outputs/<tag>-<sha>.patch`
3. `device_commit_files` 로 `D:\개발\프롬포트 채점\.<tag>.patch` 전송
4. 컴퓨터(desktop-commander PowerShell): `git am --3way .<tag>.patch; Remove-Item .<tag>.patch; git push origin design-3d` → 배포 시 `git checkout master; git merge --ff-only design-3d; git push origin master`
5. dev 서버 재시작(CSS 바꿨을 때 필수): `next` node 프로세스 Stop-Process → `.next` 삭제 → `cmd /c npm run dev > dev.log`
6. 클라우드 클론 동기화: `git fetch && git reset --hard origin/design-3d && git clean -fd`

**금지**: 한글이 든 파일을 PowerShell `Get-Content/Set-Content` 로 편집(인코딩 깨짐 — 항상 패치로). 리뷰·스크린샷 산출물 커밋 금지. `강의자료/*.html`·`*비번*.txt`·`/개인강의/` 커밋 금지. 서브도메인 `kumgoo0913`·Worker 이름 `pcco-landing` 변경 금지. `dev.log`·`serve.log` 는 gitignore.

**검증 도구**: 클라우드 Playwright(`/home/claude/.npm-global/lib/node_modules/playwright/index.mjs`, 크로뮴 `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, swiftshader 플래그) 로 `npx serve -l 5173 out` 또는 실주소를 열어 측정 — 표지 건너뛰기는 `hero:enter` 디스패치 + `.cover` 제거 + `data-cover` 삭제. 컴퓨터의 내장 브라우저 패널(`mcp__remote-devices__Claude_Browser__*`)은 `localhost:3000`·`localhost:5173`·실주소 접근 허용됨 — 단 뷰포트 에뮬레이션 상태에서는 캔버스가 300×150 으로 멈추거나 스크린샷이 구석에 찍히는 **패널 자체의 버그**가 있으니 수치 판단은 Playwright 로.

**dev 서버 "첫 화면 깨짐"**: 서버를 재시작하면 열려 있던 탭이 재접속하며 옛 CSS 조각을 물고 와 옛 스타일(밝은 패널·도형 깨짐)로 보인다. 새로고침이면 정상. 빌드본은 CSS 파일명이 내용 해시라 발생하지 않음(실주소에서 확인 완료).

---

## 10. 겪은 문제와 해결 (다시 만나면 바로 적용)

| 증상 | 원인 | 해결 |
|---|---|---|
| Turbopack FATAL file lock / stale chunk | 파일 교체 중 dev 서버 | node `next` 프로세스 종료 → `.next` 삭제 → 재시작, 하드 리로드 |
| 노트북이 늦게 열림 | drei `Environment preset` 원격 HDR | 로컬 Lightformer → 최종적으로 조명 전부 제거(점 셰이더라 불필요) |
| 노트북 화면 글이 안 뜸 | drei `Html` + React 19 dev "synchronously unmount a root" | 자체 CSS3D DOM 오버레이 `ScreenMessage` |
| 노트북 잘림/너무 큼 | 절대 크기 | 뷰포트 비율 기준(`fillW/fillWPortrait/fillH`) + 가운데 정렬 |
| 관통 문장이 안 보임 | 비배치 본문이 fixed canvas 아래 | `.landing-body { position: relative; z-index: 1 }` |
| 표지가 안 걷힘 | 퇴장 타이머가 effect 정리에 지워짐 | `leaving` 단계 effect 안에서만 타이머 |
| 헤더 버튼 반응형 숨김 안 됨 | `.btn-*` display 가 `hidden` 을 이김 | `<span>` 으로 감싸 숨김 |
| React Compiler lint | useFrame 안 useMemo 값 변경 / effect 안 setState / 렌더 중 컴포넌트 정의 | 헬퍼 함수 / `setTimeout 0` / 최상위로 이동 |
| 계단·곡선 글자가 폰에서 깨알 | SVG text | HTML 라벨로 |
| `text-wrap: balance` 가 "내 일" 을 가름 | 강조구 분리 | `em { white-space: nowrap }` + 제목에 수동 `\n` |
| 이메일 버튼 글자 잘림 | 옆에 복사 버튼 추가 | 복사는 설명줄 텍스트 버튼으로 |
| 클라우드에서 push 거부 | 프록시 | 패치 → 컴퓨터에서 push |
| PowerShell 로 한글 파일 편집 시 깨짐 | 인코딩 | 패치로만 전달 |
| `device_commit_files` "fetch or write failed" | 일시 오류 | 재시도 |

---

## 11. 검증 결과 (실주소, 2026-10-21)

- 데스크톱 1440×900: 표지 → 버튼 → 클릭 → 본문. `.sec-h2` 48px, 패널 `rgb(13,18,26)`, 전화 버튼 `<button>`(복사), 콘솔 에러 0.
- 폰 프로필(iPhone 13 · Pixel 7 · 375×812): 캔버스 정상 크기, `hero:ready` 약 7~11초(소프트웨어 GL 기준; 실기기는 ≈5초), 제목 32px, 전화 `<a tel:>`, 하단 바 표시.
- 가독성 감사(이전 세션): 본문 줄당 ≤30자, 중첩 박스 0, 대비 11.7~16.9:1.
- 잠금: 틀린 값 거부 → 맞으면 열림 → /downloads 도 열림 → 새 브라우저는 다시 잠김. 헤더 버튼 `[연락하기, 전화, 복습, 자료실]`. `manifest.name = "G9"`.
- 라우트 200: `/`, `/course`, `/course/course-1`, `/downloads`, `/workbook`, `/workbook/performance`, `/g9-logo.png`, `/sw.js`, `/icons/icon-512.png`. (`/course/` 처럼 슬래시 붙은 주소는 Cloudflare 가 307 로 슬래시 없는 주소로 보냄 — 정상.)

---

## 12. 남은 일 · 아이디어 (확정 아님)

- [ ] 직장인 예제에 **실제 사례·사진**(강사가 제공하면 `audiences[0].examples`·`instructorProfile.evidence` 교체)
- [ ] 약한 기기에서 표지 타임라인이 길어지면(소프트웨어 GL 에서 28초 관측) `clock` 의 `dt` 상한을 느슨하게 하거나 "건너뛰기" 노출 검토
- [ ] 비밀번호를 진짜 보호로 올리려면 자료 파일을 암호화하거나 서버(Workers 함수)로 — 현재는 안내문 수준
- [ ] 자료실·복습 페이지 자체는 아직 옛 톤(라이트 컴포넌트 일부) — 메인과 톤 맞추기
- [ ] `CLAUDE.md` 의 옛 "주요 기능/폴더 구조" 절은 히스토리 — 필요하면 정리
- [ ] Railway 옛 서비스 삭제는 계정 권한 문제로 보류 중

---

## 13. 아이콘 재생성 스니펫 (PIL)

```python
from PIL import Image; import numpy as np
logo = Image.open('public/g9-logo.png').convert('RGBA'); a = np.array(logo).astype(np.float32)
r,g,b = a[...,0],a[...,1],a[...,2]; cool = b > r + 8            # 남색 G
a[...,0]=np.where(cool,0xdf,r); a[...,1]=np.where(cool,0xe8,g); a[...,2]=np.where(cool,0xf5,b)
logo = Image.fromarray(a.astype(np.uint8),'RGBA'); BG=(7,10,15,255)
def make(size, fill, out):
    im = Image.new('RGBA',(size,size),BG); w,h = logo.size; k = size*fill/max(w,h)
    lg = logo.resize((round(w*k),round(h*k)), Image.LANCZOS)
    im.alpha_composite(lg, ((size-lg.width)//2,(size-lg.height)//2)); im.convert('RGB').save(out, optimize=True)
make(192,.78,'public/icons/icon-192.png'); make(512,.78,'public/icons/icon-512.png')
make(192,.56,'public/icons/maskable-192.png'); make(512,.56,'public/icons/maskable-512.png')
make(180,.78,'public/icons/apple-touch-icon.png'); make(32,.86,'public/icons/favicon-32x32.png'); make(16,.9,'public/icons/favicon-16x16.png')
```
