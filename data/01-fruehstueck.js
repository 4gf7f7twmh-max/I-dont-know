/* Frühstück
   Schritt-Format: [aktion, text, {t: Minuten, sec: Sekunden, c: °C, mo: Ofenmodus, h: Herdhitze, s: TM-Stufe, l: Linkslauf, k: Kerntemp, w: Watt, lvl, p, i}] */
R(
{
  id: 'pancakes', n: 'Fluffige Pancakes', c: 'fruehstueck', k: 'USA', d: 1, p: 4, v: 1, pu: 'Portionen (ca. 12 Stück)',
  desc: 'Dicke amerikanische Pfannkuchen mit Backpulver. Der Teig darf klumpig sein.',
  ing: ['250 g Weizenmehl (Type 405)', '2 TL Backpulver', '1 EL Zucker', '1 Prise Salz', '2 Eier (Größe M)', '300 ml Milch', '40 g Butter, geschmolzen', 'Butter oder Öl für die Pfanne', 'Ahornsirup und Beeren zum Servieren'],
  m: {
    herd: { t: 30, s: [
      ['whisk', 'Mehl, Backpulver, Zucker und Salz in einer großen Schüssel mischen.'],
      ['whisk', 'Eier, Milch und die geschmolzene, leicht abgekühlte Butter in einer zweiten Schüssel verquirlen. Zu den trockenen Zutaten gießen und mit dem Schneebesen nur so lange rühren, bis kein trockenes Mehl mehr zu sehen ist. Klümpchen bleiben drin, sie machen die Pancakes locker.'],
      ['rest', 'Teig 10 Minuten ruhen lassen, damit das Backpulver arbeiten kann. Er wird dabei etwas dicker.', { t: 10 }],
      ['fry', 'Beschichtete Pfanne bei mittlerer Hitze 2 Minuten vorheizen und hauchdünn mit Butter auspinseln. Pro Pancake etwa 3 EL Teig mit einer Kelle hineingeben, nicht verstreichen.', { h: 'mittel' }],
      ['flip', 'Wenden, sobald sich auf der Oberfläche viele Bläschen bilden, die aufplatzen, und der Rand matt aussieht (etwa 2 Minuten). Zweite Seite 1 bis 2 Minuten goldbraun backen.', { h: 'mittel', t: 2 }],
      ['serve', 'Fertige Pancakes im Ofen bei 60 °C warm halten, bis alle gebacken sind. Gestapelt mit Ahornsirup und Beeren servieren.']
    ] },
    tm: { t: 30, s: [
      ['tm', 'Butter in den Mixtopf geben und 2 Min./50 °C/Stufe 2 schmelzen.', { t: 2, c: 50, s: 2 }],
      ['tm', 'Milch und Eier zugeben, dann Mehl, Backpulver, Zucker und Salz. 15 Sek./Stufe 4 verrühren. Nicht länger, sonst werden die Pancakes zäh.', { sec: 15, s: 4 }],
      ['rest', 'Teig im Mixtopf 10 Minuten ruhen lassen.', { t: 10 }],
      ['fry', 'Pfanne bei mittlerer Hitze vorheizen, dünn einfetten, je 3 EL Teig hineingeben.', { h: 'mittel' }],
      ['flip', 'Wenden, wenn Bläschen aufplatzen und der Rand matt wird. Zweite Seite 1 bis 2 Minuten backen.', { h: 'mittel', t: 2 }],
      ['serve', 'Mit Ahornsirup und Früchten servieren.']
    ] }
  },
  tips: ['Der erste Pancake wird oft blass, weil die Pfanne noch nicht gleichmäßig heiß ist. Das ist normal.', 'Für Buttermilch-Pancakes die Milch durch Buttermilch ersetzen und zusätzlich ½ TL Natron zugeben.']
},
{
  id: 'ruehrei', n: 'Cremiges Rührei', c: 'fruehstueck', k: 'International', d: 1, p: 2, v: 1,
  desc: 'Langsam gegart bleibt Rührei saftig und glänzend statt trocken und krümelig.',
  ing: ['4 Eier', '1 EL Butter', '2 EL Milch oder Sahne (optional)', 'Salz', 'Pfeffer', '½ Bund Schnittlauch'],
  m: {
    herd: { t: 8, s: [
      ['whisk', 'Eier mit Milch und einer Prise Salz kräftig verquirlen, bis kein Eiweiß mehr zu sehen ist.'],
      ['fry', 'Butter in einer beschichteten Pfanne bei niedriger Hitze schmelzen lassen. Sie soll schäumen, aber nicht bräunen.', { h: 'niedrig' }],
      ['stir', 'Eier hineingießen. Mit einem Pfannenwender ständig von außen zur Mitte schieben, sodass große, weiche Flocken entstehen. Das dauert 3 bis 4 Minuten.', { h: 'niedrig', t: 4 }],
      ['serve', 'Pfanne vom Herd nehmen, solange das Ei noch leicht feucht glänzt. Die Resthitze gart es fertig. Mit Pfeffer und Schnittlauchröllchen servieren.']
    ] },
    mikro: { t: 5, s: [
      ['whisk', 'Eier, Milch und Salz in einer mikrowellengeeigneten Schüssel verquirlen. Butter in Flöckchen dazugeben.'],
      ['micro', '30 Sekunden bei 800 Watt garen.', { sec: 30, w: 800 }],
      ['stir', 'Mit einer Gabel kräftig umrühren, dabei die gestockten Ränder zur Mitte ziehen.'],
      ['micro', '2 bis 3 Mal je 20 Sekunden weitergaren und jedes Mal umrühren, bis das Ei fast gestockt ist.', { sec: 20, w: 800 }],
      ['serve', '30 Sekunden ruhen lassen, würzen und mit Schnittlauch servieren.']
    ] },
    tm: { t: 10, s: [
      ['tm', 'Eier, Milch, Butter und Salz in den Mixtopf geben und 5 Sek./Stufe 4 verquirlen.', { sec: 5, s: 4 }],
      ['tm', 'Ohne Messbecher etwa 6 Min./90 °C/Linkslauf/Sanftrührstufe garen. Ab Minute 4 durch die Deckelöffnung schauen: Sobald die Masse cremig gestockt ist, ausschalten.', { t: 6, c: 90, l: true, s: 'sanft' }],
      ['serve', 'Sofort umfüllen, damit es im heißen Topf nicht nachgart. Mit Pfeffer und Schnittlauch servieren.']
    ] }
  },
  tips: ['Salz schon vor dem Garen ans Ei geben: Es macht das Rührei zarter, nicht wässriger.']
},
{
  id: 'eier-kochen', n: 'Eier kochen: weich, wachsweich, hart', c: 'fruehstueck', k: 'International', d: 1, p: 2, v: 1,
  desc: 'Garzeiten für Eier der Größe M direkt aus dem Kühlschrank.',
  ing: ['4 Eier (Größe M)', 'Wasser', 'Salz zum Servieren'],
  m: {
    herd: { t: 15, s: [
      ['boil', 'Einen Topf so weit mit Wasser füllen, dass die Eier später bedeckt sind, und sprudelnd aufkochen.', { h: 'hoch' }],
      ['prep', 'Eier am stumpfen Ende mit einem Eierpiekser anstechen. Das verringert das Risiko, dass sie platzen.'],
      ['boil', 'Eier mit einem Löffel einzeln ins kochende Wasser gleiten lassen. Hitze auf mittlere Stufe reduzieren, das Wasser soll leicht weiterkochen. Weich: 6 Minuten. Wachsweich: 7 bis 8 Minuten. Hart: 10 Minuten.', { h: 'mittel', t: 7 }],
      ['pour', 'Eier sofort in eiskaltes Wasser legen (abschrecken). So garen sie nicht nach und lassen sich leichter pellen.'],
      ['serve', 'Servieren oder abgekühlt im Kühlschrank bis zu einer Woche aufbewahren (hart gekocht, ungeschält).']
    ] },
    airfryer: { t: 15, note: 'Heißluftfritteusen heizen unterschiedlich stark. Beim ersten Mal ein Testei aufschlagen und die Zeit anpassen.', s: [
      ['prep', 'Eier direkt aus dem Kühlschrank mit etwas Abstand in den Korb legen. Nicht anstechen.'],
      ['airfry', 'Bei 150 °C garen. Weich: etwa 9 Minuten. Wachsweich: etwa 12 Minuten. Hart: etwa 15 Minuten.', { c: 150, t: 12 }],
      ['pour', 'Sofort in Eiswasser abschrecken und 2 Minuten darin lassen.'],
      ['serve', 'Pellen und servieren.']
    ] },
    tm: { t: 20, s: [
      ['pour', '500 g Wasser in den Mixtopf füllen. Eier in den Gareinsatz (Garkörbchen) legen und einhängen.'],
      ['tm', 'Mit Messbecher garen: Weich etwa 11 Min., wachsweich etwa 13 Min., hart etwa 16 Min./Varoma/Stufe 1.', { t: 13, c: 'Varoma', s: 1 }],
      ['pour', 'Gareinsatz mit dem Spatel herausheben, Eier kalt abschrecken.'],
      ['serve', 'Servieren.']
    ] }
  },
  tips: ['Für Eier der Größe L etwa 1 Minute länger rechnen, für Größe S eine Minute kürzer.', 'Sehr frische Eier lassen sich schlechter pellen. Eier, die eine Woche alt sind, gehen leichter.']
},
{
  id: 'shakshuka', n: 'Shakshuka', c: 'fruehstueck', k: 'Nordafrika & Nahost', d: 1, p: 2, v: 1,
  desc: 'Eier, in einer würzigen Tomaten-Paprika-Soße pochiert. Dazu frisches Brot.',
  ing: ['1 Zwiebel', '1 rote Paprika', '2 Knoblauchzehen', '2 EL Olivenöl', '1 TL Kreuzkümmel, gemahlen', '1 TL Paprikapulver, edelsüß', '½ TL Chiliflocken', '400 g gehackte Tomaten (Dose)', '1 TL Zucker', '4 Eier', 'Salz, Pfeffer', '50 g Feta', 'Petersilie oder Koriander', 'Fladenbrot'],
  prep: [['chop', 'Zwiebel in feine Würfel schneiden, Paprika entkernen und in 1 cm große Stücke schneiden, Knoblauch fein hacken.']],
  m: {
    herd: { t: 30, s: [
      ['fry', 'Olivenöl in einer Pfanne (ca. 26 cm, mit Deckel) erhitzen. Zwiebel und Paprika bei mittlerer Hitze 6 bis 8 Minuten weich dünsten.', { h: 'mittel', t: 7 }],
      ['season', 'Knoblauch, Kreuzkümmel, Paprikapulver und Chiliflocken zugeben und 1 Minute mitrösten, bis es duftet.', { t: 1 }],
      ['simmer', 'Tomaten und Zucker zugeben, salzen, pfeffern. Offen 10 Minuten einkochen, bis die Soße dick ist.', { h: 'niedrig', t: 10 }],
      ['pour', 'Mit einem Löffel 4 Mulden in die Soße drücken. Eier einzeln in eine Tasse aufschlagen und in die Mulden gleiten lassen.'],
      ['simmer', 'Deckel auflegen und bei niedriger Hitze 6 bis 8 Minuten garen, bis das Eiweiß fest und das Eigelb noch flüssig ist.', { h: 'niedrig', t: 7 }],
      ['serve', 'Feta darüberbröseln, mit Kräutern bestreuen und direkt aus der Pfanne mit Brot servieren.']
    ] },
    ofen: { t: 35, note: 'Die Soße wird auf dem Herd gekocht, die Eier garen im Ofen besonders gleichmäßig. Dafür eine ofenfeste Pfanne verwenden.', s: [
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen.', { c: 200, mo: 'OU' }],
      ['fry', 'Zwiebel und Paprika in Olivenöl in einer ofenfesten Pfanne bei mittlerer Hitze 7 Minuten dünsten. Knoblauch und Gewürze 1 Minute mitrösten.', { h: 'mittel', t: 8 }],
      ['simmer', 'Tomaten und Zucker zugeben, würzen und 10 Minuten einkochen.', { h: 'niedrig', t: 10 }],
      ['pour', 'Mulden formen und die Eier hineingleiten lassen.'],
      ['bake', 'Pfanne auf mittlerer Schiene in den Ofen stellen und 8 bis 10 Minuten backen, bis das Eiweiß gestockt ist.', { c: 200, mo: 'OU', t: 9, i: 'dish' }],
      ['serve', 'Mit Feta und Kräutern bestreuen. Vorsicht, der Pfannengriff ist heiß.']
    ] }
  },
  tips: ['Wer es scharf mag, gibt 1 TL Harissa zur Soße.']
},
{
  id: 'overnight-oats', n: 'Overnight Oats', c: 'fruehstueck', k: 'International', d: 1, p: 1, v: 1, pu: 'Glas',
  desc: 'Am Abend in 3 Minuten angerührt, am Morgen fertig.',
  ing: ['50 g zarte Haferflocken', '150 ml Milch oder Haferdrink', '100 g Joghurt oder Sojajoghurt', '1 EL Chiasamen', '1 TL Ahornsirup', '1 Prise Zimt', '1 Handvoll Beeren', '1 EL gehackte Nüsse'],
  m: {
    kalt: { t: 5, s: [
      ['pour', 'Haferflocken, Chiasamen und Zimt in ein Schraubglas (ca. 400 ml) geben. Milch, Joghurt und Ahornsirup dazugießen.'],
      ['stir', 'Gut umrühren, bis keine trockenen Flocken mehr zu sehen sind. Deckel schließen.'],
      ['chill', 'Mindestens 4 Stunden, am besten über Nacht, in den Kühlschrank stellen.', { t: 240 }],
      ['serve', 'Morgens noch einmal umrühren. Ist es zu fest, einen Schuss Milch zugeben. Mit Beeren und Nüssen toppen.']
    ] }
  },
  tips: ['Mit Pflanzendrink und Sojajoghurt ist das Rezept vegan.', 'Hält sich verschlossen 3 Tage im Kühlschrank, man kann also für mehrere Tage vorbereiten.']
},
{
  id: 'french-toast', n: 'French Toast', c: 'fruehstueck', k: 'Frankreich', d: 1, p: 2, v: 1,
  desc: 'In Eiermilch getränktes Brot, außen knusprig, innen wie Pudding. In Deutschland als Arme Ritter bekannt.',
  ing: ['4 Scheiben Brioche oder Toastbrot, gern vom Vortag', '2 Eier', '120 ml Milch', '1 EL Zucker', '½ TL Zimt', '½ TL Vanilleextrakt', '1 Prise Salz', '1 EL Butter', 'Puderzucker, Beeren, Ahornsirup'],
  prep: [
    ['whisk', 'Eier, Milch, Zucker, Zimt, Vanille und Salz in einer flachen Form verquirlen.'],
    ['rest', 'Brotscheiben nacheinander von jeder Seite 15 bis 20 Sekunden einweichen lassen. Sie sollen sich vollsaugen, aber nicht zerfallen.', { sec: 20 }]
  ],
  m: {
    herd: { t: 15, s: [
      ['fry', 'Butter in einer Pfanne bei mittlerer Hitze aufschäumen lassen. Brotscheiben hineinlegen.', { h: 'mittel' }],
      ['flip', 'Von jeder Seite 2 bis 3 Minuten goldbraun braten.', { h: 'mittel', t: 3 }],
      ['serve', 'Mit Puderzucker bestäuben und mit Beeren und Ahornsirup servieren.']
    ] },
    airfryer: { t: 15, s: [
      ['prep', 'Den Korb mit gelochtem Backpapier auslegen oder dünn einölen. Brotscheiben nebeneinander hineinlegen.'],
      ['airfry', 'Bei 180 °C 4 Minuten backen.', { c: 180, t: 4 }],
      ['flip', 'Scheiben wenden.'],
      ['airfry', 'Weitere 3 bis 4 Minuten backen, bis sie goldbraun sind.', { c: 180, t: 3 }],
      ['serve', 'Mit Puderzucker, Beeren und Sirup servieren.']
    ] },
    ofen: { t: 25, note: 'Praktisch, wenn mehrere Portionen gleichzeitig fertig werden sollen.', s: [
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen. Ein Blech mit Backpapier belegen und dünn mit geschmolzener Butter bepinseln.', { c: 200, mo: 'OU' }],
      ['bake', 'Getränkte Scheiben auf das Blech legen und auf mittlerer Schiene 8 Minuten backen.', { c: 200, mo: 'OU', t: 8, i: 'tray' }],
      ['flip', 'Wenden.'],
      ['bake', 'Weitere 6 Minuten backen.', { c: 200, mo: 'OU', t: 6, i: 'tray' }],
      ['serve', 'Mit Puderzucker und Früchten servieren.']
    ] }
  }
},
{
  id: 'granola', n: 'Knuspermüsli (Granola)', c: 'fruehstueck', k: 'USA', d: 1, p: 8, v: 2,
  desc: 'Große, knusprige Cluster mit Nüssen und Ahornsirup. Hält sich wochenlang.',
  ing: ['300 g kernige Haferflocken', '100 g Nüsse (Mandeln, Haselnüsse, Walnüsse)', '50 g Kürbis- oder Sonnenblumenkerne', '60 ml Ahornsirup', '50 ml neutrales Öl oder geschmolzenes Kokosöl', '1 TL Zimt', '½ TL Salz', '80 g Trockenfrüchte (Rosinen, Cranberrys)'],
  prep: [
    ['chop', 'Nüsse grob hacken.'],
    ['stir', 'Haferflocken, Nüsse, Kerne, Zimt und Salz in einer Schüssel mischen. Ahornsirup und Öl darübergießen und gründlich vermengen, bis alles leicht glänzt.']
  ],
  m: {
    ofen: { t: 40, s: [
      ['bake', 'Backofen auf 160 °C Ober-/Unterhitze vorheizen. Ein Blech mit Backpapier belegen.', { c: 160, mo: 'OU' }],
      ['spread', 'Mischung auf dem Blech verteilen und mit einem Löffel fest andrücken. Das sorgt für große Cluster.'],
      ['bake', 'Auf mittlerer Schiene 12 Minuten backen.', { c: 160, mo: 'OU', t: 12, i: 'tray' }],
      ['flip', 'Mit einem Pfannenwender in großen Stücken wenden, nicht zerrühren.'],
      ['bake', 'Weitere 10 bis 13 Minuten goldbraun backen. Die Ränder werden schneller dunkel, im Blick behalten.', { c: 160, mo: 'OU', t: 12, i: 'tray' }],
      ['cool', 'Auf dem Blech vollständig auskühlen lassen. Erst dabei wird das Müsli knusprig.', { t: 30 }],
      ['serve', 'Trockenfrüchte untermischen und in einem luftdichten Glas aufbewahren (bis 4 Wochen).']
    ] },
    airfryer: { t: 35, note: 'Den Korb mit einer Backform oder Backpapier mit hohem Rand auslegen, damit der Luftstrom nichts aufwirbelt.', s: [
      ['spread', 'Die Hälfte der Mischung in einer Backform oder auf Backpapier im Korb verteilen.'],
      ['airfry', 'Bei 150 °C 10 bis 12 Minuten backen und alle 4 Minuten vorsichtig wenden.', { c: 150, t: 11 }],
      ['cool', 'Auskühlen lassen und mit der zweiten Hälfte wiederholen.', { t: 20 }],
      ['serve', 'Trockenfrüchte untermischen und luftdicht aufbewahren.']
    ] }
  }
}
);
