/**
 * Austernatlas: kleine Strichzeichnungen, prozedural erzeugt (ohne Abhängigkeiten).
 * ---------------------------------------------------------------------------
 * Jede Zeichnung ist deterministisch (fester Seed) und landet als <symbol>
 * im SVG-Sprite. Stil: graue Outline, feiner Strich, Fläche 160 × 120.
 *
 * Bausteine: geschlossene Schale (tief oder flach), geöffnete Schale mit
 * Fleisch, dazu kleine Requisiten (Seil, Dachziegel, Münze, Wellen, Alge).
 */

const TAU = Math.PI * 2;
const W = 160;
const H = 120;

/* ------------------------------------------------------------------ */
/* Werkzeuge                                                           */
/* ------------------------------------------------------------------ */

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (v) => Math.round(v * 10) / 10;

/** Catmull-Rom-Spline als kubische Bézierkurven. */
function smooth(points, closed = true) {
  const len = points.length;
  if (len < 2) return '';
  const at = (i) => (closed ? points[(i + len) % len] : points[Math.max(0, Math.min(len - 1, i))]);
  let d = `M${r1(points[0][0])} ${r1(points[0][1])}`;
  const segments = closed ? len : len - 1;
  for (let i = 0; i < segments; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return closed ? `${d}Z` : d;
}

const angleDiff = (a, b) => {
  let d = (a - b) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};

/** Lokale Koordinaten (Schloss oben) → Zeichenfläche. */
const place = (pts, { cx = W / 2, cy = H / 2, rot = 0 }) => {
  const c = Math.cos((rot * Math.PI) / 180);
  const s = Math.sin((rot * Math.PI) / 180);
  return pts.map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c]);
};

const centroid = (pts) => [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];

/* ------------------------------------------------------------------ */
/* Schalen                                                             */
/* ------------------------------------------------------------------ */

/**
 * Umriss einer Austernschale, Schloss (Wirbel) oben.
 * rx/ry: Halbachsen · pinch: wie spitz das Schloss ist · irregular: Unregelmäßigkeit
 * ruffle/ruffleK: Wellung des Rands · wing: kleine „Ohren“ flacher Austern
 */
function outline({ rx, ry, pinch = 0.35, irregular = 0.07, ruffle = 0.025, ruffleK = 13, wing = 0, seed = 1, n = 120 }) {
  const rnd = rng(seed);
  const harmonics = [2, 3, 4, 5, 6].map((k) => ({ k, a: ((rnd() - 0.5) * 2 * irregular) / Math.sqrt(k), p: rnd() * TAU }));
  const phase = [rnd() * TAU, rnd() * TAU];
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * TAU - Math.PI / 2; // beginnt am Schloss
    const dh = angleDiff(t, -Math.PI / 2);
    let r = 1;
    for (const h of harmonics) r += h.a * Math.sin(h.k * t + h.p);
    r *= 1 - pinch * Math.exp(-(dh * dh) / 0.45);
    const lip = 1 - Math.exp(-(dh * dh) / 1.1); // 0 am Schloss, 1 an der Lippe
    r += lip * (ruffle * Math.sin(ruffleK * t + phase[0]) + ruffle * 0.55 * Math.sin(ruffleK * 1.73 * t + phase[1]));
    if (wing) r += wing * (Math.exp(-(angleDiff(t, -Math.PI / 2 - 0.42) ** 2) / 0.012) + Math.exp(-(angleDiff(t, -Math.PI / 2 + 0.42) ** 2) / 0.012));
    pts.push([Math.cos(t) * rx * r, Math.sin(t) * ry * r]);
  }
  return pts;
}

