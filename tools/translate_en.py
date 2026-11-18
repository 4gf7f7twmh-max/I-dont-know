#!/usr/bin/env python3
"""Übersetzt Namen und Zutaten der englischen Wikibooks-Rezepte ins Deutsche.

Die Übersetzungen liegen als Tabellen (englisch TAB deutsch) in tools/translations/:
  names.tsv   Rezeptnamen
  cores.tsv   Zutaten ohne Menge und Einheit, kleingeschrieben ("freshly grated parmesan cheese")
  preps.tsv   Zusätze nach dem Komma und Klammertexte ("finely chopped", "(optional)")
  heads.tsv   Zwischenüberschriften in Zutatenlisten ("#Brownie")
Mengen und Einheiten übersetzt das Skript selbst, Unzen, Pfund und US-Hohlmaße rechnet es in Gramm und Milliliter um.

  python3 tools/translate_en.py --fehlend DIR   schreibt fehlende Einträge nach DIR/missing_*.txt
  python3 tools/translate_en.py                 übersetzt Chunks und Index

Der Originalname bleibt im Feld 'on' (für die Suche und die Foto-Werkzeuge), die Originalzutaten im Feld 'og'.
Das Skript startet immer von den Originalen und kann beliebig oft laufen.
"""
import json, os, re, sys
from fractions import Fraction

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
WEB = os.path.join(ROOT, 'data', 'web')
TR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'translations')

FRAC = {'½': '1/2', '¼': '1/4', '¾': '3/4', '⅓': '1/3', '⅔': '2/3', '⅛': '1/8', '⅜': '3/8', '⅝': '5/8', '⅞': '7/8'}
QTY = re.compile(r'^\s*((?:\d+(?:[.,]\d+)?|[½¼¾⅓⅔⅛⅜⅝⅞])(?:\s*(?:\d+/\d+|[½¼¾⅓⅔⅛⅜⅝⅞]))?(?:/\d+)?'
                 r'(?:\s*(?:-|–|to|or)\s*(?:\d+(?:[.,]\d+)?|[½¼¾⅓⅔⅛⅜⅝⅞])(?:\s*(?:\d+/\d+|[½¼¾⅓⅔⅛⅜⅝⅞]))?(?:/\d+)?)?)\s*(?:x\s+)?')

