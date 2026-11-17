#!/usr/bin/env python3
"""Wandelt heruntergeladene Wikibooks-Kochbuchseiten (Wikitext) in Kochatlas-Daten um.

Aufruf:  python3 tools/import_wikibooks.py de_raw.json en_raw.json data/web
Eingabe: JSON-Objekte {Seitentitel: Wikitext}, erzeugt mit der MediaWiki-API (prop=revisions).
Ausgabe: data/web/index.js (Suchindex) und data/web/chunk-NN.js (Rezeptdetails).

Inhalte stehen unter CC BY-SA (Wikibooks). Jedes Rezept behält einen Link auf die Quellseite.
"""
import json, re, sys, os, html, math

# ---------------- Wikitext bereinigen ----------------
def strip_templates(t):
    out, depth, i = [], 0, 0
    while i < len(t):
        if t.startswith('{{', i): depth += 1; i += 2; continue
        if depth and t.startswith('}}', i): depth -= 1; i += 2; continue
        if not depth: out.append(t[i])
        i += 1
    return ''.join(out)

def strip_tables(t):
    out, depth = [], 0
    for line in t.split('\n'):
        s = line.strip()
        if s.startswith('{|'): depth += 1; continue
        if depth and s.startswith('|}'): depth -= 1; continue
        if not depth: out.append(line)
    return '\n'.join(out)

FILE_RE = re.compile(r'\[\[(?:Bild|Datei|File|Image|Kategorie|Category):[^\[\]]*(?:\[\[[^\]]*\]\][^\[\]]*)*\]\]', re.I)

def clean_inline(s):
    s = re.sub(r'<ref[^>]*/>', '', s)
    s = re.sub(r'<ref[^>]*>.*?</ref>', '', s, flags=re.S)
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S)
    s = FILE_RE.sub('', s)
    s = re.sub(r'\[\[(?:[^\]|]*\|)?([^\]]*)\]\]', r'\1', s)
    s = re.sub(r'\[https?://\S+\s+([^\]]+)\]', r'\1', s)
    s = re.sub(r'\[https?://\S+\]', '', s)
    s = re.sub(r"'{2,}", '', s)
    s = re.sub(r'<br\s*/?>', ' ', s, flags=re.I)
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s)
    s = re.sub(r'\s+', ' ', s).strip(' :;-–')
    return s

# ---------------- Abschnitte ----------------
def sections(text):
    """Liefert [(ebene, überschrift, zeilen)]; Ebene 0 ist der Vorspann."""
    res, cur = [], (0, '', [])
    for line in text.split('\n'):
        m = re.match(r'^(={2,6})\s*(.*?)\s*\1\s*$', line)
        if m:
            res.append(cur); cur = (len(m.group(1)), clean_inline(m.group(2)), [])
        else:
            cur[2].append(line)
    res.append(cur)
    return res

LANG = {
    'de': dict(ing=r'zutat|teig$|füllung|fülle|belag|sauce|soße|marinade|glasur|guss|creme|streusel|dressing',
               steps=r'zubereitung|anleitung|herstellung|vorbereitung|rezept$|so geht|arbeitsschritte',
               tips=r'tipp|anmerk|hinweis|variant|variation|warnung|servier|beilage'),
    'en': dict(ing=r'ingredient',
               steps=r'procedure|method|direction|instruction|preparation|steps|making|assembly',
               tips=r'note|tip|variation|warning|serving'),
}

def list_items(lines):
    items, para = [], []
    for raw in lines:
        l = raw.rstrip()
        if re.match(r'^\s*[*#:]+', l):
            if para: items.append(('p', ' '.join(para))); para = []
            items.append(('li', re.sub(r'^\s*[*#:]+\s*', '', l)))
        elif l.strip() == '':
            if para: items.append(('p', ' '.join(para))); para = []
        else:
            para.append(l.strip())
    if para: items.append(('p', ' '.join(para)))
    return items

def split_long(text, maxlen=260):
    if len(text) <= maxlen: return [text]
    sents = re.split(r'(?<=[.!?])\s+(?=[A-ZÄÖÜ0-9])', text)
    out, cur = [], ''
    for s in sents:
        if cur and len(cur) + len(s) > maxlen: out.append(cur.strip()); cur = s
        else: cur = (cur + ' ' + s).strip()
    if cur: out.append(cur.strip())
    return out

