import { destination } from "/js/destination.js";
import { crew } from "/js/crew.js";
import { technology } from "/js/technology.js";
let loader, homeCTA, linkHover, techCTA, menuBtn, closeBtn, headerNav, reveal, allImg, isLoad, links, hack

function pageScript() {
    destination()
    crew()
    technology()
}
function init() {
    homeCTA = document.querySelector('.w-home-cta')
    linkHover = document.querySelectorAll('.link-hover')
    techCTA = document.querySelectorAll('.js-technology-nav')
    menuBtn = document.querySelector('.w-menu-btn')
    closeBtn = document.querySelector('.w-close-btn')
    headerNav = document.querySelector('.w-nav')
    reveal = document.querySelectorAll('.transformation')
    links = document.querySelectorAll('a')

    //////////////////////////////////////////////////////////

    // Mobile Navigation Apparition
    menuBtn.addEventListener('click', (e) => {
        headerNav.classList.add('is-active')
        menuBtn.classList.add('is-active')
        document.body.style.overflowY = "hidden"
        e.stopPropagation()
        links.forEach(link => {
            link.addEventListener('click', () => {
                document.body.style.overflowY = "auto"
            })
        })

        window.addEventListener('click', (event) => {
            if (event.target != headerNav) {
                headerNav.classList.remove('is-active')
                menuBtn.classList.remove('is-active')
                document.body.style.overflowY = "auto"
            }
        })
    })
    closeBtn.addEventListener('click', (e) => {
        headerNav.classList.remove('is-active')
        menuBtn.classList.remove('is-active')
        document.body.style.overflowY = "auto"
        e.stopPropagation()
    })

    //////////////////////////////////////////////////////////

    hack = document.querySelectorAll('[style]')
    if (hack.length != 0) { hack[hack.length - 1].style.opacity = "0" }

    //////////////////////////////////////////////////////////

    // Parallax
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
    class Parallax {
        constructor(element) {
            this.element = element
            this.paraM = this.element.dataset.parallax
            this.MouseParallaxTransform = this.MouseParallaxTransform.bind(this)

            this.elementY = offsetTop(this.element) + (this.element.offsetHeight / 2)
            this.elementX = offsetLeft(this.element) + (this.element.offsetWidth / 2)
            this.MouseParallaxTransform()
        }

        MouseParallaxTransform() {
            this.element.addEventListener('mouseenter', () => {
                this.transition = "0.2s"
                this.element.style.setProperty('transition', this.transition)
                this.element.addEventListener('mousemove', (e) => {
                    window.requestAnimationFrame(() => {
                        let mouseX = e.pageX;
                        let mouseY = e.pageY;
                        let diffX = mouseX - (offsetLeft(this.element) + (this.element.offsetWidth / 2));
                        let diffY = mouseY - (offsetTop(this.element) + (this.element.offsetHeight / 2));
                        transform = `translate(${this.paraM * diffX}px, ${this.paraM * diffY}px)`
                        this.element.style.setProperty('transform', transform)
                        e.stopPropagation()
                    })
                })
            })
            this.element.addEventListener('mouseleave', (e) => {
                window.requestAnimationFrame(() => {
                    this.transition = "0.5s"
                    this.element.style.setProperty('transition', this.transition)
                    transform = `translate(${0.0}px, ${0.0}px)`
                    this.element.style.setProperty('transform', transform)
                    e.stopPropagation()
                })
            })
        }
        /**
         * @author Grafikart
         * @returns {Parallax[]}
         */
        static bind() {
            return Array.from(document.querySelectorAll('[data-parallax]')).map(
                (element) => {
                    return new Parallax(element)
                }
            )
        }
    }
    if (window.innerWidth > 1024) {
        Parallax.bind()
    }

}

// Loader
loader = document.querySelector('.loader')
window.addEventListener('load', () => {
    loader.classList.add('dom-loaded')
    reveal.forEach(reveal => {
        setTimeout(() => {
            reveal.classList.remove('transformation')
        }, 800);
    })
})

