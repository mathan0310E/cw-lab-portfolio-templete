/*
 * TEMPLATE 27 — SIGNATURE
 * Premium personal branding. Black and warm yellow, oversized type, editorial
 * image placement, asymmetric composition, signature-style identity section and
 * a strong project presentation. Namespaced: cw-signature-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-signature-";

  function nav(data) {
    var links = [["about", "About"], ["work", "Work"], ["skills", "Skills"], ["experience", "Experience"], ["achievements", "Achievements"], ["certificates", "Certificates"], ["contact", "Contact"]];
    return (
      '<header class="' + P + 'bar">' +
        '<a class="' + P + 'bar-mark" href="#top" aria-label="Top">' + U.esc(U.initials(data.basics.fullName)) + "</a>" +
        '<nav class="' + P + 'bar-nav" aria-label="Sections">' +
          links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
        "</nav>" +
        '<button class="' + P + 'bar-toggle" type="button" aria-expanded="false" aria-controls="cw-signature-menu"><span></span><span></span><span class="' + P + 'sr">Menu</span></button>' +
      "</header>" +
      '<nav id="cw-signature-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="top">' +
        (b.coverImage ? '<div class="' + P + 'hero-cover" aria-hidden="true">' + U.image(b.coverImage, "", P + "cover-img", "", true) + "</div>" : "") +
        '<div class="' + P + 'hero-inner">' +
          '<p class="' + P + 'hero-eyebrow" data-cw-reveal>' + U.esc(b.role || "Portfolio") + "</p>" +
          '<h1 class="' + P + 'hero-name" data-cw-reveal>' + U.esc(b.fullName || "Your Name") + "</h1>" +
          (b.tagline ? '<p class="' + P + 'hero-tag" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
          '<div class="' + P + 'hero-actions" data-cw-reveal>' +
            (b.email ? '<a class="' + P + 'btn" href="mailto:' + U.esc(b.email) + '">Get in touch</a>' : "") +
            (data.has.projects ? '<a class="' + P + 'btn ' + P + 'btn--ghost" href="#work">Selected work</a>' : "") +
          "</div>" +
          (b.profileImage
            ? '<div class="' + P + 'hero-portrait" data-cw-reveal>' + U.image(b.profileImage, b.fullName || "Portrait", P + "portrait-img", "", true) + "</div>"
            : "") +
        "</div>" +
      "</section>"
    );
  }

  /** Signature identity strip: a stylised signature line drawn from the name. */
  function signature(data) {
    var name = data.basics.fullName;
    if (!name) return "";
    return (
      '<section class="' + P + 'sig" aria-label="Signature">' +
        '<p class="' + P + 'sig-script" aria-hidden="true">' + U.esc(name) + "</p>" +
        '<span class="' + P + 'sig-rule" aria-hidden="true"></span>' +
        '<p class="' + P + 'sig-meta">' + U.esc(data.basics.role || "") + (data.basics.location ? " \u00B7 " + U.esc(data.basics.location) : "") + "</p>" +
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

  function about(data) {
    if (!data.basics.bio) return "";
    return section("about", "About", '<div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>");
  }

  function work(data) {
    if (!data.has.projects) return "";
    return section("work", "Selected Work",
      '<div class="' + P + 'work">' +
        data.projects.map(function (p, i) {
          var featured = i === 0;
          return (
            '<article class="' + P + 'piece' + (featured ? " " + P + 'piece--feature' : "") + '" data-cw-reveal>' +
              '<div class="' + P + 'piece-media">' +
                (p.image
                  ? U.image(p.image, p.name, P + "piece-img")
                  : '<span class="' + P + 'piece-plate" aria-hidden="true">' + U.esc((p.name || "?").charAt(0)) + "</span>") +
              "</div>" +
              '<div class="' + P + 'piece-body">' +
                '<span class="' + P + 'piece-idx">' + String(i + 1).padStart(2, "0") + "</span>" +
                '<h3 class="' + P + 'piece-title">' + U.esc(p.name) + "</h3>" +
                (p.description ? '<p class="' + P + 'piece-desc">' + U.esc(p.description) + "</p>" : "") +
                (p.technologies.length ? '<ul class="' + P + 'piece-tech">' + p.technologies.map(function (t) { return "<li>" + U.esc(t) + "</li>"; }).join("") + "</ul>" : "") +
                '<div class="' + P + 'piece-links">' +
                  (p.url ? U.link(p.url, "View project", P + "link") : "") +
                  (p.repo ? U.link(p.repo, "Repository", P + "link") : "") +
                "</div>" +
              "</div>" +
            "</article>"
          );
        }).join("") +
      "</div>");
  }

  function skills(data) {
    if (!data.has.skills) return "";
    return section("skills", "Skills",
      '<div class="' + P + 'skills">' +
        data.skillGroups.map(function (g) {
          return '<div class="' + P + 'skill-col" data-cw-reveal><h3>' + U.esc(g.category) + "</h3><ul>" +
            g.skills.map(function (s) {
              return '<li><span>' + U.esc(s.name) + "</span>" +
                (s.level !== null ? '<span class="' + P + 'skill-bar" aria-label="' + s.level + '%"><i style="width:' + s.level + '%"></i></span>' : "") + "</li>";
            }).join("") + "</ul></div>";
        }).join("") +
      "</div>");
  }

  function experience(data) {
    if (!data.has.experience) return "";
    return section("experience", "Experience",
      '<div class="' + P + 'rows">' +
        data.experienceSorted.map(function (e) {
          return '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
            '<span class="' + P + 'row-body"><strong>' + U.esc(e.role) + "</strong>" +
            (e.company ? "<em>" + U.esc(e.company) + "</em>" : "") +
            (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") + "</span></div>";
        }).join("") +
      "</div>");
  }

  function achievements(data) {
    if (!data.has.achievements) return "";
    return section("achievements", "Achievements",
      '<ul class="' + P + 'awards">' +
        data.achievements.map(function (a) {
          return '<li class="' + P + 'award" data-cw-reveal><span class="' + P + 'award-mark" aria-hidden="true">\u2726</span>' +
            '<span class="' + P + 'award-body"><strong>' + U.esc(a.title) + "</strong>" +
            (a.date ? '<span class="' + P + 'award-date">' + U.esc(U.fmtDate(a.date)) + "</span>" : "") +
            (a.description ? "<span>" + U.esc(a.description) + "</span>" : "") + "</span></li>";
        }).join("") +
      "</ul>");
  }

  function certificates(data) {
    if (!data.has.certificates) return "";
    return section("certificates", "Certificates",
      '<div class="' + P + 'certs">' +
        data.certificates.map(function (c) {
          return '<article class="' + P + 'cert" data-cw-reveal>' +
            (c.image ? '<div class="' + P + 'cert-media">' + U.image(c.image, c.name, P + "cert-img") + "</div>" : "") +
            '<h3 class="' + P + 'cert-name">' + U.esc(c.name) + "</h3>" +
            '<p class="' + P + 'cert-meta">' + U.esc(c.issuer) + (c.date ? " \u00B7 " + U.esc(U.fmtDate(c.date)) : "") + "</p>" +
            (c.verifyUrl ? '<p class="' + P + 'cert-link">' + U.link(c.verifyUrl, "Verify credential", P + "link") + "</p>" : "") +
          "</article>";
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
    return (
      '<section class="' + P + 'section ' + P + 'contact" id="contact" aria-labelledby="contact-h">' +
        '<h2 class="' + P + 'h2" id="contact-h" data-cw-reveal>Contact</h2>' +
        '<div class="' + P + 'contact">' +
          '<div data-cw-reveal>' +
            (data.basics.email ? '<a class="' + P + 'mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>" : "") +
            (data.basics.location ? '<p class="' + P + 'contact-loc">' + U.esc(data.basics.location) + "</p>" : "") +
          "</div>" +
          (links.length ? '<ul class="' + P + 'contact-list" data-cw-reveal>' + links.map(function (x) {
            return "<li>" + U.link(x[1], x[0], P + "link") + '<span class="' + P + 'contact-url">' + U.esc(U.prettyUrl(x[1])) + "</span></li>";
          }).join("") + "</ul>" : "") +
        "</div>" +
        '<p class="' + P + 'colophon">' + U.esc(data.basics.fullName || "") + "</p>" +
      "</section>"
    );
  }

  CW.templates["template-27"] = {
    id: "template-27",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) + signature(data) + about(data) + work(data) + skills(data) +
            experience(data) + achievements(data) + certificates(data) + contact(data) +
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
