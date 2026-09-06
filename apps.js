/**
 * The shelf — the only file you edit to add a toy.
 *
 * Adding one:
 *   1. Put it somewhere public (its own repo + GitHub Pages, a Chrome store
 *      listing, itch.io — anywhere with a URL).
 *   2. Append an entry to APPS below.
 *   3. Push.
 *
 * Fields:
 *   name    shown in the pixel font — keep it short, it wraps at ~18 characters
 *   url     '/repo-name/' for anything on this domain, or a full https:// URL
 *   icon    one emoji
 *   blurb   one sentence, plain language
 *   status  'live' | 'wip' | 'new'      drives the coloured badge
 *   kind    free text tag ('Chrome extension', 'itch.io', 'GitHub project'…)
 *   year    number
 *   theme   the card wears the app's own colours: { bg, ink, muted, accent }
 *           hex values only — anything else is ignored
 *   art     optional screenshot blended into the card background
 *   pixelArt  true keeps low-res art crisp instead of smoothing it
 *
 * Text is rendered as text and never as HTML; colours and paths are validated
 * in main.js before they reach the DOM.
 */
export const APPS = [
  {
    name: 'Split the Bill',
    url: '/FoodBillCalculator/',
    icon: '🧾',
    blurb: 'Scan a receipt, tap who ate what, pay to the cent.',
    status: 'live',
    kind: 'Web app',
    year: 2026,
    theme: { bg: '#0b0e14', ink: '#eef1f7', muted: '#97a1b4', accent: '#7c7cf9' },
    art: './assets/split-the-bill.jpg',
  },
  {
    name: 'Leetion',
    url: 'https://chromewebstore.google.com/detail/leetcode-to-notion/kdlncolgahgakhkfaipeillkppfhooag',
    icon: '🧩',
    blurb: 'Save a LeetCode problem straight into Notion, one click.',
    status: 'live',
    kind: 'Chrome extension',
    year: 2026,
    theme: { bg: '#141a2e', ink: '#e8ecf7', muted: '#98a2c0', accent: '#ffa116' },
    art: './assets/leetion.jpg',
  },
  {
    name: 'Clown GPT',
    url: 'https://chromewebstore.google.com/detail/clown-gpt-chatgpt-copy-bl/ohdffmcikkokalnfobnpbipkicimkppg',
    icon: '🤡',
    blurb: 'Blocks copying on ChatGPT and roasts you for trying.',
    status: 'live',
    kind: 'Chrome extension',
    year: 2025,
    theme: { bg: '#151517', ink: '#ececf1', muted: '#a1a5ad', accent: '#ff5a5f' },
  },
  {
    name: 'Space-Boy',
    url: '/space-boy/',
    icon: '👾',
    blurb: 'A 2D platformer, and the first game I ever finished. Runs in the browser.',
    status: 'live',
    kind: 'Web game',
    year: 2021,
    theme: { bg: '#10243d', ink: '#eaf4ff', muted: '#9db6d4', accent: '#fa5c5c' },
    art: './assets/space-boy.png',
    pixelArt: true,
  },
  {
    name: 'Flappy Rocket',
    url: '/flappy-rocket/',
    icon: '🚀',
    blurb: 'Flappy Bird with a rocket. Endless, and harder than it looks.',
    status: 'new',
    kind: 'Web game',
    year: 2021,
    theme: { bg: '#0a1020', ink: '#e8f0ff', muted: '#93a4c4', accent: '#ff7a3d' },
  },
  {
    name: 'Delta RAG',
    url: 'https://github.com/San-gularity/delta_RAG_pipeline',
    icon: '🧠',
    blurb: 'Incremental RAG over a corpus with Spark, Delta Lake and Scala.',
    status: 'live',
    kind: 'GitHub project',
    year: 2025,
    theme: { bg: '#0d1117', ink: '#e6edf3', muted: '#8b949e', accent: '#58a6ff' },
  },
  {
    name: 'Sans Archive',
    url: '/San-gularity/',
    icon: '🗃️',
    blurb: 'Past work and portfolio.',
    status: 'live',
    kind: 'Portfolio',
    year: 2025,
    theme: { bg: '#050509', ink: '#e2e8f0', muted: '#94a3b8', accent: '#d4af37' },
    art: './assets/sans-archive.jpg',
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
