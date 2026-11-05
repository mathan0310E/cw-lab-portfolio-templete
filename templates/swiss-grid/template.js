/*
 * TEMPLATE 20 — SWISS GRID
 * International typographic style. Strict 12-column grid, white/black/red,
 * large type, numbered sections, geometric blocks and a numbered project index.
 * Namespaced: cw-swiss-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-swiss-";

  var SECTIONS = [
    ["01", "Introduction", "intro"],
    ["02", "Profile", "profile"],
    ["03", "Capabilities", "capabilities"],
    ["04", "Projects", "projects"],
    ["05", "Experience", "experience"],
    ["06", "Education", "education"],
    ["07", "Certifications", "certifications"],
    ["08", "Contact", "contact"]
  ];

  function head(id, num, title) {
    return (
      '<div class="' + P + 'head" data-cw-reveal>' +
        '<span class="' + P + 'head-num">' + num + "</span>" +
        '<h2 class="' + P + 'head-title" id="' + id + '-h">' + U.esc(title) + "</h2>" +
        '<span class="' + P + 'head-rule" aria-hidden="true"></span>' +
      "</div>"
    );
  }

  function nav(data) {
    return (
      '<header class="' + P + 'bar">' +
        '<div class="' + P + 'bar-grid">' +
          '<span class="' + P + 'bar-logo" aria-hidden="true"></span>' +
          '<span class="' + P + 'bar-name">' + U.esc(data.basics.fullName || "Portfolio") + "</span>" +
          '<span class="' + P + 'bar-role">' + U.esc(data.basics.role || "") + "</span>" +
          '<span class="' + P + 'bar-loc">' + U.esc(data.basics.location || "") + "</span>" +
        "</div>" +
        '<nav class="' + P + 'bar-nav" aria-label="Sections">' +
          SECTIONS.map(function (s) {
            return '<a href="#' + s[2] + '">' + s[0] + " " + U.esc(s[1]) + "</a>";
          }).join("") +
        "</nav>" +
      "</header>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'intro" id="intro">' +
        '<div class="' + P + 'intro-grid">' +
          '<div class="' + P + 'intro-index" aria-hidden="true">01</div>' +
          '<div class="' + P + 'intro-body">' +
            '<h1 class="' + P + 'intro-name" data-cw-reveal>' +
              (b.fullName ? U.esc(b.fullName) : "Your Name") +
            "</h1>" +
            (b.tagline ? '<p class="' + P + 'intro-tag" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
          "</div>" +
          '<div class="' + P + 'intro-meta" data-cw-reveal>' +
            (b.role ? '<p><span>Role</span>' + U.esc(b.role) + "</p>" : "") +
            (b.location ? '<p><span>Location</span>' + U.esc(b.location) + "</p>" : "") +
            (b.email ? '<p><span>Email</span><a href="mailto:' + U.esc(b.email) + '">' + U.esc(b.email) + "</a></p>" : "") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function profile(data) {
    if (!data.basics.bio) return "";
    return (
      '<section class="' + P + 'section" id="profile" aria-labelledby="profile-h">' +
        head("profile", "02", "Profile") +
        '<div class="' + P + 'profile-grid">' +
          '<div class="' + P + 'profile-photo" data-cw-reveal>' +
            (data.basics.profileImage
              ? U.image(data.basics.profileImage, data.basics.fullName || "Portrait", P + "photo-img",
                  '<span class="' + P + 'photo-fallback">' + U.monogram(data.basics.fullName) + "</span>", true)
              : '<span class="' + P + 'photo-fallback">' + U.monogram(data.basics.fullName) + "</span>") +
          "</div>" +
          '<div class="' + P + 'profile-text" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function capabilities(data) {
    if (!data.has.skills) return "";
    return (
      '<section class="' + P + 'section" id="capabilities" aria-labelledby="capabilities-h">' +
        head("capabilities", "03", "Capabilities") +
        '<div class="' + P + 'caps">' +
          data.skills.map(function (s, i) {
            var n = (i + 1 < 10 ? "0" : "") + (i + 1);
            return (
              '<div class="' + P + 'cap" data-cw-reveal>' +
                '<span class="' + P + 'cap-num">' + n + "</span>" +
                '<span class="' + P + 'cap-name">' + U.esc(s.name) + "</span>" +
                (s.category ? '<span class="' + P + 'cap-cat">' + U.esc(s.category) + "</span>" : '<span class="' + P + 'cap-cat"></span>') +
                (s.level !== null ? '<span class="' + P + 'cap-bar" aria-label="' + s.level + '% proficiency"><span style="width:' + s.level + '%"></span></span>' : '<span class="' + P + 'cap-bar"></span>') +
              "</div>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function projects(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="projects" aria-labelledby="projects-h">' +
        head("projects", "04", "Projects") +
        '<ol class="' + P + 'index">' +
          data.projects.map(function (p, i) {
            var n = (i + 1 < 10 ? "0" : "") + (i + 1);
            return (
              '<li class="' + P + 'index-row" data-cw-reveal>' +
                '<span class="' + P + 'index-num">' + n + "</span>" +
                '<span class="' + P + 'index-title">' + U.esc(p.name) + "</span>" +
                '<span class="' + P + 'index-tech">' + U.esc(p.technologies.join(" / ")) + "</span>" +
                '<span class="' + P + 'index-links">' +
                  (p.url ? U.link(p.url, "Live", P + "link") : "") +
                  (p.repo ? U.link(p.repo, "Code", P + "link") : "") +
                "</span>" +
              "</li>"
            );
          }).join("") +
        "</ol>" +
        '<div class="' + P + 'showcase">' +
          data.projects.map(function (p, i) {
            var n = (i + 1 < 10 ? "0" : "") + (i + 1);
            return (
              '<article class="' + P + 'show" data-cw-reveal>' +
                '<div class="' + P + 'show-media">' +
                  (p.image
                    ? U.image(p.image, p.name, P + "show-img")
                    : '<span class="' + P + 'show-block" aria-hidden="true">' + n + "</span>") +
                "</div>" +
                '<div class="' + P + 'show-body">' +
                  '<span class="' + P + 'show-num">' + n + "</span>" +
                  '<h3 class="' + P + 'show-title">' + U.esc(p.name) + "</h3>" +
                  (p.description ? '<p class="' + P + 'show-desc">' + U.esc(p.description) + "</p>" : "") +
                "</div>" +
              "</article>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function experience(data) {
    if (!data.has.experience) return "";
    return (
      '<section class="' + P + 'section" id="experience" aria-labelledby="experience-h">' +
        head("experience", "05", "Experience") +
        '<div class="' + P + 'rows">' +
          data.experienceSorted.map(function (e) {
            return (
              '<div class="' + P + 'row" data-cw-reveal>' +
                '<span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
                '<span class="' + P + 'row-main"><strong>' + U.esc(e.role) + "</strong>" +
                  (e.company ? "<em>" + U.esc(e.company) + "</em>" : "") +
                  (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") +
                "</span>" +
              "</div>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function education(data) {
    if (!data.has.education) return "";
    return (
      '<section class="' + P + 'section" id="education" aria-labelledby="education-h">' +
        head("education", "06", "Education") +
        '<div class="' + P + 'rows">' +
          data.education.map(function (e) {
            return (
              '<div class="' + P + 'row" data-cw-reveal>' +
                '<span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
                '<span class="' + P + 'row-main"><strong>' + U.esc(e.degree) + "</strong>" +
                  (e.institution ? "<em>" + U.esc(e.institution) + "</em>" : "") +
                  (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") +
                "</span>" +
              "</div>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function certifications(data) {
    if (!data.has.certificates) return "";
    return (
      '<section class="' + P + 'section" id="certifications" aria-labelledby="certifications-h">' +
        head("certifications", "07", "Certifications") +
        '<ul class="' + P + 'certs">' +
          data.certificates.map(function (c) {
            return (
              '<li class="' + P + 'cert" data-cw-reveal>' +
                '<span class="' + P + 'cert-mark" aria-hidden="true">\u25A0</span>' +
                '<span class="' + P + 'cert-name">' + U.esc(c.name) + "</span>" +
                '<span class="' + P + 'cert-issuer">' + U.esc(c.issuer) + "</span>" +
                '<span class="' + P + 'cert-date">' + U.esc(U.fmtDate(c.date)) + "</span>" +
                (c.verifyUrl ? '<span class="' + P + 'cert-link">' + U.link(c.verifyUrl, "Verify", P + "link") + "</span>" : '<span class="' + P + 'cert-link"></span>') +
              "</li>"
            );
          }).join("") +
        "</ul>" +
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
      '<section class="' + P + 'section ' + P + 'contact" id="contact" aria-labelledby="contact-h">' +
        head("contact", "08", "Contact") +
        '<div class="' + P + 'contact-grid">' +
          '<div data-cw-reveal>' +
            (data.basics.email ? '<a class="' + P + 'mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>" : "") +
            (data.basics.location ? '<p class="' + P + 'contact-loc">' + U.esc(data.basics.location) + "</p>" : "") +
          "</div>" +
          (links.length
            ? '<ul class="' + P + 'contact-links" data-cw-reveal>' + links.map(function (x) {
                return "<li>" + U.link(x[1], x[0], P + "link") + '<span class="' + P + 'contact-url">' + U.esc(U.prettyUrl(x[1])) + "</span></li>";
              }).join("") + "</ul>"
            : "") +
        "</div>" +
        '<footer class="' + P + 'foot">' +
          '<span>' + U.esc(data.basics.fullName || "") + "</span>" +
          '<span>' + U.esc(data.basics.role || "") + "</span>" +
          '<span class="' + P + 'foot-mark" aria-hidden="true"></span>' +
        "</footer>" +
      "</section>"
    );
  }

  CW.templates["template-20"] = {
    id: "template-20",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) + profile(data) + capabilities(data) + projects(data) +
            experience(data) + education(data) + certifications(data) + contact(data) +
          "</main>" +
        "</div>"
      );
    },
    init: function (root) { if (root && CW.anim) CW.anim.reveal(root); }
  };
})();