/** Wachstumslinien: Umriss zum Schloss hin skaliert, nur zur Lippe hin gezeichnet. */
function growthLines(pts, rings, { from = 0.14, to = 0.86, wobble = 0.02 } = {}) {
  const n = pts.length;
  const hinge = pts[0];
  return rings.map((s, j) => {
    const a = Math.round(n * (from + j * 0.025));
    const b = Math.round(n * (to - j * 0.025));
    const seg = [];
    for (let i = a; i <= b; i += 2) {
      const k = s + wobble * Math.sin(i * 0.37 + j * 1.9);
      seg.push([hinge[0] + (pts[i][0] - hinge[0]) * k, hinge[1] + (pts[i][1] - hinge[1]) * k]);
    }
    return seg;
  });
}

/** Rippen vom Schloss zum Rand (Felsenaustern aus Portugal und Australien). */
function ribs(pts, count, { from = 0.3, to = 0.92 } = {}) {
  const n = pts.length;
  const hinge = pts[0];
  return Array.from({ length: count }, (_, k) => {
    const i = Math.round(n * (0.18 + (0.64 * (k + 0.5)) / count));
    return [from, (from + to) / 2, to].map((u, m) => [
      hinge[0] + (pts[i][0] - hinge[0]) * u + (m === 1 ? Math.sin(k * 2.3) * 1.2 : 0),
      hinge[1] + (pts[i][1] - hinge[1]) * u,
    ]);
  });
}

/** Geschlossene Schale von oben. */
function closedShell(o) {
  const pts = outline(o);
  const paths = [smooth(place(pts, o))];
  for (const seg of growthLines(pts, o.rings ?? [0.8, 0.6, 0.41], o.lines)) paths.push(smooth(place(seg, o), false));
  if (o.ribs) for (const seg of ribs(pts, o.ribs)) paths.push(smooth(place(seg, o), false));
  return paths;
}

/** Geöffnete Schale (auf Eis serviert): Rand, Perlmuttkante, Fleisch mit gekräuseltem Mantelsaum. */
function openShell(o) {
  const pts = outline(o);
  const n = pts.length;
  const [cx, cy] = centroid(pts);
  const paths = [smooth(place(pts, o))];
  // Perlmuttkante, nur zur Lippe hin
  const rim = pts.map(([x, y]) => [cx + (x - cx) * 0.86, cy + (y - cy) * 0.86 + 0.6]);
  paths.push(smooth(place(rim.slice(Math.round(n * 0.12), Math.round(n * 0.88)), o), false));
  // Fleisch: zur Lippe hin gekräuselt (Mantelsaum), zum Schloss hin glatt
  const m = o.meat ?? 0.64;
  const k = o.frillK ?? 24;
  const meat = pts.map(([x, y], i) => {
    const t = (i / n) * TAU;
    const lip = Math.sin(t / 2) ** 2; // 0 am Schloss, 1 an der Lippe
    const w = 1 + 0.035 * Math.sin(3 * t + (o.seed % 5)) + 0.03 * lip * Math.sin(k * t);
    return [cx + (x - cx) * m * w, cy + (o.meatShift ?? 2) + (y - cy) * m * w];
  });
  paths.push(smooth(place(meat, o)));
  if (o.gills) {
    // Kiemen als zweite, feinere Kräusellinie
    const gills = pts.map(([x, y], i) => {
      const t = (i / n) * TAU;
      const w = 0.5 + 0.03 * Math.sin(30 * t);
      return [cx + (x - cx) * m * w, cy + 4 + (y - cy) * m * w];
    });
    paths.push(smooth(place(gills.slice(Math.round(n * 0.22), Math.round(n * 0.78)), o), false));
  }
  return paths;
}

function ellipsePath([x, y], rx, ry, rot = 0) {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const t = (i / 16) * TAU;
    const c = Math.cos((rot * Math.PI) / 180);
    const s = Math.sin((rot * Math.PI) / 180);
    const ex = Math.cos(t) * rx;
    const ey = Math.sin(t) * ry;
    return [x + ex * c - ey * s, y + ex * s + ey * c];
  });
  return smooth(pts);
}

