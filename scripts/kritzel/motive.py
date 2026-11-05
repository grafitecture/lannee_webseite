"""
Die Motive – so, wie ein Kind sie malt: einfach, krakelig, manches ausgemalt.

Jedes Motiv: Box (Breite, Höhe in Einheiten, y nach unten) und eine Funktion,
die auf ein Paper zeichnet. Wellen, Blasen und Strahlen sind erlaubt, Gesichter
nicht (bleibt erwachsen genug für ein Restaurant).
"""
import math

import numpy as np

from .pencil import arc

MOTIVE = {}


def motiv(name, box):
    def deco(fn):
        MOTIVE[name] = (box, fn)
        return fn

    return deco


def waves(d, x0, x1, y, amp=3.0, n=4, **kw):
    pts = []
    for i in range(n * 8 + 1):
        t = i / (n * 8)
        pts.append((x0 + (x1 - x0) * t, y + amp * math.sin(t * n * 2 * math.pi + 0.6)))
    d.curve(pts, **kw)


def fish_body(d, cx, cy, L, H, tail=True, eye=True, flip=False, press=1.0):
    s = -1 if flip else 1
    top = [(cx - s * L / 2, cy), (cx - s * L / 4, cy - H / 2), (cx + s * L / 6, cy - H / 2.2), (cx + s * L / 2, cy)]
    bot = [(cx + s * L / 2, cy), (cx + s * L / 6, cy + H / 2.3), (cx - s * L / 4, cy + H / 2), (cx - s * L / 2, cy)]
    d.curve(top + bot[1:], press=press)
    if tail:
        tx = cx + s * L / 2
        d.line([(tx - s * 1, cy), (tx + s * L / 4, cy - H / 2.2), (tx + s * L / 4.6, cy + H / 2.2), (tx - s * 1, cy)], press=press)
    if eye:
        d.dot(cx - s * L / 3.1, cy - H / 9, size=2.2)


# ------------------------------------------------------------------ Anker
@motiv("anker", (70, 100))
def _(d):
    d.ellipse(35, 12, 8, 8)
    d.line([(35, 20), (35.5, 90)])
    d.line([(18, 32), (52, 31)])
    d.curve([(7, 62), (12, 80), (25, 91), (35.5, 93), (47, 90), (59, 79), (63, 61)])
    d.line([(1, 70), (7, 60), (15, 67)])
    d.line([(55, 67), (63, 59), (69, 69)])


# ------------------------------------------------------------------ Herz mit Pfeil
@motiv("herz", (100, 92))
def _(d):
    heart = [(50, 84), (30, 66), (14, 46), (13, 28), (24, 16), (38, 17), (50, 31), (62, 16), (77, 15), (88, 27), (87, 46), (70, 66), (50, 84)]
    d.hatch(heart, angle=30, press=0.5)
    d.curve(heart, press=1.0)
    d.line([(4, 78), (96, 14)])
    d.line([(84, 15), (97, 13), (92, 26)])
    for t in (0.0, 0.06):
        x, y = 4 + 92 * t, 78 - 64 * t
        d.line([(x + 2, y + 1), (x - 3, y - 7)], press=0.9)
        d.line([(x + 2, y + 1), (x + 8, y + 5)], press=0.9)


# ------------------------------------------------------------------ Fischgräte
@motiv("fischgraete", (100, 50))
def _(d):
    d.line([(4, 25), (17, 13), (24, 25), (17, 37), (4, 25)])
    d.dot(13, 23, size=2.2)
    d.line([(24, 25), (80, 25)])
    for i, x in enumerate(np.linspace(32, 72, 6)):
        h = 14 - abs(i - 2.2) * 2.2
        d.line([(x - 4, 25 - h), (x + 2, 25)], press=0.95)
        d.line([(x - 4, 25 + h), (x + 2, 25)], press=0.95)
    d.line([(80, 25), (96, 10), (94, 40), (80, 25)])


# ------------------------------------------------------------------ Segelboot
@motiv("segelboot", (100, 92))
def _(d):
    d.line([(12, 64), (88, 64), (76, 79), (24, 79), (12, 64)])
    d.line([(50, 64), (50, 6)])
    sail = [(53, 10), (53, 58), (86, 58), (53, 10)]
    d.hatch(sail, angle=60, press=0.45, smooth=False)
    d.line(sail)
    d.line([(47, 18), (47, 58), (22, 58), (47, 18)])
    d.line([(50, 6), (60, 9), (50, 12)])
    waves(d, 2, 98, 86, amp=2.6, n=5, press=0.9)


