import {Renderer, Program, Texture, Mesh, Vec2, Flowmap, Triangle} from './ogl/src/index.mjs';
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

    // Introduction / Outroduction
    class io {
        constructor() {
            M.Bind(this, ['intro'])
            this.l = new l()
            this.plug()


        }

        plug() {
            M.sLetter('#logo')

        }

        init() {
            M.S(M.Dom.root, 'height', 'auto')
            B.e.s.init()

            C.hasIntro() || M.O('#main', 0)
            C.hasIntro() && M.O('#main', 1)
            C.on()

        }

        index() {
            this.init()
            this.l.init()
            this.l.intro()


        }

        intro() {
            this.run()
            let TL = new M.TL()
            if (C.hasIntro()) {
                TL.add({
                    delay: 1000,
                    cb: () => {
                        C.intro()
                    }
                })
            } else {
                TL.add({
                    el: '#main',
                    p: {o: [0, 1]},
                    e: 'o3',
                    d: 1500,
                    delay: 1000
                })
            }

            TL.play()
        }

        static outro() {
            this.init()

            let TL = new M.TL()
            TL.add({
                el: '#main',
                p: {o: [1, 0]},
                e: 'o3',
                d: 1500
            })
            TL.add({
                el: '#menu_btn',
                p: {o: [1, 0]},
                d: 500,
                e: 'o3',
                delay: 300
            })
            M.C(M.Select('#logo')).forEach(el => {
                TL.add({
                    el: el,
                    p: {y: [0, -110]},
                    d: 700,
                    e: 'o3',
                    delay: 50
                })
            })

            TL.play()

        }


        run() {
            B.e.b.run()
        }

    }

    // Data
    class d {
        constructor(o) {
            this.data = o
        }

        set(r, c) {

            B.config.routes = {...B.config.routes, ...r}
            this.data = {...this.data, ...c}
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
                '_a': 'ca',
                '_h': 'ch',
                '_g': 'cg',
            }
            this.init()
        }


        init() {
            var t = B
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
                    c.routes = {...c.routes, ...r.routes}
                    this.d = new d({...r.cache, ...i.cache})
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
            h && history.pushState({path: u}, '', u)
            h && t.was.push({
                ...t.route.old
            })
            if (!!this.d.get()) {
                this[this.s[this.o]]()

            } else {
                M.Fetch({
                    url: origin + u + "?xhr=true",
                    type: "html",
                    method: 'GET',
                    success: r => {
                        r = JSON.parse(r)
                        const xhr = r.xhr
                        t.route.new.page = xhr.routes[u]
                        this.d.set(xhr.routes, xhr.cache)
                        this[this.s[this.o]]()

                    }
                })
            }


        }

        ca() {
            let tl = new M.TL()
            C.off()
            tl
                .add({
                    cb: () => {
                        this.insertNew()
                        this.removeOld()


                    }
                })
                .add({
                    delay: 500,
                    cb: () => {
                        B.e.n.cb(null, 'r', true)
                    }
                })
            tl.play()
        }

        ch() {
            B.e.s.stop()
            B.E.P = P.unplug()

            let tl = new M.TL()
            C.off()
            M.D('#loader', 'b')
            tl
                .add({
                    el: '._n',
                    d: 2000,
                    e: 'io6',
                    p: {x: [0, -W.w, 'px']}
                })
                .add({
                    el: '#loader',
                    d: 2000,
                    e: 'io6',
                    p: {x: [100, 0]}
                })
            tl.delay += 3000
            tl.add({
                el: '.w-loading_signal',
                p: {
                    o: [0, 1],
                },
                e: 'o3',
                d: 1000
            })
            tl.delay += 1500
            tl.add({
                cb: () => {
                    this.insertNew()
                    this.removeOld()


                }
            })
            tl.add({
                delay: 500,
                cb: () => {
                    B.e.io.l.outro()
                }
            })
            tl.delay += 500


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
            this.l = M.Select('.loader_txt')

        }

        get w() {
            return this.l.offsetWidth
        }

        get h() {
            return this.l.offsetHeight
        }

        init() {
            M.sLetter('.loader_word')
            M.SelectAll('.loader_word').forEach((el) => {
                M.T(el, 0, this.h, 'px')
            })
            M.T(M.Select('#loader_logo'), this.w / 4, this.h, 'px')

        }

        intro() {
            const TL = new M.TL();
            TL.add({
                el: '.w-loading_signal',
                p: {
                    o: [1, 0],
                },
                e: 'o3',
                d: 1000
            })
            TL.delay += 700
            const [w0, w1, w2] = M.SelectAll('.loader_word')
            const c0 = w0.childNodes
            c0.forEach((t, i) => {
                TL.add({
                    el: c0[i],
                    p: {y: [0, -this.h, 'px']},
                    e: 'cb',
                    d: 700,
                    delay: 50
                })
            })
            TL.add({
                el: w0,
                p: {x: [this.w / 4, 0, 'px'], y: [this.h, this.h, 'px']},
                e: 'o3',
                d: 700,
                delay: 700
            })
            TL.delay += 700
            const c1 = w1.childNodes
            c1.forEach((t, i) => {
                TL.add({
                    el: c1[i],
                    p: {y: [0, -this.h, 'px']},
                    e: 'o3',
                    d: 700,
                    delay: 100
                })
            })
            TL.delay += 350
            const c2 = w2.childNodes
            c2.forEach((t, i) => {
                TL.add({
                    el: c2[i],
                    p: {y: [0, -this.h, 'px']},
                    e: 'o3',
                    d: 700,
                    delay: 50
                })
            })
            TL.add({
                delay: 700,
                cb: () => {
                    M.Cl('.w-loader', 'a', 'load')

                }
            })
            TL.delay += 1000
            TL
                .add({
                    el: '._n',
                    d: 2000,
                    e: 'io6',
                    p: {x: [W.w, 0, 'px']}
                })
                .add({
                    el: '#loader',
                    d: 2000,
                    e: 'io6',
                    p: {x: [0, -100]},
                    cb: () => {
                        M.Pe.none('#loader')
                        M.D('.w-loader', 'n')
                        M.D('#loader', 'n')
                        B.e.io.intro()

                    }
                })
            TL.play()
        }

        outro() {
            B.E.P = P.plug()
            B.e.io.init()

            let tl = new M.TL
            tl.add({
                el: '._n',
                d: 2000,
                e: 'io6',
                p: {x: [W.w, 0, 'px']}
            })
                .add({
                    el: '#loader',
                    d: 2000,
                    e: 'io6',
                    p: {x: [0, -100]}
                })
                .add({
                    delay: 2000,
                    cb: () => {
                        M.D('#loader', 'n')
                        B.e.io.intro()

                    }
                })
            tl.play()
        }

    }

    class C$Home {
        constructor() {
            this.isOn = false
            this.i = null

            this.hasInit = true
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
            this.i = M.Select('#intro_img')

        }


        init() {
            // M.S(this.i, 'clipPath', `inset(0 ${50}% 0 ${50}%)`)

        }

        intro() {
            let TL = new M.TL()
            TL.add({
                el: this.i,
                d: 2100,
                e: 'io6',
                p: {s: [1.4, 1]}


            })
            TL.play()

        }

        outro() {
            return 0


        }

        run() {

        }


    }

    class C$Apod {
        constructor() {
            this.isOn = false
            this.hasInit = false
            this.hasIntro = false

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

        }


        init() {
            return 0
        }

        intro() {
            return 0


        }

        outro() {
            return 0


        }

        run() {

        }


    }

    class C$Calendar {
        constructor() {
            this.isOn = false
            this.hasInit = true
            this.hasIntro = true

        }

        on() {
            !this.isOn && this.plug()
            this.init()
            this.isOn = true
        }

        off() {
            this.isOn = false
            this.title = {}
            M.O('.l-years', 1)
            this.e('r')

        }

        plug() {
            this.title = new M.SLine('#calendar_title', 'm-line__title')
            // this.e('a')

        }

        e(a) {
            M.E(M.C('.ul-years_nav'), 'click', this.updateNav, a)
            M.E(M.C('.ul-years_nav'), 'mouseenter', this.setFocus, o)
            M.E(M.C('.ul-years_nav'), 'mouseleave', this.unSetFocus, o)
        }
        setFocus(e) {}
        unSetFocus(e) {}

        updateNav(e) {
            M.Sp(e)
            const tg = M.Tg(e, true)
            const arr = M.C('.ul-years_nav')
            const offsetX = M.Index(tg,arr) / M.L(arr);
            console.log(offsetX)
            new M.Mo({
                d: 1500,
                e: 'o3',
                a: (t) => {
                    B.e.s._scroll.y = M.R(M.Lerp(B.e.s._scroll.y, B.e.s.maxY * offsetX, t))
                    if (!B.e.s.isScrolling) B.e.s.rRaf();
                }
            }).play()
        }


        init() {
            const line = [...M.SelectAll('.m-line__title')]
            line.forEach(el => {
                M.T(el, 0, 0)
                M.O(el, 0)
            })
            M.O('.l-years', 0)
            M.O('.w-years_nav', 0)
            M.S(M.Dom.root, 'height', M.Select('.X').offsetWidth + 'px')


        }

        intro() {
            let TL = new M.TL()
            M.SelectAll('.m-line__title').forEach(el => {
                TL.add({
                    el: el,
                    delay: 50,
                    d: 700,
                    e: 'i3',
                    p: {o: [0, 1]}
                })
            })
            TL.add({
                el: '.l-years',
                delay: 300,
                d: 700,
                e: 'i3',
                p: {o: [0, 1]}
            })
            TL.add({
                el: '.w-years_nav',
                delay: 300,
                d: 700,
                e: 'i3',
                p: {o: [0, 1]}
            })

            TL.play()

        }

        outro() {
            let TL = new M.TL()
            TL.add({
                el: '.m-line__title',
                p: {y: [0, -110]},
                d: 700,
                e: 'o3',
            })
            TL.add({
                el: '.l-years',
                d: 700,
                p: {o: [1, 0]}
            })
            TL.play()
            this.d = 700

        }

        run() {

        }


    }

    class C$Month {
        constructor() {
            this.isOn = false
            this.hasInit = true
            this.hasIntro = false

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

        }

        init() {
            M.S(M.Dom.root, 'height', M.Select('.X').offsetWidth + 'px')

        }

        intro() {
            return 0


        }

        outro() {
            return 0


        }

        run() {

        }
    }

    class C$About {
        constructor() {
            this.arrTxt = []
            this.i = null
            this.title = {}
            this.isOn = false

            this.hasInit = true
            this.hasIntro = true

        }

        on() {
            this.isOn || this.plug()
            this.init()
            this.isOn = true
        }

        off() {
            this.isOn = false
            this.title = {}
            this.arrTxt = []
            this.i = null
        }

        plug() {
            // this.i = M.Select('.c-img_about')
            // this.title = new M.SLine('#about_title', 'm-line__title')
            // M.SelectAll('._line').forEach(txt => {
            //     this.arrTxt.push(new M.SLine(txt, 'm-line__txt'))
            // })
        }


        init() {
            M.O('.w-about',0)


        }

        intro() {
            let TL = new M.TL()
            TL.add({
                el:'.w-about',
                d: 2100,
                e: 'io6',
                p:{o:[0,1]},
            })

            TL.play()


        }

        outro() {
            let TL = new M.TL()
            TL.add({
                el: '.m-line__title',
                p: {y: [0, -110]},
                d: 1050,
                e: 'o3',
            })

            TL.add({
                el: '.m-line__txt',
                p: {y: [0, -110]},
                d: 1050,
                e: 'o3',
            })
            TL.add({
                d: 1050,
                e: 'io6',
                a: (t) => {
                    M.S(this.i, 'clipPath', `inset(0 0 ${100 * t}% 0)`)

                },
                i: () => {
                    M.S(this.i, 'clipPath', 'inset(0 0 0 0)')
                }

            })
            TL.play()
            this.d = 1200

        }

        run() {

        }


    }


    class C {
        static p = {
            'Calendar': new C$Calendar(),
            'Home': new C$Home(),
            'Month': new C$Month(),
            'Apod': new C$Apod(),
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

        static intro() {

            return C.p[B.route.new.page].intro()


        }


        static init() {

            return C.p[B.route.new.page].init()


        }

        static outro() {
            if (location.pathname === '/about') {
                C.p['About'].outro()

            } else if (location.pathname === '/calendar') {
                C.p['Calendar'].outro()

            } else if (location.pathname === '/') {
                C.p['Home'].outro()

            }

        }

        static off() {
            C.p[B.route.old.page].off()
        }
    }


    // Pop Up
    class p {
        constructor(el) {
            M.Bind(this, ['close'])
            this.el = M.Select(el)
        }

        show() {
            B.e.s.stop()
            this.run()
        }

        close(e) {

        }

        run() {
            this.e('a')
        }

        e(o) {
        }
    }

    // Nav
    class n {
        constructor() {
            M.Bind(this, ["open", "close", "clock"])
            this.about = new C$About()
            this.a = M.SelectAll('.nav_link')
            this.cd = ''
            this.l = {
                'Home': 0,
                'Calendar': 1,
                'Month': 1,
                'Apod': 1,
                'About': 2
            }
            this.isOn = false
            this.on()
        }

        clock() {
            const utcOffset = -8; // UTC-8 (Pacific Standard Time)
            const now = new Date();
            const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000); // Convert to UTC
            const localTime = utcTime + (utcOffset * 3600000); // Add UTC-8 offset in milliseconds
            const localDate = new Date(localTime);
            const hours = String(localDate.getHours()).padStart(2, '0');
            const minutes = String(localDate.getMinutes()).padStart(2, '0');
            const clockDisplay = `<div>${hours}<span class="blink">:</span>${minutes}</div>`;
            if (this.cd !== clockDisplay) {
                this.cd = clockDisplay
                M.SelectAll('.time').forEach(t => {
                    t.innerHTML = clockDisplay
                })

            }


        }

        plug() {

            setInterval(this.clock, 1000);
            this.clock()
        }

        on() {
            !this.isOn && this.plug()
            this.init()
            this.isOn = true
        }


        init() {
            M.Cl('.nav_link', 'r', 'is-active')
            M.Cl(this.a[this.l[B.route.new.page]], 'a', 'is-active')


        }

        e(o) {
            M.E(".open_menu", 'click', this.open, o)
            M.E(".close_menu", 'click', this.close, o)
            M.E(".nav_link", 'mouseenter', this.setFocus, o)
            M.E(".nav_link", 'mouseleave', this.unSetFocus, o)
            M.E(".close-about", 'click', ()=> {
                M.Cl('#about', 'r', 'is-active')
                M.Cl('#overlay', 'r', 'is-active')
            }, o)
            M.E(".open-about", 'click', ()=> {
                M.Cl('#about', 'a', 'is-active')
                M.Cl('#overlay', 'a', 'is-active')
            }, o)
        }

        run() {
            this.e('a')
        }

        setFocus(e) {
            const tg = M.Tg(e, true)
            M.Cl('.nav_link', 'a', 'isN-focus')
            M.Cl(tg, 'r', 'isN-focus')
            M.Cl(tg, 'a', 'is-focus')
        }

        unSetFocus(e) {
            M.Cl('.nav_link', 'r', 'isN-focus')
            M.Cl('.nav_link', 'r', 'is-focus')
        }

        open(e) {
            this.init()
            this.cb(e, 'a')
        }

        close(e) {
            this.init()
            this.cb(e, 'r')
        }

        cb(e, o, t = false) {
            if (e !== null) M.Sp(e)
            if (o === 'a') {
                M.D('#menu', 'b')
                B.e.s.stop()

                const OPEN = new M.TL;
                OPEN
                    .add({
                        el: '._n',
                        d: 2000,
                        e: 'io6',
                        p: {x: [0, W.w, 'px']}

                    })
                    .add({
                        el: '#menu',
                        d: 2000,
                        e: 'io6',
                        p: {x: [-100, 0]}
                    })
                    .add({
                        delay: 2000,
                        cb: () => {
                            M.D('._n', 'n')

                            B.e.io.init()
                        }
                    })
                    .play()

            } else {
                M.D('._n', 'b')
                B.e.b.setSafePadding()
                B.e.io.init()


                const CLOSE = new M.TL;
                CLOSE
                    .add({
                        el: '._n',
                        d: 2000,
                        e: 'io6',
                        p: {x: [W.w, 0, 'px']}
                    })
                    .add({
                        el: '#menu',
                        d: 2000,
                        e: 'io6',
                        p: {x: [0, -100]}
                    })
                CLOSE.add({
                    delay: 2000,
                    cb: () => {
                        M.D('#menu', 'n')
                        B.e.io.intro()

                    }
                })
                    .play()
            }
        }
    }

    // Toggle
    class T {
        constructor(el) {
            M.Bind(this, ['open', 'close'])
            this.el = el
            this.id = el.id
            this.run()
        }

        static plug() {
            return M.SelectAll('.T').map(
                (el) => {
                    return new T(el)
                }
            )
        }

        run() {
            this.e('a')
        }

        open(e) {
            M.Sp(e);
            B.e.s.stop();
            this.cl('a');
            // TODO focus
        }

        close(e) {
            M.Sp(e);
            B.e.s.run();
            this.cl('r');
        }

        e(a) {
            M.E("." + this.id + "-open", 'click', this.open, a);
            M.E("." + this.id + "-close", 'click', this.close, a);
        }

        cl(o) {
            M.Cl(M.Select("#" + this.id), o, "is-active");
            M.Cl(M.Select("#overlay"), o, "is-active");
        }
    }

    // Scroll
    class s {
        constructor() {
            M.Bind(this, ["w", "key", "tS", "tM", "onScroll", "loop", "run", "resize", "loop"])
            this._scroll = {
                y: 0,
                dY: 0,
                o: null,

            }
            this.options = {
                mM: 1,
                tM: 2,
                fM: 50,
                kS: 240,
                s: 0.5,
                preventTouch: false,
                space: true,
                direction: 'y'
            }
            this.scroll = {
                ...this._scroll,
                v: 0
            }
            this.isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
            this.isScrolling = false;
            this.hasScrollTicking = false
            this.l = false
            this.roR = new M.ROR(this.resize)
            this.roR.on()


        }

        get maxY() {
            return M.Dom.root.scrollHeight - W.h
        }

        rRaf() {
            this.t = Date.now();
            this.isScrolling = true;
            this.loop()
        }

        pause() {
            cancelAnimationFrame(this.loopId);
            this.isScrolling = false;
            this._scroll.y = M.R(this._scroll.y)

        }

        cb(e) {
            const s = this._scroll,
                smooth = !!e.changedTouches ? false : true
            if (e.ctrlKey) return
            // if (!smooth) return
            if (e.buttons === 4) return
            M.PD(e)
            requestAnimationFrame(() => {
                s.y = M.Clamp(s.y + s.dY, 0, this.maxY)
                this.scroll.o = s.o = e
                if (!this.isScrolling) this.rRaf();
            })


        }

        loop() {
            if (this.isScrolling) {
                if (!this.hasScrollTicking) {
                    this.loopId = requestAnimationFrame(() => this.loop());
                    this.hasScrollTicking = true
                }
                this.lerp()
                scrollTo(0, this.scroll.y)
                M.T('.X', -1 * this.scroll.y, 0, 'px')


                const d = Math.abs(this.scroll.y - this._scroll.y), _t = Date.now() - this.t
                if (_t > 100 && d < 0.5) {
                    this.pause();
                }
                this.hasScrollTicking = false
            }

        }

        run() {
            M.Cl(M.Dom.root, 'r', 's')
            !this.l && this.e('a')
            this.l = true
        }

        stop() {
            M.Cl(M.Dom.root, 'a', 's')
            this.l && this.e('r')
            this.l = false
        }

        init() {
            scrollTo(0, 0)
            this.scroll = {...this.scroll, maxY: this.maxY}
            B.scroll = this.scroll
            this.scroll.y = this._scroll.y = scrollY
            M.T('.X', -1 * this.scroll.y, 0, 'px')


        }

        w(e) {
            const s = this._scroll
            const o = this.options
            const {deltaY} = e
            s.dY = deltaY
            if (this.isFirefox && e.deltaMode === 1) {
                s.dY *= o.fM;
            }
            s.dY *= o.mM
            this.cb(e)
        }

        tS(e) {
            const T = (e.targetTouches) ? e.targetTouches[0] : e
            this.tsY = T.pageY
        }

        tM(e) {
            const s = this._scroll
            const T = (e.targetTouches) ? e.targetTouches[0] : e
            s.dY = (T.pageY - this.tsY) * this.options.tM
            this.tsY = T.pageY
            this.cb(e)
        }

        key(e) {
            const o = this.options;
            if (e.keyCode === 32 && !o.space) return
            const s = this._scroll;
            s.dY = 0;
            const keys = [
                {c: 37, d: 'y', s: -1},
                {c: 39, d: 'y', s: 1},
                {c: 38, d: 'y', s: -1},
                {c: 40, d: 'y', s: 1},
                {c: 32, d: 'y', s: 2}
            ];
            keys.forEach(key => {
                if (e.keyCode === key.c) {
                    s[key.d === "x" ? "dX" : "dY"] = o.kS * key.s;
                }
            });

            (s.dY) && this.cb(e);
        }

        lerp() {
            const s = 0.09
            this.scroll.y = M.Lerp(this.scroll.y, this._scroll.y, s)
        }

        resize(e) {
            if (this.maxY === 0) return
            requestAnimationFrame(() => {
                const s = this._scroll
                s.y = M.R(M.Clamp(s.y, 0, this.maxY), 0)
                if (!this.isScrolling) this.rRaf();
            })

        }

        onScroll() {
            if (this.maxY === 0) return
            if (!this.isScrolling) {
                this.scroll.y = this._scroll.y = scrollY
            }

        }

        e(o) {
            M.E(document, "keydown", this.key, o)
            M.E(document, "wheel", this.w, o, {passive: false})
            M.E(window, "touchstart", this.tS, o, {passive: false})
            M.E(window, "touchmove", this.tM, o)
            M.E(document, "scroll", this.onScroll, o, {passive: !1})
        }


        scrollTo(y) {
            if (this.maxY === 0) return
            this._scroll = y

        }


    }

    // Scroll => Animation
    class S {
        constructor() {
        }

        init() {
            const p = {
                txt: "_s--text",
                o: "_s--o"
            }
        }
    }

    // Parallax
    class P {
        constructor(el) {
            M.Bind(this, ['onScroll'])
            this.el = el
            this.o = JSON.parse(this.el.dataset.options)
            this.r = this.o.s
            this.c = this.o.c
            this.elY = M.XY.offsetTop(this.el) + this.el.offsetHeight / 2
            this.elX = M.XY.offsetLeft(this.el) + this.el.offsetWidth / 2
            this.el.style.willChange = 'transform'
            this.s = new M.Scope(el, 0)
            this.run()
        }

        static plug() {
            return M.SelectAll('.P').map(
                (el) => {
                    return new P(el)
                }
            )
        }

        static unplug() {
            B.E.P.forEach(p => p.stop())
            return []
        }

        t(el, x, y) {
            const xyz = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},${y},0,1)`;
            el.style.setProperty('webkitTransform', xyz);
            el.style.setProperty('msTransform', xyz);
            el.style.setProperty('transform', xyz);
        }

        cb() {
            const screnY = scrollY + innerHeight / 2;
            const screnX = scrollY + innerWidth / 2;

            const dY = this.o.y ? this.elY - screnY : 0;
            const dX = this.o.x ? this.elX - screnX : 0;
            if (this.c && d < 0) {
                this.t(this.el, dX * -1 * this.r, dY * -1 * this.r)

            } else if (!this.c) {
                this.t(this.el, dX * -1 * this.r, dY * -1 * this.r)
            }

        }

        onScroll(f = false) {
            f || this.cb();
            (this.s.visible()) && (this.cb());

        }

        e(o) {
            M.E(document, "scroll", this.onScroll, o)

        }

        run() {
            this.onScroll(true)
            this.e('a')
        }

        stop() {
            this.e('r')
        }

    }




    // webgl
    class gl {
        onResize() {
        }

        static run() {
            const vertex = /* glsl */ `
                attribute vec2 uv;
                attribute vec2 position;

                varying vec2 vUv;

                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 0, 1);
                }
            `;
            const fragment = /* glsl */ `
                precision highp float;

                uniform sampler2D tImg;
                uniform sampler2D tFlow;

                varying vec2 vUv;

                void main() {
                    
                    // R and G values are velocity in the x and y direction
                    // B value is the velocity length
                    vec3 flow = texture2D(tFlow, vUv).rgb;

                    // Use flow to adjust the uv lookup of a texture
                    vec2 uv = gl_FragCoord.xy / 600.0;
                    uv += flow.xy * 0.05;
                    vec3 tex = texture2D(tImg, uv).rgb;


                    gl_FragColor.rgb = tex;
                    gl_FragColor.a = 1.0;
                }
            `;
            const renderer = new Renderer({canvas: M.Select('#gl'), dpr: 2});
            const gl = renderer.gl;

            // Variable inputs to control flowmap
            let aspect = 1;
            const mouse = new Vec2(-1);
            const velocity = new Vec2();

            function resize() {
                renderer.setSize(W.w, W.h);
                aspect = W.w / W.h;
            }

            M.E(window, 'resize', resize, 'a', false);
            resize();

            const flowmap = new Flowmap(gl);

            // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
            const geometry = new Triangle(gl, {
                position: {size: 2, data: new Float32Array([0, 0, 0, 0, 0, 0])}
            });

            const texture = new Texture(gl, {wrapS: gl.REPEAT, wrapT: gl.REPEAT});
            const img = new Image();
            img.onload = () => (texture.image = img);
            img.src = 'media/fav.png';

            const program = new Program(gl, {
                vertex,
                fragment,
                uniforms: {
                    tImg: {value: texture},

                    // Note that the uniform is applied without using an object and value property
                    // This is because the class alternates this texture between two render targets
                    // and updates the value property after each render.
                    tFlow: flowmap.uniform,
                },
            });

            const mesh = new Mesh(gl, {geometry, program});

            // Create handlers to get mouse position and velocity
            const isTouchCapable = 'ontouchstart' in window;
            if (isTouchCapable) {
                window.addEventListener('touchstart', updateMouse, false);
                window.addEventListener('touchmove', updateMouse, false);
            } else {
                window.addEventListener('mousemove', updateMouse, false);
            }

            let lastTime;
            const lastMouse = new Vec2();

            function updateMouse(e) {
                if (e.changedTouches && e.changedTouches.length) {
                    e.x = e.changedTouches[0].pageX;
                    e.y = e.changedTouches[0].pageY;
                }
                if (e.x === undefined) {
                    e.x = e.pageX;
                    e.y = e.pageY;
                }

                // Get mouse value in 0 to 1 range, with y flipped
                mouse.set(e.x / gl.renderer.width, 1.0 - e.y / gl.renderer.height);

                // Calculate velocity
                if (!lastTime) {
                    // First frame
                    lastTime = performance.now();
                    lastMouse.set(e.x, e.y);
                }

                const deltaX = e.x - lastMouse.x;
                const deltaY = e.y - lastMouse.y;

                lastMouse.set(e.x, e.y);

                let time = performance.now();

                // Avoid dividing by 0
                let delta = Math.max(14, time - lastTime);
                lastTime = time;

                velocity.x = deltaX / delta;
                velocity.y = deltaY / delta;

                // Flag update to prevent hanging velocity values when not moving
                velocity.needsUpdate = true;
            }

            requestAnimationFrame(update);

            function update(t) {
                requestAnimationFrame(update);

                // Reset velocity when mouse not moving
                if (!velocity.needsUpdate) {
                    mouse.set(-1);
                    velocity.set(0);
                }
                velocity.needsUpdate = false;

                // Update flowmap inputs
                flowmap.aspect = aspect;
                flowmap.mouse.copy(mouse);

                // Ease velocity input, slower when fading out
                flowmap.velocity.lerp(velocity, velocity.len() ? 0.5 : 0.1);

                flowmap.update();


                renderer.render({scene: mesh});
            }
        }
    }

    // class M$F {
    //     constructor() {
    //         M.Bind(this, ['onMouseMove', 'onMouseLeave'])
    //         this.in = false
    //     }
    //     e(a){
    //         M.E(M.C('.ul-years_nav'), 'mouseenter', this.setFocus, o)
    //         M.E(M.C('.ul-years_nav'), 'mouseleave', this.unSetFocus, o)
    //     }
    //     setFocus(e) {
    //         const tg = M.Tg(e, true)
    //         M.Cl('.nav_link', 'a', 'isN-focus')
    //         M.Cl(tg, 'r', 'isN-focus')
    //         M.Cl(tg, 'a', 'is-focus')
    //     }
    //
    //     unSetFocus(e) {
    //         M.Cl('.nav_link', 'r', 'isN-focus')
    //         M.Cl('.nav_link', 'r', 'is-focus')
    //     }
    //
    // }

    // Brain
    class b {
        constructor() {
            M.Bind(this, ['setSafePadding'])
            this.t = new t
            this.roR = new M.ROR(this.setSafePadding)

            this.on(true)
        }

        plug() {
            B.e.s = new s
            B.e.n = new n
            B.e.io = new io
            B.E.T = T.plug()
            B.E.P = P.plug()
        }

        unplug() {
            B.E.P.unplug()
        }

        init() {
            this.setSafePadding()
            B.e.s.init()
            B.e.s.stop()

        }

        intro() {
            B.e.io.index()

        }

        run() {
            B.e.s.run()
            B.e.n.run()

        }

        setSafePadding() {
            if (M.Dom.nav !== undefined) {
                const top = M.Dom.nav.offsetHeight
                M.__('--safe-padding-top', top + 'px')
            }

            if (B.route.new.page === 'Calendar') {
                const h = M.GBCR('.w-years_nav', 'top') - M.GBCR('.h-calendar', 'bottom')
                const top = (h - M.Select('.w-years').offsetHeight) / 2
                M.__('--years-safe-padding-top', top + 'px')
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