/*
 * CWLABS Portfolio Builder — editor application.
 *
 * Responsibilities:
 *  - render the template selector from CW.registry
 *  - render the content editor bound to the draft record
 *  - keep the live preview in sync (same renderer as the published page)
 *  - save, publish and unpublish
 *
 * Templates are loaded dynamically: only the selected template's stylesheet and
 * script are pulled into the editor document, so 17 templates never conflict.
 */
(function () {
  "use strict";

  var CW = window.CW;
  var U = CW.util;
  var store = CW.store;

  var el = {
    templates: document.getElementById("cw-templates"),
    editor: document.getElementById("cw-editor"),
    preview: document.getElementById("cw-preview"),
    frameWrap: document.getElementById("cw-frame-wrap"),
    status: document.getElementById("cw-status"),
    pub: document.getElementById("cw-pub"),
    publish: document.getElementById("cw-publish"),
    unpublish: document.getElementById("cw-unpublish"),
    reset: document.getElementById("cw-reset"),
    openTab: document.getElementById("cw-open-tab")
  };

  var state = {
    draft: store.getDraft(),
    templateId: (store.getDraft().meta && store.getDraft().meta.templateId) || "template-18",
    filter: "all",
    view: "desktop",
    loadedCss: {},
    loadedJs: {}
  };

  /* ---------- template asset loading ---------- */

  function loadCss(href) {
    if (!href || state.loadedCss[href]) return;
    state.loadedCss[href] = true;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-cw-tpl-css", href);
    document.head.appendChild(link);
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (!src) return resolve();
      if (state.loadedJs[src]) return resolve();
      var s = document.createElement("script");
      s.src = src;
      s.onload = function () { state.loadedJs[src] = true; resolve(); };
      s.onerror = function () { reject(new Error("Failed to load " + src)); };
      document.head.appendChild(s);
    });
  }

  /* ---------- status ---------- */

  var statusTimer = null;
  function setStatus(msg, tone) {
    el.status.textContent = msg;
    el.status.setAttribute("data-tone", tone || "");
    if (statusTimer) clearTimeout(statusTimer);
    statusTimer = setTimeout(function () {
      el.status.textContent = "Draft saved";
      el.status.setAttribute("data-tone", "");
    }, 2600);
  }

  /* ---------- template selector ---------- */

  function renderTemplates() {
    el.templates.innerHTML = CW.registry.all
      .filter(function (t) { return state.filter === "all" || t.tag === state.filter; })
      .map(function (t) {
        var selected = t.id === state.templateId;
        return (
          '<button type="button" class="cw-tpl' + (selected ? " is-selected" : "") + '"' +
            ' role="option" aria-selected="' + selected + '" data-id="' + t.id + '">' +
            '<span class="cw-tpl__thumb" style="--cw-accent:' + U.esc(t.accent) + '">' +
              '<img src="' + U.escUrl(t.thumb) + '" alt="' + U.esc(t.name) + ' template thumbnail" loading="lazy" width="320" height="200">' +
              (t.tag && t.tag !== "Classic" ? '<span class="cw-tpl__badge">' + U.esc(t.tag) + "</span>" : "") +
            "</span>" +
            '<span class="cw-tpl__meta">' +
              '<strong>' + U.esc(t.name) + "</strong>" +
              "<span>" + U.esc(t.description) + "</span>" +
            "</span>" +
          "</button>"
        );
      }).join("");
  }

  el.templates.addEventListener("click", function (e) {
    var btn = e.target.closest(".cw-tpl");
    if (!btn) return;
    selectTemplate(btn.getAttribute("data-id"));
  });

  document.querySelectorAll(".cw-filter .cw-chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      state.filter = chip.getAttribute("data-filter");
      document.querySelectorAll(".cw-filter .cw-chip").forEach(function (c) { c.classList.toggle("is-active", c === chip); });
      renderTemplates();
    });
  });

  function selectTemplate(id) {
    if (!CW.registry.exists(id)) return;
    state.templateId = id;
    state.draft.meta = state.draft.meta || {};
    state.draft.meta.templateId = id;
    store.saveDraft(state.draft);
    renderTemplates();
    updatePreview();
    setStatus("Applied " + CW.registry.get(id).name, "ok");
  }

  /* ---------- preview ---------- */

  function updatePreview() {
    var meta = CW.registry.get(state.templateId) || {};
    loadCss(meta.css);
    loadScript(meta.js).then(function () {
      var data = CW.adapter.normalize(state.draft, state.templateId);
      var html = CW.renderer.buildDocument({ data: data, templateId: state.templateId });
      el.preview.setAttribute("srcdoc", html);
      el.preview.setAttribute("title", (data.basics.fullName || "Portfolio") + " preview — " + (meta.name || ""));
    }).catch(function (err) {
      setStatus("Preview error", "warn");
      if (window.console) console.error(err);
    });
  }

  document.querySelectorAll(".cw-viewport .cw-chip[data-view]").forEach(function (chip) {
    chip.addEventListener("click", function () {
      state.view = chip.getAttribute("data-view");
      document.querySelectorAll(".cw-viewport .cw-chip[data-view]").forEach(function (c) {
        var on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", on ? "true" : "false");
      });
      el.frameWrap.setAttribute("data-view", state.view);
    });
  });

  el.openTab.addEventListener("click", function () {
    var w = window.open("", "_blank");
    if (!w) { setStatus("Allow pop-ups to open the preview", "warn"); return; }
    var data = CW.adapter.normalize(state.draft, state.templateId);
    w.document.open();
    w.document.write(CW.renderer.buildDocument({ data: data, templateId: state.templateId }));
    w.document.close();
  });

  /* ---------- editor ---------- */

  var FIELDS = {
    basics: [
      ["fullName", "Full name", "text"],
      ["role", "Professional role", "text"],
      ["tagline", "Tagline", "text"],
      ["location", "Location", "text"],
      ["email", "Contact email", "email"],
      ["bio", "Biography", "textarea"],
      ["profileImage", "Profile photo URL", "text"],
      ["coverImage", "Cover image URL", "text"]
    ],
    links: [
      ["github", "GitHub", "text"],
      ["linkedin", "LinkedIn", "text"],
      ["website", "Website", "text"],
      ["twitter", "Twitter / X", "text"]
    ]
  };

  function field(label, value, path, type) {
    var id = "f-" + path.replace(/\./g, "-");
    var control;
    if (type === "textarea") {
      control = '<textarea id="' + id + '" data-path="' + path + '" rows="6">' + U.esc(value) + "</textarea>";
    } else {
      control = '<input id="' + id + '" type="' + type + '" data-path="' + path + '" value="' + U.esc(value) + '">';
    }
    return '<label class="cw-field" for="' + id + '"><span>' + U.esc(label) + "</span>" + control + "</label>";
  }

  function group(title, body, open) {
    return (
      '<details class="cw-group"' + (open ? " open" : "") + ">" +
        "<summary>" + U.esc(title) + "</summary>" +
        '<div class="cw-group__body">' + body + "</div>" +
      "</details>"
    );
  }

  function repeatRow(title, fieldsHtml, index, list, removePath) {
    return (
      '<fieldset class="cw-row" data-list="' + U.esc(removePath) + '" data-index="' + index + '">' +
        '<legend>' + U.esc(title) + "</legend>" +
        fieldsHtml +
        '<button type="button" class="cw-btn cw-btn--tiny cw-btn--danger" data-remove="' + U.esc(removePath) + '" data-index="' + index + '">Remove</button>' +
      "</fieldset>"
    );
  }

  function renderEditor() {
    var d = state.draft;
    var b = d.basics || {};
    var l = d.links || {};

    var html = "";
    html += group("Basics",
      FIELDS.basics.map(function (f) { return field(f[1], b[f[0]] || "", "basics." + f[0], f[2]); }).join(""),
      true);
    html += group("Links",
      FIELDS.links.map(function (f) { return field(f[1], l[f[0]] || "", "links." + f[0], f[2]); }).join(""),
      false);

    // Skills
    var skills = (d.skills || []).map(function (s, i) {
      return repeatRow("Skill " + (i + 1),
        field("Name", s.name, "skills." + i + ".name", "text") +
        field("Category", s.category, "skills." + i + ".category", "text") +
        field("Level (0-100)", s.level == null ? "" : s.level, "skills." + i + ".level", "number"),
        i, d.skills, "skills");
    }).join("");
    html += group("Skills (" + (d.skills || []).length + ")", skills + addBtn("Add skill", "skills"), false);

    // Projects
    var projects = (d.projects || []).map(function (p, i) {
      return repeatRow("Project " + (i + 1),
        field("Name", p.name, "projects." + i + ".name", "text") +
        field("Description", p.description, "projects." + i + ".description", "textarea") +
        field("Technologies (comma separated)", (p.technologies || []).join(", "), "projects." + i + ".technologies", "text") +
        field("Image URL", p.image, "projects." + i + ".image", "text") +
        field("Live URL", p.url, "projects." + i + ".url", "text") +
        field("Repository", p.repo, "projects." + i + ".repo", "text"),
        i, d.projects, "projects");
    }).join("");
    html += group("Projects (" + (d.projects || []).length + ")", projects + addBtn("Add project", "projects"), false);

    // Experience
    var experience = (d.experience || []).map(function (e, i) {
      return repeatRow("Role " + (i + 1),
        field("Position", e.role, "experience." + i + ".role", "text") +
        field("Organisation", e.company, "experience." + i + ".company", "text") +
        field("Description", e.description, "experience." + i + ".description", "textarea") +
        field("Start (YYYY-MM)", e.startDate, "experience." + i + ".startDate", "text") +
        field("End (YYYY-MM)", e.endDate, "experience." + i + ".endDate", "text"),
        i, d.experience, "experience");
    }).join("");
    html += group("Experience (" + (d.experience || []).length + ")", experience + addBtn("Add experience", "experience"), false);

    // Education
    var education = (d.education || []).map(function (e, i) {
      return repeatRow("Education " + (i + 1),
        field("Degree", e.degree, "education." + i + ".degree", "text") +
        field("Institution", e.institution, "education." + i + ".institution", "text") +
        field("Description", e.description, "education." + i + ".description", "textarea") +
        field("Start (YYYY-MM)", e.startDate, "education." + i + ".startDate", "text") +
        field("End (YYYY-MM)", e.endDate, "education." + i + ".endDate", "text"),
        i, d.education, "education");
    }).join("");
    html += group("Education (" + (d.education || []).length + ")", education + addBtn("Add education", "education"), false);

    // Certificates
    var certificates = (d.certificates || []).map(function (c, i) {
      return repeatRow("Certificate " + (i + 1),
        field("Name", c.name, "certificates." + i + ".name", "text") +
        field("Issuer", c.issuer, "certificates." + i + ".issuer", "text") +
        field("Issue date", c.date, "certificates." + i + ".date", "text") +
        field("Image / document URL", c.image, "certificates." + i + ".image", "text") +
        field("Verification link", c.verifyUrl, "certificates." + i + ".verifyUrl", "text"),
        i, d.certificates, "certificates");
    }).join("");
    html += group("Certificates (" + (d.certificates || []).length + ")", certificates + addBtn("Add certificate", "certificates"), false);

    // Achievements
    var achievements = (d.achievements || []).map(function (a, i) {
      return repeatRow("Achievement " + (i + 1),
        field("Title", a.title, "achievements." + i + ".title", "text") +
        field("Description", a.description, "achievements." + i + ".description", "textarea") +
        field("Date", a.date, "achievements." + i + ".date", "text"),
        i, d.achievements, "achievements");
    }).join("");
    html += group("Achievements (" + (d.achievements || []).length + ")", achievements + addBtn("Add achievement", "achievements"), false);

    // Publications
    var publications = (d.publications || []).map(function (p, i) {
      return repeatRow("Publication " + (i + 1),
        field("Title", p.title, "publications." + i + ".title", "text") +
        field("Description", p.description, "publications." + i + ".description", "textarea") +
        field("Date", p.date, "publications." + i + ".date", "text") +
        field("URL", p.url, "publications." + i + ".url", "text"),
        i, d.publications, "publications");
    }).join("");
    html += group("Publications (" + (d.publications || []).length + ")", publications + addBtn("Add publication", "publications"), false);

    // Writeups
    var writeups = (d.writeups || []).map(function (w, i) {
      return repeatRow("Writeup " + (i + 1),
        field("Title", w.title, "writeups." + i + ".title", "text") +
        field("Description", w.description, "writeups." + i + ".description", "textarea") +
        field("Date", w.date, "writeups." + i + ".date", "text") +
        field("URL", w.url, "writeups." + i + ".url", "text"),
        i, d.writeups, "writeups");
    }).join("");
    html += group("Technical writeups (" + (d.writeups || []).length + ")", writeups + addBtn("Add writeup", "writeups"), false);

    el.editor.innerHTML = html;
  }

  function addBtn(label, listName) {
    return '<button type="button" class="cw-btn cw-btn--tiny" data-add="' + U.esc(listName) + '">+ ' + U.esc(label) + "</button>";
  }

  function setPath(obj, path, value) {
    var parts = path.split(".");
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      var k = parts[i];
      if (cur[k] === undefined || cur[k] === null) cur[k] = /^\d+$/.test(parts[i + 1]) ? [] : {};
      cur = cur[k];
    }
    cur[parts[parts.length - 1]] = value;
  }

  var saveTimer = null;
  el.editor.addEventListener("input", function (e) {
    var t = e.target;
    if (!t.hasAttribute("data-path")) return;
    var path = t.getAttribute("data-path");
    var value = t.type === "number" ? (t.value === "" ? null : Number(t.value)) : t.value;
    if (path.endsWith(".technologies")) {
      value = CW.adapter.toStringList(value);
    }
    setPath(state.draft, path, value);
    store.saveDraft(state.draft);
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(updatePreview, 260);
    setStatus("Draft saved");
  });

  el.editor.addEventListener("click", function (e) {
    var add = e.target.closest("[data-add]");
    if (add) {
      var listName = add.getAttribute("data-add");
      var blank = {
        skills: { name: "", category: "", level: null },
        projects: { name: "", description: "", technologies: [], image: "", url: "", repo: "" },
        experience: { role: "", company: "", description: "", startDate: "", endDate: "" },
        education: { degree: "", institution: "", description: "", startDate: "", endDate: "" },
        certificates: { name: "", issuer: "", date: "", image: "", verifyUrl: "" },
        achievements: { title: "", description: "", date: "" },
        publications: { title: "", description: "", date: "", url: "" },
        writeups: { title: "", description: "", date: "", url: "" }
      }[listName];
      state.draft[listName] = state.draft[listName] || [];
      state.draft[listName].push(blank);
      store.saveDraft(state.draft);
      renderEditor();
      updatePreview();
      return;
    }
    var rm = e.target.closest("[data-remove]");
    if (rm) {
      var name = rm.getAttribute("data-remove");
      var idx = Number(rm.getAttribute("data-index"));
      if (state.draft[name]) state.draft[name].splice(idx, 1);
      store.saveDraft(state.draft);
      renderEditor();
      updatePreview();
    }
  });

  /* ---------- publish / unpublish ---------- */

  el.publish.addEventListener("click", function () {
    var data = CW.adapter.normalize(state.draft, state.templateId);
    if (!data.basics.fullName) {
      setStatus("Add your name before publishing", "warn");
      return;
    }
    var slug = data.meta.slug || store.slugify(data.basics.fullName);
    state.draft.meta = state.draft.meta || {};
    state.draft.meta.slug = slug;
    state.draft.meta.templateId = state.templateId;
    store.publish(state.draft);
    renderPub();
    setStatus("Published", "ok");
  });

  el.unpublish.addEventListener("click", function () {
    var slug = (state.draft.meta && state.draft.meta.slug) || store.slugify(state.draft.basics.fullName);
    store.unpublish(slug);
    renderPub();
    setStatus("Unpublished", "warn");
  });

  el.reset.addEventListener("click", function () {
    state.draft = store.resetDraft();
    state.templateId = state.draft.meta.templateId || "template-18";
    renderTemplates();
    renderEditor();
    updatePreview();
    setStatus("Data reset", "warn");
  });

  function renderPub() {
    var slug = store.publishedSlug();
    if (slug) {
      var url = "portfolio.html?u=" + encodeURIComponent(slug);
      el.pub.innerHTML = "Published at <a href=\"" + U.escUrl(url) + "\" target=\"_blank\" rel=\"noopener\">" + U.esc(url) + "</a>";
    } else {
      el.pub.textContent = "Not published yet.";
    }
  }

  /* ---------- boot ---------- */

  /**
   * ?t=<templateId> opens the editor with that template selected. Used by the
   * preview gallery's "Edit" links; ignored when the id is unknown.
   */
  function templateFromQuery() {
    var m = /[?&]t=([^&]+)/.exec(window.location.search);
    var id = m && decodeURIComponent(m[1]);
    return id && CW.registry.get(id) ? id : null;
  }

  function boot() {
    if (CW.anim && CW.anim.applyMotionFlag) CW.anim.applyMotionFlag();
    state.draft.meta = state.draft.meta || {};
    var requested = templateFromQuery();
    if (requested) {
      state.draft.meta.templateId = requested;
      store.saveDraft(state.draft);
    }
    state.templateId = state.draft.meta.templateId || "template-18";
    renderTemplates();
    renderEditor();
    updatePreview();
    renderPub();
  }

  boot();
})();
