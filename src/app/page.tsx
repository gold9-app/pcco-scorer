import HashRedirect from "@/components/HashRedirect";
import GlassStage from "@/components/three/GlassStage";
import HeroSection from "@/components/three/HeroSection";
import EntryPoints from "@/components/landing/EntryPoints";
import SeriesMap from "@/components/landing/SeriesMap";
import ThroughLine from "@/components/landing/ThroughLine";
import CourseIndex from "@/components/landing/CourseIndex";
import Difference from "@/components/landing/Difference";
import Faq from "@/components/landing/Faq";
import Cta from "@/components/landing/Cta";

/**
 * 랜딩 — 신규 수강 검토자용 (2026-10-19 리뉴얼)
 *
 * 3D 무대(GlassStage)가 페이지 뒤에 고정돼 있다.
 *  · 히어로(260svh, 스크롤 연출): 유리 노트북이 열리고 → 화면에 핵심 메시지 → 화면이 다가와 뷰포트를 채우며 본문으로
 *  · 본문: 유리 패널 섹션 7개가 흐르는 동안 뒤에서 유리 테트리스가 아래부터 차오르고, 마지막(CTA)에 화면이 꽉 찬다
 *
 * 섹션 순서 = 검토자의 질문 순서: 어디서 시작하나 → 전체 여정 → 어디까지 가나 → 강의 하나하나 → 왜 여기서 → 궁금한 것 → 시작
 * 차수별 복습은 /course/{id}. 옛 #course-N 앵커는 HashRedirect 가 처리.
 */
export default function Home() {
  return (
    <main className="relative z-10">
      <HashRedirect />
      <GlassStage />
      <HeroSection />
      <EntryPoints />
      <SeriesMap />
      <ThroughLine />
      <CourseIndex />
      <Difference />
      <Faq />
      <Cta />
    </main>
  );
}
