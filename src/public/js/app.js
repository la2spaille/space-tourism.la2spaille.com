'use strict';

window.M = {};

M.Is = {
    def: t => t !== undefined,
    und: t => t === undefined,
    null: t => t === null,
    str: t => typeof t == "string",
    obj: t => t === Object(t),
    arr: t => t.constructor === Array,
    img: t => t.tagName === "IMG",
    imgLoad: t => t.complete === true, // A gérer avec un RAF
    interval: (t, inf, sup) => t >= inf && t <= sup
};
M.Ease = {
    linear: t => t,
    cb: t => t ** 3 - 3 * t ** 2 + 3 * t,
    o1: t => Math.sin(t * (Math.PI / 2)),
    io2: t => t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1,
    o3: t => (--t) * t * t + 1,
    i3: t => t * t * t,
    io3: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    o5: t => 1 + --t * t * t * t * t,
    o6: t => 1 === t ? 1 : 1 - 2**( - 10 * t),
    io6: t => {
        if (t === 0) return 0
        if (t === 1) return 1
        if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1))
        return 0.5 * (-Math.pow(2, -10 * --t) + 2)
    }
    
};
M.XY = {
    accX: 0, accY: 0,
    offsetTop: function (el) {
        this.accY = 0;
        if (el.offsetParent) {
            this.accY = this.offsetTop(el.offsetParent);
        }
        return el.offsetTop + this.accY
    },
    offsetLeft: function (el) {
        this.accX = 0;
        if (el.offsetParent) {
            this.accX = this.offsetLeft(el.offsetParent);
        }
        return el.offsetLeft + this.accX
    },
    Cx: function (el) {
        return this.offsetLeft(el) + el.offsetWidth / 2
    },
    Cy: function (el) {
        return this.offsetTop(el) + el.offsetHeight / 2
    },
    T: el => {
        const t = el.style.getPropertyValue('transform');
        const matches = t.split('(')[1].replace(')', '').split(',').map((val) => parseFloat(val.trim().replace('px', '')));


        return {
            x: matches[0],
            y: matches[1]
        }
    },

    Tx: function (el) {

        return this.T(el).x

    },

    Ty: function (el) {
        return this.T(el).y
    }
};
M.G = {
    root: r => M.Is.def(r) ? r : document,
    s: (r, t, el) => {
        const l = M.G.root(r)["getElement" + t](el);
        return t === "ById" ? l : Array.from(l)
    },
    id: (el, r) => M.G.s(r, "ById", el),
    class: (el, r) => M.G.s(r, "sByClassName", el),
    tag: (el, r) => M.G.s(r, "sByTagName", el),
    attr: el => Array.from(document.querySelectorAll(el))
};
M.Pe = {
    f: (t, r) => {
        M.Select(t).style.pointerEvents = r;
    }, all: t => {
        M.Pe.f(t, "all");
    }, none: t => {
        M.Pe.f(t, "none");
    }
};
M.Index = (el, arr) => {
    const n = M.L(arr);
    for (let i = 0; i < n; i++)
        if (el === arr[i])
            return i;
    return -1
};
M.Clamp = (t, inf, sup) => Math.max(inf, Math.min(sup, t));
M.Lerp = (s, e, a) => s * (1 - a) + a * e;
M.Has = (t, r) => Object.prototype.hasOwnProperty.call(t, r);
M.Rand = (a, b) => Math.random() * (b - a) + a;
M.Fetch = o => {
    let t = o.type === "json";
    const s = t ? "json" : "text"
        , p = {
        method: o.method,
        headers: new Headers({
            "Content-type": t ? "application/x-www-form-urlencoded" : "text/html"
        }),
        mode: "same-origin"
    };
    t && (p.body = o.body);
    fetch(o.url, p)
        .then(r => {
            if (r.ok) return r[s]()
        })
        .then(r => {
            o.success(r);
        });
};
M.PD = t => {
    t.cancelable && t.preventDefault();
};
M.Bind = (t, f) => {
    f.forEach(T => {
        t[T] = t[T].bind(t);
    });
};
M.Select = el => {
    if (!M.Is.str(el)) return el
    let s = el.substring(1),
        c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el);
    if (M.Is.null(c)) return
    c = M.Is.arr(c) ? c : [c];
    return c[0]
};
M.SelectAll = el => {
    if (!M.Is.str(el)) {
        if (M.Is.arr(el)) {
            return el
        } else {
            return [el]
        }
    }
    let s = el.substring(1),
        c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el);
    if (M.Is.null(c)) return
    return M.Is.arr(c) ? c : [c]
};
M.Ga = (t, r) => t.getAttribute(r);
M.T = (t, x, y, u) => {
    t = M.Select(t);
    if (M.Is.und(t)) return
    u = M.Is.und(u) ? "%" : u;
    const xyz = "translate3d(" + x + u + "," + y + u + ",0)";
    let s = t.style;
    s['transform'] = xyz;
    s['mozTransform'] = xyz;
    s['msTransform'] = xyz;
};
M.O = (t, r) => {
    t = M.Select(t);
    t.style.opacity = r;
};
M.D = (t, r) => {
    r = r === 'n' ? 'none' : r === 'f' ? 'flex' : 'block';
    let s = M.Select(t).style;
    s['display'] = r;
};
M.S = (t, p, r) => {
    let s = M.Select(t).style;
    s[p] = r;

};
M.R = (t, r) => {
    r = M.Is.und(r) ? 100 : 10 ** r;
    return Math.round(t * r) / r
};
M.E = (el, e, cb, o, opt) => {
    const s = M.SelectAll(el);
    o = o === 'r' ? 'remove' : 'add';
    s.forEach(T => {
        T[o + "EventListener"](e, cb, opt);
    });
};
M.L = t => t.length;
M.De = (t, s) => {
    const cE = new CustomEvent(s);
    t.dispatchEvent(cE);
};
M.Cl = (el, action, css) => {
    if (M.Is.und(el)) return
    const s = M.SelectAll(el);
    action = action === 'a' ? 'add' : action === 'r' ? 'remove' : 'toggle';
    s.forEach(T => {
        T.classList[action](css);
    });
};
M.Cr = el => document.createElement(el);
M.Tg = (t, i = false) => i ? t.currentTarget : t.target;
M.Pn = t => t.parentNode;
M.C = t => Array.from(M.Select(t).children);
M.Sp = t => t.stopPropagation();
M.In = t => location.href.includes(t);
M.__ = (p, v, t) => {
    const el = t ? M.Select(t) : M.Dom.root;
    el.style.setProperty(p, v);
};
M.g__ = (p) => {
    let root = M.Dom.root,
        v = root.style.getPropertyValue(p);
    return parseFloat(v.split('px')[0])
};

