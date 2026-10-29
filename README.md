# L’ANNÉE – Website

Website der Dachmarke **L’ANNÉE** (Huîtres & Bulles, Mannheim) mit den drei Orten **Garage**, **Kiosque** und **Marché**. Dreisprachig (Deutsch, Französisch, Englisch), statisch, schnell, ohne Cookies und ohne Tracking.

- Konzept und Markensystem: [`docs/KONZEPT.md`](docs/KONZEPT.md)
- Lebender Styleguide (nicht indexiert): `/styleguide/`

## Schnellstart

```bash
npm run build      # baut die Website nach /dist (keine Abhängigkeiten nötig)
npm run dev        # baut und startet die Vorschau auf http://localhost:4321
```

Voraussetzung: Node.js ab Version 20. Der Build hat **keine npm-Abhängigkeiten**, er läuft auch auf Vercel ohne Installation.

## Inhalte pflegen

| Was | Wo |
| --- | --- |
| Öffnungszeiten, Adressen, E-Mails | `src/content/site.mjs` → `LOCATIONS`, `SCHEDULE` |
| Schließtage / Ausnahmen | `src/content/site.mjs` → `CLOSURES` |
| Zusätzliche Marché-Termine | `src/content/site.mjs` → `MARCHE_DATES` |
| Speisekarte (alle Sprachen) | `src/content/menu.mjs` |
| Texte der Seiten | `src/content/i18n/de.mjs`, `fr.mjs`, `en.mjs` |
| Jahreskalender | `src/content/year.mjs` |
| Austernatlas (nach der Fußzeile) | Texte: `src/content/oysters.mjs`, Zeichnungen: `src/lib/oyster-art.mjs` |
| Impressum & Datenschutz | `src/content/legal.mjs` (Daten aus `site.mjs`) |
| Bildtexte (alt) | `src/content/media.mjs` |
| Farben, Typo-Skala, Breakpoints | `src/content/tokens.mjs` |

Mini-Markup in den Texten: `_kursiv_`, `**fett**`, `{fr|Texte français}` (Sprachauszeichnung), `[Link](/pfad/)`.

Die **Wochenuhr** auf der Startseite liest `SCHEDULE` und zeigt live (Zeitzone Europe/Berlin), wo gerade geöffnet ist bzw. was als Nächstes kommt. Bei „ab … Uhr“ ist das Ende nur eine Annahme (`openEnd: true`).

**Pause eintragen** (Urlaub, private Feier): einen Eintrag in `CLOSURES` ergänzen, z. B.

```js
{ from: '2026-12-24', to: '2026-12-26', locations: ['garage', 'kiosque'],
  note: { de: 'Weihnachtspause', fr: 'Pause de Noël', en: 'Christmas break' } }
```

Dann erscheint auf der Startseite und den betroffenen Ortsseiten ein Hinweis, die Wochenuhr streicht die Termine und zeigt den nächsten geöffneten Ort. Vergangene Pausen und Marché-Termine blenden sich von selbst aus.

## Bilder

Originale liegen in `assets-src/`. Neue Varianten (AVIF + WebP, 480–2560 px) erzeugen:

```bash
npm install --no-save sharp
npm run images
```

Neues Bild: Datei in `assets-src/` legen, in `scripts/images.mjs` (`SOURCES`) und `src/content/media.mjs` (Alt-Text) eintragen.
Nur einzelne Bilder neu erzeugen: `npm run images -- name1 name2` (Namen wie in `SOURCES`).

Favicons und Open-Graph-Bilder: `npm install --no-save sharp playwright && npm run brand-assets`.

## Deployment: GitHub → Vercel

1. Repository auf GitHub anlegen und diesen Ordner pushen.
2. In Vercel: **Add New → Project → Import** des Repositorys. Framework „Other“; Build-Befehl und Ausgabeordner kommen aus `vercel.json`.
3. Domains im Vercel-Projekt hinzufügen: `1898.ma` (Hauptdomain), optional `garage.ma` und `kiosque.ma`. Diese leiten per `vercel.json` auf die jeweilige Seite weiter.
4. Jeder Push auf `main` geht live, jeder andere Branch bekommt eine Vorschau-URL.

Suchmaschinen: Nur `1898.ma` wird indexiert. Alle anderen Adressen (Vorschau-URLs, `*.vercel.app`) senden `X-Robots-Tag: noindex`, damit keine Doppelinhalte entstehen.

## Vor dem Livegang prüfen

- [ ] Impressum: Telefonnummer, ggf. USt-IdNr. und Registereintrag (eGbR) in `site.mjs` ergänzen
- [ ] Impressum und Datenschutz rechtlich prüfen lassen (Vorlage, keine Rechtsberatung)
- [ ] Karte: Gerichte und **Preise** sind Platzhalter
- [ ] Öffnungs-Enden („ab 18 Uhr“, „ab 10 Uhr“) für die Live-Anzeige bestätigen
- [ ] Adresse Kiosque (PDF: Lindenhofplatz 1) bestätigen
- [ ] Ort des Wochenmarkts Lindenhof für den Kartenlink bestätigen
- [ ] Bedeutung von „1898“ – könnte eine eigene Geschichte werden

## Technik

- Statischer Generator in `src/build.mjs` (Node, ohne Pakete), Templates in `src/pages/` und `src/lib/`
- CSS in `src/styles/` (Tokens werden aus `tokens.mjs` erzeugt), JS in `src/scripts/main.js`
- Schriften selbst gehostet: Fraunces (SIL OFL) und Instrument Sans (SIL OFL)
- Icons: generiert mit Higgsfield AI (Recraft V4.1), vektorisiert, als SVG-Sprite
- Sicherheits-Header, Caching und Weiterleitungen in `vercel.json`
- Keine Cookies, kein localStorage, keine externen Requests → kein Cookie-Banner nötig

Konzept, Gestaltung und Umsetzung: [Grafitecture](https://www.grafitecture.de/).
