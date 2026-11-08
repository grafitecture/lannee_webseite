/**
 * Farblook für alle Fotos (Vorgabe 08.11.2026)
 * --------------------------------------------------------------
 * Alle Fotos bekommen denselben ruhigen Look „wie von einem Fotografen“
 * in der Farbharmonie der Grün-Skala 400–900 (OKLCH-Farbton ≈ 127°):
 *
 *  1. Ausgleich: Weißabgleich (teilweise Grauwelt), Tonwerte auf 0,3 %–99,7 % gespreizt
 *  2. Tonkurve: sanfte S-Kurve, Schwarz leicht angehoben (matt), Lichter weich abgerundet
 *  3. Farbe (in OKLab): Farbtöne nahe der Skala bleiben, entfernte (Blau, Rot, Magenta)
 *     verlieren den Großteil ihrer Sättigung; Gelb und Grün rücken zur Skala
 *  4. Split-Toning: Schatten und Mitten bekommen den Ton von 900/800, Lichter einen Hauch 400
 *  5. Vignette und feines Korn
 *
 * Läuft auf rohen RGB-Pixeln (Uint8, 3 Kanäle) und ist deterministisch
 * (Korn mit festem Startwert), damit `npm run images` immer dasselbe Ergebnis liefert.
 * Die Originale in /assets-src bleiben unverändert.
 */

/** Farbton der Skala in OKLCH (400–900 liegen alle bei 125–128°). */
const HUE = (127 * Math.PI) / 180;
const TINT_A = Math.cos(HUE);
const TINT_B = Math.sin(HUE);

/** Stellschrauben des Looks – hier anpassen, dann `npm run images`. */
export const LOOK = {
  wb: 0.6, // Anteil des Weißabgleichs (0 = aus, 1 = volle Grauwelt)
  clip: [0.003, 0.997], // Tonwertspreizung (Perzentile)
  contrast: 0.32, // S-Kurve (0 = linear)
  black: 0.045, // angehobenes Schwarz (OKLab-L)
  white: 0.975, // Lichter weich bis hierhin
  // Stärker seit 08.11.2026 („wirklich alle Bilder im Bildstil der Farbskala“): Rot, Rosa, Blau fast ganz neutral
  keep: [-70, 40], // Farbtonfenster um die Skala (Grad), das gesättigt bleibt (−70 schont Hauttöne und Holz)
  fade: 30, // Übergang (Grad) vom Fenster zur Restsättigung
  far: 0.06, // Restsättigung für Farbtöne weit weg von der Skala
  pull: 0.4, // wie stark Gelb/Grün im Fenster zur Skala rücken
  chroma: 0.92, // Gesamtsättigung
  tintShadow: 0.055, // Tönung Schatten (OKLab-Chroma)
  tintMid: 0.04, // Tönung Mitten
  tintHigh: 0.018, // Tönung Lichter
  hk: 0.6, // Helligkeitsausgleich für entsättigte Farben (Helmholtz-Kohlrausch)
  vignette: 0.1,
  grain: 0.007,
};

const s2l = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const l2s = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const LUT_S2L = Float32Array.from({ length: 256 }, (_, i) => s2l(i / 255));

function toOklab(r, g, b) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function toLinear(L, a, b) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const smooth = (x) => x * x * (3 - 2 * x);
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** Kleiner deterministischer Zufall (Mulberry32) + Box-Muller für das Korn. */
function rng(seed) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Wendet den Look an. `data` = rohe RGB-Pixel (3 Kanäle, Uint8), wird nicht verändert.
 * Gibt einen neuen Uint8-Buffer gleicher Größe zurück.
 */