/* ------------------------------------------------------------------ */
/* Requisiten                                                          */
/* ------------------------------------------------------------------ */

/** Wellenlinien (Gezeiten, Wattenmeer). */
function waves(y, { x0 = 22, x1 = 138, amp = 2.2, len = 14, rows = 2, gap = 6 } = {}) {
  const paths = [];
  for (let r = 0; r < rows; r++) {
    const pts = [];
    const shift = r * len * 0.5;
    for (let x = x0 + r * 8; x <= x1 - r * 8; x += 2) pts.push([x, y + r * gap + Math.sin(((x + shift) / len) * TAU) * amp]);
    paths.push(smooth(pts, false));
  }
  return paths;
}

/** Münze als Größenvergleich. */
function coin(cx, cy, r) {
  return [ellipsePath([cx, cy], r, r), ellipsePath([cx, cy], r * 0.8, r * 0.8), `M${r1(cx - r * 0.25)} ${r1(cy - r * 0.32)}L${r1(cx + 0.5)} ${r1(cy - r * 0.42)}L${r1(cx + 0.5)} ${r1(cy + r * 0.4)}`];
}

/** Eingraviertes G (Gillardeau). */
function letterG(cx, cy, r) {
  // Bogen von oben rechts gegen den Uhrzeigersinn bis unten rechts, dann der Querbalken
  const a0 = -0.75;
  const a1 = -TAU + 0.35;
  const pts = Array.from({ length: 20 }, (_, i) => {
    const t = a0 + ((a1 - a0) * i) / 19;
    return [cx + Math.cos(t) * r, cy + Math.sin(t) * r];
  });
  return [smooth(pts, false), `M${r1(cx + r * 0.1)} ${r1(cy + r * 0.05)}H${r1(cx + r * 0.95)}V${r1(cy + Math.sin(0.35) * r)}`];
}

/** Seil mit Austern (Étang de Thau). */
function rope() {
  const paths = [];
  const x = 80;
  paths.push(`M${x - 3} 6C${x - 5} 40 ${x - 1} 80 ${x - 3} 114`, `M${x + 3} 6C${x + 1} 40 ${x + 5} 80 ${x + 3} 114`);
  for (let y = 10; y < 112; y += 7) paths.push(`M${x - 3} ${y}L${x + 3} ${y + 4}`);
  paths.push(`M44 6H116`);
  return paths;
}

/** Kieselalge (Blaue Navicula) als kleines Schiffchen. */
function diatom(cx, cy, len = 24, rot = -18) {
  const half = len / 2;
  const pts = [];
  for (let i = 0; i <= 20; i++) {
    const t = (i / 20) * Math.PI;
    pts.push([-Math.cos(t) * half, -Math.sin(t) * half * 0.24]);
  }
  for (let i = 0; i <= 20; i++) {
    const t = (i / 20) * Math.PI;
    pts.push([Math.cos(t) * half, Math.sin(t) * half * 0.24]);
  }
  const c = Math.cos((rot * Math.PI) / 180);
  const s = Math.sin((rot * Math.PI) / 180);
  const tr = ([x, y]) => [cx + x * c - y * s, cy + x * s + y * c];
  const axis = [[-half * 0.75, 0], [half * 0.75, 0]].map(tr);
  return [smooth(pts.map(tr)), `M${r1(axis[0][0])} ${r1(axis[0][1])}L${r1(axis[1][0])} ${r1(axis[1][1])}`, ellipsePath(tr([0, 0]), 1.2, 1.2)];
}

/* ------------------------------------------------------------------ */
/* Die Zeichnungen                                                     */
/* ------------------------------------------------------------------ */

