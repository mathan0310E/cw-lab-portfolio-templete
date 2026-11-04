/*
 * TEMPLATE 4 — AGENCY (existing CWLABS template, recreated to the same
 * rendering contract). Creative agency grid with a capability wall and a
 * service-style layout. Namespaced: cw-agency-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-agency-";

  function header(data) {
    var links = [["services", "Capabilities"], ["work", "Work"], ["about", "About"], ["experience", "Experience"], ["contact", "Contact"]];
    return (
      '<header class="' + P + 'head">' +
        '<span class="' + P + 'logo">' + U.esc(U.initials(data.basics.fullName)) + "</span>" +
        '<nav class="' + P + 'nav" aria-label="Sections">' + links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") + "</nav>" +
      "</header>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return '<section class="' + P + 'hero" id="top">' +
      '<h1 class="' + P + 'hero-title" data-cw-reveal>' + U.esc(b.tagline || b.role || b.fullName || "Portfolio") + "</h1>" +
      '<div class="' + P + 'hero-row">' +
        '<p class="' + P + 'hero-sub" data-cw-reveal>' + U.esc(b.fullName || "") + (b.role ? " \u2014 " + U.esc(b.role) : "") + "</p>" +
        (b.location ? '<p class="' + P + 'hero-loc" data-cw-reveal>' + U.esc(b.location) + "</p>" : "") +
      "</div></section>";
  }

  function services(data) {
    if (!data.has.skills) return "";
    return '<section class="' + P + 'section" id="services"><h2 class="' + P + 'h2" data-cw-reveal>Capabilities</h2>' +
      '<div class="' + P + 'wall">' + data.skillGroups.map(function (g, i) {
        return '<div class="' + P + 'service" data-cw-reveal><span class="' + P + 'service-num">' + String(i + 1).padStart(2, "0") + "</span>" +
          "<h3>" + U.esc(g.category) + "</h3><ul>" + g.skills.map(function (s) { return "<li>" + U.esc(s.name) + "</li>"; }).join("") + "</ul></div>";
      }).join("") + "</div></section>";
  }

  function work(data) {
    if (!data.has.projects) return "";
    return '<section class="' + P + 'section" id="work"><h2 class="' + P + 'h2" data-cw-reveal>Work</h2>' +
      '<div class="' + P + 'grid">' + data.projects.map(function (p, i) {
        return '<article class="' + P + 'tile' + (i % 4 === 0 ? " " + P + 'tile--big' : "") + '" data-cw-reveal>' +
          '<div class="' + P + 'tile-media">' + (p.image ? U.image(p.image, p.name, P + "tile-img") : '<span class="' + P + 'tile-plate" aria-hidden="true">' + U.esc((p.name || "?").charAt(0)) + "</span>") + "</div>" +
          '<div class="' + P + 'tile-body"><h3>' + U.esc(p.name) + "</h3>" +
          (p.description ? "<p>" + U.esc(p.description) + "</p>" : "") +
          (p.technologies.length ? '<p class="' + P + 'tech">' + p.technologies.map(U.esc).join(" \u00B7 ") + "</p>" : "") +
          '<p class="' + P + 'tile-links">' + (p.url ? U.link(p.url, "View", P + "link") : "") + (p.repo ? U.link(p.repo, "Code", P + "link") : "") + "</p></div></article>";
      }).join("") + "</div></section>";
  }

  function about(data) {
    if (!data.basics.bio) return "";
    return '<section class="' + P + 'section" id="about"><h2 class="' + P + 'h2" data-cw-reveal>About</h2>' +
      '<div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div></section>";
  }

  function experience(data) {
    if (!data.has.experience && !data.has.education && !data.has.certificates) return "";
    var out = '<section class="' + P + 'section" id="experience"><h2 class="' + P + 'h2" data-cw-reveal>Track record</h2><div class="' + P + 'rows">';
    data.experienceSorted.forEach(function (e) {
      out += '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
        '<span class="' + P + 'row-body"><strong>' + U.esc(e.role) + "</strong>" + (e.company ? "<em>" + U.esc(e.company) + "</em>" : "") +
        (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") + "</span></div>";
    });
    data.education.forEach(function (e) {
      out += '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
        '<span class="' + P + 'row-body"><strong>' + U.esc(e.degree) + "</strong>" + (e.institution ? "<em>" + U.esc(e.institution) + "</em>" : "") + "</span></div>";
    });
    data.certificates.forEach(function (c) {
      out += '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'row-when">' + U.esc(U.fmtDate(c.date)) + "</span>" +
        '<span class="' + P + 'row-body"><strong>' + U.esc(c.name) + "</strong>" + (c.issuer ? "<em>" + U.esc(c.issuer) + "</em>" : "") + "</span></div>";
    });
    return out + "</div></section>";
  }

  function contact(data) {
    var l = data.links;
    var links = [l.github ? ["GitHub", l.github] : null, l.linkedin ? ["LinkedIn", l.linkedin] : null, l.website ? ["Website", l.website] : null, l.twitter ? ["Twitter", l.twitter] : null]
      .filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    return '<section class="' + P + 'section ' + P + 'contact" id="contact">' +
      '<h2 class="' + P + 'h2" data-cw-reveal>Start a conversation</h2>' +
      (data.basics.email ? '<a class="' + P + 'mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>" : "") +
      (links.length ? '<ul class="' + P + 'social">' + links.map(function (x) { return "<li>" + U.link(x[1], x[0], P + "link") + "</li>"; }).join("") + "</ul>" : "") +
      "</section>";
  }

  CW.templates["template-4"] = {
    id: "template-4",
    render: function (data) {
      return '<div class="' + P + 'page">' + header(data) + '<main class="' + P + 'main">' +
        hero(data) + services(data) + work(data) + about(data) + experience(data) + contact(data) + "</main></div>";
    },
    init: function (root) { if (root && CW.anim) CW.anim.reveal(root); }
  };
})();
