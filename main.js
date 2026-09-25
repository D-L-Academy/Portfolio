/* ==========================================================================
   JAWAD PORTFOLIO — SHARED SCRIPT (loaded on every page)
   Navigation, scroll reveal, drifting background particles, footer year.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navigation ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var toggle = nav.querySelector('.nav__toggle');
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      if (toggle) {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      }
    };
    if (toggle) {
      toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
      nav.querySelectorAll('.nav__menu a').forEach(function (a) {
        a.addEventListener('click', function () { setOpen(false); });
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
      document.addEventListener('click', function (e) {
        if (nav.classList.contains('is-open') && !nav.contains(e.target)) setOpen(false);
      });
    }
  }

  /* ---------- Scroll reveal: fade + slide in once ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Background particles: soft blurred dots that drift and pulse ---------- */
  var wrap = document.querySelector('.particles');
  if (wrap && !reduced) {
    var count = window.innerWidth < 700 ? 14 : 26;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var p = document.createElement('span');
      p.className = 'particle';
      var rgb = Math.random() < 0.5 ? '255,145,66' : '92,200,255';
      p.style.cssText =
        '--x:' + (Math.random() * 100).toFixed(1) + '%;' +
        '--y:' + (25 + Math.random() * 75).toFixed(1) + '%;' +
        '--s:' + (5 + Math.random() * 13).toFixed(1) + 'px;' +
        '--dur:' + (18 + Math.random() * 24).toFixed(1) + 's;' +
        '--delay:-' + (Math.random() * 30).toFixed(1) + 's;' +
        '--dx:' + (Math.random() * 80 - 40).toFixed(0) + 'px;' +
        '--po:' + (0.35 + Math.random() * 0.45).toFixed(2) + ';' +
        '--pc:rgba(' + rgb + ',0.9);';
      frag.appendChild(p);
    }
    wrap.appendChild(frag);
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
