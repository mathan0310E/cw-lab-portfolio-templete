/*
 * TEMPLATE 18 — MONOCHROME
 * Swiss minimalism and editorial technology. Black and white only, thin
 * separators, asymmetric grid, large numbered project case studies.
 * All styles are namespaced under `cw-monochrome-`.
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-monochrome-";

  function nav(data) {
    var links = [
      ["about", "About"],
      ["work", "Work"],
      ["skills", "Skills"],
      ["experience", "Experience"],
      ["education", "Education"],
      ["contact", "Contact"]
    ];
    return (
      '<header class="' + P + 'nav" data-cw-nav>' +
        '<a class="' + P + 'brand" href="#top">' +
          '<span class="' + P + 'brand-mark">\u25A0</span>' +
          '<span class="' + P + 'brand-name">' + U.esc(U.firstName(data.basics.fullName) || "Portfolio") + "</span>" +
        "</a>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l, i) {
            return '<a href="#' + l[0] + '"><span class="' + P + 'nav-idx">' + (i + 1 < 10 ? "0" : "") + (i + 1) + "</span>" + U.esc(l[1]) + "</a>";
          }).join("") +
        "</nav>" +
        '<button class="' + P + 'nav-toggle" type="button" aria-expanded="false" aria-controls="cw-monochrome-menu">' +
          '<span></span><span></span><span></span><span class="' + P + 'sr">Menu</span>' +
        "</button>" +
      "</header>" +
      '<nav id="cw-monochrome-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l, i) {
          return '<a href="#' + l[0] + '"><span>' + (i + 1 < 10 ? "0" : "") + (i + 1) + "</span>" + U.esc(l[1]) + "</a>";
        }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    var meta = [
      b.role ? ["Role", b.role] : null,
      b.location ? ["Based", b.location] : null,
      b.email ? ["Contact", b.email] : null
    ].filter(Boolean);
    return (
      '<section class="' + P + 'hero" id="top">' +
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-main">' +
            '<p class="' + P + 'kicker" data-cw-reveal>' + U.esc(b.role || "Portfolio") + "</p>" +
            '<h1 class="' + P + 'hero-name" data-cw-reveal>' +
              (b.fullName ? U.esc(b.fullName) : "Your Name") +
            "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tagline" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
          "</div>" +
          (meta.length
            ? '<dl class="' + P + 'hero-meta" data-cw-reveal>' +
                meta.map(function (m) {
                  return "<div><dt>" + U.esc(m[0]) + "</dt><dd>" + U.esc(m[1]) + "</dd></div>";
                }).join("") +
              "</dl>"
            : "") +
        "</div>" +
        '<div class="' + P + 'hero-rule" aria-hidden="true"></div>' +
      "</section>"
    );
  }

  function about(data) {
    if (!data.basics.bio) return "";
    return (
      '<section class="' + P + 'section" id="about">' +
        '<div class="' + P + 'sec-head" data-cw-reveal>' +
          '<span class="' + P + 'sec-idx">01</span>' +
          '<h2 class="' + P + 'sec-title">About</h2>' +
        "</div>" +
        '<div class="' + P + 'about-grid">' +
          '<div class="' + P + 'about-aside" data-cw-reveal>' +
            (data.basics.profileImage
              ? U.image(data.basics.profileImage, data.basics.fullName || "Portrait", P + "about-photo",
                  '<span class="' + P + 'about-photo-fallback">' + U.monogram(data.basics.fullName) + "</span>", true)
              : '<span class="' + P + 'about-photo-fallback">' + U.monogram(data.basics.fullName) + "</span>") +
            (data.basics.location ? '<p class="' + P + 'about-loc">' + U.esc(data.basics.location) + "</p>" : "") +
          "</div>" +
          '<div class="' + P + 'about-body" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function work(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="work">' +
        '<div class="' + P + 'sec-head" data-cw-reveal>' +
          '<span class="' + P + 'sec-idx">02</span>' +
          '<h2 class="' + P + 'sec-title">Selected Projects</h2>' +
        "</div>" +
        '<ol class="' + P + 'work-list">' +
          data.projects.map(function (p, i) {
            var idx = (i + 1 < 10 ? "0" : "") + (i + 1);
            var links = [
              p.url ? U.link(p.url, "Live", P + "work-link") : "",
              p.repo ? U.link(p.repo, "Source", P + "work-link") : ""
            ].filter(Boolean).join("");
            return (
              '<li class="' + P + 'work-item" data-cw-reveal>' +
                '<div class="' + P + 'work-num" aria-hidden="true">' + idx + "</div>" +
                '<div class="' + P + 'work-body">' +
                  '<h3 class="' + P + 'work-title">' + U.esc(p.name) + "</h3>" +
                  (p.description ? '<p class="' + P + 'work-desc">' + U.esc(p.description) + "</p>" : "") +
                  (p.technologies.length
                    ? '<ul class="' + P + 'work-tech">' + p.technologies.map(function (t) {
                        return "<li>" + U.esc(t) + "</li>";
                      }).join("") + "</ul>"
                    : "") +
                  (links ? '<div class="' + P + 'work-links">' + links + "</div>" : "") +
                "</div>" +
                (p.image
                  ? '<div class="' + P + 'work-media">' +
                      U.image(p.image, p.name, P + "work-img") +
                    "</div>"
                  : "") +
              "</li>"
            );
          }).join("") +
        "</ol>" +
      "</section>"
    );
  }

  function skills(data) {
    if (!data.has.skills) return "";
    return (
      '<section class="' + P + 'section" id="skills">' +
        '<div class="' + P + 'sec-head" data-cw-reveal>' +
          '<span class="' + P + 'sec-idx">03</span>' +
          '<h2 class="' + P + 'sec-title">Technical Skills</h2>' +
        "</div>" +
        '<div class="' + P + 'skills-grid">' +
          data.skillGroups.map(function (g) {
            return (
              '<div class="' + P + 'skill-group" data-cw-reveal>' +
                '<h3 class="' + P + 'skill-cat">' + U.esc(g.category) + "</h3>" +
                '<ul class="' + P + 'skill-list">' +
                  g.skills.map(function (s) {
                    var lvl = s.level;
                    return (
                      '<li class="' + P + 'skill-item">' +
                        '<span class="' + P + 'skill-name">' + U.esc(s.name) + "</span>" +
                        (lvl !== null
                          ? '<span class="' + P + 'skill-meter" role="img" aria-label="' + lvl + '% proficiency">' +
                              '<span style="width:' + lvl + '%"></span></span>'
                          : "") +
                      "</li>"
                    );
                  }).join("") +
                "</ul>" +
              "</div>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function timeline(data) {
    var out = "";
    if (data.has.experience) {
      out +=
        '<section class="' + P + 'section" id="experience">' +
          '<div class="' + P + 'sec-head" data-cw-reveal>' +
            '<span class="' + P + 'sec-idx">04</span>' +
            '<h2 class="' + P + 'sec-title">Experience</h2>' +
          "</div>" +
          '<ul class="' + P + 'exp-list">' +
            data.experienceSorted.map(function (e) {
              return (
                '<li class="' + P + 'exp-item" data-cw-reveal>' +
                  '<div class="' + P + 'exp-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</div>" +
                  '<div class="' + P + 'exp-body">' +
                    '<h3 class="' + P + 'exp-role">' + U.esc(e.role) + "</h3>" +
                    (e.company ? '<p class="' + P + 'exp-org">' + U.esc(e.company) + "</p>" : "") +
                    (e.description ? '<p class="' + P + 'exp-desc">' + U.esc(e.description) + "</p>" : "") +
                  "</div>" +
                "</li>"
              );
            }).join("") +
          "</ul>" +
        "</section>";
    }
    if (data.has.education) {
      out +=
        '<section class="' + P + 'section" id="education">' +
          '<div class="' + P + 'sec-head" data-cw-reveal>' +
            '<span class="' + P + 'sec-idx">05</span>' +
            '<h2 class="' + P + 'sec-title">Education</h2>' +
          "</div>" +
          '<ul class="' + P + 'exp-list">' +
            data.education.map(function (e) {
              return (
                '<li class="' + P + 'exp-item" data-cw-reveal>' +
                  '<div class="' + P + 'exp-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</div>" +
                  '<div class="' + P + 'exp-body">' +
                    '<h3 class="' + P + 'exp-role">' + U.esc(e.degree) + "</h3>" +
                    (e.institution ? '<p class="' + P + 'exp-org">' + U.esc(e.institution) + "</p>" : "") +
                    (e.description ? '<p class="' + P + 'exp-desc">' + U.esc(e.description) + "</p>" : "") +
                  "</div>" +
                "</li>"
              );
            }).join("") +
          "</ul>" +
        "</section>";
    }
    return out;
  }

  function contact(data) {
    var l = data.links;
    var rows = [
      l.github ? ["GitHub", l.github] : null,
      l.linkedin ? ["LinkedIn", l.linkedin] : null,
      l.website ? ["Website", l.website] : null,
      l.twitter ? ["Twitter", l.twitter] : null
    ].filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    return (
      '<section class="' + P + 'section ' + P + 'contact" id="contact">' +
        '<div class="' + P + 'sec-head" data-cw-reveal>' +
          '<span class="' + P + 'sec-idx">06</span>' +
          '<h2 class="' + P + 'sec-title">Contact</h2>' +
        "</div>" +
        '<div class="' + P + 'contact-grid">' +
          '<div data-cw-reveal>' +
            (data.basics.email
              ? '<a class="' + P + 'contact-mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>"
              : "") +
            (data.basics.location ? '<p class="' + P + 'contact-loc">' + U.esc(data.basics.location) + "</p>" : "") +
          "</div>" +
          (rows.length
            ? '<ul class="' + P + 'contact-links" data-cw-reveal>' +
                rows.map(function (r) {
                  return "<li>" + U.link(r[1], r[0], P + "contact-link") +
                    '<span class="' + P + 'contact-url">' + U.esc(U.prettyUrl(r[1])) + "</span></li>";
                }).join("") +
              "</ul>"
            : "") +
        "</div>" +
        '<p class="' + P + 'colophon">' +
          U.esc(data.basics.fullName || "Portfolio") +
          (data.basics.role ? " \u2014 " + U.esc(data.basics.role) : "") +
        "</p>" +
      "</section>"
    );
  }

  CW.templates["template-18"] = {
    id: "template-18",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) +
            about(data) +
            work(data) +
            skills(data) +
            timeline(data) +
            contact(data) +
          "</main>" +
        "</div>"
      );
    },
    init: function (root) {
      if (!root) return;
      var toggle = root.querySelector("." + P + "nav-toggle");
      var menu = root.querySelector("." + P + "menu");
      if (toggle && menu) {
        toggle.addEventListener("click", function () {
          var open = menu.classList.toggle("is-open");
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
          toggle.classList.toggle("is-open", open);
        });
        menu.addEventListener("click", function (e) {
          if (e.target.closest("a")) {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.classList.remove("is-open");
          }
        });
      }
      if (CW.anim) CW.anim.reveal(root);
    }
  };
})();
