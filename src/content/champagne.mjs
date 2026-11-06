/**
 * Champagner-Guide (Teil der Seite „Atlanten“, seit 06.11.2026, neben dem Austernatlas).
 * ---------------------------------------------------------------------------
 * Nur Text und Zahlen, keine Zeichnungen (die gibt es nur im Austernatlas). Balken für Dosage und
 * Flaschengrößen sind Daten, keine Illustration. Zahlen nach Comité Champagne / champagne.education
 * und dem Cahier des charges (Stand 2025/26): Rebfläche, Crus, Mindestreife, Dosage-Stufen, Formate.
 * Bei neuen Zahlen bitte in allen drei Sprachen ändern.
 */

/** Überschriften, Einleitungen und Navigation des Guides */
export const GUIDE = {
  title: { de: 'Champagner-Guide', fr: 'Le guide du champagne', en: 'Champagne guide' },
  lead: {
    de: 'Champagner ist Schaumwein mit Herkunft: Nur was in der Champagne nach ihren strengen Regeln entsteht, darf so heißen. Hier steht, was dahintersteckt – vom Weinberg bis ins Glas.',
    fr: 'Le champagne est un vin effervescent qui a une adresse : seul ce qui naît en Champagne, selon ses règles strictes, peut porter ce nom. Voici ce qu’il y a derrière, de la vigne au verre.',
    en: 'Champagne is sparkling wine with an address: only what is made in Champagne, under its strict rules, may carry the name. Here is what lies behind it, from vineyard to glass.',
  },
  navLabel: { de: 'Kapitel des Champagner-Guides', fr: 'Chapitres du guide du champagne', en: 'Champagne guide chapters' },
  sections: {
    facts: {
      title: { de: 'In Zahlen', fr: 'En chiffres', en: 'In numbers' },
    },
    regions: {
      title: { de: 'Anbaugebiete', fr: 'Les vignobles', en: 'Regions' },
      intro: {
        de: 'Die Champagne liegt rund 150 Kilometer nordöstlich von Paris, kühl und auf Kreide. Fünf Gebiete prägen ihren Geschmack.',
        fr: 'La Champagne s’étend à quelque 150 kilomètres au nord-est de Paris, fraîche et crayeuse. Cinq vignobles façonnent son goût.',
        en: 'Champagne lies some 150 kilometres north-east of Paris: cool, and on chalk. Five areas shape its taste.',
      },
    },
    grapes: {
      title: { de: 'Rebsorten', fr: 'Cépages', en: 'Grapes' },
      intro: {
        de: 'Drei Sorten machen fast den ganzen Champagner – und die meisten Champagner sind eine Mischung aus ihnen.',
        fr: 'Trois cépages font presque tout le champagne, et la plupart des champagnes les assemblent.',
        en: 'Three grapes make almost all champagne, and most champagnes blend them.',
      },
    },
    method: {
      title: { de: 'Herstellung', fr: 'Élaboration', en: 'How it’s made' },
      intro: {
        de: 'Die Méthode champenoise: Die Bulles entstehen in genau der Flasche, aus der später eingeschenkt wird. Elf Schritte, mindestens fünfzehn Monate.',
        fr: 'La méthode champenoise : les bulles naissent dans la bouteille même où l’on servira le vin. Onze étapes, quinze mois au moins.',
        en: 'The méthode champenoise: the bubbles are born in the very bottle you will pour from. Eleven steps, fifteen months at the very least.',
      },
    },
    taste: {
      title: { de: 'Geschmack', fr: 'Goût', en: 'Taste' },
      intro: {
        de: 'Wie trocken ein Champagner schmeckt, entscheidet die Dosage. Wie er duftet, entscheiden Trauben und Zeit.',
        fr: 'Le dosage décide de la sécheresse d’un champagne ; les raisins et le temps décident de ses arômes.',
        en: 'Dosage decides how dry a champagne tastes; grapes and time decide how it smells.',
      },
      dosage: { de: 'Dosage: wie trocken?', fr: 'Dosage : sec comment ?', en: 'Dosage: how dry?' },
      dosageNote: {
        de: 'Zucker pro Liter. Die Angabe steht auf jedem Etikett.',
        fr: 'Sucre par litre. La mention figure sur chaque étiquette.',
        en: 'Sugar per litre. It is stated on every label.',
      },
      aromas: { de: 'Aromen: von jung bis gereift', fr: 'Arômes : de la jeunesse à la maturité', en: 'Aromas: from young to mature' },
      tip: {
        de: '**Zu Austern:** Brut Nature, Extra Brut oder Brut, gern ein Blanc de Blancs. Je weniger Zucker, desto klarer kommen Salz und Jod zur Geltung.',
        fr: '**Avec les huîtres :** brut nature, extra-brut ou brut, volontiers un blanc de blancs. Moins il y a de sucre, mieux ressortent le sel et l’iode.',
        en: '**With oysters:** brut nature, extra brut or brut, ideally a blanc de blancs. The less sugar, the clearer the salt and iodine come through.',
      },
    },
    styles: {
      title: { de: 'Stile', fr: 'Styles', en: 'Styles' },
      intro: {
        de: 'Was auf dem Etikett steht und was es bedeutet.',
        fr: 'Ce qui figure sur l’étiquette, et ce que cela veut dire.',
        en: 'What it says on the label, and what it means.',
      },
    },
    sizes: {
      title: { de: 'Flaschengrößen', fr: 'Formats', en: 'Bottle sizes' },
      intro: {
        de: 'Vom Quart bis zum Melchisedech: Kein Wein kommt in so vielen Größen. Die großen tragen die Namen biblischer Könige.',
        fr: 'Du quart au melchisédech : aucun vin ne se décline en autant de formats. Les grands portent des noms de rois bibliques.',
        en: 'From the quart to the Melchizedek: no wine comes in as many sizes. The big ones bear the names of biblical kings.',
      },
      head: {
        name: { de: 'Name', fr: 'Nom', en: 'Name' },
        volume: { de: 'Inhalt', fr: 'Volume', en: 'Volume' },
        /* kurz sichtbar „× 75 cl“, vollständig für Screenreader */
        bottles: { de: 'Flaschen à 75 cl', fr: 'Bouteilles de 75 cl', en: '75 cl bottles' },
        glasses: { de: 'Gläser', fr: 'Verres', en: 'Glasses' },
      },
      note: {
        de: '„× 75 cl“: so viele Standardflaschen passen hinein; Gläser zu 12,5 cl gerechnet. Je größer die Flasche, desto weniger Luft im Verhältnis zum Wein – deshalb reift Champagner in der Magnum besonders schön.',
        fr: '« × 75 cl » : le nombre de bouteilles standard qu’elle contient ; verres de 12,5 cl. Plus la bouteille est grande, moins il y a d’air par rapport au vin : c’est pourquoi le champagne vieillit si bien en magnum.',
        en: '“× 75 cl”: how many standard bottles it holds; glasses of 12.5 cl. The bigger the bottle, the less air relative to the wine, which is why champagne ages so beautifully in magnum.',
      },
    },
    care: {
      title: { de: 'Lagern & Servieren', fr: 'Conserver & servir', en: 'Storing & serving' },
      intro: {
        de: 'Champagner kommt trinkreif in den Handel. Ein paar Handgriffe, und er schmeckt so, wie der Kellermeister ihn gemeint hat.',
        fr: 'Le champagne est prêt à boire dès sa mise en vente. Quelques gestes, et il aura le goût voulu par le chef de cave.',
        en: 'Champagne is ready to drink when it is sold. A few simple habits and it tastes the way the cellar master meant it to.',
      },
    },
    label: {
      title: { de: 'Etikett lesen', fr: 'Lire l’étiquette', en: 'Reading the label' },
      intro: {
        de: 'Klein gedruckt, meist am Rand: zwei Buchstaben und eine Nummer. Sie verraten, wer den Champagner gemacht hat.',
        fr: 'En petits caractères, souvent sur le bord : deux lettres et un numéro. Ils disent qui a élaboré le champagne.',
        en: 'In small print, usually at the edge: two letters and a number. They tell you who made the champagne.',
      },
      more: {
        de: 'Außerdem Pflicht: das Wort Champagne und die Dosage. Oft dabei: Jahrgang, Grand oder Premier Cru, Rebsorten und das Datum des Dégorgements.',
        fr: 'Également obligatoires : le mot Champagne et le dosage. Souvent présents : millésime, grand ou premier cru, cépages et date de dégorgement.',
        en: 'Also required: the word Champagne and the dosage. Often there too: vintage, grand or premier cru, grapes and the disgorgement date.',
      },
    },
    houses: {
      title: { de: 'Häuser & Winzer', fr: 'Maisons & vignerons', en: 'Houses & growers' },
      intro: {
        de: 'Die großen Häuser (Maisons) kaufen den Großteil ihrer Trauben bei Tausenden Winzern und pflegen einen Stil über Generationen. Immer mehr Winzer füllen ihren Champagner selbst ab – mit der Handschrift einer Lage.',
        fr: 'Les grandes maisons achètent l’essentiel de leurs raisins à des milliers de vignerons et cultivent un style au fil des générations. De plus en plus de vignerons élaborent eux-mêmes leur champagne, avec la signature d’un terroir.',
        en: 'The great houses buy most of their grapes from thousands of growers and keep a style alive for generations. More and more growers now bottle their own champagne, with the signature of a single place.',
      },
      housesTitle: { de: 'Große Häuser', fr: 'Grandes maisons', en: 'Great houses' },
      growersTitle: { de: 'Winzer, die man kennen sollte', fr: 'Vignerons à connaître', en: 'Growers worth knowing' },
      since: { de: 'seit', fr: 'depuis', en: 'since' },
      onMenu: { de: 'Bei uns auf der Karte', fr: 'À notre carte', en: 'On our menu' },
      german: {
        de: '**Übrigens:** Erstaunlich viele große Häuser haben deutsche Gründer – Krug aus Mainz, Bollinger aus Württemberg, Deutz und Geldermann aus Aachen, Mumm aus Frankfurt, Heidsieck aus Westfalen.',
        fr: '**D’ailleurs :** étonnamment, beaucoup de grandes maisons ont des fondateurs allemands : Krug venu de Mayence, Bollinger du Wurtemberg, Deutz et Geldermann d’Aix-la-Chapelle, Mumm de Francfort, Heidsieck de Westphalie.',
        en: '**By the way:** a surprising number of great houses had German founders – Krug from Mainz, Bollinger from Württemberg, Deutz and Geldermann from Aachen, Mumm from Frankfurt, Heidsieck from Westphalia.',
      },
    },
    glossary: {
      title: { de: 'Begriffe', fr: 'Lexique', en: 'Glossary' },
    },
  },
};

