/* L’ANNÉE – Entwurf /draft: markiert vergangene Adventswochenenden und das nächste
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
