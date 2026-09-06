/**
 * The shelf — the only file you edit to add a toy.
 *
 * Adding one:
 *   1. Deploy it (its own public repo, GitHub Pages, `.nojekyll`, relative asset paths).
 *   2. Append an entry to APPS below.
 *   3. Push.
 *
 * Fields:
 *   name    shown in the pixel font — keep it short, it wraps at ~18 characters
 *   url     '/repo-name/' for anything on this domain, or a full https:// URL
 *   icon    one emoji
 *   blurb   one sentence, plain language
 *   status  'live' | 'wip' | 'new'   (drives the badge)
 *   year    number
 *
 * Everything here is rendered as text, never as HTML, so odd characters are safe.
 */
export const APPS = [
  {
    name: 'Split the Bill',
    url: '/FoodBillCalculator/',
    icon: '🧾',
    blurb: 'Scan a receipt, tap who ate what, pay to the cent.',
    status: 'live',
    year: 2026,
  },
  {
    name: 'Sans Archive',
    url: '/San-gularity/',
    icon: '🗃️',
    blurb: 'Past work and portfolio.',
    status: 'live',
    year: 2025,
  },
];

/**
 * Personal links in the nav and footer.
 *
 * A link only appears once it has a value — `null` means "don't render it", so
 * there are never dead links on the page. Fill one in and it shows up.
 */
export const LINKS = {
  github: 'https://github.com/San-gularity',
  linkedin: 'https://linkedin.com/in/sanath0307',
  email: 'sanath0307@gmail.com',
  resume: './resume.pdf',
  coffee: null, // e.g. 'https://buymeacoffee.com/san' → adds the "Buy me a coffee" button
};
