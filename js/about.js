/* ==========================================================================
   ABOUT PAGE SCRIPT — hero counters, timeline milestones lighting up one by
   one, skill meters that fill smoothly when scrolled into view.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function countUp(el, target, decimals, duration, delay) {
    var fmt = function (v) { return v.toFixed(decimals); };
    setTimeout(function () {
      var start = performance.now();
      (function tick(now) {
        var p = Math.min((now - start) / duration, 1);
        el.textContent = fmt(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target);
      })(start);
    }, delay);
  }

  /* ---------- Hero facts: count up ---------- */
  var facts = document.querySelectorAll('[data-count]');
  if (facts.length && hasIO && !reduced) {
    facts.forEach(function (el) { el.textContent = '0'; });
    var fio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = Array.prototype.indexOf.call(facts, e.target);
        countUp(e.target, parseFloat(e.target.dataset.count), 0, 1800, 500 + i * 150);
        fio.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    facts.forEach(function (el) { fio.observe(el); });
  }

  /* ---------- Timeline: milestones light up as they are reached ---------- */
  var timeline = document.querySelector('.timeline');
  var steps = Array.prototype.slice.call(document.querySelectorAll('.tl-item'));
  if (timeline && steps.length) {
    if (hasIO && !reduced) {
      var tio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          timeline.classList.add('is-lit');
          e.target.classList.add('is-in');
          tio.unobserve(e.target);
        });
      }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
      steps.forEach(function (el) { tio.observe(el); });
    } else {
      timeline.classList.add('is-lit');
      steps.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ---------- Skill meters: fill smoothly and count up ---------- */
  var meters = Array.prototype.slice.call(document.querySelectorAll('.meter'));
  meters.forEach(function (m) { m.style.setProperty('--pct', m.dataset.pct + '%'); });
  var pcts = meters.map(function (m) { return m.querySelector('[data-meter-value]'); });

  if (meters.length) {
    if (hasIO && !reduced) {
      pcts.forEach(function (el) { el.textContent = '0'; });
      var mio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var i = meters.indexOf(e.target);
          var delay = i * 220;
          setTimeout(function () { e.target.classList.add('is-in'); }, delay);
          countUp(pcts[i], parseFloat(e.target.dataset.pct), 0, 2100, delay);
          mio.unobserve(e.target);
        });
      }, { threshold: 0.5 });
      meters.forEach(function (m) { mio.observe(m); });
    } else {
      meters.forEach(function (m) { m.classList.add('is-in'); });
    }
  }
})();
