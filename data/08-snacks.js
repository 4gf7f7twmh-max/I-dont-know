/* Snacks & Vorspeisen */
R(
{
  id: 'guacamole', n: 'Guacamole', c: 'snacks', k: 'Mexiko', d: 1, p: 4, v: 2,
  desc: 'Grob zerdrückt, mit Limette, Koriander und Jalapeño.',
  ing: ['3 reife Avocados', '1 Limette', '½ weiße Zwiebel', '1 Jalapeño', '1 Tomate', '½ Bund Koriander', '1 TL Salz', 'Tortillachips'],
  m: {
    kalt: { t: 10, s: [
      ['chop', 'Zwiebel, entkernte Jalapeño und Koriander sehr fein hacken. Tomate entkernen und würfeln.'],
      ['mash', 'Zwiebel, Jalapeño, die Hälfte des Korianders und Salz in einer Schüssel oder einem Mörser zu einer groben Paste zerdrücken.'],
      ['chop', 'Avocados halbieren, Kern entfernen, Fruchtfleisch mit einem Löffel herauslösen.'],
      ['mash', 'Avocado zugeben und mit einer Gabel grob zerdrücken. Stückig lassen.'],
      ['season', 'Limettensaft, Tomate und restlichen Koriander unterheben, abschmecken.'],
      ['serve', 'Sofort mit Tortillachips servieren. Zum Aufbewahren Frischhaltefolie direkt auf die Oberfläche drücken.']
    ] }
  }
},
{
  id: 'hummus', n: 'Hummus', c: 'snacks', k: 'Nahost', d: 1, p: 6, v: 2,
  desc: 'Besonders cremig, wenn die Kichererbsen weichgekocht und noch warm püriert werden.',
  ing: ['2 Dosen Kichererbsen (à 240 g abgetropft)', '½ TL Natron', '100 g Tahini (Sesampaste)', 'Saft von 1 Zitrone', '1 Knoblauchzehe', '60 ml eiskaltes Wasser', '1 TL Salz', '½ TL Kreuzkümmel', 'Olivenöl, Paprikapulver, Petersilie'],
  prep: [['simmer', 'Kichererbsen abspülen und mit Natron und Wasser bedeckt 15 Minuten kochen, bis sie sehr weich sind und die Häutchen sich lösen. Abgießen. Das macht den Hummus besonders glatt.', { h: 'mittel', t: 15 }]],
  m: {
    kalt: { t: 25, note: 'Ein Standmixer oder Zerkleinerer mit Messer ist nötig. Mit dem Stabmixer wird er gröber.', s: [
      ['blend', 'Tahini, Zitronensaft, Knoblauch und Salz 1 Minute mixen, bis die Masse hell und dick wird.', { t: 1 }],
      ['blend', 'Warme Kichererbsen und Kreuzkümmel zugeben und 2 Minuten mixen, zwischendurch den Rand abstreifen.', { t: 2 }],
      ['pour', 'Bei laufendem Gerät das eiskalte Wasser einlaufen lassen und 1 weitere Minute mixen, bis er glatt und fluffig ist.', { t: 1 }],
      ['serve', 'Mit einem Löffel eine Mulde formen, Olivenöl hineingießen, mit Paprika und Petersilie bestreuen.']
    ] },
    tm: { t: 25, s: [
      ['tm', 'Knoblauch 3 Sek./Stufe 8 zerkleinern.', { sec: 3, s: 8 }],
      ['tm', 'Tahini, Zitronensaft und Salz zugeben, 20 Sek./Stufe 5.', { sec: 20, s: 5 }],
      ['tm', 'Warme Kichererbsen, Kreuzkümmel und eiskaltes Wasser zugeben, 1 Min./Stufe 8, nach unten schieben und nochmals 1 Min./Stufe 8.', { t: 2, s: 8 }],
      ['serve', 'Anrichten, mit Olivenöl und Paprika garnieren.']
    ] }
  }
},
{
  id: 'bruschetta', n: 'Bruschetta al pomodoro', c: 'snacks', k: 'Italien', d: 1, p: 4, v: 2,
  desc: 'Geröstetes Brot, mit Knoblauch abgerieben, mit marinierten Tomaten.',
  ing: ['1 Ciabatta oder 8 Scheiben Landbrot', '500 g reife Tomaten', '1 Knoblauchzehe, plus 1 zum Abreiben', '1 Bund Basilikum', '4 EL Olivenöl', '1 TL Balsamico (optional)', 'Salz, Pfeffer'],
  prep: [
    ['chop', 'Tomaten entkernen und in kleine Würfel schneiden. Einen Knoblauch fein hacken, Basilikum in Streifen schneiden.'],
    ['rest', 'Tomaten mit Knoblauch, Basilikum, 3 EL Öl, Balsamico, Salz und Pfeffer mischen und 15 Minuten ziehen lassen.', { t: 15 }],
    ['chop', 'Brot in 1,5 cm dicke Scheiben schneiden.']
  ],
  post: [
    ['spread', 'Die heißen Scheiben mit der halbierten Knoblauchzehe abreiben und mit restlichem Öl beträufeln.'],
    ['serve', 'Tomaten mit einem Löffel (ohne die Flüssigkeit) darauf verteilen und sofort servieren.']
  ],
  m: {
    ofen: { t: 30, s: [['bake', 'Brotscheiben auf dem Rost unter dem Backofengrill bei 240 °C von jeder Seite 1 bis 2 Minuten rösten.', { c: 240, mo: 'G', t: 3, i: 'tray' }]] },
    airfryer: { t: 25, s: [['airfry', 'Brotscheiben bei 200 °C 3 bis 4 Minuten rösten, nach der Hälfte wenden.', { c: 200, t: 4 }]] },
    grill: { t: 25, s: [['grill', 'Brotscheiben auf dem heißen Rost 1 Minute pro Seite grillen, bis sie Grillstreifen haben.', { t: 2 }]] },
    herd: { t: 25, s: [['fry', 'Brot in einer Grillpfanne ohne Fett bei hoher Hitze 1 bis 2 Minuten pro Seite rösten.', { h: 'hoch', t: 3 }]] }
  }
},
{
  id: 'fruehlingsrollen', n: 'Frühlingsrollen', c: 'snacks', k: 'China & Vietnam', d: 2, p: 4, v: 2, pu: 'Portionen (12 Rollen)',
  desc: 'Knusprig mit Gemüse und Glasnudeln, dazu süß-scharfe Chilisoße.',
  ing: ['12 Frühlingsrollenblätter (TK, 21 x 21 cm)', '50 g Glasnudeln', '200 g Weißkohl', '1 Möhre', '100 g Mungbohnensprossen', '4 Shiitake', '2 Frühlingszwiebeln', '2 Knoblauchzehen', '1 TL Ingwer, gerieben', '2 EL Sojasauce', '1 TL Sesamöl', '1 EL Öl', '1 EL Speisestärke mit 2 EL Wasser (zum Verkleben)', 'Öl zum Frittieren oder Einsprühen', 'Süß-scharfe Chilisoße'],
  prep: [
    ['rest', 'Glasnudeln 10 Minuten in heißem Wasser einweichen, abgießen und mit einer Schere kurz schneiden. Frühlingsrollenblätter auftauen lassen.', { t: 10 }],
    ['chop', 'Kohl, Möhre, Shiitake und Frühlingszwiebeln in feine Streifen schneiden, Knoblauch hacken.'],
    ['flip', 'Gemüse mit Knoblauch und Ingwer in 1 EL Öl im Wok 3 Minuten bei hoher Hitze braten. Nudeln, Sprossen, Sojasauce und Sesamöl untermischen. Vollständig abkühlen und abtropfen lassen.', { h: 'hoch', t: 3 }],
    ['shape', 'Ein Blatt als Raute hinlegen. 2 EL Füllung ins untere Drittel geben, untere Ecke darüberschlagen, Seiten einklappen und straff aufrollen. Obere Ecke mit Stärkewasser bestreichen und verkleben.']
  ],
  m: {
    herd: { t: 60, s: [
      ['deepfry', 'Öl in einem Topf oder Wok 4 cm hoch auf 175 °C erhitzen.', { c: 175, h: 'mittel' }],
      ['deepfry', 'Rollen portionsweise 3 bis 4 Minuten goldbraun frittieren, dabei wenden.', { c: 175, t: 4 }],
      ['rest', 'Auf einem Gitter abtropfen lassen.'],
      ['serve', 'Mit Chilisoße servieren.']
    ] },
    airfryer: { t: 55, s: [
      ['spread', 'Rollen rundherum dünn mit Öl einpinseln oder einsprühen.'],
      ['airfry', 'Mit der Naht nach unten bei 200 °C 8 Minuten garen.', { c: 200, t: 8 }],
      ['flip', 'Wenden.'],
      ['airfry', 'Weitere 4 bis 5 Minuten garen, bis sie gleichmäßig goldbraun sind.', { c: 200, t: 4 }],
      ['serve', 'Mit Chilisoße servieren.']
    ] },
    ofen: { t: 60, s: [
      ['bake', 'Backofen auf 220 °C Umluft vorheizen. Rollen mit Öl bepinseln und auf ein Blech mit Backpapier legen.', { c: 220, mo: 'U' }],
      ['bake', '15 bis 18 Minuten backen, nach 10 Minuten wenden.', { c: 220, mo: 'U', t: 16, i: 'tray' }],
      ['serve', 'Mit Chilisoße servieren.']
    ] }
  }
},
{
  id: 'tzatziki', n: 'Tzatziki', c: 'snacks', k: 'Griechenland', d: 1, p: 4, v: 1,
  desc: 'Dick und knoblauchlastig, aus griechischem Joghurt mit ausgedrückter Gurke.',
  ing: ['500 g griechischer Joghurt (10 % Fett)', '1 Salatgurke', '2 bis 3 Knoblauchzehen', '2 EL Olivenöl', '1 EL Weißweinessig oder Zitronensaft', '1 EL Dill, gehackt (optional)', '1 TL Salz'],
  m: {
    kalt: { t: 40, s: [
      ['grate', 'Gurke ungeschält grob raspeln.'],
      ['season', 'Mit ½ TL Salz mischen und 10 Minuten Wasser ziehen lassen.', { t: 10 }],
      ['mash', 'In einem sauberen Küchentuch kräftig ausdrücken. Je trockener, desto dicker wird das Tzatziki.'],
      ['stir', 'Joghurt mit gepresstem Knoblauch, Olivenöl, Essig, Dill und restlichem Salz verrühren, Gurke unterheben.'],
      ['chill', '30 Minuten kalt stellen, damit der Knoblauch durchzieht.', { t: 30 }],
      ['serve', 'Mit einem Faden Olivenöl servieren.']
    ] },
    tm: { t: 35, s: [
      ['tm', 'Knoblauch 3 Sek./Stufe 8 zerkleinern.', { sec: 3, s: 8 }],
      ['tm', 'Gurke in Stücken zugeben, 4 Sek./Stufe 4 zerkleinern. In einem Tuch kräftig ausdrücken.', { sec: 4, s: 4 }],
      ['tm', 'Gurke zurück in den Mixtopf, Joghurt, Öl, Essig, Dill und Salz zugeben, 15 Sek./Linkslauf/Stufe 3.', { sec: 15, l: true, s: 3 }],
      ['chill', '30 Minuten kalt stellen.', { t: 30 }]
    ] }
  }
},
{
  id: 'gyoza', n: 'Gyoza', c: 'snacks', k: 'Japan', d: 3, p: 4, pu: 'Portionen (ca. 30 Stück)',
  desc: 'Teigtaschen mit Schweinefleisch und Kohl, unten knusprig gebraten, oben gedämpft.',
  ing: ['30 Gyoza-Teigblätter (TK)', '250 g Schweinehack', '150 g Chinakohl', '½ TL Salz (für den Kohl)', '2 Frühlingszwiebeln', '2 Knoblauchzehen', '1 TL Ingwer, gerieben', '1 EL Sojasauce', '1 TL Sesamöl', '1 TL Speisestärke', '2 EL Öl zum Braten', '#Dip', '3 EL Sojasauce', '2 EL Reisessig', 'Chiliöl'],
  prep: [
    ['chop', 'Chinakohl sehr fein hacken, mit Salz mischen und 10 Minuten ziehen lassen. In einem Tuch kräftig ausdrücken. Frühlingszwiebeln und Knoblauch fein hacken.', { t: 10 }],
    ['knead', 'Hack, Kohl, Frühlingszwiebeln, Knoblauch, Ingwer, Sojasauce, Sesamöl und Stärke 2 Minuten kräftig verkneten, bis die Masse klebrig ist.', { t: 2 }],
    ['shape', 'Einen Teelöffel Füllung in die Mitte eines Teigblatts geben. Rand rundherum mit Wasser befeuchten. Zusammenklappen und an einer Seite 5 bis 6 kleine Falten legen, dabei fest andrücken.']
  ],
  m: {
    herd: { t: 70, note: 'Eine beschichtete Pfanne mit passendem Deckel ist nötig.', s: [
      ['fry', '1 EL Öl in einer beschichteten Pfanne bei mittlerer bis hoher Hitze erhitzen. Gyoza mit der flachen Seite nach unten dicht an dicht hineinsetzen.', { h: 'hoch' }],
      ['fry', '2 Minuten braten, bis die Unterseite goldbraun ist.', { h: 'hoch', t: 2 }],
      ['pour', '80 ml Wasser angießen (Vorsicht, es zischt) und sofort den Deckel auflegen.'],
      ['steam', 'Bei mittlerer Hitze 4 bis 5 Minuten dämpfen, bis das Wasser verdampft ist und der Teig glasig wird.', { h: 'mittel', t: 5 }],
      ['fry', 'Deckel abnehmen, ein paar Tropfen Sesamöl angießen und noch 1 Minute braten, bis der Boden wieder knusprig ist.', { h: 'mittel', t: 1 }],
      ['serve', 'Mit einem Teller stürzen, sodass die knusprige Seite oben liegt. Mit Dip aus Sojasauce, Essig und Chiliöl servieren.']
    ] }
  },
  tips: ['Roh auf einem bemehlten Blech einfrieren und dann in Beutel füllen. Gefroren braten und 2 Minuten länger dämpfen.']
},
{
  id: 'empanadas', n: 'Empanadas', c: 'snacks', k: 'Argentinien', d: 2, p: 4, pu: 'Portionen (12 Stück)',
  desc: 'Teigtaschen mit würziger Rindfleischfüllung, Ei und Oliven.',
  ing: ['#Teig', '400 g Mehl', '100 g kalte Butter oder Schmalz', '1 TL Salz', '180 ml warmes Wasser', '#Füllung', '400 g Rinderhack', '1 Zwiebel', '1 rote Paprika', '2 Frühlingszwiebeln', '1 TL Kreuzkümmel', '1 TL Paprikapulver', '½ TL Chiliflocken', '1 TL Oregano', '2 hart gekochte Eier', '12 grüne Oliven', 'Salz, Pfeffer', '1 Eigelb zum Bestreichen'],
  prep: [
    ['knead', 'Mehl, Salz und Butter verkrümeln, Wasser zugeben und 5 Minuten zu einem glatten Teig kneten.', { t: 5 }],
    ['chill', 'In Folie 30 Minuten kalt stellen.', { t: 30 }],
    ['chop', 'Zwiebel und Paprika fein würfeln, Frühlingszwiebeln in Ringe schneiden, Eier würfeln, Oliven halbieren.'],
    ['fry', 'Zwiebel und Paprika 5 Minuten dünsten, Hack zugeben und krümelig braten, Gewürze unterrühren. Frühlingszwiebeln zugeben, abschmecken und vollständig abkühlen lassen.', { h: 'mittel', t: 12 }],
    ['roll', 'Teig 3 mm dünn ausrollen und 12 Kreise (ca. 13 cm) ausstechen.'],
    ['shape', 'Je 2 EL Füllung, etwas Ei und eine halbe Olive auf eine Hälfte geben. Rand befeuchten, zuklappen und den Rand mit einer Gabel festdrücken oder zu einer Kordel eindrehen (Repulgue).']
  ],
  m: {
    ofen: { t: 90, s: [
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen.', { c: 200, mo: 'OU' }],
      ['spread', 'Empanadas auf ein Blech mit Backpapier legen und mit verquirltem Eigelb bestreichen.'],
      ['bake', '20 bis 25 Minuten goldbraun backen.', { c: 200, mo: 'OU', t: 22, i: 'cookies' }],
      ['serve', 'Warm servieren, dazu Chimichurri.']
    ] },
    airfryer: { t: 85, s: [
      ['spread', 'Empanadas mit Eigelb bestreichen.'],
      ['airfry', 'In einer Lage bei 180 °C 10 bis 12 Minuten backen.', { c: 180, t: 11 }],
      ['serve', 'Warm servieren.']
    ] },
    herd: { t: 85, s: [
      ['deepfry', 'Öl 3 cm hoch auf 175 °C erhitzen und die Empanadas portionsweise je Seite 2 bis 3 Minuten goldbraun ausbacken.', { c: 175, h: 'mittel', t: 5 }],
      ['rest', 'Auf Küchenpapier abtropfen lassen und servieren.']
    ] }
  }
},
{
  id: 'nachos', n: 'Überbackene Nachos', c: 'snacks', k: 'Mexiko & USA', d: 1, p: 4, v: 1,
  desc: 'Tortillachips mit Bohnen, Käse und Jalapeños, überbacken.',
  ing: ['200 g Tortillachips', '1 Dose schwarze Bohnen (240 g abgetropft)', '200 g Cheddar, gerieben', '2 Jalapeños in Scheiben (aus dem Glas)', '1 Tomate', '2 Frühlingszwiebeln', 'Guacamole, Salsa, saure Sahne'],
  prep: [
    ['chop', 'Tomate würfeln, Frühlingszwiebeln in Ringe schneiden. Bohnen abspülen.'],
    ['layer', 'Chips in einer ofenfesten Form oder auf einem Teller in zwei Lagen verteilen, jeweils mit Bohnen, Käse und Jalapeños bestreuen.']
  ],
  post: [['serve', 'Mit Tomate und Frühlingszwiebeln bestreuen und mit Guacamole, Salsa und saurer Sahne servieren.']],
  m: {
    ofen: { t: 20, s: [['bake', 'Bei 200 °C Ober-/Unterhitze 8 bis 10 Minuten überbacken, bis der Käse geschmolzen ist.', { c: 200, mo: 'OU', t: 9, i: 'dish' }]] },
    airfryer: { t: 15, s: [['airfry', 'In einer passenden Form bei 180 °C 4 bis 5 Minuten überbacken.', { c: 180, t: 5 }]] },
    mikro: { t: 10, note: 'Die Chips werden etwas weicher als im Ofen.', s: [['micro', 'Auf einem Teller bei 800 Watt 1 bis 2 Minuten erhitzen, bis der Käse geschmolzen ist.', { t: 1.5, w: 800 }]] }
  }
}
);
