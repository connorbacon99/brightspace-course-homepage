// Builds the course homepage and the eight weekly pages from weeks-content.js.
//   index.html               homepage (served by GitHub Pages)
//   weeks/week-01.html …     weekly pages to upload into Brightspace Content modules
//   src/homepage.html        homepage without the document wrapper (for the Claude preview)
const fs = require("fs");
const path = require("path");
const C = require("./weeks-content.js");

const ROOT = path.join(__dirname, "..");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pad = n => String(n).padStart(2, "0");
const weeks = C.weeks.map((w, i) => ({ ...w, n: i + 1 }));
const unitIds = Object.keys(C.units);

/* ------------------------------------------------------------------ shared CSS */
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@500&display=swap">`;

const DARK = `--bg: #131816; --surface: #1C2320; --sunken: #171D1A; --ink: #E5E9E3; --muted: #9AA59E; --line: #2C3531;
    --accent: #84BCD4; --accent-ink: #0F1A1F; --accent-tint: #1A2A31; --now: #E5AA45; --now-tint: #2D261A; --core-in: #F2C76B;
    --u1: #B8975F; --u2: #93584A; --u3: #6F7E61; --u4: #7A8DA0; --pattern: rgba(0,0,0,.32);
    --shadow: 0 1px 2px rgba(0,0,0,.3), 0 8px 24px rgba(0,0,0,.25);
    color-scheme: dark;`;

const BASE_CSS = `
:root {
  --bg: #ECEEEA;
  --surface: #FFFFFF;
  --sunken: #E2E5DF;
  --ink: #1C2220;
  --muted: #58625D;
  --line: #D3D8D1;
  --accent: #1E5C78;      /* slate blue: links, buttons, chart marks */
  --accent-ink: #FFFFFF;
  --accent-tint: #E3EEF2;
  --now: #C98A1A;          /* ochre: highlights */
  --now-tint: #F6ECD8;
  --core-in: #F2C76B;
  --u1: #CDAA72;           /* sandstone */
  --u2: #A0604A;           /* red beds */
  --u3: #7E8D6E;           /* shale */
  --u4: #8FA2B5;           /* limestone */
  --pattern: rgba(28,34,32,.22);
  --shadow: 0 1px 2px rgba(28,34,32,.06), 0 8px 24px rgba(28,34,32,.06);
  --display: "Bricolage Grotesque", "Avenir Next", "Segoe UI", system-ui, sans-serif;
  --body: "Public Sans", "Segoe UI", system-ui, -apple-system, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --r: 18px;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ${DARK} } }
:root[data-theme="dark"] { ${DARK} }

* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 400 16px/1.6 var(--body); -webkit-font-smoothing: antialiased; }
a { color: var(--accent); }
:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; border-radius: 6px; }
h1, h2, h3 { font-family: var(--display); margin: 0; text-wrap: balance; letter-spacing: -0.01em; }
.label { font: 500 11px/1 var(--mono); text-transform: uppercase; letter-spacing: .09em; color: var(--muted); }
.chip { font: 500 12px/1 var(--mono); letter-spacing: .04em; padding: 6px 9px; border-radius: 999px; border: 1px solid var(--line); background: var(--surface); color: var(--ink); }
.wrap { max-width: 1080px; margin: 0 auto; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }

.lith-u1 { background: radial-gradient(circle at 30% 40%, var(--pattern) 1.1px, transparent 1.6px) 0 0 / 7px 7px, radial-gradient(circle at 70% 80%, var(--pattern) .9px, transparent 1.4px) 0 0 / 9px 9px, var(--u1); }
.lith-u2 { background: repeating-linear-gradient(0deg, transparent 0 7px, var(--pattern) 7px 8px), radial-gradient(circle, var(--pattern) .8px, transparent 1.2px) 0 0 / 6px 8px, var(--u2); }
.lith-u3 { background: repeating-linear-gradient(0deg, transparent 0 4px, var(--pattern) 4px 5px), repeating-linear-gradient(90deg, transparent 0 9px, var(--u3) 9px 13px), var(--u3); }
.lith-u4 { background: repeating-linear-gradient(0deg, transparent 0 10px, var(--pattern) 10px 11px), repeating-linear-gradient(90deg, transparent 0 17px, var(--pattern) 17px 18px), var(--u4); }

@keyframes rise { from { transform: translateY(8px); } to { transform: none; } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
`;

const ARROW = s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

/* ------------------------------------------------------------------ homepage */
const HOME_CSS = `
.page { padding-block: 28px 56px; display: grid; gap: 40px; }
.hero { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 36px; align-items: center; animation: rise .5s cubic-bezier(.2,.7,.2,1) both; }
.hero-text { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
.course-meta { display: flex; gap: 8px; flex-wrap: wrap; }
.hero h1 { font-size: clamp(2.6rem, 6.4vw, 4.75rem); font-weight: 800; line-height: .95; letter-spacing: -0.03em; }
.hero h1 span { display: block; color: var(--muted); font-weight: 500; font-size: .42em; letter-spacing: -0.01em; line-height: 1.2; margin-top: 10px; }
.lede { font-size: 17px; max-width: 46ch; color: var(--muted); margin: 0; }
.start { background: var(--surface); border-radius: var(--r); box-shadow: var(--shadow); padding: 26px; display: grid; gap: 18px; border: 1px solid var(--line); min-width: 0; }
.start h2 { font-size: 1.5rem; font-weight: 700; }
.start p { margin: 0; color: var(--muted); font-size: 15px; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; font: 600 15px/1 var(--body); text-decoration: none; background: var(--accent); color: var(--accent-ink); padding: 15px 18px; border-radius: 12px; transition: transform .15s ease, filter .15s ease; }
.btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.btn svg { transition: transform .2s ease; }
.btn:hover svg { transform: translateX(3px); }
.weeks { animation: rise .5s .08s cubic-bezier(.2,.7,.2,1) both; }
.section-head { display: flex; justify-content: space-between; align-items: end; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
.section-head h2 { font-size: 1.6rem; font-weight: 700; }
.core { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; }
.unit-head, .wk { display: grid; grid-template-columns: 56px 52px minmax(0, 1fr) auto; align-items: center; }
.unit-head { background: var(--sunken); border-top: 1px solid var(--line); }
.unit-head:first-child { border-top: 0; }
.unit-head h3 { font-size: 15px; font-weight: 700; padding: 12px 16px; }
.unit-head .label { padding-right: 18px; }
.wk { text-decoration: none; color: var(--ink); border-top: 1px solid var(--line); transition: background .15s ease; }
.wk:hover { background: color-mix(in srgb, var(--accent) 7%, transparent); }
.wk-num { font: 500 12px/1 var(--mono); color: var(--muted); text-align: right; padding-right: 14px; font-variant-numeric: tabular-nums; }
.seg { align-self: stretch; min-height: 72px; border-left: 1px solid var(--pattern); border-right: 1px solid var(--pattern); }
.unit-head .seg { min-height: 0; }
.wk-body { padding: 16px; min-width: 0; }
.wk-title { font: 600 16.5px/1.3 var(--body); display: block; }
.wk-topics { font-size: 13.5px; color: var(--muted); display: block; margin-top: 3px; }
.wk > svg { margin-right: 18px; color: var(--muted); transition: transform .15s ease, color .15s ease; }
.wk:hover > svg { color: var(--accent); transform: translateX(3px); }
.wk:hover .wk-title { color: var(--accent); }
.key { display: flex; flex-wrap: wrap; gap: 6px 16px; margin-top: 12px; font-size: 12px; color: var(--muted); align-items: center; }
.key span { display: inline-flex; align-items: center; gap: 7px; }
.key i { width: 18px; height: 12px; border-radius: 2px; display: inline-block; }
@media (max-width: 820px) { .hero { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 620px) {
  .unit-head, .wk { grid-template-columns: 40px 30px minmax(0, 1fr) auto; }
  .wk-num { padding-right: 8px; }
  .wk > svg { margin-right: 14px; }
  .start { padding: 20px; }
}`;

