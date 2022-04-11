import { destination } from "/js/destination.js";
import { crew } from "/js/crew.js";
import { technology } from "/js/technology.js";
let loader, homeCTA, linkHover, techCTA, menuBtn, closeBtn, headerNav, reveal, allImg, isLoad, links, siteCursor
window.M = {}
M.Is = {
    def : t => t !== undefined,
    und : t => t === undefined,
    true : t => t === true
}
M.Select = (el,all) => {
    let t
    all = M.Is.true(all) ? t = document.querySelectorAll(el) : t =  document.querySelector(el)
    return t
}
M.T = (t, x, y, u) => {
    u = M.Is.und(u) ? "%" : u
    t.style.transform = "translate3d(" + x + u + "," + y + u + ",0)"
}

M.O = (t, r) => {
    t.style.opacity = r
}
M.Ease = {
    linear: t => t,
    o2: t => t * (2 - t)
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
                timeout += typeof delay === 'object' ? delay[i] : delay
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


M.Fecth = {}

function pageScript() {
    destination()
    crew()
    technology()
}
function init() {

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


    //////////////////////////////////////////////////////////

    // Magnet
    let accY, accX, transform
    /**
    * Calcule la position de l'élement par rapport au haut de l'élement document
    * @param {HTMLElement} element
    * @return {Number}
    */
    function offsetTop(element) {
        accY = 0
        if (element.offsetParent) {
            accY = offsetTop(element.offsetParent)
        }
        return element.offsetTop + accY
    }
    /**
     * Calcule la position de l'element par rapport à la gauche de l'élement document
     * @author la2spaille
     * @param {HTMLElement} element
     * @return {Number}
     * @
     */
    function offsetLeft(element) {
        accX = 0
        if (element.offsetParent) {
            accX = offsetLeft(element.offsetParent)
        }
        return element.offsetLeft + accX
    }
    class Magnet {
        constructor(element) {
            this.element = element
            this.enterEl = M.Select('.w-magnet', false)
            this.paraM = this.element.dataset.parallax
            this.enter = this.enter.bind(this)
            this.leave = this.leave.bind(this)
            this.enter()
            this.leave()
        }

        enter() {
            this.enterEl.addEventListener('mouseenter', () => {
                this.transition = "0.2s"
                this.element.style.setProperty('transition', this.transition)
                this.element.addEventListener('mousemove', (e) => {
                    window.requestAnimationFrame(() => {
                        let mouseX = e.pageX;
                        let mouseY = e.pageY;
                        let diffX = mouseX - (offsetLeft(this.element) + (this.element.offsetWidth / 2));
                        let diffY = mouseY - (offsetTop(this.element) + (this.element.offsetHeight / 2));
                        M.T(this.element,this.paraM * diffX,this.paraM * diffY,'px')
                    })
                })
            })
        }
        leave() {
            this.element.addEventListener('mouseleave', () => {
                window.requestAnimationFrame(() => {
                    this.transition = "0.5s"
                    this.element.style.setProperty('transition', this.transition)
                    M.T(this.element,0,0,'px')
                })
            })
        }
        /**
         * @author Grafikart
         * @returns {Magnet[]}
         */
        static bind() {
            return Array.from(document.querySelectorAll('[data-parallax]')).map(
                (element) => {
                    return new Magnet(element)
                }
            )
        }
    }
    if (window.innerWidth > 1024) {
        Magnet.bind()
    }

}
init(); pageScript()

// Loader
window.addEventListener('load', () => {
    M.Select('.loader',false).classList.add('dom-loaded')
    M.Tl(M.Select('.transformation',true),'transformation', 1000)
})


// Cursor
M.Cursor = {
    cursor : M.Select('.w-site-cursor',false),
    homeCTA : M.Select('.w-home-cta',false),
    techCTA : M.Select('.js-technology-nav',true),
    links : M.Select('.link-hover', true),
    move : function() {
        document.addEventListener('mousemove', (e) => {
            window.requestAnimationFrame(() => {
                M.T(this.cursor, `calc(${e.clientX}px - 50%)` ,`calc(${e.clientY}px - 50%)`,`` )
            })
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
}
M.Cursor.move(); M.Cursor.hover()


// AJAX
// const xhr = new XMLHttpRequest()
// let cuts, select
// function transitionBefore() {
//     loader.classList.remove('dom-loaded')
//     loader.classList.add('init')
//     setTimeout(() => {
//         loader.classList.remove('init')
//         loader.classList.add('transition')
//     }, 700);
// }
// function transitionAfter() {
//     cuts = xhr.responseText.split('<main>') //On récupère le DOM de la page appelé et on le découpe
//     cuts = cuts[1].split('</main>')
//     select = cuts[0]
//     // On termine la transition
//     setTimeout(() => {
//         document.querySelector("main").innerHTML = select // contient le résultat de la page
//         allImg = Array.from(document.querySelectorAll('img'))
//         isLoad = (currentValue) => currentValue.complete == true
//         let loadEvent = setInterval(() => {
//             if(allImg.lenght !=0) {
//                 if (allImg.every(isLoad)) {
//                     clearInterval(loadEvent)
//                     setTimeout(() => {
//                         loader.classList.add('dom-loaded')
//                         // Reveal
//                         reveal.forEach(reveal => {
//                             setTimeout(() => {
//                                 reveal.classList.remove('transformation')
//                                 pageScript()
//                             }, 800);
//                         })
//                     }, 500);
//                     setTimeout(() => {
//                         loader.classList.remove('transition')
//                     }, 1400);
//                     window.scrollTo(0, 0) //On réinitialise le scroll
//                     pageTransition()
//                 }
//             } else {
//                 clearInterval(loadEvent)
//                     setTimeout(() => {
//                         loader.classList.add('dom-loaded')
//                         // Reveal
//                         reveal.forEach(reveal => {
//                             setTimeout(() => {
//                                 reveal.classList.remove('transformation')
//                                 pageScript()
//                             }, 800);
//                         })
//                     }, 500);
//                     setTimeout(() => {
//                         loader.classList.remove('transition')
//                     }, 1400);
//                     window.scrollTo(0, 0) //On réinitialise le scroll
//                     pageTransition()
//             }
//
//         }, 100);
//     }, 1750);
// }
//
// let pageTransition = function () {
//     let ajaxLinks = document.querySelectorAll('a')
//     pageScript()
//     init()
//     ajaxLinks.forEach(link => {
//         link.addEventListener('click', (e) => {
//             // Début de la transition (un bouton est cliqué)
//             transitionBefore()
//             //
//             e.preventDefault()
//             e.stopPropagation()
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4) {
//                     if (xhr.status === 200) {
//                         transitionAfter()
//                     } else {
//                         console.log('Pas de chance')
//                     }
//                 }
//             }
//             xhr.open('GET', e.target.getAttribute('href'), true)
//             xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
//             xhr.send()
//             if (e.target.getAttribute('href') != window.location) {
//                 window.history.pushState({ path: e.target.getAttribute('href') }, '', e.target.getAttribute('href'))
//             }
//         })
//
//     })
// }
// pageTransition()
// // Transion entre les page avec les bonton
// window.addEventListener('popstate', () => {
//     // Début de la transition (un bouton est cliqué)
//     transitionBefore()
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             if (xhr.status === 200) {
//                 transitionAfter()
//             } else {
//                 console.log("Pas bon, pas bon du tout...")
//                 // Le serveur a renvoyé un status d'erreur
//             }
//         }
//     }
//     xhr.open('GET', window.location.href, true)
//     xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
//     xhr.send()
// })
