/* Kuchen & Torten */
R(
{
  id: 'kaesekuchen', n: 'Käsekuchen mit Mürbeteig', c: 'kuchen', k: 'Deutschland', d: 2, p: 12, v: 1, pu: 'Stücke',
  desc: 'Deutscher Quarkkuchen, cremig und hoch. Springform 26 cm.',
  ing: ['#Mürbeteig', '200 g Mehl', '75 g Zucker', '100 g kalte Butter', '1 Ei', '1 Prise Salz', '#Füllung', '1 kg Magerquark', '200 g Zucker', '4 Eier', '1 Päckchen Vanillepuddingpulver (37 g)', '200 ml Sahne', '100 g weiche Butter oder neutrales Öl', 'Abrieb von 1 Bio-Zitrone', '1 Päckchen Vanillezucker'],
  m: {
    ofen: { t: 150, s: [
      ['knead', 'Mehl, Zucker, Butter in Würfeln, Ei und Salz rasch zu einem glatten Teig verkneten.'],
      ['chill', 'In Folie 30 Minuten kalt stellen.', { t: 30 }],
      ['bake', 'Backofen auf 170 °C Ober-/Unterhitze vorheizen. Springform fetten.', { c: 170, mo: 'OU' }],
      ['roll', 'Teig ausrollen, Boden der Form damit auslegen und einen 4 cm hohen Rand hochziehen. Boden mit einer Gabel einstechen.'],
      ['mix', 'Quark, Zucker, Vanillezucker, Eier, Puddingpulver, Sahne, Butter und Zitronenabrieb mit dem Handmixer auf niedriger Stufe nur so lange verrühren, bis die Masse glatt ist. Zu viel Luft lässt den Kuchen beim Backen aufgehen und danach einreißen.'],
      ['pour', 'Füllung auf den Boden gießen und glatt streichen.'],
      ['bake', 'Im unteren Drittel 60 bis 70 Minuten backen. Fertig, wenn der Rand fest ist und die Mitte beim Rütteln nur noch leicht wackelt.', { c: 170, mo: 'OU', t: 65 }],
      ['cool', 'Ofen ausschalten, Tür einen Spalt öffnen (Kochlöffel einklemmen) und den Kuchen 30 Minuten darin abkühlen lassen. Das verhindert Risse.', { t: 30 }],
      ['chill', 'Am Rand mit einem Messer lösen, vollständig auskühlen lassen und mindestens 4 Stunden kühlen.', { t: 240 }]
    ] },
    tm: { t: 150, s: [
      ['tm', 'Teigzutaten 20 Sek./Stufe 4 vermengen, dann 10 Sek./Teigstufe. 30 Minuten kalt stellen.', { sec: 30, s: 'teig' }],
      ['roll', 'Ofen auf 170 °C vorheizen, Springform mit dem Teig auslegen.', { c: 170, mo: 'OU' }],
      ['tm', 'Zitronenschale (mit dem Sparschäler) und Zucker 15 Sek./Stufe 10 pulverisieren.', { sec: 15, s: 10 }],
      ['tm', 'Quark, Eier, Puddingpulver, Sahne, Butter und Vanillezucker zugeben, 40 Sek./Stufe 4 verrühren.', { sec: 40, s: 4 }],
      ['pour', 'Füllung in die Form gießen.'],
      ['bake', '60 bis 70 Minuten im unteren Drittel backen.', { c: 170, mo: 'OU', t: 65 }],
      ['cool', 'Im ausgeschalteten Ofen bei leicht geöffneter Tür 30 Minuten abkühlen lassen, dann 4 Stunden kühlen.', { t: 30 }]
    ] }
  }
},
{
  id: 'brownies', n: 'Fudgy Brownies', c: 'kuchen', k: 'USA', d: 1, p: 16, v: 1, pu: 'Stücke',
  desc: 'Mit glänzender, rissiger Kruste und klebrig-saftigem Kern. Form 20 x 20 cm.',
  ing: ['200 g Zartbitterschokolade (60 bis 70 %)', '150 g Butter', '250 g Zucker', '3 Eier (Größe L)', '1 TL Vanilleextrakt', '½ TL Salz', '80 g Mehl', '30 g Kakaopulver', '100 g gehackte Walnüsse oder Schokostücke (optional)'],
  prep: [
    ['stir', 'Schokolade grob hacken und mit der Butter über einem Wasserbad oder in der Mikrowelle (in 30-Sekunden-Schritten) schmelzen. Etwas abkühlen lassen.'],
    ['mix', 'Eier, Zucker, Vanille und Salz mit dem Handmixer 5 Minuten aufschlagen, bis die Masse hell und dick ist. Das sorgt für die glänzende Kruste.', { t: 5 }],
    ['fold', 'Schokobutter unterrühren. Mehl und Kakao darübersieben und nur so lange unterheben, bis kein Mehl mehr zu sehen ist. Nüsse unterheben.']
  ],
  m: {
    ofen: { t: 50, s: [
      ['bake', 'Backofen auf 175 °C Ober-/Unterhitze vorheizen. Form mit Backpapier auslegen.', { c: 175, mo: 'OU' }],
      ['pour', 'Teig in die Form füllen und glatt streichen.'],
      ['bake', '22 bis 26 Minuten backen. Ein Holzstäbchen in der Mitte soll noch feuchte Krümel zeigen, keinen flüssigen Teig.', { c: 175, mo: 'OU', t: 24 }],
      ['cool', 'In der Form vollständig auskühlen lassen (mindestens 1 Stunde), erst dann schneiden. Warm zerfallen sie.', { t: 60 }],
      ['serve', 'Mit einem heißen, trockenen Messer in 16 Stücke schneiden.']
    ] },
    airfryer: { t: 50, note: 'Eine Form, die in den Korb passt (ca. 18 x 18 cm), halbe Menge oder dickere Brownies. Bei 160 °C, sonst wird die Oberfläche zu schnell dunkel.', s: [
      ['pour', 'Teig in eine mit Backpapier ausgelegte Form füllen.'],
      ['airfry', 'Bei 160 °C 20 bis 25 Minuten backen. Wird die Oberfläche zu dunkel, mit Alufolie abdecken (gut festklemmen).', { c: 160, t: 22 }],
      ['cool', 'Vollständig auskühlen lassen und schneiden.', { t: 60 }]
    ] }
  }
},
{
  id: 'apfelkuchen', n: 'Versunkener Apfelkuchen', c: 'kuchen', k: 'Deutschland', d: 1, p: 12, v: 1, pu: 'Stücke',
  desc: 'Rührteig mit eingeschnittenen Apfelhälften, die beim Backen einsinken. Springform 26 cm.',
  ing: ['4 bis 5 säuerliche Äpfel (Boskoop, Elstar)', '1 EL Zitronensaft', '150 g weiche Butter', '150 g Zucker', '1 Päckchen Vanillezucker', '1 Prise Salz', '3 Eier', '200 g Mehl', '2 TL Backpulver', '3 EL Milch', 'Puderzucker oder Aprikosenkonfitüre'],
  prep: [['chop', 'Äpfel schälen, halbieren, Kerngehäuse entfernen. Die Rundung mehrmals längs einschneiden (nicht durchschneiden). Mit Zitronensaft beträufeln.']],
  m: {
    ofen: { t: 75, s: [
      ['bake', 'Backofen auf 180 °C Ober-/Unterhitze vorheizen. Springform fetten und bemehlen.', { c: 180, mo: 'OU' }],
      ['mix', 'Butter, Zucker, Vanillezucker und Salz mit dem Handmixer 3 Minuten cremig schlagen.', { t: 3 }],
      ['mix', 'Eier einzeln je 30 Sekunden unterrühren.'],
      ['fold', 'Mehl mit Backpulver mischen und abwechselnd mit der Milch kurz unterrühren.'],
      ['spread', 'Teig in die Form streichen. Äpfel mit der Rundung nach oben darauf verteilen und leicht andrücken.'],
      ['bake', 'Auf mittlerer Schiene 40 bis 45 Minuten backen (Stäbchenprobe: kein Teig mehr am Holzstäbchen).', { c: 180, mo: 'OU', t: 42 }],
      ['spread', 'Noch warm mit erwärmter Aprikosenkonfitüre bestreichen oder nach dem Abkühlen mit Puderzucker bestäuben.'],
      ['cool', 'In der Form 15 Minuten abkühlen lassen, dann lösen.', { t: 15 }]
    ] },
    tm: { t: 75, s: [
      ['tm', 'Butter, Zucker, Vanillezucker und Salz 2 Min./Stufe 4 cremig rühren.', { t: 2, s: 4 }],
      ['tm', 'Eier zugeben, 1 Min./Stufe 4.', { t: 1, s: 4 }],
      ['tm', 'Mehl, Backpulver und Milch zugeben, 20 Sek./Stufe 5.', { sec: 20, s: 5 }],
      ['spread', 'Teig in die vorbereitete Form streichen, Äpfel daraufsetzen.'],
      ['bake', 'Bei 180 °C 40 bis 45 Minuten backen.', { c: 180, mo: 'OU', t: 42 }],
      ['cool', 'Abkühlen lassen und bestäuben.', { t: 15 }]
    ] }
  }
},
{
  id: 'marmorkuchen', n: 'Marmorkuchen', c: 'kuchen', k: 'Deutschland', d: 1, p: 16, v: 1, pu: 'Stücke',
  desc: 'Saftiger Rührkuchen mit Schokoladenmuster. Gugelhupfform 22 cm.',
  ing: ['250 g weiche Butter', '250 g Zucker', '1 Päckchen Vanillezucker', '1 Prise Salz', '5 Eier', '375 g Mehl', '1 Päckchen Backpulver', '125 ml Milch', '20 g Kakaopulver', '20 g Zucker', '2 EL Milch', 'Puderzucker oder 100 g Kuvertüre'],
  m: {
    ofen: { t: 90, s: [
      ['bake', 'Backofen auf 175 °C Ober-/Unterhitze vorheizen. Gugelhupfform gründlich fetten und mit Mehl ausstäuben.', { c: 175, mo: 'OU' }],
      ['mix', 'Butter, Zucker, Vanillezucker und Salz 5 Minuten hell und cremig schlagen.', { t: 5 }],
      ['mix', 'Eier einzeln jeweils 30 Sekunden unterschlagen.'],
      ['fold', 'Mehl und Backpulver mischen und abwechselnd mit der Milch kurz unterrühren.'],
      ['pour', 'Zwei Drittel des Teigs in die Form füllen.'],
      ['stir', 'Kakao, 20 g Zucker und 2 EL Milch unter den restlichen Teig rühren und auf den hellen Teig geben.'],
      ['fold', 'Mit einer Gabel spiralförmig durch beide Teige ziehen. Nur einmal, sonst vermischt sich alles.'],
      ['bake', 'Im unteren Drittel 50 bis 60 Minuten backen. Stäbchenprobe machen.', { c: 175, mo: 'OU', t: 55 }],
      ['cool', '10 Minuten in der Form abkühlen lassen, dann auf ein Gitter stürzen.', { t: 10 }],
      ['serve', 'Mit Puderzucker bestäuben oder mit geschmolzener Kuvertüre überziehen.']
    ] },
    tm: { t: 90, s: [
      ['tm', 'Butter, Zucker, Vanillezucker und Salz 3 Min./Stufe 4.', { t: 3, s: 4 }],
      ['tm', 'Eier zugeben, 1 Min./Stufe 4.', { t: 1, s: 4 }],
      ['tm', 'Mehl, Backpulver und Milch zugeben, 30 Sek./Stufe 5. Zwei Drittel in die Form füllen.', { sec: 30, s: 5 }],
      ['tm', 'Kakao, Zucker und Milch zugeben, 15 Sek./Stufe 4. Auf den hellen Teig geben und mit einer Gabel marmorieren.', { sec: 15, s: 4 }],
      ['bake', '50 bis 60 Minuten bei 175 °C backen.', { c: 175, mo: 'OU', t: 55 }],
      ['cool', 'Abkühlen lassen und stürzen.', { t: 10 }]
    ] }
  }
},
{
  id: 'karottenkuchen', n: 'Karottenkuchen mit Frischkäse-Frosting', c: 'kuchen', k: 'Großbritannien & USA', d: 1, p: 12, v: 1, pu: 'Stücke',
  desc: 'Mit Öl statt Butter, Walnüssen und Zimt. Springform 26 cm oder Kastenform.',
  ing: ['300 g Möhren', '3 Eier', '180 g brauner Zucker', '200 ml neutrales Öl', '250 g Mehl', '2 TL Backpulver', '½ TL Natron', '2 TL Zimt', '½ TL Ingwer, gemahlen', '½ TL Salz', '100 g Walnüsse, gehackt', '#Frosting', '200 g Frischkäse (Doppelrahm), kalt', '60 g weiche Butter', '100 g Puderzucker', '1 TL Vanilleextrakt'],
  prep: [['grate', 'Möhren schälen und fein raspeln.']],
  m: {
    ofen: { t: 90, s: [
      ['bake', 'Backofen auf 175 °C Ober-/Unterhitze vorheizen, Form fetten oder mit Backpapier auslegen.', { c: 175, mo: 'OU' }],
      ['mix', 'Eier und Zucker 3 Minuten schaumig schlagen, Öl langsam einlaufen lassen.', { t: 3 }],
      ['fold', 'Mehl, Backpulver, Natron, Gewürze und Salz mischen und kurz unterrühren. Möhren und Nüsse unterheben.'],
      ['bake', 'Teig in die Form füllen und 40 bis 45 Minuten backen (Stäbchenprobe).', { c: 175, mo: 'OU', t: 42 }],
      ['cool', 'Vollständig auskühlen lassen.', { t: 60 }],
      ['mix', 'Butter und Puderzucker cremig schlagen, dann den kalten Frischkäse und Vanille nur kurz unterrühren. Zu langes Rühren macht das Frosting flüssig.'],
      ['spread', 'Frosting auf dem Kuchen verstreichen, nach Wunsch mit Walnüssen bestreuen.'],
      ['chill', '30 Minuten kühlen, damit das Frosting fest wird.', { t: 30 }]
    ] }
  }
},
{
  id: 'schwarzwaelder', n: 'Schwarzwälder Kirschtorte', c: 'kuchen', k: 'Deutschland', d: 3, p: 16, v: 1, pu: 'Stücke',
  desc: 'Schokobiskuit, Kirschwasser, Sauerkirschen und viel Sahne. Springform 26 cm.',
  ing: ['#Schokobiskuit', '6 Eier', '180 g Zucker', '1 Prise Salz', '120 g Mehl', '40 g Speisestärke', '40 g Kakaopulver', '1 TL Backpulver', '60 g geschmolzene Butter', '#Kirschfüllung', '1 Glas Sauerkirschen (680 g, 350 g abgetropft)', '30 g Speisestärke', '2 EL Zucker', '#Außerdem', '6 EL Kirschwasser (oder Kirschsaft)', '800 ml kalte Sahne', '3 Päckchen Sahnesteif', '50 g Zucker', '1 Päckchen Vanillezucker', '100 g Zartbitterschokolade (für Späne)', '16 Cocktailkirschen'],
  m: {
    ofen: { t: 240, s: [
      ['bake', 'Backofen auf 175 °C Ober-/Unterhitze vorheizen. Nur den Boden der Springform mit Backpapier auslegen, Rand nicht fetten.', { c: 175, mo: 'OU' }],
      ['mix', 'Eier, Zucker und Salz mit dem Handmixer 8 bis 10 Minuten aufschlagen, bis die Masse sehr hell und dick ist und ein Band bildet, wenn man die Rührbesen anhebt.', { t: 9 }],
      ['fold', 'Mehl, Stärke, Kakao und Backpulver in zwei Portionen darübersieben und vorsichtig mit einem Teigschaber unterheben. Zum Schluss die lauwarme Butter am Rand einlaufen lassen und unterheben.'],
      ['bake', 'Sofort in die Form füllen und 30 bis 35 Minuten backen (Stäbchenprobe). Ofen in den ersten 20 Minuten nicht öffnen.', { c: 175, mo: 'OU', t: 32 }],
      ['cool', 'Mit einem Messer vom Rand lösen und vollständig auskühlen lassen, am besten über Nacht.', { t: 120 }],
      ['simmer', 'Kirschen abtropfen lassen, Saft auffangen. 250 ml Saft mit Zucker aufkochen, Stärke in 5 EL Saft anrühren, einrühren und 1 Minute kochen. Kirschen unterheben und abkühlen lassen.', { h: 'mittel', t: 2 }],
      ['chop', 'Biskuit mit einem langen Messer oder Faden waagerecht zweimal durchschneiden (3 Böden).'],
      ['mix', 'Sahne mit Sahnesteif, Zucker und Vanillezucker steif schlagen.'],
      ['layer', 'Unteren Boden auf eine Platte legen, Tortenring darum. Mit 2 EL Kirschwasser beträufeln, Kirschfüllung verteilen, ein Viertel der Sahne darauf.'],
      ['layer', 'Zweiten Boden auflegen, mit Kirschwasser tränken, ein Viertel Sahne darauf. Dritten Boden auflegen und tränken.'],
      ['spread', 'Ring entfernen, Torte rundherum mit Sahne einstreichen. 16 Sahnetupfen aufspritzen, je eine Kirsche daraufsetzen.'],
      ['grate', 'Schokolade mit einem Sparschäler zu Spänen hobeln und Rand und Mitte damit bestreuen.'],
      ['chill', 'Mindestens 3 Stunden kühlen, damit die Torte fest wird.', { t: 180 }]
    ] }
  }
},
{
  id: 'bananenbrot', n: 'Bananenbrot', c: 'kuchen', k: 'USA', d: 1, p: 12, v: 1, pu: 'Scheiben',
  desc: 'Aus sehr reifen, braunen Bananen. Kastenform 25 cm.',
  ing: ['3 sehr reife Bananen (ca. 350 g geschält)', '80 g geschmolzene Butter', '100 g brauner Zucker', '1 Ei', '1 TL Vanilleextrakt', '1 TL Natron', '1 Prise Salz', '1 TL Zimt', '190 g Mehl', '60 g Walnüsse oder Schokostücke (optional)'],
  prep: [
    ['mash', 'Bananen in einer Schüssel mit einer Gabel zu Mus zerdrücken.'],
    ['stir', 'Butter, Zucker, Ei und Vanille einrühren.'],
    ['fold', 'Natron, Salz, Zimt und Mehl darüberstreuen und nur kurz unterheben. Nüsse unterheben.']
  ],
  m: {
    ofen: { t: 75, s: [
      ['bake', 'Backofen auf 175 °C Ober-/Unterhitze vorheizen, Kastenform fetten oder mit Backpapier auslegen.', { c: 175, mo: 'OU' }],
      ['pour', 'Teig einfüllen. Optional eine längs halbierte Banane obenauf legen.'],
      ['bake', '55 bis 60 Minuten backen. Wird die Oberfläche zu dunkel, nach 40 Minuten mit Alufolie abdecken.', { c: 175, mo: 'OU', t: 58, i: 'loaf' }],
      ['cool', '10 Minuten in der Form, dann auf einem Gitter auskühlen lassen.', { t: 10 }]
    ] },
    airfryer: { t: 60, note: 'Kleine Kastenform (ca. 18 cm), die in den Korb passt. Den Teig dafür halbieren.', s: [
      ['pour', 'Halbe Teigmenge in die gefettete Form füllen.'],
      ['airfry', 'Bei 155 °C 30 bis 35 Minuten backen. Nach 20 Minuten mit Alufolie abdecken.', { c: 155, t: 33 }],
      ['cool', 'Auskühlen lassen.', { t: 10 }]
    ] }
  }
},
{
  id: 'ny-cheesecake', n: 'New York Cheesecake', c: 'kuchen', k: 'USA', d: 3, p: 12, v: 1, pu: 'Stücke',
  desc: 'Dicht und cremig aus Frischkäse, auf Keksboden, im Wasserbad gebacken. Springform 24 cm.',
  ing: ['#Boden', '200 g Butterkekse oder Graham Crackers', '80 g geschmolzene Butter', '#Füllung', '900 g Doppelrahmfrischkäse, Raumtemperatur', '200 g Zucker', '2 EL Mehl', '4 Eier, Raumtemperatur', '200 g saure Sahne', '1 TL Vanilleextrakt', 'Abrieb von ½ Bio-Zitrone'],
  m: {
    ofen: { t: 120, note: 'Alle Zutaten müssen Raumtemperatur haben, sonst bleibt die Füllung klumpig.', s: [
      ['bake', 'Backofen auf 175 °C Ober-/Unterhitze vorheizen. Springform außen dicht mit zwei Lagen breiter Alufolie umwickeln (für das Wasserbad).', { c: 175, mo: 'OU' }],
      ['blend', 'Kekse im Zerkleinerer oder im Gefrierbeutel mit dem Nudelholz fein zerbröseln, mit der Butter mischen.'],
      ['mash', 'Bröselmasse in die Form drücken und mit einem Glasboden fest andrücken.'],
      ['bake', 'Boden 10 Minuten vorbacken. Ofen auf 160 °C herunterschalten.', { c: 175, mo: 'OU', t: 10 }],
      ['mix', 'Frischkäse, Zucker und Mehl mit dem Handmixer auf niedriger Stufe glatt rühren.'],
      ['mix', 'Eier einzeln nur kurz unterrühren, dann saure Sahne, Vanille und Zitronenabrieb. Langsam rühren, möglichst wenig Luft einarbeiten.'],
      ['pour', 'Füllung auf den Boden gießen. Form in eine tiefe Fettpfanne stellen und heißes Wasser 2 cm hoch angießen.'],
      ['bake', 'Bei 160 °C 60 bis 70 Minuten backen, bis der Rand fest ist und die Mitte (ca. 8 cm) noch wie Wackelpudding wackelt.', { c: 160, mo: 'OU', t: 65 }],
      ['cool', 'Ofen ausschalten und den Kuchen bei geöffneter Tür 1 Stunde darin abkühlen lassen.', { t: 60 }],
      ['chill', 'Mindestens 6 Stunden, besser über Nacht, kühlen.', { t: 360 }],
      ['serve', 'Mit einem in heißes Wasser getauchten Messer schneiden. Dazu Beerenkompott.']
    ] }
  }
},
{
  id: 'tarte-tatin', n: 'Tarte Tatin', c: 'kuchen', k: 'Frankreich', d: 2, p: 8, v: 1, pu: 'Stücke',
  desc: 'Gestürzter Apfelkuchen mit Karamell. Ofenfeste Pfanne 24 bis 26 cm.',
  ing: ['6 bis 7 feste Äpfel (Boskoop, Granny Smith)', '120 g Zucker', '60 g Butter', '1 Prise Salz', '1 Rolle Blätterteig (275 g) oder Mürbeteig'],
  prep: [['chop', 'Äpfel schälen, vierteln und das Kerngehäuse entfernen.']],
  m: {
    ofen: { t: 80, note: 'Das Karamell wird auf dem Herd gekocht, gebacken wird im Ofen. Eine ofenfeste Pfanne (Gusseisen oder Edelstahl) ist nötig.', s: [
      ['bake', 'Backofen auf 200 °C Ober-/Unterhitze vorheizen.', { c: 200, mo: 'OU' }],
      ['fry', 'Zucker in der Pfanne bei mittlerer Hitze schmelzen, ohne zu rühren, bis er bernsteinfarben ist. Pfanne nur schwenken.', { h: 'mittel', t: 6 }],
      ['stir', 'Butter und Salz einrühren (Vorsicht, es schäumt).'],
      ['layer', 'Apfelviertel hochkant und dicht an dicht kreisförmig ins Karamell stellen.'],
      ['simmer', 'Bei mittlerer Hitze 10 Minuten garen, bis die Äpfel an der Unterseite karamellisieren.', { h: 'mittel', t: 10 }],
      ['spread', 'Teig rund zuschneiden (etwas größer als die Pfanne), über die Äpfel legen und den Rand nach innen stecken. Einige Male einstechen.'],
      ['bake', '25 bis 30 Minuten backen, bis der Teig goldbraun ist.', { c: 200, mo: 'OU', t: 28 }],
      ['rest', '5 Minuten ruhen lassen.', { t: 5 }],
      ['flip', 'Großen Teller auflegen und mit Topflappen schwungvoll stürzen. Vorsicht, heißes Karamell.'],
      ['serve', 'Warm mit Crème fraîche oder Vanilleeis servieren.']
    ] }
  }
},
{
  id: 'streuselkuchen', n: 'Streuselkuchen vom Blech', c: 'kuchen', k: 'Deutschland', d: 2, p: 20, v: 1, pu: 'Stücke',
  desc: 'Hefeteig mit dicken Butterstreuseln.',
  ing: ['#Hefeteig', '500 g Mehl', '1 Würfel frische Hefe (42 g) oder 2 Päckchen Trockenhefe', '250 ml lauwarme Milch', '75 g Zucker', '75 g weiche Butter', '1 Ei', '1 Prise Salz', '#Streusel', '300 g Mehl', '200 g Zucker', '1 Päckchen Vanillezucker', '1 TL Zimt (optional)', '250 g kalte Butter'],
  m: {
    ofen: { t: 120, s: [
      ['stir', 'Hefe in der lauwarmen Milch mit 1 TL Zucker auflösen.'],
      ['knead', 'Mit Mehl, restlichem Zucker, Butter, Ei und Salz 8 bis 10 Minuten zu einem glatten, elastischen Teig kneten.', { t: 9 }],
      ['rest', 'Abgedeckt an einem warmen Ort 45 Minuten gehen lassen, bis sich das Volumen verdoppelt hat.', { t: 45 }],
      ['knead', 'Für die Streusel Mehl, Zucker, Vanillezucker und Zimt mischen, Butter in Würfeln zugeben und mit den Fingern zu groben Streuseln verreiben. Kalt stellen.'],
      ['roll', 'Teig auf einem gefetteten Blech ausrollen.'],
      ['rest', 'Weitere 15 Minuten gehen lassen. Backofen auf 180 °C Ober-/Unterhitze vorheizen.', { t: 15, c: 180, mo: 'OU' }],
      ['spread', 'Teig mit etwas Milch bestreichen und die Streusel gleichmäßig darauf verteilen.'],
      ['bake', 'Auf mittlerer Schiene 25 bis 30 Minuten goldgelb backen.', { c: 180, mo: 'OU', t: 28, i: 'tray' }],
      ['cool', 'Auf dem Blech auskühlen lassen.', { t: 30 }]
    ] },
    tm: { t: 120, s: [
      ['tm', 'Milch, Hefe und Zucker 2 Min./37 °C/Stufe 2.', { t: 2, c: 37, s: 2 }],
      ['tm', 'Mehl, Butter, Ei und Salz zugeben, 3 Min./Teigstufe. Umfüllen und 45 Minuten gehen lassen.', { t: 3, s: 'teig' }],
      ['tm', 'Streuselzutaten in den Mixtopf geben, 20 Sek./Stufe 4. Nicht länger, sonst wird es ein Teig.', { sec: 20, s: 4 }],
      ['roll', 'Hefeteig auf dem Blech ausrollen, 15 Minuten gehen lassen, mit Streuseln bestreuen.', { t: 15 }],
      ['bake', 'Bei 180 °C 25 bis 30 Minuten backen.', { c: 180, mo: 'OU', t: 28, i: 'tray' }]
    ] }
  }
},
{
  id: 'mug-cake', n: 'Schoko-Tassenkuchen', c: 'kuchen', k: 'International', d: 1, p: 1, v: 1, pu: 'Tasse',
  desc: 'In 2 Minuten aus der Mikrowelle. Für den spontanen Hunger.',
  ing: ['4 EL Mehl', '3 EL Zucker', '2 EL Kakaopulver', '¼ TL Backpulver', '1 Prise Salz', '3 EL Milch', '2 EL neutrales Öl', '1 Ei (oder 3 EL zusätzliche Milch)', '1 EL Schokostücke'],
  prep: [
    ['stir', 'Mehl, Zucker, Kakao, Backpulver und Salz in einer großen Tasse (mind. 300 ml) mit einer Gabel mischen.'],
    ['whisk', 'Milch, Öl und Ei zugeben und gründlich verrühren, auch am Tassenboden. Schokostücke obenauf streuen.']
  ],
  m: {
    mikro: { t: 5, s: [
      ['micro', 'Bei 800 Watt 70 bis 90 Sekunden garen. Der Kuchen geht hoch und ist fertig, wenn die Oberfläche fest, aber noch leicht feucht ist.', { sec: 80, w: 800 }],
      ['rest', '1 Minute ruhen lassen (sehr heiß).', { t: 1 }],
      ['serve', 'Mit einer Kugel Vanilleeis servieren.']
    ] },
    airfryer: { t: 15, note: 'Nur in einer ofenfesten Tasse oder Ramekin.', s: [
      ['airfry', 'Bei 160 °C 10 bis 12 Minuten backen.', { c: 160, t: 11 }],
      ['rest', '2 Minuten abkühlen lassen.', { t: 2 }],
      ['serve', 'Servieren.']
    ] }
  }
},
{
  id: 'zitronenkuchen', n: 'Zitronenkuchen mit Guss', c: 'kuchen', k: 'Deutschland', d: 1, p: 16, v: 1, pu: 'Scheiben',
  desc: 'Saftig getränkt mit Zitronensirup und dick glasiert. Kastenform 30 cm.',
  ing: ['250 g weiche Butter', '250 g Zucker', '1 Prise Salz', '4 Eier', 'Abrieb von 2 Bio-Zitronen', '250 g Mehl', '2 TL Backpulver', '#Tränke & Guss', 'Saft von 2 Zitronen', '50 g Zucker', '200 g Puderzucker', '3 bis 4 EL Zitronensaft'],
  m: {
    ofen: { t: 90, s: [
      ['bake', 'Backofen auf 175 °C Ober-/Unterhitze vorheizen, Kastenform mit Backpapier auslegen.', { c: 175, mo: 'OU' }],
      ['mix', 'Butter, Zucker, Salz und Zitronenabrieb 4 Minuten hell und cremig schlagen.', { t: 4 }],
      ['mix', 'Eier einzeln unterrühren.'],
      ['fold', 'Mehl und Backpulver kurz unterrühren.'],
      ['bake', 'Teig in die Form füllen und 50 bis 55 Minuten backen. Nach 15 Minuten die Oberfläche der Länge nach mit einem nassen Messer einschneiden, damit er gleichmäßig aufreißt.', { c: 175, mo: 'OU', t: 52, i: 'loaf' }],
      ['simmer', 'Zitronensaft mit 50 g Zucker aufkochen, bis sich der Zucker löst.', { h: 'mittel', t: 2 }],
      ['pour', 'Heißen Kuchen mit einem Holzstäbchen dicht einstechen und den Sirup langsam darüberträufeln.'],
      ['cool', 'In der Form vollständig auskühlen lassen.', { t: 60 }],
      ['spread', 'Puderzucker mit Zitronensaft zu einem dicken Guss rühren und über den Kuchen gießen.']
    ] },
    tm: { t: 90, s: [
      ['tm', 'Zitronenschale (mit dem Sparschäler) und Zucker 20 Sek./Stufe 10 pulverisieren.', { sec: 20, s: 10 }],
      ['tm', 'Butter und Salz zugeben, 2 Min./Stufe 4. Eier zugeben, 1 Min./Stufe 4.', { t: 3, s: 4 }],
      ['tm', 'Mehl und Backpulver zugeben, 20 Sek./Stufe 5.', { sec: 20, s: 5 }],
      ['bake', 'In die Form füllen und bei 175 °C 50 bis 55 Minuten backen.', { c: 175, mo: 'OU', t: 52, i: 'loaf' }],
      ['pour', 'Heiß mit Zitronensirup tränken, abkühlen lassen und glasieren.']
    ] }
  }
}
);
