import PasswordGate from "@/components/PasswordGate";

/** 복습 페이지 전체(/course, /course/[id])는 수강생 비밀번호 뒤에 있다 */
export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return <PasswordGate title="복습 페이지는 수강생 전용입니다">{children}</PasswordGate>;
}
