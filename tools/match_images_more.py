#!/usr/bin/env python3
"""Zweite Runde der Fotozuordnung für Rezepte, die nach tools/match_images.py noch kein Foto haben.

Stufe A: Teilnamen des Rezepts als Wikipedia-Titel (längster Treffer gewinnt). Angenommen nur,
         wenn die Kurzbeschreibung des Artikels ihn als Gericht/Gebäck/Getränk ausweist.
Stufe B: Suche in den Dateien von Wikimedia Commons. Angenommen nur, wenn der Dateiname die
         wichtigen Wörter des Rezeptnamens enthält.
Quelle 'w' = Beispielfoto aus Wikipedia, 'c' = Beispielfoto aus Commons.

Aufruf: python3 tools/match_images_more.py
"""
import json, re, os, sys, time, unicodedata
sys.path.insert(0, os.path.dirname(__file__))
from match_images import api as _api, credits, short_path, GOOD_EXT, BAD_NAME, PREFIX, chunks

# Zwischenspeicher für API-Antworten (Umgebungsvariable CACHE), damit ein zweiter Lauf schnell geht
_CF = os.environ.get('CACHE'); _C = json.load(open(_CF)) if _CF and os.path.exists(_CF) else {}; _N = [0]
def api(host, params):
    k = host + '?' + json.dumps(params, sort_keys=True)
    if k in _C: return _C[k]
    for i in range(12):                       # bei Drosselung länger warten statt abbrechen
        try:
            d = _api(host, params, tries=4); break
        except RuntimeError:
            print('  gedrosselt, warte', 60 * (i + 1), 's', flush=True); time.sleep(60 * (i + 1))
    else:
        raise RuntimeError('API dauerhaft nicht erreichbar')
    time.sleep(1.0)
    if _CF:
        _C[k] = d; _N[0] += 1
        if _N[0] % 5 == 0: json.dump(_C, open(_CF, 'w'))
    return d
def flush():
    if _CF: json.dump(_C, open(_CF, 'w'))

DISH = re.compile(r'(dish|dishes|soup|stew|cake|bread|pastr|dessert|sauce|condiment|drink|beverage|cocktail|cookie|biscuit|salad|curry|pudding|snack|'
                  r'sandwich|\bpie\b|\btart|dumpling|noodle|pasta|porridge|casserole|confection|\bbun\b|flatbread|pancake|fritter|food|meal|appeti[sz]er|'
                  r'side dish|\bbeer\b|liqueur|\btea\b|coffee|candy|\bjam\b|spread|\bdip\b|omelet|\broll\b|doughnut|donut|muffin|sweet|chutney|pickle|'
                  r'sausage|stir.fry|kebab|skewer|rice dish|cheese dish|gericht|speise|suppe|eintopf|kuchen|torte|gebäck|backware|brot|getränk|'
                  r'nachtisch|süßspeise|soße|sauce|salat|auflauf|knödel|klöße|teigware|nudel|pfannkuchen|plätzchen|keks|wurst|snack|eis\b|creme|'
                  r'likör|cocktail|aufstrich|beilage|spezialität)', re.I)
NOT_DISH = re.compile(r'(species|genus|\bplant|\btree|cultivar|\bbird|animal|company|brand|\bfilm|\bsong|album|\bband\b|\btown|\bcity|village|river|'
                      r'person|footballer|politician|painting|novel|television|\bgame\b|pflanzenart|gattung|baum\b|vogel|unternehmen|marke|ort in|stadt in|'
                      r'gemeinde|fluss|spielfilm|lied\b|fernseh|chemical|compound|mineral|grain\b|cereal grass)', re.I)
# Allgemeinwörter: allein kein Treffer, wenn der Rezeptname noch mehr sagt (sonst bekäme jede Suppe dasselbe Suppenfoto)
GENERIC = set('soup suppe sauce sosse cake kuchen bread brot salad salat pie stew eintopf curry cookie cooky keks pudding rice reis pasta nudel noodle '
              'sandwich drink cocktail tea tee coffee kaffee dessert torte auflauf casserole dip spread jam marmelade muffin bar dressing glaze marinade '
              'filling fullung topping frosting icing dough teig sweet snack punch smoothie juice saft lemonade limonade porridge brei chutney relish fritter '
              'pancake waffle biscuit roll bun gratin quiche tart tarte sorbet eis ice cream creme mousse salsa gravy stock broth bruhe fond loaf '
              'chip cracker meal food gericht speise mehl flour sugar zucker butter oil'.split())
