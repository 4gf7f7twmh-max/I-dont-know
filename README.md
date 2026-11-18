# Kochatlas

Eigenständige Kochbuch-Web-App für Handy, Tablet und Computer (iPhone, Android, macOS, Windows, Linux). Läuft im Browser, lässt sich wie eine App auf den Startbildschirm legen und funktioniert offline. Keine Anmeldung, kein Konto, keine Abhängigkeit von einem KI-Dienst.

## Was drin ist

- 4522 Rezepte aus über 120 Ländern
  - 160 eigene Rezepte mit getrennten Anleitungen pro Gerät, davon 17 aus der Sterneküche und 10 eigene Kreationen
  - 4362 Rezepte aus dem Internet: das komplette deutsche Wikibooks-Kochbuch (650) und das englische Wikibooks Cookbook (3712), Lizenz CC BY-SA, jeweils mit Link zum Original. Bei den englischen Rezepten sind Name und Zutaten ins Deutsche übersetzt und US-Maße in Gramm und Milliliter umgerechnet, die Zubereitung steht im Original
- Anleitungen für Herd, Backofen, Heißluftfritteuse, Thermomix, Mikrowelle, Schnellkochtopf, Slow Cooker, Grill, Sous-vide oder ganz ohne Kochen
- 37 animierte Techniken: Jeder Schritt zeigt, was zu tun ist, mit Temperatur, Ofenmodus, Thermomix-Stufe, Linkslauf, Kerntemperatur und Timer
- Sterneküche mit Anrichte-Plan: Ein Teller von oben, auf dem jede Komponente nacheinander erscheint, dazu eine Anrichte-Schule mit 12 Grundtechniken
- Familien: Eine Person gründet eine Familie und lädt per Code, Link oder QR-Code ein. Alle Mitglieder sehen die gemeinsame Einkaufsliste live, mit Namen, wer was eingetragen oder abgehakt hat. Ohne Netz wird gespeichert und später nachgesendet.
- Echte Fotos für 3229 Rezepte: alle 160 eigenen Rezepte und 3069 der 4362 Rezepte aus dem Netz. 799 Wikibooks-Rezepte haben ihr eigenes Foto, die übrigen ein Foto des Gerichts aus Wikipedia, Wikimedia Commons, Wikidata oder TheMealDB. Beispielfotos sind als solche markiert, jedes Foto nennt Fotograf und Lizenz. 1293 Rezepte haben noch kein Foto und zeigen das Symbol ihrer Kategorie. Im Kochmodus zeigt der letzte Schritt, wie das Gericht aussehen soll.
- Kochmodus im Vollbild, mehrere Timer mit Ton und Vibration, Portionen umrechnen, Favoriten, Notizen, eigene Rezepte mit automatischer Schritterkennung, Hell und Dunkel
- Suche auf Deutsch findet auch englische Rezepte („Hähnchen“ findet „Chicken“), dazu eine zusätzliche Live-Suche in TheMealDB

## Schnellstart auf dem eigenen Rechner

Node.js ab Version 18 installieren (nodejs.org), dann im Projektordner:

```
npm start
```

Die App läuft unter http://localhost:8080, inklusive Familien-Synchronisierung. Andere Geräte im selben WLAN erreichen sie über die IP-Adresse des Rechners, z. B. http://192.168.1.20:8080.

## Für alle im Internet bereitstellen

Damit Familien die App von überall nutzen können, muss sie auf einem Server laufen, der aus dem Internet erreichbar ist. Es gibt zwei Wege.

### Weg 1: Eigener Kochatlas-Server (empfohlen)

Der Server in `server/server.js` liefert die App aus und synchronisiert die Familienlisten. Er braucht nur Node.js, keine weiteren Pakete und keine Datenbank. Die Daten liegen als JSON-Dateien im Ordner `server-data/` (über `DATA_DIR` änderbar).

Mit Docker:

```
docker build -t kochatlas .
docker run -d -p 8080:8080 -v kochatlas-daten:/data --restart unless-stopped kochatlas
```

