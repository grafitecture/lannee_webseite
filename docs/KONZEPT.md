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
- Es gibt **nur die Grün-Skala 400–900** (seit 08.11.2026; davor Petrol bis Meergrün vom 05.11.2026, Kobaltblau vom 03.11.2026): ein Farbton von Citron vert bis Bouteille, dazu Weiß. Auch alle Fotos sind auf diese Skala abgestimmt. Die Helligkeit der Ortsfarben folgt dem **Tageslicht**: Morgen (600), Sonntag (800), Abend (900).

## 3. Gliederung

```
L’ANNÉE (1898.ma)
├── Start: Vollbild-Hero mit Mega-Headline und den drei Orten, Öffnungszeiten als dezente Zeile, drei Orte im Detail, Bilderreihe, Karte, Instagram
├── Garage   (garage.ma → /garage/)
├── Kiosque  (kiosque.ma → /kiosque/)
├── Marché   (/marche/: Termine, Einladung für Feste)
├── La Carte (/karte/: Filter nach Ort)
├── Atlanten (/atlanten/: Austernatlas mit 24 Arten und Herkünften als runde Karten mit Strichzeichnung + Champagner-Guide)
├── Kontakt
└── Impressum, Datenschutz
```

Sprachen: Deutsch (ohne Präfix), Französisch (`/fr/…`), Englisch (`/en/…`), jeweils mit hreflang.

## 4. Subbrands

Logo (seit 03.11.2026): **weiße, gestrichene Holzbuchstaben L’ANNÉE**, freigestelltes Bild. Weiß gehört auf Dunkel – das Logo steht in der Kopfzeile (über dem Vollbild-Foto oder auf 900) und genauso in der Fußzeile (Logo · Linie · Slogan, seit 06.11.2026), nie auf Weiß. Seit dem Umbau am 05.11.2026 sitzt es fest in der Kopfzeile (keine Wanderung mehr), daneben Linie und Slogan in der Seitensprache.

Die Orte unterscheiden sich über ihre Farbe (keine Uhren, keine Zeichnungen, keine Lockups mehr auf den Seiten):

| Subbrand | Farbe |
| --- | --- |
| Marché | 600 · Pistache (Schrift darauf 900; als Schrift auf Weiß 700, nur groß) |
| Kiosque | 800 · Varech |
| Garage | 900 · Bouteille |
| L’ANNÉE | Holz-Logo weiß auf 900 |

Auf der Startseite stehen die drei Orte als helle Kacheln (Hauch der Ortsfarbe, Name und Pfeil in der Ortsfarbe) im Hero, in den Öffnungszeiten als Farbpunkt und im Detail mit einem Farbpunkt am Namen; die Ortsseiten färben Zitat, Karte und Buttons in der Farbe des Ortes.

## 5. Farben

| Name | HEX | OKLCH | Rolle |
| --- | --- | --- | --- |
| 400 · Citron vert | #C2FF33 | 92.6 % 0.222 126 | Akzent: aktiv, hover, Hinweise; als Hauch (`--tint`, 20 % auf Weiß) die hellen Karten und Flächen |
| 500 · Chartreuse | #B2FF00 | 91.5 % 0.241 128 | lautestes Grün: nur das Angebot des Wochenendes (Schrift darauf 900) |
| 600 · Pistache | #8FCC00 | 77.4 % 0.203 128 | Marché, der Morgen (Schrift darauf 900); Linien |
| 700 · Olive | #6B9900 | 62.6 % 0.163 128 | Marché als Schrift auf Weiß, nur groß (Namen, Zitat) |
| 800 · Varech | #476600 | 46.8 % 0.122 128 | Kiosque, der Sonntag; Nebentext auf Weiß; Zeichnungen im Austernatlas |
| 900 · Bouteille | #243300 | 29.7 % 0.075 126 | dunkelste Stufe, ersetzt Schwarz: Text, Kopf- und Fußzeile; Garage, der Abend |
| Weiß | #FFFFFF | 100 % 0 0 | Flächen, Schrift auf 900/800 |

