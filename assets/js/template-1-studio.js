/*
 * TEMPLATE 1 — STUDIO (existing CWLABS template, recreated to the same
 * rendering contract). Bold studio landing: full-bleed cover, overlapping
 * portrait, wide section blocks. Namespaced: cw-studio-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-studio-";

  function nav(data) {
    var links = [["about", "About"], ["work", "Work"], ["skills", "Skills"], ["experience", "Experience"], ["contact", "Contact"]];
    return (
      '<header class="' + P + 'nav">' +
        '<span class="' + P + 'brand">' + U.esc(data.basics.fullName || "Studio") + "</span>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
        "</nav>" +
      "</header>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="top">' +
        (b.coverImage ? '<div class="' + P + 'hero-cover">' + U.image(b.coverImage, "", P + "cover-img", "", true) + "</div>" : "") +
        '<div class="' + P + 'hero-inner">' +
          '<div class="' + P + 'hero-copy" data-cw-reveal>' +
            '<p class="' + P + 'hero-role">' + U.esc(b.role || "Portfolio") + "</p>" +
            '<h1 class="' + P + 'hero-name">' + U.esc(b.fullName || "Your Name") + "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tag">' + U.esc(b.tagline) + "</p>" : "") +
          "</div>" +
          (b.profileImage
            ? '<div class="' + P + 'hero-portrait" data-cw-reveal>' + U.image(b.profileImage, b.fullName || "Portrait", P + "portrait-img", "", true) + "</div>"
            : "") +
        "</div>" +
      "</section>"
    );
  }

  function about(data) {
    if (!data.basics.bio) return "";
    return '<section class="' + P + 'section" id="about"><h2 class="' + P + 'h2" data-cw-reveal>About</h2>' +
      '<div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div></section>";
  }

  function work(data) {
    if (!data.has.projects) return "";
    return '<section class="' + P + 'section" id="work"><h2 class="' + P + 'h2" data-cw-reveal>Work</h2>' +
      '<div class="' + P + 'cards">' + data.projects.map(function (p) {
        return '<article class="' + P + 'card" data-cw-reveal>' +
          '<div class="' + P + 'card-media">' +
            (p.image ? U.image(p.image, p.name, P + "card-img") : '<span class="' + P + 'card-plate" aria-hidden="true">' + U.esc((p.name || "?").charAt(0)) + "</span>") + "</div>" +
          '<h3 class="' + P + 'card-title">' + U.esc(p.name) + "</h3>" +
          (p.description ? '<p class="' + P + 'card-desc">' + U.esc(p.description) + "</p>" : "") +
          (p.technologies.length ? '<p class="' + P + 'card-tech">' + p.technologies.map(U.esc).join(" \u00B7 ") + "</p>" : "") +
          '<p class="' + P + 'card-links">' + (p.url ? U.link(p.url, "Visit", P + "link") : "") + (p.repo ? U.link(p.repo, "Code", P + "link") : "") + "</p>" +
        "</article>";
      }).join("") + "</div></section>";
  }

  function skills(data) {
    if (!data.has.skills) return "";
    return '<section class="' + P + 'section" id="skills"><h2 class="' + P + 'h2" data-cw-reveal>Skills</h2>' +
      '<div class="' + P + 'skills">' + data.skillGroups.map(function (g) {
        return '<div class="' + P + 'skill-col" data-cw-reveal><h3>' + U.esc(g.category) + "</h3><ul>" +
          g.skills.map(function (s) { return "<li>" + U.esc(s.name) + (s.level !== null ? '<span class="' + P + 'lvl">' + s.level + "%</span>" : "") + "</li>"; }).join("") +
          "</ul></div>";
      }).join("") + "</div></section>";
  }

  function experience(data) {
    if (!data.has.experience && !data.has.education) return "";
    var exp = data.experienceSorted.map(function (e) {
      return '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
        '<span class="' + P + 'row-body"><strong>' + U.esc(e.role) + "</strong>" + (e.company ? "<em>" + U.esc(e.company) + "</em>" : "") +
        (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") + "</span></div>";
    }).join("");
    var edu = data.education.map(function (e) {
      return '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
        '<span class="' + P + 'row-body"><strong>' + U.esc(e.degree) + "</strong>" + (e.institution ? "<em>" + U.esc(e.institution) + "</em>" : "") +
        (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") + "</span></div>";
    }).join("");
    return '<section class="' + P + 'section" id="experience"><h2 class="' + P + 'h2" data-cw-reveal>Experience &amp; Education</h2>' +
      '<div class="' + P + 'rows">' + exp + edu + "</div></section>";
  }

  function contact(data) {
    var l = data.links;
    var links = [l.github ? ["GitHub", l.github] : null, l.linkedin ? ["LinkedIn", l.linkedin] : null, l.website ? ["Website", l.website] : null, l.twitter ? ["Twitter", l.twitter] : null]
      .filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    return '<section class="' + P + 'section ' + P + 'contact" id="contact"><h2 class="' + P + 'h2" data-cw-reveal>Contact</h2>' +
      '<div class="' + P + 'contact">' +
        (data.basics.email ? '<a class="' + P + 'mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>" : "") +
        (data.basics.location ? '<p class="' + P + 'loc">' + U.esc(data.basics.location) + "</p>" : "") +
        (links.length ? '<ul class="' + P + 'social">' + links.map(function (x) { return "<li>" + U.link(x[1], x[0], P + "link") + "</li>"; }).join("") + "</ul>" : "") +
      "</div></section>";
  }

  CW.templates["template-1"] = {
    id: "template-1",
    render: function (data) {
      return '<div class="' + P + 'page">' + nav(data) + '<main class="' + P + 'main">' +
        hero(data) + about(data) + work(data) + skills(data) + experience(data) + contact(data) + "</main></div>";
    },
    init: function (root) { if (root && CW.anim) CW.anim.reveal(root); }
  };
})();
