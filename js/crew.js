export function crew() {
    M.Crew = {
        crews: new Array(4),
        img: Array.from(M.Select('.js-crew-img', true)),
        jobs: M.Select('.js-crew-job', true),
        names: M.Select('.js-crew-name', true),
        descriptions: M.Select('.js-crew-description', true),
        nav: M.Select('.js-crew-nav',true),
        cImg: M.Select('.w-img', false),
        paragraph: M.Select('.w-paragraph', false),
        setCrewTab: function () {
            for (let i = 0; i < this.crews.length; i++) {
                this.crews[i] = new Array(5)
                this.crews[i][0] = this.img[i]
                this.crews[i][1] = this.jobs[i]
                this.crews[i][2] = this.names[i]
                this.crews[i][3] = this.descriptions[i]
                this.crews[i][4] = this.nav[i]
            }
        },
        setContainersHeightCallback: function () {
            let max = 0
            this.descriptions.forEach(el => {
                if (el.offsetHeight > max) {
                    max = el.offsetHeight
                    this.paragraph.style.minHeight = `${el.offsetHeight}px`
                }
            })
            max = 0
            let loadEvent = setInterval(() => {
                if (this.img.every(M.Is.imgLoad)) {
                    this.img.forEach(el => {
                        if (el.offsetHeight > max) {
                            max = el.offsetHeight
                            this.cImg.style.minHeight = `${el.offsetHeight}px`
                        }
                    })
                    clearInterval(loadEvent)
                }
            }, 100)

        },
        setContainersHeight: function () {
            this.setContainersHeightCallback()
            window.addEventListener('resize', () => {
                this.setContainersHeightCallback()
            })
        },
        loaded: function () {
            this.setCrewTab()
            this.crews[0].forEach(el => {
                el.classList.add('transition')
            });
            let loadEvent = setInterval(() => {
                if (M.Is.load()) {
                    setTimeout(() => {
                        this.crews[0].forEach(el => {
                            el.classList.add('active')
                        })
                    }, 2000)
                    clearInterval(loadEvent)
                }
            }, 100)
        },
        motion: function () {
            let currentIndex = 0
            this.nav.forEach((element, index) => {
                element.addEventListener('click', (e) => {
                    currentIndex = index
                    this.nav.forEach((element, index) => {
                        element.style.pointerEvents = "none"
                        for (let i = 0; i < 5; i++) {
                            if (currentIndex !== index) {
                                this.crews[index][i].classList.remove('active')
                                this.crews[index][i].classList.add('transition-leave')
                                setTimeout(() => {
                                    this.crews[index][i].classList.remove('transition')
                                    setTimeout(() => {
                                        this.crews[index][i].classList.remove('transition-leave')
                                    }, 600);
                                }, 200);
                            } else {
                                this.crews[index][i].classList.remove('transition-leave')
                                setTimeout(() => {
                                    this.crews[index][i].classList.add('transition')
                                }, 200);
                                setTimeout(() => {
                                    this.crews[index][i].classList.add('active')
                                }, 600);
                            }
                        }
                        setTimeout(() => {
                            element.style.pointerEvents = "auto"
                        }, 1100);
                    });
                    e.stopPropagation()
                })

            });
        }

    }
    if (M.Crew.img.length !== 0) {
        M.Crew.loaded()
        M.Crew.setContainersHeight()
        M.Crew.motion()
    }
}







