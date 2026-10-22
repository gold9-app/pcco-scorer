# -*- coding: utf-8 -*-
"""19차 슬라이드 생성기 — 1280×720 · 31장 · 18차 CSS·헬퍼 상속(복사) + 머리 해부도·4층·세 장면 신설"""

TOTAL = 31
FOOT_L = "19차 · 일꾼은 뭘 알고 일하나"

CSS = r"""
:root{--v:#5B3DF5; --v2:#3B21C8; --vl:#EDE9FE; --vl2:#F6F4FF; --ink:#15132A; --mute:#6E6B85; --line:#E4E1F0;
      --coral:#FF6B4A; --coral-l:#FFEDE8; --mint:#19B393; --mint-l:#E3F8F2; --amber:#F5A524; --amber-l:#FFF5DF; --red:#E5484D; --red-l:#FDECEC;
      --gray:#9A98AE; --gray-l:#F3F2F7;}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Pretendard","Noto Sans CJK KR","Noto Sans KR","Malgun Gothic",sans-serif;background:#2b2a33;color:var(--ink)}
.deck{display:flex;flex-direction:column;align-items:center;gap:20px;padding:20px}
.slide{width:1280px;height:720px;position:relative;overflow:hidden;background:#fff;flex:0 0 auto}
.pad{position:absolute;inset:0;padding:48px 64px 0}
.eyebrow{display:inline-flex;align-items:center;gap:9px;color:var(--v);font-size:14px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}
.eyebrow::before{content:"";width:22px;height:6px;border-radius:3px;background:var(--v)}
.eyebrow.coral{color:var(--coral)} .eyebrow.coral::before{background:var(--coral)}
.title{font-size:40px;font-weight:900;line-height:1.18;letter-spacing:-.025em;margin-top:12px}
.title .hl{color:var(--v)} .title .dim{color:var(--gray);font-weight:800}
.sub{font-size:18px;color:var(--mute);margin-top:8px;line-height:1.5}
.foot{position:absolute;left:64px;right:64px;bottom:22px;display:flex;justify-content:space-between;font-size:12px;color:var(--gray);letter-spacing:.06em;font-weight:700}
.body{margin-top:26px}
/* chips / callouts */
.chip{display:inline-block;border-radius:999px;padding:4px 14px;font-weight:900;font-size:14px;background:var(--vl);color:var(--v2)}
.chip.coral{background:var(--coral-l);color:#C2410C} .chip.mint{background:var(--mint-l);color:#0E7A64} .chip.ink{background:var(--ink);color:#fff} .chip.gray{background:var(--gray-l);color:#4B4966}
.note{margin-top:18px;border-radius:14px;padding:16px 22px;background:var(--vl2);border-left:6px solid var(--v);font-size:19px;line-height:1.5;color:#2A2744}
.note b{color:var(--v2)} .note.coral{background:var(--coral-l);border-color:var(--coral)} .note.coral b{color:#C2410C}
.note.sm{font-size:16px;padding:12px 18px}
.big{font-size:34px;font-weight:900;letter-spacing:-.02em;line-height:1.3}
/* cards */
.cards{display:grid;gap:16px;margin-top:22px}
.c3{grid-template-columns:repeat(3,1fr)} .c4{grid-template-columns:repeat(4,1fr)} .c2{grid-template-columns:repeat(2,1fr)}
.card{border:2px solid var(--line);border-radius:18px;padding:20px 22px;background:#fff;box-shadow:0 2px 0 var(--line)}
.card .k{font-size:12.5px;font-weight:900;letter-spacing:.1em;color:var(--v)}
.card .t{font-size:22px;font-weight:900;margin-top:8px;letter-spacing:-.01em}
.card .d{font-size:14.5px;color:var(--mute);margin-top:8px;line-height:1.5}
.card.hot{border-color:var(--v);background:var(--vl2);box-shadow:0 4px 0 var(--v)}
.card.coral{border-color:#FFB8A5;background:var(--coral-l)} .card.coral .k{color:#C2410C}
.card.gray{border-style:dashed;background:#fafafa;color:var(--gray)} .card.gray .t,.card.gray .k{color:var(--gray)}
.ico{width:46px;height:46px;border-radius:12px;background:var(--vl);display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.ico svg{width:28px;height:28px}
/* table */
.tb{width:100%;border-collapse:separate;border-spacing:0;margin-top:20px;font-size:16px}
.tb th{background:var(--ink);color:#fff;padding:12px 14px;text-align:left;font-size:15px;letter-spacing:.04em}
.tb th:first-child{border-radius:12px 0 0 0} .tb th:last-child{border-radius:0 12px 0 0}
.tb td{padding:12px 14px;border-bottom:2px solid var(--line);line-height:1.45;vertical-align:top}
.tb td.h{font-weight:900;color:var(--v2);background:var(--vl2);width:150px}
.tb .hot{background:var(--vl2);font-weight:900}
.tb.cmp th{text-align:center;font-size:18px} .tb.cmp td{text-align:center;font-size:17px}
.tb.cmp td.h{text-align:left;font-size:15px}
/* diagram primitives */
.box{border:3px solid var(--ink);border-radius:14px;padding:12px 16px;font-weight:900;font-size:17px;background:#fff;text-align:center;line-height:1.3}
.box.v{border-color:var(--v);color:var(--v2);background:var(--vl2)} .box.coral{border-color:var(--coral);color:#C2410C;background:var(--coral-l)}
.box.mint{border-color:var(--mint);color:#0E7A64;background:var(--mint-l)} .box.gray{border-color:#C9C7D6;color:var(--gray);background:#fafafa;border-style:dashed}
.box small{display:block;font-weight:700;font-size:12.5px;color:var(--mute);margin-top:3px}
.worker{width:120px;text-align:center}
.worker .av{width:64px;height:64px;border-radius:18px;margin:0 auto 8px;background:var(--vl);display:flex;align-items:center;justify-content:center}
.worker .av svg{width:38px;height:38px}
.worker .nm{font-weight:900;font-size:16px} .worker .sm{font-size:12.5px;color:var(--mute);margin-top:2px}
.env{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;border:2.5px solid var(--ink);border-radius:10px;padding:8px 12px;font-weight:800;font-size:14px;background:#fff}
.env.q{border-color:var(--red);color:var(--red);border-style:dashed} .env.mix{background:linear-gradient(90deg,var(--vl) 50%,var(--coral-l) 50%)}
.arrow{font-size:34px;font-weight:900;color:var(--v);line-height:1}
.row{display:flex;align-items:center;gap:18px}
.col{display:flex;flex-direction:column;gap:12px}
.legend{display:flex;gap:18px;font-size:14px;color:var(--mute);font-weight:700;align-items:center}
.legend i{display:inline-block;width:16px;height:16px;border-radius:5px;vertical-align:-3px;margin-right:6px}
/* grid 3x3 */
.g33{display:grid;grid-template-columns:150px repeat(3,1fr);grid-template-rows:54px repeat(3,1fr);gap:10px;margin-top:18px;height:420px}
.g33 .hd{background:var(--ink);color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:19px}
.g33 .rh{background:var(--vl);color:var(--v2);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:900;font-size:19px;text-align:center}
.g33 .rh small{font-size:12px;color:var(--mute);font-weight:700;margin-top:4px}
.g33 .cell{border:2.5px solid var(--line);border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:10px;font-weight:900;font-size:19px;line-height:1.25;position:relative}
.g33 .cell small{display:block;font-size:13px;color:var(--mute);font-weight:700;margin-top:5px}
.g33 .cell.hot{border-color:var(--v);background:var(--vl2)} .g33 .cell.coral{border-color:var(--coral);background:var(--coral-l)}
.g33 .cell.empty{border-style:dashed;color:var(--gray);font-size:16px}
.g33 .corner{display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--mute);font-weight:800;text-align:center;line-height:1.3}
/* stairs */
.stairs{position:relative;height:430px;margin-top:10px}
.stair{position:absolute;width:226px;border:3px solid var(--line);border-radius:16px;padding:14px 16px;background:#fff}
.stair .n{width:34px;height:34px;border-radius:10px;background:var(--ink);color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center;font-size:17px}
.stair .t{font-weight:900;font-size:17px;margin-top:10px;line-height:1.25} .stair .w{font-size:13px;color:var(--mute);margin-top:6px;line-height:1.4}
.stair.on{border-color:var(--v);background:var(--vl2)} .stair.on .n{background:var(--v)}
.stair.today{border-color:var(--coral);background:var(--coral-l)} .stair.today .n{background:var(--coral)}
/* tree */
.tree{font-family:ui-monospace,Consolas,"Noto Sans Mono CJK KR",monospace;font-size:19px;line-height:1.95;white-space:pre;background:#fff;border:3px solid var(--ink);border-radius:18px;padding:20px 28px}
.tree .tag{font-family:"Noto Sans CJK KR",sans-serif;display:inline-block;background:var(--v);color:#fff;border-radius:7px;padding:1px 10px;font-size:13.5px;font-weight:900;margin-left:14px;vertical-align:2px}
.tree .tag.coral{background:var(--coral)} .tree .tag.mint{background:var(--mint)}
.tree .cm{color:var(--gray);font-family:"Noto Sans CJK KR",sans-serif;font-size:14px}
/* dark */
.slide.dark{background:radial-gradient(1200px 700px at 85% 110%, #4C2FD6 0%, #1D1842 55%, #15132A 100%)}
.dark .eyebrow{color:#C4B5FD} .dark .eyebrow::before{background:#C4B5FD}
.dark .title{color:#fff} .dark .sub{color:#B9B4D6} .dark .foot{color:#6E6B85}
.qlist{position:absolute;right:64px;top:170px;display:flex;flex-direction:column;gap:14px}
.ql{display:flex;align-items:center;gap:14px;color:#E6E2FF;font-size:19px;font-weight:700}
.ql .n{width:44px;height:44px;border-radius:12px;background:rgba(196,181,253,.18);color:#C4B5FD;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:19px}
.cover-big{position:absolute;left:64px;right:520px;top:190px;font-size:62px;font-weight:900;color:#fff;line-height:1.14;letter-spacing:-.03em}
.cover-big .hl{color:#C4B5FD}
.cover-sub{position:absolute;left:66px;bottom:120px;right:64px;font-size:21px;color:#B9B4D6;line-height:1.5}
.cover-sub b{color:#fff}
.center{position:absolute;left:90px;right:90px;top:230px;text-align:center}
.center .q{font-size:46px;font-weight:900;line-height:1.3;letter-spacing:-.02em;color:#fff}
.center .q .hl{color:#C4B5FD}
.center .s{font-size:20px;color:#B9B4D6;margin-top:22px;line-height:1.6}
/* quiz */
.quiz{display:flex;gap:12px;margin-top:16px}
.qz{flex:1;border:2.5px solid var(--ink);border-radius:14px;padding:11px 14px;font-weight:800;font-size:15px;line-height:1.35;background:#fff}
.qz b{display:block;color:var(--v);font-size:12px;letter-spacing:.1em;margin-bottom:4px}
/* traffic light */
.tl{display:inline-flex;flex-direction:column;align-items:center;gap:3px;background:var(--ink);border-radius:10px;padding:6px}
.tl i{width:14px;height:14px;border-radius:50%;background:#3a3a4a} .tl i.r{background:var(--red)} .tl i.y{background:var(--amber)} .tl i.g{background:var(--mint)}
/* job examples */
.jobs{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px}
.job{border:2px solid var(--line);border-radius:16px;padding:12px 16px;background:#fff}
.job .jn{font-weight:900;font-size:16px;display:flex;align-items:center;gap:8px}
.job .jn i{width:10px;height:10px;border-radius:50%;background:var(--v);display:inline-block}
.job ul{list-style:none;margin-top:8px;display:flex;flex-direction:column;gap:5px}
.job li{font-size:14px;font-weight:700;color:#2A2744;background:var(--gray-l);border-radius:8px;padding:5px 10px}
.job li.q{background:var(--red-l);color:var(--red)}
.ask{margin-top:12px;font-size:17px;font-weight:900;color:var(--coral)}
@media print{@page{size:1280px 720px;margin:0} body{background:#fff} .deck{display:block!important;gap:0;padding:0} .slide{break-after:page;break-inside:avoid}}
"""

