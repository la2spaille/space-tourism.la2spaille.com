export function destination() {
    // M.Destination = {
    //     destinations: new Array(4),
    //     img: Array.from(M.Select('.js-destination-img', true)),
    //     nav: M.Select('.js-destination-nav', true),
    //     names: M.Select('.js-destination-name', true),
    //     descriptions: M.Select('.js-destination-description', true),
    //     distance: M.Select('.js-destination-distance', true),
    //     travel: M.Select('.js-destination-travel', true),
    //     paragraph: M.Select('.w-paragraph', false),
    //     setDestinationTab: function () {
    //         for (let i = 0; i < this.destinations.length; i++) {
    //             this.destinations[i] = new Array(6)
    //             this.destinations[i][0] = this.img[i]
    //             this.destinations[i][1] = this.nav[i]
    //             this.destinations[i][2] = this.names[i]
    //             this.destinations[i][3] = this.descriptions[i]
    //             this.destinations[i][4] = this.distance[i]
    //             this.destinations[i][5] = this.travel[i]
    //         }
    //     },
    //     setParagraphHeight: function () {
    //         let max = 0
    //         this.descriptions.forEach((el, index) => {
    //             if (el.offsetHeight > max) {
    //                 max = el.offsetHeight
    //                 this.paragraph.style.minHeight = `${this.descriptions[index].offsetHeight}px`
    //             }
    //         })
    //         max = 0.1
    //         window.addEventListener('resize', () => {
    //             this.descriptions.forEach((el, index) => {
    //                 if (el.offsetHeight > max) {
    //                     max = el.offsetHeight
    //                     this.paragraph.style.minHeight = `${this.descriptions[index].offsetHeight}px`
    //                 }
    //             })
    //         })
    //     },
    //     loaded: function () {
    //         this.setDestinationTab()
    //         this.destinations[0].forEach(el => {
    //             el.classList.add('transition')
    //         });
    //         let loadEvent = setInterval(() => {
    //             if (M.Is.load()) {
    //                 setTimeout(() => {
    //                     this.destinations[0].forEach(el => {
    //                         el.classList.add('active')
    //                     })
    //                 }, 2000)
    //                 clearInterval(loadEvent)
    //             }
    //         }, 100)
    //     },
    //     motion: function () {
    //         let currentIndex = 0
    //         this.nav.forEach((el, index) => {
    //             el.addEventListener('click', (e) => {
    //                 currentIndex = index
    //                 this.nav.forEach((el, index) => {
    //                     el.style.pointerEvents = "none"
    //                     for (let i = 0; i < 6; i++) {
    //                         if (currentIndex !== index) {
    //                             this.destinations[index][i].classList.remove('active')
    //                             this.destinations[index][i].classList.add('transition-leave')
    //                             setTimeout(() => {
    //                                 this.destinations[index][i].classList.remove('transition')
    //                                 setTimeout(() => {
    //                                     this.destinations[index][i].classList.remove('transition-leave')
    //                                 }, 600);
    //                             }, 200);
    //                         } else {
    //                             this.destinations[index][i].classList.remove('transition-leave')
    //                             setTimeout(() => {
    //                                 this.destinations[index][i].classList.add('transition')
    //                             }, 200);
    //                             setTimeout(() => {
    //                                 this.destinations[index][i].classList.add('active')
    //                             }, 400);
    //                         }
    //                     }
    //                     setTimeout(() => {
    //                         el.style.pointerEvents = "auto"
    //                     }, 950);
    //                 });
    //                 e.stopPropagation()
    //             })
    //         });
    //     }
    // }
    // if (M.Destination.img.length !== 0) {
    //     M.Destination.loaded()
    //     M.Destination.setParagraphHeight()
    //     M.Destination.motion()
    // }
}
