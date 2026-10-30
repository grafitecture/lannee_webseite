/**
 * Austernatlas: eigene Seite (Menüpunkt), Arten und Herkünfte als
 * Strichzeichnungen mit kurzer Erklärung. Texte: src/content/oysters.mjs,
 * Zeichnungen: src/lib/oyster-art.mjs (eigenes Sprite, nur auf dieser Seite).
 */
import { html, rich } from '../lib/html.mjs';
import { url, pick } from '../lib/i18n.mjs';
import { oysterDrawing, arrowLink } from '../lib/components.mjs';
import { ATLAS, OYSTERS } from '../content/oysters.mjs';

const GROUPS = ['species', 'france', 'europe', 'world'];

function card(o, locale) {
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

export function render(ctx) {
  const { locale } = ctx;

  const sections = GROUPS.map((g) => {
    const items = OYSTERS.filter((o) => o.group === g);
    return html`<section class="atlas__section" aria-labelledby="atlas-${g}">
    <h2 class="atlas__heading" id="atlas-${g}">${pick(ATLAS.sections[g], locale)}<span class="atlas__count">${items.length}</span></h2>
    <dl class="atlas__grid">${items.map((o) => card(o, locale))}</dl>
  </section>`;
  });

  return html`
<section class="page-hero page-hero--atlas" aria-labelledby="atlas-title">
  <h1 class="page-hero__title page-hero__title--atlas" id="atlas-title">${pick(ATLAS.title, locale)}</h1>
  <p class="page-hero__lead lead">${rich(pick(ATLAS.lead, locale), locale)}</p>
  <p class="atlas__cta">${arrowLink(url('carte', locale), pick(ATLAS.cta, locale), { cls: 'link-arrow' })}</p>
</section>

<div class="atlas">
  ${sections}
</div>
`;
}

export const meta = { key: 'atlas', og: 'lannee' };
