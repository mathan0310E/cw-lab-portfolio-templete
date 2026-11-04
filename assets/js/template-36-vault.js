/*
 * TEMPLATE 36 — VAULT
 * Zero-trust architecture. Slate with a mint accent, a slowly rotating
 * wireframe shield built from stacked polygon rings, and an animated perimeter
 * trace. Restrained and architectural rather than neon. Namespaced `cw-vault-`.
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-vault-";

  /* ---------- illustrations ---------- */

  /**
   * A shield formed from horizontal bands that rotate in a shallow 3D
   * projection. Each band is a polygon in the shield's outline, so the stack
   * reads as a solid form while the bands drift at slightly different rates.
   */
  function shield() {
    var bands = [
      "M160 26 L250 60 L250 74 L160 40 L70 74 L70 60 Z",
      "M160 58 L250 92 L250 106 L160 72 L70 106 L70 92 Z",
      "M160 90 L250 124 L250 138 L160 104 L70 138 L70 124 Z",
      "M160 122 L250 156 L250 170 L160 136 L70 170 L70 156 Z",
      "M160 154 L250 188 L250 202 L160 168 L70 202 L70 188 Z",
      "M160 186 L238 216 L238 230 L160 200 L82 230 L82 216 Z",
      "M160 218 L222 244 L222 256 L160 230 L98 256 L98 244 Z",
      "M160 248 L204 268 L204 278 L160 258 L116 278 L116 268 Z",
      "M160 276 L182 288 L182 296 L160 284 L138 296 L138 288 Z"
    ];
    return (
      '<svg class="' + P + 'art" viewBox="0 0 320 330" role="img" aria-label="A wireframe shield built from rotating bands" focusable="false">' +
        '<g class="' + P + 'halo" fill="none" stroke="currentColor" stroke-width="1" opacity=".3">' +
          '<ellipse cx="160" cy="168" rx="140" ry="150"/>' +
          '<ellipse cx="160" cy="168" rx="140" ry="150" transform="rotate(60 160 168)"/>' +
          '<ellipse cx="160" cy="168" rx="140" ry="150" transform="rotate(120 160 168)"/>' +
        "</g>" +
        '<g class="' + P + 'bands">' +
          bands.map(function (d, i) {
            return '<path class="' + P + 'band" pathLength="1" style="--cw-i:' + i + '" d="' + d + '"/>';
          }).join("") +
        "</g>" +
        '<g class="' + P + 'perimeter" fill="none" stroke="currentColor" stroke-width="1.6">' +
          '<path class="' + P + 'trace" pathLength="1" d="M160 26 L250 60 L250 170 C250 232 214 282 160 306 C106 282 70 232 70 170 L70 60 Z"/>' +
        "</g>" +
        '<g class="' + P + 'core" fill="none" stroke="currentColor" stroke-width="1.8">' +
          '<circle cx="160" cy="168" r="26"/>' +
          '<path d="M160 150 L160 186 M142 168 L178 168"/>' +
        "</g>" +
        '<circle class="' + P + 'core-dot" cx="160" cy="168" r="6" fill="currentColor"/>' +
      "</svg>"
    );
  }

  /** Small lock glyph for section markers. */
  function lockGlyph() {
    return (
      '<svg class="' + P + 'mark" viewBox="0 0 28 28" aria-hidden="true" focusable="false">' +
        '<rect x="5" y="12" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
        '<path d="M9 12 V9 A5 5 0 0 1 19 9 V12" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
        '<circle cx="14" cy="18" r="2" fill="currentColor"/>' +
      "</svg>"
    );
  }

  /* ---------- sections ---------- */

  function nav(data) {
    var links = [
      ["posture", "Posture"],
      ["controls", "Controls"],
      ["architecture", "Architecture"],
      ["tenure", "Tenure"],
      ["contact", "Contact"]
    ];
    return (
      '<header class="' + P + 'nav" data-cw-nav>' +
        '<a class="' + P + 'brand" href="#top">' +
          '<span class="' + P + 'brand-mark" aria-hidden="true"></span>' +
          '<span class="' + P + 'brand-name">' + U.esc(U.firstName(data.basics.fullName) || "Vault") + "</span>" +
        "</a>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l) {
            return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
          }).join("") +
        "</nav>" +
        '<button class="' + P + 'nav-toggle" type="button" aria-expanded="false" aria-controls="cw-vault-menu">' +
          '<span></span><span></span><span></span>' +
          '<span class="' + P + 'sr">Menu</span>' +
        "</button>" +
      "</header>" +
      '<nav id="cw-vault-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) {
          return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
        }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    var posture = [
      b.role ? ["Discipline", b.role] : null,
      b.location ? ["Region", b.location] : null,
      data.has.certificates ? ["Attested", String(data.certificates.length)] : null,
      data.has.skills ? ["Controls", String(data.skills.length)] : null
    ].filter(Boolean);

    return (
      '<section class="' + P + 'hero" id="top">' +
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-copy">' +
            '<p class="' + P + 'kicker" data-cw-reveal>' +
              lockGlyph() +
              '<span>' + U.esc(b.role || "Security engineering") + "</span>" +
              '<span class="' + P + 'kicker-state"><span class="' + P + 'dot" aria-hidden="true"></span>sealed</span>' +
            "</p>" +
            '<h1 class="' + P + 'hero-name" data-cw-reveal>' + (b.fullName ? U.esc(b.fullName) : "Your Name") + "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tagline" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
            '<div class="' + P + 'hero-actions" data-cw-reveal>' +
              (data.has.projects ? '<a class="' + P + 'btn" href="#architecture">Review architecture</a>' : "") +
              (b.email ? '<a class="' + P + 'btn ' + P + 'btn--ghost" href="mailto:' + U.escUrl(b.email) + '">Request access</a>' : "") +
            "</div>" +
          "</div>" +
          '<div class="' + P + 'hero-art" data-cw-reveal>' + shield() + "</div>" +
        "</div>" +
        (posture.length
          ? '<dl class="' + P + 'posture" data-cw-reveal>' + posture.map(function (s) {
              return "<div><dt>" + U.esc(s[0]) + "</dt><dd>" + U.esc(s[1]) + "</dd></div>";
            }).join("") + "</dl>"
          : "") +
      "</section>"
    );
  }

  function head(num, title, note) {
    return (
      '<div class="' + P + 'sec-head" data-cw-reveal>' +
        '<span class="' + P + 'sec-num">' + U.esc(num) + "</span>" +
        '<h2 class="' + P + 'sec-title">' + U.esc(title) + "</h2>" +
        (note ? '<span class="' + P + 'sec-note">' + U.esc(note) + "</span>" : "") +
      "</div>"
    );
  }

  function postureSection(data) {
    var b = data.basics;
    if (!b.bio && !b.profileImage) return "";
    return (
      '<section class="' + P + 'section" id="posture">' +
        head("01", "Posture", "BIOGRAPHY") +
        '<div class="' + P + 'posture-grid">' +
          '<div class="' + P + 'posture-media" data-cw-reveal>' +
            '<div class="' + P + 'media-shell">' +
              (b.profileImage
                ? U.image(b.profileImage, b.fullName || "Portrait", P + 'posture-photo',
                    '<span class="' + P + 'posture-fallback">' + U.monogram(b.fullName) + "</span>", true)
                : '<span class="' + P + 'posture-fallback">' + U.monogram(b.fullName) + "</span>") +
              '<span class="' + P + 'media-trace" aria-hidden="true"></span>' +
            "</div>" +
            '<span class="' + P + 'media-note">ATTESTED IDENTITY</span>' +
          "</div>" +
          '<div class="' + P + 'posture-body" data-cw-reveal>' + U.paragraphs(b.bio) + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function controls(data) {
    if (!data.has.skills) return "";
    var groups = {};
    data.skills.forEach(function (s) {
      var k = s.category || "General";
      (groups[k] = groups[k] || []).push(s);
    });
    return (
      '<section class="' + P + 'section" id="controls">' +
        head("02", "Controls", "CAPABILITY") +
        '<div class="' + P + 'controls">' +
          Object.keys(groups).map(function (k) {
            return (
              '<div class="' + P + 'control-card" data-cw-reveal>' +
                '<h3 class="' + P + 'control-cat">' + U.esc(k) + "</h3>" +
                '<ul class="' + P + 'control-list">' +
                  groups[k].map(function (s) {
                    var lvl = U.skillLevel(s.level);
                    return (
                      "<li" + (lvl === null ? "" : ' style="--cw-lvl:' + lvl + '%"') + ">" +
                        '<span class="' + P + 'control-name">' + U.esc(s.name) + "</span>" +
                        (lvl === null
                          ? ""
                          : '<span class="' + P + 'control-gauge" aria-hidden="true"><span></span></span>' +
                            '<span class="' + P + 'control-val">' + U.esc(String(lvl).padStart(2, "0")) + "</span>" +
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

  function architecture(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="architecture">' +
        head("03", "Architecture", "PROJECTS") +
        '<ul class="' + P + 'arch">' +
          data.projects.map(function (p, i) {
            var links = [];
            if (p.url) links.push(U.link(p.url, "Overview", P + 'arch-link'));
            if (p.repo) links.push(U.link(p.repo, "Source", P + 'arch-link'));
            return (
              '<li class="' + P + 'arch-item" data-cw-reveal>' +
                '<div class="' + P + 'arch-head">' +
                  '<span class="' + P + 'arch-ref">' + U.esc("ARCH-" + ("0" + (i + 1)).slice(-2)) + "</span>" +
                  (p.severity ? '<span class="' + P + 'arch-sev">' + U.esc(p.severity) + "</span>" : "") +
                  (p.category ? '<span class="' + P + 'arch-cat">' + U.esc(p.category) + "</span>" : "") +
                "</div>" +
                '<div class="' + P + 'arch-grid">' +
                  '<div class="' + P + 'arch-body">' +
                    '<h3 class="' + P + 'arch-name">' + U.esc(p.name) + "</h3>" +
                    (p.description ? '<p class="' + P + 'arch-desc">' + U.esc(p.description) + "</p>" : "") +
                    (p.technologies.length
                      ? '<ul class="' + P + 'stack">' + p.technologies.map(function (t) {
                          return "<li>" + U.esc(t) + "</li>";
                        }).join("") + "</ul>"
                      : "") +
                    (links.length ? '<div class="' + P + 'arch-links">' + links.join("") + "</div>" : "") +
                  "</div>" +
                  (p.image ? '<div class="' + P + 'arch-media">' + U.image(p.image, p.name, P + 'arch-img') + "</div>" : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function tenure(data) {
    var rows = [];
    data.experience.forEach(function (e) {
      rows.push({ tag: "ROLE", title: e.role || e.company, org: e.role ? e.company : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    data.education.forEach(function (e) {
      rows.push({ tag: "EDU", title: e.degree || e.institution, org: e.degree ? e.institution : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    if (!rows.length) return "";
    rows.sort(function (a, b) { return b.key - a.key; });
    return (
      '<section class="' + P + 'section" id="tenure">' +
        head("04", "Tenure", "CHRONOLOGY") +
        '<ol class="' + P + 'tenure">' +
          rows.map(function (r) {
            return (
              '<li class="' + P + 'tenure-row" data-cw-reveal>' +
                '<span class="' + P + 'tenure-node" aria-hidden="true"></span>' +
                '<div class="' + P + 'tenure-meta">' +
                  '<span class="' + P + 'tenure-tag">' + U.esc(r.tag) + "</span>" +
                  (r.when ? '<span class="' + P + 'tenure-when">' + U.esc(r.when) + "</span>" : "") +
                "</div>" +
                '<h3 class="' + P + 'tenure-title">' + U.esc(r.title) + "</h3>" +
                (r.org ? '<p class="' + P + 'tenure-org">' + U.esc(r.org) + "</p>" : "") +
                (r.desc ? '<p class="' + P + 'tenure-desc">' + U.esc(r.desc) + "</p>" : "") +
              "</li>"
            );
          }).join("") +
        "</ol>" +
      "</section>"
    );
  }

  function attestations(data) {
    if (!data.has.certificates && !data.has.writeups) return "";
    var items = [];
    data.certificates.forEach(function (c) {
      items.push({ kind: "CERTIFICATION", title: c.name, meta: [c.issuer, U.fmtDate(c.date)].filter(Boolean).join(" \u00b7 "), url: c.verifyUrl });
    });
    data.writeups.forEach(function (w) {
      items.push({ kind: "WRITEUP", title: w.title, meta: [w.category, U.fmtDate(w.date)].filter(Boolean).join(" \u00b7 "), url: w.url });
    });
    return (
      '<section class="' + P + 'section" id="attestations">' +
        head("05", "Attestations", "VERIFIED") +
        '<ul class="' + P + 'attest">' +
          items.map(function (it) {
            return (
              '<li class="' + P + 'attest-item" data-cw-reveal>' +
                '<span class="' + P + 'attest-kind">' + U.esc(it.kind) + "</span>" +
                '<h3 class="' + P + 'attest-title">' +
                  (it.url ? U.link(it.url, it.title, P + 'attest-link') : U.esc(it.title)) +
                "</h3>" +
                (it.meta ? '<p class="' + P + 'attest-meta">' + U.esc(it.meta) + "</p>" : "") +
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
        head("06", "Contact", "SECURE CHANNEL") +
        '<div class="' + P + 'contact-shell" data-cw-reveal>' +
          '<span class="' + P + 'contact-trace" aria-hidden="true"></span>' +
          '<p class="' + P + 'contact-lead">' + U.esc(b.tagline || "Open to security engineering work.") + "</p>" +
          (b.email ? '<a class="' + P + 'contact-mail" href="mailto:' + U.escUrl(b.email) + '">' + U.esc(b.email) + "</a>" : "") +
          (links.length
            ? '<ul class="' + P + 'contact-links">' + links.map(function (l) {
                return "<li>" + U.link(l[1], l[0]) + "</li>";
              }).join("") + "</ul>"
            : "") +
        "</div>" +
        '<footer class="' + P + 'foot" data-cw-reveal>' +
          '<span class="' + P + 'dot" aria-hidden="true"></span>' +
          "<span>" + U.esc(b.fullName || "Portfolio") + "</span>" +
          '<span class="' + P + 'foot-mark">Vault</span>' +
        "</footer>" +
      "</section>"
    );
  }

  /* ---------- module ---------- */

  CW.templates["template-36"] = {
    id: "template-36",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) +
            postureSection(data) +
            controls(data) +
            architecture(data) +
            tenure(data) +
            attestations(data) +
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
    }
  };
})();
