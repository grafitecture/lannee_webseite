"""
4B-Bleistift auf Papier – kleine Zeichenmaschine für die Kinder-Scribbles.

Eine Zeichnung wird in einem eigenen Koordinatensystem (Box, y nach unten)
beschrieben und mit „Hand“ gezeichnet: die Linien zittern und schlingern etwas,
schießen an Ecken über, Kreise schließen nicht ganz, der Druck schwankt. Der
Graphit setzt sich zuerst auf die Spitzen des Papierkorns, mit mehr Druck auch
in die Täler – so entsteht der körnige, weiche 4B-Strich. Übereinander
gezeichnete Striche werden dunkler.

Ergebnis: Alpha-Kanal (0–1), 1 = voller Graphit.
"""
import math

import cv2
import numpy as np

SS = 2  # intern doppelt so groß zeichnen, am Ende verkleinern


def _value_noise_1d(rng, n, wavelength):
    """Glattes 1D-Rauschen (–1 … 1) für n Samples mit grober Wellenlänge in Samples."""
    knots = max(2, int(n / max(1.0, wavelength)) + 3)
    vals = rng.uniform(-1, 1, knots)
    x = np.arange(n) / max(1.0, wavelength)
    i = np.floor(x).astype(int)
    f = x - i
    f = f * f * (3 - 2 * f)
    return vals[i] * (1 - f) + vals[i + 1] * f


def catmull(points, per=10):
    """Glatte Kurve durch die Punkte (Catmull-Rom)."""
    p = np.asarray(points, float)
    if len(p) < 3:
        return p
    p = np.vstack([p[0], p, p[-1]])
    out = []
    for k in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[k - 1], p[k], p[k + 1], p[k + 2]
        for t in np.linspace(0, 1, per, endpoint=False):
            t2, t3 = t * t, t * t * t
            out.append(
                0.5
                * (
                    2 * p1
                    + (-p0 + p2) * t
                    + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
                    + (-p0 + 3 * p1 - 3 * p2 + p3) * t3
                )
            )
    out.append(p[-2])
    return np.array(out)


def arc(cx, cy, rx, ry, a0, a1, n=None):
    """Punkte auf einer Ellipse, Winkel in Grad (0 = rechts, 90 = unten)."""
    n = n or max(8, int(abs(a1 - a0) / 6))
    a = np.radians(np.linspace(a0, a1, n))
    return [(cx + rx * math.cos(t), cy + ry * math.sin(t)) for t in a]


def resample(pts, step):
    pts = np.asarray(pts, float)
    if len(pts) < 2:
        return pts
    seg = np.linalg.norm(np.diff(pts, axis=0), axis=1)
    s = np.concatenate([[0], np.cumsum(seg)])
    if s[-1] < 1e-6:
        return pts[:1]
    n = max(2, int(s[-1] / step) + 1)
    t = np.linspace(0, s[-1], n)
    return np.stack([np.interp(t, s, pts[:, 0]), np.interp(t, s, pts[:, 1])], axis=1)


