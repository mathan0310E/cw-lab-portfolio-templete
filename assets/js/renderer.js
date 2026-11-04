/*
 * CWLABS Portfolio Builder — shared renderer.
 *
 * One rendering path powers both the live preview (an iframe built from the
 * generated document) and the published public portfolio page. There is no
 * separate "fake" preview: the preview receives the exact same HTML document
 * that the published page renders, hydrated with the same normalised data.
 */
(function () {
  "use strict";

  var CW = (window.CW = window.CW || {});
  var U = CW.util;

  function baseHref() {
    try {
      return window.location.href.replace(/[^/]*$/, "");
    } catch (e) {
      return "";
    }
  }

  /** Safe JSON for embedding inside a <script> block. */
  function safeJSON(obj) {
    return JSON.stringify(obj)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
  }

  function metaDescription(data) {
    var b = data.basics;
    var text = b.tagline || b.bio || (b.fullName + (b.role ? " — " + b.role : ""));
    text = String(text).replace(/\s+/g, " ").trim();
    return text.length > 155 ? text.slice(0, 152) + "..." : text;
  }

  function socialImage(data) {
    return data.basics.coverImage || data.basics.profileImage || "";
  }

  /** Run a template's render function; returns inner markup. */
  function renderInner(data, templateId) {
    var mod = CW.registry.renderer(templateId);
    if (!mod) {
      return '<div style="padding:40px;font-family:system-ui">Template "' + U.esc(templateId) + '" is not available.</div>';
    }
    try {
      return mod.render(data);
    } catch (e) {
      if (window.console) console.error("[CW] template render failed:", templateId, e);
      return '<div style="padding:40px;font-family:system-ui">This template could not be rendered.</div>';
    }
  }

  /**
   * Build a complete standalone HTML document for a portfolio. Used as the
   * iframe preview source and (with the same markup) as the published page.
   */
  function buildDocument(opts) {
    var data = opts.data;
    var templateId = opts.templateId;
    var meta = CW.registry.get(templateId) || { css: "", js: "" };
    var inner = renderInner(data, templateId);
    var b = data.basics;
    var title = b.fullName ? (b.fullName + (b.role ? " — " + b.role : "")) : "Portfolio";
    var desc = metaDescription(data);
    var img = socialImage(data);
    var base = opts.baseHref || baseHref();

    var head = [
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<title>' + U.esc(title) + "</title>",
      '<meta name="description" content="' + U.esc(desc) + '">',
      '<meta name="robots" content="index,follow">',
      '<meta property="og:type" content="profile">',
      '<meta property="og:title" content="' + U.esc(title) + '">',
      '<meta property="og:description" content="' + U.esc(desc) + '">',
      img ? '<meta property="og:image" content="' + U.escUrl(img) + '">' : "",
      '<meta name="twitter:card" content="summary_large_image">',
      '<link rel="stylesheet" href="' + meta.css + '">'
    ].filter(Boolean).join("\n    ");

    // JSON-LD Person structured data for the published page.
    var ld = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: b.fullName || undefined,
      jobTitle: b.role || undefined,
      description: desc || undefined,
      email: b.email || undefined,
      address: b.location || undefined,
      image: img || undefined,
      url: data.links.website || undefined,
      sameAs: [data.links.github, data.links.linkedin, data.links.twitter]
        .concat(data.links.other.map(function (o) { return o.url; }))
        .filter(Boolean)
    };
    Object.keys(ld).forEach(function (k) { if (ld[k] === undefined) delete ld[k]; });

    var scripts = [
      '<script type="application/ld+json">' + safeJSON(ld) + "<\/script>",
      '<script src="assets/js/utils.js"><\/script>',
      '<script src="assets/js/anim.js"><\/script>',
      '<script src="' + meta.js + '"><\/script>',
      "<script>window.CW_PORTFOLIO_DATA = " + safeJSON(data) + ";<\/script>",
      "<script>(function(){try{var r=document.getElementById('cw-root');var m=window.CW&&CW.templates&&CW.templates['" + templateId + "'];if(m&&typeof m.init==='function'){m.init(r,window.CW_PORTFOLIO_DATA);}}catch(e){if(window.console)console.error('[CW] init failed',e);}})();<\/script>"
    ].join("\n    ");

    return [
      "<!DOCTYPE html>",
      '<html lang="en">',
      "  <head>",
      "    <base href=\"" + U.escUrl(base) + "\">",
      "    " + head,
      "  </head>",
      '  <body class="cw-template-body" data-template="' + U.esc(templateId) + '">',
      '    <div id="cw-root" class="cw-template-root" data-template="' + U.esc(templateId) + '">',
      inner,
      "    </div>",
      "    " + scripts,
      "  </body>",
      "</html>"
    ].join("\n");
  }

  /**
   * Mount a template directly into an existing container (public page). Loads
   * the template stylesheet on demand, renders markup, then runs init.
   */
  function mount(container, data, templateId) {
    var meta = CW.registry.get(templateId);
    if (meta && meta.css && !document.querySelector('link[data-cw-template="' + templateId + '"]')) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = meta.css;
      link.setAttribute("data-cw-template", templateId);
      document.head.appendChild(link);
    }
    container.setAttribute("data-template", templateId);
    container.innerHTML = renderInner(data, templateId);
    var mod = CW.templates[templateId];
    if (mod && typeof mod.init === "function") {
      try { mod.init(container, data); } catch (e) {
        if (window.console) console.error("[CW] init failed", e);
      }
    }
  }

  CW.renderer = {
    buildDocument: buildDocument,
    renderInner: renderInner,
    mount: mount,
    metaDescription: metaDescription
  };
})();