// Cursor
const siteCursor = document.querySelector('.w-site-cursor')
let mouseX, mouseY, transformMouse
document.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(() => {
        mouseY = `${e.clientY}px`
        mouseX = `${e.clientX}px`
        transformMouse = `translate(calc(${mouseX} - 50%),calc(${mouseY} - 50%))`
        siteCursor.style.setProperty('transform', transformMouse)
        siteCursor.style.setProperty(' -webkit-transform', transformMouse)
        linkHover.forEach(link => {
            link.addEventListener('mouseenter', (event) => {
                siteCursor.classList.add('site-cursor--link-hover')
                event.stopPropagation()
            })
            link.addEventListener('mouseleave', (event) => {
                siteCursor.classList.remove('site-cursor--link-hover')
                event.stopPropagation()
            })
        })
        if (homeCTA) {
            homeCTA.addEventListener('mouseenter', (event) => {
                siteCursor.classList.add('site-cursor--explore-hover')
                event.stopPropagation()
            })
            homeCTA.addEventListener('mouseleave', (event) => {
                siteCursor.classList.remove('site-cursor--explore-hover')
                event.stopPropagation()
            })
        }
        if (techCTA.lenght != 0) {
            techCTA.forEach(link => {
                link.addEventListener('mouseenter', (event) => {
                    siteCursor.classList.add('site-cursor--tech-hover')
                    event.stopPropagation()
                })
                link.addEventListener('mouseleave', (event) => {
                    siteCursor.classList.remove('site-cursor--tech-hover')
                    event.stopPropagation()
                })
            })

        }

    })
})

// AJAX
const xhr = new XMLHttpRequest()
let cuts, select
function transitionBefore() {
    loader.classList.remove('dom-loaded')
    loader.classList.add('init')
    setTimeout(() => {
        loader.classList.remove('init')
        loader.classList.add('transition')
    }, 700);
}
function transitionAfter() {
    cuts = xhr.responseText.split('<main>') //On récupère le DOM de la page appelé et on le découpe
    cuts = cuts[1].split('</main>')
    select = cuts[0]
    // On termine la transition
    setTimeout(() => {
        document.querySelector("main").innerHTML = select // contient le résultat de la page
        allImg = Array.from(document.querySelectorAll('img'))
        isLoad = (currentValue) => currentValue.complete == true 
        let loadEvent = setInterval(() => {
            if(allImg.lenght !=0) {
                if (allImg.every(isLoad)) {
                    clearInterval(loadEvent)
                    setTimeout(() => {
                        loader.classList.add('dom-loaded')
                        // Reveal
                        reveal.forEach(reveal => {
                            setTimeout(() => {
                                reveal.classList.remove('transformation')
                                pageScript()
                            }, 800);
                        })
                    }, 500);
                    setTimeout(() => {
                        loader.classList.remove('transition')
                    }, 1400);
                    window.scrollTo(0, 0) //On réinitialise le scroll
                    pageTransition()
                }
            } else {
                clearInterval(loadEvent)
                    setTimeout(() => {
                        loader.classList.add('dom-loaded')
                        // Reveal
                        reveal.forEach(reveal => {
                            setTimeout(() => {
                                reveal.classList.remove('transformation')
                                pageScript()
                            }, 800);
                        })
                    }, 500);
                    setTimeout(() => {
                        loader.classList.remove('transition')
                    }, 1400);
                    window.scrollTo(0, 0) //On réinitialise le scroll
                    pageTransition()
            }
           
        }, 100);
    }, 1750);
}

let pageTransition = function () {
    let ajaxLinks = document.querySelectorAll('a')
    pageScript()
    init()
    ajaxLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Début de la transition (un bouton est cliqué)
            transitionBefore()
            //
            e.preventDefault()
            e.stopPropagation()
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        transitionAfter()
                    } else {
                        console.log('Pas de chance')
                    }
                }
            }
            xhr.open('GET', e.target.getAttribute('href'), true)
            xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
            xhr.send()
            if (e.target.getAttribute('href') != window.location) {
                window.history.pushState({ path: e.target.getAttribute('href') }, '', e.target.getAttribute('href'))
            }
        })

    })
}
pageTransition()
// Transion entre les page avec les bonton
window.addEventListener('popstate', () => {
    // Début de la transition (un bouton est cliqué)
    transitionBefore()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                transitionAfter()
            } else {
                console.log("Pas bon, pas bon du tout...")
                // Le serveur a renvoyé un status d'erreur
            }
        }
    }
    xhr.open('GET', window.location.href, true)
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
    xhr.send()
})