M.GBCR = (el, p) => {
    const r = M.Select(el).getBoundingClientRect();
    return p ? r[p] : r
};

M.Mo = class {
    constructor(o) {
        M.Bind(this, ['run', 'rRaf', 'uProp']);
        this.r = new M.RafR(this.run);
        this.o = this.init(o);
    }

    init(o) {
        let i = {
            el: o.el ? M.SelectAll(o.el) : [],
            d: {
                origin: o.d || 0,
                curr: 0
            },
            delay: o.delay || 0,
            cb: o.cb || !1,
            a: o.a || !1,
            i: o.i || !1,
            r: o.r || 2,
            e: {
                curve: o.e || "linear"
            },
            prog: 0,
            progE: 0,
            elapsed: 0
        };
        i.i && i.i();
        i.el = M.Is.arr(i.el) ? i.el : [i.el];
        i.elL = i.el.length;
        i.up = M.Has(o, 'update') ? t => o.update(i) : this.uProp;
        let p = o.p || !1;
        if (p) {
            i.prop = {};
            i.propLi = [];
            let k = Object.keys(p);
            i.propL = k.length;
            let n = i.propL;
            for (; n--;) {
                const c = k[n];
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
                };
                if (M.L(c) < 4) {
                    i.propLi[c] = n;

                } else {
                    i.propLi[c.charAt(0)] = n;

                }
            }

        }
        return i
    }

    uProp() {
        const p = this.o.prop;
        let li = this.o.propLi;
        let n = this.o.propL;
        for (; n--;) {
            let ob = p[n];


            ob.curr = this.lerp(ob.start, ob.end);

            let x = M.Has(li, 'x') ? p[li.x].curr + p[li.x].unit : 0,
                y = M.Has(li, 'y') ? p[li.y].curr + p[li.y].unit : 0,
                r = M.Has(li, 'r') ? 'rotate(' + p[li.r].curr + 'deg)' : 0,
                sX = M.Has(li, 'sX') ? 'scaleX(' + p[li.sX].curr + ')' : 0,
                sY = M.Has(li, 'sY') ? 'scaleY(' + p[li.sY].curr + ')' : 0,
                s = M.Has(li, 's') ? 'scale(' + p[li.s].curr + ')' : 0,
                xy = x + y === 0 ? 0 : 'translate3d(' + x + ',' + y + ', 0)';
            var t = xy + r + sX + sY + s === 0 ? 0 : [xy, r, sX, sY, s].filter(t => t !== 0).join(" "),
                o = M.Has(li, 'o') ? p[li.o].curr : -1,
                g = M.Has(li, 'g') ? 'grayscale(' + p[li.g].curr + ')' : -1;
        }
        n = this.o.elL;
        for (; n-- && M.Is.def(this.o.el[n]);) {
            t !== 0 && (this.o.el[n].style.transform = t);
            o >= 0 && (this.o.el[n].style.opacity = o);
            g !== 0 && (this.o.el[n].style.filter = g);
        }
    }

    run(t) {
        if (this.o.prog === 1) {
            this.pause();
            this.o.up();
            this.o.cb && this.o.cb();
        } else {
            this.o.elapsed = M.Clamp(t, 0, this.o.d.curr);
            this.o.prog = M.Clamp(this.o.elapsed / this.o.d.curr, 0, 1);
            this.o.progE = this.o.e.calc(this.o.prog);
            this.o.a && this.o.a(this.o.progE);
            this.o.up();
        }
    }

    update(o) {
        let t = o || {},
            s = M.Has(t, 'reverse') ? "start" : "end";
        if (M.Has(this.o, 'prop')) {
            let n = this.o.propL;
            for (; n--;) {
                let p = this.o.prop[n];
                p.end = p.origin[s];
                p.start = p.curr;
            }
        }
        this.o.d.curr = t.d ? t.d : M.R(this.o.d.origin - this.o.d.curr + this.o.elapsed);
        this.o.e.curve = t.e || this.o.e.curve;
        this.o.e.calc = M.Ease[this.o.e.curve];
        this.o.delay = (M.Has(t, 'delay') ? t : this.o).delay;
        this.o.cb = (M.Has(t, 'cb') ? t : this.o).cb;
        this.o.prog = this.progE = this.o.d.curr === 0 ? 1 : 0;
        this.delay = new M.Delay(this.o.delay, this.rRaf);
    }

    rRaf() {
        this.r.run();
    }

    play(t) {
        this.pause();
        this.update(t);
        this.delay.run();
    }

    pause() {
        this.r.stop();
        this.delay && this.delay.stop();
    }

    lerp(s, e) {
        return M.R(M.Lerp(s, e, this.o.progE), this.o.r)
    }
};
M.TL = class {
    constructor() {
        this.arr = [];
        this.delay = 0;
    }

    add(o) {
        this.delay += M.Has(o, "delay") ? o.delay : 0;
        o.delay = this.delay;
        this.arr.push(new M.Mo(o));
        return this
    }

    play(t) {
        this.arr.forEach(el => {
            el.play();
        });
    }
};
M.Tab = class {

    constructor() {
        this.arr = [];
        this.pause = 0;

        M.Bind(this, ['v']);

        M.E(document, 'visibilitychange', this.v, 'a');
    }

    add(o) {
        this.arr.push(o);
    }

    v() {
        const now = performance.now();
        let elapsed;
        let type;

        if (document.hidden) {
            this.pause = now;
            type = 'stop';
        } else {
            elapsed = now - this.pause;
            type = 'start';
        }

        const l = this.l();
        for (let i = l; i >= 0; i--) {
            this.arr[i][type](elapsed);
        }
    }

    l() {
        return this.arr.length - 1
    }

};
M.Raf = class {
    static Tab = new M.Tab

    constructor() {
        M.Bind(this, ['loop', 'tOff', 'tOn']);
        this.arr = [];
        this.pause = 0;
        this.on = true;

        M.Raf.Tab.add({stop: this.tOff, start: this.tOn});

        this.raf();
    }

    tOff() {
        this.on = false;
    }

    tOn(e) {
        const l = this.l();
        for (let i = l; i >= 0; i--) {
            this.arr[i].sT += e;
        }
        this.on = true;
    }

    add(o) {
        this.arr.push(o);
    }

    remove(id) {
        const l = this.l();
        for (let i = l; i >= 0; i--) {
            if (this.arr[i].id === id) {
                this.arr.splice(i, 1);
                return
            }
        }
    }

    loop(t) {
        if (this.on) {
            const l = this.l();
            for (let i = l; i >= 0; i--) {
                const arr = this.arr[i];
                if (!arr.sT)
                    arr.sT = t;
                const elapsed = t - arr.sT;
                arr.cb(elapsed);
            }
        }
        this.raf();
    }

    raf() {
        requestAnimationFrame(this.loop);
    }

    l() {
        return this.arr.length - 1
    }
};

