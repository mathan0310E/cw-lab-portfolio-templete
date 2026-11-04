/*
 * TEMPLATE 24 — ARCHIVE
 * Personal professional archive. Minimal editorial, white/grey/dark navy,
 * timeline-led, compact nav, typography-focused, document aesthetic.
 * Namespaced: cw-archive-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-archive-";

  function nav(data) {
    var links = [["bio", "Biography"], ["timeline", "Timeline"], ["education", "Education"], ["projects", "Projects"], ["publications", "Publications"], ["certifications", "Certifications"], ["skills", "Skills"], ["contact", "Contact"]];
    return (
      '<header class="' + P + 'bar">' +
        '<a class="' + P + 'bar-title" href="#top">' + U.esc(data.basics.fullName || "Archive") + "</a>" +
        '<nav class="' + P + 'bar-nav" aria-label="Sections">' +
          links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
        "</nav>" +
        '<button class="' + P + 'bar-toggle" type="button" aria-expanded="false" aria-controls="cw-archive-menu"><span></span><span></span><span class="' + P + 'sr">Menu</span></button>' +
      "</header>" +
      '<nav id="cw-archive-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="top">' +
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-photo" data-cw-reveal>' +
            (b.profileImage
              ? U.image(b.profileImage, b.fullName || "Portrait", P + "photo-img",
                  '<span class="' + P + 'photo-fallback">' + U.monogram(b.fullName) + "</span>", true)
              : '<span class="' + P + 'photo-fallback">' + U.monogram(b.fullName) + "</span>") +
          "</div>" +
          '<div class="' + P + 'hero-body">' +
            '<p class="' + P + 'hero-kicker" data-cw-reveal>' + U.esc(b.role || "Portfolio") + "</p>" +
            '<h1 class="' + P + 'hero-name" data-cw-reveal>' + U.esc(b.fullName || "Your Name") + "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tag" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
            '<dl class="' + P + 'hero-meta" data-cw-reveal>' +
              (b.location ? "<div><dt>Location</dt><dd>" + U.esc(b.location) + "</dd></div>" : "") +
              (b.email ? '<div><dt>Email</dt><dd><a href="mailto:' + U.esc(b.email) + '">' + U.esc(b.email) + "</a></dd></div>" : "") +
            "</dl>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function section(id, title, body) {
    return (
      '<section class="' + P + 'section" id="' + id + '" aria-labelledby="' + id + '-h">' +
        '<h2 class="' + P + 'h2" id="' + id + '-h" data-cw-reveal>' + U.esc(title) + "</h2>" +
        body +
      "</section>"
    );
  }

  function bio(data) {
    if (!data.basics.bio) return "";
    return section("bio", "Biography", '<div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>");
  }

  /** Unified chronological timeline across experience, education, projects, certs. */
  function timeline(data) {
    var events = [];
    data.experience.forEach(function (e) {
      events.push({ sort: U.sortKey(e.startDate), when: U.dateRange(e.startDate, e.endDate), kind: "Role", title: e.role, sub: e.company, text: e.description });
    });
    data.education.forEach(function (e) {
      events.push({ sort: U.sortKey(e.startDate), when: U.dateRange(e.startDate, e.endDate), kind: "Education", title: e.degree, sub: e.institution, text: e.description });
    });
    data.projects.forEach(function (p) {
      events.push({ sort: U.sortKey(p.year), when: U.fmtDate(p.year), kind: "Project", title: p.name, sub: p.technologies.join(", "), text: p.description });
    });
    data.certificates.forEach(function (c) {
      events.push({ sort: U.sortKey(c.date), when: U.fmtDate(c.date), kind: "Certification", title: c.name, sub: c.issuer, text: "" });
    });
    events.sort(function (a, b) { return b.sort - a.sort; });
    if (!events.length) return "";
    return section("timeline", "Career Timeline",
      '<ol class="' + P + 'timeline">' +
        events.map(function (ev) {
          return (
            '<li class="' + P + 'tl" data-cw-reveal>' +
              '<span class="' + P + 'tl-when">' + U.esc(ev.when || "\u2014") + "</span>" +
              '<span class="' + P + 'tl-mark" aria-hidden="true"></span>' +
              '<span class="' + P + 'tl-body">' +
                '<span class="' + P + 'tl-kind">' + U.esc(ev.kind) + "</span>" +
                "<strong>" + U.esc(ev.title) + "</strong>" +
                (ev.sub ? "<em>" + U.esc(ev.sub) + "</em>" : "") +
                (ev.text ? "<span>" + U.esc(ev.text) + "</span>" : "") +
              "</span>" +
            "</li>"
          );
        }).join("") +
      "</ol>");
  }

  function education(data) {
    if (!data.has.education) return "";
    return section("education", "Education",
      '<ul class="' + P + 'entries">' +
        data.education.map(function (e) {
          return '<li class="' + P + 'entry" data-cw-reveal>' +
            '<span class="' + P + 'entry-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
            '<span class="' + P + 'entry-body"><strong>' + U.esc(e.degree) + "</strong>" +
              (e.institution ? "<em>" + U.esc(e.institution) + "</em>" : "") +
              (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") + "</span></li>";
        }).join("") +
      "</ul>");
  }

  function projects(data) {
    if (!data.has.projects) return "";
    return section("projects", "Projects",
      '<ul class="' + P + 'entries">' +
        data.projects.map(function (p) {
          return '<li class="' + P + 'entry" data-cw-reveal>' +
            '<span class="' + P + 'entry-when">' + U.esc(p.year || "") + "</span>" +
            '<span class="' + P + 'entry-body"><strong>' + U.esc(p.name) + "</strong>" +
              (p.description ? "<span>" + U.esc(p.description) + "</span>" : "") +
              (p.technologies.length ? '<span class="' + P + 'entry-tech">' + p.technologies.map(U.esc).join(" \u00B7 ") + "</span>" : "") +
              (p.url || p.repo ? '<span class="' + P + 'entry-links">' + (p.url ? U.link(p.url, "Live", P + "link") : "") + (p.repo ? U.link(p.repo, "Source", P + "link") : "") + "</span>" : "") +
            "</span></li>";
        }).join("") +
      "</ul>");
  }

  function publications(data) {
    if (!data.has.publications && !data.has.writeups) return "";
    var items = data.publications.concat(data.writeups);
    return section("publications", "Publications",
      '<ul class="' + P + 'entries">' +
        items.map(function (p) {
          return '<li class="' + P + 'entry" data-cw-reveal>' +
            '<span class="' + P + 'entry-when">' + U.esc(U.fmtDate(p.date)) + "</span>" +
            '<span class="' + P + 'entry-body"><strong>' + (p.url ? U.link(p.url, p.title, P + "link") : U.esc(p.title)) + "</strong>" +
              (p.description ? "<span>" + U.esc(p.description) + "</span>" : "") + "</span></li>";
        }).join("") +
      "</ul>");
  }

  function certifications(data) {
    if (!data.has.certificates) return "";
    return section("certifications", "Certifications",
      '<ul class="' + P + 'entries">' +
        data.certificates.map(function (c) {
          return '<li class="' + P + 'entry" data-cw-reveal>' +
            '<span class="' + P + 'entry-when">' + U.esc(U.fmtDate(c.date)) + "</span>" +
            '<span class="' + P + 'entry-body"><strong>' + U.esc(c.name) + "</strong>" +
              (c.issuer ? "<em>" + U.esc(c.issuer) + "</em>" : "") +
              (c.verifyUrl ? '<span class="' + P + 'entry-links">' + U.link(c.verifyUrl, "Verify credential", P + "link") + "</span>" : "") + "</span></li>";
        }).join("") +
      "</ul>");
  }

  function skills(data) {
    if (!data.has.skills) return "";
    return section("skills", "Skills",
      '<div class="' + P + 'skills">' +
        data.skillGroups.map(function (g) {
          return '<div class="' + P + 'skill-col" data-cw-reveal><h3>' + U.esc(g.category) + "</h3><ul>" +
            g.skills.map(function (s) { return "<li>" + U.esc(s.name) + (s.level !== null ? '<span class="' + P + 'skill-lvl">' + s.level + "</span>" : "") + "</li>"; }).join("") +
            "</ul></div>";
        }).join("") +
      "</div>");
  }

  function contact(data) {
    var l = data.links;
    var links = [
      l.github ? ["GitHub", l.github] : null,
      l.linkedin ? ["LinkedIn", l.linkedin] : null,
      l.website ? ["Website", l.website] : null,
      l.twitter ? ["Twitter", l.twitter] : null
    ].filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    return section("contact", "Contact",
      '<div class="' + P + 'contact">' +
        '<div data-cw-reveal>' +
          (data.basics.email ? '<a class="' + P + 'mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>" : "") +
          (data.basics.location ? '<p class="' + P + 'contact-loc">' + U.esc(data.basics.location) + "</p>" : "") +
        "</div>" +
        (links.length ? '<ul class="' + P + 'contact-list" data-cw-reveal>' + links.map(function (x) {
          return "<li>" + U.link(x[1], x[0], P + "link") + "</li>";
        }).join("") + "</ul>" : "") +
      "</div>");
  }

  CW.templates["template-24"] = {
    id: "template-24",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) + bio(data) + timeline(data) + education(data) + projects(data) +
            publications(data) + certifications(data) + skills(data) + contact(data) +
          "</main>" +
        "</div>"
      );
    },
    init: function (root) {
      if (!root) return;
      var toggle = root.querySelector("." + P + "bar-toggle");
      var menu = root.querySelector("." + P + "menu");
      if (toggle && menu) {
        toggle.addEventListener("click", function () {
          var open = menu.classList.toggle("is-open");
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
          toggle.classList.toggle("is-open", open);
        });
        menu.addEventListener("click", function (e) {
          if (e.target.closest("a")) { menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.classList.remove("is-open"); }
        });
      }
      if (CW.anim) CW.anim.reveal(root);
    }
  };
})();
