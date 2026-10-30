/**
 * Stammdaten – eine Quelle für alle Seiten, Sprachen und das JSON-LD.
 * ---------------------------------------------------------------
 * Öffnungszeiten ändern?  → SCHEDULE
 * Ausnahmen / Ferien?     → CLOSURES
 * Neue Marché-Termine?    → MARCHE_DATES
 */

export const SITE = {
  name: "L'ANNÉE",
  /** Produktions-URL (für Canonical, Sitemap, Open Graph). */
  url: 'https://1898.ma',
  tagline: 'Austern & Bulles', // feststehender Slogan, „Bulles“ nie als „Bläschen“ übersetzen
  instagram: { handle: '@lannee1898', url: 'https://www.instagram.com/lannee1898/' },
  company: {
    name: 'L’ANNÉE GbR',
    partners: ['Andrea Schweppe', 'Eric Schweppe'],
    street: 'Rennershofstraße 7',
    zip: '68163',
    city: 'Mannheim',
    email: 'bonjour@lannee.de',
    /** Optional – wird nur angezeigt, wenn gesetzt. */
    phone: null,
    /** Optional – Umsatzsteuer-ID nach § 27a UStG, falls vorhanden. */
    vatId: null,
    /** Optional – nur bei eingetragener GbR (eGbR): { court, number } */
    register: null,
  },
  agency: { name: 'Grafitecture', url: 'https://www.grafitecture.de/' }, // immer verlinken, mit www
  // Störer „Diese Webseite ist fiktiv“ (Kreis unten rechts). Für den echten Livegang auf false setzen.
  demoNotice: true,
};

/**
 * Die drei Orte. `color` verweist auf die Design-Tokens,
 * `hour` ist die Stunde, auf die der Zeiger im Signet zeigt.
 */
export const LOCATIONS = {
  marche: {
    key: 'marche',
    name: 'Marché',
    color: 'marche',
    hex: '#4F772D',
    hour: 8,
    domain: null,
    email: 'bonjour@lannee.de',
    place: 'Wochenmarkt Lindenhof',
    street: null,
    zip: '68163',
    city: 'Mannheim',
    district: 'Lindenhof',
    mapQuery: 'Wochenmarkt Lindenhof, Mannheim',
    icon: 'marche',
  },
  kiosque: {
    key: 'kiosque',
    name: 'Kiosque',
    color: 'kiosque',
    hex: '#31572C',
    hour: 10,
    domain: 'kiosque.ma',
    email: 'bonjour@kiosque.ma',
    place: null,
    street: 'Lindenhofplatz 1',
    zip: '68163',
    city: 'Mannheim',
    district: 'Lindenhof',
    mapQuery: 'Lindenhofplatz 1, 68163 Mannheim',
    icon: 'kiosque',
  },
  garage: {
    key: 'garage',
    name: 'Garage',
    color: 'garage',
    hex: '#132A13',
    hour: 18,
    domain: 'garage.ma',
    email: 'bonsoir@garage.ma',
    place: null,
    street: 'Beilstraße 6',
    zip: '68159',
    city: 'Mannheim',
    district: 'Jungbusch',
    mapQuery: 'Beilstraße 6, 68159 Mannheim',
    icon: 'garage',
  },
};

/** Reihenfolge, in der die Orte auf der Seite erscheinen (Abend → Morgen → Sonntag). */
export const LOCATION_ORDER = ['garage', 'kiosque', 'marche'];

/**
 * Wochenplan. day: 1 = Montag … 7 = Sonntag (ISO).
 * `openEnd: true` heißt „ab … Uhr“ – das Ende ist nur eine Annahme
 * für die Live-Anzeige und den auslaufenden Balken im Wochenplan. Bitte bei Bedarf anpassen.
 */
export const SCHEDULE = [
  { location: 'garage', day: 5, start: '18:00', end: '23:00', openEnd: true },
  { location: 'marche', day: 6, start: '08:00', end: '13:00', openEnd: false },
  { location: 'garage', day: 6, start: '18:00', end: '23:00', openEnd: true },
  { location: 'kiosque', day: 7, start: '10:00', end: '16:00', openEnd: true },
];

/**
 * Schließtage / Ausnahmen (ISO-Datum, inklusive).
 * Beispiel: { from: '2026-12-24', to: '2026-12-26', locations: ['garage','kiosque'],
 *             note: { de: 'Weihnachtspause', fr: 'Pause de Noël', en: 'Christmas break' } }
 */
export const CLOSURES = [];

/**
 * Zusätzliche Marché-Stopps (erscheinen automatisch auf der Marché-Seite).
 * Beispiel: { date: '2026-11-14', start: '11:00', end: '17:00',
 *             place: { de: 'Hoffest …', fr: '…', en: '…' } }
 */
export const MARCHE_DATES = [];
