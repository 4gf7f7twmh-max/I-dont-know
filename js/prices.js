/* Kochatlas – Preisschätzung aus den Zutaten.
   Grundlage sind eigene Schätzwerte für übliche Supermarktpreise in Deutschland (2025/26), keine Preisdatenbank.
   Pro Zutat: k = Euro pro kg bzw. Liter, s = Euro pro Stück, w = Gramm pro Stück, d = Gramm, wenn keine Menge dasteht.
   Die Spanne reicht von Discounterpreisen (−20 %) bis zu Markenware (+25 %). */
(function () {
  'use strict';
  var T = [
    // Kostet praktisch nichts
    [/\b(salz|wasser|eiswasser|eiswürfel|meersalz|fleur de sel|salzwasser)\b/, { k: 0, d: 0 }],
    [/brühe|fond\b|bouillon|consommé|\bjus\b|kalbsjus|dashi/, { k: 1.5 }],
    [/(bananen|mais|wein|kohl|lotus|pandan|taro|kürbis|maniok|salat)blätter|blätter \(|-blätter/, { k: 5, s: 0.1 }],
    [/knochen|karkasse|gräten/, { k: 3 }],
    [/vanillesoße|vanillesauce|custard|pudding/, { k: 3 }],
    [/(^|[\s(])eis(kugeln?)?\b|speiseeis|vanilleeis|schokoladeneis|erdbeereis|sorbet|gelato|eiscreme/, { k: 6, w: 60 }],
    // Fleisch und Fisch, spezielle zuerst
    [/leber|niere|herz|kutteln|pansen|innereien|zunge|magen/, { k: 6, w: 150 }],
    [/bällchen|frikadelle|köttbullar|nuggets/, { k: 10, w: 30 }],
    [/rinderfilet|filet mignon|chateaubriand/, { k: 50, w: 180 }],
    [/rib-?eye|entrec[oô]te|hochrippe|prime rib/, { k: 35, w: 300 }],
    [/rumpsteak|hüftsteak|strip-?steak|t-bone|flanksteak|skirt|rindersteak|\bsteaks?\b/, { k: 30, w: 250 }],
    [/kalbsfilet|kalbsrücken/, { k: 45, w: 180 }],
    [/kalb/, { k: 25, w: 200 }],
    [/lammkarree|lammrücken|lammkotelett|lammlachs/, { k: 38, w: 100 }],
    [/lamm|hammel/, { k: 18, w: 200 }],
    [/hirsch|\breh\b|rehrücken|rehkeule|rehfleisch|\bwild\b|wildfleisch|wildschwein|bison|känguru/, { k: 35, w: 200 }],
    [/entenbrust/, { k: 22, w: 300 }],
    [/\bente|gans/, { k: 10, w: 2000 }],
    [/putenbrust|putenschnitzel/, { k: 14, w: 180 }],
    [/pute/, { k: 10, w: 200 }],
    [/hähnchenbrust|hähnchenfilet|hähnchenbrüste|hühnerbrust|hähnchen-innenfilet/, { k: 11, w: 170 }],
    [/hähnchen(schenkel|keule|unterschenkel|flügel|teile|stücke)|chicken wings|hähnchenflügel/, { k: 6, w: 150 }],
    [/hähnchenhack|hackfleisch|\bhack\b|rinderhack|schweinehack|lammhack|putenhack|gemischtes hack|wurstbrät|brät/, { k: 9, w: 250 }],
    [/hähnchen|huhn|hühnchen|brathähnchen|suppenhuhn|geflügel/, { k: 6.5, w: 1200 }],
    [/schweinefilet/, { k: 14, w: 400 }],
    [/schweinebauch|bauchspeck/, { k: 9, w: 300 }],
    [/schwein|kassler|kasseler|spareribs|rippchen|eisbein/, { k: 9, w: 200 }],
    [/\brind(fleisch|er|s)|\brind\b|ochsen|beef|tafelspitz|gulasch/, { k: 17, w: 200 }],
    [/speck|bacon|pancetta|guanciale|lardo/, { k: 16, w: 20, d: 50 }],
    [/prosciutto|serrano|parmaschinken|roher schinken|jinhua/, { k: 35, w: 15 }],
    [/schinken/, { k: 16, w: 25 }],
    [/salami|chorizo|pepperoni|sucuk|chouri|linguiça|longganisa|andouille/, { k: 18, w: 15, d: 50 }],
    [/würstchen|wurst|bratwurst|hotdog|frankfurter|wiener/, { k: 10, s: 0.8 }],
    [/hummer|langusten|kaisergranat/, { k: 60, w: 400 }],
    [/jakobsmuschel/, { k: 60, w: 30 }],
    [/garnele|scampi|shrimp|krabben|krebs|flusskrebs|languste/, { k: 25, w: 20 }],
    [/miesmuschel|muscheln|venusmuschel|austern/, { k: 8, w: 15 }],
    [/tintenfisch|calamar|oktopus|sepia/, { k: 16, w: 150 }],
    [/thunfisch.*(dose|wasser|öl)|thunfisch aus der dose/, { k: 12, s: 1.8 }],
    [/lachs|thunfisch/, { k: 26, w: 150 }],
    [/sardelle|anchovi|sardine/, { k: 25, w: 5 }],
    [/kabeljau|seelachs|dorsch|schellfisch|seehecht|pangasius|tilapia|wels/, { k: 18, w: 150 }],
    [/zander|wolfsbarsch|dorade|heilbutt|steinbutt|seezunge|barsch|snapper|petersfisch/, { k: 32, w: 150 }],
    [/forelle|makrele|hering|karpfen|räucherfisch|stockfisch|trockenfisch/, { k: 15, w: 200 }],
    [/fisch/, { k: 18, w: 150 }],
    // Milch, Eier, Käse
    [/eigelb|eiweiß|eiklar|\bei(er)?\b|wachtelei|\beiern\b/, { s: 0.32, w: 55 }],
    [/buttermilch|kefir|dickmilch/, { k: 1.3 }],
    [/kondensmilch/, { k: 4 }],
    [/kokosmilch|kokoscreme/, { k: 4, s: 1.6 }],
    [/mandelmilch|hafermilch|sojamilch|reismilch|pflanzenmilch/, { k: 2 }],
    [/\bmilch|vollmilch|magermilch/, { k: 1.15 }],
    [/schlagsahne|\bsahne|double cream|kaffeesahne/, { k: 4.5, d: 50 }],
    [/crème fraîche|creme fraiche|schmand|saure sahne|sauerrahm/, { k: 4.5, s: 0.9 }],
    [/griechischer joghurt|skyr/, { k: 5 }],
    [/joghurt|tsatsiki|raita/, { k: 2.6 }],
    [/mascarpone/, { k: 9, s: 2.2 }],
    [/ricotta/, { k: 9 }],
    [/frischkäse|hüttenkäse|quark|topfen|paneer/, { k: 6 }],
    [/burrata/, { k: 20, s: 2.5 }],
    [/mozzarella|bocconcini/, { k: 8, s: 1 }],
    [/parmesan|parmigiano|pecorino|grana padano|romano/, { k: 26, d: 20 }],
    [/gruy[eè]re|bergkäse|emmentaler|comt[ée]|appenzeller|raclette|fontina/, { k: 20, d: 30 }],
    [/feta|schafskäse|hirtenkäse|cotija|sirene|halloumi/, { k: 11 }],
    [/ziegenkäse|ziegenfrischkäse/, { k: 20 }],
    [/gorgonzola|roquefort|blauschimmel|stilton/, { k: 20 }],
    [/käse|cheddar|gouda|edamer|schmelzkäse|monterey|provolone|kaschkawal/, { k: 12, d: 30 }],
    [/butterschmalz|ghee|niter kibbeh/, { k: 15, d: 15 }],
    [/butter(?!milch|nuss|kek|brot|bohn|creme)|margarine/, { k: 9.5, d: 15 }],
    // Vorräte
    [/safran/, { k: 9000, d: 0.1, w: 0.1 }],
    [/vanilleschote/, { s: 2.5, w: 3, d: 1.5 }],
    [/vanilleextrakt|vanillearoma|vanillepaste/, { k: 90, d: 3 }],
    [/vanillezucker/, { s: 0.25, w: 8 }],
    [/backpulver|natron|hirschhornsalz|weinstein/, { s: 0.2, w: 15, k: 8 }],
    [/trockenhefe|frische hefe|hefe(?!flocken|extrakt)/, { s: 0.2, w: 7, k: 10 }],
    [/puderzucker/, { k: 2 }],
    [/brauner zucker|rohrzucker|muscovado|demerara|palmzucker|jaggery|kokosblütenzucker/, { k: 3.5 }],
    [/zucker|kandis/, { k: 1.3 }],
    [/honig|agavendicksaft|reissirup|golden sirup|zuckerrübensirup|melasse/, { k: 9 }],
    [/ahornsirup/, { k: 25 }],
    [/vollkornmehl|dinkelmehl|roggenmehl|buchweizenmehl/, { k: 1.8 }],
    [/kichererbsenmehl|reismehl|mandelmehl|maismehl|masa|grieß|polenta|maisgrieß/, { k: 3 }],
    [/speisestärke|kartoffelstärke|maisstärke|tapioka/, { k: 3 }],
    [/mehl/, { k: 0.95 }],
    [/basmati|jasmin|sushireis|klebreis|risottoreis|arborio|carnaroli|vialone/, { k: 4.5 }],
    [/\breis\b|langkornreis|naturreis|wildreis/, { k: 2.5 }],
    [/gnocchi|frische nudeln|frische tagliatelle|tortellini|ravioli/, { k: 7 }],
    [/nudel|spaghetti|pasta|penne|makkaroni|fusilli|rigatoni|linguine|tagliatelle|lasagne|orzo|kritharaki|farfalle|ramen|udon|soba|glasnudel|reisnudel|spätzle|capellini|orecchiette|ziti/, { k: 2.6 }],
    [/couscous|bulgur|hirse|graupen|gerste|freekeh/, { k: 3 }],
    [/quinoa|amarant/, { k: 9 }],
    [/linsen|dal\b|moong|urad|toor/, { k: 4 }],
    [/kichererbse|kidneybohne|weiße bohnen|schwarze bohnen|pintobohne|limabohne|augenbohne|borlotti|cannellini|baked beans|bohnen aus der dose/, { k: 2.5, s: 0.9 }],
    [/haferflocken|müsli|granola|cornflakes|frühstücksflocken|puffreis/, { k: 2.5 }],
    [/semmelbrösel|paniermehl|panko/, { k: 3 }],
    [/blätterteig|filoteig|yufka|strudelteig|mürbeteig.*fertig|pizzateig.*fertig/, { k: 6, s: 1.8 }],
    [/tortilla|wrap|lavash|fladenbrot|pita|naan|chapati/, { s: 0.45, w: 60 }],
    [/brötchen|brioche|burgerbrötchen|hamburgerbrötchen|hotdog-brötchen|bao/, { s: 0.45, w: 70 }],
    [/baguette/, { s: 1.2, w: 250 }],
    [/toastbrot|sandwichbrot|weißbrot|graubrot|vollkornbrot|bauernbrot|sauerteigbrot|brot/, { k: 4, s: 0.25, w: 40 }],
    [/löffelbiskuit|kekse|keks|butterkekse|biskuit|baiser|amarettini|graham|zwieback|kräcker/, { k: 8, w: 10 }],
    [/zartbitter|vollmilchschokolade|weiße schokolade|schokolade|kuvertüre|schokotropfen|nutella|nuss-nougat/, { k: 13 }],
    [/kakao/, { k: 12, d: 10 }],
    [/pinienkerne/, { k: 55 }],
    [/pistazie|macadamia|pekannuss/, { k: 35, w: 1.5 }],
    [/mandel|haselnuss|walnuss|cashew|paranuss|nüsse/, { k: 18, w: 1.5 }],
    [/erdnussbutter|erdnussmus|mandelmus/, { k: 9 }],
    [/erdnüsse|erdnuss/, { k: 7, w: 1 }],
    [/sesam(?!öl)|chiasamen|leinsamen|sonnenblumenkerne|kürbiskerne|mohn/, { k: 10, d: 5 }],
    [/tahini|sesampaste/, { k: 12 }],
    [/kokosraspel|kokosflocken|kokoschips/, { k: 8 }],
    [/rosinen|sultaninen|korinthen|cranberrys getrocknet|getrocknete (aprikosen|feigen|pflaumen)|backpflaumen|trockenobst|datteln/, { k: 9, w: 8 }],
    [/konfitüre|marmelade|gelee|lemon curd/, { k: 6 }],
    [/gelatine|agar/, { k: 40, d: 6 }],
    // Öle, Soßen, Würzmittel
    [/sesamöl|trüffelöl|walnussöl|haselnussöl|kürbiskernöl/, { k: 18, d: 5 }],
    [/olivenöl/, { k: 10, d: 15 }],
    [/(^|[\s,(])öl(?=$|[\s,)])|rapsöl|sonnenblumenöl|pflanzenöl|erdnussöl|frittieröl|kokosöl|speiseöl|traubenkernöl|backtrennspray|palmöl/, { k: 2.8, d: 15 }],
    [/balsamico|aceto/, { k: 9 }],
    [/essig/, { k: 2.5, d: 10 }],
    [/sojasoße|sojasauce|tamari|kecap|shoyu/, { k: 7 }],
    [/fischsoße|austernsoße|hoisin|teriyaki|worcester/, { k: 9 }],
    [/miso|gochujang|doubanjiang|bohnenpaste|currypaste|harissa|sambal|sriracha|chilipaste|chilisoße|tabasco|scharfe soße|chiliöl/, { k: 14, d: 5 }],
    [/tomatenmark/, { k: 6 }],
    [/passierte tomaten|stückige tomaten|gehackte tomaten|geschälte tomaten|tomaten aus der dose|dosentomaten|tomatensoße|marinara|pizzasoße/, { k: 2, s: 1 }],
    [/ketchup|barbecuesoße/, { k: 4 }],
    [/mayonnaise|remoulade|aioli/, { k: 5 }],
    [/senf/, { k: 4, d: 5 }],
    [/kapern|oliven|essiggurke|gewürzgurke|cornichon|jalapeños aus|eingelegt|kimchi|sauerkraut/, { k: 10, d: 20 }],
    [/brühwürfel|brühpulver|gekörnte brühe|maggi/, { s: 0.15, w: 10, k: 15 }],
    [/weißwein|rotwein|\bwein\b|cidre|apfelwein|sake|mirin|shaoxing|reiswein/, { k: 6 }],
    [/sherry|portwein|marsala|madeira|wermut/, { k: 12 }],
    [/rum|cognac|weinbrand|brandy|whisk|wodka|gin\b|tequila|likör|schnaps|kirschwasser|amaretto|grand marnier|limoncello|grappa/, { k: 22 }],
    [/bier|stout|ale\b|lager/, { k: 2.5 }],
    [/kaffee|espresso/, { k: 15, s: 0.15, w: 8, d: 15 }],
    [/\btee\b|teebeutel|matcha/, { k: 30, s: 0.15, d: 3 }],
    [/limonade|cola|sprudel|mineralwasser|sodawasser|tonic|ginger ale/, { k: 1 }],
    [/fruchtsaft|orangensaft|apfelsaft|ananassaft|traubensaft|saft\b/, { k: 2 }],
    // Gewürze und Kräuter
    [/lorbeer/, { s: 0.05, w: 0.3 }],
    [/vanille/, { k: 90, d: 2 }],
    [/kardamom|nelke|sternanis|muskat|szechuan|wacholder|piment|zimtstange|tonka|sumach|za'atar|bockshornklee|asant/, { k: 70, d: 1, w: 0.5 }],
    [/pfeffer(?!minz)|chiliflocken|chilipulver|cayenne|paprikapulver|zimt|kreuzkümmel|kurkuma|curry|garam|masala|koriandersamen|kümmel|fenchelsamen|senfsamen|oregano|majoran|gewürz|kräuter der provence|italienische kräuter|berbere|baharat|ras el hanout|jerk|cajun|old bay|zatar|dukkah/, { k: 30, d: 1, w: 0.1 }],
    [/petersilie|koriander|basilikum|dill|schnittlauch|minze|estragon|kerbel|thymian|rosmarin|salbei|liebstöckel|kresse|zitronenmelisse|culantro|shiso|kräuter/, { k: 40, w: 1, d: 5, b: 1.2 }],
    [/ingwer|galgant|kurkumawurzel|zitronengras/, { k: 8, w: 30, d: 10 }],
    [/knoblauchzehe|knoblauch/, { k: 9, s: 0.08, w: 8 }],
    // Gemüse und Obst
    [/frühlingszwiebel|lauchzwiebel/, { k: 4, s: 0.15, w: 20 }],
    [/schalotte|perlzwiebel/, { k: 5, s: 0.2, w: 35 }],
    [/rote zwiebel/, { k: 2.5, s: 0.25, w: 100 }],
    [/zwiebel/, { k: 1.6, s: 0.15, w: 100 }],
    [/süßkartoffel|batata/, { k: 3, w: 300 }],
    [/kartoffel/, { k: 1.6, w: 150 }],
    [/möhre|karotte/, { k: 1.4, w: 80 }],
    [/knollensellerie/, { k: 2.5, w: 600 }],
    [/staudensellerie|sellerie/, { k: 3, s: 0.3, w: 60 }],
    [/lauch|porree/, { k: 3, w: 250 }],
    [/kirschtomate|cocktailtomate|cherrytomate|datteltomate/, { k: 7 }],
    [/tomate/, { k: 3.5, w: 100 }],
    [/paprika|spitzpaprika|bananenpaprika|pimiento/, { k: 5, s: 0.9, w: 180 }],
    [/chili|jalapeño|habanero|scotch bonnet|serrano|peperoncin|chipotle|ancho|ají|pfefferschote|peperoni/, { k: 12, s: 0.2, w: 15 }],
    [/salatgurke|gurke/, { k: 2, s: 0.7, w: 350 }],
    [/zucchini|sommerkürbis/, { k: 2.6, w: 250 }],
    [/aubergine/, { k: 3.2, w: 300 }],
    [/kürbis|hokkaido|butternut/, { k: 2.2, w: 1200 }],
    [/röschen/, { k: 3, w: 20 }],
    [/brokkoli|broccoli/, { k: 3.2, w: 400 }],
    [/blumenkohl/, { k: 2.5, s: 2, w: 800 }],
    [/rosenkohl/, { k: 4 }],
    [/grünkohl|blattkohl|mangold|pak ?choi|chinakohl|wirsing|spitzkohl/, { k: 3.5, w: 500 }],
    [/kohl|weißkohl|rotkohl|kraut/, { k: 1.6, w: 1000 }],
    [/spinat|babyspinat/, { k: 7 }],
    [/rucola|feldsalat|frisée|radicchio|endivie/, { k: 12 }],
    [/salat|römersalat|eisbergsalat|kopfsalat|blattsalat/, { k: 5, s: 1.3, w: 300 }],
    [/steinpilz|pfifferling|morchel|trüffel/, { k: 35 }],
    [/pilz|champignon|shiitake|austernpilz|kräuterseitling|enoki/, { k: 7, w: 20 }],
    [/spargel/, { k: 10 }],
    [/fenchel/, { k: 4, w: 300 }],
    [/rote bete|rote rübe/, { k: 2.5, w: 200 }],
    [/radieschen|rettich|daikon/, { k: 4, s: 1, w: 200 }],
    [/pastinake|petersilienwurzel|steckrübe|speiserübe|kohlrabi|topinambur/, { k: 3, w: 250 }],
    [/mais/, { k: 3.5, s: 0.9 }],
    [/erbsen|edamame|zuckerschoten|grüne bohnen|bohnen|okra/, { k: 5, w: 8 }],
    [/artischocke/, { k: 15, s: 1.5 }],
    [/avocado/, { s: 1.2, w: 180, k: 7 }],
    [/limette/, { s: 0.4, w: 70, k: 6 }],
    [/zitrone|zitronensaft/, { s: 0.5, w: 100, k: 5 }],
    [/orange|mandarine|clementine|grapefruit|blutorange/, { s: 0.6, w: 180, k: 3 }],
    [/apfel|äpfel/, { k: 2.6, w: 180 }],
    [/birne/, { k: 3, w: 180 }],
    [/banane/, { k: 1.8, w: 120 }],
    [/kochbanane/, { s: 0.9, w: 250 }],
    [/erdbeere|himbeere|heidelbeere|blaubeere|brombeere|johannisbeere|beeren|kirsche|sauerkirsche|cranberr/, { k: 11, w: 8 }],
    [/mango/, { s: 1.6, w: 350 }],
    [/ananas/, { s: 2.2, w: 1000 }],
    [/pfirsich|nektarine|aprikose|pflaume|zwetschge|feige|kaki/, { k: 4, w: 120 }],
    [/granatapfel/, { s: 1.5, w: 300 }],
    [/melone|wassermelone/, { k: 1.5, w: 1500 }],
    [/trauben|weintrauben/, { k: 4 }],
    [/rhabarber/, { k: 4 }],
    [/kiwi|maracuja|papaya|litschi|durian|jackfrucht|kaktusfeige/, { s: 0.8, w: 100 }],
    [/maniok|yams|taro|cassava/, { k: 4, w: 400 }],
    [/tofu|tempeh|seitan|sojaschnetzel/, { k: 9 }],
    [/nori|kombu|wakame|algen/, { k: 60, s: 0.3, w: 3 }],
    [/bambussprossen|wasserkastanie|sojasprossen|sprossen/, { k: 6 }],
    [/xxkeinexx/, { k: 0 }]
  ];
  var UNIT = [
    [/^(kg|kilo(gramm)?s?)(?=[\s.,)]|$)/, 1000], [/^(g|gr|gramm)(?=[\s.,)]|$)/, 1], [/^(l|liter)(?=[\s.,)]|$)/, 1000], [/^(ml|milliliter)(?=[\s.,)]|$)/, 1],
    [/^cl(?=[\s.,)]|$)/, 10], [/^dl(?=[\s.,)]|$)/, 100], [/^(el|esslöffel|eßlöffel)(?=[\s.,)]|$)/, 15], [/^(tl|teelöffel)(?=[\s.,)]|$)/, 5],
    [/^tassen?(?=[\s.,)]|$)/, 200], [/^becher(?=[\s.,)]|$)/, 200], [/^gläser|^glas(?=[\s.,)]|$)/, 350], [/^dosen?(?=[\s.,)]|$)/, 400],
    [/^(prisen?|messerspitzen?)(?=[\s.,)]|$)/, 0.5], [/^msp\.?/, 0.2], [/^(spritzer|schuss)(?=[\s.,)]|$)/, 10], [/^tropfen(?=[\s.,)]|$)/, 0.05],
    [/^handvoll(?=[\s.,)]|$)/, 30], [/^mg(?=[\s.,)]|$)/, 0.001], [/^löffel(?=[\s.,)]|$)/, 15], [/^paar(?=[\s.,)]|$)/, 'st'], [/^kugeln?(?=[\s.,)]|$)/, 60], [/^scheiben?(?=[\s.,)]|$)/, 25], [/^(päckchen|tütchen)(?=[\s.,)]|$)/, 'p'], [/^packung(en)?(?=[\s.,)]|$)/, 'pk'],
    [/^bund(?=[\s.,)]|$)/, 'b'], [/^zehen?(?=[\s.,)]|$)/, 8], [/^zweige?(?=[\s.,)]|$)/, 2], [/^blätt?er\b|^blatt(?=[\s.,)]|$)/, 1], [/^stück(?=[\s.,)]|$)/, 'st'], [/^würfel(?=[\s.,)]|$)/, 'w']
  ];
  var FR = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125 };
  function num(s) {
    s = s.replace(/(\d)\s*([½¼¾⅓⅔⅛])/, function (_, a, b) { return String(+a + FR[b]); });
    if (FR[s] != null) return FR[s];
    var m = s.match(/^(\d+)\/(\d+)/); if (m) return m[1] / m[2];
    return parseFloat(s.replace(',', '.'));
  }
  var QTY = /^\s*(\d+[.,]\d+|\d+\s*[½¼¾⅓⅔⅛]|\d+\/\d+|\d+|[½¼¾⅓⅔⅛])(?:\s*(?:-|–|bis)\s*(\d+[.,]\d+|\d+))?\s*/;
  function find(t) { for (var i = 0; i < T.length; i++) if (T[i][0].test(t)) return T[i][1]; return null; }
  /* Preis einer Zutatenzeile: [Euro, ungefähre Gramm]. */
  function calc(raw) {
    if (!raw || raw[0] === '#') return [0, 0];
    var s = raw.toLowerCase().replace(/\([^)]*\)/g, ' ');
    var m = s.match(QTY), q = null, rest = s;
    if (!m && /nach (geschmack|belieben|bedarf)|zum (garnieren|bestreuen|servieren|bestäuben|einfetten|frittieren)|optional/.test(s)) {
      var e0 = find(s); return e0 ? [Math.min(0.5, (e0.k || 5) * (e0.d != null ? e0.d : 5) / 1000), 5] : [0.1, 5];
    }
    if (m) { q = num(m[1]); if (m[2]) q = (q + num(m[2])) / 2; rest = s.slice(m[0].length); }
    var unit = null;
    for (var i = 0; i < UNIT.length; i++) { var um = rest.match(UNIT[i][0]); if (um) { unit = UNIT[i][1]; rest = rest.slice(um[0].length); break; } }
    var e = find(rest) || find(s);
    if (!e) {                                   // unbekannte Zutat: vorsichtig schätzen
      if (q == null) return [0.25, 20];
      if (typeof unit === 'number') return [Math.min(6, q * unit * 8 / 1000), q * unit];
      return [Math.min(3, q * 0.5), q * 50];
    }
    var k = e.k != null ? e.k : (e.s && e.w ? e.s / e.w * 1000 : 8);
    if (q == null) { var dg = e.d != null ? e.d : 10; return [k * dg / 1000 || (e.s ? Math.min(e.s, 0.5) : 0), dg]; }
    if (unit === 400 && e.s) return [q * e.s, q * 400];                 // Dose mit Stückpreis
    if (unit === 400 && k > 15) return [q * 150 * k / 1000, q * 150];   // Fisch- und Fleischdosen sind klein
    if (typeof unit === 'number') return [q * unit * k / 1000, q * unit];
    if (unit === 'b') return [q * (e.b || 1), q * 40];
    if (unit === 'p') return [q * (e.s || 0.6), q * 10];
    if (unit === 'pk') return [q * (e.s || (e.k ? e.k * 0.25 : 2)), q * 250];
    if (unit === 'w') return [q * (e.s || 0.2), q * 15];
    if (unit === 'st' && !e.s) { var wg = Math.min(e.w || 100, 120); return [q * wg * k / 1000, q * wg]; }
    if (e.s != null) return [q * e.s, q * (e.w || 50)];               // Stückzahl, z. B. „2 Zwiebeln“
    var w = e.w || 50; return [q * w * k / 1000, q * w];
  }
  function line(raw) { return calc(raw)[0]; }
  /* Schätzung für ein Rezept: Spanne pro Portion in Euro. */
  function estimate(ing, servings) {
    var sum = 0, grams = 0, n = 0;
    (ing || []).forEach(function (x) {
      if (!x || x[0] === '#') return;
      var c = calc(x); n++;
      if (isFinite(c[0]) && c[0] > 0) sum += Math.min(c[0], 30);
      if (isFinite(c[1]) && c[1] > 0) grams += Math.min(c[1], 5000);
    });
    if (!n || !(sum > 0)) return null;
    var p = servings || 4;
    if (p <= 1 && sum > 8) p = 4;                          // „1 Portion“ ist bei großen Mengen meist eine fehlende Angabe
    p = Math.max(p, Math.round(grams / 900));               // mehr als etwa 900 g Zutaten pro Portion: Portionszahl passt nicht
    var per = sum / Math.max(1, p);
    return [Math.max(0.1, Math.round(per * 0.8 * 10) / 10), Math.max(0.2, Math.round(per * 1.25 * 10) / 10)];
  }
  function eur(v) { return (v >= 10 ? String(Math.round(v)) : v.toFixed(2).replace('.', ',').replace(/,00$/, '')) + ' €'; }
  /* Texte für die Anzeige. Für 4 Personen auf halbe Euro gerundet. */
  function label(p) {
    if (!p) return null;
    var lo4 = Math.max(0.5, Math.round(p[0] * 4 * 2) / 2), hi4 = Math.max(lo4 + 0.5, Math.round(p[1] * 4 * 2) / 2);
    return { per: 'ca. ' + eur(p[0]).replace(' €', '') + '–' + eur(p[1]), four: 'ca. ' + eur(lo4).replace(' €', '') + '–' + eur(hi4), lo4: lo4, hi4: hi4 };
  }
  window.PRICE = { line: line, calc: calc, estimate: estimate, label: label };
})();
