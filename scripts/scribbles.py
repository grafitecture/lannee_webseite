#!/usr/bin/env python3
"""
Bleistift-Scribbles für L'ANNÉE
--------------------------------------------------------------
Quelle: vier Bögen mit je 12 Bleistiftzeichnungen (Higgsfield AI,
GPT Image 2, 4K, 04.11.2026), in assets-src/scribbles/sheet-{a,b,c,d}.jpg
(Graustufen; Higgsfield-Jobs 6d8e94be, 2364b0e0, 1ad91f01, b6169349).

Das Skript findet die 12 Zeichnungen je Bogen (4 × 3 Raster),
schneidet sie aus, macht aus dem Papier Transparenz (je dunkler der
Strich, desto deckender) und schreibt
  public/scribbles/<name>.webp      (Alpha = Bleistiftstrich)
  src/content/scribbles.json        (Name, Art, Sprache, Maße)
Strichfarbe = Embrun (aus src/content/tokens.mjs). Auf blauen Flächen
macht CSS die Striche weiß (filter: brightness(0) invert(1)).

Aufruf:  python3 scripts/scribbles.py          (braucht numpy, Pillow, opencv-python)
"""
import json
import re
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src" / "scribbles"
OUT = ROOT / "public" / "scribbles"
MANIFEST = ROOT / "src" / "content" / "scribbles.json"

TOKENS = ROOT / "src" / "content" / "tokens.mjs"
MAX_SIDE = 640  # reicht für ~320 px Breite auf Retina

# Reihenfolge je Bogen: Zeile für Zeile, links nach rechts.
# kind: "object" (Zeichnung) oder "claim" (Spruch). langs: nur auf diesen Sprachseiten (None = überall).
SHEETS = {
    "sheet-a.jpg": [
        ("anker", "object", None), ("herz", "object", None), ("austernmesser", "object", None), ("auster", "object", None),
        ("handschuh", "object", None), ("flasche", "object", None), ("korken", "object", None), ("coupes", "object", None),
        ("fischerboot", "object", None), ("segelboot", "object", None), ("fischgraete", "object", None), ("makrele", "object", None),
    ],
    "sheet-b.jpg": [
        ("hummer", "object", None), ("leuchtturm", "object", None), ("moewe", "object", None), ("gabel-messer", "object", None),
        ("jakobsmuschel", "object", None), ("austernplatte", "object", None), ("sardinen", "object", None), ("knoten", "object", None),
        ("krake", "object", None), ("rettungsring", "object", None), ("perle", "object", None), ("krabbe", "object", None),
    ],
    "sheet-c.jpg": [
        ("meer-geht-immer", "claim", ["de"]), ("sante", "claim", None), ("encore-une", "claim", None), ("shuck-it", "claim", ["en"]),
        ("bulles-first", "claim", ["de", "en"]), ("monate-mit-r", "claim", ["de"]), ("life-is-short", "claim", ["en"]), ("aw-shucks", "claim", ["en"]),
        ("huitres-bulles", "claim", None), ("a-la-votre", "claim", None), ("ein-dutzend", "claim", ["de"]), ("schluerfen", "claim", ["de"]),
    ],
    "sheet-d.jpg": [
        ("les-mois-en-r", "claim", None), ("pop", "object", None), ("glueck-salzig", "claim", ["de"]), ("shell-yeah", "claim", ["en"]),
        ("mariniere", "object", None), ("ruderboot", "object", None), ("seestern", "object", None), ("kellnermesser", "object", None),
        ("salut-les-huitres", "claim", None), ("fischernetz", "object", None), ("seepferdchen", "object", None), ("bon-appetit", "claim", None),
    ],
}

COLS, ROWS = 4, 3
SCALE = 4  # Erkennung auf verkleinertem Bild


def find_cells(gray):
    """Bounding-Box (x0, y0, x1, y1) je Rasterzelle in voller Auflösung."""
    h, w = gray.shape
    small = cv2.resize(gray, (w // SCALE, h // SCALE), interpolation=cv2.INTER_AREA)
    ink = (small < 225).astype(np.uint8)
    # Striche einer Zeichnung zusammenwachsen lassen (≈ 60 px im Original)
    merged = cv2.dilate(ink, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)))
    n, labels, stats, _ = cv2.connectedComponentsWithStats(merged, connectivity=8)
    sh, sw = small.shape
    cells = {}
    for i in range(1, n):
        x, y, bw, bh, _area = stats[i]
        comp = labels[y : y + bh, x : x + bw] == i
        inkpx = int((ink[y : y + bh, x : x + bw] & comp).sum())
        if inkpx < 30:  # Staub
            continue
        cx, cy = x + bw / 2, y + bh / 2
        cell = min(int(cy / (sh / ROWS)), ROWS - 1) * COLS + min(int(cx / (sw / COLS)), COLS - 1)
        cells.setdefault(cell, []).append(i)
    boxes = {}
    for cell, ids in cells.items():
        mask = np.isin(labels, ids) & (ink > 0)
        ys, xs = np.nonzero(mask)
        pad = 6  # px im verkleinerten Bild
        boxes[cell] = (
            max(0, (xs.min() - pad) * SCALE),
            max(0, (ys.min() - pad) * SCALE),
            min(w, (xs.max() + pad + 1) * SCALE),
            min(h, (ys.max() + pad + 1) * SCALE),
        )
    return boxes


def to_alpha(crop):
    """Papier → transparent, Graphit → deckend (0–255)."""
    c = crop.astype(np.float32)
    paper = np.percentile(c, 70)
    dark = max(18.0, float(np.percentile(c, 0.4)))
    top = paper - 9.0
    a = np.clip((top - c) / max(1.0, top - dark), 0.0, 1.0) ** 0.85
    a = (a * 255).round().astype(np.uint8)
    a[a < 20] = 0  # Papierkorn weg (spart viel Dateigröße)
    return a


def embrun_rgb():
    m = re.search(r"token: 'embrun'.*?hex: '#([0-9A-Fa-f]{6})'", TOKENS.read_text())
    h = m.group(1)
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    ink = embrun_rgb()
    manifest = []
    for sheet, items in SHEETS.items():
        gray = np.array(Image.open(SRC / sheet).convert("L"))
        boxes = find_cells(gray)
        missing = [i for i in range(COLS * ROWS) if i not in boxes]
        if missing:
            raise SystemExit(f"{sheet}: keine Zeichnung in Zelle {missing}")
        for idx, (name, kind, langs) in enumerate(items):
            x0, y0, x1, y1 = boxes[idx]
            alpha = to_alpha(gray[y0:y1, x0:x1])
            # leere Ränder nach der Alpha-Berechnung noch einmal abschneiden
            ys, xs = np.nonzero(alpha > 12)
            alpha = alpha[max(0, ys.min() - 8) : ys.max() + 9, max(0, xs.min() - 8) : xs.max() + 9]
            img = Image.new("RGBA", (alpha.shape[1], alpha.shape[0]), (*ink, 0))
            img.putalpha(Image.fromarray(alpha, "L"))
            img.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
            img.save(OUT / f"{name}.webp", "WEBP", quality=80, alpha_quality=60, method=4)
            entry = {"name": name, "kind": kind, "w": img.width, "h": img.height}
            if langs:
                entry["langs"] = langs
            manifest.append(entry)
            print(f"{name:20s} {img.width:4d}×{img.height:<4d} {(OUT / f'{name}.webp').stat().st_size // 1024:3d} KB")
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(f"{len(manifest)} Scribbles → {OUT.relative_to(ROOT)}, Manifest → {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
