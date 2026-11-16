/* Fleisch & Geflügel */
R(
{
  id: 'schnitzel', n: 'Wiener Schnitzel', c: 'fleisch', k: 'Österreich', d: 2, p: 4,
  desc: 'Hauchdünn geklopft, in Butterschmalz schwimmend gebacken, bis die Panade Wellen wirft. Original mit Kalb, hier auch mit Schwein.',
  ing: ['4 Kalbs- oder Schweineschnitzel (à ca. 150 g)', 'Salz, Pfeffer', '80 g Mehl', '2 Eier', '2 EL Milch oder Sahne', '150 g Semmelbrösel', '200 g Butterschmalz (Pfanne) oder 2 EL Öl (Airfryer, Ofen)', '1 Zitrone', 'Petersilie'],
  prep: [
    ['prep', 'Schnitzel zwischen zwei Lagen Frischhaltefolie legen.'],
    ['mash', 'Mit einem Plattiereisen oder dem Boden eines Topfes von der Mitte nach außen gleichmäßig auf 4 bis 5 mm klopfen. Beidseitig salzen und pfeffern.'],
    ['prep', 'Drei tiefe Teller vorbereiten: Mehl, Eier mit Milch verquirlt, Semmelbrösel.'],
    ['shape', 'Schnitzel erst in Mehl wenden und abklopfen, dann durchs Ei ziehen und abtropfen lassen, zuletzt locker in den Bröseln wenden. Die Brösel nicht andrücken, sonst wellt sich die Panade später nicht.']
  ],
  m: {
    herd: { t: 35, s: [
      ['deepfry', 'Butterschmalz in einer großen Pfanne etwa 1 cm hoch auf 170 °C erhitzen. Test: An einem Holzlöffelstiel steigen kleine Bläschen auf.', { h: 'mittel', c: 170 }],
      ['deepfry', 'Schnitzel einzeln einlegen und die Pfanne leicht rütteln, sodass Fett über die Oberseite schwappt. So wirft die Panade Wellen. 2 bis 3 Minuten pro Seite goldbraun backen.', { h: 'mittel', t: 3 }],
      ['flip', 'Mit einer Gabel wenden (nicht in das Fleisch stechen, nur unter die Panade) und die zweite Seite backen.', { t: 2 }],
      ['rest', 'Auf Küchenpapier abtropfen lassen.'],
      ['serve', 'Mit Zitronenspalten servieren. Klassisch dazu: Kartoffelsalat oder Petersilienkartoffeln.']
    ] },
    airfryer: { t: 35, note: 'Die Panade wird knusprig, wellt sich aber nicht wie in der Pfanne.', s: [
      ['spread', 'Panierte Schnitzel von beiden Seiten mit Öl einsprühen oder dünn bepinseln. Ohne Öl bleiben die Brösel blass und staubig.'],
      ['airfry', 'Schnitzel nebeneinander (nicht überlappend) in den Korb legen. Bei 200 °C 6 Minuten garen.', { c: 200, t: 6 }],
      ['flip', 'Wenden und noch einmal leicht einsprühen.'],
      ['airfry', 'Weitere 4 bis 5 Minuten goldbraun garen.', { c: 200, t: 5 }],
      ['serve', 'Mit Zitrone servieren.']
    ] },
    ofen: { t: 40, s: [
      ['bake', 'Backofen auf 220 °C Umluft vorheizen, ein Gitter auf ein Blech legen.', { c: 220, mo: 'U' }],
      ['spread', 'Panierte Schnitzel beidseitig mit Öl beträufeln oder besprühen und auf das Gitter legen.'],
      ['bake', '10 Minuten backen, wenden und weitere 6 bis 8 Minuten backen, bis die Panade goldbraun ist.', { c: 220, mo: 'U', t: 17, i: 'tray' }],
      ['serve', 'Mit Zitrone servieren.']
    ] }
  }
},
{
  id: 'gulasch', n: 'Rindergulasch', c: 'fleisch', k: 'Ungarn & Österreich', d: 2, p: 6,
  desc: 'Gleich viel Zwiebeln wie Fleisch, langsam geschmort, bis das Fleisch zerfällt.',
  ing: ['1,2 kg Rinderwade oder -schulter', '1 kg Zwiebeln', '3 EL Schmalz oder Öl', '3 EL Paprikapulver edelsüß', '1 TL Paprikapulver rosenscharf', '2 EL Tomatenmark', '2 Knoblauchzehen', '1 TL Kümmel, gemahlen', '1 TL Majoran', 'Abrieb von ½ Bio-Zitrone', '1 EL Weißweinessig', '500 ml Rinderbrühe', 'Salz, Pfeffer'],
  prep: [['chop', 'Fleisch in 4 cm große Würfel schneiden, Sehnen entfernen. Zwiebeln halbieren und in feine Streifen schneiden, Knoblauch hacken.']],
  m: {
    herd: { t: 180, s: [
      ['fry', 'Schmalz in einem Bräter erhitzen, Zwiebeln bei mittlerer Hitze 20 Minuten goldbraun braten.', { h: 'mittel', t: 20 }],
      ['stir', 'Tomatenmark 1 Minute mitrösten. Topf vom Herd nehmen, Paprikapulver einrühren und sofort mit Essig und einem Schuss Brühe ablöschen.'],
      ['pour', 'Fleisch roh zugeben (bei Gulasch wird es klassisch nicht angebraten), Kümmel, Majoran, Knoblauch und Brühe zugeben. Salzen.'],
      ['simmer', 'Mit Deckel bei kleinster Hitze 2 Stunden 30 Minuten schmoren, gelegentlich umrühren. Die Zwiebeln zerfallen und binden die Soße.', { h: 'niedrig', t: 150 }],
      ['season', 'Zitronenabrieb einrühren, mit Salz und Pfeffer abschmecken.'],
      ['serve', 'Mit Semmelknödeln, Spätzle oder Brot servieren.']
    ] },
    dkt: { t: 80, s: [
      ['fry', 'Zwiebeln im offenen Topf 15 Minuten goldbraun braten.', { h: 'mittel', t: 15 }],
      ['stir', 'Tomatenmark und abseits der Hitze Paprikapulver einrühren, mit Essig ablöschen.'],
      ['pour', 'Fleisch, Gewürze und nur 250 ml Brühe zugeben, Boden freikratzen.'],
      ['pressure', '35 Minuten auf Hochdruck garen.', { t: 35, p: 'Hochdruck' }],
      ['rest', 'Druck 15 Minuten natürlich abbauen lassen.', { t: 15 }],
      ['simmer', 'Offen 5 Minuten einkochen lassen, wenn die Soße zu dünn ist. Zitronenabrieb zugeben, abschmecken.', { h: 'mittel', t: 5 }]
    ] },
    slow: { t: 510, s: [
      ['fry', 'Zwiebeln in der Pfanne goldbraun braten, Tomatenmark und Paprika einrühren, mit Essig ablöschen.', { h: 'mittel', t: 20 }],
      ['slow', 'Mit Fleisch, Gewürzen und 200 ml Brühe in den Slow Cooker geben. LOW 8 Stunden.', { lvl: 'LOW', t: 480 }],
      ['season', 'Zitronenabrieb zugeben und abschmecken.']
    ] },
    ofen: { t: 200, note: 'Im geschlossenen Bräter gart das Gulasch von allen Seiten gleichmäßig und brennt nicht an.', s: [
      ['fry', 'Zwiebeln im ofenfesten Bräter goldbraun braten, Tomatenmark und Paprika einrühren, ablöschen.', { h: 'mittel', t: 20 }],
      ['pour', 'Fleisch, Gewürze und Brühe zugeben, aufkochen.'],
      ['bake', 'Mit Deckel bei 160 °C Ober-/Unterhitze im unteren Drittel 2 Stunden 30 Minuten schmoren.', { c: 160, mo: 'OU', t: 150, i: 'dish' }],
      ['season', 'Abschmecken und servieren.']
    ] }
  }
},
{
  id: 'rouladen', n: 'Rinderrouladen', c: 'fleisch', k: 'Deutschland', d: 3, p: 4,
  desc: 'Gefüllt mit Senf, Speck, Zwiebel und Gewürzgurke, in dunkler Soße geschmort.',
  ing: ['4 Rinderrouladen aus der Oberschale (à ca. 180 g)', '4 TL mittelscharfer Senf', '8 Scheiben Frühstücksspeck', '2 Zwiebeln', '2 Gewürzgurken', 'Salz, Pfeffer', '2 EL Butterschmalz', '1 Möhre', '100 g Knollensellerie', '1 EL Tomatenmark', '250 ml Rotwein', '500 ml Rinderfond', '1 Lorbeerblatt', '1 EL Speisestärke', 'Rouladennadeln oder Küchengarn'],
  prep: [
    ['chop', 'Eine Zwiebel und die Gurken in Streifen schneiden. Zweite Zwiebel, Möhre und Sellerie würfeln.'],
    ['spread', 'Rouladen ausbreiten, leicht salzen und pfeffern, dünn mit Senf bestreichen.'],
    ['shape', 'Je 2 Speckscheiben, Zwiebel- und Gurkenstreifen auf das untere Drittel legen. Seiten einschlagen und fest aufrollen. Mit Nadeln oder Garn fixieren.']
  ],
  m: {
    herd: { t: 140, s: [
      ['fry', 'Butterschmalz in einem Bräter stark erhitzen und die Rouladen rundherum 6 bis 8 Minuten dunkelbraun anbraten. Herausnehmen.', { h: 'hoch', t: 7 }],
      ['fry', 'Gemüsewürfel im Bratfett 5 Minuten rösten, Tomatenmark zugeben und 1 Minute mitrösten.', { h: 'mittel', t: 6 }],
      ['pour', 'Mit der Hälfte des Weins ablöschen und einkochen, dann den restlichen Wein zugeben und wieder einkochen. Das gibt die dunkle Farbe.', { h: 'hoch', t: 6 }],
      ['simmer', 'Fond und Lorbeer zugeben, Rouladen einlegen. Mit Deckel bei niedriger Hitze 1 Stunde 30 Minuten schmoren, nach der Hälfte wenden.', { h: 'niedrig', t: 90 }],
      ['blend', 'Rouladen herausnehmen. Soße durch ein Sieb passieren oder mit dem Gemüse pürieren.'],
      ['stir', 'Stärke mit 2 EL kaltem Wasser anrühren, in die kochende Soße rühren und 1 Minute binden. Abschmecken.', { h: 'mittel', t: 1 }],
      ['serve', 'Nadeln entfernen, Rouladen in der Soße mit Klößen und Rotkohl servieren.']
    ] },
    dkt: { t: 75, s: [
      ['fry', 'Rouladen im offenen Topf rundherum kräftig anbraten, herausnehmen. Gemüse und Tomatenmark rösten.', { h: 'hoch', t: 12 }],
      ['pour', 'Mit Wein ablöschen und einkochen. Nur 300 ml Fond zugeben, Rouladen einlegen.', { h: 'hoch', t: 5 }],
      ['pressure', '30 Minuten auf Hochdruck garen.', { t: 30, p: 'Hochdruck' }],
      ['rest', 'Druck natürlich abbauen lassen.', { t: 15 }],
      ['stir', 'Soße pürieren oder passieren und mit Stärke binden.', { h: 'mittel', t: 2 }]
    ] },
    slow: { t: 500, s: [
      ['fry', 'Rouladen in der Pfanne kräftig anbraten, Gemüse und Tomatenmark rösten, mit Wein ablöschen und einkochen.', { h: 'hoch', t: 18 }],
      ['slow', 'Alles mit 250 ml Fond und Lorbeer in den Slow Cooker geben. LOW 8 Stunden.', { lvl: 'LOW', t: 480 }],
      ['stir', 'Soße in einen Topf abgießen, pürieren und mit Stärke binden.', { h: 'mittel', t: 3 }]
    ] }
  }
},
{
  id: 'haehnchenbrust', n: 'Saftige Hähnchenbrust', c: 'fleisch', k: 'International', d: 1, p: 2,
  desc: 'Mit dem Thermometer gelingt sie immer: raus bei 70 °C, Ruhezeit bringt sie auf 72 bis 74 °C.',
  ing: ['2 Hähnchenbrustfilets (à ca. 200 g)', '1 EL Öl', '1 TL Salz', '½ TL Paprikapulver', '½ TL Knoblauchpulver', 'Pfeffer', '1 EL Butter (Pfanne)', '1 Zweig Thymian (Pfanne)'],
  prep: [
    ['mash', 'Die dicke Seite des Filets mit der Handfläche oder einem Topfboden flacher drücken, damit es gleichmäßig dick ist (ca. 2 cm). So gart es gleichmäßig.'],
    ['season', 'Mit Öl einreiben und mit Salz, Paprika, Knoblauchpulver und Pfeffer würzen. Wenn Zeit ist: gesalzen 30 Minuten im Kühlschrank ruhen lassen.']
  ],
  m: {
    herd: { t: 20, s: [
      ['fry', 'Eine Pfanne bei mittlerer bis hoher Hitze vorheizen. Filets mit der glatten Seite nach unten einlegen und 5 Minuten braten, ohne sie zu bewegen.', { h: 'hoch', t: 5 }],
      ['flip', 'Wenden, Hitze auf mittel reduzieren und 4 bis 6 Minuten braten. Butter und Thymian zugeben und das Fleisch mit der schäumenden Butter übergießen.', { h: 'mittel', t: 5, k: 70 }],
      ['rest', 'Bei 70 °C Kerntemperatur herausnehmen und 5 Minuten auf einem Brett ruhen lassen.', { t: 5 }],
      ['serve', 'Quer zur Faser in Scheiben schneiden.']
    ] },
    ofen: { t: 30, s: [
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen.', { c: 200, mo: 'OU' }],
      ['fry', 'Optional für Farbe: Filets in einer ofenfesten Pfanne 2 Minuten pro Seite scharf anbraten.', { h: 'hoch', t: 4 }],
      ['bake', 'In der Pfanne oder einer Form auf mittlerer Schiene 15 bis 20 Minuten garen, bis 70 °C Kerntemperatur erreicht sind.', { c: 200, mo: 'OU', t: 18, k: 70, i: 'roast' }],
      ['rest', '5 Minuten ruhen lassen.', { t: 5 }],
      ['serve', 'Aufschneiden und servieren.']
    ] },
    airfryer: { t: 25, s: [
      ['airfry', 'Filets in den Korb legen und bei 190 °C 10 Minuten garen.', { c: 190, t: 10 }],
      ['flip', 'Wenden.'],
      ['airfry', 'Weitere 6 bis 9 Minuten garen, bis die Kerntemperatur 70 °C beträgt.', { c: 190, t: 7, k: 70 }],
      ['rest', '5 Minuten ruhen lassen und aufschneiden.', { t: 5 }]
    ] },
    grill: { t: 25, s: [
      ['grill', 'Grill auf mittlere direkte Hitze (ca. 200 bis 220 °C) vorheizen, Rost reinigen und einölen.', { c: 210 }],
      ['grill', 'Filets 5 bis 6 Minuten grillen, ohne sie zu bewegen, bis sie sich vom Rost lösen.', { t: 6 }],
      ['flip', 'Wenden und weitere 4 bis 6 Minuten grillen, bis die Kerntemperatur 70 °C beträgt.', { t: 5, k: 70 }],
      ['rest', '5 Minuten ruhen lassen.', { t: 5 }]
    ] }
  },
  tips: ['Ein Einstich-Thermometer ist die beste Investition für saftiges Fleisch. Ohne Thermometer: Das Fleisch ist gar, wenn der austretende Saft klar ist und es innen nicht mehr glasig rosa ist.']
},
{
  id: 'brathaehnchen', n: 'Ganzes Brathähnchen', c: 'fleisch', k: 'International', d: 2, p: 4,
  desc: 'Knusprige Haut durch trockenes Salzen und hohe Hitze.',
  ing: ['1 Hähnchen (ca. 1,4 kg)', '2 TL Salz', '1 EL weiche Butter oder Öl', '1 TL Paprikapulver', '½ TL Pfeffer', '1 Bio-Zitrone', '4 Knoblauchzehen', '3 Zweige Thymian oder Rosmarin'],
  prep: [
    ['prep', 'Hähnchen innen und außen mit Küchenpapier sehr gründlich trocken tupfen. Trockene Haut wird knusprig.'],
    ['season', 'Rundherum salzen. Optional über Nacht unbedeckt im Kühlschrank lagern, die Haut trocknet dabei weiter.'],
    ['spread', 'Butter mit Paprika und Pfeffer verrühren und die Haut damit einreiben. Zitrone halbieren und mit Knoblauch und Kräutern in die Bauchhöhle stecken. Keulen mit Küchengarn zusammenbinden.']
  ],
  m: {
    ofen: { t: 90, s: [
      ['bake', 'Backofen auf 220 °C Ober-/Unterhitze vorheizen.', { c: 220, mo: 'OU' }],
      ['bake', 'Hähnchen mit der Brust nach oben in eine Form oder auf ein Gitter über einem Blech setzen und auf mittlerer Schiene 20 Minuten braten.', { c: 220, mo: 'OU', t: 20, i: 'roast' }],
      ['bake', 'Temperatur auf 190 °C reduzieren und weitere 40 bis 50 Minuten braten. Fertig, wenn die dickste Stelle der Keule 80 °C und die Brust mindestens 72 °C hat.', { c: 190, mo: 'OU', t: 45, k: 80, i: 'roast' }],
      ['rest', '10 Minuten ruhen lassen, damit der Saft im Fleisch bleibt.', { t: 10 }],
      ['chop', 'Keulen und Flügel abtrennen, Brust vom Knochen lösen und in Scheiben schneiden.'],
      ['serve', 'Mit dem Bratensaft aus der Form servieren.']
    ] },
    airfryer: { t: 75, note: 'Passt nur in große Heißluftfritteusen (ab ca. 5,5 Liter). Das Hähnchen darf das Heizelement nicht berühren.', s: [
      ['airfry', 'Hähnchen mit der Brust nach unten in den Korb legen und bei 180 °C 30 Minuten garen.', { c: 180, t: 30 }],
      ['flip', 'Mit zwei Holzlöffeln vorsichtig auf den Rücken drehen.'],
      ['airfry', 'Weitere 20 bis 30 Minuten garen, bis die Keule 80 °C und die Brust 72 °C erreicht.', { c: 180, t: 25, k: 80 }],
      ['rest', '10 Minuten ruhen lassen, dann zerteilen.', { t: 10 }]
    ] },
    grill: { t: 90, note: 'Indirekt grillen: Brenner unter dem Hähnchen aus, seitlich an. Mit Deckel.', s: [
      ['grill', 'Grill für indirekte Hitze auf 200 °C vorheizen. Hähnchen in die indirekte Zone setzen.', { c: 200 }],
      ['grill', 'Bei geschlossenem Deckel 60 bis 75 Minuten garen, bis die Keule 80 °C hat.', { c: 200, t: 70, k: 80 }],
      ['rest', '10 Minuten ruhen lassen und zerteilen.', { t: 10 }]
    ] }
  }
},
{
  id: 'chicken-wings', n: 'Knusprige Chicken Wings', c: 'fleisch', k: 'USA', d: 1, p: 4,
  desc: 'Ohne Frittieren knusprig. Der Trick ist Backpulver auf der Haut.',
  ing: ['1 kg Hähnchenflügel (Mittelstücke und Spitzen getrennt)', '1 EL Backpulver (ohne Phosphat, nicht Natron)', '1 TL Salz', '1 TL Paprikapulver geräuchert', '½ TL Knoblauchpulver', '#Buffalo-Soße', '60 g Butter', '80 ml scharfe Chilisauce (z. B. Louisiana-Style)', '1 TL Honig'],
  prep: [
    ['prep', 'Flügel mit Küchenpapier sehr gut trocken tupfen.'],
    ['season', 'Backpulver, Salz, Paprika und Knoblauchpulver mischen und die Flügel in einer Schüssel darin wenden, bis sie dünn überzogen sind.']
  ],
  m: {
    airfryer: { t: 35, s: [
      ['airfry', 'Flügel in einer Lage in den Korb legen und bei 180 °C 12 Minuten garen.', { c: 180, t: 12 }],
      ['flip', 'Korb kräftig schütteln oder Flügel wenden.'],
      ['airfry', 'Temperatur auf 200 °C erhöhen und weitere 10 bis 12 Minuten garen, bis die Haut goldbraun und knusprig ist.', { c: 200, t: 11, k: 80 }],
      ['stir', 'Für die Soße Butter in einem kleinen Topf schmelzen, Chilisauce und Honig einrühren.', { h: 'niedrig' }],
      ['flip', 'Flügel in einer Schüssel mit der Soße schwenken.'],
      ['serve', 'Sofort mit Selleriesticks und Blauschimmelkäse-Dip servieren.']
    ] },
    ofen: { t: 60, s: [
      ['bake', 'Backofen auf 120 °C Ober-/Unterhitze vorheizen. Ein Gitter auf ein mit Alufolie ausgelegtes Blech legen.', { c: 120, mo: 'OU' }],
      ['bake', 'Flügel auf dem Gitter im unteren Drittel 30 Minuten garen. Dabei schmilzt das Fett unter der Haut.', { c: 120, mo: 'OU', t: 30, i: 'tray' }],
      ['bake', 'Gitter ins obere Drittel setzen, Ofen auf 220 °C stellen und 20 bis 25 Minuten backen, bis die Haut knusprig ist.', { c: 220, mo: 'OU', t: 22, i: 'tray' }],
      ['flip', 'In der Buffalo-Soße schwenken.'],
      ['serve', 'Sofort servieren.']
    ] }
  }
},
{
  id: 'butter-chicken', n: 'Butter Chicken (Murgh Makhani)', c: 'fleisch', k: 'Indien', d: 2, p: 4,
  desc: 'Mariniertes Hähnchen in milder Tomaten-Butter-Sahne-Soße.',
  ing: ['#Marinade', '700 g Hähnchenschenkel ohne Knochen', '150 g Naturjoghurt', '1 EL Zitronensaft', '2 TL Garam Masala', '1 TL Kurkuma', '1 TL Chilipulver (Kashmiri)', '1 TL Salz', '#Soße', '50 g Butter', '1 Zwiebel', '3 Knoblauchzehen', '20 g Ingwer', '400 g passierte Tomaten', '1 TL Garam Masala', '1 TL Kreuzkümmel', '1 TL Zucker', '150 ml Sahne', '1 TL getrocknete Bockshornkleeblätter (Kasoori Methi)', 'Koriander, Basmatireis oder Naan'],
  prep: [
    ['chop', 'Hähnchen in mundgerechte Stücke schneiden. Zwiebel würfeln, Knoblauch und Ingwer fein reiben.'],
    ['rest', 'Hähnchen mit allen Zutaten der Marinade mischen und mindestens 30 Minuten (besser über Nacht) im Kühlschrank marinieren.', { t: 30 }]
  ],
  m: {
    herd: { t: 50, s: [
      ['fry', 'Eine Pfanne sehr heiß werden lassen und das Hähnchen samt Marinade portionsweise 5 bis 6 Minuten braten, bis es an den Rändern Farbe bekommt. Herausnehmen.', { h: 'hoch', t: 6 }],
      ['fry', 'Butter im selben Topf schmelzen, Zwiebel 6 Minuten weich braten. Knoblauch und Ingwer 1 Minute mitbraten.', { h: 'mittel', t: 7 }],
      ['season', 'Garam Masala und Kreuzkümmel 30 Sekunden mitrösten.', { sec: 30 }],
      ['simmer', 'Tomaten und Zucker zugeben und 10 Minuten köcheln.', { h: 'niedrig', t: 10 }],
      ['blend', 'Soße fein pürieren. So wird sie samtig.'],
      ['simmer', 'Sahne, Hähnchen und zwischen den Händen zerriebenen Bockshornklee zugeben und 8 Minuten köcheln, bis das Fleisch durchgegart ist.', { h: 'niedrig', t: 8 }],
      ['serve', 'Mit einem Stück kalter Butter und Koriander servieren, dazu Reis oder Naan.']
    ] },
    tm: { t: 50, s: [
      ['fry', 'Mariniertes Hähnchen in einer Pfanne scharf anbraten, beiseitestellen. (Im Mixtopf bekommt es keine Röstaromen.)', { h: 'hoch', t: 6 }],
      ['tm', 'Zwiebel, Knoblauch und Ingwer 5 Sek./Stufe 5 zerkleinern. Butter zugeben, 5 Min./120 °C/Stufe 1.', { t: 5, c: 120, s: 1 }],
      ['tm', 'Gewürze, Tomaten und Zucker zugeben, 10 Min./100 °C/Stufe 1, dann 30 Sek./Stufe 6 bis 8 pürieren.', { t: 10, c: 100, s: 1 }],
      ['tm', 'Sahne, Hähnchen und Bockshornklee zugeben, 10 Min./95 °C/Linkslauf/Sanftrührstufe.', { t: 10, c: 95, l: true, s: 'sanft' }],
      ['serve', 'Abschmecken und mit Koriander servieren.']
    ] },
    slow: { t: 280, s: [
      ['fry', 'Optional Hähnchen in der Pfanne anbraten für mehr Röstaroma.', { h: 'hoch', t: 6 }],
      ['slow', 'Zwiebel, Knoblauch, Ingwer, Gewürze, Tomaten, Zucker, Butter und Hähnchen in den Slow Cooker geben. LOW 4 Stunden.', { lvl: 'LOW', t: 240 }],
      ['stir', 'Sahne und Bockshornklee einrühren und noch 15 Minuten auf HIGH garen.', { lvl: 'HIGH', t: 15 }],
      ['serve', 'Abschmecken und servieren.']
    ] }
  }
},
{
  id: 'chili-con-carne', n: 'Chili con Carne', c: 'fleisch', k: 'Mexiko & USA', d: 1, p: 6,
  desc: 'Mit Hack, Bohnen, Kakao und geräuchertem Paprika. Lässt sich gut vorkochen.',
  ing: ['600 g Rinderhack', '2 Zwiebeln', '3 Knoblauchzehen', '1 rote Paprika', '2 EL Öl', '2 EL Tomatenmark', '2 TL Kreuzkümmel', '2 TL Paprikapulver geräuchert', '1 bis 2 TL Chiliflocken oder Chipotle', '1 TL Oregano', '1 TL Kakaopulver', '800 g gehackte Tomaten', '300 ml Rinderbrühe', '1 Dose Kidneybohnen (250 g abgetropft)', '1 kleine Dose Mais (140 g)', 'Salz, Pfeffer', 'Saure Sahne, Frühlingszwiebeln, Koriander'],
  prep: [['chop', 'Zwiebeln und Paprika würfeln, Knoblauch hacken. Bohnen und Mais abspülen.']],
  m: {
    herd: { t: 75, s: [
      ['fry', 'Öl in einem großen Topf stark erhitzen und das Hack in zwei Portionen krümelig und richtig braun braten. Herausnehmen.', { h: 'hoch', t: 8 }],
      ['fry', 'Zwiebeln und Paprika im Bratfett 5 Minuten weich braten, Knoblauch 1 Minute mitbraten.', { h: 'mittel', t: 6 }],
      ['season', 'Tomatenmark und alle Gewürze inklusive Kakao 1 Minute anrösten.', { t: 1 }],
      ['pour', 'Hack, Tomaten und Brühe zugeben, aufkochen.', { h: 'hoch' }],
      ['simmer', 'Halb zugedeckt 45 Minuten köcheln.', { h: 'niedrig', t: 45 }],
      ['simmer', 'Bohnen und Mais zugeben, 10 Minuten weiterköcheln.', { h: 'niedrig', t: 10 }],
      ['season', 'Mit Salz und Pfeffer abschmecken.'],
      ['serve', 'Mit saurer Sahne, Frühlingszwiebeln und Koriander servieren, dazu Reis, Tortillachips oder Brot.']
    ] },
    tm: { t: 50, s: [
      ['tm', 'Zwiebeln, Knoblauch und Paprika in Stücken 5 Sek./Stufe 5 zerkleinern. Öl zugeben, 5 Min./120 °C/Stufe 1.', { t: 5, c: 120, s: 1 }],
      ['tm', 'Hack zugeben, 8 Min./120 °C/Linkslauf/Stufe 1 ohne Messbecher.', { t: 8, c: 120, l: true, s: 1 }],
      ['tm', 'Tomatenmark, Gewürze, Tomaten und Brühe zugeben, 25 Min./100 °C/Linkslauf/Stufe 1. Garkörbchen als Spritzschutz auf den Deckel.', { t: 25, c: 100, l: true, s: 1 }],
      ['tm', 'Bohnen und Mais zugeben, 5 Min./100 °C/Linkslauf/Sanftrührstufe.', { t: 5, c: 100, l: true, s: 'sanft' }],
      ['serve', 'Abschmecken und servieren.']
    ] },
    slow: { t: 500, s: [
      ['fry', 'Hack in der Pfanne scharf anbraten, Zwiebeln, Paprika und Gewürze kurz mitrösten.', { h: 'hoch', t: 12 }],
      ['slow', 'Alles außer Bohnen und Mais mit nur 100 ml Brühe in den Slow Cooker geben. LOW 8 Stunden.', { lvl: 'LOW', t: 480 }],
      ['stir', 'Bohnen und Mais in den letzten 30 Minuten zugeben.'],
      ['serve', 'Abschmecken und servieren.']
    ] },
    dkt: { t: 45, s: [
      ['fry', 'Hack im offenen Topf scharf anbraten, Gemüse und Gewürze mitrösten.', { h: 'hoch', t: 14 }],
      ['pour', 'Tomaten, 150 ml Brühe und Bohnen zugeben, Boden freikratzen. Tomaten obenauf lassen, nicht unterrühren (verhindert Anbrennen).'],
      ['pressure', '15 Minuten auf Hochdruck garen.', { t: 15, p: 'Hochdruck' }],
      ['rest', '10 Minuten natürlich abbauen lassen, dann Mais unterrühren.', { t: 10 }],
      ['serve', 'Abschmecken und servieren.']
    ] }
  }
},
{
  id: 'schweinebraten', n: 'Schweinebraten mit Kruste', c: 'fleisch', k: 'Deutschland (Bayern)', d: 2, p: 6,
  desc: 'Schulter mit Schwarte, die im Ofen zur knusprigen Kruste aufpoppt. Mit Dunkelbiersoße.',
  ing: ['1,5 kg Schweineschulter mit Schwarte', '2 TL Salz', '1 TL Kümmel', '1 TL Pfeffer', '2 Zwiebeln', '2 Möhren', '¼ Knollensellerie', '500 ml dunkles Bier', '300 ml Fleischbrühe', '1 EL Speisestärke'],
  prep: [
    ['chop', 'Schwarte mit einem sehr scharfen Messer (Teppichmesser) rautenförmig im Abstand von 1 cm einschneiden, bis ins Fett, aber nicht ins Fleisch.'],
    ['season', 'Fleisch rundherum mit Salz, Kümmel und Pfeffer einreiben, in die Schwarte nur Salz reiben.'],
    ['chop', 'Zwiebeln, Möhren und Sellerie grob würfeln.']
  ],
  m: {
    ofen: { t: 200, s: [
      ['bake', 'Backofen auf 160 °C Ober-/Unterhitze vorheizen.', { c: 160, mo: 'OU' }],
      ['pour', 'Fleisch mit der Schwarte nach unten in einen Bräter legen, 2 cm hoch heißes Wasser angießen.'],
      ['bake', '30 Minuten im Ofen garen. Dabei weicht die Schwarte auf.', { c: 160, mo: 'OU', t: 30, i: 'roast' }],
      ['flip', 'Braten wenden (Schwarte nach oben), Gemüse um den Braten verteilen, Bier und Brühe angießen.'],
      ['bake', '2 Stunden braten, dabei alle 30 Minuten mit Bratensaft übergießen, aber die Schwarte selbst nicht. Kerntemperatur am Ende: 80 °C.', { c: 160, mo: 'OU', t: 120, k: 80, i: 'roast' }],
      ['bake', 'Für die Kruste auf Grill oder 230 °C Umluft schalten und 15 bis 20 Minuten weiterbacken, bis die Schwarte aufpoppt. Dabeibleiben, sie verbrennt schnell.', { c: 230, mo: 'UG', t: 18, i: 'roast' }],
      ['rest', 'Braten herausnehmen und 10 Minuten ruhen lassen.', { t: 10 }],
      ['stir', 'Bratensaft mit Gemüse durch ein Sieb in einen Topf gießen, aufkochen und mit angerührter Stärke binden.', { h: 'mittel', t: 3 }],
      ['serve', 'Mit einem Sägemesser aufschneiden. Dazu Knödel und Krautsalat.']
    ] }
  }
},
{
  id: 'burger', n: 'Smash Burger', c: 'fleisch', k: 'USA', d: 1, p: 4,
  desc: 'Hackbällchen werden auf der heißen Platte flachgedrückt und bekommen eine dunkle Kruste.',
  ing: ['600 g Rinderhack (20 % Fett)', 'Salz, Pfeffer', '4 Scheiben Cheddar oder Schmelzkäse', '4 Burgerbrötchen (Brioche)', '1 EL Butter', '1 rote Zwiebel', '2 Gewürzgurken', 'Salat, Tomate', '#Soße', '3 EL Mayonnaise', '1 EL Ketchup', '1 TL Senf', '1 EL Gurkenwasser'],
  prep: [
    ['stir', 'Zutaten für die Soße verrühren.'],
    ['chop', 'Zwiebel in feine Ringe, Gurken in Scheiben, Tomate in Scheiben schneiden.'],
    ['shape', 'Hack in 8 Bällchen zu je 75 g formen, nicht kneten. Kalt stellen, bis die Pfanne heiß ist.']
  ],
  m: {
    herd: { t: 25, note: 'Eine schwere Gusseisen- oder Edelstahlpfanne verwenden, keine beschichtete: Sie muss sehr heiß werden.', s: [
      ['fry', 'Brötchen aufschneiden, die Schnittflächen mit Butter bestreichen und in der Pfanne 1 Minute goldbraun rösten.', { h: 'mittel', t: 1 }],
      ['fry', 'Pfanne auf höchster Stufe 3 Minuten erhitzen. Zwei Bällchen hineinlegen.', { h: 'max' }],
      ['mash', 'Sofort mit einem stabilen Pfannenwender kräftig flach drücken (ca. 1 cm dick), 10 Sekunden lang Druck halten. Salzen und pfeffern.'],
      ['fry', '2 Minuten braten, bis der Rand dunkelbraun ist.', { h: 'max', t: 2 }],
      ['flip', 'Mit dem Wender unter die Kruste schaben und wenden, Käse auflegen, 1 Minute braten.', { h: 'max', t: 1 }],
      ['layer', 'Zwei Patties aufeinanderstapeln. Brötchen mit Soße, Salat, Tomate, Patties, Zwiebel und Gurke belegen.'],
      ['serve', 'Sofort servieren.']
    ] },
    grill: { t: 25, note: 'Auf dem Rost lässt sich nicht smashen. Hier klassische, 2 cm dicke Patties formen (je 150 g, Daumenmulde in die Mitte drücken).', s: [
      ['grill', 'Grill auf hohe direkte Hitze (250 °C) vorheizen. Rost reinigen und einölen.', { c: 250 }],
      ['grill', 'Patties salzen und 3 bis 4 Minuten grillen, ohne sie zu bewegen.', { t: 4 }],
      ['flip', 'Wenden, Käse auflegen, Deckel schließen und 3 bis 4 Minuten weitergrillen (medium, ca. 60 °C Kern).', { t: 3, k: 60 }],
      ['grill', 'Brötchen mit der Schnittfläche 30 Sekunden rösten.', { sec: 30 }],
      ['layer', 'Burger zusammensetzen und servieren.']
    ] }
  }
},
{
  id: 'pulled-pork', n: 'Pulled Pork', c: 'fleisch', k: 'USA', d: 2, p: 8,
  desc: 'Schweineschulter mit Gewürzkruste, so lange gegart, bis sie mit zwei Gabeln zerfällt.',
  ing: ['2 kg Schweinenacken oder -schulter ohne Knochen', '#Rub', '2 EL brauner Zucker', '1 EL Paprikapulver geräuchert', '1 EL Salz', '1 TL Pfeffer', '1 TL Knoblauchpulver', '1 TL Zwiebelpulver', '1 TL Senfpulver', '½ TL Cayennepfeffer', '#Außerdem', '200 ml Apfelsaft', '2 EL Apfelessig', '250 ml BBQ-Soße', 'Burgerbrötchen und Coleslaw'],
  prep: [['season', 'Rub-Zutaten mischen und das Fleisch rundherum kräftig einreiben. Wenn möglich über Nacht abgedeckt im Kühlschrank ziehen lassen.']],
  m: {
    ofen: { t: 420, s: [
      ['bake', 'Backofen auf 140 °C Ober-/Unterhitze vorheizen.', { c: 140, mo: 'OU' }],
      ['pour', 'Fleisch in einen Bräter legen, Apfelsaft und Essig angießen. Deckel auflegen oder dicht mit Alufolie verschließen.'],
      ['bake', 'Im unteren Drittel 6 bis 7 Stunden garen, bis die Kerntemperatur 92 bis 95 °C erreicht. Erst dann löst sich das Bindegewebe.', { c: 140, mo: 'OU', t: 390, k: 93, i: 'roast' }],
      ['rest', 'Fleisch 20 Minuten abgedeckt ruhen lassen.', { t: 20 }],
      ['shape', 'Mit zwei Gabeln in Fasern zerrupfen, Fett entfernen. Mit etwas Bratensaft und BBQ-Soße mischen.'],
      ['serve', 'In Brötchen mit Coleslaw servieren.']
    ] },
    slow: { t: 610, s: [
      ['slow', 'Fleisch mit Apfelsaft und Essig in den Slow Cooker geben. LOW 10 Stunden oder HIGH 6 Stunden.', { lvl: 'LOW', t: 600 }],
      ['shape', 'Herausnehmen, zerrupfen und mit BBQ-Soße und etwas Garflüssigkeit mischen.'],
      ['serve', 'Mit Brötchen und Coleslaw servieren.']
    ] },
    dkt: { t: 120, s: [
      ['chop', 'Fleisch in 4 große Stücke schneiden, damit es schneller gart.'],
      ['fry', 'Im offenen Topf rundherum anbraten.', { h: 'hoch', t: 8 }],
      ['pour', 'Apfelsaft und Essig angießen, Boden freikratzen.'],
      ['pressure', '75 Minuten auf Hochdruck garen.', { t: 75, p: 'Hochdruck' }],
      ['rest', 'Druck natürlich abbauen lassen (ca. 20 Minuten).', { t: 20 }],
      ['shape', 'Zerrupfen und mit BBQ-Soße mischen.']
    ] }
  }
},
{
  id: 'koettbullar', n: 'Köttbullar mit Rahmsoße', c: 'fleisch', k: 'Schweden', d: 2, p: 4,
  desc: 'Kleine Fleischbällchen mit Piment, dazu Rahmsoße, Kartoffelpüree und Preiselbeeren.',
  ing: ['500 g gemischtes Hack', '1 kleine Zwiebel', '40 g Semmelbrösel', '100 ml Milch', '1 Ei', '1 TL Salz', '½ TL Pfeffer', '½ TL Piment, gemahlen', '2 EL Butter', '#Soße', '1 EL Mehl', '300 ml Rinderbrühe', '150 ml Sahne', '1 TL Sojasauce', '1 TL Johannisbeergelee oder Preiselbeeren', 'Preiselbeeren und Kartoffelpüree zum Servieren'],
  prep: [
    ['chop', 'Zwiebel sehr fein reiben oder hacken.'],
    ['rest', 'Semmelbrösel in der Milch 5 Minuten quellen lassen.', { t: 5 }],
    ['knead', 'Hack, Zwiebel, eingeweichte Brösel, Ei und Gewürze mit den Händen gut verkneten.'],
    ['shape', 'Mit feuchten Händen walnussgroße Bällchen formen (ca. 30 Stück).']
  ],
  m: {
    herd: { t: 45, s: [
      ['fry', 'Butter in einer großen Pfanne erhitzen und die Bällchen in zwei Portionen bei mittlerer Hitze 8 bis 10 Minuten rundherum braun braten. Pfanne dabei immer wieder schwenken.', { h: 'mittel', t: 9 }],
      ['stir', 'Bällchen herausnehmen. Mehl im Bratfett 1 Minute anschwitzen.', { t: 1 }],
      ['whisk', 'Brühe einrühren, dann Sahne, Sojasauce und Gelee. 3 Minuten köcheln, bis die Soße sämig ist.', { h: 'mittel', t: 3 }],
      ['simmer', 'Bällchen zurück in die Soße geben und 2 Minuten ziehen lassen.', { h: 'niedrig', t: 2 }],
      ['serve', 'Mit Kartoffelpüree und Preiselbeeren servieren.']
    ] },
    ofen: { t: 45, s: [
      ['bake', 'Backofen auf 200 °C Umluft vorheizen. Bällchen auf ein Blech mit Backpapier legen.', { c: 200, mo: 'U' }],
      ['bake', '15 bis 18 Minuten backen, bis sie gebräunt und durchgegart sind.', { c: 200, mo: 'U', t: 16, i: 'tray' }],
      ['whisk', 'Soße im Topf zubereiten: Butter und Mehl anschwitzen, Brühe, Sahne, Sojasauce und Gelee einrühren und 3 Minuten köcheln.', { h: 'mittel', t: 4 }],
      ['serve', 'Bällchen in der Soße wenden und servieren.']
    ] },
    airfryer: { t: 40, s: [
      ['airfry', 'Bällchen in einer Lage in den Korb legen und bei 190 °C 10 bis 12 Minuten garen, nach der Hälfte schütteln.', { c: 190, t: 11 }],
      ['whisk', 'Soße im Topf zubereiten.', { h: 'mittel', t: 4 }],
      ['serve', 'Bällchen in der Soße wenden und servieren.']
    ] }
  }
},
{
  id: 'frikadellen', n: 'Frikadellen', c: 'fleisch', k: 'Deutschland', d: 1, p: 4,
  desc: 'Auch Buletten oder Fleischpflanzerl. Mit eingeweichtem Brötchen bleiben sie saftig.',
  ing: ['500 g gemischtes Hack', '1 altbackenes Brötchen', '1 Zwiebel', '1 Ei', '1 TL mittelscharfer Senf', '1 TL Salz', '½ TL Pfeffer', '1 TL Paprikapulver', '1 TL getrockneter Majoran', '2 EL Petersilie, gehackt', '3 EL Öl oder Butterschmalz'],
  prep: [
    ['rest', 'Brötchen 10 Minuten in kaltem Wasser einweichen, dann gut ausdrücken.', { t: 10 }],
    ['chop', 'Zwiebel fein würfeln.'],
    ['knead', 'Hack, Brötchen, Zwiebel, Ei, Senf, Gewürze und Petersilie gründlich verkneten.'],
    ['shape', 'Mit nassen Händen 8 flache Frikadellen (ca. 2 cm dick) formen.']
  ],
  m: {
    herd: { t: 35, s: [
      ['fry', 'Öl in einer Pfanne bei mittlerer Hitze erhitzen, Frikadellen einlegen und 5 Minuten braten.', { h: 'mittel', t: 5 }],
      ['flip', 'Wenden und weitere 5 bis 6 Minuten braten, bis sie innen nicht mehr rosa sind (Kerntemperatur 70 °C).', { h: 'mittel', t: 5, k: 70 }],
      ['serve', 'Warm oder kalt servieren, mit Senf, Kartoffelsalat oder im Brötchen.']
    ] },
    airfryer: { t: 30, s: [
      ['spread', 'Frikadellen dünn mit Öl bepinseln.'],
      ['airfry', 'In einer Lage bei 190 °C 8 Minuten garen.', { c: 190, t: 8 }],
      ['flip', 'Wenden.'],
      ['airfry', 'Weitere 5 bis 6 Minuten garen.', { c: 190, t: 5, k: 70 }],
      ['serve', 'Servieren.']
    ] },
    ofen: { t: 40, s: [
      ['bake', 'Backofen auf 200 °C Umluft vorheizen. Frikadellen auf ein Blech mit Backpapier legen, mit Öl bepinseln.', { c: 200, mo: 'U' }],
      ['bake', '20 bis 25 Minuten backen, nach 12 Minuten wenden.', { c: 200, mo: 'U', t: 22, k: 70, i: 'tray' }],
      ['serve', 'Servieren.']
    ] }
  }
},
{
  id: 'boeuf-bourguignon', n: 'Boeuf Bourguignon', c: 'fleisch', k: 'Frankreich', d: 3, p: 6,
  desc: 'Rind in Burgunder geschmort, mit Speck, Perlzwiebeln und Champignons.',
  ing: ['1,5 kg Rinderschulter oder -wade', '150 g durchwachsener Speck', '2 EL Öl', '2 Möhren', '1 Zwiebel', '3 Knoblauchzehen', '2 EL Mehl', '2 EL Tomatenmark', '750 ml kräftiger Rotwein (Burgunder oder Pinot Noir)', '400 ml Rinderfond', '1 Bouquet garni (Thymian, Lorbeer, Petersilie)', '250 g Perlzwiebeln oder Schalotten', '300 g Champignons', '30 g Butter', 'Salz, Pfeffer', 'Petersilie'],
  prep: [['chop', 'Fleisch in 5 cm große Würfel schneiden und trocken tupfen. Speck in Streifen, Möhren in Scheiben, Zwiebel würfeln, Knoblauch hacken. Perlzwiebeln schälen, Champignons vierteln.']],
  m: {
    ofen: { t: 210, s: [
      ['bake', 'Backofen auf 160 °C Ober-/Unterhitze vorheizen.', { c: 160, mo: 'OU' }],
      ['fry', 'Speck in einem ofenfesten Bräter knusprig auslassen, herausnehmen.', { h: 'mittel', t: 5 }],
      ['fry', 'Fleisch salzen und in kleinen Portionen im Speckfett mit etwas Öl rundherum dunkelbraun anbraten. Nicht zu viel auf einmal, sonst kocht es statt zu braten.', { h: 'hoch', t: 15 }],
      ['fry', 'Möhren und Zwiebel im Bräter 5 Minuten rösten, Knoblauch und Tomatenmark 1 Minute mitrösten.', { h: 'mittel', t: 6 }],
      ['stir', 'Fleisch und Speck zurückgeben, mit Mehl bestäuben und 2 Minuten umrühren.', { t: 2 }],
      ['pour', 'Wein und Fond angießen, Bouquet garni zugeben und aufkochen.', { h: 'hoch' }],
      ['bake', 'Mit Deckel im Ofen 2 Stunden 30 Minuten schmoren, bis das Fleisch sehr zart ist.', { c: 160, mo: 'OU', t: 150, i: 'dish' }],
      ['fry', 'In den letzten 20 Minuten Perlzwiebeln und Champignons in Butter in einer Pfanne goldbraun braten.', { h: 'mittel', t: 12 }],
      ['stir', 'Pilze und Zwiebeln unter das Fleisch heben, Bouquet garni entfernen, abschmecken.'],
      ['serve', 'Mit Petersilie bestreuen. Dazu Kartoffelpüree, Baguette oder Bandnudeln.']
    ] },
    slow: { t: 520, s: [
      ['fry', 'Speck auslassen, Fleisch portionsweise anbraten, Gemüse und Tomatenmark rösten, mit Mehl bestäuben.', { h: 'hoch', t: 25 }],
      ['pour', 'Mit Wein ablöschen und auf die Hälfte einkochen.', { h: 'hoch', t: 8 }],
      ['slow', 'Alles mit 200 ml Fond und Bouquet garni in den Slow Cooker geben. LOW 8 Stunden.', { lvl: 'LOW', t: 480 }],
      ['fry', 'Perlzwiebeln und Pilze in Butter braten und unterheben.', { h: 'mittel', t: 12 }]
    ] },
    dkt: { t: 95, s: [
      ['fry', 'Speck auslassen, Fleisch portionsweise anbraten, Gemüse und Tomatenmark rösten, mit Mehl bestäuben.', { h: 'hoch', t: 25 }],
      ['pour', 'Wein und 200 ml Fond zugeben, Boden freikratzen.'],
      ['pressure', '35 Minuten auf Hochdruck garen.', { t: 35, p: 'Hochdruck' }],
      ['rest', 'Druck natürlich abbauen lassen.', { t: 15 }],
      ['fry', 'Perlzwiebeln und Pilze in Butter braten und unterheben. Soße bei Bedarf offen einkochen.', { h: 'mittel', t: 12 }]
    ] }
  }
},
{
  id: 'steak', n: 'Rindersteak auf den Punkt', c: 'fleisch', k: 'International', d: 2, p: 2,
  desc: 'Garstufen nach Kerntemperatur, von blutig bis durch.',
  ing: ['2 Rumpsteaks oder Entrecôtes (ca. 3 cm dick, à 300 g)', '1 EL hoch erhitzbares Öl', 'Grobes Salz', 'Pfeffer', '30 g Butter', '2 Knoblauchzehen', '2 Zweige Thymian oder Rosmarin'],
  prep: [
    ['rest', 'Steaks 30 Minuten vor dem Braten aus dem Kühlschrank nehmen.', { t: 30 }],
    ['season', 'Trocken tupfen und rundherum kräftig salzen. Fettrand bei Rumpsteak im Abstand von 2 cm einschneiden, damit er sich nicht wölbt.']
  ],
  m: {
    herd: { t: 20, note: 'Zieltemperaturen nach dem Ruhen: blutig 50 °C, medium rare 54 °C, medium 57 °C, durch 65 °C. Etwa 3 °C vorher aus der Pfanne nehmen.', s: [
      ['fry', 'Eine Gusseisen- oder Edelstahlpfanne auf höchster Stufe erhitzen, bis sie leicht raucht. Öl zugeben, Steaks einlegen.', { h: 'max' }],
      ['flip', 'Jede Minute wenden, insgesamt 4 bis 6 Minuten, bis eine dunkle Kruste entsteht. Fettrand kurz senkrecht anbraten.', { h: 'hoch', t: 5 }],
      ['fry', 'Hitze reduzieren. Butter, angedrückten Knoblauch und Kräuter zugeben. Pfanne schräg halten und das Fleisch 1 Minute lang mit der schäumenden Butter übergießen.', { h: 'mittel', t: 1, k: 51 }],
      ['rest', 'Auf einem Brett 5 Minuten ruhen lassen.', { t: 5 }],
      ['serve', 'Quer zur Faser in Scheiben schneiden, pfeffern und mit Flockensalz bestreuen.']
    ] },
    grill: { t: 25, s: [
      ['grill', 'Grill auf maximale direkte Hitze (mindestens 280 °C) vorheizen. Rost reinigen.', { c: 280 }],
      ['grill', 'Steaks 90 Sekunden grillen, dann um 90 Grad drehen (für das Rautenmuster) und weitere 90 Sekunden grillen.', { sec: 180 }],
      ['flip', 'Wenden und genauso grillen.', { sec: 180 }],
      ['grill', 'In die indirekte Zone legen und mit geschlossenem Deckel bis zur gewünschten Kerntemperatur ziehen lassen (medium rare: 51 °C).', { t: 5, k: 51 }],
      ['rest', '5 Minuten ruhen lassen und aufschneiden.', { t: 5 }]
    ] },
    ofen: { t: 60, note: 'Rückwärtsgaren (Reverse Sear): erst sanft im Ofen, dann kurz scharf anbraten. Gleichmäßig rosa vom Rand bis zur Mitte.', s: [
      ['bake', 'Backofen auf 100 °C Ober-/Unterhitze vorheizen. Steaks auf ein Gitter über einem Blech legen.', { c: 100, mo: 'OU' }],
      ['bake', 'Garen, bis die Kerntemperatur 8 °C unter der Zieltemperatur liegt (für medium rare 46 °C). Das dauert 35 bis 50 Minuten.', { c: 100, mo: 'OU', t: 40, k: 46, i: 'roast' }],
      ['fry', 'Pfanne auf höchster Stufe stark erhitzen, Öl zugeben und die Steaks je 1 Minute pro Seite scharf anbraten, Butter und Kräuter zugeben.', { h: 'max', t: 2 }],
      ['serve', 'Ohne weitere Ruhezeit aufschneiden und servieren.']
    ] },
    airfryer: { t: 20, s: [
      ['airfry', 'Heißluftfritteuse auf 200 °C vorheizen. Steaks mit Öl einreiben und einlegen.', { c: 200 }],
      ['airfry', '5 Minuten garen.', { c: 200, t: 5 }],
      ['flip', 'Wenden.'],
      ['airfry', 'Je nach Dicke weitere 3 bis 6 Minuten garen, bis die gewünschte Kerntemperatur erreicht ist.', { c: 200, t: 4, k: 51 }],
      ['rest', '5 Minuten ruhen lassen. Für mehr Kruste danach 30 Sekunden pro Seite in einer sehr heißen Pfanne anbraten.', { t: 5 }]
    ] }
  }
},
{
  id: 'teriyaki-chicken', n: 'Teriyaki-Hähnchen', c: 'fleisch', k: 'Japan', d: 1, p: 4,
  desc: 'Glänzend glasierte Hähnchenschenkel mit selbstgemachter Teriyaki-Soße.',
  ing: ['700 g Hähnchenschenkel ohne Knochen, mit Haut', '1 EL Öl', '#Teriyaki-Soße', '4 EL Sojasauce', '3 EL Mirin', '2 EL Sake oder Wasser', '1 EL Zucker oder Honig', '1 TL frischer Ingwer, gerieben', '1 TL Speisestärke', '#Servieren', 'Sesam, Frühlingszwiebeln, Reis'],
  prep: [['stir', 'Sojasauce, Mirin, Sake, Zucker, Ingwer und Stärke glatt verrühren.']],
  m: {
    herd: { t: 25, s: [
      ['fry', 'Öl in einer Pfanne erhitzen. Schenkel mit der Hautseite nach unten einlegen und bei mittlerer Hitze 7 bis 8 Minuten braten, bis die Haut goldbraun und knusprig ist.', { h: 'mittel', t: 8 }],
      ['flip', 'Wenden und 5 Minuten braten. Austretendes Fett mit Küchenpapier abtupfen.', { h: 'mittel', t: 5, k: 75 }],
      ['simmer', 'Soße zugeben und unter ständigem Wenden des Fleischs 2 Minuten einkochen, bis sie sirupartig glänzt.', { h: 'mittel', t: 2 }],
      ['chop', 'Fleisch in Streifen schneiden.'],
      ['serve', 'Auf Reis anrichten, mit restlicher Soße beträufeln, mit Sesam und Frühlingszwiebeln bestreuen.']
    ] },
    airfryer: { t: 30, s: [
      ['airfry', 'Schenkel mit der Hautseite nach oben in den Korb legen und bei 200 °C 18 bis 20 Minuten garen.', { c: 200, t: 19, k: 75 }],
      ['simmer', 'Währenddessen die Soße in einem kleinen Topf aufkochen und 1 bis 2 Minuten eindicken lassen.', { h: 'mittel', t: 2 }],
      ['spread', 'Fleisch mit der Soße bestreichen.'],
      ['airfry', 'Noch 2 Minuten bei 200 °C karamellisieren lassen.', { c: 200, t: 2 }],
      ['serve', 'Aufschneiden und mit Reis servieren.']
    ] }
  }
},
{
  id: 'gyros', n: 'Gyros mit Tzatziki', c: 'fleisch', k: 'Griechenland', d: 1, p: 4,
  desc: 'Mariniertes Schweinefleisch in Streifen, knusprig gebraten. Ohne Drehspieß.',
  ing: ['800 g Schweinenacken', '1 Zwiebel', '3 EL Olivenöl', '2 Knoblauchzehen', '2 TL Oregano', '1 TL Thymian', '2 TL Paprikapulver', '1 TL Kreuzkümmel', '½ TL Zimt', '1 TL Salz', '½ TL Pfeffer', 'Saft von ½ Zitrone', 'Pita, Tomaten, rote Zwiebel, Tzatziki'],
  prep: [
    ['chop', 'Fleisch in sehr dünne Streifen schneiden (halb angefroren geht es leichter). Zwiebel in feine Ringe schneiden, Knoblauch pressen.'],
    ['rest', 'Fleisch mit Zwiebel, Olivenöl, Knoblauch, Gewürzen und Zitronensaft mischen und mindestens 2 Stunden, besser über Nacht, marinieren.', { t: 120 }]
  ],
  m: {
    herd: { t: 20, s: [
      ['fry', 'Eine große Pfanne ohne zusätzliches Fett auf hoher Stufe erhitzen. Fleisch in zwei Portionen einlegen und 3 Minuten nicht bewegen, damit es Kruste bekommt.', { h: 'hoch', t: 3 }],
      ['flip', 'Wenden und weitere 3 bis 4 Minuten braten, bis die Ränder knusprig sind.', { h: 'hoch', t: 4 }],
      ['serve', 'In warmer Pita mit Tomaten, Zwiebeln und Tzatziki servieren.']
    ] },
    airfryer: { t: 25, s: [
      ['airfry', 'Fleisch locker in den Korb geben und bei 200 °C 12 bis 15 Minuten garen.', { c: 200, t: 14 }],
      ['flip', 'Alle 4 Minuten schütteln, damit es gleichmäßig knusprig wird.'],
      ['serve', 'In Pita mit Tzatziki servieren.']
    ] },
    ofen: { t: 35, s: [
      ['bake', 'Backofen auf 230 °C Umluft-Grill (oder 250 °C Umluft) vorheizen.', { c: 230, mo: 'UG' }],
      ['spread', 'Fleisch locker auf einem Blech mit Backpapier verteilen.'],
      ['bake', '15 bis 20 Minuten im oberen Drittel garen, nach 10 Minuten wenden.', { c: 230, mo: 'UG', t: 18, i: 'tray' }],
      ['serve', 'Mit Pita und Tzatziki servieren.']
    ] }
  }
},
{
  id: 'moussaka', n: 'Moussaka', c: 'fleisch', k: 'Griechenland', d: 3, p: 6,
  desc: 'Auberginen, Kartoffeln, Lammhack mit Zimt und eine dicke Béchamelhaube.',
  ing: ['3 Auberginen', '500 g festkochende Kartoffeln', 'Olivenöl', 'Salz', '#Fleischsoße', '600 g Lamm- oder Rinderhack', '1 Zwiebel', '2 Knoblauchzehen', '2 EL Tomatenmark', '400 g gehackte Tomaten', '100 ml Rotwein', '1 Zimtstange', '1 TL Oregano', '½ TL Piment', '#Béchamel', '70 g Butter', '70 g Mehl', '700 ml Milch', '2 Eigelb', '80 g Kefalotyri oder Parmesan, gerieben', 'Muskat'],
  prep: [['chop', 'Auberginen längs in 1 cm dicke Scheiben schneiden, salzen und 20 Minuten Wasser ziehen lassen. Kartoffeln schälen und in 5 mm Scheiben schneiden. Zwiebel und Knoblauch fein würfeln.']],
  m: {
    ofen: { t: 150, s: [
      ['bake', 'Backofen auf 220 °C Umluft vorheizen. Auberginen trocken tupfen, mit den Kartoffelscheiben auf zwei Bleche legen, mit Olivenöl bepinseln.', { c: 220, mo: 'U' }],
      ['bake', '20 Minuten backen, bis die Auberginen weich und leicht gebräunt sind.', { c: 220, mo: 'U', t: 20, i: 'tray' }],
      ['fry', 'Hack in Olivenöl krümelig braun braten. Zwiebel und Knoblauch 3 Minuten mitbraten, Tomatenmark kurz anrösten.', { h: 'hoch', t: 10 }],
      ['simmer', 'Mit Wein ablöschen, Tomaten und Gewürze zugeben und 25 Minuten dick einkochen. Zimtstange entfernen.', { h: 'niedrig', t: 25 }],
      ['whisk', 'Für die Béchamel Butter und Mehl anschwitzen, Milch einrühren, 5 Minuten dick köcheln. Vom Herd nehmen, Eigelbe und die Hälfte des Käses einrühren, mit Muskat würzen.', { h: 'mittel', t: 6 }],
      ['layer', 'In eine große Auflaufform schichten: Kartoffeln, die Hälfte der Auberginen, Fleischsoße, restliche Auberginen. Béchamel darauf verstreichen, mit restlichem Käse bestreuen.'],
      ['bake', 'Bei 180 °C Ober-/Unterhitze 45 Minuten backen, bis die Oberfläche tief goldbraun ist.', { c: 180, mo: 'OU', t: 45, i: 'dish' }],
      ['rest', 'Mindestens 30 Minuten ruhen lassen. Warm, nicht heiß, schneidet sie sich sauber.', { t: 30 }]
    ] }
  }
},
{
  id: 'paella', n: 'Paella Valenciana', c: 'fleisch', k: 'Spanien', d: 3, p: 4,
  desc: 'Mit Hähnchen, grünen Bohnen und Safran. Der angeröstete Boden (Socarrat) ist der beste Teil.',
  ing: ['600 g Hähnchenschenkel, in Stücke gehackt', '4 EL Olivenöl', '200 g breite grüne Bohnen', '100 g weiße Bohnen (Garrofó oder Butterbohnen)', '1 reife Tomate, gerieben', '1 TL Paprikapulver edelsüß', '1 Msp. Safranfäden (ca. 0,2 g)', '1,2 l heiße Hühnerbrühe', '320 g Paella-Reis (Bomba oder Calasparra)', '1 Zweig Rosmarin', 'Salz', 'Zitronenspalten'],
  prep: [['chop', 'Grüne Bohnen in 4 cm Stücke schneiden. Tomate halbieren und an der Reibe reiben, die Haut wegwerfen. Safran in 2 EL warmer Brühe einweichen.']],
  m: {
    herd: { t: 70, note: 'Eine Paellapfanne mit 36 bis 40 cm Durchmesser ist ideal. Auf einer kleineren Herdplatte die Pfanne alle paar Minuten drehen.', s: [
      ['fry', 'Olivenöl in der Paellapfanne erhitzen, Hähnchen salzen und bei mittlerer Hitze 10 Minuten rundherum goldbraun braten.', { h: 'mittel', t: 10 }],
      ['fry', 'Grüne und weiße Bohnen zugeben und 3 Minuten mitbraten.', { h: 'mittel', t: 3 }],
      ['stir', 'Fleisch an den Rand schieben, Tomate in die Mitte geben und 3 Minuten einkochen. Paprikapulver kurz einrühren.', { t: 3 }],
      ['pour', 'Brühe und Safran angießen, salzen (die Brühe soll leicht versalzen schmecken). 10 Minuten kochen.', { h: 'hoch', t: 10 }],
      ['pour', 'Reis gleichmäßig in die Pfanne streuen und einmal verteilen. Ab jetzt nicht mehr umrühren.'],
      ['boil', '10 Minuten auf hoher Hitze kochen.', { h: 'hoch', t: 10 }],
      ['simmer', 'Hitze reduzieren, Rosmarin auflegen und weitere 8 Minuten köcheln, bis die Flüssigkeit aufgesogen ist.', { h: 'niedrig', t: 8 }],
      ['fry', 'Für den Socarrat zum Schluss 1 bis 2 Minuten auf hoher Hitze lassen, bis es leise knistert und leicht geröstet riecht.', { h: 'hoch', t: 1 }],
      ['rest', 'Pfanne vom Herd nehmen, mit einem Tuch abdecken und 5 Minuten ruhen lassen.', { t: 5 }],
      ['serve', 'Mit Zitronenspalten direkt aus der Pfanne servieren.']
    ] }
  }
},
{
  id: 'chicken-tacos', n: 'Chicken Tacos mit Pico de Gallo', c: 'fleisch', k: 'Mexiko', d: 1, p: 4,
  desc: 'Gewürzte Hähnchenschenkel, frische Tomatensalsa, Limette.',
  ing: ['600 g Hähnchenschenkel ohne Knochen', '2 EL Öl', 'Saft von 1 Limette', '1 TL Kreuzkümmel', '1 TL Paprikapulver geräuchert', '1 TL Chilipulver', '½ TL Oregano', '1 TL Salz', '12 kleine Mais- oder Weizentortillas', '#Pico de Gallo', '3 Tomaten', '½ weiße Zwiebel', '1 Jalapeño', '½ Bund Koriander', 'Saft von 1 Limette', 'Salz', '#Außerdem', '1 Avocado', 'Saure Sahne oder Crema'],
  prep: [
    ['rest', 'Hähnchen mit Öl, Limettensaft und Gewürzen mischen und 20 Minuten marinieren.', { t: 20 }],
    ['chop', 'Für die Pico de Gallo Tomaten entkernen und fein würfeln, Zwiebel und Jalapeño fein hacken, Koriander hacken. Mit Limettensaft und Salz mischen.']
  ],
  m: {
    herd: { t: 40, s: [
      ['fry', 'Eine Pfanne oder Grillpfanne stark erhitzen und die Schenkel 5 bis 6 Minuten pro Seite braten, bis sie gebräunt und gar sind.', { h: 'hoch', t: 11, k: 75 }],
      ['rest', '5 Minuten ruhen lassen und in Streifen schneiden.', { t: 5 }],
      ['fry', 'Tortillas in einer trockenen Pfanne je 20 Sekunden pro Seite erwärmen.', { h: 'mittel', sec: 40 }],
      ['serve', 'Tortillas mit Fleisch, Pico de Gallo, Avocado und Crema füllen.']
    ] },
    airfryer: { t: 40, s: [
      ['airfry', 'Schenkel bei 200 °C 14 bis 16 Minuten garen, nach der Hälfte wenden.', { c: 200, t: 15, k: 75 }],
      ['chop', 'Kurz ruhen lassen und in Streifen schneiden.'],
      ['serve', 'In warmen Tortillas mit Salsa und Avocado servieren.']
    ] },
    grill: { t: 40, s: [
      ['grill', 'Grill auf hohe direkte Hitze vorheizen. Schenkel 5 bis 6 Minuten pro Seite grillen.', { c: 230, t: 11, k: 75 }],
      ['grill', 'Tortillas 10 bis 15 Sekunden pro Seite auf dem Rost erwärmen.', { sec: 30 }],
      ['serve', 'Fleisch aufschneiden und Tacos füllen.']
    ] }
  }
}
);