function homeBody() {
  let rows = "";
  unitIds.forEach(uid => {
    const u = C.units[uid];
    const uw = weeks.filter(w => w.unit === uid);
    rows += `
      <div class="unit-head"><span></span><span class="seg lith-${uid}"></span><h3>Unit ${u.n} · ${esc(u.name)}</h3><span class="label">${uw.length > 1 ? `Wk ${uw[0].n}–${uw[uw.length - 1].n}` : `Wk ${uw[0].n}`}</span></div>`;
    uw.forEach(w => {
      rows += `
      <a class="wk" href="${esc(C.links.weeks[w.n - 1] || "#")}" target="_top"><span class="wk-num">W${pad(w.n)}</span><span class="seg lith-${uid}"></span><span class="wk-body"><span class="wk-title">${esc(w.title)}</span><span class="wk-topics">${esc(w.topics)}</span></span>${ARROW(16)}</a>`;
    });
  });
  return `
<!--
  Links are set in src/weeks-content.js (links section). Run ./build.sh after changing them.
-->
<div class="wrap page">
  <section class="hero" aria-labelledby="course-title">
    <div class="hero-text">
      <div class="course-meta"><span class="chip">${esc(C.course.code)}</span><span class="chip">Online</span><span class="chip">${weeks.length} weeks</span></div>
      <h1 id="course-title">${esc(C.course.title)}<span>Introduction to Historical Geology</span></h1>
      <p class="lede">Four and a half billion years in eight weeks. Each week is a layer. Pick a week below to open its content.</p>
    </div>
    <div class="start">
      <h2>New here?</h2>
      <p>Begin with the course overview. It covers how the weeks are set up, what you'll turn in, and how to get help.</p>
      <a class="btn" href="${esc(C.links.overview || "#")}" target="_top">Start here: course overview ${ARROW(18)}</a>
    </div>
  </section>

  <section class="weeks" aria-labelledby="core-h">
    <div class="section-head">
      <h2 id="core-h">Course content</h2>
      <span class="label">${weeks.length} weeks · ${unitIds.length} units</span>
    </div>
    <div class="core">${rows}
    </div>
    <div class="key">
      <span class="label">Core key</span>
      <span><i class="lith-u1"></i>Sandstone = ${esc(C.units.u1.name)}</span>
      <span><i class="lith-u2"></i>Red beds = ${esc(C.units.u2.name)}</span>
      <span><i class="lith-u3"></i>Shale = ${esc(C.units.u3.name)}</span>
      <span><i class="lith-u4"></i>Limestone = ${esc(C.units.u4.name)}</span>
    </div>
  </section>
</div>`;
}