class Paper:
    """Ein Blatt für eine Zeichnung. box = (Breite, Höhe) in Zeichnungseinheiten."""

    def __init__(self, box, seed, area=480, line=9.0, margin=0.07):
        self.rng = np.random.default_rng(seed)
        bw, bh = box
        # Fläche je Zeichnung gleich (√(B·H) = area px), damit alle gleich „schwer“ wirken
        k = area / math.sqrt(bw * bh)
        pad = margin * area
        self.k = k * SS
        self.pad = pad * SS
        self.W = int(round((bw * k + 2 * pad) * SS))
        self.H = int(round((bh * k + 2 * pad) * SS))
        self.lw = line * SS  # Strichbreite in px (intern)
        self.trans = np.ones((self.H, self.W), np.float32)  # Licht, das noch durchkommt
        self.tooth = self._tooth()
        self.hand = 1.0  # Krakel-Faktor (größer = zittriger)

    # ---------- Papier ----------
    def _tooth(self):
        r = self.rng
        h, w = self.H, self.W
        fine = cv2.GaussianBlur(r.standard_normal((h, w)).astype(np.float32), (0, 0), 1.3 * SS)
        mid = cv2.GaussianBlur(r.standard_normal((h, w)).astype(np.float32), (0, 0), 3.2 * SS)
        # leichte Faser in einer Richtung
        fib = cv2.GaussianBlur(r.standard_normal((h, w)).astype(np.float32), (0, 0), sigmaX=6 * SS, sigmaY=1.0 * SS)
        t = fine / (fine.std() + 1e-6) + 0.45 * mid / (mid.std() + 1e-6) + 0.35 * fib / (fib.std() + 1e-6)
        t = (t - t.min()) / (t.max() - t.min())
        # auf 0…1 gleichverteilen (Rang), dann ist die Schwelle = Flächenanteil
        flat = t.ravel()
        order = flat.argsort()
        ranks = np.empty_like(order)
        ranks[order] = np.arange(flat.size)
        return (ranks / flat.size).reshape(h, w).astype(np.float32)

    # ---------- Koordinaten ----------
    def px(self, pts):
        p = np.asarray(pts, float)
        return p * self.k + self.pad

    # ---------- Strich ----------
    def stroke(self, pts, *, smooth=False, press=1.0, width=1.0, wobble=1.0, overshoot=0.0, taper=True, tremor=1.0):
        """Ein Bleistiftstrich durch pts (Zeichnungseinheiten)."""
        r = self.rng
        P = catmull(pts, per=14) if smooth and len(pts) > 2 else np.asarray(pts, float)
        P = self.px(P)
        if len(P) < 2:
            P = np.vstack([P, P + 0.6])
        # über das Ende hinaus weiterziehen (Kinderhand bremst spät)
        if overshoot:
            for end in (0, -1):
                a, b = (P[1], P[0]) if end == 0 else (P[-2], P[-1])
                d = b - a
                L = np.linalg.norm(d)
                if L > 1e-6:
                    ext = b + d / L * overshoot * self.lw * r.uniform(0.4, 1.4)
                    P = np.vstack([ext, P]) if end == 0 else np.vstack([P, ext])
        step = 0.9 * SS
        Q = resample(P, step)
        n = len(Q)
        # Normale
        d = np.gradient(Q, axis=0)
        L = np.linalg.norm(d, axis=1, keepdims=True) + 1e-9
        nrm = np.stack([-d[:, 1], d[:, 0]], axis=1) / L
        # Schlingern (langsam) + Zittern (schnell)
        hw = self.hand * wobble
        off = (
            _value_noise_1d(r, n, 70 * SS / step) * self.lw * 0.55 * hw
            + _value_noise_1d(r, n, 16 * SS / step) * self.lw * 0.16 * hw * tremor
            + _value_noise_1d(r, n, 5 * SS / step) * self.lw * 0.05 * tremor
        )
        Q = Q + nrm * off[:, None]
        # Druck
        p = press * (0.82 + 0.18 * _value_noise_1d(r, n, 90 * SS / step))
        if taper and n > 6:
            ramp = int(min(n / 3, 2.2 * self.lw / step))
            if ramp > 1:
                p[:ramp] *= np.linspace(0.45, 1, ramp)
                p[-ramp:] *= np.linspace(1, 0.55, ramp)
        rad = self.lw * width * 0.5 * (0.78 + 0.28 * p)
        # Strich in eine eigene Ebene stempeln (Wert = Druck)
        x0 = int(max(0, Q[:, 0].min() - self.lw * 2))
        y0 = int(max(0, Q[:, 1].min() - self.lw * 2))
        x1 = int(min(self.W, Q[:, 0].max() + self.lw * 2 + 1))
        y1 = int(min(self.H, Q[:, 1].max() + self.lw * 2 + 1))
        if x1 <= x0 or y1 <= y0:
            return
        layer = np.zeros((y1 - y0, x1 - x0), np.float32)
        for (x, y), rr, pp in zip(Q, rad, p):
            cv2.circle(layer, (int(round((x - x0) * 4)), int(round((y - y0) * 4))), max(1, int(round(rr * 4))), float(pp), -1, cv2.LINE_8, shift=2)
        layer = cv2.GaussianBlur(layer, (0, 0), self.lw * 0.16)
        self._deposit(layer, x0, y0)

    def _deposit(self, layer, x0, y0):
        h, w = layer.shape
        tooth = self.tooth[y0 : y0 + h, x0 : x0 + w]
        # 4B: weich und dunkel. Druck p → Graphit füllt den Anteil p*0.92 des Korns.
        thr = 1.0 - np.clip(layer, 0, 1.2) * 1.08
        dep = np.clip((tooth - thr) / 0.3 + 0.32, 0, 1)
        dep *= np.clip(layer * 2.0, 0, 1)  # außen weich auslaufen
        dep = dep ** 0.85 * 0.8
        self.trans[y0 : y0 + h, x0 : x0 + w] *= 1.0 - dep

    # ---------- Bausteine ----------
    def line(self, pts, **kw):
        kw.setdefault("overshoot", 0.6)
        self.stroke(pts, **kw)

    def curve(self, pts, **kw):
        kw.setdefault("overshoot", 0.4)
        self.stroke(pts, smooth=True, **kw)

    def ellipse(self, cx, cy, rx, ry, rot=0.0, start=None, extra=None, **kw):
        """Ellipse in einem Zug, schließt nicht ganz, sondern läuft ein Stück drüber."""
        r = self.rng
        start = r.uniform(-140, -60) if start is None else start
        extra = r.uniform(12, 34) if extra is None else extra
        a = np.radians(np.linspace(start, start + 360 + extra, max(24, int((rx + ry) * 1.2) + 24)))
        # Kinder-Kreise sind etwas eiförmig
        egg = r.uniform(-0.06, 0.06)
        pts = np.stack([rx * np.cos(a) * (1 + egg * np.sin(a)), ry * np.sin(a)], axis=1)
        c, s = math.cos(math.radians(rot)), math.sin(math.radians(rot))
        pts = pts @ np.array([[c, s], [-s, c]]) + (cx, cy)
        kw.setdefault("overshoot", 0)
        self.stroke(pts, **kw)

    def dot(self, x, y, size=1.0, **kw):
        r = self.rng
        a = r.uniform(0, 360)
        rr = size * 0.35
        pts = arc(x, y, rr, rr, a, a + 400, n=16)
        kw.setdefault("press", 1.1)
        kw.setdefault("taper", False)
        self.stroke(pts, wobble=0.2, tremor=0.3, **kw)

    def hatch(self, poly, angle=35, gap=None, press=0.55, sloppy=1.0, width=0.85, smooth=True):
        """Ausmalen wie ein Kind: Zickzack hin und her, über den Rand hinaus."""
        r = self.rng
        P = self.px(catmull(poly, per=8) if smooth else poly).astype(np.float32)
        mask = np.zeros((self.H, self.W), np.uint8)
        cv2.fillPoly(mask, [np.round(P * 4).astype(np.int32)], 255, cv2.LINE_8, shift=2)
        gap = (gap or 1.15) * self.lw
        th = math.radians(angle)
        u = np.array([math.cos(th), math.sin(th)])  # Strichrichtung
        v = np.array([-u[1], u[0]])  # Fortschritt
        cxy = P.mean(axis=0)
        rel = P - cxy
        vs = rel @ v
        us = rel @ u
        path = []
        flip = False
        for off in np.arange(vs.min() + gap * 0.5, vs.max(), gap * r.uniform(0.85, 1.15)):
            ts = np.arange(us.min() - 4, us.max() + 4, 2.0)
            pts = cxy + np.outer(ts, u) + off * v
            xi = np.clip(pts[:, 0].astype(int), 0, self.W - 1)
            yi = np.clip(pts[:, 1].astype(int), 0, self.H - 1)
            inside = mask[yi, xi] > 0
            if not inside.any():
                continue
            idx = np.nonzero(inside)[0]
            a, b = ts[idx[0]], ts[idx[-1]]
            over = self.lw * 0.9 * sloppy
            a -= r.uniform(-0.3, 1.0) * over
            b += r.uniform(-0.3, 1.0) * over
            seg = [cxy + a * u + off * v, cxy + b * u + off * v]
            if flip:
                seg = seg[::-1]
            path.extend(seg)
            flip = not flip
        if len(path) >= 2:
            pts = (np.array(path) - self.pad) / self.k
            self.stroke(pts, press=press, width=width, wobble=0.5, overshoot=0, taper=True)

    # ---------- Ergebnis ----------
    def alpha(self):
        a = 1.0 - self.trans
        a = cv2.resize(a, (self.W // SS, self.H // SS), interpolation=cv2.INTER_AREA)
        return np.clip(a, 0, 1)
