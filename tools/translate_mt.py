#!/usr/bin/env python3
"""Übersetzt Zubereitung, Beschreibung und Tipps der englischen Wikibooks-Rezepte maschinell ins Deutsche.

Modell: Opus-MT Englisch-Deutsch (Helsinki-NLP/opus-mt-en-de, CC BY 4.0), lokal mit CTranslate2.
Die App selbst braucht dafür nichts, die Übersetzung steht danach fest in den Chunks.

Vorbereitung (einmalig):
  pip install ctranslate2 sentencepiece transformers torch
  ct2-transformers-converter --model Helsinki-NLP/opus-mt-en-de --output_dir MODELL \
      --quantization int8 --copy_files source.spm target.spm

Aufruf:
  python3 tools/translate_mt.py MODELL          übersetzt alles (setzt nach Abbruch fort)
  python3 tools/translate_mt.py --nur-schreiben schreibt Chunks aus Originalen + Cache, ohne Modell

Die englischen Originaltexte liegen in tools/translations/en_texts.json.gz, die Satzübersetzungen in
tools/translations/mt_cache.jsonl.gz. Das Skript startet immer von den Originalen.
Vor der Übersetzung rechnet es °F in °C, Zoll in cm, Quart in Liter sowie Unzen und Pfund in Gramm um.
"""
import glob, gzip, json, os, re, sys, time

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
WEB = os.path.join(ROOT, 'data', 'web')
TR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'translations')
ORIG = os.path.join(TR, 'en_texts.json.gz')
CACHE = os.path.join(TR, 'mt_cache.jsonl.gz')
WORK = os.environ.get('MT_WORK', '/tmp/mt_work.jsonl')   # laufender Fortschritt, wird am Ende in CACHE übernommen
FIELDS = ('s', 'x', 'desc')


def load_chunk(path):
    s = open(path, encoding='utf8').read()
    m = re.match(r'^(.*?KA_WEB_CHUNK\(\s*\d+\s*,\s*)(\[.*\])(\s*\)\s*;?\s*)$', s, re.S)
    return m.group(1), json.loads(m.group(2)), m.group(3)


# ---------- Vorverarbeitung ----------

def f2c(f):
    c = (float(f) - 32) * 5 / 9
    return str(int(round(c / 5) * 5)) if float(f) >= 200 else str(int(round(c)))


def cm(x):
    v = float(x) * 2.54
    if v < 10:
        v = round(v * 2) / 2
        return str(int(v)) if v == int(v) else str(v)
    return str(int(round(v)))


def num(s):
    s = s.strip()
    if ' ' in s:                       # "1 1/2"
        a, b = s.split(None, 1)
        return num(a) + num(b)
    if '/' in s:
        a, b = s.split('/')
        return float(a) / float(b)
    return float(s)


