# L’ANNÉE – Hinweise für Claude Code

Website der Dachmarke L’ANNÉE (Austern & Bulles, Mannheim) mit Garage, Kiosque, Marché. Sprache im Team: Deutsch.

## Grundregeln

- **Keine npm-Abhängigkeiten im Build.** `node src/build.mjs` läuft auf Vercel ohne `npm install`. Nichts hinzufügen, was das ändert.
- Bilder (`public/images`), Favicons und OG-Bilder sind **eingecheckt**, weil sharp/Playwright auf Vercel nicht laufen. Neu erzeugen nur lokal (`npm run images`, `npm run brand-assets`).
- Die Live-Domain `1898.ma` nicht anfassen (Domains, DNS, Weiterleitungen), außer der Nutzer verlangt es ausdrücklich.
- Inhalte immer in allen drei Sprachen pflegen: `src/content/i18n/{de,fr,en}.mjs`. Deutsch ist führend.
- Keine Cookies, kein Tracking, keine externen Requests (CSP in `vercel.json`). Karten nur als Links.

## Gestaltung (Umbau 05.11.2026, ersetzt alle älteren Gestaltungsvorgaben)

- **Aufgeräumt, großflächig, viel Weiß, runde Ecken** (Vorbild: große Bildkarten und Pillen-Buttons wie bei redotpay.com). Je Abschnitt eine Aussage, sehr viel Luft (`--section-y`). Radien nach Größe gestaffelt: `--r-xl` (große Bildkarten, Farbflächen, Hero-Kacheln, Fußzeile), `--r-l` (Karten im Inhalt), `--r-m`, `--r-pill` (Buttons, Filter, Hinweise). Helle Karten auf Weiß: `--tint` (ein Hauch Écume).
- **Keine Zeichnungen – nirgends:** keine Bleistift-Scribbles, keine Strichzeichnungen der Orte, keine Austern-Zeichnungen im Atlas, keine Speisen-Icons, keine Embleme. Im Sprite nur funktionale Icons (Pfeile, Instagram). Keine Uhren (Signets).
- **Kein Film.** Der Hero ist ein Vollbild-Foto.
- **Hero der Startseite = Vollbild** (`100svh`): echtes Foto vom Hof der Garage (`garage-hof`), darauf die **Mega-Headline** über drei Zeilen, die zum Besuch auffordert (DE „Drei Orte. Ein Wochenende. Komm vorbei!“, FR „Trois adresses. Un week-end. Passez nous voir !“, EN „Three places. One weekend. Come by!“ – `pages.home.headline`), darunter der Lead und **die drei Orte als Kacheln in ihren Farben** (Name, Tage/Uhrzeit, Viertel, Pfeil). Man muss sofort sehen, dass es drei Orte gibt.
- **Bilder: nur echte Fotos** (Vorgabe 06.11.2026). **Keine generierten Bilder** (KI, Higgsfield), keine Visualisierungen, keine historischen KI-Motive, keine Schwarzweiß-Bilder. Am 06.11.2026 entfernt: alle `historisch-*`, `austernplatte`, `kiosque-visualisierung`, `hero-austern-hof`. Auf der Startseite je Ort ein Foto groß und ein Detailfoto als Abzug mit weißem Rand darüber; auf den Ortsseiten ein Foto neben dem Intro. Vom Kiosque gibt es noch kein echtes Foto; bis dahin steht dort `bulles`. Das Foto mit den Baguettes ist auf Wunsch entfernt (06.11.2026). Garage innen (06.11.2026, gerade ausgerichtet): `garage-glaeser` (Startseite, Garage), `garage-tresen` (Intro der Garage: Holzboot-Tresen), `garage-sammlung` (Bilderreihen). Neue Bilder nur als echte Fotos (Quelle in `assets-src/`, `npm run images -- name`).
- **Nur Blau mit Zug ins Grün** (am 05.11.2026 abends noch einmal um 18° Richtung Grün geschoben): Bleu nuit #002B32, Océan #005F62, Marée #1C8171, Embrun #72C5AC, Écume #D2FBE8 und Weiß. Petrol bis Meergrün, **kein reines Grün**. Entweder blaue Fläche mit weißer Schrift oder weiße Fläche mit blauer Schrift; nichts Schwarzes, nichts Graues (statt Schwarz: Bleu nuit). **Die drei Orte bleiben klar getrennt:** Garage = Bleu nuit (Abend), Kiosque = Océan (Sonntag), Marché = Marée (Morgen). Embrun nur für Linien, Écume für Akzente (aktiv/hover, Hinweise). In CSS nur die Variablen aus `tokens.mjs` (`--ink`, `--garage`, `--kiosque`, `--marche`, `--brand`, `--muted`, `--embrun`, `--ecume`, `--blanc`) und daraus abgeleitete (`--tint`, `color-mix`), keine festen Farbwerte. Farbwechsel nur in `tokens.mjs` (und `hex` in `LOCATIONS`), danach `npm run brand-assets` (Favicons und Share-Bilder haben die Farbe eingebacken).
- **Logo = weiße Holzbuchstaben**, freigestelltes Rasterbild (Quelle `assets-src/logo-lannee-holz.png`, Varianten mit `npm run images -- logo-lannee`, eingebunden über `logo()` als `<picture>`). **Weiß gehört auf Blau:** Das Logo steht nie auf Weiß. **Es sitzt fest in der Kopfzeile** (Vorgabe 05.11.2026, die Wander-Animation ist entfernt), daneben feine Linie und Slogan. **In der Fußzeile genau gleich:** Logo · Linie · Slogan (Vorgabe 06.11.2026), beide über denselben Baustein `lockup()` in `layout.mjs`; Größe über `--lockup-h` (seit 06.11.2026 etwas größer: 1,95 rem, ab 1024 px 2,55 rem).
- **Slogan am Logo immer übersetzt:** DE „Austern & Bulles“, FR „Huîtres & Bulles“, EN „Oysters & Bulles“ (`SITE.taglines`). „Bulles“ bleibt französisch, nie „Bläschen“.
- **Kopfzeile:** Bleu nuit mit weißem Logo, Linie, Slogan und weißer Navigation in Pillen (aktiv Écume). Auf Seiten mit Vollbild-Foto (Start, Garage, Kiosque, Marché; `OVERLAY_HEADER` in `layout.mjs`) liegt sie durchsichtig über dem Bild und wird nach dem Scrollen Bleu nuit (`initHeader()`). Menü-Schalter bis 1279 px nur als Hamburger (ohne Text „Menü“, der steht nur für Screenreader); die volle Navigation erst ab 1280 px, weil sie mit dem größeren Logo zwischen 1024 und 1279 px nicht passt. Das mobile Menü ist weiß mit blauer Schrift.
- **Ortsseiten:** Vollbild-Foto (92svh) mit großem Namen, Pille mit Tag/Uhrzeit, Untertitel; dann Fakten als runde Karten, Zitat groß in der Farbe des Ortes, Intro neben einem Foto, Karte als Farbfläche in der Farbe des Ortes, Bilderreihe, Viertel, Anfahrt (helle Fläche, Kartenlinks als Pillen), die beiden anderen Orte als Farbkacheln.
- **Öffnungszeiten** (Startseite, direkt unter dem Hero, Vorgabe 06.11.2026): **ganz dezent** als schlichte Zeile (`weekPlan()`): mobil je Öffnungstag eine Zeile (Tag klein in Versalien, daneben die Orte mit Farbpunkt und Uhrzeit), ab 768 px drei Spalten (Tag oben, Orte darunter, feine Linie dazwischen). Schrift der Orte 1,1875 rem, ab 1024 px 1,375 rem (Vorgabe 06.11.2026: größere Schrift). Keine Überschrift (nur für Screenreader), kein Lead-Text, keine Karten, keine Live-Pille. Das Skript schreibt nur „heute“/„morgen“ an den Tag, lässt den Punkt des gerade geöffneten Orts leise pulsieren („Jetzt geöffnet“) und markiert Pausen. Nur Tage mit Öffnung.
- **Fußzeile:** Bleu nuit mit großen runden Ecken oben, Logo · Linie · Slogan wie in der Kopfzeile, Links als Pillen. Ohne die drei Orte, ohne „Gestaltung: Grafitecture“. **Hinweis „Diese Webseite dient zur reinen Darstellung und ist fiktiv.“** als schlichte Textzeile ganz unten (`SITE.demoNotice`).
- Schriften: Fraunces (Headlines, kräftig um 500–560, eng gesetzt) und Instrument Sans (Text, UI), beide selbst gehostet.
- „Grafitecture“ immer verlinken: `https://www.grafitecture.de/` (mit www), öffnet in neuem Fenster. Im Mini-Markup `[Grafitecture](https://www.grafitecture.de/)`, sonst `SITE.agency`.
- **Grafitecture-Feld** (Lime-Fläche mit Logo, „Marken mit KI.“, Link auf grafitecture.de): steht immer ganz unten in Impressum und Datenschutz (DE/FR/EN), eingebunden in `src/pages/legal.mjs`. Quelle ist das Kit `kit/grafitecture-credit/` (README dort), der Build hängt dessen CSS an `site.css` an. Die Farben des Feldes (#dafd55, #435960, Weiß) gehören der Agentur und sind die **einzige Ausnahme** von „nur Blau“ und „nur Token-Variablen“. Am Feld nichts an L’ANNÉE anpassen; Änderungen im Kit machen (gilt für alle Grafitecture-Websites).

## Wo was liegt

- Stammdaten, Öffnungszeiten, Pausen, Marché-Termine: `src/content/site.mjs` (dort auch `SITE.demoNotice`)
- Mega-Headline und alle Texte: `src/content/i18n/{de,fr,en}.mjs`
- Karte: `src/content/menu.mjs` · Rechtstexte: `src/content/legal.mjs` (die Unterseite „Das Jahr“ wurde am 01.11.2026 gelöscht; alte Adressen leiten auf die Startseite)
- Austernatlas (eigene Seite `/austernatlas/`, Menüpunkt): Texte `src/content/oysters.mjs`, Vorlage `src/pages/atlas.mjs` (runde Karten, ohne Zeichnungen)
- Bilder: Quellen in `assets-src/`, Liste in `scripts/images.mjs` (`SOURCES`), Alt-Texte in `src/content/media.mjs`. (`scripts/historisch.py` und die Higgsfield-Übergabe stammen aus der Zeit der KI-Bilder und werden nicht mehr gebraucht.)
- Higgsfield-Dateien ins Repo holen: Die Arbeitsumgebung erreicht die Higgsfield-Adressen nicht. Auf dem Zweig `tools/fetch-assets` „Name URL“-Zeilen eintragen und pushen: `assets-src/fetch/thumbs.txt` (Vorschaubilder), `assets-src/fetch/full.txt` (Vollauflösung als JPEG), `assets-src/fetch/videos.txt` (je vier Standbilder aus Videos) oder `assets-src/scribbles/urls.txt` (Rohdateien). Die Workflows legen die Dateien auf diesem Zweig ab.
- Farben, Typo-Skala (Goldener Schnitt, `clamp()`), Breakpoints: `src/content/tokens.mjs`; Radien, `--tint`, `--section-y`: `src/styles/02-base.css`
- Templates: `src/pages/*.mjs`, Bausteine: `src/lib/components.mjs` (`logo`, `picture`, `button`, `weekPlan` …), Layout/Kopf-/Fußzeile/JSON-LD: `src/lib/layout.mjs`
- CSS: `src/styles/01–05`, Skript: `src/scripts/main.js` (nur progressive Verbesserung: Kopfzeile, Menü, Öffnungszeiten heute/geöffnet/Pause, Kartenfilter, abgelaufene Termine)

## Konventionen

- Templates nutzen das Tagged Template `html` aus `src/lib/html.mjs`; Werte werden escaped. Mini-Markup in Texten über `rich()`: `_kursiv_`, `**fett**`, `{fr|…}`, `[Link](/pfad/)`.
- Französische Typografie (schmales geschütztes Leerzeichen vor `: ; ! ? »`) erledigt `typo()`.
- Buttons über `button(href, label, { cls: 'btn btn--solid' | 'btn btn--light' | 'btn btn--line' | 'btn btn--garage' … })`.
- Grids mit Text immer `grid-template-columns: minmax(0, 1fr)`, sonst laufen sie auf dem Handy über.

## Prüfen vor dem Commit

```bash
npm run dev   # baut und startet http://localhost:4321
```

Startseite, eine Ortsseite und die Karte in DE/FR/EN bei 390 px und 1440 px ansehen; keine Konsolenfehler, kein horizontales Scrollen.
