/* Kochatlas – App-Logik
   Routing, Ansichten, Kochmodus, Timer, Einkaufsliste (lokal oder live geteilt), Editor,
   Internet-Rezepte (Wikibooks, nachgeladen), Sterneküche mit Anrichte-Plan, Anrichte-Schule,
   Umschreiben mit Claude (nur in der veröffentlichten Claude-Version), Online-Suche (TheMealDB). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var I = window.icon, DEV = window.DEVICES, CATS = window.CATS, ACTIONS = window.ACTIONS, ANIM = window.ANIM, PLATE = window.PLATE;

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
    onlyMine: store.get('onlyMine', true),
    ai: store.get('ai', {})
  };
  var save = function (k) { store.set(k, S[k]); };
  var IN_CLAUDE = !!(window.claude && typeof window.claude.use === 'function');
  var EXT_OK = !IN_CLAUDE; /* externe Bilder und APIs: in der Claude-Version durch die Sicherheitsrichtlinie gesperrt */
  var F0 = function () { return { q: '', cat: '', dev: '', diet: '', time: 0, cuisine: '', sort: 'empf', src: '' }; };
  var ui = { f: F0(), limit: 60, rec: {}, cook: null };

  /* ---------- Hilfen ---------- */
  function fold(s) { return String(s || '').toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss').normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  var hue = function (r) { return ((CATS[r.c] || { h: 20 }).h + (hash(r.id) % 28) - 14 + 360) % 360; };
  function fmtTime(m) {
    if (!m) return '–';
    if (m < 60) return m + ' Min';
    var h = Math.floor(m / 60), r = m % 60;
    return h + ' Std' + (r ? ' ' + r + ' Min' : '');
  }
  var DIFF = ['', 'Leicht', 'Mittel', 'Anspruchsvoll'];
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }
  function seeded(arr, seed) {
    var a = arr.slice(), s = seed;
    for (var i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; var j = Math.floor(s / 233280 * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var today = function () { var d = new Date(); return d.getFullYear() * 1000 + d.getMonth() * 40 + d.getDate(); };
  var uid = function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); };

  /* ---------- Eingebaute Rezepte ---------- */
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
  function all() { if (!_all) _all = window.RECIPES.concat(S.own).map(norm); return _all; }
  var resetAll = function () { _all = null; _lite = null; };

  /* ---------- Internet-Rezepte (Wikibooks) ---------- */
  var DVMAP = { a: 'airfryer', d: 'dkt', s: 'slow', m: 'mikro', g: 'grill', o: 'ofen', h: 'herd', k: 'kalt' };
  var WEB = { raw: {}, rec: {}, idx: {} };
  (window.KA_WEB_INDEX || []).forEach(function (e) { WEB.idx[e[0]] = e; });
  var chunkWait = {};
  window.KA_WEB_CHUNK = function (n, arr) {
    arr.forEach(function (x) { WEB.raw[x.i] = x; });
    var w = chunkWait[n]; chunkWait[n] = 'done';
    if (Array.isArray(w)) w.forEach(function (f) { f(); });
  };
  function loadChunk(n) {
    return new Promise(function (res, rej) {
      if (chunkWait[n] === 'done') return res();
      if (Array.isArray(chunkWait[n])) { chunkWait[n].push(res); return; }
      chunkWait[n] = [res];
      var s = document.createElement('script');
      s.src = 'data/web/chunk-' + String(n).padStart(2, '0') + '.js';
      s.onerror = function () { chunkWait[n] = null; rej(new Error('chunk')); };
      document.head.appendChild(s);
    });
  }
  function webDevs(code) {
    var order = 'adsmgohk', list = [];
    order.split('').forEach(function (k) { if (code.indexOf(k) >= 0) list.push(DVMAP[k]); });
    return list.length ? list : ['herd'];
  }
  function webLite(e) {
    var devs = webDevs(e[9] || 'h');
    return {
      id: e[0], n: e[1], c: e[2], k: e[3], v: e[4], minTime: e[5], lang: e[6], chunk: e[7], hasImg: e[8], web: true,
      devs: [devs[0]], needs: devs.slice(1), d: 2,
      _search: fold(e[1] + ' ' + e[3] + ' ' + ((CATS[e[2]] || {}).n || ''))
    };
  }
  var _lite = null;
  function liteAll() {
    if (!_lite) _lite = all().concat((window.KA_WEB_INDEX || []).map(webLite));
    return _lite;
  }
  function liteById(id) { var r = all().filter(function (x) { return x.id === id; })[0]; if (r) return r; var e = WEB.idx[id]; return e ? webLite(e) : null; }
  function imgUrl(name, w) { return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(name.replace(/ /g, '_')) + '?width=' + (w || 640); }
  function webRecipe(id) {
    if (WEB.rec[id]) return WEB.rec[id];
    var x = WEB.raw[id], e = WEB.idx[id];
    if (!x || !e) return null;
    var devs = webDevs(e[9] || 'h'), prim = devs[0];
    var steps = x.s.map(function (t) { return autoStep(t, prim, x.l); });
    var est = steps.reduce(function (s, st) { return s + (st[2].t || 0); }, 0);
    var r = {
      id: id, n: x.n, c: x.c, k: x.k || '', p: x.p || 4, d: x.d || 2, v: x.v || 0, desc: x.desc, ing: x.g, tips: x.x,
      web: true, lang: x.l, img: x.img, srcUrl: x.u, needs: devs.slice(1),
      src: 'Wikibooks-Kochbuch (' + (x.l === 'de' ? 'deutsch' : 'englisch') + '), Lizenz CC BY-SA', m: {}
    };
    r.m[prim] = { t: x.t || Math.max(15, Math.round(est + 10)), s: steps };
    WEB.rec[id] = norm(r);
    return WEB.rec[id];
  }
  function byId(id) { var r = all().filter(function (x) { return x.id === id; })[0]; return r || (id.indexOf('wb-') === 0 ? webRecipe(id) : null); }

  /* Umgeschriebene Fassungen (Claude) in das Rezept einblenden */
  function aiEntries(rid) {
    return Object.keys(S.ai).filter(function (k) { return k.split('|')[0] === rid; }).map(function (k) { return S.ai[k]; })
      .sort(function (a, b) { return (a.ts || 0) - (b.ts || 0); });
  }
  function viewOf(r) {
    var list = aiEntries(r.id);
    if (!list.length) return r;
    var v = Object.assign({}, r, { m: Object.assign({}, r.m) });
    list.forEach(function (a) {
      v.m[a.dev] = { t: a.t || (r.m[a.dev] || {}).t || 30, s: a.steps, note: 'Von Claude umgeschrieben' + (r.lang === 'en' ? ' und übersetzt' : '') + '. Nicht in einer Testküche geprüft, Zeiten und Temperaturen im Blick behalten.', ai: true };
    });
    var last = list[list.length - 1];
    if (r.lang === 'en' && last.ing && last.ing.length) { v.n = last.n || r.n; v.ing = last.ing; v.desc = last.desc || r.desc; v.tips = last.tips || r.tips; v.translated = true; }
    v.devs = Object.keys(v.m);
    return v;
  }

  var mineOK = function (r) { return r.devs.some(function (d) { return d === 'kalt' || S.devices.indexOf(d) >= 0; }); };
  var isFav = function (id) { return S.favs.indexOf(id) >= 0; };

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
    var q = fmtNum(toNum(m[1]) * f, metric);
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
  function itemFor(r) { return ({ kuchen: 'cake', brot: 'loaf', fleisch: 'roast', sterne: 'roast', veggie: 'tray', beilagen: 'tray', pasta: 'dish', snacks: 'tray', dessert: 'cake', fisch: 'tray' })[r.c] || 'dish'; }
  var MODES = { OU: 'Ober-/Unterhitze', U: 'Umluft', G: 'Grill', UG: 'Umluft + Grill', O: 'Oberhitze' };
  var HEATS = { max: 'Höchste Stufe (9 von 9)', hoch: 'Hohe Hitze (7–8 von 9)', mittel: 'Mittlere Hitze (5–6 von 9)', niedrig: 'Niedrige Hitze (2–3 von 9)' };
  function secsOf(o) { return o.sec != null ? o.sec : (o.t != null ? Math.round(o.t * 60) : 0); }
  function fmtDur(sec) { if (sec < 60) return sec + ' Sek.'; var m = Math.round(sec / 60); return m >= 60 ? fmtTime(m) : m + ' Min'; }
  function paramsHTML(o, label) {
    var p = [];
    if (o.c != null) p.push('<span class="param">' + I('thermo') + (o.c === 'Varoma' ? 'Varoma' : o.c + ' °C') + '</span>');
    if (o.mo && MODES[o.mo]) p.push('<span class="param">' + I('fan') + MODES[o.mo] + '</span>');
    if (o.h && HEATS[o.h]) p.push('<span class="param">' + I('flame') + HEATS[o.h] + '</span>');
    if (o.s != null) p.push('<span class="param">' + I('gauge') + (o.s === 'teig' ? 'Teigstufe' : o.s === 'sanft' ? 'Sanftrührstufe' : 'Stufe ' + o.s) + '</span>');
    if (o.l) p.push('<span class="param">' + I('rotate') + 'Linkslauf</span>');
    if (o.k) p.push('<span class="param">' + I('thermo') + 'Kerntemperatur ' + o.k + ' °C</span>');
    if (o.lvl) p.push('<span class="param">' + I('gauge') + 'Stufe ' + esc(o.lvl) + '</span>');
    if (o.p) p.push('<span class="param">' + I('gauge') + esc(o.p) + '</span>');
    if (o.w) p.push('<span class="param">' + I('bars') + o.w + ' Watt</span>');
    var sec = secsOf(o);
    if (sec) p.push('<button class="param timer" data-act="timer" data-sec="' + sec + '" data-label="' + esc(label) + '">' + I('timer') + fmtDur(sec) + ' · Timer</button>');
    return p.length ? '<div class="params">' + p.join('') + '</div>' : '';
  }

  /* ---------- Automatische Schritterkennung (Editor, Internet-Rezepte) ---------- */
  var REV = {}; Object.keys(ACTIONS).forEach(function (k) { REV[fold(ACTIONS[k])] = k; REV[k] = k; });
  var RULES_DE = [
    ['tm', /stufe\s*\d|linkslauf|teigstufe|sanftruhr|mixtopf|varoma|messbecher/],
    ['airfry', /airfryer|heissluftfritteuse|frittierkorb/], ['sousvide', /sous.?vide|wasserbad bei \d/],
    ['micro', /mikrowelle/], ['pressure', /schnellkochtopf|hochdruck|druck ablassen|dampfdruck/], ['slow', /slow ?cooker|schongarer/],
    ['bake', /backofen|im ofen|backen|uberbacken|gratinier|vorheizen|blech|grad (ober|umluft)/], ['grill', /grill/],
    ['deepfry', /frittier|ausbacken|im heissen ol|schwimmend/], ['knead', /knet/], ['roll', /ausroll|auswalz/], ['grate', /reib|raspel/],
    ['strain', /passier|durch ein sieb|abseihen/], ['pipe', /spritzbeutel|spritzflasche|aufspritzen/], ['torch', /abflamm|bunsenbrenner|flambier/],
    ['chop', /schneid|wurfel|hacken|hobel|scheiben|streifen|ringe|halbier|viertel|zerkleiner|schal/],
    ['shape', /formen|kugeln|rollen|fullen|befull/], ['blend', /purier|stabmixer|standmixer|mixer/], ['mash', /stampf|zerdruck/], ['fold', /unterheb/],
    ['mix', /handmixer|ruhrgerat|aufschlagen|steif schlagen|schaumig/], ['whisk', /verquirl|schneebesen|glatt ruhren/],
    ['flip', /wenden|schwenken|wok/], ['fry', /brat|anbrat|rost|anschwitz|dunst|karamellis/], ['steam', /dampf/],
    ['simmer', /kocheln|schmor|einkochen|reduzier|ziehen lassen/], ['boil', /kochen|aufkoch|blanchier|sieden|garen/],
    ['stir', /ruhr|schmelz/], ['chill', /kuhlschrank|kalt stellen|kuhlen|gefrier/], ['cool', /abkuhl|auskuhl/],
    ['rest', /ruhen|gehen lassen|quellen|marinier|einweich/], ['layer', /schicht/], ['spread', /bestreich|verstreich|bepinsel/],
    ['pour', /giess|ablosch|auffull/], ['season', /wurz|abschmeck|salzen|pfeffern/], ['serve', /servier|anricht|garnier/]
  ];
  var RULES_EN = [
    ['airfry', /air ?fryer/], ['sousvide', /sous.?vide/], ['micro', /microwave/], ['pressure', /pressure cooker|instant pot/], ['slow', /slow cooker|crock ?pot/],
    ['bake', /oven|bake|baking|roast|broil|gratin/], ['grill', /grill|barbecue|bbq/], ['deepfry', /deep[- ]fry|deep fat/],
    ['knead', /knead/], ['roll', /roll out|rolling pin/], ['grate', /grate|zest/], ['strain', /strain|sieve|sift/], ['pipe', /piping bag|pipe /],
    ['chop', /chop|dice|slice|mince|cut |peel|halve|quarter/],
    ['shape', /shape|form into|stuff|fill /], ['blend', /blend|puree|purée|food processor/], ['mash', /mash/], ['fold', /fold in/],
    ['mix', /beat|electric mixer|whip/], ['whisk', /whisk/], ['flip', /flip|toss|turn over|stir[- ]fry|wok/],
    ['fry', /fry|brown|saute|sauté|sear/], ['steam', /steam/], ['simmer', /simmer|reduce|braise|stew/],
    ['boil', /boil|blanch|poach/], ['stir', /stir|melt/], ['chill', /fridge|refrigerat|chill|freeze/], ['cool', /cool/],
    ['rest', /rest|marinate|rise|prove|proof|soak|leave to/], ['layer', /layer/], ['spread', /spread|brush/],
    ['pour', /pour|add the stock|add the water|deglaze/], ['season', /season|salt and pepper|sprinkle/], ['serve', /serve|garnish|plate/]
  ];
  function autoStep(text, dev, lang) {
    var raw = String(text).trim(), forced = null, mm = raw.match(/^\[([^\]]+)\]\s*/);
    if (mm) { forced = REV[fold(mm[1]).trim()] || null; raw = raw.slice(mm[0].length); }
    var t = fold(raw), o = {}, a = forced;
    if (!a) { var rules = lang === 'en' ? RULES_EN : RULES_DE; for (var i = 0; i < rules.length; i++) if (rules[i][1].test(t)) { a = rules[i][0]; break; } }
    a = a || 'prep';
    if (dev === 'tm' && !forced && /\d\s*(min|sek|sec)/.test(t) && ['boil', 'stir', 'simmer', 'fry', 'blend', 'chop', 'mix', 'whisk', 'knead', 'steam', 'prep'].indexOf(a) >= 0) a = 'tm';
    if (dev === 'airfryer' && ['bake', 'fry', 'boil', 'deepfry', 'grill'].indexOf(a) >= 0) a = 'airfry';
    if (dev === 'mikro' && ['boil', 'stir', 'simmer', 'bake'].indexOf(a) >= 0) a = 'micro';
    if (dev === 'slow' && ['boil', 'simmer', 'stir'].indexOf(a) >= 0) a = 'slow';
    if (dev === 'dkt' && ['boil', 'simmer', 'steam'].indexOf(a) >= 0) a = 'pressure';
    if (dev === 'sousvide' && ['boil', 'simmer'].indexOf(a) >= 0) a = 'sousvide';
    var m;
    if (lang === 'en') {
      if ((m = t.match(/(\d+(?:\.\d+)?)\s*(?:-|–|to)?\s*(?:\d+)?\s*(?:min|minutes|mins)\b/))) o.t = +m[1];
      else if ((m = t.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\b/))) o.t = Math.round(+m[1] * 60);
      if ((m = t.match(/(\d{2,3})\s*°?\s*c\b/))) o.c = +m[1];
      else if ((m = t.match(/(\d{3})\s*°?\s*f\b/))) o.c = Math.round((m[1] - 32) * 5 / 9 / 5) * 5;
      if (/high heat/.test(t)) o.h = 'hoch'; else if (/medium heat|medium-high/.test(t)) o.h = 'mittel'; else if (/low heat/.test(t)) o.h = 'niedrig';
      if (/\bfan\b/.test(t) && a === 'bake') o.mo = 'U';
    } else {
      if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:(?:-|–|bis)\s*\d+(?:[.,]\d+)?\s*)?(?:min\b|minuten|min\.)/))) o.t = parseFloat(m[1].replace(',', '.'));
      else if ((m = t.match(/(\d+(?:[.,]\d+)?)\s*(?:(?:-|–|bis)\s*\d+\s*)?(?:std|stunden|stunde)\b/))) o.t = Math.round(parseFloat(m[1].replace(',', '.')) * 60);
      if ((m = t.match(/(\d+)\s*(?:sek|sekunden|sec)\b/))) { o.sec = +m[1]; delete o.t; }
      if ((m = t.match(/(\d{2,3})\s*(?:°|grad\b)/))) o.c = +m[1];
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
    if (o.t && o.t > 1440) delete o.t;
    return [a, raw, o];
  }
  window.KA_autoStep = autoStep;

  /* ---------- Live-Funktionen der veröffentlichten Version ---------- */
  var CAP = { db: null, user: null, sample: null, me: null, shopLive: false, shopErr: '', names: {} };
  function useCap(name) { try { return (window.claude && typeof window.claude.use === 'function') ? window.claude.use(name).catch(function () { return null; }) : Promise.resolve(null); } catch (e) { return Promise.resolve(null); } }
  function initCaps() {
    useCap('user').then(function (u) { CAP.user = u; if (u) u.id().then(function (id) { CAP.me = id; }).catch(function () {}); });
    useCap('sample').then(function (s) { CAP.sample = s; if (s && /^\/r\//.test(route())) render(true); });
    useCap('db').then(function (db) { if (!db) return; CAP.db = db; startShopSync(); });
  }
  var shopUnsub = null, shopTimer = null;
  function startShopSync() {
    if (!CAP.db || shopUnsub) return;
    var col = CAP.db.collection('einkauf');
    shopTimer = setTimeout(function () { CAP.shopErr = 'Die gemeinsame Liste ist gerade nicht erreichbar. Änderungen werden übertragen, sobald die Verbindung steht.'; if (route() === '/einkauf') render(true); }, 10000);
    shopUnsub = col.onSnapshot(function (snap) {
      if (!snap.metadata.fromCache) { clearTimeout(shopTimer); CAP.shopErr = ''; }
      var first = !CAP.shopLive;
      CAP.shopLive = true;
      S.shop = snap.docs.map(function (d) { var x = d.data() || {}; return { id: d.id, t: String(x.t || ''), from: String(x.from || ''), done: !!x.done, by: x.by || '', ts: x.ts || 0 }; })
        .sort(function (a, b) { return a.ts - b.ts; });
      if (first) migrateLocalShop();
      resolveNames();
      navState(route());
      if (route() === '/einkauf') render(true);
    }, function () { clearTimeout(shopTimer); CAP.shopLive = false; shopUnsub = null; S.shop = store.get('shop', []); if (route() === '/einkauf') render(true); });
  }
  function migrateLocalShop() {
    var local = store.get('shop', []);
    if (!local.length || store.get('shopMigrated', false)) return;
    store.set('shopMigrated', true);
    local.forEach(function (x) { shopAdd(x.t, x.from, x.done); });
    store.set('shop', []);
    toast(local.length + ' Einträge in die gemeinsame Liste übernommen');
  }
  function resolveNames() {
    if (!CAP.user || !CAP.user.profiles) return;
    var ids = S.shop.map(function (x) { return x.by; }).filter(function (x, i, a) { return x && a.indexOf(x) === i && !(x in CAP.names); });
    if (!ids.length) return;
    CAP.user.profiles(ids).then(function (ps) {
      ids.forEach(function (id) { CAP.names[id] = (ps && ps[id] && ps[id].name) || ''; });
      if (route() === '/einkauf') render(true);
    }).catch(function () {});
  }
  function shopAdd(t, from, done) {
    if (CAP.shopLive) {
      var id = uid();
      return CAP.db.collection('einkauf').doc(id).set({ t: t, from: from || '', done: !!done, by: CAP.me || '', ts: Date.now() })
        .catch(function (e) { toast(e && e.code === 'invalid_argument' ? 'Du hast nur Leserechte für die gemeinsame Liste.' : 'Konnte nicht gespeichert werden.'); });
    }
    S.shop.push({ id: uid(), t: t, from: from || '', done: !!done }); save('shop'); return Promise.resolve();
  }
  function shopUpdate(item, patch) {
    if (CAP.shopLive) return CAP.db.collection('einkauf').doc(item.id).update(patch).catch(function () { toast('Konnte nicht gespeichert werden.'); });
    Object.assign(item, patch); save('shop'); return Promise.resolve();
  }
  function shopDelete(item) {
    if (CAP.shopLive) return CAP.db.collection('einkauf').doc(item.id).delete().catch(function () { toast('Konnte nicht gelöscht werden.'); });
    S.shop = S.shop.filter(function (x) { return x !== item; }); save('shop'); return Promise.resolve();
  }
  /* geteilte Umschreibungen laden */
  var aiFetched = {};
  function fetchAi(rid) {
    if (!CAP.db || aiFetched[rid]) return;
    aiFetched[rid] = true;
    CAP.db.collection('ai').where('rid', '==', rid).get().then(function (snap) {
      var changed = false;
      snap.docs.forEach(function (d) { var x = d.data(); if (!x || !x.dev || !Array.isArray(x.steps)) return; var k = rid + '|' + x.dev; if (!S.ai[k] || (S.ai[k].ts || 0) < (x.ts || 0)) { S.ai[k] = cleanAi(x, x.dev); S.ai[k].ts = x.ts; changed = true; } });
      if (changed) { save('ai'); if (route() === '/r/' + rid) render(true); }
    }).catch(function () {});
  }

  /* ---------- Umschreiben mit Claude ---------- */
  var OPT_KEYS = ['t', 'sec', 'c', 'mo', 'h', 's', 'l', 'k', 'w', 'lvl', 'p'];
  var DEV_HINT = {
    tm: 'Thermomix-Schreibweise verwenden: „5 Min./100 °C/Stufe 1“, Linkslauf für stückige Zutaten, Varoma zum Dämpfen, Teigstufe zum Kneten, höchstens 2,2 Liter Füllmenge im Mixtopf.',
    airfryer: 'Temperaturen meist 160 bis 200 °C, Korb nicht überfüllen, nach der Hälfte schütteln oder wenden, bei Bedarf in Portionen garen.',
    ofen: 'Ofenmodus (Ober-/Unterhitze oder Umluft), Temperatur, Schiene und Garprobe angeben.',
    herd: 'Hitzestufe (niedrig, mittel, hoch) und Topf oder Pfanne angeben.',
    mikro: 'Wattzahl (800 Watt), Zwischenrühren und Standzeit angeben; nur machbare Schritte, sonst den Herd nennen.',
    dkt: 'Anbraten im offenen Topf, Flüssigkeitsmindestmenge, Garzeit auf Hochdruck und Druckabbau (natürlich oder schnell) angeben.',
    slow: 'Stufe LOW oder HIGH mit Stunden, wenig Flüssigkeit, Anbraten vorher in der Pfanne.',
    grill: 'Direkte oder indirekte Hitze, Temperatur und Deckel angeben.',
    sousvide: 'Wassertemperatur, Garzeit im Beutel, danach kurz scharf anbraten.',
    kalt: 'Nur Zubereitung ohne Hitze.'
  };
  function aiPrompt(r, dev) {
    var baseDev = r.devs[0], src = {
      name: r.n, portionen: r.p, sprache: r.lang === 'en' ? 'Englisch' : 'Deutsch', zutaten: r.ing,
      schritte: stepsFor(r, baseDev).map(function (s) { return s.t; }), tipps: r.tips || []
    };
    return 'Du bist eine erfahrene Köchin und schreibst Rezepte für eine deutsche Kochbuch-App um.\n' +
      'Aufgabe: Schreibe das Rezept unten auf Deutsch (metrische Einheiten: g, ml, °C; Löffelmaße als EL/TL) und passe die Zubereitung vollständig an dieses Gerät an: ' + DEV[dev].n + ' (' + DEV[dev].sub + '). ' + (DEV_HINT[dev] || '') + '\n' +
      'Wenn ein Teilschritt mit diesem Gerät nicht sinnvoll ist, nimm dafür den Herd oder Backofen und sag das im Schritt. Erfinde keine Zutaten, die nicht zum Original passen. Schreibe konkrete Schritte mit Zeiten, Temperaturen und Erkennungszeichen, wann etwas fertig ist.\n' +
      'Antworte nur mit JSON in genau dieser Form:\n' +
      '{"n":"Name auf Deutsch","desc":"ein sachlicher Satz","ing":["200 g Mehl","#Für die Soße","2 EL Öl"],"t":Gesamtminuten,"steps":[["aktion","Text des Schritts",{"t":10,"c":180}]],"tips":["kurzer Tipp"]}\n' +
      'Erlaubte Werte für "aktion": ' + Object.keys(ACTIONS).join(', ') + '.\n' +
      'Optionen pro Schritt (alle optional, nur wenn sie zutreffen): t Minuten, sec Sekunden, c Temperatur in °C oder "Varoma", mo Ofenmodus "OU"|"U"|"G"|"UG", h Herdhitze "max"|"hoch"|"mittel"|"niedrig", s Thermomix-Stufe (Zahl, "teig" oder "sanft"), l true für Linkslauf, k Kerntemperatur, w Watt, lvl "LOW"|"HIGH", p "Hochdruck"|"Niedrigdruck".\n\n' +
      'Rezept:\n' + JSON.stringify(src);
  }
  function cleanAi(j, dev) {
    if (!j || !Array.isArray(j.steps) || !j.steps.length) throw new Error('format');
    var steps = j.steps.slice(0, 60).map(function (s) {
      if (typeof s === 'string') return autoStep(s, dev, 'de');
      if (!Array.isArray(s)) s = [s.a || s.aktion, s.text || s.t, s.o || s.opts];
      var a = String(s[0] || ''), txt = String(s[1] || ''), o = {}, src = s[2] && typeof s[2] === 'object' ? s[2] : {};
      OPT_KEYS.forEach(function (k) { if (src[k] != null && src[k] !== '' && src[k] !== false) o[k] = src[k]; });
      ['t', 'sec', 'k', 'w'].forEach(function (k) { if (o[k] != null) { o[k] = parseFloat(o[k]); if (!isFinite(o[k]) || o[k] <= 0) delete o[k]; } });
      if (o.c != null && o.c !== 'Varoma') { o.c = parseFloat(o.c); if (!isFinite(o.c)) delete o.c; }
      if (o.mo && !MODES[o.mo]) delete o.mo;
      if (o.h && !HEATS[o.h]) delete o.h;
      if (o.t > 1440) delete o.t;
      if (!ACTIONS[a]) a = autoStep(txt, dev, 'de')[0];
      return [a, txt.slice(0, 600), o];
    }).filter(function (s) { return s[1]; });
    var str = function (x) { return Array.isArray(x) ? x.map(String).filter(Boolean).slice(0, 80) : []; };
    return { dev: dev, n: String(j.n || '').slice(0, 140), desc: String(j.desc || '').slice(0, 300), ing: str(j.ing), tips: str(j.tips).slice(0, 8), t: Math.round(parseFloat(j.t) || 0) || null, steps: steps };
  }
  var aiRun = null;
  function runAi(r, dev) {
    if (!CAP.sample || aiRun) return;
    var ctl = new AbortController();
    aiRun = { rid: r.id, dev: dev, ctl: ctl };
    render(true);
    CAP.sample.json(aiPrompt(r, dev), { signal: ctl.signal, modelTier: 'default' }).then(function (j) {
      var res = cleanAi(j, dev); res.ts = Date.now();
      S.ai[r.id + '|' + dev] = res; save('ai');
      if (ui.rec[r.id]) ui.rec[r.id].dev = dev;
      if (CAP.db) {
        var body = Object.assign({ rid: r.id }, res, { by: CAP.me || '' });
        CAP.db.collection('ai').doc((r.id + '__' + dev).replace(/[^A-Za-z0-9_\-.~:@+]/g, '_')).set(JSON.parse(JSON.stringify(body))).catch(function () {});
      }
      toast('Fertig umgeschrieben für ' + DEV[dev].n);
    }).catch(function (e) {
      var c = e && e.code;
      if (c !== 'cancelled') toast(c === 'not_granted' ? 'Claude wurde für diese Seite nicht erlaubt.' : c === 'rate_limited' ? 'Gerade zu viele Anfragen, bitte gleich nochmal.' : c === 'invalid_json' || (e && e.message === 'format') ? 'Antwort unbrauchbar, bitte nochmal versuchen.' : 'Umschreiben hat nicht geklappt.');
    }).then(function () { aiRun = null; render(true); });
  }

  /* ---------- Bausteine ---------- */
  function card(r) {
    var initials = r.n.replace(/[^A-Za-zÄÖÜäöü ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('');
    var badge = r.c === 'sterne' ? '<span class="badge sterne-badge">' + I('star', 'sm') + ' Sterneküche</span>' : r.c === 'kreation' ? '<span class="badge k">Kreation</span>' : r.own ? '<span class="badge">Eigenes</span>' :
      r.web ? '<span class="badge">' + (r.lang === 'de' ? 'Internet · DE' : 'Internet · EN') + '</span>' : r.v === 2 ? '<span class="badge">Vegan</span>' : r.v === 1 ? '<span class="badge">Vegetarisch</span>' : '';
    var img = '';
    if (EXT_OK && r.web && r.hasImg) { var x = WEB.raw[r.id]; if (x && x.img) img = '<img class="web-img" src="' + esc(imgUrl(x.img, 480)) + '" alt="" loading="lazy" onerror="this.remove()">'; }
    return '<a class="rcard" href="#r-' + esc(r.id) + '" style="--h:' + hue(r) + '">' +
      '<div class="rvis">' + I('c_' + (CATS[r.c] || CATS.welt).ic) + '<span class="initials">' + esc(initials) + '</span>' + img + badge +
      '<button class="fav-btn ' + (isFav(r.id) ? 'on' : '') + '" data-act="fav" data-id="' + esc(r.id) + '" aria-label="Favorit">' + I('heart') + '</button></div>' +
      '<div class="rbody"><h3>' + esc(r.n) + '</h3><div class="rmeta">' + (r.k ? '<span>' + esc(r.k) + '</span>' : '') + (r.minTime ? '<span>' + I('clock', 'sm') + fmtTime(r.minTime) + '</span>' : '') + (r.web ? '' : '<span>' + DIFF[r.d || 1] + '</span>') + '</div>' +
      '<div class="rdevs">' + r.devs.concat(r.needs || []).map(function (d) { return '<span class="d ' + (S.devices.indexOf(d) >= 0 ? 'mine' : '') + '" title="' + esc(DEV[d] ? DEV[d].n : d) + '">' + I('d_' + d) + '</span>'; }).join('') + '</div></div></a>';
  }
  function devTile(d, on, act) {
    return '<button class="dev-tile ' + (on ? 'on' : '') + '" data-act="' + act + '" data-dev="' + d + '" aria-pressed="' + on + '">' + I('d_' + d) + '<span><b>' + DEV[d].n + '</b><small>' + DEV[d].sub + '</small></span></button>';
  }

  /* ---------- Ansicht: Start ---------- */
  function vHome() {
    var A = liteAll(), mine = A.filter(mineOK), B = all();
    var hr = new Date().getHours();
    var greet = hr < 11 ? 'Guten Morgen' : hr < 17 ? 'Hallo' : 'Guten Abend';
    var sterne = B.filter(function (r) { return r.c === 'sterne'; });
    var kre = B.filter(function (r) { return r.c === 'kreation'; });
    var quick = seeded(mine.filter(function (r) { return !r.web && r.minTime && r.minTime <= 30; }), today()).slice(0, 12);
    var webDe = seeded(A.filter(function (r) { return r.web && r.lang === 'de' && mineOK(r); }), today() + 3).slice(0, 12);
    var webEn = seeded(A.filter(function (r) { return r.web && r.lang === 'en' && mineOK(r); }), today() + 5).slice(0, 12);
    var methods = B.reduce(function (s, r) { return s + r.devs.length; }, 0);
    var cuis = {};
    A.forEach(function (r) { if (r.k) cuis[r.k] = (cuis[r.k] || 0) + 1; });
    var cuisList = Object.keys(cuis).sort(function (a, b) { return cuis[b] - cuis[a]; });
    var webN = (window.KA_WEB_INDEX || []).length;
    return '<section class="home-hero"><div class="deco">' + ANIM.scene('stir', { h: 'mittel' }).replace('class="scene', 'class="scene play force') + '</div>' +
      '<h1>' + greet + '! Was kochen wir heute?</h1><p>' + A.length.toLocaleString('de-DE') + ' Rezepte aus aller Welt, Schritt für Schritt für dein Gerät: Herd, Backofen, Heißluftfritteuse, Thermomix, Sous-vide und mehr.</p>' +
      '<form class="searchbox" data-form="search">' + I('search') + '<input id="homeq" type="search" placeholder="Rezept, Zutat oder Land suchen …" autocomplete="off" aria-label="Suche"></form>' +
      '<div class="hero-stats"><div><b>' + A.length.toLocaleString('de-DE') + '</b>Rezepte</div><div><b>' + webN.toLocaleString('de-DE') + '</b>aus dem Internet</div><div><b>' + methods + '</b>Geräte-Anleitungen</div><div><b>' + cuisList.length + '</b>Länder & Regionen</div></div></section>' +

      '<section class="sec"><div class="sec-h"><h2>Meine Küche</h2><span class="muted" style="font-size:14px">Tippe an, was du hast</span></div><div class="dev-grid">' +
      Object.keys(DEV).filter(function (d) { return d !== 'kalt'; }).map(function (d) { return devTile(d, S.devices.indexOf(d) >= 0, 'mydev'); }).join('') + '</div></section>' +

      '<section class="sec cta-row"><button class="cta" data-act="random">' + '<span class="ic">' + I('dice', 'lg') + '</span><span><b>Überrasch mich</b><span>Ein zufälliges Rezept für deine Geräte</span></span></button>' +
      '<a class="cta" href="#anrichten"><span class="ic">' + I('plate', 'lg') + '</span><span><b>Anrichte-Schule</b><span>Teller anrichten wie im Sternerestaurant</span></span></a>' +
      '<a class="cta" href="#einkauf"><span class="ic">' + I('users2', 'lg') + '</span><span><b>Gemeinsame Einkaufsliste</b><span>' + (CAP.shopLive ? 'Live geteilt' : 'Lokal, teilbar per Messenger') + '</span></span></a></section>' +

      '<section class="sec"><div class="sec-h"><h2>Sterneküche</h2><a href="#entdecken" data-act="fcat" data-cat="sterne">Alle</a></div><p class="muted" style="margin:-6px 0 12px">Mit visuellem Anrichte-Plan: Schritt für Schritt, wo was auf den Teller kommt.</p><div class="hscroll">' + sterne.map(card).join('') + '</div></section>' +

      '<section class="sec"><div class="sec-h"><h2>Kategorien</h2><a href="#entdecken" data-act="fclear">Alle ansehen</a></div><div class="cat-grid">' +
      Object.keys(CATS).map(function (c) {
        var n = A.filter(function (r) { return r.c === c; }).length;
        return '<a class="cat-tile" href="#entdecken" data-act="fcat" data-cat="' + c + '" style="--h:' + CATS[c].h + '">' + I('c_' + CATS[c].ic) + '<b>' + CATS[c].n + '</b><span>' + n.toLocaleString('de-DE') + ' Rezepte</span></a>';
      }).join('') + '</div></section>' +

      (webDe.length ? '<section class="sec"><div class="sec-h"><h2>Aus dem deutschen Wikibooks-Kochbuch</h2><a href="#entdecken" data-act="fsrc" data-v="de">Alle</a></div><div class="hscroll">' + webDe.map(card).join('') + '</div></section>' : '') +
      (webEn.length ? '<section class="sec"><div class="sec-h"><h2>Weltküche (englische Originale)</h2><a href="#entdecken" data-act="fsrc" data-v="en">Alle</a></div><p class="muted" style="margin:-6px 0 12px">' + (CAP.sample ? 'Auf der Rezeptseite lässt Claude sie auf Deutsch übersetzen und für dein Gerät umschreiben.' : 'Originaltexte auf Englisch, Animationen und Timer werden automatisch zugeordnet.') + '</p><div class="hscroll">' + webEn.map(card).join('') + '</div></section>' : '') +
      '<section class="sec"><div class="sec-h"><h2>Eigene Kreationen</h2><a href="#entdecken" data-act="fcat" data-cat="kreation">Alle</a></div><p class="muted" style="margin:-6px 0 12px">Ideen von mir, nicht in einer Testküche erprobt.</p><div class="hscroll">' + kre.map(card).join('') + '</div></section>' +
      (quick.length ? '<section class="sec"><div class="sec-h"><h2>In 30 Minuten fertig</h2><a href="#entdecken" data-act="ftime">Alle</a></div><div class="hscroll">' + quick.map(card).join('') + '</div></section>' : '') +
      '<section class="sec"><div class="sec-h"><h2>Weltreise</h2></div><div class="chips">' +
      cuisList.slice(0, 80).map(function (k) { return '<a class="chip" href="#entdecken" data-act="fcuisine" data-k="' + esc(k) + '">' + esc(k) + ' <span class="n">' + cuis[k] + '</span></a>'; }).join('') + '</div></section>' +
      (EXT_OK ? '<section class="sec"><a class="cta" href="#welt"><span class="ic">' + I('globe', 'lg') + '</span><span><b>Noch mehr: Online-Suche</b><span>Zusätzlich live in TheMealDB suchen (englisch, mit Fotos)</span></span></a></section>' : '');
  }

  /* ---------- Ansicht: Entdecken ---------- */
  var DE_EN = { hahnchen: 'chicken', huhn: 'chicken', huhnchen: 'chicken', geflugel: 'chicken', rind: 'beef', rindfleisch: 'beef', schwein: 'pork', schweinefleisch: 'pork', lamm: 'lamb', ente: 'duck', pute: 'turkey', truthahn: 'turkey',
    fisch: 'fish', lachs: 'salmon', thunfisch: 'tuna', garnele: 'shrimp', garnelen: 'shrimp', krabben: 'crab', muschel: 'mussel', muscheln: 'mussel', kuchen: 'cake', torte: 'cake', brot: 'bread', brotchen: 'roll',
    keks: 'cookie', kekse: 'cookie', platzchen: 'cookie', suppe: 'soup', eintopf: 'stew', salat: 'salad', sosse: 'sauce', nudeln: 'noodle', nudel: 'pasta', kartoffel: 'potato', kartoffeln: 'potato',
    reis: 'rice', ei: 'egg', eier: 'egg', kase: 'cheese', schokolade: 'chocolate', apfel: 'apple', banane: 'banana', erdbeere: 'strawberry', zitrone: 'lemon', tomate: 'tomato', tomaten: 'tomato',
    zwiebel: 'onion', knoblauch: 'garlic', pilze: 'mushroom', pilz: 'mushroom', champignons: 'mushroom', spinat: 'spinach', kurbis: 'pumpkin', karotte: 'carrot', mohre: 'carrot', mohren: 'carrot', bohnen: 'bean',
    linsen: 'lentil', kichererbsen: 'chickpea', gemuse: 'vegetable', getrank: 'drink', fruhstuck: 'breakfast', nachtisch: 'dessert', pfannkuchen: 'pancake', eis: 'ice cream', hackfleisch: 'ground', wurst: 'sausage',
    speck: 'bacon', schinken: 'ham', honig: 'honey', zimt: 'cinnamon', gebraten: 'fried', gebacken: 'baked', vegetarisch: 'vegetarian', scharf: 'spicy', marmelade: 'jam', teig: 'dough', auflauf: 'casserole',
    braten: 'roast', erdnuss: 'peanut', mandel: 'almond', kokos: 'coconut', mais: 'corn', erbsen: 'pea', paprika: 'pepper', gurke: 'cucumber', birne: 'pear', kirsche: 'cherry', pfirsich: 'peach', quark: 'quark', sahne: 'cream' };
  function filtered() {
    var f = ui.f, q = fold(f.q).trim(), words = q ? q.split(/\s+/) : [];
    var alts = words.map(function (w) { return DE_EN[w] ? [w, DE_EN[w]] : [w]; });
    var res = liteAll().filter(function (r) {
      if (f.cat && r.c !== f.cat) return false;
      if (f.dev && r.devs.indexOf(f.dev) < 0 && (r.needs || []).indexOf(f.dev) < 0) return false;
      if (f.diet === 'veg' && r.v < 1) return false;
      if (f.diet === 'vegan' && r.v < 2) return false;
      if (f.time && (!r.minTime || r.minTime > f.time)) return false;
      if (f.cuisine && r.k !== f.cuisine) return false;
      if (f.src === 'atlas' && r.web) return false;
      if ((f.src === 'de' || f.src === 'en') && !(r.web && r.lang === f.src)) return false;
      if (S.onlyMine && !f.dev && !mineOK(r)) return false;
      for (var i = 0; i < alts.length; i++) { if (!alts[i].some(function (a) { return r._search.indexOf(a) >= 0; })) return false; }
      return true;
    });
    var rank = function (r) { return r.web ? (r.lang === 'de' ? 1 : 2) : 0; };
    var srt = {
      empf: function (a, b) { return rank(a) - rank(b) || a.n.localeCompare(b.n, 'de'); },
      name: function (a, b) { return a.n.localeCompare(b.n, 'de'); },
      time: function (a, b) { return (a.minTime || 9999) - (b.minTime || 9999); },
      diff: function (a, b) { return (a.d || 2) - (b.d || 2); }
    }[f.sort] || function () { return 0; };
    if (q) {
      res.sort(function (a, b) { var an = fold(a.n).indexOf(q) >= 0 ? 0 : 1, bn = fold(b.n).indexOf(q) >= 0 ? 0 : 1; return an - bn || srt(a, b); });
    } else res.sort(srt);
    return res;
  }
  function vExplore() {
    var f = ui.f, A = liteAll();
    var cuis = {}; A.forEach(function (r) { if (r.k) cuis[r.k] = 1; });
    var chip = function (act, val, cur, label, extra) { return '<button class="chip ' + (cur === val ? 'on' : '') + '" data-act="' + act + '" data-v="' + esc(val) + '">' + (extra || '') + label + '</button>'; };
    return '<div class="explore-head"><h1>Entdecken</h1>' +
      '<div class="searchbox" style="max-width:none">' + I('search') + '<input id="q" type="search" value="' + esc(f.q) + '" placeholder="Suche nach Gericht, Zutat, Land (deutsche Begriffe finden auch englische Rezepte)" autocomplete="off" aria-label="Suche"></div>' +
      '<div class="filter-label">Kategorie</div><div class="filter-row">' + chip('fc', '', f.cat, 'Alle') + Object.keys(CATS).map(function (c) { return chip('fc', c, f.cat, CATS[c].n); }).join('') + '</div>' +
      '<div class="filter-label">Gerät</div><div class="filter-row">' + chip('fd', '', f.dev, 'Alle Geräte') + Object.keys(DEV).map(function (d) { return chip('fd', d, f.dev, DEV[d].n, I('d_' + d, 'sm')); }).join('') + '</div>' +
      '<div class="filter-label">Quelle, Ernährung, Zeit</div><div class="filter-row">' + chip('fs2', '', f.src, 'Alle Quellen') + chip('fs2', 'atlas', f.src, 'Kochatlas') + chip('fs2', 'de', f.src, 'Internet deutsch') + chip('fs2', 'en', f.src, 'Internet englisch') +
      chip('fv', '', f.diet, 'Alles') + chip('fv', 'veg', f.diet, 'Vegetarisch') + chip('fv', 'vegan', f.diet, 'Vegan') +
      chip('ft', '0', String(f.time), 'Jede Dauer') + chip('ft', '30', String(f.time), '≤ 30 Min') + chip('ft', '60', String(f.time), '≤ 1 Std') + '</div>' +
      '<div class="filter-bar"><select class="input" data-change="fk" aria-label="Küche"><option value="">Alle Länder</option>' +
      Object.keys(cuis).sort(function (a, b) { return a.localeCompare(b, 'de'); }).map(function (k) { return '<option ' + (f.cuisine === k ? 'selected' : '') + '>' + esc(k) + '</option>'; }).join('') + '</select>' +
      '<select class="input" data-change="fs" aria-label="Sortierung">' + [['empf', 'Empfohlen'], ['name', 'A–Z'], ['time', 'Schnellste zuerst'], ['diff', 'Einfachste zuerst']].map(function (o) { return '<option value="' + o[0] + '"' + (f.sort === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>' +
      '<label class="toggle"><input type="checkbox" data-change="fm" ' + (S.onlyMine ? 'checked' : '') + '> Nur für meine Geräte</label></div></div>' +
      '<div id="results"></div>';
  }
  function renderResults() {
    var el = $('#results'); if (!el) return;
    var res = filtered(), shown = res.slice(0, ui.limit);
    el.innerHTML = '<div class="result-count">' + res.length.toLocaleString('de-DE') + ' Rezepte</div>' +
      (res.length ? '<div class="grid">' + shown.map(card).join('') + '</div>' + (res.length > shown.length ? '<div style="text-align:center;margin-top:18px"><button class="btn" data-act="more">Weitere ' + Math.min(60, res.length - shown.length) + ' anzeigen</button></div>' : '') :
        '<div class="empty">' + I('search') + '<h3>Nichts gefunden</h3><p>Filter lockern' + (EXT_OK ? ' oder in der <a href="#welt" style="color:var(--accent);font-weight:700">Online-Suche</a> nachsehen' : '') + '.</p></div>');
    preloadImages(shown);
  }
  function preloadImages(list) {
    var need = {};
    if (!EXT_OK) return;
    list.forEach(function (r) { if (r.web && r.hasImg && !WEB.raw[r.id]) need[r.chunk] = 1; });
    Object.keys(need).slice(0, 3).forEach(function (n) { loadChunk(+n).then(function () { list.forEach(function (r) { if (r.web && r.hasImg) { var c = $('.rcard[href="#r-' + r.id + '"] .rvis'); var x = WEB.raw[r.id]; if (c && x && x.img && !$('img', c)) c.insertAdjacentHTML('beforeend', '<img class="web-img" src="' + esc(imgUrl(x.img, 480)) + '" alt="" loading="lazy" onerror="this.remove()">'); } }); }).catch(function () {}); });
  }

  /* ---------- Ansicht: Rezept ---------- */
  function pickDev(r) {
    var st = ui.rec[r.id];
    if (st && st.dev && r.m[st.dev]) return st.dev;
    for (var i = 0; i < S.devices.length; i++) if (r.m[S.devices[i]]) return S.devices[i];
    return r.devs[0];
  }
  function recState(r) {
    if (!ui.rec[r.id]) ui.rec[r.id] = { p: r.p || 4, done: {}, pi: -1 };
    var st = ui.rec[r.id]; st.dev = pickDev(r); return st;
  }
  function aiBox(r) {
    if (!CAP.sample) return r.lang === 'en' ? '<div class="info" style="margin:14px 0">' + I('info', 'sm') + ' Englischer Originaltext. In der über Claude geteilten Version der App kann Claude das Rezept auf Deutsch übersetzen und für jedes Gerät umschreiben.</div>' : '';
    var running = aiRun && aiRun.rid === r.id;
    var mineList = S.devices.filter(function (d) { return DEV[d]; });
    var def = r.lang === 'en' ? (mineList.indexOf(r.devs[0]) >= 0 || !mineList.length ? r.devs[0] : mineList[0]) : (mineList.filter(function (d) { return !r.m[d]; })[0] || mineList[0] || r.devs[0]);
    var opts = Object.keys(DEV).filter(function (d) { return d !== 'kalt'; }).sort(function (a, b) { return (S.devices.indexOf(a) < 0) - (S.devices.indexOf(b) < 0); })
      .map(function (d) { return '<option value="' + d + '"' + (d === def ? ' selected' : '') + '>' + DEV[d].n + (r.m[d] ? (r.lang === 'en' ? ' (übersetzen)' : ' (vorhanden)') : '') + '</option>'; }).join('');
    return '<div class="ai-box">' + I('wand', 'lg') + '<p><b>' + (r.lang === 'en' ? 'Auf Deutsch übersetzen und für dein Gerät umschreiben' : 'Für ein anderes Gerät umschreiben') + '</b><br>' +
      (running ? 'Claude schreibt das Rezept für ' + DEV[aiRun.dev].n + ' um. Das dauert meist 20 bis 60 Sekunden …' : 'Claude passt Zutaten, Schritte, Zeiten und Temperaturen an. Das Ergebnis wird gespeichert' + (CAP.db ? ' und mit allen geteilt, die die App nutzen.' : '.')) + '</p>' +
      (running ? '<button class="btn" data-act="aistop">' + I('close', 'sm') + 'Abbrechen</button>' :
        '<select class="input" id="aidev" style="width:auto" aria-label="Gerät">' + opts + '</select><button class="btn primary" data-act="airun">' + I('wand', 'sm') + 'Umschreiben</button>') + '</div>';
  }
  function plateSection(r) {
    if (!r.plate) return '';
    var st = ui.rec[r.id], els = r.plate.els, i = st.pi;
    return '<section class="card-box" id="plate-sec" style="margin:18px 0"><div class="steps-head"><h2 style="display:flex;gap:8px;align-items:center">' + I('plate') + 'Anrichten wie im Sternerestaurant</h2><a class="btn sm" href="#anrichten">' + I('bulb', 'sm') + 'Techniken lernen</a></div>' +
      '<div class="platebox"><div class="plate-stage">' + PLATE.svg(r.plate, i, st.pa, i < els.length - 1 || i === -1) + '</div><div>' +
      '<p class="muted" style="margin-top:0;font-size:14px">' + (i < 0 ? 'Leerer, vorgewärmter Teller. Die Zahlen am Rand sind Uhrzeiten: 12 Uhr ist oben, also gegenüber von dir.' : '<b style="color:var(--text)">Schritt ' + (i + 1) + ' von ' + els.length + ': ' + esc(els[i].t) + '</b><br>' + esc(els[i].how)) + '</p>' +
      '<div class="plate-ctrl"><button class="btn" data-act="pprev"' + (i < 0 ? ' disabled style="opacity:.4"' : '') + '>' + I('back', 'sm') + 'Zurück</button>' +
      (i < els.length - 1 ? '<button class="btn primary" data-act="pnext">' + (i < 0 ? 'Start' : 'Nächste Komponente') + I('next', 'sm') + '</button>' : '<button class="btn primary" data-act="preset">' + I('rotate', 'sm') + 'Nochmal</button>') +
      '<button class="btn ghost" data-act="pplay">' + I('play', 'sm') + 'Abspielen</button></div>' +
      '<ol class="plate-steps">' + els.map(function (e, k) { return '<li class="' + (k < i ? 'done' : k === i ? 'cur' : '') + '" data-act="pgo" data-i="' + k + '"><span class="n">' + (k + 1) + '</span><div><b>' + esc(e.t) + '</b><span>' + esc(e.how) + '</span></div></li>'; }).join('') + '</ol>' + '</div></div></section>';
  }
  function vRecipe(id) {
    var base = byId(id);
    if (!base && WEB.idx[id]) {
      loadChunk(WEB.idx[id][7]).then(function () { if (route() === '/r/' + id) render(true); }).catch(function () { var v = $('#view'); if (v) v.innerHTML = '<div class="empty">' + I('info') + '<h3>Rezept konnte nicht geladen werden</h3><p>Seite neu laden oder Internetverbindung prüfen.</p></div>'; });
      return '<div class="empty">' + I('book') + '<h3>Rezept wird geladen …</h3></div>';
    }
    if (!base) return '<div class="empty">' + I('info') + '<h3>Rezept nicht gefunden</h3><p><a href="#start" style="color:var(--accent)">Zur Startseite</a></p></div>';
    fetchAi(base.id);
    var r = viewOf(base), st = recState(r), dev = st.dev, f = st.p / (r.p || 4), m = r.m[dev] || {};
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
    var heroImg = EXT_OK && r.img ? 'background-image:linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.65)),url(' + esc(imgUrl(r.img, 1200)) + ');background-size:cover;background-position:center;' : '';
    return '<article>' +
      '<div class="rhero" style="--h:' + hue(r) + ';' + heroImg + '"><div class="rhero-top"><button class="glass-btn" data-act="back" aria-label="Zurück">' + I('back') + '</button>' +
      '<span style="display:flex;gap:8px"><button class="glass-btn" data-act="share" aria-label="Teilen">' + I('share') + '</button>' +
      (r.own ? '<a class="glass-btn" href="#bearbeiten-' + esc(r.id) + '" aria-label="Bearbeiten">' + I('edit') + '</a>' : '') +
      '<button class="glass-btn ' + (isFav(r.id) ? 'on' : '') + '" data-act="fav" data-id="' + esc(r.id) + '" aria-label="Favorit">' + I('heart') + '</button></span></div>' +
      (heroImg ? '' : '<div class="rhero-ic">' + I('c_' + (CATS[r.c] || CATS.welt).ic) + '</div>') +
      '<div class="rhero-txt"><span class="pill">' + esc((CATS[r.c] || {}).n || '') + (r.k ? ' · ' + esc(r.k) : '') + '</span><h1>' + esc(r.n) + '</h1>' + (r.desc ? '<p>' + esc(r.desc) + '</p>' : '') + '</div></div>' +
      '<div class="rstats"><div class="rstat">' + I('clock') + '<b>' + fmtTime(m.t) + '</b><span>Gesamtzeit</span></div><div class="rstat">' + I('bars') + '<b>' + DIFF[r.d || 1] + '</b><span>Schwierigkeit</span></div>' +
      '<div class="rstat">' + I('list') + '<b>' + steps.length + '</b><span>Schritte</span></div><div class="rstat">' + I('c_leaf') + '<b>' + (r.v === 2 ? 'Vegan' : r.v === 1 ? 'Vegetarisch' : r.web ? 'Siehe Zutaten' : 'Mit Fleisch/Fisch') + '</b><span>Ernährung</span></div></div>' +
      (r.c === 'kreation' ? '<div class="kreation-note">' + I('spark') + '<div><b>Eigene Kreation.</b> Diese Kombination habe ich mir ausgedacht. Die einzelnen Techniken sind erprobt, das Rezept als Ganzes wurde nicht in einer Testküche nachgekocht.</div></div>' : '') +
      (r.web ? '<div class="info" style="margin-bottom:6px">Quelle: <a href="' + esc(r.srcUrl) + '" target="_blank" rel="noopener" style="color:var(--accent);font-weight:700">' + esc(base.n) + '</a> aus dem ' + esc(r.src) + '. Die Animationen und Timer ordnet die App automatisch zu.</div>' : r.src ? '<div class="info" style="margin-bottom:14px">Quelle: ' + esc(r.src) + '</div>' : '') +
      aiBox(base) +
      '<section class="devpick"><h2>Womit kochst du?</h2><div class="devtabs">' + r.devs.map(function (d) {
        return '<button class="devtab ' + (d === dev ? 'on ' : '') + (S.devices.indexOf(d) < 0 && d !== 'kalt' ? 'notmine' : '') + '" data-act="tab" data-dev="' + d + '">' + I('d_' + d) + '<span><b>' + DEV[d].n + (r.m[d].ai ? ' ✦' : '') + '</b><small>' + fmtTime(r.m[d].t) + '</small></span></button>';
      }).join('') + '</div>' + (r.needs && r.needs.length && !m.ai ? '<p class="muted" style="font-size:13.5px;margin:6px 0 0">Laut Anleitung außerdem nötig: ' + r.needs.map(function (d) { return DEV[d].n; }).join(', ') + '</p>' : '') + '</section>' +
      '<div class="rcols"><aside class="ingbox card-box"><h2>Zutaten</h2>' +
      '<div class="portions"><button data-act="por" data-d="-1" aria-label="Weniger">' + I('minus') + '</button><b>' + st.p + ' ' + esc(r.pu || (st.p === 1 ? 'Portion' : 'Portionen')) + '</b><button data-act="por" data-d="1" aria-label="Mehr">' + I('plus') + '</button></div>' +
      '<ul class="ing-list">' + ingHTML + '</ul>' +
      '<button class="btn block" style="margin-top:14px" data-act="toshop">' + I('cart') + 'Auf die Einkaufsliste</button><p class="muted" style="font-size:12.5px;margin:8px 0 0">Abgehakte Zutaten (schon vorhanden) werden nicht übernommen.</p></aside>' +
      '<section class="steps"><div class="steps-head"><h2>Zubereitung · ' + esc(DEV[dev].n) + '</h2><button class="btn primary" data-act="cook">' + I('play') + 'Kochmodus starten</button></div>' +
      (m.note ? '<div class="method-note">' + I('info') + '<span>' + esc(m.note) + '</span></div>' : '') + stepHTML +
      plateSection(r) +
      (r.tips && r.tips.length ? '<div class="tips card-box"><h2 style="font-size:18px;display:flex;gap:8px;align-items:center">' + I('bulb') + 'Tipps</h2><ul>' + r.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' : '') +
      '<div class="note-area card-box" style="margin-top:14px"><div class="field" style="margin:0"><label for="note">Meine Notizen</label><textarea class="input" id="note" data-id="' + esc(r.id) + '" placeholder="z. B. „Beim nächsten Mal weniger Salz“">' + esc(S.notes[r.id] || '') + '</textarea><small>Wird nur auf diesem Gerät gespeichert.</small></div></div>' +
      '</section></div></article>';
  }
  function curRecipe() { var id = decodeURIComponent(route().slice(3)); var b = byId(id); return b ? viewOf(b) : null; }

  /* ---------- Anrichte-Schule ---------- */
  var SCHOOL = [
    { t: 'Die Uhr als Bauplan', n: 'Köche denken den Teller als Zifferblatt, 6 Uhr zeigt zu dir. Klassisch: Hauptzutat auf 6 Uhr, Stärke auf 10 Uhr, Gemüse auf 2 Uhr. So isst man vom Wichtigsten zuerst.',
      plan: { shape: 'round', els: [{ e: 'slices', x: 150, y: 200, n: 2, r: 22, col: '#5c2418', inner: '#cf5f55', t: '6 Uhr' }, { e: 'disc', x: 98, y: 116, r: 22, col: '#f2d48c', sear: '#c88832', t: '10 Uhr' }, { e: 'spheres', x: 202, y: 116, n: 6, r: 6, spread: 18, col: '#6aa84f', t: '2 Uhr' }] } },
    { t: 'Swoosh mit dem Löffel', n: 'Einen Klecks Püree setzen, den Löffelrücken mittig hineindrücken und in einem Zug durchziehen. Das Püree muss weich, aber nicht flüssig sein. Nicht nachbessern, ein zweiter Versuch auf einem frischen Teller sieht besser aus.',
      plan: { shape: 'round', els: [{ e: 'swoosh', x: 150, y: 156, len: 160, a: -12, w: 30, col: '#efe4c8' }] } },
    { t: 'Quenelle (Nocke) formen', n: 'Zwei-Löffel-Methode: Masse zwischen zwei Esslöffeln drei- bis viermal hin und her schaben, bis drei glatte Seiten entstehen. Ein-Löffel-Methode für Eis: Löffel in heißes Wasser tauchen und in einem Zug über die Oberfläche ziehen, bis sich die Nocke einrollt.',
      plan: { shape: 'round', els: [{ e: 'crumble', x: 150, y: 160, len: 90, n: 30, col: '#6b4430' }, { e: 'quenelle', x: 150, y: 150, size: 30, a: -25, col: '#fbf2da' }] } },
    { t: 'Punkte und Tropfen', n: 'Mit einer Spritzflasche oder einem Spritzbeutel. Senkrecht halten, drücken, kurz stoppen und abheben. Eine Reihe kleiner werdender Punkte im Bogen gibt Bewegung. Gele müssen glatt und frei von Luftblasen sein.',
      plan: { shape: 'round', els: [{ e: 'dots', x: 150, y: 150, n: 6, len: 150, size: 9, col: '#d3204d', curve: 18 }] } },
    { t: 'Ringform (Timbale)', n: 'Servierring auf den Teller stellen, füllen, mit dem Löffelrücken andrücken, glatt streichen und senkrecht nach oben abziehen. Ideal für Tatar, Risotto, Brunoise, Couscous.',
      plan: { shape: 'round', els: [{ e: 'ring', x: 150, y: 150, r: 42, col: '#a8323a', top: '#f3e0c0' }, { e: 'herbs', x: 150, y: 146, r: 20, n: 4 }] } },
    { t: 'Fächern', n: 'Fleisch oder Fisch quer zur Faser schneiden und die Scheiben leicht überlappend auslegen, Schnittfläche nach oben. So sieht man die Garstufe.',
      plan: { shape: 'round', els: [{ e: 'slices', x: 150, y: 150, n: 4, r: 22, a: -10, col: '#5a2016', inner: '#c45a50' }] } },
    { t: 'Höhe aufbauen', n: 'Komponenten übereinander statt nebeneinander: Basis, Hauptzutat, oben ein knuspriges Element (Chip, Tuile, Kräuter). Höhe macht den Teller lebendig.',
      plan: { shape: 'round', els: [{ e: 'pool', x: 150, y: 152, r: 40, col: '#eee3c9' }, { e: 'stack', x: 150, y: 150, r: 28 }, { e: 'shard', x: 160, y: 132, size: 44, a: 25, col: '#d7a457' }] } },
    { t: 'Ungerade Zahlen', n: 'Drei oder fünf Stück wirken ruhiger und natürlicher als zwei oder vier. Das gilt für Muscheln, Gnocchi, Tupfen und Garnituren.',
      plan: { shape: 'round', els: [{ e: 'disc', x: 112, y: 150, r: 18, col: '#f4ead6', sear: '#c98a3c', rep: 3, dx: 38, dy: -6 }] } },
    { t: 'Crumble und Sand als Linie', n: 'Streusel, Nüsse oder Kapernsand als Linie oder Halbmond streuen. Sie geben Knusper und eine Fläche, auf der Nocken nicht verrutschen.',
      plan: { shape: 'slate', els: [{ e: 'crumble', x: 150, y: 150, len: 210, n: 70, wide: 16, a: -8, col: '#5a3424' }] } },
    { t: 'Kräuter und Blüten', n: 'Mit der Pinzette setzen, nicht streuen. Nur was zum Gericht passt und essbar ist. Drei Blätter wirken edler als eine Handvoll.',
      plan: { shape: 'round', els: [{ e: 'block', x: 150, y: 150, w: 80, h: 34, rx: 10, col: '#f58f5c' }, { e: 'herbs', x: 150, y: 140, r: 26, n: 3 }, { e: 'flowers', x: 150, y: 150, n: 3, r: 34 }] } },
    { t: 'Soße richtig setzen', n: 'Soße neben oder unter die Hauptzutat, nie über eine knusprige Kruste oder Haut. Suppen und Sud im tiefen Teller am Tisch angießen.',
      plan: { shape: 'deep', els: [{ e: 'disc', x: 150, y: 150, r: 28, col: '#fbf8f1' }, { e: 'bowlfill', x: 150, y: 152, r: 80, col: 'rgba(238,170,90,.45)' }] } },
    { t: 'Freiraum und sauberer Rand', n: 'Maximal zwei Drittel des Tellers belegen, der Rand bleibt frei. Zum Schluss den Rand mit einem feuchten Tuch abwischen. Warme Gerichte auf vorgewärmten Tellern (60 °C), kalte auf gekühlten.',
      plan: { shape: 'round', els: [{ e: 'pool', x: 130, y: 160, r: 24, col: '#6e1f55' }, { e: 'slices', x: 160, y: 150, n: 3, r: 18, col: '#5a2016', inner: '#c45a50' }, { e: 'dots', x: 180, y: 110, n: 3, len: 40, size: 5, col: '#efe5cf' }] } }
  ];
  function vSchool() {
    return '<div class="page-h"><h1>Anrichte-Schule</h1></div><p class="muted" style="margin-top:-8px;max-width:70ch">Die Grundtechniken, mit denen Restaurantteller entstehen. Tippe auf einen Teller, um die Animation zu wiederholen. Die Rezepte der Sterneküche haben jeweils einen eigenen Anrichte-Plan.</p>' +
      '<div class="school-grid" style="margin-top:16px">' + SCHOOL.map(function (s, i) {
        return '<div class="card-box school-card"><div class="plate-stage" data-act="school" data-i="' + i + '" style="cursor:pointer">' + PLATE.svg(s.plan, s.plan.els.length - 1, -1, false) + '</div><h3>' + (i + 1) + '. ' + esc(s.t) + '</h3><p>' + esc(s.n) + '</p></div>';
      }).join('') + '</div>' +
      '<section class="sec"><div class="sec-h"><h2>Zum Üben: Sterneküche</h2><a href="#entdecken" data-act="fcat" data-cat="sterne">Alle</a></div><div class="hscroll">' + all().filter(function (r) { return r.plate; }).map(card).join('') + '</div></section>';
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
      (c.i < n - 1 ? '<button class="btn primary" data-act="cooknext">Weiter' + I('next') + '</button>' : r.plate ? '<button class="btn primary" data-act="cookplate">' + I('plate') + 'Zum Anrichte-Plan</button>' : '<button class="btn primary" data-act="cookclose">' + I('check') + 'Fertig. Guten Appetit!</button>') + '</div>';
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
    var who = function (x) { if (!CAP.shopLive || !x.by) return ''; if (x.by === CAP.me) return 'von dir'; var n = CAP.names[x.by]; return n ? 'von ' + n : ''; };
    return '<div class="page-h"><h1>Einkaufsliste</h1><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><span class="sync-pill ' + (CAP.shopLive ? 'live' : '') + '">' + (CAP.shopLive ? 'Live geteilt' : I('cloud', 'sm') + 'Nur auf diesem Gerät') + '</span>' +
      '<button class="btn sm" data-act="shopshare">' + I('share', 'sm') + 'Als Text teilen</button><button class="btn sm" data-act="shopclean">Erledigte entfernen</button><button class="btn sm danger" data-act="shopclear">Alles löschen</button></div></div>' +
      (CAP.shopErr ? '<div class="method-note">' + I('info') + '<span>' + esc(CAP.shopErr) + '</span></div>' : '') +
      '<div class="card-box"><form class="add-row" data-form="shopadd"><input class="input" id="shopnew" placeholder="Artikel hinzufügen, z. B. 1 Liter Milch" autocomplete="off"><button class="btn primary" aria-label="Hinzufügen">' + I('plus') + '</button></form>' +
      (S.shop.length ? '<p class="muted" style="margin:0 0 6px;font-size:14px">' + open + ' offen</p><ul class="list">' + S.shop.map(function (x, i) {
        var w = who(x), meta = [x.from, w].filter(Boolean).join(' · ');
        return '<li class="' + (x.done ? 'done' : '') + '"><button class="cb" data-act="shoptoggle" data-i="' + i + '" aria-label="Abhaken">' + I('check', 'sm') + '</button><span class="t">' + esc(x.t) + (meta ? '<small>' + esc(meta) + '</small>' : '') + '</span><button class="icon-btn" data-act="shopdel" data-i="' + i + '" aria-label="Entfernen">' + I('trash', 'sm') + '</button></li>';
      }).join('') + '</ul>' : '<div class="empty">' + I('cart') + '<h3>Noch leer</h3><p>Auf einer Rezeptseite „Auf die Einkaufsliste“ tippen oder oben etwas eintragen.</p></div>') + '</div>' +
      '<div class="card-box" style="margin-top:16px"><h2 style="font-size:18px;display:flex;gap:8px;align-items:center;margin-bottom:8px">' + I('users2') + 'Gemeinsam einkaufen</h2>' +
      (CAP.shopLive ? '<p style="margin:0">Diese Liste ist live geteilt. Wer die App über deinen Claude-Link nutzt und als <b>Bearbeiter</b> eingeladen ist, sieht jede Änderung sofort und kann selbst Artikel eintragen und abhaken. Einladen: oben in Claude auf „Teilen“ tippen und die E-Mail-Adresse eintragen, Berechtigung „Bearbeiten“.</p>' :
        '<p style="margin:0 0 8px">Auf diesem Gerät ist die Liste lokal gespeichert. Für eine Liste, die zwei Personen live gemeinsam bearbeiten, die App über den Claude-Link öffnen und die andere Person per E-Mail als Bearbeiter einladen. Bis dahin: „Als Text teilen“ schickt die offene Liste per WhatsApp, Signal oder Nachricht.</p>') + '</div>';
  }

  /* ---------- Favoriten ---------- */
  function vFavs() {
    var list = S.favs.map(liteById).filter(Boolean);
    return '<div class="page-h"><h1>Favoriten</h1></div>' + (list.length ? '<div class="grid">' + list.map(card).join('') + '</div>' :
      '<div class="empty">' + I('heart') + '<h3>Noch keine Favoriten</h3><p>Tippe bei einem Rezept auf das Herz.</p></div>');
  }

  /* ---------- Meine Rezepte & Einstellungen ---------- */
  function vMine() {
    var own = all().filter(function (r) { return r.own; });
    return '<div class="page-h"><h1>Meine Rezepte</h1><a class="btn primary" href="#neu">' + I('plus') + 'Neues Rezept</a></div>' +
      (own.length ? '<div class="grid">' + own.map(card).join('') + '</div>' : '<div class="card-box empty">' + I('book') + '<h3>Noch keine eigenen Rezepte</h3><p>Lege dein erstes Rezept an. Animation, Temperatur, Stufe und Timer erkennt die App automatisch aus deinem Text.</p></div>') +
      '<section class="sec"><div class="sec-h"><h2>Meine Geräte</h2></div><div class="dev-grid">' + Object.keys(DEV).filter(function (d) { return d !== 'kalt'; }).map(function (d) { return devTile(d, S.devices.indexOf(d) >= 0, 'mydev'); }).join('') + '</div></section>' +
      '<section class="sec two-col"><div class="card-box"><h2 style="font-size:18px;margin-bottom:10px">Sichern & Übertragen</h2><p class="muted" style="font-size:14px;margin-top:0">Eigene Rezepte als Datei exportieren, um sie auf einem anderen Gerät zu importieren.</p>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-act="export">' + I('download', 'sm') + 'Exportieren</button><label class="btn" style="cursor:pointer">' + I('upload', 'sm') + 'Importieren<input type="file" accept="application/json,.json" data-change="import" hidden></label></div></div>' +
      '<div class="card-box"><h2 style="font-size:18px;margin-bottom:10px">Darstellung</h2><div class="chips">' +
      ['auto', 'light', 'dark'].map(function (t) { return '<button class="chip ' + (S.theme === t ? 'on' : '') + '" data-act="theme" data-v="' + t + '">' + { auto: 'Automatisch', light: 'Hell', dark: 'Dunkel' }[t] + '</button>'; }).join('') + '</div>' +
      '<p class="muted" style="font-size:13px;margin:14px 0 0">Favoriten, Notizen und eigene Rezepte bleiben in diesem Browser. Die Einkaufsliste und von Claude umgeschriebene Rezepte werden in der Claude-Version mit allen Eingeladenen geteilt.</p></div></section>' +
      '<section class="sec"><div class="card-box"><h2 style="font-size:18px;margin-bottom:8px">Quellen & Lizenzen</h2><p class="muted" style="font-size:14px;margin:0">' + (window.KA_WEB_INDEX || []).length.toLocaleString('de-DE') + ' Rezepte stammen aus dem deutschen Wikibooks-Kochbuch und dem englischen Wikibooks Cookbook (Autorinnen und Autoren von Wikibooks, Lizenz CC BY-SA 4.0). Jede Rezeptseite verlinkt das Original. Die übrigen Rezepte, Animationen und Anrichte-Pläne gehören zu dieser App.</p></div></section>';
  }

  /* ---------- Editor ---------- */
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
      '<a class="btn" href="#meine">Abbrechen</a><button class="btn primary" type="submit">' + I('check') + 'Speichern</button></div></form>';
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
    toast('Gespeichert'); location.hash = '#r-' + id;
  }

  /* ---------- Online-Suche (TheMealDB, live) ---------- */
  var API = 'https://www.themealdb.com/api/json/v1/1/';
  var AREAS = { American: 'USA', British: 'Großbritannien', Canadian: 'Kanada', Chinese: 'China', Croatian: 'Kroatien', Dutch: 'Niederlande', Egyptian: 'Ägypten', Filipino: 'Philippinen', French: 'Frankreich', Greek: 'Griechenland', Indian: 'Indien', Irish: 'Irland', Italian: 'Italien', Jamaican: 'Jamaika', Japanese: 'Japan', Kenyan: 'Kenia', Malaysian: 'Malaysia', Mexican: 'Mexiko', Moroccan: 'Marokko', Polish: 'Polen', Portuguese: 'Portugal', Russian: 'Russland', Spanish: 'Spanien', Thai: 'Thailand', Tunisian: 'Tunesien', Turkish: 'Türkei', Ukrainian: 'Ukraine', Vietnamese: 'Vietnam' };
  var online = { q: '', list: null, err: '', loading: false, area: '' };
  function api(path) { return fetch(API + path).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
  function vWorld() {
    return '<div class="page-h"><h1>Online-Suche</h1><button class="btn" data-act="wrandom">' + I('dice', 'sm') + 'Zufällig</button></div>' +
      '<p class="muted" style="margin-top:-8px">Zusätzlich zu den ' + liteAll().length.toLocaleString('de-DE') + ' Rezepten in der App: live in der freien Datenbank TheMealDB suchen (englische Texte, mit Fotos). Jedes Rezept kannst du in „Meine Rezepte“ übernehmen.</p>' +
      '<form class="searchbox" style="max-width:none;margin:14px 0" data-form="world">' + I('search') + '<input id="wq" type="search" value="' + esc(online.q) + '" placeholder="Englischer Suchbegriff, z. B. curry, cake, chicken …" autocomplete="off" aria-label="Online-Suche"></form>' +
      '<div class="filter-row" style="margin-bottom:16px">' + Object.keys(AREAS).map(function (a) { return '<button class="chip ' + (online.area === a ? 'on' : '') + '" data-act="warea" data-v="' + a + '">' + AREAS[a] + '</button>'; }).join('') + '</div><div id="wres">' + worldResults() + '</div>';
  }
  function worldResults() {
    if (online.loading) return '<div class="empty">' + I('globe') + '<h3>Lade …</h3></div>';
    if (online.err) return '<div class="empty">' + I('info') + '<h3>Keine Verbindung zur Datenbank</h3><p>' + esc(online.err) + '</p></div>';
    if (!online.list) return '<div class="info">Suchbegriff eingeben oder ein Land antippen.</div>';
    if (!online.list.length) return '<div class="empty">' + I('search') + '<h3>Keine Treffer</h3><p>Englische Begriffe funktionieren am besten.</p></div>';
    return '<div class="grid">' + online.list.map(function (m) {
      return '<a class="rcard" href="#welt-' + esc(m.idMeal) + '"><div class="rvis" style="--h:20"><img src="' + esc(m.strMealThumb) + '/preview" alt="" loading="lazy" class="web-img"></div><div class="rbody"><h3>' + esc(m.strMeal) + '</h3><div class="rmeta">' + esc(AREAS[m.strArea] || m.strArea || m.strCountry || online.areaLabel || '') + '</div></div></a>';
    }).join('') + '</div>';
  }
  function worldLoad(path, mapper) {
    online.loading = true; online.err = ''; var el = $('#wres'); if (el) el.innerHTML = worldResults();
    api(path).then(function (j) { online.list = mapper(j); }).catch(function () { online.err = 'Die Online-Suche braucht eine Internetverbindung, und themealdb.com muss erreichbar sein. In manchen Umgebungen ist der Zugriff blockiert.'; })
      .then(function () { online.loading = false; var el2 = $('#wres'); if (el2) el2.innerHTML = worldResults(); });
  }
  function mealToRecipe(m) {
    var ing = [];
    for (var i = 1; i <= 20; i++) { var n = (m['strIngredient' + i] || '').trim(); if (n) ing.push(((m['strMeasure' + i] || '').trim() + ' ' + n).trim()); }
    var txt = (m.strInstructions || '').replace(/\r/g, '').split(/\n+/).map(function (x) { return x.trim(); }).filter(function (x) { return x && !/^(step\s*)?\d+\.?$/i.test(x); });
    if (txt.length < 3) txt = (m.strInstructions || '').split(/(?<=[.!?])\s+(?=[A-Z])/).map(function (x) { return x.trim(); }).filter(Boolean);
    var steps = txt.map(function (x) { return autoStep(x, '', 'en'); });
    var dev = steps.some(function (s) { return s[0] === 'bake'; }) ? 'ofen' : 'herd';
    var catMap = { Dessert: 'dessert', Pasta: 'pasta', Seafood: 'fisch', Vegetarian: 'veggie', Vegan: 'veggie', Breakfast: 'fruehstueck', Starter: 'snacks', Side: 'beilagen', Beef: 'fleisch', Chicken: 'fleisch', Lamb: 'fleisch', Pork: 'fleisch', Goat: 'fleisch', Miscellaneous: 'welt' };
    var r = { id: 'web-' + m.idMeal, n: m.strMeal, desc: '', c: catMap[m.strCategory] || 'welt', k: AREAS[m.strArea] || m.strArea || m.strCountry || '', p: 4, d: 2, v: m.strCategory === 'Vegan' ? 2 : m.strCategory === 'Vegetarian' ? 1 : 0, ing: ing, m: {}, lang: 'en', src: 'TheMealDB (englischer Originaltext)' + (m.strSource ? ', ' + m.strSource : '') };
    r.m[dev] = { t: Math.max(20, steps.reduce(function (s, x) { return s + (x[2].t || 0); }, 0)), s: steps };
    return r;
  }
  function vWorldMeal(id) {
    var cached = online.meal && online.meal.id === 'web-' + id ? online.meal : null;
    if (!cached) {
      api('lookup.php?i=' + encodeURIComponent(id)).then(function (j) {
        if (!j.meals) throw new Error('nf');
        online.meal = mealToRecipe(j.meals[0]); online.mealImg = j.meals[0].strMealThumb; online.mealVid = j.meals[0].strYoutube;
        if (location.hash === '#welt-' + id) render();
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
  function route() {
    var h = (location.hash || '').replace(/^#\/?/, '');
    if (!h || h === 'start') return '/';
    var m = h.match(/^(r|bearbeiten|welt)[-\/](.+)$/);
    return m ? '/' + m[1] + '/' + m[2] : '/' + h;
  }
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('play', e.isIntersecting); }); }, { rootMargin: '60px' }) : null;
  function observeScenes() {
    $$('#view .scene').forEach(function (s) { if (s.classList.contains('force') && s.closest('.home-hero')) return; if (io) io.observe(s); else s.classList.add('play'); });
  }
  function navState(p) {
    var key = p === '/' ? 'home' : /^\/(entdecken|r\/|welt|anrichten)/.test(p) ? 'explore' : p.indexOf('/favoriten') === 0 ? 'favs' : p.indexOf('/einkauf') === 0 ? 'shop' : /^\/(meine|neu|bearbeiten)/.test(p) ? 'mine' : '';
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
    else if ((m = p.match(/^\/r\/(.+)$/))) { var rid = decodeURIComponent(m[1]); html = vRecipe(rid); var rr = byId(rid); if (rr) title = rr.n + ' · Kochatlas'; }
    else if (p === '/favoriten') html = vFavs();
    else if (p === '/einkauf') html = vShop();
    else if (p === '/meine') html = vMine();
    else if (p === '/anrichten') { html = vSchool(); title = 'Anrichte-Schule · Kochatlas'; }
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
  var hostTheme = document.documentElement.getAttribute('data-theme');
  function applyTheme() {
    var root = document.documentElement;
    if (S.theme === 'auto') { if (hostTheme) root.setAttribute('data-theme', hostTheme); else root.removeAttribute('data-theme'); } else root.setAttribute('data-theme', S.theme);
    var eff = S.theme === 'auto' ? hostTheme : S.theme;
    var dark = eff === 'dark' || (!eff && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    var b = $('#themebtn'); if (b) b.innerHTML = I(dark ? 'sun' : 'moon');
  }

  /* ---------- Aktionen ---------- */
  var plateTimer = null;
  function confirm2(el, label) {
    if (el.dataset.armed) { delete el.dataset.armed; return true; }
    el.dataset.armed = '1'; var old = el.innerHTML; el.innerHTML = label; el.classList.add('danger');
    setTimeout(function () { if (el.dataset.armed) { delete el.dataset.armed; el.innerHTML = old; } }, 3500);
    return false;
  }
  function shareText(title, text, url) {
    var copy = function () {
      var full = text + (url ? '\n' + url : '');
      try { navigator.clipboard.writeText(full).then(function () { toast('In die Zwischenablage kopiert. Jetzt im Messenger einfügen.'); }, function () { showCopy(full); }); } catch (e) { showCopy(full); }
    };
    if (navigator.share) navigator.share(url ? { title: title, text: text, url: url } : { title: title, text: text }).catch(function (e) { if (!e || e.name !== 'AbortError') copy(); });
    else copy();
  }
  function showCopy(txt) {
    var v = $('#view'), box = document.createElement('div');
    box.className = 'card-box'; box.style.margin = '14px 0';
    box.innerHTML = '<label for="copytxt" style="font-weight:700">Zum Kopieren markieren:</label><textarea class="input" id="copytxt" rows="8" readonly></textarea>';
    v.insertBefore(box, v.firstChild); var ta = $('#copytxt', box); ta.value = txt; ta.focus(); ta.select(); window.scrollTo(0, 0);
  }
  function plateGo(r, i, anim) {
    var st = ui.rec[r.id], n = r.plate.els.length;
    st.pi = Math.max(-1, Math.min(n - 1, i)); st.pa = anim ? st.pi : -1;
    var sec = $('#plate-sec');
    if (sec) { var tmp = document.createElement('div'); tmp.innerHTML = plateSection(r); sec.replaceWith(tmp.firstChild); }
  }
  var ACT = {
    fav: function (el) {
      var id = el.dataset.id, i = S.favs.indexOf(id);
      if (i >= 0) S.favs.splice(i, 1); else S.favs.unshift(id);
      save('favs'); $$('[data-act="fav"]').forEach(function (b) { if (b.dataset.id === id) b.classList.toggle('on', i < 0); });
      toast(i < 0 ? 'Zu Favoriten hinzugefügt' : 'Aus Favoriten entfernt');
      if (route() === '/favoriten') render(true); else navState(route());
    },
    mydev: function (el) {
      var d = el.dataset.dev, i = S.devices.indexOf(d);
      if (i >= 0) S.devices.splice(i, 1); else S.devices.push(d);
      save('devices'); render(true);
    },
    random: function () {
      var list = liteAll().filter(function (r) { return mineOK(r) && (!r.web || r.lang === 'de'); }); var r = list[Math.floor(Math.random() * list.length)];
      if (r) location.hash = '#r-' + r.id;
    },
    fclear: function () { ui.f = F0(); ui.limit = 60; if (route() !== '/entdecken') location.hash = '#entdecken'; },
    fcat: function (el) { ACT.fclear(); ui.f.cat = el.dataset.cat; if (route() === '/entdecken') render(); },
    ftime: function () { ACT.fclear(); ui.f.time = 30; if (route() === '/entdecken') render(); },
    fcuisine: function (el) { ACT.fclear(); ui.f.cuisine = el.dataset.k; if (route() === '/entdecken') render(); },
    fsrc: function (el) { ACT.fclear(); ui.f.src = el.dataset.v; if (route() === '/entdecken') render(); },
    fc: function (el) { ui.f.cat = el.dataset.v; ui.limit = 60; render(true); },
    fd: function (el) { ui.f.dev = el.dataset.v; ui.limit = 60; render(true); },
    fv: function (el) { ui.f.diet = el.dataset.v; ui.limit = 60; render(true); },
    ft: function (el) { ui.f.time = +el.dataset.v; ui.limit = 60; render(true); },
    fs2: function (el) { ui.f.src = el.dataset.v; ui.limit = 60; render(true); },
    more: function () { ui.limit += 60; renderResults(); },
    back: function () { if (history.length > 1) history.back(); else location.hash = '#start'; },
    tab: function (el) { var r = curRecipe(); if (!r) return; ui.rec[r.id].dev = el.dataset.dev; render(true); },
    por: function (el) { var r = curRecipe(); if (!r) return; var st = ui.rec[r.id]; st.p = Math.max(1, Math.min(60, st.p + (+el.dataset.d))); render(true); },
    ing: function (el) { var r = curRecipe(); if (!r) return; var st = ui.rec[r.id], i = el.dataset.i; st.done[i] = !st.done[i]; el.classList.toggle('done', !!st.done[i]); },
    toshop: function () {
      var r = curRecipe(); if (!r) return; var st = ui.rec[r.id], f = st.p / (r.p || 4), n = 0, jobs = Promise.resolve();
      (r.ing || []).forEach(function (s, i) { if (s[0] === '#' || st.done[i]) return; var x = splitIng(s, f); var t = (x.q ? x.q + ' ' : '') + x.t; jobs = jobs.then(function () { return shopAdd(t, r.n); }); n++; });
      jobs.then(function () { navState(route()); });
      toast(n + ' Zutaten auf der Einkaufsliste');
    },
    cook: function () { var r = curRecipe(); if (r) openCook(r); },
    cookclose: closeCook,
    cookplate: function () { closeCook(); setTimeout(function () { var s = $('#plate-sec'); if (s) s.scrollIntoView({ behavior: 'smooth' }); }, 60); },
    cooknext: function () { cookGo(1); },
    cookprev: function () { cookGo(-1); },
    cookings: function () { if (ui.cook) { ui.cook.ings = !ui.cook.ings; renderCook(); } },
    timer: function (el) { startTimer(+el.dataset.sec, el.dataset.label); },
    tstop: function (el) { timers = timers.filter(function (t) { return String(t.id) !== el.dataset.id; }); renderTimers(); },
    force: function (el) { var s = $('.scene', el); if (s) s.classList.toggle('force'); },
    pnext: function () { var r = curRecipe(); if (r) plateGo(r, ui.rec[r.id].pi + 1, true); },
    pprev: function () { var r = curRecipe(); if (r) plateGo(r, ui.rec[r.id].pi - 1, false); },
    pgo: function (el) { var r = curRecipe(); if (r) plateGo(r, +el.dataset.i, true); },
    preset: function () { var r = curRecipe(); if (r) plateGo(r, -1, false); },
    pplay: function () {
      var r = curRecipe(); if (!r) return; clearInterval(plateTimer); plateGo(r, -1, false);
      plateTimer = setInterval(function () { var st = ui.rec[r.id]; if (!$('#plate-sec') || st.pi >= r.plate.els.length - 1) { clearInterval(plateTimer); return; } plateGo(r, st.pi + 1, true); }, 1600);
    },
    school: function (el) {
      var s = SCHOOL[+el.dataset.i], k = 0, n = s.plan.els.length;
      var step = function () { el.innerHTML = PLATE.svg(s.plan, k, k, false); k++; if (k < n) setTimeout(step, 700); };
      el.innerHTML = PLATE.svg(s.plan, -1, -1, false); setTimeout(step, 250);
    },
    airun: function () { var id = decodeURIComponent(route().slice(3)), b = byId(id), sel = $('#aidev'); if (b && sel) runAi(b, sel.value); },
    aistop: function () { if (aiRun) aiRun.ctl.abort(); },
    share: function () {
      var r = curRecipe();
      if (!r) return;
      var st = ui.rec[r.id] || { p: r.p }, f = st.p / (r.p || 4), dev = st.dev || r.devs[0];
      var txt = r.n + '\n\nZutaten (' + st.p + ' Portionen):\n' + (r.ing || []).map(function (x) { if (x[0] === '#') return '\n' + x.slice(1) + ':'; var y = splitIng(x, f); return '- ' + (y.q ? y.q + ' ' : '') + y.t; }).join('\n') +
        '\n\nZubereitung (' + DEV[dev].n + '):\n' + stepsFor(r, dev).map(function (s, i) { return (i + 1) + '. ' + s.t; }).join('\n');
      shareText(r.n, txt, IN_CLAUDE ? '' : location.href);
    },
    shoptoggle: function (el) { var x = S.shop[+el.dataset.i]; if (x) shopUpdate(x, { done: !x.done }).then(function () { if (!CAP.shopLive) render(true); }); },
    shopdel: function (el) { var x = S.shop[+el.dataset.i]; if (x) shopDelete(x).then(function () { if (!CAP.shopLive) render(true); }); },
    shopclean: function () { var done = S.shop.filter(function (x) { return x.done; }); Promise.all(done.map(shopDelete)).then(function () { if (!CAP.shopLive) render(true); }); },
    shopclear: function (el) {
      if (S.shop.length && !confirm2(el, CAP.shopLive ? 'Wirklich für alle löschen?' : 'Wirklich alles löschen?')) return;
      Promise.all(S.shop.slice().map(shopDelete)).then(function () { if (!CAP.shopLive) render(true); });
    },
    shopshare: function () {
      var txt = 'Einkaufsliste\n' + S.shop.filter(function (x) { return !x.done; }).map(function (x) { return '- ' + x.t; }).join('\n');
      shareText('Einkaufsliste', txt, '');
    },
    theme: function (el) { S.theme = el.dataset.v || ({ auto: 'dark', dark: 'light', light: 'auto' })[S.theme]; save('theme'); applyTheme(); if (route() === '/meine') render(true); toast('Darstellung: ' + { auto: 'Automatisch', light: 'Hell', dark: 'Dunkel' }[S.theme]); },
    owndel: function (el) {
      if (!confirm2(el, 'Wirklich löschen? Nochmal tippen')) return;
      S.own = S.own.filter(function (x) { return x.id !== el.dataset.id; }); save('own'); resetAll(); location.hash = '#meine';
    },
    export: function () {
      var data = JSON.stringify({ app: 'kochatlas', v: 1, recipes: S.own }, null, 2);
      if (IN_CLAUDE) {
        useCap('downloads').then(function (d) {
          if (d) d.save({ filename: 'kochatlas-rezepte.json', data: data }).then(function () { toast('Gespeichert'); }, function () {});
          else showCopy(data);
        });
        return;
      }
      var blob = new Blob([data], { type: 'application/json' });
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
      S.own.push(r); save('own'); resetAll(); toast('In Meine Rezepte übernommen'); location.hash = '#r-' + r.id;
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
    if (e.target.id === 'q') { ui.f.q = e.target.value; ui.limit = 60; clearTimeout(qT); qT = setTimeout(renderResults, 160); }
    if (e.target.id === 'note') { S.notes[e.target.dataset.id] = e.target.value; save('notes'); }
  });
  document.addEventListener('change', function (e) {
    var k = e.target.dataset.change; if (!k) return;
    if (k === 'fk') { ui.f.cuisine = e.target.value; ui.limit = 60; renderResults(); }
    if (k === 'fs') { ui.f.sort = e.target.value; renderResults(); }
    if (k === 'fm') { S.onlyMine = e.target.checked; save('onlyMine'); ui.limit = 60; renderResults(); }
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
    if (f === 'search') { var q = $('#homeq').value; ui.f = F0(); ui.limit = 60; ui.f.q = q; if (route() === '/entdecken') render(); else location.hash = '#entdecken'; }
    if (f === 'shopadd') { var v = $('#shopnew').value.trim(); if (v) { $('#shopnew').value = ''; shopAdd(v, '').then(function () { if (!CAP.shopLive) render(true); var n = $('#shopnew'); if (n) n.focus(); }); } }
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
  window.addEventListener('hashchange', function () { if (ui.cook) closeCook(); clearInterval(plateTimer); render(); });
  if (window.matchMedia) { try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch (e) {} }

  /* ---------- Start ---------- */
  function init() {
    S.shop.forEach(function (x) { if (!x.id) x.id = uid(); });
    $('#nav').innerHTML = [['home', '#start', 'home', 'Start'], ['explore', '#entdecken', 'compass', 'Entdecken'], ['favs', '#favoriten', 'heart', 'Favoriten'], ['shop', '#einkauf', 'cart', 'Einkauf'], ['mine', '#meine', 'book', 'Meine']]
      .map(function (n) { return '<a href="' + n[1] + '" data-nav="' + n[0] + '">' + I(n[2]) + '<span>' + n[3] + '</span>' + (n[0] === 'shop' || n[0] === 'favs' ? '<span class="count" style="display:none"></span>' : '') + '</a>'; }).join('');
    $('#logo').innerHTML = '<span class="logo-mark">' + I('chef') + '</span>Kochatlas';
    $('#searchbtn').innerHTML = I('search');
    applyTheme(); render();
    initCaps();
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && window.self === window.top && !window.claude) {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  }
  window.KA = { all: all, liteAll: liteAll, byId: byId, stepsFor: stepsFor, splitIng: splitIng, loadChunk: loadChunk, cleanAi: cleanAi, aiPrompt: aiPrompt, viewOf: viewOf, S: S };
  init();
})();