# ---------------- Metadaten ----------------
def param(text, *names):
    for n in names:
        m = re.search(r'\|\s*' + n + r'\s*=\s*([^|\n}]*)', text, re.I)
        if m:
            v = clean_inline(m.group(1))
            if v: return v
    return ''

def minutes(s):
    if not s: return 0
    s = s.lower().replace(',', '.')
    total = 0
    h = re.search(r'(\d+(?:\.\d+)?)\s*(?:-\s*\d+(?:\.\d+)?\s*)?(h\b|std|stunde|hour|hr)', s)
    m = re.search(r'(\d+)\s*(?:-\s*\d+\s*)?(min|minute)', s)
    if h: total += float(h.group(1)) * 60
    if m: total += int(m.group(1))
    if not total:
        n = re.search(r'(\d+)', s)
        if n and int(n.group(1)) <= 300: total = int(n.group(1))
    return int(round(total))

def servings(s):
    n = re.search(r'(\d+)', s or '')
    v = int(n.group(1)) if n else 4
    return v if 1 <= v <= 60 else 4

# ---------------- Kategorien & Länder ----------------
CAT_RULES = [
    ('getraenke', r'getränk|cocktail|beverage|drink|smoothie|tea recipes|coffee'),
    ('saucen', r'sauce|soße|saucen|dip|dressing|condiment|marinade|chutney|relish|pesto|spice mix|gewürzmischung'),
    ('kuchen', r'kuchen|torte|cake|pie|tart|cheesecake|gebäck und kuchen'),
    ('brot', r'brot|brötchen|bread|\\bbuns?\\b|\\brolls?\\b|weihnachtsgebäck|plätzchen|cookie|biscuit|muffin|scone|pastry|pastries|gebäck|backen|baking'),
    ('dessert', r'dessert|pudding|eis$|ice cream|süßigkeit|candy|confection|sweet|mousse|custard|creme|fudge|obstgericht'),
    ('suppen', r'suppe|eintopf|soup|stew|chowder|broth|chili recipes'),
    ('salate', r'salat|salad'),
    ('fruehstueck', r'frühstück|breakfast|brunch|pancake|egg recipes|eier- und mehlspeisen'),
    ('fisch', r'fisch|meeresfr|fish|seafood|shellfish|shrimp|prawn|salmon|tuna'),
    ('pasta', r'nudel|pasta|noodle|spätzle'),
    ('fleisch', r'fleisch|geflügel|rind|schwein|lamm|wild|chicken|beef|pork|lamb|meat|poultry|turkey|duck|sausage|veal|goat|venison'),
    ('beilagen', r'beilage|side dish|kartoffel|potato|reis|rice'),
    ('snacks', r'vorspeise|snack|appetizer|starter|finger food|sandwich|tapas|hors'),
    ('veggie', r'vegetar|vegan|gemüse|vegetable|bohnen|tofu|zucchini|kürbis|brokkoli|kohl|aufläufe'),
]

MEAT = r'chicken|beef|pork|lamb|mutton|turkey|duck|veal|goat|venison|bacon|ham\\b|sausage|rabbit|goose|mince|ground meat|chorizo|prosciutto|lard'
FISH = r'fish|salmon|tuna|cod|shrimp|prawn|crab|lobster|mussel|clam|oyster|squid|anchov|sardine|trout|haddock|mackerel|scallop|seafood'
def guess_cat(cats, title, veg=0):
    using = ' | '.join(c for c in cats if re.match(r'\s*recipes using', c, re.I)).lower()
    cats = [c for c in cats if not re.match(r'\s*(recipes using|recipes with|featured|pages|articles|cookbook)', c, re.I)]
    txt = ' | '.join(cats).lower()
    found = None
    for c, rx in CAT_RULES:
        if re.search(rx, txt): found = c; break
    if not found:
        t = title.lower()
        for c, rx in CAT_RULES:
            if re.search(rx, t): found = c; break
    if found in (None, 'veggie', 'welt') and not veg:
        if re.search(FISH, using) or re.search(FISH, title.lower()): return 'fisch'
        if re.search(MEAT, using) or re.search(MEAT, title.lower()): return 'fleisch'
    if not found and veg: return 'veggie'
    return found or 'welt'

