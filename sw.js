/* Kochatlas Service Worker: App-Dateien offline verfügbar machen */
const CACHE = 'kochatlas-v9';
const ASSETS = [
  './', 'index.html', 'css/style.css', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png',
  'config.js', 'js/devices.js', 'js/icons.js', 'js/animations.js', 'js/plating.js', 'js/sync.js', 'js/app.js', 'css/scenes.css',
  "data/01-fruehstueck.js",
  "data/02-suppen.js",
  "data/03-pasta.js",
  "data/04-fleisch.js",
  "data/05-fisch.js",
  "data/06-veggie.js",
  "data/07-beilagen-salate.js",
  "data/08-snacks.js",
  "data/09-kuchen.js",
  "data/10-brot.js",
  "data/11-dessert.js",
  "data/12-kreationen.js",
  "data/13-sterne.js",
  "data/14-schnell.js",
  "data/15-kreationen-2.js",
  "data/16-sterne-2.js",
  "data/web/index.js",
  "data/images.js",
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin === location.origin && url.pathname.indexOf('/api/') >= 0) return;
  if (url.origin === location.origin) {
    // Netzwerk zuerst, damit Updates ankommen; offline aus dem Cache
    e.respondWith(fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
  } else if (url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    })));
  }
});
