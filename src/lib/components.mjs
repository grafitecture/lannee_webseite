/**
 * Bausteine: Logo, Signets, Lockups, Icons, Bilder, Wochenplan, Jahresuhr.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { html, raw, esc, rich, typo, setExternalLinkRenderer } from './html.mjs';
import { DICT, url, pick, fill, formatTime, formatSpan } from './i18n.mjs';
import { SITE, LOCATIONS, LOCATION_ORDER, SCHEDULE, CLOSURES } from '../content/site.mjs';
import { MEDIA } from '../content/media.mjs';
import { MONTHS } from '../content/year.mjs';
import { oysterArt } from './oyster-art.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

export const IMAGES = JSON.parse(read('src/content/images.json'));

/* ------------------------------------------------------------------ */
/* Logo & Zeiger                                                       */
/* ------------------------------------------------------------------ */

const logoSvg = read('src/icons/logo-raw.svg');
export const LOGO_VIEWBOX = logoSvg.match(/viewBox="([^"]+)"/)[1];
export const LOGO_D = logoSvg.match(/ d="([^"]+)"/)[1];

/**
 * Der Zeiger ist der Akzent aus dem É des Logos: Spitze nach außen,
 * breites Ende am Drehpunkt. Länge 100 Einheiten, Drehpunkt (0,0), zeigt nach oben.
 */
const accentPts = read('src/icons/accent-hand.txt')
  .match(/-?\d+(?:\.\d+)?/g)
  .map(Number);
const handPts = [];
for (let i = 0; i < accentPts.length; i += 2) handPts.push([accentPts[i] * 0.8, -accentPts[i + 1] - 76]);
export const HAND_D = 'M' + handPts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z';

export function logo({ cls = 'logo', label = 'L’ANNÉE', decorative = false } = {}) {
  const a11y = decorative ? raw('aria-hidden="true" focusable="false"') : raw(`role="img" aria-label="${esc(label)}"`);
  return html`<svg class="${cls}" viewBox="${LOGO_VIEWBOX}" ${a11y}><path fill="currentColor" fill-rule="evenodd" d="${LOGO_D}"/></svg>`;
}

/* ------------------------------------------------------------------ */
/* Signets & Lockups                                                   */
/* ------------------------------------------------------------------ */

/** Winkel eines 12-Stunden-Zifferblatts (0° = 12 Uhr, im Uhrzeigersinn). */
const hourAngle = (h) => ((h % 12) / 12) * 360;

/**
 * Signet = Kreis + Akzent-Zeiger, der auf die Öffnungsstunde zeigt.
 * key: 'garage' | 'kiosque' | 'marche' | 'all'
 */
export function signet(key, { cls = '' } = {}) {
  const keys = key === 'all' ? ['garage', 'marche', 'kiosque'] : [key];
  const hands = keys
    .map(
      (k) =>
        `<path class="signet__hand signet__hand--${k}" d="${HAND_D}" transform="rotate(${hourAngle(LOCATIONS[k].hour)})"/>`
    )
    .join('');
  return html`<svg class="signet signet--${key} ${cls}" viewBox="-120 -120 240 240" aria-hidden="true" focusable="false"><circle class="signet__ring" r="104"/>${raw(hands)}<circle class="signet__pivot" r="9"/></svg>`;
}

