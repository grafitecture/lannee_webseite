"""Kontaktbogen zum Ansehen: python3 -m scripts.kritzel.probe out.png [name …]"""
import sys

import numpy as np
from PIL import Image

from .bogen import render, ITEMS


def main():
    out = sys.argv[1]
    names = sys.argv[2:] or [it["name"] for it in ITEMS]
    tiles = []
    for name in names:
        a = render(name)
        tiles.append(a)
    cell = 520
    cols = 4
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * cell), (255, 255, 255))
    ink = np.array([0x16, 0x7A, 0xA2], np.float32)
    for i, a in enumerate(tiles):
        h, w = a.shape
        s = min(1.0, (cell - 20) / max(w, h))
        img = Image.fromarray((a * 255).astype(np.uint8), "L").resize((int(w * s), int(h * s)), Image.LANCZOS)
        al = np.asarray(img, np.float32)[..., None] / 255.0
        rgb = (255 * (1 - al) + ink * al).astype(np.uint8)
        x = (i % cols) * cell + (cell - img.width) // 2
        y = (i // cols) * cell + (cell - img.height) // 2
        sheet.paste(Image.fromarray(rgb, "RGB"), (x, y))
    sheet.save(out)
    print(out, sheet.size)


if __name__ == "__main__":
    main()
