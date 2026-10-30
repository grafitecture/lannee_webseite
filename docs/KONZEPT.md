# L’ANNÉE – Konzept & Markensystem

Stand: Oktober 2026 · Grundlage: Briefing, PDF „LANNEE_Garage_Kiosque_Marche“, bestehende Seite 1898.ma, Fotos

## 1. Ausgangslage

- **Dachmarke:** L’ANNÉE (L’ANNÉE GbR, Andrea & Eric Schweppe, Mannheim), Web: 1898.ma
- **Gemeinsames Versprechen:** *Huîtres & Bulles*: Austern und Schaumwein, unkompliziert („Wir reservieren nicht – komm einfach vorbei, ein Plätzchen findet sich.“)
- **Drei Orte:**

| Ort | Wann | Wo | Ansprache |
| --- | --- | --- | --- |
| Garage | Fr & Sa ab 18 Uhr | Beilstraße 6, Jungbusch | bonsoir@garage.ma |
| Kiosque | So ab 10 Uhr | Lindenhofplatz 1, Lindenhof | bonjour@kiosque.ma |
| Marché | Sa 8–13 Uhr | Wochenmarkt Lindenhof, weitere Orte nach Ankündigung | bonjour@lannee.de |

## 2. Leitidee: Die Zeit

*L’ANNÉE* heißt „das Jahr“. Austern folgen dem Kalender (Monate mit R) und den Gezeiten, und die drei Orte teilen sich ein Wochenende. Deshalb ist **Zeit** das verbindende Motiv:

- Der **Akzent aus dem É** des Logos wird zum **Uhrzeiger**.
- Kreise stehen für Zyklen: Jahr (Jahresuhr), Zifferblatt (Signets). Die Woche zeigt ein klarer Wochenplan mit Zeitachse.
- Alle Farben sind **warme Grüntöne**; ihre Helligkeit folgt dem **Tageslicht**: Morgen (helles Grün), Sonntag (Moos), Abend (Oliv), Nacht (Encre).

## 3. Gliederung

```
L’ANNÉE (1898.ma)
├── Start: Wochenplan (live), drei Orte, Karte, Galerie
├── Garage   (garage.ma → /garage/)
├── Kiosque  (kiosque.ma → /kiosque/)
├── Marché   (/marche/: Termine, Einladung für Feste)
├── La Carte (/karte/: Filter nach Ort)
├── Das Jahr (/das-jahr/: Austernkalender, R-Regel, Größen, Anleitung, Weine)
├── Kontakt
└── Impressum, Datenschutz
```

Sprachen: Deutsch (ohne Präfix), Französisch (`/fr/…`), Englisch (`/en/…`), jeweils mit hreflang.

## 4. Subbrands

Lockup jeder Subbrand = **L’ANNÉE-Logo + Zweizeiler (NAME, Linie, Huîtres & Bulles)**. Die Buchstaben des Logos sind genau so hoch wie der Zweizeiler: von der Versalhöhe des Namens bis zur Grundlinie von „Huîtres & Bulles“; die Akzente ragen darüber hinaus. Auf den Farbflächen ist die Schrift bei allen drei Orten weiß.

Die Signets (Kreis mit dem Akzent als Zeiger auf die Öffnungsstunde) bleiben als kleine Wegweiser in Navigation, Zitaten und Fußzeile:

| Subbrand | Zeiger | Farbe |
| --- | --- | --- |
| Marché | 8 Uhr | Vert L’ANNÉE |
| Kiosque | 10 Uhr | Vert Mousse |
| Garage | 6 Uhr (18 Uhr) | Vert Olive |
| L’ANNÉE | alle drei | Encre + drei Farben |

Der Name steht in gesperrten Versalien (Instrument Sans, schmal) über einer Linie, wie bereits auf dem Marché-Anhänger.

## 5. Farben

| Name | HEX | OKLCH | Rolle |
| --- | --- | --- | --- |
| Vert L’ANNÉE | #709B4A | 64 % 0.12 132 | Markenfarbe, Marché, der Morgen |
| Vert Mousse | #586C2A | 50 % 0.095 124 | Kiosque, der Sonntag |
| Vert Olive | #434815 | 38.5 % 0.072 115 | Garage, der Abend |
| Encre | #1C2411 | 24.5 % 0.035 128 | Text, Fußzeile (fast schwarzes Waldgrün) |
| Nacre | #F6F7EC | 97.2 % 0.014 112 | Perlmutt, ruhige Flächen (warmes, grünliches Weiß) |
| Chartreuse | #CEE65A | 88 % 0.165 118 | nur der Störer „fiktiv“ |

