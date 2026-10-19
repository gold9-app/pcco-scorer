import HeroScene from "@/components/three/HeroScene";
import PainPoints from "@/components/PainPoints";
import BeforeAfter from "@/components/BeforeAfter";
import WhatYouLearn from "@/components/WhatYouLearn";
import FrameworkCards from "@/components/FrameworkCards";
import USP from "@/components/USP";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import HashRedirect from "@/components/HashRedirect";

/**
 * 랜딩 — 신규 수강 검토자용.
 * 차수별 복습(CourseDetail)은 2026-10-19 부터 /course/{id} 로 분리. 옛 #course-N 앵커는 HashRedirect 가 처리.
 * 섹션 구조(지도·시작점·카드 필터)는 디자인 단계에서 교체 예정 — 지금은 카피만 갱신된 상태.
 */
export default function Home() {
  return (
    <main className="relative">
      <HashRedirect />
      {/* Step 1: 3D 히어로 (유리 노트북). 옛 Hero.tsx 는 Step 4 콘텐츠 배치 때 정리 */}
      <HeroScene />
      <div className="section-divider max-w-6xl mx-auto" />
      <PainPoints />
      <div className="section-divider max-w-6xl mx-auto" />
      <BeforeAfter />
      <div className="section-divider max-w-6xl mx-auto" />
      <WhatYouLearn />
      <div className="section-divider max-w-6xl mx-auto" />
      <FrameworkCards />
      <div className="section-divider max-w-6xl mx-auto" />
      <USP />
      <div className="section-divider max-w-6xl mx-auto" />
      <FAQ />
      <div className="section-divider max-w-6xl mx-auto" />
      <CTA />
    </main>
  );
}
