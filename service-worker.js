const CACHE_NAME = 'ashe-checklist-v1';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'manifest.json',
  'icon-512x512.png'
];

// Instalar el Service Worker y guardar los archivos en caché
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Servir los archivos desde la caché cuando no hay conexión
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      return response || fetch(evt.request);
    })
  );
});