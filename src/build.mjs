/**
 * L’ANNÉE – statischer Build ohne Abhängigkeiten.
 *   node src/build.mjs   → baut nach /dist (Vercel führt genau das aus, siehe vercel.json)
 *
 * Seiten: Start (/), Impressum, Datenschutz, 404. Nur Deutsch.
 * Inhalte: src/content/site.mjs · Gestaltung: src/styles/site.css · Skript: src/scripts/main.js
 */
import fs from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { SITE, LOCATIONS, HERO_PHOTOS, MENU, WINE, IMPRESSUM, DATENSCHUTZ } from './content/site.mjs';
import { grafitectureCredit, GT_LOGO } from '../kit/grafitecture-credit/grafitecture-credit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');
const IMAGES = JSON.parse(readFileSync(path.join(ROOT, 'src/content/images.json'), 'utf8'));

/* ------------------------------------------------------------------ */
/* Helfer                                                              */
/* ------------------------------------------------------------------ */

const hash = (buf) => crypto.createHash('sha1').update(buf).digest('hex').slice(0, 10);
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

/** Geschützte Leerzeichen zwischen Zahl und Einheit („18 Uhr“, „3 €“, „0,20 l“, „½ kg“). */
const typo = (s) => s.replace(/([\d½¼]) (Uhr|€|l|kg|Stück)(?![\wäöü])/g, '$1 $2');

/** Mini-Markup: **fett**, [Text](https://…) (neues Fenster), [Text](mailto:…). Alles andere wird escaped. */
function rich(text) {
  return esc(typo(text))
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) =>
      href.startsWith('http')
        ? `<a href="${href}" target="_blank" rel="noopener">${label}<span class="sr"> (öffnet in neuem Fenster)</span></a>`
        : `<a href="${href}">${label}</a>`
    );
}

/** Bild-URLs tragen ?v=<Inhalts-Hash>, weil /images/ ein Jahr im Cache bleibt (vercel.json). */
const versions = new Map();
function imageVersion(name) {
  if (!versions.has(name)) {
    const w = IMAGES[name].widths.at(-1);
    const h = crypto.createHash('sha1');
    for (const ext of ['webp', 'avif']) h.update(readFileSync(path.join(PUBLIC, 'images', `${name}-${w}.${ext}`)));
    versions.set(name, h.digest('hex').slice(0, 10));
  }
  return versions.get(name);
}
const imageUrl = (name, w, fmt) => `/images/${name}-${w}.${fmt}?v=${imageVersion(name)}`;
const srcset = (name, fmt, widths = IMAGES[name].widths) => widths.map((w) => `${imageUrl(name, w, fmt)} ${w}w`).join(', ');

/** Welche Bilder die Seiten wirklich brauchen – nur diese kommen nach /dist. */
const USED_IMAGES = new Set(['logo-lannee']);

/**
 * <picture> mit AVIF und WebP. lazy: true schreibt die Quellen in data-*-Attribute,
 * main.js setzt sie erst, kurz bevor das Bild gezeigt wird (Hero-Überblendung).
 */
function picture(name, { cls = '', imgCls = '', alt = '', sizes = '100vw', eager = false, lazy = false, widths } = {}) {
  const img = IMAGES[name];
  if (!img) throw new Error(`Bild fehlt im Manifest: ${name}`);
  USED_IMAGES.add(name);
  const ws = widths ?? img.widths;
  const fallback = imageUrl(name, ws.find((w) => w >= 1080) ?? ws.at(-1), 'webp');
  const set = lazy ? 'data-srcset' : 'srcset';
  const loading = eager ? ' fetchpriority="high"' : lazy ? '' : ' loading="lazy"';
  return (
    `<picture${cls ? ` class="${cls}"` : ''}>` +
    `<source type="image/avif" ${set}="${srcset(name, 'avif', ws)}" sizes="${sizes}">` +
    `<source type="image/webp" ${set}="${srcset(name, 'webp', ws)}" sizes="${sizes}">` +
    `<img${imgCls ? ` class="${imgCls}"` : ''} ${lazy ? 'data-src' : 'src'}="${fallback}" width="${img.width}" height="${img.height}" alt="${esc(alt)}"${loading} decoding="async">` +
    `</picture>`
  );
}

/** Weißes Holz-Logo (steht immer auf Dunkel). */
const logo = ({ sizes = '22rem', eager = false } = {}) =>
  picture('logo-lannee', { cls: 'logo', alt: SITE.name, sizes, eager, widths: IMAGES['logo-lannee'].widths });

const ICON = {
  instagram:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle class="fill" cx="17.5" cy="6.6" r="1.1"/></svg>',
  pause: '<svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 6v12M16 6v12"/></svg>',
  play: '<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m8 5 11 7-11 7Z"/></svg>',
};

const instagramLink = (cls) =>
  `<a class="${cls}" href="${SITE.instagram.url}" target="_blank" rel="noopener" aria-label="L’ANNÉE auf Instagram, ${SITE.instagram.handle} (öffnet in neuem Fenster)">${ICON.instagram}</a>`;

