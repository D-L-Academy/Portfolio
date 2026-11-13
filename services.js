/* ==========================================================================
   SERVICES PAGE SCRIPT
   Renders the service cards from js/services-data.js, then reveals them one after another
   as they scroll into view.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var grid = document.getElementById('svc-grid');
  if (!grid) return;

  var services = (window.SERVICES_DEFAULTS || []).slice()
    .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var ICON = function (name) { return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; };
  var TAG_CLASS = { orange: 'tag--orange', blue: 'tag--blue', mix: 'tag--mix' };

  if (!services.length) {
    grid.innerHTML = '<p class="loading-note">Services will appear here soon.</p>';
    return;
  }

  grid.innerHTML = services.map(function (svc, i) {
    var num = String(i + 1).padStart(2, '0');
    var chips = (svc.chips || []).map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('');
    var priceBadge = svc.price ? '<span class="svc-price">' + esc(svc.price) + '</span>' : '';
    var showcase = svc.wide ? (
      '<div class="lang-showcase" aria-label="Languages I work in">' +
        '<div class="lang-tile"><span class="lang-tile__word">Hello</span><span class="lang-tile__label">English</span></div>' +
        '<div class="lang-tile"><span class="lang-tile__word" lang="ur" dir="rtl">\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064a\u0643\u0645</span><span class="lang-tile__label">Urdu</span></div>' +
        '<div class="lang-tile"><span class="lang-tile__word" lang="ps" dir="rtl">\u0633\u0644\u0627\u0645</span><span class="lang-tile__label">Pashto</span></div>' +
        '<div class="lang-tile"><span class="lang-tile__word">+ more</span><span class="lang-tile__label">Ask me</span></div>' +
      '</div>'
    ) : '';
    return (
      '<div class="svc-item' + (svc.wide ? ' svc-item--wide' : '') + '">' +
        '<article class="svc-card svc-card--' + esc(svc.color || 'orange') + (svc.wide ? ' svc-card--wide' : '') + '">' +
          '<div class="svc-card__top">' +
            '<span class="svc-card__icon">' + ICON(svc.icon || 'star') + '</span>' +
            '<span class="svc-card__num" aria-hidden="true">' + num + '</span>' +
          '</div>' +
          '<div class="svc-card__main">' +
            '<div class="svc-card__badges"><span class="tag ' + (TAG_CLASS[svc.color] || 'tag--orange') + '">' + esc(svc.tag || '') + '</span>' + priceBadge + '</div>' +
            '<h2 class="svc-card__title">' + esc(svc.title) + '</h2>' +
            '<p class="svc-card__desc">' + esc(svc.description) + '</p>' +
            '<ul class="svc-card__list" aria-label="What\'s included">' + chips + '</ul>' +
            '<a class="svc-card__link" href="contact.html">Ask about this service ' + ICON('arrow-right') + '</a>' +
          '</div>' + showcase +
        '</article>' +
      '</div>'
    );
  }).join('');

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.svc-item'));

  function reveal(el, i) {
    el.style.transitionDelay = (i * 0.14).toFixed(2) + 's';
    el.classList.add('is-in');
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
