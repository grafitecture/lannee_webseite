import { html, raw, rich } from '../lib/html.mjs';
import { DICT, url, pick, fill, formatTime } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, SCHEDULE, SITE } from '../content/site.mjs';
import { MONTHS } from '../content/year.mjs';
import { logo, signet, lockup, picture, weekClock, yearRing, arrowLink, icon, closureNotes } from '../lib/components.mjs';
import { menuExcerpt } from '../lib/menu-render.mjs';
import { placeText } from '../lib/layout.mjs';

const PLACE_PHOTOS = { garage: 'garage-hof', kiosque: 'kiosque-visualisierung', marche: 'marche-wagen' };
const GALLERY = ['garage-austernbar', 'garage-boot', 'schweppes', 'huitres-glace', 'garage-eingang', 'baguettes', 'garage-wand', 'austern-oeffnen', 'garage-merci'];

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.home;

  /* Fahrplan (Gezeitentafel des Wochenendes) */
  const timetable = SCHEDULE.map((s, i) => {
    const L = LOCATIONS[s.location];
    const note = p.weekend.notes[`${s.location}-${s.day}`];
    return html`<li class="tide tide--${L.key}" data-slot="${i}">
      <a class="tide__link" href="${url(L.key, locale)}">
        <span class="tide__day">${t.ui.days[s.day - 1]}</span>
        <span class="tide__time">${formatTime(s.start, locale)}</span>
        <span class="tide__name">${signet(L.key, { cls: 'tide__signet' })}<span>${L.name}</span></span>
        <span class="tide__place">${L.street ? `${L.street}, ${L.district}` : t.pages.marche.whereText}</span>
        <span class="tide__note">${note}</span>
        <span class="tide__pause"><span class="closure__icon" aria-hidden="true"></span>${t.ui.clock.paused}</span>
      </a>
    </li>`;
  });

  /* Drei Orte als große Farbflächen */
  const places = LOCATION_ORDER.map((key, i) => {
    const L = LOCATIONS[key];
    const c = p.places[key];
    return html`<section class="place theme-${L.color}${i % 2 ? ' place--flip' : ''}" aria-labelledby="place-${key}">
      <div class="place__text">
        ${lockup(key, { cls: 'place__lockup' })}
        <h2 class="place__heading t-h3" id="place-${key}">${c.heading}</h2>
        <p class="place__body">${rich(c.body, locale)}</p>
        <dl class="place__facts">
          <div><dt>${t.ui.facts.when}</dt><dd>${t.pages[key].when}</dd></div>
          <div><dt>${t.ui.facts.where}</dt><dd>${placeText(key, locale)}</dd></div>
        </dl>
        ${arrowLink(url(key, locale), c.cta, { cls: 'btn btn--line' })}
      </div>
      <div class="place__media">
        ${picture(PLACE_PHOTOS[key], locale, { sizes: '(min-width: 1024px) 58vw, 100vw', cls: 'place__photo' })}
        <span class="place__name" aria-hidden="true">${L.name}</span>
      </div>
    </section>`;
  });

  /* Jahr-Teaser: aktueller Monat wird per JS markiert, Build-Monat als Startwert */
  const month = MONTHS[new Date().getMonth()];

  return html`
<section class="hero" aria-labelledby="hero-title">
  <h1 class="visually-hidden" id="hero-title">${rich(p.h1, locale)}</h1>
  <div class="hero__mark">${logo({ cls: 'hero__logo', decorative: true })}</div>
  <div class="hero__grid">
    <div class="hero__text">
      <p class="hero__tagline" lang="fr">Huîtres &amp; Bulles</p>
      <p class="hero__lead">${rich(p.lead, locale)}</p>
      <p class="live" data-live hidden><span class="live__dot" aria-hidden="true"></span><span class="live__text"></span></p>
      <div class="hero__actions">
        ${arrowLink(url('carte', locale), p.ctaMenu, { cls: 'btn btn--solid' })}
        <a class="btn btn--line" href="#wochenende"><span>${p.ctaWhere}</span></a>
      </div>
    </div>
    <div class="hero__media">
      ${picture('bulles', locale, { sizes: '(min-width: 1024px) 60vw, 100vw', cls: 'hero__photo', eager: true })}
    </div>
  </div>
</section>

<section class="weekend" id="wochenende" aria-labelledby="weekend-title">
  <div class="weekend__intro">
    <h2 class="t-h3" id="weekend-title">${p.weekend.heading}</h2>
    <p class="lead">${rich(p.weekend.lead, locale)}</p>
  </div>
  <div class="weekend__grid">
    <div class="weekend__clock">${weekClock(locale)}</div>
    <div class="weekend__side">
      <ol class="tides" role="list">${timetable}</ol>
      ${closureNotes(locale, LOCATION_ORDER)}
    </div>
  </div>
</section>

<div class="places">${places}</div>

<section class="teaser-menu" aria-labelledby="menu-title">
  <div class="teaser-menu__head">
    <h2 class="t-h2" id="menu-title">${p.carte.heading}</h2>
    <p class="lead">${rich(p.carte.lead, locale)}</p>
    ${arrowLink(url('carte', locale), p.carte.cta, { cls: 'btn btn--solid' })}
  </div>
  <div class="teaser-menu__list">
    ${menuExcerpt(locale, { signatureOnly: true, limit: 6 })}
  </div>
  <div class="teaser-menu__icons" aria-hidden="true">${['oyster', 'flute', 'shrimp', 'lemon', 'sardines', 'wine'].map((n) => icon(n, { cls: 'icon icon--float' }))}</div>
</section>

<section class="teaser-year" aria-labelledby="year-title">
  <div class="teaser-year__ring">${yearRing(locale, { id: 'jahresuhr-start' })}</div>
  <div class="teaser-year__text">
    <h2 class="t-h3" id="year-title">${p.year.heading}</h2>
    <p class="lead">${rich(p.year.body, locale)}</p>
    <div class="month-now" data-month-now data-months="${JSON.stringify(
      MONTHS.map((m) => ({ n: m.n, icon: m.icon, name: pick(m.name, locale), title: pick(m.title, locale), text: pick(m.text, locale) }))
    )}" data-template="${p.year.now}">
      <p class="month-now__label">${fill(p.year.now, { month: pick(month.name, locale) })}</p>
      <p class="month-now__title">${icon(month.icon, { cls: 'icon month-now__icon' })}<span>${pick(month.title, locale)}</span></p>
      <p class="month-now__text">${rich(pick(month.text, locale), locale)}</p>
    </div>
    ${arrowLink(url('annee', locale), p.year.cta, { cls: 'btn btn--line' })}
  </div>
</section>

<section class="gallery" aria-label="${{ de: 'Fotos', fr: 'Photos', en: 'Photos' }[locale]}">
  <ul class="gallery__track" role="list">${GALLERY.map(
    (name) => html`<li class="gallery__item">${picture(name, locale, { sizes: '(min-width: 1024px) 28vw, 70vw' })}</li>`
  )}</ul>
</section>

<section class="insta">
  <p class="insta__text">${rich(p.insta, locale)}</p>
  ${arrowLink(SITE.instagram.url, SITE.instagram.handle, { cls: 'link-arrow insta__link', external: true, locale })}
</section>
`;
}

export const meta = { key: 'home', og: 'lannee' };
