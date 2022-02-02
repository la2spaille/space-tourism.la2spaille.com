 const PREFIX = 'V1.1'
 self.addEventListener('install',(event) =>{
    self.skipWaiting()
    event.waitUntil((async () => {
        const cache = await caches.open(PREFIX)
        cache.add(new Request("assets/home/background-home-desktop.jpg"))
        cache.add(new Request("assets/home/background-home-tablet.jpg"))
        cache.add(new Request("assets/home/background-home-mobile.jpg"))
        cache.add(new Request("assets/destination/background-destination-desktop.jpg"))
        cache.add(new Request("assets/destination/background-destination-tablet.jpg"))
        cache.add(new Request("assets/destination/background-destination-mobile.jpg"))
        cache.add(new Request("assets/crew/background-crew-desktop.jpg"))
        cache.add(new Request("assets/crew/background-crew-tablet.jpg"))
        cache.add(new Request("assets/crew/background-crew-mobile.jpg"))
        cache.add(new Request("assets/technology/background-technology-desktop.jpg"))
        cache.add(new Request("assets/technology/background-technology-tablet.jpg"))
        cache.add(new Request("assets/technology/background-technology-mobile.jpg"))
        cache.add(new Request("css/style.css"))
        cache.add(new Request("js/app.js"))
        cache.add(new Request("js/destination.js"))
        cache.add(new Request("js/crew.js"))
        cache.add(new Request("js/technology.js"))
        cache.add(new Request("index.php"))
        cache.add(new Request("destination.php"))
        cache.add(new Request("crew.php"))
        cache.add(new Request("technology.php"))
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
                    return await cache.match("/404-not-found-master-By-La2spaille/index.php")
                }
            })()
        )
        
    }
})