# Kochatlas

Kochbuch-App im Browser mit Schritt-für-Schritt-Anleitungen für jedes Küchengerät. Jeder Arbeitsschritt hat eine eigene Animation, die zeigt, was zu tun ist (Schneiden, Rühren, Kneten, Thermomix mit laufendem Messer, Backofen mit Umluftventilator, Heißluftfritteuse und so weiter).

## Was drin ist

- 4522 Rezepte aus über 120 Ländern und Regionen:
  - 160 eigene Rezepte mit getrennten Anleitungen pro Gerät, davon 17 aus der Sterneküche (mit Anrichte-Plan) und 10 eigene Kreationen
  - 4362 Rezepte aus dem Internet: das komplette deutsche Wikibooks-Kochbuch (650) und das englische Wikibooks Cookbook (3712), Lizenz CC BY-SA, jeweils mit Link zum Original
- Sterneküche: Jakobsmuscheln, Rinderfilet mit Fondant, confierter Lachs, Kalbsbäckchen, Entenbrust, Beef Tatar, Tomatenessenz, Zander mit Beurre blanc, Ravioli, Lammrücken, Schokoladen-Crémeux, Zitronentarte, Rote Bete in Texturen, Kürbis-Velouté sowie Kalbsjus, Beurre blanc und Hollandaise als Grundtechniken
- Anrichte-Plan: Ein Teller von oben, auf dem jede Komponente nacheinander erscheint, mit Uhrzeit-Markierungen und Erklärung pro Handgriff. Dazu eine Anrichte-Schule mit 12 Grundtechniken (Swoosh, Quenelle, Punkte, Ringform, Fächern, Höhe …)
- Gemeinsame Einkaufsliste: In der über Claude geteilten Version live für alle Eingeladenen, sonst lokal und als Text teilbar
- Mit Claude umschreiben (nur in der Claude-Version): übersetzt englische Rezepte und schreibt jedes Rezept für ein anderes Gerät um, das Ergebnis wird für alle gespeichert
- 340 Geräte-Anleitungen: getrennte Anleitungen für Herd, Backofen, Heißluftfritteuse, Thermomix, Mikrowelle, Schnellkochtopf, Slow Cooker, Grill, Sous-vide oder „ohne Kochen“
- 37 animierte Techniken als SVG, jede Animation zeigt die Einstellungen des Schritts (Temperatur, Ofenmodus, Thermomix-Stufe, Linkslauf, Zeit)
- Kochmodus im Vollbild mit Wischgesten, Pfeiltasten und eingeschaltetem Bildschirm
- Timer an jedem Schritt mit Zeitangabe, mehrere gleichzeitig, mit Signalton und Vibration
- Portionen umrechnen, Zutaten abhaken, fehlende Zutaten auf die Einkaufsliste
- Favoriten, Notizen pro Rezept, heller und dunkler Modus
- „Meine Küche“: Geräte auswählen, die man hat, die App filtert danach
- Eigene Rezepte anlegen: Animation, Temperatur, Stufe und Timer werden aus dem Text erkannt (z. B. „200 °C Umluft“, „5 Min./100 °C/Linkslauf/Stufe 1“). Export und Import als JSON
- Suche mit deutschen Begriffen findet auch englische Rezepte („Hähnchen“ findet „Chicken“)
- Zusätzliche Live-Suche in TheMealDB (englisch, mit Fotos), Rezepte lassen sich in „Meine Rezepte“ übernehmen
- Installierbar als App (PWA) und offline nutzbar

Alle Daten (Favoriten, Einkaufsliste, Notizen, eigene Rezepte) bleiben im Browser des Geräts.

## Starten

Keine Installation, kein Build-Schritt. Einen beliebigen Webserver im Projektordner starten, zum Beispiel:

```
python3 -m http.server 8000
```

Dann `http://localhost:8000` öffnen. Die Datei `index.html` lässt sich auch direkt im Browser öffnen, dann funktionieren nur Offline-Modus und Installation nicht.

Für das Handy: Den Ordner auf GitHub Pages, Netlify oder einem anderen statischen Hosting veröffentlichen und im Browser „Zum Startbildschirm hinzufügen“ wählen.

## Aufbau

```
index.html            Einstieg
css/style.css         Design und alle Animationen (Keyframes)
js/devices.js         Geräte, Kategorien, Techniken
js/icons.js           Strich-Icons
js/animations.js      SVG-Szenen für jede Technik
js/app.js             Routing, Ansichten, Kochmodus, Timer, Editor, Online-Suche
js/plating.js         Anrichte-Pläne (Teller von oben)
data/*.js             eigene Rezepte, nach Kategorie aufgeteilt
data/web/index.js     Suchindex der Internet-Rezepte
data/web/chunk-*.js   Internet-Rezepte, werden bei Bedarf nachgeladen
tools/import_wikibooks.py  Import-Skript für die Wikibooks-Rezepte
sw.js                 Service Worker für den Offline-Modus
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
  },
  tips: ['Optionaler Tipp']
});
```

Felder: `c` Kategorie (siehe `js/devices.js`), `d` Schwierigkeit 1 bis 3, `p` Portionen, `v` 0 = mit Fleisch/Fisch, 1 = vegetarisch, 2 = vegan. `prep` und `post` gelten für alle Geräte, `m` enthält die Schritte pro Gerät mit Gesamtzeit `t` in Minuten.

Ein Schritt ist `[technik, text, optionen]`. Optionen: `t` Minuten, `sec` Sekunden, `c` Temperatur in °C oder `'Varoma'`, `mo` Ofenmodus (`OU`, `U`, `G`, `UG`), `h` Herdhitze (`max`, `hoch`, `mittel`, `niedrig`), `s` Thermomix-Stufe (Zahl, `'teig'`, `'sanft'`), `l` Linkslauf, `k` Kerntemperatur, `w` Watt, `lvl` Slow-Cooker-Stufe, `p` Druckstufe, `i` Ofeninhalt für die Animation (`cake`, `loaf`, `pizza`, `roast`, `tray`, `cookies`, `dish`).

Technik-Schlüssel: prep, chop, grate, stir, boil, simmer, fry, flip, deepfry, bake, airfry, tm, whisk, mix, fold, knead, shape, rest, season, pour, serve, blend, grill, steam, roll, cool, chill, micro, slow, pressure, mash, spread, layer.

## Internet-Rezepte neu importieren

Die Wikitexte werden mit der MediaWiki-API geladen (prop=revisions, 50 Seiten pro Anfrage) und als JSON `{Titel: Wikitext}` gespeichert, dann:

```
python3 tools/import_wikibooks.py de_raw.json en_raw.json data/web
```

## Geteilte Einkaufsliste

Die Live-Synchronisierung nutzt die Datenbank der veröffentlichten Claude-Version. Wer per E-Mail als Bearbeiter eingeladen ist, kann mitschreiben, alle sehen Änderungen sofort. In jeder anderen Umgebung (eigener Webserver, Datei) bleibt die Liste lokal und lässt sich als Text teilen.

## Hinweise

- Die eigenen Kreationen sind neue Kombinationen aus erprobten Techniken. Als Ganzes wurden sie nicht in einer Testküche nachgekocht.
- Thermomix-Angaben beziehen sich auf TM5 und TM6. Beim TM31 gehen höchstens 100 °C, Schritte mit 120 °C dann bei Varoma-Temperatur garen.
- Heißluftfritteusen heizen je nach Modell unterschiedlich. Die Zeiten sind Richtwerte, beim ersten Mal nachsehen.
- Thermomix ist eine Marke der Vorwerk SE & Co. KG. Diese App hat keine Verbindung zu Vorwerk.