N = r'(\d+(?:\.\d+)?(?:\s+\d/\d)?|\d/\d)'
DEG_F = r'\s*(?:°|º|˚|degrees?|deg\.?)\s*F(?:ahrenheit)?\b'
DEG_C = r'\s*(?:°|º|˚|degrees?)\s*C(?:elsius|entigrade)?\b'
PRE = [
    # "350°F (175°C)" -> "175 °C"; auch umgekehrt
    (re.compile(r'(\d+)' + DEG_F + r'\s*[(/]\s*(?:about |approx\.? |approximately |ca\.? |or )?(\d+)' + DEG_C + r'\s*\)?', re.I), lambda m: m.group(2) + ' °C'),
    (re.compile(r'(\d+)' + DEG_C + r'\s*[(/]\s*(?:about |approx\.? |approximately |or )?(\d+)' + DEG_F + r'\s*\)?', re.I), lambda m: m.group(1) + ' °C'),
    (re.compile(r'(\d+)\s*(?:-|–|to)\s*(\d+)' + DEG_F, re.I), lambda m: f2c(m.group(1)) + '–' + f2c(m.group(2)) + ' °C'),
    (re.compile(r'(\d+)' + DEG_F, re.I), lambda m: f2c(m.group(1)) + ' °C'),
    (re.compile(r'(\d+)' + DEG_C, re.I), lambda m: m.group(1) + ' °C'),
    # Zoll
    (re.compile(r'(\d+(?:\.\d+)?)\s*(?:"|-?inch(?:es)?)?\s*(?:x|×|by)\s*(\d+(?:\.\d+)?)\s*(?:"|-?\s?inch(?:es)?\b|-?in\.)', re.I), lambda m: cm(m.group(1)) + ' x ' + cm(m.group(2)) + ' cm'),
    (re.compile(N + r'\s*(?:-|\s)?\s*inch(?:es)?\b', re.I), lambda m: cm(num(m.group(1))) + ' cm'),
    # Hohlmaße und Gewichte
    (re.compile(N + r'\s*(?:-|\s)?\s*(?:quarts?|qts?\.?)(?=[\s,.;)]|$)', re.I), lambda m: ('%.1f' % (num(m.group(1)) * 0.946)).replace('.0', '') + '-liter'),
    (re.compile(N + r'\s*(?:-|\s)?\s*(?:fl\.?|fluid)\s*(?:oz|ounces?)\.?', re.I), lambda m: str(int(round(num(m.group(1)) * 30))) + ' ml'),
    (re.compile(N + r'\s*(?:-|\s)?\s*(?:pounds?|lbs?\.?)(?=[\s,.;)]|$)', re.I), lambda m: str(int(round(num(m.group(1)) * 453.6 / 10) * 10)) + ' g'),
    (re.compile(N + r'\s*(?:-|\s)?\s*(?:ounces?|oz\.?)(?=[\s,.;)]|$)', re.I), lambda m: str(int(round(num(m.group(1)) * 28.35 / 5) * 5)) + ' g'),
]


# mehrdeutige Kochbegriffe, die das Modell sonst falsch übersetzt ("stock" -> "Vorrat", "reserve" -> "reservieren")
GLOSS = [
    (r'\bstock ?pots?\b', 'large pot'), (r'\b(chicken|beef|vegetable|fish|veal|pork|lamb|turkey|duck|mushroom) stock\b', r'\1 broth'),
    (r'\bstock\b', 'broth'), (r'\breserv(e|ed|ing)\b', lambda m: {'e': 'set aside', 'ed': 'set aside', 'ing': 'setting aside'}[m.group(1)]),
    (r'\bdiscard(ed|ing)?\b', lambda m: {None: 'throw away', 'ed': 'thrown away', 'ing': 'throwing away'}[m.group(1)]),
    (r'\bpat(?:ted)? (?:it |them )?dry\b', 'dab dry with paper towels'), (r'\b(lemon|lime|orange) zest\b', r'grated \1 peel'),
    (r'\bzest\b', 'grated peel'), (r'\b(let|allow (?:it |them )?to|leave (?:it |them )?to) sit\b', r'\1 stand'),
    (r'\bline ((?:a|an|the|your|two|both)\b[^.,;]{0,40}?) with\b', r'lay out \1 with'),
    (r'\bapply (?:the )?(?:dry )?rub\b', 'apply the spice mix'), (r'\b(a|the|this|your) (?:dry )?rub\b', r'\1 spice mix'),
    (r'\ban internal temperature\b', 'a core temperature'), (r'\binternal temperature\b', 'core temperature'),
    (r'\bstrain ((?:the |it\b|them\b)[^.,;]{0,40}?)(?=[.,;]|$| into\b| and\b)', r'pour \1 through a sieve'),
    (r'\bcream (?:together )?((?:the )?butter(?: and (?:the )?sugar)?)(?: together)?(\s+until\b)?',
     lambda m: 'beat ' + m.group(1) + (m.group(2) or ' until creamy')),
    (r'\bcasserole dish\b', 'baking dish'), (r'\bcookie sheet\b', 'baking sheet'), (r'\bparchment(?: paper)?\b', 'baking paper'),
]
GLOSS = [(re.compile(a, re.I), b) for a, b in GLOSS]


def wiki(t):
    t = re.sub(r'(?:File|Image):[^|]*?\.(?:jpe?g|png|gif|svg|webp)\|?', ' ', t, flags=re.I)   # Bildergalerie: nur Bildunterschrift
    t = re.sub(r'\bCookbook:', '', t)
    return re.sub(r'\s+', ' ', t).strip()


