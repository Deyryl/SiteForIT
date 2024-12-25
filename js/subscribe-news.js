document.addEventListener('DOMContentLoaded', () => {
    const subscribeForm = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('subscribe-email');
    const responseDiv = document.getElementById('subscribe-response');

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function subscribeToNews(email) {
        try {
            const formData = new FormData();
            formData.append('email', email);

            const response = await fetch('/php/subscribe.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            responseDiv.textContent = result.message;
            responseDiv.style.color = result.success ? 'green' : 'red';

            if (result.success) {
                emailInput.value = ''; // Очищаем поле ввода при успешной подписке
            }
        } catch (error) {
            console.error('Error:', error);
            responseDiv.textContent = 'Произошла ошибка при подписке. Пожалуйста, попробуйте позже.';
            responseDiv.style.color = 'red';
        }
    }

    subscribeForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            responseDiv.textContent = 'Пожалуйста, введите корректный адрес электронной почты.';
            responseDiv.style.color = 'red';
            return;
        }

        await subscribeToNews(email);
    });
});