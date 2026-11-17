#!/usr/bin/env python3
"""KI-Bilder für Rezepte ohne freies Foto, lokal erzeugt mit Stable Diffusion (Modell Lykon/dreamshaper-8-lcm,
Lizenz CreativeML OpenRAIL-M). Läuft auf der CPU, ohne Konto und ohne Online-Dienst.

Erzeugen (setzt torch, diffusers, transformers, accelerate voraus; lädt das Modell beim ersten Mal von Hugging Face):
    python3 tools/gen_ai_images.py gen [--de-uebersetzung datei.tsv] [--nur de|en] [--max N]
Eintragen in die Rezeptdaten (nur für Rezepte, die noch kein echtes Foto haben):
    python3 tools/gen_ai_images.py apply

Bilder: img/ki/<rezept-id>.webp, 576 x 384 px. Bereits vorhandene Dateien werden übersprungen.
Deutsche Rezeptnamen werden über eine Übersetzungstabelle (Name TAB englische Beschreibung) ins Englische gebracht,
weil das Modell nur Englisch gut versteht.
"""
import json, os, re, sys, time, zlib

OUT = 'img/ki'
SKIP = {'Rezeptvorlage Text', 'Vorlage:Rezept'}
SET = ['on a rustic wooden table', 'on a light marble countertop', 'on a dark slate surface', 'on a white linen tablecloth',
       'on a weathered wooden board', 'in a cozy restaurant setting', 'on a light gray stone table', 'on a ceramic plate on a wooden table']
ANG = ['overhead shot', '45 degree angle', 'close-up shot', 'eye-level shot']
HINT = {'getraenke': 'served in a glass', 'saucen': 'in a small bowl', 'brot': 'freshly baked', 'kuchen': 'a slice on a plate',
        'suppen': 'in a bowl', 'salate': 'in a salad bowl', 'dessert': 'dessert'}
NEG = 'cartoon, illustration, painting, drawing, anime, 3d render, text, letters, watermark, logo, blurry, deformed, people, hands, fingers'

def load_chunks():
    cf = sorted(f for f in os.listdir('data/web') if f.startswith('chunk-'))
    data = {}
    for f in cf:
        t = open('data/web/' + f).read(); a = t.index('KA_WEB_CHUNK(')
        data[f] = (t[:a], int(t[a + 13:t.index(',', a)]), json.loads(t[t.index(',', a) + 1:t.rindex(')')]))
    return cf, data

def fname(rid):
    return OUT + '/' + re.sub(r'[^A-Za-z0-9_-]', '-', rid) + '.webp'

def clean(n):
    n = re.sub(r'\s*\([^)]*\)', '', n)
    n = re.sub(r"^(easy|quick|simple|basic|classic|traditional|homemade|best|my|grandma'?s?|mom'?s?|[A-Z][a-z]+'s)\s+", '', n, flags=re.I)
    return re.sub(r'\s+', ' ', n).strip(' -,.')

def prompt(r, de):
    dish = de.get(r['n']) if r['l'] == 'de' else None
    dish = dish or clean(r['n'])
    h = zlib.crc32(r['i'].encode())
    hint = HINT.get(r['c'], '')
    return ('professional food photography of %s%s, %s, %s, appetizing, soft natural light, shallow depth of field, '
            'photorealistic, high detail' % (dish, ', ' + hint if hint else '', SET[h % len(SET)], ANG[(h >> 4) % len(ANG)])), h

def gen(args):
    import torch
    from diffusers import StableDiffusionPipeline, LCMScheduler
    torch.set_num_threads(os.cpu_count() or 4)
    de = {}
    if '--de-uebersetzung' in args:
        for line in open(args[args.index('--de-uebersetzung') + 1], encoding='utf8'):
            if '\t' in line:
                a, b = line.rstrip('\n').split('\t', 1); de[a] = b
    only = args[args.index('--nur') + 1] if '--nur' in args else None
    mx = int(args[args.index('--max') + 1]) if '--max' in args else 10 ** 9
    cf, data = load_chunks()
    todo = [r for f in cf for r in data[f][2] if not r.get('im') and r['n'] not in SKIP and not os.path.exists(fname(r['i']))]
    todo.sort(key=lambda r: (r['l'] != 'de', r['i']))
    if only: todo = [r for r in todo if r['l'] == only]
    todo = todo[:mx]
    print('zu erzeugen:', len(todo), flush=True)
    os.makedirs(OUT, exist_ok=True)
    pipe = StableDiffusionPipeline.from_pretrained('Lykon/dreamshaper-8-lcm', safety_checker=None, requires_safety_checker=False)
    pipe.scheduler = LCMScheduler.from_config(pipe.scheduler.config)
    pipe.set_progress_bar_config(disable=True)
    pipe.unet.to(memory_format=torch.channels_last)
    t0 = time.time()
    for k, r in enumerate(todo):
        p, h = prompt(r, de)
        img = pipe(p, negative_prompt=NEG, num_inference_steps=4, guidance_scale=1.5, width=576, height=384,
                   generator=torch.Generator().manual_seed(h)).images[0]
        tmp = fname(r['i']) + '.tmp'
        img.save(tmp, 'WEBP', quality=74, method=6); os.replace(tmp, fname(r['i']))
        if k % 10 == 0:
            el = time.time() - t0
            print('%d/%d %s | %.1f s/Bild | %s' % (k + 1, len(todo), r['i'], el / (k + 1), p[:90]), flush=True)
    print('FERTIG', len(todo), flush=True)

def apply():
    cf, data = load_chunks()
    n = 0
    for f in cf:
        head, num, arr = data[f]
        for r in arr:
            if r.get('im') and r['im'][4] == 'k' and not os.path.exists(r['im'][0]): del r['im']
            if not r.get('im') and os.path.exists(fname(r['i'])):
                r['im'] = [fname(r['i']), 'KI-Bild (Stable Diffusion, DreamShaper 8)', 'CreativeML OpenRAIL-M', '', 'k']; n += 1
        open('data/web/' + f, 'w').write(head + 'KA_WEB_CHUNK(%d,' % num + json.dumps(arr, ensure_ascii=False, separators=(',', ':')) + ');\n')
    imgs = {r['i']: r['im'] for f in cf for r in data[f][2] if r.get('im')}
    t = open('data/web/index.js').read(); idx = json.loads(t[t.index('=') + 1:t.rindex(';')])
    for e in idx:
        im = imgs.get(e[0]); e[8] = 1 if im else 0
        del e[10:]; e.append([im[0], im[3]] if im else 0)
    open('data/web/index.js', 'w').write(t[:t.index('=') + 1] + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('KI-Bilder neu eingetragen:', n, '| mit Bild gesamt:', len(imgs), 'von', sum(len(data[f][2]) for f in cf))

if __name__ == '__main__':
    if sys.argv[1:2] == ['gen']: gen(sys.argv[2:])
    elif sys.argv[1:2] == ['apply']: apply()
    else: print(__doc__)
