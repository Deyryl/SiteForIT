document.addEventListener('DOMContentLoaded', () => {
    const subscribeForm = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('subscribe-email');
    const responseDiv = document.getElementById('subscribe-response');

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    subscribeForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            responseDiv.textContent = 'Пожалуйста, введите корректный адрес электронной почты.';
            responseDiv.style.color = 'red';
            return;
        }

        // Сохраняем подписчика в локальном хранилище
        let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        if (subscribers.includes(email)) {
            responseDiv.textContent = 'Вы уже подписаны на новости!';
            responseDiv.style.color = 'orange';
        } else {
            subscribers.push(email);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));

            responseDiv.textContent = 'Спасибо за подписку на новости!';
            responseDiv.style.color = 'green';
        }

        emailInput.value = '';
    });
});