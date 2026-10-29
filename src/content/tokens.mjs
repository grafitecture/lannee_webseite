/**
 * Design-Tokens – eine Quelle für CSS (wird beim Build zu :root-Variablen)
 * und für die Styleguide-Seite.
 */

/** Fluid-Bereich für clamp(): 360 px → 1920 px Viewport. */
export const FLUID = { minVw: 360, maxVw: 1920, root: 16 };

export const COLORS = [
  { token: 'vert', name: 'Vert L’ANNÉE', hex: '#4D9D6E', oklch: 'oklch(63.2% 0.107 155.8)', role: 'Bestehende Markenfarbe. Marché, der Morgen', text: 'encre' },
  { token: 'bleu', name: 'Bleu Marée', hex: '#2E669C', oklch: 'oklch(50% 0.105 250)', role: 'Neu. Meer und Gezeiten. Kiosque, der Sonntag', text: 'blanc' },
  { token: 'vin', name: 'Rouge Bordeaux', hex: '#7D2131', oklch: 'oklch(40% 0.125 15)', role: 'Neu. Wein und Abend. Garage', text: 'blanc' },
  { token: 'encre', name: 'Encre', hex: '#142237', oklch: 'oklch(25% 0.045 258)', role: 'Text und Fußzeile, die Nacht', text: 'blanc' },
  { token: 'nacre', name: 'Nacre', hex: '#F1F7F7', oklch: 'oklch(97.2% 0.006 200)', role: 'Perlmutt der Auster, ruhige Flächen', text: 'encre' },
  { token: 'blanc', name: 'Blanc', hex: '#FFFFFF', oklch: 'oklch(100% 0 0)', role: 'Weißraum', text: 'encre' },
];

/** Abgeleitete Töne (für Text auf Weiß, zarte Flächen). */
export const SHADES = [
  { token: 'vert-deep', hex: '#286A45' },
  { token: 'vert-pale', hex: '#E4F6E9' },
  { token: 'bleu-deep', hex: '#1D3E66' },
  { token: 'bleu-pale', hex: '#E6F2FE' },
  { token: 'vin-deep', hex: '#52151F' },
  { token: 'vin-pale', hex: '#FCECEC' },
  { token: 'nacre-2', hex: '#E5EDED' },
  { token: 'vin-soft', hex: '#E9A1A6' },
  { token: 'bleu-soft', hex: '#93BCE6' },
  { token: 'vert-soft', hex: '#87D1A3' },
  { token: 'gris', hex: '#6B727A' },
];

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
  for (const s of SHADES) lines.push(`  --${s.token}: ${s.hex};`);
  for (const t of TYPE_SCALE) lines.push(`  --fs-${t.token}: ${clampRem(t.min, t.max)};`);
  lines.push('  --fs-text-small: max(var(--fs-small), 0.8125rem);');
  for (const s of SPACE) lines.push(`  --space-${s.token}: ${clampRem(s.min, s.max)};`);
  lines.push(`  --gutter: ${clampRem(1, 4.236)};`);
  return `:root {\n${lines.join('\n')}\n}\n`;
}
