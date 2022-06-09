window._M = {}
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
       this.arr.forEach(el=> {
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

!function () {
    "use strict"

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
            if (t.scroll.deltaX !== 0 || t.scroll.deltaY !== 0) {
                this.update(e)
            }
        }

        init() {
            const t = _M
            let s = M.Select("#main").children, n = s.length
            this.max = 0
            for (let i = 0; i < n; i++)
                this.max += s[i].offsetHeight;
            this.max -= innerHeight
            t.scroll.y = M.Clamp(t.scroll.y, 0, this.max)
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
            M.Ael(document, "vScroll", () => {
                if (this.r.on === false) this.r.run()
            })

        }
    }

    new s_scroll({speed: 0.5})

    class load {
        constructor() {
            this.els = M.Select('.w-load').children
            this.txt = M.Select('.load-text').children
            this.line = M.Select('.load-line')
            M.Bt(this, ["mo_txt", "mo_div", "tl", "cla"])
            this.on()
        }

        cla(el) {
            el.classList.add('to')
        }

        clr(el) {
            el.classList.remove('from')
        }

        tl() {
            let tl = new M.Delay(2000, () => {
                let f0 = new M.Delay(700, this.mo_txt),
                    f1 = new M.Delay(1100, this.mo_div)
                f0.run()
                f1.run()
            })
            tl.run()
        }

        init() {
            let f0 = new M.Delay(0, () => {
                    this.clr(this.line)
                }),
                f1 = new M.Delay(800, () => {
                    this.cla(this.line)
                }),
                f2 = new M.Delay(1450, () => {
                    let a_txt = this.txt, n_txt = a_txt.length - 1
                    for (let i = 0; i < n_txt; i++) {
                        this.clr(a_txt[i].children[0])
                    }
                })
            f0.run()
            f1.run()
            f2.run()
        }

        mo_txt() {
            let a = this.txt, n = a.length - 1
            for (let i = 0; i < n; i++) {
                let f = new M.Delay(0, () => this.cla(a[i].children[0]))
                f.run()
            }
        }

        mo_div() {
            let a = this.els, n = a.length
            for (let i = 0; i < n; i++) {
                let d = i + 1, f = new M.Delay(700 * d / n, () => this.cla(a[i]))
                f.run()
            }
        }

        on() {
            this.init()
            M.Ael(window, "load", this.tl)
        }
    }

    new load()

    class gl {
        constructor() {
            this.c = M.Select('#gl')
            this.gl = this.c.getContext('webgl')
            this.w = innerWidth
            this.h = innerHeight
            this.clipSpace = this.set_vertices(4, 0, 0, this.w, this.h)
            this.matrix_loc = {T: {}, R: {}, S: {}, V: {}}
            M.Bt(this, ['render'])
            this.r = new M.Raf(this.render)
            this.init()
            this.engine()
        }

        init() {
            this.c.width = innerWidth
            this.c.height = innerHeight
        }

        main() {
            const gl = this.gl
            let vertex_s = `
            attribute vec2 xy;
            attribute vec2 xyTex;
            varying vec2 texcoords;
            
            uniform float t;
            
            uniform mat4 T_matrix;
            uniform mat4 R_matrix;
            uniform mat4 S_matrix;
            uniform mat4 V_matrix;
            void main(){
            
               float T = 1.25;
               float w = 2.0 * 3.14 / T;
               float theta = w * (t + (xy.y / 3.5) - xy.x / 1.5 );
               float a = 0.065 * (0.7320644216691069 - xy.y);
               float oscillation = a * sin(theta);
               
               mat4 matrix = V_matrix * T_matrix * R_matrix * S_matrix;
               gl_Position = matrix * vec4(xy,oscillation, 1.0);
               
               texcoords = xyTex * 0.5 + 0.5;
            }
            `,
                fragment_s = `
            precision mediump float;
            varying vec2 texcoords;
            uniform sampler2D texture;
            void main(){
               gl_FragColor = texture2D(texture, texcoords);
            }
            `
            /* ----------- */
            vertex_s = this.compile_shader(vertex_s, gl.VERTEX_SHADER)
            fragment_s = this.compile_shader(fragment_s, gl.FRAGMENT_SHADER)
            /* ----------- */
            let p = this.create_program(vertex_s, fragment_s),
                xy_loc = gl.getAttribLocation(p, "xy"),
                xyTex_loc = gl.getAttribLocation(p, "xyTex"),
                M = ['T', 'R', 'S', 'V'], n = M.length
            for (let i = 0; i < n; i++) {
                this.matrix_loc[M[i]] = gl.getUniformLocation(p, M[i] + "_matrix")
            }
            this.time_loc = gl.getUniformLocation(p, "t")
            /* ----------- */
            let img = new Image()
            img.src = `${location}fav/twitter.jpg`
            img.onload = () => {
                this.texture(img)
                /* ----------- */
                let vertices = this.set_vertices(4, this.w / 2 - 200, this.h / 2 - 250, img.width / 5, img.height / 5)
                this.COUNT = vertices.length * 0.5
                /* ----------- */
                let xy_buffer = gl.createBuffer()
                gl.bindBuffer(gl.ARRAY_BUFFER, xy_buffer)
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
                /* ----------- */
                let xyTex_buffer = gl.createBuffer()
                gl.bindBuffer(gl.ARRAY_BUFFER, xyTex_buffer)
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.clipSpace), gl.STATIC_DRAW)
                /* ----------- */
                gl.useProgram(p)
                /* ----------- */
                gl.enableVertexAttribArray(xy_loc)
                gl.bindBuffer(gl.ARRAY_BUFFER, xy_buffer)
                gl.vertexAttribPointer(xy_loc, 2, gl.FLOAT, false, 0, 0)
                /* ----------- */
                gl.enableVertexAttribArray(xyTex_loc)
                gl.bindBuffer(gl.ARRAY_BUFFER, xyTex_buffer)
                gl.vertexAttribPointer(xyTex_loc, 2, gl.FLOAT, false, 0, 0)
                /* ----------- */
                this.r.run()
            }

        }

        render(t) {
            let gl = this.gl,
                s = 1
            /* ----------- */
            gl.uniform1f(this.time_loc, t * 0.001);
            /* ----------- */
            let T_matrix = this._T(0, 0, -Math.tan(Math.PI / 3)),
                R_matrix = this._R(0, 0),
                S_matrix = this._S(s, s, 1),
                V_matrix = this._V(60, 1, 1, 2000)
            /* ----------- */
            gl.uniformMatrix4fv(this.matrix_loc.T, false, T_matrix)
            gl.uniformMatrix4fv(this.matrix_loc.R, false, R_matrix)
            gl.uniformMatrix4fv(this.matrix_loc.S, false, S_matrix)
            gl.uniformMatrix4fv(this.matrix_loc.V, false, V_matrix)
            /* ----------- */
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.COUNT)
        }

        texture(img) {
            const gl = this.gl
            let texture = gl.createTexture()
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
        }

        set_matrix(gl) {
            let _2gl = gl * 2
        }

        engine() {
            this.main()
        }

        compile_shader(s_source, s_type) {
            const gl = this.gl
            let s = gl.createShader(s_type)
            gl.shaderSource(s, s_source)
            gl.compileShader(s)
            let test = gl.getShaderParameter(s, gl.COMPILE_STATUS)
            if (!test) {
                throw "not compile" + gl.getShaderInfoLog(s)
            }
            return s
        }

        create_program(vertex_s, fragment_s) {
            const gl = this.gl
            let p = gl.createProgram()
            gl.attachShader(p, vertex_s)
            gl.attachShader(p, fragment_s)
            gl.linkProgram(p)
            let test = gl.getProgramParameter(p, gl.LINK_STATUS)
            if (!test) {
                throw "not link" + gl.getShaderInfoLog(p)
            }
            return p
        }

        set_vertices(n, x, y, w, h) {
            let vertices = [],
                _n = 2 ** n,
                _f = 2 / _n
            x = -1 + 2 * x / this.w
            y = 1 - 2 * y / this.h
            w = w / this.w
            h = -h / this.h
            for (let i = _n; i > 0; i--) {
                for (let j = 0; j <= _n; j++) {
                    let xy = [
                        x + j * w * _f, y + i * h * _f,
                        x + j * w * _f, y + (i - 1) * h * _f,
                    ]
                    for (const pts of xy) {
                        vertices.push(pts)
                    }
                }
                for (let j = _n - 1; j > 0; j--) {
                    let xy = [
                        x + j * w * _f, y + (i - 1) * h * _f,
                        x + j * w * _f, y + (i - 1) * h * _f,
                    ]
                    for (const pts of xy) {
                        vertices.push(pts)
                    }
                }
            }
            return vertices
        }

        _T(tx, ty, tz) {
            return [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                tx, ty, tz, 1,
            ]
        }

        _R(aX, aY) {
            aX = aX * Math.PI / 180
            aY = aY * Math.PI / 180
            let cX = Math.cos(aX),
                sX = Math.sin(aX),
                cY = Math.cos(aY),
                sY = Math.sin(aY)

            return [
                cY, 0, -sY, 0,
                sX * sY, cX, sX * cY, 0,
                cX * sY, -sX, cX * cY, 0,
                0, 0, 0, 1,
            ]
        }

        _S(sx, sy, sz) {
            return [
                sx, 0, 0, 0,
                0, sy, 0, 0,
                0, 0, sz, 0,
                0, 0, 0, 1,
            ]
        }

        _V(fieldOfView, aspect, near, far) {
            let f = Math.tan(Math.PI * 0.5 - 0.5 * (fieldOfView * Math.PI / 180));
            let rangeInv = 1.0 / (near - far);
            return [
                f / aspect, 0, 0, 0,
                0, f, 0, 0,
                0, 0, (near + far) * rangeInv, -1,
                0, 0, near * far * rangeInv * 2, 0
            ];
        }
    }

    new gl()
    let Tl = new M.TL()
    Tl
        .add({el: "#test", d: 1500, p: {opacity: [0.5, 1], y: [0, 50]}, delay: 2000, e: 'linear'})
        .add({el: "#test", d: 1500, p: {opacity: [0.5, 1], y: [0, 150]}, delay: 2000, e: 'linear'})

    Tl.play()
    console.log('\n %c Made with ❤️ by La2spaille  %c \n ', 'border: 1px solid #000;color: #fff; background: #000; padding:5px 0;', '')
}()

