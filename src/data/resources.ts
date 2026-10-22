// 강의 부록 자료실 데이터
//
// 실제 파일은 public/downloads/<차수키>/ 아래에 있다. (예: public/downloads/c11/slides.pdf)
// 디스크에는 ASCII 파일명으로 두고, 수강생이 받을 때의 한글 파일명은 downloadName으로 지정한다.
// (같은 도메인에서 서빙되므로 <a download="..."> 가 그대로 먹힌다)
//
// ⚠️ 절대 금지 — 강사 전용 자료는 여기에 넣지 말 것:
//    기획안 / 인수인계 / 해부 정답지 / 채점기준표 / 구조지도 강사원본
//    특히 10차 채점기준표는 진단·분반 오염 위험이 있다.
//
// 파일 용량은 하드코딩하지 않는다 — /downloads 페이지가 빌드 시점에 실제 파일을 읽어 계산한다.
// 파일이 없으면 그 항목은 자동으로 목록에서 빠지므로 죽은 링크가 생기지 않는다.

export type ResourceKind = "pdf" | "docx" | "zip" | "txt" | "md";

export interface ResourceItem {
  /** public 폴더 기준 경로 (그대로 href로 사용) */
  file: string;
  /** 수강생 PC에 저장될 파일명 */
  downloadName: string;
  title: string;
  description: string;
  kind: ResourceKind;
}

export interface ResourceGroup {
  /** content.ts의 courses[].id 와 동일 — 랜딩 복습 섹션 앵커로 사용 */
  courseId: string;
  /** "6차" 처럼 짧은 배지 라벨 */
  label: string;
  title: string;
  framework: string;
  items: ResourceItem[];
}

