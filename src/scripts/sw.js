import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

// Caching the listed asset below
const assetsToCache = [
  './',
  './icons/48-48.png',
  './icons/72-72.png',
  './icons/96-96.png',
  './icons/144-144.png',
  './icons/192-192.png',
  './icons/512-512.png',
  './images/hero-image_2.jpg',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
