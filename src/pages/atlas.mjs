/**
 * Atlanten (seit 06.11.2026, ersetzt die Seite „Austernatlas“): zwei Nachschlagewerke auf einer Seite.
 *   1. Austernatlas – Arten und Herkünfte als runde Karten mit Austern-Strichzeichnung
 *      (src/lib/oyster-art.mjs, eigenes Sprite; die einzige Stelle der Website mit Zeichnungen).
 *   2. Champagner-Guide – Zahlen, Anbaugebiete, Rebsorten, Herstellung, Geschmack (Dosage), Stile,
 *      Flaschengrößen, Lagern & Servieren, Etikett, Häuser & Winzer, Begriffe. Nur Text und Daten.
 * Texte: src/content/oysters.mjs, src/content/champagne.mjs, Seitenkopf in i18n (pages.atlas).
 */
import { html, rich, typo } from '../lib/html.mjs';
import { url, pick, DICT } from '../lib/i18n.mjs';
import { button, icon, oysterDrawing } from '../lib/components.mjs';
import { ATLAS, OYSTERS } from '../content/oysters.mjs';
import {
  GUIDE,
  GUIDE_ORDER,
  FACTS,
  REGIONS,
  REGION_UI,
  GRAPES,
  GRAPE_UI,
  STEPS,
  DOSAGE,
  AROMAS,
  STYLES,
  SIZES,
  CARE,
  CODES,
  HOUSES,
  GROWERS,
  GLOSSARY,
} from '../content/champagne.mjs';

const GROUPS = ['species', 'france', 'europe', 'world'];

/** Sprungmarken der beiden Atlanten je Sprache */
const PART_ID = {
  oysters: { de: 'austern', fr: 'huitres', en: 'oysters' },
  champagne: { de: 'champagner', fr: 'champagne', en: 'champagne' },
};

const slug = (s) =>
  s
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const NUM_LOCALE = { de: 'de-DE', fr: 'fr-FR', en: 'en-GB' };
const num = (v, locale) => new Intl.NumberFormat(NUM_LOCALE[locale], { maximumFractionDigits: 2 }).format(v);
/** Inhalt einer Flasche: unter einem Liter in cl, sonst in l */
const volume = (litres, locale) => (litres < 1 ? `${num(litres * 100, locale)} cl` : `${num(litres, locale)} l`);

/* Austernatlas ------------------------------------------------------------------ */

function oysterCard(o, locale) {
  const name = typeof o.name === 'string' ? o.name : pick(o.name, locale);
  const nameLang = o.lang && o.lang !== locale ? o.lang : null;
  const where = o.where ? (typeof o.where === 'string' ? o.where : pick(o.where, locale)) : null;
  return html`<div class="oyster oyster--${o.group}">
      <dt class="oyster__head"><span class="oyster__art">${oysterDrawing(o.art)}</span><span class="oyster__name"${
    nameLang ? html` lang="${nameLang}"` : ''
  }>${name}</span></dt>
      ${o.sci || where ? html`<dd class="oyster__meta">${o.sci ? html`<i lang="la">${o.sci}</i>` : ''}${where ? html`<span>${where}</span>` : ''}</dd>` : ''}
      <dd class="oyster__text">${rich(pick(o.text, locale), locale)}</dd>
    </div>`;
}

function oysterAtlas(locale) {
  return GROUPS.map((g) => {
    const items = OYSTERS.filter((o) => o.group === g);
    return html`<section class="atlas__section" aria-labelledby="atlas-${g}">
    <h3 class="atlas__heading" id="atlas-${g}">${pick(ATLAS.sections[g], locale)}<span class="atlas__count">${items.length}</span></h3>
    <dl class="atlas__grid">${items.map((o) => oysterCard(o, locale))}</dl>
  </section>`;
  });
}

/* Champagner-Guide: die Kapitel ------------------------------------------------ */

const S = GUIDE.sections;

