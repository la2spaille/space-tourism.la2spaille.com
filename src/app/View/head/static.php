<link rel="stylesheet" href="/css/style.css">
<link crossorigin="use-credentials" rel="manifest" href="/fav/manifest.json">
<script>
    window.addEventListener('load', () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/js/sw.js');
        }
    })
</script>