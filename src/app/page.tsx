import HashRedirect from "@/components/HashRedirect";
import GlassStage from "@/components/three/GlassStage";
import Cover from "@/components/three/Cover";
import Pitch from "@/components/landing/Pitch";
import ForWhom from "@/components/landing/ForWhom";
import Journey from "@/components/landing/Journey";
import Method from "@/components/landing/Method";
import Difference from "@/components/landing/Difference";
import Instructor from "@/components/landing/Instructor";
import Quotes from "@/components/landing/Quotes";
import Faq from "@/components/landing/Faq";
import Cta from "@/components/landing/Cta";

/**
 * 메인 — 강의 상세(소개) 페이지. 신규 수강 검토자용 (2026-10-21 리뉴얼 v4)
 *
 * 3D 무대(GlassStage)가 페이지 뒤에 고정돼 있다. 어둠 속의 빛.
 *  · 표지(Cover, fixed): 빛 입자가 로고 "G9" 로 모였다 흩어져 노트북이 되고, 화면에 핵심 메시지 → "강의 소개 보기" 클릭 → 흩어지며 표지가 걷힌다
 *  · 본문(.landing-body): 소개 → 누구를 위한 → 여정 → 진행 방식 → 다른 점 → 강사 → 관통 문장 → FAQ → CTA
 *  · 본문을 내리는 동안 빛 블록 20개가 아래부터 쌓여 끝에서 "딱" 완성된다 — 마지막 한 칸이 당신 자리
 *
 * 차수별 커리큘럼·복습은 /course, 자료는 /downloads — 메인에는 차수 목록을 두지 않는다.
 * 옛 #course-N 앵커는 HashRedirect 가 처리.
 */
export default function Home() {
  return (
    <main className="relative z-10">
      <HashRedirect />
      <GlassStage />
      <Cover />
      <div className="landing-body pt-6 sm:pt-10">
        <Pitch />
        <ForWhom />
        <Journey />
        <Method />
        <Difference />
        <Instructor />
        <Quotes />
        <Faq />
        <Cta />
      </div>
    </main>
  );
}
