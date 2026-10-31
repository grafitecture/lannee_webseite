/** English copy. */
export default {
  locale: 'en',
  intl: 'en-GB',
  langName: 'English',
  ogLocale: 'en_GB',

  ui: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    mainNav: 'Main navigation',
    langNav: 'Choose language',
    nav: { garage: 'Garage', kiosque: 'Kiosque', marche: 'Marché', carte: 'Menu', atlas: 'Oyster atlas', contact: 'Contact' },
    home: 'Home',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    time: { from: 'from {t}', range: '{a} to {b}' },
    live: {
      open: 'Open now',
      next: 'Up next',
      today: 'today',
      tomorrow: 'tomorrow',
      inDays: 'in {n} days',
      since: 'since {t}',
      until: 'until {t}',
      paused: 'Closed this time',
      closed: 'Closed',
      unit: '',
    },
    map: { title: 'Get directions', google: 'Google Maps', apple: 'Apple Maps', osm: 'OpenStreetMap', note: 'External links' },
    closure: { one: '**{names} is taking a break:** {when}', many: '**{names} are taking a break:** {when}' },
    facts: { when: 'When', where: 'Where', mail: 'Email', more: 'Also' },
    footer: {
      legal: 'Legal',
      impressum: 'Legal notice',
      datenschutz: 'Privacy',
      design: 'Design',
      top: 'Back to top',
    },
    toMenu: 'See the full menu',
    external: '(opens external site)',
    visualisation: 'Visualisation',
    demoNotice: 'This website is purely for presentation and is fictional.',
  },

  pages: {
    home: {
      title: 'L’ANNÉE – Oysters & bubbles in Mannheim',
      description:
        'Oysters, crémant and champagne in three places in Mannheim: the Garage in Jungbusch, the Kiosque on Lindenhofplatz and the Marché at the Lindenhof farmers’ market.',
      h1: 'L’ANNÉE – Austern & Bulles in Mannheim',
      lead: 'Oysters, bubbles and a spot in the sun. In three places in Mannheim, every weekend.',
      ctaMenu: 'See the menu',
      ctaWhere: 'Where to find us',
      weekend: {
        heading: 'One weekend, three places.',
        lead: 'During the week we fetch oysters, polish glasses and sleep in. From Friday evening, you’ll find us here:',
      },
      places: {
        garage: {
          heading: 'Bonsoir in the courtyard.',
          body: 'On Fridays and Saturdays from 6 pm we open the gate on Beilstraße. Under the vines: oysters on ice, prawns to share, tarte from the oven and bubbles from the Loire and Champagne. Reservations? We don’t do them. Just drop by, there’s always a spot.',
          cta: 'Visit the Garage',
        },
        kiosque: {
          heading: 'Bonjour, Sunday.',
          body: 'On Sundays from 10 am we raise the shutters on Lindenhofplatz. An oyster for breakfast, a glass of crémant at noon, tinned sardines in between. The weekend can last a little longer.',
          cta: 'Visit the Kiosque',
        },
        marche: {
          heading: 'At eight on Saturday, the sea is already here.',
          body: 'Our white trailer stands at the Lindenhof farmers’ market every Saturday from 8 am to 1 pm. Freshly shucked oysters, a glass of white, or a dozen to take home. Wherever else the Marché turns up, we announce in good time.',
          cta: 'Visit the Marché',
        },
      },
      carte: {
        heading: 'On the menu.',
        lead: 'Oysters from France and Ireland, seafood to share, little things and plenty of bubbles. Not everything is everywhere, the menu tells you where.',
        cta: 'See the full menu',
      },
      insta: 'Closures, special dates and what’s fresh right now: on Instagram.',
    },

    garage: {
      title: 'Garage – oysters & wine in Jungbusch | L’ANNÉE',
      description:
        'The L’ANNÉE Garage: oysters, crémant and champagne in the courtyard at Beilstraße 6, Mannheim-Jungbusch. Fridays and Saturdays from 6 pm, no reservations.',
      h1: 'Garage',
      subtitle: '{fr|Garage à huîtres & vins}',
      when: 'Friday & Saturday from 6 pm',
      quote: 'We don’t take reservations – just drop by, there’s always a spot.',
      intro: {
        heading: 'A courtyard, a gate, a boat.',
        body: [
          'Behind the gate on Beilstraße lies a courtyard you wouldn’t expect in Jungbusch: vines on the trellis, bistro chairs, string lights. Inside, glasses hang from the ceiling, a sailing ship hangs on the wall, and the bar is an old wooden boat.',
          'We serve what we love to eat ourselves: oysters on ice, prawns to share, tinned sardines, tarte from the oven. With a Crémant de Loire, champagne or a glass of Malbec from Cahors.',
        ],
      },
      menu: { heading: 'Tonight at the Garage' },
      quarter: {
        heading: 'Jungbusch',
        body: 'Mannheim’s harbour quarter: bars, studios, music, the canal around the corner. A good place for oysters. The Rhine isn’t the sea, but it flows into it.',
      },
      directions: {
        heading: 'Getting here',
        body: 'Best on foot or by bike, parking is scarce in Jungbusch.',
      },
    },

    kiosque: {
      title: 'Kiosque – Sunday oysters in Lindenhof | L’ANNÉE',
      description:
        'The L’ANNÉE Kiosque at Lindenhofplatz 1, Mannheim: oysters, crémant and small plates on Sundays from 10 am.',
      h1: 'Kiosque',
      subtitle: '{fr|Kiosque à huîtres & vins}',
      when: 'Sunday from 10 am',
      quote: 'On Sundays, others go to the bakery. We open oysters.',
      intro: {
        heading: 'Sunday, ten o’clock, Lindenhofplatz.',
        body: [
          'The Kiosque is our Sunday window onto the square. A counter, a few seats in the sun, oysters on ice and cold bubbles. A Sunday needs nothing more.',
          'On the menu: Fines de Claire and Spéciales, Irish rock oysters, brown shrimp croquettes, smoked salmon and sardines. With crémant, Muscadet or a homemade citronnade.',
        ],
      },
      menu: { heading: 'Sundays at the Kiosque' },
      quarter: {
        heading: 'Lindenhof',
        body: 'Between the main station and the Rhine: old townhouses, lots of green, the Waldpark just around the corner. A neighbourhood that sleeps in on Sundays and then likes an apéritif.',
      },
      directions: {
        heading: 'Getting here',
        body: 'An easy walk from the main station.',
      },
    },

    marche: {
      title: 'Marché – oysters at the Lindenhof market | L’ANNÉE',
      description:
        'The L’ANNÉE Marché: Saturdays from 8 am to 1 pm at the Lindenhof farmers’ market in Mannheim. Freshly shucked oysters, a glass of wine and oysters to take home.',
      h1: 'Marché',
      subtitle: 'Austern & Bulles on wheels',
      when: 'Saturday, 8 am to 1 pm',
      whereText: 'Lindenhof farmers’ market, Mannheim',
      more: 'More places and dates announced as we go.',
      quote: 'Between the vegetables and the flowers: a dozen, please.',
      intro: {
        heading: 'A trailer, two menu boards.',
        body: [
          'On Saturdays the Marché parks at the Lindenhof farmers’ market. Between the vegetables and the flowers we open oysters, pour white wine and add a small bowl of olives.',
          'Rather eat at home? Take your dozen with you. We pack the oysters on ice and are happy to show you how to open them.',
        ],
      },
      menu: { heading: 'On the board today' },
      dates: {
        heading: 'Where to find the Marché',
        regular: 'Every Saturday, 8 am to 1 pm',
        regularPlace: 'Lindenhof farmers’ market, Mannheim',
        empty: 'No special dates right now. New stops are announced here and on Instagram.',
      },
      invite: {
        heading: 'Invite the Marché',
        body: 'Courtyard party, wedding, company event? The Marché is a trailer, so it can come to you. Tell us when and where, and we’ll get back to you.',
        cta: 'Send a request',
        subject: 'Marché request',
      },
    },

    carte: {
      title: 'Menu – oysters, bubbles & small plates | L’ANNÉE',
      description:
        'The L’ANNÉE menu: oysters from France and Ireland, prawns, sardines, tartes, crémant, champagne and wines. Filter by Garage, Kiosque and Marché.',
      h1: 'La Carte',
      lead: 'What we love to eat and drink. Not everything is everywhere: pick a place, and the menu shows what’s on there.',
      filter: { label: 'Filter the menu by place', all: 'All places' },
      taste: { label: 'Taste', iode: 'Briny', chair: 'Meaty', noisette: 'Nutty' },
      veg: 'vegetarian',
      onlyAt: 'Only here:',
      price: 'Price',
      from: 'from',
      notes: [
        'All prices in euros, VAT included.',
        'Please ask our team about allergens and additives.',
        'Oysters are served raw. We advise against them during pregnancy and for people with weakened immune systems.',
      ],
    },

    atlas: {
      title: 'Oyster atlas – species and origins | L’ANNÉE',
      description:
        'The L’ANNÉE oyster atlas: the main oyster species and the best-known origins, from Marennes-Oléron and Cancale to Sylt, briefly explained.',
    },

    contact: {
      title: 'Contact | L’ANNÉE',
      description:
        'How to reach L’ANNÉE in Mannheim: email addresses for the Garage, Kiosque and Marché, requests for parties and events.',
      h1: 'Contact',
      lead: 'Write to us. We’ll reply as soon as the oysters are open.',
      reservations: { heading: 'Reservations?', body: 'We don’t take them. Just drop by, there’s always a spot.' },
      general: { heading: 'Everything else', body: 'For parties, press and questions of all kinds.' },
      insta: { heading: 'News', body: 'Closures, special dates and what’s fresh right now.' },
    },

    impressum: {
      title: 'Legal notice | L’ANNÉE',
      description: 'Legal notice of L’ANNÉE GbR, Mannheim.',
      h1: 'Legal notice',
    },
    datenschutz: {
      title: 'Privacy | L’ANNÉE',
      description: 'Privacy policy of the L’ANNÉE website: no cookies, no tracking, hosted by Vercel.',
      h1: 'Privacy',
    },
    notFound: {
      title: 'Page not found | L’ANNÉE',
      h1: 'All gone.',
      body: 'This page doesn’t exist, or no longer does. Maybe this helps:',
    },
  },
};
