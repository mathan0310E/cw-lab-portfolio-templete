/*
 * TEMPLATE 2 — VCARD (existing CWLABS template, recreated to the same
 * rendering contract). Compact digital business card with a sticky identity
 * rail and a scrolling detail column. Namespaced: cw-vcard-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-vcard-";

  function rail(data) {
    var b = data.basics;
    var l = data.links;
    var links = [l.github ? ["GitHub", l.github] : null, l.linkedin ? ["LinkedIn", l.linkedin] : null, l.website ? ["Website", l.website] : null, l.twitter ? ["Twitter", l.twitter] : null]
      .filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    return (
      '<aside class="' + P + 'rail">' +
        '<div class="' + P + 'avatar">' +
          (b.profileImage ? U.image(b.profileImage, b.fullName || "Portrait", P + "avatar-img", "", true)
            : '<span class="' + P + 'avatar-fallback">' + U.monogram(b.fullName) + "</span>") +
        "</div>" +
        '<h1 class="' + P + 'name">' + U.esc(b.fullName || "Your Name") + "</h1>" +
        (b.role ? '<p class="' + P + 'role">' + U.esc(b.role) + "</p>" : "") +
        (b.location ? '<p class="' + P + 'loc">' + U.esc(b.location) + "</p>" : "") +
        (b.email ? '<a class="' + P + 'btn" href="mailto:' + U.esc(b.email) + '">Email me</a>' : "") +
        (links.length ? '<ul class="' + P + 'social">' + links.map(function (x) {
          return "<li>" + U.link(x[1], x[0], P + "link") + "</li>";
        }).join("") + "</ul>" : "") +
      "</aside>"
    );
  }

  function main(data) {
    var out = "";
    if (data.basics.tagline || data.basics.bio) {
      out += '<section class="' + P + 'block">' +
        (data.basics.tagline ? '<p class="' + P + 'tag" data-cw-reveal>' + U.esc(data.basics.tagline) + "</p>" : "") +
        (data.basics.bio ? '<div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>" : "") +
        "</section>";
    }
    if (data.has.skills) {
      out += '<section class="' + P + 'block"><h2 class="' + P + 'h2" data-cw-reveal>Skills</h2><ul class="' + P + 'chips">' +
        data.skills.map(function (s) { return '<li data-cw-reveal>' + U.esc(s.name) + "</li>"; }).join("") + "</ul></section>";
    }
    if (data.has.projects) {
      out += '<section class="' + P + 'block"><h2 class="' + P + 'h2" data-cw-reveal>Projects</h2><div class="' + P + 'list">' +
        data.projects.map(function (p) {
          return '<article class="' + P + 'item" data-cw-reveal>' +
            (p.image ? '<div class="' + P + 'item-media">' + U.image(p.image, p.name, P + "item-img") + "</div>" : "") +
            '<div class="' + P + 'item-body"><h3>' + U.esc(p.name) + "</h3>" +
            (p.description ? "<p>" + U.esc(p.description) + "</p>" : "") +
            (p.technologies.length ? '<p class="' + P + 'tech">' + p.technologies.map(U.esc).join(" \u00B7 ") + "</p>" : "") +
            '<p class="' + P + 'item-links">' + (p.url ? U.link(p.url, "Visit", P + "link") : "") + (p.repo ? U.link(p.repo, "Code", P + "link") : "") + "</p></div></article>";
        }).join("") + "</div></section>";
    }
    if (data.has.experience) {
      out += '<section class="' + P + 'block"><h2 class="' + P + 'h2" data-cw-reveal>Experience</h2><div class="' + P + 'rows">' +
        data.experienceSorted.map(function (e) {
          return '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
            '<span class="' + P + 'row-body"><strong>' + U.esc(e.role) + "</strong>" + (e.company ? "<em>" + U.esc(e.company) + "</em>" : "") +
            (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") + "</span></div>";
        }).join("") + "</div></section>";
    }
    if (data.has.education) {
      out += '<section class="' + P + 'block"><h2 class="' + P + 'h2" data-cw-reveal>Education</h2><div class="' + P + 'rows">' +
        data.education.map(function (e) {
          return '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
            '<span class="' + P + 'row-body"><strong>' + U.esc(e.degree) + "</strong>" + (e.institution ? "<em>" + U.esc(e.institution) + "</em>" : "") + "</span></div>";
        }).join("") + "</div></section>";
    }
    if (data.has.certificates) {
      out += '<section class="' + P + 'block"><h2 class="' + P + 'h2" data-cw-reveal>Certificates</h2><ul class="' + P + 'certs">' +
        data.certificates.map(function (c) {
          return '<li data-cw-reveal><strong>' + U.esc(c.name) + "</strong>" + (c.issuer ? " \u00B7 " + U.esc(c.issuer) : "") +
            (c.date ? ' <span class="' + P + 'meta">' + U.esc(U.fmtDate(c.date)) + "</span>" : "") +
            (c.verifyUrl ? " " + U.link(c.verifyUrl, "Verify", P + "link") : "") + "</li>";
        }).join("") + "</ul></section>";
    }
    return out;
  }

  CW.templates["template-2"] = {
    id: "template-2",
    render: function (data) {
      return '<div class="' + P + 'page"><div class="' + P + 'card">' + rail(data) +
        '<main class="' + P + 'main">' + main(data) + "</main></div></div>";
    },
    init: function (root) { if (root && CW.anim) CW.anim.reveal(root); }
  };
})();
