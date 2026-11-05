/*
 * TEMPLATE 29 — SKETCHBOOK
 * Hand-drawn illustration aesthetic: wobbling ink outlines, doodled SVG art,
 * taped notes and a margin rule. Namespaced under `cw-sketch-`.
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-sketch-";

  /* ---------- hand-drawn illustrations ---------- */

  /** Doodle of a rocket lifting off, drawn with deliberately wobbly lines. */
  function rocketArt() {
    return (
      '<svg class="' + P + 'art" viewBox="0 0 320 300" role="img" aria-label="A hand-drawn rocket lifting off" focusable="false">' +
        '<g fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M160 40 C176 60 186 96 186 132 L186 186 C186 194 180 200 172 200 L148 200 C140 200 134 194 134 186 L134 132 C134 96 144 60 160 40 Z"/>' +
          '<path d="M160 56 C170 74 176 100 176 128"/>' +
          '<circle cx="160" cy="120" r="13"/>' +
          '<circle cx="160" cy="120" r="6.5"/>' +
          '<path d="M134 158 C120 168 112 182 110 198 C124 196 134 190 140 182"/>' +
          '<path d="M186 158 C200 168 208 182 210 198 C196 196 186 190 180 182"/>' +
          '<path d="M148 200 L146 218 L174 218 L172 200"/>' +
          '<path d="M150 226 C152 238 156 246 160 252 C164 246 168 238 170 226"/>' +
          '<path d="M158 236 C159 244 160 250 160 256"/>' +
        "</g>" +
        '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".75">' +
          '<path d="M96 78 C88 70 82 66 74 62"/>' +
          '<path d="M224 78 C232 70 238 66 246 62"/>' +
          '<path d="M96 118 L78 118"/>' +
          '<path d="M224 118 L242 118"/>' +
          '<path d="M104 150 L88 158"/>' +
          '<path d="M216 150 L232 158"/>' +
        "</g>" +
        '<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' +
          '<path d="M40 232 C48 224 58 226 60 234 C62 242 54 248 46 246"/>' +
          '<path d="M262 214 C270 206 282 208 284 218 C286 228 274 232 266 228"/>' +
          '<path d="M60 268 L120 268"/><path d="M130 274 L196 274"/><path d="M206 268 L262 268"/>' +
        "</g>" +
        '<g fill="currentColor" opacity=".9">' +
          '<path d="M64 100 l3.4 7.6 7.6 3.4 -7.6 3.4 -3.4 7.6 -3.4 -7.6 -7.6 -3.4 7.6 -3.4 Z"/>' +
          '<path d="M256 118 l2.6 5.8 5.8 2.6 -5.8 2.6 -2.6 5.8 -2.6 -5.8 -5.8 -2.6 5.8 -2.6 Z"/>' +
        "</g>" +
      "</svg>"
    );
  }

  /** A loose scribble used as a hand-drawn section underline. */
  function scribble(extra) {
    return (
      '<svg class="' + P + 'scribble' + (extra ? " " + extra : "") + '" viewBox="0 0 200 14" aria-hidden="true" focusable="false" preserveAspectRatio="none">' +
        '<path d="M2 9 C34 3 62 12 96 7 C128 2 158 11 198 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>' +
        '<path d="M8 12 C44 7 74 13 110 9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>' +
      "</svg>"
    );
  }

  /** Little doodle icons keyed by skill group, so sections stay illustrative. */
  function doodle(kind) {
    var common = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
    if (kind === "code") {
      return '<svg class="' + P + 'doodle" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><g ' + common + '><path d="M15 12 L7 20 L15 28"/><path d="M25 12 L33 20 L25 28"/><path d="M22 9 L18 31"/></g></svg>';
    }
    if (kind === "shield") {
      return '<svg class="' + P + 'doodle" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><g ' + common + '><path d="M20 6 L32 11 V21 C32 29 26 34 20 36 C14 34 8 29 8 21 V11 Z"/><path d="M15 20 L19 25 L26 15"/></g></svg>';
    }
    if (kind === "beaker") {
      return '<svg class="' + P + 'doodle" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><g ' + common + '><path d="M16 6 H24"/><path d="M17 6 V17 L9 31 C8 33 9 35 12 35 H28 C31 35 32 33 31 31 L23 17 V6"/><path d="M13 26 H27"/></g></svg>';
    }
    return '<svg class="' + P + 'doodle" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><g ' + common + '><circle cx="20" cy="20" r="13"/><path d="M20 12 V20 L27 24"/></g></svg>';
  }

  /* ---------- sections ---------- */

  function nav(data) {
    var links = [
      ["intro", "Intro"],
      ["bio", "Bio"],
      ["work", "Work"],
      ["skills", "Skills"],
      ["experience", "Experience"],
      ["contact", "Say hi"]
    ];
    return (
      '<header class="' + P + 'nav" data-cw-nav>' +
        '<a class="' + P + 'brand" href="#intro">' +
          '<span class="' + P + 'brand-dot" aria-hidden="true"></span>' +
          '<span class="' + P + 'brand-name">' + U.esc(U.firstName(data.basics.fullName) || "Sketchbook") + "</span>" +
        "</a>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l) {
            return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
          }).join("") +
        "</nav>" +
        '<button class="' + P + 'nav-toggle" type="button" aria-expanded="false" aria-controls="cw-sketch-menu">' +
          '<span></span><span></span><span></span>' +
          '<span class="' + P + 'sr">Menu</span>' +
        "</button>" +
      "</header>" +
      '<nav id="cw-sketch-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) {
          return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
        }).join("") +
      "</nav>"
    );
  }

  function intro(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="intro">' +
        '<div class="' + P + 'hero-copy">' +
          '<p class="' + P + 'hand" data-cw-reveal>Hello \u2014 I am</p>' +
          '<h1 class="' + P + 'hero-name" data-cw-reveal>' +
            (b.fullName ? U.esc(b.fullName) : "Your Name") +
            scribble(P + 'hero-scribble') +
          "</h1>" +
          (b.role ? '<p class="' + P + 'hero-role" data-cw-reveal>' + U.esc(b.role) + "</p>" : "") +
          (b.tagline ? '<p class="' + P + 'hero-tag" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
          '<div class="' + P + 'hero-actions" data-cw-reveal>' +
            (data.has.projects ? '<a class="' + P + 'btn" href="#work">Flip through the work</a>' : "") +
            (b.email ? '<a class="' + P + 'btn ' + P + 'btn--line" href="mailto:' + U.escUrl(b.email) + '">Say hello</a>' : "") +
          "</div>" +
        "</div>" +
        '<div class="' + P + 'hero-art" data-cw-reveal>' + rocketArt() + "</div>" +
      "</section>"
    );
  }

  function bio(data) {
    var b = data.basics;
    if (!b.bio && !b.location && !b.profileImage) return "";
    return (
      '<section class="' + P + 'section" id="bio">' +
        '<h2 class="' + P + 'sec-title" data-cw-reveal>Biography' + scribble() + "</h2>" +
        '<div class="' + P + 'bio-grid">' +
          '<div class="' + P + 'bio-photo-wrap" data-cw-reveal>' +
            (b.profileImage
              ? U.image(b.profileImage, b.fullName || "Portrait", P + 'bio-photo',
                  '<span class="' + P + 'bio-photo-fallback">' + U.monogram(b.fullName) + "</span>", true)
              : '<span class="' + P + 'bio-photo-fallback">' + U.monogram(b.fullName) + "</span>") +
            '<span class="' + P + 'tape" aria-hidden="true"></span>' +
          "</div>" +
          '<div class="' + P + 'bio-body" data-cw-reveal>' +
            (b.bio ? U.paragraphs(b.bio) : "") +
            (b.location ? '<p class="' + P + 'hand ' + P + 'bio-note">Based in ' + U.esc(b.location) + "</p>" : "") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function work(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="work">' +
        '<h2 class="' + P + 'sec-title" data-cw-reveal>Selected work' + scribble() + "</h2>" +
        '<ol class="' + P + 'work">' +
          data.projects.map(function (p, i) {
            var links = [];
            if (p.url) links.push(U.link(p.url, "Take a look", P + 'work-link'));
            if (p.repo) links.push(U.link(p.repo, "Source", P + 'work-link'));
            return (
              '<li class="' + P + 'work-item" data-cw-reveal>' +
                '<span class="' + P + 'work-pin" aria-hidden="true">' + U.esc(("0" + (i + 1)).slice(-2)) + "</span>" +
                (p.image
                  ? '<div class="' + P + 'work-media">' + U.image(p.image, p.name, P + 'work-img') + "</div>"
                  : "") +
                '<h3 class="' + P + 'work-name">' + U.esc(p.name) + "</h3>" +
                (p.description ? '<p class="' + P + 'work-desc">' + U.esc(p.description) + "</p>" : "") +
                (p.technologies.length
                  ? '<ul class="' + P + 'tags">' + p.technologies.map(function (t) {
                      return "<li>" + U.esc(t) + "</li>";
                    }).join("") + "</ul>"
                  : "") +
                (links.length ? '<div class="' + P + 'work-links">' + links.join("") + "</div>" : "") +
              "</li>"
            );
          }).join("") +
        "</ol>" +
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
        '<h2 class="' + P + 'sec-title" data-cw-reveal>Skills &amp; tools' + scribble() + "</h2>" +
        '<div class="' + P + 'skill-groups">' +
          Object.keys(groups).map(function (k, gi) {
            var kinds = ["code", "shield", "beaker", "clock"];
            return (
              '<div class="' + P + 'skill-group" data-cw-reveal>' +
                '<div class="' + P + 'skill-head">' + doodle(kinds[gi % kinds.length]) +
                  '<h3 class="' + P + 'skill-cat">' + U.esc(k) + "</h3></div>" +
                '<ul class="' + P + 'skill-list">' +
                  groups[k].map(function (s) {
                    var lvl = U.skillLevel(s.level);
                    return "<li><span>" + U.esc(s.name) + "</span>" +
                      (lvl === null ? "" : '<em aria-hidden="true">' + U.esc(String(lvl)) + "</em>") + "</li>";
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
        '<h2 class="' + P + 'sec-title" data-cw-reveal>Experience' + scribble() + "</h2>" +
        '<ol class="' + P + 'exp">' +
          data.experience.map(function (e) {
            var when = U.dateRange(e.startDate, e.endDate);
            return (
              '<li class="' + P + 'exp-item" data-cw-reveal>' +
                '<div class="' + P + 'exp-when">' + U.esc(when || "\u2014") + "</div>" +
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
        '<h2 class="' + P + 'sec-title" data-cw-reveal>Education' + scribble() + "</h2>" +
        '<ul class="' + P + 'edu">' +
          data.education.map(function (e) {
            var when = U.dateRange(e.startDate, e.endDate);
            return (
              '<li class="' + P + 'edu-item" data-cw-reveal>' +
                '<h3 class="' + P + 'edu-degree">' + U.esc(e.degree || e.institution) + "</h3>" +
                '<p class="' + P + 'edu-inst">' +
                  U.esc([e.degree ? e.institution : "", when].filter(Boolean).join(" \u00b7 ")) +
                "</p>" +
                (e.description ? '<p class="' + P + 'edu-desc">' + U.esc(e.description) + "</p>" : "") +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function extras(data) {
    var pubs = data.has.publications ? data.publications : [];
    var certs = data.has.certificates ? data.certificates : [];
    if (!pubs.length && !certs.length) return "";
    return (
      '<section class="' + P + 'section" id="extras">' +
        '<h2 class="' + P + 'sec-title" data-cw-reveal>Publications &amp; certificates' + scribble() + "</h2>" +
        '<div class="' + P + 'extras-grid">' +
          (pubs.length
            ? '<div class="' + P + 'extras-col" data-cw-reveal><h3 class="' + P + 'extras-head">Writing</h3>' +
                '<ul class="' + P + 'pub-list">' + pubs.map(function (p) {
                  return "<li>" +
                    (p.url ? U.link(p.url, p.title) : "<span>" + U.esc(p.title) + "</span>") +
                    (p.date ? '<em>' + U.esc(U.fmtDate(p.date)) + "</em>" : "") +
                    "</li>";
                }).join("") + "</ul></div>"
            : "") +
          (certs.length
            ? '<div class="' + P + 'extras-col" data-cw-reveal><h3 class="' + P + 'extras-head">Certificates</h3>' +
                '<ul class="' + P + 'cert-list">' + certs.map(function (c) {
                  return "<li>" +
                    (c.verifyUrl ? U.link(c.verifyUrl, c.name) : "<span>" + U.esc(c.name) + "</span>") +
                    (c.issuer ? '<em>' + U.esc(c.issuer) + "</em>" : "") +
                    "</li>";
                }).join("") + "</ul></div>"
            : "") +
        "</div>" +
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
        '<h2 class="' + P + 'sec-title" data-cw-reveal>Say hello' + scribble() + "</h2>" +
        '<div class="' + P + 'note" data-cw-reveal>' +
          '<span class="' + P + 'tape ' + P + 'tape--top" aria-hidden="true"></span>' +
          '<p class="' + P + 'hand ' + P + 'note-line">' +
            U.esc(b.tagline || "I would love to hear what you are working on.") +
          "</p>" +
          (b.email ? '<a class="' + P + 'note-mail" href="mailto:' + U.escUrl(b.email) + '">' + U.esc(b.email) + "</a>" : "") +
          (links.length
            ? '<ul class="' + P + 'note-links">' + links.map(function (l) {
                return "<li>" + U.link(l[1], l[0]) + "</li>";
              }).join("") + "</ul>"
            : "") +
        "</div>" +
        '<footer class="' + P + 'foot" data-cw-reveal>' +
          "<span>" + U.esc(b.fullName || "Portfolio") + "</span>" +
          '<span class="' + P + 'foot-note">drawn in a notebook</span>' +
        "</footer>" +
      "</section>"
    );
  }

  /* ---------- module ---------- */

  CW.templates["template-29"] = {
    id: "template-29",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          '<div class="' + P + 'margin" aria-hidden="true"></div>' +
          nav(data) +
          '<main class="' + P + 'main">' +
            intro(data) +
            bio(data) +
            work(data) +
            skills(data) +
            experience(data) +
            education(data) +
            extras(data) +
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