/** Reihenfolge der Kapitel (Navigation und Seite) */
export const GUIDE_ORDER = ['facts', 'regions', 'grapes', 'method', 'taste', 'styles', 'sizes', 'care', 'label', 'houses', 'glossary'];

/* In Zahlen ------------------------------------------------------------------ */

export const FACTS = [
  {
    value: { de: '34 300', fr: '34 300', en: '34,300' },
    unit: { de: 'Hektar', fr: 'hectares', en: 'hectares' },
    text: {
      de: 'Reben in 319 Gemeinden und fünf Départements.',
      fr: 'de vignes, sur 319 communes et cinq départements.',
      en: 'of vines in 319 villages across five départements.',
    },
  },
  {
    value: { de: '17', fr: '17', en: '17' },
    unit: { de: 'Grands Crus', fr: 'grands crus', en: 'grands crus' },
    text: {
      de: 'Gemeinden mit der höchsten Einstufung, dazu 42 Premiers Crus.',
      fr: 'communes au sommet du classement, plus 42 premiers crus.',
      en: 'villages with the top rating, plus 42 premiers crus.',
    },
  },
  {
    value: { de: '3', fr: '3', en: '3' },
    unit: { de: 'Rebsorten', fr: 'cépages', en: 'grapes' },
    text: {
      de: 'prägen fast alles: Pinot Noir, Meunier und Chardonnay.',
      fr: 'font presque tout : pinot noir, meunier et chardonnay.',
      en: 'make almost everything: Pinot Noir, Meunier and Chardonnay.',
    },
  },
  {
    value: { de: '15', fr: '15', en: '15' },
    unit: { de: 'Monate', fr: 'mois', en: 'months' },
    text: {
      de: 'reift Champagner ohne Jahrgang mindestens, Jahrgangschampagner drei Jahre.',
      fr: 'de cave au minimum sans millésime, trois ans pour un millésimé.',
      en: 'minimum ageing for non-vintage, three years for vintage champagne.',
    },
  },
  {
    value: { de: '6', fr: '6', en: '6' },
    unit: { de: 'bar', fr: 'bars', en: 'bar' },
    text: {
      de: 'Druck in der Flasche, mehr als doppelt so viel wie im Autoreifen.',
      fr: 'de pression dans la bouteille, plus du double d’un pneu de voiture.',
      en: 'of pressure in the bottle, more than twice a car tyre.',
    },
  },
  {
    value: { de: '16 000', fr: '16 000', en: '16,000' },
    unit: { de: 'Winzer', fr: 'vignerons', en: 'growers' },
    text: {
      de: 'besitzen den Großteil der Reben; den Häusern gehört nur rund ein Zehntel.',
      fr: 'possèdent l’essentiel du vignoble ; les maisons n’en détiennent qu’un dixième environ.',
      en: 'own most of the vineyards; the houses hold only around a tenth.',
    },
  },
];

/* Anbaugebiete --------------------------------------------------------------- */

export const REGIONS = [
  {
    id: 'montagne',
    name: 'Montagne de Reims',
    grape: 'Pinot Noir',
    text: {
      de: 'Ein bewaldeter Höhenzug zwischen Reims und Épernay. Hier wächst vor allem Pinot Noir, der dem Champagner Kraft, Körper und Struktur gibt.',
      fr: 'Un massif boisé entre Reims et Épernay. Le pinot noir y domine et donne au champagne puissance, corps et structure.',
      en: 'A wooded ridge between Reims and Épernay. Pinot Noir rules here, giving champagne power, body and structure.',
    },
    crus: 'Ambonnay, Beaumont-sur-Vesle, Bouzy, Louvois, Mailly-Champagne, Puisieulx, Sillery, Verzenay, Verzy',
  },
  {
    id: 'marne',
    name: 'Vallée de la Marne',
    grape: 'Meunier',
    text: {
      de: 'Die Hänge entlang der Marne, von Épernay nach Westen. Meunier verträgt die kühlen, frostgefährdeten Lagen und bringt Frucht und Rundung. In Hautvillers lebte Dom Pérignon.',
      fr: 'Les coteaux le long de la Marne, d’Épernay vers l’ouest. Le meunier y supporte le froid et le gel et apporte fruit et rondeur. Dom Pérignon vécut à Hautvillers.',
      en: 'The slopes along the Marne, running west from Épernay. Meunier copes with the cool, frost-prone sites and brings fruit and roundness. Dom Pérignon lived in Hautvillers.',
    },
    crus: 'Aÿ, Tours-sur-Marne',
  },
  {
    id: 'blancs',
    name: 'Côte des Blancs',
    grape: 'Chardonnay',
    text: {
      de: 'Ein Osthang südlich von Épernay auf reiner Kreide, fast nur Chardonnay. Daraus werden feine, straffe, langlebige Champagner – und die meisten Blanc de Blancs.',
      fr: 'Un coteau exposé à l’est, au sud d’Épernay, sur la craie pure, presque entièrement en chardonnay. Il en sort des champagnes fins, tendus, de longue garde, et la plupart des blancs de blancs.',
      en: 'An east-facing slope south of Épernay on pure chalk, almost all Chardonnay. It gives fine, taut, long-lived champagnes, and most blanc de blancs.',
    },
    crus: 'Avize, Chouilly, Cramant, Le Mesnil-sur-Oger, Oger, Oiry',
  },
  {
    id: 'sezanne',
    name: 'Côte de Sézanne',
    grape: 'Chardonnay',
    text: {
      de: 'Die südwestliche Verlängerung der Côte des Blancs. Etwas wärmer, der Chardonnay wird reifer und runder.',
      fr: 'Le prolongement de la Côte des Blancs vers le sud-ouest. Un peu plus chaud, le chardonnay y gagne en maturité et en rondeur.',
      en: 'The south-western extension of the Côte des Blancs. A little warmer, so the Chardonnay turns riper and rounder.',
    },
    crus: null,
  },
  {
    id: 'bar',
    name: 'Côte des Bar',
    grape: 'Pinot Noir',
    text: {
      de: 'Ganz im Süden, im Département Aube, näher an Chablis als an Reims und auf demselben Kimmeridge-Mergel. Reife, saftige Pinots; in Les Riceys entsteht sogar ein stiller Rosé.',
      fr: 'Tout au sud, dans l’Aube, plus près de Chablis que de Reims, sur les mêmes marnes kimméridgiennes. Des pinots mûrs et juteux ; aux Riceys naît même un rosé tranquille.',
      en: 'Far to the south in the Aube, closer to Chablis than to Reims and on the same Kimmeridgian marl. Ripe, juicy Pinots; Les Riceys even makes a still rosé.',
    },
    crus: null,
  },
];

