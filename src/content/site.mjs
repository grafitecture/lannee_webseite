/**
 * L’ANNÉE – alle Inhalte der Website an einer Stelle (nur Deutsch).
 * ------------------------------------------------------------------
 * Orte & Zeiten      → LOCATIONS
 * Speisekarte        → MENU
 * Wein des Moments   → WINE
 * Fotos im Hero      → HERO_PHOTOS (Namen aus src/content/images.json)
 * Impressum          → IMPRESSUM
 * Datenschutz        → DATENSCHUTZ
 *
 * Mini-Markup in allen Texten: **fett**, [Linktext](https://…) (externe Links öffnen in neuem Fenster),
 * [mail@adresse.de](mailto:mail@adresse.de).
 */

export const SITE = {
  name: 'L’ANNÉE',
  tagline: 'Austern & Bubbles',
  /** Produktions-URL (Canonical, Sitemap, Open Graph). Nur dieser Host wird indexiert (vercel.json). */
  url: 'https://1898.ma',
  description: 'L’ANNÉE – Austern & Bubbles. Garage, Kiosque und Marché in Mannheim.',
  email: 'bonsoir@lannee.de',
  instagram: { handle: '@lannee1898', url: 'https://www.instagram.com/lannee1898/' },
  agency: { name: 'Grafitecture', url: 'https://www.grafitecture.de/' }, // immer mit www, neues Fenster
  /** Hinweiszeile ganz unten. Für den echten Livegang auf false setzen. */
  demoNotice: true,
};

/** Die drei Orte (Reihenfolge = Anzeige). Farbe des Namens: --garage, --kiosque, --marche in site.css. */
export const LOCATIONS = [
  {
    key: 'garage',
    name: 'Le Garage',
    address: 'Beilstraße 6',
    hours: ['Freitag & Samstag 18 Uhr'],
  },
  {
    key: 'kiosque',
    name: 'Le Kiosque',
    address: 'Lindenhofplatz 1',
    hours: ['Sonn- & Feiertags 12 Uhr', '(ab Frühjahr 2027)'],
  },
  {
    key: 'marche',
    name: 'Au Marché',
    address: 'Meeräckerplatz',
    hours: ['Samstags 10 Uhr'],
  },
];

/** Fotos, die im Hero langsam überblenden (das erste lädt sofort, die anderen erst bei Bedarf). */
export const HERO_PHOTOS = [
  { name: 'garage-glaeser', focus: '50% 30%' },
  { name: 'garage-hof', focus: '55% 60%' },
  { name: 'huitres-glace', focus: '50% 50%' },
  { name: 'garage-tresen', focus: '50% 55%' },
  { name: 'marche-wagen', focus: '50% 60%' },
  { name: 'garage-sammlung', focus: '50% 45%' },
  { name: 'schweppes', focus: '50% 40%' },
  { name: 'garage-eingang', focus: '50% 55%' },
];

/** Speisekarte – gilt für alle drei Orte. */
export const MENU = {
  plats: [
    {
      title: 'Les Huîtres',
      items: [{ name: 'Fines de Claires No. 3', note: '3, 6, 9 oder 12 Stück', price: '3 € / Stück' }],
    },
    {
      title: 'Plats',
      items: [
        { name: 'Crevettes „Label Rouge“', note: '½ kg · Cocktail & Citron', price: '39 €' },
        { name: 'Crevettes „Label Rouge“', note: '1 kg · zum Teilen', price: '69 €' },
        { name: 'Plateau de fruits de mer', note: '6 Austern No. 3 · ¼ kg Label Rouge · Sashimi', price: '49 €' },
        { name: 'Sardinen', note: 'Albert Mènés · Tin-Can-Dish', price: '14 €' },
      ],
    },
    {
      title: 'Tarte L’Année',
      items: [
        { name: 'Classique', note: 'Jambon, Bacon, Oignons & Persil', price: '10 €' },
        { name: 'Provençal · vegetarisch', note: 'Tomate, Courgette, Champignon & Estragon', price: '9 €' },
      ],
      note: 'Zu allen Speisen servieren wir Pain grillé & Beurre Paysan Breton Guérande.',
    },
  ],
  boissons: [
    {
      title: 'Boissons · Soft',
      items: [
        { name: 'Perrier', note: '0,20 l', price: '3 €' },
        { name: 'Coca-Cola', note: '0,20 l', price: '4 €' },
        { name: 'Coca-Cola light', note: '0,20 l', price: '4 €' },
        { name: 'Orangina · La Pulpeuse', note: '0,25 l', price: '4 €' },
      ],
    },
    {
      title: 'Bière',
      items: [{ name: 'Pelforth „blonde“', note: 'Flasche · 0,25 l', price: '4 €' }],
    },
    {
      title: 'Vins Maison',
      items: [
        { name: 'Blanc · Château du Cèdre Blandine', note: 'Glas 0,20 l / Flasche 0,75 l', price: '7 € / 19 €' },
        { name: 'Rouge · Château du Cèdre Marcel Malbec', note: 'Glas 0,20 l / Flasche 0,75 l', price: '7 € / 19 €' },
        { name: 'Rosé · L’Alycastre Porquerolles', note: 'Côte de Provence · Flasche 0,75 l', price: '29 €' },
      ],
    },
    {
      title: 'Les Bulles',
      items: [
        { name: 'Crémant · Brut Excellence Bouvet Ladubay', note: 'Flasche · 0,75 l', price: '29 €' },
        { name: 'Champagne · Jacquesson 747', note: 'Flasche · 0,75 l', price: '149 €' },
      ],
    },
    {
      title: 'Mixed',
      items: [
        { name: 'Citadelle & Schweppes', note: 'Gin & Tonic', price: '8 €' },
        { name: 'Lillet & Schweppes', note: 'Fraises fraîches & Wild Berry', price: '9 €' },
      ],
    },
  ],
};

