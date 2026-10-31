/**
 * Impressum & Datenschutzerklärung – zugeschnitten auf eine Gastronomie-GbR
 * mit statischer Website bei Vercel (ohne Cookies, Tracking oder Einbettungen).
 * Stand: Oktober 2026. Hinweis: Vorlage, keine Rechtsberatung – vor dem
 * Livegang bitte fachlich prüfen lassen und Platzhalter in site.mjs ergänzen.
 *
 * Blöcke: { h: Überschrift, p: [Absätze], list: [Punkte], lines: [Adresszeilen] }
 */
import { SITE } from './site.mjs';

const c = SITE.company;
const partners = c.partners.join(' und ');
const partnersFr = c.partners.join(' et ');
const partnersEn = c.partners.join(' and ');
const address = [c.name, c.street, `${c.zip} ${c.city}`];
const VERCEL = ['Vercel Inc.', '440 N Barranca Avenue #4133', 'Covina, CA 91723, USA'];
const LFDI = [
  'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg',
  'Lautenschlagerstraße 20, 70173 Stuttgart',
  'poststelle@lfdi.bwl.de',
  'www.baden-wuerttemberg.datenschutz.de',
];

function contactLines(labels) {
  const lines = [`${labels.mail}: ${c.email}`];
  if (c.phone) lines.push(`${labels.phone}: ${c.phone}`);
  return lines;
}

/* ------------------------------------------------------------------ */
/* Impressum                                                           */
/* ------------------------------------------------------------------ */

export function impressum(locale) {
  if (locale === 'fr') return impressumFr();
  if (locale === 'en') return impressumEn();
  return impressumDe();
}

function impressumDe() {
  const blocks = [
    { h: 'Angaben gemäß § 5 DDG', lines: address },
    { h: 'Vertreten durch', p: [`Die Gesellschafter ${partners}.`] },
    { h: 'Kontakt', lines: contactLines({ mail: 'E-Mail', phone: 'Telefon' }) },
  ];
  if (c.vatId) blocks.push({ h: 'Umsatzsteuer-ID', p: [`Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: ${c.vatId}`] });
  if (c.register)
    blocks.push({ h: 'Registereintrag', p: [`Eingetragen im Gesellschaftsregister. Registergericht: ${c.register.court}. Registernummer: ${c.register.number}.`] });
  blocks.push(
    { h: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV', lines: [partners, c.street, `${c.zip} ${c.city}`] },
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
        'Diese Website enthält Links zu externen Websites Dritter, etwa zu Instagram und zu Kartendiensten. Auf deren Inhalte haben wir keinen Einfluss, verantwortlich ist stets der jeweilige Anbieter. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden uns Rechtsverletzungen bekannt, entfernen wir die betreffenden Links umgehend.',
      ],
    },
    {
      h: 'Urheberrecht',
      p: [
        'Texte, Fotos, Logos, Icons und die Gestaltung dieser Website sind urheberrechtlich geschützt. Jede Verwendung außerhalb der Grenzen des Urheberrechts bedarf unserer vorherigen schriftlichen Zustimmung.',
      ],
    },
    {
      h: 'Bildnachweise und Schriften',
      p: [
        'Fotos: L’ANNÉE. Die Abbildung des Kiosque ist eine Visualisierung, das Stimmungsbild auf der Startseite ist mit KI erzeugt (Higgsfield AI). Icons: generiert mit Higgsfield AI, vektorisiert und überarbeitet. Schriften: Fraunces und Instrument Sans (SIL Open Font License).',
      ],
    }
  );
  return blocks;
}

