crews = new Array(4)
crewsImg = document.querySelectorAll('.js-crew-img')
crewsJob = document.querySelectorAll('.js-crew-job')
crewsName = document.querySelectorAll('.js-crew-name')
crewsDescription = document.querySelectorAll('.js-crew-description')
crewsNav = document.querySelectorAll('.js-crew-nav')
for (let i = 0; i < crews.length; i++) {
    crews[i] = new Array(5)
    crews[i][0] = crewsImg[i]
    crews[i][1] = crewsJob[i]
    crews[i][2] = crewsName[i]
    crews[i][3] = crewsDescription[i]
    crews[i][4] = crewsNav[i]
}
crews[0].forEach(element => {
    element.classList.add('active')
    element.classList.add('transition')
});
let currentIndex = 0
crewsNav.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        currentIndex = index
        crewsNav.forEach((element, index) => {
            element = element
            for (let i = 0; i < 5; i++) {
                if (currentIndex != index) {
                    crews[index][i].classList.remove('active')
                    crews[index][i].classList.add('transition-leave')
                    setTimeout(() => {
                        crews[index][i].classList.remove('transition')
                    }, 1000);
                } else {
                    crews[index][i].classList.remove('transition-leave')
                    setTimeout(() => {

                        crews[index][i].classList.add('transition')
                    }, 1000);
                    setTimeout(() => {
                        crews[index][i].classList.add('active')
                    }, 1500);
                }
            }

        });
        e.stopPropagation()
    })
});
