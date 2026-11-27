/* L’ANNÉE – Pop-up-Seite /popup: markiert vergangene Adventswochenenden und das nächste
   (Goldring) und schreibt darunter, wann das Pop-up als Nächstes offen hat. */
(() => {
  const kugeln = [...document.querySelectorAll('.kugel[data-samstag]')];
  const text = document.getElementById('naechstes');
  if (!kugeln.length || !text) return;

  const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const jetzt = new Date();
  const heute = new Date(jetzt.getFullYear(), jetzt.getMonth(), jetzt.getDate());
  const gleicherTag = (a, b) => a.toDateString() === b.toDateString();
  let satz = 'Das Advent-Pop-up ist vorbei. Ab 2027 ist Austern & Bubbles regelmäßig im Hof.';
  let gefunden = false;

  for (const kugel of kugeln) {
    const [j, m, t] = kugel.dataset.samstag.split('-').map(Number);
    const samstag = new Date(j, m - 1, t);
    const sonntag = new Date(j, m - 1, t + 1);
    const ende = new Date(j, m - 1, t + 1, 22);
    if (jetzt >= ende) {
      kugel.classList.add('ist-vorbei');
      continue;
    }
    if (gefunden) continue;
    gefunden = true;
    kugel.classList.add('ist-naechstes');

    const tage = `${samstag.getDate()}. und ${sonntag.getDate()}. ${MONATE[sonntag.getMonth()]}`;
    if (gleicherTag(heute, samstag) || gleicherTag(heute, sonntag)) {
      const h = jetzt.getHours();
      if (h < 16) satz = 'Heute ab 16 Uhr geöffnet.';
      else if (h < 22) satz = 'Jetzt geöffnet, heute bis 22 Uhr.';
      else satz = 'Morgen, Sonntag, wieder ab 16 Uhr.';
    } else if (heute.getDay() >= 1 && heute.getDay() <= 5 && (samstag - heute) / 864e5 <= 5) {
      satz = `Dieses Wochenende: ${tage}, 16–22 Uhr.`;
    } else {
      satz = `Als Nächstes: ${tage}, 16–22 Uhr.`;
    }
  }

  text.textContent = satz;
  text.classList.add('ist-aktuell');
})();

/* Hero: 15 Bilder aus der Beilstraße im Wechsel (Martin, 27.11.2026). Bild 1 ist sofort da,
   jedes weitere wird erst kurz vor seinem Auftritt geladen. Pause, solange der Tab verdeckt ist.
   Bei reduzierter Bewegung wird trotzdem gewechselt, nur ohne Zoom (CSS). */
(() => {
  const box = document.querySelector('.fenster[data-bilder]');
  if (!box) return;
  const bilder = [...box.querySelectorAll('.fenster-bild')];
  if (bilder.length < 2) return;
  const STANDZEIT = 5500;
  const laden = (bild) => new Promise((fertig) => {
    if (bild.dataset.src) {
      bild.src = bild.dataset.src;
      bild.removeAttribute('data-src');
    }
    if (bild.complete && bild.naturalWidth) return fertig();
    bild.addEventListener('load', fertig, { once: true });
    bild.addEventListener('error', fertig, { once: true });
  });
  let aktuell = 0;
  laden(bilder[1]);
  const weiter = async () => {
    if (document.hidden) return setTimeout(weiter, 1000);
    const naechstes = (aktuell + 1) % bilder.length;
    await laden(bilder[naechstes]);
    bilder[naechstes].classList.add('ist-sichtbar');
    bilder[aktuell].classList.remove('ist-sichtbar');
    aktuell = naechstes;
    laden(bilder[(aktuell + 1) % bilder.length]);
    setTimeout(weiter, STANDZEIT);
  };
  setTimeout(weiter, STANDZEIT);
})();
