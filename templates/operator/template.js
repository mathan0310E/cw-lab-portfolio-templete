/*
 * TEMPLATE 23 — OPERATOR
 * Professional cybersecurity researcher portfolio. Deep charcoal, muted terminal
 * green, monospace technical type, restrained red warning accents, report-style
 * layout. Severity labels, research categories, CTF log, writeup links.
 *
 * NOTE: this template only renders data the user actually supplied. It never
 * invents CVEs, bug-bounty rewards or pentest results.
 * Namespaced: cw-operator-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-operator-";

  function sevClass(sev) {
    var s = String(sev || "").toLowerCase();
    if (s.indexOf("crit") > -1 || s.indexOf("high") > -1) return P + "sev--high";
    if (s.indexOf("med") > -1) return P + "sev--med";
    if (s.indexOf("low") > -1) return P + "sev--low";
    if (s.indexOf("info") > -1) return P + "sev--info";
    return P + "sev--none";
  }

  function bar(data) {
    var links = [["about", "About"], ["arsenal", "Arsenal"], ["projects", "Projects"], ["ctf", "CTF"], ["research", "Research"], ["certifications", "Certs"], ["writeups", "Writeups"], ["contact", "Contact"]];
    return (
      '<header class="' + P + 'bar">' +
        '<span class="' + P + 'bar-prompt" aria-hidden="true">root@cw:~$</span>' +
        '<span class="' + P + 'bar-name">' + U.esc(data.basics.fullName || "portfolio") + "</span>" +
        '<nav class="' + P + 'bar-nav" aria-label="Sections">' +
          links.map(function (l) { return '<a href="#' + l[0] + '">./' + U.esc(l[1].toLowerCase()) + "</a>"; }).join("") +
        "</nav>" +
        '<button class="' + P + 'bar-toggle" type="button" aria-expanded="false" aria-controls="cw-operator-menu"><span></span><span></span><span class="' + P + 'sr">Menu</span></button>' +
      "</header>" +
      '<nav id="cw-operator-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) { return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>"; }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    return (
      '<section class="' + P + 'hero" id="top">' +
        '<div class="' + P + 'hero-left" data-cw-reveal>' +
          '<p class="' + P + 'hero-status"><span class="' + P + 'dot" aria-hidden="true"></span>Security Researcher</p>' +
          '<h1 class="' + P + 'hero-name">' + U.esc(b.fullName || "Your Name") + "</h1>" +
          (b.role ? '<p class="' + P + 'hero-role">' + U.esc(b.role) + "</p>" : "") +
          (b.tagline ? '<p class="' + P + 'hero-tag">' + U.esc(b.tagline) + "</p>" : "") +
          '<div class="' + P + 'hero-actions">' +
            (b.email ? '<a class="' + P + 'btn" href="mailto:' + U.esc(b.email) + '">Contact</a>' : "") +
            (data.links.github ? U.link(data.links.github, "GitHub", P + "btn " + P + "btn--ghost") : "") +
          "</div>" +
        "</div>" +
        '<div class="' + P + 'hero-card" data-cw-reveal>' +
          '<div class="' + P + 'hero-card-head">' + U.monogram(b.fullName) + "</div>" +
          '<dl class="' + P + 'hero-card-list">' +
            (b.location ? "<div><dt>Location</dt><dd>" + U.esc(b.location) + "</dd></div>" : "") +
            (b.email ? "<div><dt>Email</dt><dd>" + U.esc(b.email) + "</dd></div>" : "") +
            "<div><dt>Focus</dt><dd>" + U.esc(b.role || "Security") + "</dd></div>" +
          "</dl>" +
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

  function arsenal(data) {
    var tools = data.skills.filter(function (s) { return /tool|security|system/i.test(s.category || "") || s.level !== null; });
    var list = tools.length ? tools : data.skills;
    if (!list.length) return "";
    return section("arsenal", "02", "Security Arsenal",
      '<div class="' + P + 'arsenal">' +
        list.map(function (s) {
          return (
            '<div class="' + P + 'tool" data-cw-reveal>' +
              '<span class="' + P + 'tool-name">' + U.esc(s.name) + "</span>" +
              (s.category ? '<span class="' + P + 'tool-cat">' + U.esc(s.category) + "</span>" : "") +
              (s.level !== null ? '<span class="' + P + 'tool-lvl">' + s.level + "%</span>" : "") +
            "</div>"
          );
        }).join("") +
      "</div>");
  }

  function projects(data) {
    if (!data.has.projects) return "";
    return section("projects", "03", "Security Projects",
      '<div class="' + P + 'reports">' +
        data.projects.map(function (p, i) {
          var ref = "PRJ-" + String(i + 1).padStart(3, "0");
          return (
            '<article class="' + P + 'report" data-cw-reveal>' +
              '<div class="' + P + 'report-head">' +
                '<span class="' + P + 'report-ref">' + ref + "</span>" +
                (p.severity ? '<span class="' + P + 'sev ' + sevClass(p.severity) + '">' + U.esc(p.severity) + "</span>" : "") +
                (p.category ? '<span class="' + P + 'report-cat">' + U.esc(p.category) + "</span>" : "") +
              "</div>" +
              '<h3 class="' + P + 'report-title">' + U.esc(p.name) + "</h3>" +
              (p.description ? '<p class="' + P + 'report-desc">' + U.esc(p.description) + "</p>" : "") +
              (p.technologies.length ? '<ul class="' + P + 'tags">' + p.technologies.map(function (t) { return "<li>" + U.esc(t) + "</li>"; }).join("") + "</ul>" : "") +
              '<div class="' + P + 'report-links">' +
                (p.repo ? U.link(p.repo, "[source]", P + "link") : "") +
                (p.url ? U.link(p.url, "[live]", P + "link") : "") +
              "</div>" +
            "</article>"
          );
        }).join("") +
      "</div>");
  }

  function ctf(data) {
    if (!data.has.ctf) return "";
    return section("ctf", "04", "CTF Achievements",
      '<ul class="' + P + 'ctf">' +
        data.ctf.map(function (c) {
          return (
            '<li class="' + P + 'ctf-row" data-cw-reveal>' +
              '<span class="' + P + 'ctf-date">' + U.esc(U.fmtDate(c.date) || "----") + "</span>" +
              '<span class="' + P + 'ctf-event">' + U.esc(c.event) + "</span>" +
              (c.placement ? '<span class="' + P + 'ctf-place">' + U.esc(c.placement) + "</span>" : "") +
              (c.category ? '<span class="' + P + 'ctf-cat">' + U.esc(c.category) + "</span>" : "") +
              (c.description ? '<span class="' + P + 'ctf-desc">' + U.esc(c.description) + "</span>" : "") +
            "</li>"
          );
        }).join("") +
      "</ul>");
  }

  function research(data) {
    if (!data.has.achievements && !data.has.publications) return "";
    var items = data.publications.map(function (p) {
      return { kind: "Publication", title: p.title, description: p.description, date: p.date, url: p.url, category: "" };
    }).concat(data.achievements.map(function (a) {
      return { kind: "Recognition", title: a.title, description: a.description, date: a.date, url: "", category: "" };
    }));
    return section("research", "05", "Vulnerability Research & Recognition",
      '<div class="' + P + 'research">' +
        items.map(function (it) {
          return (
            '<article class="' + P + 'entry" data-cw-reveal>' +
              '<div class="' + P + 'entry-head"><span class="' + P + 'entry-kind">' + U.esc(it.kind) + "</span>" +
                (it.date ? '<span class="' + P + 'entry-date">' + U.esc(U.fmtDate(it.date)) + "</span>" : "") + "</div>" +
              '<h3 class="' + P + 'entry-title">' + U.esc(it.title) + "</h3>" +
              (it.description ? '<p class="' + P + 'entry-desc">' + U.esc(it.description) + "</p>" : "") +
              (it.url ? '<p class="' + P + 'entry-link">' + U.link(it.url, "[read]", P + "link") + "</p>" : "") +
            "</article>"
          );
        }).join("") +
      "</div>");
  }

  function certifications(data) {
    if (!data.has.certificates) return "";
    return section("certifications", "06", "Certifications",
      '<ul class="' + P + 'certs">' +
        data.certificates.map(function (c) {
          return (
            '<li class="' + P + 'cert" data-cw-reveal>' +
              '<span class="' + P + 'cert-ok" aria-hidden="true">[OK]</span>' +
              '<span class="' + P + 'cert-name">' + U.esc(c.name) + "</span>" +
              '<span class="' + P + 'cert-issuer">' + U.esc(c.issuer) + "</span>" +
              '<span class="' + P + 'cert-date">' + U.esc(U.fmtDate(c.date)) + "</span>" +
              (c.verifyUrl ? U.link(c.verifyUrl, "[verify]", P + "link") : "") +
            "</li>"
          );
        }).join("") +
      "</ul>");
  }

  function writeups(data) {
    if (!data.has.writeups) return "";
    return section("writeups", "07", "Technical Writeups",
      '<ul class="' + P + 'writeups">' +
        data.writeups.map(function (w) {
          return (
            '<li class="' + P + 'writeup" data-cw-reveal>' +
              '<span class="' + P + 'writeup-date">' + U.esc(U.fmtDate(w.date) || "----") + "</span>" +
              '<span class="' + P + 'writeup-body">' +
                '<strong>' + (w.url ? U.link(w.url, w.title, P + "link") : U.esc(w.title)) + "</strong>" +
                (w.description ? '<span class="' + P + 'writeup-desc">' + U.esc(w.description) + "</span>" : "") +
              "</span>" +
            "</li>"
          );
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

  CW.templates["template-23"] = {
    id: "template-23",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          bar(data) +
          '<main class="' + P + 'main">' +
            hero(data) + about(data) + arsenal(data) + projects(data) + ctf(data) +
            research(data) + certifications(data) + writeups(data) + contact(data) +
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
