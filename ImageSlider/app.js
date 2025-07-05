let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let pauseDom = document.getElementById('pause');


let isPaused = false; 
let clickCount = 0;
let timeRunning = 3000;
let timeAutoNext = 7000;

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]); 

let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

nextDom.onclick = function () {
    showSlider('next');
};

prevDom.onclick = function () {
    showSlider('prev');
};

pauseDom.onclick = function () {
    clickCount++;
    
    if (clickCount % 2 === 1) {  // On the first click, pause the slide
        isPaused = true;
        clearTimeout(runTimeOut);
        clearTimeout(runNextAuto);
    } else {  // On the second click, unpause the slide
        isPaused = false;
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        runNextAuto = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);
    }
};

function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    
    if (!isPaused) {
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);
    }
}
