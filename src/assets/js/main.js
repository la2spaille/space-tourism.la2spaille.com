import "./M.js"
import "./W.js"

Math.radToDeg = (r) => {
    return r * 180 / Math.PI;
}

Math.degToRad = (d) => {
    return d * Math.PI / 180;
}
!function () {
    "use strict"

    class m {
        constructor(m) {
            this.m = m
            this.run()
        }

        preLoad(url) {
            return new Promise(function (resolve, reject) {
                var img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });
        }

        run() {
            let p = this.m.map(url => {
                return this.preLoad(url)
            })
            Promise.all(p)
                .then(() => {
                    M.De(document, 'load')
                })
                .catch((error) => {
                    M.De(document, 'load')
                });

        }

    }

    // Introduction / Outroduction
    class io {
        constructor() {
            M.Bind(this, ['intro', 'index'])
            this.l = new l()
            this.plug()


        }

        plug() {

        }

        init() {
            B.e.s.init()
            C.hasIntro() || M.O('#main', 0)
            C.on()

        }

        index() {
            this.init()
            this.l.init()
            this.l.intro()




        }

        intro(d=0) {
            let TL = new M.TL()
            if (!C.hasIntro()) {
                TL.add({
                    el: '#main',
                    p: { o: [0, 1] },
                    d: 700,
                    o: 'o3',
                    delay: d,

                })
            } else {
                const d = 1200;

                TL.add({
                    cb: () => {
                        C.intro(d)
                    }
                })
            }
            TL.add({
                cb: () => {
                    this.run()
                }
            })

            TL.play()
        }

        outro() {


        }


        run() {
            B.e.b.run()
        }

    }

    // Data
    class d {
        constructor(o) {
            this.data = o
            this.media = []

        }

        setMedia(o) {
            const k = Object.keys(o)
            for (let i = 0; i < M.L(k) - 2; i++) {
                this.media = [...this.media, ...o[k[i]]['media']];

            }

        }

        set(r, c) {

            B.config.routes = { ...B.config.routes, ...r }
            this.data = { ...this.data, ...c }
        }

        get() {
            let t = this.data[B.route.new.url]
            return M.Is.und(t) ? false : t
        }


    }

    // Transition
    class t {
        constructor() {
            M.Bind(this, ["update", "removeOld", "insertNew", "onPopstate"])
            this.cache = ''
            this.o = null
            this.s = {
                '_a': 'tA',
                '_p': 'tA',
            }
            this.init()
        }


        init() {
            const t = B
            M.Fetch({
                url: origin + "/brain?xhr=true",
                type: "html",
                method: 'GET',
                success: r => {
                    r = JSON.parse(r)
                    const c = t.config
                    const i = {
                        cache: {
                            title: document.title,
                            html: M.Select('#main').innerHTML
                        }
                    }
                    c.routes = { ...c.routes, ...r.routes }
                    this.d = new d({ ...r.cache, ...i.cache })
                    this.d.setMedia(this.d.data)
                    this.m = new m(this.d.media)
                    this.layer = M.Select('#main')
                }
            })
            this.run()
        }


        update(e) {
            M.PD(e)
            let tg = M.Tg(e, true),
                p = tg.pathname
            this.o = tg.classList[0]
            p !== B.route.new.url && this.switch(p)
        }

        onPopstate() {
            let p = location.pathname
            this.o = '_p'
            p !== B.route.new.url && this.switch(p, false)

        }

        switch(u, h = true) {
            const t = B
            let p = t.config.routes[u]
            t.route.old = t.route.new
            t.route.new = {
                url: u,
                page: p
            }
            B.e.n.on()
            h && history.pushState({ path: u }, '', u)
            h && t.was.push({
                ...t.route.old
            })
            this[this.s[this.o]]()


        }

        tA() {
            this.insertNew()

            const _old = this.layer.children[0],
                _new = this.layer.children[1],
                t = B.e.s
            t.stop()
            let tl = new M.TL()
            tl
                .add({
                    el: _new,
                    p: { o: [0, 0] },
                    cb: () => {
                        B.e.io.init()

                    }
                })
                .add({
                    el: _old,
                    p: { o: [1, 0] },
                    d: 400,
                    delay: 400
                })
                .add({
                    el: _old,
                    cb: () => {
                        B.e.bg.outro()
                        C.off()
                        this.removeOld()
                    },
                    delay: 800
                })
                .add({
                    el: _new,
                    cb: () => {
                        B.e.bg.intro()
                    },
                    delay: 2000
                })
                .add({
                    el: _new,
                    p: { o: [0, 1] },
                    d: 400,

                    delay: 600
                })
                .add({
                    cb: () => {
                        B.e.io.intro()
                    },
                    delay: 3000
                })
            tl.play()
        }

        insertNew() {
            const N = this.d.get()
            document.title = N.title
            this.add(N.html)
            B.e.b.setSafePadding()
        }

        removeOld() {

            let O = this.layer.children
            O[0].parentNode.removeChild(O[0])
            this.e('r')
            this.run()
        }

        e(o) {
            M.E('._a', 'click', this.update, o)
            M.E('._h', 'click', this.update, o)
            M.E(window, 'popstate', this.onPopstate, o)
        }

        add(el) {
            this.layer.insertAdjacentHTML("beforeend", el)
        }

        run() {
            this.e('a')
        }
    }

    // Loader
    class l {
        constructor() {

        }


        init() {

            M.T('#nav', 0, -100)

        }

        intro() {
            const TL = new M.TL();
            TL.delay += 700
            TL
                .add({
                    // el:'#loader',
                    // p:{o:[1,0]},
                    // d:700,
                    // e:'io6',
                    cb: () => {
                        M.Cl('#loader', 'a', 'dom-loaded')
                    }
                })

                .add({
                    delay: 1300,
                    cb: () => {
                        M.D('#loader', 'n')
                    }
                })
                .add({
                    delay: 300,
                    cb: () => {
                        B.e.bg.intro()
                    }
                })
                .add({
                    el: '#nav',
                    p: { y: [-100, 0] },
                    d: 1200,
                    e: 'o5',
                    delay: 2000,
                    cb: () => {
                        B.e.io.intro(1200)

                    }
                })

            TL.play()
        }


    }

    class C$Home {
        constructor() {
            this.isOn = false
            this.hasIntro = false

        }

        on() {
            !this.isOn && this.plug()
            this.init()
            this.isOn = true
        }

        off() {
            this.isOn = false
            this.p = null

        }

        plug() {

        }

        init() {

        }

        run() {

        }


    }

    class C$Destination {
        constructor() {
            this.isOn = false
            this.hasIntro = true


        }

        on() {
            !this.isOn && this.plug()
            this.init()
            this.isOn = true
        }

        off() {
            this.isOn = false

        }

        plug() {
            this.title = M.Select('.destination_title')
            this.arrTxt = []
            const p = M.SelectAll('.m-destination-description')
            p.forEach((el, i) => {
                this.arrTxt.push(new M.SLine(el, 'm-line__p'))
            })
            this.C = new M$C([
                {
                    el: '.m-destination-name',
                    active: { p: { y: [100, 0], o: [0.5, 1] }, d: 1000, delay: 400 },
                    inactive: { p: { y: [0, -100], o: [1, 1] }, d: 400 },
                    init: { p: { y: [100, 100], o: [0, 0] } }
                },
                {
                    el: 'm-line__p',
                    active: { p: { y: [100, 0], o: [1, 1] }, d: 1000, delay: 600 },
                    inactive: { p: { y: [0, -100], o: [1, 1] }, d: 400 },
                    init: { p: { y: [125, 125], o: [0, 0] } },
                    parent: M.SelectAll('.m-destination-description')
                }, {
                    el: '.m-destination-distance',
                    active: { p: { y: [100, 0], o: [1, 1] }, d: 1000, delay: 700 },
                    inactive: { p: { y: [0, -100], o: [1, 1] }, d: 400 },
                    init: { p: { y: [100, 100], o: [0, 0] } }

                }, {
                    el: '.m-destination-travel',
                    active: { p: { y: [100, 0], o: [1, 1] }, d: 1000, delay: 700 },
                    inactive: { p: { y: [0, -100], o: [1, 1] }, d: 400 },
                    init: { p: { y: [100, 100], o: [0, 0] } }

                }, {
                    el: '.m-destination-img',
                    active: { p: { o: [0, 1] }, d: 1000, delay: 400 },
                    inactive: { p: { o: [1, 0] }, d: 1000, delay: 400 },
                    init: { p: { y: [0, 0], o: [0, 0] } }
                }
            ])


        }


        init() {
            this.C.on()
            M.S(this.title, 'transform', 'translateY(125%) rotate(5deg)')
            M.O('.l-destination', 0)
        }

        intro(d) {
            let TL = new M.TL()
            TL
                .add({
                    el: this.title,
                    p: { y: [125, 0], r: [5, 0] },
                    d: 1000,
                    e: 'o3',
                    delay: d
                })
                .add({
                    el: '.l-destination',
                    p: { o: [0, 1] },
                    d: 1000,
                    e: 'o5',
                    delay: 1000,
                    i: () => {
                        this.C.intro(16)
                    }
                })


            TL.play()



        }

 

        run() {

        }


    }

    class C$Crew {
        constructor() {
            this.isOn = false
            this.hasIntro = true


        }

        on() {
            !this.isOn && this.plug()
            this.init()
            this.isOn = true
        }

        off() {
            this.isOn = false
            this.e('r')

        }

        plug() {
            this.title = M.Select('.crew_title')
            this.arrTxt = []
            const p = M.SelectAll('.m-crew-description')
            p.forEach((el, i) => {
                this.arrTxt.push(new M.SLine(el, 'm-line__p'))
            })
            this.C = new M$C([
                {
                    el: '.m-crew-job',
                    active: { p: { y: [100, 0], o: [0, 1] }, d: 700, delay: 400 },
                    inactive: { p: { y: [0, -100], o: [1, 0.25] }, d: 400 },
                    init: { p: { y: [100, 100], o: [0, 0] } }
                },
                {
                    el: '.m-crew-name',
                    active: { p: { y: [100, 0], o: [0, 1] }, d: 700, delay: 400 },
                    inactive: { p: { y: [0, -100], o: [1, 0.25] }, d: 400 },
                    init: { p: { y: [100, 100], o: [0, 0] } }
                }, {
                    el: 'm-line__p',
                    active: { p: { y: [100, 0], o: [0, 1] }, d: 700, delay: 400 },
                    inactive: { p: { y: [0, -100], o: [1, 0.25] }, d: 400 },
                    init: { p: { y: [100, 100], o: [0, 0] } },
                    parent: M.SelectAll('.m-crew-description')


                }, {
                    el: '.m-crew-img',
                    active: { p: { o: [0, 1] }, d: 1000 },
                    inactive: { p: { o: [1, 0] }, d: 1000 },
                    init: { p: { o: [0, 0] } }
                }
            ])

        }



        init() {
            this.C.on()
            M.S(this.title, 'transform', 'translateY(125%) rotate(5deg)')
            M.O('.l-crew', 0)

        }

        intro(d) {
            let TL = new M.TL()
            TL
                .add({
                    el: this.title,
                    p: { y: [125, 0], r: [5, 0] },
                    d: 1000,
                    e: 'o3',
                    delay: d
                })
                .add({
                    el: '.l-crew',
                    p: { o: [0, 1] },
                    d: 1000,
                    e: 'o5',
                    delay: 1000,
                    i: () => {
                        this.C.intro(16)
                    }
                })


            TL.play()        }

        outro() {

        }

        run() {

        }


    }

    class C$Technology {
        constructor() {
            this.isOn = false
            this.hasIntro = true

        }

        on() {
            !this.isOn && this.plug()

            this.init()
            this.isOn = true
        }

        off() {
            this.isOn = false

        }

        plug() {
            this.C = new M$C([
                {
                    el: '.m-technology-name',
                    active: { p: { y: [100, 0], o: [0, 1] }, d: 700, delay: 400 },
                    inactive: { p: { y: [0, -100], o: [1, 0.25] }, d: 400 },
                    init: { p: { y: [100, 100], o: [0, 0] } }
                },
                {
                    el: '.m-technology-description',
                    active: { p: { y: [125, 0], o: [0, 1] }, d: 700, delay: 400 },
                    inactive: { p: { y: [0, -100], o: [1, 0.25] }, d: 400 },
                    init: { p: { y: [125, 125], o: [0, 0] } }
                }, {
                    el: '.m-technology-img',
                    active: { p: { o: [0, 1] }, d: 1100 },
                    inactive: { p: { o: [1, 0] }, d: 1100 },
                    init: { p: { o: [0, 0] } }
                }
            ])
        }

        init() {
            this.C.on()

        }

        intro(d) {
            this.C.intro()
        }

        outro() {
            return 0


        }

        run() {

        }
    }

    class C {
        static p = {
            'Home': new C$Home(),
            'Destination': new C$Destination(),
            'Crew': new C$Crew(),
            'Technology': new C$Technology(),
        }

        static hasInit() {
            return C.p[B.route.new.page].hasInit

        }

        static hasIntro() {
            return C.p[B.route.new.page].hasIntro

        }

        static on() {
            C.p[B.route.new.page].on()

        }

        static intro(d) {

            return C.p[B.route.new.page].intro(d)


        }


        static init() {

            return C.p[B.route.new.page].init()


        }

        static outro() {
            C.p[B.route.old.page].outro()

        }

        static off() {
            C.p[B.route.old.page].off()
        }
    }

    class bg {
        constructor() {
            M.Bind(this, ['loop', 'intro', 'outro'])
            this.bg = M.SelectAll('.bg')
            this.r = new M.RafR(this.loop)
            this.i = {
                "/": 0,
                "/destination": 1,
                "/crew": 2,
                "/technology": 3
            }
            this.c = {
                l: 0,
                r: 0,
                curr: 0
            }
            this.f = {
                l: 0,
                r: 0,
            }
            this.init()
        }

        loop() {
            let a = this.bg, n = a.length
            this.c.l = M.Lerp(this.c.l, this.f.l, 0.1)
            this.c.r = M.Lerp(this.c.r, this.f.r, 0.1)
            this.zIndex(this.curr)
            this.clip(a[this.curr], this.c.l, this.c.r)
        }

        init() {
            let a = this.bg, n = a.length
            for (let i = 0; i < n; i++) {
                this.clip(a[i], i * 100 / n, (100 / n) * (n - 1 - i))
            }
        }

        outro() {
            const t = B.route.old.url
            this.update(this.i[t], 'o')
        }

        intro() {
            const t = B.route.new.url
            this.update(this.i[t], 'n')
        }

        update(i, v) {
            const n = M.L(this.bg)
            this.curr = i
            if (v == "n") {
                this.c.l = i * 100 / n
                this.c.r = (100 / n) * (n - 1 - i)
                this.f.l = 0
                this.f.r = 0
            } else {
                this.c.l = 0
                this.c.r = 0
                this.f.l = i * 100 / n
                this.f.r = (100 / n) * (n - 1 - i)
            }
            new M.Delay(500, this.r.run).run()
            new M.Delay(3000, this.r.stop).run()

        }

        zIndex(c) {
            let a = this.bg, n = M.L(a)
            for (; n--;) {
                a[n].style.zIndex = (c != n) ? '0' : '7'
            }
        }

        clip(el, l, r) {
            el.style.clipPath = `inset(0 ${r}% 0 ${l}%)`
        }
    }

    // Nav
    class n {
        constructor() {
            M.Bind(this, ["open", "close"])
            this.a = M.SelectAll('.w-nav_link')
            this.l = {
                'Home': 0,
                'Destination': 1,
                'Crew': 2,
                'Technology': 3,
            }
            this.isOn = false
            this.on()
        }


        on() {
            this.init()
        }


        init() {
            M.Cl(this.a, 'r', 'is-active')
            new M.Delay(2000, () => M.Cl(this.a[this.l[B.route.new.page]], 'a', 'is-active')).run()


        }

        e(o) {
            M.E(".open_menu", 'click', this.open, o)
            M.E(".close_menu", 'click', this.close, o)

        }

        run() {
            this.isOn ||this.e('a')
            this.isOn = true

        }


        open(e) {
            this.init()
            this.cb(e, 'a')
            B.e.s.stop()
        }

        close(e) {
            this.init()
            this.cb(e, 'r')
            B.e.s.run()
        }

        cb(e, o) {
            M.Sp(e)
            M.Cl('.w-nav', o, 'is-active')
            M.Cl('.w-menu-btn', o, 'is-active')

        }
    }

    // Scroll
    class s {
        constructor() {
            const t = B
            M.Bind(this, ["w", "key", "loop", "tS", "tM", "resize"])
            M.De(document, "vScroll")
            t.scroll = {
                x: 0,
                y: 0,
                deltaX: 0,
                deltaY: 0,
                origin: null,
            }
            this.options = {
                mM: -1,
                tM: -4.5,
                fM: 15,
                kS: 120,
                speed: 0.5,
            }
            this.prog = M.Select('.progress')
            this.el = M.Select('.page')
            this.max = this.scrollY = 0
            this.tsX = this.tsY = null
            this.r = new M.RafR(this.loop)
            this.isOn = false

            this.roR = new M.ROR(this.resize)
            this.roR.on()
        }

        update(e) {
            M.De(document, "vScroll")

            this.setMax()
            const t = B.scroll
            t.y = M.R(M.Clamp(t.y + t.deltaY, 0, this.max), 2)
            t.originalEvent = e
        }

        loop() {
            const t = B.scroll
            this.scrollY = M.R(M.Lerp(this.scrollY, t.y, 0.1), 2)
            this.r.on && M.Is.interval(this.scrollY - t.y, -0.55, 0.55) && this.r.stop()
            M.T(this.el, 0, -1 * this.scrollY, 'px')
            M.T(this.prog, 0, (this.scrollY / this.max - 1) * 100, '%')
        }

        tS(e) {
            let T = (e.targetTouches) ? e.targetTouches[0] : e
            this.tsX = T.pageX
            this.tsY = T.pageY
        }

        tM(e) {
            const t = B.scroll
            let T = (e.targetTouches) ? e.targetTouches[0] : e
            t.deltaX = (T.pageX - this.tsX) * this.options.tM
            t.deltaY = (T.pageY - this.tsY) * this.options.tM
            this.tsX = T.pageX
            this.tsY = T.pageY
            this.update(e)
        }

        w(e) {
            const t = B.scroll
            t.deltaX = e.deltaX * -1 * .556
            t.deltaY = e.deltaY * -1 * .556
            t.deltaX *= this.options.mM
            t.deltaY *= this.options.mM
            this.update(e)
        }

        key(e) {
            const t = B.scroll
            t.deltaX = t.deltaY = 0
            let key = [
                { c: 37, d: 'x', s: -1 },
                { c: 39, d: 'x', s: 1 },
                { c: 38, d: 'y', s: -1 },
                { c: 40, d: 'y', s: 1 },
                { c: 32, d: 'y', s: 2 }
            ],
                n = key.length
            for (let i = 0; i < n; i++) {
                if (e.keyCode === key[i].c) {
                    t[key[i].d === "x" ? "deltaX" : "deltaY"] = this.options.kS * key[i].s
                }
            }
            (t.deltaX || t.deltaY) && this.update(e)
        }

        setMax() {
            let s = M.Select(".page")
            this.max = s.offsetHeight
            this.max -= innerHeight
        }

        resize(e) {
            this.setMax()
            const t = B.scroll
            t.y = M.R(M.Clamp(t.y, 0, this.max), 0)
            t.originalEvent = e
            this.max || this.init()
            this.max || this.r.on || this.r.run()
        }

        init() {
            this.el = M.Select(".page")
            M.T(this.prog, 0, -100, '%')
        }

        e(o) {
            M.E(document, "wheel", this.w, o)
            M.E(document, "keydown", this.key, o)
            M.E(document, "touchstart", this.tS, o)
            M.E(document, "touchmove", this.tM, o)
            M.E(document, "vScroll", () => this.r.on || this.r.run(), o)
        }

        run() {
            this.setMax()
            this.isOn || this.init()
            this.isOn || this.e('a')
            this.isOn = true

        }

        stop() {
            this.isOn && this.e('r')
            this.isOn = false

        }
    }

    class c {
        constructor() {
            M.Bind(this, ["loop", "update", "cl"])
            this.el = M.G.id('cursor')
            this.hover = [
                { el: ".w-home-cta", css: "site-cursor--explore-hover" },
                { el: ".link-hover", css: "site-cursor--link-hover" },
                { el: ".js-technology-nav", css: "site-cursor--tech-hover" }
            ]
            this.h = this.el.offsetHeight;
            this.w = this.el.offsetWidth
            this.s = 0.1
            this.eX = this.eY = this.x = this.y = 0
            this.r = new M.RafR(this.loop)
            this.isOn = false
        }

        loop() {
            this.x = M.Lerp(this.x, this.eX, this.s)
            this.y = M.Lerp(this.y, this.eY, this.s)
            M.T(this.el, this.x, this.y, 'px')
        }

        update(e) {
            this.eX = e.pageX - this.w / 2
            this.eY = e.pageY - this.h / 2
        }

        e() {
            M.E(document, "mousemove", this.update)
        }

        run() {
            this.isOn || this.e()
            this.onHover('r')
            this.onHover('a')
            this.r.on || this.r.run()

            this.isOn = true
        }

        onHover(o) {
            let a = this.hover, n = a.length
            for (let i = 0; i < n; i++) {
                M.E(a[i].el, "mouseenter", () => this.cl('a', a[i].css,o))
                M.E(a[i].el, "mouseleave", () => this.cl('r', a[i].css,o))
            }
        }

        cl(a, css) {
            M.Cl(this.el, a, css)
        }
    }

    class M$C {
        constructor(o) {
            M.Bind(this, ['_b', '_w', 'intro'])
            this.b = M.SelectAll('.m--brain')
            this.w = M.SelectAll('.m--wrapper')
            this.l = 0
            this.duration = 1100
            this.o = o
            this.roR = new M.ROR(this._w)
            this.isOn = false

        }

        on() {
            !this.isOn && this.plug()
            this.init()
            this.isOn = true
        }

        off() {
            this.isOn = false
            this.e('r')

        }


        intro(d) {

            this.o.forEach((o) => {
                const t = this.t(o)
                this.d(t[0], 'b')
                new M.Mo({
                    el: t[0],
                    p: o.active.p,
                    d: d,
                    e: 'o3'
                }).play()

            })


        }

        _w() {
            const a = this.w, n = a.length
            for (let i = 0; i < n; i++) {
                const b = a[i].children, m = b.length
                    let maxH = 0
                for (let j = 0; j < m; j++) {
                    if(M.Is.img(b[j])) {
                        console.log(M.GBCR(b[j],'height'))
                        console.log(b[j].complete + ':'+ b[j].offsetHeight)

                    }
                    const h =  b[j].offsetHeight
                    if (h > maxH) maxH = h
                }
                a[i].style.height = maxH + 'px'
            }

        }

        _b(e) {
            const I = M.Index(e.target, this.b)
            if (I === this.l) return
            this.updNav(I)
            this.o.forEach(o => {

                const t = this.t(o)
                t.forEach((el, i) => {
                    if (i === I) {
                        const l = this.l
                        new M.Mo({
                            el: t[I],
                            p: o.active.p,
                            e: 'o3',
                            d: o.active.d,
                            delay: o.active.delay || 0
                        }).play()
                        new M.Mo({
                            el: t[l],
                            p: o.inactive.p,
                            e: 'i3',
                            d: o.inactive.d,
                        }).play()
                        new M.Mo({
                            el: t[l],
                            p: o.init.p,
                            e: 'i3',
                            delay: o.inactive.d
                        }).play()
                        new M.Delay(o.inactive.d || 0, () => this.d(t[l], 'n')).run()
                        new M.Delay(o.active.delay || 0, () => this.d(t[I], 'b')).run()
                    }
                })
            })

            this.l = I
        }

        plug() {
            this.roR.on()
            this.e('a')

        }


        init() {
            this._w()
            const I = 0
            this.updNav(I)
            this.o.forEach(o => {
                const t = this.t(o)
                t.forEach(el => {
                    this._w()

                    new M.Mo({
                        el: el,
                        p: o.init.p,
                        delay:100,
                        cb:()=> {
                            // this.d(el, 'n')
                        }
                    }).play()
                })

            })

        }

        e(o) {
            M.E('.m--brain', 'click', this._b, o)
        }

        updNav(I) {
            this.b.forEach((el, i) => {
                let css = I === i ? 'a' : 'r'
                M.Cl(el, css, 'active')
                M.Pe.none(el)
                new M.Delay(this.duration, () => M.Pe.all(el)).run()
            })

        }

        d(t, p) {
            if (M.Is.arr(t)) {
                t.forEach(el => {
                    M.D(el, p)
                })
            } else {
                M.D(t, p)
            }
        }

        t(o) {
            let t = [];
            if (o.parent) {
                o.parent.forEach((el, i) => {
                    t.push(M.G.class(o.el, o.parent[i]));
                })
            } else {
                t = M.SelectAll(o.el)
            }
            return t
        }
    }


    // Brain
    class b {
        constructor() {
            M.Bind(this, ['setSafePadding'])
            this.t = new t
            this.roR = new M.ROR(this.setSafePadding)

            this.on(true)
        }

        plug() {
            B.e.s = new s()
            B.e.c = new c()
            B.e.n = new n()
            B.e.io = new io()
            B.e.bg = new bg()
        }

        unplug() {
        }

        init() {
            this.setSafePadding()
            B.e.s.init()
            B.e.s.stop()

        }

        intro() {
            if (!B.config.preload) {
                B.e.io.index()

            } else {
                M.E(document, 'load', B.e.io.index)
            }

        }

        run() {
            B.e.s.run()
            B.e.n.run()
            B.e.c.run()

        }

        setSafePadding() {
            if (M.Dom.nav !== undefined) {
                const top = M.Dom.nav.offsetHeight
                M.__('--safe-padding-top', top + 'px')
            }


        }


        on(init) {
            init && this.roR.on()
            this.plug()
            this.init()
            this.intro()
        }


    };

    B.e.b = new b
    console.log('\n %c Made with ❤️ by La2spaille : https://www.la2spaille.studio  %c \n ', 'border: 1px solid #26282a;color: #fff; background: #26282a; padding:5px 0;', '')
}()


