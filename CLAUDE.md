# L’ANNÉE – Hinweise für Claude Code

Website L’ANNÉE × Austern & Bubbles (Mannheim) mit Garage, Kiosque, Marché. Live unter **https://www.lannee.de/** (Vercel-Projekt `lannee_webseite`, Team grafitecture; jeder Push auf `main` geht direkt live). Sprache im Team: Deutsch.

## Stand (Umstellung 15.11.2026 – ersetzt alle älteren Vorgaben)

Eric hat am 14./15.11.2026 ein Übergabepaket geschickt (`LANNEE_Grafitecture_Uebergabe_2026-11-14`, liegt auf Martins Mac im Ordner CLAUDE_LANNEE). Gestalterische Referenz: `lannee-auster-bubbles.mapleabode.chatgpt.site` (Sites-Version 79). **Der Code in `dist/` ist diese Referenz** – nichts neu erfinden, nur gezielt anpassen.

- **Statische Seite ohne Build:** alles liegt fertig in `dist/` (`index.html`, `style.css`, `shots.css`, `anpassungen.css`, `advent.css`, `app.js`, `advent.js`, `opening-hours.js`, `assets/`). `vercel.json`: Framework Other, Build und Install leer, Ausgabeordner `dist`.
- **Startseite:** 53 Hintergrundbilder (`assets/backgrounds/`), zufällige Reihenfolge ohne Wiederholung pro Runde; der Browser merkt sich Start- und letztes Bild (localStorage `lannee.background.first/last`) und vermeidet beide beim nächsten Besuch. Bildausschnitt und Kamerafahrt je Bild in `shots.css` (stand in der Vorlage als style-Attribut).
- **Logo** `assets/lannee-wood.png`, darunter „×“ und Partnerlogo `assets/austern-bubbles-original-weiss.svg`.
- **Standorte** (Martin, 17.11.2026 – jede Angabe eine eigene Zeile, Texte exakt so; in den Hash-Dialogen `#garage` usw. in `app.js` Adresse „Straße · Ortsteil · Mannheim“):
  - GARAGE / Beilstraße 6 / Jungbusch / Freitag & Samstag, ab 16 Uhr / (Wir öffnen Austern ab dem 08.01.2027)
  - KIOSQUE / Lindenhofplatz 1 / Lindenhof / Sonn- & Feiertags, ab 12 Uhr / (ab Frühjahr 2027)
  - MARCHÉ / Meeräckerplatz / Lindenhof / Samstags, ab 10 Uhr
  - Zusätze in Klammern (Martin, 17.11.2026) als `span.location-note`: eine Stufe der Skala kleiner als die Öffnungszeiten (small, in den kompakten Stufen xs) und normaler statt halbfetter Schnitt; in den Standortdialogen über das Feld `note` in `app.js`, ebenfalls small.
- **Standorte als weiße Typo-Blöcke** (Martin, 15.11.2026 abends – ersetzt die grünen Felder vom Nachmittag): keine Hintergrundflächen, die Fotos bleiben frei. Gebäude-Icon sitzt direkt auf dem Hauptwort (kompakte Einheit), Hauptwort Arial Black, eng (Laufweite −0,06 em, Zeilenhöhe 0,86), Größe Stufe h3 (31 → 39 px), Icon wächst in em mit; Öffnungszeiten dicht darunter (Zeilenhöhe 1,17, p = 16 px, halbfett). Niedrige Fenster eine Stufe tiefer. Nur ein feiner Schatten als Sicherheit. Alles in `anpassungen.css`.
- **Typografie: Major Third 1,250 mit clamp()** (Martin, 15.11.2026): Variablen am Anfang von `anpassungen.css` – `--fs-h1` 3,815rem · `--fs-h2` 3,052rem · `--fs-h3` 2,441rem · `--fs-h4` 1,953rem · `--fs-h5` 1,563rem · `--fs-h6` 1,25rem (jeweils ab 1440 px Fensterbreite; bei 320 px eine Stufe tiefer, dazwischen fließend) · `--fs-p` 1rem · `--fs-small` 0,8rem · `--fs-xs` 0,64rem (fest). Zuordnung: Standort-Hauptwort h3, Öffnungszeiten p (unter 360 px small), Links Impressum/Datenschutz in der Fußzeile small, Dialogtitel h3, Zwischenüberschriften Rechtstexte h6, Rechtstexte p, Kartenrubriken h5, Kartenzeilen p, Zusätze small, Dialog-Navigation xs. Niedrige Fenster gehen tiefer: Desktop ≤ 920 px Höhe nur dichter (Abstand 18 px, Zeilenhöhe 1,12), Desktop ≤ 820 px Hauptwort h5 (Abstand 14 px, Zeilenhöhe 1,1), ≤ 650 px und ≤ 500 px Höhe wie bisher. **Neue Schriftgrößen nur über diese Variablen oder einen festen Wert der Skala**, keine freien px-Werte. Ausnahme: Beschriftung der Advent-Kugeln (Teil der Grafik) und Kit-Feld Grafitecture.
- **Öffnungsanzeige** (`opening-hours.js`): Garage Fr/Sa ab 16 Uhr, Marché Sa ab 10 Uhr, Kiosque leuchtet erst, wenn `KIOSQUE_OPENS` ein Datum hat.
- **Advent-Pop-up:** fünf CSS-Kugeln mit Glanz/Funkeln, Beschriftung „ADVENT / POP UP“; Klick → Kugeln fliegen auseinander → Dialog nur mit dem Film `assets/advent-clean-2026.mp4` (Poster `advent-clean-2026-poster.jpg`, 18 s). **Startet bei jedem Öffnen von vorn mit Ton** (Martin, 15.11.2026 – ersetzt Erics „startet stumm“): `play()` läuft direkt in der Klick-Geste, sonst blockiert Safari auf dem iPhone den Ton; lässt ein Browser trotzdem keinen Ton zu, läuft der Film stumm weiter. Ton/Pause/erneut abspielen, kein Loop, Escape/Schließen; bei reduzierter Bewegung kein Kugelflug, Film startet trotzdem. Unsichtbarer Link auf https://www.instagram.com/austernbubbles/ ab Sekunde 14 über dem Instagram-Logo im Film, beim erneuten Abspielen wieder verborgen.
- **Markenlaufleiste** (Martin, 15.11.2026): immer genau sieben Logos sichtbar (`--marks-visible: 7`), jedes in einem Fach von 1/7 der Leistenbreite (`cqw`), Logos Desktop bis 31 px hoch, Handy bis 25 px, Größe nach eigenem Seitenverhältnis (`--ratio` je Logo = viewBox) – in `anpassungen.css`. Am Handy läuft die Leiste über die volle Breite, Instagram und Pause stehen in der Zeile von Impressum/Datenschutz.
- **Fußzeile:** Instagram https://www.instagram.com/lannee1898/, Laufleiste mit weißen Markenlogos, Pause-Schaltfläche, darunter Impressum und Datenschutz (Hash-Dialoge `#impressum`, `#datenschutz`). **Keine grafitecture-Wortmarke unten auf der Startseite** (Martin, 15.11.2026) – Grafitecture steht nur im Feld ganz unten in Impressum und Datenschutz.
- Keine Speisekarte und kein Wein auf der Startseite (die Karte steckt nur im Hash-Dialog der Vorlage).

