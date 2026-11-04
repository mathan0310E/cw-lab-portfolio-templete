/*
 * CWLABS Portfolio Builder — public portfolio page.
 *
 * Resolves the portfolio from the URL:
 *   portfolio.html?u=<slug>        -> published snapshot for that slug
 *   portfolio.html?preview=1       -> the current draft (used for full-page preview)
 *
 * Rendering goes through the same CW.renderer used by the editor preview, so a
 * published page and its preview are pixel-identical by construction.
 */
(function () {
  "use strict";

  var CW = window.CW;
  var U = CW.util;
  var root = document.getElementById("cw-root");

  function params() {
    var out = {};
    var q = window.location.search.replace(/^\?/, "");
    q.split("&").forEach(function (pair) {
      if (!pair) return;
      var kv = pair.split("=");
      out[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
    });
    return out;
  }

  function missing(message) {
    root.innerHTML =
      '<div class="cw-pub-missing">' +
        "<h1>Portfolio unavailable</h1>" +
        "<p>" + U.esc(message) + "</p>" +
        '<p><a href="index.html">Open the CWLABS Portfolio Builder</a></p>' +
      "</div>";
  }

  function loadTemplateAssets(templateId) {
    var meta = CW.registry.get(templateId);
    if (!meta) return Promise.resolve();
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = meta.css;
    document.head.appendChild(css);
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = meta.js;
      s.onload = function () { resolve(); };
      s.onerror = function () { resolve(); };
      document.head.appendChild(s);
    });
  }

  function render(record) {
    if (!record) { missing("No published portfolio was found for this address."); return; }
    var templateId = (record.meta && record.meta.templateId) || "template-18";
    var data = CW.adapter.normalize(record, templateId);

    document.title = data.basics.fullName
      ? data.basics.fullName + (data.basics.role ? " — " + data.basics.role : "")
      : "Portfolio — CWLABS";
    var desc = CW.renderer.metaDescription(data);
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", desc);

    if (CW.anim && CW.anim.applyMotionFlag) CW.anim.applyMotionFlag();
    loadTemplateAssets(templateId).then(function () {
      CW.renderer.mount(root, data, templateId);
    });
  }

  /**
   * Allow ?t=<templateId> to render the current record through a chosen
   * template without altering the saved selection. Used by per-template
   * preview links; ignored when the id is unknown.
   */
  function withTemplateOverride(record, templateId) {
    if (!record || !templateId || !CW.registry.get(templateId)) return record;
    var copy = JSON.parse(JSON.stringify(record));
    copy.meta = copy.meta || {};
    copy.meta.templateId = templateId;
    return copy;
  }

  function boot() {
    var p = params();
    if (p.preview === "1") {
      var draft = CW.store.getDraft();
      render(withTemplateOverride(draft, p.t));
      return;
    }
    if (p.u) {
      var published = CW.store.getPublishedBySlug(p.u);
      render(published);
      return;
    }
    // No slug supplied: fall back to the draft so the page is never blank.
    render(CW.store.getDraft());
  }

  boot();
})();