export const REGION_UI = {
  grape: { de: 'Hauptsorte', fr: 'Cépage roi', en: 'Main grape' },
  crus: { de: 'Grands Crus', fr: 'Grands crus', en: 'Grands crus' },
};

/* Rebsorten ------------------------------------------------------------------ */

export const GRAPES = [
  {
    name: 'Pinot Noir',
    share: 38,
    color: { de: 'blau', fr: 'noir', en: 'black' },
    text: {
      de: 'Blaue Traube mit hellem Saft. Gibt Körper, Kraft und Aromen roter Früchte. Zu Hause in der Montagne de Reims und der Côte des Bar.',
      fr: 'Raisin noir à jus blanc. Il apporte corps, puissance et arômes de fruits rouges. Chez lui sur la Montagne de Reims et la Côte des Bar.',
      en: 'A black grape with clear juice. Brings body, power and red-fruit aromas. At home in the Montagne de Reims and the Côte des Bar.',
    },
  },
  {
    name: 'Meunier',
    share: 31,
    color: { de: 'blau', fr: 'noir', en: 'black' },
    text: {
      de: 'Blaue Traube, die spät austreibt und so dem Frost entgeht. Bringt Frucht und Rundung und macht Champagner früh zugänglich. Vor allem im Marnetal.',
      fr: 'Raisin noir au débourrement tardif, qui échappe ainsi au gel. Il apporte fruit et rondeur et rend le champagne accessible tôt. Surtout dans la vallée de la Marne.',
      en: 'A black grape that buds late and so escapes the frost. Brings fruit and roundness and makes champagne approachable early. Mostly in the Marne valley.',
    },
  },
  {
    name: 'Chardonnay',
    share: 31,
    color: { de: 'weiß', fr: 'blanc', en: 'white' },
    text: {
      de: 'Die weiße Traube. Steht für Frische, Finesse und Zitrus, mit den Jahren für Brioche und Haselnuss. Die Côte des Blancs ist ihr Revier.',
      fr: 'Le raisin blanc. Fraîcheur, finesse et agrumes, puis brioche et noisette avec les années. La Côte des Blancs est son domaine.',
      en: 'The white grape. Freshness, finesse and citrus, then brioche and hazelnut with age. The Côte des Blancs is its home turf.',
    },
  },
];

export const GRAPE_UI = {
  share: { de: 'der Fläche', fr: 'du vignoble', en: 'of plantings' },
  others: {
    de: 'Dazu vier alte Sorten, zusammen weniger als ein Prozent der Fläche: Arbane, Petit Meslier, Pinot Blanc und Pinot Gris.',
    fr: 'S’y ajoutent quatre cépages anciens, moins d’un pour cent du vignoble à eux tous : arbane, petit meslier, pinot blanc et pinot gris.',
    en: 'Plus four old varieties, together less than one per cent of plantings: Arbane, Petit Meslier, Pinot Blanc and Pinot Gris.',
  },
};

/* Herstellung ---------------------------------------------------------------- */

export const STEPS = [
  {
    name: { de: 'Lese', fr: 'Vendanges', en: 'Harvest' },
    text: {
      de: 'Nur von Hand und mit ganzen Trauben. Lesemaschinen sind in der Champagne verboten.',
      fr: 'Uniquement à la main, en grappes entières. Les machines à vendanger sont interdites en Champagne.',
      en: 'By hand only, in whole bunches. Harvesting machines are banned in Champagne.',
    },
  },
  {
    name: { de: 'Pressen', fr: 'Pressurage', en: 'Pressing' },
    text: {
      de: 'Schnell und sanft, damit der Saft der blauen Trauben hell bleibt. Aus 4 000 kg Trauben dürfen höchstens 2 550 Liter Most werden: zuerst die feine Cuvée, dann die kräftigere Taille.',
      fr: 'Vite et en douceur, pour que le jus des raisins noirs reste blanc. 4 000 kg de raisins donnent au plus 2 550 litres de moût : d’abord la cuvée, plus fine, puis la taille, plus corsée.',
      en: 'Quick and gentle, so the juice of the black grapes stays clear. 4,000 kg of grapes may give no more than 2,550 litres of must: first the fine cuvée, then the bolder taille.',
    },
  },
  {
    name: { de: 'Erste Gärung', fr: 'Première fermentation', en: 'First fermentation' },
    text: {
      de: 'Aus dem Most werden stille, sehr frische Grundweine, die Vins clairs – nach Lage, Sorte und Jahr getrennt.',
      fr: 'Le moût devient des vins tranquilles et très vifs, les vins clairs, séparés par cru, cépage et année.',
      en: 'The must becomes still, very fresh base wines, the vins clairs, kept apart by village, grape and year.',
    },
  },
  {
    name: { de: 'Assemblage', fr: 'Assemblage', en: 'Blending' },
    text: {
      de: 'Der Kellermeister verkostet Dutzende, oft Hunderte Grundweine und mischt sie, meist mit Reserveweinen aus älteren Jahren. So bleibt der Stil eines Hauses Jahr für Jahr gleich.',
      fr: 'Le chef de cave goûte des dizaines, souvent des centaines de vins clairs et les assemble, le plus souvent avec des vins de réserve. Ainsi le style d’une maison reste le même d’année en année.',
      en: 'The cellar master tastes dozens, often hundreds of base wines and blends them, usually with reserve wines from older years. That is how a house keeps its style year after year.',
    },
  },
  {
    name: { de: 'Tirage', fr: 'Tirage', en: 'Tirage' },
    text: {
      de: 'Ab dem 1. Januar nach der Lese wird abgefüllt, zusammen mit der Liqueur de tirage aus Wein, Zucker und Hefe. Verschlossen wird mit einem Kronkorken.',
      fr: 'À partir du 1ᵉʳ janvier suivant les vendanges, on met en bouteille avec la liqueur de tirage : vin, sucre et levures. Fermeture par une capsule.',
      en: 'From 1 January after the harvest, the wine is bottled with the liqueur de tirage of wine, sugar and yeast, and sealed with a crown cap.',
    },
  },
  {
    name: { de: 'Prise de mousse', fr: 'Prise de mousse', en: 'Prise de mousse' },
    text: {
      de: 'Die zweite Gärung in der Flasche: Die Hefe verwandelt den Zucker in Alkohol und Kohlensäure – die Bulles. Das dauert sechs bis acht Wochen.',
      fr: 'La seconde fermentation en bouteille : les levures transforment le sucre en alcool et en gaz carbonique, les bulles. Elle dure six à huit semaines.',
      en: 'The second fermentation in bottle: the yeast turns the sugar into alcohol and carbon dioxide – the bubbles. It takes six to eight weeks.',
    },
  },
  {
    name: { de: 'Reife auf der Hefe', fr: 'Vieillissement sur lies', en: 'Ageing on the lees' },
    text: {
      de: 'Die Flaschen liegen auf Latten im kühlen Kreidekeller. Die Hefe zersetzt sich langsam und schenkt Noten von Brioche und Toast. Mindestens 15 Monate, Jahrgangschampagner drei Jahre, oft viel länger.',
      fr: 'Les bouteilles reposent sur lattes dans la fraîcheur des caves de craie. Les levures se décomposent lentement et donnent des notes de brioche et de pain grillé. Quinze mois au moins, trois ans pour un millésimé, souvent bien plus.',
      en: 'The bottles rest on laths in cool chalk cellars. The yeast slowly breaks down and lends notes of brioche and toast. At least 15 months, three years for vintage, often far longer.',
    },
  },
  {
    name: { de: 'Remuage', fr: 'Remuage', en: 'Riddling' },
    text: {
      de: 'Rütteln: Die Flaschen werden über Wochen gedreht und immer steiler gestellt, bis die Hefe im Hals sitzt. Von Hand am Rüttelpult – erfunden 1816 bei Veuve Clicquot – oder in der Gyropalette.',
      fr: 'Les bouteilles sont tournées et redressées pendant des semaines, jusqu’à ce que le dépôt glisse dans le col. À la main sur pupitre, inventé en 1816 chez Veuve Clicquot, ou en gyropalette.',
      en: 'Over weeks the bottles are turned and tilted ever more steeply until the sediment sits in the neck. By hand on a riddling rack, invented at Veuve Clicquot in 1816, or in a gyropalette.',
    },
  },
  {
    name: { de: 'Dégorgement', fr: 'Dégorgement', en: 'Disgorging' },
    text: {
      de: 'Der Flaschenhals wird in eiskalter Lösung gefroren. Beim Öffnen schießt der Druck den Eispfropfen mit der Hefe heraus.',
      fr: 'Le col est plongé dans une solution glacée. À l’ouverture, la pression expulse le glaçon et le dépôt.',
      en: 'The neck is frozen in an ice-cold bath. When the cap comes off, the pressure shoots out the plug of ice with the yeast.',
    },
  },
  {
    name: { de: 'Dosage', fr: 'Dosage', en: 'Dosage' },
    text: {
      de: 'Ein Schluck Liqueur d’expédition aus Wein und Zucker ersetzt das Verlorene und bestimmt, wie trocken der Champagner schmeckt.',
      fr: 'Un trait de liqueur d’expédition, du vin et du sucre, comble le vide et décide de la sécheresse du champagne.',
      en: 'A dash of liqueur d’expédition, wine and sugar, tops up the bottle and decides how dry the champagne tastes.',
    },
  },
  {
    name: { de: 'Korken & Ruhe', fr: 'Bouchage & repos', en: 'Cork & rest' },
    text: {
      de: 'Korken, Drahtkappe (Muselet), dann ruht die Flasche meist noch einige Monate, bevor sie in den Verkauf geht.',
      fr: 'Bouchon, muselet, puis la bouteille se repose en général encore quelques mois avant d’être vendue.',
      en: 'Cork, wire cage (muselet), then the bottle usually rests a few more months before it goes on sale.',
    },
  },
];

