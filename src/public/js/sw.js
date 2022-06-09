const PREFIX = 'V1.1'
self.addEventListener('install',(event) =>{
    self.skipWaiting()
    event.waitUntil((async () => {
        const cache = await caches.open(PREFIX)
    })())
})
self.addEventListener('activate',(event) =>{
    clients.claim()
    event.waitUntil((async () => {
        const keys = await caches.keys()
        await Promise.all(
            keys.map((key)=> {
                if (!key.includes(PREFIX)) {
                    return caches.delete(key)
                }
            })
        )
    })())
})
self.addEventListener('fetch', (event) =>{
    if(event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    const preloadResponse = await event.preloadResponse
                    if (preloadResponse) {
                        return preloadResponse
                    }
                    return await fetch(event.request)
                } catch (e) {
                    const cache = await caches.open(PREFIX)
                    // return await cache.match("connection.php")
                }
            })()
        )

    }
})