/* Fisch & Meeresfrüchte */
R(
{
  id: 'lachs', n: 'Lachsfilet mit knuspriger Haut', c: 'fisch', k: 'International', d: 1, p: 2,
  desc: 'Haut kross, innen glasig-saftig. Kerntemperatur 50 bis 52 °C.',
  ing: ['2 Lachsfilets mit Haut (à ca. 150 g)', '1 EL Öl', 'Salz', 'Pfeffer', '1 EL Butter', '1 Zitrone', 'Dill'],
  prep: [['prep', 'Lachs 15 Minuten vor dem Garen aus dem Kühlschrank nehmen. Haut mit einem Messerrücken abschaben, um Feuchtigkeit zu entfernen, dann gründlich trocken tupfen. Beidseitig salzen.']],
  m: {
    herd: { t: 15, s: [
      ['fry', 'Öl in einer Pfanne bei mittlerer bis hoher Hitze erhitzen. Lachs mit der Hautseite nach unten einlegen und die ersten 10 Sekunden mit einem Pfannenwender flach andrücken, damit sich die Haut nicht wölbt.', { h: 'hoch' }],
      ['fry', 'Hitze auf mittel reduzieren und 5 bis 6 Minuten auf der Haut braten, bis das Fleisch von unten zu zwei Dritteln hell geworden ist.', { h: 'mittel', t: 5 }],
      ['flip', 'Wenden, Butter zugeben und 1 Minute auf der Fleischseite garen.', { h: 'mittel', t: 1, k: 50 }],
      ['serve', 'Mit der Haut nach oben anrichten (sonst wird sie weich). Pfeffern, mit Zitrone und Dill servieren.']
    ] },
    ofen: { t: 20, s: [
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen.', { c: 200, mo: 'OU' }],
      ['spread', 'Lachs mit der Hautseite nach unten auf ein Blech mit Backpapier legen, mit Öl bepinseln, mit Zitronenscheiben belegen.'],
      ['bake', 'Auf mittlerer Schiene 10 bis 14 Minuten garen, je nach Dicke, bis die Kerntemperatur 50 °C erreicht.', { c: 200, mo: 'OU', t: 12, k: 50, i: 'tray' }],
      ['serve', 'Mit Dill und Zitrone servieren. Die Haut wird im Ofen nicht kross.']
    ] },
    airfryer: { t: 15, s: [
      ['spread', 'Lachs mit Öl einpinseln, würzen.'],
      ['airfry', 'Mit der Hautseite nach unten in den Korb legen und bei 180 °C 8 bis 10 Minuten garen.', { c: 180, t: 9, k: 50 }],
      ['serve', 'Mit Zitrone und Dill servieren.']
    ] }
  },
  tips: ['Weiße Flocken auf der Oberfläche sind ausgetretenes Eiweiß, ein Zeichen, dass der Lachs zu heiß gegart wurde.']
},
{
  id: 'fish-and-chips', n: 'Fish and Chips', c: 'fisch', k: 'Großbritannien', d: 2, p: 4,
  desc: 'Kabeljau in knusprigem Bierteig mit dicken Pommes und Remoulade.',
  ing: ['4 Kabeljau- oder Schellfischfilets (à ca. 150 g)', '#Bierteig', '150 g Mehl, plus 2 EL zum Bestäuben', '1 TL Backpulver', '½ TL Salz', '250 ml eiskaltes helles Bier', '#Pommes', '1 kg mehligkochende Kartoffeln', '1,5 l Frittieröl (Pfanne) oder 2 EL Öl (Airfryer)', '#Servieren', 'Malzessig oder Zitrone', 'Remoulade oder Tartarsoße'],
  prep: [
    ['chop', 'Kartoffeln schälen und in 1,5 cm dicke Stäbchen schneiden. 30 Minuten in kaltes Wasser legen, dann gründlich trocken tupfen.', { t: 30 }],
    ['prep', 'Fisch trocken tupfen und salzen.']
  ],
  m: {
    herd: { t: 70, note: 'Einen hohen Topf höchstens zu einem Drittel mit Öl füllen. Brennendes Öl nie mit Wasser löschen, sondern mit einem Deckel ersticken.', s: [
      ['deepfry', 'Öl auf 140 °C erhitzen (Thermometer). Pommes portionsweise 6 bis 8 Minuten vorfrittieren, bis sie weich, aber noch blass sind. Abtropfen lassen.', { c: 140, h: 'mittel', t: 7 }],
      ['whisk', 'Mehl, Backpulver und Salz mischen. Eiskaltes Bier zügig unterrühren, bis ein dickflüssiger Teig entsteht. Ein paar Klümpchen sind in Ordnung.'],
      ['deepfry', 'Öl auf 180 °C erhitzen. Fisch in Mehl wenden, durch den Teig ziehen, abtropfen lassen und vorsichtig vom Körper weg ins Öl legen. 5 bis 6 Minuten goldbraun frittieren.', { c: 180, h: 'hoch', t: 6 }],
      ['rest', 'Auf einem Gitter abtropfen lassen und im Ofen bei 80 °C warm halten.'],
      ['deepfry', 'Pommes bei 180 °C in 2 bis 3 Minuten goldbraun und knusprig frittieren.', { c: 180, h: 'hoch', t: 3 }],
      ['season', 'Pommes salzen.'],
      ['serve', 'Mit Malzessig oder Zitrone und Remoulade servieren.']
    ] },
    airfryer: { t: 60, note: 'Flüssiger Bierteig tropft im Airfryer durch den Korb. Deshalb hier eine Panade aus Mehl, Ei und Panko.', s: [
      ['spread', 'Kartoffelstäbchen mit 1 EL Öl und Salz mischen.'],
      ['airfry', 'Bei 200 °C 20 bis 25 Minuten goldbraun garen, alle 5 Minuten schütteln. Warm halten.', { c: 200, t: 22 }],
      ['shape', 'Fisch in Mehl, verquirltem Ei (2 Eier) und Panko (100 g) wenden, mit Öl einsprühen.'],
      ['airfry', 'Bei 200 °C 10 bis 12 Minuten garen, nach der Hälfte vorsichtig wenden.', { c: 200, t: 11 }],
      ['serve', 'Mit Zitrone und Remoulade servieren.']
    ] }
  }
},
{
  id: 'gambas-ajillo', n: 'Gambas al ajillo', c: 'fisch', k: 'Spanien', d: 1, p: 4,
  desc: 'Garnelen in reichlich Knoblauch-Olivenöl mit Chili. Brot zum Tunken ist Pflicht.',
  ing: ['400 g rohe Garnelen, geschält und entdarmt', '120 ml Olivenöl', '6 Knoblauchzehen', '1 getrocknete Chili (Guindilla)', '1 TL Paprikapulver edelsüß', '2 EL trockener Sherry (optional)', 'Salz', 'Petersilie', 'Weißbrot'],
  prep: [['chop', 'Knoblauch in dünne Scheiben schneiden, Chili zerbröseln. Garnelen trocken tupfen und salzen.']],
  m: {
    herd: { t: 15, s: [
      ['fry', 'Olivenöl mit Knoblauch und Chili in einer kleinen Pfanne oder Tonform (Cazuela) bei mittlerer Hitze erwärmen, bis der Knoblauch leicht golden ist.', { h: 'mittel', t: 3 }],
      ['fry', 'Garnelen zugeben und 1 Minute braten.', { h: 'mittel', t: 1 }],
      ['flip', 'Wenden, Paprikapulver und Sherry zugeben und 1 bis 2 Minuten weiterbraten, bis die Garnelen rosa und gerade gar sind.', { h: 'mittel', t: 1 }],
      ['serve', 'Mit Petersilie bestreuen und sofort brutzelnd mit Brot servieren.']
    ] },
    ofen: { t: 20, s: [
      ['bake', 'Backofen auf 220 °C Ober-/Unterhitze vorheizen.', { c: 220, mo: 'OU' }],
      ['pour', 'Öl, Knoblauch und Chili in eine kleine ofenfeste Form geben und 6 Minuten im Ofen erhitzen.', { c: 220, mo: 'OU', t: 6 }],
      ['bake', 'Garnelen und Paprika zugeben, umrühren und 5 bis 6 Minuten garen.', { c: 220, mo: 'OU', t: 5, i: 'dish' }],
      ['serve', 'Mit Petersilie und Brot servieren.']
    ] }
  }
},
{
  id: 'sushi-maki', n: 'Sushi-Maki', c: 'fisch', k: 'Japan', d: 3, p: 4, pu: 'Portionen (8 Rollen)',
  desc: 'Sushireis selbst machen und zu Maki rollen. Mit Lachs, Gurke und Avocado.',
  ing: ['#Sushireis', '400 g Sushireis', '480 ml Wasser', '60 ml Reisessig', '2 EL Zucker', '1 TL Salz', '#Füllung', '8 Blätter Nori, halbiert', '200 g Lachs in Sushi-Qualität', '1 Gurke', '1 Avocado', '#Servieren', 'Sojasauce', 'Wasabi', 'Eingelegter Ingwer (Gari)'],
  m: {
    herd: { t: 90, note: 'Für rohen Fisch nur Ware mit dem Hinweis „für Rohverzehr“ oder „Sushi-Qualität“ verwenden. Alternativ Räucherlachs oder gegarte Garnelen.', s: [
      ['pour', 'Reis in einer Schüssel mit kaltem Wasser waschen, dabei mit den Händen reiben. Wasser abgießen und so oft wiederholen, bis es fast klar bleibt (5 bis 6 Mal).'],
      ['rest', 'Reis in einem Sieb 30 Minuten abtropfen lassen.', { t: 30 }],
      ['boil', 'Reis mit dem Wasser in einen Topf mit dicht schließendem Deckel geben und aufkochen.', { h: 'hoch' }],
      ['simmer', 'Auf kleinste Stufe schalten und 12 Minuten mit Deckel garen. Deckel nicht anheben.', { h: 'niedrig', t: 12 }],
      ['rest', 'Herd ausschalten und den Reis mit Deckel 10 Minuten nachquellen lassen.', { t: 10 }],
      ['stir', 'Essig, Zucker und Salz verrühren, bis sich alles löst.'],
      ['fold', 'Reis in eine breite Schüssel geben, Essigmischung darüberträufeln und mit einem Holzspatel schneidend unterheben, nicht rühren. Dabei fächeln, bis der Reis glänzt und Körpertemperatur hat.'],
      ['chop', 'Lachs, Gurke (ohne Kerne) und Avocado in fingerdicke Streifen schneiden.'],
      ['spread', 'Halbes Noriblatt mit der glänzenden Seite nach unten auf eine Bambusmatte legen. Mit feuchten Händen eine dünne Schicht Reis verteilen, oben 1 cm frei lassen.'],
      ['shape', 'Füllung quer ins untere Drittel legen. Mit der Matte fest aufrollen und dabei leicht drücken. Rand mit etwas Wasser verkleben.'],
      ['chop', 'Mit einem scharfen, nassen Messer in 6 Stücke schneiden. Klinge zwischendurch abwischen.'],
      ['serve', 'Mit Sojasauce, Wasabi und Ingwer servieren.']
    ] }
  }
},
{
  id: 'green-curry', n: 'Grünes Thai-Curry mit Garnelen', c: 'fisch', k: 'Thailand', d: 2, p: 4,
  desc: 'Kokosmilch, grüne Currypaste, Thai-Basilikum. Statt Garnelen geht auch Hähnchen oder Tofu.',
  ing: ['400 ml Kokosmilch', '2 bis 3 EL grüne Currypaste', '200 ml Hühner- oder Gemüsebrühe', '400 g rohe Garnelen', '1 kleine Aubergine oder 6 Thai-Auberginen', '1 rote Paprika', '100 g Zuckerschoten', '4 Kaffirlimettenblätter', '2 EL Fischsauce', '1 TL Palmzucker oder brauner Zucker', '1 Bund Thai-Basilikum', '1 Limette', 'Jasminreis'],
  prep: [['chop', 'Aubergine in mundgerechte Stücke, Paprika in Streifen schneiden. Kaffirblätter einreißen.']],
  m: {
    herd: { t: 30, s: [
      ['fry', 'Die dicke Kokoscreme von der Oberfläche der Dose abschöpfen und in einem Wok bei mittlerer Hitze 3 Minuten erhitzen, bis sich das Fett absetzt.', { h: 'mittel', t: 3 }],
      ['stir', 'Currypaste zugeben und 2 Minuten unter Rühren anbraten, bis sie stark duftet.', { h: 'mittel', t: 2 }],
      ['pour', 'Restliche Kokosmilch, Brühe und Kaffirblätter zugeben und aufkochen.', { h: 'hoch' }],
      ['simmer', 'Aubergine zugeben und 5 Minuten köcheln.', { h: 'mittel', t: 5 }],
      ['simmer', 'Paprika, Zuckerschoten und Garnelen zugeben und 3 Minuten köcheln, bis die Garnelen rosa sind.', { h: 'mittel', t: 3 }],
      ['season', 'Mit Fischsauce und Zucker abschmecken, Basilikumblätter unterrühren.'],
      ['serve', 'Mit Jasminreis und Limettenspalten servieren.']
    ] },
    tm: { t: 30, s: [
      ['tm', 'Kokoscreme und Currypaste in den Mixtopf geben, 4 Min./120 °C/Stufe 1.', { t: 4, c: 120, s: 1 }],
      ['tm', 'Restliche Kokosmilch, Brühe, Kaffirblätter und Aubergine zugeben, 8 Min./100 °C/Linkslauf/Sanftrührstufe.', { t: 8, c: 100, l: true, s: 'sanft' }],
      ['tm', 'Paprika, Zuckerschoten, Garnelen, Fischsauce und Zucker zugeben, 5 Min./95 °C/Linkslauf/Sanftrührstufe.', { t: 5, c: 95, l: true, s: 'sanft' }],
      ['serve', 'Basilikum unterheben und mit Reis servieren.']
    ] }
  }
},
{
  id: 'ceviche', n: 'Ceviche', c: 'fisch', k: 'Peru', d: 2, p: 4,
  desc: 'Roher Fisch, in Limettensaft „gegart“, mit roter Zwiebel, Chili und Koriander.',
  ing: ['500 g fester weißer Fisch in Sushi-Qualität (Wolfsbarsch, Dorade)', '8 bis 10 Limetten', '1 rote Zwiebel', '1 Ají Limo oder rote Chili', '½ Bund Koriander', '1 TL Salz', '1 Süßkartoffel', '1 Maiskolben (optional)'],
  m: {
    kalt: { t: 40, note: 'Nur absolut frischen Fisch verwenden, der zum Rohverzehr verkauft wird.', s: [
      ['boil', 'Süßkartoffel und Mais vorher im Topf weich kochen, abkühlen lassen, in Scheiben schneiden.', { h: 'mittel', t: 20 }],
      ['chop', 'Fisch in 2 cm große Würfel schneiden. Zwiebel in hauchdünne Streifen schneiden und 10 Minuten in Eiswasser legen (macht sie milder). Chili fein hacken, Koriander hacken.'],
      ['season', 'Fisch in einer gekühlten Glasschüssel salzen und 1 Minute stehen lassen.'],
      ['pour', 'Limetten auspressen (nicht zu stark, sonst wird es bitter) und den Saft über den Fisch gießen. Chili zugeben.'],
      ['rest', '3 bis 10 Minuten ziehen lassen. Der Fisch wird außen weiß, innen bleibt er glasig.', { t: 5 }],
      ['fold', 'Zwiebel und Koriander unterheben.'],
      ['serve', 'Sofort mit Süßkartoffel und Mais servieren. Den Saft (Leche de Tigre) in Gläsern dazu reichen.']
    ] }
  }
}
);
