import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import BeforeAfter from "@/components/BeforeAfter";
import WhatYouLearn from "@/components/WhatYouLearn";
import FrameworkCards from "@/components/FrameworkCards";
import USP from "@/components/USP";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import CourseDetail from "@/components/CourseDetail";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
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
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-1" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-2" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-3" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-4" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-5" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-6" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-7" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-8" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-9" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-10" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-11" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-12" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-13" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-14" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-15" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-16" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-17" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-18" />

      {/* 외전 — 독립 워크숍 */}
      <div className="section-divider max-w-6xl mx-auto" />
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-2">
        <p className="text-xs tracking-[0.2em] text-text-muted/70 font-bold">EXTRA · 외전</p>
        <h2 className="text-2xl sm:text-3xl font-bold mt-2">외전 — 시리즈 밖, 하루로 완결되는 독립 워크숍</h2>
        <p className="text-sm sm:text-base text-text-muted mt-2">이전 강의를 듣지 않았어도 들을 수 있습니다.</p>
      </div>
      <CourseDetail courseId="extra-1" />

      {/* Footer — 실습 앱 링크 (작게) */}
      <footer className="py-10 px-6 text-center">
        <a
          href="/practice"
          className="text-xs text-text-muted/60 hover:text-accent-primary underline underline-offset-4 transition-colors"
        >
          실습 앱 사용하기
        </a>
      </footer>
    </main>
  );
}
