/**
 * Design-Tokens – eine Quelle für CSS (wird beim Build zu :root-Variablen)
 * und für die Styleguide-Seite.
 */

/** Fluid-Bereich für clamp(): 360 px → 1920 px Viewport. */
export const FLUID = { minVw: 360, maxVw: 1920, root: 16 };

/*
 * Palette: Grün-Skala 400–900 (Vorgabe 08.11.2026, ersetzt die Blautöne vom 05.11.2026 und Homard).
 * Sechs Stufen eines Farbtons (OKLCH ≈ 127°, Gelbgrün bis Flaschengrün) plus Weiß – sonst keine Farben.
 * Regel: dunkle Stufe (900/800) mit weißer Schrift, helle Stufe (600–400) mit Schrift in 900,
 * auf Weiß Schrift in 900 (Nebentext 800). Nichts Schwarzes, nichts Graues: 900 ersetzt Schwarz.
 * Die drei Orte bleiben klar getrennt: Garage 900 (der Abend), Kiosque 800 (der Sonntag), Marché 600 (der Morgen).
 */
export const COLORS = [
  { token: 'g400', name: '400 · Citron vert', hex: '#C2FF33', oklch: 'oklch(92.6% 0.222 126)', role: 'Akzent: aktiv/hover, Markierungen, Hinweise; als Hauch die hellen Karten und Flächen', text: 'g900' },
  { token: 'g500', name: '500 · Chartreuse', hex: '#B2FF00', oklch: 'oklch(91.5% 0.241 128)', role: 'Lautestes Grün: nur das Angebot des Wochenendes', text: 'g900' },
  { token: 'g600', name: '600 · Pistache', hex: '#8FCC00', oklch: 'oklch(77.4% 0.203 128)', role: 'Marché, der Morgen (Fläche, Schrift darauf 900). Linien', text: 'g900' },
  { token: 'g700', name: '700 · Olive', hex: '#6B9900', oklch: 'oklch(62.6% 0.163 128)', role: 'Marché als Schrift (nur groß: Namen, Zitat)', text: 'g900' },
  { token: 'g800', name: '800 · Varech', hex: '#476600', oklch: 'oklch(46.8% 0.122 128)', role: 'Kiosque, der Sonntag. Nebentext auf Weiß, Zeichnungen im Austernatlas', text: 'blanc' },
  { token: 'g900', name: '900 · Bouteille', hex: '#243300', oklch: 'oklch(29.7% 0.075 126)', role: 'Dunkelste Stufe, ersetzt Schwarz: Text, Kopf- und Fußzeile. Garage, der Abend', text: 'blanc' },
  { token: 'blanc', name: 'Weiß', hex: '#FFFFFF', oklch: 'oklch(100% 0 0)', role: 'Flächen und Schrift auf 900/800', text: 'g900' },
];

/**
 * Rollen: welcher Ton wofür steht (werden zu CSS-Variablen, die auf die Palette zeigen).
 * Je Ort drei Rollen: Fläche (`--garage`), Schrift auf der Fläche (`--garage-on`) und
 * Schrift auf Weiß/hellen Flächen (`--garage-ink`), damit jede Kombination lesbar bleibt.
 */
export const ROLES = [
  { token: 'ink', ref: 'g900', role: 'Text, Buttons, Kopf- und Fußzeile' },
  { token: 'garage', ref: 'g900', role: 'Garage (Fläche, Punkt)' },
  { token: 'garage-on', ref: 'blanc', role: 'Schrift auf Garage' },
  { token: 'garage-ink', ref: 'g900', role: 'Garage als Schrift auf Weiß' },
  { token: 'kiosque', ref: 'g800', role: 'Kiosque (Fläche, Punkt)' },
  { token: 'kiosque-on', ref: 'blanc', role: 'Schrift auf Kiosque' },
  { token: 'kiosque-ink', ref: 'g800', role: 'Kiosque als Schrift auf Weiß' },
  { token: 'marche', ref: 'g600', role: 'Marché (Fläche, Punkt)' },
  { token: 'marche-on', ref: 'g900', role: 'Schrift auf Marché' },
  { token: 'marche-ink', ref: 'g700', role: 'Marché als Schrift auf Weiß (nur groß)' },
  { token: 'accent', ref: 'g400', role: 'Aktiv/hover, Markierungen, Hinweise; Basis für --tint' },
  { token: 'rule', ref: 'g600', role: 'Linien' },
  { token: 'brand', ref: 'g600', role: 'Linien, Balken' },
  { token: 'muted', ref: 'g800', role: 'Nebentext auf Weiß, Zeichnungen' },
  { token: 'offer', ref: 'g500', role: 'Angebot des Wochenendes (Fläche)' },
  { token: 'offer-on', ref: 'g900', role: 'Schrift auf dem Angebot' },
];

