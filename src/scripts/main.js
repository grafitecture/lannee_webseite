/**
 * L'ANNÉE – kleines, abhängigkeitsfreies Frontend-Skript.
 * Alles hier ist progressive Verbesserung: Ohne JavaScript bleibt
 * jede Seite vollständig lesbar und bedienbar.
 */

const TZ = 'Europe/Berlin';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/* Zeit in Mannheim                                                    */
/* ------------------------------------------------------------------ */

const DAY_INDEX = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };

function berlinNow(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ,
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value])
  );
  const iso = DAY_INDEX[parts.weekday];
  const hour = Number(parts.hour) + Number(parts.minute) / 60;
  return {
    iso,
    hour,
    weekHours: (iso - 1) * 24 + hour,
    ymd: `${parts.year}-${parts.month}-${parts.day}`,
    month: Number(parts.month),
    day: Number(parts.day),
    year: Number(parts.year),
  };
}

const toHours = (s) => {
  const [h, m] = s.split(':').map(Number);
  return h + m / 60;
};

/** Winkel auf der nichtlinearen Wochenskala (muss zu components.mjs passen). */
function weekAngle(hours) {
  const h = ((hours % 168) + 168) % 168;
  if (h < 96) return (150 + h * 0.625) % 360;
  return (210 + (h - 96) * (300 / 72)) % 360;
}

function formatTime(hhmm, locale) {
  const [h, m] = hhmm.split(':').map(Number);
  if (locale === 'en') {
    const suffix = h >= 12 && h < 24 ? 'pm' : 'am';
    const h12 = ((h + 11) % 12) + 1;
    return m ? `${h12}:${String(m).padStart(2, '0')} ${suffix}` : `${h12} ${suffix}`;
  }
  if (locale === 'fr') return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
  return m ? `${h}:${String(m).padStart(2, '0')} Uhr` : `${h} Uhr`;
}

const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

/* ------------------------------------------------------------------ */
/* Wochenuhr & Live-Anzeige                                            */
/* ------------------------------------------------------------------ */

const LOC_COLOR = { garage: 'var(--vin)', kiosque: 'var(--bleu)', marche: 'var(--vert)' };

function addDays(ymd, days) {
  const [y, m, d] = ymd.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + days));
  return t.toISOString().slice(0, 10);
}

/** Termine der nächsten Wochen ab jetzt, ohne Schließtage. */
function computeStatus(schedule, now, closures = []) {
  const occ = [];
  for (let d = 0; d <= 28; d++) {
    const isoDay = ((now.iso - 1 + d) % 7) + 1;
    const date = addDays(now.ymd, d);
    for (const s of schedule) {
      if (s.day !== isoDay) continue;
      const startIn = d * 24 + toHours(s.start) - now.hour;
      const endIn = d * 24 + toHours(s.end) - now.hour;
      if (endIn <= 0) continue;
      const closed = closures.some((c) => (c.locations || []).includes(s.loc) && date >= c.from && date <= c.to);
      if (!closed) occ.push({ ...s, date, startIn, endIn, inDays: d });
    }
  }
  occ.sort((a, b) => a.startIn - b.startIn);
  const open = occ.find((o) => o.startIn <= 0 && o.endIn > 0);
  if (open) return { state: 'open', slot: open, inDays: 0 };
  const next = occ.find((o) => o.startIn > 0);
  return { state: 'next', slot: next, inDays: next.inDays };
}

/** Termine, deren nächstes Vorkommen (innerhalb einer Woche) auf einen Schließtag fällt. */
function pausedSlots(schedule, now, closures) {
  const paused = new Set();
  if (!closures.length) return paused;
  schedule.forEach((s, i) => {
    for (let d = 0; d < 7; d++) {
      if (((now.iso - 1 + d) % 7) + 1 !== s.day) continue;
      if (d === 0 && toHours(s.end) <= now.hour) continue;
      const date = addDays(now.ymd, d);
      if (closures.some((c) => (c.locations || []).includes(s.loc) && date >= c.from && date <= c.to)) paused.add(i);
      break;
    }
  });
  return paused;
}

function statusParts(status, strings, locale) {
  const loc = strings.locations[status.slot.loc];
  const start = formatTime(status.slot.start, locale);
  if (status.state === 'open') {
    const detail = status.slot.openEnd
      ? fill(strings.since, { t: start })
      : `${fill(strings.since, { t: start })}, ${fill(strings.until, { t: formatTime(status.slot.end, locale) })}`;
    return { state: strings.open, name: loc.name, url: loc.url, detail, place: loc.place, key: status.slot.loc };
  }
  const when =
    status.inDays === 0 ? strings.today : status.inDays === 1 ? strings.tomorrow : fill(strings.inDays, { n: status.inDays });
  const dayName = strings.days[status.slot.day - 1];
  const detail = `${dayName}, ${start}`;
  return { state: strings.next, name: loc.name, url: loc.url, detail: `${detail} (${when})`, place: loc.place, key: status.slot.loc };
}

