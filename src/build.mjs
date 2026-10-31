/**
 * L'ANNÉE – statischer Website-Build ohne Abhängigkeiten.
 *   node src/build.mjs            → baut nach /dist
 * Vercel führt genau diesen Befehl aus (siehe vercel.json).
 */
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { LOCALES, ROUTES, DICT, url } from './lib/i18n.mjs';
import { layout } from './lib/layout.mjs';
import { buildSprite, setSpriteUrl, buildAtlasSprite, setAtlasSpriteUrl } from './lib/components.mjs';
import { tokensCss, tokenHex } from './content/tokens.mjs';
import { SITE } from './content/site.mjs';

import * as home from './pages/home.mjs';
import * as location from './pages/location.mjs';
import * as carte from './pages/carte.mjs';
import * as annee from './pages/annee.mjs';
import * as atlas from './pages/atlas.mjs';
import * as contact from './pages/contact.mjs';
import * as legal from './pages/legal.mjs';
import * as notfound from './pages/notfound.mjs';
import * as styleguide from './pages/styleguide.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');

const hash = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 10);

async function copyDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function write(rel, content) {
  const file = path.join(DIST, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
}

/** Sehr einfache, sichere CSS-Verkleinerung (Kommentare & Leerraum). */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

/* ------------------------------------------------------------------ */

const PAGES = {
  home: { module: home, theme: null, og: 'lannee' },
  garage: { module: location, og: 'garage' },
  kiosque: { module: location, og: 'kiosque' },
  marche: { module: location, og: 'marche' },
  carte: { module: carte, og: 'lannee' },
  annee: { module: annee, og: 'lannee' },
  atlas: { module: atlas, og: 'lannee' },
  contact: { module: contact, og: 'lannee', compactFooter: true },
  impressum: { module: legal, og: 'lannee', noindex: false },
  datenschutz: { module: legal, og: 'lannee', noindex: false },
};

async function build() {
  const started = Date.now();
  if (existsSync(DIST)) await fs.rm(DIST, { recursive: true, force: true });
  await copyDir(PUBLIC, DIST);

  // Sprite
  const sprite = buildSprite();
  const spriteFile = `assets/icons.${hash(sprite)}.svg`;
  await write(spriteFile, sprite);
  setSpriteUrl('/' + spriteFile);
  const atlasSprite = buildAtlasSprite();
  const atlasSpriteFile = `assets/atlas.${hash(atlasSprite)}.svg`;
  await write(atlasSpriteFile, atlasSprite);
  setAtlasSpriteUrl('/' + atlasSpriteFile);

  // CSS
  const styleDir = path.join(ROOT, 'src', 'styles');
  const parts = [tokensCss()];
  for (const f of (await fs.readdir(styleDir)).filter((f) => f.endsWith('.css')).sort()) {
    parts.push(await fs.readFile(path.join(styleDir, f), 'utf8'));
  }
  // Grafitecture-Feld (Impressum, Datenschutz): eigene Farben der Agentur, bewusste Ausnahme von „nur Grün“
  parts.push(await fs.readFile(path.join(ROOT, 'kit', 'grafitecture-credit', 'grafitecture-credit.css'), 'utf8'));
  const css = minifyCss(parts.join('\n'));
  const cssFile = `assets/site.${hash(css)}.css`;
  await write(cssFile, css);

  // JS
  const js = await fs.readFile(path.join(ROOT, 'src', 'scripts', 'main.js'), 'utf8');
  const jsFile = `assets/site.${hash(js)}.js`;
  await write(jsFile, js);

  const assets = { css: '/' + cssFile, js: '/' + jsFile };
  let count = 0;

  // Seiten in allen Sprachen
  for (const locale of LOCALES) {
    for (const [key, cfg] of Object.entries(PAGES)) {
      const page = { key, og: cfg.og, noindex: cfg.noindex, compactFooter: cfg.compactFooter };
      const ctx = { locale, page, assets };
      const main = cfg.module.render(ctx);
      const out = layout(ctx, main);
      const rel = url(key, locale).replace(/^\//, '') + 'index.html';
      await write(rel, out);
      count++;
    }
  }

  // Styleguide (nur Deutsch, nicht indexiert)
  {
    const page = {
      key: 'styleguide',
      path: '/styleguide/',
      title: 'Styleguide | L’ANNÉE',
      description: 'Markensystem, Farben, Typografie und Breakpoints von L’ANNÉE.',
      noindex: true,
      og: 'lannee',
    };
    const ctx = { locale: 'de', page, assets };
    await write('styleguide/index.html', layout(ctx, styleguide.render(ctx)));
    count++;
  }

  // 404
  {
    const page = { key: 'notFound', path: '/404', title: DICT.de.pages.notFound.title, noindex: true, og: 'lannee' };
    const ctx = { locale: 'de', page, assets };
    await write('404.html', layout(ctx, notfound.render(ctx)));
    count++;
  }

  // Sitemap mit Sprachvarianten
  const urls = Object.keys(PAGES)
    .flatMap((key) =>
      LOCALES.map((l) => {
        const alts = LOCALES.map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${SITE.url}${url(key, a)}"/>`).join('');
        return `<url><loc>${SITE.url}${url(key, l)}</loc>${alts}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE.url}${url(
          key,
          'de'
        )}"/></url>`;
      })
    )
    .join('\n');
  await write(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
  );
  await write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /styleguide/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

  // Web-Manifest
  await write(
    'site.webmanifest',
    JSON.stringify(
      {
        name: 'L’ANNÉE – Austern & Bulles',
        short_name: 'L’ANNÉE',
        start_url: '/',
        display: 'browser',
        background_color: tokenHex('blanc'),
        theme_color: tokenHex('ink'),
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      null,
      2
    )
  );

  console.log(`✓ ${count} Seiten gebaut in ${Date.now() - started} ms → dist/`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
