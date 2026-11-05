/*
 * TEMPLATE 28 — PRISM
 * Animated aurora gradients, a refraction illustration and restrained motion.
 * Deep-ink canvas with a teal/violet/amber spectrum. All styles are namespaced
 * under `cw-prism-`.
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-prism-";

  /* ---------- illustrations ---------- */

  /**
   * The hero prism: an incoming beam that refracts into a spectrum fan. The
   * beams animate in CSS, so the illustration breathes without JS.
   */
  function prismArt() {
    return (
      '<svg class="' + P + 'art" viewBox="0 0 420 340" role="img" aria-label="A light beam refracting through a prism into a spectrum" focusable="false">' +
        "<defs>" +
          '<linearGradient id="cwPrismSpectrum" x1="0" y1="0" x2="1" y2="0">' +
            '<stop offset="0%" stop-color="#35d0ba"/>' +
            '<stop offset="45%" stop-color="#7c6cf0"/>' +
            '<stop offset="100%" stop-color="#ffb020"/>' +
          "</linearGradient>" +
          '<linearGradient id="cwPrismGlass" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0%" stop-color="#ffffff" stop-opacity=".22"/>' +
            '<stop offset="100%" stop-color="#ffffff" stop-opacity=".04"/>' +
          "</linearGradient>" +
        "</defs>" +
        '<circle class="' + P + 'art-orbit" cx="210" cy="170" r="132" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1" stroke-dasharray="3 7"/>' +
        '<circle class="' + P + 'art-orbit ' + P + 'art-orbit--slow" cx="210" cy="170" r="104" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="1"/>' +
        '<path class="' + P + 'art-beam" d="M8 196 H168" stroke="#f4f6fb" stroke-width="2" stroke-linecap="round"/>' +
        '<g class="' + P + 'art-fan">' +
          '<path d="M214 176 L410 92" stroke="url(#cwPrismSpectrum)" stroke-width="3" stroke-linecap="round"/>' +
          '<path d="M214 176 L410 132" stroke="url(#cwPrismSpectrum)" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>' +
          '<path d="M214 176 L410 172" stroke="url(#cwPrismSpectrum)" stroke-width="2" stroke-linecap="round" opacity=".7"/>' +
          '<path d="M214 176 L410 212" stroke="url(#cwPrismSpectrum)" stroke-width="1.7" stroke-linecap="round" opacity=".55"/>' +
          '<path d="M214 176 L410 252" stroke="url(#cwPrismSpectrum)" stroke-width="1.4" stroke-linecap="round" opacity=".4"/>' +
        "</g>" +
        '<path d="M210 96 L288 232 L132 232 Z" fill="url(#cwPrismGlass)" stroke="#f4f6fb" stroke-width="1.6" stroke-linejoin="round"/>' +
        '<path d="M210 96 L132 232" stroke="rgba(255,255,255,.35)" stroke-width="1"/>' +
        '<circle class="' + P + 'art-spark" cx="210" cy="176" r="3.4" fill="#f4f6fb"/>' +
      "</svg>"
    );
  }

  /** Small geometric ornament used to break up section headers. */
  function tick() {
    return (
      '<svg class="' + P + 'tick" viewBox="0 0 44 12" aria-hidden="true" focusable="false">' +
        '<path d="M1 11 L11 1 M12 11 L22 1 M23 11 L33 1 M34 11 L44 1" stroke="currentColor" stroke-width="1.4" fill="none"/>' +
      "</svg>"
    );
  }

  /* ---------- sections ---------- */

  function nav(data) {
    var links = [
      ["about", "About"],
      ["work", "Work"],
      ["skills", "Skills"],
      ["experience", "Experience"],
      ["contact", "Contact"]
    ];
    return (
      '<header class="' + P + 'nav" data-cw-nav>' +
        '<a class="' + P + 'brand" href="#top">' +
          '<span class="' + P + 'brand-mark" aria-hidden="true"></span>' +
          '<span class="' + P + 'brand-name">' + U.esc(U.firstName(data.basics.fullName) || "Portfolio") + "</span>" +
        "</a>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l) {
            return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
          }).join("") +
        "</nav>" +
        '<button class="' + P + 'nav-toggle" type="button" aria-expanded="false" aria-controls="cw-prism-menu">' +
          '<span></span><span></span><span></span>' +
          '<span class="' + P + 'sr">Menu</span>' +
        "</button>" +
      "</header>" +
      '<nav id="cw-prism-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) {
          return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
        }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="top">' +
        '<div class="' + P + 'aurora" aria-hidden="true"><span></span><span></span><span></span></div>' +
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-copy">' +
            (b.role ? '<p class="' + P + 'kicker" data-cw-reveal>' + U.esc(b.role) + "</p>" : "") +
            '<h1 class="' + P + 'hero-name" data-cw-reveal>' + (b.fullName ? U.esc(b.fullName) : "Your Name") + "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tagline" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
            '<div class="' + P + 'hero-actions" data-cw-reveal>' +
              (data.has.projects ? '<a class="' + P + 'btn" href="#work">See selected work</a>' : "") +
              (b.email ? '<a class="' + P + 'btn ' + P + 'btn--ghost" href="mailto:' + U.escUrl(b.email) + '">Get in touch</a>' : "") +
            "</div>" +
          "</div>" +
          '<div class="' + P + 'hero-art" data-cw-reveal data-cw-parallax>' + prismArt() + "</div>" +
        "</div>" +
        '<div class="' + P + 'hero-meta" data-cw-reveal>' +
          (b.location ? '<span><em>Based in</em>' + U.esc(b.location) + "</span>" : "") +
          (b.email ? '<span><em>Email</em><a href="mailto:' + U.escUrl(b.email) + '">' + U.esc(b.email) + "</a></span>" : "") +
          (data.links.github ? '<span><em>GitHub</em>' + U.link(data.links.github, U.prettyUrl(data.links.github)) + "</span>" : "") +
        "</div>" +
      "</section>"
    );
  }

  function sectionHead(index, title) {
    return (
      '<div class="' + P + 'sec-head" data-cw-reveal>' +
        '<span class="' + P + 'sec-index">' + U.esc(index) + "</span>" +
        '<h2 class="' + P + 'sec-title">' + U.esc(title) + "</h2>" +
        tick() +
      "</div>"
    );
  }

  function about(data) {
    var b = data.basics;
    var facts = [
      b.location ? ["Location", b.location] : null,
      b.email ? ["Email", b.email] : null,
      data.has.experience ? ["Experience", data.experience.length + (data.experience.length === 1 ? " role" : " roles")] : null,
      data.has.projects ? ["Projects", String(data.projects.length)] : null
    ].filter(Boolean);

    if (!b.bio && !facts.length && !b.profileImage) return "";

    return (
      '<section class="' + P + 'section" id="about">' +
        sectionHead("01", "About") +
        '<div class="' + P + 'about-grid">' +
          '<div class="' + P + 'about-aside" data-cw-reveal>' +
            (b.profileImage
              ? U.image(b.profileImage, b.fullName || "Portrait", P + "about-photo",
                  '<span class="' + P + 'about-photo-fallback">' + U.monogram(b.fullName) + "</span>", true)
              : '<span class="' + P + 'about-photo-fallback">' + U.monogram(b.fullName) + "</span>") +
          "</div>" +
          '<div class="' + P + 'about-body" data-cw-reveal>' +
            (b.bio ? U.paragraphs(b.bio) : "") +
            (facts.length
              ? '<dl class="' + P + 'facts">' + facts.map(function (f) {
                  return "<div><dt>" + U.esc(f[0]) + "</dt><dd>" + U.esc(f[1]) + "</dd></div>";
                }).join("") + "</dl>"
              : "") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function work(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="work">' +
        sectionHead("02", "Selected work") +
        '<ol class="' + P + 'work">' +
          data.projects.map(function (p, i) {
            var links = [];
            if (p.url) links.push(U.link(p.url, "Live", P + "work-link"));
            if (p.repo) links.push(U.link(p.repo, "Source", P + "work-link"));
            var idx = ("0" + (i + 1)).slice(-2);
            return (
              '<li class="' + P + 'work-item" data-cw-reveal>' +
                '<div class="' + P + 'work-media">' +
                  (p.image
                    ? U.image(p.image, p.name, P + "work-img")
                    : '<span class="' + P + 'work-plate" aria-hidden="true"><span>' + U.esc(idx) + "</span></span>") +
                "</div>" +
                '<div class="' + P + 'work-body">' +
                  '<div class="' + P + 'work-top">' +
                    '<span class="' + P + 'work-idx">' + U.esc(idx) + "</span>" +
                    (p.category ? '<span class="' + P + 'work-tag">' + U.esc(p.category) + "</span>" : "") +
                  "</div>" +
                  '<h3 class="' + P + 'work-name">' + U.esc(p.name) + "</h3>" +
                  (p.description ? '<p class="' + P + 'work-desc">' + U.esc(p.description) + "</p>" : "") +
                  (p.technologies.length
                    ? '<ul class="' + P + 'chips">' + p.technologies.map(function (t) {
                        return "<li>" + U.esc(t) + "</li>";
                      }).join("") + "</ul>"
                    : "") +
                  (links.length ? '<div class="' + P + 'work-links">' + links.join("") + "</div>" : "") +
                "</div>" +
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
        sectionHead("03", "Technical skills") +
        '<ul class="' + P + 'skills">' +
          data.skills.map(function (s) {
            var lvl = U.skillLevel(s.level);
            return (
              '<li class="' + P + 'skill" data-cw-reveal' + (lvl === null ? "" : ' style="--cw-lvl:' + lvl + '%"') + ">" +
                '<span class="' + P + 'skill-name">' + U.esc(s.name) + "</span>" +
                (s.category ? '<span class="' + P + 'skill-cat">' + U.esc(s.category) + "</span>" : "") +
                (lvl === null
                  ? ""
                  : '<span class="' + P + 'skill-track" aria-hidden="true"><span class="' + P + 'skill-fill"></span></span>' +
                    '<span class="' + P + 'sr">' + U.esc(lvl + " percent") + "</span>") +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function timeline(data) {
    var rows = [];
    data.experience.forEach(function (e) {
      rows.push({
        kind: "Role",
        title: e.role || e.company,
        org: e.role ? e.company : "",
        when: U.dateRange(e.startDate, e.endDate),
        desc: e.description,
        key: U.sortKey(e.startDate)
      });
    });
    data.education.forEach(function (e) {
      rows.push({
        kind: "Study",
        title: e.degree || e.institution,
        org: e.degree ? e.institution : "",
        when: U.dateRange(e.startDate, e.endDate),
        desc: e.description,
        key: U.sortKey(e.startDate)
      });
    });
    if (!rows.length) return "";
    rows.sort(function (a, b) { return b.key - a.key; });

    return (
      '<section class="' + P + 'section" id="experience">' +
        sectionHead("04", "Experience & education") +
        '<ol class="' + P + 'timeline">' +
          rows.map(function (r) {
            return (
              '<li class="' + P + 'tl-item" data-cw-reveal>' +
                '<span class="' + P + 'tl-node" aria-hidden="true"></span>' +
                '<div class="' + P + 'tl-meta">' +
                  '<span class="' + P + 'tl-kind">' + U.esc(r.kind) + "</span>" +
                  (r.when ? '<span class="' + P + 'tl-when">' + U.esc(r.when) + "</span>" : "") +
                "</div>" +
                '<div class="' + P + 'tl-body">' +
                  '<h3 class="' + P + 'tl-title">' + U.esc(r.title) + "</h3>" +
                  (r.org ? '<p class="' + P + 'tl-org">' + U.esc(r.org) + "</p>" : "") +
                  (r.desc ? '<p class="' + P + 'tl-desc">' + U.esc(r.desc) + "</p>" : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ol>" +
      "</section>"
    );
  }

  function certs(data) {
    if (!data.has.certificates) return "";
    return (
      '<section class="' + P + 'section" id="certificates">' +
        sectionHead("05", "Certificates") +
        '<ul class="' + P + 'certs">' +
          data.certificates.map(function (c) {
            return (
              '<li class="' + P + 'cert" data-cw-reveal>' +
                '<h3 class="' + P + 'cert-name">' + U.esc(c.name) + "</h3>" +
                '<p class="' + P + 'cert-issuer">' + U.esc([c.issuer, U.fmtDate(c.date)].filter(Boolean).join(" \u00b7 ")) + "</p>" +
                (c.verifyUrl ? U.link(c.verifyUrl, "Verify credential", P + "cert-link") : "") +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function contact(data) {
    var b = data.basics;
    var links = [];
    if (data.links.github) links.push(["GitHub", data.links.github]);
    if (data.links.linkedin) links.push(["LinkedIn", data.links.linkedin]);
    if (data.links.website) links.push(["Website", data.links.website]);
    if (data.links.twitter) links.push(["Twitter", data.links.twitter]);
    data.links.other.forEach(function (o) { links.push([o.label, o.url]); });

    return (
      '<section class="' + P + 'section ' + P + 'contact" id="contact">' +
        '<div class="' + P + 'aurora ' + P + 'aurora--foot" aria-hidden="true"><span></span><span></span></div>' +
        sectionHead("06", "Contact") +
        '<div class="' + P + 'contact-grid">' +
          '<div class="' + P + 'contact-main" data-cw-reveal>' +
            '<p class="' + P + 'contact-lead">' +
              U.esc(b.tagline || "Available for collaboration and interesting problems.") +
            "</p>" +
            (b.email
              ? '<a class="' + P + 'contact-mail" href="mailto:' + U.escUrl(b.email) + '">' + U.esc(b.email) + "</a>"
              : "") +
          "</div>" +
          (links.length
            ? '<ul class="' + P + 'contact-links" data-cw-reveal>' +
                links.map(function (l) {
                  return "<li>" + U.link(l[1], l[0]) + "</li>";
                }).join("") +
              "</ul>"
            : "") +
        "</div>" +
        '<footer class="' + P + 'foot" data-cw-reveal>' +
          "<span>" + U.esc(b.fullName || "Portfolio") + "</span>" +
          '<span class="' + P + 'foot-mark" aria-hidden="true">Prism</span>' +
        "</footer>" +
      "</section>"
    );
  }

  /* ---------- module ---------- */

  CW.templates["template-28"] = {
    id: "template-28",
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
            certs(data) +
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

      // Subtle pointer parallax on the hero illustration.
      var reduced = CW.anim && CW.anim.prefersReduced && CW.anim.prefersReduced();
      var art = root.querySelector("[data-cw-parallax]");
      if (art && !reduced && window.requestAnimationFrame) {
        var raf = 0, px = 0, py = 0;
        root.addEventListener("mousemove", function (e) {
          var r = root.getBoundingClientRect();
          px = ((e.clientX - r.left) / r.width - 0.5) * 2;
          py = ((e.clientY - r.top) / r.height - 0.5) * 2;
          if (!raf) {
            raf = window.requestAnimationFrame(function () {
              art.style.setProperty("--cw-px", px.toFixed(3));
              art.style.setProperty("--cw-py", py.toFixed(3));
              raf = 0;
            });
          }
        });
        root.addEventListener("mouseleave", function () {
          art.style.setProperty("--cw-px", "0");
          art.style.setProperty("--cw-py", "0");
        });
      }
    }
  };
})();
