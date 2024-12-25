<?php
session_start();
require_once 'config.php';

class Auth {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function register($username, $password, $repeatPassword) {
        if ($password !== $repeatPassword) {
            return ['success' => false, 'message' => 'Пароли не совпадают!'];
        }

        // Проверка существования пользователя
        $stmt = $this->db->prepare('SELECT username FROM users WHERE username = :username');
        $stmt->bindValue(':username', $username, SQLITE3_TEXT);
        $result = $stmt->execute();

        if ($result->fetchArray()) {
            return ['success' => false, 'message' => 'Пользователь с таким логином уже существует!'];
        }

        // Хеширование пароля
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Добавление нового пользователя
        $stmt = $this->db->prepare('INSERT INTO users (username, password) VALUES (:username, :password)');
        $stmt->bindValue(':username', $username, SQLITE3_TEXT);
        $stmt->bindValue(':password', $hashedPassword, SQLITE3_TEXT);

        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Регистрация прошла успешно!'];
        } else {
            return ['success' => false, 'message' => 'Ошибка при регистрации!'];
        }
    }

    public function login($username, $password) {
        $stmt = $this->db->prepare('SELECT * FROM users WHERE username = :username');
        $stmt->bindValue(':username', $username, SQLITE3_TEXT);
        $result = $stmt->execute();

        $user = $result->fetchArray(SQLITE3_ASSOC);
        
        if (!$user) {
            return ['success' => false, 'message' => 'Пользователь с таким логином не найден!'];
        }

        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            return ['success' => true, 'message' => 'Добро пожаловать, ' . $username . '!'];
        } else {
            return ['success' => false, 'message' => 'Неверный пароль!'];
        }
    }

    public function logout() {
        session_unset();
        session_destroy();
        return ['success' => true, 'message' => 'Вы успешно вышли из аккаунта!'];
    }

    public function isLoggedIn() {
        return isset($_SESSION['user_id']);
    }
}
?>