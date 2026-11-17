#!/usr/bin/env python3
"""Prüft automatisch gefundene Fotos und entfernt Fehlgriffe aus data/web/chunk-*.js und data/web/index.js.

Ein Foto fliegt raus, wenn
1. der Wikipedia-Artikel, aus dem es stammt, eine Zutat, ein Gerät oder ein Begriff ist (Liste BAD_TITLE),
2. der Artikeltitel im Rezeptnamen nur hinter „with“, „mit“, „in“ usw. steht
   („Baked Tilapia with White Wine“ bekäme sonst ein Weinglas),
3. die Datei auf Commons in keiner Essens-Kategorie liegt oder in einer Kategorie für Personen, Orte,
   Tiere, Pflanzen, Gebäude, Werbung usw. (Suchtreffer „Sambar“ = Hirsch, „Cobbler“ = Schuster).

Eingabe ist das Protokoll eines Laufs (MATCH_LOG von match_images_more.py oder match_images_round3.py).
Aufruf: CACHE=cache.json python3 tools/photo_filter.py protokoll.json [--trocken] [--liste abgelehnt.txt]
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from match_images import chunks
from match_images_more import api, flush, fold, tokens, clean_name

BAD_TITLE = set(fold(t) for t in (
    'Potato', 'Deep frying', 'Cheese', 'Dinner', 'Seasoning', 'Slow cooker', 'Food coloring', 'Wine', 'Cup', 'Frying pan',
    'Baking', 'Banquet', 'Coffeehouse', 'Pastry chef', 'Pickling', 'Fast food', 'California cuisine', 'Barbecue in Texas',
    'Spice', 'Yogurt', 'Quail eggs', 'Agar', 'Breadcrumbs', 'Baking mix', 'Rucola', 'Soy milk', 'Masa', 'Soy sauce',
    'Sojasauce', 'Beer', 'Rum', 'Whisky', 'Mead', 'Liqueur', 'Wheat beer', 'White House Honey Ale', "Terry's Chocolate Orange",
    'Energy drink', 'Condiment', 'Confectionery', 'Chocolate syrup', 'Hot dog variations', 'Food', 'Meal', 'Breakfast',
    'Lunch', 'Kitchen', 'Restaurant', 'Cooking', 'Oven', 'Microwave oven', 'Grilling', 'Barbecue', 'Frying', 'Roasting',
    'Boiling', 'Steaming', 'Flour', 'Sugar', 'Salt', 'Butter', 'Milk', 'Egg as food', 'Rice', 'Meat', 'Vegetable', 'Fruit'))
CONNECT = re.compile(r'\b(with|w/|mit|in|on|auf|over|topped|served|and|und)\b', re.I)

FOOD_CAT = re.compile(
    r'food|dish|cuisine|cooking|cooked|meal|breakfast|lunch|dinner|dessert|cake|cookie|biscuit|bread|pastr|soup|stew|salad|sauce|'
    r'curry|noodle|pasta|spaghetti|pizza|burger|sandwich|steak|meat|beef|pork|chicken|poultry|lamb|mutton|fish dish|seafood|shrimp|prawn|'
    r'vegetable dish|potato dish|egg dish|rice dish|pancake|waffle|\bpies?\b|tart|pudding|ice cream|chocolate|confection|candy|sweets|'
    r'snack|drink|beverage|juice|smoothie|cocktail|\btea\b|coffee|milk|yogurt|yoghurt|cheese|\bjam|jelly|condiment|spice|baking|baked|'
    r'fried|grilled|roast|gastronom|recipe|served|plates of|bowls of|cuisine of|muffin|scone|brownie|cupcake|doughnut|porridge|'
    r'dumpling|chili|salsa|dip\b|spread|chutney|pickle|sausage|bacon|ham\b|kebab|taco|burrito|tortilla|omelet|fritter|casserole|'
    r'hot dogs?|vegetables|schnitzel|wings|speise|gericht|küche|kuchen|gebäck|brot|suppe|salat|soße|essen|lebensmittel|nahrung|fleisch|gemüse|nudel|kartoffel|backwaren|'
    r'süß|getränk|cuisine|comida|plat|gâteau|cocina|culinary|edible|eating', re.I)
BAD_CAT = re.compile(
    r'\b(people|portraits?|men|women|politicians?|actors?|actress(es)?|musicians?|singers?|footballers?|players|births|deaths|'
    r'albums?|films?|movies?|television|buildings?|mosques?|minarets?|church(es)?|temples?|railways?|train stations?|bridges?|canals?|'
    r'vehicles?|automobiles?|aircraft|ships|animals?|mammals?|deer|birds?|insects?|plants?|flowers?|cultivars?|hemerocallis|mimulus|'
    r'signs?|logos?|advertisements?|murals?|posters?|shampoo|cosmetics|clothing|storefronts?|facades?|villages?|'
    r'cities|landscapes?|mountains?|rivers?|maps?|uranium|military|navy|marine corps|ceramics?|pottery|paintings?|sculptures?|'
    r'statues?|artworks?|book covers?|covers of|licen[cs]es?|aquariums?|national parks?|loxodonta|nephrops|town halls?|fire hydrants?|'
    r'aerial photographs|musical groups|bands?)\b', re.I)

# Von Hand gefundene Fehlgriffe: (Rezeptname, Datei). Meist Weiterleitungen auf ein anderes Gericht.
MANUAL_BAD = {
    ('Farfalle in Käsesauce', 'Nachos and Salsa sauce.jpg'),
    ('Chinese Chews (Nut and Date Bars)', 'Salt water taffy.jpg'),
    ('Mohingha (Burmese Fish Noodle Soup)', 'Nabeyaku ramen (cropped).jpg'),
    ('Passover Orange Walnut Cake', 'Hodugwaja.jpg'),
    ('Homemade Phyllo Dough', 'Baklava.jpg'),
    ('Lentil and Sausage Stew', 'Budae jjigae (28587380901).jpg'),
    ('Waffeln', 'Gaufre biscuit.jpg'),
    ('Chestnut Puree', 'Cauliflower puree.jpg'),
    ('Bouballe (Sweetened Matzo Meal Omelette)', 'Machine-made Shmura Matzo.jpg'),
    ('Abuk-abuk (Sweet Steamed Sago Dumplings)', 'HK SYP 西營盤 Sai Ying Pun Kwan Yick Building 名星海鮮酒家 Star Seafood Restaurant food 吞麵 Wonton dim sum October 2020 SS2 01.jpg'),
    ('Brown Butter Biscuits', 'Beurre noisette sauced halibut with vegetables.jpg'),
    ('Corn Bread Fish', 'Skillet cornbread (cropped).jpg'),
    ('Honey Mug Cake', 'Cupcakes, chocolate and strawberry flavour.jpg'),
    ('Mocha Icing', 'Hot milk cake01.jpg'),
    ('Red Bell Peppers Stuffed with Cheese and Egg (Chushki Byurek)', 'Burek trokut 1.png'),
    ('Śląsko Modro Kapusta (Red Cabbage with Onion and Bacon)', 'Kapusta z grzybami 2013.jpg'),
    ('Pineapple Side Dish', 'Meze as a side dish.jpg'),
}
# Von Hand als richtig bestätigt, obwohl eine Regel anschlägt
MANUAL_OK = {('Kadala (Kichererbsen Masala)', 'Kadala curry.jpg')}

def nouns(s):
    out = []
    for w in re.findall(r'[a-z]{3,}', fold(s)):
        if w.endswith(('ches', 'shes', 'xes')): w = w[:-2]
        elif w.endswith('s') and len(w) > 3: w = w[:-1]
        out.append(w)
    return out

DISH_NOUN = set(nouns('pizza burger hamburger sandwich salad soup taco burrito pasta noodle dumpling cake pie bread bruschetta sushi '
                      'curry rice steak wrap nachos dog fries waffle pancake muffin cookie cupcake stew chowder risotto lasagna '
                      'omelet crepe sausage kebab skewer chips donut doughnut brownie scone tart roll bun sashimi ramen pho '
                      'casserole chili salsa dip toast bagel croissant pudding cheesecake'))
FILE_BAD = re.compile(r'\b(labels?|menus?|signs?|posters?|packets?|packaging|recipe card|dpla|album|advert\w*)\b', re.I)
FILE_CONNECT = re.compile(r'\b(with|con|mit|and|und|in|on|auf|avec|et)\b|[&,;(]', re.I)

def other_dish(name, fname):
    """Zeigt die Datei laut Namen ein anderes Gericht als das Rezept? Zählt nur das Hauptmotiv vor „with/con/,“."""
    want = nouns(clean_name(name))
    stem_ = re.sub(r'\.\w+$', '', fname)
    main = nouns(FILE_CONNECT.split(stem_)[0])
    if not want: return False
    head = want[-1]
    if head in DISH_NOUN and head in nouns(stem_): return False
    return any(t in DISH_NOUN and t not in want for t in main)

def categories(files):
    """Datei -> Liste sichtbarer Commons-Kategorien (fehlende Dateien kommen nicht vor)."""
    out = {}
    for part in chunks(sorted(set(files)), 50):
        cont = {}
        while True:
            d = api('commons.wikimedia.org', dict({'action': 'query', 'titles': '|'.join('File:' + f for f in part),
                                                    'prop': 'categories', 'clshow': '!hidden', 'cllimit': 'max'}, **cont))
            q = d.get('query', {})
            norm = {n['to']: n['from'] for n in q.get('normalized', [])}
            for pg in q.get('pages', []):
                if pg.get('missing'): continue
                f = norm.get(pg['title'], pg['title'])[5:]
                out.setdefault(f, []).extend(c['title'][9:] for c in pg.get('categories', []))
            if 'continue' not in d: break
            cont = {k: v for k, v in d['continue'].items()}
    return out

def cat_verdict(cats, name='', fname='', from_title=False):
    """True = Foto behalten, False = verwerfen."""
    cats = cats or []
    if from_title and any(fold(c) == fold(from_title) for c in cats): return True
    if any(BAD_CAT.search(c) and not FOOD_CAT.search(c) for c in cats): return False
    if from_title: return True                 # Leitbild eines Gerichtsartikels
    if any(FOOD_CAT.search(c) for c in cats): return True
    want = set(tokens(clean_name(name)))
    if any(want & set(tokens(c)) for c in cats if ',' not in c and '(' not in c): return True
    have = set(tokens(re.sub(r'\.\w+$', '', fname)))
    return bool(want) and want <= have and (len(want) >= 2 or not cats or have == want)

def title_bad(title, name):
    t = fold(re.sub(r'\s*\([^)]*\)', '', title))
    if t == fold(clean_name(name)): return ''
    if fold(title) in BAD_TITLE or t in BAD_TITLE or t.startswith('list of'): return 'Begriff'
    words = re.findall(r'[a-z]{3,}', t)
    nm = fold(re.sub(r'\s*\([^)]*\)', '', name))
    m = CONNECT.search(nm)
    if m and words:
        before, after = nm[:m.start()], nm[m.end():]
        stem = lambda w: w[:-1] if w.endswith('s') else w
        hit_before = any(stem(w) in before for w in words)
        hit_after = any(stem(w) in after for w in words)
        if hit_after and not hit_before and m.group(1).lower() not in ('and', 'und'): return 'nach ' + m.group(1)
    return ''

def judge(log):
    """log: {rid: [host, datei, quelle, titel, name]} -> {rid: grund}"""
    cats = categories([v[1] for v in log.values() if v[0] in ('commons.wikimedia.org', 'en.wikipedia.org', 'de.wikipedia.org', 'c', 'd', 'w')])
    flush()
    bad = {}
    for rid, v in log.items():
        host, f, src, title, name = v[:5]
        why = 'von Hand' if (name, f) in MANUAL_BAD else (title_bad(title, name) if title else '')
        if not why and not title and (FILE_BAD.search(f) or other_dish(name, f)):
            why = 'anderes Motiv'
        if not why and not cat_verdict(cats.get(f), name, f, title):
            why = 'Kategorien: ' + '; '.join((cats.get(f) or ['keine'])[:4])
        if why and (name, f) not in MANUAL_OK: bad[rid] = why
    return bad

def remove(bad_files):
    """bad_files: {rid: datei}. Entfernt die Fotos aus Chunks und Index."""
    cf = sorted(f for f in os.listdir('data/web') if f.startswith('chunk-'))
    n = 0
    for f in cf:
        s = open('data/web/' + f).read(); b = s.index('KA_WEB_CHUNK(')
        head, num, arr = s[:b], int(s[b + 13:s.index(',', b)]), json.loads(s[s.index(',', b) + 1:s.rindex(')')])
        hit = False
        for r in arr:
            if r['i'] in bad_files and r.get('im') and r['im'][3] == bad_files[r['i']]:
                del r['im']; n += 1; hit = True
        if hit: open('data/web/' + f, 'w').write(head + 'KA_WEB_CHUNK(%d,' % num + json.dumps(arr, ensure_ascii=False, separators=(',', ':')) + ');\n')
    s = open('data/web/index.js').read(); idx = json.loads(s[s.index('=') + 1:s.rindex(';')])
    for e in idx:
        im = e[10] if len(e) > 10 else 0
        if e[0] in bad_files and im and im[1] == bad_files[e[0]]:
            e[8] = 0; e[10] = 0
    open('data/web/index.js', 'w').write(s[:s.index('=') + 1] + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')
    return n

def main():
    log = json.load(open(sys.argv[1]))
    bad = judge(log)
    if '--liste' in sys.argv:
        with open(sys.argv[sys.argv.index('--liste') + 1], 'w') as out:
            for rid, why in sorted(bad.items(), key=lambda a: a[1]):
                out.write('%s | %s | %s | %s\n' % (log[rid][4], log[rid][3], log[rid][1], why))
    print('geprüft', len(log), '| abgelehnt', len(bad), flush=True)
    if '--trocken' not in sys.argv:
        print('entfernt', remove({rid: log[rid][1] for rid in bad}), flush=True)

if __name__ == '__main__':
    main()
