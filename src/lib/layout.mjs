/**
 * Seitengerüst: <head>, Kopfzeile, Fußzeile, strukturierte Daten.
 */
import { html, raw, esc, plain, typo } from './html.mjs';
import { DICT, LOCALES, ROUTES, url, pick, fill, formatTime } from './i18n.mjs';
import { SITE, LOCATIONS, LOCATION_ORDER, SCHEDULE } from '../content/site.mjs';
import { logo, signet, icon, arrowLink, upcomingClosures } from './components.mjs';
import { tokenHex } from '../content/tokens.mjs';

const NAV = ['garage', 'kiosque', 'marche', 'carte', 'annee', 'atlas', 'contact'];

/** Öffnungszeit-Text eines Ortes, z. B. „Freitag & Samstag ab 18 Uhr“ */
export function whenText(key, locale) {
  return DICT[locale].pages[key].when;
}

export function placeText(key, locale) {
  const L = LOCATIONS[key];
  if (L.street) return `${L.street}, ${L.zip} ${L.city}-${L.district}`;
  return DICT[locale].pages.marche.whereText;
}

/* ------------------------------------------------------------------ */

function head(ctx) {
  const { locale, page, assets } = ctx;
  const t = DICT[locale];
  const p = t.pages[page.key] ?? {};
  const title = plain(page.title ?? p.title);
  const description = plain(page.description ?? p.description ?? '');
  const canonical = SITE.url + (page.path ?? url(page.key, locale));
  const alternates =
    page.key in ROUTES && !page.noAlternates
      ? LOCALES.map((l) => html`<link rel="alternate" hreflang="${l}" href="${SITE.url + url(page.key, l)}">`).concat(
          html`<link rel="alternate" hreflang="x-default" href="${SITE.url + url(page.key, 'de')}">`
        )
      : [];
  const ogImage = `${SITE.url}/og/${page.og ?? 'lannee'}.jpg`;
  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
${page.noindex ? html`<meta name="robots" content="noindex, nofollow">` : ''}
<link rel="canonical" href="${canonical}">
${alternates}
<meta name="theme-color" content="${tokenHex('blanc')}">
<meta name="color-scheme" content="light">
<meta property="og:type" content="website">
<meta property="og:site_name" content="L’ANNÉE">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${t.ogLocale}">
${LOCALES.filter((l) => l !== locale).map((l) => html`<meta property="og:locale:alternate" content="${DICT[l].ogLocale}">`)}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${assets.css}">
${page.key === 'home' ? raw('<noscript><style>.page--home .site-header__logo{opacity:1}</style></noscript>') : ''}
<script type="module" src="${assets.js}"></script>
${jsonLd(ctx)}
</head>`;
}

/* ------------------------------------------------------------------ */

function header(ctx) {
  const { locale, page } = ctx;
  const t = DICT[locale].ui;
  const links = NAV.map((key) => {
    const current = page.key === key ? raw(' aria-current="page"') : '';
    const mark = LOCATIONS[key] ? signet(key, { cls: 'nav__signet' }) : '';
    return html`<li><a class="nav__link nav__link--${key}" href="${url(key, locale)}"${current}>${mark}<span>${t.nav[key]}</span></a></li>`;
  });
  return html`<header class="site-header">
  <a class="skip-link" href="#inhalt">${t.skip}</a>
  <div class="site-header__inner">
    <a class="site-header__brand" href="${url('home', locale)}" aria-label="L’ANNÉE – ${t.home}">${logo({ cls: 'site-header__logo', decorative: true })}</a>
    <nav class="nav" aria-label="${t.mainNav}"><ul class="nav__list">${links}</ul></nav>
    ${langSwitch(ctx, 'lang--header')}
    <a class="menu-toggle" href="#menu" aria-controls="menu" aria-expanded="false" data-menu-toggle><span class="menu-toggle__label">${t.menu}</span><span class="menu-toggle__bars" aria-hidden="true"></span></a>
  </div>
  <nav class="drawer" id="menu" aria-label="${t.mainNav}" data-menu>
    <div class="drawer__inner">
      <a class="drawer__close" href="#" data-menu-close>${t.close}</a>
      <ul class="drawer__list">${NAV.map(
        (key) =>
          html`<li><a class="drawer__link drawer__link--${key}" href="${url(key, locale)}"${
            page.key === key ? raw(' aria-current="page"') : ''
          }>${LOCATIONS[key] ? signet(key, { cls: 'drawer__signet' }) : ''}<span>${t.nav[key]}</span></a></li>`
      )}</ul>
      ${langSwitch(ctx, 'lang--menu')}
    </div>
  </nav>
</header>`;
}

function langSwitch(ctx, cls) {
  const { locale, page } = ctx;
  const t = DICT[locale].ui;
  const hasRoute = page.key in ROUTES;
  return html`<nav class="lang ${cls}" aria-label="${t.langNav}"><ul>${LOCALES.map((l) => {
    const href = hasRoute ? url(page.key, l) : url('home', l);
    return html`<li><a href="${href}" hreflang="${l}" lang="${l}"${l === locale ? raw(' aria-current="true"') : ''}><abbr title="${
      DICT[l].langName
    }">${l.toUpperCase()}</abbr></a></li>`;
  })}</ul></nav>`;
}

/* ------------------------------------------------------------------ */

function footer(ctx) {
  const { locale } = ctx;
  const t = DICT[locale];
  const year = new Date().getFullYear();
  const places = LOCATION_ORDER.map((key) => {
    const L = LOCATIONS[key];
    return html`<div class="footer-place footer-place--${key}">
      <a class="footer-place__name" href="${url(key, locale)}">${signet(key, { cls: 'footer-place__signet' })}<span>${L.name}</span></a>
      <p class="footer-place__when">${whenText(key, locale)}</p>
      <p class="footer-place__where">${placeText(key, locale)}</p>
      <p><a class="footer-place__mail" href="mailto:${L.email}">${L.email}</a></p>
    </div>`;
  });
  return html`<footer class="site-footer">
  ${ctx.page.compactFooter ? '' : html`<div class="site-footer__places">${places}</div>`}
  <a class="site-footer__mark" href="${url('home', locale)}" aria-label="L’ANNÉE – ${t.ui.home}">${logo({ cls: 'site-footer__logo', decorative: true })}</a>
  <div class="site-footer__bottom">
    <p class="site-footer__tagline">${t.ui.footer.tagline}</p>
    <ul class="site-footer__links">
      <li><a href="${url('impressum', locale)}">${t.ui.footer.impressum}</a></li>
      <li><a href="${url('datenschutz', locale)}">${t.ui.footer.datenschutz}</a></li>
      <li>${arrowLink(SITE.instagram.url, 'Instagram', { external: true, locale })}</li>
      <li><a href="mailto:${SITE.company.email}">${SITE.company.email}</a></li>
    </ul>
    <p class="site-footer__legal">© ${year} ${SITE.company.name}, ${SITE.company.city}. ${t.ui.footer.design}: ${arrowLink(SITE.agency.url, SITE.agency.name, {
      external: true,
      locale,
      cls: 'link-arrow link-arrow--quiet',
    })}</p>
    ${langSwitch(ctx, 'lang--footer')}
  </div>
</footer>`;
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const DAY_URI = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
  (d) => `https://schema.org/${d}`
);