Geeignet sind zum Beispiel ein kleiner virtueller Server (ab etwa 4 Euro im Monat), ein Raspberry Pi oder ein NAS zu Hause. Für HTTPS einen Reverse-Proxy davorsetzen (Caddy oder nginx mit Let's Encrypt). HTTPS ist nötig, damit Handys die App installieren und offline nutzen können.

Beispiel Caddy, komplette Konfiguration:

```
kochatlas.example.de {
  reverse_proxy localhost:8080
}
```

Wichtig bei kostenlosen Hosting-Angeboten: Viele löschen die Festplatte bei jedem Neustart. Dann gehen die Familienlisten verloren. Den Ordner `DATA_DIR` auf ein dauerhaftes Laufwerk legen.

Einstellungen über Umgebungsvariablen:

| Variable | Bedeutung | Standard |
| --- | --- | --- |
| `PORT` | Port | 8080 |
| `HOST` | Adresse | 0.0.0.0 |
| `DATA_DIR` | Ordner für die Familiendaten | ./server-data |
| `CORS_ORIGIN` | erlaubte Herkunft, wenn die App woanders liegt als der Server | * |

Liegt die App auf einem anderen Host (z. B. GitHub Pages) als der Server, in `config.js` die Serveradresse eintragen: `server: 'https://kochatlas.example.de'`.

### Weg 2: Statisches Hosting plus Firebase (ohne eigenen Server)

Die App selbst ist eine statische Website und läuft auf GitHub Pages, Netlify, Cloudflare Pages oder jedem Webspace. Für die Familien-Synchronisierung übernimmt dann Google Firebase Firestore die Rolle des Servers. Der kostenlose Tarif reicht für viele Familien.

1. Unter console.firebase.google.com ein Projekt anlegen.
2. Firestore Database erstellen (Produktionsmodus, Region z. B. europe-west3 Frankfurt).
3. Unter Firestore > Regeln den Inhalt von `docs/firestore.rules` einfügen und veröffentlichen.
4. Unter Projekteinstellungen > Allgemein > Deine Apps eine Web-App hinzufügen und die angezeigte Konfiguration in `config.js` bei `firebase:` eintragen, zum Beispiel:

```js
window.KOCHATLAS_CONFIG = {
  sync: 'auto',
  server: '',
  firebase: { apiKey: '…', authDomain: '…', projectId: '…', appId: '…' }
};
```

5. Den Projektordner hochladen (ohne `server/`, `server-data/` und `tools/`).

Hinweis: Die Firebase-Anbindung ist geschrieben, aber nicht mit einem echten Firebase-Projekt getestet. Der eigene Server (Weg 1) ist vollständig getestet.

### Ohne Synchronisierung

Jeder statische Webspace reicht. Die Einkaufsliste bleibt dann auf dem jeweiligen Gerät und lässt sich als Text per Messenger teilen.

## Sicherheit der Familien

Der 16-stellige Familiencode ist der Schlüssel zur Liste (etwa 80 Bit Zufall, nicht erratbar). Wer ihn kennt, kann die Liste lesen und schreiben. Es gibt keine Konten und keine Passwörter. Die Liste aller Familien ist nicht abrufbar. Der Server begrenzt Anfragen pro IP, Textlängen, Listengröße und Mitgliederzahl.

## Aufbau

```
index.html            Einstieg
config.js             Einstellungen für die Synchronisierung
css/style.css         Oberfläche
css/scenes.css        Animationen
js/sync.js            Familien-Synchronisierung (Server, Firebase, lokal, Offline-Warteschlange)
js/app.js             Ansichten, Kochmodus, Timer, Editor, Suche
js/animations.js      animierte SVG-Szenen
js/plating.js         Anrichte-Pläne
js/devices.js         Geräte, Kategorien, Techniken
js/icons.js           Icons
data/*.js             eigene Rezepte
data/web/             Wikibooks-Rezepte (Suchindex und nachgeladene Pakete)
server/server.js      Kochatlas-Server
server/test.js        Servertest (npm test)
docs/firestore.rules  Sicherheitsregeln für Firebase
tools/import_wikibooks.py  Import der Wikibooks-Rezepte
tools/match_images*.py     Fotozuordnung
tools/photo_filter.py      Prüfung der gefundenen Fotos
tools/translate_en.py      Übersetzung der englischen Rezepte (Namen, Zutaten)
tools/translations/        Übersetzungstabellen
sw.js                 Offline-Modus
```

## Rezepte ergänzen

Ein Rezept ist ein Objekt in einer der Dateien unter `data/`:

```js
R({
  id: 'mein-rezept', n: 'Name', c: 'pasta', k: 'Italien', d: 1, p: 4, v: 1,
  desc: 'Kurzbeschreibung',
  ing: ['400 g Spaghetti', '#Soße', '2 Knoblauchzehen'],
  prep: [['chop', 'Knoblauch hacken.']],
  m: {
    herd: { t: 20, s: [
      ['boil', 'Nudeln kochen.', { h: 'hoch', t: 9 }],
      ['flip', 'In der Soße schwenken.', { h: 'hoch', t: 1 }]
    ] },
    tm: { t: 25, s: [
      ['tm', 'Soße 5 Min./100 °C/Linkslauf/Stufe 1.', { t: 5, c: 100, l: true, s: 1 }]
    ] }
  }
});
```

Felder: `c` Kategorie (siehe `js/devices.js`), `d` Schwierigkeit 1 bis 3, `p` Portionen, `v` 0 = mit Fleisch/Fisch, 1 = vegetarisch, 2 = vegan. `prep` und `post` gelten für alle Geräte, `m` enthält die Schritte pro Gerät mit Gesamtzeit `t` in Minuten. Optional `plate` für einen Anrichte-Plan (Beispiele in `data/13-sterne.js`).

Ein Schritt ist `[technik, text, optionen]`. Optionen: `t` Minuten, `sec` Sekunden, `c` Temperatur in °C oder `'Varoma'`, `mo` Ofenmodus (`OU`, `U`, `G`, `UG`), `h` Herdhitze (`max`, `hoch`, `mittel`, `niedrig`), `s` Thermomix-Stufe (Zahl, `'teig'`, `'sanft'`), `l` Linkslauf, `k` Kerntemperatur, `w` Watt, `lvl` Slow-Cooker-Stufe, `p` Druckstufe, `i` Ofeninhalt (`cake`, `loaf`, `pizza`, `roast`, `tray`, `cookies`, `dish`).

## Internet-Rezepte neu importieren

Wikitexte mit der MediaWiki-API laden (prop=revisions, 50 Seiten pro Anfrage) und als JSON `{Titel: Wikitext}` speichern, dann:

```
python3 tools/import_wikibooks.py de_raw.json en_raw.json data/web
python3 tools/translate_en.py
```

`tools/translate_en.py` übersetzt Namen und Zutaten der englischen Rezepte mit den Tabellen in `tools/translations/` (englisch TAB deutsch). Mengen und Einheiten rechnet das Skript selbst um: Unzen, Pfund, Pints und US-Butterstangen in Gramm bzw. Milliliter, Esslöffel und Teelöffel in EL und TL, Tassen bleiben Tassen. Der Originalname bleibt im Feld `on` und im Suchindex, die Originalzutaten im Feld `og`. Kommen neue Rezepte dazu, zeigt `python3 tools/translate_en.py --fehlend ORDNER`, welche Einträge in den Tabellen noch fehlen.

## Fotos neu zuordnen

Die Bilder werden nicht kopiert, sondern direkt von der Quelle geladen (Wikimedia Commons, TheMealDB, Flickr über Openverse). Die Zuordnung läuft in fünf Schritten:

1. `tools/match_images.py`: zuerst das eigene Foto eines Wikibooks-Rezepts, sonst das Hauptfoto des Wikipedia-Artikels mit exakt passendem Namen.
2. `tools/match_images_more.py`: für die übrigen Rezepte Teile des Namens als Wikipedia-Artikel („Easy Chicken Curry with Rice“ → „Chicken curry“), angenommen nur, wenn die Kurzbeschreibung des Artikels ein Gericht nennt. Ein einzelnes Allgemeinwort wie „Soup“ oder „Kuchen“ reicht nicht. Danach eine Suche in Commons, bei der der Dateiname die wichtigen Wörter des Rezeptnamens enthalten muss.
3. `tools/photo_filter.py`: prüft die Treffer aus Schritt 2 und entfernt Fehlgriffe. Verworfen werden Artikel über Zutaten, Geräte oder Begriffe („Potato“, „Slow cooker“, „Wine“), Titel, die im Rezeptnamen nur hinter „with“ oder „mit“ stehen, Commons-Dateien ohne Essens-Kategorie oder in Kategorien für Personen, Orte, Tiere, Werbung usw., und Dateien, deren Name ein anderes Gericht als Hauptmotiv nennt. Eine kurze Handliste fängt Weiterleitungen auf ein falsches Gericht ab.
4. `tools/match_images_round3.py`: für die dann noch übrigen Rezepte Wikidata (gleicher Name, Beschreibung nennt ein Gericht), Commons mit dem englischen Namen (deutsche Rezepte über `tools/de_en_names.tsv`), TheMealDB und Openverse (Flickr und andere Plattformen, nur Creative-Commons- und gemeinfreie Fotos). Openverse erlaubt ohne Anmeldung 200 Anfragen am Tag; mit demselben Zwischenspeicher macht ein zweiter Lauf am nächsten Tag weiter. Die Prüfung aus Schritt 3 läuft am Ende automatisch.
5. `tools/fix_small_images.py`: stellt Fotos mit kleinem Original auf eine Vorschaugröße um, die Wikimedia ausliefert, und bereinigt Fotografennamen.

```
python3 tools/match_images.py builtin.json                  # Schritt 1, alles
python3 tools/match_images.py builtin.json --nur-eigene     # Schritt 1, nur die eigenen Rezepte
CACHE=cache.json MATCH_LOG=r2.json python3 tools/match_images_more.py   # Schritt 2
CACHE=cache.json python3 tools/photo_filter.py r2.json      # Schritt 3 (--trocken zeigt nur an)
CACHE=cache.json python3 tools/match_images_round3.py       # Schritt 4
python3 tools/fix_small_images.py                           # Schritt 5
```

`builtin.json` ist eine Liste `[[id, name], …]` der eigenen Rezepte. Für die eigenen Rezepte ohne passenden Wikipedia-Artikel sind die Fotos von Hand ausgesucht und stehen direkt in `data/images.js`.

Eigene Rezepte, die man in der App anlegt, bekommen ein Foto über den Editor. Es wird auf 900 px verkleinert und nur auf dem jeweiligen Gerät gespeichert.

## Hinweise

- Die eigenen Kreationen sind neue Kombinationen aus erprobten Techniken, als Ganzes nicht in einer Testküche nachgekocht.
- Thermomix-Angaben beziehen sich auf TM5 und TM6. Beim TM31 gehen höchstens 100 °C.
- Heißluftfritteusen heizen je nach Modell unterschiedlich. Die Zeiten sind Richtwerte.
- Thermomix ist eine Marke der Vorwerk SE & Co. KG. Diese App hat keine Verbindung zu Vorwerk.
- Internet-Rezepte: Autorinnen und Autoren von Wikibooks, Lizenz CC BY-SA 4.0.
- Fotos: Wikimedia Commons, TheMealDB und Fotoplattformen wie Flickr (über Openverse). Fotograf, Lizenz und Quelle stehen bei jedem Foto auf der Rezeptseite.
- Die eigenen Kreationen gibt es so nirgends als Foto. Sie zeigen ein Foto des nächstverwandten Gerichts, gekennzeichnet als „Ähnliches Gericht“ (bei den Miso-Karamell-Brownies zum Beispiel Brownies). Die Sterne-Teller zeigen Beispielfotos ähnlicher Teller, den genauen Aufbau zeigt der Anrichte-Plan.
