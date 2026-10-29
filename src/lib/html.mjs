/**
 * Winzige Template-Engine: html`` escaped alle Werte automatisch,
 * raw() markiert bewusst ungeprüftes Markup, rich() wandelt das
 * Mini-Markup der Inhaltsdateien in sicheres HTML um.
 */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (ch) => ESC[ch]);

class Raw {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

export const raw = (value) => new Raw(String(value ?? ''));

function renderValue(value) {
  if (value == null || value === false || value === true) return '';
  if (value instanceof Raw) return value.value;
  if (Array.isArray(value)) return value.map(renderValue).join('');
  return esc(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) out += renderValue(values[i]) + strings[i + 1];
  return new Raw(out);
}

/** Attribute aus einem Objekt; false/null werden weggelassen, true wird zum booleschen Attribut. */
export function attrs(obj) {
  return raw(
    Object.entries(obj)
      .filter(([, v]) => v != null && v !== false)
      .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
      .join('')
  );
}

/** Typografie: geschützte Leerzeichen zwischen Zahl und Einheit, französische Interpunktion. */
export function typo(text, locale) {
  let s = text;
  s = s.replace(/(\d) (Uhr|h|€|g|kg|l|cl|Stück|pièces|am|pm)\b/g, '$1 $2');
  s = s.replace(/(\d) (€)/g, '$1 $2');
  s = s.replace(/€(\d)/g, '€$1');
  s = s.replace(/\b(Nº|nº|No\.) (\d)/g, '$1 $2');
  if (locale === 'fr') {
    s = s.replace(/ ([:;!?»])/g, ' $1');
    s = s.replace(/« /g, '« ');
  }
  return s;
}

/**
 * Mini-Markup → HTML.
 *   _kursiv_            → <em>
 *   **fett**            → <strong>
 *   {fr|Texte}          → <span lang="fr">Texte</span>
 *   [Text](/pfad)       → <a href="/pfad">Text</a>
 */
export function rich(text, locale) {
  if (text == null) return raw('');
  let s = esc(typo(String(text), locale));
  s = s.replace(/\{(de|fr|en)\|([^}]+)\}/g, '<span lang="$1">$2</span>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(„“"])_([^_]+)_(?=[\s.,;:!?)“”"]|$)/g, '$1<em>$2</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  return raw(s);
}

/** Entfernt das Mini-Markup (für <title>, Meta-Descriptions, aria-label). */
export function plain(text) {
  return String(text ?? '')
    .replace(/\{(de|fr|en)\|([^}]+)\}/g, '$2')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|\s)_([^_]+)_/g, '$1$2')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}