/* Geschmack ------------------------------------------------------------------ */

/** Dosage-Stufen in g/l (min/max für den Balken auf der Skala 0–60) */
export const DOSAGE = [
  {
    name: 'Brut Nature',
    alias: { de: 'auch Dosage zéro, Pas dosé', fr: 'ou dosage zéro, non dosé', en: 'also zero dosage, pas dosé' },
    min: 0,
    max: 3,
    range: { de: '0–3 g/l', fr: '0 à 3 g/l', en: '0–3 g/l' },
    text: {
      de: 'Ohne zugesetzten Zucker. Pur, kreidig, sehr trocken.',
      fr: 'Sans sucre ajouté. Pur, crayeux, très sec.',
      en: 'No added sugar. Pure, chalky, bone dry.',
    },
  },
  {
    name: 'Extra Brut',
    min: 0,
    max: 6,
    range: { de: '0–6 g/l', fr: '0 à 6 g/l', en: '0–6 g/l' },
    text: { de: 'Sehr trocken, klar und präzise.', fr: 'Très sec, net et précis.', en: 'Very dry, clean and precise.' },
  },
  {
    name: 'Brut',
    min: 0,
    max: 12,
    range: { de: 'unter 12 g/l', fr: 'moins de 12 g/l', en: 'under 12 g/l' },
    text: {
      de: 'Der Klassiker – die meisten Champagner sind Brut. Trocken mit einem Hauch Rundung.',
      fr: 'Le classique : la plupart des champagnes sont bruts. Sec, avec une pointe de rondeur.',
      en: 'The classic: most champagne is brut. Dry, with a touch of roundness.',
    },
  },
  {
    name: 'Extra Dry',
    alias: { de: 'auch Extra Sec', fr: 'ou extra-sec', en: 'also extra sec' },
    min: 12,
    max: 17,
    range: { de: '12–17 g/l', fr: '12 à 17 g/l', en: '12–17 g/l' },
    text: {
      de: 'Trotz des Namens süßer als Brut: weich und fruchtig.',
      fr: 'Malgré son nom, plus doux qu’un brut : souple et fruité.',
      en: 'Despite the name, sweeter than brut: soft and fruity.',
    },
  },
  {
    name: 'Sec',
    min: 17,
    max: 32,
    range: { de: '17–32 g/l', fr: '17 à 32 g/l', en: '17–32 g/l' },
    text: {
      de: 'Spürbar süß. Schön zu Gerichten mit etwas Süße oder Würze.',
      fr: 'Nettement doux. Joli avec des plats sucrés-salés ou épicés.',
      en: 'Noticeably sweet. Lovely with dishes that have some sweetness or spice.',
    },
  },
  {
    name: 'Demi-Sec',
    min: 32,
    max: 50,
    range: { de: '32–50 g/l', fr: '32 à 50 g/l', en: '32–50 g/l' },
    text: { de: 'Süß – zum Dessert, zu Obst und Gebäck.', fr: 'Doux : au dessert, avec les fruits et les gâteaux.', en: 'Sweet: for dessert, fruit and pastries.' },
  },
  {
    name: 'Doux',
    min: 50,
    max: 60,
    open: true,
    range: { de: 'über 50 g/l', fr: 'plus de 50 g/l', en: 'over 50 g/l' },
    text: {
      de: 'Sehr süß und heute selten. So trank man Champagner im 19. Jahrhundert.',
      fr: 'Très doux et rare aujourd’hui. C’est ainsi qu’on buvait le champagne au XIXᵉ siècle.',
      en: 'Very sweet and rare today. This is how champagne was drunk in the 19th century.',
    },
  },
];

export const AROMAS = [
  {
    name: { de: 'Jung', fr: 'Jeune', en: 'Young' },
    text: {
      de: 'Zitrus, grüner Apfel, Birne, weiße Blüten, ein Hauch Kreide.',
      fr: 'Agrumes, pomme verte, poire, fleurs blanches, une touche de craie.',
      en: 'Citrus, green apple, pear, white flowers, a hint of chalk.',
    },
  },
  {
    name: { de: 'Lange auf der Hefe', fr: 'Longtemps sur lies', en: 'Long on the lees' },
    text: {
      de: 'Brioche, frisches Brot, Toast, Mandel, Haselnuss.',
      fr: 'Brioche, pain frais, pain grillé, amande, noisette.',
      en: 'Brioche, fresh bread, toast, almond, hazelnut.',
    },
  },
  {
    name: { de: 'Gereift', fr: 'Mûr', en: 'Mature' },
    text: {
      de: 'Honig, kandierte Früchte, getrocknete Aprikose, Pilze, Kaffee.',
      fr: 'Miel, fruits confits, abricot sec, sous-bois, café.',
      en: 'Honey, candied fruit, dried apricot, mushroom, coffee.',
    },
  },
];

/* Stile ---------------------------------------------------------------------- */

