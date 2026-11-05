"""
Kinderschrift: Großbuchstaben in einem Zug, wackelig, ungleich groß.

Jeder Buchstabe ist eine Liste von Strichen in einer Box mit Versalhöhe 10
(y nach unten, 0 = oben). Gebogene Striche tragen das Kennzeichen "c" und
werden geglättet.
"""
import math

import numpy as np

from .pencil import arc


def _c(pts):
    return ("c", pts)


GLYPHS = {
    "A": (7, [[(0, 10), (3.5, 0), (7, 10)], [(1.6, 6), (5.6, 6)]]),
    "B": (6, [[(0, 10), (0, 0)], _c([(0, 0)] + arc(2.7, 2.4, 2.7, 2.4, -90, 90) + [(0, 4.8)]), _c([(0, 4.8)] + arc(3, 7.4, 3, 2.6, -90, 90) + [(0, 10)])]),
    "C": (7.5, [_c(arc(4, 5, 4, 5, -40, -320))]),
    "D": (6.5, [[(0, 10), (0, 0)], _c([(0, 0), (1.5, 0)] + arc(1.8, 5, 4.6, 5, -80, 80) + [(0, 10)])]),
    "E": (5.5, [[(5.5, 0), (0, 0), (0, 10), (5.5, 10)], [(0, 5), (4.2, 5)]]),
    "F": (5.5, [[(5.5, 0), (0, 0), (0, 10)], [(0, 5), (4.2, 5)]]),
    "G": (7.5, [_c(arc(4, 5, 4, 5, -40, -360) + [(4.5, 5.2)])]),
    "H": (6, [[(0, 0), (0, 10)], [(6, 0), (6, 10)], [(0, 5), (6, 5)]]),
    "I": (0.5, [[(0.25, 0), (0.25, 10)]]),
    "J": (5, [_c([(5, 0), (5, 6.8)] + arc(2.5, 7, 2.5, 3, 0, 170))]),
    "K": (6, [[(0, 0), (0, 10)], [(5.8, 0), (0, 5.8)], [(2, 4), (6, 10)]]),
    "L": (5, [[(0, 0), (0, 10), (5, 10)]]),
    "M": (8, [[(0, 10), (0, 0), (4, 6.5), (8, 0), (8, 10)]]),
    "N": (6.5, [[(0, 10), (0, 0), (6.5, 10), (6.5, 0)]]),
    "O": (8, [("o", (4, 5, 4, 5))]),
    "P": (5.8, [_c([(0, 10), (0, 0), (2.4, 0)] + arc(2.6, 2.7, 3.1, 2.7, -90, 90) + [(0, 5.4)])]),
    "R": (6, [_c([(0, 10), (0, 0), (2.4, 0)] + arc(2.6, 2.6, 3.1, 2.6, -90, 90) + [(0, 5.2)]), [(2.2, 5.2), (6, 10)]]),
    "S": (5.8, [_c([(5.6, 1.4), (4.2, 0.1), (1.6, 0.2), (0.3, 1.9), (1.0, 3.9), (3.0, 5.0), (5.0, 6.1), (5.8, 8.0), (4.6, 9.8), (1.9, 10), (0, 8.6)])]),
    "T": (7, [[(0, 0), (7, 0)], [(3.5, 0), (3.5, 10)]]),
    "U": (6, [_c([(0, 0), (0, 6.4)] + arc(3, 6.6, 3, 3.4, 180, 0) + [(6, 0)])]),
    "V": (7, [[(0, 0), (3.5, 10), (7, 0)]]),
    "W": (10, [[(0, 0), (2.4, 10), (5, 3.2), (7.6, 10), (10, 0)]]),
    "Y": (6.5, [[(0, 0), (3.25, 5)], [(6.5, 0), (3.25, 5), (3.25, 10)]]),
    "Z": (6, [[(0, 0), (6, 0), (0, 10), (6, 10)]]),
    "1": (2.6, [[(0, 2.6), (2.4, 0), (2.4, 10)]]),
    "8": (5.4, [("o", (2.7, 2.5, 2.2, 2.5)), ("o", (2.7, 7.4, 2.7, 2.6))]),
    "9": (5.2, [("o", (2.6, 3.0, 2.6, 3.0)), _c([(5.2, 3.0), (5.0, 7), (4.4, 10)])]),
    ".": (0.8, [("dot", (0.4, 9.6))]),
    ",": (0.8, [[(0.7, 9.0), (0.1, 11.2)]]),
    "!": (0.8, [[(0.4, 0), (0.4, 7.0)], ("dot", (0.4, 9.6))]),
    "&": (6.4, [_c([(6.4, 10), (3.6, 6.4), (1.4, 3.6), (1.3, 1.3), (2.8, 0), (4.4, 0.9), (4.2, 2.8), (0.8, 6.0), (0.5, 8.8), (2.4, 10), (4.6, 9.4), (6.4, 6.6)])]),
}

