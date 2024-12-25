<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');

    // Проверка формата email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false,
            'message' => 'Пожалуйста, введите корректный адрес электронной почты.'
        ]);
        exit;
    }

    try {
        $database = new Database();
        $db = $database->getConnection();

        // Проверка существующего email
        $stmt = $db->prepare('SELECT email FROM subscribers WHERE email = :email');
        $stmt->bindValue(':email', $email, SQLITE3_TEXT);
        $result = $stmt->execute();

        if ($result->fetchArray()) {
            echo json_encode([
                'success' => false,
                'message' => 'Вы уже подписаны на новости!'
            ]);
            exit;
        }

        // Добавление нового подписчика
        $stmt = $db->prepare('INSERT INTO subscribers (email) VALUES (:email)');
        $stmt->bindValue(':email', $email, SQLITE3_TEXT);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Спасибо за подписку на новости!'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Произошла ошибка при подписке. Пожалуйста, попробуйте позже.'
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Произошла ошибка при подписке. Пожалуйста, попробуйте позже.'
        ]);
    }
    exit;
}
?>