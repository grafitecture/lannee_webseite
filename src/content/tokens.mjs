/**
 * Design-Tokens – eine Quelle für CSS (wird beim Build zu :root-Variablen)
 * und für die Styleguide-Seite.
 */

/** Fluid-Bereich für clamp(): 360 px → 1920 px Viewport. */
export const FLUID = { minVw: 360, maxVw: 1920, root: 16 };

/*
 * Palette: warme Grüntöne (Farbton 112–135° in OKLCH, also zum Gelb hin).
 * Die Helligkeit folgt dem Tageslicht: hell am Morgen (Marché), mittel am
 * Sonntag (Kiosque), dunkel am Abend (Garage), fast schwarz in der Nacht (Encre).
 * Die Token-Namen vert/bleu/vin sind historisch und stehen für die Orte:
 * vert = Marché, bleu = Kiosque, vin = Garage.
 */
export const COLORS = [
  { token: 'vert', name: 'Vert L’ANNÉE', hex: '#709B4A', oklch: 'oklch(64% 0.12 132)', role: 'Markenfarbe, frisches Grün. Marché, der Morgen', text: 'encre' },
  { token: 'bleu', name: 'Vert Mousse', hex: '#586C2A', oklch: 'oklch(50% 0.095 124)', role: 'Moosgrün. Kiosque, der Sonntag', text: 'blanc' },
  { token: 'vin', name: 'Vert Olive', hex: '#434815', oklch: 'oklch(38.5% 0.072 115)', role: 'Dunkles Oliv. Garage, der Abend', text: 'blanc' },
  { token: 'encre', name: 'Encre', hex: '#1C2411', oklch: 'oklch(24.5% 0.035 128)', role: 'Text und Fußzeile, die Nacht', text: 'blanc' },
  { token: 'nacre', name: 'Nacre', hex: '#F6F7EC', oklch: 'oklch(97.2% 0.014 112)', role: 'Perlmutt der Auster, ruhige Flächen', text: 'encre' },
  { token: 'blanc', name: 'Blanc', hex: '#FFFFFF', oklch: 'oklch(100% 0 0)', role: 'Weißraum', text: 'encre' },
];

/** Abgeleitete Töne (für Text auf Weiß, zarte Flächen). */
export const SHADES = [
  { token: 'vert-deep', hex: '#456626' },
  { token: 'vert-pale', hex: '#E7F6DA' },
  { token: 'bleu-deep', hex: '#374614' },
  { token: 'bleu-pale', hex: '#ECF4DB' },
  { token: 'vin-deep', hex: '#2B2E0A' },
  { token: 'vin-pale', hex: '#F1F2DC' },
  { token: 'nacre-2', hex: '#EBEDE0' },
  { token: 'vin-soft', hex: '#C1C382' },
  { token: 'bleu-soft', hex: '#B1C887' },
  { token: 'vert-soft', hex: '#A5D48B' },
  { token: 'gris', hex: '#6D7162' },
];

/** Hex-Wert eines Tokens (für Meta-Tags, Manifest, Share-Bilder). */
export const tokenHex = (token) => [...COLORS, ...SHADES].find((c) => c.token === token)?.hex;

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
