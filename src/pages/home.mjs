import { html, raw, rich } from '../lib/html.mjs';
import { DICT, url } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, SITE } from '../content/site.mjs';
import { logo, lockup, picture, weekPlan, arrowLink, icon, closureNotes, LOGO_VIEWBOX } from '../lib/components.mjs';

const [, , LOGO_W, LOGO_H] = LOGO_VIEWBOX.split(/\s+/);
import { menuExcerpt } from '../lib/menu-render.mjs';
import { placeText } from '../lib/layout.mjs';

const PLACE_PHOTOS = { garage: 'garage-hof', kiosque: 'kiosque-visualisierung', marche: 'marche-wagen' };
const GALLERY = ['garage-austernbar', 'garage-boot', 'schweppes', 'huitres-glace', 'garage-eingang', 'baguettes', 'garage-wand', 'austern-oeffnen', 'garage-merci'];

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.home;

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

  return html`
<section class="hero" aria-labelledby="hero-title">
  <h1 class="visually-hidden" id="hero-title">${rich(p.h1, locale)}</h1>
  <div class="hero__mark" data-logo-morph style="--logo-ratio: ${LOGO_W} / ${LOGO_H}">${logo({ cls: 'hero__logo', decorative: true })}</div>
  <div class="hero__grid">
    <div class="hero__text">
      <p class="hero__tagline">${SITE.tagline}</p>
      <p class="hero__lead">${rich(p.lead, locale)}</p>
      <p class="live" data-live hidden><span class="live__dot" aria-hidden="true"></span><span class="live__text"></span></p>
      <div class="hero__actions">
        ${arrowLink(url('carte', locale), p.ctaMenu, { cls: 'btn btn--solid' })}
        <a class="btn btn--line" href="#wochenende"><span>${p.ctaWhere}</span></a>
      </div>
    </div>
    <div class="hero__media">
      ${picture('hero-austern-hof', locale, { sizes: '(min-width: 1024px) 60vw, 100vw', cls: 'hero__photo', eager: true })}
    </div>
  </div>
</section>

<section class="weekend" id="wochenende" aria-labelledby="weekend-title">
  <div class="weekend__intro">
    <h2 class="t-h3" id="weekend-title">${p.weekend.heading}</h2>
    <p class="lead">${rich(p.weekend.lead, locale)}</p>
  </div>
  ${weekPlan(locale)}
  ${closureNotes(locale, LOCATION_ORDER)}
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
