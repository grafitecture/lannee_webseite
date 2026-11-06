/**
 * Austernatlas: feine Strichzeichnungen wie ein Kupferstich, prozedural erzeugt (ohne Abhängigkeiten).
 * ---------------------------------------------------------------------------
 * Jede Zeichnung ist deterministisch (fester Seed) und landet als <symbol> im eigenen
 * Atlas-Sprite. Farbe per CSS (currentColor), Strichstärken in Bildschirm-Pixeln
 * (vector-effect: non-scaling-stroke), Zeichenfläche 160 × 120.
 *
 * Seit 06.11.2026 wieder im Einsatz – nur im Austernatlas (sonst keine Zeichnungen auf der
 * Website). Am selben Tag „viel feiner und schöner“ neu gezeichnet:
 * - Strichhierarchie: kräftiger Umriss, feine Innenlinien, sehr feine Schraffur
 * - geschichteter, gekräuselter Schalenrand (Lamellen), viele zarte Wachstumslinien mit Lücken
 * - feine Rillen vom Schloss zum Rand (gerippte Felsenaustern)
 * - Schattenschraffur auf der lichtabgewandten Seite (Licht von oben links), mathematisch
 *   auf die Schale beschnitten (kein clipPath, damit das externe Sprite überall funktioniert)
 * - geöffnete Schale: Perlmuttrand, gekräuselter Mantelsaum, Kiemen, Schließmuskel
 */

const TAU = Math.PI * 2;
const W = 160;
const H = 120;

/* Strichstärken in px (Bildschirm) und Deckkraft */
const STROKE = {
  edge: { w: 1.05, o: 1 }, // Umriss
  line: { w: 0.7, o: 0.95 }, // Innenlinien: Rand-Lamellen, Fleisch, Requisiten
  fine: { w: 0.55, o: 0.8 }, // Wachstumslinien, Rillen, Kiemen
  hatch: { w: 0.5, o: 0.55 }, // Schraffur
};

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

const seg = ([a, b]) => `M${r1(a[0])} ${r1(a[1])}L${r1(b[0])} ${r1(b[1])}`;

const angleDiff = (a, b) => {
  let d = (a - b) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};

/** Lokale Koordinaten (Schloss oben) → Zeichenfläche. */
const placer = ({ cx = W / 2, cy = H / 2, rot = 0 }) => {
  const c = Math.cos((rot * Math.PI) / 180);
  const s = Math.sin((rot * Math.PI) / 180);
  return (pts) => pts.map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c]);
};

const centroid = (pts) => [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Teile der Strecke a→b, die im Polygon liegen (gerade/ungerade). a und b liegen außerhalb. */
function clipToPolygon(a, b, poly) {
  const ts = [];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    const ex = q[0] - p[0];
    const ey = q[1] - p[1];
    const den = dx * ey - dy * ex;
    if (Math.abs(den) < 1e-9) continue;
    const t = ((p[0] - a[0]) * ey - (p[1] - a[1]) * ex) / den;
    const u = ((p[0] - a[0]) * dy - (p[1] - a[1]) * dx) / den;
    if (t >= 0 && t <= 1 && u >= 0 && u < 1) ts.push(t);
  }
  ts.sort((x, y) => x - y);
  const out = [];
  for (let i = 0; i + 1 < ts.length; i += 2) out.push([ts[i], ts[i + 1]]);
  return out;
}

/**
 * Schraffur: parallele Linien im Winkel `angle`, beschnitten auf das Polygon und auf die
 * Schattenseite (Licht von oben links). `from` = ab welchem Schattenwert (−1 … 1) gezeichnet wird.
 */
