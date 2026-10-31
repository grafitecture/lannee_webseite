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
/* Wochenplan & Live-Anzeige                                           */
/* ------------------------------------------------------------------ */

const LOC_COLOR = { garage: 'var(--garage)', kiosque: 'var(--kiosque)', marche: 'var(--marche)' };

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

function initPlan() {
  const plan = document.querySelector('[data-plan]');
  if (!plan) return;
  const live = document.querySelector('[data-live]');
  const schedule = JSON.parse(plan.dataset.schedule);
  const closures = JSON.parse(plan.dataset.closures || '[]');
  const strings = JSON.parse(plan.dataset.strings);
  const locale = plan.dataset.locale;
  const [axisFrom, axisTo] = plan.dataset.axis.split(',').map(Number);
  const dateFmt = new Intl.DateTimeFormat(strings.intl, { day: 'numeric', month: 'short', timeZone: 'UTC' });

  const update = () => {
    const now = berlinNow();
    const status = computeStatus(schedule, now, closures);
    const parts = statusParts(status, strings, locale);
    const paused = pausedSlots(schedule, now, closures);

    // Balken: geöffnet, als Nächstes, diesmal Pause
    plan.querySelectorAll('[data-slot]').forEach((node) => {
      const i = Number(node.dataset.slot);
      const isOpen = status.state === 'open' && status.slot.i === i;
      const isNext = status.state === 'next' && status.slot.i === i;
      node.classList.toggle('is-paused', paused.has(i));
      node.classList.toggle('is-open', isOpen);
      node.classList.toggle('is-next', isNext);
      let badge = node.querySelector('.plan__badge');
      if (isOpen || isNext) {
        if (!badge) {
          badge = el('span', 'plan__badge');
          node.prepend(badge);
        }
        badge.textContent = isOpen ? strings.open : strings.next;
      } else if (badge) badge.remove();
    });

    // Tage: heute / morgen / Datum, Jetzt-Linie
    plan.querySelectorAll('.plan__day').forEach((row) => {
      const days = row.dataset.days.split(',').map(Number);
      const isToday = days.includes(now.iso);
      row.classList.toggle('is-today', isToday);
      const date = row.querySelector('.plan__date');
      if (date) {
        if (days.length > 1) date.textContent = isToday ? strings.today : '';
        else {
          const ahead = (days[0] - now.iso + 7) % 7;
          date.textContent =
            ahead === 0 ? strings.today : ahead === 1 ? strings.tomorrow : dateFmt.format(new Date(`${addDays(now.ymd, ahead)}T00:00:00Z`));
        }
      }
      const marker = row.querySelector('.plan__now');
      if (marker) {
        const show = isToday && now.hour >= axisFrom && now.hour <= axisTo;
        marker.hidden = !show;
        if (show) row.style.setProperty('--now', now.hour.toFixed(3));
      }
    });

    // Hero: Band des Ortes, der gerade geöffnet hat oder als Nächstes öffnet, markieren
    document.querySelectorAll('[data-place-live]').forEach((node) => {
      const mine = (status.state === 'open' || status.state === 'next') && status.slot.loc === node.dataset.placeLive;
      node.classList.toggle('is-open', mine && status.state === 'open');
      node.classList.toggle('is-next', mine && status.state === 'next');
      const badge = node.querySelector('.hero-place__badge');
      if (!badge) return;
      badge.hidden = !mine;
      badge.textContent = mine ? (status.state === 'open' ? strings.open : strings.next) : '';
    });

    // Live-Anzeige im Hero
    if (live) {
      live.hidden = false;
      live.classList.toggle('is-open', status.state === 'open');
      live.style.setProperty('--live', LOC_COLOR[parts.key]);
      const text = live.querySelector('.live__text');
      text.innerHTML = '';
      const a = el('a', '', parts.name);
      a.href = parts.url;
      text.append(document.createTextNode(`${parts.state}: `), a, document.createTextNode(`, ${parts.detail}`));
    }
  };

  update();
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
    // Auf dem Bild weiß, in der Kopfzeile Palm Leaf
    mark.style.setProperty('--morph-p', move.toFixed(3));
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
initPlan();
initYear();
initMenuFilter();