# ------------------------------------------------------------------ Flasche
@motiv("flasche", (44, 100))
def _(d):
    body = [(20, 2), (20, 26), (8, 42), (8, 94), (36, 94), (36, 42), (24, 26), (24, 2)]
    d.line(body)
    d.hatch([(19, 2), (25, 2), (25, 22), (19, 22)], angle=80, press=0.7, smooth=False, gap=0.9)
    d.line([(10, 56), (34, 56), (34, 74), (10, 74), (10, 56)], press=0.9)
    d.line([(14, 65), (30, 65)], press=0.8)
    for x, y, r in ((16, 86, 1.8), (27, 82, 1.5), (21, 47, 1.3)):
        d.ellipse(x, y, r, r, press=0.8, width=0.8)


def _rot(cx, cy, deg):
    r = math.radians(deg)
    c, s = math.cos(r), math.sin(r)

    def T(p):
        x, y = p[0] - cx, p[1] - cy
        return (cx + x * c - y * s, cy + x * s + y * c)

    return T


def pacman(d, cx, cy, r, mouth, width=70, **kw):
    """Schere/Zange als Kreis mit offenem Maul (mouth = Richtung in Grad)."""
    a0, a1 = mouth + width / 2, mouth + 360 - width / 2
    pts = arc(cx, cy, r, r, a0, a1)
    tip = (cx + r * 0.15 * math.cos(math.radians(mouth)), cy + r * 0.15 * math.sin(math.radians(mouth)))
    d.curve(pts, **kw)
    d.line([pts[-1], tip, pts[0]], **kw)


# ------------------------------------------------------------------ Coupes
@motiv("coupes", (100, 80))
def _(d):
    for cx, rot in ((27, 11), (73, -11)):
        T = _rot(cx, 76, rot)
        rim = 38
        bowl = arc(cx, 76 - rim, 14, 12, 180, 0, 11)
        d.hatch([T(p) for p in bowl] + [T(bowl[0])], angle=-8 if rot > 0 else 8, press=0.42)
        d.curve([T(p) for p in bowl])
        d.line([T((cx - 14.5, 76 - rim)), T((cx + 14.5, 76 - rim))])
        d.line([T((cx, 76 - rim + 12)), T((cx, 75))])
        d.curve([T((cx - 10, 77)), T((cx, 74.5)), T((cx + 10, 77))])
        for bx, by in ((-6, -50), (3, -55), (-2, -62)):
            d.ellipse(*T((cx + bx, 76 + by)), 1.5, 1.5, press=0.75, width=0.75)
    for a in (-55, -90, -125):
        r = math.radians(a)
        d.line([(50 + 5 * math.cos(r), 36 + 5 * math.sin(r)), (50 + 13 * math.cos(r), 36 + 13 * math.sin(r))], press=0.9)


# ------------------------------------------------------------------ Austernmesser
@motiv("austernmesser", (100, 40))
def _(d):
    d.curve([(9, 10), (48, 10.5), (52, 20), (48, 30), (9, 30), (4, 20), (9, 10)])
    for x in (17, 27, 37):
        d.line([(x, 13), (x + 1, 27)], press=0.75, width=0.8)
    d.ellipse(56, 20, 3, 13)
    d.line([(60, 15), (84, 16), (97, 20), (84, 24), (60, 25)])


# ------------------------------------------------------------------ Auster
@motiv("auster", (100, 66))
def _(d):
    r = d.rng

    def shell(k, jit):
        pts = []
        for t in np.linspace(0, 2 * math.pi, 30):
            # Tropfen: links spitz (Schloss), rechts breit
            rx = 47 * k
            ry = 30 * k * (0.55 + 0.45 * (1 + math.cos(t)) / 2)
            wav = 1 + 0.06 * math.sin(9 * t) * k + r.uniform(-jit, jit)
            pts.append((50 + 6 * (1 - k) + rx * math.cos(t) * wav, 34 + ry * math.sin(t) * wav))
        pts[-1] = pts[0]
        return pts + [pts[1]]

    d.curve(shell(1.0, 0.03))
    d.curve(shell(0.72, 0.03), press=0.85, width=0.9)
    d.curve(shell(0.44, 0.02), press=0.7, width=0.85)
    d.dot(8, 34, 2.2)


