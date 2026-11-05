/*
 * TEMPLATE 5 — CYBER ELITE (existing CWLABS template, recreated to the same
 * rendering contract). Dark security-themed profile with terminal accents.
 * Namespaced: cw-cyber-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-cyber-";

  function bar(data) {
    var links = [["about", "about"], ["skills", "skills"], ["projects", "projects"], ["experience", "experience"], ["contact", "contact"]];
    return '<header class="' + P + 'bar"><span class="' + P + 'prompt" aria-hidden="true">&gt;_</span>' +
      '<span class="' + P + 'name">' + U.esc(data.basics.fullName || "user") + "</span>" +
      '<nav class="' + P + 'nav" aria-label="Sections">' + links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") + "</nav></header>";
  }

  function hero(data) {
    var b = data.basics;
    return '<section class="' + P + 'hero" id="top"><div class="' + P + 'hero-left" data-cw-reveal>' +
      '<p class="' + P + 'status"><span class="' + P + 'dot" aria-hidden="true"></span>' + U.esc(b.role || "Security Professional") + "</p>" +
      '<h1 class="' + P + 'name-h">' + U.esc(b.fullName || "Your Name") + "</h1>" +
      (b.tagline ? '<p class="' + P + 'tag">' + U.esc(b.tagline) + "</p>" : "") +
      '<div class="' + P + 'actions">' + (b.email ? '<a class="' + P + 'btn" href="mailto:' + U.esc(b.email) + '">$ contact</a>' : "") +
      (data.links.github ? U.link(data.links.github, "$ github", P + "btn " + P + "btn--ghost") : "") + "</div></div>" +
      '<div class="' + P + 'terminal" data-cw-reveal aria-hidden="true"><div class="' + P + 'term-bar"><span></span><span></span><span></span></div>' +
      '<pre class="' + P + 'term-body">' + U.esc("$ whoami\n" + (b.fullName || "unknown") + "\n$ cat role.txt\n" + (b.role || "n/a") + "\n$ echo $LOCATION\n" + (b.location || "n/a")) + "</pre></div></section>";
  }

  function section(id, title, body) {
    return '<section class="' + P + 'section" id="' + id + '"><h2 class="' + P + 'h2" data-cw-reveal>' + U.esc(title) + "</h2>" + body + "</section>";
  }

  function about(data) {
    if (!data.basics.bio) return "";
    return section("about", "about", '<div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>");
  }

  function skills(data) {
    if (!data.has.skills) return "";
    return section("skills", "skills", '<div class="' + P + 'skills">' + data.skillGroups.map(function (g) {
      return '<div class="' + P + 'skill-col" data-cw-reveal><h3>' + U.esc(g.category) + "</h3><ul>" +
        g.skills.map(function (s) { return "<li>" + U.esc(s.name) + (s.level !== null ? '<span class="' + P + 'meter"><i style="width:' + s.level + '%"></i></span>' : "") + "</li>"; }).join("") + "</ul></div>";
    }).join("") + "</div>");
  }

  function projects(data) {
    if (!data.has.projects) return "";
    return section("projects", "projects", '<div class="' + P + 'projs">' + data.projects.map(function (p, i) {
      return '<article class="' + P + 'proj" data-cw-reveal><div class="' + P + 'proj-head"><span class="' + P + 'proj-id">' + String(i + 1).padStart(2, "0") + "</span>" +
        (p.category ? '<span class="' + P + 'proj-cat">' + U.esc(p.category) + "</span>" : "") + "</div>" +
        "<h3>" + U.esc(p.name) + "</h3>" + (p.description ? "<p>" + U.esc(p.description) + "</p>" : "") +
        (p.technologies.length ? '<ul class="' + P + 'tags">' + p.technologies.map(function (t) { return "<li>" + U.esc(t) + "</li>"; }).join("") + "</ul>" : "") +
        '<p class="' + P + 'proj-links">' + (p.repo ? U.link(p.repo, "[src]", P + "link") : "") + (p.url ? U.link(p.url, "[live]", P + "link") : "") + "</p></article>";
    }).join("") + "</div>");
  }

  function experience(data) {
    if (!data.has.experience && !data.has.education) return "";
    var out = section("experience", "experience", '<div class="' + P + 'rows">' +
      data.experienceSorted.map(function (e) {
        return '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
          '<span class="' + P + 'row-body"><strong>' + U.esc(e.role) + "</strong>" + (e.company ? "<em>" + U.esc(e.company) + "</em>" : "") + (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") + "</span></div>";
      }).join("") + data.education.map(function (e) {
        return '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
          '<span class="' + P + 'row-body"><strong>' + U.esc(e.degree) + "</strong>" + (e.institution ? "<em>" + U.esc(e.institution) + "</em>" : "") + "</span></div>";
      }).join("") + "</div>");
    return out;
  }

  function contact(data) {
    var l = data.links;
    var links = [l.github ? ["GitHub", l.github] : null, l.linkedin ? ["LinkedIn", l.linkedin] : null, l.website ? ["Website", l.website] : null, l.twitter ? ["Twitter", l.twitter] : null]
      .filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    return section("contact", "contact", '<div class="' + P + 'contact">' +
      (data.basics.email ? '<a class="' + P + 'mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>" : "") +
      (data.basics.location ? '<p class="' + P + 'loc">' + U.esc(data.basics.location) + "</p>" : "") +
      (links.length ? '<ul class="' + P + 'social">' + links.map(function (x) { return "<li>" + U.link(x[1], x[0], P + "link") + "</li>"; }).join("") + "</ul>" : "") + "</div>");
  }

  CW.templates["template-5"] = {
    id: "template-5",
    render: function (data) {
      return '<div class="' + P + 'page">' + bar(data) + '<main class="' + P + 'main">' +
        hero(data) + about(data) + skills(data) + projects(data) + experience(data) + contact(data) + "</main></div>";
    },
    init: function (root) { if (root && CW.anim) CW.anim.reveal(root); }
  };
})();