function initWeekClocks() {
  const clocks = document.querySelectorAll('[data-week-clock]');
  const live = document.querySelector('[data-live]');
  if (!clocks.length && !live) return;

  const source = clocks[0];
  if (!source) return;
  const schedule = JSON.parse(source.dataset.schedule);
  const closures = JSON.parse(source.dataset.closures || '[]');
  const strings = JSON.parse(source.dataset.strings);
  const locale = source.dataset.locale;

  let firstRun = true;

  const update = () => {
    const now = berlinNow();
    const status = computeStatus(schedule, now, closures);
    const parts = statusParts(status, strings, locale);
    const color = LOC_COLOR[parts.key];
    const paused = pausedSlots(schedule, now, closures);
    document.querySelectorAll('.tide[data-slot], .wc__arc[data-slot]').forEach((node) => {
      node.classList.toggle('is-paused', paused.has(Number(node.dataset.slot)));
    });

    clocks.forEach((clock) => {
      clock.dataset.state = status.state;
      clock.style.setProperty('--live', color);
      const hand = clock.querySelector('.wc__hand');
      const target = weekAngle(now.weekHours);
      if (hand) {
        hand.removeAttribute('hidden');
        if (firstRun && !reduceMotion) {
          hand.style.transform = 'rotate(0deg)';
          requestAnimationFrame(() => requestAnimationFrame(() => (hand.style.transform = `rotate(${target}deg)`)));
        } else {
          hand.style.transform = `rotate(${target}deg)`;
        }
      }
      const fig = clock.querySelector('.wc__status');
      if (fig) {
        fig.innerHTML = '';
        const state = el('span', 'wc__state', parts.state);
        const name = el('a', 'wc__name', parts.name);
        name.href = parts.url;
        const detail = el('span', 'wc__detail', parts.detail);
        const place = el('span', 'wc__place', parts.place);
        fig.append(state, name, detail, place);
      }
    });

    if (live) {
      live.hidden = false;
      live.classList.toggle('is-open', status.state === 'open');
      live.style.setProperty('--live', color);
      const text = live.querySelector('.live__text');
      text.innerHTML = '';
      const a = el('a', '', parts.name);
      a.href = parts.url;
      text.append(document.createTextNode(`${parts.state}: `), a, document.createTextNode(`, ${parts.detail}`));
    }
    firstRun = false;
  };

  // Zeiger erst drehen, wenn die Uhr sichtbar wird
  if ('IntersectionObserver' in window && clocks.length && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          update();
        }
      },
      { threshold: 0.35 }
    );
    clocks.forEach((c) => io.observe(c));
    // Live-Anzeige im Hero sofort füllen
    if (live) {
      const now = berlinNow();
      const status = computeStatus(schedule, now, closures);
      const parts = statusParts(status, strings, locale);
      live.hidden = false;
      live.classList.toggle('is-open', status.state === 'open');
      live.style.setProperty('--live', LOC_COLOR[parts.key]);
      const text = live.querySelector('.live__text');
      const a = el('a', '', parts.name);
      a.href = parts.url;
      text.append(document.createTextNode(`${parts.state}: `), a, document.createTextNode(`, ${parts.detail}`));
    }
  } else {
    update();
  }
  setInterval(update, 60_000);
}

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

/* ------------------------------------------------------------------ */
/* Jahresuhr & aktueller Monat                                         */
/* ------------------------------------------------------------------ */

function initYear() {
  const now = berlinNow();
  const rings = document.querySelectorAll('[data-year-ring]');
  rings.forEach((ring) => {
    const hand = ring.querySelector('.yr__hand');
    const daysInMonth = new Date(now.year, now.month, 0).getDate();
    const angle = (now.month - 1 + (now.day - 0.5) / daysInMonth) * 30;
    ring.querySelectorAll(`[data-month="${now.month}"]`).forEach((n) => n.classList.add('is-now'));
    if (!hand) return;
    hand.removeAttribute('hidden');
    const go = () => (hand.style.transform = `rotate(${angle}deg)`);
    if (reduceMotion || !('IntersectionObserver' in window)) return go();
    hand.style.transform = 'rotate(0deg)';
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        requestAnimationFrame(go);
      }
    }, { threshold: 0.3 });
    io.observe(ring);
  });

  document.querySelectorAll('.months [data-month]').forEach((li) => {
    li.classList.toggle('is-now', Number(li.dataset.month) === now.month);
  });

  // Teaser auf der Startseite: Monat aktualisieren, falls der Build älter ist
  const box = document.querySelector('[data-month-now]');
  if (box && box.dataset.months) {
    const months = JSON.parse(box.dataset.months);
    const m = months[now.month - 1];
    const label = box.querySelector('.month-now__label');
    const title = box.querySelector('.month-now__title span');
    const text = box.querySelector('.month-now__text');
    const use = box.querySelector('.month-now__icon use');
    if (label) label.textContent = fill(box.dataset.template, { month: m.name });
    if (title) title.textContent = m.title;
    if (text) text.textContent = m.text;
    if (use) use.setAttribute('href', use.getAttribute('href').replace(/#.*$/, `#${m.icon}`));
  }
}

/* ------------------------------------------------------------------ */
/* Kartenfilter                                                        */
/* ------------------------------------------------------------------ */

function initMenuFilter() {
  const root = document.querySelector('[data-menu-root]');
  const bar = document.querySelector('[data-menu-filter]');
  if (!root || !bar) return;
  bar.hidden = false;
  const buttons = [...bar.querySelectorAll('[data-filter]')];
  const valid = new Set(buttons.map((b) => b.dataset.filter));

  const apply = (value, push) => {
    const v = valid.has(value) ? value : 'all';
    root.dataset.filter = v;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === v)));
    if (push) {
      const url = new URL(location.href);
      if (v === 'all') url.searchParams.delete('ort');
      else url.searchParams.set('ort', v);
      history.replaceState(null, '', url);
    }
  };

  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter, true)));
  apply(new URL(location.href).searchParams.get('ort') || 'all', false);
}

