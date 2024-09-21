// service-worker.js
const CACHE_NAME = 'CipherNet-v1'; // Update the version when you change cache content
const urlsToCache = [
    '/',
    '/index.html',
    '/style/style.css',
    '/images/192cb.png',
    '/images/512cb.png'
];

// Install event - caching the specified resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve cached resources or fetch from the network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request); // Use cached resource or fetch from network
            })
    );
});
