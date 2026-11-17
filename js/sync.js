/* Kochatlas – Familien-Synchronisierung der Einkaufsliste.
   Backends:
     server    eigener Kochatlas-Server (server/server.js): REST + Server-Sent Events
     firebase  Google Firebase Firestore (kostenloser Tarif reicht), Konfiguration in config.js
     local     ohne Familie: Liste bleibt auf dem Gerät
   Ohne Verbindung werden Änderungen in einer Warteschlange gespeichert und später gesendet (Server-Modus);
   Firebase bringt seine eigene Offline-Speicherung mit. */
(function () {
  'use strict';
  var CFG = window.KOCHATLAS_CONFIG || { sync: 'auto', server: '', firebase: null };
  var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  var FB_VER = '10.12.2';
  var get = function (k, d) { try { var v = localStorage.getItem('ka_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  var put = function (k, v) { try { localStorage.setItem('ka_' + k, JSON.stringify(v)); } catch (e) {} };
  var rid = function (n) { var a = new Uint8Array(n || 8), s = ''; (window.crypto || window.msCrypto).getRandomValues(a); for (var i = 0; i < a.length; i++) s += ('0' + a[i].toString(16)).slice(-2); return s; };
  var famId = function () { var a = new Uint8Array(16), s = ''; crypto.getRandomValues(a); for (var i = 0; i < 16; i++) s += ALPHA[a[i] & 31]; return s; };

  var st = {
    mode: 'local',            // local | server | firebase
    status: 'off',            // off | connecting | live | offline | error
    error: '',
    family: get('family', null),   // { id, name, backend }
    me: get('me', null) || { id: rid(6), name: '' },
    members: [],
    items: [],
    backends: { server: false, firebase: !!(CFG.firebase && CFG.firebase.projectId) },
    checked: false
  };
  if (!get('me', null)) put('me', st.me);
  var listeners = [];
  function emit() { listeners.forEach(function (f) { try { f(st); } catch (e) { console.error(e); } }); }
  var base = function () { return String(CFG.server || '').replace(/\/+$/, ''); };

  /* ---------- lokal ---------- */
  function localItems() {
    var l = get('shop', []);
    l.forEach(function (x) { if (!x.id) x.id = rid(6); if (!x.ts) x.ts = Date.now(); });
    return l;
  }
  function saveLocal() { put('shop', st.items); }

  /* ---------- Erreichbarkeit ---------- */
  function checkServer() {
    if (CFG.sync === 'off' || CFG.sync === 'firebase') return Promise.resolve(false);
    if (!/^https?:$/.test(location.protocol) && !base()) return Promise.resolve(false);
    var ctl = window.AbortController ? new AbortController() : null;
    var t = setTimeout(function () { if (ctl) ctl.abort(); }, 3500);
    return fetch(base() + '/api/health', { signal: ctl ? ctl.signal : undefined, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { return !!(j && j.app === 'kochatlas'); })
      .catch(function () { return false; }).then(function (ok) { clearTimeout(t); return ok; });
  }
  function pickBackend() {
    if (CFG.sync === 'off') return null;
    if (CFG.sync === 'firebase') return st.backends.firebase ? 'firebase' : null;
    if (CFG.sync === 'server') return 'server';
    if (st.backends.firebase) return 'firebase';
    return st.backends.server ? 'server' : null;
  }

  /* ---------- Server-Backend ---------- */
  var es = null, queue = get('queue', []), flushing = false;
  function api(method, path, body) {
    return fetch(base() + '/api/households/' + st.family.id + path, {
      method: method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined, cache: 'no-store'
    }).then(function (r) {
      if (r.status === 204) return null;
      return r.json().then(function (j) { if (!r.ok) { var e = new Error(j && j.error || ('HTTP ' + r.status)); e.status = r.status; throw e; } return j; });
    });
  }
  function serverConnect() {
    serverClose();
    st.status = 'connecting'; emit();
    es = new EventSource(base() + '/api/households/' + st.family.id + '/events');
    es.addEventListener('state', function (ev) {
      var s = JSON.parse(ev.data);
      st.items = s.items || []; st.members = s.members || []; st.family.name = s.name; put('family', st.family);
      put('famcache', { id: st.family.id, items: st.items, members: st.members });
      st.status = 'live'; st.error = '';
      applyQueueOptimistic();
      emit();
      flush();
    });
    es.onerror = function () {
      if (st.status !== 'error') { st.status = 'offline'; emit(); }
      if (es && es.readyState === 2) setTimeout(function () { if (st.mode === 'server' && st.family) serverConnect(); }, 5000);
    };
  }
  function serverClose() { if (es) { es.close(); es = null; } }
  function enqueue(op) { queue.push(op); put('queue', queue); applyOp(op); emit(); flush(); }
  function applyOp(op) {
    if (op.k === 'add') op.items.forEach(function (x) { if (!st.items.some(function (i) { return i.id === x.id; })) st.items.push(Object.assign({ done: false, ts: Date.now(), pending: true }, x)); });
    if (op.k === 'patch') st.items.forEach(function (i) { if (i.id === op.id) Object.assign(i, op.p); });
    if (op.k === 'del') st.items = st.items.filter(function (i) { return i.id !== op.id; });
    if (op.k === 'clear') st.items = op.all ? [] : st.items.filter(function (i) { return !i.done; });
  }
  function applyQueueOptimistic() { queue.forEach(applyOp); }
  function flush() {
    if (flushing || !queue.length || st.mode !== 'server' || !st.family) return;
    flushing = true;
    var op = queue[0];
    var call = op.k === 'add' ? api('POST', '/items', { items: op.items }) :
      op.k === 'patch' ? api('PATCH', '/items/' + op.id, op.p) :
      op.k === 'del' ? api('DELETE', '/items/' + op.id) :
      api('POST', '/clear', { all: !!op.all });
    call.then(function () { queue.shift(); put('queue', queue); flushing = false; flush(); })
      .catch(function (e) {
        flushing = false;
        if (e.status && e.status >= 400 && e.status < 500) {          // vom Server abgelehnt: verwerfen
          queue.shift(); put('queue', queue); st.error = e.message; emit(); flush();
        } else { st.status = 'offline'; emit(); setTimeout(flush, 8000); }
      });
  }
  window.addEventListener('online', function () { if (st.mode === 'server') { if (!es || es.readyState === 2) serverConnect(); flush(); } });

  /* ---------- Firebase-Backend ---------- */
  var fb = null, fbUnsubs = [];
  function loadScript(src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = function () { rej(new Error('Firebase konnte nicht geladen werden')); }; document.head.appendChild(s); }); }
  function fbInit() {
    if (fb) return Promise.resolve(fb);
    return loadScript('https://www.gstatic.com/firebasejs/' + FB_VER + '/firebase-app-compat.js')
      .then(function () { return loadScript('https://www.gstatic.com/firebasejs/' + FB_VER + '/firebase-firestore-compat.js'); })
      .then(function () {
        var app = window.firebase.apps.length ? window.firebase.app() : window.firebase.initializeApp(CFG.firebase);
        var db = app.firestore();
        try { db.enablePersistence({ synchronizeTabs: true }).catch(function () {}); } catch (e) {}
        fb = db; return db;
      });
  }
  function fbClose() { fbUnsubs.forEach(function (u) { try { u(); } catch (e) {} }); fbUnsubs = []; }
  function fbConnect() {
    fbClose();
    st.status = 'connecting'; emit();
    fbInit().then(function (db) {
      var h = db.collection('households').doc(st.family.id);
      fbUnsubs.push(h.onSnapshot(function (d) { if (d.exists) { st.family.name = d.data().name; put('family', st.family); emit(); } }, fbErr));
      fbUnsubs.push(h.collection('items').onSnapshot({ includeMetadataChanges: true }, function (snap) {
        st.items = snap.docs.map(function (d) { var x = d.data(); return { id: d.id, t: x.t, from: x.from || '', by: x.by || '', done: !!x.done, doneBy: x.doneBy || '', ts: x.ts || 0, pending: d.metadata.hasPendingWrites }; })
          .sort(function (a, b) { return a.ts - b.ts; });
        st.status = snap.metadata.fromCache ? 'offline' : 'live'; st.error = '';
        put('famcache', { id: st.family.id, items: st.items, members: st.members });
        emit();
      }, fbErr));
      fbUnsubs.push(h.collection('members').onSnapshot(function (snap) {
        st.members = snap.docs.map(function (d) { return { id: d.id, name: d.data().name, seen: d.data().seen }; }); emit();
      }, fbErr));
    }).catch(fbErr);
  }
  function fbErr(e) { st.status = 'error'; st.error = (e && e.message) || 'Firebase-Fehler'; emit(); }
  function fbItems() { return fb.collection('households').doc(st.family.id).collection('items'); }

  /* ---------- Verbinden ---------- */
  function connect() {
    serverClose(); fbClose();
    if (!st.family) { st.mode = 'local'; st.status = 'off'; st.items = localItems(); st.members = []; emit(); return; }
    st.mode = st.family.backend;
    var c = get('famcache', null);
    if (c && c.id === st.family.id) { st.items = c.items || []; st.members = c.members || []; }
    if (st.mode === 'server') { applyQueueOptimistic(); serverConnect(); }
    else if (st.mode === 'firebase') fbConnect();
  }
  function registerMember() {
    if (!st.family || !st.me.name) return Promise.resolve();
    if (st.family.backend === 'server') return api('POST', '/members', { id: st.me.id, name: st.me.name }).catch(function () {});
    return fbInit().then(function (db) { return db.collection('households').doc(st.family.id).collection('members').doc(st.me.id).set({ name: st.me.name, seen: Date.now() }); }).catch(function () {});
  }

  /* ---------- öffentliche Schnittstelle ---------- */
  var SYNC = {
    state: function () { return st; },
    on: function (f) { listeners.push(f); },
    init: function () {
      st.items = st.family ? [] : localItems();
      connect();
      return checkServer().then(function (ok) { st.backends.server = ok; st.checked = true; emit(); return st.backends; });
    },
    canShare: function () { return !!pickBackend(); },
    backendName: function () { var b = st.family ? st.family.backend : pickBackend(); return b === 'firebase' ? 'Firebase' : b === 'server' ? 'Kochatlas-Server' : ''; },
    normCode: function (s) { return String(s || '').toUpperCase().replace(/0/g, 'O').replace(/1/g, 'I').replace(/8/g, 'B').replace(/[^A-Z2-7]/g, ''); },
    fmtCode: function (id) { return (id || '').replace(/(.{4})(?=.)/g, '$1-'); },
    inviteLink: function () { return st.family ? location.origin + location.pathname + '#join-' + st.family.id : ''; },
    setMyName: function (name) { st.me.name = String(name || '').trim().slice(0, 40); put('me', st.me); registerMember(); emit(); },
    create: function (famName, myName) {
      var b = pickBackend(); if (!b) return Promise.reject(new Error('Keine Synchronisierung eingerichtet'));
      if (myName) { st.me.name = myName.trim().slice(0, 40); put('me', st.me); }
      var local = localItems().filter(function (x) { return !x.done; });
      var done = function (id, name) {
        st.family = { id: id, name: name, backend: b }; put('family', st.family); put('queue', []); queue = [];
        connect();
        if (local.length) { SYNC.add(local.map(function (x) { return { t: x.t, from: x.from }; })); put('shop', []); }
        return st.family;
      };
      if (b === 'server') {
        return fetch(base() + '/api/households', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: famName, member: st.me.name, memberId: st.me.id }) })
          .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.error || 'Fehler'); return j; }); })
          .then(function (j) { return done(j.id, j.name); });
      }
      var id = famId(), name = String(famName || '').trim().slice(0, 60) || 'Unsere Familie';
      return fbInit().then(function (db) {
        var h = db.collection('households').doc(id);
        return h.set({ name: name, created: Date.now() }).then(function () { return h.collection('members').doc(st.me.id).set({ name: st.me.name, seen: Date.now() }); });
      }).then(function () { return done(id, name); });
    },
    join: function (code, myName) {
      var b = pickBackend(); if (!b) return Promise.reject(new Error('Keine Synchronisierung eingerichtet'));
      var id = SYNC.normCode(code);
      if (id.length !== 16) return Promise.reject(new Error('Der Code hat 16 Zeichen, z. B. ABCD-EFGH-IJKL-MNOP.'));
      if (myName) { st.me.name = myName.trim().slice(0, 40); put('me', st.me); }
      var ok = function (name) { st.family = { id: id, name: name, backend: b }; put('family', st.family); put('queue', []); queue = []; connect(); registerMember(); return st.family; };
      if (b === 'server') {
        return fetch(base() + '/api/households/' + id, { cache: 'no-store' }).then(function (r) {
          if (r.status === 404) throw new Error('Diese Familie gibt es nicht. Code prüfen.');
          if (!r.ok) throw new Error('Server nicht erreichbar.');
          return r.json();
        }).then(function (j) { return ok(j.name); });
      }
      return fbInit().then(function (db) { return db.collection('households').doc(id).get(); }).then(function (d) {
        if (!d.exists) throw new Error('Diese Familie gibt es nicht. Code prüfen.');
        return ok(d.data().name);
      });
    },
    leave: function () {
      if (st.family && st.family.backend === 'server') api('DELETE', '/members/' + st.me.id).catch(function () {});
      if (st.family && st.family.backend === 'firebase' && fb) fb.collection('households').doc(st.family.id).collection('members').doc(st.me.id).delete().catch(function () {});
      st.family = null; put('family', null); put('famcache', null); put('queue', []); queue = [];
      connect();
    },
    rename: function (name) {
      name = String(name || '').trim().slice(0, 60); if (!name || !st.family) return;
      st.family.name = name; put('family', st.family); emit();
      if (st.family.backend === 'server') api('PATCH', '', { name: name }).catch(function () {});
      else fbInit().then(function (db) { db.collection('households').doc(st.family.id).update({ name: name }); });
    },
    add: function (list) {
      var items = list.map(function (x) { return { id: rid(6), t: String(x.t).slice(0, 200), from: String(x.from || '').slice(0, 120), by: st.me.name || '' }; });
      if (st.mode === 'local') { items.forEach(function (x) { x.done = false; x.ts = Date.now(); st.items.push(x); }); saveLocal(); emit(); return; }
      if (st.mode === 'server') return enqueue({ k: 'add', items: items });
      var batch = fb.batch(), now = Date.now();
      items.forEach(function (x, i) { batch.set(fbItems().doc(x.id), { t: x.t, from: x.from, by: x.by, done: false, ts: now + i }); });
      batch.commit().catch(fbErr);
    },
    toggle: function (item) {
      var p = { done: !item.done, doneBy: !item.done ? (st.me.name || '') : '' };
      if (st.mode === 'local') { Object.assign(item, p); saveLocal(); emit(); return; }
      if (st.mode === 'server') return enqueue({ k: 'patch', id: item.id, p: p });
      fbItems().doc(item.id).update(p).catch(fbErr);
    },
    remove: function (item) {
      if (st.mode === 'local') { st.items = st.items.filter(function (x) { return x !== item; }); saveLocal(); emit(); return; }
      if (st.mode === 'server') return enqueue({ k: 'del', id: item.id });
      fbItems().doc(item.id).delete().catch(fbErr);
    },
    clear: function (all) {
      if (st.mode === 'local') { st.items = all ? [] : st.items.filter(function (x) { return !x.done; }); saveLocal(); emit(); return; }
      if (st.mode === 'server') return enqueue({ k: 'clear', all: !!all });
      var batch = fb.batch();
      st.items.forEach(function (x) { if (all || x.done) batch.delete(fbItems().doc(x.id)); });
      batch.commit().catch(fbErr);
    }
  };
  window.SYNC = SYNC;
})();