export const resourceGroups: ResourceGroup[] = [
  {
    courseId: "course-1",
    label: "1차",
    title: "AI의 프롬프트란?",
    framework: "R-PCCO",
    items: [
      {
        file: "/downloads/c01/slides.pdf",
        downloadName: "1강_AI프롬프트_슬라이드.pdf",
        title: "슬라이드",
        description: "역할·목적·맥락·제약·출력 다섯 칸을 짚는 수업 슬라이드 전체",
        kind: "pdf",
      },
    ],
  },
  {
    courseId: "course-2",
    label: "2차",
    title: "AI의 지침이란?",
    framework: "I-MRKO",
    items: [
      {
        file: "/downloads/c02/slides.pdf",
        downloadName: "2강_AI지침_슬라이드.pdf",
        title: "슬라이드",
        description: "한 번 세팅하고 평생 쓰는 지침 설계 — 수업 슬라이드 전체",
        kind: "pdf",
      },
    ],
  },
  {
    courseId: "course-3",
    label: "3차",
    title: "이미지 프롬프트 설계 가이드",
    framework: "SSDHR",
    items: [
      {
        file: "/downloads/c03/slides.pdf",
        downloadName: "3강_이미지프롬프트_슬라이드.pdf",
        title: "슬라이드",
        description: "설명이 아니라 제어 시스템 — 9단 구조 수업 슬라이드 전체",
        kind: "pdf",
      },
    ],
  },
  {
    courseId: "course-4",
    label: "4차",
    title: "바이브 코딩이란?",
    framework: "R-PCCO (코딩 응용판)",
    items: [
      {
        file: "/downloads/c04/slides.pdf",
        downloadName: "4강_바이브코딩_슬라이드.pdf",
        title: "슬라이드",
        description: "AI한테 묘사하면 앱이 된다 — 수업 슬라이드 전체",
        kind: "pdf",
      },
    ],
  },
  {
    courseId: "course-5",
    label: "5차",
    title: "AI 자동화 이해",
    framework: "BATLR",
    items: [
      {
        file: "/downloads/c05/slides.pdf",
        downloadName: "5강_AI자동화이해_슬라이드.pdf",
        title: "슬라이드",
        description: "쪼개기·에셋화·도구·연결·기록 5단계 수업 슬라이드 전체",
        kind: "pdf",
      },
    ],
  },
  {
    courseId: "course-6",
    label: "6차",
    title: "Claude Code 실전",
    framework: "빌드 5단계",
    items: [
      {
        file: "/downloads/c06/slides.pdf",
        downloadName: "6강_ClaudeCode실전_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c06/prompts.txt",
        downloadName: "6강_실습_프롬프트모음.txt",
        title: "실습 프롬프트 모음",
        description: "라이브에서 그대로 복붙해 쓴 프롬프트만 모은 파일",
        kind: "txt",
      },
      {
        file: "/downloads/c06/practice-commands.md",
        downloadName: "6강_따라하기_명령어.md",
        title: "따라 하기 명령어",
        description: "설치부터 실행까지 순서대로 적힌 실습 진행표",
        kind: "md",
      },
      {
        file: "/downloads/c06/standard-structure-guide.md",
        downloadName: "6강_표준구조_가이드.md",
        title: "표준 구조 가이드",
        description: "어떤 프로젝트든 이 뼈대로 — 폴더·문패 표준안",
        kind: "md",
      },
      {
        file: "/downloads/c06/practice-files.zip",
        downloadName: "6강_실습_연습파일.zip",
        title: "실습용 연습 파일",
        description: "이름이 엉망인 파일 30여 개 — 이름 변경기를 돌려볼 재료",
        kind: "zip",
      },
      {
        file: "/downloads/c06/sample-app.zip",
        downloadName: "6강_완성샘플_파일이름변경기.zip",
        title: "완성 샘플 — 파일 이름 변경기",
        description: "강의에서 만든 도구의 완성본 전체 소스",
        kind: "zip",
      },
    ],
  },
  {
    courseId: "course-7",
    label: "7차",
    title: "잘 짠 앱을 '내 앱'으로 (PWA)",
    framework: "PWA 5요소",
    items: [
      {
        file: "/downloads/c07/slides.pdf",
        downloadName: "7강_PWA_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c07/todo-app.zip",
        downloadName: "7강_할일앱_실습_배포본.zip",
        title: "할 일 앱 실습 배포본",
        description: "레이어 4겹으로 잘 짜인 완성 PWA — 받아서 바로 개조 시작",
        kind: "zip",
      },
    ],
  },
  {
    courseId: "course-8",
    label: "8차",
    title: "자동화 설계 — 실전 공장을 해부하다",
    framework: "PILOT",
    items: [
      {
        file: "/downloads/c08/slides.pdf",
        downloadName: "8강_자동화설계_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c08/design-template.docx",
        downloadName: "8강_내자동화_설계도_템플릿.docx",
        title: "내 자동화 설계도 템플릿",
        description: "PILOT 다섯 칸 빈 양식 — 내 자동화를 한 장으로",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-9",
    label: "9차",
    title: "진짜 서비스 만들기 — 심리테스트",
    framework: "살아있는 서비스 5요소",
    items: [
      {
        file: "/downloads/c09/slides.pdf",
        downloadName: "9강_진짜서비스_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c09/planning-prompt.txt",
        downloadName: "9강_테스트기획_프롬프트.txt",
        title: "테스트 기획 프롬프트",
        description: "내 심리테스트 문항·결과를 뽑아내는 출발 프롬프트",
        kind: "txt",
      },
      {
        file: "/downloads/c09/backend-kit.zip",
        downloadName: "9강_백엔드키트.zip",
        title: "백엔드 키트",
        description: "db.js 계약 3함수 · CLAUDE.md 규칙서 · Supabase SQL · 참고 샘플",
        kind: "zip",
      },
    ],
  },
  {
    courseId: "course-10",
    label: "10차",
    title: "거꾸로 만들기 — 한 방 프롬프트 역설계",
    framework: "역설계 3단계",
    items: [
      {
        file: "/downloads/c10/slides.pdf",
        downloadName: "10강_거꾸로만들기_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c10/observation-worksheet.docx",
        downloadName: "10강_관찰워크시트.docx",
        title: "관찰 워크시트",
        description: "완성 프로그램을 뜯어보며 채우는 관찰 기록지",
        kind: "docx",
      },
      {
        file: "/downloads/c10/prompt-sheet.docx",
        downloadName: "10강_프롬프트작성지.docx",
        title: "한 방 프롬프트 작성지",
        description: "관찰한 내용을 프롬프트 한 편으로 옮겨 적는 양식",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-11",
    label: "11차",
    title: "그린다 — 머릿속에 구조를 그리는 법",
    framework: "레이어 4겹",
    items: [
      {
        file: "/downloads/c11/slides.pdf",
        downloadName: "11강_구조그리기_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c11/structure-worksheet.docx",
        downloadName: "11강_구조도_워크시트.docx",
        title: "구조도 워크시트",
        description: "데이터·동작·화면·연결 네 칸 빈 양식 — 소재 하나를 그려보는 용도",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-12",
    label: "12차",
    title: "구조를 그린다 — 개발 세계의 지도",
    framework: "개발 지도 3층",
    items: [
      {
        file: "/downloads/c12/slides.pdf",
        downloadName: "12강_개발구조_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체 (부록 「전체 지도 한 장」 포함)",
        kind: "pdf",
      },
      {
        file: "/downloads/c12/design-homework.docx",
        downloadName: "12강_설계지_숙제템플릿.docx",
        title: "설계지 (숙제 템플릿)",
        description: "내 앱 폴더 구조를 그리는 양식 — 작성 순서 5단계 + 완성 예시 포함",
        kind: "docx",
      },
      {
        file: "/downloads/c12/dev-glossary.docx",
        downloadName: "12강_개발용어사전.docx",
        title: "개발 용어 사전",
        description: "블록형 핸드북 — 브라우저·서버·API·DB를 처음부터 짚는 용어집",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-13",
    label: "13차",
    title: "쓴다 — 구조도를 프롬프트로 옮기는 법",
    framework: "변환표 4줄",
    items: [
      {
        file: "/downloads/c13/slides.pdf",
        downloadName: "13강_프롬프트쓰기_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c13/translate-worksheet.docx",
        downloadName: "13강_번역_워크시트.docx",
        title: "번역 워크시트",
        description: "구조도 재작성 캔버스 + 칸→문장 초벌 + 조립 칸 + 실행 기록 (A4 5쪽)",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-15",
    label: "15차",
    title: "굳힌다 — 반복을 지침으로",
    framework: "I-MRKO 5칸 + 판별 3조건",
    items: [
      {
        file: "/downloads/c15/slides.pdf",
        downloadName: "15강_지침굳히기_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c15/instruction-worksheet.docx",
        downloadName: "15강_지침_워크시트.docx",
        title: "지침 워크시트",
        description: "반복 업무 찾기(판별 3조건·체크리스트·재료 3개) + 5칸 초벌 + 조립(헤더 5개) + 시험 기록·비교 3질문 (A4 5쪽)",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-14",
    label: "14차",
    title: "화면을 그린다 — 보이는 것의 해부",
    framework: "화면 해부 4단",
    items: [
      {
        file: "/downloads/c14/slides.pdf",
        downloadName: "14강_화면그리기_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체 (부록 「전체 화면 지도 한 장」 포함)",
        kind: "pdf",
      },
      {
        file: "/downloads/c14/screen-worksheet.docx",
        downloadName: "14강_화면도_숙제템플릿.docx",
        title: "화면도 (숙제 템플릿)",
        description: "내 앱 화면을 그리는 양식 — 화면 목록·이동·상자·부품·상태 4칸, 작성 순서 5단계 + 완성 예시 포함",
        kind: "docx",
      },
      {
        file: "/downloads/c14/screen-glossary.docx",
        downloadName: "14강_화면용어사전.docx",
        title: "화면 용어 사전",
        description: "블록형 핸드북 — HTML·CSS·JS·컴포넌트·상태를 처음부터 짚는 용어집 17항목",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-16",
    label: "16차",
    title: "데이터를 그린다 — 창고의 해부",
    framework: "창고 해부 4단",
    items: [
      {
        file: "/downloads/c16/slides.pdf",
        downloadName: "16강_데이터그리기_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체 (부록 「전체 창고 지도 한 장」 포함)",
        kind: "pdf",
      },
      {
        file: "/downloads/c16/data-worksheet.docx",
        downloadName: "16강_데이터도_숙제템플릿.docx",
        title: "데이터도 (숙제 템플릿)",
        description: "내 앱 데이터를 그리는 양식 — 남길 것·표·열·줄·문지기 표, 작성 순서 5단계 + 완성 예시 포함 (화면도 없이도 시작 가능)",
        kind: "docx",
      },
      {
        file: "/downloads/c16/data-glossary.docx",
        downloadName: "16강_데이터용어사전.docx",
        title: "데이터 용어 사전",
        description: "블록형 핸드북 — 표·열·관계·열쇠·문지기를 처음부터 짚는 용어집 18항목",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-17",
    label: "17차",
    title: "내 캘린더를 주소로 — github.io 위의 PWA, 그리고 UX",
    framework: "설계 질문 5",
    items: [
      {
        file: "/downloads/c17/slides.pdf",
        downloadName: "17강_내캘린더를주소로_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체 (20장)",
        kind: "pdf",
      },
      {
        file: "/downloads/c17/setup-guide.pdf",
        downloadName: "17강_세팅가이드.pdf",
        title: "세팅 가이드 (수업 전 집에서)",
        description: "확인 3개(claude · gh auth status · git 이름) + 사람이 직접 해야 하는 2가지 + 막힘 해결 3단계 — 수업 일주일 전에 한 번 해 오세요",
        kind: "pdf",
      },
      {
        file: "/downloads/c17/ux-design-card.docx",
        downloadName: "17강_UX설계카드.docx",
        title: "UX 설계 카드",
        description: "설계 질문 5(쓰는 사람·핵심 과업·상태 4칸·돌아오는 길·폰 먼저) + 손님 테스트 기록 — A4 1쪽, 오늘 유일하게 쓰는 종이",
        kind: "docx",
      },
      {
        file: "/downloads/c17/reference-cards.docx",
        downloadName: "17강_참고카드.docx",
        title: "참고 카드 2장 (작업실 · 앱으로)",
        description: "A 폴더 3단계 예시 + CLAUDE.md 예시(권장) + 시키는 문장 3 / B PWA 5요소 + 설치 + 막혔을 때 — 참고용, 강제 아님",
        kind: "docx",
      },
      {
        file: "/downloads/c17/reference-cards.zip",
        downloadName: "17강_참고카드.zip",
        title: "참고 카드 묶음 (md + CLAUDE.md 예시 txt)",
        description: "참고 카드 A·B의 md와 복사용 CLAUDE.md_예시.txt",
        kind: "zip",
      },
    ],
  },
  {
    courseId: "course-18",
    label: "18차",
    title: "에이전트를 해부한다 — 누구에게 보내고, 어떻게 잇나",
    framework: "두 축 + 라우팅·오케스트레이션",
    items: [
      {
        file: "/downloads/c18/slides.pdf",
        downloadName: "18강_에이전트를해부한다_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체 (31장 — 두 축·격자·계단·루프·접수창구·패턴 4·해부도)",
        kind: "pdf",
      },
      {
        file: "/downloads/c18/glossary.docx",
        downloadName: "18강_용어사전.docx",
        title: "용어사전 (못 외워도 됩니다)",
        description: "블록형 핸드북 — 1부 다섯 단어 두 축 · 2부 부품 · 3부 보내기와 잇기 · 4부 이름만. 항목마다 비유 → 무엇인가 → 왜 있나 → 오늘 어디서",
        kind: "docx",
      },
      {
        file: "/downloads/c18/design-card.docx",
        downloadName: "18강_설계질문5카드.docx",
        title: "설계 질문 5 카드 (선택 과제)",
        description: "요청 종류 · 담당 일꾼 · 순서(패턴 4) · 모를 때·안 될 때 · 남길 것 — A4 1쪽. 안 해도 곤란하지 않습니다",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-19",
    label: "19차",
    title: "일꾼은 뭘 알고 일하나 — 머리에 넣는 것과 빼는 것",
    framework: "문맥 4층 + 넣는 법 4",
    items: [
      {
        file: "/downloads/c19/slides.pdf",
        downloadName: "19강_일꾼은뭘알고일하나_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체 (31장 — 복습 5 · 머리 해부도 · 문맥 4층 · 병 셋 · 넣는 법 4 · 세 장면 · 해부도)",
        kind: "pdf",
      },
      {
        file: "/downloads/c19/glossary.docx",
        downloadName: "19강_용어사전_문맥판.docx",
        title: "용어사전 — 문맥판",
        description: "오프닝 배포 · 5부(지난번 말 · 머리 · 넣는 길 넷 · 병과 처방 · 이름만) — 못 외워도 됩니다",
        kind: "docx",
      },
      {
        file: "/downloads/c19/context-card.docx",
        downloadName: "19강_설계질문5_문맥판카드.docx",
        title: "설계 질문 5 — 문맥판 카드 (선택 과제)",
        description: "클로징 배포 · 18차 카드의 짝 — 일꾼 한 명의 늘 알 것 · 이번에 넣을 것 · 남길 것 · 꺼낼 것 · 넣지 않을 것",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "extra-1",
    label: "개인 맞춤 1",
    title: "요청이 들어와서 결과가 나가기까지 — 라우팅과 오케스트레이션 설계 워크숍",
    framework: "공항 대응표 + 설계도 4장",
    items: [
      { file: "/downloads/x1/slides.pdf", downloadName: "외전1_라우팅오케스트레이션_슬라이드.pdf", title: "슬라이드", description: "워크숍 슬라이드 전체 (48장 — 공항 대응표 · 라우팅 5층 · 정포제예 · 패턴 5 · 계약 · 실패 각본 · 설계도 4장 서식)", kind: "pdf" },
      { file: "/downloads/x1/templates.docx", downloadName: "외전1_설계도템플릿4장.docx", title: "설계도 템플릿 4장", description: "접수 분류표 · 일꾼 카드 · 지휘 대본 · 실패 각본 — 서식 + 칸마다 '왜 이 칸인가' + 스스로 점검", kind: "docx" },
      { file: "/downloads/x1/example-a.docx", downloadName: "외전1_완성예시A_고객문의.docx", title: "완성 예시 A — 고객 문의 접수 에이전트", description: "설계도 4장 + 규정집 10항목 + 주문 목록 + 요청 덱 A — 베끼는 게 아니라 서식을 빌리는 것", kind: "docx" },
      { file: "/downloads/x1/request-decks.zip", downloadName: "외전1_요청덱_ABC.zip", title: "요청 덱 A·B·C (12장 × 3)", description: "inbox/에 그대로 넣을 txt — 고객 문의 / 사내 요청 / 콘텐츠 의뢰. 정상 8 · 섞임 2 · 기타 2", kind: "zip" },
      { file: "/downloads/x1/migration-guide.docx", downloadName: "외전1_옮기기가이드.docx", title: "옮기기 가이드 — 설계도 → 작업대", description: "대응표 · 폴더 모양 · CLAUDE.md/일꾼 파일 뼈대 · 시키는 문장 2 · 고치기 한 바퀴 · 막혔을 때", kind: "docx" },
      { file: "/downloads/x1/checklist.pdf", downloadName: "외전1_설계체크리스트10.pdf", title: "설계 체크리스트 10", description: "내일 요청이 들어오면 이 열 개부터 — A4 1쪽", kind: "pdf" },
      { file: "/downloads/x1/glossary.docx", downloadName: "외전1_용어카드.docx", title: "용어 카드", description: "공항 대응표 13행 + 용어 20 한 줄 + 예약어 셋", kind: "docx" },
    ],
  },
];
