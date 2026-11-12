# L’ANNÉE – Website

Eine einzige Seite für **L’ANNÉE – Austern & Bubbles** in Mannheim mit den drei Orten **Le Garage**, **Le Kiosque** und **Au Marché**. Nur Deutsch, statisch, ohne Cookies und ohne Tracking. Vorlage war die Seite `lannee-auster-bubbles` (12.11.2026): Fotos im Hintergrund, Holz-Logo, „Austern & Bubbles“ in Handschrift, die drei Orte – darunter die Karte und der Wein des Moments.

## Seiten

| Adresse | Inhalt |
| --- | --- |
| `/` | Hero (Fotos überblenden langsam, Logo, drei Orte) · La Carte · Le vin du moment · Fußzeile |
| `/impressum/` | Impressum, ganz unten das Grafitecture-Feld |
| `/datenschutz/` | Datenschutz (Hosting: Vercel), ganz unten das Grafitecture-Feld |
| `404.html` | „Diese Seite gibt es nicht (mehr)“ |

Alte Adressen (Ortsseiten, Karte, Atlanten, Kontakt, `/fr/…`, `/en/…`) leiten dauerhaft auf `/` bzw. Impressum/Datenschutz weiter (`vercel.json`).

## Schnellstart

```bash
npm run build      # baut nach /dist (keine Abhängigkeiten nötig)
npm run dev        # baut und startet die Vorschau auf http://localhost:4321
```

Node.js ab Version 20. Der Build hat **keine npm-Abhängigkeiten**, Vercel führt nur `node src/build.mjs` aus.

## Inhalte pflegen – alles in `src/content/site.mjs`

| Was | Wo |
| --- | --- |
| Orte, Adressen, Tage & Uhrzeiten | `LOCATIONS` |
| Speisekarte (Plats, Boissons) | `MENU` |
| Wein des Moments (oder `show: false`) | `WINE` |
| Fotos im Hero und Bildausschnitt | `HERO_PHOTOS` (Namen aus `src/content/images.json`) |
| E-Mail, Instagram, Hinweis „fiktiv“ | `SITE` (`SITE.demoNotice`) |
| Impressum, Datenschutz | `IMPRESSUM`, `DATENSCHUTZ` |

Mini-Markup in den Rechtstexten: `**fett**`, `[Text](https://…)` (öffnet in neuem Fenster), `[mail@…](mailto:mail@…)`.

Gestaltung: `src/styles/site.css` (Farben oben als Variablen). Skript: `src/scripts/main.js` (nur die Überblendung im Hero und die Pause-Schaltfläche).

## Bilder

Die fertigen Varianten (AVIF + WebP) liegen in `public/images/`, die Originale in `assets-src/`. Der Build kopiert nur die Bilder, die die Seite wirklich zeigt. Neues Foto:

```bash
# Datei nach assets-src/, Eintrag in scripts/images.mjs (SOURCES), dann:
npm install --no-save sharp
npm run images -- name
# und den Namen in HERO_PHOTOS eintragen
```

Nur echte Fotos, keine generierten Bilder. Für den Hero eignen sich Fotos ab etwa 1200 px Breite.

Open-Graph-Bild (`public/og/lannee.jpg`) und Favicons sind eingecheckt.

## Grafitecture-Feld

Steht immer ganz unten in Impressum und Datenschutz und verlinkt auf https://www.grafitecture.de/ (neues Fenster). Quelle: `kit/grafitecture-credit/` (README dort). In der Fußzeile steht zusätzlich die kleine Wortmarke mit Link.

## Deployment: GitHub → Vercel

Jeder Push auf `main` baut automatisch (Vercel-Projekt `lannee_webseite`). Nur `1898.ma` wird indexiert, alle anderen Hosts senden `X-Robots-Tag: noindex`. Sicherheits-Header (CSP nur `'self'`, HSTS, kein Einbetten in fremde Seiten) stehen in `vercel.json`.

## Vor dem Livegang prüfen

- [ ] Hinweiszeile „fiktiv“ abschalten: `SITE.demoNotice = false`
- [ ] Impressum und Datenschutz rechtlich prüfen lassen (keine Rechtsberatung); ggf. Telefon, USt-IdNr., Registereintrag ergänzen
- [ ] Mit Vercel einen Vertrag zur Auftragsverarbeitung (DPA) sicherstellen
- [ ] Domain 1898.ma verbinden (erst nach Freigabe)
