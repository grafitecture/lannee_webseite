import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { html, raw, rich } from '../lib/html.mjs';
import { DICT, url } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, SITE } from '../content/site.mjs';
import { logo, lockup, picture, weekPlan, arrowLink, icon, closureNotes, LOGO_RATIO } from '../lib/components.mjs';

import { menuExcerpt } from '../lib/menu-render.mjs';
import { venueArt } from '../lib/venue-art.mjs';
import { placeText } from '../lib/layout.mjs';
import { scribbles } from '../lib/scribbles.mjs';

const PLACE_PHOTOS = { garage: 'garage-hof', kiosque: 'kiosque-visualisierung', marche: 'marche-wagen' };
/**
 * Hero: Filmsequenz im Stil eines Heimkino-Films der 50er/60er (Higgsfield AI, Kling 3.0; Nachbearbeitung mit ffmpeg).
 * Nur frei erfundene Szenen rund um Meer, Fischerei und Austern – keine Animationen aus Fotos der Orte
 * (Vorgabe 05.11.2026); unscharf, verwackelt, verblasst, ohne Ton, in Schleife.
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
const HERO_PLACES_LABEL = { de: 'Drei Orte', fr: 'Trois adresses', en: 'Three places' };
const GALLERY = ['garage-austernbar', 'garage-boot', 'schweppes', 'huitres-glace', 'garage-eingang', 'baguettes', 'garage-wand', 'austern-oeffnen', 'garage-merci'];

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.home;

  /* Drei Orte als große Farbflächen */
  /* Startseite: die Motive aus dem Briefing gezielt verteilt (Anker, Herz, Austernmesser, Handschuh,
     Champagner, Korken, Boot, Fisch, Besteck); Sprüche je Sprache passend */
  const PLACE_SCRIBBLES = [
    [
      { at: 'r', yb: '2%', s: 'l', bleed: 0.28, prefer: ['anker'] },
      { at: 'r', y: '5%', s: 'm', bleed: 0.22, prefer: ['coupes'], wide: true },
      { at: 'free', x: '66%', y: '15%', s: 's', kind: 'claim', prefer: ['a-la-votre'], wide: true },
    ],
    [
      { at: 'l', y: '7%', s: 'm', bleed: 0.3, prefer: ['korken'] },
      { at: 'free', x: '28%', y: '86%', s: 's', kind: 'claim', prefer: ['huitres-bulles'], wide: true },
    ],
    [
      { at: 'r', yb: '4%', s: 'l', bleed: 0.3, prefer: ['fischerboot'] },
      { at: 'r', y: '6%', s: 's', bleed: 0.2, prefer: ['austernmesser'], wide: true },
      { at: 'l', y: '3%', s: 's', bleed: 0.38, prefer: ['handschuh'], wide: true },
      { at: 'free', x: '62%', y: '15%', s: 's', prefer: ['moewe'], wide: true },
    ],
  ];
  const places = LOCATION_ORDER.map((key, i) => {
    const L = LOCATIONS[key];
    const c = p.places[key];
    return html`<section class="place theme-${L.color}${i % 2 ? ' place--flip' : ''} has-scribbles" aria-labelledby="place-${key}">
      ${scribbles(ctx, PLACE_SCRIBBLES[i % PLACE_SCRIBBLES.length])}
      <div class="place__text">
        ${venueArt(key, { cls: 'place__art' })}
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
    const where = L.street ? `${L.street}, ${L.district}` : P.whereShort ?? P.whereText;
    return html`<li class="hero-place theme-${L.color}">
      <a class="hero-place__link" href="${url(key, locale)}">
        ${icon('arrow', { cls: 'icon hero-place__arrow' })}
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
        ? html`<div class="hero__film" data-film data-wide="${FILM.wide}" data-tall="${FILM.tall}" data-version="${FILM_VERSION}" aria-hidden="true"><video class="hero__video" muted loop playsinline preload="none" disablepictureinpicture disableremoteplayback></video></div>`
        : ''
    }
    <div class="hero__inner">
      <div class="hero__brand">
        <div class="hero__mark" data-logo-morph style="--logo-ratio: ${LOGO_RATIO}">${logo({ cls: 'hero__logo', decorative: true, eager: true, sizes: 'min(100vw, 56rem)' })}</div>
        <p class="hero__tagline" data-tagline-morph>${SITE.taglines[locale]}</p>
      </div>
      <div class="hero__text">
        <p class="hero__lead">${rich(p.lead, locale)}</p>
      </div>
    </div>
    <ul class="hero__places" role="list" aria-label="${HERO_PLACES_LABEL[locale]}">${heroPlaces}</ul>
  </div>
</section>

<section class="weekend has-scribbles" id="wochenende" aria-labelledby="weekend-title">
  ${scribbles(ctx, [
    { at: 'free', x: '78%', y: '5.5%', s: 's', kind: 'claim', prefer: ['meer-geht-immer', 'life-is-short', 'les-mois-en-r'], wide: true },
    { at: 'b', x: '60%', s: 'm', bleed: 0.32, prefer: ['fischgraete'] },
  ])}
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

<section class="teaser-menu has-scribbles" aria-labelledby="menu-title">
  ${scribbles(ctx, [
    { at: 'free', x: '89%', y: '86%', s: 's', prefer: ['gabel-messer'], wide: true },
    { at: 'free', x: '30%', y: '8%', s: 's', kind: 'claim', prefer: ['ein-dutzend', 'shuck-it', 'encore-une'], wide: true },
    { at: 'free', x: '32%', y: '90%', s: 's', prefer: ['auster'], wide: true },
  ])}
  <div class="teaser-menu__head">
    <h2 class="t-h2" id="menu-title">${p.carte.heading}</h2>
    <p class="lead">${rich(p.carte.lead, locale)}</p>
    ${arrowLink(url('carte', locale), p.carte.cta, { cls: 'btn btn--solid' })}
  </div>
  <div class="teaser-menu__list">
    ${menuExcerpt(locale, { signatureOnly: true, limit: 6 })}
  </div>
</section>

<section class="gallery" aria-label="${{ de: 'Fotos', fr: 'Photos', en: 'Photos' }[locale]}">
  <ul class="gallery__track" role="list">${GALLERY.map(
    (name) => html`<li class="gallery__item">${picture(name, locale, { sizes: '(min-width: 1024px) 28vw, 70vw' })}</li>`
  )}</ul>
</section>

<section class="insta has-scribbles">
  ${scribbles(ctx, [{ at: 'free', x: '74%', y: '64%', s: 's', kind: 'claim', prefer: ['schluerfen', 'aw-shucks', 'salut-les-huitres'], wide: true }])}
  <p class="insta__text">${rich(p.insta, locale)}</p>
  ${arrowLink(SITE.instagram.url, SITE.instagram.handle, { cls: 'link-arrow insta__link', external: true, locale })}
</section>
`;
}

export const meta = { key: 'home', og: 'lannee' };