def prep(t):
    t = wiki(t)
    for rx, fn in PRE:
        t = rx.sub(fn, t)
    for rx, fn in GLOSS:
        t = rx.sub(fn, t)
    return re.sub(r'(^|[.!?]\s+)([a-z])', lambda m: m.group(1) + m.group(2).upper(), t)


IW = re.compile(r'^\s*Cookbook:\S+\s*$|^\s*[a-z]{2,3}(?:-[a-z]+)?:\S')
NONLAT = re.compile(r'[\u0400-\u04ff\u0590-\u08ff\u0980-\u0fff\u3040-\u9fff\uac00-\ud7af]')


def junk(t):
    """Sprachlinks zu anderen Wikibooks und Texte überwiegend in fremder Schrift"""
    return bool(IW.search(t)) or len(NONLAT.findall(t)) > 0.3 * len(t.replace(' ', ''))


ABBR = r'(?<!\be\.g\.)(?<!\bi\.e\.)(?<!\bapprox\.)(?<!\bMr\.)(?<!\bDr\.)(?<!\bSt\.)(?<!\bvs\.)(?<!\bca\.)(?<!\bNo\.)'
SPLIT = re.compile(r'(?<=[.!?])' + ABBR + r'\s+(?=["“(]?[A-Z0-9])')


def sentences(t):
    t = re.sub(r'\s+', ' ', t).strip()
    out = []
    for x in SPLIT.split(t):
        out += [y for y in re.split(r'(?<=[;:])\s+(?=\S{2})', x) if y.strip()]
    return out


# ---------- Nachbearbeitung ----------
POST = [
    (r'\bPergamentpapier\b', 'Backpapier'), (r'\bWachspapier\b', 'Backpapier'),
    (r'\b(?:Keks|Plätzchen|Cookie)(?:blatt|blech)\b', 'Backblech'), (r'\bKeksbogen\b', 'Backblech'),
    (r'\bBackpfanne\b', 'Backform'), (r'\bKuchendose\b', 'Kuchenform'), (r'\bKuchenzinn\b', 'Kuchenform'),
    (r'\bTortenplatte\b', 'Tarteform'), (r'\bKornmehl\b', 'Maismehl'), (r'\bCilantro\b', 'Koriandergrün'),
    (r'\bheiße(n)? (?:Sauce|Soße)\b', r'scharfe\1 Soße'), (r'\bScallions?\b', 'Frühlingszwiebeln'),
    (r'\bVorwärmen Sie\b', 'Heizen Sie'), (r'\bVorheizen Sie den Ofen\b', 'Heizen Sie den Ofen'),
    (r'(\d)\s?°\s?C\b', r'\1 °C'), (r'\bCups?\b', 'Tasse'), (r'\bTasse(n)? von\b', r'Tasse\1'),
]
POST = [(re.compile(a), b) for a, b in POST]


def post(t):
    for rx, b in POST:
        t = rx.sub(b, t)
    t = re.sub(r'(Heizen Sie den (?:Back)?[Oo]fen auf [^.]*?) vor\b', r'\1 vor', t)
    t = re.sub(r'^(Heizen Sie den (?:Back)?[Oo]fen auf \d[^.]*?°C)\s*\.?$', r'\1 vor.', t)
    return t[:1].upper() + t[1:] if t else t


# ---------- Originale und Cache ----------

def originals():
    if os.path.exists(ORIG):
        return json.load(gzip.open(ORIG, 'rt', encoding='utf8'))
    data = {}
    for f in sorted(glob.glob(os.path.join(WEB, 'chunk-*.js'))):
        _, recs, _ = load_chunk(f)
        for i, r in enumerate(recs):
            if r.get('l') == 'en':
                data['%s:%d' % (os.path.basename(f), i)] = {k: r.get(k) for k in FIELDS}
    with gzip.open(ORIG, 'wt', encoding='utf8') as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(',', ':'))
    return data


def clean_desc(d):
    d = re.sub(r'__[A-Z]+__', ' ', d or '')
    d = re.sub(r'\{\{[^}]*\}\}|\[\[|\]\]', ' ', d)
    parts = [p.strip() for p in d.split('|')]
    if len(parts) > 1:                       # Kategorienliste vor dem Text: kurze Teile weglassen
        parts = [p for p in parts if len(p.split()) > 5]
        parts = [re.sub(r'^(?:Cookbook:)?Cuisine of (?:the )?[A-Z]\w+(?: [A-Z]\w+)*?\s+(?=[A-Z])', '', p) for p in parts]
    d = ' '.join(p for p in parts if p)
    return re.sub(r'\s+', ' ', d).strip()


