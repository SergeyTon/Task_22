const status = document.querySelector('#status');
const btn = document.querySelector('.j-btn-test');
const timeZone = document.querySelector('#time_zone');
const dateTime = document.querySelector('#date_time');



// Функция, выводящая текст об ошибке
const error = () => {
    status.textContent = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`);
    // Добавляем обрабочик ответа сервера
    xhr.onload = function () {
        if (xhr.status != 200) { // HTTP ошибка?
            // Если статус не 200 (указывает, что запрос выполнен успешно),
            // то обрабатываем отдельно
            console.log('Статус ответа: ', xhr.status);
        } else {
            // Ответ мы получаем в формате JSON, поэтому его надо распарсить
            // Парсим и выводим ответ сервера
            // console.log('Результат: ', JSON.parse(xhr.response));
            const result = JSON.parse(xhr.response);

            timeZone.textContent = `Часовой пояс: ${result.timezone}`;
            dateTime.textContent = `День недели, дата и время: ${result.date_time_txt}`;
        }
    }; // Добавляем обрабочик процесса загрузки
    xhr.onprogress = function (event) {
        // Выведем прогресс загрузки
        console.log(`Загружено ${event.loaded} из ${event.total}`)
    };

    // Добавляем обрабочик ошибки
    xhr.onerror = function () {
        // обработаем ошибку, не связанную с HTTP (например, нет соединения)
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    // Отправляем запрос
    xhr.send();

}

btn.addEventListener('click', () => {

    if (!navigator.geolocation) {
        status.textContent = 'Информация о местоположении недоступна';
    } else {
        status.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});