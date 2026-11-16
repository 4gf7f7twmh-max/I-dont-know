# Kochatlas

Kochbuch-App im Browser mit Schritt-für-Schritt-Anleitungen für jedes Küchengerät. Jeder Arbeitsschritt hat eine eigene Animation, die zeigt, was zu tun ist (Schneiden, Rühren, Kneten, Thermomix mit laufendem Messer, Backofen mit Umluftventilator, Heißluftfritteuse und so weiter).

## Was drin ist

- 143 Rezepte in 13 Kategorien aus 44 Ländern und Regionen, davon 10 eigene Kreationen
- 311 Geräte-Anleitungen: Für die meisten Rezepte gibt es getrennte Anleitungen für Herd, Backofen, Heißluftfritteuse, Thermomix, Mikrowelle, Schnellkochtopf, Slow Cooker, Grill oder „ohne Kochen“
- 33 animierte Techniken als SVG, jede Animation zeigt die Einstellungen des Schritts (Temperatur, Ofenmodus, Thermomix-Stufe, Linkslauf, Zeit)
- Kochmodus im Vollbild mit Wischgesten, Pfeiltasten und eingeschaltetem Bildschirm
- Timer an jedem Schritt mit Zeitangabe, mehrere gleichzeitig, mit Signalton und Vibration
- Portionen umrechnen, Zutaten abhaken, fehlende Zutaten auf die Einkaufsliste
- Favoriten, Notizen pro Rezept, heller und dunkler Modus
- „Meine Küche“: Geräte auswählen, die man hat, die App filtert danach
- Eigene Rezepte anlegen: Animation, Temperatur, Stufe und Timer werden aus dem Text erkannt (z. B. „200 °C Umluft“, „5 Min./100 °C/Linkslauf/Stufe 1“). Export und Import als JSON
- Online-Suche in der freien Datenbank TheMealDB (englische Texte, Animationen werden automatisch zugeordnet), Rezepte lassen sich in „Meine Rezepte“ übernehmen
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
data/*.js             Rezepte, nach Kategorie aufgeteilt
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

## Hinweise

- Die eigenen Kreationen sind neue Kombinationen aus erprobten Techniken. Als Ganzes wurden sie nicht in einer Testküche nachgekocht.
- Thermomix-Angaben beziehen sich auf TM5 und TM6. Beim TM31 gehen höchstens 100 °C, Schritte mit 120 °C dann bei Varoma-Temperatur garen.
- Heißluftfritteusen heizen je nach Modell unterschiedlich. Die Zeiten sind Richtwerte, beim ersten Mal nachsehen.
- Thermomix ist eine Marke der Vorwerk SE & Co. KG. Diese App hat keine Verbindung zu Vorwerk.