/* ------------------------------------------------------------------ */
/* Mobiles Menü                                                        */
/* ------------------------------------------------------------------ */

function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const drawer = document.querySelector('[data-menu]');
  const close = document.querySelector('[data-menu-close]');
  if (!toggle || !drawer) return;
  const root = document.documentElement;
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');

  const open = () => {
    root.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    (drawer.querySelector('[aria-current="page"]') || drawer.querySelector('a'))?.focus();
  };
  const shut = (focusToggle = true) => {
    root.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (location.hash === '#menu') history.replaceState(null, '', location.pathname + location.search);
    if (focusToggle) toggle.focus();
  };

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    root.classList.contains('menu-open') ? shut() : open();
  });
  close?.addEventListener('click', (e) => {
    e.preventDefault();
    shut();
  });
  drawer.addEventListener('click', (e) => {
    if (e.target.closest('a') && !e.target.closest('[data-menu-close]')) shut(false);
  });
  document.addEventListener('keydown', (e) => {
    if (!root.classList.contains('menu-open')) return;
    if (e.key === 'Escape') shut();
    if (e.key === 'Tab') {
      const focusables = [...drawer.querySelectorAll('a, button')].filter((n) => n.offsetParent !== null);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && shut(false));
}

/* ------------------------------------------------------------------ */
/* Termine & Pausen: Vergangenes ausblenden                            */
/* ------------------------------------------------------------------ */

function initExpiry() {
  const today = berlinNow().ymd;
  for (const item of document.querySelectorAll('[data-expires]')) {
    if (item.dataset.expires < today) item.hidden = true;
  }
  for (const group of document.querySelectorAll('[data-expiry-group]')) {
    const left = [...group.querySelectorAll('[data-expires]')].some((item) => !item.hidden);
    const empty = group.querySelectorAll('[data-expiry-empty]');
    if (empty.length) empty.forEach((note) => (note.hidden = left));
    else if (!left) group.hidden = true;
  }
}

/* ------------------------------------------------------------------ */
/* Startseite: großes Logo wird beim Scrollen zum kleinen Logo         */
/* ------------------------------------------------------------------ */

function initLogoMorph() {
  const mark = document.querySelector('[data-logo-morph]');
  const target = document.querySelector('.site-header__logo');
  const logo = mark?.querySelector('svg');
  if (!mark || !target || !logo) return;
  const body = document.body;
  const dock = (docked) => body.classList.toggle('logo-docked', docked);

  // Reduzierte Bewegung: kein Schrumpfen, das kleine Logo erscheint, sobald das große aus dem Blick ist
  if (reduceMotion || !('IntersectionObserver' in window)) {
    if (!('IntersectionObserver' in window)) return dock(true);
    const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 0;
    new IntersectionObserver(([entry]) => dock(!entry.isIntersecting), {
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
    }).observe(mark);
    return;
  }

  let geo;
  const measure = () => {
    const from = mark.getBoundingClientRect(); // Platzhalter im Fluss
    const to = target.getBoundingClientRect(); // kleines Logo in der Kopfzeile (sticky)
    const top = from.top + window.scrollY;
    geo = {
      dx: to.left - from.left,
      dy: to.top - top,
      scale: to.width / from.width,
      distance: Math.max(from.height, 96), // so viel Scrollweg braucht der Übergang
    };
    mark.style.setProperty('--morph-top', `${top}px`);
    mark.style.setProperty('--morph-left', `${from.left}px`);
    mark.style.setProperty('--morph-width', `${from.width}px`);
  };
  const update = () => {
    const p = Math.min(Math.max(window.scrollY / geo.distance, 0), 1);
    // Erst schrumpfen, dann hochgleiten: So ist das Logo schon klein, wenn es die Navigation erreicht,
    // und kommt ohne Ruck in der Kopfzeile an.
    const shrink = 1 - (1 - p) ** 2;
    const move = p * p * (3 - 2 * p);
    logo.style.transform = `translate(${geo.dx * move}px, ${geo.dy * move}px) scale(${1 + (geo.scale - 1) * shrink})`;
    dock(p >= 1);
  };

  let frame = 0;
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(() => ((frame = 0), update()));
  };
  measure();
  body.classList.add('logo-morph');
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', () => (measure(), update()));
}

initLogoMorph();
initExpiry();
initMenu();
initWeekClocks();
initYear();
initMenuFilter();
