import {destination} from "/js/destination.js";
import {crew} from "/js/crew.js";
import {technology} from "/js/technology.js";

window.M = {}
M.Is = {
    def: t => t !== undefined,
    und: t => t === undefined,
    str: t => "string" == typeof t,
    obj: t => t === Object(t),
    arr: t => t.constructor === Array,
    true: t => t === true,
    imgLoad: t => t.complete === true,
    interval: (t, inf, sup) => t >= inf && t <= sup
}
M.Ease = {
    linear: t => t,
    o2: t => t * (2 - t)
}
M.XY = {
    accX: 0,
    accY: 0,
    offsetTop: function (element) {
        this.accY = 0
        if (element.offsetParent) {
            this.accY = this.offsetTop(element.offsetParent)
        }
        return element.offsetTop + this.accY
    },
    offsetLeft: function (element) {
        this.accX = 0
        if (element.offsetParent) {
            this.accX = this.offsetLeft(element.offsetParent)
        }
        return element.offsetLeft + this.accX
    }
}
M.Select = (el, all) => {
    let t
    M.Is.true(all) ? t = document.querySelectorAll(el) : t = document.querySelector(el)
    return t
}
M.T = (t, x, y, u) => {
    u = M.Is.und(u) ? "%" : u
    t.style.transform = "translate3d(" + x + u + "," + y + u + ",0)"
}
M.O = (t, r) => {
    t.style.opacity = r
}
M.To = ({duration, draw, timing}) => {
    let start = performance.now()
    requestAnimationFrame(function To(timestamp) {
        let t = (timestamp - start) / duration
        if (t < 0) t = 0
        if (t > 1) t = 1
        let progress = timing(t)
        draw(progress)
        if (progress < 1) {
            requestAnimationFrame(To)
        }
        return progress
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
M.Ael = (el, e, cb) => {
    let a = M.Select(el), s = M.Is.arr(a) ? a : [a], n = s.length
    for (let i = 0; i < n; i++) {
        s[i]["addEventListener"](e, cb)
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
M.Bt = (t, f) => {
    for (let i = 0; i < f.length; i++) {
        t[f[i]] = t[f[i]].bind(t)
    }
}
M.Qs = el => {
    if (!M.Is.str(el)) {
        return el
    }
    let s = el.substring(1), c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el)
    return c.length === 1 ? c[0] : c
}
M.Clamp = (t,inf,sup) => Math.max(inf,Math.min(sup,t))
M.Lerp = (s, e, a) => s * (1 - a) + a * e
M.Carousel = class { // Cooming Soon
    constructor(mainArray, allEl, dynamicHeight) {
        this.mainArray = mainArray
        this.allEl = allEl
        this.dynamicHeightObject = dynamicHeight
        this.carousel = []
        this.loaded = this.loaded.bind(this)
        this.setHeight = this.setHeight.bind(this)
        this.motion = this.motion.bind(this)
        this.setTable = this.setTable.bind(this)
        this.loaded()
        this.setHeight()
        this.motion()
    }
    setTable() {
        for(let i =0 ; i < this.allEl.length; i++) {
            this.allEl[i] = Array.from(this.allEl[i])
        }
        for(let i = 0; i < this.mainArray.length; i++) {
            this.carousel[i] = []
            for(let j =0 ; j < this.allEl.length; j++) {
                this.carousel[i][j] = this.allEl[j][i]
            }
        }
    }
    loaded() {
        this.setTable()
        this.carousel[0].forEach(el => {
            el.classList.add('transition')
        });
        let loadEvent = setInterval(() => {
            if (M.Is.load()) {
                setTimeout(() => {
                    this.carousel[0].forEach(el => {
                        el.classList.add('active')
                    })
                }, 2000)
                clearInterval(loadEvent)
            }
        }, 100)
    }

    setHeight() {

        this.dynamicHeightObject.forEach(el=> {
            let max = 0
            console.log(el)
            el.tab.forEach((els, index) => {
                if (els.offsetHeight > max) {
                    max = els.offsetHeight
                    el.elToSetHeight.style.minHeight = `${el.tab[index].offsetHeight}px`
                }
            })
            max = 0.1
            window.addEventListener('resize', () => {
                el.tab.forEach((els, index) => {
                    if (els.offsetHeight > max) {
                        max = els.elToSetHeight.offsetHeight
                        el.elToSetHeight.style.minHeight = `${el.tab[index].offsetHeight}px`
                    }
                })
            })
        })
    }

    motion() {
        let currentIndex = 0
        this.mainArray.forEach((el, i) => {
            el.addEventListener('click', (e) => {
                currentIndex = i
                this.mainArray.forEach((el, i) => {
                    el.style.pointerEvents = "none"
                    for (let j = 0; j < this.allEl.length; j++) {
                        if (currentIndex !== i) {
                            this.carousel[i][j].classList.remove('active')
                            this.carousel[i][j].classList.add('transition-leave')
                            setTimeout(() => {
                                this.carousel[i][i].classList.remove('transition')
                                setTimeout(() => {
                                    this.carousel[i][j].classList.remove('transition-leave')
                                }, 600);
                            }, 200);
                        } else {
                            this.carousel[i][j].classList.remove('transition-leave')
                            setTimeout(() => {
                                this.carousel[i][j].classList.add('transition')
                            }, 200);
                            setTimeout(() => {
                                this.carousel[i][j].classList.add('active')
                            }, 400);
                        }
                    }
                    setTimeout(() => {
                        el.style.pointerEvents = "auto"
                    }, 950);
                });
                e.stopPropagation()
            })
        });
    }
}
let Destination = new M.Carousel(
    M.Select('.js-destination-nav', true),
    [
        M.Select('.js-destination-nav', true),
        M.Select('.js-destination-img', true),
        M.Select('.js-destination-name', true),
        M.Select('.js-destination-description', true),
        M.Select('.js-destination-distance', true),
        M.Select('.js-destination-travel', true),
    ],
    [
        {
            elToSetHeight: M.Select('.w-paragraph', false),
            tab : M.Select('.js-destination-description', true),
        }
    ]
)
!function () {
    "use strict"

    if (!window.navigator.vendor.includes('Google')) {
        M.Select('.w-nav', false).style.backgroundColor = "rgba(38,39,50, 0.7)"
    }

    let pageFetched = []
    M.Select('.link.header', true).forEach((link, i) => {
        (async function () {
            const reponse = await fetch(link.getAttribute('href'))
            pageFetched[i] = {
                page: await reponse.text(),
                link: link.getAttribute('href')
            }
        })()
    })

// Loader

    M.Loader = {
        loader: M.Select('.loader', false),
        load: function () {
            window.addEventListener('load', () => {
                M.Select('.loader', false).classList.add('dom-loaded')
                M.Tl(M.Select('.transformation', true), 'transformation', 1000)
                console.log('\n %c Made with ❤️ by La2spaille  %c \n ', 'border: 1px solid #000;color: #fff; background: #000; padding:5px 0;', '')
            })
        }
    }
    M.Loader.load()

////////////////////////////////////////////////////////////////////
    function main() {

        // Cursor

        class c {
            constructor(speed) {
                this.el = M.Qs('.w-site-cursor')
                this.h = this.el.offsetHeight / 2
                this.w = this.el.offsetWidth / 2
                this.speed = speed
                this.eX = this.eY = this.x = this.y = 0
                //
                this.homeCTA = M.Qs('.w-home-cta', false)
                    this.techCTA= M.Select('.js-technology-nav', true)
                    this.links= M.Select('.link-hover', true)
                M.Bt(this, ["on", "loop", "update"])
                this.r = new M.Raf(this.loop)
                this.on()
                new c(0.1)

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
            hover() {
                this.links.forEach(link => {
                    link.addEventListener('mouseenter', () => {
                        this.el.classList.add('site-cursor--link-hover')
                    })
                    link.addEventListener('mouseleave', () => {
                        this.el.classList.remove('site-cursor--link-hover')
                    })
                })
                if (this.homeCTA) {
                    this.homeCTA.addEventListener('mouseenter', () => {
                        this.el.classList.add('site-cursor--explore-hover')
                    })
                    this.homeCTA.addEventListener('mouseleave', () => {
                        this.el.classList.remove('site-cursor--explore-hover')
                    })
                }
                if (this.techCTA.length !== 0) {
                    this.techCTA.forEach(link => {
                        link.addEventListener('mouseenter', () => {
                            this.el.classList.add('site-cursor--tech-hover')
                        })
                        link.addEventListener('mouseleave', () => {
                            this.el.classList.remove('site-cursor--tech-hover')
                        })
                    })
                }
            }
            removeHover() {
                this.el.classList.remove('site-cursor--link-hover')

            }
            on() {
                M.Ael(document, "mousemove", this.update)
                this.hover()
                this.removeHover()
                this.r.run()
            }

        }
        M.Cursor = new c(0.1)
        // Mobile Navigation Apparition
        let menuCTA = {
            headerNav: M.Select('.w-nav', false),
            menuBtn: M.Select('.w-menu-btn', false),
            closeBtn: M.Select('.w-close-btn', false),
            links: M.Select('a', true),
            open: function () {
                this.menuBtn.addEventListener('click', (e) => {
                    document.body.style.overflowY = "hidden"
                    this.headerNav.classList.add('is-active')
                    this.menuBtn.classList.add('is-active')
                    e.stopPropagation()

                })
            },
            closeByBtn: function () {
                this.closeBtn.addEventListener('click', (e) => {
                    document.body.style.overflowY = "auto"

                    this.headerNav.classList.remove('is-active')
                    this.menuBtn.classList.remove('is-active')
                    e.stopPropagation()
                })
            },
            closeByBody: function () {
                window.addEventListener('click', (event) => {
                    if (event.target !== this.headerNav) {
                        document.body.style.overflowY = "auto"
                        this.headerNav.classList.remove('is-active')
                        this.menuBtn.classList.remove('is-active')
                    }
                })
            }
        }
        menuCTA.open();
        menuCTA.closeByBtn();
        menuCTA.closeByBody()

        // Magnet
        class Magnet {
            constructor(el, i) {
                this.el = el
                this.magnet = M.Select('.w-magnet', true)[M.Select('.w-magnet', true).length === 1 ? 0 : i]
                this.paraM = this.el.getAttribute('data-parallax')
                this.enter = this.enter.bind(this)
                this.leave = this.leave.bind(this)
                this.enterCallback = this.enterCallback.bind(this)
                this.enter()
                this.leave()
            }

            enterCallback() {
                this.transition = "0.2s"
                this.el.style.setProperty('transition', this.transition)
                this.magnet.style.transform = "scale(5.5) translate(-10%, -10%)"
                setTimeout(() => {
                    this.magnet.addEventListener('mousemove', (e) => {
                        requestAnimationFrame(() => {
                            let mouseX = e.pageX;
                            let mouseY = e.pageY;
                            let diffX = mouseX - (M.XY.offsetLeft(this.el) + (this.el.offsetWidth / 2));
                            let diffY = mouseY - (M.XY.offsetTop(this.el) + (this.el.offsetHeight / 2));
                            M.T(this.el, this.paraM * diffX, this.paraM * diffY, 'px')
                        })
                    })
                }, 200)
            }

            enter() {
                this.magnet.addEventListener('mouseenter', this.enterCallback)
            }

            leave() {
                this.magnet.addEventListener('mouseleave', () => {
                    requestAnimationFrame(() => {
                        this.magnet.style.transform = "scale(1) translate(-50%, -50%)"
                        this.transition = "0.5s"
                        this.el.style.setProperty('transition', this.transition)
                        M.T(this.el, 0, 0, 'px')
                    })

                })
            }

            /**
             * @author Grafikart
             * @returns {Magnet[]}
             */
            static bind() {
                return Array.from(document.querySelectorAll('[data-parallax]')).map(
                    (el, i) => {
                        return new Magnet(el, i)
                    }
                )
            }
        }

        if (window.innerWidth > 1024) {
            Magnet.bind()
        }
    }

    function pageScript() {
        destination()
        crew()
        technology()
    }

    main();
    pageScript()

// AJAX
    let split, select

    function transitionBefore() {
        M.Loader.loader.classList.remove('dom-loaded')
        M.Loader.loader.classList.add('init')
        setTimeout(() => {
            M.Loader.loader.classList.remove('init')
            M.Loader.loader.classList.add('transition')
        }, 700);
    }

    function whenLoad(loadEvent) {
        clearInterval(loadEvent)
        setTimeout(() => {
            M.Loader.loader.classList.add('dom-loaded')
            M.Tl(M.Select('.transformation', true), 'transformation', 800)
            M.Tl([() => pageScript()], '', 800)
        }, 1500);
        M.Tl([M.Loader.loader], 'transition', 1500)
        M.Tl([() => window.scrollTo(0, 0)], '', 100)
        M.Tl([() => pageTransition()], '', 1500)
    }

    function transitionAfter(htmlText) {
        split = htmlText.split('<main>') //On récupère le DOM de la page appelé et on le découpe
        split = split[1].split('</main>')
        select = split[0]
        // On termine la transition

        setTimeout(() => {
            M.Select("main", false).innerHTML = select // contient le résultat de la page
            let allImg = Array.from(M.Select('img', true))
            let loadEvent = setInterval(() => {
                if (allImg.length !== 0) {
                    if (allImg.every(M.Is.imgLoad)) {
                        whenLoad(loadEvent)
                    }
                } else {
                    setTimeout(() => {
                        whenLoad(loadEvent)
                    }, 750)
                }
            }, 100);
        }, 1750);
    }

    function pageTransition() {
        let ajaxLinks = M.Select('a', true)
        pageScript()
        main()
        ajaxLinks.forEach((link) => {
            link.style.pointerEvents = 'auto'
            link.addEventListener('dbClick', e => {
                e.preventDefault()
            })
            link.addEventListener('click', e => {
                e.preventDefault()
                e.stopPropagation()
                ajaxLinks.forEach(el => {
                    el.style.pointerEvents = 'none'
                })
                M.Tl([() => M.Cursor.removeHover()], '', 700)
                transitionBefore()
                pageFetched.forEach(page => {
                    if (e.target.getAttribute('href') === page.link || e.target.getAttribute('data-link') === page.link) {
                        transitionAfter(page.page)
                    }
                })
                if (e.target.getAttribute('href') !== window.location) {
                    window.history.pushState({path: e.target.getAttribute('href')}, '', e.target.getAttribute('href'))
                }
            })

        })
    }

    pageTransition()

// Transition entre les page avec les bouton du navigateur
    M.PAJAX = {
        el: window,
        popstate: function () {
            this.el.addEventListener('popstate', () => {
                transitionBefore()
                pageFetched.forEach(page => {
                    if (window.location.pathname.split('/')[1] === page.link || (window.location.pathname.split('/')[1] === '' && page.link === '/')) {
                        transitionAfter(page.page)
                    }
                })
            })
        }
    }
    M.PAJAX.popstate()
// Made with ❤️ by La2spaille


}()
