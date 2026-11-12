/**
 * L’ANNÉE – Fotos im Hero langsam überblenden.
 * Nur progressive Verbesserung: Ohne JavaScript bleibt das erste Foto stehen.
 * Die weiteren Fotos laden erst kurz bevor sie gebraucht werden. Bei
 * „Bewegung reduzieren“ steht das Bild still; die Schaltfläche hält den Wechsel an.
 */
(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.hero__slide')];
  const button = document.querySelector('[data-pause]');
  if (slides.length < 2 || !button) return;

  const INTERVAL = 8000;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer = null;
  let paused = reduce.matches;

  function load(slide) {
    return new Promise((resolve) => {
      const img = slide.querySelector('img');
      if (!slide.dataset.loaded) {
        slide.dataset.loaded = '1';
        slide.querySelectorAll('[data-srcset]').forEach((el) => {
          el.srcset = el.dataset.srcset;
          el.removeAttribute('data-srcset');
        });
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      }
      if (img.complete && img.naturalWidth) return resolve(true);
      img.addEventListener('load', () => resolve(true), { once: true });
      img.addEventListener('error', () => resolve(false), { once: true });
    });
  }

  const nextIndex = () => (current + 1) % slides.length;

  function schedule() {
    clearTimeout(timer);
    timer = null;
    if (paused || document.hidden) return;
    load(slides[nextIndex()]); // rechtzeitig vorladen
    timer = setTimeout(advance, INTERVAL);
  }

  async function advance() {
    const index = nextIndex();
    const ok = await load(slides[index]);
    if (ok && !paused && !document.hidden) {
      slides[index].classList.add('is-on');
      slides[current].classList.remove('is-on');
      current = index;
    }
    schedule();
  }

  function update() {
    document.documentElement.classList.toggle('is-paused', paused);
    button.setAttribute('aria-pressed', String(paused)); // Beschriftung bleibt „Bildwechsel anhalten“
    schedule();
  }

  button.hidden = false;
  button.addEventListener('click', () => {
    paused = !paused;
    update();
  });
  document.addEventListener('visibilitychange', schedule);
  reduce.addEventListener?.('change', () => {
    paused = reduce.matches;
    update();
  });
  update();
})();
