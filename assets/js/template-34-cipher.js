/*
 * TEMPLATE 34 — CIPHER
 * Cryptographic workstation. Acid-lime on near-black, hexdump-style project
 * rows with byte offsets, bracket notation, a falling hex-rain canvas and a
 * text-decrypt effect on the hero name. Namespaced under `cw-cipher-`.
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-cipher-";

  var GLYPHS = "ABCDEF0123456789#$%&*+=<>/\\|";

  /* ---------- illustrations ---------- */

  /** A keyhole set into a circuit board: the template's cipher mark. */
  function keyhole() {
    return (
      '<svg class="' + P + 'art" viewBox="0 0 320 320" role="img" aria-label="An illustrated keyhole set into a circuit board" focusable="false">' +
        '<g class="' + P + 'circuit" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".5">' +
          '<path d="M20 60 H96 L120 84"/><path d="M300 76 H228 L206 98"/>' +
          '<path d="M16 246 H88 L112 222"/><path d="M304 262 H232 L210 240"/>' +
          '<path d="M160 12 V64"/><path d="M160 308 V256"/>' +
        "</g>" +
        '<g class="' + P + 'nodes" fill="currentColor" opacity=".75">' +
          '<circle cx="120" cy="84" r="3.4"/><circle cx="206" cy="98" r="3.4"/>' +
          '<circle cx="112" cy="222" r="3.4"/><circle cx="210" cy="240" r="3.4"/>' +
          '<circle cx="160" cy="64" r="3"/><circle cx="160" cy="256" r="3"/>' +
        "</g>" +
        '<circle class="' + P + 'ring" cx="160" cy="152" r="104" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".35"/>' +
        '<circle class="' + P + 'ring ' + P + 'ring--b" cx="160" cy="152" r="82" fill="none" stroke="currentColor" stroke-width="1" opacity=".25" stroke-dasharray="4 7"/>' +
        '<circle cx="160" cy="152" r="62" fill="none" stroke="currentColor" stroke-width="2"/>' +
        '<path d="M160 106 A30 30 0 0 1 190 136 A30 30 0 0 1 172 163 L172 196 A8 8 0 0 1 148 196 L148 163 A30 30 0 0 1 130 136 A30 30 0 0 1 160 106 Z" ' +
          'fill="none" stroke="currentColor" stroke-width="2.2"/>' +
        '<circle class="' + P + 'core" cx="160" cy="136" r="7" fill="currentColor"/>' +
        '<g class="' + P + 'ticks" fill="currentColor" opacity=".55">' +
          '<circle cx="160" cy="48" r="2.6"/><circle cx="160" cy="256" r="2.6"/>' +
          '<circle cx="56" cy="152" r="2.6"/><circle cx="264" cy="152" r="2.6"/>' +
        "</g>" +
      "</svg>"
    );
  }

  /** Renders a byte offset like a hexdump address column. */
  function offset(i) {
    return "0x" + ("000" + (i * 16).toString(16).toUpperCase()).slice(-4);
  }

  /* ---------- sections ---------- */

  function nav(data) {
    var links = [
      ["profile", "Profile"],
      ["suite", "Suite"],
      ["research", "Research"],
      ["path", "Path"],
      ["contact", "Contact"]
    ];
    return (
      '<header class="' + P + 'nav" data-cw-nav>' +
        '<a class="' + P + 'brand" href="#top">' +
          '<span class="' + P + 'brand-glyph" aria-hidden="true">0x</span>' +
          '<span class="' + P + 'brand-name">' + U.esc(U.firstName(data.basics.fullName) || "Cipher") + "</span>" +
        "</a>" +
        '<nav class="' + P + 'nav-links" aria-label="Sections">' +
          links.map(function (l, i) {
            return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
          }).join("") +
        "</nav>" +
        '<button class="' + P + 'nav-toggle" type="button" aria-expanded="false" aria-controls="cw-cipher-menu">' +
          '<span></span><span></span><span></span>' +
          '<span class="' + P + 'sr">Menu</span>' +
        "</button>" +
      "</header>" +
      '<nav id="cw-cipher-menu" class="' + P + 'menu" aria-label="Mobile sections">' +
        links.map(function (l) {
          return '<a href="#' + l[0] + '">' + U.esc(l[1]) + "</a>";
        }).join("") +
      "</nav>"
    );
  }

  function hero(data) {
    var b = data.basics;
    var facts = [
      b.role ? ["role", b.role] : null,
      b.location ? ["origin", b.location] : null,
      data.has.projects ? ["modules", String(data.projects.length)] : null,
      data.has.writeups ? ["writeups", String(data.writeups.length)] : null
    ].filter(Boolean);

    return (
      '<section class="' + P + 'hero" id="top">' +
        '<canvas class="' + P + 'rain" aria-hidden="true" data-cw-rain></canvas>' +
        '<div class="' + P + 'hero-grid">' +
          '<div class="' + P + 'hero-copy">' +
            '<p class="' + P + 'kicker" data-cw-reveal>' +
              '<span class="' + P + 'bracket">[</span>' +
              U.esc(b.role || "cryptography") +
              '<span class="' + P + 'bracket">]</span>' +
              '<span class="' + P + 'kicker-hash" aria-hidden="true">' + U.esc(offset(0)) + "</span>" +
            "</p>" +
            '<h1 class="' + P + 'hero-name" data-cw-reveal data-cw-decrypt>' +
              (b.fullName ? U.esc(b.fullName) : "Your Name") +
            "</h1>" +
            (b.tagline ? '<p class="' + P + 'hero-tagline" data-cw-reveal>' + U.esc(b.tagline) + "</p>" : "") +
            '<div class="' + P + 'hero-actions" data-cw-reveal>' +
              (data.has.projects ? '<a class="' + P + 'btn" href="#research">Inspect research</a>' : "") +
              (b.email ? '<a class="' + P + 'btn ' + P + 'btn--ghost" href="mailto:' + U.escUrl(b.email) + '">Initiate contact</a>' : "") +
            "</div>" +
          "</div>" +
          '<div class="' + P + 'hero-art" data-cw-reveal>' + keyhole() + "</div>" +
        "</div>" +
        (facts.length
          ? '<ul class="' + P + 'facts" data-cw-reveal>' + facts.map(function (f) {
              return '<li><span class="' + P + 'facts-key">' + U.esc(f[0]) + "</span>" +
                '<span class="' + P + 'facts-val">' + U.esc(f[1]) + "</span></li>";
            }).join("") + "</ul>"
          : "") +
      "</section>"
    );
  }

  function head(slug, title) {
    return (
      '<div class="' + P + 'sec-head" data-cw-reveal>' +
        '<span class="' + P + 'sec-slug">' + U.esc(slug) + "</span>" +
        '<h2 class="' + P + 'sec-title">' + U.esc(title) + "</h2>" +
      "</div>"
    );
  }

  function profile(data) {
    var b = data.basics;
    if (!b.bio && !b.profileImage) return "";
    return (
      '<section class="' + P + 'section" id="profile">' +
        head("//01", "Profile") +
        '<div class="' + P + 'profile-grid">' +
          '<div class="' + P + 'profile-media" data-cw-reveal>' +
            (b.profileImage
              ? U.image(b.profileImage, b.fullName || "Portrait", P + 'profile-photo',
                  '<span class="' + P + 'profile-fallback">' + U.monogram(b.fullName) + "</span>", true)
              : '<span class="' + P + 'profile-fallback">' + U.monogram(b.fullName) + "</span>") +
            '<span class="' + P + 'profile-tag" aria-hidden="true">' + U.esc(offset(4)) + "</span>" +
          "</div>" +
          '<div class="' + P + 'profile-body" data-cw-reveal>' + U.paragraphs(b.bio) + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function suite(data) {
    if (!data.has.skills) return "";
    var groups = {};
    data.skills.forEach(function (s) {
      var k = s.category || "General";
      (groups[k] = groups[k] || []).push(s);
    });
    return (
      '<section class="' + P + 'section" id="suite">' +
        head("//02", "Cipher suite") +
        '<div class="' + P + 'suite">' +
          Object.keys(groups).map(function (k, gi) {
            return (
              '<div class="' + P + 'suite-group" data-cw-reveal>' +
                '<div class="' + P + 'suite-head">' +
                  '<span class="' + P + 'suite-idx" aria-hidden="true">' + U.esc(("0" + (gi + 1)).slice(-2)) + "</span>" +
                  '<h3 class="' + P + 'suite-cat">' + U.esc(k) + "</h3>" +
                "</div>" +
                '<ul class="' + P + 'suite-list">' +
                  groups[k].map(function (s) {
                    var lvl = U.skillLevel(s.level);
                    return (
                      "<li" + (lvl === null ? "" : ' style="--cw-lvl:' + lvl + '%"') + ">" +
                        '<span class="' + P + 'suite-name">' + U.esc(s.name) + "</span>" +
                        (lvl === null
                          ? ""
                          : '<span class="' + P + 'suite-bytes" aria-hidden="true">' +
                              [0, 1, 2, 3, 4].map(function (n) {
                                return '<i class="' + (lvl >= (n + 1) * 20 ? "is-on" : "") + '"></i>';
                              }).join("") + "</span>" +
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

  function research(data) {
    if (!data.has.projects) return "";
    return (
      '<section class="' + P + 'section" id="research">' +
        head("//03", "Research & modules") +
        '<ol class="' + P + 'dump">' +
          data.projects.map(function (p, i) {
            var links = [];
            if (p.url) links.push(U.link(p.url, "View", P + 'dump-link'));
            if (p.repo) links.push(U.link(p.repo, "Source", P + 'dump-link'));
            return (
              '<li class="' + P + 'dump-row" data-cw-reveal>' +
                '<span class="' + P + 'dump-off" aria-hidden="true">' + U.esc(offset(i)) + "</span>" +
                '<div class="' + P + 'dump-body">' +
                  '<div class="' + P + 'dump-top">' +
                    '<h3 class="' + P + 'dump-name">' + U.esc(p.name) + "</h3>" +
                    (p.category ? '<span class="' + P + 'dump-cat">' + U.esc(p.category) + "</span>" : "") +
                  "</div>" +
                  (p.description ? '<p class="' + P + 'dump-desc">' + U.esc(p.description) + "</p>" : "") +
                  (p.technologies.length
                    ? '<ul class="' + P + 'dump-bytes">' + p.technologies.map(function (t) {
                        return "<li>" + U.esc(t) + "</li>";
                      }).join("") + "</ul>"
                    : "") +
                  (links.length ? '<div class="' + P + 'dump-links">' + links.join("") + "</div>" : "") +
                "</div>" +
                (p.image ? '<div class="' + P + 'dump-media">' + U.image(p.image, p.name, P + 'dump-img') + "</div>" : "") +
              "</li>"
            );
          }).join("") +
        "</ol>" +
      "</section>"
    );
  }

  function path(data) {
    var rows = [];
    data.experience.forEach(function (e) {
      rows.push({ tag: "exp", title: e.role || e.company, org: e.role ? e.company : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    data.education.forEach(function (e) {
      rows.push({ tag: "edu", title: e.degree || e.institution, org: e.degree ? e.institution : "", when: U.dateRange(e.startDate, e.endDate), desc: e.description, key: U.sortKey(e.startDate) });
    });
    data.certificates.forEach(function (c) {
      rows.push({ tag: "cert", title: c.name, org: c.issuer || "", when: U.fmtDate(c.date), desc: "", key: U.sortKey(c.date), url: c.verifyUrl });
    });
    if (!rows.length) return "";
    rows.sort(function (a, b) { return b.key - a.key; });
    return (
      '<section class="' + P + 'section" id="path">' +
        head("//04", "Key path") +
        '<ul class="' + P + 'path">' +
          rows.map(function (r) {
            return (
              '<li class="' + P + 'path-row" data-cw-reveal>' +
                '<span class="' + P + 'path-tag">' + U.esc(r.tag) + "</span>" +
                '<span class="' + P + 'path-when">' + U.esc(r.when || "\u2014") + "</span>" +
                '<div class="' + P + 'path-body">' +
                  '<h3 class="' + P + 'path-title">' + U.esc(r.title) + "</h3>" +
                  (r.org ? '<p class="' + P + 'path-org">' + U.esc(r.org) + "</p>" : "") +
                  (r.desc ? '<p class="' + P + 'path-desc">' + U.esc(r.desc) + "</p>" : "") +
                  (r.url ? U.link(r.url, "Verify", P + 'path-link') : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</section>"
    );
  }

  function writeups(data) {
    if (!data.has.writeups && !data.has.publications) return "";
    var items = [];
    data.writeups.forEach(function (w) {
      items.push({ title: w.title, cat: w.category, when: U.fmtDate(w.date), desc: w.description, url: w.url });
    });
    data.publications.forEach(function (p) {
      items.push({ title: p.title, cat: "Publication", when: U.fmtDate(p.date), desc: p.description, url: p.url });
    });
    return (
      '<section class="' + P + 'section" id="writeups">' +
        head("//05", "Technical writeups") +
        '<ul class="' + P + 'notes">' +
          items.map(function (w) {
            return (
              '<li class="' + P + 'note" data-cw-reveal>' +
                '<div class="' + P + 'note-top">' +
                  '<span class="' + P + 'note-mark" aria-hidden="true">&gt;</span>' +
                  '<h3 class="' + P + 'note-title">' +
                    (w.url ? U.link(w.url, w.title, P + 'note-link') : U.esc(w.title)) +
                  "</h3>" +
                "</div>" +
                (w.desc ? '<p class="' + P + 'note-desc">' + U.esc(w.desc) + "</p>" : "") +
                '<div class="' + P + 'note-meta">' +
                  (w.cat ? '<span>' + U.esc(w.cat) + "</span>" : "") +
                  (w.when ? '<span>' + U.esc(w.when) + "</span>" : "") +
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
        head("//06", "Contact") +
        '<div class="' + P + 'contact-block" data-cw-reveal>' +
          '<p class="' + P + 'contact-lead">' + U.esc(b.tagline || "Open to cryptography and security research.") + "</p>" +
          (b.email ? '<a class="' + P + 'contact-mail" href="mailto:' + U.escUrl(b.email) + '">' + U.esc(b.email) + "</a>" : "") +
          (links.length
            ? '<ul class="' + P + 'contact-links">' + links.map(function (l) {
                return "<li>" + U.link(l[1], l[0]) + "</li>";
              }).join("") + "</ul>"
            : "") +
        "</div>" +
        '<footer class="' + P + 'foot" data-cw-reveal>' +
          '<span class="' + P + 'foot-hash" aria-hidden="true">' + U.esc(offset(255)) + "</span>" +
          "<span>" + U.esc(b.fullName || "Portfolio") + "</span>" +
          '<span class="' + P + 'foot-mark">Cipher</span>' +
        "</footer>" +
      "</section>"
    );
  }

  /* ---------- hex rain ---------- */

  /** Falling hex digits. Pauses off-screen; static frame under reduced motion. */
  function startRain(canvas) {
    var ctx = canvas.getContext && canvas.getContext("2d");
    if (!ctx) return;
    var reduced = CW.anim && CW.anim.prefersReduced && CW.anim.prefersReduced();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var size = 14, w = 0, h = 0, cols = [], raf = 0, running = false, last = 0;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.ceil(w / size);
      cols = [];
      for (var i = 0; i < n; i++) {
        cols.push({ y: Math.random() * h, speed: 0.5 + Math.random() * 0.9, len: 6 + Math.floor(Math.random() * 12) });
      }
    }

    function glyph() {
      return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
    }

    function paint(dt) {
      ctx.clearRect(0, 0, w, h);
      ctx.font = size - 3 + 'px ui-monospace, Menlo, Consolas, monospace';
      for (var i = 0; i < cols.length; i++) {
        var c = cols[i];
        if (!reduced) c.y += c.speed * (dt || 16) * 0.06;
        if (c.y - c.len * size > h) { c.y = -Math.random() * 60; }
        for (var k = 0; k < c.len; k++) {
          var y = c.y - k * size;
          if (y < -size || y > h + size) continue;
          var fade = 1 - k / c.len;
          ctx.fillStyle = k === 0
            ? "rgba(226, 255, 140, 0.85)"
            : "rgba(200, 255, 61," + (fade * 0.3).toFixed(3) + ")";
          ctx.fillText(glyph(), i * size, y);
        }
      }
    }

    function loop(t) {
      if (!running) return;
      var dt = Math.min(64, t - last || 16);
      last = t;
      paint(dt);
      raf = window.requestAnimationFrame(loop);
    }

    resize();

    if (reduced || !window.requestAnimationFrame) { paint(16); return; }

    var io = "IntersectionObserver" in window
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting && !running) { running = true; last = performance.now(); raf = window.requestAnimationFrame(loop); }
            else if (!e.isIntersecting && running) { running = false; window.cancelAnimationFrame(raf); }
          });
        }, { threshold: 0 })
      : null;

    if (io) io.observe(canvas);
    else { running = true; raf = window.requestAnimationFrame(loop); }

    var rT = 0;
    window.addEventListener("resize", function () {
      window.clearTimeout(rT);
      rT = window.setTimeout(function () { resize(); if (!running) paint(16); }, 170);
    });
  }

  /* ---------- decrypt effect ---------- */

  /**
   * Scrambles each character, then settles left-to-right onto the real text.
   * The element keeps its true text in the DOM, so the name is never lost;
   * under reduced motion the text is simply left alone.
   */
  function decrypt(el) {
    if (!el || (CW.anim && CW.anim.prefersReduced && CW.anim.prefersReduced())) return;
    var target = el.textContent;
    if (!target) return;
    var chars = target.split("");
    var settleAt = chars.map(function (ch, i) {
      return ch === " " ? 0 : 180 + i * 55;
    });
    var start = performance.now();
    var total = 180 + chars.length * 55 + 420;

    function frame(now) {
      var t = now - start;
      var out = "";
      for (var i = 0; i < chars.length; i++) {
        if (chars[i] === " ") { out += " "; continue; }
        out += t >= settleAt[i] ? chars[i] : GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
      }
      el.textContent = out;
      if (t < total) {
        window.requestAnimationFrame(frame);
      } else {
        el.textContent = target;
      }
    }
    window.requestAnimationFrame(frame);
  }

  /* ---------- module ---------- */

  CW.templates["template-34"] = {
    id: "template-34",
    render: function (data) {
      return (
        '<div class="' + P + 'page">' +
          nav(data) +
          '<main class="' + P + 'main">' +
            hero(data) +
            profile(data) +
            suite(data) +
            research(data) +
            path(data) +
            writeups(data) +
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
      var rain = root.querySelector("[data-cw-rain]");
      if (rain) startRain(rain);
      var name = root.querySelector("[data-cw-decrypt]");
      if (name) decrypt(name);
    }
  };
})();
