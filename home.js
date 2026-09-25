/* ==========================================================================
   HOME PAGE SCRIPT — animated counters, testimonial slider, brand marquee
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Animated counters (count up when scrolled into view) ---------- */
  var counters = document.querySelectorAll('[data-count]');
  var fmt = function (el, v) { return v.toFixed(parseInt(el.dataset.decimals || '0', 10)); };

  function runCounter(el, delay) {
    var target = parseFloat(el.dataset.count);
    var duration = 2200;
    setTimeout(function () {
      var start = performance.now();
      (function tick(now) {
        var p = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 4); // ease-out quart
        el.textContent = fmt(el, target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(el, target);
      })(start);
    }, delay);
  }

  if (counters.length && 'IntersectionObserver' in window && !reduced) {
    counters.forEach(function (el) { el.textContent = fmt(el, 0); });
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = Array.prototype.indexOf.call(counters, entry.target);
        runCounter(entry.target, idx * 140);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Testimonials slider ---------- */
  var slider = document.querySelector('[data-slider]');
  if (slider) {
    var track = slider.querySelector('.slider__track');
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.t-card'));
    var dotsWrap = slider.querySelector('.slider__dots');
    var prev = document.querySelector('[data-slider-prev]');
    var next = document.querySelector('[data-slider-next]');
    var viewport = slider.querySelector('.slider__viewport');
    var index = 0, timer = null, paused = false;

    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'dot';
      b.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
      b.addEventListener('click', function () { go(i); restart(); });
      dotsWrap.appendChild(b);
      return b;
    });

    function go(n) {
      index = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      slides.forEach(function (s, i) {
        s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      });
      dots.forEach(function (d, i) { d.setAttribute('aria-current', i === index ? 'true' : 'false'); });
    }
    function stop() { clearInterval(timer); timer = null; }
    function play() {
      if (reduced || paused || timer) return;
      timer = setInterval(function () { go(index + 1); }, 6500);
    }
    function restart() { stop(); play(); }

    if (prev) prev.addEventListener('click', function () { go(index - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(index + 1); restart(); });

    slider.addEventListener('mouseenter', function () { paused = true; stop(); });
    slider.addEventListener('mouseleave', function () { paused = false; play(); });
    slider.addEventListener('focusin', function () { paused = true; stop(); });
    slider.addEventListener('focusout', function () { paused = false; play(); });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : play(); });

    // Swipe / drag support
    var startX = null;
    viewport.addEventListener('pointerdown', function (e) { startX = e.clientX; });
    viewport.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) { go(index + (dx < 0 ? 1 : -1)); restart(); }
    });
    viewport.addEventListener('pointercancel', function () { startX = null; });

    // Left / right arrow keys when the slider has focus
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(index + 1); restart(); }
      if (e.key === 'ArrowLeft') { go(index - 1); restart(); }
    });

    go(0);
    play();
  }

  /* ---------- Brand marquee: duplicate the row so the loop is seamless ---------- */
  var marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack) {
    var base = Array.prototype.slice.call(marqueeTrack.children);
    var build = function () {
      var setWidth = marqueeTrack.scrollWidth;
      var screenW = Math.max(window.innerWidth, window.screen ? window.screen.width : 0);
      var sets = 2;
      while ((setWidth * sets) / 2 < screenW * 1.25 && sets < 12) sets += 2;
      for (var s = 1; s < sets; s++) {
        base.forEach(function (node) {
          var clone = node.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          marqueeTrack.appendChild(clone);
        });
      }
    };
    build();
  }
})();
