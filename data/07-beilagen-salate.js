/* Beilagen & Salate */
R(
{
  id: 'pommes', n: 'Pommes frites', c: 'beilagen', k: 'Belgien', d: 1, p: 4, v: 2,
  desc: 'Außen knusprig, innen weich. Das Geheimnis: Stärke auswaschen und zweimal garen.',
  ing: ['1 kg mehligkochende Kartoffeln', '1 EL Öl (Airfryer, Ofen) oder 1,5 l Frittieröl (Topf)', '1 TL Salz', '½ TL Paprikapulver (optional)'],
  prep: [
    ['chop', 'Kartoffeln schälen und in 1 cm dicke Stäbchen schneiden. Gleich dick schneiden, damit alle gleichzeitig fertig sind.'],
    ['rest', 'In kaltem Wasser 30 Minuten wässern. Das löst die Stärke, die Pommes werden knuspriger und kleben nicht.', { t: 30 }],
    ['prep', 'Abgießen und mit einem Küchentuch sehr gründlich trocken reiben.']
  ],
  m: {
    airfryer: { t: 60, s: [
      ['spread', 'Pommes mit 1 EL Öl mischen, bis alle leicht glänzen.'],
      ['airfry', 'Korb höchstens halb voll machen. Bei 180 °C 12 Minuten garen.', { c: 180, t: 12 }],
      ['flip', 'Korb kräftig schütteln.'],
      ['airfry', 'Temperatur auf 200 °C erhöhen und 8 bis 12 Minuten weitergaren, alle 4 Minuten schütteln, bis sie goldbraun sind.', { c: 200, t: 10 }],
      ['season', 'Sofort in einer Schüssel mit Salz und Paprika mischen.'],
      ['serve', 'Heiß servieren.']
    ] },
    ofen: { t: 70, s: [
      ['bake', 'Backofen auf 220 °C Umluft vorheizen. Ein Blech mitheizen.', { c: 220, mo: 'U' }],
      ['spread', 'Pommes mit Öl mischen und auf dem heißen Blech mit Backpapier in einer Lage verteilen, mit Abstand.'],
      ['bake', '20 Minuten backen.', { c: 220, mo: 'U', t: 20, i: 'tray' }],
      ['flip', 'Mit einem Pfannenwender wenden.'],
      ['bake', 'Weitere 10 bis 15 Minuten backen, bis sie goldbraun und knusprig sind.', { c: 220, mo: 'U', t: 12, i: 'tray' }],
      ['season', 'Salzen und servieren.']
    ] },
    herd: { t: 60, note: 'Einen hohen Topf höchstens zu einem Drittel mit Öl füllen. Brennendes Öl nie mit Wasser löschen.', s: [
      ['deepfry', 'Öl auf 140 °C erhitzen. Pommes in Portionen 6 bis 8 Minuten vorfrittieren, bis sie weich, aber noch hell sind.', { c: 140, h: 'mittel', t: 7 }],
      ['rest', 'Auf Küchenpapier mindestens 10 Minuten abkühlen lassen.', { t: 10 }],
      ['deepfry', 'Öl auf 180 °C erhitzen und die Pommes portionsweise 2 bis 3 Minuten goldbraun frittieren.', { c: 180, h: 'hoch', t: 3 }],
      ['season', 'Abtropfen lassen, salzen und servieren.']
    ] }
  }
},
{
  id: 'kartoffelpueree', n: 'Kartoffelpüree', c: 'beilagen', k: 'Deutschland', d: 1, p: 4, v: 1,
  desc: 'Locker und buttrig. Nie mit dem Pürierstab, sonst wird es klebrig.',
  ing: ['1 kg mehligkochende Kartoffeln', '200 ml Milch', '60 g Butter', 'Salz', 'Muskat'],
  prep: [['chop', 'Kartoffeln schälen und in gleich große Stücke (ca. 4 cm) schneiden.']],
  m: {
    herd: { t: 35, s: [
      ['boil', 'Kartoffeln in einem Topf mit kaltem Salzwasser bedecken, aufkochen und 20 Minuten köcheln, bis sie mit einem Messer ohne Widerstand durchstochen werden können.', { h: 'mittel', t: 20 }],
      ['pour', 'Abgießen und im Topf 2 Minuten auf der ausgeschalteten Platte ausdampfen lassen.'],
      ['stir', 'Milch und Butter in einem kleinen Topf erwärmen.', { h: 'niedrig' }],
      ['mash', 'Kartoffeln mit einem Kartoffelstampfer oder einer Presse zerdrücken.'],
      ['stir', 'Warme Milch-Butter nach und nach mit einem Holzlöffel unterrühren, bis das Püree cremig ist.'],
      ['season', 'Mit Salz und frisch geriebenem Muskat abschmecken.']
    ] },
    tm: { t: 35, s: [
      ['tm', 'Rühraufsatz (Schmetterling) einsetzen. Kartoffeln, Milch und Salz in den Mixtopf geben, 22 Min./98 °C/Stufe 1 garen.', { t: 22, c: 98, s: 1 }],
      ['tm', 'Butter und Muskat zugeben, 30 Sek./Stufe 3 mit Rühraufsatz aufschlagen. Nicht höher, sonst wird es kleisterig.', { sec: 30, s: 3 }],
      ['serve', 'Abschmecken und servieren.']
    ] },
    dkt: { t: 25, s: [
      ['pour', 'Kartoffeln mit 250 ml Wasser und 1 TL Salz in den Topf geben (Einsatz optional).'],
      ['pressure', '8 Minuten auf Hochdruck garen.', { t: 8, p: 'Hochdruck' }],
      ['rest', 'Druck schnell ablassen, Wasser abgießen.'],
      ['mash', 'Mit Butter und warmer Milch stampfen, mit Muskat abschmecken.']
    ] }
  }
},
{
  id: 'reis', n: 'Reis kochen (Basmati, Jasmin)', c: 'beilagen', k: 'International', d: 1, p: 4, v: 2,
  desc: 'Locker und körnig mit der Quellmethode, ohne Abgießen.',
  ing: ['300 g Basmati- oder Jasminreis', '450 ml Wasser (Topf), siehe Gerät', '1 TL Salz', '1 TL Butter oder Öl (optional)'],
  prep: [['pour', 'Reis in einem Sieb unter kaltem Wasser waschen, bis das Wasser fast klar abläuft. Das entfernt Stärke, die Körner kleben weniger.']],
  m: {
    herd: { t: 25, s: [
      ['boil', 'Reis, Wasser (1,5-fache Menge) und Salz in einen Topf mit gut schließendem Deckel geben und aufkochen.', { h: 'hoch' }],
      ['simmer', 'Sobald es kocht, auf kleinste Stufe schalten und 12 Minuten mit Deckel quellen lassen. Deckel nicht anheben.', { h: 'niedrig', t: 12 }],
      ['rest', 'Vom Herd nehmen und 5 Minuten mit Deckel ruhen lassen.', { t: 5 }],
      ['stir', 'Mit einer Gabel auflockern und servieren.']
    ] },
    tm: { t: 25, s: [
      ['pour', '1000 g Wasser und 1 TL Salz in den Mixtopf geben. Reis in den Gareinsatz füllen und einhängen.'],
      ['tm', '18 bis 20 Min./100 °C/Stufe 4 garen. Bei Stufe 4 wird das Wasser durch den Reis gewirbelt.', { t: 19, c: 100, s: 4 }],
      ['rest', 'Gareinsatz mit dem Spatel herausheben, Reis kurz abtropfen lassen und umfüllen.'],
      ['serve', 'Mit Butter mischen und servieren.']
    ] },
    mikro: { t: 25, s: [
      ['pour', 'Reis mit 600 ml Wasser und Salz in eine große mikrowellengeeignete Schüssel geben (kocht hoch).'],
      ['micro', 'Offen bei 800 Watt 5 Minuten aufkochen.', { t: 5, w: 800 }],
      ['micro', 'Abdecken (Deckel mit Spalt oder Teller) und bei 360 Watt 12 Minuten garen.', { t: 12, w: 360 }],
      ['rest', '5 Minuten abgedeckt stehen lassen, dann auflockern.', { t: 5 }]
    ] },
    dkt: { t: 20, s: [
      ['pour', 'Reis mit der gleichen Menge Wasser (300 ml) und Salz in den Topf geben.'],
      ['pressure', '4 Minuten auf Hochdruck garen (Basmati).', { t: 4, p: 'Hochdruck' }],
      ['rest', '10 Minuten natürlich abbauen lassen, dann auflockern.', { t: 10 }]
    ] }
  },
  tips: ['Faustregel Topf: 1 Tasse Reis zu 1,5 Tassen Wasser. Vollkornreis braucht 2 Tassen und 30 Minuten.']
},
{
  id: 'bratkartoffeln', n: 'Bratkartoffeln', c: 'beilagen', k: 'Deutschland', d: 1, p: 4, v: 2,
  desc: 'Aus Pellkartoffeln vom Vortag, mit Zwiebeln, goldbraun und knusprig.',
  ing: ['1 kg festkochende Kartoffeln, am Vortag gekocht', '1 Zwiebel', '3 EL Öl oder Butterschmalz', '1 TL Salz', 'Pfeffer', '½ TL Kümmel oder Majoran', 'Speckwürfel (optional, dann nicht vegan)', 'Schnittlauch'],
  prep: [['chop', 'Kartoffeln pellen und in 5 mm dicke Scheiben schneiden. Zwiebel würfeln.']],
  m: {
    herd: { t: 30, s: [
      ['fry', 'Öl in einer großen (am besten gusseisernen) Pfanne erhitzen. Kartoffeln in einer Lage einlegen.', { h: 'mittel' }],
      ['fry', '8 Minuten braten, ohne zu wenden. Erst dann bildet sich die Kruste.', { h: 'mittel', t: 8 }],
      ['flip', 'Wenden und weitere 8 Minuten braten. Nur ab und zu wenden.', { h: 'mittel', t: 8 }],
      ['fry', 'Zwiebel und Speck zugeben und 4 Minuten mitbraten.', { h: 'mittel', t: 4 }],
      ['season', 'Mit Salz, Pfeffer und Kümmel würzen. Erst am Ende salzen, sonst ziehen die Kartoffeln Wasser.'],
      ['serve', 'Mit Schnittlauch servieren.']
    ] },
    airfryer: { t: 30, s: [
      ['spread', 'Kartoffelscheiben mit Öl, Salz und Kümmel mischen.'],
      ['airfry', 'Bei 200 °C 15 Minuten garen, alle 5 Minuten schütteln.', { c: 200, t: 15 }],
      ['airfry', 'Zwiebeln zugeben und weitere 5 bis 7 Minuten garen.', { c: 200, t: 6 }],
      ['serve', 'Pfeffern und mit Schnittlauch servieren.']
    ] }
  }
},
{
  id: 'roesti', n: 'Rösti', c: 'beilagen', k: 'Schweiz', d: 2, p: 4, v: 2,
  desc: 'Aus geriebenen, gekochten Kartoffeln, als großer Fladen in der Pfanne gebraten.',
  ing: ['1 kg festkochende Kartoffeln', '1 TL Salz', 'Pfeffer', '3 EL Butterschmalz oder Öl'],
  m: {
    herd: { t: 50, note: 'Kartoffeln am Vortag in der Schale knapp gar kochen (ca. 15 Minuten) und über Nacht kühlen. So halten die Raspeln besser zusammen.', s: [
      ['boil', 'Kartoffeln mit Schale 15 Minuten kochen, sie sollen noch nicht ganz weich sein. Abkühlen lassen, am besten über Nacht.', { h: 'mittel', t: 15 }],
      ['grate', 'Pellen und auf der groben Seite einer Reibe raspeln. Mit Salz und Pfeffer mischen.'],
      ['fry', '2 EL Fett in einer beschichteten Pfanne (24 cm) erhitzen, Kartoffeln einfüllen und locker zu einem Fladen andrücken.', { h: 'mittel' }],
      ['fry', 'Bei mittlerer Hitze 12 bis 15 Minuten braten, bis die Unterseite goldbraun ist. Pfanne zwischendurch rütteln.', { h: 'mittel', t: 13 }],
      ['flip', 'Einen Teller auf die Pfanne legen, mit Schwung stürzen. Restliches Fett in die Pfanne geben und die Rösti zurückgleiten lassen.'],
      ['fry', 'Zweite Seite 10 bis 12 Minuten braten.', { h: 'mittel', t: 11 }],
      ['serve', 'In Stücke schneiden und servieren.']
    ] }
  }
},
{
  id: 'semmelknoedel', n: 'Semmelknödel', c: 'beilagen', k: 'Deutschland (Bayern)', d: 2, p: 4, v: 1, pu: 'Portionen (8 Knödel)',
  desc: 'Aus altbackenen Brötchen. Passt zu jedem Braten mit Soße.',
  ing: ['250 g altbackene Brötchen (ca. 5 Stück)', '250 ml Milch', '1 Zwiebel', '20 g Butter', '3 Eier', '½ Bund Petersilie', '1 TL Salz', 'Pfeffer, Muskat', '2 EL Semmelbrösel (bei Bedarf)'],
  prep: [
    ['chop', 'Brötchen in 1 cm Würfel schneiden. Zwiebel fein würfeln, Petersilie hacken.'],
    ['fry', 'Zwiebel in Butter 3 Minuten glasig dünsten.', { h: 'mittel', t: 3 }],
    ['pour', 'Milch erwärmen und über die Brötchen gießen.'],
    ['rest', 'Eier, Zwiebel, Petersilie und Gewürze zugeben, mischen und 15 Minuten ziehen lassen.', { t: 15 }],
    ['knead', 'Mit den Händen zu einer formbaren Masse verkneten. Ist sie zu feucht, Semmelbrösel zugeben.']
  ],
  m: {
    herd: { t: 50, s: [
      ['shape', 'Mit nassen Händen 8 gleich große, glatte Knödel formen.'],
      ['boil', 'Reichlich Salzwasser aufkochen, dann die Hitze reduzieren, sodass das Wasser nur noch siedet. Knödel einlegen.', { h: 'mittel' }],
      ['simmer', '20 Minuten gar ziehen lassen. Das Wasser darf nicht sprudeln, sonst fallen sie auseinander.', { h: 'niedrig', t: 20 }],
      ['serve', 'Mit einer Schaumkelle herausheben und servieren.']
    ] },
    tm: { t: 50, s: [
      ['shape', '8 Knödel formen und in den gefetteten Varoma-Behälter und Einlegeboden legen.'],
      ['pour', '1000 g Wasser in den Mixtopf füllen.'],
      ['tm', 'Varoma aufsetzen und 30 Min./Varoma/Stufe 1 dämpfen.', { t: 30, c: 'Varoma', s: 1 }],
      ['serve', 'Servieren.']
    ] }
  },
  tips: ['Übrige Knödel in Scheiben schneiden und am nächsten Tag in Butter mit Ei anbraten.']
},
{
  id: 'rotkohl', n: 'Apfelrotkohl', c: 'beilagen', k: 'Deutschland', d: 1, p: 6, v: 2,
  desc: 'Mit Apfel, Zwiebel, Nelken und Lorbeer süß-sauer geschmort.',
  ing: ['1 Rotkohl (ca. 1 kg)', '2 säuerliche Äpfel', '1 Zwiebel', '2 EL Öl oder Gänseschmalz', '2 EL Zucker', '80 ml Rotweinessig', '200 ml Apfelsaft oder Rotwein', '2 Lorbeerblätter', '4 Nelken', '1 Zimtstange', '1 TL Salz', '2 EL Johannisbeergelee oder Preiselbeeren'],
  prep: [['chop', 'Äußere Blätter entfernen, Kohl vierteln, Strunk herausschneiden und in feine Streifen hobeln. Äpfel schälen und würfeln, Zwiebel würfeln.']],
  m: {
    herd: { t: 75, s: [
      ['fry', 'Öl erhitzen, Zwiebel 3 Minuten dünsten, Zucker zugeben und leicht karamellisieren lassen.', { h: 'mittel', t: 4 }],
      ['stir', 'Kohl und Äpfel zugeben und 5 Minuten unter Rühren andünsten.', { h: 'mittel', t: 5 }],
      ['pour', 'Essig zugeben (er hält die Farbe leuchtend), dann Apfelsaft, Gewürze und Salz.'],
      ['simmer', 'Mit Deckel 50 bis 60 Minuten bei niedriger Hitze schmoren, gelegentlich umrühren.', { h: 'niedrig', t: 55 }],
      ['season', 'Gelee einrühren, Gewürze entfernen und süß-sauer abschmecken.']
    ] },
    tm: { t: 60, s: [
      ['tm', 'Kohl in Stücken in zwei Portionen je 4 Sek./Stufe 5 zerkleinern, umfüllen.', { sec: 4, s: 5 }],
      ['tm', 'Zwiebel 3 Sek./Stufe 5, Öl und Zucker zugeben, 3 Min./120 °C/Stufe 1.', { t: 3, c: 120, s: 1 }],
      ['tm', 'Kohl, Äpfel, Essig, Saft, Gewürze und Salz zugeben, 40 Min./100 °C/Linkslauf/Stufe 1. Gewürze vorher in ein Teeei füllen.', { t: 40, c: 100, l: true, s: 1 }],
      ['season', 'Gelee unterrühren und abschmecken.']
    ] },
    dkt: { t: 35, s: [
      ['fry', 'Zwiebel und Zucker im offenen Topf anschwitzen, Kohl und Äpfel kurz mitdünsten.', { h: 'mittel', t: 6 }],
      ['pour', 'Essig, 150 ml Saft, Gewürze und Salz zugeben.'],
      ['pressure', '10 Minuten auf Hochdruck garen.', { t: 10, p: 'Hochdruck' }],
      ['rest', '10 Minuten natürlich abbauen lassen, dann Gelee unterrühren.', { t: 10 }]
    ] }
  },
  tips: ['Schmeckt aufgewärmt besser. Lässt sich gut in großen Mengen kochen und einfrieren.']
},
{
  id: 'ofenkartoffel', n: 'Ofenkartoffel mit Kräuterquark', c: 'beilagen', k: 'International', d: 1, p: 4, v: 1,
  desc: 'Große Kartoffeln, außen knusprig, innen fluffig, mit Quark.',
  ing: ['4 große mehligkochende Kartoffeln (à ca. 300 g)', '1 EL Öl', 'Grobes Salz', '#Kräuterquark', '250 g Quark (20 % Fett)', '100 g saure Sahne', '1 Knoblauchzehe', '1 Bund gemischte Kräuter (Schnittlauch, Petersilie, Dill)', 'Salz, Pfeffer'],
  prep: [
    ['prep', 'Kartoffeln gründlich abbürsten und trocken tupfen. Mehrmals mit einer Gabel einstechen.'],
    ['stir', 'Quark mit saurer Sahne, gepresstem Knoblauch, gehackten Kräutern, Salz und Pfeffer verrühren.']
  ],
  m: {
    ofen: { t: 75, s: [
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen.', { c: 200, mo: 'OU' }],
      ['spread', 'Kartoffeln mit Öl einreiben und mit grobem Salz bestreuen. Direkt auf den Rost legen, ein Blech darunter.'],
      ['bake', '60 bis 70 Minuten backen, bis die Schale knusprig ist und ein Messer ohne Widerstand hineingleitet.', { c: 200, mo: 'OU', t: 65, i: 'tray' }],
      ['serve', 'Kreuzweise einschneiden, von den Seiten zusammendrücken, damit sie aufgehen, und mit Kräuterquark füllen.']
    ] },
    airfryer: { t: 50, s: [
      ['spread', 'Kartoffeln mit Öl und Salz einreiben.'],
      ['airfry', 'Bei 200 °C 40 bis 45 Minuten garen, nach der Hälfte wenden.', { c: 200, t: 42 }],
      ['serve', 'Einschneiden und mit Quark füllen.']
    ] },
    mikro: { t: 25, note: 'Schnell, aber ohne knusprige Schale. Für Kruste danach 10 Minuten in Ofen oder Airfryer.', s: [
      ['micro', 'Eingestochene Kartoffeln auf einen Teller legen und bei 800 Watt 8 Minuten garen.', { t: 8, w: 800 }],
      ['flip', 'Wenden.'],
      ['micro', 'Weitere 6 bis 8 Minuten garen, bis sie weich sind.', { t: 7, w: 800 }],
      ['rest', '2 Minuten ruhen lassen, dann einschneiden und füllen.', { t: 2 }]
    ] }
  }
},
{
  id: 'couscous', n: 'Couscous mit Kräutern', c: 'beilagen', k: 'Marokko', d: 1, p: 4, v: 2,
  desc: 'Instant-Couscous braucht nur kochendes Wasser und 5 Minuten.',
  ing: ['250 g Instant-Couscous', '300 ml Gemüsebrühe', '2 EL Olivenöl', 'Saft von ½ Zitrone', '½ Bund Petersilie', '½ Bund Minze', '1 TL Kreuzkümmel', 'Salz, Pfeffer'],
  m: {
    herd: { t: 15, s: [
      ['boil', 'Brühe mit Olivenöl und Kreuzkümmel aufkochen.', { h: 'hoch' }],
      ['pour', 'Topf vom Herd nehmen, Couscous einrühren, Deckel auflegen.'],
      ['rest', '5 Minuten quellen lassen.', { t: 5 }],
      ['stir', 'Mit einer Gabel auflockern, Zitronensaft und gehackte Kräuter unterheben, abschmecken.']
    ] },
    mikro: { t: 10, s: [
      ['micro', 'Brühe in einer Schüssel bei 800 Watt 3 Minuten erhitzen, bis sie kocht.', { t: 3, w: 800 }],
      ['pour', 'Couscous, Öl und Kreuzkümmel einrühren, mit einem Teller abdecken.'],
      ['rest', '5 Minuten quellen lassen.', { t: 5 }],
      ['stir', 'Auflockern, Zitrone und Kräuter unterheben.']
    ] },
    tm: { t: 12, s: [
      ['tm', 'Brühe, Öl und Kreuzkümmel 4 Min./100 °C/Stufe 1 aufkochen.', { t: 4, c: 100, s: 1 }],
      ['pour', 'Couscous zugeben, Deckel geschlossen lassen.'],
      ['rest', '5 Minuten quellen lassen.', { t: 5 }],
      ['tm', 'Kräuter und Zitronensaft zugeben, 10 Sek./Linkslauf/Stufe 2 auflockern.', { sec: 10, l: true, s: 2 }]
    ] }
  }
},
/* ---------- Salate ---------- */
{
  id: 'caesar-salad', n: 'Caesar Salad', c: 'salate', k: 'Mexiko & USA', d: 2, p: 4,
  desc: 'Römersalat mit cremigem Sardellen-Parmesan-Dressing und Croûtons. Erfunden in Tijuana.',
  ing: ['2 Römersalatherzen', '3 Scheiben Weißbrot oder Ciabatta', '2 EL Olivenöl', '50 g Parmesan', '#Dressing', '1 Eigelb (sehr frisch) oder 2 EL Mayonnaise', '2 Sardellenfilets', '1 Knoblauchzehe', '1 TL Dijonsenf', '1 EL Zitronensaft', '1 TL Worcestersauce', '80 ml Olivenöl', '20 g Parmesan, fein gerieben', 'Pfeffer'],
  prep: [
    ['chop', 'Salat in mundgerechte Stücke zupfen, waschen und trocken schleudern. Brot in 2 cm Würfel schneiden und mit Olivenöl mischen.'],
    ['mash', 'Für das Dressing Sardellen und Knoblauch mit einer Gabel oder im Mörser zu einer Paste zerdrücken.'],
    ['whisk', 'Eigelb, Senf, Zitronensaft und Worcester zugeben und verrühren. Öl in dünnem Strahl unter ständigem Rühren einlaufen lassen, bis es cremig ist. Parmesan unterrühren, pfeffern.']
  ],
  post: [
    ['fold', 'Salat in einer großen Schüssel mit dem Dressing mischen.'],
    ['serve', 'Croûtons darüberstreuen, Parmesan mit dem Sparschäler darüberhobeln und sofort servieren.']
  ],
  m: {
    herd: { t: 25, s: [['fry', 'Brotwürfel in einer Pfanne bei mittlerer Hitze 5 bis 6 Minuten rundherum goldbraun rösten, leicht salzen.', { h: 'mittel', t: 6 }]] },
    airfryer: { t: 25, s: [['airfry', 'Brotwürfel bei 180 °C 5 bis 6 Minuten rösten, nach der Hälfte schütteln.', { c: 180, t: 6 }]] },
    ofen: { t: 30, s: [['bake', 'Brotwürfel auf einem Blech bei 200 °C Umluft 8 bis 10 Minuten goldbraun backen.', { c: 200, mo: 'U', t: 9, i: 'tray' }]] }
  },
  tips: ['Mit gebratener Hähnchenbrust wird daraus eine Hauptmahlzeit.']
},
{
  id: 'griechischer-salat', n: 'Griechischer Bauernsalat (Choriatiki)', c: 'salate', k: 'Griechenland', d: 1, p: 4, v: 1,
  desc: 'Ohne Blattsalat. Tomate, Gurke, Zwiebel, Oliven und ein ganzes Stück Feta obendrauf.',
  ing: ['4 reife Tomaten', '1 Salatgurke', '1 grüne Paprika', '1 rote Zwiebel', '100 g Kalamata-Oliven', '200 g Feta (am Stück)', '1 TL getrockneter Oregano', '5 EL griechisches Olivenöl', '1 EL Rotweinessig', 'Salz'],
  m: {
    kalt: { t: 15, s: [
      ['chop', 'Tomaten in Spalten, Gurke in dicke Halbmonde, Paprika in Ringe, Zwiebel in dünne Ringe schneiden.'],
      ['season', 'Gemüse in einer flachen Schüssel mischen, mit Salz, Essig und der Hälfte des Öls anmachen.'],
      ['layer', 'Oliven darauf verteilen und den Feta als ganzes Stück obenauf legen.'],
      ['serve', 'Mit Oregano bestreuen, restliches Öl darüberträufeln. Mit Brot servieren, um das Öl aufzutunken.']
    ] }
  }
},
{
  id: 'caprese', n: 'Insalata Caprese', c: 'salate', k: 'Italien', d: 1, p: 2, v: 1,
  desc: 'Drei Zutaten und gutes Olivenöl. Nur mit reifen Sommertomaten.',
  ing: ['3 reife Tomaten (Ochsenherz oder Strauch)', '250 g Büffelmozzarella', '1 Bund Basilikum', '3 EL Olivenöl extra vergine', 'Flockensalz', 'Pfeffer'],
  m: {
    kalt: { t: 10, s: [
      ['chop', 'Tomaten und Mozzarella in 1 cm dicke Scheiben schneiden.'],
      ['layer', 'Abwechselnd dachziegelartig mit Basilikumblättern auf einer Platte anrichten.'],
      ['season', 'Mit Flockensalz und Pfeffer würzen und mit Olivenöl beträufeln.'],
      ['serve', 'Bei Raumtemperatur servieren, nicht aus dem Kühlschrank.']
    ] }
  }
},
{
  id: 'tabouleh', n: 'Tabouleh', c: 'salate', k: 'Libanon', d: 1, p: 4, v: 2,
  desc: 'Ein Petersiliensalat mit etwas Bulgur, nicht umgekehrt. Frisch mit Zitrone und Minze.',
  ing: ['50 g feiner Bulgur', '3 große Bund glatte Petersilie', '1 Bund Minze', '3 Tomaten', '4 Frühlingszwiebeln', 'Saft von 2 Zitronen', '5 EL Olivenöl', '1 TL Salz', '½ TL Piment oder Siebengewürz'],
  m: {
    kalt: { t: 30, s: [
      ['rest', 'Bulgur mit dem Saft einer Zitrone und 3 EL Wasser mischen und 15 Minuten quellen lassen.', { t: 15 }],
      ['chop', 'Petersilie und Minze waschen, sehr gut trocken schleudern und mit einem scharfen Messer fein schneiden (nicht hacken, sonst wird sie matschig). Tomaten sehr fein würfeln, Frühlingszwiebeln in feine Ringe schneiden.'],
      ['fold', 'Alles mit dem Bulgur mischen.'],
      ['season', 'Mit restlichem Zitronensaft, Olivenöl, Salz und Piment anmachen.'],
      ['serve', 'Sofort servieren, am besten mit Salatblättern zum Hineinlöffeln.']
    ] }
  }
},
{
  id: 'kartoffelsalat', n: 'Schwäbischer Kartoffelsalat', c: 'salate', k: 'Deutschland', d: 1, p: 4, v: 2,
  desc: 'Mit warmer Brühe und Essig, ohne Mayonnaise. Er muss „schlonzig“ sein.',
  ing: ['1 kg festkochende Kartoffeln', '1 Zwiebel', '250 ml heiße Gemüsebrühe', '4 EL Weißweinessig', '1 TL Senf', '1 TL Zucker', '1 TL Salz', 'Pfeffer', '5 EL Sonnenblumenöl', '½ Salatgurke (optional)', 'Schnittlauch'],
  prep: [['chop', 'Zwiebel sehr fein würfeln.']],
  post: [
    ['chop', 'Kartoffeln noch warm pellen und in dünne Scheiben (3 mm) schneiden.'],
    ['simmer', 'Brühe mit Zwiebel, Essig, Senf, Zucker, Salz und Pfeffer aufkochen.', { h: 'hoch' }],
    ['pour', 'Heiße Marinade über die warmen Kartoffeln gießen und vorsichtig mischen. Warme Kartoffeln saugen die Marinade auf.'],
    ['rest', '30 Minuten ziehen lassen, dabei zweimal wenden.', { t: 30 }],
    ['fold', 'Öl und nach Wunsch fein gehobelte Gurke unterheben, abschmecken.'],
    ['serve', 'Lauwarm mit Schnittlauch servieren.']
  ],
  m: {
    herd: { t: 70, s: [['boil', 'Kartoffeln mit Schale in Salzwasser 20 bis 25 Minuten gar kochen, abgießen und kurz ausdampfen lassen.', { h: 'mittel', t: 22 }]] },
    dkt: { t: 60, s: [['pressure', 'Kartoffeln mit 250 ml Wasser im Einsatz 8 Minuten auf Hochdruck garen, Druck schnell ablassen.', { t: 8, p: 'Hochdruck' }]] },
    tm: { t: 70, s: [['tm', '1000 g Wasser in den Mixtopf, Kartoffeln in den Varoma-Behälter. 30 Min./Varoma/Stufe 1 dämpfen.', { t: 30, c: 'Varoma', s: 1 }]] }
  }
},
{
  id: 'coleslaw', n: 'Coleslaw', c: 'salate', k: 'USA', d: 1, p: 6, v: 1,
  desc: 'Krautsalat mit cremigem Dressing. Zu Pulled Pork, Burgern und Gegrilltem.',
  ing: ['500 g Weißkohl', '200 g Rotkohl', '2 Möhren', '½ rote Zwiebel', '#Dressing', '120 g Mayonnaise', '60 g saure Sahne', '2 EL Apfelessig', '1 EL Zucker', '1 TL Senf', '1 TL Salz', 'Pfeffer'],
  m: {
    kalt: { t: 50, s: [
      ['chop', 'Kohl vierteln, Strunk entfernen und sehr fein hobeln. Möhren grob raspeln, Zwiebel fein würfeln.'],
      ['knead', 'Kohl mit ½ TL Salz 2 Minuten kräftig mit den Händen kneten, bis er weicher wird.', { t: 2 }],
      ['whisk', 'Dressingzutaten verrühren.'],
      ['fold', 'Alles mit dem Dressing mischen.'],
      ['chill', 'Mindestens 30 Minuten durchziehen lassen.', { t: 30 }],
      ['serve', 'Abschmecken und servieren.']
    ] },
    tm: { t: 45, s: [
      ['tm', 'Kohl in Stücken in Portionen 4 Sek./Stufe 4 zerkleinern, Möhren und Zwiebel mitgeben. Umfüllen.', { sec: 4, s: 4 }],
      ['tm', 'Dressingzutaten 10 Sek./Stufe 3 verrühren.', { sec: 10, s: 3 }],
      ['fold', 'Mit dem Gemüse mischen.'],
      ['chill', '30 Minuten ziehen lassen.', { t: 30 }]
    ] }
  }
}
);
