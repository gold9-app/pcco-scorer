import HashRedirect from "@/components/HashRedirect";
import GlassStage from "@/components/three/GlassStage";
import HeroSection from "@/components/three/HeroSection";
import CourseBeats from "@/components/landing/CourseBeats";
import Difference from "@/components/landing/Difference";
import Faq from "@/components/landing/Faq";
import Cta from "@/components/landing/Cta";

/**
 * 랜딩 — 신규 수강 검토자용 (2026-10-19 리뉴얼 v3)
 *
 * 3D 무대(GlassStage)가 페이지 뒤에 고정돼 있다.
 *  · 히어로: 유리 노트북이 스스로 열리고 화면에 핵심 메시지 → 스크롤하면 닫히며 위로 빠진다
 *  · 강의 19회: 한 강의 = 한 패널(data-beat) = 유리 블록 하나. 패널이 올라올 때 블록이 떨어져 아래부터 쌓인다
 *  · 다른 점 · FAQ
 *  · CTA(20번째 data-beat): 마지막 블록이 떨어져 80칸 우물이 "딱" 완성된다 — 그 한 칸이 당신 자리
 *
 * data-beat 는 정확히 20개여야 한다 (강의 19 + CTA 1). 새 강의가 추가되면 tetris.ts 의 PIECE_COUNT·WELLS 를 같이 손본다.
 * 차수별 복습은 /course/{id}. 옛 #course-N 앵커는 HashRedirect 가 처리.
 */
export default function Home() {
  return (
    <main className="relative z-10">
      <HashRedirect />
      <GlassStage />
      <HeroSection />
      <CourseBeats />
      <Difference />
      <Faq />
      <Cta />
    </main>
  );
}
