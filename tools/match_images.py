#!/usr/bin/env python3
"""Ordnet jedem Rezept ein freies Foto von Wikimedia Commons zu, mit Fotograf und Lizenz.

Reihenfolge:
  1. eigenes Foto des Wikibooks-Rezepts (Feld img)              -> Quelle 'r'
  2. Hauptfoto des Wikipedia-Artikels mit exakt passendem Namen  -> Quelle 'w' (Beispielfoto)
     eigene Rezepte: Artikel von Hand festgelegt (BUILTIN unten)
Kein Treffer = kein Bild. Lieber keins als ein falsches.

Aufruf: python3 tools/match_images.py builtin.json   (Liste [id, name] der eigenen Rezepte)
Schreibt: data/images.js (eigene Rezepte) und ergänzt data/web/chunk-*.js und data/web/index.js.
"""
import json, re, sys, os, time, html, urllib.request, urllib.parse, urllib.error

UA = {'User-Agent': 'KochatlasImageMatcher/1.0 (recipe app; low-volume batch)', 'Accept-Encoding': 'identity'}
THUMB_PREFIXES = ['https://thumb.wikimedia.org/wikipedia/commons/thumb/', 'https://upload.wikimedia.org/wikipedia/commons/thumb/']
GOOD_EXT = re.compile(r'\.(jpe?g|webp|png)$', re.I)
BAD_NAME = re.compile(r'(?<![a-z])(maps?|logo|flag|diagram|coat.of.arms|icon|symbol|chart|locator|svg|plants?(?![-_ ]?based)|field|trees?|flowers?|blossoms?|seeds?|types.of|var(?=[._ ])|cultivar|harvest)(?![a-z])', re.I)

def api(host, params, tries=8):
    params = dict(params, format='json', formatversion='2', maxlag='5')
    url = 'https://' + host + '/w/api.php?' + urllib.parse.urlencode(params)
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=90) as r:
                body = r.read().decode('utf8')
            if body.lstrip().startswith('{'):
                d = json.loads(body)
                if 'error' in d and d['error'].get('code') == 'maxlag':
                    time.sleep(5 * (i + 1)); continue
                return d
            time.sleep(10 * (i + 1))           # Drosselung (Text statt JSON)
        except urllib.error.HTTPError as e:
            time.sleep((int(e.headers.get('Retry-After') or 0) or 8) * (i + 1))
        except Exception:
            time.sleep(6 * (i + 1))
    raise RuntimeError('API nicht erreichbar: ' + url[:120])

def clean_url(u):
    return re.sub(r'\?.*$', '', u or '')

def short_path(u):
    u = clean_url(u)
    for p in THUMB_PREFIXES:
        if u.startswith(p): return u[len(p):]
    return u

def strip_html(s):
    s = re.sub(r'<[^>]+>', ' ', s or '')
    s = html.unescape(re.sub(r'\s+', ' ', s)).strip()
    return s[:80]

def chunks(lst, n):
    for i in range(0, len(lst), n): yield lst[i:i + n]