/* ------------------------------------------------------------------ */
/* Rahmen                                                              */
/* ------------------------------------------------------------------ */

function layout({ path: pagePath, title, description = SITE.description, body, assets, bodyClass = '', noindex = false, home = false }) {
  const canonical = SITE.url + pagePath;
  const og = `${SITE.url}/og/lannee.jpg?v=${assets.og}`;
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#245c43">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${home ? '<link rel="preload" href="/fonts/caveat-lannee.woff" as="font" type="font/woff" crossorigin>\n' : ''}<link rel="stylesheet" href="${assets.css}">
${home ? `<script src="${assets.js}" defer></script>\n` : ''}</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${body}
${footer()}
</body>
</html>
`;
}

function footer() {
  return `<footer class="foot">
  <ul class="foot__links">
    <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
    <li><a href="${SITE.instagram.url}" target="_blank" rel="noopener">Instagram<span class="sr"> (öffnet in neuem Fenster)</span></a></li>
    <li><a href="/impressum/">Impressum</a></li>
    <li><a href="/datenschutz/">Datenschutz</a></li>
  </ul>
  <a class="foot__credit" href="${SITE.agency.url}" target="_blank" rel="noopener" aria-label="Gestaltung: Grafitecture (öffnet in neuem Fenster)">${GT_LOGO}</a>
  ${SITE.demoNotice ? '<p class="foot__note">Diese Webseite dient zur reinen Darstellung und ist fiktiv.</p>' : ''}
</footer>`;
}

/** Schmale Kopfzeile für Impressum, Datenschutz und 404. */
const bar = () => `<header class="bar">
  <a class="bar__home" href="/" aria-label="L’ANNÉE – zur Startseite">${logo({ sizes: '10rem' })}</a>
  <a class="bar__back" href="/">Zur Startseite</a>
</header>`;

/* ------------------------------------------------------------------ */
/* Seiten                                                              */
/* ------------------------------------------------------------------ */

function home(assets) {
  const slides = HERO_PHOTOS.map(({ name }, i) =>
    picture(name, { cls: `hero__slide hero__slide--${name}${i === 0 ? ' is-on' : ''}`, eager: i === 0, lazy: i > 0 })
  ).join('\n    ');

  const places = LOCATIONS.map(
    (l) => `<li class="place place--${l.key}" id="${l.key}">
      <h2 class="place__name">${esc(l.name)}</h2>
      <p class="place__info"><span>${esc(typo(l.address))}</span>${l.hours.map((h) => `<span>${esc(typo(h))}</span>`).join('')}</p>
    </li>`
  ).join('\n    ');

  const menuGroup = (title, sections) => `<div class="carte__col">
        <h3 class="carte__group" lang="fr">${title}</h3>
        ${sections
          .map(
            (s) => `<section class="menu">
          <h4 class="menu__title">${esc(s.title)}</h4>
          <dl class="menu__list">
            ${s.items
              .map(
                (it) =>
                  `<div class="menu__row"><dt>${esc(it.name)}${it.note ? `<small>${esc(typo(it.note))}</small>` : ''}</dt><dd>${esc(typo(it.price))}</dd></div>`
              )
              .join('\n            ')}
          </dl>${s.note ? `\n          <p class="menu__note">${esc(s.note)}</p>` : ''}
        </section>`
          )
          .join('\n        ')}
      </div>`;

  const wine = WINE.show
    ? `<section class="wine" id="wein" aria-labelledby="wein-title">
    <div class="wrap wine__in">
      <p class="kicker" lang="fr">${esc(WINE.kicker)}</p>
      <h2 class="wine__title" id="wein-title">${esc(WINE.title)}</h2>
      <p class="wine__producer"><strong>${esc(WINE.producer)}</strong><br>${esc(WINE.origin)}</p>
      <p class="wine__text">${WINE.text.map(esc).join('<br>')}</p>
    </div>
  </section>`
    : '';

  const body = `<a class="skip" href="#karte">Zur Speisekarte springen</a>
<header class="hero">
  <div class="hero__media" aria-hidden="true">
    ${slides}
  </div>
  <div class="hero__brand">
    <h1 class="hero__logo">${logo({ sizes: '(max-width: 600px) 64vw, 360px', eager: true })}</h1>
    <p class="hero__tagline">${esc(SITE.tagline)}</p>
  </div>
  <ul class="places" aria-label="Unsere drei Orte in Mannheim">
    ${places}
  </ul>
  <div class="hero__foot">
    ${instagramLink('icon-btn')}
    <p class="hero__links"><a href="#karte" lang="fr">La Carte</a>${WINE.show ? `<a href="#wein" lang="fr">${esc(WINE.kicker)}</a>` : ''}</p>
    <button class="icon-btn" type="button" data-pause aria-pressed="false" aria-label="Bildwechsel anhalten" hidden>${ICON.pause}${ICON.play}</button>
  </div>
</header>
<main>
  <section class="carte" id="karte" aria-labelledby="karte-title">
    <div class="wrap">
      <p class="kicker">Garage · Kiosque · Marché</p>
      <h2 class="carte__title" id="karte-title" lang="fr">La Carte</h2>
      <div class="carte__cols">
      ${menuGroup('Plats', MENU.plats)}
      ${menuGroup('Boissons', MENU.boissons)}
      </div>
    </div>
  </section>
  ${wine}
</main>`;
  return layout({ path: '/', title: `${SITE.name} – ${SITE.tagline}`, body, assets, bodyClass: 'is-home', home: true });
}

function legal(page, key, assets) {
  const blocks = page.blocks
    .map(
      (b) => `<section class="legal__block">
      <h2>${esc(b.h)}</h2>
      ${(b.p ?? []).map((p) => `<p>${rich(p)}</p>`).join('\n      ')}
      ${b.lines ? `<p>${b.lines.map(rich).join('<br>')}</p>` : ''}
    </section>`
    )
    .join('\n    ');
  const body = `${bar()}
<main class="legal">
  <h1>${esc(page.title)}</h1>
  ${blocks}
  ${page.updated ? `<p class="legal__date">Stand: ${esc(page.updated)}</p>` : ''}
  ${grafitectureCredit('de')}
</main>`;
  return layout({
    path: `/${key}/`,
    title: `${page.title} – ${SITE.name}`,
    description: `${page.title} der Website von ${SITE.name}, Mannheim.`,
    body,
    assets,
    bodyClass: 'is-legal',
  });
}

function notFound(assets) {
  const body = `${bar()}
<main class="legal legal--404">
  <h1>Diese Seite gibt es nicht (mehr).</h1>
  <p>Alles Wichtige steht jetzt auf einer Seite: die drei Orte, die Karte und der Wein des Moments.</p>
  <p><a class="pill" href="/">Zur Startseite</a></p>
</main>`;
  return layout({ path: '/404', title: `Seite nicht gefunden – ${SITE.name}`, body, assets, bodyClass: 'is-legal', noindex: true });
}

/* ------------------------------------------------------------------ */
/* Build                                                               */
/* ------------------------------------------------------------------ */

async function write(rel, content) {
  const file = path.join(DIST, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
}

async function copyDir(src, dst, skip = () => false) {
  await fs.mkdir(dst, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    if (skip(entry.name)) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();

async function build() {
  const started = Date.now();
  if (existsSync(DIST)) await fs.rm(DIST, { recursive: true, force: true });
  // alles aus /public außer den Bildern (die kommen unten, nur die benutzten)
  await copyDir(PUBLIC, DIST, (name) => name === 'images');

  // CSS: Seite + Bildausschnitte der Hero-Fotos + Grafitecture-Feld (eigene Farben der Agentur)
  const focus = HERO_PHOTOS.map(({ name, focus: f }) => `.hero__slide--${name} img{object-position:${f}}`).join('\n');
  const css = minifyCss(
    [
      await fs.readFile(path.join(ROOT, 'src/styles/site.css'), 'utf8'),
      focus,
      await fs.readFile(path.join(ROOT, 'kit/grafitecture-credit/grafitecture-credit.css'), 'utf8'),
    ].join('\n')
  );
  const cssFile = `assets/site.${hash(css)}.css`;
  await write(cssFile, css);

  const js = await fs.readFile(path.join(ROOT, 'src/scripts/main.js'), 'utf8');
  const jsFile = `assets/site.${hash(js)}.js`;
  await write(jsFile, js);

  const assets = { css: '/' + cssFile, js: '/' + jsFile, og: hash(await fs.readFile(path.join(PUBLIC, 'og/lannee.jpg'))) };

  await write('index.html', home(assets));
  await write('impressum/index.html', legal(IMPRESSUM, 'impressum', assets));
  await write('datenschutz/index.html', legal(DATENSCHUTZ, 'datenschutz', assets));
  await write('404.html', notFound(assets));

  // nur die benutzten Bilder kopieren
  let files = 0;
  for (const name of USED_IMAGES) {
    for (const w of IMAGES[name].widths) {
      for (const ext of ['avif', 'webp']) {
        const rel = `images/${name}-${w}.${ext}`;
        await fs.mkdir(path.join(DIST, 'images'), { recursive: true });
        await fs.copyFile(path.join(PUBLIC, rel), path.join(DIST, rel));
        files++;
      }
    }
  }

  const urls = ['/', '/impressum/', '/datenschutz/'].map((u) => `<url><loc>${SITE.url}${u}</loc></url>`).join('\n');
  await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
  await write(
    'site.webmanifest',
    JSON.stringify(
      {
        name: `${SITE.name} – ${SITE.tagline}`,
        short_name: SITE.name,
        start_url: '/',
        display: 'browser',
        background_color: '#242a24',
        theme_color: '#245c43',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      null,
      2
    )
  );

  console.log(`✓ 4 Seiten, ${USED_IMAGES.size} Bilder (${files} Dateien) in ${Date.now() - started} ms → dist/`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
