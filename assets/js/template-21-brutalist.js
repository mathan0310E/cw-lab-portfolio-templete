/*
 * TEMPLATE 21 — BRUTALIST
 * Contemporary digital brutalism: cobalt, black, off-white; hard 3px borders,
 * zero radius, oversized type, experimental offset composition, project blocks
 * with bold hover inversion. Kept highly legible. Namespaced: cw-brutalist-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-brutalist-";

  function nav(data) {
    var links = [["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["experience", "Experience"], ["achievements", "Achievements"], ["contact", "Contact"]];
    return (
      '<header class="' + P + 'bar">' +
        '<a class="' + P + 'bar-name" href="#top">' + U.esc(data.basics.fullName || "Portfolio") + "</a>" +
        '<nav class="' + P + 'bar-nav" aria-label="Sections">' +
          links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
        "</nav>" +
        '<button class="' + P + 'bar-toggle" type="button" aria-expanded="false" aria-controls="cw-brutalist-menu"><span></span><span></span><span class="' + P + 'sr">Menu</span></button>' +
      "</header>" +
      '<nav id="cw-brutalist-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="top">' +
        '<div class="' + P + 'hero-slab" data-cw-reveal>' +
          '<p class="' + P + 'hero-role">' + U.esc(b.role || "Portfolio") + "</p>" +
          '<h1 class="' + P + 'hero-name">' + U.esc(b.fullName || "Your Name") + "</h1>" +
          (b.tagline ? '<p class="' + P + 'hero-tag">' + U.esc(b.tagline) + "</p>" : "") +
          '<div class="' + P + 'hero-actions">' +
            (b.email ? '<a class="' + P + 'btn" href="mailto:' + U.esc(b.email) + '">Hire me</a>' : "") +
            (data.has.projects ? '<a class="' + P + 'btn ' + P + 'btn--alt" href="#projects">See work</a>' : "") +
          "</div>" +
        "</div>" +
        '<div class="' + P + 'hero-tile" data-cw-reveal>' +
          (b.profileImage
            ? U.image(b.profileImage, b.fullName || "Portrait", P + "hero-img",
                '<span class="' + P + 'hero-fallback">' + U.monogram(b.fullName) + "</span>", true)
            : '<span class="' + P + 'hero-fallback">' + U.monogram(b.fullName) + "</span>") +
          (b.location ? '<span class="' + P + 'hero-loc">' + U.esc(b.location) + "</span>" : "") +
        "</div>" +
      "</section>"
    );
  }

  function about(data) {
    if (!data.basics.bio) return "";
    return (
      '<section class="' + P + 'section" id="about">' +
        '<h2 class="' + P + 'h2"><span aria-hidden="true">[</span>About<span aria-hidden="true">]</span></h2>' +
        '<div class="' + P + 'about" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>" +
      "</section>"
    );
  }

  function skills(data) {
    if (!data.has.skills) return "";
    return (
      '<section class="' + P + 'section" id="skills">' +
        '<h2 class="' + P + 'h2"><span aria-hidden="true">[</span>Skills<span aria-hidden="true">]</span></h2>' +
        '<ul class="' + P + 'chips">' +
          data.skills.map(function (s) {
            return '<li class="' + P + 'chip" data-cw-reveal>' + U.esc(s.name) +
              (s.level !== null ? '<span class="' + P + 'chip-lvl">' + s.level + "</span>" : "") + "</li>";
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function projects(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="projects">' +
        '<h2 class="' + P + 'h2"><span aria-hidden="true">[</span>Projects<span aria-hidden="true">]</span></h2>' +
        '<div class="' + P + 'blocks">' +
          data.projects.map(function (p, i) {
            return (
              '<article class="' + P + 'block" data-cw-reveal>' +
                '<span class="' + P + 'block-idx" aria-hidden="true">' + String(i + 1).padStart(2, "0") + "</span>" +
                '<div class="' + P + 'block-media">' +
                  (p.image
                    ? U.image(p.image, p.name, P + "block-img")
                    : '<span class="' + P + 'block-plate" aria-hidden="true">' + U.esc((p.name || "?").charAt(0)) + "</span>") +
                "</div>" +
                '<div class="' + P + 'block-body">' +
                  '<h3 class="' + P + 'block-title">' + U.esc(p.name) + "</h3>" +
                  (p.description ? '<p class="' + P + 'block-desc">' + U.esc(p.description) + "</p>" : "") +
                  (p.technologies.length ? '<ul class="' + P + 'tags">' + p.technologies.map(function (t) { return "<li>" + U.esc(t) + "</li>"; }).join("") + "</ul>" : "") +
                  '<div class="' + P + 'block-links">' +
                    (p.url ? U.link(p.url, "Visit", P + "btn " + P + "btn--alt") : "") +
                    (p.repo ? U.link(p.repo, "Source", P + "btn " + P + "btn--alt") : "") +
                  "</div>" +
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
      '<section class="' + P + 'section" id="experience">' +
        '<h2 class="' + P + 'h2"><span aria-hidden="true">[</span>Experience<span aria-hidden="true">]</span></h2>' +
        '<div class="' + P + 'rows">' +
          data.experienceSorted.map(function (e) {
            return (
              '<div class="' + P + 'row" data-cw-reveal>' +
                '<span class="' + P + 'row-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
                '<span class="' + P + 'row-body"><strong>' + U.esc(e.role) + "</strong>" +
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

  function achievements(data) {
    if (!data.has.achievements) return "";
    return (
      '<section class="' + P + 'section" id="achievements">' +
        '<h2 class="' + P + 'h2"><span aria-hidden="true">[</span>Achievements<span aria-hidden="true">]</span></h2>' +
        '<ul class="' + P + 'awards">' +
          data.achievements.map(function (a) {
            return '<li class="' + P + 'award" data-cw-reveal><strong>' + U.esc(a.title) + "</strong>" +
              (a.date ? '<span class="' + P + 'award-date">' + U.esc(U.fmtDate(a.date)) + "</span>" : "") +
              (a.description ? "<span>" + U.esc(a.description) + "</span>" : "") + "</li>";
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
      '<section class="' + P + 'section ' + P + 'contact" id="contact">' +
        '<h2 class="' + P + 'h2"><span aria-hidden="true">[</span>Contact<span aria-hidden="true">]</span></h2>' +
        '<div class="' + P + 'contact-inner">' +
          '<div data-cw-reveal>' +
            (data.basics.email ? '<a class="' + P + 'mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>" : "") +
            (data.basics.location ? '<p class="' + P + 'contact-loc">' + U.esc(data.basics.location) + "</p>" : "") +
          "</div>" +
          (links.length ? '<ul class="' + P + 'contact-list" data-cw-reveal>' + links.map(function (x) {
            return "<li>" + U.link(x[1], x[0], P + "link") + "</li>";
          }).join("") + "</ul>" : "") +
        "</div>" +
      "</section>"
    );
  }

  CW.templates["template-21"] = {
    id: "template-21",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) + about(data) + skills(data) + projects(data) +
            experience(data) + achievements(data) + contact(data) +
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