function impressumFr() {
  const blocks = [
    { note: 'Traduction fournie à titre informatif. Seule la version allemande fait foi.' },
    { h: 'Éditeur du site (§ 5 DDG)', lines: address },
    { h: 'Représentée par', p: [`Ses associés, ${partnersFr}.`] },
    { h: 'Contact', lines: contactLines({ mail: 'E-mail', phone: 'Téléphone' }) },
  ];
  if (c.vatId) blocks.push({ h: 'Numéro de TVA', p: [`Numéro de TVA intracommunautaire (§ 27a UStG) : ${c.vatId}`] });
  if (c.register)
    blocks.push({ h: 'Immatriculation', p: [`Inscrite au registre des sociétés civiles. Tribunal : ${c.register.court}. Numéro : ${c.register.number}.`] });
  blocks.push(
    { h: 'Responsables de la publication (§ 18, al. 2 MStV)', lines: [partnersFr, c.street, `${c.zip} ${c.city}`] },
    {
      h: 'Règlement des litiges de consommation',
      p: ['Nous ne sommes ni disposés ni tenus à participer à une procédure de règlement des litiges devant un organisme de médiation de la consommation.'],
    },
    {
      h: 'Responsabilité quant aux contenus',
      p: [
        'Nous rédigeons les contenus de ce site avec le plus grand soin. Nous ne pouvons toutefois garantir l’exactitude, l’exhaustivité et l’actualité des informations, notamment des prix, horaires et dates. Les informations sur place font foi.',
      ],
    },
    {
      h: 'Responsabilité quant aux liens',
      p: [
        'Ce site contient des liens vers des sites tiers, par exemple Instagram et des services de cartographie. Nous n’avons aucune influence sur leurs contenus, dont leurs éditeurs sont seuls responsables. Au moment de la mise en ligne, aucune infraction n’était apparente. Si nous prenons connaissance d’une infraction, nous supprimerons le lien concerné sans délai.',
      ],
    },
    {
      h: 'Droits d’auteur',
      p: [
        'Les textes, photos, logos, icônes et la conception graphique de ce site sont protégés par le droit d’auteur. Toute utilisation au-delà des limites légales nécessite notre accord écrit préalable.',
      ],
    },
    {
      h: 'Crédits',
      p: [
        'Photos : L’ANNÉE. L’image du Kiosque est une visualisation, l’image d’ambiance de la page d’accueil a été générée par IA (Higgsfield AI). Icônes : générées avec Higgsfield AI, vectorisées et retravaillées. Polices : Fraunces et Instrument Sans (SIL Open Font License).',
      ],
    }
  );
  return blocks;
}

function impressumEn() {
  const blocks = [
    { note: 'This translation is provided for convenience. The German version is legally binding.' },
    { h: 'Information pursuant to § 5 DDG (German Digital Services Act)', lines: address },
    { h: 'Represented by', p: [`Its partners, ${partnersEn}.`] },
    { h: 'Contact', lines: contactLines({ mail: 'Email', phone: 'Phone' }) },
  ];
  if (c.vatId) blocks.push({ h: 'VAT ID', p: [`VAT identification number pursuant to § 27a UStG: ${c.vatId}`] });
  if (c.register)
    blocks.push({ h: 'Registration', p: [`Registered in the partnership register. Court: ${c.register.court}. Number: ${c.register.number}.`] });
  blocks.push(
    { h: 'Responsible for content pursuant to § 18 (2) MStV', lines: [partnersEn, c.street, `${c.zip} ${c.city}`] },
    {
      h: 'Consumer dispute resolution',
      p: ['We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.'],
    },
    {
      h: 'Liability for content',
      p: [
        'We prepare the content of this website with great care. However, we cannot guarantee that it is correct, complete and up to date, in particular prices, opening hours and dates. The information on site takes precedence.',
      ],
    },
    {
      h: 'Liability for links',
      p: [
        'This website contains links to third-party websites, such as Instagram and map services. We have no influence on their content; the respective provider is always responsible for it. No legal violations were apparent at the time of linking. Should we become aware of any, we will remove the links concerned immediately.',
      ],
    },
    {
      h: 'Copyright',
      p: [
        'The texts, photos, logos, icons and design of this website are protected by copyright. Any use beyond the limits of copyright law requires our prior written consent.',
      ],
    },
    {
      h: 'Credits',
      p: [
        'Photos: L’ANNÉE. The image of the Kiosque is a visualisation; the mood image on the home page was generated with AI (Higgsfield AI). Icons: generated with Higgsfield AI, vectorised and refined. Typefaces: Fraunces and Instrument Sans (SIL Open Font License).',
      ],
    }
  );
  return blocks;
}

