// 외전1 docx 생성기 — 02 템플릿 · 03 완성예시 · 05 옮기기 가이드 · 07 용어카드
// 실행: NODE_PATH=$(npm root -g) node make_docx_x1.js
// md 파일을 읽어 docx로 변환한다(지원: #/##/### 제목 · > 인용 · - 불릿 · | 표 | · **굵게** · 수평선)
const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType,
        BorderStyle, AlignmentType, ShadingType, PageOrientation } = require("docx");

const V = "5B3DF5", INK = "15132A", MUTE = "6E6B85", LINE = "E4E1F0", VL = "EDE9FE", CORAL = "C2410C";
const FONT = "Malgun Gothic";

function runs(text, base = {}) {
  // **bold** 파싱
  const out = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), font: FONT, ...base }));
    out.push(new TextRun({ text: m[1], bold: true, font: FONT, ...base }));
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), font: FONT, ...base }));
  return out;
}
const P = (text, opt = {}) => new Paragraph({ children: runs(text, opt.run || {}), spacing: { after: opt.after ?? 80, line: 300 }, ...(opt.para || {}) });
const H1 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 36, color: INK, font: FONT })], spacing: { after: 120 } });
const H2 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: V, font: FONT })], spacing: { before: 240, after: 100 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: V } } });
const H3 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 23, color: INK, font: FONT })], spacing: { before: 160, after: 60 },
  shading: { type: ShadingType.CLEAR, fill: VL } });
const QUOTE = (t) => new Paragraph({ children: runs(t, { color: "2A2744", size: 19 }), spacing: { after: 80, line: 290 },
  indent: { left: 240 }, border: { left: { style: BorderStyle.SINGLE, size: 18, color: V, space: 8 } } });
const BUL = (t) => new Paragraph({ children: runs(t, { size: 19 }), bullet: { level: 0 }, spacing: { after: 50, line: 280 } });
const HR = () => new Paragraph({ children: [], border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE } }, spacing: { before: 120, after: 120 } });

function cell(text, { head = false, w, fill } = {}) {
  return new TableCell({
    children: [new Paragraph({ children: runs(text, { size: head ? 18 : 18, bold: head, color: head ? "FFFFFF" : INK }), spacing: { after: 0, line: 270 } })],
    width: w ? { size: w, type: WidthType.PERCENTAGE } : undefined,
    shading: { type: ShadingType.CLEAR, fill: head ? INK : (fill || "FFFFFF") },
    margins: { top: 80, bottom: 80, left: 110, right: 110 },
    borders: { top: { style: BorderStyle.SINGLE, size: 4, color: LINE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE },
               left: { style: BorderStyle.SINGLE, size: 4, color: LINE }, right: { style: BorderStyle.SINGLE, size: 4, color: LINE } },
  });
}
function table(rows, widths) {
  const [head, ...body] = rows;
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ tableHeader: true, children: head.map((c, i) => cell(c, { head: true, w: widths?.[i] })) }),
      ...body.map((r, ri) => new TableRow({ children: r.map((c, i) => cell(c, { w: widths?.[i], fill: ri % 2 ? "F8F7FC" : "FFFFFF" })) })),
    ],
  });
}

function mdToChildren(md, widthsByCols = {}) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const L = lines[i];
    if (!L.trim()) { i++; continue; }
    if (L.startsWith("# ")) { out.push(H1(L.slice(2))); i++; continue; }
    if (L.startsWith("## ")) { out.push(H2(L.slice(3))); i++; continue; }
    if (L.startsWith("### ")) { out.push(H3(L.slice(4))); i++; continue; }
    if (L.startsWith("> ")) { out.push(QUOTE(L.slice(2))); i++; continue; }
    if (L.startsWith("- ")) { out.push(BUL(L.slice(2))); i++; continue; }
    if (L.startsWith("---")) { out.push(HR()); i++; continue; }
    if (L.startsWith("```")) {
      i++; const buf = [];
      while (i < lines.length && !lines[i].startsWith("```")) { buf.push(lines[i]); i++; }
      i++;
      buf.forEach((ln) => out.push(new Paragraph({
        children: [new TextRun({ text: ln.length ? ln : " ", font: "Consolas", size: 17, color: "1F1B3A" })],
        shading: { type: ShadingType.CLEAR, fill: "F4F2FA" }, spacing: { after: 0, line: 260 }, indent: { left: 120 },
        border: { left: { style: BorderStyle.SINGLE, size: 12, color: "5B3DF5", space: 6 } } })));
      out.push(new Paragraph({ children: [], spacing: { after: 80 } }));
      continue;
    }
    if (L.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = lines[i].slice(1, -1).split("|").map((s) => s.trim());
        if (!cells.every((c) => /^-+$/.test(c))) rows.push(cells);
        i++;
      }
      out.push(table(rows, widthsByCols[rows[0].length]));
      out.push(new Paragraph({ children: [], spacing: { after: 60 } }));
      continue;
    }
    out.push(P(L, { run: { size: 20 } })); i++;
  }
  return out;
}

function build(mdPath, outPath, opts = {}) {
  const md = fs.readFileSync(mdPath, "utf8");
  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: 20, color: INK } } } },
    sections: [{
      properties: { page: { margin: { top: 1000, bottom: 900, left: 1000, right: 1000 }, size: opts.landscape ? { orientation: PageOrientation.LANDSCAPE } : undefined } },
      children: mdToChildren(md, opts.widths || {}),
    }],
  });
  return Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(outPath, buf); console.log("wrote", outPath, buf.length); });
}

(async () => {
  await build("02_설계도템플릿4장.md", "02_설계도템플릿4장.docx", { widths: { 2: [22, 78] } });
  await build("03_완성예시A_고객문의.md", "03_완성예시A_고객문의.docx", { widths: { 4: [8, 42, 36, 14] } });
  await build("05_옮기기가이드.md", "05_옮기기가이드.docx", { widths: { 3: [22, 30, 48], 2: [28, 72] } });
  if (require("fs").existsSync("07_용어카드.md")) await build("07_용어카드.md", "07_용어카드.docx", { widths: { 3: [18, 30, 52], 2: [24, 76] } });
})();
