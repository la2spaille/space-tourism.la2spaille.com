document.addEventListener('DOMContentLoaded', () => {
    planets = new Array(4)
    planetsImg = document.querySelectorAll('.js-planet-img')
    planetsNav = document.querySelectorAll('.js-planet-nav')
    planetsName = document.querySelectorAll('.js-planet-title')
    planetsDescription = document.querySelectorAll('.js-planet-description')
    planetsDistance = document.querySelectorAll('.js-planet-distance')
    planetsTravel = document.querySelectorAll('.js-planet-travel')
    try {
        for (let i = 0; i < planets.length; i++) {
            planets[i] = new Array(6)
            planets[i][0] = planetsImg[i]
            planets[i][1] = planetsNav[i]
            planets[i][2] = planetsName[i]
            planets[i][3] = planetsDescription[i]
            planets[i][4] = planetsDistance[i]
            planets[i][5] = planetsTravel[i]
        }
        planets[0].forEach(element => {
            element.classList.add('active')
            element.classList.add('transition')
        });
        let currentIndex = 0
        planetsNav.forEach((element, index) => {
            element.addEventListener('click', (e) => {
                currentIndex = index
                planetsNav.forEach((element, index) => {
                    element = element
                    for (let i = 0; i < 6; i++) {
                        if (currentIndex != index) {
                            planets[index][i].classList.remove('active')
                            planets[index][i].classList.add('transition-leave')
                            setTimeout(() => {
                                planets[index][i].classList.remove('transition')
                            }, 200);
                        } else {
                            planets[index][i].classList.remove('transition-leave')
                            setTimeout(() => {
                                planets[index][i].classList.add('transition')
                            }, 200);
                            setTimeout(() => {
                                planets[index][i].classList.add('active')
                            }, 400);
                        }
                    }
    
                });
                e.stopPropagation()
            })
        });
    } catch (error) {
        
    }
    
})