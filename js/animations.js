/* Kochatlas – animierte SVG-Szenen für jeden Arbeitsschritt.
   ANIM.scene(action, opts, ctx) liefert ein <svg>. Alle Bewegungen laufen über CSS-Keyframes (style.css, Abschnitt "Szenen"). */
(function () {
  'use strict';
  var HEAT = { max: 1.3, hoch: 1.12, mittel: 0.9, niedrig: 0.62 };
  var d = function (i, f) { return '-' + (i * f).toFixed(2) + 's'; };

  function flames(cx, y, heat) {
    var s = HEAT[heat] || 0.9, o = '<g transform="translate(' + cx + ' ' + y + ') scale(' + s + ')">';
    [-30, -15, 0, 15, 30].forEach(function (x, i) {
      o += '<path class="fl" style="animation-delay:' + d(i, 0.17) + '" d="M' + x + ' 0c-6-6-6-12 0-20c6 8 6 14 0 20z"/>' +
           '<path class="fl2" style="animation-delay:' + d(i, 0.11) + '" d="M' + x + ' 0c-3-3-3-7 0-11c3 4 3 8 0 11z"/>';
    });
    return o + '</g>';
  }
  var stove = function (heat) { return '<rect class="stv" x="30" y="146" width="180" height="8" rx="4"/>' + (heat === 'aus' ? '' : flames(120, 146, heat)); };
  function steam(xs, y, cls) {
    return xs.map(function (x, i) { return '<path class="stm ' + (cls || '') + '" style="animation-delay:' + d(i, 0.7) + '" d="M' + x + ' ' + y + 'c-6-8 6-14 0-22c-6-8 6-14 0-22"/>'; }).join('');
  }
  function pot(liq) {
    return '<rect class="met2" x="52" y="86" width="16" height="7" rx="3.5"/><rect class="met2" x="172" y="86" width="16" height="7" rx="3.5"/>' +
      '<path class="met" d="M66 78v42q0 12 12 12h84q12 0 12-12V78z"/><ellipse class="metd" cx="120" cy="78" rx="54" ry="10"/>' +
      '<ellipse class="' + (liq || 'wat') + '" cx="120" cy="80" rx="48" ry="7"/>';
  }
  function bubbles(n, cls, y) {
    var o = '', xs = [84, 150, 102, 132, 94, 142, 116, 124, 108, 138];
    for (var i = 0; i < n; i++) o += '<circle class="bub ' + (cls || '') + '" cx="' + xs[i % xs.length] + '" cy="' + (y || 80) + '" r="' + (2.2 + (i % 3)) + '" style="animation-delay:' + d(i, 0.23) + '"/>';
    return o;
  }
  function bowl(fill) {
    return '<path class="bowl" d="M54 92q0 46 66 46t66-46z"/><ellipse class="bowlin" cx="120" cy="92" rx="66" ry="10"/>' +
      '<ellipse class="' + (fill || 'batter') + '" cx="120" cy="94" rx="58" ry="7"/>';
  }
  var board = function (y) { return '<rect class="wood" x="30" y="' + (y || 120) + '" width="180" height="14" rx="5"/>'; };
  function zig(x1, x2, y) {
    var p = 'M' + x1 + ' ' + y, up = true;
    for (var x = x1 + 6; x <= x2; x += 6) { p += 'L' + x + ' ' + (y + (up ? -4 : 4)); up = !up; }
    return p;
  }
  function mmss(o) {
    var s = o.sec != null ? o.sec : (o.t != null ? Math.round(o.t * 60) : null);
    if (s == null) return '--:--';
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
    return h ? h + 'h' + String(m).padStart(2, '0') : String(m).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
  }

  /* Ofen-Inhalt je nach Gericht */
  function ovenItem(kind) {
    switch (kind) {
      case 'loaf': return '<g class="rise"><path class="crust" d="M80 112q0-26 40-26t40 26z"/><path class="cut" d="M102 96l8-6M116 94l8-6M130 96l8-6"/></g>';
      case 'pizza': return '<ellipse class="crust" cx="120" cy="108" rx="44" ry="6"/><ellipse class="sauce ns" cx="120" cy="107" rx="37" ry="4"/><circle class="cheese ns bubq" cx="104" cy="107" r="3"/><circle class="cheese ns bubq" style="animation-delay:-.5s" cx="126" cy="106" r="3"/><circle class="green ns" cx="138" cy="108" r="2.5"/>';
      case 'roast': return '<rect class="tray" x="70" y="108" width="100" height="6" rx="2"/><g class="rise"><path class="meat" d="M84 108q-4-24 36-24t36 24z"/><path class="hl" d="M98 96q10-6 22-6"/></g>';
      case 'tray': return '<rect class="tray" x="62" y="108" width="116" height="5" rx="2"/><rect class="food ns jig" x="70" y="100" width="16" height="8" rx="4"/><rect class="green ns jig" style="animation-delay:-.3s" x="92" y="100" width="14" height="8" rx="4"/><rect class="sauce ns jig" style="animation-delay:-.6s" x="112" y="99" width="16" height="9" rx="4"/><rect class="food ns jig" style="animation-delay:-.9s" x="134" y="100" width="16" height="8" rx="4"/><rect class="cheese ns jig" style="animation-delay:-.2s" x="156" y="100" width="14" height="8" rx="4"/>';
      case 'cookies': return '<rect class="tray" x="62" y="108" width="116" height="5" rx="2"/><g class="rise"><ellipse class="crust" cx="82" cy="104" rx="12" ry="5"/><ellipse class="crust" cx="120" cy="104" rx="12" ry="5"/><ellipse class="crust" cx="158" cy="104" rx="12" ry="5"/></g><circle class="choc ns" cx="80" cy="103" r="1.6"/><circle class="choc ns" cx="122" cy="102" r="1.6"/><circle class="choc ns" cx="156" cy="103" r="1.6"/>';
      case 'dish': return '<rect class="dish" x="72" y="92" width="96" height="22" rx="4"/><path class="cheese" d="M74 94q12-8 23 0t23 0 23 0 23 0v4H74z"/><circle class="bubq ns cheese2" cx="96" cy="94" r="2.5"/><circle class="bubq ns cheese2" style="animation-delay:-.7s" cx="140" cy="93" r="2.5"/>';
      default: return '<rect class="tray" x="84" y="108" width="72" height="6" rx="2"/><g class="rise"><path class="crust" d="M90 108v-6q0-16 30-16t30 16v6z"/></g>';
    }
  }

  var S = {};

  S.boil = function (o) { return stove(o.h || 'hoch') + pot('wat') + bubbles(9) + steam([96, 120, 144], 60); };

  S.simmer = function (o) {
    return stove(o.h || 'niedrig') + pot('sauce') + bubbles(4, 'slow') +
      '<g class="rattle"><ellipse class="met" cx="126" cy="70" rx="56" ry="9" transform="rotate(-6 126 70)"/><rect class="met2" x="120" y="54" width="16" height="9" rx="4"/></g>' +
      steam([76], 70, 'slow');
  };

  S.stir = function (o) {
    return stove(o.h || 'mittel') + pot(o.liq || 'sauce') + '<ellipse class="swirl" cx="120" cy="80" rx="30" ry="4"/>' +
      '<g class="ellx" style="--d:2.4s"><g class="elly" style="--d:2.4s"><g transform="rotate(14 120 80)"><rect class="wood" x="116" y="10" width="8" height="66" rx="4"/><ellipse class="wood" cx="120" cy="80" rx="9" ry="5"/></g></g></g>';
  };

  function pan(oil) {
    return '<rect class="metd" x="176" y="110" width="54" height="8" rx="4"/><path class="met" d="M52 106h136l-10 22q-3 6-10 6H72q-7 0-10-6z"/>' +
      '<ellipse class="metd" cx="120" cy="106" rx="68" ry="9"/><ellipse class="' + (oil || 'oil') + '" cx="120" cy="107" rx="60" ry="6"/>';
  }
  S.fry = function (o) {
    return stove(o.h || 'mittel') + pan() +
      '<rect class="food jig" x="78" y="96" width="24" height="11" rx="5"/><rect class="food jig" style="animation-delay:-.25s" x="108" y="95" width="26" height="12" rx="6"/><rect class="green jig" style="animation-delay:-.5s" x="140" y="97" width="20" height="10" rx="5"/>' +
      '<g class="sz"><path d="M90 86l-3-7M96 84l1-8"/><path style="animation-delay:-.3s" d="M122 84l-2-8M128 86l3-7"/><path style="animation-delay:-.6s" d="M150 86l2-7"/></g>';
  };

  S.flip = function (o) {
    return stove(o.h || 'hoch') + '<g class="toss">' + pan() + '</g><g class="flipf"><rect class="food" x="102" y="93" width="36" height="12" rx="6"/></g>' +
      '<g class="flipf" style="animation-delay:-.08s"><rect class="green" x="84" y="96" width="12" height="8" rx="4"/></g>';
  };

  S.deepfry = function (o) {
    return stove(o.h || 'mittel') + pot('oil') + bubbles(10, 'fast') +
      '<g class="bob"><rect class="crust" x="94" y="72" width="22" height="10" rx="5"/></g><g class="bob" style="animation-delay:-.6s"><rect class="crust" x="124" y="73" width="24" height="9" rx="4.5"/></g>' +
      (o.c ? '<rect class="scr" x="150" y="24" width="50" height="18" rx="5"/><text class="led" x="175" y="37">' + o.c + '°</text>' : '');
  };

  S.bake = function (o, ctx) {
    var mode = o.mo || 'OU', temp = o.c || 180;
    var top = mode === 'OU' || mode === 'G' || mode === 'UG' || mode === 'O', bot = mode === 'OU' || mode === 'U';
    var item = o.i || (ctx && ctx.item) || 'cake';
    return '<rect class="body" x="34" y="14" width="172" height="134" rx="12"/><rect class="body2" x="34" y="14" width="172" height="28" rx="12"/>' +
      '<circle class="met" cx="56" cy="28" r="7"/><circle class="met" cx="78" cy="28" r="7"/>' +
      '<rect class="scr" x="126" y="19" width="68" height="18" rx="4"/><text class="led" x="160" y="32">' + temp + (isNaN(temp) ? '' : '°') + '</text>' +
      '<rect class="met2" x="70" y="44" width="100" height="5" rx="2.5"/>' +
      '<rect class="win" x="52" y="54" width="136" height="80" rx="8"/><rect class="glow ns" x="54" y="56" width="132" height="76" rx="7"/>' +
      '<path class="heat ' + (top ? 'on' : '') + '" d="' + zig(62, 178, 64) + '"/>' +
      '<path class="heat ' + (bot || mode === 'U' ? 'on' : '') + '" d="' + zig(62, 178, 126) + '"/>' +
      (mode === 'U' || mode === 'UG' ? '<g transform="translate(120 92)"><g class="spin" style="--d:.8s"><g class="fan">' +
        '<ellipse cx="0" cy="-12" rx="5" ry="12"/><ellipse cx="0" cy="12" rx="5" ry="12"/><ellipse cx="-12" cy="0" rx="12" ry="5"/><ellipse cx="12" cy="0" rx="12" ry="5"/></g></g></g>' : '') +
      '<line class="rack" x1="56" y1="114" x2="184" y2="114"/>' + '<g transform="translate(0 2)">' + ovenItem(item) + '</g>';
  };

  S.airfry = function (o) {
    var temp = o.c || 200;
    return '<rect class="body" x="62" y="12" width="116" height="134" rx="26"/>' +
      '<rect class="scr" x="88" y="22" width="64" height="20" rx="5"/><text class="led alt1" x="120" y="36">' + temp + '°C</text><text class="led alt2" x="120" y="36">' + mmss(o) + '</text>' +
      '<circle class="body2" cx="120" cy="62" r="13"/><g transform="translate(120 62)"><g class="spin" style="--d:.5s"><g class="fan2"><path d="M0 0l3-11h-6z"/><path d="M0 0l11 3v-6z"/><path d="M0 0l-3 11h6z"/><path d="M0 0l-11-3v6z"/></g></g></g>' +
      '<path class="air" d="M92 56q-16 20 0 44"/><path class="air" style="animation-delay:-.4s" d="M148 56q16 20 0 44"/>' +
      '<rect class="body2" x="72" y="86" width="96" height="52" rx="14"/><rect class="win" x="84" y="94" width="72" height="26" rx="6"/>' +
      '<rect class="crust jig" x="92" y="106" width="16" height="6" rx="3" transform="rotate(-12 100 109)"/><rect class="crust jig" style="animation-delay:-.3s" x="112" y="104" width="18" height="6" rx="3" transform="rotate(10 121 107)"/><rect class="crust jig" style="animation-delay:-.6s" x="134" y="107" width="14" height="6" rx="3"/>' +
      '<rect class="met2" x="104" y="126" width="32" height="8" rx="4"/>';
  };

  S.tm = function (o) {
    var sp = o.s, dur, cls = '';
    if (sp === 'teig') { dur = 0.7; cls = 'jerk'; }
    else if (sp === 'sanft') dur = 4;
    else { var n = parseFloat(sp) || 1; dur = Math.max(0.12, 2.6 / n); }
    var rev = o.l ? ' rev' : '', varoma = o.c === 'Varoma';
    var spTxt = sp === 'teig' ? 'Teig' : sp === 'sanft' ? 'Sanft' : (sp != null ? 'St' + sp : '');
    var tTxt = o.c ? (varoma ? 'Var' : o.c + '°') : '--°';
    var vortex = !isNaN(parseFloat(sp)) && parseFloat(sp) >= 4;
    return '<path class="tmb" d="M64 100h112l10 44H54z"/>' +
      '<rect class="scr" x="88" y="108" width="64" height="30" rx="5"/><text class="led sm" x="120" y="120">' + mmss(o) + '</text><text class="led sm" x="120" y="133">' + tTxt + ' ' + (o.l ? '↺ ' : '') + spTxt + '</text>' +
      '<circle class="met" cx="164" cy="123" r="6"/>' +
      '<path class="glass" d="M84 40h72l-6 60H90z"/><path class="glassln" d="M155 50q20 6 14 30l-10 4"/>' +
      '<path class="' + (o.liq || 'liq') + '" d="M87.6 70h64.8l-2.6 28H90.2z"/>' +
      (vortex ? '<path class="vortex" d="M92 72q28 22 56 0"/>' : '') +
      '<g class="ellx' + rev + '" style="--d:' + dur + 's"><g class="elly" style="--d:' + dur + 's"><circle class="food ns" cx="120" cy="84" r="3.5"/></g></g>' +
      '<g class="ellx' + rev + '" style="--d:' + dur + 's;animation-delay:-' + (dur / 2) + 's"><g class="elly" style="--d:' + dur + 's;animation-delay:-' + (dur * 0.75) + 's"><circle class="green ns" cx="120" cy="86" r="3"/></g></g>' +
      '<g transform="translate(120 95)"><g class="blade ' + cls + rev + '" style="--d:' + (dur / 2) + 's"><path class="met2" d="M-18 0l18-4 18 4-18 4z"/></g></g>' +
      (varoma ? '<path class="tmb" d="M70 18h100l-6 18H76z"/><path class="tmb" d="M78 10h84v8H78z"/>' + steam([96, 120, 144], 8, 'fast')
              : '<rect class="tmb" x="80" y="32" width="80" height="10" rx="4"/><rect class="met2" x="112" y="22" width="16" height="12" rx="3"/>' + (o.c >= 90 ? steam([108, 132], 20) : ''));
  };

  S.whisk = function () {
    return bowl() + '<circle class="foam" cx="96" cy="92" r="6"/><circle class="foam" style="animation-delay:-.4s" cx="140" cy="93" r="5"/><circle class="foam" style="animation-delay:-.8s" cx="118" cy="95" r="4"/>' +
      '<g class="wsk"><rect class="met2" x="116" y="8" width="8" height="34" rx="4"/><path class="wire" d="M120 42c-17 8-17 46 0 54c17-8 17-46 0-54z"/><path class="wire" d="M120 42c-7 10-7 44 0 54c7-10 7-44 0-54z"/></g>';
  };

  S.mix = function () {
    return bowl() + '<circle class="foam" cx="98" cy="92" r="5"/><circle class="foam" style="animation-delay:-.5s" cx="142" cy="92" r="5"/>' +
      '<g class="vib"><path class="body" d="M80 22h80q10 0 10 10v12q0 10-10 10H80q-10 0-10-10V32q0-10 10-10z"/><path class="body2" d="M96 22q0-14 24-14t24 14"/>' +
      '<line class="wire" x1="108" y1="54" x2="108" y2="74"/><line class="wire" x1="132" y1="54" x2="132" y2="74"/>' +
      '<g transform="translate(108 84)"><g class="blade" style="--d:.09s"><path class="wire" d="M0-10c-8 2-8 18 0 20c8-2 8-18 0-20z"/></g></g>' +
      '<g transform="translate(132 84)"><g class="blade rev" style="--d:.09s"><path class="wire" d="M0-10c-8 2-8 18 0 20c8-2 8-18 0-20z"/></g></g></g>' +
      '<circle class="drop" cx="84" cy="80" r="2.5"/><circle class="drop" style="animation-delay:-.4s" cx="158" cy="78" r="2"/>';
  };

  S.fold = function () {
    return bowl() + '<path class="wave" d="M70 94q12-8 25 0t25 0 25 0 25 0"/>' +
      '<g class="fold"><rect class="wood" x="146" y="6" width="7" height="60" rx="3.5"/><path class="spat" d="M140 64h20l-2 26q-8 6-16 0z"/></g>';
  };

  S.knead = function () {
    return board(130) + '<g class="squish"><ellipse class="dough" cx="120" cy="114" rx="44" ry="17"/></g>' +
      '<g class="press"><rect class="hand" x="82" y="68" width="36" height="28" rx="14"/><rect class="hand" x="122" y="68" width="36" height="28" rx="14"/></g>' +
      '<circle class="flour" cx="70" cy="120" r="2"/><circle class="flour" style="animation-delay:-.6s" cx="170" cy="118" r="2"/><circle class="flour" style="animation-delay:-1.1s" cx="160" cy="124" r="1.6"/>';
  };

  S.shape = function () {
    return board(130) + '<circle class="dough" cx="60" cy="122" r="8"/><circle class="dough" cx="180" cy="122" r="8"/>' +
      '<g class="rollb"><circle class="dough" cx="120" cy="116" r="14"/><path class="cut" d="M112 112q8 6 16 0"/></g>' +
      '<g class="rollb"><path class="hand" d="M96 100q24-30 48 0z"/></g>';
  };

  S.rest = function () {
    return bowl('none') + '<g class="riseslow"><path class="dough" d="M62 94q0-34 58-34t58 34z"/></g>' +
      '<path class="towel" d="M58 92q62-20 124 0l-4 10q-58-14-116 0z"/>' +
      '<circle class="clockf" cx="196" cy="34" r="20"/><g transform="translate(196 34)"><g class="spin" style="--d:6s"><line class="hand2" x1="0" y1="0" x2="0" y2="-14"/></g><g class="spin" style="--d:72s"><line class="hand2" x1="0" y1="0" x2="9" y2="0"/></g></g>';
  };

  S.chop = function () {
    return board(118) +
      '<path class="food" d="M86 106h62q8 0 8 5t-8 5H86z"/><path class="green" d="M156 108l14-8M156 111l16 0M156 114l14 7"/>' +
      '<rect class="food jig" x="46" y="108" width="7" height="10" rx="2"/><rect class="food jig" style="animation-delay:-.3s" x="56" y="108" width="7" height="10" rx="2"/><rect class="food jig" style="animation-delay:-.6s" x="66" y="108" width="7" height="10" rx="2"/>' +
      '<g class="stepx"><g class="chopk"><path class="met" d="M60 62h82q4 0 4 4v6q-38 22-90 22q-2-14 4-32z"/><rect class="body" x="146" y="60" width="46" height="14" rx="6"/></g></g>';
  };

  S.grate = function () {
    return bowl('none') + '<path class="shredpile" d="M80 96q40-20 80 0z"/>' +
      '<path class="met" d="M98 18h44l16 84H82z"/><g class="holes"><path d="M104 36h4M116 36h4M128 36h4M100 52h4M112 52h4M124 52h4M136 52h4M98 68h4M110 68h4M122 68h4M134 68h4M94 84h4M106 84h4M118 84h4M130 84h4M142 84h4"/></g>' +
      '<g class="grate"><rect class="cheese" x="108" y="28" width="26" height="22" rx="3"/></g>' +
      '<line class="shred" x1="104" y1="96" x2="104" y2="102"/><line class="shred" style="animation-delay:-.3s" x1="120" y1="96" x2="122" y2="102"/><line class="shred" style="animation-delay:-.6s" x1="136" y1="96" x2="134" y2="102"/>';
  };

  S.season = function () {
    return pan('oil') + '<g class="shake"><g transform="rotate(145 150 40)"><rect class="body2" x="138" y="18" width="24" height="40" rx="6"/><rect class="met2" x="136" y="12" width="28" height="10" rx="3"/></g></g>' +
      [0, 1, 2, 3, 4].map(function (i) { return '<circle class="grain" cx="' + (128 + i * 4) + '" cy="72" r="1.8" style="animation-delay:' + d(i, 0.2) + '"/>'; }).join('');
  };

  S.pour = function () {
    return bowl('none') + '<g class="fill"><ellipse class="wat" cx="120" cy="104" rx="54" ry="8"/></g>' +
      '<g transform="rotate(-38 160 40)"><path class="glass" d="M140 14h40l-4 50h-32z"/><path class="glassln" d="M180 22q12 2 8 22l-8 4"/><path class="wat" d="M143.5 32h33l-2.6 31h-27.8z"/></g>' +
      '<line class="stream" x1="128" y1="44" x2="122" y2="100"/>';
  };

  S.serve = function () {
    return '<ellipse class="plate" cx="120" cy="122" rx="74" ry="17"/><ellipse class="plate2" cx="120" cy="120" rx="50" ry="10"/>' +
      '<g class="drop-in"><path class="food" d="M90 118q0-26 30-26t30 26z"/><path class="green" d="M108 96l6-6 6 6M124 98l6-5 5 6"/></g>' +
      steam([106, 134], 78, 'slow') +
      '<path class="spark" d="M50 70l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/><path class="spark" style="animation-delay:-.7s" d="M192 58l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>';
  };

  S.blend = function () {
    return stove('aus') + pot('sauce') + '<path class="vortex" d="M86 80q34 14 68 0"/>' +
      '<g class="vib"><rect class="body" x="110" y="6" width="20" height="40" rx="8"/><rect class="met2" x="116" y="46" width="8" height="28" rx="3"/><path class="met" d="M108 74h24l4 10h-32z"/></g>' +
      '<circle class="sdrop" cx="96" cy="72" r="2.5"/><circle class="sdrop" style="animation-delay:-.4s" cx="146" cy="70" r="2.5"/><circle class="sdrop" style="animation-delay:-.8s" cx="108" cy="70" r="2"/>';
  };

  S.grill = function () {
    return '<line class="leg" x1="74" y1="126" x2="64" y2="152"/><line class="leg" x1="166" y1="126" x2="176" y2="152"/>' +
      '<path class="body" d="M46 98h148l-14 30H60z"/><circle class="coal" cx="84" cy="104" r="6"/><circle class="coal" style="animation-delay:-.5s" cx="108" cy="106" r="6"/><circle class="coal" style="animation-delay:-1s" cx="134" cy="104" r="6"/><circle class="coal" style="animation-delay:-.3s" cx="158" cy="106" r="6"/>' +
      flames(120, 100, 'mittel').replace('scale(0.9)', 'scale(0.9 0.7)') +
      '<line class="grid" x1="44" y1="94" x2="196" y2="94"/>' +
      '<g class="sizzle"><rect class="meat" x="78" y="78" width="84" height="16" rx="8"/><path class="mark" d="M94 80l-6 12M110 80l-6 12M126 80l-6 12M142 80l-6 12"/></g>' +
      steam([98, 140], 70, 'smoke');
  };

  S.steam = function (o) {
    return stove(o.h || 'mittel') + pot('wat') + '<path class="met2" d="M70 52h100v24H70z"/><path class="holes" d="M80 66h4M94 66h4M108 66h4M122 66h4M136 66h4M150 66h4"/>' +
      '<ellipse class="met" cx="120" cy="50" rx="54" ry="8"/><rect class="met2" x="112" y="36" width="16" height="9" rx="4"/>' + steam([88, 104, 136, 152], 40, 'fast');
  };

  S.roll = function () {
    return board(126) + '<g class="spread"><ellipse class="dough" cx="120" cy="122" rx="64" ry="7"/></g>' +
      '<g class="rollx"><rect class="wood2" x="58" y="104" width="12" height="8" rx="3"/><rect class="wood2" x="170" y="104" width="12" height="8" rx="3"/><rect class="wood" x="68" y="100" width="104" height="16" rx="8"/><line class="hl" x1="80" y1="105" x2="160" y2="105"/></g>' +
      '<circle class="flour" cx="56" cy="118" r="2"/><circle class="flour" style="animation-delay:-.7s" cx="186" cy="116" r="2"/>';
  };

  S.cool = function () {
    return '<path class="rackln" d="M44 112h152M52 112v18M188 112v18M60 112v-2M80 112v-2M100 112v-2M120 112v-2M140 112v-2M160 112v-2M180 112v-2"/>' +
      '<path class="crust" d="M78 110v-10q0-20 42-20t42 20v10z"/>' + steam([96, 120, 144], 74, 'fade') +
      '<g transform="translate(196 34)"><g class="spin" style="--d:10s"><path class="snow" d="M0-14v28M-12-7l24 14M-12 7l24-14"/></g></g>';
  };

  S.chill = function () {
    return '<rect class="fridge" x="70" y="10" width="100" height="140" rx="12"/><line class="fridgeln" x1="70" y1="58" x2="170" y2="58"/>' +
      '<rect class="met2" x="150" y="24" width="6" height="24" rx="3"/><rect class="met2" x="150" y="70" width="6" height="40" rx="3"/>' +
      '<g transform="translate(120 104)"><g class="pulse"><path class="snow" d="M0-18v36M-16-9l32 18M-16 9l32-18"/></g></g>' +
      '<path class="mist" d="M60 140q12-8 24 0t24 0"/><path class="mist" style="animation-delay:-1s" d="M140 144q12-8 24 0t24 0"/>';
  };

  S.micro = function (o) {
    return '<rect class="body" x="28" y="30" width="184" height="104" rx="10"/><rect class="win" x="42" y="42" width="114" height="80" rx="6"/><rect class="glow2 ns" x="44" y="44" width="110" height="76" rx="5"/>' +
      '<ellipse class="plate" cx="99" cy="110" rx="40" ry="6"/><g class="turn"><path class="food" d="M86 108q0-16 13-16t13 16z"/></g>' +
      '<rect class="scr" x="166" y="46" width="36" height="16" rx="3"/><text class="led sm" x="184" y="58">' + mmss(o) + '</text>' +
      '<circle class="met" cx="184" cy="82" r="7"/><rect class="met2" x="172" y="100" width="24" height="8" rx="3"/>';
  };

  S.slow = function (o) {
    return '<path class="body" d="M50 80q0-10 10-10h120q10 0 10 10v44q0 18-20 18H70q-20 0-20-18z"/>' +
      '<rect class="scr" x="98" y="104" width="44" height="18" rx="4"/><text class="led sm" x="120" y="117">' + (o.lvl || 'LOW') + '</text>' +
      '<path class="sauce" d="M58 76h124v6H58z"/>' + bubbles(5, 'slow', 76) +
      '<path class="glass" d="M54 72q66-44 132 0z"/><rect class="body2" x="112" y="42" width="16" height="8" rx="4"/>' + steam([120], 38, 'slow');
  };

  S.pressure = function () {
    return stove('mittel') + pot('wat') + '<path class="met" d="M60 76q60-26 120 0z"/><rect class="metd" x="174" y="66" width="44" height="8" rx="4"/>' +
      '<rect class="met2" x="112" y="50" width="10" height="14" rx="2"/><circle class="gauge" cx="140" cy="62" r="7"/><g transform="translate(140 62)"><g class="needle"><line class="hand2" x1="0" y1="0" x2="0" y2="-5"/></g></g>' +
      '<g class="jet"><path class="stmj" d="M117 48q-4-10 0-20q4-10 0-20"/></g>';
  };

  S.prep = function () {
    return '<rect class="body2" x="60" y="122" width="120" height="16" rx="6"/><rect class="scr" x="100" y="126" width="40" height="9" rx="2"/><path class="met" d="M70 116h100l-4 6H74z"/>' +
      '<path class="bowl" d="M74 90q0 26 46 26t46-26z"/><ellipse class="bowlin" cx="120" cy="90" rx="46" ry="8"/>' +
      '<g class="dropin"><circle class="food" cx="110" cy="60" r="7"/></g><g class="dropin" style="animation-delay:-.7s"><rect class="green" x="124" y="54" width="12" height="12" rx="3"/></g><g class="dropin" style="animation-delay:-1.4s"><circle class="cheese" cx="100" cy="56" r="5"/></g>';
  };

  S.mash = function () {
    return stove('aus') + pot('mashf') + '<g class="press2"><rect class="wood" x="115" y="4" width="10" height="50" rx="5"/><rect class="met2" x="118" y="52" width="4" height="18" rx="2"/><path class="wire" d="M100 74l6-6 6 6 6-6 6 6 6-6 6 6 6-6"/></g>';
  };

  S.spread = function () {
    return board(126) + '<path class="bread" d="M60 124v-22q0-14 14-14h8q4-10 18-10h40q14 0 18 10h8q14 0 14 14v22z"/>' +
      '<g class="spread"><path class="butter" d="M70 100h100v6H70z"/></g>' +
      '<g class="rollx"><rect class="met2" x="100" y="94" width="40" height="6" rx="3" transform="rotate(-10 120 97)"/><rect class="body" x="140" y="82" width="30" height="8" rx="4" transform="rotate(-10 155 86)"/></g>';
  };

  S.layer = function () {
    var cols = ['sauce', 'dough', 'cheese', 'sauce', 'dough'];
    return '<path class="dishglass" d="M56 56h128v74q0 8-8 8H64q-8 0-8-8z"/>' +
      cols.map(function (c, i) { return '<rect class="' + c + ' ns lay" x="60" y="' + (122 - i * 14) + '" width="120" height="12" rx="2" style="animation-delay:' + (i * 0.5) + 's"/>'; }).join('');
  };

  var ALIAS = { wok: 'flip', saute: 'fry', roast: 'bake', cook: 'boil', melt: 'stir', reduce: 'simmer', puree: 'blend', marinate: 'rest', proof: 'rest', form: 'shape', fill: 'shape', beat: 'mix' };

  window.ANIM = {
    has: function (a) { return !!S[ALIAS[a] || a]; },
    norm: function (a) { a = ALIAS[a] || a; return S[a] ? a : 'prep'; },
    scene: function (a, o, ctx) {
      a = ALIAS[a] || a;
      var f = S[a] || S.prep;
      return '<svg class="scene sc-' + a + '" viewBox="0 0 240 160" aria-hidden="true" focusable="false"><g class="sc">' + f(o || {}, ctx || {}) + '</g></svg>';
    }
  };
})();