function hatch(poly, { angle = 38, gap = 2.3, from = 0.15, jitter = 0.12, seed = 1, inset = 0.9 } = {}) {
  const rnd = rng(seed * 7 + 3);
  const [cx, cy] = centroid(poly);
  const R = poly.reduce((m, p) => Math.max(m, Math.hypot(p[0] - cx, p[1] - cy)), 0);
  // etwas nach innen gezogen, damit die Schraffur nicht auf dem Umriss liegt
  const inner = poly.map(([x, y]) => [cx + (x - cx) * inset, cy + (y - cy) * inset]);
  const light = [-0.62, -0.78]; // Licht von oben links
  const shade = ([x, y]) => -((x - cx) * light[0] + (y - cy) * light[1]) / R; // −1 hell … 1 dunkel
  const a = (angle * Math.PI) / 180;
  const dir = [Math.cos(a), Math.sin(a)];
  const nrm = [-dir[1], dir[0]];
  const out = [];
  for (let k = -R; k <= R; k += gap) {
    const o = [cx + nrm[0] * k, cy + nrm[1] * k];
    const p0 = [o[0] - dir[0] * R * 1.6, o[1] - dir[1] * R * 1.6];
    const p1 = [o[0] + dir[0] * R * 1.6, o[1] + dir[1] * R * 1.6];
    for (const [t0, t1] of clipToPolygon(p0, p1, inner)) {
      // Schattenwert ist entlang der Linie linear: Grenze analytisch
      const A = lerp(p0, p1, t0);
      const B = lerp(p0, p1, t1);
      const sA = shade(A);
      const sB = shade(B);
      const th = from + (rnd() - 0.5) * jitter;
      if (sA < th && sB < th) continue;
      let u0 = 0;
      let u1 = 1;
      if (sA < th) u0 = (th - sA) / (sB - sA);
      if (sB < th) u1 = (th - sA) / (sB - sA);
      if (u1 - u0 < 0.04) continue;
      out.push(seg([lerp(A, B, u0), lerp(A, B, u1)]));
    }
  }
  return out;
}

/**
 * Schattierung wie gestochen: kurze, feine Striche vom Rand nach innen (zur Mitte hin),
 * nur auf der lichtabgewandten Seite und umso länger, je dunkler. Folgt der Form,
 * kreuzt also die Ringe nicht wie eine gerade Schraffur.
 */
function edgeShade(poly, { from = 0.05, len = 0.22, every = 2, seed = 1, scale = 1 } = {}) {
  const rnd = rng(seed * 31 + 9);
  const [cx, cy] = centroid(poly);
  const R = poly.reduce((m, p) => Math.max(m, Math.hypot(p[0] - cx, p[1] - cy)), 0);
  const light = [-0.62, -0.78];
  const out = [];
  for (let i = 0; i < poly.length; i += every) {
    const [x, y] = poly[i];
    const sh = -((x - cx) * light[0] + (y - cy) * light[1]) / Math.hypot(x - cx, y - cy);
    if (sh < from) continue;
    const k = ((sh - from) / (1 - from)) ** 0.8;
    const l = len * k * (0.7 + rnd() * 0.6);
    if (l < 0.02) continue;
    const a = 0.985 * scale;
    const b = Math.max(0.2, a - l);
    out.push(seg([[cx + (x - cx) * a, cy + (y - cy) * a], [cx + (x - cx) * b, cy + (y - cy) * b]]));
  }
  return out;
}

/**
 * Anschwellender Umriss: auf der Schattenseite eine zweite Linie knapp innerhalb des Umrisses,
 * damit der Strich dort kräftiger wirkt (wie mit der Feder gezogen).
 */
function swell(poly, { from = 0.25, scale = 0.986 } = {}) {
  const [cx, cy] = centroid(poly);
  const light = [-0.62, -0.78];
  const n = poly.length;
  const dark = poly.map(([x, y]) => -((x - cx) * light[0] + (y - cy) * light[1]) / Math.hypot(x - cx, y - cy) > from);
  // zusammenhängende Läufe (ringförmig), beginnend an einem hellen Punkt
  const start = dark.findIndex((d) => !d);
  if (start < 0) return [];
  const runs = [];
  let run = [];
  for (let k = 0; k <= n; k++) {
    const i = (start + k) % n;
    if (dark[i]) run.push([cx + (poly[i][0] - cx) * scale, cy + (poly[i][1] - cy) * scale]);
    else if (run.length) {
      if (run.length > 3) runs.push(run);
      run = [];
    }
  }
  return runs.map((r) => smooth(r, false));
}

/* ------------------------------------------------------------------ */
/* Schalen                                                             */
/* ------------------------------------------------------------------ */

