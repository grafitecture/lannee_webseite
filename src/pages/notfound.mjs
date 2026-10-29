import { html, rich } from '../lib/html.mjs';
import { DICT, url } from '../lib/i18n.mjs';
import { icon } from '../lib/components.mjs';

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.notFound;
  return html`
<section class="page-hero page-hero--404" aria-labelledby="nf-title">
  ${icon('oyster-open', { cls: 'icon nf__icon' })}
  <h1 class="page-hero__title" id="nf-title">${p.h1}</h1>
  <p class="page-hero__lead lead">${rich(p.body, locale)}</p>
  <ul class="nf__links" role="list">
    <li><a href="${url('home', locale)}">${t.ui.home}</a></li>
    <li><a href="${url('carte', locale)}">${t.ui.nav.carte}</a></li>
    <li><a href="${url('garage', locale)}">${t.ui.nav.garage}</a></li>
    <li><a href="${url('kiosque', locale)}">${t.ui.nav.kiosque}</a></li>
    <li><a href="${url('marche', locale)}">${t.ui.nav.marche}</a></li>
  </ul>
</section>
`;
}
