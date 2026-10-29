/**
 * Bild-Pipeline für L'ANNÉE
 * --------------------------------------------------------------
 * Erzeugt aus den Originalen in /assets-src responsive Varianten
 * (AVIF + WebP) in /public/images und schreibt ein Manifest mit
 * Maßen, Breiten und einer Platzhalterfarbe nach
 * /src/content/images.json.
 *
 * Aufruf:  npm install --no-save sharp && npm run images
 * (sharp wird nur hier gebraucht – der normale Build kommt ohne
 *  Abhängigkeiten aus.)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('sharp fehlt. Bitte zuerst: npm install --no-save sharp');
  process.exit(1);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets-src');
const OUT = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'src', 'content', 'images.json');

/** Zielbreiten – orientiert an den Breakpoints (480 … 2560). */
const WIDTHS = [480, 768, 1080, 1440, 1920, 2560];

/**
 * Optional: Bildausschnitt (x, y, w, h als Anteil 0–1) für Motive,
 * die in einem anderen Seitenverhältnis gebraucht werden.
 */
const SOURCES = {
  'garage-hof': { file: 'garage-hof.jpg' },
  'kiosque-visualisierung': { file: 'kiosque-visualisierung.jpg' },
  'marche-wagen': { file: 'marche-wagen.jpg' },
  'marche-auslage': { file: 'marche-auslage.jpg' },
  'austern-postkarte': { file: 'austern-postkarte.jpg' },
  'austern-oeffnen': { file: 'austern-oeffnen.jpg' },
  'wein-eis': { file: 'wein-eis.jpg' },
  'bulles': { file: 'bulles.jpg' },
  'huitres-glace': { file: 'huitres-glace.jpg' },
  'garage-austernbar': { file: 'garage-austernbar.webp' },
  'garage-fenster': { file: 'garage-fenster.webp' },
  'garage-wand': { file: 'garage-wand.webp' },
  'hof-bistrotische': { file: 'hof-bistrotische.webp' },
  'garage-merci': { file: 'garage-merci.webp' },
  'garage-weinlaub': { file: 'garage-weinlaub.webp' },
  'garage-bar': { file: 'garage-bar.webp' },
  'garage-boot': { file: 'garage-boot.webp' },
  'garage-eingang': { file: 'garage-eingang.jpg' },
  'schweppes': { file: 'schweppes.jpg' },
  'baguettes': { file: 'baguettes.jpg' },
};

const toHex = (r, g, b) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

async function processImage(name, cfg) {
  const input = path.join(SRC, cfg.file);
  let base = sharp(input).rotate();
  const meta = await base.metadata();
  let { width, height } = meta;
  if (cfg.crop) {
    const [cx, cy, cw, ch] = cfg.crop;
    const region = {
      left: Math.round(cx * width),
      top: Math.round(cy * height),
      width: Math.round(cw * width),
      height: Math.round(ch * height),
    };
    base = base.extract(region);
    width = region.width;
    height = region.height;
  }
  const buffer = await base.toBuffer();
  const widths = WIDTHS.filter((w) => w < width);
  widths.push(width); // Originalbreite immer mit ausgeben
  const unique = [...new Set(widths)].sort((a, b) => a - b);

  for (const w of unique) {
    const pipeline = sharp(buffer).resize({ width: w, withoutEnlargement: true });
    await pipeline.clone().avif({ quality: 52, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await pipeline.clone().webp({ quality: 74, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }

  // Platzhalterfarbe (Durchschnitt eines 1×1-Thumbnails)
  const { data } = await sharp(buffer).resize(1, 1).raw().toBuffer({ resolveWithObject: true });
  return { width, height, widths: unique, color: toHex(data[0], data[1], data[2]) };
}

await fs.mkdir(OUT, { recursive: true });
const manifest = {};
for (const [name, cfg] of Object.entries(SOURCES)) {
  manifest[name] = await processImage(name, cfg);
  console.log(`✓ ${name}  ${manifest[name].width}×${manifest[name].height}  [${manifest[name].widths.join(', ')}]`);
}
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nManifest: ${path.relative(ROOT, MANIFEST)}`);
