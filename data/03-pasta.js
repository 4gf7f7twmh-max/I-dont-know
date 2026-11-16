/* Pasta & Nudeln */
R(
{
  id: 'carbonara', n: 'Spaghetti Carbonara', c: 'pasta', k: 'Italien', d: 2, p: 2,
  desc: 'Das römische Original: Ei, Pecorino, Guanciale und Pfeffer. Keine Sahne.',
  ing: ['200 g Spaghetti', '100 g Guanciale (ersatzweise Pancetta)', '3 Eigelb', '1 ganzes Ei', '50 g Pecorino Romano, fein gerieben', 'Schwarzer Pfeffer, frisch gemahlen', 'Salz für das Nudelwasser'],
  prep: [
    ['chop', 'Guanciale in 1 cm breite und 3 mm dicke Streifen schneiden.'],
    ['whisk', 'Eigelbe, Ei, Pecorino und reichlich Pfeffer in einer Schüssel zu einer dicken Creme verrühren.']
  ],
  m: {
    herd: { t: 20, s: [
      ['boil', 'Wasser in einem großen Topf aufkochen und salzen (ca. 10 g Salz pro Liter). Spaghetti 1 Minute kürzer als auf der Packung kochen.', { h: 'hoch', t: 9 }],
      ['fry', 'Guanciale ohne Öl in eine kalte Pfanne legen und bei mittlerer Hitze 6 bis 8 Minuten auslassen, bis die Streifen knusprig und das Fett geschmolzen ist. Pfanne vom Herd nehmen.', { h: 'mittel', t: 7 }],
      ['pour', 'Vor dem Abgießen eine Tasse Nudelwasser abschöpfen. Spaghetti direkt mit der Zange in die Pfanne zum Guanciale heben und durchschwenken.'],
      ['rest', 'Etwa 1 Minute warten, bis die Pfanne nicht mehr brutzelt. Ist sie zu heiß, stockt das Ei zu Rührei.', { t: 1 }],
      ['stir', 'Eiercreme und 3 EL Nudelwasser zugeben und kräftig rühren und schwenken, bis eine glänzende, cremige Soße entsteht. Ist sie zu dick, mehr Nudelwasser zugeben. Wird sie nicht cremig, die Pfanne kurz bei niedriger Hitze zurück auf den Herd stellen und dabei weiterrühren.'],
      ['serve', 'Sofort mit Pecorino und Pfeffer servieren.']
    ] }
  },
  tips: ['Guanciale ist Schweinebacke und hat mehr Geschmack als Speck. Es gibt ihn beim Metzger oder im italienischen Feinkostladen.', 'Ohne Fleisch: Zucchinischeiben in Olivenöl goldbraun braten und statt Guanciale verwenden.']
},
{
  id: 'bolognese', n: 'Ragù alla Bolognese', c: 'pasta', k: 'Italien', d: 2, p: 6,
  desc: 'Langsam geschmortes Fleischragù mit Milch und Wein. Dazu Tagliatelle, nicht Spaghetti.',
  ing: ['300 g Rinderhack', '200 g Schweinehack', '80 g Pancetta', '1 Zwiebel', '1 Möhre', '1 Stange Staudensellerie', '2 EL Olivenöl', '2 EL Tomatenmark', '150 ml trockener Rotwein oder Weißwein', '400 g passierte Tomaten', '200 ml Milch', '250 ml Rinderbrühe', 'Salz, Pfeffer, Muskat', '500 g Tagliatelle', 'Parmesan'],
  prep: [['chop', 'Zwiebel, Möhre und Sellerie sehr fein würfeln (2 bis 3 mm). Pancetta fein hacken.']],
  m: {
    herd: { t: 200, s: [
      ['fry', 'Olivenöl und Pancetta in einem schweren Topf bei mittlerer Hitze 3 Minuten auslassen. Gemüse zugeben und 10 Minuten weich dünsten.', { h: 'mittel', t: 13 }],
      ['fry', 'Hitze erhöhen, das Hack zugeben und krümelig braten, bis keine rosa Stellen mehr da sind und es leicht bräunt.', { h: 'hoch', t: 8 }],
      ['stir', 'Tomatenmark einrühren und 2 Minuten anrösten.', { t: 2 }],
      ['pour', 'Mit Wein ablöschen und vollständig einkochen lassen.', { h: 'mittel', t: 4 }],
      ['pour', 'Milch zugeben und ebenfalls fast vollständig einkochen. Die Milch macht das Fleisch zart.', { h: 'mittel', t: 6 }],
      ['pour', 'Passierte Tomaten und Brühe zugeben, mit Salz, Pfeffer und Muskat würzen.'],
      ['simmer', 'Halb zugedeckt bei kleinster Hitze 2 bis 3 Stunden schmoren. Gelegentlich umrühren, bei Bedarf Brühe nachgießen.', { h: 'niedrig', t: 150 }],
      ['boil', 'Tagliatelle in reichlich Salzwasser al dente kochen.', { h: 'hoch', t: 5 }],
      ['flip', 'Nudeln mit einer Kelle Nudelwasser direkt im Ragù schwenken.'],
      ['serve', 'Mit frisch geriebenem Parmesan servieren.']
    ] },
    tm: { t: 75, s: [
      ['tm', 'Zwiebel, Möhre, Sellerie und Pancetta in Stücken 5 Sek./Stufe 5 zerkleinern.', { sec: 5, s: 5 }],
      ['tm', 'Olivenöl zugeben, 5 Min./120 °C/Stufe 1 dünsten.', { t: 5, c: 120, s: 1 }],
      ['tm', 'Hack zugeben, 8 Min./120 °C/Linkslauf/Stufe 1 ohne Messbecher anbraten.', { t: 8, c: 120, l: true, s: 1 }],
      ['tm', 'Tomatenmark und Wein zugeben, 3 Min./120 °C/Linkslauf/Stufe 1 ohne Messbecher.', { t: 3, c: 120, l: true, s: 1 }],
      ['tm', 'Milch, passierte Tomaten, Brühe und Gewürze zugeben. Garkörbchen auf den Deckel stellen und 50 Min./98 °C/Linkslauf/Stufe 1 schmoren.', { t: 50, c: 98, l: true, s: 1 }],
      ['boil', 'Tagliatelle im Topf auf dem Herd kochen.', { h: 'hoch', t: 5 }],
      ['serve', 'Ragù abschmecken, mit den Nudeln mischen und mit Parmesan servieren.']
    ] },
    slow: { t: 500, s: [
      ['fry', 'Pancetta und Gemüse in der Pfanne dünsten, Hack scharf anbraten, Tomatenmark anrösten, mit Wein ablöschen.', { h: 'hoch', t: 20 }],
      ['slow', 'Alles mit Milch, Tomaten und nur 100 ml Brühe in den Slow Cooker geben (es verdampft kaum Flüssigkeit). LOW 8 Stunden.', { lvl: 'LOW', t: 480 }],
      ['boil', 'Tagliatelle al dente kochen.', { h: 'hoch', t: 5 }],
      ['serve', 'Abschmecken, mit den Nudeln mischen.']
    ] },
    dkt: { t: 70, s: [
      ['fry', 'Pancetta, Gemüse und Hack im offenen Topf anbraten, Tomatenmark anrösten, mit Wein und Milch ablöschen und einkochen.', { h: 'hoch', t: 25 }],
      ['pour', 'Tomaten und 150 ml Brühe zugeben, Boden gut freikratzen.'],
      ['pressure', '20 Minuten auf Hochdruck garen.', { t: 20, p: 'Hochdruck' }],
      ['simmer', 'Druck natürlich abbauen lassen. Offen 10 Minuten einkochen, bis das Ragù dick ist.', { h: 'mittel', t: 10 }],
      ['serve', 'Mit Tagliatelle und Parmesan servieren.']
    ] }
  },
  tips: ['Ragù schmeckt am nächsten Tag besser und lässt sich gut einfrieren.']
},
{
  id: 'aglio-olio', n: 'Spaghetti aglio, olio e peperoncino', c: 'pasta', k: 'Italien', d: 1, p: 2, v: 2,
  desc: 'Knoblauch, Olivenöl, Chili. In der Zeit fertig, in der die Nudeln kochen.',
  ing: ['200 g Spaghetti', '4 Knoblauchzehen', '6 EL gutes Olivenöl', '1 getrocknete Chili oder ½ TL Chiliflocken', '½ Bund glatte Petersilie', 'Salz'],
  prep: [['chop', 'Knoblauch in hauchdünne Scheiben schneiden, Chili zerbröseln, Petersilie fein hacken.']],
  m: {
    herd: { t: 15, s: [
      ['boil', 'Spaghetti in kräftig gesalzenem Wasser 1 Minute kürzer als angegeben kochen.', { h: 'hoch', t: 8 }],
      ['fry', 'Währenddessen Olivenöl mit Knoblauch und Chili in eine kalte Pfanne geben und bei niedriger Hitze langsam erwärmen. Der Knoblauch soll in 4 bis 5 Minuten hellgolden werden. Wird er braun, schmeckt er bitter.', { h: 'niedrig', t: 5 }],
      ['pour', 'Eine Kelle Nudelwasser in die Pfanne geben (Vorsicht, es spritzt).'],
      ['flip', 'Spaghetti tropfnass in die Pfanne heben und 1 Minute bei hoher Hitze kräftig schwenken, bis eine leicht cremige, emulgierte Soße an den Nudeln haftet.', { h: 'hoch', t: 1 }],
      ['serve', 'Petersilie unterheben und sofort servieren.']
    ] }
  }
},
{
  id: 'lasagne', n: 'Lasagne al forno', c: 'pasta', k: 'Italien', d: 3, p: 6,
  desc: 'Schichten aus Ragù, Béchamel und Nudelplatten, goldbraun überbacken.',
  ing: ['#Ragù', '500 g gemischtes Hack', '1 Zwiebel', '1 Möhre', '1 Stange Staudensellerie', '2 Knoblauchzehen', '2 EL Olivenöl', '2 EL Tomatenmark', '100 ml Rotwein', '700 g passierte Tomaten', 'Salz, Pfeffer, Oregano', '#Béchamel', '60 g Butter', '60 g Mehl', '800 ml Milch', 'Muskat, Salz', '#Außerdem', '250 g Lasagneplatten (ohne Vorkochen)', '100 g Parmesan, gerieben', '125 g Mozzarella'],
  prep: [['chop', 'Zwiebel, Möhre, Sellerie und Knoblauch fein würfeln.']],
  m: {
    ofen: { t: 110, s: [
      ['fry', 'Olivenöl erhitzen, Gemüse 5 Minuten dünsten. Hack zugeben und krümelig braun braten.', { h: 'hoch', t: 10 }],
      ['stir', 'Tomatenmark 1 Minute anrösten, mit Rotwein ablöschen, passierte Tomaten und 100 ml Wasser zugeben, würzen.', { h: 'mittel' }],
      ['simmer', '30 Minuten köcheln. Das Ragù sollte flüssiger sein als für Pasta, die Nudelplatten saugen Flüssigkeit auf.', { h: 'niedrig', t: 30 }],
      ['stir', 'Für die Béchamel Butter schmelzen, Mehl einrühren und 1 Minute hell anschwitzen.', { h: 'mittel', t: 1 }],
      ['whisk', 'Kalte Milch nach und nach mit dem Schneebesen einrühren. Unter Rühren aufkochen und 5 Minuten köcheln, bis die Soße dicklich ist. Mit Salz und Muskat würzen.', { h: 'mittel', t: 5 }],
      ['bake', 'Backofen auf 180 °C Ober-/Unterhitze vorheizen.', { c: 180, mo: 'OU' }],
      ['layer', 'In einer Auflaufform (ca. 30 x 20 cm) schichten: etwas Ragù, Nudelplatten, Ragù, Béchamel, Parmesan. Wiederholen, bis alles verbraucht ist (meist 4 Lagen). Mit Béchamel abschließen, mit Mozzarella und Parmesan belegen.'],
      ['bake', 'Auf mittlerer Schiene 40 bis 45 Minuten backen, bis die Oberfläche goldbraun ist und am Rand blubbert.', { c: 180, mo: 'OU', t: 45, i: 'dish' }],
      ['rest', 'Vor dem Anschneiden 15 Minuten ruhen lassen, sonst fällt sie auseinander.', { t: 15 }],
      ['serve', 'In Stücke schneiden und servieren.']
    ] },
    tm: { t: 110, note: 'Ragù und Béchamel macht der Thermomix, gebacken wird im Backofen.', s: [
      ['tm', 'Zwiebel, Möhre, Sellerie und Knoblauch 5 Sek./Stufe 5 zerkleinern. Öl zugeben, 4 Min./120 °C/Stufe 1.', { t: 4, c: 120, s: 1 }],
      ['tm', 'Hack zugeben, 8 Min./120 °C/Linkslauf/Stufe 1 ohne Messbecher.', { t: 8, c: 120, l: true, s: 1 }],
      ['tm', 'Tomatenmark, Wein, Tomaten, 100 ml Wasser und Gewürze zugeben, 25 Min./100 °C/Linkslauf/Stufe 1. Umfüllen, Mixtopf spülen.', { t: 25, c: 100, l: true, s: 1 }],
      ['tm', 'Für die Béchamel Butter, Mehl, Milch, Salz und Muskat in den Mixtopf geben, 10 Min./90 °C/Stufe 4.', { t: 10, c: 90, s: 4 }],
      ['layer', 'Ofen auf 180 °C Ober-/Unterhitze vorheizen. Lasagne wie beschrieben schichten.', { c: 180, mo: 'OU' }],
      ['bake', '40 bis 45 Minuten backen.', { c: 180, mo: 'OU', t: 45, i: 'dish' }],
      ['rest', '15 Minuten ruhen lassen und servieren.', { t: 15 }]
    ] }
  }
},
{
  id: 'mac-cheese', n: 'Mac and Cheese', c: 'pasta', k: 'USA', d: 1, p: 4, v: 1,
  desc: 'Makkaroni in Cheddar-Käsesoße. Cremig aus dem Topf oder mit knuspriger Kruste aus dem Ofen.',
  ing: ['300 g Makkaroni (Hörnchennudeln)', '40 g Butter', '40 g Mehl', '600 ml Milch', '200 g kräftiger Cheddar, gerieben', '50 g Gruyère oder Emmentaler, gerieben', '1 TL Senf', '½ TL Paprikapulver', 'Salz, Pfeffer', '#Für die Kruste (Ofen)', '40 g Panko-Paniermehl', '1 EL geschmolzene Butter'],
  m: {
    herd: { t: 25, s: [
      ['boil', 'Makkaroni in Salzwasser 2 Minuten kürzer als angegeben kochen, abgießen.', { h: 'hoch', t: 7 }],
      ['stir', 'Im selben Topf Butter schmelzen, Mehl einrühren und 1 Minute anschwitzen.', { h: 'mittel', t: 1 }],
      ['whisk', 'Milch nach und nach einrühren, unter Rühren aufkochen und 3 Minuten köcheln, bis die Soße andickt.', { h: 'mittel', t: 3 }],
      ['stir', 'Topf vom Herd nehmen. Käse handvollweise einrühren, bis er geschmolzen ist. Mit Senf, Paprika, Salz und Pfeffer würzen.'],
      ['stir', 'Nudeln zugeben und unterrühren.'],
      ['serve', 'Sofort servieren.']
    ] },
    ofen: { t: 45, s: [
      ['boil', 'Makkaroni 3 Minuten kürzer als angegeben kochen, abgießen.', { h: 'hoch', t: 6 }],
      ['whisk', 'Käsesoße wie beschrieben zubereiten: Butter und Mehl anschwitzen, Milch einrühren, andicken lassen, Käse einschmelzen, würzen.', { h: 'mittel', t: 6 }],
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen.', { c: 200, mo: 'OU' }],
      ['layer', 'Nudeln mit der Soße mischen und in eine gefettete Auflaufform füllen. Panko mit geschmolzener Butter mischen und darüberstreuen.'],
      ['bake', '20 Minuten backen, bis die Kruste goldbraun ist.', { c: 200, mo: 'OU', t: 20, i: 'dish' }],
      ['serve', '5 Minuten ruhen lassen, dann servieren.']
    ] },
    tm: { t: 30, s: [
      ['tm', 'Käse in Stücken 10 Sek./Stufe 8 reiben, umfüllen. (Fertig geriebener Käse geht auch.)', { sec: 10, s: 8 }],
      ['tm', 'Milch, 300 ml Wasser, Butter und Salz in den Mixtopf geben, 8 Min./100 °C/Stufe 1 aufkochen.', { t: 8, c: 100, s: 1 }],
      ['tm', 'Makkaroni zugeben und nach Packungsangabe plus 1 Minute bei 100 °C/Linkslauf/Sanftrührstufe ohne Messbecher garen. Die Nudeln garen direkt in der Milch, die Stärke bindet die Soße.', { t: 11, c: 100, l: true, s: 'sanft' }],
      ['tm', 'Käse, Senf und Gewürze zugeben, 1 Min./Linkslauf/Stufe 1 unterrühren.', { t: 1, l: true, s: 1 }],
      ['serve', 'Abschmecken und servieren.']
    ] }
  }
},
{
  id: 'pesto', n: 'Pesto Genovese', c: 'pasta', k: 'Italien', d: 1, p: 4, v: 1,
  desc: 'Basilikum, Pinienkerne, Parmesan und Pecorino. Mit Trofie, Linguine oder auf Brot.',
  ing: ['60 g Basilikumblätter (ca. 2 große Bund)', '30 g Pinienkerne', '1 kleine Knoblauchzehe', '40 g Parmesan, gerieben', '20 g Pecorino, gerieben', '100 ml mildes Olivenöl', '1 Prise grobes Salz', '400 g Pasta (Trofie oder Linguine)'],
  prep: [['fry', 'Pinienkerne in einer trockenen Pfanne bei mittlerer Hitze 3 Minuten hellgolden rösten. Abkühlen lassen.', { h: 'mittel', t: 3 }]],
  m: {
    kalt: { t: 20, note: 'Klassisch im Mörser, schneller mit einem Mixer oder Zerkleinerer.', s: [
      ['mash', 'Knoblauch mit dem groben Salz im Mörser zu einer Paste zerreiben. Pinienkerne zugeben und zerstoßen.'],
      ['mash', 'Basilikum portionsweise zugeben und mit kreisenden Bewegungen zerreiben, nicht stampfen. So oxidiert es weniger und bleibt grün.'],
      ['stir', 'Käse unterrühren, dann das Olivenöl in dünnem Strahl einrühren.'],
      ['boil', 'Pasta in Salzwasser al dente kochen, dabei eine Tasse Nudelwasser aufheben.', { h: 'hoch', t: 10 }],
      ['stir', 'Pesto mit 2 bis 3 EL Nudelwasser verdünnen und in einer Schüssel (nicht in der heißen Pfanne) mit den Nudeln mischen.'],
      ['serve', 'Sofort servieren.']
    ] },
    tm: { t: 20, s: [
      ['tm', 'Parmesan und Pecorino in Stücken 10 Sek./Stufe 10 reiben, umfüllen.', { sec: 10, s: 10 }],
      ['tm', 'Knoblauch, Pinienkerne und Salz 5 Sek./Stufe 7 zerkleinern.', { sec: 5, s: 7 }],
      ['tm', 'Basilikum und Olivenöl zugeben, 10 Sek./Stufe 6, nach unten schieben, nochmal 5 Sek./Stufe 6. Nicht länger, sonst wird es durch die Reibungswärme bitter.', { sec: 15, s: 6 }],
      ['tm', 'Käse zugeben, 10 Sek./Linkslauf/Stufe 3 unterrühren.', { sec: 10, l: true, s: 3 }],
      ['boil', 'Pasta auf dem Herd kochen, mit Pesto und etwas Nudelwasser mischen.', { h: 'hoch', t: 10 }],
      ['serve', 'Sofort servieren.']
    ] }
  },
  tips: ['Pesto mit einer Schicht Olivenöl bedeckt im Glas hält 5 Tage im Kühlschrank. In der Eiswürfelform eingefroren mehrere Monate.', 'Parmesan wird traditionell mit tierischem Lab hergestellt. Wer streng vegetarisch isst, nimmt einen Hartkäse mit mikrobiellem Lab.']
},
{
  id: 'cacio-e-pepe', n: 'Cacio e Pepe', c: 'pasta', k: 'Italien', d: 2, p: 2, v: 1,
  desc: 'Nur Pecorino, Pfeffer und Nudelwasser. Der Trick ist die richtige Temperatur.',
  ing: ['200 g Tonnarelli oder Spaghetti', '80 g Pecorino Romano, sehr fein gerieben', '2 TL schwarze Pfefferkörner', 'Salz'],
  m: {
    herd: { t: 20, s: [
      ['boil', 'Pasta in nur wenig, leicht gesalzenem Wasser kochen (ca. 1,5 l). So wird das Nudelwasser stärkehaltiger.', { h: 'hoch', t: 9 }],
      ['fry', 'Pfefferkörner grob zerstoßen und in einer großen Pfanne ohne Fett 1 Minute rösten, bis sie duften.', { h: 'mittel', t: 1 }],
      ['stir', 'Pecorino in einer Schüssel mit 3 bis 4 EL warmem (nicht kochendem) Nudelwasser zu einer dicken, glatten Paste verrühren.'],
      ['pour', 'Eine Kelle Nudelwasser zum Pfeffer in die Pfanne geben. Nudeln 2 Minuten vor Ende in die Pfanne heben und darin fertig garen.', { h: 'mittel', t: 2 }],
      ['rest', 'Pfanne vom Herd nehmen und 30 Sekunden abkühlen lassen. Bei über 70 °C verklumpt der Käse.', { sec: 30 }],
      ['flip', 'Käsepaste zugeben und kräftig schwenken und rühren, bis eine cremige Soße entsteht. Bei Bedarf Nudelwasser zugeben.'],
      ['serve', 'Mit extra Pecorino und Pfeffer sofort servieren.']
    ] }
  }
},
{
  id: 'arrabbiata', n: 'Penne all’arrabbiata', c: 'pasta', k: 'Italien', d: 1, p: 2, v: 2,
  desc: 'Scharfe Tomatensoße mit Knoblauch und Chili.',
  ing: ['200 g Penne rigate', '3 EL Olivenöl', '3 Knoblauchzehen', '1 bis 2 getrocknete Chilis', '400 g geschälte Tomaten (Dose)', 'Salz', '½ Bund Petersilie'],
  prep: [['chop', 'Knoblauch in feine Scheiben schneiden, Chili zerbröseln, Tomaten mit den Händen zerdrücken.']],
  m: {
    herd: { t: 25, s: [
      ['fry', 'Olivenöl mit Knoblauch und Chili bei mittlerer Hitze 2 Minuten erhitzen, bis der Knoblauch zu brutzeln beginnt.', { h: 'mittel', t: 2 }],
      ['simmer', 'Tomaten zugeben, salzen und 15 Minuten köcheln, bis sich das Öl an der Oberfläche absetzt.', { h: 'mittel', t: 15 }],
      ['boil', 'Penne al dente kochen.', { h: 'hoch', t: 11 }],
      ['flip', 'Nudeln mit etwas Nudelwasser in der Soße schwenken.', { h: 'hoch', t: 1 }],
      ['serve', 'Mit Petersilie servieren.']
    ] },
    tm: { t: 25, s: [
      ['tm', 'Knoblauch und Chili 3 Sek./Stufe 7 zerkleinern. Olivenöl zugeben, 2 Min./120 °C/Stufe 1.', { t: 2, c: 120, s: 1 }],
      ['tm', 'Tomaten, 500 g Wasser und 1 TL Salz zugeben, 6 Min./100 °C/Stufe 1 aufkochen.', { t: 6, c: 100, s: 1 }],
      ['tm', 'Penne zugeben und nach Packungsangabe plus 2 Minuten bei 100 °C/Linkslauf/Sanftrührstufe garen (One-Pot im Mixtopf).', { t: 13, c: 100, l: true, s: 'sanft' }],
      ['serve', 'Kurz ruhen lassen, mit Petersilie servieren.']
    ] }
  }
},
{
  id: 'kaesespaetzle', n: 'Allgäuer Käsespätzle', c: 'pasta', k: 'Deutschland', d: 2, p: 4, v: 1,
  desc: 'Frische Spätzle in Lagen mit würzigem Bergkäse und Röstzwiebeln.',
  ing: ['#Spätzleteig', '400 g Weizenmehl (Type 405 oder Spätzlemehl)', '4 Eier', '150 ml Mineralwasser mit Kohlensäure', '1 TL Salz', '#Außerdem', '250 g Allgäuer Bergkäse oder Emmentaler, gerieben', '3 Zwiebeln', '40 g Butter', 'Pfeffer', 'Schnittlauch'],
  prep: [
    ['mix', 'Mehl, Eier, Salz und Wasser mit einem Kochlöffel oder den Knethaken kräftig schlagen, bis der Teig zäh ist und Blasen wirft (ca. 5 Minuten). Er soll langsam vom Löffel reißen.', { t: 5 }],
    ['rest', 'Teig 15 Minuten quellen lassen.', { t: 15 }],
    ['chop', 'Zwiebeln in dünne Ringe schneiden.']
  ],
  m: {
    herd: { t: 60, s: [
      ['fry', 'Butter in einer großen Pfanne erhitzen, Zwiebelringe bei mittlerer Hitze 15 Minuten goldbraun braten. Herausnehmen.', { h: 'mittel', t: 15 }],
      ['boil', 'Reichlich Salzwasser aufkochen. Teig portionsweise mit einem Spätzlehobel (oder einer Presse) ins siedende Wasser streichen.', { h: 'hoch' }],
      ['boil', 'Sobald die Spätzle an die Oberfläche steigen (nach 1 bis 2 Minuten), mit einer Schaumkelle herausheben und gut abtropfen lassen.', { h: 'mittel', t: 2 }],
      ['layer', 'Spätzle sofort lagenweise mit Käse in die Pfanne mit dem Zwiebelfett schichten. Jede Lage pfeffern.'],
      ['stir', 'Bei niedriger Hitze mit Deckel 3 Minuten warten, bis der Käse schmilzt, dann einmal durchheben.', { h: 'niedrig', t: 3 }],
      ['serve', 'Mit Röstzwiebeln und Schnittlauch servieren. Dazu passt grüner Salat.']
    ] },
    ofen: { t: 70, note: 'Praktisch für Gäste: Die Spätzle werden vorbereitet und im Ofen fertig überbacken.', s: [
      ['fry', 'Zwiebelringe in Butter goldbraun braten.', { h: 'mittel', t: 15 }],
      ['boil', 'Spätzle wie beschrieben ins Salzwasser schaben und abschöpfen, wenn sie oben schwimmen.', { h: 'hoch', t: 2 }],
      ['bake', 'Backofen auf 180 °C Umluft vorheizen.', { c: 180, mo: 'U' }],
      ['layer', 'Spätzle lagenweise mit Käse und Pfeffer in eine gefettete Auflaufform schichten, mit Käse abschließen.'],
      ['bake', '15 Minuten überbacken, bis der Käse geschmolzen und leicht gebräunt ist.', { c: 180, mo: 'U', t: 15, i: 'dish' }],
      ['serve', 'Röstzwiebeln und Schnittlauch darüber und servieren.']
    ] }
  }
},
{
  id: 'gnocchi', n: 'Kartoffelgnocchi mit Salbeibutter', c: 'pasta', k: 'Italien', d: 3, p: 4, v: 1,
  desc: 'Selbstgemachte Gnocchi aus mehligen Kartoffeln. Je weniger Mehl, desto zarter.',
  ing: ['1 kg mehligkochende Kartoffeln', '200 g Weizenmehl (Type 00 oder 405), plus Mehl zum Arbeiten', '1 Eigelb', '1 TL Salz', 'Muskat', '#Salbeibutter', '80 g Butter', '12 Salbeiblätter', 'Parmesan'],
  m: {
    ofen: { t: 100, note: 'Im Ofen gebacken werden die Kartoffeln trockener, die Gnocchi brauchen weniger Mehl.', s: [
      ['bake', 'Kartoffeln ungeschält auf ein Bett aus grobem Salz legen und bei 200 °C Ober-/Unterhitze 60 Minuten backen, bis sie ganz weich sind.', { c: 200, mo: 'OU', t: 60, i: 'tray' }],
      ['mash', 'Noch heiß halbieren, das Innere auslöffeln und durch eine Kartoffelpresse auf die bemehlte Arbeitsfläche drücken. 5 Minuten ausdampfen lassen.', { t: 5 }],
      ['knead', 'Eigelb, Salz, Muskat und drei Viertel des Mehls zugeben und nur kurz zu einem weichen Teig zusammendrücken. Klebt er stark, etwas Mehl zugeben. Nicht lange kneten, sonst werden die Gnocchi zäh.'],
      ['roll', 'Teig in Portionen zu daumendicken Rollen formen und in 2 cm lange Stücke schneiden. Nach Wunsch über eine Gabel rollen, damit Rillen entstehen.'],
      ['boil', 'Gnocchi portionsweise in siedendes Salzwasser geben. Sobald sie aufsteigen, noch 30 Sekunden ziehen lassen und herausheben.', { h: 'mittel', sec: 90 }],
      ['fry', 'Butter in einer Pfanne aufschäumen lassen, Salbeiblätter darin knusprig braten, bis die Butter nussig braun riecht.', { h: 'mittel', t: 3 }],
      ['flip', 'Gnocchi kurz in der Salbeibutter schwenken.'],
      ['serve', 'Mit Parmesan servieren.']
    ] },
    herd: { t: 75, s: [
      ['boil', 'Kartoffeln ungeschält in Salzwasser 25 bis 30 Minuten weich kochen.', { h: 'mittel', t: 28 }],
      ['mash', 'Abgießen, kurz ausdampfen lassen, heiß pellen und durch die Kartoffelpresse drücken. 10 Minuten abkühlen lassen.', { t: 10 }],
      ['knead', 'Eigelb, Salz, Muskat und Mehl zugeben, kurz zu einem weichen Teig zusammenfügen.'],
      ['roll', 'Rollen formen, in 2 cm Stücke schneiden, optional über eine Gabel rollen.'],
      ['boil', 'In siedendem Salzwasser garen, bis sie aufsteigen, plus 30 Sekunden.', { h: 'mittel', sec: 90 }],
      ['fry', 'Salbeibutter zubereiten und die Gnocchi darin schwenken.', { h: 'mittel', t: 3 }],
      ['serve', 'Mit Parmesan servieren.']
    ] },
    mikro: { t: 60, s: [
      ['micro', 'Kartoffeln mehrmals mit einer Gabel einstechen und ungeschält bei 800 Watt 12 bis 15 Minuten garen, nach der Hälfte wenden.', { t: 14, w: 800 }],
      ['mash', 'Heiß halbieren, auslöffeln und durch die Presse drücken. Ausdampfen lassen.', { t: 5 }],
      ['knead', 'Mit Eigelb, Salz, Muskat und Mehl kurz zu einem Teig verbinden.'],
      ['roll', 'Rollen formen und in Stücke schneiden.'],
      ['boil', 'Im Topf auf dem Herd in siedendem Salzwasser garen.', { h: 'mittel', sec: 90 }],
      ['fry', 'In Salbeibutter schwenken und mit Parmesan servieren.', { h: 'mittel', t: 3 }]
    ] }
  },
  tips: ['Erst einen Test-Gnocco kochen. Zerfällt er, etwas mehr Mehl in den Teig arbeiten.', 'Roh auf einem bemehlten Blech einfrieren und dann in Beutel füllen. Gefroren direkt ins Wasser geben.']
},
{
  id: 'pad-thai', n: 'Pad Thai', c: 'pasta', k: 'Thailand', d: 2, p: 2,
  desc: 'Gebratene Reisnudeln mit Tamarinde, Garnelen, Ei, Erdnüssen und Sprossen.',
  ing: ['150 g Reisbandnudeln (3 mm breit)', '#Soße', '3 EL Tamarindenpaste', '2 EL Fischsauce', '2 EL brauner Zucker oder Palmzucker', '1 TL Sriracha oder Chiliflocken', '#Wok', '3 EL neutrales Öl', '200 g Garnelen oder Tofu', '2 Knoblauchzehen', '1 Schalotte', '2 Eier', '100 g Mungbohnensprossen', '3 Frühlingszwiebeln', '40 g geröstete Erdnüsse, gehackt', '1 Limette', 'Koriander'],
  prep: [
    ['rest', 'Reisnudeln 30 Minuten in lauwarmem Wasser einweichen, bis sie biegsam, aber noch fest sind. Abgießen.', { t: 30 }],
    ['stir', 'Tamarinde, Fischsauce, Zucker und Sriracha verrühren, bis sich der Zucker löst.'],
    ['chop', 'Knoblauch und Schalotte fein hacken, Frühlingszwiebeln in 3 cm Stücke schneiden.']
  ],
  m: {
    herd: { t: 45, note: 'Alles vor dem Start bereitstellen: Im Wok geht es sehr schnell.', s: [
      ['flip', 'Wok oder große Pfanne auf höchster Stufe stark erhitzen, 1 EL Öl zugeben. Garnelen 1 bis 2 Minuten braten, bis sie rosa sind. Herausnehmen.', { h: 'max', t: 2 }],
      ['flip', 'Restliches Öl zugeben, Knoblauch und Schalotte 20 Sekunden anbraten.', { h: 'max', sec: 20 }],
      ['flip', 'Nudeln und Soße zugeben und 2 bis 3 Minuten unter ständigem Wenden braten, bis die Soße aufgesogen ist. Sind die Nudeln noch hart, 2 EL Wasser zugeben.', { h: 'hoch', t: 3 }],
      ['fry', 'Nudeln an den Rand schieben, Eier in die freie Stelle schlagen, kurz stocken lassen und zerrühren, dann untermischen.', { h: 'hoch', t: 1 }],
      ['flip', 'Garnelen, die Hälfte der Sprossen und die Frühlingszwiebeln zugeben und 30 Sekunden durchschwenken.', { h: 'hoch', sec: 30 }],
      ['serve', 'Mit Erdnüssen, restlichen Sprossen, Limettenspalten und Koriander servieren.']
    ] }
  }
},
{
  id: 'one-pot-pasta', n: 'One-Pot-Pasta mit Tomate und Spinat', c: 'pasta', k: 'International', d: 1, p: 4, v: 1,
  desc: 'Nudeln, Soße und Gemüse garen zusammen in einem Topf. Kaum Abwasch.',
  ing: ['400 g Spaghetti oder Linguine', '250 g Kirschtomaten', '1 Zwiebel', '3 Knoblauchzehen', '1 l Gemüsebrühe', '2 EL Olivenöl', '1 TL getrockneter Oregano', '½ TL Chiliflocken', '100 g Babyspinat', '50 g Parmesan', 'Salz, Pfeffer', 'Basilikum'],
  prep: [['chop', 'Zwiebel in feine Streifen, Knoblauch in Scheiben schneiden, Tomaten halbieren.']],
  m: {
    herd: { t: 25, s: [
      ['pour', 'Rohe Spaghetti, Tomaten, Zwiebel, Knoblauch, Olivenöl, Oregano und Chili in einen breiten Topf oder eine hohe Pfanne geben. Brühe darübergießen, die Nudeln sollten bedeckt sein.'],
      ['boil', 'Aufkochen und offen 9 bis 11 Minuten kochen. Alle 1 bis 2 Minuten mit einer Zange umrühren, damit nichts verklebt.', { h: 'hoch', t: 10 }],
      ['stir', 'Wenn die Nudeln al dente sind und nur noch wenig sämige Flüssigkeit übrig ist, Spinat unterheben, bis er zusammenfällt.'],
      ['season', 'Parmesan einrühren, mit Salz und Pfeffer abschmecken.'],
      ['serve', 'Mit Basilikum servieren.']
    ] },
    tm: { t: 25, note: 'Lange Nudeln einmal in der Mitte durchbrechen, damit sie in den Mixtopf passen.', s: [
      ['tm', 'Zwiebel und Knoblauch 3 Sek./Stufe 5 zerkleinern. Olivenöl zugeben, 3 Min./120 °C/Stufe 1.', { t: 3, c: 120, s: 1 }],
      ['tm', 'Brühe (nur 900 ml), Tomaten, Oregano und Chili zugeben, 7 Min./100 °C/Stufe 1 aufkochen.', { t: 7, c: 100, s: 1 }],
      ['tm', 'Gebrochene Spaghetti durch die Deckelöffnung zugeben und nach Packungsangabe plus 2 Min./100 °C/Linkslauf/Sanftrührstufe ohne Messbecher garen.', { t: 12, c: 100, l: true, s: 'sanft' }],
      ['tm', 'Spinat und Parmesan zugeben, 1 Min./Linkslauf/Sanftrührstufe unterrühren.', { t: 1, l: true, s: 'sanft' }],
      ['serve', 'Abschmecken und servieren.']
    ] }
  }
},
{
  id: 'spaghetti-pomodoro', n: 'Spaghetti al pomodoro', c: 'pasta', k: 'Italien', d: 1, p: 4, v: 2,
  desc: 'Die Grund-Tomatensoße, die man immer können sollte.',
  ing: ['400 g Spaghetti', '800 g geschälte San-Marzano-Tomaten (2 Dosen)', '4 EL Olivenöl', '2 Knoblauchzehen', '1 Bund Basilikum', 'Salz', '1 Prise Zucker (nur bei sauren Tomaten)'],
  m: {
    herd: { t: 35, s: [
      ['chop', 'Knoblauch schälen und leicht andrücken. Tomaten in einer Schüssel mit der Hand zerdrücken.'],
      ['fry', 'Olivenöl mit dem Knoblauch bei niedriger Hitze erwärmen, bis er leicht golden ist (3 Minuten). Knoblauch herausnehmen.', { h: 'niedrig', t: 3 }],
      ['simmer', 'Tomaten und einen Basilikumzweig zugeben, salzen und offen 20 bis 25 Minuten köcheln, bis die Soße eindickt.', { h: 'niedrig', t: 22 }],
      ['boil', 'Spaghetti in Salzwasser 1 Minute kürzer als angegeben kochen.', { h: 'hoch', t: 9 }],
      ['flip', 'Nudeln mit einer Kelle Nudelwasser in der Soße 1 Minute schwenken.', { h: 'hoch', t: 1 }],
      ['serve', 'Mit frischem Basilikum und einem Faden Olivenöl servieren.']
    ] },
    tm: { t: 35, s: [
      ['tm', 'Knoblauch 3 Sek./Stufe 7 zerkleinern. Olivenöl zugeben, 2 Min./120 °C/Stufe 1.', { t: 2, c: 120, s: 1 }],
      ['tm', 'Tomaten und Salz zugeben, 3 Sek./Stufe 4 zerkleinern.', { sec: 3, s: 4 }],
      ['tm', 'Garkörbchen auf den Deckel stellen, 20 Min./100 °C/Stufe 1 einkochen.', { t: 20, c: 100, s: 1 }],
      ['boil', 'Spaghetti auf dem Herd kochen und mit der Soße schwenken.', { h: 'hoch', t: 9 }],
      ['serve', 'Mit Basilikum servieren.']
    ] }
  }
}
);