/**
 * Umriss einer Austernschale als Tropfen, Schloss (Wirbel) oben, pts[0] = Schloss.
 * rx/ry: Halbachsen · pinch: wie stark sich die Schale zum Schloss verjüngt · beak: Schnabel
 * zur Seite gebogen · irregular: Unregelmäßigkeit · ruffle/ruffleK: Wellung des Rands ·
 * wing: kleine „Ohren“ flacher Austern
 */
function outline({ rx, ry, pinch = 0.35, irregular = 0.07, ruffle = 0.025, ruffleK = 13, wing = 0, beak = 0.12, seed = 1, n = 96 }) {
  const rnd = rng(seed);
  const harmonics = [2, 3, 4, 5].map((k) => ({ k, a: ((rnd() - 0.5) * 2 * irregular) / Math.sqrt(k), p: rnd() * TAU }));
  const phase = [rnd() * TAU, rnd() * TAU, rnd() * TAU];
  const taper = Math.min(0.66, pinch * 1.2); // Verjüngung zum Schloss
  const bend = (rnd() < 0.5 ? -1 : 1) * beak;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * TAU; // 0 = Schloss (oben), π = Lippe (unten)
    const top = ((1 + Math.cos(t)) / 2) ** 2; // 1 am Schloss, 0 an der Lippe
    const lip = 1 - top;
    let x = Math.sin(t) * (1 - taper * top);
    let y = -Math.cos(t);
    let r = 1;
    for (const h of harmonics) r += h.a * Math.sin(h.k * t + h.p) * (0.4 + 0.6 * lip);
    r +=
      lip *
      (ruffle * Math.sin(ruffleK * t + phase[0]) +
        ruffle * 0.55 * Math.sin(ruffleK * 1.73 * t + phase[1]) +
        ruffle * 0.3 * Math.sin(ruffleK * 3.1 * t + phase[2]));
    if (wing) r += wing * (Math.exp(-(angleDiff(t, -0.62) ** 2) / 0.02) + Math.exp(-(angleDiff(t, 0.62) ** 2) / 0.02));
    x = x * r + bend * top ** 1.5;
    y = y * r;
    pts.push([x * rx, y * ry]);
  }
  return pts;
}

/** Wachstumszentrum: knapp unterhalb des Schlosses (die Ringe laufen nicht alle in einem Punkt zusammen). */
const growthCenter = (pts) => lerp(pts[0], centroid(pts), 0.32);

/** Punkt i des Umrisses zum Zentrum hin skaliert (s = 1: Rand, s = 0: Zentrum). */
const toward = (pts, i, s, hinge) => [hinge[0] + (pts[i][0] - hinge[0]) * s, hinge[1] + (pts[i][1] - hinge[1]) * s];

/**
 * Wachstumslinien (Lamellen): viele zarte, leicht gewellte Linien parallel zum Rand,
 * nach außen dichter, mit eigener Kräuselung und zufälligen Lücken wie gestochen.
 */
function growthLines(pts, { rings = 7, inner = 0.3, outer = 0.84, wobble = 0.01, frill = 0.012, from = 0.1, to = 0.9, seed = 1 } = {}) {
  const rnd = rng(seed * 13 + 5);
  const n = pts.length;
  const hinge = growthCenter(pts);
  const lines = [];
  for (let j = 0; j < rings; j++) {
    const u = rings === 1 ? 1 : j / (rings - 1);
    const s = inner + (outer - inner) * Math.sqrt(u); // nach außen dichter
    const a0 = from + rnd() * 0.05 + (1 - u) * 0.14;
    const a1 = to - rnd() * 0.05 - (1 - u) * 0.14;
    // in 1–3 Stücke mit kleinen Lücken teilen
    const cuts = [a0];
    const pieces = 1 + Math.floor(rnd() * 3);
    for (let c = 1; c < pieces; c++) cuts.push(a0 + ((a1 - a0) * c) / pieces + (rnd() - 0.5) * 0.04);
    cuts.push(a1);
    const ph = rnd() * TAU;
    const k = 18 + Math.floor(rnd() * 14);
    for (let c = 0; c + 1 < cuts.length; c++) {
      const gapA = c === 0 ? 0 : 0.012;
      const i0 = Math.round(n * (cuts[c] + gapA));
      const i1 = Math.round(n * cuts[c + 1]);
      const line = [];
      for (let i = i0; i <= i1; i += 3) {
        const w = s + wobble * Math.sin(i * 0.29 + j * 1.7) + frill * u * u * Math.sin((i / n) * TAU * k + ph);
        line.push(toward(pts, i % n, w, hinge));
      }
      if (line.length > 2) lines.push(line);
    }
  }
  return lines;
}