COUNTRY = {
    # englische Adjektive / Ländernamen -> deutsch
    'afghan': 'Afghanistan', 'african': 'Afrika', 'albanian': 'Albanien', 'algerian': 'Algerien', 'american': 'USA', 'argentine': 'Argentinien',
    'argentinian': 'Argentinien', 'armenian': 'Armenien', 'australian': 'Australien', 'austrian': 'Österreich', 'azerbaijani': 'Aserbaidschan',
    'bangladeshi': 'Bangladesch', 'belgian': 'Belgien', 'bengali': 'Bangladesch', 'bolivian': 'Bolivien', 'bosnian': 'Bosnien', 'brazilian': 'Brasilien',
    'british': 'Großbritannien', 'bulgarian': 'Bulgarien', 'burmese': 'Myanmar', 'cajun': 'USA', 'cambodian': 'Kambodscha', 'cameroonian': 'Kamerun',
    'canadian': 'Kanada', 'caribbean': 'Karibik', 'chilean': 'Chile', 'chinese': 'China', 'colombian': 'Kolumbien', 'congolese': 'Kongo',
    'costa rican': 'Costa Rica', 'creole': 'USA', 'croatian': 'Kroatien', 'cuban': 'Kuba', 'czech': 'Tschechien', 'danish': 'Dänemark',
    'dominican': 'Dominikanische Republik', 'dutch': 'Niederlande', 'ecuadorian': 'Ecuador', 'egyptian': 'Ägypten', 'english': 'England',
    'eritrean': 'Eritrea', 'estonian': 'Estland', 'ethiopian': 'Äthiopien', 'filipino': 'Philippinen', 'finnish': 'Finnland', 'french': 'Frankreich',
    'georgian': 'Georgien', 'german': 'Deutschland', 'ghanaian': 'Ghana', 'greek': 'Griechenland', 'guatemalan': 'Guatemala', 'haitian': 'Haiti',
    'hawaiian': 'Hawaii', 'honduran': 'Honduras', 'hungarian': 'Ungarn', 'icelandic': 'Island', 'indian': 'Indien', 'indonesian': 'Indonesien',
    'iranian': 'Iran', 'persian': 'Iran', 'iraqi': 'Irak', 'irish': 'Irland', 'israeli': 'Israel', 'italian': 'Italien', 'jamaican': 'Jamaika',
    'japanese': 'Japan', 'jewish': 'Jüdische Küche', 'jordanian': 'Jordanien', 'kenyan': 'Kenia', 'korean': 'Korea', 'kurdish': 'Kurdistan',
    'laotian': 'Laos', 'latvian': 'Lettland', 'lebanese': 'Libanon', 'libyan': 'Libyen', 'lithuanian': 'Litauen', 'malaysian': 'Malaysia',
    'maltese': 'Malta', 'mexican': 'Mexiko', 'moroccan': 'Marokko', 'mongolian': 'Mongolei', 'nepali': 'Nepal', 'nepalese': 'Nepal',
    'new zealand': 'Neuseeland', 'nicaraguan': 'Nicaragua', 'nigerian': 'Nigeria', 'norwegian': 'Norwegen', 'pakistani': 'Pakistan',
    'palestinian': 'Palästina', 'panamanian': 'Panama', 'peruvian': 'Peru', 'polish': 'Polen', 'portuguese': 'Portugal', 'puerto rican': 'Puerto Rico',
    'romanian': 'Rumänien', 'russian': 'Russland', 'salvadoran': 'El Salvador', 'saudi': 'Saudi-Arabien', 'scottish': 'Schottland', 'senegalese': 'Senegal',
    'serbian': 'Serbien', 'singaporean': 'Singapur', 'slovak': 'Slowakei', 'slovenian': 'Slowenien', 'somali': 'Somalia', 'south african': 'Südafrika',
    'spanish': 'Spanien', 'sri lankan': 'Sri Lanka', 'sudanese': 'Sudan', 'swedish': 'Schweden', 'swiss': 'Schweiz', 'syrian': 'Syrien',
    'taiwanese': 'Taiwan', 'tanzanian': 'Tansania', 'thai': 'Thailand', 'tibetan': 'Tibet', 'trinidadian': 'Trinidad und Tobago', 'tunisian': 'Tunesien',
    'turkish': 'Türkei', 'ugandan': 'Uganda', 'ukrainian': 'Ukraine', 'uruguayan': 'Uruguay', 'uzbek': 'Usbekistan', 'venezuelan': 'Venezuela',
    'vietnamese': 'Vietnam', 'welsh': 'Wales', 'yemeni': 'Jemen', 'zimbabwean': 'Simbabwe', 'arab': 'Arabische Küche', 'middle eastern': 'Nahost',
    'mediterranean': 'Mittelmeer', 'scandinavian': 'Skandinavien', 'southern us': 'USA', 'tex-mex': 'Mexiko & USA', 'soul food': 'USA',
    'united states': 'USA', 'united kingdom': 'Großbritannien', 'india': 'Indien', 'china': 'China', 'japan': 'Japan', 'italy': 'Italien',
    'france': 'Frankreich', 'germany': 'Deutschland', 'spain': 'Spanien', 'mexico': 'Mexiko', 'thailand': 'Thailand', 'greece': 'Griechenland',
    'korea': 'Korea', 'vietnam': 'Vietnam', 'philippines': 'Philippinen', 'brazil': 'Brasilien', 'turkey': 'Türkei', 'russia': 'Russland',
    'poland': 'Polen', 'hungary': 'Ungarn', 'austria': 'Österreich', 'sweden': 'Schweden', 'norway': 'Norwegen', 'denmark': 'Dänemark',
    'finland': 'Finnland', 'iran': 'Iran', 'lebanon': 'Libanon', 'israel': 'Israel', 'morocco': 'Marokko', 'ethiopia': 'Äthiopien',
    'nigeria': 'Nigeria', 'indonesia': 'Indonesien', 'malaysia': 'Malaysia', 'pakistan': 'Pakistan', 'peru': 'Peru', 'argentina': 'Argentinien',
    'ireland': 'Irland', 'scotland': 'Schottland', 'portugal': 'Portugal', 'netherlands': 'Niederlande', 'belgium': 'Belgien', 'switzerland': 'Schweiz',
    'canada': 'Kanada', 'australia': 'Australien', 'cuba': 'Kuba', 'jamaica': 'Jamaika', 'egypt': 'Ägypten', 'ukraine': 'Ukraine', 'romania': 'Rumänien',
}
DE_KUECHE = {
    'deutsche': 'Deutschland', 'italienische': 'Italien', 'asiatische': 'Asien', 'indische': 'Indien', 'böhmische': 'Tschechien', 'schwedische': 'Schweden',
    'norddeutsche': 'Deutschland', 'schottische': 'Schottland', 'mexikanische': 'Mexiko', 'schwäbische': 'Deutschland', 'schweizer': 'Schweiz',
    'österreichische': 'Österreich', 'französische': 'Frankreich', 'griechische': 'Griechenland', 'türkische': 'Türkei', 'chinesische': 'China',
    'japanische': 'Japan', 'thailändische': 'Thailand', 'spanische': 'Spanien', 'russische': 'Russland', 'polnische': 'Polen', 'ungarische': 'Ungarn',
    'bayerische': 'Deutschland', 'fränkische': 'Deutschland', 'sächsische': 'Deutschland', 'badische': 'Deutschland', 'pfälzer': 'Deutschland',
    'westfälische': 'Deutschland', 'thüringer': 'Deutschland', 'berliner': 'Deutschland', 'hessische': 'Deutschland', 'rheinische': 'Deutschland',
    'amerikanische': 'USA', 'englische': 'England', 'britische': 'Großbritannien', 'irische': 'Irland', 'arabische': 'Arabische Küche',
    'afrikanische': 'Afrika', 'persische': 'Iran', 'libanesische': 'Libanon', 'koreanische': 'Korea', 'vietnamesische': 'Vietnam',
    'portugiesische': 'Portugal', 'niederländische': 'Niederlande', 'dänische': 'Dänemark', 'norwegische': 'Norwegen', 'finnische': 'Finnland',
    'brasilianische': 'Brasilien', 'jüdische': 'Jüdische Küche', 'kroatische': 'Kroatien', 'serbische': 'Serbien', 'marokkanische': 'Marokko',
    'karibische': 'Karibik', 'mediterrane': 'Mittelmeer', 'tschechische': 'Tschechien', 'belgische': 'Belgien', 'indonesische': 'Indonesien',
}

