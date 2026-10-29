import de from '../content/i18n/de.mjs';
import fr from '../content/i18n/fr.mjs';
import en from '../content/i18n/en.mjs';

export const LOCALES = ['de', 'fr', 'en'];
export const DEFAULT_LOCALE = 'de';
export const DICT = { de, fr, en };

/** Seiten-Schlüssel → URL je Sprache (Deutsch ohne Präfix). */
export const ROUTES = {
  home: { de: '/', fr: '/fr/', en: '/en/' },
  garage: { de: '/garage/', fr: '/fr/garage/', en: '/en/garage/' },
  kiosque: { de: '/kiosque/', fr: '/fr/kiosque/', en: '/en/kiosque/' },
  marche: { de: '/marche/', fr: '/fr/marche/', en: '/en/marche/' },
  carte: { de: '/karte/', fr: '/fr/carte/', en: '/en/menu/' },
  annee: { de: '/das-jahr/', fr: '/fr/l-annee/', en: '/en/the-year/' },
  contact: { de: '/kontakt/', fr: '/fr/contact/', en: '/en/contact/' },
  impressum: { de: '/impressum/', fr: '/fr/mentions-legales/', en: '/en/legal-notice/' },
  datenschutz: { de: '/datenschutz/', fr: '/fr/confidentialite/', en: '/en/privacy/' },
};

export const url = (key, locale) => ROUTES[key][locale];

/** Wert aus einem { de, fr, en }-Objekt oder einen einfachen String zurückgeben. */
export function pick(value, locale) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return value;
  return value[locale] ?? value[DEFAULT_LOCALE] ?? '';
}

export function fill(template, vars) {
  return String(template).replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
}

/** Uhrzeit "18:00" → "18 Uhr" / "18 h" / "6 pm" */
export function formatTime(hhmm, locale) {
  const [h, m] = hhmm.split(':').map(Number);
  if (locale === 'en') {
    const suffix = h >= 12 && h < 24 ? 'pm' : 'am';
    const h12 = ((h + 11) % 12) + 1;
    return m ? `${h12}:${String(m).padStart(2, '0')} ${suffix}` : `${h12} ${suffix}`;
  }
  if (locale === 'fr') return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
  return m ? `${h}:${String(m).padStart(2, '0')} Uhr` : `${h} Uhr`;
}

/** Preis 3.8 → "3,80" (de/fr) bzw. "3.80" (en); ganze Zahlen ohne Nachkommastellen. */
export function formatPrice(value, locale) {
  if (value == null) return '';
  const intl = DICT[locale].intl;
  const isInt = Number.isInteger(value);
  return new Intl.NumberFormat(intl, {
    minimumFractionDigits: isInt ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatEuro(value, locale) {
  const n = formatPrice(value, locale);
  return locale === 'en' ? `€${n}` : `${n} €`;
}
