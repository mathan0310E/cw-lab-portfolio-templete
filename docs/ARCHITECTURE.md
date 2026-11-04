# CWLABS Portfolio Builder — Architecture

## What this is

A portfolio builder with **26 templates**: the 7 original CWLABS templates
(ids `template-1` … `template-7`, unchanged) plus **10 new premium templates**
(`template-18` … `template-27`), 5 animated, illustration-led templates
(`template-28` … `template-32`) and 4 cybersecurity templates with futuristic
animation (`template-33` … `template-36`). One rendering pipeline powers the editor
preview, the full-page preview and the published public portfolio, so a preview
and its published page are identical by construction.

Everything is static HTML5 + CSS3 + vanilla ES6. No build step, no framework, no
dependencies.

## File map

```
index.html                  Editor: template selector + content editor + live preview
portfolio.html              Public/preview page: renders one portfolio from a slug or the draft
assets/css/app.css          Editor chrome only (not template styles)
assets/css/template-*.css   One isolated stylesheet per template
assets/js/utils.js          Shared helpers (escaping, images, links, dates, paragraphs)
assets/js/anim.js           Intersection Observer reveal + prefers-reduced-motion
assets/js/adapter.js        Normalises raw portfolio data into one shared object
assets/js/registry.js       Template metadata (id, name, description, css, js, thumb)
assets/js/store.js          Draft + published persistence (localStorage by default)
assets/js/renderer.js       Builds the standalone document / mounts a template
assets/js/sample-data.js    Example record used before a user edits anything
assets/js/template-*.js     One self-registering template module per template
assets/thumbnails/*.svg     One unique SVG preview per template
tools/gen-thumbnails.mjs    Regenerates the thumbnails
tools/test-suite.mjs        Headless pipeline + template test suite
```

## Data flow

```
raw record (user edits / published snapshot)
        │
        ▼
CW.adapter.normalize(raw, templateId)   ← the shared data adapter
        │   one normalised object, consumed by every template
        ▼
CW.registry.renderer(id).render(data)   ← template module
        │   returns an HTML string
        ▼
CW.renderer.buildDocument()  → iframe srcdoc (live + full-page preview)
CW.renderer.mount()          → into #cw-root (public page)
        │
        ▼
template init(root, data)    ← interactions, scoped to the container
```

Every template consumes the **same normalised object**. Templates never read raw
user input directly and never hardcode personal information.

## The adapter (`assets/js/adapter.js`)

`normalize(raw, templateId)` accepts either the canonical CWLABS schema or common
alternate field names and always returns the same shape:

```js
{
  basics:  { fullName, role, tagline, bio, location, email, profileImage, coverImage },
  links:   { github, linkedin, website, twitter, other: [{label, url}] },
  skills:  [{ name, category, level|null }],
  skillGroups: [{ category, skills: [...] }],
  projects:[{ name, description, technologies[], image, url, repo, category, severity }],
  experience: [{ role, company, description, startDate, endDate }],
  experienceSorted: [...],          // newest first
  education: [{ degree, institution, description, startDate, endDate }],
  certificates: [{ name, issuer, date, image, verifyUrl }],
  achievements: [{ title, description, date }],
  publications: [{ title, description, date, url }],
  writeups:     [{ title, description, date, url }],
  ctf:          [{ event, date, placement, category, description }],
  has: { skills, projects, experience, education, certificates, achievements,
         publications, writeups, ctf },   // booleans used to hide empty sections
  meta: { templateId }
}
```

Accepted aliases include `profile`→`basics`, `name`/`title`/`about`/`basedIn`/
`contactEmail`/`avatar`→basics fields, `social.gh`→links.github, `work`→projects,
`jobs`→experience, `certifications`→certificates, `technicalSkills`→skills, and
comma-separated technology strings. Missing values become `""` or `[]`; they are
never invented.

## Isolation

- Each template's CSS uses a single unique prefix (`cw-monochrome-`,
  `cw-paper-`, `cw-swiss-`, `cw-brutalist-`, `cw-zen-`, `cw-operator-`,
  `cw-archive-`, `cw-datajournal-`, `cw-retro-`, `cw-signature-`, and for the
  classic set `cw-studio-`, `cw-vcard-`, `cw-devcv-`, `cw-agency-`, `cw-cyber-`,
  `cw-sidebar-`, `cw-minimal-`).
- No bare element selectors, no global overrides. The suite enforces this.
- Each template script wraps itself in an IIFE and only touches the container
  passed to `init`. Interactions bind with `root.querySelector`, never
  `document.querySelector`.
- `data-cw-reveal` + Intersection Observer drive scroll reveals; reduced motion
  disables them via the `.cw-reduced-motion` class on `<html>`.

## Registration

Add a template by:

1. Creating `assets/js/template-<id>-<name>.js` that sets
   `CW.templates["<id>"] = { id, render(data), init?(root, data) }`.
2. Creating `assets/css/template-<id>-<name>.css` with a unique prefix.
3. Adding a thumbnail in `assets/thumbnails/<id>.svg`.
4. Adding one entry to the `templates` array in `assets/js/registry.js`.

The editor selector, the live preview, the full-page preview and the public page
all pick it up automatically — no other file changes.
