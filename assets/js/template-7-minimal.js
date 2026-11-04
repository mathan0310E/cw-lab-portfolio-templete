/*
 * TEMPLATE 7 — MINIMAL (existing CWLABS template, recreated to the same
 * rendering contract). Quiet single-column layout with generous whitespace and
 * restrained typography. Namespaced: cw-minimal-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-minimal-";

  function head(data) {
    var b = data.basics;
    return '<header class="' + P + 'head" id="top">' +
      '<h1 class="' + P + 'name" data-cw-reveal>' + U.esc(b.fullName || "Your Name") + "</h1>" +
      (b.role ? '<p class="' + P + 'role" data-cw-reveal>' + U.esc(b.role) + "</p>" : "") +
      (b.tagline ? '<p class="' + P + 'tag" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
      "</header>";
  }

  function section(title, body) {
    return '<section class="' + P + 'section"><h2 class="' + P + 'h2" data-cw-reveal>' + U.esc(title) + "</h2>" + body + "</section>";
  }

  function body(data) {
    var out = "";
    if (data.basics.bio) out += section("About", '<div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>");
    if (data.has.projects) out += section("Work", '<ul class="' + P + 'list">' + data.projects.map(function (p) {
      return '<li data-cw-reveal><div class="' + P + 'item-head"><strong>' + U.esc(p.name) + "</strong>" +
        '<span class="' + P + 'item-links">' + (p.url ? U.link(p.url, "Visit", P + "link") : "") + (p.repo ? U.link(p.repo, "Code", P + "link") : "") + "</span></div>" +
        (p.description ? "<p>" + U.esc(p.description) + "</p>" : "") +
        (p.technologies.length ? '<p class="' + P + 'tech">' + p.technologies.map(U.esc).join(" \u00B7 ") + "</p>" : "") + "</li>";
    }).join("") + "</ul>");
    if (data.has.skills) out += section("Skills", '<p class="' + P + 'tags" data-cw-reveal>' + data.skills.map(function (s) { return U.esc(s.name); }).join(" \u00B7 ") + "</p>");
    if (data.has.experience) out += section("Experience", '<ul class="' + P + 'list">' + data.experienceSorted.map(function (e) {
      return '<li data-cw-reveal><div class="' + P + 'item-head"><strong>' + U.esc(e.role) + (e.company ? ", " + U.esc(e.company) : "") + "</strong>" +
        '<span class="' + P + 'when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span></div>" + (e.description ? "<p>" + U.esc(e.description) + "</p>" : "") + "</li>";
    }).join("") + "</ul>");
    if (data.has.education) out += section("Education", '<ul class="' + P + 'list">' + data.education.map(function (e) {
      return '<li data-cw-reveal><div class="' + P + 'item-head"><strong>' + U.esc(e.degree) + (e.institution ? ", " + U.esc(e.institution) : "") + "</strong>" +
        '<span class="' + P + 'when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span></div></li>";
    }).join("") + "</ul>");
    if (data.has.certificates) out += section("Certificates", '<ul class="' + P + 'list">' + data.certificates.map(function (c) {
      return '<li data-cw-reveal><div class="' + P + 'item-head"><strong>' + U.esc(c.name) + "</strong>" +
        '<span class="' + P + 'when">' + U.esc(U.fmtDate(c.date)) + "</span></div>" +
        (c.issuer ? "<p>" + U.esc(c.issuer) + (c.verifyUrl ? " " + U.link(c.verifyUrl, "Verify", P + "link") : "") + "</p>" : "") + "</li>";
    }).join("") + "</ul>");
    var l = data.links;
    var links = [l.github ? ["GitHub", l.github] : null, l.linkedin ? ["LinkedIn", l.linkedin] : null, l.website ? ["Website", l.website] : null, l.twitter ? ["Twitter", l.twitter] : null]
      .filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    out += section("Contact",
      (data.basics.email ? '<p data-cw-reveal><a class="' + P + 'mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a></p>" : "") +
      (data.basics.location ? '<p class="' + P + 'loc" data-cw-reveal>' + U.esc(data.basics.location) + "</p>" : "") +
      (links.length ? '<p class="' + P + 'tags" data-cw-reveal>' + links.map(function (x) { return U.link(x[1], x[0], P + "link"); }).join(" \u00B7 ") + "</p>" : ""));
    return out;
  }

  CW.templates["template-7"] = {
    id: "template-7",
    render: function (data) {
      return '<div class="' + P + 'page"><main class="' + P + 'main">' + head(data) + body(data) + "</main></div>";
    },
    init: function (root) { if (root && CW.anim) CW.anim.reveal(root); }
  };
})();
