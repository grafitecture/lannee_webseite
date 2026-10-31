/**
 * Bausteine: Logo, Signets, Lockups, Icons, Bilder, Wochenplan.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { html, raw, esc, rich, typo, setExternalLinkRenderer } from './html.mjs';
import { DICT, url, pick, fill, formatTime, formatSpan } from './i18n.mjs';
import { SITE, LOCATIONS, LOCATION_ORDER, SCHEDULE, CLOSURES } from '../content/site.mjs';
import { MEDIA } from '../content/media.mjs';
import { oysterArt } from './oyster-art.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

export const IMAGES = JSON.parse(read('src/content/images.json'));

/* ------------------------------------------------------------------ */
/* Logo & Zeiger                                                       */
/* ------------------------------------------------------------------ */

/**
 * Logo: weiße Holzbuchstaben (freigestelltes Rasterbild, AVIF/WebP aus scripts/images.mjs).
 * Weiß gehört auf Grün: Das Logo steht immer auf einer grünen Fläche.
 */
export const LOGO = IMAGES['logo-lannee'];

/**
 * Der Zeiger der Signets ist der Akzent aus dem É des früheren Logos: Spitze nach außen,
 * breites Ende am Drehpunkt. Länge 100 Einheiten, Drehpunkt (0,0), zeigt nach oben.
 */
const accentPts = read('src/icons/accent-hand.txt')
  .match(/-?\d+(?:\.\d+)?/g)
  .map(Number);
const handPts = [];
for (let i = 0; i < accentPts.length; i += 2) handPts.push([accentPts[i] * 0.8, -accentPts[i + 1] - 76]);
export const HAND_D = 'M' + handPts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z';

export function logo({ cls = 'logo', label = 'L’ANNÉE', decorative = false, sizes = '12rem', eager = false } = {}) {
  const srcset = (fmt) => LOGO.widths.map((w) => `/images/logo-lannee-${w}.${fmt} ${w}w`).join(', ');
  const fallback = LOGO.widths.find((w) => w >= 480) ?? LOGO.widths.at(-1);
  const loading = eager ? raw('loading="eager"') : raw('loading="lazy"');
  return html`<picture class="${cls}"${decorative ? raw(' aria-hidden="true"') : ''}><source type="image/avif" srcset="${srcset(
    'avif'
  )}" sizes="${sizes}"><source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}"><img src="/images/logo-lannee-${fallback}.webp" width="${
    LOGO.width
  }" height="${LOGO.height}" alt="${decorative ? '' : label}" ${loading} decoding="async"></picture>`;
}

/**
 * Bildmarke: Logo mit „Austern & Bulles“ darunter. Der Slogan läuft gesperrt über die volle
 * Logobreite (Schriftgröße in cqi, siehe .mark in 03-components.css) und skaliert mit dem Logo –
 * groß im Hero, klein in Kopf- und Fußzeile. So wandert er beim Schrumpfen mit.
 */
export function brandmark({ cls = '', sizes = '12rem', eager = false } = {}) {
  return html`<span class="mark ${cls}" aria-hidden="true">${logo({ cls: 'mark__logo', decorative: true, sizes, eager })}<span class="mark__tagline">${
    SITE.tagline
  }</span></span>`;
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
export function lockup(key, { cls = '', tagline = true, as = 'div', sizes = '20rem' } = {}) {
  const L = LOCATIONS[key];
  const inner = html`${logo({ cls: 'lockup__logo', decorative: true, sizes })}<span class="lockup__words"><span class="lockup__name"><span class="visually-hidden">L’ANNÉE </span>${
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

  // Tage 1–7; aufeinanderfolgende Tage ohne Öffnung werden zu einer Zeile zusammengefasst
  const rows = [];
  for (let day = 1; day <= 7; day++) {
    const slots = SCHEDULE.map((s, i) => [s, i]).filter(([s]) => s.day === day);
    const last = rows.at(-1);
    if (!slots.length && last?.rest) last.days.push(day);
    else rows.push({ days: [day], rest: !slots.length, slots });
  }

  const head = (r) => {
    const name =
      r.days.length > 1
        ? html`<span aria-hidden="true">${cap(t.daysShort[r.days[0] - 1])} – ${t.daysShort[r.days.at(-1) - 1]}</span><span class="visually-hidden">${fill(
            t.time.range,
            { a: t.days[r.days[0] - 1], b: t.days[r.days.at(-1) - 1] }
          )}</span>`
        : cap(t.days[r.days[0] - 1]);
    return html`<div class="plan__head"><h3 class="plan__dayname">${name}</h3><p class="plan__date"></p></div>`;
  };

  const days = rows.map((r) =>
    r.rest
      ? html`<li class="plan__day plan__day--rest" data-days="${r.days.join(',')}">${head(r)}<div class="plan__track plan__track--rest"><p class="plan__closed">${
          t.live.closed
        }</p></div></li>`
      : html`<li class="plan__day" data-days="${r.days.join(',')}">${head(r)}<div class="plan__track"><ul class="plan__slots" role="list">${r.slots.map(([s, i]) =>
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
