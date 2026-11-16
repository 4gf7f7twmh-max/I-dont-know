/* Kochatlas – Geräte, Kategorien und Rezept-Registrierung */
window.RECIPES = [];
window.R = function () { for (var i = 0; i < arguments.length; i++) window.RECIPES.push(arguments[i]); };

window.DEVICES = {
  herd:     { n: 'Herd',              sub: 'Topf, Pfanne, Wok' },
  ofen:     { n: 'Backofen',          sub: 'Ober-/Unterhitze, Umluft, Grill' },
  airfryer: { n: 'Heißluftfritteuse', sub: 'Airfryer' },
  tm:       { n: 'Thermomix',         sub: 'Küchenmaschine mit Kochfunktion' },
  mikro:    { n: 'Mikrowelle',        sub: '800 Watt, falls nicht anders angegeben' },
  dkt:      { n: 'Schnellkochtopf',   sub: 'Dampfdrucktopf, Instant Pot' },
  slow:     { n: 'Slow Cooker',       sub: 'Schongarer' },
  grill:    { n: 'Grill',             sub: 'Gas, Holzkohle oder Elektro' },
  kalt:     { n: 'Ohne Kochen',       sub: 'Messer, Schüssel, Mixer' }
};

window.CATS = {
  fruehstueck: { n: 'Frühstück',             h: 38,  ic: 'egg' },
  suppen:      { n: 'Suppen & Eintöpfe',     h: 18,  ic: 'soup' },
  pasta:       { n: 'Pasta & Nudeln',        h: 44,  ic: 'pasta' },
  fleisch:     { n: 'Fleisch & Geflügel',    h: 6,   ic: 'meat' },
  fisch:       { n: 'Fisch & Meeresfrüchte', h: 198, ic: 'fish' },
  veggie:      { n: 'Vegetarisch & Vegan',   h: 120, ic: 'leaf' },
  beilagen:    { n: 'Beilagen',              h: 52,  ic: 'potato' },
  salate:      { n: 'Salate',                h: 96,  ic: 'salad' },
  snacks:      { n: 'Snacks & Vorspeisen',   h: 28,  ic: 'snack' },
  kuchen:      { n: 'Kuchen & Torten',       h: 336, ic: 'cake' },
  brot:        { n: 'Brot & Gebäck',         h: 30,  ic: 'bread' },
  dessert:     { n: 'Desserts',              h: 300, ic: 'dessert' },
  kreation:    { n: 'Eigene Kreationen',     h: 262, ic: 'spark' }
};

/* Aktionen: Bezeichnung für die Schritt-Animation */
window.ACTIONS = {
  prep: 'Vorbereiten', chop: 'Schneiden', grate: 'Reiben', stir: 'Rühren', boil: 'Kochen',
  simmer: 'Köcheln', fry: 'Braten', flip: 'Wenden & Schwenken', deepfry: 'Frittieren',
  bake: 'Backen', airfry: 'Heißluft-Garen', tm: 'Thermomix', whisk: 'Verquirlen',
  mix: 'Mixen', fold: 'Unterheben', knead: 'Kneten', shape: 'Formen', rest: 'Ruhen lassen',
  season: 'Würzen', pour: 'Angießen', serve: 'Anrichten', blend: 'Pürieren', grill: 'Grillen',
  steam: 'Dämpfen', roll: 'Ausrollen', cool: 'Abkühlen', chill: 'Kühlen', micro: 'Mikrowelle',
  slow: 'Slow Cooker', pressure: 'Druckgaren', mash: 'Stampfen', spread: 'Bestreichen',
  layer: 'Schichten'
};
