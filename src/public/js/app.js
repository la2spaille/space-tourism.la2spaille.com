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
window.M = {}
M.Mo = class {
    constructor(o) {
        M.Bt(this, ['run', 'rRaf', 'uProp'])
        this.r = new M.Raf(this.run)
        this.o = this.init(o)
    }

    init(o) {
        let i = {
            el: M.Select(o.el),
            d: {
                origin: o.d || 0,
                curr: 0
            },
            delay: o.delay || 0,
            cb: o.cb || !1,
            r: o.r || 2,
            e: {
                curve: o.e || "linear"
            },
            prog: 0,
            progE: 0,
            elapsed: 0
        }
        i.el = M.Is.arr(i.el) ? i.el : [i.el]
        i.elL = i.el.length
        i.up = M.Has(o, 'update') ? t => o.update(i) : this.uProp
        let p = o.p || !1
        if (p) {
            i.prop = {}
            i.propLi = []
            let k = Object.keys(p)
            i.propL = k.length
            let n = i.propL
            for (; n--;) {
                const c = k[n]
                i.prop[n] = {
                    name: c,
                    origin: {
                        start: p[c][0],
                        end: p[c][1],
                    },
                    curr: p[c][0],
                    start: p[c][0],
                    end: p[c][1],
                    unit: p[c][2] || '%'
                }
                i.propLi[c.charAt(0)] = n
            }

        }
        return i
    }

    uProp() {
        const p = this.o.prop
        let li = this.o.propLi
        let n = this.o.propL
        for (; n--;) {
            let ob = p[n]


            ob.curr = this.lerp(ob.start, ob.end)

            let x = M.Has(li, 'x') ? p[li.x].curr + p[li.x].unit : 0,
                y = M.Has(li, 'y') ? p[li.y].curr + p[li.y].unit : 0,
                r = M.Has(li, 'r') ? p[li.r].name + '(' + p[li.r].curr + 'deg)' : 0,
                s = M.Has(li, 's') ? p[li.s].name + '(' + p[li.s].curr + ')' : 0,
                xy = x + y === 0 ? 0 : 'translate3d(' + x + ',' + y + ', 0)'
            var t = xy + r + s === 0 ? 0 : [xy, r, s].filter(t => t !== 0).join(" "),
                o = M.Has(li, 'o') ? p[li.o].curr : -1,
                g = M.Has(li, 'g') ? 'grayscale(' + p[li.g].curr + ')' : -1
        }
        n = this.o.elL
        for (; n-- && M.Is.def(this.o.el[n]);) {
            t !== 0 && (this.o.el[n].style.transform = t)
            o >= 0 && (this.o.el[n].style.opacity = o)
            g !== 0 && (this.o.el[n].style.filter = g)
        }
    }

    run(t) {
        if (this.o.prog === 1) {
            this.pause()
            this.o.up()
            this.o.cb && this.o.cb()
        } else {
            this.o.elapsed = M.Clamp(t, 0, this.o.d.curr)
            this.o.prog = M.Clamp(this.o.elapsed / this.o.d.curr, 0, 1)
            this.o.progE = this.o.e.calc(this.o.prog)
            this.o.up()
        }
    }

    update(o) {
        let t = o || {},
            s = M.Has(t, 'reverse') ? "start" : "end"
        if (M.Has(this.o, 'prop')) {
            let n = this.o.propL
            for (; n--;) {
                let p = this.o.prop[n]
                p.end = p.origin[s]
                p.start = p.curr
            }
        }
        this.o.d.curr = t.d ?? M.R(this.o.d.origin - this.o.d.curr + this.o.elapsed)
        this.o.e.curve = t.e || this.o.e.curve
        this.o.e.calc = M.Ease[this.o.e.curve]
        this.o.delay = (M.Has(t, 'delay') ? t : this.o).delay
        this.o.cb = (M.Has(t, 'cb') ? t : this.o).cb
        this.o.prog = this.progE = this.o.d.curr === 0 ? 1 : 0
        this.delay = new M.Delay(this.o.delay, this.rRaf)
    }

    rRaf() {
        this.r.run()
    }

    play(t) {
        this.pause()
        this.update(t)
        this.delay.run()
    }

    pause() {
        this.r.stop()
        this.delay && this.delay.stop()
    }

    lerp(s, e) {
        return M.R(M.Lerp(s, e, this.o.progE), this.o.r)
    }
}
M.TL = class {
    constructor() {
        this.arr = []
        this.delay = 0
    }

    add(o) {
        this.delay += M.Has(o, "delay") ? o.delay : 0
        o.delay = this.delay
        this.arr.push(new M.Mo(o))
        return this
    }

    play(t) {
        this.arr.forEach(el => {
            el.play()
        })
    }
}
M.Raf = class {
    constructor(loop) {
        M.Bt(this, ['t', 'run', 'stop'])
        this.loop = loop
        this.id = this.s = null
        this.on = !1
    }

    run() {
        this.on = !0
        this.s = performance.now()
        this.id = requestAnimationFrame(this.t)
    }

    stop() {
        this.on = !1
        cancelAnimationFrame(this.id)
    }

    t(t) {
        if (!this.on) return
        this.loop(t - this.s)
        this.id = requestAnimationFrame(this.t)
    }
}
M.Delay = class {
    constructor(d, cb) {
        this.d = d
        this.cb = cb
        M.Bt(this, ["loop"])
        this.r = new M.Raf(this.loop)
    }

    run() {
        this.d === 0 ? this.cb() : this.r.run()
    }

    stop() {
        this.r.stop()
    }

    loop(e) {
        let t = M.Clamp(e, 0, this.d)
        if (t === this.d) {
            this.stop()
            this.cb()
        }
    }
}
M.Is = {
    def: t => t !== undefined,
    und: t => t === undefined,
    str: t => "string" == typeof t,
    null: t => t === null,
    obj: t => t === Object(t),
    arr: t => t.constructor === Array,
    img: t => t.tagName === "IMG",
    imgLoad: t => t.complete === true, // A gérer avec un RAF
    interval: (t, inf, sup) => t >= inf && t <= sup
}
M.Ease = {
    linear: t => t,
    cb: t => t ** 3 - 3 * t ** 2 + 3 * t
}
M.XY = {
    accX: 0, accY: 0, offsetTop: function (el) {
        this.accY = 0
        if (el.offsetParent) {
            this.accY = this.offsetTop(el.offsetParent)
        }
        return el.offsetTop + this.accY
    }, offsetLeft: function (el) {
        this.accX = 0
        if (el.offsetParent) {
            this.accX = this.offsetLeft(el.offsetParent)
        }
        return el.offsetLeft + this.accX
    }
}
M.G = {
    root: r => M.Is.def(r) ? r : document,
    s: (r, t, el) => {
        let l = M.G.root(r)["getElement" + t](el)
        return t === "ById" ? l : Array.from(l)
    },
    id: (el, r) => M.G.s(r, "ById", el),
    class: (el, r) => M.G.s(r, "sByClassName", el),
    tag: (el, r) => M.G.s(r, "sByTagName", el),
    attr: el => document.querySelector(el)
}
M.Pe = {
    f: (t, r) => {
        t.style.pointerEvents = r
    }, all: t => {
        M.Pe.f(t, "all")
    }, none: t => {
        M.Pe.f(t, "none")
    }
}
M.index = (el, arr) => {
    let n = arr.length;
    for (let i = 0; i < n; i++)
        if (el === arr[i])
            return i;
    return -1
}
M.Clamp = (t, inf, sup) => Math.max(inf, Math.min(sup, t))
M.Lerp = (s, e, a) => s * (1 - a) + a * e
M.Has = (t, r) => t.hasOwnProperty(r)
M.Rand = (a, b) => Math.random() * (b - a) + a
M.Fetch = o => {
    let t = "json" === o.type;
    const s = t ? "json" : "text"
        , p = {
        method: t ? "POST" : "GET",
        headers: new Headers({
            "Content-type": t ? "application/x-www-form-urlencoded" : "text/html"
        }),
        mode: "same-origin"
    }
    t && (p.body = o.body)
    fetch(o.url, p)
        .then(r => {
            if (r.ok) return r[s]()
        })
        .then(r => {
            o.success(r)
        })
}
M.PD = t => {
    t.cancelable && t.preventDefault()
}
M.Bt = (t, f) => {
    for (let i = 0; i < f.length; i++) {
        t[f[i]] = t[f[i]].bind(t)
    }
}
M.Select = el => {
    if (!M.Is.str(el)) return el
    let s = el.substring(1),
        c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el)
    if (M.Is.null(c)) return
    c = M.Is.arr(c) ? c : [c]
    return c[0]
}
M.SelectAll = el => {
    if (!M.Is.str(el)) return [el]
    let s = el.substring(1),
        c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el)
    if (M.Is.null(c)) return
    return M.Is.arr(c) ? c : [c]
}
M.Ga = (t, r) => t.getAttribute(r)
M.T = (t, x, y, u) => {
    u = M.Is.und(u) ? "%" : u
    const xyz = "translate3d(" + x + u + "," + y + u + ",0)"
    let s = t.style
    s['transform'] = xyz
    s['mozTransform'] = xyz
    s['msTransform'] = xyz
}
M.O = (t, r) => {
    t.style.opacity = r
}
M.D = (t, r) => {
    r = r === 'n' ? 'none' : 'block'
    let s = t.style
    s['display'] = r
}
M.R = (t, r) => {
    r = M.Is.und(r) ? 100 : 10 ** r
    return Math.round(t * r) / r
}
M.E = (el, e, cb, o) => {
    if (M.Is.und(el)) return
    let s = M.SelectAll(el),
        n = s.length
    o = o === 'r' ? 'remove' : 'add'
    for (let i = 0; i < n; i++) {
        s[i][o + "EventListener"](e, cb)
    }
}
M.De = (from, to, nativeEvent, customEvent, fromEvent) => {
    let a = nativeEvent,
        s = M.Is.arr(a) ? a : [a],
        n = s.length,
        cE = new CustomEvent(customEvent)
    const dE = () => {
        to.dispatchEvent(cE)
    }
    if (fromEvent) {
        for (let i = 0; i < n; i++) {
            M.E(from, s[i], dE)
        }
    } else {
        dE()
    }
}
M.Cl = (el, action, css) => {
    if (M.Is.und(el)) return
    let s = M.Is.arr(el) ? el : M.SelectAll(el),
        n = s.length
    action = action === 'a' ? 'add' : 'remove'
    for (let i = 0; i < n; i++) {
        s[i].classList[action](css)
    }
}
!function () {
    "use strict"

    class i {
        constructor() {
        }

        intro() {
            let t = _M,
                i = new M.Delay(t.delay, () => M.Cl('.motion', 'r', 'motion'))
            i.run()
        }
    }

    class d {
        constructor(o) {
            this.data = o
        }

        get() {
            let t = this.data[_M.route.new.url]
            return M.Is.und(t) ? false : t
        }
    }

    class t {
        constructor() {
            M.Bt(this, ["update", "removeOld", "insertNew", "vLoad","onPopstate"])
            this.l = new l
            this.cache = ''
            this.nL = M.SelectAll('.nav_link')
            this.r = new M.Raf(this.vLoad)
            this.init()
        }

        vLoad() {
            if (document.readyState == 'complete') {
                M.De('', document, '', 'vLoad', false)
                this.r.stop()
            }
        }

        init() {
            var t = _M
            M.Fetch({
                url: location + "?xhr=true",
                type: "html",
                success: r => {
                    r = JSON.parse(r)
                    const c = t.config
                    c.routes = r.routes
                    this.cache = new d(r.cache)
                    this.layer = M.Select('#main')
                }
            })
        }

        update(e) {
            M.PD(e)
            let p = e.target.pathname,
                t = _M,
                r = t.config.routes
            let tg = e.target
            for (let l of this.nL) {
                M.Cl(l.parentNode, 'r', 'active')
            }
            M.Cl(tg.parentNode, 'a', 'active')
            p !== t.route.new.url && this.switch(p)
        }

        c() {
            // l or c (c => CONTROLLER)
            /*
            old opacity remove
            bg let's go
            remove-old /call new with opacity 0
            bg choice then page indicator
            new => opacity 1
            mew => run intro then motion
            */
            this.insertNew()
            let _old = this.layer.children[0],
                _new = this.layer.children[1],
                _i = new i,
                t = _M.e.s
            t.stop()
            let tl = new M.TL()
            tl
                .add({
                    el: _old,
                    p: {o: [1, 0]},
                    d: 400,
                    delay: 400
                })
                .add({
                    el: _new,
                    p: {o: [0, 0]},
                })
                .add({
                    el: _old,
                    cb: () => {
                        this.l.outro()
                        this.removeOld()
                    },
                    delay: 800
                })
                .add({
                    el: _new,
                    cb: () => {
                        this.vLoad()
                        _M.e.b.tl()
                        this.l.intro()
                    },
                    delay: 2000
                })
                .add({
                    el: _new,
                    p: {o: [0, 1]},
                    d: 400,
                    cb: () => {
                        t.init()
                        _i.intro()
                        t.run()
                    },
                    delay: 600
                })
                .play()
        }

        insertNew() {
            let N = this.cache.get()
            document.title = N.title
            this.add(N.html)
        }

        removeOld() {
            let O = this.layer.children
            O[0].parentNode.removeChild(O[0])
        }

        e() {
            M.E('a', 'click', this.update)
            M.E(window, 'popstate', this.onPopstate)
        }

        switch(u) {
            const t = _M
            let p = t.config.routes[u]
            t.route.old = t.route.new
            t.route.new = {
                url: u,
                page: p
            }
            history.pushState({path: u}, '', u)
            this.c()
        }

        onPopstate() {
            let p = location.pathname,
                t = _M
            p !== t.route.new.url && this.switch(p)

        }

        add(el) {
            this.layer.insertAdjacentHTML("beforeend", el)
        }

        run() {
            this.e()
            this.vLoad()
        }
    }

    class l {
        constructor() {
            M.Bt(this, ['loop', 'intro', 'outro'])
            this.bg = M.SelectAll('.bg')
            this.r = new M.Raf(this.loop)
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
            this.intro()
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
            let t = _M.route.old.url
            this.update(this.i[t], 'o')
        }

        intro() {
            let t = _M.route.new.url
            this.update(this.i[t], 'n')
        }

        update(i, v) {
            let n = this.bg.length
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
            let a = this.bg, n = a.length
            for (; n--;) {
                a[n].style.zIndex = (c != n) ? '0' : '7'
            }
        }

        clip(el, l, r) {
            el.style.clipPath = `inset(0 ${r}% 0 ${l}%)`
        }
    }

    class s {
        constructor() {
            const t = _M
            M.Bt(this, ["w", "key", "loop", "tS", "tM", "roc"])
            M.De(window, document, ["wheel", "keydown", "touchmove"], "vScroll", true)
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
            this.r = new M.Raf(this.loop)
            this.run()
        }

        update(e) {
            this.setMax()
            const t = _M.scroll
            t.y = M.R(M.Clamp(t.y + t.deltaY, 0, this.max), 2)
            t.originalEvent = e
        }

        loop() {
            const t = _M.scroll
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
            const t = _M.scroll
            let T = (e.targetTouches) ? e.targetTouches[0] : e
            t.deltaX = (T.pageX - this.tsX) * this.options.tM
            t.deltaY = (T.pageY - this.tsY) * this.options.tM
            this.tsX = T.pageX
            this.tsY = T.pageY
            this.update(e)
        }

        w(e) {
            const t = _M.scroll
            t.deltaX = e.deltaX * -1 * .556
            t.deltaY = e.deltaY * -1 * .556
            t.deltaX *= this.options.mM
            t.deltaY *= this.options.mM
            this.update(e)
        }

        key(e) {
            const t = _M.scroll
            t.deltaX = t.deltaY = 0
            let key = [
                    {c: 37, d: 'x', s: -1},
                    {c: 39, d: 'x', s: 1},
                    {c: 38, d: 'y', s: -1},
                    {c: 40, d: 'y', s: 1},
                    {c: 32, d: 'y', s: 2}
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

        roc(e) {
            this.setMax()
            const t = _M.scroll
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
            M.E(window, "resize", this.roc, o)
            M.E(window, "orientationchange", this.roc, o)
            M.E(document, "vScroll", () => this.r.on || this.r.run(), o)
            M.E(document, "scroll", () => this.r.on || this.r.run(), o)
        }

        run() {
            this.setMax()
            this.e('a')
        }

        stop() {
            this.e('r')
        }
    }

    class c {
        constructor() {
            M.Bt(this, ["loop", "update", "cl"])
            this.el = M.G.id('cursor')
            this.ux = [
                {el: ".w-home-cta", css: "site-cursor--explore-hover"},
                {el: ".link-hover", css: "site-cursor--link-hover"},
                {el: ".js-technology-nav", css: "site-cursor--tech-hover"}
            ]
            this.h = this.el.offsetHeight
            this.w = this.el.offsetWidth
            this.s = 0.1
            this.eX = this.eY = this.x = this.y = 0
            this.r = new M.Raf(this.loop)
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
            this.e()
            this.hover()
            this.r.run()
        }

        hover() {
            let a = this.ux, n = a.length
            for (let i = 0; i < n; i++) {
                M.E(a[i].el, "mouseenter", () => this.cl('a', a[i].css))
                M.E(a[i].el, "mouseleave", () => this.cl('r', a[i].css))
            }
        }

        cl(a, css) {
            M.Cl(this.el, a, css)
        }
    }

    class n {
        constructor() {
            M.Bt(this, ["open", "close"])
            this.headerNav = M.Select('.w-nav')
            this.menuBtn = M.Select('.w-menu-btn')
            this.run()
        }

        e() {
            M.E(this.menuBtn, 'click', this.open)
            M.E('.close_btn', 'click', this.close)
        }

        run() {
            this.e()
        }

        open(e) {
            const t = _M
            M.Cl(this.headerNav, 'a', 'is-active')
            M.Cl(this.menuBtn, 'a', 'is-active')
            t.e.s.stop()
            e.stopPropagation()
        }

        close(e) {
            const t = _M
            M.Cl(this.headerNav, 'r', 'is-active')
            M.Cl(this.menuBtn, 'r', 'is-active')
            t.e.s.run()
            e.stopPropagation()
        }
    }

    class m {
        constructor(o) {
            M.Bt(this, ['_b', '_w'])
            this.b = M.SelectAll('.m--brain')
            this.w = M.SelectAll('.m--wrapper')
            this.l = 0
            this.d = 1100
            this.o = o
        }

        intro() {
            let b = this.b, n = b.length,
                I = 0,
                o = this.o, m = o.length
            for (let i = 0; i < n; i++) {
                let css = I === i ? 'a' : 'r'
                M.Cl(b[i], css, 'active')
            }
            for (let i = 0; i < m; i++) {
                let _o = o[i],
                    el = M.SelectAll(_o.el), n = el.length
                for (let j = 0; j < n; j++) {
                    M.D(el[j], 'n')
                    new M.Mo({
                        el: el[j],
                        p: _o.init.p,
                    }).play()
                    if (j === I) {
                        M.D(el[I], 'b')
                        new M.Mo({
                            el: el[I],
                            p: _o.active.p,
                            d: _o.active.d,
                            e: 'cb',
                            delay: 1500
                        }).play()
                    }
                }
            }
        }

        _w() {
            let a = this.w, n = a.length
            for (let i = 0; i < n; i++) {
                let b = a[i].children, m = b.length,
                    maxH = 0
                for (let j = 0; j < m; j++) {
                    let h = M.Is.img(b[j]) ? b[j].offsetHeight : b[j].offsetHeight
                    if (h > maxH) maxH = h
                }
                a[i].style.height = maxH + 'px'
            }
        }

        _b(e) {
            let a = this.b, n = a.length,
                I = M.index(e.target, a),
                b = this.o, m = b.length
            if (I === this.l) return
            for (let i = 0; i < n; i++) {
                let css = I === i ? 'a' : 'r'
                M.Cl(a[i], css, 'active')
                M.Pe.none(a[i])
                new M.Delay(this.d, () => M.Pe.all(a[i])).run()
            }
            for (let i = 0; i < m; i++) {
                let o = b[i], el = M.SelectAll(o.el), n = el.length
                for (let j = 0; j < n; j++) {
                    if (j === I) {
                        let l = this.l
                        new M.Mo({
                            el: el[I],
                            p: o.active.p,
                            e: 'cb',
                            d: o.active.d,
                            delay: o.active.delay || 0
                        }).play()
                        new M.Mo({
                            el: el[l],
                            p: o.inactive.p,
                            e: 'cb',
                            d: o.inactive.d,
                        }).play()
                        new M.Mo({
                            el: el[l],
                            p: o.init.p,
                            e: 'cb',
                            delay: o.inactive.d
                        }).play()
                        new M.Delay(o.inactive.d || 0, () => M.D(el[l], 'n')).run()
                        new M.Delay(o.active.delay || 0, () => M.D(el[I], 'b')).run()
                    }
                }
            }
            this.l = I
        }

        init() {
            M.E(document, 'vLoad', this._w, 'a')
            M.E(window, 'resize', this._w, 'a')
            M.E(window, 'orientationchange', this._w, 'a')
        }

        e() {
            M.E('.m--brain', 'click', this._b)
        }

        run() {
            this.e()
        }
    }


    class b {
        constructor() {
            M.Bt(this, ['tl'])
            this.M = {
                "/": false,
                "/destination": [
                    {
                        el: '.m-destination-name',
                        active: {p: {y: [100, 0], opacity: [0, 1]}, d: 700, delay: 400},
                        inactive: {p: {y: [0, -100], opacity: [1, 0.25]}, d: 400},
                        init: {p: {y: [100, 100], opacity: [0, 0]}}
                    },
                    {
                        el: '.m-destination-description',
                        active: {p: {y: [100, 0], opacity: [0, 1]}, d: 700, delay: 400},
                        inactive: {p: {y: [0, -100], opacity: [1, 0.25]}, d: 400},
                        init: {p: {y: [125, 125], opacity: [0, 0]}}
                    }, {
                        el: '.m-destination-distance',
                        active: {p: {y: [100, 0], opacity: [0, 1]}, d: 700, delay: 500},
                        inactive: {p: {y: [0, -100], opacity: [1, 0.25]}, d: 400},
                        init: {p: {y: [100, 100], opacity: [0, 0]}}

                    }, {
                        el: '.m-destination-travel',
                        active: {p: {y: [100, 0], opacity: [0, 1]}, d: 700, delay: 500},
                        inactive: {p: {y: [0, -100], opacity: [1, 0.25]}, d: 400},
                        init: {p: {y: [100, 100], opacity: [0, 0]}}

                    }, {
                        el: '.m-destination-img',
                        active: {p: {opacity: [0, 1]}, d: 1000},
                        inactive: {p: {opacity: [1, 0]}, d: 1000},
                        init: {p: {y: [0, 0], opacity: [0, 0]}}
                    }
                ],
                "/crew": [
                    {
                        el: '.m-crew-job',
                        active: {p: {y: [100, 0], opacity: [0, 1]}, d: 700, delay: 400},
                        inactive: {p: {y: [0, -100], opacity: [1, 0.25]}, d: 400},
                        init: {p: {y: [100, 100], opacity: [0, 0]}}
                    },
                    {
                        el: '.m-crew-name',
                        active: {p: {y: [100, 0], opacity: [0, 1]}, d: 700, delay: 400},
                        inactive: {p: {y: [0, -100], opacity: [1, 0.25]}, d: 400},
                        init: {p: {y: [100, 100], opacity: [0, 0]}}
                    }, {
                        el: '.m-crew-description',
                        active: {p: {y: [100, 0], opacity: [0, 1]}, d: 700, delay: 400},
                        inactive: {p: {y: [0, -100], opacity: [1, 0.25]}, d: 400},
                        init: {p: {y: [100, 100], opacity: [0, 0]}}

                    }, {
                        el: '.m-crew-img',
                        active: {p: {opacity: [0, 1]}, d: 1000},
                        inactive: {p: {opacity: [1, 0]}, d: 1000},
                        init: {p: {opacity: [0, 0]}}
                    }
                ],
                "/technology": [
                    {
                        el: '.m-technology-name',
                        active: {p: {y: [100, 0], opacity: [0, 1]}, d: 700, delay: 400},
                        inactive: {p: {y: [0, -100], opacity: [1, 0.25]}, d: 400},
                        init: {p: {y: [100, 100], opacity: [0, 0]}}
                    },
                    {
                        el: '.m-technology-description',
                        active: {p: {y: [125, 0], opacity: [0, 1]}, d: 700, delay: 400},
                        inactive: {p: {y: [0, -100], opacity: [1, 0.25]}, d: 400},
                        init: {p: {y: [125, 125], opacity: [0, 0]}}
                    }, {
                        el: '.m-technology-img',
                        active: {p: {opacity: [0, 1]}, d: 1100},
                        inactive: {p: {opacity: [1, 0]}, d: 1100},
                        init: {p: {opacity: [0, 0]}}
                    }
                ],
            }
            this.n = new n
            this.c = new c
            this.t = new t
            this.i = new i
            this.on()
        }

        init() {
            const _ = _M
            this.m = new m(this.M[_.route.new.url])
            this.M[_.route.new.url] && this.m.init()
        }

        intro() {
            const _ = _M
            this.M[_.route.new.url] && this.m.intro()
            this.i.intro()
        }

        run() {
            const _ = _M
            _.e.s = new s
            this.M[_.route.new.url] && this.m.run()
            this.t.run()
            this.c.run()
            this.n.run()
        }

        e() {
            M.E(window, 'load', this.tl)
        }

        tl() {
            this.init()
            this.intro()
            this.run()
        }

        on() {
            M.E(window, 'load', () => {
                M.Cl('.loader', 'a', 'dom-loaded')
                this.tl()
            })
        }

    }

    (_M.e.b = new b)
    console.log('\n %c Made with ❤️ by La2spaille  %c \n ', 'border: 1px solid #000;color: #fff; background: #000; padding:5px 0;', '')
}()