M.RafR = class {
    static Raf = new M.Raf
    static id = 0

    constructor(cb) {

        M.Bind(this, ['run', 'stop']);
        this.cb = cb;
        this.id = M.RafR.id;
        this.on = !1;
        M.RafR.id++;
    }

    run() {
        if (!this.on) {
            M.RafR.Raf.add({id: this.id, cb: this.cb});
            this.on = true;
        }
    }

    stop() {
        if (this.on) {
            M.RafR.Raf.remove(this.id);
            this.on = false;
        }
    }

};


M.Throttle = class {

    constructor(o) {
        this.del = o.delay;
        this.onlyAtEnd = o.onlyAtEnd;
        this.cb = o.cb;
        this.last = 0;
        this.t = 0;
    }

    run() {
        let firstTime = true;
        const now = Date.now();
        if ((this.last && now < this.last + this.del) || firstTime) {
            firstTime = false;
            clearTimeout(this.t);
            this.t = setTimeout(_ => {
                this.last = now;
                this.cb();
            }, this.del);
        } else {
            this.last = now;
            if (!this.onlyAtEnd) {
                firstTime = false;
                this.cb();
            }
        }
    }

};
M.RO = class {

    constructor(o) {
        this.E = D.isM ? 'orientationchange' : 'resize';
        this.tick = false;
        this.arr = [];

        M.Bind(this, ['fn', 'gRaf', 'run']);

        this.t = new M.Throttle({
            delay: 100,
            onlyAtEnd: true,
            cb: this.gRaf
        });
        this.raf = new M.RafR(this.run);

        M.E(window, this.E, this.fn, 'a');
    }

    add(o) {
        this.arr.push(o);
    }

    remove(id) {
        const l = this.l();
        for (let i = l; i >= 0; i--) {
            if (this.arr[i].id === id) {
                this.arr.splice(i, 1);
                return
            }
        }
    }

    fn(e) {
        this.e = e;
        this.t.run();
    }

    gRaf() {
        if (!this.tick) {
            this.tick = true;
            this.raf.run();
        }
    }

    run() {
        const l = this.l();
        for (let i = l; i >= 0; i--) {
            this.arr[i].cb(this.e);
        }

        this.raf.stop();
        this.tick = false;
    }

    l() {
        return this.arr.length - 1
    }

};
M.ROR = class {

    static Ro = new M.RO()
    static RoId = 0

    constructor(c) {
        this.cb = c;

        this.id = M.ROR.RoId;
        M.ROR.RoId++;
    }

    on() {
        M.ROR.Ro.add({id: this.id, cb: this.cb});
    }

    off() {
        M.ROR.Ro.remove(this.id);
    }

};