/** Subbrand-Lockup: Signet · L'ANNÉE · NAME · Austern & Bulles */
export function lockup(key, { cls = '', tagline = true, as = 'div' } = {}) {
  const L = LOCATIONS[key];
  const inner = html`${logo({ cls: 'lockup__logo', decorative: true })}<span class="lockup__words"><span class="lockup__name"><span class="visually-hidden">L’ANNÉE </span>${
    L.name
  }</span>${tagline ? html`<span class="lockup__tagline">${SITE.tagline}</span>` : ''}</span>`;
  return as === 'span'
    ? html`<span class="lockup lockup--${key} ${cls}">${inner}</span>`
    : html`<div class="lockup lockup--${key} ${cls}">${inner}</div>`;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

let SPRITE_URL = '/assets/icons.svg';
export const setSpriteUrl = (u) => (SPRITE_URL = u);

export function icon(name, { cls = 'icon', label } = {}) {
  return label
    ? html`<svg class="${cls}" role="img" aria-label="${label}"><use href="${SPRITE_URL}#${name}"/></svg>`
    : html`<svg class="${cls}" aria-hidden="true" focusable="false"><use href="${SPRITE_URL}#${name}"/></svg>`;
}

/*
 * Austern-Strichzeichnungen (Austernatlas): eigenes Sprite, das nur die
 * Atlas-Seite lädt (die Zeichnungen sind zusammen gut 260 KB).
 */
let ATLAS_SPRITE_URL = '/assets/atlas.svg';
export const setAtlasSpriteUrl = (u) => (ATLAS_SPRITE_URL = u);

export function buildAtlasSprite() {
  return `<svg xmlns="http://www.w3.org/2000/svg">${oysterArt().map((a) => a.symbol).join('')}</svg>`;
}

/** Austern-Strichzeichnung aus dem Atlas-Sprite, mit passendem Seitenverhältnis. */
export function oysterDrawing(key, { cls = 'oyster__svg' } = {}) {
  const art = oysterArt().find((a) => a.key === key);
  if (!art) throw new Error(`Austern-Zeichnung fehlt: ${key}`);
  return html`<svg class="${cls}" viewBox="0 0 ${art.width} ${art.height}" aria-hidden="true" focusable="false"><use href="${ATLAS_SPRITE_URL}#oy-${key}"/></svg>`;
}

/** Baut das Sprite aus den Higgsfield-Icons (+ Jungbusch-Emblem). */
export function buildSprite() {
  const lines = read('src/icons/higgsfield-icons.txt').trim().split('\n');
  const symbols = lines.map((line) => {
    const [name, w, h, d] = line.split('|');
    const W = +w;
    const H = +h;
    const S = Math.max(W, H);
    const vb = `${((W - S) / 2).toFixed(1)} ${((H - S) / 2).toFixed(1)} ${S} ${S}`;
    return `<symbol id="${name}" viewBox="${vb}"><path fill="currentColor" fill-rule="evenodd" d="${d}"/></symbol>`;
  });
  const jb = read('src/icons/jungbusch.svg');
  const jbVb = jb.match(/viewBox="([^"]+)"/)[1];
  const jbD = jb.match(/ d="([^"]+)"/)[1];
  symbols.push(`<symbol id="jungbusch" viewBox="${jbVb}"><path fill="currentColor" fill-rule="evenodd" d="${jbD}"/></symbol>`);
  symbols.push(
    `<symbol id="arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M4 12h15M13 6l6 6-6 6"/></symbol>`,
    `<symbol id="arrow-out" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></symbol>`,
    `<symbol id="instagram" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></g></symbol>`
  );
  return `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('')}</svg>`;
}

/* ------------------------------------------------------------------ */
/* Bilder                                                              */
/* ------------------------------------------------------------------ */

export function picture(name, locale, { sizes = '100vw', cls = '', eager = false, alt, caption } = {}) {
  const img = IMAGES[name];
  if (!img) throw new Error(`Bild fehlt im Manifest: ${name}`);
  const media = MEDIA[name] ?? {};
  const altText = alt ?? pick(media.alt, locale);
  const srcset = (fmt) => img.widths.map((w) => `/images/${name}-${w}.${fmt} ${w}w`).join(', ');
  const fallback = img.widths.find((w) => w >= 1080) ?? img.widths.at(-1);
  const loading = eager ? raw('loading="eager" fetchpriority="high"') : raw('loading="lazy"');
  const pic = html`<picture class="pic ${cls}"><source type="image/avif" srcset="${srcset(
    'avif'
  )}" sizes="${sizes}"><source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}"><img src="/images/${name}-${fallback}.webp" width="${
    img.width
  }" height="${img.height}" alt="${altText}" ${loading} decoding="async"></picture>`;
  const t = DICT[locale].ui;
  const cap = caption ?? (media.caption ? pick(media.caption, locale) : media.visual ? t.visualisation : null);
  return cap ? html`<figure class="figure ${cls ? cls + '-figure' : ''}">${pic}<figcaption>${cap}</figcaption></figure>` : pic;
}

/* ------------------------------------------------------------------ */
/* Kreis-Geometrie                                                     */
/* ------------------------------------------------------------------ */

const rad = (deg) => (deg * Math.PI) / 180;
const pt = (r, deg) => [r * Math.sin(rad(deg)), -r * Math.cos(rad(deg))];
const f = (n) => Number(n.toFixed(2));

/** Bogen im Uhrzeigersinn von a1 nach a2 (Grad, 0 = oben). */
function arc(r, a1, a2) {
  let sweep = (a2 - a1 + 360) % 360;
  if (sweep === 0) sweep = 360;
  const [x1, y1] = pt(r, a1);
  const [x2, y2] = pt(r, a1 + Math.min(sweep, 359.99));
  return `M${f(x1)} ${f(y1)}A${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${f(x2)} ${f(y2)}`;
}

const hhmm = (s) => {
  const [h, m] = s.split(':').map(Number);
  return h + m / 60;
};

/* ------------------------------------------------------------------ */
/* Wochenplan: Tage als Zeilen, Öffnungszeiten als Balken auf einer     */
/* Stundenskala. Schmal (Handy) wird daraus eine Liste mit Mini-Balken. */
/* ------------------------------------------------------------------ */