# ------------------------------------------------------------------ Handschuh (Kettenhandschuh)
@motiv("handschuh", (80, 100))
def _(d):
    hand = [(24, 98), (23, 72), (12, 62), (5, 52), (6, 45), (13, 44), (22, 53), (22, 27), (25, 20), (30, 19), (34, 25), (35, 44),
            (36, 18), (39, 12), (45, 12), (48, 18), (49, 44), (50, 22), (53, 17), (59, 18), (61, 25), (62, 46),
            (64, 37), (67, 32), (72, 33), (74, 39), (73, 64), (70, 76), (64, 86), (62, 98)]
    d.line(hand, overshoot=0.3)
    palm = [(25, 86), (24, 56), (70, 58), (68, 74), (62, 86)]
    d.hatch(palm, angle=45, gap=1.6, press=0.55, smooth=False)
    d.hatch(palm, angle=-45, gap=1.6, press=0.55, smooth=False)
    d.line([(23, 88), (63, 88)])
    for x in (28, 41, 55, 68):
        d.line([(x - 1, 30 + (x == 41) * -6 + (x == 68) * 10), (x - 0.5, 44 + (x == 68) * 8)], press=0.6, width=0.8)


# ------------------------------------------------------------------ Korken
@motiv("korken", (70, 74))
def _(d):
    d.curve(arc(35, 38, 25, 24, 182, 358, 12))
    d.line([(10, 38), (60, 38)])
    stem = [(24, 38), (25, 70), (45, 70), (46, 38)]
    d.hatch(stem, angle=80, press=0.5, smooth=False)
    d.line(stem)
    d.ellipse(35, 15, 6, 2.4, press=0.9)
    d.line([(13, 31), (57, 31)], press=0.8, width=0.85)
    d.curve([(30, 16), (22, 21), (18, 30)], press=0.75, width=0.8)
    d.curve([(40, 16), (48, 21), (52, 30)], press=0.75, width=0.8)


# ------------------------------------------------------------------ Fischerboot
@motiv("fischerboot", (100, 84))
def _(d):
    hull = [(5, 50), (95, 50), (82, 70), (16, 70), (5, 50)]
    d.hatch(hull, angle=10, press=0.45, smooth=False)
    d.line(hull)
    d.line([(52, 50), (52, 28), (77, 28), (77, 50)])
    d.line([(48, 28.5), (81, 27.5)])
    d.line([(58, 33), (69, 33), (69, 42), (58, 42), (58, 33)], press=0.9)
    d.line([(30, 50), (30, 8)])
    d.line([(30, 10), (6, 48)], press=0.7, width=0.8)
    d.line([(30, 10), (50, 28)], press=0.7, width=0.8)
    d.line([(30, 8), (41, 11), (30, 15)])
    waves(d, 2, 98, 78, amp=2.6, n=5, press=0.9)


# ------------------------------------------------------------------ Makrele
@motiv("makrele", (100, 40))
def _(d):
    fish_body(d, 44, 20, 76, 26)
    for i, x in enumerate((24, 34, 44, 54)):
        d.curve([(x, 10 + (i in (0, 3)) * 1.5), (x + 3, 13), (x + 1, 16), (x + 4, 19)], press=0.75, width=0.85)
    d.line([(40, 8), (48, 2), (52, 8)], press=0.9)
    d.line([(42, 32), (48, 38), (52, 32)], press=0.9)


# ------------------------------------------------------------------ Hummer
@motiv("hummer", (100, 100))
def _(d):
    d.ellipse(50, 40, 12, 16)
    d.hatch(arc(50, 40, 11, 15, 0, 360, 24), angle=60, press=0.4)
    tail = [(41, 55), (42, 82), (50, 86), (58, 82), (59, 55)]
    d.curve(tail)
    for y in (62, 69, 76):
        d.line([(42, y), (58, y + 0.5)], press=0.85)
    d.line([(44, 84), (35, 96), (50, 99), (65, 96), (56, 84)])
    d.line([(40, 32), (29, 26), (23, 22)])
    d.line([(60, 32), (71, 26), (77, 22)])
    pacman(d, 16, 14, 9.5, -150, width=55)
    pacman(d, 84, 14, 9.5, -30, width=55)
    d.curve([(46, 25), (40, 12), (31, 1)], press=0.8, width=0.8)
    d.curve([(54, 25), (60, 12), (69, 1)], press=0.8, width=0.8)
    for y, dx in ((38, 0), (45, 1), (52, 2)):
        d.line([(38.5, y), (28 + dx, y + 7)], press=0.9)
        d.line([(61.5, y), (72 - dx, y + 7)], press=0.9)
    d.dot(45, 29, 2.0)
    d.dot(55, 29, 2.0)


