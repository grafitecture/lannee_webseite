/**
 * Ortsseiten: Garage, Kiosque, Marché – gleicher Aufbau, eigene Farbe, eigenes Signet.
 */
import { html, raw, rich } from '../lib/html.mjs';
import { DICT, url, pick, fill, formatTime } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, MARCHE_DATES, SITE } from '../content/site.mjs';
import { lockup, signet, picture, arrowLink, mapLinks, icon, closureNotes, berlinToday } from '../lib/components.mjs';
import { menuExcerpt } from '../lib/menu-render.mjs';
import { placeText } from '../lib/layout.mjs';

const CONFIG = {
  garage: {
    hero: 'garage-hof',
    gallery: ['garage-bar', 'garage-austernbar', 'garage-boot', 'garage-wand', 'garage-fenster', 'schweppes', 'garage-eingang', 'garage-weinlaub', 'garage-merci'],
    quarterIcon: 'jungbusch',
  },
  kiosque: {
    hero: 'kiosque-visualisierung',
    gallery: ['huitres-glace', 'bulles', 'austern-postkarte', 'wein-eis', 'baguettes'],
    quarterIcon: 'sun',
  },
  marche: {
    hero: 'marche-wagen',
    gallery: ['marche-auslage', 'austern-oeffnen', 'austern-postkarte', 'baguettes', 'wein-eis'],
    quarterIcon: 'marche',
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
    ${p.more ? html`<div class="facts__item facts__item--wide"><dt>${t.ui.facts.more}</dt><dd>${p.more}</dd></div>` : ''}
  </dl>`;

  /* Marché: Termine & Einladung (vergangene Termine fallen weg bzw. blendet das Skript aus) */
  const today = berlinToday();
  const dates = MARCHE_DATES.filter((d) => d.date >= today).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const marche =
    key === 'marche'
      ? html`<section class="dates" aria-labelledby="dates-h" data-expiry-group>
          <h2 class="t-h4" id="dates-h">${p.dates.heading}</h2>
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
        <section class="invite theme-marche" aria-labelledby="invite-h">
          ${icon('marche', { cls: 'icon invite__icon' })}
          <div class="invite__text">
            <h2 class="t-h3" id="invite-h">${p.invite.heading}</h2>
            <p class="lead">${rich(p.invite.body, locale)}</p>
            ${arrowLink(`mailto:${SITE.company.email}?subject=${encodeURIComponent(p.invite.subject)}`, p.invite.cta, { cls: 'btn btn--line' })}
          </div>
        </section>`
      : '';

  return html`
<section class="loc-hero theme-${L.color}-text" aria-labelledby="loc-title">
  ${lockup(key, { cls: 'loc-hero__lockup', locale })}
  <h1 class="loc-hero__title" id="loc-title">${p.h1}</h1>
  <p class="loc-hero__subtitle">${rich(p.subtitle, locale)}</p>
  ${facts}
  ${closureNotes(locale, [key])}
</section>

<div class="loc-photo">
  ${picture(cfg.hero, locale, { sizes: '100vw', cls: 'loc-photo__img', eager: true })}
</div>

<section class="quote theme-${L.color}" aria-label="${L.name}">
  ${signet(key, { cls: 'quote__signet' })}
  <blockquote class="quote__text"><p>${rich(p.quote, locale)}</p></blockquote>
</section>

<section class="intro" aria-labelledby="intro-h">
  <h2 class="intro__heading t-h3" id="intro-h">${p.intro.heading}</h2>
  <div class="intro__body">${p.intro.body.map((para, i) => html`<p class="${i === 0 ? 'lead' : ''}">${rich(para, locale)}</p>`)}</div>
</section>

<section class="loc-menu${key === 'marche' ? ' loc-menu--board' : ''}" aria-labelledby="locmenu-h">
  <div class="loc-menu__head">
    <h2 class="t-h4" id="locmenu-h">${p.menu.heading}</h2>
    ${arrowLink(`${url('carte', locale)}?ort=${key}`, t.ui.toMenu, { cls: 'link-arrow' })}
  </div>
  ${menuExcerpt(locale, { location: key, limit: key === 'marche' ? 10 : 9 })}
</section>

${marche}

<section class="mosaic" aria-label="${L.name}">
  <ul class="mosaic__grid mosaic__grid--${cfg.gallery.length}" role="list">${cfg.gallery.map(
    (name, i) => html`<li class="mosaic__item mosaic__item--${i + 1}">${picture(name, locale, { sizes: '(min-width: 1024px) 33vw, 50vw' })}</li>`
  )}</ul>
</section>

${p.quarter
  ? html`<section class="quarter" aria-labelledby="quarter-h">
      ${icon(cfg.quarterIcon, { cls: `icon quarter__emblem quarter__emblem--${cfg.quarterIcon}` })}
      <div class="quarter__text">
        <h2 class="t-h3" id="quarter-h">${p.quarter.heading}</h2>
        <p class="lead">${rich(p.quarter.body, locale)}</p>
      </div>
    </section>`
  : ''}

<section class="directions" aria-labelledby="dir-h">
  <div class="directions__text">
    <h2 class="t-h4" id="dir-h">${p.directions ? p.directions.heading : t.ui.map.title}</h2>
    <p class="directions__address">${placeText(key, locale)}</p>
    ${p.directions ? html`<p>${rich(p.directions.body, locale)}</p>` : ''}
  </div>
  <div class="directions__links">
    <p class="directions__label">${t.ui.map.title}</p>
    ${mapLinks(L.mapQuery, locale)}
  </div>
</section>

<nav class="others" aria-label="${{ de: 'Weitere Orte', fr: 'Autres adresses', en: 'Other places' }[locale]}">
  ${others.map((k) => {
    const O = LOCATIONS[k];
    return html`<a class="other theme-${O.color}" href="${url(k, locale)}">
      ${signet(k, { cls: 'other__signet' })}
      <span class="other__name">${O.name}</span>
      <span class="other__when">${t.pages[k].when}</span>
      ${icon('arrow', { cls: 'icon other__arrow' })}
    </a>`;
  })}
</nav>
`;
}
