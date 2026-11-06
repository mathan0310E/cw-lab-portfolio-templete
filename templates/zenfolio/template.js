/*
 * TEMPLATE 22 — ZENFOLIO
 * Japanese-inspired minimal design. Soft beige, natural charcoal, muted olive.
 * Large whitespace, vertical section labels, quiet transitions, balanced
 * asymmetry. Namespaced: cw-zen-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-zen-";

  function label(text, id) {
    return (
      '<div class="' + P + 'label" aria-hidden="true">' +
        '<span class="' + P + 'label-txt">' + U.esc(text) + "</span>" +
      "</div>"
    );
  }

  function nav(data) {
    var links = [["about", "About"], ["skills", "Skills"], ["work", "Work"], ["experience", "Experience"], ["education", "Education"], ["certificates", "Certificates"], ["contact", "Contact"]];
    return (
      '<header class="' + P + 'bar">' +
        '<a class="' + P + 'bar-mark" href="#top" aria-label="Back to top"><span aria-hidden="true">\u25CB</span></a>' +
        '<nav class="' + P + 'bar-nav" aria-label="Sections">' +
          links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
        "</nav>" +
        '<button class="' + P + 'bar-toggle" type="button" aria-expanded="false" aria-controls="cw-zen-menu"><span></span><span></span><span class="' + P + 'sr">Menu</span></button>' +
      "</header>" +
      '<nav id="cw-zen-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="top">' +
        '<div class="' + P + 'hero-portrait" data-cw-reveal>' +
          (b.profileImage
            ? U.image(b.profileImage, b.fullName || "Portrait", P + "portrait-img",
                '<span class="' + P + 'portrait-fallback">' + U.monogram(b.fullName) + "</span>", true)
            : '<span class="' + P + 'portrait-fallback">' + U.monogram(b.fullName) + "</span>") +
        "</div>" +
        '<div class="' + P + 'hero-text">' +
          '<p class="' + P + 'hero-role" data-cw-reveal>' + U.esc(b.role || "Portfolio") + "</p>" +
          '<h1 class="' + P + 'hero-name" data-cw-reveal>' + U.esc(b.fullName || "Your Name") + "</h1>" +
          (b.tagline ? '<p class="' + P + 'hero-tag" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
        "</div>" +
      "</section>"
    );
  }

  function section(id, labelText, heading, body) {
    return (
      '<section class="' + P + 'section" id="' + id + '" aria-labelledby="' + id + '-h">' +
        label(labelText) +
        '<div class="' + P + 'section-body">' +
          '<h2 class="' + P + 'h2" id="' + id + '-h">' + U.esc(heading) + "</h2>" +
          body +
        "</div>" +
      "</section>"
    );
  }

  function about(data) {
    if (!data.basics.bio) return "";
    return section("about", "About", "About", '<div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>");
  }

  function skills(data) {
    if (!data.has.skills) return "";
    return section("skills", "Skills", "Skills",
      '<div class="' + P + 'skills">' +
        data.skillGroups.map(function (g) {
          return '<div class="' + P + 'skill-col" data-cw-reveal><h3>' + U.esc(g.category) + "</h3><ul>" +
            g.skills.map(function (s) { return "<li>" + U.esc(s.name) + "</li>"; }).join("") + "</ul></div>";
        }).join("") +
      "</div>");
  }

  function work(data) {
    if (!data.has.projects) return "";
    return section("work", "Work", "Selected Projects",
      '<div class="' + P + 'works">' +
        data.projects.map(function (p) {
          return (
            '<article class="' + P + 'work" data-cw-reveal>' +
              '<div class="' + P + 'work-media">' +
                (p.image ? U.image(p.image, p.name, P + "work-img") : '<span class="' + P + 'work-plate" aria-hidden="true"></span>') +
              "</div>" +
              '<div class="' + P + 'work-body">' +
                '<h3 class="' + P + 'work-title">' + U.esc(p.name) + "</h3>" +
                (p.description ? '<p class="' + P + 'work-desc">' + U.esc(p.description) + "</p>" : "") +
                (p.technologies.length ? '<p class="' + P + 'work-tech">' + p.technologies.map(U.esc).join(" \u00B7 ") + "</p>" : "") +
                '<p class="' + P + 'work-links">' +
                  (p.url ? U.link(p.url, "View", P + "link") : "") +
                  (p.repo ? U.link(p.repo, "Repository", P + "link") : "") +
                "</p>" +
              "</div>" +
            "</article>"
          );
        }).join("") +
      "</div>");
  }

  function timelineSection(id, labelText, heading, items, kind) {
    if (!items.length) return "";
    return section(id, labelText, heading,
      '<div class="' + P + 'timeline">' +
        items.map(function (it) {
          var head = kind === "edu" ? it.degree : it.role;
          var sub = kind === "edu" ? it.institution : it.company;
          return (
            '<div class="' + P + 'tl" data-cw-reveal>' +
              '<span class="' + P + 'tl-when">' + U.esc(U.dateRange(it.startDate, it.endDate)) + "</span>" +
              '<span class="' + P + 'tl-body"><strong>' + U.esc(head) + "</strong>" +
                (sub ? "<em>" + U.esc(sub) + "</em>" : "") +
                (it.description ? "<span>" + U.esc(it.description) + "</span>" : "") +
              "</span>" +
            "</div>"
          );
        }).join("") +
      "</div>");
  }

  function certificates(data) {
    if (!data.has.certificates) return "";
    return section("certificates", "Certificates", "Certificates",
      '<ul class="' + P + 'certs">' +
        data.certificates.map(function (c) {
          return '<li class="' + P + 'cert" data-cw-reveal><span class="' + P + 'cert-name">' + U.esc(c.name) + "</span>" +
            '<span class="' + P + 'cert-meta">' + U.esc(c.issuer) + (c.date ? " \u00B7 " + U.esc(U.fmtDate(c.date)) : "") + "</span>" +
            (c.verifyUrl ? U.link(c.verifyUrl, "Verify", P + "link") : "") + "</li>";
        }).join("") +
      "</ul>");
  }

  function contact(data) {
    var l = data.links;
    var links = [
      l.github ? ["GitHub", l.github] : null,
      l.linkedin ? ["LinkedIn", l.linkedin] : null,
      l.website ? ["Website", l.website] : null,
      l.twitter ? ["Twitter", l.twitter] : null
    ].filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    return section("contact", "Contact", "Contact",
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

  CW.templates["template-22"] = {
    id: "template-22",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) + about(data) + skills(data) + work(data) +
            timelineSection("experience", "Experience", "Experience", data.experienceSorted, "exp") +
            timelineSection("education", "Education", "Education", data.education, "edu") +
            certificates(data) + contact(data) +
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
