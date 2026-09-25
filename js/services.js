/* ==========================================================================
   SERVICES PAGE SCRIPT — service cards reveal one after another as they
   scroll into view (fade + rise + un-blur, staggered).
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cards = Array.prototype.slice.call(document.querySelectorAll('.svc-item'));
  if (!cards.length) return;

  function reveal(el, i) {
    el.style.transitionDelay = (i * 0.14).toFixed(2) + 's';
    el.classList.add('is-in');
    // clear the delay afterwards so hover effects respond instantly
    setTimeout(function () { el.style.transitionDelay = ''; }, 1600 + i * 140);
  }

  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      var seen = entries.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) {
        return (a.boundingClientRect.top - b.boundingClientRect.top) || (a.boundingClientRect.left - b.boundingClientRect.left);
      });
      seen.forEach(function (e, i) { reveal(e.target, i); io.unobserve(e.target); });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    cards.forEach(function (el) { io.observe(el); });
  } else {
    cards.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
