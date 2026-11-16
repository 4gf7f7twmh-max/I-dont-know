/* Eigene Kreationen: neue Kombinationen aus bewährten Techniken. Nicht in einer Testküche nachgekocht. */
R(
{
  id: 'k-miso-brownies', n: 'Miso-Karamell-Brownies mit Sesam', c: 'kreation', k: 'Fusion Japan & USA', d: 2, p: 16, v: 1, pu: 'Stücke',
  desc: 'Fudgy Brownies mit einem salzig-umamigen Miso-Karamell-Swirl und geröstetem Sesam.',
  ing: ['#Miso-Karamell', '100 g Zucker', '60 ml Sahne', '30 g Butter', '1,5 EL helle Misopaste (Shiro Miso)', '#Brownie', '180 g Zartbitterschokolade (70 %)', '130 g Butter', '220 g Zucker', '3 Eier', '1 TL Vanilleextrakt', '70 g Mehl', '25 g Kakaopulver', '1 Prise Salz', '#Topping', '1 EL schwarzer und weißer Sesam, geröstet', 'Flockensalz'],
  prep: [
    ['fry', 'Für das Karamell den Zucker in einem Topf bei mittlerer Hitze schmelzen, bis er bernsteinfarben ist. Nur schwenken, nicht rühren.', { h: 'mittel', t: 6 }],
    ['stir', 'Vom Herd nehmen, Sahne vorsichtig einrühren (spritzt), dann Butter und Miso. Glatt rühren und abkühlen lassen, bis es dickflüssig ist.'],
    ['stir', 'Schokolade und Butter schmelzen und etwas abkühlen lassen.'],
    ['mix', 'Eier, Zucker und Vanille 5 Minuten hell aufschlagen.', { t: 5 }],
    ['fold', 'Schokobutter unterrühren, Mehl, Kakao und Salz unterheben.'],
    ['pour', 'Teig in eine mit Backpapier ausgelegte Form (20 x 20 cm) füllen.'],
    ['fold', 'Miso-Karamell in Klecksen auf dem Teig verteilen und mit einem Holzstäbchen in Schlaufen durchziehen. Sesam darüberstreuen.']
  ],
  m: {
    ofen: { t: 90, s: [
      ['bake', 'Bei 175 °C Ober-/Unterhitze 24 bis 28 Minuten backen. Das Karamell macht die Ränder dunkler, die Mitte bleibt feucht.', { c: 175, mo: 'OU', t: 26 }],
      ['cool', 'Vollständig in der Form auskühlen lassen, dann mindestens 1 Stunde kühlen, damit sich das Karamell setzt.', { t: 90 }],
      ['serve', 'Mit Flockensalz bestreuen und in 16 Stücke schneiden.']
    ] },
    airfryer: { t: 90, note: 'Halbe Menge in einer Form von ca. 18 x 18 cm.', s: [
      ['airfry', 'Bei 160 °C 20 bis 24 Minuten backen, nach 15 Minuten mit Alufolie abdecken.', { c: 160, t: 22 }],
      ['cool', 'Auskühlen lassen und kühlen.', { t: 90 }]
    ] }
  },
  tips: ['Miso ist unterschiedlich salzig. Beim ersten Mal das Karamell vor dem Swirlen probieren: Es soll wie Salzkaramell mit einer herzhaften Note schmecken.']
},
{
  id: 'k-gochujang-mac', n: 'Gochujang-Mac-and-Cheese mit Kimchi-Crunch', c: 'kreation', k: 'Fusion Korea & USA', d: 1, p: 4, v: 1,
  desc: 'Cheddar-Käsesoße mit Gochujang, darüber gebratenes Kimchi und knusprige Panko-Sesam-Brösel.',
  ing: ['300 g Makkaroni', '30 g Butter', '30 g Mehl', '600 ml Milch', '200 g kräftiger Cheddar, gerieben', '80 g Mozzarella, gerieben', '2 EL Gochujang', '1 TL Sojasauce', '150 g Kimchi (vegetarisch ohne Fischsauce)', '1 TL Sesamöl', '#Crunch', '40 g Panko', '1 EL Butter', '1 TL Sesam', '2 Frühlingszwiebeln'],
  prep: [
    ['chop', 'Kimchi grob hacken und gut ausdrücken. Frühlingszwiebeln in Ringe schneiden.'],
    ['fry', 'Panko mit Butter und Sesam in einer Pfanne goldbraun rösten, beiseitestellen.', { h: 'mittel', t: 3 }],
    ['fry', 'Kimchi im Sesamöl bei hoher Hitze 3 Minuten braten, bis es leicht karamellisiert.', { h: 'hoch', t: 3 }]
  ],
  m: {
    herd: { t: 30, s: [
      ['boil', 'Makkaroni in Salzwasser 1 Minute kürzer als angegeben kochen.', { h: 'hoch', t: 8 }],
      ['stir', 'Butter schmelzen, Mehl 1 Minute anschwitzen.', { h: 'mittel', t: 1 }],
      ['whisk', 'Milch einrühren und 3 Minuten köcheln, bis die Soße andickt. Gochujang und Sojasauce einrühren.', { h: 'mittel', t: 3 }],
      ['stir', 'Vom Herd nehmen, Cheddar und Mozzarella einschmelzen.'],
      ['fold', 'Nudeln unterheben, die Hälfte des Kimchi untermischen.'],
      ['serve', 'Mit restlichem Kimchi, Panko-Crunch und Frühlingszwiebeln servieren.']
    ] },
    ofen: { t: 45, s: [
      ['boil', 'Makkaroni 3 Minuten kürzer als angegeben kochen.', { h: 'hoch', t: 6 }],
      ['whisk', 'Gochujang-Käsesoße wie beschrieben zubereiten und mit Nudeln und der Hälfte des Kimchi mischen.', { h: 'mittel', t: 6 }],
      ['layer', 'In eine Auflaufform füllen, restliches Kimchi und Panko-Crunch darauf verteilen.'],
      ['bake', 'Bei 200 °C Ober-/Unterhitze 15 Minuten backen.', { c: 200, mo: 'OU', t: 15, i: 'dish' }],
      ['serve', 'Mit Frühlingszwiebeln bestreuen.']
    ] }
  }
},
{
  id: 'k-doener-lasagne', n: 'Döner-Lasagne', c: 'kreation', k: 'Fusion Türkei, Deutschland & Italien', d: 2, p: 6,
  desc: 'Hack mit Dönergewürz, Tomatensoße und eine Béchamel mit Joghurt, Knoblauch und Feta. Nach dem Backen kommt frischer Rotkohl-Krautsalat drauf.',
  ing: ['#Fleischsoße', '600 g Lamm- oder Rinderhack', '1 Zwiebel', '2 Knoblauchzehen', '2 EL Öl', '2 EL Tomatenmark', '400 g passierte Tomaten', '1 EL Paprikapulver edelsüß', '2 TL Kreuzkümmel', '1 TL Oregano', '1 TL Koriander, gemahlen', '½ TL Zimt', '1 TL Chiliflocken (Pul Biber)', 'Salz, Pfeffer', '#Joghurt-Béchamel', '50 g Butter', '50 g Mehl', '600 ml Milch', '200 g griechischer Joghurt', '2 Knoblauchzehen', '100 g Feta', '#Außerdem', '12 Lasagneplatten', '100 g Mozzarella, gerieben', '200 g Rotkohl, fein gehobelt', '1 EL Zitronensaft', '½ rote Zwiebel', 'Petersilie'],
  prep: [['chop', 'Zwiebel und Knoblauch fein würfeln. Rotkohl fein hobeln, mit Zitronensaft, Salz und der in Ringe geschnittenen roten Zwiebel mischen und ziehen lassen.']],
  m: {
    ofen: { t: 100, s: [
      ['fry', 'Hack in Öl scharf und krümelig anbraten, bis es Röstaromen hat. Zwiebel und Knoblauch 3 Minuten mitbraten.', { h: 'hoch', t: 10 }],
      ['season', 'Tomatenmark und alle Gewürze 1 Minute anrösten.', { t: 1 }],
      ['simmer', 'Passierte Tomaten und 100 ml Wasser zugeben und 20 Minuten köcheln. Kräftig abschmecken.', { h: 'niedrig', t: 20 }],
      ['whisk', 'Butter und Mehl anschwitzen, Milch einrühren und 5 Minuten zu einer dicken Béchamel kochen. Vom Herd nehmen, Joghurt, gepressten Knoblauch und zerbröselten Feta einrühren.', { h: 'mittel', t: 6 }],
      ['bake', 'Backofen auf 180 °C Ober-/Unterhitze vorheizen.', { c: 180, mo: 'OU' }],
      ['layer', 'In eine Auflaufform schichten: Fleischsoße, Platten, Béchamel, Fleischsoße. Dreimal wiederholen, mit Béchamel und Mozzarella abschließen.'],
      ['bake', '40 Minuten backen, bis die Oberfläche goldbraun ist.', { c: 180, mo: 'OU', t: 40, i: 'dish' }],
      ['rest', '15 Minuten ruhen lassen.', { t: 15 }],
      ['serve', 'Portionen mit Rotkohlsalat und Petersilie toppen. Dazu Chiliflocken und Zitrone.']
    ] }
  }
},
{
  id: 'k-butter-chicken-pizza', n: 'Butter-Chicken-Pizza', c: 'kreation', k: 'Fusion Indien & Italien', d: 2, p: 4, pu: 'Pizzen',
  desc: 'Butter-Chicken-Soße statt Tomate, mariniertes Hähnchen, Mozzarella, rote Zwiebel, Koriander und ein Minz-Joghurt-Drizzle.',
  ing: ['1 Portion Pizzateig (siehe Pizza Margherita, für 4 Pizzen)', '#Hähnchen', '400 g Hähnchenschenkel ohne Knochen', '100 g Joghurt', '1 TL Garam Masala', '1 TL Paprikapulver', '½ TL Kurkuma', '½ TL Salz', '#Soße', '30 g Butter', '1 Knoblauchzehe', '1 TL Ingwer, gerieben', '200 g passierte Tomaten', '1 TL Garam Masala', '50 ml Sahne', '1 TL Zucker', '#Belag', '250 g Mozzarella', '1 rote Zwiebel', 'Koriander', '#Drizzle', '100 g Joghurt', '1 EL Minze, gehackt', 'Saft von ½ Limette'],
  prep: [
    ['rest', 'Hähnchen in kleine Stücke schneiden und mit Joghurt und Gewürzen mindestens 30 Minuten marinieren.', { t: 30 }],
    ['simmer', 'Für die Soße Butter schmelzen, Knoblauch und Ingwer 1 Minute braten, Tomaten, Garam Masala und Zucker zugeben, 10 Minuten einkochen, Sahne einrühren. Die Soße soll dick sein.', { h: 'mittel', t: 11 }],
    ['fry', 'Hähnchen in einer sehr heißen Pfanne 4 bis 5 Minuten anbraten, es muss nicht ganz durch sein.', { h: 'hoch', t: 5 }],
    ['stir', 'Joghurt mit Minze, Limettensaft und Salz verrühren. Zwiebel in feine Ringe schneiden.']
  ],
  m: {
    ofen: { t: 120, s: [
      ['bake', 'Backofen mit Pizzastein oder umgedrehtem Blech auf höchster Stufe 45 Minuten vorheizen.', { c: 250, mo: 'OU', t: 45 }],
      ['shape', 'Teigkugeln von Hand zu Fladen drücken und ziehen.'],
      ['spread', 'Butter-Chicken-Soße dünn verstreichen, Mozzarella, Hähnchen und Zwiebel verteilen.'],
      ['bake', '7 bis 9 Minuten backen.', { c: 250, mo: 'OU', t: 8, i: 'pizza' }],
      ['serve', 'Mit Minz-Joghurt beträufeln und mit Koriander bestreuen.']
    ] },
    airfryer: { t: 110, note: 'Kleine Pizzen, so groß wie der Korb.', s: [
      ['shape', 'Teig zu Fladen in Korbgröße formen und auf Backpapier legen.'],
      ['airfry', 'Boden ohne Belag bei 200 °C 3 Minuten vorbacken.', { c: 200, t: 3 }],
      ['spread', 'Belegen.'],
      ['airfry', 'Weitere 5 bis 7 Minuten backen.', { c: 200, t: 6 }],
      ['serve', 'Mit Drizzle und Koriander servieren.']
    ] }
  }
},
{
  id: 'k-kuerbis-chai-schnecken', n: 'Kürbis-Chai-Zimtschnecken', c: 'kreation', k: 'Fusion', d: 2, p: 12, v: 1, pu: 'Schnecken',
  desc: 'Hefeteig mit Kürbispüree, gefüllt mit Chai-Gewürzbutter, mit Ahorn-Frischkäse-Glasur.',
  ing: ['#Teig', '450 g Mehl', '150 g Kürbispüree (Hokkaido, gekocht und püriert)', '150 ml lauwarme Milch', '1 Päckchen Trockenhefe', '50 g Zucker', '60 g weiche Butter', '1 Ei', '½ TL Salz', '#Chai-Füllung', '100 g weiche Butter', '100 g brauner Zucker', '2 TL Zimt', '1 TL Kardamom', '1 TL Ingwer, gemahlen', '½ TL Nelken, gemahlen', '½ TL schwarzer Pfeffer, fein', '#Glasur', '100 g Frischkäse', '2 EL Ahornsirup', '60 g Puderzucker'],
  prep: [
    ['knead', 'Teigzutaten 8 Minuten zu einem weichen Teig kneten. Er ist etwas klebriger als normal, nur wenig Mehl zugeben.', { t: 8 }],
    ['rest', '1 Stunde gehen lassen.', { t: 60 }],
    ['stir', 'Füllungszutaten zu einer Paste verrühren.'],
    ['roll', 'Teig zu einem Rechteck von 30 x 45 cm ausrollen, Chai-Butter verstreichen.'],
    ['shape', 'Von der Längsseite aufrollen und in 12 Scheiben schneiden.']
  ],
  m: {
    ofen: { t: 140, s: [
      ['layer', 'In eine gefettete Form setzen.'],
      ['rest', '30 Minuten gehen lassen.', { t: 30 }],
      ['bake', 'Bei 180 °C Ober-/Unterhitze 22 bis 25 Minuten backen.', { c: 180, mo: 'OU', t: 23, i: 'cookies' }],
      ['mix', 'Frischkäse, Ahornsirup und Puderzucker glatt rühren.'],
      ['spread', 'Auf die warmen Schnecken streichen.']
    ] },
    airfryer: { t: 130, s: [
      ['layer', '4 bis 6 Schnecken in eine Form im Korb setzen, 30 Minuten gehen lassen.', { t: 30 }],
      ['airfry', 'Bei 160 °C 12 bis 14 Minuten backen.', { c: 160, t: 13 }],
      ['spread', 'Glasieren.']
    ] }
  }
},
{
  id: 'k-crispy-gnocchi', n: 'Crispy Gnocchi mit Salbei, Zitrone und Parmesan', c: 'kreation', k: 'Fusion Italien', d: 1, p: 2, v: 1,
  desc: 'Fertig-Gnocchi direkt aus der Packung knusprig gegart, wie kleine Kartoffelkissen. In 15 Minuten.',
  ing: ['500 g Gnocchi aus dem Kühlregal', '2 EL Olivenöl', '½ TL Salz', '30 g Butter', '10 Salbeiblätter', 'Abrieb und Saft von ½ Bio-Zitrone', '40 g Parmesan, fein gerieben', 'Pfeffer', '1 Handvoll Rucola (optional)'],
  prep: [['stir', 'Gnocchi ungekocht aus der Packung mit Olivenöl und Salz mischen und auseinanderzupfen, falls sie kleben.']],
  post: [
    ['fry', 'Butter in einer kleinen Pfanne aufschäumen lassen, Salbei darin 1 bis 2 Minuten knusprig braten, bis die Butter nussig braun riecht.', { h: 'mittel', t: 2 }],
    ['flip', 'Gnocchi in einer Schüssel mit der Salbeibutter, Zitronenabrieb und -saft schwenken.'],
    ['serve', 'Mit Parmesan, Pfeffer und Rucola servieren.']
  ],
  m: {
    airfryer: { t: 20, s: [['airfry', 'Bei 200 °C 12 bis 15 Minuten garen, alle 4 Minuten schütteln, bis sie goldbraun und außen knusprig sind.', { c: 200, t: 13 }]] },
    ofen: { t: 30, s: [['bake', 'Auf einem Blech mit Backpapier bei 220 °C Umluft 20 bis 22 Minuten backen, nach 12 Minuten wenden.', { c: 220, mo: 'U', t: 21, i: 'tray' }]] },
    herd: { t: 20, s: [['fry', 'In einer großen Pfanne mit dem Öl bei mittlerer bis hoher Hitze 8 bis 10 Minuten braten. Erst 4 Minuten nicht bewegen, dann wenden.', { h: 'hoch', t: 9 }]] }
  }
},
{
  id: 'k-tiramisu-schmarrn', n: 'Tiramisu-Kaiserschmarrn', c: 'kreation', k: 'Fusion Österreich & Italien', d: 2, p: 2, v: 1,
  desc: 'Kaiserschmarrn mit Espresso im Teig, karamellisiert mit Kakaozucker, dazu kalte Mascarponecreme zum Dippen.',
  ing: ['#Schmarrn', '3 Eier', '100 ml Milch', '50 ml kalter Espresso', '100 g Mehl', '1 EL Zucker', '1 Prise Salz', '30 g Butter', '1 EL Zucker und 1 TL Kakao zum Karamellisieren', '#Mascarponecreme', '125 g Mascarpone', '50 ml Sahne', '1 EL Puderzucker', '1 EL Amaretto (optional)', '#Topping', 'Kakaopulver', '2 Löffelbiskuits, zerbröselt'],
  prep: [
    ['mix', 'Mascarpone, Sahne, Puderzucker und Amaretto cremig aufschlagen, kalt stellen.'],
    ['whisk', 'Eier trennen. Eigelbe mit Milch, Espresso, Mehl und Zucker glatt rühren.'],
    ['mix', 'Eiweiß mit Salz steif schlagen und locker unterheben.']
  ],
  m: {
    herd: { t: 30, s: [
      ['fry', 'Die Hälfte der Butter in einer beschichteten Pfanne schmelzen, Teig einfüllen und mit Deckel bei niedriger Hitze 5 Minuten backen.', { h: 'niedrig', t: 5 }],
      ['flip', 'Vierteln, wenden und 2 Minuten backen.', { h: 'mittel', t: 2 }],
      ['chop', 'In Stücke reißen.'],
      ['fry', 'Restliche Butter, Zucker und Kakao zugeben und 2 Minuten karamellisieren.', { h: 'mittel', t: 2 }],
      ['serve', 'Schmarrn anrichten, Löffelbiskuit-Brösel darüber, mit Kakao bestäuben. Mascarponecreme in einer Schale dazu.']
    ] }
  }
},
{
  id: 'k-currywurst-bao', n: 'Currywurst-Bao', c: 'kreation', k: 'Fusion Berlin & Taiwan', d: 3, p: 4, pu: 'Portionen (12 Bao)',
  desc: 'Fluffige gedämpfte Bao Buns mit Currywurst in würziger Currysoße, Gurken-Pickles und Röstzwiebeln.',
  ing: ['#Bao-Teig', '300 g Mehl', '1 TL Trockenhefe', '1 EL Zucker', '½ TL Backpulver', '160 ml lauwarme Milch', '1 EL neutrales Öl', '½ TL Salz', '#Füllung', '4 Bratwürste (oder vegane Würste)', '1 Zwiebel', '1 EL Öl', '2 EL Currypulver', '1 TL Paprikapulver edelsüß', '250 ml passierte Tomaten', '2 EL Ketchup', '1 EL Apfelessig', '1 EL Honig', '#Toppings', '1 Mini-Gurke', '2 EL Reisessig', '1 TL Zucker', '3 EL Röstzwiebeln', 'Koriander oder Frühlingszwiebel'],
  prep: [
    ['knead', 'Teigzutaten 8 Minuten zu einem glatten Teig kneten.', { t: 8 }],
    ['rest', 'Abgedeckt 1 Stunde gehen lassen.', { t: 60 }],
    ['chop', 'Gurke in hauchdünne Scheiben schneiden, mit Reisessig, Zucker und Salz mischen und ziehen lassen.'],
    ['roll', 'Teig in 12 Stücke teilen, jedes oval (ca. 12 x 8 cm) ausrollen, mit Öl bepinseln und über einem Essstäbchen zur Hälfte falten. Auf Backpapierquadrate setzen.'],
    ['rest', '20 Minuten gehen lassen.', { t: 20 }]
  ],
  post: [
    ['fry', 'Würste in einer Pfanne rundherum braun braten und in Scheiben schneiden.', { h: 'mittel', t: 10 }],
    ['simmer', 'Zwiebel fein würfeln und in Öl dünsten, Curry- und Paprikapulver kurz mitrösten, Tomaten, Ketchup, Essig und Honig zugeben und 10 Minuten einkochen. Wurstscheiben unterheben.', { h: 'mittel', t: 12 }],
    ['shape', 'Bao aufklappen, mit Currywurst, Gurken, Röstzwiebeln und Koriander füllen.'],
    ['serve', 'Sofort servieren.']
  ],
  m: {
    herd: { t: 120, note: 'Ein Bambusdämpfer oder ein Dämpfeinsatz mit Deckel ist nötig.', s: [
      ['steam', 'Bao portionsweise mit Abstand in den Dämpfer setzen und über siedendem Wasser 10 Minuten dämpfen. Danach 2 Minuten mit geschlossenem Deckel ruhen lassen, sonst fallen sie zusammen.', { h: 'mittel', t: 10 }]
    ] },
    tm: { t: 120, s: [
      ['pour', '1000 g Wasser in den Mixtopf füllen. Bao auf Backpapier in Varoma-Behälter und Einlegeboden setzen.'],
      ['tm', '15 Min./Varoma/Stufe 1 dämpfen, dann 2 Minuten im geschlossenen Varoma ruhen lassen.', { t: 15, c: 'Varoma', s: 1 }]
    ] }
  }
},
{
  id: 'k-satay-nudeln', n: 'Erdnuss-Satay-Nudeln mit Knuspertofu', c: 'kreation', k: 'Fusion Südostasien', d: 1, p: 4, v: 2,
  desc: 'Cremige Erdnusssoße mit Limette und Chili, Nudeln, knackiges Gemüse und knuspriger Tofu. Vegan.',
  ing: ['250 g Mie- oder Reisnudeln', '1 Portion Knuspriger Tofu (siehe Rezept, 400 g Tofu)', '1 rote Paprika', '1 Möhre', '150 g Brokkoli', '2 Frühlingszwiebeln', '#Satay-Soße', '100 g Erdnussbutter (cremig, ungesüßt)', '3 EL Sojasauce', '2 EL Limettensaft', '1 EL Ahornsirup', '1 EL Sriracha', '1 TL Sesamöl', '1 Knoblauchzehe', '1 TL Ingwer, gerieben', '100 ml warmes Wasser', '#Topping', '30 g geröstete Erdnüsse, gehackt', 'Koriander', 'Limettenspalten'],
  prep: [['chop', 'Paprika in Streifen, Möhre in Stifte, Brokkoli in kleine Röschen, Frühlingszwiebeln in Ringe schneiden.']],
  m: {
    herd: { t: 40, s: [
      ['fry', 'Knusprigen Tofu nach Rezept in der Pfanne braten, beiseitestellen.', { h: 'hoch', t: 9 }],
      ['whisk', 'Alle Soßenzutaten glatt rühren. Sie soll dickflüssig sein, bei Bedarf mehr Wasser zugeben.'],
      ['boil', 'Nudeln nach Packungsangabe kochen. In der letzten Minute Brokkoli und Möhre mitgaren. Abgießen.', { h: 'hoch', t: 4 }],
      ['flip', 'Alles mit Paprika und Soße im Topf oder Wok bei mittlerer Hitze 1 Minute schwenken.', { h: 'mittel', t: 1 }],
      ['serve', 'Mit Tofu, Erdnüssen, Frühlingszwiebeln, Koriander und Limette servieren.']
    ] },
    tm: { t: 40, s: [
      ['fry', 'Tofu in der Pfanne oder im Airfryer knusprig garen.', { h: 'hoch', t: 9 }],
      ['tm', 'Knoblauch und Ingwer 3 Sek./Stufe 8 zerkleinern, übrige Soßenzutaten zugeben, 20 Sek./Stufe 4. Umfüllen.', { sec: 20, s: 4 }],
      ['tm', '1200 g Wasser und 1 TL Salz 10 Min./Varoma/Stufe 1 aufkochen. Gemüse in den Varoma geben.', { t: 10, c: 'Varoma', s: 1 }],
      ['tm', 'Nudeln ins Wasser geben, Varoma aufsetzen und nach Packungsangabe bei 100 °C/Linkslauf/Sanftrührstufe garen.', { t: 5, c: 100, l: true, s: 'sanft' }],
      ['fold', 'Nudeln abgießen und mit Gemüse und Soße mischen.'],
      ['serve', 'Mit Tofu und Toppings servieren.']
    ] }
  }
},
{
  id: 'k-brezelknoedel', n: 'Brezelknödel mit Obatzda-Soße', c: 'kreation', k: 'Fusion Bayern', d: 2, p: 4, v: 1,
  desc: 'Knödel aus altbackenen Laugenbrezeln, dazu eine warme Soße nach Art des Obatzda mit Camembert, Bier und Paprika.',
  ing: ['#Knödel', '300 g altbackene Laugenbrezeln (ca. 4 Stück, ohne grobes Salz)', '250 ml Milch', '1 Zwiebel', '20 g Butter', '2 Eier', '½ Bund Petersilie', 'Pfeffer, Muskat', '#Obatzda-Soße', '1 Schalotte', '15 g Butter', '1 EL Mehl', '150 ml helles Bier', '150 ml Sahne', '125 g reifer Camembert', '50 g Frischkäse', '1 TL Paprikapulver edelsüß', '½ TL Kümmel, gemahlen', 'Schnittlauch', 'Radieschen'],
  prep: [
    ['chop', 'Brezeln in 1 cm Würfel schneiden, grobes Salz vorher abklopfen. Zwiebel und Schalotte fein würfeln, Petersilie hacken.'],
    ['fry', 'Zwiebel in Butter glasig dünsten.', { h: 'mittel', t: 3 }],
    ['pour', 'Milch erwärmen und über die Brezelwürfel gießen. Zwiebel, Eier, Petersilie, Pfeffer und Muskat zugeben. Nicht salzen, die Lauge bringt genug Salz.'],
    ['rest', '20 Minuten ziehen lassen, dann verkneten.', { t: 20 }],
    ['shape', 'Mit nassen Händen 8 Knödel formen.']
  ],
  post: [
    ['fry', 'Für die Soße die Schalotte in Butter dünsten, Mehl 1 Minute anschwitzen.', { h: 'mittel', t: 3 }],
    ['pour', 'Mit Bier ablöschen, Sahne zugeben und 3 Minuten köcheln.', { h: 'mittel', t: 3 }],
    ['stir', 'Hitze reduzieren. Camembert (ohne Rinde, in Stücken), Frischkäse, Paprika und Kümmel einrühren, bis alles geschmolzen ist. Nicht mehr kochen.', { h: 'niedrig' }],
    ['serve', 'Knödel mit Soße anrichten, mit Schnittlauch und Radieschenscheiben bestreuen.']
  ],
  m: {
    herd: { t: 70, s: [['simmer', 'Knödel in siedendem, leicht gesalzenem Wasser 20 Minuten gar ziehen lassen.', { h: 'niedrig', t: 20 }]] },
    tm: { t: 70, s: [['tm', 'Knödel in den gefetteten Varoma legen, 1000 g Wasser in den Mixtopf. 30 Min./Varoma/Stufe 1 dämpfen.', { t: 30, c: 'Varoma', s: 1 }]] }
  }
}
);
