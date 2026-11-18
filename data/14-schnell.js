/* Schnelle Küche: in höchstens 25 Minuten fertig, mit viel Geschmack aus wenigen Zutaten. */
R(
{
  id: 'q-spaghetti-limone', n: 'Spaghetti al limone', c: 'pasta', k: 'Italien (Amalfiküste)', d: 1, p: 2, v: 1,
  desc: 'Zitrone, Butter und Parmesan werden mit Nudelwasser zu einer glänzenden Soße. Fertig, bevor das Nudelwasser kalt ist.',
  ing: ['200 g Spaghetti', '1 Bio-Zitrone (Schale und 2 EL Saft)', '40 g Butter', '50 g Parmesan, fein gerieben', '1 kleine Knoblauchzehe', 'Salz', 'schwarzer Pfeffer', 'ein paar Basilikumblätter'],
  m: {
    herd: { t: 15, s: [
      ['boil', 'Spaghetti in kräftig gesalzenem Wasser nach Packungsangabe minus 1 Minute kochen.', { h: 'hoch', t: 9 }],
      ['grate', 'Inzwischen die Zitronenschale fein abreiben und den Knoblauch fein reiben.'],
      ['fry', 'Butter in einer großen Pfanne schmelzen, Knoblauch und Zitronenschale 30 Sekunden darin ziehen lassen, nicht bräunen.', { h: 'niedrig', sec: 30 }],
      ['pour', 'Eine Tasse Nudelwasser abschöpfen. Spaghetti direkt aus dem Topf in die Pfanne heben, 100 ml Nudelwasser und den Zitronensaft zugeben.'],
      ['stir', 'Bei mittlerer Hitze schwenken, dann von der Platte nehmen und den Parmesan nach und nach einrühren, bis eine cremige, glänzende Soße entsteht. Ist sie zu dick, noch einen Schuss Nudelwasser.', { h: 'mittel', t: 2 }],
      ['serve', 'Mit Pfeffer, Basilikum und etwas extra Zitronenschale servieren.']
    ] }
  },
  tips: ['Den Käse erst ohne Hitze einrühren, sonst klumpt er.', 'Wer es frischer mag, gibt am Ende ein paar Tropfen gutes Olivenöl darüber.']
},
{
  id: 'q-gnocchi-burrata', n: 'Pfannen-Gnocchi mit geschmorten Kirschtomaten und Burrata', c: 'pasta', k: 'Italien', d: 1, p: 2, v: 1,
  desc: 'Knusprig gebratene Gnocchi aus der Packung, süße aufgeplatzte Tomaten und kühle, cremige Burrata.',
  ing: ['500 g Gnocchi (Kühlregal)', '300 g Kirschtomaten', '2 Knoblauchzehen, in Scheiben', '3 EL Olivenöl', '1 Prise Chiliflocken', '1 TL Zucker', '1 Burrata (125 g)', 'Basilikum', 'Salz, Pfeffer', '1 TL Aceto balsamico'],
  m: {
    herd: { t: 15, s: [
      ['fry', '2 EL Olivenöl in einer großen Pfanne erhitzen. Gnocchi direkt aus der Packung einlegen und ohne Rühren 3 Minuten braten, bis die Unterseite goldbraun ist. Wenden und weitere 3 Minuten braten.', { h: 'hoch', t: 6 }],
      ['fry', 'Gnocchi an den Rand schieben, restliches Öl, Knoblauch, Chili und die ganzen Tomaten in die Mitte geben.', { h: 'mittel' }],
      ['simmer', 'Mit Zucker und Salz würzen und 4 bis 5 Minuten braten, bis die Tomaten aufplatzen. Einige mit dem Pfannenwender andrücken, damit Saft entsteht. Alles vermengen, Balsamico zugeben.', { h: 'mittel', t: 5 }],
      ['serve', 'Burrata in der Mitte aufreißen, mit Basilikum, Pfeffer und einem Faden Olivenöl servieren.']
    ] },
    airfryer: { t: 18, s: [
      ['airfry', 'Gnocchi mit 1 EL Öl mischen und bei 200 °C 10 Minuten backen, zwischendurch schütteln.', { c: 200, t: 10 }],
      ['airfry', 'Tomaten, Knoblauch, Öl, Zucker, Salz und Chili zugeben und 6 bis 8 Minuten weiterbacken, bis die Tomaten aufplatzen.', { c: 200, t: 7 }],
      ['serve', 'Mit Balsamico mischen, Burrata und Basilikum darauf.']
    ] }
  },
  tips: ['Gnocchi nicht vorkochen. Direkt aus der Packung gebraten werden sie außen knusprig und innen weich.']
},
{
  id: 'q-orzo-feta', n: 'Cremiges Zitronen-Orzo mit Spinat und Feta', c: 'pasta', k: 'Griechenland', d: 1, p: 3, v: 1,
  desc: 'Orzo wie ein schnelles Risotto in einem Topf gegart, ohne ständiges Rühren.',
  ing: ['250 g Orzo (Kritharaki)', '1 Zwiebel, fein gewürfelt', '2 Knoblauchzehen', '1 EL Olivenöl', '750 ml heiße Gemüsebrühe', '100 g Babyspinat', '150 g Feta', 'Schale und Saft von 1 Zitrone', '20 g Butter', 'Dill oder Petersilie', 'Pfeffer'],
  m: {
    herd: { t: 20, s: [
      ['fry', 'Zwiebel und Knoblauch im Olivenöl 2 Minuten glasig dünsten.', { h: 'mittel', t: 2 }],
      ['fry', 'Orzo zugeben und 1 Minute mitrösten.', { h: 'mittel', t: 1 }],
      ['simmer', 'Brühe angießen und offen 10 bis 12 Minuten köcheln, alle paar Minuten umrühren, bis das Orzo bissfest und die Brühe fast aufgesogen ist.', { h: 'mittel', t: 11 }],
      ['stir', 'Spinat unterrühren, bis er zusammenfällt. Butter, Zitronenschale, Zitronensaft und zwei Drittel des Fetas einrühren.'],
      ['serve', 'Mit restlichem Feta, Kräutern und Pfeffer servieren.']
    ] },
    tm: { t: 20, s: [
      ['tm', 'Zwiebel und Knoblauch 3 Sek./Stufe 5 zerkleinern, Öl zugeben, 2 Min./120 °C/Stufe 1 dünsten.', { t: 2, c: 120, s: 1 }],
      ['tm', 'Orzo und Brühe zugeben, 11 Min./100 °C/Linkslauf/Sanftrührstufe garen.', { t: 11, c: 100, l: 1 }],
      ['tm', 'Spinat, Butter, Zitrone und Feta zugeben, 1 Min./Linkslauf/Sanftrührstufe unterheben.', { t: 1, l: 1 }],
      ['serve', 'Mit Kräutern und Feta servieren.']
    ] }
  }
},
{
  id: 'q-honig-knoblauch-haehnchen', n: 'Honig-Knoblauch-Hähnchen', c: 'fleisch', k: 'Asiatisch inspiriert', d: 1, p: 3,
  desc: 'Zarte Hähnchenstücke in einer klebrigen, glänzenden Soße aus Honig, Sojasoße und viel Knoblauch.',
  ing: ['500 g Hähnchenschenkelfilet', '2 EL Speisestärke', '½ TL Salz', '2 EL Öl', '#Soße', '4 Knoblauchzehen, fein gehackt', '3 EL Honig', '3 EL Sojasoße', '1 EL Reisessig', '1 TL Sesamöl', '3 EL Wasser', '#Zum Servieren', 'gekochter Reis', '2 Frühlingszwiebeln', '1 TL Sesam'],
  m: {
    herd: { t: 20, s: [
      ['chop', 'Hähnchen in mundgerechte Stücke schneiden, mit Salz und Speisestärke vermengen.'],
      ['stir', 'Honig, Sojasoße, Reisessig, Sesamöl und Wasser verrühren.'],
      ['fry', 'Öl in einer großen Pfanne erhitzen, Hähnchen in einer Lage 4 Minuten braten, wenden und 3 Minuten weiterbraten, bis es goldbraun und durch ist.', { h: 'hoch', t: 7, k: 75 }],
      ['fry', 'Hitze reduzieren, Knoblauch 30 Sekunden mitbraten.', { h: 'mittel', sec: 30 }],
      ['simmer', 'Soße angießen und 2 Minuten einkochen lassen, bis sie sirupartig an den Stücken haftet.', { h: 'mittel', t: 2 }],
      ['serve', 'Auf Reis anrichten, mit Frühlingszwiebeln und Sesam bestreuen.']
    ] },
    airfryer: { t: 22, s: [
      ['airfry', 'Bestäubte Hähnchenstücke mit 1 EL Öl mischen und bei 200 °C 12 Minuten backen, nach 6 Minuten schütteln.', { c: 200, t: 12, k: 75 }],
      ['simmer', 'Inzwischen Knoblauch in wenig Öl anschwitzen, Soße zugeben und 2 Minuten einkochen.', { h: 'mittel', t: 2 }],
      ['stir', 'Hähnchen in der Soße schwenken und servieren.']
    ] }
  },
  tips: ['Schenkelfilet bleibt saftiger als Brust. Mit Brust die Bratzeit um 1 bis 2 Minuten kürzen.']
},
{
  id: 'q-quesadillas', n: 'Hähnchen-Quesadillas mit Limetten-Schmand', c: 'snacks', k: 'Mexiko', d: 1, p: 2,
  desc: 'Knusprige Tortillas mit geschmolzenem Käse, Hähnchen, Mais und Jalapeños. Perfekt für Reste vom Brathähnchen.',
  ing: ['4 Weizentortillas', '200 g gegartes Hähnchen, gezupft', '150 g geriebener Cheddar oder Gouda', '100 g Mais', '1 Frühlingszwiebel', '1 bis 2 eingelegte Jalapeños', '½ TL Kreuzkümmel', '½ TL geräuchertes Paprikapulver', '#Limetten-Schmand', '100 g Schmand', 'Saft und Schale von ½ Limette', 'Salz', 'Koriander'],
  m: {
    herd: { t: 15, s: [
      ['mix', 'Hähnchen, Mais, Frühlingszwiebel, gehackte Jalapeños und Gewürze mischen.'],
      ['stir', 'Schmand mit Limette und Salz verrühren.'],
      ['layer', 'Auf eine Hälfte jeder Tortilla Käse, Füllung und wieder Käse geben, zuklappen.'],
      ['fry', 'In einer trockenen Pfanne bei mittlerer Hitze 2 bis 3 Minuten braten, bis die Unterseite goldbraun ist.', { h: 'mittel', t: 3 }],
      ['flip', 'Wenden und weitere 2 Minuten braten, bis der Käse geschmolzen ist.', { h: 'mittel', t: 2 }],
      ['serve', 'In Dreiecke schneiden, mit Limetten-Schmand und Koriander servieren.']
    ] },
    airfryer: { t: 14, s: [
      ['airfry', 'Gefüllte Quesadillas dünn mit Öl bepinseln, mit einem Zahnstocher verschließen und bei 190 °C 6 bis 8 Minuten backen, nach der Hälfte wenden.', { c: 190, t: 7 }],
      ['serve', 'Schneiden und mit dem Schmand servieren.']
    ] }
  }
},
{
  id: 'q-gyudon', n: 'Gyudon (japanische Rindfleisch-Reisschale)', c: 'fleisch', k: 'Japan', d: 1, p: 2,
  desc: 'Hauchdünnes Rindfleisch und Zwiebeln, in süß-salziger Dashi-Soße gegart, auf heißem Reis. Ein Klassiker der japanischen Imbissküche.',
  ing: ['300 g Rindfleisch in sehr dünnen Scheiben (Hochrippe oder Shabu-Shabu-Fleisch)', '1 große Zwiebel', '200 ml Dashi (oder Wasser mit ½ TL Dashi-Pulver)', '3 EL Sojasoße', '2 EL Mirin', '1 EL Sake', '1 EL Zucker', '2 Portionen heißer Reis', '2 Eigelb (optional)', 'Frühlingszwiebel', 'eingelegter Ingwer (Beni Shōga)'],
  m: {
    herd: { t: 15, s: [
      ['chop', 'Zwiebel halbieren und in 5 mm breite Streifen schneiden. Fleisch in mundgerechte Stücke teilen.'],
      ['simmer', 'Dashi, Sojasoße, Mirin, Sake und Zucker in einer Pfanne aufkochen. Zwiebel zugeben und 4 Minuten köcheln, bis sie weich ist.', { h: 'mittel', t: 4 }],
      ['simmer', 'Fleisch locker verteilen und 1 bis 2 Minuten garen, bis es nicht mehr rosa ist. Schaum abschöpfen.', { h: 'mittel', t: 2 }],
      ['serve', 'Reis in Schalen füllen, Fleisch, Zwiebeln und etwas Soße darauf. Nach Belieben ein Eigelb in die Mitte setzen, mit Frühlingszwiebel und Ingwer servieren.']
    ] }
  },
  tips: ['Das Fleisch nur kurz garen, sonst wird es zäh. Dünnes Fleisch gibt es im Asialaden tiefgekühlt, oder man friert ein Stück 30 Minuten an und schneidet es dann hauchdünn.']
},
{
  id: 'q-pad-kra-pao', n: 'Pad Kra Pao (Thai-Basilikum-Hähnchen mit Spiegelei)', c: 'fleisch', k: 'Thailand', d: 1, p: 2,
  desc: 'Scharf, salzig, aromatisch: gehacktes Hähnchen mit Thai-Basilikum, dazu Reis und ein Spiegelei mit knusprigem Rand.',
  ing: ['300 g Hähnchenbrust oder -schenkel, grob gehackt', '4 Knoblauchzehen', '2 bis 4 rote Thai-Chilis', '1 Schalotte', '2 EL Öl', '1 EL Austernsoße', '1 EL Sojasoße', '1 TL dunkle Sojasoße', '1 TL Fischsoße', '1 TL Zucker', '2 EL Wasser', '1 große Handvoll Thai-Basilikum', '2 Eier', '2 Portionen Jasminreis'],
  m: {
    herd: { t: 15, s: [
      ['chop', 'Knoblauch, Chilis und Schalotte grob hacken oder im Mörser zerstoßen. Soßen, Zucker und Wasser verrühren.'],
      ['fry', 'Für die Spiegeleier reichlich Öl im Wok sehr heiß werden lassen, Eier hineingleiten lassen und 1 bis 2 Minuten braten, dabei mit heißem Öl begießen, bis der Rand knusprig ist. Herausnehmen.', { h: 'hoch', t: 2 }],
      ['fry', 'Öl bis auf 2 EL abgießen. Knoblauch, Chili und Schalotte 20 Sekunden pfannenrühren.', { h: 'hoch', sec: 20 }],
      ['fry', 'Hähnchen zugeben und 3 Minuten unter Rühren braten.', { h: 'max', t: 3 }],
      ['stir', 'Soße zugeben, 1 Minute einkochen, vom Herd nehmen und das Basilikum unterheben, bis es zusammenfällt.', { h: 'hoch', t: 1 }],
      ['serve', 'Mit Reis und Spiegelei servieren.']
    ] }
  },
  tips: ['Thai-Basilikum (Bai Kra Pao, im Asialaden) schmeckt pfeffriger als italienisches. Notfalls geht Thai-Süßbasilikum oder normales Basilikum.']
},
{
  id: 'q-garnelen-tacos', n: 'Knusprige Garnelen-Tacos mit Limetten-Kraut', c: 'fisch', k: 'Mexiko (Baja California)', d: 1, p: 2,
  desc: 'Würzig panierte Garnelen, frisches Krautsalat und Chipotle-Mayo in warmen Tortillas.',
  ing: ['300 g rohe Garnelen, geschält', '3 EL Mehl', '1 TL geräuchertes Paprikapulver', '½ TL Knoblauchpulver', '½ TL Salz', '3 EL Öl', '6 kleine Mais- oder Weizentortillas', '#Limetten-Kraut', '150 g Rotkohl oder Weißkohl, fein gehobelt', 'Saft von 1 Limette', '1 Prise Salz und Zucker', '#Chipotle-Mayo', '3 EL Mayonnaise', '1 TL Chipotle in Adobo (oder geräuchertes Paprikapulver und etwas Chili)', '#Garnitur', '1 Avocado', 'Koriander', 'Limettenspalten'],
  m: {
    herd: { t: 20, s: [
      ['mix', 'Kohl mit Limettensaft, Salz und Zucker kräftig durchkneten und ziehen lassen. Mayo mit Chipotle verrühren.'],
      ['season', 'Garnelen trocken tupfen und in Mehl, Paprika, Knoblauchpulver und Salz wenden.'],
      ['fry', 'Öl in einer Pfanne stark erhitzen, Garnelen 1 bis 2 Minuten pro Seite braten, bis sie rosa und knusprig sind.', { h: 'hoch', t: 3 }],
      ['fry', 'Tortillas in einer trockenen Pfanne je 20 Sekunden pro Seite erwärmen.', { h: 'hoch', sec: 40 }],
      ['serve', 'Tortillas mit Kraut, Garnelen, Avocado, Chipotle-Mayo und Koriander füllen, Limette dazu.']
    ] },
    airfryer: { t: 18, s: [
      ['airfry', 'Bemehlte Garnelen mit Öl besprühen und bei 200 °C 6 bis 7 Minuten backen, nach der Hälfte wenden.', { c: 200, t: 7 }],
      ['serve', 'Tacos wie beschrieben füllen.']
    ] }
  }
},
{
  id: 'q-poke-bowl', n: 'Lachs-Poke-Bowl mit Sesam-Soja-Dressing', c: 'fisch', k: 'Hawaii', d: 1, p: 2,
  desc: 'Roher Lachs in Sojasoße und Sesamöl mariniert, mit Reis, Avocado, Gurke und Edamame. Frisch und satt machend.',
  ing: ['250 g Lachs in Sushi-Qualität', '2 Portionen gekochter Sushireis (warm oder lauwarm)', '1 Avocado', '½ Salatgurke', '100 g Edamame (TK, aufgetaut)', '1 Möhre', '2 Frühlingszwiebeln', '1 TL Sesam', '1 Noriblatt', '#Marinade', '3 EL Sojasoße', '1 EL Sesamöl', '1 TL Reisessig', '1 TL Honig', '½ TL geriebener Ingwer', '#Sriracha-Mayo', '2 EL Mayonnaise', '1 TL Sriracha'],
  m: {
    kalt: { t: 15, s: [
      ['chop', 'Lachs in 1,5 cm große Würfel schneiden. Gurke würfeln, Möhre in feine Streifen schneiden, Avocado in Scheiben schneiden.'],
      ['stir', 'Marinade verrühren, Lachs und Frühlingszwiebeln darin wenden und 5 Minuten ziehen lassen.', { t: 5 }],
      ['stir', 'Mayonnaise mit Sriracha verrühren.'],
      ['layer', 'Reis in Schalen verteilen, Lachs, Avocado, Gurke, Möhre und Edamame in Abschnitten darauf anrichten.'],
      ['serve', 'Mit Sriracha-Mayo, Sesam und in Streifen geschnittenem Nori servieren.']
    ] }
  },
  tips: ['Für rohen Fisch nur Ware kaufen, die ausdrücklich für Sushi oder Rohverzehr verkauft wird. Wer keinen rohen Fisch mag, nimmt kurz gebratene Lachswürfel oder Tofu.']
},
{
  id: 'q-cilbir', n: 'Çılbır (türkische Eier auf Knoblauchjoghurt mit Chilibutter)', c: 'fruehstueck', k: 'Türkei', d: 1, p: 2, v: 1,
  desc: 'Pochierte Eier auf kühlem Knoblauchjoghurt, übergossen mit heißer Paprikabutter. Mit Brot zum Tunken.',
  ing: ['4 sehr frische Eier', '250 g griechischer Joghurt', '1 kleine Knoblauchzehe', '1 Prise Salz', '1 EL Essig', '40 g Butter', '1 TL Pul Biber (Chiliflocken) oder edelsüßes Paprikapulver mit etwas Chili', 'Dill oder Minze', 'Fladenbrot oder Sauerteigbrot'],
  m: {
    herd: { t: 12, s: [
      ['stir', 'Joghurt mit fein geriebenem Knoblauch und Salz verrühren, Zimmertemperatur annehmen lassen und auf zwei Teller streichen.'],
      ['boil', 'Wasser mit Essig aufkochen, dann auf leises Simmern reduzieren. Eier einzeln in eine Tasse schlagen, einen Strudel rühren und die Eier hineingleiten lassen.', { h: 'mittel' }],
      ['simmer', 'Eier 3 Minuten pochieren, bis das Eiweiß fest und das Eigelb flüssig ist. Mit der Schaumkelle herausheben und kurz abtropfen.', { h: 'niedrig', t: 3 }],
      ['fry', 'Butter schmelzen und aufschäumen lassen, vom Herd nehmen und die Chiliflocken einrühren.', { h: 'mittel', t: 1 }],
      ['serve', 'Eier auf den Joghurt setzen, Chilibutter darübergießen, mit Kräutern bestreuen und mit warmem Brot servieren.']
    ] }
  }
},
{
  id: 'q-croque-monsieur', n: 'Croque Monsieur mit Béchamel', c: 'snacks', k: 'Frankreich', d: 1, p: 2,
  desc: 'Das Pariser Bistro-Sandwich: Schinken, Gruyère und eine schnelle Béchamel, goldbraun überbacken.',
  ing: ['4 Scheiben Toastbrot oder Sandwichbrot', '4 Scheiben Kochschinken', '120 g Gruyère oder Bergkäse, gerieben', '1 TL Dijonsenf', '#Schnelle Béchamel', '15 g Butter', '1 EL Mehl', '150 ml Milch', 'Salz, Pfeffer, Muskat'],
  m: {
    ofen: { t: 18, s: [
      ['stir', 'Butter schmelzen, Mehl einrühren, Milch nach und nach zugießen und unter Rühren 2 Minuten zu einer dicken Soße kochen. Würzen.', { h: 'mittel', t: 2 }],
      ['spread', 'Zwei Brotscheiben mit Senf bestreichen, mit Schinken und der Hälfte des Käses belegen, mit den übrigen Scheiben zudecken.'],
      ['spread', 'Béchamel dick auf die Oberseite streichen und mit dem restlichen Käse bestreuen.'],
      ['bake', 'Unter dem Grill bei 230 °C auf der mittleren Schiene 6 bis 8 Minuten backen, bis der Käse goldbraun blubbert.', { c: 230, mo: 'G', t: 7 }],
      ['serve', 'Kurz ruhen lassen, diagonal halbieren und heiß servieren.']
    ] },
    airfryer: { t: 15, s: [
      ['stir', 'Béchamel im Topf zubereiten.', { h: 'mittel', t: 2 }],
      ['layer', 'Sandwiches belegen, Béchamel und Käse darauf.'],
      ['airfry', 'Bei 190 °C 6 bis 7 Minuten backen.', { c: 190, t: 6 }],
      ['serve', 'Halbieren und servieren.']
    ] }
  },
  tips: ['Mit einem Spiegelei obendrauf wird daraus ein Croque Madame.']
},
{
  id: 'q-halloumi-wrap', n: 'Halloumi-Wrap mit Granatapfel und Joghurt-Minz-Soße', c: 'veggie', k: 'Levante', d: 1, p: 2, v: 1,
  desc: 'Gebratener Halloumi, knackiges Gemüse, süß-saurer Granatapfel und kühle Minzsoße im warmen Fladen.',
  ing: ['200 g Halloumi', '2 große Weizenwraps oder Lavash', '1 Handvoll Rucola', '½ Salatgurke', '1 Tomate', '½ rote Zwiebel', '3 EL Granatapfelkerne', '1 TL Za\'atar (optional)', '#Joghurt-Minz-Soße', '100 g Joghurt', '1 EL gehackte Minze', '1 TL Zitronensaft', 'Salz'],
  m: {
    herd: { t: 12, s: [
      ['chop', 'Halloumi in 1 cm dicke Scheiben schneiden, Gemüse in feine Streifen schneiden.'],
      ['stir', 'Joghurt mit Minze, Zitronensaft und Salz verrühren.'],
      ['fry', 'Halloumi in einer trockenen Pfanne je 2 Minuten pro Seite goldbraun braten, mit Za\'atar bestreuen.', { h: 'mittel', t: 4 }],
      ['fry', 'Wraps kurz in der Pfanne erwärmen.', { h: 'mittel', sec: 30 }],
      ['roll', 'Wraps mit Soße bestreichen, Rucola, Gemüse, Halloumi und Granatapfel darauf verteilen, fest aufrollen.'],
      ['serve', 'Schräg halbieren und sofort essen.']
    ] }
  }
},
{
  id: 'q-mapo-tofu', n: 'Mapo Tofu (scharfer Sichuan-Tofu)', c: 'veggie', k: 'China (Sichuan)', d: 2, p: 3,
  desc: 'Seidiger Tofu in einer feurigen, öligen Soße aus Bohnenpaste, Hack und Szechuanpfeffer, der auf der Zunge prickelt.',
  ing: ['400 g Seidentofu oder weicher Tofu', '150 g Schweine- oder Rinderhack', '2 EL Doubanjiang (scharfe Bohnenpaste)', '1 EL fermentierte schwarze Bohnen, gehackt (optional)', '2 Knoblauchzehen', '1 TL geriebener Ingwer', '1 TL Chiliflocken', '200 ml Hühner- oder Gemüsebrühe', '1 TL Sojasoße', '1 TL Zucker', '1 EL Speisestärke in 2 EL Wasser', '2 EL Öl', '1 TL Szechuanpfeffer, geröstet und gemahlen', '2 Frühlingszwiebeln', 'Reis'],
  m: {
    herd: { t: 20, s: [
      ['chop', 'Tofu in 2 cm große Würfel schneiden und in leicht gesalzenem, siedendem Wasser 2 Minuten ziehen lassen. Vorsichtig abgießen.', { h: 'niedrig', t: 2 }],
      ['fry', 'Öl im Wok erhitzen, Hack krümelig und knusprig braten.', { h: 'hoch', t: 3 }],
      ['fry', 'Bohnenpaste, schwarze Bohnen, Knoblauch, Ingwer und Chili zugeben und 1 Minute braten, bis das Öl rot wird.', { h: 'mittel', t: 1 }],
      ['simmer', 'Brühe, Sojasoße und Zucker zugeben, Tofu hineingleiten lassen und 4 Minuten sanft köcheln. Nicht rühren, nur den Wok schwenken.', { h: 'mittel', t: 4 }],
      ['stir', 'Stärke in zwei Portionen einrühren, bis die Soße glänzt und bindet.'],
      ['serve', 'Mit Szechuanpfeffer und Frühlingszwiebeln bestreuen, mit Reis servieren.']
    ] }
  },
  tips: ['Vegetarisch: Hack durch fein gehackte Shiitake ersetzen und Gemüsebrühe nehmen.']
},
{
  id: 'q-tomaten-ei', n: 'Chinesisches Tomaten-Rührei', c: 'veggie', k: 'China', d: 1, p: 2, v: 1,
  desc: 'Das Alltagsgericht chinesischer Familien: fluffiges Rührei in süß-säuerlicher Tomatensoße, auf Reis.',
  ing: ['4 Eier', '3 reife Tomaten', '1 Frühlingszwiebel', '2 EL Öl', '1 TL Zucker', '1 EL Ketchup (optional)', '½ TL Salz', '1 TL Sojasoße', '½ TL Sesamöl', 'Reis'],
  m: {
    herd: { t: 10, s: [
      ['whisk', 'Eier mit einer Prise Salz verquirlen. Tomaten in Spalten schneiden.'],
      ['fry', '1 EL Öl im Wok stark erhitzen, Eier hineingeben, 3 Sekunden stocken lassen, dann in großen Flocken zusammenschieben. Noch weich herausnehmen.', { h: 'hoch', sec: 40 }],
      ['fry', 'Restliches Öl erhitzen, das Weiße der Frühlingszwiebel kurz anbraten, Tomaten zugeben.', { h: 'hoch', t: 1 }],
      ['simmer', 'Zucker, Salz, Ketchup und 2 EL Wasser zugeben, 2 bis 3 Minuten braten, bis die Tomaten weich und saftig sind.', { h: 'mittel', t: 3 }],
      ['stir', 'Eier zurück in den Wok geben, Sojasoße und Sesamöl unterheben, nur kurz erwärmen.'],
      ['serve', 'Mit Frühlingszwiebelgrün auf Reis servieren.']
    ] }
  }
},
{
  id: 'q-gurkensalat-chinesisch', n: 'Geschlagener Gurkensalat mit Knoblauch und Chiliöl', c: 'salate', k: 'China', d: 1, p: 2, v: 2,
  desc: 'Gurken werden flach geschlagen statt geschnitten. So nehmen sie das Dressing aus Essig, Knoblauch und Chiliöl viel besser auf.',
  ing: ['2 Salatgurken (oder 4 Minigurken)', '1 TL Salz', '1 TL Zucker', '3 Knoblauchzehen, fein gehackt', '2 EL Reisessig oder chinesischer schwarzer Essig', '1 EL Sojasoße', '1 TL Sesamöl', '1 bis 2 EL Chiliöl', '1 TL Sesam', 'Koriander'],
  m: {
    kalt: { t: 15, s: [
      ['prep', 'Gurken waschen und mit der flachen Seite eines Messers oder einem Nudelholz flach schlagen, bis sie aufbrechen. In mundgerechte Stücke schneiden.'],
      ['season', 'Mit Salz und Zucker mischen und 10 Minuten ziehen lassen. Das ausgetretene Wasser abgießen.', { t: 10 }],
      ['stir', 'Knoblauch, Essig, Sojasoße, Sesamöl und Chiliöl verrühren.'],
      ['serve', 'Gurken mit dem Dressing mischen, mit Sesam und Koriander bestreuen und sofort servieren.']
    ] }
  }
},
{
  id: 'q-esquites', n: 'Esquites (mexikanischer Maissalat mit Limette und Feta)', c: 'salate', k: 'Mexiko', d: 1, p: 3, v: 1,
  desc: 'Angerösteter Mais mit Limette, Chili, Mayo und salzigem Käse. Mexikanisches Straßenessen aus dem Becher.',
  ing: ['400 g Maiskörner (Dose, TK oder von 3 Kolben)', '1 EL Butter', '1 kleine rote Zwiebel, fein gewürfelt', '1 Jalapeño, fein gehackt', '2 EL Mayonnaise', '2 EL saure Sahne', 'Saft von 1 Limette', '60 g Cotija oder Feta, zerbröckelt', '½ TL Chilipulver', 'Koriander', 'Salz'],
  m: {
    herd: { t: 12, s: [
      ['fry', 'Mais gut abtropfen und trocken tupfen. Butter in einer großen Pfanne stark erhitzen, Mais darin 5 bis 6 Minuten braten und nur selten rühren, damit er Röststellen bekommt.', { h: 'hoch', t: 6 }],
      ['stir', 'Mayo, saure Sahne, Limettensaft und Salz verrühren.'],
      ['mix', 'Warmen Mais mit Zwiebel, Jalapeño und dem Dressing mischen, die Hälfte des Käses unterheben.'],
      ['serve', 'Mit restlichem Käse, Chilipulver und Koriander bestreuen. Warm oder kalt servieren.']
    ] }
  }
},
{
  id: 'q-affogato', n: 'Affogato (Vanilleeis in Espresso)', c: 'dessert', k: 'Italien', d: 1, p: 2, v: 1,
  desc: 'Heißer Espresso über kaltes Vanilleeis gegossen. Zwei Zutaten, drei Minuten.',
  ing: ['2 große Kugeln gutes Vanilleeis', '2 frisch gebrühte Espresso (je 30 ml)', '1 Stück Zartbitterschokolade zum Raspeln', '2 Amarettini (optional)', '2 cl Amaretto oder Frangelico (optional, nur für Erwachsene)'],
  m: {
    kalt: { t: 3, s: [
      ['chill', 'Zwei kleine Gläser oder Tassen 10 Minuten ins Tiefkühlfach stellen, dann schmilzt das Eis langsamer.'],
      ['serve', 'Je eine Kugel Eis in die Gläser setzen.'],
      ['pour', 'Den heißen Espresso direkt darübergießen, nach Belieben einen Schuss Likör.'],
      ['grate', 'Etwas Schokolade darüberraspeln, Amarettini zerbröseln und sofort servieren.']
    ] }
  }
},
{
  id: 'q-eton-mess', n: 'Eton Mess mit Erdbeeren und Limette', c: 'dessert', k: 'England', d: 1, p: 4, v: 1,
  desc: 'Zerbrochene Baisers, Schlagsahne und marinierte Erdbeeren, locker durcheinander geschichtet.',
  ing: ['400 g Erdbeeren', '1 EL Zucker', 'Schale und Saft von ½ Limette', '250 ml Sahne', '150 g griechischer Joghurt', '1 TL Vanillezucker', '6 fertige Baisers (etwa 60 g)', 'ein paar Minzblätter'],
  m: {
    kalt: { t: 15, s: [
      ['chop', 'Erdbeeren vierteln, mit Zucker, Limettenschale und -saft mischen und 10 Minuten ziehen lassen.', { t: 10 }],
      ['whisk', 'Sahne mit Vanillezucker steif schlagen, Joghurt unterheben.'],
      ['prep', 'Baisers grob zerbrechen.'],
      ['layer', 'Sahne, Erdbeeren mit Saft und Baiserstücke locker in Gläser schichten, nicht glatt rühren.'],
      ['serve', 'Mit Minze garnieren und sofort servieren, bevor das Baiser weich wird.']
    ] }
  }
}
);