/** Geschichteter Rand: 2–3 gekräuselte Linien knapp innerhalb der Lippe. */
function lipLayers(pts, { layers = [0.955, 0.915, 0.875], frill = 0.02, k = 34, from = 0.14, to = 0.86, seed = 1 } = {}) {
  const rnd = rng(seed * 17 + 11);
  const n = pts.length;
  const hinge = growthCenter(pts);
  return layers.map((s, j) => {
    const ph = rnd() * TAU;
    const kk = k + j * 7;
    const i0 = Math.round(n * (from + j * 0.03 + rnd() * 0.03));
    const i1 = Math.round(n * (to - j * 0.03 - rnd() * 0.03));
    const line = [];
    for (let i = i0; i <= i1; i += 2) {
      const t = (i / n) * TAU;
      const lip = Math.sin(t / 2) ** 2;
      line.push(toward(pts, i, s + frill * lip * Math.sin(kk * t + ph), hinge));
    }
    return line;
  });
}

/**
 * Rippen gerippter Felsenaustern: kurze, feine Striche von innen zum Rand, genau auf den
 * Wellenbergen des Randes (dort, wo der Umriss am weitesten außen liegt).
 */
function striations(pts, count, { from = 0.6, to = 0.95, seed = 1 } = {}) {
  const rnd = rng(seed * 29 + 7);
  const n = pts.length;
  const [cx, cy] = centroid(pts);
  const rad = pts.map(([x, y]) => Math.hypot(x - cx, y - cy));
  const crests = [];
  for (let i = Math.round(n * 0.12); i < Math.round(n * 0.88); i++) {
    if (rad[i] > rad[(i - 1 + n) % n] && rad[i] >= rad[(i + 1) % n]) crests.push(i);
  }
  // gleichmäßig auf `count` Rippen ausdünnen
  const pick = crests.length > count ? Array.from({ length: count }, (_, k) => crests[Math.round((k * (crests.length - 1)) / Math.max(1, count - 1))]) : crests;
  const out = [];
  for (const i of pick) {
    const a = from + rnd() * 0.12;
    const b = to - rnd() * 0.05;
    const line = [];
    for (let m = 0; m <= 3; m++) {
      const u = a + ((b - a) * m) / 3;
      line.push([cx + (pts[i][0] - cx) * u, cy + (pts[i][1] - cy) * u]);
    }
    out.push(line);
  }
  return out;
}

/** Geschlossene Schale von oben: Umriss, Lamellen, Wachstumslinien, Rillen, Schraffur. */
function closedShell(o) {
  const pts = outline(o);
  const P = placer(o);
  const out = { edge: [], line: [], fine: [], hatch: [] };
  out.edge.push(smooth(P(pts)));
  if (o.shade !== false) out.line.push(...swell(P(pts)));
  for (const l of lipLayers(pts, { seed: o.seed, frill: o.lipFrill ?? 0.02, layers: o.layers ?? [0.955, 0.915, 0.875] })) out.line.push(smooth(P(l), false));
  for (const l of growthLines(pts, { seed: o.seed, rings: o.rings ?? 9, inner: o.inner ?? 0.22, outer: o.outer ?? 0.84, frill: o.frill ?? 0.012 }))
    out.fine.push(smooth(P(l), false));
  if (o.ribs) for (const l of striations(pts, o.ribs, { seed: o.seed })) out.fine.push(smooth(P(l), false));
  if (o.shade !== false) out.hatch.push(...edgeShade(P(pts), { seed: o.seed, from: o.shadeFrom ?? 0.05, len: o.shadeLen ?? 0.2 }));
  return out;
}