export const STYLES = [
  {
    name: { de: 'Ohne Jahrgang', fr: 'Brut sans année', en: 'Non-vintage' },
    alias: 'Brut sans année',
    text: {
      de: 'Die Visitenkarte jedes Hauses: Weine aus mehreren Jahren und Reserveweine, jedes Jahr im gleichen Stil.',
      fr: 'La carte de visite de chaque maison : des vins de plusieurs années et des vins de réserve, toujours dans le même style.',
      en: 'Every house’s calling card: wines from several years plus reserve wines, in the same style every year.',
    },
  },
  {
    name: { de: 'Jahrgang', fr: 'Millésimé', en: 'Vintage' },
    alias: 'Millésimé',
    text: {
      de: 'Nur aus einem einzigen, guten Jahr, das auf dem Etikett steht. Reift mindestens drei Jahre und verträgt oft Jahrzehnte.',
      fr: 'D’une seule belle année, inscrite sur l’étiquette. Trois ans de cave au moins, et souvent des décennies de garde.',
      en: 'From a single good year, shown on the label. At least three years in the cellar, and often decades of life.',
    },
  },
  {
    name: { de: 'Blanc de Blancs', fr: 'Blanc de blancs', en: 'Blanc de Blancs' },
    text: {
      de: 'Nur aus weißen Trauben, fast immer Chardonnay. Fein, frisch, kreidig – der Champagner für Austern.',
      fr: 'Uniquement de raisins blancs, presque toujours du chardonnay. Fin, frais, crayeux : le champagne des huîtres.',
      en: 'From white grapes only, almost always Chardonnay. Fine, fresh, chalky: the champagne for oysters.',
    },
  },
  {
    name: { de: 'Blanc de Noirs', fr: 'Blanc de noirs', en: 'Blanc de Noirs' },
    text: {
      de: 'Weißer Champagner aus blauen Trauben, Pinot Noir und Meunier. Voller, mit roter Frucht.',
      fr: 'Un champagne blanc issu de raisins noirs, pinot noir et meunier. Plus ample, aux fruits rouges.',
      en: 'White champagne from black grapes, Pinot Noir and Meunier. Fuller, with red fruit.',
    },
  },
  {
    name: { de: 'Rosé', fr: 'Rosé', en: 'Rosé' },
    text: {
      de: 'Meist mit etwas Rotwein aus der Champagne gemischt – eine Besonderheit der Region –, seltener durch kurzes Mazerieren der blauen Trauben (Saignée).',
      fr: 'Le plus souvent assemblé avec un peu de vin rouge de Champagne, une particularité de la région, plus rarement obtenu par courte macération des raisins noirs (saignée).',
      en: 'Usually blended with a little red wine from Champagne, a speciality of the region, more rarely made by briefly macerating the black grapes (saignée).',
    },
  },
  {
    name: { de: 'Prestige-Cuvée', fr: 'Cuvée de prestige', en: 'Prestige cuvée' },
    text: {
      de: 'Das Spitzenprodukt eines Hauses aus den besten Lagen und Jahren – etwa Dom Pérignon, Cristal oder La Grande Dame.',
      fr: 'Le sommet d’une maison, issu des meilleurs crus et années : Dom Pérignon, Cristal ou La Grande Dame, par exemple.',
      en: 'A house’s finest wine, from the best sites and years – Dom Pérignon, Cristal or La Grande Dame, for example.',
    },
  },
  {
    name: { de: 'Grand Cru · Premier Cru', fr: 'Grand cru · Premier cru', en: 'Grand Cru · Premier Cru' },
    text: {
      de: 'Trauben ausschließlich aus Grand-Cru- beziehungsweise Premier-Cru-Gemeinden.',
      fr: 'Raisins issus exclusivement de communes classées grand cru ou premier cru.',
      en: 'Grapes exclusively from grand cru or premier cru villages.',
    },
  },
  {
    name: { de: 'Coteaux Champenois', fr: 'Coteaux champenois', en: 'Coteaux Champenois' },
    text: {
      de: 'Stiller Wein aus der Champagne, weiß, rot oder rosé. Ohne Bulles – und darum kein Champagner.',
      fr: 'Le vin tranquille de Champagne, blanc, rouge ou rosé. Sans bulles, donc pas du champagne.',
      en: 'Still wine from Champagne, white, red or rosé. No bubbles, and so not champagne.',
    },
  },
];

/* Flaschengrößen (Comité Champagne) ------------------------------------------ */

export const SIZES = [
  { name: { de: 'Quart', fr: 'Quart', en: 'Quarter' }, litres: 0.2, bottles: '¼', glasses: '1–2', origin: { de: 'die Viertelflasche, „Piccolo“', fr: 'le quart de bouteille', en: 'the quarter bottle, “piccolo”' } },
  { name: { de: 'Demi', fr: 'Demie', en: 'Half' }, litres: 0.375, bottles: '½', glasses: '3', origin: { de: 'die halbe Flasche', fr: 'la demi-bouteille, ou fillette', en: 'the half bottle' } },
  { name: { de: 'Bouteille', fr: 'Bouteille', en: 'Bottle' }, litres: 0.75, bottles: '1', glasses: '6', origin: { de: 'die Standardflasche', fr: 'la bouteille champenoise', en: 'the standard bottle' } },
  { name: { de: 'Magnum', fr: 'Magnum', en: 'Magnum' }, litres: 1.5, bottles: '2', glasses: '12', origin: { de: 'lateinisch „groß“ – die Reifeflasche', fr: '« grand » en latin, le format de garde', en: 'Latin for “great”, the ageing bottle' } },
  { name: { de: 'Jeroboam', fr: 'Jéroboam', en: 'Jeroboam' }, litres: 3, bottles: '4', glasses: '24', origin: { de: 'erster König des Nordreichs Israel', fr: 'premier roi du royaume d’Israël', en: 'first king of the northern kingdom of Israel' } },
  { name: { de: 'Rehoboam', fr: 'Réhoboam', en: 'Rehoboam' }, litres: 4.5, bottles: '6', glasses: '36', origin: { de: 'Sohn Salomos, König von Juda', fr: 'fils de Salomon, roi de Juda', en: 'son of Solomon, king of Judah' } },
  { name: { de: 'Methusalem', fr: 'Mathusalem', en: 'Methuselah' }, litres: 6, bottles: '8', glasses: '48', origin: { de: 'der älteste Mensch der Bibel', fr: 'le doyen de la Bible', en: 'the oldest man in the Bible' } },
  { name: { de: 'Salmanazar', fr: 'Salmanazar', en: 'Salmanazar' }, litres: 9, bottles: '12', glasses: '72', origin: { de: 'König von Assyrien', fr: 'roi d’Assyrie', en: 'king of Assyria' } },
  { name: { de: 'Balthasar', fr: 'Balthazar', en: 'Balthazar' }, litres: 12, bottles: '16', glasses: '96', origin: { de: 'einer der Heiligen Drei Könige', fr: 'l’un des Rois mages', en: 'one of the Three Wise Men' } },
  { name: { de: 'Nebukadnezar', fr: 'Nabuchodonosor', en: 'Nebuchadnezzar' }, litres: 15, bottles: '20', glasses: '120', origin: { de: 'König von Babylon', fr: 'roi de Babylone', en: 'king of Babylon' } },
  { name: { de: 'Salomon', fr: 'Salomon', en: 'Solomon' }, litres: 18, bottles: '24', glasses: '144', origin: { de: 'König von Israel', fr: 'roi d’Israël', en: 'king of Israel' } },
  { name: { de: 'Souverain', fr: 'Souverain', en: 'Sovereign' }, litres: 26.25, bottles: '35', glasses: '210', origin: { de: 'der Herrscher', fr: 'le souverain', en: 'the ruler' } },
  { name: { de: 'Primat', fr: 'Primat', en: 'Primat' }, litres: 27, bottles: '36', glasses: '216', origin: { de: 'lateinisch „der Erste“, auch Goliath', fr: '« le premier » en latin, ou Goliath', en: 'Latin for “the first”, also Goliath' } },
  { name: { de: 'Melchisedek', fr: 'Melchisédech', en: 'Melchizedek' }, litres: 30, bottles: '40', glasses: '240', origin: { de: 'König von Salem, auch Midas', fr: 'roi de Salem, ou Midas', en: 'king of Salem, also Midas' } },
];

