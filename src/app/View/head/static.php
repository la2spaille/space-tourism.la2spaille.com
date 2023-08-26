<link rel="stylesheet" href="/css/style.css?<?= VERSION ?>">
<link rel="stylesheet" href="/css/<?= $this->device ?>.css?<?= VERSION ?>">
<link crossorigin="use-credentials" rel="manifest" href="/manifest.json">
<script>
    window.B = {
        delay: 700,

        scroll: {
            y: 0
        },
        config: {
            sswitch: true,
            preload:true,
            routes: {
                '<?= $this->path?>': '<?= $this->page?>'
            }
        },
        route: {
            "new": {
                "url": '<?= $this->path?>',
                "page": '<?= $this->page?>'
            },
            "old": {
                "url": false,
                "page": false
            }
        },
        e: {
            s: null,
            b: null,
            bg: null,
        },
        E: {
            S: null,
            T: null,
            P: null,
            M: {}
        }
        , was: []
    }

    !function () {
        "use strict";
        const t = document;
        const s = t.createElement("script");
        s.src = "/js/app.<?= !IS_PROD ? '' : '' ?>js?<?=VERSION?>"
        t.onreadystatechange = e => {
            "complete" === t.readyState && t.body.appendChild(s)
        }
    }();

</script>