# Einheit: (Muster, deutsch Einzahl, deutsch Mehrzahl, Umrechnung (Faktor, Zieleinheit) oder None)
UNITS = [
    (r'(?:us\s+)?(?:fl\.?|fluid)\s?(?:oz|ounces?)\.?', '', '', (30, 'ml')),
    (r'cups?|c\.', 'Tasse', 'Tassen', None),
    (r'(?-i:T)\.?', 'EL', 'EL', None),             # T = Esslöffel, t = Teelöffel (nur genaue Schreibung)
    (r'(?-i:t)\.?', 'TL', 'TL', None),
    (r'tablespoons?|tbsps?\.?|tbs\.?|tbl\.?', 'EL', 'EL', None),
    (r'teaspoons?|tsps?\.?', 'TL', 'TL', None),
    (r'ounces?|oz\.?', '', '', (28.35, 'g')),
    (r'pounds?|lbs?\.?', '', '', (453.6, 'g')),
    (r'quarts?|qts?\.?', '', '', (946, 'ml')),
    (r'pints?|pts?\.?', '', '', (473, 'ml')),
    (r'gallons?|gal\.?', '', '', (3785, 'ml')),
    (r'sticks?', '', '', (113, 'g')),          # US-Butterstange
    (r'inch(?:es)?|in\.', '', '', (2.5, 'cm')),
    (r'kilograms?|kilos?|kg', 'kg', 'kg', None),
    (r'grams?|grammes?|g', 'g', 'g', None),
    (r'millilit(?:er|re)s?|ml|mL', 'ml', 'ml', None),
    (r'centilit(?:er|re)s?|cl', 'cl', 'cl', None),
    (r'decilit(?:er|re)s?|dl', 'dl', 'dl', None),
    (r'lit(?:er|re)s?|l|L', 'l', 'l', None),
    (r'centimet(?:er|re)s?|cm', 'cm', 'cm', None),
    (r'pinch(?:es)?', 'Prise', 'Prisen', None),
    (r'dash(?:es)?', 'Spritzer', 'Spritzer', None),
    (r'cloves?', 'Zehe', 'Zehen', None),
    (r'cans?|tins?', 'Dose', 'Dosen', None),
    (r'packages?|pkgs?\.?|packets?|packs?', 'Packung', 'Packungen', None),
    (r'slices?', 'Scheibe', 'Scheiben', None),
    (r'pieces?|pcs?\.?', 'Stück', 'Stück', None),
    (r'bunch(?:es)?', 'Bund', 'Bund', None),
    (r'sprigs?', 'Zweig', 'Zweige', None),
    (r'handfuls?', 'Handvoll', 'Handvoll', None),
    (r'heads?', 'Kopf', 'Köpfe', None),
    (r'stalks?', 'Stange', 'Stangen', None),
    (r'jars?', 'Glas', 'Gläser', None),
    (r'bottles?', 'Flasche', 'Flaschen', None),
    (r'envelopes?|sachets?', 'Tütchen', 'Tütchen', None),
    (r'containers?|tubs?', 'Becher', 'Becher', None),
    (r'drops?', 'Tropfen', 'Tropfen', None),
    (r'leaves|leaf', 'Blatt', 'Blätter', None),
    (r'ea\.?|each', '', '', 'drop'),
]
UNIT_RE = [(re.compile(r'^-?(?:%s)(?=[\s,(]|$)\.?\s*(?:of\s+)?' % p, re.I), s, pl, cv) for p, s, pl, cv in UNITS]
METRIC_IN_PAREN = re.compile(r'(\d+(?:[.,]\d+)?(?:\s*[-–]\s*\d+(?:[.,]\d+)?)?)\s*(g|kg|ml|l|cl|dl)\b', re.I)
US_ONLY = re.compile(r'(?:(?:about|approx\.?|approximately|each|total|ea\.?|fl\.?|oz\.?|ounces?|lbs?\.?|pounds?|inch(?:es)?|in\.|cups?|c\.|tbsp\.?|tsp\.?|tablespoons?|teaspoons?|sticks?|pints?|quarts?)\s*)+', re.I)
TASTE = re.compile(r'\s+(or\s+to\s+taste|to\s+taste|as\s+needed|as\s+required)$', re.I)


def num(q):
    """Erste Zahl einer Mengenangabe als Fraction, sonst None."""
    q = q.strip()
    for k, v in FRAC.items(): q = q.replace(k, ' ' + v)
    q = re.split(r'\s*(?:-|–|to|or)\s*', q)[0].strip().replace(',', '.')
    try:
        return sum(Fraction(p) for p in q.split())
    except (ValueError, ZeroDivisionError):
        return None


def nice(x, unit):
    if unit in ('g', 'ml'):
        step = 5 if x < 200 else (10 if x < 1000 else 50)
        v = max(step if x > 0 else 0, round(x / step) * step)
        if v >= 1000: return ('%g' % (v / 1000)).replace('.', ','), 'kg' if unit == 'g' else 'l'
        return '%d' % v, unit
    return ('%g' % round(x, 1)).replace('.', ','), unit


def split_outside(s, sep=','):
    out, depth, cur = [], 0, ''
    for ch in s:
        if ch == '(': depth += 1
        elif ch == ')': depth = max(0, depth - 1)
        if ch == sep and depth == 0: out.append(cur); cur = ''
        else: cur += ch
    out.append(cur)
    return [p.strip() for p in out]


