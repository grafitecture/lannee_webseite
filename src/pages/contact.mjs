/**
 * Kontakt (Umbau 05.11.2026): großer Titel, die drei Orte als Farbkarten, darunter drei helle Karten.
 */
import { html, rich } from '../lib/html.mjs';
import { DICT, url } from '../lib/i18n.mjs';
import { LOCATIONS, LOCATION_ORDER, SITE } from '../content/site.mjs';
import { button } from '../lib/components.mjs';
import { placeText } from '../lib/layout.mjs';

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.contact;
  const c = SITE.company;

  return html`
<section class="page-hero" aria-labelledby="contact-title">
  <h1 class="page-hero__title" id="contact-title">${p.h1}</h1>
  <p class="lead">${rich(p.lead, locale)}</p>
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

<section class="contact-more">
  <div class="contact-more__block">
    <h2 class="contact-more__h">${p.reservations.heading}</h2>
    <p class="lead">${rich(p.reservations.body, locale)}</p>
  </div>
  <div class="contact-more__block">
    <h2 class="contact-more__h">${p.general.heading}</h2>
    <p>${rich(p.general.body, locale)}</p>
    <p class="contact-more__mail"><a href="mailto:${c.email}">${c.email}</a></p>
    <address class="contact-more__address">${c.name}<br>${c.street}<br>${c.zip} ${c.city}</address>
  </div>
  <div class="contact-more__block">
    <h2 class="contact-more__h">${p.insta.heading}</h2>
    <p>${rich(p.insta.body, locale)}</p>
    ${button(SITE.instagram.url, SITE.instagram.handle, { cls: 'btn btn--solid', external: true, locale })}
  </div>
</section>
`;
}
