#!/usr/bin/env python3
"""Dritte Runde der Fotozuordnung für Rezepte ohne Foto. Nur echte Fotos mit freier Lizenz.

Stufe D: Wikidata. Gerichte mit Foto aus allen Sprachen (auch ohne deutschen oder englischen Wikipedia-Artikel).
         Angenommen nur bei gleichem Namen und wenn die Beschreibung ein Gericht nennt.
Stufe C: Commons-Suche mit dem englischen Namen (deutsche Rezepte über tools/de_en_names.tsv).
Stufe M: TheMealDB (offene Rezeptdatenbank, gleicher Name in beide Richtungen).
Stufe O: Openverse (Flickr und andere Fotoplattformen, nur Creative-Commons- und gemeinfreie Fotos).
         Ohne Registrierung 200 Anfragen pro Tag; der Zwischenspeicher (CACHE) erlaubt Fortsetzen am nächsten Tag.

Quelle im Foto-Eintrag: 'd' = Wikidata, 'c' = Commons, 'o' = Openverse.
Aufruf: CACHE=cache.json python3 tools/match_images_round3.py [--ohne-openverse] [--openverse-max N]
"""
import json, os, re, sys, time, urllib.request, urllib.parse
sys.path.insert(0, os.path.dirname(__file__))
from match_images import credits, short_path, GOOD_EXT, BAD_NAME, chunks, UA
from match_images_more import api, flush, tokens, fold, stem, clean_name, content_words, subphrases, DISH, NOT_DISH, GENERIC, _C, _CF
from fix_small_images import clean_artist
import photo_filter

TITLE = {}   # rid -> Titel der Fundstelle (Wikidata-Label, TheMealDB-Name, Openverse-Fototitel) für photo_filter

OV_LIC = {'cc0': 'CC0', 'pdm': 'gemeinfrei', 'by': 'CC BY', 'by-sa': 'CC BY-SA', 'by-nd': 'CC BY-ND', 'by-nc': 'CC BY-NC',
          'by-nc-sa': 'CC BY-NC-SA', 'by-nc-nd': 'CC BY-NC-ND'}