/* ------------------------------------------------------------------ figures */
// All figures are inline SVG coloured by the page's CSS tokens, so they follow light/dark themes.
const ARROWHEAD = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="fill-ink"/></marker></defs>`;
const svgOpen = (w, h, label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">`;
const t = (x, y, s, cls = "", anchor = "start") => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${s}</text>`;

const FIG = {
  interior() {
    const cx = 260, cy = 290, R = 250, s = R / 6371;
    const arc = r => `M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}Z`;
    const pt = (r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)];
    const layers = [
      { name: "Crust", d1: "5–70 km thick", d2: "rock, solid", r: R, deg: 62, y: 46 },
      { name: "Mantle", d1: "to 2,900 km deep", d2: "rock, solid but slowly flowing", r: 205, deg: 42, y: 112 },
      { name: "Outer core", d1: "to 5,150 km deep", d2: "liquid iron and nickel", r: 100, deg: 28, y: 178 },
      { name: "Inner core", d1: "to the center, 6,371 km", d2: "solid iron and nickel", r: 26, deg: 12, y: 244 }
    ];
    let g = svgOpen(760, 300, "Cross-section of Earth's interior to scale: crust, mantle, outer core, inner core");
    g += `<path d="${arc(R)}" class="fill-u2"/><path d="${arc(3480 * s)}" class="fill-now"/><path d="${arc(1220 * s)}" class="fill-corein"/>`;
    g += `<path d="M${cx - R} ${cy}A${R} ${R} 0 0 1 ${cx + R} ${cy}" class="stroke-ink" stroke-width="3" fill="none"/>`;
    g += `<line x1="${cx - R - 6}" y1="${cy}" x2="${cx + R + 6}" y2="${cy}" class="stroke-line" stroke-width="1.5"/>`;
    layers.forEach(L => {
      const [px, py] = pt(L.r, L.deg);
      g += `<polyline points="${px.toFixed(1)},${py.toFixed(1)} 520,${L.y - 4} 528,${L.y - 4}" class="stroke-ink" fill="none" stroke-width="1"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.5" class="fill-ink"/>`;
      g += t(534, L.y, L.name, "tb") + t(534, L.y + 17, L.d1, "tm") + t(534, L.y + 32, L.d2, "tm");
    });
    return g + "</svg>";
  },

  rockcycle() {
    const node = (x, y, w, label, cls) => `<rect x="${x - w / 2}" y="${y - 23}" width="${w}" height="46" rx="12" class="fill-surface stroke-line" stroke-width="1.5"/><circle cx="${x - w / 2 + 22}" cy="${y}" r="9" class="${cls}"/>${t(x - w / 2 + 40, y + 5, label, "tb")}`;
    const ar = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="stroke-ink" stroke-width="1.6" marker-end="url(#rc-ah)"/>`;
    let g = svgOpen(680, 360, "The rock cycle: igneous, sedimentary and metamorphic rocks and magma, connected by arrows");
    g += ARROWHEAD("rc-ah");
    g += ar(290, 73, 165, 274) + ar(197, 300, 480, 300) + ar(390, 73, 515, 274) + ar(520, 277, 404, 229) + ar(340, 194, 340, 78);
    g += node(340, 50, 150, "Igneous", "fill-u2") + node(120, 300, 170, "Sedimentary", "fill-u1") + node(560, 300, 170, "Metamorphic", "fill-u3");
    g += `<rect x="285" y="196" width="110" height="38" rx="19" class="fill-now"/>${t(340, 220, "Magma", "tb-dark", "middle")}`;
    g += t(204, 160, "Weathering,", "tm", "end") + t(204, 176, "erosion &", "tm", "end") + t(204, 192, "deposition", "tm", "end");
    g += t(340, 328, "Heat & pressure", "tm", "middle");
    g += t(468, 160, "Heat &", "tm") + t(468, 176, "pressure", "tm");
    g += t(352, 140, "Cooling", "tm");
    g += t(420, 272, "Melting", "tm");
    return g + "</svg>";
  },

  boundaries() {
    const ar = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="stroke-ink" stroke-width="2" marker-end="url(#pb-ah)"/>`;
    let g = svgOpen(720, 270, "Three plate boundary types: divergent, convergent, transform");
    g += ARROWHEAD("pb-ah");
    // Divergent
    let x = 10;
    g += `<rect x="${x + 10}" y="114" width="200" height="76" rx="4" class="fill-sunken"/>`;
    g += `<path d="M${x + 100} 114L${x + 120} 114L${x + 150} 190L${x + 70} 190Z" class="fill-now"/>`;
    g += `<rect x="${x + 10}" y="84" width="90" height="30" class="fill-u4"/><rect x="${x + 120}" y="84" width="90" height="30" class="fill-u4"/>`;
    g += ar(x + 80, 66, x + 30, 66) + ar(x + 140, 66, x + 190, 66);
    g += t(x + 110, 24, "Divergent", "tb", "middle") + t(x + 110, 216, "Plates pull apart", "tm", "middle") + t(x + 110, 233, "e.g. Mid-Atlantic Ridge", "tm", "middle");
    // Convergent
    x = 250;
    g += `<rect x="${x + 10}" y="110" width="200" height="80" rx="4" class="fill-sunken"/>`;
    g += `<polygon points="${x + 10},86 ${x + 118},86 ${x + 178},176 ${x + 162},188 ${x + 104},112 ${x + 10},112" class="fill-u4"/>`;
    g += `<rect x="${x + 112}" y="72" width="98" height="40" class="fill-u1"/>`;
    g += `<polygon points="${x + 146},72 ${x + 162},48 ${x + 178},72" class="fill-u2"/>`;
    g += `<circle cx="${x + 160}" cy="140" r="9" class="fill-now"/>`;
    g += ar(x + 30, 66, x + 80, 66) + ar(x + 210, 34, x + 188, 34);
    g += t(x + 110, 24, "Convergent", "tb", "middle") + t(x + 110, 216, "One plate sinks beneath another", "tm", "middle") + t(x + 110, 233, "e.g. the Andes", "tm", "middle");
    // Transform (map view)
    x = 490;
    g += `<rect x="${x + 10}" y="50" width="95" height="140" rx="4" class="fill-u1"/><rect x="${x + 115}" y="50" width="95" height="140" rx="4" class="fill-u1"/>`;
    g += `<line x1="${x + 110}" y1="44" x2="${x + 110}" y2="196" class="stroke-ink" stroke-width="2" stroke-dasharray="6 5"/>`;
    g += ar(x + 57, 165, x + 57, 78) + ar(x + 162, 78, x + 162, 165);
    g += t(x + 110, 24, "Transform", "tb", "middle") + t(x + 110, 216, "Plates slide past (view from above)", "tm", "middle") + t(x + 110, 233, "e.g. San Andreas Fault", "tm", "middle");
    // Key
    g += `<rect x="190" y="252" width="14" height="10" class="fill-u4"/>${t(210, 261, "Oceanic plate", "tm")}<rect x="310" y="252" width="14" height="10" class="fill-u1"/>${t(330, 261, "Continental plate", "tm")}<rect x="450" y="252" width="14" height="10" class="fill-now"/>${t(470, 261, "Magma", "tm")}`;
    return g + "</svg>";
  },

  magnitude() {
    const X = m => 40 + (m - 6) * 150, AX = 118;
    const quakes = [
      { name: "Northridge, USA", y: 1994, m: 6.7, row: "low", anchor: "end", dx: 5 },
      { name: "Haiti", y: 2010, m: 7.0, row: "high", anchor: "middle", dx: 0 },
      { name: "San Francisco, USA", y: 1906, m: 7.9, row: "low", anchor: "middle", dx: 0 },
      { name: "Tōhoku, Japan", y: 2011, m: 9.1, row: "low", anchor: "end", dx: 5 },
      { name: "Valdivia, Chile", y: 1960, m: 9.5, row: "high", anchor: "middle", dx: 0 }
    ];
    let g = svgOpen(680, 200, "Five historic earthquakes placed on the moment magnitude scale from 6 to 10");
    for (let m = 6; m <= 10; m++) g += `<line x1="${X(m)}" y1="${AX - 5}" x2="${X(m)}" y2="${AX + 5}" class="stroke-muted" stroke-width="1"/>` + t(X(m), AX + 22, "M" + m, "tm mono", "middle");
    g += `<line x1="${X(6)}" y1="${AX}" x2="${X(10)}" y2="${AX}" class="stroke-muted" stroke-width="1"/>`;
    quakes.forEach(q => {
      const x = X(q.m), top = q.row === "high" ? 22 : 62;
      g += `<line x1="${x}" y1="${top + 22}" x2="${x}" y2="${AX - 8}" class="stroke-line" stroke-width="1"/>`;
      g += t(x + q.dx, top, esc(q.name), "tb", q.anchor) + t(x + q.dx, top + 15, `${q.y} · M${q.m.toFixed(1)}`, "tm mono", q.anchor);
      g += `<circle cx="${x}" cy="${AX}" r="7" class="fill-accent stroke-surface" stroke-width="2"><title>${esc(q.name)}, ${q.y}: magnitude ${q.m.toFixed(1)}</title></circle>`;
    });
    g += `<path d="M${X(7)} 156v6h${X(8) - X(7)}v-6" class="stroke-muted" fill="none" stroke-width="1"/>` + t((X(7) + X(8)) / 2, 182, "One step ≈ 32× more energy", "tm", "middle");
    return g + "</svg>";
  },

  halflife() {
    const L = 64, Rt = 664, T = 30, B = 220, H = B - T, band = (Rt - L) / 6, bw = 56;
    const Y = v => B - v / 100 * H;
    let g = svgOpen(680, 290, "Bar chart: parent isotope remaining after 0 to 5 half-lives, halving each time");
    [0, 25, 50, 75, 100].forEach(v => { g += `<line x1="${L}" y1="${Y(v)}" x2="${Rt}" y2="${Y(v)}" class="stroke-line" stroke-width="1"/>` + t(L - 10, Y(v) + 4, v + "%", "tm mono", "end"); });
    const years = ["0", "5,730", "11,460", "17,190", "22,920", "28,650"];
    for (let i = 0; i <= 5; i++) {
      const v = 100 / 2 ** i, cx = L + band * i + band / 2, x = cx - bw / 2, y = Y(v), h = B - y, r = Math.min(4, h);
      g += `<path d="M${x} ${B}V${y + r}Q${x} ${y} ${x + r} ${y}H${x + bw - r}Q${x + bw} ${y} ${x + bw} ${y + r}V${B}Z" class="fill-accent"><title>${i} half-lives (${years[i]} years for C-14): ${+v.toFixed(2)}% remaining</title></path>`;
      g += t(cx, y - 8, (+v.toFixed(2)) + "%", "tb mono", "middle");
      g += t(cx, B + 20, String(i), "tb mono", "middle") + t(cx, B + 37, years[i], "tm mono", "middle");
    }
    g += t(L, B + 62, "Top row: half-lives elapsed.  Bottom row: carbon-14 age in years.", "tm");
    return g + "</svg>";
  },

  bigfive() {
    const L = 60, Rt = 650, B = 250, X = ma => L + (500 - ma) / 500 * (Rt - L), Y = p => B - p * 1.7;
    const ev = [
      { n: "End-Ordovician", ma: 445, p: 85, row: 0 }, { n: "Late Devonian", ma: 372, p: 75, row: 1 },
      { n: "End-Permian", ma: 252, p: 90, row: 0 }, { n: "End-Triassic", ma: 201, p: 80, row: 1 },
      { n: "End-Cretaceous", ma: 66, p: 76, row: 0 }
    ];
    let g = svgOpen(680, 300, "Bar chart of the Big Five mass extinctions on a timeline from 500 million years ago to today");
    [25, 50, 75, 100].forEach(v => { g += `<line x1="${L}" y1="${Y(v)}" x2="${Rt}" y2="${Y(v)}" class="stroke-line" stroke-width="1"/>` + t(L - 8, Y(v) + 4, v + "%", "tm mono", "end"); });
    g += `<line x1="${L}" y1="${B}" x2="${Rt}" y2="${B}" class="stroke-muted" stroke-width="1"/>`;
    [500, 400, 300, 200, 100, 0].forEach(m => { g += t(X(m), B + 20, m === 0 ? "Today" : m + " Ma", "tm mono", m === 500 ? "start" : m === 0 ? "end" : "middle"); });
    ev.forEach(e => {
      const cx = X(e.ma), w = 26, x = cx - w / 2, y = Y(e.p), top = e.row ? 52 : 18;
      g += `<line x1="${cx}" y1="${top + 20}" x2="${cx}" y2="${y - 4}" class="stroke-line" stroke-width="1"/>`;
      g += `<path d="M${x} ${B}V${y + 4}Q${x} ${y} ${x + 4} ${y}H${x + w - 4}Q${x + w} ${y} ${x + w} ${y + 4}V${B}Z" class="fill-accent"><title>${e.n}, ${e.ma} million years ago: about ${e.p}% of marine species lost</title></path>`;
      g += t(cx, top, e.n, "tb", "middle") + t(cx, top + 15, `${e.ma} Ma · ≈${e.p}%`, "tm mono", "middle");
    });
    return g + "</svg>";
  },

  keeling() {
    const data = [[1960, 316.9], [1970, 325.7], [1980, 338.8], [1990, 354.5], [2000, 369.7], [2010, 389.9], [2020, 414.2], [2023, 421.1]];
    const L = 64, Rt = 600, T = 24, B = 250, X = y => L + (y - 1960) / (2023 - 1960) * (Rt - L), Y = p => B - (p - 280) / 150 * (B - T);
    let g = svgOpen(680, 290, "Line chart of atmospheric CO2 at Mauna Loa rising from 317 ppm in 1960 to 421 ppm in 2023");
    [300, 350, 400].forEach(v => { g += `<line x1="${L}" y1="${Y(v)}" x2="${Rt}" y2="${Y(v)}" class="stroke-line" stroke-width="1"${v === 300 ? ' stroke-dasharray="5 4"' : ""}/>` + t(L - 8, Y(v) + 4, String(v), "tm mono", "end"); });
    g += t(L - 8, T + 2, "ppm", "tm mono", "end");
    g += `<line x1="${L}" y1="${B}" x2="${Rt}" y2="${B}" class="stroke-muted" stroke-width="1"/>`;
    [1960, 1980, 2000, 2020].forEach(y => { g += t(X(y), B + 20, String(y), "tm mono", "middle"); });
    g += `<line x1="${L}" y1="${Y(300)}" x2="${Rt}" y2="${Y(300)}" class="stroke-now" stroke-width="2" stroke-dasharray="6 5"/>`;
    g += t(L + 8, Y(300) + 18, "≈300 ppm: ice-core maximum, 800,000 years", "tb-now");
    const pts = data.map(([y, p]) => `${X(y).toFixed(1)},${Y(p).toFixed(1)}`);
    g += `<path d="M${pts[0]}L${pts.slice(1).join("L")}L${X(2023).toFixed(1)},${B}L${L},${B}Z" class="fill-accent-tint"/>`;
    g += `<polyline points="${pts.join(" ")}" class="stroke-accent" fill="none" stroke-width="2.5" stroke-linejoin="round"/>`;
    data.forEach(([y, p]) => { g += `<circle cx="${X(y).toFixed(1)}" cy="${Y(p).toFixed(1)}" r="10" fill="transparent"><title>${y}: ${p} ppm</title></circle>`; });
    const [ex, ey] = [X(2023), Y(421.1)];
    g += `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="5" class="fill-accent stroke-surface" stroke-width="2"/>` + t(ex + 10, ey + 4, "421 ppm", "tb mono") + t(ex + 10, ey + 19, "2023", "tm mono");
    return g + "</svg>";
  },

  calendar() {
    const ev = CAL_EVENTS();
    const L = 20, Rt = 660, W = Rt - L, dayX = d => L + d / 365 * W;
    const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], mdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let g = svgOpen(680, 270, "Earth's history compressed into one calendar year, with a zoomed view of December");
    // Year bar
    let d0 = 0;
    months.forEach((m, i) => {
      const x = dayX(d0) + 1, w = mdays[i] / 365 * W - 2;
      g += `<rect x="${x.toFixed(1)}" y="62" width="${w.toFixed(1)}" height="22" rx="3" class="${i === 11 ? "fill-now" : "fill-sunken"}"/>` + t((x + w / 2).toFixed(1), 77, m, i === 11 ? "tb-dark mono" : "tm mono", "middle");
      d0 += mdays[i];
    });
    ev.filter(e => !e.dec).forEach(e => {
      const x = dayX(e.day), anchor = e.day < 5 ? "start" : "middle";
      g += `<line x1="${x.toFixed(1)}" y1="44" x2="${x.toFixed(1)}" y2="88" class="stroke-ink" stroke-width="1.5"/>`;
      g += t(x.toFixed(1), 18, e.label, "tb", anchor) + t(x.toFixed(1), 34, e.date, "tm mono", anchor);
    });
    // Zoom connectors + December bar
    const decX = dayX(334);
    g += `<path d="M${decX.toFixed(1)} 86L${L} 150M${Rt} 86L${Rt} 150" class="stroke-line" stroke-width="1" fill="none"/>`;
    for (let d = 1; d <= 31; d++) {
      const x = L + (d - 1) / 31 * W + 0.5, w = W / 31 - 1;
      g += `<rect x="${x.toFixed(1)}" y="150" width="${w.toFixed(1)}" height="22" rx="2" class="fill-now-tint"/>`;
    }
    [1, 8, 15, 22, 31].forEach(d => { g += t((L + (d - 0.5) / 31 * W).toFixed(1), 188, "Dec " + d, "tm mono", "middle"); });
    ev.filter(e => e.dec).forEach(e => {
      const x = L + (e.day - 334) / 31 * W;
      const above = e.label.startsWith("Homo");
      if (above) {
        g += `<line x1="${x.toFixed(1)}" y1="132" x2="${x.toFixed(1)}" y2="176" class="stroke-ink" stroke-width="1.5"/>`;
        g += t((x - 8).toFixed(1), 116, e.label, "tb", "end") + t((x - 8).toFixed(1), 132, e.date, "tm mono", "end");
      } else {
        g += `<line x1="${x.toFixed(1)}" y1="146" x2="${x.toFixed(1)}" y2="214" class="stroke-ink" stroke-width="1.5"/>`;
        g += t(x.toFixed(1), 232, e.label, "tb", "middle") + t(x.toFixed(1), 248, e.date, "tm mono", "middle");
      }
    });
    return g + "</svg>";
  }
};

