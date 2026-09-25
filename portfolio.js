/* ==========================================================================
   PORTFOLIO PAGE SCRIPT
   - builds the filter tabs and project cards from js/projects-data.js
   - animated filtering (cards dissolve, survivors glide to their new spot)
   - staggered scroll reveal
   - lightbox with previous / next, keyboard and focus handling
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cats = window.PORTFOLIO_CATEGORIES || [];
  var projects = (window.PORTFOLIO_PROJECTS || []).slice().sort(function (a, b) { return a.order - b.order; });
  var byId = {};
  projects.forEach(function (p) { byId[p.id] = p; });

  var LABEL = {}; cats.forEach(function (c) { LABEL[c.id] = c.label; });
  var TAG = { va: 'tag--orange', network: 'tag--blue', language: 'tag--mix' };

  var filtersEl = document.querySelector('.filters');
  var thumb = filtersEl.querySelector('.filters__thumb');
  var grid = document.getElementById('project-grid');
  var resultsEl = document.getElementById('results');
  if (!grid || !projects.length) return;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var ICON = function (name) { return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; };

  /* ---------- Build tabs ---------- */
  var tabs = cats.map(function (c) {
    var count = c.id === 'all' ? projects.length : projects.filter(function (p) { return p.category === c.id; }).length;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'filters__btn';
    b.dataset.cat = c.id;
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '<span>' + esc(c.label) + '</span><span class="filters__count">' + count + '</span>';
    b.addEventListener('click', function () { setFilter(c.id, true); });
    filtersEl.appendChild(b);
    return b;
  });

  /* ---------- Build cards ---------- */
  projects.forEach(function (p) {
    var item = document.createElement('div');
    item.className = 'p-item reveal';
    item.dataset.id = p.id;
    item.dataset.cat = p.category;
    item.innerHTML =
      '<button class="p-card p-card--' + esc(p.category) + '" type="button" aria-haspopup="dialog">' +
        '<span class="p-card__media">' +
          '<img src="' + esc(p.image) + '" width="800" height="600" loading="lazy" alt="' + esc(p.alt || p.title) + '">' +
          '<span class="p-card__open" aria-hidden="true">' + ICON('arrow-up-right') + '</span>' +
        '</span>' +
        '<span class="p-card__body">' +
          '<span class="tag ' + (TAG[p.category] || 'tag--orange') + '">' + esc(LABEL[p.category] || p.category) + '</span>' +
          '<span class="p-card__title">' + esc(p.title) + '</span>' +
          '<span class="p-card__desc">' + esc(p.summary) + '</span>' +
        '</span>' +
      '</button>';
    item.querySelector('.p-card').addEventListener('click', function () { openProject(p.id, item.querySelector('.p-card')); });
    grid.appendChild(item);
  });
  var items = Array.prototype.slice.call(grid.children);

  /* ---------- Staggered scroll reveal ---------- */
  var io = null;
  function reveal(el, i) {
    el.style.transitionDelay = (i * 0.09).toFixed(2) + 's';
    el.classList.add('is-in');
    setTimeout(function () { el.style.transitionDelay = ''; }, 1500 + i * 90);
  }
  if ('IntersectionObserver' in window && !reduced) {
    io = new IntersectionObserver(function (entries) {
      var seen = entries.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) {
        return (a.boundingClientRect.top - b.boundingClientRect.top) || (a.boundingClientRect.left - b.boundingClientRect.left);
      });
      seen.forEach(function (e, i) { reveal(e.target, i); io.unobserve(e.target); });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Tab thumb (the gliding highlight) ---------- */
  var current = null;
  function moveThumb() {
    var active = tabs.filter(function (t) { return t.getAttribute('aria-pressed') === 'true'; })[0];
    if (!active) return;
    thumb.style.width = active.offsetWidth + 'px';
    thumb.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  }
  window.addEventListener('resize', function () {
    thumb.style.transition = 'none'; moveThumb(); void thumb.offsetWidth; thumb.style.transition = '';
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { thumb.style.transition = 'none'; moveThumb(); void thumb.offsetWidth; thumb.style.transition = ''; });
  }

  function updateTabs(cat, instant) {
    filtersEl.dataset.active = cat;
    tabs.forEach(function (t) { t.setAttribute('aria-pressed', String(t.dataset.cat === cat)); });
    if (instant) thumb.style.transition = 'none';
    moveThumb();
    if (instant) { void thumb.offsetWidth; thumb.style.transition = ''; }
    var active = tabs.filter(function (t) { return t.dataset.cat === cat; })[0];
    if (active && active.scrollIntoView && filtersEl.parentNode.scrollWidth > filtersEl.parentNode.clientWidth) {
      var wrap = filtersEl.parentNode;
      wrap.scrollTo({ left: active.offsetLeft - (wrap.clientWidth - active.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
    }
  }

  function matches(el, cat) { return cat === 'all' || el.dataset.cat === cat; }

  function updateResults(cat) {
    var n = items.filter(function (el) { return matches(el, cat); }).length;
    resultsEl.textContent = 'Showing ' + n + ' project' + (n === 1 ? '' : 's') + (cat === 'all' ? '' : ' in ' + (LABEL[cat] || cat));
  }

  function writeHash(value) {
    try { history.replaceState(null, '', value ? '#' + value : location.pathname + location.search); } catch (e) { /* file:// may refuse */ }
  }

  /* ---------- Filtering with soft, animated reordering ---------- */
  var token = 0;
  function setFilter(cat, animate) {
    if (cat === current) return;
    var first = current === null;
    current = cat;
    updateTabs(cat, first || !animate);
    updateResults(cat);
    if (!first) writeHash(cat === 'all' ? '' : cat);

    var show = items.filter(function (el) { return matches(el, cat); });
    var visibleNow = items.filter(function (el) { return !el.hidden; });

    if (first || !animate || reduced) {
      items.forEach(function (el) { el.hidden = show.indexOf(el) === -1; });
      return;
    }

    var myToken = ++token;
    var leaving = visibleNow.filter(function (el) { return show.indexOf(el) === -1; });
    var staying = visibleNow.filter(function (el) { return show.indexOf(el) !== -1; });
    var entering = show.filter(function (el) { return el.hidden; });

    // Remember where everyone is right now (for the glide)
    var firstRects = new Map();
    staying.forEach(function (el) { firstRects.set(el, el.getBoundingClientRect()); });

    var h0 = grid.offsetHeight;
    grid.style.height = h0 + 'px';
    grid.classList.add('is-changing');
    leaving.forEach(function (el) { el.classList.add('is-leaving'); });

    setTimeout(function () {
      if (myToken !== token) return;

      leaving.forEach(function (el) { el.hidden = true; el.classList.remove('is-leaving', 'is-in'); if (io) io.observe(el); });
      entering.forEach(function (el) { el.classList.remove('is-in', 'is-leaving'); el.hidden = false; });

      // Reorder to match the tab's order, then measure the new layout
      show.forEach(function (el) { grid.appendChild(el); });
      leaving.forEach(function (el) { grid.appendChild(el); });

      grid.style.height = 'auto';
      var h1 = grid.offsetHeight;

      // Survivors glide from their old position to the new one
      staying.forEach(function (el) {
        var a = firstRects.get(el), b = el.getBoundingClientRect();
        var dx = a.left - b.left, dy = a.top - b.top;
        if (!dx && !dy) return;
        el.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px)' }, { transform: 'translate(0,0)' }], { duration: 800, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' });
      });

      // Newcomers fade in through the normal scroll-reveal
      if (io) {
        entering.forEach(function (el) { io.unobserve(el); io.observe(el); });
      } else {
        entering.forEach(function (el) { el.classList.add('is-in'); });
      }

      // Smoothly resize the grid to its new height
      grid.style.height = h0 + 'px';
      void grid.offsetHeight;
      grid.style.transition = 'height 0.8s cubic-bezier(0.2, 0.7, 0.2, 1)';
      grid.style.height = h1 + 'px';
      setTimeout(function () {
        if (myToken !== token) return;
        grid.style.height = ''; grid.style.transition = ''; grid.classList.remove('is-changing');
      }, 850);
    }, 320);
  }

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var panel = lb.querySelector('.lightbox__panel');
  var lbImg = document.getElementById('lb-img');
  var lbTag = document.getElementById('lb-tag');
  var lbTitle = document.getElementById('lb-title');
  var lbDesc = document.getElementById('lb-desc');
  var lbList = document.getElementById('lb-list');
  var lbTools = document.getElementById('lb-tools');
  var lbCount = document.getElementById('lb-count');
  var lastFocus = null, currentId = null, closeTimer = null, swapTimer = null;

  function visibleList() {
    return items.filter(function (el) { return !el.hidden; }).map(function (el) { return el.dataset.id; });
  }

  function fill(p) {
    var list = visibleList();
    var pos = list.indexOf(p.id);
    panel.dataset.cat = p.category;
    lbImg.src = p.image;
    lbImg.alt = p.alt || p.title;
    lbTag.className = 'tag ' + (TAG[p.category] || 'tag--orange');
    lbTag.textContent = LABEL[p.category] || p.category;
    lbTitle.textContent = p.title;
    lbDesc.textContent = p.description;
    lbList.innerHTML = (p.highlights || []).map(function (h) { return '<li>' + ICON('check') + '<span>' + esc(h) + '</span></li>'; }).join('');
    lbTools.innerHTML = (p.tools || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    lbCount.textContent = (pos + 1) + ' / ' + list.length;
    currentId = p.id;
  }

  function scrollbarWidth() { return window.innerWidth - document.documentElement.clientWidth; }

  function openProject(id, trigger) {
    var p = byId[id];
    if (!p) return;
    // If the project isn't in the current tab (deep link), switch to its category
    if (items.filter(function (el) { return el.dataset.id === id && !el.hidden; }).length === 0) setFilter(p.category, false);

    clearTimeout(closeTimer);
    lastFocus = trigger || document.activeElement;
    fill(p);
    panel.scrollTop = 0;
    document.documentElement.style.setProperty('--sbw', scrollbarWidth() + 'px');
    document.documentElement.classList.add('lb-open');
    lb.hidden = false;
    void lb.offsetWidth;
    lb.classList.add('is-open');
    setTimeout(function () { lb.querySelector('.lightbox__close').focus({ preventScroll: true }); }, 60);
    writeHash('project-' + id);
  }

  function closeLightbox() {
    if (lb.hidden) return;
    lb.classList.remove('is-open');
    closeTimer = setTimeout(function () {
      lb.hidden = true;
      document.documentElement.classList.remove('lb-open');
      document.documentElement.style.removeProperty('--sbw');
    }, reduced ? 0 : 520);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    writeHash(current === 'all' ? '' : current);
    currentId = null;
  }

  function step(dir) {
    var list = visibleList();
    if (list.length < 2 || !currentId) return;
    var next = byId[list[(list.indexOf(currentId) + dir + list.length) % list.length]];
    clearTimeout(swapTimer);
    panel.classList.add('is-swapping');
    swapTimer = setTimeout(function () {
      fill(next);
      panel.scrollTop = 0;
      panel.classList.remove('is-swapping');
      writeHash('project-' + next.id);
    }, reduced ? 0 : 280);
  }

  lb.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeLightbox();
    else if (e.target.closest('[data-prev]')) step(-1);
    else if (e.target.closest('[data-next]')) step(1);
  });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'Tab') {
      var f = Array.prototype.slice.call(panel.querySelectorAll('button, a[href]')).filter(function (n) { return n.offsetParent !== null; });
      if (!f.length) return;
      var firstEl = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    }
  });

  // Swipe left / right inside the lightbox on touch screens
  var sx = null;
  panel.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  panel.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 70) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* ---------- Start: honour #va, #network, #language, #project-id ---------- */
  function fromHash() {
    var h = decodeURIComponent(location.hash.replace('#', ''));
    if (h.indexOf('project-') === 0 && byId[h.slice(8)]) {
      if (current === null) setFilter(byId[h.slice(8)].category, false);
      openProject(h.slice(8), null);
      return;
    }
    if (!lb.hidden) closeLightbox();
    if (LABEL[h] && h !== current) setFilter(h, current !== null);
    else if (current === null) setFilter('all', false);
  }
  fromHash();
  window.addEventListener('hashchange', fromHash);
  moveThumb();
})();
