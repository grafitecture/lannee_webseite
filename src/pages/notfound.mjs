import { html, rich } from '../lib/html.mjs';
import { DICT, url } from '../lib/i18n.mjs';

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.notFound;
  return html`
<section class="page-hero page-hero--404" aria-labelledby="nf-title">
  <h1 class="page-hero__title" id="nf-title">${p.h1}</h1>
  <p class="lead">${rich(p.body, locale)}</p>
  <ul class="nf__links" role="list">
    <li><a class="btn btn--solid" href="${url('home', locale)}">${t.ui.home}</a></li>
    <li><a class="btn btn--line" href="${url('carte', locale)}">${t.ui.nav.carte}</a></li>
    <li><a class="btn btn--garage" href="${url('garage', locale)}">${t.ui.nav.garage}</a></li>
    <li><a class="btn btn--kiosque" href="${url('kiosque', locale)}">${t.ui.nav.kiosque}</a></li>
    <li><a class="btn btn--marche" href="${url('marche', locale)}">${t.ui.nav.marche}</a></li>
  </ul>
</section>
`;
}