# ---------- eigene Rezepte: Wikipedia-Artikel von Hand ----------
BUILTIN = {
    'pancakes': 'en:Pancake', 'ruehrei': 'en:Scrambled eggs', 'eier-kochen': 'en:Boiled egg', 'shakshuka': 'en:Shakshouka', 'french-toast': 'en:French toast', 'granola': 'en:Granola',
    'kuerbissuppe': 'en:Pumpkin soup', 'tomatensuppe': 'en:Tomato soup', 'kartoffelsuppe': 'de:Kartoffelsuppe', 
    'ramen': 'en:Ramen', 'pho': 'en:Pho', 'minestrone': 'en:Minestrone', 'gulaschsuppe': 'de:Gulaschsuppe', 'huehnersuppe': 'en:Chicken soup',
    'gazpacho': 'en:Gazpacho', 'misosuppe': 'en:Miso soup', 'zwiebelsuppe': 'en:French onion soup', 'tom-kha-gai': 'en:Tom kha kai',
    'carbonara': 'en:Carbonara', 'bolognese': 'en:Bolognese sauce', 'aglio-olio': 'en:Aglio e olio', 'lasagne': 'en:Lasagna',
    'mac-cheese': 'en:Macaroni and cheese', 'pesto': 'en:Pesto', 'cacio-e-pepe': 'en:Cacio e pepe', 'arrabbiata': 'en:Arrabbiata sauce',
    'kaesespaetzle': 'en:Käsespätzle', 'gnocchi': 'en:Gnocchi', 'pad-thai': 'en:Pad thai', 'spaghetti-pomodoro': 'en:Pasta al pomodoro',
    'schnitzel': 'en:Wiener schnitzel', 'gulasch': 'en:Goulash', 'rouladen': 'de:Rinderroulade', 'brathaehnchen': 'en:Roast chicken',
    'chicken-wings': 'en:Buffalo wing', 'butter-chicken': 'en:Butter chicken', 'chili-con-carne': 'en:Chili con carne',
    'schweinebraten': 'de:Schweinebraten', 'burger': 'en:Hamburger', 'pulled-pork': 'en:Pulled pork', 'koettbullar': 'de:Köttbullar',
    'frikadellen': 'de:Frikadelle', 'boeuf-bourguignon': 'en:Beef bourguignon', 'steak': 'en:Steak', 'teriyaki-chicken': 'en:Teriyaki',
    'gyros': 'en:Gyros', 'moussaka': 'en:Moussaka', 'paella': 'en:Paella', 'chicken-tacos': 'en:Taco', 'fish-and-chips': 'en:Fish and chips', 'gambas-ajillo': 'en:Gambas al ajillo', 'sushi-maki': 'en:Sushi',
    'green-curry': 'en:Green curry', 'ceviche': 'en:Ceviche',
    'chana-masala': 'en:Chana masala', 'falafel': 'en:Falafel', 'risotto': 'en:Risotto', 'ratatouille': 'en:Ratatouille',
    'pizza-margherita': 'en:Pizza Margherita', 'flammkuchen': 'en:Tarte flambée', 'quiche-lorraine': 'en:Quiche',
    'bibimbap': 'en:Bibimbap', 'gebratener-reis': 'en:Fried rice', 'mujadara': 'en:Mujaddara',
    'pommes': 'en:French fries', 'kartoffelpueree': 'en:Mashed potato', 'bratkartoffeln': 'de:Bratkartoffeln', 'roesti': 'en:Rösti',
    'semmelknoedel': 'de:Semmelknödel', 'ofenkartoffel': 'en:Baked potato', 'couscous': 'en:Couscous',
    'caesar-salad': 'en:Caesar salad', 'griechischer-salat': 'en:Greek salad', 'caprese': 'en:Caprese salad', 'tabouleh': 'en:Tabbouleh',
    'kartoffelsalat': 'en:Potato salad', 'coleslaw': 'en:Coleslaw',
    'guacamole': 'en:Guacamole', 'hummus': 'en:Hummus', 'bruschetta': 'en:Bruschetta', 'fruehlingsrollen': 'en:Spring roll',
    'tzatziki': 'en:Tzatziki', 'empanadas': 'en:Empanada', 'nachos': 'en:Nachos',
    'kaesekuchen': 'de:Käsekuchen', 'brownies': 'en:Chocolate brownie', 'marmorkuchen': 'en:Marble cake',
    'karottenkuchen': 'en:Carrot cake', 'schwarzwaelder': 'en:Black Forest gateau', 'bananenbrot': 'en:Banana bread',
    'ny-cheesecake': 'en:Cheesecake', 'tarte-tatin': 'en:Tarte Tatin', 'streuselkuchen': 'en:Streuselkuchen',
    'broetchen': 'en:Bread roll', 'focaccia': 'en:Focaccia', 'brezeln': 'en:Pretzel', 'zimtschnecken': 'en:Cinnamon roll', 'naan': 'en:Naan',
    'hefezopf': 'en:Hefezopf', 'topfbrot': 'en:No-knead bread', 'muffins': 'en:Muffin', 'cookies': 'en:Chocolate chip cookie',
    'croissants': 'en:Croissant', 'butterplaetzchen': 'de:Butterplätzchen', 'vanillekipferl': 'en:Vanillekipferl', 'pita': 'en:Pita',
    'tiramisu': 'en:Tiramisu', 'creme-brulee': 'en:Crème brûlée', 'panna-cotta': 'en:Panna cotta', 'mousse-au-chocolat': 'en:Chocolate mousse',
    'kaiserschmarrn': 'en:Kaiserschmarrn', 'milchreis': 'de:Milchreis', 'crepes': 'en:Crêpe', 'apfelstrudel': 'en:Apple strudel',
    'churros': 'en:Churro', 'lava-cake': 'en:Lava cake', 'baklava': 'en:Baklava',
    'eis-ohne-maschine': 'en:Ice cream', 'mango-sticky-rice': 'en:Mango sticky rice',
    'st-beef-tatar': 'en:Steak tartare', 'st-entenbrust': 'en:Magret', 'st-ravioli': 'en:Ravioli', 'st-zitronentarte': 'en:Lemon tart',
    'st-kuerbis-veloute': 'en:Pumpkin soup', 'st-hollandaise': 'en:Hollandaise sauce',
}