## Grundregeln

- Keine npm-Abhängigkeiten, kein Build. Änderungen direkt in `dist/`. Bei geänderten CSS/JS-Dateien den `?v=`-Parameter in `index.html` hochzählen.
- Keine Cookies, kein Tracking, keine Instagram-Einbettung, keine externen Requests, keine Inline-Styles oder Inline-Skripte (CSP in `vercel.json` erlaubt nur `'self'`). Neue Bildausschnitte gehören nach `shots.css`, nicht ins HTML.
- Domain: kanonisch **https://www.lannee.de/** (Canonical, Open Graph, `robots.txt`, `sitemap.xml`). lannee.de leitet auf www um. Alle anderen Hosts bekommen `X-Robots-Tag: noindex`. 1898.ma ist nicht mit diesem Projekt verbunden – Domains/DNS nur auf ausdrücklichen Wunsch anfassen. E-Mail-DNS von lannee.de nicht verändern.
- „Grafitecture“ immer verlinken: `https://www.grafitecture.de/` (mit www), neues Fenster.
- **Grafitecture-Feld** (Kit `kit/grafitecture-credit/`, CSS als `dist/grafitecture-credit.css`) steht ganz unten in Impressum und Datenschutz (Ende der `<template>`-Blöcke in `index.html`). Änderungen am Feld nur im Kit, dann Schnipsel neu einsetzen.
- Rechtstexte auf den Betrieb über **Vercel** ausgelegt (15.11.2026): Impressum mit Block „Hosting“ (Vercel Inc., Covina) und Link zur Datenschutzerklärung; Datenschutz mit „Betrieb und Auslieferung über Vercel“ (Verbindungsdaten, Art. 6 Abs. 1 f, Auftragsverarbeitung Art. 28, Protokolle spätestens nach 30 Tagen gelöscht, keine Log Drains, kein Web Analytics/Speed Insights, USA: Data Privacy Framework + Standardvertragsklauseln, TLS) und „Keine Cookies, kein Tracking“ (Local Storage für Hintergrundbilder, Film lädt erst beim Klick). Keine Auswahl nach Hostname. Wird in Vercel etwas aktiviert (Analytics, Log Drains, Observability Plus mit längerer Aufbewahrung), Text anpassen.
- Ungenutzte Medien aus dem Übergabepaket (alte Filme, JPG-Dubletten usw.) sind bewusst nicht im Repo.

## Sicherung

- Stand vor der Umstellung: Branch `archiv/stand-2026-11-12` (Commit 4b4683f, alte Build-Pipeline mit `src/`), Vercel-Deployment `dpl_6r2mDnVYeBVm67QaUsSEf1NZKnkW` (Rollback im Vercel-Dashboard möglich), ZIP des gebauten Stands auf Martins Mac unter CLAUDE_LANNEE/Sicherung.

## Prüfen vor dem Commit

```bash
npm run dev   # http://localhost:4321 – mit den Headern aus vercel.json (CSP)
```

Startseite bei 320, 390 und 1440 px, Pop-up mit Film, Impressum, Datenschutz; keine Konsolenfehler, keine CSP-Verstöße, kein seitliches Scrollen, keine überlagerten Texte.
