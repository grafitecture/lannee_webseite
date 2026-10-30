# L’ANNÉE – Hinweise für Claude Code

Website der Dachmarke L’ANNÉE (Huîtres & Bulles, Mannheim) mit Garage, Kiosque, Marché. Sprache im Team: Deutsch.

## Grundregeln

- **Keine npm-Abhängigkeiten im Build.** `node src/build.mjs` läuft auf Vercel ohne `npm install`. Nichts hinzufügen, was das ändert.
- Bilder (`public/images`), Favicons und OG-Bilder sind **eingecheckt**, weil sharp/Playwright auf Vercel nicht laufen. Neu erzeugen nur lokal (`npm run images`, `npm run brand-assets`).
- Die Live-Domain `1898.ma` nicht anfassen (Domains, DNS, Weiterleitungen), außer der Nutzer verlangt es ausdrücklich.
- Inhalte immer in allen drei Sprachen pflegen: `src/content/i18n/{de,fr,en}.mjs`. Deutsch ist führend.
- Keine Cookies, kein Tracking, keine externen Requests (CSP in `vercel.json`). Karten nur als Links.
- „Grafitecture“ immer verlinken: `https://www.grafitecture.de/` (mit www), öffnet in neuem Fenster. Im Mini-Markup `[Grafitecture](https://www.grafitecture.de/)`, sonst `SITE.agency`.

## Wo was liegt

- Stammdaten, Öffnungszeiten, Pausen, Marché-Termine: `src/content/site.mjs` (dort auch `SITE.demoNotice` für den Störer)
- Karte: `src/content/menu.mjs` · Jahreskalender: `src/content/year.mjs` · Rechtstexte: `src/content/legal.mjs`
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
