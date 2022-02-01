export function technology() {
    let technologies = new Array(3)
    let technologiesImg = Array.from(document.querySelectorAll('.js-technology-img'))
    let technologiesName = document.querySelectorAll('.js-technology-name')
    let technologiesDescription = document.querySelectorAll('.js-technology-description')
    let technologiesNav = document.querySelectorAll('.js-technology-nav')
    let wParagraph = document.querySelector('.w-paragraph')
    if (technologiesImg.length != 0) {
        wParagraph.style.minHeight =`${technologiesDescription[0].offsetHeight}`
        window.addEventListener('resize' ,( ) => {
            wParagraph.style.minHeight =`${technologiesDescription[0].offsetHeight}`
        })
        for (let i = 0; i < technologies.length; i++) {
            technologies[i] = new Array(4)
            technologies[i][0] = technologiesImg[i]
            technologies[i][1] = technologiesName[i]
            technologies[i][2] = technologiesDescription[i]
            technologies[i][3] = technologiesNav[i]
        }
        window.addEventListener('load', () => {
            technologies[0].forEach(element => {
                element.classList.add('transition')
                setTimeout(() => {
                    element.classList.add('active')
                }, 2000);
            });
        })
        technologies[0].forEach(element => {
            element.classList.add('transition')
        });
        setTimeout(() => {
            if (1) {
                technologies[0].forEach(element => {
                    element.classList.add('active')
                });
            }
        }, 2000);
        
        let currentIndex = 0
        technologiesNav.forEach((element, index) => {
            element.addEventListener('click', (e) => {
                currentIndex = index
                technologiesNav.forEach((element, index) => {
                    element.style.pointerEvents = "none"
                    for (let i = 0; i < 4; i++) {
                        if (currentIndex != index) {
                            if (i != 3) technologies[index][i].classList.remove('active')
                            setTimeout(() => {
                                technologies[index][3].classList.remove('active')
                            }, 600);
                            technologies[index][i].classList.add('transition-leave')
                            setTimeout(() => {
                                technologies[index][i].classList.remove('transition')
                            }, 200);
                        } else {
                            technologies[index][i].classList.remove('transition-leave')
                            setTimeout(() => {
                                technologies[index][i].classList.add('transition')
                            }, 200);
                            setTimeout(() => {
                                technologies[index][i].classList.add('active')
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
