# san-gularity.github.io

The front door. A single page listing the things I've built for the browser, so they're
all reachable from one place instead of scattered across repo URLs.

Live at **https://san-gularity.github.io/**

## How it fits together

This is a GitHub **user site** (the repo name matches the username), which is what puts it
at the domain root. Every toy keeps its own repo and publishes as a project site:

```
san-gularity.github.io/            this repo — the hub
  /FoodBillCalculator/             Split the Bill
  /San-gularity/                   Sans Archive (portfolio)
  /<next-toy>/                     one repo per toy
```

Because the hub sits at the root, setting a custom domain here later moves every app with
it — nothing else needs changing.

## Adding a new toy

1. Build it in its own **public** repo, static files at the root, with a `.nojekyll` file.
2. Repo → Settings → Pages → Deploy from a branch → `main` / (root).
3. Append one entry to [`apps.js`](apps.js) and push. That's it.

For a React/Vite app: set `base: '/<repo-name>/'` in `vite.config.js`, switch Pages source
to **GitHub Actions**, and use `HashRouter` (or copy `index.html` to `404.html` at build
time) so deep links resolve.

## Four rules that keep this from breaking

Every app shares one origin, so they can step on each other:

1. **Namespace browser storage.** A bare `localStorage.setItem('score', …)` in two games
   collides. Prefix everything (`snake:score`), the way the bill app uses `fbs:` and an
   IndexedDB named `food-bill-splitter`.
2. **Relative paths only.** `href="styles.css"`, never `href="/styles.css"` — apps live at
   a subpath.
3. **Cache-bust on deploy.** Bump `?v=YYYY-MM-DD` on the `<link>` and `<script>` tags in
   `index.html`, or browsers serve yesterday's CSS.
4. **`.nojekyll` in every repo**, so files are served exactly as committed.

## What's in here

| File | |
|---|---|
| `index.html` | The shelf page |
| `404.html` | Served for any missing path on the whole domain |
| `styles.css` | The retro cartridge theme, dark + light |
| `apps.js` | The registry — **the only file you edit to add a toy** |
| `main.js` | Renders the shelf from the registry |

The design came from Claude Design ("Playground Hub"). Two deliberate departures from
the prototype: its floating "Preview 404" button was a design-tool affordance and is not
here (the 404 is a real page), and links whose value is `null` in `apps.js` are not
rendered at all, so the page can never show a dead link.

## Running it locally

```bash
python3 -m http.server 4173      # then open http://localhost:4173
```

## Notes

Static HTML, CSS and vanilla JS — no build step, no dependencies, no tracking, no backend.
Nothing here reads or stores personal data, and no secrets belong in this repo: it is
public, and everything served from it is visible to anyone.