/* Lagern & Servieren --------------------------------------------------------- */

export const CARE = [
  {
    name: { de: 'Lagern', fr: 'Conserver', en: 'Storing' },
    points: {
      de: [
        'Dunkel, ruhig, gleichmäßig kühl: am besten 10–15 °C bei 60–80 % Luftfeuchte.',
        'Liegend oder stehend – für die Qualität macht das laut Comité Champagne keinen Unterschied.',
        'Ohne Jahrgang am besten in den nächsten Jahren trinken; Jahrgänge und Prestige-Cuvées reifen oft zehn Jahre und länger.',
        'Der Kühlschrank ist kein Keller: zum Kaltstellen ja, für Monate nein.',
      ],
      fr: [
        'Dans l’obscurité, au calme et au frais constant : idéalement 10 à 15 °C et 60 à 80 % d’humidité.',
        'Couchée ou debout : selon le Comité Champagne, cela ne change rien à la qualité.',
        'Un sans-année se boit dans les quelques années ; millésimes et cuvées de prestige vieillissent souvent dix ans et plus.',
        'Le réfrigérateur n’est pas une cave : pour rafraîchir, oui ; pour des mois, non.',
      ],
      en: [
        'Dark, still and evenly cool: ideally 10–15 °C at 60–80 % humidity.',
        'Lying down or standing up: according to the Comité Champagne it makes no difference to quality.',
        'Drink non-vintage within a few years; vintages and prestige cuvées often age for ten years or more.',
        'A fridge is not a cellar: fine for chilling, not for months.',
      ],
    },
  },
  {
    name: { de: 'Kühlen', fr: 'Rafraîchir', en: 'Chilling' },
    points: {
      de: [
        '8–10 °C sind ideal, gereifte Jahrgänge vertragen bis 12 °C.',
        'Im Eiskübel mit halb Wasser, halb Eis: rund 30 Minuten.',
        'Oder ein paar Stunden unten im Kühlschrank.',
        'Nie ins Gefrierfach – eiskalt schmeckt Champagner nach fast nichts.',
      ],
      fr: [
        '8 à 10 °C, c’est l’idéal ; jusqu’à 12 °C pour les millésimes mûrs.',
        'Dans un seau à moitié rempli d’eau et de glace : une trentaine de minutes.',
        'Ou quelques heures en bas du réfrigérateur.',
        'Jamais au congélateur : glacé, le champagne n’a presque plus de goût.',
      ],
      en: [
        '8–10 °C is ideal; mature vintages can take up to 12 °C.',
        'In an ice bucket half filled with water and ice: about 30 minutes.',
        'Or a few hours at the bottom of the fridge.',
        'Never in the freezer: ice-cold champagne tastes of almost nothing.',
      ],
    },
  },
  {
    name: { de: 'Öffnen & Einschenken', fr: 'Ouvrir & servir', en: 'Opening & pouring' },
    points: {
      de: [
        'Muselet lösen, den Daumen dabei auf dem Korken lassen.',
        'Die Flasche drehen, nicht den Korken – er gleitet mit einem leisen Seufzer heraus, ohne Knall.',
        'In zwei Zügen einschenken und das Glas zu etwa zwei Dritteln füllen.',
        'Lieber ein Tulpen- oder Weißweinglas als die enge Flöte oder die Schale: Darin entfalten sich die Aromen.',
      ],
      fr: [
        'Défaire le muselet en gardant le pouce sur le bouchon.',
        'Tourner la bouteille, pas le bouchon : il sort dans un soupir, sans détonation.',
        'Servir en deux fois et remplir le verre aux deux tiers environ.',
        'Préférer un verre tulipe ou à vin blanc à la flûte étroite ou à la coupe : les arômes s’y épanouissent.',
      ],
      en: [
        'Loosen the cage, keeping your thumb on the cork.',
        'Turn the bottle, not the cork: it slides out with a soft sigh, no bang.',
        'Pour in two goes and fill the glass about two-thirds.',
        'A tulip or white-wine glass beats a narrow flute or a coupe: the aromas open up in it.',
      ],
    },
  },
  {
    name: { de: 'Angebrochen', fr: 'Entamée', en: 'Once opened' },
    points: {
      de: [
        'Mit einem Champagnerverschluss in den Kühlschrank: So hält er sich zwei, drei Tage.',
        'Der Löffel im Flaschenhals hilft leider nicht – ein hübscher Mythos.',
      ],
      fr: [
        'Avec un bouchon hermétique, au réfrigérateur : il se garde deux ou trois jours.',
        'La petite cuillère dans le goulot ne sert à rien, hélas : un joli mythe.',
      ],
      en: [
        'With a champagne stopper, in the fridge: it keeps for two or three days.',
        'The spoon in the neck sadly does nothing. A charming myth.',
      ],
    },
  },
];

/* Etikett: Kürzel der Hersteller --------------------------------------------- */

export const CODES = [
  {
    code: 'NM',
    name: 'Négociant-manipulant',
    text: {
      de: 'Ein Haus, das Trauben (auch) zukauft und den Champagner selbst herstellt. Fast alle großen Marken.',
      fr: 'Une maison qui achète (aussi) des raisins et élabore elle-même son champagne. Presque toutes les grandes marques.',
      en: 'A house that buys in (some of its) grapes and makes the champagne itself. Almost all the big names.',
    },
  },
  {
    code: 'RM',
    name: 'Récoltant-manipulant',
    text: {
      de: 'Ein Winzer, der aus eigenen Trauben selbst Champagner macht: Winzerchampagner.',
      fr: 'Un vigneron qui élabore lui-même son champagne avec ses propres raisins : le champagne de vigneron.',
      en: 'A grower who makes champagne from their own grapes: grower champagne.',
    },
  },
  {
    code: 'CM',
    name: 'Coopérative de manipulation',
    text: {
      de: 'Eine Genossenschaft, die aus den Trauben ihrer Mitglieder Champagner macht und verkauft.',
      fr: 'Une coopérative qui élabore et vend le champagne issu des raisins de ses adhérents.',
      en: 'A cooperative that makes and sells champagne from its members’ grapes.',
    },
  },
  {
    code: 'RC',
    name: 'Récoltant-coopérateur',
    text: {
      de: 'Ein Winzer, der seinen Champagner von der Genossenschaft machen lässt und unter eigenem Namen verkauft.',
      fr: 'Un vigneron dont le champagne est élaboré par la coopérative et vendu sous son propre nom.',
      en: 'A grower whose champagne is made by the cooperative and sold under the grower’s own name.',
    },
  },
  {
    code: 'SR',
    name: 'Société de récoltants',
    text: {
      de: 'Mehrere Winzer, meist eine Familie, mit gemeinsamem Keller.',
      fr: 'Plusieurs vignerons, souvent une même famille, réunis autour d’une cuverie commune.',
      en: 'Several growers, often one family, sharing a cellar.',
    },
  },
  {
    code: 'ND',
    name: 'Négociant-distributeur',
    text: {
      de: 'Ein Händler, der fertige Flaschen kauft und unter eigenem Etikett verkauft.',
      fr: 'Un négociant qui achète des bouteilles finies et les vend sous sa propre étiquette.',
      en: 'A merchant who buys finished bottles and sells them under their own label.',
    },
  },
  {
    code: 'MA',
    name: 'Marque auxiliaire',
    text: {
      de: 'Eine Marke für einen Käufer, etwa einen Supermarkt oder ein Restaurant.',
      fr: 'Une marque créée pour un acheteur, une enseigne ou un restaurant par exemple.',
      en: 'A brand made for a buyer, such as a supermarket or a restaurant.',
    },
  },
];

/* Häuser & Winzer (Auswahl, nach Gründungsjahr) ----------------------- */

