#!/usr/bin/env python3
"""
Bleistift-Scribbles für L'ANNÉE – wie von Kinderhand, 4B
--------------------------------------------------------------
Seit 05.11.2026 werden die Scribbles nicht mehr aus KI-Bögen geschnitten,
sondern hier gezeichnet: einfache, krakelige Kinderzeichnungen und Sprüche
in Kinderschrift (Großbuchstaben), dicker, körniger 4B-Strich.

  scripts/kritzel/pencil.py   Bleistift und Papierkorn (Strich zittert, Druck schwankt,
                              Graphit setzt sich ins Korn, Übermalen wird dunkler)
  scripts/kritzel/schrift.py  Kinderschrift (Versalien in einem Zug)
  scripts/kritzel/motive.py   die 31 Zeichnungen
  scripts/kritzel/bogen.py    Liste aller 48 Scribbles, Sprüche und Sprachen

Ergebnis:
  public/scribbles/<name>.webp      (Strich in Embrun, Papier transparent)
  src/content/scribbles.json        (Name, Art, Sprache, Maße)
Auf blauen Flächen macht CSS die Striche weiß (filter: brightness(0) invert(1)).
Jede Zeichnung hat einen festen Zufallswert (aus dem Namen) – gleiche Eingabe, gleiches Bild.

Aufruf:  npm run scribbles      (Python 3 mit numpy, Pillow, opencv-python)
Ansehen: python3 -m scripts.kritzel.probe /tmp/bogen.png [name …]
"""
import json
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from scripts.kritzel.bogen import ITEMS, render  # noqa: E402

OUT = ROOT / "public" / "scribbles"
MANIFEST = ROOT / "src" / "content" / "scribbles.json"
TOKENS = ROOT / "src" / "content" / "tokens.mjs"


def embrun_rgb():
    m = re.search(r"token: 'embrun'.*?hex: '#([0-9A-Fa-f]{6})'", TOKENS.read_text())
    h = m.group(1)
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    ink = embrun_rgb()
    wanted = {it["name"] for it in ITEMS}
    for old in OUT.glob("*.webp"):
        if old.stem not in wanted:
            old.unlink()
    manifest = []
    for it in ITEMS:
        name = it["name"]
        a = render(name)
        a8 = (a * 255).round().astype(np.uint8)
        a8[a8 < 10] = 0
        ys, xs = np.nonzero(a8 > 12)
        pad = 10
        a8 = a8[max(0, ys.min() - pad) : ys.max() + pad + 1, max(0, xs.min() - pad) : xs.max() + pad + 1]
        img = Image.new("RGBA", (a8.shape[1], a8.shape[0]), (*ink, 0))
        img.putalpha(Image.fromarray(a8, "L"))
        img.save(OUT / f"{name}.webp", "WEBP", quality=80, alpha_quality=70, method=6)
        entry = {"name": name, "kind": it["kind"], "w": img.width, "h": img.height}
        if it["langs"]:
            entry["langs"] = it["langs"]
        manifest.append(entry)
        print(f"{name:20s} {img.width:4d}×{img.height:<4d} {(OUT / f'{name}.webp').stat().st_size // 1024:3d} KB")
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(f"{len(manifest)} Scribbles → {OUT.relative_to(ROOT)}, Manifest → {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