const CHAPTERS = {
  facts: (locale) => html`<dl class="cg-facts">${FACTS.map(
    (f) => html`<div class="cg-fact">
      <dt><span class="cg-fact__value">${pick(f.value, locale)}</span> <span class="cg-fact__unit">${pick(f.unit, locale)}</span></dt>
      <dd>${rich(pick(f.text, locale), locale)}</dd>
    </div>`
  )}</dl>`,

  regions: (locale) => html`<ul class="cg-cards cg-cards--regions" role="list">${REGIONS.map(
    (r) => html`<li class="cg-card">
      <h4 class="cg-card__title" lang="fr">${r.name}</h4>
      <p class="cg-chip"><span class="visually-hidden">${pick(REGION_UI.grape, locale)}: </span>${r.grape}</p>
      <p>${rich(pick(r.text, locale), locale)}</p>
      ${r.crus ? html`<p class="cg-card__small"><strong>${pick(REGION_UI.crus, locale)}:</strong> ${r.crus}</p>` : ''}
    </li>`
  )}</ul>`,

  grapes: (locale) => html`<ul class="cg-grapes" role="list">${GRAPES.map(
    (g) => html`<li class="cg-grape">
      <h4 class="cg-card__title">${g.name}</h4>
      <p class="cg-grape__share"><span class="cg-grape__num">≈ ${g.share} %</span> <span>${pick(GRAPE_UI.share, locale)} · ${pick(g.color, locale)}</span></p>
      <span class="cg-bar" aria-hidden="true"><span class="cg-bar__fill" style="--a: 0; --b: ${g.share / 100}"></span></span>
      <p>${rich(pick(g.text, locale), locale)}</p>
    </li>`
  )}</ul>
  <p class="cg-aside">${rich(pick(GRAPE_UI.others, locale), locale)}</p>`,

  method: (locale) => html`<ol class="cg-steps">${STEPS.map(
    (st) => html`<li class="cg-step">
      <h4 class="cg-step__title">${pick(st.name, locale)}</h4>
      <p>${rich(pick(st.text, locale), locale)}</p>
    </li>`
  )}</ol>`,

  taste: (locale) => html`<h4 class="cg-subhead">${pick(S.taste.dosage, locale)}</h4>
  <p class="cg-note">${pick(S.taste.dosageNote, locale)}</p>
  <ol class="cg-dosage">${DOSAGE.map(
    (d) => html`<li class="cg-dose">
      <p class="cg-dose__name" lang="fr">${d.name}${d.alias ? html` <span class="cg-dose__alias" lang="${locale}">${pick(d.alias, locale)}</span>` : ''}</p>
      <p class="cg-dose__range">${typo(pick(d.range, locale), locale)}</p>
      <span class="cg-bar cg-bar--scale${d.open ? ' cg-bar--open' : ''}" aria-hidden="true"><span class="cg-bar__fill" style="--a: ${d.min / 60}; --b: ${d.max / 60}"></span></span>
      <p class="cg-dose__text">${rich(pick(d.text, locale), locale)}</p>
    </li>`
  )}</ol>
  <p class="cg-tip">${rich(pick(S.taste.tip, locale), locale)}</p>
  <h4 class="cg-subhead">${pick(S.taste.aromas, locale)}</h4>
  <ol class="cg-cards cg-cards--aromas">${AROMAS.map(
    (a) => html`<li class="cg-card">
      <p class="cg-card__title">${pick(a.name, locale)}</p>
      <p>${rich(pick(a.text, locale), locale)}</p>
    </li>`
  )}</ol>`,

  styles: (locale) => html`<ul class="cg-cards cg-cards--styles" role="list">${STYLES.map((st) => {
    const name = pick(st.name, locale);
    return html`<li class="cg-card">
      <h4 class="cg-card__title">${name}</h4>
      ${st.alias && st.alias !== name ? html`<p class="cg-card__small" lang="fr">${st.alias}</p>` : ''}
      <p>${rich(pick(st.text, locale), locale)}</p>
    </li>`;
  })}</ul>`,

  sizes: (locale) => {
    const H = S.sizes.head;
    const max = Math.max(...SIZES.map((s) => s.litres));
    return html`<div class="cg-sizes-wrap">
    <table class="cg-sizes">
      <thead><tr>
        <th scope="col">${pick(H.name, locale)}</th>
        <th scope="col" class="cg-num">${pick(H.volume, locale)}</th>
        <th scope="col" class="cg-num"><span aria-hidden="true">× 75 cl</span><span class="visually-hidden">${pick(H.bottles, locale)}</span></th>
        <th scope="col" class="cg-num">${pick(H.glasses, locale)}</th>
      </tr></thead>
      <tbody>${SIZES.map(
        (s) => html`<tr>
        <th scope="row">
          <span class="cg-size__name">${pick(s.name, locale)}</span>
          <span class="cg-size__origin">${typo(pick(s.origin, locale), locale)}</span>
          <span class="cg-bar cg-bar--size" aria-hidden="true"><span class="cg-bar__fill" style="--a: 0; --b: ${(s.litres / max).toFixed(4)}"></span></span>
        </th>
        <td class="cg-num">${typo(volume(s.litres, locale), locale)}</td>
        <td class="cg-num">${s.bottles}</td>
        <td class="cg-num">${s.glasses}</td>
      </tr>`
      )}</tbody>
    </table>
  </div>
  <p class="cg-note">${typo(pick(S.sizes.note, locale), locale)}</p>`;
  },

  care: (locale) => html`<ul class="cg-cards cg-cards--care" role="list">${CARE.map(
    (c) => html`<li class="cg-card">
      <h4 class="cg-card__title">${pick(c.name, locale)}</h4>
      <ul class="cg-points">${pick(c.points, locale).map((p) => html`<li>${rich(p, locale)}</li>`)}</ul>
    </li>`
  )}</ul>`,

  label: (locale) => html`<dl class="cg-codes">${CODES.map(
    (c) => html`<div class="cg-code">
      <dt><abbr class="cg-code__abbr" title="${c.name}" lang="fr">${c.code}</abbr> <span class="cg-code__name" lang="fr">${c.name}</span></dt>
      <dd>${rich(pick(c.text, locale), locale)}</dd>
    </div>`
  )}</dl>
  <p class="cg-aside">${rich(pick(S.label.more, locale), locale)}</p>`,

  houses: (locale) => {
    const H = S.houses;
    return html`<h4 class="cg-subhead">${pick(H.housesTitle, locale)}</h4>
  <ul class="cg-houses" role="list">${HOUSES.map(
    (h) => html`<li class="cg-house">
      <p class="cg-house__year"><span class="visually-hidden">${pick(H.since, locale)} </span>${h.since}</p>
      <p class="cg-house__name">${h.name}</p>
      <p class="cg-house__place">${h.place}</p>
      <p class="cg-house__text">${rich(pick(h.text, locale), locale)}</p>
      ${h.menu ? html`<a class="cg-house__menu" href="${url('carte', locale)}">${pick(H.onMenu, locale)}${icon('arrow', { cls: 'icon cg-house__arrow' })}</a>` : ''}
    </li>`
  )}</ul>
  <p class="cg-tip">${rich(pick(H.german, locale), locale)}</p>
  <h4 class="cg-subhead">${pick(H.growersTitle, locale)}</h4>
  <ul class="cg-houses cg-houses--growers" role="list">${GROWERS.map(
    (g) => html`<li class="cg-house">
      <p class="cg-house__name">${g.name}</p>
      <p class="cg-house__place">${g.place}</p>
      <p class="cg-house__text">${rich(pick(g.text, locale), locale)}</p>
    </li>`
  )}</ul>`;
  },

  glossary: (locale) => html`<dl class="cg-glossary">${GLOSSARY.map(
    (g) => html`<div class="cg-term"><dt lang="fr">${g.term}</dt><dd>${rich(pick(g.text, locale), locale)}</dd></div>`
  )}</dl>`,
};

