#!/usr/bin/env node
/* Kürzt die Bildpfade im Rezeptindex (data/web/index.js), damit die App auf dem Handy schneller startet.
   "8/8a/Datei.jpg/960px-Datei.jpg"                          -> "8/8a"
   "https://upload.wikimedia.org/wikipedia/commons/8/8a/Datei.jpg" -> "O:8/8a"
   Gekürzt wird nur, wenn sich der Pfad aus Ordner und Dateiname (e[10][1]) exakt wieder herstellen lässt;
   js/app.js (wbImgPath) setzt ihn beim Lesen wieder zusammen. Nach jedem Werkzeug, das den Index schreibt, erneut laufen lassen.
   Aufruf: node tools/compact_index.js */
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, '..', 'data', 'web', 'index.js');
const O = 'https://upload.wikimedia.org/wikipedia/commons/';
const enc = f => encodeURIComponent(f.replace(/ /g, '_')).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
const src = fs.readFileSync(FILE, 'utf8');
const m = /^([\s\S]*?KA_WEB_INDEX\s*=\s*)(\[[\s\S]*\])(\s*;?\s*)$/.exec(src);
const idx = JSON.parse(m[2]);
let n = 0;
for (const e of idx) {
  const im = e[10];
  if (!im || !im[0] || !im[1]) continue;
  let d;
  if ((d = /^([0-9a-f]\/[0-9a-f]{2})\/./.exec(im[0])) && d[1] + '/' + enc(im[1]) + '/960px-' + enc(im[1]) === im[0]) { im[0] = d[1]; n++; }
  else if (im[0].startsWith(O) && (d = /^([0-9a-f]\/[0-9a-f]{2})\//.exec(im[0].slice(O.length))) && O + d[1] + '/' + enc(im[1]) === im[0]) { im[0] = 'O:' + d[1]; n++; }
}
fs.writeFileSync(FILE, m[1] + JSON.stringify(idx) + m[3]);
console.log(n + ' Bildpfade gekürzt, Index jetzt ' + Math.round(fs.statSync(FILE).size / 1000) + ' KB');