/** Wein des Moments – bei Bedarf austauschen (oder `show: false`). */
export const WINE = {
  show: true,
  kicker: 'Le vin du moment',
  title: 'Spätburgunder Hassel 2024',
  producer: 'Laurin Laier',
  origin: 'Rauenberg · Kraichgau',
  text: ['Ein Winzer aus der Nachbarschaft.', 'Ein Wein, den wir euch vorstellen möchten.'],
};

/* ------------------------------------------------------------------ */
/* Rechtstexte (übernommen aus der Vorlage vom 11.11.2026, Hosting auf  */
/* Vercel umgestellt). Keine Rechtsberatung – vor dem Livegang prüfen.  */
/* ------------------------------------------------------------------ */

const COMPANY = {
  name: 'L’ANNÉE GbR',
  partners: 'David Werner und Eric Schweppe',
  street: 'Rennershofstraße 7',
  city: '68163 Mannheim',
};

/** Blöcke: { h: Überschrift, p: [Absätze], lines: [Zeilen mit Umbruch] } */
export const IMPRESSUM = {
  title: 'Impressum',
  blocks: [
    { h: 'Angaben gemäß § 5 DDG', lines: [COMPANY.name, COMPANY.street, COMPANY.city] },
    { h: 'Vertreten durch', p: [`Die Gesellschafter ${COMPANY.partners}.`] },
    { h: 'Kontakt', lines: ['E-Mail: [bonjour@lannee.de](mailto:bonjour@lannee.de)'] },
    { h: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV', lines: [COMPANY.partners, COMPANY.street, COMPANY.city] },
    {
      h: 'Verbraucherstreitbeilegung',
      p: ['Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'],
    },
    {
      h: 'Haftung für Inhalte',
      p: [
        'Wir erstellen die Inhalte dieser Website mit großer Sorgfalt. Für die Richtigkeit, Vollständigkeit und Aktualität, insbesondere von Preisen, Öffnungszeiten und Terminen, können wir dennoch keine Gewähr übernehmen. Maßgeblich sind die Angaben vor Ort.',
      ],
    },
    {
      h: 'Haftung für Links',
      p: [
        'Diese Website enthält Links zu externen Websites Dritter, etwa zu Instagram. Auf deren Inhalte haben wir keinen Einfluss, verantwortlich ist stets der jeweilige Anbieter. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden uns Rechtsverletzungen bekannt, entfernen wir die betreffenden Links umgehend.',
      ],
    },
    {
      h: 'Urheberrecht',
      p: [
        'Texte, Fotos, Logos und die Gestaltung dieser Website sind urheberrechtlich geschützt. Jede Verwendung außerhalb der Grenzen des Urheberrechts bedarf unserer vorherigen schriftlichen Zustimmung.',
      ],
    },
    {
      h: 'Bildnachweise und Schriften',
      p: ['Fotos: L’ANNÉE. Schriften: Fraunces, Instrument Sans und Caveat (SIL Open Font License), lokal eingebunden.'],
    },
  ],
};

export const DATENSCHUTZ = {
  title: 'Datenschutz',
  updated: '12. November 2026',
  blocks: [
    {
      h: 'Wer für deine Daten verantwortlich ist',
      p: [
        'Die L’ANNÉE GbR betreibt diese Website. Wenn du wissen möchtest, welche Daten wir von dir haben, oder eines deiner Rechte ausüben willst, erreichst du uns hier.',
      ],
      lines: [COMPANY.name, COMPANY.street, COMPANY.city, '[bonsoir@lannee.de](mailto:bonsoir@lannee.de)'],
    },
    {
      h: 'Was beim Besuch der Website passiert',
      p: [
        'Wenn du unsere Speisekarte, Öffnungszeiten oder Fotos ansiehst, ruft dein Browser die entsprechenden Dateien beim Hostinganbieter ab. Dafür benötigt er deine IP-Adresse. Mit der Anfrage können auch der Zeitpunkt, die angeforderte Datei, Angaben zu Browser und Gerät sowie die Adresse der zuvor besuchten Seite übermittelt werden.',
        'Wir verarbeiten diese technischen Daten, damit die Seite erreichbar bleibt und Störungen oder Angriffe erkannt werden können. Das ist unser berechtigtes Interesse nach Art. 6 Abs. 1 Buchst. f DSGVO. Die Verbindung ist per TLS verschlüsselt (https).',
        'Unser Hostinganbieter ist die **Vercel Inc.**, 440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel liefert die Website über ein weltweites Servernetz aus und verarbeitet die Verbindungsdaten dabei in unserem Auftrag (Art. 28 DSGVO). Server-Protokolle bewahrt Vercel nur so lange auf, wie sie für Betrieb, Sicherheit und die Aufklärung von Störungen oder Missbrauch nötig sind.',
        'Dabei können Daten auch in den USA verarbeitet werden. Vercel ist nach dem EU-U.S. Data Privacy Framework zertifiziert; für zertifizierte Unternehmen gilt der Angemessenheitsbeschluss der EU-Kommission vom 10. Juli 2023 (Art. 45 DSGVO). Mehr dazu in der [Datenschutzerklärung von Vercel](https://vercel.com/legal/privacy-policy).',
      ],
    },
    {
      h: 'Fotos, Schriften, Cookies und externe Links',
      p: [
        'Fotos, das Logo und die Schriften lädt dein Browser direkt von unserer Website. Inhalte anderer Anbieter binden wir nicht ein.',
        'Wir setzen keine Cookies ein, speichern nichts auf deinem Gerät und erstellen keine Besucherprofile. Analyse- oder Werbedienste nutzen wir nicht.',
        'Instagram und das Gestaltungsbüro Grafitecture sind über einfache Links erreichbar. Erst wenn du einen externen Link öffnest, verbindet sich dein Browser mit der jeweiligen Website. Dort gelten die Datenschutzhinweise des jeweiligen Anbieters.',
      ],
    },
    {
      h: 'Wenn du uns eine E-Mail schreibst',
      p: [
        'Der Kontaktlink öffnet dein E-Mail-Programm. Erst wenn du die Nachricht abschickst, erhalten wir deine E-Mail-Adresse, deine Nachricht und die Angaben oder Anhänge, die du mitschickst. Unser E-Mail-Dienstleister verarbeitet diese Daten für den Empfang, die Speicherung und den Versand. Du entscheidest, was du uns mitteilst. Für eine Antwort per E-Mail brauchen wir eine erreichbare Absenderadresse.',
        'Geht es um einen Vertrag mit dir oder dessen Anbahnung, etwa um die Buchung einer Veranstaltung, verarbeiten wir die Anfrage nach Art. 6 Abs. 1 Buchst. b DSGVO. Bei allgemeinen Fragen ist unser berechtigtes Interesse, dir zu antworten (Art. 6 Abs. 1 Buchst. f DSGVO).',
        'Wir löschen die Korrespondenz, sobald dein Anliegen erledigt ist. Müssen wir einzelne Unterlagen gesetzlich aufbewahren, behalten wir sie bis zum Ablauf der jeweiligen Frist (Art. 6 Abs. 1 Buchst. c DSGVO). Benötigen wir sie für einen konkreten Rechtsanspruch, bewahren wir sie bis zu dessen Klärung oder Verjährung auf (Art. 6 Abs. 1 Buchst. f DSGVO).',
      ],
    },
    {
      h: 'Auskunft, Berichtigung und Löschung',
      p: [
        'Du kannst Auskunft über deine personenbezogenen Daten und eine Kopie verlangen. Unter den gesetzlichen Voraussetzungen kannst du falsche Angaben berichtigen, Daten löschen oder die Verarbeitung einschränken lassen. Werden Daten automatisiert auf Grundlage eines Vertrags oder deiner Einwilligung verarbeitet, kannst du die von dir bereitgestellten Daten in einem gängigen, maschinenlesbaren Format erhalten (Art. 15 bis 18 und 20 DSGVO). Schreib uns dafür an [bonsoir@lannee.de](mailto:bonsoir@lannee.de) oder per Post.',
      ],
    },
    {
      h: 'Dein Widerspruchsrecht',
      p: [
        'Beruht eine Verarbeitung auf unseren berechtigten Interessen, kannst du ihr aus Gründen deiner besonderen Situation jederzeit widersprechen (Art. 21 DSGVO). Wir beenden dann die Verarbeitung, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die deine Interessen, Rechte und Freiheiten überwiegen, oder wir brauchen die Daten, um Rechtsansprüche geltend zu machen, auszuüben oder zu verteidigen.',
      ],
    },
    {
      h: 'Beschwerde bei der Datenschutzaufsicht',
      p: [
        'Wenn du meinst, dass wir deine Daten rechtswidrig verarbeiten, kannst du dich bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere an deinem Wohnort, deinem Arbeitsplatz oder am Ort des vermuteten Verstoßes (Art. 77 DSGVO).',
        'Für uns in Mannheim ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg zuständig. Du erreichst ihn unter der Anschrift Heilbronner Straße 35, 70191 Stuttgart, oder über die [Beschwerdeseite der Datenschutzaufsicht](https://www.baden-wuerttemberg.datenschutz.de/beschwerde/).',
      ],
    },
  ],
};