export const HOUSES = [
  {
    name: 'Gosset',
    place: 'Épernay',
    since: '1584',
    text: {
      de: 'Gegründet in Aÿ, damals noch für stillen Wein: das älteste Weinhaus der Champagne.',
      fr: 'Fondée à Aÿ, pour des vins tranquilles à l’époque : la plus ancienne maison de vin de Champagne.',
      en: 'Founded in Aÿ, for still wine back then: the oldest wine house in Champagne.',
    },
  },
  {
    name: 'Ruinart',
    place: 'Reims',
    since: '1729',
    text: {
      de: 'Das älteste Champagnerhaus. Berühmt für Blanc de Blancs und seine Kreidekeller.',
      fr: 'La plus ancienne maison de champagne. Célèbre pour son blanc de blancs et ses crayères.',
      en: 'The oldest champagne house. Famous for its blanc de blancs and its chalk cellars.',
    },
  },
  {
    name: 'Taittinger',
    place: 'Reims',
    since: '1734',
    text: {
      de: 'Viel Chardonnay, elegant; an der Spitze der Blanc de Blancs Comtes de Champagne.',
      fr: 'Beaucoup de chardonnay, de l’élégance ; au sommet, le blanc de blancs Comtes de Champagne.',
      en: 'Lots of Chardonnay, elegant; at the top, the Comtes de Champagne blanc de blancs.',
    },
  },
  {
    name: 'Moët & Chandon',
    place: 'Épernay',
    since: '1743',
    text: {
      de: 'Das größte Haus der Champagne, bekannt für den Brut Impérial. Dom Pérignon gehört dazu.',
      fr: 'La plus grande maison de Champagne, connue pour son Brut Impérial. Dom Pérignon lui appartient.',
      en: 'The largest house in Champagne, known for Brut Impérial. Dom Pérignon belongs to it.',
    },
  },
  {
    name: 'Lanson',
    place: 'Reims',
    since: '1760',
    text: {
      de: 'Frisch und straff, traditionell ohne biologischen Säureabbau.',
      fr: 'Frais et tendu, traditionnellement sans fermentation malolactique.',
      en: 'Fresh and taut, traditionally made without malolactic fermentation.',
    },
  },
  {
    name: 'Veuve Clicquot',
    place: 'Reims',
    since: '1772',
    text: {
      de: 'Die Witwe Clicquot erfand das Rüttelpult und 1818 den ersten Rosé durch Assemblage. Gelbes Etikett, viel Pinot Noir.',
      fr: 'La veuve Clicquot inventa la table de remuage et, en 1818, le premier rosé d’assemblage. Étiquette jaune, beaucoup de pinot noir.',
      en: 'The widow Clicquot invented the riddling rack and, in 1818, the first blended rosé. Yellow label, lots of Pinot Noir.',
    },
  },
  {
    name: 'Louis Roederer',
    place: 'Reims',
    since: '1776',
    text: {
      de: 'Familienhaus mit vielen eigenen Reben. Cristal entstand 1876 für Zar Alexander II.',
      fr: 'Maison familiale aux nombreuses vignes en propre. Cristal fut créé en 1876 pour le tsar Alexandre II.',
      en: 'A family house with many vineyards of its own. Cristal was created in 1876 for Tsar Alexander II.',
    },
  },
  {
    name: 'Jacquesson',
    place: 'Dizy',
    since: '1798',
    menu: 'jacquesson',
    text: {
      de: 'Hier wurde 1844 das Muselet patentiert. Heute nummerierte Cuvées der 700er-Reihe mit wenig Dosage.',
      fr: 'Le muselet y fut breveté en 1844. Aujourd’hui des cuvées numérotées de la série 700, peu dosées.',
      en: 'The wire cage was patented here in 1844. Today numbered cuvées of the 700 series, with little dosage.',
    },
  },
  {
    name: 'Perrier-Jouët',
    place: 'Épernay',
    since: '1811',
    text: {
      de: 'Blumig und fein, viel Chardonnay; die Belle Époque trägt Anemonen von Émile Gallé.',
      fr: 'Floral et fin, beaucoup de chardonnay ; la Belle Époque porte les anémones d’Émile Gallé.',
      en: 'Floral and fine, lots of Chardonnay; the Belle Époque bottle wears Émile Gallé’s anemones.',
    },
  },
  {
    name: 'Laurent-Perrier',
    place: 'Tours-sur-Marne',
    since: '1812',
    text: {
      de: 'Bekannt für seinen Rosé aus Mazeration und die Prestige-Cuvée Grand Siècle.',
      fr: 'Connue pour son rosé de macération et sa cuvée de prestige Grand Siècle.',
      en: 'Known for its macerated rosé and its prestige cuvée Grand Siècle.',
    },
  },
  {
    name: 'Billecart-Salmon',
    place: 'Mareuil-sur-Aÿ',
    since: '1818',
    text: {
      de: 'Familienhaus, sehr fein und präzise; berühmt für seinen Brut Rosé.',
      fr: 'Maison familiale, très fine et précise ; célèbre pour son brut rosé.',
      en: 'A family house, very fine and precise; famous for its brut rosé.',
    },
  },
  {
    name: 'Mumm',
    place: 'Reims',
    since: '1827',
    text: {
      de: 'Von Frankfurter Weinhändlern gegründet; der Cordon Rouge trägt die rote Schärpe.',
      fr: 'Fondée par des négociants en vin de Francfort ; le Cordon Rouge porte l’écharpe rouge.',
      en: 'Founded by wine merchants from Frankfurt; Cordon Rouge wears the red sash.',
    },
  },
  {
    name: 'Bollinger',
    place: 'Aÿ',
    since: '1829',
    text: {
      de: 'Pinot Noir, Gärung im Holzfass, kräftig und tief. La Grande Année, R.D. – und James Bond.',
      fr: 'Pinot noir, fermentation en fût, puissance et profondeur. La Grande Année, R.D. et James Bond.',
      en: 'Pinot Noir, barrel fermentation, powerful and deep. La Grande Année, R.D., and James Bond.',
    },
  },
  {
    name: 'Deutz',
    place: 'Aÿ',
    since: '1838',
    text: {
      de: 'Von zwei Aachenern gegründet; fein, mit viel Chardonnay, an der Spitze Amour de Deutz.',
      fr: 'Fondée par deux négociants d’Aix-la-Chapelle ; fine, riche en chardonnay, avec Amour de Deutz au sommet.',
      en: 'Founded by two men from Aachen; fine, Chardonnay-led, with Amour de Deutz at the top.',
    },
  },
  {
    name: 'Krug',
    place: 'Reims',
    since: '1843',
    text: {
      de: 'Alles im kleinen Holzfass vergoren. Die Grande Cuvée vereint über hundert Weine aus mehr als zehn Jahren.',
      fr: 'Tout est fermenté en petits fûts. La Grande Cuvée réunit plus de cent vins de plus de dix années.',
      en: 'Everything fermented in small casks. Grande Cuvée brings together over a hundred wines from more than ten years.',
    },
  },
  {
    name: 'Pol Roger',
    place: 'Épernay',
    since: '1849',
    text: {
      de: 'Familienhaus mit einem berühmten Stammkunden: Winston Churchill, nach dem die Prestige-Cuvée heißt.',
      fr: 'Maison familiale au client illustre : Winston Churchill, qui a donné son nom à la cuvée de prestige.',
      en: 'A family house with a famous regular: Winston Churchill, after whom the prestige cuvée is named.',
    },
  },
  {
    name: 'Pommery',
    place: 'Reims',
    since: '1858',
    text: {
      de: 'Madame Pommery brachte 1874 den ersten Brut auf den Markt. Riesige Kreidekeller.',
      fr: 'Madame Pommery lança en 1874 le premier brut. D’immenses crayères.',
      en: 'Madame Pommery launched the first brut in 1874. Vast chalk cellars.',
    },
  },
  {
    name: 'Salon',
    place: 'Le Mesnil-sur-Oger',
    since: '1905',
    text: {
      de: 'Nur ein einziger Wein: Blanc de Blancs aus Le Mesnil, nur in großen Jahren.',
      fr: 'Un seul vin : un blanc de blancs du Mesnil, dans les grandes années seulement.',
      en: 'Just one wine: blanc de blancs from Le Mesnil, made only in great years.',
    },
  },
  {
    name: 'Nicolas Feuillatte',
    place: 'Chouilly',
    since: '1976',
    text: {
      de: 'Die bekannteste Marke einer Genossenschaft: Tausende Winzer liefern zu.',
      fr: 'La marque coopérative la plus connue, alimentée par des milliers de vignerons.',
      en: 'The best-known cooperative brand, supplied by thousands of growers.',
    },
  },
];

