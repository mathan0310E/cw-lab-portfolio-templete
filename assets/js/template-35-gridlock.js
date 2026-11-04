/*
 * TEMPLATE 35 — GRIDLOCK
 * Cyberpunk dossier. Magenta/cyan chromatic aberration, glitch text, scanlines
 * and clipped corner plates. The hero portrait glitches on a slow loop and
 * again on hover. Namespaced under `cw-gridlock-`.
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-gridlock-";

  /* ---------- illustrations ---------- */

  /** A wireframe grid receding to a horizon with a sun disc behind it. */
  function horizon() {
    var verts = "";
    for (var i = 0; i <= 10; i++) {
      verts += '<path d="M' + (20 + i * 28) + " 200 L" + (100 + i * 20) + ' 340"/>';
    }
    var horiz = "";
    for (var k = 1; k <= 6; k++) {
      var y = 200 + Math.pow(k / 6, 1.9) * 140;
      horiz += '<path d="M20 ' + y.toFixed(1) + " H300\"/>";
    }
    return (
      '<svg class="' + P + 'art" viewBox="0 0 320 340" role="img" aria-label="A wireframe grid receding toward a horizon behind a sun disc" focusable="false">' +
        '<defs>' +
          '<linearGradient id="cwGridlockSun" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#ff2d95"/>' +
            '<stop offset="100%" stop-color="#7b2dff"/>' +
          "</linearGradient>" +
        "</defs>" +
        '<circle cx="160" cy="150" r="76" fill="url(#cwGridlockSun)" opacity=".85"/>' +
        '<g class="' + P + 'sun-slices" fill="#0b0714">' +
          '<rect x="60" y="150" width="200" height="4"/>' +
          '<rect x="60" y="164" width="200" height="6"/>' +
          '<rect x="60" y="180" width="200" height="8"/>' +
          '<rect x="60" y="198" width="200" height="11"/>' +
        "</g>" +
        '<path d="M20 200 H300" stroke="#22e0ff" stroke-width="1.8" opacity=".9"/>' +
        '<g class="' + P + 'grid" fill="none" stroke="#22e0ff" stroke-width="1.1" opacity=".55">' +
          verts + horiz +
        "</g>" +
        '<g class="' + P + 'art-stars" fill="#22e0ff" opacity=".7">' +
          '<circle cx="42" cy="52" r="1.6"/><circle cx="270" cy="40" r="1.4"/>' +
          '<circle cx="214" cy="86" r="1.2"/><circle cx="86" cy="96" r="1.3"/>' +
        "</g>" +
      "</svg>"
    );
  }

  /** Clipped-corner plate glyph used beside headings. */
  function plate() {
    return (
      '<svg class="' + P + 'mark" viewBox="0 0 34 34" aria-hidden="true" focusable="false">' +
        '<path d="M6 2 H32 V28 L28 32 H2 V6 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
        '<path d="M11 17 H23 M17 11 V23" stroke="currentColor" stroke-width="1.5"/>' +
      "</svg>"
    );
  }

  /* ---------- sections ---------- */

  function nav(data) {
    var links = [
      ["dossier", "Dossier"],
      ["loadout", "Loadout"],
      ["intel", "Intel"],
      ["record", "Record"],
      ["contact", "Contact"]
    ];
    return (
      '<header class="' + P + 'nav" data-cw-nav>' +
        '<a class="' + P + 'brand" href="#top">' +
          '<span class="' + P + 'brand-block" aria-hidden="true"></span>' +
          '<span class="' + P + 'brand-name" data-cw-text="' + U.esc(U.firstName(data.basics.fullName) || "Gridlock") + '">' +
            U.esc(U.firstName(data.basics.fullName) || "Gridlock") +
          "</span>" +
        "</a>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l) {
            return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
          }).join("") +
        "</nav>" +
        '<button class="' + P + 'nav-toggle" type="button" aria-expanded="false" aria-controls="cw-gridlock-menu">' +
          '<span></span><span></span><span></span>' +
          '<span class="' + P + 'sr">Menu</span>' +
        "</button>" +
      "</header>" +
      '<nav id="cw-gridlock-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) {
          return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
        }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="top">' +
        '<div class="' + P + 'scanlines" aria-hidden="true"></div>' +
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-copy">' +
            '<p class="' + P + 'kicker" data-cw-reveal>' + plate() +
              "<span>" + U.esc(b.role || "Digital security") + "</span>" +
              '<span class="' + P + 'kicker-code" aria-hidden="true">/// SYS.01</span>' +
            "</p>" +
            '<h1 class="' + P + 'hero-name" data-cw-reveal>' +
              '<span class="' + P + 'glitch" data-cw-text="' + U.esc(b.fullName || "Your Name") + '">' +
                U.esc(b.fullName || "Your Name") +
              "</span>" +
            "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tagline" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
            '<div class="' + P + 'hero-actions" data-cw-reveal>' +
              (data.has.projects ? '<a class="' + P + 'btn" href="#intel">Open intel</a>' : "") +
              (b.email ? '<a class="' + P + 'btn ' + P + 'btn--ghost" href="mailto:' + U.escUrl(b.email) + '">Ping</a>' : "") +
            "</div>" +
            '<dl class="' + P + 'hero-stats" data-cw-reveal>' +
              (b.location ? "<div><dt>Node</dt><dd>" + U.esc(b.location) + "</dd></div>" : "") +
              (data.has.projects ? "<div><dt>Intel</dt><dd>" + U.esc(String(data.projects.length)) + "</dd></div>" : "") +
              (data.has.skills ? "<div><dt>Tools</dt><dd>" + U.esc(String(data.skills.length)) + "</dd></div>" : "") +
            "</dl>" +
          "</div>" +
          '<div class="' + P + 'hero-art" data-cw-reveal>' + horizon() + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function head(code, title) {
    return (
      '<div class="' + P + 'sec-head" data-cw-reveal>' +
        plate() +
        '<h2 class="' + P + 'sec-title">' + U.esc(title) + "</h2>" +
        '<span class="' + P + 'sec-code">' + U.esc(code) + "</span>" +
      "</div>"
    );
  }

  function dossier(data) {
    var b = data.basics;
    if (!b.bio && !b.profileImage) return "";
    return (
      '<section class="' + P + 'section" id="dossier">' +
        head("FILE.01", "Dossier") +
        '<div class="' + P + 'dossier-grid">' +
          '<div class="' + P + 'portrait" data-cw-reveal>' +
            '<div class="' + P + 'portrait-frame">' +
              (b.profileImage
                ? U.image(b.profileImage, b.fullName || "Portrait", P + 'portrait-img',
                    '<span class="' + P + 'portrait-fallback">' + U.monogram(b.fullName) + "</span>", true)
                : '<span class="' + P + 'portrait-fallback">' + U.monogram(b.fullName) + "</span>") +
              '<span class="' + P + 'portrait-r" aria-hidden="true"></span>' +
              '<span class="' + P + 'portrait-c" aria-hidden="true"></span>' +
            "</div>" +
            '<span class="' + P + 'portrait-tag">SUBJECT / ' + U.esc((b.fullName || "UNKNOWN").toUpperCase().slice(0, 16)) + "</span>" +
          "</div>" +
          '<div class="' + P + 'dossier-body" data-cw-reveal>' + U.paragraphs(b.bio) + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function loadout(data) {
    if (!data.has.skills) return "";
    var groups = {};
    data.skills.forEach(function (s) {
      var k = s.category || "General";
      (groups[k] = groups[k] || []).push(s);
    });
    return (
      '<section class="' + P + 'section" id="loadout">' +
        head("FILE.02", "Loadout") +
        '<div class="' + P + 'loadout">' +
          Object.keys(groups).map(function (k) {
            return (
              '<div class="' + P + 'loadout-card" data-cw-reveal>' +
                '<h3 class="' + P + 'loadout-cat">' + U.esc(k) + "</h3>" +
                '<ul class="' + P + 'loadout-list">' +
                  groups[k].map(function (s) {
                    var lvl = U.skillLevel(s.level);
                    return (
                      "<li" + (lvl === null ? "" : ' style="--cw-lvl:' + lvl + '%"') + ">" +
                        '<span class="' + P + 'loadout-name">' + U.esc(s.name) + "</span>" +
                        (lvl === null
                          ? ""
                          : '<span class="' + P + 'loadout-track" aria-hidden="true"><span></span></span>' +
                            '<span class="' + P + 'sr">' + U.esc(lvl + " percent") + "</span>") +
                      "</li>"
                    );
                  }).join("") +
                "</ul>" +
              "</div>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function intel(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="intel">' +
        head("FILE.03", "Intel & projects") +
        '<ul class="' + P + 'intel">' +
          data.projects.map(function (p, i) {
            var links = [];
            if (p.url) links.push(U.link(p.url, "Access", P + 'intel-link'));
            if (p.repo) links.push(U.link(p.repo, "Repo", P + 'intel-link'));
            return (
              '<li class="' + P + 'intel-item" data-cw-reveal>' +
                '<span class="' + P + 'intel-idx" aria-hidden="true">' + U.esc(("0" + (i + 1)).slice(-2)) + "</span>" +
                (p.image
                  ? '<div class="' + P + 'intel-media">' + U.image(p.image, p.name, P + 'intel-img') + "</div>"
                  : "") +
                '<div class="' + P + 'intel-body">' +
                  '<div class="' + P + 'intel-top">' +
                    (p.severity ? '<span class="' + P + 'intel-sev">' + U.esc(p.severity) + "</span>" : "") +
                    (p.category ? '<span class="' + P + 'intel-cat">' + U.esc(p.category) + "</span>" : "") +
                  "</div>" +
                  '<h3 class="' + P + 'intel-name" data-cw-text="' + U.esc(p.name) + '">' + U.esc(p.name) + "</h3>" +
                  (p.description ? '<p class="' + P + 'intel-desc">' + U.esc(p.description) + "</p>" : "") +
                  (p.technologies.length
                    ? '<ul class="' + P + 'chips">' + p.technologies.map(function (t) {
                        return "<li>" + U.esc(t) + "</li>";
                      }).join("") + "</ul>"
                    : "") +
                  (links.length ? '<div class="' + P + 'intel-links">' + links.join("") + "</div>" : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function record(data) {
    var rows = [];
    data.experience.forEach(function (e) {
      rows.push({ tag: "JOB", title: e.role || e.company, org: e.role ? e.company : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    data.education.forEach(function (e) {
      rows.push({ tag: "EDU", title: e.degree || e.institution, org: e.degree ? e.institution : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    data.ctf.forEach(function (c) {
      rows.push({ tag: "CTF", title: c.event, org: c.placement || "", when: U.fmtDate(c.date), desc: c.description, key: U.sortKey(c.date) });
    });
    if (!rows.length) return "";
    rows.sort(function (a, b) { return b.key - a.key; });
    return (
      '<section class="' + P + 'section" id="record">' +
        head("FILE.04", "Record") +
        '<ul class="' + P + 'record">' +
          rows.map(function (r) {
            return (
              '<li class="' + P + 'record-row" data-cw-reveal>' +
                '<span class="' + P + 'record-tag">' + U.esc(r.tag) + "</span>" +
                '<span class="' + P + 'record-when">' + U.esc(r.when || "\u2014") + "</span>" +
                '<div class="' + P + 'record-body">' +
                  '<h3 class="' + P + 'record-title">' + U.esc(r.title) + "</h3>" +
                  (r.org ? '<p class="' + P + 'record-org">' + U.esc(r.org) + "</p>" : "") +
                  (r.desc ? '<p class="' + P + 'record-desc">' + U.esc(r.desc) + "</p>" : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function certs(data) {
    if (!data.has.certificates && !data.has.writeups) return "";
    var items = [];
    data.certificates.forEach(function (c) {
      items.push({ kind: "CERT", title: c.name, meta: [c.issuer, U.fmtDate(c.date)].filter(Boolean).join(" \u00b7 "), url: c.verifyUrl });
    });
    data.writeups.forEach(function (w) {
      items.push({ kind: "WRITEUP", title: w.title, meta: [w.category, U.fmtDate(w.date)].filter(Boolean).join(" \u00b7 "), url: w.url });
    });
    return (
      '<section class="' + P + 'section" id="vault">' +
        head("FILE.05", "Vault") +
        '<ul class="' + P + 'vault">' +
          items.map(function (it) {
            return (
              '<li class="' + P + 'vault-item" data-cw-reveal>' +
                '<span class="' + P + 'vault-kind">' + U.esc(it.kind) + "</span>" +
                '<h3 class="' + P + 'vault-title">' +
                  (it.url ? U.link(it.url, it.title, P + 'vault-link') : U.esc(it.title)) +
                "</h3>" +
                (it.meta ? '<p class="' + P + 'vault-meta">' + U.esc(it.meta) + "</p>" : "") +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function contact(data) {
    var b = data.basics;
    var links = [];
    if (data.links.github) links.push(["GitHub", data.links.github]);
    if (data.links.linkedin) links.push(["LinkedIn", data.links.linkedin]);
    if (data.links.website) links.push(["Website", data.links.website]);
    if (data.links.twitter) links.push(["Twitter", data.links.twitter]);
    data.links.other.forEach(function (o) { links.push([o.label, o.url]); });
    return (
      '<section class="' + P + 'section ' + P + 'contact" id="contact">' +
        head("FILE.06", "Contact") +
        '<div class="' + P + 'contact-plate" data-cw-reveal>' +
          '<p class="' + P + 'contact-lead">' + U.esc(b.tagline || "Signal is open.") + "</p>" +
          (b.email ? '<a class="' + P + 'contact-mail" href="mailto:' + U.escUrl(b.email) + '">' + U.esc(b.email) + "</a>" : "") +
          (links.length
            ? '<ul class="' + P + 'contact-links">' + links.map(function (l) {
                return "<li>" + U.link(l[1], l[0]) + "</li>";
              }).join("") + "</ul>"
            : "") +
        "</div>" +
        '<footer class="' + P + 'foot" data-cw-reveal>' +
          "<span>" + U.esc(b.fullName || "Portfolio") + "</span>" +
          '<span class="' + P + 'foot-mark">Gridlock</span>' +
        "</footer>" +
      "</section>"
    );
  }

  /* ---------- glitch ---------- */

  /**
   * Replays the glitch keyframes by toggling a class, so the effect fires in a
   * slow loop instead of running forever (which would be exhausting to read).
   */
  function initGlitch(root) {
    if (CW.anim && CW.anim.prefersReduced && CW.anim.prefersReduced()) return;
    var targets = root.querySelectorAll("." + P + "glitch, ." + P + "hero-name, ." + P + "sec-title");
    var nodes = root.querySelectorAll("[data-cw-text]");
    if (!targets.length) return;

    var timer = window.setInterval(function () {
      targets.forEach(function (el) {
        el.classList.remove("is-glitching");
        // Force reflow so the animation restarts cleanly.
        void el.offsetWidth;
        el.classList.add("is-glitching");
      });
      nodes.forEach(function (el) {
        el.classList.add("is-glitching");
        window.setTimeout(function () { el.classList.remove("is-glitching"); }, 520);
      });
    }, 7000);
    root.__cwGridlockTimer = timer;
  }

  /* ---------- module ---------- */

  CW.templates["template-35"] = {
    id: "template-35",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) +
            dossier(data) +
            loadout(data) +
            intel(data) +
            record(data) +
            certs(data) +
            contact(data) +
          "</main>" +
        "</div>"
      );
    },
    init: function (root) {
      if (!root) return;
      var toggle = root.querySelector("." + P + "nav-toggle");
      var menu = root.querySelector("." + P + "menu");
      if (toggle && menu) {
        toggle.addEventListener("click", function () {
          var open = menu.classList.toggle("is-open");
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
          toggle.classList.toggle("is-open", open);
        });
        menu.addEventListener("click", function (e) {
          if (e.target.closest("a")) {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.classList.remove("is-open");
          }
        });
      }
      if (CW.anim) CW.anim.reveal(root);
      initGlitch(root);
    }
  };
})();
