// Renders the shelf from apps.js. Everything from the registry goes in as text
// (never innerHTML), and hrefs are checked before they reach the DOM, so a typo
// in apps.js can never turn into markup or a javascript: URL on a public page.

import { APPS, LINKS } from './apps.js';

const THEME_KEY = 'playground:theme'; // namespaced — every app here shares one origin

/** Same-origin paths, https:, and mailto: only. Anything else is dropped. */
function safeHref(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const href = value.trim();
  if (href.startsWith('/') || href.startsWith('./') || href.startsWith('#')) return href;
  try {
    const url = new URL(href, location.origin);
    if (url.protocol === 'https:' || url.protocol === 'mailto:') return href;
  } catch {
    /* not a URL */
  }
  return null;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = String(text);
  return node;
}

function link(href, className, text) {
  const anchor = el('a', className, text);
  anchor.href = href;
  // Everything opens in its own tab so the shelf stays put behind you.
  // noopener/noreferrer on all of them: target="_blank" otherwise hands the
  // opened page a handle on this one via window.opener.
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  return anchor;
}

const BADGES = { live: 'Live', wip: 'Wip', new: 'New' };

/** Hex colours only — these end up in a style attribute. */
function safeColor(value) {
  return typeof value === 'string' && /^#[0-9a-f]{3,8}$/i.test(value.trim()) ? value.trim() : null;
}

/** Card art must be a relative file in this repo, never a remote URL. */
function safeArt(value) {
  return typeof value === 'string' && /^\.\/[\w./-]+\.(png|jpe?g|webp|gif|avif)$/i.test(value.trim())
    ? value.trim()
    : null;
}

/** Secondary destinations: [{label, url}], each validated like any other href. */
function safeLinks(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry.label !== 'string' || !entry.label.trim()) return null;
      const href = safeHref(entry.url);
      return href ? { label: entry.label.trim(), href } : null;
    })
    .filter(Boolean);
}

function tile(app) {
  const href = safeHref(app.url);
  if (!href || !app.name) return null;

  // The card is an <article>, not an <a>: it can hold its own links, and a link
  // inside a link is invalid HTML. The title's anchor is stretched over the
  // whole card in CSS, so clicking anywhere still opens the primary URL while
  // the buttons along the bottom stay clickable on top of it.
  const card = el('article', 'tile');

  // Each card wears the palette of the thing it opens, so the shelf previews
  // what you're about to walk into.
  const theme = app.theme || {};
  for (const [token, value] of Object.entries({
    '--tile-bg': safeColor(theme.bg),
    '--tile-ink': safeColor(theme.ink),
    '--tile-muted': safeColor(theme.muted),
    '--tile-accent': safeColor(theme.accent),
  })) {
    if (value) card.style.setProperty(token, value);
  }

  const art = safeArt(app.art);
  if (art) {
    card.classList.add('tile--art');
    if (app.pixelArt) card.classList.add('tile--pixel');
    const layer = el('span', 'tile__art');
    layer.setAttribute('aria-hidden', 'true');
    layer.style.backgroundImage = `url("${encodeURI(art)}")`;
    card.append(layer);
  }

  const top = el('div', 'tile__top');
  const icon = el('span', 'tile__icon', app.icon || '🎮');
  icon.setAttribute('aria-hidden', 'true');
  top.append(icon);

  // 'none' is for things that aren't really releases — a PDF, say.
  const status = String(app.status || 'live').toLowerCase();
  if (status !== 'none' && BADGES[status]) {
    top.append(el('span', `badge badge--${status}`, BADGES[status]));
  }
  card.append(top);

  const name = el('h2', 'tile__name');
  name.append(link(href, 'tile__primary', app.name));
  card.append(name);

  const meta = el('div', 'tile__meta');
  if (app.year) meta.append(el('span', 'tile__year', app.year));
  if (app.kind) meta.append(el('span', 'tile__kind', app.kind));
  if (meta.childNodes.length) card.append(meta);

  if (app.blurb) card.append(el('p', 'tile__blurb', app.blurb));

  // A newspaper-style corner burst, the way old ads shouted "FREE". Two
  // explicit lines rather than relying on the text wrapping inside the spikes.
  if (app.noAi) {
    const stamp = el('span', 'tile__stamp');
    stamp.title = 'Made without AI assistance';
    stamp.setAttribute('aria-label', 'Made without AI assistance');
    stamp.append(el('span', 'tile__stamp-line', 'No'));
    stamp.append(el('span', 'tile__stamp-line', 'AI'));
    card.append(stamp);
  }

  const extras = safeLinks(app.links);
  if (extras.length) {
    const row = el('div', 'tile__links');
    for (const extra of extras) row.append(link(extra.href, 'tile__link', extra.label));
    card.append(row);
  }

  return card;
}

