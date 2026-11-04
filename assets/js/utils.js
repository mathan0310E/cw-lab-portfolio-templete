/*
 * CWLABS Portfolio Builder — shared rendering utilities.
 * Every template uses these helpers so escaping, image fallbacks and link
 * handling stay consistent and safe across the whole builder.
 */
(function () {
  "use strict";

  var CW = (window.CW = window.CW || {});

  /** Escape a value for safe insertion into HTML text/attribute context. */
  function esc(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** Escape a value for use inside a URL attribute (src/href). */
  function escUrl(value) {
    var s = String(value == null ? "" : value).trim();
    if (!s) return "";
    if (/^(javascript|data:text\/html|vbscript):/i.test(s)) return "";
    return esc(s);
  }

  /** True when a non-empty string is present. */
  function has(value) {
    return value !== null && value !== undefined && String(value).trim() !== "";
  }

  /** True when an array has at least one item. */
  function hasItems(list) {
    return Array.isArray(list) && list.length > 0;
  }

  /** Initials for avatar fallbacks. */
  function initials(name) {
    if (!has(name)) return "CW";
    var parts = String(name).trim().split(/\s+/).slice(0, 2);
    return parts
      .map(function (p) {
        return p.charAt(0).toUpperCase();
      })
      .join("");
  }

  /**
   * Render an image with a graceful fallback. When no src is supplied the
   * caller-provided fallback markup is used instead, so templates never show a
   * broken image icon.
   */
  function image(src, alt, className, fallbackHtml, eager) {
    if (!has(src)) return fallbackHtml || "";
    var cls = className ? ' class="' + esc(className) + '"' : "";
    return (
      '<img src="' +
      escUrl(src) +
      '" alt="' +
      esc(alt || "") +
      '"' +
      cls +
      ' loading="' + (eager ? "eager" : "lazy") + '" decoding="async" onerror="this.style.display=\'none\'">'
    );
  }

  /** Build an inline SVG monogram used when a profile photo is missing. */
  function monogram(name, className) {
    var cls = className ? ' class="' + esc(className) + '"' : "";
    return (
      '<span' +
      cls +
      ' aria-hidden="true">' +
      esc(initials(name)) +
      "</span>"
    );
  }

  /** Format a "YYYY-MM" or "YYYY" value into a readable label. */
  var MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  function fmtDate(value) {
    if (!has(value)) return "";
    var s = String(value).trim();
    var m = s.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/);
    if (m) {
      var month = parseInt(m[2], 10);
      if (month >= 1 && month <= 12) return MONTHS[month - 1] + " " + m[1];
      return m[1];
    }
    var y = s.match(/^(\d{4})$/);
    if (y) return y[1];
    return s;
  }

  /** Human range like "Jun 2025 — Dec 2025" or "Aug 2022 — Present". */
  function dateRange(start, end) {
    var a = fmtDate(start);
    var b = fmtDate(end);
    if (a && b) return a + " \u2014 " + b;
    if (a && !b) return a + " \u2014 Present";
    if (!a && b) return b;
    return "";
  }

  /** Sort key from a date-ish string (YYYY-MM -> number), newest first. */
  function sortKey(dateStr) {
    if (!has(dateStr)) return 0;
    var m = String(dateStr).match(/^(\d{4})(?:-(\d{1,2}))?/);
    if (!m) return 0;
    return parseInt(m[1], 10) * 100 + (m[2] ? parseInt(m[2], 10) : 0);
  }

  /** Safe external link: adds rel/target so outbound links cannot hijack. */
  function link(url, label, className, attrs) {
    var href = escUrl(url);
    if (!href) return "";
    var cls = className ? ' class="' + esc(className) + '"' : "";
    var extra = attrs ? " " + attrs : "";
    return (
      '<a href="' +
      href +
      '" target="_blank" rel="noopener noreferrer nofollow"' +
      cls +
      extra +
      ">" +
      esc(label) +
      "</a>"
    );
  }

  /** Strip protocol + trailing slash for display. */
  function prettyUrl(url) {
    return String(url || "")
      .replace(/^https?:\/\//i, "")
      .replace(/\/+$/, "");
  }

  /** Reduce "Full Name" to a first name for friendly headings. */
  function firstName(name) {
    if (!has(name)) return "";
    return String(name).trim().split(/\s+/)[0];
  }

  /** Clamp a skill level to 0-100, returning null when not supplied. */
  function skillLevel(level) {
    if (level === null || level === undefined || level === "") return null;
    var n = Number(level);
    if (isNaN(n)) return null;
    return Math.max(0, Math.min(100, Math.round(n)));
  }

  /** Escape then replace newlines with paragraph breaks. */
  function paragraphs(text) {
    if (!has(text)) return "";
    return String(text)
      .split(/\n{2,}/)
      .map(function (block) {
        return "<p>" + esc(block).replace(/\n/g, "<br>") + "</p>";
      })
      .join("");
  }

  // Templates register themselves on this shared map. It is created here, in
  // the one script loaded by the editor, the preview document and the public
  // page, so a template script can register no matter which context it runs in.
  CW.templates = CW.templates || {};

  CW.util = {
    esc: esc,
    escUrl: escUrl,
    has: has,
    hasItems: hasItems,
    initials: initials,
    image: image,
    monogram: monogram,
    fmtDate: fmtDate,
    dateRange: dateRange,
    sortKey: sortKey,
    link: link,
    prettyUrl: prettyUrl,
    firstName: firstName,
    skillLevel: skillLevel,
    paragraphs: paragraphs
  };
})();