/** Hex-Wert einer Farbe oder Rolle (für Meta-Tags, Manifest, Share-Bilder). */
export const tokenHex = (token) => {
  const role = ROLES.find((r) => r.token === token);
  return COLORS.find((c) => c.token === (role ? role.ref : token))?.hex;
};

/**
 * Typo-Skala im Goldenen Schnitt (Desktop-Werte laut Vorgabe).
 * Mobil (360 px) wird mit dem Verhältnis 1,25 gerechnet, dazwischen fluid per clamp().
 */
export const TYPE_SCALE = [
  { token: 'h1', max: 17.942, min: 1.25 ** 6 },
  { token: 'h2', max: 11.089, min: 1.25 ** 5 },
  { token: 'h3', max: 6.854, min: 1.25 ** 4 },
  { token: 'h4', max: 4.236, min: 1.25 ** 3 },
  { token: 'h5', max: 2.618, min: 1.25 ** 2 },
  { token: 'h6', max: 1.618, min: 1.25 },
  { token: 'p', max: 1, min: 1 },
  { token: 'small', max: 0.618, min: 0.618, note: 'φ⁻¹ – als Text mit Mindestgröße 0.8125rem (13 px)' },
  { token: 'xs', max: 0.382, min: 0.382, note: 'φ⁻² – Abstands- und Detailwert' },
];

/** Abstände im Goldenen Schnitt. */
export const SPACE = [
  { token: '3xs', min: 0.382, max: 0.382 },
  { token: '2xs', min: 0.618, max: 0.618 },
  { token: 'xs', min: 1, max: 1 },
  { token: 's', min: 1, max: 1.618 },
  { token: 'm', min: 1.618, max: 2.618 },
  { token: 'l', min: 2.618, max: 4.236 },
  { token: 'xl', min: 2.618, max: 6.854 },
  { token: '2xl', min: 4.236, max: 11.089 },
  { token: '3xl', min: 6.854, max: 17.942 },
];

/** Breakpoints (min-width), abgeleitet aus StatCounter Deutschland, September 2026. */
export const BREAKPOINTS = [
  { name: 'xs', min: 0, devices: 'Smartphones hochkant (360–430 px)', data: '414×896, 384×832, 393×873, 390×844, 360×780, 412×915' },
  { name: 'sm', min: 480, devices: 'Große Phones quer, Foldables, kleine Tablets', data: '601×1007 (Tablet hochkant)' },
  { name: 'md', min: 768, devices: 'Tablets hochkant', data: '768×1024, 800×1280, 810×1080' },
  { name: 'lg', min: 1024, devices: 'Tablets quer, kleine Laptops', data: '1280×800, 1334×800, 1024×768' },
  { name: 'xl', min: 1280, devices: 'Laptops', data: '1280×720, 1366×768, 1440×900' },
  { name: '2xl', min: 1536, devices: 'Desktop (1920 bei 125 % Skalierung), 1600 px', data: '1536×864, 1600×900' },
  { name: '3xl', min: 1920, devices: 'Full HD – häufigste Desktop-Auflösung', data: '1920×1080 (34 % aller Desktops)' },
  { name: '4xl', min: 2560, devices: 'QHD, große Monitore', data: '2560×1440 (8 % aller Desktops)' },
];

export function clampRem(min, max, { minVw = FLUID.minVw, maxVw = FLUID.maxVw, root = FLUID.root } = {}) {
  if (min === max) return `${+max.toFixed(3)}rem`;
  const a = minVw / root;
  const b = maxVw / root;
  const slope = (max - min) / (b - a);
  const intercept = min - slope * a;
  return `clamp(${min.toFixed(3)}rem, ${intercept.toFixed(3)}rem + ${(slope * 100).toFixed(3)}vw, ${max.toFixed(3)}rem)`;
}

/** :root-Block für tokens.css */
export function tokensCss() {
  const lines = [];
  for (const c of COLORS) lines.push(`  --${c.token}: ${c.hex};`);
  for (const r of ROLES) lines.push(`  --${r.token}: var(--${r.ref});`);
  for (const t of TYPE_SCALE) lines.push(`  --fs-${t.token}: ${clampRem(t.min, t.max)};`);
  lines.push('  --fs-text-small: max(var(--fs-small), 0.8125rem);');
  for (const s of SPACE) lines.push(`  --space-${s.token}: ${clampRem(s.min, s.max)};`);
  lines.push(`  --gutter: ${clampRem(1, 4.236)};`);
  return `:root {\n${lines.join('\n')}\n}\n`;
}
