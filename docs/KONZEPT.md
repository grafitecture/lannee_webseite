# L’ANNÉE – Konzept & Markensystem

Stand: Oktober 2026 · Grundlage: Briefing, PDF „LANNEE_Garage_Kiosque_Marche“, bestehende Seite 1898.ma, Fotos

## 1. Ausgangslage

- **Dachmarke:** L’ANNÉE (L’ANNÉE GbR, Andrea & Eric Schweppe, Mannheim), Web: 1898.ma
- **Gemeinsames Versprechen:** *Austern & Bulles* (feststehender Slogan, „Bulles“ wird nie mit „Bläschen“ übersetzt): Austern und Schaumwein, unkompliziert („Wir reservieren nicht – komm einfach vorbei, ein Plätzchen findet sich.“)
- **Drei Orte:**

| Ort | Wann | Wo | Ansprache |
| --- | --- | --- | --- |
| Garage | Fr & Sa ab 18 Uhr | Beilstraße 6, Jungbusch | bonsoir@garage.ma |
| Kiosque | So ab 10 Uhr | Lindenhofplatz 1, Lindenhof | bonjour@kiosque.ma |
| Marché | Sa 8–13 Uhr | Wochenmarkt Lindenhof, weitere Orte nach Ankündigung | bonjour@lannee.de |

## 2. Leitidee: Die Zeit

*L’ANNÉE* heißt „das Jahr“. Austern folgen dem Kalender (Monate mit R) und den Gezeiten, und die drei Orte teilen sich ein Wochenende. Deshalb ist **Zeit** das verbindende Motiv:

- Wann welcher Ort offen hat, steht ganz dezent als schlichte Zeile unter dem Hero (seit 06.11.2026; vorher Wochenplan mit runden Karten).
- Uhren (Signets mit dem Akzent als Zeiger) gibt es seit 03.11.2026 nicht mehr, auch keine Jahresuhr.
- Es gibt **nur Blau, mit Zug ins Grün** (Petrol bis Meergrün, seit 05.11.2026; davor 03.11.2026 Kobaltblau, noch davor Grün): Töne von Meer, Watt, Gischt und Eis. Die Helligkeit der Ortsfarben folgt dem **Tageslicht**: Morgen (Marée), Sonntag (Océan), Abend (Bleu nuit).

## 3. Gliederung

```
L’ANNÉE (1898.ma)
├── Start: Vollbild-Hero mit Mega-Headline und den drei Orten, Öffnungszeiten als dezente Zeile, drei Orte im Detail, Bilderreihe, Karte, Instagram
├── Garage   (garage.ma → /garage/)
├── Kiosque  (kiosque.ma → /kiosque/)
├── Marché   (/marche/: Termine, Einladung für Feste)
├── La Carte (/karte/: Filter nach Ort)
├── Austernatlas (/austernatlas/: 24 Arten und Herkünfte als runde Karten)
├── Kontakt
└── Impressum, Datenschutz
```

Sprachen: Deutsch (ohne Präfix), Französisch (`/fr/…`), Englisch (`/en/…`), jeweils mit hreflang.

## 4. Subbrands

Logo (seit 03.11.2026): **weiße, gestrichene Holzbuchstaben L’ANNÉE**, freigestelltes Bild. Weiß gehört auf Blau – das Logo steht in der Kopfzeile (über dem Vollbild-Foto oder auf Bleu nuit) und genauso in der Fußzeile (Logo · Linie · Slogan, seit 06.11.2026), nie auf Weiß. Seit dem Umbau am 05.11.2026 sitzt es fest in der Kopfzeile (keine Wanderung mehr), daneben Linie und Slogan in der Seitensprache.

Die Orte unterscheiden sich über ihre Farbe (keine Uhren, keine Zeichnungen, keine Lockups mehr auf den Seiten):

| Subbrand | Farbe |
| --- | --- |
| Marché | Marée |
| Kiosque | Océan |
| Garage | Bleu nuit |
| L’ANNÉE | Holz-Logo weiß auf Blau |

Auf der Startseite stehen die drei Orte als Farbkacheln im Hero, in den Öffnungszeiten als Farbpunkt und im Detail mit einem Farbpunkt am Namen; die Ortsseiten färben Zitat, Karte und Buttons in der Farbe des Ortes.

