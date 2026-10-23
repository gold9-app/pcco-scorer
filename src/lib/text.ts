/**
 * 가운뎃점(·) 앞에서 줄이 끊기지 않게 — "프리랜서 / ·주부·학생" 방지.
 * keep-all 이어도 크롬은 한글과 · 사이를 끊는다. 앞에 단어 결합 문자(U+2060)를 붙여 · 는 앞 단어에 붙어 다닌다
 * (· 뒤에서는 그대로 끊길 수 있다). 화면에 보이지 않는다.
 */
export function keepDots(s: string): string {
  return s.replaceAll("·", "\u2060·");
}
