/* Kochatlas-Konfiguration: Wie synchronisiert die Familien-Einkaufsliste?
   sync: 'auto'      Firebase, falls unten eingetragen, sonst der eigene Kochatlas-Server, sonst nur lokal
         'server'    immer den Kochatlas-Server unter `server` verwenden
         'firebase'  immer Firebase verwenden
         'off'       keine Synchronisierung, Liste bleibt auf dem Gerät
   server: Adresse des Kochatlas-Servers. Leer lassen, wenn der Server die App selbst ausliefert.
           Beispiel, wenn die App auf GitHub Pages liegt: 'https://kochatlas.example.de'
   firebase: Web-Konfiguration aus der Firebase-Konsole (Projekteinstellungen > Deine Apps), siehe README. */
window.KOCHATLAS_CONFIG = {
  sync: 'auto',
  server: '',
  firebase: null
};
