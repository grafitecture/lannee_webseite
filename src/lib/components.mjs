/**
 * Bausteine: Logo, Lockups, Icons, Bilder, Wochenplan.
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
 * Logo (seit 03.11.2026): weiße, gestrichene Holzbuchstaben L’ANNÉE, freigestelltes Rasterbild
 * (Quelle assets-src/logo-lannee-holz.png, AVIF/WebP aus scripts/images.mjs).
 * Weiß gehört auf Blau: Das Logo steht immer auf einer blauen Fläche.
 * Das frühere Vektor-Logo (src/icons/logo-raw.svg) liefert nur noch das Favicon („L’“).
 */
export const LOGO = IMAGES['logo-lannee'];
export const LOGO_RATIO = `${LOGO.width} / ${LOGO.height}`;
/** Breite ÷ Höhe als Zahl: Wo die Höhe vorgegeben ist (Kopfzeile, Lockup), rechnet das CSS die Breite
 *  damit aus. Nur über aspect-ratio bleibt das Logo in Safari in Flex-Zeilen sonst 0 px breit. */
export const LOGO_ASPECT = (LOGO.width / LOGO.height).toFixed(4);

/**
 * Logo als <picture> (AVIF, WebP). Die Box hält das Seitenverhältnis (.brand-logo in 03-components.css),
 * Größe kommt über die Klasse (Höhe oder Breite). sizes = angezeigte Breite für die Bildauswahl.
 */