# ------------------------------------------------------------------ Leuchtturm
@motiv("leuchtturm", (64, 100))
def _(d):
    def x_at(y, side):
        t = (y - 30) / 62
        return (20 - 6 * t) if side < 0 else (44 + 6 * t)

    d.line([(20, 30), (14, 92)])
    d.line([(44, 30), (50, 92)])
    for y0, y1 in ((42, 54), (66, 78)):
        band = [(x_at(y0, -1), y0), (x_at(y0, 1), y0), (x_at(y1, 1), y1), (x_at(y1, -1), y1)]
        d.hatch(band, angle=70, press=0.7, smooth=False, gap=0.9)
    d.line([(22, 30), (22, 18), (42, 18), (42, 30), (18, 30)])
    d.line([(17, 18), (32, 5), (47, 18), (17, 18)])
    d.line([(27, 22), (37, 22), (37, 27), (27, 27)], press=0.8, width=0.8)
    for side in (-1, 1):
        x = 32 + side * 12
        d.line([(x, 23), (32 + side * 30, 14)], press=0.85)
        d.line([(x, 25), (32 + side * 30, 33)], press=0.85)
    d.curve([(28, 92), (28, 84), (32, 81), (36, 84), (36, 92)], press=0.9)
    waves(d, 2, 62, 95, amp=2.2, n=3, press=0.9)


# ------------------------------------------------------------------ Möwe
@motiv("moewe", (100, 50))
def _(d):
    for x, y, w in ((36, 30, 30), (78, 14, 15), (70, 40, 10)):
        h = w * 0.34
        d.curve([(x - w, y - h * 0.15), (x - w * 0.82, y - h * 0.8), (x - w * 0.5, y - h), (x - w * 0.18, y - h * 0.65), (x, y)], overshoot=0.05)
        d.curve([(x, y), (x + w * 0.18, y - h * 0.65), (x + w * 0.5, y - h), (x + w * 0.82, y - h * 0.8), (x + w, y - h * 0.15)], overshoot=0.05)


# ------------------------------------------------------------------ Gabel und Messer
@motiv("gabel-messer", (70, 100))
def _(d):
    for x in (9, 15, 21, 27):
        d.line([(x, 6), (x + 0.3, 28)], width=0.9)
    d.curve([(9, 28), (12, 36), (18, 40), (24, 36), (27, 28)])
    d.line([(16, 40), (16, 94)])
    d.line([(20, 40), (20, 94)])
    d.line([(15.5, 95), (20.5, 95)])
    d.curve([(45, 58), (45, 16), (49, 6), (55, 14), (56, 58)])
    d.line([(43, 58), (58, 58), (58, 95), (43, 95), (43, 58)])
    d.dot(50.5, 70, 2.0)
    d.dot(50.5, 84, 2.0)


# ------------------------------------------------------------------ Jakobsmuschel
@motiv("jakobsmuschel", (100, 92))
def _(d):
    rim = []
    for a in np.linspace(196, 344, 60):
        t = math.radians(a)
        k = 1 + 0.045 * abs(math.sin((a - 196) / 148 * math.pi * 8))
        rim.append((50 + 44 * k * math.cos(t), 54 + 44 * k * math.sin(t)))
    d.curve(rim[::2])
    d.line([rim[0], (38, 80)])
    d.line([rim[-1], (62, 80)])
    d.line([(38, 80), (33, 82), (35, 90), (65, 90), (67, 82), (62, 80)])
    for i in range(1, 8):
        p = rim[int(i * (len(rim) - 1) / 8)]
        d.line([(50 + (p[0] - 50) * 0.08, 82), (p[0] * 0.94 + 50 * 0.06, p[1] + 3)], press=0.75, width=0.85)