/* ------------------------------------------------------------------ */
/* Datenschutz                                                         */
/* ------------------------------------------------------------------ */

export function datenschutz(locale) {
  if (locale === 'fr') return datenschutzFr();
  if (locale === 'en') return datenschutzEn();
  return datenschutzDe();
}

function datenschutzDe() {
  return [
    {
      h: 'Auf einen Blick',
      p: [
        'Diese Website ist eine reine Informationsseite. Wir setzen keine Cookies, nutzen keine Analyse- oder Trackingdienste, binden keine Social-Media-Plugins, Karten oder Videos ein und laden keine Inhalte von fremden Servern. Personenbezogene Daten verarbeiten wir nur, soweit das für die Auslieferung der Website technisch nötig ist oder wenn du uns selbst schreibst.',
      ],
    },
    {
      h: 'Verantwortlicher',
      lines: [c.name, `vertreten durch ${partners}`, c.street, `${c.zip} ${c.city}`, `E-Mail: ${c.email}`],
      after: ['Einen Datenschutzbeauftragten haben wir nicht benannt, da wir dazu gesetzlich nicht verpflichtet sind.'],
    },
    {
      h: 'Hosting und Server-Logfiles',
      p: [
        'Diese Website wird gehostet von:',
      ],
      lines: VERCEL,
      after: [
        'Wenn du die Website aufrufst, verarbeitet Vercel automatisch Daten, die dein Browser übermittelt:',
      ],
      list: [
        'IP-Adresse',
        'Datum und Uhrzeit des Zugriffs',
        'aufgerufene Seite bzw. Datei',
        'Referrer-URL (die zuvor besuchte Seite)',
        'Browser, Betriebssystem und Gerätetyp (User-Agent)',
        'übertragene Datenmenge und Statuscode',
      ],
      tail: [
        'Das ist nötig, um die Website auszuliefern, ihre Stabilität und Sicherheit zu gewährleisten und Missbrauch abzuwehren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, unser berechtigtes Interesse liegt in einer sicheren und zuverlässigen Bereitstellung der Website. Eine Zusammenführung mit anderen Datenquellen findet nicht statt. Ohne diese Daten kann die Website nicht angezeigt werden.',
        'Vercel liefert die Website über ein weltweites Servernetz aus, dabei können Daten auch in die USA übermittelt werden. Vercel ist nach dem EU-US Data Privacy Framework zertifiziert; für zertifizierte Unternehmen gilt der Angemessenheitsbeschluss der EU-Kommission vom 10. Juli 2023 (Art. 45 DSGVO). Mit Vercel besteht ein Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO, der ergänzend die EU-Standardvertragsklauseln einbezieht.',
        'Die Logdaten werden nur so lange gespeichert, wie es für diese Zwecke erforderlich ist, und danach gelöscht. Mehr dazu in der Datenschutzerklärung von Vercel: vercel.com/legal/privacy-policy',
      ],
    },
    {
      h: 'Keine Cookies, kein Tracking',
      p: [
        'Wir setzen keine Cookies und speichern oder lesen keine Informationen auf deinem Endgerät (§ 25 TDDDG). Der Wochenplan auf der Startseite berechnet Uhrzeit und Öffnungsstatus ausschließlich in deinem Browser, dabei werden keine Daten an uns übertragen. Analyse- oder Werbedienste verwenden wir nicht.',
      ],
    },
    {
      h: 'Schriftarten',
      p: [
        'Die Schriften Fraunces und Instrument Sans sind lokal auf unserem Server eingebunden. Beim Aufruf der Website wird keine Verbindung zu Google oder anderen Anbietern von Webfonts hergestellt.',
      ],
    },
    {
      h: 'Kontakt per E-Mail',
      p: [
        'Wenn du uns eine E-Mail schreibst, verarbeiten wir deine E-Mail-Adresse, gegebenenfalls deinen Namen und den Inhalt deiner Nachricht, um deine Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn deine Anfrage auf einen Vertrag zielt (etwa eine Veranstaltungsanfrage), sonst Art. 6 Abs. 1 lit. f DSGVO, unser berechtigtes Interesse an der Beantwortung von Anfragen.',
        'Wir löschen die Daten, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen, etwa nach § 257 HGB oder § 147 AO. Für den Versand und Empfang von E-Mails nutzen wir einen E-Mail-Dienstleister, der die Daten in unserem Auftrag verarbeitet.',
      ],
    },
    {
      h: 'Links zu anderen Websites',
      p: [
        'Auf unserer Website findest du Links zu Instagram und zu Kartendiensten (Google Maps, Apple Karten, OpenStreetMap). Das sind einfache Links: Erst wenn du einen davon anklickst, wirst du auf die Seite des jeweiligen Anbieters weitergeleitet. Vorher werden keine Daten an diese Anbieter übertragen. Auf deren Seiten gelten deren Datenschutzhinweise.',
      ],
    },
    {
      h: 'TLS-Verschlüsselung',
      p: ['Diese Website nutzt aus Sicherheitsgründen eine TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du an „https://“ in der Adresszeile deines Browsers.'],
    },
    {
      h: 'Deine Rechte',
      p: ['Du hast jederzeit das Recht auf:'],
      list: [
        'Auskunft über deine bei uns gespeicherten Daten (Art. 15 DSGVO)',
        'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
        'Löschung (Art. 17 DSGVO)',
        'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
        'Datenübertragbarkeit (Art. 20 DSGVO)',
        'Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aus Gründen, die sich aus deiner besonderen Situation ergeben (Art. 21 DSGVO)',
      ],
      tail: [`Eine formlose Nachricht an ${c.email} genügt.`],
    },
    {
      h: 'Beschwerderecht',
      p: ['Du kannst dich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Für uns zuständig ist:'],
      lines: LFDI,
    },
    {
      h: 'Automatisierte Entscheidungen',
      p: ['Eine automatisierte Entscheidungsfindung einschließlich Profiling (Art. 22 DSGVO) findet nicht statt.'],
    },
    {
      h: 'Stand',
      p: ['Oktober 2026. Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die Rechtslage ändert.'],
    },
  ];
}

