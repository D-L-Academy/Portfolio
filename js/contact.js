/* ==========================================================================
   CONTACT PAGE SCRIPT
   - quick topic chips fill in the subject
   - friendly validation
   - sending: a static site has no server, so by default the form opens the
     visitor's email app with the message ready to send to your address.
     To send directly from the site instead, put a form-service URL (for
     example a Formspree endpoint) in the form's data-endpoint attribute in
     contact.html. The Admin Panel step can wire this up properly.
   ========================================================================== */
(function () {
  'use strict';

  var EMAIL = 'jawadkhanmehsood@gmail.com';
  var form = document.getElementById('contact-form');
  if (!form) return;
  var panel = document.querySelector('.form-panel');
  var alertBox = document.getElementById('form-alert');
  var sendBtn = document.getElementById('send-btn');
  var topics = Array.prototype.slice.call(document.querySelectorAll('.topic'));
  var subject = document.getElementById('subject');

  /* ---------- Copy buttons ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var t = document.createElement('textarea');
      t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(t);
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (!b) return;
    var label = b.querySelector('.mini-btn__label') || b;
    var original = b.dataset.originalLabel || label.textContent;
    b.dataset.originalLabel = original;
    copyText(b.dataset.copy).then(function () {
      label.textContent = 'Copied!'; b.classList.add('is-done');
    }).catch(function () {
      label.textContent = EMAIL;
    }).then(function () {
      setTimeout(function () { label.textContent = original; b.classList.remove('is-done'); }, 2200);
    });
  });

  /* ---------- Topic chips ---------- */
  topics.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') === 'true';
      topics.forEach(function (t) { t.setAttribute('aria-pressed', 'false'); });
      if (on) { subject.value = ''; }
      else { btn.setAttribute('aria-pressed', 'true'); subject.value = btn.dataset.subject; clearError(subject.closest('.field')); }
      subject.focus();
    });
  });
  subject.addEventListener('input', function () {
    topics.forEach(function (t) {
      t.setAttribute('aria-pressed', String(t.dataset.subject === subject.value));
    });
  });

  /* ---------- Validation ---------- */
  var RULES = {
    name: { test: function (v) { return v.trim().length >= 2; }, msg: 'Please tell me your name.' },
    email: { test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }, msg: 'Please enter a valid email address.' },
    subject: { test: function (v) { return v.trim().length >= 3; }, msg: 'Please add a short subject.' },
    message: { test: function (v) { return v.trim().length >= 10; }, msg: 'Please write a message (at least 10 characters).' }
  };
  function fieldOf(input) { return input.closest('.field'); }
  function setError(field, msg) {
    field.classList.add('has-error');
    field.querySelector('.field__error span').textContent = msg;
    field.querySelector('input, textarea').setAttribute('aria-invalid', 'true');
  }
  function clearError(field) {
    field.classList.remove('has-error');
    var c = field.querySelector('input, textarea'); if (c) c.removeAttribute('aria-invalid');
  }
  function check(input) {
    var rule = RULES[input.name];
    if (!rule) return true;
    if (rule.test(input.value)) { clearError(fieldOf(input)); return true; }
    setError(fieldOf(input), rule.msg); return false;
  }
  Object.keys(RULES).forEach(function (n) {
    var input = form.elements[n];
    var touched = false;
    input.addEventListener('blur', function () { touched = true; if (input.value || input.getAttribute('aria-invalid')) check(input); });
    input.addEventListener('input', function () { if (touched || input.getAttribute('aria-invalid')) check(input); });
  });

  /* ---------- Sending ---------- */
  function collect() {
    return {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      subject: form.elements.subject.value.trim(),
      budget: (form.querySelector('input[name="budget"]:checked') || {}).value || '',
      message: form.elements.message.value.trim()
    };
  }
  function mailtoUrl(d) {
    var body = 'Name: ' + d.name + '\nEmail: ' + d.email + '\nBudget: ' + (d.budget || 'Not specified') + '\n\n' + d.message;
    if (body.length > 1800) body = body.slice(0, 1800) + '...';
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(d.subject) + '&body=' + encodeURIComponent(body);
  }
  function showSuccess(mode, d) {
    var title = document.getElementById('success-title');
    var text = document.getElementById('success-text');
    var reopen = document.getElementById('reopen-mail');
    if (mode === 'sent') {
      title.textContent = 'Thank you, ' + d.name.split(' ')[0] + '!';
      text.textContent = 'Your message has been sent. I will reply to ' + d.email + ' as soon as I can.';
      reopen.hidden = true;
    } else {
      title.textContent = 'Almost there, ' + d.name.split(' ')[0] + '!';
      text.textContent = 'Your email app should open with your message ready to go. Just press send and it will reach me. If nothing opened, copy my email address below and write to me directly.';
      reopen.hidden = false; reopen.href = mailtoUrl(d);
    }
    panel.classList.add('is-sent');
    title.focus({ preventScroll: true });
    if (panel.getBoundingClientRect().top < 0) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function setLoading(on) {
    sendBtn.classList.toggle('is-loading', on);
    sendBtn.querySelector('span').textContent = on ? 'Sending...' : 'Send Message';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alertBox.classList.remove('is-shown');
    if (form.elements.website && form.elements.website.value) { showSuccess('sent', collect()); return; } // spam trap

    var firstBad = null;
    Object.keys(RULES).forEach(function (n) {
      var input = form.elements[n];
      if (!check(input) && !firstBad) firstBad = input;
    });
    if (firstBad) { firstBad.focus(); return; }

    var d = collect();
    var endpoint = form.dataset.endpoint;
    if (endpoint) {
      setLoading(true);
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(d) })
        .then(function (r) { if (!r.ok) throw new Error('bad status'); showSuccess('sent', d); })
        .catch(function () {
          alertBox.innerHTML = 'Sorry, the message could not be sent. Please <a href="' + mailtoUrl(d) + '">click here to email me instead</a>, or write to ' + EMAIL + '.';
          alertBox.classList.add('is-shown');
        })
        .then(function () { setLoading(false); });
    } else {
      window.location.href = mailtoUrl(d);
      showSuccess('mailto', d);
    }
  });

  /* ---------- Send another message ---------- */
  document.getElementById('send-again').addEventListener('click', function () {
    form.reset();
    Object.keys(RULES).forEach(function (n) { clearError(fieldOf(form.elements[n])); });
    topics.forEach(function (t) { t.setAttribute('aria-pressed', 'false'); });
    alertBox.classList.remove('is-shown');
    panel.classList.remove('is-sent');
    form.elements.name.focus();
  });
})();