def texts_of(o):
    """liefert (feld, index, text) mit bereits umgerechneten Einheiten"""
    out = []
    for fld in ('s', 'x'):
        for i, t in enumerate(t for t in (o.get(fld) or []) if not junk(t)):   # Sprachlinks anderer Wikibooks weglassen
            out.append((fld, i, prep(t)))
    d = clean_desc(o.get('desc'))
    if d and not junk(d):
        out.append(('desc', 0, prep(d)))
    return out


def load_cache():
    c = {}
    for p in (CACHE, WORK):
        if os.path.exists(p):
            op = gzip.open if p.endswith('.gz') else open
            with op(p, 'rt', encoding='utf8') as fh:
                for line in fh:
                    try:
                        a, b = json.loads(line)
                        c[a] = b
                    except ValueError:
                        pass                      # abgebrochene letzte Zeile
    return c


def translate(model, todo):
    import ctranslate2, sentencepiece as spm
    tr = ctranslate2.Translator(model, device='cpu', intra_threads=os.cpu_count() or 4, compute_type='int8')
    sp_s = spm.SentencePieceProcessor(os.path.join(model, 'source.spm'))
    sp_t = spm.SentencePieceProcessor(os.path.join(model, 'target.spm'))
    todo = sorted(todo, key=len)
    t0, done, B = time.time(), 0, 256
    with open(WORK, 'a', encoding='utf8') as fh:
        for k in range(0, len(todo), B):
            part = todo[k:k + B]
            toks = [sp_s.encode(x, out_type=str)[:400] + ['</s>'] for x in part]
            res = tr.translate_batch(toks, beam_size=4, max_batch_size=64, batch_type='examples',
                                     max_decoding_length=512, repetition_penalty=1.1)
            for a, r in zip(part, res):
                fh.write(json.dumps([a, sp_t.decode(r.hypotheses[0])], ensure_ascii=False) + '\n')
            fh.flush()
            done += len(part)
            el = time.time() - t0
            print('%d/%d Sätze, %.0f s, Rest ca. %.0f min' % (done, len(todo), el, el / done * (len(todo) - done) / 60), flush=True)


def write(data, cache):
    by_file = {}
    for key, o in data.items():
        f, i = key.split(':')
        by_file.setdefault(f, {})[int(i)] = o
    missing = 0
    for f, items in sorted(by_file.items()):
        path = os.path.join(WEB, f)
        pre, recs, suf = load_chunk(path)
        for i, o in items.items():
            r = recs[i]
            new = {'s': [], 'x': [], 'desc': ''}
            for fld, j, t in texts_of(o):
                parts = []
                for s in sentences(t):
                    if s in cache:
                        parts.append(post(cache[s]))
                    else:
                        parts.append(s)
                        missing += 1
                txt = ' '.join(parts)
                if fld == 'desc':
                    new['desc'] = txt
                else:
                    new[fld].append(txt)
            r['s'], r['x'], r['desc'] = new['s'], new['x'], new['desc']
            r['mt'] = 1
        open(path, 'w', encoding='utf8').write(pre + json.dumps(recs, ensure_ascii=False, separators=(',', ':')) + suf)
    return missing


def main():
    data = originals()
    need = set()
    for o in data.values():
        for _, _, t in texts_of(o):
            need.update(sentences(t))
    cache = load_cache()
    todo = [s for s in need if s not in cache]
    print('%d Rezepte, %d verschiedene Sätze, davon %d noch offen' % (len(data), len(need), len(todo)), flush=True)
    if todo and sys.argv[1:] and sys.argv[1] != '--nur-schreiben':
        translate(sys.argv[1], todo)
        cache = load_cache()
    # Cache dauerhaft speichern (nur benötigte Sätze)
    with gzip.open(CACHE, 'wt', encoding='utf8') as fh:
        for s in sorted(need):
            if s in cache:
                fh.write(json.dumps([s, cache[s]], ensure_ascii=False) + '\n')
    print('fehlend:', write(data, cache))


if __name__ == '__main__':
    main()
