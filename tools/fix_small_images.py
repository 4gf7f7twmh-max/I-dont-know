#!/usr/bin/env python3
"""Nacharbeit an den Fotodaten (data/images.js, data/web/chunk-*.js, data/web/index.js).

1. Fotos, deren Original schmaler als 960 px ist, haben keine 960er-Vorschau. Wikimedia liefert die
   Originale nicht zuverlässig aus, die Vorschaugrößen 500, 330 und 250 px aber schon. Solche Fotos
   bekommen den Pfad der größten passenden Vorschau.
2. Fotografennamen: E-Mail-Adressen, Kamera-Angaben und Bitten um Kontakt werden entfernt.

Aufruf: python3 tools/fix_small_images.py
"""
import json, os, re, sys, time
sys.path.insert(0, os.path.dirname(__file__))
from match_images import api, chunks

STEPS = (500, 330, 250)
UP = 'https://upload.wikimedia.org/wikipedia/commons/'

def clean_artist(a):
    a = re.sub(r'\S+\s*(@|\[at\])\s*\S+', '', a)
    m = re.search(r'\.(jpe?g|png|tiff?)\s+derivative work:?\s*(.+)$', a, re.I)
    if m: a = m.group(2)
    a = re.split(r"\s+(I'd|I would|Please|Bitte|Canon|Nikon|Sony|derivative work)\b", a)[0]
    a = re.sub(r'\(\s*User:[^)]*\)|\(\s*\)', '', a)
    a = re.sub(r'\s+', ' ', a).strip(' ,;:-(')
    m = re.match(r'^(.+?) \( \1 \)$', a)
    return (m.group(1) if m else a)[:60] or 'unbekannt'

def widths(files):
    out = {}
    for part in chunks(sorted(set(files)), 50):
        d = api('commons.wikimedia.org', {'action': 'query', 'titles': '|'.join('File:' + f for f in part), 'prop': 'imageinfo', 'iiprop': 'size'})
        q = d.get('query', {})
        norm = {n['to']: n['from'] for n in q.get('normalized', [])}
        for pg in q.get('pages', []):
            ii = (pg.get('imageinfo') or [None])[0]
            if ii: out[norm.get(pg['title'], pg['title'])[5:]] = ii.get('width', 0)
        time.sleep(1.0)
    return out

def fix(im, wmap):
    if not im: return im
    im[1] = clean_artist(im[1]) if im[1] else im[1]
    if not im[0].startswith(UP): return im
    w = wmap.get(im[3], 0)
    rel = im[0][len(UP):]                      # a/ab/Datei.jpg
    name = rel.split('/')[-1]
    for s in STEPS:
        if w > s:
            im[0] = rel + '/' + str(s) + 'px-' + name
            break
    return im

def main():
    p = 'data/images.js'; t = open(p).read(); a = t.index('KA_IMG=') + 7
    own = json.loads(t[a:t.rindex(';')])
    cf = sorted(f for f in os.listdir('data/web') if f.startswith('chunk-'))
    data = {}
    for f in cf:
        s = open('data/web/' + f).read(); b = s.index('KA_WEB_CHUNK(')
        data[f] = (s[:b], int(s[b + 13:s.index(',', b)]), json.loads(s[s.index(',', b) + 1:s.rindex(')')]))
    ims = list(own.values()) + [r['im'] for f in cf for r in data[f][2] if r.get('im')]
    small = [im[3] for im in ims if im[0].startswith(UP)]
    print('Fotos gesamt', len(ims), '| ohne 960er-Vorschau', len(small), flush=True)
    wmap = widths(small)
    for im in ims: fix(im, wmap)
    print('danach ohne Vorschau:', sum(1 for im in ims if im[0].startswith(UP)), flush=True)
    open(p, 'w').write(t[:a] + json.dumps(own, ensure_ascii=False, separators=(',', ':')) + ';\n')
    for f in cf:
        head, num, arr = data[f]
        open('data/web/' + f, 'w').write(head + 'KA_WEB_CHUNK(%d,' % num + json.dumps(arr, ensure_ascii=False, separators=(',', ':')) + ');\n')
    imgs = {r['i']: r['im'] for f in cf for r in data[f][2] if r.get('im')}
    s = open('data/web/index.js').read(); idx = json.loads(s[s.index('=') + 1:s.rindex(';')])
    for e in idx:
        im = imgs.get(e[0]); e[8] = 1 if im else 0
        e[10:11] = [[im[0], im[3], im[4]] if im else 0]   # e[11] (Originalname) bleibt erhalten
    open('data/web/index.js', 'w').write(s[:s.index('=') + 1] + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')

if __name__ == '__main__':
    main()