/** Geöffnete Schale (auf Eis serviert): Rand, Perlmuttkante, Fleisch mit Mantelsaum, Kiemen, Muskel. */
function openShell(o) {
  const pts = outline(o);
  const P = placer(o);
  const n = pts.length;
  const [cx, cy] = centroid(pts);
  const out = { edge: [], line: [], fine: [], hatch: [] };
  out.edge.push(smooth(P(pts)));
  out.line.push(...swell(P(pts)));
  // äußere Lamellen am Rand (nur zur Lippe hin)
  for (const l of lipLayers(pts, { seed: o.seed, layers: [0.965, 0.935], frill: 0.014 })) out.fine.push(smooth(P(l), false));
  // Perlmuttkante: geschlossene Linie innen
  const rim = pts.map(([x, y]) => [cx + (x - cx) * 0.86, cy + (y - cy) * 0.86 + 0.6]);
  out.line.push(smooth(P(rim)));
  // Fleisch: zur Lippe hin gekräuselt (Mantelsaum), zum Schloss hin glatt
  const m = o.meat ?? 0.66;
  const k = o.frillK ?? 26;
  const meatAt = (scale, amp, kk, ph = 0) =>
    pts.map(([x, y], i) => {
      const t = (i / n) * TAU;
      const lip = Math.sin(t / 2) ** 2; // 0 am Schloss, 1 an der Lippe
      const w = 1 + 0.035 * Math.sin(3 * t + (o.seed % 5)) + amp * lip * Math.sin(kk * t + ph);
      return [cx + (x - cx) * scale * w, cy + (o.meatShift ?? 2) + (y - cy) * scale * w];
    });
  out.line.push(smooth(P(meatAt(m, 0.032, k))));
  // zweite und dritte Kräusellinie des Mantelsaums
  const frill2 = meatAt(m * 0.93, 0.026, k + 4, 0.8);
  const frill3 = meatAt(m * 0.86, 0.018, k + 9, 1.9);
  out.fine.push(smooth(P(frill2.slice(Math.round(n * 0.16), Math.round(n * 0.84))), false));
  out.fine.push(smooth(P(frill3.slice(Math.round(n * 0.24), Math.round(n * 0.76))), false));
  // Kiemen: feine, parallele Bögen in der Mitte
  for (const [s, kk] of [
    [0.6, 30],
    [0.52, 34],
    [0.44, 38],
  ].slice(0, o.gills ? 3 : 2)) {
    const g = pts.map(([x, y], i) => {
      const t = (i / n) * TAU;
      const w = s * m + 0.012 * Math.sin(kk * t);
      return [cx + (x - cx) * w, cy + 3 + (y - cy) * w];
    });
    out.fine.push(smooth(P(g.slice(Math.round(n * 0.26), Math.round(n * 0.74))), false));
  }
  // Schließmuskel: kleine Ellipse seitlich, mit feiner Schraffur
  const mu = [cx + (o.muscleX ?? 0.32) * (o.rx ?? 30) * m, cy + (o.muscleY ?? 0.18) * (o.ry ?? 40) * m];
  const muscle = Array.from({ length: 18 }, (_, i) => {
    const t = (i / 18) * TAU;
    return [mu[0] + Math.cos(t) * (o.rx ?? 30) * 0.13, mu[1] + Math.sin(t) * (o.ry ?? 40) * 0.09];
  });
  out.fine.push(smooth(P(muscle)));
  out.hatch.push(...hatch(P(muscle), { seed: o.seed + 3, from: -1, gap: 1.5, angle: -40, inset: 0.95 }));
  // Schatten in der Schale: kurze Striche innen am Perlmuttrand (Lichtseite bleibt frei)
  // und außen am Rand der Schale
  out.hatch.push(...edgeShade(P(rim), { seed: o.seed, from: 0.1, len: 0.12 }));
  out.hatch.push(...edgeShade(P(pts), { seed: o.seed + 1, from: 0.35, len: 0.07, every: 3 }));
  return out;
}

function ellipsePath([x, y], rx, ry, rot = 0, n = 24) {
  const c = Math.cos((rot * Math.PI) / 180);
  const s = Math.sin((rot * Math.PI) / 180);
  const pts = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * TAU;
    const ex = Math.cos(t) * rx;
    const ey = Math.sin(t) * ry;
    return [x + ex * c - ey * s, y + ex * s + ey * c];
  });
  return { pts, d: smooth(pts) };
}

/* ------------------------------------------------------------------ */
/* Requisiten                                                          */
/* ------------------------------------------------------------------ */

