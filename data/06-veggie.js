/* Vegetarisch & Vegan */
R(
{
  id: 'chana-masala', n: 'Chana Masala', c: 'veggie', k: 'Indien', d: 1, p: 4, v: 2,
  desc: 'Kichererbsen-Curry mit Tomate, Ingwer und Garam Masala.',
  ing: ['2 Dosen Kichererbsen (à 240 g abgetropft) oder 250 g getrocknete', '2 Zwiebeln', '3 Knoblauchzehen', '30 g Ingwer', '1 grüne Chili', '3 EL Öl', '1 TL Kreuzkümmelsamen', '2 TL Garam Masala', '1 TL Koriander, gemahlen', '1 TL Kurkuma', '1 TL Paprikapulver', '400 g gehackte Tomaten', '200 ml Wasser', '1 TL Salz', 'Saft von ½ Zitrone', 'Koriandergrün', 'Reis oder Naan'],
  prep: [['chop', 'Zwiebeln fein würfeln, Knoblauch, Ingwer und Chili fein hacken. Dosen-Kichererbsen abspülen.']],
  m: {
    herd: { t: 40, s: [
      ['fry', 'Öl erhitzen, Kreuzkümmelsamen 30 Sekunden rösten.', { h: 'mittel', sec: 30 }],
      ['fry', 'Zwiebeln 8 bis 10 Minuten goldbraun braten. Geduld lohnt sich, sie geben der Soße die Tiefe.', { h: 'mittel', t: 9 }],
      ['fry', 'Knoblauch, Ingwer und Chili 1 Minute mitbraten.', { t: 1 }],
      ['season', 'Gemahlene Gewürze einrühren und 30 Sekunden anrösten.', { sec: 30 }],
      ['simmer', 'Tomaten zugeben und 5 Minuten einkochen, bis sich das Öl am Rand absetzt.', { h: 'mittel', t: 5 }],
      ['simmer', 'Kichererbsen, Wasser und Salz zugeben und 15 Minuten köcheln. Ein paar Kichererbsen mit dem Löffelrücken zerdrücken, das bindet die Soße.', { h: 'niedrig', t: 15 }],
      ['season', 'Mit Zitronensaft abschmecken.'],
      ['serve', 'Mit Koriander bestreuen, dazu Reis oder Naan.']
    ] },
    tm: { t: 35, s: [
      ['tm', 'Zwiebeln, Knoblauch, Ingwer und Chili 5 Sek./Stufe 5 zerkleinern.', { sec: 5, s: 5 }],
      ['tm', 'Öl und Kreuzkümmel zugeben, 6 Min./120 °C/Stufe 1 ohne Messbecher.', { t: 6, c: 120, s: 1 }],
      ['tm', 'Gewürze und Tomaten zugeben, 5 Min./100 °C/Stufe 1.', { t: 5, c: 100, s: 1 }],
      ['tm', 'Kichererbsen, Wasser und Salz zugeben, 15 Min./100 °C/Linkslauf/Sanftrührstufe.', { t: 15, c: 100, l: true, s: 'sanft' }],
      ['serve', 'Mit Zitrone abschmecken und mit Koriander servieren.']
    ] },
    dkt: { t: 75, note: 'Mit getrockneten Kichererbsen: Sie müssen nicht eingeweicht werden.', s: [
      ['fry', 'Zwiebeln, Knoblauch, Ingwer, Chili und Gewürze im offenen Topf anbraten.', { h: 'mittel', t: 10 }],
      ['pour', 'Ungeweichte, gewaschene Kichererbsen, Tomaten, 600 ml Wasser und Salz zugeben.'],
      ['pressure', '45 Minuten auf Hochdruck garen.', { t: 45, p: 'Hochdruck' }],
      ['rest', 'Druck natürlich abbauen lassen, dann offen 5 Minuten einkochen.', { t: 15 }],
      ['serve', 'Mit Zitrone und Koriander servieren.']
    ] }
  }
},
{
  id: 'falafel', n: 'Falafel', c: 'veggie', k: 'Nahost', d: 2, p: 4, v: 2, pu: 'Portionen (ca. 24 Stück)',
  desc: 'Aus eingeweichten, rohen Kichererbsen. Mit Dosenware zerfallen sie.',
  ing: ['250 g getrocknete Kichererbsen', '1 Zwiebel', '4 Knoblauchzehen', '1 Bund Petersilie', '½ Bund Koriander', '2 TL Kreuzkümmel', '1 TL Koriander, gemahlen', '½ TL Cayennepfeffer', '1,5 TL Salz', '1 TL Backpulver', '2 EL Kichererbsenmehl oder Mehl', 'Öl zum Frittieren oder Einsprühen', 'Fladenbrot, Hummus, Tahini-Soße, Salat'],
  prep: [
    ['rest', 'Kichererbsen in reichlich kaltem Wasser 12 bis 24 Stunden einweichen. Sie verdoppeln ihr Volumen. Abgießen und sehr gut trocken tupfen.', { t: 720 }],
    ['blend', 'Kichererbsen, Zwiebel, Knoblauch und Kräuter in einem Zerkleinerer oder Thermomix (5 Sek./Stufe 6, mehrmals nach unten schieben) fein hacken, bis die Masse wie grober Sand aussieht. Kein Püree.'],
    ['knead', 'Gewürze, Salz, Backpulver und Mehl unterkneten. Die Masse muss beim Zusammendrücken halten.'],
    ['chill', '30 Minuten kalt stellen.', { t: 30 }],
    ['shape', 'Mit feuchten Händen oder einem Falafelformer walnussgroße, leicht flache Bällchen formen.']
  ],
  m: {
    herd: { t: 30, s: [
      ['deepfry', 'Öl in einem Topf 5 cm hoch auf 175 °C erhitzen.', { c: 175, h: 'mittel' }],
      ['deepfry', 'Falafel portionsweise 3 bis 4 Minuten frittieren, bis sie tief goldbraun sind.', { c: 175, t: 4 }],
      ['rest', 'Auf Küchenpapier abtropfen lassen.'],
      ['serve', 'Im Fladenbrot mit Salat, Hummus und Tahini-Soße servieren.']
    ] },
    airfryer: { t: 30, s: [
      ['spread', 'Falafel rundherum großzügig mit Öl einsprühen.'],
      ['airfry', 'In einer Lage bei 190 °C 12 bis 15 Minuten garen, nach der Hälfte wenden und erneut einsprühen.', { c: 190, t: 14 }],
      ['serve', 'Servieren.']
    ] },
    ofen: { t: 35, s: [
      ['bake', 'Backofen auf 210 °C Umluft vorheizen. Blech mit Backpapier belegen und mit 3 EL Öl einpinseln.', { c: 210, mo: 'U' }],
      ['bake', 'Falafel auflegen, oben mit Öl bepinseln und 12 Minuten backen.', { c: 210, mo: 'U', t: 12, i: 'tray' }],
      ['flip', 'Wenden.'],
      ['bake', 'Weitere 10 Minuten backen.', { c: 210, mo: 'U', t: 10, i: 'tray' }],
      ['serve', 'Servieren.']
    ] }
  }
},
{
  id: 'risotto', n: 'Pilzrisotto', c: 'veggie', k: 'Italien', d: 2, p: 4, v: 1,
  desc: 'Cremig durch die Stärke des Reises, nicht durch Sahne.',
  ing: ['320 g Risottoreis (Carnaroli oder Arborio)', '20 g getrocknete Steinpilze', '300 g braune Champignons', '1 Schalotte', '1 Knoblauchzehe', '3 EL Olivenöl', '120 ml trockener Weißwein', '1,2 l heiße Gemüsebrühe', '40 g kalte Butter', '60 g Parmesan, gerieben', 'Salz, Pfeffer', 'Petersilie'],
  prep: [
    ['rest', 'Steinpilze in 200 ml heißem Wasser 20 Minuten einweichen. Ausdrücken, hacken, das Einweichwasser durch ein Sieb zur Brühe geben.', { t: 20 }],
    ['chop', 'Schalotte und Knoblauch fein würfeln, Champignons in Scheiben schneiden.']
  ],
  m: {
    herd: { t: 40, s: [
      ['fry', '1 EL Öl in einer Pfanne stark erhitzen, Champignons 5 Minuten braun braten, salzen, beiseitestellen.', { h: 'hoch', t: 5 }],
      ['fry', 'Restliches Öl in einem breiten Topf erhitzen, Schalotte und Knoblauch 2 Minuten glasig dünsten.', { h: 'mittel', t: 2 }],
      ['stir', 'Reis zugeben und 2 Minuten unter Rühren anrösten, bis die Körner glasig werden.', { h: 'mittel', t: 2 }],
      ['pour', 'Mit Wein ablöschen und rühren, bis er verdampft ist.'],
      ['pour', 'Eine Kelle heiße Brühe und die Steinpilze zugeben. Rühren, bis die Flüssigkeit fast aufgesogen ist, dann die nächste Kelle zugeben.'],
      ['stir', 'So weitermachen, 17 bis 19 Minuten lang. Der Reis ist fertig, wenn er außen weich ist und innen noch leichten Biss hat.', { h: 'mittel', t: 18 }],
      ['stir', 'Topf vom Herd nehmen, Champignons, kalte Butter in Würfeln und Parmesan zugeben und kräftig rühren (mantecare), bis es cremig ist.'],
      ['rest', '2 Minuten mit Deckel ruhen lassen. Das Risotto soll fließen, wenn man den Teller kippt.', { t: 2 }],
      ['serve', 'Mit Pfeffer und Petersilie servieren.']
    ] },
    tm: { t: 35, s: [
      ['fry', 'Champignons in einer Pfanne braun braten, beiseitestellen.', { h: 'hoch', t: 5 }],
      ['tm', 'Parmesan in Stücken 10 Sek./Stufe 10 reiben, umfüllen.', { sec: 10, s: 10 }],
      ['tm', 'Schalotte und Knoblauch 3 Sek./Stufe 5 zerkleinern. Öl zugeben, 3 Min./120 °C/Stufe 1.', { t: 3, c: 120, s: 1 }],
      ['tm', 'Reis zugeben, 2 Min./120 °C/Linkslauf/Stufe 1 ohne Messbecher anrösten.', { t: 2, c: 120, l: true, s: 1 }],
      ['tm', 'Wein zugeben, 1 Min./120 °C/Linkslauf/Stufe 1.', { t: 1, c: 120, l: true, s: 1 }],
      ['tm', 'Brühe (nur 1 l) und Steinpilze zugeben, 16 Min./100 °C/Linkslauf/Stufe 1, Garkörbchen statt Messbecher.', { t: 16, c: 100, l: true, s: 1 }],
      ['stir', 'In eine Schüssel umfüllen, Champignons, Butter und Parmesan unterrühren, 2 Minuten ruhen lassen.', { t: 2 }],
      ['serve', 'Servieren.']
    ] }
  }
},
{
  id: 'ratatouille', n: 'Ratatouille', c: 'veggie', k: 'Frankreich', d: 2, p: 4, v: 2,
  desc: 'Provenzalisches Schmorgemüse, als Eintopf auf dem Herd oder als Schichtgemüse aus dem Ofen.',
  ing: ['1 Aubergine', '2 Zucchini (grün und gelb)', '1 rote Paprika', '1 gelbe Paprika', '4 Tomaten', '1 Zwiebel', '3 Knoblauchzehen', '6 EL Olivenöl', '2 EL Tomatenmark', '200 g passierte Tomaten', '1 TL Kräuter der Provence', '1 Zweig Thymian', 'Salz, Pfeffer', 'Basilikum'],
  m: {
    herd: { t: 60, s: [
      ['chop', 'Aubergine, Zucchini und Paprika in 2 cm Würfel schneiden. Tomaten würfeln, Zwiebel und Knoblauch hacken.'],
      ['fry', 'Aubergine in 3 EL Olivenöl bei hoher Hitze 5 Minuten braun braten, salzen, herausnehmen. Dann die Zucchini genauso braten. Getrennt braten, damit jedes Gemüse Farbe bekommt.', { h: 'hoch', t: 10 }],
      ['fry', 'Zwiebel und Paprika im restlichen Öl 6 Minuten weich braten, Knoblauch und Tomatenmark 1 Minute mitrösten.', { h: 'mittel', t: 7 }],
      ['simmer', 'Tomaten, passierte Tomaten und Kräuter zugeben, alles Gemüse zurück in den Topf geben und mit Deckel 25 Minuten leise schmoren.', { h: 'niedrig', t: 25 }],
      ['season', 'Abschmecken und mit Basilikum servieren. Schmeckt warm, lauwarm und am nächsten Tag.']
    ] },
    ofen: { t: 80, note: 'Die geschichtete Variante (Confit Byaldi): Gemüse in dünnen Scheiben auf einer Tomatensoße.', s: [
      ['chop', 'Zwiebel und Knoblauch fein hacken, eine Paprika fein würfeln. Aubergine, Zucchini und Tomaten in 3 mm dünne Scheiben schneiden.'],
      ['simmer', 'Zwiebel, Knoblauch und Paprikawürfel in 2 EL Öl 5 Minuten dünsten, Tomatenmark und passierte Tomaten zugeben, 10 Minuten köcheln, würzen.', { h: 'mittel', t: 15 }],
      ['bake', 'Backofen auf 180 °C Ober-/Unterhitze vorheizen.', { c: 180, mo: 'OU' }],
      ['layer', 'Soße in einer runden Form verteilen. Gemüsescheiben abwechselnd dachziegelartig spiralförmig darauflegen. Mit Öl beträufeln, mit Thymian, Salz und Pfeffer würzen.'],
      ['bake', 'Mit Backpapier abgedeckt 45 Minuten backen.', { c: 180, mo: 'OU', t: 45, i: 'dish' }],
      ['bake', 'Papier entfernen und weitere 15 Minuten backen.', { c: 180, mo: 'OU', t: 15, i: 'dish' }],
      ['serve', 'Mit Basilikum servieren.']
    ] },
    slow: { t: 380, s: [
      ['chop', 'Gemüse in 2 cm Würfel schneiden, Zwiebel und Knoblauch hacken.'],
      ['slow', 'Alles mit Olivenöl, Tomatenmark, passierten Tomaten und Kräutern in den Slow Cooker geben. LOW 6 Stunden. Keine Flüssigkeit zugeben, das Gemüse gibt Wasser ab.', { lvl: 'LOW', t: 360 }],
      ['season', 'Abschmecken und mit Basilikum servieren.']
    ] }
  }
},
{
  id: 'pizza-margherita', n: 'Pizza Margherita', c: 'veggie', k: 'Italien', d: 2, p: 4, v: 1, pu: 'Pizzen',
  desc: 'Teig mit wenig Hefe und langer Gare, so heiß wie möglich gebacken.',
  ing: ['#Teig', '500 g Weizenmehl Type 00 (oder 405)', '325 ml lauwarmes Wasser', '3 g Trockenhefe (oder 10 g frische)', '12 g Salz', '1 EL Olivenöl', '#Belag', '400 g San-Marzano-Tomaten (Dose)', '1 TL Salz', '250 g Mozzarella (gut abgetropft)', 'Frisches Basilikum', 'Olivenöl'],
  m: {
    ofen: { t: 120, note: 'Mit Pizzastein oder Pizzastahl wird der Boden knuspriger. Ohne: ein umgedrehtes Blech mit vorheizen.', s: [
      ['stir', 'Hefe im Wasser auflösen. Mit Mehl verrühren, dann Salz und Öl zugeben.'],
      ['knead', '10 Minuten kneten, bis der Teig glatt und elastisch ist.', { t: 10 }],
      ['rest', 'Abgedeckt 1 Stunde bei Raumtemperatur gehen lassen. Für mehr Aroma danach 24 bis 48 Stunden in den Kühlschrank.', { t: 60 }],
      ['shape', 'Teig in 4 Portionen teilen, zu straffen Kugeln formen und abgedeckt 30 Minuten entspannen lassen.', { t: 30 }],
      ['bake', 'Backofen mit Pizzastein auf der höchsten Stufe (250 bis 280 °C) Ober-/Unterhitze mindestens 45 Minuten vorheizen.', { c: 250, mo: 'OU', t: 45 }],
      ['mash', 'Tomaten mit der Hand oder dem Pürierstab grob zerkleinern und salzen. Nicht kochen.'],
      ['shape', 'Teigkugel auf bemehlter Fläche mit den Fingerspitzen von innen nach außen flach drücken, den Rand aussparen. Zu einem 28-cm-Kreis ziehen. Kein Nudelholz, es drückt die Luft heraus.'],
      ['spread', 'Auf einen bemehlten Pizzaschieber oder Backpapier legen, 3 EL Tomate verstreichen, Mozzarella zerzupft verteilen.'],
      ['bake', 'Auf den Stein gleiten lassen und 6 bis 9 Minuten backen, bis der Rand gebräunt ist und der Käse blubbert.', { c: 250, mo: 'OU', t: 8, i: 'pizza' }],
      ['serve', 'Mit Basilikum und Olivenöl sofort servieren.']
    ] },
    tm: { t: 120, note: 'Teig im Thermomix, gebacken wird im Backofen.', s: [
      ['tm', 'Wasser und Hefe 2 Min./37 °C/Stufe 2.', { t: 2, c: 37, s: 2 }],
      ['tm', 'Mehl, Salz und Öl zugeben, 3 Min./Teigstufe kneten.', { t: 3, s: 'teig' }],
      ['rest', 'Teig in eine geölte Schüssel geben und 1 Stunde abgedeckt gehen lassen.', { t: 60 }],
      ['shape', 'In 4 Kugeln teilen, 30 Minuten entspannen lassen.', { t: 30 }],
      ['bake', 'Ofen mit Pizzastein auf höchster Stufe 45 Minuten vorheizen.', { c: 250, mo: 'OU', t: 45 }],
      ['tm', 'Tomaten und Salz 3 Sek./Stufe 4 zerkleinern.', { sec: 3, s: 4 }],
      ['spread', 'Pizza von Hand formen und belegen.'],
      ['bake', '6 bis 9 Minuten backen.', { c: 250, mo: 'OU', t: 8, i: 'pizza' }],
      ['serve', 'Mit Basilikum servieren.']
    ] },
    grill: { t: 120, note: 'Auf dem Gasgrill mit Pizzastein und geschlossenem Deckel erreicht man 350 °C und mehr.', s: [
      ['knead', 'Teig wie beschrieben herstellen und gehen lassen.', { t: 10 }],
      ['rest', '1 Stunde gehen lassen, dann zu Kugeln formen und 30 Minuten entspannen.', { t: 90 }],
      ['grill', 'Pizzastein auf den Grill legen und bei voller Leistung mit geschlossenem Deckel 30 Minuten vorheizen.', { c: 350, t: 30 }],
      ['spread', 'Pizza formen und belegen.'],
      ['grill', 'Auf den Stein gleiten lassen und bei geschlossenem Deckel 3 bis 5 Minuten backen. Nach der Hälfte drehen.', { c: 350, t: 4 }],
      ['serve', 'Mit Basilikum servieren.']
    ] }
  }
},
{
  id: 'flammkuchen', n: 'Flammkuchen Elsässer Art', c: 'snacks', k: 'Frankreich (Elsass)', d: 1, p: 2, pu: 'Bleche',
  desc: 'Hauchdünner Teig ohne Hefe mit Schmand, Zwiebeln und Speck. Vegetarisch ohne Speck.',
  ing: ['#Teig', '250 g Mehl', '125 ml Wasser', '2 EL Öl', '½ TL Salz', '#Belag', '200 g Schmand oder Crème fraîche', 'Salz, Pfeffer, Muskat', '2 Zwiebeln', '125 g Speckwürfel (für die vegetarische Variante weglassen)'],
  prep: [['chop', 'Zwiebeln in sehr feine Ringe schneiden.']],
  m: {
    ofen: { t: 40, s: [
      ['bake', 'Backofen auf 250 °C Ober-/Unterhitze vorheizen, ein Blech mitheizen.', { c: 250, mo: 'OU' }],
      ['knead', 'Mehl, Wasser, Öl und Salz 3 Minuten zu einem glatten Teig kneten.', { t: 3 }],
      ['roll', 'Teig halbieren und jede Hälfte auf Backpapier hauchdünn ausrollen (ca. 2 mm, blechgroß).'],
      ['spread', 'Schmand mit Salz, Pfeffer und Muskat verrühren und dünn auf dem Teig verstreichen. Zwiebeln und Speck darauf verteilen.'],
      ['bake', 'Mit dem Papier auf das heiße Blech ziehen und im unteren Drittel 8 bis 12 Minuten backen, bis der Rand knusprig und braun ist.', { c: 250, mo: 'OU', t: 10, i: 'pizza' }],
      ['serve', 'In Stücke schneiden und sofort servieren.']
    ] },
    tm: { t: 40, s: [
      ['tm', 'Mehl, Wasser, Öl und Salz 2 Min./Teigstufe kneten.', { t: 2, s: 'teig' }],
      ['tm', 'Zwiebeln geviertelt 3 Sek./Stufe 4 zerkleinern (oder von Hand in Ringe schneiden).', { sec: 3, s: 4 }],
      ['roll', 'Ofen auf 250 °C vorheizen, Teig hauchdünn ausrollen.', { c: 250, mo: 'OU' }],
      ['spread', 'Mit Schmand bestreichen, mit Zwiebeln und Speck belegen.'],
      ['bake', '8 bis 12 Minuten backen.', { c: 250, mo: 'OU', t: 10, i: 'pizza' }]
    ] }
  }
},
{
  id: 'quiche-lorraine', n: 'Quiche Lorraine', c: 'snacks', k: 'Frankreich', d: 2, p: 6,
  desc: 'Mürbeteig mit Speck und Eiersahne. Die Variante mit Lauch statt Speck ist vegetarisch.',
  ing: ['#Mürbeteig', '200 g Mehl', '100 g kalte Butter', '1 Ei', '½ TL Salz', '1 bis 2 EL kaltes Wasser', '#Füllung', '200 g Speckwürfel (oder 2 Stangen Lauch, gedünstet)', '100 g Gruyère, gerieben', '3 Eier', '200 ml Sahne', '100 ml Milch', 'Salz, Pfeffer, Muskat'],
  m: {
    ofen: { t: 110, s: [
      ['knead', 'Mehl, Butter in Würfeln, Ei und Salz rasch mit den Fingerspitzen zu Krümeln verreiben, Wasser zugeben und kurz zu einem Teig zusammendrücken. Nicht lange kneten.'],
      ['chill', 'In Folie gewickelt 30 Minuten kalt stellen.', { t: 30 }],
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen.', { c: 200, mo: 'OU' }],
      ['roll', 'Teig rund ausrollen und eine gefettete Tarteform (26 cm) damit auskleiden, Boden mehrmals mit einer Gabel einstechen.'],
      ['bake', 'Mit Backpapier und Hülsenfrüchten beschwert 15 Minuten blindbacken, dann Papier entfernen und 5 Minuten weiterbacken.', { c: 200, mo: 'OU', t: 20 }],
      ['fry', 'Speck in einer Pfanne 5 Minuten knusprig braten, abtropfen lassen.', { h: 'mittel', t: 5 }],
      ['whisk', 'Eier, Sahne, Milch, Salz, Pfeffer und Muskat verquirlen.'],
      ['layer', 'Speck und Käse auf dem Boden verteilen, Eiersahne darübergießen.'],
      ['bake', 'Bei 180 °C 30 bis 35 Minuten backen, bis die Füllung gestockt ist und in der Mitte nur noch leicht wackelt.', { c: 180, mo: 'OU', t: 32 }],
      ['rest', '10 Minuten abkühlen lassen, dann anschneiden.', { t: 10 }]
    ] },
    tm: { t: 110, s: [
      ['tm', 'Mehl, Butter, Ei und Salz 20 Sek./Stufe 4 vermengen, dann 10 Sek./Teigstufe.', { sec: 30, s: 'teig' }],
      ['chill', '30 Minuten kalt stellen.', { t: 30 }],
      ['tm', 'Käse in Stücken 8 Sek./Stufe 8 reiben, umfüllen.', { sec: 8, s: 8 }],
      ['tm', 'Eier, Sahne, Milch und Gewürze 10 Sek./Stufe 4 verquirlen.', { sec: 10, s: 4 }],
      ['roll', 'Teig ausrollen, in die Form legen und 20 Minuten bei 200 °C blindbacken.', { c: 200, mo: 'OU', t: 20 }],
      ['layer', 'Gebratenen Speck und Käse einfüllen, Eiersahne darübergießen.'],
      ['bake', '30 bis 35 Minuten bei 180 °C backen.', { c: 180, mo: 'OU', t: 32 }]
    ] }
  }
},
{
  id: 'ofengemuese', n: 'Ofengemüse mit Feta', c: 'veggie', k: 'Mittelmeer', d: 1, p: 4, v: 1,
  desc: 'Ein Blech, wenig Arbeit. Gemüse nach Saison.',
  ing: ['500 g Kartoffeln oder Süßkartoffeln', '2 Paprika', '1 Zucchini', '1 rote Zwiebel', '250 g Kirschtomaten', '4 EL Olivenöl', '1 TL Salz', '1 TL Paprikapulver', '1 TL getrockneter Rosmarin oder Thymian', '200 g Feta (vegan: Räuchertofu)', 'Petersilie', '#Dip', '200 g Joghurt', '1 Knoblauchzehe', 'Saft von ½ Zitrone'],
  prep: [
    ['chop', 'Kartoffeln in 2 cm Würfel, Paprika in Streifen, Zucchini in Halbmonde, Zwiebel in Spalten schneiden.'],
    ['stir', 'Gemüse (ohne Tomaten) mit Olivenöl, Salz, Paprikapulver und Kräutern mischen.']
  ],
  m: {
    ofen: { t: 50, s: [
      ['bake', 'Backofen auf 220 °C Umluft vorheizen.', { c: 220, mo: 'U' }],
      ['spread', 'Gemüse in einer Lage auf einem Blech mit Backpapier verteilen. Liegt es übereinander, dämpft es statt zu rösten.'],
      ['bake', '20 Minuten backen.', { c: 220, mo: 'U', t: 20, i: 'tray' }],
      ['flip', 'Wenden, Tomaten zugeben, Feta in Würfeln darüberbröseln.'],
      ['bake', 'Weitere 15 Minuten backen, bis die Kartoffeln gar und gebräunt sind.', { c: 220, mo: 'U', t: 15, i: 'tray' }],
      ['stir', 'Joghurt mit gepresstem Knoblauch, Zitronensaft und Salz verrühren.'],
      ['serve', 'Mit Petersilie bestreuen, mit Dip servieren.']
    ] },
    airfryer: { t: 40, s: [
      ['airfry', 'Kartoffeln zuerst bei 200 °C 10 Minuten garen.', { c: 200, t: 10 }],
      ['airfry', 'Restliches Gemüse zugeben und weitere 12 Minuten garen, alle 4 Minuten schütteln.', { c: 200, t: 12 }],
      ['airfry', 'Tomaten und Feta zugeben, 4 Minuten weitergaren.', { c: 200, t: 4 }],
      ['serve', 'Mit Dip und Petersilie servieren.']
    ] }
  }
},
{
  id: 'bibimbap', n: 'Bibimbap', c: 'veggie', k: 'Korea', d: 2, p: 2, v: 1,
  desc: 'Reisschale mit einzeln gewürzten Gemüsen, Spiegelei und Gochujang-Soße. Mit Tofu oder Rind.',
  ing: ['250 g Reis (Rundkorn)', '150 g fester Tofu oder Rinderhack', '1 Möhre', '1 Zucchini', '150 g Spinat', '100 g Mungbohnensprossen', '4 Shiitake', '2 Eier', '2 EL Sesamöl', '2 Knoblauchzehen', 'Sojasauce, Salz, Sesam', '#Soße', '2 EL Gochujang', '1 EL Sesamöl', '1 TL Zucker', '1 TL Reisessig', '1 TL Sesam'],
  prep: [
    ['chop', 'Möhre und Zucchini in Streichholzstreifen schneiden, Shiitake in Scheiben, Knoblauch hacken.'],
    ['stir', 'Soßenzutaten verrühren.']
  ],
  m: {
    herd: { t: 50, s: [
      ['boil', 'Reis waschen und mit der 1,2-fachen Menge Wasser aufkochen, dann 15 Minuten bei kleinster Hitze mit Deckel garen und 10 Minuten quellen lassen.', { h: 'niedrig', t: 15 }],
      ['boil', 'Spinat und Sprossen nacheinander je 1 Minute blanchieren, kalt abschrecken, ausdrücken. Jeweils mit etwas Sesamöl, Knoblauch und Salz anmachen.', { h: 'hoch', t: 2 }],
      ['fry', 'Möhre, Zucchini und Shiitake nacheinander je 1 bis 2 Minuten in wenig Sesamöl braten, leicht salzen.', { h: 'hoch', t: 5 }],
      ['fry', 'Hack oder zerbröselten Tofu mit 1 EL Sojasauce und Knoblauch krümelig braten.', { h: 'hoch', t: 5 }],
      ['fry', 'Spiegeleier braten, das Eigelb soll flüssig bleiben.', { h: 'mittel', t: 3 }],
      ['layer', 'Reis in Schalen füllen, Gemüse und Fleisch im Kreis darauf anrichten, Ei in die Mitte.'],
      ['serve', 'Mit Sesam bestreuen und mit der Soße servieren. Am Tisch alles kräftig vermischen.']
    ] }
  },
  tips: ['Für Dolsot-Bibimbap eine Steingut- oder Gusseisenschale mit Sesamöl auspinseln, den Reis hineingeben und auf dem Herd erhitzen, bis er unten knusprig wird.']
},
{
  id: 'gebratener-reis', n: 'Gebratener Reis mit Ei', c: 'veggie', k: 'China', d: 1, p: 2, v: 1,
  desc: 'Mit Reis vom Vortag. Frisch gekochter Reis klebt und wird matschig.',
  ing: ['500 g gekochter Reis vom Vortag (aus ca. 200 g roh)', '3 Eier', '3 EL neutrales Öl', '2 Frühlingszwiebeln', '2 Knoblauchzehen', '100 g Erbsen (TK)', '1 Möhre', '2 EL helle Sojasauce', '1 TL Sesamöl', 'Weißer Pfeffer'],
  prep: [
    ['chop', 'Möhre in kleine Würfel, Frühlingszwiebeln in Ringe (Weißes und Grünes getrennt), Knoblauch hacken.'],
    ['mash', 'Kalten Reis mit den Händen auflockern, Klumpen zerdrücken.'],
    ['whisk', 'Eier mit einer Prise Salz verquirlen.']
  ],
  m: {
    herd: { t: 20, s: [
      ['flip', 'Wok auf höchster Stufe erhitzen, bis er raucht. 1 EL Öl zugeben, Eier hineingießen, 20 Sekunden stocken lassen, grob zerteilen und herausnehmen (noch leicht flüssig).', { h: 'max', sec: 20 }],
      ['flip', 'Restliches Öl zugeben, Möhre, Erbsen, Knoblauch und Frühlingszwiebel-Weiß 1 Minute braten.', { h: 'max', t: 1 }],
      ['flip', 'Reis zugeben und 3 bis 4 Minuten unter ständigem Wenden braten, bis die Körner einzeln und heiß sind und leicht knistern.', { h: 'max', t: 4 }],
      ['season', 'Sojasauce am Wokrand entlang angießen (sie karamellisiert dort), Ei zurückgeben, durchschwenken.'],
      ['serve', 'Mit Sesamöl, weißem Pfeffer und Frühlingszwiebel-Grün servieren.']
    ] }
  }
},
{
  id: 'tofu-knusprig', n: 'Knuspriger Tofu', c: 'veggie', k: 'International', d: 1, p: 2, v: 2,
  desc: 'Gepresst, mit Stärke überzogen und knusprig gebraten. Passt zu Bowls, Curry und Salat.',
  ing: ['400 g fester Naturtofu', '2 EL Sojasauce', '2 EL Speisestärke', '½ TL Knoblauchpulver', '½ TL Paprikapulver', '2 EL Öl', '#Glasur (optional)', '2 EL Sojasauce', '1 EL Ahornsirup', '1 TL Sriracha', '1 TL Reisessig'],
  prep: [
    ['mash', 'Tofu in ein Küchentuch wickeln, mit einem Brett und etwas Schwerem (Pfanne, Bücher) 15 Minuten pressen. Je trockener, desto knuspriger.', { t: 15 }],
    ['chop', 'In 2 cm große Würfel schneiden.'],
    ['season', 'Mit Sojasauce mischen, dann mit Stärke, Knoblauch- und Paprikapulver bestäuben, bis alle Seiten dünn überzogen sind.']
  ],
  m: {
    herd: { t: 30, s: [
      ['fry', 'Öl in einer beschichteten Pfanne bei mittlerer bis hoher Hitze erhitzen. Tofuwürfel in einer Lage hineinlegen.', { h: 'hoch' }],
      ['flip', 'Alle 2 Minuten wenden, insgesamt 8 bis 10 Minuten, bis alle Seiten goldbraun und knusprig sind.', { h: 'hoch', t: 9 }],
      ['simmer', 'Optional die Glasurzutaten zugeben und 1 Minute unter Schwenken einkochen.', { h: 'mittel', t: 1 }],
      ['serve', 'Sofort servieren.']
    ] },
    airfryer: { t: 30, s: [
      ['spread', 'Tofu mit 1 EL Öl beträufeln.'],
      ['airfry', 'Bei 200 °C 14 bis 16 Minuten garen, alle 5 Minuten schütteln.', { c: 200, t: 15 }],
      ['flip', 'Optional in einer Schüssel mit der in der Mikrowelle oder im Topf kurz erhitzten Glasur schwenken.'],
      ['serve', 'Servieren.']
    ] },
    ofen: { t: 40, s: [
      ['bake', 'Backofen auf 220 °C Umluft vorheizen.', { c: 220, mo: 'U' }],
      ['spread', 'Tofu mit Öl beträufeln und in einer Lage auf ein Blech mit Backpapier legen.'],
      ['bake', '25 bis 30 Minuten backen, nach 15 Minuten wenden.', { c: 220, mo: 'U', t: 27, i: 'tray' }],
      ['serve', 'Optional mit Glasur schwenken und servieren.']
    ] }
  }
},
{
  id: 'mujadara', n: 'Mujaddara', c: 'veggie', k: 'Libanon', d: 1, p: 4, v: 2,
  desc: 'Linsen und Reis mit sehr viel tief gebräunten Zwiebeln. Einfach, günstig und sättigend.',
  ing: ['200 g braune oder grüne Linsen', '200 g Basmatireis', '4 große Zwiebeln', '100 ml Olivenöl', '1,5 TL Kreuzkümmel', '1 TL Koriander, gemahlen', '½ TL Zimt', '1,5 TL Salz', '#Joghurt-Soße (vegan mit Sojajoghurt)', '250 g Joghurt', '½ Gurke, gerieben', '1 Knoblauchzehe', 'Minze'],
  prep: [['chop', 'Zwiebeln halbieren und in dünne Halbringe schneiden. Reis waschen.']],
  m: {
    herd: { t: 60, s: [
      ['simmer', 'Linsen mit 1 l Wasser aufkochen und 15 Minuten köcheln, bis sie fast gar sind. Abgießen, Kochwasser auffangen.', { h: 'mittel', t: 15 }],
      ['fry', 'Olivenöl in einer großen Pfanne erhitzen, Zwiebeln mit einer Prise Salz bei mittlerer bis hoher Hitze 25 bis 30 Minuten braten, bis sie tief dunkelbraun und teils knusprig sind. Regelmäßig wenden.', { h: 'mittel', t: 28 }],
      ['prep', 'Ein Drittel der Zwiebeln herausnehmen und auf Küchenpapier legen, sie werden beim Abkühlen knusprig.'],
      ['stir', 'Gewürze zu den restlichen Zwiebeln geben, 30 Sekunden rösten. Reis zugeben und 1 Minute mitrösten.', { sec: 90 }],
      ['simmer', 'Linsen und 450 ml Linsenkochwasser (mit Wasser auffüllen) zugeben, salzen, aufkochen. Mit Deckel 15 Minuten bei niedriger Hitze garen.', { h: 'niedrig', t: 15 }],
      ['rest', 'Herd aus, 10 Minuten mit Deckel ruhen lassen.', { t: 10 }],
      ['stir', 'Joghurt mit Gurke, Knoblauch, gehackter Minze und Salz verrühren.'],
      ['serve', 'Mujaddara mit einer Gabel auflockern und mit den knusprigen Zwiebeln und Joghurtsoße servieren.']
    ] }
  }
}
);