def parse(line):
    """-> dict(q, unit, conv, paren[], core, preps[]) oder {'head': text}"""
    if line.startswith('#'): return {'head': line[1:].strip()}
    s = re.sub(r'\bboneless,\s*skinless\b', 'boneless skinless', line.strip(), flags=re.I)
    s = re.sub(r'\bskinless,\s*boneless\b', 'skinless boneless', s, flags=re.I)
    m = QTY.match(s)
    q = m.group(1).strip() if m else ''
    s = s[m.end():] if m else s
    parens = []
    pm = re.match(r'^\(([^()]*)\)\s*', s) if q else None
    if pm: parens.append(pm.group(1).strip()); s = s[pm.end():]
    unit = None
    for rx, sg, pl, cv in UNIT_RE:
        um = rx.match(s)
        if um and (q or cv is None and sg in ('Prise', 'Spritzer', 'Handvoll')):
            unit = (sg, pl, cv); s = s[um.end():]; break
    def grab(mm): parens.append(mm.group(1).strip()); return ' '
    head, *rest = split_outside(s)
    head = re.sub(r'\(([^()]*)\)', grab, head)
    head = re.sub(r'\s+', ' ', head).strip()
    preps = [p for p in rest if p]
    tm = TASTE.search(head)
    if tm: head = head[:tm.start()].strip(); preps.insert(0, tm.group(1).lower())
    head = re.sub(r'^of\s+', '', head)
    return {'q': q, 'unit': unit, 'paren': parens, 'core': head, 'preps': preps}


def paren_metric(p):
    m = METRIC_IN_PAREN.search(p)
    if not m: return None
    v, u = m.group(1), m.group(2).lower()
    if '/' in p or 'oz' in p.lower() or re.fullmatch(r'\s*' + re.escape(m.group(0)) + r'\s*', p): return v + ' ' + u
    return None


def load(name):
    d = {}
    path = os.path.join(TR, name)
    if os.path.exists(path):
        for ln in open(path, encoding='utf8'):
            ln = ln.rstrip('\n')
            if '\t' in ln and not ln.startswith('# '):
                a, b = ln.split('\t', 1); d[a] = b
    return d


def translate_line(line, T, miss):
    p = parse(line)
    if 'head' in p:
        de = T['heads'].get(p['head'])
        if de is None: miss['heads'].add(p['head']); return line
        return '#' + de
    core_key = p['core'].lower()
    core = T['cores'].get(core_key)
    if core is None:
        if core_key: miss['cores'].add(core_key)
        core = p['core']
    out_q, extra = p['q'], []
    metric = None
    for par in p['paren']:
        mm = paren_metric(par)
        if mm and metric is None: metric = mm; continue
        if US_ONLY.fullmatch(re.sub(r'[\d\s.,/½¼¾⅓⅔⅛⅜⅝⅞+~≈–-]+', ' ', par).strip() or 'x'):
            um = re.search(r'(\d+(?:[.,]\d+)?(?:\s*[½¼¾⅓⅔⅛])?|[½¼¾⅓⅔⅛])\s*-?\s*(oz|ounces?|lbs?|pounds?)\b', par, re.I)
            if um and metric is None and not (p['unit'] and (p['unit'][2] or p['unit'][0] in ('g', 'kg', 'ml', 'l', 'cl', 'dl'))) and num(um.group(1)) is not None:
                f = 28.35 if um.group(2).lower().startswith('o') else 453.6
                v, u = nice(float(num(um.group(1))) * f, 'g'); metric = v + ' ' + u
            continue                               # nur US-Maße in der Klammer
        de = T['preps'].get('(' + par.lower() + ')')
        if de is None: miss['preps'].add('(' + par.lower() + ')'); de = par
        if '(' in de: de = re.sub(r'\s*\(([^()]*)\)', r', \1', de)    # keine Klammer in der Klammer
        if de: extra.append('(' + de + ')')
    unit_txt = ''
    if p['unit']:
        sg, pl, cv = p['unit']
        if cv == 'drop':
            if metric: extra.insert(0, '(' + metric + ')'); metric = None
        elif cv and metric and cv[1] != 'cm':
            out_q, unit_txt, metric = metric, '', None       # Gramm/Milliliter aus der Klammer statt US-Maß
        elif cv:
            n = num(p['q']) if p['q'] else Fraction(1)
            if n is None: unit_txt = sg or {'g': 'Unzen', 'ml': 'fl oz', 'cm': 'Zoll'}[cv[1]]
            else: out_q, unit_txt = nice(float(n) * cv[0], cv[1])
        else:
            n = num(p['q']) if p['q'] else None
            unit_txt = sg if (n is not None and n <= 1 and not re.search(r'[-–]|to|or', p['q'])) else pl
    if metric and p['unit'] and p['unit'][0] in ('Tasse', 'Tassen'):
        out_q, unit_txt, metric = metric, '', None
    if metric: extra.insert(0, '(' + metric + ')')
    preps = []
    for pr in p['preps']:
        de = T['preps'].get(pr.lower())
        if de is None: miss['preps'].add(pr.lower()); de = pr
        if de: preps.append(de)
    out_q = out_q.replace('.', ',') if re.fullmatch(r'\d+\.\d+', out_q or '') else out_q
    for k, v in FRAC.items():
        out_q = re.sub(r'(\d)' + k, r'\1 ' + k, out_q)
    txt = ' '.join(x for x in [out_q, unit_txt, ' '.join(extra) if extra and not core else '', core] if x)
    if extra and core: txt += ' ' + ' '.join(extra)
    if preps: txt += ', ' + ', '.join(preps)
    return re.sub(r'\s+', ' ', txt).strip()