const cap = (s) => s.charAt(0).toLocaleUpperCase() + s.slice(1);

export function weekPlan(locale) {
  const T = DICT[locale];
  const t = T.ui;

  // Stundenskala: auf gerade Stunden gerundet, höchstens bis Mitternacht
  const starts = SCHEDULE.map((s) => hhmm(s.start));
  const ends = SCHEDULE.map((s) => hhmm(s.end));
  const axisFrom = Math.floor(Math.min(...starts) / 2) * 2;
  const axisTo = Math.min(24, Math.ceil(Math.max(...ends) / 2) * 2);
  const span = axisTo - axisFrom;
  const ticks = [];
  for (let h = axisFrom; h <= axisTo; h += 2) ticks.push(h);
  const tickLabel = (h) => (locale === 'en' ? formatTime(`${h % 24}:00`, 'en') : locale === 'fr' ? `${h} h` : String(h));

  const place = (L) => (L.street ? `${L.street}, ${L.district}` : T.pages.marche.whereText);

  const slot = (s, i) => {
    const L = LOCATIONS[s.location];
    const time = s.openEnd ? fill(t.time.from, { t: formatTime(s.start, locale) }) : formatSpan(s.start, s.end, locale);
    return html`<li class="plan__item"><a class="plan__slot plan__slot--${L.key}${s.openEnd ? ' plan__slot--open-end' : ''}" href="${url(
      L.key,
      locale
    )}" data-slot="${i}" style="--from:${hhmm(s.start)};--to:${hhmm(s.end)}"><span class="plan__name">${L.name}</span><span class="plan__time">${typo(
      time,
      locale
    )}</span><span class="plan__place">${place(L)}</span><span class="plan__pause"><span class="closure__icon" aria-hidden="true"></span>${
      t.live.paused
    }</span></a></li>`;
  };

  // Nur die Tage, an denen wir geöffnet haben (Vorgabe 01.11.2026: keine Zeile „Mo – Do geschlossen“)
  const rows = [];
  for (let day = 1; day <= 7; day++) {
    const slots = SCHEDULE.map((s, i) => [s, i]).filter(([s]) => s.day === day);
    if (slots.length) rows.push({ day, slots });
  }

  const head = (r) => html`<div class="plan__head"><h3 class="plan__dayname">${cap(t.days[r.day - 1])}</h3><p class="plan__date"></p></div>`;

  const days = rows.map(
    (r) =>
      html`<li class="plan__day" data-days="${r.day}">${head(r)}<div class="plan__track"><ul class="plan__slots" role="list">${r.slots.map(([s, i]) =>
        slot(s, i)
      )}</ul><span class="plan__now" aria-hidden="true" hidden></span></div></li>`
  );

  // Daten für die Live-Anzeige (main.js)
  const data = SCHEDULE.map((s, i) => ({ i, loc: s.location, day: s.day, start: s.start, end: s.end, openEnd: !!s.openEnd }));
  const strings = {
    ...t.live,
    intl: T.intl,
    days: t.days,
    locations: Object.fromEntries(Object.values(LOCATIONS).map((L) => [L.key, { name: L.name, place: place(L), url: url(L.key, locale) }])),
  };

  return html`<div class="plan" data-plan data-locale="${locale}" data-axis="${axisFrom},${axisTo}" data-schedule="${JSON.stringify(
    data
  )}" data-closures="${JSON.stringify(CLOSURES)}" data-strings="${JSON.stringify(strings)}" style="--axis-from:${axisFrom};--axis-span:${span};--ticks:${
    span / 2
  }">
  <div class="plan__scale" aria-hidden="true"><span class="plan__unit">${t.live.unit}</span><span class="plan__ticks">${ticks.map(
    (h) => html`<span style="--h:${h}">${tickLabel(h)}</span>`
  )}</span></div>
  <ol class="plan__days" role="list">${days}</ol>
</div>`;
}

/* ------------------------------------------------------------------ */
/* Jahresuhr                                                           */
/* ------------------------------------------------------------------ */

