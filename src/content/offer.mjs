/**
 * Angebot des Wochenendes (Startseite, im Hero, seit 06.11.2026).
 * ---------------------------------------------------------------------------
 * Jedes Wochenende ein Angebot aus der Karte, herzlich formuliert, in Homard-Rot.
 * So pflegt man es: oben in OFFERS einen neuen Eintrag anlegen (from/until = Freitag/Sonntag).
 * Gezeigt wird beim Build das erste Angebot, das noch nicht abgelaufen ist; nach `until`
 * blendet das Skript es aus (data-expires), auch wenn die Seite nicht neu gebaut wurde.
 *
 * items:   Positionen aus src/content/menu.mjs ({ id, col } – col = Preisspalte, z. B. 1 = 6 Stück
 *          bzw. Flasche). Daraus wird der Normalpreis berechnet, damit „statt …“ immer stimmt.
 * upgrade: Tausch einer Position gegen eine andere (z. B. Champagner statt Crémant) mit eigenem Festpreis.
 * where:   Orte, an denen es das Angebot gibt (Links zu den Ortsseiten).
 */
import { MENU } from './menu.mjs';

export const OFFERS = [
  {
    id: 'plateau-a-deux',
    from: '2026-11-06',
    until: '2026-11-08',
    where: ['garage', 'kiosque'],
    items: [
      { id: 'fines-de-claire', col: 1 }, // 6 Stück
      { id: 'speciales', col: 1 }, // 6 Stück
      { id: 'croquettes' },
      { id: 'pain' },
      { id: 'cremant', col: 1 }, // Flasche
    ],
    price: 69,
    upgrade: { swap: 'cremant', with: { id: 'champagne', col: 1 }, price: 89 },
    title: { de: 'Le Plateau à deux', fr: 'Le Plateau à deux', en: 'Le Plateau à deux' },
    text: {
      de: 'Zwölf Austern nur für euch zwei – sechs Fines de Claire, sechs Spéciales –, dazu knusprige Krabbenkroketten, geröstetes Brot mit gesalzener Butter und eine ganze Flasche Crémant de Loire. Rückt die Stühle zusammen, um den Rest kümmern wir uns.',
      fr: 'Douze huîtres rien que pour vous deux – six Fines de Claire, six Spéciales –, des croquettes de crevettes grises bien croustillantes, du pain grillé au beurre demi-sel et une bouteille entière de Crémant de Loire. Rapprochez vos chaises, on s’occupe du reste.',
      en: 'A dozen oysters just for the two of you – six Fines de Claire, six Spéciales – with crispy brown shrimp croquettes, toasted bread with salted butter and a whole bottle of Crémant de Loire. Pull your chairs together, we’ll take care of the rest.',
    },
    upgradeLabel: {
      de: 'Mit Champagner statt Crémant',
      fr: 'Avec du champagne à la place du crémant',
      en: 'With champagne instead of crémant',
    },
    note: {
      de: 'Einfach vorbeikommen, reservieren müsst ihr nicht. Solange die Austern reichen.',
      fr: 'Passez simplement, sans réservation. Dans la limite des huîtres disponibles.',
      en: 'Just drop by, no booking needed. While the oysters last.',
    },
  },
];

/** Feste Beschriftungen des Angebots. */
export const OFFER_UI = {
  eyebrow: { de: 'Angebot des Wochenendes', fr: 'L’offre du week-end', en: 'This weekend’s special' },
  per: { de: 'für zwei', fr: 'pour deux', en: 'for two' },
  was: { de: 'statt', fr: 'au lieu de', en: 'instead of' },
  where: {
    garage: { de: 'Garage · Fr & Sa ab 18 Uhr', fr: 'Garage · ven. & sam. dès 18 h', en: 'Garage · Fri & Sat from 6 pm' },
    kiosque: { de: 'Kiosque · So ab 10 Uhr', fr: 'Kiosque · dim. dès 10 h', en: 'Kiosque · Sun from 10 am' },
    marche: { de: 'Marché · Sa 8–13 Uhr', fr: 'Marché · sam. 8 h – 13 h', en: 'Marché · Sat 8 am – 1 pm' },
  },
};

/** Preis einer Position der Karte (Spalte `col` bei mehreren Preisen). */
export function menuPrice({ id, col = 0 }) {
  for (const chapter of MENU)
    for (const section of chapter.sections)
      for (const item of section.items) {
        if (item.id !== id) continue;
        const value = item.prices ? item.prices[col] : item.price;
        if (typeof value !== 'number') throw new Error(`Angebot: Preis fehlt für ${id} (Spalte ${col})`);
        return value;
      }
  throw new Error(`Angebot: Position ${id} nicht in der Karte`);
}

/** Normalpreise (ohne und mit Upgrade) aus den Kartenpreisen. */
export function offerRegular(offer) {
  const base = offer.items.reduce((sum, it) => sum + menuPrice(it), 0);
  if (!offer.upgrade) return { base };
  const swapped = offer.items.find((it) => it.id === offer.upgrade.swap);
  return { base, upgrade: base - menuPrice(swapped) + menuPrice(offer.upgrade.with) };
}

/** Das Angebot, das am Tag `ymd` (Berlin, „YYYY-MM-DD“) gilt oder als Nächstes kommt. */
export function currentOffer(ymd) {
  return OFFERS.filter((o) => o.until >= ymd).sort((a, b) => a.from.localeCompare(b.from))[0] ?? null;
}
