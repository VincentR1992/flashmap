// Flashmap service worker : lancement instantané + carte disponible hors ligne
const SHELL_CACHE = 'fm-shell-v2';
const STYLE_CACHE = 'fm-style';
const TILE_CACHE = 'fm-tiles';
const MAX_TILES = 5000;
const SHELL = ['./', './index.html', './maplibre-gl.js', './maplibre-gl.css', './manifest.webmanifest',
  './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('fm-shell-') && k !== SHELL_CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Sert immédiatement la version en cache, et met à jour en arrière-plan
async function staleWhileRevalidate(cacheName, req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req, { ignoreSearch: cacheName === SHELL_CACHE });
  const network = fetch(req).then(res => {
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  }).catch(() => cached);
  return cached || network;
}

let puts = 0;
async function trimTiles() {
  const cache = await caches.open(TILE_CACHE);
  const keys = await cache.keys();
  const extra = keys.length - MAX_TILES;
  for (let i = 0; i < extra; i++) await cache.delete(keys[i]);
}

async function cacheFirst(req) {
  const cache = await caches.open(TILE_CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res && res.ok) {
    cache.put(req, res.clone());
    if (++puts % 300 === 0) trimTiles();
  }
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin === self.location.origin) {
    e.respondWith(staleWhileRevalidate(SHELL_CACHE, req));
  } else if (u.hostname === 'tiles.openfreemap.org') {
    // Le style et l'index des tuiles changent : mis à jour en arrière-plan. Tuiles, polices, sprites : versionnés.
    if (u.pathname.startsWith('/styles/') || /^\/planet\/?$/.test(u.pathname)) e.respondWith(staleWhileRevalidate(STYLE_CACHE, req));
    else e.respondWith(cacheFirst(req));
  } else if (u.hostname === 'server.arcgisonline.com') {
    e.respondWith(cacheFirst(req));
  }
});