# ---------- Namen säubern ----------
PREFIX = re.compile(r"^(easy|basic|simple|classic|traditional|homemade|home-made|quick|best|my|mom'?s|mum'?s|grandma'?s|granny'?s|authentic|old-fashioned|perfect|ultimate|delicious|fresh|einfache?r?s?|schnelle?r?s?|klassische?r?s?|omas?|leckere?r?s?)\s+", re.I)
GENERIC = {'flour', 'chocolate', 'maize', 'sweet corn', 'barbecue', 'grilling', 'soy sauce', 'sauce', 'bread', 'soup', 'cake', 'pie', 'cookie', 'biscuit',
           'salad', 'curry', 'stew', 'dough', 'pastry', 'spice', 'herb', 'meat', 'vegetable', 'fruit', 'nut', 'oil', 'vinegar', 'black pepper', 'sugar',
           'honey', 'cooked rice', 'rice', 'potato', 'egg as food', 'chicken as food', 'beef', 'pork', 'cheese', 'milk', 'butter', 'jam', 'candy',
           'confectionery', 'dessert', 'breakfast', 'sandwich', 'noodle', 'pasta', 'dumpling', 'pancake', 'mehl', 'brot', 'suppe', 'kuchen', 'gebäck',
           'soße', 'salat', 'gemüse', 'fleisch', 'kartoffel', 'reis', 'nudel', 'teigwaren', 'süßspeise', 'nachspeise', 'beverage', 'drink', 'cocktail',
           'baking powder', 'yeast', 'spice mix', 'seasoning', 'condiment', 'tofu', 'bean', 'lentil', 'chickpea'}
RAW_WORDS = {'chicken', 'beef', 'pork', 'lamb', 'fish', 'rice', 'potato', 'potatoes', 'egg', 'eggs', 'salt', 'sugar', 'flour', 'water', 'milk',
             'butter', 'cheese', 'onion', 'garlic', 'tomato', 'tomatoes', 'apple', 'apples', 'banana', 'corn', 'beans', 'tofu', 'duck', 'turkey',
             'huhn', 'reis', 'kartoffel', 'kartoffeln', 'ei', 'eier', 'zwiebel', 'apfel', 'milch', 'mehl', 'zucker', 'käse'}
def candidates(name):
    out = []
    def add(x):
        x = re.sub(r'\s+', ' ', x).strip(' -,.')
        if x and x.lower() not in RAW_WORDS and len(x) > 2 and x not in out: out.append(x)
    base = re.sub(r'\s*\([^)]*\)', '', name)
    add(name); add(base)
    for m in re.findall(r'\(([^)]*)\)', name):
        if len(m.split()) <= 4 and m[:1].isupper(): add(m)
    p = base
    for _ in range(3): p = PREFIX.sub('', p)
    add(p)
    if re.search(r'[a-z]s$', p) and len(p.split()) <= 3: add(p[:-1])
    for x in list(out):
        if ' ' in x: add(x[:1] + x[1:].lower())
    return out[:7]