def chunk_files():
    return sorted(f for f in os.listdir(WEB) if f.startswith('chunk-'))


def read_chunk(f):
    s = open(os.path.join(WEB, f), encoding='utf8').read()
    m = re.match(r'^(.*?KA_WEB_CHUNK\(\s*\d+\s*,\s*)(\[.*\])(\s*\)\s*;?\s*)$', s, re.S)
    return m.group(1), json.loads(m.group(2)), m.group(3)


def main():
    T = {k: load(k + '.tsv') for k in ('names', 'cores', 'preps', 'heads')}
    miss = {k: set() for k in T}
    dump = sys.argv[2] if len(sys.argv) > 2 and sys.argv[1] == '--fehlend' else None
    names = {}
    for f in chunk_files():
        pre, recs, post = read_chunk(f)
        for r in recs:
            if r.get('l') != 'en': continue
            on = r.get('on', r['n']); og = r.get('og', r['g'])
            de = T['names'].get(on)
            if de is None: miss['names'].add(on); de = on
            gl = [translate_line(x, T, miss) for x in og]
            names[r['i']] = de
            if dump: continue
            r['on'], r['og'] = on, og
            r['n'], r['g'] = de, gl
            if r['n'] == on: r.pop('on')
            if r['g'] == og: r.pop('og')
        if not dump:
            open(os.path.join(WEB, f), 'w', encoding='utf8').write(pre + json.dumps(recs, ensure_ascii=False, separators=(',', ':')) + post)
    if dump:
        for k, v in miss.items():
            open(os.path.join(dump, 'missing_%s.txt' % k), 'w', encoding='utf8').write('\n'.join(sorted(v)) + ('\n' if v else ''))
        print('fehlend:', {k: len(v) for k, v in miss.items()})
        return
    p = os.path.join(WEB, 'index.js')
    s = open(p, encoding='utf8').read()
    m = re.match(r'^(.*?KA_WEB_INDEX\s*=\s*)(\[.*\])(\s*;?\s*)$', s, re.S)
    idx = json.loads(m.group(2))
    for e in idx:
        if e[0] in names:
            if len(e) < 12: e.extend([0] * (12 - len(e)))
            orig = e[11] or e[1]
            e[1] = names[e[0]]
            e[11] = orig if orig != e[1] else 0
    open(p, 'w', encoding='utf8').write(m.group(1) + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + m.group(3))
    print('übersetzt:', len(names), 'Rezepte | noch fehlend:', {k: len(v) for k, v in miss.items()})


if __name__ == '__main__':
    main()
