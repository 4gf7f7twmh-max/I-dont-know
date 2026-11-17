/* Kochatlas – Anrichte-Plan: Teller von oben, Komponenten erscheinen Schritt für Schritt.
   Plan: { shape: 'round'|'square'|'deep'|'slate', els: [ { e: typ, x, y, ...parameter, t: 'Titel', how: 'Erklärung' } ] }
   Koordinaten: 0..300, Tellermitte 150/150. Uhrzeit-Position: 12 Uhr oben (150/40), 6 Uhr unten (150/260). */
(function () {
  'use strict';
  function rnd(seed) { var s = seed * 9301 + 49297; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  var f = function (n) { return Math.round(n * 10) / 10; };
  var G = function (o, inner) { return '<g transform="translate(' + f(o.x || 150) + ' ' + f(o.y || 150) + ') rotate(' + (o.a || 0) + ')">' + inner + '</g>'; };
  function blob(r, seed, pts) {
    var R = rnd(seed), n = pts || 10, P = [];
    for (var i = 0; i < n; i++) { var ang = i / n * Math.PI * 2, rr = r * (0.88 + R() * 0.24); P.push([Math.cos(ang) * rr, Math.sin(ang) * rr]); }
    var d = 'M' + f((P[0][0] + P[n - 1][0]) / 2) + ' ' + f((P[0][1] + P[n - 1][1]) / 2);
    for (var j = 0; j < n; j++) { var a = P[j], b = P[(j + 1) % n]; d += 'Q' + f(a[0]) + ' ' + f(a[1]) + ' ' + f((a[0] + b[0]) / 2) + ' ' + f((a[1] + b[1]) / 2); }
    return d + 'Z';
  }
  var E = {
    swoosh: function (o) {
      var L = o.len || 130, w = o.w || 24, h = o.bend == null ? 26 : o.bend;
      return G(o, '<path class="stroke" d="M' + (-L / 2) + ' 0Q0 ' + (-h) + ' ' + (L / 2) + ' 0" fill="none" stroke="' + o.col + '" stroke-width="' + w + '" stroke-linecap="round"/>' +
        '<path class="stroke" d="M' + (L / 2) + ' 0q' + (L * 0.18) + ' ' + (h * 0.15) + ' ' + (L * 0.32) + ' ' + (-h * 0.1) + '" fill="none" stroke="' + o.col + '" stroke-width="' + (w * 0.35) + '" stroke-linecap="round"/>' +
        '<path d="M' + (-L / 2 + 6) + ' ' + (-w * 0.2) + 'Q0 ' + (-h - w * 0.25) + ' ' + (L / 2 - 10) + ' ' + (-w * 0.2) + '" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="3" stroke-linecap="round"/>');
    },
    pool: function (o, i) { var r = o.r || 34; return G(o, '<path d="' + blob(r, i + 3) + '" fill="' + o.col + '"/><ellipse cx="' + (-r * 0.3) + '" cy="' + (-r * 0.35) + '" rx="' + (r * 0.3) + '" ry="' + (r * 0.12) + '" fill="#fff" opacity=".25"/>'); },
    line: function (o) { return '<path class="stroke" d="M' + o.x1 + ' ' + o.y1 + 'L' + o.x2 + ' ' + o.y2 + '" stroke="' + o.col + '" stroke-width="' + (o.w || 8) + '" stroke-linecap="round" fill="none"/>'; },
    dots: function (o) {
      var n = o.n || 5, L = o.len || 90, s = o.size || 7, out = '', cur = o.curve || 0;
      for (var i = 0; i < n; i++) {
        var t = n === 1 ? 0 : i / (n - 1) - 0.5, x = t * L, y = cur * (t * t * 4 - 1) * -1, r = o.even ? s : s * (1 - i / n * 0.6);
        out += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" fill="' + o.col + '"/><circle cx="' + f(x - r * 0.3) + '" cy="' + f(y - r * 0.3) + '" r="' + f(r * 0.3) + '" fill="#fff" opacity=".35"/>';
      }
      return G(o, out);
    },
    quenelle: function (o) {
      var s = o.size || 26;
      return G(o, '<ellipse rx="' + s + '" ry="' + (s * 0.56) + '" fill="' + o.col + '"/><path d="M' + (-s * 0.8) + ' 0Q0 ' + (-s * 0.7) + ' ' + (s * 0.8) + ' 0" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="2"/>' +
        '<path d="M' + (-s * 0.6) + ' ' + (-s * 0.22) + 'Q0 ' + (-s * 0.62) + ' ' + (s * 0.55) + ' ' + (-s * 0.2) + '" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2.5" stroke-linecap="round"/>');
    },
    ring: function (o, i) {
      var r = o.r || 34, R = rnd(i + 11), dots = '';
      for (var k = 0; k < 26; k++) { var a = R() * 6.28, rr = Math.sqrt(R()) * (r - 4); dots += '<circle cx="' + f(Math.cos(a) * rr) + '" cy="' + f(Math.sin(a) * rr) + '" r="' + f(1.2 + R() * 2.2) + '" fill="' + (o.top || '#000') + '" opacity=".22"/>'; }
      return G(o, '<circle r="' + (r + 3) + '" fill="#000" opacity=".12" cy="4"/><circle r="' + r + '" fill="' + o.col + '"/>' + dots + '<circle r="' + r + '" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="2"/>');
    },
    slices: function (o) {
      var n = o.n || 3, r = o.r || 22, out = '';
      for (var i = 0; i < n; i++) {
        var x = (i - (n - 1) / 2) * r * 0.95;
        out += '<g transform="translate(' + f(x) + ' 0)"><ellipse rx="' + (r * 0.62) + '" ry="' + r + '" fill="' + (o.col || '#6e2f22') + '"/><ellipse rx="' + (r * 0.46) + '" ry="' + (r * 0.8) + '" fill="' + (o.inner || '#d0675a') + '"/><ellipse cx="' + (-r * 0.15) + '" cy="' + (-r * 0.3) + '" rx="' + (r * 0.12) + '" ry="' + (r * 0.25) + '" fill="#fff" opacity=".2"/></g>';
      }
      return G(o, '<ellipse rx="' + (n * r * 0.55 + 6) + '" ry="' + (r + 4) + '" cy="5" fill="#000" opacity=".12"/>' + out);
    },
    block: function (o) {
      var w = o.w || 70, h = o.h || 34;
      return G(o, '<rect x="' + (-w / 2) + '" y="' + (-h / 2 + 4) + '" width="' + w + '" height="' + h + '" rx="' + (o.rx || 8) + '" fill="#000" opacity=".14"/><rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="' + (o.rx || 8) + '" fill="' + o.col + '"/>' +
        (o.crust ? '<rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + (h * 0.32) + '" rx="' + (o.rx || 8) + '" fill="' + o.crust + '"/>' : '') +
        '<path d="M' + (-w / 2 + 8) + ' ' + (-h / 2 + 4) + 'H' + (w / 2 - 8) + '" stroke="#fff" stroke-opacity=".3" stroke-width="2.5" stroke-linecap="round"/>');
    },
    disc: function (o) {
      var r = o.r || 18;
      return G(o, '<circle r="' + r + '" cy="3" fill="#000" opacity=".14"/><circle r="' + r + '" fill="' + o.col + '"/>' + (o.sear ? '<circle r="' + (r * 0.72) + '" fill="' + o.sear + '"/>' : '') + '<path d="M' + (-r * 0.5) + ' ' + (-r * 0.55) + 'q' + (r * 0.4) + ' ' + (-r * 0.25) + ' ' + (r * 0.85) + ' 0" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/>');
    },
    crumble: function (o, i) {
      var L = o.len || 100, R = rnd(i + 5), out = '';
      for (var k = 0; k < (o.n || 40); k++) { var x = (R() - 0.5) * L, y = (R() - 0.5) * (o.wide || 14); out += '<path d="' + blob(1.5 + R() * 3, k + i, 5) + '" transform="translate(' + f(x) + ' ' + f(y) + ')" fill="' + o.col + '"/>'; }
      return G(o, out);
    },
    herbs: function (o, i) {
      var R = rnd(i + 21), out = '', n = o.n || 6, rr = o.r || 30;
      for (var k = 0; k < n; k++) {
        var a = R() * 6.28, d = Math.sqrt(R()) * rr, x = Math.cos(a) * d, y = Math.sin(a) * d, rot = R() * 180;
        out += '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ')"><path d="M0 0q4-7 0-12q-4 5 0 12z" fill="' + (o.col || '#4c9a3a') + '"/><path d="M0 0q-7-2-10 2q6 3 10-2z" fill="' + (o.col2 || o.col || '#63b04d') + '"/><path d="M0 0q7-2 10 2q-6 3-10-2z" fill="' + (o.col || '#4c9a3a') + '"/></g>';
      }
      return G(o, out);
    },
    flowers: function (o, i) {
      var R = rnd(i + 31), out = '', n = o.n || 3, rr = o.r || 26;
      for (var k = 0; k < n; k++) {
        var a = R() * 6.28, d = R() * rr, x = Math.cos(a) * d, y = Math.sin(a) * d, p = '';
        for (var q = 0; q < 5; q++) p += '<ellipse cx="0" cy="-4" rx="2.6" ry="4" transform="rotate(' + (q * 72) + ')" fill="' + (o.col || '#e66aa8') + '"/>';
        out += '<g transform="translate(' + f(x) + ' ' + f(y) + ')">' + p + '<circle r="1.8" fill="#ffd34d"/></g>';
      }
      return G(o, out);
    },
    shard: function (o) { var s = o.size || 40; return G(o, '<path d="M0 ' + (-s / 2) + 'L' + (s * 0.45) + ' ' + (s / 2) + 'L' + (-s * 0.35) + ' ' + (s * 0.35) + 'Z" fill="' + o.col + '" opacity=".95"/><path d="M0 ' + (-s / 2 + 4) + 'L' + (-s * 0.25) + ' ' + (s * 0.3) + '" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>'); },
    drizzle: function (o, i) {
      var R = rnd(i + 41), out = '', n = o.n || 7, rr = o.r || 60;
      for (var k = 0; k < n; k++) { var a = (o.from || 0) + k / n * (o.arc || 6.28), d = rr * (0.85 + R() * 0.3); out += '<ellipse cx="' + f(Math.cos(a) * d) + '" cy="' + f(Math.sin(a) * d) + '" rx="' + f(2 + R() * 3) + '" ry="' + f(1.6 + R() * 2) + '" fill="' + (o.col || '#9bbb2d') + '" opacity=".85"/>'; }
      return G(o, out);
    },
    foam: function (o, i) {
      var R = rnd(i + 51), out = '', r = o.r || 22;
      for (var k = 0; k < 16; k++) { var a = R() * 6.28, d = Math.sqrt(R()) * r, b = 3 + R() * 6; out += '<circle cx="' + f(Math.cos(a) * d) + '" cy="' + f(Math.sin(a) * d) + '" r="' + f(b) + '" fill="' + (o.col || '#fffaf0') + '" opacity=".85" stroke="#000" stroke-opacity=".06"/>'; }
      return G(o, out);
    },
    spheres: function (o, i) {
      var R = rnd(i + 61), out = '', n = o.n || 5, sp = o.spread || 26, r = o.r || 5;
      for (var k = 0; k < n; k++) { var x = (R() - 0.5) * sp * 2, y = (R() - 0.5) * sp; out += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + r + '" fill="' + o.col + '"/><circle cx="' + f(x - r * 0.35) + '" cy="' + f(y - r * 0.35) + '" r="' + f(r * 0.3) + '" fill="#fff" opacity=".55"/>'; }
      return G(o, out);
    },
    nest: function (o) {
      var r = o.r || 32, d = 'M0 0', a = 0;
      for (var k = 0; k < 60; k++) { a += 0.5; var rr = r * k / 60; d += 'L' + f(Math.cos(a) * rr) + ' ' + f(Math.sin(a) * rr); }
      return G(o, '<circle r="' + r + '" fill="' + o.col + '" opacity=".35"/><path class="stroke" d="' + d + '" fill="none" stroke="' + o.col + '" stroke-width="5" stroke-linecap="round"/>');
    },
    dust: function (o, i) {
      var R = rnd(i + 71), out = '', r = o.r || 50;
      for (var k = 0; k < 90; k++) { var a = R() * 6.28, d = Math.sqrt(R()) * r; out += '<circle cx="' + f(Math.cos(a) * d) + '" cy="' + f(Math.sin(a) * d * (o.flat || 1)) + '" r="' + f(0.6 + R() * 1.2) + '" fill="' + o.col + '" opacity=".6"/>'; }
      return G(o, out);
    },
    stack: function (o) {
      var r = o.r || 30, cols = o.layers || ['#d9a25a', '#8a4b2b', '#d9a25a'], out = '';
      cols.forEach(function (c, k) { out += '<ellipse cx="' + (k * 2) + '" cy="' + (-k * 5) + '" rx="' + (r - k * 2) + '" ry="' + (r * 0.92 - k * 2) + '" fill="' + c + '" stroke="#000" stroke-opacity=".12"/>'; });
      return G(o, '<ellipse rx="' + (r + 2) + '" ry="' + (r * 0.92 + 2) + '" cy="6" fill="#000" opacity=".14"/>' + out);
    },
    leaf: function (o) { var s = o.size || 22; return G(o, '<path d="M0 ' + (-s) + 'Q' + (s * 0.7) + ' 0 0 ' + s + 'Q' + (-s * 0.7) + ' 0 0 ' + (-s) + 'z" fill="' + (o.col || '#4c9a3a') + '"/><path d="M0 ' + (-s + 3) + 'V' + (s - 3) + '" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/>'); },
    bowlfill: function (o, i) { var r = o.r || 80; return '<path d="' + blob(r, i + 9, 14) + '" transform="translate(' + (o.x || 150) + ' ' + (o.y || 150) + ')" fill="' + o.col + '"/><ellipse cx="' + ((o.x || 150) - r * 0.35) + '" cy="' + ((o.y || 150) - r * 0.4) + '" rx="' + (r * 0.3) + '" ry="' + (r * 0.1) + '" fill="#fff" opacity=".2"/>'; }
  };
  function base(shape) {
    var plate = 'var(--p-plate, #fbfaf7)', rim = 'var(--p-rim, #ece8e1)';
    if (shape === 'slate') return '<rect x="18" y="62" width="264" height="176" rx="10" fill="#2b2e33"/><rect x="18" y="62" width="264" height="176" rx="10" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="2"/>';
    if (shape === 'square') return '<rect x="22" y="26" width="256" height="256" rx="26" fill="#000" opacity=".12"/><rect x="20" y="20" width="260" height="260" rx="26" fill="' + rim + '"/><rect x="46" y="46" width="208" height="208" rx="16" fill="' + plate + '"/>';
    var well = shape === 'deep' ? '<circle cx="150" cy="150" r="92" fill="' + rim + '"/><circle cx="150" cy="152" r="86" fill="' + plate + '" stroke="#000" stroke-opacity=".08" stroke-width="6"/>' : '<circle cx="150" cy="150" r="104" fill="' + plate + '" stroke="#000" stroke-opacity=".05" stroke-width="2"/>';
    return '<circle cx="152" cy="156" r="140" fill="#000" opacity=".14"/><circle cx="150" cy="150" r="140" fill="' + rim + '"/>' + well;
  }
  function clock(shape) {
    if (shape === 'slate') return '';
    return '<g class="clock"><circle cx="150" cy="150" r="78" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-dasharray="3 6"/>' +
      [['12', 150, 33], ['3', 267, 150], ['6', 150, 267], ['9', 33, 150]].map(function (c) { return '<text x="' + c[1] + '" y="' + c[2] + '">' + c[0] + '</text>'; }).join('') + '</g>';
  }
  function markerPos(o) {
    if (o.e === 'line') return [(o.x1 + o.x2) / 2, (o.y1 + o.y2) / 2 - 16];
    var mid = ((o.rep || 1) - 1) / 2;
    return [(o.x || 150) + mid * (o.dx || 0) + (o.mx || 0), (o.y || 150) + mid * (o.dy || 0) - (o.my != null ? o.my : 30)];
  }
  window.PLATE = {
    types: Object.keys(E),
    /* upto: Index des letzten sichtbaren Elements (-1 = leerer Teller); anim: Index, der hereinanimiert wird */
    svg: function (plan, upto, anim, showMarkers) {
      var els = plan.els || [], body = '';
      els.forEach(function (o, i) {
        var fn = E[o.e]; if (!fn) return;
        var cls = 'el' + (i > upto ? ' off' : '') + (i === anim ? (/swoosh|line|nest/.test(o.e) ? ' drawn' : ' in') : '');
        var inner = '';
        for (var k = 0; k < (o.rep || 1); k++) {
          var c = Object.assign({}, o, { x: (o.x || 150) + k * (o.dx || 0), y: (o.y || 150) + k * (o.dy || 0), a: (o.a || 0) + k * (o.da || 0) });
          inner += fn(c, i * 7 + k);
        }
        body += '<g class="' + cls + '">' + inner + '</g>';
      });
      var mk = '';
      if (showMarkers && upto >= 0 && els[upto]) { var p = markerPos(els[upto]); mk = '<g class="marker"><circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="11"/><text x="' + f(p[0]) + '" y="' + f(p[1]) + '">' + (upto + 1) + '</text></g>'; }
      return '<svg class="plate-svg" viewBox="0 0 300 300" role="img" aria-label="Anrichte-Plan">' + base(plan.shape) + (showMarkers ? clock(plan.shape) : '') + body + mk + '</svg>';
    }
  };
})();
