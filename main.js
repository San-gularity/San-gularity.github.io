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

function isExternal(href) {
  return /^https?:/i.test(href) && !href.startsWith(location.origin);
}

function link(href, className, text) {
  const anchor = el('a', className, text);
  anchor.href = href;
  if (isExternal(href)) anchor.rel = 'noopener noreferrer';
  return anchor;
}

const BADGES = { live: 'Live', wip: 'Wip', new: 'New' };

function tile(app) {
  const href = safeHref(app.url);
  if (!href || !app.name) return null;

  const card = link(href, 'tile');

  const top = el('div', 'tile__top');
  const icon = el('span', 'tile__icon', app.icon || '🎮');
  icon.setAttribute('aria-hidden', 'true');
  top.append(icon);

  const status = String(app.status || 'live').toLowerCase();
  if (BADGES[status]) top.append(el('span', `badge badge--${status}`, BADGES[status]));
  card.append(top);

  card.append(el('h2', 'tile__name', app.name));
  if (app.year) card.append(el('div', 'tile__year', app.year));
  if (app.blurb) card.append(el('p', 'tile__blurb', app.blurb));
  return card;
}

function renderShelf() {
  const shelf = document.querySelector('[data-shelf]');
  const cards = APPS.map(tile).filter(Boolean);
  shelf.replaceChildren(...cards);

  const count = cards.length;
  const label = document.querySelector('[data-count]');
  if (label) label.textContent = `${count} ${count === 1 ? 'cartridge' : 'cartridges'}`;
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
    if (href) nav.insertBefore(link(href, 'chip', chip.label), spacer);
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

renderShelf();
renderLinks();
setUpTheme();