# ───────── SVG icons (simple geometric, original) ─────────
def svg_gear(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>'
def svg_bubble(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2"><path d="M4 5h16v11H9l-5 4z" stroke-linejoin="round"/><path d="M8 9h8M8 12.5h5"/></svg>'
def svg_handloop(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2" stroke-linecap="round"><path d="M4 13a8 8 0 0 1 14-5"/><path d="M18 4v4h-4"/><path d="M20 11a8 8 0 0 1-14 5"/><path d="M6 20v-4h4"/></svg>'
def svg_folder(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2" stroke-linejoin="round"><path d="M3 6h6l2 2h10v11H3z"/></svg>'
def svg_phone(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 18h3"/></svg>'
def svg_cloud(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2" stroke-linejoin="round"><path d="M7 18a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.6 1.3A3.4 3.4 0 0 1 17 18z"/></svg>'
def svg_brain(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2" stroke-linejoin="round"><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.5A3 3 0 0 0 7 17h2zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5.5A3 3 0 0 1 17 17h-2z"/><path d="M12 4v16"/></svg>'
def svg_hand(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><path d="M7 11V6a1.5 1.5 0 0 1 3 0v5M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 11a1.5 1.5 0 0 1 3 0v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7L4 15a1.6 1.6 0 0 1 2.6-1.9L7 14"/></svg>'
def svg_rule(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M9 11h7M9 15h7M9 7h3"/></svg>'
def svg_loop(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.4" stroke-linecap="round"><path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 3v5h-5"/></svg>'
def svg_person(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'
def svg_search(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.5-4.5"/></svg>'
def svg_drawer(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.2"><rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M10 7.5h4M10 16.5h4"/></svg>'
def svg_baton(c="#5B3DF5"):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="2.4" stroke-linecap="round"><path d="M4 20 18 6"/><circle cx="19" cy="5" r="2"/></svg>'

def worker(name, sub="", color="#5B3DF5", bg=None):
    style = f'style="background:{bg}"' if bg else ""
    return f'<div class="worker"><div class="av" {style}>{svg_person(color)}</div><div class="nm">{name}</div><div class="sm">{sub}</div></div>'

def head(eyebrow, title, sub=None, coral=False):
    cls = "eyebrow coral" if coral else "eyebrow"
    s = f'<div class="{cls}">{eyebrow}</div><div class="title">{title}</div>'
    if sub: s += f'<div class="sub">{sub}</div>'
    return s

def slide(n, inner, dark=False, pad=True):
    cls = "slide dark" if dark else "slide"
    foot = f'<div class="foot"><span></span><span>{n:02d} / {TOTAL}</span></div>'
    if pad:
        return f'<section class="{cls}"><div class="pad">{inner}</div>{foot}</section>'
    return f'<section class="{cls}">{inner}{foot}</section>'


# ───────── 18차 헬퍼 (journey · pat_svg · glos) ─────────
def journey(steps):
    h = '<div class="row" style="gap:0;margin-top:26px;align-items:stretch">'
    for i,(n,t,d,c,flag) in enumerate(steps):
        h += f'<div style="flex:1;position:relative"><div class="box {c}" style="height:100%;padding:14px 12px;display:flex;flex-direction:column;justify-content:flex-start;border-radius:16px"><div style="font-size:12px;letter-spacing:.1em;color:var(--mute)">{n}</div><div style="font-size:20px;margin-top:4px">{t}</div><div style="font-size:13.5px;font-weight:700;color:var(--mute);margin-top:8px;line-height:1.45">{d}</div></div>{flag}</div>'
        if i < len(steps)-1: h += '<div class="arrow" style="padding:0 6px;align-self:center">→</div>'
    return h + '</div>'
flag = lambda txt: f'<div style="position:absolute;top:-16px;right:10px;background:var(--coral);color:#fff;border-radius:8px;padding:2px 10px;font-size:12px;font-weight:900">⚑ {txt}</div>'
def pat_svg(kind):
    B = 'fill="#fff" stroke="#15132A" stroke-width="3"'
    if kind=="seq":
        return """<svg viewBox="0 0 400 130" width="400" height="130"><defs><marker id="p" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#5B3DF5"/></marker></defs>
        <rect x="20" y="40" width="90" height="50" rx="12" fill="#EDE9FE" stroke="#5B3DF5" stroke-width="3"/><rect x="155" y="40" width="90" height="50" rx="12" fill="#EDE9FE" stroke="#5B3DF5" stroke-width="3"/><rect x="290" y="40" width="90" height="50" rx="12" fill="#EDE9FE" stroke="#5B3DF5" stroke-width="3"/>
        <line x1="112" y1="65" x2="150" y2="65" stroke="#5B3DF5" stroke-width="4" marker-end="url(#p)"/><line x1="247" y1="65" x2="285" y2="65" stroke="#5B3DF5" stroke-width="4" marker-end="url(#p)"/>
        <g font-size="16" font-weight="900" fill="#3B21C8" text-anchor="middle" font-family="Noto Sans CJK KR"><text x="65" y="71">A</text><text x="200" y="71">B</text><text x="335" y="71">C</text></g></svg>"""
    if kind=="par":
        return """<svg viewBox="0 0 400 130" width="400" height="130"><defs><marker id="p2" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#5B3DF5"/></marker></defs>
        <rect x="10" y="40" width="70" height="50" rx="12" fill="#fff" stroke="#15132A" stroke-width="3"/><rect x="320" y="40" width="70" height="50" rx="12" fill="#fff" stroke="#15132A" stroke-width="3"/>
        <g fill="#EDE9FE" stroke="#5B3DF5" stroke-width="3"><rect x="160" y="5" width="80" height="34" rx="10"/><rect x="160" y="48" width="80" height="34" rx="10"/><rect x="160" y="91" width="80" height="34" rx="10"/></g>
        <g stroke="#5B3DF5" stroke-width="4" marker-end="url(#p2)" fill="none"><path d="M82 65 L155 22"/><path d="M82 65 L155 65"/><path d="M82 65 L155 108"/><path d="M242 22 L315 60"/><path d="M242 65 L315 65"/><path d="M242 108 L315 70"/></g>
        <g font-size="14" font-weight="900" fill="#15132A" text-anchor="middle" font-family="Noto Sans CJK KR"><text x="45" y="70">나눔</text><text x="355" y="70">합침</text></g></svg>"""
    if kind=="sup":
        return """<svg viewBox="0 0 400 130" width="400" height="130"><defs><marker id="p3" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#19B393"/></marker></defs>
        <circle cx="200" cy="28" r="24" fill="#5B3DF5"/><text x="200" y="34" text-anchor="middle" fill="#fff" font-size="13" font-weight="900" font-family="Noto Sans CJK KR">지휘자</text>
        <g fill="#EDE9FE" stroke="#5B3DF5" stroke-width="3"><rect x="40" y="85" width="80" height="38" rx="10"/><rect x="160" y="85" width="80" height="38" rx="10"/><rect x="280" y="85" width="80" height="38" rx="10"/></g>
        <g stroke="#9A98AE" stroke-width="3" stroke-dasharray="6 5"><line x1="185" y1="48" x2="85" y2="83"/><line x1="200" y1="52" x2="200" y2="83"/><line x1="215" y1="48" x2="315" y2="83"/></g>
        <g stroke="#19B393" stroke-width="4" marker-end="url(#p3)"><line x1="95" y1="83" x2="190" y2="54"/><line x1="210" y1="83" x2="210" y2="56"/><line x1="325" y1="83" x2="222" y2="54"/></g>
        <text x="365" y="40" font-size="12" fill="#19B393" font-weight="900" font-family="Noto Sans CJK KR">결과만 ↑</text></svg>"""
    if kind=="eval":
        return """<svg viewBox="0 0 400 130" width="400" height="130"><defs><marker id="p4" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#5B3DF5"/></marker><marker id="p5" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#E5484D"/></marker></defs>
        <rect x="30" y="40" width="110" height="50" rx="12" fill="#EDE9FE" stroke="#5B3DF5" stroke-width="3"/><rect x="210" y="40" width="110" height="50" rx="12" fill="#FFEDE8" stroke="#FF6B4A" stroke-width="3"/>
        <path d="M142 55 L205 55" stroke="#5B3DF5" stroke-width="4" marker-end="url(#p4)"/><path d="M208 78 L145 78" stroke="#E5484D" stroke-width="4" marker-end="url(#p5)"/>
        <path d="M322 65 L375 65" stroke="#19B393" stroke-width="4" marker-end="url(#p4)"/>
        <g font-size="15" font-weight="900" text-anchor="middle" font-family="Noto Sans CJK KR"><text x="85" y="71" fill="#3B21C8">만드는 놈</text><text x="265" y="71" fill="#C2410C">보는 놈</text><text x="175" y="108" fill="#E5484D" font-size="12">다시</text><text x="372" y="52" fill="#19B393" font-size="12">통과</text></g></svg>"""
def glos(items, hot):
    h = ""
    for k,v in items:
        h += f'<div style="display:flex;gap:10px;padding:6px 0;border-bottom:1.5px solid var(--line);font-size:14px;line-height:1.4"><b style="width:170px;flex:0 0 170px;color:{"var(--v2)" if hot else "var(--gray)"}">{k}</b><span style="color:#2A2744">{v}</span></div>'
    return h

# ═══════════════════════ 19차 전용 CSS 추가 ═══════════════════════
CSS += r"""
/* 19차 신설 — 머리 해부도 · 4층 · 세 장면 */
.hd{position:relative;border:4px solid var(--ink);border-radius:26px;padding:18px 20px;background:#fff}
.hd .ttl{position:absolute;top:-14px;left:22px;background:var(--ink);color:#fff;border-radius:8px;padding:2px 12px;font-size:13px;font-weight:900;letter-spacing:.08em}
.hd .slot{display:flex;align-items:center;gap:12px;border:2.5px solid var(--v);border-radius:14px;padding:10px 14px;background:var(--vl2);margin-top:10px}
.hd .slot:first-of-type{margin-top:6px}
.hd .slot .n{width:30px;height:30px;border-radius:9px;background:var(--v);color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center;font-size:15px;flex:0 0 30px}
.hd .slot .t{font-weight:900;font-size:18px;flex:1}
.hd .slot .w{font-size:13px;font-weight:800;color:var(--mute);white-space:nowrap}
.hd .slot .w b{color:var(--v2)}
.hd .slot.dim{border-style:dashed;border-color:#C9C7D6;background:#fafafa}
.hd .slot.dim .n{background:#C9C7D6} .hd .slot.dim .t{color:var(--gray)}
.outs{display:flex;flex-direction:column;gap:10px}
.out{display:flex;align-items:center;gap:12px;border:2.5px dashed var(--red);border-radius:14px;padding:10px 14px;background:#fff;color:var(--red);font-weight:900;font-size:17px;opacity:.9}
.out .n{width:30px;height:30px;border-radius:9px;background:var(--red-l);color:var(--red);display:flex;align-items:center;justify-content:center;font-size:15px;flex:0 0 30px}
.out small{display:block;font-size:12.5px;font-weight:700;color:var(--mute);margin-top:2px}
.lay{display:grid;grid-template-columns:70px 170px 1fr 190px 190px 170px;gap:0;margin-top:16px;border:3px solid var(--ink);border-radius:18px;overflow:hidden}
.lay>div{padding:11px 14px;border-bottom:2px solid var(--line);font-size:15px;line-height:1.4;display:flex;align-items:center}
.lay .h{background:var(--ink);color:#fff;font-weight:900;font-size:13.5px;letter-spacing:.04em}
.lay .n{font-weight:900;font-size:22px;color:var(--v);justify-content:center}
.lay .k{font-weight:900;font-size:18px}
.lay .on{background:var(--vl2)}
.lay .on .k{color:var(--v2)}
.lay .mono{font-family:ui-monospace,Consolas,monospace;font-size:14px;color:#2A2744}
.scene{border:3px solid var(--line);border-radius:18px;padding:16px 18px;background:#fff;display:flex;flex-direction:column;gap:10px}
.scene .lab{font-size:12.5px;font-weight:900;letter-spacing:.1em}
.scene .in{font-family:ui-monospace,Consolas,monospace;font-size:14.5px;background:var(--gray-l);border-radius:9px;padding:10px 12px;line-height:1.5;min-height:92px}
.scene .res{font-size:16px;line-height:1.5;color:#2A2744}
.scene.bad{border-color:var(--red)} .scene.bad .lab{color:var(--red)}
.scene.over{border-color:var(--amber)} .scene.over .lab{color:var(--amber)}
.scene.ok{border-color:var(--mint);background:var(--mint-l)} .scene.ok .lab{color:#0E7A64}
.gauge{position:relative;height:54px;border:3px solid var(--ink);border-radius:14px;overflow:hidden;background:#fff}
.gauge i{position:absolute;top:0;bottom:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:#fff}
.gauge .tick{position:absolute;right:0;top:0;bottom:0;width:6px;background:var(--red)}
"""

def hd_slot(n, t, who, when, dim=False):
    return f'<div class="slot{" dim" if dim else ""}"><div class="n">{n}</div><div class="t">{t}</div><div class="w"><b>{who}</b> · {when}</div></div>'

def head_box(title, slots, extra=""):
    return f'<div class="hd"><div class="ttl">{title}</div>{"".join(slots)}{extra}</div>'

JOB = lambda name, items, chip="": f'<div class="job"><div class="jn"><i></i>{name}{chip}</div><ul>{"".join(f"<li{x}>{t}</li>" for x,t in items)}</ul></div>'

S = []

# 01 표지
S.append(slide(1, f"""
<div class="eyebrow" style="position:absolute;left:64px;top:50px">19TH · 전체 강의(초급·중급 합반) · 순강의 150분</div>
<div class="cover-big">일꾼은<br><span class="hl">뭘 알고</span> 일하나</div>
<div class="qlist">
  <div class="ql"><div class="n">?</div>일꾼 머리에 <b>지금 뭐가 들었나</b> — 그리고 뭐가 없나</div>
  <div class="ql"><div class="n">→</div>넣는 길 넷 — <b>늘 · 이번에 · 남겨서 · 꺼내서</b></div>
  <div class="ql"><div class="n">✂</div>넣을 것, 뺄 것, 언제 — <b>필요한 것만, 필요한 때, 짧게</b></div>
</div>
<div class="cover-sub">머리에 넣는 것과 빼는 것 — 기억과 문맥<br>오늘 나갈 때 — <b>일꾼 머리 속을 읽는 눈 하나.</b> 만드는 건 없습니다. 열어 보고, 이름을 붙입니다.</div>
""", dark=True, pad=False))

# 02 지난번과 오늘
S.append(slide(2, head("오프닝 · 지난번과 오늘", '18차가 남긴 질문 하나 — <span class="hl">"그럼 뭘 알려줘야 하는데요?"</span>') + """
<div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:18px;align-items:stretch">
  <div class="card" style="padding:22px"><div class="k">지난번 (18차)</div><div class="t" style="font-size:21px">누가 받았는지 봤다</div><div class="d" style="font-size:15.5px;color:#2A2744;margin-top:10px;line-height:1.6">보내는 표 · 일꾼 · 얇은 지휘자 · 관문 · 기록 — 다섯 이름.<br>마지막 손들기: <b>"서브에이전트가 내 대화를 알까요?"</b> → <b style="color:var(--red)">모른다.</b></div></div>
  <div class="card hot" style="padding:22px"><div class="k">오늘 (19차)</div><div class="t" style="font-size:21px">받은 사람의 머리를 연다</div><div class="d" style="font-size:15.5px;color:#2A2744;margin-top:10px;line-height:1.6">모른다면 — <b>뭘 알려줘야 하나?</b> 뭘 넣고, 뭘 빼고, 언제 넣나.<br>새 이름은 넷뿐: <b>머리 해부도 · 문맥 4층 · 병 셋 · 넣는 법 4.</b></div></div>
</div>
<div class="row" style="margin-top:22px;gap:12px"><span class="chip ink">오늘 형식</span><span class="chip">복습 25분</span><span class="chip">순강의</span><span class="chip">손들기 6번</span><span class="chip">직무별 예시 3번</span><span class="chip coral">과제는 맨 끝에</span><span class="chip gray">노트북 불필요</span></div>
<div class="note" style="margin-top:18px">후렴 — <b>"지난번엔 누가 받았는지 봤습니다. 오늘은 받은 사람이 뭘 알고 있는지 봅니다."</b></div>
"""))

# 03 복습 — 에이전트 · 4부품 · 작업대
S.append(slide(3, head("Part 0 · 복습 ① 에이전트", '에이전트 = <span class="hl">목표를 받고, 손을 써서, 결과를 보고, 다음을 스스로 정하는</span> AI') + f"""
<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:14px;align-items:start">
<div class="cards c2" style="margin-top:0;gap:12px">
  <div class="card hot" style="padding:14px 16px"><div class="ico" style="background:#fff">{svg_brain()}</div><div class="k">머리</div><div class="t" style="font-size:19px">모델 — 판단하는 곳</div><div class="d">오늘의 주인공</div></div>
  <div class="card" style="padding:14px 16px"><div class="ico">{svg_hand()}</div><div class="k">손</div><div class="t" style="font-size:19px">도구</div><div class="d">읽기 · 쓰기 · 실행</div></div>
  <div class="card" style="padding:14px 16px"><div class="ico">{svg_rule()}</div><div class="k">규칙</div><div class="t" style="font-size:19px">지침</div><div class="d">해도 되는 것, 안 되는 것</div></div>
  <div class="card" style="padding:14px 16px"><div class="ico">{svg_loop()}</div><div class="k">루프</div><div class="t" style="font-size:19px">보고, 다음을 정한다</div><div class="d">에러도 결과다</div></div>
</div>
<div>
<table class="tb" style="margin-top:0;font-size:16px">
<tr><th style="width:200px"></th><th>작업대 = Claude Code</th><th style="background:var(--v)">에이전트</th></tr>
<tr><td class="h">머리 · 손 · 루프</td><td style="color:var(--gray);font-weight:800">빌려 준다</td><td class="hot" style="color:var(--gray);font-weight:400">—</td></tr>
<tr><td class="h" style="background:var(--coral-l);color:#C2410C">규칙 · 일꾼 · 보내는 표 · 남기는 곳</td><td style="color:var(--gray)">—</td><td class="hot" style="background:var(--coral-l);color:#C2410C">설계하는 사람의 몫</td></tr>
</table>
<div class="note sm" style="margin-top:12px">에이전트 ≠ 똑똑한 LLM — 차이는 <b>손과 루프</b>. Claude Code는 <b>작업대</b> — 빌려 주는 것과 내 몫을 가른다. 오늘은 넷 중 <b>머리</b>를 연다.</div>
</div>
</div>
"""))

# 04 복습 — 병 넷 → 나눈다 → 새 문제 둘
S.append(slide(4, head("Part 0 · 복습 ② 왜 나누나", '지침 한 장에 다 넣으면 <span class="hl">병 넷</span> → 나눈다 → <span class="hl">새 문제 둘</span>') + """
<div class="cards c4" style="margin-top:18px;gap:12px">
  <div class="card hot" style="padding:14px 16px"><div class="k" style="color:var(--red)">①</div><div class="t" style="font-size:18px">머리에 담는 양의 한계</div><div class="d">컨텍스트 — <b style="color:var(--v)">오늘 길게</b></div></div>
  <div class="card" style="padding:14px 16px"><div class="k" style="color:var(--red)">②</div><div class="t" style="font-size:18px">규칙끼리 싸운다</div></div>
  <div class="card" style="padding:14px 16px"><div class="k" style="color:var(--red)">③</div><div class="t" style="font-size:18px">3번째 단계에서 무너진다</div></div>
  <div class="card" style="padding:14px 16px"><div class="k" style="color:var(--red)">④</div><div class="t" style="font-size:18px">어디서 틀렸는지 모른다</div></div>
</div>
<div class="row" style="margin-top:26px;justify-content:center;gap:22px">
  <div class="box" style="font-size:20px;padding:14px 26px">지침 한 장 = 일꾼 한 명이 전부</div>
  <div class="arrow">→</div>
  <div class="box v" style="font-size:22px;padding:14px 30px">나눈다 — 일꾼 한 명 = 지침 한 장</div>
  <div class="arrow">→</div>
  <div class="col" style="gap:8px"><div class="box coral" style="padding:8px 16px;font-size:16px">누구에게 보내나 = 라우팅</div><div class="box coral" style="padding:8px 16px;font-size:16px">어떻게 잇나 = 오케스트레이션</div></div>
</div>
<div class="big" style="margin-top:26px;text-align:center;font-size:28px">"에이전트는 똑똑한 하나가 아니라, <span style="color:var(--v)">나뉜 여럿과 그 사이의 규칙</span>이다."</div>
<div class="note sm" style="margin-top:14px">나누면 각자 머리가 작아진다(병 ①의 해법). 그런데 작아진 머리에 <b>뭐가 들어 있나</b> — 그게 오늘.</div>
"""))

# 05 복습 — 라우팅
S.append(slide(5, head("Part 0 · 복습 ③ 라우팅", '라우팅 = 접수창구 — <span class="hl">보기만 하고 보낸다</span>') + f"""
<div class="row" style="margin-top:22px;justify-content:center;gap:26px">
  <div class="col" style="gap:8px"><div class="env">배너 하나만요</div><div class="env">지난주 CTR 어땠어요?</div><div class="env q">회식 장소 추천?</div></div>
  <div class="arrow">→</div>
  <div class="box v" style="width:200px;padding:18px 14px"><div style="width:44px;height:44px;border-radius:12px;background:#fff;margin:0 auto 8px;display:flex;align-items:center;justify-content:center">{svg_search()}</div>보내는 표<small>분류 기준 문장</small></div>
  <div class="arrow">→</div>
  <div class="col" style="gap:10px">{worker("소재 일꾼","지침 한 장")}{worker("성과 일꾼","지침 한 장")}<div class="box coral" style="padding:6px 10px;font-size:13px;width:120px">모르면 → 사람</div></div>
</div>
<div class="cards c3" style="margin-top:22px;gap:12px">
  <div class="card" style="padding:14px 16px"><div class="k">세 군데</div><div class="d" style="color:#2A2744">요청→일꾼 · 행동→도구 · 난이도→모델</div></div>
  <div class="card" style="padding:14px 16px"><div class="k">빠뜨리는 셋</div><div class="d" style="color:#2A2744">모르는 요청(→ 사람) · 섞인 요청 · 잘못 간 요청</div></div>
  <div class="card hot" style="padding:14px 16px"><div class="k">한 줄</div><div class="d" style="color:#2A2744">"라우팅은 코드가 아니라 <b>분류 기준 문장</b>이다"</div></div>
</div>
<div class="note sm" style="margin-top:14px">오늘 쓰이는 자리 — 보내는 표의 한 줄이 일꾼을 부를 때 <b>뭘 같이 넘기나</b>를 정한다. 그게 오늘 2층.</div>
"""))

# 06 복습 — 오케스트레이션
ph = '<div class="row" style="gap:16px;margin-top:22px;justify-content:space-between">'
for kr,k in [("줄","seq"),("나눔","par"),("감독","sup"),("되돌림","eval")]:
    ph += f'<div style="text-align:center;width:276px"><div style="width:276px;height:96px;overflow:hidden"><div style="transform:scale(.69);transform-origin:top left;width:400px">{pat_svg(k)}</div></div><span class="chip ink" style="font-size:17px">{kr}</span></div>'
ph += '</div>'
S.append(slide(6, head("Part 0 · 복습 ④ 오케스트레이션", '지휘자 = <span class="hl">순서 · 상태 · 호출</span>로 잇는다 — 연주는 하지 않는다') + ph + """
<div class="cards c3" style="margin-top:26px;gap:14px">
  <div class="card" style="padding:18px 20px"><div class="k">얇은 지휘자</div><div class="d" style="color:#2A2744">판단은 일꾼이, 규칙은 지침이. 지휘자가 일까지 하면 지침 한 장 시절로</div></div>
  <div class="card hot" style="padding:14px 16px"><div class="k">상태</div><div class="d" style="color:#2A2744">어디까지 됐나 — <b style="color:var(--v)">오늘 3층의 이름</b>. 감독·되돌림이 도는 조건</div></div>
  <div class="card" style="padding:14px 16px"><div class="k">사람 관문</div><div class="d" style="color:#2A2744">돈 · 밖 · 되돌릴 수 없음 앞에</div></div>
</div>
<div class="note sm" style="margin-top:14px">패턴 넷 중 <b>감독</b>과 <b>되돌림</b>은 두 번째 바퀴가 있다 — 두 번째 바퀴의 일꾼이 첫 바퀴를 아나? 15에서.</div>
"""))

# 07 복습 — 머리 공유 안 함 + Q0
S.append(slide(7, head("Part 0 · 복습 ⑤ ⭐ + 손들기 Q0", '✋ 서브에이전트가 <span class="hl">내 대화 내용</span>을 알까요? — 그럼 뭘 알려줘야 하나?', coral=True) + """
<div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:16px;align-items:center">
  <svg viewBox="0 0 560 360" width="560" height="360" font-family="Noto Sans CJK KR" font-weight="900">
    <circle cx="150" cy="70" r="42" fill="#5B3DF5"/><text x="150" y="76" text-anchor="middle" fill="#fff" font-size="16">지휘자</text>
    <path d="M215 30 h190 a12 12 0 0 1 12 12 v44 a12 12 0 0 1 -12 12 h-160 l-24 16 v-16 h-6 a12 12 0 0 1 -12 -12 v-44 a12 12 0 0 1 12 -12z" fill="#fff" stroke="#15132A" stroke-width="2.5"/>
    <text x="310" y="56" text-anchor="middle" font-size="13" fill="#15132A">"이번엔 톤 밝게"</text><text x="310" y="78" text-anchor="middle" font-size="13" fill="#15132A">아까 읽은 파일 · 지난 대화</text>
    <g stroke="#E5484D" stroke-width="4"><line x1="130" y1="135" x2="170" y2="175"/><line x1="170" y1="135" x2="130" y2="175"/></g>
    <text x="150" y="200" text-anchor="middle" font-size="13" fill="#E5484D">일꾼에게 전달되지 않는다</text>
    <g fill="#fff" stroke="#15132A" stroke-width="2"><rect x="20" y="240" width="150" height="36" rx="8"/><rect x="205" y="240" width="150" height="36" rx="8"/><rect x="390" y="240" width="150" height="36" rx="8"/></g>
    <g font-size="12" fill="#15132A" text-anchor="middle"><text x="95" y="263">받은 요청 + 내 지침</text><text x="280" y="263">받은 요청 + 내 지침</text><text x="465" y="263">받은 요청 + 내 지침</text></g>
    <g fill="#EDE9FE" stroke="#5B3DF5" stroke-width="3"><rect x="20" y="286" width="150" height="58" rx="14"/><rect x="205" y="286" width="150" height="58" rx="14"/><rect x="390" y="286" width="150" height="58" rx="14"/></g>
    <g fill="#3B21C8" font-size="17" text-anchor="middle"><text x="95" y="321">소재 일꾼</text><text x="280" y="321">성과 일꾼</text><text x="465" y="321">일정 일꾼</text></g>
  </svg>
  <div class="col" style="gap:14px">
    <div class="big" style="font-size:40px;color:var(--red)">모른다.</div>
    <div style="font-size:17.5px;line-height:1.6;color:#2A2744">일꾼은 <b>받은 요청 + 자기 지침</b>, 그것만 안다. 18차의 마지막 한 줄이 여기까지였다 — "그래서 파일과 계약으로."</div>
    <div class="card coral" style="padding:16px 18px"><div class="k">오늘의 출발선</div><div class="t" style="font-size:22px">그럼 뭘 알려줘야 하나?</div><div class="d" style="font-size:15px;color:#2A2744">뭘 넣고 · 뭘 빼고 · 언제 넣나. 그 전에 — 일꾼 머리에 지금 <b>뭐가 들었는지</b>부터 열어 본다.</div></div>
  </div>
</div>
"""))

# 08 머리 해부도 — 든 것 넷
S.append(slide(8, head("Part 1 · 머리 해부도 ⭐", '일꾼 한 명이 일하는 순간, 머리에 든 것 — <span class="hl">넷</span>') + f"""
<div style="display:grid;grid-template-columns:1fr 380px;gap:28px;margin-top:22px;align-items:start">
{head_box("소재 일꾼의 머리 — 지금 이 순간", [
  hd_slot("①","지침 한 장 (일꾼 지침 + 전체 규칙)","작업대가 읽어 준다","늘"),
  hd_slot("②","이번 요청문 + 같이 넘긴 파일 경로","지휘자가 넣는다","이번에"),
  hd_slot("③","손으로 읽은 파일","일꾼이 스스로","읽는 순간부터"),
  hd_slot("④","손을 쓴 결과 · 에러","작업대가 돌려준다","쓸 때마다"),
])}
<div class="col" style="gap:12px">
  <div class="card"><div class="k">사람 직원과 다른 점</div><div class="d" style="font-size:15px;color:#2A2744;line-height:1.55">사람은 어제 일을 기억하고, 책상 위 서류를 봤고, 옆자리 대화를 들었다.<br>일꾼은 <b>셋 다 아니다.</b> 이 네 칸이 전부다.</div></div>
  <div class="card hot"><div class="k">비유</div><div class="t" style="font-size:19px">책상 위에 지금 펼쳐 놓은 것</div><div class="d" style="color:#2A2744">서랍 속은 아니다. 펼친 것만 보인다.</div></div>
  <div class="legend"><span><i style="background:var(--v)"></i>든 것</span><span><i style="background:#C9C7D6"></i>작업대가 넣는 것</span><span><i style="background:var(--coral)"></i>설계하는 사람이 넣는 것 (②)</span></div>
</div>
</div>
"""))

# 09 안 든 것 넷 + Q1·Q2
S.append(slide(9, head("Part 1 · 안 든 것 넷 ⭐ + 손들기 Q1·Q2", '"당연히 알겠지" — <span class="hl">없다</span>. 머리는 매번 비어서 태어난다', coral=True) + f"""
<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:16px;align-items:start">
<div class="outs">
  <div class="out"><div class="n">⑤</div><div>내 대화 — 지휘자 창에서 내가 한 말<small>"아까 톤 밝게 하라고 했는데" — 일꾼은 별도 머리 (Q0)</small></div></div>
  <div class="out"><div class="n">⑥</div><div>다른 일꾼이 한 일<small>"성과 일꾼이 찾은 걸 왜 몰라" — 머리를 공유하지 않는다</small></div></div>
  <div class="out"><div class="n">⑦</div><div>어제 처리한 건<small>"지난주에 같은 거 했잖아" — 일이 끝나면 머리는 비워진다</small></div></div>
  <div class="out"><div class="n">⑧</div><div>폴더에 있지만 안 읽은 파일<small>"규정집이 바로 옆에 있는데" — 있다고 아는 게 아니다, 읽은 것만</small></div></div>
</div>
<div class="col" style="gap:12px">
  <div style="font-size:13px;font-weight:900;letter-spacing:.12em;color:var(--coral)">✋ 손들기</div>
  <div class="qz"><b>Q1</b>일꾼이 어제 처리한 건을 기억할까요?<div style="color:var(--red);margin-top:6px;font-size:18px">모른다</div></div>
  <div class="qz"><b>Q2</b>폴더에 있는 파일을 일꾼이 다 알까요?<div style="color:var(--red);margin-top:6px;font-size:18px">아니다 — 읽은 것만</div></div>
  <div class="big" style="font-size:24px;margin-top:6px">"머리는 매번 <span style="color:var(--v)">비어서 태어난다.</span><br>일꾼이 아는 것은 전부 <span style="color:var(--v)">누군가 넣어 준 것</span>이다."</div>
</div>
</div>
"""))

# 10 머리에는 크기가 있다
S.append(slide(10, head("Part 1 · 머리에는 크기가 있다", '한 번에 담는 양이 정해져 있다 — <span class="hl">넣을수록 자리가 준다</span>') + """
<div style="margin-top:22px">
  <div style="font-size:13px;font-weight:900;letter-spacing:.1em;color:var(--mute);margin-bottom:8px">머리의 눈금 — 넣은 것</div>
  <div class="gauge"><i style="left:0;width:14%;background:var(--v)">① 지침</i><i style="left:14%;width:10%;background:#7C5CFF">② 요청</i><i style="left:24%;width:30%;background:#9F8BFF">③ 읽은 파일</i><i style="left:54%;width:16%;background:#C4B5FD;color:#3B21C8">④ 결과</i><i style="left:70%;width:24%;background:#eee;color:var(--gray)">남은 자리</i><div class="tick"></div></div>
  <div style="font-size:13px;font-weight:900;letter-spacing:.1em;color:var(--red);margin:18px 0 8px">"불안하니까 다 넣자" — 폴더 통째 · 대화 전체 · 지난 결과 전부</div>
  <div class="gauge" style="border-color:var(--red)"><i style="left:-8%;width:12%;background:#ddd;color:var(--gray)">① 밀려남</i><i style="left:4%;width:8%;background:#7C5CFF">②</i><i style="left:12%;width:60%;background:#9F8BFF">③ 폴더 200개 + 대화 전체 + 성과표</i><i style="left:72%;width:28%;background:#C4B5FD;color:#3B21C8">④ 긴 출력</i><div class="tick"></div></div>
</div>
<div class="cards c3" style="margin-top:26px">
  <div class="card"><div class="k" style="color:var(--red)">넘치면</div><div class="t" style="font-size:19px">앞을 잊는다</div><div class="d">지침이 밀려 나간다 — "앞의 규칙을 잊은 것처럼"</div></div>
  <div class="card"><div class="k" style="color:var(--red)">가득 차면</div><div class="t" style="font-size:19px">중간을 놓친다</div><div class="d">앞뒤는 보고 중간은 흐려진다</div></div>
  <div class="card"><div class="k" style="color:var(--red)">안 넘쳐도</div><div class="t" style="font-size:19px">느리고 비싸다</div><div class="d">넣은 양만큼 — 그리고 엉뚱한 걸 중요하게 본다</div></div>
</div>
<div class="note sm" style="margin-top:14px">18차 병 ①(컨텍스트) 그 자체. 크기는 모델마다 다르지만 — <b>크기가 아니라 무엇을 넣나</b>가 오늘.</div>
"""))

# 11 질문이 바뀐다 — 지도
S.append(slide(11, head("Part 1 · 그래서 질문이 바뀐다", '"AI가 멍청하다" → <span class="hl">"몰랐다 / 너무 많이 알았다"</span>') + """
<div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:22px;align-items:center">
  <div class="col" style="gap:12px">
    <div class="row" style="gap:14px"><div class="box coral" style="width:260px;padding:12px">"엉뚱한 소재를 냈어요"</div><div class="arrow">→</div><div class="box v" style="flex:1;padding:12px;font-size:15px">성과를 <b>몰랐다</b> (②가 비었다)</div></div>
    <div class="row" style="gap:14px"><div class="box coral" style="width:260px;padding:12px">"규정과 다르게 답했어요"</div><div class="arrow">→</div><div class="box v" style="flex:1;padding:12px;font-size:15px">규정집을 <b>안 읽었다</b> (⑧)</div></div>
    <div class="row" style="gap:14px"><div class="box coral" style="width:260px;padding:12px">"앞에서 시킨 걸 까먹어요"</div><div class="arrow">→</div><div class="box v" style="flex:1;padding:12px;font-size:15px"><b>너무 많이</b> 넣었다 (넘침)</div></div>
    <div class="row" style="gap:14px"><div class="box coral" style="width:260px;padding:12px">"두 번째엔 처음부터 다시 해요"</div><div class="arrow">→</div><div class="box v" style="flex:1;padding:12px;font-size:15px">남긴 게 <b>없었다</b> (⑦)</div></div>
  </div>
  <div class="card hot" style="padding:22px">
    <div class="k">오늘 남은 시간의 지도</div>
    <div class="col" style="gap:10px;margin-top:10px">
      <div class="row" style="gap:12px"><span class="chip ink">Part 2</span><div style="font-weight:900;font-size:18px">넣는 길 넷 — 문맥 4층</div></div>
      <div class="row" style="gap:12px"><span class="chip ink">Part 3</span><div style="font-weight:900;font-size:18px">병 셋 · 넣는 법 넷</div></div>
      <div class="row" style="gap:12px"><span class="chip ink">Part 4</span><div style="font-weight:900;font-size:18px">같은 요청의 세 장면 · 해부도</div></div>
    </div>
    <div class="d" style="margin-top:14px;font-size:15px;color:#2A2744">멍청함의 문제면 할 수 있는 게 없다. <b>몰랐다</b>의 문제면 — 넣어 주면 된다. 그래서 설계 문제다.</div>
  </div>
</div>
"""))

# 12 문맥 4층 한눈에
S.append(slide(12, head("Part 2 · 문맥 4층 ⭐", '머리에 들어가는 길은 넷 — <span class="hl">늘 · 이번에 · 남겨서 · 꺼내서</span>') + """
<div class="lay">
  <div class="h">층</div><div class="h">우리말</div><div class="h">무엇</div><div class="h">누가 넣나</div><div class="h">얼마나 사나</div><div class="h">어디에 (해부도)</div>
  <div class="n">1</div><div class="k">늘 드는 것</div><div>지침 — 일꾼 지침 한 장 + 전체 규칙</div><div style="color:var(--gray);font-weight:800">작업대가 매번 읽어 준다</div><div>모든 일에</div><div class="mono">일꾼/○○.md · CLAUDE.md</div>
  <div class="n on">2</div><div class="k on">이번에 넣는 것</div><div class="on">요청문 + 같이 넘기는 <b>파일 경로</b> — 계약의 "받는 것"</div><div class="on" style="color:#C2410C;font-weight:800">지휘자 (보내는 표의 줄)</div><div class="on">이번 일에만</div><div class="mono on">inbox/ + 부를 때 한 줄</div>
  <div class="n on">3</div><div class="k on">하다가 남긴 것</div><div class="on">진행 중 상태 — 어디까지 됐나, 뭘 냈나</div><div class="on" style="color:#C2410C;font-weight:800">일꾼 · 지휘자가 적는다</div><div class="on"><b>적어야 산다</b></div><div class="mono on">runs/</div>
  <div class="n">4</div><div class="k">찾아 꺼내는 것</div><div>규정집 · 과거 사례 · 브랜드 가이드</div><div style="color:#C2410C;font-weight:800">일꾼이 손으로 <b>찾아 읽는다</b></div><div>두는 한 — 꺼내야 안다</div><div class="mono">자료/</div>
</div>
<div class="row" style="margin-top:16px;gap:16px;align-items:stretch">
  <div class="note sm" style="margin-top:0;flex:1">회색 = 작업대가 넣는다 · <b style="color:#C2410C">주황 = 설계하는 사람이 정한다.</b> "Claude Code가 알아서 넣어 주지 않나요?" — 1층과 손의 결과뿐. <b>2·3·4층은 내 몫.</b></div>
  <div class="note sm coral" style="margin-top:0;flex:1">넷은 <b>누가 넣나 · 언제 들어가나 · 얼마나 사나</b>가 다르다. 한 층을 다른 층 자리에 넣으면 병이 난다(18~23).</div>
</div>
"""))

# 13 1층 + 직무별 예시 ①
S.append(slide(13, head("Part 2 · 1층 늘 드는 것 + 직무별 예시 ①", '지침 — <span class="hl">짧아야 한다</span>. 모든 일에 들어가니까') + """
<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:14px;align-items:start">
  <div class="card hot" style="padding:18px"><div class="k">늘 드는 것 = 일꾼 지침 한 장 + 전체 규칙</div><div class="d" style="font-size:15.5px;color:#2A2744;line-height:1.6;margin-top:8px">작업대가 일을 시작할 때마다 읽어 준다. 안 시켜도 든다. 그래서 <b>모든 일에 자리를 먹는다.</b><br><b style="color:var(--red)">열 줄 넘으면 신호</b> — 늘 필요한 것만 남기고, 나머지는 4층으로. "○○일 때 자료/○○의 해당 항목을 읽는다" 한 줄로 내려보낸다.</div></div>
  <div class="card" style="padding:18px"><div class="k">전체 규칙(CLAUDE.md)과 일꾼 지침</div><div class="d" style="font-size:15.5px;color:#2A2744;line-height:1.6;margin-top:8px">전체 규칙은 지휘자용. 일꾼이 알아야 할 규칙은 <b>일꾼 지침에 적는다</b> — 전체 규칙에 기대지 않는다. 전체 규칙이 일꾼에게 가더라도 일꾼에겐 소음이다.</div></div>
</div>
<div style="margin-top:14px;font-size:13px;font-weight:900;letter-spacing:.12em;color:var(--coral)">직무별 예시 ① — 이 일꾼이 늘 알아야 할 것, 세 줄</div>
<div class="jobs">
  <div class="job"><div class="jn"><i></i>마케터 — 소재 일꾼</div><ul><li>브랜드 톤 (밝게·반말 금지)</li><li>초안은 항상 3개</li><li>금지어 5개</li></ul></div>
  <div class="job"><div class="jn"><i></i>인사·총무 — 규정 일꾼</div><ul><li>답변 형식 (근거 조항 명시)</li><li>규정집은 해당 항목만 읽는다</li><li>개인정보는 답에 넣지 않는다</li></ul></div>
  <div class="job"><div class="jn"><i></i>영업·CS — 견적 일꾼</div><ul><li>견적 양식 · 단위 · 통화</li><li>단가표는 자료/에서 그 품목만</li><li>할인은 쓰지 않는다 (사람 확인)</li></ul></div>
</div>
<div class="ask">→ 내 일꾼이 늘 알아야 할 것 세 줄은? (1분) &nbsp;<span style="color:var(--mute);font-weight:700;font-size:14px">네 줄째부터는 "꼭 늘 필요한가?"를 묻는다</span></div>
"""))

# 14 2층
S.append(slide(14, head("Part 2 · 2층 이번에 넣는 것 ⭐", '계약의 "받는 것" — <span class="hl">여기 적힌 것이 일꾼이 아는 전부</span>', coral=True) + f"""
<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:16px;align-items:start">
  <div>
    <div style="font-size:13px;font-weight:900;letter-spacing:.1em;color:var(--mute)">지휘자가 소재 일꾼을 부를 때 넘기는 쪽지</div>
    <div class="tree" style="font-size:16px;line-height:1.7;margin-top:8px;padding:16px 20px">요청 원문: "광고 소재 3개 뽑아 주세요"
참고: 자료/브랜드.md 의 "톤" 항목
<span class="cm">— 이게 전부. 내 대화는 없다.</span></div>
    <div class="row" style="margin-top:12px;gap:8px"><span class="chip ink">원문</span><span class="arrow" style="font-size:20px">+</span><span class="chip coral">파일 경로</span><span class="arrow" style="font-size:20px">=</span><span class="chip">받는 것</span></div>
  </div>
  <div class="col" style="gap:12px">
    <div class="card hot"><div class="k">왜 이 칸이 핵심인가</div><div class="d" style="font-size:15.5px;color:#2A2744;line-height:1.6">18차 보내는 표의 한 줄("소재 요청 → 소재 일꾼")이 <b>이 쪽지를 채운다.</b> 설계에서 가장 자주 비어 있는 칸 — 원문만 넘기고 "왜 몰라?" 한다.</div></div>
    <div class="card"><div class="k">내용이 아니라 경로</div><div class="d" style="font-size:15.5px;color:#2A2744;line-height:1.6">브랜드 가이드 20줄을 복사해 넣지 않는다. <b>경로 한 줄</b>을 넘기고, 읽는 건 일꾼이(③). 21에서 길게.</div></div>
    <div class="card coral"><div class="k">내 대화에서 한 말은</div><div class="d" style="font-size:15px;color:#2A2744">여기 적지 않으면 <b>없는 말</b>이다. "이번엔 톤 밝게"는 쪽지에 적는다.</div></div>
  </div>
</div>
"""))

# 15 3층 + Q3
S.append(slide(15, head("Part 2 · 3층 하다가 남긴 것 ⭐ + 손들기 Q3", 'runs/ — <span class="hl">적어야 산다</span>. 두 번째 바퀴의 일꾼은 첫 바퀴를 모른다', coral=True) + f"""
<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:14px;align-items:center">
  <svg viewBox="0 0 560 330" width="560" height="330" font-family="Noto Sans CJK KR" font-weight="900">
    <defs><marker id="r1" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#5B3DF5"/></marker></defs>
    <rect x="20" y="30" width="200" height="70" rx="14" fill="#EDE9FE" stroke="#5B3DF5" stroke-width="3"/><text x="120" y="60" text-anchor="middle" fill="#3B21C8" font-size="16">1바퀴 · 변경 일꾼</text><text x="120" y="84" text-anchor="middle" fill="#6E6B85" font-size="12">초안 → 검토 "수정 요청"</text>
    <rect x="340" y="30" width="200" height="70" rx="14" fill="#EDE9FE" stroke="#5B3DF5" stroke-width="3"/><text x="440" y="60" text-anchor="middle" fill="#3B21C8" font-size="16">2바퀴 · 변경 일꾼</text><text x="440" y="84" text-anchor="middle" fill="#E5484D" font-size="12">머리는 다시 비어 있다</text>
    <path d="M222 65 L335 65" stroke="#C9C7D6" stroke-width="4" stroke-dasharray="7 6"/><text x="278" y="52" text-anchor="middle" fill="#9A98AE" font-size="12">머릿속은 안 넘어간다</text>
    <rect x="180" y="170" width="200" height="60" rx="12" fill="#E3F8F2" stroke="#19B393" stroke-width="3"/><text x="280" y="196" text-anchor="middle" fill="#0E7A64" font-size="15">runs/…/1바퀴.md</text><text x="280" y="216" text-anchor="middle" fill="#0E7A64" font-size="11.5">초안 · 수정 요청 이유 · 어디까지</text>
    <path d="M120 103 L240 168" stroke="#19B393" stroke-width="4" marker-end="url(#r1)"/><path d="M320 168 L440 103" stroke="#19B393" stroke-width="4" marker-end="url(#r1)"/>
    <text x="150" y="150" text-anchor="middle" fill="#0E7A64" font-size="12">적는다</text><text x="410" y="150" text-anchor="middle" fill="#0E7A64" font-size="12">읽는다 (2층 경로로)</text>
    <text x="280" y="290" text-anchor="middle" fill="#15132A" font-size="15">상태 = 어디까지 됐나 — 파일에 적힌 만큼만 다음 바퀴가 안다</text>
  </svg>
  <div class="col" style="gap:12px">
    <div class="qz" style="border-color:var(--coral);background:var(--coral-l)"><b style="color:#C2410C">Q3 ✋</b>하다 만 걸 다음 일꾼이 알까요?<div style="color:#C2410C;margin-top:6px;font-size:18px">파일에 적은 만큼만</div></div>
    <div class="card hot"><div class="k">그래서 감독·되돌림이 돈다</div><div class="d" style="font-size:15px;color:#2A2744;line-height:1.55">18차 "상태"의 실체가 이것. 지휘자는 머릿속에 상태를 들지 않는다 — <b>runs/에 적고, 다음 바퀴 쪽지(2층)에 그 경로를 넣는다.</b></div></div>
    <div class="card"><div class="k">비유</div><div class="t" style="font-size:18px">포스트잇</div><div class="d">"여기까지 했음, 다음은 이거." 안 붙이면 교대 근무자가 처음부터</div></div>
  </div>
</div>
"""))

# 16 4층
S.append(slide(16, head("Part 2 · 4층 찾아 꺼내는 것", '자료/ — <span class="hl">두는 것과 꺼내는 것은 다르다</span>') + f"""
<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:18px;align-items:start">
  <div class="card" style="padding:20px;border-color:#FFB8A5">
    <div class="k" style="color:var(--red)">두기만 하면</div>
    <div class="row" style="gap:14px;margin-top:10px"><div class="ico" style="margin:0;background:var(--gray-l)">{svg_drawer('#9A98AE')}</div><div class="tree" style="font-size:14px;padding:10px 14px;line-height:1.6;flex:1">자료/
  규정집.md  (40쪽)
  브랜드.md
  지난사례/ (200개)</div></div>
    <div class="d" style="font-size:15px;color:#2A2744;margin-top:10px;line-height:1.55">일꾼은 모른다. 폴더에 있다 ≠ 머리에 있다. (Q2)</div>
  </div>
  <div class="card hot" style="padding:20px">
    <div class="k">꺼내게 하려면 — 지침(1층)에 한 줄</div>
    <div class="tree" style="font-size:14.5px;padding:12px 14px;line-height:1.65;margin-top:10px">환불 문의면 → 자료/규정집.md 의
  "환불" 항목<b style="color:#C2410C">만</b> 읽는다
소재 요청이면 → 자료/브랜드.md 의 "톤" 항목</div>
    <div class="d" style="font-size:15px;color:#2A2744;margin-top:10px;line-height:1.55"><b>언제 · 무엇을 · 어느 항목만.</b> "규정집을 참고한다"는 지침이 아니다 — 통째로 읽거나(과식) 안 읽는다(굶김).</div>
  </div>
</div>
<div class="row" style="margin-top:16px;gap:16px">
  <div class="note sm" style="margin-top:0;flex:1">4층은 <b>보관</b>이다. 머리로 들어오는 건 일꾼이 손으로 읽는 순간(③)이고, 그 순간을 정하는 건 1층의 한 줄이다.</div>
  <div class="note sm" style="margin-top:0;flex:1">자료가 수십 쪽을 넘어 손으로 못 찾으면 <b>찾아 주는 장치</b>를 둔다 — 이름만: 검색 증강(RAG). 오늘은 손으로 꺼내기까지.</div>
</div>
"""))

# 17 여정 ①
S.append(slide(17, head("Part 2 · 여정 ① ⭐", '요청 한 건이 머리에 들어가는 순서 — <span class="hl">늘 → 이번에 → 꺼내서 → 남겨서</span>') + f"""
<div class="env" style="margin-top:12px;font-size:17px">💬 "광고 소재 3개 뽑아 주세요" <span style="color:var(--gray);font-weight:700;font-size:13px;margin-left:10px">(지휘자 창에서 내가 한 말: "이번엔 톤 밝게")</span></div>
{journey([
 ("① 보낸다","지휘자","보내는 표 → 소재 일꾼","",""),
 ("② 늘","지침 한 장","작업대가 읽어 준다 — 이 순간 머리엔 <b>이것뿐</b>","v",flag("1층")),
 ("③ 이번에","원문 + 경로","지휘자의 쪽지: 원문 + \"자료/브랜드.md 톤 항목\"","v",flag("2층")),
 ("④ 꺼내서","브랜드.md","일꾼이 손으로 읽는다 — <b>이제 안다</b>","v",flag("4층")),
 ("⑤ 결과","초안 3개","","",""),
 ("⑥ 남겨서","runs/","담당 · 읽은 것 · 낸 것","mint",flag("3층")),
])}
<div class="cards c3" style="margin-top:22px;gap:12px">
  <div class="card" style="padding:14px 16px"><div class="k">챙길 것 1</div><div class="d" style="color:#2A2744;font-size:14.5px">③에서 넘긴 건 내용이 아니라 <b style="color:var(--v)">경로</b>였다 (21 복선)</div></div>
  <div class="card" style="padding:14px 16px"><div class="k">챙길 것 2</div><div class="d" style="color:#2A2744;font-size:14.5px">④에서 폴더에 있어서 안 게 아니라 <b style="color:var(--v)">읽어서</b> 알았다 (Q2)</div></div>
  <div class="card coral" style="padding:14px 16px"><div class="k">그리고</div><div class="d" style="color:#2A2744;font-size:14.5px">"이번엔 톤 밝게"는 <b>어디에도 없다</b> → 결과에 없다 (Q0 실증)</div></div>
</div>
"""))

# 18 병 셋
S.append(slide(18, head("Part 3 · 병 셋", '문맥의 병 셋 — <span class="hl">굶김 · 과식 · 오염</span>') + """
<div class="cards c3" style="margin-top:20px">
  <div class="card" style="border-color:#FFB8A5"><div class="k" style="color:var(--red)">굶김</div><div class="t">모르는데 아는 척</div><div class="d" style="color:#2A2744;margin-top:10px;line-height:1.55"><b>증상</b> 지어낸다 · 일반론으로 답한다 · "확인 필요"라고 안 한다<br><b>원인</b> 2층·4층이 비었다<br><b>18차와</b> "모르는 요청"이 일꾼 안에서 일어난 것</div></div>
  <div class="card hot" style="border-color:var(--amber);background:var(--amber-l)"><div class="k" style="color:var(--amber)">과식 ⭐</div><div class="t">너무 많이 알아서 흐리다</div><div class="d" style="color:#2A2744;margin-top:10px;line-height:1.55"><b>증상</b> 앞을 잊는다 · 중간을 놓친다 · 느리고 비싸다 · 엉뚱한 걸 중요하게 본다<br><b>원인</b> 폴더 통째 · 대화 전체 · 지난 결과 전부 · 긴 출력<br><b>18차와</b> 병 ① 그 자체</div></div>
  <div class="card" style="border-color:#FFB8A5"><div class="k" style="color:var(--red)">오염</div><div class="t">틀린 대로 한다</div><div class="d" style="color:#2A2744;margin-top:10px;line-height:1.55"><b>증상</b> 낡은 규정으로 답한다 · 남의 일 결과를 쓴다 · 지난 바퀴에서 반려된 초안을 다시 낸다<br><b>원인</b> 섞여 들어간 것을 거르지 않았다<br><b>18차와</b> 가드레일의 '입력' 쪽</div></div>
</div>
<div class="note" style="margin-top:22px">셋 다 <b>머리가 나빠서가 아니다.</b> 넣은 것이 없거나(굶김), 너무 많거나(과식), 틀렸다(오염). 증상으로 병을 알아보면 — 어느 층을 고칠지 보인다.</div>
"""))

# 19 과식 + Q4 + 직무별 예시 ②
S.append(slide(19, head("Part 3 · 과식이 가장 흔하다 + 손들기 Q4 + 직무별 예시 ②", '✋ 다 넣어 주면 <span class="hl">더 잘할까요?</span>', coral=True) + """
<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:12px;align-items:center">
  <div class="col" style="gap:10px">
    <div class="big" style="font-size:40px;color:var(--red)">아니다.</div>
    <div style="font-size:17px;line-height:1.6;color:#2A2744">"불안하니까 다 넣자"가 가장 흔한 설계 실수. 넣을수록 자리가 줄고, 중간을 놓치고, 느리고 비싸고, <b>관련 없는 것이 많을수록 판단이 흐려진다.</b></div>
    <div class="card hot" style="padding:14px 16px"><div class="k">"큰 모델이면 되지 않나요?"</div><div class="d" style="font-size:14.5px;color:#2A2744">창이 커도 중간 놓침·비용·흐려짐은 남는다. <b>크기가 아니라 무엇을 넣나.</b></div></div>
  </div>
  <div>
    <div style="font-size:13px;font-weight:900;letter-spacing:.12em;color:var(--coral)">직무별 예시 ② — "다 넣고" 망한 장면</div>
    <div class="col" style="gap:8px;margin-top:8px">
      <div class="job"><div class="jn"><i></i>마케터</div><ul><li class="q">지난달 소재 200개 전부 → "성과 좋았던 것"이 아니라 아무거나 비슷하게</li></ul></div>
      <div class="job"><div class="jn"><i></i>인사·총무</div><ul><li class="q">규정집 40쪽 통째 → 개정 전 조항과 개정 후 조항을 섞어 답함</li></ul></div>
      <div class="job"><div class="jn"><i></i>영업·CS</div><ul><li class="q">3년치 거래 이력 전부 → 다른 고객 조건으로 견적</li></ul></div>
    </div>
    <div class="ask" style="margin-top:10px">→ 내 일에서 "다 넣고" 있는 것 하나? (1분)</div>
  </div>
</div>
"""))

# 20 줄이기
S.append(slide(20, head("Part 3 · 넣는 법 ① 줄이기", '원문 대신 요약, 전체 대신 <span class="hl">상위 N</span>') + """
<div class="row" style="margin-top:36px;justify-content:center;gap:28px;align-items:center">
  <div class="box coral" style="width:300px;padding:18px;font-size:17px;line-height:1.5">지난달 소재 200개<br>+ 성과표 200행<small style="font-size:13px">≈ 머리의 60%</small></div>
  <div class="arrow" style="font-size:44px">→</div>
  <div class="box mint" style="width:300px;padding:18px;font-size:17px;line-height:1.5">성과 상위 3개<br>+ 왜 좋았나 한 줄씩<small style="font-size:13px">≈ 머리의 2%</small></div>
</div>
<div class="cards c3" style="margin-top:36px">
  <div class="card"><div class="k">요약</div><div class="t" style="font-size:19px">원문 대신 요지</div><div class="d">긴 회의록 → 결정 사항 5줄. 요약은 <b>앞 일꾼이</b> 내는 것으로 — 계약의 "내는 것"</div></div>
  <div class="card"><div class="k">상위 N</div><div class="t" style="font-size:19px">전체 대신 골라서</div><div class="d">"비슷하게"는 전부가 아니라 <b>기준에 맞는 몇 개</b>. N은 3~5</div></div>
  <div class="card hot"><div class="k">어느 병에</div><div class="t" style="font-size:19px">과식</div><div class="d" style="color:#2A2744">줄이면 자리가 남고, 남은 자리만큼 <b>중간을 놓치지 않는다</b></div></div>
</div>
<div class="note sm" style="margin-top:18px">"필요한 만큼"의 기준은 <b>다음 일꾼이 그 일을 하는 데 필요한 것</b>. 그 기준을 정하는 것도 글 한 줄 — 받는 것 칸에.</div>
"""))

# 21 넘기기
S.append(slide(21, head("Part 3 · 넣는 법 ② 넘기기 ⭐", '내용 대신 <span class="hl">파일 경로</span> — 계약의 실체') + f"""
<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:16px;align-items:start">
  <div class="card" style="padding:18px;border-color:#FFB8A5"><div class="k" style="color:var(--red)">복사해 넣으면</div><div class="tree" style="font-size:13.5px;padding:12px 14px;line-height:1.55;margin-top:8px;height:150px;overflow:hidden">요청: 비슷하게 다시
참고: (성과표 내용 전부 붙여넣기)
  소재A, CTR 2.1%, 전환 …
  소재B, CTR 1.8%, 전환 …
  소재C, …
  … (200줄)</div><div class="d" style="font-size:14.5px;color:#2A2744;margin-top:8px">머리를 먹는다. 그리고 <b>읽을지 말지를 일꾼이 못 정한다</b> — 이미 들어와 있으니까.</div></div>
  <div class="card hot" style="padding:18px"><div class="k">경로로 넘기면</div><div class="tree" style="font-size:13.5px;padding:12px 14px;line-height:1.55;margin-top:8px;height:150px">요청: 비슷하게 다시
참고: runs/1022_요청07/상위3.md
      (이 세 개만 참고)</div><div class="d" style="font-size:14.5px;color:#2A2744;margin-top:8px"><b>경로 한 줄이 200줄을 대신한다.</b> 읽는 건 일꾼이(③), 읽을 범위는 쪽지가 정한다.</div></div>
</div>
<div class="row" style="margin-top:16px;gap:16px">
  <div class="note sm" style="margin-top:0;flex:1">18차 "일꾼 사이는 파일, 파일의 양식 = 계약"이 바로 이것. 앞 일꾼의 <b>내는 것</b>이 파일이고, 뒤 일꾼의 <b>받는 것</b>이 그 경로다.</div>
  <div class="note sm coral" style="margin-top:0;flex:1">짝이 있다 — 지침(1층)에 "경로가 있으면 그 파일을 읽는다, 다른 파일은 열지 않는다". 넘기기와 꺼내기는 같이 간다.</div>
</div>
"""))

# 22 꺼내기
S.append(slide(22, head("Part 3 · 넣는 법 ③ 꺼내기", '전체가 아니라 <span class="hl">해당 항목만</span> — 찾는 규칙을 지침에') + """
<div class="row" style="margin-top:34px;justify-content:center;gap:24px;align-items:center">
  <div class="box coral" style="width:260px;padding:16px;font-size:17px;line-height:1.5">규정집.md<br>40쪽 전부<small style="font-size:13px">"규정집을 참고한다"</small></div>
  <div class="arrow" style="font-size:40px">→</div>
  <div class="box v" style="width:300px;padding:16px;font-size:16px;line-height:1.5;text-align:left">환불 문의면 →<br>규정집.md의 <b>"환불" 항목만</b><small style="font-size:13px">지침 한 줄 — 언제 · 무엇을 · 어느 항목</small></div>
  <div class="arrow" style="font-size:40px">→</div>
  <div class="box mint" style="width:200px;padding:16px;font-size:17px;line-height:1.5">1쪽<br>머리에 들어감</div>
</div>
<div class="cards c3" style="margin-top:34px">
  <div class="card"><div class="k">언제</div><div class="t" style="font-size:19px">어떤 요청일 때</div><div class="d">"환불 문의면" · "소재 요청이면"</div></div>
  <div class="card"><div class="k">무엇을 · 어느 항목</div><div class="t" style="font-size:19px">파일과 그 안의 자리</div><div class="d">제목이 있는 자료가 꺼내기 쉽다 — 자료/를 <b>항목별로</b> 쓴다</div></div>
  <div class="card hot"><div class="k">어느 병에</div><div class="t" style="font-size:19px">굶김 · 과식 둘 다</div><div class="d" style="color:#2A2744">안 읽으면 굶김, 통째로 읽으면 과식 — 꺼내기가 둘 사이</div></div>
</div>
<div class="note sm" style="margin-top:16px">자료가 수십 쪽을 넘으면 손으로 못 찾는다 — 그때 찾아 주는 장치(검색 증강)를 둔다. 오늘은 <b>손으로 꺼내기</b>까지.</div>
"""))

# 23 나누기
S.append(slide(23, head("Part 3 · 넣는 법 ④ 나누기", '늘 / 이번에 / 남김 / 보관을 <span class="hl">제자리에</span>') + """
<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:16px;align-items:start">
  <div class="card" style="padding:18px;border-color:#FFB8A5"><div class="k" style="color:var(--red)">한 군데에 다</div><div class="tree" style="font-size:13px;padding:12px 14px;line-height:1.5;margin-top:8px">소재.md (지침 — 48줄)
  브랜드 톤 … (20줄)
  지난달 성과 상위 … (10줄)
  지난 요청에서 반려된 이유 … (8줄)
  규정 … (10줄)</div><div class="d" style="font-size:14.5px;color:#2A2744;margin-top:8px">모든 일에 48줄이 든다. 지난달 성과는 이번 달엔 틀린 정보(오염). 반려 이유는 그 요청에만 필요했다.</div></div>
  <div class="card hot" style="padding:18px"><div class="k">제자리에</div><div class="tree" style="font-size:13px;padding:12px 14px;line-height:1.5;margin-top:8px">일꾼/소재.md     <span class="tag">1층 · 10줄</span>
자료/브랜드.md   <span class="tag mint">4층 · 꺼내서</span>
runs/…/상위3.md  <span class="tag mint">3층 · 남겨서</span>
쪽지(받는 것)    <span class="tag coral">2층 · 이번에</span></div><div class="d" style="font-size:14.5px;color:#2A2744;margin-top:8px">늘 드는 건 10줄. 나머지는 <b>필요한 때만</b> 들어온다.</div></div>
</div>
<div class="note" style="margin-top:16px">나누기는 넷 중 가장 큰 처방 — <b>셋 다 고친다.</b> 지침이 길어지면 "이게 늘 필요한가? 이번 일에만? 하다가 남긴 건가? 보관인가?" 네 질문으로 내려보낸다.</div>
"""))

# 24 한 줄로 — 대응표
S.append(slide(24, head("Part 3 · 한 줄로", '<span class="hl">필요한 것만, 필요한 때, 짧게.</span>') + """
<table class="tb" style="margin-top:22px;font-size:17px">
<tr><th style="width:170px">넣는 법</th><th>한 줄</th><th style="width:150px">굶김</th><th style="width:150px">과식</th><th style="width:150px">오염</th></tr>
<tr><td class="h">① 줄이기</td><td>원문 대신 요약, 전체 대신 상위 N</td><td style="text-align:center;color:var(--gray)">—</td><td style="text-align:center;color:var(--mint);font-weight:900">●</td><td style="text-align:center;color:var(--gray)">—</td></tr>
<tr><td class="h">② 넘기기</td><td>내용 대신 파일 경로 — 계약</td><td style="text-align:center;color:var(--gray)">—</td><td style="text-align:center;color:var(--mint);font-weight:900">●</td><td style="text-align:center;color:var(--mint);font-weight:900">●</td></tr>
<tr><td class="h">③ 꺼내기</td><td>전체가 아니라 해당 항목만 — 찾는 규칙을 지침에</td><td style="text-align:center;color:var(--mint);font-weight:900">●</td><td style="text-align:center;color:var(--mint);font-weight:900">●</td><td style="text-align:center;color:var(--gray)">—</td></tr>
<tr class="hot"><td class="h">④ 나누기</td><td>늘 드는 것은 짧게, 이번 것은 이번에, 보관은 자료/에</td><td style="text-align:center;color:var(--mint);font-weight:900">●</td><td style="text-align:center;color:var(--mint);font-weight:900">●</td><td style="text-align:center;color:var(--mint);font-weight:900">●</td></tr>
</table>
<div class="big" style="margin-top:30px;text-align:center;font-size:34px">"고친 건 코드가 아니라 <span style="color:var(--v)">받는 것 한 줄</span>."</div>
<div class="note sm" style="margin-top:18px;text-align:center">18차 — 표의 한 줄. 오늘 — 받는 것 한 줄. 둘 다 <b>문장</b>이다. 그래서 여러분이 쓸 수 있다.</div>
"""))

# 25 여정 ② 세 장면 + 직무별 예시 ③
S.append(slide(25, head("Part 4 · 여정 ② ⭐ + 직무별 예시 ③", '같은 요청의 세 장면 — <span class="hl">굶김 → 과식 → 딱 맞게</span>', coral=True) + """
<div class="env mix" style="margin-top:8px;font-size:15px">💬 "지난달 소재 중에 성과 좋았던 거 비슷하게 다시" <span style="color:var(--gray);font-size:12.5px;margin-left:8px">보내는 표엔 이미 "성과 먼저, 그 결과로 소재"(줄) — 라우팅은 맞았다</span></div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:10px">
  <div class="scene bad"><div class="lab">장면 1 · 굶김</div><div class="in">요청: 비슷하게 다시<br>참고: (없음)</div><div class="res">소재 일꾼은 "성과 좋았던"이 뭔지 <b>모른다</b>(안 든 것 ⑥). 일반 소재 3개를 지어낸다.</div></div>
  <div class="scene over"><div class="lab">장면 2 · 과식</div><div class="in">요청: 비슷하게 다시<br>참고: 자료/지난사례/ 전부(200)<br>+ 성과표.csv 전부</div><div class="res">머리가 찬다. 상위가 아니라 <b>아무거나</b> 비슷하게. 느리고 비쌌다.</div></div>
  <div class="scene ok"><div class="lab">장면 3 · 딱 맞게</div><div class="in">요청: 비슷하게 다시<br>참고: runs/…/상위3.md<br>(이 세 개만)</div><div class="res">그 파일만 읽고 셋을 변주. runs/에 "읽은 것: 상위3.md". 바뀐 건 <b>받는 것 한 줄.</b></div></div>
</div>
<div style="margin-top:18px;font-size:13px;font-weight:900;letter-spacing:.12em;color:var(--coral)">직무별 예시 ③ — 내 일꾼의 "받는 것 한 줄"</div>
<div class="jobs" style="margin-top:8px;gap:12px">
  <div class="job" style="padding:12px 16px"><div class="jn"><i></i>마케터</div><ul><li>원문 + "runs/…/상위3.md 이 세 개만"</li></ul></div>
  <div class="job" style="padding:12px 16px"><div class="jn"><i></i>인사·총무</div><ul><li>원문 + "규정집 '연차' 항목 + 그 사람 행 1줄"</li></ul></div>
  <div class="job" style="padding:12px 16px"><div class="jn"><i></i>영업·CS</div><ul><li>원문 + "runs/…/견적_0914.md 1건만"</li></ul></div>
</div>
<div class="ask" style="margin-top:6px">→ 내 일이면, 받는 것 한 줄은? (1분)</div>
"""))

# 26 해부도 + 자료/
S.append(slide(26, head("Part 4 · 해부도 ⭐", '18차 트리에 폴더 하나 — <span class="hl">자료/</span>. 어느 폴더가 언제 누구 머리에 가나') + """
<div style="display:grid;grid-template-columns:1fr 380px;gap:26px;margin-top:12px;align-items:start">
<div class="tree" style="font-size:18px">접수-에이전트/
├─ CLAUDE.md<span class="tag">1층 · 늘</span><span class="cm"> 지휘자 규칙 + 보내는 표</span>
├─ 일꾼/<span class="tag">1층 · 늘</span><span class="cm"> 일꾼 한 명 = 지침 한 장 (열 줄 안)</span>
│   ├─ 소재.md
│   ├─ 성과.md
│   └─ 일정.md
├─ 자료/<span class="tag mint">4층 · 꺼내서</span><span class="cm"> 브랜드.md · 규정집.md · 지난사례/</span>
├─ inbox/<span class="tag coral">2층 · 이번에</span><span class="cm"> 요청문 + 쪽지</span>
└─ runs/<span class="tag mint">3층 · 남겨서</span><span class="cm"> 담당 · 읽은 것 · 낸 것</span></div>
<div class="col" style="gap:10px">
  <div class="card hot" style="padding:14px 16px"><div class="k">머리로 들어가는 길 셋</div><div class="d" style="color:#2A2744;font-size:14.5px;line-height:1.6"><b>늘</b> — 작업대가 (CLAUDE.md · 일꾼/)<br><b>넘겨서</b> — 지휘자가 (inbox/ 쪽지 · runs/ 경로)<br><b>꺼내서</b> — 일꾼이 손으로 (자료/ · runs/)</div></div>
  <div class="card gray" style="padding:14px 16px"><div class="k">트리에 없는 것</div><div class="t" style="font-size:18px">머리 · 손 · 루프</div><div class="d">작업대가 빌려 준다 — 보이지 않는 건 빌린 것</div></div>
  <div class="card" style="padding:14px 16px"><div class="k">18차와 다른 점</div><div class="d" style="color:#2A2744;font-size:14.5px">폴더는 하나 늘었을 뿐. 달라진 건 <b>읽는 눈</b> — 같은 트리에서 "누가 언제 뭘 아나"가 보인다</div></div>
</div>
</div>
"""))

# 27 개념 상자
left = [("문맥(컨텍스트)","지금 머리에 든 글의 전부 — 그 밖은 없다"),("머리에 든 것 넷","지침 · 요청문+경로 · 읽은 파일 · 손의 결과"),("안 든 것 넷","내 대화 · 다른 일꾼 · 어제 · 안 읽은 파일"),("비어서 태어난다","아는 것은 전부 누군가 넣어 준 것"),("머리의 크기","넣을수록 자리가 준다 — 넘치면 앞을, 차면 중간을"),("문맥 4층","늘 · 이번에 · 남겨서 · 꺼내서"),("받는 것(2층)","여기 적힌 것이 일꾼이 아는 전부"),("상태(3층)","runs/ — 적어야 산다"),("자료/(4층)","두는 것 ≠ 꺼내는 것"),("병 셋","굶김 · 과식 · 오염"),("넣는 법 4","줄이기 · 넘기기 · 꺼내기 · 나누기"),("경로","내용 대신 파일 이름 — 200줄을 한 줄로")]
right = [("토큰","머리가 글을 세는 단위"),("컨텍스트 창","머리의 크기의 정식 이름"),("요약·압축","차면 앞을 요약해 자리를 만든다 — '앞을 잊는다'의 실물"),("검색 증강(RAG)","꺼내기의 자동판 — 찾아 주는 사서"),("메모리 파일","'기억' 기능들의 실체 — 파일"),("캐싱","늘 드는 것을 앞에 고정하면 싸진다"),("시스템 프롬프트","1층의 정식 이름")]
S.append(slide(27, head("Part 4 · 개념 상자", '개념 상자 — <span class="hl">여기까지가 오늘의 깊이</span>', '못 외워도 됩니다 — 02 용어사전에 전부 있습니다') + f"""
<div style="display:grid;grid-template-columns:1.25fr 1fr;gap:28px;margin-top:14px">
  <div><div class="chip" style="margin-bottom:6px">오늘 배운 것</div>{glos(left,True)}</div>
  <div><div class="chip gray" style="margin-bottom:6px">이름만 — 궁금하면 수업 후</div>{glos(right,False)}</div>
</div>
"""))

# 28 손들기 회수 + Q5
S.append(slide(28, head("클로징 · 손들기 회수 + Q5", '오늘의 한 문장 — 그리고 <span class="hl">일꾼이 아는 것은 전부 ___ 것?</span>') + """
<div class="big" style="margin-top:18px;font-size:30px;text-align:center">"일꾼의 머리는 매번 비어서 태어난다 —<br><span style="color:var(--v)">뭘, 언제, 어디서 넣어 주나</span>가 설계다."</div>
<div class="row" style="margin-top:12px;justify-content:center;gap:10px"><span class="chip">넣는 길 넷 — 늘·이번에·남겨서·꺼내서</span><span class="chip coral">병 셋 — 굶김·과식·오염</span><span class="chip gray">처방 넷 — 줄이기·넘기기·꺼내기·나누기</span></div>
<div class="quiz" style="margin-top:24px;flex-wrap:wrap">
  <div class="qz" style="flex:1 1 30%"><b>Q0</b>서브에이전트가 내 대화를?<div style="color:var(--v);margin-top:6px">모른다</div></div>
  <div class="qz" style="flex:1 1 30%"><b>Q1</b>어제 처리한 건을 기억?<div style="color:var(--v);margin-top:6px">모른다</div></div>
  <div class="qz" style="flex:1 1 30%"><b>Q2</b>폴더에 있는 파일을 다?<div style="color:var(--v);margin-top:6px">읽은 것만</div></div>
  <div class="qz" style="flex:1 1 30%"><b>Q3</b>하다 만 걸 다음 일꾼이?<div style="color:var(--v);margin-top:6px">적은 만큼만</div></div>
  <div class="qz" style="flex:1 1 30%"><b>Q4</b>다 넣으면 더 잘하나?<div style="color:var(--v);margin-top:6px">아니다</div></div>
  <div class="qz" style="flex:1 1 30%;border-color:var(--coral);background:var(--coral-l)"><b style="color:#C2410C">Q5</b>일꾼이 아는 것은 전부 ___ 것?<div style="color:#C2410C;margin-top:6px;font-size:20px">넣어 준 것</div></div>
</div>
"""))

# 29 선택 과제
S.append(slide(29, head("클로징 · 선택 과제 배포", '선택 과제 — <span class="hl">내 일꾼 한 명의 머리 채우기</span> (설계 질문 5 · 문맥판)') + """
<div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:16px;align-items:start">
  <table class="tb" style="margin-top:0;font-size:15px">
    <tr><th style="width:40px">#</th><th>질문</th><th>빠뜨리면</th></tr>
    <tr><td class="h" style="width:40px">①</td><td><b>늘</b> 알아야 할 것 — 열 줄 안에</td><td style="color:var(--red)">지침이 자리를 먹는다 (과식)</td></tr>
    <tr><td class="h">②</td><td><b>이번 요청</b>에 넣어 줄 것 — 원문 + 경로</td><td style="color:var(--red)">몰라서 지어낸다 (굶김)</td></tr>
    <tr><td class="h">③</td><td><b>하다가 남길 것</b> — 어디까지, 어디에</td><td style="color:var(--red)">다음 바퀴가 처음부터</td></tr>
    <tr><td class="h">④</td><td><b>찾아 꺼낼 것</b> — 어느 자료 어느 항목, 언제</td><td style="color:var(--red)">옆에 있어도 모른다 / 통째로 읽는다</td></tr>
    <tr><td class="h">⑤</td><td><b>넣지 않을 것</b> — 내 대화·다른 일·폴더 전체·틀린 초안</td><td style="color:var(--red)">흐려지고 틀린 대로 (과식·오염)</td></tr>
  </table>
  <div class="col" style="gap:12px">
    <div class="card hot"><div class="k">이미 반은 했다</div><div class="row" style="gap:10px;margin-top:8px;flex-wrap:wrap"><span class="chip coral">직무별 예시 ①</span><span class="arrow" style="font-size:20px">→</span><span class="chip">질문 ①</span><span class="chip coral">예시 ②</span><span class="arrow" style="font-size:20px">→</span><span class="chip">질문 ⑤</span><span class="chip coral">예시 ③</span><span class="arrow" style="font-size:20px">→</span><span class="chip">질문 ②</span></div></div>
    <div class="card"><div class="k">18차 카드의 짝</div><div class="d" style="font-size:15px;color:#2A2744">그 카드의 일꾼 ② 옆에 이 다섯 줄을 붙이면 <b>일꾼 한 명의 설계</b>가 완성된다. 없으면 오늘 직무별 예시에서 하나.</div></div>
    <div class="card gray"><div class="k">안 해도 곤란하지 않습니다</div><div class="d">다음 강의는 이 카드를 전제하지 않습니다. 하신 분은 다음 회차에 들고 오시면 그날의 재료. 질문은 슬랙에.</div></div>
  </div>
</div>
"""))

# 30 엔딩
S.append(slide(30, """
<div class="eyebrow" style="position:absolute;left:64px;top:50px">클로징</div>
<div class="center">
  <div class="q">지난번엔 <span class="hl">누가 받았는지</span> 봤습니다.<br>오늘은 받은 사람이 <span class="hl">뭘 알고 있는지</span> 봤습니다.</div>
  <div class="s">늘 · 이번에 · 남겨서 · 꺼내서 — 넣는 길 넷이 생겼습니다.<br>다음은 <b style="color:#fff">잘 돌았는지 어떻게 아나 — 기록을 읽는 날</b>입니다. 그날은 runs/를 열어 봅니다.</div>
</div>
""", dark=True, pad=False))

# 31 FAQ
S.append(slide(31, head("부록 · FAQ (시간 배정 없음)", '예비 — 자주 나오는 질문 셋') + """
<div class="cards c3" style="margin-top:24px">
  <div class="card"><div class="k">Q</div><div class="t" style="font-size:20px">그냥 다 넣고 큰 모델 쓰면 안 되나요?</div><div class="d" style="font-size:15px;color:#2A2744;margin-top:12px">창이 커도 <b>중간 놓침 · 비용 · 흐려짐</b>은 남는다. 창의 크기는 "넣을 수 있는 양"이지 "넣어야 할 양"이 아니다. 크기가 아니라 <b>무엇을</b> 넣나.</div></div>
  <div class="card"><div class="k">Q</div><div class="t" style="font-size:20px">일꾼이 기억하게 할 수는 없나요?</div><div class="d" style="font-size:15px;color:#2A2744;margin-top:12px"><b>파일이 곧 기억</b>이다. 상태는 runs/(3층), 사례는 자료/(4층). "기억"이라 불리는 기능들의 실체도 파일에 적어 두고 다시 읽는 것.</div></div>
  <div class="card"><div class="k">Q</div><div class="t" style="font-size:20px">지침이 자꾸 길어지는데요?</div><div class="d" style="font-size:15px;color:#2A2744;margin-top:12px">열 줄 넘으면 신호. 네 질문으로 내려보낸다 — <b>늘 필요한가? 이번 일에만? 하다가 남긴 건가? 보관인가?</b> 보관이면 자료/로 가고 지침엔 "언제 읽는다" 한 줄만.</div></div>
</div>
<div class="lay" style="margin-top:26px;grid-template-columns:70px 170px 1fr 220px">
  <div class="h">층</div><div class="h">우리말</div><div class="h">어디에</div><div class="h">누가 넣나</div>
  <div class="n">1</div><div class="k">늘 드는 것</div><div class="mono">일꾼/○○.md · CLAUDE.md</div><div style="color:var(--gray);font-weight:800">작업대</div>
  <div class="n">2</div><div class="k">이번에 넣는 것</div><div class="mono">inbox/ + 쪽지</div><div style="color:#C2410C;font-weight:800">지휘자</div>
  <div class="n">3</div><div class="k">하다가 남긴 것</div><div class="mono">runs/</div><div style="color:#C2410C;font-weight:800">일꾼 · 지휘자</div>
  <div class="n">4</div><div class="k">찾아 꺼내는 것</div><div class="mono">자료/</div><div style="color:#C2410C;font-weight:800">일꾼이 손으로</div>
</div>
"""))

html = f'<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>19차 · 일꾼은 뭘 알고 일하나 — 슬라이드</title><style>{CSS}</style></head><body><div class="deck">' + "\n".join(S) + '</div></body></html>'
open("05_19강 전체 슬라이드.html","w",encoding="utf-8").write(html)
print("slides:", len(S))
