import { html, rich } from '../lib/html.mjs';
import { DICT } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER } from '../content/site.mjs';
import { fullMenu } from '../lib/menu-render.mjs';

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.carte;

  const filter = html`<div class="menu-filter" role="group" aria-label="${p.filter.label}" data-menu-filter hidden>
    <button type="button" class="chip" data-filter="all" aria-pressed="true">${p.filter.all}</button>
    ${LOCATION_ORDER.map(
      (k) => html`<button type="button" class="chip chip--${k}" data-filter="${k}" aria-pressed="false"><span>${LOCATIONS[k].name}</span></button>`
    )}
  </div>`;

  return html`
<section class="page-hero page-hero--carte" aria-labelledby="carte-title">
  <h1 class="page-hero__title" id="carte-title" lang="fr">${p.h1}</h1>
  <p class="page-hero__lead lead">${rich(p.lead, locale)}</p>
  ${filter}
</section>

<div class="carte" data-menu-root data-filter="all">
  ${fullMenu(locale)}
</div>

<aside class="menu-notes" aria-label="${{ de: 'Hinweise', fr: 'Informations', en: 'Notes' }[locale]}">
  <ul role="list">${p.notes.map((n) => html`<li>${rich(n, locale)}</li>`)}</ul>
</aside>
`;
}
