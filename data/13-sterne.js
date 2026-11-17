/* Sterneküche: Gerichte und Grundtechniken auf Restaurantniveau, mit Anrichte-Plan (plate).
   Anrichte-Elemente siehe js/plating.js. Koordinaten 0..300, Tellermitte 150/150, 12 Uhr oben. */
R(
{
  id: 'st-jakobsmuscheln', n: 'Jakobsmuscheln auf Blumenkohlpüree mit Nussbutter, Kapern und Rosinen', c: 'sterne', k: 'Frankreich', d: 3, p: 4,
  desc: 'Klassische Vorspeise der modernen französischen Küche: karamellisierte Muscheln, seidiges Püree, süß-saure Nussbutter.',
  ing: ['#Jakobsmuscheln', '8 große Jakobsmuscheln ohne Rogen (unbehandelt, „dry“)', '1 EL Traubenkernöl', 'Fleur de Sel', '#Blumenkohlpüree', '400 g Blumenkohlröschen', '200 ml Milch', '100 ml Sahne', '40 g kalte Butter', 'Salz, weißer Pfeffer, Muskat', '#Kapern-Rosinen-Nussbutter', '30 g Rosinen', '2 EL Sherryessig', '2 EL kleine Kapern (Nonpareilles)', '60 g Butter', '1 TL Zitronensaft', '#Garnitur', '2 rohe Blumenkohlröschen', 'Kerbel oder Kresse'],
  prep: [
    ['rest', 'Rosinen mit Sherryessig und 2 EL heißem Wasser 20 Minuten einweichen.', { t: 20 }],
    ['prep', 'Jakobsmuscheln: den kleinen, festen Seitenmuskel abzupfen. Auf Küchenpapier legen, oben ebenfalls Papier, und unbedeckt 30 Minuten im Kühlschrank trocknen lassen. Nur trockene Muscheln bekommen eine Kruste.', { t: 30 }],
    ['chop', 'Rohe Blumenkohlröschen für die Garnitur mit einem Gemüsehobel in hauchdünne Scheiben schneiden.']
  ],
  m: {
    herd: { t: 60, s: [
      ['simmer', 'Blumenkohl mit Milch, Sahne und einer Prise Salz mit Deckel 15 Minuten weich köcheln.', { h: 'niedrig', t: 15 }],
      ['blend', 'Blumenkohl abgießen, die Flüssigkeit auffangen. Mit der kalten Butter im Standmixer 2 Minuten auf höchster Stufe mixen, dabei so viel Kochflüssigkeit zugeben, dass das Püree wie dicke Crème vom Löffel fließt.', { t: 2 }],
      ['strain', 'Durch ein feines Sieb streichen. Mit Salz, weißem Pfeffer und Muskat abschmecken und abgedeckt warm halten.'],
      ['fry', 'Für die Nussbutter die Butter in einem hellen Topf bei mittlerer Hitze schmelzen und schäumen lassen, bis sie hellbraun ist und nach Haselnuss riecht (3 bis 4 Minuten).', { h: 'mittel', t: 4 }],
      ['stir', 'Sofort vom Herd nehmen, abgetropfte Rosinen, Kapern und Zitronensaft einrühren. Warm halten.'],
      ['fry', 'Eine Edelstahl- oder Gusseisenpfanne auf hoher Stufe erhitzen, bis das Öl leicht raucht. Muscheln im Uhrzeigersinn einlegen, so weißt du später, welche zuerst kam.', { h: 'max' }],
      ['fry', '90 Sekunden braten, ohne sie zu bewegen, bis die Unterseite tief goldbraun ist.', { h: 'hoch', sec: 90 }],
      ['flip', 'In derselben Reihenfolge wenden und 30 bis 60 Sekunden braten. Innen bleiben sie glasig (Kerntemperatur 45 bis 50 °C). Erst jetzt mit Fleur de Sel würzen.', { h: 'hoch', sec: 45, k: 48 }],
      ['serve', 'Sofort anrichten, siehe Anrichte-Plan.']
    ] },
    tm: { t: 60, note: 'Das Püree macht der Thermomix, die Muscheln werden in der Pfanne gebraten.', s: [
      ['tm', 'Blumenkohl, Milch, Sahne und Salz in den Mixtopf geben, 15 Min./100 °C/Stufe 1 garen.', { t: 15, c: 100, s: 1 }],
      ['tm', 'Etwa 100 ml Flüssigkeit abgießen und aufheben. Butter zugeben, 1 Min./Stufe 4 bis 10 schrittweise ansteigend mixen. Bei Bedarf Flüssigkeit zugeben.', { t: 1, s: 10 }],
      ['strain', 'Durch ein feines Sieb streichen und abschmecken.'],
      ['fry', 'Nussbutter im Topf zubereiten, Rosinen, Kapern und Zitronensaft zugeben.', { h: 'mittel', t: 4 }],
      ['fry', 'Muscheln in sehr heißem Öl 90 Sekunden braten.', { h: 'max', sec: 90 }],
      ['flip', 'Wenden, 45 Sekunden braten, salzen.', { h: 'hoch', sec: 45, k: 48 }],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'swoosh', x: 150, y: 158, len: 150, a: -12, w: 30, col: '#efe4c8', t: 'Püree-Swoosh', how: 'Einen gehäuften Esslöffel Püree auf 9 Uhr setzen. Den Löffelrücken mittig hineindrücken und in einem Zug Richtung 3 Uhr ziehen. Nicht nachbessern.' },
    { e: 'disc', x: 112, y: 150, r: 17, col: '#f4ead6', sear: '#c98a3c', rep: 3, dx: 38, dy: -7, t: 'Muscheln', how: 'Drei Muscheln mit der gebräunten Seite nach oben auf den Swoosh setzen, leicht versetzt. Ungerade Zahlen wirken auf dem Teller ruhiger als gerade.' },
    { e: 'spheres', x: 150, y: 194, n: 9, r: 3.6, spread: 34, col: '#6f7f2c', t: 'Kapern und Rosinen', how: 'Mit einem Teelöffel Kapern und Rosinen in die Lücken und vor die Muscheln setzen.' },
    { e: 'drizzle', x: 150, y: 152, r: 58, n: 9, arc: 3.4, from: 0.2, col: '#c98f3d', t: 'Nussbutter', how: 'Mit dem Löffel ein paar Tropfen Nussbutter um die Muscheln setzen, nicht darüber, sonst weicht die Kruste auf.' },
    { e: 'shard', x: 196, y: 128, size: 26, a: 20, col: '#f6efe0', t: 'Roher Blumenkohl', how: 'Zwei, drei gehobelte Blumenkohlscheiben aufrecht an die Muscheln lehnen. Gibt Höhe und Biss.' },
    { e: 'herbs', x: 140, y: 140, r: 40, n: 5, col: '#5aa04a', t: 'Kerbel', how: 'Zum Schluss ein paar Kerbelblätter mit der Pinzette setzen. Weniger ist mehr.' }
  ] },
  tips: ['Unbehandelte („dry“) Jakobsmuscheln kaufen. Mit Wasser und Phosphat behandelte Ware gibt beim Braten Flüssigkeit ab und bräunt nicht.', 'Teller vorwärmen (60 °C im Ofen), dann bleibt das Püree warm.']
},
{
  id: 'st-rinderfilet', n: 'Rinderfilet mit Rotweinjus, Kartoffelfondant und glasierten Möhren', c: 'sterne', k: 'Frankreich', d: 3, p: 4,
  desc: 'Rosa gegartes Filet, in Butter gebratene und geschmorte Kartoffelzylinder, glänzende Reduktion.',
  ing: ['#Filet', '4 Rinderfiletmedaillons (à 160 g, 4 cm hoch)', '2 EL Öl', '30 g Butter', '2 Zweige Thymian', '1 Knoblauchzehe', 'Fleur de Sel, Pfeffer', '#Kartoffelfondant', '4 große festkochende Kartoffeln', '80 g Butter', '200 ml Geflügel- oder Kalbsfond', '2 Zweige Thymian', '#Rotweinjus', '300 ml Kalbsjus (siehe Grundrezept) oder kräftiger Fond', '250 ml Rotwein', '2 Schalotten', '1 TL Zucker', '20 g kalte Butter', '#Möhren', '8 Bundmöhren', '20 g Butter', '1 TL Zucker', '100 ml Wasser', 'Salz'],
  prep: [
    ['rest', 'Filets 45 Minuten vor dem Garen aus dem Kühlschrank nehmen, trocken tupfen. Mit Küchengarn in Form binden, damit sie gleichmäßig garen.', { t: 45 }],
    ['chop', 'Kartoffeln schälen, auf 4 cm Höhe zuschneiden und mit einem Ausstecher (5 cm) zu Zylindern ausstechen. Kanten mit dem Sparschäler abschrägen.'],
    ['chop', 'Möhren schälen, 1 cm Grün stehen lassen. Schalotten fein würfeln.']
  ],
  m: {
    herd: { t: 90, note: 'Für Fondant und Filet braucht es zusätzlich den Backofen.', s: [
      ['simmer', 'Jus: Schalotten mit Zucker in einem Topf leicht karamellisieren, mit Rotwein ablöschen und auf ein Viertel einkochen. Kalbsjus zugeben und auf die Hälfte reduzieren, bis die Soße einen Löffel überzieht.', { h: 'mittel', t: 25 }],
      ['strain', 'Durch ein feines Sieb passieren und warm halten. Die kalte Butter erst kurz vor dem Servieren einschwenken.'],
      ['fry', 'Fondant: Kartoffeln in einer ofenfesten Pfanne in 40 g Butter bei mittlerer Hitze auf einer Seite 6 bis 8 Minuten tiefgolden braten.', { h: 'mittel', t: 7 }],
      ['flip', 'Wenden, restliche Butter, Thymian und Fond zugeben (Kartoffeln zur Hälfte bedeckt).'],
      ['bake', 'Im Ofen bei 200 °C Ober-/Unterhitze 30 bis 35 Minuten garen, bis ein Messer ohne Widerstand hineingleitet. Zweimal mit dem Fond übergießen.', { c: 200, mo: 'OU', t: 32, i: 'tray' }],
      ['simmer', 'Möhren mit Butter, Zucker, Salz und Wasser in eine Pfanne geben, mit Backpapier abdecken (mit Loch in der Mitte) und 8 Minuten köcheln, bis das Wasser verkocht ist. Dann schwenken, bis sie glänzen.', { h: 'mittel', t: 8 }],
      ['fry', 'Filets salzen. In einer sehr heißen Pfanne in Öl rundherum 4 bis 5 Minuten kräftig anbraten.', { h: 'hoch', t: 5 }],
      ['fry', 'Butter, angedrückten Knoblauch und Thymian zugeben und die Filets 1 Minute mit schäumender Butter übergießen.', { h: 'mittel', t: 1 }],
      ['bake', 'Im Ofen bei 140 °C bis zur Kerntemperatur 52 °C garen (ca. 8 bis 12 Minuten).', { c: 140, mo: 'OU', t: 10, k: 52, i: 'roast' }],
      ['rest', 'Auf einem Gitter 6 Minuten ruhen lassen. Die Temperatur steigt auf etwa 55 °C (medium rare).', { t: 6 }],
      ['serve', 'Garn entfernen, Filets halbieren und anrichten, siehe Anrichte-Plan.']
    ] },
    sousvide: { t: 150, note: 'Sous-vide gart das Filet von Rand zu Rand gleichmäßig rosa. Fondant, Jus und Möhren wie bei der Herd-Variante.', s: [
      ['prep', 'Filets mit je einem Thymianzweig vakuumieren (oder in Gefrierbeuteln nach der Wasserverdrängungsmethode).'],
      ['sousvide', 'Im Wasserbad bei 54 °C 90 Minuten garen (bis 3 Stunden möglich).', { c: 54, t: 90 }],
      ['simmer', 'Währenddessen Jus, Fondant (im Ofen bei 200 °C) und Möhren zubereiten.', { h: 'mittel', t: 40 }],
      ['prep', 'Filets aus dem Beutel nehmen und sehr gründlich trocken tupfen.'],
      ['fry', 'In einer rauchend heißen Pfanne je 45 Sekunden pro Seite scharf anbraten, Butter und Thymian zum Schluss zugeben.', { h: 'max', sec: 90 }],
      ['serve', 'Ohne Ruhezeit halbieren und anrichten.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'disc', x: 104, y: 124, r: 24, col: '#f2d48c', sear: '#c88832', t: 'Fondant auf 10 Uhr', how: 'Die Kartoffel mit der gebräunten Seite nach oben auf 10 Uhr setzen.' },
    { e: 'block', x: 128, y: 202, w: 54, h: 12, a: 12, col: '#ef8a2e', rx: 6, rep: 3, dx: 14, dy: -10, da: -6, t: 'Möhren auf 7 bis 5 Uhr', how: 'Drei glasierte Möhren leicht gefächert im unteren Bereich legen, Grün nach außen.' },
    { e: 'slices', x: 172, y: 146, n: 2, r: 26, a: 15, col: '#5c2418', inner: '#cf5f55', t: 'Filet in der Mitte', how: 'Filet quer halbieren, beide Hälften mit der Schnittfläche nach oben leicht versetzt an die Mitte legen. Mit Fleur de Sel und Pfeffer würzen.' },
    { e: 'pool', x: 200, y: 196, r: 16, col: '#4a1810', t: 'Jus', how: 'Jus mit einem Löffel neben das Fleisch setzen und einen Hauch über die Möhren ziehen. Nie über die Schnittfläche gießen.' },
    { e: 'dots', x: 150, y: 96, n: 5, len: 70, size: 4, col: '#4a1810', curve: 6, t: 'Jus-Punkte', how: 'Optional eine Reihe kleiner Jus-Punkte im Bogen auf 12 Uhr. Gibt dem Teller Rhythmus.' },
    { e: 'herbs', x: 106, y: 118, r: 12, n: 3, col: '#5b8a3a', t: 'Thymianspitzen', how: 'Zwei, drei Thymianspitzen auf den Fondant.' }
  ] }
},
{
  id: 'st-lachs-confiert', n: 'Confierter Lachs mit Gurke, Dillöl und Buttermilch', c: 'sterne', k: 'Skandinavien', d: 2, p: 4,
  desc: 'Bei 45 °C gegart wird Lachs zart wie Butter und bleibt glasig. Frisch durch Gurke, Dill und säuerliche Buttermilch.',
  ing: ['#Lachs', '400 g Lachsrücken ohne Haut, Sushi-Qualität', '20 g Salz', '10 g Zucker', 'Abrieb von ½ Bio-Zitrone', '300 ml mildes Olivenöl', '#Dillöl', '1 Bund Dill', '100 ml neutrales Öl', '#Buttermilchsoße', '200 ml Buttermilch', '2 EL Crème fraîche', '1 TL Zitronensaft', 'Salz, Zucker', '#Gurke', '1 Salatgurke', '2 EL Reisessig', '1 TL Zucker', '#Garnitur', '2 EL Forellenkaviar (optional)', 'Dillspitzen'],
  prep: [
    ['season', 'Salz, Zucker und Zitronenabrieb mischen, den Lachs damit einreiben und 30 Minuten im Kühlschrank beizen. Danach abspülen und trocken tupfen.', { t: 30 }],
    ['blend', 'Dillöl: Dill (mit Stielen) und Öl im Mixer 2 Minuten auf höchster Stufe mixen, bis das Öl warm wird. Durch ein Kaffeefilter tropfen lassen. Das Ergebnis ist leuchtend grünes, klares Öl.', { t: 2 }],
    ['chop', 'Gurke: Mit einem Kugelausstecher 20 Kugeln ausstechen. Rest schälen, entkernen und in 3 mm Würfel schneiden. Beides mit Reisessig, Zucker und Salz marinieren.'],
    ['whisk', 'Buttermilch mit Crème fraîche, Zitronensaft, Salz und einer Prise Zucker glatt rühren. Kalt stellen.'],
    ['chop', 'Lachs in 4 gleich große Rechtecke schneiden.']
  ],
  m: {
    ofen: { t: 80, note: 'Ein Thermometer im Öl ist nötig. Der Ofen hält die niedrige Temperatur schlecht genau, deshalb immer messen.', s: [
      ['bake', 'Backofen auf 60 °C Ober-/Unterhitze vorheizen. Olivenöl in einer kleinen Form im Ofen auf 45 °C erwärmen (messen).', { c: 60, mo: 'OU', t: 20 }],
      ['bake', 'Lachs einlegen, er muss bedeckt sein. 15 bis 20 Minuten garen, bis die Kerntemperatur 42 bis 45 °C beträgt.', { c: 60, mo: 'OU', t: 18, k: 43, i: 'dish' }],
      ['rest', 'Herausheben und auf Küchenpapier kurz abtropfen lassen.'],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] },
    sousvide: { t: 70, s: [
      ['prep', 'Lachsstücke mit 1 EL Olivenöl einzeln vakuumieren.'],
      ['sousvide', 'Im Wasserbad bei 45 °C 25 Minuten garen.', { c: 45, t: 25 }],
      ['rest', 'Aus dem Beutel nehmen und abtupfen.'],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'deep', els: [
    { e: 'bowlfill', x: 150, y: 152, r: 64, col: '#f3f0e8', t: 'Buttermilch', how: 'Drei bis vier Esslöffel kalte Buttermilchsoße in die Mitte des tiefen Tellers gießen und durch Schwenken rund verlaufen lassen.' },
    { e: 'block', x: 150, y: 148, w: 72, h: 30, rx: 10, col: '#f58f5c', t: 'Lachs', how: 'Lachs mittig auf die Soße legen. Die schönste Seite nach oben.' },
    { e: 'spheres', x: 150, y: 192, n: 7, r: 6.5, spread: 38, col: '#a9cf5a', t: 'Gurkenkugeln', how: 'Gurkenkugeln locker vor und neben den Lachs setzen.' },
    { e: 'drizzle', x: 150, y: 152, r: 52, n: 12, col: '#3f9b2a', t: 'Dillöl', how: 'Dillöl mit einem Teelöffel tropfenweise auf die Buttermilch setzen. Die grünen Perlen bleiben auf der weißen Soße stehen.' },
    { e: 'spheres', x: 150, y: 132, n: 8, r: 2.6, spread: 22, col: '#ff7b1c', t: 'Forellenkaviar', how: 'Einen kleinen Löffel Kaviar auf den Lachs.' },
    { e: 'herbs', x: 150, y: 138, r: 26, n: 4, col: '#4f9a3a', t: 'Dillspitzen', how: 'Ein paar Dillspitzen auf den Lachs, dazu Gurkenwürfel an den Rand.' }
  ] }
},
{
  id: 'st-kalbsbaeckchen', n: 'Geschmorte Kalbsbäckchen mit Selleriepüree und glasierten Perlzwiebeln', c: 'sterne', k: 'Frankreich', d: 3, p: 4,
  desc: 'Stundenlang in Rotwein geschmort, bis sie mit dem Löffel zerfallen. Die eingekochte Schmorflüssigkeit glänzt wie Lack.',
  ing: ['#Bäckchen', '8 Kalbsbäckchen (ca. 1 kg, pariert)', 'Salz, Pfeffer', '2 EL Öl', '1 Zwiebel', '1 Möhre', '100 g Knollensellerie', '1 EL Tomatenmark', '500 ml kräftiger Rotwein', '500 ml Kalbsfond', '1 Lorbeerblatt', '2 Zweige Thymian', '20 g kalte Butter', '#Selleriepüree', '500 g Knollensellerie', '200 ml Milch', '50 g Butter', 'Salz, Zitronensaft', '#Perlzwiebeln', '200 g Perlzwiebeln, geschält', '20 g Butter', '1 TL Zucker', '#Garnitur', '1 Scheibe Brot für Croûtons', 'Petersilie oder Selleriegrün'],
  prep: [['chop', 'Gemüse für den Schmorfond in 2 cm Würfel schneiden. Sellerie fürs Püree schälen und in 2 cm Würfel schneiden.']],
  m: {
    ofen: { t: 210, s: [
      ['fry', 'Bäckchen salzen und in einem Bräter in Öl rundherum dunkelbraun anbraten. Herausnehmen.', { h: 'hoch', t: 8 }],
      ['fry', 'Gemüse im Bratfett 6 Minuten rösten, Tomatenmark 1 Minute mitrösten.', { h: 'mittel', t: 7 }],
      ['pour', 'Mit einem Drittel des Weins ablöschen und fast vollständig einkochen. Zweimal wiederholen. Das gibt der Soße Farbe und Tiefe.', { h: 'hoch', t: 12 }],
      ['simmer', 'Fond, Kräuter und Bäckchen zugeben, aufkochen.', { h: 'hoch' }],
      ['bake', 'Mit Deckel bei 150 °C Ober-/Unterhitze 2 Stunden 30 Minuten schmoren, bis ein Löffel die Bäckchen mühelos teilt.', { c: 150, mo: 'OU', t: 150, i: 'dish' }],
      ['strain', 'Bäckchen herausnehmen. Schmorflüssigkeit durch ein Sieb gießen, entfetten.'],
      ['simmer', 'Auf etwa 200 ml einkochen, bis sie sirupartig glänzt. Kalte Butter einschwenken. Bäckchen darin glasieren.', { h: 'hoch', t: 15 }],
      ['simmer', 'Selleriepüree: Sellerie in Milch mit Salz 20 Minuten weich köcheln.', { h: 'niedrig', t: 20 }],
      ['blend', 'Abgießen und mit Butter und etwas Kochmilch im Mixer sehr fein pürieren, mit Zitronensaft abschmecken.', { t: 2 }],
      ['simmer', 'Perlzwiebeln mit Butter, Zucker, Salz und wenig Wasser zugedeckt 10 Minuten garen, dann offen glasieren, bis sie goldbraun sind.', { h: 'mittel', t: 12 }],
      ['fry', 'Brot in 5 mm Würfel schneiden und in Butter goldbraun rösten.', { h: 'mittel', t: 4 }],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] },
    dkt: { t: 110, s: [
      ['fry', 'Bäckchen im offenen Topf kräftig anbraten, Gemüse und Tomatenmark rösten, mit Wein in drei Portionen ablöschen.', { h: 'hoch', t: 25 }],
      ['pour', 'Fond und Kräuter zugeben, Bäckchen einlegen.'],
      ['pressure', '45 Minuten auf Hochdruck garen.', { t: 45, p: 'Hochdruck' }],
      ['rest', 'Druck natürlich abbauen lassen.', { t: 15 }],
      ['simmer', 'Flüssigkeit passieren und offen zu einer glänzenden Glace einkochen, Butter einschwenken.', { h: 'hoch', t: 15 }],
      ['blend', 'Püree, Perlzwiebeln und Croûtons wie beschrieben zubereiten.', { t: 25 }],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'pool', x: 150, y: 152, r: 44, col: '#eee3c9', t: 'Püree-Spiegel', how: 'Zwei Esslöffel Püree in die Mitte geben und mit dem Löffelrücken kreisförmig zu einer flachen Mulde verstreichen.' },
    { e: 'block', x: 138, y: 146, w: 50, h: 38, rx: 18, col: '#4d2014', rep: 2, dx: 24, dy: 10, da: 25, t: 'Bäckchen', how: 'Zwei glasierte Bäckchen leicht überlappend in die Mulde setzen.' },
    { e: 'drizzle', x: 150, y: 152, r: 46, n: 10, col: '#3b120a', t: 'Glace', how: 'Mit einem Löffel Glace über die Bäckchen ziehen und einige Tropfen auf das Püree setzen.' },
    { e: 'spheres', x: 150, y: 206, n: 5, r: 7.5, spread: 40, col: '#d79a4c', t: 'Perlzwiebeln', how: 'Fünf Perlzwiebeln im Bogen vor die Bäckchen legen.' },
    { e: 'crumble', x: 168, y: 106, len: 50, n: 12, col: '#c8893e', a: 20, t: 'Croûtons', how: 'Ein paar Croûtons auf 1 Uhr streuen, sie geben Knusper.' },
    { e: 'herbs', x: 150, y: 132, r: 20, n: 3, col: '#5c9a3e', t: 'Kräuter', how: 'Selleriegrün oder Petersilie obenauf.' }
  ] }
},
{
  id: 'st-entenbrust', n: 'Entenbrust mit Orangenjus, Rotkohlpüree und Pastinake', c: 'sterne', k: 'Frankreich', d: 3, p: 4,
  desc: 'Knusprige Haut, rosa Fleisch, ein moderner Blick auf Ente mit Rotkohl.',
  ing: ['#Ente', '2 Barbarie-Entenbrüste (à ca. 350 g)', 'Salz, Pfeffer', '#Orangenjus', '2 Orangen (Saft und Filets)', '1 EL Zucker', '1 EL Sherryessig', '250 ml Geflügel- oder Kalbsjus', '1 Sternanis', '15 g kalte Butter', '#Rotkohlpüree', '400 g Rotkohl', '1 Apfel', '1 Schalotte', '20 g Butter', '150 ml Rotwein', '100 ml Johannisbeersaft', '2 EL Rotweinessig', '1 EL Zucker', '#Pastinake', '300 g Pastinaken', '150 ml Sahne', '20 g Butter', 'Salz', '#Garnitur', 'Feldsalat oder Kresse'],
  prep: [
    ['chop', 'Rotkohl fein schneiden, Apfel und Schalotte würfeln. Pastinaken schälen und würfeln. Orangen filetieren, den Saft aus den Resten pressen.'],
    ['chop', 'Haut der Entenbrüste rautenförmig im Abstand von 5 mm einschneiden, nicht ins Fleisch. Fleischseite parieren.']
  ],
  m: {
    herd: { t: 90, note: 'Für das Fertiggaren der Ente wird zusätzlich der Backofen gebraucht.', s: [
      ['simmer', 'Rotkohl: Schalotte in Butter dünsten, Rotkohl und Apfel zugeben, mit Wein, Saft, Essig und Zucker 40 Minuten weich schmoren, bis kaum Flüssigkeit übrig ist.', { h: 'niedrig', t: 40 }],
      ['blend', 'Im Standmixer 3 Minuten sehr fein pürieren und durch ein Sieb streichen. Die Farbe wird tief violett.', { t: 3 }],
      ['simmer', 'Pastinaken in Sahne mit Salz 15 Minuten weich köcheln, mit Butter fein pürieren.', { h: 'niedrig', t: 15 }],
      ['simmer', 'Orangenjus: Zucker hell karamellisieren, mit Essig und Orangensaft ablöschen, auf ein Drittel einkochen. Jus und Sternanis zugeben und auf die Hälfte reduzieren.', { h: 'mittel', t: 20 }],
      ['fry', 'Entenbrüste salzen und mit der Haut nach unten in eine kalte Pfanne legen. Bei mittlerer Hitze 10 bis 12 Minuten braten, bis das Fett ausgelassen und die Haut knusprig und goldbraun ist. Fett zwischendurch abgießen (aufheben, ideal für Bratkartoffeln).', { h: 'mittel', t: 11 }],
      ['flip', 'Wenden und 1 Minute auf der Fleischseite braten.', { h: 'mittel', t: 1 }],
      ['bake', 'Mit der Haut nach oben bei 160 °C Ober-/Unterhitze bis 54 °C Kerntemperatur garen (ca. 6 bis 8 Minuten).', { c: 160, mo: 'OU', t: 7, k: 54, i: 'roast' }],
      ['rest', '8 Minuten auf einem Gitter ruhen lassen.', { t: 8 }],
      ['stir', 'Jus passieren, kalte Butter einschwenken, Orangenfilets kurz darin erwärmen.'],
      ['serve', 'Ente in 1 cm Scheiben schneiden und anrichten, siehe Anrichte-Plan.']
    ] },
    sousvide: { t: 150, s: [
      ['prep', 'Entenbrüste einzeln vakuumieren.'],
      ['sousvide', 'Bei 57 °C 60 Minuten im Wasserbad garen.', { c: 57, t: 60 }],
      ['simmer', 'Währenddessen Rotkohl- und Pastinakenpüree sowie Orangenjus zubereiten.', { h: 'mittel', t: 45 }],
      ['fry', 'Entenbrust trocken tupfen und mit der Haut nach unten bei mittlerer Hitze 6 bis 8 Minuten knusprig braten.', { h: 'mittel', t: 7 }],
      ['serve', 'Aufschneiden und anrichten.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'swoosh', x: 150, y: 170, len: 160, a: 8, w: 26, col: '#6e1f55', bend: 34, t: 'Rotkohl-Swoosh', how: 'Rotkohlpüree als geschwungenen Strich von 8 Uhr nach 4 Uhr ziehen.' },
    { e: 'slices', x: 150, y: 150, n: 4, r: 18, a: -8, col: '#5a2016', inner: '#c45a50', t: 'Entenbrust', how: 'Vier Scheiben Entenbrust leicht gefächert auf den Swoosh legen, Haut nach oben zeigend zum Rand.' },
    { e: 'dots', x: 152, y: 100, n: 5, len: 90, size: 7.5, col: '#efe5cf', curve: 10, t: 'Pastinake', how: 'Pastinakenpüree aus einem Spritzbeutel in fünf kleiner werdenden Tupfen im Bogen auf 12 Uhr spritzen.' },
    { e: 'block', x: 202, y: 198, w: 22, h: 10, rx: 5, col: '#f6a12a', rep: 3, dx: -20, dy: 8, da: 20, t: 'Orangenfilets', how: 'Drei warme Orangenfilets an das Ende des Swooshs legen.' },
    { e: 'pool', x: 102, y: 186, r: 13, col: '#5a1d10', t: 'Orangenjus', how: 'Jus auf 8 Uhr angießen und ein paar Tropfen neben das Fleisch setzen.' },
    { e: 'herbs', x: 170, y: 132, r: 16, n: 3, col: '#5aa14a', t: 'Grün', how: 'Ein paar Blättchen Feldsalat oder Kresse als Farbtupfer.' }
  ] }
},
{
  id: 'st-beef-tatar', n: 'Beef Tatar mit Eigelbcreme, Kapernsand und Brotchips', c: 'sterne', k: 'Frankreich', d: 2, p: 4,
  desc: 'Handgeschnittenes Rinderfilet, eine Creme aus konfiertem Eigelb und knuspriger, würziger Kapernsand.',
  ing: ['#Tatar', '320 g Rinderfilet (sehr frisch, vom Metzger für Tatar)', '1 Schalotte', '1 EL Kapern', '2 Cornichons', '1 TL Dijonsenf', '1 EL Olivenöl', '½ TL Worcestersauce', 'Fleur de Sel, Pfeffer', 'Schnittlauch', '#Eigelbcreme', '4 Eigelb (sehr frisch)', '100 ml neutrales Öl', 'Salz, Zitronensaft', '#Kapernsand', '3 EL Kapern', '2 EL Panko', '1 EL Butter', '#Brotchips', '½ Baguette vom Vortag', 'Olivenöl', '#Garnitur', 'Kresse, Radieschen'],
  prep: [
    ['chop', 'Rinderfilet mit einem sehr scharfen Messer erst in 3 mm Scheiben, dann Streifen, dann Würfel schneiden. Nicht wolfen, sonst wird es breiig. Kalt stellen.'],
    ['chop', 'Schalotte, Kapern, Cornichons und Schnittlauch sehr fein schneiden.']
  ],
  m: {
    kalt: { t: 70, note: 'Rohes Fleisch und Eigelb: nur absolut frische Ware, bis zum Servieren kühl halten. Nicht für Schwangere, kleine Kinder und ältere Menschen.', s: [
      ['bake', 'Kapernsand: Kapern abtropfen lassen, gut trocken tupfen und im Ofen bei 100 °C Umluft 40 Minuten trocknen.', { c: 100, mo: 'U', t: 40, i: 'tray' }],
      ['fry', 'Panko in Butter goldbraun rösten. Mit den getrockneten Kapern grob hacken oder im Mörser zerstoßen.', { h: 'mittel', t: 3 }],
      ['bake', 'Brotchips: Baguette hauchdünn schräg schneiden, mit Öl bepinseln und bei 170 °C 8 bis 10 Minuten goldbraun backen.', { c: 170, mo: 'U', t: 9, i: 'tray' }],
      ['blend', 'Eigelbcreme: Eigelbe mit Salz und Zitronensaft mit dem Stabmixer aufmixen und das Öl in dünnem Strahl einlaufen lassen, bis eine glänzende, dickflüssige Creme entsteht. In eine Spritzflasche füllen.'],
      ['fold', 'Tatar mit Schalotte, Kapern, Cornichons, Senf, Olivenöl, Worcester, Salz und Pfeffer locker vermengen, Schnittlauch unterheben. Erst kurz vor dem Servieren würzen.'],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'ring', x: 150, y: 146, r: 38, col: '#a8323a', top: '#f3e0c0', t: 'Tatar im Ring', how: 'Einen Servierring (8 cm) mittig auf den Teller stellen, Tatar einfüllen und mit dem Löffelrücken leicht andrücken, Oberfläche glatt streichen. Ring nach oben abziehen.' },
    { e: 'dots', x: 150, y: 206, n: 5, len: 96, size: 7, col: '#f4b52b', curve: -8, t: 'Eigelbcreme', how: 'Mit der Spritzflasche fünf Tupfen in einem Bogen vor das Tatar setzen, kleiner werdend.' },
    { e: 'crumble', x: 150, y: 128, len: 46, n: 30, wide: 18, col: '#3f4a1f', t: 'Kapernsand', how: 'Kapernsand als Streifen über die obere Hälfte des Tatars streuen.' },
    { e: 'shard', x: 196, y: 120, size: 44, a: 28, col: '#d7a457', rep: 2, dx: 10, dy: 14, da: 14, t: 'Brotchips', how: 'Zwei Brotchips schräg ins Tatar stecken. Sie geben Höhe.' },
    { e: 'spheres', x: 112, y: 112, n: 4, r: 4, spread: 12, col: '#e9637a', t: 'Radieschen', how: 'Radieschen in feinen Streifen oder Würfeln an den Rand.' },
    { e: 'herbs', x: 140, y: 150, r: 22, n: 5, col: '#6cb04a', t: 'Kresse', how: 'Kresse locker obenauf.' }
  ] }
},
{
  id: 'st-tomatenconsomme', n: 'Klare Tomatenessenz mit Burrata und Basilikumöl', c: 'sterne', k: 'Italien', d: 2, p: 4, v: 1,
  desc: 'Wasserklarer, intensiver Tomatensaft, am Tisch über Burrata und Tomaten gegossen.',
  ing: ['#Tomatenessenz', '1,5 kg sehr reife Tomaten', '1 Schalotte', '1 Stange Staudensellerie', '½ Bund Basilikum', '1 TL Salz', '1 TL Zucker', '#Einlage', '2 Burrata (à 125 g)', '200 g bunte Kirschtomaten', '#Basilikumöl', '1 Bund Basilikum', '100 ml mildes Olivenöl', '#Garnitur', 'Fleur de Sel, Basilikumspitzen'],
  m: {
    kalt: { t: 780, note: 'Die Essenz tropft über Nacht ab. Aktive Arbeitszeit ca. 40 Minuten.', s: [
      ['blend', 'Tomaten, Schalotte, Sellerie, Basilikum, Salz und Zucker im Mixer grob pürieren.', { t: 1 }],
      ['strain', 'Ein Sieb mit einem feuchten Passiertuch auslegen, über eine Schüssel hängen, Püree hineingeben. Nicht drücken.'],
      ['chill', 'Über Nacht im Kühlschrank abtropfen lassen. Es tropft eine klare, goldene Flüssigkeit, die nach purer Tomate schmeckt.', { t: 720 }],
      ['blend', 'Basilikumöl: Basilikum 10 Sekunden blanchieren, in Eiswasser abschrecken, ausdrücken. Mit dem Öl 2 Minuten mixen und durch einen Kaffeefilter tropfen lassen.', { t: 2 }],
      ['chop', 'Kirschtomaten 10 Sekunden in kochendes Wasser geben, abschrecken, häuten und halbieren.'],
      ['serve', 'Essenz abschmecken (sie soll kräftig sein) und gekühlt in einem Kännchen servieren. Anrichten, siehe Anrichte-Plan.']
    ] },
    herd: { t: 90, note: 'Schnellere, warme Variante: Die Essenz wird mit Eiweiß geklärt wie eine klassische Consommé.', s: [
      ['blend', 'Tomaten, Schalotte, Sellerie und Basilikum grob pürieren.'],
      ['whisk', '2 Eiweiß leicht anschlagen und unter das kalte Püree rühren.'],
      ['simmer', 'Langsam unter Rühren erhitzen. Sobald sich oben ein Eiweißkuchen bildet, nicht mehr rühren und 30 Minuten leise simmern. Das Eiweiß bindet die Trübstoffe.', { h: 'niedrig', t: 30 }],
      ['strain', 'Vorsichtig durch ein Passiertuch schöpfen.'],
      ['season', 'Mit Salz und Zucker abschmecken. Warm oder kalt servieren.'],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'deep', els: [
    { e: 'disc', x: 150, y: 150, r: 28, col: '#fbf8f1', t: 'Burrata', how: 'Eine halbe Burrata mit der aufgerissenen, cremigen Seite nach oben in die Mitte des tiefen Tellers setzen.' },
    { e: 'spheres', x: 150, y: 152, n: 9, r: 7, spread: 50, col: '#e2402d', t: 'Tomaten', how: 'Gehäutete Kirschtomaten im Kreis um die Burrata verteilen, verschiedene Farben gemischt.' },
    { e: 'drizzle', x: 150, y: 150, r: 18, n: 6, col: '#3e9c2c', t: 'Basilikumöl', how: 'Ein paar Tropfen Basilikumöl auf die Burrata.' },
    { e: 'herbs', x: 150, y: 150, r: 46, n: 6, col: '#4ea43a', t: 'Basilikum', how: 'Kleine Basilikumspitzen zwischen die Tomaten setzen, Fleur de Sel auf die Burrata.' },
    { e: 'bowlfill', x: 150, y: 152, r: 80, col: 'rgba(238,170,90,.42)', t: 'Am Tisch angießen', how: 'Den Teller leer servieren und die Essenz am Tisch seitlich angießen, damit die Burrata nicht überspült wird.' }
  ] }
},
{
  id: 'st-zander', n: 'Zander auf der Haut gebraten, Rahmsauerkraut und Beurre blanc', c: 'sterne', k: 'Deutschland & Frankreich', d: 3, p: 4,
  desc: 'Glasiger Fisch mit krosser Haut, mildes Sahnesauerkraut und die klassische Buttersoße.',
  ing: ['#Zander', '4 Zanderfilets mit Haut (à 140 g)', '2 EL Öl', '20 g Butter', 'Salz', '#Rahmsauerkraut', '400 g mildes Weinsauerkraut', '1 Schalotte', '20 g Butter', '100 ml Weißwein', '150 ml Sahne', '1 Lorbeerblatt', '3 Wacholderbeeren', '#Beurre blanc', '1 Portion Beurre blanc (siehe Grundrezept)', '#Garnitur', '50 g Speck in feinen Würfeln (optional)', 'Dill, Schnittlauchöl'],
  prep: [['prep', 'Zander auf der Hautseite mit einem Messerrücken abschaben, Gräten mit einer Pinzette ziehen, trocken tupfen. Haut 3 bis 4 Mal leicht einritzen, damit sich das Filet nicht wölbt.']],
  m: {
    herd: { t: 60, s: [
      ['fry', 'Sauerkraut: Schalotte in Butter glasig dünsten, Sauerkraut (ausgedrückt) zugeben.', { h: 'mittel', t: 3 }],
      ['simmer', 'Mit Wein ablöschen, Lorbeer und Wacholder zugeben und 25 Minuten zugedeckt schmoren. Sahne zugeben und sämig einkochen.', { h: 'niedrig', t: 30 }],
      ['whisk', 'Beurre blanc nach Grundrezept zubereiten und im Wasserbad bei höchstens 60 °C warm halten.', { t: 15 }],
      ['fry', 'Speck in einer kleinen Pfanne knusprig auslassen.', { h: 'mittel', t: 5 }],
      ['fry', 'Zander salzen. Öl in einer Pfanne erhitzen, Filets mit der Haut nach unten einlegen und 10 Sekunden mit einem Pfannenwender flach andrücken. Bei mittlerer Hitze 4 bis 5 Minuten braten, bis das Fleisch zu drei Vierteln weiß ist.', { h: 'mittel', t: 4 }],
      ['flip', 'Butter zugeben, Filets wenden und 30 Sekunden auf der Fleischseite ziehen lassen. Kern glasig, ca. 52 °C.', { h: 'niedrig', sec: 30, k: 52 }],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'deep', els: [
    { e: 'nest', x: 150, y: 150, r: 36, col: '#e8dca7', t: 'Sauerkraut-Nest', how: 'Sauerkraut mit einer Fleischgabel in einer Kelle zu einem Nest eindrehen und mittig absetzen.' },
    { e: 'block', x: 150, y: 146, w: 76, h: 30, rx: 12, col: '#f4efe4', crust: '#c9903f', a: -10, t: 'Zander', how: 'Zander mit der krossen Haut nach oben auf das Kraut legen.' },
    { e: 'bowlfill', x: 150, y: 186, r: 44, col: 'rgba(246,236,204,.92)', t: 'Beurre blanc', how: 'Beurre blanc mit dem Stabmixer kurz aufschäumen und vor das Nest angießen, nie über die Haut.' },
    { e: 'crumble', x: 150, y: 196, len: 56, n: 14, col: '#b0532f', t: 'Speck', how: 'Knusprige Speckwürfel in die Soße streuen.' },
    { e: 'drizzle', x: 150, y: 186, r: 38, n: 8, arc: 3, from: 0.2, col: '#3b8d2a', t: 'Schnittlauchöl', how: 'Ein paar Tropfen Schnittlauchöl in die Buttersoße.' },
    { e: 'herbs', x: 166, y: 130, r: 12, n: 3, col: '#4e9b3a', t: 'Dill', how: 'Dillspitzen auf den Fisch.' }
  ] }
},
{
  id: 'st-ravioli', n: 'Ravioli mit Ricotta-Zitronen-Füllung und Salbei-Nussbutter', c: 'sterne', k: 'Italien', d: 3, p: 4, v: 1,
  desc: 'Hauchdünner Eierteig, cremige Füllung, braune Butter mit knusprigem Salbei.',
  ing: ['#Pastateig', '200 g Hartweizenmehl (Type 00)', '1 Ei', '4 Eigelb', '1 EL Olivenöl', '1 Prise Salz', '#Füllung', '250 g Ricotta (über Nacht abgetropft)', '50 g Parmesan, fein gerieben', 'Abrieb von 1 Bio-Zitrone', '1 Eigelb', 'Salz, Pfeffer, Muskat', '#Sauce', '100 g Butter', '16 Salbeiblätter', '2 EL Nudelwasser', '#Garnitur', 'Parmesan, Zitronenabrieb'],
  m: {
    herd: { t: 120, s: [
      ['knead', 'Mehl, Ei, Eigelbe, Öl und Salz 10 Minuten zu einem festen, seidigen Teig kneten.', { t: 10 }],
      ['rest', 'In Folie gewickelt 30 Minuten bei Raumtemperatur ruhen lassen.', { t: 30 }],
      ['stir', 'Füllung: Ricotta, Parmesan, Zitronenabrieb und Eigelb glatt rühren, würzen und in einen Spritzbeutel füllen.'],
      ['roll', 'Teig portionsweise mit der Nudelmaschine bis zur vorletzten Stufe ausrollen (ca. 1 mm, man soll die Hand durchschimmern sehen).'],
      ['pipe', 'Füllung in walnussgroßen Tupfen im Abstand von 4 cm auf eine Teigbahn spritzen.'],
      ['shape', 'Teig um die Tupfen leicht mit Wasser befeuchten, zweite Bahn darüberlegen und um die Füllung andrücken, dabei alle Luft herausstreichen. Mit einem Ausstecher oder Teigrad ausschneiden.'],
      ['boil', 'Ravioli in siedendem Salzwasser 2 bis 3 Minuten garen, bis sie oben schwimmen.', { h: 'mittel', t: 3 }],
      ['fry', 'Butter in einer Pfanne aufschäumen lassen, Salbei darin knusprig braten, bis die Butter nussig riecht. Salbei herausnehmen.', { h: 'mittel', t: 3 }],
      ['flip', 'Ravioli mit 2 EL Nudelwasser in der Butter schwenken, bis sie glänzen.', { h: 'mittel', t: 1 }],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'block', x: 118, y: 160, w: 40, h: 40, rx: 9, col: '#f3d996', a: 8, rep: 3, dx: 30, dy: -18, da: -10, t: 'Ravioli', how: 'Drei bis fünf Ravioli in einer leicht geschwungenen Linie diagonal über den Teller legen, leicht überlappend.' },
    { e: 'drizzle', x: 150, y: 150, r: 46, n: 10, col: '#c9903c', t: 'Nussbutter', how: 'Nussbutter mit dem Löffel über und um die Ravioli träufeln.' },
    { e: 'leaf', x: 130, y: 128, size: 13, a: -30, col: '#567a40', rep: 3, dx: 26, dy: 14, da: 30, t: 'Knuspriger Salbei', how: 'Je ein Salbeiblatt auf ein Raviolo lehnen.' },
    { e: 'dust', x: 150, y: 150, r: 60, flat: 0.8, col: '#f2e3b0', t: 'Parmesan', how: 'Parmesan mit einer feinen Reibe aus 30 cm Höhe darüberreiben. Aus der Höhe verteilt er sich gleichmäßig.' },
    { e: 'crumble', x: 168, y: 196, len: 40, n: 10, wide: 8, col: '#ffd34d', t: 'Zitronenabrieb', how: 'Ein Hauch Zitronenabrieb für Frische und Farbe.' }
  ] }
},
{
  id: 'st-lammruecken', n: 'Lammrücken mit Kräuterkruste, Ratatouille-Brunoise und Thymianjus', c: 'sterne', k: 'Frankreich (Provence)', d: 3, p: 4,
  desc: 'Rosa Lamm unter einer grünen Kruste, dazu Ratatouille in 3-mm-Würfeln.',
  ing: ['#Lamm', '2 Lammrückenstränge ohne Knochen (à ca. 300 g)', '1 EL Öl', 'Salz, Pfeffer', '1 TL Dijonsenf', '#Kräuterkruste', '60 g weiche Butter', '40 g Weißbrot ohne Rinde (Toastbrot)', '1 Bund Petersilie', '2 Zweige Thymian', '1 Zweig Rosmarin', '1 Knoblauchzehe', '#Brunoise', '1 kleine Zucchini', '1 kleine Aubergine', '½ rote und ½ gelbe Paprika', '1 Schalotte', '2 EL Olivenöl', '1 EL Tomatenmark', '#Thymianjus', '250 ml Lammjus oder Kalbsjus', '3 Zweige Thymian', '15 g kalte Butter', '#Knoblauchcreme', '1 Knolle Knoblauch', '50 ml Sahne'],
  prep: [
    ['blend', 'Kräuterkruste: Brot, Kräuter und Knoblauch im Zerkleinerer fein mahlen, mit der weichen Butter verkneten. Zwischen Backpapier 3 mm dünn ausrollen und kalt stellen, bis sie fest ist.'],
    ['chop', 'Brunoise: Nur die farbigen Außenseiten von Zucchini, Aubergine und Paprika verwenden und in exakt 3 mm große Würfel schneiden. Schalotte fein würfeln.']
  ],
  m: {
    ofen: { t: 80, s: [
      ['bake', 'Knoblauchknolle in Alufolie bei 180 °C 40 Minuten weich rösten. Ausdrücken, mit Sahne aufkochen und fein pürieren.', { c: 180, mo: 'OU', t: 40, i: 'tray' }],
      ['fry', 'Lamm salzen und in Öl rundherum 3 Minuten anbraten. Abkühlen lassen und auf der Oberseite dünn mit Senf bestreichen.', { h: 'hoch', t: 3 }],
      ['layer', 'Kräuterkruste in Größe der Stränge zuschneiden und auflegen.'],
      ['bake', 'Bei 160 °C Ober-/Unterhitze bis 54 °C Kerntemperatur garen (ca. 12 bis 15 Minuten). Zum Schluss 1 Minute unter den Grill, bis die Kruste leicht bräunt.', { c: 160, mo: 'OU', t: 14, k: 54, i: 'roast' }],
      ['rest', '6 Minuten ruhen lassen.', { t: 6 }],
      ['fry', 'Brunoise: Schalotte in Olivenöl anschwitzen, Paprika 2 Minuten, dann Aubergine und Zucchini 2 Minuten mitbraten, Tomatenmark einrühren, würzen. Die Würfel sollen bissfest bleiben.', { h: 'hoch', t: 5 }],
      ['simmer', 'Jus mit Thymian 5 Minuten ziehen lassen, passieren, kalte Butter einschwenken.', { h: 'niedrig', t: 5 }],
      ['serve', 'Lamm in dicke Scheiben schneiden und anrichten, siehe Anrichte-Plan.']
    ] },
    sousvide: { t: 120, s: [
      ['prep', 'Lammstränge mit Thymian vakuumieren.'],
      ['sousvide', 'Bei 56 °C 60 Minuten im Wasserbad garen.', { c: 56, t: 60 }],
      ['fry', 'Abtupfen, rundherum 1 Minute scharf anbraten, mit Senf bestreichen, Kruste auflegen und 2 Minuten unter dem Backofengrill bräunen.', { h: 'max', t: 3 }],
      ['fry', 'Brunoise, Jus und Knoblauchcreme wie beschrieben zubereiten.', { h: 'hoch', t: 20 }],
      ['serve', 'Aufschneiden und anrichten.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'ring', x: 112, y: 136, r: 28, col: '#c4462f', top: '#f2c94c', t: 'Brunoise im Ring', how: 'Ring (6 cm) auf 10 Uhr stellen, Brunoise einfüllen, andrücken, Ring abziehen.' },
    { e: 'slices', x: 176, y: 168, n: 3, r: 20, a: -30, col: '#3d6e2a', inner: '#c8605a', t: 'Lamm', how: 'Drei dicke Scheiben mit der Schnittfläche nach oben fächern, die grüne Kruste zeigt zum Rand.' },
    { e: 'dots', x: 118, y: 200, n: 3, len: 40, size: 6.5, col: '#f6efe0', even: true, t: 'Knoblauchcreme', how: 'Drei gleich große Tupfen Knoblauchcreme zwischen Ring und Fleisch spritzen.' },
    { e: 'pool', x: 206, y: 210, r: 14, col: '#4c1b10', t: 'Thymianjus', how: 'Jus neben das Fleisch setzen.' },
    { e: 'herbs', x: 112, y: 128, r: 10, n: 3, col: '#5b8a3a', t: 'Thymian', how: 'Thymianblüten oder -spitzen auf die Brunoise.' }
  ] }
},
{
  id: 'st-schoko-cremeux', n: 'Schokoladen-Crémeux mit Himbeere, Kakao-Crumble und Vanilleeis', c: 'sterne', k: 'Frankreich', d: 3, p: 6, v: 1,
  desc: 'Seidige Schokoladencreme, säuerliches Himbeergel, knuspriger Crumble und eine Quenelle Eis.',
  ing: ['#Crémeux', '150 g Zartbitterkuvertüre (64 bis 70 %)', '125 ml Milch', '125 ml Sahne', '3 Eigelb', '25 g Zucker', '#Himbeergel', '250 g Himbeeren (TK)', '40 g Zucker', '2 g Agar-Agar', '#Kakao-Crumble', '50 g Mehl', '40 g Butter', '40 g brauner Zucker', '20 g gemahlene Mandeln', '15 g Kakaopulver', '1 Prise Salz', '#Außerdem', '6 Kugeln Vanilleeis', '125 g frische Himbeeren', 'Minzblättchen', 'Kakao-Tuile oder Schokoladenspäne'],
  m: {
    herd: { t: 300, note: 'Crémeux und Gel brauchen 4 Stunden im Kühlschrank. Gut am Vortag vorzubereiten.', s: [
      ['whisk', 'Crémeux: Eigelbe mit Zucker verrühren. Milch und Sahne aufkochen und unter Rühren auf die Eigelbe gießen.'],
      ['stir', 'Zurück in den Topf und bei niedriger Hitze ständig rühren, bis die Creme 82 bis 84 °C erreicht und einen Löffel überzieht (zur Rose abziehen). Nicht kochen.', { h: 'niedrig', k: 83 }],
      ['blend', 'Über die gehackte Kuvertüre gießen, 1 Minute warten, dann mit dem Stabmixer ohne Luft einzuarbeiten zu einer glänzenden Emulsion mixen.', { t: 1 }],
      ['chill', 'Mit Folie direkt auf der Oberfläche 4 Stunden kühlen.', { t: 240 }],
      ['simmer', 'Gel: Himbeeren mit Zucker aufkochen, durch ein Sieb streichen. Agar-Agar einrühren und 2 Minuten sprudelnd kochen.', { h: 'mittel', t: 2 }],
      ['chill', 'Fest werden lassen (ca. 1 Stunde), dann im Mixer glatt pürieren und in eine Spritzflasche füllen.', { t: 60 }],
      ['knead', 'Crumble: Alle Zutaten mit den Fingern zu Streuseln verreiben.'],
      ['bake', 'Auf einem Blech bei 160 °C 15 Minuten backen, zwischendurch einmal wenden, abkühlen lassen.', { c: 160, mo: 'OU', t: 15, i: 'tray' }],
      ['serve', 'Crémeux in einen Spritzbeutel mit glatter Tülle füllen. Anrichten, siehe Anrichte-Plan.']
    ] },
    tm: { t: 300, s: [
      ['tm', 'Kuvertüre 10 Sek./Stufe 8 zerkleinern, umfüllen.', { sec: 10, s: 8 }],
      ['tm', 'Milch, Sahne, Eigelbe und Zucker 7 Min./80 °C/Stufe 4.', { t: 7, c: 80, s: 4 }],
      ['tm', 'Kuvertüre zugeben, 30 Sek./Stufe 4 verrühren. 4 Stunden kühlen.', { sec: 30, s: 4 }],
      ['tm', 'Himbeeren und Zucker 6 Min./100 °C/Stufe 2, passieren, mit Agar-Agar 2 Min./100 °C/Stufe 3. Fest werden lassen und fein mixen.', { t: 8, c: 100, s: 3 }],
      ['bake', 'Crumble backen wie beschrieben.', { c: 160, mo: 'OU', t: 15, i: 'tray' }],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'slate', els: [
    { e: 'crumble', x: 150, y: 152, len: 200, n: 70, wide: 18, a: -8, col: '#5a3424', t: 'Crumble-Linie', how: 'Den Crumble als breiten Streifen diagonal über die Schieferplatte streuen.' },
    { e: 'dots', x: 136, y: 150, n: 3, len: 110, size: 13, col: '#4a2617', even: true, a: -8, t: 'Crémeux', how: 'Drei große Tupfen Crémeux senkrecht von oben auf den Crumble spritzen und den Beutel zum Schluss mit einer kleinen Drehung abheben.' },
    { e: 'dots', x: 150, y: 126, n: 6, len: 170, size: 4.5, col: '#d3204d', a: -8, curve: 4, t: 'Himbeergel', how: 'Gel in kleinen Punkten zwischen und neben die Crémeux-Tupfen setzen.' },
    { e: 'spheres', x: 150, y: 176, n: 5, r: 6.5, spread: 70, col: '#c4153f', t: 'Himbeeren', how: 'Frische Himbeeren, einige halbiert, in die Lücken legen.' },
    { e: 'quenelle', x: 206, y: 140, size: 24, a: -30, col: '#fbf2da', t: 'Eis-Quenelle', how: 'Esslöffel in heißes Wasser tauchen, über die Eisoberfläche ziehen, bis sich eine ovale Nocke einrollt. Auf ein Crumble-Häufchen setzen, damit sie nicht rutscht.' },
    { e: 'shard', x: 108, y: 120, size: 46, a: -20, col: '#2e1a10', t: 'Kakao-Tuile', how: 'Eine Tuile oder einen Schokoladenspan aufrecht in den mittleren Crémeux stecken.' },
    { e: 'herbs', x: 170, y: 150, r: 40, n: 3, col: '#58a646', t: 'Minze', how: 'Drei winzige Minzspitzen.' }
  ] }
},
{
  id: 'st-zitronentarte', n: 'Zitronentarte mit abgeflämmter Meringue', c: 'sterne', k: 'Frankreich', d: 3, p: 8, v: 1, pu: 'Stücke',
  desc: 'Mürber Sablé-Boden, intensive Zitronencreme, Haube aus italienischer Meringue.',
  ing: ['#Sablé-Teig', '200 g Mehl', '100 g kalte Butter', '70 g Puderzucker', '25 g gemahlene Mandeln', '1 Ei', '1 Prise Salz', '#Zitronencreme', '150 ml Zitronensaft (4 bis 5 Zitronen)', 'Abrieb von 2 Bio-Zitronen', '4 Eier', '150 g Zucker', '150 g kalte Butter in Würfeln', '#Italienische Meringue', '3 Eiweiß', '150 g Zucker', '50 ml Wasser'],
  m: {
    ofen: { t: 300, note: 'Ein Küchenbrenner ist für die Meringue ideal. Ersatz: 2 Minuten unter dem heißen Backofengrill.', s: [
      ['knead', 'Teig: Mehl, Puderzucker, Mandeln, Salz und Butter verkrümeln, Ei zugeben und kurz zusammendrücken.'],
      ['chill', 'Flach in Folie 1 Stunde kühlen.', { t: 60 }],
      ['roll', '3 mm dünn ausrollen und eine Tarteform (24 cm) damit auslegen. Boden einstechen, 30 Minuten einfrieren.', { t: 30 }],
      ['bake', 'Mit Backpapier und Hülsenfrüchten bei 170 °C 15 Minuten blindbacken, dann ohne Gewicht 10 Minuten goldbraun backen.', { c: 170, mo: 'OU', t: 25 }],
      ['whisk', 'Zitronencreme: Saft, Abrieb, Eier und Zucker über einem Wasserbad unter ständigem Rühren auf 82 °C erhitzen, bis die Creme dick ist.', { h: 'niedrig', t: 10, k: 82 }],
      ['blend', 'Auf 60 °C abkühlen lassen, dann die kalte Butter mit dem Stabmixer einmixen. Die Creme wird glänzend und hell.'],
      ['pour', 'In den Tarteboden füllen und mindestens 3 Stunden kühlen.'],
      ['chill', 'Kühlen, bis die Creme schnittfest ist.', { t: 180 }],
      ['simmer', 'Meringue: Zucker mit Wasser auf 118 °C kochen (Thermometer).', { h: 'mittel', k: 118 }],
      ['mix', 'Gleichzeitig Eiweiß steif schlagen. Den heißen Sirup in dünnem Strahl bei laufendem Rührgerät einlaufen lassen und weiterschlagen, bis die Masse abgekühlt ist und glänzt (ca. 8 Minuten).', { t: 8 }],
      ['pipe', 'Meringue in einen Spritzbeutel mit Lochtülle füllen und in Tropfen auf die Tarte spritzen.'],
      ['torch', 'Mit dem Küchenbrenner abflämmen, bis die Spitzen goldbraun sind.'],
      ['serve', 'Mit einem in heißes Wasser getauchten Messer schneiden. Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'swoosh', x: 150, y: 200, len: 110, w: 10, col: '#f6d24a', bend: 10, t: 'Zitronen-Strich', how: 'Mit dem Pinsel einen dünnen Strich Zitronencreme als Basis quer über die untere Hälfte ziehen.' },
    { e: 'block', x: 150, y: 150, w: 92, h: 46, rx: 6, col: '#f7d860', crust: '#d39b4c', a: -6, t: 'Tarte-Stück', how: 'Das Tartestück leicht schräg in die Mitte legen, die Kruste zeigt zu dir.' },
    { e: 'dots', x: 150, y: 150, n: 6, len: 76, size: 6, col: '#f1d3a4', even: true, a: -6, t: 'Meringue', how: 'Die abgeflämmten Meringue-Tropfen bleiben auf dem Stück. Für mehr Wirkung ein paar extra Tropfen daneben spritzen und abflämmen.' },
    { e: 'spheres', x: 196, y: 196, n: 3, r: 6, spread: 12, col: '#d6264f', t: 'Beeren', how: 'Drei Himbeeren oder Johannisbeeren an das Ende des Strichs.' },
    { e: 'crumble', x: 104, y: 118, len: 30, n: 10, wide: 8, col: '#ffd34d', t: 'Zitronenabrieb', how: 'Frischen Zitronenabrieb auf 10 Uhr.' }
  ] }
},
{
  id: 'st-rote-bete', n: 'Rote Bete in Texturen mit Ziegenfrischkäse und Walnuss', c: 'sterne', k: 'International', d: 2, p: 4, v: 1,
  desc: 'Eine Zutat, mehrere Zubereitungen: geröstet, als Püree und als Chip, dazu cremiger Ziegenkäse.',
  ing: ['#Rote Bete', '6 kleine Rote Bete (verschiedene Sorten, z. B. Chioggia, gelbe)', '2 EL Olivenöl', 'Grobes Salz', '2 EL Himbeeressig', '1 EL Honig', '#Ziegenkäsecreme', '150 g Ziegenfrischkäse', '50 g Crème fraîche', 'Abrieb von ½ Zitrone', '#Walnuss-Crumble', '50 g Walnüsse', '1 TL Honig', 'Prise Salz', '#Garnitur', 'Kresse oder Rote-Bete-Blätter, Walnussöl'],
  m: {
    ofen: { t: 120, s: [
      ['bake', 'Vier Knollen einzeln in Alufolie mit etwas Öl und Salz einwickeln und bei 200 °C Ober-/Unterhitze 60 bis 70 Minuten rösten, bis ein Messer leicht hineingleitet.', { c: 200, mo: 'OU', t: 65, i: 'tray' }],
      ['chop', 'Abkühlen lassen, mit Handschuhen schälen und in Spalten schneiden. Mit Himbeeressig, Honig, Öl und Salz marinieren.'],
      ['blend', 'Zwei geröstete Knollen mit einem Schuss Essig und Öl im Mixer sehr fein pürieren, abschmecken.'],
      ['chop', 'Eine rohe Knolle mit dem Gemüsehobel hauchdünn schneiden.'],
      ['bake', 'Scheiben auf Backpapier bei 110 °C Umluft 40 bis 50 Minuten zu Chips trocknen.', { c: 110, mo: 'U', t: 45, i: 'tray' }],
      ['whisk', 'Ziegenfrischkäse mit Crème fraîche und Zitronenabrieb glatt rühren.'],
      ['fry', 'Walnüsse grob hacken und in einer trockenen Pfanne rösten, Honig und Salz zugeben, kurz karamellisieren und abkühlen lassen.', { h: 'mittel', t: 4 }],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] },
    kalt: { t: 40, note: 'Schnelle Variante mit vorgegarter Roter Bete aus der Vakuumpackung, ohne Chips.', s: [
      ['chop', 'Vorgegarte Rote Bete in Spalten schneiden und marinieren.'],
      ['blend', 'Zwei Knollen mit Essig und Öl fein pürieren.'],
      ['whisk', 'Ziegenkäsecreme anrühren.'],
      ['chop', 'Walnüsse hacken.'],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'swoosh', x: 150, y: 168, len: 150, a: -20, w: 22, col: '#8e1a46', t: 'Rote-Bete-Püree', how: 'Püree als Swoosh diagonal ziehen.' },
    { e: 'block', x: 112, y: 168, w: 30, h: 16, rx: 7, col: '#7d1238', a: 30, rep: 4, dx: 24, dy: -10, da: -20, t: 'Geröstete Spalten', how: 'Marinierte Spalten unterschiedlicher Sorten auf und neben den Swoosh legen, Farben abwechseln.' },
    { e: 'quenelle', x: 168, y: 116, size: 22, a: 15, col: '#f8f4ec', rep: 2, dx: -62, dy: 82, t: 'Ziegenkäse-Nocken', how: 'Mit zwei Teelöffeln zwei kleine Nocken Ziegenkäsecreme formen und gegenüberliegend platzieren.' },
    { e: 'crumble', x: 150, y: 150, len: 120, n: 22, wide: 30, col: '#9a6a3b', a: -20, t: 'Walnuss', how: 'Walnuss-Crumble locker über das Ganze streuen.' },
    { e: 'shard', x: 196, y: 150, size: 36, a: 40, col: '#a8285a', rep: 2, dx: -84, dy: 10, t: 'Rote-Bete-Chips', how: 'Zwei Chips aufrecht in die Käsenocken stecken.' },
    { e: 'herbs', x: 150, y: 150, r: 50, n: 5, col: '#5aa548', t: 'Kresse', how: 'Kresse verteilen, ein paar Tropfen Walnussöl auf das Püree.' }
  ] }
},
{
  id: 'st-kuerbis-veloute', n: 'Kürbis-Velouté mit Kernöl-Schaum und Kürbiskern-Krokant', c: 'sterne', k: 'Österreich', d: 2, p: 4, v: 1,
  desc: 'Samtige Suppe, im tiefen Teller angegossen, mit Schaum, Kernöl und Krokant.',
  ing: ['#Velouté', '800 g Hokkaido', '1 Schalotte', '30 g Butter', '1 TL Currypulver (mild)', '700 ml Gemüsefond', '150 ml Sahne', 'Salz, Muskat, ein Spritzer Weißweinessig', '#Schaum', '150 ml Milch', '1 EL Kürbiskernöl', '#Krokant', '40 g Kürbiskerne', '30 g Zucker', 'Prise Salz', '#Einlage', '8 Kürbiswürfel (1 cm), in Butter gebraten', 'Kerbel, Kürbiskernöl'],
  m: {
    herd: { t: 55, s: [
      ['fry', 'Krokant: Zucker in einer Pfanne hell karamellisieren, Kürbiskerne und Salz unterrühren, auf Backpapier verstreichen, abkühlen lassen und grob hacken.', { h: 'mittel', t: 5 }],
      ['fry', 'Schalotte in Butter glasig dünsten, gewürfelten Kürbis und Curry 3 Minuten mitdünsten.', { h: 'mittel', t: 4 }],
      ['simmer', 'Fond zugeben, 20 Minuten köcheln.', { h: 'niedrig', t: 20 }],
      ['blend', 'Sahne zugeben und im Standmixer 3 Minuten auf höchster Stufe mixen.', { t: 3 }],
      ['strain', 'Durch ein feines Sieb passieren. Mit Salz, Muskat und einem Spritzer Essig abschmecken.'],
      ['blend', 'Schaum: Milch auf 60 °C erwärmen, Kernöl zugeben und mit dem Stabmixer an der Oberfläche aufschäumen. Kurz stehen lassen und nur den Schaum abheben.'],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] },
    tm: { t: 50, s: [
      ['tm', 'Schalotte 3 Sek./Stufe 5, Butter zugeben, 3 Min./120 °C/Stufe 1.', { t: 3, c: 120, s: 1 }],
      ['tm', 'Kürbis und Curry zugeben, 6 Sek./Stufe 5, dann Fond, 20 Min./100 °C/Stufe 1.', { t: 20, c: 100, s: 1 }],
      ['tm', 'Sahne zugeben, 1 Min./Stufe 4 bis 10 ansteigend.', { t: 1, s: 10 }],
      ['strain', 'Passieren und abschmecken.'],
      ['fry', 'Krokant in der Pfanne herstellen.', { h: 'mittel', t: 5 }],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'deep', els: [
    { e: 'spheres', x: 150, y: 150, n: 4, r: 7, spread: 20, col: '#ef9033', t: 'Einlage', how: 'Gebratene Kürbiswürfel mittig in den leeren, vorgewärmten Teller legen.' },
    { e: 'crumble', x: 150, y: 150, len: 32, n: 12, wide: 16, col: '#7a8b2f', t: 'Krokant', how: 'Ein Teelöffel Krokant auf die Würfel.' },
    { e: 'bowlfill', x: 150, y: 152, r: 80, col: 'rgba(240,155,60,.88)', t: 'Velouté angießen', how: 'Heiße Velouté aus einem Kännchen am Rand angießen, die Einlage darf herausschauen.' },
    { e: 'foam', x: 150, y: 150, r: 24, t: 'Kernöl-Schaum', how: 'Zwei Löffel Schaum auf die Mitte setzen.' },
    { e: 'drizzle', x: 150, y: 150, r: 46, n: 9, col: '#2c4a18', t: 'Kernöl', how: 'Ein paar Tropfen Kürbiskernöl in einem Ring um den Schaum.' },
    { e: 'herbs', x: 150, y: 140, r: 12, n: 2, col: '#5da44a', t: 'Kerbel', how: 'Kerbelblatt auf den Schaum.' }
  ] }
},
/* ---------- Grundtechniken der Sterneküche ---------- */
{
  id: 'st-kalbsjus', n: 'Kalbsjus (Grundrezept)', c: 'sterne', k: 'Frankreich', d: 3, p: 8, pu: 'Portionen (ca. 500 ml)',
  desc: 'Die Basis für jede dunkle Soße: geröstete Knochen, Gemüse, Wein, viele Stunden Geduld.',
  ing: ['2 kg Kalbsknochen (vom Metzger klein gehackt)', '2 EL Öl', '2 Zwiebeln', '2 Möhren', '200 g Knollensellerie', '2 EL Tomatenmark', '500 ml Rotwein', '3 l kaltes Wasser', '1 Lorbeerblatt', '3 Zweige Thymian', '10 Pfefferkörner', '1 Knoblauchknolle, quer halbiert'],
  prep: [['chop', 'Gemüse in grobe Würfel (3 cm) schneiden.']],
  m: {
    ofen: { t: 420, s: [
      ['bake', 'Knochen mit Öl mischen und auf einem Blech bei 220 °C Umluft 45 bis 60 Minuten tief dunkelbraun rösten, nach der Hälfte wenden.', { c: 220, mo: 'U', t: 50, i: 'roast' }],
      ['bake', 'Gemüse zugeben und weitere 20 Minuten rösten. Tomatenmark in den letzten 10 Minuten unterrühren.', { c: 220, mo: 'U', t: 20, i: 'tray' }],
      ['pour', 'Alles in einen großen Topf geben. Das Blech mit etwas Wein ablöschen und den Bratsatz lösen, zugeben.'],
      ['simmer', 'Restlichen Wein in drei Portionen zugeben und jeweils fast vollständig einkochen.', { h: 'hoch', t: 20 }],
      ['simmer', 'Mit kaltem Wasser bedecken, Kräuter, Pfeffer und Knoblauch zugeben. Ganz leise 5 bis 6 Stunden simmern, nicht kochen. Fett und Schaum regelmäßig abschöpfen.', { h: 'niedrig', t: 330 }],
      ['strain', 'Durch ein Sieb und dann durch ein Passiertuch gießen.'],
      ['simmer', 'Offen auf etwa 500 ml einkochen, bis die Soße einen Löffel überzieht (Nappe).', { h: 'mittel', t: 60 }],
      ['chill', 'Abkühlen lassen. Hält 1 Woche im Kühlschrank oder portionsweise eingefroren 6 Monate.']
    ] },
    dkt: { t: 200, s: [
      ['bake', 'Knochen und Gemüse wie beschrieben im Ofen rösten.', { c: 220, mo: 'U', t: 70, i: 'roast' }],
      ['simmer', 'Im offenen Schnellkochtopf mit Wein in Portionen einkochen.', { h: 'hoch', t: 20 }],
      ['pour', 'Mit Wasser bis zur Max-Markierung auffüllen, Gewürze zugeben.'],
      ['pressure', '90 Minuten auf Hochdruck garen.', { t: 90, p: 'Hochdruck' }],
      ['strain', 'Natürlich abdampfen lassen, passieren und offen einkochen.']
    ] }
  }
},
{
  id: 'st-beurre-blanc', n: 'Beurre blanc (Grundrezept)', c: 'sterne', k: 'Frankreich', d: 2, p: 4,
  desc: 'Weiße Buttersoße aus Schalotten-Wein-Reduktion und kalter Butter. Passt zu Fisch, Spargel, Gemüse.',
  ing: ['2 Schalotten', '100 ml trockener Weißwein', '50 ml Weißweinessig', '2 EL Sahne (stabilisiert die Soße)', '200 g eiskalte Butter in Würfeln', 'Salz, weißer Pfeffer', 'Spritzer Zitronensaft'],
  m: {
    herd: { t: 25, s: [
      ['chop', 'Schalotten sehr fein würfeln.'],
      ['simmer', 'Schalotten mit Wein und Essig in einem kleinen Topf einkochen, bis nur noch 2 EL Flüssigkeit übrig sind.', { h: 'mittel', t: 8 }],
      ['stir', 'Sahne zugeben und kurz aufkochen.'],
      ['whisk', 'Hitze auf die niedrigste Stufe stellen. Die kalte Butter würfelweise mit dem Schneebesen einrühren, erst den nächsten Würfel zugeben, wenn der vorige fast geschmolzen ist. Die Soße darf nie kochen, sonst trennt sie sich.', { h: 'niedrig', t: 6 }],
      ['strain', 'Nach Wunsch durch ein Sieb passieren (für eine glatte Soße).'],
      ['season', 'Mit Salz, weißem Pfeffer und Zitronensaft abschmecken.'],
      ['serve', 'Sofort servieren oder in einer Thermoskanne bis zu 1 Stunde warm halten (55 bis 60 °C).']
    ] }
  },
  tips: ['Geronnen? Einen Esslöffel kalte Sahne in einen sauberen Topf geben und die Soße langsam hineinrühren.']
},
{
  id: 'st-hollandaise', n: 'Sauce Hollandaise (Grundrezept)', c: 'sterne', k: 'Frankreich', d: 2, p: 4, v: 1,
  desc: 'Warm aufgeschlagenes Eigelb mit geklärter Butter. Zu Spargel, Eggs Benedict, Fisch.',
  ing: ['3 sehr frische Eigelb', '2 EL Weißwein oder Wasser', '1 EL Zitronensaft', '200 g Butter', 'Salz, Cayennepfeffer'],
  prep: [['stir', 'Butter schmelzen, kurz stehen lassen, den weißen Schaum abschöpfen. Nur das klare Fett verwenden (geklärte Butter), auf etwa 60 °C halten.', { h: 'niedrig' }]],
  m: {
    herd: { t: 20, s: [
      ['simmer', 'Einen Topf 3 cm hoch mit Wasser zum Simmern bringen.', { h: 'niedrig' }],
      ['whisk', 'Eigelbe mit Wein in einer Metallschüssel über dem Wasserdampf kräftig aufschlagen, bis die Masse cremig ist und der Schneebesen Spuren hinterlässt (ca. 4 Minuten, nicht über 70 °C).', { t: 4, k: 68 }],
      ['whisk', 'Schüssel vom Topf nehmen. Die warme Butter erst tropfenweise, dann in dünnem Strahl unter ständigem Schlagen einlaufen lassen.'],
      ['season', 'Mit Zitronensaft, Salz und Cayennepfeffer abschmecken.'],
      ['serve', 'Sofort servieren. Zu dick? Einen Teelöffel warmes Wasser einrühren.']
    ] },
    tm: { t: 15, s: [
      ['tm', 'Eigelbe, Wein, Zitronensaft und Salz in den Mixtopf geben, 2 Min./70 °C/Stufe 4.', { t: 2, c: 70, s: 4 }],
      ['tm', 'Bei 70 °C/Stufe 4 die flüssige Butter in 1 bis 2 Minuten langsam auf den Deckel gießen, sodass sie am Messbecher vorbei einläuft.', { t: 2, c: 70, s: 4 }],
      ['season', 'Abschmecken und sofort servieren.']
    ] }
  }
}
);
