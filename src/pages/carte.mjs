/**
 * La Carte (Umbau 05.11.2026): großer Titel auf Weiß, Filter als Pillen, ein echtes Foto (Bulles) als
 * breite runde Bildkarte, die Kapitel mit viel Luft. Keine Zeichnungen, keine Sprüche.
 */
import { html, rich } from '../lib/html.mjs';
import { DICT } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER } from '../content/site.mjs';
import { picture } from '../lib/components.mjs';
import { fullMenu } from '../lib/menu-render.mjs';

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.carte;

  const filter = html`<div class="menu-filter" role="group" aria-label="${p.filter.label}" data-menu-filter hidden>
    <button type="button" class="chip" data-filter="all" aria-pressed="true">${p.filter.all}</button>
    ${LOCATION_ORDER.map(
      (k) => html`<button type="button" class="chip chip--${k}" data-filter="${k}" aria-pressed="false"><span class="dot dot--${k}" aria-hidden="true"></span>${LOCATIONS[k].name}</button>`
    )}
  </div>`;

  return html`
<section class="page-hero" aria-labelledby="carte-title">
  <h1 class="page-hero__title" id="carte-title" lang="fr">${p.h1}</h1>
  <p class="lead">${rich(p.lead, locale)}</p>
</section>

<div class="banner">
  ${picture('garage-glaeser', locale, { sizes: '100vw', cls: 'banner__img' })}
</div>

<div class="carte-bar">${filter}</div>

<div class="carte" data-menu-root data-filter="all">
  ${fullMenu(locale)}
</div>

<aside class="menu-notes" aria-label="${{ de: 'Hinweise', fr: 'Informations', en: 'Notes' }[locale]}">
  <ul role="list">${p.notes.map((n) => html`<li>${rich(n, locale)}</li>`)}</ul>
</aside>
`;
}