Vorgabe seit 08.11.2026: **ausschließlich die Grün-Skala 400–900 und Weiß** (ersetzt die Blautöne Bleu nuit, Océan, Marée, Embrun, Écume und das Rot Homard). Dunkle Stufe (900, 800) mit weißer Schrift, helle Stufe (600–400) mit Schrift in 900, auf Weiß Schrift in 900 (Nebentext 800); nichts Schwarzes, nichts Graues. Je Ort drei Rollen im Code: Fläche (`--garage`), Schrift darauf (`--garage-on`), Schrift auf Weiß (`--garage-ink`); dazu `--ink` = 900, `--muted` = 800, `--accent` = 400, `--rule` = 600, `--offer` = 500.
Kontraste: 900 auf Weiß 13,6 : 1, 800 auf Weiß 6,6 : 1, 900 auf 600 7,0 : 1, auf 500 11,1 : 1, auf 400 11,4 : 1; 700 auf Weiß nur 3,4 : 1 (deshalb nur große Schrift). Einzige fremde Farben: das Grafitecture-Feld (Agentur-Kit).

**Fotos (seit 08.11.2026):** Alle Fotos bekommen beim Erzeugen (`npm run images`) denselben Farblook aus `scripts/look.mjs`: Weißabgleich, sanfte S-Kurve mit leicht angehobenem Schwarz, Farbtöne nahe der Skala bleiben, Blau/Rot/Magenta werden stark entsättigt, Split-Toning in Richtung 900/800 (Schatten) und 400 (Lichter), leichte Vignette, feines Korn, nachgeschärft. Die Originale in `assets-src/` bleiben unverändert.

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

1. **Aufgeräumt und großflächig:** viel Weiß, sehr viel Luft zwischen den Abschnitten, je Abschnitt eine Aussage. Große Bildkarten und Farbflächen mit runden Ecken (Radien nach Größe gestaffelt), Buttons als Pillen. Seit 06.11.2026 **leicht und hell**: helle Flächen statt dunkler, leichte Überschriften; 900 als Fläche nur in Kopf- und Fußzeile. Der Hero der Startseite hat seit 08.11.2026 wieder ein Foto im Hintergrund (Hof der Garage, Verlauf in 900, Mega-Headline weiß, helle Kacheln). Bulles und die Austern-Postkarte werden nicht mehr verwendet (08.11.2026).
2. **Ein mutiger Moment:** der Vollbild-Hero mit der Mega-Headline „Drei Orte. Ein Wochenende. Komm vorbei!“ und den drei Orten als hellen Kacheln – man sieht sofort, dass es drei Orte gibt. Auf den Ortsseiten der riesige Name über dem Vollbild-Foto.
3. **Nur echte Fotos:** keine generierten Bilder, keine Visualisierungen, keine Schwarzweiß-Bilder (seit 06.11.2026). Auf der Startseite je Ort ein Foto groß und ein Detailfoto als Abzug mit weißem Rand darüber.
4. **Keine Zeichnungen, kein Film, keine Uhren.** Bewegung nur, wo sie etwas zeigt (Kopfzeile wird beim Scrollen dunkel, Live-Punkt pulsiert, wenn geöffnet). `prefers-reduced-motion` wird respektiert.
5. **Datenschutz durch Technik:** keine Cookies, kein Tracking, keine Einbettungen, Kartenlinks statt Karten.

## 9. Eigene Inhalte

- Öffnungszeiten: dezente Zeile, je Öffnungstag die Orte mit Farbpunkt und Uhrzeit; live mit „heute“/„morgen“, leisem Puls am geöffneten Ort und Pausen
- La Carte (fiktiv): Struktur „Hunger / Durst“ nach dem Vorbild De Blauwe Kiosk (Gent), Inhalte aus der L’ANNÉE-Karte, Geschmacksprofile der Austern (jodig, fleischig, nussig), Filter nach Ort
- Austernatlas: Arten und Herkünfte als runde Karten, je mit einer Austern-Strichzeichnung (einzige Zeichnungen der Website, seit 06.11.2026 wieder)
- Champagner-Guide (auf der Seite „Atlanten“, 06.11.2026): Zahlen, Anbaugebiete, Rebsorten, Herstellung, Dosage und Aromen, Stile, Flaschengrößen, Lagern & Servieren, Etikett, Häuser & Winzer, Begriffe – nur Text und Datenbalken, keine Zeichnungen

## 10. Offene Punkte

Siehe README → „Vor dem Livegang prüfen“.