# ------------------------------------------------------------------ Austernplatte
@motiv("austernplatte", (100, 66))
def _(d):
    d.ellipse(50, 34, 47, 29)
    r = d.rng
    for x, y in ((27, 30), (46, 21), (65, 25), (36, 45), (57, 45)):
        rot = r.uniform(-30, 30)
        d.ellipse(x, y, 9.5, 6.2, rot=rot)
        d.ellipse(x + 0.5, y + 0.5, 4.8, 2.8, rot=rot, press=0.8, width=0.8)
    d.ellipse(79, 41, 7, 7)
    for a in (0, 60, 120):
        t = math.radians(a)
        d.line([(79 - 6 * math.cos(t), 41 - 6 * math.sin(t)), (79 + 6 * math.cos(t), 41 + 6 * math.sin(t))], press=0.7, width=0.8)


# ------------------------------------------------------------------ Sardinen
@motiv("sardinen", (100, 60))
def _(d):
    d.curve([(14, 10), (80, 10), (86, 14), (86, 52), (80, 56), (14, 56), (8, 52), (8, 14), (14, 10)], overshoot=0.2)
    for i, (y, flip) in enumerate(((21, False), (33, True), (45, False))):
        fish_body(d, 45, y, 54, 9.5, flip=flip, press=0.95)
    d.ellipse(93, 33, 4.5, 21)
    d.curve([(93, 22), (90, 30), (94, 38), (92, 44)], press=0.7, width=0.8)
    d.line([(93, 12), (93, 5)])
    d.ellipse(93, 3.5, 4, 2.5, press=0.9)


# ------------------------------------------------------------------ Knoten
@motiv("knoten", (100, 60))
def _(d):
    path = [(2, 44), (24, 45), (44, 36), (60, 20), (74, 12), (86, 20), (84, 36), (68, 40), (50, 30), (36, 16), (24, 14), (18, 24), (26, 36), (46, 44), (70, 47), (98, 44)]
    from .pencil import catmull

    c = catmull(path, per=12)
    dd = np.gradient(c, axis=0)
    n = np.stack([-dd[:, 1], dd[:, 0]], axis=1)
    n /= np.linalg.norm(n, axis=1, keepdims=True) + 1e-9
    for side in (-1, 1):
        d.line(c + side * 2.6 * n, overshoot=0.1)
    for i in range(6, len(c) - 3, 7):
        p, q = c[i] - 2.4 * n[i], c[i] + 2.4 * n[i]
        tng = dd[i] / (np.linalg.norm(dd[i]) + 1e-9) * 1.6
        d.line([p - tng, q + tng], press=0.6, width=0.75, overshoot=0)


# ------------------------------------------------------------------ Krake
@motiv("krake", (100, 100))
def _(d):
    head = [(25, 54), (23, 32), (32, 12), (50, 4), (68, 12), (77, 32), (75, 54)]
    d.curve(head)
    d.hatch(head + [(50, 56)], angle=30, press=0.38)
    d.dot(40, 34, 3.2)
    d.dot(60, 34, 3.2)
    r = d.rng
    for i, x0 in enumerate((27, 36, 45, 55, 64, 73)):
        side = (x0 - 50) / 25
        pts = []
        for t in np.linspace(0, 1, 9):
            pts.append((x0 + side * 22 * t + 4 * math.sin(t * 9 + i), 54 + 36 * t))
        ex, ey = pts[-1]
        cd = 1 if side >= 0 else -1
        pts += [(ex + cd * 4, ey + 2), (ex + cd * 5, ey - 2), (ex + cd * 2, ey - 3)]
        d.curve(pts, overshoot=0, width=1.05)


# ------------------------------------------------------------------ Rettungsring
@motiv("rettungsring", (100, 100))
def _(d):
    from . import schrift

    d.ellipse(50, 50, 45, 45)
    d.ellipse(50, 50, 21, 21)
    for a in (35, 145, 215, 325):
        band = arc(50, 50, 44, 44, a - 15, a + 15, 8) + arc(50, 50, 22, 22, a + 15, a - 15, 6)
        d.hatch(band, angle=a + 90, press=0.6, smooth=False, gap=0.95)
    w, h, strokes = schrift.layout(["1898"], d.rng, wobble=0.6)
    s = 1.05
    schrift.draw(d, strokes, dx=50 - w * s / 2, dy=12.5, scale=s, width=0.85)


