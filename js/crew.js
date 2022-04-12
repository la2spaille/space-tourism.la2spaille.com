export function crew() {
    let crews = new Array(4)
    let crewsImg = Array.from(document.querySelectorAll('.js-crew-img'))
    let crewsJob = document.querySelectorAll('.js-crew-job')
    let crewsName = document.querySelectorAll('.js-crew-name')
    let crewsDescription = document.querySelectorAll('.js-crew-description')
    let crewsNav = document.querySelectorAll('.js-crew-nav')
    let wImg = document.querySelector('.w-img')
    let wParagraph = document.querySelector('.w-paragraph')
    if (crewsImg.length !== 0) {

        window.addEventListener('resize', () => {
            wImg.style.minHeight = `${crewsImg[1].offsetHeight}`
            wParagraph.style.height = `${crewsDescription[2].offsetHeight}px`
        })
        for (let i = 0; i < crews.length; i++) {
            crews[i] = new Array(5)
            crews[i][0] = crewsImg[i]
            crews[i][1] = crewsJob[i]
            crews[i][2] = crewsName[i]
            crews[i][3] = crewsDescription[i]
            crews[i][4] = crewsNav[i]
        }
        window.addEventListener('load', () => {
            crews[0].forEach(element => {
                element.classList.add('transition')
                setTimeout(() => {
                    element.classList.add('active')
                }, 2000);
            });
        })
        let imgLoaded = (currentvalue) => currentvalue.complete === true
        crews[0].forEach(element => {
            element.classList.add('transition')
        });
        setTimeout(() => {
            if (crewsImg.every(imgLoaded)) {
                crews[0].forEach(element => {
                    element.classList.add('active')
                });
            }
        }, 3000);

        let currentIndex = 0
        // let lastindex = 0
        crewsNav.forEach((element, index) => {
            element.addEventListener('click', (e) => {
                currentIndex = index
                crewsNav.forEach((element, index) => {
                    element.style.pointerEvents = "none"
                    for (let i = 0; i < 5; i++) {
                        if (currentIndex !== index) {
                            crews[index][i].classList.remove('active')
                            crews[index][i].classList.add('transition-leave')
                            setTimeout(() => {
                                crews[index][i].classList.remove('transition')
                                setTimeout(() => {
                                    crews[index][i].classList.remove('transition-leave')
                                }, 600);
                            }, 200);
                        } else {
                            crews[index][i].classList.remove('transition-leave')
                            setTimeout(() => {
                                crews[index][i].classList.add('transition')
                            }, 200);
                            setTimeout(() => {
                                crews[index][i].classList.add('active')
                            }, 600);
                        }
                    }
                    setTimeout(() => {
                        element.style.pointerEvents = "auto"
                    }, 1100);
                });
                
                e.stopPropagation()
            })
            
            wParagraph.style.height = `${crewsDescription[2].offsetHeight}px`
            wImg.style.minHeight = `${crewsImg[1].offsetHeight}px`
        });
    }

}




