async function checkAuthStatus() {
    try {
        const response = await fetch('/php/check_auth.php');
        const data = await response.json();
        
        const signinButton = document.getElementById('signin');
        const logoutButton = document.getElementById('logout');
        
        if (data.isLoggedIn) {
            signinButton.style.display = 'none';
            logoutButton.style.display = 'inline';
        } else {
            signinButton.style.display = 'inline';
            logoutButton.style.display = 'none';
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
    }
}

async function loginUser(username, password) {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch('/php/login.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
            window.location.href = '/index.html';
            return true;
        } else {
            alert(result.message);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при входе');
        return false;
    }
}

async function registerUser(username, password, repeatPassword) {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('repeat_password', repeatPassword);

        const response = await fetch('/php/register.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
            window.location.href = '/signin.html';
            return true;
        } else {
            alert(result.message);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при регистрации');
        return false;
    }
}

async function logoutUser() {
    try {
        const response = await fetch('/php/logout.php', {
            method: 'POST'
        });

        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
            await checkAuthStatus(); // Обновляем статус после выхода
            window.location.reload();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при выходе');
    }
}

// Добавляем обработчики событий
document.addEventListener('DOMContentLoaded', async () => {
    // Проверяем статус авторизации при загрузке страницы
    await checkAuthStatus();

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const username = loginForm.username.value.trim();
            const password = loginForm.password.value.trim();
            await loginUser(username, password);
        });
    }

    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const username = registrationForm.username.value.trim();
            const password = registrationForm.password.value.trim();
            const repeatPassword = registrationForm.repeat_password.value.trim();
            await registerUser(username, password, repeatPassword);
        });
    }

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', async function (event) {
            event.preventDefault();
            await logoutUser();
        });
    }
});