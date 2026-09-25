/* ==========================================================================
   AWARDS PAGE SCRIPT — each achievement card reveals on its own, only once it
   has scrolled well into view (fade + slide in from its side + un-blur).
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cards = Array.prototype.slice.call(document.querySelectorAll('.award'));
  if (!cards.length) return;

  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      var seen = entries.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) {
        return a.boundingClientRect.top - b.boundingClientRect.top;
      });
      seen.forEach(function (e, i) {
        // if two cards arrive together, they still come in one after the other
        e.target.style.transitionDelay = (i * 0.25).toFixed(2) + 's';
        e.target.classList.add('is-in');
        io.unobserve(e.target);
        setTimeout(function () { e.target.style.transitionDelay = ''; }, 1600 + i * 250);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -22% 0px' });
    cards.forEach(function (el) { io.observe(el); });
  } else {
    cards.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