export function logo({ cls = 'logo', label = 'L’ANNÉE', decorative = false, sizes = '12rem', eager = false } = {}) {
  const srcset = (fmt) => LOGO.widths.map((w) => `/images/logo-lannee-${w}.${fmt} ${w}w`).join(', ');
  const fallback = LOGO.widths.find((w) => w >= 480) ?? LOGO.widths.at(-1);
  return html`<picture class="brand-logo ${cls}" style="--logo-ratio: ${LOGO_RATIO}; --logo-aspect: ${LOGO_ASPECT}"${decorative ? raw(' aria-hidden="true"') : ''}><source type="image/avif" srcset="${srcset(
    'avif'
  )}" sizes="${sizes}"><source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}"><img src="/images/logo-lannee-${fallback}.webp" width="${
    LOGO.width
  }" height="${LOGO.height}" alt="${decorative ? '' : label}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></picture>`;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

/*
 * Austern-Strichzeichnungen (nur Austernatlas, wieder seit 06.11.2026): eigenes Sprite,
 * das nur die Atlas-Seite lädt (die Zeichnungen sind zusammen gut 260 KB).
 */
let ATLAS_SPRITE_URL = '/assets/atlas.svg';
export const setAtlasSpriteUrl = (u) => (ATLAS_SPRITE_URL = u);

export function buildAtlasSprite() {
  return `<svg xmlns="http://www.w3.org/2000/svg">${oysterArt().map((a) => a.symbol).join('')}</svg>`;
}

/** Austern-Strichzeichnung aus dem Atlas-Sprite, links bündig im Rahmen. */
export function oysterDrawing(key, { cls = 'oyster__svg' } = {}) {
  const art = oysterArt().find((a) => a.key === key);
  if (!art) throw new Error(`Austern-Zeichnung fehlt: ${key}`);
  return html`<svg class="${cls}" viewBox="0 0 ${art.width} ${art.height}" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false"><use href="${ATLAS_SPRITE_URL}#oy-${key}"/></svg>`;
}

let SPRITE_URL = '/assets/icons.svg';
export const setSpriteUrl = (u) => (SPRITE_URL = u);

export function icon(name, { cls = 'icon', label } = {}) {
  return label
    ? html`<svg class="${cls}" role="img" aria-label="${label}"><use href="${SPRITE_URL}#${name}"/></svg>`
    : html`<svg class="${cls}" aria-hidden="true" focusable="false"><use href="${SPRITE_URL}#${name}"/></svg>`;
}

/**
 * Sprite mit den wenigen funktionalen Icons (Pfeile, Instagram).
 * Zeichnungen (Austern, Orte, Embleme) gibt es seit dem Umbau am 05.11.2026 nicht mehr.
 */
export function buildSprite() {
  const symbols = [
    `<symbol id="arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M4 12h15M13 6l6 6-6 6"/></symbol>`,
    `<symbol id="arrow-out" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></symbol>`,
    `<symbol id="instagram" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></g></symbol>`,
  ];
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
/* Öffnungszeiten (06.11.2026, ersetzt die Wochenplan-Karten):          */
/* ganz dezent als schlichte Zeile – je Öffnungstag der Tag, darin die  */
/* Orte mit Farbpunkt und Uhrzeit. Keine Karten, keine Überschrift.     */
/* main.js (initPlan) schreibt „heute“/„morgen“ an die Tage und         */
/* markiert, was gerade geöffnet hat oder diesmal Pause macht.          */
/* ------------------------------------------------------------------ */

const cap = (s) => s.charAt(0).toLocaleUpperCase() + s.slice(1);

export function weekPlan(locale) {
  const T = DICT[locale];
  const t = T.ui;

  const slot = (s, i) => {
    const L = LOCATIONS[s.location];
    const time = s.openEnd ? fill(t.time.from, { t: formatTime(s.start, locale) }) : formatSpan(s.start, s.end, locale);
    return html`<li><a class="plan__slot" href="${url(L.key, locale)}" data-slot="${i}"><span class="dot dot--${L.key}" aria-hidden="true"></span><span class="plan__name">${
      L.name
    }</span> <span class="plan__time">${typo(time, locale)}</span><span class="plan__state" data-state></span></a></li>`;
  };

  // Nur die Tage, an denen wir geöffnet haben (Vorgabe 01.11.2026: keine Zeile „Mo – Do geschlossen“)
  const rows = [];
  for (let day = 1; day <= 7; day++) {
    const slots = SCHEDULE.map((s, i) => [s, i]).filter(([s]) => s.day === day);
    if (slots.length) rows.push({ day, slots });
  }

  const days = rows.map(
    (r) => html`<li class="plan__day" data-days="${r.day}"><h3 class="plan__dayname">${cap(t.days[r.day - 1])}<span class="plan__date"></span></h3><ul class="plan__slots" role="list">${r.slots.map(
      ([s, i]) => slot(s, i)
    )}</ul></li>`
  );

  // Daten für die Live-Markierung (main.js)
  const data = SCHEDULE.map((s, i) => ({ i, loc: s.location, day: s.day, start: s.start, end: s.end, openEnd: !!s.openEnd }));
  const strings = { open: t.live.open, paused: t.live.paused, today: t.live.today, tomorrow: t.live.tomorrow };

  return html`<div class="plan" data-plan data-schedule="${JSON.stringify(data)}" data-closures="${JSON.stringify(
    CLOSURES
  )}" data-strings="${JSON.stringify(strings)}">
  <ol class="plan__days" role="list">${days}</ol>
</div>`;
}

/* ------------------------------------------------------------------ */
/* Kleinteile                                                          */
/* ------------------------------------------------------------------ */

/**
 * Button in Pillenform (Umbau 05.11.2026). Varianten über die Klasse:
 * btn--solid (Bleu nuit), btn--light (weiß auf Blau), btn--line, btn--garage/--kiosque/--marche.
 */
export function button(href, label, { cls = 'btn btn--solid', external = false, locale = 'de' } = {}) {
  const ext = external ? raw(` target="_blank" rel="noopener"`) : '';
  return html`<a class="${cls}" href="${href}"${ext}><span>${label}</span>${
    external ? html`${icon('arrow-out', { cls: 'icon icon--arrow' })}<span class="visually-hidden"> ${DICT[locale].ui.external}</span>` : ''
  }</a>`;
}

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
    return html`<p class="closure" data-expires="${c.to}"><span>${rich(
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
