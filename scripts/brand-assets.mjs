/**
 * Erzeugt Favicons und Open-Graph-Bilder (1200 × 630).
 *   npm install --no-save sharp playwright && npm run brand-assets
 * Ergebnis landet in /public (wird mit eingecheckt, der Build braucht es nicht neu).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { tokenHex } from '../src/content/tokens.mjs';

const C = { vert: tokenHex('vert'), bleu: tokenHex('bleu'), vin: tokenHex('vin'), encre: tokenHex('encre'), nacre: tokenHex('nacre') };
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

async function load(name) {
  try {
    return (await import(name)).default ?? (await import(name));
  } catch {
    // Fallback für vorinstallierte Werkzeuge (z. B. in CI-Containern)
    return require(path.join(process.env.TOOLS_PATH || '/opt/npm-tools/node_modules', name));
  }
}
const sharp = await load('sharp');
const { chromium } = await load('playwright');

const logoSvg = await fs.readFile(path.join(ROOT, 'src/icons/logo-raw.svg'), 'utf8');
const LOGO_VB = logoSvg.match(/viewBox="([^"]+)"/)[1];
const LOGO_D = logoSvg.match(/ d="([^"]+)"/)[1];
const subs = LOGO_D.split('Z').filter((s) => s.trim()).map((s) => s.trim() + 'Z');

/* ---------- Favicon: „L’“ aus dem Logo, weiß auf Vert L’ANNÉE ---------- */
// Teilpfade: L (x 23–202) und Apostroph (x 183–272), siehe Logo-Analyse
const pick = (minX, maxX) =>
  subs.filter((d) => {
    const xs = d.match(/-?\d+(?:\.\d+)?/g).map(Number).filter((_, i) => i % 2 === 0);
    const lo = Math.min(...xs);
    const hi = Math.max(...xs);
    return lo >= minX && hi <= maxX;
  });
const lPaths = pick(20, 205).concat(pick(180, 275)).join(' ');
// Glyphen-Box: x 23–272, y 24–503 → in 512er-Quadrat zentrieren
const gw = 272 - 23;
const gh = 503 - 24;
const scale = 330 / gh;
const tx = (512 - gw * scale) / 2 - 23 * scale;
const ty = (512 - gh * scale) / 2 - 24 * scale;
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="${C.vert}"/><path fill="#FFFFFF" fill-rule="evenodd" transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${scale.toFixed(4)})" d="${lPaths}"/></svg>`;
await fs.writeFile(path.join(ROOT, 'public/favicon.svg'), favicon);
for (const [file, size] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(Buffer.from(favicon)).resize(size, size).png().toFile(path.join(ROOT, 'public', file));
}
console.log('✓ Favicons');

/* ---------- Open-Graph-Bilder ---------- */
const fontCss = `
@font-face{font-family:'Fraunces';src:url('file://${ROOT}/public/fonts/fraunces-latin.woff2') format('woff2');font-weight:300 700;}
@font-face{font-family:'Fraunces';font-style:italic;src:url('file://${ROOT}/public/fonts/fraunces-italic-latin.woff2') format('woff2');font-weight:300 700;}
@font-face{font-family:'Instrument Sans';src:url('file://${ROOT}/public/fonts/instrument-sans-latin.woff2') format('woff2');font-weight:400 700;font-stretch:75% 100%;}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:'Instrument Sans',sans-serif;}
`;
const logo = (color) => `<svg viewBox="${LOGO_VB}" style="display:block;width:100%;height:auto;color:${color}"><path fill="currentColor" fill-rule="evenodd" d="${LOGO_D}"/></svg>`;
const accent = await fs.readFile(path.join(ROOT, 'src/icons/accent-hand.txt'), 'utf8');
const pts = accent.match(/-?\d+(?:\.\d+)?/g).map(Number);
let hand = 'M';
for (let i = 0; i < pts.length; i += 2) hand += `${(pts[i] * 0.8).toFixed(1)} ${(-pts[i + 1] - 76).toFixed(1)}${i + 2 < pts.length ? 'L' : 'Z'}`;
const signet = (hours, colors, ring) =>
  `<svg viewBox="-120 -120 240 240" style="display:block;width:100%;height:100%;overflow:visible"><circle r="104" fill="none" stroke="${ring}" stroke-width="13"/>${hours
    .map((h, i) => `<path d="${hand}" fill="${colors[i]}" transform="rotate(${((h % 12) / 12) * 360})"/>`)
    .join('')}<circle r="9" fill="#fff" stroke="${ring}" stroke-width="7"/></svg>`;