STOP = set('with and the for from style recipe recipes easy quick simple basic classic traditional homemade best mit und der die das den dem des von vom '
           'zum zur nach art aus auf ein eine einer einem einen fur für oder alla alle all del della di de la le les en et au aux a la mode im in an '
           'ohne vegan vegetarian vegetarisch vegane veganer low fat sugar free gluten glutenfrei grundrezept variante version style'.split())

def fold(s):
    s = s.lower().replace('ß', 'ss').replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue')
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')
def stem(w):
    for suf in ('es', 's', 'en', 'n', 'e'):
        if len(w) > 4 and w.endswith(suf): return w[:-len(suf)]
    return w
def tokens(s):
    return [stem(w) for w in re.findall(r'[a-z]{3,}', fold(s)) if w not in STOP]

def clean_name(n):
    n = re.sub(r'\s*\([^)]*\)', '', n)
    for _ in range(3): n = PREFIX.sub('', n)
    return re.sub(r'\s+', ' ', n).strip(' -,.')

def content_words(nm):
    return [w for w in re.split(r'[\s\-–/,&]+', nm) if w and fold(w) not in STOP and len(w) > 1]

def subphrases(name, lang='en'):
    """[(titel, wortzahl, enthält_letztes_inhaltswort, einzelwort_generisch)]"""
    out, seen = [], set()
    names = [clean_name(name)] + [m for m in re.findall(r'\(([^)]*)\)', name) if m[:1].isupper() and len(m.split()) <= 5]
    for nm in names:
        ws = [w for w in re.split(r'[\s\-–/,&]+', nm) if w]
        cw = content_words(nm)
        last = fold(cw[-1]) if cw else ''
        L = len(ws)
        for n in range(min(L, 5), 0, -1):
            for i in range(0, L - n + 1):
                seg = ws[i:i + n]
                if fold(seg[0]) in STOP or fold(seg[-1]) in STOP: continue
                ph = ' '.join(seg)
                if len(ph) < 3: continue
                has_last = fold(seg[-1]) == last
                if n == 1:
                    # Einzelwort nur, wenn es das letzte Inhaltswort ist (Gerichtsart) und nicht allgemein, oder der Name nur aus ihm besteht
                    generic = stem(fold(ph)) in GENERIC or fold(ph) in GENERIC
                    if len(cw) > 1 and (not has_last or generic): continue
                vs = [ph[:1].upper() + ph[1:], ph[:1].upper() + ph[1:].lower()]
                if lang == 'de' and n > 1:
                    j = ''.join(seg); vs.append(j[:1].upper() + j[1:].lower())
                for v in vs:
                    if v not in seen: seen.add(v); out.append((v, n, has_last))
    return out[:30]

LOG = {}
def wiki_round(host, todo):
    """todo: {rid: name} -> {rid: (datei, thumb)}"""
    tmap = {}
    for rid, name in todo.items():
        for ph, n, hl in subphrases(name, 'de' if host.startswith('de.') or re.search(r'[äöüß]', name) else 'en'): tmap.setdefault(ph, []).append((rid, (n, hl)))
    titles = list(tmap)
    print(host, len(todo), 'Rezepte,', len(titles), 'Teilnamen', flush=True)
    best = {}
    for k, part in enumerate(chunks(titles, 50)):
        d = api(host, {'action': 'query', 'titles': '|'.join(part), 'redirects': '1', 'prop': 'pageimages|pageprops|description',
                       'piprop': 'thumbnail|name', 'pithumbsize': '960', 'ppprop': 'disambiguation'})
        q = d.get('query', {})
        norm = {x['from']: x['to'] for x in q.get('normalized', [])}
        redir = {x['from']: x['to'] for x in q.get('redirects', [])}
        pages = {p['title']: p for p in q.get('pages', [])}
        for t in part:
            pg = pages.get(redir.get(norm.get(t, t), norm.get(t, t)))
            if not pg or pg.get('missing') or 'disambiguation' in (pg.get('pageprops') or {}): continue
            desc = pg.get('description') or ''
            img, th = pg.get('pageimage'), (pg.get('thumbnail') or {}).get('source')
            if not img or not th or not GOOD_EXT.search(img) or BAD_NAME.search(img): continue
            if not DISH.search(desc) or NOT_DISH.search(desc): continue
            ftitle = fold(pg['title'])
            for rid, n in tmap[t]:
                # Weiterleitung auf ein Allgemeinwort (z. B. "Lentil barley soup" -> "Soup") ablehnen
                if (ftitle in GENERIC or stem(ftitle) in GENERIC) and len(content_words(clean_name(todo[rid]))) > 1: continue
                if rid not in best or n > best[rid][0]: best[rid] = (n, img, th, pg['title'])
        if k % 20 == 0: print('  ', k * 50, 'von', len(titles), '| Treffer bisher', len(best), flush=True)
    LOG.update({rid: v[3] for rid, v in best.items()})
    return {rid: (v[1], v[2]) for rid, v in best.items()}

