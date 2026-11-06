/**
 * L'ANNÉE – kleines, abhängigkeitsfreies Frontend-Skript.
 * Alles hier ist progressive Verbesserung: Ohne JavaScript bleibt
 * jede Seite vollständig lesbar und bedienbar.
 */

const TZ = 'Europe/Berlin';

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
  const dateFmt = new Intl.DateTimeFormat(strings.intl, { day: 'numeric', month: 'short', timeZone: 'UTC' });

  const update = () => {
    const now = berlinNow();
    const status = computeStatus(schedule, now, closures);
    const parts = statusParts(status, strings, locale);
    const paused = pausedSlots(schedule, now, closures);

    // Orte im Plan: geöffnet, als Nächstes, diesmal Pause
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

    // Tage: heute / morgen / Datum
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
    });

    // Live-Hinweis unter „Ein Wochenende, drei Orte“: Jetzt geöffnet / Als Nächstes
    if (live) {
      live.classList.add('is-live');
      live.classList.toggle('is-open', status.state === 'open');
      live.style.setProperty('--live', LOC_COLOR[parts.key]);
      live.href = parts.url;
      live.querySelector('[data-live-state]').textContent = parts.state;
      live.querySelector('[data-live-name]').textContent = parts.name;
      live.querySelector('[data-live-detail]').textContent = parts.detail;
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
/* Kopfzeile: über dem Vollbild-Foto durchsichtig, nach dem Scrollen    */
/* Bleu nuit (Umbau 05.11.2026). Ohne JavaScript scrollt sie einfach mit.*/
/* ------------------------------------------------------------------ */

function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  document.documentElement.classList.add('js');
  if (!header.classList.contains('site-header--overlay')) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    header.classList.toggle('is-solid', window.scrollY > 24);
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

initHeader();
initExpiry();
initMenu();
initPlan();
initMenuFilter();
