# CWLABS — Testing report

All results below were produced by running the tools in this repository. Nothing
here is asserted without an executed command.

## How to run

```bash
# Pipeline + template unit suite (Node, no dependencies)
node tools/test-suite.mjs

# Regenerate template thumbnails
node tools/gen-thumbnails.mjs

# Manual browser check
python3 -m http.server 12000      # then open http://localhost:12000/index.html
```

## 1. Pipeline / template suite — `tools/test-suite.mjs`

Runs utils → anim → adapter → registry → store → sample-data → renderer plus all
26 template modules inside a Node `vm` sandbox, then exercises the ten
validation scenarios from the brief.

```
templates : 26
scenarios : 10
checks    : 985
passed    : 985
failed    : 0
```

What it covers:

- Registry integrity for all 26 ids (css, js, thumbnail, name, description,
  render function all present and files exist on disk).
- Every template renders in every scenario: complete data, missing profile
  photo, missing cover, no projects, no experience, no certificates, long
  biography, 40 skills, 12 social links, empty record.
- No `undefined`/`NaN` leaks into rendered markup.
- `buildDocument` produces a valid standalone document with the template CSS/JS,
  meta description, JSON-LD `Person` block, embedded data and closing tags.
- Accurate data display: the full name appears in all 26; project names and
  certificate names appear in the templates expected to show them.
- XSS safety: `<script>`, `<svg onload>`, `<img onerror>` and `javascript:` URLs
  in user data are escaped or stripped in all 26 templates.
- The adapter normalises an alternate schema (`profile`, `social.gh`, `work`,
  `jobs`, `certifications`, `technicalSkills`, comma-separated stacks).
- Empty-record guarantees.
- CSS isolation: every selector in every template stylesheet carries its
  template prefix; no bare `body`/`html`/`a`/`p`/`img`/`h1`/`h2`/`ul`/`li`
  selectors.
- Every stylesheet honours `prefers-reduced-motion` and has a mobile breakpoint.
- No hard pixel page width that would force horizontal overflow.
- Store: publish returns a slug, published record is retrievable, unpublish
  removes it.

## 2. Real-browser verification — headless Chromium

Script: loads the editor and every template in headless Chromium and checks
console errors, failed requests and horizontal overflow.

```
templates x viewports : 130  (26 templates x 5 widths)
problems              : 0
```

Viewports: 1440 (desktop), 1280 (laptop), 834 (tablet), 390 (mobile), 320 (small
mobile). For each combination the run asserts: the template renders content, no
horizontal overflow (`scrollWidth <= innerWidth + 2`), no console errors, no
failed requests, and — on the editor page — that clicking a template updates the
preview iframe.

## 3. Design-identity check — headless Chromium

Computed styles per template confirm each has its own identity rather than a
recolour:

| template | background | body font | page height (px) |
|----------|-----------|-----------|------------------|
| 1 Studio | `rgb(255,255,255)` | Inter | 3190 |
| 2 vCard | `rgb(238,246,251)` | Inter | 2421 |
| 3 Developer CV | `rgb(241,245,249)` | Inter | 1327 |
| 4 Agency | `rgb(251,250,248)` | Inter | 3999 |
| 5 Cyber Elite | `rgb(10,14,20)` | IBM Plex Mono | 3038 |
| 6 Sidebar | `rgb(255,255,255)` | Inter | 2503 |
| 7 Minimal | `rgb(255,255,255)` | Inter | 2676 |
| 18 Monochrome | `rgb(255,255,255)` | Helvetica Neue | 4790 |
| 19 Paper & Ink | `rgb(247,243,234)` | Iowan Old Style | 5923 |
| 20 Swiss Grid | `rgb(255,255,255)` | Helvetica Neue | 4629 |
| 21 Brutalist | `rgb(243,241,234)` | Archivo | 4252 |
| 22 Zenfolio | `rgb(242,237,228)` | Hiragino Kaku Gothic | 5079 |
| 23 Operator | `rgb(20,23,26)` | JetBrains Mono | 4442 |
| 24 Archive | `rgb(255,255,255)` | Spectral | 5430 |
| 25 Data Journal | `rgb(255,255,255)` | Inter | 4744 |
| 26 Web Retro | `rgb(232,228,216)` | IBM Plex Mono | 2873 |
| 27 Signature | `rgb(12,12,12)` | Inter | 6610 |

Templates that share a white background differ in typography, colour accents,
layout, section rhythm and component design (verified by screenshot).

## 4. Image handling — headless Chromium

With real profile, cover, project and certificate images injected:

- 0 broken images across all templates and viewports.
- 0 images missing `alt` text.
- 0 overflowing images; 0 page overflow.
- Above-the-fold hero/profile images use `loading="eager"`; the rest use
  `loading="lazy"` (verified per template).

## 5. End-to-end flows — headless Chromium

```
PASS  edit updates preview live
PASS  draft saved to storage
PASS  publish created public record (aarav-menon)
PASS  public URL renders published data
PASS  unpublish removed public record
PASS  legacy template id template-6 selectable + saved
PASS  template-18 mobile toggle works (aria-expanded false->true)
PASS  template-21 mobile toggle works (aria-expanded false->true)
PASS  template-23 mobile toggle works (aria-expanded false->true)
PASS  template-26 mobile toggle works (aria-expanded true->false)
PASS  template-27 mobile toggle works (aria-expanded false->true)

passed: 11  failed: 0
```

## Scenario matrix

| # | Scenario | Covered by |
|---|----------|-----------|
| 1 | Complete portfolio | suite + browser + screenshots |
| 2 | Missing profile photograph | suite (monogram fallback) |
| 3 | Missing cover image | suite |
| 4 | No projects | suite |
| 5 | No experience | suite |
| 6 | No certificates | suite |
| 7 | Long biography | suite (40 paragraphs) |
| 8 | Multiple skills | suite (40 skills) |
| 9 | Multiple social links | suite (12 links) |
| 10 | Mobile dimensions | browser run (390, 320) |

## Known limitations

- The published store uses `localStorage` as its default transport (this is a
  static reference implementation of the builder). Point `assets/js/store.js` at
  the CWLABS backend to persist server-side; the read/write surface is already
  isolated there.
- The 7 classic templates are reproduced here as working implementations of the
  same rendering contract. If the production CWLABS repository already contains
  its own versions, keep those files and reuse only the registry entries, the
  adapter and the ten new templates.
