import { html, rich } from '../lib/html.mjs';
import { DICT, pick, fill } from '../lib/i18n.mjs';
import { MONTHS, CALIBRES } from '../content/year.mjs';
import { yearRing, icon, picture } from '../lib/components.mjs';

export function render(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const p = t.pages.annee;

  const months = MONTHS.map(
    (m) => html`<li class="month${m.r ? ' month--r' : ''}" data-month="${m.n}" id="m${m.n}">
      <div class="month__head">
        ${icon(m.icon, { cls: 'icon month__icon' })}
        <h3 class="month__name"><span lang="fr">${pick(m.name, 'fr')}</span>${
      locale !== 'fr' ? html`<span class="month__local">${pick(m.name, locale)}</span>` : ''
    }</h3>
        ${m.r ? html`<span class="month__r" title="${p.rMonth}"><span aria-hidden="true">R</span><span class="visually-hidden">${p.rMonth}</span></span>` : ''}
        <span class="month__now">${p.now}</span>
      </div>
      <p class="month__title">${pick(m.title, locale)}</p>
      <p class="month__text">${rich(pick(m.text, locale), locale)}</p>
    </li>`
  );

  // Kalibergrößen: Fläche proportional zum Mittelgewicht
  const maxG = 170;
  const calibres = CALIBRES.map((c) => {
    const mid = c.max ? (c.min + c.max) / 2 : maxG;
    const size = Math.sqrt(mid / maxG); // Fläche ∝ Gewicht
    const label = c.max ? fill(p.calibres.range, { a: c.min, b: c.max }) : fill(p.calibres.over, { g: c.min - 1 });
    return html`<li class="calibre" style="--s:${size.toFixed(3)}">
      <span class="calibre__shape" aria-hidden="true">${icon('oyster', { cls: 'icon calibre__icon' })}</span>
      <span class="calibre__n">Nº&nbsp;${c.n}</span>
      <span class="calibre__g">${label}</span>
    </li>`;
  });

  return html`
<section class="page-hero page-hero--annee" aria-labelledby="annee-title">
  <h1 class="page-hero__title" id="annee-title">${p.h1}</h1>
  <p class="page-hero__lead lead">${rich(p.lead, locale)}</p>
</section>

<section class="year" aria-labelledby="months-h">
  <h2 class="visually-hidden" id="months-h">${{ de: 'Zwölf Monate', fr: 'Douze mois', en: 'Twelve months' }[locale]}</h2>
  <div class="year__ring">${yearRing(locale)}</div>
  <ol class="months" role="list">${months}</ol>
</section>

<section class="rule theme-bleu" aria-labelledby="rule-h">
  <h2 class="t-h3 rule__heading" id="rule-h"><span class="rule__r" aria-hidden="true">R</span>${p.rule.heading}</h2>
  <div class="rule__body">${p.rule.body.map((para) => html`<p>${rich(para, locale)}</p>`)}</div>
</section>

<section class="calibres" aria-labelledby="cal-h">
  <div class="calibres__text">
    <h2 class="t-h3" id="cal-h">${p.calibres.heading}</h2>
    <p class="lead">${rich(p.calibres.body, locale)}</p>
  </div>
  <ol class="calibres__list" role="list">${calibres}</ol>
</section>

<section class="howto" aria-labelledby="howto-h">
  <div class="howto__media">${picture('austern-oeffnen', locale, { sizes: '(min-width: 1024px) 30vw, 80vw', cls: 'howto__photo' })}</div>
  <div class="howto__text">
    <h2 class="t-h3" id="howto-h">${p.howto.heading}</h2>
    <ol class="steps" role="list">${p.howto.steps.map(
      (s, i) => html`<li class="step"><span class="step__n" aria-hidden="true">${i + 1}</span><h3 class="step__title">${s.title}</h3><p>${rich(
        s.text,
        locale
      )}</p></li>`
    )}</ol>
  </div>
</section>

<section class="pairing" aria-labelledby="pair-h">
  <h2 class="t-h3" id="pair-h">${p.pairing.heading}</h2>
  <ul class="pairing__list" role="list">${p.pairing.items.map(
    (it, i) => html`<li class="pairing__item">${icon(i === 3 ? 'flute' : 'wine', { cls: 'icon pairing__icon' })}<h3 class="pairing__name">${
      it.name
    }</h3><p>${rich(it.text, locale)}</p></li>`
  )}</ul>
</section>
`;
}
