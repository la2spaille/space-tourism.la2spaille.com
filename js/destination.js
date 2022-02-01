export function destination() {
    let destinations = new Array(4)
    let destinationsImg = Array.from(document.querySelectorAll('.js-destination-img'))
    let destinationsNav = document.querySelectorAll('.js-destination-nav')
    let destinationsName = document.querySelectorAll('.js-destination-name')
    let destinationsDescription = document.querySelectorAll('.js-destination-description')
    let destinationsDistance = document.querySelectorAll('.js-destination-distance')
    let destinationsTravel = document.querySelectorAll('.js-destination-travel')
    let wParagraph = document.querySelector('.w-paragraph')
    if (destinationsImg.length != 0) {
        window.addEventListener('resize', () => {
            wParagraph.style.minHeight = `${destinationsDescription[0].offsetHeight}`
        })
        for (let i = 0; i < destinations.length; i++) {
            destinations[i] = new Array(6)
            destinations[i][0] = destinationsImg[i]
            destinations[i][1] = destinationsNav[i]
            destinations[i][2] = destinationsName[i]
            destinations[i][3] = destinationsDescription[i]
            destinations[i][4] = destinationsDistance[i]
            destinations[i][5] = destinationsTravel[i]
        }
        window.addEventListener('load', () => {
            destinations[0].forEach(element => {
                element.classList.add('transition')
                setTimeout(() => {
                    element.classList.add('active')
                }, 2000);
            });
        })
        let imgLoaded = (currentvalue) => currentvalue.complete == true
        destinations[0].forEach(element => {
            element.classList.add('transition')
        });
        setTimeout(() => {
            if (destinationsImg.every(imgLoaded)) {
                destinations[0].forEach(element => {
                    element.classList.add('active')
                });
            }
        }, 2000);

        let currentIndex = 0
        destinationsNav.forEach((element, index) => {
                element.addEventListener('click', (e) => {
                    currentIndex = index
                    destinationsNav.forEach((element, index) => {
                        element.style.pointerEvents = "none"
                        for (let i = 0; i < 6; i++) {
                            if (currentIndex != index) {
                                destinations[index][i].classList.remove('active')
                                destinations[index][i].classList.add('transition-leave')
                                setTimeout(() => {
                                    destinations[index][i].classList.remove('transition')
                                    setTimeout(() => {
                                        destinations[index][i].classList.remove('transition-leave')
                                    }, 600);
                                }, 200);
                            } else {
                                destinations[index][i].classList.remove('transition-leave')
                                setTimeout(() => {
                                    destinations[index][i].classList.add('transition')
                                }, 200);
                                setTimeout(() => {
                                    destinations[index][i].classList.add('active')
                                }, 400);
                            }
                        }
                        setTimeout(() => {
                            element.style.pointerEvents = "auto"
                        }, 950);
                    });
                    e.stopPropagation()
                })
                
            wParagraph.style.minHeight = `${destinationsDescription[0].offsetHeight}`
        });
    }

}
