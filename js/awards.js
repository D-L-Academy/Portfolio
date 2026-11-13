/* ==========================================================================
   AWARDS PAGE SCRIPT
   Renders achievement cards from js/awards-data.js. Each card reveals on its own, sliding in from its own
   side, only once it has scrolled well into view.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var list = document.getElementById('awards-list');
  if (!list) return;

  var awards = (window.AWARDS_DEFAULTS || []).slice()
    .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var ICON = function (name) { return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; };
  var TAG_CLASS = { orange: 'tag--orange', blue: 'tag--blue' };

  if (!awards.length) {
    list.innerHTML = '<p class="loading-note">Awards will appear here soon.</p>';
    return;
  }

  list.innerHTML = awards.map(function (a, i) {
    var isYear = /^\d{4}$/.test(String(a.year || '').trim());
    var yearHtml = isYear ? '<span class="award__year">' + esc(a.year) + '</span>' : '<span class="award__year award__year--text">' + esc(a.year || '') + '</span>';
    return (
      '<div class="award" id="' + esc(a.id) + '">' +
        '<article class="award__card award__card--' + esc(a.color || 'blue') + '" aria-labelledby="award-title-' + (i + 1) + '">' +
          '<div class="award__side">' +
            '<div class="medal"><span class="medal__core">' + ICON(a.icon || 'award') + '</span></div>' +
            yearHtml +
          '</div>' +
          '<div class="award__body">' +
            '<span class="tag ' + (TAG_CLASS[a.color] || 'tag--blue') + '">' + esc(a.kind || 'Award') + '</span>' +
            '<h2 class="award__title" id="award-title-' + (i + 1) + '">' + esc(a.title) + '</h2>' +
            '<div class="award__facts">' +
              '<div><p class="award__label">' + ICON('users') + esc(a.byLabel || 'Given by') + '</p><p class="award__value">' + esc(a.by || '') + '</p></div>' +
              '<div><p class="award__label">' + ICON('star') + 'Why it matters</p><p class="award__value award__value--soft">' + esc(a.why || '') + '</p></div>' +
            '</div>' +
          '</div>' +
        '</article>' +
      '</div>'
    );
  }).join('');

  var cards = Array.prototype.slice.call(list.querySelectorAll('.award'));

  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      var seen = entries.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) {
        return a.boundingClientRect.top - b.boundingClientRect.top;
      });
      seen.forEach(function (e, i) {
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
