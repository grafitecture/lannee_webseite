/**
 * Das Jahr – zwölf Monate rund um Auster, Wein und Frankreich.
 * r: Monat mit „R“ (klassische Austernsaison September–April)
 */
export const MONTHS = [
  {
    n: 1, r: true, icon: 'crown',
    name: { fr: 'Janvier', de: 'Januar', en: 'January' },
    title: { de: 'Galette des Rois', fr: 'Galette des rois', en: 'Galette des Rois' },
    text: {
      de: 'Am 6. Januar kommt in Frankreich der Dreikönigskuchen auf den Tisch. Wer die Bohne findet, trägt die Krone. Und die Austern? In Bestform: kaltes Wasser, festes Fleisch.',
      fr: 'Le 6 janvier, la galette des rois arrive sur la table : la fève donne la couronne. Et les huîtres ? Au sommet : eau froide, chair ferme.',
      en: 'On 6 January, France cuts the king cake: whoever finds the bean wears the crown. And the oysters? At their best: cold water, firm flesh.',
    },
  },
  {
    n: 2, r: true, icon: 'lemon',
    name: { fr: 'Février', de: 'Februar', en: 'February' },
    title: { de: 'Zitronenzeit', fr: 'La saison du citron', en: 'Lemon season' },
    text: {
      de: 'Zitronen aus Menton und Sizilien sind jetzt am saftigsten. Ein Tropfen genügt: Die Auster soll nach Meer schmecken, nicht nach Zitrone.',
      fr: 'Les citrons de Menton et de Sicile sont à leur meilleur. Une goutte suffit : l’huître doit avoir le goût de la mer, pas du citron.',
      en: 'Lemons from Menton and Sicily are at their juiciest. One drop is enough: an oyster should taste of the sea, not of lemon.',
    },
  },
  {
    n: 3, r: true, icon: 'scallop',
    name: { fr: 'Mars', de: 'März', en: 'March' },
    title: { de: 'Saint-Jacques', fr: 'Saint-Jacques', en: 'Saint-Jacques' },
    text: {
      de: 'Die Jakobsmuschel aus der Bretagne und der Normandie hat Saison von Oktober bis Mai. Roh, mit etwas Olivenöl und Fleur de Sel: ein Gedicht.',
      fr: 'La coquille Saint-Jacques de Bretagne et de Normandie se pêche d’octobre à mai. Crue, un filet d’huile d’olive, une pincée de fleur de sel : un poème.',
      en: 'Scallops from Brittany and Normandy are in season from October to May. Raw, with a little olive oil and fleur de sel: pure poetry.',
    },
  },
  {
    n: 4, r: true, icon: 'asparagus',
    name: { fr: 'Avril', de: 'April', en: 'April' },
    title: { de: 'Das letzte R', fr: 'Le dernier R', en: 'The last R' },
    text: {
      de: 'Der letzte Monat mit R und der erste mit Spargel. Die Schwetzinger Stangen wachsen quasi vor unserer Haustür.',
      fr: 'Le dernier mois en R et le premier des asperges. Celles de Schwetzingen poussent presque devant notre porte.',
      en: 'The last month with an R and the first with asparagus. Schwetzingen’s famous spears grow practically on our doorstep.',
    },
  },
  {
    n: 5, r: false, icon: 'strawberry',
    name: { fr: 'Mai', de: 'Mai', en: 'May' },
    title: { de: 'Erdbeeren & Lillet', fr: 'Fraises & Lillet', en: 'Strawberries & Lillet' },
    text: {
      de: 'Kein R, aber Erdbeeren: Zeit für Lillet Tonic. Austern gibt es trotzdem, die alte Regel stammt aus Zeiten ohne Kühlung.',
      fr: 'Pas de R, mais des fraises : l’heure du Lillet tonic. Les huîtres restent au rendez-vous, la vieille règle date d’avant le froid.',
      en: 'No R, but strawberries: time for a Lillet tonic. Oysters stay on the menu; the old rule dates from before refrigeration.',
    },
  },
  {
    n: 6, r: false, icon: 'sun',
    name: { fr: 'Juin', de: 'Juni', en: 'June' },
    title: { de: 'Fête de la Musique', fr: 'Fête de la musique', en: 'Fête de la Musique' },
    text: {
      de: 'Am 21. Juni macht ganz Frankreich Musik auf der Straße. Wir halten es mit Rosé im Hof und den längsten Abenden des Jahres.',
      fr: 'Le 21 juin, toute la France joue dans la rue. Nous, on prend le rosé dans la cour et les plus longues soirées de l’année.',
      en: 'On 21 June all of France makes music in the streets. We’ll take rosé in the courtyard and the longest evenings of the year.',
    },
  },
  {
    n: 7, r: false, icon: 'flute',
    name: { fr: 'Juillet', de: 'Juli', en: 'July' },
    title: { de: '14 Juillet', fr: '14 Juillet', en: '14 Juillet' },
    text: {
      de: 'Frankreichs Nationalfeiertag. Austern sind jetzt oft „laiteuses“: milchiger und cremiger. Manche lieben genau das.',
      fr: 'Fête nationale. Les huîtres sont souvent laiteuses : plus crémeuses. Certains ne jurent que par elles.',
      en: 'Bastille Day. Oysters are often “laiteuses” now: milkier and creamier. Some people love exactly that.',
    },
  },
  {
    n: 8, r: false, icon: 'sardines',
    name: { fr: 'Août', de: 'August', en: 'August' },
    title: { de: 'Sardinen-Sommer', fr: 'L’été des sardines', en: 'Sardine summer' },
    text: {
      de: 'Hochsaison für Sardinen am Atlantik. Wer nicht ans Meer kommt, öffnet eine Dose: Die besten reifen darin wie Wein.',
      fr: 'Pleine saison de la sardine sur l’Atlantique. Pour ceux qui restent à terre : une boîte. Les meilleures s’y bonifient comme le vin.',
      en: 'Peak sardine season on the Atlantic. Can’t make it to the sea? Open a tin: the best ones age like wine.',
    },
  },
  {
    n: 9, r: true, icon: 'oyster',
    name: { fr: 'Septembre', de: 'September', en: 'September' },
    title: { de: 'Das erste R', fr: 'Le premier R', en: 'The first R' },
    text: {
      de: 'Die Austernsaison beginnt. Das Wasser kühlt ab, das Fleisch wird fest und jodig. Willkommen zurück.',
      fr: 'La saison de l’huître reprend. L’eau se rafraîchit, la chair se raffermit et s’iode. Bon retour.',
      en: 'Oyster season begins. The water cools, the flesh firms up and turns briny. Welcome back.',
    },
  },
  {
    n: 10, r: true, icon: 'moon',
    name: { fr: 'Octobre', de: 'Oktober', en: 'October' },
    title: { de: 'Nachtwandel', fr: 'Nachtwandel', en: 'Nachtwandel' },
    text: {
      de: 'Wenn der Jungbusch beim Nachtwandel seine Höfe öffnet, steht unser Tor ohnehin offen. Lange Abende, Kerzen, Crémant.',
      fr: 'Quand le Jungbusch ouvre ses cours pour le Nachtwandel, notre portail est déjà grand ouvert. Longues soirées, bougies, crémant.',
      en: 'When Jungbusch opens its courtyards for the Nachtwandel night walk, our gate is already open. Long evenings, candles, crémant.',
    },
  },
  {
    n: 11, r: true, icon: 'grapes',
    name: { fr: 'Novembre', de: 'November', en: 'November' },
    title: { de: 'Beaujolais Nouveau', fr: 'Beaujolais nouveau', en: 'Beaujolais Nouveau' },
    text: {
      de: 'Am dritten Donnerstag im November ist der Beaujolais Nouveau da. Jung, fruchtig, ein guter Grund zum Anstoßen.',
      fr: 'Le troisième jeudi de novembre, le beaujolais nouveau est arrivé. Jeune, fruité, une bonne raison de trinquer.',
      en: 'On the third Thursday of November, Beaujolais Nouveau arrives. Young, fruity, a good reason to raise a glass.',
    },
  },
  {
    n: 12, r: true, icon: 'oyster-open',
    name: { fr: 'Décembre', de: 'Dezember', en: 'December' },
    title: { de: 'Réveillon', fr: 'Réveillon', en: 'Réveillon' },
    text: {
      de: 'Austern und Champagner gehören in Frankreich zu Weihnachten und Silvester. Fast die Hälfte aller Austern des Jahres wird rund um die Feiertage gegessen.',
      fr: 'Huîtres et champagne au réveillon : en France, c’est sacré. Près de la moitié des huîtres de l’année se mangent pendant les fêtes.',
      en: 'In France, oysters and champagne belong to Christmas and New Year’s Eve. Nearly half of the year’s oysters are eaten over the holidays.',
    },
  },
];

/** Austerngrößen (huîtres creuses, Kaliber nach Gewicht in Gramm) */
export const CALIBRES = [
  { n: 0, min: 151, max: null },
  { n: 1, min: 121, max: 150 },
  { n: 2, min: 86, max: 120 },
  { n: 3, min: 66, max: 85 },
  { n: 4, min: 46, max: 65 },
  { n: 5, min: 30, max: 45 },
];
