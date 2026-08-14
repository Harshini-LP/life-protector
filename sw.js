const CACHE_NAME = 'life-protector-v1';
const ASSETS = [
  '/index.php',
  '/manifest.json'
];

// ஆப்பை மொபைல் கேச்சில் சேமித்தல்
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// நெட்வொர்க் இல்லாத போது லோக்கல் ஃபைல்களைக் காட்டுதல்
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
