#!/usr/bin/env node
/* Kochatlas-Server
   - liefert die Web-App aus (statische Dateien aus dem Projektordner)
   - verwaltet Familien (Haushalte) mit gemeinsamer Einkaufsliste
   - schickt Änderungen live an alle Geräte einer Familie (Server-Sent Events)
   Keine Fremdpakete, nur Node.js ab Version 18.

   Umgebungsvariablen:
     PORT         Port (Standard 8080)
     HOST         Adresse (Standard 0.0.0.0)
     DATA_DIR     Ordner für die Familiendaten (Standard ./server-data)
     CORS_ORIGIN  erlaubte Herkunft, wenn die App woanders liegt als der Server (Standard *)
     STATIC_DIR   Ordner der Web-App (Standard: Projektordner)
*/
'use strict';
const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');

const PORT = +process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = path.resolve(process.env.STATIC_DIR || path.join(__dirname, '..'));
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(ROOT, 'server-data'));
const CORS = process.env.CORS_ORIGIN || '*';

const LIMITS = { items: 400, members: 30, text: 200, name: 40, family: 60, body: 16 * 1024 };
const ID_RE = /^[A-Z2-7]{16}$/;
const ITEM_RE = /^[a-z0-9]{6,24}$/;
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

fs.mkdirSync(DATA_DIR, { recursive: true });

/* ---------- Speicher ---------- */
const cache = new Map();       // id -> Haushalt
const pending = new Map();     // id -> Timer fürs Speichern
const clients = new Map();     // id -> Set(Antwort-Streams)

function newId() {
  const b = crypto.randomBytes(16);
  let s = '';
  for (let i = 0; i < 16; i++) s += ALPHA[b[i] & 31];
  return s;
}
function newItemId() { return crypto.randomBytes(8).toString('hex'); }
const file = (id) => path.join(DATA_DIR, id + '.json');

async function load(id) {
  if (cache.has(id)) return cache.get(id);
  try {
    const h = JSON.parse(await fsp.readFile(file(id), 'utf8'));
    cache.set(id, h);
    return h;
  } catch (e) { return null; }
}
function persist(id) {
  clearTimeout(pending.get(id));
  pending.set(id, setTimeout(async () => {
    pending.delete(id);
    const h = cache.get(id); if (!h) return;
    const tmp = file(id) + '.' + process.pid + '.tmp';
    try { await fsp.writeFile(tmp, JSON.stringify(h)); await fsp.rename(tmp, file(id)); }
    catch (e) { console.error('Speichern fehlgeschlagen', id, e.message); }
  }, 250));
}
function publicState(h) {
  return { id: h.id, name: h.name, rev: h.rev, members: h.members.map(m => ({ id: m.id, name: m.name, seen: m.seen })), items: h.items };
}
function changed(h) {
  h.rev++; h.updated = Date.now();
  persist(h.id);
  const msg = 'event: state\ndata: ' + JSON.stringify(publicState(h)) + '\n\n';
  for (const res of clients.get(h.id) || []) { try { res.write(msg); } catch (e) { /* Verbindung zu */ } }
}

/* ---------- Hilfen ---------- */
const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
function send(res, code, obj, extra) {
  const body = obj === undefined ? '' : JSON.stringify(obj);
  res.writeHead(code, Object.assign({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, extra || {}));
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0, tooBig = false; const chunks = [];
    req.on('data', c => { size += c.length; if (size > LIMITS.body) { tooBig = true; chunks.length = 0; } else if (!tooBig) chunks.push(c); });
    req.on('end', () => { if (tooBig) return reject(Object.assign(new Error('Anfrage zu groß'), { code: 413 })); try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); } catch (e) { reject(Object.assign(new Error('kein JSON'), { code: 400 })); } });
    req.on('error', reject);
  });
}
/* einfache Begrenzung: 240 Anfragen pro Minute und IP */
const hits = new Map();
function limited(ip) {
  const now = Date.now(), w = hits.get(ip) || { n: 0, t: now };
  if (now - w.t > 60000) { w.n = 0; w.t = now; }
  w.n++; hits.set(ip, w);
  return w.n > 240;
}
setInterval(() => { const now = Date.now(); for (const [k, v] of hits) if (now - v.t > 120000) hits.delete(k); }, 60000).unref();

