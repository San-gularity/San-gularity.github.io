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
 *   url     where the card itself goes: '/repo-name/' for anything on this
 *           domain, or a full https:// URL. Clicking anywhere on the card that
 *           is not one of the `links` buttons opens this.
 *   icon    one emoji
 *   blurb   a sentence or two, plain language
 *   status  'live' | 'wip' | 'new'      drives the coloured badge
 *           'none' renders no badge, for things that aren't really releases
 *   kind    free text tag ('Chrome extension', 'itch.io', 'GitHub project'…)
 *   year    number
 *   theme   the card wears the app's own colours: { bg, ink, muted, accent }
 *           hex values only — anything else is ignored
 *   art     optional screenshot blended into the card background
 *   pixelArt  true keeps low-res art crisp instead of smoothing it
 *   links   optional [{ label, url }] shown as buttons along the bottom, for
 *           the other places a thing lives — source, a store page, an itch.io
 *           listing. The card's own `url` stays the primary click.
 *
 * Text is rendered as text and never as HTML; colours and paths are validated
 * in main.js before they reach the DOM.
 */
export const APPS = [
  {
    name: 'Delta RAG',
    url: 'https://github.com/San-gularity/delta_RAG_pipeline',
    icon: '🧠',
    blurb: 'Incremental retrieval-augmented generation over a document corpus, built on Spark, Delta Lake and Scala. Re-indexes only what changed instead of rebuilding the whole store.',
    status: 'live',
    kind: 'GitHub project',
    year: 2025,
    noAi: true,
    theme: { bg: '#0d1117', ink: '#e6edf3', muted: '#8b949e', accent: '#58a6ff' },
  },
  {
    name: 'Sans Archive',
    url: '/San-gularity/',
    icon: '🗃️',
    blurb: 'The long-form portfolio — past work, write-ups and the projects that did not fit on a card.',
    status: 'live',
    kind: 'Portfolio',
    year: 2025,
    theme: { bg: '#050509', ink: '#e2e8f0', muted: '#94a3b8', accent: '#d4af37' },
    art: './assets/sans-archive.jpg',
  },
  {
    name: 'Split the Bill',
    url: '/FoodBillCalculator/',
    icon: '🧾',
    blurb: 'Scan a receipt, tap who ate what, and it works out what everyone owes to the cent — tax and tip included.',
    status: 'live',
    kind: 'Web app',
    year: 2026,
    theme: { bg: '#0b0e14', ink: '#eef1f7', muted: '#97a1b4', accent: '#7c7cf9' },
    art: './assets/split-the-bill.jpg',
  },
  {
    name: 'Space-Boy',
    url: '/space-boy/',
    icon: '👾',
    blurb: 'A 2D platformer and the first game I ever finished — one level, three lives, made for a college project. Plays in the browser now.',
    status: 'live',
    kind: 'Web game',
    year: 2021,
    noAi: true,
    theme: { bg: '#10243d', ink: '#eaf4ff', muted: '#9db6d4', accent: '#fa5c5c' },
    art: './assets/space-boy.png',
    pixelArt: true,
    links: [
      { label: 'itch.io', url: 'https://san-gularity.itch.io/space-boy' },
      { label: 'Source', url: 'https://github.com/San-gularity/2D-Platfromer-Unity' },
    ],
  },
  {
    name: 'Flappy Rocket',
    url: '/flappy-rocket/',
    icon: '🚀',
    blurb: 'Flappy Bird with a rocket, endless obstacles and a high score that follows you back. Click, tap or hold space to fly.',
    status: 'new',
    kind: 'Web game',
    year: 2021,
    noAi: true,
    theme: { bg: '#02060a', ink: '#e6ffff', muted: '#79cfd4', accent: '#22e6e6' },
    art: './assets/flappy-rocket.jpg',
    links: [
      { label: 'Source', url: 'https://github.com/San-gularity/Flappy-Rocket-Unity' },
    ],
  },
  {
    name: 'Leetion',
    url: 'https://chromewebstore.google.com/detail/leetcode-to-notion/kdlncolgahgakhkfaipeillkppfhooag',
    icon: '🧩',
    blurb: 'Save a LeetCode problem straight into Notion in one click — problem, your solution, and the tags to revise by.',
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
    blurb: 'Blocks copying on ChatGPT and roasts you for trying. Built as a joke, still installed by strangers.',
    status: 'live',
    kind: 'Chrome extension',
    year: 2025,
    theme: { bg: '#151517', ink: '#ececf1', muted: '#a1a5ad', accent: '#ff5a5f' },
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
