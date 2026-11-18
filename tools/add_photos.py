#!/usr/bin/env python3
"""Fügt Fotos für eigene Rezepte von Wikimedia Commons in data/images.js ein, ohne vorhandene Einträge zu ändern.

  python3 tools/add_photos.py auswahl.json

auswahl.json: {"rezept-id": ["Dateiname auf Commons.jpg", "c"], ...}
Quelle: c = Foto genau dieses Gerichts, a = ähnliches Gericht (für eigene Kreationen).
Fotograf, Lizenz und Vorschau-URL holt das Skript aus den Commons-Metadaten.
"""
import json, re, sys
from match_images import credits, short_path

def main():
    pick = json.load(open(sys.argv[1]))
    path = 'data/images.js'
    s = open(path, encoding='utf8').read()
    m = re.match(r'^(.*?window\.KA_IMG\s*=\s*)(\{.*\})(\s*;?\s*)$', s, re.S)
    img = json.loads(m.group(2))
    cr = credits('commons.wikimedia.org', [f for f, _ in pick.values()])
    added, missing = 0, []
    for rid, (f, src) in pick.items():
        if rid in img: continue
        if f not in cr: missing.append((rid, f)); continue
        art, lic, thumb = cr[f]
        img[rid] = [short_path(thumb), art[:80], lic, f, src]
        added += 1
    open(path, 'w', encoding='utf8').write(m.group(1) + json.dumps(img, ensure_ascii=False, separators=(',', ':')) + m.group(3))
    print('neu:', added, '| ohne Lizenzangabe oder nicht gefunden:', missing)

if __name__ == '__main__':
    main()
