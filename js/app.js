import { destination } from "/js/destination.js";
import { crew } from "/js/crew.js";
import { technology } from "/js/technology.js";
window.M = {}
M.Is = {
    def : t => t !== undefined,
    und : t => t === undefined,
    true : t => t === true,
    imgLoad : t => t.complete === true
}
M.Ease = {
    linear: t => t,
    o2: t => t * (2 - t)
}
M.XY =  {
    accX:0,
    accY:0,
    offsetTop:function (element) {
    this.accY = 0
    if (element.offsetParent) {
        this.accY = this.offsetTop(element.offsetParent)
    }
    return element.offsetTop + this.accY
},
    offsetLeft : function (element) {
    this.accX = 0
    if (element.offsetParent) {
        this.accX = this.offsetLeft(element.offsetParent)
    }
    return element.offsetLeft + this.accX
}
}
M.Select = (el,all) => {
    let t
    M.Is.true(all) ? t = document.querySelectorAll(el) : t =  document.querySelector(el)
    return t
}
M.T = (t, x, y, u) => {
    u = M.Is.und(u) ? "%" : u
    t.style.transform = "translate3d(" + x + u + "," + y + u + ",0)"
}
M.O = (t, r) => {
    t.style.opacity = r
}
M.To = ({ duration, draw, timing }) => {
    let start = performance.now()
    requestAnimationFrame( function To(timestamp)  {
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
M.Tl =  (arr,attr, timeout, delay ) => {
        for(let i = 0; i < arr.length; i++) {
            if(M.Is.def(delay)) {
                timeout += typeof delay === 'object' ? delay[i]*1000 : delay*1000
            }
            if(attr !== '') {
                setTimeout(() => {
                    arr[i].classList.remove(attr)
                },timeout)
            } else {
                setTimeout(() => {
                    arr[i]()
                }, timeout)
            }
        }
}

M.Carousel = class { // Cooming Soon
    constructor() {
        this.run = this.run.bind(this)
    }
    run() {

    }
}

function pageScript() {
    destination()
    crew()
    technology()
}
function main() {

    // Cursor
    M.Cursor = {
        cursor : M.Select('.w-site-cursor',false),
        homeCTA : M.Select('.w-home-cta',false),
        techCTA : M.Select('.js-technology-nav',true),
        links : M.Select('.link-hover', true),
        move : function() {
            document.addEventListener('mousemove', (e) => {
                M.T(this.cursor, `calc(${e.clientX}px - 50%)` ,`calc(${e.clientY}px - 50%)`,`` )
            })
        },
        hover : function ()  {
            this.links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    this.cursor.classList.add('site-cursor--link-hover')
                })
                link.addEventListener('mouseleave', () => {
                    this.cursor.classList.remove('site-cursor--link-hover')
                })
            })
            if (this.homeCTA) {
                this.homeCTA.addEventListener('mouseenter', () => {
                    this.cursor.classList.add('site-cursor--explore-hover')
                })
                this.homeCTA.addEventListener('mouseleave', () => {
                    this.cursor.classList.remove('site-cursor--explore-hover')
                })
            }
            if (this.techCTA.length !== 0) {
                this.techCTA.forEach(link => {
                    link.addEventListener('mouseenter', () => {
                        this.cursor.classList.add('site-cursor--tech-hover')
                    })
                    link.addEventListener('mouseleave', () => {
                        this.cursor.classList.remove('site-cursor--tech-hover')
                    })
                })
            }
        },
        removeHover : function () {
            this.cursor.classList.remove('site-cursor--link-hover')

        }
    }
    if(!navigator.vendor.includes('Apple') ) {
        M.Cursor.move()
        M.Cursor.hover()
    } else  {
        M.Cursor.cursor.style.display= "none"
    }

    // Mobile Navigation Apparition
    let menuCTA = {
        headerNav : M.Select('.w-nav',false),
        menuBtn : M.Select('.w-menu-btn',false),
        closeBtn : M.Select('.w-close-btn',false),
        links : M.Select('a', true),
        open : function () {
            this.menuBtn.addEventListener('click', (e) => {
                    this.headerNav.classList.add('is-active')
                    this.menuBtn.classList.add('is-active')
                    document.body.style.overflowY = "hidden"
                    e.stopPropagation()
                    this.links.forEach(link => {
                        link.addEventListener('click', () => {
                            document.body.style.overflowY = "auto"
                        })
                    })
        })},
        closeByBtn : function () {
            this.closeBtn.addEventListener('click', (e) => {
                this.headerNav.classList.remove('is-active')
                this.menuBtn.classList.remove('is-active')
                document.body.style.overflowY = "auto"
                e.stopPropagation()
            })
        },
        closeByBody : function () {
            window.addEventListener('click', (event) => {
                if (event.target !== this.headerNav) {
                    this.headerNav.classList.remove('is-active')
                    this.menuBtn.classList.remove('is-active')
                    document.body.style.overflowY = "auto"
                }
            })
        }
    }
    menuCTA.open(); menuCTA.closeByBtn(); menuCTA.closeByBody()

    // Magnet

    // let accY, accX
    // /**
    // * Calcule la position de l'élement par rapport au haut de l'élement document
    // * @param {HTMLElement} element
    // * @return {Number}
    // */
    // function offsetTop(element) {
    //     accY = 0
    //     if (element.offsetParent) {
    //         accY = offsetTop(element.offsetParent)
    //     }
    //     return element.offsetTop + accY
    // }
    // /**
    //  * Calcule la position de l'element par rapport à la gauche de l'élement document
    //  * @author la2spaille
    //  * @param {HTMLElement} element
    //  * @return {Number}
    //  * @
    //  */
    // function offsetLeft(element) {
    //     accX = 0
    //     if (element.offsetParent) {
    //         accX = offsetLeft(element.offsetParent)
    //     }
    //     return element.offsetLeft + accX
    // }
    class Magnet {
        constructor(el,i) {
            this.el = el
            this.magnet = M.Select('.w-magnet', true)[ M.Select('.w-magnet', true).length === 1 ? 0 : i ]
            this.paraM = this.el.dataset.parallax
            this.enter = this.enter.bind(this)
            this.leave = this.leave.bind(this)
            this.enterCallback = this.enterCallback.bind(this)
            this.enter()
            this.leave()
        }
        enterCallback() {
            this.transition = "0.2s"
            this.el.style.setProperty('transition', this.transition)
            this.magnet.style.transform="scale(5.5) translate(-10%, -10%)"
            setTimeout(()=> {
                this.magnet.addEventListener('mousemove', (e) => {
                    requestAnimationFrame(() => {
                        let mouseX = e.pageX;
                        let mouseY = e.pageY;
                        let diffX = mouseX - (M.XY.offsetLeft(this.el) + (this.el.offsetWidth / 2));
                        let diffY = mouseY - (M.XY.offsetTop(this.el) + (this.el.offsetHeight / 2));
                        M.T(this.el,this.paraM * diffX,this.paraM * diffY,'px')
                    })
                })
            },200)
        }
        enter() {
            this.magnet.addEventListener('mouseenter',this.enterCallback)
        }
        leave() {
            this.magnet.addEventListener('mouseleave', () => {
                this.magnet.style.transform="scale(1) translate(-50%, -50%)"
                requestAnimationFrame(() => {
                    this.transition = "0.5s"
                    this.el.style.setProperty('transition', this.transition)
                    M.T(this.el,0,0,'px')
                })
            })
        }
        /**
         * @author Grafikart
         * @returns {Magnet[]}
         */
        static bind() {
            return Array.from(document.querySelectorAll('[data-parallax]')).map(
                (el,i) => {
                    return new Magnet(el,i)
                }
            )
        }
    }
    if (window.innerWidth > 1024) {
        Magnet.bind()
    }
}
main(); pageScript()

