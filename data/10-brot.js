/* Brot & Gebäck */
R(
{
  id: 'broetchen', n: 'Knusprige Brötchen über Nacht', c: 'brot', k: 'Deutschland', d: 2, p: 8, v: 2, pu: 'Brötchen',
  desc: 'Am Abend angerührt, morgens nur noch formen und backen. Mit sehr wenig Hefe.',
  ing: ['500 g Weizenmehl Type 550', '350 ml kaltes Wasser', '5 g frische Hefe (oder 2 g Trockenhefe)', '10 g Salz', '1 TL Honig oder Zucker'],
  m: {
    ofen: { t: 720, note: 'Gesamtzeit inklusive 10 Stunden Teigruhe im Kühlschrank. Aktive Arbeitszeit ca. 25 Minuten.', s: [
      ['stir', 'Hefe und Honig im Wasser auflösen.'],
      ['knead', 'Mit Mehl und Salz 8 Minuten kneten, bis der Teig glatt ist und sich vom Schüsselrand löst. Er bleibt leicht klebrig.', { t: 8 }],
      ['chill', 'In einer geölten, abgedeckten Schüssel 10 bis 12 Stunden in den Kühlschrank stellen.', { t: 600 }],
      ['bake', 'Backofen mit einem Blech und einer ofenfesten Schale auf dem Boden auf 240 °C Ober-/Unterhitze vorheizen.', { c: 240, mo: 'OU', t: 30 }],
      ['shape', 'Teig auf eine bemehlte Fläche kippen, nicht mehr kneten. In 8 Stücke teilen, die Ränder zur Mitte falten und mit dem Schluss nach unten rund schleifen.'],
      ['rest', 'Auf Backpapier 20 Minuten ruhen lassen, dann mit einem scharfen Messer einschneiden und mit Wasser besprühen.', { t: 20 }],
      ['bake', 'Mit dem Papier aufs heiße Blech ziehen. Eine Tasse Wasser in die heiße Schale gießen (Dampf) und sofort die Tür schließen. 20 bis 22 Minuten backen.', { c: 240, mo: 'OU', t: 21, i: 'cookies' }],
      ['bake', 'Nach 10 Minuten die Tür kurz öffnen, damit der Dampf entweicht. So wird die Kruste knusprig.', { c: 230, mo: 'OU' }],
      ['cool', 'Auf einem Gitter 10 Minuten auskühlen lassen. Sie knistern dabei.', { t: 10 }]
    ] },
    tm: { t: 720, s: [
      ['tm', 'Wasser, Hefe und Honig 1 Min./Stufe 2 verrühren.', { t: 1, s: 2 }],
      ['tm', 'Mehl und Salz zugeben, 4 Min./Teigstufe kneten.', { t: 4, s: 'teig' }],
      ['chill', 'In einer geölten Schüssel 10 bis 12 Stunden kühlen.', { t: 600 }],
      ['shape', 'Ofen auf 240 °C vorheizen. Teig teilen und rund schleifen.', { c: 240, mo: 'OU' }],
      ['rest', '20 Minuten ruhen lassen, einschneiden.', { t: 20 }],
      ['bake', 'Mit Dampf 20 bis 22 Minuten backen.', { c: 240, mo: 'OU', t: 21, i: 'cookies' }]
    ] },
    airfryer: { t: 720, note: '4 Brötchen pro Durchgang, je nach Korbgröße.', s: [
      ['knead', 'Teig wie beschrieben herstellen und über Nacht im Kühlschrank gehen lassen.', { t: 8 }],
      ['shape', 'Brötchen formen, 20 Minuten ruhen lassen, einschneiden und mit Wasser besprühen.', { t: 20 }],
      ['airfry', 'Bei 200 °C 10 Minuten backen.', { c: 200, t: 10 }],
      ['flip', 'Wenden, damit die Unterseite bräunt.'],
      ['airfry', 'Weitere 4 bis 6 Minuten backen.', { c: 200, t: 5 }],
      ['cool', 'Auskühlen lassen.', { t: 10 }]
    ] }
  }
},
{
  id: 'focaccia', n: 'Focaccia', c: 'brot', k: 'Italien', d: 1, p: 8, v: 2, pu: 'Stücke',
  desc: 'Sehr weicher Teig ohne Kneten, viel Olivenöl, Dellen mit den Fingern. Blech 30 x 40 cm.',
  ing: ['500 g Weizenmehl Type 550 oder Pizzamehl', '400 ml lauwarmes Wasser', '4 g Trockenhefe', '10 g Salz', '80 ml Olivenöl', 'Flockensalz', 'Rosmarin, Kirschtomaten oder Oliven'],
  m: {
    ofen: { t: 180, s: [
      ['stir', 'Mehl, Hefe, Salz und Wasser mit einem Löffel verrühren, bis kein trockenes Mehl mehr da ist. Der Teig ist sehr weich.'],
      ['rest', '30 Minuten abgedeckt ruhen lassen.', { t: 30 }],
      ['fold', 'Mit nassen Händen einen Rand des Teigs anheben und zur Mitte falten. Schüssel drehen und von allen vier Seiten wiederholen. Nach 30 Minuten noch zweimal wiederholen.', { t: 60 }],
      ['rest', 'Abgedeckt 1 Stunde gehen lassen.', { t: 60 }],
      ['spread', '4 EL Olivenöl auf dem Blech verteilen, Teig darauf geben und vorsichtig bis in die Ecken ziehen. Zieht er sich zurück, 10 Minuten warten und noch einmal ziehen.'],
      ['rest', 'Weitere 30 Minuten gehen lassen. Backofen auf 230 °C Ober-/Unterhitze vorheizen.', { t: 30, c: 230, mo: 'OU' }],
      ['shape', 'Restliches Öl darübergießen. Mit geölten Fingern tiefe Dellen bis zum Blechboden drücken. Mit Rosmarin, Tomaten und Flockensalz belegen.'],
      ['bake', 'Im unteren Drittel 20 bis 25 Minuten goldbraun backen.', { c: 230, mo: 'OU', t: 22, i: 'tray' }],
      ['cool', 'Kurz auf einem Gitter abkühlen lassen, damit der Boden knusprig bleibt.', { t: 10 }]
    ] }
  }
},
{
  id: 'brezeln', n: 'Laugenbrezeln', c: 'brot', k: 'Deutschland', d: 3, p: 8, v: 2, pu: 'Brezeln',
  desc: 'Mit Natronlauge aus der Küche statt Natriumhydroxid. Der Bauch dick, die Ärmchen dünn.',
  ing: ['500 g Weizenmehl Type 550', '270 ml kaltes Wasser', '10 g frische Hefe', '10 g Salz', '30 g weiche Butter', '#Lauge', '1 l Wasser', '60 g Natron (Backnatron)', 'Grobes Brezelsalz'],
  m: {
    ofen: { t: 150, note: 'Echte Brezellauge (Natriumhydroxid) ist ätzend und braucht Handschuhe und Schutzbrille. Mit gekochtem Natron gelingt eine sichere Variante, die Farbe wird etwas heller.', s: [
      ['knead', 'Alle Teigzutaten 10 Minuten zu einem festen, glatten Teig kneten.', { t: 10 }],
      ['rest', '30 Minuten abgedeckt ruhen lassen.', { t: 30 }],
      ['shape', 'In 8 Stücke à ca. 100 g teilen, zu kurzen Rollen formen und 10 Minuten entspannen lassen.', { t: 10 }],
      ['roll', 'Jede Rolle zu einem 60 cm langen Strang rollen: in der Mitte dick lassen, zu den Enden hin dünn auslaufen lassen.'],
      ['shape', 'Strang zu einem U legen, Enden zweimal umeinanderschlingen und auf den dicken Bauch drücken.'],
      ['chill', 'Unabgedeckt 30 Minuten in den Kühlschrank legen. Die Haut trocknet an, die Brezeln lassen sich besser in die Lauge tauchen.', { t: 30 }],
      ['boil', 'Wasser aufkochen, Natron langsam einrühren (schäumt stark). Brezeln einzeln mit einem Schaumlöffel 30 Sekunden in die simmernde Lauge legen.', { h: 'mittel', sec: 30 }],
      ['season', 'Auf ein Blech mit Backpapier legen, den Bauch mit einem scharfen Messer einschneiden und mit Brezelsalz bestreuen.'],
      ['bake', 'Bei 220 °C Ober-/Unterhitze 15 bis 18 Minuten backen, bis sie tief braun sind.', { c: 220, mo: 'OU', t: 17, i: 'cookies' }],
      ['cool', 'Auf einem Gitter abkühlen lassen.', { t: 10 }]
    ] }
  }
},
{
  id: 'zimtschnecken', n: 'Zimtschnecken', c: 'brot', k: 'Schweden', d: 2, p: 12, v: 1, pu: 'Schnecken',
  desc: 'Fluffiger Hefeteig mit Zimt-Butter-Zucker, auf Wunsch mit Frischkäse-Glasur.',
  ing: ['#Teig', '500 g Mehl', '250 ml lauwarme Milch', '1 Päckchen Trockenhefe (7 g)', '60 g Zucker', '80 g weiche Butter', '1 Ei', '½ TL Salz', '1 TL Kardamom, gemahlen (optional)', '#Füllung', '100 g sehr weiche Butter', '100 g brauner Zucker', '2 EL Zimt', '#Glasur', '100 g Frischkäse', '80 g Puderzucker', '1 EL Milch'],
  prep: [
    ['knead', 'Alle Teigzutaten 8 Minuten zu einem weichen, glatten Teig kneten.', { t: 8 }],
    ['rest', 'Abgedeckt an einem warmen Ort 1 Stunde gehen lassen.', { t: 60 }],
    ['stir', 'Butter, braunen Zucker und Zimt zu einer streichfähigen Paste verrühren.'],
    ['roll', 'Teig auf bemehlter Fläche zu einem Rechteck von 30 x 45 cm ausrollen.'],
    ['spread', 'Zimtbutter gleichmäßig verstreichen, an einer Längsseite 1 cm frei lassen.'],
    ['shape', 'Von der anderen Längsseite her straff aufrollen. Mit einem Faden oder scharfen Messer in 12 Scheiben schneiden.']
  ],
  m: {
    ofen: { t: 140, s: [
      ['layer', 'Schnecken in eine gefettete Form (ca. 24 x 34 cm) setzen, mit etwas Abstand.'],
      ['rest', '30 Minuten gehen lassen. Backofen auf 180 °C Ober-/Unterhitze vorheizen.', { t: 30, c: 180, mo: 'OU' }],
      ['bake', '22 bis 25 Minuten goldbraun backen.', { c: 180, mo: 'OU', t: 23, i: 'cookies' }],
      ['mix', 'Frischkäse, Puderzucker und Milch glatt rühren.'],
      ['spread', 'Glasur auf die noch warmen Schnecken streichen.']
    ] },
    tm: { t: 140, note: 'Teig im Thermomix kneten: Milch, Hefe und Zucker 2 Min./37 °C/Stufe 2, dann übrige Zutaten 3 Min./Teigstufe.', s: [
      ['layer', 'Geformte Schnecken in die Form setzen.'],
      ['rest', '30 Minuten gehen lassen.', { t: 30 }],
      ['bake', 'Bei 180 °C 22 bis 25 Minuten backen.', { c: 180, mo: 'OU', t: 23, i: 'cookies' }],
      ['tm', 'Frischkäse, Puderzucker und Milch 15 Sek./Stufe 3 verrühren und auf die warmen Schnecken streichen.', { sec: 15, s: 3 }]
    ] },
    airfryer: { t: 130, s: [
      ['layer', '4 bis 6 Schnecken in eine passende Form oder auf Backpapier in den Korb setzen.'],
      ['rest', '30 Minuten gehen lassen.', { t: 30 }],
      ['airfry', 'Bei 160 °C 12 bis 14 Minuten backen. Werden sie zu dunkel, mit Folie abdecken.', { c: 160, t: 13 }],
      ['spread', 'Mit Glasur bestreichen.']
    ] }
  }
},
{
  id: 'naan', n: 'Naan', c: 'brot', k: 'Indien', d: 1, p: 6, v: 1, pu: 'Fladen',
  desc: 'Weiche Fladenbrote mit Joghurt, in der heißen Pfanne gebacken und mit Knoblauchbutter bestrichen.',
  ing: ['300 g Mehl', '1 TL Trockenhefe', '1 TL Zucker', '1 TL Salz', '½ TL Backpulver', '125 g Naturjoghurt', '100 ml lauwarmes Wasser', '2 EL Öl oder Ghee', '#Knoblauchbutter', '40 g Butter', '2 Knoblauchzehen', 'Koriander'],
  prep: [
    ['knead', 'Alle Teigzutaten 5 Minuten zu einem weichen, leicht klebrigen Teig kneten.', { t: 5 }],
    ['rest', 'Abgedeckt 1 Stunde gehen lassen.', { t: 60 }],
    ['shape', 'In 6 Stücke teilen und zu Kugeln formen.'],
    ['roll', 'Jede Kugel oval auf ca. 5 mm ausrollen oder mit den Händen ziehen.'],
    ['stir', 'Butter mit gepresstem Knoblauch schmelzen.']
  ],
  m: {
    herd: { t: 90, s: [
      ['fry', 'Eine Gusseisenpfanne ohne Fett auf hoher Stufe sehr heiß werden lassen.', { h: 'hoch' }],
      ['fry', 'Naan hineinlegen. Nach 1 bis 2 Minuten wirft er große Blasen und die Unterseite hat dunkle Flecken.', { h: 'hoch', t: 2 }],
      ['flip', 'Wenden und 1 Minute backen.', { h: 'hoch', t: 1 }],
      ['spread', 'Sofort mit Knoblauchbutter bestreichen, mit Koriander bestreuen und in ein Tuch einschlagen, damit er weich bleibt.']
    ] },
    ofen: { t: 90, s: [
      ['bake', 'Backofen mit einem umgedrehten Blech oder Pizzastein auf höchster Stufe (250 °C) mit Grill vorheizen.', { c: 250, mo: 'UG' }],
      ['bake', 'Naan auf das heiße Blech legen und 3 bis 4 Minuten backen, bis er aufgeht und braune Flecken bekommt.', { c: 250, mo: 'UG', t: 4, i: 'pizza' }],
      ['spread', 'Mit Knoblauchbutter bestreichen.']
    ] },
    grill: { t: 90, s: [
      ['grill', 'Grill auf hohe direkte Hitze vorheizen.', { c: 260 }],
      ['grill', 'Naan direkt auf den Rost legen, 1 bis 2 Minuten grillen, bis er Blasen wirft.', { t: 2 }],
      ['flip', 'Wenden und 1 Minute grillen.', { t: 1 }],
      ['spread', 'Mit Knoblauchbutter bestreichen.']
    ] }
  }
},
{
  id: 'hefezopf', n: 'Hefezopf', c: 'brot', k: 'Deutschland', d: 2, p: 12, v: 1, pu: 'Scheiben',
  desc: 'Süßer, buttriger Zopf aus drei Strängen, mit Hagelzucker.',
  ing: ['500 g Weizenmehl Type 550', '200 ml lauwarme Milch', '1 Würfel frische Hefe (42 g) oder 1 Päckchen Trockenhefe', '70 g Zucker', '80 g weiche Butter', '1 Ei', '1 Päckchen Vanillezucker', 'Abrieb von ½ Bio-Zitrone', '½ TL Salz', '1 Eigelb und 2 EL Milch zum Bestreichen', '2 EL Hagelzucker oder Mandelblättchen'],
  m: {
    ofen: { t: 150, s: [
      ['stir', 'Hefe mit 1 TL Zucker in der Milch auflösen.'],
      ['knead', 'Mit Mehl, restlichem Zucker, Butter, Ei, Vanillezucker, Zitrone und Salz 10 Minuten zu einem seidigen Teig kneten.', { t: 10 }],
      ['rest', 'Abgedeckt 1 Stunde an einem warmen Ort gehen lassen.', { t: 60 }],
      ['roll', 'Teig in 3 gleich schwere Stücke teilen und zu je 45 cm langen Strängen rollen, die zu den Enden dünner werden.'],
      ['shape', 'Stränge oben zusammendrücken und straff flechten: immer den äußeren Strang über den mittleren legen. Enden unterschlagen.'],
      ['rest', 'Auf einem Blech mit Backpapier 30 Minuten gehen lassen. Backofen auf 180 °C Ober-/Unterhitze vorheizen.', { t: 30, c: 180, mo: 'OU' }],
      ['spread', 'Mit Eigelb-Milch bestreichen und mit Hagelzucker bestreuen.'],
      ['bake', '30 bis 35 Minuten goldbraun backen. Klopft man auf die Unterseite, klingt er hohl.', { c: 180, mo: 'OU', t: 32, i: 'loaf' }],
      ['cool', 'Auf einem Gitter auskühlen lassen.', { t: 30 }]
    ] },
    tm: { t: 150, s: [
      ['tm', 'Milch, Hefe und Zucker 2 Min./37 °C/Stufe 2.', { t: 2, c: 37, s: 2 }],
      ['tm', 'Übrige Teigzutaten zugeben, 4 Min./Teigstufe. 1 Stunde gehen lassen.', { t: 4, s: 'teig' }],
      ['shape', 'Drei Stränge rollen und flechten, 30 Minuten gehen lassen.', { t: 30 }],
      ['bake', 'Bestreichen, bestreuen und bei 180 °C 30 bis 35 Minuten backen.', { c: 180, mo: 'OU', t: 32, i: 'loaf' }]
    ] }
  }
},
{
  id: 'topfbrot', n: 'Knusperbrot aus dem Topf', c: 'brot', k: 'International', d: 1, p: 1, v: 2, pu: 'Laib',
  desc: 'Ohne Kneten, über Nacht gegangen, im heißen Gusseisentopf gebacken. Kruste wie vom Bäcker.',
  ing: ['400 g Weizenmehl Type 550', '100 g Roggen- oder Dinkelvollkornmehl', '380 ml lauwarmes Wasser', '2 g Trockenhefe (ca. ½ TL)', '10 g Salz'],
  m: {
    ofen: { t: 1080, note: 'Ein Gusseisentopf (Bräter) mit ofenfestem Deckel, ca. 24 cm, ist nötig. Gesamtzeit inklusive 12 bis 18 Stunden Gare.', s: [
      ['stir', 'Mehle, Hefe und Salz mischen, Wasser zugeben und mit einem Löffel verrühren, bis kein Mehl mehr zu sehen ist.'],
      ['rest', 'Abgedeckt 12 bis 18 Stunden bei Raumtemperatur gehen lassen, bis die Oberfläche voller Blasen ist.', { t: 720 }],
      ['shape', 'Teig auf eine gut bemehlte Fläche kippen, die Ränder zur Mitte falten und mit dem Schluss nach oben in ein bemehltes Gärkörbchen oder eine Schüssel mit bemehltem Tuch legen.'],
      ['bake', 'Topf mit Deckel in den Ofen stellen und 45 Minuten auf 250 °C Ober-/Unterhitze vorheizen.', { c: 250, mo: 'OU', t: 45 }],
      ['pour', 'Topf herausnehmen (sehr heiß, Topflappen!), Teig hineinstürzen. Optional einschneiden.'],
      ['bake', 'Mit Deckel 30 Minuten backen. Der Dampf im Topf lässt das Brot aufgehen.', { c: 250, mo: 'OU', t: 30, i: 'loaf' }],
      ['bake', 'Deckel abnehmen, Temperatur auf 220 °C senken und 15 bis 20 Minuten weiterbacken, bis die Kruste dunkelbraun ist.', { c: 220, mo: 'OU', t: 18, i: 'loaf' }],
      ['cool', 'Auf einem Gitter mindestens 1 Stunde auskühlen lassen, bevor es angeschnitten wird. Innen gart es noch nach.', { t: 60 }]
    ] }
  }
},
{
  id: 'muffins', n: 'Blaubeermuffins', c: 'brot', k: 'USA', d: 1, p: 12, v: 1, pu: 'Muffins',
  desc: 'Hoch aufgegangen mit Streuselhaube. Der Teig wird nur kurz verrührt.',
  ing: ['280 g Mehl', '2 TL Backpulver', '½ TL Salz', '150 g Zucker', '2 Eier', '120 ml neutrales Öl', '180 ml Buttermilch oder Milch', '1 TL Vanilleextrakt', 'Abrieb von 1 Bio-Zitrone', '200 g Blaubeeren (frisch oder TK, nicht aufgetaut)', '#Streusel', '40 g Mehl', '30 g Zucker', '25 g kalte Butter'],
  prep: [
    ['knead', 'Streuselzutaten mit den Fingern zu Krümeln verreiben, kalt stellen.'],
    ['whisk', 'Mehl, Backpulver und Salz in einer Schüssel mischen.'],
    ['whisk', 'In einer zweiten Schüssel Zucker, Eier, Öl, Buttermilch, Vanille und Zitronenabrieb verquirlen.'],
    ['fold', 'Flüssige Zutaten zu den trockenen geben und mit einem Löffel höchstens 15 Mal unterheben. Der Teig bleibt klumpig. Blaubeeren vorsichtig unterheben.']
  ],
  m: {
    ofen: { t: 45, s: [
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen, Muffinblech mit Papierförmchen auslegen.', { c: 200, mo: 'OU' }],
      ['pour', 'Teig randvoll in die 12 Förmchen füllen und Streusel daraufstreuen.'],
      ['bake', '5 Minuten bei 200 °C backen, dann ohne die Tür zu öffnen auf 180 °C herunterschalten und 15 bis 18 Minuten weiterbacken. Die anfängliche Hitze lässt sie hoch aufgehen.', { c: 180, mo: 'OU', t: 21 }],
      ['cool', '5 Minuten im Blech, dann auf einem Gitter abkühlen lassen.', { t: 5 }]
    ] },
    airfryer: { t: 45, note: 'In Silikon- oder doppelten Papierförmchen, 4 bis 6 Stück pro Durchgang.', s: [
      ['pour', 'Teig zu drei Vierteln in die Förmchen füllen, Streusel darauf.'],
      ['airfry', 'Bei 160 °C 13 bis 15 Minuten backen (Stäbchenprobe).', { c: 160, t: 14 }],
      ['cool', 'Abkühlen lassen.', { t: 5 }]
    ] },
    tm: { t: 45, s: [
      ['tm', 'Zucker, Eier, Öl, Buttermilch, Vanille und Zitronenabrieb 20 Sek./Stufe 4.', { sec: 20, s: 4 }],
      ['tm', 'Mehl, Backpulver und Salz zugeben, 10 Sek./Linkslauf/Stufe 4. Blaubeeren von Hand unterheben.', { sec: 10, l: true, s: 4 }],
      ['pour', 'In die Förmchen füllen, Streusel darauf.'],
      ['bake', 'Bei 200 °C 5 Minuten, dann 180 °C 15 bis 18 Minuten backen.', { c: 180, mo: 'OU', t: 21 }]
    ] }
  }
},
{
  id: 'cookies', n: 'Chocolate Chip Cookies', c: 'brot', k: 'USA', d: 1, p: 20, v: 1, pu: 'Cookies',
  desc: 'Mit gebräunter Butter, außen knusprig, innen weich und zäh.',
  ing: ['170 g Butter', '150 g brauner Zucker', '80 g weißer Zucker', '1 Ei', '1 Eigelb', '2 TL Vanilleextrakt', '280 g Mehl', '½ TL Natron', '¾ TL Salz', '200 g Zartbitterschokolade, grob gehackt', 'Flockensalz'],
  prep: [
    ['stir', 'Butter in einem hellen Topf bei mittlerer Hitze schmelzen und unter Rühren 5 bis 7 Minuten weiterkochen, bis sie nussig riecht und braune Punkte am Boden hat. In eine Schüssel gießen und 10 Minuten abkühlen lassen.', { h: 'mittel', t: 6 }],
    ['whisk', 'Beide Zuckersorten unter die Butter rühren, dann Ei, Eigelb und Vanille. 1 Minute kräftig rühren, bis die Masse glänzt.'],
    ['fold', 'Mehl, Natron und Salz unterrühren, dann die Schokolade.'],
    ['chill', 'Teig mindestens 30 Minuten (bis 72 Stunden) kühlen. Je länger, desto karamelliger.', { t: 30 }],
    ['shape', 'Mit einem Eisportionierer oder zwei Löffeln Kugeln à ca. 45 g formen.']
  ],
  m: {
    ofen: { t: 70, s: [
      ['bake', 'Backofen auf 180 °C Ober-/Unterhitze vorheizen.', { c: 180, mo: 'OU' }],
      ['layer', 'Teigkugeln mit 6 cm Abstand auf ein Blech mit Backpapier setzen (8 pro Blech).'],
      ['bake', '10 bis 12 Minuten backen. Die Ränder sind goldbraun, die Mitte sieht noch roh aus. Das muss so sein.', { c: 180, mo: 'OU', t: 11, i: 'cookies' }],
      ['season', 'Sofort mit Flockensalz bestreuen.'],
      ['cool', '10 Minuten auf dem Blech fest werden lassen, dann auf ein Gitter setzen.', { t: 10 }]
    ] },
    airfryer: { t: 60, s: [
      ['layer', '3 bis 4 Teigkugeln mit Abstand auf Backpapier in den Korb setzen.'],
      ['airfry', 'Bei 160 °C 8 bis 9 Minuten backen.', { c: 160, t: 8 }],
      ['cool', '5 Minuten im Korb ruhen lassen, dann herausheben.', { t: 5 }]
    ] }
  }
},
{
  id: 'croissants', n: 'Croissants', c: 'brot', k: 'Frankreich', d: 3, p: 12, v: 1, pu: 'Croissants',
  desc: 'Plunderteig mit Butterplatte und drei einfachen Touren. Aufwendig, aber machbar.',
  ing: ['#Teig', '500 g Weizenmehl Type 550', '60 g Zucker', '10 g Salz', '11 g Trockenhefe', '140 ml kalte Milch', '140 ml kaltes Wasser', '40 g weiche Butter', '#Butterplatte', '280 g kalte Butter (82 % Fett)', '#Bestreichen', '1 Ei', '1 EL Milch'],
  m: {
    ofen: { t: 900, note: 'Gesamtzeit über zwei Tage verteilt. Die Butter muss immer kühl, aber biegsam sein. Wird sie weich, den Teig sofort kühlen.', s: [
      ['knead', 'Alle Teigzutaten 5 Minuten zu einem glatten Teig kneten. Zu einem flachen Rechteck formen, in Folie wickeln.', { t: 5 }],
      ['chill', 'Über Nacht (mindestens 8 Stunden) im Kühlschrank ruhen lassen.', { t: 480 }],
      ['roll', 'Butter zwischen Backpapier mit dem Nudelholz zu einer 17 x 17 cm großen, gleichmäßigen Platte klopfen und rollen. 15 Minuten kühlen.', { t: 15 }],
      ['roll', 'Teig zu einem Quadrat von 25 x 25 cm ausrollen. Butterplatte um 45 Grad gedreht als Raute auflegen, die Teigecken darüberschlagen und die Nähte fest verschließen.'],
      ['roll', 'Erste Tour: Zu einem Rechteck von 60 x 20 cm ausrollen, in drei Teile falten wie einen Brief. 30 Minuten kühlen.', { t: 30 }],
      ['roll', 'Zweite und dritte Tour: Den Teig um 90 Grad drehen, wieder ausrollen und dreifach falten. Nach jeder Tour 30 Minuten kühlen.', { t: 60 }],
      ['roll', 'Teig zu einem Rechteck von 25 x 60 cm und ca. 4 mm Dicke ausrollen. In lange Dreiecke mit 9 cm Basis schneiden.'],
      ['shape', 'Jedes Dreieck an der Basis 1 cm einschneiden, leicht in die Länge ziehen und von der Basis zur Spitze locker aufrollen. Spitze nach unten aufs Blech legen.'],
      ['rest', 'Bei Raumtemperatur (max. 26 °C, sonst schmilzt die Butter) 2 bis 3 Stunden gehen lassen, bis sie deutlich größer sind und beim Rütteln wackeln.', { t: 150 }],
      ['spread', 'Ei mit Milch verquirlen und die Croissants dünn bestreichen, die Schnittkanten aussparen.'],
      ['bake', 'Bei 200 °C Ober-/Unterhitze 18 bis 20 Minuten tief goldbraun backen.', { c: 200, mo: 'OU', t: 19, i: 'cookies' }],
      ['cool', 'Auf einem Gitter 15 Minuten abkühlen lassen.', { t: 15 }]
    ] }
  }
},
{
  id: 'butterplaetzchen', n: 'Butterplätzchen', c: 'brot', k: 'Deutschland', d: 1, p: 50, v: 1, pu: 'Plätzchen',
  desc: 'Mürbeteig zum Ausstechen, ideal zum Verzieren mit Kindern.',
  ing: ['300 g Mehl', '100 g Zucker', '1 Päckchen Vanillezucker', '1 Prise Salz', '200 g kalte Butter', '1 Eigelb', '#Verzieren', '150 g Puderzucker', '2 bis 3 EL Zitronensaft', 'Streusel'],
  prep: [
    ['knead', 'Mehl, Zucker, Vanillezucker, Salz, Butter in Würfeln und Eigelb rasch zu einem glatten Teig verkneten.'],
    ['chill', 'In zwei flachen Paketen in Folie 1 Stunde kühlen.', { t: 60 }]
  ],
  m: {
    ofen: { t: 110, s: [
      ['bake', 'Backofen auf 180 °C Ober-/Unterhitze vorheizen.', { c: 180, mo: 'OU' }],
      ['roll', 'Teig portionsweise auf bemehlter Fläche 3 bis 4 mm dick ausrollen.'],
      ['shape', 'Formen ausstechen und auf ein Blech mit Backpapier legen. Reste zusammenkneten, kurz kühlen und wieder ausrollen.'],
      ['bake', '8 bis 10 Minuten backen, bis die Ränder hellgolden sind.', { c: 180, mo: 'OU', t: 9, i: 'cookies' }],
      ['cool', 'Auf dem Blech 5 Minuten, dann auf einem Gitter vollständig auskühlen lassen.', { t: 20 }],
      ['spread', 'Puderzucker mit Zitronensaft glatt rühren, Plätzchen bestreichen und mit Streuseln verzieren.']
    ] },
    tm: { t: 110, s: [
      ['tm', 'Alle Teigzutaten 20 Sek./Stufe 4, dann 10 Sek./Teigstufe zu einem Teig verarbeiten.', { sec: 30, s: 'teig' }],
      ['chill', '1 Stunde kühlen.', { t: 60 }],
      ['roll', 'Ausrollen und ausstechen.'],
      ['bake', 'Bei 180 °C 8 bis 10 Minuten backen.', { c: 180, mo: 'OU', t: 9, i: 'cookies' }],
      ['spread', 'Abkühlen lassen und verzieren.']
    ] }
  }
},
{
  id: 'vanillekipferl', n: 'Vanillekipferl', c: 'brot', k: 'Österreich', d: 2, p: 40, v: 1, pu: 'Kipferl',
  desc: 'Mürbe Hörnchen mit gemahlenen Mandeln, noch warm in Vanillezucker gewälzt.',
  ing: ['250 g Mehl', '100 g gemahlene Mandeln (blanchiert)', '80 g Puderzucker', '1 Prise Salz', '200 g kalte Butter', '2 Eigelb', '#Zum Wälzen', '80 g Puderzucker', '2 Päckchen Bourbon-Vanillezucker'],
  prep: [
    ['knead', 'Mehl, Mandeln, Puderzucker, Salz, Butter in Würfeln und Eigelbe rasch zu einem glatten Teig verkneten.'],
    ['chill', 'In Folie 1 Stunde kühlen.', { t: 60 }]
  ],
  m: {
    ofen: { t: 100, s: [
      ['bake', 'Backofen auf 170 °C Ober-/Unterhitze vorheizen.', { c: 170, mo: 'OU' }],
      ['roll', 'Teig portionsweise zu daumendicken Rollen formen, in 2 cm Stücke schneiden.'],
      ['shape', 'Jedes Stück zu einer 6 cm langen Rolle mit dünnen Enden rollen und zum Hörnchen biegen. Auf ein Blech mit Backpapier legen.'],
      ['bake', '10 bis 12 Minuten backen. Sie sollen hell bleiben, nur die Spitzen leicht golden.', { c: 170, mo: 'OU', t: 11, i: 'cookies' }],
      ['stir', 'Puderzucker und Vanillezucker in einem tiefen Teller mischen.'],
      ['cool', 'Kipferl 2 bis 3 Minuten abkühlen lassen, dann vorsichtig (sie zerbrechen leicht) im Vanillezucker wälzen.', { t: 3 }]
    ] },
    tm: { t: 100, s: [
      ['tm', 'Für das Wälzen Puderzucker mit Vanillezucker 10 Sek./Stufe 10 mischen, umfüllen.', { sec: 10, s: 10 }],
      ['tm', 'Teigzutaten 20 Sek./Stufe 4, dann 15 Sek./Teigstufe. 1 Stunde kühlen.', { sec: 35, s: 'teig' }],
      ['shape', 'Kipferl formen.'],
      ['bake', 'Bei 170 °C 10 bis 12 Minuten backen.', { c: 170, mo: 'OU', t: 11, i: 'cookies' }],
      ['cool', 'Warm im Vanillezucker wälzen.', { t: 3 }]
    ] }
  }
},
{
  id: 'pita', n: 'Pita-Brot', c: 'brot', k: 'Nahost', d: 2, p: 8, v: 2, pu: 'Fladen',
  desc: 'Bläht sich im heißen Ofen zur Tasche auf, die sich füllen lässt.',
  ing: ['500 g Weizenmehl Type 550', '320 ml lauwarmes Wasser', '1 Päckchen Trockenhefe (7 g)', '1 TL Zucker', '10 g Salz', '2 EL Olivenöl'],
  prep: [
    ['knead', 'Alle Zutaten 8 Minuten zu einem glatten, weichen Teig kneten.', { t: 8 }],
    ['rest', 'Abgedeckt 1 Stunde gehen lassen.', { t: 60 }],
    ['shape', 'In 8 Stücke teilen, zu Kugeln formen und 10 Minuten abgedeckt entspannen lassen.', { t: 10 }],
    ['roll', 'Jede Kugel rund auf 5 mm Dicke und ca. 16 cm Durchmesser ausrollen. Gleichmäßig dick, sonst bläht sie sich nicht.']
  ],
  m: {
    ofen: { t: 100, s: [
      ['bake', 'Backofen mit einem Blech oder Pizzastein auf 250 °C Ober-/Unterhitze 30 Minuten vorheizen.', { c: 250, mo: 'OU', t: 30 }],
      ['bake', 'Fladen direkt aufs heiße Blech legen und 3 bis 5 Minuten backen, bis sie aufgebläht und hell sind (nicht braun).', { c: 250, mo: 'OU', t: 4, i: 'pizza' }],
      ['rest', 'Sofort in ein Küchentuch einschlagen, damit sie weich bleiben.']
    ] },
    herd: { t: 90, s: [
      ['fry', 'Eine Gusseisenpfanne ohne Fett auf mittlerer bis hoher Stufe sehr heiß werden lassen.', { h: 'hoch' }],
      ['fry', 'Fladen 30 Sekunden backen, bis sich Blasen bilden.', { h: 'hoch', sec: 30 }],
      ['flip', 'Wenden und 1 Minute backen, bis sie sich aufblähen. Mit einem Tuch leicht auf die Blasen drücken hilft.', { h: 'hoch', t: 1 }],
      ['flip', 'Nochmals wenden und 30 Sekunden backen.', { sec: 30 }],
      ['rest', 'In ein Tuch einschlagen.']
    ] }
  }
}
);