function establishment(key, locale) {
  const L = LOCATIONS[key];
  const t = DICT[locale].pages[key];
  const obj = {
    '@type': key === 'marche' ? 'FoodEstablishment' : 'BarOrPub',
    '@id': `${SITE.url}${url(key, 'de')}#ort`,
    name: `L’ANNÉE ${L.name}`,
    description: plain(t.description),
    url: SITE.url + url(key, locale),
    email: L.email,
    servesCuisine: ['Austern', 'Meeresfrüchte', 'Französisch'],
    acceptsReservations: false,
    address: {
      '@type': 'PostalAddress',
      streetAddress: L.street ?? L.place,
      postalCode: L.zip,
      addressLocality: L.city,
      addressCountry: 'DE',
    },
    image: `${SITE.url}/og/${key}.jpg`,
  };
  // Nur Zeiten mit festem Ende ausgeben (bei „ab … Uhr“ ist das Ende unbekannt).
  const hours = SCHEDULE.filter((s) => s.location === key && !s.openEnd).map((s) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: DAY_URI[s.day - 1],
    opens: s.start,
    closes: s.end,
  }));
  if (hours.length) obj.openingHoursSpecification = hours;
  // Schließtage: opens = closes = 00:00 bedeutet „ganztägig geschlossen“.
  const closed = upcomingClosures([key]).map((c) => ({
    '@type': 'OpeningHoursSpecification',
    opens: '00:00',
    closes: '00:00',
    validFrom: c.from,
    validThrough: c.to,
  }));
  if (closed.length) obj.specialOpeningHoursSpecification = closed;
  return obj;
}

function jsonLd(ctx) {
  const { locale, page } = ctx;
  let data = null;
  if (page.key === 'home') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE.url}/#org`,
      name: 'L’ANNÉE',
      legalName: SITE.company.name,
      url: SITE.url,
      logo: `${SITE.url}/apple-touch-icon.png`,
      email: SITE.company.email,
      sameAs: [SITE.instagram.url],
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.company.street,
        postalCode: SITE.company.zip,
        addressLocality: SITE.company.city,
        addressCountry: 'DE',
      },
      subOrganization: LOCATION_ORDER.map((k) => establishment(k, locale)),
    };
  } else if (LOCATIONS[page.key]) {
    data = { '@context': 'https://schema.org', ...establishment(page.key, locale), parentOrganization: { '@id': `${SITE.url}/#org` } };
  }
  if (!data) return '';
  return raw(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`);
}

/* ------------------------------------------------------------------ */

export function layout(ctx, main) {
  const { locale, page } = ctx;
  const theme = page.theme ? ` theme-${page.theme}` : '';
  return (
    '<!doctype html>\n' +
    html`<html lang="${locale}" dir="ltr">
${head(ctx)}
<body class="page page--${page.key}${theme}">
${SITE.demoNotice ? html`<div class="stoerer" role="note"><p class="stoerer__disc">${typo(DICT[locale].ui.demoNotice, locale)}</p></div>` : ''}
${header(ctx)}
<main id="inhalt" tabindex="-1">
${main}
</main>
${footer(ctx)}
</body>
</html>`.toString()
  );
}

export { formatTime, fill, pick, esc };
