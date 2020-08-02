import { videoPlayerInit } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';

//переменные

//получаем все кнопки
const playerBtn = document.querySelectorAll('.player-btn');
//получаем все скрытые блоки
const playerBlock = document.querySelectorAll('.player-block');
// console.log(playerBtn);
// console.log(playerBlock);
//получаем блок с названием первй по верстке с данным классом
const temp = document.querySelector('.temp');

//функции

//фенция к-я убирает не активне блоки
const deactivationPlayer = () => {
    //скрываем блок с названием используя стили
    temp.style.display = 'none';
    //можем писать ф-ю без скобок () и {} если один аргумент и одно выражение
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
//пауза при переключении вкладки
    musicPlayerInit.stop();
    radioPlayerInit.stop();
    videoPlayerInit.stop();
};

//обработчики событий

//клик по кнопкам и открытие соотв блока
//два аргумента (btn, i)
playerBtn.forEach((btn, i) => {
    // console.log(btn);
    //соотносим кнопку с индексом
    // console.log(playerBlock[i]);
    btn.addEventListener('click', () => {
        //вызов функции скрытия блоков
        deactivationPlayer();
        //добавляем к кнопке и к блоку по индексу каласс (active)
        btn.classList.add('active');
        playerBlock[i].classList.add('active');

    })
})



videoPlayerInit();
musicPlayerInit();
radioPlayerInit();
