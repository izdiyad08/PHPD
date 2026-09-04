/* ===========================================================
   Sihat Bersama - shared scripts
   Plain JavaScript. Each block checks whether its element
   exists, so this one file is safe to load on every page.
   =========================================================== */

/* ---- mobile navigation ---- */
(function () {
  var btn = document.querySelector('.nav-toggle');
  var list = document.getElementById('navlist');
  if (!btn || !list) return;
  btn.addEventListener('click', function () {
    var open = list.getAttribute('data-open') === 'true';
    list.setAttribute('data-open', String(!open));
    btn.setAttribute('aria-expanded', String(!open));
  });
})();

/* ---- text size controls (session only, no storage) ---- */
(function () {
  var sizes = ['87.5%', '100%', '112.5%'];
  var current = 1;
  function apply() { document.documentElement.style.fontSize = sizes[current]; }
  var dec = document.getElementById('textSmaller');
  var reset = document.getElementById('textNormal');
  var inc = document.getElementById('textLarger');
  if (!dec || !reset || !inc) return;
  dec.addEventListener('click', function () { current = Math.max(0, current - 1); apply(); });
  reset.addEventListener('click', function () { current = 1; apply(); });
  inc.addEventListener('click', function () { current = Math.min(sizes.length - 1, current + 1); apply(); });
})();

/* ---- current year in footer ---- */
(function () {
  var y = document.querySelectorAll('[data-year]');
  var now = new Date().getFullYear();
  for (var i = 0; i < y.length; i++) y[i].textContent = now;
})();

/* ---- visitor counter (display only) ----
   Wire this to your own backend to make it real, for example:
   fetch('/api/views', {method:'POST'}).then(r=>r.json()).then(d=>{ el.textContent = d.total.toLocaleString(); });
   Laravel: Route::post('/api/views', fn() => ['total' => Cache::increment('page_views')]);
------------------------------------------------------------ */
(function () {
  var el = document.getElementById('viewCount');
  if (!el) return;
  var total = 12480;
  el.textContent = total.toLocaleString();
})();

/* ---- gallery category filter ---- */
(function () {
  var buttons = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.photo');
  if (!buttons.length || !items.length) return;
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      var cat = this.getAttribute('data-filter');
      for (var b = 0; b < buttons.length; b++) {
        buttons[b].setAttribute('aria-pressed', String(buttons[b] === this));
      }
      for (var n = 0; n < items.length; n++) {
        var show = cat === 'all' || items[n].getAttribute('data-cat') === cat;
        items[n].style.display = show ? '' : 'none';
      }
    });
  }
})();

/* ---- contact form validation (front end only) ---- */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = document.getElementById('formStatus');
    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();
    var message = form.querySelector('#message').value.trim();
    status.className = 'form-status error';

    if (!name) { status.textContent = 'Enter your name.'; return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { status.textContent = 'Enter a valid email address.'; return; }
    if (message.length < 10) { status.textContent = 'Your message is too short. Give us a little more detail.'; return; }

    status.className = 'form-status';
    status.textContent = 'Form validated. Connect it to a backend endpoint to deliver the message.';
    form.reset();
  });
})();

/* ---- search box placeholder behaviour ---- */
(function () {
  var search = document.getElementById('siteSearch');
  if (!search) return;
  search.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = this.querySelector('input').value.trim();
    alert(q ? 'Search is not connected yet. Query: ' + q : 'Type something to search.');
  });
})();