# ---------- Wikipedia-Abfrage ----------
def lookup(host, titles, strict=True):
    """titles -> {eingabetitel: (dateiname, thumburl)}"""
    res = {}
    for part in chunks(titles, 50):
        d = api(host, {'action': 'query', 'titles': '|'.join(part), 'redirects': '1', 'prop': 'pageimages|pageprops',
                       'piprop': 'thumbnail|name', 'pithumbsize': '960', 'ppprop': 'disambiguation'})
        q = d.get('query', {})
        norm = {n['from']: n['to'] for n in q.get('normalized', [])}
        redir = {r['from']: r['to'] for r in q.get('redirects', [])}
        pages = {pg['title']: pg for pg in q.get('pages', [])}
        for t in part:
            n0 = norm.get(t, t); x = redir.get(n0, n0); pg = pages.get(x)
            if strict and x != n0:
                tl = x.lower()
                if tl in GENERIC or not (set(re.findall(r'[a-zäöüß]{4,}', tl)) & set(re.findall(r'[a-zäöüß]{4,}', n0.lower()))): continue
            if not pg or pg.get('missing') or 'disambiguation' in (pg.get('pageprops') or {}): continue
            img, th = pg.get('pageimage'), (pg.get('thumbnail') or {}).get('source')
            if img and th and GOOD_EXT.search(img) and not BAD_NAME.search(img): res[t] = (img, th)
        time.sleep(1.2)
    return res

def credits(host, files):
    """dateinamen -> (autor, lizenz, thumburl)"""
    out = {}
    for part in chunks(sorted(set(files)), 50):
        d = api(host, {'action': 'query', 'titles': '|'.join('File:' + f for f in part), 'prop': 'imageinfo',
                       'iiprop': 'extmetadata|url', 'iiurlwidth': '960', 'iiextmetadatafilter': 'Artist|LicenseShortName|Credit'})
        q = d.get('query', {})
        norm = {n['to']: n['from'] for n in q.get('normalized', [])}
        for pg in q.get('pages', []):
            ii = (pg.get('imageinfo') or [None])[0]
            if not ii: continue
            md = ii.get('extmetadata') or {}
            lic = strip_html((md.get('LicenseShortName') or {}).get('value', ''))
            art = strip_html((md.get('Artist') or {}).get('value', '')) or strip_html((md.get('Credit') or {}).get('value', ''))
            if not lic or re.search(r'fair use|non-free', lic, re.I): continue
            title = norm.get(pg['title'], pg['title'])
            out[title[5:]] = (art or 'unbekannt', lic, ii.get('thumburl') or ii.get('url'))
        time.sleep(1.2)
    return out