// Grundformen
const CREUSE = { rx: 25, ry: 47, pinch: 0.42, irregular: 0.08, ruffle: 0.028, ruffleK: 13 };
const PLATE = { rx: 43, ry: 41, pinch: 0.17, irregular: 0.04, ruffle: 0.01, ruffleK: 22, wing: 0.05, rings: [0.86, 0.72, 0.58, 0.44, 0.3] };
const spat = (i, cx, cy, rot) => closedShell({ rx: 5.5, ry: 7.5, pinch: 0.3, irregular: 0.08, ruffle: 0.03, seed: 40 + i, rot, cx, cy, rings: [0.55] });

const DRAWINGS = {
  creuse: () => closedShell({ ...CREUSE, ry: 45, seed: 11, rot: -28 }),
  plate: () => closedShell({ ...PLATE, seed: 12, rot: 8 }),
  portugaise: () => closedShell({ ...CREUSE, rx: 20, ry: 48, irregular: 0.12, ruffle: 0.035, ruffleK: 11, seed: 13, rot: 40, rings: [0.82, 0.62, 0.42] }),
  virginica: () => closedShell({ rx: 23, ry: 46, pinch: 0.52, irregular: 0.06, ruffle: 0.008, ruffleK: 9, seed: 14, rot: -42, rings: [0.84, 0.68, 0.52, 0.36] }),
  kumamoto: () => closedShell({ rx: 27, ry: 31, pinch: 0.3, irregular: 0.06, ruffle: 0.05, ruffleK: 17, seed: 15, rot: -10, rings: [0.76, 0.54, 0.34] }),
  olympia: () => [
    ...closedShell({ rx: 17, ry: 18, pinch: 0.22, irregular: 0.07, ruffle: 0.03, ruffleK: 14, seed: 16, rot: 12, cx: 60, cy: 60, rings: [0.72, 0.46] }),
    ...coin(104, 62, 17),
  ],
  sydney: () => closedShell({ rx: 35, ry: 42, pinch: 0.34, irregular: 0.09, ruffle: 0.02, ruffleK: 10, seed: 17, rot: -16, rings: [0.84, 0.66, 0.48, 0.3] }),
  fine: () => openShell({ ...CREUSE, rx: 29, ry: 47, seed: 21, rot: -62 }),
  speciale: () => openShell({ ...CREUSE, rx: 31, ry: 47, seed: 22, rot: 60, meat: 0.7 }),
  pousse: () => openShell({ ...CREUSE, rx: 33, ry: 46, seed: 23, rot: -72, meat: 0.76, frillK: 28 }),
  verte: () => [...openShell({ ...CREUSE, rx: 29, ry: 45, seed: 24, rot: -64, cx: 72, cy: 64, gills: true }), ...diatom(130, 26, 26)],
  gillardeau: () => [...closedShell({ ...CREUSE, rx: 28, ry: 47, seed: 25, rot: -66, rings: [0.84, 0.66] }), ...letterG(78, 61, 8)],
  belon: () => openShell({ ...PLATE, rx: 42, ry: 41, seed: 26, rot: -6, meat: 0.62, meatShift: 5, frillK: 28 }),
  cancale: () => [
    ...closedShell({ ...CREUSE, rx: 20, ry: 38, seed: 27, rot: -36, cx: 56, cy: 50, rings: [0.8, 0.6, 0.4] }),
    ...closedShell({ ...PLATE, rx: 26, ry: 25, seed: 28, rot: 10, cx: 106, cy: 50, rings: [0.84, 0.66, 0.48] }),
    ...waves(100, { rows: 2, x0: 26, x1: 134 }),
  ],
  arcachon: () => [
    ...closedShell({ ...CREUSE, rx: 21, ry: 40, seed: 29, rot: -34, cx: 74, cy: 60, rings: [0.8, 0.6, 0.4] }),
    ...[[30, 38, 20], [120, 36, -30], [128, 74, 40], [106, 98, -10], [38, 88, 30], [24, 62, -40], [52, 104, 10]].flatMap(([cx, cy, rot], i) => spat(i, cx, cy, rot)),
  ],
  thau: () => [
    ...rope(),
    ...closedShell({ ...CREUSE, rx: 11, ry: 21, seed: 31, rot: 64, cx: 62, cy: 36, rings: [0.62] }),
    ...closedShell({ ...CREUSE, rx: 11, ry: 20, seed: 32, rot: -60, cx: 98, cy: 60, rings: [0.62] }),
    ...closedShell({ ...CREUSE, rx: 11, ry: 21, seed: 33, rot: 68, cx: 62, cy: 86, rings: [0.62] }),
  ],
  sylt: () => [...closedShell({ ...CREUSE, rx: 24, ry: 44, seed: 34, rot: -70, cy: 50, rings: [0.8, 0.6, 0.4] }), ...waves(98, { rows: 2, amp: 1.8 })],
  zeeland: () => closedShell({ ...PLATE, rx: 42, ry: 40, irregular: 0.05, seed: 35, rot: -12, rings: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3] }),
  galway: () => openShell({ ...PLATE, rx: 41, ry: 41, seed: 36, rot: 14, meat: 0.6, meatShift: 6 }),
  colchester: () => closedShell({ ...PLATE, rx: 41, ry: 38, irregular: 0.06, seed: 37, rot: -22 }),
  limfjord: () => closedShell({ ...PLATE, rx: 40, ry: 42, irregular: 0.1, ruffle: 0.025, ruffleK: 16, seed: 38, rot: 26, rings: [0.84, 0.66, 0.48, 0.3] }),
  bluepoint: () => openShell({ rx: 27, ry: 47, pinch: 0.4, irregular: 0.05, ruffle: 0.01, ruffleK: 9, seed: 39, rot: 64, meat: 0.66 }),
  kusshi: () => closedShell({ rx: 27, ry: 32, pinch: 0.26, irregular: 0.03, ruffle: 0.006, ruffleK: 10, seed: 50, rot: 18, rings: [0.8, 0.6, 0.4] }),
  bluff: () => [...closedShell({ ...PLATE, rx: 36, ry: 35, seed: 51, rot: 4, cy: 50 }), ...waves(100, { rows: 1, x0: 36, x1: 124 })],
};