def overlap_ok(want, have):
    want = set(want)
    if not want: return False
    need = len(want) if len(want) <= 2 else max(2, (len(want) * 2 + 2) // 3)
    return len(want & set(have)) >= need

def query_name(r, de):
    return de.get(r.get('on', r['n'])) if r['l'] == 'de' and de.get(r.get('on', r['n'])) else clean_name(r.get('on', r['n']))

# ---------- Stufe D: Wikidata ----------
def wikidata_round(todo, de):
    hits = {}
    for k, (rid, r) in enumerate(todo.items()):
        q = query_name(r, de)
        cands = [(q, 'en')] + ([(clean_name(r.get('on', r['n'])), 'de')] if r['l'] == 'de' else [])
        for text, lang in cands:
            d = api('www.wikidata.org', {'action': 'wbsearchentities', 'search': text, 'language': lang, 'uselang': 'en', 'type': 'item', 'limit': '7'})
            for e in d.get('search', []):
                label = e.get('label') or ''
                desc = e.get('description') or ''
                names = [label] + [a for a in (e.get('aliases') or [])]
                if not any(fold(n) == fold(text) for n in names): continue
                if not DISH.search(desc) or NOT_DISH.search(desc): continue
                if (fold(label) in GENERIC or stem(fold(label)) in GENERIC) and len(content_words(text)) > 1: continue
                hits[rid] = e['id']; TITLE[rid] = label; break
            if rid in hits: break
        if k % 200 == 0: print('  Wikidata', k, 'von', len(todo), '| Treffer', len(hits), flush=True)
    files = {}
    ids = sorted(set(hits.values()))
    for part in chunks(ids, 50):
        d = api('www.wikidata.org', {'action': 'wbgetentities', 'ids': '|'.join(part), 'props': 'claims'})
        for qid, ent in (d.get('entities') or {}).items():
            for c in (ent.get('claims') or {}).get('P18', []):
                f = ((c.get('mainsnak') or {}).get('datavalue') or {}).get('value')
                if f and GOOD_EXT.search(f) and not BAD_NAME.search(f): files[qid] = f; break
    return {rid: files[q] for rid, q in hits.items() if q in files}

# ---------- Stufe C: Commons mit englischem Namen ----------
def commons_round(todo, de):
    found = {}
    for k, (rid, r) in enumerate(todo.items()):
        q = query_name(r, de)
        want = tokens(q)
        if not want: continue
        d = api('commons.wikimedia.org', {'action': 'query', 'list': 'search', 'srnamespace': '6', 'srlimit': '15', 'srprop': '',
                                          'srsearch': q + ' filetype:bitmap'})
        for hit in d.get('query', {}).get('search', []):
            f = hit['title'][5:]
            if not GOOD_EXT.search(f) or BAD_NAME.search(f): continue
            if overlap_ok(want, tokens(re.sub(r'\.\w+$', '', f))): found[rid] = f; break
        if k % 200 == 0: print('  Commons', k, 'von', len(todo), '| Treffer', len(found), flush=True)
    return found

# ---------- Stufe M: TheMealDB (offene Rezeptdatenbank mit Fotos, öffentlicher Test-Schlüssel 1) ----------
def mealdb_round(todo, de):
    found = {}
    for k, (rid, r) in enumerate(todo.items()):
        q = query_name(r, de)
        want = tokens(q)
        if not want: continue
        key = 'mealdb?' + q
        if key not in _C:
            try:
                with urllib.request.urlopen(urllib.request.Request('https://www.themealdb.com/api/json/v1/1/search.php?' + urllib.parse.urlencode({'s': q}), headers=UA), timeout=30) as resp:
                    _C[key] = json.loads(resp.read().decode('utf8'))
            except Exception:
                continue
            time.sleep(0.5)
        for m in (_C[key].get('meals') or []):
            name = m.get('strMeal') or ''
            if overlap_ok(want, tokens(name)) and overlap_ok(tokens(name), want) and m.get('strMealThumb'):
                found[rid] = [m['strMealThumb'], 'TheMealDB', '', 'https://www.themealdb.com/meal/' + m['idMeal'], 'm']; TITLE[rid] = name; break
        if k % 200 == 0: print('  TheMealDB', k, 'von', len(todo), '| Treffer', len(found), flush=True)
    flush()
    return found

# ---------- Stufe O: Openverse ----------
def openverse(q):
    k = 'openverse?' + q
    if k in _C: return _C[k]
    url = 'https://api.openverse.org/v1/images/?' + urllib.parse.urlencode({'q': q, 'category': 'photograph', 'page_size': '20', 'mature': 'false'})
    for i in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as resp:
                d = json.loads(resp.read().decode('utf8'))
            break
        except urllib.error.HTTPError as e:
            if e.code == 429: return None            # Tageslimit erreicht
            time.sleep(10 * (i + 1))
        except Exception:
            time.sleep(10 * (i + 1))
    else:
        return None
    _C[k] = d
    if _CF: json.dump(_C, open(_CF, 'w'))
    time.sleep(3.2)                                   # höchstens 20 pro Minute
    return d

def openverse_round(todo, de, mx):
    found, asked = {}, 0
    for rid, r in todo.items():
        q = query_name(r, de)
        want = tokens(q)
        if not want: continue
        cached = ('openverse?' + q) in _C
        if not cached and asked >= mx: continue
        d = openverse(q)
        if d is None: print('  Openverse: Tageslimit erreicht', flush=True); break
        if not cached: asked += 1
        for x in d.get('results', []):
            if x.get('license') not in OV_LIC or not x.get('url') or not x.get('foreign_landing_url'): continue
            if (x.get('width') or 0) and x['width'] < 400: continue
            title = x.get('title') or ''
            have = tokens(title) + [t for tag in (x.get('tags') or [])[:12] for t in tokens(tag.get('name', ''))]
            if not overlap_ok(want, tokens(title)) and not (len(set(want)) >= 2 and overlap_ok(want, have) and overlap_ok(want[-1:], tokens(title))):
                continue
            lic = OV_LIC[x['license']] + (' ' + x['license_version'] if x.get('license_version') and x['license'] not in ('cc0', 'pdm') else '')
            found[rid] = [x['url'], clean_artist(x.get('creator') or ''), lic, x['foreign_landing_url'], 'o']; TITLE[rid] = title; break
    print('  Openverse: neue Anfragen', asked, '| Treffer', len(found), flush=True)
    return found

def main():
    de = {}
    p = os.path.join(os.path.dirname(__file__), 'de_en_names.tsv')
    for line in open(p, encoding='utf8'):
        if '\t' in line: a, b = line.rstrip('\n').split('\t', 1); de[a] = b
    cf = sorted(f for f in os.listdir('data/web') if f.startswith('chunk-'))
    data = {}
    for f in cf:
        t = open('data/web/' + f).read(); a = t.index('KA_WEB_CHUNK(')
        data[f] = (t[:a], int(t[a + 13:t.index(',', a)]), json.loads(t[t.index(',', a) + 1:t.rindex(')')]))
    web = {r['i']: r for f in cf for r in data[f][2]}
    todo = {rid: r for rid, r in web.items() if not r.get('im') and r.get('on', r['n']) not in ('Rezeptvorlage Text', 'Vorlage:Rezept')}
    print('ohne Foto:', len(todo), 'von', len(web), flush=True)
    new = {}

    dfiles = wikidata_round(todo, de)
    cred = credits('commons.wikimedia.org', list(set(dfiles.values())))
    for rid, f in dfiles.items():
        if f in cred: art, lic, th = cred[f]; new[rid] = [short_path(th), clean_artist(art), lic, f, 'd']
    print('nach Wikidata:', len(new), flush=True)

    rest = {rid: r for rid, r in todo.items() if rid not in new}
    cfiles = commons_round(rest, de)
    cred = credits('commons.wikimedia.org', list(set(cfiles.values())))
    for rid, f in cfiles.items():
        if f in cred: art, lic, th = cred[f]; new[rid] = [short_path(th), clean_artist(art), lic, f, 'c']
    print('nach Commons:', len(new), flush=True)

    rest = {rid: r for rid, r in todo.items() if rid not in new}
    new.update(mealdb_round(rest, de))
    print('nach TheMealDB:', len(new), flush=True)

    if '--ohne-openverse' not in sys.argv:
        mx = int(sys.argv[sys.argv.index('--openverse-max') + 1]) if '--openverse-max' in sys.argv else 195
        rest = {rid: r for rid, r in todo.items() if rid not in new}
        new.update(openverse_round(rest, de, mx))
    flush()

    # Prüfung wie in photo_filter.py; Protokoll im selben Format [host, datei, quelle, titel, name]
    HOST = {'d': 'commons.wikimedia.org', 'c': 'commons.wikimedia.org', 'm': 'www.themealdb.com', 'o': 'api.openverse.org'}
    log = {rid: [HOST[im[4]], im[3], im[4], TITLE.get(rid, ''), web[rid].get('on', web[rid]['n'])] for rid, im in new.items()}
    bad = photo_filter.judge(log)
    print('Prüfung: abgelehnt', len(bad), 'von', len(new), flush=True)
    if os.environ.get('MATCH_LOG'):
        json.dump(log, open(os.environ['MATCH_LOG'], 'w'), ensure_ascii=False)
        with open(os.environ['MATCH_LOG'] + '.abgelehnt.txt', 'w') as out:
            for rid, why in sorted(bad.items(), key=lambda a: a[1]):
                out.write('%s | %s | %s | %s\n' % (log[rid][4], log[rid][3], log[rid][1], why))
    for rid in bad: del new[rid]

    for f in cf:
        head, num, arr = data[f]
        for r in arr:
            if not r.get('im') and r['i'] in new: r['im'] = new[r['i']]
        open('data/web/' + f, 'w').write(head + 'KA_WEB_CHUNK(%d,' % num + json.dumps(arr, ensure_ascii=False, separators=(',', ':')) + ');\n')
    imgs = {r['i']: r['im'] for f in cf for r in data[f][2] if r.get('im')}
    t = open('data/web/index.js').read(); idx = json.loads(t[t.index('=') + 1:t.rindex(';')])
    for e in idx:
        im = imgs.get(e[0]); e[8] = 1 if im else 0
        e[10:11] = [[im[0], im[3], im[4]] if im else 0]   # e[11] (Originalname) bleibt erhalten
    open('data/web/index.js', 'w').write(t[:t.index('=') + 1] + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('FERTIG neu:', len(new), '| mit Foto gesamt:', len(imgs), 'von', len(web), flush=True)

if __name__ == '__main__':
    main()