/* ---------- API ---------- */
async function api(req, res, parts) {
  // parts: ['api', 'households', id?, sub?, itemId?]
  if (parts[1] === 'health') return send(res, 200, { ok: true, app: 'kochatlas', version: 1 });
  if (parts[1] !== 'households') return send(res, 404, { error: 'unbekannt' });
  const id = parts[2] ? parts[2].toUpperCase() : '';

  // Familie anlegen
  if (!id) {
    if (req.method !== 'POST') return send(res, 405, { error: 'nur POST' });
    const b = await readBody(req);
    let nid; do { nid = newId(); } while (fs.existsSync(file(nid)) || cache.has(nid));
    const h = { id: nid, name: clean(b.name, LIMITS.family) || 'Unsere Familie', created: Date.now(), updated: Date.now(), rev: 1, members: [], items: [] };
    const mname = clean(b.member, LIMITS.name);
    const mid = ITEM_RE.test(b.memberId || '') ? b.memberId : newItemId();
    if (mname) h.members.push({ id: mid, name: mname, seen: Date.now() });
    cache.set(nid, h); persist(nid);
    return send(res, 201, publicState(h));
  }
  if (!ID_RE.test(id)) return send(res, 400, { error: 'Code ungültig' });
  const h = await load(id);
  if (!h) return send(res, 404, { error: 'Familie nicht gefunden' });
  const sub = parts[3] || '';

  // Live-Verbindung
  if (sub === 'events' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-store', 'Connection': 'keep-alive', 'X-Accel-Buffering': 'no' });
    res.write('retry: 3000\n\n');
    res.write('event: state\ndata: ' + JSON.stringify(publicState(h)) + '\n\n');
    if (!clients.has(id)) clients.set(id, new Set());
    const set = clients.get(id); set.add(res);
    const ping = setInterval(() => { try { res.write(': ping\n\n'); } catch (e) {} }, 25000);
    req.on('close', () => { clearInterval(ping); set.delete(res); if (!set.size) clients.delete(id); });
    return;
  }
  if (!sub && req.method === 'GET') return send(res, 200, publicState(h));
  if (!sub && req.method === 'PATCH') {
    const b = await readBody(req);
    const name = clean(b.name, LIMITS.family); if (name) { h.name = name; changed(h); }
    return send(res, 200, publicState(h));
  }
  if (sub === 'members' && req.method === 'POST') {
    const b = await readBody(req);
    const name = clean(b.name, LIMITS.name); if (!name) return send(res, 400, { error: 'Name fehlt' });
    const mid = ITEM_RE.test(b.id || '') ? b.id : newItemId();
    const m = h.members.find(x => x.id === mid);
    if (m) { m.name = name; m.seen = Date.now(); }
    else { if (h.members.length >= LIMITS.members) return send(res, 409, { error: 'Zu viele Mitglieder' }); h.members.push({ id: mid, name, seen: Date.now() }); }
    changed(h);
    return send(res, 200, { id: mid });
  }
  if (sub === 'members' && req.method === 'DELETE' && ITEM_RE.test(parts[4] || '')) {
    h.members = h.members.filter(x => x.id !== parts[4]); changed(h);
    return send(res, 204);
  }
  if (sub === 'items' && req.method === 'POST' && !parts[4]) {
    const b = await readBody(req);
    const list = Array.isArray(b.items) ? b.items : [b];
    if (h.items.length + list.length > LIMITS.items) return send(res, 409, { error: 'Liste ist voll (' + LIMITS.items + ' Einträge). Erledigte entfernen.' });
    const added = [];
    for (const x of list) {
      const t = clean(x.t, LIMITS.text); if (!t) continue;
      const iid = ITEM_RE.test(x.id || '') && !h.items.some(i => i.id === x.id) ? x.id : newItemId();
      const it = { id: iid, t, from: clean(x.from, 120), by: clean(x.by, LIMITS.name), done: !!x.done, ts: Date.now() };
      h.items.push(it); added.push(it);
    }
    if (added.length) changed(h);
    return send(res, 201, { items: added });
  }
  if (sub === 'items' && parts[4]) {
    const it = h.items.find(x => x.id === parts[4]);
    if (req.method === 'DELETE') { if (it) { h.items = h.items.filter(x => x !== it); changed(h); } return send(res, 204); }
    if (req.method === 'PATCH') {
      if (!it) return send(res, 404, { error: 'Eintrag nicht gefunden' });
      const b = await readBody(req);
      if (typeof b.done === 'boolean') it.done = b.done;
      if (b.t != null) { const t = clean(b.t, LIMITS.text); if (t) it.t = t; }
      if (b.doneBy != null) it.doneBy = clean(b.doneBy, LIMITS.name);
      changed(h);
      return send(res, 200, it);
    }
  }
  if (sub === 'clear' && req.method === 'POST') {
    const b = await readBody(req);
    const before = h.items.length;
    h.items = b.all ? [] : h.items.filter(x => !x.done);
    if (h.items.length !== before) changed(h);
    return send(res, 200, { removed: before - h.items.length });
  }
  return send(res, 405, { error: 'nicht erlaubt' });
}

