/* ==========================================================================
   Muhammad Jawad — portfolio script
   Loader, letter reveal, role rotator, network background, smooth scrolling,
   reveal-on-scroll, counters, spotlight panels, expertise tabs, pinned
   horizontal experience, magnetic buttons, WhatsApp links.
   ========================================================================== */
(function () {
  'use strict';
  var WA = '923289308109';
  var GREETING = 'Assalam o Alaikum Jawad, I saw your portfolio and would like to talk.';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var root = document.documentElement;
  function wa(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }

  /* ---------- WhatsApp links ---------- */
  document.querySelectorAll('[data-wa-default]').forEach(function (a) { a.href = wa(GREETING); });
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = wa('Assalam o Alaikum Jawad, I would like to ask about: ' + a.getAttribute('data-wa') + '.');
    a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- Split the hero name into letters ---------- */
  var base = 0;
  document.querySelectorAll('.split').forEach(function (el) {
    var text = el.textContent; el.textContent = '';
    el.setAttribute('aria-label', text);
    el.style.setProperty('--base', base + 'ms');
    Array.prototype.forEach.call(text, function (c, i) {
      var s = document.createElement('span'); s.className = 'ch'; s.textContent = c; s.style.setProperty('--i', i); s.setAttribute('aria-hidden', 'true'); el.appendChild(s);
    });
    base += text.length * 45 + 120;
  });

  /* ---------- Loader, then start the hero ---------- */
  var loader = document.querySelector('.loader');
  var seen = false;
  try { seen = sessionStorage.getItem('mj-seen') === '1'; sessionStorage.setItem('mj-seen', '1'); } catch (e) {}
  document.body.classList.add('is-loading');
  function start() {
    if (loader) loader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    requestAnimationFrame(function () { document.body.classList.add('is-ready'); });
  }
  var wait = (reduced || seen) ? 0 : 450;
  if (document.readyState === 'complete') setTimeout(start, wait);
  else window.addEventListener('load', function () { setTimeout(start, wait); });
  setTimeout(start, 2000); // never keep visitors waiting on a slow connection

  /* ---------- Role rotator ---------- */
  var roles = Array.prototype.slice.call(document.querySelectorAll('.rotator__item'));
  if (roles.length > 1 && !reduced) {
    var ri = 0;
    setInterval(function () {
      if (document.hidden) return;
      var cur = roles[ri]; ri = (ri + 1) % roles.length; var nxt = roles[ri];
      cur.classList.remove('is-on'); cur.classList.add('is-off');
      nxt.classList.remove('is-off'); nxt.classList.add('is-on');
      setTimeout(function () { cur.classList.remove('is-off'); }, 650);
    }, 2600);
  }

  /* ---------- Network background (hero) ---------- */
  var canvas = document.querySelector('.hero__net');
  if (canvas && canvas.getContext && !reduced) {
    var ctx = canvas.getContext('2d');
    var nodes = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5), running = true, mouse = { x: -999, y: -999 };
    function size() {
      var r = canvas.getBoundingClientRect(); W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(Math.min(70, W * H / 22000));
      nodes = [];
      for (var i = 0; i < count; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .8, red: Math.random() < .12 });
    }
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      var max = 130;
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy;
          if (d < max * max) {
            ctx.strokeStyle = 'rgba(92,200,255,' + (0.22 * (1 - Math.sqrt(d) / max)).toFixed(3) + ')';
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        var mdx = a.x - mouse.x, mdy = a.y - mouse.y, md = mdx * mdx + mdy * mdy;
        if (md < 170 * 170) {
          ctx.strokeStyle = 'rgba(255,106,26,' + (0.35 * (1 - Math.sqrt(md) / 170)).toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = a.red ? 'rgba(255,145,66,.9)' : 'rgba(140,210,255,.85)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    size(); requestAnimationFrame(draw);
    window.addEventListener('resize', function () { size(); }, { passive: true });
    var hero = document.querySelector('.hero');
    if (finePointer) {
      hero.addEventListener('mousemove', function (e) { var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
      hero.addEventListener('mouseleave', function () { mouse.x = mouse.y = -999; });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        var vis = en[0].isIntersecting;
        if (vis && !running) { running = true; requestAnimationFrame(draw); } else if (!vis) running = false;
      }).observe(hero);
    }
  }

  /* ---------- Smooth scrolling (mouse wheel on computers) ---------- */
  var Smooth = (function () {
    if (reduced || !finePointer || !window.requestAnimationFrame) return null;
    root.classList.add('has-smooth');
    var target = window.scrollY, current = target, run = false, last = 0, gliding = false, LERP = 0.1;
    function maxY() { return Math.max(0, root.scrollHeight - window.innerHeight); }
    function clamp(v) { return Math.min(maxY(), Math.max(0, v)); }
    function frame(now) {
      var dt = last ? Math.min(64, now - last) : 16.7; last = now;
      current += (target - current) * (1 - Math.pow(1 - LERP, dt / 16.7));
      if (Math.abs(target - current) < 0.4) { current = target; run = false; }
      gliding = true; window.scrollTo(0, current);
      if (run) requestAnimationFrame(frame); else { last = 0; setTimeout(function () { gliding = false; }, 0); }
    }
    function go() { if (!run) { run = true; last = 0; requestAnimationFrame(frame); } }
    function inner(el, dy) {
      while (el && el !== document.body && el !== root) {
        if (el.scrollHeight > el.clientHeight + 1) {
          var oy = getComputedStyle(el).overflowY;
          if ((oy === 'auto' || oy === 'scroll') && ((dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) || (dy < 0 && el.scrollTop > 0))) return true;
        }
        el = el.parentElement;
      }
      return false;
    }
    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.defaultPrevented || document.body.classList.contains('is-loading') || document.body.classList.contains('menu-open')) return;
      var dy = e.deltaY; if (e.deltaMode === 1) dy *= 16; else if (e.deltaMode === 2) dy *= innerHeight;
      if (Math.abs(e.deltaX) > Math.abs(dy) || inner(e.target, dy)) return;
      e.preventDefault();
      if (!run) { current = window.scrollY; target = current; }
      target = clamp(target + dy); go();
    }, { passive: false });
    window.addEventListener('scroll', function () { if (!run && !gliding) current = target = window.scrollY; }, { passive: true });
    window.addEventListener('keydown', function (e) { if (run && /^(Arrow(Up|Down)|Page(Up|Down)|Home|End| )$/.test(e.key)) { run = false; current = target = window.scrollY; } });
    return { to: function (y) { if (!run) current = window.scrollY; target = clamp(y); go(); } };
  })();
  function scrollToEl(el) {
    var y = el.id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - (el.classList.contains('hscroll') ? 0 : 80);
    if (Smooth) Smooth.to(y); else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector('.nav__burger');
  var mmenu = document.getElementById('mobile-menu');
  function closeMenu() { if (!mmenu.hidden) { mmenu.hidden = true; burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); document.body.classList.remove('menu-open'); document.body.style.overflow = ''; } }
  if (burger && mmenu) {
    burger.addEventListener('click', function () {
      var open = mmenu.hidden;
      mmenu.hidden = !open; burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open); document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* Same-page links glide */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1), el = id && document.getElementById(id);
    if (!el) return;
    e.preventDefault(); closeMenu();
    setTimeout(function () { scrollToEl(el); }, 10);
  });

  /* ---------- Reveal on scroll ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Every number counts up from 0 when it comes into view ---------- */
  function fmt(v, dec, sep) {
    var s = v.toFixed(dec);
    if (sep) { var parts = s.split('.'); parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); s = parts.join('.'); }
    return s;
  }
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  counters.forEach(function (el) {
    el._end = parseFloat(el.getAttribute('data-count'));
    el._dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    el._sep = el.hasAttribute('data-sep');
    el.style.fontVariantNumeric = 'tabular-nums';
    if (!reduced) el.textContent = fmt(0, el._dec, el._sep);
  });
  // counts up every time a number comes into view, and resets when it leaves
  function countUp(el) {
    if (el._raf) cancelAnimationFrame(el._raf);
    if (reduced) { el.textContent = fmt(el._end, el._dec, el._sep); return; }
    var t0 = null, dur = el._end >= 100 ? 1800 : 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(el._end * e, el._dec, el._sep);
      el._raf = p < 1 ? requestAnimationFrame(step) : 0;
    }
    el._raf = requestAnimationFrame(step);
  }
  function resetCount(el) {
    if (el._raf) cancelAnimationFrame(el._raf);
    el._raf = 0; clearTimeout(el._wait);
    if (!reduced) el.textContent = fmt(0, el._dec, el._sep);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var el = en.target;
        if (en.isIntersecting) {
          if (el._visible) return;
          el._visible = true;
          // hero badges wait for the opening animation the first time only
          var delay = (el.closest('.hero') && !el._seen) ? (document.body.classList.contains('is-ready') ? 700 : 1200) : 80;
          el._seen = true;
          el._wait = setTimeout(function () { countUp(el); }, delay);
        } else if (el._visible) {
          el._visible = false;
          resetCount(el);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else { counters.forEach(countUp); }

  /* ---------- Score bars fill every time they come into view ---------- */
  var bars = Array.prototype.slice.call(document.querySelectorAll('.bar'));
  if ('IntersectionObserver' in window && bars.length) {
    var bio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('is-full', en.isIntersecting); });
    }, { threshold: 0.6 });
    bars.forEach(function (b) { bio.observe(b); });
  } else { bars.forEach(function (b) { b.classList.add('is-full'); }); }

  /* ---------- Email: Gmail compose on computers, email app on phones ---------- */
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  document.querySelectorAll('a[data-email]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (isMobile) return; // phones open their email app through mailto
      e.preventDefault();
      var url = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(a.getAttribute('data-email')) + '&su=' + encodeURIComponent('Hello Jawad');
      window.open(url, '_blank', 'noopener');
    });
  });
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy'), label = b.textContent;
      function done() { b.textContent = 'Copied'; b.classList.add('is-done'); setTimeout(function () { b.textContent = label; b.classList.remove('is-done'); }, 1800); }
      function fallback() { var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (err) {} document.body.removeChild(ta); done(); }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    });
  });

  /* ---------- Spotlight panels ---------- */
  document.querySelectorAll('.tile, .edu__card, .course, .svc__item, .xp, .tabs__panel').forEach(function (el) {
    el.classList.add('spot');
    if (!finePointer) return;
    el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
  });

  /* ---------- Forex chart candles ---------- */
  var cg = document.querySelector('.viz--fx .candles');
  if (cg) {
    // a market that rises in zigzag swings: higher highs, higher lows
    var closes = [252, 228, 204, 182, 212, 240, 214, 186, 158, 136, 170, 204, 172, 138, 110, 90, 124, 150, 112, 82, 60, 46];
    var open0 = 262, n = closes.length, step = 330 / n, w = Math.max(7, step * 0.58), html = '', pts = [];
    closes.forEach(function (cl, i) {
      var op = i ? closes[i - 1] : open0, x = 40 + i * step, up = cl < op;
      var top = Math.min(op, cl), h = Math.max(4, Math.abs(op - cl));
      var col = up ? '#22c55e' : '#ef4444';
      var wickTop = top - (6 + (i * 7) % 9), wickBot = top + h + (5 + (i * 5) % 8);
      html += '<g style="--i:' + i + '"><line x1="' + (x + w / 2).toFixed(1) + '" x2="' + (x + w / 2).toFixed(1) + '" y1="' + wickTop + '" y2="' + wickBot + '" stroke="' + col + '" stroke-width="2" stroke-linecap="round"/><rect x="' + x.toFixed(1) + '" y="' + top + '" width="' + w.toFixed(1) + '" height="' + h + '" rx="2" fill="' + col + '"/></g>';
      pts.push((x + w / 2).toFixed(1) + ' ' + cl);
    });
    var trendEl = document.querySelector('.viz--fx .trend');
    if (trendEl) trendEl.setAttribute('d', 'M' + pts.join(' L'));
    cg.innerHTML = html;
  }
  var fxViz = document.querySelector('.viz--fx');
  var fxCandles = cg ? Array.prototype.slice.call(cg.children) : [];
  var fxTrend = fxViz && fxViz.querySelector('.trend');
  var fxLen = fxTrend && fxTrend.getTotalLength ? Math.ceil(fxTrend.getTotalLength()) : 520;
  if (fxTrend) { fxTrend.style.strokeDasharray = fxLen; fxTrend.style.strokeDashoffset = fxLen; }
  // progress 0..1 follows how far the chart has scrolled up through the screen
  function fxUpdate() {
    if (!fxViz || !fxCandles.length) return;
    var p;
    if (reduced) p = 1;
    else {
      var r = fxViz.getBoundingClientRect(), vh = window.innerHeight;
      if (!r.height) return; // tab not visible
      var start = vh * 0.92, end = vh * 0.25;            // chart bottom enters -> chart top near the top
      p = (start - r.top) / (start - end + r.height * 0.5);
      p = Math.min(1, Math.max(0, p));
    }
    var n = fxCandles.length, shown = Math.round(p * n);
    fxCandles.forEach(function (g, i) { g.classList.toggle('is-on', i < shown); });
    if (fxTrend) fxTrend.style.strokeDashoffset = (fxLen * (1 - p)).toFixed(1);
  }

  /* ---------- Expertise tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs__list [role="tab"]'));
  function selectTab(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) t.focus();
    requestAnimationFrame(fxUpdate);
    if (t.scrollIntoView && t.parentElement.scrollWidth > t.parentElement.clientWidth) t.parentElement.scrollLeft = t.offsetLeft - 20;
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });

  /* ---------- Pinned horizontal experience ---------- */
  var hs = document.querySelector('.hscroll');
  var track = hs && hs.querySelector('.hscroll__track');
  var meter = hs && hs.querySelector('.hscroll__meter span');
  var hsOn = false, hsDist = 0;
  function hsLayout() {
    if (!hs) return;
    hsOn = window.innerWidth > 900 && !reduced;
    if (!hsOn) { hs.style.height = ''; track.style.transform = ''; return; }
    hsDist = Math.max(0, track.scrollWidth - window.innerWidth);
    hs.style.height = (window.innerHeight + hsDist) + 'px';
  }
  function hsUpdate() {
    if (!hsOn) return;
    var top = hs.getBoundingClientRect().top, p = Math.min(1, Math.max(0, -top / (hsDist || 1)));
    track.style.transform = 'translate3d(' + (-p * hsDist).toFixed(1) + 'px,0,0)';
    if (meter) meter.style.transform = 'scaleX(' + p.toFixed(3) + ')';
  }

  /* ---------- Nav state, progress bar, active link ---------- */
  var nav = document.querySelector('.nav');
  var bar = document.querySelector('.progress span');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY, max = root.scrollHeight - innerHeight;
      nav.classList.toggle('is-solid', y > 30);
      if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0).toFixed(4) + ')';
      var idx = -1;
      targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= innerHeight * 0.4) idx = i; });
      links.forEach(function (a, i) { a.classList.toggle('is-active', i === idx); });
      hsUpdate();
      fxUpdate();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { hsLayout(); onScroll(); }, { passive: true });
  window.addEventListener('load', function () { hsLayout(); onScroll(); });
  hsLayout(); onScroll();

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduced) {
    document.querySelectorAll('.magnetic').forEach(function (b) {
      b.addEventListener('pointermove', function (e) { var r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .18).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * .25).toFixed(1) + 'px)'; });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- Footer year ---------- */
  var yEl = document.querySelector('[data-year]'); if (yEl) yEl.textContent = new Date().getFullYear();
})();
