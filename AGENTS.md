# CWLABS Portfolio Builder — agent notes

Static portfolio builder for the CWLABS student cybersecurity platform.
No backend, no build step, no framework. Open the HTML files directly.

## Layout

```
index.html        editor: template selector + live preview + publish controls
portfolio.html    full-page render; ?preview=1&t=<templateId> deep-links a template
preview.html      gallery of all templates, grouped by tag
assets/js/        app.js, registry.js, adapter.js, utils.js, anim.js, sample-data.js
assets/css/       app.css (editor chrome only)
templates/<slug>/  one folder per template:
                     index.html, style.css, template.js, thumbnail.svg, meta.json
tools/            gen-thumbnails.mjs, test-suite.mjs
docs/             ARCHITECTURE.md, TEMPLATES.md, TESTING.md, screenshots/
```

## Adding a template

1. Create `templates/<slug>/` containing:
   - `template.js` — IIFE registering
     `CW.templates["template-<n>"] = { id, render(data), init?(root) }`
   - `style.css` — every rule scoped under `.cw-<slug>-page` or another
     `cw-<slug>-` class. Never a bare element, `[data-*]` or global selector;
     the test suite rejects it.
   - `index.html` — standalone page loading the shared engine via `../../assets`
   - `meta.json` — `{ id, name, slug }`
   - `thumbnail.svg` (generated, see step 3)
2. Add an entry to `assets/js/registry.js` (id, name, description, dir, css,
   js, thumb, tag, accent).
3. Add a thumbnail block to `tools/gen-thumbnails.mjs`, then
   `node tools/gen-thumbnails.mjs` (writes each `thumbnail.svg` into its folder).
4. Add the folder to the `dirs` list in `templates/index.html`.
5. Update the counts and filter chips in `index.html`, the grouping ranges in
   `preview.html`, and the ids/prefixes/count in `tools/test-suite.mjs`.

## Data contract

`CW.adapter.normalize(raw, templateId)` returns the one object every template
consumes. Never read `CW_SAMPLE_DATA` directly and never hardcode personal
details. `data.has.<section>` flags guard each section so empty portfolios
render without blank blocks.

Fields: `basics.*`, `links.*`, `skills[]`, `projects[]`, `experience[]`,
`education[]`, `certificates[]`, `achievements[]`, `publications[]`,
`writeups[]`, `ctf[]`.

Security templates may render `projects[].severity` / `.category`, `writeups[]`
and `ctf[]`. Never fabricate a CVE, bounty, vulnerability disclosure or pentest
result — render only what the student supplied.

## Motion

Mark elements `data-cw-reveal` and call `CW.anim.reveal(root)` in `init()`.
For a gauge that should fill on reveal, put `--cw-lvl:<n>%` on the element and
gate the width on the **revealed ancestor's** `.is-in`, not on the gauge's own
`<li>` (the `<li>` is usually not the revealed node — this bug shipped once).

Every animation needs a `prefers-reduced-motion` branch under
`.cw-reduced-motion`. Canvas loops should pause via IntersectionObserver when
off-screen and paint one static frame under reduced motion.

## Verifying

```bash
node tools/test-suite.mjs      # unit: registry, isolation, data mapping, escaping
node tools/gen-thumbnails.mjs  # regenerate SVG thumbnails
```

Browser/flow harnesses live in `/tmp/cwpup` (puppeteer-core, chromium at
`/usr/bin/chromium`, `--no-sandbox`): `browser-test.mjs` (template x viewport
overflow/console/alt-text), `flows-test.mjs` (edit→preview→save→publish→
unpublish, mobile nav), `edge-new.mjs` (empty/missing-content matrix),
`shots.mjs` (screenshots into `docs/screenshots/`).

A dev server must be serving `/workspace/project` on port 12000 for those.
Keep the template id lists in those harnesses in sync when adding templates.

The browser harness lives in `/tmp/cwpup2` (`verify.mjs`) and walks every
standalone page, the editor, the gallery and all preview pages.
