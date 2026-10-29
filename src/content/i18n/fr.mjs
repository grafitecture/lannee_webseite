/** Textes français. La typographie française (espaces insécables) est appliquée automatiquement. */
export default {
  locale: 'fr',
  intl: 'fr-FR',
  langName: 'Français',
  ogLocale: 'fr_FR',

  ui: {
    skip: 'Aller au contenu',
    menu: 'Menu',
    close: 'Fermer',
    mainNav: 'Navigation principale',
    langNav: 'Choisir la langue',
    nav: { garage: 'Garage', kiosque: 'Kiosque', marche: 'Marché', carte: 'La carte', annee: 'L’année', contact: 'Contact' },
    home: 'Accueil',
    days: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    daysShort: ['lu', 'ma', 'me', 'je', 've', 'sa', 'di'],
    time: { from: 'dès {t}', range: 'de {a} à {b}' },
    clock: {
      title: 'Où trouver des huîtres en ce moment ?',
      open: 'Ouvert en ce moment',
      next: 'Prochain rendez-vous',
      today: 'aujourd’hui',
      tomorrow: 'demain',
      inDays: 'dans {n} jours',
      since: 'depuis {t}',
      until: 'jusqu’à {t}',
      paused: 'Relâche cette fois',
      label: 'Horloge de la semaine : les arcs indiquent nos horaires du lundi au dimanche, l’aiguille l’heure actuelle.',
      fallback: 'Vendredi et samedi dès 18 h au Garage, samedi de 8 h à 13 h au Marché, dimanche dès 10 h au Kiosque.',
    },
    map: { title: 'Itinéraire', google: 'Google Maps', apple: 'Plans (Apple)', osm: 'OpenStreetMap', note: 'Liens externes' },
    closure: { one: '**{names} fait relâche :** {when}', many: '**{names} font relâche :** {when}' },
    facts: { when: 'Quand', where: 'Où', mail: 'E-mail', more: 'Aussi' },
    footer: {
      tagline: 'Huîtres & Bulles à Mannheim',
      legal: 'Informations légales',
      impressum: 'Mentions légales',
      datenschutz: 'Confidentialité',
      design: 'Design',
      top: 'Haut de page',
    },
    toMenu: 'Voir toute la carte',
    external: '(ouvre un site externe)',
    visualisation: 'Visualisation',
    demoNotice: 'Ce site sert uniquement à la présentation et il est fictif.',
  },

  pages: {
    home: {
      title: 'L’ANNÉE – Huîtres & bulles à Mannheim',
      description:
        'Huîtres, crémant et champagne en trois lieux à Mannheim : le Garage dans le Jungbusch, le Kiosque sur la Lindenhofplatz et le Marché au marché du Lindenhof.',
      h1: 'L’ANNÉE – Huîtres & Bulles à Mannheim',
      lead: 'Des huîtres, des bulles et une petite place au soleil. En trois lieux à Mannheim, chaque week-end.',
      ctaMenu: 'Voir la carte',
      ctaWhere: 'Où nous trouver',
      weekend: {
        heading: 'Un week-end, trois adresses.',
        lead: 'En semaine, on va chercher les huîtres, on polit les verres et on fait la grasse matinée. Dès le vendredi soir, vous nous trouvez ici :',
        notes: {
          'garage-5': 'Le portail s’ouvre.',
          'marche-6': 'Au marché, jusqu’à 13 h.',
          'garage-6': 'Deuxième service dans la cour.',
          'kiosque-7': 'La fenêtre du dimanche.',
        },
      },
      places: {
        garage: {
          heading: 'Bonsoir dans la cour.',
          body: 'Le vendredi et le samedi dès 18 h, nous ouvrons le portail de la Beilstraße. Sous la vigne : huîtres sur glace, crevettes à partager, tarte sortie du four et bulles de Loire et de Champagne. Réserver ? Ce n’est pas notre genre. Passez simplement, on vous trouvera une place.',
          cta: 'Découvrir le Garage',
        },
        kiosque: {
          heading: 'Bonjour, dimanche.',
          body: 'Le dimanche dès 10 h, nous levons le rideau sur la Lindenhofplatz. Une huître au petit-déjeuner, un verre de crémant à midi, des sardines à l’huile entre les deux. Le week-end peut bien durer encore un peu.',
          cta: 'Découvrir le Kiosque',
        },
        marche: {
          heading: 'Le samedi à huit heures, la mer est déjà là.',
          body: 'Notre remorque blanche s’installe le samedi de 8 h à 13 h au marché du Lindenhof. Huîtres ouvertes à la minute, un verre de blanc, ou une douzaine à emporter. Les autres escales du Marché sont annoncées à l’avance.',
          cta: 'Découvrir le Marché',
        },
      },
      carte: {
        heading: 'À la carte.',
        lead: 'Des huîtres de France et d’Irlande, des fruits de mer à partager, de quoi grignoter et beaucoup de bulles. Tout n’est pas proposé partout : la carte vous dit où.',
        cta: 'Voir toute la carte',
      },
      year: {
        heading: 'Les huîtres ont un calendrier.',
        body: 'Autrefois, on ne mangeait les huîtres que les mois en R. Pourquoi, quand arrive le beaujolais, et ce qui se déguste en décembre : notre année, mois par mois.',
        now: 'Nous sommes en {month} :',
        cta: 'Voir l’année',
      },
      insta: 'Fermetures, rendez-vous spéciaux et arrivages du moment : sur Instagram.',
    },

    garage: {
      title: 'Garage – huîtres & vins dans le Jungbusch | L’ANNÉE',
      description:
        'Le Garage de L’ANNÉE : huîtres, crémant et champagne dans la cour du 6, Beilstraße, à Mannheim-Jungbusch. Vendredi et samedi dès 18 h, sans réservation.',
      h1: 'Garage',
      subtitle: 'Garage à huîtres & vins',
      when: 'Vendredi & samedi dès 18 h',
      quote: 'Nous ne prenons pas de réservations : passez simplement, on vous trouvera une place.',
      intro: {
        heading: 'Une cour, un portail, un bateau.',
        body: [
          'Derrière le portail de la Beilstraße se cache une cour qu’on n’attend pas dans le Jungbusch : de la vigne sur le treillage, des chaises de bistrot, des guirlandes lumineuses. À l’intérieur, les verres pendent du plafond, un voilier orne le mur, et le comptoir est un vieux bateau en bois.',
          'On y sert ce qu’on aime manger nous-mêmes : huîtres sur glace, crevettes à partager, sardines en boîte, tarte du four. Avec un crémant de Loire, du champagne ou un verre de malbec de Cahors.',
        ],
      },
      menu: { heading: 'Ce soir au Garage' },
      quarter: {
        heading: 'Le Jungbusch',
        body: 'Le quartier du port de Mannheim : bistrots, ateliers, musique, le canal à deux pas. Un bon endroit pour des huîtres. Le Rhin n’est pas la mer, mais il s’y jette.',
      },
      directions: {
        heading: 'Accès',
        body: 'Venez de préférence à pied ou à vélo : les places de parking sont rares dans le Jungbusch.',
      },
    },

    kiosque: {
      title: 'Kiosque – huîtres du dimanche au Lindenhof | L’ANNÉE',
      description:
        'Le Kiosque de L’ANNÉE, Lindenhofplatz 1 à Mannheim : le dimanche dès 10 h, huîtres, crémant et petites assiettes.',
      h1: 'Kiosque',
      subtitle: 'Kiosque à huîtres & vins',
      when: 'Dimanche dès 10 h',
      quote: 'Le dimanche, d’autres vont à la boulangerie. Nous, on ouvre des huîtres.',
      intro: {
        heading: 'Dimanche, dix heures, Lindenhofplatz.',
        body: [
          'Le Kiosque, c’est notre fenêtre du dimanche sur la place. Un comptoir, quelques places au soleil, des huîtres sur glace et des bulles bien fraîches. Un dimanche n’en demande pas plus.',
          'À la carte : fines de claire et spéciales, huîtres d’Irlande, croquettes de crevettes grises, saumon fumé et sardines. Avec un crémant, un muscadet ou une citronnade maison.',
        ],
      },
      menu: { heading: 'Le dimanche au Kiosque' },
      quarter: {
        heading: 'Le Lindenhof',
        body: 'Entre la gare centrale et le Rhin : des immeubles anciens, beaucoup de verdure, le Waldpark tout près. Un quartier qui fait la grasse matinée le dimanche, puis prend volontiers l’apéritif.',
      },
      directions: {
        heading: 'Accès',
        body: 'À quelques minutes à pied de la gare centrale.',
      },
    },

    marche: {
      title: 'Marché – huîtres au marché du Lindenhof | L’ANNÉE',
      description:
        'Le Marché de L’ANNÉE : le samedi de 8 h à 13 h au marché du Lindenhof à Mannheim. Huîtres ouvertes à la minute, un verre de vin et des huîtres à emporter.',
      h1: 'Marché',
      subtitle: 'Huîtres & Bulles sur roues',
      when: 'Samedi, de 8 h à 13 h',
      whereText: 'Marché du Lindenhof, Mannheim',
      more: 'Autres lieux et dates annoncés au fur et à mesure.',
      quote: 'Entre les légumes et les fleurs : une douzaine, s’il vous plaît.',
      intro: {
        heading: 'Une remorque, deux ardoises.',
        body: [
          'Le samedi, le Marché s’installe au marché du Lindenhof. Entre les légumes et les fleurs, on ouvre des huîtres, on sert un verre de blanc et on ajoute une coupelle d’olives.',
          'Plutôt à la maison ? Emportez votre douzaine. Nous la mettons sur glace et vous montrons volontiers comment ouvrir une huître.',
        ],
      },
      menu: { heading: 'Aujourd’hui à l’ardoise' },
      dates: {
        heading: 'Où trouver le Marché',
        regular: 'Chaque samedi, de 8 h à 13 h',
        regularPlace: 'Marché du Lindenhof, Mannheim',
        empty: 'Pas de date spéciale pour le moment. Les prochaines escales sont annoncées ici et sur Instagram.',
      },
      invite: {
        heading: 'Inviter le Marché',
        body: 'Fête dans la cour, mariage, soirée d’entreprise ? Le Marché est une remorque : il se déplace aussi chez vous. Dites-nous où et quand, nous revenons vers vous.',
        cta: 'Écrire une demande',
        subject: 'Demande Marché',
      },
    },

    carte: {
      title: 'La carte – huîtres, bulles & petites assiettes | L’ANNÉE',
      description:
        'La carte de L’ANNÉE : huîtres de France et d’Irlande, crevettes, sardines, tartes, crémant, champagne et vins. Filtrable par Garage, Kiosque et Marché.',
      h1: 'La Carte',
      lead: 'Ce que nous aimons manger et boire. Tout n’est pas proposé partout : choisissez un lieu, la carte vous montre ce qui s’y trouve.',
      filter: { label: 'Filtrer la carte par lieu', all: 'Tous les lieux' },
      taste: { label: 'Goût', iode: 'Iodé', chair: 'Charnu', noisette: 'Noisette' },
      veg: 'végétarien',
      onlyAt: 'Uniquement ici :',
      price: 'Prix',
      from: 'dès',
      notes: [
        'Prix en euros, TVA comprise.',
        'Pour les allergènes et additifs, demandez à notre équipe.',
        'Les huîtres sont servies crues. Nous les déconseillons aux femmes enceintes et aux personnes immunodéprimées.',
      ],
    },

    annee: {
      title: 'L’année – le calendrier de l’huître | L’ANNÉE',
      description:
        'Douze mois autour de l’huître, du vin et de la France : la règle des mois en R, les calibres et comment bien déguster une huître.',
      h1: 'L’Année',
      lead: 'L’ANNÉE, c’est une année entière. Et l’huître a son calendrier.',
      ringLabel: 'Horloge de l’année : les mois mis en avant contiennent un R, l’aiguille indique le mois en cours.',
      rMonth: 'Mois en R',
      now: 'Maintenant',
      rule: {
        heading: 'La règle des mois en R',
        body: [
          'Autrefois, on disait : des huîtres seulement les mois en R, de septembre à avril. La raison tenait moins au goût qu’à l’été. Sans froid, les huîtres se gâtaient vite sur la route de l’intérieur des terres, et l’été, elles se reproduisent.',
          'Aujourd’hui, les huîtres voyagent au frais et passent en quelques heures du parc au comptoir. L’été, elles sont souvent laiteuses : plus crémeuses. Les huîtres fermes et iodées restent une affaire d’hiver.',
        ],
      },
      calibres: {
        heading: 'Plus le chiffre est petit, plus l’huître est grosse.',
        body: 'En France, les huîtres sont classées selon leur poids. La nº 3 est la classique de l’apéritif, la nº 2 celle des gourmands.',
        over: 'plus de {g} g',
        range: '{a} à {b} g',
      },
      howto: {
        heading: 'Déguster une huître en quatre temps',
        steps: [
          { title: 'Regarder', text: 'Une huître fraîche est pleine, brillante et sent la mer, jamais le poisson.' },
          { title: 'Jeter la première eau', text: 'Videz la première eau. Après une ou deux minutes, l’huître en refait, plus douce et plus ronde.' },
          { title: 'Détacher et assaisonner', text: 'Détachez le muscle avec la petite fourchette. Une goutte de citron ou de mignonnette, ou nature.' },
          { title: 'Mâcher', text: 'Ne pas avaler d’un coup : deux ou trois mastications, et viennent le sel, la noisette, la douceur. Buvez le jus pour finir.' },
        ],
      },
      pairing: {
        heading: 'Que boire avec',
        items: [
          { name: 'Muscadet', text: 'Salin et tendu. Le classique avec une fine de claire.' },
          { name: 'Chablis', text: 'Crayeux et minéral, pour les huîtres charnues.' },
          { name: 'Picpoul de Pinet', text: 'Il pousse au bord de l’étang de Thau.' },
          { name: 'Crémant & champagne', text: 'Les bulles rafraîchissent le palais avant l’huître suivante.' },
        ],
      },
    },

    contact: {
      title: 'Contact | L’ANNÉE',
      description:
        'Pour joindre L’ANNÉE à Mannheim : adresses e-mail du Garage, du Kiosque et du Marché, demandes pour fêtes et événements.',
      h1: 'Contact',
      lead: 'Écrivez-nous. Nous répondons dès que les huîtres sont ouvertes.',
      reservations: { heading: 'Réserver ?', body: 'Ce n’est pas notre genre. Passez simplement, on vous trouvera une place.' },
      general: { heading: 'Pour tout le reste', body: 'Fêtes, presse et questions en tout genre.' },
      insta: { heading: 'Nouvelles', body: 'Fermetures, rendez-vous spéciaux et arrivages du moment.' },
    },

    impressum: {
      title: 'Mentions légales | L’ANNÉE',
      description: 'Mentions légales de L’ANNÉE GbR, Mannheim.',
      h1: 'Mentions légales',
    },
    datenschutz: {
      title: 'Confidentialité | L’ANNÉE',
      description: 'Politique de confidentialité du site de L’ANNÉE : pas de cookies, pas de suivi, hébergement chez Vercel.',
      h1: 'Confidentialité',
    },
    notFound: {
      title: 'Page introuvable | L’ANNÉE',
      h1: 'Plus une goutte.',
      body: 'Cette page n’existe pas ou plus. Ceci vous aidera peut-être :',
    },
  },
};
