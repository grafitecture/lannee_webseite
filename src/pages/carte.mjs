import { html, rich } from '../lib/html.mjs';
import { DICT } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER } from '../content/site.mjs';
import { fullMenu } from '../lib/menu-render.mjs';
import { scribbles } from '../lib/scribbles.mjs';

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
<section class="page-hero page-hero--carte has-scribbles" aria-labelledby="carte-title">
  ${scribbles(ctx, [{ at: 'r', y: '10%', s: 'l', bleed: 0.2, prefer: ['kellnermesser'] }])}
  <h1 class="page-hero__title" id="carte-title" lang="fr">${p.h1}</h1>
  <p class="page-hero__lead lead">${rich(p.lead, locale)}</p>
  ${filter}
</section>

<div class="carte" data-menu-root data-filter="all">
  ${fullMenu(locale, {
    // neben den Kapiteltiteln ein Spruch statt einer Speisen-Zeichnung: „Bon appétit !“ bei Hunger, „Santé !“ bei Durst
    decorate: (chapter) =>
      scribbles(ctx, [{ at: 'r', y: '1.5%', s: 'm', kind: 'claim', bleed: 0.12, pick: chapter.id === 'soif' ? 'sante' : 'bon-appetit' }], { gutter: true }),
  })}
</div>

<aside class="menu-notes" aria-label="${{ de: 'Hinweise', fr: 'Informations', en: 'Notes' }[locale]}">
  <ul role="list">${p.notes.map((n) => html`<li>${rich(n, locale)}</li>`)}</ul>
</aside>
`;
}
