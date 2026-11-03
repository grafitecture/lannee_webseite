# L’ANNÉE – Hinweise für Claude Code

Website der Dachmarke L’ANNÉE (Austern & Bulles, Mannheim) mit Garage, Kiosque, Marché. Sprache im Team: Deutsch.

## Grundregeln

- **Keine npm-Abhängigkeiten im Build.** `node src/build.mjs` läuft auf Vercel ohne `npm install`. Nichts hinzufügen, was das ändert.
- Bilder (`public/images`), Favicons und OG-Bilder sind **eingecheckt**, weil sharp/Playwright auf Vercel nicht laufen. Neu erzeugen nur lokal (`npm run images`, `npm run brand-assets`).
- Die Live-Domain `1898.ma` nicht anfassen (Domains, DNS, Weiterleitungen), außer der Nutzer verlangt es ausdrücklich.
- Inhalte immer in allen drei Sprachen pflegen: `src/content/i18n/{de,fr,en}.mjs`. Deutsch ist führend.
- Keine Cookies, kein Tracking, keine externen Requests (CSP in `vercel.json`). Karten nur als Links.
- **Nur Grün:** Evergreen #132A13, Hunter Green #31572C, Fern #4F772D, Palm Leaf #90A955, Lime Cream #ECF39E und Weiß. Entweder grüne Fläche mit weißer Schrift oder weiße Fläche mit grüner Schrift; nichts Schwarzes, nichts Graues (statt Schwarz: Evergreen). In CSS nur die Variablen aus `tokens.mjs` (`--ink`, `--garage`, `--kiosque`, `--marche`, `--brand`, `--muted`, `--palm`, `--lime`, `--blanc`), keine festen Farbwerte.
- **Slogan am Logo immer übersetzt** (Vorgabe 01.11.2026): DE „Austern & Bulles“, FR „Huîtres & Bulles“, EN „Oysters & Bulles“ (`SITE.taglines`; gilt für Kopfzeile, Hero und Lockups). „Bulles“ bleibt französisch, nie „Bläschen“.
- **Keine Uhren (Signets) mehr – nirgends** (Vorgabe 03.11.2026): nicht in Navigation, Fußzeile, Zitaten, Karte (Filter, Tags), Kontakt, „Weitere Orte“, Styleguide oder auf den Share-Bildern. Die Komponente `signet()` ist gelöscht; nicht wieder einführen.
- **Logo = weiße Holzbuchstaben** (Vorgabe 03.11.2026): freigestelltes Rasterbild, Quelle `assets-src/logo-lannee-holz.png`, Varianten mit `npm run images -- logo-lannee` (schneidet zu, macht die Buchstaben voll deckend, AVIF/WebP 240–1563 px). Eingebunden über `logo()` in `components.mjs` als `<picture>`; `src/icons/logo-raw.svg` liefert nur noch das Favicon. **Weiß gehört auf Grün:** Das Logo steht nie auf Weiß – Kopfzeile, Hero, Fußzeile und alle Lockups (auch die Köpfe der Ortsseiten) liegen auf Grün. Die Wander-Animation (`initLogoMorph()`) bleibt wie sie ist.
- **Kopfzeile grün** (Evergreen) mit **weißem Logo** und weißer Navigation (aktiv/hover Lime Cream); auch das große Logo im Hero ist weiß (Vorgabe 31.10.2026). Das mobile Menü bleibt weiß mit grüner Schrift.
- **Kopfzeile:** Neben dem Logo steht der Slogan (feine Linie dazwischen) – auf allen Bildschirmbreiten. Auf der Startseite wandern großes Logo und Slogan beim Scrollen skaliert in ihre Endposition in der Kopfzeile (Logo · Linie · Slogan), im Vordergrund über allem; angekommen blendet die Trennlinie ein (Vorgabe 01.11.2026, bestätigt 03.11.2026).
- **Menü-Schalter mobil = nur Hamburger** (drei Striche, weiß, ohne Text „Menü“ und ohne Rahmen; Vorgabe 03.11.2026). „Menü“ steht nur unsichtbar für Screenreader im Link.
- **Hinweis „Diese Webseite dient zur reinen Darstellung und ist fiktiv.“ = schlichte Textzeile ganz unten in der Fußzeile** (unter einer feinen Linie; Vorgabe 03.11.2026). Kein Kreis/Störer, nichts Fixiertes, das über dem Inhalt schwebt.
- **Keine Speisen-/Getränke-Zeichnungen** (Zitrone, Glas, Crevette, Auster usw.; Vorgabe 03.11.2026): weder als Reihe im Karten-Teaser der Startseite noch im Kopf der Karte noch vor den Abschnitten der Karte. Die Austern-Zeichnungen im Austernatlas bleiben.
- **Fußzeile ohne die drei Orte** (Vorgabe 03.11.2026): keine Spalten Garage/Kiosque/Marché mit Zeiten, Adressen und Mails; die Fußzeile beginnt mit dem großen Holz-Logo.
- **Fußzeile ohne „Gestaltung: Grafitecture“** (Vorgabe 01.11.2026); die Agentur steht nur im Grafitecture-Feld in Impressum und Datenschutz.
- **Wochenplan** zeigt nur Tage mit Öffnung, keine Zeile „Mo – Do geschlossen“ (Vorgabe 01.11.2026).
- **Hero = Filmsequenz** (Higgsfield AI, Heimkino-Look 50er/60er, ruhig, Zeitlupe) aus `public/film/lannee-film-{quer,hoch}.{webm,mp4}`, Standbild `hero-film`; darauf Logo, Slogan und die Headline groß und linksbündig, unten die drei Ortsbänder leicht transparent und ohne Uhren. Scroll-Inszenierung: Die Bühne bleibt stehen, alle Inhalte blenden aus, der Film steht eine Weile voll im Bild, dann scrollt er weg (`initHeroScroll()`). **Kein Pause-/Play-Knopf auf dem Film** (Vorgabe 03.11.2026); **kein Live-Schild („Als Nächstes“/„Jetzt geöffnet“) auf den Ortsbändern im Hero** (Vorgabe 03.11.2026), der Live-Status steht nur in der Kachel darunter; bei reduzierter Bewegung oder Datensparmodus bleibt das Standbild. Live-Anzeige, „Zur Karte“ und „Wo wir sind“ stehen als drei gleiche Kacheln über „Ein Wochenende, drei Orte“.
- **Orte als Strichzeichnungen über den Lockups** (Vorgabe 03.11.2026): Startseite „drei Orte“ und Ortsseiten zeigen über dem Subbrand-Lockup Garage (Tore, Lichterkette), Kiosque (Markise, Hängelampen) und Marché-Wagen (Vitrine unterm Marktschirm) als feine Linie in `currentColor`, weiß auf der Farbe des Ortes (seit 03.11.2026 auch auf den Ortsseiten). Hat der Ort geöffnet, geht das Licht an: Fenster in Lime Cream, Schein darum, Lichtkegel auf die Straße. Vorschau ohne Öffnungszeit: `?licht=an`.
- „Grafitecture“ immer verlinken: `https://www.grafitecture.de/` (mit www), öffnet in neuem Fenster. Im Mini-Markup `[Grafitecture](https://www.grafitecture.de/)`, sonst `SITE.agency`.
- **Grafitecture-Feld** (Lime-Fläche mit Logo, „Marken mit KI.“, Link auf grafitecture.de): steht immer ganz unten in Impressum und Datenschutz (DE/FR/EN), eingebunden in `src/pages/legal.mjs`. Quelle ist das Kit `kit/grafitecture-credit/` (README dort), der Build hängt dessen CSS an `site.css` an. Die Farben des Feldes (#dafd55, #435960, Weiß) gehören der Agentur und sind die **einzige Ausnahme** von „nur Grün“ und „nur Token-Variablen“. Am Feld nichts an L’ANNÉE anpassen; Änderungen im Kit machen (gilt für alle Grafitecture-Websites).

## Wo was liegt

- Stammdaten, Öffnungszeiten, Pausen, Marché-Termine: `src/content/site.mjs` (dort auch `SITE.demoNotice` für die Hinweiszeile „Diese Webseite … ist fiktiv“)
- Grafitecture-Feld (Impressum, Datenschutz): `kit/grafitecture-credit/`
- Karte: `src/content/menu.mjs` · Rechtstexte: `src/content/legal.mjs` (die Unterseite „Das Jahr“ wurde am 01.11.2026 gelöscht; alte Adressen leiten auf die Startseite)
- Austernatlas (eigene Seite `/austernatlas/`, Menüpunkt): Texte `src/content/oysters.mjs`, Strichzeichnungen `src/lib/oyster-art.mjs` (eigenes Sprite, nur auf der Atlas-Seite), Vorlage `src/pages/atlas.mjs`
- Strichzeichnungen der Orte: `src/lib/venue-art.mjs` (`venueArt(key)`), Live-Licht `initVenueLights()` in `main.js` (liest Öffnungszeiten und Pausen aus `data-hours`/`data-closures`)
- Farben, Typo-Skala (Goldener Schnitt, `clamp()`), Breakpoints: `src/content/tokens.mjs`
- Templates: `src/pages/*.mjs`, Bausteine: `src/lib/components.mjs`, Layout/JSON-LD: `src/lib/layout.mjs`
- CSS: `src/styles/01–05`, Skript: `src/scripts/main.js` (nur progressive Verbesserung)

## Konventionen

- Templates nutzen das Tagged Template `html` aus `src/lib/html.mjs`; Werte werden escaped. Mini-Markup in Texten über `rich()`: `_kursiv_`, `**fett**`, `{fr|…}`, `[Link](/pfad/)`.
- Französische Typografie (schmales geschütztes Leerzeichen vor `: ; ! ? »`) erledigt `typo()`.
- Wochenplan (`weekPlan()` in `components.mjs`, Live-Teil `initPlan()` in `main.js`): Balkenlage per CSS aus `--from`/`--to` und der Skala `--axis-from`/`--axis-span`; die Skala ergibt sich aus `SCHEDULE`.

## Prüfen vor dem Commit

```bash
npm run dev   # baut und startet http://localhost:4321
```

Startseite, eine Ortsseite und die Karte in DE/FR/EN bei 390 px und 1440 px ansehen; keine Konsolenfehler, kein horizontales Scrollen.