export const GROWERS = [
  {
    name: 'Jacques Selosse',
    place: 'Avize',
    text: {
      de: 'Anselme Selosse machte den Winzerchampagner berühmt: im Holz ausgebaut, eigenwillig, sehr gesucht.',
      fr: 'Anselme Selosse a rendu célèbre le champagne de vigneron : élevé sous bois, singulier, très recherché.',
      en: 'Anselme Selosse made grower champagne famous: oak-aged, idiosyncratic, much sought after.',
    },
  },
  {
    name: 'Egly-Ouriet',
    place: 'Ambonnay',
    text: {
      de: 'Kraftvoller Pinot Noir aus Grand-Cru-Lagen, lange auf der Hefe.',
      fr: 'Un pinot noir puissant issu de grands crus, longuement vieilli sur lies.',
      en: 'Powerful grand cru Pinot Noir, aged long on the lees.',
    },
  },
  {
    name: 'Larmandier-Bernier',
    place: 'Vertus',
    text: {
      de: 'Biodynamisch, Chardonnay der Côte des Blancs, wenig Dosage.',
      fr: 'En biodynamie, chardonnay de la Côte des Blancs, peu dosé.',
      en: 'Biodynamic Côte des Blancs Chardonnay, with little dosage.',
    },
  },
  {
    name: 'Pierre Péters',
    place: 'Le Mesnil-sur-Oger',
    text: {
      de: 'Blanc de Blancs wie aus Kreide gemeißelt, berühmt ist die Lage Les Chétillons.',
      fr: 'Des blancs de blancs comme taillés dans la craie, dont le célèbre Les Chétillons.',
      en: 'Blanc de blancs as if carved from chalk, including the famous Les Chétillons.',
    },
  },
  {
    name: 'Agrapart',
    place: 'Avize',
    text: {
      de: 'Chardonnay von alten Reben, präzise und salzig.',
      fr: 'Du chardonnay de vieilles vignes, précis et salin.',
      en: 'Old-vine Chardonnay, precise and saline.',
    },
  },
  {
    name: 'Chartogne-Taillet',
    place: 'Merfy',
    text: {
      de: 'Aus dem fast vergessenen Norden bei Reims: Einzellagen, sehr lebendig.',
      fr: 'Du nord presque oublié, près de Reims : des parcellaires très vivants.',
      en: 'From the almost forgotten north near Reims: single sites, very lively.',
    },
  },
  {
    name: 'Jérôme Prévost',
    place: 'Gueux',
    text: {
      de: 'Nur Meunier, aus einer einzigen Lage: La Closerie.',
      fr: 'Uniquement du meunier, d’une seule parcelle : La Closerie.',
      en: 'Only Meunier, from a single site: La Closerie.',
    },
  },
  {
    name: 'Vouette & Sorbée',
    place: 'Buxières-sur-Arce',
    text: {
      de: 'Côte des Bar, biodynamisch und ohne Dosage.',
      fr: 'Côte des Bar, en biodynamie et sans dosage.',
      en: 'Côte des Bar, biodynamic, with no dosage.',
    },
  },
];

/* Begriffe ------------------------------------------------------------------- */

export const GLOSSARY = [
  {
    term: 'Assemblage',
    text: { de: 'Das Mischen der Grundweine.', fr: 'Le mariage des vins clairs.', en: 'Blending the base wines.' },
  },
  {
    term: 'Bulles',
    text: { de: 'So heißt bei uns alles, was perlt.', fr: 'Chez nous, tout ce qui pétille.', en: 'What we call everything that sparkles.' },
  },
  {
    term: 'Crayères',
    text: {
      de: 'Gallo-römische Kreidegruben unter Reims, heute Keller der Häuser – seit 2015 Welterbe.',
      fr: 'Carrières de craie gallo-romaines sous Reims, devenues caves des maisons, au patrimoine mondial depuis 2015.',
      en: 'Gallo-Roman chalk pits under Reims, now the houses’ cellars and a World Heritage site since 2015.',
    },
  },
  {
    term: 'Cuvée',
    text: {
      de: 'Der erste, feinste Saft aus der Presse – und die Mischung, die in die Flasche kommt.',
      fr: 'Le premier jus, le plus fin, et aussi l’assemblage mis en bouteille.',
      en: 'The first and finest juice from the press, and also the blend that goes into the bottle.',
    },
  },
  {
    term: 'Échelle des crus',
    text: {
      de: 'Die alte Rangliste der Gemeinden von 80 bis 100 Prozent; 100 Prozent heißt Grand Cru.',
      fr: 'L’ancien classement des communes, de 80 à 100 % ; 100 % signifie grand cru.',
      en: 'The old ranking of villages from 80 to 100 per cent; 100 per cent means grand cru.',
    },
  },
  {
    term: 'Gyropalette',
    text: {
      de: 'Maschine, die ganze Paletten rüttelt – in Tagen statt Wochen.',
      fr: 'Machine qui remue des palettes entières, en quelques jours au lieu de semaines.',
      en: 'A machine that riddles whole pallets in days rather than weeks.',
    },
  },
  {
    term: 'Liqueur d’expédition',
    text: {
      de: 'Wein und Zucker, nach dem Dégorgement zugegeben: die Dosage.',
      fr: 'Vin et sucre ajoutés après le dégorgement : le dosage.',
      en: 'Wine and sugar added after disgorging: the dosage.',
    },
  },
  {
    term: 'Liqueur de tirage',
    text: {
      de: 'Wein mit Zucker und Hefe, der die zweite Gärung in Gang setzt.',
      fr: 'Vin, sucre et levures qui déclenchent la seconde fermentation.',
      en: 'Wine with sugar and yeast that sets off the second fermentation.',
    },
  },
  {
    term: 'Muselet',
    text: {
      de: 'Die Drahtkappe über dem Korken, 1844 von Adolphe Jacquesson patentiert.',
      fr: 'La cage de fil de fer sur le bouchon, brevetée en 1844 par Adolphe Jacquesson.',
      en: 'The wire cage over the cork, patented by Adolphe Jacquesson in 1844.',
    },
  },
  {
    term: 'Pupitre',
    text: {
      de: 'Das hölzerne Rüttelpult mit schrägen Löchern für die Remuage.',
      fr: 'Le pupitre de bois aux trous inclinés, pour le remuage.',
      en: 'The wooden riddling rack with angled holes.',
    },
  },
  {
    term: 'Sur lattes',
    text: {
      de: 'Auf Latten liegend: die Reife auf der Hefe im Keller.',
      fr: 'Le vieillissement sur lies, les bouteilles couchées sur lattes.',
      en: 'Lying on laths: the ageing on the lees in the cellar.',
    },
  },
  {
    term: 'Taille',
    text: {
      de: 'Der zweite, kräftigere Teil des Pressmosts.',
      fr: 'La seconde partie du jus de presse, plus corsée.',
      en: 'The second, bolder part of the pressed juice.',
    },
  },
  {
    term: 'Vin de réserve',
    text: {
      de: 'Wein aus früheren Jahren, der den Stil eines Hauses gleich hält.',
      fr: 'Vin des années passées, gardien du style de la maison.',
      en: 'Wine from earlier years that keeps a house’s style consistent.',
    },
  },
  {
    term: 'Vins clairs',
    text: {
      de: 'Die stillen Grundweine vor der zweiten Gärung.',
      fr: 'Les vins tranquilles avant la prise de mousse.',
      en: 'The still base wines before the second fermentation.',
    },
  },
];
