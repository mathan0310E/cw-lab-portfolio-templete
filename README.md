# CWLABS Portfolio Builder

A portfolio builder for the CWLABS student cybersecurity platform: **26
art-directed templates** — 7 original (ids preserved) plus **10 new premium
templates** — with a live editor, one shared data adapter, and a public portfolio
page. Static HTML5 + CSS3 + vanilla ES6. No framework, no build step, no
dependencies.

## Run it

```bash
python3 -m http.server 12000
```

| URL | What it is |
|-----|-----------|
| `index.html` | The editor |
| `preview.html` | Gallery of all 26 templates with thumbnails and links |
| `portfolio.html?preview=1` | Full-page preview of your current draft |
| `portfolio.html?preview=1&t=<id>` | Full-page preview of the draft through one template |
| `portfolio.html?u=<slug>` | Published public portfolio |
| `index.html?t=<id>` | Editor opened with a template selected |
| `docs/screenshots/index.html` | Desktop + mobile screenshot of every template |

The `?t=` parameter previews a template without changing your saved selection.

## Templates

| ID | Name | ID | Name |
|----|------|----|------|
| template-1 | Studio | template-18 | Monochrome |
| template-2 | vCard | template-19 | Paper & Ink |
| template-3 | Developer CV | template-20 | Swiss Grid |
| template-4 | Agency | template-21 | Brutalist |
| template-5 | Cyber Elite | template-22 | Zenfolio |
| template-6 | Sidebar | template-23 | Operator |
| template-7 | Minimal | template-24 | Archive |
| | | template-25 | Data Journal |
| | | template-26 | Web Retro |
| | | template-27 | Signature |
| template-28 | Prism | template-29 | Sketchbook |
| template-30 | Nebula | template-31 | Blueprint |
| template-32 | Origami | template-33 | Sentinel |
| template-34 | Cipher | template-35 | Gridlock |
| template-36 | Vault | | |

See `docs/TEMPLATES.md` for each template's design direction, palette and
typography, and the section/field mapping.

## How it fits together

- `assets/js/adapter.js` normalises the portfolio record into one object that
  every template consumes. Templates never read raw input and never hardcode
  personal data.
- `assets/js/registry.js` is the single source of truth for the selector and the
  renderer.
- `assets/js/renderer.js` builds the same standalone document for the live
  preview, the full-page preview and the published page, so preview and
  published output are identical.
- Each template is one JS module + one isolated CSS file with a unique prefix.

Full detail: `docs/ARCHITECTURE.md`.

## Test

```bash
node tools/test-suite.mjs      # 1506 checks, 26 templates x 10 scenarios
node tools/gen-thumbnails.mjs  # regenerate assets/thumbnails/*.svg
```

Results and methodology: `docs/TESTING.md`.

## Adding a template

1. `assets/js/template-<id>-<name>.js` → `CW.templates["<id>"] = { id, render, init? }`
2. `assets/css/template-<id>-<name>.css` → unique class prefix
3. `assets/thumbnails/<id>.svg`
4. one entry in the `templates` array in `assets/js/registry.js`

The selector, previews and public page pick it up with no other changes.

## Notes

- Existing template ids are unchanged, so saved template selections keep working.
- No global CSS, no framework, no second publishing path.
- Accessibility: semantic landmarks, heading hierarchy, keyboard-operable
  controls, `alt` text on images, `prefers-reduced-motion` respected, external
  links opened with `rel="noopener noreferrer nofollow"`.
- SEO: per-portfolio `<title>`, meta description, Open Graph tags and JSON-LD
  `Person` structured data on the published page.