## 5. Farben

| Name | HEX | OKLCH | Rolle |
| --- | --- | --- | --- |
| Bleu nuit | #002B32 | 26.2 % 0.051 210 | dunkelstes Blau (Nacht-Petrol), ersetzt Schwarz: Text, Kopf- und Fußzeile; Garage, der Abend |
| Océan | #005F62 | 43.8 % 0.078 199 | Kiosque, der Sonntag |
| Marée | #1C8171 | 54.4 % 0.092 179 | Marché, der Morgen; Nebentext auf Weiß |
| Embrun | #72C5AC | 76.4 % 0.090 172 | Linien (für Schrift zu hell) |
| Écume | #D2FBE8 | 95.5 % 0.050 165 | Akzent: aktiv, hover, Hinweise; als Hauch (`--tint`) die hellen Karten auf Weiß |
| Weiß | #FFFFFF | 100 % 0 0 | Flächen, Schrift auf Blau |

Vorgabe seit 05.11.2026: **Blau mit Zug ins Grün**, beim Umbau am Abend noch einmal um 18° im OKLCH-Farbkreis Richtung Grün geschoben (Petrol bis Meergrün, kein reines Grün; davor Petrol/Türkis, davor Kobalt vom 03.11.2026, davor „nur Grün“ vom 30.10.2026). Entweder blaue Fläche mit weißer Schrift oder weiße Fläche mit blauer Schrift; nichts Schwarzes, nichts Graues. Rollen im Code: `--ink` und `--garage` = Bleu nuit, `--kiosque` = Océan, `--marche` und `--muted` = Marée, `--brand` = Embrun.
Kontraste: Weiß auf Bleu nuit 15,1 : 1, auf Océan 7,5 : 1, auf Marée 4,7 : 1 (alle für Fließtext geeignet); auf Embrun nur 2,0 : 1, deshalb trägt Embrun keine Schrift und keinen Ort.

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

Seiten sind auf dem Desktop immer volle Breite. Begrenzt wird nur die Zeilenlänge von Fließtext.

## 8. Gestaltungsprinzipien (Umbau 05.11.2026)

1. **Aufgeräumt und großflächig:** viel Weiß, sehr viel Luft zwischen den Abschnitten, je Abschnitt eine Aussage. Große Bildkarten und Farbflächen mit runden Ecken (Radien nach Größe gestaffelt), Buttons als Pillen.
2. **Ein mutiger Moment:** der Vollbild-Hero mit der Mega-Headline „Drei Orte. Ein Wochenende. Komm vorbei!“ und den drei Orten als Farbkacheln – man sieht sofort, dass es drei Orte gibt. Auf den Ortsseiten der riesige Name über dem Vollbild-Foto.
3. **Nur echte Fotos:** keine generierten Bilder, keine Visualisierungen, keine Schwarzweiß-Bilder (seit 06.11.2026). Auf der Startseite je Ort ein Foto groß und ein Detailfoto als Abzug mit weißem Rand darüber.
4. **Keine Zeichnungen, kein Film, keine Uhren.** Bewegung nur, wo sie etwas zeigt (Kopfzeile wird beim Scrollen blau, Live-Punkt pulsiert, wenn geöffnet). `prefers-reduced-motion` wird respektiert.
5. **Datenschutz durch Technik:** keine Cookies, kein Tracking, keine Einbettungen, Kartenlinks statt Karten.

## 9. Eigene Inhalte

- Öffnungszeiten: dezente Zeile, je Öffnungstag die Orte mit Farbpunkt und Uhrzeit; live mit „heute“/„morgen“, leisem Puls am geöffneten Ort und Pausen
- La Carte (fiktiv): Struktur „Hunger / Durst“ nach dem Vorbild De Blauwe Kiosk (Gent), Inhalte aus der L’ANNÉE-Karte, Geschmacksprofile der Austern (jodig, fleischig, nussig), Filter nach Ort
- Austernatlas: Arten und Herkünfte als runde Karten

## 10. Offene Punkte

Siehe README → „Vor dem Livegang prüfen“.
