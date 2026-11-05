/*
 * TEMPLATE 33 — SENTINEL
 * Security operations centre: a monitoring HUD with a sweeping radar, a live
 * telemetry strip and status readouts. Deep-space navy with cyan, mint and
 * amber alert accents. Namespaced under `cw-sentinel-`.
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-sentinel-";

  /* ---------- illustrations ---------- */

  /** Radar scope: concentric rings, cross-hairs, a sweeping wedge and blips. */
  function radar() {
    return (
      '<svg class="' + P + 'radar" viewBox="0 0 300 300" role="img" aria-label="A radar scope sweeping across contact blips" focusable="false">' +
        '<defs>' +
          '<linearGradient id="cwSentinelSweep" x1="0" y1="0" x2="1" y2="0">' +
            '<stop offset="0%" stop-color="#22d3ee" stop-opacity="0.55"/>' +
            '<stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>' +
          "</linearGradient>" +
        "</defs>" +
        '<g class="' + P + 'radar-grid" fill="none" stroke="#22d3ee" stroke-width="1" opacity=".28">' +
          '<circle cx="150" cy="150" r="130"/><circle cx="150" cy="150" r="98"/>' +
          '<circle cx="150" cy="150" r="66"/><circle cx="150" cy="150" r="34"/>' +
          '<path d="M150 20 V280 M20 150 H280"/>' +
          '<path d="M58 58 L242 242 M242 58 L58 242" stroke-dasharray="3 6"/>' +
        "</g>" +
        '<g class="' + P + 'radar-sweep">' +
          '<path d="M150 150 L150 20 A130 130 0 0 1 268 116 Z" fill="url(#cwSentinelSweep)"/>' +
          '<path d="M150 150 L150 20" stroke="#22d3ee" stroke-width="1.6"/>' +
        "</g>" +
        '<g class="' + P + 'radar-blips">' +
          '<circle class="' + P + 'blip" cx="206" cy="102" r="4"/>' +
          '<circle class="' + P + 'blip ' + P + 'blip--b" cx="96" cy="188" r="3.2"/>' +
          '<circle class="' + P + 'blip ' + P + 'blip--c" cx="182" cy="216" r="3.6"/>' +
          '<circle class="' + P + 'blip ' + P + 'blip--d" cx="112" cy="88" r="2.8"/>' +
        "</g>" +
        '<circle cx="150" cy="150" r="5" fill="#22d3ee"/>' +
        '<circle cx="150" cy="150" r="11" fill="none" stroke="#22d3ee" stroke-width="1" opacity=".5"/>' +
      "</svg>"
    );
  }

  /** Decorative equaliser bars representing a live telemetry feed. */
  function telemetry(count) {
    var bars = "";
    for (var i = 0; i < count; i++) {
      bars += '<span style="--cw-s:' + (0.24 + ((i * 37) % 70) / 100).toFixed(2) +
        ";--cw-d:" + ((i * 13) % 90) / 100 + 's"></span>';
    }
    return '<div class="' + P + 'telemetry" aria-hidden="true">' + bars + "</div>";
  }

  function hexShield() {
    return (
      '<svg class="' + P + 'mark" viewBox="0 0 40 44" aria-hidden="true" focusable="false">' +
        '<path d="M20 3 L35 9 V23 C35 32 28 38 20 41 C12 38 5 32 5 23 V9 Z" fill="none" stroke="currentColor" stroke-width="1.7"/>' +
        '<path d="M20 13 L20 26 M15 19 L25 19" stroke="currentColor" stroke-width="1.5"/>' +
        '<circle cx="20" cy="19" r="6.5" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".6"/>' +
      "</svg>"
    );
  }

  /* ---------- sections ---------- */

  function nav(data) {
    var links = [
      ["about", "Analyst"],
      ["arsenal", "Arsenal"],
      ["detections", "Detections"],
      ["operations", "Operations"],
      ["contact", "Contact"]
    ];
    return (
      '<header class="' + P + 'nav" data-cw-nav>' +
        '<a class="' + P + 'brand" href="#top">' +
          '<span class="' + P + 'brand-dot" aria-hidden="true"></span>' +
          '<span class="' + P + 'brand-name">' + U.esc(U.firstName(data.basics.fullName) || "Sentinel") + "</span>" +
        "</a>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l) {
            return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
          }).join("") +
        "</nav>" +
        '<button class="' + P + 'nav-toggle" type="button" aria-expanded="false" aria-controls="cw-sentinel-menu">' +
          '<span></span><span></span><span></span>' +
          '<span class="' + P + 'sr">Menu</span>' +
        "</button>" +
      "</header>" +
      '<nav id="cw-sentinel-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) {
          return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
        }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    var status = [
      b.role ? ["Role", b.role] : null,
      b.location ? ["Station", b.location] : null,
      data.has.projects ? ["Detections", String(data.projects.length)] : null,
      data.has.ctf ? ["CTF entries", String(data.ctf.length)] : null
    ].filter(Boolean);

    return (
      '<section class="' + P + 'hero" id="top">' +
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-copy">' +
            '<p class="' + P + 'kicker" data-cw-reveal>' +
              hexShield() +
              '<span class="' + P + 'kicker-text">' + U.esc(b.role || "Security operations") + "</span>" +
              '<span class="' + P + 'kicker-live"><span class="' + P + 'pulse" aria-hidden="true"></span>online</span>' +
            "</p>" +
            '<h1 class="' + P + 'hero-name" data-cw-reveal>' + (b.fullName ? U.esc(b.fullName) : "Your Name") + "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tagline" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
            '<div class="' + P + 'hero-actions" data-cw-reveal>' +
              (data.has.projects ? '<a class="' + P + 'btn" href="#detections">Review detections</a>' : "") +
              (b.email ? '<a class="' + P + 'btn ' + P + 'btn--ghost" href="mailto:' + U.escUrl(b.email) + '">Open a channel</a>' : "") +
            "</div>" +
          "</div>" +
          '<div class="' + P + 'console" data-cw-reveal>' +
            '<div class="' + P + 'console-bar">' +
              '<span class="' + P + 'console-title">SCOPE / SECTOR 04</span>' +
              '<span class="' + P + 'console-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
            "</div>" +
            '<div class="' + P + 'console-body">' + radar() + "</div>" +
            '<div class="' + P + 'console-foot">' +
              '<span class="' + P + 'console-label">SIGNAL</span>' +
              telemetry(22) +
              '<span class="' + P + 'console-label">NOMINAL</span>' +
            "</div>" +
          "</div>" +
        "</div>" +
        (status.length
          ? '<dl class="' + P + 'readouts" data-cw-reveal>' + status.map(function (s) {
              return '<div><dt>' + U.esc(s[0]) + "</dt><dd>" + U.esc(s[1]) + "</dd></div>";
            }).join("") + "</dl>"
          : "") +
      "</section>"
    );
  }

  function head(num, title, tag) {
    return (
      '<div class="' + P + 'sec-head" data-cw-reveal>' +
        '<span class="' + P + 'sec-num">' + U.esc(num) + "</span>" +
        '<h2 class="' + P + 'sec-title">' + U.esc(title) + "</h2>" +
        (tag ? '<span class="' + P + 'sec-tag">' + U.esc(tag) + "</span>" : "") +
      "</div>"
    );
  }

  function about(data) {
    var b = data.basics;
    if (!b.bio && !b.profileImage) return "";
    return (
      '<section class="' + P + 'section" id="about">' +
        head("01", "Analyst profile", "BIO") +
        '<div class="' + P + 'about-grid">' +
          '<div class="' + P + 'about-media" data-cw-reveal>' +
            '<div class="' + P + 'media-frame">' +
              (b.profileImage
                ? U.image(b.profileImage, b.fullName || "Portrait", P + 'about-photo',
                    '<span class="' + P + 'about-fallback">' + U.monogram(b.fullName) + "</span>", true)
                : '<span class="' + P + 'about-fallback">' + U.monogram(b.fullName) + "</span>") +
              '<span class="' + P + 'media-scan" aria-hidden="true"></span>' +
              '<span class="' + P + 'media-corner ' + P + 'media-corner--tl" aria-hidden="true"></span>' +
              '<span class="' + P + 'media-corner ' + P + 'media-corner--br" aria-hidden="true"></span>' +
            "</div>" +
            '<span class="' + P + 'media-id">ID / ' + U.esc((b.fullName || "UNKNOWN").toUpperCase().slice(0, 18)) + "</span>" +
          "</div>" +
          '<div class="' + P + 'about-body" data-cw-reveal>' + U.paragraphs(b.bio) + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function arsenal(data) {
    if (!data.has.skills) return "";
    var groups = {};
    data.skills.forEach(function (s) {
      var k = s.category || "General";
      (groups[k] = groups[k] || []).push(s);
    });
    return (
      '<section class="' + P + 'section" id="arsenal">' +
        head("02", "Security arsenal", "TOOLING") +
        '<div class="' + P + 'arsenal-grid">' +
          Object.keys(groups).map(function (k, gi) {
            return (
              '<div class="' + P + 'arsenal-card" data-cw-reveal>' +
                '<div class="' + P + 'arsenal-head">' +
                  '<span class="' + P + 'arsenal-dot" aria-hidden="true"></span>' +
                  '<h3 class="' + P + 'arsenal-cat">' + U.esc(k) + "</h3>" +
                  '<span class="' + P + 'arsenal-count">' + U.esc(String(groups[k].length).padStart(2, "0")) + "</span>" +
                "</div>" +
                '<ul class="' + P + 'arsenal-list">' +
                  groups[k].map(function (s, i) {
                    var lvl = U.skillLevel(s.level);
                    return (
                      '<li' + (lvl === null ? "" : ' style="--cw-lvl:' + lvl + '%"') + ">" +
                        '<span class="' + P + 'arsenal-name">' + U.esc(s.name) + "</span>" +
                        (lvl === null
                          ? ""
                          : '<span class="' + P + 'arsenal-bar" aria-hidden="true"><span></span></span>' +
                            '<span class="' + P + 'arsenal-val">' + U.esc(String(lvl)) + "</span>" +
                            '<span class="' + P + 'sr">' + U.esc(lvl + " percent") + "</span>") +
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

  function detections(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="detections">' +
        head("03", "Detections & projects", "ACTIVE") +
        '<ul class="' + P + 'dets">' +
          data.projects.map(function (p, i) {
            var links = [];
            if (p.url) links.push(U.link(p.url, "Details", P + 'det-link'));
            if (p.repo) links.push(U.link(p.repo, "Repository", P + 'det-link'));
            return (
              '<li class="' + P + 'det" data-cw-reveal>' +
                '<div class="' + P + 'det-rail" aria-hidden="true">' +
                  '<span class="' + P + 'det-no">' + U.esc(("0" + (i + 1)).slice(-2)) + "</span>" +
                  '<span class="' + P + 'det-line"></span>' +
                "</div>" +
                '<div class="' + P + 'det-body">' +
                  '<div class="' + P + 'det-top">' +
                    (p.severity ? '<span class="' + P + 'det-sev">' + U.esc(p.severity) + "</span>" : "") +
                    (p.category ? '<span class="' + P + 'det-cat">' + U.esc(p.category) + "</span>" : "") +
                    (p.year ? '<span class="' + P + 'det-year">' + U.esc(p.year) + "</span>" : "") +
                  "</div>" +
                  '<h3 class="' + P + 'det-name">' + U.esc(p.name) + "</h3>" +
                  (p.description ? '<p class="' + P + 'det-desc">' + U.esc(p.description) + "</p>" : "") +
                  (p.technologies.length
                    ? '<ul class="' + P + 'chips">' + p.technologies.map(function (t) {
                        return "<li>" + U.esc(t) + "</li>";
                      }).join("") + "</ul>"
                    : "") +
                  (links.length ? '<div class="' + P + 'det-links">' + links.join("") + "</div>" : "") +
                "</div>" +
                (p.image ? '<div class="' + P + 'det-media">' + U.image(p.image, p.name, P + 'det-img') + "</div>" : "") +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function operations(data) {
    if (!data.has.experience && !data.has.education) return "";
    var rows = [];
    data.experience.forEach(function (e) {
      rows.push({ tag: "OPS", title: e.role || e.company, org: e.role ? e.company : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    data.education.forEach(function (e) {
      rows.push({ tag: "TRN", title: e.degree || e.institution, org: e.degree ? e.institution : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    rows.sort(function (a, b) { return b.key - a.key; });
    return (
      '<section class="' + P + 'section" id="operations">' +
        head("04", "Operations log", "CHRONO") +
        '<ol class="' + P + 'log">' +
          rows.map(function (r) {
            return (
              '<li class="' + P + 'log-row" data-cw-reveal>' +
                '<span class="' + P + 'log-tag">' + U.esc(r.tag) + "</span>" +
                '<span class="' + P + 'log-when">' + U.esc(r.when || "\u2014") + "</span>" +
                '<div class="' + P + 'log-body">' +
                  '<h3 class="' + P + 'log-title">' + U.esc(r.title) + "</h3>" +
                  (r.org ? '<p class="' + P + 'log-org">' + U.esc(r.org) + "</p>" : "") +
                  (r.desc ? '<p class="' + P + 'log-desc">' + U.esc(r.desc) + "</p>" : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ol>" +
      "</section>"
    );
  }

  function ctf(data) {
    if (!data.has.ctf && !data.has.achievements) return "";
    var items = [];
    data.ctf.forEach(function (c) {
      items.push({ event: c.event, placement: c.placement, desc: c.description, when: U.fmtDate(c.date), cat: c.category });
    });
    data.achievements.forEach(function (a) {
      items.push({ event: a.title, placement: "", desc: a.description, when: U.fmtDate(a.date), cat: "" });
    });
    return (
      '<section class="' + P + 'section" id="ctf">' +
        head("05", "CTF & honours", "SCOREBOARD") +
        '<ul class="' + P + 'ctf">' +
          items.map(function (c) {
            return (
              '<li class="' + P + 'ctf-item" data-cw-reveal>' +
                '<div class="' + P + 'ctf-top">' +
                  '<h3 class="' + P + 'ctf-event">' + U.esc(c.event) + "</h3>" +
                  (c.placement ? '<span class="' + P + 'ctf-place">' + U.esc(c.placement) + "</span>" : "") +
                "</div>" +
                (c.desc ? '<p class="' + P + 'ctf-desc">' + U.esc(c.desc) + "</p>" : "") +
                '<div class="' + P + 'ctf-meta">' +
                  (c.cat ? '<span>' + U.esc(c.cat) + "</span>" : "") +
                  (c.when ? '<span>' + U.esc(c.when) + "</span>" : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function certs(data) {
    if (!data.has.certificates) return "";
    return (
      '<section class="' + P + 'section" id="certifications">' +
        head("06", "Certifications", "VERIFIED") +
        '<ul class="' + P + 'certs">' +
          data.certificates.map(function (c) {
            return (
              '<li class="' + P + 'cert" data-cw-reveal>' +
                '<span class="' + P + 'cert-badge" aria-hidden="true">\u2713</span>' +
                '<div class="' + P + 'cert-body">' +
                  '<h3 class="' + P + 'cert-name">' + U.esc(c.name) + "</h3>" +
                  '<p class="' + P + 'cert-meta">' + U.esc([c.issuer, U.fmtDate(c.date)].filter(Boolean).join(" \u00b7 ")) + "</p>" +
                "</div>" +
                (c.verifyUrl ? U.link(c.verifyUrl, "Verify", P + 'cert-link') : "") +
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
        head("07", "Contact", "CHANNEL") +
        '<div class="' + P + 'contact-grid">' +
          '<div class="' + P + 'contact-main" data-cw-reveal>' +
            '<p class="' + P + 'contact-lead">' + U.esc(b.tagline || "Available for security collaboration.") + "</p>" +
            (b.email ? '<a class="' + P + 'contact-mail" href="mailto:' + U.escUrl(b.email) + '">' + U.esc(b.email) + "</a>" : "") +
          "</div>" +
          (links.length
            ? '<ul class="' + P + 'contact-links" data-cw-reveal>' + links.map(function (l) {
                return "<li>" + U.link(l[1], l[0]) + "</li>";
              }).join("") + "</ul>"
            : "") +
        "</div>" +
        '<footer class="' + P + 'foot" data-cw-reveal>' +
          '<span class="' + P + 'pulse" aria-hidden="true"></span>' +
          "<span>" + U.esc(b.fullName || "Portfolio") + "</span>" +
          '<span class="' + P + 'foot-mark">Sentinel</span>' +
        "</footer>" +
      "</section>"
    );
  }

  /* ---------- module ---------- */

  CW.templates["template-33"] = {
    id: "template-33",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) +
            about(data) +
            arsenal(data) +
            detections(data) +
            operations(data) +
            ctf(data) +
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
    }
  };
})();
