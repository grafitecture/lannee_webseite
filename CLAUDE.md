# L’ANNÉE – Hinweise für Claude Code

Website L’ANNÉE × Austern & Bubbles (Mannheim) mit Garage, Kiosque, Marché. Live unter **https://www.lannee.de/** (Vercel-Projekt `lannee_webseite`, Team grafitecture; jeder Push auf `main` geht direkt live). Sprache im Team: Deutsch.

## Stand (Umstellung 15.11.2026 – ersetzt alle älteren Vorgaben)

Eric hat am 14./15.11.2026 ein Übergabepaket geschickt (`LANNEE_Grafitecture_Uebergabe_2026-11-14`, liegt auf Martins Mac im Ordner CLAUDE_LANNEE). Gestalterische Referenz: `lannee-auster-bubbles.mapleabode.chatgpt.site` (Sites-Version 79). **Der Code in `dist/` ist diese Referenz** – nichts neu erfinden, nur gezielt anpassen.

- **Statische Seite ohne Build:** alles liegt fertig in `dist/` (`index.html`, `style.css`, `shots.css`, `anpassungen.css`, `advent.css`, `app.js`, `advent.js`, `opening-hours.js`, `assets/`). `vercel.json`: Framework Other, Build und Install leer, Ausgabeordner `dist`.
- **Startseite:** 53 Hintergrundbilder (`assets/backgrounds/`), zufällige Reihenfolge ohne Wiederholung pro Runde; der Browser merkt sich Start- und letztes Bild (localStorage `lannee.background.first/last`) und vermeidet beide beim nächsten Besuch. Bildausschnitt und Kamerafahrt je Bild in `shots.css` (stand in der Vorlage als style-Attribut).
- **Logo** `assets/lannee-wood.png`, darunter „×“ und Partnerlogo `assets/austern-bubbles-original-weiss.svg`.
- **Standorte** (Texte exakt so, auch in den Hash-Dialogen `#garage` usw. in `app.js`):
  - GARAGE · Beilstraße 6 · Freitag & Samstag ab 16 Uhr · (Wir öffnen Austern ab dem 08.01.2027)
  - KIOSQUE · Lindenhofplatz 1 · Sonn- & Feiertags ab 12 Uhr · (ab Frühjahr 2027)
  - MARCHÉ · Meeräckerplatz · Samstags ab 10 Uhr
- **Standort-Felder** (Martin, 15.11.2026): jeder Standort auf einem dunkelgrünen Feld mit runden Ecken, Woodland #244b3b mit 20 % Transparenz (Deckkraft 80 %), größere Schrift (Desktop Name 30 px / Text 15,5 px, Handy 26 / 13,5 px). Die Architektur-Icons sind größer und sitzen mit ihrer Mitte auf der Oberkante des Feldes (ragen zur Hälfte hinaus). Alles in `anpassungen.css` (wird nach `style.css` geladen; Variable `--location-field`).
- **Öffnungsanzeige** (`opening-hours.js`): Garage Fr/Sa ab 16 Uhr, Marché Sa ab 10 Uhr, Kiosque leuchtet erst, wenn `KIOSQUE_OPENS` ein Datum hat.
- **Advent-Pop-up:** fünf CSS-Kugeln mit Glanz/Funkeln, Beschriftung „ADVENT / POP UP“; Klick → Kugeln fliegen auseinander → Dialog nur mit dem Film `assets/advent-clean-2026.mp4` (Poster `advent-clean-2026-poster.jpg`, 18 s). **Startet bei jedem Öffnen von vorn mit Ton** (Martin, 15.11.2026 – ersetzt Erics „startet stumm“): `play()` läuft direkt in der Klick-Geste, sonst blockiert Safari auf dem iPhone den Ton; lässt ein Browser trotzdem keinen Ton zu, läuft der Film stumm weiter. Ton/Pause/erneut abspielen, kein Loop, Escape/Schließen; bei reduzierter Bewegung kein Kugelflug, Film startet trotzdem. Unsichtbarer Link auf https://www.instagram.com/austernbubbles/ ab Sekunde 14 über dem Instagram-Logo im Film, beim erneuten Abspielen wieder verborgen.
- **Markenlaufleiste** (Martin, 15.11.2026): immer genau fünf Logos sichtbar, jedes in einem Fach von 1/5 der Leistenbreite (`cqw`), Größe nach eigenem Seitenverhältnis (`--ratio` je Logo = viewBox) – in `anpassungen.css`. Am Handy läuft die Leiste über die volle Breite, Instagram und Pause stehen in der Zeile von Impressum/Datenschutz.
- **Fußzeile:** Instagram https://www.instagram.com/lannee1898/, Laufleiste mit weißen Markenlogos, Pause-Schaltfläche, darunter Impressum und Datenschutz (Hash-Dialoge `#impressum`, `#datenschutz`), darunter die kleine grafitecture-Wortmarke.
- Keine Speisekarte und kein Wein auf der Startseite (die Karte steckt nur im Hash-Dialog der Vorlage).

## Grundregeln

- Keine npm-Abhängigkeiten, kein Build. Änderungen direkt in `dist/`. Bei geänderten CSS/JS-Dateien den `?v=`-Parameter in `index.html` hochzählen.
- Keine Cookies, kein Tracking, keine Instagram-Einbettung, keine externen Requests, keine Inline-Styles oder Inline-Skripte (CSP in `vercel.json` erlaubt nur `'self'`). Neue Bildausschnitte gehören nach `shots.css`, nicht ins HTML.
- Domain: kanonisch **https://www.lannee.de/** (Canonical, Open Graph, `robots.txt`, `sitemap.xml`). lannee.de leitet auf www um. Alle anderen Hosts bekommen `X-Robots-Tag: noindex`. 1898.ma ist nicht mit diesem Projekt verbunden – Domains/DNS nur auf ausdrücklichen Wunsch anfassen. E-Mail-DNS von lannee.de nicht verändern.
- „Grafitecture“ immer verlinken: `https://www.grafitecture.de/` (mit www), neues Fenster.
- **Grafitecture-Feld** (Kit `kit/grafitecture-credit/`, CSS als `dist/grafitecture-credit.css`) steht ganz unten in Impressum und Datenschutz (Ende der `<template>`-Blöcke in `index.html`). Änderungen am Feld nur im Kit, dann Schnipsel neu einsetzen.
- Rechtstexte aus der Vorlage; Hosting-Abschnitt im Datenschutz beschreibt **Vercel** (Vercel Inc., Covina, EU-U.S. Data Privacy Framework, Datenverarbeitungszusatz). Keine Auswahl nach Hostname mehr. Wechselt das Hosting, Abschnitt anpassen.
- Ungenutzte Medien aus dem Übergabepaket (alte Filme, JPG-Dubletten usw.) sind bewusst nicht im Repo.

## Sicherung

- Stand vor der Umstellung: Branch `archiv/stand-2026-11-12` (Commit 4b4683f, alte Build-Pipeline mit `src/`), Vercel-Deployment `dpl_6r2mDnVYeBVm67QaUsSEf1NZKnkW` (Rollback im Vercel-Dashboard möglich), ZIP des gebauten Stands auf Martins Mac unter CLAUDE_LANNEE/Sicherung.

## Prüfen vor dem Commit

```bash
npm run dev   # http://localhost:4321 – mit den Headern aus vercel.json (CSP)
```

Startseite bei 320, 390 und 1440 px, Pop-up mit Film, Impressum, Datenschutz; keine Konsolenfehler, keine CSP-Verstöße, kein seitliches Scrollen, keine überlagerten Texte.
