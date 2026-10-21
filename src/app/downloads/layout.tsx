import PasswordGate from "@/components/PasswordGate";

/** 자료실은 수강생 비밀번호 뒤에 있다 */
export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return <PasswordGate title="자료실은 수강생 전용입니다">{children}</PasswordGate>;
}
