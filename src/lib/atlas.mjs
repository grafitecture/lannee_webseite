/**
 * Austernatlas: graue Strichzeichnungen aller wichtigen Austernarten und Herkünfte.
 * Steht auf jeder Seite nach der Fußzeile (siehe layout.mjs).
 */
import { html, rich } from './html.mjs';
import { url, pick } from './i18n.mjs';
import { oysterDrawing, arrowLink } from './components.mjs';
import { ATLAS, OYSTERS } from '../content/oysters.mjs';

export function atlas(locale) {
  const items = OYSTERS.map((o) => {
    const name = typeof o.name === 'string' ? o.name : pick(o.name, locale);
    const nameLang = o.lang && o.lang !== locale ? o.lang : null;
    const where = o.where ? (typeof o.where === 'string' ? o.where : pick(o.where, locale)) : null;
    return html`<div class="oyster oyster--${o.group}">
      <dt class="oyster__head"><span class="oyster__art">${oysterDrawing(o.art)}</span><span class="oyster__name"${
      nameLang ? html` lang="${nameLang}"` : ''
    }>${name}</span></dt>
      <dd class="oyster__meta"><span class="oyster__group">${pick(ATLAS.groups[o.group], locale)}</span>${
      o.sci ? html` <i lang="la">${o.sci}</i>` : ''
    }${where ? html` <span>${where}</span>` : ''}</dd>
      <dd class="oyster__text">${rich(pick(o.text, locale), locale)}</dd>
    </div>`;
  });

  return html`<aside class="atlas" aria-labelledby="atlas-title">
  <div class="atlas__head">
    <h2 class="atlas__title" id="atlas-title">${pick(ATLAS.title, locale)}</h2>
    <p class="atlas__lead">${rich(pick(ATLAS.lead, locale), locale)}</p>
    ${arrowLink(url('carte', locale), pick(ATLAS.cta, locale), { cls: 'link-arrow atlas__cta' })}
  </div>
  <dl class="atlas__grid">${items}</dl>
</aside>`;
}
