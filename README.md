# L’ANNÉE × Austern & Bubbles – Website

Statische Website für **https://www.lannee.de/** – Garage, Kiosque und Marché in Mannheim, mit Advent-Pop-up und Film.

- `dist/` – die fertige Website (wird so ausgeliefert, kein Build)
- `vercel.json` – Vercel-Einstellungen: Framework Other, kein Build, Ausgabeordner `dist`, Sicherheits-Header, Weiterleitungen alter Adressen
- `kit/grafitecture-credit/` – Grafitecture-Feld für Impressum und Datenschutz
- `scripts/serve.mjs` – lokale Vorschau mit denselben Headern wie auf Vercel

## Lokal ansehen

```bash
npm run dev   # → http://localhost:4321
```

## Veröffentlichen

Push auf `main` → Vercel stellt automatisch auf www.lannee.de bereit.

## Inhalte ändern

| Was | Wo |
| --- | --- |
| Standorte, Zeiten (Startseite) | `dist/index.html`, Abschnitt `.locations` |
| Standort-Dialoge (`#garage` …) | `dist/app.js`, Objekt `locations` |
| Öffnungsanzeige | `dist/opening-hours.js` (Kiosque: `KIOSQUE_OPENS`) |
| Hintergrundbilder | `dist/index.html` (`.shot`), Ausschnitt in `dist/shots.css` |
| Advent-Film | `dist/assets/advent-clean-2026.mp4`, Poster `…-poster.jpg` |
| Advent-Pop-up unter Garage + Karte (PDF) | `dist/index.html` (`.location-popup`), PDF `dist/assets/lannee-popup-advent-2026-karte.pdf` (bei neuer Karte `?v=` im Link hochzählen); fällt die Ankündigung weg, `--k`/`--k2` in `anpassungen.css` wieder um 3,05 senken |
| Speisekarte (Garage-Symbol öffnet sie) | `dist/karte/index.html` (Text), `dist/karte/karte.css`, Druckfassung `dist/assets/austern-bubbles-lannee-karte-advent-2026.pdf` (`?v=` hochzählen) |
| Impressum, Datenschutz | `dist/index.html`, `<template id="text-impressum">` / `text-datenschutz` |

Der vorherige Stand (12.11.2026, mit Build-Pipeline) liegt im Branch `archiv/stand-2026-11-12`.
