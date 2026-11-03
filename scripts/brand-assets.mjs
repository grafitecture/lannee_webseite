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

const C = { ecume: tokenHex('ecume'), brand: tokenHex('brand'), garage: tokenHex('garage'), kiosque: tokenHex('kiosque'), marche: tokenHex('marche'), ink: tokenHex('ink'), blanc: tokenHex('blanc') };
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

// Das Vektor-Logo liefert nur noch das Favicon („L’“); auf den Share-Bildern steht das Holz-Logo.
const logoSvg = await fs.readFile(path.join(ROOT, 'src/icons/logo-raw.svg'), 'utf8');
const LOGO_VB = logoSvg.match(/viewBox="([^"]+)"/)[1];
const LOGO_D = logoSvg.match(/ d="([^"]+)"/)[1];
const subs = LOGO_D.split('Z').filter((s) => s.trim()).map((s) => s.trim() + 'Z');

/* ---------- Favicon: „L’“ aus dem Logo, weiß auf Océan ---------- */
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
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="${C.kiosque}"/><path fill="#FFFFFF" fill-rule="evenodd" transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${scale.toFixed(4)})" d="${lPaths}"/></svg>`;
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
// Holz-Logo (weiße Buchstaben, freigestellt) – steht immer auf Blau
const LOGO_IMG = `file://${ROOT}/public/images/logo-lannee-1563.webp`;
const logo = () => `<img src="${LOGO_IMG}" alt="" style="display:block;width:100%;height:auto">`;

const img = (name) => `file://${ROOT}/public/images/${name}-1080.webp`;
/** Lockup wie auf der Website: Logo so hoch wie der Zweizeiler NAME / Linie / Austern & Bulles (siehe 03-components.css). */
const lockupHtml = (name, fg, size = 30) => `<div style="--cap:calc(2.625em + 1.5px);display:inline-flex;align-items:flex-start;gap:.8em;font-size:${size}px;padding-top:calc(var(--cap) * .1394 - .14em);color:${fg}">
  <img src="${LOGO_IMG}" alt="" style="display:block;flex:none;width:auto;height:calc(var(--cap) * 1.154);margin-top:calc(.14em - var(--cap) * .1394)">
  <div style="display:grid;gap:.42em">
    <div style="font-family:'Instrument Sans';font-stretch:75%;font-weight:600;font-size:1em;line-height:1;letter-spacing:.34em;text-transform:uppercase;padding-bottom:.38em;border-bottom:1.5px solid currentColor">${name}</div>
    <div style="font-family:Fraunces;font-style:italic;font-size:1.12em;line-height:1;white-space:nowrap">Austern &amp; Bulles</div>
  </div>
</div>`;
const OG = {
  lannee: `<div style="width:1200px;height:630px;background:${C.ink};display:grid;grid-template-rows:auto 1fr;padding:64px 80px 60px">
      <div style="width:820px">${logo()}</div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between">
        <div style="font-family:Fraunces;font-style:italic;font-weight:330;font-size:76px;line-height:1;color:${C.blanc}">Austern &amp; Bulles<br><span style="font-style:normal;font-size:34px;font-family:'Instrument Sans';font-weight:500">Garage, Kiosque &amp; Marché in Mannheim</span></div>
      </div></div>`,
};
const LOC = {
  garage: { bg: C.garage, fg: C.blanc, name: 'Garage', sub: 'Garage à huîtres &amp; vins', when: 'Fr &amp; Sa ab 18 Uhr, Jungbusch', photo: 'garage-hof' },
  kiosque: { bg: C.kiosque, fg: C.blanc, name: 'Kiosque', sub: 'Kiosque à huîtres &amp; vins', when: 'Sonntag ab 10 Uhr, Lindenhof', photo: 'kiosque-visualisierung' },
  marche: { bg: C.marche, fg: C.blanc, name: 'Marché', sub: 'Austern &amp; Bulles auf Rädern', when: 'Samstag 8–13 Uhr, Wochenmarkt Lindenhof', photo: 'marche-wagen' },
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