def guess_country_en(cats, text):
    m = re.search(r'Cuisine of (?:the )?([A-Z][\w ]+?)\s*[|\]]', text)
    if m and m.group(1).lower() in COUNTRY: return COUNTRY[m.group(1).lower()]
    for c in cats:
        if c.lower().startswith('recipes using'): continue
        cl = c.lower().replace(' recipes', '').replace(' cuisine', '').strip()
        if cl in COUNTRY: return COUNTRY[cl]
    return ''

def guess_country_de(cats):
    for c in cats:
        m = re.match(r'(.+?)\s+Küche', c.strip())
        if m and m.group(1).lower() in DE_KUECHE: return DE_KUECHE[m.group(1).lower()]
    return ''

# ---------------- Rezept parsen ----------------
SIG = re.compile(r'^(erfasst von|--|autor|quelle|source|from:|submitted by|contributed by|kategorie)', re.I)
SKIP_ING = re.compile(r'^(siehe|see also|für \d+ personen?:?$)', re.I)

def parse(title, text, lang):
    if re.search(r'^#(weiterleitung|redirect)', text.strip(), re.I): return None
    raw = text
    cats = re.findall(r'\[\[(?:Kategorie|Category):(?:Kochbuch/\s*)?([^\]|]+)', raw)
    L = LANG[lang]
    meta_portions = param(raw, 'Portionen', 'servings', 'Servings', 'yield')
    meta_time = param(raw, 'Zubereitungszeit', 'Zeit bis Servierung', 'time', 'Time')
    meta_diff = param(raw, 'Schwierigkeitsgrad', 'difficulty', 'Difficulty')
    meta_veg = param(raw, 'Vegetarisch')
    img = ''
    m = re.search(r'\|\s*(?:Bild|Image)\s*=\s*(?:\[\[(?:Image|File|Bild|Datei):)?([^|\]\n]+\.(?:jpe?g|png|webp))', raw, re.I)
    if m: img = m.group(1).strip()
    if lang == 'de':
        tm = re.search(r'Rezeptmenge für:\s*\n\|\s*([^\n]+)', raw); meta_portions = meta_portions or (tm.group(1) if tm else '')
        tz = re.search(r'Zeitbedarf:\s*\n\|\s*([^\n]+)', raw); meta_time = meta_time or (tz.group(1) if tz else '')
        dz = re.search(r'\[\[Bild:(\d)v5', raw); meta_diff = meta_diff or (dz.group(1) if dz else '')
    body = strip_tables(strip_templates(raw))
    secs = sections(body)
    ing, steps, tips, desc = [], [], [], ''
    mode = None
    for lvl, head, lines in secs:
        h = head.lower()
        if lvl == 0:
            paras = [clean_inline(p) for k, p in list_items(lines) if k == 'p']
            paras = [p for p in paras if len(p) > 40 and not p.startswith('|')]
            desc = paras[0] if paras else ''
            continue
        if lvl == 2:
            mode = 'ing' if re.search(L['ing'], h) else 'steps' if re.search(L['steps'], h) else 'tips' if re.search(L['tips'], h) else None
            sub = None
        else:
            if mode is None:
                if re.search(L['ing'], h): mode = 'ing'
                elif re.search(L['steps'], h): mode = 'steps'
            sub = head
        if mode == 'ing':
            if lvl > 2 and head: ing.append('#' + head)
            elif lvl == 2 and re.search(r'für (die|den|das) ', h): ing.append('#' + re.sub(r'^zutaten\s*', '', head, flags=re.I).strip().capitalize())
            for k, it in list_items(lines):
                c = clean_inline(it)
                if not c or len(c) > 220 or SKIP_ING.match(c): continue
                if k == 'li': ing.append(c)
        elif mode == 'steps':
            for k, it in list_items(lines):
                c = clean_inline(it)
                if len(c) < 3 or SIG.match(c): continue
                steps.extend(split_long(c))
        elif mode == 'tips':
            for k, it in list_items(lines):
                c = clean_inline(it)
                if 15 < len(c) < 400 and len(tips) < 6: tips.append(c)
    ing = [x for x in ing if x != '#']
    # leere Gruppenüberschriften entfernen
    ing = [x for i, x in enumerate(ing) if not (x.startswith('#') and (i + 1 == len(ing) or ing[i + 1].startswith('#')))]
    real_ing = [x for x in ing if not x.startswith('#')]
    if len(real_ing) < 2 or len(steps) < 1: return None
    name = re.sub(r'^(Kochbuch/\s*|Cookbook:)', '', title).strip()
    if '/' in name: return None
    if desc and desc[0].islower(): desc = name + ' ' + desc
    country = guess_country_de(cats) if lang == 'de' else guess_country_en(cats, raw)
    catlow = ' '.join(cats).lower()
    v = 2 if ('vegan' in catlow or meta_veg.lower().startswith('vegan')) else 1 if ('vegetar' in catlow or meta_veg.lower().startswith('ja')) else 0
    cat = guess_cat(cats, name, v)
    try: d = max(1, min(3, round(int(re.search(r'\d', meta_diff).group(0)) * 3 / 5 + 0.2)))
    except Exception: d = 2
    t = minutes(meta_time)
    url = ('https://de.wikibooks.org/wiki/' if lang == 'de' else 'https://en.wikibooks.org/wiki/') + title.replace(' ', '_')
    return {'n': name, 'c': cat, 'k': country, 'p': servings(meta_portions), 't': t, 'd': d, 'v': v, 'l': lang,
            'g': ing[:60], 's': steps[:40], 'x': tips, 'desc': desc[:300], 'img': img, 'u': url}

