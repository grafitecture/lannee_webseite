import { html, rich } from '../lib/html.mjs';
import { DICT, url } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, SITE } from '../content/site.mjs';
import { arrowLink, icon } from '../lib/components.mjs';
import { placeText } from '../lib/layout.mjs';
import { scribbles } from '../lib/scribbles.mjs';

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.contact;
  const c = SITE.company;

  return html`
<section class="page-hero page-hero--contact has-scribbles" aria-labelledby="contact-title">
  ${scribbles(ctx, [
    { at: 'r', y: '8%', s: 'l', bleed: 0.2, prefer: ['rettungsring'] },
    { at: 'free', x: '72%', y: '82%', s: 's', kind: 'claim', prefer: ['salut-les-huitres'], wide: true },
  ])}
  <h1 class="page-hero__title" id="contact-title">${p.h1}</h1>
  <p class="page-hero__lead lead">${rich(p.lead, locale)}</p>
</section>

<section class="contact-places" aria-label="${t.ui.nav.garage}, ${t.ui.nav.kiosque}, ${t.ui.nav.marche}">
  ${LOCATION_ORDER.map((k) => {
    const L = LOCATIONS[k];
    return html`<article class="contact-card theme-${L.color}">
      <h2 class="contact-card__name"><a href="${url(k, locale)}">${L.name}</a></h2>
      <p class="contact-card__when">${t.pages[k].when}</p>
      <p class="contact-card__where">${placeText(k, locale)}</p>
      <p class="contact-card__mail"><a href="mailto:${L.email}">${L.email}</a></p>
    </article>`;
  })}
</section>

<section class="contact-more has-scribbles">
  ${scribbles(ctx, [{ at: 'b', x: '14%', s: 'm', bleed: 0.32, prefer: ['knoten'], wide: true }])}
  <div class="contact-more__block">
    <h2 class="t-h5">${p.reservations.heading}</h2>
    <p class="lead">${rich(p.reservations.body, locale)}</p>
  </div>
  <div class="contact-more__block">
    <h2 class="t-h5">${p.general.heading}</h2>
    <p>${rich(p.general.body, locale)}</p>
    <p class="contact-more__mail"><a href="mailto:${c.email}">${c.email}</a></p>
    <address class="contact-more__address">${c.name}<br>${c.street}<br>${c.zip} ${c.city}</address>
  </div>
  <div class="contact-more__block">
    <h2 class="t-h5">${p.insta.heading}</h2>
    <p>${rich(p.insta.body, locale)}</p>
    ${arrowLink(SITE.instagram.url, SITE.instagram.handle, { cls: 'btn btn--line', external: true, locale })}
  </div>
</section>
`;
}