ACCENTS = {
    "É": ("E", [[(1.6, -1.4), (3.8, -3.4)]]),
    "À": ("A", [[(2.0, -3.4), (4.0, -1.4)]]),
    "Ô": ("O", [[(2.4, -1.3), (4.0, -3.2), (5.6, -1.3)]]),
    "Î": ("I", [[(-1.4, -1.3), (0.25, -3.2), (1.9, -1.3)]]),
    "Ü": ("U", [("dot", (1.8, -2.0)), ("dot", (4.2, -2.0))]),
}

SPACE = 5.6
GAP = 2.0


def glyph(ch):
    if ch in ACCENTS:
        base, extra = ACCENTS[ch]
        w, strokes = GLYPHS[base]
        return w, strokes + extra
    return GLYPHS[ch]


def layout(lines, rng, *, wobble=1.0, align="left"):
    """Setzt Zeilen in Kinderschrift. Gibt (Breite, Höhe, Striche) zurück.

    Striche: Liste von (Art, Punkte), Art = "l" (Linie), "c" (Kurve), "o" (Kreis), "dot".
    """
    out = []
    widths = []
    line_h = 15.5
    y = 0.0
    for li, text in enumerate(lines):
        x = rng.uniform(0, 3) if align == "left" else 0.0
        start = len(out)
        drift = rng.uniform(-0.05, 0.05)  # Zeile läuft etwas schief
        for ch in text.upper():
            if ch == " ":
                x += SPACE * rng.uniform(0.85, 1.25)
                continue
            w, strokes = glyph(ch)
            s = rng.uniform(0.88, 1.12)  # mal größer, mal kleiner
            rot = math.radians(rng.uniform(-6, 6) * wobble)
            by = y + x * drift + rng.uniform(-0.7, 0.7) * wobble + (1 - s) * 10
            cx, cy = w / 2, 5
            c, sn = math.cos(rot), math.sin(rot)

            def tf(p, cx=cx, cy=cy, c=c, sn=sn, s=s, x=x, by=by):
                px, py = (p[0] - cx) * s, (p[1] - cy) * s
                return (x + cx * s + px * c - py * sn, by + cy * s + px * sn + py * c)

            for st in strokes:
                if isinstance(st, tuple) and st[0] == "c":
                    out.append(("c", [tf(p) for p in st[1]]))
                elif isinstance(st, tuple) and st[0] == "o":
                    ox, oy, rx, ry = st[1]
                    X, Y = tf((ox, oy))
                    out.append(("o", (X, Y, rx * s, ry * s, math.degrees(rot))))
                elif isinstance(st, tuple) and st[0] == "dot":
                    out.append(("dot", tf(st[1])))
                else:
                    out.append(("l", [tf(p) for p in st]))
            x += w * s + GAP * rng.uniform(0.8, 1.3)
        widths.append((start, len(out), x))
        y += line_h
    total_w = max(w for _, _, w in widths)
    if align == "center":
        moved = []
        for start, end, w in widths:
            dx = (total_w - w) / 2 + rng.uniform(-2, 2)
            for i in range(start, end):
                moved.append(_shift(out[i], dx, 0))
        out = moved
    # an den tatsächlichen Strichen ausrichten (Akzente, schiefe Zeilen)
    xs, ys = [], []
    for kind, data in out:
        if kind in ("l", "c"):
            xs += [p[0] for p in data]
            ys += [p[1] for p in data]
        elif kind == "o":
            x, y0, rx, ry, _ = data
            xs += [x - rx, x + rx]
            ys += [y0 - ry, y0 + ry]
        else:
            xs.append(data[0])
            ys.append(data[1])
    mx, my = min(xs), min(ys)
    out = [_shift(st, -mx, -my) for st in out]
    return max(xs) - mx, max(ys) - my, out


def _shift(st, dx, dy):
    kind, data = st
    if kind in ("l", "c"):
        return kind, [(p[0] + dx, p[1] + dy) for p in data]
    if kind == "o":
        x, y, rx, ry, r = data
        return kind, (x + dx, y + dy, rx, ry, r)
    return kind, (data[0] + dx, data[1] + dy)


def draw(paper, strokes, dx=0.0, dy=0.0, scale=1.0, press=1.0, width=0.9):
    """Gesetzte Striche aufs Papier bringen (Einheiten der Zeichnung)."""
    for kind, data in strokes:
        if kind == "l":
            pts = [(dx + p[0] * scale, dy + p[1] * scale) for p in data]
            paper.line(pts, press=press, width=width, overshoot=0.35)
        elif kind == "c":
            pts = [(dx + p[0] * scale, dy + p[1] * scale) for p in data]
            paper.curve(pts, press=press, width=width, overshoot=0.2)
        elif kind == "o":
            x, y, rx, ry, r = data
            paper.ellipse(dx + x * scale, dy + y * scale, rx * scale, ry * scale, rot=r, press=press, width=width, extra=paper.rng.uniform(8, 22))
        else:
            paper.dot(dx + data[0] * scale, dy + data[1] * scale, size=1.5 * scale, press=press)
