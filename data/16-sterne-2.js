/* Sterneküche, zweite Runde: Gerichte auf Restaurantniveau mit Anrichte-Plan (plate).
   Anrichte-Elemente siehe js/plating.js. Koordinaten 0..300, Tellermitte 150/150, 12 Uhr oben. */
R(
{
  id: 'st-thunfisch-tataki', n: 'Thunfisch-Tataki mit Ponzu, Avocadocreme und Sesamkrokant', c: 'sterne', k: 'Japan', d: 2, p: 4,
  desc: 'Außen kurz scharf angebraten, innen roh: Thunfisch in dünnen Scheiben, dazu Zitrus-Soja-Soße, seidige Avocadocreme und knuspriger Sesam.',
  ing: ['#Thunfisch', '400 g Thunfischloin in Sushi-Qualität, als gleichmäßiger Block', '1 EL Traubenkernöl', '1 EL schwarzer und weißer Sesam', 'Fleur de Sel', '#Ponzu', '4 EL Sojasoße', '2 EL Yuzu- oder Limettensaft', '1 EL Orangensaft', '1 EL Mirin', '1 TL Reisessig', '#Avocadocreme', '1 reife Avocado', '1 EL Limettensaft', '1 EL Joghurt', '½ TL Wasabi', 'Salz', '#Sesamkrokant', '30 g Zucker', '20 g Sesam', '#Garnitur', '1 Radieschen, hauchdünn gehobelt', 'Shiso- oder Koriander-Kresse', '1 Frühlingszwiebel, fein in Ringen'],
  prep: [
    ['stir', 'Alle Zutaten für die Ponzu verrühren und mindestens 30 Minuten ziehen lassen.', { t: 30 }],
    ['blend', 'Avocado mit Limettensaft, Joghurt, Wasabi und Salz im Mixer ganz glatt pürieren, in einen Spritzbeutel füllen und kühlen.', { t: 1 }],
    ['fry', 'Für den Krokant Zucker in einer Pfanne hellbraun karamellisieren, Sesam einrühren, sofort auf Backpapier dünn ausstreichen und abkühlen lassen. In Splitter brechen.', { h: 'mittel', t: 4 }]
  ],
  m: {
    herd: { t: 40, s: [
      ['season', 'Thunfisch trocken tupfen, mit Öl einreiben und rundherum in Sesam drücken.'],
      ['fry', 'Eine Pfanne auf höchster Stufe stark erhitzen. Den Block von allen vier Seiten je 15 bis 20 Sekunden anbraten, bis ein 2 bis 3 mm breiter gegarter Rand entsteht.', { h: 'max', sec: 80 }],
      ['chill', 'Sofort in Eiswasser tauchen oder 10 Minuten in den Kühlschrank legen, damit die Garung stoppt. Trocken tupfen.', { t: 10 }],
      ['chop', 'Mit einem sehr scharfen Messer in 5 mm dicke Scheiben schneiden, in einem Zug, ohne zu sägen.'],
      ['serve', 'Anrichten, siehe Anrichte-Plan. Ponzu erst am Tisch angießen.']
    ] }
  },
  plate: { shape: 'slate', els: [
    { e: 'slices', x: 150, y: 150, n: 5, r: 22, a: -10, col: '#7a2a2a', inner: '#c7464f', t: 'Thunfisch-Fächer', how: 'Fünf Scheiben leicht überlappend diagonal in die Mitte der Platte legen, Schnittfläche nach oben, den Sesamrand sichtbar.' },
    { e: 'dots', x: 150, y: 206, n: 6, len: 120, size: 6, col: '#a8c66c', curve: 8, t: 'Avocado-Tupfen', how: 'Avocadocreme in kleinen, kleiner werdenden Tupfen im Bogen unter den Fisch spritzen.' },
    { e: 'shard', x: 112, y: 112, size: 28, a: -20, col: '#c9933e', t: 'Sesamkrokant', how: 'Zwei Krokantsplitter schräg an den Fisch lehnen, sie geben Höhe und Biss.' },
    { e: 'disc', x: 196, y: 120, r: 9, col: '#f6eef0', rep: 3, dx: 14, dy: 10, t: 'Radieschen', how: 'Drei hauchdünne Radieschenscheiben locker oben rechts auflegen.' },
    { e: 'spheres', x: 150, y: 146, n: 10, r: 2.4, spread: 60, col: '#6aa04a', t: 'Frühlingszwiebel', how: 'Ein paar feine Frühlingszwiebelringe über den Fisch streuen.' },
    { e: 'herbs', x: 160, y: 136, r: 36, n: 4, col: '#4f8a3a', t: 'Kresse', how: 'Mit der Pinzette ein paar Kresseblättchen setzen.' },
    { e: 'pool', x: 92, y: 192, r: 15, col: '#4a2a16', t: 'Ponzu', how: 'Ponzu in einem Schälchen dazustellen oder am Tisch löffelweise neben den Fisch geben, nie darüber.' }
  ] },
  tips: ['Der Thunfisch sollte vor dem Anbraten 15 Minuten bei Zimmertemperatur liegen, dann ist die Mitte nicht eiskalt.']
},
{
  id: 'st-safranrisotto', n: 'Risotto alla milanese mit Parmesanhippe und Kalbsjus', c: 'sterne', k: 'Italien (Mailand)', d: 2, p: 4,
  desc: 'Goldgelbes Safranrisotto, all\'onda mantecato mit kalter Butter und Parmesan, dazu ein Faden Kalbsjus und ein knuspriges Käseblatt.',
  ing: ['#Risotto', '300 g Carnaroli- oder Arborio-Reis', '1,2 l heller Hühnerfond', '0,2 g Safranfäden (1 Döschen)', '1 kleine Schalotte, sehr fein gewürfelt', '20 g Butter zum Anschwitzen', '120 ml trockener Weißwein', '50 g kalte Butter, gewürfelt', '60 g Parmigiano Reggiano, fein gerieben', 'Salz, weißer Pfeffer', '#Parmesanhippe', '50 g Parmesan, fein gerieben', '#Dazu', '100 ml Kalbsjus (siehe Grundrezept Kalbsjus)', 'einige Safranfäden zum Garnieren'],
  prep: [
    ['rest', 'Safran in 3 EL heißem Fond 15 Minuten einweichen.', { t: 15 }],
    ['bake', 'Für die Hippen den Parmesan in vier flachen Kreisen (8 cm) auf Backpapier streuen und bei 180 °C 6 bis 7 Minuten backen, bis er goldgelb ist. Abkühlen lassen.', { c: 180, mo: 'OU', t: 7 }]
  ],
  m: {
    herd: { t: 35, s: [
      ['simmer', 'Fond aufkochen und am Siedepunkt halten.', { h: 'niedrig' }],
      ['fry', 'Schalotte in der Butter bei kleiner Hitze 3 Minuten glasig schwitzen, ohne Farbe.', { h: 'niedrig', t: 3 }],
      ['fry', 'Reis zugeben und 2 Minuten rösten, bis die Körner glasig und heiß sind (Tostatura).', { h: 'mittel', t: 2 }],
      ['pour', 'Mit Weißwein ablöschen und vollständig verdampfen lassen.', { h: 'mittel', t: 1 }],
      ['stir', 'Heißen Fond kellenweise zugeben, jeweils erst nachgießen, wenn der Reis die Flüssigkeit fast aufgenommen hat. Regelmäßig rühren. Nach 10 Minuten den Safran mit Einweichflüssigkeit zugeben.', { h: 'mittel', t: 17 }],
      ['rest', 'Wenn der Reis bissfest ist und noch fließt, vom Herd nehmen und 1 Minute ruhen lassen.', { t: 1 }],
      ['stir', 'Mantecatura: kalte Butter und Parmesan zugeben und kräftig rühren und den Topf ruckartig schwenken, bis das Risotto cremig wellenartig fließt. Abschmecken.'],
      ['simmer', 'Kalbsjus erwärmen.', { h: 'niedrig', t: 2 }],
      ['serve', 'Sofort anrichten, siehe Anrichte-Plan.']
    ] },
    tm: { t: 35, note: 'Gelingt gut, wird aber etwas weniger cremig als im Topf.', s: [
      ['tm', 'Schalotte 3 Sek./Stufe 5 zerkleinern, Butter zugeben, 3 Min./120 °C/Stufe 1 dünsten.', { t: 3, c: 120, s: 1 }],
      ['tm', 'Reis zugeben, 2 Min./120 °C/Linkslauf/Stufe 1 rösten.', { t: 2, c: 120, l: 1 }],
      ['tm', 'Wein zugeben, 1 Min./120 °C/Linkslauf/Stufe 1. Dann 1 l heißen Fond und Safran zugeben, 16 Min./100 °C/Linkslauf/Sanftrührstufe ohne Messbecher garen.', { t: 16, c: 100, l: 1 }],
      ['stir', 'In eine Schüssel umfüllen, kalte Butter und Parmesan kräftig einrühren, mit restlichem Fond auf die gewünschte Konsistenz bringen.'],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'deep', els: [
    { e: 'bowlfill', x: 150, y: 152, r: 70, col: '#f0c34a', t: 'Risotto verlaufen lassen', how: 'Zwei Kellen Risotto in die Mitte des tiefen Tellers geben und mit der flachen Hand von unten gegen den Teller klopfen, bis es sich rund und flach verteilt. Ein richtiges Risotto all\'onda fließt von allein.' },
    { e: 'drizzle', x: 150, y: 152, r: 42, n: 12, arc: 4.2, from: 0.4, col: '#5a2414', t: 'Kalbsjus-Ring', how: 'Mit einem Löffel einen Faden Jus in einem offenen Kreis auf das Risotto ziehen. Wenig, er soll nur würzen.' },
    { e: 'shard', x: 170, y: 132, size: 46, a: 25, col: '#e9c26a', t: 'Parmesanhippe', how: 'Die Hippe zum Schluss schräg in das Risotto stecken, erst am Tisch, sonst wird sie weich.' },
    { e: 'dust', x: 140, y: 160, r: 24, flat: 0.8, col: '#d4561c', t: 'Safranfäden', how: 'Drei, vier Safranfäden auf die Oberfläche legen.' }
  ] }
},
{
  id: 'st-wolfsbarsch', n: 'Wolfsbarsch auf der Haut gebraten, Fenchel in zwei Texturen und Safran-Beurre-blanc', c: 'sterne', k: 'Frankreich (Provence)', d: 3, p: 4,
  desc: 'Knusprige Haut, glasiges Fleisch. Dazu geschmorter und roher Fenchel, Orangenfilets und eine Buttersoße mit Safran.',
  ing: ['#Fisch', '4 Wolfsbarschfilets mit Haut (je etwa 120 g), entgrätet', '2 EL Olivenöl', '1 EL Butter', '1 Zweig Thymian', 'Fleur de Sel', '#Geschmorter Fenchel', '2 Fenchelknollen', '2 EL Olivenöl', '150 ml Gemüsefond', '1 Sternanis', 'Salz', '#Fenchelsalat', '½ Fenchelknolle (vom Rest)', '1 Orange', '1 TL Olivenöl', '#Safran-Beurre-blanc', '1 Schalotte, fein gewürfelt', '100 ml Weißwein', '2 EL Weißweinessig', '1 Prise Safranfäden', '2 EL Sahne', '150 g kalte Butter, gewürfelt', 'Salz, Zitronensaft', '#Garnitur', 'Fenchelgrün'],
  prep: [
    ['chop', 'Fenchel putzen, das Grün aufheben. Zwei Knollen in je 6 Spalten schneiden, die Strunkansätze dranlassen. Die halbe Knolle auf dem Hobel hauchdünn schneiden und in Eiswasser legen.'],
    ['chop', 'Orange schälen und filetieren, den Saft auffangen.'],
    ['prep', 'Fischhaut mit einem Messerrücken abstreifen, um Feuchtigkeit zu entfernen, und 3 Mal flach einschneiden. Unbedeckt 20 Minuten im Kühlschrank trocknen lassen.', { t: 20 }]
  ],
  m: {
    herd: { t: 50, s: [
      ['fry', 'Fenchelspalten in Olivenöl auf den Schnittflächen goldbraun anbraten.', { h: 'hoch', t: 5 }],
      ['simmer', 'Fond, Sternanis und Salz zugeben, zugedeckt 15 Minuten weich schmoren, dann offen glasig einkochen.', { h: 'niedrig', t: 18 }],
      ['simmer', 'Für die Beurre blanc Schalotte, Wein, Essig und Safran auf 2 EL einkochen. Sahne zugeben.', { h: 'mittel', t: 8 }],
      ['whisk', 'Bei kleinster Hitze die kalte Butter stückweise einschwenken, bis eine sämige Soße entsteht. Nicht kochen lassen. Passieren, mit Salz und Zitronensaft abschmecken und warm halten.', { h: 'niedrig', t: 5 }],
      ['mix', 'Fenchelscheiben abtropfen, mit Orangenfilets, einem Löffel Orangensaft, Olivenöl und Salz anmachen.'],
      ['fry', 'Olivenöl in einer beschichteten Pfanne stark erhitzen. Fisch mit der Haut nach unten einlegen und 10 Sekunden mit einem Pfannenwender flach andrücken, damit sich die Haut nicht wölbt.', { h: 'hoch', sec: 10 }],
      ['fry', 'Bei mittlerer Hitze 3 bis 4 Minuten braten, bis das Fleisch zu drei Vierteln von unten weiß geworden ist.', { h: 'mittel', t: 4 }],
      ['flip', 'Butter und Thymian zugeben, Fisch wenden und 20 Sekunden nachziehen lassen, dabei mit der Butter begießen. Kerntemperatur 52 °C.', { h: 'niedrig', sec: 20, k: 52 }],
      ['serve', 'Haut mit Fleur de Sel bestreuen und anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'block', x: 118, y: 170, w: 46, h: 22, a: -20, col: '#e8d79b', rx: 9, rep: 3, dx: 22, dy: 14, da: 14, t: 'Geschmorter Fenchel', how: 'Drei Fenchelspalten fächerförmig auf 7 bis 5 Uhr legen, die gebräunte Seite nach oben.' },
    { e: 'block', x: 168, y: 128, w: 92, h: 32, a: -14, col: '#f2f0ea', rx: 10, t: 'Wolfsbarsch', how: 'Das Filet mit der knusprigen Haut nach oben leicht schräg auf den Fenchel legen. Die Haut nie mit Soße bedecken.' },
    { e: 'bowlfill', x: 196, y: 194, r: 34, col: 'rgba(246,206,110,.9)', t: 'Safran-Beurre-blanc', how: 'Die Soße kurz mit dem Stabmixer aufschäumen und neben den Fenchel angießen.' },
    { e: 'nest', x: 98, y: 114, r: 22, col: '#eef0d8', t: 'Fenchelsalat', how: 'Den Fenchelsalat mit einer Gabel zu einem kleinen, lockeren Nest auf 10 Uhr drehen.' },
    { e: 'disc', x: 112, y: 98, r: 7, col: '#f28a2e', rep: 3, dx: 9, dy: 11, t: 'Orangenfilets', how: 'Zwei, drei Orangenfilets in das Nest legen.' },
    { e: 'herbs', x: 170, y: 120, r: 30, n: 4, col: '#7fb35a', t: 'Fenchelgrün', how: 'Ein paar Spitzen Fenchelgrün auf den Fisch und ins Nest setzen.' }
  ] }
},
{
  id: 'st-hirschruecken', n: 'Hirschrücken mit Selleriepüree, Preiselbeeren und Wacholderjus', c: 'sterne', k: 'Deutschland (Wildküche)', d: 3, p: 4,
  desc: 'Rosa gebratener Hirschrücken mit Wacholderkruste, samtiges Selleriepüree, glasierte Rosenkohlblätter und eine tiefdunkle Wildsoße.',
  ing: ['#Hirsch', '600 g Hirschrücken, ausgelöst und pariert', '1 EL Öl', '30 g Butter', '1 Zweig Rosmarin', '1 Knoblauchzehe, angedrückt', '6 Wacholderbeeren und 1 TL schwarzer Pfeffer, grob zerstoßen', 'Salz', '#Wacholderjus', '300 ml Wildfond', '100 ml Rotwein', '50 ml Portwein', '5 Wacholderbeeren, angedrückt', '1 EL Preiselbeeren', '20 g kalte Butter', '#Selleriepüree', '500 g Knollensellerie, gewürfelt', '250 ml Milch', '50 g Butter', 'Salz, Muskat', '#Rosenkohl', '250 g Rosenkohl', '15 g Butter', 'Salz', '#Garnitur', '3 EL Preiselbeeren', '1 Zweig Thymian'],
  prep: [
    ['rest', 'Hirschrücken 45 Minuten vor dem Braten aus dem Kühlschrank nehmen.', { t: 45 }],
    ['prep', 'Rosenkohl putzen, Blätter einzeln ablösen, das kleine Herz halbieren.']
  ],
  m: {
    ofen: { t: 70, s: [
      ['simmer', 'Für den Jus Rotwein, Portwein und Wacholder auf ein Drittel einkochen, Wildfond zugeben und auf etwa 120 ml reduzieren, bis die Soße einen Löffel überzieht.', { h: 'mittel', t: 25 }],
      ['simmer', 'Sellerie in Milch mit Salz zugedeckt 20 Minuten weich köcheln.', { h: 'niedrig', t: 20 }],
      ['blend', 'Sellerie abgießen, Milch auffangen. Mit Butter im Mixer 2 Minuten glatt pürieren, mit Milch auf die Konsistenz bringen, mit Muskat abschmecken. Warm halten.', { t: 2 }],
      ['fry', 'Hirsch salzen und im heißen Öl rundherum 3 Minuten scharf anbraten. Butter, Rosmarin und Knoblauch zugeben und kurz arrosieren.', { h: 'hoch', t: 3 }],
      ['bake', 'Auf einem Rost bei 120 °C Ober-/Unterhitze garen, bis die Kerntemperatur 54 °C erreicht (etwa 12 bis 15 Minuten).', { c: 120, mo: 'OU', t: 14, k: 54 }],
      ['rest', 'In Alufolie 8 Minuten ruhen lassen. Dann rundum in der Wacholder-Pfeffer-Mischung wälzen.', { t: 8 }],
      ['boil', 'Rosenkohlblätter 1 Minute in Salzwasser blanchieren, abschrecken, in Butter schwenken.', { h: 'hoch', t: 1 }],
      ['whisk', 'Preiselbeeren in den Jus geben, vom Herd nehmen und die kalte Butter einschwenken.'],
      ['serve', 'Hirsch in 4 Medaillons schneiden und anrichten, siehe Anrichte-Plan.']
    ] },
    sousvide: { t: 120, note: 'Sous-vide gegart wird der Hirsch von Rand zu Rand gleichmäßig rosa.', s: [
      ['sousvide', 'Hirsch mit Rosmarin und Knoblauch vakuumieren und bei 54 °C 75 Minuten garen.', { c: 54, t: 75 }],
      ['fry', 'Aus dem Beutel nehmen, trocken tupfen und in sehr heißer Butter rundum 1 Minute anbraten.', { h: 'max', t: 1 }],
      ['season', 'In der Wacholder-Pfeffer-Mischung wälzen und salzen.'],
      ['serve', 'Mit Püree, Rosenkohl und Jus anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'swoosh', x: 142, y: 176, len: 130, a: 10, w: 28, col: '#f1ead6', t: 'Selleriepüree', how: 'Einen Löffel Püree auf 8 Uhr setzen und mit dem Löffelrücken im Bogen Richtung 4 Uhr ziehen.' },
    { e: 'slices', x: 156, y: 150, n: 2, r: 26, a: -8, col: '#3a1a14', inner: '#a8343a', crust: '#2b2b22', t: 'Hirschmedaillons', how: 'Zwei Medaillons mit der rosa Schnittfläche nach oben an den Swoosh lehnen. Mit Fleur de Sel würzen.' },
    { e: 'leaf', x: 96, y: 120, size: 12, a: -30, col: '#5e8f3c', t: 'Rosenkohlblätter', how: 'Fünf, sechs glasierte Blätter wie kleine Schalen auf 10 Uhr legen, eins davon mit Preiselbeeren füllen.' },
    { e: 'leaf', x: 116, y: 104, size: 10, a: 20, col: '#6f9e45', t: 'Weitere Blätter', how: 'Weitere Blätter locker dazulegen, dazwischen etwas Teller frei lassen.' },
    { e: 'spheres', x: 206, y: 190, n: 7, r: 4, spread: 20, col: '#b3132b', t: 'Preiselbeeren', how: 'Ein Häufchen Preiselbeeren auf 4 Uhr setzen.' },
    { e: 'pool', x: 200, y: 128, r: 15, col: '#3a140c', t: 'Wacholderjus', how: 'Jus neben das Fleisch löffeln, einen dünnen Faden über die Kruste ziehen.' },
    { e: 'herbs', x: 160, y: 136, r: 14, n: 3, col: '#5b7f3a', t: 'Thymian', how: 'Zwei Thymianspitzen auf die Medaillons legen.' }
  ] }
},
{
  id: 'st-carpaccio', n: 'Rindercarpaccio mit Trüffelmayonnaise, Parmesan und Rucola', c: 'sterne', k: 'Italien (Venedig)', d: 2, p: 4,
  desc: 'Hauchdünnes rohes Rinderfilet, mit Zitronen-Olivenöl gewürzt, dazu Punkte von Trüffelmayonnaise, gehobelter Parmesan, Kapern und Rucola.',
  ing: ['#Carpaccio', '300 g Rinderfilet (Mittelstück), sehr frisch', 'Fleur de Sel', 'schwarzer Pfeffer aus der Mühle', '2 EL bestes Olivenöl', '1 EL Zitronensaft', '#Trüffelmayonnaise', '1 sehr frisches Eigelb', '1 TL Dijonsenf', '100 ml neutrales Öl', '1 TL Trüffelöl oder 1 TL Trüffelpaste', '1 TL Zitronensaft', 'Salz', '#Garnitur', '40 g Parmigiano Reggiano am Stück', '1 Handvoll Babyrucola', '1 EL kleine Kapern, frittiert', '2 EL Pinienkerne, geröstet'],
  prep: [
    ['chill', 'Filet straff in Frischhaltefolie wickeln und 60 Minuten ins Tiefkühlfach legen, bis es fest, aber nicht durchgefroren ist.', { t: 60 }],
    ['whisk', 'Eigelb mit Senf verrühren, Öl erst tropfenweise, dann im dünnen Strahl unterschlagen. Mit Trüffelöl, Zitrone und Salz abschmecken, in einen Spritzbeutel füllen.'],
    ['deepfry', 'Kapern trocken tupfen und in 1 cm heißem Öl 1 Minute frittieren, bis sie aufplatzen.', { h: 'hoch', t: 1 }]
  ],
  m: {
    kalt: { t: 25, note: 'Plus 60 Minuten Anfrieren.', s: [
      ['chop', 'Filet mit einem sehr scharfen Messer oder der Aufschnittmaschine in 2 mm dünne Scheiben schneiden.'],
      ['prep', 'Scheiben einzeln zwischen zwei Lagen Frischhaltefolie legen und mit einem Plattiereisen oder Topfboden sanft hauchdünn klopfen.'],
      ['layer', 'Kalte Teller nacheinander lückenlos mit den Scheiben auslegen, bis zum Rand.'],
      ['season', 'Olivenöl und Zitronensaft verrühren und mit einem Pinsel dünn auftragen. Mit Fleur de Sel und Pfeffer würzen.'],
      ['serve', 'Sofort garnieren, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'bowlfill', x: 150, y: 150, r: 92, col: '#b8323e', t: 'Carpaccio-Teppich', how: 'Die Scheiben überlappend von außen nach innen legen, bis der ganze Spiegel des Tellers bedeckt ist.' },
    { e: 'dots', x: 150, y: 150, n: 7, len: 130, size: 5, col: '#efe1a8', curve: 24, even: true, t: 'Trüffelmayonnaise', how: 'Sieben gleich große Punkte Trüffelmayonnaise in einem flachen Bogen spritzen.' },
    { e: 'shard', x: 120, y: 120, size: 30, a: -15, col: '#f1dc9a', t: 'Parmesanspäne', how: 'Mit dem Sparschäler breite Parmesanspäne direkt über den Teller hobeln, drei, vier Stück.' },
    { e: 'shard', x: 186, y: 172, size: 26, a: 30, col: '#f1dc9a', t: 'Weitere Späne', how: 'Weitere Späne locker verteilen, nicht alles bedecken.' },
    { e: 'herbs', x: 150, y: 146, r: 30, n: 8, col: '#4f8a2e', t: 'Rucola', how: 'Ein kleines Büschel Babyrucola in die Mitte setzen, nicht flach drücken.' },
    { e: 'spheres', x: 150, y: 186, n: 10, r: 3, spread: 70, col: '#5b6b2a', t: 'Kapern und Pinienkerne', how: 'Frittierte Kapern und Pinienkerne zum Schluss darüberstreuen.' }
  ] },
  tips: ['Nur Fleisch vom Metzger des Vertrauens nehmen und am selben Tag verarbeiten. Rohes Eigelb und rohes Fleisch sind nichts für Schwangere und kleine Kinder.']
},
{
  id: 'st-schoko-souffle', n: 'Schokoladensoufflé mit Vanillesoße', c: 'sterne', k: 'Frankreich', d: 3, p: 4, v: 1,
  desc: 'Luftig aufgegangenes Soufflé mit flüssigem Kern, am Tisch mit kalter Vanillesoße gefüllt. Muss sofort aus dem Ofen auf den Tisch.',
  ing: ['#Förmchen', '15 g weiche Butter', '2 EL Zucker', '#Soufflé', '100 g Zartbitterschokolade (65 bis 70 %)', '30 g Butter', '3 Eigelb', '4 Eiweiß', '1 Prise Salz', '¼ TL Zitronensaft', '50 g Zucker', '#Vanillesoße', '200 ml Milch', '50 ml Sahne', '½ Vanilleschote', '2 Eigelb', '30 g Zucker', '#Garnitur', 'Puderzucker'],
  prep: [
    ['spread', 'Vier Souffléförmchen (8 cm) mit weicher Butter in senkrechten Strichen von unten nach oben ausstreichen, mit Zucker ausstreuen und kalt stellen. Die senkrechten Striche helfen dem Soufflé gerade aufzusteigen.'],
    ['simmer', 'Für die Vanillesoße Milch, Sahne und Vanille aufkochen. Eigelb mit Zucker verrühren, heiße Milch einrühren, zurück in den Topf und bei kleiner Hitze unter Rühren auf 82 °C erhitzen, bis die Soße einen Löffel überzieht. Sofort passieren und kalt stellen.', { h: 'niedrig', t: 6, k: 82 }]
  ],
  m: {
    ofen: { t: 35, s: [
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen, ein Blech auf der unteren Schiene mitheizen.', { c: 200, mo: 'OU', t: 10 }],
      ['stir', 'Schokolade mit Butter über dem Wasserbad schmelzen, vom Herd nehmen und die Eigelbe einzeln einrühren.', { h: 'niedrig', t: 3 }],
      ['whisk', 'Eiweiß mit Salz und Zitronensaft schaumig schlagen, Zucker einrieseln lassen und zu glänzendem, festem, aber nicht trockenem Schnee schlagen.'],
      ['fold', 'Ein Drittel des Eischnees kräftig unter die Schokolade rühren, den Rest in zwei Portionen locker unterheben.'],
      ['pour', 'Förmchen randvoll füllen, die Oberfläche mit einer Palette glatt streichen und mit dem Daumen einmal am Rand entlangfahren, so entsteht eine Kante, an der das Soufflé gerade hochsteigt.'],
      ['bake', 'Auf das heiße Blech stellen und 11 bis 12 Minuten backen. Ofentür nicht öffnen.', { c: 200, mo: 'OU', t: 12 }],
      ['serve', 'Mit Puderzucker bestäuben und sofort servieren, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'ring', x: 136, y: 146, r: 40, col: '#f7f2ea', top: '#3b1e12', t: 'Soufflé im Förmchen', how: 'Das Förmchen auf eine Serviette auf dem Teller stellen, damit es nicht rutscht.' },
    { e: 'dust', x: 136, y: 146, r: 32, flat: 0.9, col: '#ffffff', t: 'Puderzucker', how: 'Puderzucker durch ein feines Sieb über das Soufflé stäuben, direkt vor dem Servieren.' },
    { e: 'pool', x: 206, y: 196, r: 18, col: '#f4dfa0', t: 'Vanillesoße', how: 'Vanillesoße in einem kleinen Kännchen daneben stellen. Am Tisch die Oberfläche mit dem Löffel öffnen und die kalte Soße hineingießen.' }
  ] },
  tips: ['Die Masse kann bis 1 Stunde vorher in die Förmchen gefüllt und kalt gestellt werden. Dann 1 bis 2 Minuten länger backen.']
},
{
  id: 'st-rotweinbirne', n: 'Rotweinbirne mit Mascarpone-Quenelle, Mandelcrumble und Zimtsirup', c: 'sterne', k: 'Modern europäisch', d: 2, p: 4, v: 1,
  desc: 'Ganze Birnen in gewürztem Rotwein pochiert, bis sie tief rubinrot sind, dazu Vanille-Mascarpone, knuspriger Mandelcrumble und der eingekochte Sud.',
  ing: ['#Birnen', '4 feste Birnen (Williams oder Abate Fetel)', '750 ml kräftiger Rotwein', '150 g Zucker', '1 Zimtstange', '2 Sternanis', '3 Gewürznelken', '1 Streifen Orangenschale', '½ Vanilleschote', '#Mascarpone', '150 g Mascarpone', '50 ml Sahne', '1 EL Puderzucker', 'Mark von ½ Vanilleschote', '#Mandelcrumble', '40 g Mehl', '30 g gemahlene Mandeln', '30 g kalte Butter', '30 g brauner Zucker', '1 Prise Salz', '20 g Mandelblättchen', '#Garnitur', 'einige Minzblätter'],
  prep: [
    ['knead', 'Für den Crumble Mehl, Mandeln, Butter, Zucker und Salz mit den Fingern zu Bröseln reiben, Mandelblättchen untermischen.']
  ],
  m: {
    herd: { t: 70, note: 'Am besten am Vortag pochieren und über Nacht im Sud ziehen lassen, dann werden sie bis innen rot.', s: [
      ['prep', 'Birnen schälen, den Stiel dranlassen. Die Unterseite gerade abschneiden, damit sie stehen, und das Kerngehäuse von unten mit einem Kugelausstecher entfernen.'],
      ['simmer', 'Rotwein, Zucker und Gewürze aufkochen, Birnen hineinlegen und mit einem Kreis Backpapier abdecken. 20 bis 30 Minuten sanft pochieren, bis ein Messer leicht hineingleitet. Gelegentlich drehen.', { h: 'niedrig', t: 25 }],
      ['rest', 'Im Sud abkühlen lassen, am besten über Nacht.', { t: 60 }],
      ['simmer', 'Birnen herausnehmen. 250 ml Sud durch ein Sieb gießen und auf ein Drittel zu einem Sirup einkochen, der einen Löffel überzieht.', { h: 'mittel', t: 12 }],
      ['bake', 'Crumble auf einem Blech bei 180 °C 12 bis 14 Minuten goldbraun backen, einmal wenden.', { c: 180, mo: 'OU', t: 13 }],
      ['whisk', 'Mascarpone mit Sahne, Puderzucker und Vanille zu einer festen, glatten Creme schlagen.'],
      ['serve', 'Anrichten, siehe Anrichte-Plan.']
    ] }
  },
  plate: { shape: 'round', els: [
    { e: 'crumble', x: 150, y: 176, len: 150, n: 34, wide: 14, a: -8, col: '#c9944e', t: 'Mandelcrumble-Linie', how: 'Den Crumble als Streifen quer durch die untere Tellerhälfte streuen.' },
    { e: 'disc', x: 118, y: 140, r: 30, col: '#7a1c2c', sear: '#5a1220', t: 'Rotweinbirne', how: 'Die Birne aufrecht auf 10 Uhr stellen, sie trägt den Teller. Für mehr Eleganz längs halbieren und eine Hälfte mit der Schnittfläche nach oben daneben legen.' },
    { e: 'quenelle', x: 190, y: 160, size: 22, a: -25, col: '#f8f1df', t: 'Mascarpone-Quenelle', how: 'Mit einem in heißes Wasser getauchten Esslöffel eine Nocke abstechen und auf den Crumble setzen.' },
    { e: 'drizzle', x: 150, y: 150, r: 64, n: 10, arc: 3.6, from: 0.6, col: '#5e1222', t: 'Zimtsirup', how: 'Den Sirup in Tropfen um die Birne setzen und einen Löffel über die Birne laufen lassen, damit sie glänzt.' },
    { e: 'herbs', x: 196, y: 150, r: 10, n: 2, col: '#4f8f3e', t: 'Minze', how: 'Zwei kleine Minzblätter an die Quenelle setzen.' }
  ] }
}
);