const merge = (...parts) => {
  const out = { edge: [], line: [], fine: [], hatch: [] };
  for (const p of parts) for (const k of Object.keys(out)) if (p[k]) out[k].push(...p[k]);
  return out;
};

/** Wellenlinien (Gezeiten, Wattenmeer): feine Doppelreihen, nach außen ausdünnend. */
function waves(y, { x0 = 22, x1 = 138, amp = 2, len = 14, rows = 3, gap = 4.5 } = {}) {
  const out = { line: [], fine: [] };
  for (let r = 0; r < rows; r++) {
    const pts = [];
    const shift = r * len * 0.5;
    const inset = r * 10;
    for (let x = x0 + inset; x <= x1 - inset; x += 2) pts.push([x, y + r * gap + Math.sin(((x + shift) / len) * TAU) * amp * (1 - r * 0.2)]);
    (r === 0 ? out.line : out.fine).push(smooth(pts, false));
  }
  return out;
}

/** Münze als Größenvergleich: doppelter Rand mit Riffelung, Ziffer 1. */
function coin(cx, cy, r) {
  const ticks = [];
  for (let i = 0; i < 64; i++) {
    const t = (i / 64) * TAU;
    ticks.push(seg([[cx + Math.cos(t) * r * 0.93, cy + Math.sin(t) * r * 0.93], [cx + Math.cos(t) * r, cy + Math.sin(t) * r]]));
  }
  return {
    edge: [ellipsePath([cx, cy], r, r, 0, 32).d],
    line: [ellipsePath([cx, cy], r * 0.8, r * 0.8, 0, 32).d, `M${r1(cx - r * 0.25)} ${r1(cy - r * 0.3)}L${r1(cx + 0.5)} ${r1(cy - r * 0.42)}L${r1(cx + 0.5)} ${r1(cy + r * 0.4)}`],
    hatch: ticks,
  };
}

/** Eingraviertes G (Gillardeau). */
function letterG(cx, cy, r) {
  const a0 = -0.75;
  const a1 = -TAU + 0.35;
  const pts = Array.from({ length: 24 }, (_, i) => {
    const t = a0 + ((a1 - a0) * i) / 23;
    return [cx + Math.cos(t) * r, cy + Math.sin(t) * r];
  });
  return { line: [smooth(pts, false), `M${r1(cx + r * 0.1)} ${r1(cy + r * 0.05)}H${r1(cx + r * 0.95)}V${r1(cy + Math.sin(0.35) * r)}`] };
}

/** Seil mit Austern (Étang de Thau): gedrehtes Seil an einer Stange. */
function rope() {
  const x = 80;
  const line = [`M${x - 3} 8C${x - 5} 40 ${x - 1} 80 ${x - 3} 114`, `M${x + 3} 8C${x + 1} 40 ${x + 5} 80 ${x + 3} 114`];
  const fine = [];
  for (let y = 10; y < 112; y += 4.5) {
    const wob = Math.sin(y / 9) * 0.8;
    fine.push(`M${r1(x - 3 + wob)} ${r1(y)}C${r1(x - 1 + wob)} ${r1(y + 0.4)} ${r1(x + 1 + wob)} ${r1(y + 2.6)} ${r1(x + 3 + wob)} ${r1(y + 3.2)}`);
  }
  return { edge: ['M40 7H120', 'M40 4.6H120'], line, fine };
}

/** Kieselalge (Blaue Navicula) als kleines Schiffchen mit feinen Querrippen. */
function diatom(cx, cy, len = 24, rot = -18) {
  const half = len / 2;
  const pts = [];
  for (let i = 0; i <= 24; i++) {
    const t = (i / 24) * Math.PI;
    pts.push([-Math.cos(t) * half, -Math.sin(t) * half * 0.24]);
  }
  for (let i = 0; i <= 24; i++) {
    const t = (i / 24) * Math.PI;
    pts.push([Math.cos(t) * half, Math.sin(t) * half * 0.24]);
  }
  const c = Math.cos((rot * Math.PI) / 180);
  const s = Math.sin((rot * Math.PI) / 180);
  const tr = ([x, y]) => [cx + x * c - y * s, cy + x * s + y * c];
  const fine = [];
  for (let k = -0.7; k <= 0.71; k += 0.14) {
    const xx = k * half;
    const hh = Math.sqrt(Math.max(0, 1 - k * k)) * half * 0.2;
    fine.push(seg([tr([xx, -hh]), tr([xx, hh])]));
  }
  const axis = [[-half * 0.8, 0], [half * 0.8, 0]].map(tr);
  return { line: [smooth(pts.map(tr)), seg(axis)], fine };
}

