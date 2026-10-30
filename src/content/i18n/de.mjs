/** Deutsche Texte (Hauptsprache). Mini-Markup: _kursiv_, **fett**, {fr|Text} = Sprachauszeichnung. */
export default {
  locale: 'de',
  intl: 'de-DE',
  langName: 'Deutsch',
  ogLocale: 'de_DE',

  ui: {
    skip: 'Zum Inhalt springen',
    menu: 'Menü',
    close: 'Schließen',
    mainNav: 'Hauptnavigation',
    langNav: 'Sprache wählen',
    nav: { garage: 'Garage', kiosque: 'Kiosque', marche: 'Marché', carte: 'Karte', annee: 'Das Jahr', contact: 'Kontakt' },
    home: 'Startseite',
    days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    daysShort: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    time: { from: 'ab {t}', range: '{a} bis {b}' },
    live: {
      open: 'Jetzt geöffnet',
      next: 'Als Nächstes',
      today: 'heute',
      tomorrow: 'morgen',
      inDays: 'in {n} Tagen',
      since: 'seit {t}',
      until: 'bis {t}',
      paused: 'Diesmal Pause',
      closed: 'Geschlossen',
      unit: 'Uhr',
    },
    map: { title: 'Route planen', google: 'Google Maps', apple: 'Apple Karten', osm: 'OpenStreetMap', note: 'Externe Links' },
    closure: { one: '**{names} macht Pause:** {when}', many: '**{names} machen Pause:** {when}' },
    facts: { when: 'Wann', where: 'Wo', mail: 'Post', more: 'Außerdem' },
    footer: {
      tagline: 'Huîtres & Bulles in Mannheim',
      legal: 'Rechtliches',
      impressum: 'Impressum',
      datenschutz: 'Datenschutz',
      design: 'Gestaltung',
      top: 'Nach oben',
    },
    toMenu: 'Zur ganzen Karte',
    external: '(öffnet externe Seite)',
    visualisation: 'Visualisierung',
    demoNotice: 'Diese Webseite dient zur reinen Darstellung und ist fiktiv.',
  },

  pages: {
    home: {
      title: 'L’ANNÉE – Austern & Schaumwein in Mannheim',
      description:
        'Austern, Crémant und Champagner an drei Orten in Mannheim: in der Garage im Jungbusch, am Kiosque auf dem Lindenhofplatz und mit dem Marché auf dem Wochenmarkt Lindenhof.',
      h1: 'L’ANNÉE – Huîtres & Bulles in Mannheim',
      lead: 'Austern, Bläschen und ein Plätzchen in der Sonne. An drei Orten in Mannheim, jedes Wochenende.',
      ctaMenu: 'Zur Karte',
      ctaWhere: 'Wo wir sind',
      weekend: {
        heading: 'Ein Wochenende, drei Orte.',
        lead: 'Unter der Woche holen wir Austern, polieren Gläser und schlafen aus. Ab Freitagabend findest du uns hier:',
      },
      places: {
        garage: {
          heading: 'Bonsoir im Hinterhof.',
          body: 'Freitags und samstags ab 18 Uhr öffnen wir das Tor in der Beilstraße. Unter Weinranken gibt es Austern auf Eis, Crevetten zum Teilen, Tarte aus dem Ofen und Bläschen aus der Loire und der Champagne. Reservieren? Machen wir nicht. Komm einfach vorbei, ein Plätzchen findet sich.',
          cta: 'Zur Garage',
        },
        kiosque: {
          heading: 'Bonjour, Sonntag.',
          body: 'Sonntags ab 10 Uhr klappen wir am Lindenhofplatz die Läden hoch. Eine Auster zum Frühstück, ein Glas Crémant zum Mittag, Sardinen aus der Dose zwischendurch. Das Wochenende darf ruhig noch ein bisschen dauern.',
          cta: 'Zum Kiosque',
        },
        marche: {
          heading: 'Samstags um acht ist das Meer schon da.',
          body: 'Unser weißer Wagen steht samstags von 8 bis 13 Uhr auf dem Wochenmarkt Lindenhof. Austern frisch geöffnet, ein Glas Weißwein dazu oder ein Dutzend für zu Hause. Wo der Marché sonst noch auftaucht, kündigen wir rechtzeitig an.',
          cta: 'Zum Marché',
        },
      },
      carte: {
        heading: 'Was es gibt.',
        lead: 'Austern aus Frankreich und Irland, Meeresfrüchte zum Teilen, Kleinigkeiten und viel Prickelndes. Nicht alles gibt es überall, die Karte verrät dir, wo.',
        cta: 'Ganze Karte ansehen',
      },
      insta: 'Ausnahmen, Sondertermine und was gerade frisch ist: auf Instagram.',
    },

    garage: {
      title: 'Garage – Austern & Wein im Jungbusch | L’ANNÉE',
      description:
        'Die Garage von L’ANNÉE: Austern, Crémant und Champagner im Hinterhof der Beilstraße 6 in Mannheim-Jungbusch. Freitags und samstags ab 18 Uhr, ohne Reservierung.',
      h1: 'Garage',
      subtitle: '{fr|Garage à huîtres & vins}',
      when: 'Freitag & Samstag ab 18 Uhr',
      quote: 'Wir reservieren nicht – komm einfach vorbei, ein Plätzchen findet sich.',
      intro: {
        heading: 'Ein Hof, ein Tor, ein Boot.',
        body: [
          'Hinter dem Tor in der Beilstraße liegt ein Hof, den man im Jungbusch nicht erwartet: Weinranken am Spalier, Bistrostühle, Lichterketten. Drinnen hängen die Gläser von der Decke, an der Wand ein Segelschiff, und der Tresen ist ein altes Holzboot.',
          'Es gibt, was wir selbst am liebsten essen: Austern auf Eis, Crevetten zum Teilen, Sardinen aus der Dose, Tarte aus dem Ofen. Dazu Crémant de Loire, Champagner oder ein Glas Malbec aus Cahors.',
        ],
      },
      menu: { heading: 'Heute Abend in der Garage' },
      quarter: {
        heading: 'Der Jungbusch',
        body: 'Mannheims Hafenviertel: Kneipen, Ateliers, Musik, der Verbindungskanal um die Ecke. Ein guter Ort für Austern. Der Rhein ist zwar nicht das Meer, aber er fließt hinein.',
      },
      directions: {
        heading: 'Anfahrt',
        body: 'Am besten zu Fuß oder mit dem Rad, Parkplätze sind im Jungbusch rar.',
      },
    },

    kiosque: {
      title: 'Kiosque – Austern am Sonntag auf dem Lindenhof | L’ANNÉE',
      description:
        'Der Kiosque von L’ANNÉE am Lindenhofplatz 1 in Mannheim: sonntags ab 10 Uhr Austern, Crémant und kleine Teller.',
      h1: 'Kiosque',
      subtitle: '{fr|Kiosque à huîtres & vins}',
      when: 'Sonntag ab 10 Uhr',
      quote: 'Andere gehen sonntags zum Bäcker. Wir öffnen Austern.',
      intro: {
        heading: 'Sonntag, zehn Uhr, Lindenhofplatz.',
        body: [
          'Der Kiosque ist unser Sonntagsfenster zum Platz. Ein Tresen, ein paar Plätze in der Sonne, Austern auf Eis und kalte Bläschen. Mehr braucht ein Sonntag nicht.',
          'Auf der Karte stehen Fines de Claire und Spéciales, irische Felsenaustern, Krabbenkroketten, Räucherlachs und Sardinen. Dazu Crémant, Muscadet oder eine hausgemachte Citronnade.',
        ],
      },
      menu: { heading: 'Sonntags am Kiosque' },
      quarter: {
        heading: 'Der Lindenhof',
        body: 'Zwischen Hauptbahnhof und Rhein: Altbauten, viel Grün, der Waldpark gleich um die Ecke. Ein Viertel, das sonntags ausschläft und dann gern einen Aperitif nimmt.',
      },
      directions: {
        heading: 'Anfahrt',
        body: 'Vom Hauptbahnhof aus zu Fuß gut erreichbar.',
      },
    },

    marche: {
      title: 'Marché – Austern auf dem Wochenmarkt Lindenhof | L’ANNÉE',
      description:
        'Der Marché von L’ANNÉE: samstags von 8 bis 13 Uhr auf dem Wochenmarkt Lindenhof in Mannheim. Frisch geöffnete Austern, ein Glas Wein und Austern zum Mitnehmen.',
      h1: 'Marché',
      subtitle: '{fr|Huîtres & Bulles} auf Rädern',
      when: 'Samstag, 8 bis 13 Uhr',
      whereText: 'Wochenmarkt Lindenhof, Mannheim',
      more: 'Weitere Standorte und Termine nach Ankündigung.',
      quote: 'Zwischen Gemüse und Blumen: ein Dutzend, bitte.',
      intro: {
        heading: 'Ein Anhänger, zwei Tafeln.',
        body: [
          'Samstags parkt der Marché auf dem Wochenmarkt Lindenhof. Zwischen Gemüse und Blumen öffnen wir Austern, schenken Weißwein aus und stellen ein Schälchen Oliven dazu.',
          'Lieber zu Hause? Nimm dein Dutzend mit. Wir packen die Austern auf Eis und zeigen dir gern, wie man sie öffnet.',
        ],
      },
      menu: { heading: 'Heute auf der Tafel' },
      dates: {
        heading: 'Wo der Marché steht',
        regular: 'Jeden Samstag, 8 bis 13 Uhr',
        regularPlace: 'Wochenmarkt Lindenhof, Mannheim',
        empty: 'Gerade keine Sondertermine. Neue Stopps kündigen wir hier und auf Instagram an.',
      },
      invite: {
        heading: 'Den Marché einladen',
        body: 'Hoffest, Hochzeit, Firmenfeier? Der Marché ist ein Anhänger und kommt auch zu euch. Schreib uns, wann und wo, wir melden uns.',
        cta: 'Anfrage schreiben',
        subject: 'Anfrage Marché',
      },
    },

    carte: {
      title: 'Karte – Austern, Bulles & kleine Teller | L’ANNÉE',
      description:
        'Die Karte von L’ANNÉE: Austern aus Frankreich und Irland, Crevetten, Sardinen, Tarte, Crémant, Champagner und Weine. Mit Filter nach Garage, Kiosque und Marché.',
      h1: 'La Carte',
      lead: 'Was wir selbst am liebsten essen und trinken. Nicht alles gibt es überall: Wähle einen Ort, und die Karte zeigt dir, was es dort gibt.',
      filter: { label: 'Karte nach Ort filtern', all: 'Alle Orte' },
      taste: { label: 'Geschmack', iode: 'Jodig', chair: 'Fleischig', noisette: 'Nussig' },
      veg: 'vegetarisch',
      onlyAt: 'Nur hier:',
      price: 'Preis',
      from: 'ab',
      notes: [
        'Alle Preise in Euro inklusive Mehrwertsteuer.',
        'Informationen zu Allergenen und Zusatzstoffen bekommst du bei unserem Team.',
        'Austern werden roh serviert. Schwangeren und Menschen mit geschwächtem Immunsystem raten wir davon ab.',
      ],
    },

    annee: {
      title: 'Das Jahr – der Austernkalender von L’ANNÉE',
      description:
        'L’ANNÉE heißt „das Jahr“. Zwölf Monate rund um Austern, Wein und Frankreich: die Regel mit dem R, Austerngrößen und wie man eine Auster richtig isst.',
      h1: 'Das Jahr',
      lead: 'L’ANNÉE heißt „das Jahr“. Und Austern haben einen Kalender.',
      ringLabel: 'Jahresuhr: Die hervorgehobenen Monate enthalten ein R, der Zeiger steht auf dem aktuellen Monat.',
      rMonth: 'Monat mit R',
      now: 'Jetzt',
      rule: {
        heading: 'Die Regel mit dem R',
        body: [
          'Früher hieß es: Austern nur in Monaten mit R, also von September bis April. Der Grund war weniger der Geschmack als der Sommer. Ohne Kühlung verdarben Austern auf dem Weg ins Landesinnere schnell, und im Sommer laichen sie.',
          'Heute sind Austern gekühlt in wenigen Stunden vom Becken auf dem Tresen. Im Sommer schmecken sie oft milchiger und cremiger, die Franzosen sagen „laiteuses“. Feste, jodige Austern bleiben aber Wintersache.',
        ],
      },
      calibres: {
        heading: 'Je kleiner die Zahl, desto größer die Auster.',
        body: 'Austern werden in Frankreich nach Gewicht sortiert. Nº 3 ist der Klassiker zum Aperitif, Nº 2 etwas für Hungrige.',
        over: 'über {g} g',
        range: '{a}–{b} g',
      },
      howto: {
        heading: 'Eine Auster essen, in vier Schritten',
        steps: [
          { title: 'Ansehen', text: 'Eine frische Auster ist prall, glänzt und riecht nach Meer, nie nach Fisch.' },
          { title: 'Das erste Wasser abgießen', text: 'Kipp das erste Wasser ab. Nach ein, zwei Minuten bildet die Auster neues, und das schmeckt runder.' },
          { title: 'Lösen und würzen', text: 'Mit der kleinen Gabel den Muskel lösen. Ein Tropfen Zitrone oder Mignonette, oder einfach pur.' },
          { title: 'Kauen', text: 'Nicht einfach schlucken: zwei-, dreimal kauen, dann kommen Salz, Nuss und Süße. Zum Schluss den Saft trinken.' },
        ],
      },
      pairing: {
        heading: 'Was ins Glas gehört',
        items: [
          { name: 'Muscadet', text: 'Salzig und schlank. Der Klassiker zur Fines de Claire.' },
          { name: 'Chablis', text: 'Kreidig und mineralisch, für große, fleischige Austern.' },
          { name: 'Picpoul de Pinet', text: 'Wächst direkt am Austernbecken von Thau.' },
          { name: 'Crémant & Champagner', text: 'Die Bläschen putzen den Gaumen für die nächste Auster.' },
        ],
      },
    },

    contact: {
      title: 'Kontakt | L’ANNÉE',
      description:
        'So erreichst du L’ANNÉE in Mannheim: E-Mail-Adressen für Garage, Kiosque und Marché, Anfragen für Feste und Veranstaltungen.',
      h1: 'Kontakt',
      lead: 'Schreib uns. Wir antworten, sobald die Austern offen sind.',
      reservations: { heading: 'Reservieren?', body: 'Machen wir nicht. Komm einfach vorbei, ein Plätzchen findet sich.' },
      general: { heading: 'Alles andere', body: 'Für Feste, Presse und Fragen aller Art.' },
      insta: { heading: 'Neuigkeiten', body: 'Ausnahmen, Sondertermine und was gerade frisch ist.' },
    },

    impressum: {
      title: 'Impressum | L’ANNÉE',
      description: 'Impressum der L’ANNÉE GbR, Mannheim.',
      h1: 'Impressum',
    },
    datenschutz: {
      title: 'Datenschutz | L’ANNÉE',
      description: 'Datenschutzerklärung der Website von L’ANNÉE: keine Cookies, kein Tracking, Hosting bei Vercel.',
      h1: 'Datenschutz',
    },
    notFound: {
      title: 'Seite nicht gefunden | L’ANNÉE',
      h1: 'Ausgetrunken.',
      body: 'Diese Seite gibt es nicht oder nicht mehr. Vielleicht hilft dir das weiter:',
    },
  },
};
