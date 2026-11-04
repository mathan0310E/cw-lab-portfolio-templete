/*
 * TEMPLATE 19 — PAPER & INK
 * Independent creative studio / editorial magazine. Warm ivory paper, deep
 * forest-green ink, serif display headings, magazine project gallery.
 * Namespaced: cw-paper-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-paper-";

  function masthead(data) {
    var b = data.basics;
    var year = new Date().getFullYear();
    return (
      '<header class="' + P + 'masthead">' +
        '<div class="' + P + 'masthead-top">' +
          '<span class="' + P + 'masthead-issue">Portfolio \u00B7 Issue ' + year + "</span>" +
          '<span class="' + P + 'masthead-name">' + U.esc(b.fullName || "Untitled") + "</span>" +
          '<span class="' + P + 'masthead-loc">' + U.esc(b.location || "") + "</span>" +
        "</div>" +
        '<nav class="' + P + 'nav" aria-label="Sections">' +
          '<a href="#intro">Introduction</a><a href="#bio">Biography</a><a href="#work">Work</a>' +
          '<a href="#skills">Skills</a><a href="#education">Education</a><a href="#experience">Experience</a>' +
          '<a href="#writing">Publications</a><a href="#contact">Contact</a>' +
        "</nav>" +
      "</header>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="intro">' +
        '<p class="' + P + 'hero-eyebrow" data-cw-reveal>' + U.esc(b.role || "Portfolio") + "</p>" +
        '<h1 class="' + P + 'hero-title" data-cw-reveal>' + U.esc(b.fullName || "Your Name") + "</h1>" +
        (b.tagline ? '<p class="' + P + 'hero-standfirst" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
        '<div class="' + P + 'hero-rule" data-cw-reveal aria-hidden="true"><span>\u2740</span></div>' +
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-portrait" data-cw-reveal>' +
            (b.profileImage
              ? U.image(b.profileImage, b.fullName || "Portrait", P + "portrait-img",
                  '<span class="' + P + 'portrait-fallback">' + U.monogram(b.fullName) + "</span>", true)
              : '<span class="' + P + 'portrait-fallback">' + U.monogram(b.fullName) + "</span>") +
            '<span class="' + P + 'portrait-caption">' + U.esc(b.fullName || "") + (b.location ? ", " + U.esc(b.location) : "") + "</span>" +
          "</div>" +
          (b.bio ? '<div class="' + P + 'hero-lead" data-cw-reveal>' + U.paragraphs(b.bio.split(/\n{2,}/)[0] || b.bio) + "</div>" : "") +
        "</div>" +
      "</section>"
    );
  }

  function bio(data) {
    if (!data.basics.bio) return "";
    return (
      '<section class="' + P + 'section" id="bio">' +
        '<h2 class="' + P + 'h2" data-cw-reveal>Biography</h2>' +
        '<div class="' + P + 'bio-cols" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>" +
      "</section>"
    );
  }

  function work(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section ' + P + 'work" id="work">' +
        '<h2 class="' + P + 'h2" data-cw-reveal>Selected Work</h2>' +
        '<div class="' + P + 'gallery">' +
          data.projects.map(function (p, i) {
            var big = i % 3 === 0;
            return (
              '<article class="' + P + 'piece' + (big ? " " + P + 'piece--wide' : "") + '" data-cw-reveal>' +
                '<div class="' + P + 'piece-media">' +
                  (p.image
                    ? U.image(p.image, p.name, P + "piece-img")
                    : '<span class="' + P + 'piece-plate" aria-hidden="true">' + U.esc((p.name || "?").charAt(0)) + "</span>") +
                "</div>" +
                '<div class="' + P + 'piece-text">' +
                  '<h3 class="' + P + 'piece-title">' + U.esc(p.name) + "</h3>" +
                  (p.description ? '<p class="' + P + 'piece-desc">' + U.esc(p.description) + "</p>" : "") +
                  (p.technologies.length
                    ? '<p class="' + P + 'piece-tech">' + p.technologies.map(U.esc).join(" \u00B7 ") + "</p>"
                    : "") +
                  '<p class="' + P + 'piece-links">' +
                    (p.url ? U.link(p.url, "View project", P + "link") : "") +
                    (p.repo ? U.link(p.repo, "Repository", P + "link") : "") +
                  "</p>" +
                "</div>" +
              "</article>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function skills(data) {
    if (!data.has.skills) return "";
    return (
      '<section class="' + P + 'section" id="skills">' +
        '<h2 class="' + P + 'h2" data-cw-reveal>Skills</h2>' +
        '<div class="' + P + 'skills">' +
          data.skillGroups.map(function (g) {
            return (
              '<div class="' + P + 'skill-col" data-cw-reveal>' +
                '<h3 class="' + P + 'skill-cat">' + U.esc(g.category) + "</h3>" +
                '<ul>' + g.skills.map(function (s) {
                  return "<li>" + U.esc(s.name) +
                    (s.level !== null ? '<span class="' + P + 'dots" aria-label="' + s.level + '% proficiency">' + dots(s.level) + "</span>" : "") +
                    "</li>";
                }).join("") + "</ul>" +
              "</div>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function dots(level) {
    var n = Math.round(level / 20);
    var out = "";
    for (var i = 0; i < 5; i++) out += i < n ? "\u25CF" : "\u25CB";
    return out;
  }

  function twoColTimeline(data, id, title, items, kind) {
    if (!items.length) return "";
    return (
      '<section class="' + P + 'section" id="' + id + '">' +
        '<h2 class="' + P + 'h2" data-cw-reveal>' + U.esc(title) + "</h2>" +
        '<ol class="' + P + 'ledger">' +
          items.map(function (it) {
            var head = kind === "edu" ? it.degree : it.role;
            var sub = kind === "edu" ? it.institution : it.company;
            return (
              '<li class="' + P + 'ledger-row" data-cw-reveal>' +
                '<span class="' + P + 'ledger-year">' + U.esc(U.dateRange(it.startDate, it.endDate)) + "</span>" +
                '<span class="' + P + 'ledger-body">' +
                  "<strong>" + U.esc(head) + "</strong>" +
                  (sub ? '<em>' + U.esc(sub) + "</em>" : "") +
                  (it.description ? "<span>" + U.esc(it.description) + "</span>" : "") +
                "</span>" +
              "</li>"
            );
          }).join("") +
        "</ol>" +
      "</section>"
    );
  }

  function writing(data) {
    var pubs = data.publications.concat(data.writeups);
    var certs = data.certificates;
    if (!pubs.length && !certs.length) return "";
    return (
      '<section class="' + P + 'section" id="writing">' +
        '<h2 class="' + P + 'h2" data-cw-reveal>Publications &amp; Certificates</h2>' +
        '<div class="' + P + 'writing-grid">' +
          (pubs.length
            ? '<div data-cw-reveal><h3 class="' + P + 'skill-cat">Published</h3><ul class="' + P + 'list">' +
                pubs.map(function (p) {
                  return "<li>" + (p.url ? U.link(p.url, p.title, P + "link") : U.esc(p.title)) +
                    (p.date ? ' <span class="' + P + 'meta">' + U.esc(U.fmtDate(p.date)) + "</span>" : "") +
                    (p.description ? '<p class="' + P + 'meta">' + U.esc(p.description) + "</p>" : "") + "</li>";
                }).join("") + "</ul></div>"
            : "") +
          (certs.length
            ? '<div data-cw-reveal><h3 class="' + P + 'skill-cat">Certified</h3><ul class="' + P + 'list">' +
                certs.map(function (c) {
                  return "<li>" + U.esc(c.name) +
                    (c.issuer ? ' <span class="' + P + 'meta">' + U.esc(c.issuer) + "</span>" : "") +
                    (c.date ? ' <span class="' + P + 'meta">' + U.esc(U.fmtDate(c.date)) + "</span>" : "") +
                    (c.verifyUrl ? " " + U.link(c.verifyUrl, "Verify", P + "link") : "") + "</li>";
                }).join("") + "</ul></div>"
            : "") +
        "</div>" +
      "</section>"
    );
  }

  function contact(data) {
    var l = data.links;
    var links = [
      l.github ? ["GitHub", l.github] : null,
      l.linkedin ? ["LinkedIn", l.linkedin] : null,
      l.website ? ["Website", l.website] : null,
      l.twitter ? ["Twitter", l.twitter] : null
    ].filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    return (
      '<section class="' + P + 'section ' + P + 'contact" id="contact">' +
        '<h2 class="' + P + 'h2" data-cw-reveal>Contact</h2>' +
        '<div class="' + P + 'contact-grid">' +
          '<div data-cw-reveal>' +
            (data.basics.email ? '<a class="' + P + 'mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>" : "") +
            (data.basics.location ? '<p class="' + P + 'meta">' + U.esc(data.basics.location) + "</p>" : "") +
          "</div>" +
          (links.length
            ? '<ul class="' + P + 'list" data-cw-reveal>' + links.map(function (x) {
                return "<li>" + U.link(x[1], x[0], P + "link") + "</li>";
              }).join("") + "</ul>"
            : "") +
        "</div>" +
        '<p class="' + P + 'colophon">' + U.esc(data.basics.fullName || "") + " \u00B7 " + U.esc(data.basics.role || "") + "</p>" +
      "</section>"
    );
  }

  CW.templates["template-19"] = {
    id: "template-19",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          masthead(data) +
          '<main class="' + P + 'main">' +
            hero(data) + bio(data) + work(data) + skills(data) +
            twoColTimeline(data, "education", "Education", data.education, "edu") +
            twoColTimeline(data, "experience", "Experience", data.experienceSorted, "exp") +
            writing(data) + contact(data) +
          "</main>" +
        "</div>"
      );
    },
    init: function (root) {
      if (!root) return;
      if (CW.anim) CW.anim.reveal(root);
    }
  };
})();