/* ------------------------------------------------------------------ */
/* Die Zeichnungen                                                     */
/* ------------------------------------------------------------------ */

// Grundformen
const CREUSE = { rx: 25, ry: 47, pinch: 0.42, irregular: 0.08, ruffle: 0.028, ruffleK: 13, ribs: 9, rings: 7 };
const PLATE = { rx: 43, ry: 41, pinch: 0.17, irregular: 0.04, ruffle: 0.01, ruffleK: 22, wing: 0.05, rings: 10, inner: 0.26, outer: 0.86, frill: 0.006, lipFrill: 0.012 };
const spat = (i, cx, cy, rot) => closedShell({ n: 48, rx: 5.5, ry: 7.5, pinch: 0.3, irregular: 0.08, ruffle: 0.03, seed: 40 + i, rot, cx, cy, rings: 2, inner: 0.4, outer: 0.7, layers: [0.85], shade: false });

const DRAWINGS = {
  creuse: () => closedShell({ ...CREUSE, ry: 45, seed: 11, rot: -28 }),
  plate: () => closedShell({ ...PLATE, seed: 12, rot: 8 }),
  portugaise: () => closedShell({ ...CREUSE, rx: 20, ry: 48, irregular: 0.12, ruffle: 0.035, ruffleK: 11, seed: 13, rot: 40, ribs: 12, rings: 7 }),
  virginica: () => closedShell({ rx: 23, ry: 46, pinch: 0.52, irregular: 0.06, ruffle: 0.008, ruffleK: 9, seed: 14, rot: -42, rings: 11, frill: 0.006, lipFrill: 0.01 }),
  kumamoto: () => closedShell({ rx: 27, ry: 31, pinch: 0.3, irregular: 0.06, ruffle: 0.04, ruffleK: 17, seed: 15, rot: -10, rings: 6, ribs: 12, lipFrill: 0.022 }),
  olympia: () =>
    merge(closedShell({ rx: 17, ry: 18, pinch: 0.22, irregular: 0.07, ruffle: 0.03, ruffleK: 14, seed: 16, rot: 12, cx: 60, cy: 60, rings: 6, hatchGap: 1.9 }), coin(104, 62, 17)),
  sydney: () => closedShell({ rx: 35, ry: 42, pinch: 0.34, irregular: 0.09, ruffle: 0.02, ruffleK: 10, seed: 17, rot: -16, rings: 8, ribs: 11 }),
  fine: () => openShell({ ...CREUSE, rx: 29, ry: 47, seed: 21, rot: -62 }),
  speciale: () => openShell({ ...CREUSE, rx: 31, ry: 47, seed: 22, rot: 60, meat: 0.72 }),
  pousse: () => openShell({ ...CREUSE, rx: 33, ry: 46, seed: 23, rot: -72, meat: 0.78, frillK: 30 }),
  verte: () => merge(openShell({ ...CREUSE, rx: 29, ry: 45, seed: 24, rot: -64, cx: 72, cy: 64, gills: true }), diatom(130, 24, 26)),
  gillardeau: () => merge(closedShell({ ...CREUSE, rx: 28, ry: 47, seed: 25, rot: -66, rings: 7, ribs: 10, shadeFrom: 0.3 }), letterG(78, 61, 8)),
  belon: () => openShell({ ...PLATE, rx: 42, ry: 41, seed: 26, rot: -6, meat: 0.64, meatShift: 5, frillK: 30 }),
  cancale: () =>
    merge(
      closedShell({ ...CREUSE, rx: 20, ry: 38, seed: 27, rot: -36, cx: 56, cy: 50, rings: 7, ribs: 11 }),
      closedShell({ ...PLATE, rx: 26, ry: 25, seed: 28, rot: 10, cx: 106, cy: 50, rings: 9 }),
      waves(100, { rows: 3, x0: 26, x1: 134 })
    ),
  arcachon: () =>
    merge(
      closedShell({ ...CREUSE, rx: 21, ry: 40, seed: 29, rot: -34, cx: 74, cy: 60, rings: 8, ribs: 12 }),
      ...[[30, 38, 20], [120, 36, -30], [128, 74, 40], [106, 98, -10], [38, 88, 30], [24, 62, -40], [52, 104, 10]].map(([cx, cy, rot], i) => spat(i, cx, cy, rot))
    ),
  thau: () =>
    merge(
      rope(),
      closedShell({ ...CREUSE, rx: 11, ry: 21, seed: 31, rot: 64, cx: 62, cy: 36, rings: 4, ribs: 7, layers: [0.92, 0.85], hatchGap: 1.8 }),
      closedShell({ ...CREUSE, rx: 11, ry: 20, seed: 32, rot: -60, cx: 98, cy: 60, rings: 4, ribs: 7, layers: [0.92, 0.85], hatchGap: 1.8 }),
      closedShell({ ...CREUSE, rx: 11, ry: 21, seed: 33, rot: 68, cx: 62, cy: 86, rings: 4, ribs: 7, layers: [0.92, 0.85], hatchGap: 1.8 })
    ),
  sylt: () => merge(closedShell({ ...CREUSE, rx: 24, ry: 44, seed: 34, rot: -70, cy: 50, rings: 8 }), waves(96, { rows: 3, amp: 1.7 })),
  zeeland: () => closedShell({ ...PLATE, rx: 42, ry: 40, irregular: 0.05, seed: 35, rot: -12, rings: 13, inner: 0.22, outer: 0.9 }),
  galway: () => openShell({ ...PLATE, rx: 41, ry: 41, seed: 36, rot: 14, meat: 0.62, meatShift: 6 }),
  colchester: () => closedShell({ ...PLATE, rx: 41, ry: 38, irregular: 0.06, seed: 37, rot: -22 }),
  limfjord: () => closedShell({ ...PLATE, rx: 40, ry: 42, irregular: 0.1, ruffle: 0.025, ruffleK: 16, seed: 38, rot: 26, rings: 11, lipFrill: 0.02 }),
  bluepoint: () => openShell({ rx: 27, ry: 47, pinch: 0.4, irregular: 0.05, ruffle: 0.01, ruffleK: 9, seed: 39, rot: 64, meat: 0.68 }),
  kusshi: () => closedShell({ rx: 27, ry: 32, pinch: 0.26, irregular: 0.03, ruffle: 0.006, ruffleK: 10, seed: 50, rot: 18, rings: 8, frill: 0.005, lipFrill: 0.008 }),
  bluff: () => merge(closedShell({ ...PLATE, rx: 36, ry: 35, seed: 51, rot: 4, cy: 50, rings: 11 }), waves(98, { rows: 2, x0: 36, x1: 124 })),
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

const pathEl = (d, { w, o }) =>
  `<path fill="none" stroke="currentColor" stroke-width="${w}"${o < 1 ? ` stroke-opacity="${o}"` : ''} stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" d="${d}"/>`;

let cache;
/** Alle Zeichnungen: Schlüssel, Seitenverhältnis und <symbol> fürs Sprite. */
export function oysterArt() {
  if (cache) return cache;
  cache = Object.entries(DRAWINGS).map(([key, draw]) => {
    const parts = draw();
    const all = Object.values(parts).flat().join('');
    const [x0, y0, x1, y1] = bbox(all);
    const pad = 3;
    const vb = [x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad].map(r1);
    // feinste Linien zuerst, Umriss zuletzt (liegt oben)
    const body = ['hatch', 'fine', 'line', 'edge']
      .filter((k) => parts[k] && parts[k].length)
      .map((k) => pathEl(parts[k].join(''), STROKE[k]))
      .join('');
    return { key, width: vb[2], height: vb[3], symbol: `<symbol id="oy-${key}" viewBox="${vb.join(' ')}">${body}</symbol>` };
  });
  return cache;
}

export const oysterSymbols = () => oysterArt().map((a) => a.symbol);
export const OYSTER_ART = Object.keys(DRAWINGS);
