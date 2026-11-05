/*
 * TEMPLATE 6 — SIDEBAR (existing CWLABS reference template, recreated to the
 * same rendering contract). Persistent left sidebar navigation with a
 * scrollable content column and scroll-spy active state. Namespaced: cw-sidebar-
 */
(function () {
  "use strict";
  var CW = (window.CW = window.CW || {});
  var U = CW.util;
  var P = "cw-sidebar-";

  var NAV = [["about", "About"], ["projects", "Projects"], ["skills", "Skills"], ["experience", "Experience"], ["education", "Education"], ["contact", "Contact"]];

  function sidebar(data) {
    var b = data.basics, l = data.links;
    var links = [l.github ? ["GitHub", l.github] : null, l.linkedin ? ["LinkedIn", l.linkedin] : null, l.website ? ["Website", l.website] : null, l.twitter ? ["Twitter", l.twitter] : null]
      .filter(Boolean).concat(l.other.map(function (o) { return [o.label, o.url]; }));
    return (
      '<aside class="' + P + 'rail">' +
        '<div class="' + P + 'id">' +
          '<div class="' + P + 'avatar">' + (b.profileImage
            ? U.image(b.profileImage, b.fullName || "Portrait", P + "avatar-img", "", true)
            : '<span class="' + P + 'avatar-fallback">' + U.monogram(b.fullName) + "</span>") + "</div>" +
          '<h1 class="' + P + 'name">' + U.esc(b.fullName || "Your Name") + "</h1>" +
          (b.role ? '<p class="' + P + 'role">' + U.esc(b.role) + "</p>" : "") +
        "</div>" +
        '<nav class="' + P + 'nav" aria-label="Sections">' + NAV.map(function (n) {
          return '<a href="#' + n[0] + '" data-nav="' + n[0] + '">' + U.esc(n[1]) + "</a>";
        }).join("") + "</nav>" +
        (links.length ? '<ul class="' + P + 'social">' + links.map(function (x) { return "<li>" + U.link(x[1], x[0], P + "link") + "</li>"; }).join("") + "</ul>" : "") +
      "</aside>"
    );
  }

  function section(id, title, body) {
    return '<section class="' + P + 'section" id="' + id + '"><h2 class="' + P + 'h2" data-cw-reveal>' + U.esc(title) + "</h2>" + body + "</section>";
  }

  function content(data) {
    var out = "";
    if (data.basics.tagline || data.basics.bio) {
      out += '<section class="' + P + 'intro" id="top">' +
        (data.basics.tagline ? '<p class="' + P + 'tag" data-cw-reveal>' + U.esc(data.basics.tagline) + "</p>" : "") +
        (data.basics.bio ? '<div class="' + P + 'prose" data-cw-reveal>' + U.paragraphs(data.basics.bio) + "</div>" : "") + "</section>";
    }
    if (data.has.projects) out += section("projects", "Projects", '<div class="' + P + 'cards">' + data.projects.map(function (p) {
      return '<article class="' + P + 'card" data-cw-reveal>' +
        (p.image ? '<div class="' + P + 'card-media">' + U.image(p.image, p.name, P + "card-img") + "</div>" : "") +
        "<h3>" + U.esc(p.name) + "</h3>" + (p.description ? "<p>" + U.esc(p.description) + "</p>" : "") +
        (p.technologies.length ? '<p class="' + P + 'tech">' + p.technologies.map(U.esc).join(" \u00B7 ") + "</p>" : "") +
        '<p class="' + P + 'card-links">' + (p.url ? U.link(p.url, "Visit", P + "link") : "") + (p.repo ? U.link(p.repo, "Code", P + "link") : "") + "</p></article>";
    }).join("") + "</div>");
    if (data.has.skills) out += section("skills", "Skills", '<div class="' + P + 'skills">' + data.skillGroups.map(function (g) {
      return '<div class="' + P + 'skill-col" data-cw-reveal><h3>' + U.esc(g.category) + "</h3><ul>" + g.skills.map(function (s) {
        return "<li>" + U.esc(s.name) + (s.level !== null ? '<span class="' + P + 'bar"><i style="width:' + s.level + '%"></i></span>' : "") + "</li>";
      }).join("") + "</ul></div>";
    }).join("") + "</div>");
    if (data.has.experience) out += section("experience", "Experience", '<div class="' + P + 'rows">' + data.experienceSorted.map(function (e) {
      return '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
        '<span class="' + P + 'row-body"><strong>' + U.esc(e.role) + "</strong>" + (e.company ? "<em>" + U.esc(e.company) + "</em>" : "") + (e.description ? "<span>" + U.esc(e.description) + "</span>" : "") + "</span></div>";
    }).join("") + "</div>");
    if (data.has.education) out += section("education", "Education", '<div class="' + P + 'rows">' + data.education.map(function (e) {
      return '<div class="' + P + 'row" data-cw-reveal><span class="' + P + 'when">' + U.esc(U.dateRange(e.startDate, e.endDate)) + "</span>" +
        '<span class="' + P + 'row-body"><strong>' + U.esc(e.degree) + "</strong>" + (e.institution ? "<em>" + U.esc(e.institution) + "</em>" : "") + "</span></div>";
    }).join("") + "</div>");
    out += section("contact", "Contact", '<div class="' + P + 'contact">' +
      (data.basics.email ? '<a class="' + P + 'mail" href="mailto:' + U.esc(data.basics.email) + '">' + U.esc(data.basics.email) + "</a>" : "") +
      (data.basics.location ? '<p class="' + P + 'loc">' + U.esc(data.basics.location) + "</p>" : "") + "</div>");
    return out;
  }

  CW.templates["template-6"] = {
    id: "template-6",
    render: function (data) {
      return '<div class="' + P + 'page">' + sidebar(data) + '<main class="' + P + 'main">' + content(data) + "</main></div>";
    },
    init: function (root) {
      if (!root) return;
      if (CW.anim) CW.anim.reveal(root);
      // Scroll-spy: highlight the nav link for the section in view.
      var links = Array.prototype.slice.call(root.querySelectorAll("[" + "data-nav]"));
      if (!links.length || !("IntersectionObserver" in window)) return;
      var map = {};
      links.forEach(function (a) { map[a.getAttribute("data-nav")] = a; });
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = en.target.id;
          links.forEach(function (a) { a.classList.remove("is-active"); });
          if (map[id]) map[id].classList.add("is-active");
        });
      }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });
      Object.keys(map).forEach(function (id) {
        var sec = root.querySelector("#" + id);
        if (sec) spy.observe(sec);
      });
    }
  };
})();
