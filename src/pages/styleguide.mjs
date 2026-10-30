/**
 * Styleguide (nur Deutsch, noindex): Markensystem, Farben, Typo, Breakpoints, Icons.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { html, raw } from '../lib/html.mjs';
import { LOCATIONS, LOCATION_ORDER } from '../content/site.mjs';
import { COLORS, SHADES, TYPE_SCALE, SPACE, BREAKPOINTS, clampRem } from '../content/tokens.mjs';
import { logo, signet, lockup, icon } from '../lib/components.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const ICON_NAMES = fs
  .readFileSync(path.join(ROOT, 'src/icons/higgsfield-icons.txt'), 'utf8')
  .trim()
  .split('\n')
  .map((l) => l.split('|')[0]);

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

const HUE_LABEL = { h1: 'Seitentitel', h2: 'Ortsname, große Aussage', h3: 'Kapitel', h4: 'Abschnitt', h5: 'Zwischentitel', h6: 'Lead, Untertitel', p: 'Fließtext', small: 'Kleintext', xs: 'Detail' };

export function render() {
  const sample = { h1: 'Garage', h2: 'Kiosque', h3: 'Huîtres & Bulles', h4: 'Ein Hof, ein Tor, ein Boot.', h5: 'Heute Abend in der Garage', h6: 'Austern, Bläschen und ein Plätzchen in der Sonne.', p: 'Freitags und samstags ab 18 Uhr öffnen wir das Tor in der Beilstraße.', small: 'Alle Preise in Euro inklusive Mehrwertsteuer.', xs: '' };

  return html`
<section class="page-hero page-hero--sg">
  <h1 class="page-hero__title">Styleguide</h1>
  <p class="page-hero__lead lead">Das Markensystem von L’ANNÉE: eine Dachmarke, drei Orte, eine gemeinsame Uhr. Diese Seite ist nicht für Gäste gedacht und wird nicht von Suchmaschinen erfasst.</p>
</section>

<section class="sg" aria-labelledby="sg-brand">
  <h2 class="t-h4" id="sg-brand">Dachmarke und Subbrands</h2>
  <div class="sg__cols">
    <div>
      <p class="lead">Der Akzent aus dem É von L’ANNÉE wird zum Uhrzeiger. Jedes Signet zeigt auf die Stunde, zu der der Ort öffnet. Die Farben folgen dem Tageslicht: Grün am Morgen, Blau am Sonntag, Bordeaux am Abend.</p>
      <ul class="sg__rules">
        <li><strong>Marché</strong>: Zeiger auf 8 Uhr, Vert L’ANNÉE</li>
        <li><strong>Kiosque</strong>: Zeiger auf 10 Uhr, Bleu Marée</li>
        <li><strong>Garage</strong>: Zeiger auf 6, also 18 Uhr, Rouge Bordeaux</li>
        <li><strong>L’ANNÉE</strong>: alle drei Zeiger zusammen</li>
      </ul>
    </div>
    <div class="sg__signets">
      ${signet('all', { cls: 'sg__signet sg__signet--all' })}
      ${LOCATION_ORDER.map((k) => signet(k, { cls: `sg__signet theme-${LOCATIONS[k].color}-text` }))}
    </div>
  </div>
  <p class="sg__note">Lockup: Das L’ANNÉE-Logo steht so hoch wie der Zweizeiler aus Ortsname (mit Linie) und <span lang="fr">Huîtres &amp; Bulles</span>. Auf den Farbflächen aller drei Orte ist die Schrift weiß. Die Signets bleiben als kleine Wegweiser in Navigation, Fahrplan und Fußzeile.</p>
  <div class="sg__lockups">
    ${LOCATION_ORDER.map((k) => html`<div class="sg__lockup">${lockup(k)}</div>`)}
  </div>
  <div class="sg__logos">
    <div class="sg__logo sg__logo--white">${logo({ cls: 'sg__logo-svg', decorative: true })}</div>
    <div class="sg__logo sg__logo--ink">${logo({ cls: 'sg__logo-svg', decorative: true })}</div>
    <div class="sg__logo sg__logo--green">${logo({ cls: 'sg__logo-svg', decorative: true })}</div>
  </div>
  <p class="sg__note">Schutzzone: mindestens die Höhe des Akzents rund um das Logo. Mindestbreite digital: 96 px.</p>
</section>

<section class="sg" aria-labelledby="sg-colors">
  <h2 class="t-h4" id="sg-colors">Farben</h2>
  <p class="lead">Zum bestehenden Grün kommen zwei Farben: Bleu Marée für Meer, Austern und Gezeiten und Rouge Bordeaux für Wein und Frankreich. Alle drei haben eine ähnliche Sättigung (OKLCH-Chroma ≈ 0,11) und liegen im Farbkreis rund 95° bzw. 140° auseinander: harmonisch, aber klar unterscheidbar. Mit Nacre und Encre ergibt sich ein leises Bleu-Blanc-Rouge.</p>
  <ul class="swatches" role="list">${COLORS.map(
    (c) => html`<li class="swatch" style="--sw:${c.hex}">
      <span class="swatch__chip"></span>
      <span class="swatch__name">${c.name}</span>
      <code>${c.hex}</code>
      <code>${c.oklch}</code>
      <span class="swatch__role">${c.role}</span>
      <span class="swatch__contrast">Weiß ${contrast(c.hex, '#FFFFFF').toFixed(2)} : 1, Encre ${contrast(c.hex, '#142237').toFixed(2)} : 1</span>
    </li>`
  )}</ul>
  <ul class="shades" role="list">${SHADES.map(
    (s) => html`<li class="shade" style="--sw:${s.hex}"><span class="shade__chip"></span><code>--${s.token}</code><code>${s.hex}</code></li>`
  )}</ul>
</section>

<section class="sg" aria-labelledby="sg-type">
  <h2 class="t-h4" id="sg-type">Typografie</h2>
  <div class="sg__cols">
    <div class="sg__font">
      <p class="sg__font-name sg__font-name--display">Fraunces</p>
      <p>Für Titel und große Aussagen. Weiche, leicht gerundete Serifen greifen die runden Ecken des Logos auf, die optische Größe passt sich automatisch an: zart bei 287 px, kräftig bei 24 px. Variable Schrift, auf Gewicht 300–700 und weiche Form (SOFT 100) zugeschnitten, selbst gehostet.</p>
    </div>
    <div class="sg__font">
      <p class="sg__font-name sg__font-name--text">Instrument Sans</p>
      <p>Für Fließtext, Navigation und Daten. Ruhig und gut lesbar, mit schmaler Breite (wdth 75) für die Subbrand-Namen in gesperrten Versalien wie auf dem Marché-Anhänger.</p>
    </div>
  </div>
  <div class="scale">${TYPE_SCALE.map(
    (t) => html`<div class="scale__row">
      <div class="scale__meta"><code>--fs-${t.token}</code><span>${HUE_LABEL[t.token]}</span><span>${t.min.toFixed(3)} → ${t.max}rem</span><code class="scale__clamp">${clampRem(
        t.min,
        t.max
      )}</code>${t.note ? html`<span class="scale__note">${t.note}</span>` : ''}</div>
      <div class="scale__sample scale__sample--${t.token}">${sample[t.token]}</div>
    </div>`
  )}</div>
</section>

<section class="sg" aria-labelledby="sg-bp">
  <h2 class="t-h4" id="sg-bp">Breakpoints</h2>
  <p class="lead">Mobile first. Zwischen den Breakpoints skaliert alles fluid mit clamp() von 360 bis 1920 px. Auf dem Desktop bleiben die Seiten immer volle Breite, nur Fließtext wird auf eine angenehme Zeilenlänge begrenzt.</p>
  <div class="table-wrap"><table class="bp-table">
    <thead><tr><th scope="col">Name</th><th scope="col">ab</th><th scope="col">Geräte</th><th scope="col">Häufigste Auflösungen (StatCounter DE, 09/2026)</th></tr></thead>
    <tbody>${BREAKPOINTS.map(
      (b) => html`<tr><th scope="row"><code>${b.name}</code></th><td>${b.min} px</td><td>${b.devices}</td><td>${b.data}</td></tr>`
    )}</tbody>
  </table></div>
</section>

<section class="sg" aria-labelledby="sg-space">
  <h2 class="t-h4" id="sg-space">Abstände</h2>
  <ul class="space-list" role="list">${SPACE.map(
    (s) => html`<li><code>--space-${s.token}</code><span class="space-bar" style="--w:var(--space-${s.token})"></span><span>${s.min} → ${s.max}rem</span></li>`
  )}</ul>
</section>

<section class="sg" aria-labelledby="sg-icons">
  <h2 class="t-h4" id="sg-icons">Icons</h2>
  <p class="lead">27 Icons, generiert mit Higgsfield AI (Recraft V4.1, Vektor-Modus), als SVG-Sprite eingebunden und über currentColor einfärbbar.</p>
  <ul class="icon-grid" role="list">${ICON_NAMES.map((n) => html`<li>${icon(n, { cls: 'icon icon-grid__icon' })}<code>${n}</code></li>`)}</ul>
</section>

<section class="sg" aria-labelledby="sg-ui">
  <h2 class="t-h4" id="sg-ui">Bedienelemente</h2>
  <div class="sg__ui">
    <a class="btn btn--solid" href="#sg-ui"><span>Zur Karte</span></a>
    <a class="btn btn--line" href="#sg-ui"><span>Wo wir sind</span></a>
    ${LOCATION_ORDER.map((k) => html`<span class="tag tag--${k}">${signet(k, { cls: 'tag__signet' })}${LOCATIONS[k].name}</span>`)}
  </div>
  <p class="sg__note">Pausen-Hinweis: erscheint automatisch auf der Startseite und der jeweiligen Ortsseite, sobald in <code>CLOSURES</code> (site.mjs) ein Eintrag steht. Der Wochenplan schraffiert betroffene Termine („Diesmal Pause“), die Live-Anzeige springt zum nächsten geöffneten Ort.</p>
  <p class="closure"><span class="closure__icon" aria-hidden="true"></span><span><strong>Garage und Kiosque machen Pause:</strong> 24.–26. Dezember (Weihnachtspause)</span></p>
</section>
`;
}