M.Delay = class {
    constructor(d, cb) {
        M.Bind(this, ["loop"]);
        this.d = d;
        this.cb = cb;
        this.r = new M.RafR(this.loop);
    }

    run() {
        this.d === 0 ? this.cb() : this.r.run();
    }

    stop() {
        this.r.stop();
    }

    loop(e) {
        let t = M.Clamp(e, 0, this.d);
        if (t === this.d) {
            this.stop();
            this.cb();
        }
    }
};
M.Scope = class {
    constructor(el, r, o) {
        M.Bind(this, ['cb']);
        this.el = M.Select(el);
        this.r = r;
        this.o = o;
    }

    e(a) {
        M.E(document, 'scroll', this.cb, a);
        M.E(window, 'load', this.cb, a);
    }

    observe() {
        this.e('a');

    }

    unobserve() {
        this.e('r');

    }

    visible() {
        const r = this.r, h = this.el.offsetHeight;
        let t = this.el.getBoundingClientRect().top,
            b = this.el.getBoundingClientRect().bottom,
            vH = (innerHeight - t) / h;

        return (vH > r) && (b > 0);

    }


    cb() {
        if (this.visible()) {
            this.o.css && this.cl();
            this.o.cb && this.o.cb();
            this.unobserve();
        }
    }

    cl() {
        this.o.css && M.Cl(this.el, 'r', this.o.css);
    }
};
M.sLetter = (s) => {
    M.SelectAll(s).forEach(el => {
        const chars = [...el.textContent];
        el.innerHTML = "";
        chars.forEach((char) => {
            const span = M.Cr("span");
            span.textContent = char;
            el.append(span);
        });
    });
};

M.SLine = class {
    constructor(el, css) {
        this.el = M.Select(el);
        this.c = css;
        this.w = [];
        this.init();
    }

    init() {
        const l = this.el.childNodes;
        l.forEach(n => {
            if (n.nodeType === 3) {
                const words = n.nodeValue.trim().split(' ');
                words.forEach(word => {
                    this.w.push({
                        type: 'txt',
                        n: word
                    });
                });
            } else {
                this.w.push({
                    type: 'a',
                    n: n.outerHTML
                });
            }
        });
        this.resize();

    }

    resize() {
        const w = this.el.offsetWidth;
        let d = M.Cr('div'),
            s = d.style,
            css = (s.visibility = 'hidden', s.position = 'absolute', s.whiteSpace = 'nowrap', getComputedStyle(this.el));
        s.fontFamily = this.gPV(css, 'font-family');
        s.fontSize = this.gPV(css, 'font-size');
        s.fontWeight = this.gPV(css, 'font-weight');
        s.letterSpacing = this.gPV(css, 'letter-spacing');
        M.Dom.body.prepend(d);
        let r = 0, l = [], i = '';
        l[r] = [];

        this.w.forEach(({type, n}, i) => {
            l[r].push(n);
            d.innerHTML = l[r].join(' ');
            if (d.offsetWidth >= w) {
                l[r].pop();
                l[r] = l[r].join(' ').trim();
                l[r] = l[r].replaceAll(/(\s+)(?=,)/g, '&ensp;');

                r++;
                l[r] = [];
                l[r].push(n);

            }
        });
        l[r] = l[r].join(' ').trim();
        l[r] = l[r].replaceAll(/(\s+)(?=,)/g, '&ensp;');
        const b = `<span class="f-hidden"><span class="m-line ${this.c}">`,
            e = '</span></span>';
        l.forEach(r => {
            i += b + r + e;
        });

        d.parentNode.removeChild(d);
        this.el.innerHTML = i;
    }

    gPV(s, p) {
        return s.getPropertyValue(p)
    }
};
M.Dom = {
    html: document.documentElement,
    body: document.body,
    root: document.documentElement,
    nav: M.Select('#nav')
};

window.W = {};

W = class {
    static get w() {
        return innerWidth
    }

    static get hW() {
        return innerWidth / 2
    }

    static get h() {
        return innerHeight
    }

    static get hH() {
        return innerHeight / 2
    }
};

Math.radToDeg = (r) => {
    return r * 180 / Math.PI;
};

