/*
 * CWLABS Portfolio Builder — persistence layer.
 *
 * In the real platform the draft and published records live behind the CWLABS
 * API, scoped to the authenticated user. This module keeps the same contract
 * (getDraft / saveDraft / publish / unpublish / getPublishedBySlug) so the
 * builder can be wired to the API by replacing the transport below without
 * touching the editor or any template.
 *
 * The default transport uses localStorage so the builder runs standalone in
 * development and in static previews.
 */
(function () {
  "use strict";

  var CW = (window.CW = window.CW || {});
  var KEY_DRAFT = "cw_portfolio_draft_v1";
  var KEY_PUBLISHED = "cw_portfolio_published_v1";

  function readJSON(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function deepClone(v) {
    return JSON.parse(JSON.stringify(v));
  }

  function slugify(name) {
    return String(name || "portfolio")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 48) || "portfolio";
  }

  var store = {
    slugify: slugify,

    /** Current working copy of the portfolio (draft). */
    getDraft: function () {
      var d = readJSON(KEY_DRAFT, null);
      if (!d) {
        d = deepClone(window.CW_SAMPLE_DATA || {});
        writeJSON(KEY_DRAFT, d);
      }
      return d;
    },

    /** Persist the working copy. */
    saveDraft: function (draft) {
      return writeJSON(KEY_DRAFT, draft);
    },

    /** Reset the draft back to the seed record. */
    resetDraft: function () {
      var d = deepClone(window.CW_SAMPLE_DATA || {});
      writeJSON(KEY_DRAFT, d);
      return d;
    },

    /** Published snapshots keyed by slug. */
    _published: function () {
      return readJSON(KEY_PUBLISHED, {});
    },

    /** Publish the supplied record under its slug. */
    publish: function (record) {
      var all = store._published();
      var slug = (record.meta && record.meta.slug) || slugify(record.basics && record.basics.fullName);
      record.meta = record.meta || {};
      record.meta.slug = slug;
      record.meta.published = true;
      record.meta.publishedAt = new Date().toISOString();
      all[slug] = deepClone(record);
      writeJSON(KEY_PUBLISHED, all);
      writeJSON(KEY_DRAFT, record);
      return slug;
    },

    /** Remove a published snapshot. */
    unpublish: function (slug) {
      var all = store._published();
      if (slug && all[slug]) {
        delete all[slug];
        writeJSON(KEY_PUBLISHED, all);
      }
      var draft = store.getDraft();
      if (draft && draft.meta && draft.meta.slug === slug) {
        draft.meta.published = false;
        writeJSON(KEY_DRAFT, draft);
      }
      return true;
    },

    /** Fetch a published record for the public portfolio URL. */
    getPublishedBySlug: function (slug) {
      var all = store._published();
      return slug && all[slug] ? all[slug] : null;
    },

    /** Slug currently published (if any) for the draft. */
    publishedSlug: function () {
      var d = store.getDraft();
      if (d && d.meta && d.meta.published && d.meta.slug) return d.meta.slug;
      return null;
    }
  };

  CW.store = store;
})();