def commons_round(todo):
    found = {}
    print('Commons-Suche für', len(todo), 'Rezepte', flush=True)
    for k, (rid, name) in enumerate(todo.items()):
        nm = clean_name(name)
        want = tokens(nm)
        if not want: continue
        try:
            d = api('commons.wikimedia.org', {'action': 'query', 'list': 'search', 'srnamespace': '6', 'srlimit': '10', 'srprop': '',
                                              'srsearch': nm + ' filetype:bitmap'})
        except Exception:
            continue
        need = len(set(want)) if len(set(want)) <= 2 else max(2, (len(set(want)) * 2 + 2) // 3)
        for hit in d.get('query', {}).get('search', []):
            f = hit['title'][5:]
            if not GOOD_EXT.search(f) or BAD_NAME.search(f): continue
            have = set(tokens(re.sub(r'\.\w+$', '', f)))
            if len(set(want) & have) >= need:
                found[rid] = f; break
        if k % 200 == 0: print('  ', k, 'von', len(todo), '| Treffer', len(found), flush=True)
    return found

def main():
    chunk_files = sorted(f for f in os.listdir('data/web') if f.startswith('chunk-'))
    data = {}
    for f in chunk_files:
        t = open('data/web/' + f).read(); a = t.index('KA_WEB_CHUNK(')
        data[f] = (t[:a], int(t[a + 13:t.index(',', a)]), json.loads(t[t.index(',', a) + 1:t.rindex(')')]))
    web = [r for f in chunk_files for r in data[f][2]]
    todo = {r['i']: r for r in web if not r.get('im')}
    print('ohne Foto:', len(todo), 'von', len(web), flush=True)

    chosen = {}  # rid -> (host, datei, quelle)
    for host, lang in (('en.wikipedia.org', 'en'), ('de.wikipedia.org', 'de')):
        sub = {rid: r['n'] for rid, r in todo.items() if r['l'] == lang and rid not in chosen}
        for rid, (img, th) in wiki_round(host, sub).items(): chosen[rid] = (host, img.replace('_', ' '), 'w')
    # deutsche Rezepte zusätzlich in der englischen Wikipedia (viele Gerichtsnamen sind international)
    sub = {rid: r['n'] for rid, r in todo.items() if r['l'] == 'de' and rid not in chosen}
    for rid, (img, th) in wiki_round('en.wikipedia.org', sub).items(): chosen[rid] = ('en.wikipedia.org', img.replace('_', ' '), 'w')
    print('nach Wikipedia:', len(chosen), flush=True)
    rest = {rid: r['n'] for rid, r in todo.items() if rid not in chosen}
    for rid, f in commons_round(rest).items(): chosen[rid] = ('commons.wikimedia.org', f, 'c')
    print('nach Commons:', len(chosen), flush=True)

    by_host = {}
    for rid, (host, f, src) in chosen.items(): by_host.setdefault(host, set()).add(f)
    cred = {}
    for host, files in by_host.items():
        for k, v in credits(host, list(files)).items(): cred[(host, k)] = v
    n = 0
    for f in chunk_files:
        head, num, arr = data[f]
        for r in arr:
            if r.get('im') or r['i'] not in chosen: continue
            host, fn, src = chosen[r['i']]
            if (host, fn) not in cred: continue
            if os.environ.get('DRY'): continue
            art, lic, th = cred[(host, fn)]
            r['im'] = [short_path(th), art, lic, fn, src]; n += 1
        open('data/web/' + f, 'w').write(head + 'KA_WEB_CHUNK(%d,' % num + json.dumps(arr, ensure_ascii=False, separators=(',', ':')) + ');\n')
    imgs = {r['i']: r['im'] for f in chunk_files for r in data[f][2] if r.get('im')}
    t = open('data/web/index.js').read(); idx = json.loads(t[t.index('=') + 1:t.rindex(';')])
    for e in idx:
        im = imgs.get(e[0]); e[8] = 1 if im else 0
        del e[10:]; e.append([im[0], im[3]] if im else 0)
    open('data/web/index.js', 'w').write(t[:t.index('=') + 1] + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('FERTIG neu:', n, '| mit Foto gesamt:', len(imgs), 'von', len(web), flush=True)
    flush()
    json.dump({rid: list(v) + [LOG.get(rid, ''), next(r['n'] for r in web if r['i'] == rid)] for rid, v in chosen.items()},
              open(os.environ.get('MATCH_LOG', '/dev/null'), 'w'), ensure_ascii=False)

if __name__ == '__main__':
    main()
