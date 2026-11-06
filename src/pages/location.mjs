/**
 * Ortsseiten: Garage, Kiosque, Marché – gleicher Aufbau, eigene Farbe (Umbau 05.11.2026):
 * Vollbild-Foto mit großem Namen, Fakten als runde Karten, Zitat, Intro mit Foto (nur echte Fotos, 06.11.2026),
 * Karte als Farbfläche, Bilderreihe, Viertel, Anfahrt, die beiden anderen Orte. Keine Zeichnungen.
 */
import { html, raw, rich } from '../lib/html.mjs';
import { DICT, url, pick, formatTime } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, MARCHE_DATES, SITE } from '../content/site.mjs';
import { picture, button, mapLinks, icon, closureNotes, berlinToday } from '../lib/components.mjs';
import { menuExcerpt } from '../lib/menu-render.mjs';
import { placeText } from '../lib/layout.mjs';

const CONFIG = {
  garage: {
    hero: 'garage-hof',
    past: 'garage-tresen',
    quarter: null,
    gallery: ['garage-glaeser', 'garage-bar', 'garage-austernbar', 'garage-boot', 'garage-sammlung', 'garage-fenster', 'schweppes', 'garage-eingang', 'hof-bistrotische', 'garage-weinlaub', 'garage-merci'],
  },
  kiosque: {
    hero: 'bulles',
    past: 'huitres-glace',
    quarter: null,
    gallery: ['austern-postkarte', 'wein-eis', 'austern-oeffnen'],
  },
  marche: {
    hero: 'marche-wagen',
    past: 'huitres-glace',
    quarter: null,
    gallery: ['marche-auslage', 'austern-oeffnen', 'austern-postkarte', 'wein-eis'],
  },
};

const capitalize = (s) => s.charAt(0).toLocaleUpperCase() + s.slice(1);