def main():
    builtin = json.load(open(sys.argv[1]))
    # Web-Rezepte aus den Paketen lesen
    chunk_files = sorted(f for f in os.listdir('data/web') if f.startswith('chunk-'))
    web = []
    for f in chunk_files:
        t = open('data/web/' + f).read(); a = t.index('KA_WEB_CHUNK('); j = json.loads(t[t.index(',', a) + 1:t.rindex(')')])
        web.extend(j)
    print('Rezepte: eigene', len(builtin), 'web', len(web), flush=True)
    chosen = {}   # id -> (host, datei, thumb, quelle)

    # 1. eigene Wikibooks-Fotos
    own = {r['i']: r['img'].replace('_', ' ').strip() for r in web if r.get('img')}
    own_files = {}
    for i, f in own.items(): own_files.setdefault(f[:1].upper() + f[1:], []).append(i)
    cr = credits('commons.wikimedia.org', list(own_files))
    for f, ids in own_files.items():
        if f in cr:
            for i in ids: chosen[i] = ('commons.wikimedia.org', f, cr[f][2], 'r')
    print('eigene Wikibooks-Fotos mit Lizenz:', len(chosen), 'von', len(own), flush=True)

    # 2. Wikipedia
    jobs = {'en.wikipedia.org': {}, 'de.wikipedia.org': {}}
    for rid, name in builtin:
        if rid in BUILTIN:
            lang, title = BUILTIN[rid].split(':', 1)
            jobs[lang + '.wikipedia.org'].setdefault(title, []).append((rid, 0))
    for r in web:
        if r['i'] in chosen: continue
        host = 'de.wikipedia.org' if r['l'] == 'de' else 'en.wikipedia.org'
        for k, c in enumerate(candidates(r.get('on', r['n']))): jobs[host].setdefault(c, []).append((r['i'], k))
    for host, tmap in jobs.items():
        print(host, len(tmap), 'Titel …', flush=True)
        found = lookup(host, list(tmap))
        best = {}
        for t, (img, th) in found.items():
            for rid, k in tmap[t]:
                if rid not in best or k < best[rid][0]: best[rid] = (k, img, th)
        for rid, (k, img, th) in best.items():
            if rid not in chosen: chosen[rid] = (host, img, th, 'w')
        print(host, 'Treffer:', len(best), flush=True)

    # 3. Lizenzen der Wikipedia-Bilder
    by_host = {}
    for rid, (host, f, th, src) in chosen.items():
        if src == 'w': by_host.setdefault(host, set()).add(f.replace('_', ' '))
    cred = {}
    for host, files in by_host.items():
        c = credits(host, list(files)); cred.update({(host, k): v for k, v in c.items()})
    for rid, (host, f, th, src) in list(chosen.items()):
        if src == 'w':
            key = (host, f.replace('_', ' '))
            if key not in cred: del chosen[rid]; continue
            chosen[rid] = (host, f.replace('_', ' '), cred[key][2], 'w')
    allcred = {}
    allcred.update({('commons.wikimedia.org', k): v for k, v in cr.items()}); allcred.update(cred)
    def entry(rid):
        host, f, th, src = chosen[rid]
        art, lic, _ = allcred[(host, f)]
        return [short_path(th), art, lic, f, src]

    # Ausgabe: eigene Rezepte
    bi = {rid: entry(rid) for rid, _ in builtin if rid in chosen}
    with open('data/images.js', 'w') as fh:
        fh.write('/* Fotos der eigenen Rezepte: [Vorschaupfad, Fotograf, Lizenz, Datei, Quelle w=Wikipedia-Beispielfoto]. Erzeugt von tools/match_images.py */\n')
        fh.write('window.KA_IMG=' + json.dumps(bi, ensure_ascii=False, separators=(',', ':')) + ';\n')
    # Ausgabe: Web-Pakete und Index
    n_web = 0
    for f in chunk_files:
        t = open('data/web/' + f).read(); a = t.index('KA_WEB_CHUNK('); num = int(t[a + 13:t.index(',', a)])
        arr = json.loads(t[t.index(',', a) + 1:t.rindex(')')])
        for r in arr:
            r.pop('im', None)
            if r['i'] in chosen: r['im'] = entry(r['i']); n_web += 1
        head = t[:a]
        open('data/web/' + f, 'w').write(head + 'KA_WEB_CHUNK(%d,' % num + json.dumps(arr, ensure_ascii=False, separators=(',', ':')) + ');\n')
    t = open('data/web/index.js').read(); idx = json.loads(t[t.index('=') + 1:t.rindex(';')])
    for e in idx:
        e[8] = 1 if e[0] in chosen else 0
        e[10:11] = [[entry(e[0])[0], entry(e[0])[3], entry(e[0])[4]] if e[0] in chosen else 0]   # e[11] (Originalname) bleibt erhalten
    open('data/web/index.js', 'w').write(t[:t.index('=') + 1] + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('FERTIG eigene', len(bi), 'von', len(builtin), '| web', n_web, 'von', len(web), flush=True)

def main_builtin():
    """Nur die eigenen Rezepte neu abgleichen (handverlesene Titel, Weiterleitungen erlaubt)."""
    builtin = json.load(open(sys.argv[1]))
    out = {}
    for lang in ('en', 'de'):
        host = lang + '.wikipedia.org'
        tmap = {}
        for rid, _ in builtin:
            if rid in BUILTIN and BUILTIN[rid].startswith(lang + ':'): tmap.setdefault(BUILTIN[rid].split(':', 1)[1], []).append(rid)
        found = lookup(host, list(tmap), strict=False)
        files = {img.replace('_', ' ') for img, th in found.values()}
        cr = credits(host, list(files))
        for t, (img, th) in found.items():
            f = img.replace('_', ' ')
            if f not in cr: continue
            art, lic, thumb = cr[f]
            for rid in tmap[t]: out[rid] = [short_path(thumb), art, lic, f, 'w']
    with open('data/images.js', 'w') as fh:
        fh.write('/* Fotos der eigenen Rezepte: [Vorschaupfad, Fotograf, Lizenz, Datei, Quelle w=Wikipedia-Beispielfoto]. Erzeugt von tools/match_images.py */\n')
        fh.write('window.KA_IMG=' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('FERTIG eigene', len(out), 'von', len(builtin), '| ohne:', [r for r, _ in builtin if r not in out])

if __name__ == '__main__':
    if '--nur-eigene' in sys.argv: main_builtin()
    else: main()
