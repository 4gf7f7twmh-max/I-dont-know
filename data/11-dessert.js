/* Desserts */
R(
{
  id: 'tiramisu', n: 'Tiramisu', c: 'dessert', k: 'Italien', d: 1, p: 8, v: 1,
  desc: 'Mascarponecreme, Espresso-Löffelbiskuits und Kakao. Klassisch mit rohen Eiern oder mit erhitzter Eiercreme.',
  ing: ['4 sehr frische Eier', '100 g Zucker', '500 g Mascarpone', '1 Prise Salz', '300 ml starker Espresso, abgekühlt', '3 EL Amaretto oder Marsala (optional)', '200 g Löffelbiskuits', '3 EL Kakaopulver'],
  prep: [['pour', 'Espresso mit Amaretto in einer flachen Schale mischen.']],
  post: [
    ['layer', 'Löffelbiskuits einzeln 1 bis 2 Sekunden pro Seite in den Espresso tauchen (nicht länger, sonst zerfallen sie) und eine Form (ca. 20 x 30 cm) damit auslegen. Die Hälfte der Creme darauf verstreichen. Wiederholen.'],
    ['chill', 'Mindestens 6 Stunden, besser über Nacht, kühlen.', { t: 360 }],
    ['serve', 'Kurz vor dem Servieren dick mit Kakao bestäuben (durch ein Sieb).']
  ],
  m: {
    kalt: { t: 30, note: 'Diese Variante enthält rohe Eier. Nicht für Schwangere, kleine Kinder und ältere Menschen.', s: [
      ['mix', 'Eier trennen. Eigelbe mit Zucker 5 Minuten mit dem Handmixer aufschlagen, bis die Masse hell und dick ist.', { t: 5 }],
      ['stir', 'Mascarpone in zwei Portionen kurz unterrühren.'],
      ['mix', 'Eiweiß mit Salz in einer sauberen, fettfreien Schüssel steif schlagen.'],
      ['fold', 'Eischnee in drei Portionen vorsichtig unter die Mascarponecreme heben.']
    ] },
    herd: { t: 40, note: 'Die Eigelbe werden über dem Wasserbad auf über 70 °C erhitzt (Zabaione), das ist sicherer. Statt Eischnee kommt geschlagene Sahne in die Creme.', s: [
      ['simmer', 'Einen Topf 3 cm hoch mit Wasser füllen und zum Simmern bringen.', { h: 'niedrig' }],
      ['whisk', '4 Eigelbe und Zucker in einer Metallschüssel über dem Wasserbad (die Schüssel berührt das Wasser nicht) 6 bis 8 Minuten aufschlagen, bis die Masse dick ist und 75 °C erreicht.', { t: 7, k: 75 }],
      ['cool', 'Schüssel in kaltes Wasser stellen und weiterschlagen, bis die Masse abgekühlt ist.', { t: 5 }],
      ['stir', 'Mascarpone unterrühren.'],
      ['mix', '200 ml kalte Sahne steif schlagen und unterheben (statt Eischnee).']
    ] }
  }
},
{
  id: 'creme-brulee', n: 'Crème brûlée', c: 'dessert', k: 'Frankreich', d: 2, p: 4, v: 1,
  desc: 'Vanillecreme unter einer Kruste aus karamellisiertem Zucker.',
  ing: ['400 ml Sahne', '100 ml Milch', '1 Vanilleschote', '5 Eigelb', '70 g Zucker', '4 EL brauner Zucker für die Kruste'],
  prep: [
    ['simmer', 'Vanilleschote längs aufschneiden, Mark auskratzen. Sahne, Milch, Mark und Schote erhitzen, bis kurz vor dem Kochen. Vom Herd nehmen und 15 Minuten ziehen lassen.', { h: 'mittel', t: 15 }],
    ['whisk', 'Eigelbe und Zucker verrühren (nicht schaumig schlagen). Warme Sahne langsam unter Rühren zugießen. Durch ein feines Sieb gießen und den Schaum abschöpfen.'],
    ['pour', 'In 4 flache, ofenfeste Förmchen (ca. 150 ml) füllen.']
  ],
  post: [
    ['chill', 'Abkühlen lassen und mindestens 4 Stunden kühlen.', { t: 240 }],
    ['season', 'Kurz vor dem Servieren mit je 1 EL braunem Zucker gleichmäßig bestreuen.'],
    ['fry', 'Mit einem Küchenbrenner karamellisieren, bis der Zucker blubbert und goldbraun ist. Ohne Brenner: unter dem Backofengrill auf höchster Stufe, 2 bis 3 Minuten, dabeibleiben.'],
    ['serve', '2 Minuten warten, bis die Kruste hart ist, dann servieren.']
  ],
  m: {
    ofen: { t: 330, s: [
      ['bake', 'Backofen auf 150 °C Ober-/Unterhitze vorheizen. Förmchen in eine tiefe Form stellen und kochendes Wasser bis zur halben Höhe der Förmchen angießen.', { c: 150, mo: 'OU' }],
      ['bake', '35 bis 45 Minuten garen, bis die Creme am Rand fest ist und in der Mitte noch leicht wackelt.', { c: 150, mo: 'OU', t: 40, i: 'dish' }]
    ] },
    airfryer: { t: 310, note: 'Nur flache Förmchen, die in den Korb passen. Mit Alufolie abdecken, damit die Oberfläche keine Haut bekommt.', s: [
      ['airfry', 'Förmchen mit Alufolie abdecken und bei 140 °C 25 bis 30 Minuten garen.', { c: 140, t: 28 }],
      ['rest', 'Prüfen: Die Mitte soll noch leicht wackeln. Sonst in 3-Minuten-Schritten weitergaren.']
    ] }
  }
},
{
  id: 'panna-cotta', n: 'Panna cotta mit Beerensoße', c: 'dessert', k: 'Italien', d: 1, p: 4, v: 1,
  desc: 'Gekochte Sahne, gerade so fest, dass sie beim Stürzen wackelt.',
  ing: ['500 ml Sahne', '50 g Zucker', '1 Vanilleschote', '3 Blatt Gelatine (oder 1 g Agar-Agar)', '#Beerensoße', '250 g gemischte Beeren (TK)', '2 EL Zucker', '1 TL Zitronensaft'],
  prep: [['rest', 'Gelatine 5 Minuten in kaltem Wasser einweichen.', { t: 5 }]],
  m: {
    herd: { t: 270, s: [
      ['simmer', 'Sahne, Zucker, Vanillemark und Schote aufkochen und 5 Minuten leise köcheln.', { h: 'niedrig', t: 5 }],
      ['stir', 'Vom Herd nehmen, Schote entfernen. Gelatine ausdrücken und in der heißen Sahne auflösen.'],
      ['pour', 'In 4 Gläser oder kalt ausgespülte Förmchen füllen.'],
      ['chill', 'Mindestens 4 Stunden kühlen.', { t: 240 }],
      ['simmer', 'Beeren mit Zucker und Zitronensaft 5 Minuten köcheln, nach Wunsch pürieren und durch ein Sieb streichen. Abkühlen lassen.', { h: 'mittel', t: 5 }],
      ['serve', 'Förmchen kurz in heißes Wasser tauchen und auf Teller stürzen, oder im Glas mit Soße servieren.']
    ] },
    tm: { t: 260, s: [
      ['tm', 'Sahne, Zucker und Vanillemark 8 Min./90 °C/Stufe 2.', { t: 8, c: 90, s: 2 }],
      ['tm', 'Ausgedrückte Gelatine zugeben, 20 Sek./Stufe 3.', { sec: 20, s: 3 }],
      ['pour', 'In Förmchen füllen und 4 Stunden kühlen.'],
      ['tm', 'Für die Soße Beeren, Zucker und Zitronensaft 5 Min./100 °C/Stufe 2, dann 15 Sek./Stufe 8.', { t: 5, c: 100, s: 2 }],
      ['serve', 'Mit der Soße servieren.']
    ] }
  }
},
{
  id: 'mousse-au-chocolat', n: 'Mousse au Chocolat', c: 'dessert', k: 'Frankreich', d: 2, p: 6, v: 1,
  desc: 'Nur Schokolade, Eier, etwas Zucker und Salz. Luftig und intensiv.',
  ing: ['200 g Zartbitterschokolade (65 bis 70 %)', '30 g Butter', '4 sehr frische Eier', '30 g Zucker', '1 Prise Salz', '150 ml kalte Sahne (optional, für eine weichere Mousse)'],
  post: [
    ['mix', 'Eier trennen. Eiweiß mit Salz anschlagen, dann den Zucker einrieseln lassen und zu glänzendem, aber nicht trockenem Schnee schlagen.'],
    ['stir', 'Eigelbe einzeln unter die lauwarme Schokolade rühren.'],
    ['fold', 'Ein Drittel des Eischnees kräftig unterrühren, um die Masse zu lockern. Restlichen Eischnee (und nach Wunsch geschlagene Sahne) vorsichtig unterheben.'],
    ['chill', 'In Gläser füllen und mindestens 4 Stunden kühlen.', { t: 240 }],
    ['serve', 'Mit Schokoraspeln oder Beeren servieren.']
  ],
  m: {
    herd: { t: 270, note: 'Enthält rohe Eier.', s: [
      ['stir', 'Schokolade hacken und mit der Butter in einer Schüssel über einem simmernden Wasserbad schmelzen. Abkühlen lassen, bis sie lauwarm ist (ca. 35 °C).', { h: 'niedrig', t: 6 }]
    ] },
    mikro: { t: 265, note: 'Enthält rohe Eier.', s: [
      ['micro', 'Gehackte Schokolade und Butter bei 600 Watt in 30-Sekunden-Schritten schmelzen und jedes Mal umrühren, bis sie glatt ist (ca. 1,5 Minuten).', { sec: 30, w: 600 }],
      ['cool', 'Auf lauwarm abkühlen lassen.', { t: 5 }]
    ] },
    tm: { t: 265, note: 'Enthält rohe Eier. Für den Eischnee muss der Mixtopf absolut fettfrei sein.', s: [
      ['tm', 'Schokolade in Stücken 10 Sek./Stufe 8 zerkleinern. Butter zugeben, 3 Min./50 °C/Stufe 2 schmelzen. Umfüllen und Mixtopf gründlich spülen.', { t: 3, c: 50, s: 2 }],
      ['tm', 'Rühraufsatz einsetzen. Eiweiß und Salz 3 bis 4 Min./Stufe 3,5 schlagen, Zucker nach 1 Minute einrieseln lassen.', { t: 4, s: 3.5 }]
    ] }
  }
},
{
  id: 'kaiserschmarrn', n: 'Kaiserschmarrn', c: 'dessert', k: 'Österreich', d: 2, p: 2, v: 1,
  desc: 'Fluffiger, zerrissener Pfannkuchen mit karamellisierten Rosinen und Puderzucker.',
  ing: ['3 Eier', '150 ml Milch', '100 g Mehl', '1 EL Zucker', '1 Päckchen Vanillezucker', '1 Prise Salz', '30 g Rosinen (optional, in Rum eingeweicht)', '30 g Butter', '1 EL Zucker zum Karamellisieren', 'Puderzucker', 'Apfelmus oder Zwetschgenröster'],
  prep: [
    ['whisk', 'Eier trennen. Eigelbe mit Milch, Mehl, Zucker, Vanillezucker zu einem glatten Teig verrühren.'],
    ['mix', 'Eiweiß mit Salz steif schlagen.'],
    ['fold', 'Eischnee locker unter den Teig heben.']
  ],
  m: {
    herd: { t: 30, s: [
      ['fry', 'Die Hälfte der Butter in einer beschichteten Pfanne (26 cm) bei mittlerer Hitze schmelzen. Teig einfüllen, Rosinen darüberstreuen.', { h: 'mittel' }],
      ['fry', 'Mit Deckel 4 bis 5 Minuten backen, bis die Unterseite goldbraun und die Oberfläche fast fest ist.', { h: 'niedrig', t: 5 }],
      ['flip', 'In Viertel teilen und wenden. 2 Minuten backen.', { h: 'mittel', t: 2 }],
      ['chop', 'Mit zwei Pfannenwendern in mundgerechte Stücke reißen.'],
      ['fry', 'Restliche Butter und Zucker zugeben und 2 Minuten unter Wenden karamellisieren.', { h: 'mittel', t: 2 }],
      ['serve', 'Dick mit Puderzucker bestäuben und mit Apfelmus servieren.']
    ] },
    ofen: { t: 35, note: 'Die Pfanne muss ofenfest sein. Im Ofen wird der Schmarrn besonders hoch und gleichmäßig.', s: [
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen.', { c: 200, mo: 'OU' }],
      ['fry', 'Butter in der ofenfesten Pfanne schmelzen, Teig einfüllen und 2 Minuten auf dem Herd anbacken.', { h: 'mittel', t: 2 }],
      ['bake', 'Pfanne in den Ofen stellen und 8 bis 10 Minuten backen, bis der Teig aufgegangen und goldbraun ist.', { c: 200, mo: 'OU', t: 9, i: 'dish' }],
      ['chop', 'Zurück auf den Herd stellen und in Stücke reißen.'],
      ['fry', 'Mit Butter und Zucker karamellisieren.', { h: 'mittel', t: 2 }],
      ['serve', 'Mit Puderzucker und Apfelmus servieren.']
    ] }
  }
},
{
  id: 'milchreis', n: 'Milchreis', c: 'dessert', k: 'Deutschland', d: 1, p: 4, v: 1,
  desc: 'Cremig mit Vanille, dazu Zimt und Zucker oder Kirschen.',
  ing: ['250 g Milchreis (Rundkornreis)', '1 l Milch', '50 g Zucker', '1 Prise Salz', '1 Vanilleschote oder 1 Päckchen Vanillezucker', '1 EL Butter', 'Zimt und Zucker oder Sauerkirschen'],
  m: {
    herd: { t: 45, s: [
      ['boil', 'Milch mit Zucker, Salz, Vanillemark und Schote in einem Topf mit dickem Boden aufkochen.', { h: 'mittel' }],
      ['stir', 'Reis einrühren und einmal aufkochen lassen.'],
      ['simmer', 'Bei kleinster Hitze mit Deckel 30 bis 35 Minuten quellen lassen. Alle 5 Minuten umrühren, damit nichts anbrennt.', { h: 'niedrig', t: 32 }],
      ['stir', 'Butter einrühren, Vanilleschote entfernen.'],
      ['serve', 'Warm oder kalt mit Zimt und Zucker oder Kirschen servieren.']
    ] },
    tm: { t: 45, s: [
      ['tm', 'Milch, Reis, Zucker, Salz und Vanille in den Mixtopf geben, 35 Min./90 °C/Linkslauf/Stufe 1 (ohne Messbecher, Garkörbchen auf den Deckel).', { t: 35, c: 90, l: true, s: 1 }],
      ['rest', 'Im Mixtopf 5 Minuten nachquellen lassen.', { t: 5 }],
      ['serve', 'Butter unterrühren und servieren.']
    ] },
    slow: { t: 190, s: [
      ['slow', 'Alle Zutaten in den gefetteten Slow Cooker geben und auf LOW 3 Stunden garen, nach 2 Stunden einmal umrühren.', { lvl: 'LOW', t: 180 }],
      ['stir', 'Butter einrühren und servieren.']
    ] }
  }
},
{
  id: 'crepes', n: 'Crêpes', c: 'dessert', k: 'Frankreich', d: 1, p: 4, v: 1, pu: 'Portionen (ca. 12 Crêpes)',
  desc: 'Hauchdünn, mit braunem Butterrand. Süß oder herzhaft füllbar.',
  ing: ['250 g Mehl', '4 Eier', '500 ml Milch', '1 Prise Salz', '1 EL Zucker (für süße Crêpes)', '40 g geschmolzene Butter, plus Butter für die Pfanne', 'Füllung nach Wahl: Zucker und Zitrone, Nussnougatcreme, Apfelmus'],
  m: {
    herd: { t: 50, s: [
      ['whisk', 'Mehl, Salz und Zucker mischen. Eier und ein Drittel der Milch zugeben und zu einem glatten, dicken Teig rühren. Restliche Milch nach und nach einrühren, dann die geschmolzene Butter.'],
      ['rest', '30 Minuten ruhen lassen. Der Teig wird geschmeidiger und reißt weniger.', { t: 30 }],
      ['fry', 'Crêpepfanne oder beschichtete Pfanne bei mittlerer bis hoher Hitze erhitzen und hauchdünn mit Butter auspinseln.', { h: 'hoch' }],
      ['pour', 'Eine kleine Kelle Teig (ca. 50 ml) hineingeben und die Pfanne sofort schwenken, bis der Boden dünn bedeckt ist.'],
      ['fry', 'Etwa 1 Minute backen, bis der Rand sich hebt und die Unterseite goldbraun gesprenkelt ist.', { h: 'hoch', t: 1 }],
      ['flip', 'Mit einem Pfannenwender wenden und 30 Sekunden backen.', { sec: 30 }],
      ['serve', 'Sofort füllen, falten und servieren, oder gestapelt warm halten.']
    ] },
    tm: { t: 50, s: [
      ['tm', 'Milch, Eier, Mehl, Salz, Zucker und Butter 20 Sek./Stufe 5 verrühren.', { sec: 20, s: 5 }],
      ['rest', '30 Minuten ruhen lassen.', { t: 30 }],
      ['pour', 'In der heißen, gebutterten Pfanne je eine kleine Kelle Teig dünn verteilen.', { h: 'hoch' }],
      ['flip', 'Nach 1 Minute wenden, 30 Sekunden backen.', { t: 1 }],
      ['serve', 'Füllen und servieren.']
    ] }
  }
},
{
  id: 'apfelstrudel', n: 'Wiener Apfelstrudel', c: 'dessert', k: 'Österreich', d: 3, p: 8, v: 2,
  desc: 'Gezogener Strudelteig, so dünn, dass man Zeitung darunter lesen kann.',
  ing: ['#Strudelteig', '250 g Mehl (Type 550)', '1 Prise Salz', '125 ml lauwarmes Wasser', '3 EL Öl, plus Öl zum Bestreichen', '#Füllung', '1,2 kg säuerliche Äpfel', '80 g Zucker', '1 TL Zimt', '1 EL Zitronensaft', '60 g Rosinen', '50 g gehackte Walnüsse', '80 g Semmelbrösel', '60 g Butter oder Margarine (vegan)', 'Puderzucker'],
  m: {
    ofen: { t: 120, note: 'Mit gekauftem Strudel- oder Filoteig spart man 45 Minuten.', s: [
      ['knead', 'Mehl, Salz, Wasser und Öl 10 Minuten zu einem seidig glatten, weichen Teig kneten.', { t: 10 }],
      ['rest', 'Zu einer Kugel formen, mit Öl bestreichen und abgedeckt 30 Minuten ruhen lassen. Die Ruhezeit macht den Teig dehnbar.', { t: 30 }],
      ['fry', 'Semmelbrösel in der Butter goldbraun rösten.', { h: 'mittel', t: 4 }],
      ['chop', 'Äpfel schälen, vierteln, entkernen und in dünne Scheiben schneiden. Mit Zucker, Zimt, Zitronensaft, Rosinen und Nüssen mischen.'],
      ['roll', 'Ein großes Küchentuch bemehlen. Teig darauf so dünn wie möglich ausrollen.'],
      ['roll', 'Mit bemehlten Handrücken unter den Teig greifen und ihn vorsichtig von der Mitte nach außen ziehen, bis er durchscheinend ist (ca. 60 x 80 cm). Dicke Ränder abschneiden.'],
      ['layer', 'Bröseln auf zwei Dritteln des Teigs verteilen, Äpfel darauf.'],
      ['shape', 'Seiten einschlagen und den Strudel mit Hilfe des Tuchs aufrollen. Mit der Naht nach unten auf ein Blech mit Backpapier legen.'],
      ['spread', 'Mit geschmolzener Butter bestreichen.'],
      ['bake', 'Bei 190 °C Ober-/Unterhitze 40 bis 45 Minuten goldbraun backen, zwischendurch zweimal mit Butter bestreichen.', { c: 190, mo: 'OU', t: 42, i: 'loaf' }],
      ['serve', 'Etwas abkühlen lassen, mit Puderzucker bestäuben. Dazu Vanillesoße oder Schlagsahne.']
    ] }
  }
},
{
  id: 'churros', n: 'Churros mit Schokoladensoße', c: 'dessert', k: 'Spanien', d: 2, p: 4, v: 1,
  desc: 'Aus Brandteig gespritzt, in Zimtzucker gewälzt, zum Eintunken.',
  ing: ['250 ml Wasser', '50 g Butter', '1 EL Zucker', '½ TL Salz', '150 g Mehl', '2 Eier', '#Zimtzucker', '80 g Zucker', '1 TL Zimt', '#Schokoladensoße', '100 g Zartbitterschokolade', '150 ml Sahne'],
  prep: [
    ['boil', 'Wasser, Butter, Zucker und Salz aufkochen.', { h: 'mittel' }],
    ['stir', 'Mehl auf einmal zugeben und mit einem Holzlöffel kräftig rühren, bis sich ein Kloß bildet und am Topfboden ein weißer Belag entsteht (ca. 1 Minute).', { h: 'niedrig', t: 1 }],
    ['cool', 'Teig in eine Schüssel geben und 5 Minuten abkühlen lassen.', { t: 5 }],
    ['mix', 'Eier einzeln unterrühren, bis der Teig glänzt und schwer reißend vom Löffel fällt.'],
    ['pour', 'Teig in einen Spritzbeutel mit großer Sterntülle (1,5 cm) füllen.'],
    ['simmer', 'Für die Soße Sahne erhitzen, über die gehackte Schokolade gießen und glatt rühren.', { h: 'mittel', t: 2 }]
  ],
  m: {
    herd: { t: 45, s: [
      ['deepfry', 'Öl in einem Topf 4 cm hoch auf 180 °C erhitzen.', { c: 180, h: 'mittel' }],
      ['deepfry', '12 cm lange Stränge direkt ins Öl spritzen und mit einer Schere abschneiden. 3 bis 4 Minuten goldbraun frittieren, dabei wenden.', { c: 180, t: 4 }],
      ['season', 'Abtropfen lassen und noch heiß im Zimtzucker wälzen.'],
      ['serve', 'Mit der warmen Schokoladensoße servieren.']
    ] },
    airfryer: { t: 50, note: 'Werden nicht so rund und aufgebläht wie frittiert, aber trotzdem knusprig.', s: [
      ['shape', 'Stränge auf Backpapier spritzen und 20 Minuten einfrieren, damit sie formstabil sind.', { t: 20 }],
      ['spread', 'Mit Öl einsprühen.'],
      ['airfry', 'Bei 190 °C 10 bis 12 Minuten backen, bis sie goldbraun sind.', { c: 190, t: 11 }],
      ['season', 'Mit geschmolzener Butter bepinseln und in Zimtzucker wälzen.'],
      ['serve', 'Mit Schokoladensoße servieren.']
    ] }
  }
},
{
  id: 'lava-cake', n: 'Schokoladen-Lava-Küchlein', c: 'dessert', k: 'Frankreich', d: 2, p: 4, v: 1,
  desc: 'Außen Kuchen, innen flüssige Schokolade. Die Backzeit entscheidet.',
  ing: ['120 g Zartbitterschokolade (70 %)', '100 g Butter, plus Butter für die Förmchen', '2 Eier', '2 Eigelb', '60 g Zucker', '1 Prise Salz', '30 g Mehl', 'Kakao zum Ausstäuben', 'Vanilleeis oder Beeren'],
  prep: [
    ['spread', '4 Ofenförmchen (ca. 150 ml) gründlich buttern und mit Kakao ausstäuben.'],
    ['stir', 'Schokolade und Butter über dem Wasserbad oder in der Mikrowelle schmelzen.'],
    ['mix', 'Eier, Eigelbe, Zucker und Salz 3 Minuten hell aufschlagen.', { t: 3 }],
    ['fold', 'Schokobutter unterrühren, dann das Mehl unterheben.'],
    ['pour', 'Teig in die Förmchen füllen (zu drei Vierteln). Lässt sich bis zu 24 Stunden im Kühlschrank vorbereiten.']
  ],
  m: {
    ofen: { t: 30, s: [
      ['bake', 'Backofen auf 220 °C Ober-/Unterhitze vorheizen.', { c: 220, mo: 'OU' }],
      ['bake', '10 bis 12 Minuten backen (gekühlt: 13 bis 14 Minuten). Der Rand ist fest, die Mitte wölbt sich und gibt bei Druck nach.', { c: 220, mo: 'OU', t: 11 }],
      ['rest', '1 Minute ruhen lassen.', { t: 1 }],
      ['flip', 'Mit einem Messer am Rand lösen und auf Teller stürzen.'],
      ['serve', 'Sofort mit Eis oder Beeren servieren.']
    ] },
    airfryer: { t: 25, s: [
      ['airfry', 'Bei 190 °C 8 bis 10 Minuten backen.', { c: 190, t: 9 }],
      ['rest', '1 Minute ruhen lassen, dann stürzen.', { t: 1 }],
      ['serve', 'Sofort servieren.']
    ] }
  },
  tips: ['Beim ersten Mal ein Testküchlein backen. Jeder Ofen ist anders, schon eine Minute macht den Unterschied zwischen flüssig und durchgebacken.']
},
{
  id: 'vanillepudding', n: 'Vanillepudding selbstgemacht', c: 'dessert', k: 'Deutschland', d: 1, p: 4, v: 1,
  desc: 'Ohne Tütchen, mit echter Vanille und Eigelb.',
  ing: ['500 ml Milch', '1 Vanilleschote', '60 g Zucker', '1 Prise Salz', '35 g Speisestärke', '2 Eigelb', '15 g Butter'],
  m: {
    herd: { t: 200, s: [
      ['simmer', '400 ml Milch mit Vanillemark, Schote, Zucker und Salz aufkochen.', { h: 'mittel' }],
      ['whisk', 'Restliche 100 ml Milch mit Stärke und Eigelben glatt rühren.'],
      ['whisk', 'Schote entfernen. Topf vom Herd nehmen, Stärkemischung unter ständigem Rühren mit dem Schneebesen einrühren.'],
      ['stir', 'Zurück auf den Herd und unter Rühren 1 Minute sprudelnd kochen lassen, bis der Pudding dick wird.', { h: 'mittel', t: 1 }],
      ['stir', 'Butter einrühren.'],
      ['pour', 'In Schalen füllen. Gegen eine Haut Frischhaltefolie direkt auf die Oberfläche legen.'],
      ['chill', 'Mindestens 3 Stunden kühlen.', { t: 180 }]
    ] },
    tm: { t: 195, s: [
      ['tm', 'Alle Zutaten außer der Butter in den Mixtopf geben, 8 Min./90 °C/Stufe 3.', { t: 8, c: 90, s: 3 }],
      ['tm', 'Butter zugeben, 10 Sek./Stufe 3.', { sec: 10, s: 3 }],
      ['pour', 'In Schalen füllen, abdecken und 3 Stunden kühlen.'],
      ['chill', 'Kalt servieren.', { t: 180 }]
    ] }
  }
},
{
  id: 'baklava', n: 'Baklava', c: 'dessert', k: 'Türkei & Griechenland', d: 2, p: 24, v: 1, pu: 'Stücke',
  desc: 'Viele Lagen Filoteig mit Butter und Pistazien, getränkt mit Zitronen-Zuckersirup.',
  ing: ['500 g Filoteig (Yufka), Raumtemperatur', '250 g Butter, geklärt (oder Ghee)', '300 g Pistazien oder Walnüsse, fein gehackt', '1 TL Zimt', '2 EL Zucker', '#Sirup', '300 g Zucker', '250 ml Wasser', 'Saft von ½ Zitrone', '1 EL Honig'],
  prep: [
    ['simmer', 'Zucker und Wasser aufkochen und 10 Minuten köcheln. Zitronensaft und Honig einrühren und vollständig abkühlen lassen.', { h: 'mittel', t: 10 }],
    ['chop', 'Nüsse fein hacken und mit Zimt und Zucker mischen.'],
    ['stir', 'Butter schmelzen.']
  ],
  m: {
    ofen: { t: 120, note: 'Filoteig trocknet schnell aus. Die Blätter, mit denen man gerade nicht arbeitet, unter einem feuchten Tuch aufbewahren.', s: [
      ['bake', 'Backofen auf 170 °C Ober-/Unterhitze vorheizen. Eine Form (ca. 25 x 35 cm) buttern.', { c: 170, mo: 'OU' }],
      ['layer', '8 Teigblätter einzeln einlegen und jedes mit Butter bepinseln.'],
      ['layer', 'Ein Drittel der Nüsse darauf verteilen. 4 gebutterte Blätter darauf, wieder Nüsse, 4 Blätter, restliche Nüsse.'],
      ['layer', 'Mit den restlichen Blättern (mindestens 8) abschließen, jedes gebuttert. Die oberste Lage großzügig buttern.'],
      ['chop', 'Mit einem scharfen Messer in Rauten oder Quadrate schneiden, bis zum Boden durch.'],
      ['bake', '50 bis 60 Minuten backen, bis die Oberfläche tief goldbraun ist.', { c: 170, mo: 'OU', t: 55, i: 'dish' }],
      ['pour', 'Den kalten Sirup sofort über die heiße Baklava gießen. Es muss zischen: heiß auf kalt, so bleibt sie knusprig.'],
      ['rest', 'Mindestens 4 Stunden, besser über Nacht, bei Raumtemperatur ziehen lassen. Nicht in den Kühlschrank.', { t: 240 }]
    ] }
  }
},
{
  id: 'eis-ohne-maschine', n: 'Vanilleeis ohne Eismaschine', c: 'dessert', k: 'International', d: 1, p: 6, v: 1,
  desc: 'Nur Sahne, gezuckerte Kondensmilch und Vanille. Wird cremig ohne Rühren.',
  ing: ['500 ml sehr kalte Sahne', '1 Dose gezuckerte Kondensmilch (397 g), kalt', '1 Vanilleschote oder 2 TL Vanilleextrakt', '1 Prise Salz', 'Optional: 100 g gehackte Schokolade, Kekse oder Beerensoße'],
  m: {
    kalt: { t: 380, s: [
      ['mix', 'Sahne mit dem Handmixer steif schlagen.'],
      ['stir', 'Kondensmilch mit Vanillemark und Salz verrühren.'],
      ['fold', 'Sahne in zwei Portionen unter die Kondensmilch heben. Nach Wunsch Schokolade oder Kekse unterheben oder Beerensoße einschwenken.'],
      ['pour', 'In eine gefrierfeste Kastenform füllen und mit Folie abdecken.'],
      ['chill', 'Mindestens 6 Stunden einfrieren.', { t: 360 }],
      ['serve', '5 Minuten vor dem Servieren herausnehmen, dann lässt es sich portionieren.']
    ] },
    tm: { t: 375, s: [
      ['tm', 'Rühraufsatz einsetzen. Sahne 1 bis 2 Min./Stufe 3,5 steif schlagen (dabei schauen), umfüllen.', { t: 1.5, s: 3.5 }],
      ['tm', 'Kondensmilch, Vanille und Salz 10 Sek./Stufe 3 verrühren.', { sec: 10, s: 3 }],
      ['fold', 'Sahne von Hand unterheben.'],
      ['chill', 'In eine Form füllen und 6 Stunden einfrieren.', { t: 360 }]
    ] }
  }
},
{
  id: 'mango-sticky-rice', n: 'Mango Sticky Rice', c: 'dessert', k: 'Thailand', d: 2, p: 4, v: 2,
  desc: 'Klebreis in gesalzener Kokosmilch mit reifer Mango.',
  ing: ['250 g Klebreis (Glutinous Rice)', '400 ml Kokosmilch', '80 g Zucker', '½ TL Salz', '1 TL Speisestärke', '2 reife Mangos', '1 EL geröstete Sesamsamen oder Mungbohnen'],
  m: {
    herd: { t: 300, note: 'Klebreis muss gedämpft werden, nicht gekocht. Ein Dämpfeinsatz oder ein Sieb über einem Topf mit Deckel reicht.', s: [
      ['rest', 'Klebreis mindestens 4 Stunden, besser über Nacht, in kaltem Wasser einweichen. Abgießen.', { t: 240 }],
      ['steam', 'In ein mit einem Tuch ausgelegtes Sieb geben und über kochendem Wasser mit Deckel 20 bis 25 Minuten dämpfen, bis die Körner glasig und weich sind.', { h: 'mittel', t: 22 }],
      ['simmer', 'Währenddessen 300 ml Kokosmilch mit 70 g Zucker und ½ TL Salz erhitzen, bis sich der Zucker löst. Nicht kochen.', { h: 'niedrig' }],
      ['rest', 'Heißen Reis in eine Schüssel geben, die Kokosmilch darübergießen, umrühren und abgedeckt 30 Minuten ziehen lassen.', { t: 30 }],
      ['simmer', 'Restliche Kokosmilch mit 10 g Zucker, einer Prise Salz und der in wenig Wasser angerührten Stärke 1 Minute köcheln, bis sie dicklich ist.', { h: 'niedrig', t: 1 }],
      ['chop', 'Mangos schälen und das Fruchtfleisch in Scheiben vom Kern schneiden.'],
      ['serve', 'Reis mit Mango anrichten, mit der dicken Kokossoße beträufeln und mit Sesam bestreuen.']
    ] }
  }
}
);