export function applyLook(data, width, height, opts = {}) {
  const o = { ...LOOK, ...opts };
  const n = width * height;

  // 1. Weißabgleich (Grauwelt, nur mittlere Helligkeiten) und Tonwertspreizung auf L
  let sr = 0, sg = 0, sb = 0, cnt = 0;
  const hist = new Uint32Array(1024);
  for (let i = 0; i < n; i++) {
    const r = LUT_S2L[data[i * 3]], g = LUT_S2L[data[i * 3 + 1]], b = LUT_S2L[data[i * 3 + 2]];
    const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (y > 0.02 && y < 0.8) { sr += r; sg += g; sb += b; cnt++; }
  }
  const avg = cnt ? (sr + sg + sb) / (3 * cnt) : 1;
  const gain = cnt
    ? [sr, sg, sb].map((s) => 1 + o.wb * (avg / (s / cnt) - 1))
    : [1, 1, 1];
  // begrenzen, damit bewusst farbige Motive (Abendlicht) nicht kippen
  for (let k = 0; k < 3; k++) gain[k] = Math.min(1.35, Math.max(0.75, gain[k]));

  const lab = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = LUT_S2L[data[i * 3]], g = LUT_S2L[data[i * 3 + 1]], bl = LUT_S2L[data[i * 3 + 2]];
    // Helligkeit aus dem Original, Farbe aus dem abgeglichenen Bild (der Abgleich soll nichts abdunkeln)
    const [L] = toOklab(r, g, bl);
    const [, a, b] = toOklab(r * gain[0], g * gain[1], bl * gain[2]);
    lab[i * 3] = L; lab[i * 3 + 1] = a; lab[i * 3 + 2] = b;
    hist[Math.min(1023, Math.max(0, Math.round(L * 1023)))]++;
  }
  const pct = (p) => {
    const target = p * n;
    let acc = 0;
    for (let k = 0; k < 1024; k++) { acc += hist[k]; if (acc >= target) return k / 1023; }
    return 1;
  };
  const lo = pct(o.clip[0]);
  const hi = Math.max(lo + 0.2, pct(o.clip[1]));
  // Die Mitte (Median) behält ihre Helligkeit: Gamma so wählen, dass Spreizung und S-Kurve
  // sie nicht verschieben – sonst saufen dunkle Motive (Bulles) ab.
  const curve = (t) => {
    t = t + o.contrast * (smooth(t) - t);
    if (t > 0.8) t = 0.8 + 0.2 * (1 - (1 - (t - 0.8) / 0.2) ** 2) * 0.95;
    return o.black + (o.white - o.black) * t;
  };
  const med = pct(0.5);
  const tMed = clamp01((med - lo) / (hi - lo));
  let a0 = 0, a1 = 1;
  for (let k = 0; k < 30; k++) { const m = (a0 + a1) / 2; if (curve(m) < med) a0 = m; else a1 = m; }
  const gamma = tMed > 0.02 && tMed < 0.98 ? Math.min(1.4, Math.max(0.6, Math.log(a0) / Math.log(tMed))) : 1;

  const out = Buffer.alloc(n * 3);
  const rand = rng(width * 73856093 ^ height * 19349663);
  const cx = width / 2, cy = height / 2, rmax = Math.hypot(cx, cy);
  const [k0, k1] = o.keep;

  for (let y = 0, i = 0; y < height; y++) {
    for (let x = 0; x < width; x++, i++) {
      let L = lab[i * 3], a = lab[i * 3 + 1], b = lab[i * 3 + 2];

      // 2. Tonkurve
      // (Schulter ab 0,8: Lichter weich abrunden)
      let Lo = curve(clamp01((L - lo) / (hi - lo)) ** gamma);

      // 3. Farbe: Sättigung je nach Abstand des Farbtons zur Skala
      let C = Math.hypot(a, b);
      let h = Math.atan2(b, a);
      let d = ((h - HUE) * 180) / Math.PI;
      d = ((d + 540) % 360) - 180; // −180 … 180
      let w;
      // Gelb und Grün rücken zur Skala, Hauttöne und Holz (weit weg) fast gar nicht
      h -= (o.pull * d * Math.max(0, 1 - Math.abs(d) / 80) * Math.PI) / 180;
      if (d >= k0 && d <= k1) {
        w = 1;
      } else {
        const dist = d < k0 ? k0 - d : d - k1; // Grad außerhalb des Fensters
        w = o.far + (1 - o.far) * Math.max(0, 1 - dist / o.fade);
      }
      // Helligkeit der Pixel folgt der Kurve – Sättigung mitziehen
      const C0 = C;
      C *= w * o.chroma * (L > 0.001 ? Math.min(1.4, Lo / L) ** 0.5 : 1);
      // Was an Farbe wegfällt (v. a. tiefes Blau), wirkt dunkler – etwas Helligkeit zurückgeben
      Lo += o.hk * Math.max(0, C0 - C);
      a = C * Math.cos(h);
      b = C * Math.sin(h);

      // 4. Split-Toning in Richtung der Skala
      const tint = Lo < 0.5
        ? o.tintShadow + (o.tintMid - o.tintShadow) * (Lo / 0.5)
        : o.tintMid + (o.tintHigh - o.tintMid) * ((Lo - 0.5) / 0.5);
      a += tint * TINT_A;
      b += tint * TINT_B;

      // 5. Vignette und Korn
      const r = Math.hypot(x - cx, y - cy) / rmax;
      Lo *= 1 - o.vignette * r ** 2.4;
      if (o.grain) {
        const u1 = rand() || 1e-9, u2 = rand();
        Lo += o.grain * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      }

      // zurück nach sRGB; außerhalb des Farbraums Sättigung reduzieren statt abschneiden
      let rgb = toLinear(Lo, a, b);
      for (let k = 0; k < 4 && (Math.min(...rgb) < -0.002 || Math.max(...rgb) > 1.002); k++) {
        a *= 0.8; b *= 0.8;
        rgb = toLinear(Lo, a, b);
      }
      out[i * 3] = Math.round(clamp01(l2s(clamp01(rgb[0]))) * 255);
      out[i * 3 + 1] = Math.round(clamp01(l2s(clamp01(rgb[1]))) * 255);
      out[i * 3 + 2] = Math.round(clamp01(l2s(clamp01(rgb[2]))) * 255);
    }
  }
  return out;
}
