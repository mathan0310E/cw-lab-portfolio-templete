/*
 * TEMPLATE 30 — NEBULA
 * Deep-space personal site. A canvas starfield draws a drifting constellation
 * behind the hero, and a layered SVG planet illustration anchors the sections.
 * All styles are namespaced under `cw-nebula-`.
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-nebula-";

  /* ---------- illustrations ---------- */

  /** A ringed planet drawn in flat vector style, with an orbiting moon. */
  function planetArt() {
    return (
      '<svg class="' + P + 'art" viewBox="0 0 360 320" role="img" aria-label="An illustrated ringed planet with an orbiting moon" focusable="false">' +
        "<defs>" +
          '<radialGradient id="cwNebulaPlanet" cx="38%" cy="32%" r="78%">' +
            '<stop offset="0%" stop-color="#7fe9ff"/>' +
            '<stop offset="52%" stop-color="#3d7bd6"/>' +
            '<stop offset="100%" stop-color="#12224a"/>' +
          "</radialGradient>" +
          '<linearGradient id="cwNebulaRing" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0%" stop-color="#ffd166"/>' +
            '<stop offset="100%" stop-color="#ff7a90"/>' +
          "</linearGradient>" +
        "</defs>" +
        '<g class="' + P + 'art-stars" fill="#eef1ff" opacity=".85">' +
          '<circle cx="42" cy="52" r="1.7"/><circle cx="318" cy="72" r="1.4"/>' +
          '<circle cx="72" cy="248" r="1.5"/><circle cx="296" cy="236" r="1.8"/>' +
          '<circle cx="196" cy="26" r="1.2"/><circle cx="122" cy="292" r="1.3"/>' +
          '<circle cx="24" cy="160" r="1.2"/><circle cx="336" cy="164" r="1.5"/>' +
        "</g>" +
        '<g class="' + P + 'art-rings" fill="none" stroke="url(#cwNebulaRing)" stroke-width="6" opacity=".9">' +
          '<ellipse cx="180" cy="168" rx="150" ry="42" transform="rotate(-18 180 168)"/>' +
        "</g>" +
        '<circle cx="180" cy="164" r="76" fill="url(#cwNebulaPlanet)"/>' +
        '<ellipse cx="158" cy="140" rx="34" ry="20" fill="#ffffff" opacity=".13"/>' +
        '<g class="' + P + 'art-rings-front" fill="none" stroke="url(#cwNebulaRing)" stroke-width="6" opacity=".95">' +
          '<path d="M42 200 A150 42 0 0 0 318 136" transform="rotate(-18 180 168)"/>' +
        "</g>" +
        '<g class="' + P + 'art-moon">' +
          '<circle cx="288" cy="90" r="15" fill="#ffd166"/>' +
          '<circle cx="283" cy="85" r="4" fill="#c99a2e" opacity=".7"/>' +
          '<circle cx="292" cy="95" r="3" fill="#c99a2e" opacity=".6"/>' +
        "</g>" +
      "</svg>"
    );
  }

  /** Constellation glyph used as a section marker. */
  function constellation() {
    return (
      '<svg class="' + P + 'mark" viewBox="0 0 64 24" aria-hidden="true" focusable="false">' +
        '<path d="M6 18 L22 6 L38 16 L58 4" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".7"/>' +
        '<g fill="currentColor">' +
          '<circle cx="6" cy="18" r="2.1"/><circle cx="22" cy="6" r="2.6"/>' +
          '<circle cx="38" cy="16" r="1.9"/><circle cx="58" cy="4" r="2.3"/>' +
        "</g>" +
      "</svg>"
    );
  }

  /* ---------- sections ---------- */

  function nav(data) {
    var links = [
      ["about", "About"],
      ["work", "Work"],
      ["skills", "Skills"],
      ["path", "Path"],
      ["contact", "Contact"]
    ];
    return (
      '<header class="' + P + 'nav" data-cw-nav>' +
        '<a class="' + P + 'brand" href="#top">' +
          '<span class="' + P + 'brand-star" aria-hidden="true"></span>' +
          '<span class="' + P + 'brand-name">' + U.esc(U.firstName(data.basics.fullName) || "Nebula") + "</span>" +
        "</a>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l) {
            return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
          }).join("") +
        "</nav>" +
        '<button class="' + P + 'nav-toggle" type="button" aria-expanded="false" aria-controls="cw-nebula-menu">' +
          '<span></span><span></span><span></span>' +
          '<span class="' + P + 'sr">Menu</span>' +
        "</button>" +
      "</header>" +
      '<nav id="cw-nebula-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
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
        // Decorative only: the starfield is drawn here and never read by AT.
        '<canvas class="' + P + 'sky" aria-hidden="true" data-cw-sky></canvas>' +
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-copy">' +
            (b.role ? '<p class="' + P + 'kicker" data-cw-reveal>' + constellation() + U.esc(b.role) + "</p>" : "") +
            '<h1 class="' + P + 'hero-name" data-cw-reveal>' + (b.fullName ? U.esc(b.fullName) : "Your Name") + "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tagline" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
            '<div class="' + P + 'hero-actions" data-cw-reveal>' +
              (data.has.projects ? '<a class="' + P + 'btn" href="#work">Explore the work</a>' : "") +
              (b.email ? '<a class="' + P + 'btn ' + P + 'btn--ghost" href="mailto:' + U.escUrl(b.email) + '">Send a signal</a>' : "") +
            "</div>" +
          "</div>" +
          '<div class="' + P + 'hero-art" data-cw-reveal>' + planetArt() + "</div>" +
        "</div>" +
        '<div class="' + P + 'hero-meta" data-cw-reveal>' +
          (b.location ? '<span><em>Coordinates</em>' + U.esc(b.location) + "</span>" : "") +
          (data.has.skills ? '<span><em>Focus</em>' + U.esc(data.skills[0].category || data.skills[0].name) + "</span>" : "") +
          (data.has.projects ? '<span><em>Missions</em>' + U.esc(String(data.projects.length)) + "</span>" : "") +
        "</div>" +
      "</section>"
    );
  }

  function head(index, title) {
    return (
      '<div class="' + P + 'sec-head" data-cw-reveal>' +
        '<span class="' + P + 'sec-index">' + U.esc(index) + "</span>" +
        '<h2 class="' + P + 'sec-title">' + U.esc(title) + "</h2>" +
        constellation() +
      "</div>"
    );
  }

  function about(data) {
    var b = data.basics;
    if (!b.bio && !b.profileImage) return "";
    return (
      '<section class="' + P + 'section" id="about">' +
        head("01", "About") +
        '<div class="' + P + 'about-grid">' +
          '<div class="' + P + 'about-media" data-cw-reveal>' +
            (b.profileImage
              ? U.image(b.profileImage, b.fullName || "Portrait", P + 'about-photo',
                  '<span class="' + P + 'about-fallback">' + U.monogram(b.fullName) + "</span>", true)
              : '<span class="' + P + 'about-fallback">' + U.monogram(b.fullName) + "</span>") +
          "</div>" +
          '<div class="' + P + 'about-body" data-cw-reveal>' + U.paragraphs(b.bio) + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function work(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="work">' +
        head("02", "Missions") +
        '<ul class="' + P + 'work">' +
          data.projects.map(function (p, i) {
            var links = [];
            if (p.url) links.push(U.link(p.url, "Open", P + 'work-link'));
            if (p.repo) links.push(U.link(p.repo, "Code", P + 'work-link'));
            return (
              '<li class="' + P + 'work-item" data-cw-reveal>' +
                '<div class="' + P + 'work-orbit" aria-hidden="true"><span>' + U.esc(("0" + (i + 1)).slice(-2)) + "</span></div>" +
                '<div class="' + P + 'work-body">' +
                  '<h3 class="' + P + 'work-name">' + U.esc(p.name) + "</h3>" +
                  (p.description ? '<p class="' + P + 'work-desc">' + U.esc(p.description) + "</p>" : "") +
                  (p.technologies.length
                    ? '<ul class="' + P + 'tags">' + p.technologies.map(function (t) {
                        return "<li>" + U.esc(t) + "</li>";
                      }).join("") + "</ul>"
                    : "") +
                  (links.length ? '<div class="' + P + 'work-links">' + links.join("") + "</div>" : "") +
                "</div>" +
                (p.image ? '<div class="' + P + 'work-media">' + U.image(p.image, p.name, P + 'work-img') + "</div>" : "") +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function skills(data) {
    if (!data.has.skills) return "";
    var groups = {};
    data.skills.forEach(function (s) {
      var k = s.category || "General";
      (groups[k] = groups[k] || []).push(s);
    });
    return (
      '<section class="' + P + 'section" id="skills">' +
        head("03", "Instruments") +
        '<div class="' + P + 'skill-groups">' +
          Object.keys(groups).map(function (k) {
            return (
              '<div class="' + P + 'skill-group" data-cw-reveal>' +
                '<h3 class="' + P + 'skill-cat">' + U.esc(k) + "</h3>" +
                '<ul class="' + P + 'skill-list">' +
                  groups[k].map(function (s) {
                    var lvl = U.skillLevel(s.level);
                    return (
                      "<li" + (lvl === null ? "" : ' style="--cw-lvl:' + lvl + '%"') + ">" +
                        '<span class="' + P + 'skill-name">' + U.esc(s.name) + "</span>" +
                        (lvl === null
                          ? ""
                          : '<span class="' + P + 'skill-bar" aria-hidden="true"><span></span></span>' +
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

  function path(data) {
    var rows = [];
    data.experience.forEach(function (e) {
      rows.push({ kind: "Role", title: e.role || e.company, org: e.role ? e.company : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    data.education.forEach(function (e) {
      rows.push({ kind: "Study", title: e.degree || e.institution, org: e.degree ? e.institution : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    if (!rows.length) return "";
    rows.sort(function (a, b) { return b.key - a.key; });
    return (
      '<section class="' + P + 'section" id="path">' +
        head("04", "Flight path") +
        '<ol class="' + P + 'path">' +
          rows.map(function (r) {
            return (
              '<li class="' + P + 'path-item" data-cw-reveal>' +
                '<span class="' + P + 'path-dot" aria-hidden="true"></span>' +
                '<div class="' + P + 'path-meta">' +
                  '<span class="' + P + 'path-kind">' + U.esc(r.kind) + "</span>" +
                  (r.when ? '<span class="' + P + 'path-when">' + U.esc(r.when) + "</span>" : "") +
                "</div>" +
                '<h3 class="' + P + 'path-title">' + U.esc(r.title) + "</h3>" +
                (r.org ? '<p class="' + P + 'path-org">' + U.esc(r.org) + "</p>" : "") +
                (r.desc ? '<p class="' + P + 'path-desc">' + U.esc(r.desc) + "</p>" : "") +
              "</li>"
            );
          }).join("") +
        "</ol>" +
      "</section>"
    );
  }

  function honours(data) {
    var items = [];
    data.certificates.forEach(function (c) {
      items.push({ title: c.name, meta: [c.issuer, U.fmtDate(c.date)].filter(Boolean).join(" \u00b7 "), url: c.verifyUrl, kind: "Certificate" });
    });
    data.achievements.forEach(function (a) {
      items.push({ title: a.title, meta: [a.description, U.fmtDate(a.date)].filter(Boolean).join(" \u00b7 "), url: "", kind: "Award" });
    });
    if (!items.length) return "";
    return (
      '<section class="' + P + 'section" id="honours">' +
        head("05", "Certificates & awards") +
        '<ul class="' + P + 'honours">' +
          items.map(function (it) {
            return (
              '<li class="' + P + 'honour" data-cw-reveal>' +
                '<span class="' + P + 'honour-kind">' + U.esc(it.kind) + "</span>" +
                '<h3 class="' + P + 'honour-title">' + U.esc(it.title) + "</h3>" +
                (it.meta ? '<p class="' + P + 'honour-meta">' + U.esc(it.meta) + "</p>" : "") +
                (it.url ? U.link(it.url, "Verify", P + 'honour-link') : "") +
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
        head("06", "Contact") +
        '<div class="' + P + 'contact-inner" data-cw-reveal>' +
          '<p class="' + P + 'contact-lead">' + U.esc(b.tagline || "Open to new missions and collaborations.") + "</p>" +
          (b.email ? '<a class="' + P + 'contact-mail" href="mailto:' + U.escUrl(b.email) + '">' + U.esc(b.email) + "</a>" : "") +
          (links.length
            ? '<ul class="' + P + 'contact-links">' + links.map(function (l) {
                return "<li>" + U.link(l[1], l[0]) + "</li>";
              }).join("") + "</ul>"
            : "") +
        "</div>" +
        '<footer class="' + P + 'foot" data-cw-reveal>' +
          "<span>" + U.esc(b.fullName || "Portfolio") + "</span>" +
          '<span class="' + P + 'foot-mark">Nebula</span>' +
        "</footer>" +
      "</section>"
    );
  }

  /* ---------- starfield ---------- */

  /**
   * Drifting starfield with constellation links. Pauses while off-screen and
   * paints a single static frame when the visitor prefers reduced motion.
   */
  function startSky(canvas) {
    var ctx = canvas.getContext && canvas.getContext("2d");
    if (!ctx) return;
    var reduced = CW.anim && CW.anim.prefersReduced && CW.anim.prefersReduced();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var stars = [], w = 0, h = 0, raf = 0, running = false;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.max(28, Math.min(84, Math.round((w * h) / 16000)));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.3 + 0.5,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          tw: Math.random() * Math.PI * 2
        });
      }
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      var linkDist = Math.min(150, Math.max(88, w * 0.12));

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x += w; else if (s.x > w) s.x -= w;
        if (s.y < 0) s.y += h; else if (s.y > h) s.y -= h;
      }

      // Constellation links between neighbouring stars.
      ctx.lineWidth = 0.7;
      for (var a = 0; a < stars.length; a++) {
        for (var b2 = a + 1; b2 < stars.length; b2++) {
          var dx = stars[a].x - stars[b2].x, dy = stars[a].y - stars[b2].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            ctx.strokeStyle = "rgba(127, 233, 255," + (0.16 * (1 - d / linkDist)).toFixed(3) + ")";
            ctx.beginPath();
            ctx.moveTo(stars[a].x, stars[a].y);
            ctx.lineTo(stars[b2].x, stars[b2].y);
            ctx.stroke();
          }
        }
      }

      for (var k = 0; k < stars.length; k++) {
        var st = stars[k];
        var twinkle = reduced ? 0.85 : 0.6 + 0.4 * Math.sin(t / 900 + st.tw);
        ctx.fillStyle = "rgba(238, 241, 255," + twinkle.toFixed(2) + ")";
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop(t) {
      if (!running) return;
      frame(t || 0);
      raf = window.requestAnimationFrame(loop);
    }

    resize();

    if (reduced || !window.requestAnimationFrame) {
      frame(0);
      return;
    }

    var io = "IntersectionObserver" in window
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting && !running) { running = true; raf = window.requestAnimationFrame(loop); }
            else if (!e.isIntersecting && running) { running = false; window.cancelAnimationFrame(raf); }
          });
        }, { threshold: 0 })
      : null;

    if (io) io.observe(canvas);
    else { running = true; raf = window.requestAnimationFrame(loop); }

    var rT = 0;
    window.addEventListener("resize", function () {
      window.clearTimeout(rT);
      rT = window.setTimeout(function () {
        resize();
        if (!running) frame(0);
      }, 160);
    });
  }

  /* ---------- module ---------- */

  CW.templates["template-30"] = {
    id: "template-30",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) +
            about(data) +
            work(data) +
            skills(data) +
            path(data) +
            honours(data) +
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
      var sky = root.querySelector("[data-cw-sky]");
      if (sky) startSky(sky);
    }
  };
})();