function renderShelf() {
  const shelf = document.querySelector('[data-shelf]');
  const cards = APPS.map(tile).filter(Boolean);
  shelf.replaceChildren(...cards);

  const count = cards.length;
  const text = `${count} ${count === 1 ? 'cartridge' : 'cartridges'}`;
  for (const label of document.querySelectorAll('[data-count]')) label.textContent = text;
  return count;
}

/** Nav chips and footer links exist only when apps.js gives them a value. */
function renderLinks() {
  const nav = document.querySelector('[data-nav]');
  const shelfCol = document.querySelector('[data-links-shelf]');
  const elsewhereCol = document.querySelector('[data-links-elsewhere]');
  const coinCol = document.querySelector('[data-links-coin]');

  const chips = [
    { href: LINKS.resume, label: 'Resume' },
    { href: LINKS.linkedin, label: 'LinkedIn' },
    { href: LINKS.github, label: 'GitHub' },
    { href: LINKS.email ? `mailto:${LINKS.email}` : null, label: 'Email' },
  ];
  const spacer = nav.querySelector('.nav__spacer');
  for (const chip of chips) {
    const href = safeHref(chip.href);
    // Resume has no card on the shelf any more — this chip is how you reach it,
    // so it gets the filled treatment rather than blending into the row.
    const TINTED = { Resume: 'chip chip--primary', LinkedIn: 'chip chip--accent', GitHub: 'chip chip--accent' };
    const cls = TINTED[chip.label] || 'chip';
    if (href) nav.insertBefore(link(href, cls, chip.label), spacer);
  }

  for (const app of APPS) {
    const href = safeHref(app.url);
    if (href) shelfCol.append(link(href, 'footer__link', app.name));
  }

  const elsewhere = [
    { href: LINKS.github, label: 'GitHub' },
    { href: LINKS.linkedin, label: 'LinkedIn' },
    { href: LINKS.email ? `mailto:${LINKS.email}` : null, label: 'Email' },
    { href: LINKS.resume, label: 'Resume (PDF)' },
  ];
  for (const item of elsewhere) {
    const href = safeHref(item.href);
    if (href) elsewhereCol.append(link(href, 'footer__link', item.label));
  }

  const coffee = safeHref(LINKS.coffee);
  if (coffee) coinCol.append(link(coffee, 'coffee', 'Buy me a coffee'));
  else coinCol.querySelector('[data-coin-note]').textContent = 'Everything here is free. No ads, no trackers, no accounts.';
}

function setUpTheme() {
  const button = document.querySelector('[data-theme-toggle]');
  // No attribute means light — that's the default look, so read it that way
  // rather than comparing against 'light' and mistaking undefined for dark.
  const current = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  const label = () => (current() === 'dark' ? 'Light' : 'Dark');
  button.textContent = label();
  button.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    button.textContent = label();
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode or blocked storage: the theme still switches for this visit.
    }
  });
}


/* ---- confetti ----------------------------------------------------------
   A small burst of pixels wherever you click something. Every card and link
   opens in a new tab, so the shelf stays put behind you and the burst is
   actually seen. Particles are driven by the Web Animations API and delete
   themselves on finish, so nothing accumulates in the DOM. */

const PARTY = ['#7c7cf9', '#ffd83d', '#43c86a', '#d98b4a', '#ff5a5f', '#22e6e6'];
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let confettiLayer = null;
function layer() {
  if (!confettiLayer) {
    confettiLayer = el('div', 'confetti-layer');
    confettiLayer.setAttribute('aria-hidden', 'true');
    document.body.append(confettiLayer);
  }
  return confettiLayer;
}

function burst(x, y) {
  if (reduceMotion()) return;
  const host = layer();
  const count = 18;
  for (let i = 0; i < count; i += 1) {
    const bit = el('span', 'confetti-bit');
    bit.style.left = `${x}px`;
    bit.style.top = `${y}px`;
    bit.style.background = PARTY[Math.floor(Math.random() * PARTY.length)];
    host.append(bit);

    // Fan out evenly, jittered, then let gravity pull the tail down.
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 50 + Math.random() * 80;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance + 70;
    const spin = (Math.random() - 0.5) * 720;

    bit
      .animate(
        [
          { transform: 'translate(-50%, -50%) rotate(0deg) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${spin}deg) scale(0.4)`, opacity: 0 },
        ],
        { duration: 650 + Math.random() * 450, easing: 'cubic-bezier(0.2, 0.7, 0.35, 1)' },
      )
      .addEventListener('finish', () => bit.remove());
  }
}

function setUpConfetti() {
  document.addEventListener('click', (event) => {
    const hit = event.target.closest('.tile, .chip, .footer__link, .coffee');
    if (!hit) return;
    // Keyboard activation reports 0,0 — burst from the middle of the thing instead.
    let { clientX: x, clientY: y } = event;
    if (!x && !y) {
      const box = hit.getBoundingClientRect();
      x = box.left + box.width / 2;
      y = box.top + box.height / 2;
    }
    burst(x, y);
  });
}

renderShelf();
renderLinks();
setUpTheme();
setUpConfetti();
