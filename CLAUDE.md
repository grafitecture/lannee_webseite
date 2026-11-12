# L’ANNÉE – Hinweise für Claude Code

Website der Dachmarke L’ANNÉE („Austern & Bubbles“, Mannheim) mit Le Garage, Le Kiosque, Au Marché. Sprache im Team: Deutsch.

## Stand (Umbau 12.11.2026 – ersetzt alle älteren Vorgaben)

Martin: „alles muss viel einfacher werden“, Vorlage war die Seite `lannee-auster-bubbles.mapleabode.chatgpt.site`.

- **Eine Seite, nur Deutsch.** Keine Sprachen (kein FR/EN), keine Ortsseiten, keine Atlanten, kein Kontakt, kein Styleguide, kein Angebot des Wochenendes. Dazu Impressum, Datenschutz, 404.
- **Hero wie in der Vorlage:** Fotos im Hintergrund, die langsam überblenden (leichter Zoom, dunkler Schleier), oben das weiße Holz-Logo, darunter „Austern & Bubbles“ in Handschrift (Caveat-Teilmenge `public/fonts/caveat-lannee.woff`, enthält nur wenige Zeichen – für andere Texte nicht verwenden). In der Mitte die drei Orte: Name groß in Versalien (Le Garage, Le Kiosque, Au Marché), Adresse, Tage/Uhrzeit. Unten Instagram, Links „La Carte“ und „Le vin du moment“, Pause-Schaltfläche.
- **Darunter:** La Carte (Hausgrün), Le vin du moment (Linde), Fußzeile (E-Mail, Instagram, Impressum, Datenschutz, kleine Grafitecture-Wortmarke, Hinweis „fiktiv“ über `SITE.demoNotice`).
- **Farben aus der Vorlage** (Variablen oben in `src/styles/site.css`): Forest #245c43, Sage #536b59, Linde #bdcd98, Woodland #244b3b, Nacht #242a24, Papier #faf9f2, Tinte #24382c; Namen der Orte auf dem Foto: Garage #bacbb5, Kiosque #d8e8ac, Marché #8db79c. Die Grün-Skala 400–900 und die alten Regeln dazu gelten nicht mehr.
- **Schriften:** Fraunces (Überschriften), Instrument Sans (Text, Namen der Orte), Caveat (nur Slogan) – alle selbst gehostet.
- **Bilder:** nur echte Fotos (keine KI-Bilder). Die vorhandenen Fotos haben den Farblook aus `scripts/look.mjs`. Hero-Fotos in `HERO_PHOTOS`; der Build kopiert nur benutzte Bilder nach `dist/`. Bild-URLs tragen `?v=<Hash>`, weil `/images/` ein Jahr gecacht wird.
- **Logo** = weiße Holzbuchstaben, steht immer auf Dunkel (Foto mit Schleier oder Hausgrün).

## Grundregeln

- **Keine npm-Abhängigkeiten im Build.** `node src/build.mjs` läuft auf Vercel ohne `npm install`.
- Die Live-Domain `1898.ma` nicht anfassen (Domains, DNS), außer der Nutzer verlangt es ausdrücklich.
- Keine Cookies, kein Tracking, keine externen Requests, keine Inline-Styles oder Inline-Skripte (CSP in `vercel.json` erlaubt nur `'self'`).
- „Grafitecture“ immer verlinken: `https://www.grafitecture.de/` (mit www), neues Fenster.
- **Grafitecture-Feld** (Kit `kit/grafitecture-credit/`, kleine Größe) steht immer ganz unten in Impressum und Datenschutz. Änderungen am Feld nur im Kit. Seine Farben (#dafd55, #435960) sind die einzige Ausnahme von den Farben der Seite.
- Rechtstexte: übernommen aus der Vorlage (Stand 11.11.2026), Hosting-Abschnitt auf **Vercel** umgestellt (Vercel Inc., Covina, EU-U.S. Data Privacy Framework). Wechselt das Hosting, den Abschnitt in `DATENSCHUTZ` anpassen.

## Wo was liegt

- Alle Inhalte: `src/content/site.mjs` (`SITE`, `LOCATIONS`, `HERO_PHOTOS`, `MENU`, `WINE`, `IMPRESSUM`, `DATENSCHUTZ`)
- Seiten-Templates und Build: `src/build.mjs`
- CSS: `src/styles/site.css` · Skript: `src/scripts/main.js`
- Bild-Manifest: `src/content/images.json` (von `scripts/images.mjs` erzeugt)
- Weiterleitungen alter Adressen, Header: `vercel.json`

## Prüfen vor dem Commit

```bash
npm run dev   # baut und startet http://localhost:4321
```

Start, Impressum, Datenschutz bei 320, 390 und 1440 px ansehen; keine Konsolenfehler, kein seitliches Scrollen.
