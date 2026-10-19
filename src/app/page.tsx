import PainPoints from "@/components/PainPoints";
import BeforeAfter from "@/components/BeforeAfter";
import WhatYouLearn from "@/components/WhatYouLearn";
import FrameworkCards from "@/components/FrameworkCards";
import USP from "@/components/USP";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import HashRedirect from "@/components/HashRedirect";
import GlassStage from "@/components/three/GlassStage";
import HeroSection from "@/components/three/HeroSection";

/**
 * 랜딩 — 신규 수강 검토자용.
 *
 * 3D 무대(GlassStage)가 페이지 뒤에 고정돼 있고, 그 위로 콘텐츠가 스크롤된다.
 *  · 히어로: 유리 노트북. 탭하면 열리며 화면에 핵심 메시지 → 테트리스 첫 블록 낙하
 *  · data-drop 섹션 7개: 스크롤이 닿을 때마다 유리 블록이 좌·우 번갈아 떨어져 쌓인다
 *  · CTA 에 닿으면 양옆 4×4 우물이 빈칸 없이 꽉 찬다 — "딱 맞는" 의 시각적 증명
 *
 * 섹션 내용 교체(지도·시작점·카드 필터)는 다음 단계. data-drop 개수는 8개 블록 - 히어로 1 = 7 로 유지할 것.
 * 차수별 복습은 /course/{id}. 옛 #course-N 앵커는 HashRedirect 가 처리.
 */
export default function Home() {
  return (
    <main className="relative z-10">
      <HashRedirect />
      <GlassStage />
      <HeroSection />

      <div data-drop><PainPoints /></div>
      <div className="section-divider max-w-6xl mx-auto" />
      <div data-drop><BeforeAfter /></div>
      <div className="section-divider max-w-6xl mx-auto" />
      <div data-drop><WhatYouLearn /></div>
      <div className="section-divider max-w-6xl mx-auto" />
      <div data-drop><FrameworkCards /></div>
      <div className="section-divider max-w-6xl mx-auto" />
      <div data-drop><USP /></div>
      <div className="section-divider max-w-6xl mx-auto" />
      <div data-drop><FAQ /></div>
      <div className="section-divider max-w-6xl mx-auto" />
      <div data-drop><CTA /></div>
    </main>
  );
}
