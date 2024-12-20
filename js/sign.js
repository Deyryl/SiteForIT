function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[username]) {
        alert('Пользователь с таким логином не найден!');
        return false;
    }
    if (users[username] !== password) {
        alert('Неверный пароль!');
        return false;
    }

    // Устанавливаем статус входа в localStorage
    localStorage.setItem('isLoggedIn', 'true');
    alert(`Добро пожаловать, ${username}!`);
    return true;
}

function registerUser(username, password, repeatPassword) {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        alert('Пользователь с таким логином уже существует!');
        return false;
    }

    if (password !== repeatPassword) {
        alert('Пароли не совпадают!');
        return false;
    }

    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрация прошла успешно! Теперь вы можете войти.');
    return true;
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        if (loginUser(username, password)) {
            window.location.href = 'index.html';
        }
    });
}

// Обработчик для формы регистрации
const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = registrationForm.username.value.trim();
        const password = registrationForm.password.value.trim();
        const repeatPassword = registrationForm.repeat_password.value.trim();

        if (registerUser(username, password, repeatPassword)) {
            window.location.href = 'signin.html';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылку на кнопку входа
    const signinButton = document.getElementById('signin');

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        signinButton.style.display = 'none'; // Скрываем ссылку "Вход"
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const signinButton = document.getElementById('signin');
    const logoutButton = document.getElementById('logout');

    // Проверяем состояние входа
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        signinButton.style.display = 'none'; // Скрываем кнопку "Вход"
        logoutButton.style.display = 'inline'; // Показываем кнопку "Выход"
    }

    // Логика выхода
    logoutButton.addEventListener('click', () => {
        localStorage.setItem('isLoggedIn', 'false');
        alert('Вы успешно вышли из аккаунта!');
        window.location.reload(); // Перезагружаем страницу
    });
});