const version = "v1", index = "../offline/index.html";
self.addEventListener("install", e => {
    e.waitUntil(caches.open(version).then(e => e.addAll([index])))
})
self.addEventListener("fetch", t => {
    t.respondWith(caches.match(t.request).then(e => e || fetch(t.request)).catch(() => caches.match(index)))
});