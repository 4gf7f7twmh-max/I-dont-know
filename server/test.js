/* Test des Kochatlas-Servers: node server/test.js */
'use strict';
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const http = require('http');
const assert = require('assert');

const PORT = 18000 + Math.floor(Math.random() * 1000);
const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'kochatlas-test-'));
const base = 'http://127.0.0.1:' + PORT;

function start() {
  const p = spawn(process.execPath, [path.join(__dirname, 'server.js')], { env: Object.assign({}, process.env, { PORT, HOST: '127.0.0.1', DATA_DIR: DATA }), stdio: ['ignore', 'pipe', 'inherit'] });
  return new Promise(r => p.stdout.once('data', () => r(p)));
}
async function j(method, url, body) {
  const r = await fetch(base + url, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const t = await r.text();
  return { status: r.status, body: t ? JSON.parse(t) : null };
}
function listen(id) {
  const events = [];
  const req = http.get(base + '/api/households/' + id + '/events', res => {
    let buf = '';
    res.on('data', c => { buf += c; let i; while ((i = buf.indexOf('\n\n')) >= 0) { const block = buf.slice(0, i); buf = buf.slice(i + 2); const d = block.split('\n').find(l => l.startsWith('data: ')); if (d) events.push(JSON.parse(d.slice(6))); } });
  });
  return { events, close: () => req.destroy() };
}
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let srv = await start();
  try {
    const health = await j('GET', '/api/health');
    assert.strictEqual(health.body.ok, true);

    const c = await j('POST', '/api/households', { name: 'Familie Test', member: 'Anna', memberId: 'annaid01' });
    assert.strictEqual(c.status, 201); assert.match(c.body.id, /^[A-Z2-7]{16}$/);
    const id = c.body.id;
    console.log('Familie angelegt:', id);

    const a = listen(id), b = listen(id.toLowerCase());
    await wait(200);
    assert.strictEqual(a.events.length, 1); assert.strictEqual(b.events.length, 1);

    const m = await j('POST', '/api/households/' + id + '/members', { id: 'benid0001', name: 'Ben' });
    assert.strictEqual(m.status, 200);
    const add = await j('POST', '/api/households/' + id + '/items', { items: [{ t: '1 l Milch', by: 'Anna' }, { t: '6 Eier', from: 'Pancakes', by: 'Anna' }] });
    assert.strictEqual(add.status, 201); assert.strictEqual(add.body.items.length, 2);
    await wait(200);
    const lastB = b.events[b.events.length - 1];
    assert.strictEqual(lastB.items.length, 2, 'Gerät B sieht beide Einträge live');
    assert.strictEqual(lastB.members.length, 2);
    console.log('Live bei Gerät B angekommen:', lastB.items.map(x => x.t).join(', '));

    const it = add.body.items[0].id;
    await j('PATCH', '/api/households/' + id + '/items/' + it, { done: true, doneBy: 'Ben' });
    await wait(150);
    assert.strictEqual(a.events[a.events.length - 1].items.find(x => x.id === it).done, true);
    const cl = await j('POST', '/api/households/' + id + '/clear', {});
    assert.strictEqual(cl.body.removed, 1);
    await j('DELETE', '/api/households/' + id + '/items/' + add.body.items[1].id);
    await wait(150);
    assert.strictEqual(a.events[a.events.length - 1].items.length, 0);
    await j('POST', '/api/households/' + id + '/items', { t: 'Butter', by: 'Ben' });

    assert.strictEqual((await j('GET', '/api/households/AAAAAAAAAAAAAAAA')).status, 404);
    assert.strictEqual((await j('GET', '/api/households/kaputt')).status, 400);
    assert.strictEqual((await fetch(base + '/server/server.js')).status, 404, 'Servercode ist nicht abrufbar');
    assert.strictEqual((await fetch(base + '/%2e%2e/etc/passwd')).status !== 200, true);
    assert.strictEqual((await fetch(base + '/server-data/' + id + '.json')).status, 404, 'Daten sind nicht abrufbar');
    const idx = await fetch(base + '/');
    assert.strictEqual(idx.status, 200); assert.match(await idx.text(), /Kochatlas/);
    const big = await fetch(base + '/api/households/' + id + '/items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ t: 'x'.repeat(40000) }) });
    assert.strictEqual(big.status, 413);
    a.close(); b.close();

    await wait(400);
    srv.kill('SIGTERM'); await wait(300);
    srv = await start();
    const again = await j('GET', '/api/households/' + id);
    assert.strictEqual(again.body.items.length, 1); assert.strictEqual(again.body.items[0].t, 'Butter');
    console.log('Nach Neustart noch da:', again.body.items[0].t);
    console.log('ALLE SERVER-TESTS BESTANDEN');
  } catch (e) {
    console.error('FEHLER', e); process.exitCode = 1;
  } finally {
    srv.kill('SIGTERM');
    fs.rmSync(DATA, { recursive: true, force: true });
  }
})();
