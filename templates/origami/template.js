/*
 * TEMPLATE 32 — ORIGAMI
 * Folded-paper design: a geometric SVG form whose facets fold into place, and
 * project panels that unfold on hover. Warm paper with deep indigo and a
 * terracotta accent. Namespaced under `cw-origami-`.
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-origami-";

  /* ---------- illustrations ---------- */

  /**
   * An abstract folded form. Each facet is its own polygon so CSS can fold it
   * into place with a staggered delay, giving the impression of paper being
   * creased one plane at a time.
   */
  function foldArt() {
    var facets = [
      ["200,40 272,128 200,168", "o1"],
      ["200,40 128,128 200,168", "o2"],
      ["128,128 200,168 110,214", "o3"],
      ["272,128 200,168 290,214", "o4"],
      ["110,214 200,168 200,268", "o5"],
      ["290,214 200,168 200,268", "o6"],
      ["200,268 110,214 152,282", "o7"],
      ["200,268 290,214 248,282", "o8"]
    ];
    return (
      '<svg class="' + P + 'art" viewBox="0 0 400 320" role="img" aria-label="An abstract folded-paper geometric form" focusable="false">' +
        '<g class="' + P + 'facets">' +
          facets.map(function (f) {
            return '<polygon class="' + P + 'facet ' + P + 'facet--' + f[1] + '" points="' + f[0] + '" pathLength="1"/>';
          }).join("") +
        "</g>" +
        '<g class="' + P + 'creases" fill="none" stroke="currentColor" stroke-width="1" opacity=".38">' +
          '<path d="M200 40 L200 168 L110 214 M200 168 L290 214 M200 168 L200 268" pathLength="1"/>' +
          '<path d="M128 128 L272 128" pathLength="1" stroke-dasharray="3 4"/>' +
        "</g>" +
        '<g class="' + P + 'glint" aria-hidden="true">' +
          '<circle cx="200" cy="40" r="3.4"/>' +
          '<circle cx="110" cy="214" r="2.6"/>' +
          '<circle cx="290" cy="214" r="2.6"/>' +
          '<circle cx="200" cy="268" r="3"/>' +
        "</g>" +
      "</svg>"
    );
  }

  /** A folded corner motif used beside section headings. */
  function foldMark() {
    return (
      '<svg class="' + P + 'mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">' +
        '<polygon points="4,36 36,36 36,4" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
        '<polygon points="4,36 36,4 36,36" fill="currentColor" opacity=".18"/>' +
        '<path d="M36 4 L36 36" stroke="currentColor" stroke-width="1.6"/>' +
      "</svg>"
    );
  }

  /* ---------- sections ---------- */

  function nav(data) {
    var links = [
      ["about", "About"],
      ["work", "Work"],
      ["skills", "Skills"],
      ["experience", "Experience"],
      ["contact", "Contact"]
    ];
    return (
      '<header class="' + P + 'nav" data-cw-nav>' +
        '<a class="' + P + 'brand" href="#top">' +
          '<span class="' + P + 'brand-fold" aria-hidden="true"></span>' +
          '<span class="' + P + 'brand-name">' + U.esc(U.firstName(data.basics.fullName) || "Origami") + "</span>" +
        "</a>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l) {
            return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
          }).join("") +
        "</nav>" +
        '<button class="' + P + 'nav-toggle" type="button" aria-expanded="false" aria-controls="cw-origami-menu">' +
          '<span></span><span></span><span></span>' +
          '<span class="' + P + 'sr">Menu</span>' +
        "</button>" +
      "</header>" +
      '<nav id="cw-origami-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
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
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-copy">' +
            '<p class="' + P + 'kicker" data-cw-reveal>' + foldMark() + U.esc(b.role || "Portfolio") + "</p>" +
            '<h1 class="' + P + 'hero-name" data-cw-reveal>' + (b.fullName ? U.esc(b.fullName) : "Your Name") + "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tagline" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
            '<div class="' + P + 'hero-actions" data-cw-reveal>' +
              (data.has.projects ? '<a class="' + P + 'btn" href="#work">Unfold the work</a>' : "") +
              (b.email ? '<a class="' + P + 'btn ' + P + 'btn--ghost" href="mailto:' + U.escUrl(b.email) + '">Start a conversation</a>' : "") +
            "</div>" +
          "</div>" +
          '<div class="' + P + 'hero-art" data-cw-reveal>' + foldArt() + "</div>" +
        "</div>" +
        '<dl class="' + P + 'hero-facts" data-cw-reveal>' +
          (b.location ? '<div><dt>Based in</dt><dd>' + U.esc(b.location) + "</dd></div>" : "") +
          (data.has.projects ? '<div><dt>Projects</dt><dd>' + U.esc(String(data.projects.length)) + "</dd></div>" : "") +
          (data.has.skills ? '<div><dt>Disciplines</dt><dd>' + U.esc(String(Object.keys(groupBy(data.skills)).length)) + "</dd></div>" : "") +
        "</dl>" +
      "</section>"
    );
  }

  function groupBy(skills) {
    var g = {};
    skills.forEach(function (s) { g[s.category || "General"] = 1; });
    return g;
  }

  function head(title, note) {
    return (
      '<div class="' + P + 'sec-head" data-cw-reveal>' +
        foldMark() +
        '<h2 class="' + P + 'sec-title">' + U.esc(title) + "</h2>" +
        (note ? '<span class="' + P + 'sec-note">' + U.esc(note) + "</span>" : "") +
      "</div>"
    );
  }

  function about(data) {
    var b = data.basics;
    if (!b.bio && !b.profileImage) return "";
    return (
      '<section class="' + P + 'section" id="about">' +
        head("About") +
        '<div class="' + P + 'about-grid">' +
          '<div class="' + P + 'about-media" data-cw-reveal>' +
            (b.profileImage
              ? U.image(b.profileImage, b.fullName || "Portrait", P + 'about-photo',
                  '<span class="' + P + 'about-fallback">' + U.monogram(b.fullName) + "</span>", true)
              : '<span class="' + P + 'about-fallback">' + U.monogram(b.fullName) + "</span>") +
          "</div>" +
          '<div class="' + P + 'about-body" data-cw-reveal>' + U.paragraphs(b.bio) + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function work(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="work">' +
        head("Selected work", data.projects.length + " pieces") +
        '<ul class="' + P + 'work">' +
          data.projects.map(function (p, i) {
            var links = [];
            if (p.url) links.push(U.link(p.url, "View", P + 'work-link'));
            if (p.repo) links.push(U.link(p.repo, "Source", P + 'work-link'));
            return (
              '<li class="' + P + 'panel" data-cw-reveal>' +
                '<div class="' + P + 'panel-flap" aria-hidden="true">' +
                  '<span class="' + P + 'panel-no">' + U.esc(("0" + (i + 1)).slice(-2)) + "</span>" +
                "</div>" +
                '<div class="' + P + 'panel-body">' +
                  (p.image
                    ? '<div class="' + P + 'panel-media">' + U.image(p.image, p.name, P + 'panel-img') + "</div>"
                    : "") +
                  '<h3 class="' + P + 'panel-name">' + U.esc(p.name) + "</h3>" +
                  (p.description ? '<p class="' + P + 'panel-desc">' + U.esc(p.description) + "</p>" : "") +
                  (p.technologies.length
                    ? '<ul class="' + P + 'tags">' + p.technologies.map(function (t) {
                        return "<li>" + U.esc(t) + "</li>";
                      }).join("") + "</ul>"
                    : "") +
                  (links.length ? '<div class="' + P + 'panel-links">' + links.join("") + "</div>" : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function skills(data) {
    if (!data.has.skills) return "";
    var groups = {};
    data.skills.forEach(function (s) {
      var k = s.category || "General";
      (groups[k] = groups[k] || []).push(s);
    });
    return (
      '<section class="' + P + 'section" id="skills">' +
        head("Skills") +
        '<div class="' + P + 'skill-grid">' +
          Object.keys(groups).map(function (k) {
            return (
              '<div class="' + P + 'skill-card" data-cw-reveal>' +
                '<h3 class="' + P + 'skill-cat">' + U.esc(k) + "</h3>" +
                '<ul class="' + P + 'skill-list">' +
                  groups[k].map(function (s) {
                    var lvl = U.skillLevel(s.level);
                    return (
                      "<li" + (lvl === null ? "" : ' style="--cw-lvl:' + lvl + '%"') + ">" +
                        '<span class="' + P + 'skill-name">' + U.esc(s.name) + "</span>" +
                        (lvl === null
                          ? ""
                          : '<span class="' + P + 'skill-pips" aria-hidden="true">' +
                              [0, 1, 2, 3, 4].map(function (n) {
                                return '<span class="' + (lvl >= (n + 1) * 20 ? "is-on" : "") + '"></span>';
                              }).join("") + "</span>" +
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

  function experience(data) {
    if (!data.has.experience) return "";
    return (
      '<section class="' + P + 'section" id="experience">' +
        head("Experience") +
        '<ol class="' + P + 'exp">' +
          data.experience.map(function (e) {
            var when = U.dateRange(e.startDate, e.endDate);
            return (
              '<li class="' + P + 'exp-item" data-cw-reveal>' +
                '<div class="' + P + 'exp-meta">' +
                  (when ? '<span class="' + P + 'exp-when">' + U.esc(when) + "</span>" : "") +
                "</div>" +
                '<div class="' + P + 'exp-body">' +
                  '<h3 class="' + P + 'exp-role">' + U.esc(e.role || e.company) + "</h3>" +
                  (e.role && e.company ? '<p class="' + P + 'exp-org">' + U.esc(e.company) + "</p>" : "") +
                  (e.description ? '<p class="' + P + 'exp-desc">' + U.esc(e.description) + "</p>" : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ol>" +
      "</section>"
    );
  }

  function education(data) {
    if (!data.has.education) return "";
    return (
      '<section class="' + P + 'section" id="education">' +
        head("Education") +
        '<ul class="' + P + 'edu">' +
          data.education.map(function (e) {
            var when = U.dateRange(e.startDate, e.endDate);
            return (
              '<li class="' + P + 'edu-item" data-cw-reveal>' +
                '<h3 class="' + P + 'edu-degree">' + U.esc(e.degree || e.institution) + "</h3>" +
                '<p class="' + P + 'edu-inst">' + U.esc([e.degree ? e.institution : "", when].filter(Boolean).join(" \u00b7 ")) + "</p>" +
                (e.description ? '<p class="' + P + 'edu-desc">' + U.esc(e.description) + "</p>" : "") +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function honours(data) {
    var items = [];
    data.achievements.forEach(function (a) {
      items.push({ kind: "Award", title: a.title, meta: [a.description, U.fmtDate(a.date)].filter(Boolean).join(" \u00b7 "), url: "" });
    });
    data.certificates.forEach(function (c) {
      items.push({ kind: "Certificate", title: c.name, meta: [c.issuer, U.fmtDate(c.date)].filter(Boolean).join(" \u00b7 "), url: c.verifyUrl });
    });
    if (!items.length) return "";
    return (
      '<section class="' + P + 'section" id="honours">' +
        head("Awards & certificates") +
        '<ul class="' + P + 'honours">' +
          items.map(function (it) {
            return (
              '<li class="' + P + 'honour" data-cw-reveal>' +
                '<span class="' + P + 'honour-kind">' + U.esc(it.kind) + "</span>" +
                '<h3 class="' + P + 'honour-title">' + U.esc(it.title) + "</h3>" +
                (it.meta ? '<p class="' + P + 'honour-meta">' + U.esc(it.meta) + "</p>" : "") +
                (it.url ? U.link(it.url, "Verify", P + 'honour-link') : "") +
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
        head("Contact") +
        '<div class="' + P + 'contact-card" data-cw-reveal>' +
          '<span class="' + P + 'contact-fold" aria-hidden="true"></span>' +
          '<p class="' + P + 'contact-lead">' + U.esc(b.tagline || "Let us make something worth folding.") + "</p>" +
          (b.email ? '<a class="' + P + 'contact-mail" href="mailto:' + U.escUrl(b.email) + '">' + U.esc(b.email) + "</a>" : "") +
          (links.length
            ? '<ul class="' + P + 'contact-links">' + links.map(function (l) {
                return "<li>" + U.link(l[1], l[0]) + "</li>";
              }).join("") + "</ul>"
            : "") +
        "</div>" +
        '<footer class="' + P + 'foot" data-cw-reveal>' +
          "<span>" + U.esc(b.fullName || "Portfolio") + "</span>" +
          '<span class="' + P + 'foot-mark">Origami</span>' +
        "</footer>" +
      "</section>"
    );
  }

  /* ---------- module ---------- */

  CW.templates["template-32"] = {
    id: "template-32",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) +
            about(data) +
            work(data) +
            skills(data) +
            experience(data) +
            education(data) +
            honours(data) +
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
