/**
 * Startseite (Umbau 05.11.2026, seit 06.11.2026 hell): Hero mit Foto im Hintergrund (seit 08.11.2026,
 * `HERO_PHOTO` = garage-hof, Verlauf in 900), Mega-Headline weiß, Angebot des Wochenendes und die drei Orte
 * als helle Kacheln; darunter viel Weiß und große runde Bildkarten.
 * Kein Film, keine Zeichnungen, keine Logo-Wanderung. Nur echte Fotos, keine generierten Bilder (06.11.2026).
 */
import { html, rich, typo } from '../lib/html.mjs';
import { DICT, url, pick, formatEuro } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, SITE } from '../content/site.mjs';
import { picture, weekPlan, button, icon, closureNotes, berlinToday } from '../lib/components.mjs';
import { currentOffer, offerRegular, OFFER_UI } from '../content/offer.mjs';
import { menuExcerpt } from '../lib/menu-render.mjs';
import { placeText } from '../lib/layout.mjs';

/** Jeder Ort: Foto groß + ein Detailfoto als Abzug mit weißem Rand (klein, überlappend). Nur echte Fotos. */
const PLACE_PHOTOS = {
  garage: { real: 'garage-tresen', past: 'garage-austernbar' },
  kiosque: { real: 'schweppes', past: 'wein-eis' },
  marche: { real: 'marche-wagen', past: 'marche-auslage' },
};
/**
 * Hintergrund des Hero (Vorgabe 08.11.2026: „schönes Bild im Hintergrund“): Hof der Garage –
 * Weinlaub, Sonne, das L’ANNÉE-Schild („ein Plätzchen in der Sonne“). Bulles und die
 * Austern-Postkarte werden nicht mehr verwendet (Vorgabe 08.11.2026).
 */
const HERO_PHOTO = 'garage-hof';
const HERO_PLACES_LABEL = { de: 'Drei Orte', fr: 'Trois adresses', en: 'Three places' };
/** Bilderreihe: echte Fotos, keine Wiederholung der Bilder darüber. */
const GALLERY = [
  'garage-glaeser',
  'garage-eingang',
  'garage-bar',
  'garage-wand',
  'garage-sammlung',
  'hof-bistrotische',
  'garage-boot',
  'garage-fenster',
  'garage-weinlaub',
  'garage-merci',
];

/** „6.–8. November“ / „6–8 novembre“ / „6–8 November“ (über Monatsgrenzen: beide Monate). */
function dateRange(from, until, locale) {
  const intl = { de: 'de-DE', fr: 'fr-FR', en: 'en-GB' }[locale];
  const d = (ymd) => new Date(`${ymd}T12:00:00Z`);
  const month = (ymd) => new Intl.DateTimeFormat(intl, { month: 'long', timeZone: 'UTC' }).format(d(ymd));
  const day = (ymd) => d(ymd).getUTCDate();
  const dot = locale === 'de' ? '.' : '';
  if (month(from) === month(until)) return `${day(from)}${dot}–${day(until)}${dot} ${month(until)}`;
  return `${day(from)}${dot} ${month(from)} – ${day(until)}${dot} ${month(until)}`;
}

/**
 * Angebot des Wochenendes (seit 06.11.2026): Karte in 500 (Chartreuse, seit 08.11.2026; vorher Homard) im Hero. Inhalt: src/content/offer.mjs.
 * Normalpreise werden aus der Karte berechnet; nach `until` blendet das Skript die Karte aus.
 */
