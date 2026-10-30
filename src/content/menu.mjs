/**
 * La Carte – fiktive Speisekarte (Struktur inspiriert von De Blauwe Kiosk, Gent,
 * Inhalte aus der L'ANNÉE-Karte „Nachtwandel 2025“ ergänzt und neu komponiert).
 * PREISE SIND PLATZHALTER – bitte vor dem Livegang prüfen.
 *
 * where: an welchen Orten es das gibt (garage / kiosque / marche)
 * prices: Zahlen in Euro, passend zu den Spalten der Sektion
 * taste (nur Austern): 1–5 – iode = jodig/salzig, chair = Fleisch, noisette = nussig
 */

const ALL = ['garage', 'kiosque', 'marche'];

export const MENU = [
  {
    id: 'faim',
    title: { de: 'Hunger', fr: 'Faim', en: 'Hungry' },
    sections: [
      {
        id: 'huitres',
        icon: 'oyster-open',
        title: { de: 'Austern', fr: 'Les huîtres', en: 'Oysters' },
        intro: {
          de: 'Frisch geöffnet, auf Eis, mit Zitrone und Mignonette. Dazu Roggenbrot und gesalzene Butter.',
          fr: 'Ouvertes à la minute, sur glace, avec citron et mignonnette. Pain de seigle et beurre demi-sel.',
          en: 'Freshly shucked, on ice, with lemon and mignonette. Served with rye bread and salted butter.',
        },
        columns: {
          de: ['Stück', '6 Stück', '12 Stück'],
          fr: ['Pièce', '6 pièces', '12 pièces'],
          en: ['Each', 'Six', 'Dozen'],
        },
        items: [
          {
            id: 'fines-de-claire',
            name: 'Fines de Claire Nº 3',
            origin: { de: 'Marennes-Oléron, Frankreich', fr: 'Marennes-Oléron, France', en: 'Marennes-Oléron, France' },
            desc: {
              de: 'Unsere Hausauster. Mild, klar, ein Hauch Haselnuss.',
              fr: 'Notre huître maison. Douce, nette, une pointe de noisette.',
              en: 'Our house oyster. Mild, clean, a hint of hazelnut.',
            },
            taste: { iode: 3, chair: 2, noisette: 3 },
            prices: [3, 17, 32],
            where: ALL,
            signature: true,
          },
          {
            id: 'speciales',
            name: 'Spéciales de Claire Nº 3',
            origin: { de: 'Marennes-Oléron, Frankreich', fr: 'Marennes-Oléron, France', en: 'Marennes-Oléron, France' },
            desc: {
              de: 'Länger im Klärbecken gereift: fleischig, rund, leicht süßlich.',
              fr: 'Affinée plus longtemps en claire : charnue, ronde, légèrement sucrée.',
              en: 'Matured longer in the claires: meaty, round, slightly sweet.',
            },
            taste: { iode: 2, chair: 4, noisette: 3 },
            prices: [3.8, 21, 40],
            where: ALL,
          },
          {
            id: 'gillardeau',
            name: 'Gillardeau Nº 3',
            origin: { de: 'Bourcefranc, Frankreich', fr: 'Bourcefranc, France', en: 'Bourcefranc, France' },
            desc: {
              de: 'Die Grande Dame. Knackig, nussig, mit langem Nachhall.',
              fr: 'La grande dame. Croquante, noisettée, longue en bouche.',
              en: 'The grande dame. Crisp, nutty, with a long finish.',
            },
            taste: { iode: 3, chair: 5, noisette: 4 },
            prices: [5.5, 31, 59],
            where: ['garage'],
          },
          {
            id: 'irlande',
            name: { de: 'Irische Felsenauster Nº 2', fr: 'Huître d’Irlande Nº 2', en: 'Irish rock oyster Nº 2' },
            origin: { de: 'Westküste, Irland', fr: 'Côte ouest, Irlande', en: 'West coast, Ireland' },
            desc: {
              de: 'Kräftig und salzig, Atlantik pur. Für Fortgeschrittene.',
              fr: 'Puissante et iodée, l’Atlantique pur. Pour les initiés.',
              en: 'Bold and briny, pure Atlantic. For the initiated.',
            },
            taste: { iode: 5, chair: 3, noisette: 2 },
            prices: [4.2, 24, 45],
            where: ['garage', 'kiosque'],
          },
          {
            id: 'bebe',
            name: { de: 'Baby-Austern', fr: 'Petites huîtres', en: 'Baby oysters' },
            origin: { de: 'Normandie, Frankreich', fr: 'Normandie, France', en: 'Normandy, France' },
            desc: {
              de: 'Klein, zart, perfekt für die erste Auster.',
              fr: 'Petites et délicates, idéales pour une première fois.',
              en: 'Small and delicate, perfect for a first oyster.',
            },
            taste: { iode: 2, chair: 1, noisette: 2 },
            prices: [7],
            columns: { de: ['3 Stück'], fr: ['Les 3'], en: ['Three'] },
            where: ['marche'],
          },
        ],
      },
      {
        id: 'mer',
        icon: 'shrimp',
        title: { de: 'Aus dem Meer', fr: 'Fruits de mer', en: 'From the sea' },
        items: [
          {
            id: 'crevettes',
            name: 'Crevettes Label Rouge',
            desc: {
              de: 'Zum Teilen, mit Cocktailsauce und Zitrone. ½ kg 39 €, 1 kg 69 €.',
              fr: 'À partager, sauce cocktail et citron. ½ kg 39 €, 1 kg 69 €.',
              en: 'To share, with cocktail sauce and lemon. ½ kg €39, 1 kg €69.',
            },
            price: 39,
            from: true,
            where: ['garage'],
            signature: true,
          },
          {
            id: 'croquettes',
            name: { de: 'Krabbenkroketten', fr: 'Croquettes de crevettes grises', en: 'Brown shrimp croquettes' },
            desc: {
              de: 'Nordseekrabben, knusprig, mit Zitrone und frittierter Petersilie. Zwei Stück.',
              fr: 'Crevettes grises de la mer du Nord, citron et persil frit. Les deux.',
              en: 'North Sea brown shrimp, crisp, with lemon and fried parsley. Two pieces.',
            },
            price: 14,
            where: ['garage', 'kiosque'],
          },
          {
            id: 'plateau',
            name: 'Plateau L’ANNÉE',
            desc: {
              de: 'Für zwei: zwölf Austern, ½ kg Crevetten, Bulots mit Aioli.',
              fr: 'Pour deux : douze huîtres, ½ kg de crevettes, bulots et aïoli.',
              en: 'For two: twelve oysters, ½ kg prawns, whelks with aioli.',
            },
            price: 79,
            where: ['garage'],
          },
          {
            id: 'sardines',
            name: 'Sardines Albert Ménès',
            desc: {
              de: 'Sardinen aus der Dose, geröstetes Landbrot, Zitrone. Ein Klassiker.',
              fr: 'La boîte de sardines, pain de campagne grillé, citron. Un classique.',
              en: 'Tinned sardines, toasted country bread, lemon. A classic.',
            },
            price: 14,
            where: ALL,
            signature: true,
          },
          {
            id: 'saumon',
            name: { de: 'Räucherlachs', fr: 'Saumon fumé', en: 'Smoked salmon' },
            desc: {
              de: 'Mit Crème fraîche, Kräutersalat und Toast.',
              fr: 'Crème fraîche, salade d’herbes et toasts.',
              en: 'With crème fraîche, herb salad and toast.',
            },
            price: 15,
            where: ['garage', 'kiosque'],
          },
        ],
      },
      {
        id: 'tartes',
        icon: 'baguette',
        title: { de: 'Aus dem Ofen', fr: 'Du four', en: 'From the oven' },
        intro: {
          de: 'Die Tarte L’ANNÉE: dünn, knusprig, nur in der Garage.',
          fr: 'La tarte L’ANNÉE : fine, croustillante, uniquement au Garage.',
          en: 'The L’ANNÉE tarte: thin, crisp, only at the Garage.',
        },
        items: [
          {
            id: 'tarte-classique',
            name: 'Tarte Classique',
            desc: {
              de: 'Crème fraîche, Schinken, Speck, Zwiebeln, Petersilie.',
              fr: 'Crème fraîche, jambon, lardons, oignons, persil.',
              en: 'Crème fraîche, ham, bacon, onions, parsley.',
            },
            price: 10,
            where: ['garage'],
            signature: true,
          },
          {
            id: 'tarte-provencale',
            name: 'Tarte Provençale',
            desc: {
              de: 'Tomate, Zucchini, Champignons, Estragon. Vegetarisch.',
              fr: 'Tomate, courgette, champignons, estragon. Végétarienne.',
              en: 'Tomato, courgette, mushrooms, tarragon. Vegetarian.',
            },
            price: 9,
            where: ['garage'],
            veg: true,
          },
          {
            id: 'tarte-pecheur',
            name: 'Tarte du Pêcheur',
            desc: {
              de: 'Räucherlachs, Lauch, Dill, ein Spritzer Zitrone.',
              fr: 'Saumon fumé, poireau, aneth, un trait de citron.',
              en: 'Smoked salmon, leek, dill, a squeeze of lemon.',
            },
            price: 12,
            where: ['garage'],
          },
        ],
      },
      {
        id: 'petit',
        icon: 'lemon',
        title: { de: 'Kleinigkeiten', fr: 'Pour grignoter', en: 'Little things' },
        items: [
          {
            id: 'pain',
            name: { de: 'Geröstetes Brot & Butter', fr: 'Pain grillé & beurre', en: 'Toasted bread & butter' },
            desc: {
              de: 'Mit Beurre Paysan Breton und Salz aus Guérande.',
              fr: 'Beurre Paysan Breton au sel de Guérande.',
              en: 'With Paysan Breton butter and Guérande salt.',
            },
            price: 4,
            where: ALL,
            veg: true,
          },
          {
            id: 'comte',
            name: { de: 'Comté & Senf', fr: 'Comté & moutarde', en: 'Comté & mustard' },
            desc: {
              de: '18 Monate gereift, mit Dijon-Senf.',
              fr: 'Affiné 18 mois, moutarde de Dijon.',
              en: 'Aged 18 months, with Dijon mustard.',
            },
            price: 8,
            where: ['garage', 'kiosque'],
            veg: true,
          },
          {
            id: 'olives',
            name: { de: 'Grüne Oliven', fr: 'Olives vertes', en: 'Green olives' },
            desc: { de: 'Ein Schälchen.', fr: 'Une coupelle.', en: 'A small bowl.' },
            price: 3,
            where: ALL,
            veg: true,
          },
          {
            id: 'chips',
            name: 'Chips',
            desc: { de: 'Mit Meersalz.', fr: 'Au sel de mer.', en: 'With sea salt.' },
            price: 2,
            where: ALL,
            veg: true,
          },
        ],
      },
    ],
  },
  {
    id: 'soif',
    title: { de: 'Durst', fr: 'Soif', en: 'Thirsty' },
    sections: [
      {
        id: 'bulles',
        icon: 'flute',
        title: { de: 'Bulles', fr: 'Les bulles', en: 'Bubbles' },
        columns: { de: ['0,1 l', 'Flasche'], fr: ['10 cl', 'Bouteille'], en: ['Glass', 'Bottle'] },
        items: [
          {
            id: 'cremant',
            name: 'Crémant de Loire Brut',
            origin: { de: 'Bouvet-Ladubay, Saumur', fr: 'Bouvet-Ladubay, Saumur', en: 'Bouvet-Ladubay, Saumur' },
            desc: {
              de: 'Unser Hausschaumwein: frisch, feinperlig, perfekt zur Auster.',
              fr: 'Notre bulle maison : fraîche, fine, parfaite avec l’huître.',
              en: 'Our house sparkling: fresh, fine-beaded, made for oysters.',
            },
            prices: [7, 29],
            where: ALL,
            signature: true,
          },
          {
            id: 'champagne',
            name: { de: 'Champagner Brut', fr: 'Champagne brut', en: 'Champagne Brut' },
            origin: { de: 'Hauschampagner', fr: 'Champagne maison', en: 'House champagne' },
            desc: { de: 'Für besondere Freitage.', fr: 'Pour les vendredis qui comptent.', en: 'For Fridays that matter.' },
            prices: [12, 58],
            where: ALL,
          },
          {
            id: 'jacquesson',
            name: 'Jacquesson Cuvée 747',
            origin: { de: 'Dizy, Champagne', fr: 'Dizy, Champagne', en: 'Dizy, Champagne' },
            desc: {
              de: 'Präzise, tief, extra brut. Die Flasche für den großen Abend.',
              fr: 'Précis, profond, extra-brut. La bouteille des grands soirs.',
              en: 'Precise, deep, extra brut. The bottle for the big night.',
            },
            prices: [null, 149],
            where: ['garage'],
          },
          {
            id: 'sans',
            name: { de: 'Alkoholfreier Schaumwein', fr: 'Pétillant sans alcool', en: 'Alcohol-free sparkling' },
            desc: { de: '0,0 %, trotzdem Bulles.', fr: '0,0 %, mais des bulles.', en: '0.0%, still bubbles.' },
            prices: [6, 29],
            where: ALL,
          },
        ],
      },
      {
        id: 'blanc',
        icon: 'wine',
        title: { de: 'Weißwein', fr: 'Un petit blanc ?', en: 'White wine' },
        columns: { de: ['0,1 l', 'Flasche'], fr: ['10 cl', 'Bouteille'], en: ['Glass', 'Bottle'] },
        items: [
          {
            id: 'muscadet',
            name: 'Muscadet Sèvre & Maine sur Lie',
            origin: { de: 'Loire', fr: 'Loire', en: 'Loire' },
            desc: {
              de: 'Der Austernwein schlechthin: salzig, zitrisch, schlank.',
              fr: 'Le vin de l’huître par excellence : salin, citronné, tendu.',
              en: 'The oyster wine: saline, citrusy, lean.',
            },
            prices: [5, 29],
            where: ALL,
          },
          {
            id: 'picpoul',
            name: 'Picpoul de Pinet',
            origin: { de: 'Languedoc', fr: 'Languedoc', en: 'Languedoc' },
            desc: {
              de: 'Wächst direkt am Austernbecken von Thau.',
              fr: 'Il pousse au bord de l’étang de Thau, chez les ostréiculteurs.',
              en: 'Grown right by the oyster beds of the Étang de Thau.',
            },
            prices: [5.5, 31],
            where: ['garage', 'kiosque'],
          },
          {
            id: 'chablis',
            name: 'Chablis',
            origin: { de: 'Burgund', fr: 'Bourgogne', en: 'Burgundy' },
            desc: {
              de: 'Kreidig, mineralisch, elegant. Der Klassiker zur Gillardeau.',
              fr: 'Crayeux, minéral, élégant. Le classique avec une Gillardeau.',
              en: 'Chalky, mineral, elegant. The classic with a Gillardeau.',
            },
            prices: [8, 45],
            where: ['garage'],
          },
        ],
      },
      {
        id: 'rose',
        icon: 'wine',
        title: { de: 'La vie en rosé', fr: 'La vie en rosé', en: 'La vie en rosé' },
        columns: { de: ['0,1 l', 'Flasche'], fr: ['10 cl', 'Bouteille'], en: ['Glass', 'Bottle'] },
        items: [
          {
            id: 'rose-maison',
            name: { de: 'Rosé de la Maison', fr: 'Rosé de la maison', en: 'House rosé' },
            origin: { de: 'Provence', fr: 'Provence', en: 'Provence' },
            desc: { de: 'Hell, trocken, sonnig.', fr: 'Pâle, sec, solaire.', en: 'Pale, dry, sunny.' },
            prices: [5, 26],
            where: ALL,
          },
          {
            id: 'porquerolles',
            name: 'L’Alycastre, Porquerolles',
            origin: { de: 'Côtes de Provence', fr: 'Côtes de Provence', en: 'Côtes de Provence' },
            desc: {
              de: 'Von der Insel Porquerolles. Salzig, fein, nach Urlaub.',
              fr: 'De l’île de Porquerolles. Salin, délicat, un air de vacances.',
              en: 'From the island of Porquerolles. Saline, delicate, holiday in a glass.',
            },
            prices: [null, 29],
            where: ['garage'],
          },
        ],
      },
      {
        id: 'rouge',
        icon: 'grapes',
        title: { de: 'Rotwein', fr: 'Un petit rouge ?', en: 'Red wine' },
        columns: { de: ['0,2 l', 'Flasche'], fr: ['20 cl', 'Bouteille'], en: ['Glass', 'Bottle'] },
        items: [
          {
            id: 'malbec',
            name: 'Château du Cèdre, Marcel Malbec',
            origin: { de: 'Cahors', fr: 'Cahors', en: 'Cahors' },
            desc: {
              de: 'Dunkel, saftig, mit Biss. Für alle, die keine Austern mögen.',
              fr: 'Sombre, juteux, mordant. Pour celles et ceux qui n’aiment pas l’huître.',
              en: 'Dark, juicy, with bite. For those who don’t do oysters.',
            },
            prices: [7, 19],
            where: ['garage'],
          },
          {
            id: 'gamay',
            name: 'Beaujolais Villages',
            origin: { de: 'Gamay, leicht gekühlt', fr: 'Gamay, servi frais', en: 'Gamay, lightly chilled' },
            desc: { de: 'Fruchtig, leicht, gesellig.', fr: 'Fruité, léger, convivial.', en: 'Fruity, light, sociable.' },
            prices: [6, 30],
            where: ['garage', 'kiosque'],
          },
        ],
      },
      {
        id: 'apero',
        icon: 'cocktail',
        title: { de: 'Apéro', fr: 'Plus fort ?', en: 'Apéritifs' },
        items: [
          {
            id: 'gin-tonic',
            name: 'Gin & Tonic',
            desc: { de: 'Citadelle Gin, Schweppes Indian Tonic.', fr: 'Gin Citadelle, Schweppes Indian Tonic.', en: 'Citadelle gin, Schweppes Indian Tonic.' },
            price: 8,
            where: ALL,
          },
          {
            id: 'lillet',
            name: 'Lillet Tonic',
            desc: {
              de: 'Lillet Blanc, Schweppes Wild Berry, frische Erdbeeren.',
              fr: 'Lillet blanc, Schweppes Wild Berry, fraises fraîches.',
              en: 'Lillet Blanc, Schweppes Wild Berry, fresh strawberries.',
            },
            price: 9,
            where: ALL,
          },
          {
            id: 'spritz',
            name: 'Aperol Spritz',
            desc: { de: 'Der Samstagsklassiker.', fr: 'Le classique du samedi.', en: 'The Saturday classic.' },
            price: 8,
            where: ALL,
          },
          {
            id: 'picon',
            name: 'Picon Vin Blanc',
            desc: { de: 'Bitterorange trifft Weißwein.', fr: 'L’amer orange rencontre le vin blanc.', en: 'Bitter orange meets white wine.' },
            price: 7,
            where: ['garage', 'kiosque'],
          },
          {
            id: 'pastis',
            name: 'Ricard',
            desc: { de: 'Mit Wasser und Eis.', fr: 'Avec eau fraîche et glaçons.', en: 'With water and ice.' },
            price: 5,
            where: ['garage', 'kiosque'],
          },
          {
            id: 'pelforth',
            name: 'Pelforth Blonde',
            desc: { de: 'Bière blonde, 0,25 l.', fr: 'Bière blonde, 25 cl.', en: 'Blonde beer, 25 cl.' },
            price: 4,
            where: ALL,
          },
        ],
      },
      {
        id: 'frais',
        icon: 'cocktail',
        title: { de: 'Ohne Alkohol', fr: 'Pour se rafraîchir', en: 'Without alcohol' },
        items: [
          {
            id: 'citronnade',
            name: 'Citronnade Maison',
            desc: { de: 'Hausgemachte Zitronenlimonade.', fr: 'Limonade maison au citron.', en: 'Homemade lemonade.' },
            price: 5,
            where: ['garage', 'kiosque'],
          },
          {
            id: 'perrier',
            name: 'Perrier',
            desc: { de: '0,2 l.', fr: '20 cl.', en: '20 cl.' },
            price: 3,
            where: ALL,
          },
          {
            id: 'orangina',
            name: 'Orangina',
            desc: { de: '„La Pulpeuse“, 0,25 l.', fr: '« La Pulpeuse », 25 cl.', en: '“La Pulpeuse”, 25 cl.' },
            price: 4,
            where: ALL,
          },
          {
            id: 'coca',
            name: 'Coca-Cola, Coca-Cola light',
            desc: { de: '0,2 l.', fr: '20 cl.', en: '20 cl.' },
            price: 4,
            where: ALL,
          },
        ],
      },
    ],
  },
];
