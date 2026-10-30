/**
 * Austernatlas (eigene Seite: /austernatlas/, /fr/atlas-des-huitres/, /en/oyster-atlas/).
 * ---------------------------------------------------------------------------
 * art:   Schlüssel der Zeichnung in src/lib/oyster-art.mjs
 * group: species | france | europe | world
 * sci:   wissenschaftlicher Name (bei Arten)
 * where: Herkunft (bei Lagen und Marken)
 * lang:  Sprache des Namens, falls er in allen Sprachen gleich bleibt
 */

export const ATLAS = {
  title: { de: 'Austernatlas', fr: 'Atlas des huîtres', en: 'Oyster atlas' },
  lead: {
    de: 'Die wichtigsten Arten und die bekanntesten Herkünfte, von Marennes bis Sylt.',
    fr: 'Les principales espèces et les origines les plus célèbres, de Marennes à Sylt.',
    en: 'The main species and the best-known origins, from Marennes to Sylt.',
  },
  cta: {
    de: 'Was es gerade bei uns gibt, steht auf der Karte',
    fr: 'Ce que nous servons en ce moment est sur la carte',
    en: 'What we’re serving right now is on the menu',
  },
  /** Überschriften der Abschnitte auf der Atlas-Seite */
  sections: {
    species: { de: 'Arten', fr: 'Espèces', en: 'Species' },
    france: { de: 'Frankreich', fr: 'France', en: 'France' },
    europe: { de: 'Europa', fr: 'Europe', en: 'Europe' },
    world: { de: 'Welt', fr: 'Monde', en: 'World' },
  },
  groups: {
    species: { de: 'Art', fr: 'Espèce', en: 'Species' },
    france: { de: 'Frankreich', fr: 'France', en: 'France' },
    europe: { de: 'Europa', fr: 'Europe', en: 'Europe' },
    world: { de: 'Welt', fr: 'Monde', en: 'World' },
  },
};

