# L’ANNÉE – Hinweise für Claude Code

Website der Dachmarke L’ANNÉE (Austern & Bulles, Mannheim) mit Garage, Kiosque, Marché. Sprache im Team: Deutsch.

## Grundregeln

- **Keine npm-Abhängigkeiten im Build.** `node src/build.mjs` läuft auf Vercel ohne `npm install`. Nichts hinzufügen, was das ändert.
- Bilder (`public/images`), Favicons und OG-Bilder sind **eingecheckt**, weil sharp/Playwright auf Vercel nicht laufen. Neu erzeugen nur lokal (`npm run images`, `npm run brand-assets`).
- Die Live-Domain `1898.ma` nicht anfassen (Domains, DNS, Weiterleitungen), außer der Nutzer verlangt es ausdrücklich.
- Inhalte immer in allen drei Sprachen pflegen: `src/content/i18n/{de,fr,en}.mjs`. Deutsch ist führend.
- Keine Cookies, kein Tracking, keine externen Requests (CSP in `vercel.json`). Karten nur als Links.
- **Nur Grün:** Evergreen #132A13, Hunter Green #31572C, Fern #4F772D, Palm Leaf #90A955, Lime Cream #ECF39E und Weiß. Entweder grüne Fläche mit weißer Schrift oder weiße Fläche mit grüner Schrift; nichts Schwarzes, nichts Graues (statt Schwarz: Evergreen). In CSS nur die Variablen aus `tokens.mjs` (`--ink`, `--garage`, `--kiosque`, `--marche`, `--brand`, `--muted`, `--palm`, `--lime`, `--blanc`), keine festen Farbwerte.
- **Slogan:** „Austern & Bulles“ (`SITE.tagline`), in allen Sprachen gleich. „Bulles“ nie mit „Bläschen“ übersetzen.
- „Grafitecture“ immer verlinken: `https://www.grafitecture.de/` (mit www), öffnet in neuem Fenster. Im Mini-Markup `[Grafitecture](https://www.grafitecture.de/)`, sonst `SITE.agency`.
- **Grafitecture-Feld** (Lime-Fläche mit Logo, „Marken mit KI.“, Link auf grafitecture.de): steht immer ganz unten in Impressum und Datenschutz (DE/FR/EN), eingebunden in `src/pages/legal.mjs`. Quelle ist das Kit `kit/grafitecture-credit/` (README dort), der Build hängt dessen CSS an `site.css` an. Die Farben des Feldes (#dafd55, #435960, Weiß) gehören der Agentur und sind die **einzige Ausnahme** von „nur Grün“ und „nur Token-Variablen“. Am Feld nichts an L’ANNÉE anpassen; Änderungen im Kit machen (gilt für alle Grafitecture-Websites).

## Wo was liegt

- Stammdaten, Öffnungszeiten, Pausen, Marché-Termine: `src/content/site.mjs` (dort auch `SITE.demoNotice` für den Störer)
- Grafitecture-Feld (Impressum, Datenschutz): `kit/grafitecture-credit/`
- Karte: `src/content/menu.mjs` · Jahreskalender: `src/content/year.mjs` · Rechtstexte: `src/content/legal.mjs`
- Austernatlas (eigene Seite `/austernatlas/`, Menüpunkt): Texte `src/content/oysters.mjs`, Strichzeichnungen `src/lib/oyster-art.mjs` (eigenes Sprite, nur auf der Atlas-Seite), Vorlage `src/pages/atlas.mjs`
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
