/*
 * TEMPLATE 26 — WEB RETRO
 * Retro personal developer site inspired by early desktop interfaces. Vintage
 * palette, pixel accents, monospace, retro buttons. Sections render as
 * collapsible "windows" and a taskbar drives navigation — interactive but still
 * responsive, readable and keyboard accessible.
 * Namespaced: cw-retro-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-retro-";

  var WINDOWS = [
    ["welcome", "WELCOME.EXE"],
    ["about", "ABOUT.TXT"],
    ["skills", "SKILLS.DLL"],
    ["projects", "PROJECTS"],
    ["experience", "CAREER.LOG"],
    ["achievements", "TROPHIES"],
    ["contact", "GUESTBOOK"]
  ];

  function windowShell(id, title, body, open) {
    return (
      '<section class="' + P + 'win" id="' + id + '" aria-labelledby="' + id + '-t">' +
        '<header class="' + P + 'win-bar">' +
          '<span class="' + P + 'win-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
          '<h2 class="' + P + 'win-title" id="' + id + '-t">' + U.esc(title) + "</h2>" +
          '<button class="' + P + 'win-toggle" type="button" aria-expanded="' + (open ? "true" : "false") + '" data-win="' + id + '" aria-controls="' + id + '-body"><span aria-hidden="true">\u2013</span><span class="' + P + 'sr">Toggle ' + U.esc(title) + "</span></button>" +
        "</header>" +
        '<div class="' + P + 'win-body" id="' + id + '-body"' + (open ? "" : " hidden") + ">" + body + "</div>" +
      "</section>"
    );
  }

  function welcome(data) {
    var b = data.basics;
    return windowShell("welcome", "WELCOME.EXE",
      '<div class="' + P + 'welcome">' +
        '<div class="' + P + 'welcome-photo">' +
          (b.profileImage
            ? U.image(b.profileImage, b.fullName || "Portrait", P + "photo-img",
                '<span class="' + P + 'photo-fallback">' + U.monogram(b.fullName) + "</span>", true)
            : '<span class="' + P + 'photo-fallback">' + U.monogram(b.fullName) + "</span>") +
        "</div>" +
        '<div class="' + P + 'welcome-text">' +
          '<p class="' + P + 'welcome-hello">Hello, world \u2014 I am</p>' +
          '<h1 class="' + P + 'welcome-name">' + U.esc(b.fullName || "Your Name") + "</h1>" +
          (b.role ? '<p class="' + P + 'welcome-role">' + U.esc(b.role) + "</p>" : "") +
          (b.tagline ? '<p class="' + P + 'welcome-tag">' + U.esc(b.tagline) + "</p>" : "") +
          '<div class="' + P + 'welcome-actions">' +
            (b.email ? '<a class="' + P + 'btn" href="mailto:' + U.esc(b.email) + '">EMAIL ME</a>' : "") +
            (data.links.website ? U.link(data.links.website, "MY SITE", P + "btn") : "") +
          "</div>" +
        "</div>" +
      "</div>", true);
  }

  function about(data) {
    if (!data.basics.bio) return "";
    return windowShell("about", "ABOUT.TXT",
      '<div class="' + P + 'text">' + U.paragraphs(data.basics.bio) +
      (data.basics.location ? '<p class="' + P + 'text-meta">LOCATION: ' + U.esc(data.basics.location) + "</p>" : "") +
      "</div>", true);
  }

  function skills(data) {
    if (!data.has.skills) return "";
    return windowShell("skills", "SKILLS.DLL",
      '<div class="' + P + 'skills">' +
        data.skillGroups.map(function (g) {
          return '<div class="' + P + 'skill-group"><h3>' + U.esc(g.category) + "</h3>" +
            g.skills.map(function (s) {
              return '<div class="' + P + 'skill"><span class="' + P + 'skill-name">' + U.esc(s.name) + "</span>" +
                (s.level !== null
                  ? '<span class="' + P + 'meter" aria-label="' + s.level + '%"><i style="width:' + s.level + '%"></i></span>'
                  : "") + "</div>";
            }).join("") + "</div>";
        }).join("") +
      "</div>", true);
  }

  function projects(data) {
    if (!data.has.projects) return "";
    return windowShell("projects", "PROJECTS",
      '<div class="' + P + 'projects">' +
        data.projects.map(function (p, i) {
          return (
            '<article class="' + P + 'proj">' +
              '<div class="' + P + 'proj-bar"><span class="' + P + 'proj-idx">' + String(i + 1).padStart(2, "0") + "</span>" + U.esc(p.name) + "</div>" +
              '<div class="' + P + 'proj-body">' +
                (p.image ? '<div class="' + P + 'proj-media">' + U.image(p.image, p.name, P + "proj-img") + "</div>" : "") +
                (p.description ? '<p>' + U.esc(p.description) + "</p>" : "") +
                (p.technologies.length ? '<p class="' + P + 'proj-tech">' + p.technologies.map(U.esc).join(" / ") + "</p>" : "") +
                '<div class="' + P + 'proj-links">' +
                  (p.url ? U.link(p.url, "[RUN]", P + "link") : "") +
                  (p.repo ? U.link(p.repo, "[CODE]", P + "link") : "") +
                "</div>" +
              "</div>" +
            "</article>"
          );
        }).join("") +
      "</div>", true);
  }

  function experience(data) {
    if (!data.has.experience) return "";
    return windowShell("experience", "CAREER.LOG",
      '<div class="' + P + 'log">' +
        data.experienceSorted.map(function (e) {
          return '<div class="' + P + 'log-row"><span class="' + P + 'log-when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
            '<span class="' + P + 'log-body"><strong>' + U.esc(e.role) + "</strong>" +
            (e.company ? '<span class="' + P + 'log-org">' + U.esc(e.company) + "</span>" : "") +
            (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") + "</span></div>";
        }).join("") +
      "</div>", true);
  }

  function achievements(data) {
    if (!data.has.achievements) return "";
    return windowShell("achievements", "TROPHIES",
      '<ul class="' + P + 'trophies">' +
        data.achievements.map(function (a) {
          return '<li><span class="' + P + 'trophy-ico" aria-hidden="true">\u2605</span>' +
            '<span><strong>' + U.esc(a.title) + "</strong>" +
            (a.date ? ' <span class="' + P + 'trophy-date">' + U.esc(U.fmtDate(a.date)) + "</span>" : "") +
            (a.description ? '<span class="' + P + 'trophy-desc">' + U.esc(a.description) + "</span>" : "") + "</span></li>";
        }).join("") +
      "</ul>", true);
  }

  function contact(data) {
    var l = data.links;
    var links = [
      l.github ? ["GITHUB", l.github] : null,
      l.linkedin ? ["LINKEDIN", l.linkedin] : null,
      l.website ? ["WEBSITE", l.website] : null,
      l.twitter ? ["TWITTER", l.twitter] : null
    ].filter(Boolean).concat(l.other.map(function (o) { return [o.label.toUpperCase(), o.url]; }));
    return windowShell("contact", "GUESTBOOK",
      '<div class="' + P + 'guestbook">' +
        '<p class="' + P + 'guestbook-lead">Sign the guestbook \u2014 say hello:</p>' +
        (data.basics.email ? '<a class="' + P + 'guestbook-mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>" : "") +
        (links.length
          ? '<div class="' + P + 'guestbook-links">' + links.map(function (x) {
              return U.link(x[1], x[0], P + "btn " + P + "btn--sm");
            }).join("") + "</div>"
          : "") +
        '<p class="' + P + 'guestbook-foot">\u00A9 ' + new Date().getFullYear() + " " + U.esc(data.basics.fullName || "") + " \u00B7 handcrafted, no framework</p>" +
      "</div>", true);
  }

  CW.templates["template-26"] = {
    id: "template-26",
    render: function (data) {
      return (
        '<div class="' + P + 'desktop">' +
          '<header class="' + P + 'menubar">' +
            '<span class="' + P + 'menubar-app">' + U.esc(U.firstName(data.basics.fullName) || "user") + ".site</span>" +
            '<nav class="' + P + 'menubar-nav" aria-label="Sections">' +
              WINDOWS.map(function (w) { return '<a href="#' + w[0] + '">' + U.esc(w[1]) + "</a>"; }).join("") +
            "</nav>" +
            '<span class="' + P + 'menubar-clock" id="cw-retro-clock" aria-hidden="true">--:--</span>' +
          "</header>" +
          '<main class="' + P + 'workspace" id="cw-retro-workspace">' +
            welcome(data) + about(data) + skills(data) + projects(data) +
            experience(data) + achievements(data) + contact(data) +
          "</main>" +
          '<nav class="' + P + 'taskbar" aria-label="Quick navigation">' +
            '<button class="' + P + 'taskbar-start" type="button" aria-expanded="false" aria-controls="cw-retro-start">START</button>' +
            '<div class="' + P + 'taskbar-items">' +
              WINDOWS.map(function (w) {
                return '<button type="button" class="' + P + 'taskbar-item" data-jump="' + w[0] + '">' + U.esc(w[1]) + "</button>";
              }).join("") +
            "</div>" +
            '<div class="' + P + 'start" id="cw-retro-start" hidden>' +
              '<p class="' + P + 'start-title">Jump to</p>' +
              WINDOWS.map(function (w) { return '<a href="#' + w[0] + '">' + U.esc(w[1]) + "</a>"; }).join("") +
            "</div>" +
          "</nav>" +
        "</div>"
      );
    },
    init: function (root, data) {
      if (!root) return;

      // Collapsible windows.
      root.querySelectorAll("." + P + "win-toggle").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-win");
          var body = root.querySelector("#" + id + "-body");
          if (!body) return;
          var open = body.hasAttribute("hidden");
          if (open) body.removeAttribute("hidden"); else body.setAttribute("hidden", "");
          btn.setAttribute("aria-expanded", open ? "true" : "false");
          btn.classList.toggle("is-closed", !open);
        });
      });

      // Taskbar quick navigation.
      var start = root.querySelector("." + P + "taskbar-start");
      var startMenu = root.querySelector("." + P + "start");
      if (start && startMenu) {
        start.addEventListener("click", function () {
          var open = startMenu.hasAttribute("hidden");
          if (open) startMenu.removeAttribute("hidden"); else startMenu.setAttribute("hidden", "");
          start.setAttribute("aria-expanded", open ? "true" : "false");
        });
        startMenu.addEventListener("click", function (e) {
          if (e.target.closest("a")) { startMenu.setAttribute("hidden", ""); start.setAttribute("aria-expanded", "false"); }
        });
      }
      root.querySelectorAll("[data-jump]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var target = root.querySelector("#" + btn.getAttribute("data-jump"));
          if (!target) return;
          var body = target.querySelector("." + P + "win-body");
          var toggle = target.querySelector("." + P + "win-toggle");
          if (body && body.hasAttribute("hidden")) {
            body.removeAttribute("hidden");
            if (toggle) { toggle.setAttribute("aria-expanded", "true"); toggle.classList.remove("is-closed"); }
          }
          target.scrollIntoView({ behavior: (CW.anim && CW.anim.prefersReduced && CW.anim.prefersReduced()) ? "auto" : "smooth", block: "start" });
        });
      });

      // Live clock in the menu bar.
      var clock = root.querySelector("#cw-retro-clock");
      if (clock) {
        var tick = function () {
          var d = new Date();
          clock.textContent = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
        };
        tick();
        setInterval(tick, 30000);
      }
    }
  };
})();
