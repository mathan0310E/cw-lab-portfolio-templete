/*
 * CWLABS Portfolio Builder — shared motion helper.
 *
 * Templates mark elements with `data-cw-reveal` and call `CW.anim.reveal(root)`.
 * A single IntersectionObserver adds `is-in` as elements enter the viewport.
 * Motion is fully disabled when the visitor prefers reduced motion, and the
 * observer is disconnected once every element has been revealed.
 */
(function () {
  "use strict";

  var CW = (window.CW = window.CW || {});

  function prefersReduced() {
    try {
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }

  function reveal(root, selector) {
    var scope = root || document;
    var nodes = Array.prototype.slice.call(
      scope.querySelectorAll(selector || "[data-cw-reveal]")
    );
    if (!nodes.length) return;

    if (prefersReduced() || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    nodes.forEach(function (n) { io.observe(n); });
  }

  /** Add a class to <html> so templates can opt into motion styles. */
  function applyMotionFlag() {
    if (prefersReduced()) document.documentElement.classList.add("cw-reduced-motion");
  }

  CW.anim = { reveal: reveal, prefersReduced: prefersReduced, applyMotionFlag: applyMotionFlag };
})();
