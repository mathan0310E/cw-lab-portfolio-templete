/*
 * CWLABS Portfolio Builder — template registry.
 *
 * The registry is the single source of truth for the template selector and the
 * preview/publish renderer. It carries the seven original CWLABS templates
 * (ids unchanged, so existing saved selections keep working), the ten new
 * premium templates (template-18 .. template-27), five illustration-led
 * animated templates (template-28 .. template-32) and four cybersecurity
 * templates with futuristic animation (template-33 .. template-36).
 *
 * Every template lives in its own folder under `templates/<slug>/` with an
 * `index.html`, `style.css`, `template.js` and `thumbnail.svg`. The script
 * registers `CW.templates[id] = { id, render, init? }`. Templates never share
 * CSS selectors: every class is namespaced per template.
 */
(function () {
  "use strict";

  var CW = (window.CW = window.CW || {});
  CW.templates = CW.templates || {};

  var D = "templates/";

  var templates = [
    // --- Existing CWLABS templates (ids preserved) -------------------------
    { id: "template-1", name: "Studio", description: "Bold studio landing with a full-bleed cover and overlapping portrait.", dir: D + "studio/", css: D + "studio/style.css", js: D + "studio/template.js", thumb: D + "studio/thumbnail.svg", tag: "Classic", accent: "#4f46e5" },
    { id: "template-2", name: "vCard", description: "Compact digital business card with a sticky identity rail.", dir: D + "vcard/", css: D + "vcard/style.css", js: D + "vcard/template.js", thumb: D + "vcard/thumbnail.svg", tag: "Classic", accent: "#0ea5e9" },
    { id: "template-3", name: "Developer CV", description: "Dense two-column CV tuned for engineering résumés.", dir: D + "developer-cv/", css: D + "developer-cv/style.css", js: D + "developer-cv/template.js", thumb: D + "developer-cv/thumbnail.svg", tag: "Classic", accent: "#22c55e" },
    { id: "template-4", name: "Agency", description: "Creative agency grid with a services-style capability wall.", dir: D + "agency/", css: D + "agency/style.css", js: D + "agency/template.js", thumb: D + "agency/thumbnail.svg", tag: "Classic", accent: "#f97316" },
    { id: "template-5", name: "Cyber Elite", description: "Dark security-themed profile with terminal accents.", dir: D + "cyber-elite/", css: D + "cyber-elite/style.css", js: D + "cyber-elite/template.js", thumb: D + "cyber-elite/thumbnail.svg", tag: "Classic", accent: "#06b6d4" },
    { id: "template-6", name: "Sidebar", description: "Persistent left sidebar navigation with a scrollable content column.", dir: D + "sidebar/", css: D + "sidebar/style.css", js: D + "sidebar/template.js", thumb: D + "sidebar/thumbnail.svg", tag: "Classic", accent: "#6366f1" },
    { id: "template-7", name: "Minimal", description: "Quiet single-column layout with generous whitespace.", dir: D + "minimal/", css: D + "minimal/style.css", js: D + "minimal/template.js", thumb: D + "minimal/thumbnail.svg", tag: "Classic", accent: "#64748b" },

    // --- New premium templates --------------------------------------------
    { id: "template-18", name: "Monochrome", description: "Swiss minimalism and editorial technology in pure black and white.", dir: D + "monochrome/", css: D + "monochrome/style.css", js: D + "monochrome/template.js", thumb: D + "monochrome/thumbnail.svg", tag: "New", accent: "#111111" },
    { id: "template-19", name: "Paper & Ink", description: "Warm ivory editorial magazine with forest-green ink and serif headings.", dir: D + "paper-ink/", css: D + "paper-ink/style.css", js: D + "paper-ink/template.js", thumb: D + "paper-ink/thumbnail.svg", tag: "New", accent: "#1f3d2b" },
    { id: "template-20", name: "Swiss Grid", description: "International typographic style with a numbered red-and-black grid.", dir: D + "swiss-grid/", css: D + "swiss-grid/style.css", js: D + "swiss-grid/template.js", thumb: D + "swiss-grid/thumbnail.svg", tag: "New", accent: "#e30613" },
    { id: "template-21", name: "Brutalist", description: "Cobalt, black and off-white digital brutalism with hard edges.", dir: D + "brutalist/", css: D + "brutalist/style.css", js: D + "brutalist/template.js", thumb: D + "brutalist/thumbnail.svg", tag: "New", accent: "#1b35d8" },
    { id: "template-22", name: "Zenfolio", description: "Japanese-inspired calm with vertical labels and olive accents.", dir: D + "zenfolio/", css: D + "zenfolio/style.css", js: D + "zenfolio/template.js", thumb: D + "zenfolio/thumbnail.svg", tag: "New", accent: "#6b7355" },
    { id: "template-23", name: "Operator", description: "Cybersecurity researcher archive with severity labels and CTF log.", dir: D + "operator/", css: D + "operator/style.css", js: D + "operator/template.js", thumb: D + "operator/thumbnail.svg", tag: "New", accent: "#3ddc84" },
    { id: "template-24", name: "Archive", description: "Typography-led professional archive built around a career timeline.", dir: D + "archive/", css: D + "archive/style.css", js: D + "archive/template.js", thumb: D + "archive/thumbnail.svg", tag: "New", accent: "#1e293b" },
    { id: "template-25", name: "Data Journal", description: "Data-science research journal with structured project case studies.", dir: D + "data-journal/", css: D + "data-journal/style.css", js: D + "data-journal/template.js", thumb: D + "data-journal/thumbnail.svg", tag: "New", accent: "#0f766e" },
    { id: "template-26", name: "Web Retro", description: "Retro desktop-inspired personal site with a windowed interface.", dir: D + "web-retro/", css: D + "web-retro/style.css", js: D + "web-retro/template.js", thumb: D + "web-retro/thumbnail.svg", tag: "New", accent: "#c0392b" },
    { id: "template-27", name: "Signature", description: "Premium personal branding in black and warm yellow.", dir: D + "signature/", css: D + "signature/style.css", js: D + "signature/template.js", thumb: D + "signature/thumbnail.svg", tag: "New", accent: "#f2b705" },

    // --- Animated, illustration-led templates ------------------------------
    { id: "template-28", name: "Prism", description: "Aurora gradients, a refracting prism illustration and pointer parallax.", dir: D + "prism/", css: D + "prism/style.css", js: D + "prism/template.js", thumb: D + "prism/thumbnail.svg", tag: "Animated", accent: "#35d0ba" },
    { id: "template-29", name: "Sketchbook", description: "Hand-drawn doodles, wobbly ink outlines and taped notes on ruled paper.", dir: D + "sketchbook/", css: D + "sketchbook/style.css", js: D + "sketchbook/template.js", thumb: D + "sketchbook/thumbnail.svg", tag: "Animated", accent: "#d9542b" },
    { id: "template-30", name: "Nebula", description: "Animated starfield constellation, illustrated planet and orbit motifs.", dir: D + "nebula/", css: D + "nebula/style.css", js: D + "nebula/template.js", thumb: D + "nebula/thumbnail.svg", tag: "Animated", accent: "#7fe9ff" },
    { id: "template-31", name: "Blueprint", description: "Engineering drafting sheet whose drawing plots itself as you scroll.", dir: D + "blueprint/", css: D + "blueprint/style.css", js: D + "blueprint/template.js", thumb: D + "blueprint/thumbnail.svg", tag: "Animated", accent: "#0b3d68" },
    { id: "template-32", name: "Origami", description: "Folded-paper facets that crease into place, with unfolding project panels.", dir: D + "origami/", css: D + "origami/style.css", js: D + "origami/template.js", thumb: D + "origami/thumbnail.svg", tag: "Animated", accent: "#2b3a8f" },

    // --- Cybersecurity, futuristic animation -------------------------------
    { id: "template-33", name: "Sentinel", description: "SOC monitoring HUD with a sweeping radar scope and live telemetry.", dir: D + "sentinel/", css: D + "sentinel/style.css", js: D + "sentinel/template.js", thumb: D + "sentinel/thumbnail.svg", tag: "Cyber", accent: "#22d3ee" },
    { id: "template-34", name: "Cipher", description: "Cryptography workstation: hex-rain, byte offsets and a text-decrypt hero.", dir: D + "cipher/", css: D + "cipher/style.css", js: D + "cipher/template.js", thumb: D + "cipher/thumbnail.svg", tag: "Cyber", accent: "#c8ff3d" },
    { id: "template-35", name: "Gridlock", description: "Cyberpunk dossier with chromatic glitch, scanlines and wireframe grid.", dir: D + "gridlock/", css: D + "gridlock/style.css", js: D + "gridlock/template.js", thumb: D + "gridlock/thumbnail.svg", tag: "Cyber", accent: "#ff2d95" },
    { id: "template-36", name: "Vault", description: "Zero-trust architecture with a rotating wireframe shield and perimeter trace.", dir: D + "vault/", css: D + "vault/style.css", js: D + "vault/template.js", thumb: D + "vault/thumbnail.svg", tag: "Cyber", accent: "#5eead4" }
  ];

  var byId = {};
  templates.forEach(function (t) { byId[t.id] = t; });

  CW.registry = {
    all: templates,
    get: function (id) { return byId[id] || null; },
    exists: function (id) { return !!byId[id]; },
    /** Resolve a template module (render + optional init). */
    renderer: function (id) {
      var mod = CW.templates[id];
      if (mod && typeof mod.render === "function") return mod;
      var fb = CW.templates["template-18"];
      if (fb && typeof fb.render === "function") return fb;
      return null;
    },
    /** Stylesheet path(s) for a template id. */
    cssFor: function (id) {
      var t = byId[id];
      return t ? [t.css] : [];
    }
  };
})();