export function render(ctx) {
  const { locale, page } = ctx;
  const key = page.key;
  const L = LOCATIONS[key];
  const cfg = CONFIG[key];
  const t = DICT[locale];
  const p = t.pages[key];
  const others = LOCATION_ORDER.filter((k) => k !== key);

  const facts = html`<dl class="facts">
    <div class="facts__item"><dt>${t.ui.facts.when}</dt><dd>${p.when}</dd></div>
    <div class="facts__item"><dt>${t.ui.facts.where}</dt><dd>${placeText(key, locale)}</dd></div>
    <div class="facts__item"><dt>${t.ui.facts.mail}</dt><dd><a href="mailto:${L.email}">${L.email}</a></dd></div>
    ${p.more ? html`<div class="facts__item"><dt>${t.ui.facts.more}</dt><dd>${p.more}</dd></div>` : ''}
  </dl>`;

  /* Marché: Termine & Einladung (vergangene Termine fallen weg bzw. blendet das Skript aus) */
  const today = berlinToday();
  const dates = MARCHE_DATES.filter((d) => d.date >= today).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const marche =
    key === 'marche'
      ? html`<section class="section dates" aria-labelledby="dates-h" data-expiry-group>
          <h2 class="section__title section__title--small" id="dates-h">${p.dates.heading}</h2>
          <ul class="dates__list" role="list">
            <li class="dates__item dates__item--regular">
              <span class="dates__when">${p.dates.regular}</span>
              <span class="dates__where">${p.dates.regularPlace}</span>
            </li>
            ${dates.map(
              (d) => html`<li class="dates__item" data-expires="${d.date}">
                <span class="dates__when">${capitalize(
                  new Intl.DateTimeFormat(t.intl, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${d.date}T12:00:00Z`))
                )}, ${formatTime(d.start, locale)}–${formatTime(d.end, locale)}</span>
                <span class="dates__where">${pick(d.place, locale)}</span>
              </li>`
            )}
          </ul>
          <p class="dates__empty" data-expiry-empty${dates.length ? raw(' hidden') : ''}>${p.dates.empty}</p>
        </section>
        <section class="invite" aria-labelledby="invite-h">
          <div class="invite__inner theme-marche">
            <h2 class="section__title" id="invite-h">${p.invite.heading}</h2>
            <p class="lead">${rich(p.invite.body, locale)}</p>
            ${button(`mailto:${SITE.company.email}?subject=${encodeURIComponent(p.invite.subject)}`, p.invite.cta, { cls: 'btn btn--light' })}
          </div>
        </section>`
      : '';

  return html`
<section class="loc-hero loc-hero--${key}" aria-labelledby="loc-title">
  ${picture(cfg.hero, locale, { sizes: '100vw', cls: 'loc-hero__bg', eager: true })}
  <div class="loc-hero__inner">
    <p class="loc-hero__when"><span class="dot dot--${key}" aria-hidden="true"></span>${p.when}</p>
    <h1 class="loc-hero__title" id="loc-title">${p.h1}</h1>
    <p class="loc-hero__subtitle">${rich(p.subtitle, locale)}</p>
  </div>
</section>

<section class="section loc-facts" aria-label="${L.name}">
  ${facts}
  ${closureNotes(locale, [key])}
</section>

<section class="quote quote--${key}" aria-label="${L.name}">
  <blockquote class="quote__text"><p>${rich(p.quote, locale)}</p></blockquote>
</section>

<section class="section intro" aria-labelledby="intro-h">
  <div class="intro__text">
    <h2 class="section__title" id="intro-h">${p.intro.heading}</h2>
    <div class="intro__body">${p.intro.body.map((para, i) => html`<p class="${i === 0 ? 'lead' : ''}">${rich(para, locale)}</p>`)}</div>
  </div>
  ${picture(cfg.past, locale, { sizes: '(min-width: 1024px) 45vw, 100vw', cls: 'intro__photo' })}
</section>

<section class="loc-menu" aria-labelledby="locmenu-h">
  <div class="loc-menu__inner theme-${L.color}">
    <div class="loc-menu__head">
      <h2 class="section__title" id="locmenu-h">${p.menu.heading}</h2>
      ${button(`${url('carte', locale)}?ort=${key}`, t.ui.toMenu, { cls: 'btn btn--light' })}
    </div>
    ${menuExcerpt(locale, { location: key, limit: key === 'marche' ? 10 : 9 })}
  </div>
</section>

${marche}

<section class="photo-row" aria-label="${L.name}">
  <ul class="photo-row__track" role="list">${cfg.gallery.map(
    (name) => html`<li class="photo-row__item">${picture(name, locale, { sizes: '(min-width: 1024px) 30vw, 78vw' })}</li>`
  )}</ul>
</section>

${p.quarter
  ? html`<section class="section quarter${cfg.quarter ? ' quarter--photo' : ''}" aria-labelledby="quarter-h">
      <div class="quarter__text">
        <h2 class="section__title" id="quarter-h">${p.quarter.heading}</h2>
        <p class="lead">${rich(p.quarter.body, locale)}</p>
      </div>
      ${cfg.quarter ? picture(cfg.quarter, locale, { sizes: '(min-width: 1024px) 45vw, 100vw', cls: 'quarter__photo' }) : ''}
    </section>`
  : ''}

<section class="directions" aria-labelledby="dir-h">
  <div class="directions__inner">
    <div class="directions__text">
      <h2 class="section__title section__title--small" id="dir-h">${p.directions ? p.directions.heading : t.ui.map.title}</h2>
      <p class="directions__address">${placeText(key, locale)}</p>
      ${p.directions ? html`<p>${rich(p.directions.body, locale)}</p>` : ''}
    </div>
    <div class="directions__links">
      <p class="directions__label">${t.ui.map.title}</p>
      ${mapLinks(L.mapQuery, locale)}
    </div>
  </div>
</section>

<nav class="others" aria-label="${{ de: 'Weitere Orte', fr: 'Autres adresses', en: 'Other places' }[locale]}">
  <ul class="others__list" role="list">${others.map((k) => {
    const O = LOCATIONS[k];
    return html`<li><a class="hero-place hero-place--${k}" href="${url(k, locale)}">
      <span class="hero-place__name">${O.name}</span>
      <span class="hero-place__when">${t.pages[k].when}</span>
      <span class="hero-place__where">${O.street ? O.district : t.pages[k].whereShort ?? t.pages[k].whereText}</span>
      ${icon('arrow', { cls: 'icon hero-place__arrow' })}
    </a></li>`;
  })}</ul>
</nav>
`;
}
