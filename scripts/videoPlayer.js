export const videoPlayerInit = () => {
    // console.log('Video Init');

const videoPlayer = document.querySelector('.video-player');
const videoButtonPlay = document.querySelector('.video-button__play');
const videoButtonStop = document.querySelector('.video-button__stop');
const videoProgress = document.querySelector('.video-progress');
const videoTimePassed = document.querySelector('.video-time__passed');
const videoTimeTotal = document.querySelector('.video-time__total');
const videoVolume = document.querySelector('.video-volume');
const videoFullscreen = document.querySelector('.video-fullscreen');

//ф-я изменения иконки плэй
const toggleIcon = () => {
    if(videoPlayer.paused){
        //если на паузе удаляем иконку паузы и добавляем иконку плэй
        videoButtonPlay.classList.remove('fa-pause');
        videoButtonPlay.classList.add('fa-play');
    } else {
        videoButtonPlay.classList.add('fa-pause');
        videoButtonPlay.classList.remove('fa-play');
    }
}

//ф-я паузы и плэй
const togglePlayer = () => {
    //если на паузе то включаем плэй
    // иначе ставим на паузу
    if(videoPlayer.paused){
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
    //запуск функции смены иконки
    //toggleIcon();
    //*вместо этого есть встроенные функции плеера
}

//ф-я при клик на стоп
const stopPlay = () => {
    //ставим на паузу
    videoPlayer.pause();
    //ставим видео в начальную точку
    videoPlayer.currentTime = 0;
};

//ф-я добавления нуля ко времени по условию 
const addZero = n => n < 10 ? '0' + n : n;

//событие нажатие на плеер
videoPlayer.addEventListener('click', togglePlayer);
//событие при нажатии на кнопку плэй
videoButtonPlay.addEventListener('click', togglePlayer);

//* - встроенные функции плеера автоматические события
videoPlayer.addEventListener('play', toggleIcon);
videoPlayer.addEventListener('pause', toggleIcon);

//событие клик на стоп
videoButtonStop.addEventListener('click', stopPlay);

//запись времени
videoPlayer.addEventListener('timeupdate', () => {
    //получаем из плеера текущее время и длительность ролика
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    // console.log(currentTime);
    // console.log(duration);

    //изменяем положение бегунка (пройдено / всего)*100
    videoProgress.value = (currentTime / duration) * 100;

    //вычисляем целые минуты и секунды текущего времени
    let minutePassed = Math.floor(currentTime / 60);
    let secondPassed = Math.floor(currentTime % 60);
    //вычисляем целые минуты и секунды всего времени
    let minuteTotal = Math.floor(duration / 60);
    let secondTotal = Math.floor(duration % 60);

    //вывод времени в плеер
    // videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondPassed);                             
    // videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondTotal);
    //вместо этого можно сделать шаблонную строку
    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`;                             
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`;
});

//переключаем ПОЛЗУНОК
videoProgress.addEventListener('change', () => {
    //общее время
    const duration = videoPlayer.duration;
    //положение бегунка
    const value = videoProgress.value;
    //присваиваем новое время
    videoPlayer.currentTime = (value * duration) / 100;
});

videoPlayerInit.stop = () => {
    if(!videoPlayer.paused){
        stopPlay();
    }
};

videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
});
//input срабатывает каждый момент
//change срабатывает при отпескании мыши
videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
});
//фиксорованное начальное положение
videoPlayer.volume = 0.5;
//правильное позиционирование бегунка
videoVolume.value = videoPlayer.volume * 100;

};