function champagneGuide(locale) {
  const chapters = GUIDE_ORDER.map((key) => {
    const c = S[key];
    const id = slug(pick(c.title, locale));
    return { key, id, title: pick(c.title, locale), intro: c.intro ? pick(c.intro, locale) : null };
  });
  const nav = html`<nav class="cg-nav" aria-label="${pick(GUIDE.navLabel, locale)}"><ul role="list">${chapters.map(
    (c) => html`<li><a class="cg-nav__link" href="#${c.id}">${c.title}</a></li>`
  )}</ul></nav>`;
  const body = chapters.map(
    (c) => html`<section class="cg-chapter cg-chapter--${c.key}" id="${c.id}" aria-labelledby="${c.id}-title">
    <header class="cg-chapter__head">
      <h3 class="cg-chapter__title" id="${c.id}-title">${c.title}</h3>
      ${c.intro ? html`<p class="cg-chapter__intro">${rich(c.intro, locale)}</p>` : ''}
    </header>
    ${CHAPTERS[c.key](locale)}
  </section>`
  );
  return { nav, body };
}

/* Seite ------------------------------------------------------------------------- */

export function render(ctx) {
  const { locale } = ctx;
  const P = DICT[locale].pages.atlas;
  const ids = { oysters: PART_ID.oysters[locale], champagne: PART_ID.champagne[locale] };
  const guide = champagneGuide(locale);

  const tiles = ['oysters', 'champagne'].map(
    (k) => html`<li><a class="atlases__tile atlases__tile--${k}" href="#${ids[k]}">
      <span class="atlases__tile-name">${P.tiles[k].name}</span>
      <span class="atlases__tile-text">${typo(P.tiles[k].text.replace('{n}', OYSTERS.length), locale)}</span>
      ${icon('arrow', { cls: 'icon atlases__tile-arrow' })}
    </a></li>`
  );

  return html`
<section class="page-hero atlases__hero" aria-labelledby="atlas-title">
  <h1 class="page-hero__title" id="atlas-title">${P.h1}</h1>
  <p class="lead">${rich(P.lead, locale)}</p>
</section>
<nav class="atlases__switch" aria-label="${P.h1}"><ul role="list">${tiles}</ul></nav>

<section class="atlases__part" id="${ids.oysters}" aria-labelledby="${ids.oysters}-title">
  <header class="atlases__head">
    <h2 class="atlases__title" id="${ids.oysters}-title">${pick(ATLAS.title, locale)}</h2>
    <p class="lead">${rich(pick(ATLAS.lead, locale), locale)}</p>
    ${button(url('carte', locale), pick(ATLAS.cta, locale), { cls: 'btn btn--solid' })}
  </header>
  <div class="atlas">
    ${oysterAtlas(locale)}
  </div>
</section>

<section class="atlases__part" id="${ids.champagne}" aria-labelledby="${ids.champagne}-title">
  <header class="atlases__head">
    <h2 class="atlases__title" id="${ids.champagne}-title">${pick(GUIDE.title, locale)}</h2>
    <p class="lead">${rich(pick(GUIDE.lead, locale), locale)}</p>
    ${guide.nav}
  </header>
  <div class="cg">
    ${guide.body}
  </div>
  <div class="atlases__cta">${button(url('carte', locale), pick(ATLAS.cta, locale), { cls: 'btn btn--solid' })}</div>
</section>
`;
}

export const meta = { key: 'atlas', og: 'lannee' };
