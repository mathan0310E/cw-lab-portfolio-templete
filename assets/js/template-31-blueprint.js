/*
 * TEMPLATE 31 — BLUEPRINT
 * Engineering drafting sheet: cyanotype paper, measured grid, dimension lines
 * and an SVG drawing whose strokes plot themselves as it scrolls into view.
 * Namespaced under `cw-blueprint-`.
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-blueprint-";

  /* ---------- illustrations ---------- */

  /**
   * A drafted axonometric assembly: base plate, mast, cross-brace and a
   * dimensioned callout. Strokes carry `pathLength="1"` so the draw-on
   * animation can use a plain unit dash without measuring anything in JS.
   */
  function schematic() {
    var g = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
    return (
      '<svg class="' + P + 'art" viewBox="0 0 400 320" role="img" aria-label="A drafted technical drawing of a component assembly with dimension lines" focusable="false">' +
        '<g ' + g + ' opacity=".45">' +
          '<path d="M40 268 L200 340 L360 268" pathLength="1"/>' +
          '<path d="M40 268 L200 196 L360 268" pathLength="1"/>' +
          '<path d="M200 340 L200 268" pathLength="1"/>' +
          '<path d="M200 268 L200 196" pathLength="1"/>' +
        "</g>" +
        '<g ' + g + '>' +
          '<path class="' + P + 'draw" pathLength="1" d="M120 244 L200 208 L280 244 L200 280 Z"/>' +
          '<path class="' + P + 'draw" pathLength="1" d="M120 244 L120 214 L200 178 L200 208"/>' +
          '<path class="' + P + 'draw" pathLength="1" d="M280 244 L280 214 L200 178"/>' +
          '<path class="' + P + 'draw" pathLength="1" d="M200 178 L200 108"/>' +
          '<path class="' + P + 'draw" pathLength="1" d="M186 108 L214 108"/>' +
          '<path class="' + P + 'draw" pathLength="1" d="M160 196 L240 160"/>' +
        "</g>" +
        '<g ' + g + ' opacity=".7">' +
          '<circle class="' + P + 'draw" pathLength="1" cx="200" cy="108" r="13"/>' +
          '<circle class="' + P + 'draw" pathLength="1" cx="200" cy="108" r="4.5"/>' +
        "</g>" +
        '<g ' + g + ' stroke-dasharray="4 4" opacity=".8">' +
          '<path d="M120 296 L280 296" pathLength="1"/>' +
          '<path d="M120 290 L120 302" pathLength="1"/>' +
          '<path d="M280 290 L280 302" pathLength="1"/>' +
          '<path d="M330 214 L330 244" pathLength="1"/>' +
          '<path d="M324 214 L336 214" pathLength="1"/>' +
          '<path d="M324 244 L336 244" pathLength="1"/>' +
        "</g>" +
        '<g fill="currentColor" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="11" opacity=".85">' +
          '<text x="196" y="312">W = 160</text>' +
          '<text x="342" y="233">H = 30</text>' +
          '<text x="228" y="104">M12 THREAD</text>' +
          '<text x="52" y="72">FIG. 1 \u2014 ASSEMBLY</text>' +
          '<text x="52" y="90">SCALE 1:2 / UNITS MM</text>' +
        "</g>" +
        '<g ' + g + ' opacity=".5">' +
          '<path d="M44 60 L44 130" pathLength="1"/>' +
          '<path d="M44 60 L64 60" pathLength="1"/>' +
          '<path d="M44 130 L64 130" pathLength="1"/>' +
        "</g>" +
      "</svg>"
    );
  }

  /** Corner registration marks, drawn as a drafting-sheet frame. */
  function corners() {
    return (
      '<svg class="' + P + 'corners" viewBox="0 0 120 80" aria-hidden="true" focusable="false">' +
        '<g fill="none" stroke="currentColor" stroke-width="1.4">' +
          '<path d="M2 22 L2 2 L22 2"/><path d="M98 2 L118 2 L118 22"/>' +
          '<path d="M118 58 L118 78 L98 78"/><path d="M22 78 L2 78 L2 58"/>' +
        "</g>" +
      "</svg>"
    );
  }

  /* ---------- sections ---------- */

  function nav(data) {
    var links = [
      ["profile", "Profile"],
      ["capability", "Capability"],
      ["projects", "Projects"],
      ["record", "Record"],
      ["contact", "Contact"]
    ];
    return (
      '<header class="' + P + 'nav" data-cw-nav>' +
        '<a class="' + P + 'brand" href="#top">' +
          '<span class="' + P + 'brand-mark" aria-hidden="true"></span>' +
          '<span class="' + P + 'brand-name">' + U.esc(U.firstName(data.basics.fullName) || "Blueprint") + "</span>" +
        "</a>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l, i) {
            return '<a href="#' + l[0] + '"><span>' + ("0" + (i + 1)).slice(-2) + "</span>" + U.esc(l[1]) + "</a>";
          }).join("") +
        "</nav>" +
        '<button class="' + P + 'nav-toggle" type="button" aria-expanded="false" aria-controls="cw-blueprint-menu">' +
          '<span></span><span></span><span></span>' +
          '<span class="' + P + 'sr">Menu</span>' +
        "</button>" +
      "</header>" +
      '<nav id="cw-blueprint-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l, i) {
          return '<a href="#' + l[0] + '"><span>' + ("0" + (i + 1)).slice(-2) + "</span>" + U.esc(l[1]) + "</a>";
        }).join("") +
      "</nav>"
    );
  }

  function titleBlock(data) {
    var b = data.basics;
    var cells = [
      ["Drawn by", b.fullName || "\u2014"],
      ["Discipline", b.role || "\u2014"],
      ["Sheet", "01 of 01"],
      ["Revision", "A"],
      ["Origin", b.location || "\u2014"],
      ["Date", U.fmtDate(new Date().toISOString().slice(0, 10)) || "\u2014"]
    ];
    return (
      '<section class="' + P + 'hero" id="top">' +
        corners() +
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-copy">' +
            '<p class="' + P + 'kicker" data-cw-reveal>' +
              '<span class="' + P + 'kicker-line" aria-hidden="true"></span>' +
              U.esc(b.role || "Technical portfolio") +
            "</p>" +
            '<h1 class="' + P + 'hero-name" data-cw-reveal>' + (b.fullName ? U.esc(b.fullName) : "Your Name") + "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tagline" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
            '<div class="' + P + 'hero-actions" data-cw-reveal>' +
              (data.has.projects ? '<a class="' + P + 'btn" href="#projects">View drawings</a>' : "") +
              (b.email ? '<a class="' + P + 'btn ' + P + 'btn--ghost" href="mailto:' + U.escUrl(b.email) + '">Request contact</a>' : "") +
            "</div>" +
          "</div>" +
          '<div class="' + P + 'hero-art" data-cw-reveal>' + schematic() + "</div>" +
        "</div>" +
        '<dl class="' + P + 'title-block" data-cw-reveal>' +
          cells.map(function (c) {
            return '<div class="' + P + 'tb-cell"><dt>' + U.esc(c[0]) + "</dt><dd>" + U.esc(c[1]) + "</dd></div>";
          }).join("") +
        "</dl>" +
      "</section>"
    );
  }

  function head(num, title, note) {
    return (
      '<div class="' + P + 'sec-head" data-cw-reveal>' +
        '<span class="' + P + 'sec-num">' + U.esc(num) + "</span>" +
        '<h2 class="' + P + 'sec-title">' + U.esc(title) + "</h2>" +
        (note ? '<span class="' + P + 'sec-note">' + U.esc(note) + "</span>" : "") +
      "</div>"
    );
  }

  function profile(data) {
    var b = data.basics;
    if (!b.bio && !b.profileImage) return "";
    return (
      '<section class="' + P + 'section" id="profile">' +
        head("01", "Profile", "General notes") +
        '<div class="' + P + 'profile-grid">' +
          '<div class="' + P + 'profile-media" data-cw-reveal>' +
            (b.profileImage
              ? U.image(b.profileImage, b.fullName || "Portrait", P + 'profile-photo',
                  '<span class="' + P + 'profile-fallback">' + U.monogram(b.fullName) + "</span>", true)
              : '<span class="' + P + 'profile-fallback">' + U.monogram(b.fullName) + "</span>") +
            '<span class="' + P + 'media-caption">PORTRAIT / REF A-01</span>' +
          "</div>" +
          '<div class="' + P + 'profile-body" data-cw-reveal>' + U.paragraphs(b.bio) + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function capability(data) {
    if (!data.has.skills) return "";
    return (
      '<section class="' + P + 'section" id="capability">' +
        head("02", "Capability schedule", "Measured 0\u2013100") +
        '<div class="' + P + 'cap-grid">' +
          data.skills.map(function (s, i) {
            var lvl = U.skillLevel(s.level);
            return (
              '<div class="' + P + 'cap" data-cw-reveal' + (lvl === null ? "" : ' style="--cw-lvl:' + lvl + '%"') + ">" +
                '<div class="' + P + 'cap-top">' +
                  '<span class="' + P + 'cap-ref">' + U.esc("C" + ("0" + (i + 1)).slice(-2)) + "</span>" +
                  '<span class="' + P + 'cap-name">' + U.esc(s.name) + "</span>" +
                  (lvl === null ? "" : '<span class="' + P + 'cap-val">' + U.esc(String(lvl)) + "</span>") +
                "</div>" +
                (s.category ? '<span class="' + P + 'cap-cat">' + U.esc(s.category) + "</span>" : "") +
                (lvl === null
                  ? ""
                  : '<span class="' + P + 'cap-rule" aria-hidden="true"><span></span></span>' +
                    '<span class="' + P + 'sr">' + U.esc(lvl + " percent") + "</span>") +
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
      '<section class="' + P + 'section" id="projects">' +
        head("03", "Project drawings", data.projects.length + " sheets") +
        '<ol class="' + P + 'sheets">' +
          data.projects.map(function (p, i) {
            var links = [];
            if (p.url) links.push(U.link(p.url, "Deploy", P + 'sheet-link'));
            if (p.repo) links.push(U.link(p.repo, "Repository", P + 'sheet-link'));
            return (
              '<li class="' + P + 'sheet" data-cw-reveal>' +
                '<div class="' + P + 'sheet-frame">' +
                  (p.image
                    ? U.image(p.image, p.name, P + 'sheet-img')
                    : '<span class="' + P + 'sheet-plate" aria-hidden="true">' +
                        '<svg viewBox="0 0 120 80" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1.2">' +
                        '<rect x="6" y="6" width="108" height="68"/><path d="M6 20 H114 M6 60 H114 M30 20 V74 M90 20 V74"/>' +
                        "</g></svg></span>") +
                  '<span class="' + P + 'sheet-no">SHEET ' + U.esc(("0" + (i + 1)).slice(-2)) + "</span>" +
                "</div>" +
                '<div class="' + P + 'sheet-body">' +
                  '<h3 class="' + P + 'sheet-name">' + U.esc(p.name) + "</h3>" +
                  (p.role ? '<p class="' + P + 'sheet-role">' + U.esc(p.role) + "</p>" : "") +
                  (p.description ? '<p class="' + P + 'sheet-desc">' + U.esc(p.description) + "</p>" : "") +
                  (p.technologies.length
                    ? '<ul class="' + P + 'parts">' + p.technologies.map(function (t) {
                        return "<li>" + U.esc(t) + "</li>";
                      }).join("") + "</ul>"
                    : "") +
                  (links.length ? '<div class="' + P + 'sheet-links">' + links.join("") + "</div>" : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ol>" +
      "</section>"
    );
  }

  function record(data) {
    var rows = [];
    data.experience.forEach(function (e) {
      rows.push({ tag: "EXP", title: e.role || e.company, org: e.role ? e.company : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    data.education.forEach(function (e) {
      rows.push({ tag: "EDU", title: e.degree || e.institution, org: e.degree ? e.institution : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    data.certificates.forEach(function (c) {
      rows.push({ tag: "CERT", title: c.name, org: c.issuer || "", when: U.fmtDate(c.date), desc: "", key: U.sortKey(c.date), url: c.verifyUrl });
    });
    if (!rows.length) return "";
    rows.sort(function (a, b) { return b.key - a.key; });
    return (
      '<section class="' + P + 'section" id="record">' +
        head("04", "Record", "Chronological") +
        '<ul class="' + P + 'record">' +
          rows.map(function (r) {
            return (
              '<li class="' + P + 'record-row" data-cw-reveal>' +
                '<span class="' + P + 'record-tag">' + U.esc(r.tag) + "</span>" +
                '<span class="' + P + 'record-when">' + U.esc(r.when || "\u2014") + "</span>" +
                '<div class="' + P + 'record-body">' +
                  '<h3 class="' + P + 'record-title">' + U.esc(r.title) + "</h3>" +
                  (r.org ? '<p class="' + P + 'record-org">' + U.esc(r.org) + "</p>" : "") +
                  (r.desc ? '<p class="' + P + 'record-desc">' + U.esc(r.desc) + "</p>" : "") +
                  (r.url ? U.link(r.url, "Verification", P + 'record-link') : "") +
                "</div>" +
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
        head("05", "Contact", "Issued for review") +
        '<div class="' + P + 'contact-grid">' +
          '<div class="' + P + 'contact-main" data-cw-reveal>' +
            '<p class="' + P + 'contact-lead">' + U.esc(b.tagline || "Open to engineering collaboration.") + "</p>" +
            (b.email ? '<a class="' + P + 'contact-mail" href="mailto:' + U.escUrl(b.email) + '">' + U.esc(b.email) + "</a>" : "") +
            (b.location ? '<p class="' + P + 'contact-loc">' + U.esc(b.location) + "</p>" : "") +
          "</div>" +
          (links.length
            ? '<ul class="' + P + 'contact-links" data-cw-reveal>' + links.map(function (l) {
                return '<li><span class="' + P + 'contact-ref" aria-hidden="true">\u2192</span>' + U.link(l[1], l[0]) + "</li>";
              }).join("") + "</ul>"
            : "") +
        "</div>" +
        '<footer class="' + P + 'foot" data-cw-reveal>' +
          "<span>" + U.esc(b.fullName || "Portfolio") + "</span>" +
          '<span class="' + P + 'foot-mark">Blueprint \u00b7 Sheet 01</span>' +
        "</footer>" +
      "</section>"
    );
  }

  /* ---------- draw-on animation ---------- */

  /**
   * Strokes start hidden and plot themselves when the drawing scrolls in.
   * With reduced motion the drawing is simply shown complete.
   */
  function initDraw(root) {
    var paths = Array.prototype.slice.call(root.querySelectorAll("." + P + "draw"));
    if (!paths.length) return;

    function show() { paths.forEach(function (p) { p.classList.add("is-drawn"); }); }

    if ((CW.anim && CW.anim.prefersReduced && CW.anim.prefersReduced()) || !("IntersectionObserver" in window)) {
      show();
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { show(); io.disconnect(); }
      });
    }, { threshold: 0.25 });
    io.observe(paths[0]);
  }

  /* ---------- module ---------- */

  CW.templates["template-31"] = {
    id: "template-31",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            titleBlock(data) +
            profile(data) +
            capability(data) +
            projects(data) +
            record(data) +
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
      initDraw(root);
    }
  };
})();
