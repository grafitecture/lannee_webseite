/**
 * Die drei Orte als Strichzeichnungen: Garage, Kiosque, Marché-Wagen.
 * ---------------------------------------------------------------------------
 * Stehen über den Subbrand-Lockups (Startseite „drei Orte“, Ortsseiten).
 * Feine Linie in currentColor (auf Grün weiß, auf Weiß im Grün des Ortes).
 * Hat der Ort gerade geöffnet, geht das Licht an: Fenster in Lime Cream,
 * ein weicher Schein darum und ein Lichtkegel, der vor dem Haus auf die
 * Straße fällt (unterhalb der Bodenlinie). Live-Teil: initVenueLights() in main.js,
 * Vorschau mit ?licht=an.
 *
 * Fläche 160 × 84, Bodenlinie bei y = 64, darunter liegt die Straße.
 */
import { html, raw } from './html.mjs';
import { SCHEDULE, CLOSURES } from '../content/site.mjs';

const GROUND = 'M2 64H158';

/** Glühbirnen der Lichterkette über der Garage (auf der Kurve, leicht hängend). */
const BULBS = [
  [36.5, 28], [51, 29], [65.5, 28], [80, 25], [94.5, 28], [109, 29], [123.5, 28],
].map(([x, y]) => [x, y + 1.7]);

const DRAWINGS = {
  /* Garage im Jungbusch: Hof-Fassade mit zwei verglasten Toren und einer Lichterkette */
  garage: {
    lines: [
      'M22 64V22M138 22V64',
      'M18 17h124v5H18z',
      'M30 64V34h46v30M84 64V34h46v30',
      'M45.3 34v30M60.7 34v30M30 41.5h46M30 49h46M30 56.5h46',
      'M99.3 34v30M114.7 34v30M84 41.5h46M84 49h46M84 56.5h46',
      'M22 25Q51 33 80 25Q109 33 138 25',
    ],
    glass: ['M30 34h46v30H30z', 'M84 34h46v30H84z'],
    soft: [],
    pools: ['M30 64h46l4 18H22z', 'M84 64h46l8 18H80z'],
    bulbs: BULBS,
  },
  /* Kiosque im Lindenhof: Pavillon mit Markise, Verkaufsfenster mit Hängelampen und Tresen;
     links eine Linde, rechts Bistrotisch und Stuhl */
  kiosque: {
    lines: [
      'M80 10V6.2',
      'M32 26L80 10l48 16z',
      'M38 26v6M122 26v6M50 26v6M62 26v6M74 26v6M86 26v6M98 26v6M110 26v6',
      'M38 32q6 5 12 0q6 5 12 0q6 5 12 0q6 5 12 0q6 5 12 0q6 5 12 0q6 5 12 0',
      'M44 64V34M116 34V64',
      'M50 38h60v14H50z',
      'M70 38v14M90 38v14',
      'M60 38v2.5M80 38v2.5M100 38v2.5',
      'M56.5 43.5l1.5-3h4l1.5 3zM76.5 43.5l1.5-3h4l1.5 3zM96.5 43.5l1.5-3h4l1.5 3z',
      'M42 52h76v3H42z',
      'M19 64V50M19 50c-7 0-11-5-9.5-10.5C8 34 13 30 19 31c6-1 11 3 9.5 9C30 45 26 50 19 50z',
      'M131 50h14M138 50v13.2M134 64h8',
      'M152 44v20M146 56h6M146 56v8',
    ],
    circles: [[80, 4.8, 1.4]],
    glass: ['M50 38h60v14H50z'],
    soft: [],
    pools: ['M44 64h72l10 18H34z'],
    bulbs: [],
  },
  /* Marché: Verkaufsanhänger mit Vitrine unter dem Marktschirm, ein Rad, Deichsel und Stütze;
     links die Kreidetafel */
  marche: {
    lines: [
      'M20 24C40 10 120 10 140 24',
      'M20 24v4h120v-4',
      'M44 28v12M114 28v12',
      'M40 40h78v14H82a10 10 0 0 0-20 0H40z',
      'M60 40v-7l6-3h46v10',
      'M118 50l20 6h6M138 56v4.4',
      'M44 54v10',
      'M16 46h13v14H16zM18 60l-1.5 4M27 60l1.5 4M19 50h7M19 53h7M19 56h4.5',
    ],
    circles: [[72, 57, 7], [72, 57, 2.2], [138, 62.2, 1.8]],
    glass: ['M60 40v-7l6-3h46v10z'],
    soft: ['M20 28h120v-4C120 10 40 10 20 24z'],
    pools: ['M40 64h78l10 18H30z'],
    bulbs: [],
  },
};

/** Öffnungszeiten eines Ortes für die Live-Anzeige (nur, was das Skript braucht). */
const hoursFor = (key) => SCHEDULE.filter((s) => s.location === key).map((s) => ({ day: s.day, start: s.start, end: s.end }));
const closuresFor = (key) => CLOSURES.filter((c) => (c.locations || []).includes(key)).map((c) => ({ from: c.from, to: c.to }));

let seq = 0;

/**
 * Strichzeichnung eines Ortes (dekorativ, aria-hidden).
 * lit: true = Licht fest an, ohne Live-Anzeige (Styleguide).
 */
export function venueArt(key, { cls = '', lit = false } = {}) {
  const d = DRAWINGS[key];
  if (!d) return '';
  const id = `va-${key}-${++seq}`;
  const path = (p) => `<path d="${p}"/>`;
  const circle = ([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
  const svg = [
    `<defs>`,
    `<linearGradient id="${id}-g" x1="0" y1="0" x2="0" y2="1"><stop class="venue-art__stop" offset="0"/><stop class="venue-art__stop venue-art__stop--end" offset="1"/></linearGradient>`,
    `<filter id="${id}-b" x="-40%" y="-60%" width="180%" height="220%"><feGaussianBlur stdDeviation="3.2"/></filter>`,
    `</defs>`,
    `<g class="venue-art__pool" fill="url(#${id}-g)">${d.pools.map(path).join('')}</g>`,
    `<g class="venue-art__halo" filter="url(#${id}-b)">${d.glass.map(path).join('')}${d.bulbs.map(([x, y]) => circle([x, y, 2.6])).join('')}</g>`,
    d.soft.length ? `<g class="venue-art__soft">${d.soft.map(path).join('')}</g>` : '',
    `<g class="venue-art__glass">${d.glass.map(path).join('')}</g>`,
    `<g class="venue-art__line">${d.lines.map(path).join('')}${(d.circles || []).map(circle).join('')}${path(GROUND)}</g>`,
    d.bulbs.length ? `<g class="venue-art__bulbs">${d.bulbs.map(([x, y]) => circle([x, y, 1.6])).join('')}</g>` : '',
  ].join('');
  const head = `class="venue-art venue-art--${key}${lit ? ' is-lit' : ''} ${cls}" viewBox="0 0 160 84" aria-hidden="true" focusable="false"`;
  return lit
    ? html`<svg ${raw(head)}>${raw(svg)}</svg>`
    : html`<svg ${raw(head)} data-venue-light="${key}" data-hours="${JSON.stringify(hoursFor(key))}" data-closures="${JSON.stringify(
        closuresFor(key)
      )}">${raw(svg)}</svg>`;
}
