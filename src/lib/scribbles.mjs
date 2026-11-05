/**
 * Bleistift-Scribbles: 48 kleine Kinderzeichnungen und Sprüche in Kinderschrift (4B, krakelig, dicker Strich;
 * gezeichnet von scripts/scribbles.py), angeschnitten an den Rändern der Flächen oder frei auf leeren Stellen,
 * immer hinter dem Inhalt.
 *
 * Dateien:  public/scribbles/<name>.webp  (Strich in Embrun, Papier transparent)
 * Manifest: src/content/scribbles.json    (erzeugt von scripts/scribbles.py)
 *
 * Aufruf in einer Vorlage:
 *   ${scribbles(ctx, [{ at: 'r', y: '20%', s: 'l' }, { at: 'b', x: '60%', kind: 'claim' }])}
 * und die Fläche bekommt die Klasse `has-scribbles`.
 *
 * Platz (slot):
 *   at     'l' | 'r'  → ragt über den linken/rechten Rand; y = Abstand von oben (oder yb = von unten)
 *          't' | 'b'  → ragt über den oberen/unteren Rand; x = Abstand von links
 *          'free'     → liegt frei auf einer leeren Stelle der Fläche, Mitte bei x / y (Prozent der Fläche),
 *                       nichts angeschnitten
 *   s      Größe 's' | 'm' | 'l' (gleiche Fläche je Größe, egal ob hoch oder quer)
 *   bleed  Anteil, der hinter dem Rand verschwindet (Standard 0,3; Sprüche höchstens 0,05, damit sie lesbar bleiben)
 *   kind   'object' (Standard) oder 'claim' (Spruch)
 *   wide   true → erst ab 768 px (auf dem Handy weniger Zeichnungen)
 *   prefer Wunschliste (Namen, in dieser Reihenfolge): das erste passende, noch freie Motiv in der
 *          Sprache der Seite; sonst Zufall. So passen die Motive zum Ort (Garage: Coupes, Marché: Boot …).
 *   pick   fester Name, auch über die Sprachregel hinweg (z. B. 404)
 *
 * Auswahl je Seite und Sprache fest (Zufall mit Startwert aus Seite + Sprache), auf einer Seite keine
 * Wiederholung. Sprüche mit `langs` erscheinen nur auf diesen Sprachseiten.
 */
import fs from 'node:fs';
import { html } from './html.mjs';

const MANIFEST = new URL('../content/scribbles.json', import.meta.url);
const ITEMS = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : [];
const SIZE = { s: 0.8, m: 1, l: 1.28 };

/** Kleiner, reproduzierbarer Zufall (mulberry32) mit Startwert aus einem Text. */
function rng(seedText) {
  let a = 0;
  for (const ch of seedText) a = (Math.imul(a ^ ch.codePointAt(0), 2654435761) + 0x9e3779b9) | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createState(ctx) {
  const rand = rng(`${ctx.page?.key ?? 'page'}/${ctx.locale}`);
  const pool = ITEMS.filter((it) => !it.langs || it.langs.includes(ctx.locale));
  // Fisher-Yates mit festem Startwert
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const used = new Set();
  return {
    rand,
    take(slot) {
      if (slot.pick) {
        const it = ITEMS.find((x) => x.name === slot.pick);
        if (it) used.add(it.name);
        return it;
      }
      const kind = slot.kind ?? 'object';
      const fits = (x) => x && x.kind === kind && !used.has(x.name);
      let it = (slot.prefer ?? []).map((name) => pool.find((x) => x.name === name)).find(fits);
      it ??= pool.find(fits);
      if (!it) {
        // alle schon benutzt: wieder von vorn (kommt bei 48 Motiven praktisch nicht vor)
        for (const x of pool) if (x.kind === kind) used.delete(x.name);
        it = pool.find((x) => x.kind === kind);
      }
      if (it) used.add(it.name);
      return it;
    },
  };
}

const n = (v, d = 3) => Number(v.toFixed(d));

function place(slot, item, rand) {
  const ar = item.w / item.h;
  const f = Math.sqrt(ar) * (SIZE[slot.s ?? 'm'] ?? 1);
  const claim = item.kind === 'claim';
  const bleed = claim ? Math.min(slot.bleed ?? 0.05, 0.05) : (slot.bleed ?? 0.3);
  const tilt = claim ? 5 : 9;
  const rot = slot.r ?? n((rand() * 2 - 1) * tilt, 1);
  const style = [`--f:${n(f)}`, `--ar:${n(ar)}`, `--r:${rot}deg`];
  const at = slot.at ?? 'r';
  if (at === 'free') {
    style.push(`left:${slot.x ?? '50%'}`, `top:${slot.y ?? '50%'}`);
  } else if (at === 'l' || at === 'r') {
    style.push(`${at === 'l' ? 'left' : 'right'}:calc(var(--w) * ${-bleed})`);
    style.push(slot.yb != null ? `bottom:${slot.yb}` : `top:${slot.y ?? '10%'}`);
  } else {
    style.push(`${at === 't' ? 'top' : 'bottom'}:calc(var(--w) / var(--ar) * ${-bleed})`);
    style.push(`left:${slot.x ?? '50%'}`);
  }
  return style.join(';');
}

/**
 * Ebene mit Scribbles für eine Fläche (die Fläche braucht die Klasse `has-scribbles`).
 * `gutter: true` → die Ebene reicht um den Seitenrand (--gutter) über die Fläche hinaus bis an den Bildschirmrand
 * (für Blöcke innerhalb eines Containers mit Seitenrand, z. B. die Kapitel der Karte).
 */
export function scribbles(ctx, slots, { gutter = false } = {}) {
  if (!ITEMS.length) return '';
  const state = (ctx.scribbleState ??= createState(ctx));
  const items = slots.map((slot) => {
    const item = state.take(slot);
    if (!item) return '';
    const cls = `scribble scribble--${item.kind}${slot.at === 'free' ? ' scribble--free' : ''}${slot.wide ? ' scribble--wide' : ''}`;
    return html`<span class="${cls}" style="${place(slot, item, state.rand)}"><img src="/scribbles/${item.name}.webp" alt="" width="${item.w}" height="${item.h}" loading="lazy" decoding="async"></span>`;
  });
  return html`<div class="scribbles${gutter ? ' scribbles--gutter' : ''}" aria-hidden="true">${items}</div>`;
}

/** Alle Motive (für den Styleguide). */
export const SCRIBBLES = ITEMS;
