/*
 * TEMPLATE 3 — DEVELOPER CV (existing CWLABS template, recreated to the same
 * rendering contract). Dense two-column engineering résumé with a sidebar of
 * skills and a main column of experience. Namespaced: cw-devcv-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-devcv-";

  function sidebar(data) {
    var b = data.basics, l = data.links;
    var links = [l.github ? ["GitHub", l.github] : null, l.linkedin ? ["LinkedIn", l.linkedin] : null, l.website ? ["Website", l.website] : null, l.twitter ? ["Twitter", l.twitter] : null]
      .filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    return (
      '<aside class="' + P + 'side">' +
        '<div class="' + P + 'side-head">' +
          '<h1 class="' + P + 'name">' + U.esc(b.fullName || "Your Name") + "</h1>" +
          (b.role ? '<p class="' + P + 'role">' + U.esc(b.role) + "</p>" : "") +
        "</div>" +
        '<div class="' + P + 'side-block"><h2 class="' + P + 'h2">Contact</h2><ul class="' + P + 'meta">' +
          (b.email ? '<li><a href="mailto:' + U.esc(b.email) + '">' + U.esc(b.email) + "</a></li>" : "") +
          (b.location ? "<li>" + U.esc(b.location) + "</li>" : "") +
          links.map(function (x) { return "<li>" + U.link(x[1], x[0], P + "link") + "</li>"; }).join("") +
        "</ul></div>" +
        (data.has.skills ? '<div class="' + P + 'side-block"><h2 class="' + P + 'h2">Skills</h2>' +
          data.skillGroups.map(function (g) {
            return '<div class="' + P + 'group"><h3>' + U.esc(g.category) + "</h3><ul>" +
              g.skills.map(function (s) {
                return "<li>" + U.esc(s.name) + (s.level !== null ? '<span class="' + P + 'bar"><i style="width:' + s.level + '%"></i></span>' : "") + "</li>";
              }).join("") + "</ul></div>";
          }).join("") + "</div>" : "") +
        (data.has.education ? '<div class="' + P + 'side-block"><h2 class="' + P + 'h2">Education</h2>' +
          data.education.map(function (e) {
            return '<div class="' + P + 'edu"><strong>' + U.esc(e.degree) + "</strong>" +
              (e.institution ? "<span>" + U.esc(e.institution) + "</span>" : "") +
              '<span class="' + P + 'when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span></div>";
          }).join("") + "</div>" : "") +
        (data.has.certificates ? '<div class="' + P + 'side-block"><h2 class="' + P + 'h2">Certificates</h2><ul class="' + P + 'meta">' +
          data.certificates.map(function (c) { return "<li>" + U.esc(c.name) + (c.date ? ' <span class="' + P + 'when">' + U.esc(U.fmtDate(c.date)) + "</span>" : "") + "</li>"; }).join("") + "</ul></div>" : "") +
      "</aside>"
    );
  }

  function main(data) {
    var out = "";
    if (data.basics.bio) out += '<section class="' + P + 'block"><h2 class="' + P + 'h2">Profile</h2><div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div></section>";
    if (data.has.experience) out += '<section class="' + P + 'block"><h2 class="' + P + 'h2">Experience</h2><div class="' + P + 'rows">' +
      data.experienceSorted.map(function (e) {
        return '<div class="' + P + 'row" data-cw-reveal><div class="' + P + 'row-head"><strong>' + U.esc(e.role) + "</strong>" +
          (e.company ? '<span class="' + P + 'org">' + U.esc(e.company) + "</span>" : "") +
          '<span class="' + P + 'when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span></div>" +
          (e.description ? "<p>" + U.esc(e.description) + "</p>" : "") + "</div>";
      }).join("") + "</div></section>";
    if (data.has.projects) out += '<section class="' + P + 'block"><h2 class="' + P + 'h2">Projects</h2><div class="' + P + 'projs">' +
      data.projects.map(function (p) {
        return '<article class="' + P + 'proj" data-cw-reveal><div class="' + P + 'proj-head"><strong>' + U.esc(p.name) + "</strong>" +
          '<span class="' + P + 'proj-links">' + (p.url ? U.link(p.url, "live", P + "link") : "") + (p.repo ? U.link(p.repo, "src", P + "link") : "") + "</span></div>" +
          (p.description ? "<p>" + U.esc(p.description) + "</p>" : "") +
          (p.technologies.length ? '<p class="' + P + 'tech">' + p.technologies.map(U.esc).join(" \u00B7 ") + "</p>" : "") + "</article>";
      }).join("") + "</div></section>";
    if (data.has.achievements) out += '<section class="' + P + 'block"><h2 class="' + P + 'h2">Achievements</h2><ul class="' + P + 'awards">' +
      data.achievements.map(function (a) { return '<li data-cw-reveal><strong>' + U.esc(a.title) + "</strong>" + (a.date ? ' <span class="' + P + 'when">' + U.esc(U.fmtDate(a.date)) + "</span>" : "") + (a.description ? "<p>" + U.esc(a.description) + "</p>" : "") + "</li>"; }).join("") + "</ul></section>";
    return out;
  }

  CW.templates["template-3"] = {
    id: "template-3",
    render: function (data) {
      return '<div class="' + P + 'page"><div class="' + P + 'sheet">' + sidebar(data) + '<main class="' + P + 'main">' + main(data) + "</main></div></div>";
    },
    init: function (root) { if (root && CW.anim) CW.anim.reveal(root); }
  };
})();
