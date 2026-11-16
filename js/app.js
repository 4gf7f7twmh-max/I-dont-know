/* Kochatlas – App-Logik (Routing, Ansichten, Kochmodus, Timer, Einkaufsliste, Editor, Online-Suche) */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var I = window.icon, DEV = window.DEVICES, CATS = window.CATS, ACTIONS = window.ACTIONS, ANIM = window.ANIM;

  /* ---------- Speicher ---------- */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('ka_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('ka_' + k, JSON.stringify(v)); } catch (e) { /* privat/blockiert */ } }
  };
  var S = {
    favs: store.get('favs', []),
    devices: store.get('devices', ['herd', 'ofen', 'airfryer', 'tm']),
    shop: store.get('shop', []),
    own: store.get('own', []),
    notes: store.get('notes', {}),
    theme: store.get('theme', 'auto'),
    onlyMine: store.get('onlyMine', true)
  };
  var save = function (k) { store.set(k, S[k]); };
  var ui = { f: { q: '', cat: '', dev: '', diet: '', time: 0, cuisine: '', sort: 'name' }, rec: {}, cook: null };

  /* ---------- Rezepte ---------- */
  function norm(r) {
    if (r._n) return r;
    r.m = r.m || {};
    r.devs = Object.keys(r.m);
    r.minTime = Infinity;
    r.devs.forEach(function (k) { if (r.m[k].t < r.minTime) r.minTime = r.m[k].t; });
    if (!isFinite(r.minTime)) r.minTime = 0;
    r.v = r.v || 0;
    r._search = fold([r.n, r.desc, r.k, (CATS[r.c] || {}).n, (r.ing || []).join(' '), (r.tags || []).join(' ')].join(' '));
    r._n = true;
    return r;
  }
  var _all = null;
  function all() {
    if (!_all) _all = window.RECIPES.concat(S.own).map(norm);
    return _all;
  }
  var resetAll = function () { _all = null; };
  var byId = function (id) { return all().filter(function (r) { return r.id === id; })[0]; };
  function fold(s) { return String(s || '').toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss').normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  var hue = function (r) { return ((CATS[r.c] || { h: 20 }).h + (hash(r.id) % 28) - 14 + 360) % 360; };
  var mineOK = function (r) { return r.devs.some(function (d) { return d === 'kalt' || S.devices.indexOf(d) >= 0; }); };
  var isFav = function (id) { return S.favs.indexOf(id) >= 0; };
  function fmtTime(m) {
    if (!m) return '–';
    if (m < 60) return m + ' Min';
    var h = Math.floor(m / 60), r = m % 60;
    return h + ' Std' + (r ? ' ' + r + ' Min' : '');
  }
  var DIFF = ['', 'Leicht', 'Mittel', 'Anspruchsvoll'];

  /* ---------- Zutaten skalieren ---------- */
  var FR = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125 };
  var QRE = /^(\d+[.,]\d+|\d+\/\d+|\d+\s?[½¼¾⅓⅔⅛]|\d+|[½¼¾⅓⅔⅛])(\s?(?:-|–|bis)\s?(\d+[.,]\d+|\d+))?(?=[\s a-zA-ZäöüÄÖÜ]|$)/;
  function toNum(s) {
    s = s.trim();
    if (FR[s] != null) return FR[s];
    var m = s.match(/^(\d+)\s?([½¼¾⅓⅔⅛])$/); if (m) return +m[1] + FR[m[2]];
    m = s.match(/^(\d+)\/(\d+)$/); if (m) return m[1] / m[2];
    return parseFloat(s.replace(',', '.'));
  }
  function fmtNum(n, metric) {
    if (metric) { if (n >= 100) return String(Math.round(n / 5) * 5); if (n >= 10) return String(Math.round(n)); return String(Math.round(n * 10) / 10).replace('.', ','); }
    if (n >= 10) return String(Math.round(n));
    var q = Math.round(n * 4) / 4, w = Math.floor(q), f = q - w;
    var fs = f === 0.25 ? '¼' : f === 0.5 ? '½' : f === 0.75 ? '¾' : '';
    if (!w && !fs) return '¼';
    return (w ? w : '') + fs;
  }
  function splitIng(str, f) {
    var m = str.match(QRE);
    if (!m) return { q: '', t: str };
    var rest = str.slice(m[0].length), unit = (rest.trim().split(/\s/)[0] || '').toLowerCase();
    var metric = /^(g|kg|ml|l|cl|dl)$/.test(unit);
    var a = toNum(m[1]) * f, q = fmtNum(a, metric);
    if (m[3]) q += '–' + fmtNum(toNum(m[3]) * f, metric);
    if (f === 1) q = m[0].trim();
    return { q: q, t: rest.trim() };
  }

  /* ---------- Schritte ---------- */
  function stepsFor(r, dev) {
    var out = [], m = r.m[dev] || { s: [] };
    (r.prep || []).forEach(function (s) { out.push({ a: s[0], t: s[1], o: s[2] || {}, ph: 'Vorbereitung' }); });
    (m.s || []).forEach(function (s) { out.push({ a: s[0], t: s[1], o: s[2] || {}, ph: DEV[dev] ? DEV[dev].n : '' }); });
    (r.post || []).forEach(function (s) { out.push({ a: s[0], t: s[1], o: s[2] || {}, ph: 'Fertigstellen' }); });
    return out;
  }
  function itemFor(r) { return ({ kuchen: 'cake', brot: 'loaf', fleisch: 'roast', veggie: 'tray', beilagen: 'tray', pasta: 'dish', snacks: 'tray', dessert: 'cake', fisch: 'tray' })[r.c] || 'dish'; }
  var MODES = { OU: 'Ober-/Unterhitze', U: 'Umluft', G: 'Grill', UG: 'Umluft + Grill', O: 'Oberhitze' };
  var HEATS = { max: 'Höchste Stufe (9 von 9)', hoch: 'Hohe Hitze (7–8 von 9)', mittel: 'Mittlere Hitze (5–6 von 9)', niedrig: 'Niedrige Hitze (2–3 von 9)' };
  function secsOf(o) { return o.sec != null ? o.sec : (o.t != null ? Math.round(o.t * 60) : 0); }
  function fmtDur(sec) {
    if (sec < 60) return sec + ' Sek.';
    var m = Math.round(sec / 60);
    return m >= 60 ? fmtTime(m) : m + ' Min';
  }
  function paramsHTML(o, label) {
    var p = [];
    if (o.c != null) p.push('<span class="param">' + I('thermo') + (o.c === 'Varoma' ? 'Varoma' : o.c + ' °C') + '</span>');
    if (o.mo) p.push('<span class="param">' + I('fan') + MODES[o.mo] + '</span>');
    if (o.h) p.push('<span class="param">' + I('flame') + HEATS[o.h] + '</span>');
    if (o.s != null) p.push('<span class="param">' + I('gauge') + (o.s === 'teig' ? 'Teigstufe' : o.s === 'sanft' ? 'Sanftrührstufe' : 'Stufe ' + o.s) + '</span>');
    if (o.l) p.push('<span class="param">' + I('rotate') + 'Linkslauf</span>');
    if (o.k) p.push('<span class="param">' + I('thermo') + 'Kerntemperatur ' + o.k + ' °C</span>');
    if (o.lvl) p.push('<span class="param">' + I('gauge') + 'Stufe ' + o.lvl + '</span>');
    if (o.p) p.push('<span class="param">' + I('gauge') + o.p + '</span>');
    if (o.w) p.push('<span class="param">' + I('bars') + o.w + ' Watt</span>');
    var sec = secsOf(o);
    if (sec) p.push('<button class="param timer" data-act="timer" data-sec="' + sec + '" data-label="' + esc(label) + '">' + I('timer') + fmtDur(sec) + ' · Timer</button>');
    return p.length ? '<div class="params">' + p.join('') + '</div>' : '';
  }

  /* ---------- Bausteine ---------- */
  function card(r) {
    var initials = r.n.replace(/[^A-Za-zÄÖÜäöü ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('');
    return '<a class="rcard" href="#/r/' + esc(r.id) + '" style="--h:' + hue(r) + '">' +
      '<div class="rvis">' + I('c_' + (CATS[r.c] || CATS.kreation).ic) + '<span class="initials">' + esc(initials) + '</span>' +
      (r.c === 'kreation' ? '<span class="badge k">Kreation</span>' : r.own ? '<span class="badge">Eigenes</span>' : r.v === 2 ? '<span class="badge">Vegan</span>' : r.v === 1 ? '<span class="badge">Vegetarisch</span>' : '') +
      '<button class="fav-btn ' + (isFav(r.id) ? 'on' : '') + '" data-act="fav" data-id="' + esc(r.id) + '" aria-label="Favorit">' + I('heart') + '</button></div>' +
      '<div class="rbody"><h3>' + esc(r.n) + '</h3><div class="rmeta"><span>' + esc(r.k || '') + '</span><span>' + I('clock', 'sm') + fmtTime(r.minTime) + '</span><span>' + DIFF[r.d || 1] + '</span></div>' +
      '<div class="rdevs">' + r.devs.map(function (d) { return '<span class="d ' + (S.devices.indexOf(d) >= 0 ? 'mine' : '') + '" title="' + esc(DEV[d] ? DEV[d].n : d) + '">' + I('d_' + d) + '</span>'; }).join('') + '</div></div></a>';
  }
  function devTile(d, on, act) {
    return '<button class="dev-tile ' + (on ? 'on' : '') + '" data-act="' + act + '" data-dev="' + d + '" aria-pressed="' + on + '">' + I('d_' + d) + '<span><b>' + DEV[d].n + '</b><small>' + DEV[d].sub + '</small></span></button>';
  }
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  function seeded(arr, seed) {
    var a = arr.slice(), s = seed;
    for (var i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; var j = Math.floor(s / 233280 * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var today = function () { var d = new Date(); return d.getFullYear() * 1000 + d.getMonth() * 40 + d.getDate(); };

  /* ---------- Ansicht: Start ---------- */
  function vHome() {
    var A = all(), mine = A.filter(mineOK);
    var hr = new Date().getHours();
    var greet = hr < 11 ? 'Guten Morgen' : hr < 17 ? 'Hallo' : 'Guten Abend';
    var kre = A.filter(function (r) { return r.c === 'kreation'; });
    var quick = seeded(mine.filter(function (r) { return r.minTime <= 30; }), today()).slice(0, 12);
    var pick = seeded(mine, today() + 7).slice(0, 12);
    var methods = A.reduce(function (s, r) { return s + r.devs.length; }, 0);
    var cuis = {};
    A.forEach(function (r) { if (r.k) cuis[r.k] = (cuis[r.k] || 0) + 1; });
    var cuisList = Object.keys(cuis).sort(function (a, b) { return cuis[b] - cuis[a]; });
    return '<section class="home-hero"><div class="deco">' + ANIM.scene('stir', { h: 'mittel' }).replace('class="scene', 'class="scene play force') + '</div>' +
      '<h1>' + greet + '! Was kochen wir heute?</h1><p>Jedes Rezept mit Schritt-für-Schritt-Anleitung für dein Gerät: Herd, Backofen, Heißluftfritteuse, Thermomix und mehr.</p>' +
      '<form class="searchbox" data-form="search">' + I('search') + '<input id="homeq" type="search" placeholder="Rezept, Zutat oder Land suchen …" autocomplete="off" aria-label="Suche"></form>' +
      '<div class="hero-stats"><div><b>' + A.length + '</b>Rezepte</div><div><b>' + methods + '</b>Geräte-Anleitungen</div><div><b>' + Object.keys(ACTIONS).length + '</b>animierte Techniken</div><div><b>' + cuisList.length + '</b>Länder & Regionen</div></div></section>' +

      '<section class="sec"><div class="sec-h"><h2>Meine Küche</h2><span class="muted" style="font-size:14px">Tippe an, was du hast</span></div><div class="dev-grid">' +
      Object.keys(DEV).filter(function (d) { return d !== 'kalt'; }).map(function (d) { return devTile(d, S.devices.indexOf(d) >= 0, 'mydev'); }).join('') + '</div></section>' +

      '<section class="sec cta-row"><button class="cta" data-act="random"><span class="ic">' + I('dice', 'lg') + '</span><span><b>Überrasch mich</b><span>Ein zufälliges Rezept für deine Geräte</span></span></button>' +
      '<a class="cta" href="#/welt"><span class="ic">' + I('globe', 'lg') + '</span><span><b>Weltweite Online-Suche</b><span>Hunderte weitere Rezepte aus einer freien Datenbank</span></span></a>' +
      '<a class="cta" href="#/neu"><span class="ic">' + I('edit', 'lg') + '</span><span><b>Eigenes Rezept anlegen</b><span>Mit automatischer Animation pro Schritt</span></span></a></section>' +

      '<section class="sec"><div class="sec-h"><h2>Kategorien</h2><a href="#/entdecken" data-act="fclear">Alle ansehen</a></div><div class="cat-grid">' +
      Object.keys(CATS).map(function (c) {
        var n = A.filter(function (r) { return r.c === c; }).length;
        return '<a class="cat-tile" href="#/entdecken" data-act="fcat" data-cat="' + c + '" style="--h:' + CATS[c].h + '">' + I('c_' + CATS[c].ic) + '<b>' + CATS[c].n + '</b><span>' + n + ' Rezepte</span></a>';
      }).join('') + '</div></section>' +

      '<section class="sec"><div class="sec-h"><h2>Eigene Kreationen</h2><a href="#/entdecken" data-act="fcat" data-cat="kreation">Alle</a></div><p class="muted" style="margin:-6px 0 12px">Ideen von mir, die es so in keinem Kochbuch gibt. Nicht in einer Testküche erprobt.</p><div class="hscroll">' + kre.map(card).join('') + '</div></section>' +
      (quick.length ? '<section class="sec"><div class="sec-h"><h2>In 30 Minuten fertig</h2><a href="#/entdecken" data-act="ftime">Alle</a></div><div class="hscroll">' + quick.map(card).join('') + '</div></section>' : '') +
      '<section class="sec"><div class="sec-h"><h2>Heute für dich</h2></div><div class="hscroll">' + pick.map(card).join('') + '</div></section>' +
      '<section class="sec"><div class="sec-h"><h2>Weltreise</h2></div><div class="chips">' +
      cuisList.map(function (k) { return '<a class="chip" href="#/entdecken" data-act="fcuisine" data-k="' + esc(k) + '">' + esc(k) + ' <span class="n">' + cuis[k] + '</span></a>'; }).join('') + '</div></section>';
  }

  /* ---------- Ansicht: Entdecken ---------- */
  function filtered() {
    var f = ui.f, q = fold(f.q).trim(), words = q ? q.split(/\s+/) : [];
    var res = all().filter(function (r) {
      if (f.cat && r.c !== f.cat) return false;
      if (f.dev && r.devs.indexOf(f.dev) < 0) return false;
      if (f.diet === 'veg' && r.v < 1) return false;
      if (f.diet === 'vegan' && r.v < 2) return false;
      if (f.time && r.minTime > f.time) return false;
      if (f.cuisine && r.k !== f.cuisine) return false;
      if (S.onlyMine && !f.dev && !mineOK(r)) return false;
      for (var i = 0; i < words.length; i++) if (r._search.indexOf(words[i]) < 0) return false;
      return true;
    });
    var srt = {
      name: function (a, b) { return a.n.localeCompare(b.n, 'de'); },
      time: function (a, b) { return a.minTime - b.minTime; },
      diff: function (a, b) { return (a.d || 1) - (b.d || 1); }
    }[f.sort];
    if (q) {
      res.sort(function (a, b) { var an = fold(a.n).indexOf(q) >= 0 ? 0 : 1, bn = fold(b.n).indexOf(q) >= 0 ? 0 : 1; return an - bn || srt(a, b); });
    } else res.sort(srt);
    return res;
  }
  function vExplore() {
    var f = ui.f, A = all();
    var cuis = {}; A.forEach(function (r) { if (r.k) cuis[r.k] = 1; });
    var chip = function (act, val, cur, label, extra) { return '<button class="chip ' + (cur === val ? 'on' : '') + '" data-act="' + act + '" data-v="' + esc(val) + '">' + (extra || '') + label + '</button>'; };
    return '<div class="explore-head"><h1>Entdecken</h1>' +
      '<div class="searchbox" style="max-width:none">' + I('search') + '<input id="q" type="search" value="' + esc(f.q) + '" placeholder="Suche nach Gericht, Zutat, Land …" autocomplete="off" aria-label="Suche"></div>' +
      '<div class="filter-label">Kategorie</div><div class="filter-row">' + chip('fc', '', f.cat, 'Alle') + Object.keys(CATS).map(function (c) { return chip('fc', c, f.cat, CATS[c].n); }).join('') + '</div>' +
      '<div class="filter-label">Gerät</div><div class="filter-row">' + chip('fd', '', f.dev, 'Alle Geräte') + Object.keys(DEV).map(function (d) { return chip('fd', d, f.dev, DEV[d].n, I('d_' + d, 'sm')); }).join('') + '</div>' +
      '<div class="filter-label">Ernährung & Zeit</div><div class="filter-row">' + chip('fv', '', f.diet, 'Alles') + chip('fv', 'veg', f.diet, 'Vegetarisch') + chip('fv', 'vegan', f.diet, 'Vegan') +
      chip('ft', '0', String(f.time), 'Jede Dauer') + chip('ft', '20', String(f.time), '≤ 20 Min') + chip('ft', '30', String(f.time), '≤ 30 Min') + chip('ft', '60', String(f.time), '≤ 1 Std') + '</div>' +
      '<div class="filter-bar"><select class="input" data-change="fk" aria-label="Küche"><option value="">Alle Länder</option>' +
      Object.keys(cuis).sort(function (a, b) { return a.localeCompare(b, 'de'); }).map(function (k) { return '<option ' + (f.cuisine === k ? 'selected' : '') + '>' + esc(k) + '</option>'; }).join('') + '</select>' +
      '<select class="input" data-change="fs" aria-label="Sortierung"><option value="name"' + (f.sort === 'name' ? ' selected' : '') + '>A–Z</option><option value="time"' + (f.sort === 'time' ? ' selected' : '') + '>Schnellste zuerst</option><option value="diff"' + (f.sort === 'diff' ? ' selected' : '') + '>Einfachste zuerst</option></select>' +
      '<label class="toggle"><input type="checkbox" data-change="fm" ' + (S.onlyMine ? 'checked' : '') + '> Nur für meine Geräte</label></div></div>' +
      '<div id="results"></div>';
  }
  function renderResults() {
    var el = $('#results'); if (!el) return;
    var res = filtered();
    el.innerHTML = '<div class="result-count">' + res.length + ' Rezepte' + (res.length === 0 ? '' : '') + '</div>' +
      (res.length ? '<div class="grid">' + res.map(card).join('') + '</div>' :
        '<div class="empty">' + I('search') + '<h3>Nichts gefunden</h3><p>Filter lockern oder in der <a href="#/welt" style="color:var(--accent);font-weight:700">weltweiten Online-Suche</a> nachsehen.</p></div>');
  }

  /* ---------- Ansicht: Rezept ---------- */
  function pickDev(r) {
    var st = ui.rec[r.id];
    if (st && st.dev && r.m[st.dev]) return st.dev;
    for (var i = 0; i < S.devices.length; i++) if (r.m[S.devices[i]]) return S.devices[i];
    return r.devs[0];
  }
  function recState(r) {
    if (!ui.rec[r.id]) ui.rec[r.id] = { p: r.p || 4, done: {} };
    var st = ui.rec[r.id]; st.dev = pickDev(r); return st;
  }
  function vRecipe(id) {
    var r = byId(id);
    if (!r) return '<div class="empty">' + I('info') + '<h3>Rezept nicht gefunden</h3><p><a href="#/" style="color:var(--accent)">Zur Startseite</a></p></div>';
    var st = recState(r), dev = st.dev, f = st.p / (r.p || 4), m = r.m[dev] || {};
    var steps = stepsFor(r, dev), ctx = { item: itemFor(r) };
    var ingHTML = (r.ing || []).map(function (s, i) {
      if (s[0] === '#') return '<li class="grp">' + esc(s.slice(1)) + '</li>';
      var x = splitIng(s, f);
      return '<li class="' + (st.done[i] ? 'done' : '') + '" data-act="ing" data-i="' + i + '"><span class="cb">' + I('check', 'sm') + '</span><span class="t">' + (x.q ? '<span class="q">' + esc(x.q) + '</span> ' : '') + esc(x.t) + '</span></li>';
    }).join('');
    var stepHTML = steps.map(function (s, i) {
      return '<div class="step"><div class="stage" data-act="force">' + ANIM.scene(s.a, s.o, ctx) + '<span class="alabel">' + esc(ACTIONS[ANIM.norm(s.a)] || '') + '</span></div><div>' +
        '<div class="step-n"><span class="num">' + (i + 1) + '</span><span class="phase">' + esc(s.ph) + '</span></div><p>' + esc(s.t) + '</p>' + paramsHTML(s.o, r.n + ' · Schritt ' + (i + 1)) + '</div></div>';
    }).join('');
    return '<article>' +
      '<div class="rhero" style="--h:' + hue(r) + '"><div class="rhero-top"><button class="glass-btn" data-act="back" aria-label="Zurück">' + I('back') + '</button>' +
      '<span style="display:flex;gap:8px"><button class="glass-btn" data-act="share" aria-label="Teilen">' + I('share') + '</button>' +
      (r.own ? '<a class="glass-btn" href="#/bearbeiten/' + esc(r.id) + '" aria-label="Bearbeiten">' + I('edit') + '</a>' : '') +
      '<button class="glass-btn ' + (isFav(r.id) ? 'on' : '') + '" data-act="fav" data-id="' + esc(r.id) + '" aria-label="Favorit">' + I('heart') + '</button></span></div>' +
      '<div class="rhero-ic">' + I('c_' + (CATS[r.c] || CATS.kreation).ic) + '</div>' +
      '<div class="rhero-txt"><span class="pill">' + esc((CATS[r.c] || {}).n || '') + (r.k ? ' · ' + esc(r.k) : '') + '</span><h1>' + esc(r.n) + '</h1>' + (r.desc ? '<p>' + esc(r.desc) + '</p>' : '') + '</div></div>' +
      '<div class="rstats"><div class="rstat">' + I('clock') + '<b>' + fmtTime(m.t) + '</b><span>Gesamtzeit</span></div><div class="rstat">' + I('bars') + '<b>' + DIFF[r.d || 1] + '</b><span>Schwierigkeit</span></div>' +
      '<div class="rstat">' + I('list') + '<b>' + steps.length + '</b><span>Schritte</span></div><div class="rstat">' + I('c_leaf') + '<b>' + (r.v === 2 ? 'Vegan' : r.v === 1 ? 'Vegetarisch' : 'Mit Fleisch/Fisch') + '</b><span>Ernährung</span></div></div>' +
      (r.c === 'kreation' ? '<div class="kreation-note">' + I('spark') + '<div><b>Eigene Kreation.</b> Diese Kombination habe ich mir ausgedacht. Die einzelnen Techniken sind erprobt, das Rezept als Ganzes wurde nicht in einer Testküche nachgekocht. Beim ersten Mal lieber nicht direkt für Gäste kochen und nach Geschmack nachjustieren.</div></div>' : '') +
      (r.src ? '<div class="info" style="margin-bottom:14px">Quelle: ' + esc(r.src) + '</div>' : '') +
      '<section class="devpick"><h2>Womit kochst du?</h2><div class="devtabs">' + r.devs.map(function (d) {
        return '<button class="devtab ' + (d === dev ? 'on ' : '') + (S.devices.indexOf(d) < 0 && d !== 'kalt' ? 'notmine' : '') + '" data-act="tab" data-dev="' + d + '">' + I('d_' + d) + '<span><b>' + DEV[d].n + '</b><small>' + fmtTime(r.m[d].t) + '</small></span></button>';
      }).join('') + '</div></section>' +
      '<div class="rcols"><aside class="ingbox card-box"><h2>Zutaten</h2>' +
      '<div class="portions"><button data-act="por" data-d="-1" aria-label="Weniger">' + I('minus') + '</button><b>' + st.p + ' ' + esc(r.pu || (st.p === 1 ? 'Portion' : 'Portionen')) + '</b><button data-act="por" data-d="1" aria-label="Mehr">' + I('plus') + '</button></div>' +
      '<ul class="ing-list">' + ingHTML + '</ul>' +
      '<button class="btn block" style="margin-top:14px" data-act="toshop">' + I('cart') + 'Auf die Einkaufsliste</button><p class="muted" style="font-size:12.5px;margin:8px 0 0">Abgehakte Zutaten (schon vorhanden) werden nicht übernommen.</p></aside>' +
      '<section class="steps"><div class="steps-head"><h2>Zubereitung · ' + esc(DEV[dev].n) + '</h2><button class="btn primary" data-act="cook">' + I('play') + 'Kochmodus starten</button></div>' +
      (m.note ? '<div class="method-note">' + I('info') + '<span>' + esc(m.note) + '</span></div>' : '') + stepHTML +
      (r.tips && r.tips.length ? '<div class="tips card-box"><h2 style="font-size:18px;display:flex;gap:8px;align-items:center">' + I('bulb') + 'Tipps</h2><ul>' + r.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' : '') +
      '<div class="note-area card-box" style="margin-top:14px"><div class="field" style="margin:0"><label for="note">Meine Notizen</label><textarea class="input" id="note" data-id="' + esc(r.id) + '" placeholder="z. B. „Beim nächsten Mal weniger Salz“">' + esc(S.notes[r.id] || '') + '</textarea><small>Wird nur auf diesem Gerät gespeichert.</small></div></div>' +
      '</section></div></article>';
  }

  /* ---------- Kochmodus ---------- */
  var wake = null;
  function lockWake() { try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (w) { wake = w; }).catch(function () {}); } catch (e) {} }
  function openCook(r) {
    var st = recState(r);
    ui.cook = { r: r, dev: st.dev, steps: stepsFor(r, st.dev), i: 0, ings: false };
    $('#cook').hidden = false; document.body.style.overflow = 'hidden';
    lockWake(); renderCook();
  }
  function closeCook() {
    ui.cook = null; $('#cook').hidden = true; $('#cook').innerHTML = ''; document.body.style.overflow = '';
    if (wake) { try { wake.release(); } catch (e) {} wake = null; }
  }
  function renderCook() {
    var c = ui.cook; if (!c) return;
    var s = c.steps[c.i], n = c.steps.length, r = c.r, st = ui.rec[r.id], f = st.p / (r.p || 4);
    $('#cook').innerHTML = '<div class="cook-top"><button class="icon-btn" data-act="cookclose" aria-label="Schließen">' + I('close') + '</button><div class="ttl"><b>' + esc(r.n) + '</b><small>' + esc(DEV[c.dev].n) + ' · Schritt ' + (c.i + 1) + ' von ' + n + '</small></div>' +
      '<button class="btn sm" data-act="cookings">' + I('list', 'sm') + 'Zutaten</button></div><div class="cook-prog"><i style="width:' + ((c.i + 1) / n * 100) + '%"></i></div>' +
      (c.ings ? '<div class="cook-ings card-box"><ul class="ing-list">' + (r.ing || []).map(function (x) { if (x[0] === '#') return '<li class="grp">' + esc(x.slice(1)) + '</li>'; var y = splitIng(x, f); return '<li><span class="t">' + (y.q ? '<span class="q">' + esc(y.q) + '</span> ' : '') + esc(y.t) + '</span></li>'; }).join('') + '</ul></div>' : '') +
      '<div class="cook-body"><div class="cook-stage">' + ANIM.scene(s.a, s.o, { item: itemFor(r) }).replace('class="scene', 'class="scene play force') + '</div>' +
      '<div class="cook-step"><div class="step-n"><span class="num">' + (c.i + 1) + '</span><span class="phase">' + esc(ACTIONS[ANIM.norm(s.a)] || '') + ' · ' + esc(s.ph) + '</span></div><p>' + esc(s.t) + '</p>' + paramsHTML(s.o, r.n + ' · Schritt ' + (c.i + 1)) + '</div></div>' +
      '<div class="cook-nav"><button class="btn" data-act="cookprev" ' + (c.i === 0 ? 'disabled style="opacity:.4"' : '') + '>' + I('back') + 'Zurück</button>' +
      (c.i < n - 1 ? '<button class="btn primary" data-act="cooknext">Weiter' + I('next') + '</button>' : '<button class="btn primary" data-act="cookclose">' + I('check') + 'Fertig. Guten Appetit!</button>') + '</div>';
  }
  function cookGo(d) { var c = ui.cook; if (!c) return; var ni = c.i + d; if (ni < 0 || ni >= c.steps.length) return; c.i = ni; renderCook(); }

  /* ---------- Timer ---------- */
  var timers = [], tick = null, actx = null, alarmIv = null;
  function beep() {
    try {
      if (!actx) return;
      [0, 0.25, 0.5].forEach(function (off) {
        var o = actx.createOscillator(), g = actx.createGain();
        o.type = 'sine'; o.frequency.value = 880; o.connect(g); g.connect(actx.destination);
        var t0 = actx.currentTime + off; g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.4, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
        o.start(t0); o.stop(t0 + 0.22);
      });
    } catch (e) {}
  }
  function startTimer(sec, label) {
    try { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); } catch (e) {}
    timers.push({ id: Date.now() + Math.random(), label: label, end: Date.now() + sec * 1000, done: false });
    toast('Timer gestartet: ' + fmtDur(sec));
    if (!tick) tick = setInterval(renderTimers, 250);
    renderTimers();
  }
  function renderTimers() {
    var now = Date.now(), ringing = false;
    $('#timers').innerHTML = timers.map(function (t) {
      var left = Math.max(0, Math.round((t.end - now) / 1000));
      if (!left && !t.done) { t.done = true; try { navigator.vibrate && navigator.vibrate([300, 150, 300, 150, 300]); } catch (e) {} }
      if (t.done) ringing = true;
      var mm = Math.floor(left / 60), ss = left % 60, hh = Math.floor(mm / 60);
      var txt = t.done ? 'Fertig!' : (hh ? hh + ':' + String(mm % 60).padStart(2, '0') : mm) + ':' + String(ss).padStart(2, '0');
      return '<div class="tmr ' + (t.done ? 'done' : '') + '"><span><span class="tlabel">' + esc(t.label) + '</span><br><span class="tt">' + txt + '</span></span><button data-act="tstop" data-id="' + t.id + '" aria-label="Timer beenden">' + I(t.done ? 'check' : 'close', 'sm') + '</button></div>';
    }).join('');
    if (ringing && !alarmIv) { beep(); alarmIv = setInterval(beep, 1300); }
    if (!ringing && alarmIv) { clearInterval(alarmIv); alarmIv = null; }
    if (!timers.length && tick) { clearInterval(tick); tick = null; }
  }

  /* ---------- Einkaufsliste ---------- */
  function vShop() {
    var open = S.shop.filter(function (x) { return !x.done; }).length;
    return '<div class="page-h"><h1>Einkaufsliste</h1><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" data-act="shopshare">' + I('share', 'sm') + 'Teilen</button><button class="btn sm" data-act="shopclean">Erledigte entfernen</button><button class="btn sm danger" data-act="shopclear">Alles löschen</button></div></div>' +
      '<div class="card-box"><form class="add-row" data-form="shopadd"><input class="input" id="shopnew" placeholder="Artikel hinzufügen, z. B. 1 Liter Milch" autocomplete="off"><button class="btn primary" aria-label="Hinzufügen">' + I('plus') + '</button></form>' +
      (S.shop.length ? '<p class="muted" style="margin:0 0 6px;font-size:14px">' + open + ' offen</p><ul class="list">' + S.shop.map(function (x, i) {
        return '<li class="' + (x.done ? 'done' : '') + '"><button class="cb" data-act="shoptoggle" data-i="' + i + '" aria-label="Abhaken">' + I('check', 'sm') + '</button><span class="t">' + esc(x.t) + (x.from ? '<small>' + esc(x.from) + '</small>' : '') + '</span><button class="icon-btn" data-act="shopdel" data-i="' + i + '" aria-label="Entfernen">' + I('trash', 'sm') + '</button></li>';
      }).join('') + '</ul>' : '<div class="empty">' + I('cart') + '<h3>Noch leer</h3><p>Auf einer Rezeptseite „Auf die Einkaufsliste“ tippen.</p></div>') + '</div>';
  }

  /* ---------- Favoriten ---------- */
  function vFavs() {
    var list = S.favs.map(byId).filter(Boolean);
    return '<div class="page-h"><h1>Favoriten</h1></div>' + (list.length ? '<div class="grid">' + list.map(card).join('') + '</div>' :
      '<div class="empty">' + I('heart') + '<h3>Noch keine Favoriten</h3><p>Tippe bei einem Rezept auf das Herz.</p></div>');
  }

  /* ---------- Meine Rezepte & Einstellungen ---------- */
  function vMine() {
    var own = all().filter(function (r) { return r.own; });
    return '<div class="page-h"><h1>Meine Rezepte</h1><a class="btn primary" href="#/neu">' + I('plus') + 'Neues Rezept</a></div>' +
      (own.length ? '<div class="grid">' + own.map(card).join('') + '</div>' : '<div class="card-box empty">' + I('book') + '<h3>Noch keine eigenen Rezepte</h3><p>Lege dein erstes Rezept an. Animation, Temperatur, Stufe und Timer erkennt die App automatisch aus deinem Text.</p></div>') +
      '<section class="sec"><div class="sec-h"><h2>Meine Geräte</h2></div><div class="dev-grid">' + Object.keys(DEV).filter(function (d) { return d !== 'kalt'; }).map(function (d) { return devTile(d, S.devices.indexOf(d) >= 0, 'mydev'); }).join('') + '</div></section>' +
      '<section class="sec two-col"><div class="card-box"><h2 style="font-size:18px;margin-bottom:10px">Sichern & Übertragen</h2><p class="muted" style="font-size:14px;margin-top:0">Eigene Rezepte als Datei exportieren, um sie auf einem anderen Gerät zu importieren.</p>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-act="export">' + I('download', 'sm') + 'Exportieren</button><label class="btn" style="cursor:pointer">' + I('upload', 'sm') + 'Importieren<input type="file" accept="application/json,.json" data-change="import" hidden></label></div></div>' +
      '<div class="card-box"><h2 style="font-size:18px;margin-bottom:10px">Darstellung</h2><div class="chips">' +
      ['auto', 'light', 'dark'].map(function (t) { return '<button class="chip ' + (S.theme === t ? 'on' : '') + '" data-act="theme" data-v="' + t + '">' + { auto: 'Automatisch', light: 'Hell', dark: 'Dunkel' }[t] + '</button>'; }).join('') + '</div>' +
      '<p class="muted" style="font-size:13px;margin:14px 0 0">Alle Daten (Favoriten, Einkaufsliste, Notizen, eigene Rezepte) bleiben lokal in diesem Browser.</p></div></section>';
  }

  /* ---------- Editor ---------- */
  var REV = {}; Object.keys(ACTIONS).forEach(function (k) { REV[fold(ACTIONS[k])] = k; REV[k] = k; });
  var RULES_DE = [
    ['tm', /stufe\s*\d|linkslauf|teigstufe|sanftruhr|mixtopf|varoma|messbecher/],
    ['airfry', /airfryer|heissluftfritteuse|frittierkorb/],
    ['micro', /mikrowelle/], ['pressure', /schnellkochtopf|hochdruck|druck ablassen|dampfdruck/], ['slow', /slow ?cooker|schongarer/],
    ['bake', /backofen|im ofen|backen|uberbacken|gratinier|vorheizen|blech/], ['grill', /grill/],
    ['deepfry', /frittier|ausbacken|im heissen ol|schwimmend/], ['knead', /knet/], ['roll', /ausroll/], ['grate', /reib|raspel/],
    ['chop', /schneid|wurfel|hacken|hobel|scheiben|streifen|ringe|halbier|viertel|zerkleiner|schal/],
    ['shape', /formen|kugeln|rollen|fullen|befull/], ['blend', /purier|stabmixer|standmixer/], ['mash', /stampf/], ['fold', /unterheb/],
    ['mix', /handmixer|ruhrgerat|aufschlagen|steif schlagen|schaumig/], ['whisk', /verquirl|schneebesen|glatt ruhren/],
    ['flip', /wenden|schwenken|wok/], ['fry', /brat|anbrat|rost|anschwitz|dunst|karamellis/], ['steam', /dampf/],
    ['simmer', /kocheln|schmor|einkochen|reduzier|ziehen lassen/], ['boil', /kochen|aufkoch|blanchier|sieden|garen/],
    ['stir', /ruhr|schmelz/], ['chill', /kuhlschrank|kalt stellen|kuhlen|gefrier/], ['cool', /abkuhl|auskuhl/],
    ['rest', /ruhen|gehen lassen|quellen|marinier|einweich/], ['layer', /schicht/], ['spread', /bestreich|verstreich|bepinsel/],
    ['pour', /giess|ablosch|auffull/], ['season', /wurz|abschmeck|salzen|pfeffern/], ['serve', /servier|anricht|garnier/]
  ];
  var RULES_EN = [
    ['airfry', /air ?fryer/], ['micro', /microwave/], ['pressure', /pressure cooker|instant pot/], ['slow', /slow cooker|crock ?pot/],
    ['bake', /oven|bake|baking|roast|broil|gratin/], ['grill', /grill|barbecue|bbq/], ['deepfry', /deep[- ]fry|deep fat/],
    ['knead', /knead/], ['roll', /roll out|rolling pin/], ['grate', /grate|zest/], ['chop', /chop|dice|slice|mince|cut |peel|halve|quarter/],
    ['shape', /shape|form into|stuff|fill /], ['blend', /blend|puree|purée|food processor/], ['mash', /mash/], ['fold', /fold in/],
    ['mix', /beat|electric mixer|whip/], ['whisk', /whisk/], ['flip', /flip|toss|turn over|stir[- ]fry|wok/],
    ['fry', /fry|brown|saute|sauté|sear|cook the onion/], ['steam', /steam/], ['simmer', /simmer|reduce|braise|stew/],
    ['boil', /boil|blanch|poach/], ['stir', /stir|melt/], ['chill', /fridge|refrigerat|chill|freeze/], ['cool', /cool/],
    ['rest', /rest|marinate|rise|prove|proof|soak|leave to/], ['layer', /layer/], ['spread', /spread|brush/],
    ['pour', /pour|add the stock|add the water|deglaze/], ['season', /season|salt and pepper|sprinkle/], ['serve', /serve|garnish|plate/]
  ];
  function autoStep(text, dev, lang) {
    var raw = text.trim(), forced = null, mm = raw.match(/^\[([^\]]+)\]\s*/);
    if (mm) { forced = REV[fold(mm[1]).trim()] || null; raw = raw.slice(mm[0].length); }
    var t = fold(raw), o = {}, a = forced;
    if (!a) { var rules = lang === 'en' ? RULES_EN : RULES_DE; for (var i = 0; i < rules.length; i++) if (rules[i][1].test(t)) { a = rules[i][0]; break; } }
    a = a || 'prep';
    if (dev === 'tm' && !forced && /\d\s*(min|sek|sec)/.test(t) && ['boil', 'stir', 'simmer', 'fry', 'blend', 'chop', 'mix', 'whisk', 'knead', 'steam', 'prep'].indexOf(a) >= 0) a = 'tm';
    if (dev === 'airfryer' && ['bake', 'fry', 'boil', 'deepfry', 'grill'].indexOf(a) >= 0) a = 'airfry';
    if (dev === 'mikro' && ['boil', 'stir', 'simmer', 'bake'].indexOf(a) >= 0) a = 'micro';
    if (dev === 'slow' && ['boil', 'simmer', 'stir'].indexOf(a) >= 0) a = 'slow';
    if (dev === 'dkt' && ['boil', 'simmer', 'steam'].indexOf(a) >= 0) a = 'pressure';
    var m;
    if (lang === 'en') {
      if ((m = t.match(/(\d+(?:\.\d+)?)\s*(?:-|to)?\s*(?:\d+)?\s*(?:min|minutes|mins)\b/))) o.t = +m[1];
      else if ((m = t.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\b/))) o.t = Math.round(+m[1] * 60);
      if ((m = t.match(/(\d{2,3})\s*°?\s*c\b/))) o.c = +m[1];
      else if ((m = t.match(/(\d{3})\s*°?\s*f\b/))) o.c = Math.round((m[1] - 32) * 5 / 9 / 5) * 5;
      if (/high heat/.test(t)) o.h = 'hoch'; else if (/medium heat|medium-high/.test(t)) o.h = 'mittel'; else if (/low heat/.test(t)) o.h = 'niedrig';
      if (/fan/.test(t) && a === 'bake') o.mo = 'U';
    } else {
      if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:(?:-|bis)\s*\d+(?:[.,]\d+)?\s*)?(?:min\b|minuten|min\.)/))) o.t = parseFloat(m[1].replace(',', '.'));
      else if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:(?:-|bis)\s*\d+\s*)?(?:std|stunden|stunde)\b/))) o.t = Math.round(parseFloat(m[1].replace(',', '.')) * 60);
      if ((m = t.match(/(\d+)\s*(?:sek|sekunden|sec)\b/))) { o.sec = +m[1]; delete o.t; }
      if ((m = t.match(/(\d{2,3})\s*°/))) o.c = +m[1];
      if (/varoma/.test(t)) o.c = 'Varoma';
      if (dev === 'tm' || a === 'tm') {
        if ((m = t.match(/stufe\s*(\d+(?:[.,]\d+)?)/))) o.s = parseFloat(m[1].replace(',', '.'));
        if (/teigstufe/.test(t)) o.s = 'teig';
        if (/sanftruhr/.test(t)) o.s = 'sanft';
        if (/linkslauf/.test(t)) o.l = true;
      }
      if (/umluft/.test(t)) o.mo = 'U'; else if (/ober.{0,6}unterhitze/.test(t)) o.mo = 'OU'; else if (/grillfunktion|backofengrill/.test(t)) o.mo = 'G';
      if (/(hoher|hohe|starker|starke) hitze/.test(t)) o.h = 'hoch'; else if (/mittler\w* hitze/.test(t)) o.h = 'mittel'; else if (/(niedrig|schwach|klein)\w* hitze/.test(t)) o.h = 'niedrig';
      if ((m = t.match(/(\d{3,4})\s*(?:w|watt)\b/))) o.w = +m[1];
      if ((m = t.match(/kerntemperatur\D{0,12}(\d{2})/))) o.k = +m[1];
    }
    return [a, raw, o];
  }
  window.KA_autoStep = autoStep;

  function vEdit(id) {
    var r = id ? S.own.filter(function (x) { return x.id === id; })[0] : null;
    if (id && !r) return '<div class="empty"><h3>Rezept nicht gefunden</h3></div>';
    r = r || { n: '', desc: '', c: 'veggie', k: '', p: 4, d: 1, v: 0, ing: [], prep: [], m: {} };
    var toTxt = function (arr) { return (arr || []).map(function (s) { return '[' + (ACTIONS[s[0]] || s[0]) + '] ' + s[1]; }).join('\n'); };
    return '<div class="page-h"><h1>' + (id ? 'Rezept bearbeiten' : 'Neues Rezept') + '</h1></div><form class="card-box" data-form="edit" data-id="' + esc(id || '') + '">' +
      '<div class="two-col"><div><div class="field"><label for="e_n">Name</label><input class="input" id="e_n" required value="' + esc(r.n) + '"></div>' +
      '<div class="field"><label for="e_desc">Kurzbeschreibung</label><input class="input" id="e_desc" value="' + esc(r.desc) + '"></div>' +
      '<div class="two-col" style="gap:10px"><div class="field"><label for="e_c">Kategorie</label><select class="input" id="e_c">' + Object.keys(CATS).map(function (c) { return '<option value="' + c + '"' + (r.c === c ? ' selected' : '') + '>' + CATS[c].n + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label for="e_k">Land / Küche</label><input class="input" id="e_k" value="' + esc(r.k) + '" placeholder="z. B. Italien"></div>' +
      '<div class="field"><label for="e_p">Portionen</label><input class="input" id="e_p" type="number" min="1" max="99" value="' + (r.p || 4) + '"></div>' +
      '<div class="field"><label for="e_d">Schwierigkeit</label><select class="input" id="e_d">' + [1, 2, 3].map(function (x) { return '<option value="' + x + '"' + (r.d === x ? ' selected' : '') + '>' + DIFF[x] + '</option>'; }).join('') + '</select></div></div>' +
      '<div class="field"><label for="e_v">Ernährung</label><select class="input" id="e_v"><option value="0">Mit Fleisch oder Fisch</option><option value="1"' + (r.v === 1 ? ' selected' : '') + '>Vegetarisch</option><option value="2"' + (r.v === 2 ? ' selected' : '') + '>Vegan</option></select></div>' +
      '<div class="field"><label for="e_ing">Zutaten</label><textarea class="input" id="e_ing" rows="8" placeholder="400 g Spaghetti&#10;2 Knoblauchzehen&#10;#Für die Soße&#10;…">' + esc((r.ing || []).join('\n')) + '</textarea><small>Eine Zutat pro Zeile, Menge vorne (wird beim Portionen-Umrechnen skaliert). Zwischenüberschrift mit # beginnen.</small></div></div>' +
      '<div><div class="field"><label for="e_prep">Vorbereitung (für alle Geräte gleich)</label><textarea class="input" id="e_prep" rows="4" placeholder="Zwiebel fein würfeln.">' + esc(toTxt(r.prep)) + '</textarea></div>' +
      '<div class="info" style="margin-bottom:12px">Ein Schritt pro Zeile. Animation und Einstellungen werden aus dem Text erkannt, z. B. „25 Min“, „180 °C Umluft“, „Stufe 4“, „Linkslauf“, „mittlere Hitze“. Optional die Technik in eckigen Klammern vorne angeben, z. B. „[Kneten] Teig 10 Min kneten“.</div>' +
      Object.keys(DEV).map(function (d) {
        var m = r.m[d];
        return '<div class="dev-steps"><h4><label class="toggle"><input type="checkbox" data-dev="' + d + '" class="e_dev"' + (m ? ' checked' : '') + '>' + I('d_' + d, 'sm') + DEV[d].n + '</label></h4>' +
          '<div class="two-col" style="grid-template-columns:1fr 120px;gap:8px"><textarea class="input e_steps" data-dev="' + d + '" rows="4" placeholder="Schritte für ' + DEV[d].n + ' …">' + esc(m ? toTxt(m.s) : '') + '</textarea>' +
          '<div class="field" style="margin:0"><label style="font-size:12px">Gesamtzeit (Min)</label><input class="input e_time" data-dev="' + d + '" type="number" min="1" value="' + (m ? m.t : '') + '"></div></div></div>';
      }).join('') + '</div></div>' +
      '<div style="display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;margin-top:10px">' + (id ? '<button type="button" class="btn danger" data-act="owndel" data-id="' + esc(id) + '">' + I('trash', 'sm') + 'Löschen</button>' : '') +
      '<a class="btn" href="#/meine">Abbrechen</a><button class="btn primary" type="submit">' + I('check') + 'Speichern</button></div></form>';
  }
  function saveEdit(form) {
    var id = form.dataset.id || ('own-' + Date.now().toString(36));
    var lines = function (s) { return s.split('\n').map(function (x) { return x.trim(); }).filter(Boolean); };
    var r = {
      id: id, own: true, n: $('#e_n').value.trim(), desc: $('#e_desc').value.trim(), c: $('#e_c').value, k: $('#e_k').value.trim(),
      p: Math.max(1, +$('#e_p').value || 4), d: +$('#e_d').value, v: +$('#e_v').value, ing: lines($('#e_ing').value),
      prep: lines($('#e_prep').value).map(function (l) { return autoStep(l, '', 'de'); }), m: {}
    };
    $$('.e_dev').forEach(function (cb) {
      var d = cb.dataset.dev, txt = $('.e_steps[data-dev="' + d + '"]').value;
      if (!cb.checked && !txt.trim()) return;
      var steps = lines(txt).map(function (l) { return autoStep(l, d, 'de'); });
      var t = +$('.e_time[data-dev="' + d + '"]').value || steps.reduce(function (s, x) { return s + (x[2].t || 0) + (x[2].sec || 0) / 60; }, 0) + 10;
      r.m[d] = { t: Math.round(t), s: steps };
    });
    if (!r.n) { toast('Bitte einen Namen eingeben'); return; }
    if (!Object.keys(r.m).length) { toast('Mindestens ein Gerät mit Schritten anlegen'); return; }
    var i = S.own.findIndex(function (x) { return x.id === id; });
    if (i >= 0) S.own[i] = r; else S.own.push(r);
    save('own'); resetAll(); delete ui.rec[id];
    toast('Gespeichert'); location.hash = '#/r/' + id;
  }

  /* ---------- Online-Suche (TheMealDB) ---------- */
  var API = 'https://www.themealdb.com/api/json/v1/1/';
  var AREAS = { American: 'USA', British: 'Großbritannien', Canadian: 'Kanada', Chinese: 'China', Croatian: 'Kroatien', Dutch: 'Niederlande', Egyptian: 'Ägypten', Filipino: 'Philippinen', French: 'Frankreich', Greek: 'Griechenland', Indian: 'Indien', Irish: 'Irland', Italian: 'Italien', Jamaican: 'Jamaika', Japanese: 'Japan', Kenyan: 'Kenia', Malaysian: 'Malaysia', Mexican: 'Mexiko', Moroccan: 'Marokko', Polish: 'Polen', Portuguese: 'Portugal', Russian: 'Russland', Spanish: 'Spanien', Thai: 'Thailand', Tunisian: 'Tunesien', Turkish: 'Türkei', Ukrainian: 'Ukraine', Vietnamese: 'Vietnam' };
  var online = { q: '', list: null, err: '', loading: false, area: '' };
  function api(path) { return fetch(API + path).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
  function vWorld() {
    return '<div class="page-h"><h1>Weltweite Online-Suche</h1><button class="btn" data-act="wrandom">' + I('dice', 'sm') + 'Zufällig</button></div>' +
      '<p class="muted" style="margin-top:-8px">Durchsucht die freie Rezeptdatenbank TheMealDB (Rezepte aus über 25 Ländern). Die Texte sind dort auf Englisch, Animationen werden automatisch zugeordnet. Jedes Rezept kannst du in „Meine Rezepte“ übernehmen und auf Deutsch umschreiben.</p>' +
      '<form class="searchbox" style="max-width:none;margin:14px 0" data-form="world">' + I('search') + '<input id="wq" type="search" value="' + esc(online.q) + '" placeholder="Englischer Suchbegriff, z. B. curry, cake, chicken …" autocomplete="off" aria-label="Online-Suche"></form>' +
      '<div class="filter-row" style="margin-bottom:16px">' + Object.keys(AREAS).map(function (a) { return '<button class="chip ' + (online.area === a ? 'on' : '') + '" data-act="warea" data-v="' + a + '">' + AREAS[a] + '</button>'; }).join('') + '</div><div id="wres">' + worldResults() + '</div>';
  }
  function worldResults() {
    if (online.loading) return '<div class="empty">' + I('globe') + '<h3>Lade …</h3></div>';
    if (online.err) return '<div class="empty">' + I('info') + '<h3>Keine Verbindung zur Datenbank</h3><p>' + esc(online.err) + '</p></div>';
    if (!online.list) return '<div class="info">Suchbegriff eingeben oder ein Land antippen.</div>';
    if (!online.list.length) return '<div class="empty">' + I('search') + '<h3>Keine Treffer</h3><p>Englische Begriffe funktionieren am besten.</p></div>';
    return '<div class="grid">' + online.list.map(function (m) {
      return '<a class="rcard" href="#/welt/' + esc(m.idMeal) + '"><div class="rvis" style="--h:20"><img src="' + esc(m.strMealThumb) + '/preview" alt="" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></div><div class="rbody"><h3>' + esc(m.strMeal) + '</h3><div class="rmeta">' + esc(AREAS[m.strArea] || m.strArea || online.areaLabel || '') + '</div></div></a>';
    }).join('') + '</div>';
  }
  function worldLoad(path, mapper) {
    online.loading = true; online.err = ''; var el = $('#wres'); if (el) el.innerHTML = worldResults();
    api(path).then(function (j) { online.list = mapper(j); }).catch(function () { online.err = 'Die Online-Suche braucht eine Internetverbindung, und themealdb.com muss erreichbar sein.'; })
      .then(function () { online.loading = false; var el2 = $('#wres'); if (el2) el2.innerHTML = worldResults(); });
  }
  function mealToRecipe(m) {
    var ing = [];
    for (var i = 1; i <= 20; i++) { var n = (m['strIngredient' + i] || '').trim(); if (n) ing.push(((m['strMeasure' + i] || '').trim() + ' ' + n).trim()); }
    var txt = (m.strInstructions || '').replace(/\r/g, '').split(/\n+/).map(function (x) { return x.trim(); }).filter(function (x) { return x && !/^(step\s*)?\d+\.?$/i.test(x); });
    if (txt.length < 3) txt = (m.strInstructions || '').split(/(?<=[.!?])\s+(?=[A-Z])/).map(function (x) { return x.trim(); }).filter(Boolean);
    var steps = txt.map(function (x) { return autoStep(x, '', 'en'); });
    var dev = steps.some(function (s) { return s[0] === 'bake'; }) ? 'ofen' : 'herd';
    var catMap = { Dessert: 'dessert', Pasta: 'pasta', Seafood: 'fisch', Vegetarian: 'veggie', Vegan: 'veggie', Breakfast: 'fruehstueck', Starter: 'snacks', Side: 'beilagen', Beef: 'fleisch', Chicken: 'fleisch', Lamb: 'fleisch', Pork: 'fleisch', Goat: 'fleisch', Miscellaneous: 'veggie' };
    var r = { id: 'web-' + m.idMeal, n: m.strMeal, desc: '', c: catMap[m.strCategory] || 'veggie', k: AREAS[m.strArea] || m.strArea || '', p: 4, d: 2, v: m.strCategory === 'Vegan' ? 2 : m.strCategory === 'Vegetarian' ? 1 : 0, ing: ing, m: {}, src: 'TheMealDB (englischer Originaltext)' + (m.strSource ? ', ' + m.strSource : '') };
    r.m[dev] = { t: Math.max(20, steps.reduce(function (s, x) { return s + (x[2].t || 0); }, 0)), s: steps };
    return r;
  }
  function vWorldMeal(id) {
    var cached = online.meal && online.meal.id === 'web-' + id ? online.meal : null;
    if (!cached) {
      api('lookup.php?i=' + encodeURIComponent(id)).then(function (j) {
        if (!j.meals) throw new Error('nf');
        online.meal = mealToRecipe(j.meals[0]); online.mealImg = j.meals[0].strMealThumb; online.mealVid = j.meals[0].strYoutube;
        if (location.hash === '#/welt/' + id) render();
      }).catch(function () { var v = $('#view'); if (v) v.innerHTML = '<div class="empty">' + I('info') + '<h3>Rezept konnte nicht geladen werden</h3><p>Internetverbindung prüfen.</p></div>'; });
      return '<div class="empty">' + I('globe') + '<h3>Lade Rezept …</h3></div>';
    }
    var r = cached, dev = Object.keys(r.m)[0];
    return '<article><div class="rhero" style="--h:20;background:#222 url(' + esc(online.mealImg) + ') center/cover"><div class="rhero-top"><button class="glass-btn" data-act="back" aria-label="Zurück">' + I('back') + '</button></div>' +
      '<div class="rhero-txt" style="max-width:100%;text-shadow:0 2px 12px rgba(0,0,0,.6)"><span class="pill">' + esc(r.k) + ' · Online</span><h1>' + esc(r.n) + '</h1></div></div>' +
      '<div class="info" style="margin:14px 0">' + esc(r.src) + '. Der englische Text bleibt unverändert, Animationen und Timer werden automatisch zugeordnet.' + (online.mealVid ? ' <a href="' + esc(online.mealVid) + '" target="_blank" rel="noopener" style="color:var(--accent);font-weight:700">Video ansehen</a>' : '') + '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn primary" data-act="wsave">' + I('download', 'sm') + 'In Meine Rezepte übernehmen</button></div>' +
      '<div class="rcols"><aside class="ingbox card-box"><h2>Ingredients</h2><ul class="ing-list">' + r.ing.map(function (x) { return '<li style="cursor:default"><span class="t">' + esc(x) + '</span></li>'; }).join('') + '</ul></aside>' +
      '<section class="steps"><h2 style="margin-bottom:12px">Instructions</h2>' + r.m[dev].s.map(function (s, i) {
        return '<div class="step"><div class="stage" data-act="force">' + ANIM.scene(s[0], s[2]) + '<span class="alabel">' + esc(ACTIONS[ANIM.norm(s[0])]) + '</span></div><div><div class="step-n"><span class="num">' + (i + 1) + '</span></div><p>' + esc(s[1]) + '</p>' + paramsHTML(s[2], r.n + ' · ' + (i + 1)) + '</div></div>';
      }).join('') + '</section></div></article>';
  }

  /* ---------- Router ---------- */
  function route() { return (location.hash || '#/').slice(1); }
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('play', e.isIntersecting); }); }, { rootMargin: '60px' }) : null;
  function observeScenes() {
    $$('#view .scene').forEach(function (s) { if (s.classList.contains('force') && s.closest('.home-hero')) return; if (io) io.observe(s); else s.classList.add('play'); });
  }
  function navState(p) {
    var key = p === '/' ? 'home' : p.indexOf('/entdecken') === 0 || p.indexOf('/r/') === 0 ? 'explore' : p.indexOf('/favoriten') === 0 ? 'favs' : p.indexOf('/einkauf') === 0 ? 'shop' : (p.indexOf('/meine') === 0 || p.indexOf('/neu') === 0 || p.indexOf('/bearbeiten') === 0) ? 'mine' : p.indexOf('/welt') === 0 ? 'explore' : '';
    $$('.nav a').forEach(function (a) { a.classList.toggle('on', a.dataset.nav === key); });
    var open = S.shop.filter(function (x) { return !x.done; }).length;
    var c = $('.nav a[data-nav="shop"] .count'); if (c) { c.textContent = open; c.style.display = open ? '' : 'none'; }
    var fc = $('.nav a[data-nav="favs"] .count'); if (fc) { fc.textContent = S.favs.length; fc.style.display = S.favs.length ? '' : 'none'; }
  }
  var lastPath = null;
  function render(keepScroll) {
    var p = route(), v = $('#view'), html, title = 'Kochatlas', m;
    if (io) io.disconnect();
    if (p === '/' || p === '') html = vHome();
    else if (p === '/entdecken') { html = vExplore(); title = 'Entdecken · Kochatlas'; }
    else if ((m = p.match(/^\/r\/(.+)$/))) { var rr = byId(decodeURIComponent(m[1])); html = vRecipe(decodeURIComponent(m[1])); if (rr) title = rr.n + ' · Kochatlas'; }
    else if (p === '/favoriten') html = vFavs();
    else if (p === '/einkauf') html = vShop();
    else if (p === '/meine') html = vMine();
    else if (p === '/neu') html = vEdit(null);
    else if ((m = p.match(/^\/bearbeiten\/(.+)$/))) html = vEdit(decodeURIComponent(m[1]));
    else if (p === '/welt') html = vWorld();
    else if ((m = p.match(/^\/welt\/(\d+)$/))) html = vWorldMeal(m[1]);
    else html = vHome();
    var y = window.scrollY;
    v.innerHTML = html; document.title = title;
    if (!keepScroll) { v.classList.remove('view-enter'); void v.offsetWidth; v.classList.add('view-enter'); }
    if (p === '/entdecken') renderResults();
    observeScenes(); navState(p);
    if (keepScroll) window.scrollTo(0, y); else if (lastPath !== p) window.scrollTo(0, 0);
    lastPath = p;
  }
  function applyTheme() {
    var root = document.documentElement;
    if (S.theme === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', S.theme);
    var dark = S.theme === 'dark' || (S.theme === 'auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    var b = $('#themebtn'); if (b) b.innerHTML = I(dark ? 'sun' : 'moon');
  }

  /* ---------- Aktionen ---------- */
  var ACT = {
    fav: function (el) {
      var id = el.dataset.id, i = S.favs.indexOf(id);
      if (i >= 0) S.favs.splice(i, 1); else S.favs.unshift(id);
      save('favs'); $$('[data-act="fav"][data-id="' + id.replace(/"/g, '') + '"]').forEach(function (b) { b.classList.toggle('on', i < 0); });
      toast(i < 0 ? 'Zu Favoriten hinzugefügt' : 'Aus Favoriten entfernt');
      if (route() === '/favoriten') render(true); else navState(route());
    },
    mydev: function (el) {
      var d = el.dataset.dev, i = S.devices.indexOf(d);
      if (i >= 0) S.devices.splice(i, 1); else S.devices.push(d);
      save('devices'); render(true);
    },
    random: function () {
      var list = all().filter(mineOK); var r = list[Math.floor(Math.random() * list.length)];
      if (r) location.hash = '#/r/' + r.id;
    },
    fclear: function () { ui.f = { q: '', cat: '', dev: '', diet: '', time: 0, cuisine: '', sort: 'name' }; location.hash = '#/entdecken'; },
    fcat: function (el) { ACT.fclear(); ui.f.cat = el.dataset.cat; location.hash = '#/entdecken'; render(); },
    ftime: function () { ACT.fclear(); ui.f.time = 30; render(); },
    fcuisine: function (el) { ACT.fclear(); ui.f.cuisine = el.dataset.k; render(); },
    fc: function (el) { ui.f.cat = el.dataset.v; render(true); },
    fd: function (el) { ui.f.dev = el.dataset.v; render(true); },
    fv: function (el) { ui.f.diet = el.dataset.v; render(true); },
    ft: function (el) { ui.f.time = +el.dataset.v; render(true); },
    back: function () { if (history.length > 1) history.back(); else location.hash = '#/'; },
    tab: function (el) { var r = byId(decodeURIComponent(route().slice(3))); if (!r) return; ui.rec[r.id].dev = el.dataset.dev; render(true); },
    por: function (el) { var r = byId(decodeURIComponent(route().slice(3))); if (!r) return; var st = ui.rec[r.id]; st.p = Math.max(1, Math.min(60, st.p + (+el.dataset.d))); render(true); },
    ing: function (el) { var r = byId(decodeURIComponent(route().slice(3))); if (!r) return; var st = ui.rec[r.id], i = el.dataset.i; st.done[i] = !st.done[i]; el.classList.toggle('done', !!st.done[i]); },
    toshop: function () {
      var r = byId(decodeURIComponent(route().slice(3))); if (!r) return; var st = ui.rec[r.id], f = st.p / (r.p || 4), n = 0;
      (r.ing || []).forEach(function (s, i) { if (s[0] === '#' || st.done[i]) return; var x = splitIng(s, f); S.shop.push({ t: (x.q ? x.q + ' ' : '') + x.t, from: r.n, done: false }); n++; });
      save('shop'); navState(route()); toast(n + ' Zutaten auf der Einkaufsliste');
    },
    cook: function () { var r = byId(decodeURIComponent(route().slice(3))); if (r) openCook(r); },
    cookclose: closeCook,
    cooknext: function () { cookGo(1); },
    cookprev: function () { cookGo(-1); },
    cookings: function () { if (ui.cook) { ui.cook.ings = !ui.cook.ings; renderCook(); } },
    timer: function (el) { startTimer(+el.dataset.sec, el.dataset.label); },
    tstop: function (el) { timers = timers.filter(function (t) { return String(t.id) !== el.dataset.id; }); renderTimers(); },
    force: function (el) { var s = $('.scene', el); if (s) s.classList.toggle('force'); },
    share: function () {
      var r = byId(decodeURIComponent(route().slice(3))), url = location.href;
      if (navigator.share) navigator.share({ title: r ? r.n : 'Kochatlas', url: url }).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast('Link kopiert'); }, function () { toast(url); });
    },
    shoptoggle: function (el) { var x = S.shop[+el.dataset.i]; if (x) { x.done = !x.done; save('shop'); render(true); } },
    shopdel: function (el) { S.shop.splice(+el.dataset.i, 1); save('shop'); render(true); },
    shopclean: function () { S.shop = S.shop.filter(function (x) { return !x.done; }); save('shop'); render(true); },
    shopclear: function () { if (!S.shop.length || confirm('Ganze Einkaufsliste löschen?')) { S.shop = []; save('shop'); render(true); } },
    shopshare: function () {
      var txt = 'Einkaufsliste\n' + S.shop.filter(function (x) { return !x.done; }).map(function (x) { return '- ' + x.t; }).join('\n');
      if (navigator.share) navigator.share({ title: 'Einkaufsliste', text: txt }).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function () { toast('Liste kopiert'); });
    },
    theme: function (el) { S.theme = el.dataset.v || ({ auto: 'dark', dark: 'light', light: 'auto' })[S.theme]; save('theme'); applyTheme(); if (route() === '/meine') render(true); toast('Darstellung: ' + { auto: 'Automatisch', light: 'Hell', dark: 'Dunkel' }[S.theme]); },
    owndel: function (el) {
      if (!confirm('Dieses Rezept löschen?')) return;
      S.own = S.own.filter(function (x) { return x.id !== el.dataset.id; }); save('own'); resetAll(); location.hash = '#/meine';
    },
    export: function () {
      var blob = new Blob([JSON.stringify({ app: 'kochatlas', v: 1, recipes: S.own }, null, 2)], { type: 'application/json' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'kochatlas-rezepte.json'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    },
    wrandom: function () { online.area = ''; worldLoad('random.php', function (j) { return j.meals || []; }); },
    warea: function (el) {
      online.area = el.dataset.v; online.areaLabel = AREAS[el.dataset.v]; $$('[data-act="warea"]').forEach(function (b) { b.classList.toggle('on', b === el); });
      worldLoad('filter.php?a=' + encodeURIComponent(el.dataset.v), function (j) { return (j.meals || []).map(function (m) { m.strArea = el.dataset.v; return m; }); });
    },
    wsave: function () {
      var r = JSON.parse(JSON.stringify(online.meal)); r.id = 'own-' + Date.now().toString(36); r.own = true; delete r._n;
      S.own.push(r); save('own'); resetAll(); toast('In Meine Rezepte übernommen'); location.hash = '#/r/' + r.id;
    }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]'); if (!el) return;
    var fn = ACT[el.dataset.act]; if (!fn) return;
    if (el.tagName !== 'A' || el.dataset.act === 'fav') e.preventDefault();
    if (el.dataset.act === 'fav') e.stopPropagation();
    fn(el, e);
  });
  var qT = null;
  document.addEventListener('input', function (e) {
    if (e.target.id === 'q') { ui.f.q = e.target.value; clearTimeout(qT); qT = setTimeout(renderResults, 120); }
    if (e.target.id === 'note') { S.notes[e.target.dataset.id] = e.target.value; save('notes'); }
  });
  document.addEventListener('change', function (e) {
    var k = e.target.dataset.change; if (!k) return;
    if (k === 'fk') { ui.f.cuisine = e.target.value; renderResults(); }
    if (k === 'fs') { ui.f.sort = e.target.value; renderResults(); }
    if (k === 'fm') { S.onlyMine = e.target.checked; save('onlyMine'); renderResults(); }
    if (k === 'import') {
      var file = e.target.files[0]; if (!file) return;
      file.text().then(function (txt) {
        var j = JSON.parse(txt), list = Array.isArray(j) ? j : j.recipes;
        if (!Array.isArray(list)) throw new Error('format');
        var n = 0; list.forEach(function (r) { if (!r || !r.n || !r.m) return; r.own = true; delete r._n; r.id = r.id && r.id.indexOf('own-') === 0 ? r.id : 'own-' + Date.now().toString(36) + n; var i = S.own.findIndex(function (x) { return x.id === r.id; }); if (i >= 0) S.own[i] = r; else S.own.push(r); n++; });
        save('own'); resetAll(); render(true); toast(n + ' Rezepte importiert');
      }).catch(function () { toast('Datei konnte nicht gelesen werden'); });
    }
  });
  document.addEventListener('submit', function (e) {
    var f = e.target.dataset.form; if (!f) return; e.preventDefault();
    if (f === 'search') { ACT.fclear(); ui.f.q = $('#homeq').value; render(); }
    if (f === 'shopadd') { var v = $('#shopnew').value.trim(); if (v) { S.shop.push({ t: v, from: '', done: false }); save('shop'); render(true); var n = $('#shopnew'); if (n) n.focus(); } }
    if (f === 'edit') saveEdit(e.target);
    if (f === 'world') { online.q = $('#wq').value.trim(); online.area = ''; $$('[data-act="warea"]').forEach(function (b) { b.classList.remove('on'); }); if (online.q) worldLoad('search.php?s=' + encodeURIComponent(online.q), function (j) { return j.meals || []; }); }
  });
  document.addEventListener('keydown', function (e) {
    if (!ui.cook) return;
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); cookGo(1); }
    if (e.key === 'ArrowLeft') cookGo(-1);
    if (e.key === 'Escape') closeCook();
  });
  var tx = null;
  document.addEventListener('touchstart', function (e) { if (ui.cook) tx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (!ui.cook || tx == null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 70) cookGo(dx < 0 ? 1 : -1);
  }, { passive: true });
  document.addEventListener('visibilitychange', function () { if (ui.cook && document.visibilityState === 'visible') lockWake(); });
  window.addEventListener('hashchange', function () { if (ui.cook) closeCook(); render(); });
  if (window.matchMedia) { try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch (e) {} }

  /* ---------- Start ---------- */
  function init() {
    $('#nav').innerHTML = [['home', '#/', 'home', 'Start'], ['explore', '#/entdecken', 'compass', 'Entdecken'], ['favs', '#/favoriten', 'heart', 'Favoriten'], ['shop', '#/einkauf', 'cart', 'Einkauf'], ['mine', '#/meine', 'book', 'Meine']]
      .map(function (n) { return '<a href="' + n[1] + '" data-nav="' + n[0] + '">' + I(n[2]) + '<span>' + n[3] + '</span>' + (n[0] === 'shop' || n[0] === 'favs' ? '<span class="count" style="display:none"></span>' : '') + '</a>'; }).join('');
    $('#logo').innerHTML = '<span class="logo-mark">' + I('chef') + '</span>Kochatlas';
    $('#searchbtn').innerHTML = I('search');
    applyTheme(); render();
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && window.self === window.top) {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  }
  window.KA = { all: all, stepsFor: stepsFor, splitIng: splitIng };
  init();
})();