// Earth history mapped onto one 365-day year: day = 365 × (1 − Ma / 4540).
function CAL_EVENTS() {
  const list = [
    { label: "Earth forms", ma: 4540 }, { label: "First life", ma: 3700 }, { label: "Oxygen fills the air", ma: 2400 },
    { label: "Cambrian explosion", ma: 539 }, { label: "The Great Dying", ma: 252 }, { label: "Dinosaurs disappear", ma: 66 },
    { label: "Homo sapiens", ma: 0.3 }
  ];
  return list.map(e => {
    const day = 365 * (1 - e.ma / 4540);
    const dt = new Date(Date.UTC(2025, 0, 1) + day * 864e5);
    let date = dt.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
    if (e.ma < 1) date += ", " + dt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).toLowerCase();
    return { ...e, day, date, dec: day >= 334 };
  });
}

/* ------------------------------------------------------------------ week page */
const WEEK_CSS = `
.band { background: var(--surface); border-bottom: 1px solid var(--line); }
.strata { height: 12px; }
.head { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 40px; align-items: end; padding-block: 36px 40px; animation: rise .5s cubic-bezier(.2,.7,.2,1) both; }
.head-text { display: grid; gap: 16px; min-width: 0; }
.crumbs { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.head h1 { font-size: clamp(2.4rem, 5.6vw, 4.2rem); font-weight: 800; line-height: .98; letter-spacing: -0.03em; }
.head .lede { font-size: 18px; line-height: 1.55; color: var(--muted); margin: 0; max-width: 60ch; }
.meta { display: flex; gap: 8px 22px; flex-wrap: wrap; font-size: 14px; color: var(--muted); }
.meta b { color: var(--ink); font-weight: 600; }
.coremini { display: grid; gap: 3px; justify-items: center; }
.coremini .cm { width: 34px; height: 15px; border-left: 1px solid var(--pattern); border-right: 1px solid var(--pattern); position: relative; }
.coremini .cm.past, .coremini .cm.future { opacity: .45; }
.coremini .cm.here { box-shadow: 0 0 0 3px var(--now); opacity: 1; }
.coremini .cm.here::after { content: ""; position: absolute; right: -16px; top: 50%; transform: translateY(-50%); border: 6px solid transparent; border-right-color: var(--now); }
.coremini .label { margin-top: 8px; }

.body { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 48px; padding-block: 40px 64px; align-items: start; }
.aside { position: sticky; top: 20px; display: grid; gap: 16px; order: 2; }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 20px; display: grid; gap: 12px; }
.card h2 { font-size: 1.05rem; font-weight: 700; }
.obj { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; font-size: 14.5px; line-height: 1.45; }
.obj li { display: grid; grid-template-columns: 18px minmax(0, 1fr); gap: 8px; }
.obj li::before { content: ""; width: 8px; height: 8px; margin-top: 7px; border-radius: 2px; background: var(--now); }
.steps { margin: 0; padding: 0; list-style: none; display: grid; counter-reset: s; }
.steps li { counter-increment: s; display: grid; grid-template-columns: 26px minmax(0, 1fr); gap: 10px; padding: 9px 0; border-top: 1px solid var(--line); font-size: 14px; line-height: 1.35; }
.steps li:first-child { border-top: 0; padding-top: 0; }
.steps li::before { content: counter(s); width: 24px; height: 24px; border-radius: 50%; background: var(--sunken); display: grid; place-items: center; font: 600 12px/1 var(--mono); color: var(--ink); }
.steps small { display: block; font: 500 11px/1.5 var(--mono); text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }

.article { display: grid; gap: 40px; min-width: 0; order: 1; }
.prose { display: grid; gap: 16px; max-width: 66ch; }
.prose h2 { font-size: clamp(1.6rem, 3vw, 2rem); font-weight: 700; line-height: 1.15; }
.prose p { margin: 0; }
.prose strong { font-weight: 700; }

figure { margin: 0; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 24px 24px 18px; display: grid; gap: 14px; }
figure .fig-scroll { overflow-x: auto; }
figure svg { display: block; width: 100%; min-width: 520px; height: auto; }
figcaption { font-size: 14px; color: var(--muted); line-height: 1.5; max-width: 70ch; }
figcaption b { color: var(--ink); }
svg text { font-family: var(--body); font-size: 13px; }
svg .tb { fill: var(--ink); font-weight: 600; }
svg .tm { fill: var(--muted); font-size: 12px; }
svg .tb-dark { fill: #1C2220; font-weight: 700; }
svg .tb-now { fill: var(--now); font-weight: 600; font-size: 12px; }
svg .mono { font-family: var(--mono); font-size: 11.5px; }
.fill-ink { fill: var(--ink); } .fill-surface { fill: var(--surface); } .fill-sunken { fill: var(--sunken); }
.fill-accent { fill: var(--accent); } .fill-accent-tint { fill: var(--accent-tint); } .fill-now { fill: var(--now); } .fill-now-tint { fill: var(--now-tint); } .fill-corein { fill: var(--core-in); }
.fill-u1 { fill: var(--u1); } .fill-u2 { fill: var(--u2); } .fill-u3 { fill: var(--u3); } .fill-u4 { fill: var(--u4); }
.stroke-ink { stroke: var(--ink); } .stroke-muted { stroke: var(--muted); } .stroke-line { stroke: var(--line); } .stroke-surface { stroke: var(--surface); } .stroke-accent { stroke: var(--accent); } .stroke-now { stroke: var(--now); }
.data { font-size: 13.5px; }
.data summary { cursor: pointer; color: var(--accent); font-weight: 600; width: max-content; }
.data .tbl { overflow-x: auto; margin-top: 10px; }
.data table { border-collapse: collapse; min-width: 100%; font-variant-numeric: tabular-nums; }
.data th, .data td { text-align: left; padding: 7px 12px 7px 0; border-bottom: 1px solid var(--line); white-space: nowrap; }
.data th { font: 500 11px/1.2 var(--mono); text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }

.note { background: var(--now-tint); border-radius: var(--r); padding: 24px; display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 16px; }
.note .pin { width: 44px; height: 44px; border-radius: 50%; background: var(--surface); display: grid; place-items: center; color: var(--now); }
.note h3 { font-size: 1.2rem; font-weight: 700; margin: 4px 0 8px; }
.note p { margin: 0; max-width: 64ch; }

.terms { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 32px; margin: 0; }
.terms div { padding: 14px 0; border-top: 1px solid var(--line); }
.terms dt { font: 700 15px/1.3 var(--body); margin-bottom: 4px; }
.terms dd { margin: 0; font-size: 14.5px; color: var(--muted); line-height: 1.5; }

.checks { display: grid; gap: 10px; }
.checks details { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; }
.checks summary { list-style: none; cursor: pointer; padding: 16px 18px; display: grid; grid-template-columns: 30px minmax(0, 1fr) auto; gap: 12px; align-items: start; font-weight: 600; }
.checks summary::-webkit-details-marker { display: none; }
.checks summary .q { font: 600 12px/1 var(--mono); width: 30px; height: 26px; border-radius: 8px; background: var(--accent-tint); color: var(--accent); display: grid; place-items: center; }
.checks summary .reveal { font: 500 12px/1.9 var(--mono); color: var(--accent); white-space: nowrap; }
.checks details[open] summary .reveal { color: var(--muted); }
.checks details[open] summary .reveal::before { content: "Hide"; }
.checks details:not([open]) summary .reveal::before { content: "Show answer"; }
.checks .a { padding: 0 18px 18px 60px; color: var(--muted); }
.checks summary:hover .reveal { text-decoration: underline; }

.task { background: var(--accent-tint); border-radius: var(--r); padding: 28px; display: grid; gap: 16px; }
.task h2 { font-size: 1.5rem; font-weight: 700; }
.task ol { margin: 0; padding-left: 1.3em; display: grid; gap: 8px; max-width: 64ch; }
.task ol li::marker { font-family: var(--mono); font-weight: 500; color: var(--accent); }
.deliver { display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; padding-top: 14px; border-top: 1px solid color-mix(in srgb, var(--accent) 25%, transparent); font-size: 15px; }
.deliver b { font-weight: 700; }

.next { display: flex; justify-content: space-between; gap: 16px; align-items: center; flex-wrap: wrap; padding-top: 24px; border-top: 1px solid var(--line); }
.next .t { font: 700 1.25rem/1.2 var(--display); }

@media (max-width: 900px) {
  .body { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .aside { position: static; order: 0; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; }
}
@media (max-width: 640px) {
  .head { grid-template-columns: minmax(0, 1fr); gap: 20px; padding-block: 28px 32px; }
  .coremini { grid-auto-flow: column; justify-content: start; }
  .coremini .cm { width: 22px; height: 12px; }
  .coremini .cm.here::after { display: none; }
  .coremini .label { margin: 0 0 0 10px; align-self: center; }
  .aside { grid-template-columns: minmax(0, 1fr); }
  .terms { grid-template-columns: minmax(0, 1fr); }
  .note { grid-template-columns: minmax(0, 1fr); }
  figure { padding: 16px 14px 14px; }
  .task { padding: 22px; }
  .checks .a { padding-left: 18px; }
}`;

