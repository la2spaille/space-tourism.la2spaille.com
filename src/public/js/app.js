window._M = {
    delay: 500
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
    imgLoad: t => t.complete === true, // A gérer avec un RAF
    interval: (t, inf, sup) => t >= inf && t <= sup
}
M.Ease = {
    linear: t => t,
    o2: t => t * (2 - t)
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
M.Clamp = (t, inf, sup) => Math.max(inf, Math.min(sup, t))
M.Lerp = (s, e, a) => s * (1 - a) + a * e
M.iLerp = (s, e, a) => s * (1 - a) + a * e // on clamp puis on lerp
M.Has = (t, r) => t.hasOwnProperty(r)
M.n = (arr1, arr2) => arr1.filter(val => -1 !== arr2.indexOf(val))
M.Rand = (a, b) => Math.random() * (b - a) + a

M.Fetch = r => {

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
    let s = el.substring(1), c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el)
    return c.length === 1 ? c[0] : c
}
M.Qs = el => {
    let c = el.split('.'), s = new Array(2)
    for (let i = 1; i < c.length; i++) {
        s[i - 1] = M.G.class(el[i])
    }
    M.n(s[0], s[1])
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
M.R = (t, r) => {
    r = M.Is.und(r) ? 100 : 10 ** r
    return Math.round(t * r) / r
}
M.Ael = (el, e, cb) => {
    let a = M.Select(el), s = M.Is.arr(a) ? a : [a], n = s.length
    for (let i = 0; i < n; i++) {
        s[i]["addEventListener"](e, cb)
    }
}
M.De = (fr, to, nev, cev) => {
    let a = nev, s = M.Is.arr(a) ? a : [a], n = s.length, cE = new CustomEvent(cev)
    let de = () => {
        to["dispatchEvent"](cE)
    }
    for (let i = 0; i < n; i++) {
        M.Ael(fr, s[i], de)
    }
}
M.Gl = {}
M.Cl = (el, action, css) => {
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


    class c {
        constructor() {
            this.el = M.G.id('cursor')
            this.ux = [
                {el:".w-home-cta",css:"site-cursor--explore-hover"},
                {el:".link-hover",css:"site-cursor--link-hover"}
            ]
            this.h = this.el.offsetHeight / 2
            this.w = this.el.offsetWidth / 2
            this.speed = 0.1
            this.eX = this.eY = this.x = this.y = 0

            M.Bt(this, ["loop", "update","toggle"])
            this.r = new M.Raf(this.loop)
            this.on()

        }

        loop() {
            this.x = M.Lerp(this.x, this.eX, this.speed)
            this.y = M.Lerp(this.y, this.eY, this.speed)
            M.T(this.el, this.x, this.y, 'px')
        }

        update(e) {
            this.eX = e.pageX - this.w
            this.eY = e.pageY - this.h
        }

        on() {
            M.Ael(document, "mousemove", this.update)
            this.hover()
            this.r.run()
        }
        toggle(a,css) {
            M.Cl(this.el,a,css)
        }
        hover() {
            let a= this.ux,n = a.length
            for(let i =0 ;i<n;i++ ) {
                M.Ael(a[i].el,"mouseenter",()=>this.toggle('a',a[i].css))
                M.Ael(a[i].el,"mouseleave",()=>this.toggle('r',a[i].css))
            }
                // if (this.techCTA.length !== 0) {
                //     this.techCTA.forEach(link => {
                //         link.addEventListener('mouseenter', () => {
                //             this.cursor.classList.add('site-cursor--tech-hover')
                //         })
                //         link.addEventListener('mouseleave', () => {
                //             this.cursor.classList.remove('site-cursor--tech-hover')
                //         })
                //     })
                // }
        }
    }

    new c

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
            this.max = this.scrollV = 0
            this.tsX = this.tsY = null
            M.Bt(this, ["w", "key", "loop", "tS", "tM"])
            M.De(window, document, ["wheel", "keydown", "touchmove"], "vScroll")
            this.r = new M.Raf(this.loop)
            this.on()
        }

        update(e) {
            this.init()
            const t = _M
            t.scroll.x += t.scroll.deltaX
            t.scroll.y += t.scroll.deltaY
            t.scroll.originalEvent = e
        }

        loop() {
            const t = _M
            t.scroll.y = M.Clamp(t.scroll.y, 0, this.max)
            let y = t.scroll.y
            this.scrollV = M.Lerp(this.scrollV, y, 0.1)
            M.T(this.el, 0, -this.scrollV, 'px')
            if (this.r.on === true && M.Is.interval(this.scrollV - y, -0.01, 0.01)) {
                this.r.stop()
            }
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
            let key = [{c: 37, d: 'x', s: -1}, {c: 39, d: 'x', s: 1}, {c: 38, d: 'y', s: -1}, {
                    c: 40,
                    d: 'y',
                    s: 1
                }, {c: 32, d: 'y', s: 2}],
                n = key.length
            for (let i = 0; i < n; i++) {
                if (e.keyCode === key[i].c) {
                    t.scroll[key[i].d === "x" ? "deltaX" : "deltaY"] = this.options.kS * key[i].s
                }
            }
            if (t.scroll.deltaX  || t.scroll.deltaY ) {
                this.update(e)
            }
        }
        init() {
            let s = M.Select(".page")
            this.max = 0
            this.max += s.offsetHeight
            this.max -= innerHeight
        }

        on() {
            this.init()
            M.Ael(window, "resize", this.init)
            M.Ael(window, "orientationchange", this.init)
            //______________________________________________
            M.Ael(document, "wheel", this.w)
            M.Ael(document, "keydown", this.key)
            M.Ael(document, "touchstart", this.tS)
            M.Ael(document, "touchmove", this.tM)
            M.Ael(document, "vScroll", () =>this.r.on || this.r.run())

        }
    }

    new s_scroll({speed: 0.5})

    M.Ael(window, 'load', () => {
        new i
    })
    console.log('\n %c Made with ❤️ by La2spaille  %c \n ', 'border: 1px solid #000;color: #fff; background: #000; padding:5px 0;', '')
}()

