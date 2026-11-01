import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { html, raw, rich } from '../lib/html.mjs';
import { DICT, url } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, SITE } from '../content/site.mjs';
import { logo, lockup, picture, weekPlan, arrowLink, icon, closureNotes, LOGO_VIEWBOX } from '../lib/components.mjs';

const [, , LOGO_W, LOGO_H] = LOGO_VIEWBOX.split(/\s+/);
import { menuExcerpt } from '../lib/menu-render.mjs';
import { placeText } from '../lib/layout.mjs';

const PLACE_PHOTOS = { garage: 'garage-hof', kiosque: 'kiosque-visualisierung', marche: 'marche-wagen' };
/**
 * Hero: Filmsequenz im Stil eines Heimkino-Films der 50er/60er (Higgsfield AI, Kling 3.0; Nachbearbeitung mit ffmpeg).
 * Fischerei, Austern und die drei Orte; unscharf, verwackelt, verblasst, ohne Ton, in Schleife.
 * Querformat 960×540 und Hochformat 432×768 (für Handys), jeweils WebM und MP4 in /public/film.
 * Standbild davor (und bei reduzierter Bewegung): `hero-film`. Fehlen die Filmdateien, bleibt das frühere Stimmungsbild.
 */
const FILM_DIR = new URL('../../public/film/', import.meta.url);
const FILM = { wide: '/film/lannee-film-quer', tall: '/film/lannee-film-hoch' };
const FILM_READY = ['lannee-film-quer.mp4', 'lannee-film-hoch.mp4'].every((f) => fs.existsSync(new URL(f, FILM_DIR)));
// Version aus dem Inhalt: Ein neuer Schnitt bekommt eine neue Adresse (der Film wird lange zwischengespeichert)
const FILM_VERSION = FILM_READY
  ? createHash('sha256')
      .update(['lannee-film-quer.mp4', 'lannee-film-hoch.mp4', 'lannee-film-quer.webm', 'lannee-film-hoch.webm'].map((f) => fs.readFileSync(new URL(f, FILM_DIR))).reduce((a, b) => Buffer.concat([a, b])))
      .digest('hex')
      .slice(0, 8)
  : '';
const HERO_IMAGE = FILM_READY && fs.existsSync(new URL('../../public/images/hero-film-480.webp', import.meta.url)) ? 'hero-film' : 'hero-austern-hof';
const FILM_TOGGLE = {
  de: { pause: 'Film anhalten', play: 'Film abspielen' },
  fr: { pause: 'Mettre le film en pause', play: 'Lire le film' },
  en: { pause: 'Pause film', play: 'Play film' },
};
const HERO_PLACES_LABEL = { de: 'Drei Orte', fr: 'Trois adresses', en: 'Three places' };
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
        ${lockup(key, { cls: 'place__lockup', locale })}
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

  /* Hero: ein Dach (L’ANNÉE), darunter die drei Orte als Farbbänder */
  const heroPlaces = LOCATION_ORDER.map((key) => {
    const L = LOCATIONS[key];
    const P = t.pages[key];
    const where = L.street ? `${L.street}, ${L.district}` : P.whereText;
    return html`<li class="hero-place theme-${L.color}" data-place-live="${key}">
      <a class="hero-place__link" href="${url(key, locale)}">
        <span class="hero-place__top"><span class="hero-place__badge" hidden></span>${icon('arrow', { cls: 'icon hero-place__arrow' })}</span>
        <span class="hero-place__name">${L.name}</span>
        <span class="hero-place__sub">${rich(P.subtitle, locale)}</span>
        <span class="hero-place__when">${P.when}</span>
        <span class="hero-place__where">${where}</span>
      </a>
    </li>`;
  });

  return html`
<section class="hero${FILM_READY ? ' hero--film' : ''}" aria-labelledby="hero-title" data-hero>
  <h1 class="visually-hidden" id="hero-title">${rich(p.h1, locale)}</h1>
  <div class="hero__stage">
    ${picture(HERO_IMAGE, locale, { sizes: '100vw', cls: 'hero__bg', eager: true, alt: FILM_READY ? '' : undefined })}
    ${
      FILM_READY
        ? html`<div class="hero__film" data-film data-wide="${FILM.wide}" data-tall="${FILM.tall}" data-version="${FILM_VERSION}" aria-hidden="true"><video class="hero__video" muted loop playsinline preload="none" disablepictureinpicture disableremoteplayback></video></div>
    <button class="hero__toggle" type="button" data-film-toggle data-label-pause="${FILM_TOGGLE[locale].pause}" data-label-play="${FILM_TOGGLE[locale].play}" aria-label="${FILM_TOGGLE[locale].play}" hidden><span class="hero__toggle-icon" aria-hidden="true"></span></button>`
        : ''
    }
    <div class="hero__inner">
      <div class="hero__brand">
        <div class="hero__mark" data-logo-morph style="--logo-ratio: ${LOGO_W} / ${LOGO_H}">${logo({ cls: 'hero__logo', decorative: true })}</div>
        <p class="hero__tagline" data-tagline-morph>${SITE.taglines[locale]}</p>
      </div>
      <div class="hero__text">
        <p class="hero__lead">${rich(p.lead, locale)}</p>
      </div>
    </div>
    <ul class="hero__places" role="list" aria-label="${HERO_PLACES_LABEL[locale]}">${heroPlaces}</ul>
  </div>
</section>

<section class="weekend" id="wochenende" aria-labelledby="weekend-title">
  <nav class="wayfinder" aria-label="${p.wayfinder.label}">
    <ul class="wayfinder__list" role="list">
      <li class="wayfinder__item">
        <a class="wayfinder__card" href="#weekend-title" data-live>
          <span class="wayfinder__eyebrow"><span class="wayfinder__dot" aria-hidden="true"></span><span data-live-state>${p.wayfinder.planEyebrow}</span></span>
          <span class="wayfinder__title" data-live-name>${p.wayfinder.planTitle}</span>
          <span class="wayfinder__text" data-live-detail>${p.wayfinder.planText}</span>
          ${icon('arrow', { cls: 'icon wayfinder__arrow' })}
        </a>
      </li>
      <li class="wayfinder__item">
        <a class="wayfinder__card" href="${url('carte', locale)}">
          <span class="wayfinder__eyebrow">${p.wayfinder.menuEyebrow}</span>
          <span class="wayfinder__title">${p.ctaMenu}</span>
          <span class="wayfinder__text">${p.wayfinder.menuText}</span>
          ${icon('arrow', { cls: 'icon wayfinder__arrow' })}
        </a>
      </li>
      <li class="wayfinder__item">
        <a class="wayfinder__card" href="#orte">
          <span class="wayfinder__eyebrow">${p.wayfinder.whereEyebrow}</span>
          <span class="wayfinder__title">${p.ctaWhere}</span>
          <span class="wayfinder__text">${p.wayfinder.whereText}</span>
          ${icon('arrow', { cls: 'icon wayfinder__arrow' })}
        </a>
      </li>
    </ul>
  </nav>
  <div class="weekend__intro">
    <h2 class="t-h3" id="weekend-title">${p.weekend.heading}</h2>
    <p class="lead">${rich(p.weekend.lead, locale)}</p>
  </div>
  ${weekPlan(locale)}
  ${closureNotes(locale, LOCATION_ORDER)}
</section>

<div class="places" id="orte">${places}</div>

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