// Loader
M.Loader = {
    loader : M.Select('.loader',false),
    load: function () {
        window.addEventListener('load', () => {
            M.Select('.loader',false).classList.add('dom-loaded')
            M.Tl(M.Select('.transformation',true),'transformation', 1000)
        })
    }
}
M.Loader.load()


// PAJAX
let split, select, allImg = Array.from(M.Select('img', true))
function transitionBefore() {
    M.Loader.loader.classList.remove('dom-loaded')
    M.Loader.loader.classList.add('init')
    setTimeout(() => {
        M.Loader.loader.classList.remove('init')
        M.Loader.loader.classList.add('transition')
    }, 700);
}
function whenLoad (loadEvent) {
    clearInterval(loadEvent)
    setTimeout(() => {
        M.Loader.loader.classList.add('dom-loaded')
        // Reveal
        M.Tl(M.Select('.transformation',true),'transformation', 800)
        M.Tl([()=>pageScript()],'',800)
    }, 500);
    M.Tl([M.Loader.loader],'transition',1500)
    window.scrollTo(0, 0) //On réinitialise le scroll
    M.Tl([()=> pageTransition()],'',1000)
}
function transitionAfter(htmlText) {
    split = htmlText.split('<main>') //On récupère le DOM de la page appelé et on le découpe
    split = split[1].split('</main>')
    select = split[0]
    // On termine la transition
    setTimeout(() => {
        M.Select("main", false).innerHTML = select // contient le résultat de la page
        let loadEvent = setInterval(() => {
            if(allImg.length !== 0) {
                if (allImg.every(M.Is.imgLoad)) {
                    whenLoad(loadEvent)
                }
            } else {
                whenLoad(loadEvent)
            }
        }, 100);
    }, 1750);
}
function pageTransition() {
    let ajaxLinks = M.Select('a', true)
    pageScript()
    main()
    ajaxLinks.forEach(link => {
        link.style.pointerEvents='auto'
        link.addEventListener('dbClick', e => {
            e.preventDefault()
        })
        link.addEventListener('click', (e) => {
            ajaxLinks.forEach(el => {
                el.style.pointerEvents='none'
            })
            M.Tl([()=> M.Cursor.removeHover()],'',700)
            transitionBefore()
            //
            e.preventDefault()
            e.stopPropagation()
            //
            async function fetchHtml() {
                const reponse = await fetch(e.target.getAttribute('href'))
                transitionAfter(await reponse.text())
            }
            fetchHtml()
            if (e.target.getAttribute('href') !== window.location) {
                window.history.pushState({ path: e.target.getAttribute('href') }, '', e.target.getAttribute('href'))
            }
        })

    })
}
pageTransition()

// Transition entre les page avec les bouton
M.PAJAX = {
    el: window,
    popstate : function () {
        this.el.addEventListener('popstate', () => {
            transitionBefore()
            async  function fetchHtml() {
               const reponse = await fetch(window.location.href)
                transitionAfter(await reponse.text())
            }
            fetchHtml()
        })
    }
}
M.PAJAX.popstate()
