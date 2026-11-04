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
 * Each entry points at an isolated stylesheet + script. A template script
 * registers `CW.templates[id] = { id, render, init? }`. Templates never share
 * CSS selectors: every class is namespaced per template.
 */
(function () {
  "use strict";

  var CW = (window.CW = window.CW || {});
  CW.templates = CW.templates || {};

  var C = "assets/css/";
  var J = "assets/js/";
  var T = "assets/thumbnails/";

  var templates = [
    // --- Existing CWLABS templates (ids preserved) -------------------------
    { id: "template-1", name: "Studio", description: "Bold studio landing with a full-bleed cover and overlapping portrait.", css: C + "template-1-studio.css", js: J + "template-1-studio.js", thumb: T + "template-1.svg", tag: "Classic", accent: "#4f46e5" },
    { id: "template-2", name: "vCard", description: "Compact digital business card with a sticky identity rail.", css: C + "template-2-vcard.css", js: J + "template-2-vcard.js", thumb: T + "template-2.svg", tag: "Classic", accent: "#0ea5e9" },
    { id: "template-3", name: "Developer CV", description: "Dense two-column CV tuned for engineering résumés.", css: C + "template-3-developer-cv.css", js: J + "template-3-developer-cv.js", thumb: T + "template-3.svg", tag: "Classic", accent: "#22c55e" },
    { id: "template-4", name: "Agency", description: "Creative agency grid with a services-style capability wall.", css: C + "template-4-agency.css", js: J + "template-4-agency.js", thumb: T + "template-4.svg", tag: "Classic", accent: "#f97316" },
    { id: "template-5", name: "Cyber Elite", description: "Dark security-themed profile with terminal accents.", css: C + "template-5-cyber-elite.css", js: J + "template-5-cyber-elite.js", thumb: T + "template-5.svg", tag: "Classic", accent: "#06b6d4" },
    { id: "template-6", name: "Sidebar", description: "Persistent left sidebar navigation with a scrollable content column.", css: C + "template-6-sidebar.css", js: J + "template-6-sidebar.js", thumb: T + "template-6.svg", tag: "Classic", accent: "#6366f1" },
    { id: "template-7", name: "Minimal", description: "Quiet single-column layout with generous whitespace.", css: C + "template-7-minimal.css", js: J + "template-7-minimal.js", thumb: T + "template-7.svg", tag: "Classic", accent: "#64748b" },

    // --- New premium templates --------------------------------------------
    { id: "template-18", name: "Monochrome", description: "Swiss minimalism and editorial technology in pure black and white.", css: C + "template-18-monochrome.css", js: J + "template-18-monochrome.js", thumb: T + "template-18.svg", tag: "New", accent: "#111111" },
    { id: "template-19", name: "Paper & Ink", description: "Warm ivory editorial magazine with forest-green ink and serif headings.", css: C + "template-19-paper.css", js: J + "template-19-paper.js", thumb: T + "template-19.svg", tag: "New", accent: "#1f3d2b" },
    { id: "template-20", name: "Swiss Grid", description: "International typographic style with a numbered red-and-black grid.", css: C + "template-20-swiss.css", js: J + "template-20-swiss.js", thumb: T + "template-20.svg", tag: "New", accent: "#e30613" },
    { id: "template-21", name: "Brutalist", description: "Cobalt, black and off-white digital brutalism with hard edges.", css: C + "template-21-brutalist.css", js: J + "template-21-brutalist.js", thumb: T + "template-21.svg", tag: "New", accent: "#1b35d8" },
    { id: "template-22", name: "Zenfolio", description: "Japanese-inspired calm with vertical labels and olive accents.", css: C + "template-22-zen.css", js: J + "template-22-zen.js", thumb: T + "template-22.svg", tag: "New", accent: "#6b7355" },
    { id: "template-23", name: "Operator", description: "Cybersecurity researcher archive with severity labels and CTF log.", css: C + "template-23-operator.css", js: J + "template-23-operator.js", thumb: T + "template-23.svg", tag: "New", accent: "#3ddc84" },
    { id: "template-24", name: "Archive", description: "Typography-led professional archive built around a career timeline.", css: C + "template-24-archive.css", js: J + "template-24-archive.js", thumb: T + "template-24.svg", tag: "New", accent: "#1e293b" },
    { id: "template-25", name: "Data Journal", description: "Data-science research journal with structured project case studies.", css: C + "template-25-datajournal.css", js: J + "template-25-datajournal.js", thumb: T + "template-25.svg", tag: "New", accent: "#0f766e" },
    { id: "template-26", name: "Web Retro", description: "Retro desktop-inspired personal site with a windowed interface.", css: C + "template-26-retro.css", js: J + "template-26-retro.js", thumb: T + "template-26.svg", tag: "New", accent: "#c0392b" },
    { id: "template-27", name: "Signature", description: "Premium personal branding in black and warm yellow.", css: C + "template-27-signature.css", js: J + "template-27-signature.js", thumb: T + "template-27.svg", tag: "New", accent: "#f2b705" },

    // --- Animated, illustration-led templates ------------------------------
    { id: "template-28", name: "Prism", description: "Aurora gradients, a refracting prism illustration and pointer parallax.", css: C + "template-28-prism.css", js: J + "template-28-prism.js", thumb: T + "template-28.svg", tag: "Animated", accent: "#35d0ba" },
    { id: "template-29", name: "Sketchbook", description: "Hand-drawn doodles, wobbly ink outlines and taped notes on ruled paper.", css: C + "template-29-sketchbook.css", js: J + "template-29-sketchbook.js", thumb: T + "template-29.svg", tag: "Animated", accent: "#d9542b" },
    { id: "template-30", name: "Nebula", description: "Animated starfield constellation, illustrated planet and orbit motifs.", css: C + "template-30-nebula.css", js: J + "template-30-nebula.js", thumb: T + "template-30.svg", tag: "Animated", accent: "#7fe9ff" },
    { id: "template-31", name: "Blueprint", description: "Engineering drafting sheet whose drawing plots itself as you scroll.", css: C + "template-31-blueprint.css", js: J + "template-31-blueprint.js", thumb: T + "template-31.svg", tag: "Animated", accent: "#0b3d68" },
    { id: "template-32", name: "Origami", description: "Folded-paper facets that crease into place, with unfolding project panels.", css: C + "template-32-origami.css", js: J + "template-32-origami.js", thumb: T + "template-32.svg", tag: "Animated", accent: "#2b3a8f" },

    // --- Cybersecurity, futuristic animation -------------------------------
    { id: "template-33", name: "Sentinel", description: "SOC monitoring HUD with a sweeping radar scope and live telemetry.", css: C + "template-33-sentinel.css", js: J + "template-33-sentinel.js", thumb: T + "template-33.svg", tag: "Cyber", accent: "#22d3ee" },
    { id: "template-34", name: "Cipher", description: "Cryptography workstation: hex-rain, byte offsets and a text-decrypt hero.", css: C + "template-34-cipher.css", js: J + "template-34-cipher.js", thumb: T + "template-34.svg", tag: "Cyber", accent: "#c8ff3d" },
    { id: "template-35", name: "Gridlock", description: "Cyberpunk dossier with chromatic glitch, scanlines and wireframe grid.", css: C + "template-35-gridlock.css", js: J + "template-35-gridlock.js", thumb: T + "template-35.svg", tag: "Cyber", accent: "#ff2d95" },
    { id: "template-36", name: "Vault", description: "Zero-trust architecture with a rotating wireframe shield and perimeter trace.", css: C + "template-36-vault.css", js: J + "template-36-vault.js", thumb: T + "template-36.svg", tag: "Cyber", accent: "#5eead4" }
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
