#!/usr/bin/env node
/* Schätzt den Preis pro Portion für alle Internet-Rezepte und schreibt ihn als Spalte 13 ([von, bis] in Euro) in data/web/index.js.
   Gleiche Rechnung wie in der App (js/prices.js). Aufruf: node tools/compute_prices.js [--liste] */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
global.window = global;
(0, eval)(fs.readFileSync(path.join(root, 'js/prices.js'), 'utf8'));
const R = {};
global.KA_WEB_CHUNK = (i, a) => a.forEach(r => { R[r.i] = r; });
const web = path.join(root, 'data/web');
for (const f of fs.readdirSync(web).filter(f => f.startsWith('chunk-'))) (0, eval)(fs.readFileSync(path.join(web, f), 'utf8'));
const src = fs.readFileSync(path.join(web, 'index.js'), 'utf8');
const a = src.indexOf('[', src.indexOf('KA_WEB_INDEX')), b = src.lastIndexOf(']');
const idx = JSON.parse(src.slice(a, b + 1));
let n = 0; const list = [];
for (const e of idx) {
  const r = R[e[0]]; const p = r ? PRICE.estimate(r.g, r.p || 4) : null;
  while (e.length < 12) e.push(0);
  e[12] = p || 0; if (p) { n++; list.push([p[0], e[1], r.p || 4]); }
}
fs.writeFileSync(path.join(web, 'index.js'), src.slice(0, a) + JSON.stringify(idx) + src.slice(b + 1));
console.log('Preise für', n, 'von', idx.length, 'Rezepten');
if (process.argv.includes('--liste')) { list.sort((x, y) => y[0] - x[0]); console.log(list.slice(0, 40).map(x => x.join(' | ')).join('\n')); }
