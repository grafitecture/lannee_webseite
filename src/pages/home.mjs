/**
 * Startseite (Umbau 05.11.2026): Vollbild-Hero mit historischem Foto, Mega-Headline und den drei Orten
 * als Farbkacheln; darunter viel Weiß, große runde Bildkarten, historische Bilder im Wechsel mit echten Fotos.
 * Kein Film, keine Zeichnungen, keine Logo-Wanderung.
 */
import { html, rich } from '../lib/html.mjs';
import { DICT, url } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, SITE } from '../content/site.mjs';
import { picture, weekPlan, button, icon, closureNotes } from '../lib/components.mjs';
import { menuExcerpt } from '../lib/menu-render.mjs';
import { placeText } from '../lib/layout.mjs';

/** Jeder Ort: echtes Foto (groß) + historisches Bild (klein, überlappend). */
const PLACE_PHOTOS = {
  garage: { real: 'garage-hof', past: 'historisch-anstossen' },
  kiosque: { real: 'kiosque-visualisierung', past: 'historisch-tafel' },
  marche: { real: 'marche-wagen', past: 'historisch-austernbauer' },
};
const HERO_IMAGE = 'historisch-abend';
const HERO_PLACES_LABEL = { de: 'Drei Orte', fr: 'Trois adresses', en: 'Three places' };
/** Bilderreihe: historisch und echt im Wechsel. */
const GALLERY = [
  'historisch-junge',
  'garage-austernbar',
  'huitres-glace',
  'historisch-boot',
  'garage-boot',
  'schweppes',
  'historisch-haende',
  'garage-eingang',
  'baguettes',
  'historisch-coupes',
  'garage-wand',
  'garage-merci',
];

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.home;

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
<section class="hero" aria-labelledby="hero-title">
  ${picture(HERO_IMAGE, locale, { sizes: '100vw', cls: 'hero__bg', eager: true })}
  <div class="hero__inner">
    <h1 class="hero__title" id="hero-title">${p.headline.map((line) => html`<span class="hero__line">${line}</span> `)}</h1>
    <p class="hero__lead">${rich(p.lead, locale)}</p>
  </div>
  <ul class="hero__places" role="list" aria-label="${HERO_PLACES_LABEL[locale]}">${heroPlaces}</ul>
</section>

<section class="section weekend" id="wochenende" aria-labelledby="weekend-title">
  <div class="section__head">
    <h2 class="section__title" id="weekend-title">${p.weekend.heading}</h2>
    <p class="lead">${rich(p.weekend.lead, locale)}</p>
    <a class="live" href="#wochenende" data-live>
      <span class="live__dot" aria-hidden="true"></span>
      <span class="live__state" data-live-state>${p.wayfinder.planEyebrow}</span>
      <span class="live__name" data-live-name>${p.wayfinder.planTitle}</span>
      <span class="live__detail" data-live-detail>${p.wayfinder.planText}</span>
    </a>
  </div>
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
      ${button(url('carte', locale), p.carte.cta, { cls: 'btn btn--light' })}
    </div>
    ${picture('austernplatte', locale, { sizes: '(min-width: 1024px) 40vw, 100vw', cls: 'menu-panel__photo' })}
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
