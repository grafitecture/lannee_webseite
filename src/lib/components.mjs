/**
 * Bausteine: Logo, Signets, Lockups, Icons, Bilder, Wochenuhr, Jahresuhr.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { html, raw, esc, rich } from './html.mjs';
import { DICT, url, pick, fill, formatTime } from './i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, SCHEDULE, CLOSURES } from '../content/site.mjs';
import { MEDIA } from '../content/media.mjs';
import { MONTHS } from '../content/year.mjs';

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

/** Subbrand-Lockup: Signet · L'ANNÉE · NAME · Huîtres & Bulles */
export function lockup(key, { cls = '', tagline = true, as = 'div' } = {}) {
  const L = LOCATIONS[key];
  const inner = html`${signet(key, { cls: 'lockup__signet' })}<span class="lockup__words">${logo({
    cls: 'lockup__logo',
    decorative: true,
  })}<span class="lockup__name"><span class="visually-hidden">L’ANNÉE </span>${L.name}</span>${
    tagline ? html`<span class="lockup__tagline" lang="fr">Huîtres &amp; Bulles</span>` : ''
  }</span>`;
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
  const pic = html`<picture class="pic ${cls}" style="--ph:${img.color}"><source type="image/avif" srcset="${srcset(
    'avif'
  )}" sizes="${sizes}"><source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}"><img src="/images/${name}-${fallback}.webp" width="${
    img.width
  }" height="${img.height}" alt="${altText}" ${loading} decoding="async"></picture>`;
  const t = DICT[locale].ui;
  const cap = caption ?? (media.visual ? t.visualisation : null);
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

/**
 * Nichtlineare Wochenskala: Montag–Donnerstag (96 h) auf 60° gestaucht,
 * Freitag–Sonntag (72 h) auf 300°. Samstag 12 Uhr liegt oben.
 */
export function weekAngle(hours) {
  const h = ((hours % 168) + 168) % 168;
  if (h < 96) return (150 + h * 0.625) % 360;
  return (210 + (h - 96) * (300 / 72)) % 360;
}

const hhmm = (s) => {
  const [h, m] = s.split(':').map(Number);
  return h + m / 60;
};

/* ------------------------------------------------------------------ */
/* Wochenuhr                                                           */
/* ------------------------------------------------------------------ */

const HUB_R = 236;

export function weekClock(locale, { id = 'wochenuhr' } = {}) {
  const t = DICT[locale].ui;
  const R = 380;
  const parts = [];

  // Grundring + Nabe für die Statusanzeige
  parts.push(`<circle class="wc__ring" r="${R}"/>`);
  parts.push(`<circle class="wc__hub" r="${HUB_R}"/>`);
  // gestauchter Wochenteil (Mo–Do)
  parts.push(`<path class="wc__weekdays" d="${arc(R, 150, 210)}"/>`);

  // Stundenstriche am Wochenende (alle 3 h), Tagesgrenzen kräftiger
  for (let h = 96; h <= 168; h += 3) {
    const a = weekAngle(h === 168 ? 167.999 : h);
    const major = (h - 96) % 24 === 0;
    const [x1, y1] = pt(R - (major ? 34 : 14), a);
    const [x2, y2] = pt(R + (major ? 34 : 0), a);
    parts.push(`<line class="wc__tick${major ? ' wc__tick--day' : ''}" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`);
  }
  // Tagesgrenzen Di, Mi, Do im gestauchten Teil
  for (let d = 1; d <= 3; d++) {
    const a = weekAngle(d * 24);
    const [x1, y1] = pt(R - 10, a);
    const [x2, y2] = pt(R + 10, a);
    parts.push(`<line class="wc__tick" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`);
  }

  // Öffnungs-Bögen + Beschriftung
  SCHEDULE.forEach((s, i) => {
    const L = LOCATIONS[s.location];
    const h0 = (s.day - 1) * 24 + hhmm(s.start);
    const h1 = (s.day - 1) * 24 + hhmm(s.end);
    const a0 = weekAngle(h0);
    const a1 = weekAngle(h1);
    if (s.openEnd) {
      // „ab … Uhr“: die letzte Stunde läuft blass aus – das Ende ist offen.
      const aTail = weekAngle(h1 - 1.25);
      parts.push(`<path class="wc__arc wc__arc--${L.key}" d="${arc(R, a0, aTail)}" data-slot="${i}"/>`);
      parts.push(`<path class="wc__arc wc__arc--${L.key} wc__arc--tail" d="${arc(R, aTail, a1)}" data-slot="${i}"/>`);
    } else {
      parts.push(`<path class="wc__arc wc__arc--${L.key}" d="${arc(R, a0, a1)}" data-slot="${i}"/>`);
    }
    const mid = (a0 + ((a1 - a0 + 360) % 360) / 2) % 360;
    const [lx, ly] = pt(R + 78, mid);
    const anchor = Math.abs(lx) < 60 ? 'middle' : lx > 0 ? 'start' : 'end';
    const time = s.openEnd
      ? fill(t.time.from, { t: formatTime(s.start, locale) })
      : fill(t.time.range, { a: formatTime(s.start, locale), b: formatTime(s.end, locale) });
    parts.push(
      `<text class="wc__label wc__label--${L.key}" x="${f(lx)}" y="${f(ly)}" text-anchor="${anchor}"><tspan class="wc__label-name" x="${f(
        lx
      )}" dy="-0.15em">${esc(L.name)}</tspan><tspan class="wc__label-time" x="${f(lx)}" dy="1.25em">${esc(time)}</tspan></text>`
    );
  });

  // Tagesnamen
  const dayLabel = (text, a, cls = '') => {
    const [x, y] = pt(R - 86, a);
    return `<text class="wc__day ${cls}" x="${f(x)}" y="${f(y)}" text-anchor="middle" dominant-baseline="middle">${esc(text)}</text>`;
  };
  parts.push(dayLabel(t.days[4], weekAngle(96 + 12)));
  parts.push(dayLabel(t.days[5], weekAngle(120 + 12)));
  parts.push(dayLabel(t.days[6], weekAngle(144 + 12)));
  parts.push(dayLabel(`${t.daysShort[0]}–${t.daysShort[3]}`, 180, 'wc__day--muted'));

  // Zeiger (wird per JS gedreht; ohne JS ausgeblendet): der Akzent läuft außen um die Mitte
  parts.push(`<g class="wc__hand" hidden><path d="${HAND_D}" transform="translate(0 -${HUB_R + 18}) scale(0.82)"/></g>`);

  const data = SCHEDULE.map((s) => ({
    loc: s.location,
    day: s.day,
    start: s.start,
    end: s.end,
    openEnd: !!s.openEnd,
  }));
  const strings = {
    ...t.clock,
    days: t.days,
    from: t.time.from,
    locations: Object.fromEntries(
      Object.values(LOCATIONS).map((L) => [
        L.key,
        { name: L.name, place: L.street ? `${L.street}, ${L.district}` : pick(DICT[locale].pages.marche.whereText, locale), url: url(L.key, locale) },
      ])
    ),
  };

  return html`<figure class="wc" id="${id}" data-week-clock data-locale="${locale}" data-schedule="${JSON.stringify(
    data
  )}" data-closures="${JSON.stringify(CLOSURES)}" data-strings="${JSON.stringify(strings)}">
    <svg class="wc__svg" viewBox="-560 -560 1120 1120" role="img" aria-labelledby="${id}-label"><title id="${id}-label">${
    t.clock.label
  }</title>${raw(parts.join(''))}</svg>
    <figcaption class="wc__status" aria-live="polite">
      <span class="wc__kicker">${t.clock.title}</span>
      <span class="wc__fallback">${t.clock.fallback}</span>
    </figcaption>
  </figure>`;
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

export { rich };