function datenschutzFr() {
  return [
    { note: 'Traduction fournie à titre informatif. Seule la version allemande fait foi.' },
    {
      h: 'En bref',
      p: [
        'Ce site est un site d’information. Nous n’utilisons pas de cookies, aucun outil d’analyse ou de suivi, aucun module de réseau social, aucune carte ni vidéo intégrée, et ne chargeons aucun contenu depuis des serveurs tiers. Nous ne traitons des données personnelles que dans la mesure où cela est techniquement nécessaire pour afficher le site, ou lorsque vous nous écrivez.',
      ],
    },
    {
      h: 'Responsable du traitement',
      lines: [c.name, `représentée par ${partnersFr}`, c.street, `${c.zip} ${c.city}`, `E-mail : ${c.email}`],
      after: ['Nous n’avons pas désigné de délégué à la protection des données, la loi ne nous y obligeant pas.'],
    },
    {
      h: 'Hébergement et journaux du serveur',
      p: ['Ce site est hébergé par :'],
      lines: VERCEL,
      after: ['Lorsque vous consultez le site, Vercel traite automatiquement les données transmises par votre navigateur :'],
      list: [
        'adresse IP',
        'date et heure de l’accès',
        'page ou fichier consulté',
        'URL de provenance (referrer)',
        'navigateur, système d’exploitation et type d’appareil (user agent)',
        'volume de données transmis et code de statut',
      ],
      tail: [
        'Ces données sont nécessaires pour afficher le site, en garantir la stabilité et la sécurité et prévenir les abus. Base juridique : article 6, paragraphe 1, point f du RGPD ; notre intérêt légitime réside dans la mise à disposition sûre et fiable du site. Ces données ne sont pas croisées avec d’autres sources. Sans elles, le site ne peut pas s’afficher.',
        'Vercel diffuse le site via un réseau mondial de serveurs ; des données peuvent ainsi être transférées aux États-Unis. Vercel est certifié selon le cadre de protection des données UE–États-Unis (Data Privacy Framework) ; la décision d’adéquation de la Commission européenne du 10 juillet 2023 s’applique aux entreprises certifiées (article 45 du RGPD). Un contrat de sous-traitance conforme à l’article 28 du RGPD, intégrant en complément les clauses contractuelles types de l’UE, lie Vercel.',
        'Les journaux ne sont conservés que le temps nécessaire à ces finalités, puis supprimés. Plus d’informations dans la politique de confidentialité de Vercel : vercel.com/legal/privacy-policy',
      ],
    },
    {
      h: 'Pas de cookies, pas de suivi',
      p: [
        'Nous ne déposons pas de cookies et ne stockons ni ne lisons d’informations sur votre appareil (§ 25 TDDDG). Le planning de la semaine sur la page d’accueil calcule l’heure et les horaires d’ouverture uniquement dans votre navigateur ; aucune donnée ne nous est transmise. Nous n’utilisons aucun service d’analyse ou de publicité.',
      ],
    },
    {
      h: 'Polices de caractères',
      p: [
        'Les polices Fraunces et Instrument Sans sont hébergées sur notre propre serveur. Aucune connexion n’est établie avec Google ou d’autres fournisseurs de polices.',
      ],
    },
    {
      h: 'Contact par e-mail',
      p: [
        'Si vous nous écrivez, nous traitons votre adresse e-mail, le cas échéant votre nom et le contenu de votre message afin de vous répondre. Base juridique : article 6, paragraphe 1, point b du RGPD si votre demande vise un contrat (par exemple un événement), sinon article 6, paragraphe 1, point f du RGPD, notre intérêt légitime à répondre aux demandes.',
        'Nous supprimons ces données une fois la demande traitée, sauf obligation légale de conservation (par exemple § 257 HGB ou § 147 AO). Pour l’envoi et la réception des e-mails, nous faisons appel à un prestataire qui traite les données pour notre compte.',
      ],
    },
    {
      h: 'Liens vers d’autres sites',
      p: [
        'Notre site contient des liens vers Instagram et des services de cartographie (Google Maps, Plans d’Apple, OpenStreetMap). Il s’agit de simples liens : ce n’est qu’en cliquant que vous êtes redirigé vers le site du fournisseur. Aucune donnée ne lui est transmise auparavant. Sur ces sites, leurs propres règles de confidentialité s’appliquent.',
      ],
    },
    {
      h: 'Chiffrement TLS',
      p: ['Pour des raisons de sécurité, ce site utilise un chiffrement TLS. Vous reconnaissez une connexion chiffrée au préfixe « https:// » dans la barre d’adresse.'],
    },
    {
      h: 'Vos droits',
      p: ['Vous disposez à tout moment d’un droit :'],
      list: [
        'd’accès à vos données (article 15 du RGPD)',
        'de rectification (article 16 du RGPD)',
        'd’effacement (article 17 du RGPD)',
        'de limitation du traitement (article 18 du RGPD)',
        'à la portabilité (article 20 du RGPD)',
        'd’opposition aux traitements fondés sur l’article 6, paragraphe 1, point f du RGPD, pour des raisons tenant à votre situation particulière (article 21 du RGPD)',
      ],
      tail: [`Un simple message à ${c.email} suffit.`],
    },
    {
      h: 'Droit de réclamation',
      p: ['Vous pouvez introduire une réclamation auprès d’une autorité de contrôle (article 77 du RGPD). L’autorité compétente pour nous est :'],
      lines: LFDI,
    },
    {
      h: 'Décisions automatisées',
      p: ['Aucune décision automatisée, y compris le profilage (article 22 du RGPD), n’est prise.'],
    },
    {
      h: 'Mise à jour',
      p: ['Octobre 2026. Nous adaptons cette politique dès que le site ou le cadre juridique évolue.'],
    },
  ];
}

