document.addEventListener('DOMContentLoaded', () => {
    // Подключение API Яндекс.Карт
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
        ymaps.ready(initMap);
    };

    function initMap() {
        // Создаем карту
        const map = new ymaps.Map('map', {
            center: [59.9155, 30.3173], // Координаты центра (Санкт-Петербург)
            zoom: 15,
            controls: ['zoomControl', 'fullscreenControl']
        });

        // Главный корпус
        const mainBuilding = new ymaps.Placemark([59.916365, 30.315760], {
            balloonContent: `
                <strong>Главный корпус</strong><br />
                Санкт-Петербург,<br />ул. 1-я Красноармейская, д.1`
        }, {
            preset: 'islands#redDotIcon'
        });

        // Лабораторный корпус
        const labBuilding = new ymaps.Placemark([59.917578, 30.309912], {
            balloonContent: `
                <strong>Лабораторный корпус</strong><br />
                Санкт-Петербург,<br />ул. 1-я Красноармейская, д.13`
        }, {
            preset: 'islands#blueDotIcon'
        });

        // Добавляем метки на карту
        map.geoObjects.add(mainBuilding);
        map.geoObjects.add(labBuilding);
    }
});