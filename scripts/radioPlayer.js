export const radioPlayerInit = () => {
        // console.log('Radio Init');

    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');

    //создаем обьект конструктор Audio со своими свойствами и методами
    const audio = new Audio();
    //определяем тип
    audio.type = 'audio/aac';
    //блокируем кнопку плей
    radioStop.disabled = true;

    //функция смены иконки
    const changeIconPlay = () => {
        if(audio.paused) {
            //удоляем класс анимации иконки
            radio.classList.remove('play');
            //добавляем иконку
            radioStop.classList.add('fa-play');
            //удоляем старую иконку
            radioStop.classList.remove('fa-stop');
        } else {
             //добавляем класс анимации иконки
             radio.classList.add('play');
             //наоборот 
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    //ф-я выделения кнопки
    const selectItem = elem => {
        //убираем выделение у не выделеннной кнопки
        radioItem.forEach(item => item.classList.remove('select'));
        //добавляем родителю класс выделения
        elem.classList.add('select');
    }
    //любое событие (change) для навигации
    radioNavigation.addEventListener('change', event => {
        // console.log('hello');
        //у event есть сво-во taget которое определяет кнопку события(радиостанцию)
        // console.log(event.target.dataset);
        // datast преобразует data.класс в нвзвание radioStantion
        const target = event.target;
        //получаем класс картинку и название станции
        //получаем родителя .radio-item при событии нажатия радиостанции
        const parrent = target.closest('.radio-item');
        //функция выделения кнопки
        selectItem(parrent);

        //ишем названию станции
        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;
        //ищем картинку станции
        const urlImg = parrent.querySelector('.radio-img').src;
        //заменяем
        radioCoverImg.src = urlImg;

        //разблокируем кнопку
        radioStop.disabled = false;
        //получаем адрес радиостанции
        //console.log(target.dataset.radioStantion);
        audio.src = target.dataset.radioStantion;
        //играет музыка
        audio.play();
        //запускаем смену иконки
        changeIconPlay();

    });
//функция при клике на стоп музыка
    radioStop.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        //запускаем смену иконки
        changeIconPlay();
    });

    //пауза при переключении вкладки
    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };

};