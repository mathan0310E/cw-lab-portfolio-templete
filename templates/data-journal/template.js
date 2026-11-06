/*
 * TEMPLATE 25 — DATA JOURNAL
 * Data-science research and technical storytelling. Navy / white / teal,
 * technical editorial layout, structured project reports with problem,
 * dataset, methodology, technologies and results — rendered only when the user
 * actually supplied those fields. No fabricated statistics.
 * Namespaced: cw-datajournal-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-datajournal-";

  function nav(data) {
    var links = [["about", "About"], ["toolkit", "Toolkit"], ["projects", "Projects"], ["research", "Research"], ["experience", "Experience"], ["education", "Education"], ["certifications", "Certifications"], ["contact", "Contact"]];
    return (
      '<header class="' + P + 'bar">' +
        '<span class="' + P + 'bar-logo" aria-hidden="true">\u25A6</span>' +
        '<span class="' + P + 'bar-name">' + U.esc(data.basics.fullName || "Data Journal") + "</span>" +
        '<nav class="' + P + 'bar-nav" aria-label="Sections">' +
          links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
        "</nav>" +
        '<button class="' + P + 'bar-toggle" type="button" aria-expanded="false" aria-controls="cw-datajournal-menu"><span></span><span></span><span class="' + P + 'sr">Menu</span></button>' +
      "</header>" +
      '<nav id="cw-datajournal-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="top">' +
        '<p class="' + P + 'hero-kicker" data-cw-reveal>' + U.esc(b.role || "Data Science") + "</p>" +
        '<h1 class="' + P + 'hero-name" data-cw-reveal>' + U.esc(b.fullName || "Your Name") + "</h1>" +
        (b.tagline ? '<p class="' + P + 'hero-tag" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
        '<div class="' + P + 'hero-strip" data-cw-reveal aria-hidden="true">' +
          '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>' +
        "</div>" +
      "</section>"
    );
  }

  function section(id, num, title, body) {
    return (
      '<section class="' + P + 'section" id="' + id + '" aria-labelledby="' + id + '-h">' +
        '<div class="' + P + 'sec-head" data-cw-reveal>' +
          '<span class="' + P + 'sec-num">' + num + "</span>" +
          '<h2 class="' + P + 'sec-title" id="' + id + '-h">' + U.esc(title) + "</h2>" +
        "</div>" + body +
      "</section>"
    );
  }

  function about(data) {
    if (!data.basics.bio) return "";
    return section("about", "01", "About", '<div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>");
  }

  function toolkit(data) {
    if (!data.has.skills) return "";
    return section("toolkit", "02", "Technical Toolkit",
      '<div class="' + P + 'toolkit">' +
        data.skillGroups.map(function (g) {
          return '<div class="' + P + 'tool-group" data-cw-reveal><h3>' + U.esc(g.category) + "</h3>" +
            '<ul>' + g.skills.map(function (s) {
              return "<li>" + U.esc(s.name) + (s.level !== null ? '<span class="' + P + 'bar" style="--v:' + s.level + '%" aria-label="' + s.level + '%"></span>' : "") + "</li>";
            }).join("") + "</ul></div>";
        }).join("") +
      "</div>");
  }

  function reportBlock(label, value) {
    if (!value) return "";
    return '<div class="' + P + 'case-field">' +
      '<span class="' + P + 'case-label">' + U.esc(label) + "</span>" +
      '<span class="' + P + 'case-value">' + U.esc(value) + "</span></div>";
  }

  function projects(data) {
    if (!data.has.projects) return "";
    return section("projects", "03", "Data Science Projects",
      '<div class="' + P + 'cases">' +
        data.projects.map(function (p, i) {
          var hasNarrative = p.problem || p.dataset || p.methodology || p.results;
          return (
            '<article class="' + P + 'case" data-cw-reveal>' +
              '<header class="' + P + 'case-head">' +
                '<span class="' + P + 'case-ref">' + String(i + 1).padStart(2, "0") + "</span>" +
                '<h3 class="' + P + 'case-title">' + U.esc(p.name) + "</h3>" +
                (p.year ? '<span class="' + P + 'case-year">' + U.esc(p.year) + "</span>" : "") +
              "</header>" +
              (p.image ? '<div class="' + P + 'case-media">' + U.image(p.image, p.name, P + "case-img") + "</div>" : "") +
              (p.description ? '<p class="' + P + 'case-desc">' + U.esc(p.description) + "</p>" : "") +
              (hasNarrative
                ? '<div class="' + P + 'case-grid">' +
                    reportBlock("Problem", p.problem) +
                    reportBlock("Dataset", p.dataset) +
                    reportBlock("Methodology", p.methodology) +
                    reportBlock("Results", p.results) +
                  "</div>"
                : "") +
              (p.technologies.length
                ? '<div class="' + P + 'case-tech"><span class="' + P + 'case-label">Stack</span><ul>' +
                    p.technologies.map(function (t) { return "<li>" + U.esc(t) + "</li>"; }).join("") + "</ul></div>"
                : "") +
              (p.url || p.repo
                ? '<div class="' + P + 'case-links">' +
                    (p.url ? U.link(p.url, "Project", P + "link") : "") +
                    (p.repo ? U.link(p.repo, "Repository", P + "link") : "") +
                  "</div>"
                : "") +
            "</article>"
          );
        }).join("") +
      "</div>");
  }

  function research(data) {
    if (!data.has.publications && !data.has.writeups) return "";
    var items = data.publications.map(function (p) { return { kind: "Publication", t: p.title, d: p.description, date: p.date, url: p.url }; })
      .concat(data.writeups.map(function (w) { return { kind: "Experiment", t: w.title, d: w.description, date: w.date, url: w.url }; }));
    return section("research", "04", "Research & Experiments",
      '<ul class="' + P + 'research">' +
        items.map(function (it) {
          return '<li class="' + P + 'res-item" data-cw-reveal>' +
            '<span class="' + P + 'res-kind">' + U.esc(it.kind) + "</span>" +
            '<span class="' + P + 'res-body"><strong>' + (it.url ? U.link(it.url, it.t, P + "link") : U.esc(it.t)) + "</strong>" +
              (it.d ? "<span>" + U.esc(it.d) + "</span>" : "") + "</span>" +
            '<span class="' + P + 'res-date">' + U.esc(U.fmtDate(it.date)) + "</span></li>";
        }).join("") +
      "</ul>");
  }

  function timeline(id, num, title, items, kind) {
    if (!items.length) return "";
    return section(id, num, title,
      '<ul class="' + P + 'timeline">' +
        items.map(function (it) {
          var head = kind === "edu" ? it.degree : it.role;
          var sub = kind === "edu" ? it.institution : it.company;
          return '<li class="' + P + 'tl" data-cw-reveal><span class="' + P + 'tl-when">' + U.esc(U.dateRange(it.startDate, it.endDate)) + "</span>" +
            '<span class="' + P + 'tl-body"><strong>' + U.esc(head) + "</strong>" + (sub ? "<em>" + U.esc(sub) + "</em>" : "") +
            (it.description ? "<span>" + U.esc(it.description) + "</span>" : "") + "</span></li>";
        }).join("") +
      "</ul>");
  }

  function certifications(data) {
    if (!data.has.certificates) return "";
    return section("certifications", "07", "Certifications",
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
    return section("contact", "08", "Contact",
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

  CW.templates["template-25"] = {
    id: "template-25",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) + about(data) + toolkit(data) + projects(data) + research(data) +
            timeline("experience", "05", "Experience", data.experienceSorted, "exp") +
            timeline("education", "06", "Education", data.education, "edu") +
            certifications(data) + contact(data) +
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