/* ---------- Statische Dateien ---------- */
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8' };
const BLOCK = /^(server|server-data|tools|node_modules|\.git)(\/|$)|(^|\/)\./;
async function serveStatic(req, res, urlPath) {
  let rel = decodeURIComponent(urlPath).replace(/^\/+/, '');
  if (!rel) rel = 'index.html';
  if (BLOCK.test(rel)) return send(res, 404, { error: 'nicht gefunden' });
  const abs = path.join(ROOT, rel);
  if (!abs.startsWith(ROOT + path.sep)) return send(res, 403, { error: 'verboten' });
  try {
    const st = await fsp.stat(abs);
    if (!st.isFile()) throw new Error('kein File');
    const ext = path.extname(abs).toLowerCase();
    const etag = '"' + st.size.toString(36) + '-' + st.mtimeMs.toString(36) + '"';
    if (req.headers['if-none-match'] === etag) { res.writeHead(304); return res.end(); }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream', 'Content-Length': st.size, 'ETag': etag,
      'Cache-Control': rel === 'index.html' || rel === 'sw.js' || rel === 'config.js' ? 'no-cache' : 'public, max-age=3600'
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(abs).pipe(res);
  } catch (e) { send(res, 404, { error: 'nicht gefunden' }); }
}

/* ---------- Server ---------- */
const server = http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  const url = new URL(req.url, 'http://x');
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] === 'api') {
    res.setHeader('Access-Control-Allow-Origin', CORS);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress;
    if (limited(ip)) return send(res, 429, { error: 'Zu viele Anfragen, bitte kurz warten.' });
    try { await api(req, res, parts); }
    catch (e) { if (!res.headersSent) send(res, e.code >= 400 && e.code < 500 ? e.code : 500, { error: e.message || 'Fehler' }); }
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, { error: 'nicht erlaubt' });
  serveStatic(req, res, url.pathname);
});
server.listen(PORT, HOST, () => console.log('Kochatlas läuft auf http://' + (HOST === '0.0.0.0' ? 'localhost' : HOST) + ':' + PORT + '  (Daten: ' + DATA_DIR + ')'));

function shutdown() {
  for (const [id, t] of pending) { clearTimeout(t); const h = cache.get(id); if (h) try { fs.writeFileSync(file(id), JSON.stringify(h)); } catch (e) {} }
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
module.exports = server;