# ------------------------------------------------------------------ Perle
@motiv("perle", (100, 84))
def _(d):
    # Schale unten
    d.curve([(8, 52), (18, 72), (48, 82), (78, 74), (93, 54)])
    d.curve([(8, 52), (30, 56), (52, 53), (74, 57), (93, 54)], press=0.9)
    # Deckel offen, Scharnier links
    lid = [(8, 50), (14, 26), (36, 9), (62, 4), (82, 9)]
    d.curve(lid)
    d.curve([(82, 9), (60, 22), (34, 37), (8, 50)], press=0.9)
    for t in (0.3, 0.52, 0.74):
        x, y = 8 + 66 * t, 50 - 44 * t - 2
        d.line([(10, 48), (x, y - 4)], press=0.55, width=0.8)
    d.ellipse(54, 45, 9, 9)
    d.hatch(arc(54, 45, 8, 8, 0, 360, 16), angle=40, press=0.3, gap=1.0)
    d.curve([(49, 41), (51, 38.5), (54, 38)], press=0.7, width=0.7, overshoot=0)
    for x, y, s in ((74, 36, 4), (36, 26, 3.2), (70, 64, 3)):
        d.line([(x - s, y), (x + s, y)], press=0.85, width=0.8)
        d.line([(x, y - s), (x, y + s)], press=0.85, width=0.8)


# ------------------------------------------------------------------ Krabbe
@motiv("krabbe", (100, 74))
def _(d):
    d.ellipse(50, 46, 24, 15)
    d.hatch(arc(50, 46, 23, 14, 0, 360, 24), angle=-20, press=0.4)
    d.line([(44, 32), (42, 22)])
    d.line([(56, 32), (58, 22)])
    d.dot(42, 20, 2.6)
    d.dot(58, 20, 2.6)
    d.line([(28, 40), (19, 27)])
    d.line([(72, 40), (81, 27)])
    pacman(d, 15, 17, 9, -100, width=60)
    pacman(d, 85, 17, 9, -80, width=60)
    for side in (-1, 1):
        for (ax, ay), (bx, by), (cx, cy) in (((27, 47), (14, 45), (7, 55)), ((29, 53), (17, 56), (12, 66)), ((33, 58), (24, 64), (21, 72))):
            d.line([(50 + side * (ax - 50), ay), (50 + side * (bx - 50), by), (50 + side * (cx - 50), cy)], press=0.95)


# ------------------------------------------------------------------ POP !
@motiv("pop", (100, 90))
def _(d):
    from . import schrift

    w, h, strokes = schrift.layout(["Pop !"], d.rng, wobble=1.2)
    s = 1.6
    schrift.draw(d, strokes, dx=4, dy=6, scale=s, width=1.0)
    d.line([(10, 90), (14, 76), (21, 70), (21, 60)])
    d.line([(35, 60), (35, 70), (42, 76), (46, 90)])
    d.line([(19, 60), (37, 60)], press=0.9)
    T = _rot(74, 40, 30)
    cork = [(62, 44), (63, 32), (74, 26), (85, 32), (86, 44), (62, 44)]
    d.curve([T(p) for p in cork[:5]])
    d.line([T((62, 44)), T((86, 44))])
    d.line([T((67, 44)), T((68, 58)), T((80, 58)), T((81, 44))])
    for (x0, y0), (x1, y1) in (((38, 54), (50, 44)), ((32, 50), (40, 36)), ((44, 60), (58, 54))):
        d.line([(x0, y0), (x1, y1)], press=0.8, width=0.85)
    for x, y in ((24, 52), (30, 46), (19, 48), (34, 40)):
        d.dot(x, y, 1.6)


# ------------------------------------------------------------------ Marinière
@motiv("mariniere", (100, 88))
def _(d):
    shirt = [(37, 8), (14, 15), (2, 33), (15, 42), (22, 35), (22, 85), (78, 85), (78, 35), (85, 42), (98, 33), (86, 15), (63, 8)]
    d.line(shirt)
    d.curve([(37, 8), (43, 15), (50, 17), (57, 15), (63, 8)])
    for y in (28, 37, 46, 55, 64, 73):
        d.line([(23, y), (77, y + 0.6)], press=1.0, width=1.25, overshoot=0.15)
    for side in (-1, 1):
        d.line([(50 + side * 29, 22), (50 + side * 40, 28)], width=1.2)
        d.line([(50 + side * 33, 29), (50 + side * 44, 35)], width=1.2)


