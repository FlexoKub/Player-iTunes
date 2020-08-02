import {addZero} from './supScript.js'

export const musicPlayerInit = () => {
    // console.log('Music Init');


    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioProgress = document.querySelector('.audio-progress');
    const audioTimeTotal = document.querySelector('.audio-time__total');
//массив с названием файлов
    const playList = ['hello', 'flow', 'speed'];
//переменная индекса
    let trackIndex = 0;
//a-z запуска трека
    const loadTrack = () => {
        //проверка на паузу
        const isPlayed = audioPlayer.paused;
        const track = playList[trackIndex];
        //меняем текст
        audioHeader.textContent = track.toUpperCase();
        //меняем картику
        audioImg.src = `./audio/${track}.jpg`;
//  меняем путь файла
        audioPlayer.src = `./audio/${track}.mp3`;

        if(isPlayed){
            audioPlayer.pause();
        }else {
            audioPlayer.play();
        }
    };

    //ф-я переключени на сдедующую и предыдущую мелодию
    const nextTrack = () => {
          //если равен последней песне то переключаем на первую индекс 0
          if(trackIndex === playList.length - 1) {
            trackIndex = 0;
        }else {
            trackIndex++;
        }
        //запуск музыки
        loadTrack();
    };
    const prevTrack = () => {
        if(trackIndex !== 0){
            trackIndex--;
        } else{
            trackIndex = playList.length - 1;
        }
        //запуск музыки
        loadTrack();
    };

    audioNavigation.addEventListener('click', event => {
//получим target
        const target = event.target;
        //есть ли класс с кнопкой плэй
        //contains проверяет наличие класса и выдает true
        if(target.classList.contains('audio-button__play')){
            //дабавляем или убираем кнопкуплэй и крутить пластинку
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');
            //запускаем плеер
            if(audioPlayer.paused){
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            };
            const track = playList[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }
        // кнопки следующая и предыдущая
        if(target.classList.contains('audio-button__prev')){
            prevTrack();
        }
        if(target.classList.contains('audio-button__next')){
            nextTrack();
        }

    });
    //конец плэй листа и переключение на первый трек
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        //запускаем трек без паузы
        audioPlayer.play();
    });

    //прогресс время трека
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration)*100;

        audioProgressTiming.style.width = progress + '%';
        //получаем время трека
        //|| '0' заменяет false при переключении трека (иначе NaN)
        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(duration % 60) || '0';

        const minutesTotal = Math.floor(currentTime / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    //получаем координаты прогресса трека
    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        //размер прогресса
        const allWidth = audioProgress.clientWidth;
        const progress = (x/allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    })

    //добавляем метод стоп при переключении вкладки
    musicPlayerInit.stop = () => {
        if(!audioPlayer.paused){
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    };
};