DEV_RX = [
    ('a', r'air ?fryer|heißluftfritteuse'), ('d', r'pressure cooker|instant pot|schnellkochtopf|dampfdrucktopf'),
    ('s', r'slow cooker|crock ?pot|schongarer'), ('m', r'microwave|mikrowelle'), ('g', r'\bgrill|barbecue|bbq'),
    ('o', r'\boven|\bbake|baking|roast|broil|backofen|\bofen|backen|überbacken|gratin'),
    ('h', r'\bpan\b|\bpot\b|skillet|saucepan|\bwok|\bboil|simmer|\bfry|fried|saut|stove|over (low|medium|high) heat|pfanne|topf|kochen|braten|köcheln|dünsten|erhitzen|aufkochen|rösten'),
]
def devices(steps):
    t = ' '.join(steps).lower()
    found = ''.join(k for k, rx in DEV_RX if re.search(rx, t))
    return found or 'k'

def main():
    out_dir = sys.argv[3]
    os.makedirs(out_dir, exist_ok=True)
    recipes = []
    for path, lang in ((sys.argv[1], 'de'), (sys.argv[2], 'en')):
        data = json.load(open(path))
        for title in sorted(data):
            r = parse(title, data[title], lang)
            if r: recipes.append(r)
    # Dubletten nach Name/Sprache entfernen
    seen, uniq = set(), []
    for r in recipes:
        key = (r['l'], r['n'].lower())
        if key in seen: continue
        seen.add(key); uniq.append(r)
    CH = 250
    index = []
    for i, r in enumerate(uniq):
        r['i'] = 'wb-%s-%d' % (r['l'], i)
        index.append([r['i'], r['n'], r['c'], r['k'], r['v'], r['t'], r['l'], i // CH, 1 if r['img'] else 0, devices(r['s'])])
    for f in os.listdir(out_dir):
        if f.startswith('chunk-') or f == 'index.js': os.remove(os.path.join(out_dir, f))
    for ci in range(math.ceil(len(uniq) / CH)):
        part = uniq[ci * CH:(ci + 1) * CH]
        with open(os.path.join(out_dir, 'chunk-%02d.js' % ci), 'w') as fh:
            fh.write('/* Wikibooks-Rezepte, Lizenz CC BY-SA. Automatisch erzeugt von tools/import_wikibooks.py */\n')
            fh.write('KA_WEB_CHUNK(%d,' % ci + json.dumps(part, ensure_ascii=False, separators=(',', ':')) + ');\n')
    with open(os.path.join(out_dir, 'index.js'), 'w') as fh:
        fh.write('/* Suchindex: [id, name, kategorie, land, vegetarisch, minuten, sprache, chunk, hatBild, geraete]. Erzeugt von tools/import_wikibooks.py */\n')
        fh.write('window.KA_WEB_INDEX=' + json.dumps(index, ensure_ascii=False, separators=(',', ':')) + ';\n')
    by = {}
    for r in uniq: by[(r['l'], r['c'])] = by.get((r['l'], r['c']), 0) + 1
    print('rezepte', len(uniq), 'de', sum(1 for r in uniq if r['l'] == 'de'), 'en', sum(1 for r in uniq if r['l'] == 'en'))
    print(sorted(by.items()))

if __name__ == '__main__':
    main()