const img = (name) => `file://${ROOT}/public/images/${name}-1080.webp`;
/** Lockup wie auf der Website: Logo so hoch wie der Zweizeiler NAME / Linie / Huîtres & Bulles (siehe 03-components.css). */
const lockupHtml = (name, fg, size = 30) => `<div style="--cap:calc(2.625em + 1.5px);display:inline-flex;align-items:flex-start;gap:.8em;font-size:${size}px;padding-top:calc(var(--cap) * .2078 - .14em);color:${fg}">
  <svg viewBox="${LOGO_VB}" style="display:block;flex:none;width:auto;height:calc(var(--cap) * 1.2141);margin-top:calc(.14em - var(--cap) * .2078)"><path fill="currentColor" fill-rule="evenodd" d="${LOGO_D}"/></svg>
  <div style="display:grid;gap:.42em">
    <div style="font-family:'Instrument Sans';font-stretch:75%;font-weight:600;font-size:1em;line-height:1;letter-spacing:.34em;text-transform:uppercase;padding-bottom:.38em;border-bottom:1.5px solid currentColor">${name}</div>
    <div style="font-family:Fraunces;font-style:italic;font-size:1.12em;line-height:1;white-space:nowrap">Huîtres &amp; Bulles</div>
  </div>
</div>`;
const OG = {
  lannee: `<div style="width:1200px;height:630px;background:${C.nacre};display:grid;grid-template-rows:auto 1fr;padding:64px 80px 60px">
      <div style="width:820px">${logo(C.vert)}</div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between">
        <div style="font-family:Fraunces;font-style:italic;font-weight:330;font-size:76px;line-height:1;color:${C.encre}">Huîtres &amp; Bulles<br><span style="font-style:normal;font-size:34px;font-family:'Instrument Sans';font-weight:500">Garage, Kiosque &amp; Marché in Mannheim</span></div>
        <div style="width:150px;height:150px">${signet([18, 8, 10], [C.vin, C.vert, C.bleu], C.encre)}</div>
      </div></div>`,
};
const LOC = {
  garage: { bg: C.vin, fg: '#fff', name: 'Garage', sub: 'Garage à huîtres &amp; vins', when: 'Fr &amp; Sa ab 18 Uhr, Jungbusch', hour: 18, photo: 'garage-hof' },
  kiosque: { bg: C.bleu, fg: '#fff', name: 'Kiosque', sub: 'Kiosque à huîtres &amp; vins', when: 'Sonntag ab 10 Uhr, Lindenhof', hour: 10, photo: 'kiosque-visualisierung' },
  marche: { bg: C.vert, fg: '#fff', name: 'Marché', sub: 'Huîtres &amp; Bulles auf Rädern', when: 'Samstag 8–13 Uhr, Wochenmarkt Lindenhof', hour: 8, photo: 'marche-wagen' },
};
for (const [key, L] of Object.entries(LOC)) {
  OG[key] = `<div style="width:1200px;height:630px;display:grid;grid-template-columns:1fr 520px;background:${L.bg};color:${L.fg}">
    <div style="padding:64px 70px;display:grid;align-content:space-between">
      <div>${lockupHtml(L.name, L.fg)}</div>
      <div>
        <div style="font-family:Fraunces;font-weight:330;font-size:150px;line-height:.82;letter-spacing:-.035em">${L.name}</div>
        <div style="font-family:Fraunces;font-style:italic;font-size:40px;margin-top:22px">${L.sub}</div>
        <div style="font-size:26px;font-weight:600;margin-top:18px;opacity:.9">${L.when}</div>
      </div>
    </div>
    <div style="background:url('${img(L.photo)}') center/cover no-repeat"></div>
  </div>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await fs.mkdir(path.join(ROOT, 'public/og'), { recursive: true });
for (const [name, body] of Object.entries(OG)) {
  // Als Datei laden, damit Schriften und Fotos per file:// erreichbar sind
  const tmp = path.join(os.tmpdir(), `lannee-og-${name}.html`);
  await fs.writeFile(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${fontCss}</style></head><body>${body}</body></html>`);
  await page.goto('file://' + tmp, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  const buf = await page.screenshot({ type: 'png' });
  await sharp(buf).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(ROOT, 'public/og', `${name}.jpg`));
  console.log(`✓ og/${name}.jpg`);
}
await browser.close();
