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

const C = {
  accent: tokenHex('accent'),
  garage: tokenHex('garage'), garageOn: tokenHex('garage-on'),
  kiosque: tokenHex('kiosque'), kiosqueOn: tokenHex('kiosque-on'),
  marche: tokenHex('marche'), marcheOn: tokenHex('marche-on'),
  ink: tokenHex('ink'), blanc: tokenHex('blanc'),
};
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

/* ---------- Favicon: „L’“ aus dem Logo, weiß auf 900 (Grün-Skala 08.11.2026) ---------- */
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
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="${C.ink}"/><path fill="#FFFFFF" fill-rule="evenodd" transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${scale.toFixed(4)})" d="${lPaths}"/></svg>`;
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
// Holz-Logo (weiße Buchstaben, freigestellt) – steht immer auf 900
const LOGO_IMG = `file://${ROOT}/public/images/logo-lannee-1563.webp`;
const logo = () => `<img src="${LOGO_IMG}" alt="" style="display:block;width:100%;height:auto">`;

const img = (name) => `file://${ROOT}/public/images/${name}-1080.webp`;
const pill = (name, bg, fg) =>
  `<span style="display:inline-block;padding:14px 24px;border-radius:999px;background:${bg};color:${fg};font-family:Fraunces;font-weight:540;font-size:30px;line-height:1">${name}</span>`;
/* Share-Bilder im Stil des Umbaus vom 05.11.2026: echtes Foto (Hof der Garage), Mega-Headline, die drei Orte als Pillen */
const OG = {
  lannee: `<div style="position:relative;width:1200px;height:630px;background:${C.ink} url('${img('garage-hof')}') 60% center/cover no-repeat;color:${C.blanc}">
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,${C.ink}e6 0%,${C.ink}99 45%,${C.ink}00 80%)"></div>
      <div style="position:relative;height:100%;display:grid;grid-template-rows:auto 1fr auto;padding:56px 64px">
        <div style="width:300px">${logo()}</div>
        <div style="align-self:end;font-family:Fraunces;font-weight:560;font-size:92px;line-height:.92;letter-spacing:-.045em">Drei Orte.<br>Ein Wochenende.<br>Komm vorbei!</div>
        <div style="display:flex;gap:12px;margin-top:34px">${pill('Garage', C.garage, C.garageOn)}${pill('Kiosque', C.kiosque, C.kiosqueOn)}${pill('Marché', C.marche, C.marcheOn)}</div>
      </div></div>`,
};
const LOC = {
  garage: { name: 'Garage', sub: 'Garage à huîtres &amp; vins', when: 'Fr &amp; Sa ab 18 Uhr, Jungbusch', photo: 'garage-hof' },
  kiosque: { name: 'Kiosque', sub: 'Kiosque à huîtres &amp; vins', when: 'Sonntag ab 10 Uhr, Lindenhof', photo: 'bulles' },
  marche: { name: 'Marché', sub: 'Austern &amp; Bulles auf Rädern', when: 'Samstag 8–13 Uhr, Wochenmarkt Lindenhof', photo: 'marche-wagen' },
};
for (const [key, L] of Object.entries(LOC)) {
  OG[key] = `<div style="width:1200px;height:630px;display:grid;grid-template-columns:1fr 500px;gap:28px;padding:28px;background:${C.ink};color:${C.blanc}">
    <div style="padding:30px 10px 26px 36px;display:grid;align-content:space-between">
      <div style="width:250px">${logo()}</div>
      <div>
        <div style="font-family:Fraunces;font-weight:560;font-size:140px;line-height:.84;letter-spacing:-.05em">${L.name}</div>
        <div style="font-family:Fraunces;font-style:italic;font-size:38px;margin-top:22px">${L.sub}</div>
        <div style="display:inline-block;margin-top:24px;padding:12px 22px;border-radius:999px;background:${C.accent};color:${C.ink};font-size:24px;font-weight:700">${L.when}</div>
      </div>
    </div>
    <div style="border-radius:44px;background:url('${img(L.photo)}') center/cover no-repeat"></div>
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