export const OYSTERS = [
  /* Arten -------------------------------------------------------------- */
  {
    art: 'creuse',
    group: 'species',
    name: { de: 'Pazifische Felsenauster', fr: 'Huître creuse', en: 'Pacific oyster' },
    sci: 'Crassostrea gigas',
    text: {
      de: 'Die Auster schlechthin: länglich, tief, gewellt. Kam in den 1970ern aus Japan nach Frankreich und stellt heute fast die ganze Ernte.',
      fr: 'L’huître par excellence : allongée, creuse, ondulée. Arrivée du Japon dans les années 1970, elle fait aujourd’hui presque toute la récolte.',
      en: 'The oyster most people know: long, deep and frilly. It came to France from Japan in the 1970s and now makes up almost the whole harvest.',
    },
  },
  {
    art: 'plate',
    group: 'species',
    name: { de: 'Europäische Auster', fr: 'Huître plate', en: 'European flat oyster' },
    sci: 'Ostrea edulis',
    text: {
      de: 'Die heimische Auster: rund, flach, fest im Biss, nussig bis metallisch. Selten geworden und deshalb eine kleine Kostbarkeit.',
      fr: 'L’huître d’origine : ronde, plate, ferme, au goût de noisette et de métal. Devenue rare, elle est un petit trésor.',
      en: 'Europe’s native oyster: round, flat and firm, nutty to metallic. It has become rare, which makes it a small treasure.',
    },
  },
  {
    art: 'portugaise',
    group: 'species',
    name: { de: 'Portugiesische Auster', fr: 'Huître portugaise', en: 'Portuguese oyster' },
    sci: 'Crassostrea angulata',
    text: {
      de: '1868 landete eine Schiffsladung in der Gironde. Danach prägte sie hundert Jahre die französische Zucht, bis eine Krankheit sie um 1970 fast auslöschte.',
      fr: 'En 1868, une cargaison finit dans la Gironde. Elle domine ensuite l’ostréiculture française pendant un siècle, jusqu’à une maladie vers 1970.',
      en: 'In 1868 a ship’s cargo ended up in the Gironde. It then shaped French oyster farming for a century, until a disease almost wiped it out around 1970.',
    },
  },
  {
    art: 'virginica',
    group: 'species',
    name: { de: 'Amerikanische Auster', fr: 'Huître américaine', en: 'Eastern oyster' },
    sci: 'Crassostrea virginica',
    text: {
      de: 'Zu Hause von Kanada bis zum Golf von Mexiko. Glatte, tropfenförmige Schale, salzig-frisch; bekannt als Blue Point, Wellfleet oder Malpeque.',
      fr: 'Chez elle du Canada au golfe du Mexique. Coquille lisse en forme de goutte, saline et fraîche ; connue comme Blue Point, Wellfleet ou Malpeque.',
      en: 'At home from Canada to the Gulf of Mexico. Smooth, teardrop-shaped shell, briny and fresh; known as Blue Point, Wellfleet or Malpeque.',
    },
  },
  {
    art: 'kumamoto',
    group: 'species',
    name: 'Kumamoto',
    sci: 'Crassostrea sikamea',
    text: {
      de: 'Klein, mit tiefer Schale, mild und fast süß, mit einem Hauch Melone. Stammt aus Japan und wird heute vor allem an der US-Westküste gezüchtet.',
      fr: 'Petite, très creuse, douce, presque sucrée, avec une note de melon. Originaire du Japon, elle est surtout élevée sur la côte ouest des États-Unis.',
      en: 'Small, deep-cupped, mild and almost sweet with a hint of melon. Originally from Japan, now farmed mostly on the US West Coast.',
    },
  },
  {
    art: 'olympia',
    group: 'species',
    name: 'Olympia',
    sci: 'Ostrea lurida',
    text: {
      de: 'Die einzige heimische Auster der nordamerikanischen Pazifikküste, kaum größer als eine Münze. Kupfrig, mineralisch, intensiv.',
      fr: 'La seule huître native de la côte pacifique nord-américaine, à peine plus grande qu’une pièce. Cuivrée, minérale, intense.',
      en: 'The only oyster native to North America’s Pacific coast, barely bigger than a coin. Coppery, mineral, intense.',
    },
  },
  {
    art: 'sydney',
    group: 'species',
    name: { de: 'Sydney-Felsenauster', fr: 'Huître de roche de Sydney', en: 'Sydney rock oyster' },
    sci: 'Saccostrea glomerata',
    text: {
      de: 'Australiens heimische Auster. Sie wächst langsam und schmeckt cremig, voll und mineralisch.',
      fr: 'L’huître native d’Australie. Elle pousse lentement ; goût crémeux, ample et minéral.',
      en: 'Australia’s native oyster. It grows slowly and tastes creamy, rich and mineral.',
    },
  },

  /* Frankreich --------------------------------------------------------- */
  {
    art: 'fine',
    group: 'france',
    name: 'Fine de Claire',
    lang: 'fr',
    where: 'Marennes-Oléron',
    text: {
      de: 'Eine Felsenauster, die zum Schluss einige Wochen in den Claires reift, flachen Becken mit Lehmboden. Ausgewogen, jodig, nicht zu fleischig.',
      fr: 'Une huître creuse affinée quelques semaines en claires, ces bassins d’argile peu profonds. Équilibrée, iodée, peu charnue.',
      en: 'A Pacific oyster finished for a few weeks in claires, shallow clay-bottomed ponds. Balanced, briny, not too meaty.',
    },
  },
  {
    art: 'speciale',
    group: 'france',
    name: 'Spéciale de Claire',
    lang: 'fr',
    where: 'Marennes-Oléron',
    text: {
      de: 'Ebenfalls in den Claires verfeinert, aber deutlich fleischiger. Rund im Geschmack, mit süßlichem Abgang.',
      fr: 'Affinée elle aussi en claires, mais nettement plus charnue. Ronde en bouche, finale douce.',
      en: 'Also finished in claires, but noticeably meatier. Round in flavour with a sweetish finish.',
    },
  },
  {
    art: 'pousse',
    group: 'france',
    name: 'Pousse en Claire',
    lang: 'fr',
    where: 'Marennes-Oléron · Label Rouge',
    text: {
      de: 'Wächst monatelang in den Claires, mit viel Platz für jede Auster. Sehr fleischig, knackig, wenig salzig – die Krönung aus Marennes-Oléron.',
      fr: 'Elle grandit des mois durant en claires, avec beaucoup d’espace. Très charnue, croquante, peu salée : le sommet de Marennes-Oléron.',
      en: 'Grown for months in the claires with plenty of room per oyster. Very meaty, crisp and low in salt – the pinnacle of Marennes-Oléron.',
    },
  },
  {
    art: 'verte',
    group: 'france',
    name: 'Fine de Claire Verte',
    lang: 'fr',
    where: 'Marennes-Oléron · Label Rouge',
    text: {
      de: 'Eine Kieselalge in manchen Claires, die Blaue Navicula, färbt ihre Kiemen grün. Zart, mit feiner pflanzlicher Note.',
      fr: 'Une micro-algue de certaines claires, la navicule bleue, teinte ses branchies en vert. Fine, avec une délicate note végétale.',
      en: 'A microalga found in some claires, the blue navicula, turns its gills green. Delicate, with a fine vegetal note.',
    },
  },
  {
    art: 'gillardeau',
    group: 'france',
    name: 'Gillardeau',
    where: { de: 'Marennes-Oléron, Normandie, Irland', fr: 'Marennes-Oléron, Normandie, Irlande', en: 'Marennes-Oléron, Normandy, Ireland' },
    text: {
      de: 'Familienhaus aus Bourcefranc, gegründet um 1898. Jede Auster trägt ein eingraviertes G. Fleischig, haselnussig, mit langem Nachhall.',
      fr: 'Maison familiale de Bourcefranc, fondée vers 1898. Chaque huître porte un G gravé. Charnue, notes de noisette, longue en bouche.',
      en: 'A family house from Bourcefranc, founded around 1898. Every oyster carries an engraved G. Meaty, hazelnut notes, a long finish.',
    },
  },
  {
    art: 'belon',
    group: 'france',
    name: 'Belon',
    lang: 'fr',
    where: { de: 'Südbretagne', fr: 'Bretagne sud', en: 'Southern Brittany' },
    text: {
      de: 'Flache Austern aus der Mündung der Belon, wo Süß- und Salzwasser sich mischen. Kräftig, metallisch, nussig.',
      fr: 'Huîtres plates de l’estuaire du Bélon, où se mêlent eau douce et eau de mer. Puissantes, métalliques, noisettées.',
      en: 'Flat oysters from the Belon estuary, where fresh water meets the sea. Powerful, metallic, nutty.',
    },
  },
  {
    art: 'cancale',
    group: 'france',
    name: 'Cancale',
    lang: 'fr',
    where: { de: 'Bucht von Mont-Saint-Michel', fr: 'Baie du Mont-Saint-Michel', en: 'Bay of Mont-Saint-Michel' },
    text: {
      de: 'Hier wechseln die Gezeiten so stark wie kaum anderswo in Europa. Felsen- und flache Austern, kräftig jodig; am Hafen isst man sie direkt vom Stand.',
      fr: 'Ici, les marées comptent parmi les plus fortes d’Europe. Huîtres creuses et plates, bien iodées ; au port, on les déguste sur le pouce.',
      en: 'Home to some of the strongest tides in Europe. Pacific and flat oysters, distinctly briny; at the harbour they’re eaten straight from the stalls.',
    },
  },
  {
    art: 'arcachon',
    group: 'france',
    name: 'Arcachon',
    lang: 'fr',
    where: { de: 'Bassin d’Arcachon', fr: 'Bassin d’Arcachon', en: 'Arcachon Bay' },
    text: {
      de: 'Die Kinderstube der französischen Austernzucht: Hier setzt sich der Nachwuchs fest, traditionell auf gekalkten Dachziegeln. Mild und leicht süßlich.',
      fr: 'La nurserie de l’ostréiculture française : le naissain s’y fixe, traditionnellement sur des tuiles chaulées. Douces, légèrement sucrées.',
      en: 'The nursery of French oyster farming: young oysters settle here, traditionally on lime-coated roof tiles. Mild and slightly sweet.',
    },
  },
  {
    art: 'thau',
    group: 'france',
    name: 'Bouzigues',
    lang: 'fr',
    where: { de: 'Étang de Thau, Mittelmeer', fr: 'Étang de Thau, Méditerranée', en: 'Étang de Thau, Mediterranean' },
    text: {
      de: 'In der Lagune von Thau hängen die Austern an Seilen im Wasser, Gezeiten gibt es kaum. Sie wachsen schnell und schmecken mild und süßlich.',
      fr: 'Dans l’étang de Thau, les huîtres poussent suspendues à des cordes, presque sans marée. Croissance rapide, goût doux et sucré.',
      en: 'In the Thau lagoon the oysters grow hanging from ropes, with hardly any tide. They grow fast and taste mild and sweet.',
    },
  },

  /* Europa ------------------------------------------------------------- */
  {
    art: 'sylt',
    group: 'europe',
    name: 'Sylter Royal',
    lang: 'de',
    where: { de: 'Sylt, Deutschland', fr: 'Sylt, Allemagne', en: 'Sylt, Germany' },
    text: {
      de: 'Aus Deutschlands einziger Austernzucht, im Wattenmeer vor List. Eine Felsenauster, knackig und salzig wie die Nordsee.',
      fr: 'Du seul parc à huîtres d’Allemagne, dans la mer des Wadden près de List. Une huître creuse, croquante et salée comme la mer du Nord.',
      en: 'From Germany’s only oyster farm, in the Wadden Sea off List. A Pacific oyster, crisp and salty like the North Sea.',
    },
  },
  {
    art: 'zeeland',
    group: 'europe',
    name: 'Zeeuwse platte',
    lang: 'nl',
    where: { de: 'Oosterschelde, Niederlande', fr: 'Escaut oriental, Pays-Bas', en: 'Oosterschelde, Netherlands' },
    text: {
      de: 'Flache Auster aus der Oosterschelde in Zeeland, rund um Yerseke. Fein salzig, fest, mit nussigem Nachhall.',
      fr: 'Huître plate de l’Escaut oriental, en Zélande, autour de Yerseke. Finement salée, ferme, finale de noisette.',
      en: 'Flat oyster from the Oosterschelde in Zeeland, around Yerseke. Finely salty and firm with a nutty finish.',
    },
  },
  {
    art: 'galway',
    group: 'europe',
    name: 'Galway',
    where: { de: 'Irland', fr: 'Irlande', en: 'Ireland' },
    text: {
      de: 'Wilde flache Austern aus der Galway Bay, gefeiert mit einem Austernfestival seit 1954. Kräftig, salzig, mineralisch.',
      fr: 'Huîtres plates sauvages de la baie de Galway, célébrées par un festival depuis 1954. Puissantes, salées, minérales.',
      en: 'Wild flat oysters from Galway Bay, celebrated with an oyster festival since 1954. Bold, salty, mineral.',
    },
  },
  {
    art: 'colchester',
    group: 'europe',
    name: 'Colchester',
    where: { de: 'Essex, England', fr: 'Essex, Angleterre', en: 'Essex, England' },
    text: {
      de: 'Schon die Römer aßen die flachen Austern aus der Mündung der Colne. Fest, salzig, mit langem Nachgeschmack.',
      fr: 'Les Romains dégustaient déjà les huîtres plates de l’estuaire de la Colne. Fermes, salées, longues en bouche.',
      en: 'The Romans already ate the flat oysters from the Colne estuary. Firm and salty with a long finish.',
    },
  },
  {
    art: 'limfjord',
    group: 'europe',
    name: 'Limfjord',
    where: { de: 'Dänemark', fr: 'Danemark', en: 'Denmark' },
    text: {
      de: 'Wild gefischte flache Austern aus dem kalten, klaren Limfjord. Knackig, sauber, leicht süßlich.',
      fr: 'Huîtres plates sauvages, pêchées dans les eaux froides et claires du Limfjord. Croquantes, nettes, légèrement sucrées.',
      en: 'Wild flat oysters fished from the cold, clear Limfjord. Crisp, clean, slightly sweet.',
    },
  },

  /* Welt --------------------------------------------------------------- */
  {
    art: 'bluepoint',
    group: 'world',
    name: 'Blue Point',
    lang: 'en',
    where: { de: 'Long Island, USA', fr: 'Long Island, États-Unis', en: 'Long Island, USA' },
    text: {
      de: 'Ein amerikanischer Klassiker von der Südküste Long Islands. Mild, salzig, sauber – die Auster der New Yorker Oyster Bars.',
      fr: 'Un classique américain de la côte sud de Long Island. Douce, salée, nette : l’huître des bars à huîtres new-yorkais.',
      en: 'An American classic from Long Island’s south shore. Mild, briny, clean – the oyster of New York’s oyster bars.',
    },
  },
  {
    art: 'kusshi',
    group: 'world',
    name: 'Kusshi',
    where: { de: 'British Columbia, Kanada', fr: 'Colombie-Britannique, Canada', en: 'British Columbia, Canada' },
    text: {
      de: 'Eine Felsenauster, die beim Wachsen immer wieder getrommelt wird. So bleibt sie klein, tief und glatt. Süß und sauber.',
      fr: 'Une huître creuse régulièrement roulée pendant sa croissance : petite, profonde, coquille lisse. Douce et nette.',
      en: 'A Pacific oyster tumbled regularly as it grows, which keeps it small, deep and smooth. Sweet and clean.',
    },
  },
  {
    art: 'bluff',
    group: 'world',
    name: 'Bluff',
    sci: 'Ostrea chilensis',
    where: { de: 'Foveaux Strait, Neuseeland', fr: 'Détroit de Foveaux, Nouvelle-Zélande', en: 'Foveaux Strait, New Zealand' },
    text: {
      de: 'Wilde flache Austern aus der Foveaux Strait, gefischt nur von März bis August. In Neuseeland jedes Jahr ein Ereignis.',
      fr: 'Huîtres plates sauvages du détroit de Foveaux, pêchées seulement de mars à août. Un événement chaque année en Nouvelle-Zélande.',
      en: 'Wild flat oysters from Foveaux Strait, dredged only from March to August. An event in New Zealand every year.',
    },
  },
];