export function yearRing(locale, { id = 'jahresuhr' } = {}) {
  const t = DICT[locale].pages.annee;
  const R = 380;
  const parts = [`<circle class="yr__ring" r="${R}"/>`];
  // R-Monate: September (Index 8) bis April (Index 3) → 240° bis 120°
  parts.push(`<path class="yr__rband" d="${arc(R - 110, 240, 120)}"/>`);
  MONTHS.forEach((m, i) => {
    const a0 = i * 30;
    const [x1, y1] = pt(R - 26, a0);
    const [x2, y2] = pt(R + 26, a0);
    parts.push(`<line class="yr__tick" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`);
    const mid = a0 + 15;
    const [ix, iy] = pt(R - 110, mid);
    parts.push(
      `<use class="yr__icon${m.r ? ' yr__icon--r' : ''}" href="${SPRITE_URL}#${m.icon}" x="${f(ix - 34)}" y="${f(iy - 34)}" width="68" height="68" data-month="${m.n}"/>`
    );
    const [tx, ty] = pt(R + 70, mid);
    const label = pick(m.name, locale).slice(0, 3) + (pick(m.name, locale).length > 3 ? '.' : '');
    parts.push(
      `<text class="yr__label" x="${f(tx)}" y="${f(ty)}" text-anchor="middle" dominant-baseline="middle" data-month="${m.n}">${esc(
        locale === 'fr' ? pick(m.name, 'fr') : label
      )}</text>`
    );
  });
  parts.push(`<g class="yr__hand" hidden><path d="${HAND_D}" transform="scale(2.05)"/></g><circle class="yr__pivot" r="14"/>`);
  return html`<figure class="yr" id="${id}" data-year-ring>
    <svg class="yr__svg" viewBox="-540 -540 1080 1080" role="img" aria-labelledby="${id}-label"><title id="${id}-label">${t.ringLabel}</title>${raw(
    parts.join('')
  )}</svg>
  </figure>`;
}

/* ------------------------------------------------------------------ */
/* Kleinteile                                                          */
/* ------------------------------------------------------------------ */

/** Link mit Pfeil – der Pfeil ist Grafik, nicht Text. */
export function arrowLink(href, label, { cls = 'link-arrow', external = false, locale = 'de' } = {}) {
  const ext = external ? raw(` target="_blank" rel="noopener"`) : '';
  return html`<a class="${cls}" href="${href}"${ext}><span>${label}</span>${icon(external ? 'arrow-out' : 'arrow', {
    cls: 'icon icon--arrow',
  })}${external ? html`<span class="visually-hidden"> ${DICT[locale].ui.external}</span>` : ''}</a>`;
}

/** Heutiges Datum in Mannheim (YYYY-MM-DD), zur Build-Zeit. */
export const berlinToday = (date = new Date()) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);

/** Schließtage, die noch nicht vorbei sind und einen der Orte betreffen. */
export function upcomingClosures(keys) {
  const today = berlinToday();
  return CLOSURES.filter((c) => c.to >= today && (c.locations || []).some((k) => keys.includes(k)));
}

/**
 * Hinweis „… macht Pause“. Wird zur Build-Zeit erzeugt; vergangene Einträge
 * blendet das Skript aus (data-expires), falls länger nicht neu gebaut wurde.
 */
export function closureNotes(locale, keys) {
  const list = upcomingClosures(keys);
  if (!list.length) return '';
  const t = DICT[locale];
  const order = LOCATION_ORDER;
  const dates = new Intl.DateTimeFormat(t.intl, { day: 'numeric', month: 'long', timeZone: 'UTC' });
  const names = new Intl.ListFormat(t.intl, { type: 'conjunction' });
  const day = (ymd) => new Date(`${ymd}T00:00:00Z`);
  return html`<div class="closures" data-expiry-group>${list.map((c) => {
    const locs = c.locations.filter((k) => keys.includes(k)).sort((a, b) => order.indexOf(a) - order.indexOf(b));
    const when = c.from === c.to ? dates.format(day(c.from)) : dates.formatRange(day(c.from), day(c.to));
    const note = c.note ? pick(c.note, locale) : '';
    const text =
      fill(locs.length > 1 ? t.ui.closure.many : t.ui.closure.one, {
        names: names.format(locs.map((k) => LOCATIONS[k].name)),
        when,
      }) + (note ? ` (${note})` : '');
    return html`<p class="closure" data-expires="${c.to}"><span class="closure__icon" aria-hidden="true"></span><span>${rich(
      text,
      locale
    )}</span></p>`;
  })}</div>`;
}

/** Kartenlinks (keine Einbettung → keine Datenübertragung ohne Klick). */
export function mapLinks(query, locale) {
  const t = DICT[locale].ui.map;
  const q = encodeURIComponent(query);
  const links = [
    [t.google, `https://www.google.com/maps/search/?api=1&query=${q}`],
    [t.apple, `https://maps.apple.com/?q=${q}`],
    [t.osm, `https://www.openstreetmap.org/search?query=${q}`],
  ];
  return html`<ul class="maplinks" aria-label="${t.title}">${links.map(
    ([label, href]) => html`<li>${arrowLink(href, label, { external: true, locale })}</li>`
  )}</ul>`;
}

// Externe Links aus dem Mini-Markup (Texte sind dort bereits escaped)
setExternalLinkRenderer((href, text, locale) =>
  arrowLink(raw(href), raw(text), { external: true, locale, cls: 'link-arrow link-arrow--quiet' })
);

export { rich };
