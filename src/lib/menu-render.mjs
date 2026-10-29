/**
 * Darstellung der Karte (ganze Karte, Auszüge auf Startseite & Ortsseiten).
 */
import { html, raw, rich } from './html.mjs';
import { DICT, pick, formatPrice, formatEuro } from './i18n.mjs';
import { LOCATIONS } from '../content/site.mjs';
import { MENU } from '../content/menu.mjs';
import { icon, signet } from './components.mjs';

const ALL = ['garage', 'kiosque', 'marche'];

/** Alle Gerichte als flache Liste (für Auszüge). */
export function allItems() {
  const out = [];
  for (const chapter of MENU) for (const section of chapter.sections) for (const item of section.items) out.push({ chapter, section, item });
  return out;
}

function tasteDots(taste, locale) {
  const t = DICT[locale].pages.carte.taste;
  const row = (key) =>
    html`<span class="taste__row"><span class="taste__label">${t[key]}</span><span class="taste__dots" role="img" aria-label="${t[key]}: ${taste[key]} / 5">${[1, 2, 3, 4, 5].map(
      (i) => html`<i class="${i <= taste[key] ? 'on' : ''}"></i>`
    )}</span></span>`;
  return html`<span class="taste">${row('iode')}${row('chair')}${row('noisette')}</span>`;
}

function whereTags(where, locale) {
  if (where.length === ALL.length) return '';
  const t = DICT[locale].pages.carte;
  return html`<span class="dish__where"><span class="visually-hidden">${t.onlyAt} </span>${where.map(
    (k) => html`<span class="tag tag--${k}">${signet(k, { cls: 'tag__signet' })}${LOCATIONS[k].name}</span>`
  )}</span>`;
}

function priceCells(section, item, locale, compact = false) {
  const t = DICT[locale].pages.carte;
  if (compact && item.prices) {
    // Auszug: nur der erste Preis mit seiner Einheit (z. B. „3 / Stück“)
    const i = item.prices.findIndex((p) => p != null);
    const value = i >= 0 ? formatPrice(item.prices[i], locale) : formatEuro(item.fixed, locale);
    const label = i >= 0 ? pick(item.columns ?? section.columns, locale)?.[i] ?? '' : '';
    return html`<span class="dish__prices dish__prices--single"><span class="dish__price"><span class="dish__price-value">${value}</span>${
      label ? html`<span class="dish__price-unit">${label}</span>` : ''
    }</span></span>`;
  }
  if (item.prices) {
    return html`<span class="dish__prices" style="--cols:${item.prices.length}">${item.prices.map((p, i) => {
      const col = pick(item.columns ?? section.columns, locale)?.[i] ?? '';
      return html`<span class="dish__price"><span class="dish__price-label">${col}</span><span class="dish__price-value">${
        p == null ? html`<span aria-hidden="true">–</span>` : formatPrice(p, locale)
      }</span></span>`;
    })}${item.fixed ? html`<span class="dish__price dish__price--fixed"><span class="dish__price-value">${formatEuro(item.fixed, locale)}</span></span>` : ''}</span>`;
  }
  return html`<span class="dish__prices dish__prices--single"><span class="dish__price"><span class="dish__price-label visually-hidden">${t.price}</span><span class="dish__price-value">${
    item.from ? html`<span class="dish__from">${t.from} </span>` : ''
  }${formatPrice(item.price, locale)}</span></span></span>`;
}

export function dish(section, item, locale, { compact = false } = {}) {
  const t = DICT[locale].pages.carte;
  const name = pick(item.name, locale);
  const tag = compact ? 'h3' : 'h4';
  const veg = item.veg
    ? html` <span class="dish__veg" title="${t.veg}"><span class="visually-hidden">(${t.veg})</span><span aria-hidden="true">v</span></span>`
    : '';
  return html`<li class="dish${compact ? ' dish--compact' : ''}" data-where="${item.where.join(' ')}">
    <div class="dish__main">
      ${raw(`<${tag} class="dish__name">`)}${name}${veg}${raw(`</${tag}>`)}
      ${item.origin ? html`<p class="dish__origin">${pick(item.origin, locale)}</p>` : ''}
      ${!compact && item.desc ? html`<p class="dish__desc">${rich(pick(item.desc, locale), locale)}</p>` : ''}
      ${!compact && item.taste ? tasteDots(item.taste, locale) : ''}
      ${!compact ? whereTags(item.where, locale) : ''}
    </div>
    ${priceCells(section, item, locale, compact)}
  </li>`;
}

/** Komplette Karte mit Kapiteln und Sektionen. */
export function fullMenu(locale) {
  return html`${MENU.map(
    (chapter) => html`<section class="chapter" id="${chapter.id}" aria-labelledby="${chapter.id}-h">
      <h2 class="chapter__title" id="${chapter.id}-h">${pick(chapter.title, locale)}</h2>
      <div class="chapter__sections">${chapter.sections.map(
        (section) => html`<section class="menu-section" id="${section.id}" aria-labelledby="${section.id}-h">
          <header class="menu-section__head">
            ${icon(section.icon, { cls: 'icon menu-section__icon' })}
            <h3 class="menu-section__title" id="${section.id}-h">${pick(section.title, locale)}</h3>
            ${section.intro ? html`<p class="menu-section__intro">${rich(pick(section.intro, locale), locale)}</p>` : ''}
          </header>
          <ul class="dishes" role="list">${section.items.map((item) => dish(section, item, locale))}</ul>
        </section>`
      )}</div>
    </section>`
  )}`;
}

/** Auszug für einen Ort (oder die Highlights). */
export function menuExcerpt(locale, { location, signatureOnly = false, limit = 8 } = {}) {
  const items = allItems().filter(
    ({ item }) => (!location || item.where.includes(location)) && (!signatureOnly || item.signature)
  );
  return html`<ul class="dishes dishes--excerpt" role="list">${items
    .slice(0, limit)
    .map(({ section, item }) => dish(section, item, locale, { compact: true }))}</ul>`;
}
