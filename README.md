# San's Playground

Personal landing site and project index, hosted at
**[san-gularity.github.io](https://san-gularity.github.io/)**.

It serves as the front page for everything I've built for the browser, and as the root of
the domain that the individual project sites are published under.

## Projects listed

| Project | Type | Location |
|---|---|---|
| Split the Bill | Web app | [`/FoodBillCalculator/`](https://san-gularity.github.io/FoodBillCalculator/) |
| Leetion | Chrome extension | [Chrome Web Store](https://chromewebstore.google.com/detail/leetcode-to-notion/kdlncolgahgakhkfaipeillkppfhooag) |
| Clown GPT | Chrome extension | [Chrome Web Store](https://chromewebstore.google.com/detail/clown-gpt-chatgpt-copy-bl/ohdffmcikkokalnfobnpbipkicimkppg) |
| Space-Boy | Unity game | [itch.io](https://san-gularity.itch.io/space-boy) |
| Delta RAG | Data pipeline | [GitHub](https://github.com/San-gularity/delta_RAG_pipeline) |
| Sans Archive | Portfolio | [`/San-gularity/`](https://san-gularity.github.io/San-gularity/) |

## Technology

Static HTML, CSS and vanilla JavaScript (ES modules). No framework, no build step, no
dependencies, no analytics. The only external resource is the Google Fonts stylesheet.

## Repository layout

```
index.html      landing page
404.html        error page, served for any unmatched path on the domain
styles.css      styles and theme tokens (light and dark)
apps.js         project registry and profile links
main.js         renders the project grid from the registry
climber.js      decorative cursor animation
assets/         project thumbnails
resume.pdf      linked from the header and footer
```

## Local development

```bash
python3 -m http.server 4180
# http://localhost:4180
```

## Deployment

GitHub Pages builds from the `main` branch, root directory. Pushing to `main` publishes.

Because this repository is named after the account, it is published at the domain root,
and every other repository with Pages enabled is served beneath it as
`san-gularity.github.io/<repository>/`. A custom domain configured here would apply to all
of them.

After changing `styles.css` or any script, increment the `?v=` query string on the `<link>`
and `<script>` tags in `index.html` and `404.html`. Without it, browsers may serve a cached
copy of the previous deployment.

## Adding a project

1. Publish it (GitHub Pages, Chrome Web Store, itch.io — anywhere with a public URL).
2. Add an entry to the `APPS` array in `apps.js`:

```js
{
  name: 'Project name',
  url: 'https://example.com/',
  icon: '🎮',
  blurb: 'One sentence describing it.',
  status: 'live',              // 'live' | 'wip' | 'new'
  kind: 'Web app',             // free-text label shown on the card
  year: 2026,
  theme: { bg: '#0b0e14', ink: '#f3f4f6', muted: '#9ca3af', accent: '#7c7cf9' },
  art: './assets/name.jpg',    // optional screenshot
}
```

3. Commit and push.

Card colours must be hex values and `art` must be a relative path inside `assets/`; both
are validated in `main.js` and ignored otherwise. Registry text is inserted via
`textContent`, never as HTML.

## Conventions for projects hosted under this domain

All project sites share the `san-gularity.github.io` origin, which has two consequences:

- **Browser storage is shared.** Namespace all keys (`projectname:setting`). Split the Bill
  uses the `fbs:` prefix and an IndexedDB database named `food-bill-splitter`.
- **Asset paths must be relative.** Use `href="styles.css"`, not `href="/styles.css"`, since
  each project is served from a subdirectory.

Each project repository should also contain an empty `.nojekyll` file so that GitHub Pages
serves its files unprocessed.
