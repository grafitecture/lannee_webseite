"""Liste aller Scribbles und das Zeichnen eines einzelnen."""
import zlib

import numpy as np

from . import schrift
from .motive import MOTIVE
from .pencil import Paper

# Sprüche: Zeilen in Kinderschrift. langs = nur auf diesen Sprachseiten (None = überall).
CLAIMS = {
    "meer-geht-immer": (["Meer geht", "immer."], ["de"]),
    "monate-mit-r": (["Monate", "mit R"], ["de"]),
    "ein-dutzend": (["Ein Dutzend,", "bitte."], ["de"]),
    "schluerfen": (["Schlürfen", "erlaubt."], ["de"]),
    "glueck-salzig": (["Glück ist", "salzig."], ["de"]),
    "shuck-it": (["Shuck it."], ["en"]),
    "life-is-short": (["Life is short.", "Eat oysters."], ["en"]),
    "aw-shucks": (["Aw, shucks!"], ["en"]),
    "shell-yeah": (["Oh, shell", "yeah!"], ["en"]),
    "bulles-first": (["Bulles", "first."], ["de", "en"]),
    "sante": (["Santé !"], None),
    "encore-une": (["Encore", "une !"], None),
    "huitres-bulles": (["Huîtres", "& Bulles"], None),
    "a-la-votre": (["À la", "vôtre !"], None),
    "les-mois-en-r": (["Les mois", "en R"], None),
    "salut-les-huitres": (["Salut les", "huîtres !"], None),
    "bon-appetit": (["Bon", "appétit !"], None),
}

# Reihenfolge = Reihenfolge im Manifest (und im Styleguide)
ORDER = [
    "anker", "herz", "austernmesser", "auster", "handschuh", "flasche", "korken", "coupes",
    "fischerboot", "segelboot", "fischgraete", "makrele", "hummer", "leuchtturm", "moewe", "gabel-messer",
    "jakobsmuschel", "austernplatte", "sardinen", "knoten", "krake", "rettungsring", "perle", "krabbe",
    "pop", "mariniere", "ruderboot", "seestern", "kellnermesser", "fischernetz", "seepferdchen",
    "meer-geht-immer", "monate-mit-r", "ein-dutzend", "schluerfen", "glueck-salzig",
    "shuck-it", "life-is-short", "aw-shucks", "shell-yeah", "bulles-first",
    "sante", "encore-une", "huitres-bulles", "a-la-votre", "les-mois-en-r", "salut-les-huitres", "bon-appetit",
]

ITEMS = []
for _name in ORDER:
    if _name in CLAIMS:
        ITEMS.append({"name": _name, "kind": "claim", "langs": CLAIMS[_name][1]})
    elif _name in MOTIVE:
        ITEMS.append({"name": _name, "kind": "object", "langs": None})


def seed(name):
    return zlib.crc32(name.encode()) & 0xFFFFFFFF


def render(name):
    s = seed(name)
    if name in CLAIMS:
        rng = np.random.default_rng(s)
        lines = CLAIMS[name][0]
        w, h, strokes = schrift.layout(lines, rng, align="left" if rng.random() < 0.6 else "center")
        d = Paper((w, h), s, area=400, line=8.6, margin=0.06)
        schrift.draw(d, strokes)
        return d.alpha()
    box, fn = MOTIVE[name]
    d = Paper(box, s)
    fn(d)
    return d.alpha()