/** Begrenzungsrahmen eines Pfads (Stütz- und Kontrollpunkte, genügt hier). */
function bbox(d) {
  const tokens = d.match(/[MLCHVZ]|-?\d*\.?\d+/g);
  let cmd = 'M';
  let x = 0;
  let y = 0;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  const add = (px, py) => {
    x0 = Math.min(x0, px);
    y0 = Math.min(y0, py);
    x1 = Math.max(x1, px);
    y1 = Math.max(y1, py);
  };
  for (let i = 0; i < tokens.length; ) {
    if (/[MLCHVZ]/.test(tokens[i])) cmd = tokens[i++];
    if (cmd === 'Z') continue;
    if (cmd === 'H') x = +tokens[i++];
    else if (cmd === 'V') y = +tokens[i++];
    else {
      x = +tokens[i++];
      y = +tokens[i++];
    }
    add(x, y);
  }
  return [x0, y0, x1, y1];
}

let cache;
/** Alle Zeichnungen: Schlüssel, Seitenverhältnis und <symbol> fürs Sprite. */
export function oysterArt() {
  if (cache) return cache;
  cache = Object.entries(DRAWINGS).map(([key, draw]) => {
    const d = draw().join('');
    const [x0, y0, x1, y1] = bbox(d);
    const pad = 3;
    const vb = [x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad].map(r1);
    return {
      key,
      width: vb[2],
      height: vb[3],
      symbol: `<symbol id="oy-${key}" viewBox="${vb.join(' ')}"><path fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" d="${d}"/></symbol>`,
    };
  });
  return cache;
}

export const oysterSymbols = () => oysterArt().map((a) => a.symbol);
export const OYSTER_ART = Object.keys(DRAWINGS);
