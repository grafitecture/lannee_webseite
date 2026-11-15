(() => {
  const teaser = document.querySelector('.advent-teaser');
  const dialog = document.getElementById('advent-dialog');
  if (!teaser || !dialog) return;

  const film = dialog.querySelector('.advent-film');
  const filmToggle = dialog.querySelector('.advent-film-toggle');
  const soundToggle = dialog.querySelector('.advent-sound-toggle');
  const instagram = dialog.querySelector('.advent-instagram');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function updatePlayback() {
    const label = film.ended ? 'Film erneut abspielen' : film.paused ? 'Film abspielen' : 'Film pausieren';
    filmToggle.setAttribute('aria-label', label);
    filmToggle.title = label;
    filmToggle.classList.toggle('is-playing', !film.paused && !film.ended);
    filmToggle.classList.toggle('is-ended', film.ended);
  }
  function updateInstagram() {
    // Only the final card carries the Instagram link; the film has no extra icon.
    instagram.hidden = !dialog.open || film.currentTime < 14;
  }
  function playFilm() {
    if (film.ended) {
      film.currentTime = 0;
      updateInstagram();
    }
    film.play().catch(error => {
      // Lässt ein Browser keinen Ton zu, läuft der Film wenigstens stumm; der Lautsprecher schaltet den Ton zu.
      if (error && error.name === 'NotAllowedError' && !film.muted) {
        film.muted = true;
        updateSound();
        film.play().catch(updatePlayback);
      } else updatePlayback();
    });
  }
  for (const event of ['play', 'pause', 'ended']) film.addEventListener(event, updatePlayback);
  for (const event of ['timeupdate', 'seeked', 'ended']) film.addEventListener(event, updateInstagram);
  filmToggle.addEventListener('click', () => {
    if (film.paused || film.ended) playFilm();
    else film.pause();
  });
  function updateSound() {
    const label = film.muted ? 'Filmton einschalten' : 'Filmton ausschalten';
    soundToggle.setAttribute('aria-label', label);
    soundToggle.title = label;
    soundToggle.setAttribute('aria-pressed', String(!film.muted));
  }
  soundToggle.addEventListener('click', () => {
    film.muted = !film.muted;
    updateSound();
  });
  film.addEventListener('volumechange', updateSound);
  instagram.addEventListener('click', () => film.pause());

  let opening = false;
  teaser.addEventListener('click', () => {
    if (opening || dialog.open) return;
    opening = true;
    // Film mit Ton direkt in der Klick-Geste starten: Nur so erlauben Browser – vor allem Safari
    // auf dem iPhone – die Wiedergabe mit Ton. Bei jedem Öffnen von vorn und mit Ton.
    film.muted = false;
    film.volume = 1;
    film.currentTime = 0;
    instagram.hidden = true;
    updateSound();
    playFilm();
    const animate = !reducedMotion.matches && !document.body.classList.contains('paused');
    if (animate) teaser.classList.add('is-opening');
    const duration = parseFloat(getComputedStyle(teaser).getPropertyValue('--burst-duration')) || .82;
    const delay = animate ? duration * 1000 : 0;
    window.setTimeout(() => {
      dialog.showModal();
      updateSound();
      updatePlayback();
      teaser.setAttribute('aria-expanded', 'true');
      opening = false;
    }, delay);
  });
  dialog.querySelector('.advent-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    teaser.classList.remove('is-opening');
    film.pause();
    film.muted = true;
    instagram.hidden = true;
    teaser.setAttribute('aria-expanded', 'false');
    teaser.focus({ preventScroll: true });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) film.pause();
  });
})();
