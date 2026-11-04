/* GESLITA demo v2: elgsena. GSAP ScrollTrigger parallax sluoksniams, IntersectionObserver atsiradimams.
   Visi judesio efektai išjungiami esant prefers-reduced-motion. */
(function () {
  'use strict';
  var isStatic = /[?&]static=1/.test(location.search);
  if (isStatic) document.documentElement.classList.add('is-static');
  var reduce = isStatic || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) document.documentElement.classList.remove('js');
  var qs = function (s, c) { return (c || document).querySelector(s); };
  var qsa = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Antraštės būsena: sentinel + IntersectionObserver, be scroll listener */
  var head = qs('.site-head');
  var sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;height:12px;width:1px;pointer-events:none;';
  document.body.prepend(sentinel);
  new IntersectionObserver(function (entries) {
    if (head) head.classList.toggle('is-scrolled', !entries[0].isIntersecting);
  }, { threshold: 0 }).observe(sentinel);

  /* Mobilus meniu: fokusas perkeliamas į meniu ir grąžinamas uždarius */
  var toggle = qs('.nav-toggle'); var mobileNav = qs('.mobile-nav');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      if (open && mobileNav) { var first = qs('a', mobileNav); if (first) first.focus(); } else { toggle.focus(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) toggle.click();
    });
  }

  /* Išskleidžiami meniu: hover/focus per CSS, paspaudimas ir klaviatūra per .is-open */
  var dropItems = qsa('.site-nav li');
  var closeAll = function (except) { dropItems.forEach(function (li) { if (li !== except) { li.classList.remove('is-open'); var b = qs('button.navbtn', li); if (b) b.setAttribute('aria-expanded', 'false'); } }); };
  dropItems.forEach(function (li) {
    var btn = qs('button.navbtn', li);
    if (!btn) return;
    var set = function (v) { btn.setAttribute('aria-expanded', v ? 'true' : 'false'); };
    btn.addEventListener('click', function () { var open = li.classList.toggle('is-open'); closeAll(li); set(open); });
    li.addEventListener('mouseenter', function () { set(true); });
    li.addEventListener('mouseleave', function () { if (!li.classList.contains('is-open')) set(false); });
    li.addEventListener('keydown', function (e) { if (e.key === 'Escape') { li.classList.remove('is-open'); set(false); btn.focus(); } });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.site-nav')) closeAll(null); });

  /* Atsiradimai */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  qsa('[data-reveal], .step, .line-draw, .plan-layer').forEach(function (el) { io.observe(el); });

  /* Skaitikliai */
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target; cio.unobserve(el);
      var raw = el.getAttribute('data-count'); var target = parseFloat(raw); var suffix = el.getAttribute('data-suffix') || '';
      var dec = (raw.split('.')[1] || '').length;
      var fmt = function (v) { return v.toFixed(dec).replace('.', ',') + suffix; };
      if (reduce) { el.textContent = fmt(target); return; }
      var t0 = performance.now(); var dur = 1400;
      var tick = function (t) {
        var p = Math.min(1, (t - t0) / dur); var e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * e); if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  qsa('[data-count]').forEach(function (el) { cio.observe(el); });

  /* Lipnios šoninės navigacijos paryškinimas */
  var navLinks = qsa('.doc-nav a[href^="#"]');
  if (navLinks.length) {
    var map = {};
    navLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove('is-active'); });
          if (map[en.target.id]) map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) sio.observe(s); });
  }

  /* Paieška lentelėse ir kortelėse (ženklai, prekės) */
  var q = qs('[data-search]');
  if (q) {
    var rows = qsa('[data-name]'); var count = qs('[data-search-count]'); var groups = qsa('[data-search-group]');
    var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
    var run = function () {
      var v = norm(q.value.trim()); var n = 0;
      rows.forEach(function (r) { var hit = !v || norm(r.getAttribute('data-name')).indexOf(v) !== -1; r.hidden = !hit; if (hit) n++; });
      groups.forEach(function (g) { g.hidden = !qsa('[data-name]', g).some(function (r) { return !r.hidden; }); });
      if (count) count.textContent = v ? 'Rasta: ' + n : 'Iš viso: ' + rows.length;
    };
    q.addEventListener('input', run); run();
  }

  /* Forma (demo): tikrinimas su aria pranešimais; duomenys niekur nesiunčiami */
  qsa('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = true; var firstBad = null;
      qsa('.field', form).forEach(function (f) {
        var inp = qs('input,textarea,select', f); if (!inp) return;
        var err = qs('.err', f);
        var bad = (inp.required && !inp.value.trim()) || (inp.type === 'email' && inp.value.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inp.value));
        f.classList.toggle('is-invalid', bad);
        if (bad) { inp.setAttribute('aria-invalid', 'true'); if (err && err.id) inp.setAttribute('aria-describedby', err.id); if (!firstBad) firstBad = inp; ok = false; }
        else { inp.removeAttribute('aria-invalid'); inp.removeAttribute('aria-describedby'); }
      });
      if (!ok && firstBad) { firstBad.focus(); return; }
      var card = form.closest('.form-card'); card.classList.add('is-sent'); var okMsg = qs('.form-ok', card); if (okMsg) { okMsg.setAttribute('tabindex', '-1'); okMsg.focus(); }
    });
  });

  /* Video plytelė: kraunama tik priartėjus ir tik dideliuose ekranuose; su sumažintu judesiu lieka tik plakatas */
  /* Hero dūmų video: mažesnis failas telefonams, tik poster esant reduce motion ar taupymo režimui; stabdomas, kai hero nematomas */
  qsa('video[data-smoke]').forEach(function (v) {
    var saveData = navigator.connection && navigator.connection.saveData;
    if (reduce || saveData) return;
    v.src = v.getAttribute(window.matchMedia('(max-width: 960px)').matches ? 'data-src-sm' : 'data-src-lg');
    v.muted = true;
    var play = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    play();
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) play(); else v.pause(); });
    }, { threshold: 0 }).observe(v.closest('.hero') || v);
  });

  qsa('video[data-src]').forEach(function (v) {
    if (reduce || !window.matchMedia('(min-width: 961px)').matches) { v.removeAttribute('autoplay'); return; }
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { v.src = v.getAttribute('data-src'); v.play().catch(function () {}); vio.disconnect(); } });
    }, { rootMargin: '600px 0px' });
    vio.observe(v);
  });

  /* Hero slankiklis (WAI-ARIA tabbed carousel): automatinis slinkimas tik be reduce motion, stoja užvedus pelę ar fokusavus,
     sustabdymo mygtukas, rodyklės klaviatūroje, braukimas telefone. Progreso juosta yra CSS animacija, jos pabaiga perjungia skaidrę. */
  qsa('[data-slider]').forEach(function (root) {
    var tabs = qsa('.hs-tab', root), panels = qsa('.hs-text', root), imgs = qsa('.hs-img', root);
    var live = qs('.hs-texts', root), playBtn = qs('.hs-play', root);
    var n = tabs.length, cur = 0, playing = !reduce;
    root.style.setProperty('--dur', (parseInt(root.getAttribute('data-interval'), 10) || 6500) + 'ms');
    var setPlaying = function (on) {
      playing = on; root.classList.toggle('is-playing', on);
      playBtn.setAttribute('aria-label', on ? 'Sustabdyti automatinį slinkimą' : 'Įjungti automatinį slinkimą');
      live.setAttribute('aria-live', on ? 'off' : 'polite');
    };
    var go = function (i, focusTab) {
      i = (i + n) % n; if (i === cur) return;
      var prevImg = imgs[cur];
      tabs[cur].setAttribute('aria-selected', 'false'); tabs[cur].tabIndex = -1;
      panels[cur].hidden = true; panels[cur].classList.remove('is-active');
      prevImg.classList.remove('is-active'); prevImg.classList.add('is-prev'); prevImg.setAttribute('aria-hidden', 'true');
      setTimeout(function () { prevImg.classList.remove('is-prev'); }, 1150);
      cur = i;
      tabs[cur].setAttribute('aria-selected', 'true'); tabs[cur].tabIndex = 0;
      panels[cur].hidden = false; panels[cur].classList.add('is-active');
      imgs[cur].classList.add('is-active'); imgs[cur].removeAttribute('aria-hidden');
      if (focusTab) tabs[cur].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { go(i); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, to = k === 'ArrowRight' ? cur + 1 : k === 'ArrowLeft' ? cur - 1 : k === 'Home' ? 0 : k === 'End' ? n - 1 : null;
        if (to === null) return; e.preventDefault(); setPlaying(false); go(to, true);
      });
      qs('.fill', t).addEventListener('animationend', function () { if (playing && i === cur) go(cur + 1); });
    });
    qs('.hs-prev', root).addEventListener('click', function () { setPlaying(false); go(cur - 1); });
    qs('.hs-next', root).addEventListener('click', function () { setPlaying(false); go(cur + 1); });
    playBtn.addEventListener('click', function () { setPlaying(!playing); });
    root.addEventListener('mouseenter', function () { root.classList.add('is-hold'); });
    root.addEventListener('mouseleave', function () { if (!root.contains(document.activeElement)) root.classList.remove('is-hold'); });
    root.addEventListener('focusin', function () { root.classList.add('is-hold'); });
    root.addEventListener('focusout', function (e) { if (!root.contains(e.relatedTarget)) root.classList.remove('is-hold'); });
    var media = qs('.hs-media', root), x0 = null;
    media.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') x0 = e.clientX; });
    media.addEventListener('pointerup', function (e) {
      if (x0 === null) return; var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { setPlaying(false); go(dx < 0 ? cur + 1 : cur - 1); }
    });
    /* Nematomas hero nesislenka */
    new IntersectionObserver(function (es) { root.classList.toggle('is-off', !es[0].isIntersecting); }, { threshold: 0 }).observe(root);
    setPlaying(playing);
  });

  /* Gyvas darbo laikas pagal Vilniaus laiką (data-days="1-5", data-open="9", data-close="18"). Šventinės dienos neįvertinamos. */
  qsa('[data-open-status]').forEach(function (el) {
    var days = el.getAttribute('data-days').split('-'), d1 = +days[0], d2 = +days[1];
    var o = +el.getAttribute('data-open'), c = +el.getAttribute('data-close');
    var now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Vilnius' }));
    var wd = now.getDay() || 7, h = now.getHours() + now.getMinutes() / 60, workday = wd >= d1 && wd <= d2, open = false, txt;
    if (workday && h >= o && h < c) { open = true; txt = 'Dabar dirbame, atsiliepiame iki ' + c + ':00'; }
    else if (workday && h < o) txt = 'Šiandien dirbame nuo ' + o + ':00';
    else if (wd >= d1 && wd < d2) txt = 'Atsiliepsime rytoj nuo ' + o + ':00';
    else txt = 'Atsiliepsime pirmadienį nuo ' + o + ':00';
    el.classList.toggle('is-open', open);
    qs('.txt', el).textContent = txt;
  });

  /* El. pašto kopijavimas (rodomas tik ten, kur veikia Clipboard API) */
  qsa('[data-copy]').forEach(function (b) {
    if (!navigator.clipboard || !window.isSecureContext) return;
    b.hidden = false;
    var lbl = qs('span', b), orig = lbl.textContent;
    var done = function () {
      b.classList.add('is-done'); lbl.textContent = 'Nukopijuota';
      setTimeout(function () { b.classList.remove('is-done'); lbl.textContent = orig; }, 2000);
    };
    var fallback = function () {
      var t = document.createElement('textarea'); t.value = b.getAttribute('data-copy'); t.setAttribute('readonly', '');
      t.style.cssText = 'position:fixed;opacity:0;left:-9999px'; document.body.appendChild(t); t.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(t); if (ok) done();
    };
    b.addEventListener('click', function () {
      navigator.clipboard.writeText(b.getAttribute('data-copy')).then(done).catch(fallback);
    });
  });

  /* Evakuacijos planų hero: rėmelio spalva, šviesos jungiklis (tamsoje šviečiantis planas), švelnus pakreipimas pagal pelę */
  qsa('[data-ev-hero]').forEach(function (hero) {
    var frame = qs('[data-frame]', hero), light = qs('[data-light]', hero);
    var tipT = qs('[data-tip-title]', hero), tipX = qs('[data-tip-text]', hero);
    var dayTip = [tipT.textContent, tipX.textContent];
    qsa('input[name="frame"]', hero).forEach(function (r) {
      r.addEventListener('change', function () {
        frame.style.setProperty('--frame', r.value);
        if (light.getAttribute('aria-pressed') !== 'true') { tipT.textContent = 'Rėmelis: ' + r.closest('label').title.toLowerCase(); tipX.textContent = dayTip[1]; }
      });
    });
    light.addEventListener('click', function () {
      var on = light.getAttribute('aria-pressed') !== 'true';
      light.setAttribute('aria-pressed', on ? 'true' : 'false');
      hero.classList.toggle('is-dark', on);
      qs('.lbl', light).textContent = on ? 'Įjungti šviesą' : 'Išjungti šviesą';
      tipT.textContent = on ? 'Šviečia tamsoje' : dayTip[0];
      tipX.textContent = on ? 'Planas matomas ir dingus apšvietimui' : dayTip[1];
    });
    var tilt = qs('[data-tilt]', hero);
    if (tilt && !reduce && window.matchMedia('(pointer: fine) and (min-width: 961px)').matches) {
      var raf = 0, rx = 0, ry = 0;
      hero.addEventListener('pointermove', function (e) {
        var b = hero.getBoundingClientRect();
        ry = ((e.clientX - b.left) / b.width - 0.5) * 10; rx = -((e.clientY - b.top) / b.height - 0.5) * 6;
        if (!raf) raf = requestAnimationFrame(function () { raf = 0; tilt.style.transform = 'rotateY(' + ry.toFixed(2) + 'deg) rotateX(' + rx.toFixed(2) + 'deg)'; });
      });
      hero.addEventListener('pointerleave', function () { tilt.style.transform = ''; });
      tilt.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      tilt.style.transformStyle = 'preserve-3d';
    }
  });

  /* Hero įėjimas (be GSAP): palaukiama šriftų ir pagrindinės nuotraukos (ne ilgiau kaip 0,9 s), tada html.hero-ready paleidžia CSS seką */
  (function () {
    var root = document.documentElement, heroEl = qs('.hero');
    if (!heroEl || !root.classList.contains('js')) return;
    qsa('.hero-anim', heroEl).forEach(function (el, i) { if (!el.style.getPropertyValue('--hi')) el.style.setProperty('--hi', i); });
    var started = false;
    var go = function () {
      if (started) return; started = true;
      requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('hero-ready'); }); });
    };
    var waits = [];
    if (document.fonts && document.fonts.ready) waits.push(document.fonts.ready);
    qsa('img[fetchpriority="high"]', heroEl).forEach(function (im) {
      waits.push(im.decode ? im.decode().catch(function () {}) : Promise.resolve());
    });
    Promise.all(waits).then(go, go);
    setTimeout(go, 900);
  })();

  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* Teiginys: žodžiai ryškėja slenkant (tekstas lieka tekstu, žodžiai apgaubiami <span class="w">) */
  qsa('[data-words]').forEach(function (el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (tn) {
      var frag = document.createDocumentFragment();
      tn.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var w = document.createElement('span'); w.className = 'w'; w.textContent = part; frag.appendChild(w);
      });
      tn.parentNode.replaceChild(frag, tn);
    });
    gsap.fromTo(qsa('.w, .lt-flag', el), { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: 0.4 } });
  });

  /* Parallax: data-parallax="0.25" reiškia ±(0.25 * 160) px judesį, kol atskaitos blokas kerta ekraną */
  qsa('[data-parallax]').forEach(function (el) {
    var amt = parseFloat(el.getAttribute('data-parallax')) * 160;
    var root = el.closest('[data-parallax-root]') || el;
    gsap.fromTo(el, { y: -amt }, { y: amt, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
  });

  /* Hero: sluoksniai seka pelę (rAF, tik transform; atskiras elementas nuo parallax) */
  var hero = qs('.hero');
  if (hero && window.matchMedia('(pointer:fine)').matches) {
    var layers = qsa('[data-mouse]', hero); var raf = 0; var mx = 0; var my = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5; my = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(function () {
        raf = 0;
        layers.forEach(function (l) {
          var d = parseFloat(l.getAttribute('data-mouse'));
          gsap.to(l, { x: mx * d, y: my * d, duration: 1.2, ease: 'power3.out', overwrite: 'auto' });
        });
      });
    });
  }

})();
