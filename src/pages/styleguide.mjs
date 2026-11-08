/**
 * Styleguide (nur Deutsch, noindex): Markensystem, Farben, Typo, Ecken, Bilder, Breakpoints.
 * Stand: Umbau 05.11.2026 – viel Weiß, runde Ecken, nur echte Fotos; Grün-Skala 400–900 seit 08.11.2026.
 */
import { html } from '../lib/html.mjs';
import { LOCATIONS, LOCATION_ORDER } from '../content/site.mjs';
import { COLORS, ROLES, TYPE_SCALE, SPACE, BREAKPOINTS, clampRem, tokenHex } from '../content/tokens.mjs';
import { logo, picture } from '../lib/components.mjs';

/* Kontrast nach WCAG */
function lum(hex) {
  const c = hex.replace('#', '').match(/../g).map((x) => parseInt(x, 16) / 255);
  const l = c.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
}
function contrast(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

const LABEL = { h1: 'Mega-Headline', h2: 'Ortsname, große Aussage', h3: 'Kapitel', h4: 'Abschnitt', h5: 'Zwischentitel', h6: 'Lead, Untertitel', p: 'Fließtext', small: 'Kleintext', xs: 'Detail' };
const RADII = [
  ['--r-xl', 'Große Bildkarten, Farbflächen, Hero-Kacheln, Fußzeile oben'],
  ['--r-l', 'Karten im Inhalt (Wochenplan, Fakten, Atlas)'],
  ['--r-m', 'Kleine Bilder, Eingabefelder'],
  ['--r-pill', 'Buttons, Filter, Hinweise'],
];

export function render(ctx) {
  const { locale } = ctx;
  const sample = { h1: 'Komm vorbei!', h2: 'Kiosque', h3: 'Austern & Bulles', h4: 'Ein Hof, ein Tor, ein Boot.', h5: 'Heute Abend in der Garage', h6: 'Austern, Bulles und ein Plätzchen in der Sonne.', p: 'Freitags und samstags ab 18 Uhr öffnen wir das Tor in der Beilstraße.', small: 'Alle Preise in Euro inklusive Mehrwertsteuer.', xs: '' };

  return html`
<section class="page-hero">
  <h1 class="page-hero__title">Styleguide</h1>
  <p class="lead">Das Markensystem von L’ANNÉE: eine Dachmarke, drei Orte. Diese Seite ist nicht für Gäste gedacht und wird nicht von Suchmaschinen erfasst.</p>
</section>

<section class="sg" aria-labelledby="sg-brand">
  <h2 class="section__title section__title--small" id="sg-brand">Dachmarke und Orte</h2>
  <p class="lead">Aufgeräumt, großflächig, viel Weiß (Umbau 05.11.2026). Farbe kommt nur aus der Grün-Skala 400–900 (08.11.2026), auch die Fotos sind darauf abgestimmt. Die drei Orte: Garage 900 (der Abend), Kiosque 800 (der Sonntag), Marché 600 (der Morgen). Keine Zeichnungen, keine Uhren, kein Film.</p>
  <p class="sg__note">Logo: weiße, gestrichene Holzbuchstaben. Weiß gehört auf Dunkel: Das Logo steht nie auf Weiß und nie auf den hellen Stufen, sondern auf 900 – in der Kopfzeile (über dem Foto oder auf 900) und in der Fußzeile. Es sitzt fest in der Kopfzeile, daneben Linie und Slogan in der Seitensprache.</p>
  <div class="sg__logos">
    ${LOCATION_ORDER.map((k) => html`<div class="sg__logo">${logo({ cls: 'sg__logo-img', decorative: true, sizes: '24rem' })}<span class="tag tag--${LOCATIONS[k].color}">${LOCATIONS[k].name}</span></div>`)}
  </div>
</section>

<section class="sg" aria-labelledby="sg-colors">
  <h2 class="section__title section__title--small" id="sg-colors">Farben</h2>
  <p class="lead">Grün-Skala 400–900 (Vorgabe 08.11.2026), ein Farbton von Citron vert bis Bouteille, dazu Weiß – sonst keine Farben. Dunkle Stufe (900, 800) mit weißer Schrift, helle Stufe (600–400) mit Schrift in 900, auf Weiß Schrift in 900 (Nebentext 800). 700 nur für große Schrift. Nichts Schwarzes, nichts Graues: 900 ersetzt Schwarz. 400 ist der Akzent (aktiv, hover, Hinweise), 500 nur das Angebot des Wochenendes.</p>
  <ul class="swatches" role="list">${COLORS.map(
    (c) => html`<li class="swatch" style="--sw:${c.hex}">
      <span class="swatch__chip"></span>
      <span class="swatch__name">${c.name}</span>
      <code>${c.hex}</code>
      <code>${c.oklch}</code>
      <span class="swatch__role">${c.role}</span>
      <span class="swatch__contrast">Weiß ${contrast(c.hex, '#FFFFFF').toFixed(2)} : 1, 900 ${contrast(c.hex, tokenHex('g900')).toFixed(2)} : 1</span>
    </li>`
  )}</ul>
  <ul class="shades" role="list">${ROLES.map(
    (r) => html`<li class="shade" style="--sw:${tokenHex(r.token)}"><span class="shade__chip"></span><code>--${r.token}</code><code>→ --${r.ref}</code><span>${r.role}</span></li>`
  )}</ul>
</section>

<section class="sg" aria-labelledby="sg-type">
  <h2 class="section__title section__title--small" id="sg-type">Typografie</h2>
  <div class="sg__cols">
    <div class="sg__font">
      <p class="sg__font-name sg__font-name--display">Fraunces</p>
      <p>Für Headlines und große Aussagen, kräftig und eng gesetzt. Die Mega-Headline im Hero steht über drei Zeilen.</p>
    </div>
    <div class="sg__font">
      <p class="sg__font-name sg__font-name--text">Instrument Sans</p>
      <p>Für Fließtext, Navigation, Buttons und Daten.</p>
    </div>
  </div>
  <div class="scale">${TYPE_SCALE.map(
    (t) => html`<div class="scale__row">
      <div class="scale__meta"><code>--fs-${t.token}</code><span>${LABEL[t.token]}</span><span>${t.min.toFixed(3)} → ${t.max}rem</span><code class="scale__clamp">${clampRem(
        t.min,
        t.max
      )}</code>${t.note ? html`<span class="scale__note">${t.note}</span>` : ''}</div>
      <div class="scale__sample scale__sample--${t.token}">${sample[t.token]}</div>
    </div>`
  )}</div>
</section>

<section class="sg" aria-labelledby="sg-radii">
  <h2 class="section__title section__title--small" id="sg-radii">Runde Ecken</h2>
  <p class="lead">Vier Radien, nach Größe gestaffelt: je größer die Fläche, desto runder.</p>
  <ul class="radii" role="list">${RADII.map(([v, role]) => html`<li class="radius"><span class="radius__chip" style="border-radius: var(${v})"></span><code>${v}</code><span>${role}</span></li>`)}</ul>
</section>

<section class="sg" aria-labelledby="sg-images">
  <h2 class="section__title section__title--small" id="sg-images">Bilder</h2>
  <p class="lead">Nur echte Fotos der Orte. Keine generierten Bilder, keine historischen KI-Motive, keine Schwarzweiß-Bilder (seit 06.11.2026).</p>
  <ul class="sg__images" role="list">
    <li>${picture('garage-hof', locale, { sizes: '30vw' })}<code>Garage</code></li>
    <li>${picture('bulles', locale, { sizes: '30vw' })}<code>Bulles</code></li>
    <li>${picture('marche-wagen', locale, { sizes: '30vw' })}<code>Marché</code></li>
  </ul>
</section>

<section class="sg" aria-labelledby="sg-bp">
  <h2 class="section__title section__title--small" id="sg-bp">Breakpoints</h2>
  <p class="lead">Mobile first. Zwischen den Breakpoints skaliert alles fluid mit clamp() von 360 bis 1920 px. Auf dem Desktop bleiben die Seiten volle Breite, nur Fließtext wird auf eine angenehme Zeilenlänge begrenzt.</p>
  <div class="table-wrap"><table class="bp-table">
    <thead><tr><th scope="col">Name</th><th scope="col">ab</th><th scope="col">Geräte</th><th scope="col">Häufigste Auflösungen (StatCounter DE, 09/2026)</th></tr></thead>
    <tbody>${BREAKPOINTS.map(
      (b) => html`<tr><th scope="row"><code>${b.name}</code></th><td>${b.min} px</td><td>${b.devices}</td><td>${b.data}</td></tr>`
    )}</tbody>
  </table></div>
</section>

<section class="sg" aria-labelledby="sg-space">
  <h2 class="section__title section__title--small" id="sg-space">Abstände</h2>
  <ul class="space-list" role="list">${SPACE.map(
    (s) => html`<li><code>--space-${s.token}</code><span class="space-bar" style="--w:var(--space-${s.token})"></span><span>${s.min} → ${s.max}rem</span></li>`
  )}</ul>
</section>

<section class="sg" aria-labelledby="sg-ui">
  <h2 class="section__title section__title--small" id="sg-ui">Bedienelemente</h2>
  <div class="sg__ui">
    <a class="btn btn--solid" href="#sg-ui"><span>Ganze Karte ansehen</span></a>
    <a class="btn btn--line" href="#sg-ui"><span>Anfrage schreiben</span></a>
    ${LOCATION_ORDER.map((k) => html`<a class="btn btn--${k}" href="#sg-ui"><span>Zum ${LOCATIONS[k].name}</span></a>`)}
    ${LOCATION_ORDER.map((k) => html`<span class="tag tag--${k}">${LOCATIONS[k].name}</span>`)}
  </div>
  <p class="sg__note">Pausen-Hinweis: erscheint automatisch auf der Startseite und der jeweiligen Ortsseite, sobald in <code>CLOSURES</code> (site.mjs) ein Eintrag steht. Der Wochenplan markiert betroffene Termine („Diesmal Pause“), die Live-Anzeige springt zum nächsten geöffneten Ort.</p>
  <p class="closure"><span><strong>Garage und Kiosque machen Pause:</strong> 24.–26. Dezember (Weihnachtspause)</span></p>
</section>
`;
}
