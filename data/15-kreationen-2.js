/* Eigene Kreationen, zweite Runde: neue Kombinationen aus bewährten Techniken. Nicht in einer Testküche nachgekocht. */
R(
{
  id: 'k-kimchi-kaesespaetzle', n: 'Kimchi-Käsespätzle mit Röstzwiebeln und Gochugaru-Butter', c: 'kreation', k: 'Fusion Korea & Allgäu', d: 2, p: 4, v: 1,
  desc: 'Allgäuer Käsespätzle, in die gebratenes Kimchi geschichtet wird. Die Säure des Kimchis schneidet durch den Käse, die Chilibutter bringt Wärme.',
  ing: ['#Spätzle', '400 g Mehl (Type 405)', '5 Eier', '150 ml Mineralwasser', '1 TL Salz', '#Schichten', '250 g Kimchi, gut abgetropft und gehackt', '1 EL Kimchi-Saft', '250 g Bergkäse, gerieben', '100 g Emmentaler, gerieben', '2 große Zwiebeln', '2 EL Mehl', 'Öl zum Braten', '#Gochugaru-Butter', '40 g Butter', '1 TL Gochugaru (koreanische Chiliflocken)', '1 TL Sesam', '#Garnitur', '2 Frühlingszwiebeln in Ringen'],
  prep: [
    ['mix', 'Mehl, Eier, Wasser und Salz mit einem Kochlöffel schlagen, bis der Teig Blasen wirft und zäh vom Löffel reißt. 10 Minuten ruhen lassen.', { t: 10 }],
    ['chop', 'Zwiebeln in feine Ringe schneiden, in Mehl wenden.']
  ],
  m: {
    herd: { t: 45, s: [
      ['deepfry', 'Zwiebelringe in 2 cm heißem Öl portionsweise goldbraun frittieren und auf Küchenpapier abtropfen.', { h: 'hoch', t: 6 }],
      ['fry', 'Kimchi in einer Pfanne mit 1 TL Öl 3 Minuten braten, bis es an den Rändern karamellisiert. Kimchi-Saft zugeben.', { h: 'hoch', t: 3 }],
      ['boil', 'Spätzle portionsweise in siedendes Salzwasser schaben oder pressen. Sobald sie oben schwimmen, mit der Schaumkelle herausheben.', { h: 'hoch', t: 12 }],
      ['layer', 'Abwechselnd heiße Spätzle, Kimchi und Käse in eine vorgewärmte Form schichten, mit Käse abschließen. Jede Schicht kurz durchziehen lassen, damit der Käse schmilzt.'],
      ['fry', 'Butter aufschäumen, vom Herd nehmen, Gochugaru und Sesam einrühren.', { h: 'mittel', t: 1 }],
      ['serve', 'Chilibutter über die Spätzle träufeln, Röstzwiebeln und Frühlingszwiebeln darauf.']
    ] },
    ofen: { t: 50, s: [
      ['boil', 'Spätzle kochen wie beschrieben.', { h: 'hoch', t: 12 }],
      ['layer', 'Mit gebratenem Kimchi und Käse in eine Auflaufform schichten.'],
      ['bake', 'Bei 200 °C Ober-/Unterhitze 10 Minuten überbacken.', { c: 200, mo: 'OU', t: 10 }],
      ['serve', 'Mit Chilibutter, Röstzwiebeln und Frühlingszwiebeln servieren.']
    ] }
  },
  tips: ['Je älter das Kimchi, desto saurer und besser zum Braten.', 'Für die schnelle Variante fertige Spätzle aus dem Kühlregal in Butter anbraten.']
},
{
  id: 'k-ramen-carbonara', n: 'Ramen-Carbonara mit Miso und Speck', c: 'kreation', k: 'Fusion Japan & Italien', d: 1, p: 2,
  desc: 'Krause Ramen-Nudeln in einer Carbonara-Soße aus Eigelb, Parmesan und weißer Misopaste. In 15 Minuten fertig.',
  ing: ['2 Portionen Ramen-Nudeln (frisch oder getrocknet, ohne Würzpulver)', '100 g Bacon oder Guanciale, gewürfelt', '2 Eigelb und 1 ganzes Ei', '40 g Parmesan, fein gerieben', '1 EL helle Misopaste', '1 Knoblauchzehe', 'viel schwarzer Pfeffer', '2 Frühlingszwiebeln', '1 TL Sesam', 'Nori-Streifen (optional)'],
  m: {
    herd: { t: 15, s: [
      ['whisk', 'Eigelb, Ei, Parmesan, Miso und reichlich Pfeffer zu einer dicken Paste verrühren.'],
      ['fry', 'Speck in einer kalten Pfanne langsam auslassen und knusprig braten. Knoblauch die letzte Minute mitbraten. Pfanne vom Herd nehmen.', { h: 'mittel', t: 6 }],
      ['boil', 'Ramen nach Packungsangabe kochen. Eine halbe Tasse Kochwasser aufheben.', { h: 'hoch', t: 3 }],
      ['stir', 'Nudeln in die Speckpfanne geben, 3 EL Kochwasser zugeben und schwenken, damit die Pfanne etwas abkühlt.'],
      ['stir', 'Eiermasse zugeben und zügig unterrühren, bis eine cremige Soße entsteht. Bei Bedarf mehr Kochwasser. Nicht mehr auf die heiße Platte stellen, sonst stockt das Ei.'],
      ['serve', 'Mit Frühlingszwiebel, Sesam, Nori und Pfeffer servieren.']
    ] }
  },
  tips: ['Das Miso ersetzt einen Teil des Salzes. Erst am Ende probieren, bevor nachgesalzen wird.']
},
{
  id: 'k-tandoori-flammkuchen', n: 'Tandoori-Hähnchen-Flammkuchen mit Minz-Raita', c: 'kreation', k: 'Fusion Indien & Elsass', d: 2, p: 2,
  desc: 'Hauchdünner Flammkuchenboden mit Crème fraîche, rauchigem Tandoori-Hähnchen und roten Zwiebeln, nach dem Backen mit kühler Minz-Raita.',
  ing: ['#Teig', '200 g Mehl', '100 ml lauwarmes Wasser', '2 EL Öl', '½ TL Salz', '#Tandoori-Hähnchen', '250 g Hähnchenbrust', '3 EL Joghurt', '1 EL Tandoori-Masala', '1 TL Zitronensaft', '½ TL Salz', '#Belag', '150 g Crème fraîche', '½ TL Garam Masala', '1 rote Zwiebel, in dünnen Ringen', '#Minz-Raita', '100 g Joghurt', '5 cm Salatgurke, gerieben und ausgedrückt', '1 EL gehackte Minze', 'Salz', '#Garnitur', 'Koriander', '1 grüne Chili, in Ringen'],
  prep: [
    ['mix', 'Hähnchen in feine Streifen schneiden, mit Joghurt, Tandoori-Masala, Zitronensaft und Salz mischen und mindestens 15 Minuten marinieren.', { t: 15 }],
    ['knead', 'Mehl, Wasser, Öl und Salz 5 Minuten zu einem glatten Teig kneten, 10 Minuten ruhen lassen.', { t: 5 }],
    ['stir', 'Joghurt, Gurke, Minze und Salz zur Raita verrühren und kalt stellen.']
  ],
  m: {
    ofen: { t: 40, s: [
      ['bake', 'Backofen mit Blech auf höchster Stufe (mindestens 250 °C) vorheizen.', { c: 250, mo: 'OU', t: 15 }],
      ['fry', 'Hähnchenstreifen in einer sehr heißen Pfanne 3 Minuten anbraten, bis sie Farbe haben. Sie garen im Ofen fertig.', { h: 'hoch', t: 3 }],
      ['roll', 'Teig auf Backpapier hauchdünn ausrollen, etwa 30 x 40 cm.'],
      ['spread', 'Crème fraîche mit Garam Masala verrühren, auf dem Teig verstreichen, Zwiebeln und Hähnchen darauf verteilen.'],
      ['bake', 'Mit dem Papier auf das heiße Blech ziehen und 8 bis 10 Minuten backen, bis die Ränder knusprig und gebräunt sind.', { c: 250, mo: 'OU', t: 9 }],
      ['serve', 'Raita in Klecksen darauf verteilen, mit Koriander und Chili bestreuen und sofort schneiden.']
    ] }
  }
},
{
  id: 'k-schwarzwaelder-tiramisu', n: 'Schwarzwälder Tiramisu im Glas', c: 'kreation', k: 'Fusion Schwarzwald & Italien', d: 1, p: 6, v: 1,
  desc: 'Löffelbiskuits in Kirschwasser-Kakao, Mascarponecreme mit Sahne, Sauerkirschen und Schokoraspel. Tiramisu trifft Kirschtorte.',
  ing: ['200 g Löffelbiskuits', '150 ml starker Kakao (abgekühlt)', '3 EL Kirschwasser (oder Kirschsaft für Kinder)', '1 Glas Sauerkirschen (370 g Abtropfgewicht)', '2 TL Speisestärke', '1 EL Zucker', '#Creme', '250 g Mascarpone', '200 ml Sahne', '60 g Puderzucker', '1 Päckchen Vanillezucker', '#Garnitur', '50 g Zartbitterschokolade, geraspelt', '6 Cocktailkirschen oder frische Kirschen'],
  m: {
    kalt: { t: 25, note: 'Danach mindestens 2 Stunden kühlen.', s: [
      ['simmer', 'Kirschen abtropfen, 150 ml Saft auffangen. Saft mit Zucker aufkochen, mit der angerührten Stärke binden, Kirschen unterheben und abkühlen lassen.', { h: 'mittel', t: 3 }],
      ['whisk', 'Sahne mit Vanillezucker steif schlagen. Mascarpone mit Puderzucker glatt rühren und die Sahne unterheben.'],
      ['stir', 'Kakao mit Kirschwasser mischen.'],
      ['layer', 'Löffelbiskuits halbieren, kurz in den Kakao tauchen und in Gläser legen. Kirschen, dann Creme darauf. Noch eine Schicht wiederholen, mit Creme abschließen.'],
      ['chill', 'Mindestens 2 Stunden, besser über Nacht kühlen.', { t: 120 }],
      ['serve', 'Mit Schokoraspeln und einer Kirsche obendrauf servieren.']
    ] }
  }
},
{
  id: 'k-elote-pasta', n: 'Elote-Pasta mit geröstetem Mais, Limette und Cotija', c: 'kreation', k: 'Fusion Mexiko & Italien', d: 1, p: 3, v: 1,
  desc: 'Der mexikanische Straßenmais als cremige Nudelsoße: Röstmais, Chipotle, Limette und salziger Käse.',
  ing: ['300 g kurze Nudeln (Rigatoni oder Orecchiette)', '350 g Mais (TK oder Dose)', '1 EL Butter', '2 Knoblauchzehen', '1 TL Chipotle in Adobo oder geräuchertes Paprikapulver', '100 g Schmand oder saure Sahne', '2 EL Mayonnaise', 'Schale und Saft von 1 Limette', '80 g Cotija oder Feta', '1 Jalapeño (optional)', 'Koriander', 'Chilipulver zum Bestreuen'],
  m: {
    herd: { t: 20, s: [
      ['boil', 'Nudeln in Salzwasser bissfest kochen, eine Tasse Kochwasser aufheben.', { h: 'hoch', t: 11 }],
      ['fry', 'Mais trocken tupfen und in Butter bei hoher Hitze 6 Minuten braten, bis er Röststellen hat. Knoblauch und Chipotle die letzte Minute mitbraten.', { h: 'hoch', t: 6 }],
      ['stir', 'Schmand, Mayo, Limettensaft und die Hälfte des Käses verrühren.'],
      ['stir', 'Nudeln zum Mais geben, Pfanne vom Herd nehmen, Soße und so viel Kochwasser unterrühren, bis alles cremig glänzt.'],
      ['serve', 'Mit restlichem Käse, Limettenschale, Koriander, Jalapeño und einer Prise Chilipulver servieren.']
    ] }
  }
},
{
  id: 'k-pho-dip', n: 'Phở-Dip-Sandwich mit Rinderbrühe zum Eintunken', c: 'kreation', k: 'Fusion Vietnam & USA', d: 2, p: 4,
  desc: 'Ein French-Dip-Sandwich, aber mit dünnem Roastbeef, Hoisin-Sriracha-Mayo und Thai-Basilikum. Dazu eine Tasse würzige Phở-Brühe zum Tunken.',
  ing: ['#Brühe', '1 l kräftige Rinderbrühe', '1 Zwiebel, halbiert', '5 cm Ingwer, halbiert', '2 Sternanis', '1 Zimtstange', '3 Gewürznelken', '1 EL Fischsoße', '1 TL Zucker', '#Sandwich', '4 Baguettebrötchen', '400 g Roastbeef in dünnen Scheiben', '2 EL Hoisinsoße', '3 EL Mayonnaise', '1 TL Sriracha', '1 Handvoll Thai-Basilikum', '1 Handvoll Sojasprossen', '1 Limette', '1 rote Chili'],
  m: {
    herd: { t: 35, s: [
      ['fry', 'Zwiebel und Ingwer mit der Schnittfläche in einer trockenen Pfanne 5 Minuten schwarz rösten.', { h: 'hoch', t: 5 }],
      ['fry', 'Sternanis, Zimt und Nelken 1 Minute in einem Topf trocken rösten, bis sie duften.', { h: 'mittel', t: 1 }],
      ['simmer', 'Brühe, Zwiebel, Ingwer, Fischsoße und Zucker zugeben und 20 Minuten leise köcheln. Durch ein Sieb gießen und heiß halten.', { h: 'niedrig', t: 20 }],
      ['stir', 'Mayonnaise mit Hoisin und Sriracha verrühren.'],
      ['simmer', 'Roastbeefscheiben 10 Sekunden in die heiße Brühe tauchen.', { h: 'niedrig', sec: 10 }],
      ['layer', 'Brötchen aufschneiden, kurz rösten, mit der Mayo bestreichen, Roastbeef, Sprossen, Basilikum und Chili einlegen.'],
      ['serve', 'Mit einer Tasse Brühe zum Eintunken und Limettenspalten servieren.']
    ] }
  }
},
{
  id: 'k-apfelstrudel-french-toast', n: 'Apfelstrudel-French-Toast mit Vanillesoße', c: 'kreation', k: 'Fusion Wien & USA', d: 1, p: 2, v: 1,
  desc: 'Dicke Briochescheiben mit einer Füllung aus Zimtäpfeln, Rosinen und Bröseln, in Eiermilch gebraten, dazu warme Vanillesoße.',
  ing: ['4 dicke Scheiben Brioche oder Hefezopf (3 cm)', '#Füllung', '2 Äpfel (säuerlich)', '20 g Butter', '2 EL brauner Zucker', '1 TL Zimt', '2 EL Rosinen', '2 EL Semmelbrösel', '#Eiermilch', '2 Eier', '150 ml Milch', '1 EL Zucker', '1 Prise Salz', 'Butter zum Braten', '#Dazu', '200 ml Vanillesoße', 'Puderzucker'],
  m: {
    herd: { t: 25, s: [
      ['chop', 'Äpfel schälen und klein würfeln.'],
      ['fry', 'Butter in einer Pfanne schmelzen, Semmelbrösel goldbraun rösten, Äpfel, Zucker, Zimt und Rosinen zugeben und 5 Minuten weich dünsten.', { h: 'mittel', t: 5 }],
      ['prep', 'In jede Briochescheibe seitlich eine tiefe Tasche schneiden und mit der Apfelfüllung füllen.'],
      ['whisk', 'Eier, Milch, Zucker und Salz verquirlen. Gefüllte Scheiben darin von beiden Seiten je 20 Sekunden einweichen.'],
      ['fry', 'In Butter bei mittlerer Hitze je Seite 3 Minuten goldbraun braten.', { h: 'mittel', t: 6 }],
      ['serve', 'Mit warmer Vanillesoße und Puderzucker servieren.']
    ] }
  }
},
{
  id: 'k-sushi-burrito', n: 'Lachs-Sushi-Burrito mit Wasabi-Mayo', c: 'kreation', k: 'Fusion Japan & Mexiko', d: 2, p: 2,
  desc: 'Eine riesige Maki-Rolle zum Mitnehmen: Sushireis, Lachs, Avocado, Gurke und Mango im Noriblatt, mit Wasabi-Mayo und Knusperzwiebeln.',
  ing: ['250 g Sushireis', '3 EL Reisessig', '1 EL Zucker', '1 TL Salz', '4 Noriblätter', '200 g Lachs in Sushi-Qualität (oder gebratener Lachs)', '1 Avocado', '½ Salatgurke', '½ Mango', '1 Handvoll Rucola oder Salat', '2 EL Röstzwiebeln', '#Wasabi-Mayo', '3 EL Mayonnaise', '½ TL Wasabi', '1 TL Limettensaft'],
  m: {
    herd: { t: 40, s: [
      ['boil', 'Reis waschen, bis das Wasser klar bleibt, mit 300 ml Wasser aufkochen und zugedeckt 12 Minuten bei kleiner Hitze garen, 10 Minuten ruhen lassen.', { h: 'niedrig', t: 12 }],
      ['stir', 'Essig, Zucker und Salz auflösen und unter den heißen Reis heben. Abkühlen lassen.'],
      ['chop', 'Lachs, Avocado, Gurke und Mango in lange Streifen schneiden. Mayo mit Wasabi und Limette verrühren.'],
      ['layer', 'Zwei Noriblätter leicht überlappend mit etwas Wasser verkleben. Die Hälfte des Reises dünn darauf verteilen, oben 3 cm frei lassen.'],
      ['layer', 'Füllung quer in einer dicken Reihe auf das untere Drittel legen, Mayo und Röstzwiebeln darauf.'],
      ['roll', 'Von unten fest aufrollen, den freien Rand mit Wasser befeuchten und andrücken. Zweite Rolle genauso.'],
      ['serve', 'In Backpapier oder Alufolie wickeln und mit einem scharfen, nassen Messer schräg halbieren.']
    ] }
  }
}
);
