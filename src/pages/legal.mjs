import { html, rich } from '../lib/html.mjs';
import { DICT } from '../lib/i18n.mjs';
import { impressum, datenschutz } from '../content/legal.mjs';

function blocks(list, locale) {
  return list.map((b) => {
    if (b.note) return html`<p class="legal__note">${rich(b.note, locale)}</p>`;
    return html`<section class="legal__block">
      ${b.h ? html`<h2 class="legal__h">${b.h}</h2>` : ''}
      ${(b.p ?? []).map((t) => html`<p>${rich(t, locale)}</p>`)}
      ${b.lines ? html`<p class="legal__lines">${b.lines.map((l, i) => html`${i ? html`<br>` : ''}${l}`)}</p>` : ''}
      ${(b.after ?? []).map((t) => html`<p>${rich(t, locale)}</p>`)}
      ${b.list ? html`<ul>${b.list.map((li) => html`<li>${rich(li, locale)}</li>`)}</ul>` : ''}
      ${(b.tail ?? []).map((t) => html`<p>${rich(t, locale)}</p>`)}
    </section>`;
  });
}

export function render(ctx) {
  const { locale, page } = ctx;
  const p = DICT[locale].pages[page.key];
  const content = page.key === 'impressum' ? impressum(locale) : datenschutz(locale);
  return html`
<section class="page-hero page-hero--legal" aria-labelledby="legal-title">
  <h1 class="page-hero__title page-hero__title--legal" id="legal-title">${p.h1}</h1>
</section>
<article class="legal">${blocks(content, locale)}</article>
`;
}
