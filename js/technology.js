export function technology() {
    M.Technology = {
        technologies: new Array(3),
        img :Array.from(M.Select('.js-technology-img', true)) ,
        names :  M.Select('.js-technology-name',true),
        descriptions : M.Select('.js-technology-description', true),
        nav : M.Select('.js-technology-nav',true),
        paragraph : M.Select('.w-paragraph',false),
        setTechnologyTab : function () {
            for (let i = 0; i < this.technologies.length; i++) {
                this.technologies[i] = new Array(4)
                this.technologies[i][0] = this.img[i]
                this.technologies[i][1] = this.names[i]
                this.technologies[i][2] = this.descriptions[i]
                this.technologies[i][3] = this.nav[i]
            }
        },
        setParagraphHeight: function () {
            let max = 0
            this.technologies.forEach((el, index) => {
                if (el.offsetHeight > max) {
                    max = el.offsetHeight
                    this.paragraph.style.minHeight = `${this.descriptions[index].offsetHeight}px`
                }
            })
            max = 0
            window.addEventListener('resize', () => {
                this.descriptions.forEach((el, index) => {
                    if (el.offsetHeight > max) {
                        max = el.offsetHeight
                        this.paragraph.style.minHeight = `${this.descriptions[index].offsetHeight}px`
                    }
                })
            })
        },
        loaded: function () {
            this.setTechnologyTab()
            this.technologies[0].forEach(el => {
                el.classList.add('transition')
            });
            let loadEvent = setInterval(() => {
                if (M.Is.load()) {
                    setTimeout(() => {
                        this.technologies[0].forEach(el => {
                            el.classList.add('active')
                        })
                    }, 2000)
                    clearInterval(loadEvent)
                }
            }, 100)
        },
        motion : function () {
            let currentIndex = 0
            this.nav.forEach((element, index) => {
                element.addEventListener('click', (e) => {
                    currentIndex = index
                    this.nav.forEach((element, index) => {
                        element.style.pointerEvents = "none"
                        for (let i = 0; i < 4; i++) {
                            if (currentIndex !== index) {
                                if (i !== 3) this.technologies[index][i].classList.remove('active')
                                setTimeout(() => {
                                    this.technologies[index][3].classList.remove('active')
                                }, 600);
                                this.technologies[index][i].classList.add('transition-leave')
                                setTimeout(() => {
                                    this.technologies[index][i].classList.remove('transition')
                                }, 200);
                            } else {
                                this.technologies[index][i].classList.remove('transition-leave')
                                setTimeout(() => {
                                    this.technologies[index][i].classList.add('transition')
                                }, 200);
                                setTimeout(() => {
                                    this.technologies[index][i].classList.add('active')
                                }, 400);
                            }
                        }
                        setTimeout(() => {
                            element.style.pointerEvents = "auto"
                        }, 850);
                    });
                    e.stopPropagation()
                })
            });
        }
    }
    if (M.Technology.img.length !== 0) {
        M.Technology.loaded()
        M.Technology.setParagraphHeight()
        M.Technology.motion()
    }

}