const PIN = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`;

function figTable(fig) {
  let tb = fig.table;
  if (!tb) return "";
  const rows = tb.rows === "calendar" ? CAL_EVENTS().map(e => [e.label, e.ma >= 1 ? e.ma.toLocaleString("en-US") : "0.3", e.date]) : tb.rows;
  return `<details class="data"><summary>Show the data as a table</summary><div class="tbl"><table><thead><tr>${tb.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`;
}

function weekBody(w) {
  const u = C.units[w.unit];
  const next = weeks[w.n];
  const core = weeks.map(x => `<div class="cm lith-${x.unit} ${x.n < w.n ? "past" : x.n > w.n ? "future" : "here"}" title="Week ${x.n}: ${esc(x.title)}"></div>`).join("");
  const [s1, s2] = w.sections;
  const section = s => `<section class="prose"><h2>${esc(s.h)}</h2>${s.p.map(p => `<p>${p}</p>`).join("")}</section>`;
  return `
<header class="band">
  <div class="strata lith-${w.unit}"></div>
  <div class="wrap head">
    <div class="head-text">
      <div class="crumbs"><span class="chip">${esc(C.course.code)}</span><span class="chip">Week ${w.n} of ${weeks.length}</span><span class="label">Unit ${u.n} · ${esc(u.name)}</span></div>
      <h1>${esc(w.title)}</h1>
      <p class="lede">${esc(w.lede)}</p>
      <div class="meta"><span><b>${esc(w.time)}</b> this week</span><span><b>${w.objectives.length}</b> learning objectives</span><span><b>1</b> activity to submit</span></div>
    </div>
    <div class="coremini" aria-hidden="true">${core}<span class="label">W${pad(w.n)} / ${pad(weeks.length)}</span></div>
  </div>
</header>

<div class="wrap body">
  <aside class="aside">
    <section class="card">
      <h2>By the end of this week you can</h2>
      <ul class="obj">${w.objectives.map(o => `<li>${esc(o)}</li>`).join("")}</ul>
    </section>
    <section class="card">
      <h2>Your path this week</h2>
      <ol class="steps">${w.path.map(([k, title, time]) => `<li><span><small>${esc(k)} · ${esc(time)}</small>${esc(title)}</span></li>`).join("")}</ol>
    </section>
  </aside>

  <main class="article">
    ${section(s1)}

    <figure>
      <div class="fig-scroll">${FIG[w.figure.id]()}</div>
      <figcaption>${esc(w.figure.caption)}</figcaption>
      ${figTable(w.figure)}
    </figure>

    ${section(s2)}

    <section class="note" aria-label="Field note">
      <div class="pin">${PIN}</div>
      <div><span class="label">Field note</span><h3>${esc(w.fieldNote.place)}</h3><p>${esc(w.fieldNote.text)}</p></div>
    </section>

    <section class="prose" style="max-width:none">
      <h2>Key terms</h2>
      <dl class="terms">${w.terms.map(([term, def]) => `<div><dt>${esc(term)}</dt><dd>${esc(def)}</dd></div>`).join("")}</dl>
    </section>

    <section class="prose" style="max-width:none">
      <h2>Check your understanding</h2>
      <p style="color:var(--muted)">Try each question before you open the answer. These aren't graded.</p>
      <div class="checks">${w.checks.map(([q, a], i) => `<details><summary><span class="q">Q${i + 1}</span><span>${esc(q)}</span><span class="reveal"></span></summary><div class="a">${esc(a)}</div></details>`).join("")}</div>
    </section>

    <section class="task" aria-labelledby="task-h">
      <span class="label">This week's activity</span>
      <h2 id="task-h">${esc(w.activity.title)}</h2>
      <ol>${w.activity.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
      <div class="deliver"><span class="label">To submit</span><b>${esc(w.activity.deliverable)}</b></div>
    </section>

    <div class="next">
      ${next
        ? `<div><span class="label">Coming up in Week ${next.n}</span><div class="t">${esc(next.title)}</div></div><span class="chip">Unit ${C.units[next.unit].n} · ${esc(C.units[next.unit].name)}</span>`
        : `<div><span class="label">End of the core</span><div class="t">That's all eight layers. Thanks for digging in.</div></div>`}
    </div>
  </main>
</div>`;
}

/* ------------------------------------------------------------------ course overview */
const OVERVIEW_CSS = `
.strata4 { display: grid; grid-template-columns: repeat(4, 1fr); height: 12px; }
.coremini.all .cm { opacity: 1; }
.rhythm { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; counter-reset: r; }
.rhythm li { counter-increment: r; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 16px; display: grid; gap: 6px; align-content: start; font-size: 14px; line-height: 1.45; color: var(--muted); }
.rhythm li::before { content: counter(r); width: 26px; height: 26px; border-radius: 50%; background: var(--accent-tint); color: var(--accent); display: grid; place-items: center; font: 600 12px/1 var(--mono); margin-bottom: 4px; }
.rhythm b { color: var(--ink); font: 700 15px/1.2 var(--body); }
.atlas { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; }
.atlas-row { display: grid; grid-template-columns: 10px 52px minmax(0, 1.2fr) minmax(0, 1fr); gap: 0 16px; align-items: center; border-top: 1px solid var(--line); padding-right: 18px; }
.atlas-row:first-child { border-top: 0; }
.atlas-row .seg { align-self: stretch; min-height: 58px; }
.atlas-row .n { font: 500 12px/1 var(--mono); color: var(--muted); }
.atlas-row .ti { font-weight: 600; padding-block: 12px; }
.atlas-row .ti small { display: block; font: 500 11px/1.5 var(--mono); text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
.atlas-row .ac { font-size: 14px; color: var(--muted); }
.weights { display: grid; gap: 14px; }
.wt { display: grid; grid-template-columns: minmax(0, 220px) minmax(0, 1fr) 48px; gap: 16px; align-items: center; }
.wt b { display: block; font-weight: 600; }
.wt small { color: var(--muted); font-size: 13px; }
.wt .track { height: 12px; background: var(--sunken); border-radius: 99px; overflow: hidden; }
.wt .fill { height: 100%; background: var(--accent); border-radius: 99px; }
.wt .pct { font: 600 15px/1 var(--mono); text-align: right; font-variant-numeric: tabular-nums; }
.wt-total { display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--line); font-size: 14px; color: var(--muted); }
.policies { display: grid; gap: 10px; }
.policies details { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; }
.policies summary { list-style: none; cursor: pointer; padding: 16px 18px; display: flex; justify-content: space-between; gap: 12px; font-weight: 600; }
.policies summary::-webkit-details-marker { display: none; }
.policies summary::after { content: "+"; font: 500 18px/1 var(--mono); color: var(--accent); }
.policies details[open] summary::after { content: "–"; }
.policies p { margin: 0; padding: 0 18px 18px; color: var(--muted); max-width: 66ch; }
.prof { display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 14px; align-items: center; }
.avatar { width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center; font: 700 19px/1 var(--display); color: #1C2220; background: radial-gradient(circle at 30% 30%, var(--u1), var(--u2)); }
.prof b { display: block; }
.prof span { font-size: 13px; color: var(--muted); line-height: 1.35; display: block; }
.facts { display: grid; gap: 10px; margin: 0; font-size: 14px; }
.facts dt { font: 500 11px/1.4 var(--mono); text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
.facts dd { margin: 0; overflow-wrap: anywhere; }
.help { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; font-size: 14px; line-height: 1.45; }
.help b { display: block; }
.help span { color: var(--muted); }
@media (max-width: 900px) { .rhythm { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 640px) {
  .rhythm { grid-template-columns: minmax(0, 1fr); }
  .atlas-row { grid-template-columns: 8px 40px minmax(0, 1fr); }
  .atlas-row .ac { grid-column: 3; padding-bottom: 12px; margin-top: -6px; }
  .wt { grid-template-columns: minmax(0, 1fr) 48px; }
  .wt .track { grid-column: 1 / -1; grid-row: 2; }
}`;

function overviewBody() {
  const O = C.overview, P = O.instructor;
  const core = weeks.map(x => `<div class="cm lith-${x.unit}" title="Week ${x.n}: ${esc(x.title)}"></div>`).join("");
  const total = O.grading.reduce((s, g) => s + g[1], 0);
  return `
<header class="band">
  <div class="strata4">${unitIds.map(u => `<div class="lith-${u}"></div>`).join("")}</div>
  <div class="wrap head">
    <div class="head-text">
      <div class="crumbs"><span class="chip">${esc(C.course.code)}</span><span class="chip">Start here</span><span class="label">${esc(C.course.title)}</span></div>
      <h1>Course overview</h1>
      <p class="lede">${esc(O.lede)}</p>
      <div class="meta"><span><b>${weeks.length}</b> weeks</span><span><b>${unitIds.length}</b> units</span><span><b>Fully online</b>, work at your own pace each week</span></div>
    </div>
    <div class="coremini all" aria-hidden="true">${core}<span class="label">${weeks.length} layers</span></div>
  </div>
</header>

<div class="wrap body">
  <aside class="aside">
    <section class="card">
      <h2>Your instructor</h2>
      <div class="prof"><div class="avatar" aria-hidden="true">${esc(P.initials)}</div><div><b>${esc(P.name)}</b><span>${esc(P.role)}</span></div></div>
      <dl class="facts">
        <div><dt>Email</dt><dd>${esc(P.email)}</dd></div>
        <div><dt>Office hours</dt><dd>${esc(P.hours)}</dd></div>
        <div><dt>Replies</dt><dd>${esc(P.reply)}</dd></div>
      </dl>
    </section>
    <section class="card">
      <h2>Getting help</h2>
      <ul class="help">
        <li><b>Questions about the material</b><span>Email your instructor or come to office hours.</span></li>
        <li><b>Problems with Brightspace</b><span>Contact your school's IT help desk.</span></li>
        <li><b>Accommodations</b><span>Contact accessibility services, then share your plan with your instructor.</span></li>
      </ul>
    </section>
  </aside>

  <main class="article">
    <section class="prose"><h2>Welcome</h2>${O.welcome.map(p => `<p>${esc(p)}</p>`).join("")}</section>

    <section class="prose" style="max-width:none">
      <h2>How each week works</h2>
      <p style="color:var(--muted)">Every week follows the same five steps, in this order.</p>
      <ol class="rhythm">${O.rhythm.map(([k, d]) => `<li><b>${esc(k)}</b>${esc(d)}</li>`).join("")}</ol>
    </section>

    <section class="prose" style="max-width:none">
      <h2>The course at a glance</h2>
      <div class="atlas">${weeks.map(w => `<div class="atlas-row"><span class="seg lith-${w.unit}"></span><span class="n">W${pad(w.n)}</span><span class="ti"><small>Unit ${C.units[w.unit].n} · ${esc(C.units[w.unit].name)}</small>${esc(w.title)}</span><span class="ac">${esc(w.activity.title)}</span></div>`).join("")}</div>
    </section>

    <section class="prose" style="max-width:none">
      <h2>How you're graded</h2>
      <div class="weights">${O.grading.map(([k, v, d]) => `<div class="wt"><span><b>${esc(k)}</b><small>${esc(d)}</small></span><div class="track" role="img" aria-label="${v}%"><div class="fill" style="width:${v}%"></div></div><span class="pct">${v}%</span></div>`).join("")}
        <div class="wt-total"><span>Check-your-understanding questions are practice and aren't graded.</span><span>Total ${total}%</span></div>
      </div>
    </section>

    <section class="prose" style="max-width:none">
      <h2>What you'll need</h2>
      <dl class="terms">${O.needs.map(([k, d]) => `<div><dt>${esc(k)}</dt><dd>${esc(d)}</dd></div>`).join("")}</dl>
    </section>

    <section class="prose" style="max-width:none">
      <h2>Course policies</h2>
      <div class="policies">${O.policies.map(([k, d]) => `<details><summary>${esc(k)}</summary><p>${esc(d)}</p></details>`).join("")}</div>
    </section>

    <section class="task">
      <span class="label">Ready?</span>
      <h2>Start with Week 1: ${esc(weeks[0].title)}</h2>
      <p style="margin:0;max-width:60ch">Open the Week 1 module in Content. It begins with a tour of Earth from the crust to the core.</p>
    </section>
  </main>
</div>`;
}

/* ------------------------------------------------------------------ output */
const doc = (title, css, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
${FONTS}
<style>${BASE_CSS}${css}
</style>
</head>
<body>
${body}
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, "index.html"), doc(C.course.title, HOME_CSS, homeBody()));
fs.writeFileSync(path.join(__dirname, "homepage.html"),
  `<title>${esc(C.course.title)}</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${FONTS}\n<style>${BASE_CSS}${HOME_CSS}\n</style>\n${homeBody()}\n`);

fs.mkdirSync(path.join(ROOT, "weeks"), { recursive: true });
weeks.forEach(w => {
  fs.writeFileSync(path.join(ROOT, "weeks", `week-${pad(w.n)}.html`), doc(`Week ${w.n}: ${w.title}`, WEEK_CSS, weekBody(w)));
});
fs.writeFileSync(path.join(ROOT, "weeks", "course-overview.html"), doc(`Course overview: ${C.course.title}`, WEEK_CSS + OVERVIEW_CSS, overviewBody()));

// Preview of all weeks in one page (for the Claude artifact only): each week in its own section.
const preview = `<title>Earth Through Time Weeks</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${FONTS}\n<style>${BASE_CSS}${WEEK_CSS}${OVERVIEW_CSS}
.switch { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; background: var(--ink); color: var(--bg); }
.switch .wrap { display: flex; gap: 6px; align-items: center; overflow-x: auto; padding-block: 10px; }
.switch a { color: var(--bg); text-decoration: none; font: 500 12px/1 var(--mono); padding: 8px 10px; border-radius: 8px; white-space: nowrap; }
.switch a:hover { background: color-mix(in srgb, var(--bg) 15%, transparent); }
.switch span { font: 600 13px/1 var(--body); margin-right: 8px; white-space: nowrap; }
.wkpage { border-bottom: 8px solid var(--ink); scroll-margin-top: 50px; }
\n</style>
<nav class="switch"><div class="wrap"><span>Preview · jump to</span><a href="#overview">Overview</a>${weeks.map(w => `<a href="#week${w.n}">Week ${w.n}</a>`).join("")}</div></nav>
<div class="wkpage" id="overview">${overviewBody()}</div>
${weeks.map(w => `<div class="wkpage" id="week${w.n}">${weekBody(w).replace(/id="task-h"/g, `id="task-h${w.n}"`).replace(/aria-labelledby="task-h"/g, `aria-labelledby="task-h${w.n}"`).replace(/rc-ah|pb-ah/g, m => m + w.n)}</div>`).join("\n")}
`;
fs.writeFileSync(path.join(__dirname, "weeks-preview.html"), preview);
console.log("Built index.html, src/homepage.html, " + weeks.length + " week pages, src/weeks-preview.html");
