window._M = {
    delay: 500,
    config: {
        serviceWorker: true
    },
    route: {
        "new": {
            "url": false,
            "page": false
        },
        "old": {
            "url": false,
            "page": false
        }
    },
    was: []
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
        this.loop = loop
        this.id = this.s = null
        this.on = !1
        M.Bt(this, ['t', 'run', 'stop'])
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
    obj: t => t === Object(t),
    arr: t => t.constructor === Array,
    img: t => t.tagName === "IMG",
    imgLoad: t => t.complete === true, // A gérer avec un RAF
    interval: (t, inf, sup) => t >= inf && t <= sup
}
M.Ease = {
    linear: t => t,
    o1: t => Math.sin(t * (.5 * Math.PI)),
    o2: t => t * (2 - t),
    o3: t => --t * t * t + 1,
    o4: t => 1 - --t * t * t * t,
    o5: t => 1 + --t * t * t * t * t,
    o6: t => 1 === t ? 1 : 1 - 2 ** (-10 * t),
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
M.Gl = {}

M.index = (el, arr) => {
    let n = arr.length;
    for (let i = 0; i < n; i++)
        if (el === arr[i])
            return i;
    return -1
}
M.Clamp = (t, inf, sup) => Math.max(inf, Math.min(sup, t))
M.Lerp = (s, e, a) => s * (1 - a) + a * e
M.iLerp = (s, e, a) => s * (1 - a) + a * e // on clamp puis on lerp
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
M.To = ({delay, duration, timing, draw}) => {
    let start = performance.now()
    requestAnimationFrame(function To(timestamp) {
        let t = (timestamp - start) / (duration * 1000)
        if (t <= delay) t = delay
        if (t >= 1) t = 1
        let progress = timing(t)
        draw(progress)
        if (t < 1) {
            requestAnimationFrame(To)
        }
    })
}
M.Tl = (arr, attr, timeout, delay) => {
    for (let i = 0; i < arr.length; i++) {
        if (M.Is.def(delay)) {
            timeout += typeof delay === 'object' ? delay[i] * 1000 : delay * 1000
        }
        if (attr !== '') {
            setTimeout(() => {
                arr[i].classList.remove(attr)
            }, timeout)
        } else {
            setTimeout(() => {
                arr[i]()
            }, timeout)
        }
    }
}
M.Select = el => {
    if (!M.Is.str(el)) return el
    let s = el.substring(1),
        c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el)
    return c.length === 1 ? c[0] : c
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
    let a = M.Select(el), s = M.Is.arr(a) ? a : [a], n = s.length
    o = o === 'r' ? 'remove' : 'add'
    for (let i = 0; i < n; i++) {
        s[i][o + "EventListener"](e, cb)
    }
}
M.De = (fr, to, nev, cev) => {
    let a = nev, s = M.Is.arr(a) ? a : [a], n = s.length, cE = new CustomEvent(cev)
    let de = () => {
        to["dispatchEvent"](cE)
    }
    for (let i = 0; i < n; i++) {
        M.E(fr, s[i], de)
    }
}
M.Cl = (el, action, css) => {
    if (M.Is.und(el)) return
    let a = M.Select(el), s = M.Is.arr(a) ? a : [a], n = s.length
    action = action === 'a' ? 'add' : 'remove'

    for (let i = 0; i < n; i++) {
        s[i].classList[action](css)
    }
}
!function () {
    "use strict"

    class i {
        constructor() {
            this.run()
        }

        run() {
            let t = _M,
                intro = new M.Delay(t.delay, () => M.Cl('.motion', 'r', 'motion'))
            intro.run()
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
            M.Bt(this, ["update"])

            this.init()
            this.run()
        }

        init() {
            let t = _M
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
            let p = e.target.pathname
            let t = _M,
                r = t.config.routes

            p !== t.route.new.url && this.out(p)
            M.PD(e)

        }

        insertNew(o) {

        }

        removeOld() {

        }

        e() {
            M.E('a', 'click', this.update)
        }

        in(o) {
            const t = _M
            let d = this.cache
            let i = d.get()
            console.log(i)
            // this.add()
        }

        out() {

        }

        onPopstate() {

        }

        add(el) {
            this.layer.insertAdjacentHTML("beforeend", el)
        }

        run() {
            this.e()

        }
    }

    class c {
        constructor() {
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
            M.Bt(this, ["loop", "update", "cl"])
            this.r = new M.Raf(this.loop)
            this.run()
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

    class s_scroll {
        constructor(o) {
            const t = _M
            t.scroll = {
                x: 0,
                y: 0,
                deltaX: 0,
                deltaY: 0,
                origin: null,
            }
            this.options = {
                mM: o.mM || -1,
                tM: o.tM || -4.5,
                fM: o.fM || 15,
                kS: o.kS || 120,
                speed: o.speed || 0.5,
            }
            this.el = M.Select(".page")
            this.prog = M.Select('.progress')
            this.max = this.scrollV = 0
            this.tsX = this.tsY = null
            M.Bt(this, ["w", "key", "loop", "tS", "tM"])
            M.De(window, document, ["wheel", "keydown", "touchmove"], "vScroll")
            this.r = new M.Raf(this.loop)
            this.run()
        }

        update(e) {
            this.setMax()
            const t = _M
            t.scroll.y += t.scroll.deltaY
            t.scroll.originalEvent = e
        }

        loop() {
            const t = _M
            let y = t.scroll.y = M.Clamp(t.scroll.y, 0, this.max)
            this.scrollV = M.Lerp(this.scrollV, y, 0.1)
            M.T(this.prog, 0, -(1 - this.scrollV / this.max) * 100, '%')
            M.T(this.el, 0, -this.scrollV, 'px')
            this.r.on && M.Is.interval(this.scrollV - y, -0.01, 0.01) && this.r.stop()

        }

        tS(e) {
            let T = (e.targetTouches) ? e.targetTouches[0] : e
            this.tsX = T.pageX
            this.tsY = T.pageY
        }

        tM(e) {
            const t = _M
            let T = (e.targetTouches) ? e.targetTouches[0] : e
            t.scroll.deltaX = (T.pageX - this.tsX) * this.options.tM
            t.scroll.deltaY = (T.pageY - this.tsY) * this.options.tM
            this.tsX = T.pageX
            this.tsY = T.pageY
            this.update(e)
        }

        w(e) {
            const t = _M
            t.scroll.deltaX = e.deltaX * -1 * .556
            t.scroll.deltaY = e.deltaY * -1 * .556
            t.scroll.deltaX *= this.options.mM
            t.scroll.deltaY *= this.options.mM
            this.update(e)
        }

        key(e) {
            const t = _M
            t.scroll.deltaX = t.scroll.deltaY = 0
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
                    t.scroll[key[i].d === "x" ? "deltaX" : "deltaY"] = this.options.kS * key[i].s
                }
            }
            (t.scroll.deltaX || t.scroll.deltaY) && this.update(e)
        }

        setMax() {
            let s = M.Select(".page")
            this.max = s.offsetHeight
            this.max -= innerHeight
        }

        init() {
            M.T(this.prog, 0, -100, '%')
        }

        e() {
            let e = [
                    {e: "wheel", f: "w"},
                    {e: "keydown", f: "key"},
                    {e: "touchstart", f: "tS"},
                    {e: "touchmove", f: "tM"}
                ],
                n = e.length
            for (let i = 0; i < n; i++) {
                const a = e[i]
                M.E(document, a.e, this[a.f])
            }
        }

        run() {
            this.init()
            M.E(window, "resize", this.setMax())
            M.E(window, "orientationchange", this.setMax)
            /* ────────────────────────────────────────── */
            this.e()
            /* ────────────────────────────────────────── */
            M.E(document, "vScroll", () => this.r.on || this.r.run())
        }
    }

    class m {
        constructor() {
            this.headerNav = M.Select('.w-nav')
            this.menuBtn = M.Select('.w-menu-btn')
            this.closeBtn = M.Select('.w-close-btn')
            this.run()
        }

        e() {
            M.E(this.menuBtn, 'click', this.open)
            M.E(this.closeBtn, 'click', this.close)
        }

        run() {
            this.e()
        }

        open(e) {
            document.body.style.overflowY = "hidden"
            M.Cl(this.headerNav, 'a', 'is-active')
            M.Cl(this.menuBtn, 'a', 'is-active')
            e.stopPropagation()
        }

        close(e) {
            document.body.style.overflowY = "auto"
            M.Cl(this.headerNav, 'r', 'is-active')
            M.Cl(this.menuBtn, 'r', 'is-active')
            e.stopPropagation()
        }
    }

    class mo {
        constructor(o) {
            this.b = M.Select('.m--brain')
            this.w = M.Select('.m--wrapper')
            this.l = 0
            this.d = 1100
            this.o = o
            M.Bt(this, ['_b'])
            this.init()
            this.run()
        }

        intro() {
            let a = this.b, n = a.length,
                I = 0,
                b = this.o, m = b.length
            for (let i = 0; i < n; i++) {
                let css = I === i ? 'a' : 'r'
                M.Cl(a[i], css, 'active')
            }
            for (let i = 0; i < m; i++) {
                let o = b[i], el = M.Select(o.el), n = el.length
                for (let j = 0; j < n; j++) {
                    if (j === I) {
                        M.D(el[I], 'b')
                        new M.Mo({
                            el: el[I],
                            p: o.active.p,
                            d: o.active.d
                        }).play()
                    } else {
                        M.D(el[j], 'n')
                        new M.Mo({
                            el: el[j],
                            p: o.init.p,
                        }).play()
                    }
                }
            }
        }

        _w() {
            let a = this.w, n = a.length
            for (let i = 0; i < n; i++) {
                let b = a[i].children, m = b.length,
                    max = 0
                for (let j = 0; j < m; j++) {
                    let h = M.Is.img(b[j]) ? b[j].height : b[j].offsetHeight
                    if (h > max) max = h
                }
                a[i].style.height = max + 'px'
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
            }
            for (let i = 0; i < m; i++) {
                let o = b[i], el = M.Select(o.el), n = el.length
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
                new M.Delay(this.d, () => M.Pe.all(a[i])).run()
            }
            this.l = I
        }

        init() {
            this._w()
            this.intro()
        }

        e() {
            M.E(this.b, 'click', this._b)
        }

        run() {
            this.e()
        }
    }

    class p {
        constructor(el) {
            this.el = M.Select(el)
            this.y = this.x = this.w = this.h = 0
            this.eX = this.eY = 0
            this.s = 0.5
            this.xy = 0.2
            M.Bt(this, ['update', 'loop'])
            this.r = new M.Raf(this.loop)
            this.on()
        }


        loop() {
            this.x = M.Lerp(this.x, this.eX, this.s) * this.xy
            this.y = M.Lerp(this.y, this.eY, this.s) * this.xy
            M.T(this.el, this.x, this.y, 'px')
        }

        update(e) {
            this.eX = e.clientX - this.Ox - this.w / 2
            this.eY = e.clientY - this.Oy - this.h / 2
        }

        on() {
            this.el.style.setProperty('transition', '1s ease')

            this.enter()
            this.move()
            this.leave()
        }


        move() {
            M.E(this.el, 'mousemove', this.update)
        }

        enter() {
            M.E(this.el, 'mouseenter', (e) => {
                this.r.run()
                let t = _M
                this.Ox = M.XY.offsetLeft(this.el)
                this.Oy = M.XY.offsetTop(this.el) - t.scroll.y
                this.w = this.el.offsetWidth
                this.h = this.el.offsetHeight
                this.eX = e.clientX - this.Ox - this.w / 2
                this.eY = e.clientY - this.Oy - this.h / 2
            })
        }

        leave() {
            M.E(this.el, 'mouseleave', () => {
                M.T(this.el, 0, 0, 'px')
                this.r.stop()

            })
        }
    }

    let _d = [
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
        _c = [
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
                inactive: {p: {opacity: [1, 0]}, d: 900},
                init: {p: {opacity: [0, 0]}}
            }
        ],
        _t = [
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
        ]
    M.E(window, 'load', () => {
        new t
        new i
        new m
        new c
        new s_scroll({speed: 0.5})
        new mo(_d)

    })
    console.log('\n %c Made with ❤️ by La2spaille  %c \n ', 'border: 1px solid #000;color: #fff; background: #000; padding:5px 0;', '')
}()