function weekendOffer(locale) {
  const o = currentOffer(berlinToday());
  if (!o) return '';
  const U = OFFER_UI;
  const regular = offerRegular(o);
  const was = (v) => html`<span class="offer__was">${pick(U.was, locale)} <s>${formatEuro(v, locale)}</s></span>`;
  return html`<aside class="offer" aria-labelledby="offer-title" data-expires="${o.until}">
    <p class="offer__eyebrow"><span class="offer__badge">${pick(U.eyebrow, locale)}</span><span class="offer__dates">${dateRange(o.from, o.until, locale)}</span></p>
    <h2 class="offer__title" id="offer-title">${pick(o.title, locale)}</h2>
    <p class="offer__text">${rich(pick(o.text, locale), locale)}</p>
    <div class="offer__prices">
      <p class="offer__price"><span class="offer__amount">${formatEuro(o.price, locale)}</span> <span class="offer__side"><span class="offer__per">${pick(U.per, locale)}</span> ${was(regular.base)}</span></p>
      ${o.upgrade
        ? html`<p class="offer__alt"><span class="offer__alt-label">${pick(o.upgradeLabel, locale)}</span> <strong class="offer__alt-price">${formatEuro(o.upgrade.price, locale)}</strong> ${was(regular.upgrade)}</p>`
        : ''}
    </div>
    <ul class="offer__where" role="list">${o.where.map(
      (k) => html`<li><a class="offer__link" href="${url(k, locale)}"><span>${typo(pick(U.where[k], locale), locale)}</span>${icon('arrow', { cls: 'icon offer__arrow' })}</a></li>`
    )}</ul>
    <p class="offer__note">${typo(pick(o.note, locale), locale)}</p>
  </aside>`;
}

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.home;
  const offer = weekendOffer(locale);

  /* Hero: die drei Orte als Kacheln in ihren Farben – man sieht sofort, dass es drei gibt */
  const heroPlaces = LOCATION_ORDER.map((key) => {
    const L = LOCATIONS[key];
    const P = t.pages[key];
    const where = L.street ? L.district : P.whereShort ?? P.whereText;
    return html`<li><a class="hero-place hero-place--${key}" href="${url(key, locale)}">
      <span class="hero-place__name">${L.name}</span>
      <span class="hero-place__when">${P.when}</span>
      <span class="hero-place__where">${where}</span>
      ${icon('arrow', { cls: 'icon hero-place__arrow' })}
    </a></li>`;
  });

  const places = LOCATION_ORDER.map((key, i) => {
    const L = LOCATIONS[key];
    const c = p.places[key];
    const img = PLACE_PHOTOS[key];
    return html`<section class="place place--${key}${i % 2 ? ' place--flip' : ''}" aria-labelledby="place-${key}">
      <div class="place__media">
        ${picture(img.real, locale, { sizes: '(min-width: 1024px) 50vw, 100vw', cls: 'place__photo' })}
        ${picture(img.past, locale, { sizes: '(min-width: 1024px) 20vw, 40vw', cls: 'place__past' })}
      </div>
      <div class="place__text">
        <p class="place__name"><span class="dot dot--${key}" aria-hidden="true"></span>${L.name}</p>
        <h2 class="place__heading" id="place-${key}">${c.heading}</h2>
        <p class="place__body">${rich(c.body, locale)}</p>
        <dl class="place__facts">
          <div><dt>${t.ui.facts.when}</dt><dd>${t.pages[key].when}</dd></div>
          <div><dt>${t.ui.facts.where}</dt><dd>${placeText(key, locale)}</dd></div>
        </dl>
        ${button(url(key, locale), c.cta, { cls: `btn btn--${key}` })}
      </div>
    </section>`;
  });

  return html`
<section class="hero${offer ? ' hero--offer' : ''}" aria-labelledby="hero-title">
  ${picture(HERO_PHOTO, locale, { sizes: '100vw', cls: 'hero__bg', eager: true, alt: '' })}
  <div class="hero__inner">
    <div class="hero__text">
      <h1 class="hero__title" id="hero-title">${p.headline.map((line) => html`<span class="hero__line">${line}</span> `)}</h1>
      <p class="hero__lead">${rich(p.lead, locale)}</p>
    </div>
    ${offer}
  </div>
  <ul class="hero__places" role="list" aria-label="${HERO_PLACES_LABEL[locale]}">${heroPlaces}</ul>
</section>

<section class="hours" id="wochenende" aria-labelledby="hours-title">
  <h2 class="visually-hidden" id="hours-title">${p.hours}</h2>
  ${weekPlan(locale)}
  ${closureNotes(locale, LOCATION_ORDER)}
</section>

<div class="places" id="orte">${places}</div>

<section class="photo-row" aria-label="${{ de: 'Fotos', fr: 'Photos', en: 'Photos' }[locale]}">
  <ul class="photo-row__track" role="list">${GALLERY.map(
    (name) => html`<li class="photo-row__item">${picture(name, locale, { sizes: '(min-width: 1024px) 30vw, 78vw' })}</li>`
  )}</ul>
</section>

<section class="menu-panel" aria-labelledby="menu-title">
  <div class="menu-panel__inner theme-ink">
    <div class="menu-panel__head">
      <h2 class="section__title" id="menu-title">${p.carte.heading}</h2>
      <p class="lead">${rich(p.carte.lead, locale)}</p>
      ${button(url('carte', locale), p.carte.cta, { cls: 'btn btn--solid' })}
    </div>
    ${picture('huitres-glace', locale, { sizes: '(min-width: 1024px) 40vw, 100vw', cls: 'menu-panel__photo' })}
    <div class="menu-panel__list">
      ${menuExcerpt(locale, { signatureOnly: true, limit: 6 })}
    </div>
  </div>
</section>

<section class="insta">
  <p class="insta__text">${rich(p.insta, locale)}</p>
  ${button(SITE.instagram.url, SITE.instagram.handle, { cls: 'btn btn--solid', external: true, locale })}
</section>
`;
}

export const meta = { key: 'home', og: 'lannee' };
