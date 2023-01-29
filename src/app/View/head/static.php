<link rel="stylesheet" href="/css/style.css">
<link crossorigin="use-credentials" rel="manifest" href="/manifest.json">
<script>
   window._M = {
    delay: 500,
    isMobile: matchMedia("(hover: none)").matches,
    scroll: {
        y: 0,
        x: 0,
    },
    /*
    * vScroll - "all" | "desktop"
     */
    config: {
        serviceWorker: true,
        vScroll: "all"

    },
    e: {
        s: null,
        b: null
    },
    route: {
        "new": {
            "url": location.pathname,
            "page": null
        },
        "old": {
            "url": false,
            "page": false
        }
    },
    was: [],
}
    if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
    }
    !function() {
                "use strict";
                const t = document;
                const s = t.createElement("script");
                s.src = "/js/app.js"
                t.onreadystatechange = e=>{
                    "complete" === t.readyState && t.body.appendChild(s)
                }
    }();
        
</script>