# ------------------------------------------------------------------ Ruderboot
@motiv("ruderboot", (100, 58))
def _(d):
    d.curve([(4, 22), (50, 27), (96, 22)])
    hull = [(4, 22), (14, 40), (50, 44), (86, 40), (96, 22)]
    d.curve(hull)
    d.line([(12, 32), (88, 32.5)], press=0.75, width=0.85)
    d.line([(30, 16), (10, 50)])
    d.ellipse(8, 52, 3, 6, rot=30)
    d.line([(70, 16), (90, 50)])
    d.ellipse(92, 52, 3, 6, rot=-30)
    waves(d, 14, 86, 52, amp=2, n=4, press=0.8)


# ------------------------------------------------------------------ Seestern
@motiv("seestern", (100, 96))
def _(d):
    pts = []
    for i in range(11):
        a = math.radians(-90 + i * 36)
        r = 46 if i % 2 == 0 else 19
        pts.append((50 + r * math.cos(a) * d.rng.uniform(0.94, 1.04), 52 + r * math.sin(a) * d.rng.uniform(0.94, 1.04)))
    pts[-1] = pts[0]
    d.curve(pts + [pts[1]])
    for i in range(5):
        a = math.radians(-90 + i * 72)
        for rr in (12, 24):
            d.dot(50 + rr * math.cos(a), 52 + rr * math.sin(a), 2.2)
    d.dot(50, 52, 2.4)


# ------------------------------------------------------------------ Kellnermesser
@motiv("kellnermesser", (100, 66))
def _(d):
    handle = [(12, 16), (50, 13), (82, 16), (87, 21), (82, 26), (50, 24), (12, 27), (7, 21.5), (12, 16)]
    d.curve(handle)
    d.dot(20, 21.5, 2.0)
    d.dot(76, 21, 2.0)
    # Hebel rechts, abgeknickt
    d.line([(84, 16), (93, 9), (98, 14)])
    # kleines Messer links
    d.line([(9, 17), (2, 8), (16, 15)])
    # Spirale schräg nach unten, mit Spitze
    t = np.linspace(0, 4.5 * 2 * math.pi, 110)
    L = t / t[-1]
    x = 40 + 5 * np.sin(t) + 12 * L
    y = 28 + 30 * L + 2.2 * np.cos(t)
    coil = np.stack([x, y], axis=1)
    d.line(coil, overshoot=0, width=0.95)
    d.line([(coil[-1][0], coil[-1][1]), (coil[-1][0] + 3, coil[-1][1] + 6)], overshoot=0, width=0.9)


# ------------------------------------------------------------------ Fischernetz
@motiv("fischernetz", (100, 84))
def _(d):
    d.line([(2, 8), (98, 8)])
    for x in (14, 38, 62, 86):
        d.ellipse(x, 8, 4, 4)
    bag = [(8, 12), (18, 52), (36, 74), (50, 80), (64, 74), (82, 52), (92, 12)]
    d.curve(bag)
    d.hatch(bag, angle=55, gap=2.4, press=0.7, sloppy=0.2)
    d.hatch(bag, angle=-55, gap=2.4, press=0.7, sloppy=0.2)
    fish_body(d, 52, 52, 26, 11)


# ------------------------------------------------------------------ Seepferdchen
@motiv("seepferdchen", (60, 100))
def _(d):
    d.curve([(57, 22), (44, 20), (37, 10), (30, 6), (23, 13), (27, 26), (21, 38), (19, 54), (23, 68), (27, 80), (30, 91), (38, 96), (45, 91), (41, 84), (34, 87)])
    d.curve([(57, 27), (43, 28), (38, 34), (43, 46), (47, 58), (42, 70), (32, 78), (28, 82)])
    d.line([(57, 22), (58, 27)])
    d.line([(21, 44), (12, 47), (14, 51), (11, 55), (20, 59)], press=0.9)
    d.line([(28, 6), (29, 1), (32, 6)], press=0.9)
    for y, x0, x1 in ((40, 26, 40), (48, 24, 43), (56, 24, 44), (64, 26, 42)):
        d.line([(x0, y), (x1, y + 1)], press=0.55, width=0.75)
    d.dot(34, 15, 2.4)
