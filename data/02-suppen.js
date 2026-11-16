/* Suppen & Eintöpfe */
R(
{
  id: 'kuerbissuppe', n: 'Kürbissuppe mit Kokos und Ingwer', c: 'suppen', k: 'Deutschland', d: 1, p: 4, v: 2,
  desc: 'Hokkaido muss nicht geschält werden. Ingwer und Kokosmilch machen sie rund und leicht scharf.',
  ing: ['1 kg Hokkaido-Kürbis', '1 Zwiebel', '1 Knoblauchzehe', '20 g frischer Ingwer', '2 EL Öl', '800 ml Gemüsebrühe', '200 ml Kokosmilch', 'Salz, Pfeffer, Muskat', '2 EL Kürbiskerne', 'Kürbiskernöl zum Beträufeln'],
  prep: [['chop', 'Kürbis waschen, halbieren, Kerne mit einem Löffel herausschaben. Mit Schale in 2 bis 3 cm große Würfel schneiden. Zwiebel, Knoblauch und Ingwer schälen und grob würfeln.']],
  m: {
    herd: { t: 40, s: [
      ['fry', 'Öl in einem großen Topf erhitzen. Zwiebel, Knoblauch und Ingwer bei mittlerer Hitze 3 Minuten glasig dünsten.', { h: 'mittel', t: 3 }],
      ['fry', 'Kürbiswürfel zugeben und 2 Minuten unter Rühren mitbraten.', { h: 'mittel', t: 2 }],
      ['pour', 'Mit der Brühe aufgießen und aufkochen lassen.', { h: 'hoch' }],
      ['simmer', 'Mit Deckel bei niedriger Hitze 20 Minuten köcheln, bis der Kürbis ganz weich ist.', { h: 'niedrig', t: 20 }],
      ['blend', 'Topf vom Herd nehmen, Kokosmilch zugeben und mit dem Stabmixer fein pürieren. Ist die Suppe zu dick, etwas Wasser zugeben.'],
      ['season', 'Mit Salz, Pfeffer und frisch geriebener Muskatnuss abschmecken.'],
      ['serve', 'Kürbiskerne in einer trockenen Pfanne rösten, bis sie springen. Suppe mit Kernen und ein paar Tropfen Kürbiskernöl servieren.']
    ] },
    tm: { t: 35, s: [
      ['tm', 'Zwiebel, Knoblauch und Ingwer in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern und mit dem Spatel nach unten schieben.', { sec: 5, s: 5 }],
      ['tm', 'Öl zugeben und 3 Min./120 °C/Stufe 1 dünsten.', { t: 3, c: 120, s: 1 }],
      ['tm', 'Kürbiswürfel zugeben und 8 Sek./Stufe 5 zerkleinern.', { sec: 8, s: 5 }],
      ['tm', 'Brühe zugeben und 20 Min./100 °C/Stufe 1 garen.', { t: 20, c: 100, s: 1 }],
      ['tm', 'Kokosmilch zugeben. Messbecher einsetzen und 1 Min./Stufe 4 bis 8 schrittweise ansteigend pürieren. Vorsicht, heißer Inhalt: nie direkt auf hohe Stufe schalten.', { t: 1, s: 8 }],
      ['season', 'Abschmecken und mit gerösteten Kürbiskernen und Kernöl servieren.']
    ] },
    slow: { t: 375, s: [
      ['fry', 'Optional für mehr Aroma: Zwiebel, Knoblauch und Ingwer in einer Pfanne in Öl 3 Minuten anschwitzen.', { h: 'mittel', t: 3 }],
      ['slow', 'Alles außer der Kokosmilch in den Slow Cooker geben, mit Brühe aufgießen. Deckel schließen und auf LOW 6 Stunden oder HIGH 3 Stunden garen.', { lvl: 'LOW', t: 360 }],
      ['blend', 'Kokosmilch zugeben und mit dem Stabmixer direkt im Topf pürieren.'],
      ['season', 'Abschmecken und servieren.']
    ] },
    dkt: { t: 30, s: [
      ['fry', 'Topf auf Anbraten stellen (Instant Pot: Sauté). Zwiebel, Knoblauch und Ingwer in Öl 3 Minuten dünsten.', { h: 'mittel', t: 3 }],
      ['pour', 'Kürbis und Brühe zugeben. Deckel verriegeln, Ventil schließen.'],
      ['pressure', '6 Minuten auf Hochdruck garen.', { t: 6, p: 'Hochdruck' }],
      ['rest', 'Druck 10 Minuten natürlich abbauen lassen, dann Restdruck vorsichtig ablassen.', { t: 10 }],
      ['blend', 'Kokosmilch zugeben, pürieren, abschmecken und servieren.']
    ] }
  },
  tips: ['Butternut-Kürbis geht auch, muss aber geschält werden.', 'Die Suppe lässt sich portionsweise bis zu 3 Monate einfrieren.']
},
{
  id: 'tomatensuppe', n: 'Tomatensuppe', c: 'suppen', k: 'Italien', d: 1, p: 4, v: 2,
  desc: 'Aus Dosentomaten in 25 Minuten oder mit gerösteten Ofentomaten für mehr Tiefe.',
  ing: ['800 g gehackte Tomaten (2 Dosen) oder 1 kg reife Strauchtomaten', '1 Zwiebel', '2 Knoblauchzehen', '2 EL Olivenöl', '1 EL Tomatenmark', '500 ml Gemüsebrühe', '1 TL Zucker', '1 Bund Basilikum', 'Salz, Pfeffer', '100 ml Sahne oder Hafersahne (optional)'],
  prep: [['chop', 'Zwiebel und Knoblauch schälen und fein würfeln.']],
  m: {
    herd: { t: 30, s: [
      ['fry', 'Olivenöl erhitzen, Zwiebel und Knoblauch bei mittlerer Hitze 4 Minuten glasig dünsten.', { h: 'mittel', t: 4 }],
      ['stir', 'Tomatenmark zugeben und 1 Minute unter Rühren anrösten, bis es dunkler wird.', { h: 'mittel', t: 1 }],
      ['pour', 'Tomaten, Brühe und Zucker zugeben, aufkochen.', { h: 'hoch' }],
      ['simmer', '15 Minuten offen köcheln lassen.', { h: 'niedrig', t: 15 }],
      ['blend', 'Basilikumblätter (ein paar zum Garnieren zurückbehalten) zugeben und fein pürieren.'],
      ['season', 'Nach Wunsch Sahne einrühren, mit Salz und Pfeffer abschmecken.'],
      ['serve', 'Mit Basilikum und einem Faden Olivenöl servieren.']
    ] },
    ofen: { t: 55, note: 'Mit frischen Tomaten: Das Rösten im Ofen gibt der Suppe ein süßliches, rauchiges Aroma.', s: [
      ['bake', 'Backofen auf 200 °C Umluft vorheizen.', { c: 200, mo: 'U' }],
      ['chop', 'Tomaten halbieren, Zwiebel vierteln. Mit den ungeschälten Knoblauchzehen auf ein Blech legen, mit Olivenöl beträufeln, salzen.'],
      ['bake', '35 Minuten rösten, bis die Tomaten an den Rändern dunkel werden.', { c: 200, mo: 'U', t: 35, i: 'tray' }],
      ['pour', 'Knoblauch aus der Schale drücken. Alles mit Brühe, Tomatenmark und Zucker in einen Topf geben und 5 Minuten köcheln.', { h: 'mittel', t: 5 }],
      ['blend', 'Mit Basilikum fein pürieren, nach Wunsch Sahne zugeben, abschmecken.'],
      ['serve', 'Servieren. Dazu passt ein Grilled-Cheese-Sandwich.']
    ] },
    tm: { t: 30, s: [
      ['tm', 'Zwiebel und Knoblauch in den Mixtopf geben, 5 Sek./Stufe 5 zerkleinern, nach unten schieben.', { sec: 5, s: 5 }],
      ['tm', 'Olivenöl und Tomatenmark zugeben, 3 Min./120 °C/Stufe 1 dünsten.', { t: 3, c: 120, s: 1 }],
      ['tm', 'Tomaten, Brühe und Zucker zugeben, 15 Min./100 °C/Stufe 1 garen.', { t: 15, c: 100, s: 1 }],
      ['tm', 'Basilikum zugeben, 1 Min./Stufe 4 bis 8 schrittweise ansteigend pürieren.', { t: 1, s: 8 }],
      ['season', 'Sahne einrühren, abschmecken, servieren.']
    ] }
  }
},
{
  id: 'kartoffelsuppe', n: 'Kartoffelsuppe', c: 'suppen', k: 'Deutschland', d: 1, p: 4, v: 1,
  desc: 'Deftig mit Suppengrün und Majoran. Mit Würstchen wie bei Oma, oder vegetarisch.',
  ing: ['800 g mehligkochende Kartoffeln', '1 Bund Suppengrün (Möhre, Knollensellerie, Lauch)', '1 Zwiebel', '2 EL Butter', '1 l Gemüsebrühe', '1 Lorbeerblatt', '1 TL getrockneter Majoran', '100 ml Sahne', 'Salz, Pfeffer, Muskat', '½ Bund Petersilie', '4 Wiener Würstchen (optional)'],
  prep: [['chop', 'Kartoffeln, Möhre und Sellerie schälen und in 1,5 cm große Würfel schneiden. Lauch längs halbieren, waschen und in Ringe schneiden. Zwiebel würfeln.']],
  m: {
    herd: { t: 45, s: [
      ['fry', 'Butter in einem großen Topf zerlassen. Zwiebel, Möhre, Sellerie und Lauch bei mittlerer Hitze 5 Minuten andünsten.', { h: 'mittel', t: 5 }],
      ['pour', 'Kartoffeln, Brühe, Lorbeerblatt und Majoran zugeben und aufkochen.', { h: 'hoch' }],
      ['simmer', 'Mit Deckel 20 Minuten köcheln, bis die Kartoffeln zerfallen.', { h: 'niedrig', t: 20 }],
      ['blend', 'Lorbeerblatt entfernen. Etwa ein Drittel der Suppe pürieren, damit sie sämig wird und trotzdem Stücke behält.'],
      ['season', 'Sahne einrühren, mit Salz, Pfeffer und Muskat abschmecken.'],
      ['simmer', 'Würstchen in Scheiben schneiden und 5 Minuten in der Suppe ziehen lassen (nicht kochen, sonst platzen sie).', { h: 'niedrig', t: 5 }],
      ['serve', 'Mit gehackter Petersilie servieren.']
    ] },
    tm: { t: 40, s: [
      ['tm', 'Zwiebel in den Mixtopf geben, 3 Sek./Stufe 5 zerkleinern.', { sec: 3, s: 5 }],
      ['tm', 'Butter, Möhre, Sellerie und Lauch zugeben, 4 Min./120 °C/Linkslauf/Stufe 1 dünsten.', { t: 4, c: 120, l: true, s: 1 }],
      ['tm', 'Kartoffeln, Brühe, Lorbeerblatt und Majoran zugeben, 22 Min./100 °C/Linkslauf/Stufe 1 garen.', { t: 22, c: 100, l: true, s: 1 }],
      ['tm', 'Lorbeerblatt entfernen, Sahne zugeben. Für eine stückige Suppe 5 Sek./Stufe 4, für eine glatte 30 Sek./Stufe 4 bis 8 ansteigend.', { sec: 5, s: 4 }],
      ['tm', 'Würstchenscheiben zugeben, 3 Min./80 °C/Linkslauf/Sanftrührstufe erwärmen.', { t: 3, c: 80, l: true, s: 'sanft' }],
      ['serve', 'Abschmecken und mit Petersilie servieren.']
    ] },
    dkt: { t: 30, s: [
      ['fry', 'Gemüse in Butter im offenen Topf 4 Minuten andünsten.', { h: 'mittel', t: 4 }],
      ['pour', 'Kartoffeln, Brühe und Gewürze zugeben, Deckel verriegeln.'],
      ['pressure', '8 Minuten auf Hochdruck garen.', { t: 8, p: 'Hochdruck' }],
      ['rest', 'Druck 5 Minuten natürlich abbauen lassen, dann ablassen.', { t: 5 }],
      ['blend', 'Teilweise pürieren, Sahne und Würstchen zugeben, abschmecken.'],
      ['serve', 'Mit Petersilie servieren.']
    ] }
  },
  tips: ['Ohne Würstchen und mit Gemüsebrühe ist die Suppe vegetarisch.', 'Ein Schuss Weißweinessig am Ende macht sie frischer.']
},
{
  id: 'dal', n: 'Rotes Linsen-Dal', c: 'suppen', k: 'Indien', d: 1, p: 4, v: 2,
  desc: 'Rote Linsen zerfallen beim Kochen von selbst zu einem cremigen Eintopf.',
  ing: ['250 g rote Linsen', '1 Zwiebel', '3 Knoblauchzehen', '20 g frischer Ingwer', '2 EL Öl oder Ghee', '1 TL Kreuzkümmelsamen', '1 TL Kurkuma', '1 TL Garam Masala', '½ TL Chilipulver', '400 g gehackte Tomaten', '400 ml Kokosmilch', '400 ml Wasser', 'Salz', '1 Limette', 'Koriandergrün', 'Reis oder Naan'],
  prep: [['chop', 'Zwiebel fein würfeln, Knoblauch und Ingwer fein reiben oder hacken. Linsen in einem Sieb kalt abspülen, bis das Wasser klar ist.']],
  m: {
    herd: { t: 35, s: [
      ['fry', 'Öl erhitzen, Kreuzkümmelsamen 30 Sekunden darin rösten, bis sie knistern.', { h: 'mittel', sec: 30 }],
      ['fry', 'Zwiebel zugeben, 5 Minuten goldgelb braten. Knoblauch und Ingwer 1 Minute mitbraten.', { h: 'mittel', t: 6 }],
      ['season', 'Kurkuma, Garam Masala und Chili einrühren und 30 Sekunden anrösten.', { sec: 30 }],
      ['pour', 'Linsen, Tomaten, Kokosmilch und Wasser zugeben, aufkochen.', { h: 'hoch' }],
      ['simmer', '20 Minuten offen köcheln, gelegentlich umrühren, damit nichts ansetzt. Die Linsen sollen zerfallen.', { h: 'niedrig', t: 20 }],
      ['season', 'Mit Salz und Limettensaft abschmecken.'],
      ['serve', 'Mit Koriander bestreuen, dazu Reis oder Naan.']
    ] },
    tm: { t: 35, s: [
      ['tm', 'Zwiebel, Knoblauch und Ingwer 5 Sek./Stufe 5 zerkleinern.', { sec: 5, s: 5 }],
      ['tm', 'Öl und Kreuzkümmel zugeben, 4 Min./120 °C/Stufe 1 dünsten.', { t: 4, c: 120, s: 1 }],
      ['tm', 'Gewürze zugeben, 1 Min./100 °C/Stufe 1.', { t: 1, c: 100, s: 1 }],
      ['tm', 'Linsen, Tomaten, Kokosmilch und Wasser zugeben, 20 Min./100 °C/Linkslauf/Stufe 1 garen. Garkörbchen statt Messbecher auf den Deckel stellen (Spritzschutz).', { t: 20, c: 100, l: true, s: 1 }],
      ['season', 'Mit Salz und Limette abschmecken, mit Koriander servieren.']
    ] },
    dkt: { t: 25, s: [
      ['fry', 'Kreuzkümmel, Zwiebel, Knoblauch und Ingwer im offenen Topf in Öl 5 Minuten braten. Gewürze kurz mitrösten.', { h: 'mittel', t: 5 }],
      ['pour', 'Linsen, Tomaten, Kokosmilch und Wasser zugeben, Boden mit dem Holzlöffel freikratzen (sonst meldet der Instant Pot „Burn“).'],
      ['pressure', '6 Minuten auf Hochdruck garen.', { t: 6, p: 'Hochdruck' }],
      ['rest', '10 Minuten natürlich abdampfen lassen.', { t: 10 }],
      ['season', 'Umrühren, mit Salz und Limette abschmecken.']
    ] }
  }
},
{
  id: 'ramen', n: 'Shoyu-Ramen (schnelle Version)', c: 'suppen', k: 'Japan', d: 2, p: 2,
  desc: 'Würzige Soja-Brühe, marinierte Eier und Nudeln. Eine Abkürzung zur stundenlangen Brühe.',
  ing: ['#Marinierte Eier (Ajitama)', '2 Eier', '3 EL Sojasauce', '2 EL Mirin', '3 EL Wasser', '#Brühe & Einlage', '1 l Hühnerbrühe', '3 EL Sojasauce', '1 EL Mirin', '1 Knoblauchzehe', '15 g Ingwer', '1 TL Sesamöl', '200 g frische Ramen-Nudeln', '150 g gegartes Hähnchen oder Schweinebauch', '2 Frühlingszwiebeln', '1 Blatt Nori', '1 TL Sesam'],
  m: {
    herd: { t: 40, s: [
      ['boil', 'Eier in kochendes Wasser geben und genau 6 Minuten 30 Sekunden kochen.', { h: 'hoch', sec: 390 }],
      ['pour', 'Sofort in Eiswasser abschrecken, pellen.'],
      ['rest', 'Sojasauce, Mirin und Wasser in einem Gefrierbeutel mischen, Eier hineinlegen und mindestens 20 Minuten (besser über Nacht im Kühlschrank) marinieren.', { t: 20 }],
      ['chop', 'Knoblauch und Ingwer in Scheiben schneiden. Frühlingszwiebeln in feine Ringe schneiden, Fleisch in Scheiben.'],
      ['simmer', 'Brühe mit Knoblauch und Ingwer aufkochen und 10 Minuten leise köcheln. Dann Knoblauch und Ingwer herausfischen.', { h: 'niedrig', t: 10 }],
      ['season', 'Sojasauce, Mirin und Sesamöl einrühren. Abschmecken, die Brühe soll kräftig salzig sein.'],
      ['boil', 'Nudeln in einem separaten Topf nach Packungsangabe kochen (meist 1 bis 2 Minuten) und abgießen.', { h: 'hoch', t: 2 }],
      ['serve', 'Nudeln in vorgewärmte Schalen geben, heiße Brühe darüber. Mit Fleisch, halbierten Eiern, Frühlingszwiebeln, Nori und Sesam belegen.']
    ] }
  },
  tips: ['Die Nudeln immer separat kochen, sonst wird die Brühe trüb und stärkehaltig.']
},
{
  id: 'pho', n: 'Pho Bo', c: 'suppen', k: 'Vietnam', d: 3, p: 4,
  desc: 'Klare Rinderbrühe mit Sternanis und Zimt, Reisnudeln und hauchdünn geschnittenem rohem Rind, das in der Schüssel gart.',
  ing: ['1,5 kg Rinderknochen (Markknochen, Beinscheiben)', '500 g Rinderbrust', '2 Zwiebeln', '80 g Ingwer', '5 Sternanis', '1 Zimtstange', '4 Nelken', '1 TL Koriandersamen', '1 EL Zucker', '3 EL Fischsauce', '400 g Reisbandnudeln', '250 g Rinderhüfte, sehr dünn geschnitten', '200 g Mungbohnensprossen', 'Thai-Basilikum, Koriander, Minze', '2 Limetten', '1 rote Chili', 'Hoisin- und Sriracha-Sauce'],
  m: {
    herd: { t: 210, s: [
      ['boil', 'Knochen und Rinderbrust in einem großen Topf mit kaltem Wasser bedecken, aufkochen und 10 Minuten sprudelnd kochen. Dabei tritt Eiweiß aus, das die Brühe sonst trübt.', { h: 'hoch', t: 10 }],
      ['pour', 'Alles in ein Sieb abgießen, Knochen und Fleisch kalt abspülen, Topf säubern.'],
      ['fry', 'Zwiebeln und Ingwer ungeschält halbieren und in einer trockenen Pfanne mit der Schnittfläche nach unten 10 Minuten schwarz rösten.', { h: 'hoch', t: 10 }],
      ['fry', 'Sternanis, Zimt, Nelken und Koriandersamen in einer trockenen Pfanne 2 Minuten rösten, bis sie duften.', { h: 'mittel', t: 2 }],
      ['simmer', 'Knochen, Fleisch, Zwiebeln, Ingwer und Gewürze mit 4 l kaltem Wasser in den Topf geben. Einmal aufkochen, dann 3 Stunden ganz leise simmern lassen. Schaum regelmäßig abschöpfen.', { h: 'niedrig', t: 180 }],
      ['prep', 'Nach 1 Stunde 30 Minuten die Rinderbrust herausnehmen, in kaltes Wasser legen (bleibt saftig) und später in dünne Scheiben schneiden.'],
      ['season', 'Brühe durch ein feines Sieb gießen. Mit Fischsauce, Zucker und Salz kräftig abschmecken.'],
      ['rest', 'Reisnudeln nach Packungsangabe in heißem Wasser einweichen oder kurz kochen, abgießen.'],
      ['serve', 'Nudeln, Brustscheiben und rohe Hüftscheiben in Schalen verteilen. Mit kochend heißer Brühe übergießen, die das rohe Fleisch gart. Sprossen, Kräuter, Limette, Chili und Saucen separat dazu reichen.']
    ] },
    dkt: { t: 110, s: [
      ['boil', 'Knochen und Brust in einem normalen Topf 10 Minuten blanchieren, abgießen und abspülen.', { h: 'hoch', t: 10 }],
      ['fry', 'Zwiebeln und Ingwer in einer Pfanne schwarz rösten, Gewürze trocken anrösten.', { h: 'hoch', t: 10 }],
      ['pour', 'Alles in den Schnellkochtopf geben, mit Wasser bis zur Max-Markierung auffüllen.'],
      ['pressure', '60 Minuten auf Hochdruck garen.', { t: 60, p: 'Hochdruck' }],
      ['rest', 'Druck natürlich abbauen lassen (ca. 20 Minuten).', { t: 20 }],
      ['season', 'Brühe abseihen und mit Fischsauce, Zucker und Salz abschmecken. Brust in Scheiben schneiden.'],
      ['serve', 'Wie oben anrichten: Nudeln, Fleisch, kochende Brühe, Kräuter separat.']
    ] }
  },
  tips: ['Die Hüfte 20 Minuten anfrieren, dann lässt sie sich hauchdünn schneiden.', 'Die Brühe ist am nächsten Tag noch besser. Das erstarrte Fett lässt sich dann einfach abheben.']
},
{
  id: 'minestrone', n: 'Minestrone', c: 'suppen', k: 'Italien', d: 1, p: 6, v: 2,
  desc: 'Italienische Gemüsesuppe mit Bohnen und kleinen Nudeln. Was im Kühlschrank liegt, darf rein.',
  ing: ['1 Zwiebel', '2 Möhren', '2 Stangen Staudensellerie', '1 Zucchini', '2 Knoblauchzehen', '3 EL Olivenöl', '1 EL Tomatenmark', '400 g gehackte Tomaten', '1,5 l Gemüsebrühe', '1 Dose weiße Bohnen (240 g abgetropft)', '100 g kleine Suppennudeln (Ditalini)', '100 g Grünkohl oder Spinat', '1 TL getrockneter Oregano', 'Salz, Pfeffer', 'Parmesan oder vegane Alternative', 'Basilikum'],
  prep: [['chop', 'Zwiebel, Möhren, Sellerie und Zucchini in kleine Würfel (ca. 1 cm) schneiden, Knoblauch fein hacken. Bohnen abspülen.']],
  m: {
    herd: { t: 45, s: [
      ['fry', 'Olivenöl erhitzen, Zwiebel, Möhren und Sellerie bei mittlerer Hitze 8 Minuten weich dünsten (das ist die Basis, das Soffritto).', { h: 'mittel', t: 8 }],
      ['stir', 'Knoblauch, Zucchini, Tomatenmark und Oregano zugeben, 2 Minuten mitbraten.', { h: 'mittel', t: 2 }],
      ['pour', 'Tomaten und Brühe angießen, aufkochen.', { h: 'hoch' }],
      ['simmer', '15 Minuten köcheln.', { h: 'niedrig', t: 15 }],
      ['boil', 'Nudeln und Bohnen zugeben und nach Packungsangabe garen (ca. 8 Minuten). In den letzten 2 Minuten den Grünkohl oder Spinat zugeben.', { h: 'mittel', t: 8 }],
      ['season', 'Mit Salz und Pfeffer abschmecken.'],
      ['serve', 'Mit geriebenem Parmesan, Basilikum und Olivenöl servieren.']
    ] },
    tm: { t: 40, s: [
      ['tm', 'Zwiebel, Knoblauch, Möhren und Sellerie in Stücken 4 Sek./Stufe 5 zerkleinern.', { sec: 4, s: 5 }],
      ['tm', 'Olivenöl und Tomatenmark zugeben, 5 Min./120 °C/Stufe 1 dünsten.', { t: 5, c: 120, s: 1 }],
      ['tm', 'Zucchiniwürfel, Tomaten, Brühe (nur 1,2 l, der Mixtopf ist sonst zu voll) und Oregano zugeben, 15 Min./100 °C/Linkslauf/Stufe 1 garen.', { t: 15, c: 100, l: true, s: 1 }],
      ['tm', 'Nudeln, Bohnen und Grünkohl zugeben, 9 Min./100 °C/Linkslauf/Sanftrührstufe garen.', { t: 9, c: 100, l: true, s: 'sanft' }],
      ['season', 'Abschmecken und servieren.']
    ] },
    slow: { t: 380, s: [
      ['slow', 'Gemüse, Knoblauch, Tomatenmark, Tomaten, Brühe, Bohnen und Oregano in den Slow Cooker geben. LOW 6 Stunden oder HIGH 3 Stunden.', { lvl: 'LOW', t: 360 }],
      ['boil', 'Nudeln separat kochen, damit sie nicht zerfallen, und mit dem Grünkohl in den letzten 15 Minuten zugeben.', { h: 'hoch', t: 8 }],
      ['season', 'Abschmecken und mit Parmesan servieren.']
    ] }
  },
  tips: ['Eine Parmesanrinde in der Suppe mitkochen gibt viel Geschmack (dann nicht mehr vegan).']
},
{
  id: 'gulaschsuppe', n: 'Gulaschsuppe', c: 'suppen', k: 'Ungarn', d: 2, p: 6,
  desc: 'Mit viel Paprika und Zwiebeln, dazu Kartoffeln. Schmeckt aufgewärmt noch besser.',
  ing: ['600 g Rindergulasch', '3 Zwiebeln', '2 rote Paprika', '400 g festkochende Kartoffeln', '2 Knoblauchzehen', '3 EL Öl oder Schmalz', '2 EL Paprikapulver edelsüß', '1 TL Paprikapulver rosenscharf', '2 EL Tomatenmark', '1 TL Kümmel, gemahlen', '1 TL Majoran', '1,5 l Rinderbrühe', 'Salz, Pfeffer', 'Saure Sahne'],
  prep: [['chop', 'Fleisch in kleine Würfel (2 cm) schneiden. Zwiebeln würfeln, Paprika und geschälte Kartoffeln in 1,5 cm große Würfel schneiden, Knoblauch hacken.']],
  m: {
    herd: { t: 120, s: [
      ['fry', 'Öl in einem schweren Topf stark erhitzen und das Fleisch in zwei Portionen kräftig anbraten. Herausnehmen.', { h: 'hoch', t: 6 }],
      ['fry', 'Zwiebeln im Bratfett bei mittlerer Hitze 10 Minuten braun braten.', { h: 'mittel', t: 10 }],
      ['stir', 'Tomatenmark und Knoblauch 1 Minute mitrösten. Topf kurz vom Herd nehmen und das Paprikapulver einrühren. Paprika verbrennt schnell und wird dann bitter.'],
      ['pour', 'Sofort mit Brühe ablöschen, Fleisch, Kümmel und Majoran zugeben, aufkochen.', { h: 'hoch' }],
      ['simmer', 'Mit Deckel 1 Stunde köcheln.', { h: 'niedrig', t: 60 }],
      ['simmer', 'Kartoffeln und Paprika zugeben, weitere 25 Minuten köcheln, bis sie gar sind.', { h: 'niedrig', t: 25 }],
      ['season', 'Mit Salz und Pfeffer abschmecken.'],
      ['serve', 'Mit einem Klecks saurer Sahne und Brot servieren.']
    ] },
    dkt: { t: 60, s: [
      ['fry', 'Fleisch im offenen Topf portionsweise scharf anbraten, herausnehmen. Zwiebeln 8 Minuten braun braten.', { h: 'hoch', t: 14 }],
      ['stir', 'Tomatenmark, Knoblauch und abseits der Hitze Paprikapulver einrühren.'],
      ['pour', 'Brühe, Fleisch, Kümmel und Majoran zugeben, Boden freikratzen.'],
      ['pressure', '20 Minuten auf Hochdruck garen.', { t: 20, p: 'Hochdruck' }],
      ['rest', 'Druck schnell ablassen, Kartoffeln und Paprika zugeben.'],
      ['pressure', 'Weitere 4 Minuten auf Hochdruck garen, dann 5 Minuten natürlich abbauen lassen.', { t: 4, p: 'Hochdruck' }],
      ['season', 'Abschmecken und servieren.']
    ] },
    slow: { t: 500, s: [
      ['fry', 'Fleisch in einer Pfanne kräftig anbraten, dann die Zwiebeln braun braten, Tomatenmark und Paprikapulver unterrühren.', { h: 'hoch', t: 15 }],
      ['slow', 'Alles mit Brühe, Kartoffeln, Paprika, Knoblauch und Gewürzen in den Slow Cooker geben. LOW 8 Stunden oder HIGH 4 Stunden.', { lvl: 'LOW', t: 480 }],
      ['season', 'Abschmecken und mit saurer Sahne servieren.']
    ] }
  }
},
{
  id: 'huehnersuppe', n: 'Hühnersuppe', c: 'suppen', k: 'Deutschland', d: 1, p: 6,
  desc: 'Klassische Hühnerbrühe aus einem ganzen Suppenhuhn mit Gemüse und Nudeln.',
  ing: ['1 Suppenhuhn oder 1,2 kg Hähnchenschenkel', '1 Bund Suppengrün', '1 Zwiebel', '1 Lorbeerblatt', '5 Pfefferkörner', '2 Pimentkörner', '2 l Wasser', '150 g Suppennudeln', 'Salz', '½ Bund Petersilie'],
  m: {
    herd: { t: 150, s: [
      ['prep', 'Huhn kalt abspülen. Zwiebel ungeschält halbieren. Suppengrün putzen, die Hälfte grob schneiden, die andere Hälfte in feine Würfel für die Einlage.'],
      ['fry', 'Zwiebelhälften mit der Schnittfläche in einem trockenen Topf schwarz anrösten. Das färbt die Brühe goldgelb.', { h: 'hoch', t: 4 }],
      ['pour', 'Huhn, grobes Suppengrün, Gewürze und kaltes Wasser zugeben. Das Huhn soll bedeckt sein.'],
      ['simmer', 'Langsam aufkochen und 2 Stunden mit halb aufgelegtem Deckel leise simmern lassen. Schaum am Anfang abschöpfen.', { h: 'niedrig', t: 120 }],
      ['prep', 'Huhn herausheben, abkühlen lassen, Fleisch von Haut und Knochen lösen und zerzupfen. Brühe durch ein Sieb gießen.'],
      ['boil', 'Brühe aufkochen, Gemüsewürfel und Nudeln darin 8 Minuten garen. Fleisch zugeben.', { h: 'mittel', t: 8 }],
      ['season', 'Kräftig salzen.'],
      ['serve', 'Mit Petersilie bestreut servieren.']
    ] },
    dkt: { t: 70, s: [
      ['pour', 'Huhn, grobes Suppengrün, angeröstete Zwiebel, Gewürze und Wasser bis zur Max-Markierung einfüllen.'],
      ['pressure', '35 Minuten auf Hochdruck garen.', { t: 35, p: 'Hochdruck' }],
      ['rest', 'Druck natürlich abbauen lassen.', { t: 15 }],
      ['prep', 'Huhn auslösen, Brühe abseihen.'],
      ['boil', 'Brühe im offenen Topf mit Gemüsewürfeln und Nudeln 8 Minuten kochen, Fleisch zugeben.', { h: 'mittel', t: 8 }],
      ['serve', 'Salzen und mit Petersilie servieren.']
    ] },
    slow: { t: 490, s: [
      ['slow', 'Huhn, grobes Suppengrün, Zwiebel, Gewürze und Wasser in den Slow Cooker geben. LOW 8 Stunden.', { lvl: 'LOW', t: 480 }],
      ['prep', 'Huhn auslösen, Brühe abseihen.'],
      ['boil', 'Mit Gemüsewürfeln und Nudeln im Topf 8 Minuten kochen.', { h: 'mittel', t: 8 }],
      ['serve', 'Salzen und servieren.']
    ] }
  }
},
{
  id: 'gazpacho', n: 'Gazpacho', c: 'suppen', k: 'Spanien', d: 1, p: 4, v: 2,
  desc: 'Kalte Tomatensuppe aus Andalusien. Je reifer die Tomaten, desto besser.',
  ing: ['1 kg sehr reife Tomaten', '1 Salatgurke', '1 grüne Paprika', '1 kleine rote Zwiebel', '1 Knoblauchzehe', '1 Scheibe Weißbrot vom Vortag', '80 ml Olivenöl extra vergine', '2 EL Sherryessig', 'Salz', '200 ml kaltes Wasser'],
  prep: [['chop', 'Tomaten vierteln, Gurke schälen und grob schneiden (ein Stück für die Garnitur fein würfeln), Paprika entkernen, Zwiebel und Knoblauch schälen. Brot entrinden und in Wasser einweichen.']],
  m: {
    kalt: { t: 20, note: 'Ein Standmixer liefert ein glatteres Ergebnis als ein Stabmixer.', s: [
      ['blend', 'Gemüse, ausgedrücktes Brot, Essig, Salz und Wasser im Standmixer 2 Minuten fein pürieren.', { t: 2 }],
      ['pour', 'Bei laufendem Mixer das Olivenöl langsam einlaufen lassen. Die Suppe wird dabei cremig und hellorange.'],
      ['season', 'Mit Salz und Essig abschmecken. Für eine sehr feine Suppe durch ein Sieb streichen.'],
      ['chill', 'Mindestens 2 Stunden kalt stellen.', { t: 120 }],
      ['serve', 'In Gläsern oder Schalen mit Gurken- und Paprikawürfeln und Olivenöl servieren.']
    ] },
    tm: { t: 15, s: [
      ['tm', 'Gemüse, Brot, Essig, Salz und Wasser in den Mixtopf geben, 1 Min./Stufe 10 pürieren.', { t: 1, s: 10 }],
      ['tm', 'Bei Stufe 4 das Olivenöl langsam durch die Deckelöffnung einlaufen lassen (ca. 30 Sek.).', { sec: 30, s: 4 }],
      ['chill', 'Abschmecken und 2 Stunden kühlen.', { t: 120 }],
      ['serve', 'Mit Gemüsewürfeln garnieren.']
    ] }
  }
},
{
  id: 'misosuppe', n: 'Miso-Suppe', c: 'suppen', k: 'Japan', d: 1, p: 2, v: 2,
  desc: 'Mit selbstgemachtem Dashi aus Kombu und Shiitake ist sie vegan.',
  ing: ['700 ml Wasser', '1 Stück Kombu-Alge (10 x 10 cm)', '3 getrocknete Shiitake', '2 EL helle Misopaste (Shiro Miso)', '150 g Seidentofu', '1 EL getrocknete Wakame', '1 Frühlingszwiebel'],
  m: {
    herd: { t: 45, s: [
      ['rest', 'Kombu und Shiitake im kalten Wasser 30 Minuten einweichen.', { t: 30 }],
      ['simmer', 'Langsam erhitzen. Kurz bevor das Wasser kocht, den Kombu herausnehmen (gekocht wird er schleimig und bitter). 5 Minuten leise simmern, dann Shiitake herausnehmen. Das ist das Dashi.', { h: 'niedrig', t: 5 }],
      ['chop', 'Tofu in 1 cm Würfel schneiden, Shiitake in Streifen, Frühlingszwiebel in feine Ringe.'],
      ['rest', 'Wakame 5 Minuten in Wasser einweichen und ausdrücken.', { t: 5 }],
      ['stir', 'Hitze ausschalten. Miso in einer Kelle mit etwas Dashi glatt rühren und in den Topf geben. Miso darf nicht mehr kochen, sonst verliert es Aroma.'],
      ['serve', 'Tofu, Wakame und Shiitake zugeben, mit Frühlingszwiebeln bestreut servieren.']
    ] }
  }
},
{
  id: 'zwiebelsuppe', n: 'Französische Zwiebelsuppe', c: 'suppen', k: 'Frankreich', d: 2, p: 4, v: 1,
  desc: 'Eine Stunde langsam karamellisierte Zwiebeln, überbacken mit Brot und Gruyère.',
  ing: ['1 kg Zwiebeln', '50 g Butter', '1 EL Öl', '1 TL Zucker', '1 TL Salz', '2 Knoblauchzehen', '1 EL Mehl', '150 ml trockener Weißwein', '1,2 l kräftige Gemüse- oder Rinderbrühe', '2 Zweige Thymian', '1 Lorbeerblatt', '8 Scheiben Baguette', '150 g Gruyère, gerieben'],
  prep: [['chop', 'Zwiebeln halbieren und in feine Halbringe schneiden (2 bis 3 mm). Knoblauch hacken.']],
  m: {
    herd: { t: 100, note: 'Zum Überbacken braucht es einen Backofen mit Grillfunktion, ohne Grill: Käse-Croûtons in der Pfanne mit Deckel schmelzen.', s: [
      ['fry', 'Butter und Öl in einem breiten, schweren Topf schmelzen. Zwiebeln, Salz und Zucker zugeben.', { h: 'mittel' }],
      ['stir', 'Bei mittlerer bis niedriger Hitze 45 bis 60 Minuten karamellisieren lassen. Alle 5 Minuten umrühren, angesetzte Stellen vom Boden lösen. Die Zwiebeln sollen tief braun und weich werden, nicht verbrennen.', { h: 'niedrig', t: 50 }],
      ['stir', 'Knoblauch und Mehl einrühren, 1 Minute anschwitzen.', { t: 1 }],
      ['pour', 'Mit Wein ablöschen und den Bratansatz lösen, einkochen lassen. Brühe, Thymian und Lorbeer zugeben.'],
      ['simmer', '20 Minuten köcheln, abschmecken.', { h: 'niedrig', t: 20 }],
      ['bake', 'Backofengrill vorheizen. Suppe in ofenfeste Schalen füllen, je 2 geröstete Baguettescheiben darauflegen und dick mit Gruyère bestreuen.', { mo: 'G', c: 250 }],
      ['bake', 'Unter dem Grill 3 bis 5 Minuten überbacken, bis der Käse blubbert und braun wird.', { mo: 'G', c: 250, t: 4, i: 'dish' }],
      ['serve', 'Auf Untertellern servieren, die Schalen sind sehr heiß.']
    ] }
  }
},
{
  id: 'tom-kha-gai', n: 'Tom Kha Gai', c: 'suppen', k: 'Thailand', d: 2, p: 4,
  desc: 'Kokossuppe mit Huhn, Zitronengras und Galgant. Säuerlich, scharf und cremig.',
  ing: ['400 ml Kokosmilch', '500 ml Hühnerbrühe', '2 Stangen Zitronengras', '30 g Galgant (oder Ingwer)', '4 Kaffirlimettenblätter', '400 g Hähnchenbrust', '200 g Champignons', '2 bis 3 Thai-Chilis', '3 EL Fischsauce', '1 TL Zucker', '3 EL Limettensaft', 'Koriandergrün'],
  prep: [['chop', 'Zitronengras mit dem Messerrücken anquetschen und in 4 cm Stücke schneiden. Galgant in Scheiben, Kaffirblätter einreißen. Hähnchen in dünne Streifen, Pilze in Scheiben, Chilis anquetschen.']],
  m: {
    herd: { t: 30, s: [
      ['simmer', 'Brühe und die Hälfte der Kokosmilch mit Zitronengras, Galgant und Kaffirblättern aufkochen und 5 Minuten ziehen lassen.', { h: 'mittel', t: 5 }],
      ['simmer', 'Hähnchen und Pilze zugeben und 6 Minuten leise köcheln, bis das Fleisch gar ist.', { h: 'niedrig', t: 6 }],
      ['stir', 'Restliche Kokosmilch, Fischsauce, Zucker und Chilis zugeben, nur noch erhitzen.'],
      ['season', 'Vom Herd nehmen, Limettensaft einrühren. Es soll salzig, sauer und leicht süß schmecken.'],
      ['serve', 'Mit Koriander servieren. Zitronengras, Galgant und Kaffirblätter werden nicht mitgegessen.']
    ] },
    tm: { t: 30, s: [
      ['tm', 'Brühe, halbe Kokosmilch, Zitronengras, Galgant und Kaffirblätter 8 Min./100 °C/Stufe 1.', { t: 8, c: 100, s: 1 }],
      ['tm', 'Hähnchen und Pilze zugeben, 8 Min./95 °C/Linkslauf/Sanftrührstufe garen.', { t: 8, c: 95, l: true, s: 'sanft' }],
      ['tm', 'Restliche Kokosmilch, Fischsauce, Zucker und Chilis zugeben, 2 Min./90 °C/Linkslauf/Sanftrührstufe.', { t: 2, c: 90, l: true, s: 'sanft' }],
      ['season', 'Limettensaft einrühren, abschmecken und mit Koriander servieren.']
    ] }
  }
}
);
