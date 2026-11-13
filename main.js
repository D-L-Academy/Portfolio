/* ==========================================================================
   JAWAD PORTFOLIO — SHARED SCRIPT (loaded on every page)
   Navigation, smooth scrolling, scroll reveal, background particles,
   off-screen animation pausing, back-to-top button, footer year.
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
    var count = window.innerWidth < 700 ? 0 : 14;
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

  /* ---------- Smooth scrolling (mouse wheel / trackpad on desktop) ----------
     A light inertia scroller: the page glides to where the wheel points instead
     of jumping in steps. Phones and tablets keep their own native momentum
     scrolling, and it switches off for anyone who prefers reduced motion. */
  var Smooth = (function () {
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !fine || !window.requestAnimationFrame) return null;
    var root = document.documentElement;
    root.classList.add('has-smooth');
    var target = window.scrollY, current = target, running = false, last = 0, gliding = false;
    var LERP = 0.11; // glide strength per 60 fps frame

    function maxY() { return Math.max(0, root.scrollHeight - window.innerHeight); }
    function clamp(v) { return Math.min(maxY(), Math.max(0, v)); }
    function frame(now) {
      var dt = last ? Math.min(64, now - last) : 16.7; last = now;
      var k = 1 - Math.pow(1 - LERP, dt / 16.7);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.4) { current = target; running = false; }
      gliding = true;
      window.scrollTo(0, Math.round(current * 100) / 100);
      if (running) requestAnimationFrame(frame); else { last = 0; setTimeout(function () { gliding = false; }, 0); }
    }
    function start() { if (!running) { running = true; last = 0; requestAnimationFrame(frame); } }

    // Let inner scroll areas (pop-ups, menus, text boxes) scroll by themselves
    function innerScroller(el, dy) {
      while (el && el !== document.body && el !== root) {
        if (el.scrollHeight > el.clientHeight + 1) {
          var oy = window.getComputedStyle(el).overflowY;
          if (oy === 'auto' || oy === 'scroll') {
            if ((dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) || (dy < 0 && el.scrollTop > 0)) return true;
          }
        }
        el = el.parentElement;
      }
      return false;
    }

    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.defaultPrevented || root.classList.contains('lb-open')) return;
      var dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16; else if (e.deltaMode === 2) dy *= window.innerHeight;
      if (Math.abs(e.deltaX) > Math.abs(dy)) return;          // sideways swipes stay native
      if (innerScroller(e.target, dy)) return;
      e.preventDefault();
      if (!running) { current = window.scrollY; target = current; }
      target = clamp(target + dy);
      start();
    }, { passive: false });

    // Keyboard, scrollbar dragging, find-in-page: follow the real position
    window.addEventListener('scroll', function () {
      if (!running && !gliding) { current = target = window.scrollY; }
    }, { passive: true });
    window.addEventListener('resize', function () { target = clamp(target); }, { passive: true });
    // Keyboard scrolling takes over instantly from any glide in progress
    window.addEventListener('keydown', function (e) {
      if (running && /^(Arrow(Up|Down)|Page(Up|Down)|Home|End| )$/.test(e.key)) { running = false; current = target = window.scrollY; }
    });

    return {
      to: function (y) { if (!running) current = window.scrollY; target = clamp(y); start(); },
      stop: function () { running = false; current = target = window.scrollY; }
    };
  })();
  window.SmoothScroll = Smooth;

  function scrollToY(y) {
    if (Smooth) Smooth.to(y);
    else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
  }

  /* Same-page links (e.g. "#main") glide instead of jumping */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || !Smooth) return;
    var id = a.getAttribute('href').slice(1);
    var el = id && document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    scrollToY(el.getBoundingClientRect().top + window.scrollY - 90);
    if (id === 'main') el.setAttribute('tabindex', '-1'), el.focus({ preventScroll: true });
  });

  /* ---------- Pause animations that are off-screen ---------- */
  if ('IntersectionObserver' in window) {
    var zones = document.querySelectorAll('main > section, .footer');
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('is-paused', !en.isIntersecting); });
    }, { rootMargin: '200px 0px' });
    zones.forEach(function (z) { pio.observe(z); });
  }

  /* ---------- Back-to-top button ---------- */
  var topBtn = document.createElement('button');
  topBtn.type = 'button';
  topBtn.className = 'to-top';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.innerHTML = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrow-right"/></svg>';
  document.body.appendChild(topBtn);
  topBtn.addEventListener('click', function () { scrollToY(0); });
  var topTick = false;
  window.addEventListener('scroll', function () {
    if (topTick) return; topTick = true;
    requestAnimationFrame(function () {
      topBtn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.9);
      topTick = false;
    });
  }, { passive: true });

  /* ---------- Floating WhatsApp chat button ---------- */
  var wa = document.body.getAttribute('data-whatsapp');
  if (wa) {
    var waText = encodeURIComponent('Assalam o Alaikum Jawad, I found your portfolio and would like to talk.');
    var waBtn = document.createElement('a');
    waBtn.className = 'wa-float';
    waBtn.href = 'https://wa.me/' + wa + '?text=' + waText;
    waBtn.target = '_blank';
    waBtn.rel = 'noopener';
    waBtn.setAttribute('aria-label', 'Chat with Jawad on WhatsApp');
    waBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-whatsapp"/></svg><span class="wa-float__label">Chat on WhatsApp</span>';
    document.body.appendChild(waBtn);
    document.body.classList.add('has-wa');
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
