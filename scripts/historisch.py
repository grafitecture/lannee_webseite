"""
Historischer Look für Bilder (Vorgabe 05.11.2026): Farbgebung der 50er Jahre.
Schwarzweiß-Bilder werden auf der Website nicht mehr verwendet (Vorgabe 06.11.2026); der Modus „sw“
bleibt nur für Entwürfe erhalten.

Aufruf (aus dem Projektordner):
    python3 scripts/historisch.py sw   eingabe.jpg assets-src/name.jpg [--breite 2400] [--ausschnitt x,y,b,h]
    python3 scripts/historisch.py 50er eingabe.jpg assets-src/name.jpg [--breite 2400] [--ausschnitt x,y,b,h]

  sw    Schwarzweiß wie ein Abzug aus den 50ern: Rotfilter-Mischung, weiche S-Kurve,
        angehobenes Schwarz, leicht warmes Papier, Korn, sanfte Vignette.
  50er  Farbe wie Kodachrome/Ektachrome der 50er: warme Lichter, kühle Schatten,
        gedämpftes Grün, kräftiges Rot/Gelb, ausgeblichenes Schwarz, Korn, Vignette.

--ausschnitt: x, y, Breite, Höhe als Anteil 0–1 (z. B. 0,0.1,1,0.8)
--breite:     Zielbreite; kleinere Vorlagen (z. B. Standbilder aus 720p-Videos) werden mit Lanczos
              vergrößert, das Korn kommt erst danach dazu und verdeckt die Weichheit.

Danach wie gewohnt: npm run images -- name   (AVIF/WebP + Manifest)
Braucht numpy und Pillow. Gleiche Eingabe ergibt das gleiche Bild (fester Zufallswert fürs Korn).
"""

import argparse
import sys

import numpy as np
from PIL import Image, ImageFilter


def lade(pfad, ausschnitt, breite):
    im = Image.open(pfad).convert('RGB')
    if ausschnitt:
        x, y, b, h = ausschnitt
        W, H = im.size
        im = im.crop((round(x * W), round(y * H), round((x + b) * W), round((y + h) * H)))
    if breite and im.width != breite:
        hoehe = round(im.height * breite / im.width)
        im = im.resize((breite, hoehe), Image.LANCZOS)
        if breite > im.width * 0.99:
            im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    return np.asarray(im).astype(np.float32) / 255.0


def kurve(x, staerke):
    """Weiche S-Kurve um 0,5 (staerke 0 = linear)."""
    return x + staerke * (x - 0.5) * (1 - np.abs(2 * x - 1))


def vignette(h, w, staerke):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    nx = (xx - w / 2) / (w / 2)
    ny = (yy - h / 2) / (h / 2)
    r = np.sqrt(nx ** 2 * 0.85 + ny ** 2)
    return 1 - staerke * np.clip(r - 0.35, 0, None) ** 1.6


def korn(h, w, menge, seed, groesse=1.4):
    rng = np.random.default_rng(seed)
    n = rng.normal(0, 1, (max(1, int(h / groesse)), max(1, int(w / groesse)))).astype(np.float32)
    n = np.asarray(Image.fromarray(((n * 0.18 + 0.5).clip(0, 1) * 255).astype(np.uint8)).resize((w, h), Image.BILINEAR)).astype(np.float32) / 255.0
    return (n - 0.5) / 0.18 * menge


def schwarzweiss(rgb, seed):
    h, w, _ = rgb.shape
    # Panchromatischer Film mit leichtem Gelb-/Rotfilter: Himmel dunkler, Haut heller
    y = rgb[..., 0] * 0.42 + rgb[..., 1] * 0.46 + rgb[..., 2] * 0.12
    y = kurve(y, 0.55)
    y = 0.045 + y * 0.93  # Schwarz leicht angehoben, Weiß nicht ganz weiß
    y = y * vignette(h, w, 0.38)
    mitten = 1 - np.abs(2 * y - 1)  # Korn vor allem in den Mitteltönen
    y = y + korn(h, w, 0.045, seed) * (0.35 + 0.65 * mitten)
    y = y.clip(0, 1)
    # Barytpapier: kaum merklich warm
    out = np.stack([y * 1.0 + 0.008, y * 0.992 + 0.004, y * 0.965], axis=-1)
    return out.clip(0, 1)


def fuenfziger(rgb, seed):
    h, w, _ = rgb.shape
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    y = r * 0.299 + g * 0.587 + b * 0.114
    # Grün dämpfen, Rot und Gelb kräftiger (typisch für Kodachrome)
    r2 = r * 1.06 + 0.02
    g2 = g * 0.93 + y * 0.05
    b2 = b * 0.88 + y * 0.08
    out = np.stack([r2, g2, b2], axis=-1)
    # Sättigung insgesamt etwas zurück, aber Rot behalten
    y2 = (out * np.array([0.299, 0.587, 0.114])).sum(-1, keepdims=True)
    out = y2 + (out - y2) * 0.82
    # Weiche Kurve, ausgeblichenes Schwarz
    out = kurve(out.clip(0, 1), 0.35)
    out = 0.06 + out * 0.89
    # Lichter warm (Creme), Schatten kühl (Petrol)
    lum = (out * np.array([0.299, 0.587, 0.114])).sum(-1, keepdims=True)
    warm = np.array([1.04, 1.0, 0.86])
    kuehl = np.array([0.92, 1.0, 1.04])
    out = out * (kuehl + (warm - kuehl) * lum)
    out = out * vignette(h, w, 0.32)[..., None]
    mitten = 1 - np.abs(2 * lum - 1)
    n = korn(h, w, 0.035, seed)[..., None] * (0.4 + 0.6 * mitten)
    out = out + n
    return out.clip(0, 1)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('modus', choices=['sw', '50er'])
    ap.add_argument('eingabe')
    ap.add_argument('ausgabe')
    ap.add_argument('--breite', type=int, default=None)
    ap.add_argument('--ausschnitt', type=lambda s: [float(v) for v in s.split(',')], default=None)
    ap.add_argument('--seed', type=int, default=1898)
    a = ap.parse_args()
    rgb = lade(a.eingabe, a.ausschnitt, a.breite)
    out = schwarzweiss(rgb, a.seed) if a.modus == 'sw' else fuenfziger(rgb, a.seed)
    Image.fromarray((out * 255 + 0.5).astype(np.uint8)).save(a.ausgabe, quality=92, subsampling=0)
    print(f'{a.ausgabe}: {out.shape[1]}×{out.shape[0]} ({a.modus})')


if __name__ == '__main__':
    sys.exit(main())