Seit 30.10.2026 (vorher Vert #4D9D6E, Bleu Marée #2E669C, Rouge Bordeaux #7D2131): Die ganze Palette besteht aus warmen Grüntönen, Farbton 112–135° in OKLCH, also zum Gelb hin. Die drei Ortsfarben unterscheiden sich vor allem in der Helligkeit, die vom Morgen zum Abend fällt. Im Code heißen die Tokens weiter `vert`/`bleu`/`vin` (= Marché/Kiosque/Garage).
Kontraste: Weiß auf Vert Mousse 5,8 : 1, auf Vert Olive 9,7 : 1, auf Vert L’ANNÉE 3,2 : 1 (reicht für große Schrift), Encre auf Weiß 16 : 1.

## 6. Typografie

- **Fraunces** (variabel, SIL OFL), Titel: weiche, gerundete Serifen wie die Ecken des Logos; optische Größe passt sich an. Zugeschnitten auf Gewicht 300–700, SOFT 100.
- **Instrument Sans** (variabel, SIL OFL), Text & UI: schmale Breite (wdth 75) für Subbrand-Namen.
- Beide selbst gehostet (DSGVO: keine Verbindung zu Google).

**Skala im Goldenen Schnitt** (Desktop laut Vorgabe, fluid per `clamp()` zwischen 360 und 1920 px, mobil Verhältnis 1,25):

| Token | 360 px | 1920 px |
| --- | --- | --- |
| h1 | 3.815rem | 17.942rem |
| h2 | 3.052rem | 11.089rem |
| h3 | 2.441rem | 6.854rem |
| h4 | 1.953rem | 4.236rem |
| h5 | 1.562rem | 2.618rem |
| h6 | 1.25rem | 1.618rem |
| p | 1rem | 1rem |
| small | 0.618rem (als Text mind. 0.8125rem) | |
| xs | 0.382rem (Abstände) | |

Abstände ebenfalls in φ-Schritten (0.382 … 17.942rem).

## 7. Breakpoints

Abgeleitet aus StatCounter Deutschland, September 2026 (mobil 360–430 px; Tablets 600–834 hochkant / 1024–1334 quer; Desktop 1920×1080 = 34 %, 2560×1440 = 8 %, 1536×864 = 8 %).

| Name | min-width | Geräte |
| --- | --- | --- |
| xs | 0 | Smartphones |
| sm | 480 | große Phones quer, Foldables |
| md | 768 | Tablets hochkant |
| lg | 1024 | Tablets quer, kleine Laptops (Navigation voll) |
| xl | 1280 | Laptops |
| 2xl | 1536 | Desktop 125 % |
| 3xl | 1920 | Full HD |
| 4xl | 2560 | QHD |

Seiten sind auf dem Desktop immer volle Breite. Begrenzt wird nur die Zeilenlänge von Fließtext. Wochenplan und Jahresuhr nutzen Container Queries.

## 8. Gestaltungsprinzipien

1. **Ein mutiger Moment pro Seite:** Logo in voller Breite, riesige Ortsnamen. Alles andere ist ruhig, Informationen wie die Öffnungszeiten sauber und übersichtlich.
2. **Große Flächen, viel Weiß:** Farbflächen nur für die drei Orte, sonst Weiß und Nacre.
3. **Goldener Schnitt im Raster:** Spalten 1 : 1,618, Bildformate 1,618 : 1.
4. **Bewegung nur mit Sinn:** Logo-Auftakt, Zeiger dreht zur aktuellen Zeit. `prefers-reduced-motion` wird respektiert.
5. **Datenschutz durch Technik:** keine Cookies, kein Tracking, keine Einbettungen, Kartenlinks statt Karten.

## 9. Eigene Inhalte

- Wochenplan: Tage als Zeilen, Öffnungszeiten als farbige Balken auf einer Stundenskala (mobil als Liste mit Mini-Balken); live mit „Jetzt geöffnet“ / „Als Nächstes“, Jetzt-Linie, Datum und Pausen
- Das Jahr: 12 Monate (Galette des Rois, Saint-Jacques, Schwetzinger Spargel, Nachtwandel, Beaujolais Nouveau, Réveillon …), Regel mit dem R, Austerngrößen Nº 0–5, Austern essen in vier Schritten, Weinbegleitung
- La Carte (fiktiv): Struktur „Hunger / Durst“ nach dem Vorbild De Blauwe Kiosk (Gent), Inhalte aus der L’ANNÉE-Karte, Geschmacksprofile der Austern (jodig, fleischig, nussig), Filter nach Ort

## 10. Offene Punkte

Siehe README → „Vor dem Livegang prüfen“.