Math.degToRad = (d) => {
    return d * Math.PI / 180;
};
!function () {

    class m {
        constructor(m) {
            this.m = m;
            this.run();
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
            });
            Promise.all(p)
                .then(() => {
                    M.De(document, 'load');
                })
                .catch((error) => {
                    M.De(document, 'load');
                });

        }

    }

    // Introduction / Outroduction
    class io {
        constructor() {
            M.Bind(this, ['intro', 'index']);
            this.l = new l();
            this.plug();


        }

        plug() {

        }

        init() {
            B.e.s.init();
            C.hasIntro() || M.O('#main', 0);
            C.on();

        }

        index() {
            this.init();
            this.l.init();
            this.l.intro();




        }

        intro(d=0) {
            let TL = new M.TL();
            if (!C.hasIntro()) {
                TL.add({
                    el: '#main',
                    p: { o: [0, 1] },
                    d: 700,
                    o: 'o3',
                    delay: d,

                });
            } else {
                const d = 1200;

                TL.add({
                    cb: () => {
                        C.intro(d);
                    }
                });
            }
            TL.add({
                cb: () => {
                    this.run();
                }
            });

            TL.play();
        }

        outro() {


        }


        run() {
            B.e.b.run();
        }

    }

    // Data
    class d {
        constructor(o) {
            this.data = o;
            this.media = [];

        }

        setMedia(o) {
            const k = Object.keys(o);
            for (let i = 0; i < M.L(k) - 2; i++) {
                this.media = [...this.media, ...o[k[i]]['media']];

            }

        }

        set(r, c) {

            B.config.routes = { ...B.config.routes, ...r };
            this.data = { ...this.data, ...c };
        }

        get() {
            let t = this.data[B.route.new.url];
            return M.Is.und(t) ? false : t
        }


    }

    // Transition
    class t {
        constructor() {
            M.Bind(this, ["update", "removeOld", "insertNew", "onPopstate"]);
            this.cache = '';
            this.o = null;
            this.s = {
                '_a': 'tA',
                '_p': 'tA',
            };
            this.init();
        }


        init() {
            const t = B;
            M.Fetch({
                url: origin + "/brain?xhr=true",
                type: "html",
                method: 'GET',
                success: r => {
                    r = JSON.parse(r);
                    const c = t.config;
                    const i = {
                        cache: {
                            title: document.title,
                            html: M.Select('#main').innerHTML
                        }
                    };
                    c.routes = { ...c.routes, ...r.routes };
                    this.d = new d({ ...r.cache, ...i.cache });
                    this.d.setMedia(this.d.data);
                    this.m = new m(this.d.media);
                    this.layer = M.Select('#main');
                }
            });
            this.run();
        }


        update(e) {
            M.PD(e);
            let tg = M.Tg(e, true),
                p = tg.pathname;
            this.o = tg.classList[0];
            p !== B.route.new.url && this.switch(p);
        }

        onPopstate() {
            let p = location.pathname;
            this.o = '_p';
            p !== B.route.new.url && this.switch(p, false);

        }

        switch(u, h = true) {
            const t = B;
            let p = t.config.routes[u];
            t.route.old = t.route.new;
            t.route.new = {
                url: u,
                page: p
            };
            B.e.n.on();
            h && history.pushState({ path: u }, '', u);
            h && t.was.push({
                ...t.route.old
            });
            this[this.s[this.o]]();


        }

        tA() {
            this.insertNew();

            const _old = this.layer.children[0],
                _new = this.layer.children[1],
                t = B.e.s;
            t.stop();
            let tl = new M.TL();
            tl
                .add({
                    el: _new,
                    p: { o: [0, 0] },
                    cb: () => {
                        B.e.io.init();

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
                        B.e.bg.outro();
                        C.off();
                        this.removeOld();
                    },
                    delay: 800
                })
                .add({
                    el: _new,
                    cb: () => {
                        B.e.bg.intro();
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
                        B.e.io.intro();
                    },
                    delay: 3000
                });
            tl.play();
        }

        insertNew() {
            const N = this.d.get();
            document.title = N.title;
            this.add(N.html);
            B.e.b.setSafePadding();
        }

        removeOld() {

            let O = this.layer.children;
            O[0].parentNode.removeChild(O[0]);
            this.e('r');
            this.run();
        }

        e(o) {
            M.E('._a', 'click', this.update, o);
            M.E('._h', 'click', this.update, o);
            M.E(window, 'popstate', this.onPopstate, o);
        }

        add(el) {
            this.layer.insertAdjacentHTML("beforeend", el);
        }

        run() {
            this.e('a');
        }
    }

    // Loader
    class l {
        constructor() {

        }


        init() {

            M.T('#nav', 0, -100);

        }

        intro() {
            const TL = new M.TL();
            TL.delay += 700;
            TL
                .add({
                    // el:'#loader',
                    // p:{o:[1,0]},
                    // d:700,
                    // e:'io6',
                    cb: () => {
                        M.Cl('#loader', 'a', 'dom-loaded');
                    }
                })

                .add({
                    delay: 1300,
                    cb: () => {
                        M.D('#loader', 'n');
                    }
                })
                .add({
                    delay: 300,
                    cb: () => {
                        B.e.bg.intro();
                    }
                })
                .add({
                    el: '#nav',
                    p: { y: [-100, 0] },
                    d: 1200,
                    e: 'o5',
                    delay: 2000,
                    cb: () => {
                        B.e.io.intro(1200);

                    }
                });

            TL.play();
        }


    }

    class C$Home {
        constructor() {
            this.isOn = false;
            this.hasIntro = false;

        }

        on() {
            !this.isOn && this.plug();
            this.init();
            this.isOn = true;
        }

        off() {
            this.isOn = false;
            this.p = null;

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
            this.isOn = false;
            this.hasIntro = true;


        }

        on() {
            !this.isOn && this.plug();
            this.init();
            this.isOn = true;
        }

        off() {
            this.isOn = false;

        }

        plug() {
            this.title = M.Select('.destination_title');
            this.arrTxt = [];
            const p = M.SelectAll('.m-destination-description');
            p.forEach((el, i) => {
                this.arrTxt.push(new M.SLine(el, 'm-line__p'));
            });
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
            ]);


        }


        init() {
            this.C.on();
            M.S(this.title, 'transform', 'translateY(125%) rotate(5deg)');
            M.O('.l-destination', 0);
        }

        intro(d) {
            let TL = new M.TL();
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
                        this.C.intro(16);
                    }
                });


            TL.play();



        }

        outro() {
            return 0


        }

        run() {

        }


    }

    class C$Crew {
        constructor() {
            this.isOn = false;
            this.hasIntro = true;


        }

        on() {
            !this.isOn && this.plug();
            this.init();
            this.isOn = true;
        }

        off() {
            this.isOn = false;
            this.e('r');

        }

        plug() {
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
                    el: '.m-crew-description',
                    active: { p: { y: [100, 0], o: [0, 1] }, d: 700, delay: 400 },
                    inactive: { p: { y: [0, -100], o: [1, 0.25] }, d: 400 },
                    init: { p: { y: [100, 100], o: [0, 0] } }

                }, {
                    el: '.m-crew-img',
                    active: { p: { o: [0, 1] }, d: 1000 },
                    inactive: { p: { o: [1, 0] }, d: 1000 },
                    init: { p: { o: [0, 0] } }
                }
            ]);

        }

        e(a) {
        }


        init() {
            this.C.on();

        }

        intro(d) {
            this.C.intro();
        }

        outro() {

        }

        run() {

        }


    }

    class C$Technology {
        constructor() {
            this.isOn = false;
            this.hasIntro = true;

        }

        on() {
            !this.isOn && this.plug();

            this.init();
            this.isOn = true;
        }

        off() {
            this.isOn = false;

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
            ]);
        }

        init() {
            this.C.on();

        }

        intro(d) {
            this.C.intro();
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
            C.p[B.route.new.page].on();

        }

        static intro(d) {

            return C.p[B.route.new.page].intro(d)


        }


        static init() {

            return C.p[B.route.new.page].init()


        }

        static outro() {
            C.p[B.route.old.page].outro();

        }

        static off() {
            C.p[B.route.old.page].off();
        }
    }

    class bg {
        constructor() {
            M.Bind(this, ['loop', 'intro', 'outro']);
            this.bg = M.SelectAll('.bg');
            this.r = new M.RafR(this.loop);
            this.i = {
                "/": 0,
                "/destination": 1,
                "/crew": 2,
                "/technology": 3
            };
            this.c = {
                l: 0,
                r: 0,
                curr: 0
            };
            this.f = {
                l: 0,
                r: 0,
            };
            this.init();
        }

        loop() {
            let a = this.bg; a.length;
            this.c.l = M.Lerp(this.c.l, this.f.l, 0.1);
            this.c.r = M.Lerp(this.c.r, this.f.r, 0.1);
            this.zIndex(this.curr);
            this.clip(a[this.curr], this.c.l, this.c.r);
        }

        init() {
            let a = this.bg, n = a.length;
            for (let i = 0; i < n; i++) {
                this.clip(a[i], i * 100 / n, (100 / n) * (n - 1 - i));
            }
        }

        outro() {
            const t = B.route.old.url;
            this.update(this.i[t], 'o');
        }

        intro() {
            const t = B.route.new.url;
            this.update(this.i[t], 'n');
        }

        update(i, v) {
            const n = M.L(this.bg);
            this.curr = i;
            if (v == "n") {
                this.c.l = i * 100 / n;
                this.c.r = (100 / n) * (n - 1 - i);
                this.f.l = 0;
                this.f.r = 0;
            } else {
                this.c.l = 0;
                this.c.r = 0;
                this.f.l = i * 100 / n;
                this.f.r = (100 / n) * (n - 1 - i);
            }
            new M.Delay(500, this.r.run).run();
            new M.Delay(3000, this.r.stop).run();

        }

        zIndex(c) {
            let a = this.bg, n = M.L(a);
            for (; n--;) {
                a[n].style.zIndex = (c != n) ? '0' : '7';
            }
        }

        clip(el, l, r) {
            el.style.clipPath = `inset(0 ${r}% 0 ${l}%)`;
        }
    }

    // Nav
    class n {
        constructor() {
            M.Bind(this, ["open", "close"]);
            this.a = M.SelectAll('.w-nav_link');
            this.l = {
                'Home': 0,
                'Destination': 1,
                'Crew': 2,
                'Technology': 3,
            };
            this.isOn = false;
            this.on();
        }


        on() {
            this.init();
        }


        init() {
            M.Cl(this.a, 'r', 'is-active');
            new M.Delay(2000, () => M.Cl(this.a[this.l[B.route.new.page]], 'a', 'is-active')).run();


        }

        e(o) {
            M.E(".open_menu", 'click', this.open, o);
            M.E(".close_menu", 'click', this.close, o);

        }

        run() {
            this.isOn ||this.e('a');
            this.isOn = true;

        }


        open(e) {
            this.init();
            this.cb(e, 'a');
            B.e.s.stop();
        }

        close(e) {
            this.init();
            this.cb(e, 'r');
            B.e.s.run();
        }

        cb(e, o) {
            M.Sp(e);
            M.Cl('.w-nav', o, 'is-active');
            M.Cl('.w-menu-btn', o, 'is-active');

        }
    }

    // Scroll
    class s {
        constructor() {
            const t = B;
            M.Bind(this, ["w", "key", "loop", "tS", "tM", "resize"]);
            M.De(document, "vScroll");
            t.scroll = {
                x: 0,
                y: 0,
                deltaX: 0,
                deltaY: 0,
                origin: null,
            };
            this.options = {
                mM: -1,
                tM: -4.5,
                fM: 15,
                kS: 120,
                speed: 0.5,
            };
            this.prog = M.Select('.progress');
            this.el = M.Select('.page');
            this.max = this.scrollY = 0;
            this.tsX = this.tsY = null;
            this.r = new M.RafR(this.loop);
            this.isOn = false;

            this.roR = new M.ROR(this.resize);
            this.roR.on();
        }

        update(e) {
            M.De(document, "vScroll");

            this.setMax();
            const t = B.scroll;
            t.y = M.R(M.Clamp(t.y + t.deltaY, 0, this.max), 2);
            t.originalEvent = e;
        }

        loop() {
            const t = B.scroll;
            this.scrollY = M.R(M.Lerp(this.scrollY, t.y, 0.1), 2);
            this.r.on && M.Is.interval(this.scrollY - t.y, -0.55, 0.55) && this.r.stop();
            M.T(this.el, 0, -1 * this.scrollY, 'px');
            M.T(this.prog, 0, (this.scrollY / this.max - 1) * 100, '%');
        }

        tS(e) {
            let T = (e.targetTouches) ? e.targetTouches[0] : e;
            this.tsX = T.pageX;
            this.tsY = T.pageY;
        }

        tM(e) {
            const t = B.scroll;
            let T = (e.targetTouches) ? e.targetTouches[0] : e;
            t.deltaX = (T.pageX - this.tsX) * this.options.tM;
            t.deltaY = (T.pageY - this.tsY) * this.options.tM;
            this.tsX = T.pageX;
            this.tsY = T.pageY;
            this.update(e);
        }

        w(e) {
            const t = B.scroll;
            t.deltaX = e.deltaX * -1 * .556;
            t.deltaY = e.deltaY * -1 * .556;
            t.deltaX *= this.options.mM;
            t.deltaY *= this.options.mM;
            this.update(e);
        }

        key(e) {
            const t = B.scroll;
            t.deltaX = t.deltaY = 0;
            let key = [
                { c: 37, d: 'x', s: -1 },
                { c: 39, d: 'x', s: 1 },
                { c: 38, d: 'y', s: -1 },
                { c: 40, d: 'y', s: 1 },
                { c: 32, d: 'y', s: 2 }
            ],
                n = key.length;
            for (let i = 0; i < n; i++) {
                if (e.keyCode === key[i].c) {
                    t[key[i].d === "x" ? "deltaX" : "deltaY"] = this.options.kS * key[i].s;
                }
            }
            (t.deltaX || t.deltaY) && this.update(e);
        }

        setMax() {
            let s = M.Select(".page");
            this.max = s.offsetHeight;
            this.max -= innerHeight;
        }

        resize(e) {
            this.setMax();
            const t = B.scroll;
            t.y = M.R(M.Clamp(t.y, 0, this.max), 0);
            t.originalEvent = e;
            this.max || this.init();
            this.max || this.r.on || this.r.run();
        }

        init() {
            this.el = M.Select(".page");
            M.T(this.prog, 0, -100, '%');
        }

        e(o) {
            M.E(document, "wheel", this.w, o);
            M.E(document, "keydown", this.key, o);
            M.E(document, "touchstart", this.tS, o);
            M.E(document, "touchmove", this.tM, o);
            M.E(document, "vScroll", () => this.r.on || this.r.run(), o);
        }

        run() {
            this.setMax();
            this.isOn || this.init();
            this.isOn || this.e('a');
            this.isOn = true;

        }

        stop() {
            this.isOn && this.e('r');
            this.isOn = false;

        }
    }

    class c {
        constructor() {
            M.Bind(this, ["loop", "update", "cl"]);
            this.el = M.G.id('cursor');
            this.hover = [
                { el: ".w-home-cta", css: "site-cursor--explore-hover" },
                { el: ".link-hover", css: "site-cursor--link-hover" },
                { el: ".js-technology-nav", css: "site-cursor--tech-hover" }
            ];
            this.h = this.el.offsetHeight;
            this.w = this.el.offsetWidth;
            this.s = 0.1;
            this.eX = this.eY = this.x = this.y = 0;
            this.r = new M.RafR(this.loop);
            this.isOn = false;
        }

        loop() {
            this.x = M.Lerp(this.x, this.eX, this.s);
            this.y = M.Lerp(this.y, this.eY, this.s);
            M.T(this.el, this.x, this.y, 'px');
        }

        update(e) {
            this.eX = e.pageX - this.w / 2;
            this.eY = e.pageY - this.h / 2;
        }

        e() {
            M.E(document, "mousemove", this.update);
        }

        run() {
            this.isOn || this.e();
            this.onHover('r');
            this.onHover('a');
            this.r.on || this.r.run();

            this.isOn = true;
        }

        onHover(o) {
            let a = this.hover, n = a.length;
            for (let i = 0; i < n; i++) {
                M.E(a[i].el, "mouseenter", () => this.cl('a', a[i].css,o));
                M.E(a[i].el, "mouseleave", () => this.cl('r', a[i].css,o));
            }
        }

        cl(a, css) {
            M.Cl(this.el, a, css);
        }
    }

    class M$C {
        constructor(o) {
            M.Bind(this, ['_b', '_w', 'intro']);
            this.b = M.SelectAll('.m--brain');
            this.w = M.SelectAll('.m--wrapper');
            this.l = 0;
            this.duration = 1100;
            this.o = o;
            this.roR = new M.ROR(this._w);
            this.isOn = false;

        }

        on() {
            !this.isOn && this.plug();
            this.init();
            this.isOn = true;
        }

        off() {
            this.isOn = false;
            this.e('r');

        }


        intro(d) {

            this.o.forEach((o) => {
                const t = this.t(o);
                this.d(t[0], 'b');
                new M.Mo({
                    el: t[0],
                    p: o.active.p,
                    d: d,
                    e: 'o3'
                }).play();

            });


        }

        _w() {
            let a = this.w, n = a.length;
            for (let i = 0; i < n; i++) {
                let b = a[i].children, m = b.length,
                    maxH = 0;
                for (let j = 0; j < m; j++) {
                    let h = M.Is.img(b[j]) ? b[j].offsetHeight : b[j].offsetHeight;
                    if (h > maxH) maxH = h;
                }
                a[i].style.height = maxH + 'px';
            }
        }

        _b(e) {
            const I = M.Index(e.target, this.b);
            if (I === this.l) return
            this.updNav(I);
            this.o.forEach(o => {

                const t = this.t(o);
                t.forEach((el, i) => {
                    if (i === I) {
                        const l = this.l;
                        new M.Mo({
                            el: t[I],
                            p: o.active.p,
                            e: 'o3',
                            d: o.active.d,
                            delay: o.active.delay || 0
                        }).play();
                        new M.Mo({
                            el: t[l],
                            p: o.inactive.p,
                            e: 'i3',
                            d: o.inactive.d,
                        }).play();
                        new M.Mo({
                            el: t[l],
                            p: o.init.p,
                            e: 'i3',
                            delay: o.inactive.d
                        }).play();
                        new M.Delay(o.inactive.d || 0, () => this.d(t[l], 'n')).run();
                        new M.Delay(o.active.delay || 0, () => this.d(t[I], 'b')).run();
                    }
                });
            });

            this.l = I;
        }

        plug() {
            this.roR.on();
            this.e('a');

        }


        init() {
            this._w();
            const I = 0;
            this.updNav(I);
            this.o.forEach(o => {
                const t = this.t(o);
                t.forEach(el => {
                    this.d(el, 'n');
                    new M.Mo({
                        el: el,
                        p: o.init.p,
                    }).play();
                });

            });

        }

        e(o) {
            M.E('.m--brain', 'click', this._b, o);
        }

        updNav(I) {
            this.b.forEach((el, i) => {
                let css = I === i ? 'a' : 'r';
                M.Cl(el, css, 'active');
                M.Pe.none(el);
                new M.Delay(this.duration, () => M.Pe.all(el)).run();
            });

        }

        d(t, p) {
            if (M.Is.arr(t)) {
                t.forEach(el => {
                    M.D(el, p);
                });
            } else {
                M.D(t, p);
            }
        }

        t(o) {
            let t = [];
            if (o.parent) {
                o.parent.forEach((el, i) => {
                    t.push(M.G.class(o.el, o.parent[i]));
                });
            } else {
                t = M.SelectAll(o.el);
            }
            return t
        }
    }


    // Brain
    class b {
        constructor() {
            M.Bind(this, ['setSafePadding']);
            this.t = new t;
            this.roR = new M.ROR(this.setSafePadding);

            this.on(true);
        }

        plug() {
            B.e.s = new s();
            B.e.c = new c();
            B.e.n = new n();
            B.e.io = new io();
            B.e.bg = new bg();
        }

        unplug() {
        }

        init() {
            this.setSafePadding();
            B.e.s.init();
            B.e.s.stop();

        }

        intro() {
            if (!B.config.preload) {
                B.e.io.index();

            } else {
                M.E(document, 'load', B.e.io.index);
            }

        }

        run() {
            B.e.s.run();
            B.e.n.run();
            B.e.c.run();

        }

        setSafePadding() {
            if (M.Dom.nav !== undefined) {
                const top = M.Dom.nav.offsetHeight;
                M.__('--safe-padding-top', top + 'px');
            }


        }


        on(init) {
            init && this.roR.on();
            this.plug();
            this.init();
            this.intro();
        }


    }
    B.e.b = new b;
    console.log('\n %c Made with ❤️ by La2spaille : https://www.la2spaille.studio  %c \n ', 'border: 1px solid #26282a;color: #fff; background: #26282a; padding:5px 0;', '');
}();