function datenschutzEn() {
  return [
    { note: 'This translation is provided for convenience. The German version is legally binding.' },
    {
      h: 'At a glance',
      p: [
        'This is a purely informational website. We do not set cookies, use no analytics or tracking services, embed no social media plugins, maps or videos, and load no content from third-party servers. We only process personal data where this is technically necessary to deliver the website, or when you write to us.',
      ],
    },
    {
      h: 'Controller',
      lines: [c.name, `represented by ${partnersEn}`, c.street, `${c.zip} ${c.city}`, `Email: ${c.email}`],
      after: ['We have not appointed a data protection officer, as we are not legally required to do so.'],
    },
    {
      h: 'Hosting and server log files',
      p: ['This website is hosted by:'],
      lines: VERCEL,
      after: ['When you visit the website, Vercel automatically processes data transmitted by your browser:'],
      list: [
        'IP address',
        'date and time of access',
        'page or file requested',
        'referrer URL (the previously visited page)',
        'browser, operating system and device type (user agent)',
        'amount of data transferred and status code',
      ],
      tail: [
        'This is necessary to deliver the website, keep it stable and secure, and prevent misuse. The legal basis is Art. 6(1)(f) GDPR; our legitimate interest lies in providing the website securely and reliably. The data is not combined with other sources. Without it, the website cannot be displayed.',
        'Vercel delivers the website via a global server network, so data may also be transferred to the USA. Vercel is certified under the EU-U.S. Data Privacy Framework; the European Commission’s adequacy decision of 10 July 2023 applies to certified companies (Art. 45 GDPR). A data processing agreement pursuant to Art. 28 GDPR is in place with Vercel, which additionally incorporates the EU Standard Contractual Clauses.',
        'Log data is stored only as long as necessary for these purposes and then deleted. More in Vercel’s privacy policy: vercel.com/legal/privacy-policy',
      ],
    },
    {
      h: 'No cookies, no tracking',
      p: [
        'We do not set cookies and do not store or read information on your device (§ 25 TDDDG). The weekly schedule on the home page calculates the time and opening status entirely in your browser; no data is sent to us. We use no analytics or advertising services.',
      ],
    },
    {
      h: 'Fonts',
      p: [
        'The Fraunces and Instrument Sans typefaces are hosted on our own server. No connection to Google or any other web font provider is made.',
      ],
    },
    {
      h: 'Contact by email',
      p: [
        'If you email us, we process your email address, your name if given and the content of your message in order to reply. The legal basis is Art. 6(1)(b) GDPR if your request relates to a contract (for example an event), otherwise Art. 6(1)(f) GDPR, our legitimate interest in answering enquiries.',
        'We delete the data once your request has been dealt with, unless statutory retention obligations apply, for example under § 257 HGB or § 147 AO. We use an email service provider that processes the data on our behalf.',
      ],
    },
    {
      h: 'Links to other websites',
      p: [
        'Our website contains links to Instagram and to map services (Google Maps, Apple Maps, OpenStreetMap). These are plain links: you are only taken to the provider’s site when you click one. No data is sent to these providers beforehand. Their own privacy policies apply on their sites.',
      ],
    },
    {
      h: 'TLS encryption',
      p: ['For security reasons this website uses TLS encryption. You can recognise an encrypted connection by “https://” in your browser’s address bar.'],
    },
    {
      h: 'Your rights',
      p: ['You have the right at any time to:'],
      list: [
        'access the data we hold about you (Art. 15 GDPR)',
        'rectification of inaccurate data (Art. 16 GDPR)',
        'erasure (Art. 17 GDPR)',
        'restriction of processing (Art. 18 GDPR)',
        'data portability (Art. 20 GDPR)',
        'object to processing based on Art. 6(1)(f) GDPR on grounds relating to your particular situation (Art. 21 GDPR)',
      ],
      tail: [`An informal message to ${c.email} is enough.`],
    },
    {
      h: 'Right to lodge a complaint',
      p: ['You can lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). The authority responsible for us is:'],
      lines: LFDI,
    },
    {
      h: 'Automated decisions',
      p: ['No automated decision-making, including profiling (Art. 22 GDPR), takes place.'],
    },
    {
      h: 'Last updated',
      p: ['October 2026. We will update this policy whenever the website or the legal situation changes.'],
    },
  ];
}
