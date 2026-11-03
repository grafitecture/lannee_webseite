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

- Die Woche zeigt ein klarer Wochenplan mit Zeitachse; die Strichzeichnungen der Orte machen das Licht an, wenn geöffnet ist.
- Uhren (Signets mit dem Akzent als Zeiger) gibt es seit 03.11.2026 nicht mehr, auch keine Jahresuhr.
- Es gibt **nur Blau** (seit 03.11.2026, vorher Grün): frische Töne von Meer, Gischt und Eis. Die Helligkeit der Ortsfarben folgt dem **Tageslicht**: Morgen (Marée), Sonntag (Océan), Abend (Bleu nuit).

## 3. Gliederung

```
L’ANNÉE (1898.ma)
├── Start: Wochenplan (live), drei Orte, Karte, Galerie
├── Garage   (garage.ma → /garage/)
├── Kiosque  (kiosque.ma → /kiosque/)
├── Marché   (/marche/: Termine, Einladung für Feste)
├── La Carte (/karte/: Filter nach Ort)
├── Das Jahr (/das-jahr/: Austernkalender, R-Regel, Größen, Anleitung, Weine)
├── Austernatlas (/austernatlas/: 24 Arten und Herkünfte als Strichzeichnungen)
├── Kontakt
└── Impressum, Datenschutz
```

Sprachen: Deutsch (ohne Präfix), Französisch (`/fr/…`), Englisch (`/en/…`), jeweils mit hreflang.

## 4. Subbrands

Logo (seit 03.11.2026): **weiße, gestrichene Holzbuchstaben L’ANNÉE**, freigestelltes Bild. Weiß gehört auf Blau – das Logo steht in Kopfzeile, Hero, Fußzeile und in allen Lockups auf einer blauen Fläche, nie auf Weiß. Auf der Startseite wandert es mit dem Slogan beim Scrollen vom Hero in die Kopfzeile.

Lockup jeder Subbrand = **L’ANNÉE-Logo + Zweizeiler (NAME, Linie, Austern & Bulles)**. Die Buchstaben des Logos sind genau so hoch wie der Zweizeiler: von der Versalhöhe des Namens bis zur Grundlinie von „Austern & Bulles“; die Akzente ragen darüber hinaus. Der Lockup steht immer auf der Farbe des Ortes, die Schrift ist weiß (Startseite „drei Orte“ und Köpfe der Ortsseiten).

Uhren (Signets) gibt es nirgends mehr (Vorgabe 03.11.2026). Die Orte unterscheiden sich über ihre Farbe:

| Subbrand | Farbe |
| --- | --- |
| Marché | Marée |
| Kiosque | Océan |
| Garage | Bleu nuit |
| L’ANNÉE | Holz-Logo weiß auf Blau |

Der Name steht in gesperrten Versalien (Instrument Sans, schmal) über einer Linie, wie bereits auf dem Marché-Anhänger.

## 5. Farben

| Name | HEX | OKLCH | Rolle |
| --- | --- | --- | --- |
| Bleu nuit | #082246 | 25.5 % 0.075 258 | dunkelstes Blau, ersetzt Schwarz: Text, Kopf- und Fußzeile; Garage, der Abend |
| Océan | #0C528C | 43 % 0.115 250 | Kiosque, der Sonntag |
| Marée | #167AA2 | 54.5 % 0.105 232 | Marché, der Morgen; Nebentext auf Weiß |
| Embrun | #6BBADA | 75 % 0.09 226 | Linien, Zeichnungen (für Schrift zu hell) |
| Écume | #D1F6FE | 95 % 0.04 212 | Akzent: Markierungen, Licht in den Strichzeichnungen |
| Weiß | #FFFFFF | 100 % 0 0 | Flächen, Schrift auf Blau |

Vorgabe seit 03.11.2026: **nur Blau** (ersetzt „nur Grün“ vom 30.10.2026). Entweder blaue Fläche mit weißer Schrift oder weiße Fläche mit blauer Schrift; nichts Schwarzes, nichts Graues. Rollen im Code: `--ink` und `--garage` = Bleu nuit, `--kiosque` = Océan, `--marche` und `--muted` = Marée, `--brand` = Embrun. Die drei Orte unterscheiden sich in Helligkeit und Ton (von Türkis-Blau am Morgen zu Nachtblau am Abend).
Kontraste: Weiß auf Bleu nuit 15,8 : 1, auf Océan 8,1 : 1, auf Marée 4,8 : 1 (alle für Fließtext geeignet); auf Embrun nur 2,2 : 1, deshalb trägt Embrun keine Schrift und keinen Ort. Bleu nuit auf Écume 13,8 : 1.

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
2. **Große Flächen, viel Weiß:** Farbflächen nur für die drei Orte und die Fußzeile, sonst Weiß.
3. **Goldener Schnitt im Raster:** Spalten 1 : 1,618, Bildformate 1,618 : 1.
4. **Bewegung nur mit Sinn:** Logo-Auftakt und Wanderung in die Kopfzeile, Licht in den Strichzeichnungen. `prefers-reduced-motion` wird respektiert.
5. **Datenschutz durch Technik:** keine Cookies, kein Tracking, keine Einbettungen, Kartenlinks statt Karten.

## 9. Eigene Inhalte

- Wochenplan: Tage als Zeilen, Öffnungszeiten als farbige Balken auf einer Stundenskala (mobil als Liste mit Mini-Balken); live mit „Jetzt geöffnet“ / „Als Nächstes“, Jetzt-Linie, Datum und Pausen
- Das Jahr: 12 Monate (Galette des Rois, Saint-Jacques, Schwetzinger Spargel, Nachtwandel, Beaujolais Nouveau, Réveillon …), Regel mit dem R, Austerngrößen Nº 0–5, Austern essen in vier Schritten, Weinbegleitung
- La Carte (fiktiv): Struktur „Hunger / Durst“ nach dem Vorbild De Blauwe Kiosk (Gent), Inhalte aus der L’ANNÉE-Karte, Geschmacksprofile der Austern (jodig, fleischig, nussig), Filter nach Ort

## 10. Offene Punkte

Siehe README → „Vor dem Livegang prüfen“.
